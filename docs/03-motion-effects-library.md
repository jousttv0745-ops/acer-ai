# 03｜動態效果庫與 JS 工具拆解

> 自動產生自 `data/motion-effects.json` 與 `data/js-libraries.json`，請改 JSON 後執行 `node scripts/build.mjs`。

## 效果 × 工具矩陣

▶ = 本 repo 有 demo　● = 有實作路線

| 效果 | GSAP | Anime.js v4 | D3.js | PixiJS | Matter.js | Falling Sand | Three.js | GLSL Shader | Canvas 2D | Rough.js | p5.js | Tone.js |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 螢幕邊緣流光 `ai-edge-glow` | ● |  |  |  |  |  | ● | ▶ | ● |  |  |  |
| AI 光球 `ai-orb` |  |  |  | ▶ |  |  | ● | ● |  |  | ● | ● |
| 粒子繞行 `particle-swarm` |  |  |  | ▶ |  |  | ● |  | ● |  | ● |  |
| 文字逐字生成 `text-generate` | ▶ | ● | ● |  |  |  |  |  | ● |  |  |  |
| 手繪變成品 `sketch-to-image` | ● |  |  |  |  |  |  | ● |  | ▶ | ● |  |
| 物件消除化為粒子 `object-erase-dissolve` |  |  |  |  | ● | ▶ | ● | ● |  |  |  |  |
| 前後對比擦除 `before-after-wipe` | ▶ |  |  |  |  |  |  | ● | ● |  |  |  |
| 掃描線＋辨識框 `scan-detect` | ● |  | ● |  |  |  | ● |  | ▶ |  |  |  |
| 手繪圈選 `circle-to-search` | ● |  |  |  |  |  |  |  | ● | ▶ | ● |  |
| AI 降噪聲波 `audio-denoise` |  |  | ● |  |  |  |  | ● | ● |  |  | ▶ |
| 聲音驅動畫面 `audio-reactive` |  |  |  | ● |  |  | ● |  |  |  |  | ▶ |
| 規格數字跳動 `data-counter` | ● | ▶ | ● |  |  |  |  |  |  |  |  |  |
| 網格擴散波 `stagger-grid-wave` | ● | ▶ |  |  |  |  |  | ● |  |  | ● |  |
| 長條／圖表生長 `data-viz-grow` | ● | ● | ▶ |  |  |  |  |  |  |  |  |  |
| 物理掉落自動整理 `physics-sort` |  |  |  | ● | ▶ |  | ● |  |  |  |  |  |
| 粒子聚合成形 `particle-assemble` | ● |  |  | ● |  |  | ● |  |  |  | ▶ |  |
| 浮動 UI 卡片 `ui-float-cards` | ▶ | ● |  | ● |  |  | ● |  |  |  |  |  |
| 晶片／機身爆炸圖 `exploded-view` | ● |  |  |  |  |  | ▶ |  |  |  |  |  |
| 產品登場 `device-reveal` | ● |  |  |  |  |  | ▶ |  |  |  |  |  |
| 大字標語遮罩 `kinetic-type-mask` | ▶ | ● |  |  |  |  |  |  | ● |  |  |  |

## 效果清單

### AI 狀態：聆聽／思考／回應

#### 螢幕邊緣流光　`ai-edge-glow`　✅ 可直接渲染

- **想傳達：** AI 已啟動、正在理解你；整台裝置都「活」了
- **常見於：** Apple Intelligence Siri、Galaxy AI（推測）、Gemini 漸層
- **配方：** 圓角矩形 SDF 距離 → exp 衰減光暈；色相由邊緣角度決定並隨時間旋轉；思考時寬度 ×3、流速 ×5；四色盤：青藍、紫、粉、琥珀
- **Demo：** [`demos/glsl.html`](../demos/glsl.html)

| 工具 | 實作路線 |
|---|---|
| GLSL Shader | 全螢幕 fragment shader：sdRoundRect + atan 角度色相 + noise 閃爍（demo） |
| Canvas 2D | 沿邊框切 20 段各自上色，外層 filter: blur()，lineDashOffset 做流動 |
| GSAP | CSS conic-gradient 邊框 + @property 角度變數，用 gsap.to 旋轉 --angle |
| Three.js | 把 GLSL 做成 ShaderMaterial 貼在手機螢幕平面上，與 3D 手機模型合成 |

參考：<https://dev.to/vector4wang/i-recreated-iphones-apple-intelligence-edge-glow-effect-on-mac-57f5> ・ <https://github.com/jacobamobin/AppleIntelligenceGlowEffect> ・ <https://codepen.io/quintenm/pen/NPGYRgj>

