import sys, json
from faster_whisper import WhisperModel
m = WhisperModel("small", device="cpu", compute_type="int8")
import subprocess, numpy as np
FF=sys.argv[1]
for vid in sys.argv[2:]:
    aud = np.frombuffer(subprocess.run([FF+"/ffmpeg.exe","-v","quiet","-i",f"media/{vid}.mp4","-ac","1","-ar","16000","-f","s16le","-"],capture_output=True).stdout, np.int16).astype(np.float32)/32768
    segs, info = m.transcribe(aud, vad_filter=True, word_timestamps=False)
    out = [dict(start=round(s.start,2), end=round(s.end,2), text=s.text.strip()) for s in segs]
    json.dump(dict(video=vid, lang=info.language, segments=out), open(f"text/{vid}_asr.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
    print(vid, info.language, len(out), "segments")
