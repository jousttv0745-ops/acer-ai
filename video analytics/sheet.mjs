import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
const FF = 'C:/Users/2609081/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build/bin/ffmpeg';
const id = process.argv[2];
const { shots } = JSON.parse(fs.readFileSync(`analysis/${id}/shots.json`, 'utf8'));
fs.mkdirSync(`analysis/${id}/thumbs`, { recursive: true });
for (const s of shots) { // first-frame+0.1s and middle frame of every shot
  for (const [tag, t] of [['a', s.start + 0.12], ['b', (s.start + s.end) / 2]]) {
    execFileSync(FF, ['-v', 'error', '-y', '-ss', String(Math.min(t, s.end - 0.04)), '-i', `media/${id}.mp4`, '-frames:v', '1', '-vf', "scale=320:-1", `analysis/${id}/thumbs/${String(s.shot).padStart(2, '0')}${tag}.jpg`]);
  }
}
// tile: 6 per row
execFileSync(FF, ['-v', 'error', '-y', '-framerate', '1', '-i', `analysis/${id}/thumbs/%02db.jpg`, '-vf', 'tile=6x' + Math.ceil(shots.length / 6), '-frames:v', '1', `analysis/${id}/sheet.jpg`]);