#### AI 光球　`ai-orb`　✅ 可直接渲染

- **想傳達：** AI 助理的「臉」：聆聽時呼吸、思考時旋轉加速
- **常見於：** Gemini Live、Siri（iOS 18 以前）、Dribbble AI orb 大量作品
- **配方：** 3 個加色混合模糊圓互繞（2D）或 noise 位移球體＋fresnel 邊緣光（3D）；狀態切換用 lerp 平滑 0→1
- **Demo：** [`demos/pixi.html`](../demos/pixi.html)

| 工具 | 實作路線 |
|---|---|
| PixiJS | Graphics 圓 + BlurFilter + blendMode add，Ticker 驅動（demo） |
| Three.js | IcosahedronGeometry + ShaderMaterial（noise 位移 + fresnel）+ AdditiveBlending（demo） |
| GLSL Shader | raymarch 球體或 2D metaball |
| p5.js | WEBGL 模式 sphere + shader，或 2D drawingContext.filter blur |
| Tone.js | 用 Meter / FFT 的音量驅動光球縮放 → 聲音反應 |

參考：<https://tympanus.net/codrops/2025/06/18/coding-a-3d-audio-visualizer-with-three-js-gsap-web-audio-api/> ・ <https://dribbble.com/search/ai-orb> ・ <https://dribbble.com/shots/3546148-Apple-iOS11-Siri-visual-effect-motion>

#### 粒子繞行　`particle-swarm`　✅ 可直接渲染

- **想傳達：** 大量資料在裝置內流動、被即時處理
- **常見於：** 各品牌 NPU / AI 晶片段落（推測）
- **配方：** 數百點極座標繞行，半徑、角速度、傾斜各自隨機；思考時半徑收縮 45%、速度 ×4
- **Demo：** [`demos/pixi.html`](../demos/pixi.html)

| 工具 | 實作路線 |
|---|---|
| PixiJS | ParticleContainer（v8 為 Particle）可到上萬顆（demo 用 Graphics） |
| Three.js | Points + BufferGeometry，位置在 vertex shader 算 |
| p5.js | 陣列＋circle()，千顆以內即可 |
| Canvas 2D | fillRect 點陣＋globalCompositeOperation lighter |

#### 聲音驅動畫面　`audio-reactive`　🟡 需改造

- **想傳達：** AI 在聽／在說：即時翻譯、語音助理
- **常見於：** Gemini Live、Live Translation
- **配方：** FFT 低頻驅動縮放、高頻驅動亮度；配樂節拍對齊剪輯點
- **Demo：** [`demos/tone.html`](../demos/tone.html)

| 工具 | 實作路線 |
|---|---|
| Tone.js | FFT / Meter / Waveform 取值；Transport 做節拍時間軸 |
| Three.js | 音量 uniform 驅動 vertex 位移 |
| PixiJS | 音量驅動 scale 與 filter 強度 |

參考：<https://tympanus.net/codrops/2025/06/18/coding-a-3d-audio-visualizer-with-three-js-gsap-web-audio-api/>

### 生成與轉換

#### 文字逐字生成　`text-generate`　✅ 可直接渲染

- **想傳達：** AI 正在為你寫：摘要、改寫、翻譯
- **常見於：** Apple Writing Tools、Copilot、HP AI Companion（推測）
- **配方：** 逐字 stagger 0.03–0.05s；每字從 blur(12px)+y18 → 清晰；可加游標閃爍與漸層色掃過
- **Demo：** [`demos/gsap.html`](../demos/gsap.html)

| 工具 | 實作路線 |
|---|---|
| GSAP | SplitText.create + from(chars, {filter:'blur()', stagger})（demo） |
| Anime.js v4 | v4 splitText + stagger |
| Canvas 2D | 逐字 fillText + globalAlpha，打字機效果 |
| D3.js | selection.transition().textTween() 做數字或字串內插 |

參考：<https://gsap.com/blog/3-13/> ・ <https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/>

#### 手繪變成品　`sketch-to-image`　✅ 可直接渲染

- **想傳達：** 隨手一畫，AI 幫你完成
- **常見於：** Microsoft Cocreator、Apple Image Wand、Galaxy Sketch to Image
- **配方：** 手繪線條描出（stroke-dashoffset）→ 停頓 0.3s → 閃光 / 溶解 crossfade 到成品圖
- **Demo：** [`demos/rough.html`](../demos/rough.html)

