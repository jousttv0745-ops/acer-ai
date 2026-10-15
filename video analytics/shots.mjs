// Shot segmentation: per-frame scene score from ffmpeg, adaptive peak picking -> shots JSON
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
const FF = 'C:/Users/2609081/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build/bin/';
const id = process.argv[2], T = +(process.argv[3] || 0.35);
fs.mkdirSync('analysis/' + id, { recursive: true });
const log = `analysis/${id}/scene.txt`;
execFileSync(FF + 'ffmpeg', ['-v', 'error', '-y', '-i', `media/${id}.mp4`, '-vf', `scale=320:-1,select='gte(scene,0)',metadata=print:file=${log}`, '-an', '-f', 'null', '-']);
const txt = fs.readFileSync(log, 'utf8').split('\n');
const fr = []; let t = null;
for (const l of txt) { let m; if ((m = l.match(/pts_time:([\d.]+)/))) t = +m[1]; else if ((m = l.match(/scene_score=([\d.]+)/))) fr.push({ t, s: +m[1] }); }
const dur = fr.at(-1).t, step = dur / (fr.length - 1);
// cut = score >= T and is the local max within +-3 frames; also a gradual-transition check (sum of 4 frames >= 0.6) flagged as 'dissolve'
const cuts = [];
for (let i = 1; i < fr.length; i++) {
  const w = fr.slice(Math.max(1, i - 3), i + 4).map((x) => x.s);
  if (fr[i].s >= T && fr[i].s === Math.max(...w)) cuts.push({ t: fr[i].t, type: 'cut', score: fr[i].s });
  else if (fr[i].s >= 0.12 && fr[i].s === Math.max(...w)) {
    const sum = fr.slice(i - 2, i + 3).reduce((a, x) => a + x.s, 0);
    if (sum >= 0.6) cuts.push({ t: fr[i].t, type: 'soft', score: +sum.toFixed(3) });
  }
}
const bounds = [0, ...cuts.map((c) => c.t), dur + step];
const shots = bounds.slice(0, -1).map((s, i) => ({ shot: i + 1, start: +s.toFixed(3), end: +bounds[i + 1].toFixed(3), dur: +(bounds[i + 1] - s).toFixed(3), enter: i ? cuts[i - 1].type : 'start', enterScore: i ? +cuts[i - 1].score.toFixed(3) : null }));
fs.writeFileSync(`analysis/${id}/shots.json`, JSON.stringify({ id, threshold: T, frames: fr.length, shots }, null, 2));
console.log(id, 'frames', fr.length, 'shots', shots.length, 'ASL', (dur / shots.length).toFixed(2));
shots.forEach((s) => console.log(s.shot, s.start, s.end, s.dur, s.enter, s.enterScore));
