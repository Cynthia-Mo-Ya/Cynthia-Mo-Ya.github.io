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
    gsap.from('.decode-ghost i', {
      y: 60, opacity: 0, stagger: .07, duration: .6, ease: 'power3.out',
      scrollTrigger: { trigger: '#decodeLetters', start: 'top 78%' }
    });
  }

  /* ════════ 2. SPIDER QA ════════ */
  var PROXY_URL = 'https://cynthia-spider.vercel.app/api/ask';

  var KB = [
    { k: /项目|做过|作品|经历|project|work/i,
      zh: '心雅有四组代表作：①《金陵残梦》——以《红楼梦》为蓝本的双人分屏叙事冒险概念，独立交付 5 件（概念文档/美术集/PV/PPT/导航网站）；②它的衍生宇宙——Arduino 声景装置 + 梦境 APP 概念；③《记忆当铺》五感沉浸体验；④《你就是系统》人体互动画布。往下滑，每一个都有完整档案。',
      en: 'Four flagship works: 1) Remnant Dream of Jinling — a split-screen co-op narrative concept based on Dream of the Red Chamber, with 5 solo deliverables; 2) its spin-offs — an Arduino soundscape device + a dream-app concept; 3) The Memory Pawnshop, a five-sense immersive show; 4) You Are The System, a human interactive canvas. Scroll down for full files.' },
    { k: /红楼|文学|ip|改编|为什么/i,
      zh: '为什么是《红楼梦》？因为它本身就是一场「双视角的梦」——世人看见繁华，黛玉看见将散的宴席。心雅把这种「同一世界、两套真相」转译成双人分屏机制：石青看见结构，温遇看见情感，缺一不可。文学不是皮，是机制的源头。',
      en: 'Why Dream of the Red Chamber? Because the novel itself is a dream with two readings — the world sees splendor, Daiyu sees the feast about to scatter. Cynthia translates that into split-screen mechanics: one player reads structure, the other reads emotion, and neither view alone can finish the game. Literature is not a skin here — it is where the mechanics come from.' },
    { k: /ai|工作流|工具|claude|deepseek|gpt|流程/i,
      zh: '她的 AI 工作流四步走：Claude/Gemini/GPT 交叉论证当「会反驳的策划搭档」→ GPT Image 统一水墨概念图 → 即梦/可灵生成动态分镜、剪映成片 → Claude Code 做工程交付（你现在看到的这个网站也是）。所有设计判断由她本人拍板。',
      en: 'Her AI workflow has four steps: Claude/Gemini/GPT cross-examination as "design partners who talk back" → GPT Image for a consistent ink-wash art set → Jimeng/Kling animatics edited in CapCut → Claude Code for engineering delivery (including this very site). Every design call is hers.' },
    { k: /团队|合作|实习|岗位|招|join|team|intern/i,
      zh: '她在找游戏策划培训生/日常实习，方向是叙事、系统、关卡。想要的团队：认真做体验、愿意让新人真的上手干活。她的习惯是把活儿干到 80% 工作量那种程度（有两个项目为证）。联系方式在页面最底下 👇',
      en: 'She is looking for a game-design trainee / part-time internship in narrative, systems or level design — a team that takes player experience seriously and lets juniors actually build things. Her track record: carrying ~80% of the workload on two shipped projects. Contact info at the bottom 👇' },
    { k: /教育|学校|大学|学历|背景|school|edu/i,
      zh: '湖北大学数字媒体艺术本科（2025–2029），学业排名 1/120 专业第一；之前是广州美术学院附属中等美术学校美术方向，还有约一年动画专项训练。美术是童子功，策划是主修。',
      en: 'BA in Digital Media Art at Hubei University (2025–2029), ranked 1/120 — top of the major. Before that: the GAFA-affiliated art school plus ~a year of animation training. Art is her foundation; design is her major.' },
    { k: /游戏|玩|喜欢|品味|play|game/i,
      zh: '她的游戏库分三层：叙事情感向（底特律变人、艾迪芬奇、锈湖、Journey、光遇）是核心；双人协作/非对称（双人成行、双影奇境、胡闹厨房、猫鼠）是研究方向；再加 MOBA/射击/养成/音游的广撒网。玩得多，拆得更多。',
      en: 'Three layers in her library: narrative/emotional games (Detroit, Edith Finch, Rusty Lake, Journey, Sky) at the core; co-op/asymmetric titles (It Takes Two, Split Fiction, Overcooked, Tom & Jerry Chase) as a research track; plus a wide net of MOBA / shooter / sim / rhythm. She plays a lot — and deconstructs more.' },
    { k: /联系|邮箱|电话|微信|contact|email|phone/i,
      zh: '邮箱 2062491054@qq.com，电话 135-5413-7459，GitHub @Cynthia-Mo-Ya。页面最底下有彩色纸条，点开就能联系。简历 PDF 也在那里。',
      en: 'Email 2062491054@qq.com, phone 135-5413-7459, GitHub @Cynthia-Mo-Ya. The colorful tapes at the bottom of the page are all clickable — the resume PDF is there too.' }
  ];
  var KB_FALLBACK = {
    zh: '这个问题有点超出我的蛛网范围🕸️ 试试问：她的项目、AI 工作流、为什么选《红楼梦》、想加入什么团队，或者直接发邮件 2062491054@qq.com 问真人。',
    en: 'That one is a bit outside my web 🕸️ Try asking about her projects, AI workflow, why Dream of the Red Chamber, or what team she wants — or email the human directly: 2062491054@qq.com.'
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

  function openDossier() {
    dossierCover.hidden = true;
    dossierSpread.hidden = false;
    if (hasGsap && !reduced) {
      gsap.fromTo(dossierSpread, { rotationY: -70, opacity: 0, transformOrigin: 'left center' },
        { rotationY: 0, opacity: 1, duration: .55, ease: 'power3.out' });
      gsap.from('.dossier-left > *', { y: 26, opacity: 0, stagger: .08, delay: .2, duration: .4 });
      gsap.from('.dossier-right', { x: 40, opacity: 0, delay: .3, duration: .4 });
    }
  }
  function closeDossier() {
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

  /* ════════ 4. PROJECT CARDS ════════ */
  var CARD_DATA = {
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
      chips: { zh: ['全校路演落地', '8 人组 · 主策划', '80% 工作量'], en: ['Campus-wide show', 'Team of 8 · lead', '80% of workload'] },
      title: { zh: '记忆当铺', en: 'The Memory Pawnshop' },
      sub: 'THE MEMORY PAWNSHOP',
      desc: { zh: '「用五感典当记忆」：典当 → 蒙眼入舱 → 睁眼探索 → 记忆长廊四段动线；情感重量结算「典金」+ 逐步解锁彩蛋；零屏幕，用听/嗅/触三感舱对应三段人生。', en: '"Pawn your memories through the senses": a four-beat journey — pawn, blindfolded entry, eyes-open exploration, memory corridor. Pawn gold settled by emotional weight, easter eggs unlocking stage by stage, zero screens — hearing/smell/touch pods for three stages of a life.' },
      role: { zh: '我的角色：核心创意 / 体验动线 / 台本与培训 / 采购统筹 / 汇报 PPT，约 80% 工作量。', en: 'My role: core concept / experience flow / scripts & training / procurement / final deck — about 80% of the work.' },
      video: 'assets/video/pawnshop-vlog.mp4', poster: 'assets/img/posters/pawnshop-vlog.jpg',
      links: [{ t: { zh: '查看完整档案 ↓', en: 'Full file below ↓' }, h: '#pawnshop' }]
    },
    system: {
      chips: { zh: ['29 人现场体验', '零硬件落地', '主题创意均本人'], en: ['29 participants live', 'Zero hardware', 'Theme & concept: mine'] },
      title: { zh: '你就是系统 · 人体互动画布', en: 'You Are The System' },
      sub: 'HUMAN INTERACTIVE CANVAS',
      desc: { zh: '「数字艺术 = 你的动作 + 系统的回应」。人肉实时渲染管线：体验者动作 → 模仿者复现 → 绘画者实时成画，构成动作—反馈闭环；划区动线 + 循环讲解视频 + 执行培训，零硬件落地。', en: '"Digital art = your motion + the system\'s response." A human render pipeline: participant moves → mimic restages → painter renders live, closing the loop — zoned floor plan, looping tutorial video, trained executors, zero hardware.' },
      role: { zh: '我的角色：主题与核心创意 / 管线设计 / 动线规划 / 汇报 PPT，约 80% 工作量。', en: 'My role: theme & concept / pipeline design / floor plan / final deck — about 80% of the work.' },
      video: 'assets/video/system-vlog.mp4', poster: 'assets/img/posters/system-vlog.jpg',
      links: [{ t: { zh: '查看完整档案 ↓', en: 'Full file below ↓' }, h: '#system' }]
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
    html += '<div class="cx-video"><video controls preload="metadata" poster="' + d.poster + '"><source src="' + d.video + '" type="video/mp4"></video></div>';
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
    gsap.from('.pcard', {
      opacity: 0, scale: .55, y: 130, filter: 'blur(10px)',
      stagger: .12, duration: .8, ease: 'power3.out',
      scrollTrigger: { trigger: '#cardsRail', start: 'top 82%' },
      clearProps: 'filter,transform'
    });
  }

  /* ════════ 5. SKILL WEB ════════ */
  var NODES = [
    { n: 'Claude', icon: 'claude', c: '#D97757', a: -90, r: .30 },
    { n: 'GPT', icon: 'openai', c: '#10A37F', a: -52, r: .52 },
    { n: 'Gemini', icon: 'googlegemini', c: '#886FBF', a: -125, r: .55 },
    { n: 'DeepSeek', icon: 'deepseek', c: '#4D6BFE', a: -20, r: .30 },
    { n: 'Figma', icon: 'figma', c: '#F24E1E', a: 175, r: .42 },
    { n: 'Procreate', mono: 'P', c: '#3C91E6', a: 152, r: .68 },
    { n: 'Canva', icon: 'canva', c: '#00C4CC', a: 200, r: .62 },
    { n: 'Pinterest', icon: 'pinterest', c: '#E60023', a: 218, r: .38 },
    { n: 'Notion', icon: 'notion', c: '#F0ECFF', a: -155, r: .80 },
    { n: 'GitHub', icon: 'github', c: '#F0ECFF', a: 12, r: .55 },
    { n: 'Git', icon: 'git', c: '#F05032', a: 32, r: .80 },
    { n: 'Python', icon: 'python', c: '#3776AB', a: 55, r: .55 },
    { n: 'React', icon: 'react', c: '#61DAFB', a: -68, r: .85 },
    { n: 'Node.js', icon: 'nodedotjs', c: '#5FA04E', a: 80, r: .82 },
    { n: 'Next.js', icon: 'nextdotjs', c: '#F0ECFF', a: -38, r: .72 },
    { n: 'Supabase', icon: 'supabase', c: '#3FCF8E', a: 5, r: .92 },
    { n: 'Vercel', icon: 'vercel', c: '#F0ECFF', a: -8, r: .60 },
    { n: 'Cursor', icon: 'cursor', c: '#F0ECFF', a: -105, r: .76 },
    { n: '剪映 CapCut', mono: '剪', c: '#00E5D0', a: 108, r: .56 },
    { n: '即梦 Seedance', mono: '即', c: '#5B6CFF', a: 128, r: .82 },
    { n: '可灵 Kling', mono: '灵', c: '#00E08F', a: 95, r: .34 },
    { n: 'Suno', icon: 'suno', c: '#FF7847', a: 142, r: .48 }
  ];

  var webSvg = document.getElementById('webSvg');
  var webNodes = document.getElementById('webNodes');

  function buildWeb() {
    if (!webSvg) return;
    var W = 1000, H = 625, cx = 500, cy = 295;
    webSvg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var rnd = (function (seed) {
      return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    })(65);
    var spokes = 13, maxR = 560;
    var angles = [];
    var svg = '';
    for (var s = 0; s < spokes; s++) {
      var a = (s / spokes) * Math.PI * 2 + (rnd() - .5) * .22;
      angles.push(a);
      var x2 = cx + Math.cos(a) * maxR, y2 = cy + Math.sin(a) * maxR;
      svg += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke-width="' + (1.2 + rnd() * 1.2).toFixed(2) + '"/>';
    }
    for (var ring = 1; ring <= 7; ring++) {
      var rr = (ring / 7) * maxR * (0.92 + rnd() * .12);
      var d = '';
      for (var i = 0; i <= spokes; i++) {
        var ai = angles[i % spokes];
        var rj = rr * (0.94 + rnd() * .1);
        var px = cx + Math.cos(ai) * rj, py = cy + Math.sin(ai) * rj;
        if (i === 0) { d += 'M' + px.toFixed(1) + ' ' + py.toFixed(1); }
        else {
          var am = (angles[(i - 1) % spokes] + ai) / 2 + (ai < angles[(i - 1) % spokes] ? Math.PI : 0);
          var sag = rj * (0.88 + rnd() * .05);
          var mx = cx + Math.cos(am) * sag, my = cy + Math.sin(am) * sag;
          d += ' Q' + mx.toFixed(1) + ' ' + my.toFixed(1) + ' ' + px.toFixed(1) + ' ' + py.toFixed(1);
        }
      }
      svg += '<path d="' + d + '" stroke-width="' + (0.9 + ring * .16).toFixed(2) + '"/>';
    }
    webSvg.innerHTML = svg;

    var frag = document.createDocumentFragment();
    NODES.forEach(function (nd) {
      var rad = nd.a * Math.PI / 180;
      var nx = 50 + Math.cos(rad) * nd.r * 46;
      var ny = 47 + Math.sin(rad) * nd.r * 44;
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
    /* idle shimmer: light a random node every 2s until hovered */
    var webTouched = false;
    webNodes.addEventListener('mouseover', function () { webTouched = true; }, { once: true });
    setInterval(function () {
      if (webTouched || document.hidden) return;
      var all = webNodes.querySelectorAll('.wnode');
      if (!all.length) return;
      all.forEach(function (n) { n.classList.remove('lit'); });
      all[Math.floor(Math.random() * all.length)].classList.add('lit');
    }, 2000);
  }

  /* ════════ loader word inject (PORTFOLIO letters) ════════ */
  var ltWord = document.getElementById('ltWord');
  if (ltWord) {
    var cols = ['#FF2E88', '#F6E8C8', '#FFFFFF', '#3DF2E0', '#FF2E88', '#F6E8C8', '#3DF2E0', '#FFFFFF', '#FF2E88'];
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