| 工具 | 實作路線 |
|---|---|
| Rough.js | rough.svg 產生手繪路徑 + dashoffset 描線（demo 的圈選部分） |
| GLSL Shader | noise 門檻溶解 transition：mix(sketch, render, step(noise, progress)) |
| GSAP | DrawSVGPlugin 描線 + clip-path 揭露 |
| p5.js | noise 抖動線條模擬鉛筆 |

參考：<https://tympanus.net/codrops/2025/01/22/webgl-shader-techniques-for-dynamic-image-transitions/>

#### 物件消除化為粒子　`object-erase-dissolve`　🟡 需改造

- **想傳達：** 一鍵移除干擾物，背景自動補完
- **常見於：** Apple Clean Up、Google Magic Eraser、Galaxy Object Eraser
- **配方：** 選取框閃一下 → 物件由上而下崩解成沙／粒子落下 → 背景 inpaint 淡入
- **Demo：** [`demos/falling-sand.html`](../demos/falling-sand.html)

| 工具 | 實作路線 |
|---|---|
| Falling Sand | 細胞自動機：固體逐列轉成沙，沙依規則下落後蒸發（demo） |
| GLSL Shader | noise 溶解邊緣 + 發光邊（burn edge） |
| Three.js | 把物件貼圖拆成 Points，往下加速度並淡出 |
| Matter.js | 物件切成碎塊剛體，受重力散落 |

參考：<https://sandspiel.club/>

#### 前後對比擦除　`before-after-wipe`　✅ 可直接渲染

- **想傳達：** AI 開啟前／後，差異一眼看懂
- **常見於：** 視訊增強、降噪、修圖類廣告（推測）
- **配方：** 同一畫面兩層，只差濾鏡（亮度、飽和、背景虛化、噪點）；分割線 1.4s power3.inOut 全掃 → 回到 50% 停住 → 左右小幅晃動；線上帶品牌漸層光暈
- **Demo：** [`demos/wipe.html`](../demos/wipe.html)

| 工具 | 實作路線 |
|---|---|
| GSAP | CSS 變數 --cut 驅動 clip-path: inset(0 0 0 X%)，timeline 補間＋分割線可拖曳（demo） |
| GLSL Shader | step(uv.x, progress) 混合兩張貼圖 + 邊緣 glow |
| Canvas 2D | drawImage 兩次，第二次用 clip() 裁切 |

#### 物理掉落自動整理　`physics-sort`　🟡 需改造

- **想傳達：** AI 幫你整理：檔案、照片、待辦
- **常見於：** 整理類功能（推測）
- **配方：** 雜亂物件受重力堆疊 → 按下 AI → 隔板落下、物件按類別落入欄位
- **Demo：** [`demos/matter.html`](../demos/matter.html)

| 工具 | 實作路線 |
|---|---|
| Matter.js | Engine + Bodies + 自繪 Canvas（demo） |
| PixiJS | Matter 算物理、Pixi 畫面 |
| Three.js | 搭配 cannon-es / rapier 做 3D 版本 |

參考：<https://brm.io/matter-js/>

### 辨識與理解

#### 掃描線＋辨識框　`scan-detect`　✅ 可直接渲染

- **想傳達：** AI 看得懂畫面：辨識、建議、拍照教練
- **常見於：** Pixel Camera Coach、Click to Do、Circle to Search
- **配方：** 高光掃描帶 1.4s 由上往下 → 四角括號從外收攏 0.6s（逐物件錯開 0.25s）→ 標籤膠囊＋信心值跳動
- **Demo：** [`demos/canvas2d.html`](../demos/canvas2d.html)

| 工具 | 實作路線 |
|---|---|
| Canvas 2D | createLinearGradient 掃描帶 + 四角 path + setLineDash 流動虛線（demo） |
| GSAP | DOM 框 + scale/opacity stagger |
| D3.js | 資料綁定 bounding boxes，enter transition |
| Three.js | 3D 空間中的 billboard 標籤 |

#### 手繪圈選　`circle-to-search`　✅ 可直接渲染

- **想傳達：** 圈一下就搜尋：AI 理解你指的東西
- **常見於：** Google / Samsung Circle to Search
- **配方：** 帶手感的不完美橢圓（roughness 2、bowing 3）快速描出 0.5s → 結果卡片從下彈入
- **Demo：** [`demos/rough.html`](../demos/rough.html)

| 工具 | 實作路線 |
|---|---|
| Rough.js | generator.ellipse + stroke-dashoffset（demo） |
| GSAP | DrawSVGPlugin 描手繪 SVG path |
| Canvas 2D | 記錄真實手勢座標後回放 |
| p5.js | noise 抖動的 beginShape 曲線 |

參考：<https://roughjs.com/>

#### AI 降噪聲波　`audio-denoise`　🟡 需改造

