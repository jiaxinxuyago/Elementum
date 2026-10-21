/* Shared content blocks: the real reading content, rendered plainly.
   Variants decide where and how these sit (tiles, leaves, pages, sheets). */
const B = {
  hero: (o = {}) => `<div class="b-hero${o.cls ? ' ' + o.cls : ''}">
      <div class="b-htop"><img class="b-hseal" src="${o.seal || D.id.seal}" alt=""><div><span class="kick">You are</span><span class="b-harch">${o.arch || D.id.arch}</span></div>${o.share === false ? '' : `<span class="b-share">${use('ico-share')}</span>`}</div>
      <div class="b-hman"><span class="redrule"></span><p>${o.thesis || D.id.thesis}. ${o.edge || D.id.edge}</p></div>
      <div class="b-hlit">${o.lit || D.id.lit} · CAST FROM YOUR DAY OF BIRTH</div>
      <div class="b-hacts"><button class="b-bchart" data-go="${o.bchart || 'pillars'}">Birth chart ›</button><span data-go="${o.run || 'run'}" class="tap">${pill('cond', o.cond || D.cond)}</span></div>
    </div>`,
  sheet: (el, o = {}) => { const r = D.E[el]; const first = el === D.first; return `<div class="sheet-scrim" data-go="${o.back || 'reading'}"></div><div class="sheet">
      <span class="grab"></span>
      <div class="b-shhead">${dot(el, 40)}<span class="b-rt"><b>${r.head}</b><small>${ELN[el]} is your ${r.fn}${r.core ? ' · yourself' : ''}</small></span><span class="b-rr">${pill(r.pole)}<em>${r.p}%</em></span></div>
      ${o.art === false ? '' : `<div class="b-ill">${art(ART[el], 'b-illart')}<span class="b-illtag">${o.artTag || 'existing plate · pair art pending (GO-2)'}</span></div>`}
      <p class="b-story">${r.story}</p>
      <p class="b-now">${first ? '<span class="b-start">START HERE</span> ' : ''}${r.now}</p>
      <div class="b-doms">${r.doms.map((d) => `<span class="domchip" data-go="${o.dom || 'domain'}">${domIcon(d)}${d}</span>`).join('')}</div>
      <button class="cta" data-go="${o.read || 'energy'}">Read ${ELN[el]}, your ${r.fn} ${use('ico-arrow-r')}</button></div>`; },
  runHead: () => `<div class="b-runtop"><span class="ey">How am I running?</span>${pill('cond')}</div>${dial(D.score, D.cond)}<h2 class="disp b-runh">${D.runHead}</h2>`,
  nature: () => `<p class="b-nature">${D.nature}</p>`,
  mech: () => `<div class="b-sec"><span class="ey">How it works</span>${D.mech.map((m) => `<p>${m}</p>`).join('')}</div>`,
  onChart: (open = false) => `<div class="b-sec"><span class="ey">On your chart</span><p>For you, Body is <b>${D.body}</b> and Mind is <b>${D.mind}</b>.</p><button class="b-link" data-toggle=".b-codex">${use('ic-codex')}How is this worked out? ›</button>
      <div class="b-codex"${open ? '' : ' hidden'}><span class="ey">From the Codex · optional</span><p class="soft">${D.codex.score}</p>${D.codex.tests.map(([k, pts, ok, t]) => `<div class="b-test ${ok ? 'ok' : 'no'}"><span>${ok ? '✓' : '✗'} ${k}<b>${pts}</b></span><p>${t}</p></div>`).join('')}</div></div>`,
  giftsCosts: () => `<div class="b-traits"><div>${pill('cat', 'Gifts', false)}<ul>${D.gifts.map((g) => `<li>${g}</li>`).join('')}</ul></div><div>${pill('fric', 'Costs', false)}<ul>${D.costs.map((g) => `<li>${g}</li>`).join('')}</ul></div></div>`,
  scenes: () => `<div class="b-sec"><span class="ey">You will recognise it</span><dl class="b-scenes">${D.scenes.map(([k, t]) => `<div><dt>${k}</dt><dd>${t}</dd></div>`).join('')}</dl></div>`,
  helps: () => `<div class="b-sec"><span class="ey">What helps · ${D.verb}</span><p class="b-helps">${D.helps}</p><div class="b-hrows">${pill('cat')}<span>${D.grow}</span>${pill('fric')}<span>${D.release}</span></div></div>`,
  bpDoor: (go = 'blueprint') => `<div class="card tap b-bpdoor" data-go="${go}">${use('ico-lock', 'b-bpic')}<span>Your structure, in full: the Energy Blueprint</span>${pill('adv', 'Advisor', false)}${use('ico-chev-r')}</div>`,
  rx: () => `<div class="b-rxline"><span class="b-rxh fric">${use('ar-down')}Release</span>${D.ease.map((e) => `<span class="b-rxe" data-go="sheet-${e}">${mark(e)}${ELN[e]}${D.E[e].core ? ' (you)' : ''}</span>`).join('')}</div><div class="b-rxline"><span class="b-rxh cat">${use('ar-up')}Grow</span>${D.seek.map((e) => `<span class="b-rxe" data-go="sheet-${e}">${mark(e)}${ELN[e]}</span>`).join('')}</div>`,
  domRow: ([d, line, w], go = 'domain') => `<div class="b-domrow tap" data-go="${go}"><span class="b-domic">${domIcon(d)}</span><span class="b-domt"><span class="ey">${d}</span><span>${line}</span></span><span class="b-wt">${'●'.repeat(w)}${'○'.repeat(4 - w)}</span></div>`,
  seat: ([n, meta, t]) => `<div class="b-seat"><b>${n}</b><span class="carve">${meta}</span><p>${t}</p></div>`,
  chapter: (c, o = {}) => `<div class="b-chap${c.now ? ' now' : ''}"><div class="b-chh"><span class="disp b-chn">${c.name}</span><span class="carve">${c.when}</span></div>
      <div class="b-chel">${dot(c.el, 46)}<div><span class="b-chl"><b>${ELN[c.el]}</b>${c.under ? ` over ${ELN[c.under]}` : ''}</span><span class="light b-chfn">${c.fn}</span></div></div>
      <span class="b-tone ${c.tone.includes('LIFT') ? 'up' : c.tone === 'EVEN' ? 'even' : 'down'}">${c.tone}</span>
      ${o.short ? '' : `<span class="ey">The energy</span><p>${c.energy}</p>${c.lands ? `<span class="ey">Where it lands</span>${c.lands.map((l) => `<p>${l}</p>`).join('')}` : ''}`}</div>`,
  decadeNow: () => `<div class="b-dec"><span class="ey">${D.chapters.decadeNow.title}</span><p>${D.chapters.decadeNow.text}</p><span class="ey">This decade favours</span>${D.chapters.decadeNow.favours.map(([a, b]) => `<div class="b-fav"><b>${a}</b><span>over</span><span class="o">${b}</span></div>`).join('')}</div>`,
  year: ([y, el, fn, t, gate, gt]) => `<div class="b-year">${dot(el, 30)}<div><b>${y}, a${el === 'earth' ? 'n' : ''} ${ELN[el]} year</b><span class="carve">${fn}</span><p>${t}</p>${gate ? `<span class="ey">${gate}</span><p>${gt}</p>` : ''}</div></div>`,
  star: ([n, h, meta, line, t], short = false) => `<div class="b-star"><div class="b-sth"><span class="b-sthan han">${h}</span><div><b>${n}</b><span class="carve">${meta}</span></div></div><p class="b-stl">${line}</p>${short ? '' : `<p class="soft">${t}</p>`}</div>`,
  bpSec: ([n, t, p, k, kp]) => `<div class="b-bp"><span class="b-bpn">${n}</span><div><b class="disp">${t}</b><p>${p}</p><span class="ey">${k}</span><p class="soft">${kp}</p></div></div>`,
  pillars: () => `<div class="b-pill">${D.pillars.map(([n, s, b, se, be, h]) => `<div class="b-pcol${n.includes('SELF') ? ' self' : ''}"><span class="carve">${n}</span><span class="b-pc han e-${se}">${s}</span><span class="b-pc han e-${be}">${b}</span><span class="b-ph han">${h}</span></div>`).join('')}</div>`,
  seats: () => D.seats.map(([k, n, ds]) => `<div class="b-seatrow"><span class="han b-sk">${k}</span><span class="b-sn">${n}</span><span class="b-sd">${ds.map((d) => domIcon(d)).join('')}</span></div>`).join(''),
  favours: (list) => list.map(([a, b]) => `<div class="b-fav"><b>${a}</b><span>over</span><span class="o">${b}</span></div>`).join(''),
  domRings: (list) => `<div class="b-rings">${list.map(([d, s]) => `<div class="b-ring ${s.toLowerCase()}"><span>${domIcon(d)}</span><small>${d}</small><em>${s}</em></div>`).join('')}</div>`,
  loud: (n = 5) => D.almanac.loud.slice(0, n).map(([d, el, t]) => `<div class="b-loud">${mark(el)}<b>${d}</b><span>${t}</span></div>`).join(''),
  bars: (n) => `<span class="b-bars">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= n ? 'on' : ''}" style="height:${4 + i * 3}px"></i>`).join('')}</span>`,
  guidanceTile: ([h, t, s, tag], big = false) => `<div class="card b-gt${big ? ' big' : ''}"><span class="b-gth han">${h}</span><div><span class="mono">${tag}</span><b class="disp">${t}</b><span class="soft">${s}</span></div></div>`,
};
