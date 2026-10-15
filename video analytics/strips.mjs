import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
const FF = 'C:/Users/2609081/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build/bin/ffmpeg';
const id = process.argv[2], per = +process.argv[3] || 7;
const { shots } = JSON.parse(fs.readFileSync(`analysis/${id}/shots.json`, 'utf8'));
const d = `analysis/${id}/frames`; fs.mkdirSync(d, { recursive: true });
for (const s of shots) for (const [k, f] of [['a', 0.12], ['b', 0.5], ['c', 0.9]]) {
  const t = Math.min(s.start + (s.end - s.start) * f + (k === 'a' ? 0.05 : 0), s.end - 0.04);
  execFileSync(FF, ['-v', 'error', '-y', '-ss', String(t), '-i', `media/${id}.mp4`, '-frames:v', '1', '-vf', 'scale=1280:-2', `${d}/${String(s.shot).padStart(2, '0')}${k}.jpg`]);
}
for (let i = 0; i < shots.length; i += per) {
  const grp = shots.slice(i, i + per), ins = [];
  const args = ['-v', 'error', '-y'];
  for (const s of grp) for (const k of 'abc') args.push('-i', `${d}/${String(s.shot).padStart(2, '0')}${k}.jpg`);
  args.push('-filter_complex', grp.flatMap((_, n) => [0, 1, 2].map((m) => `[${n * 3 + m}:v]scale=400:225[v${n * 3 + m}]`)).join(';') + ';' + grp.flatMap((_, n) => [0, 1, 2].map((m) => `[v${n * 3 + m}]`)).join('') + `xstack=inputs=${grp.length * 3}:layout=` + grp.flatMap((_, n) => [0, 1, 2].map((m) => `${m * 400}_${n * 225}`)).join('|') + '[o]', '-map', '[o]', '-frames:v', '1', `analysis/strips/${id}_${String(i / per + 1)}.jpg`);
  execFileSync(FF, args);
}
