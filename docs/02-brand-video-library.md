# 02｜AI 裝置品牌影片參考庫

> 自動產生自 `data/brand-videos.json`（2026-09-29），請改 JSON 後執行 `node scripts/build.mjs`，不要直接改這份檔案。
> URL 皆來自 2026-09-29 的網路搜尋結果（見 source）。motifs 是依影片類型與功能推測的「預期視覺母題」，status=to-watch 代表尚未逐格觀看確認；看過後請把 status 改成 reviewed 並修正 motifs / notes。
> 觀看數由 scripts/fetch-youtube-stats.mjs 透過 YouTube Data API v3 抓取（需 YT_API_KEY）；非 YouTube 連結不抓。

## 市場脈絡

- **Microsoft 淡化「Copilot+ PC」品牌**：2026-09-25 有報導指出 Microsoft 正逐步停用 Copilot+ PC 標示。對 Acer 的影響：影片不宜以 Copilot+ 為主訴求，應讓 Acer 自家 AI（Intelligence Space、AcerSense、PurifiedVoice 等）成為主角。（來源：https://9to5google.com/2026/09/25/microsoft-quietly-ending-copilot-pc-branding-for-windows-laptops/）
- **AI 廣告的法規風險**：美國廣告自律機構 NAD 認為 Apple 宣傳尚未推出的 Apple Intelligence 功能過度，建議避免暗示功能已可使用。Google Pixel 10 廣告也拿「coming soon」嘲諷對手。影片中每個 AI 功能都要標清楚是否已上市、需要哪些硬體條件。（來源：https://www.cnbc.com/2025/04/23/apple-ai-ads-went-too-far-watchdog-says.html ; https://www.phonearena.com/news/new-google-pixel-10-ad-calls-out-vague-timing-on-coming-soon-featureswas-that-a-shot-at-apple_id172886）

## 敘事結構分布

| 結構 | 說明 | 支數 | 影片 |
|---|---|--:|---|
| `problem-solution` | 痛點 → 開啟 AI → 結果 | 2 | Acer：AI Enhanced Video Presence \| Swift 14 AI Copilot+ PC<br>Google：Google Pixel 10 With Magic Cue \| Answers |
| `comedy-sketch` | 情境喜劇：功能是笑點的解答 | 2 | Apple：Apple Intelligence \| Clean Up Photos: Flex \| iPhone 16<br>Apple：Write Smarter（Apple Intelligence Writing Tools） |
| `emotional-life` | 人生故事：AI 陪人度過轉變 | 2 | Google：New Home \| Google Gemini Super Bowl Commercial 2026<br>Google：Dream Job（Pixel 9 × Gemini Live） |
| `music-montage` | 配樂快剪：大量成果堆疊 | 1 | Apple：Apple Intelligence \| Imagine it. Genmoji it. \| iPhone 16 |
| `feature-montage` | 功能快剪：多功能日常剪輯 | 1 | Google：Meet Google Pixel 10 With Gemini \| Do Spectacular Things, Every Day |
| `chaptered-launch` | 章節式旗艦發表片 | 2 | Samsung：Introducing Galaxy S25 Ultra \| Galaxy AI \| Samsung<br>Samsung：Introducing Galaxy S26 Ultra \| Galaxy AI \| Samsung |
| `guided-demo` | 實機導覽：逐功能示範 | 2 | Samsung：A Guided Demo of Galaxy AI \| Galaxy S25 Series \| Samsung<br>Samsung：A Guided Demo of Galaxy AI \| Galaxy S26 Ultra \| Samsung |
| `product-beauty` | 產品美感片：材質、外型、規格 | 3 | Microsoft：Meet the new Surface Copilot+ PCs<br>ASUS：ASUS Zenbook Series - Zenbook Does More<br>ASUS：ASUS Zenbook 14 (UX3480) \| 2026 |
| `brand-spot` | 品牌標語片 | 1 | Acer：Swift 14 AI Copilot+ PC \| We Got You \| Acer |
| `manifesto` | 宣言片：願景先行 | 1 | Nothing：Nothing Essential（AI 生成 mini app）發表影片 |
| `keynote` | 發表會演講 | 1 | Microsoft：Full Keynote: Introducing Copilot+ PCs |
| `explainer` | 功能說明 | 2 | Acer：Acer AI Solutions \| AcerSense™ \| Acer<br>HP：HP AI Companion |
| `tutorial` | 操作教學 | 1 | Lenovo：Using Smart Modes - Lenovo Aura Edition |

