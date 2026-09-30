/* Runtime for the configurator demo sites.
   Applies the chosen palette, font, custom colors, custom font and business
   info, either from URL params (full preview tab) or live from the
   configurator via postMessage. Load after themes.js, inside <head>. */
(function () {
  var T = window.JH_THEMES;
  var root = document.documentElement;
  var slug = root.getAttribute('data-industry') || 'other';
  var ind = T.industries[slug];
  var params = new URLSearchParams(location.search);
  var inFrame = window.self !== window.top;
  var isThumb = params.get('thumb') === '1';
  var isShowcase = params.get('showcase') === '1';
  var quiet = isThumb || isShowcase;

  if (inFrame) root.classList.add('in-frame');
  if (isThumb) root.classList.add('is-thumb');
  if (isShowcase) root.classList.add('is-showcase');

  function cleanHex(v) {
    if (!v) return '';
    v = String(v).trim().replace(/^#/, '');
    if (/^[0-9a-f]{3}$/i.test(v)) v = v.replace(/(.)/g, '$1$1');
    return /^[0-9a-f]{6}$/i.test(v) ? '#' + v.toUpperCase() : '';
  }
  function rgb(h) { h = h.replace('#', ''); return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)]; }
  function lum(h) {
    var c = rgb(h).map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function mix(a, b, t) {
    var x = rgb(a), y = rgb(b);
    return '#' + x.map(function (v, i) { var n = Math.round(v + (y[i] - v) * t); return ('0' + n.toString(16)).slice(-2); }).join('');
  }
  function onColor(h) { return lum(h) > 0.42 ? '#111315' : '#FFFFFF'; }

  var state = {
    palette: params.get('palette') || ind.palette,
    font: params.get('font') || ind.font,
    brand: cleanHex(params.get('brand')),
    accent: cleanHex(params.get('accent')),
    bg: cleanHex(params.get('bg')),
    cfont: params.get('cfont') || '',
    ufont: null,
    biz: {
      businessName: params.get('businessName') || '',
      phone: params.get('phone') || '',
      tagline: params.get('tagline') || ''
    }
  };
  if (params.get('ufont') === '1') {
    try { var u = JSON.parse(localStorage.getItem('jh_ufont')); if (u && u.data) state.ufont = u; } catch (e) {}
  }

  function setVar(k, v) { root.style.setProperty(k, v); }

  function loadCss(id, href, cb) {
    var el = document.getElementById(id);
    if (el && el.getAttribute('href') === href) { if (cb) cb(true); return; }
    if (el) el.parentNode.removeChild(el);
    el = document.createElement('link');
    el.id = id; el.rel = 'stylesheet'; el.href = href;
    el.onload = function () { if (cb) cb(true); };
    el.onerror = function () { if (cb) cb(false); };
    document.head.appendChild(el);
  }

  function post(msg) { if (inFrame) { try { parent.postMessage(msg, '*'); } catch (e) {} } }

  function applyColors() {
    var base = ind.palettes[state.palette] || ind.palettes[ind.palette];
    var c = {};
    for (var k in base) c[k] = base[k];
    var baseDark = lum(base.bg) < 0.3;
    if (state.bg) {
      c.bg = state.bg;
      var dark = lum(c.bg) < 0.3;
      c.surface = mix(c.bg, dark ? '#FFFFFF' : '#000000', dark ? 0.07 : 0.045);
      c.ink = dark ? '#F4F4F5' : '#15181D';
      c.muted = dark ? '#A3A3AD' : '#5F6670';
      c.dark = dark ? mix(c.bg, '#000000', 0.45) : mix(state.brand || base.brand, '#000000', 0.55);
    }
    if (state.brand) {
      c.brand = state.brand;
      if (!state.bg && !baseDark) c.dark = mix(state.brand, '#000000', 0.55);
    }
    if (state.accent) c.accent = state.accent;
    setVar('--bg', c.bg); setVar('--surface', c.surface); setVar('--ink', c.ink);
    setVar('--muted', c.muted); setVar('--brand', c.brand); setVar('--accent', c.accent);
    setVar('--dark', c.dark);
    setVar('--on-brand', onColor(c.brand)); setVar('--on-accent', onColor(c.accent));
    setVar('--on-dark', onColor(c.dark));
    root.classList.toggle('theme-dark', lum(c.bg) < 0.3);
  }

  var uploadedKey = '';
  function applyFonts() {
    var f = T.fonts[state.font] || T.fonts[ind.font];
    loadCss('jhf-preset', 'https://fonts.googleapis.com/css2?' + f.g + '&display=swap');
    var display = f.display, weight = f.weight, transform = f.transform, spacing = f.spacing, scale = f.scale;

    if (state.ufont && state.ufont.data) {
      display = "'JH Uploaded', " + f.display; weight = 400; transform = 'none'; spacing = '-0.01em'; scale = 1;
      if (uploadedKey !== state.ufont.name + state.ufont.data.length && window.FontFace) {
        uploadedKey = state.ufont.name + state.ufont.data.length;
        try {
          var ff = new FontFace('JH Uploaded', 'url(' + state.ufont.data + ')');
          ff.load().then(function (loaded) {
            document.fonts.add(loaded);
            post({ type: 'jh-font-status', kind: 'upload', ok: true, name: state.ufont.name });
          }).catch(function () { post({ type: 'jh-font-status', kind: 'upload', ok: false, name: state.ufont.name }); });
        } catch (e) { post({ type: 'jh-font-status', kind: 'upload', ok: false }); }
      }
    } else if (state.cfont) {
      var fam = cleanFamily(state.cfont);
      if (fam) {
        var r = fontCache[fam];
        display = "'" + (r && r.ok ? r.name : fam) + "', " + f.display;
        weight = r && r.ok ? r.weight : 700; transform = 'none'; spacing = '-0.015em'; scale = 1;
        if (!r) resolveGoogleFont(fam);
      }
    }
    setVar('--f-display', display); setVar('--f-body', f.body);
    setVar('--dw', String(weight)); setVar('--dt', transform); setVar('--dls', spacing); setVar('--ds', String(scale));
  }

  /* Custom Google Font lookup. Tries the name as typed and in Title Case,
     with bold first and then regular only (some fonts have one weight). */
  var fontCache = {}, fontPending = {};
  function cleanFamily(v) { return String(v).replace(/[^A-Za-z0-9 ]/g, '').replace(/\s+/g, ' ').trim(); }
  function titled(v) { return v.toLowerCase().replace(/\b[a-z]/g, function (m) { return m.toUpperCase(); }); }
  function attemptFont(name, spec, weight, cb) {
    var id = 'jhf-c-' + name.replace(/ /g, '-') + '-' + weight;
    loadCss(id, 'https://fonts.googleapis.com/css2?family=' + name.replace(/ /g, '+') + spec + '&display=swap', function (ok) {
      if (!ok) return cb(false);
      if (!document.fonts || !document.fonts.load) return cb(true);
      document.fonts.load(weight + " 32px '" + name + "'").then(function (l) {
        /* Only count the bold request as a match if a real bold face came back */
        cb(l.some(function (face) { return weight < 600 || parseInt(face.weight, 10) >= 600; }));
      }).catch(function () { cb(false); });
    });
  }
  function resolveGoogleFont(fam) {
    if (fontPending[fam]) return;
    fontPending[fam] = true;
    var tries = [[fam, ':wght@400;700', 700], [fam, '', 400]];
    var t = titled(fam);
    if (t !== fam) tries.push([t, ':wght@400;700', 700], [t, '', 400]);
    (function next(i) {
      if (i >= tries.length) return done({ name: fam, ok: false, weight: 700 });
      attemptFont(tries[i][0], tries[i][1], tries[i][2], function (ok) {
        if (ok) done({ name: tries[i][0], ok: true, weight: tries[i][2] }); else next(i + 1);
      });
    })(0);
    function done(res) {
      fontCache[fam] = res;
      post({ type: 'jh-font-status', kind: 'google', ok: res.ok, name: res.name, typed: fam });
      if (cleanFamily(state.cfont) === fam) applyFonts();
    }
  }

  function applyBiz() {
    var b = state.biz;
    each('[data-business]', function (el) { el.textContent = b.businessName || el.getAttribute('data-def'); });
    each('[data-business-initial]', function (el) { el.textContent = (b.businessName || ind.name).trim().charAt(0).toUpperCase(); });
    each('[data-phone]', function (el) { el.textContent = b.phone || el.getAttribute('data-def'); });
    each('[data-tagline]', function (el) { el.textContent = b.tagline || el.getAttribute('data-def'); });
    each('[data-default-only]', function (el) { el.hidden = !!b.businessName; });
    document.title = (b.businessName || ind.name) + ' | Demo preview';
  }

  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }

  function applyAll() { applyColors(); applyFonts(); if (document.body) applyBiz(); }

  applyColors();
  applyFonts();

  window.addEventListener('message', function (e) {
    if (location.origin !== 'null' && e.origin !== location.origin) return;
    var d = e.data;
    if (!d || d.type !== 'jh-preview') return;
    if ('palette' in d) state.palette = d.palette || ind.palette;
    if ('font' in d) state.font = d.font || ind.font;
    if ('brand' in d) state.brand = cleanHex(d.brand);
    if ('accent' in d) state.accent = cleanHex(d.accent);
    if ('bg' in d) state.bg = cleanHex(d.bg);
    if ('cfont' in d) state.cfont = d.cfont || '';
    if ('ufont' in d) {
      if (!d.ufont) state.ufont = null;
      else if (d.ufont.data) state.ufont = d.ufont;
    }
    if (d.biz) state.biz = d.biz;
    applyAll();
  });

  function toast(text) {
    var t = document.querySelector('.jh-toast');
    if (!t) { t = document.createElement('div'); t.className = 'jh-toast'; document.body.appendChild(t); }
    t.textContent = text;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }

  function init() {
    each('[data-business],[data-phone],[data-tagline]', function (el) { el.setAttribute('data-def', el.textContent); });
    applyBiz();

    /* In-page links scroll inside this page only. */
    each('a[href^="#"]', function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        root.classList.remove('menu-open');
        var id = a.getAttribute('href');
        var t = id.length > 1 ? document.querySelector(id) : null;
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    /* Demo buttons and forms do not go anywhere. */
    each('[data-demo]', function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); toast(el.getAttribute('data-demo') || 'Demo button. This will work on your finished site.'); });
    });
    each('form', function (f) {
      f.addEventListener('submit', function (e) { e.preventDefault(); toast('Demo form. On your real site this goes straight to your inbox.'); });
    });
    /* Mobile menu */
    each('.m-toggle', function (b) { b.addEventListener('click', function () { root.classList.toggle('menu-open'); }); });
    /* Tabs: [data-tabs] > [data-tab="x"] buttons and [data-panel="x"] panels */
    each('[data-tabs]', function (box) {
      var btns = box.querySelectorAll('[data-tab]');
      Array.prototype.forEach.call(btns, function (btn) {
        btn.addEventListener('click', function () {
          var key = btn.getAttribute('data-tab');
          Array.prototype.forEach.call(btns, function (b) { b.classList.toggle('active', b === btn); });
          Array.prototype.forEach.call(box.querySelectorAll('[data-panel]'), function (p) { p.hidden = p.getAttribute('data-panel') !== key; });
        });
      });
    });
    /* Before / after slider */
    each('[data-ba]', function (box) {
      var r = box.querySelector('input[type=range]');
      if (r) r.addEventListener('input', function () { box.style.setProperty('--pos', r.value + '%'); });
    });
    /* Toggle buttons like wishlist hearts */
    each('[data-toggle]', function (el) { el.addEventListener('click', function (e) { e.preventDefault(); el.classList.toggle('on'); }); });

    /* Scroll reveal */
    var rv = document.querySelectorAll('.rv');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (quiet || reduce || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(rv, function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      Array.prototype.forEach.call(rv, function (el) { io.observe(el); });
    }

    /* Demo ribbon */
    if (!quiet) {
      var rib = document.createElement('div');
      rib.className = 'jh-ribbon';
      if (inFrame) {
        rib.innerHTML = '<span class="jh-pill">Demo</span><span>Sample photos and text. Your real content goes here.</span>';
      } else {
        rib.innerHTML = '<span class="jh-pill">Demo preview</span><span class="jh-rib-text">Photos and text are samples. Your real content, photos and logo go here.</span>' +
          '<a class="jh-rib-link" href="../../build.html#configurator">Back to configurator</a>' +
          '<a class="jh-rib-cta" href="../../index.html#contact">Build this with Joshua</a>';
      }
      document.body.appendChild(rib);
      root.classList.add('has-ribbon');
    }

    post({ type: 'jh-preview-ready', slug: slug });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
