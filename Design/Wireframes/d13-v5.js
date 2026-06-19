/* ═══════════════════════════════════════════════════════════════
   Elementum · D13 final wireframe v2 — ink-wash wheel + dissolve
   Element marks (#el-*) replace characters; tokens.css ramp.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var PIG = {
    metal: { pig: '#8BA3B8', deep: '#6A849A' },
    earth: { pig: '#B89A6A', deep: '#927750' },
    water: { pig: '#5A7FA8', deep: '#3E5F85' },
    wood:  { pig: '#7A9E6E', deep: '#587A4D' },
    fire:  { pig: '#C4745A', deep: '#9E5540' }
  };
  var INK = '#2B2722', GHOST = '#B8B0A2', UP = '#4a7a52', DOWN = '#a85c48';

  /* Demo chart — presence order (largest at top, clockwise descending).
     NOTE: each node's `d` (diameter) and `a` (angle) are RECOMPUTED from `p`
     at boot by applyDominanceRules() — see DOMINANCE_WHEEL_RULES.md. The
     literals below are illustrative defaults; `p` (presence %) is the only
     value you need to edit to re-key a chart. */
  var NODES_PRESENCE = [
    { el: 'metal', nm: 'Metal · core', pc: '42%', p: 42, d: 64, a: -90 },
    { el: 'earth', nm: 'Earth', pc: '28%', p: 28, d: 55, a: -18, badge: 'up' },
    { el: 'water', nm: 'Water', pc: '16%', p: 16, d: 47, a: 54 },
    { el: 'wood',  nm: 'Wood',  pc: '14%', p: 14, d: 45, a: 126 },
    { el: 'fire',  nm: 'Fire',  pc: '0%',  p: 0,  d: 40, a: 198, badge: 'down', ghost: true }
  ];

  /* Same chart, nodes seated in generation-cycle order (exploration W·D) */
  var NODES_CYCLE = [
    { el: 'metal', nm: 'Metal · core', pc: '42%', p: 42, d: 64, a: -90 },
    { el: 'water', nm: 'Water', pc: '16%', p: 16, d: 47, a: -18 },
    { el: 'wood',  nm: 'Wood',  pc: '14%', p: 14, d: 45, a: 54 },
    { el: 'fire',  nm: 'Fire',  pc: '0%',  p: 0,  d: 40, a: 126, badge: 'down', ghost: true },
    { el: 'earth', nm: 'Earth', pc: '28%', p: 28, d: 55, a: 198, badge: 'up' }
  ];

  var GEOM = { cx: 170, cy: 160, r: 132 };

  /* ═══════════════════════════════════════════════════════════════════════
     DOMINANCE WHEEL — DISK SIZE & SEATING RULE   (spec: DOMINANCE_WHEEL_RULES.md)
     ───────────────────────────────────────────────────────────────────────
     One rule governs every wheel in the app. Disk SIZE encodes how dominant
     an energy is; disk POSITION encodes its rank around the ring. Both are
     derived from one input per energy: its presence percentage `p` (0–100).

     1 · DIAMETER  (base units, multiplied by the wheel's `scale`)
         d(p) = D_MIN + (D_MAX − D_MIN) · (p / pMax)        ← linear in presence
         • pMax = the largest presence in THIS chart (the Day Master / dominant
           energy), so the dominant always renders at D_MAX on every chart,
           whatever its absolute %.
         • D_MIN is a legibility floor — the smallest disk that still holds the
           icon + number. A 0% energy renders at exactly D_MIN (present but
           hollow), never zero.
         • Icon + number are a FIXED size per wheel (they track `scale`, never
           `p`), so a small disk stays as readable as a large one.

     2 · SEATING  (presence mode — the canonical chart)
         • The dominant energy sits at the TOP of the ring (12 o'clock, −90°).
         • The rest follow CLOCKWISE in descending presence, one per 72° seat.
         • Ties break by fixed element order: metal, earth, water, wood, fire.
         RING_ANGLES = [−90, −18, 54, 126, 198]  (seat 0 = top, then clockwise)

     3 · SEATING  (cycle mode — alternative)
         • Seats are fixed to the generation cycle (相生): metal→water→wood→
           fire→earth. Size still encodes presence; only position differs.
     ═══════════════════════════════════════════════════════════════════════ */
  var D_MIN = 40, D_MAX = 64;
  var RING_ANGLES = [-90, -18, 54, 126, 198];
  var EL_ORDER = ['metal', 'earth', 'water', 'wood', 'fire'];

  function diameterFor(p, pMax) {
    if (!(pMax > 0)) return D_MIN;
    var t = Math.max(0, Math.min(1, p / pMax));
    return Math.round(D_MIN + (D_MAX - D_MIN) * t);
  }

  /* Enforce the rule on a node list: recompute every disk's diameter from its
     presence, and (in presence mode) re-seat the disks largest-at-top, clockwise. */
  function applyDominanceRules(nodes, mode) {
    var pMax = nodes.reduce(function (m, n) { return Math.max(m, n.p); }, 0);
    nodes.forEach(function (n) { n.d = diameterFor(n.p, pMax); });
    if (mode === 'presence') {
      nodes.slice()
        .sort(function (a, b) { return (b.p - a.p) || (EL_ORDER.indexOf(a.el) - EL_ORDER.indexOf(b.el)); })
        .forEach(function (n, i) { n.a = RING_ANGLES[i % RING_ANGLES.length]; });
    }
    return nodes;
  }
  /* generation order: metal → water → wood → fire → earth → metal */
  var SHENG = [['metal', 'water'], ['water', 'wood'], ['wood', 'fire'], ['fire', 'earth'], ['earth', 'metal']];

  function rad(deg) { return deg * Math.PI / 180; }
  function nodePos(geom, n) {
    return { x: geom.cx + geom.r * Math.cos(rad(n.a)), y: geom.cy + geom.r * Math.sin(rad(n.a)) };
  }

  /* ── sampled quadratic bezier, trimmed at both node rims ── */
  function chordPath(geom, A, rA, B, rB) {
    var mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
    var cxp = mx + (geom.cx - mx) * 0.52, cyp = my + (geom.cy - my) * 0.52;
    var pts = [];
    for (var i = 0; i <= 64; i++) {
      var t = i / 64, u = 1 - t;
      pts.push({
        x: u * u * A.x + 2 * u * t * cxp + t * t * B.x,
        y: u * u * A.y + 2 * u * t * cyp + t * t * B.y
      });
    }
    var i0 = 0, i1 = pts.length - 1;
    while (i0 < pts.length && Math.hypot(pts[i0].x - A.x, pts[i0].y - A.y) < rA + 5) i0++;
    while (i1 > 0 && Math.hypot(pts[i1].x - B.x, pts[i1].y - B.y) < rB + 9) i1--;
    if (i1 - i0 < 4) return null;
    var seg = pts.slice(i0, i1 + 1);
    var dStr = 'M' + seg.map(function (p) { return p.x.toFixed(1) + ' ' + p.y.toFixed(1); }).join(' L');
    var last = seg[seg.length - 1], prev = seg[seg.length - 4] || seg[0];
    return { d: dStr, end: last, ang: Math.atan2(last.y - prev.y, last.x - prev.x) };
  }

  function svgEl(name, attrs) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function arrowHead(end, ang, color, op, s) {
    s = s || 5;
    var p1 = (end.x - s * Math.cos(ang - 0.45)).toFixed(1) + ',' + (end.y - s * Math.sin(ang - 0.45)).toFixed(1);
    var p2 = end.x.toFixed(1) + ',' + end.y.toFixed(1);
    var p3 = (end.x - s * Math.cos(ang + 0.45)).toFixed(1) + ',' + (end.y - s * Math.sin(ang + 0.45)).toFixed(1);
    return svgEl('polyline', { points: p1 + ' ' + p2 + ' ' + p3, fill: 'none', stroke: color, 'stroke-opacity': op, 'stroke-width': 1.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  }

  function byEl(nodes, el) { for (var i = 0; i < nodes.length; i++) if (nodes[i].el === el) return nodes[i]; return null; }

  /* ── render the svg overlay for a wheel ──
     variant: 'committed' | 'quiet' | 'spokes' | 'marked' | 'cycle'
     (the brush enso replaces the vector ring in v2)              */
  function renderWheelSvg(svg, nodes, variant, geom, opts) {
    geom = geom || GEOM; opts = opts || {};
    svg.setAttribute('viewBox', '0 0 ' + (geom.cx * 2) + ' ' + (geom.cy * 2));
    return; /* pure reference style: ring + dots + center only (no chords/spokes/badges) */
    /* eslint-disable no-unreachable */

    if (variant === 'quiet') {
      var hx = geom.cx + geom.r * Math.cos(rad(-50)), hy = geom.cy + geom.r * Math.sin(rad(-50));
      svg.appendChild(arrowHead({ x: hx, y: hy }, rad(40), INK, 0.4, 5));
    }

    if (variant === 'committed' || variant === 'cycle') {
      SHENG.forEach(function (pair) {
        var A = byEl(nodes, pair[0]), B = byEl(nodes, pair[1]);
        var pa = nodePos(geom, A), pb = nodePos(geom, B);
        var hot = (pair[0] === 'earth' && pair[1] === 'metal');
        var col = hot ? PIG.earth.deep : INK;
        var op = hot ? 0.45 : 0.11;
        var ch = chordPath(geom, pa, A.d / 2, pb, B.d / 2);
        if (!ch) return;
        svg.appendChild(svgEl('path', {
          d: ch.d, fill: 'none', stroke: col, 'stroke-opacity': op,
          'stroke-width': hot ? 1.4 : 1, 'stroke-linecap': 'round'
        }));
        svg.appendChild(arrowHead(ch.end, ch.ang, col, hot ? 0.6 : 0.24));
      });
    }

    if (variant === 'spokes' || variant === 'marked') {
      nodes.forEach(function (n) {
        if (variant === 'marked' && !n.badge) return;
        var p = nodePos(geom, n);
        var dx = geom.cx - p.x, dy = geom.cy - p.y, L = Math.hypot(dx, dy);
        var ux = dx / L, uy = dy / L;
        var x1 = p.x + ux * (n.d / 2 + 3), y1 = p.y + uy * (n.d / 2 + 3);
        var x2 = geom.cx - ux * ((opts.centerR || 46) + 3), y2 = geom.cy - uy * ((opts.centerR || 46) + 3);
        var col = INK, op = 0.2, w = 0.6 + n.p * 0.045;
        if (variant === 'marked') { col = n.badge === 'up' ? UP : DOWN; op = 0.5; w = n.badge === 'up' ? 1.6 : 1.1; }
        var line = svgEl('line', { x1: x1.toFixed(1), y1: y1.toFixed(1), x2: x2.toFixed(1), y2: y2.toFixed(1), stroke: col, 'stroke-opacity': op, 'stroke-width': w.toFixed(2), 'stroke-linecap': 'round' });
        if (n.ghost || (variant === 'marked' && n.badge === 'down')) line.setAttribute('stroke-dasharray', '2 4');
        svg.appendChild(line);
      });
    }
  }

  /* ── generate node divs (marks, not characters) ── */
  function buildWheelNodes(box, nodes, geom, scale, tilde) {
    scale = scale || 1;
    var bloom = box.hasAttribute('data-bloom') ? box.getAttribute('data-bloom').split(',').map(parseFloat) : null;
    nodes.forEach(function (n, idx) {
      var p = nodePos(geom, n);
      var d = n.d * scale;
      var div = document.createElement('div');
      div.className = 'node n-' + n.el;
      div.style.width = d + 'px'; div.style.height = d + 'px';
      div.style.left = (p.x - d / 2).toFixed(1) + 'px';
      div.style.top = (p.y - d / 2).toFixed(1) + 'px';
      var pc = tilde ? '~' + n.pc : n.pc;
      /* content size is FIXED per wheel (tracks wheel scale, NOT disk size) so
         every disk stays equally readable while diameter alone signals dominance */
      var mk = Math.round(18 * scale);
      var pcSize = Math.round(10.5 * scale);
      var html = '';
      html += '<svg class="elmark" viewBox="0 0 24 24" style="width:' + mk + 'px;height:' + mk + 'px"><use href="#el-' + n.el + '"></use></svg>';
      html += '<span class="pc" style="font-size:' + pcSize + 'px">' + pc + '</span>';
      div.innerHTML = html;
      div.setAttribute('data-el', n.el);
      div.style.gap = Math.max(0, Math.round(scale)) + 'px';
      if (box.hasAttribute('data-interactive') && !box.hasAttribute('data-sync')) {
        div.style.cursor = 'pointer';
        div.setAttribute('title', 'Shows the ' + n.el + ' reading below');
        div.addEventListener('click', function () { if (window.__fcSelect) window.__fcSelect(n.el); });
      }
      if (bloom && bloom[idx] !== undefined) {
        div.style.opacity = String(bloom[idx]);
        div.style.transform = 'scale(' + (0.72 + 0.28 * bloom[idx]).toFixed(3) + ')';
      }
      box.appendChild(div);
    });
  }

  /* ── boot static wheels ── */
  function boot() {
    /* diameter + seating are derived from presence per DOMINANCE_WHEEL_RULES.md */
    applyDominanceRules(NODES_PRESENCE, 'presence');
    applyDominanceRules(NODES_CYCLE, 'cycle');
    document.querySelectorAll('svg[data-wheel]').forEach(function (svg) {
      var variant = svg.getAttribute('data-wheel');
      var order = svg.getAttribute('data-order') === 'cycle' ? NODES_CYCLE : NODES_PRESENCE;
      renderWheelSvg(svg, order, variant, GEOM, {});
    });

    document.querySelectorAll('[data-wheel-nodes]').forEach(function (box) {
      var order = box.getAttribute('data-order') === 'cycle' ? NODES_CYCLE : NODES_PRESENCE;
      var scale = parseFloat(box.getAttribute('data-scale') || '1');
      var tilde = box.hasAttribute('data-tilde');
      if (scale !== 1) {
        var g = { cx: GEOM.cx * scale, cy: GEOM.cy * scale, r: GEOM.r * scale };
        var svg = box.querySelector('svg[data-wheel-mini]');
        if (svg) renderWheelSvg(svg, order, box.getAttribute('data-wheel-nodes') || 'quiet', g, { centerR: 46 * scale });
        buildWheelNodes(box, order, g, scale, tilde);
      } else {
        buildWheelNodes(box, order, GEOM, 1, tilde);
      }
    });

    initDissolve();
    initPlay();
    initGoto();
    decorateSpines();
    initShelf();
  }

  /* ── inject the floating ink mark (StemTile pattern) into every open spine ── */
  function decorateSpines() {
    document.querySelectorAll('.spine[data-el]').forEach(function (s) {
      var txt = s.querySelector('.sp-open .sp-txt');
      if (!txt || txt.querySelector('.sp-head')) return;
      var el = s.getAttribute('data-el');
      var head = document.createElement('div');
      head.className = 'sp-head';
      var seal = document.createElement('span');
      seal.className = 'sp-seal n-' + el;
      seal.innerHTML = '<svg class="elmark" viewBox="0 0 24 24"><use href="#el-' + el + '"></use></svg>';
      head.appendChild(seal);
      var ey = txt.querySelector('.sp-ey');
      if (ey) head.appendChild(ey); /* move the eyebrow up beside the seal */
      txt.insertBefore(head, txt.firstChild);
    });
  }

  /* ── P3·B · accordion shelf two-way latched to the wheel ── */
  function initShelf() {
    var sec = document.querySelector('[data-screen-label="P3 · Beat 2 — Reading catalogue"]');
    if (!sec) return;
    var shelf = sec.querySelector('.shelf');
    var wheel = sec.querySelector('.mini-wheel');
    var spines = Array.prototype.slice.call(sec.querySelectorAll('.spine'));
    if (!shelf || !spines.length) return;
    var order = spines.map(function (s) { return s.getAttribute('data-el'); });
    var nodes = wheel ? Array.prototype.slice.call(wheel.querySelectorAll('.node')) : [];

    var INTRO = {
      metal: 'Metal rules clarity and judgment — your dominant force, the edge that cuts to what is true.',
      earth: 'Earth rules stability and care — your strongest ally, the ground that steadies and feeds you.',
      water: 'Water rules depth and adaptability — the wisdom that flows around what it cannot move.',
      wood:  'Wood rules growth and vision — the upward push toward what your strength is for.',
      fire:  'Fire rules drive and urgency — scarce in you, a heat you visit rather than hold.'
    };
    var ribbon = sec.querySelector('.rx-ribbon');

    function select(el) {
      spines.forEach(function (s) { s.classList.toggle('open', s.getAttribute('data-el') === el); });
      nodes.forEach(function (n) { n.classList.toggle('sel', n.getAttribute('data-el') === el); });
      if (ribbon && INTRO[el]) ribbon.textContent = INTRO[el];
    }

    spines.forEach(function (s) {
      s.addEventListener('click', function (ev) {
        // the Read pill carries its own data-goto (handled by initGoto)
        if (ev.target.closest && ev.target.closest('.sp-read')) return;
        select(s.getAttribute('data-el'));
      });
    });
    nodes.forEach(function (n) {
      n.style.cursor = 'pointer';
      n.setAttribute('title', 'Open the ' + n.getAttribute('data-el') + ' reading');
      n.addEventListener('click', function () { select(n.getAttribute('data-el')); });
    });
    select('metal');
  }

  /* ── the focus card: one element at a time ── */
  var FOCUS = {
    metal: { ey: 'METAL · 42% · YOUR CORE', hook: 'Your core — precision before intention.', pol: 'Refinement · the edge — one of your five energies.', art: 't_metal_1_s', cls: 'dk-metal', goto: 'P6 · Energy card — Earth' },
    earth: { ey: 'EARTH · 28% · ↑ CATALYST', hook: 'The ground that feeds your edge.', pol: 'Stability · the centre — one of your five energies.', art: 't_earth_2_s', cls: 'dk-earth', goto: 'P6 · Energy card — Earth' },
    water: { ey: 'WATER · 16%', hook: 'Where your edge learns to flow.', pol: 'Flow · the descent — one of your five energies.', art: 't_water_5_s', cls: 'dk-water', goto: 'P6 · Energy card — Earth' },
    wood:  { ey: 'WOOD · 14%', hook: 'What your blade is for.', pol: 'Growth · the upward push — one of your five energies.', art: 't_wood_1_s', cls: 'dk-wood', goto: 'P6 · Energy card — Earth' },
    fire:  { ey: 'FIRE · 0% · ↓ FRICTION', hook: 'The forge you borrow, never own.', pol: 'Radiance · the rising heat — one of your five energies.', art: 't_fire_1_s', cls: 'ghosted', goto: 'P7 · Energy card — Fire ghost' }
  };
  function initFocus() {
    var card = document.getElementById('focus-card');
    if (!card) return;
    var img = document.getElementById('fc-art');
    var ey = document.getElementById('fc-ey');
    var hook = document.getElementById('fc-hook');
    var pol = document.getElementById('fc-pol');
    var read = document.getElementById('fc-read');
    window.__fcSelect = function (el) {
      var f = FOCUS[el];
      if (!f) return;
      card.className = 'focus-card ' + f.cls;
      img.src = 'assets/art/' + f.art + '.png';
      ey.textContent = f.ey;
      hook.textContent = f.hook;
      pol.textContent = f.pol;
      read.setAttribute('data-goto', f.goto);
      document.querySelectorAll('[data-interactive] .node').forEach(function (n) {
        n.classList.toggle('sel', n.classList.contains('n-' + el));
      });
    };
    window.__fcSelect('metal');
  }

  /* ── wall-clock animator: rAF is intermittently throttled in embedded webviews ── */
  function animate(dur, onFrame) {
    var start = Date.now(), stopped = false;
    function step() {
      if (stopped) return;
      var p = Math.min(1, (Date.now() - start) / dur);
      onFrame(p);
      if (p < 1) setTimeout(step, 16);
    }
    setTimeout(step, 0);
    return function () { stopped = true; };
  }

  /* ── autoplay the dissolve ── */
  function initPlay() {
    var btn = document.getElementById('play-dissolve');
    var scroller = document.getElementById('dissolve-scroll');
    if (!btn || !scroller) return;
    var stop = null;
    function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
    btn.addEventListener('click', function () {
      if (stop) { stop(); stop = null; }
      var max = scroller.scrollHeight - scroller.clientHeight;
      var fwd = scroller.scrollTop < max * 0.5;
      var from = scroller.scrollTop, to = fwd ? max : 0;
      var dur = Math.max(600, 3400 * Math.abs(to - from) / max);
      stop = animate(dur, function (p) {
        scroller.scrollTop = from + (to - from) * ease(p);
        scroller.dispatchEvent(new Event('scroll'));
        if (p >= 1) { stop = null; btn.textContent = (to === 0) ? '▶ Play the transition' : '↺ Play it back'; }
      });
    });
  }

  /* ── tap-through: rows, nodes, seal → destination panels ── */
  function initGoto() {
    var stop = null;
    function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
    document.addEventListener('click', function (ev) {
      var t = ev.target && ev.target.closest ? ev.target.closest('[data-goto]') : null;
      if (!t) return;
      var sec = document.querySelector('[data-screen-label="' + t.getAttribute('data-goto') + '"]');
      if (!sec) return;
      var from = window.scrollX;
      var to = from + sec.getBoundingClientRect().left - 80;
      if (stop) { stop(); stop = null; }
      stop = animate(650, function (p) {
        window.scrollTo(from + (to - from) * ease(p), window.scrollY);
        if (p >= 1) stop = null;
      });
      sec.classList.add('goto-flash');
      setTimeout(function () { sec.classList.remove('goto-flash'); }, 1600);
    });
  }

  /* ═══════════ the live dissolve (P2 · scrub) ═══════════ */
  function lerp(a, b, t) { return a + (b - a) * t; }
  function win(p, a, b) { return Math.max(0, Math.min(1, (p - a) / (b - a))); }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function initDissolve() {
    var scroller = document.getElementById('dissolve-scroll');
    if (!scroller) return;
    var paint = document.getElementById('ds-paint');
    var textTop = document.getElementById('ds-text-top');
    var textBottom = document.getElementById('ds-text-bottom');
    var seal = document.getElementById('ds-seal');
    var enso = document.getElementById('ds-enso');
    var wheelWrap = document.getElementById('ds-wheel');
    var after = document.getElementById('ds-after');
    var eyebrow = document.getElementById('ds-eyebrow');
    var hint = document.getElementById('ds-hint');
    var peek = document.getElementById('ds-peek');
    var bgRevealTop = document.getElementById('ds-bg-reveal-top');
    var bgRevealBot = document.getElementById('ds-bg-reveal-bot');
    var bgFog = document.getElementById('ds-bg-fog');
    var bgEnergy = document.getElementById('ds-bg-energy');
    var pagetint = document.getElementById('ds-pagetint');
    var nodes = wheelWrap ? Array.prototype.slice.call(wheelWrap.querySelectorAll('.node')) : [];
    var links = wheelWrap ? Array.prototype.slice.call(wheelWrap.querySelectorAll('svg path, svg polyline')) : [];

    /* seal travel: plate spot → wheel center (stage coords) */
    var S0 = { x: 127, y: 88, s: 120 };
    var S1 = { x: 53, y: 89, s: 276 };

    function apply() {
      var max = scroller.scrollHeight - scroller.clientHeight;
      var p = max > 0 ? scroller.scrollTop / max : 0;

      /* ground crossfade: Reveal mountains (pre-dissolve) → Energy-Map band (wheel) */
      var bgOut = win(p, 0.06, 0.44);
      if (bgRevealTop) bgRevealTop.style.opacity = (1 - bgOut).toFixed(3);
      if (bgRevealBot) bgRevealBot.style.opacity = (0.6 * (1 - bgOut)).toFixed(3);
      if (bgFog) bgFog.style.opacity = (1 - bgOut).toFixed(3);
      if (bgEnergy) bgEnergy.style.opacity = (0.82 * win(p, 0.40, 0.72)).toFixed(3);
      if (pagetint) pagetint.style.opacity = win(p, 0.40, 0.72).toFixed(3);

      if (paint) paint.style.opacity = String(1 - win(p, 0.04, 0.42));
      if (textTop) {
        var t1 = win(p, 0.04, 0.34);
        textTop.style.opacity = String(1 - t1);
        textTop.style.transform = 'translateY(' + (-64 * easeOut(t1)).toFixed(1) + 'px)';
      }
      if (textBottom) {
        var t2 = win(p, 0.12, 0.46);
        textBottom.style.opacity = String(1 - t2);
        textBottom.style.transform = 'translateY(' + (-44 * easeOut(t2)).toFixed(1) + 'px)';
      }
      if (peek) peek.style.opacity = String(1 - win(p, 0.02, 0.18));

      var ts = easeOut(win(p, 0.08, 0.74));
      if (seal) {
        var s = lerp(S0.s, S1.s, ts);
        seal.style.transform = 'translate(' + lerp(S0.x, S1.x, ts).toFixed(1) + 'px,' + lerp(S0.y, S1.y, ts).toFixed(1) + 'px)';
        seal.style.width = s.toFixed(1) + 'px';
        seal.style.height = s.toFixed(1) + 'px';
      }

      /* the brush ring paints itself in — conic reveal */
      if (enso) enso.style.setProperty('--draw', String(win(p, 0.44, 0.70)));
      links.forEach(function (lk) { lk.style.opacity = String(win(p, 0.86, 0.98)); });
      nodes.forEach(function (nd, i) {
        var t = win(p, 0.52 + i * 0.085, 0.64 + i * 0.085);
        nd.style.opacity = String(t);
        nd.style.transform = 'scale(' + lerp(0.55, 1, easeOut(t)).toFixed(3) + ')';
      });
      if (after) {
        var ta = win(p, 0.82, 0.98);
        after.style.opacity = String(ta);
        after.style.transform = 'translateY(' + (18 * (1 - easeOut(ta))).toFixed(1) + 'px)';
      }
      if (eyebrow) eyebrow.style.opacity = String(win(p, 0.84, 0.98));
      var tb = document.getElementById('ds-tabbar');
      if (tb) tb.style.opacity = String(win(p, 0.86, 0.99));
      if (hint) {
        hint.textContent = p > 0.92 ? 'scroll ⇡ — fully reversible' : 'scroll ⇣ inside the phone';
        hint.style.opacity = (p > 0.04 && p < 0.92) ? '0' : '1';
      }
    }

    scroller.addEventListener('scroll', apply, { passive: true });
    apply();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
