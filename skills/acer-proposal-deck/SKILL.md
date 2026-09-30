---
name: acer-proposal-deck
description: 用 Acer 提案設計系統與範本，在 Claude 的 Slides 裡產生、修改、校對 Acer 提案簡報（白底、Acer 綠、Montserrat＋Noto Sans TC），最後下載成 .pptx。觸發詞：「Acer 提案簡報」「用 Acer 範本做簡報」「AIS 提案」「Landing page spec 簡報」「把線上簡報轉成 Slides」「提案 deck」。凡是 Acer 專案要出簡報、規格簡報或把 GitHub Pages 上的線上簡報改成可下載的 PPT，都應觸發。3D 或動畫 mockup 要放進簡報時，也用這個 skill 的 GIF 錄製腳本。
---

# Acer 提案簡報

Acer 的提案、規格、報告簡報一律在 Claude 的 **Slides** 裡做：在 Claude 上編輯、校對，完成後下載成 .pptx。GitHub Pages 上的線上簡報只保留給需要互動展示的 demo（3D 角色、動態 mockup），不再每次 push 上線。

## 固定資源

| 資源 | 連結 | 用途 |
|---|---|---|
| 設計系統 | https://claude.ai/artifact/BgyC6QLV4yNPtGN5LTCGRv | 「Acer 提案設計系統」：配色、字型、元件規則。每份新簡報都要安裝它 |
| 版型範本 | https://claude.ai/artifact/4J4Wu7GuHyedPAUsKcCJoc | 「Acer 提案簡報範本」：8 種版型，每頁的 speaker notes 寫了該版型的用法 |
| 線上 demo | https://jousttv0745-ops.github.io/acer-ais-proposal-2/v3/ | 互動版；Slides 裡用「See more ↗」按鈕連過去 |

## 流程

1. **先出規劃，確認後才做**：用三句以內說明頁數、每章的版型、需要的圖片或 GIF。缺素材（截圖、數字、文案）就列出來問，不自己補。
2. **建立簡報**：從 Slides 類型建立新簡報，安裝「Acer 提案設計系統」（設計系統記錄＋`tokens.json`），字型用 Google Fonts 的 Montserrat 與 Noto Sans TC。
3. **套版型**：從版型範本讀出對應的 slide 檔（`project/slides/<id>.html`），照它的結構與樣式寫新內容，不要自己發明新樣式。
4. **放素材**：截圖與 GIF 先上傳成簡報的素材，再用 `<img src="/_blob/<id>">` 放進去。
5. **交付**：給使用者簡報連結；提醒下載 .pptx 的方式（Share › Export）與字型注意事項（見下）。

## 版型目錄

| 範本 id | 版型 | 什麼時候用 |
|---|---|---|
| `cover` | 封面 | 第一頁：眉標（版本・日期）、主標（左側 10px 綠線）、副標、章節 chip |
| `recap` | Recap 表 | 上次報告的回饋與本版回應，三欄表格 |
| `milestone` | Milestone 路線圖 | 分階段規劃，三張卡片，本次定案那張綠框 |
| `intro` | 章節頁 | 每章開頭：描邊大編號、英文章名、中文副標 |
| `sheet` | 素材表 | 拆解競品頁：左邊全頁截圖、右邊區塊／文案／影像表格、結論條 |
| `framework` | Framework 比較 | 兩家的敘事順序（Hero／Assistant／Scenario），結論條 |
| `spec` | Spec 規格頁 | 左邊畫面或 GIF＋demo 按鈕，右邊六欄位：目標、素材、比例、範圍、資產、敘事 |
| `summary` | Summary | 淺綠底收尾：一句總結＋兩張建議卡 |

## 每一頁都要遵守

- **頂部**：左邊簡報名稱（Montserrat 24px，專案名用 `#111827`，其餘 `#6b7280`）；右邊目前章節的黑色膠囊與頁碼「n / 總頁數」。封面不放。
- **底部進度條**：距底 48px、左右 128px、高 6px、格距 6px；格數＝總頁數，已講過的頁（含當頁）填 `#83b81a`，其餘填 `#e5e7eb`。**新增或刪除頁面時，每一頁的進度條格數與頁碼都要一起更新。**
- **結論條**：`#3f7d0a` 底、白字 26px／900、圓角 14px。不要用 `#83b81a` 當文字底色（白字對比只有 2.3:1）。
- **字級**：最小 24px。標題 44px（大標可 56–64px）、內文 26px、表格 24–26px。
- **一頁一個重點**：表格超過 4–6 列就拆頁或放附錄；內容頁從頂部對齊，只有封面與章節頁垂直置中。
- **章節 chip 與 Recap 表的章節名稱**要和目錄一致，改章名時全部一起改。

## 從線上簡報轉換

| 線上版 | Slides 版 |
|---|---|
| 同一頁裡截圖一步步縮放、聚焦 | 拆成多頁，用 `data-transition="magic"` 銜接 |
| 長頁截圖＋虛線框標註 | 截圖放左欄（`object-fit:contain`），區塊編號寫在右邊表格 |
| 3D Qubi、會動的 hero／banner mockup | 用下面的腳本錄成 GIF；旁邊放「See more ↗」連回線上 demo |
| `deck.config.js`＋`check-config.js` | 版型範本＋這份規則，Slides 的版本紀錄取代 git |

## 把動畫錄成 GIF

`scripts/record-gif.mjs` 會打開頁面、逐格截圖、輸出 GIF（預設 1440×810 縮成 960×540、12 fps）。

```bash
# 在提案 repo 開本機伺服器
node v3/tools/serve.js 8090
# 另一個終端機，在 scripts/ 資料夾
npm install
node record-gif.mjs http://localhost:8090/v3/content/mockup/hero-d2.html qubi-hero-a.gif --seconds 7 --fps 10
node record-gif.mjs http://localhost:8090/v3/content/mockup/hero-a2.html qubi-hero-b.gif --seconds 5 --fps 10
```

- 頁面一載入就開始播的 mockup（hero-d2、hero-a2、banner）可以直接錄；嵌在 hero.html 裡的組合版會等簡報引擎的訊號，請錄單一版本的檔案。
- Windows 沒有 Playwright 瀏覽器時，設定 `CHROME_PATH` 指向 chrome.exe。
- 網路擋 cdn.jsdelivr.net 時，`npm install three@0.160.0` 後設定 `THREE_DIR` 指向 `node_modules/three`。
- GIF 控制在 3 MB 以內；太大就降 `--fps` 或 `--scale`。

## 字型與 .pptx

Montserrat 和 Noto Sans TC 是 Google Fonts，Slides 與 PDF 都能正常顯示。下載成 .pptx 時，檔案會記下這兩個字型名稱；沒安裝的電腦會自動替換。要在別人的電腦播放，先二選一：
1. 在那台電腦安裝 Montserrat 與 Noto Sans TC（免費）。
2. 在 PowerPoint 用「常用 › 取代 › 取代字型」把 Noto Sans TC 換成微軟正黑體、Montserrat 換成 Arial。

Slides 只能指定 Google Fonts 或上傳的字型檔，微軟正黑體是授權字型，不能直接設成簡報字型。
