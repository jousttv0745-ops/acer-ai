# 01｜學習路徑：AI 裝置形象影片

> **目標：** 能獨立規劃並產出「用裝置內建 AI 軟體帶動筆電／手機銷售」的形象影片，最後由 Claude Code 生成影片。
> **連結標記：** ✅ 2026-09-29 已用網路搜尋確認存在　⚠️ 依既有知識提供，使用前請點開確認

---

## 學習地圖（4 條路線、4 個階段）

| 階段 | 週數 | 影像敘事 | 動態設計 | 程式化動態 | AI 生成影片 | 階段產出 |
|---|---|---|---|---|---|---|
| S1 看懂 | 1–2 | 拆解 [品牌影片庫](02-brand-video-library.md) 中 6 支 | 12 動態原則 | 跑過 `demos/` 12 個 demo | 讀 [pipeline 文件](04-claude-code-video-pipeline.md) | 6 張拆解卡（`status: reviewed`） |
| S2 模仿 | 3–4 | 30 秒腳本＋分鏡 | 節奏與 easing | 改參數重做 3 個效果 | 用 starter 渲染第一支 MP4 | 12 秒 AI 功能片 v1 |
| S3 組合 | 5–6 | 功能片 → 系列片 | 品牌動態規範 | 把效果做成 sub-composition 區塊 | 旁白（TTS）＋配樂 | 3 支功能片＋動態規範草稿 |
| S4 系統化 | 7–8 | A/B 版本測試 | Design token 化 | 效果區塊庫＋變數化 | brief → 影片的固定流程 | 可重複的影片產線 |

---

## 路線 A｜影像敘事：AI 功能怎麼講

**核心問題：** AI 功能看不見，影片要把「看不見的能力」變成「看得見的前後差異」。

從品牌影片庫整理出 4 種常見敘事結構：

| 結構 | 節奏 | 代表 | 適合 |
|---|---|---|---|
| 痛點 → 開啟 AI → 結果 | 15–30s | Acer Video Presence、Apple Clean Up | 單一功能廣告 |
| 情境喜劇（功能是笑點） | 30–60s | Apple Clean Up: Flex、Pixel Dream Job | 社群投放 |
| 章節式旗艦片（硬體 → AI → 生態） | 60–120s | Galaxy S25/S26 Ultra Introduction Film | 發表會 |
| 導覽式實機示範 | 2–5min | Galaxy AI Guided Demo | 門市、官網 |

**資源**
- ⚠️ The Futur（YouTube）：品牌策略、廣告文案 — https://www.youtube.com/@thefutur
- ⚠️ Every Frame a Painting（YouTube）：剪輯與鏡頭語言 — https://www.youtube.com/@everyframeapainting
- ✅ 美國廣告自律機構（NAD）對 Apple AI 廣告的裁定：AI 功能廣告的法規紅線 — https://www.cnbc.com/2025/04/23/apple-ai-ads-went-too-far-watchdog-says.html

## 路線 B｜動態設計：動得好看

**核心概念：** easing（加速度曲線）、stagger（錯開）、anticipation（預備動作）、overshoot（回彈）、景深、節奏對拍。

- ⚠️ *The Illusion of Life*（迪士尼 12 動畫原則）：所有動態設計的基礎
- ⚠️ School of Motion：系統化動態設計課程（付費） — https://www.schoolofmotion.com/
- ⚠️ Ben Marriott（YouTube）：After Effects 動態設計教學 — https://www.youtube.com/@BenMarriott
- ⚠️ Apple Human Interface Guidelines – Motion — https://developer.apple.com/design/human-interface-guidelines/motion
- ⚠️ Material Design – Motion — https://m3.material.io/styles/motion/overview
- ✅ Dribbble AI Orb／Siri 動態搜尋（見 `data/inspiration-sources.json`）

## 路線 C｜程式化動態：把效果寫成程式

照 12 個工具的「層」來學，順序是從時間軸到 GPU：

