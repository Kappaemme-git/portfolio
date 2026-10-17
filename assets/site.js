/* ══════════════════════════════════════════════════════════════════════
   kappaemme.dev — shared behaviour (/coffee, /grok-bot)
   Source of truth for Codex → /assets/site.js. One rAF loop, reads before
   writes, transform/opacity only. Everything is skipped under reduced motion.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var KM = window.KM = window.KM || {};
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  KM.reduce = reduce; KM.esc = esc; KM.$ = $; KM.$$ = $$;

  /* ───────────── Bot avatars: exact Grok Bot geometry from bots.data.js ───────────── */
  var BLOB = "M50 8.5C76.5 8.5 96.5 27.5 96.5 51.5C96.5 75.5 77 94 50.5 94C24 94 3.5 76 3.5 52C3.5 28 23.5 8.5 50 8.5Z";
  var uid = 0;
  KM.avatar = function (bot, cls) {
    var a = bot.avatar, id = "kbc" + (++uid);
    var shape = a.shape === "blob" ? '<path d="' + BLOB + '" fill="' + a.body + '"/>' : '<circle cx="50" cy="50" r="45" fill="' + a.body + '"/>';
    var clip = a.shape === "blob" ? '<path d="' + BLOB + '"/>' : '<circle cx="50" cy="50" r="45"/>';
    var eyes = a.eyes.map(function (e) {
      return '<rect x="' + (e.cx - e.w / 2) + '" y="' + (e.cy - e.h / 2) + '" width="' + e.w + '" height="' + e.h + '" rx="' + e.w / 2 + '" fill="' + a.eye + '" transform="rotate(' + e.rot + ' ' + e.cx + ' ' + e.cy + ')"/>';
    }).join("");
    return '<svg viewBox="0 0 100 100" class="gbot ' + (cls || "") + '" data-bot="' + bot.id + '" aria-hidden="true">' +
      '<defs><clipPath id="' + id + '">' + clip + '</clipPath></defs>' +
      '<g class="gbot__squash"><g class="gbot__bob">' + shape +
      '<g clip-path="url(#' + id + ')"><g class="gbot__look"><g class="gbot__blink">' + eyes + '</g></g></g></g></g></svg>';
  };
  var BOTS = window.GROK_BOTS || [], byId = {};
  BOTS.forEach(function (b) { byId[b.id] = b; });
  KM.bots = BOTS; KM.botById = byId;
  KM.paintBots = function (root) {
    $$("[data-bot-slot]", root).forEach(function (slot) {
      var b = byId[slot.getAttribute("data-bot-slot")];
      if (b) slot.outerHTML = KM.avatar(b, slot.getAttribute("data-class") || "gbot--alive");
    });
    $$(".gbot", root).forEach(function (el, i) {
      el.style.setProperty("--blink-delay", ((i * 1.3) % 5.6).toFixed(2) + "s");
      el.style.setProperty("--bob-delay", (-(i * 1.2) % 3.6).toFixed(2) + "s");
      var ring = el.closest(".k-actor") && el.closest(".k-actor").querySelector(".k-actor__ring");
      if (ring) ring.style.setProperty("--bob-delay", el.style.getPropertyValue("--bob-delay"));
    });
  };

  /* ───────────── Top bar ───────────── */
  var top = $(".k-top");
  function onScrollTop() { if (top) top.classList.toggle("is-scrolled", window.scrollY > 8); }
  onScrollTop();
  window.addEventListener("scroll", onScrollTop, { passive: true });

  /* nav caret: under the current page (sub-pages) or the section in view (home) */
  var linksBox = $(".k-links"), caret = $(".k-caret");
  var spyLinks = $$(".k-links [data-spy]"), sheetLinks = $$(".k-sheet [data-spy]");
  var activeId = null;
  function currentLink() {
    if (activeId) return spyLinks.filter(function (l) { return l.dataset.spy === activeId; })[0];
    return $('.k-links a[aria-current="page"]');
  }
  function placeCaret() {
    if (!caret || !linksBox) return;
    var a = currentLink();
    if (!a || !linksBox.offsetParent) { caret.classList.remove("is-on"); return; }
    var br = linksBox.getBoundingClientRect(), r = a.getBoundingClientRect(), pl = parseFloat(getComputedStyle(a).paddingLeft) || 0;
    caret.style.setProperty("--cx", (r.left - br.left + pl) + "px");
    caret.style.setProperty("--cw", ((r.width - 2 * pl) / 100).toFixed(3));
    caret.classList.add("is-on");
  }
  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    spyLinks.concat(sheetLinks).forEach(function (l) { if (l.dataset.spy === id) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current"); });
    placeCaret();
  }
  if (hasIO && spyLinks.length) {
    var spyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.hasAttribute("data-spy-none") ? null : en.target.id); });
    }, { rootMargin: "-45% 0px -54% 0px" });
    $$("[data-spy-none]").concat(spyLinks.map(function (l) { return document.getElementById(l.dataset.spy); })).forEach(function (s) { if (s) spyIO.observe(s); });
  }
  placeCaret();
  window.addEventListener("resize", placeCaret, { passive: true });
  document.fonts && document.fonts.ready.then(placeCaret);

  /* ───────────── Menu sheet ───────────── */
  var menuBtn = $(".k-menu"), sheet = $(".k-sheet");
  if (menuBtn && sheet) {
    var label = $(".k-menu span", menuBtn);
    var setMenu = function (open) {
      sheet.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      if (label) label.textContent = open ? "close" : "menu";
      document.documentElement.classList.toggle("menu-open", open);
      if (open) { sheet.removeAttribute("inert"); var f = $("a", sheet); f && f.focus({ preventScroll: true }); } else sheet.setAttribute("inert", "");
    };
    menuBtn.addEventListener("click", function () { setMenu(menuBtn.getAttribute("aria-expanded") !== "true"); });
    $$("a", sheet).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") { setMenu(false); menuBtn.focus(); } });
  }

  /* ───────────── Reveal, stagger, hairlines, in-view triggers ───────────── */
  KM.initReveal = function () {
    $$("[data-stagger]").forEach(function (g) { $$(":scope > .reveal", g).forEach(function (el, i) { el.style.transitionDelay = i * 80 + "ms"; }); });
    if (!reduce && hasIO) {
      var els = $$(".reveal:not(.reveal--seen)");
      els.forEach(function (el) { el.classList.add("reveal--seen"); if (el.getBoundingClientRect().top > window.innerHeight * .92) el.classList.add("reveal--armed"); });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target; el.classList.add("reveal--in"); io.unobserve(el);
          setTimeout(function () { el.classList.remove("reveal--armed", "reveal--in"); el.style.transitionDelay = ""; }, 1100 + (parseFloat(el.style.transitionDelay) || 0));
        });
      }, { rootMargin: "0px 0px -12% 0px", threshold: .12 });
      els.forEach(function (el) { io.observe(el); });
    }
    var inIO = hasIO ? new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); inIO.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -12% 0px", threshold: .2 }) : null;
    $$("[data-grow], .k-grow:not([data-grow] .k-grow), [data-term]").forEach(function (el) { inIO ? inIO.observe(el) : el.classList.add("is-in"); });
  };

  /* ───────────── GitHub stars (from the current site) ───────────── */
  KM.loadStars = function () {
    var rows = $$("[data-stars-repo]");
    if (!rows.length || !window.fetch) return;
    fetch("https://api.github.com/users/Kappaemme-git/repos?per_page=100")
      .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error("GitHub unavailable")); })
      .then(function (repos) {
        if (!Array.isArray(repos)) return;
        var n = Object.create(null);
        repos.forEach(function (repo) { n[repo.name.toLowerCase()] = repo.stargazers_count; });
        rows.forEach(function (row) {
          var c = n[row.getAttribute("data-stars-repo")];
          var badge = row.hasAttribute("data-stars") ? row : $("[data-stars]", row);
          if (badge && typeof c === "number") badge.textContent = c.toLocaleString("en-US") + (badge.hasAttribute("data-stars-short") ? "" : c === 1 ? " star" : " stars");
        });
      }).catch(function () { /* keep the verified fallback labels */ });
  };

  /* ───────────── Black scan transition on cross-page links ───────────── */
  var scan = $(".k-scan"), leaving = false, leaveTimer, arrivalTimer;
  function path(url) { return url.pathname.replace(/\/index\.html$/, "/").replace(/\/$/, ""); }
  function clearScan() {
    if (!scan) return;
    clearTimeout(arrivalTimer);
    scan.classList.remove("is-out"); scan.style.display = "none";
    document.documentElement.removeAttribute("data-scan");
  }
  KM.skipScan = clearScan;
  if (scan && document.documentElement.getAttribute("data-scan") === "in") {
    $(".k-scan__fill", scan).addEventListener("animationend", clearScan, { once: true });
    arrivalTimer = setTimeout(clearScan, 650);
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-scan]");
    if (!a || reduce || !scan || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.hasAttribute("download") || (a.target && a.target !== "_self")) return;
    var url = new URL(a.href, location.href);
    if (!/^(https?:|file:)$/.test(url.protocol) || url.protocol !== location.protocol || url.origin !== location.origin || (path(url) === path(location) && (url.hash || !a.hasAttribute("data-scan-reload")))) return;
    e.preventDefault();
    if (leaving) return;
    leaving = true;
    var page = path(url).split("/").pop();
    var command = "cd ~" + (page === "grok-bot" ? "/grok-bots" : page === "skills" || page === "coffee" ? "/" + page : "");
    var cmd = $(".k-scan__cmd", scan);
    cmd.textContent = command;
    cmd.style.setProperty("--chars", command.length);
    clearTimeout(arrivalTimer);
    scan.style.display = "";
    document.documentElement.removeAttribute("data-scan");
    scan.offsetHeight; /* commit the hidden start frame before the wipe */
    scan.classList.add("is-out");
    leaveTimer = setTimeout(function () {
      try { sessionStorage.setItem("k-scan", "1"); } catch (err) {}
      location.assign(url.href);
    }, 620);
  });
  window.addEventListener("pageshow", function (e) {
    if (!e.persisted) return;
    clearTimeout(leaveTimer); leaving = false; clearScan();
    $$("a[data-busy]").forEach(function (a) { a.removeAttribute("data-busy"); });
  });

  /* ───────────── Pointer, parallax, bots: one rAF loop ───────────── */
  var mouse = { x: window.innerWidth / 2, y: window.innerHeight * .35, t: -1e9 };
  window.addEventListener("pointermove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; mouse.t = performance.now(); }, { passive: true });
  window.addEventListener("pointerdown", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; mouse.t = performance.now(); }, { passive: true });

  var para = [], actors = [];
  KM.initMotion = function () {
    para = $$("[data-parallax]").map(function (el) {
      return { el: el, k: parseFloat(el.getAttribute("data-parallax")) || 0, hero: el.hasAttribute("data-parallax-hero"), y: 0, last: null };
    });
    actors = $$(".k-actor").map(function (a, i) {
      var svg = $(".gbot", a);
      return { el: a, body: $(".k-actor__body", a), svg: svg, look: svg && $(".gbot__look", svg), k: parseFloat(a.getAttribute("data-lift")) || 0,
               sign: i % 2 ? -1 : 1, vis: true, x: 0, y: 0, tx: 0, ty: 0, lean: 0, sq: 0, lift: 0 };
    });
    if (hasIO) {
      var visIO = new IntersectionObserver(function (entries) { entries.forEach(function (en) { en.target.__k.vis = en.isIntersecting; }); }, { rootMargin: "100px" });
      actors.forEach(function (a) { a.el.__k = a; visIO.observe(a.el); });
    }
  };

  // hop on hover, boop on click/tap
  function hop(svg, kind) {
    if (reduce || !svg) return;
    var c = kind === "boop" ? "is-boop" : "is-hop";
    svg.classList.remove("is-hop", "is-boop", "is-blink2"); void svg.getBoundingClientRect();
    svg.classList.add(c, "is-blink2");
    clearTimeout(svg.__t); svg.__t = setTimeout(function () { svg.classList.remove(c, "is-blink2"); }, 820);
  }
  KM.hop = hop;
  document.addEventListener("pointerover", function (e) {
    if (e.pointerType !== "mouse") return;
    var svg = e.target.closest && e.target.closest(".gbot");
    if (svg && !(e.relatedTarget && svg.contains(e.relatedTarget))) hop(svg, "hop");
  });
  document.addEventListener("click", function (e) { var svg = e.target.closest && e.target.closest(".k-actor__body"); if (svg) hop($(".gbot", svg), "boop"); });

  var glance = { x: 0, y: 0, next: 0 }, last = performance.now(), lastSy = window.scrollY, vel = 0;
  var running = !reduce && !document.hidden;
  function tick(now) {
    if (!running) return;
    var dt = Math.min(.05, (now - last) / 1000); last = now;
    var sy = window.scrollY, vh = window.innerHeight, i, p, a;
    vel += ((sy - lastSy) - vel) * .18; lastSy = sy;
    if (Math.abs(vel) < .01) vel = 0;

    // read phase
    for (i = 0; i < para.length; i++) {
      p = para[i];
      if (p.hero) p.y = sy < vh * 1.3 ? sy * p.k : p.y;
      else { var r = p.el.parentElement.getBoundingClientRect(); if (r.bottom > -200 && r.top < vh + 200) p.y = (r.top + r.height / 2 - vh / 2) * p.k; }
    }
    var idle = now - mouse.t > 3500;
    if (idle && now > glance.next) {
      glance.x = (Math.random() * 2 - 1) * 4; glance.y = (Math.random() * 2 - 1) * 3;
      if (Math.random() < .35) { glance.x = 0; glance.y = 0; }
      glance.next = now + 1400 + Math.random() * 2200;
    }
    for (i = 0; i < actors.length; i++) {
      a = actors[i]; if (!a.vis || !a.look) continue;
      var br = a.svg.getBoundingClientRect();
      if (idle) { a.tx = glance.x; a.ty = glance.y; }
      else {
        var dx = mouse.x - (br.left + br.width / 2), dy = mouse.y - (br.top + br.height * .4);
        var d = Math.sqrt(dx * dx + dy * dy) || 1, f = Math.min(1, d / 260);
        a.tx = dx / d * 7 * f; a.ty = dy / d * 6 * f;
      }
      a.ty = clamp(a.ty + clamp(vel * .35, -4, 4), -7, 7);             // eyes follow the scroll direction
      a.liftT = a.k ? (br.top + br.height / 2 - vh / 2) * a.k : 0;       // calm parallax
    }

    // write phase
    var ease = 1 - Math.pow(.0009, dt);
    for (i = 0; i < actors.length; i++) {
      a = actors[i]; if (!a.vis || !a.look) continue;
      a.x += (a.tx - a.x) * ease; a.y += (a.ty - a.y) * ease;
      a.look.style.transform = "translate(" + a.x.toFixed(2) + "px," + a.y.toFixed(2) + "px)";
      a.lean += (clamp(vel * .3, -6, 6) * a.sign - a.lean) * .12;        // sway against the scroll
      a.sq += (Math.min(Math.abs(vel) * .004, .05) - a.sq) * .15;        // squash with speed
      a.lift += ((a.liftT || 0) - a.lift) * .2;
      if (a.body) a.body.style.transform = "translate3d(0," + a.lift.toFixed(1) + "px,0) rotate(" + a.lean.toFixed(2) + "deg) scale(" + (1 + a.sq * .6).toFixed(3) + "," + (1 - a.sq).toFixed(3) + ")";
    }
    for (i = 0; i < para.length; i++) {
      p = para[i];
      if (p.y !== p.last) { p.el.style.transform = "translate3d(0," + p.y.toFixed(1) + "px,0)"; p.last = p.y; }
    }
    requestAnimationFrame(tick);
  }
  KM.start = function () {
    if (reduce) return;
    document.addEventListener("visibilitychange", function () { running = !document.hidden; if (running) { last = performance.now(); requestAnimationFrame(tick); } });
    requestAnimationFrame(tick);
  };

  /* ───────────── The floor: typed wordmark + reveal ───────────── */
  KM.initFloor = function () {
    var floor = $(".k-floor"), content = $(".site-content");
    if (!floor || !content) return;
    $$("[data-type]", floor).forEach(function (el) {
      var t = el.textContent, dot = t.indexOf(".");
      el.setAttribute("aria-hidden", "true");
      el.innerHTML = t.split("").map(function (ch, i) {
        return '<span class="k-mark__c' + (dot > -1 && i >= dot ? " is-dim" : "") + '" style="--i:' + i + '">' + esc(ch) + "</span>";
      }).join("");
    });
    if (reduce) { floor.style.setProperty("--reveal", "1"); return; }
    var fr = 0, prev = -1;
    var measure = function () {
      fr = 0;
      var v = Math.round(100 * clamp((window.scrollY + window.innerHeight - content.offsetHeight - content.offsetTop) / (floor.offsetHeight || 1), 0, 1)) / 100;
      if (v !== prev) {
        prev = v; floor.style.setProperty("--reveal", String(v));
        floor.classList.toggle("is-typed", v >= .92);
        if (v > .01) document.body.setAttribute("data-floor-open", ""); else document.body.removeAttribute("data-floor-open");
      }
    };
    var schedule = function () { if (!fr) fr = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    floor.addEventListener("focusin", function () {
      var max = document.scrollingElement.scrollHeight;
      if (window.scrollY + window.innerHeight < max - 2) window.scrollTo({ top: max, behavior: "instant" });
    });
  };

  /* default boot for pages that don't need custom ordering */
  KM.boot = function () {
    KM.paintBots(document);
    KM.initReveal();
    KM.initMotion();
    KM.initFloor();
    KM.loadStars();
    KM.start();
  };
})();
