# 02｜AI 裝置品牌影片參考庫

> 自動產生自 `data/brand-videos.json`（2026-09-29），請改 JSON 後執行 `node scripts/build.mjs`，不要直接改這份檔案。
> URL 皆來自 2026-09-29 的網路搜尋結果（見 source）。motifs 是依影片類型與功能推測的「預期視覺母題」，status=to-watch 代表尚未逐格觀看確認；看過後請把 status 改成 reviewed 並修正 motifs / notes。

## 市場脈絡

- **Microsoft 淡化「Copilot+ PC」品牌**：2026-09-25 有報導指出 Microsoft 正逐步停用 Copilot+ PC 標示。對 Acer 的影響：影片不宜以 Copilot+ 為主訴求，應讓 Acer 自家 AI（Intelligence Space、AcerSense、PurifiedVoice 等）成為主角。（來源：https://9to5google.com/2026/09/25/microsoft-quietly-ending-copilot-pc-branding-for-windows-laptops/）
- **AI 廣告的法規風險**：美國廣告自律機構 NAD 認為 Apple 宣傳尚未推出的 Apple Intelligence 功能過度，建議避免暗示功能已可使用。Google Pixel 10 廣告也拿「coming soon」嘲諷對手。影片中每個 AI 功能都要標清楚是否已上市、需要哪些硬體條件。（來源：https://www.cnbc.com/2025/04/23/apple-ai-ads-went-too-far-watchdog-says.html ; https://www.phonearena.com/news/new-google-pixel-10-ad-calls-out-vague-timing-on-coming-soon-featureswas-that-a-shot-at-apple_id172886）

## Acer

