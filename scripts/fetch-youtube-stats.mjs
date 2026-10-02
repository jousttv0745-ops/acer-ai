// 用 YouTube Data API v3 抓品牌影片的觀看數、按讚、留言、片長、上架日，寫回 data/brand-videos.json。
// 用法：YT_API_KEY=xxxx node scripts/fetch-youtube-stats.mjs && node scripts/build.mjs
// 每次呼叫只用 1 個 quota 單位（videos.list 一次最多 50 支），每日免費額度 10,000。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const key = process.env.YT_API_KEY;
if (!key) { console.error("缺少 YT_API_KEY 環境變數"); process.exit(1); }

const file = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../data/brand-videos.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));

const ytId = (url) => {
  try {
    const u = new URL(url);
    if (u.hostname.endsWith("youtube.com")) return u.searchParams.get("v");
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
  } catch {}
  return null;
};
// ISO 8601 片長（PT1M36S）→ 「1:36」
const dur = (iso) => {
  const m = iso?.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return null;
  const [h, mi, s] = [m[1], m[2], m[3]].map((x) => +(x || 0));
  return (h ? `${h}:${String(mi).padStart(2, "0")}` : `${mi}`) + `:${String(s).padStart(2, "0")}`;
};

const targets = data.videos.map((v) => [v, ytId(v.url)]).filter(([, id]) => id);
const today = new Date().toISOString().slice(0, 10);
const found = new Set();
for (let i = 0; i < targets.length; i += 50) {
  const batch = targets.slice(i, i + 50);
  const q = new URLSearchParams({ part: "statistics,snippet,contentDetails", id: batch.map(([, id]) => id).join(","), key });
  const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?${q}`);
  const body = await res.json();
  if (!res.ok) { console.error(body.error?.message || res.status); process.exit(1); }
  for (const item of body.items) {
    const v = batch.find(([, id]) => id === item.id)[0];
    found.add(v.id);
    v.stats = {
      views: item.statistics.viewCount != null ? +item.statistics.viewCount : null,
      likes: item.statistics.likeCount != null ? +item.statistics.likeCount : null, // 頻道可隱藏按讚數
      comments: item.statistics.commentCount != null ? +item.statistics.commentCount : null,
      duration: dur(item.contentDetails.duration),
      published: item.snippet.publishedAt.slice(0, 10),
      channel: item.snippet.channelTitle,
      fetched_at: today,
    };
  }
}
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");

const missing = targets.filter(([v]) => !found.has(v.id)).map(([v, id]) => `${v.id} (${id})`);
const skipped = data.videos.filter((v) => !ytId(v.url)).map((v) => v.id);
console.log(`已更新 ${found.size} 支`);
if (missing.length) console.log(`找不到（可能已下架或設為私人）：${missing.join(", ")}`);
if (skipped.length) console.log(`非 YouTube 連結，略過：${skipped.join(", ")}`);