```
① 時間軸   GSAP → Anime.js v4              （決定什麼時候、怎麼動）
② 2D 繪製  Canvas 2D → PixiJS → p5.js       （畫面怎麼畫出來）
③ 資料     D3.js                            （數據 → 形狀）
④ 風格     Rough.js                         （手繪質感）
⑤ 模擬     Matter.js → Falling Sand         （讓電腦算運動）
⑥ 3D／GPU  Three.js → GLSL                  （光、材質、流動）
⑦ 聲音     Tone.js                          （音效與聲音驅動畫面）
```

每個工具可拆出哪些「動態原子」（primitives），整理在 [`data/js-libraries.json`](../data/js-libraries.json) 與 [03 動態效果庫](03-motion-effects-library.md)。

- ✅ GSAP 文件（2025-04 起全部外掛免費） — https://gsap.com/docs/v3/ ・ https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/
- ✅ Anime.js v3 → v4 遷移 — https://github.com/juliangarnier/anime/wiki/Migrating-from-v3-to-v4
- ✅ Codrops 教學（shader × GSAP、音訊光球） — https://tympanus.net/codrops/
- ⚠️ The Book of Shaders（GLSL 入門首選） — https://thebookofshaders.com/
- ⚠️ Inigo Quilez 文章（SDF、色盤函式） — https://iquilezles.org/articles/
- ⚠️ Three.js Journey（Bruno Simon，付費） — https://threejs-journey.com/
- ⚠️ The Coding Train／The Nature of Code（p5.js、模擬） — https://thecodingtrain.com/ ・ https://natureofcode.com/

## 路線 D｜AI 工具：Skill、MCP、資料庫

### 影片生成（Claude Code 用）
| 工具 | 類型 | 用途 | 狀態 |
|---|---|---|---|
| **HyperFrames**（HeyGen，Apache-2.0） | CLI＋Agent Skills | HTML/CSS/GSAP → 確定性 MP4；`init` 會自動安裝 skills | ✅ 本 repo 已實測渲染成功 |
| **Remotion Agent Skills** | Skill | React → MP4；教 Claude 寫正確的 Remotion 程式 | ✅ 存在（https://www.remotion.dev/docs/ai/skills）；授權見 04 |
| **Motion MCP** | MCP（本 session 已連線） | 丟 brief 讓它自己研究並產出影片，會扣 credits | 已連線，未使用 |
| **Figma MCP** | MCP（本 session 已連線） | `get_motion_context` 讀動態規格、`create_shader` 做 shader | 已連線，未使用 |

### 素材生成
| 工具 | 用途 | 來源 |
|---|---|---|
| Blender MCP（`claude mcp add blender uvx blender-mcp`） | 用自然語言建產品 3D 場景、渲染轉台 | ✅ https://github.com/ahujasid/blender-mcp |
| ElevenLabs MCP（官方 hosted，OAuth） | 旁白 TTS、音效 | ✅ https://elevenlabs.io/mcp |
| Playwright（本機已裝 Chromium） | 錄製 UI 操作畫面、截圖驗證 | 內建 |

### 資料庫
- **本 repo 的 JSON**（`data/*.json`）是唯一資料來源：`scripts/build.mjs` 會產生 Markdown 與視覺資料庫頁面。
- 想做團隊協作時，可以把 JSON 匯入 Notion 或 Airtable。欄位已按「影片 × 效果 × 工具」三張表設計，彼此用 `id` 關聯。

---

## 每週練習模板

```
1. 選 1 支品牌影片 → 用「拆解卡」逐段記錄（時間碼／畫面／AI 功能／動態效果 id）
2. 從拆解卡挑 1 個效果 → 找到 demos/ 對應檔 → 改 3 個參數，觀察差異
3. 把效果放進 video/hyperframes-starter 的一個 composition → render
4. 把結果回寫到 data/brand-videos.json（status: reviewed）與 motion-effects.json
```

**拆解卡欄位**

| 時間碼 | 畫面描述 | AI 功能 | 效果 id | easing／時長 | 可借用程度（1–3） |
|---|---|---|---|---|---|
