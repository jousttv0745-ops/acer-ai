// Crawl YouTube for official Apple / ASUS laptop commercials from the last 5 years.
// Usage: node crawler.mjs   (Node 18+)  ->  results.csv, results.md, results.json
import fs from 'node:fs';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const HDR = { 'user-agent': UA, 'accept-language': 'en-US,en;q=0.9', cookie: 'CONSENT=YES+1; SOCS=CAI' };
const CUTOFF = new Date(); CUTOFF.setFullYear(CUTOFF.getFullYear() - 5);

// Official channels only (matched on the channel display name)
const OFFICIAL = {
  Apple: [/^apple$/i],
  ASUS: [/^asus$/i, /^asus (republic of gamers|rog|tw|taiwan|usa|us|global|laptops?|vivobook|zenbook|tuf gaming)/i, /rog|republic of gamers/i, /^asus.*(official)?$/i],
};
const QUERIES = {
  Apple: ['MacBook','MacBook Pro','MacBook Air','M1','M2','M3','M4','M5','Apple silicon','Mac','Scary Fast','Hollywood','Behind the Mac','Shot on','Apple Intelligence','14-inch','15-inch','16-inch','Mac laptop','Introducing MacBook','New MacBook','MacBook Pro M1 Pro','MacBook Air M2','MacBook Air M3','MacBook Air M4','MacBook Pro M2','MacBook Pro M3','MacBook Pro M4','Students','Creative','Hello'],
  ASUS: [
    'ASUS Zenbook commercial', 'ASUS Zenbook 14 OLED', 'ASUS Zenbook Pro', 'ASUS Zenbook DUO', 'ASUS Zenbook S 14', 'ASUS Zenbook S 16',
    'ASUS Zenbook A14', 'ASUS Vivobook commercial', 'ASUS Vivobook S 14 15 16', 'ASUS Vivobook Pro OLED',
    'ASUS ProArt Studiobook', 'ASUS ProArt P16 PX13', 'ASUS ExpertBook', 'ASUS Chromebook',
    'ROG Zephyrus G14 official','ROG Zephyrus G14 2021','ROG Zephyrus G14 2022','ROG Zephyrus G14 2023','ROG Zephyrus G14 2024','ROG Zephyrus G16 2024','ROG Zephyrus G16 2025','ROG Strix SCAR 18','ROG Strix SCAR 16','ROG Strix G18','ROG Flow Z13 2025','ROG Flow X13 2022','ROG Flow Z13 2022','ROG Zephyrus M16 2022','ROG Zephyrus G15 2021','ROG Zephyrus G15 2022','ROG Zephyrus Duo 16','ROG Strix G15','ROG Strix G17','ROG Xbox Ally','ROG Zephyrus G14 G16', 'ROG Zephyrus G16', 'ROG Zephyrus M16', 'ROG Zephyrus Duo', 'ROG Strix SCAR', 'ROG Strix G16',
    'ROG Flow X13', 'ROG Flow Z13', 'ROG Flow X16', 'ASUS TUF Gaming A15 F15', 'ASUS TUF Gaming A14 A16', 'ROG Ally laptop',
    'ASUS laptop official TVC', 'ASUS Copilot+ PC', 'ASUS AI laptop launch film', 'ASUS 華碩 筆電 廣告', 'ASUS Gaming Laptop official trailer',
  ],
};
// Keep only promo-style titles; drop reviews / how-tos / event streams
const PROMO = /(introducing|official|film|trailer|commercial|tvc|teaser|launch|reveal|unleash|meet|ad\b|campaign|made for|performance|powerhouse|\bgo\s|cinematic|the new|zenbook|vivobook|zephyrus|strix|macbook|rog flow|tuf)/i;
const EXCLUDE = /(mac mini|mac studio|mac pro|ipad|iphone|apple watch|vision pro|airpods|ally|monitor|desktop|unboxing|review|hands[- ]on|how to|tutorial|tips|keynote|livestream|live stream|event|podcast|setup guide|support|repair|driver|bios|faq|giveaway|ces\s?20\d\d|recap|q&a|interview|behind the scenes)/i;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try { const r = await fetch(url, { headers: HDR }); if (r.ok) return await r.text(); } catch {}
    await sleep(1000 * (i + 1));
  }
  return '';
}
function extractJson(html, marker) {
  const i = html.indexOf(marker); if (i < 0) return null;
  let s = html.indexOf('{', i), d = 0, inStr = false, esc = false;
  for (let j = s; j < html.length; j++) {
    const c = html[j];
    if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true; else if (c === '{') d++; else if (c === '}' && --d === 0) { try { return JSON.parse(html.slice(s, j + 1)); } catch { return null; } }
  }
  return null;
}
function* walk(o) { if (o && typeof o === 'object') { yield o; for (const k in o) yield* walk(o[k]); } }

