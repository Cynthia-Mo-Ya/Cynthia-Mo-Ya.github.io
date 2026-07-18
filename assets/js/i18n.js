/* CYNTHIA portfolio · bilingual dictionary + toggle */
(function () {
  'use strict';

  var D = {
    'loader.sub': { zh: '莫心雅 · 游戏策划 × 项目管理 · EARTH-65', en: 'MO XINYA · GAME DESIGN × PROJECT MGMT · EARTH-65' },

    'nav.decode': { zh: '代号', en: 'Codename' },
    'nav.about': { zh: '起源', en: 'Origin' },
    'nav.cards': { zh: '连载', en: 'Comics' },
    'nav.jinling': { zh: '金陵残梦', en: 'Jinling' },
    'nav.pawnshop': { zh: '记忆当铺', en: 'Pawnshop' },
    'nav.system': { zh: '你就是系统', en: 'System' },
    'nav.farm': { zh: '闹鬼农场', en: 'Haunted Farm' },
    'nav.moba': { zh: '玛卡薇', en: 'Makavi' },
    'nav.aipm': { zh: '项目管理', en: 'Game PM' },
    'nav.gameart': { zh: '游戏美术', en: 'Game Art' },
    'nav.skills': { zh: '装备库', en: 'Gear' },
    'nav.contact': { zh: '联系我', en: 'Contact' },
    'nav.cAbout': { zh: '关于', en: 'About' },
    'nav.cDesign': { zh: '游戏设计', en: 'Game Design' },
    'nav.cEvent': { zh: '活动策划', en: 'Experience' },
    'nav.cMore': { zh: '项目 · 美术', en: 'PM · Art' },

    'hero.tag': { zh: 'MULTIVERSE FILE · EARTH-65 · 中国 · 武汉', en: 'MULTIVERSE FILE · EARTH-65 · WUHAN, CHINA' },
    'hero.role1': { zh: '游戏策划', en: 'GAME DESIGNER' },
    'hero.role2': { zh: '项目管理 · 叙事 · 系统 · 关卡', en: 'PROJECT MGMT · NARRATIVE · SYSTEMS · LEVELS' },
    'hero.line': { zh: '把文学变成<em>可以玩的梦</em>。', en: 'Turning literature into <em>playable dreams</em>.' },
    'hero.st1': { zh: '专业第一', en: 'Top of Class' },
    'hero.st1s': { zh: '湖北大学 · 数字媒体艺术', en: 'Hubei University · Digital Media Art' },
    'hero.st2u': { zh: '件', en: '' },
    'hero.st2': { zh: '独立交付', en: 'Solo Deliverables' },
    'hero.st2s': { zh: '《金陵残梦》完整概念', en: 'Full concept of Jinling project' },
    'hero.st3u': { zh: '次', en: '×' },
    'hero.st3': { zh: '主策划兼统筹', en: 'Lead & Coordinator' },
    'hero.st3s': { zh: '8 人团队 · 落地体验项目', en: '8-person team · shipped experiences' },
    'hero.scroll': { zh: '往下滑', en: 'Scroll down' },

    'decode.title': { zh: '解码 CYNTHIA', en: 'DECODE CYNTHIA' },
    'decode.meta': { zh: '七个字母 · 七种能力 · 点亮试试看', en: 'Seven letters · seven powers · light them up' },
    'decode.c': { zh: '双人协作 · 非对称机制研究者', en: 'Co-op design · asymmetric mechanics nerd' },
    'decode.y': { zh: '纺出故事线 · 也是一根蛛丝', en: 'Spinning yarns · also spider silk' },
    'decode.n': { zh: '叙事设计 · 文学 IP 的交互转生', en: 'Narrative design · literature reborn as play' },
    'decode.t': { zh: '玩法转译 · 人物困境 → 关卡机制', en: 'Translating character struggles into mechanics' },
    'decode.h': { zh: '情感驱动 · 按情感重量结算的设计', en: 'Emotion-driven · design priced by feeling' },
    'decode.i': { zh: '沉浸体验 · 全程无 UI / 五感入梦', en: 'Immersion · UI-less worlds, five-sense dreams' },
    'decode.a': { zh: '美术功底 · 广美附中科班出身', en: 'Art-trained · GAFA affiliated school' },

    'spider.bubble': { zh: 'CLICK ME!<br>点我 · 问我任何事', en: 'CLICK ME!<br>ASK ME ANYTHING' },
    'spider.noteq': { zh: '你有什么想问我的？', en: 'What do you want to ask me?' },
    'spider.welcome': { zh: '嗨！我是心雅的蜘蛛 🕷️ 项目、设计理念、AI 工作流、为什么是《红楼梦》……问点真的。', en: 'Hi! I am Cynthia\'s spider 🕷️ Projects, design philosophy, AI workflow, why Dream of the Red Chamber… ask me something real.' },
    'spider.ph': { zh: '问项目、能力、合作方式…', en: 'Ask about projects, skills, collaboration…' },
    'spider.thinking': { zh: '蛛丝感应中…', en: 'Spider-sense tingling…' },
    'spider.error': { zh: '（信号被反派切断了，先看下面这条本地档案）', en: '(Signal jammed by a villain — here is the local file instead)' },

    'file.stamp': { zh: 'CONFIDENTIAL', en: 'CONFIDENTIAL' },
    'file.open': { zh: '⤷ 单击展开档案', en: '⤷ Click to open the file' },
    'file.close': { zh: '⤶ 单击合上文档', en: '⤶ Click to close' },
    'file.name': { zh: '莫心雅 · 游戏策划 / 项目管理', en: 'Mo Xinya · Game Designer / PM' },
    'file.s1t': { zh: '审美 / 策划 / AI 工作流', en: 'Aesthetics / Design / AI workflow' },
    'file.s1': { zh: '把文学变成可以玩的梦', en: 'Turning literature into playable dreams' },
    'file.s2': { zh: '· 系统 / 叙事 / 关卡设计<br>· 5 件独立交付<br>· 8 人团队主策划兼统筹 ×2', en: '· Systems / narrative / level design<br>· 5 solo deliverables<br>· Lead & coordinator of 8-person team ×2' },
    'file.s3t': { zh: '教育', en: 'EDU' },
    'file.s3': { zh: '湖北大学 · 数媒艺术 2025–2029<br>学业排名 1/120 · 广美附中', en: 'Hubei University · DMA 2025–2029<br>Rank 1/120 · GAFA affiliated school' },
    'file.read': { zh: '点击阅读策划简历 ↗', en: 'Read the game-design resume ↗' },
    'file.readPm': { zh: '📋 项目管理方向简历 ↗', en: '📋 Project-management resume ↗' },
    'build.b1t': { zh: '系统设计', en: 'Systems Design' },
    'build.b1s': { zh: '完整策划案 · 玩法循环 / 关系系统 / 多结局', en: 'Full design doc · loop / relationships / endings' },
    'build.b2t': { zh: '叙事设计', en: 'Narrative Design' },
    'build.b2s': { zh: '文学 IP → 交互转生 · 分支 / 情感关卡', en: 'Literary IP → interactive · branching / emotion levels' },
    'build.b3t': { zh: '关卡设计', en: 'Level Design' },
    'build.b3s': { zh: 'UE5 白盒 → 垂直切片 · 动线 / 指引 / Boss', en: 'UE5 white-box → vertical slice · routing / guidance / boss' },
    'build.b4t': { zh: 'AI 工作流', en: 'AI Workflow' },
    'build.b4s': { zh: '概念 → 概念图 / PV → 工程上线交付', en: 'Concept → art / PV → shipped engineering' },
    'build.b5t': { zh: '项目统筹', en: 'Project Coordination' },
    'build.b5s': { zh: '48h SOP / 风险看板 / 复盘 Roadmap', en: '48h SOP / risk dashboard / retro roadmap' },

    'about.title': { zh: '起源故事', en: 'ORIGIN STORY' },
    'about.quote': { zh: '“被美术耽误的策划，被策划点燃的美术。”', en: '"An artist sidetracked into design; a designer set on fire by art."' },
    'about.edu': { zh: '教育线', en: 'Education' },
    'about.edu1': { zh: '广州美术学院附属中等美术学校 · 美术方向', en: 'GAFA Affiliated Art School · Fine Art track' },
    'about.edu2t': { zh: '约 1 年', en: '~1 yr' },
    'about.edu2': { zh: '张默然画室 · 动画专项（2D 角色 / 场景构图 / 漫画分镜 / 速写）', en: 'Zhang Moran Studio · animation training (2D character / scene composition / comic storyboard / sketch)' },
    'about.edu3': { zh: '湖北大学 · 数字媒体艺术（本科）<em>学业排名 1/120 · 专业第一</em>', en: 'Hubei University · Digital Media Art (BA)<em>Rank 1/120 · top of the major</em>' },
    'about.power': { zh: '核心能力', en: 'Core Powers' },
    'about.p1': { zh: '系统设计', en: 'Systems Design' },
    'about.p1d': { zh: '独立构建含核心玩法循环、双维度关系系统、四结局结构与非对称协作机制的完整策划案，落到可执行纵向切片。', en: 'Solo-built a full design doc: core gameplay loop, two-axis relationship system, four-ending structure and asymmetric co-op — down to an executable vertical slice.' },
    'about.p2': { zh: '叙事设计', en: 'Narrative Design' },
    'about.p2d': { zh: '擅长把文学 IP 转化为交互叙事——分支叙事、情感驱动关卡、「玩法即叙事 / 视角即叙事」融合方案。', en: 'Turns literary IP into interactive narrative — branching stories, emotion-driven levels, "mechanics as narrative / perspective as narrative".' },
    'about.p3': { zh: '关卡设计', en: 'Level Design' },
    'about.p3d': { zh: '从关卡概念到垂直切片全流程，含分屏交互脚本、镜头语言与多阶段 Boss 设计。', en: 'Full pipeline from level concept to vertical slice: split-screen interaction scripts, camera language, multi-phase boss design.' },
    'about.p4': { zh: '项目统筹', en: 'Project Coordination' },
    'about.p4d': { zh: '两次带 8 人团队主策划兼统筹——定分工、写台本、做培训、盯节点；以 LOLM 为蓝本推演 PM 全链路，落地在线风险看板。', en: 'Twice lead & coordinator of an 8-person team — set the split, wrote the scripts, ran the training, tracked the milestones; plus a full PM playbook on LOL Mobile with a live risk dashboard.' },

    'cards.title': { zh: '作品连载', en: 'COMIC PAGES' },
    'cards.meta': { zh: '翻开这本连载 · 悬停上色 · 点开任意分格看详情', en: 'Open the serial · hover to ink · click any panel' },
    'cards.c1t': { zh: '金陵残梦', en: 'Remnant Dream of Jinling' },
    'cards.c1tag': { zh: '双人叙事冒险 / 个人独立 / PC·Steam', en: 'Co-op narrative adventure / solo work / PC·Steam' },
    'cards.c1b': { zh: '以《红楼梦》为蓝本，两名玩家在同一世界看见不同真相。', en: 'Based on Dream of the Red Chamber — two players see two truths in one world.' },
    'cards.c2t': { zh: '衍生宇宙', en: 'Spin-off Universe' },
    'cards.c2tag': { zh: 'Arduino 声景装置 / 衍生 APP', en: 'Arduino soundscape device / companion app' },
    'cards.c2b': { zh: '把游戏的四幕情绪做成可以「拧」的实体音景，再延展成移动端梦境应用。', en: 'The game\'s four acts as a twistable physical soundscape, extended into a dream app.' },
    'cards.c3t': { zh: '记忆当铺', en: 'The Memory Pawnshop' },
    'cards.c3tag': { zh: '五感沉浸体验 / 主策划 / 全校路演', en: 'Five-sense immersive experience / lead designer' },
    'cards.c3b': { zh: '用五感典当记忆，按情感重量结算「典金」。', en: 'Pawn your memories through the senses; paid by emotional weight.' },
    'cards.c4t': { zh: '你就是系统', en: 'You Are The System' },
    'cards.c4tag': { zh: '人体互动画布 / 主策划 / 零硬件', en: 'Human interactive canvas / lead designer / zero hardware' },
    'cards.c4b': { zh: '数字艺术 = 你的动作 + 系统的回应，人肉实时渲染管线。', en: 'Digital art = your motion + the system\'s response. A human real-time render pipeline.' },
    'cards.c5t': { zh: '闹鬼农场', en: 'Haunted Farm' },
    'cards.c5tag': { zh: 'UE5 关卡白盒 / 个人独立 / 寻物解谜 + 轻战斗', en: 'UE5 white-box level / solo work / puzzle-explore + light combat' },
    'cards.c5b': { zh: '帮鬼魂老农找回一生的记忆，让农场破晓复活。', en: 'Help a ghost farmer recover a lifetime of memories, and the farm revives at daybreak.' },
    'cards.c6t': { zh: '玛卡薇 · 缚命船医', en: 'Makavi · Bonebinder Surgeon' },
    'cards.c6tag': { zh: 'LOLM 英雄设计 / 个人独立 / 数值 · 对抗平衡', en: 'Wild Rift champion design / solo work / numbers & counterplay' },
    'cards.c6b': { zh: '把队友本会致死的伤，替他扛下来。', en: 'Takes the damage that would have killed a teammate.' },
    'cards.c7t': { zh: 'AI 项目管理', en: 'AI Game PM' },
    'cards.c7tag': { zh: '游戏项目管理 / AI 工作流 / 在线风险看板', en: 'Game project management / AI workflow / live risk dashboard' },
    'cards.c7b': { zh: 'AI 做杠杆不做拐杖，一屏收敛进度 · 风险 · 舆情。', en: 'AI as leverage, not a crutch — progress, risk, sentiment on one screen.' },
    'cards.tbc': { zh: 'TO BE CONTINUED…', en: 'TO BE CONTINUED…' },
    'cards.tbcs': { zh: '下一话 · 更多作品正在赶来', en: 'Next issue · more works on the way' },

    'jl.num': { zh: 'ISSUE #01 · 游戏概念设计', en: 'ISSUE #01 · GAME CONCEPT' },
    'ps.num': { zh: 'ISSUE #02 · 活动策划', en: 'ISSUE #02 · EXPERIENCE DESIGN' },
    'sy.num': { zh: 'ISSUE #03 · 活动策划', en: 'ISSUE #03 · EXPERIENCE DESIGN' },
    'jl.title': { zh: '金陵残梦', en: 'JINLING DREAM' },
    'jl.meta': { zh: '个人独立完成 · 策划 / 叙事 / 关卡 / 美术 / AI 工作流 · 2026.03 – 至今', en: 'Solo project · design / narrative / levels / art / AI workflow · 2026.03 – present' },
    'jl.quote': { zh: '“共入金陵旧梦，<br>各得一双眼睛。”', en: '"Enter the old dream of Jinling together —<br>each receives a different pair of eyes."' },
    'jl.desc': { zh: '以《红楼梦》为蓝本的<b>双人协作叙事冒险游戏</b>概念（PC / Steam）。两名玩家分屏操控代表理性的<b class="t-cyan">石青</b>与代表感性的<b class="t-pink">温遇</b>——在同一个世界看见不同真相，协作解放被困灵魂，以对话选择决定关系走向。', en: 'A <b>two-player co-op narrative adventure</b> concept (PC / Steam) based on <i>Dream of the Red Chamber</i>. In split-screen, <b class="t-cyan">Shi Qing</b> (reason) and <b class="t-pink">Wen Yu</b> (feeling) see different truths in the same world, free trapped souls together, and shape their bond through dialogue.' },
    'jl.h1': { zh: '双人分屏即叙事', en: 'Split-screen IS the narrative' },
    'jl.h1d': { zh: '石青·结构层 / 温遇·情感层两套真相，单视角无法通关', en: 'Two truth layers — structure vs. emotion; no single view can finish the game' },
    'jl.h2': { zh: '双层真相', en: 'Double-layer truth' },
    'jl.h2d': { zh: '缺一不可——「对话节点」按理解度 × 靠近度导向四种关系结局', en: 'Dialogue nodes route understanding × closeness into four relationship endings' },
    'jl.h3': { zh: '全程无 UI', en: 'Zero UI' },
    'jl.h3d': { zh: '沉浸呈现，六章「人物困境 → 玩法转译」关卡 + 多阶段心魔 Boss', en: 'Six chapters of "character struggle → mechanic translation" + multi-phase inner-demon boss' },
    'jl.h4': { zh: '垂直切片', en: 'Vertical slice' },
    'jl.h4d': { zh: '已产出《花冢未眠》垂直切片脚本', en: 'Script of the slice "The Flower Mound Never Sleeps" delivered' },
    'jl.pv': { zh: '▶ 概念 PV · 112s · AI 动态分镜', en: '▶ Concept PV · 112s · AI animatics' },
    'jl.s1': { zh: '美术概念集', en: 'Art Concept Collection' },
    'jl.s1s': { zh: 'ART CONCEPT COLLECTION · 35P · 点击放大', en: '35 PAGES · CLICK TO ZOOM' },
    'jl.s2': { zh: '概念 PPT 节选', en: 'Concept Deck' },
    'jl.demo': { zh: '🎮 在线试玩 · 黛玉章可玩切片', en: '🎮 PLAY THE DEMO · Daiyu Chapter Slice' },
    'jl.demoNote': { zh: '境内网络若打不开，需切换外网环境', en: 'May require VPN access in mainland China' },
    'jl.b1': { zh: '⚡ 进入交互式导航网站', en: '⚡ Open the interactive hub site' },
    'jl.b2': { zh: '📄 完整概念设计文档', en: '📄 Full concept design doc' },
    'jl.b3': { zh: '📑 概念 PPT', en: '📑 Concept deck PDF' },
    'jl.dnum': { zh: 'ISSUE #01.5 · 衍生宇宙', en: 'ISSUE #01.5 · SPIN-OFF UNIVERSE' },
    'jl.dtitle': { zh: '从屏幕里长出来的《金陵残梦》', en: 'Jinling, growing out of the screen' },
    'jl.d1': { zh: '互动声景装置', en: 'Interactive Soundscape Device' },
    'jl.d1d': { zh: '旋钮划过四段时空——<b class="t-cyan">筑梦·古琴</b> → <b>同感·箫琵琶</b> → <b class="t-pink">悟命·二胡</b> → <b>幻灭·扬琴</b>。Arduino + DFPlayer 实体装置，把游戏的四幕情绪做成可以「拧」的音景。', en: 'A knob sweeps four eras — <b class="t-cyan">Dream-building · guqin</b> → <b>Empathy · xiao & pipa</b> → <b class="t-pink">Awakening · erhu</b> → <b>Disillusion · yangqin</b>. An Arduino + DFPlayer device that makes the game\'s four acts twistable.' },
    'jl.d2': { zh: '衍生 APP《金陵梦境 · 梦觉》', en: 'Companion App "Dream Awakening"' },
    'jl.d2d': { zh: '将游戏世界观延展为移动端梦境应用概念——以「梦觉」为线索的界面与体验设计。', en: 'The game world extended into a mobile dream-app concept — UI and experience design built around "dream awakening".' },
    'jl.d2b': { zh: '📄 查看完整方案', en: '📄 Full proposal PDF' },

    'ps.title': { zh: '记忆当铺', en: 'MEMORY PAWNSHOP' },
    'ps.meta': { zh: '五感沉浸式体验 · 校园策划课路演 · 8 人小组 / 主策划兼统筹（分工 · 台本 · 培训 · 节点） · 2026.04', en: 'Five-sense immersive experience · campus roadshow · 8-person team / lead designer & coordinator · 2026.04' },
    'ps.quote': { zh: '“用五感，典当你的记忆。”', en: '"Pawn your memories — through the five senses."' },
    'ps.desc': { zh: '面向全校路演的沉浸式体验（「超级感官」命题）。把抽象情感转化为<b>可量化反馈</b>——按情感重量结算「典金」，配合逐步解锁的彩蛋机制；破解「去屏幕化」限制，用<b class="t-pink">听 / 嗅 / 触</b>三感搭建对应三段人生的感官舱。', en: 'A campus-wide immersive show (brief: "super senses"). Abstract feelings become <b>quantifiable feedback</b> — "pawn gold" settled by emotional weight, with gradually unlocked easter eggs. Under a no-screen constraint, <b class="t-pink">hearing / smell / touch</b> pods stage three stages of a life.' },
    'ps.f1': { zh: '典当', en: 'Pawn' }, 'ps.f2': { zh: '蒙眼入舱', en: 'Blindfolded entry' }, 'ps.f3': { zh: '睁眼探索', en: 'Eyes-open explore' }, 'ps.f4': { zh: '记忆长廊', en: 'Memory corridor' },
    'ps.vlog': { zh: '▶ 活动 vlog · 现场实录', en: '▶ Event vlog · on site' },
    'ps.c1': { zh: '典当单收据设计', en: 'Pawn-ticket receipt design' },
    'ps.c2': { zh: '活动流程图', en: 'Experience flowchart' },
    'ps.c3': { zh: '引导员台本（共三部分）', en: 'Guide script (3 parts)' },
    'ps.c4': { zh: '采购清单与统筹', en: 'Procurement & coordination' },
    'ps.s1': { zh: '汇报 PPT', en: 'Final Deck' },
    'ps.s1s': { zh: '13P · 独立完成', en: '13 PAGES · SOLO' },
    'ps.b1': { zh: '📑 下载汇报 PPT', en: '📑 Download the deck' },

    'sy.title': { zh: '你就是系统', en: 'YOU ARE THE SYSTEM' },
    'sy.meta': { zh: '人体互动画布 · 数字艺术互动体验 · 8 人小组 / 主策划兼统筹（创意 · 管线 · 动线 · 培训） · 2026.03', en: 'Human interactive canvas · digital-art experience · 8-person team / lead designer & coordinator · 2026.03' },
    'sy.quote': { zh: '“数字艺术 = 你的动作 + 系统的回应。”', en: '"Digital art = your motion + the system\'s response."' },
    'sy.desc': { zh: '面向全班 29 人的互动体验，主题与核心创意均由本人构思。设计<b class="t-cyan">「人肉实时渲染」管线</b>：体验者做动作 → 侧面模仿者复现 → 背面绘画者实时成画，构建动作—反馈闭环。<b>零硬件落地</b>，划分体验 / 绘画区与动线，制作循环讲解视频并培训执行。', en: 'An interactive piece for a 29-person class; theme and core idea both mine. A <b class="t-cyan">"human real-time render" pipeline</b>: the participant moves → a mimic restages it → a painter renders it live, closing the action–feedback loop. <b>Zero hardware</b>: zoned floor plan, looping tutorial video, trained executors.' },
    'sy.p1': { zh: '体验者', en: 'Participant' }, 'sy.p2': { zh: '模仿者', en: 'Mimic' }, 'sy.p3': { zh: '绘画者', en: 'Painter' }, 'sy.p4': { zh: '实时成画', en: 'Live painting' },
    'sy.vlog': { zh: '▶ 活动 vlog', en: '▶ Event vlog' },
    'sy.m1': { zh: '宣传物料', en: 'Promo material' },
    'sy.m2': { zh: '前期独立产出：《临界场》空间叙事拆解', en: 'Earlier solo work: spatial narrative breakdown of "Critical Field"' },
    'sy.s1': { zh: '宣讲 PPT', en: 'Pitch Deck' },
    'sy.b1': { zh: '📑 下载宣讲 PPT', en: '📑 Download the deck' },

    'fm.num': { zh: 'ISSUE #04 · 关卡设计', en: 'ISSUE #04 · LEVEL DESIGN' },
    'fm.title': { zh: '闹鬼农场', en: 'HAUNTED FARM' },
    'fm.meta': { zh: '个人独立完成 · 关卡设计 / UE5.8 白盒 · 寻物解谜 + 轻战斗', en: 'Solo · Level design / UE5.8 white-box · puzzle-explore + light combat' },
    'fm.quote': { zh: '“让老莫安息，<br>让农场重新活过来。”', en: '"Let Old Mo rest —<br>let the farm come alive again."' },
    'fm.desc': { zh: '一张 150×150m · 固定夜晚 · 微恐治愈的 <b>UE5.8 白盒关卡</b>。你扮演闯入农场的旅人，帮鬼魂老农<b class="t-cyan">老莫</b>找回散落各处的 6 件遗物、6 段记忆，让他安息、让农场破晓复活。主玩法寻物解谜，副玩法轻战斗（守门恶灵）。', en: 'A <b>UE5.8 white-box level</b> — 150×150m, permanent night, mildly-eerie yet healing. You play a traveler who wanders in and helps the ghost of old farmer <b class="t-cyan">Old Mo</b> recover 6 relics and 6 memories scattered across the map — so he can rest and the farm revives at daybreak. Main loop: item-finding puzzles; sub-loop: light combat against gatekeeper wraiths.' },
    'fm.h1': { zh: '叙事即关卡骨架', en: 'Narrative as the level skeleton' },
    'fm.h1d': { zh: '老莫一生「希望→相爱→成家→失去→孤独→释怀」的情感弧线，决定 6 件遗物由低到高、由易到难的摆放——难度递进与情感递进合一。', en: 'Old Mo\'s life arc (hope, love, family, loss, solitude, peace) sets the 6 relics low-to-high and easy-to-hard: difficulty progression fused with emotional progression.' },
    'fm.h2': { zh: '集齐遗物 · 破晓复活', en: 'Collect the relics · daybreak revival' },
    'fm.h2d': { zh: '散落各处的 6 件遗物、6 段记忆逐一归位，集齐后触发「破晓复活」结局——夜色农场在黎明中重新活过来。', en: 'The 6 relics and 6 memories are recovered one by one; collecting them all triggers the "daybreak revival" finale — the night farm comes alive at dawn.' },
    'fm.h3': { zh: '成体系的关卡指引性', en: 'A systematic guidance framework' },
    'fm.h3d': { zh: '不靠任务箭头，用高处观察点、三类灯光语义（金=终点／青=任务点／暖=路径）、动作教学曲线、NPC 兜底与防迷路 HUD，把视线自然勾向目标。', en: 'No quest arrows: vantage points, three light semantics (gold = goal / cyan = POI / warm = path), an action-teaching curve, NPC fallback and an anti-lost HUD steer the eye.' },
    'fm.h4': { zh: '蓝图落地 + 诚实取舍', en: 'Built in Blueprints, honest scope' },
    'fm.h4d': { zh: '收集计数、集齐通关、破晓结局与轻战斗皆蓝图实现；玩法外以占位符＋文档／录屏讲意图，坚持「宁可少而完整，不做多而半残」。', en: 'Collection counting, win-on-complete, the daybreak finale and light combat are all built in Blueprints; the rest is placeheld with documented intent — rather less-but-complete than more-but-half-broken.' },
    'fm.pv': { zh: '▶ 关卡解说录屏 · UE5 白盒实机走查', en: '▶ Narrated walkthrough · UE5 white-box playthrough' },
    'fm.s1': { zh: '关卡设计文档', en: 'Level Design Doc' },
    'fm.s1s': { zh: 'LEVEL DESIGN DOC · 9P · 点击放大', en: 'LEVEL DESIGN DOC · 9 PAGES · CLICK TO ZOOM' },
    'fm.b1': { zh: '📄 完整关卡设计文档', en: '📄 Full level design doc' },

    'mb.num': { zh: 'ISSUE #05 · 英雄设计', en: 'ISSUE #05 · CHAMPION DESIGN' },
    'mb.title': { zh: '玛卡薇 · 缚命船医', en: 'MAKAVI' },
    'mb.meta': { zh: '个人独立完成 · 英雄设计 / 数值与对抗平衡 · LOLM 7.1g · 2026', en: 'Solo · Champion design / systems & counterplay balance · LOLM 7.1g · 2026' },
    'mb.quote': { zh: '“你死不了——<br>今天，我替你扛。”', en: '"You won\'t die —<br>today, I take the hit for you."' },
    'mb.desc': { zh: '一份《英雄联盟手游》英雄设计课题。先以国服 <b>1290 场</b>一手体验，从故事 / 美术 / 机制三维度拆解全游戏最难平衡的软辅<b class="t-cyan">「悠米」</b>，提炼出「极低个人能动性 ↔ 极高团队影响力」的结构性难题；再据此原创功能辅<b class="t-pink">「缚命船医 · 玛卡薇」</b>——招牌大招 R「替死契」把队友本会致死的伤害按 50/65/80% 接到自己身上。', en: 'A champion-design brief for League of Legends: Wild Rift. Drawing on <b>1290 hands-on games</b>, it reverse-engineers the game\'s hardest-to-balance enchanter <b class="t-cyan">Yuumi</b> across lore / art / mechanics to distill the tension "minimal personal agency ↔ maximal team impact," then answers it with an original functional support — <b class="t-pink">the Bonebinder Surgeon Makavi</b>, whose ultimate "Death Pact (R)" transfers 50/65/80% of a teammate\'s lethal damage onto herself.' },
    'mb.h1': { zh: '从拆解到原创', en: 'From teardown to original' },
    'mb.h1d': { zh: '以 1290 场一手体验拆解软辅「悠米」，提炼出「低能动性↔高影响力」的结构性难题作为设计命题。', en: 'Deconstructs enchanter Yuumi from 1290 hands-on games to surface the structural problem "low agency, high impact" as the design brief.' },
    'mb.h2': { zh: '招牌大招 R「替死契」承伤转移', en: 'Signature ultimate: Death Pact' },
    'mb.h2d': { zh: '玛卡薇把队友本会致死的伤按 50/65/80% 接到自己身上——补上手游保护辅「没人走过的空位」。', en: 'Makavi\'s R transfers 50/65/80% of a teammate\'s lethal damage onto herself — filling a support niche no Wild Rift champion occupies.' },
    'mb.h3': { zh: '完整数值框架 + 15 级加点', en: 'Full numbers framework' },
    'mb.h3d': { zh: '五技能逐项给出伤害/CD/蓝耗/护盾成长与功率梯度：只 R 最强、其余压平但下限做足。', en: 'Every ability specs damage / CD / mana / shield scaling with a power gradient: only R peaks, the rest flattened with a solid floor.' },
    'mb.h4': { zh: 'AI 建模四步平衡评估', en: 'AI-modeled balance pass' },
    'mb.h4d': { zh: '不靠纯 Excel 手算，用 AI 搭对局模拟环境，按基础对标→木桩→全对局→调整预案验证「不过强、不偏弱、不挤占」。', en: 'Not hand-tuned in Excel: an AI-built combat sim validates "not overtuned, not weak, doesn\'t crowd out" across four steps.' },
    'mb.s1': { zh: '英雄设计文档', en: 'Champion Design Deck' },
    'mb.s1s': { zh: 'CHAMPION DESIGN · 25P · 拆解 → 原创 → 平衡评估', en: 'CHAMPION DESIGN · 25 PAGES · teardown → design → balance' },
    'mb.b1': { zh: '📄 完整英雄设计文档', en: '📄 Full champion design doc' },

    'pm.num': { zh: 'ISSUE #06 · 项目管理', en: 'ISSUE #06 · PROJECT MGMT' },
    'pm.title': { zh: 'AI 赋能游戏项目管理', en: 'AI-EMPOWERED GAME PM' },
    'pm.meta': { zh: '个人作业 · 游戏项目管理 / 新人 PM 全链路推演 · 蓝本：英雄联盟手游 7.1「全速竞逐」', en: 'Solo coursework · Game project management / new-PM full-lifecycle playbook · Blueprint: LOL Mobile 7.1' },
    'pm.quote': { zh: '“AI 做杠杆，<br>不做拐杖。”', en: '"AI as leverage,<br>not a crutch."' },
    'pm.desc': { zh: '以《英雄联盟手游》7.1「全速竞逐」为蓝本，沿「快速接手 → 冲刺管理 → 复盘规划」全链路推演一名新人 PM 的工作方法：项目认知地图、48h 上手 SOP、冲刺期人力/需求/范围三冲突决策、需求变更会议纪要、版本复盘框架与三个月 Roadmap，并落地一块<b class="t-cyan">已上线的「版本风险与进度看板」</b>。', en: 'Using LOL Mobile 7.1 "Full-Speed Chase" as a blueprint, it walks a new PM\'s full workflow — onboarding → sprint management → retrospective: a project-cognition map, a 48h onboarding SOP, decisions on three sprint-phase conflicts (staffing / scope / testing), a change-review meeting record, a retro framework and a three-month roadmap — plus a <b class="t-cyan">deployed "version risk & progress dashboard."</b>' },
    'pm.h1': { zh: '全链路 PM 推演', en: 'Full-lifecycle PM playbook' },
    'pm.h1d': { zh: '快速接手→冲刺管理→复盘规划：认知地图、48h 上手 SOP、复盘框架与三个月 Roadmap 一气贯通。', en: 'Onboarding, sprint management and retrospective chained end to end: cognition map, 48h SOP, retro framework and a three-month roadmap.' },
    'pm.h2': { zh: '一屏收敛的在线看板', en: 'One-screen live risk dashboard' },
    'pm.h2d': { zh: '「进度 · 三大风险 · 舆情健康度」一屏收敛，已部署上线（Vercel），支撑早预警、早决策。', en: 'Progress, three key risks and sentiment health converged on one screen, deployed live (Vercel) for early warning and early decisions.' },
    'pm.h3': { zh: '冲突分诊 · 资源一本账', en: 'Conflict triage on one ledger' },
    'pm.h3d': { zh: '以「紧急度×影响面」把人力/需求/范围三案排成一个冲刺方案，而非三个孤立决定。', en: 'By urgency × impact, staffing / scope / testing conflicts are resolved as one sprint plan, not three isolated calls.' },
    'pm.h4': { zh: 'AI 做杠杆不做拐杖', en: 'AI as leverage, not a crutch' },
    'pm.h4d': { zh: '一手优先、双源交叉、敢列局限；AI 出方案、人拍板与校正，附完整人机交互记录。', en: 'First-hand first, two-source cross-check, limits stated openly; AI drafts and the human decides and corrects, with a full interaction log.' },
    'pm.board': { zh: '在线「版本风险与进度看板」· 进度 · 风险 · 舆情，一屏收敛', en: 'Live "version risk & progress dashboard" — progress, risk, sentiment on one screen' },
    'pm.s1': { zh: '全流程交付文档', en: 'Full-lifecycle Deliverable' },
    'pm.s1s': { zh: 'PM DELIVERABLE · 17P · 认知地图 → 冲突决策 → 复盘 Roadmap', en: 'PM DELIVERABLE · 17 PAGES · cognition → decisions → roadmap' },
    'pm.b1': { zh: '⚡ 打开在线风险看板', en: '⚡ Open the live dashboard' },
    'pm.b2': { zh: '📄 完整 PM 交付文档', en: '📄 Full PM deliverable' },
    'pm.b3': { zh: '📋 项目管理简历', en: '📋 PM resume' },

    'ga.num': { zh: 'BONUS ISSUE · 番外', en: 'BONUS ISSUE' },
    'ga.title': { zh: '游戏美术', en: 'GAME ART' },
    'ga.meta': { zh: '2D 角色设计 · 游戏场景构图与绘画 · 多格漫画分镜与排版 · 速写', en: '2D character design · scene composition & painting · comic storyboards · sketching' },
    'ga.b1': { zh: '📄 美术能力说明', en: '📄 Art capability notes' },

    'sk.title': { zh: '装备库', en: 'EQUIPMENT' },
    'sk.meta': { zh: 'AI 工具链贯穿「设计 → 验证 → 产出」全流程 · 设计判断与取舍均由本人完成', en: 'An AI toolchain runs through design → validation → delivery · every judgment call is mine' },
    'sk.w1': { zh: '设计 · 论证', en: 'Design · Debate' },
    'sk.w1d': { zh: 'Claude / Gemini / GPT 交叉讨论验证迭代，作「会反驳的策划搭档」产出概念文档', en: 'Claude / Gemini / GPT cross-examine ideas as "design partners who talk back", producing concept docs' },
    'sk.w2': { zh: '概念美术', en: 'Concept Art' },
    'sk.w2d': { zh: 'GPT Image 逐张打磨提示词，生成统一水墨风格全套概念图', en: 'GPT Image, prompt-by-prompt, for a consistent ink-wash concept set' },
    'sk.w3': { zh: '概念 PV', en: 'Concept PV' },
    'sk.w3d': { zh: '即梦 Seedance / 可灵图生视频，剪映剪辑 + AI 配音字幕，合成动态分镜', en: 'Jimeng Seedance / Kling image-to-video, CapCut editing + AI voiceover for animatics' },
    'sk.w4': { zh: '工程交付', en: 'Engineering' },
    'sk.w4d': { zh: 'Claude Code 搭建 Next.js 导航网站，产出 PPT / PDF 交付物', en: 'Claude Code builds the Next.js hub site, plus PPT / PDF deliverables' },
    'sk.web': { zh: '技能蛛网', en: 'Skill Web' },
    'sk.webs': { zh: 'SKILL UNIVERSE · 点亮试试', en: 'SKILL UNIVERSE · LIGHT THEM UP' },
    'sk.gamer': { zh: '玩家档案', en: 'Player Profile' },
    'sk.gamers': { zh: 'PLAYER PROFILE · 游戏经历与设计素养', en: 'GAMES PLAYED & DESIGN LITERACY' },
    'sk.g1': { zh: '叙事 / 情感体验', en: 'Narrative / Emotional' },
    'sk.gcore': { zh: '核心方向', en: 'CORE' },
    'sk.gcore2': { zh: '核心方向', en: 'CORE' },
    'sk.g2': { zh: '双人协作 / 非对称', en: 'Co-op / Asymmetric' },
    'sk.g2d': { zh: '双人成行 · 双影奇境 · 胡闹厨房 · 猫和老鼠手游——研究非对称协作与信息差机制', en: 'It Takes Two · Split Fiction · Overcooked · Tom and Jerry Chase — studying asymmetric co-op and information-gap mechanics' },
    'sk.g3': { zh: '多品类涉猎', en: 'Wide-ranging' },
    'sk.g3d': { zh: '英雄联盟手游 · 和平精英 · 使命召唤手游 · 明日方舟 · 我的世界 · 奇迹暖暖 · 食物语 · Phigros', en: 'Wild Rift · PUBG Mobile · CoD Mobile · Arknights · Minecraft · Miracle Nikki · Food Fantasy · Phigros' },

    'ct.title': { zh: '一起做游戏？', en: 'MAKE GAMES TOGETHER?' },
    'ct.sub': { zh: '意向岗位：游戏策划 / 项目管理（日常实习） · 随时可以聊', en: 'Looking for: game design / project management internships · always up for a chat' },
    'ct.open': { zh: 'OPEN TO', en: 'OPEN TO' },
    'ct.opend': { zh: '游戏策划 / 项目管理日常实习 · 叙事 · 系统 · 关卡 · 统筹 · 通常 24h 内回复', en: 'Game design & PM internships · narrative / systems / levels / coordination · usually replies within 24h' },
    'ct.resume': { zh: '策划简历 PDF', en: 'Game-design resume' },
    'ct.resumePm': { zh: '项目管理简历 PDF', en: 'PM resume' },
    'ct.footer': { zh: '© 2026 莫心雅 CYNTHIA · 用 <span class="t-pink">♥</span> 与蛛丝织成 · Inspired by the Spider-Verse / Earth-65', en: '© 2026 MO XINYA / CYNTHIA · woven with <span class="t-pink">♥</span> and webbing · Inspired by the Spider-Verse / Earth-65' }
  };

  var lang = 'zh';
  try { lang = localStorage.getItem('cy-lang') || 'zh'; } catch (e) {}

  function apply() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = lang === 'zh'
      ? '莫心雅 CYNTHIA · 游戏策划 × 项目管理'
      : 'CYNTHIA MO · Game Designer & PM Portfolio';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var entry = D[el.dataset.i18n];
      if (entry) el.innerHTML = entry[lang];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var entry = D[el.dataset.i18nPh];
      if (entry) el.placeholder = entry[lang];
    });
    var t = document.getElementById('langToggle');
    if (t) {
      t.querySelector('.lt-zh').classList.toggle('is-on', lang === 'zh');
      t.querySelector('.lt-en').classList.toggle('is-on', lang === 'en');
    }
  }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem('cy-lang', l); } catch (e) {}
    apply();
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: l } }));
  }

  window.I18N = {
    get lang() { return lang; },
    t: function (key) { var e = D[key]; return e ? e[lang] : key; },
    setLang: setLang,
    apply: apply
  };

  document.addEventListener('DOMContentLoaded', function () {
    apply();
    var t = document.getElementById('langToggle');
    if (t) t.addEventListener('click', function () { setLang(lang === 'zh' ? 'en' : 'zh'); });
  });
})();
