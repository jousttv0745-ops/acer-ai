// Per-shot measurable features: luma/contrast/colour-temp proxy/saturation/sharpness/global motion
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
const FF = 'C:/Users/2609081/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build/bin/';
const id = process.argv[2];
const W = 320, H = 180, FS = W * H * 3;
const probe = JSON.parse(spawnSync(FF + 'ffprobe', ['-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=width,height,avg_frame_rate,codec_name,bit_rate,pix_fmt,color_space,color_transfer,color_range,duration', '-of', 'json', `media/${id}.mp4`], { encoding: 'utf8' }).stdout).streams[0];
const [fn, fd] = probe.avg_frame_rate.split('/').map(Number); const fps = fn / fd;
const raw = spawnSync(FF + 'ffmpeg', ['-v', 'error', '-i', `media/${id}.mp4`, '-vf', `fps=${fps.toFixed(3)},scale=${W}:${H}`, '-pix_fmt', 'rgb24', '-f', 'rawvideo', '-'], { maxBuffer: 1 << 30 }).stdout;
const N = Math.floor(raw.length / FS);
const { shots } = JSON.parse(fs.readFileSync(`analysis/${id}/shots.json`, 'utf8'));
const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
function cct(r, g, b) { // McCamy on mean colour (sRGB->XYZ->xy); a relative warm/cool index only
  const R = lin(r), G = lin(g), B = lin(b);
  const X = 0.4124 * R + 0.3576 * G + 0.1805 * B, Y = 0.2126 * R + 0.7152 * G + 0.0722 * B, Z = 0.0193 * R + 0.1192 * G + 0.9505 * B;
  const s = X + Y + Z; if (s < 1e-6) return null; const x = X / s, y = Y / s, n = (x - 0.332) / (y - 0.1858);
  return -449 * n ** 3 + 3525 * n ** 2 - 6823.3 * n + 5520.33;
}
const lumaOf = (i) => { const o = i * FS, L = new Float32Array(W * H); for (let p = 0; p < W * H; p++) L[p] = 0.2126 * raw[o + p * 3] + 0.7152 * raw[o + p * 3 + 1] + 0.0722 * raw[o + p * 3 + 2]; return L; };
function frameStats(i, L) {
  const o = i * FS; let sr = 0, sg = 0, sb = 0, sat = 0, m = 0, m2 = 0; const hist = new Uint32Array(256);
  for (let p = 0; p < W * H; p++) { const r = raw[o + p * 3], g = raw[o + p * 3 + 1], b = raw[o + p * 3 + 2]; sr += r; sg += g; sb += b; const mx = Math.max(r, g, b), mn = Math.min(r, g, b); sat += mx ? (mx - mn) / mx : 0; const l = L[p]; m += l; m2 += l * l; hist[Math.min(255, l | 0)]++; }
  const n = W * H, mean = m / n, sd = Math.sqrt(Math.max(0, m2 / n - mean * mean));
  const pct = (q) => { let c = 0; for (let k = 0; k < 256; k++) { c += hist[k]; if (c >= q * n) return k; } return 255; };
  let lm = 0, lm2 = 0, cnt = 0; for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) { const c = y * W + x, v = L[c - 1] + L[c + 1] + L[c - W] + L[c + W] - 4 * L[c]; lm += v; lm2 += v * v; cnt++; }
  const lv = lm2 / cnt - (lm / cnt) ** 2;
  return { luma: mean, rms: sd, p5: pct(0.05), p95: pct(0.95), r: sr / n, g: sg / n, b: sb / n, sat: sat / n, lap: lv, cct: cct(sr / n, sg / n, sb / n) };
}
// Global motion: block matching on 80x45 luma, 8x8 blocks, search +-5 px
const SW = 80, SH = 45;
const small = (L) => { const S = new Float32Array(SW * SH); for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) { let a = 0; for (let dy = 0; dy < 4; dy++) for (let dx = 0; dx < 4; dx++) a += L[(y * 4 + dy) * W + x * 4 + dx]; S[y * SW + x] = a / 16; } return S; };
function motion(A, B) {
  const BS = 8, R = 5, vs = [];
  for (let by = 0; by < Math.floor(SH / BS); by++) for (let bx = 0; bx < SW / BS; bx++) {
    const x0 = bx * BS, y0 = by * BS; let best = 1e18, bvx = 0, bvy = 0;
    for (let vy = -R; vy <= R; vy++) for (let vx = -R; vx <= R; vx++) {
      if (x0 + vx < 0 || y0 + vy < 0 || x0 + vx + BS > SW || y0 + vy + BS > SH) continue; let sad = 0;
      for (let y = 0; y < BS; y++) for (let x = 0; x < BS; x++) sad += Math.abs(A[(y0 + y) * SW + x0 + x] - B[(y0 + y + vy) * SW + x0 + x + vx]);
      if (sad < best || (sad === best && Math.hypot(vx, vy) < Math.hypot(bvx, bvy))) { best = sad; bvx = vx; bvy = vy; }
    }
    vs.push({ x: x0 + BS / 2 - SW / 2, y: y0 + BS / 2 - SH / 2, vx: bvx, vy: bvy });
  }
  const mvx = vs.reduce((a, v) => a + v.vx, 0) / vs.length, mvy = vs.reduce((a, v) => a + v.vy, 0) / vs.length;
  let zoom = 0, res = 0; for (const v of vs) { const d = Math.hypot(v.x, v.y) || 1; zoom += ((v.vx - mvx) * v.x + (v.vy - mvy) * v.y) / d; res += Math.hypot(v.vx - mvx, v.vy - mvy); }
  return { mvx, mvy, zoom: zoom / vs.length, res: res / vs.length };
}
const F = []; let prev = null;
for (let i = 0; i < N; i++) { const L = lumaOf(i), S = small(L); F.push({ ...frameStats(i, L), mo: prev ? motion(prev, S) : null }); prev = S; }
const mean = (a) => a.length ? a.reduce((x, y) => x + y, 0) / a.length : null;
const med = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[s.length >> 1] : null; };
const out = shots.map((s) => {
  const i0 = Math.min(N - 1, Math.round(s.start * fps) + 2), i1 = Math.max(i0 + 1, Math.min(N, Math.round(s.end * fps) - 1)), fr = F.slice(i0, i1);
  const mo = fr.map((f) => f.mo).filter(Boolean); const camSpeed = med(mo.map((m) => Math.hypot(m.mvx, m.mvy))), zoomV = mean(mo.map((m) => m.zoom)), resV = mean(mo.map((m) => m.res));
  const ang = mean(mo.map((m) => m.mvx)), angy = mean(mo.map((m) => m.mvy));
  let cam = 'static';
  if (camSpeed != null) {
    if (Math.abs(zoomV) > 0.35 && Math.abs(zoomV) > camSpeed) cam = zoomV > 0 ? 'push-in/zoom-in?' : 'pull-out/zoom-out?';
    else if (camSpeed > 0.8) cam = Math.abs(ang) >= Math.abs(angy) ? 'pan?' : 'tilt?';
    else if (camSpeed > 0.3) cam = 'slow drift/handheld?';
    if (cam === 'static' && resV > 1.2) cam = 'static camera, in-frame motion (UI/CGI/object)';
    else if (cam !== 'static' && resV > 2.0) cam += ' (+strong in-frame motion)';
  }
  const c = (k) => mean(fr.map((f) => f[k])); const cc = fr.map((f) => f.cct).filter((v) => v != null && isFinite(v));
  return { shot: s.shot, start: s.start, end: s.end, dur: s.dur, enter: s.enter, frames: fr.length,
    luma: +c('luma').toFixed(1), contrast_rms: +c('rms').toFixed(1), dyn_range_p95_p5: +(c('p95') - c('p5')).toFixed(0), sat: +c('sat').toFixed(3),
    mean_rgb: [c('r'), c('g'), c('b')].map((v) => +v.toFixed(0)), cct_proxy_K: cc.length ? Math.round(med(cc)) : null, rb_ratio: +(c('r') / Math.max(1, c('b'))).toFixed(2),
    sharp_lapvar: +c('lap').toFixed(0), cam_speed_px: camSpeed == null ? null : +camSpeed.toFixed(2), zoom_idx: zoomV == null ? null : +zoomV.toFixed(2), inframe_motion: resV == null ? null : +resV.toFixed(2), camera_guess: cam };
});
const video = { id, width: probe.width, height: probe.height, codec: probe.codec_name, fps: +fps.toFixed(3), dar: (probe.width / probe.height).toFixed(3), color_space: probe.color_space, pix_fmt: probe.pix_fmt, duration: +probe.duration, shots: out.length, ASL: +(probe.duration / out.length).toFixed(2), median_shot: med(out.map((s) => s.dur)), cuts_per_5s: +(out.length / probe.duration * 5).toFixed(2) };
fs.writeFileSync(`analysis/${id}/metrics.json`, JSON.stringify({ video, shots: out }, null, 2));
fs.writeFileSync(`analysis/${id}/shots_metrics.csv`, '\ufeff' + Object.keys(out[0]).join(',') + '\n' + out.map((s) => Object.values(s).map((v) => Array.isArray(v) ? `"${v.join('/')}"` : /,/.test(String(v)) ? `"${v}"` : v).join(',')).join('\n'));
console.log(video);
console.table(out.map(({ shot, start, dur, luma, contrast_rms, cct_proxy_K, sat, sharp_lapvar, cam_speed_px, zoom_idx, inframe_motion, camera_guess }) => ({ shot, start, dur, luma, contrast_rms, K: cct_proxy_K, sat, sharp: sharp_lapvar, cam: cam_speed_px, zoom: zoom_idx, inmo: inframe_motion, camera_guess })));
