import fs from 'node:fs';
import { A } from './annotations.mjs';
const NAMES = { URwVV5tTJIA: 'Apple · The new MacBook Air with M5（50 秒）', tLwcHZW7hS4: 'ASUS · Zenbook DUO (UX8407)（36 秒）' };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
let body = '', summary = '';
const csv = ['video,shot,start,end,dur,shot_type,composition,lighting,product_area_pct,product_visible,camera_visual,camera_auto,luma,contrast_rms,cct_proxy_K,note'];
for (const id of Object.keys(A)) {
  const m = JSON.parse(fs.readFileSync(`analysis/${id}/metrics.json`, 'utf8'));
  const ann = A[id]; const mv2 = JSON.parse(fs.readFileSync('analysis/'+id+'/motion2_final.json','utf8'));
  if (ann.length !== m.shots.length) throw new Error(`${id}: ${ann.length} annotations vs ${m.shots.length} shots`);
  const tot = m.video.duration;
  const vis = m.shots.reduce((a, s, i) => a + (ann[i].product > 0 ? s.dur : 0), 0);
  const hero = m.shots.reduce((a, s, i) => a + (ann[i].product >= 30 ? s.dur : 0), 0);
  const area = m.shots.reduce((a, s, i) => a + ann[i].product * s.dur, 0) / tot;
  const first = m.shots.find((s, i) => ann[i].product > 0).start;
  const ui = m.shots.reduce((a, s, i) => a + (/UI|字卡|Typography|標誌/.test(ann[i].shot_type) && ann[i].product === 0 ? s.dur : 0), 0);
  summary += `<tr><td>${NAMES[id]}</td><td>${(vis / tot * 100).toFixed(0)}%</td><td>${(hero / tot * 100).toFixed(0)}%</td><td>${area.toFixed(1)}%</td><td>${first.toFixed(1)} 秒</td><td>${(ui / tot * 100).toFixed(0)}%</td></tr>`;
  body += `<h2>${NAMES[id]}</h2><p class="meta">${m.video.width}×${m.video.height} · ${m.video.fps} fps · ${m.video.codec} · ${m.shots.length} 鏡 · 平均鏡長 ${m.video.ASL}s</p>`;
  m.shots.forEach((s, i) => {
    const a = ann[i], n = String(s.shot).padStart(2, '0');
    body += `<section class="card"><div class="imgs"><figure><img loading="lazy" src="analysis/${id}/frames/${n}a.jpg"><figcaption>起 ${(s.start + 0.17).toFixed(1)}s</figcaption></figure><figure><img loading="lazy" src="analysis/${id}/frames/${n}b.jpg"><figcaption>中 ${((s.start + s.end) / 2).toFixed(1)}s</figcaption></figure><figure><img loading="lazy" src="analysis/${id}/frames/${n}c.jpg"><figcaption>末 ${(s.start + (s.end - s.start) * 0.9).toFixed(1)}s</figcaption></figure></div>
<table><caption>鏡頭 ${s.shot}｜${s.start.toFixed(2)}–${s.end.toFixed(2)} 秒（${s.dur.toFixed(2)}s）｜進場：${s.enter === 'cut' ? '硬切' : s.enter === 'soft' ? '溶接' : '開場'}</caption>
<tr><th>景別</th><td>${esc(a.shot_type)}</td></tr><tr><th>構圖</th><td>${esc(a.comp)}</td></tr><tr><th>燈光／光線</th><td>${esc(a.light)}</td></tr>
<tr><th>產品出鏡</th><td>${a.product > 0 ? `硬體約佔畫面 <b>${a.product}%</b>（${esc(a.visible)}）` : '無硬體出鏡' + (a.visible && a.visible !== '無' ? '（' + esc(a.visible) + '）' : '')}</td></tr>
<tr><th>運鏡（目視）</th><td>${esc(a.cam)}</td></tr><tr><th>運鏡（自動 v2）</th><td>${esc(mv2[i].final)}${mv2[i].pan_x!=null?'<br><small>平移 '+mv2[i].pan_x+' · 俯仰 '+mv2[i].tilt_y+' · 縮放 '+mv2[i].zoom+' %/s · 內點率 '+mv2[i].inlier+'</small>':''}</td></tr>
<tr><th>量測</th><td>亮度 ${s.luma} · 對比 RMS ${s.contrast_rms} · 色溫指標 ${s.cct_proxy_K ?? '-'}K · 飽和 ${s.sat}</td></tr>${a.note ? `<tr><th>備註</th><td>${esc(a.note)}</td></tr>` : ''}</table></section>`;
    const q = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
    csv.push([id, s.shot, s.start, s.end, s.dur, q(a.shot_type), q(a.comp), q(a.light), a.product, q(a.visible), q(a.cam), q(mv2[i].final), s.luma, s.contrast_rms, s.cct_proxy_K, q(a.note)].join(','));
  });
}
fs.writeFileSync('shot_annotations.csv', '﻿' + csv.join('\n'));
fs.writeFileSync('shot_analysis.html', `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>逐鏡分析：Apple vs ASUS</title>
<style>:root{--bg:#fff;--fg:#1c2128;--mut:#656d76;--line:#d0d7de;--card:#f6f8fa}@media(prefers-color-scheme:dark){:root{--bg:#0d1117;--fg:#e6edf3;--mut:#8b949e;--line:#30363d;--card:#161b22}}
body{font:14px/1.5 system-ui,"Noto Sans TC","Microsoft JhengHei",sans-serif;background:var(--bg);color:var(--fg);margin:0;padding:16px;max-width:1280px;margin-inline:auto}
h1{font-size:22px}h2{margin-top:36px;border-bottom:2px solid var(--line);padding-bottom:6px}.meta,.small{color:var(--mut)}
.card{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);gap:14px;background:var(--card);border:1px solid var(--line);border-radius:8px;padding:10px;margin:12px 0}
.imgs{display:flex;flex-direction:column;gap:6px}.imgs figure{margin:0;position:relative}.imgs img{width:100%;display:block;border-radius:4px;border:1px solid var(--line)}
figcaption{position:absolute;left:6px;top:6px;background:#000a;color:#fff;font-size:11px;padding:1px 6px;border-radius:3px}
table{border-collapse:collapse;width:100%;font-size:13px;align-self:start}caption{text-align:left;font-weight:700;padding-bottom:6px}th,td{border:1px solid var(--line);padding:5px 8px;vertical-align:top;text-align:left}th{width:6.5em;background:#8881;white-space:nowrap}
.sum{width:auto;margin:10px 0}.sum th,.sum td{white-space:normal}@media(max-width:760px){.card{grid-template-columns:1fr}}</style></head><body>
<h1>逐鏡分析：Apple MacBook Air M5 vs ASUS Zenbook DUO</h1>
<p class="small">每鏡取 12%／50%／90% 位置三張影格（左），規格表（右）。景別、構圖、燈光、產品出鏡與「運鏡（目視）」為人工視覺判讀；產品出鏡面積為目視估計（±10 個百分點）。「運鏡（自動）」為區塊比對結果，僅供對照。</p>
<h3>產品出鏡摘要（目視估計）</h3><table class="sum"><tr><th>影片</th><th>硬體可見時間占比</th><th>硬體大面積（≥30%）時間占比</th><th>時間加權平均畫面占比</th><th>首次硬體出鏡</th><th>純 UI／字卡／標誌時間占比</th></tr>${summary}</table>
${body}</body></html>`);
console.log('ok');
