import fs from 'node:fs';
import { A } from './annotations.mjs';
// Visual ground truth: does the shot contain a deliberate camera move? (null = not applicable: UI / typography / logo)
const GT = {
  URwVV5tTJIA: { 1: true, 2: false, 3: false, 5: true, 6: false, 7: false, 8: false, 10: false, 11: false, 15: false, 16: false, 17: false, 23: false, 24: false, 26: false },
  tLwcHZW7hS4: { 1: false, 2: true, 3: true, 4: true, 6: true, 8: true, 9: false, 10: false, 11: true, 12: false },
};
const virtual = (t) => /UI|字卡|Typography|標誌/.test(t);
const res = {};
for (const id of Object.keys(A)) {
  const m2 = JSON.parse(fs.readFileSync(`analysis/${id}/motion2.json`, 'utf8')).shots;
  const m1 = JSON.parse(fs.readFileSync(`analysis/${id}/metrics.json`, 'utf8')).shots;
  let ok1 = 0, ok2 = 0, n = 0, unk = 0; const rows = [];
  m2.forEach((s, i) => {
    const v = virtual(A[id][i].shot_type) && A[id][i].product === 0;
    s.final = v ? 'virtual（螢幕錄影／字卡／標誌，非實體鏡頭）' : s.cls;
    s.final_note = v ? '圖形動畫，不計入運鏡' : '';
    const gt = GT[id][s.shot]; if (gt === undefined) return;
    const old = !/^static|slow drift/.test(m1[i].camera_guess), nw = !(/^static|unreliable|n\/a/.test(s.cls));
    n++; if (old === gt) ok1++; if (nw === gt) ok2++; if (/unreliable|n\/a/.test(s.cls)) unk++;
    rows.push(`${id} #${s.shot} gt=${gt} old=${old} new=${nw} (${s.cls})`);
  });
  res[id] = { n, old_acc: ok1 / n, new_acc: ok2 / n, unreliable: unk };
  fs.writeFileSync(`analysis/${id}/motion2_final.json`, JSON.stringify(m2, null, 1));
  console.log(rows.join('\n'));
}
console.log(res);