async function search(q, brand) {
  const url = brand === 'Apple' ? 'https://www.youtube.com/@Apple/search?query=' + encodeURIComponent(q) : 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q) + '&sp=EgIQAQ%253D%253D';
  const html = await get(url);
  const data = extractJson(html, 'var ytInitialData = ') || extractJson(html, 'ytInitialData = ');
  const out = [];
  if (!data) return out;
  for (const n of walk(data)) if (n.videoRenderer?.videoId) {
    const v = n.videoRenderer;
    out.push({ id: v.videoId, title: v.title?.runs?.map((r) => r.text).join('') || '', channel: v.ownerText?.runs?.[0]?.text || '' });
  }
  return out;
}
async function detail(id) {
  const html = await get('https://www.youtube.com/watch?v=' + id);
  const pr = extractJson(html, 'var ytInitialPlayerResponse = ');
  const mf = pr?.microformat?.playerMicroformatRenderer;
  return { date: mf?.publishDate?.slice(0, 10) || mf?.uploadDate?.slice(0, 10) || '', len: +(pr?.videoDetails?.lengthSeconds || 0),
           views: +(pr?.videoDetails?.viewCount || 0), desc: (pr?.videoDetails?.shortDescription || '').slice(0, 400) };
}

// Model extraction from title/description
const MODEL_RULES = [
  [/macbook pro[^|]*?(m\d(?: pro| max| ultra)?)/i, (m) => `MacBook Pro (${m[1].toUpperCase()})`],
  [/macbook air[^|]*?(m\d)/i, (m) => `MacBook Air (${m[1].toUpperCase()})`],
  [/macbook neo/i, () => 'MacBook Neo'], [/macbook pro/i, () => 'MacBook Pro'], [/macbook air/i, () => 'MacBook Air'], [/macbook/i, () => 'MacBook'],
  [/zenbook\s*(duo|s ?\d+|a ?\d+|pro ?\d*|\d+)?[^|,:-]*/i, (m) => 'ASUS ' + m[0].trim()],
  [/vivobook\s*(pro|s|go)?\s*\d*[^|,:-]*/i, (m) => 'ASUS ' + m[0].trim()],
  [/(rog )?zephyrus\s*\w*\d*\w*/i, (m) => 'ROG ' + m[0].replace(/^rog /i, '').trim()],
  [/(rog )?strix\s*(scar|g)?\s*\d*/i, (m) => 'ROG ' + m[0].replace(/^rog /i, '').trim()],
  [/rog flow\s*\w*\d*/i, (m) => m[0].trim()], [/tuf (gaming )?\w*\s*\d*/i, (m) => 'ASUS ' + m[0].trim()],
  [/proart\s*\w*\s*\d*/i, (m) => 'ASUS ' + m[0].trim()], [/expertbook\s*\w*\s*\d*/i, (m) => 'ASUS ' + m[0].trim()],
  [/chromebook\s*\w*\s*\d*/i, (m) => 'ASUS ' + m[0].trim()],
];
function model(text) { for (const [re, f] of MODEL_RULES) { const m = text.match(re); if (m) return f(m); } return '(未能判斷)'; }

const brandOf = (ch) => { for (const [b, res] of Object.entries(OFFICIAL)) if (res.some((r) => r.test(ch.trim()))) return b; return null; };

const seen = new Map();
for (const [brand, qs] of Object.entries(QUERIES).filter(([b]) => !process.env.ONLY || b === process.env.ONLY)) for (const q of qs) {
  const rs = await search(q, brand); console.error(`[search] ${q} -> ${rs.length}`);
  for (const r of rs) {
    const b = brandOf(r.channel);
    if (b !== brand || seen.has(r.id) || EXCLUDE.test(r.title) || !PROMO.test(r.title)) continue;
    seen.set(r.id, { ...r, brand });
  }
  await sleep(600);
}
console.error(`candidates: ${seen.size}`);
const rows = [];
for (const v of seen.values()) {
  const d = await detail(v.id); await sleep(400);
  if (!d.date || new Date(d.date) < CUTOFF) continue;
  if (d.len && (d.len > 300 || d.len < 5)) continue; // ads are short; drop long streams
  rows.push({ brand: v.brand, year: d.date.slice(0, 4), date: d.date, title: v.title, model: model(v.title + ' ' + d.desc.split('\n')[0]),
              channel: v.channel, seconds: d.len, views: d.views, url: 'https://www.youtube.com/watch?v=' + v.id });
}
if (process.env.MERGE) rows.push(...JSON.parse(fs.readFileSync(process.env.MERGE,'utf8')));
rows.sort((a, b) => a.brand.localeCompare(b.brand) || b.date.localeCompare(a.date));
fs.writeFileSync('results.json', JSON.stringify(rows, null, 2));
const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
fs.writeFileSync('results.csv', '﻿品牌,年分,發布日期,標題,筆電型號,頻道,秒數,連結\n' +
  rows.map((r) => [r.brand, r.year, r.date, esc(r.title), esc(r.model), esc(r.channel), r.seconds, r.url].join(',')).join('\n'));
let md = '';
for (const b of Object.keys(QUERIES)) {
  md += `\n## ${b}\n\n| 年分 | 標題 | 筆電型號 | 影片連結 |\n|---|---|---|---|\n`;
  for (const r of rows.filter((x) => x.brand === b)) md += `| ${r.year} | ${r.title.replace(/\|/g, '/')} | ${r.model} | ${r.url} |\n`;
}
fs.writeFileSync('results.md', md);
console.error(`done: ${rows.length} videos`);
