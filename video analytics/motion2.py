"""Camera-motion v2: sparse optical flow (LK) + RANSAC similarity transform per frame pair.
Outputs per-shot time series (tx, ty in % of frame width/height per second, log-scale per second, rotation deg/s),
cumulative motion over the shot, inlier ratio and a rule-based class.
Usage: python motion2.py <video_id>
"""
import json, sys, math
import cv2
import numpy as np

vid = sys.argv[1]
W, H = 640, 360
shots = json.load(open(f"analysis/{vid}/shots.json"))["shots"]
cap = cv2.VideoCapture(f"media/{vid}.mp4")
fps = cap.get(cv2.CAP_PROP_FPS)
frames = []
while True:
    ok, f = cap.read()
    if not ok:
        break
    frames.append(cv2.cvtColor(cv2.resize(f, (W, H), interpolation=cv2.INTER_AREA), cv2.COLOR_BGR2GRAY))
N = len(frames)

# per-pair similarity transform; use the pair (i, i+1) but also (i, i+2) for slow motion (sub-pixel -> multi-frame baseline)
def pair(a, b):
    p0 = cv2.goodFeaturesToTrack(a, maxCorners=400, qualityLevel=0.01, minDistance=8, blockSize=7)
    if p0 is None or len(p0) < 12:
        return None
    p1, st, _ = cv2.calcOpticalFlowPyrLK(a, b, p0, None, winSize=(31, 31), maxLevel=4)
    p0b, p1b = p0[st[:, 0] == 1], p1[st[:, 0] == 1]
    if len(p0b) < 12:
        return None
    M, inl = cv2.estimateAffinePartial2D(p0b, p1b, method=cv2.RANSAC, ransacReprojThreshold=2.0)
    if M is None:
        return None
    s = math.hypot(M[0, 0], M[1, 0]); rot = math.degrees(math.atan2(M[1, 0], M[0, 0]))
    # translation of the frame centre (so scale/rot do not leak into tx,ty)
    c = np.array([W / 2, H / 2, 1.0]); tc = M @ c - c[:2]
    return dict(tx=tc[0] / W * 100, ty=tc[1] / H * 100, ls=math.log(max(s, 1e-6)) * 100, rot=rot, inl=float(inl.sum()) / len(p0b), n=len(p0b))

series = []
for i in range(N - 2):
    r = pair(frames[i], frames[i + 2])  # 2-frame baseline
    series.append(r)
    if r:  # normalise to per-second
        k = fps / 2.0
        for key in ("tx", "ty", "ls", "rot"):
            r[key] *= k

out = []
for s in shots:
    i0 = int(round(s["start"] * fps)) + 3
    i1 = int(round(s["end"] * fps)) - 3
    seg = [x for x in series[max(0, i0):max(i0 + 1, i1)] if x]
    dur = s["end"] - s["start"]
    if len(seg) < 3:
        out.append(dict(shot=s["shot"], dur=round(dur, 2), cls="n/a (too short / no features)", **{k: None for k in ("pan_x", "tilt_y", "zoom", "rot", "inlier", "speed")}))
        continue
    inl = float(np.mean([x["inl"] for x in seg]))
    # robust per-second values (median) + cumulative over the whole shot
    med = lambda k: float(np.median([x[k] for x in seg]))
    tx, ty, ls, rot = med("tx"), med("ty"), med("ls"), med("rot")
    cum_tx, cum_ty, cum_z = tx * dur, ty * dur, ls * dur   # % of frame, % of frame, % scale change (log*100)
    spd = math.hypot(tx, ty)
    # classification (thresholds in %/s of frame width): static < 1.5; slow < 6; fast otherwise
    if inl < 0.45:
        cls = "unreliable (in-frame motion / CGI / UI dominates)"
    else:
        parts = []
        if abs(cum_z) > 6 and abs(ls) > 1.5:
            parts.append("push-in/zoom-in" if ls > 0 else "pull-out/zoom-out")
        if spd > 1.5 and abs(cum_tx) + abs(cum_ty) > 4:
            if abs(tx) >= abs(ty):
                parts.append("pan " + ("left" if tx > 0 else "right") + (" (fast)" if spd > 6 else ""))  # content moves +x => camera pans left
            else:
                parts.append("tilt " + ("up" if ty > 0 else "down") + (" (fast)" if spd > 6 else ""))
        if abs(rot) > 3 and abs(rot * dur) > 5:
            parts.append("roll")
        cls = " + ".join(parts) if parts else "static"
    out.append(dict(shot=s["shot"], dur=round(dur, 2), pan_x=round(tx, 2), tilt_y=round(ty, 2), zoom=round(ls, 2), rot=round(rot, 2),
                    cum_pan=round(cum_tx, 1), cum_tilt=round(cum_ty, 1), cum_zoom=round(cum_z, 1), inlier=round(inl, 2), speed=round(spd, 2), cls=cls))
json.dump(dict(video=vid, fps=fps, method="LK optical flow + RANSAC similarity, 640x360, 2-frame baseline, units: %frame/s", shots=out), open(f"analysis/{vid}/motion2.json", "w"), indent=1)
for o in out:
    print(o["shot"], o["dur"], o.get("pan_x"), o.get("tilt_y"), o.get("zoom"), o.get("rot"), o.get("inlier"), "|", o["cls"])
