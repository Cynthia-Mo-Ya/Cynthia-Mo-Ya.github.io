/* CYNTHIA portfolio · v2 features: letter wall / spider QA / dossier / cards / skill web */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof gsap !== 'undefined';
  var L = function () { return (window.I18N && window.I18N.lang) || 'zh'; };

  /* ════════ 1. LETTER WALL ════════ */
  var letters = document.querySelectorAll('#decodeLetters .dletter');
  var ghosts = document.querySelectorAll('.decode-ghost i');
  var autoTimer = null, autoIdx = 0, interacted = false;

  letters.forEach(function (li, i) {
    li.addEventListener('mouseenter', function () {
      interacted = true; clearLit();
      if (ghosts[i]) ghosts[i].classList.add('lit');
    });
    li.addEventListener('mouseleave', function () {
      if (ghosts[i]) ghosts[i].classList.remove('lit');
    });
    /* 触屏：点按点亮 */
    li.addEventListener('click', function () {
      interacted = true;
      var on = li.classList.contains('lit');
      clearLit();
      if (!on) li.classList.add('lit');
    });
  });
  function clearLit() {
    clearInterval(autoTimer); autoTimer = null;
    letters.forEach(function (el) { el.classList.remove('lit'); });
    ghosts.forEach(function (el) { el.classList.remove('lit'); });
  }
  function startAutoCycle() {
    if (interacted || reduced || autoTimer) return;
    autoTimer = setInterval(function () {
      letters.forEach(function (el) { el.classList.remove('lit'); });
      ghosts.forEach(function (el) { el.classList.remove('lit'); });
      var li = letters[autoIdx % letters.length];
      var gi = ghosts[autoIdx % ghosts.length];
      if (li) li.classList.add('lit');
      if (gi) gi.classList.add('lit');
      autoIdx++;
      if (autoIdx > letters.length * 2) clearLit();
    }, 900);
  }

  if (hasGsap && !reduced && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('#decodeLetters .dletter', {
      x: -90, opacity: 0, skewX: -12, stagger: .09, duration: .6, ease: 'power3.out',
      scrollTrigger: { trigger: '#decodeLetters', start: 'top 78%', onEnter: startAutoCycle }
    });
  }

  /* ════════ 2. SPIDER QA ════════ */
  var PROXY_URL = 'https://cynthia-spider.vercel.app/api/ask';

  var KB = [
    { k: /投放|宣传渠道|宣传范围|哪些群|哪几个群|outreach|promotion channels|which communities/i,
      zh: "水友赛实际投放了三个光核社群：微信「【光核共创营】实战训练生1期」、QQ「【光核】高校共创营1群」和 QQ「【光核】玩家前哨」。团队讨论了宣传范围与报名规模、工作量和赛程的关系，最终在这三个群开展投放，比赛在抖音直播。",
      en: "Cup outreach used three communities: the cohort-one training group on WeChat, the Guanghe college co-creation application group on QQ, and the Guanghe Player Outpost on QQ. The team weighed recruitment scale against workload and schedule. The final livestream ran on Douyin." },
    { k: /无畏|水友赛|赛事|赛程|比赛|解说|集锦|valorant|tournament|community cup|caster|highlights/i,
      zh: "这场无畏契约水友赛是光核共创营一期的小组实践，2026 年 6 月 25–27 日依次进行海选、小组赛、半决赛与总决赛，最终在抖音直播。报名表共 33 人，确认 30 人、替补 2 人、未确认 1 人。心雅参与共同策划，主要负责宣传与赛程图、报名和比赛群组织、公告及集锦剪辑，并协调补充第二位解说。可在「赛事与活动」查看图片、5 份文档和完整集锦。",
      en: "The VALORANT Community Cup was a team project in camp S1, held June 25–27, 2026: qualifiers, groups, then semifinals and the final, streamed on Douyin. The roster records 33 registrations: 30 confirmed, two substitutes and one unconfirmed. Cynthia co-planned it, made most promo and schedule graphics, organized groups and announcements, edited the highlights and recruited a second caster. The Events section has five PDFs and the full video." },
    { k: /闹鬼|农场|白盒|haunted|farm|ue5/i,
      zh: "《闹鬼农场》是她的 UE5 白盒关卡作品：用寻找 6 件遗物串起鬼魂老农的记忆，以观察点、灯光语义和动线帮助玩家探索。她关注叙事如何影响物件摆放、难度与节奏，网站里有完整关卡文档和实机解说录屏。",
      en: "Haunted Farm is her UE5 level-design blockout. Six relics connect a ghost farmer’s memories; viewpoints, lighting cues and routes guide exploration. It shows how narrative shapes placement, difficulty and pacing. The site includes the level document and a narrated walkthrough." },
    { k: /玛卡薇|缚命|英雄设计|数值|平衡|makavi|moba|hero design|balance/i,
      zh: "「玛卡薇·缚命船医」是光核共创营的英雄设计与对抗平衡课题。她从悠米的一手体验拆解软辅的能动性与团队影响力，设计技能组、数值和加点框架，并借助 AI 模拟辅助评估；机制取舍与结果判断由她负责。",
      en: "Makavi is her camp brief on hero design and counterplay. Drawing on her Yuumi experience, she examines support agency versus team impact, develops an ability kit and numerical framework, and uses AI-assisted simulations to inform evaluation. She owns the design decisions and review." },
    { k: /金陵|黛玉|jinling|daiyu/i,
      zh: "《金陵残梦》以《红楼梦》为蓝本，把结构与情感两套视角转成双人协作机制。作品包含策划文档、美术、概念 PV、展示材料与导航网站。她负责创意、机制与视觉取舍，并借助 AI 完成部分制作和工程实现。",
      en: "Remnant Dream of Jinling adapts Dream of the Red Chamber into co-op play through structural and emotional viewpoints. It includes design documents, art, a concept video, presentation materials and an interactive project hub. Cynthia directs the creative, mechanical and visual decisions, with AI assistance in production and engineering." },
    { k: /综合简历|简历|resume|cv/i,
      zh: "首页点击「CYNTHIA」档案夹，里面保留了完整综合简历：点击简历纸张或底部的「阅读完整综合简历」即可打开 PDF。旁边的便签概括项目成果，背面纸片列出设计、统筹、赛事执行和 AI 辅助工作流。",
      en: "Open the CYNTHIA dossier on the homepage, then select the resume sheet or its caption to open the complete resume PDF. The notes summarize project evidence, while the sheet behind it outlines design, coordination, event delivery and AI-assisted work." },
    { k: /项目管理|统筹|敏捷|看板|风险|复盘|光核|共创营|\bpm\b|agile|scrum|kanban|dashboard/i,
      zh: 'PM 方向的代表作是「AI 赋能游戏项目管理」（光核共创营课题三）：以 LOLM 7.1 为蓝本推演新人 PM 全链路——认知地图、48h 上手 SOP、冲刺期三冲突决策、复盘框架与三个月 Roadmap，还有一块已上线的「版本风险与进度看板」。她以结业总分第一从光核共创营一期毕业（三份课题 10/10/8），再加上两次带 8 人团队主策划兼统筹的落地经验，她相信 PM 最关键的是让信息透明、让节奏可控。',
      en: 'Her flagship PM work: "AI-Empowered Game PM" (co-creation camp brief #3) — a new-PM full-lifecycle playbook on LOL Mobile 7.1 (cognition map, 48h onboarding SOP, sprint conflict decisions, retro framework, three-month roadmap) plus a live version-risk dashboard. She graduated from LIGHTSPEED STUDIOS\' co-creation camp S1 with the No.1 overall score (briefs 10/10/8). Add twice leading an 8-person team as lead & coordinator, and her core belief: a PM\'s job is keeping information transparent and the rhythm under control.' },
    { k: /项目|做过|作品|经历|\bprojects?\b|\bworks?\b|portfolio/i,
      zh: "心雅的作品集现在有八项作品：《金陵残梦》、衍生宇宙、《记忆当铺》、《你就是系统》、《闹鬼农场》、《玛卡薇·缚命船医》、AI 赋能游戏项目管理，以及无畏契约娱乐水友赛。它们覆盖游戏设计、团队协作、赛事活动与视觉表达；卡墙和各项目章节都有对应材料。",
      en: "Her portfolio now has eight projects: Remnant Dream of Jinling, its spin-off universe, The Memory Pawnshop, You Are The System, Haunted Farm, Makavi, AI-Empowered Game PM, and the VALORANT Community Cup. Together they cover game design, teamwork, events and visual expression. Each has a project card and supporting materials." },
    { k: /红楼|文学|\bip\b|改编|为什么/i,
      zh: '为什么是《红楼梦》？因为它本身就是一场「双视角的梦」——世人看见繁华，黛玉看见将散的宴席。心雅把这种「同一世界、两套真相」转译成双人分屏机制：石青看见结构，温遇看见情感，缺一不可。文学不是皮，是机制的源头。',
      en: 'Why Dream of the Red Chamber? Because the novel itself is a dream with two readings — the world sees splendor, Daiyu sees the feast about to scatter. Cynthia translates that into split-screen mechanics: one player reads structure, the other reads emotion, and neither view alone can finish the game. Literature is not a skin here — it is where the mechanics come from.' },
    { k: /\bai\b|工作流|工具|claude|deepseek|gpt|流程/i,
      zh: "她用 Claude、Gemini、GPT 辅助梳理与交叉检验方案，用图像和视频工具制作概念美术、动态分镜，再借助 Claude Code、Codex 等完成部分工程操作。创意、机制取舍、事实核验和最终验收由她负责；工具使用经历与独立编程能力需要分别理解。",
      en: "She uses Claude, Gemini and GPT to develop and cross-check ideas, image and video tools for concept art and animatics, and assistants such as Claude Code and Codex for engineering tasks. She owns creative choices, mechanics, fact-checking and final review. Tool-assisted delivery should be distinguished from independent programming proficiency." },
    { k: /团队|合作|实习|岗位|招|join|team|intern/i,
      zh: "她的作品体现创意与体验设计、视觉表达、组织推进和 AI 辅助制作能力。已有两次 8 人团队主策划兼统筹经历，也参与了赛事策划与社群执行。她对不同领域的机会保持开放，可以根据具体需求介绍相关项目；合作方式和当前档期请直接联系本人。",
      en: "Her work demonstrates creative and experience design, visual communication, project coordination and AI-assisted production. She has led two eight-person projects and contributed to event planning and community delivery. She is open to opportunities across fields and can share relevant project evidence for a specific brief. Contact her about collaboration and availability." },
    { k: /教育|学校|大学|学历|背景|结业|school|edu/i,
      zh: '湖北大学数字媒体艺术本科（2025–2029），学业排名 1/120 专业第一；之前是广州美术学院附属中等美术学校美术方向，还有约一年动画专项训练。2026 年以结业总分第一从光子「光核共创营」一期毕业（优秀结业生，三份课题 10/10/8）。美术是童子功，策划与统筹是主修。',
      en: 'BA in Digital Media Art at Hubei University (2025–2029), ranked 1/120 — top of the major. Before that: the GAFA-affiliated art school plus ~a year of animation training. In 2026 she graduated from LIGHTSPEED STUDIOS\' co-creation camp S1 as a distinguished graduate with the No.1 overall score (briefs 10/10/8). Art is her foundation; design and coordination are her major.' },
    { k: /游戏|玩|喜欢|品味|play|game/i,
      zh: '她的游戏库分三层：叙事情感向（底特律变人、艾迪芬奇、锈湖、Journey、光遇）是核心；双人协作/非对称（双人成行、双影奇境、胡闹厨房、猫鼠）是研究方向；再加 MOBA/射击/养成/音游的广撒网。玩得多，拆得更多。',
      en: 'Three layers in her library: narrative/emotional games (Detroit, Edith Finch, Rusty Lake, Journey, Sky) at the core; co-op/asymmetric titles (It Takes Two, Split Fiction, Overcooked, Tom & Jerry Chase) as a research track; plus a wide net of MOBA / shooter / sim / rhythm. She plays a lot — and deconstructs more.' },
    { k: /联系|邮箱|电话|微信|contact|email|phone/i,
      zh: '邮箱 2062491054@qq.com，电话 135-5413-7459，GitHub @Cynthia-Mo-Ya。页面最底下的三个彩色纸条可以联系本人；完整综合简历在首页 CYNTHIA 档案夹内。',
      en: 'Email 2062491054@qq.com, phone 135-5413-7459, GitHub @Cynthia-Mo-Ya. The three colorful tapes at the bottom link to her contacts; the complete resume is in the CYNTHIA dossier on the homepage.' }
  ];
  var KB_FALLBACK = {
    zh: '这个问题有点超出我的蛛网范围🕸️ 试试问：她的八项作品、水友赛分工、项目统筹、AI 工作流或综合简历，或者直接发邮件 2062491054@qq.com 问真人。',
    en: 'That one is a bit outside my web 🕸️ Try asking about her eight projects, the cup, project coordination, AI-assisted work, or her resume — or email the human directly: 2062491054@qq.com.'
  };

  var spiderStage = document.getElementById('spiderStage');
  var noteQa = document.getElementById('spNoteQa');
  var spForm = document.getElementById('spForm');
  var spInput = document.getElementById('spInput');
  var spAsk = document.getElementById('spAsk');
  var spAnswer = document.getElementById('spAnswer');

  if (spiderStage) {
    spiderStage.addEventListener('click', function (e) {
      if (noteQa.contains(e.target)) return;
      noteQa.hidden = !noteQa.hidden;
      /* 触屏没有 hover：点开问答时同步迸发身后的蛛网 */
      spiderStage.classList.toggle('webon', !noteQa.hidden);
      if (!noteQa.hidden) {
        if (hasGsap && !reduced) {
          gsap.fromTo(noteQa, { y: 26, opacity: 0, rotate: -5 }, { y: 0, opacity: 1, rotate: -1.4, duration: .4, ease: 'back.out(1.6)' });
        }
        spInput.focus();
      }
    });
  }

  function typeOut(el, text) {
    el.classList.remove('thinking');
    if (reduced) { el.textContent = text; return; }
    el.textContent = '';
    var i = 0;
    var timer = setInterval(function () {
      el.textContent = text.slice(0, i += 2);
      if (i >= text.length) clearInterval(timer);
    }, 18);
  }

  function localAnswer(q) {
    for (var i = 0; i < KB.length; i++) {
      if (KB[i].k.test(q)) return KB[i][L()];
    }
    return KB_FALLBACK[L()];
  }

  function ask(q) {
    spAsk.disabled = true;
    spAnswer.classList.add('thinking');
    spAnswer.textContent = window.I18N ? window.I18N.t('spider.thinking') : '…';

    var ctrl = new AbortController();
    var timeout = setTimeout(function () { ctrl.abort(); }, 20000);

    fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q, lang: L() }),
      signal: ctrl.signal
    }).then(function (r) {
      clearTimeout(timeout);
      if (!r.ok) throw new Error('bad status ' + r.status);
      return r.json();
    }).then(function (data) {
      if (!data || !data.answer) throw new Error('empty');
      typeOut(spAnswer, data.answer);
    }).catch(function () {
      clearTimeout(timeout);
      typeOut(spAnswer, localAnswer(q));
    }).finally(function () {
      spAsk.disabled = false;
    });
  }

  if (spForm) {
    spForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = spInput.value.trim();
      if (!q) return;
      spInput.value = '';
      ask(q);
    });
  }

  /* ════════ 3. DOSSIER ════════ */
  var dossierCover = document.getElementById('dossierCover');
  var dossierSpread = document.getElementById('dossierSpread');
  var dossierClose = document.getElementById('dossierClose');
  var dossierBackdrop = document.getElementById('dossierBackdrop');

  /* 浮层挪到 body 下：原位置在 .hero-inner(z-index:2) 层叠上下文里，
     后续区块同为 z-index:2 时按 DOM 顺序压过浮层（手机上点开会被解码区文字穿透） */
  if (dossierSpread && dossierBackdrop) {
    document.body.appendChild(dossierBackdrop);
    document.body.appendChild(dossierSpread);
  }

  function openDossier() {
    dossierCover.hidden = true;
    dossierSpread.hidden = false;
    if (dossierBackdrop) dossierBackdrop.hidden = false;
    document.body.classList.add('dossier-open');
    if (hasGsap && !reduced) {
      gsap.fromTo(dossierSpread, { rotationY: -70, opacity: 0, transformOrigin: 'left center' },
        { rotationY: 0, opacity: 1, duration: .55, ease: 'power3.out' });
      if (dossierBackdrop) gsap.fromTo(dossierBackdrop, { opacity: 0 }, { opacity: 1, duration: .4 });
      gsap.from('.dossier-left > *', { y: 26, opacity: 0, stagger: .07, delay: .2, duration: .4 });
      gsap.from('.dossier-right > *', { x: 40, opacity: 0, stagger: .1, delay: .3, duration: .4 });
    }
  }
  function closeDossier() {
    document.body.classList.remove('dossier-open');
    if (dossierBackdrop && hasGsap && !reduced) gsap.to(dossierBackdrop, { opacity: 0, duration: .3, onComplete: function () { dossierBackdrop.hidden = true; } });
    else if (dossierBackdrop) dossierBackdrop.hidden = true;
    if (hasGsap && !reduced) {
      gsap.to(dossierSpread, {
        rotationY: -60, opacity: 0, duration: .35, ease: 'power2.in',
        onComplete: function () {
          dossierSpread.hidden = true; dossierCover.hidden = false;
          gsap.set(dossierSpread, { clearProps: 'all' });
          gsap.from(dossierCover, { scale: .9, opacity: 0, duration: .3 });
        }
      });
    } else {
      dossierSpread.hidden = true; dossierCover.hidden = false;
    }
  }
  if (dossierCover) dossierCover.addEventListener('click', openDossier);
  if (dossierClose) dossierClose.addEventListener('click', closeDossier);
  if (dossierBackdrop) dossierBackdrop.addEventListener('click', closeDossier);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && dossierSpread && !dossierSpread.hidden) closeDossier();
  });

  /* ════════ 4. PROJECT CARDS ════════ */
  var CARD_DATA = {
    valorant: {
      chips: { zh: ['赛事与活动', '团队共同策划', '2026.06.25—06.27'], en: ['Live event', 'Team planning', 'June 25–27, 2026'] },
      title: { zh: '无畏契约娱乐水友赛', en: 'VALORANT Community Cup' },
      sub: 'VALORANT COMMUNITY CUP',
      desc: { zh: '从群语音中的共同策划，到招募、赛程同步、直播与赛后集锦，和队友一起把一场面向玩家的娱乐水友赛落地。报名登记 33 人，确认选手 30 人；通过三个光核社群宣传，在抖音进行赛事直播。', en: 'From planning in team voice calls to recruitment, schedule updates, livestreaming and a highlight reel, we brought a community tournament to life. 33 registrations, 30 confirmed players, outreach across three Guanghe communities, and a Douyin livestream.' },
      role: { zh: '我的角色：参与团队共同策划；承担主要外宣图与赛程图制作、报名及比赛社群组织、公告发布和赛事集锦剪辑；协调同学补充第二位解说。', en: 'My role: I contributed to team planning, produced most promotional graphics and schedule visuals, organized registration and match groups, posted announcements, edited the highlight reel, and recruited a classmate as the second commentator.' },
      video: 'assets/video/valorant-highlights.mp4', poster: 'assets/img/valorant/video-poster.jpg',
      links: [{ t: { zh: '查看完整赛事档案 ↓', en: 'Explore the event ↓' }, h: '#events' }]
    },
    jinling: {
      chips: { zh: ['个人独立完成', '概念已交付 5 件', '2026.03 – 至今'], en: ['Solo project', '5 deliverables shipped', '2026.03 – present'] },
      title: { zh: '金陵残梦', en: 'Remnant Dream of Jinling' },
      sub: 'REMNANT DREAM OF JINLING',
      desc: { zh: '以《红楼梦》为蓝本的双人协作叙事冒险概念（PC / Steam）。双人分屏看见两套真相：石青读结构，温遇读情感；「对话节点」按理解度 × 靠近度导向四种关系结局；六章「人物困境 → 玩法转译」关卡 + 多阶段心魔 Boss。', en: 'A two-player co-op narrative adventure concept (PC / Steam) based on Dream of the Red Chamber. Split-screen reveals two truths — structure vs. emotion; dialogue nodes route understanding × closeness into four endings; six chapters translate character struggles into mechanics, plus a multi-phase inner-demon boss.' },
      role: { zh: '我的角色：100% —— 策划 / 叙事 / 关卡 / 美术 / AI 工作流，全部独立完成。', en: 'My role: 100% — design / narrative / levels / art / AI workflow, all solo.' },
      video: 'assets/video/jinling-pv.mp4', poster: 'assets/img/posters/jinling-pv.jpg',
      links: [
        { t: { zh: '⚡ 交互导航网站', en: '⚡ Interactive hub' }, h: 'https://jinling-canmeng.vercel.app', hot: true, ext: true },
        { t: { zh: '查看完整档案 ↓', en: 'Full file below ↓' }, h: '#jinling' }
      ]
    },
    derive: {
      chips: { zh: ['实体装置已搭建', 'Arduino + DFPlayer', 'APP 概念完整交付'], en: ['Device built & running', 'Arduino + DFPlayer', 'App concept delivered'] },
      title: { zh: '《金陵残梦》衍生宇宙', en: 'Jinling Spin-off Universe' },
      sub: 'SPIN-OFF UNIVERSE',
      desc: { zh: '旋钮划过四段时空：筑梦·古琴 → 同感·箫琵琶 → 悟命·二胡 → 幻灭·扬琴。Arduino 实体声景装置把游戏四幕做成可以「拧」的体验；衍生 APP《金陵梦境·梦觉》把世界观延展到移动端。', en: 'A knob sweeps four eras — guqin, xiao & pipa, erhu, yangqin. The Arduino soundscape device makes the game\'s four acts physically twistable; the companion app "Dream Awakening" extends the world to mobile.' },
      role: { zh: '我的角色：装置方案 / 编程 / 搭建 / APP 概念设计。', en: 'My role: device design / coding / build / app concept.' },
      video: 'assets/video/device-build.mp4', poster: 'assets/img/posters/device-build.jpg',
      links: [{ t: { zh: '查看完整档案 ↓', en: 'Full file below ↓' }, h: '#jinling' }]
    },
    pawnshop: {
      chips: { zh: ['全校路演落地', '8 人组 · 主策划兼统筹', '台本 · 培训 · 采购'], en: ['Campus-wide show', 'Team of 8 · lead & coordinator', 'Scripts · training · procurement'] },
      title: { zh: '记忆当铺', en: 'The Memory Pawnshop' },
      sub: 'THE MEMORY PAWNSHOP',
      desc: { zh: '「用五感典当记忆」：典当 → 蒙眼入舱 → 睁眼探索 → 记忆长廊四段动线；情感重量结算「典金」+ 逐步解锁彩蛋；零屏幕，用听/嗅/触三感舱对应三段人生。', en: '"Pawn your memories through the senses": a four-beat journey — pawn, blindfolded entry, eyes-open exploration, memory corridor. Pawn gold settled by emotional weight, easter eggs unlocking stage by stage, zero screens — hearing/smell/touch pods for three stages of a life.' },
      role: { zh: '我的角色：主策划兼统筹——核心创意 / 体验动线 / 台本与培训 / 采购统筹 / 汇报 PPT，定分工、盯节点，把八个人拧成一场落地路演。', en: 'My role: lead designer & coordinator — core concept / experience flow / scripts & training / procurement / final deck; set the split, tracked the milestones, turned eight people into one live show.' },
      video: 'assets/video/pawnshop-vlog.mp4', poster: 'assets/img/posters/pawnshop-vlog.jpg',
      links: [{ t: { zh: '查看完整档案 ↓', en: 'Full file below ↓' }, h: '#pawnshop' }]
    },
    system: {
      chips: { zh: ['29 人现场体验', '零硬件落地', '主题创意均本人'], en: ['29 participants live', 'Zero hardware', 'Theme & concept: mine'] },
      title: { zh: '你就是系统 · 人体互动画布', en: 'You Are The System' },
      sub: 'HUMAN INTERACTIVE CANVAS',
      desc: { zh: '「数字艺术 = 你的动作 + 系统的回应」。人肉实时渲染管线：体验者动作 → 模仿者复现 → 绘画者实时成画，构成动作—反馈闭环；划区动线 + 循环讲解视频 + 执行培训，零硬件落地。', en: '"Digital art = your motion + the system\'s response." A human render pipeline: participant moves → mimic restages → painter renders live, closing the loop — zoned floor plan, looping tutorial video, trained executors, zero hardware.' },
      role: { zh: '我的角色：主策划兼统筹——主题与核心创意 / 管线设计 / 动线规划 / 汇报 PPT，制作循环讲解视频并培训执行。', en: 'My role: lead designer & coordinator — theme & concept / pipeline design / floor plan / final deck; made the looping tutorial video and trained the executors.' },
      video: 'assets/video/system-vlog.mp4', poster: 'assets/img/posters/system-vlog.jpg',
      links: [{ t: { zh: '查看完整档案 ↓', en: 'Full file below ↓' }, h: '#system' }]
    },
    farm: {
      chips: { zh: ['UE5.8 白盒关卡', '寻物解谜 + 轻战斗', '个人独立完成'], en: ['UE5.8 white-box', 'Puzzle + light combat', 'Solo project'] },
      title: { zh: '闹鬼农场', en: 'Haunted Farm' },
      sub: 'HAUNTED FARM · UE5 WHITE-BOX',
      desc: { zh: '150×150m 固定夜晚 · 微恐治愈的 UE5.8 白盒关卡。帮鬼魂老农老莫找回 6 件遗物、6 段记忆——把他一生「希望 → 失去 → 释怀」的情感弧线做成由低到高、由易到难的动线，高潮落在最难爬的风车顶。主玩法寻物解谜，副玩法轻战斗。', en: 'A 150×150m permanent-night, mildly-eerie UE5.8 white-box level. Help ghost farmer Old Mo recover 6 relics and 6 memories — his life arc (hope → loss → peace) becomes a low-to-high, easy-to-hard route, climaxing at the hardest-to-reach windmill top.' },
      role: { zh: '我的角色：100% —— 关卡概念 / 动线与指引 / 叙事 / UE5 白盒搭建 / 蓝图玩法 / 解说录屏。', en: 'My role: 100% — level concept / routing & guidance / narrative / UE5 white-box / Blueprint gameplay / narrated capture.' },
      video: 'assets/video/farm-walkthrough.mp4', poster: 'assets/img/posters/farm.jpg',
      links: [{ t: { zh: '查看完整档案 ↓', en: 'Full file below ↓' }, h: '#farm' }]
    },
    moba: {
      chips: { zh: ['LOLM 英雄设计', '数值 · 对抗平衡', '个人独立完成'], en: ['Wild Rift champion', 'Numbers & counterplay', 'Solo project'] },
      title: { zh: '玛卡薇 · 缚命船医', en: 'Makavi · Bonebinder Surgeon' },
      sub: 'CHAMPION & COUNTERPLAY DESIGN',
      desc: { zh: '拆解全游戏最难平衡的软辅「悠米」，提炼「低能动性 ↔ 高影响力」难题，原创一个承伤守护者。招牌大招 R「替死契」把队友本会致死的伤按 50/65/80% 接到自己身上；含五技能数值框架、15 级加点与 AI 建模四步平衡评估。', en: 'Deconstructs the game\'s hardest-to-balance enchanter Yuumi, distills "low agency ↔ high impact," and answers with an original damage-taking guardian. Ultimate "Death Pact (R)" transfers 50/65/80% of a teammate\'s lethal damage; ships a full numbers framework, level-15 order and an AI-modeled balance pass.' },
      role: { zh: '我的角色：100% —— 拆解分析 / 英雄机制 / 数值框架 / 对抗与平衡评估 / 美术与台词设定。', en: 'My role: 100% — teardown / kit design / numbers / counterplay & balance / art & voice direction.' },
      image: 'assets/img/moba/moba-07.webp',
      links: [{ t: { zh: '查看完整档案 ↓', en: 'Full file below ↓' }, h: '#moba' }]
    },
    aipm: {
      chips: { zh: ['游戏项目管理', 'AI 工作流', '在线看板已上线'], en: ['Game project mgmt', 'AI workflow', 'Live dashboard'] },
      title: { zh: 'AI 赋能游戏项目管理', en: 'AI-Empowered Game PM' },
      sub: 'AI-EMPOWERED GAME PM',
      desc: { zh: '以 LOLM 7.1 为蓝本推演新人 PM 全链路：认知地图、48h 上手 SOP、冲刺期三冲突决策、需求变更会议纪要、版本复盘与三个月 Roadmap，并落地一块已上线的「版本风险与进度看板」。核心态度：AI 做杠杆，不做拐杖。', en: 'A new-PM full-lifecycle playbook on LOL Mobile 7.1: cognition map, 48h onboarding SOP, three sprint conflicts, a change-review record, a retro framework and a three-month roadmap — plus a live "version risk & progress dashboard." Stance: AI as leverage, not a crutch.' },
      role: { zh: '我的角色：光核共创营课题三，个人独立完成 —— 认知地图 / SOP / 冲突决策 / 会议纪要 / 复盘 Roadmap / 在线看板搭建。', en: 'My role: co-creation camp brief #3, all solo — cognition map / SOP / conflict decisions / minutes / retro roadmap / live dashboard.' },
      image: 'assets/img/aipm/kanban.webp',
      links: [
        { t: { zh: '⚡ 在线风险看板', en: '⚡ Live risk dashboard' }, h: 'https://lol-risk-dashboard.vercel.app', hot: true, ext: true },
        { t: { zh: '查看完整档案 ↓', en: 'Full file below ↓' }, h: '#aipm' }
      ]
    }
  };

  var cardx = document.getElementById('cardx');
  var cardxCard = document.getElementById('cardxCard');
  var cardxBody = document.getElementById('cardxBody');
  var cardxClose = document.getElementById('cardxClose');

  function openCard(key) {
    var d = CARD_DATA[key];
    if (!d) return;
    var lang = L();
    var html = '<div class="cx-chips">' + d.chips[lang].map(function (c, i) {
      return '<span' + (i === 0 ? ' class="hot"' : '') + '>' + c + '</span>';
    }).join('') + '</div>';
    html += '<h3 class="cx-title">' + d.title[lang] + '</h3>';
    html += '<span class="cx-sub">' + d.sub + '</span>';
    html += '<p class="cx-desc">' + d.desc[lang] + '</p>';
    html += '<p class="cx-role">' + d.role[lang] + '</p>';
    if (d.video) {
      html += '<div class="cx-video"><video controls preload="metadata" poster="' + d.poster + '"><source src="' + d.video + '" type="video/mp4"></video></div>';
    } else if (d.image) {
      html += '<div class="cx-video"><img src="' + d.image + '" alt="" loading="lazy"></div>';
    }
    html += '<div class="cx-links">' + d.links.map(function (lk) {
      return '<a href="' + lk.h + '"' + (lk.hot ? ' class="hot"' : '') + (lk.ext ? ' target="_blank" rel="noopener"' : '') + '>' + lk.t[lang] + '</a>';
    }).join('') + '</div>';
    cardxBody.innerHTML = html;
    cardx.hidden = false;
    document.body.style.overflow = 'hidden';
    cardxBody.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', closeCard);
    });
    if (hasGsap && !reduced) {
      gsap.fromTo(cardx, { opacity: 0 }, { opacity: 1, duration: .2 });
      gsap.fromTo(cardxCard, { rotationY: -95, scale: .8 }, { rotationY: 0, scale: 1, duration: .55, ease: 'power3.out' });
    }
  }
  function closeCard() {
    var vid = cardxBody.querySelector('video');
    if (vid) vid.pause();
    if (hasGsap && !reduced) {
      gsap.to(cardxCard, {
        rotationY: 90, scale: .82, duration: .32, ease: 'power2.in',
        onComplete: function () {
          cardx.hidden = true; document.body.style.overflow = '';
          gsap.set(cardxCard, { clearProps: 'all' });
        }
      });
    } else {
      cardx.hidden = true; document.body.style.overflow = '';
    }
  }
  document.querySelectorAll('.pcard').forEach(function (btn) {
    btn.addEventListener('click', function () { openCard(btn.dataset.card); });
  });
  if (cardxClose) cardxClose.addEventListener('click', closeCard);
  if (cardx) cardx.addEventListener('click', function (e) { if (e.target === cardx) closeCard(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && cardx && !cardx.hidden) closeCard();
  });

  if (hasGsap && !reduced && typeof ScrollTrigger !== 'undefined') {
    /* 整面卡牌墙甩入；.pcard 自身有 CSS transition，不能逐卡 from() */
    gsap.fromTo('#cardsRail',
      { opacity: 0, y: 110, rotation: -2.5 },
      {
        opacity: 1, y: 0, rotation: 0, duration: .8, ease: 'power3.out',
        scrollTrigger: { trigger: '#cardsRail', start: 'top 82%' },
        clearProps: 'opacity,transform'
      });
  }

  /* ════════ 5. SKILL WEB ════════ */
  /* 节点散布到整张网（半径 .4–1.0），不再挤在中心 */
  var NODES = [
    { n: 'Claude', icon: 'claude', c: '#D97757', a: -90, r: .42 },
    { n: 'ChatGPT', icon: 'openai', c: '#10A37F', a: -58, r: .62 },
    { n: 'Gemini', icon: 'googlegemini', c: '#886FBF', a: -118, r: .60 },
    { n: 'DeepSeek', icon: 'deepseek', c: '#4D6BFE', a: -28, r: .48 },
    { n: 'Figma', icon: 'figma', c: '#F24E1E', a: 168, r: .55 },
    { n: 'Procreate', mono: 'P', c: '#3C91E6', a: 150, r: .85 },
    { n: 'Canva', icon: 'canva', c: '#00C4CC', a: 192, r: .78 },
    { n: 'Pinterest', icon: 'pinterest', c: '#E60023', a: 216, r: .58 },
    { n: 'Notion', icon: 'notion', c: '#F0ECFF', a: -150, r: .82 },
    { n: 'GitHub', icon: 'github', c: '#F0ECFF', a: 14, r: .68 },
    { n: 'Git', icon: 'git', c: '#F05032', a: 34, r: .94 },
    { n: 'Python', icon: 'python', c: '#3776AB', a: 54, r: .66 },
    { n: 'React', icon: 'react', c: '#61DAFB', a: -72, r: .96 },
    { n: 'Node.js', icon: 'nodedotjs', c: '#5FA04E', a: 78, r: .88 },
    { n: 'Next.js', icon: 'nextdotjs', c: '#F0ECFF', a: -44, r: .86 },
    { n: 'Supabase', icon: 'supabase', c: '#3FCF8E', a: 2, r: .96 },
    { n: 'Vercel', icon: 'vercel', c: '#F0ECFF', a: -8, r: .52 },
    { n: 'Cursor', icon: 'cursor', c: '#F0ECFF', a: -104, r: .90 },
    { n: '剪映 CapCut', icon: 'capcut', c: '#00E5D0', a: 108, r: .60 },
    { n: '即梦 AI', mono: '即', c: '#5B6CFF', a: 124, r: .92 },
    { n: '可灵 AI', mono: '灵', c: '#00E08F', a: 92, r: .48 },
    { n: 'Suno', icon: 'suno', c: '#FF7847', a: 138, r: .62 },
    { n: 'Unreal Engine', icon: 'unrealengine', c: '#B9A6FF', a: 66, r: .78 }
  ];

  var webSvg = document.getElementById('webSvg');
  var webNodes = document.getElementById('webNodes');

  /* 共用的「手织蛛网」生成器：不规则辐线 + 下垂丝 + 外圈破口 + 锚丝（参考真实蛛网） */
  function weaveWeb(svgEl, opt) {
    if (!svgEl) return;
    var W = opt.w, H = opt.h, cx = opt.cx, cy = opt.cy, maxR = opt.maxR;
    var spokes = opt.spokes || 12, rings = opt.rings || 8, seed = opt.seed || 65;
    var rnd = (function (s) {
      return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    })(seed);
    svgEl.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var angles = [], spokeLen = [], svg = '';
    for (var s = 0; s < spokes; s++) {
      angles.push((s / spokes) * Math.PI * 2 + (rnd() - .5) * .4);
      spokeLen.push(maxR * (0.82 + rnd() * .3));
    }
    function cls(i) { return i % 6 === 1 ? 'wb-pink' : (i % 6 === 4 ? 'wb-cyan' : 'wb-main'); }
    /* 辐线（部分延伸成锚丝） */
    for (s = 0; s < spokes; s++) {
      var len = spokeLen[s] * (s % 3 === 0 ? 1.22 : 1);
      var x2 = cx + Math.cos(angles[s]) * len, y2 = cy + Math.sin(angles[s]) * len;
      svg += '<line class="' + cls(s) + '" x1="' + cx + '" y1="' + cy + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke-width="' + (0.9 + rnd() * 1.1).toFixed(2) + '"/>';
    }
    /* 螺旋圈：每段下垂，外圈带随机破口 */
    for (var ring = 1; ring <= rings; ring++) {
      var t = ring / rings;
      var rr = Math.pow(t, 1.12) * maxR * (0.9 + rnd() * .16);
      var d = '', drawing = false;
      for (var i = 0; i <= spokes; i++) {
        var si = i % spokes;
        var rj = Math.min(rr * (0.86 + rnd() * .22), spokeLen[si]);
        var px = cx + Math.cos(angles[si]) * rj, py = cy + Math.sin(angles[si]) * rj;
        var torn = ring >= rings - 1 && rnd() < .22;
        if (!drawing || i === 0) {
          d += 'M' + px.toFixed(1) + ' ' + py.toFixed(1); drawing = true;
        } else {
          var prev = angles[(i - 1) % spokes];
          var am = (prev + angles[si]) / 2 + (angles[si] < prev ? Math.PI : 0);
          var sag = rj * (0.84 + rnd() * .08);
          var mx = cx + Math.cos(am) * sag, my = cy + Math.sin(am) * sag;
          d += ' Q' + mx.toFixed(1) + ' ' + my.toFixed(1) + ' ' + px.toFixed(1) + ' ' + py.toFixed(1);
        }
        if (torn) drawing = false;
      }
      svg += '<path class="' + cls(ring + 2) + '" d="' + d + '" stroke-width="' + (0.7 + t * 1.1).toFixed(2) + '"/>';
    }
    svgEl.innerHTML = svg;
  }

  /* 织网 viewBox 跟随容器实际宽高比：preserveAspectRatio:none 拉伸填满时
     圆网不再被压扁 / 拉长（手机竖版容器曾把网拉成一长条） */
  function weaveUniverse() {
    var uni = document.getElementById('webUniverse');
    var uw = uni && uni.clientWidth ? uni.clientWidth : 1000;
    var uh = uni && uni.clientHeight ? uni.clientHeight : 625;
    var H = Math.max(300, Math.round(1000 * uh / uw));
    weaveWeb(webSvg, { w: 1000, h: H, cx: 500, cy: Math.round(H * .48), maxR: 540, spokes: 13, rings: 9, seed: 65 });
    webSvg.setAttribute('preserveAspectRatio', 'none');
  }

  function buildWeb() {
    if (!webSvg) return;
    weaveUniverse();

    var frag = document.createDocumentFragment();
    NODES.forEach(function (nd) {
      var rad = nd.a * Math.PI / 180;
      var nx = 50 + Math.cos(rad) * nd.r * 48;
      var ny = 48 + Math.sin(rad) * nd.r * 45;
      var b = document.createElement('button');
      b.className = 'wnode';
      b.style.setProperty('--x', nx.toFixed(1) + '%');
      b.style.setProperty('--y', ny.toFixed(1) + '%');
      b.style.setProperty('--c', nd.c);
      b.setAttribute('aria-label', nd.n);
      if (nd.icon) {
        var ic = document.createElement('span');
        ic.className = 'wnode-ic';
        ic.style.setProperty('--icon', 'url(/assets/img/icons/' + nd.icon + '.svg)');
        b.appendChild(ic);
      } else {
        var mo = document.createElement('span');
        mo.className = 'wnode-mono';
        mo.textContent = nd.mono;
        b.appendChild(mo);
      }
      var lb = document.createElement('span');
      lb.className = 'wnode-label';
      lb.textContent = nd.n;
      b.appendChild(lb);
      frag.appendChild(b);
    });
    webNodes.appendChild(frag);
  }
  buildWeb();
  /* 转屏 / 改窗口尺寸后按新比例重织（节点是百分比定位，无需重建） */
  var webResizeT;
  window.addEventListener('resize', function () {
    if (!webSvg) return;
    clearTimeout(webResizeT);
    webResizeT = setTimeout(weaveUniverse, 200);
  });

  /* 蜘蛛身后的手织蛛网（同一生成器，另一组种子） */
  weaveWeb(document.getElementById('spiderBackweb'), { w: 460, h: 460, cx: 230, cy: 218, maxR: 225, spokes: 12, rings: 8, seed: 24 });
  /* hero 左上角的四分之一蛛网 */
  weaveWeb(document.getElementById('heroWebTl'), { w: 380, h: 380, cx: 6, cy: 6, maxR: 360, spokes: 14, rings: 8, seed: 7 });

  /* 触屏：点按技能节点点亮 / 再点熄灭 */
  if (webNodes) {
    webNodes.addEventListener('click', function (e) {
      var node = e.target.closest('.wnode');
      if (!node) return;
      var on = node.classList.contains('lit');
      webNodes.querySelectorAll('.wnode.lit').forEach(function (n) { n.classList.remove('lit'); });
      if (!on) node.classList.add('lit');
    });
  }

  if (hasGsap && !reduced && typeof ScrollTrigger !== 'undefined' && webSvg) {
    gsap.set('#webUniverse', { scale: .3, opacity: 0, filter: 'blur(14px)' });
    gsap.set('.wnode', { scale: 0, opacity: 0 });
    ScrollTrigger.create({
      trigger: '#webUniverse', start: 'top 80%', once: true,
      onEnter: function () {
        gsap.to('#webUniverse', {
          scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          clearProps: 'filter,transform'
        });
        gsap.to('.wnode', {
          scale: 1, opacity: 1, stagger: { each: .04, from: 'random' },
          duration: .4, ease: 'back.out(2)', delay: .45,
          clearProps: 'transform,opacity'
        });
      }
    });
    /* idle shimmer: light a random node every 2s until hovered
       —— 只在有鼠标的设备上开启；触屏设备没有 mouseover 停不下来，会变成「永远有一个亮着」 */
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      var webTouched = false;
      var shimmer = setInterval(function () {
        if (document.hidden) return;
        var all = webNodes.querySelectorAll('.wnode');
        if (!all.length) return;
        all.forEach(function (n) { n.classList.remove('lit'); });
        all[Math.floor(Math.random() * all.length)].classList.add('lit');
      }, 2000);
      function stopShimmer(clearLit) {
        if (webTouched) return;
        webTouched = true;
        clearInterval(shimmer);
        if (clearLit) {
          webNodes.querySelectorAll('.wnode.lit').forEach(function (n) { n.classList.remove('lit'); });
        }
      }
      webNodes.addEventListener('mouseover', function () { stopShimmer(true); }, { once: true });
      webNodes.addEventListener('click', function () { stopShimmer(false); });
    }
  }

  /* ════════ loader word inject (PORTFOLIO letters) ════════ */
  var ltWord = document.getElementById('ltWord');
  if (ltWord) {
    var cols = ['#FF3E9D', '#B388FF', '#FFFFFF', '#4CC9F0', '#FF3E9D', '#B388FF', '#4CC9F0', '#FFFFFF', '#FF3E9D'];
    'PORTFOLIO'.split('').forEach(function (ch, i) {
      var sp = document.createElement('i');
      sp.textContent = ch;
      sp.style.color = cols[i % cols.length];
      ltWord.appendChild(sp);
    });
  }

  /* re-render dynamic bits on language switch */
  window.addEventListener('langchange', function () {
    if (cardx && !cardx.hidden) closeCard();
  });
})();