- **想傳達：** 嘈雜環境中，只留下你的聲音
- **常見於：** Acer PurifiedVoice、Galaxy Audio Eraser、Windows Studio Effects
- **配方：** 毛躁聲波（噪音）→ 開關切換 → 雜訊平滑消失、只留乾淨波形；可加色彩由灰轉品牌色
- **Demo：** [`demos/tone.html`](../demos/tone.html)

| 工具 | 實作路線 |
|---|---|
| Tone.js | Noise → Filter → Gain.rampTo 做真實的聲音對比，Waveform 取樣畫圖（demo） |
| Canvas 2D | 繪製波形 path |
| D3.js | d3.line + curveBasis 做平滑曲線過渡 |
| GLSL Shader | SDF 線條 + noise 振幅 |

參考：<https://www.acer.com/us-en/ai/acer-intelligence-space>

### 數據與規格

#### 規格數字跳動　`data-counter`　✅ 可直接渲染

- **想傳達：** 硬實力：50 TOPS、22 小時續航
- **常見於：** 幾乎所有 AI PC 發表片
- **配方：** 0 → 目標值 1.8s easeOutExpo，四捨五入到整數；單位字距 0.2em；可配網格波
- **Demo：** [`demos/anime.html`](../demos/anime.html)

| 工具 | 實作路線 |
|---|---|
| Anime.js v4 | animate(obj, {v, modifier: utils.round(0)})（demo） |
| GSAP | gsap.to(obj, {v, snap:{v:1}, onUpdate}) |
| D3.js | transition().textTween(interpolateNumber) |

#### 網格擴散波　`stagger-grid-wave`　✅ 可直接渲染

- **想傳達：** NPU 平行運算、AI 全面啟動
- **常見於：** Nothing 點陣視覺、晶片段落（推測）
- **配方：** 16×16 網格，從中心 stagger 40ms 擴散；色彩青→紫→暗；之後隨機閃爍 idle
- **Demo：** [`demos/anime.html`](../demos/anime.html)

| 工具 | 實作路線 |
|---|---|
| Anime.js v4 | stagger(40, {grid:[16,16], from:'center'})（demo） |
| GSAP | stagger: {grid:[16,16], from:'center', each:0.04} |
| p5.js | 距離中心的距離 − t 決定亮度 |
| GLSL Shader | length(uv-0.5) - time 做 ring |

#### 長條／圖表生長　`data-viz-grow`　✅ 可直接渲染

- **想傳達：** AI 開啟前後的效能、續航對比
- **常見於：** Copilot+ PC 發表會投影片、OEM 規格影片
- **配方：** 先長灰色基準條 0.7s，再長品牌漸層條 1.2s，數值標籤跟著推進
- **Demo：** [`demos/d3.html`](../demos/d3.html)

| 工具 | 實作路線 |
|---|---|
| D3.js | scaleBand + transition().delay(i*) + textTween（demo） |
| GSAP | scaleX from 0 + transformOrigin left |
| Anime.js v4 | width / scaleX stagger |

### 產品與硬體

#### 晶片／機身爆炸圖　`exploded-view`　✅ 可直接渲染

- **想傳達：** AI 來自真正的硬體：NPU、散熱、電池
- **常見於：** Copilot+ PC keynote、ASUS / Surface 發表片（推測）
- **配方：** 層疊物件沿法線拉開，上層位移最大；NPU 層加自發光；鏡頭緩慢繞行
- **Demo：** [`demos/three.html`](../demos/three.html)

| 工具 | 實作路線 |
|---|---|
| Three.js | Group 內各 Mesh 依層級 lerp y（demo）；正式片載入 GLTF 產品模型 |
| GSAP | ScrollTrigger 控制爆炸進度（網頁版） |

#### 產品登場　`device-reveal`　✅ 可直接渲染

- **想傳達：** 產品本身的美感與工藝
- **常見於：** 所有 launch film
- **配方：** 暗場 → 輪廓光掃過邊緣（0.3–2.2s）→ 開蓋 105°（2.0–4.0s）→ 螢幕亮起（3.6–4.6s）→ 鏡頭環繞＋品名（4s 起）；全部 easeInOutCubic、無抖動
- **Demo：** [`demos/device-reveal.html`](../demos/device-reveal.html)

| 工具 | 實作路線 |
|---|---|
| Three.js | 程序化筆電（RoundedBoxGeometry）＋ RoomEnvironment 反射＋ SpotLight 掃光，畫面＝f(t)（demo）；正式片換成 GLTFLoader 載入產品模型 |
| GSAP | ScrollTrigger + canvas 影格序列（Apple 產品頁手法） |

