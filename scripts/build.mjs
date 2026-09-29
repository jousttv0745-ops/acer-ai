// 以 data/*.json 為唯一資料來源，產生：
//   docs/02-brand-video-library.md、docs/03-motion-effects-library.md、library/index.html
// 用法：node scripts/build.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => JSON.parse(fs.readFileSync(path.join(root, f), "utf8"));
const effects = read("data/motion-effects.json");
const videos = read("data/brand-videos.json");
const libraries = read("data/js-libraries.json");
const sources = read("data/inspiration-sources.json");

// ── 參照完整性檢查：影片母題、靈感來源都要指到存在的效果 id ──
const effIds = new Set(effects.effects.map((e) => e.id));
const libNames = new Set(libraries.libraries.map((l) => l.name));
const errors = [];
videos.videos.forEach((v) => v.motifs.forEach((m) => effIds.has(m) || errors.push(`video ${v.id}: unknown motif ${m}`)));
sources.sources.forEach((s) => s.effects.forEach((m) => effIds.has(m) || errors.push(`source ${s.id}: unknown effect ${m}`)));
effects.effects.forEach((e) => {
  Object.keys(e.implementations).forEach((k) => libNames.has(k) || errors.push(`effect ${e.id}: unknown library ${k}`));
  if (e.demo && !fs.existsSync(path.join(root, e.demo))) errors.push(`effect ${e.id}: missing demo ${e.demo}`);
  if (e.demo_lib && !libNames.has(e.demo_lib)) errors.push(`effect ${e.id}: unknown demo_lib ${e.demo_lib}`);
  const prev = e.demo && path.join(root, "library/previews", path.basename(e.demo, ".html") + ".webp");
  if (prev && !fs.existsSync(prev)) errors.push(`effect ${e.id}: missing preview ${path.relative(root, prev)}`);
});
const dup = (arr) => arr.filter((x, i) => arr.indexOf(x) !== i);
dup([...effIds, ...videos.videos.map((v) => v.id), ...libraries.libraries.map((l) => l.id), ...sources.sources.map((s) => s.id)])
  .forEach((d) => errors.push(`duplicate id ${d}`));
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }

const cell = (s) => String(s ?? "—").replace(/\|/g, "\\|").replace(/\n/g, " ");
const effName = Object.fromEntries(effects.effects.map((e) => [e.id, e.name]));
const READY = { yes: "✅ 可直接渲染", adapt: "🟡 需改造", asset: "🟣 做成素材" };

