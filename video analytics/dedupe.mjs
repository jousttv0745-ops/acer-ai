import fs from 'node:fs';
const rows = JSON.parse(fs.readFileSync('results.json', 'utf8'));
const norm = (r) => (r.model || r.title).toLowerCase().replace(/asus|#\w+|\/\s*20\d\d|copilot\+ pc|\s+/g, ' ').replace(/[^a-z0-9一-鿿() ]/g, '').trim();
const best = new Map();
for (const r of rows) {
  const k = r.brand === 'ASUS' ? r.brand + r.year + norm(r) : r.url;
  const cur = best.get(k);
  if (!cur || r.views > cur.views) best.set(k, r);
}
const out = [...best.values()].sort((a, b) => a.brand.localeCompare(b.brand) || b.date.localeCompare(a.date));
fs.writeFileSync('results_dedup.json', JSON.stringify(out, null, 2));
const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
fs.writeFileSync('results_dedup.csv', '﻿品牌,年分,發布日期,標題,筆電型號,頻道,秒數,觀看數,連結\n' + out.map((r) => [r.brand, r.year, r.date, esc(r.title), esc(r.model), esc(r.channel), r.seconds, r.views, r.url].join(',')).join('\n'));
console.log(rows.length, '->', out.length);
const c = {}; out.forEach((x) => { const k = x.brand + ' ' + x.year; c[k] = (c[k] || 0) + 1; }); console.log(c);