### 敘事與字卡

#### 粒子聚合成形　`particle-assemble`　🟡 需改造

- **想傳達：** 混亂資料 → 有意義的結果；也適合品牌 Logo 收尾
- **常見於：** 品牌片 Logo 收尾（常見手法）
- **配方：** 離屏畫布寫字 → 取樣像素當目標點 → 彈簧（k=0.012，阻尼 0.88）回位；打散時沿 noise 流場漂移
- **Demo：** [`demos/p5.html`](../demos/p5.html)

| 工具 | 實作路線 |
|---|---|
| p5.js | createGraphics 取樣 + noise 流場（demo） |
| Three.js | Points，在 vertex shader 用 mix(random, target, progress) |
| PixiJS | 大量 Sprite + 相同彈簧公式 |
| GSAP | 每顆粒子一個 tween，stagger from random |

#### 浮動 UI 卡片　`ui-float-cards`　✅ 可直接渲染

- **想傳達：** 一台裝置上同時跑很多 AI 功能
- **常見於：** Galaxy AI launch film、Magic Cue、OEM 功能總覽
- **配方：** 裝置 3D 傾斜轉正 1.1s expo.out → 卡片 z:-200、blur 6px 依序彈出 → sine yoyo 漂浮
- **Demo：** [`demos/gsap.html`](../demos/gsap.html)

| 工具 | 實作路線 |
|---|---|
| GSAP | timeline + from(z, blur) + random yoyo（demo） |
| Three.js | CSS3DRenderer 或平面 Mesh 貼 UI 截圖，真實景深 |
| Anime.js v4 | createTimeline + stagger |
| PixiJS | Sprite 卡片 + DisplacementFilter |

參考：<https://motion.dev/examples>

#### 大字標語遮罩　`kinetic-type-mask`　✅ 可直接渲染

- **想傳達：** 一句話記住：Your PC, now intelligent.
- **常見於：** 品牌 spot 收尾、章節字卡
- **配方：** 逐行 overflow:hidden 遮罩，字由下往上推入 0.8s power4.out；關鍵字換色或漸層
- **Demo：** [`demos/gsap.html`](../demos/gsap.html)

| 工具 | 實作路線 |
|---|---|
| GSAP | SplitText type:'lines' + mask:'lines' |
| Anime.js v4 | splitText + translateY stagger |
| Canvas 2D | clip() 矩形遮罩 + fillText |

參考：<https://gsap.com/blog/3-13/>

## 12 個工具的動態原子

### GSAP　`gsap@3.15.0`

業界標準的時間軸補間引擎；影片化首選（HyperFrames 直接用它當時間軸）　·　授權：免費，含商用與所有外掛（2025-04 起由 Webflow 開放）　·　影片化：最佳。timeline 可 seek / pause，渲染器可逐幀控制

| 動態原子 | API | 用在 |
|---|---|---|
| Timeline 編排 | `gsap.timeline() / position 參數 '-=0.4' '<'` | 整支影片的分鏡時間軸 |
| Stagger 錯開 | `stagger: {each, from:'center'\|'random', grid}` | 卡片、字、網格依序出場 |
| 文字拆解 | `SplitText.create(el, {type:'chars,words,lines', mask:'lines'})` | 逐字生成、遮罩上推標語 |
| 描線 | `DrawSVGPlugin` | 手繪圈選、電路流光 |
| 形狀變形 | `MorphSVGPlugin` | 圖示變形、Logo 變形 |
| 捲動驅動 | `ScrollTrigger` | 產品頁捲動敘事（非影片） |
| FLIP 版面轉場 | `Flip.getState / Flip.from` | UI 重新排列的平滑過渡 |
| 自訂曲線 | `CustomEase / CustomWiggle / CustomBounce` | 品牌專屬的動態節奏 |

Demo：[`demos/gsap.html`](../demos/gsap.html)　文件：<https://gsap.com/docs/v3/>

### Anime.js v4　`animejs@4.5.0`

輕量（約 10KB gzip）ESM 動畫引擎；v4 重寫後 API 為 animate(targets, params)　·　授權：MIT　·　影片化：佳。timeline.seek(ms) 可逐幀；createSeededRandom 讓隨機可重現

