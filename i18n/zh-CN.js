/* Mars Inc 98 — 简体中文运行时翻译层 (zh-CN)
 * 不改动 game.js，直接在渲染后的 DOM 上做替换 + 监听后续重绘。
 * 用法：在 <body> 结束前（或 game.js 之前）以普通 script 引入即可。
 *      URL 加 ?lang=en 可临时关闭；控制台 MGI18N.report() 查看未命中条目。
 */
(() => {
  const HTML_MAP = {};

  const DICT = {
    /* ---------- 窗口 / 菜单 ---------- */
    "Mars Inc 98": "火星公司 98",
    "File": "文件", "View": "视图", "Colony": "殖民地", "Build": "建造",
    "Options": "选项", "Help": "帮助", "Debug": "调试",
    "New Game…": "新游戏…", "Save Game": "保存游戏", "Load Game": "读取游戏",
    "Exit": "退出", "Toggle CRT Lines": "切换 CRT 扫描线",
    "Music": "音乐", "Sound Effects": "音效", "Mission Briefing": "任务简报",

    /* ---------- 标题界面 ---------- */
    "Start Game": "开始游戏", "Quit Game": "退出游戏", "WISHLIST ON": "加入愿望单",
    "Continue": "继续", "Dev Kit": "开发套件", "Exit Playground": "退出试验场",

    /* ---------- 标签页 ---------- */
    "Crafting Station": "工作台", "Solar Array": "太阳能阵列", "Mine": "矿井",
    "Terraform": "地形改造", "Launch Pad": "发射台", "Hydro": "水力",
    "Biolab": "生物实验室", "Mining Operations": "采矿作业",

    /* ---------- 面板标题 ---------- */
    "Planetary Overview": "行星总览", "Colony Resources": "殖民地资源",
    "Current Mission Goals": "当前任务目标", "Output Log": "输出日志",
    "Alert Log": "警报日志", "Environmental Forecast": "环境预报",
    "Mission Archive · Recovered Logs": "任务档案 · 回收日志",
    "Available Ores": "可用矿石", "Yield per extraction": "每次开采产量",
    "Mining Upgrades": "采矿升级", "Auto Mining": "自动采矿",
    "Mining Summary": "采矿概要", "Battery Bank": "电池组",
    "Solar input": "太阳能输入", "Sun elevation": "太阳高度角",
    "Dust attenuation": "沙尘衰减", "Per panel": "每块板",
    "Power Monitor": "电力监视器", "Power Upgrades": "电力升级",
    "Stored energy (yellow) · solar input (green), last 60 s": "储能（黄）· 太阳能输入（绿），近 60 秒",
    "Bore Hole Cross-Section · Site T-1": "钻孔剖面 · T-1 位点",
    "Fuel Reserves": "燃料储备",
    "Hydro Station · Hellas Basin (drag to rotate)": "水力站 · 希腊平原（拖动旋转）",
    "Hand Pump · drag the red handle clockwise": "手动泵 · 顺时针拖动红色手柄",
    "Colony tank": "殖民地水箱", "Current turn (blue ring)": "当前圈数（蓝环）",
    "Line pressure": "管线压力", "Water per turn": "每圈出水量",
    "Crank speed": "摇柄转速", "Turns by hand": "手动圈数",
    "Pump stroke (¼ turn)": "泵行程（¼ 圈）", "Water Budget": "水量预算",
    "Seed Synthesizer · Incubator Trays": "种子合成器 · 培养托盘",
    "Seed Catalogue": "种子图鉴", "Launch Complex LC-1": "发射综合体 LC-1",
    "CAM-01 · BASE CAMP": "CAM-01 · 基地营",
    "3D camera feed offline": "3D 摄像头离线",
    "Mining Rig not constructed": "采矿钻机未建造",
    "Build the Mining Rig from Construction in the Crafting Station (10 E).": "在工作台的「建造」里造出采矿钻机（10 E）。",
    "Build the Mining Rig.": "建造采矿钻机。",
    "Open Crafting Station": "打开工作台",

    /* ---------- 物品名 ---------- */
    "Iron Ore": "铁矿", "Silica Ore": "硅矿", "Thorium Ore": "钍矿",
    "Sulfur Ore": "硫矿", "Copper Ore": "铜矿", "Aluminum Ore": "铝矿",
    "Titanium Ore": "钛矿", "Uranium Ore": "铀矿", "Platinum Ore": "铂矿",
    "Iron Plate": "铁板", "Glass Pane": "玻璃板", "Battery Cell": "电池单元",
    "Thorium Rod": "钍棒", "Greenhouse Charge": "温室染料", "Copper Wire": "铜线",
    "Aluminum Frame": "铝框架", "Titanium Alloy": "钛合金", "Uranium Cell": "铀电池",
    "Water": "水", "Heat Core": "热芯", "Seed of Life": "生命之种",
    "Lichen Seeds": "地衣种子", "Moss Seeds": "苔藓种子", "Grass Seeds": "草籽",
    "Poppy Seeds": "罂粟种子", "Dandelion Seeds": "蒲公英种子",
    "Sunflower Seeds": "向日葵种子", "Oak Seeds": "橡树种子",
    "Aspen Seeds": "白杨种子", "Pine Seeds": "松树种子", "Energy": "能量",

    /* ---------- 建筑 / 设备 ---------- */
    "Drill": "钻机", "Terraform Drill": "改造钻机", "Heater": "加热器",
    "BioSpray Tower": "生物喷洒塔", "Seed Spreader": "种子播撒器",
    "Embryo Incubator": "胚胎培养器", "Water Pump": "水泵",
    "Auto Crafter": "自动制造机", "Solar Panel": "太阳能板",
    "RTG Generator": "放射性同位素电源", "Launch Pad": "发射台",

    /* ---------- 通用状态 / 按钮 ---------- */
    "Upgrade": "升级", "Build": "建造", "Install": "安装", "Expand": "扩容",
    "Extract": "开采", "Craft": "制造", "Buy": "购买", "Sell": "出售",
    "Release": "放生", "Start": "开始", "OK": "确定", "Cancel": "取消",
    "Close": "关闭", "Yes": "是", "No": "否", "Empty": "空",
    "Empty bay": "空槽", "Locked": "未解锁", "BUILT": "已建成",
    "Running": "运行中", "Idle": "空闲", "Offline": "离线",
    "Crafting": "制造中", "Missing inputs": "缺少原料",
    "Phase finish": "阶段完成", "No limit": "无上限",
    "Max air pressure": "最大气压", "Venting speed": "泄压速度",
    "Solar power": "太阳能供电", "Panel mounts": "板架", "Battery": "电池",
    "High": "高", "Medium": "中", "Low": "低", "Very Low": "极低",
    "Common": "常见", "Uncommon": "少见", "Rare": "稀有",
    "Iron": "铁", "Silica": "硅", "Thorium": "钍", "Sulfur": "硫",
    "Copper": "铜", "Aluminum": "铝", "Titanium": "钛", "Uranium": "铀",
    "Platinum": "铂", "Lichen": "地衣", "Moss": "苔藓", "Grass": "草",
    "Poppy": "罂粟", "Dandelion": "蒲公英", "Sunflower": "向日葵",
    "Oak": "橡树", "Aspen": "白杨", "Pine": "松树",
    "Pressure": "气压", "Temperature": "温度", "Soil": "土壤",
    "Oxygen": "氧气", "Life": "生命", "Energy": "能量", "Water": "水",
    "Fog Clearance": "清除尘雾", "Dust Storm Dissipation": "沙尘暴消散",
    "Planet Frosting": "行星结霜", "Ice Formation in Craters": "陨坑结冰",
    "Cryospheric Melting": "冰圈消融", "Liquid Water": "液态水",
    "Planetary Soil Coverage": "行星土壤覆盖",
    "Planetary Algae Coverage": "行星藻类覆盖",
    "A Living Planet": "活着的行星",
    "Surface": "地表", "Orbit": "轨道", "Prebuilt": "预置",
    /* ---------- 第二轮补充 ---------- */
    "Construction": "建造", "Refinery": "精炼", "Product": "产物",
    "Input": "输入", "Qty": "数量", "Cost": "成本", "READY": "就绪",
    "Ores": "矿石", "Materials": "材料", "Crafting Dome": "工艺穹顶",
    "Mining Rig": "采矿钻机", "Begin Mission": "开始任务", "Solar": "太阳能",
    "In stock": "库存", "Panels": "面板板", "PANELS": "面板",
    "Report": "报告", "Log": "日志", "Status": "状态", "Details": "详情",
    "Available": "可用", "Required": "需求", "Progress": "进度",
    "Mission Briefing · Mars Inc 98": "任务简报 · 火星公司 98",
    /* ---------- 第三轮补充 ---------- */
    "Atmosphere": "大气", "LIVE": "实时", "Load": "负载", "Net": "净",
    "Output": "产出", "Reserves": "储量", "Extraction": "开采",
    "Mine selected ore": "开采选中矿石", "DRAG ↻": "拖动 ↻",
    "Hand pump crank: drag clockwise": "手摇泵：顺时针拖动",
    "WISHLIST ON STEAM": "在 STEAM 加入愿望单",
    "Wishlist on Steam": "在 Steam 加入愿望单",
    "Menu bar": "菜单栏", "Main toolbar": "主工具栏", "Main window": "主窗口",
    "Mission goals": "任务目标", "Output log: everything you craft": "输出日志：所有制造记录",
    "Pixel-art view of Mars": "火星像素视图",
    "Colony uplink established. Sol 1.": "殖民地链路已建立。火星日 1。",
    "Oxygen levels critical outside Dome 1.": "1 号穹顶外氧气浓度告急。",
    "Dust fog blankets the planet. Pressure 6.1 mbar.": "沙尘笼罩行星。气压 6.1 毫巴。",
    "1 solar panel online. Batteries at 60%.": "1 块太阳能板在线。电池 60%。",
    "Terraforming goal updated: 10 stages.": "地形改造目标已更新：共 10 个阶段。",
    "In stock: 0": "库存：0",
    "PRESS": "气压", "TEMP": "温度", "OXY": "氧气",
    "Carbon Dioxide": "二氧化碳", "Dust opacity τ": "沙尘不透明度 τ",
    "Clear Skies": "晴朗", "Dust activity:": "沙尘活动：",
    "Solar output:": "太阳能输出：", "Soil Coverage": "土壤覆盖",
    "Oxygen (O₂)": "氧气（O₂）", "Life (biodiversity)": "生命（生物多样性）",
    "Sprocket: click me for a hint": "斯普罗凯特：点我获取提示",
    "Opens the Mine. Extract ore from the regolith by hand, then by drone. Every extraction draws battery power.": "打开矿井。先用手、再用无人机从风化层里采矿石，每次开采都要耗电。",
    "Next update in": "下次更新倒计时",
    /* ---------- 目标 / 阶段 / 明细 ---------- */
    "Dashboard": "仪表盘", "STAGE": "阶段",
    "Pressure": "气压", "Temperature": "温度", "Soil": "土壤",
    "Oxygen": "氧气", "Life": "生命",
    "Construct the Mining Rig": "建起采矿钻机",
    "Craft 12 Iron Plates": "制作 12 块铁板",
    "Build the Terraform Drill": "建造改造钻机",
    "Craft a Thorium Rod": "制作一根钍棒",
    "Load a Thorium Rod into the Drill": "给钻机装填钍棒",
    "Upgrade the Drill to Lv 2": "把钻机升到等级 2",
    "Upgrade the Drill to Lv 3": "把钻机升到等级 3",
    "Build the Launch Pad": "建造发射台",
    "Fly the rocket to the supply ship": "把火箭飞到补给船",
    "Complete Launch 1": "完成第一次发射",
    "Complete Launch 2": "完成第二次发射",
    "Build the Heater": "建造加热器",
    "Upgrade the Heater to T2": "把加热器升到 T2",
    "Upgrade the Heater to T3": "把加热器升到 T3",
    "Slot a Heat Core": "装入一枚热芯",
    "Build the Water Pump": "建造水泵",
    "Crank the hand pump 25 turns": "用手摇泵摇 25 圈",
    "Build the BioSpray Tower": "建造生物喷洒塔",
    "Upgrade the BioSpray Tower to T2": "把生物喷洒塔升到 T2",
    "Upgrade the BioSpray Tower to T3": "把生物喷洒塔升到 T3",
    "Upgrade Crank Gearing to Lv 2": "把摇柄齿轮升到等级 2",
    "Run 3 motor pumps": "运行 3 台电机水泵",
    "Build the Seed Synthesizer": "建造种子合成器",
    "Build the Seed Spreader": "建造种子播撒器",
    "Spread flower seeds": "播撒花卉种子",
    "Upgrade the Seed Spreader to T2": "把种子播撒器升到 T2",
    "Upgrade the Seed Spreader to T3": "把种子播撒器升到 T3",
    "Grow tree seeds in the Biolab": "在生物实验室培育树种子",
    "Build the Genome Decoder": "建造基因解码器",
    "Build the Embryo Incubator": "建造胚胎培养器",
    "Release an insect": "放生一只昆虫",
    "Release a bird": "放生一只鸟",
    "Release a large animal": "放生一只大型动物",
    "Upgrade the Incubator to T2": "把培养器升到 T2",
    "Upgrade the Incubator to T3": "把培养器升到 T3",
    "Fuel load": "燃料装载", "Guidance computer": "制导计算机",
    "Cabin pressure": "座舱气压", "Ignition arm": "点火保险",
    "NOT ENOUGH RESOURCES": "资源不足", "Not enough resources": "资源不足",
    "Supply Run": "补给运输", "Standby": "待命", "En route": "在途",
    "Launch Pad · Standby": "发射台 · 待命",
  };

  /* 含变量的句式：正则 → 生成函数，$1.. 为捕获组，g(n) 取组内容 */
  const RULES = [
    [/^Stage (\d+)\/(\d+)(?: · (.+))?$/, (m) => "阶段 " + m[1] + "/" + m[2] + (m[3] ? " · " + tr(m[3]) : "")],
    [/^Lv (\d+)$/, (m) => "等级 " + m[1]],
    [/^Lv (\d+) · no limit$/, (m) => "等级 " + m[1] + " · 无上限"],
    [/^T(\d)$/, (m) => "T" + m[1]],
    [/^(\d+(?:\.\d+)?) E$/, (m) => m[1] + " 能量"],
    [/^cap (\d+(?:\.\d+)?) E$/, (m) => "容量 " + m[1] + " 能量"],
    [/^(.+) mbar$/, (m) => m[1] + " 毫巴"],
    [/^(.+) °C$/, (m) => m[1] + " °C"],
    [/^(.+) kt\/s$/, (m) => m[1] + " 千吨/秒"],
    [/^(.+) m³$/, (m) => m[1] + " 立方米"],
    [/^(.+) L$/, (m) => m[1] + " 升"],
    [/^(.+)% life$/, (m) => m[1] + "% 生命"],
    [/^(.+)% O₂$/, (m) => m[1] + "% 氧气"],
    [/^(\d+) \/ (\d+)$/, (m) => m[1] + " / " + m[2]],
    [/^BUILD (.+)$/, (m) => "建造" + tr(m[1])],
    [/^MINE (.+) · (.+)$/i, (m) => "开采" + tr(m[1]) + " · " + m[2]],
    [/^NOT ENOUGH POWER \(need (.+)\)$/i, (m) => "电力不足（需要 " + m[1] + "）"],
    [/^STAGE (\d+)\/10 · (.+)$/i, (m) => "阶段 " + m[1] + "/10 · " + tr(m[2])],
    [/^EN ROUTE · (.+)$/i, (m) => "在途 · " + tr(m[1])],
    [/^LAUNCH PAD · (.+)$/i, (m) => "发射台 · " + tr(m[1])],
    [/^(.+) \(x(\d+)\)$/i, (m) => tr(m[1]) + " ×" + m[2]],
    [/^Quantity of (.+)$/i, (m) => tr(m[1]) + " 数量"],
    [/^Next · Stage (\d+): (.+)$/i, (m) => "下一步 · 阶段 " + m[1] + "：" + tr(m[2])],
    [/^([+-]?\d+(?:\.\d+)?) E\/s$/i, (m) => m[1] + " 能量/秒"],
    [/^([+-]?\d+(?:\.\d+)?)\/s$/i, (m) => m[1] + "/秒"],
    [/^SHAFT ([A-Z]) · (\d+) m$/i, (m) => "竖井 " + m[1] + " · " + m[2] + " 米"],
    [/^Lvl (\d+)$/i, (m) => "等级 " + m[1]],
    [/^PANELS (\d+)$/i, (m) => "面板 " + m[1]],
    [/^Wishlist (.+) on Steam$/i, (m) => "在 Steam 加入愿望单：" + tr(m[1])],
    [/^Output log: (.+)$/i, (m) => "输出日志：" + tr(m[1])],
    [/^([\d.]+)\/([\d.]+) E$/, (m) => m[1] + "/" + m[2] + " 能量"],
    [/^Sol (\d+)\s+(\d+:\d+)$/i, (m) => "火星日 " + m[1] + "  " + m[2]],
    [/^(\d+) (.+)$/, (m) => { const t = tr(m[2]); return t === m[2] ? m[0] : m[1] + " " + t; }],
    [/^> \[(\d+:\d+)\] (.+)$/, (m) => "> [" + m[1] + "] " + tr(m[2])],
    [/^Next update in (.+)$/i, (m) => "下次更新：" + m[1]],
  ];

  /* ================= 生成区（数据表与模板文案，勿手改） ================= */
  Object.assign(DICT, {
    "Open Terraform": "开启地形改造",
    "Genome Decoder": "基因解码器",
    "Decode": "解码",
    "Open Biolab": "开启生物实验室",
    "T3 · no cap": "T3 · 无上限",
    "Tier cap": "等级上限",
    "Unlocks after Launch 1": "第 1 次发射后解锁",
    "Got it": "知道了",
    "Mode:": "模式：",
    "Open Launch Pad": "开启发射台",
    "Ore per click": "每次点击矿石",
    "Stalled · no power": "停滞 · 无电力",
    "Affecting Sectors:": "影响区域：",
    "Crank Gearing": "摇柄齿轮",
    "Export failed:": "导出失败：",
    "Finish the pre-flight checklist, then press IGNITION.": "完成起飞前检查清单，然后按下「点火」。",
    "Full game preview OFF.": "完整游戏预览已关闭。",
    "Gene Splicer": "基因拼接器",
    "Genomes": "基因组",
    "Greenhouse Charges": "温室装药",
    "IGNITION": "点火",
    "Job done.": "干完了。",
    "Launch 2 reward": "第 2 次发射奖励",
    "Launches": "发射",
    "Mission Complete": "任务完成",
    "New Game": "新游戏",
    "Next Machine": "下一台机器",
    "Objective complete": "目标完成",
    "Open Hydro": "开启水力",
    "Requires the Mining Rig": "需要采矿钻机",
    "Return the Seed of Life": "带回生命之种",
    "Speed ×1": "速度 ×1",
    "Speed ×20": "速度 ×20",
    "Speed ×5": "速度 ×5",
    "Spot-spray needs 15 L of water.": "定点喷洒需要 15 升水。",
    "Sprocket": "斯普罗凯特",
    "Stage 6 reward": "第 6 阶段奖励",
    "Stage 9 reward": "第 9 阶段奖励",
    "Stop Pumps": "停止水泵",
    "TANK FULL": "水箱已满",
    "Unlock bigger Qty sizes for crafting.": "解锁更大的制造数量选项。",
    "Unlocks in Stage 7": "第 7 阶段解锁",
    "Unlocks in Stage 8": "第 8 阶段解锁",
    "Unlocks in Stage 9": "第 9 阶段解锁",
    "Waiting for parts.": "等待零件。",
    ", open the .obj in Blender and use File › Export › FBX. Pixel art is": "，在 Blender 里打开 .obj 并选择 文件 › 导出 › FBX。像素画则是",
    ", so humanity has a backup home.": "，好让人类有个备份家园。",
    ", so players can't cheat or break the game. Your copy here keeps all of them.": "，这样玩家无法作弊或搞坏游戏。你手上的这一份保留了全部功能。",
    ", then fly": "，然后飞往",
    ", then press": "，然后按下",
    ", using the A / T / G / C buttons. The next one to press is highlighted.": "，用 A / T / G / C 按钮输入，下一个要按的会高亮。",
    ", which open in Blender, Unity, Unreal and Godot. For": "，可以用 Blender、Unity、Unreal 和 Godot 打开。至于",
    ": everything you've mined and made. Things you haven't discovered yet show as": "：你采到和造出的所有东西。还没发现的东西会显示为",
    "\"This file will be played in the browser\"": "此文件将在浏览器中运行",
    "(eat birds, drink water). Each tier of the Incubator unlocks the next group.": "（吃鸟、喝水）。培养器每升一档解锁下一组。",
    "(eat insects) →": "（吃昆虫）→",
    "(Genome Decoder) → you get a genome (costs Uranium Cells).": "（基因解码器）→ 得到一份基因组（消耗铀电池）。",
    "(need flowers) →": "（需要花卉）→",
    "(Terraform tab or Construction) to decode animal genomes here.": "（地形改造页或建造面板）在这里解码动物基因组。",
    "(the next one is highlighted) before the timer runs out. Each decode costs Uranium Cells, shown on the Decode button. The Decoder lives in the": "（下一个会高亮），在计时结束前按完。每次解码消耗铀电池，数量显示在「解码」按钮上",
    "(with .mtl colours) and": "（带 .mtl 颜色）以及",
    "% life": "% 生命",
    "→ tick": "→ 打勾",
    "→ upload the zip → tick": "→ 上传压缩包 → 打勾",
    "→ Viewport about": "→ 视口大约",
    "+25% stage progress": "+25% 阶段进度",
    "+25% stage progress.": "+25% 阶段进度。",
    "+50 Lichen, Moss and Grass seeds.": "地衣、苔藓、草籽各 +50。",
    "+50 seeds of each type": "每种种子 +50",
    "+500 Resources": "资源 +500",
    "< Back": "< 返回",
    "<div>> No messages yet.</div><div>> Crafting, machines and alerts are listed here.</div>": "尚无消息。制造、机器和警报都会列在这里。",
    "<p>Start a new colony? Your current progress will be erased.</p>": "要新建一个殖民地吗？当前进度将被清空。",
    "<p>Thanks for playing <b>Mars Inc 98</b>!</p>": "感谢游玩《火星公司 98》！",
    "✓ Already constructed.": "✓ 已建造。",
    "0.8 E/s, 4 L/s of water and 1 seed every 5 s": "0.8 能量/秒、4 升/秒的水，每 5 秒 1 颗种子",
    "1 · Flowers → blue sky": "1 · 花卉 → 蓝天",
    "10–30 L + 5 L per watering": "10–30 升 + 每次浇水 5 升",
    "14 solar panels in their rows": "成排的 14 块太阳能板",
    "3D view is not available in this browser, so 3D chunks cannot be exported.": "此浏览器不支持 3D 视图，因此无法导出 3D 区块。",
    "A machine that keeps crafting for you. Pick a recipe for each slot and it crafts it on its own, using the same ingredients and energy as crafting by hand, until that item reaches its stock limit.": "一台替你持续制造的机器。给每个槽位选一个配方，它就会自己制造，消耗同样的",
    "A row of letters appears.": "出现一排字母。",
    "A small maintenance robot wakes when we restore power. It hums, blinks twice, and leads us to the reactor ring.": "电力恢复时，一台小型维护机器人醒了过来。它嗡嗡作响，眨了两次眼，把我们带到反应堆环",
    "Active rod": "已装填钍棒",
    "Add another panel to the array.": "给阵列再加一块太阳能板。",
    "Add Incubator Tray": "增加培养托盘",
    "Add with an upgrade": "通过升级增加",
    "Added 500 of every ore and material, topped water up to 600 L, +3 Heat Cores.": "每种矿石和材料 +500，水补到 600 升，热芯 +3。",
    "Algae blooms along shores": "岸边藻华",
    "All 3D chunks (.zip)": "全部 3D 区块（.zip）",
    "All images (.zip)": "全部图像（.zip）",
    "All pre-flight checks green. Ready for ignition.": "起飞前检查全部通过，可以点火。",
    "All the way": "全程",
    "An animal is ready: press RELEASE in the Embryo Incubator.": "有一只动物可以放生了：在胚胎培养器里按「放生」。",
    "and release it into the wild": "然后放归野外",
    "Array full. Expand it first.": "阵列已满，请先扩容。",
    "Arrival in": "抵达倒计时",
    "as the key, plus 600 L of water (expand your water tank first).": "作为钥匙，外加 600 升水（先扩容水箱）。",
    "Ask Sprocket for a hint": "向斯普罗凯特要提示",
    "at maximum coverage. Upgrade required to spread more plant life.": "已达最大覆盖。要继续扩张植被需要升级。",
    "at maximum depth. Upgrade the drill to keep thickening the air.": "已达最大深度。升级钻机才能继续加厚大气。",
    "at maximum output. Upgrade required to warm the planet further.": "已达最大输出。要让行星更暖需要升级。",
    "at maximum range. Upgrade required to spread soil further.": "已达最大范围。要继续扩张土壤需要升级。",
    "At the heart of the station, sealed in glass, sits a single glowing seed. The plaque reads: \"Plant me when the sky is blue.\"": "空间站正中央，玻璃罩里封着一颗发光的种子。铭牌上写着：「等我长大的那天，把我种下去",
    "AUTO": "自动",
    "Auto Crafter built. Pick a recipe for its slot.": "自动制造机已建成。为它的槽位选一个配方。",
    "Auto Crafter Lv 3": "自动制造机 等级 3",
    "Auto-Decoder target": "自动解码目标",
    "Auto-Sequencer Target": "自动测序目标",
    "AWAITING HEATER": "等待加热器",
    "AWAITING INCUBATOR": "等待培养器",
    "AWAITING SEED SPREADER": "等待种子播撒器",
    "AWAITING TOWER": "等待喷洒塔",
    "Back to your colony. Playground closed.": "回到你的殖民地。试验场已关闭。",
    "Battery capacity": "电池容量",
    "Battery Cell production online.": "电池单元生产线已启动。",
    "Bees work the sunflowers, crows argue in the pines and foxes hunt rabbits through the long grass. Mars is alive.": "蜜蜂在向日葵间忙碌，乌鸦在松林里争吵，狐狸穿过长草追兔子。火星活了。",
    "BEGIN PRE-FLIGHT": "开始起飞前检查",
    "Big resource list": "大号资源列表",
    "Big, bright and greedy for light.": "又大又亮，贪恋阳光。",
    "Bigger Rod Hopper": "更大的钍棒料斗",
    "Biolab · Seed Synthesizer": "生物实验室 · 种子合成器",
    "Biolab sealed": "生物实验室密封中",
    "Biolab Upgrades": "生物实验室升级",
    "Biolab: press the highlighted letter (A, T, G or C), left to right, before time runs out!": "生物实验室：在计时结束前，从左到右按高亮的字母（A、T、G 或 C）！",
    "BioSpray Control": "生物喷洒控制",
    "BioSpray is thirsty: add motor pumps, flush filters or crank by hand.": "生物喷洒缺水：加装电机水泵、冲洗滤芯，或者手动摇泵。",
    "BioSpray Tier": "生物喷洒等级",
    "BioSpray Tower · click dry red ground to spot-spray it (15 L)": "生物喷洒塔 · 点击干燥的红色地面定点喷洒（15 升）",
    "BioSpray Tower (full speed)": "生物喷洒塔（全速）",
    "BioSpray Tower Built": "生物喷洒塔已建成",
    "BioSpray Tower raised.": "生物喷洒塔已升起。",
    "BioSpray Tower spraying.": "生物喷洒塔正在喷洒。",
    "BioSpray Tower stopped.": "生物喷洒塔已停止。",
    "BioSpray Upgrades": "生物喷洒升级",
    "Birds": "鸟类",
    "Birds eat insects: release 2 insects per bird, then decode and incubate Pigeons, Crows and Chickens.": "鸟吃昆虫：每只鸟要先放生 2 只昆虫，然后再解码并培养鸽子、乌鸦和鸡。",
    "Blossom Station": "花神空间站",
    "Blossom Station is a seed vault. Its doors stay shut until the Seed of Life is held up to the scanner.": "花神空间站是一座种子库。把生命之种举到扫描器前，舱门才会打开。",
    "Blue Sky & Weather": "蓝天与天气",
    "Blue sky emerging over base": "基地上空出现蓝天",
    "BLUEPRINT · NOT CONSTRUCTED": "蓝图 · 尚未建造",
    "Both stations reached. The pad stands ready for future missions.": "两座空间站都已抵达。发射台随时待命，等待后续任务。",
    "Breed life": "繁衍生命",
    "Built every unlocked blueprint for free.": "已免费建造所有已解锁的蓝图。",
    "Bye, Sprocket!": "再见，斯普罗凯特！",
    "Cargo on return:": "返航货物：",
    "Cargo returned:": "已运回货物：",
    "Central habitat dome with airlocks and antenna": "带气闸和天线的中央居住穹顶",
    "Cheats for testing. They work on the live game.": "测试用作弊功能，对当前游戏直接生效。",
    "Classic panels": "经典面板",
    "Clear red Mars (no fog, no storm)": "清空红色火星（无雾无风暴）",
    "Clearing Skies": "天空转晴",
    "Click a drone below to change its ore.": "点击下方的无人机可切换它开采的矿石。",
    "Clouds": "云",
    "Clouds forming in all sectors": "各区域开始形成云层",
    "CO₂ / N₂": "CO₂ / N₂",
    "Colony Reports": "殖民地报告",
    "Coming in the full game:": "完整版中将加入：",
    "Common Ore Drill Bit": "常见矿石钻头",
    "Complete current stage": "完成当前阶段",
    "Complete Stage": "完成阶段",
    "Construct the Terraform Drill (Construction panel or Terraform tab).": "建造改造钻机（建造面板或地形改造页）。",
    "Copy the sequence with the A/T/G/C buttons in the Biolab.": "在生物实验室用 A/T/G/C 按钮复现该序列。",
    "Could not load": "无法载入",
    "Could not read the game source in this browser.": "无法在此浏览器中读取游戏源码。",
    "Countdown": "倒计时",
    "Course corrected.": "航向已修正。",
    "Course deviation uncorrected: +10 s flight time.": "航向偏差未修正：飞行时间 +10 秒。",
    "Course deviation! Correct it in the Launch Pad tab.": "航向偏差！在发射台页修正。",
    "COURSE DEVIATION! Correct it in the Launch Pad tab.": "航向偏差！在发射台页修正。",
    "Crafting Domes": "制造穹顶",
    "Crater floors are filling with ice. The planet is holding onto the heat.": "陨坑底部正在结冰。行星开始留住了热量。",
    "Crater ice sheets": "陨坑冰盖",
    "Create new project → Kind of project:": "新建项目 → 项目类型：",
    "Crew": "船员",
    "CRT scanlines": "CRT 扫描线",
    "Decode aborted. Uranium Cells spent.": "解码已中止，铀电池已消耗。",
    "Decode animal genomes in the": "在下面这里解码动物基因组：",
    "Decode insect genomes (Fly, Bee, Butterfly) in the Biolab, then incubate and release them in the Terraform tab.": "在生物实验室解码昆虫基因组（苍蝇、蜜蜂、蝴蝶），然后在地形改造页培养并放生",
    "Decoded genomes in stock": "已解码基因组库存",
    "Decoder Memory": "解码器记忆容量",
    "Decodes animal genomes for the Embryo Incubator. Runs on Uranium Cells. Adds the decoder to the Biolab: copy the DNA letters before time runs out.": "为胚胎培养器解码动物基因组，靠铀电池驱动。把解码器装进生物实验室：按顺序复现",
    "Demo Complete": "演示完成",
    "Demo mode": "演示模式",
    "Demo mode is": "演示模式是",
    "Deploy your first drone (right). It keeps mining even while you're in other tabs.": "部署你的第一台无人机（右侧）。你在别的页面时它也会继续采矿。",
    "Dev Kit · Testing Tools": "开发套件 · 测试工具",
    "Dev Kit…": "开发套件…",
    "Dig more Iron and Silica with each click.": "每次点击多挖一些铁和硅。",
    "Dig more rare ore with each click.": "每次点击多挖一些稀有矿石。",
    "Dig more Thorium with each click.": "每次点击多挖一些钍。",
    "Docked!": "对接成功！",
    "drag the crank handle clockwise": "顺时针拖动摇柄",
    "Drill Control": "钻机控制",
    "Drill engaged.": "钻机已启动。",
    "Drill Level": "钻机等级",
    "Drill Site T-1 · live 3D view (drag to rotate)": "钻探点 T-1 · 实时 3D 视图（拖动旋转）",
    "Drill stopped.": "钻机已停止。",
    "Drill Upgrades": "钻机升级",
    "Drip Irrigation": "滴灌",
    "Drone": "无人机",
    "Drone power draw": "无人机耗电",
    "Drone rate": "无人机速率",
    "Drones keep mining even while you're in other tabs.": "你在别的页面时无人机也会继续采矿。",
    "DRONES PARKED": "无人机已停泊",
    "Drones parked. Mining paused.": "无人机已停泊，采矿暂停。",
    "DRY! Growth stopped": "缺水！生长停止",
    "Dust Storm": "沙尘暴",
    "DUST STORM ACTIVE": "沙尘暴活跃",
    "Dust storm building": "沙尘暴酝酿中",
    "Dust storms:": "沙尘暴：",
    "Each vault door opens onto a garden frozen in time: lichens, mosses, grasses, waiting for a world to live on.": "每扇库门后都是一座被时间冻结的花园：地衣、苔藓、禾草，等着一个能活下去的世界。",
    "Earth is dying.": "地球正在死去。",
    "Efficient Motors": "高效电机",
    "Embryo Incubator + Genome Decoder blueprints": "胚胎培养器 + 基因解码器蓝图",
    "Embryo Incubator Built": "胚胎培养器已建成",
    "Embryo Incubator online in the nature reserve.": "自然保护区里的胚胎培养器已上线。",
    "Embryos ready to release": "可放生的胚胎",
    "Empty mount": "空置支架",
    "Ended": "已结束",
    "Erase & Restart": "清空并重开",
    "Everything in its real position (layout reference)": "所有物体按真实位置摆放（布局参考）",
    "Expand Solar Array": "扩容太阳能阵列",
    "Expand Water Tank": "扩容水箱",
    "Export Assets": "导出资源",
    "Export Assets for my engine…": "为我的引擎导出资源…",
    "Export itch.io build": "导出 itch.io 版本",
    "Export itch.io build…": "导出 itch.io 版本…",
    "Export MarsInc98_itch.zip": "导出 MarsInc98_itch.zip",
    "Feed": "饲料",
    "Fill battery (+cap 500)": "充满电池（容量 +500）",
    "Fill Tank": "加满水箱",
    "Finish before the timer runs out and you get 1 genome. A wrong key only costs 1 second.": "在计时结束前输入完成可得 1 份基因组。按错只扣 1 秒。",
    "Finish launch now": "立即完成发射",
    "First lakes in Hellas Basin": "希腊平原出现最初的湖泊",
    "first to turn the sky blue, then": "先把天空变蓝，然后",
    "Flight Program": "飞行程序",
    "Flight Record": "飞行记录",
    "Flight time": "飞行时间",
    "Flower seeds": "花卉种子",
    "Flowers are spreading! Tree seeds can now be spliced in the Biolab.": "花卉正在蔓延！现在可以在生物实验室拼接树种子了。",
    "Flush Filters (1 E)": "冲洗滤芯（1 能量）",
    "Fly": "飞行",
    "Fly Launch 2 to Blossom Station with the Seed of Life.": "带着生命之种把 2 号火箭飞往花神空间站。",
    "Fly Launch 2 to Blossom Station. The Seed of Life is the key.": "把 2 号火箭飞往花神空间站。生命之种就是钥匙。",
    "Food Chain · decode, incubate, release": "食物链 · 解码、培养、放生",
    "Forests sway under a blue sky. Clouds roll in, and for the first time in a billion years it rains on Mars.": "森林在蓝天下摇曳。云层涌来，十亿年来火星第一次下雨。",
    "from the Terraform tab to finish the mission.": "从地形改造页完成任务。",
    "Frost Front": "霜线",
    "Fuel": "燃料",
    "Fuel Hopper": "燃料料斗",
    "Fuel tank": "燃料箱",
    "Full game preview ON: mining drones and auto-crafting are unlocked.": "完整游戏预览已开启：采矿无人机与自动制造已解锁。",
    "Full game preview ON.": "完整游戏预览已开启。",
    "Fullscreen button": "全屏按钮",
    "Fully upgraded.": "已升满。",
    "Fully upgraded. Craft as many as you can afford at once.": "已升满。可以一次制造你能负担的最多数量。",
    "Fully upgraded. The drill can thicken the air all the way.": "已升满。钻机可以把大气加厚到底。",
    "Game saved.": "游戏已保存。",
    "Gas": "气体",
    "Gene length": "基因长度",
    "Gene Library": "基因库",
    "Genome Bank": "基因组库",
    "Genome Decoder · animals": "基因解码器 · 动物",
    "Genome Decoder & Incubator": "基因解码器与培养器",
    "Genome Decoder Built": "基因解码器已建成",
    "Genome Decoder online.": "基因解码器已上线。",
    "Genomes in stock": "基因组库存",
    "Give up": "放弃",
    "Go to Terraform": "前往地形改造",
    "Green algae mats now line every shore. The air carries a faint trace of oxygen.": "每片岸边都铺上了绿色藻毯。空气里飘着一丝氧气。",
    "Greenhouse Stock": "温室装药库存",
    "Greenhouse venting": "温室排放",
    "Ground": "地面",
    "GROUNDED": "接地",
    "Grow time": "生长时间",
    "Grows on lichen crust. Needs Lichen seeds.": "长在地衣结皮上。需要地衣种子。",
    "Growth": "生长",
    "Habitat life support": "居住舱生命维持",
    "Hand Pump": "手动泵",
    "Hand pump (you)": "手动泵（你）",
    "Hand pump installed on the Hellas lake.": "手动泵已装在希腊湖上。",
    "Hand-cranked pump on the Hellas lake. Opens the Hydro tab. Upgrade the gearing to unlock motor pumps.": "希腊湖上的手摇泵。开启水力页。升级齿轮可解锁电机水泵。",
    "Hardy crust that grows on bare rock. The start of the seed chain.": "长在裸岩上的硬质结皮。种子链的起点。",
    "Hardy evergreen. Hardest genome.": "耐寒的常绿树。最难解的基因组。",
    "Harvest Drone": "采集无人机",
    "Heat Cores": "热芯",
    "Heater blueprint · 4 Heat Cores · the Seed of Life · Sulfur Ore": "加热器蓝图 · 4 枚热芯 · 生命之种 · 硫矿",
    "Heater Built": "加热器已建成",
    "Heater Control": "加热器控制",
    "Heater ignited.": "加热器已点火。",
    "Heater online at the Thermal Plant.": "热能站的加热器已上线。",
    "Heater shut down.": "加热器已停机。",
    "Heater tier": "加热器等级",
    "Heater Tier": "加热器等级",
    "Heater Upgrades": "加热器升级",
    "Hellas lake water disc": "希腊湖水盘",
    "Hidden under the fog": "隐藏在尘雾下",
    "Highlands: −70 °C": "高地：−70 °C",
    "Holds more rods, so the drill runs longer on its own.": "装更多钍棒，钻机能自己跑更久。",
    "How animals work": "动物怎么运作",
    "How to decode": "如何解码",
    "How to get the Heater": "如何获得加热器",
    "How to get the Seed Spreader": "如何获得种子播撒器",
    "HTML": "HTML",
    "Humidity: low": "湿度：低",
    "Humidity: moderate": "湿度：中",
    "Hydro Station": "水力站",
    "Hydro station offline": "水力站离线",
    "Hydro Upgrades": "水力升级",
    "Ice": "冰",
    "Ice forming in crater floors": "陨坑底部开始结冰",
    "Ideal spray conditions": "理想喷洒条件",
    "Idle · load a rod to start": "空闲 · 装一根钍棒启动",
    "Ignition sequence started. T-10.": "点火程序启动。T-10。",
    "Images saved: MarsGenesis98_Images.zip": "图像已保存：MarsGenesis98_Images.zip",
    "in Construction. If you ever get stuck, you'll find me in the": "在建造面板里。要是卡住了，可以在",
    "in the Crafting Station, dig ore, craft parts and get the": "在工作台里挖矿、造零件，然后让",
    "Increase Battery Storage": "扩大电池储能",
    "Incubate": "培养",
    "Incubator": "培养器",
    "Incubator Tier": "培养器等级",
    "Incubator where you splice seed genomes and grow them in trays. Opens the Biolab tab.": "拼接种子基因组并在托盘里培育的培养器。开启生物实验室页。",
    "Insects": "昆虫",
    "Insects need flower seeds for pollen: grow Poppies, Dandelions or Sunflowers in the Biolab.": "昆虫需要花种来采粉：在生物实验室种罂粟、蒲公英或向日葵。",
    "Install Motor Pump": "安装电机水泵",
    "Install the Auto-Sequencer (needs Gene Library Lv 2) and empty trays will plant this seed on their own.": "装上自动测序仪（需要基因库等级 2），空托盘就会自己种上这种种子。",
    "Intake filters flushed.": "进水滤芯已冲洗。",
    "is full. Upgrade required to support larger lifeforms.": "已满。要支持更大的生物需要升级。",
    "It burns": "它燃烧",
    "it when grown → the Life bar goes up.": "长大后 → 生命条上升。",
    "it. Follow the food chain:": "它。按食物链来：",
    "Items refined": "精炼物品",
    "Its glow spreads out from the dome, over the new soil, through the forests and across the plains, where deer graze and foxes hunt. Rain falls on fields that were red dust a few hundred sols ago.": "它的光芒从穹顶散开，掠过新土壤，穿过森林，越过平原，那里有鹿在",
    "jettisoned nose cone (pivot at the rocket base frame)": "抛离的整流罩（枢轴在火箭底座）",
    "Jump straight into a mini-game with everything set up and": "直接进入配置齐全的小游戏，并",
    "Just the 70 rocks, merged into one object (world positions)": "只有 70 块岩石，合并成一个对象（世界坐标）",
    "Keep cranking. Upgrade Crank Gearing to Lv 2 to unlock motor pumps.": "继续摇。把摇柄齿轮升到等级 2 可解锁电机水泵。",
    "Keep going!": "继续！",
    "Keep Playing": "继续游戏",
    "Keep terraforming to discover what this is.": "继续改造地形，看看这是什么。",
    "Keep the drill fuelled and powered to raise the pressure.": "保持钻机有燃料和电力，气压才会上升。",
    "Keep the Drill upgraded and venting. As the air thickens, frost will settle across the planet.": "保持钻机升级并持续排放。空气变厚后，霜会覆盖整个行星。",
    "Keep the Heater fuelled with Greenhouse Charges to warm the planet.": "持续用温室装药给加热器加燃料，行星才会变暖。",
    "Keep the Heater fuelled with Greenhouse Charges. It caps at 20% of Stage 5 until you upgrade it to T2.": "持续用温室装药给加热器加燃料。升到 T2 之前，它只能推进到第 5 阶段的 20%。",
    "Keeps mining even while you're in other tabs.": "你在别的页面时它也会继续采矿。",
    "Lake depth: shallow": "湖深：浅",
    "Lakes have formed in Hellas Basin. Build the hand pump to start filling the colony tank.": "希腊平原形成了湖泊。建造手动泵，开始给殖民地的水箱加水。",
    "Large animals": "大型动物",
    "Large Animals": "大型动物",
    "Large animals need birds and 100 L of water each: decode Rabbits, Deer and Foxes.": "大型动物需要先有鸟类，每只还要 100 升水：解码兔子、鹿和狐狸。",
    "Launch": "发射",
    "Launch 1": "1 号发射",
    "Launch 1 · Temperature Station": "1 号发射 · 温度空间站",
    "Launch 1 reward": "第 1 次发射奖励",
    "Launch 2": "2 号发射",
    "Launch 2 · Blossom Station": "2 号发射 · 花神空间站",
    "Launch 2 brought back the incubator designs. Build it to grow seeds for the Seed Spreader.": "2 号发射带回了培养器图纸。建造它，为种子播撒器培育种子。",
    "Launch 2 fuel water": "2 号发射燃料用水",
    "Launch 2 needs 600 L of water: expand the water tank in Hydro.": "2 号发射需要 600 升水：在水力页扩容水箱。",
    "Launch 2 unlocked · Uranium Ore": "第 2 次发射已解锁 · 铀矿",
    "Launch Complex under survey": "发射场勘察中",
    "Launch cost:": "发射消耗：",
    "Launch in flight": "火箭升空",
    "Launch Pad blueprint": "发射台蓝图",
    "Launch Pad Built": "发射台已建成",
    "Launch Pad complete.": "发射台完工。",
    "Launch Pad with gantry and rocket": "带塔架和火箭的发射台",
    "Layout": "布局",
    "Layout: Big resource list": "布局：大号资源列表",
    "Layout: Classic panels": "布局：经典面板",
    "Let's go!": "出发！",
    "Lets you craft materials automatically, even while you're in other tabs.": "能自动制造材料，即使你在别的页面。",
    "Life phase machine (Stage 10). Grows decoded genomes into animals and releases them into the wild.": "生命阶段机器（第 10 阶段）。把解码的基因组培养成动物并放归野外。",
    "Life Support": "生命维持",
    "Life Upgrades": "生命升级",
    "Load a decoded genome to grow an animal, then": "装入一份已解码基因组培养动物，然后",
    "Load Charge": "装填装药",
    "Load Flower seeds first: Poppy, Dandelion or Sunflower.": "先装花卉种子：罂粟、蒲公英或向日葵。",
    "Load Greenhouse Charges into the Heater (Terraform tab).": "把温室装药装进加热器（地形改造页）。",
    "Load Hopper +5": "装料斗 +5",
    "Load Rod": "装填钍棒",
    "Locked items: hide": "未解锁物品：隐藏",
    "Locked items: show as ???": "未解锁物品：显示为 ???",
    "Locked mount": "未解锁支架",
    "LOG 01 · Docking": "日志 01 · 对接",
    "LOG 01 · Rendezvous": "日志 01 · 会合",
    "LOG 02 · Cargo": "日志 02 · 货物",
    "LOG 02 · The helper": "日志 02 · 帮手",
    "LOG 03 · The Seed": "日志 03 · 种子",
    "LOG 04 · The vault": "日志 04 · 库房",
    "LOG 05 · Door by door": "日志 05 · 一道道门",
    "LOG 06 · Homeward": "日志 06 · 归途",
    "Lv 3 · 3 slots": "等级 3 · 3 槽位",
    "Lv 3: no pressure limit. The drill can thicken the air all the way.": "等级 3：没有气压上限。钻机可以把大气加厚到底。",
    "Lv 5 · craft Max at once": "等级 5 · 一次制造「最大」",
    "Make room for more solar panels.": "腾出空间放更多太阳能板。",
    "make the Red Planet livable": "让红色行星适宜居住",
    "Makes the public web build of": "制作公开发布的网页版",
    "Manual mining / crafting": "手动采矿 / 制造",
    "Manual yield": "手动产量",
    "Mars ground (130×130) + all 70 rocks merged into one object": "火星地面（130×130）+ 70 块岩石合并为一个对象",
    "Mars is alive.": "火星活了。",
    "Mars is still frozen. The Water Pump blueprint unlocks when liquid water forms (Stage 6 reward).": "火星仍然冰封。液态水形成后才会解锁水泵蓝图（第 6 阶段奖励）。",
    "MarsInc98_itch.zip": "MarsInc98_itch.zip",
    "Meltwater beneath the caps": "冰盖下的融水",
    "Meltwater Flow": "融水流",
    "Meltwater: rising": "融水：上升",
    "Memorise the gene sequence!": "记住基因序列！",
    "Mine Iron Ore and craft Iron Plates. The Terraform Drill needs 30 Iron Ore + 12 Iron Plates.": "挖铁矿并制造铁板。改造钻机需要 30 铁矿 + 12 铁板。",
    "Mine Sulfur + Copper Ore, craft Copper Wire, then Greenhouse Charges to fuel the Heater.": "挖硫矿和铜矿，造铜线，再造温室装药给加热器用。",
    "Mine Thorium Ore and craft Thorium Rods to fuel the drill.": "挖钍矿并制造钍棒给钻机当燃料。",
    "Mine Uranium Ore and craft Uranium Cells to power the Genome Decoder.": "挖铀矿并制造铀电池给基因解码器供电。",
    "Mini-Game Playground…": "小游戏试验场…",
    "Mini-game:": "小游戏：",
    "Mining Drone": "采矿无人机",
    "Mining drones": "采矿无人机",
    "Mining Rig Built": "采矿钻机已建成",
    "Mining Rig constructed. Mine tab unlocked.": "采矿钻机已建造。矿井页已解锁。",
    "Mining uses less power.": "采矿更省电。",
    "MISSION COMPLETE": "任务完成",
    "Mission complete. Mars is alive. Platinum (asteroid capture) unlocked as a post-game ore.": "任务完成。火星活了。铂矿（小行星捕获）作为通关后矿石解锁。",
    "Moisture": "湿度",
    "Morale": "士气",
    "Motor pump filters": "电机水泵滤芯",
    "Nature Reserve · live 3D (drag to rotate)": "自然保护区 · 实时 3D（拖动旋转）",
    "Need": "需求",
    "Needs 100 L of water": "需要 100 升水",
    "Needs 2 flower seeds (any flower). Grow Poppies, Dandelions or Sunflowers in the Biolab": "需要 2 颗花卉种子（任意花）。在生物实验室种罂粟、蒲公英或向日葵",
    "Needs Auto-Sequencer": "需要自动测序仪",
    "Needs Crank Gearing Lv 2": "需要摇柄齿轮等级 2",
    "Needs Decoder Memory Lv 2": "需要解码器记忆容量等级 2",
    "Needs Gene Library Lv 1": "需要基因库等级 1",
    "Needs Gene Library Lv 2": "需要基因库等级 2",
    "Needs Harvest Drone": "需要采集无人机",
    "Needs the Auto-Decoder": "需要自动解码器",
    "New ore available: Sulfur Ore.": "新矿石可用：硫矿。",
    "New ore available: Thorium Ore.": "新矿石可用：钍矿。",
    "New ores, new upgrades and a lot more": "新矿石、新升级，还有更多",
    "Next >": "下一个 >",
    "Next goal: build the": "下一个目标：建造",
    "next to an animal in the list below. It costs Uranium Cells (shown on the button).": "在下表里动物旁边的按钮。它消耗铀电池（数量显示在按钮上）。",
    "no Debug menu, no Dev Kit, no Mini-Game Playground, no Save/Load and no saving": "没有调试菜单、没有开发套件、没有小游戏试验场、没有存档读档，也不会保存",
    "No drones yet": "还没有无人机",
    "No launch is running. Begin pre-flight in the Launch Pad tab first.": "当前没有发射任务。请先在发射台页开始起飞前检查。",
    "No motor pumps yet": "还没有电机水泵",
    "No power": "无电力",
    "No saved game found.": "没有找到存档。",
    "No thanks": "不用了",
    "nose section with docking ring": "带对接环的头部段",
    "NOT BUILT": "未建造",
    "Not enough power to mine.": "电力不足，无法采矿。",
    "Notes": "备注",
    "Now needs:": "现在需要：",
    "Nursery Drone": "培育无人机",
    "On it!": "马上办！",
    "On itch.io:": "在 itch.io 上：",
    "One more slot and a higher stock limit.": "多一个槽位，库存上限更高。",
    "One solar panel on its post": "支架上的单块太阳能板",
    "Open Hydro and drag the crank handle clockwise to pump water.": "打开水力页，顺时针拖动摇柄把水抽上来。",
    "Open Mine": "打开矿井",
    "Open the Launch Pad tab and fly Launch 1 to the Temperature Station.": "打开发射台页，把 1 号火箭飞往温度空间站。",
    "Open the Launch tab and fly the rocket up to the supply ship.": "打开发射页，把火箭飞到补给船。",
    "Open-pit Mining Rig (bucket wheel, conveyor, silo)": "露天采矿钻机（斗轮、传送带、料仓）",
    "Opens in Blender (File > Import > glTF 2.0), Unity (glTFast), Unreal (Interchange), Godot (drag in).": "可在 Blender（文件 > 导入 > glTF 2.0）、Unity（glTFast）、Unreal（Interchange）、Godot（直接拖入）中打开。",
    "Ore extracted": "已采矿石",
    "Out of seeds: splice and grow more in the Biolab (Lichen → Moss → Grass → Flowers → Trees).": "种子用完了：在生物实验室拼接培育更多（地衣 → 苔藓 → 草 → 花卉 → 树木）。",
    "Oxygen phase machine (Stage 9). Spreads flower seeds, then tree seeds, with water. Plants breathe out O₂.": "氧气阶段机器（第 9 阶段）。用水播撒花种，然后是树种子。植物会呼出氧气。",
    "Packing images…": "正在打包图像…",
    "Pale bark, fast-growing groves.": "浅色树皮、生长迅速的林子。",
    "Parts for the next machine": "下一台机器的零件",
    "Pick a recipe": "选择配方",
    "Pick a seed on an empty tray. A gene sequence flashes up: memorise it, then copy it with the base buttons. Get one wrong and it starts again.": "在空托盘上选一颗种子。基因序列会闪现：记住它，再用碱基按钮复现。完成",
    "Pick an animal in the Food Chain and press": "在食物链里选一种动物，然后按",
    "Planet Heating": "行星加热",
    "Plant cost": "种植消耗",
    "Plant seeds in incubator trays, wait for them to ripen, then harvest 3 seeds per tray.": "在培养托盘里种下种子，等它们成熟，每盘可收 3 颗种子。",
    "Playground is never saved. Exit to return to your colony.": "试验场不会保存。退出即可回到殖民地。",
    "Plaza, ring road, spokes, building pads and lamps": "广场、环路、支路、建筑基座和路灯",
    "Polar caps retreating": "极冠退缩",
    "Pollen count: high": "花粉浓度：高",
    "Post-game · Asteroid capture": "通关后 · 小行星捕获",
    "Post-game: Platinum Ore (asteroid capture) unlocked.": "通关后：铂矿（小行星捕获）已解锁。",
    "Power output low in base grid.": "基地电网输出偏低。",
    "Power per dig": "每次挖掘耗电",
    "Pre-Flight Checklist": "起飞前检查清单",
    "pre-flight checks": "起飞前检查",
    "Press ON to resume": "按「开启」继续",
    "Press the": "按下",
    "press the same letters in order": "按顺序按下相同的字母",
    "Press the same letters, left to right": "从左到右按下相同的字母",
    "Pressure has passed 300 mbar. Frost now coats the highlands, and Mars glitters white at dawn.": "气压已超过 300 毫巴。霜现在覆盖高地，黎明时火星泛着白光。",
    "Pressure limit reached: upgrade the drill": "已达气压上限：升级钻机",
    "Pressure phase machine. Burns Thorium Rods to vent CO₂ from the crust and thicken the air.": "气压阶段机器。燃烧钍棒，从地壳排出二氧化碳，加厚大气。",
    "Pressure venting": "气压排放",
    "PROGRAM COMPLETE": "程序完成",
    "Pump filters clogged. Flush them in Hydro.": "水泵滤芯堵了。在水力页冲洗。",
    "Pump Station": "泵站",
    "Qty sizes": "数量档位",
    "Quick red flower. Needs Grass seeds.": "早开的红花。需要草籽。",
    "Rain": "雨",
    "Rain chance: high": "降雨概率：高",
    "Rain Showers": "阵雨",
    "Rare Ore Drill Bit": "稀有矿石钻头",
    "Rate": "速率",
    "Red dust is turning to dark brown soil around the base. Microbes are taking hold.": "基地周围的红色尘土正在变成深褐色土壤。微生物开始扎根。",
    "Release switch not found in the source.": "源码里找不到 RELEASE 开关。",
    "Released into the wild": "已放归野外",
    "Replay tour": "重看导览",
    "Requires Terraform Drill": "需要改造钻机",
    "Requires the Water Pump": "需要水泵",
    "Return the": "带回",
    "Return the Seed of Life in the Terraform tab to finish the game.": "在地形改造页带回生命之种即可通关。",
    "Reusable pad for both space launches. Opens the Launch Pad tab.": "两次太空发射都能复用的发射台。开启发射台页。",
    "Rocket fuelled and stocked. Run the pre-flight checks.": "火箭已加注并装载完毕。执行起飞前检查。",
    "Rod hopper": "钍棒料斗",
    "Rod slots": "钍棒槽位",
    "Save cancelled.": "保存已取消。",
    "Save failed: browser storage unavailable.": "保存失败：浏览器存储不可用。",
    "Save loaded.": "存档已载入。",
    "Save the game's art so you can rebuild it in your own engine. Everything saves as a": "把游戏美术导出来，方便你在自己的引擎里重建。全部打包成",
    "Saved MarsInc98_itch.zip. Upload it to itch.io as an HTML game.": "已保存 MarsInc98_itch.zip。把它作为 HTML 游戏上传到 itch.io。",
    "Seed": "种子",
    "Seed Conveyor": "种子传送带",
    "Seed hopper": "种子料斗",
    "Seed of Life (launch key)": "生命之种（发射钥匙）",
    "Seed Spreader + Seed Synthesizer blueprints · flower and tree genomes · 10 Lichen + 5 Poppy seeds": "种子播撒器 + 种子合成器蓝图 · 花卉与树木基因组 · 10 颗地衣 + 5 颗罂粟种子",
    "Seed Spreader assembled in the greenbelt.": "种子播撒器已在绿化带组装完成。",
    "Seed Spreader Built": "种子播撒器已建成",
    "Seed Spreader Control": "种子播撒器控制",
    "Seed Spreader Field · live 3D (drag to rotate)": "种子播撒区 · 实时 3D（拖动旋转）",
    "Seed Spreader hopper empty: press Load Hopper in the Terraform tab.": "种子播撒器料斗空了：在地形改造页按「装料斗」。",
    "Seed Spreader running.": "种子播撒器运行中。",
    "Seed Spreader stopped.": "种子播撒器已停止。",
    "Seed Spreader Tier": "种子播撒器等级",
    "Seed Spreader Upgrades": "种子播撒器升级",
    "Seed Spreading": "种子播撒",
    "Seed Stock": "种子库存",
    "Seed Synthesizer": "种子合成器",
    "Seed Synthesizer Built": "种子合成器已建成",
    "Seed Synthesizer greenhouse (Biolab)": "种子合成器温室（生物实验室）",
    "Seed Synthesizer online. Biolab tab open.": "种子合成器已上线。生物实验室页已打开。",
    "Seed trays": "培养托盘",
    "Seed Vault": "种子库",
    "Seeds blow far on the wind.": "种子随风飘得很远。",
    "Self-Cleaning Filters": "自清洁滤芯",
    "Sequence Compressor": "序列压缩器",
    "Set all drones to:": "全部无人机设为：",
    "Skip tour": "跳过导览",
    "Sky": "天空",
    "Slots:": "槽位：",
    "Slow, sturdy broadleaf.": "生长缓慢、结实的阔叶树。",
    "Soil is spreading. Click dry red ground around the tower to spot-spray it.": "土壤正在蔓延。点击塔周围干燥的红色地面定点喷洒。",
    "Soil phase machine (Stages 7–8). Needs no power, only water: 8 L/s at full speed (2 pumps).": "土壤阶段机器（第 7–8 阶段）。不用电，只用水：全速 8 升/秒（2 台泵）。",
    "Soil Spraying": "土壤喷洒",
    "Solar Array & Power": "太阳能阵列与电力",
    "Solar panels / RTGs": "太阳能板 / 同位素电源",
    "Sols elapsed": "已过火星日",
    "Source / use": "来源 / 用途",
    "Space Launch": "太空发射",
    "space rocket part": "太空火箭部件",
    "Speeds up terraforming and lets the drill dig deeper, so the air keeps getting thicker.": "加快地形改造，也能让钻机挖得更深，空气会持续变厚。",
    "Splice wasted: missing water or minerals.": "拼接失败：缺水或缺少矿物。",
    "Spray Output": "喷洒输出",
    "Spread flowers first": "先播撒花卉",
    "Spread flowers to turn the sky blue. Halfway, the Spreader needs Tree seeds.": "播撒花卉让天空变蓝。进行到一半时，播撒器会需要树种子。",
    "Spread trees to bring clouds and rain. Rain refills your water tank.": "播撒树木带来云和雨。雨水会给水箱补水。",
    "Stage 1 start: thick dust fog": "第 1 阶段开始：浓密的尘雾",
    "Stage 1. Drill built with 12 Thorium Rods: load a rod and watch the 3D rig start up and run.": "第 1 阶段。钻机已用 12 根钍棒建好：装一根钍棒，看 3D 钻机启动运行。",
    "Stage 10 Complete": "第 10 阶段完成",
    "STAGE 10 COMPLETE: A Living Planet.": "第 10 阶段完成：活着的行星。",
    "Stage 10. Decoder and Incubator built with Uranium Cells and flower seeds: decode insects in the Biolab, then incubate and release them here. Try the T2/T3 upgrades.": "第 10 阶段。解码器和培养器已用铀电池与花种建好：在生物实验室解码昆虫，然后",
    "Stage 2: dust storm raging": "第 2 阶段：沙尘暴肆虐",
    "Stage 3 reward": "第 3 阶段奖励",
    "Stage 4. Launch Pad built and cargo ready: run the pre-flight checklist, press IGNITION and watch the 3D launch into space.": "第 4 阶段。发射台已建好、货物就绪：跑完起飞前检查，按下点火，看 3D 发射",
    "Stage 4. Load Greenhouse Charges and run the Heater. Try the upgrades and the Auto-Loader.": "第 4 阶段。装上温室装药并启动加热器。试试升级和自动装料器。",
    "Stage 7. BioSpray Tower with 800 L of water. Click dry red ground around the tower to spot-spray it.": "第 7 阶段。生物喷洒塔配 800 升水。点击塔周围干燥的红色地面定点喷洒。",
    "Stage 7. Empty tank, no motor pumps: crank the handle to fill it. Upgrade Crank Gearing to Lv 2 for motor pumps.": "第 7 阶段。水箱空、没有电机水泵：摇动手柄把它灌满。把摇柄齿轮升到等级 2 就能用电机水泵",
    "Stage 9. Empty trays, no automation: splice the seed chain Lichen → Moss → Grass → Flowers → Trees, water the trays, harvest.": "第 9 阶段。托盘空、没有自动化：拼接种子链 地衣 → 苔藓 → 草 → 花卉 → 树木，给",
    "Stage 9. Seed Spreader with flower and tree seeds: spread flowers until the sky turns blue, then switch to trees.": "第 9 阶段。种子播撒器带上花卉和树种子：播撒花卉直到天空变蓝，然后换成树",
    "Stage completed.": "阶段完成。",
    "Stalled · hopper empty": "停滞 · 料斗空",
    "Stalled · no fuel": "停滞 · 无燃料",
    "Stalled · no water": "停滞 · 无水",
    "Stalled · sky is blue, load Tree seeds": "停滞 · 天空已蓝，装入树木种子",
    "Stalled · tank empty": "停滞 · 水箱空",
    "Stalled · trees need flowers first": "停滞 · 树木需要先有花卉",
    "Start Heater": "启动加热器",
    "Start it in the Terraform tab.": "在地形改造页启动它。",
    "Start it in the Terraform tab. Click dry red ground around the tower to spot-spray it.them yourself (15 L each).": "在地形改造页启动它。点击塔周围干燥的红色地面定点喷洒，也可以自己动手（每次 15 升）",
    "Start Pumps": "启动水泵",
    "Start small: build the": "从小做起：先造出",
    "Start Spreader": "启动播撒器",
    "Start the Heater in the Terraform tab.": "在地形改造页启动加热器。",
    "Start Tower": "启动喷塔",
    "Stay here": "留在这里",
    "Stock limit": "库存上限",
    "Stock limit reached": "已达库存上限",
    "Store more energy.": "储存更多能量。",
    "Storm strength:": "风暴强度：",
    "Storms": "风暴",
    "Structures": "建筑",
    "Sulfur unlocks after Launch 1": "硫矿在第 1 次发射后解锁",
    "Supply Ship": "补给船",
    "Surface frosting across all sectors": "各区域地表结霜",
    "T3 · none (can finish the phase)": "T3 · 无（可完成该阶段）",
    "T3 chamber: 3 slots, all lifeforms. No cap: it can finish the Life phase.": "T3 舱：3 个槽位，所有生物。无上限：可以完成生命阶段。",
    "tab is now open.": "页已打开。",
    "tab. Genomes in stock:": "页。基因组库存：",
    "Takes root in moss beds. Needs Moss seeds.": "在苔藓床上扎根。需要苔藓种子。",
    "Tank full": "水箱已满",
    "TANK FULL: use water or expand the tank": "水箱已满：用水或扩容",
    "Temperature phase machine (Stages 4–6). Burns Greenhouse Charges to warm the planet. Heat Cores boost its output.": "温度阶段机器（第 4–6 阶段）。燃烧温室装药给行星加温。热芯能提升它的输出",
    "Temperature Station": "温度空间站",
    "Terraform · Terraform Drill": "地形改造 · 改造钻机",
    "Terraform Drill Built": "改造钻机已建成",
    "Terraform Drill constructed at Site T-1.": "改造钻机已在 T-1 位点建成。",
    "Terraform Drill Lv 3": "改造钻机 等级 3",
    "Terraform Drill walker rig (whole, augers raised)": "改造钻机行走架（整体，螺旋钻抬起）",
    "Terraform Drill: carriage plate without augers (moves up/down)": "改造钻机：不带螺旋钻的滑板（上下移动）",
    "Terraform Drill: legs + top machine only (static)": "改造钻机：只有支腿和顶部机器（静态）",
    "Thank you for playing the": "感谢游玩",
    "Thanks for playing Mars Inc 98!": "感谢游玩《火星公司 98》！",
    "Thanks, Sprocket!": "谢谢，斯普罗凯特！",
    "that work on their own.": "能自己运转的",
    "Thaw Warning": "解冻警告",
    "The BioSpray Tower needs no power, only water: 8 L/s for full speed.": "生物喷洒塔不用电，只用水：全速时 8 升/秒。",
    "The colony's main building, where everything is crafted. Upgrade it to unlock bigger Qty sizes.": "殖民地的主建筑，所有东西都在这里制造。升级它可解锁更大的数量档位。",
    "The crates of parts are moved across and strapped down. Time to head home.": "一箱箱零件搬过来绑好。该回家了。",
    "The dust storms have dissipated. Clear skies over the colony.": "沙尘暴消散了。殖民地上空一片晴空。",
    "The export has": "导出已",
    "The first lake has formed in Hellas Basin. Water stays liquid on the surface of Mars.": "希腊平原形成了第一片湖。水在火星表面保持液态。",
    "The fog has lifted, revealing a planet-wide dust storm.": "尘雾散去，露出覆盖整个行星的沙尘暴。",
    "the genome → an embryo grows in an Incubator slot.": "基因组 → 胚胎会在培养器槽里生长。",
    "The hand pump is in.": "手动泵已装好。",
    "The Heater burns": "加热器燃烧",
    "The Heater is ready.": "加热器已就绪。",
    "The Hydro tab is open.": "水力页已打开。",
    "The Launch Pad blueprint unlocks when the planet frosts over (Stage 3 reward).": "行星结霜后解锁发射台蓝图（第 3 阶段奖励）。",
    "The Launch Pad is ready.": "发射台已就绪。",
    "The polar caps are shrinking. Meltwater trickles beneath the ice sheets.": "极冠正在缩小。融水在冰盖下细细流淌。",
    "The rocket is back with the parts from the supply ship.": "火箭带着补给船的零件回来了。",
    "The rocket is home with the parts. The next steps continue in the full game.": "火箭带着零件回家了。后续内容在完整版中继续。",
    "The rocket latched onto the supply ship, loaded Earth's crates and flew the parts safely back to the colony.": "火箭锁住补给船，装上地球来的货箱，把零件安全运回殖民地。",
    "The Seed of Life": "生命之种",
    "The Seed of Life comes home.": "生命之种回家了。",
    "The Seed of Life has been returned. Mars is alive.": "生命之种已带回。火星活了。",
    "The Seed Spreader uses": "种子播撒器使用",
    "The Seed Synthesizer blueprint is stored on Blossom Station. Fly Launch 2 to bring it home.": "种子合成器蓝图存放在花神空间站。执行 2 号发射把它带回来。",
    "The sky is blue: now splice Oak, Aspen or Pine seeds in the Biolab.": "天空已变蓝：现在在生物实验室拼接橡树、白杨或松树种子。",
    "The sky is blue! Switch the Seed Spreader to Tree seeds.": "天空变蓝了！把种子播撒器换成树木种子。",
    "The supply ship from Earth is waiting in orbit, right where they said. Our rocket pulls alongside and docks.": "来自地球的补给船就在轨道上，和他们说的一样。我们的火箭靠上去对接。",
    "The Temperature Station drifts in high orbit, silent for decades. The docking clamps still answer our signal.": "温度空间站在高轨道漂着，静默了几十年。对接夹钳仍然回应我们的信号。",
    "The thick dust fog around Mars is thinning. From orbit, the surface is visible for the first time in weeks.": "火星周围的浓雾正在变薄。几周来第一次能从轨道看见地表。",
    "The thicker air is holding the dust down. The last great storm has blown itself out.": "变厚的大气压住了沙尘。最后一场大风暴自己吹完了。",
    "The tower is thirsty: crank the hand pump in Hydro! Crank Gearing Lv 2 unlocks motor pumps.": "喷塔缺水：去水力页摇泵！摇柄齿轮等级 2 解锁电机水泵。",
    "Thermal Output": "热输出",
    "Thermal Plant · live 3D view (drag to rotate)": "热能站 · 实时 3D 视图（拖动旋转）",
    "Those parts will power the next machine and the next big step in bringing Mars to life.": "这些零件会驱动下一台机器，也是让火星活起来的下一步。",
    "to Blossom Station. You need the": "前往花神空间站。你需要",
    "to bring clouds and rain.": "带来云和雨。",
    "to build and upgrade": "用于建造和升级",
    "to recharge faster, and": "充电更快，以及",
    "to the abandoned Temperature Station. It returns with the Heater blueprint, Heat Cores and the Seed of Life.": "前往废弃的温度空间站。它会带回加热器蓝图、热芯和生命之种。",
    "to turn Mars from red to green": "把火星从红变绿",
    "Total extracted": "总开采量",
    "Tour with Sprocket": "和斯普罗凯特一起导览",
    "Tower tier": "喷塔等级",
    "Tree seeds": "树木种子",
    "Turn demo mode OFF": "关闭演示模式",
    "Turn demo mode ON": "开启演示模式",
    "Unbuilt plot: cones and sign": "未建造地块：锥桶和标牌",
    "Uncommon Ore Drill Bit": "少见矿石钻头",
    "Unknown blueprint": "未知蓝图",
    "Unlocks with your first Rare ore (Titanium, Stage 8)": "首次获得稀有矿石（钛矿，第 8 阶段）后解锁",
    "Unlocks with your first Uncommon ore (Thorium)": "首次获得少见矿石（钍矿）后解锁",
    "Upgrade it": "升级它",
    "upgrade the battery": "升级电池",
    "Upgrade the BioSpray Tower to T3 and add pumps. Algae will start to spread.": "把生物喷洒塔升到 T3 并加装水泵。藻类就会开始蔓延。",
    "Upgrade the Drill and keep venting. Dust storms will fade as pressure rises.": "升级钻机并持续排放。气压升高后沙尘暴会减弱。",
    "Upgrade the Heater to T3 and push the planet above -10 °C for liquid water.": "把加热器升到 T3，让行星升到 -10 °C 以上才有液态水。",
    "Uranium · Stage 9": "铀 · 第 9 阶段",
    "Uranium Cells": "铀电池",
    "Use": "使用",
    "UV index: falling": "紫外线指数：下降",
    "Vent Output": "排放输出",
    "Vent rate": "排放速率",
    "Waiting for energy": "等待能量",
    "War, famine and rising seas have pushed it past saving, and there is no time left to fix it.": "战争、饥荒和海平面上升已让它无可挽回，也没时间再补救了。",
    "Warm the planet, bring back water and grow plants": "给行星加温、带回水、种出植物",
    "Water comes from the hand pump for now. Upgrade Crank Gearing to Lv 2 to unlock motor pumps (automation).": "目前的水来自手动泵。把摇柄齿轮升到等级 2 可解锁电机水泵（自动化）。",
    "Water feed": "进水",
    "Water Pump + BioSpray Tower blueprints · Aluminum Ore": "水泵 + 生物喷洒塔蓝图 · 铝矿",
    "Water Pump Built": "水泵已建成",
    "Water Pump house, crank wheel, water tower, pipe": "水泵房、摇轮、水塔、管道",
    "Water Supply": "供水",
    "We load the synthesizer cores, the Seed Spreader designs and the flower and tree genomes. The helper robot stays behind to tend the vault.": "我们装上合成器核心、种子播撒器图纸，以及花卉和树木基因组。助手机器人留了下",
    "Wildlife active in all sectors": "各区域野生动物活跃",
    "Wind: calm": "风：无",
    "Yield": "产量",
    "You are an android, sent ahead to Mars with one job:": "你是一个先行被派往火星的仿生人，只有一个任务：",
    "You built the": "你建起了",
    "You will need it for both space launches.": "两次太空发射都需要它。",
  });
  RULES.push(
    [/^Tray (.+?) · (.+?)$/, (m) => "托盘 " + m[1] + " · " + m[2]],
    [/^· (.+?) slot(.+?) · stock limit$/, (m) => "· " + m[1] + " 槽位" + m[2] + " · 库存上限"],
    [/^· 1 item every (.+?) s per slot$/, (m) => "· 每个槽位每 " + m[1] + " 秒产出 1 件"],
    [/^\(craft from Sulfur Ore \+ Copper Wire\)\. Each charge adds (.+?) fuel\. Keep the tank topped up and the planet warms\.$/, (m) => "（用硫矿 + 铜线制造）。每份装药增加 " + m[1] + " 燃料。保持燃料充足，行星就会变暖。"],
    [/^\+(.+?) ore\/s$/, (m) => "+" + m[1] + " 矿石/秒"],
    [/^Back to the active machine: (.+?)$/, (m) => "返回当前机器：" + m[1]],
    [/^Blueprint · (.+?)$/, (m) => "蓝图 · " + m[1]],
    [/^Costs (.+?) Uranium Cell(.+?)$/, (m) => "消耗 " + m[1] + " 铀电池" + m[2]],
    [/^Decoding: (.+?)$/, (m) => "解码中：" + m[1]],
    [/^Drone (.+?): (.+?)\. Click to switch ore\.$/, (m) => "无人机 " + m[1] + "：" + m[2] + "。点击可切换矿石。"],
    [/^Errors: (.+?) · costs (.+?) on success$/, (m) => "错误：" + m[1] + " · 成功消耗 " + m[2]],
    [/^In Flight · (.+?)$/, (m) => "飞行中 · " + m[1]],
    [/^Incubate(.+?)$/, (m) => "培养" + m[1]],
    [/^Lv (.+?)$/, (m) => "等级 " + m[1]],
    [/^Motor pumps ×(.+?)$/, (m) => "电机水泵 ×" + m[1]],
    [/^Needs Incubator (.+?) · grows in (.+?) s · \+(.+?)% Life \(first of a species \+(.+?)%\)(.+?)$/, (m) => "需要培养器 " + m[1] + " · " + m[2] + " 秒长成 · 生命 +" + m[3] + "%（该物种首次 +" + m[4] + "%）" + m[5]],
    [/^Pressure (.+?) mbar · (.+?) °C · O₂ (.+?)% · (.+?) animal species\.$/, (m) => "气压 " + m[1] + " 毫巴 · " + m[2] + " °C · 氧气 " + m[3] + "% · 动物 " + m[4] + " 种。"],
    [/^RTG generators ×(.+?)$/, (m) => "放射性同位素电源 ×" + m[1]],
    [/^Slot (.+?) · empty$/, (m) => "槽位 " + m[1] + " · 空"],
    [/^Slot (.+?) · needs (.+?)$/, (m) => "槽位 " + m[1] + " · 需要 " + m[2]],
    [/^Slot (.+?) recipe$/, (m) => "槽位 " + m[1] + " 配方"],
    [/^Stage (.+?): (.+?)$/, (m) => "阶段 " + m[1] + "：" + m[2]],
    [/^STAGE (.+?)\/10 · (.+?)$/, (m) => "阶段 " + m[1] + "/10 · " + m[2]],
    [/^tab is now open\. (.+?)$/, (m) => "页已打开。" + m[1]],
    [/^The (.+?) finished the (.+?) phase \((.+?)\) and now stands on standby\. You can still look around it\.$/, (m) => m[1] + " 已完成 " + m[2] + " 阶段（" + m[3] + "），现在待命。你仍然可以绕着看。"],
    [/^The (.+?) finished the first three stages and now stands on standby\.$/, (m) => m[1] + " 完成了前三个阶段，现在待命。"],
    [/^Tray (.+?)$/, (m) => "托盘 " + m[1]],
    [/^Upgrade to (.+?): (.+?)$/, (m) => "升级到 " + m[1] + "：" + m[2]],
  );

  /* ---------- 第四轮：实机扫描补漏 ---------- */
  Object.assign(DICT, {
    "Sure!": "没问题！",
    "The Mine tab is now open.": "矿井页已经打开。",
    "Next goal: build the Terraform Drill.": "下一个目标：建造改造钻机。",
    "You built the Terraform Drill. You can now begin terraforming the planet.": "你建起了改造钻机，现在可以开始改造这颗行星了。",
    "The Heater is ready. Start it in the Terraform tab.": "加热器已就绪。在地形改造页启动它。",
    "The hand pump is in. The Hydro tab is open.": "手动泵已装好。水力页已打开。",
    "The Hydro tab is now open.": "水力页已经打开。",
    "Unlocked:": "已解锁：",
    "Return the Seed of Life from the Terraform tab to finish the mission.": "在地形改造页带回生命之种即可完成任务。",
    "Thanks for playing Mars Inc 98!": "感谢游玩《火星公司 98》！",
    "Start a new colony? Your current progress will be erased.": "要新建殖民地吗？当前进度将被清空。",
    "7 more stages to turn Mars from red to green": "还有 7 个阶段，把火星从红变绿",
    "7 new machines to build and upgrade": "7 台新机器等你建造与升级",
    "Breed life and release it into the wild": "繁育生命并放归野外",

    "Build Terraform Drill": "建造改造钻机",
    "Build Solar Panel": "建造太阳能板",
    "Build the Terraform Drill first": "先建造改造钻机",
    "Build the Heater first": "先建造加热器",
    "Build the BioSpray Tower first": "先建造生物喷洒塔",
    "Build the Embryo Incubator first": "先建造胚胎培养器",
    "Build the Genome Decoder first": "先建造基因解码器",
    "Build the Seed Spreader first": "先建造种子播撒器",
    "Build the Genome Decoder and the Embryo Incubator (Terraform tab).": "建造基因解码器和胚胎培养器（地形改造页）。",
    "Build the Seed Synthesizer and the Seed Spreader.": "建造种子合成器和种子播撒器。",
    "Build the Genome Decoder and the Embryo Incubator, then bring animals to Mars: insects first, then birds, then large animals.": "建造基因解码器和胚胎培养器，然后把动物带上火星：先昆虫，再鸟类，最后是大型动物。",
    "Build all unlocked blueprints": "建造所有已解锁蓝图",
    "Build more panels": "多造几块板",
    "Build the Launch Pad and fly Launch 1 to the abandoned Temperature Station to bring back the Heater.": "建造发射台，把 1 号火箭飞往废弃的温度空间站，把加热器带回来。",
    "Build a Water Pump on the lake, then the BioSpray Tower to start building soil.": "在湖上建造水泵，然后造生物喷洒塔开始形成土壤。",

    "Build the Launch Pad (Stage 3 reward) in Construction.": "在建造面板里建发射台（第 3 阶段奖励）。",
    "Build the Heater with a Heat Core from Launch 1.": "用 1 号发射带回的热芯建造加热器。",
    "Build the Water Pump (needs Copper Wire). Then the BioSpray Tower (Aluminum Frames).": "建造水泵（需要铜线），然后是生物喷洒塔（需要铝框架）。",
    "Build the BioSpray Tower (needs Aluminum Frames).": "建造生物喷洒塔（需要铝框架）。",
    "Clear &amp; Cold": "晴朗寒冷",
    "Mild &amp; Rainy": "温和多雨",
    "2 · Trees → clouds &amp; rain": "2 · 树木 → 云与雨",
    "Food chain: insects eat flower seeds (🌸 = 2 seeds of any flower, grown in the Biolab), birds need insects released first, large animals need birds and water.":
      "食物链：昆虫吃花种（🌸 = 任意花卉 2 颗，在生物实验室培育），鸟类需要先放生昆虫，大型动物则需要鸟类和水。",
    "Hi! I'm": "你好，我是",
    ", your colony assistant. I'm here to help you terraform Mars. Want a quick tour?": "，你的殖民地助手。我来帮你改造火星，要不要先快速导览一遍？",
    "Want a quick tour?": "要不要先快速导览一遍？",
    "Quick tour": "快速导览",
    "No thanks, just start": "不用了，直接开始",
    "Save": "保存", "Pump": "水泵", "Spraying": "喷洒中", "Splicer": "拼接器",
    "Spreading": "播撒中", "solar-backed": "太阳能供电", "per action": "每次操作",
    "running.": "运转起来。", "Ctrl+S": "Ctrl+S",
    "Full game preview: automation": "完整游戏预览：自动化",
    "Fog Clearance complete.": "清除尘雾已完成。",
    "Stage 1 Complete": "第 1 阶段完成",
    "+500 of every resource": "每种资源 +500",
    "all unlocked blueprints": "所有已解锁蓝图",
    "mounts": "支架", "Level": "等级", "VISIBILITY": "能见度",
    "✓ Music": "✓ 音乐", "✓ Sound Effects": "✓ 音效",
    "Dust Storm · Visibility": "沙尘暴 · 能见度",
    "Solar Array · 1/2 mounts · Storm": "太阳能阵列 · 1/2 支架 · 风暴",
  });

  /* 源码里有 4 处 toUpperCase() 拼接（BUILD/MINE/STAGE/EN ROUTE），所以命中要忽略大小写 */
  const LOWER = new Map();
  for (const k in DICT) if (!LOWER.has(k.toLowerCase())) LOWER.set(k.toLowerCase(), DICT[k]);

  const CJK = /[\u2e80-\u9fff\uff00-\uffef]/;
  const SKIP = /^(SCRIPT|STYLE|TEXTAREA|CODE|PRE)$/;
  const ATTRS = ["title", "alt", "aria-label", "placeholder"];

  const hits = new Set();
  const misses = new Map();

  function tr(s, quiet) {
    if (!s || !/[A-Za-z]/.test(s)) return s;
    const key = s.replace(/[\u00a0\u2009\u202f\u200b]/g, " ").trim();
    if (!key || CJK.test(key)) return s;
    /* 统一用"整串替换 + 保留首尾空白"，避免词条是句子片段时把整句替换掉一半 */
    const lead = /^\s*/.exec(s)[0];
    const trail = /\s*$/.exec(s)[0];
    const wrap = (v) => lead + embed(v) + trail;
    if (Object.prototype.hasOwnProperty.call(DICT, key)) { hits.add(key); return wrap(DICT[key]); }
    const lk = LOWER.get(key.toLowerCase());
    if (lk !== undefined) { hits.add(key); return wrap(lk); }
    for (let i = 0; i < RULES.length; i++) {
      const m = key.match(RULES[i][0]);
      if (!m) continue;
      const out = RULES[i][1](m);
      if (out === key) continue;   /* 守卫规则放弃时视为未命中 */
      hits.add(key);
      return wrap(out);
    }
    if (!quiet && key.length > 2) misses.set(key, (misses.get(key) || 0) + 1);
    return s;
  }

  let on = true;
  try { on = !/[?&]lang=en\b/.test(location.search); } catch (e) {}

  function translateAttrs(el) {
    if (!el || el.nodeType !== 1) return;
    for (const a of ATTRS) {
      const v = el.getAttribute && el.getAttribute(a);
      if (v && /[A-Za-z]/.test(v) && !CJK.test(v)) {
        const nv = tr(v);
        if (nv !== v) el.setAttribute(a, nv);
      }
    }
  }

  const INLINE_OK = /^(U|B|I|EM|STRONG|SMALL|SPAN|FONT|BR|SUP|SUB)$/;
  /* 菜单/按钮里 <u>F</u>ile 这种被标签切碎的文案：整块合并后再查表 */
  function collapse(el) {
    if (!el.children || !el.children.length) return false;
    /* 只处理按钮/标签这类"整块就是一个文案"的元素，避免把相邻字段粘在一起 */
    if (!(el.nodeName === "BUTTON" || (el.matches && el.matches(".tab, .tile, .task")))) return false;
    if (CJK.test(el.textContent)) return false;
    for (const c of el.querySelectorAll("*")) if (!INLINE_OK.test(c.nodeName)) return false;
    const tight = el.textContent.trim();
    const spaced = [...el.childNodes].map((n) => (n.nodeType === 3 ? n.nodeValue : " " + n.textContent + " ")).join("").replace(/\s+/g, " ").trim();
    for (const cand of [tight, spaced]) {
      if (!cand || cand.length > 56 || !/[A-Za-z]{2,}/.test(cand)) continue;
      const nv = tr(cand, true);
      if (nv !== cand) { el.textContent = nv; return true; }
    }
    return false;
  }

  function walk(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      const p = node.parentNode;
      if (p && p.nodeName && SKIP.test(p.nodeName)) return;
      const v = node.nodeValue;
      if (!v || !/[A-Za-z]/.test(v) || CJK.test(v)) return;
      ST.nodes++;
      const nv = tr(v);
      if (nv !== v) { ST.changed++; node.nodeValue = nv; }
      return;
    }
    if (node.nodeType !== 1) return;
    if (SKIP.test(node.nodeName)) return;
    if (node.classList && node.classList.contains("spr-txt")) return;
    if ((node.nodeName === "P" || node.nodeName === "LI") && node.closest && node.closest(".dlg-body")) {
      const pk = normText(node);
      const pv = tr(pk, true);
      /* 只在"整段都翻干净"时采纳：贪婪规则可能只译了前半句，
         留下半中半英的整段，那就放弃整段、退回逐节点处理 */
      const stillEnglish = /[A-Za-z]{3,}\s+[A-Za-z]{3,}/.test(pv);
      if (pv !== pk && !stillEnglish) { node.textContent = pv; return; }
    }
    if (node.matches && node.matches(".dlg-body > div")) {
      const key = normText(node);
      const v = HTML_MAP[key];
      if (v) { node.innerHTML = v; node.dataset.zh = "1"; return; }
      if (node.dataset.zh) return;
    }
    translateAttrs(node);
    if (collapse(node)) return;
    for (let c = node.firstChild; c; c = c.nextSibling) walk(c);
  }

  let queued = new Set();
  let pending = false;
  function flush() {
    pending = false;
    const nodes = queued; queued = new Set();
    for (const n of nodes) { try { walk(n); } catch (e) {} }
    try { bubble(); } catch (e) {}
  }
  /* 用微任务而不是 requestAnimationFrame：后台标签页/无头浏览器里 rAF 会被节流甚至不触发 */
  function schedule(n) {
    if (!on || !n) return;
    queued.add(n);
    if (!pending) { pending = true; queueMicrotask(flush); }
  }

  let LAST_ERR = null;
  const ST = { sweeps: 0, nodes: 0, changed: 0, started: 0, startedAt: "" };
  function wishlist() {
    /* 标题页的 "WISHLIST ON STEAM" 是一个字母一个节点的动画，整块查表查不到；
       品牌字样保持原样，只把动作词换成中文，避免每帧被动画重写。 */
    const b = document.querySelector(".t-wish");
    if (!b) return;
    const small = b.querySelector("small");
    if (small && !CJK.test(small.textContent)) small.textContent = "加入愿望单 ·";
  }

  /* 采矿按钮的"电力不足（需要 …)"：结尾的半角括号单独成一个文本节点，换成全角 */
  function minebtn() {
    const b = document.querySelector("#mine-btn");
    if (!b || !/电力不足/.test(b.textContent)) return;
    const w = document.createTreeWalker(b, NodeFilter.SHOW_TEXT, null);
    let n, last = null;
    while ((n = w.nextNode())) if (n.nodeValue && n.nodeValue.trim()) last = n;
    if (last && last.nodeValue.trim() === ")") last.nodeValue = last.nodeValue.replace(")", "）");
  }

  function sweep() {
    ST.sweeps++;
    try { walk(document.body || document.documentElement); } catch (e) { LAST_ERR = String((e && e.stack) || e); }
    try { wishlist(); } catch (e) {}
    try { bubble(); } catch (e) {}
    try { wave(); } catch (e) {}
    try { minebtn(); } catch (e) {}
  }

  let started = false;
  let mo = null;
  function start() {
    if (!on) return;
    if (!started) {
      started = true;
      ST.started++;
      ST.startedAt = document.readyState;
      try {
        mo = new MutationObserver((recs) => {
          for (const r of recs) {
            if (r.type === "characterData") schedule(r.target.parentNode || r.target);
            else if (r.type === "attributes") schedule(r.target);
            else for (const n of r.addedNodes) schedule(n);
          }
        });
        mo.observe(document.documentElement, {
          subtree: true, childList: true, characterData: true,
          attributes: true, attributeFilter: ATTRS,
        });
      } catch (e) { LAST_ERR = String(e); }
    }
    sweep();
  }

  /* 立即扫描 + DCL/load 补扫 + 定时兜底（itch.io 的运行时脚本挂了会让 DOMContentLoaded 永远不触发） */
  start();
  setInterval(() => { if (on) sweep(); }, 700);
  document.addEventListener("DOMContentLoaded", start);
  window.addEventListener("load", start);
  document.addEventListener("visibilitychange", start);









  /* ---------- 第十四轮：阶段完成弹窗（标题/首句/下一步/新阶段） ---------- */
  Object.assign(DICT, {
    "Later": "稍后",
    "Greenhouse Charge": "温室装药",
  });

  RULES.unshift(
    [/^Stage (\d+) Complete · (.+) phase done$/i, (m) => "第 " + m[1] + " 阶段完成 · " + tr(m[2]) + "阶段结束"],
    [/^Stage (\d+) Complete$/i, (m) => "第 " + m[1] + " 阶段完成"],
    [/^Next · Stage (\d+)\/10: (.+)$/i, (m) => "下一步 · 阶段 " + m[1] + "/10：" + tr(m[2])],
    [/^\(new phase: (.+?)\)\. (.+)$/i, (m) => { const t = tr(m[2]); return "（新阶段：" + tr(m[1]) + "）。" + (t === m[2] ? m[2] : t); }],
    [/^\(new phase: (.+)\)$/i, (m) => "（新阶段：" + tr(m[1]) + "）"],
    [/^\. (.+)$/, (m) => { const t = tr(m[1]); return t === m[1] ? m[0] : "。" + t; }],
    [/^(.+) complete\.$/i, (m) => { const t = tr(m[1]); return t === m[1] ? m[0] : t + "完成。"; }],
  );

  /* ---------- 第十三轮：九个建造弹窗的整段（normText 归一化后的形式） ---------- */
  Object.assign(HTML_MAP, {
    "The Launch Pad is ready. The Launch tab is now open. Stock the rocket, run the pre-flight checks and fly it up to the supply ship to collect the parts.":
      '<p><b>发射台已就绪。</b><b>发射</b>页已打开。给火箭装货，跑完起飞前检查，然后把它飞到补给船去取零件。</p>',
    "The Launch Pad is ready. The Launch tab is now open. Launch 1 will fly to the abandoned Temperature Station and bring back the Heater.":
      '<p><b>发射台已就绪。</b><b>发射</b>页已打开。1 号火箭将飞往废弃的温度空间站，把加热器带回来。</p>',
    "The Heater is ready. Start it in the Terraform tab. It burns Greenhouse Charges: mine Sulfur and Copper Ore, craft Copper Wire, then craft the charges. Load them into the Heater, and the Auto-Loader upgrade will do it for you later.":
      '<p><b>加热器已就绪。</b>在地形改造页启动它。</p><p>它燃烧<b>温室装药</b>：挖硫矿和铜矿，造铜线，再制造装药。把它们装进加热器，之后升级自动装料器就会替你完成。</p>',
    "The hand pump is in. The Hydro tab is open. Mini-game: drag the crank handle clockwise. Keep cranking to build line pressure (up to ×1.4 water per turn). Upgrade Crank Gearing for more water per turn; at Lv 2 you can install motor pumps that work on their own.":
      '<p><b>手动泵已装好。</b>水力页已打开。</p><p>小游戏：<b>顺时针拖动摇柄</b>。继续摇以积累管线压力（每圈最多 ×1.4 水量）。升级<b>摇柄齿轮</b>以获得更高的每圈水量；等级 2 可以安装<b>电机水泵</b>，它们会自己运转。</p>',
    "The BioSpray Tower needs no power, only water: 8 L/s for full speed. Start it in the Terraform tab. Click dry red ground around the tower to spot-spray it.them yourself (15 L each).":
      '<p><b>生物喷洒塔不用电，只用水：全速时 8 升/秒。</b></p><p>在地形改造页启动它。点击塔周围干燥的红色地面定点喷洒，也可以自己动手（每次 15 升）。</p>',
    "Plant seeds in incubator trays, wait for them to ripen, then harvest 3 seeds per tray.":
      '<p>在培养托盘里种下种子，等它们成熟，每盘可收 3 颗种子。</p>',
    "Pick an animal in the Food Chain and press Decode. A row of letters appears: press the same letters in order (the next one is highlighted) before the timer runs out. Each decode costs Uranium Cells, shown on the Decode button. The Decoder lives in the Biolab tab.":
      '<p>在食物链里选一种动物，然后按<b>解码</b>。会出现一排字母：在计时结束前<b>按顺序按下相同的字母</b>（下一个会高亮）。每次解码消耗铀电池，数量显示在「解码」按钮上。解码器位于<b>生物实验室</b>页。</p>',
    "Load a decoded genome to grow an animal, then RELEASE it. Follow the food chain: insects (need flowers) → birds (eat insects) → large animals (eat birds, drink water). Each tier of the Incubator unlocks the next group.":
      '<p>装入一份已解码基因组培养动物，然后<b>放生</b>它。按食物链来：<b>昆虫</b>（需要花卉）→ <b>鸟类</b>（吃昆虫）→ <b>大型动物</b>（吃鸟、喝水）。培养器每升一档解锁下一组。</p>',
    "The Seed Spreader uses 0.8 E/s, 4 L/s of water and 1 seed every 5 s. Spread flowers first to turn the sky blue, then trees to bring clouds and rain.":
      '<p>种子播撒器使用<b>0.8 能量/秒、4 升/秒的水，每 5 秒 1 颗种子</b>。先播撒<b>花卉</b>把天空变蓝，再播撒<b>树木</b>带来云和雨。</p>',
  });

  Object.assign(DICT, {
    "flowers": "花卉", "trees": "树木", "tab.": "页。",
    "Stock the rocket, run the pre-flight checks and fly it up to the supply ship to collect the parts.":
      "给火箭装货，跑完起飞前检查，然后把它飞到补给船去取零件。",
  });

  /* ---------- 第十二轮：解锁框（unlockBox）内的条目与 ★ 前缀 ---------- */
  Object.assign(DICT, {
    "Dig it in the Mine tab.": "在矿井页挖到它。",
    "Craft it in the Refinery.": "在精炼里制造它。",
    "Load Thorium Rods into the drill here.": "在这里给钻机装填钍棒。",
  });

  RULES.unshift(
    [/^★\s*(.+)$/, (m) => { const t = tr(m[1]); return t === m[1] ? m[0] : "★ " + t; }],
    [/^New tab: (.+)$/i, (m) => "新页面：" + tr(m[1])],
    [/^New machine: (.+)$/i, (m) => "新机器：" + tr(m[1])],
    [/^New (?:unlock|item)s?: (.+)$/i, (m) => "新解锁：" + tr(m[1])],
  );

  /* ---------- 第十一轮：按钮上的"电力不足"（被图标切成两段） ---------- */
  RULES.unshift(
    [/^NOT ENOUGH POWER \(need\s*$/i, () => "电力不足（需要"],
    [/^NOT ENOUGH POWER \(need (.+)\)$/i, (m) => "电力不足（需要" + m[1] + "）"],
    [/^MINE (.+) ·\s*$/i, (m) => "开采" + tr(m[1]) + " ·"],
  );

  /* ---------- 第十轮：日志与提示行（log / out / msg） ---------- */
  RULES.unshift(
    [/^Solar panel #?(.+?) online\.$/i, (m) => "太阳能板 #" + m[1] + " 已上线。"],
    [/^Auto Crafter upgraded to Lv (.+?)\.$/i, (m) => "自动制造机已升级到等级 " + m[1] + "。"],
    [/^The Genome Decoder needs (.+?) Uranium Cells?\.$/i, (m) => "基因解码器需要 " + m[1] + " 枚铀电池。"],
    [/^(.+?) genome decoded! Incubate it in the Terraform tab\.$/i, (m) => tr(m[1]) + "基因组解码完成！在地形改造页培养它。"],
    [/^Decode failed: time ran out on the (.+?) genome \(Uranium Cells spent\)\. Try again!$/i, (m) => "解码失败：" + tr(m[1]) + "基因组超时（铀电池已消耗）。再试一次！"],
    [/^(.+?) embryo incubating \((.+?) s\)\.$/i, (m) => tr(m[1]) + "胚胎培养中（" + m[2] + " 秒）。"],
    [/^(.+?) released into the wild · new species!$/i, (m) => tr(m[1]) + "已放归野外 · 新物种！"],
    [/^(.+?) released into the wild$/i, (m) => tr(m[1]) + "已放归野外。"],
    [/^(.+?) installed\.$/i, (m) => tr(m[1]) + "已安装。"],
    [/^(.+?) Thorium Rods? loaded · hopper (.+?)$/i, (m) => m[1] + " 根钍棒已装填 · 料斗 " + m[2]],
    [/^New Thorium Rod in the drill · (.+?)\/(.+?) left in hopper\.$/i, (m) => "钻机装上新的钍棒 · 料斗剩余 " + m[1] + "/" + m[2] + "。"],
    [/^(.+?) Greenhouse Charges? loaded into the Heater\.$/i, (m) => m[1] + " 份温室装药已装入加热器。"],
    [/^Pre-flight fault: (.+?)\. Retry the check\.$/i, (m) => "起飞前故障：" + tr(m[1]) + "。请重试该项检查。"],
    [/^Liftoff! (.+?) flight underway\.$/i, (m) => "点火成功！" + tr(m[1]) + " 飞行进行中。"],
    [/^(.+?) reached\. Cargo returned to Mars\.$/i, (m) => "已抵达" + tr(m[1]) + "，货物已运回火星。"],
    [/^(.+?): (.+?)% complete\.$/i, (m) => tr(m[1]) + "：完成 " + m[2] + "%。"],
    [/^(.+?) (.+?) complete\. Life terraforming finished!$/i, (m) => tr(m[1]) + " " + tr(m[2]) + " 完成。生命改造结束！"],
    [/^(.+?) (.+?) complete\. (.+?) terraforming finished!$/i, (m) => tr(m[1]) + " " + tr(m[2]) + " 完成。" + tr(m[3]) + " 改造结束！"],
    [/^STAGE (.+?) COMPLETE: (.+?)\.$/i, (m) => "第 " + m[1] + " 阶段完成：" + tr(m[2]) + "。"],
    [/^Unlocked: (.+?)\.$/i, (m) => "已解锁：" + tr(m[1]) + "。"],
    [/^Auto-Decoder now decoding (.+?)\.$/i, (m) => "自动解码器开始解码" + tr(m[1]) + "。"],
    [/^Auto-Decoder: (.+?) genome decoded\.$/i, (m) => "自动解码器：" + tr(m[1]) + "基因组已解码。"],
    [/^All drones set to (.+?)\.$/i, (m) => "全部无人机设为" + tr(m[1]) + "。"],
    [/^Spliced (.+?) genome into Tray (.+?)\.$/i, (m) => "已将" + tr(m[1]) + "基因组拼接到托盘 " + m[2] + "。"],
    [/^Crafted (.+?) × (.+?)\.$/i, (m) => "已制造 " + m[1] + " × " + tr(m[2]) + "。"],
    [/^Cannot craft (.+?): missing inputs or power\.$/i, (m) => "无法制造" + tr(m[1]) + "：缺少原料或电力。"],
    [/^(.+?) ×(.+)$/, (m) => { const t = tr(m[1]); return t === m[1] ? m[0] : t + " ×" + m[2]; }],
  );

  Object.assign(DICT, {
    "Splice error! Sequence shown again.": "拼接出错！序列已重新显示。",
    "Zipping…": "正在压缩…",
  });

  /* ---------- 第九轮：容错与收尾 ---------- */
  RULES.unshift(
    [/^Motor pumps\s*·\s*([\d.]+)\s*L\/s$/i, (m) => "电机水泵 · " + m[1] + " 升/秒"],
    [/^Tank\s+([\d,]+)\s*→\s*([\d,]+)\s*L$/i, (m) => "水箱 " + m[1] + " → " + m[2] + " 升"],
    [/^Water per hand-pump turn\s*×\s*([\d.]+)\s*\(([\d.]+)\s*→\s*([\d.]+)\s*L at full pressure\s*×\s*([\d.]+)\)\.\s*Lv (\d+) unlocks motor pumps\.$/i,
      (m) => "手摇泵每圈水量 ×" + m[1] + "（满压 ×" + m[4] + " 时 " + m[2] + " → " + m[3] + " 升）。等级 " + m[5] + " 解锁电机水泵。"],
    [/^\+(\d+) s on every decode\s*\(([\d.]+)\s*→\s*([\d.]+)\s*s extra\)\.\s*Lv (\d+) unlocks the Auto-Decoder\.$/i,
      (m) => "每次解码 +" + m[1] + " 秒（额外 " + m[2] + " → " + m[3] + " 秒）。等级 " + m[4] + " 解锁自动解码器。"],
    [/^Tank\s+([\d,]+)\s*→\s*([\d,]+)\s*升$/, (m) => "水箱 " + m[1] + " → " + m[2] + " 升"],
    [/^Trays\s+(\d+)\s*→\s*(\d+)$/i, (m) => "托盘 " + m[1] + " → " + m[2]],
    [/^(.+?)\s+Lv\s+(\d+)\s*→\s*Lv\s+(\d+)$/i, (m) => tr(m[1]) + " 等级 " + m[2] + " → " + m[3]],
    [/^Lv\s+(\d+)\s+of\s+(\d+)$/i, (m) => "等级 " + m[1] + " / " + m[2]],
    [/^([\d.,]+)\s*\/\s*([\d.,]+)\s*pumps$/i, (m) => m[1] + "/" + m[2] + " 台水泵"],
    [/^(.+?) in stock\s*·\s*(.+?) in hopper\s*·\s*([\d,]+) ore$/i,
      (m) => tr(m[1]) + " 库存 · 料斗 " + m[2] + " · 矿石 " + m[3]],
    [/^(.+?)\s*·\s*live 3D \(drag to rotate\)$/i, (m) => tr(m[1]) + " · 实时 3D（拖动旋转）"],
    [/^SITE T-1\s*·\s*IDLE$/i, () => "T-1 场地 · 空闲"],
    [/^Vents\s+([\d.]+)\s*kt\/s\s*·\s*max air pressure no limit$/i, (m) => "排放 " + m[1] + " 千吨/秒 · 最高气压无上限"],
    [/^Solar Array\s*·\s*([\d/]+)\s*mounts$/i, (m) => "太阳能阵列 · " + m[1] + " 支架"],
    [/^(\d+) motor pumps\s*×\s*([\d.]+)\s*L\/s\s*×\s*filter\s*([\d.]+)%\s*·\s*draws\s*([\d.]+)\s*E\/s$/i,
      (m) => m[1] + " 台电机水泵 × " + m[2] + " 升/秒 × 滤芯 " + m[3] + "% · 耗电 " + m[4] + " 能量/秒"],
  );

  Object.assign(DICT, {
    "1st half": "前半段",
    "2nd half": "后半段",
    "insect food": "昆虫食物",
    "1st half, insect food": "前半段，昆虫食物",
    "2nd half of the field": "田的后半段",
    "Tank": "水箱",
    "Deploy": "部署",
    "Add": "增加",
    "Remove": "移除",
  });

  /* ---------- 演示版 → Demo 版（其余措辞保持不变） ---------- */
  Object.assign(DICT, {
    "Not in demo": "Demo 版不可用",
    "Mini-Game Playground": "小游戏试验场",
    "PLAYGROUND": "试验场",
    "Not available in demo": "Demo 版不可用",
    "demo!": "Demo 版！",
    "That's where the demo ends.": "Demo 版就到这里。",
    "The demo is complete. Keep mining, crafting and upgrading as long as you like!": "Demo 版已通关。你可以继续采矿、制造和升级。",
    "Thank you for playing the Mars Inc 98 demo!": "感谢游玩《火星公司 98》Demo 版！",
    "The page reloads to apply it. The itch.io export is always the demo.": "页面会重载以生效。导出到 itch.io 的版本永远是 Demo 版。",
    "Earth supply ship (demo launch target): cargo frame with crates, solar wings, docking port": "地球补给船（Demo 版发射目标）：带货箱的货架、太阳能翼、对接舱口",
    "✓ Demo mode (Not in demo locks)": "✓ 演示模式（未解锁项按 Demo 版处理）",
  });

  /* ---------- 第八轮：残局全量扫描后的补齐 ---------- */
  const EMBED = ["Iron Ore","Silica Ore","Thorium Ore","Sulfur Ore","Copper Ore","Aluminum Ore","Titanium Ore","Uranium Ore","Platinum Ore",
    "Iron Plate","Glass Pane","Battery Cell","Thorium Rod","Greenhouse Charge","Copper Wire","Aluminum Frame","Titanium Alloy","Uranium Cell",
    "Heat Core","Seed of Life","Lichen Seeds","Moss Seeds","Grass Seeds","Poppy Seeds","Dandelion Seeds","Sunflower Seeds","Oak Seeds","Aspen Seeds","Pine Seeds",
    "Lichen","Moss","Poppy","Dandelion","Sunflower","Oak","Aspen","Pine","Water","Energy",
    "Terraform Drill","BioSpray Tower","Seed Spreader","Seed Synthesizer","Water Pump","Heater","Launch Pad","Mining Rig",
    "Auto Crafter","Embryo Incubator","Genome Decoder","Crafting Dome","Solar Panel","Battery"];
  const EMBED_SORTED = [...EMBED].sort((a, b) => b.length - a.length);
  function embed(out) {
    if (!/[A-Za-z]{3}/.test(out)) return out;
    let r = out;
    for (const en of EMBED_SORTED) {
      if (!r.includes(en)) continue;
      const zh = DICT[en];
      if (zh) r = r.split(en).join(zh);
    }
    return r;
  }

  Object.assign(DICT, {
    "MAX": "满级",
    "Maximum level": "已满级",
    "RETIRED": "已退役",
    "Retired": "已退役",
    "IDLE": "空闲",
    "Pressure phase": "气压阶段",
    "Mining": "采矿",
    "■ ON": "■ 开",
    "Turn the drones on or off": "开关无人机",
    "Returned": "已带回",
    "delivered": "已送达",
    "Uproot": "拔除",
    "Water (5 L)": "浇水（5 升）",
    "chain": "链条",
    "flower": "花卉",
    "Flowers & trees": "花卉与树木",
    "Costs 1 Uranium Cell": "消耗 1 枚铀电池",
    "Bee": "蜜蜂", "Butterfly": "蝴蝶", "Pigeon": "鸽子", "Crow": "乌鸦", "Chicken": "鸡",
    "Rabbit": "兔子", "Deer": "鹿", "Fox": "狐狸",
    "Auto-Decoder": "自动解码器",
    "Auto-Sequencer": "自动测序仪",
    "Filters clean themselves slowly. Fewer manual flushes.": "滤芯会慢慢自清洁，手动冲洗更少。",
    "Every genome is 1 base shorter (now −2).": "每个基因组的碱基序列更短（现在是 −2）。",
    "Sequence shows +0.8 s longer, +1 seed per harvest (5 → 6). Lv 1 unlocks Drip Irrigation, Lv 2 the Auto-Sequencer.":
      "序列显示时间 +0.8 秒，每次收获 +1 颗种子（5 → 6）。等级 1 解锁滴灌，等级 2 解锁自动测序仪。",
    "Waters drying trays for you (5 L each time).": "替你给变干的托盘浇水（每次 5 升）。",
    "Automation: plants your chosen target seed in every empty tray.": "自动化：在每个空托盘里种上你选的目标种子。",
    "Automation: harvests ripe trays straight into the vault.": "自动化：把成熟的托盘直接收进种子库。",
    "Automation: pumps water on its own. +4 L/s each, 0.3 E/s each (12 → 16 L/s)":
      "自动化：自己抽水。每台 +4 升/秒，耗电 0.3 能量/秒（12 → 16 升/秒）",
    "Automation: decodes your chosen animal every 25 s, keeping 2 Uranium Cells in reserve. Manual decoding still works.":
      "自动化：每 25 秒解码一次你选的动物，保留 2 枚铀电池备用。手动解码仍然可用。",
    "Empty trays are planted with Lichen automatically. Switch the target any time; Uproot a tray to change it now.":
      "空托盘会自动种上地衣。随时可以切换目标；想立刻改就拔除托盘。",
    "Auto-Decoder: 1 Fly genome every 25 s (keeps 2 Uranium Cells in reserve). You can still decode by hand.":
      "自动解码器：每 25 秒产出 1 份苍蝇基因组（保留 2 枚铀电池备用）。你也可以手动解码。",
    "The parts are here. The next steps continue in the full game.": "零件已运到。后续内容在完整版中继续。",
    "Mission complete. Mars is alive. Platinum (asteroid capture) unlocked as a post-game ore.":
      "任务完成。火星活了。铂矿（小行星捕获）作为通关后矿石解锁。",
    "Thanks!": "谢谢！",
    "HELLAS INTAKE · 3 MOTOR PUMPS": "希腊进水口 · 3 台电机水泵",
    "TANK 100%": "水箱 100%",
    "T-1 · IDLE": "T-1 · 空闲",
    "SITE T-1 · IDLE": "T-1 场地 · 空闲",
    "3/6 pumps": "3/6 台水泵",
  });

  RULES.unshift(
    [/^(.+?) \((Common|Uncommon|Rare)\)$/i, (m) => tr(m[1]) + "（" + tr(m[2]) + "）"],
    [/^(\d+) on (.+)$/i, (m) => m[1] + " 台在" + tr(m[2])],
    [/^(\d+) letters?$/i, (m) => m[1] + " 个字母"],
    [/^(\d+) bases?$/i, (m) => m[1] + " 个碱基"],
    [/^(\d+) seeds?$/i, (m) => m[1] + " 颗种子"],
    [/^(\d+) s left$/i, (m) => "剩 " + m[1] + " 秒"],
    [/^(\d+)\/(\d+) pumps$/i, (m) => m[1] + "/" + m[2] + " 台水泵"],
    [/^(\d+) rpm$/i, (m) => m[1] + " 转/分"],
    [/^TANK (\d+)%$/, (m) => "水箱 " + m[1] + "%"],
    [/^Lv (\d+) of (\d+)$/i, (m) => "等级 " + m[1] + " / " + m[2]],
    [/^(.+?) Lv (\d+) → Lv (\d+)$/i, (m) => tr(m[1]) + " 等级 " + m[2] + " → " + m[3]],
    [/^Trays (\d+) → (\d+)$/i, (m) => "托盘 " + m[1] + " → " + m[2]],
    [/^Tank (\d+) → (\d+) 升$/, (m) => "水箱 " + m[1] + " → " + m[2] + " 升"],
    [/^Vents ([\d.]+) kt\/s · max air pressure no limit$/i, (m) => "排放 " + m[1] + " 千吨/秒 · 最高气压无上限"],
    [/^Thorium Rods in stock · (.+?) in hopper · ([\d,]+) ore$/i, (m) => "钍棒库存 · 料斗 " + m[1] + " · 矿石 " + m[2]],
    [/^Solar Array · ([\d/]+) mounts$/i, (m) => "太阳能阵列 · " + m[1] + " 支架"],
    [/^(.+?) · Retired$/i, (m) => tr(m[1]) + " · 已退役"],
    [/^(.+?) · live 3D \(drag to rotate\)$/i, (m) => tr(m[1]) + " · 实时 3D（拖动旋转）"],
    [/^(\d+) motor pumps × (.+?) L\/s × filter (.+?) · draws (.+?) E\/s$/i, (m) => m[1] + " 台电机水泵 × " + m[2] + " 升/秒 × 滤芯 " + m[3] + " · 耗电 " + m[4] + " 能量/秒"],
    [/^([\d.]+) L per turn · pressure builds as you keep cranking$/i, (m) => "每圈 " + m[1] + " 升 · 持续摇泵可积累压力"],
    [/^([\d.]+) L\/s each at clean filters$/i, (m) => "滤芯干净时每台 " + m[1] + " 升/秒"],
    [/^built · (\d+) clean motor pumps$/i, (m) => "已建成 · " + m[1] + " 台干净的电机水泵"],
    [/^([\d.]+) L Water \+ (.+)$/i, (m) => m[1] + " 升水 + " + tr(m[2])],
    [/^(\d+) Uranium Cells? per decode$/i, (m) => "每次解码 " + m[1] + " 枚铀电池"],
    [/^\+(\d+) (.+)$/, (m) => "+" + m[1] + " " + tr(m[2])],
    [/^Spreader ×(.+?) \((.+)\)$/i, (m) => "播撒器 ×" + m[1] + "（" + tr(m[2]) + "）"],
  );

  /* ---------- 第七轮：采矿面板的拼接型文案（单位、手持量、按钮） ---------- */
  RULES.unshift(
    [/^([\d.,]+) ore for\s*$/i, (m) => m[1] + " 矿石 · 耗"],
    [/^([\d.,]+) on hand$/i, (m) => m[1] + " 在手"],
    [/^([\d.,]+) ore · (.+?) ore$/i, (m) => m[1] + " 矿石 · " + tr(m[2]) + "矿"],
    [/^(.+?) ore$/i, (m) => { const k = m[1] + " Ore"; if (DICT[k]) return DICT[k]; const t = DICT[m[1]] || DICT[m[1].toLowerCase()]; return t ? t + "矿" : m[0]; }],
    [/^MINE (.+) ·\s*$/i, (m) => "开采" + tr(m[1]) + " ·"],
    [/^(.+) ore \/ click$/i, (m) => m[1] + " 矿石/次"],
    [/^(.+) ore \/ s$/i, (m) => m[1] + " 矿石/秒"],
    [/^\+(.+) ore\/s$/i, (m) => "+" + m[1] + " 矿石/秒"],
    [/^(\d+) drones? idle, no power used$/i, (m) => m[1] + " 台无人机空闲，未耗电"],
    [/^(\d+) drones?: (.+)$/i, (m) => m[1] + " 台无人机：" + tr(m[2])],
    [/^AUTO\b$/, () => "自动"],
    [/^(.+?) \(click\)$/i, (m) => tr(m[1]) + "（点击）"],
  );

  Object.assign(DICT, {
    "parked": "已停泊",
    "DRONES MINING": "无人机采集中",
    "DRONES STALLED: NO POWER": "无人机停滞：无电力",
    "Drone power draw": "无人机耗电",
    "Manual yield": "手动产量",
    "Drone rate": "无人机速率",
    "Total extracted": "总开采量",
    "Drill Site T-1 · live 3D view (drag to rotate)": "钻探点 T-1 · 实时 3D 视图（拖动旋转）",
  });

  /* ---------- 第五轮：对话气泡（带 <b> 标签整句）与零散漏网 ---------- */
  Object.assign(HTML_MAP, {
    "Hi! I'm Sprocket, your colony assistant. I'm here to help you terraform Mars. Want a quick tour?":
      "你好！我是<b>斯普罗凯特</b>，你的殖民地助手。我来帮你改造火星，要不要先快速导览一遍？",
    "These are your Mission Goals. Work through them and Mars moves on to its next stage.":
      "这些是你的<b>任务目标</b>。逐项完成它们，火星就会进入下一个阶段。",
    "This is your Energy. Building, crafting and mining all use it, and your solar panels slowly recharge it. If it runs low you can't craft, build or mine until it charges back up, so keep an eye on it!":
      "这是你的<b>能量</b>。建造、制造和采矿都要消耗它，太阳能板会慢慢给它充电。能量不够时就没法制造、建造或采矿，直到充回来——盯紧它！",
    "And this is Colony Resources: everything you've mined and made. Things you haven't discovered yet show as ???.":
      "这一块是<b>殖民地资源</b>：你采到和造出的所有东西。还没发现的东西会显示为<b>???</b>。",
    "Down here is Crafting. In the Refinery you turn the ore you dig up into parts.":
      "下面是<b>制造</b>。在<b>精炼</b>里，你把挖到的矿石加工成零件。",
    "Everything that happens in the colony is reported in the Output Log. If something goes wrong, look here first.":
      "殖民地里发生的每件事都会记在<b>输出日志</b>里。出问题时先看这里。",
    "This is Construction. It's where you build the machines that will terraform Mars.":
      "这是<b>建造</b>面板，用来造改造火星的各种机器。",
    "Let's start by building the Mining Rig. It lets you dig raw ore out of the ground. Click it, then press BUILD MINING RIG.":
      "先从建造<b>采矿钻机</b>开始。它能让你从地下挖出原矿。点它，然后按<b>建造采矿钻机</b>。",
    "Brilliant, the Mining Rig is up! Open the Mine tab to start digging.":
      "太棒了，采矿钻机起来了！打开<b>矿井</b>页开始挖矿。",
    "This is the Mine. Click the ore (or the MINE button) to dig it up. Every dig uses a little energy.":
      "这里是<b>矿井</b>。点矿石（或「开采」按钮）就能挖，每挖一次消耗一点能量。",
    "Hey! The drill can't go any deeper. Upgrade it in the Terraform tab and it can keep thickening the air.":
      "嘿！钻机挖不下去了。在<b>地形改造</b>页<b>升级它</b>，就能继续加厚大气。",
    "The drill is stuck again! One more upgrade in the Terraform tab and it can go all the way.":
      "钻机又卡住了！在地形改造页再<b>升级</b>一次，它就能一路挖到底。",
    "This is Solar. Your panels recharge your energy on their own. Build more panels to recharge faster, and upgrade the battery to store more.":
      "这里是<b>太阳能</b>。太阳能板会自己给能量充电。<b>多造几块板</b>充得更快，<b>升级电池</b>能存更多。",
    "Stock the rocket, run the four pre-flight checks, then press IGNITION. Then sit back and watch the flight!":
      "给火箭装货，跑完四项<b>起飞前检查</b>，然后按下<b>点火</b>。接下来坐下来看发射吧！",
    "No problem! Start by building the Mining Rig in Construction. If you ever get stuck, you'll find me in the Help menu.":
      "没问题！先在建造面板里造出<b>采矿钻机</b>。要是卡住了，在<b>帮助</b>菜单里能找到我。",
    "That's all from me! Follow your Mission Goals and Mars will start to change. If you ever get stuck, you'll find me in the Help menu.":
      "我就说到这儿！照着任务目标做，火星就会开始变化。要是卡住了，在<b>帮助</b>菜单里能找到我。",
    "The Mine tab is now open. Next goal: build the Terraform Drill.":
      "<p>矿井页已经打开。</p><p>下一个目标：建造<b>改造钻机</b>。</p>",
    "No logs recovered yet. Each launch brings back story logs from the stations.":
      "还没有回收日志。每次发射都会从空间站带回故事日志。",
    "The Mine tab is now open. Next goal: build the Terraform Drill.":
      "<p>矿井页已经打开。</p><p>下一个目标：建造<b>改造钻机</b>。</p>",
    "The Hydro tab is now open. Next goal: build the BioSpray Tower.":
      "<p>水力页已经打开。</p><p>下一个目标：建造<b>生物喷洒塔</b>。</p>",
  });

  const BLK = /^(P|DIV|LI|BR|UL|OL|H[1-6]|TABLE|TR|TD|SECTION|FIELDSET|LEGEND)$/;
  function normText(el) {
    let out = "";
    const rec = (n) => {
      if (n.nodeType === 3) { out += n.nodeValue; return; }
      if (n.nodeType !== 1) return;
      const isBlk = BLK.test(n.nodeName);
      if (isBlk) out += " ";
      for (let c = n.firstChild; c; c = c.nextSibling) rec(c);
      if (isBlk) out += " ";
    };
    for (let c = el.firstChild; c; c = c.nextSibling) rec(c);
    return out.replace(/\s+/g, " ").trim();
  }

  function bubble() {
    const els = document.querySelectorAll(".spr-txt, .dlg-body > div");
    for (const el of els) {
      if (el.dataset.zh) continue;
      const key = normText(el);
      const v = HTML_MAP[key];
      if (v) { el.innerHTML = v; el.dataset.zh = "1"; continue; }
      const t = tr(key, true);
      if (t !== key) { el.textContent = t; el.dataset.zh = "1"; }
    }
  }

  /* 标题页/工具栏的逐字母波浪动画（.wave[data-wave]）整块重写 */
  function wave() {
    document.querySelectorAll(".wave[data-wave]").forEach((w) => {
      const src = w.dataset.wave || "";
      if (!/[A-Za-z]{3}/.test(src)) return;
      const zh = tr(src, true);
      if (zh === src) return;
      w.dataset.wave = zh;
      w.innerHTML = [...zh]
        .map((c, i) => '<i style="animation-delay:' + (i * 0.07).toFixed(2) + 's">' + (c === " " ? "&nbsp;" : c) + "</i>")
        .join("");
    });
  }

  Object.assign(DICT, {
    "ready to release": "可以放生了",
    "7 more stages": "还有 7 个阶段",
    "7 new machines": "7 台新机器",
    "no automation": "无自动化",
    "save failed": "保存失败",
    "Fetching three.js…": "正在载入 three.js…",
    "Clear & Cold": "晴朗寒冷",
    "Mild & Rainy": "温和多雨",
    "2 · Trees → clouds & rain": "2 · 树木 → 云与雨",
    "Wishlist on Steam": "加入愿望单",
    "Wishlist Mars Inc 98 on Steam": "在 Steam 加入愿望单：火星公司 98",
    ". You can now begin terraforming the planet.": "。你现在可以开始改造这颗行星了。",
    ". Your real colony is set aside and comes back untouched when you exit.": "。你真正的殖民地会先被搁置，退出后原样回来。",
    ". A row of letters appears:": "。会出现一排字母：",
    ". Keep cranking to build line pressure (up to ×1.4 water per turn). Upgrade": "。继续摇以积累管线压力（每圈最多 ×1.4 水量）。升级",
    "for more water per turn; at Lv 2 you can install": "以获得更高的每圈水量；等级 2 可以安装",
    "motor pumps": "电机水泵",
    "an animal in the": "下面列表里的一种动物",
  });

  RULES.unshift(
    [/^Upgrade the Drill to (.+?) in the Terraform tab\.$/i, (m) => "在地形改造页把钻机升到 " + tr(m[1]) + "。"],
    [/^Upgrade the Heater to (.+?) in the Terraform tab\.$/i, (m) => "在地形改造页把加热器升到 " + tr(m[1]) + "。"],
    [/^(.+?) launch in flight\. Keep mining and refining\.$/i, (m) => tr(m[1]) + " 发射进行中。继续采矿与精炼。"],
    [/^Terraform · (.+)$/i, (m) => "地形改造 · " + tr(m[1])],
    [/^Stage (\d+)\/10$/i, (m) => "阶段 " + m[1] + "/10"],
    [/^DEV ×(.+)$/i, (m) => "开发者 ×" + m[1]],
    [/^New ore: (.+)$/i, (m) => "新矿石：" + tr(m[1])],
    [/^New recipe: (.+)$/i, (m) => "新配方：" + tr(m[1])],
    [/^(\d+) NEW UNLOCKS?$/i, (m) => m[1] + " 项新解锁"],
    [/^NEW UNLOCKS?$/i, () => "新解锁"],
    [/^Uses (.+?) genome$/i, (m) => "消耗 " + m[1] + " 份基因组"],
    [/^(.+) = 2 seeds of any flower, grown in the Biolab$/i, (m) => m[1] + " = 任意花卉 2 颗，在生物实验室培育"],
  );

  /* ---------- 第四轮补充规则（拼接型文案，含被 <b>/<span> 切开的片段） ---------- */
  RULES.unshift(
    [/^STAGE (\d+) COMPLETE: ?$/i, (m) => "第 " + m[1] + " 阶段完成："],
    [/^STAGE (\d+) COMPLETE: (.+?)\.?$/i, (m) => "第 " + m[1] + " 阶段完成：" + tr(m[2]) + "。"],
    [/^(\d+)\/(\d+) mounts$/i, (m) => m[1] + "/" + m[2] + " 支架"],
    [/^(\d+)% charged$/i, (m) => m[1] + "% 已充电"],
    [/^Level (\d+)\/(\d+)$/i, (m) => "等级 " + m[1] + "/" + m[2]],
    [/^Level ?$/i, () => "等级"],
    [/^VISIBILITY[\s·:]*?(\d+)%$/i, (m) => "能见度 " + m[1] + "%"],
    [/^VISIBILITY ?$/i, () => "能见度"],
    [/^DUST STORM · VISIBILITY ?(\d+)%$/i, (m) => "沙尘暴 · 能见度 " + m[1] + "%"],
    [/^DUST STORM · VISIBILITY ?$/i, () => "沙尘暴 · 能见度"],
    [/^Sol[\s·:.∙]*?(\d+)[\s·:.∙]*?(\d+:\d+)?$/i, (m) => "火星日 " + m[1] + (m[2] ? " · " + m[2] : "")],
    [/^VISIBILITY[\s·:.∙]*?(\d+)%$/i, (m) => "能见度 " + m[1] + "%"],
    [/^In stock: (\d+)$/i, (m) => "库存：" + m[1]],
    [/^Battery full at (.+?) E\.?$/i, (m) => "电池已满：" + m[1] + " 能量。"],
    [/^Solar Array · ([\d/]+) mounts · STORM$/i, (m) => "太阳能阵列 · " + m[1] + " 支架 · 风暴"],
  );

  /* 重建大小写索引：后面几轮 Object.assign 加进来的词条也要能大小写无关命中 */
  LOWER.clear();
  for (const k in DICT) {
    const lk = k.toLowerCase();
    if (!LOWER.has(lk)) LOWER.set(lk, DICT[k]);
  }

  window.MGI18N = {
    dict: DICT,
    rules: RULES,
    tr,
    get enabled() { return on; },
    get lastError() { return LAST_ERR; },
    get stats() { return ST; },
    toggle(v) { on = v === undefined ? !on : !!v; if (on) start(); },
    _embed: embed, /* MGI18N_TEST_EMBED */
    report() {
      const miss = [...misses.entries()].sort((a, b) => b[1] - a[1]);
      return { hits: hits.size, misses: miss.length, top: miss.slice(0, 120) };
    },
  };

  /* 诊断信息写到 DOM 上（dataset），方便外部在任意上下文里读取未命中清单 */
  setInterval(() => {
    try {
      const d = document.documentElement.dataset;
      d.i18nHits = String(hits.size);
      d.i18nMiss = String(misses.size);
      d.i18nTop = [...misses.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 120)
        .map(([t, n]) => n + "x " + t)
        .join("\u0001")
        .slice(0, 12000);
    } catch (e) {}
  }, 1000);
})();
