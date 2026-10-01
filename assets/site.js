/* joshuahumphreys.net site behavior (shared by every page) */
(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  var header = document.querySelector('.site-header');
  var dock = document.querySelector('.dock');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: scrolled state + adapt to dark sections ---------- */
  var darkEls = [];
  function collectDark() { darkEls = Array.prototype.slice.call(document.querySelectorAll('.on-dark, .site-footer, [data-theme="dark"]')); }
  function isOverDark(y) {
    for (var i = 0; i < darkEls.length; i++) {
      var r = darkEls[i].getBoundingClientRect();
      if (r.top <= y && r.bottom >= y) return true;
    }
    return false;
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      if (header) {
        header.classList.toggle('is-scrolled', y > 24);
        var nav = header.querySelector('.nav');
        var navMid = nav ? nav.getBoundingClientRect().top + nav.offsetHeight / 2 : 40;
        header.classList.toggle('is-on-dark', !root.classList.contains('menu-open') && isOverDark(navMid));
      }
      if (dock) {
        var dockMid = window.innerHeight - 40;
        dock.classList.toggle('is-on-dark', isOverDark(dockMid));
      }
      spy();
    });
  }
  collectDark();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { collectDark(); onScroll(); });

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  function setMenu(open) {
    root.classList.toggle('menu-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    onScroll();
  }
  if (toggle) toggle.addEventListener('click', function () { setMenu(!root.classList.contains('menu-open')); });
  document.querySelectorAll('.menu a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('menu-open')) setMenu(false); });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal, .split');
  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Before / after compare ---------- */
  document.querySelectorAll('[data-compare]').forEach(function (box) {
    var range = box.querySelector('input[type="range"]');
    if (!range) return;
    var tagBefore = box.querySelector('.c-tag-before');
    var tagAfter = box.querySelector('.c-tag-after');
    /* Highlight the side being viewed and fade the other label out */
    function set(v) {
      box.style.setProperty('--pos', v + '%');
      v = +v;
      if (tagBefore) { tagBefore.classList.toggle('is-active', v > 58); tagBefore.classList.toggle('is-faded', v < 42); }
      if (tagAfter) { tagAfter.classList.toggle('is-active', v < 42); tagAfter.classList.toggle('is-faded', v > 58); }
    }
    range.addEventListener('input', function () { set(range.value); box.dataset.touched = '1'; });
    set(range.value);
    if (reduce || !('IntersectionObserver' in window)) return;
    /* A gentle sweep the first time it scrolls into view, so people know it moves */
    var seen = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      seen.disconnect();
      var start = null, from = 50;
      function frame(t) {
        if (box.dataset.touched) return;
        if (!start) start = t;
        var p = Math.min((t - start) / 2200, 1);
        var v = from - 30 * Math.sin(p * Math.PI) * (1 - p * 0.35);
        set(v.toFixed(2)); range.value = v;
        if (p < 1) requestAnimationFrame(frame); else { set(50); range.value = 50; }
      }
      setTimeout(function () { requestAnimationFrame(frame); }, 500);
    }, { threshold: 0.5 });
    seen.observe(box);
  });

  /* ---------- Local time (Fernandina Beach) ---------- */
  var clocks = document.querySelectorAll('[data-clock]');
  function tick() {
    var t;
    try { t = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' }); }
    catch (e) { t = ''; }
    clocks.forEach(function (c) { c.textContent = t + ' ET'; });
  }
  if (clocks.length) { tick(); setInterval(tick, 20000); }
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Scroll spy for same-page nav links ---------- */
  var spyLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var spyTargets = spyLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function spy() {
    if (!spyLinks.length) return;
    var pos = window.innerHeight * 0.35, current = -1;
    spyTargets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top <= pos) current = i; });
    spyLinks.forEach(function (a, i) { a.classList.toggle('is-active', i === current); });
  }

  /* ---------- Hide the mobile dock near contact and footer ---------- */
  if (dock && 'IntersectionObserver' in window) {
    var hideFor = document.querySelectorAll('#contact, .site-footer');
    var visible = new Set();
    var dio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target); });
      dock.classList.toggle('is-hidden', visible.size > 0);
    }, { threshold: 0.05 });
    hideFor.forEach(function (el) { dio.observe(el); });
  }

  /* ---------- FAQ: one open at a time ---------- */
  document.querySelectorAll('.faq[data-exclusive]').forEach(function (faq) {
    var items = faq.querySelectorAll('details');
    items.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  });

  /* ---------- Contact form (Web3Forms) ---------- */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var btn = form.querySelector('[type="submit"]');
    var ok = form.querySelector('.form-success');
    var label = btn ? btn.innerHTML : '';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data && data.success) {
            form.reset();
            if (ok) ok.classList.add('is-shown');
            if (btn) btn.textContent = 'Message sent';
          } else { throw new Error('fail'); }
        })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.innerHTML = label; }
          if (ok) { ok.textContent = 'Something went wrong. Please email 2002magpie@gmail.com or call (904) 310-4371.'; ok.classList.add('is-shown'); }
        });
    });
  });

  /* ---------- Article table of contents ---------- */
  var toc = document.querySelector('[data-toc]');
  var prose = document.querySelector('.article-body .prose');
  if (toc && prose) {
    var heads = prose.querySelectorAll('h2');
    var list = document.createElement('div');
    heads.forEach(function (h, i) {
      if (!h.id) h.id = 's-' + (i + 1) + '-' + h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
      var a = document.createElement('a');
      a.href = '#' + h.id; a.textContent = h.textContent;
      list.appendChild(a);
    });
    toc.appendChild(list);
    if ('IntersectionObserver' in window) {
      var links = toc.querySelectorAll('a');
      var tio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
        });
      }, { rootMargin: '0px 0px -70% 0px' });
      heads.forEach(function (h) { tio.observe(h); });
    }
  }

  onScroll();
})();