| 動態原子 | API | 用在 |
|---|---|---|
| 網格 Stagger | `stagger(40, {grid:[16,16], from:'center'})` | NPU 運算擴散波 |
| Timeline | `createTimeline().add(targets, params, position)` | 分鏡編排 |
| 文字拆解 | `splitText / scrambleText` | 逐字、亂碼解碼效果 |
| SVG 描線 | `svg.createDrawable` | 線條描繪 |
| SVG 變形 | `svg.morphTo` | 形狀變形 |
| 路徑運動 | `svg.createMotionPath` | 物件沿路徑移動 |
| 彈簧 | `spring / createSpring` | 物理感回彈 |
| 版面動畫 | `createLayout` | DOM 版面變化自動補間 |
| 可重現亂數 | `createSeededRandom` | 影片渲染需要每次結果一致 |

Demo：[`demos/anime.html`](../demos/anime.html)　文件：<https://animejs.com/documentation/>

### D3.js　`d3@7.9.0`

資料 → SVG / Canvas 的綁定與轉場；規格、續航、效能對比畫面　·　授權：ISC　·　影片化：中。轉場以真實時間跑；影片化時改用 scale + 自訂 t 直接算屬性

| 動態原子 | API | 用在 |
|---|---|---|
| 資料綁定 | `selection.data().join()` | 資料驅動 enter / update / exit |
| 比例尺 | `scaleLinear / scaleBand / scaleTime` | 數值 → 像素 |
| 轉場 | `transition().duration().delay((d,i)=>i*120)` | 長條生長、點位移動 |
| 內插 | `interpolateNumber / interpolateRgb / textTween` | 數字跳動、顏色過渡 |
| 形狀產生器 | `d3.line / d3.arc / curveBasis` | 平滑波形、環狀圖 |
| 力導向 | `forceSimulation` | 知識圖譜、AI 關聯網路 |

Demo：[`demos/d3.html`](../demos/d3.html)　文件：<https://d3js.org/>

### PixiJS　`pixi.js@8.21.0`

WebGL / WebGPU 2D 渲染器；大量 sprite、濾鏡、加色混合　·　授權：MIT　·　影片化：中。需改成以 frame 計算狀態（不要依賴 deltaTime 累加）

| 動態原子 | API | 用在 |
|---|---|---|
| 非同步初始化 | `await app.init({resizeTo, background})` | v8 起的新初始化方式 |
| 向量繪圖 | `new Graphics().circle().fill()` | 光球、形狀 |
| 濾鏡 | `BlurFilter / DisplacementFilter / ColorMatrixFilter` | 光暈、玻璃扭曲 |
| 混合模式 | `blendMode = 'add'` | 發光疊加 |
| 大量粒子 | `ParticleContainer + Particle` | 上萬顆粒子 |
| 逐幀更新 | `app.ticker.add(tk => …)` | 動畫迴圈 |

Demo：[`demos/pixi.html`](../demos/pixi.html)　文件：<https://pixijs.com/8.x/guides>

### Matter.js　`matter-js@0.20.0`

2D 剛體物理；物件掉落、堆疊、碰撞　·　授權：MIT　·　影片化：需改造。影片中從第 0 幀開始逐幀 Engine.update，並固定亂數 seed

| 動態原子 | API | 用在 |
|---|---|---|
| 世界與步進 | `Engine.create / Engine.update(engine, 1000/60)` | 固定步長 = 可重現 |
| 剛體 | `Bodies.rectangle / circle / fromVertices` | 檔案、圖示、字母剛體 |
| 直接操控 | `Body.setPosition / setVelocity / setAngle` | 導演式控制物理 |
| 約束 | `Constraint / Composites.chain` | 繩索、彈簧連結 |
| 碰撞事件 | `Events.on(engine, 'collisionStart')` | 碰撞觸發音效或特效 |

Demo：[`demos/matter.html`](../demos/matter.html)　文件：<https://brm.io/matter-js/docs/>

### Falling Sand

粉末遊戲式細胞自動機：每格依鄰居規則更新；崩解、流體、堆積　·　授權：技法（非套件）　·　影片化：需改造。固定 seed 的亂數，逐幀步進；或預先輸出素材

| 動態原子 | API | 用在 |
|---|---|---|
| 格子狀態 | `Uint8Array(W*H) 存材質種類` | 沙、水、固體、空 |
| 下落規則 | `下 → 左下／右下 → 靜止` | 沙堆、崩解 |
| 掃描順序 | `由下往上、左右隨機交替` | 避免偏向與一幀多格 |
| 點火／轉換 | `條件式改變材質（固體 → 沙）` | 物件消除、燃燒 |
| 像素輸出 | `ImageData / putImageData 或 GPU texture` | 快速繪製 |

Demo：[`demos/falling-sand.html`](../demos/falling-sand.html)　文件：<https://sandspiel.club/>

### Three.js　`three@0.186.1`

