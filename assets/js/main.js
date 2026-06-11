/* CYNTHIA 莫心雅 · Earth-65 portfolio */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof gsap !== 'undefined';

  /* ── 锚点残留修复：Safari 恢复标签页 / 刷新时带着 #hash 会直接跳到中间章节 ── */
  if (location.hash) {
    history.replaceState(null, '', location.pathname + location.search);
  }
  /* 刷新永远回到顶部。注意：ScrollTrigger 的 refresh 会把 scrollRestoration 改回 auto，
     浏览器随后仍会恢复上次滚动位置 —— 所以 load 后要多次重申 + 强制回顶 */
  function forceTop() {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
  forceTop();
  window.addEventListener('load', function () {
    forceTop();
    setTimeout(forceTop, 60);
    setTimeout(forceTop, 350);
    setTimeout(forceTop, 1000);
  });
  /* Safari 往返缓存(bfcache)恢复页面时也带回位置：pageshow 强制回顶 */
  window.addEventListener('pageshow', forceTop);
  window.addEventListener('pagehide', function () { window.scrollTo(0, 0); });

  /* ── build gallery strips ───────────────────────────── */
  var galleryNames = {
    'jinling-art': '《金陵残梦》美术概念集',
    'jinling-ppt': '《金陵残梦》概念 PPT',
    'app-mengjue': '《金陵梦境·梦觉》APP',
    'pawnshop-ppt': '《记忆当铺》汇报 PPT',
    'system-ppt': '《你就是系统》宣讲 PPT',
    'gameart': '游戏美术作品集'
  };

  document.querySelectorAll('.strip[data-gallery]').forEach(function (strip) {
    var prefix = strip.dataset.gallery;
    var count = parseInt(strip.dataset.count, 10);
    var h = strip.dataset.h || 220;
    strip.style.setProperty('--strip-h', h + 'px');
    var frag = document.createDocumentFragment();
    for (var i = 1; i <= count; i++) {
      var n = (i < 10 ? '0' : '') + i;
      var img = document.createElement('img');
      img.src = 'assets/img/' + prefix + '/' + prefix + '-' + n + '.webp';
      img.alt = (galleryNames[prefix] || prefix) + ' 第 ' + i + ' 页';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.dataset.group = prefix;
      img.dataset.index = i - 1;
      frag.appendChild(img);
    }
    strip.appendChild(frag);
  });

  /* ── lightbox ───────────────────────────────────────── */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCounter = document.getElementById('lbCounter');
  var current = { list: [], index: 0 };

  function openLightbox(list, index) {
    current.list = list;
    current.index = index;
    renderLightbox();
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    if (hasGsap && !reduced) {
      gsap.fromTo(lb, { opacity: 0 }, { opacity: 1, duration: .22 });
      gsap.fromTo(lbImg, { scale: .85, rotate: -2 }, { scale: 1, rotate: 0, duration: .3, ease: 'back.out(1.6)' });
    }
  }
  function renderLightbox() {
    lbImg.src = current.list[current.index].src;
    lbImg.alt = current.list[current.index].alt;
    lbCounter.textContent = (current.index + 1) + ' / ' + current.list.length;
  }
  function closeLightbox() {
    lb.hidden = true;
    document.body.style.overflow = '';
  }
  function step(d) {
    current.index = (current.index + d + current.list.length) % current.list.length;
    renderLightbox();
    if (hasGsap && !reduced) {
      gsap.fromTo(lbImg, { opacity: .4, x: d * 26 }, { opacity: 1, x: 0, duration: .22 });
    }
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.tagName === 'IMG' && t.dataset.group !== undefined) {
      var list = Array.prototype.slice.call(
        document.querySelectorAll('img[data-group="' + t.dataset.group + '"]'));
      openLightbox(list, parseInt(t.dataset.index, 10));
    } else if (t.tagName === 'IMG' && t.hasAttribute('data-zoom')) {
      openLightbox([t], 0);
    }
  });
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', function () { step(-1); });
  document.getElementById('lbNext').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  /* ── nav ────────────────────────────────────────────── */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  var lastY = 0;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    nav.classList.toggle('is-solid', y > 60);
    nav.classList.toggle('is-hidden', y > 420 && y > lastY && !links.classList.contains('open'));
    lastY = y;
  }, { passive: true });
  burger.addEventListener('click', function () {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      burger.classList.remove('open');
      links.classList.remove('open');
    });
  });

  /* ── custom cursor ──────────────────────────────────── */
  var dot = document.getElementById('cursorDot');
  var ring = document.getElementById('cursorRing');
  if (window.matchMedia('(hover: hover)').matches && !reduced) {
    var rx = -100, ry = -100, dx = -100, dy = -100;
    document.addEventListener('mousemove', function (e) { dx = e.clientX; dy = e.clientY; });
    (function loop() {
      rx += (dx - rx) * .16; ry += (dy - ry) * .16;
      dot.style.transform = 'translate(' + (dx - 4) + 'px,' + (dy - 4) + 'px)';
      ring.style.transform = 'translate(' + (rx - 17) + 'px,' + (ry - 17) + 'px)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      ring.classList.toggle('is-hover',
        !!e.target.closest('a, button, [data-zoom], .strip img'));
    });
  }

  /* ── glitch pulses ──────────────────────────────────── */
  var glitches = document.querySelectorAll('.glitch');
  if (!reduced) {
    setInterval(function () {
      var el = glitches[Math.floor(Math.random() * glitches.length)];
      if (!el) return;
      el.classList.add('glitching');
      setTimeout(function () { el.classList.remove('glitching'); }, 380);
    }, 2200);
    glitches.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        el.classList.add('glitching');
        setTimeout(function () { el.classList.remove('glitching'); }, 380);
      });
    });
  }

  /* ── loader + intro ─────────────────────────────────── */
  var loader = document.getElementById('loader');
  var loaderDismissed = false;
  function dismissLoader() {
    /* load 完成与 4s 兜底可能同时触发：跑两次会让 heroIntro 的 from() 把贴纸卡在 scale 0 */
    if (loaderDismissed) return;
    loaderDismissed = true;
    if (hasGsap && !reduced) {
      gsap.to(loader, {
        yPercent: -100, duration: .55, ease: 'power3.in', delay: .15,
        onComplete: function () { loader.remove(); heroIntro(); }
      });
    } else {
      loader.remove();
      document.querySelectorAll('.reveal').forEach(function (el) { el.style.opacity = 1; });
    }
  }
  /* title intro: A → PORTFOLIO letters slam in → of Cynthia */
  if (hasGsap && !reduced) {
    var lt = gsap.timeline();
    lt.from('.lt-a', { y: -30, opacity: 0, duration: .3, ease: 'power2.out' })
      .from('#ltWord i', {
        scale: 2.2, opacity: 0, rotate: function (i) { return i % 2 ? 14 : -14; },
        stagger: .07, duration: .35, ease: 'back.out(1.8)'
      }, '-=.05')
      .from('.lt-of', { y: 24, opacity: 0, duration: .3 }, '-=.1')
      .from('.loader-sub', { opacity: 0, duration: .3 }, '-=.1');
  }
  var minShow = Date.now() + 1700;
  window.addEventListener('load', function () {
    var bar = loader.querySelector('.loader-bar i');
    var wait = Math.max(0, minShow - Date.now());
    if (hasGsap && !reduced) {
      gsap.to(bar, { width: '100%', duration: Math.max(.6, wait / 1000), ease: 'power1.inOut', onComplete: dismissLoader });
    } else { setTimeout(dismissLoader, wait); }
  });
  /* safety: never trap users behind the loader */
  setTimeout(function () { if (document.body.contains(loader)) dismissLoader(); }, 4000);

  /* ── hero intro timeline ────────────────────────────── */
  function heroIntro() {
    if (!hasGsap || reduced) return;
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.comic-tag', { y: -34, opacity: 0, duration: .4 })
      .from('.hero-en', { scale: 1.6, opacity: 0, rotate: -6, duration: .5, ease: 'back.out(1.4)' }, '-=.1')
      .from('.hero-zh', { x: -40, opacity: 0, duration: .4 }, '-=.2')
      .from('.role-chip', { y: 26, opacity: 0, stagger: .08, duration: .35 }, '-=.15')
      .from('.hero-line', { opacity: 0, y: 16, duration: .35 }, '-=.1')
      /* 贴纸有 CSS transition: transform，from() 会捕获到错误的终点 0 —— 必须用显式起止 + clearProps */
      .fromTo('.sticker', { scale: 0, rotation: -14, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, stagger: .1, duration: .4, ease: 'back.out(2)', clearProps: 'transform,opacity' }, '-=.1')
      .from('.hero-scroll', { opacity: 0, duration: .4 })
      .from('.hero-marquee', { yPercent: 110, duration: .45, ease: 'power2.out' }, '-=.35');
  }

  /* ── scroll reveals ─────────────────────────────────── */
  if (hasGsap && !reduced && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.reveal').forEach(function (el, i) {
      gsap.fromTo(el,
        { opacity: 0, y: 46, rotate: i % 2 ? 1.2 : -1.2 },
        {
          opacity: 1, y: 0, rotate: 0, duration: .7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%' }
        });
    });

    /* issue headers: slam in like a comic panel */
    document.querySelectorAll('.issue-head').forEach(function (head) {
      gsap.from(head, {
        scale: .92, opacity: 0, duration: .5, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: head, start: 'top 84%' }
      });
    });

    /* big outline words drift */
    document.querySelectorAll('.bigword').forEach(function (w) {
      gsap.fromTo(w, { xPercent: 16 }, {
        xPercent: -8, ease: 'none',
        scrollTrigger: { trigger: w.parentElement, scrub: 1.2, start: 'top bottom', end: 'bottom top' }
      });
    });

    /* strips: slide the first frames in */
    document.querySelectorAll('.strip').forEach(function (strip) {
      gsap.from(strip.children, {
        x: 70, opacity: 0, stagger: { each: .05, from: 0 }, duration: .5, ease: 'power2.out',
        scrollTrigger: { trigger: strip, start: 'top 88%' }
      });
    });

    /* hero parallax */
    gsap.to('.hero-splat-pink', {
      yPercent: 26, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .8 }
    });
    gsap.to('.hero-web-tl', {
      yPercent: 36, rotate: 8, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .8 }
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.style.opacity = 1; });
  }
})();
