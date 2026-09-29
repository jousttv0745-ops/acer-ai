# acer-ai
AI projects developed with Claude Code and Codex

## AI Motion Atlas：AI 裝置形象影片的學習與視覺參考庫

目標：學會製作「用裝置內建 AI 軟體帶動筆電／手機銷售」的形象影片，並用 Claude Code 生成影片。

| 路徑 | 內容 |
|---|---|
| [`docs/01-learning-roadmap.md`](docs/01-learning-roadmap.md) | 學習路徑：影像敘事、動態設計、程式化動態、AI 工具（Skill／MCP），分 4 個階段 |
| [`docs/02-brand-video-library.md`](docs/02-brand-video-library.md) | 9 個品牌、21 支 AI 裝置影片（自動產生） |
| [`docs/03-motion-effects-library.md`](docs/03-motion-effects-library.md) | 20 種動態效果 × 12 個 JS 工具的拆解（自動產生） |
| [`docs/04-claude-code-video-pipeline.md`](docs/04-claude-code-video-pipeline.md) | 用 Claude Code 生成影片：HyperFrames／Remotion／Motion MCP 的比較與流程 |
| [`library/index.html`](library/index.html) | 視覺資料庫頁面：篩選、☆ 挑選、匯出清單、效果 × 工具矩陣 |
| [`demos/`](demos/) | 12 個可執行 demo，每個 JS 工具各一個 AI 影片效果 |
| [`video/hyperframes-starter/`](video/hyperframes-starter/) | 12 秒 AI PC 形象片 starter，已實測可渲染成 MP4 |
| `data/*.json` | 唯一資料來源：影片、效果、工具、靈感來源 |

### 更新資料庫
```bash
# 1. 編輯 data/*.json（例如把看過的影片 status 改成 "reviewed"）
# 2. 重新產生 Markdown 與資料庫頁面（會檢查 id 參照是否正確）
node scripts/build.mjs
```

### 渲染影片
```bash
cd video/hyperframes-starter
npm run check && npm run render   # 需要 Node 22+ 與 FFmpeg
```

### 12 個 demo
| 工具 | Demo | 效果 |
|---|---|---|
| GSAP | [`demos/gsap.html`](demos/gsap.html) | 浮動 UI 卡片＋標語逐字浮現 |
| Anime.js v4 | [`demos/anime.html`](demos/anime.html) | NPU 網格擴散波＋TOPS 數字跳動 |
| D3.js | [`demos/d3.html`](demos/d3.html) | 續航對比長條生長 |
| PixiJS | [`demos/pixi.html`](demos/pixi.html) | AI 光球＋粒子繞行 |
| Matter.js | [`demos/matter.html`](demos/matter.html) | 檔案掉落 → AI 自動分類 |
| Falling Sand | [`demos/falling-sand.html`](demos/falling-sand.html) | 物件消除化為沙 |
| Three.js | [`demos/three.html`](demos/three.html) | Fresnel 光球＋晶片爆炸圖 |
| GLSL | [`demos/glsl.html`](demos/glsl.html) | 螢幕邊緣流光 |
| Canvas 2D | [`demos/canvas2d.html`](demos/canvas2d.html) | 掃描線＋物件辨識框 |
| Rough.js | [`demos/rough.html`](demos/rough.html) | 手繪圈選 → 搜尋結果 |
| p5.js | [`demos/p5.html`](demos/p5.html) | 粒子聚合成字 |
| Tone.js | [`demos/tone.html`](demos/tone.html) | AI 降噪前後聲波（有聲音） |

Demo 透過 jsDelivr CDN 載入函式庫（版本已鎖定），直接用瀏覽器開啟即可。