Web 3D 標準；產品模型、光影、shader 材質、WebGPU　·　授權：MIT　·　影片化：佳。Remotion 有 @remotion/three；HyperFrames 有 Three.js adapter

| 動態原子 | API | 用在 |
|---|---|---|
| 產品模型 | `GLTFLoader + 環境貼圖 (RGBELoader / PMREM)` | 筆電、手機實體渲染 |
| 自訂 shader | `ShaderMaterial / TSL (three/tsl)` | fresnel 光球、溶解、流光 |
| 加色混合 | `AdditiveBlending + depthWrite:false` | 發光層 |
| 粒子 | `Points + BufferGeometry` | 上萬顆 3D 粒子 |
| 後製 | `EffectComposer + UnrealBloomPass` | bloom 光暈 |
| 逐幀渲染 | `renderer.setAnimationLoop(ms => …)` | 以時間 t 驅動（可改成 frame） |

Demo：[`demos/three.html`](../demos/three.html)　文件：<https://threejs.org/docs/>

### GLSL Shader

直接寫 GPU 片段著色器；所有「光」「流動」「溶解」質感的根源　·　授權：語言（非套件）　·　影片化：最佳。shader 本來就是 f(uv, t)，給定 t 就能精準重現

| 動態原子 | API | 用在 |
|---|---|---|
| SDF 距離場 | `sdCircle / sdRoundBox` | 邊緣光、形狀遮罩 |
| 雜訊 | `value / simplex / fbm noise` | 有機流動、閃爍、溶解門檻 |
| 色盤函式 | `cosine palette (Inigo Quilez)` | 平滑循環漸層 |
| 指數光暈 | `exp(d / width)` | 柔和發光 |
| Fresnel | `pow(1 - dot(N, V), p)` | 球體邊緣光 |
| 轉場混合 | `mix(a, b, step(noise, progress))` | 前後對比、溶解轉場 |

Demo：[`demos/glsl.html`](../demos/glsl.html)　文件：<https://thebookofshaders.com/>

### Canvas 2D

零依賴的即時繪圖；最適合 HUD、掃描框、波形、像素效果　·　授權：Web 標準　·　影片化：佳。畫面是 f(t) 就能直接逐幀渲染

| 動態原子 | API | 用在 |
|---|---|---|
| 漸層 | `createLinearGradient / createRadialGradient` | 掃描光帶、光暈 |
| 合成模式 | `globalCompositeOperation = 'lighter'` | 發光疊加 |
| 虛線流動 | `setLineDash + lineDashOffset` | 辨識框、流光邊 |
| 裁切 | `clip()` | 遮罩、前後對比 |
| 像素操作 | `getImageData / putImageData` | falling sand、故障效果 |
| 殘影 | `每幀畫半透明底色` | 拖尾 |

Demo：[`demos/canvas2d.html`](../demos/canvas2d.html)　文件：<https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API>

### Rough.js　`roughjs@4.6.6`

手繪／素描風格圖形產生器；讓 AI 影片有「人味」的標註　·　授權：MIT　·　影片化：佳。固定 seed，描線進度 = f(t)

| 動態原子 | API | 用在 |
|---|---|---|
| 手繪形狀 | `rc.ellipse / rectangle / linearPath / curve` | 圈選、箭頭、標註 |
| 手感參數 | `roughness / bowing / seed` | 控制手抖程度，seed 固定則可重現 |
| 填充風格 | `fillStyle: 'hachure' \| 'cross-hatch' \| 'zigzag'` | 素描陰影 |
| 描線動畫 | `SVG path + stroke-dashoffset` | 即時畫出來的感覺 |

Demo：[`demos/rough.html`](../demos/rough.html)　文件：<https://github.com/rough-stuff/rough/wiki>

### p5.js　`p5@2.3.4`

創意編程入門首選；快速做生成式原型（p5 2.x 有 API 變動）　·　授權：LGPL-2.1　·　影片化：中。適合原型與素材輸出，正式片再移植到 Canvas / Three

| 動態原子 | API | 用在 |
|---|---|---|
| Perlin noise | `noise(x, y, t)` | 流場、有機運動 |
| 離屏畫布 | `createGraphics + loadPixels` | 文字／Logo 取樣成粒子目標 |
| 顏色內插 | `lerpColor` | 漸層粒子 |
| WEBGL 模式 | `createCanvas(w, h, WEBGL) + shader` | 3D 與 shader 原型 |
| 逐幀輸出 | `saveGif / frameCount` | 快速匯出素材 |

Demo：[`demos/p5.html`](../demos/p5.html)　文件：<https://p5js.org/reference/>

### Tone.js　`tone@15.1.22`