| 影片 | 類型 | 日期 | AI 功能 | 預期母題 | 觀看重點 | 狀態 |
|---|---|---|---|---|---|---|
| [AI Enhanced Video Presence \| Swift 14 AI Copilot+ PC](https://www.youtube.com/watch?v=5d3CpUS1Xto) | feature-ad | 2024-12-23 | Windows Studio Effects、視訊畫面 AI 增強 | `before-after-wipe` `ui-float-cards` | 單一功能怎麼在 15–30 秒內講清楚：開場痛點 → 開啟 AI → 對比結果 | to-watch |
| [Swift 14 AI Copilot+ PC \| We Got You \| Acer](https://www.youtube.com/watch?v=wb79p9szy9Q) | brand-spot | — | Copilot+ PC 體驗總覽 | `kinetic-type-mask` `device-reveal` | 情境敘事（人）與產品特寫（物）的比例；標語如何收尾 | to-watch |
| [Acer AI Solutions \| AcerSense™ \| Acer](https://www.youtube.com/watch?v=Lffj-v1P2Y8) | explainer | — | 系統診斷與最佳化、PurifiedView / PurifiedVoice | `scan-detect` `data-viz-grow` `audio-denoise` | 自家預載軟體（非 Microsoft 功能）怎麼被包裝；UI 錄屏與動態圖形的混合方式 | to-watch |

## Apple

| 影片 | 類型 | 日期 | AI 功能 | 預期母題 | 觀看重點 | 狀態 |
|---|---|---|---|---|---|---|
| [Apple Intelligence \| Imagine it. Genmoji it. \| iPhone 16](https://www.youtube.com/watch?v=XROs4K67Y9Q) | feature-ad | — | Genmoji | `text-generate` `ai-edge-glow` | 生成式功能的「輸入 → 等待 → 結果」節奏；等待瞬間用什麼視覺表示 AI 在思考 | to-watch |
| [Apple Intelligence \| Clean Up Photos: Flex \| iPhone 16](https://www.youtube.com/watch?v=iL88A5F9V3k) | feature-ad | 2025-04-21 | Clean Up（物件消除） | `object-erase-dissolve` `before-after-wipe` | 喜劇短片結構：功能是故事的笑點而不是規格；物件消除的過場效果 | to-watch |
| [Write Smarter（Apple Intelligence Writing Tools）](https://www.thedrum.com/news/2024/10/30/ad-the-day-apple-promotes-ai-powered-intelligence-tool-two-sharp-spots) | feature-ad | 2024-10-30 | Writing Tools（改寫成專業語氣） | `text-generate` | 文字類 AI 功能的畫面化：文字改寫的過場。連結為 The Drum 報導，影片本體請從報導內嵌觀看 | to-watch |

## Samsung

| 影片 | 類型 | 日期 | AI 功能 | 預期母題 | 觀看重點 | 狀態 |
|---|---|---|---|---|---|---|
| [Introducing Galaxy S25 Ultra \| Galaxy AI \| Samsung](https://www.youtube.com/watch?v=3i1OB6wKYms) | launch-film | 2025-01-22 | Now Brief、Cross-app actions、Audio Eraser | `device-reveal` `ai-edge-glow` `ui-float-cards` `audio-denoise` | 旗艦 launch film 的章節切分；硬體材質鏡頭與 AI 功能段落如何交錯 | to-watch |
| [A Guided Demo of Galaxy AI \| Galaxy S25 Series \| Samsung](https://www.youtube.com/watch?v=mAUdVyXEJ2M) | guided-demo | 2025-02-07 | Galaxy AI 多項功能實機示範 | `ui-float-cards` `circle-to-search` `scan-detect` | 實機錄屏的包裝：手部、放大鏡、焦點框；適合當作「功能教學影片」模板 | to-watch |
| [Introducing Galaxy S26 Ultra \| Galaxy AI \| Samsung](https://www.youtube.com/watch?v=sUMjugzsZsA) | launch-film | 2026-03-05 | Galaxy AI、Privacy Display | `device-reveal` `before-after-wipe` `ai-edge-glow` | 硬體功能（Privacy Display）與 AI 功能同片呈現時的比重；與 S25 版比較一年間的視覺語言演進 | to-watch |
| [A Guided Demo of Galaxy AI \| Galaxy S26 Ultra \| Samsung](https://www.youtube.com/watch?v=aSzej7a_gUI) | guided-demo | — | Galaxy AI 實機示範 | `ui-float-cards` `scan-detect` | 與 S25 guided demo 對照：模板化程度、字卡設計、節奏 | to-watch |

## Google

| 影片 | 類型 | 日期 | AI 功能 | 預期母題 | 觀看重點 | 狀態 |
|---|---|---|---|---|---|---|
| [Google Pixel 10 With Magic Cue \| Answers](https://www.youtube.com/watch?v=Dniq4Vfbrbs) | feature-ad | — | Magic Cue（主動浮出資訊） | `ui-float-cards` `text-generate` | 「主動式 AI」的視覺化：資訊在對的時機自己出現。對 Acer 的 Smart/Agent 類功能很有參考價值 | to-watch |
| [Meet Google Pixel 10 With Gemini \| Do Spectacular Things, Every Day](https://www.youtube.com/watch?v=vL5Lxsh1GUM) | launch-film | 2025-08 | Gemini Live、Camera Coach、Magic Cue | `ai-orb` `scan-detect` `kinetic-type-mask` | Google 的色彩系統與 Gemini 漸層光；日常生活情境剪輯的節奏 | to-watch |
| [New Home \| Google Gemini Super Bowl Commercial 2026](https://www.youtube.com/watch?v=Z1yGy9fELtE) | brand-spot | 2026-02 | Gemini | `kinetic-type-mask` | 大型品牌廣告如何只講情感不講規格；AI 在敘事裡的角色定位 | to-watch |
| [Dream Job（Pixel 9 × Gemini Live）](https://blog.google/products-and-platforms/devices/pixel/pixel-ad-dream-job-gemini-live/) | brand-spot | 2025-02 | Gemini Live（語音對話） | `ai-orb` `audio-reactive` | 語音 AI 助理的畫面表現：對話波形、光球、字幕。Super Bowl 2025 檔期 | to-watch |

## Microsoft

| 影片 | 類型 | 日期 | AI 功能 | 預期母題 | 觀看重點 | 狀態 |
|---|---|---|---|---|---|---|
| [Full Keynote: Introducing Copilot+ PCs](https://www.youtube.com/watch?v=aZbHd4suAnQ) | keynote | 2024-05-20 | Recall、Cocreator、Live Captions、Windows Studio Effects | `exploded-view` `data-viz-grow` `sketch-to-image` `ui-float-cards` | 發表會中插播的 sizzle / 產品短片（非演講段落）；NPU TOPS 的數據視覺化 | to-watch |
| [Meet the new Surface Copilot+ PCs](https://www.youtube.com/watch?v=_0u0fQuzikA) | launch-film | — | Copilot 鍵、Click to Do | `device-reveal` `kinetic-type-mask` | 筆電的鏡頭語言：開蓋、側邊輪廓、鍵盤特寫（Copilot 鍵） | to-watch |

## ASUS

| 影片 | 類型 | 日期 | AI 功能 | 預期母題 | 觀看重點 | 狀態 |
|---|---|---|---|---|---|---|
| [ASUS Zenbook Series - Zenbook Does More](https://www.youtube.com/watch?v=p-_gzYSI-kQ) | launch-film | 2025-02-11 | Copilot+ PC、ASUS AI 應用 | `device-reveal` `exploded-view` | 台廠直接競品：材質（Ceraluminum）鏡頭與 AI 段落的比例，和 Acer 對照 | to-watch |
| [ASUS Zenbook 14 (UX3480) \| 2026](https://www.youtube.com/watch?v=dZ4-0WCkaKc) | launch-film | 2026-07-16 | smart AI | `device-reveal` | 2026 年最新競品片：AI 訊息是否比 2025 年更低調（見 Copilot+ 品牌淡化趨勢） | to-watch |

## HP

| 影片 | 類型 | 日期 | AI 功能 | 預期母題 | 觀看重點 | 狀態 |
|---|---|---|---|---|---|---|
| [HP AI Companion](https://www.youtube.com/watch?v=qL7kr1ckgDE) | explainer | — | HP AI Companion（本地文件分析、PC 設定助理） | `text-generate` `ui-float-cards` | OEM 自家 AI 助理怎麼和 Copilot 做出區隔；對 Acer Intelligence Space 最直接的對照組 | to-watch |

## Lenovo

| 影片 | 類型 | 日期 | AI 功能 | 預期母題 | 觀看重點 | 狀態 |
|---|---|---|---|---|---|---|
| [Using Smart Modes - Lenovo Aura Edition](https://pcsupport.lenovo.com/us/en/products/laptops-and-netbooks/yoga-series/yoga-7-2-in-1-14iph11/videos/ytv104642) | explainer | — | Smart Modes（Attention / Wellness / Collaboration / Shield / Power） | `ui-float-cards` `scan-detect` | 「情境自動切換」類功能的畫面化；Lenovo × Intel 聯名包裝方式 | to-watch |

## Nothing

| 影片 | 類型 | 日期 | AI 功能 | 預期母題 | 觀看重點 | 狀態 |
|---|---|---|---|---|---|---|
| [Nothing Essential（AI 生成 mini app）發表影片](https://9to5google.com/2025/09/30/nothing-essential-ai-app-generator-promises/) | launch-film | 2025-09-30 | Essential Space、Essential Apps（prompt 生成 app） | `particle-assemble` `stagger-grid-wave` | 小品牌的強烈視覺識別（點陣字、黑白紅）如何套用到 AI 敘事。影片內嵌於 9to5Google 報導 | to-watch |