// ── docs/02 ──
const byBrand = {};
videos.videos.forEach((v) => (byBrand[v.brand] ||= []).push(v));
let md2 = `# 02｜AI 裝置品牌影片參考庫\n\n> 自動產生自 \`data/brand-videos.json\`（${videos._meta.updated}），請改 JSON 後執行 \`node scripts/build.mjs\`，不要直接改這份檔案。\n> ${videos._meta.note}\n\n`;
md2 += `## 市場脈絡\n\n${videos.context_notes.map((n) => `- **${n.title}**：${n.text}（來源：${n.source}）`).join("\n")}\n\n`;
for (const [brand, list] of Object.entries(byBrand)) {
  md2 += `## ${brand}\n\n| 影片 | 類型 | 日期 | AI 功能 | 預期母題 | 觀看重點 | 狀態 |\n|---|---|---|---|---|---|---|\n`;
  list.forEach((v) => {
    md2 += `| [${cell(v.title)}](${v.url}) | ${v.type} | ${cell(v.date)} | ${cell(v.ai_features.join("、"))} | ${cell(v.motifs.map((m) => `\`${m}\``).join(" "))} | ${cell(v.watch_focus)} | ${v.status} |\n`;
  });
  md2 += "\n";
}
fs.writeFileSync(path.join(root, "docs/02-brand-video-library.md"), md2);

// ── docs/03 ──
const libs = libraries.libraries;
let md3 = `# 03｜動態效果庫與 JS 工具拆解\n\n> 自動產生自 \`data/motion-effects.json\` 與 \`data/js-libraries.json\`，請改 JSON 後執行 \`node scripts/build.mjs\`。\n\n`;
md3 += `## 效果 × 工具矩陣\n\n▶ = 本 repo 有 demo　● = 有實作路線\n\n| 效果 | ${libs.map((l) => l.name).join(" | ")} |\n|---|${libs.map(() => ":-:").join("|")}|\n`;
effects.effects.forEach((e) => {
  md3 += `| ${e.name} \`${e.id}\` | ${libs.map((l) => (e.implementations[l.name] ? (e.demo && (e.demo === l.demo || e.demo_lib === l.name) ? "▶" : "●") : "")).join(" | ")} |\n`;
});
md3 += `\n## 效果清單\n\n`;
for (const [cat, label] of Object.entries(effects._meta.categories)) {
  md3 += `### ${label}\n\n`;
  effects.effects.filter((e) => e.category === cat).forEach((e) => {
    md3 += `#### ${e.name}　\`${e.id}\`　${READY[e.video_ready]}\n\n`;
    md3 += `- **想傳達：** ${e.message}\n- **常見於：** ${e.seen_in.join("、")}\n- **配方：** ${e.recipe}\n`;
    if (e.demo) md3 += `- **Demo：** [\`${e.demo}\`](../${e.demo})\n`;
    md3 += `\n| 工具 | 實作路線 |\n|---|---|\n${Object.entries(e.implementations).map(([k, v]) => `| ${k} | ${cell(v)} |`).join("\n")}\n`;
    if (e.refs.length) md3 += `\n參考：${e.refs.map((r) => `<${r}>`).join(" ・ ")}\n`;
    md3 += "\n";
  });
}
md3 += `## 12 個工具的動態原子\n\n`;
libs.forEach((l) => {
  md3 += `### ${l.name}${l.npm ? `　\`${l.npm}@${l.version}\`` : ""}\n\n${l.one_liner}　·　授權：${l.license}　·　影片化：${l.video_fit}\n\n| 動態原子 | API | 用在 |\n|---|---|---|\n`;
  md3 += l.primitives.map((p) => `| ${cell(p.name)} | \`${cell(p.api)}\` | ${cell(p.use)} |`).join("\n");
  md3 += `\n\n${l.demo ? `Demo：[\`${l.demo}\`](../${l.demo})　` : ""}文件：<${l.docs}>\n\n`;
});
md3 += `## 靈感來源\n\n| 平台 | 標題 | 對應效果 |\n|---|---|---|\n`;
md3 += sources.sources.map((s) => `| ${s.platform} | [${cell(s.title)}](${s.url}) | ${s.effects.map((m) => effName[m]).join("、") || "—"} |`).join("\n") + "\n";
fs.writeFileSync(path.join(root, "docs/03-motion-effects-library.md"), md3);

// ── library/index.html：把資料內嵌進模板（artifact 不能 fetch 外部 JSON）──
//   --artifact <file>：另外輸出一份 demo 路徑以頁面為根的版本（發布成 artifact 時用）
const tpl = fs.readFileSync(path.join(root, "library/template.html"), "utf8");
if (!tpl.includes("/*__DATA__*/null") || !tpl.includes('/*__BASE__*/""')) throw new Error("template placeholder missing");
const data = JSON.stringify({ effects, videos, libraries, sources }).replace(/</g, "\\u003c");
const page = (base) => tpl.replace("/*__DATA__*/null", () => data).replace('/*__BASE__*/""', JSON.stringify(base));
fs.writeFileSync(path.join(root, "library/index.html"), page("../"));
const ai = process.argv.indexOf("--artifact");
if (ai > -1) fs.writeFileSync(path.resolve(process.argv[ai + 1]), page(""));

console.log(`built: ${effects.effects.length} effects, ${videos.videos.length} videos, ${libs.length} libraries, ${sources.sources.length} sources`);