Web Audio 音樂框架；做音效、配樂，並用聲音驅動畫面　·　授權：MIT　·　影片化：需改造。影片中用 Tone.Offline 先算出音軌，再把 FFT 數據預先存成陣列驅動畫面

| 動態原子 | API | 用在 |
|---|---|---|
| 音訊啟動 | `await Tone.start()（需使用者手勢）` | 瀏覽器限制 |
| 合成器 | `Synth / FMSynth / Noise` | UI 音效、嗶聲、噪音 |
| 效果鏈 | `chain(Filter, Reverb, Gain)` | 降噪對比、空間感 |
| 參數自動化 | `param.rampTo(v, sec)` | 平滑開關 |
| 分析器 | `Waveform / FFT / Meter` | 聲音 → 視覺數值 |
| 節拍時間軸 | `Transport + Loop + Part` | 音畫同步、剪輯點對拍 |
| 離線渲染 | `Tone.Offline(() => …, duration)` | 輸出音檔給影片用 |

Demo：[`demos/tone.html`](../demos/tone.html)　文件：<https://tonejs.github.io/docs/>

## 靈感來源

| 平台 | 標題 | 對應效果 |
|---|---|---|
| Dribbble | [AI Orb 搜尋](https://dribbble.com/search/ai-orb) | AI 光球 |
| Dribbble | [AI Orb Motion Animation Design](https://dribbble.com/search/ai%20orb%20motion%20animation%20design) | AI 光球、粒子繞行 |
| Dribbble | [AI Assistant 搜尋](https://dribbble.com/search/ai-assistant) | AI 光球、浮動 UI 卡片 |
| Dribbble | [Siri Animation 搜尋](https://dribbble.com/search/siri-animation) | AI 光球、螢幕邊緣流光 |
| Dribbble | [Orb - Agentic AI Motion Design（AmazingUI）](https://dribbble.com/shots/27465848-Orb-Agentic-AI-Motion-Design-by-AmazingUI) | AI 光球 |
| Dribbble | [Apple iOS11 Siri visual effect motion（Gleb Kuznetsov / Milkinside）](https://dribbble.com/shots/3546148-Apple-iOS11-Siri-visual-effect-motion) | AI 光球、聲音驅動畫面 |
| Pinterest | [AI motion graphics 搜尋](https://www.pinterest.com/search/pins/?q=ai%20motion%20graphics) | — |
| Pinterest | [AI orb animation 搜尋](https://www.pinterest.com/search/pins/?q=ai%20orb%20animation) | AI 光球 |
| Pinterest | [Laptop product animation 搜尋](https://www.pinterest.com/search/pins/?q=laptop%20product%20animation%203d) | 產品登場、晶片／機身爆炸圖 |
| Pinterest | [AI UI motion design 搜尋](https://www.pinterest.com/search/pins/?q=ai%20ui%20motion%20design) | 浮動 UI 卡片、文字逐字生成 |
| Motion (motion.dev) | [Motion 官方範例庫（React / JS / Vue）](https://motion.dev/examples) | 浮動 UI 卡片 |
| Motion (motion.dev) | [Shared layout animation](https://examples.motion.dev/react/shared-layout-animation) | 浮動 UI 卡片 |
| Codrops | [3D Audio Visualizer with Three.js, GSAP & Web Audio API](https://tympanus.net/codrops/2025/06/18/coding-a-3d-audio-visualizer-with-three-js-gsap-web-audio-api/) | AI 光球、聲音驅動畫面 |
| Codrops | [How to Animate WebGL Shaders with GSAP](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/) | 前後對比擦除、手繪變成品 |
| Codrops | [WebGL Shader Techniques for Dynamic Image Transitions](https://tympanus.net/codrops/2025/01/22/webgl-shader-techniques-for-dynamic-image-transitions/) | 手繪變成品、物件消除化為粒子 |
| Codrops | [From SplitText to MorphSVG: 5 Creative Demos](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/) | 文字逐字生成、大字標語遮罩 |
| CodePen | [Siri Intelligence CSS animation](https://codepen.io/quintenm/pen/NPGYRgj) | 螢幕邊緣流光 |
| GitHub | [AppleIntelligenceGlowEffect](https://github.com/jacobamobin/AppleIntelligenceGlowEffect) | 螢幕邊緣流光 |
| Shadertoy | [Shadertoy（GLSL 範例海）](https://www.shadertoy.com/) | 螢幕邊緣流光、AI 光球、物件消除化為粒子 |
| Sandspiel | [Sandspiel（Falling sand 代表作）](https://sandspiel.club/) | 物件消除化為粒子 |
