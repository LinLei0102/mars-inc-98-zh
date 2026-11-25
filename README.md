# Mars Inc 98 — 简体中文汉化

《Mars Inc 98》（itch.io 上的 HTML5 单文件游戏）的**零侵入中文层**：不改动作者的游戏逻辑，用一个运行时翻译层把界面、教程、弹窗、日志全部译成中文，并可随时回退/更新。

- 游戏本体是**单个 index.html**（内联 CSS + 3.56 MB JS + 内嵌图标与音乐），因此"汉化"= 往页面里注入一个脚本。
- 翻译层 `i18n/zh-CN.js`：**1167 条词条 + 199 条句式规则**，约 105 KB。
- 覆盖方式：DOM 文本节点 / `title·aria-label·alt·placeholder` 属性 / 日志与提示（`log·out·msg`）/ 对话气泡整句（保留 `<b>`）/ 逐字母动画标签。

## 目录

```
i18n/zh-CN.js          中文层本体（词典 + 规则 + 安装逻辑）
src/game.js            游戏原始脚本（从页面中切出，未改动）
src/style.css          游戏主体 CSS（未改动）
template.html          HTML 骨架，含 /*__CSS__*/ 与 //__JS__ 两个注入位
build.mjs              拼装脚本：template + css + js → dist/index.html
vendor/three.min.js    three.js r128（原页面从 cdnjs 拉，这里本地化）
tools/shot.mjs         CDP 驱动无头 Edge：截图 / 点击 / 回读未翻译清单
tools/exprs/           扫描用的表达式与两份"残局存档"（通关态 / 忙碌态）
docs/汉化方案.md        可行性分析、结构分析、实施记录
docs/扫描报告.md        残局存档 + 全量 DOM 扫描的残留清单与方法
docs/strings_for_translation.csv  从源码抽出的候选文案清单（文件+行号+原文）
```

## 构建

```bash
node build.mjs          # 英文原始包 → dist/index.html
node build.mjs --zh     # 中文包     → dist/index.zh.html
node build.mjs --cdn    # three.js 走 cdnjs（与线上发布包一致）
node build.mjs --zh --inline   # 单文件自包含版 → dist/index.zh.standalone.html（用于静态托管）
```

产物是单文件 HTML，双击即可离线运行（`--zh` 版已挂好中文层）。

### 在线试玩（GitHub Pages）

`gh-pages` 分支里放的是一次 `--zh --inline` 的构建产物（`index.html`，约 4.3 MB，three.js 与中文层全部内联），开启 Pages 后即可直接玩，无需任何依赖。

更新线上版本：

```bash
bash tools/publish-pages.sh     # 重新构建并强推 gh-pages
```

## 怎么继续加词条

1. 改 `i18n/zh-CN.js`：往任意 `Object.assign(DICT, {…})` 里加 `"English": "中文"`；带变量的用 `RULES.unshift([/^…$/, m => …])`。
2. `node build.mjs --zh`
3. 用无头浏览器扫一遍未命中项：

```bash
node tools/shot.mjs "file:///<绝对路径>/dist/index.zh.html" shots/x.png '[data-tact="start"]' 2000
# 想跑完整扫描（解锁全部内容）：
node tools/shot.mjs "file:///<绝对路径>/dist/harvest.html" shots/x.png '[data-tact="start"]' 1200 \
  @tools/exprs/full_scan.js --preload=@tools/exprs/preload_max.js --evalout=scan.b64
```

`harvest.html` 是 `RELEASE=false` 的调试包（带 Dev Kit），需要时用 `build.mjs` 的一行改动生成；`docs/扫描报告.md` 里有完整命令。

## 想改游戏源码？

`docs/` 里的行号引用基于 prettier 重排后的副本（不入库，可随时生成）：

```bash
npx prettier --parser babel --print-width 200 src/game.js > src/game.pretty.js
```

## 已知边界

- 品牌名 / 编号 / 化学式 / 快捷键保持原文：`STEAM`、`CAM-01`、`CO₂ / N₂`、`Ctrl+S`、`LC-1`、`itch.io`。
- 中文用系统字体回退；想还原 Win98 像素观感，在 `src/style.css` 的 `--font-ui` 前置 Zpix / Fusion Pixel 即可。
- 只覆盖**界面文案**；游戏内嵌的像素图标与 3D 模型不受影响。

## 说明

游戏本体与美术版权归原作者所有，本仓库只包含**汉化层与其构建/验证脚本**；`src/game.js`、`src/style.css`、`template.html` 为便于复现构建而随附的原始文件快照。若用于公开发布，请遵守原游戏的授权条款。