可信度：**high** 有媒體逐段描述劇情；**medium** 功能與定位有官方或媒體來源，段落順序為推測；**low** 僅有標題或簡介，結構依影片類型推測

## 總表

| 品牌 | 影片 | 結構 | 觀看數 | 片長 | 上架日 | 可信度 |
|---|---|---|--:|---|---|---|
| Acer | [AI Enhanced Video Presence \| Swift 14 AI Copilot+ PC](https://www.youtube.com/watch?v=5d3CpUS1Xto) | 痛點 → 開啟 AI → 結果 | — | — | 2024-12-23 | medium |
| Acer | [Swift 14 AI Copilot+ PC \| We Got You \| Acer](https://www.youtube.com/watch?v=wb79p9szy9Q) | 品牌標語片 | — | — | — | low |
| Acer | [Acer AI Solutions \| AcerSense™ \| Acer](https://www.youtube.com/watch?v=Lffj-v1P2Y8) | 功能說明 | — | — | — | low |
| Apple | [Apple Intelligence \| Imagine it. Genmoji it. \| iPhone 16](https://www.youtube.com/watch?v=XROs4K67Y9Q) | 配樂快剪 | — | — | — | medium |
| Apple | [Apple Intelligence \| Clean Up Photos: Flex \| iPhone 16](https://www.youtube.com/watch?v=iL88A5F9V3k) | 情境喜劇 | — | 36 秒 | 2025-04-21 | high |
| Apple | [Write Smarter（Apple Intelligence Writing Tools）](https://www.thedrum.com/news/2024/10/30/ad-the-day-apple-promotes-ai-powered-intelligence-tool-two-sharp-spots) | 情境喜劇 | — | — | 2024-10-30 | high |
| Samsung | [Introducing Galaxy S25 Ultra \| Galaxy AI \| Samsung](https://www.youtube.com/watch?v=3i1OB6wKYms) | 章節式旗艦發表片 | — | — | 2025-01-22 | medium |
| Samsung | [A Guided Demo of Galaxy AI \| Galaxy S25 Series \| Samsung](https://www.youtube.com/watch?v=mAUdVyXEJ2M) | 實機導覽 | — | — | 2025-02-07 | medium |
| Samsung | [Introducing Galaxy S26 Ultra \| Galaxy AI \| Samsung](https://www.youtube.com/watch?v=sUMjugzsZsA) | 章節式旗艦發表片 | — | — | 2026-03-05 | medium |
| Samsung | [A Guided Demo of Galaxy AI \| Galaxy S26 Ultra \| Samsung](https://www.youtube.com/watch?v=aSzej7a_gUI) | 實機導覽 | — | — | — | low |
| Google | [Google Pixel 10 With Magic Cue \| Answers](https://www.youtube.com/watch?v=Dniq4Vfbrbs) | 痛點 → 開啟 AI → 結果 | — | — | — | medium |
| Google | [Meet Google Pixel 10 With Gemini \| Do Spectacular Things, Every Day](https://www.youtube.com/watch?v=vL5Lxsh1GUM) | 功能快剪 | — | 30 秒 | 2025-08 | medium |
| Google | [New Home \| Google Gemini Super Bowl Commercial 2026](https://www.youtube.com/watch?v=Z1yGy9fELtE) | 人生故事 | — | 60 秒 | 2026-02 | high |
| Google | [Dream Job（Pixel 9 × Gemini Live）](https://blog.google/products-and-platforms/devices/pixel/pixel-ad-dream-job-gemini-live/) | 人生故事 | — | — | 2025-02 | high |
| Microsoft | [Full Keynote: Introducing Copilot+ PCs](https://www.youtube.com/watch?v=aZbHd4suAnQ) | 發表會演講 | — | — | 2024-05-20 | medium |
| Microsoft | [Meet the new Surface Copilot+ PCs](https://www.youtube.com/watch?v=_0u0fQuzikA) | 產品美感片 | — | — | — | medium |
| ASUS | [ASUS Zenbook Series - Zenbook Does More](https://www.youtube.com/watch?v=p-_gzYSI-kQ) | 產品美感片 | — | — | 2025-02-11 | low |
| ASUS | [ASUS Zenbook 14 (UX3480) \| 2026](https://www.youtube.com/watch?v=dZ4-0WCkaKc) | 產品美感片 | — | — | 2026-07-16 | medium |
| HP | [HP AI Companion](https://www.youtube.com/watch?v=qL7kr1ckgDE) | 功能說明 | — | — | — | medium |
| Lenovo | [Using Smart Modes - Lenovo Aura Edition](https://pcsupport.lenovo.com/us/en/products/laptops-and-netbooks/yoga-series/yoga-7-2-in-1-14iph11/videos/ytv104642) | 操作教學 | — | — | — | medium |
| Nothing | [Nothing Essential（AI 生成 mini app）發表影片](https://9to5google.com/2025/09/30/nothing-essential-ai-app-generator-promises/) | 宣言片 | — | — | 2025-09-30 | medium |

## Acer

### [AI Enhanced Video Presence | Swift 14 AI Copilot+ PC](https://www.youtube.com/watch?v=5d3CpUS1Xto)

**痛點 → 開啟 AI → 結果**　·　可信度 medium　·　觀看數 —

> 視訊會議畫面不理想 → 開啟 Swift 14 AI 的 PurifiedView 2.0 → 自動取景、背景虛化、眼神校正，自信上鏡。

1. **痛點**：視訊會議中構圖、光線、視線不佳（推測）
2. **轉折**：開啟 AI 視訊增強
3. **證明**：逐一示範自動取景、背景虛化、眼神校正
4. **收尾**：產品＋ Copilot+ PC ＋ Intel Core Ultra 標示（推測）

- AI 角色：工具：讓使用者看起來更好
- AI 功能：Windows Studio Effects、視訊畫面 AI 增強
- 預期母題：`before-after-wipe` `ui-float-cards`
- 觀看重點：單一功能怎麼在 15–30 秒內講清楚：開場痛點 → 開啟 AI → 對比結果
- 來源：<https://www.acer.com/us-en/laptops/swift/swift-14-16-ai> ・ <https://www.youtube.com/watch?v=5d3CpUS1Xto>

### [Swift 14 AI Copilot+ PC | We Got You | Acer](https://www.youtube.com/watch?v=wb79p9szy9Q)

**品牌標語片**　·　可信度 low　·　觀看數 —

> 「A laptop that's ready for any challenge, just like you」：把筆電擬人化成可靠的夥伴，以 AI 視訊通話為主要功能證明。

1. **情境**：使用者面對工作／生活挑戰（推測）
2. **功能**：AI 強化的視訊通話（PurifiedView）
3. **收尾**：標語 We Got You

- AI 角色：夥伴：陪你面對挑戰
- 標語：We Got You
- AI 功能：Copilot+ PC 體驗總覽
- 預期母題：`kinetic-type-mask` `device-reveal`
- 觀看重點：情境敘事（人）與產品特寫（物）的比例；標語如何收尾
- 來源：<https://www.youtube.com/watch?v=8AuEYIyuyoc>

### [Acer AI Solutions | AcerSense™ | Acer](https://www.youtube.com/watch?v=Lffj-v1P2Y8)

**功能說明**　·　可信度 low　·　觀看數 —

> 介紹 Acer 預載的 AI 工具：AcerSense 系統診斷與最佳化，搭配 PurifiedView／PurifiedVoice 的畫面與聲音增強。

1. **定位**：Acer 自家 AI 工具套件
2. **功能**：診斷、最佳化、視訊與聲音增強
3. **收尾**：引導到 Acer Intelligence Space（推測）

- AI 角色：管家：在背景照顧電腦
- AI 功能：系統診斷與最佳化、PurifiedView / PurifiedVoice
- 預期母題：`scan-detect` `data-viz-grow` `audio-denoise`
- 觀看重點：自家預載軟體（非 Microsoft 功能）怎麼被包裝；UI 錄屏與動態圖形的混合方式
- 來源：<https://www.acer.com/us-en/ai/acer-intelligence-space>

## Apple

### [Apple Intelligence | Imagine it. Genmoji it. | iPhone 16](https://www.youtube.com/watch?v=XROs4K67Y9Q)

**配樂快剪：大量成果堆疊**　·　可信度 medium　·　觀看數 —

> 配樂驅動的快剪：大量 Genmoji 生成結果一個接一個跳出，最後收在「Imagine it. Genmoji it.」。

1. **開場**：配樂起，第一個 Genmoji 出現
2. **堆疊**：快速剪接各種提示詞生成的 Genmoji
3. **收尾**：標語 Imagine it. Genmoji it. ＋ iPhone 16

- AI 角色：創意玩具：你想得到就做得出
- 標語：Imagine it. Genmoji it.
- 配樂：The Dare〈Anything You Like〉
- AI 功能：Genmoji
- 預期母題：`text-generate` `ai-edge-glow`
- 觀看重點：生成式功能的「輸入 → 等待 → 結果」節奏；等待瞬間用什麼視覺表示 AI 在思考
- 來源：<https://www.ispot.tv/ad/fQ6F/apple-iphone-16-imagine-it-genmoji-it-song-by-the-dare> ・ <https://9to5mac.com/2024/12/11/apple-iphone-ad-genmoji/>

### [Apple Intelligence | Clean Up Photos: Flex | iPhone 16](https://www.youtube.com/watch?v=iL88A5F9V3k)

**情境喜劇：功能是笑點的解答**　·　可信度 high　·　觀看數 —

> 健身房裡的年輕男子請年長女性幫他拍秀肌肉的照片，卻發現背景映出她的倒影；他用 Clean Up 一點就把她移除。

1. **設定**：男子在健身房對 iPhone 16 擺姿勢，年長女性幫忙拍照
2. **麻煩**：照片背景出現她的倒影
3. **轉折**：打開 Photos，用 Clean Up 圈選移除
4. **收尾**：「Clean up photos with a tap」＋ Apple logo

- AI 角色：笑點的解答：問題出現的下一秒就解決
- 標語：Clean up photos with a tap.
- 配樂：Giraffage〈Workout〉
- 長度：36 秒
- 製作：Apple 內部團隊（推測）
- AI 功能：Clean Up（物件消除）
- 預期母題：`object-erase-dissolve` `before-after-wipe`
- 觀看重點：喜劇短片結構：功能是故事的笑點而不是規格；物件消除的過場效果
- 來源：<https://appleinsider.com/articles/25/04/21/apple-cleans-up-its-image-with-apple-intelligence-in-a-new-ad-spot> ・ <https://www.ilounge.com/news/apple/new-apple-intelligence-video-highlights-clean-up-in-photos>

### [Write Smarter（Apple Intelligence Writing Tools）](https://www.thedrum.com/news/2024/10/30/ad-the-day-apple-promotes-ai-powered-intelligence-tool-two-sharp-spots)

**情境喜劇：功能是笑點的解答**　·　可信度 high　·　觀看數 —

> 上班族 Warren 寫信一向太隨便（「this project might need a bit... zhuhzing」「Holler back」），用 Writing Tools 一鍵改成專業語氣，老闆讀完愣住。

1. **設定**：Warren 打出一封非常口語的信
2. **轉折**：點 Writing Tools 改寫成專業語氣
3. **反應**：老闆讀信後一臉困惑、說不出話
4. **收尾**：Apple Intelligence ＋ iPhone 16 Pro

- AI 角色：化妝師：讓你看起來比實際更專業
- 標語：Write smarter.
- 製作：導演 David Shane；Apple 內部團隊
- AI 功能：Writing Tools（改寫成專業語氣）
- 預期母題：`text-generate`
- 觀看重點：文字類 AI 功能的畫面化：文字改寫的過場。連結為 The Drum 報導，影片本體請從報導內嵌觀看
- 來源：<https://www.thedrum.com/news/ad-the-day-apple-promotes-ai-powered-intelligence-tool-two-sharp-spots> ・ <https://www.shootonline.com/shoot_video2/top-spot-of-the-week-iphone-16-director-david-shane-write-smarter-with-apple-intelligence/> ・ <https://www.macrumors.com/2024/10/28/apple-intelligence-features-ad/>

## Samsung

### [Introducing Galaxy S25 Ultra | Galaxy AI | Samsung](https://www.youtube.com/watch?v=3i1OB6wKYms)

**章節式旗艦發表片**　·　可信度 medium　·　觀看數 —

> 把 S25 Ultra 定位成「真正的 AI 夥伴」：硬體（處理器、相機）與能理解情境的 Galaxy AI 交錯出場。

1. **開場**：產品登場與硬體質感
2. **AI 章節**：Now Brief、跨 app 動作、Audio Eraser 等功能段落
3. **硬體章節**：相機與效能
4. **收尾**：「true AI companion」定位＋品名

- AI 角色：夥伴：理解情境、跨 app 幫你做事
- 標語：A true AI companion（發表定位用語）
- AI 功能：Now Brief、Cross-app actions、Audio Eraser
- 預期母題：`device-reveal` `ai-edge-glow` `ui-float-cards` `audio-denoise`
- 觀看重點：旗艦 launch film 的章節切分；硬體材質鏡頭與 AI 功能段落如何交錯
- 來源：<https://news.samsung.com/global/samsung-galaxy-s25-series-sets-the-standard-of-ai-phone-as-a-true-ai-companion> ・ <https://www.digitaltrends.com/mobile/new-video-teases-samsung-galaxy-s25-big-ai-upgrades/>

### [A Guided Demo of Galaxy AI | Galaxy S25 Series | Samsung](https://www.youtube.com/watch?v=mAUdVyXEJ2M)

**實機導覽：逐功能示範**　·　可信度 medium　·　觀看數 —

> 一支實機導覽，按功能逐段示範 Galaxy AI：每日 Now Brief、按側鍵一句話跨 app 完成任務、Audio Eraser 分離 6 種聲音。

1. **功能 1**：Now Brief：每日個人化摘要
2. **功能 2**：跨 app 動作：查賽程並加入行事曆、把影片摘要存進筆記
3. **功能 3**：Audio Eraser：分離人聲、音樂、風聲、自然、人群、噪音
4. **收尾**：Galaxy S25 系列

- AI 角色：助理：一句話完成多步驟任務
- AI 功能：Galaxy AI 多項功能實機示範
- 預期母題：`ui-float-cards` `circle-to-search` `scan-detect`
- 觀看重點：實機錄屏的包裝：手部、放大鏡、焦點框；適合當作「功能教學影片」模板
- 來源：<https://www.samsung.com/uk/mobile-phone-buying-guide/samsung-galaxy-s25-galaxy-ai-features/>

### [Introducing Galaxy S26 Ultra | Galaxy AI | Samsung](https://www.youtube.com/watch?v=sUMjugzsZsA)

**章節式旗艦發表片**　·　可信度 medium　·　觀看數 —

> 「讓每天都輕鬆的 AI 手機」：Privacy Display、專業相機、會主動提供協助的 Galaxy AI 三段並進。

1. **開場**：產品登場
2. **硬體亮點**：全球首款手機內建 Privacy Display、專業相機
3. **AI 章節**：Galaxy AI 依情境主動提供資訊與動作
4. **收尾**：The AI phone that makes your everyday easy and effortless

- AI 角色：主動式助理：不用開口就先幫你
- 標語：The AI phone that makes your everyday easy and effortless.
- AI 功能：Galaxy AI、Privacy Display
- 預期母題：`device-reveal` `before-after-wipe` `ai-edge-glow`
- 觀看重點：硬體功能（Privacy Display）與 AI 功能同片呈現時的比重；與 S25 版比較一年間的視覺語言演進
- 來源：<https://x.com/SamsungMobile/status/2026902035740672464> ・ <https://www.sammobile.com/news/whats-new-in-galaxy-ai-on-galaxy-s26-ultra/>

### [A Guided Demo of Galaxy AI | Galaxy S26 Ultra | Samsung](https://www.youtube.com/watch?v=aSzej7a_gUI)

**實機導覽：逐功能示範**　·　可信度 low　·　觀看數 —

> 延續 S25 的導覽模板，示範 S26 Ultra 的 Galaxy AI 如何依情境主動浮出資訊、替你完成操作。

1. **功能段落**：逐一示範 Galaxy AI 新功能（順序未確認）
2. **收尾**：Galaxy S26 Ultra

- AI 角色：主動式助理
- AI 功能：Galaxy AI 實機示範
- 預期母題：`ui-float-cards` `scan-detect`
- 觀看重點：與 S25 guided demo 對照：模板化程度、字卡設計、節奏
- 來源：<https://www.sammobile.com/news/whats-new-in-galaxy-ai-on-galaxy-s26-ultra/>

## Google

### [Google Pixel 10 With Magic Cue | Answers](https://www.youtube.com/watch?v=Dniq4Vfbrbs)

**痛點 → 開啟 AI → 結果**　·　可信度 medium　·　觀看數 —

> 打給航空公司時，Magic Cue 自動從 Gmail 找出航班確認碼，顯示在通話畫面上，不用切 app 翻找。

1. **情境**：使用者打電話給航空公司
2. **麻煩**：客服要航班資訊（推測）
3. **轉折**：Magic Cue 自動在通話畫面浮出航班資料
4. **收尾**：Pixel 10 with Magic Cue

- AI 角色：隱形助理：在對的時機遞上答案
- AI 功能：Magic Cue（主動浮出資訊）
- 預期母題：`ui-float-cards` `text-generate`
- 觀看重點：「主動式 AI」的視覺化：資訊在對的時機自己出現。對 Acer 的 Smart/Agent 類功能很有參考價值
- 來源：<https://9to5google.com/2025/08/20/pixel-10-magic-cue-launch/> ・ <https://skift.com/2025/08/21/googles-magic-cue-uses-ai-to-quickly-surface-travel-info/>

### [Meet Google Pixel 10 With Gemini | Do Spectacular Things, Every Day](https://www.youtube.com/watch?v=vL5Lxsh1GUM)

**功能快剪：多功能日常剪輯**　·　可信度 medium　·　觀看數 —

> 30 秒基本款廣告：開場就是 Magic Cue 實際運作，接著剪接晶片、相機與 Gemini 的日常用法；Pro 版改主打 Gemini Live 與 Camera Coach。

1. **開場**：Magic Cue 示範
2. **堆疊**：Tensor 晶片、相機、Gemini 內建
3. **收尾**：Do Spectacular Things, Every Day

- AI 角色：日常超能力
- 標語：Do Spectacular Things, Every Day.
- 長度：30 秒
- AI 功能：Gemini Live、Camera Coach、Magic Cue
- 預期母題：`ai-orb` `scan-detect` `kinetic-type-mask`
- 觀看重點：Google 的色彩系統與 Gemini 漸層光；日常生活情境剪輯的節奏
- 來源：<https://www.phonearena.com/news/relive-wednesdays-made-by-google-event_id173400> ・ <https://www.youtube.com/watch?v=vL5Lxsh1GUM>

### [New Home | Google Gemini Super Bowl Commercial 2026](https://www.youtube.com/watch?v=Z1yGy9fELtE)

**人生故事：AI 陪人度過轉變**　·　可信度 high　·　觀看數 —

> 媽媽為了安撫兒子 Ben 對搬家的不安，拍下新家空房間，用 Gemini（Nano Banana）把牆刷成他最愛的藍色、擺上他的玩具，空房子一步步變回熟悉的家。

1. **設定**：即將搬家，兒子不安
2. **轉折**：媽媽拍下新家空房間，用 Gemini 文字提示改圖
3. **堆疊**：藍色牆面、玩具、熟悉的擺設逐步出現
4. **收尾**：空白房子變成「家」；配樂〈Feels Like Home〉

- AI 角色：情感橋樑：幫人度過人生轉變
- 配樂：Randy Newman〈Feels Like Home〉
- 長度：60 秒
- 製作：Google Creative Lab；Park Pictures；導演 Daniel Mercandante
- AI 功能：Gemini
- 預期母題：`kinetic-type-mask`
- 觀看重點：大型品牌廣告如何只講情感不講規格；AI 在敘事裡的角色定位
- 來源：<https://blog.google/company-news/inside-google/company-announcements/gemini-ad-new-home/> ・ <https://www.adweek.com/creativity/super-bowl-hot-take-google-gemini-ad/> ・ <https://www.prnewswire.com/news-releases/google-reclaims-no-1-spot-at-the-2026-kellogg-school-super-bowl-advertising-review-302682302.html>

### [Dream Job（Pixel 9 × Gemini Live）](https://blog.google/products-and-platforms/devices/pixel/pixel-ad-dream-job-gemini-live/)

**人生故事：AI 陪人度過轉變**　·　可信度 high　·　觀看數 —

> 一位父親用 Gemini Live 模擬求職面試，每個回答都來自當爸爸的回憶：陪讀、萬聖節、送女兒上大學。他想起自己最重要的工作。

1. **設定**：父親準備面試，打開 Gemini Live 練習
2. **回憶**：Gemini 提問 → 閃回育兒片段（長時間工作、多工、協商）
3. **高潮**：送女兒上大學
4. **收尾**：重拾自信：別人能依靠他，他也能依靠別人

- AI 角色：教練：幫人找回自信
- AI 功能：Gemini Live（語音對話）
- 預期母題：`ai-orb` `audio-reactive`
- 觀看重點：語音 AI 助理的畫面表現：對話波形、光球、字幕。Super Bowl 2025 檔期
- 來源：<https://blog.google/products-and-platforms/devices/pixel/pixel-ad-dream-job-gemini-live/> ・ <https://9to5google.com/2025/02/06/pixel-9-gemini-live-super-bowl/> ・ <https://lbbonline.com/news/gemini-live-follows-wherever-the-conservations-takes-you-in-google-pixel-super-bowl-spot>

## Microsoft

### [Full Keynote: Introducing Copilot+ PCs](https://www.youtube.com/watch?v=aZbHd4suAnQ)

**發表會演講**　·　可信度 medium　·　觀看數 —

> Satya Nadella 與 Yusuf Mehdi 在 Redmond 定義新品類「Copilot+ PC」：最快、最聰明、續航最長的 Windows PC，現場示範 Recall、Cocreator、Live Captions。

1. **願景**：「AI will be distributed」：AI 會在裝置端運算
2. **定義**：Copilot+ PC 規格門檻（NPU 40+ TOPS）
3. **示範**：Recall、Cocreator、Live Captions
4. **生態**：OEM 夥伴機種一起亮相

- AI 角色：新品類的理由
- 標語：The fastest, most intelligent Windows PCs ever built.
- AI 功能：Recall、Cocreator、Live Captions、Windows Studio Effects
- 預期母題：`exploded-view` `data-viz-grow` `sketch-to-image` `ui-float-cards`
- 觀看重點：發表會中插播的 sizzle / 產品短片（非演講段落）；NPU TOPS 的數據視覺化
- 來源：<https://www.geekwire.com/2024/microsoft-previews-new-copilot-pc-initiative-in-new-bid-to-revitalize-windows-with-ai/> ・ <https://blogs.microsoft.com/blog/2024/05/20/introducing-copilot-pcs/>

### [Meet the new Surface Copilot+ PCs](https://www.youtube.com/watch?v=_0u0fQuzikA)

**產品美感片：材質、外型、規格**　·　可信度 medium　·　觀看數 —

> 12 吋 Surface Pro 與 13 吋 Surface Laptop 的產品美感片：速度、續航、AI 體驗，加上新色 Violet、Ocean、Platinum。

1. **登場**：兩款新機外型與配色
2. **規格**：速度與續航
3. **AI**：AI 體驗段落
4. **收尾**：品名與配色

- AI 角色：配角：規格清單上的一項
- AI 功能：Copilot 鍵、Click to Do
- 預期母題：`device-reveal` `kinetic-type-mask`
- 觀看重點：筆電的鏡頭語言：開蓋、側邊輪廓、鍵盤特寫（Copilot 鍵）
- 來源：<https://www.abt.com/videos/7177/Meet-the-new-Surface-Copilot-PCs> ・ <https://www.tomshardware.com/tablets/microsoft-surface/microsoft-quietly-drops-copilot-branding-from-its-new-laptops-surface-cvp-confirms-new-devices-meet-hardware-requirements-but-lack-controversial-branding>

## ASUS

### [ASUS Zenbook Series - Zenbook Does More](https://www.youtube.com/watch?v=p-_gzYSI-kQ)

**產品美感片：材質、外型、規格**　·　可信度 low　·　觀看數 —

> 「Experience the world-changing power of AI」：以 1.1 cm 輕薄機身為主視覺，把 Zenbook 包裝成新時代的 Copilot+ PC。

1. **開場**：輕薄機身與材質
2. **AI**：Copilot+ PC 與 AI 功能
3. **收尾**：Zenbook Does More

- AI 角色：大願景：改變世界的 AI 力量
- 標語：Zenbook Does More
- AI 功能：Copilot+ PC、ASUS AI 應用
- 預期母題：`device-reveal` `exploded-view`
- 觀看重點：台廠直接競品：材質（Ceraluminum）鏡頭與 AI 段落的比例，和 Acer 對照
- 來源：<https://www.youtube.com/watch?v=p-_gzYSI-kQ>

### [ASUS Zenbook 14 (UX3480) | 2026](https://www.youtube.com/watch?v=dZ4-0WCkaKc)

**產品美感片：材質、外型、規格**　·　可信度 medium　·　觀看數 —

> Ceraluminum 機身、1.1 kg、OLED、整天續航，「smart AI」只是賣點清單中的一項；另有一支主打自然配色的片「Inspired by Nature. Designed in your Hue.」。

1. **登場**：Ceraluminum 材質與配色
2. **規格**：OLED、續航、多工
3. **AI**：smart AI 一筆帶過
4. **收尾**：品名

- AI 角色：配角
- AI 功能：smart AI
- 預期母題：`device-reveal`
- 觀看重點：2026 年最新競品片：AI 訊息是否比 2025 年更低調（見 Copilot+ 品牌淡化趨勢）
- 來源：<https://www.youtube.com/watch?v=dZ4-0WCkaKc> ・ <https://www.youtube.com/watch?v=oersceLJYyg> ・ <https://www.notebookcheck.net/Asus-unveils-four-2026-Zenbook-14-notebooks-with-OLED-displays-and-smudge-proof-Ceraluminum-covers.1312431.0.html>

## HP

### [HP AI Companion](https://www.youtube.com/watch?v=qL7kr1ckgDE)

**功能說明**　·　可信度 medium　·　觀看數 —

> HP AI Companion 的三種模式：Analyze（分析本機文件庫）、Perform（背景維護驅動與韌體）、Ask（直接對話）。強調在裝置端執行、資料不出電腦。

1. **定位**：HP 次世代 AI PC 內建的生成式 AI 助理
2. **Analyze**：建立本機文件庫，分析並給出建議
3. **Perform**：自動維護系統
4. **Ask**：自由問答

- AI 角色：私人助理＋電腦管家
- AI 功能：HP AI Companion（本地文件分析、PC 設定助理）
- 預期母題：`text-generate` `ui-float-cards`
- 觀看重點：OEM 自家 AI 助理怎麼和 Copilot 做出區隔；對 Acer Intelligence Space 最直接的對照組
- 來源：<https://www.hp.com/us-en/ai-solutions/ai-companion-faq.html> ・ <https://itdaily.com/blogs/workplace/hp-ai-companion-beta-ai-pc/>

## Lenovo

### [Using Smart Modes - Lenovo Aura Edition](https://pcsupport.lenovo.com/us/en/products/laptops-and-netbooks/yoga-series/yoga-7-2-in-1-14iph11/videos/ytv104642)

**操作教學**　·　可信度 medium　·　觀看數 —

> Smart Modes 會自動判斷 6 種使用情境（工作、創作、會議、遊戲、娛樂、學習），切換到 Attention、Wellness、Collaboration、Shield、Power 等模式。

1. **說明**：Smart Modes 是什麼
2. **示範**：逐一切換各模式
3. **收尾**：Lenovo Aura Edition × Intel

- AI 角色：情境感知：電腦自己調整
- AI 功能：Smart Modes（Attention / Wellness / Collaboration / Shield / Power）
- 預期母題：`ui-float-cards` `scan-detect`
- 觀看重點：「情境自動切換」類功能的畫面化；Lenovo × Intel 聯名包裝方式
- 來源：<https://www.lenovo.com/us/en/lenovoauraedition/>

## Nothing

### [Nothing Essential（AI 生成 mini app）發表影片](https://9to5google.com/2025/09/30/nothing-essential-ai-app-generator-promises/)

**宣言片：願景先行**　·　可信度 medium　·　觀看數 —

> 「You describe what you need. AI builds it.」：描述需求、AI 生成 app、直接出現在主畫面，終點是「十億人有十億個 app」。

1. **宣言**：每個人的需求都不同
2. **示範**：用文字描述 → Playground 生成 widget
3. **收尾**：One billion apps for one billion people

- AI 角色：平台願景：AI 取代 app 商店
- 標語：One billion apps for one billion people.
- AI 功能：Essential Space、Essential Apps（prompt 生成 app）
- 預期母題：`particle-assemble` `stagger-grid-wave`
- 觀看重點：小品牌的強烈視覺識別（點陣字、黑白紅）如何套用到 AI 敘事。影片內嵌於 9to5Google 報導
- 來源：<https://9to5google.com/2025/09/30/nothing-essential-ai-app-generator-promises/> ・ <https://techcrunch.com/2025/09/30/nothing-launches-ai-tool-for-building-mini-apps-using-prompts/>

