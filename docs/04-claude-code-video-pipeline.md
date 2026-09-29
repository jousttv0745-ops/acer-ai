# 04｜用 Claude Code 生成影片

> 本 repo 已實測：`video/hyperframes-starter` → 12 秒、1920×1080、30fps、H.264 MP4，渲染時間 39.7 秒（雲端容器、軟體 GPU）。

---

## 三條路線怎麼選

| | **HyperFrames**（推薦主線） | **Remotion** | **Motion MCP** |
|---|---|---|---|
| 寫法 | HTML + CSS + GSAP timeline | React 元件 + `useCurrentFrame()` | 用自然語言寫 brief |
| 和本資料庫的相容度 | 最高：`demos/` 就是 HTML，GSAP 直接沿用 | 中：效果要改寫成 React | 低：無法指定效果細節 |
| 授權 | Apache-2.0 | 3 人以下免費；4 人以上需 Company License（$25/創作者/月，最低 $100/月） | 依 credits 計費 |
| 控制程度 | 逐幀精確 | 逐幀精確 | 黑盒子，靠 follow-up 修改 |
| 適合 | 形象片、功能片、數據片 | 已有 React 團隊、要大量變體 | 快速概念片、提案用 |

來源：HyperFrames — https://github.com/heygen-com/hyperframes ；Remotion 授權 — https://www.remotion.dev/docs/license/pricing 、https://toolradar.com/tools/remotion/pricing ；Motion MCP — 本 session 的 MCP 伺服器說明。

> [WARNING] Remotion 的 Company License 金額來自第三方整理頁（toolradar），正式採購前請以 remotion.pro 官方頁面為準。

---

## HyperFrames 流程（本 repo）

```bash
cd video/hyperframes-starter
npx hyperframes preview --background   # 開 Studio 預覽（agent 專用的背景模式）
npm run check                          # lint + runtime + layout + motion + contrast
npm run render                         # → MP4
```

在雲端容器中，要先指定 Chromium 路徑並安裝 ffmpeg：
```bash
export HYPERFRAMES_BROWSER_PATH=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
apt-get install -y ffmpeg
```

### 專案結構：一個效果＝一個 sub-composition

```
video/hyperframes-starter/
├── index.html                          ← 主時間軸：只負責排列區塊（data-start / data-duration）
├── compositions/
│   ├── 01-edge-glow-headline.html      ← ai-edge-glow + text-generate
│   ├── 02-npu-grid-tops.html           ← stagger-grid-wave + data-counter
│   ├── 03-float-cards.html             ← ui-float-cards
│   └── 04-end-card.html                ← kinetic-type-mask
├── assets/gsap.min.js                  ← 本地化，渲染時不依賴網路
└── CLAUDE.md                           ← HyperFrames 官方給 Claude 的規則
```

### 把 demo 效果搬進影片的 5 條規則

HyperFrames 會逐幀 seek 時間軸，所以畫面必須是「時間 t 的純函式」：

1. **不用 `Math.random()`／`Date.now()`**：改用固定陣列，或 Anime.js 的 `createSeededRandom`。
2. **不用 `requestAnimationFrame` 累加狀態**：把狀態改寫成 `f(t)`，或放進 GSAP timeline（`onUpdate` 在 seek 時也會觸發）。
3. **物理／細胞自動機**（Matter.js、Falling Sand）：從第 0 幀開始固定步長模擬到目前幀，或先錄成影片素材再用 `<video muted>` 放進去。
4. **聲音**（Tone.js）：用 `Tone.Offline` 先輸出成音檔，放在 `<audio>`；聲音驅動的畫面改讀預先算好的 FFT 陣列。
5. **字型要宣告 `@font-face`**：否則 check 會報錯。中文用 `local("PingFang TC")`、`local("Noto Sans TC")` 等本機字型，或把 woff2 放進 `assets/`。

各效果的影片化難度寫在 `data/motion-effects.json` 的 `video_ready` 欄位：`yes`（直接搬）、`adapt`（需改造）、`asset`（先做成素材）。

---

## 給 Claude Code 的 brief 模板

```
用 video/hyperframes-starter 做一支 {秒數} 秒的 {產品} AI 功能片。
- 目標觀眾：{門市顧客／社群／發表會}
- 主打功能：{功能 1、2、3}（都已上市：是／否）
- 結構：{痛點 → 開啟 AI → 結果}
- 參考影片：data/brand-videos.json 裡的 {id}
- 效果：從 data/motion-effects.json 選 {effect id}
- 收尾：{品牌名＋標語}
完成後執行 npm run check 和 npm run render，並抽 4 格畫面給我看。
```

---

## 延伸：3D 產品鏡頭與旁白

| 需求 | 工具 | 做法 |
|---|---|---|
| 筆電開蓋、轉台 | Blender MCP 或 Three.js + GLTF | Blender 渲染出 mp4 素材 → `<video muted>` 放進 composition |
| 旁白 | ElevenLabs MCP／HyperFrames 內建 TTS | 產生音檔 → `<audio data-start>` |
| 配樂對拍 | HyperFrames `/music-to-video` skill | 節拍決定剪輯點 |
| 字幕 | HyperFrames `/embedded-captions` skill | 從音檔轉錄出逐字時間碼 |
