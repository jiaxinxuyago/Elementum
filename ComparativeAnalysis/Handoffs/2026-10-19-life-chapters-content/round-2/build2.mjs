import fs from 'node:fs';
const E = JSON.parse(fs.readFileSync('energy.json', 'utf8'));
const S = JSON.parse(fs.readFileSync('/home/user/Elementum/ComparativeAnalysis/Prompts/out/handoff/2026-10-19-chapters-template/samples-energy.json', 'utf8')).units;
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const FNW = { Body: 'your own energy', Mind: 'thinking and support', Expression: 'your output and voice', Action: 'reach and resources', Order: 'structure and pressure' };
const DOMS = ['Career', 'Wealth', 'Love', 'Family', 'Social', 'Health', 'Mind', 'Growth'];
const GATE_DOM = { year: 'Family', month: 'Career', day: 'Love', hour: 'Family' };
const SPAN = { year: 'birth to 15', month: '16 to 34', day: '35 to 47', hour: '48 on' };
const AGE_FROM = { year: 0, month: 16, day: 35, hour: 48 };
const BY = { golden: 1995, B: 1990, C: 1992 };
const META = {
  golden: ['The golden chart', '1995-04-29 18:00 Beijing · 庚 Metal, Overfueled · age 31', 'Every chapter, decade and this year written energy first.'],
  B: ['Chart B', '1990-09-17 05:00 Beijing · 乙 Wood, Underfueled · age 36', 'The current chapter and decade written in full. The others show the energy only.'],
  C: ['Chart C', '1992-05-25 Beijing, hour unknown · 辛 Metal, Underfueled · age 34', 'The current chapter and decade written in full. The Late Chapter is closed.'],
};
const find = (page, key) => S.find((u) => u.page === page && u.key === key);
const fill = (t, el, g) => t.replace(/\{el\}|\{e\}/g, el).replace(/\{g\}/g, g || '');
const dot = (el, big) => `<span class="el el-${el.toLowerCase()}${big ? ' big' : ''}" aria-hidden="true"></span>`;
const lift = (step) => `<span class="lift" role="img" aria-label="lift ${step} of 4">${[0, 1, 2, 3, 4].map((i) => `<i class="${i === step ? 'on' : ''} s${i}"></i>`).join('')}</span><span class="liftw">${['Weighs', 'Weighs a little', 'Even', 'Lifts a little', 'Lifts'][step]}</span>`;
const dirw = (d) => (d === 'grow' ? 'you grow it' : d === 'release' ? 'you release it' : 'even');
function board(domains, gateDom, chosen) {
  const w = Object.fromEntries(domains); if (gateDom && !w[gateDom]) w[gateDom] = 1;
  return `<div class="board">${DOMS.map((d) => `<span class="dm${w[d] ? '' : ' off'}${chosen.includes(d) ? ' pick' : ''}"><b>${d}</b><span class="pips">${[1, 2, 3, 4].map((i) => `<i class="${(w[d] || 0) >= i ? 'on' : ''}"></i>`).join('')}</span></span>`).join('')}</div>`;
}
const keyOf = (u) => `<span class="k">${esc(u.key)}</span>`;
function textU(page, key, el, g, cls = '') { const u = find(page, key); if (!u && page !== 'golden') return ''; if (!u) return `<p class="ns">Not sampled in this round · <code>${esc(key)}</code></p>`; return `<p class="rd ${cls}">${esc(fill(u.text, el, g))}</p>${keyOf(u)}`; }
function chapter(id, c, v) {
  const tense = c.tense; const t = tense === 'lived' ? 'lived' : tense;
  const head = `<div class="chh"><span class="cn">The ${c.name}</span><span class="cs">${SPAN[c.g]} · ${tense === 'coming' ? 'from ' + (BY[id] + AGE_FROM[c.g]) : tense}</span></div>`;
  if (c.closed) return `<div class="card chap coming">${head}<div class="gap">Your Hour Gate is closed. Add your birth hour to read your Late Chapter. <span class="door">Add your hour ›</span></div></div>`;
  const g = c.ground;
  let h = `<div class="card chap ${tense}">${head}<div class="ehead">${dot(c.el, 1)}<div class="eh"><span class="en">${c.el}${g ? ` <small>over ${g.el}</small>` : ''}</span><span class="ef">${c.fn} · ${FNW[c.fn]} · ${dirw(c.dir)}</span></div>${g ? dot(g.el) : ''}</div><div class="liftrow">${lift(c.lift.step)}</div>`;
  const ek = `ENERGY ${c.fn.toLowerCase()} · chapter.${c.g}.${c.dir}.${t}`;
  h += `<span class="sec">The energy</span>${textU(id, ek, c.el)}`;
  if (g) { const gk = tense === 'lived' ? `TEMPLATED tpl_chapters · ground.${g.rel}.lived` : `TEMPLATED tpl_almanac · ground.${g.rel}`; h += `<span class="sec">Underneath · ${g.el}, ${g.fn}</span>${textU(id, gk, c.el, g.el)}`; }
  else h += `<p class="note2">The Home Chapter is read from the ground you stand on, so it carries one energy.</p>`;
  const used = (v._used ||= new Set()); const fk = (d) => `ENERGY ${c.fn.toLowerCase()} · chapter_domain.${d}.${c.dir}`;
  const top = tense === 'lived' ? [] : [GATE_DOM[c.g], ...c.domains.map((d) => d[0]).filter((d) => d !== GATE_DOM[c.g])].filter((d) => !used.has(fk(d))).slice(0, 3); top.forEach((d) => used.add(fk(d)));
  h += `<span class="sec">Where it lands</span>${board(c.domains, GATE_DOM[c.g], tense === 'lived' ? [] : top)}`;
  if (tense === 'lived') h += `<p class="note2">A lived chapter shows its domains only. No advice for the past.</p>`;
  else for (const d of top) { const k = fk(d); const u = find(id, k); if (!u && id !== 'golden') continue; h += u ? `<div class="dl"><b>${d}</b><p class="rd">${esc(fill(u.text, c.el))}</p>${keyOf(u)}</div>` : `<div class="dl"><b>${d}</b><p class="ns">Not sampled · <code>${esc(k)}</code></p></div>`; }
  if (tense === 'now') {
    const seek = Object.entries(v.sign).filter(([, s]) => s > 0).sort((a, b) => (v.presence[a[0]] ?? 0) - (v.presence[b[0]] ?? 0)).map(([e]) => e);
    const brings = v.decades.filter((d) => d.tense !== 'lived' && d.el === seek[0]);
    h += `<span class="sec">Working with it</span>${textU(id, `ENERGY ${c.fn.toLowerCase()} · chapter_manual.${c.dir}`, c.el)}`;
    h += `<div class="seek"><span class="pill">Seek</span>${seek.slice(0, 2).map((e) => `${dot(e)}<span>${e}, ${v.fn[e]}</span>`).join('')}<span class="when2">${brings.length ? `${seek[0]} arrives with your decade from ${brings[0].start}` : `no decade of yours brings ${seek[0]}`}</span></div>`;
  }
  const decs = v.decades.filter((d) => { const a = d.age; const gate = a < 16 ? 'year' : a < 35 ? 'month' : a < 48 ? 'day' : 'hour'; return gate === c.g && d.age + 9 >= 10; });
  const nowDec = v.decades.find((d) => d.tense === 'now'); const nowAge = v.age; const nowGate = nowAge < 16 ? 'year' : nowAge < 35 ? 'month' : nowAge < 48 ? 'day' : 'hour';
  let list = decs.filter((d) => d.tense !== 'now'); if (c.g === nowGate && nowDec) list = [...list, nowDec].sort((a, b) => a.start - b.start);
  const seen = {};
  for (const d of list) {
    const isEarly = c.g === 'year' && d.tense === 'lived';
    const base = `ENERGY ${d.fn.toLowerCase()} · decade.${d.dir}.${isEarly ? 'early' : d.tense}`; seen[base] = (seen[base] || 0) + 1;
    const k = d.tense === 'now' ? base : `${base}.${seen[base] === 1 ? 'a' : 'b'}`;
    h += `<div class="dec${d.tense === 'now' ? ' now' : ''}"><div class="dh">${dot(d.el)}<span class="dw">${d.tense === 'now' ? 'Now · ' : ''}${d.el} decade · ${d.start} to ${d.end} · ${d.fn}</span>${lift(d.lift.step)}</div>${textU(id, k, d.el, d.ground.el)}`;
    if (d.tense === 'now') {
      h += `<span class="sec">Underneath · ${d.ground.el}</span>${textU(id, `TEMPLATED tpl_almanac · ground.${d.ground.rel}`, d.el, d.ground.el)}`;
      const fav = S.filter((u) => u.page === id && u.kind === 'favours' && u.key.startsWith(`ENERGY ${d.fn.toLowerCase()} · favours.decade.`));
      if (fav.length) h += `<span class="sec">This decade favours</span><div class="favs">${fav.map((u) => { const [a, b] = u.text.split('|'); const dm = u.key.split('.')[2]; return `<div class="fav"><b>${dm}</b><span>${esc(a)}</span><em>over</em><span class="o">${esc(b)}</span></div>`; }).join('')}</div>`;
      if (id === 'golden') {
        const y = v.years[0];
        h += `<div class="yc"><span class="yh">${dot(y.el)} 2026, ${y.el} year · ${y.fn} ${lift(y.lift.step)}</span>${textU(id, 'ENERGY order · year.need', y.el)}<span class="bl">Lands on your Day Gate · join</span>${textU(id, 'TEMPLATED tpl_almanac · land.year.frame.day', y.el)}</div>`;
      }
    }
    h += `</div>`;
  }
  return h + `</div>`;
}
function chart(id) {
  const v = E[id]; const [t, sub, note] = META[id];
  const strip = `<div class="strip">${v.decades.map((d) => `<span class="dc l${d.lift.step}${d.tense === 'now' ? ' now' : ''}">${dot(d.el)}<b>${d.age}</b>${d.el}</span>`).join('')}</div>`;
  const cur = v.chapters.find((c) => c.tense === 'now'); const cd = v.decades.find((d) => d.tense === 'now');
  let h = `<section class="chart" id="${id}"><header class="ch"><h2>${t}</h2><p class="sub">${esc(sub)}</p><p class="note">${esc(note)}</p></header><div class="phone"><div class="card head"><span class="lab">YOUR LIFE CHAPTERS</span><p class="claim">You are in your ${cur.name}, carrying ${cur.el}, in a ${cd.el} decade.</p>${strip}<p class="cap">Each decade is an energy. Deeper colour lifts your chart, paler weighs on it.</p></div>`;
  for (const c of v.chapters) h += chapter(id, c, v);
  return h + `</div></section>`;
}
const before = `<div class="cmp"><h3>Before and after · the golden Rising Chapter</h3>
<div class="b"><span class="tag">Round 1 · read through the characters</span><p class="rd">Your Rising Chapter is the one where you prove yourself alone. Since your late teens you have taken whole jobs and signed your name to them, and you trust what you carried yourself more than anything you were handed.</p><p class="rd">Beneath it runs a private education in things nobody asked you to learn. You are gathering the strange and specialist knowledge your later work is paid for, and you rarely explain it to anyone.</p><span class="k">the Twin at the Month Gate · the Alchemist inside</span></div>
<div class="a"><span class="tag go">Round 2 · energy first</span><p class="rd">Your Rising Chapter carries Metal, your own energy, into a chart that already runs over with it. Since your late teens your work has asked you to prove yourself, and you push harder than any job needs. The strength is real, and you are learning where to spend it.</p><p class="rd">Under it runs Earth, which feeds the Metal, and you feel it hold all the way through.</p><p class="rd">In Career, this chapter favours work you share over work you carry alone, and you do your best when someone else holds the other end.</p><p class="rd">This chapter fills you with more of your own strength than you can store. It works for you when you spend it, on hard work and on people who can match you.</p><span class="k">Metal over Earth · Body over Mind · you release both</span></div></div>`;
const flow = `<ol class="flow"><li><b>The energy.</b> What the chapter carries, its function, and whether your chart grows it or releases it. The lift meter shows the result.</li><li><b>Underneath.</b> The ground energy and how it meets the top one, in the Almanac’s five ground lines.</li><li><b>Where it lands.</b> The eight-domain board, then a line for the gate’s own domain and the two weightiest, each saying what the chapter favours.</li><li><b>Working with it</b> (the chapter you are in now). The Energy Manual’s part: one line on how the chapter’s energy works for you, then the energy to seek and the decade that brings it.</li><li><b>Decades.</b> Each decade is an energy too: one line each, and the current decade in full with its ground and what it favours.</li><li><b>Years</b> (Advisor). The year’s energy and where it lands, the same lines Your Almanac uses.</li></ol>`;
const Q = [
  ['L1', 'The order of a chapter', 'The six steps above. The energy always opens.', ['Energy, underneath, where it lands, working with it, decades, years.', 'Working with it before where it lands.', 'No working-with-it step. The domain lines carry the advice.']],
  ['L2', 'Characters on the page', 'Your Almanac ruled that character names and Chinese characters leave the reading text.', ['The same here. Element dots and function words only. The pillar chart keeps the characters.', 'Keep a small seat caption under the energy (“the Steward at · the Artisan inside”).']],
  ['L3', 'The chapter energy line: what it knows', 'A Rising Chapter of Order (a boss, a rule) reads differently from an Early Chapter of Order (rules at home).', ['Function × gate × grow or release × tense. About 88 units.', 'Function × state × tense, with the gate given only by the chapter name. About 57 units.']],
  ['L4', 'Which domains get a line', 'The board shows all eight with their weight.', ['The gate’s own domain (Family, Career, Love, Family) plus the two weightiest. A domain line shows once per page, so a later chapter with the same energy moves to its next domain.', 'Every domain the energy rules, in full.', 'The three weightiest only.']],
  ['L5', 'The voice of the advice', 'The owner’s direction lifts the no-advice rule here, as on Your Almanac (D1 B).', ['Plain statements of what the chapter favours (“this chapter favours one hard skill over many easy ones”). No imperatives.', 'Direct advice (“Choose one hard skill over many easy ones”).']],
  ['L6', 'Lived chapters', 'Golden’s Early Chapter, B’s Early and Rising.', ['The energy line and its ground say what the chapter left you. The domains show on the board only. No advice for the past.', 'A lived domain line too (“In Family, it left you …”).']],
  ['L7', 'Working with it (the Energy Manual)', 'The Manual on the Guidance tab retires into the sections (B4).', ['On the chapter you are in now: one line per function and direction, plus the Energy Map’s Seek energies and the decade that brings the first one.', 'The line only.', 'Seek and the decade only.']],
  ['L8', 'The same energy twice on one page', 'Golden has two Wood Action decades coming (2043 and 2053).', ['Two variants per decade line. The second one on the page takes the .b text.', 'Key the decade line by its ground too, so the two read differently.']],
  ['L9', 'Years: one set with Your Almanac', 'The Almanac’s Year page reads its year line from Life Chapters, and the Almanac already keys year energy lines (“ENERGY order · year.need”).', ['One set: the Almanac’s ENERGY function · year.state lines and land.year lines. I write them, both pages read them.', 'Each section writes its own year lines.']],
  ['L10', 'The visual pieces', 'From Your Almanac’s round 3 (G1 lift meter, G3 domain board).', ['Use them here: element dots, the lift meter on chapters, decades and years, the domain board, the decade strip coloured by lift.', 'Text only, with the green and grey decade colours as now.']],
  ['R1', 'Years shown (from round 1, Q3)', 'Chart B is in the last year of its decade.', ['This year and the next five, running into the next decade. Lived years stay chips.', 'The current decade only.']],
  ['R2', 'Where the current decade sits (round 1, Q9)', 'Chart B: the decade began at 27, the reader is 36.', ['In the chapter the reader is in now.', 'By its start age.']],
  ['R3', 'Window, closed hour, free hook (round 1, Q6 Q7 Q8)', 'Decades ending before 10 or starting after 75 show on the strip only. The closed Hour Gate keeps its note, door and decades. Free: the claim, the life line, the strip, chapter names, energies and lift, domain board.', ['Confirm all three.', 'Revise (say which).']],
  ['R4', 'The seat sheet’s old chapter line (round 1, Q11)', 'Live on elementum.life today.', ['Swap it for the new chapter energy line when Life Chapters goes live.', 'Swap it when the corpus lands.']],
  ['S1', 'Golden samples', '30 units across the four chapters, the decades and 2026.', ['Approve as calibration.', 'Revise (say which).']],
  ['S2', 'Chart B and C samples', '20 units: the current chapter and the current decade of each.', ['Approve as calibration.', 'Revise (say which).']],
];
const qs = Q.map(([id, t, ctx, opts]) => `<div class="q"><div class="qh"><span class="qid">${id}</span><h3>${esc(t)}</h3></div><p class="ctx">${esc(ctx)}</p>${opts.map((o, i) => { const L = 'ABC'[i]; return `<label class="opt"><input type="radio" name="${id}" id="${id}${L}" value="${L}"><span class="ol">${L}</span><span class="ot">${esc(o)}${i === 0 ? ' <b class="rec">Recommended</b>' : ''}</span></label>`; }).join('')}</div>`).join('');
const plan = [['Chapter energy line', 'ENERGY fn · chapter.gate.dir.tense', '88'], ['Ground, lived tense', 'TEMPLATED tpl_chapters · ground.rel.lived (present: the Almanac’s)', '5'], ['Chapter domain line', 'ENERGY fn · chapter_domain.Domain.dir', '60'], ['Working with it', 'ENERGY fn · chapter_manual.dir', '10'], ['Decade line', 'ENERGY fn · decade.dir.lived|early|coming.a|b, .now', '70'], ['Decade favours pair', 'ENERGY fn · favours.decade.Domain.dir', '50'], ['Year energy and landing (shared)', 'ENERGY fn · year.state · land.year.kind.gate', '43']];
const html = `<title>Life Chapters Round 2</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Spectral:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400&display=swap">
<style>
/* Layout: one reading column; each chart is a phone-width stack of app cards, energy first */
:root{--bg:#eef1ef;--card:#fbfcfb;--ink:#1d2622;--mut:#5d6b65;--line:#d5ddd8;--acc:#2f7a5f;--accbg:#e1efe8;--soft:#e7e8e6;
--wood:#4f8a4a;--fire:#c4553a;--earth:#b08a3e;--metal:#8c96a0;--water:#3f6f9e;
--serif:'Spectral',Georgia,serif;--sans:'IBM Plex Sans',system-ui,sans-serif;--mono:'IBM Plex Mono',ui-monospace,monospace}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#141a18;--card:#1c2421;--ink:#e3e9e6;--mut:#9aa7a1;--line:#2f3a36;--acc:#6cc3a0;--accbg:#1f3a30;--soft:#2a2f2d;--wood:#7cbf72;--fire:#e57d62;--earth:#d6b066;--metal:#b4bec8;--water:#74a3d4;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#141a18;--card:#1c2421;--ink:#e3e9e6;--mut:#9aa7a1;--line:#2f3a36;--acc:#6cc3a0;--accbg:#1f3a30;--soft:#2a2f2d;--wood:#7cbf72;--fire:#e57d62;--earth:#d6b066;--metal:#b4bec8;--water:#74a3d4;color-scheme:dark}
*{box-sizing:border-box;font-style:normal!important}
body{background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:15px;line-height:1.5}
.wrap{max-width:640px;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:28px 80px;display:flex;flex-direction:column;gap:28px}
h1{font-family:var(--serif);font-weight:600;font-size:1.9rem;line-height:1.15;margin:0;text-wrap:balance}h2{font-family:var(--serif);font-weight:600;font-size:1.45rem;margin:0}h3{font-size:1rem;margin:0;font-weight:600;text-wrap:balance}p{margin:0}
.lead{display:flex;flex-direction:column;gap:10px}.lead>p{color:var(--mut)}.eyebrow{font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--acc);font-weight:600}
nav.toc{display:flex;flex-wrap:wrap;gap:8px}nav.toc a{font-size:.85rem;color:var(--ink);text-decoration:none;border:1px solid var(--line);padding:5px 10px;border-radius:99px;background:var(--card)}
blockquote{margin:0;padding:10px 12px;border-left:3px solid var(--acc);background:var(--card);font-size:.9rem;color:var(--ink)}
.flow{margin:0;padding-left:1.2em;display:flex;flex-direction:column;gap:6px;font-size:.92rem}
.tag{display:inline-block;font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--mut)}.tag.go{color:var(--acc)}
.cmp{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px}.cmp .b{background:var(--soft);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:6px}.cmp .b .rd{color:var(--mut)}.cmp .a{border-left:3px solid var(--acc);padding-left:10px;display:flex;flex-direction:column;gap:6px}
table.plan{width:100%;border-collapse:collapse;font-size:.85rem}.plan td,.plan th{text-align:left;padding:7px 6px;border-bottom:1px solid var(--line);vertical-align:top}.plan th{font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--mut)}.plan td.n{text-align:right;font-variant-numeric:tabular-nums}.plan code{font-family:var(--mono);font-size:.72rem;color:var(--mut);overflow-wrap:anywhere}.tbl{overflow-x:auto}
.chart{display:flex;flex-direction:column;gap:14px}.ch{display:flex;flex-direction:column;gap:4px}.sub{font-size:.85rem;color:var(--mut)}.note{font-size:.9rem}
.phone{display:flex;flex-direction:column;gap:10px}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:9px;min-width:0}.card.now{border:2px solid var(--acc)}
.lab{font-size:.7rem;letter-spacing:.14em;font-weight:600;color:var(--mut)}.claim{font-family:var(--serif);font-size:1.22rem;line-height:1.3}.cap{font-size:.78rem;color:var(--mut)}
.el{display:inline-block;width:12px;height:12px;border-radius:50%;flex:none;vertical-align:-1px}.el.big{width:30px;height:30px}
.el-wood{background:var(--wood)}.el-fire{background:var(--fire)}.el-earth{background:var(--earth)}.el-metal{background:var(--metal)}.el-water{background:var(--water)}
.strip{display:flex;flex-wrap:wrap;gap:5px}.dc{font-size:.72rem;padding:4px 7px;border-radius:7px;display:flex;align-items:center;gap:5px;background:var(--soft)}.dc b{font-variant-numeric:tabular-nums}
.dc.l3,.dc.l4{background:var(--accbg)}.dc.l0,.dc.l1{opacity:.62}.dc.now{outline:2px solid var(--ink)}
.chh{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:baseline}.cn{font-family:var(--serif);font-size:1.15rem;font-weight:600}.cs{font-size:.78rem;color:var(--mut)}
.ehead{display:flex;align-items:center;gap:10px}.eh{display:flex;flex-direction:column;min-width:0;flex:1}.en{font-family:var(--serif);font-size:1.15rem;font-weight:600}.en small{font-weight:400;color:var(--mut);font-size:.9rem}.ef{font-size:.8rem;color:var(--mut)}
.liftrow{display:flex;align-items:center;gap:8px}
.lift{display:inline-flex;gap:3px;vertical-align:middle}.lift i{width:16px;height:7px;border-radius:2px;background:var(--soft)}.lift i.on.s0,.lift i.on.s1{background:var(--mut)}.lift i.on.s2{background:var(--ink)}.lift i.on.s3,.lift i.on.s4{background:var(--acc)}.liftw{font-size:.75rem;color:var(--mut);margin-left:4px}
.sec{font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--acc);font-weight:600;margin-top:4px}
.rd{font-family:var(--serif);font-size:1rem;line-height:1.5}.k{font-family:var(--mono);font-size:.66rem;color:var(--mut);overflow-wrap:anywhere}.ns,.note2{font-size:.82rem;color:var(--mut)}.ns code{font-family:var(--mono);font-size:.7rem;overflow-wrap:anywhere}
.board{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}.dm{border:1px solid var(--line);border-radius:8px;padding:5px 6px;display:flex;flex-direction:column;gap:3px;font-size:.72rem}.dm.off{opacity:.4}.dm.pick{border-color:var(--acc);background:var(--accbg)}
.pips{display:flex;gap:2px}.pips i{width:8px;height:4px;border-radius:1px;background:var(--soft)}.pips i.on{background:var(--acc)}
.dl{display:flex;flex-direction:column;gap:2px;padding-left:10px;border-left:2px solid var(--line)}.dl b{font-size:.78rem}
.seek{display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-size:.82rem}.pill{font-size:.68rem;text-transform:uppercase;letter-spacing:.08em;background:var(--accbg);color:var(--acc);font-weight:600;padding:2px 8px;border-radius:99px}.when2{width:100%;color:var(--mut);font-size:.78rem}
.dec{border-top:1px dashed var(--line);padding-top:9px;display:flex;flex-direction:column;gap:5px}.dec.now{border-top:1px solid var(--acc)}
.dh{display:flex;align-items:center;gap:6px;flex-wrap:wrap}.dw{font-size:.8rem;font-weight:600;flex:1;min-width:0}
.favs{display:flex;flex-direction:column;gap:4px}.fav{display:grid;grid-template-columns:4.5em 1fr auto 1fr;gap:6px;font-size:.82rem;align-items:baseline}.fav b{font-size:.74rem}.fav em{color:var(--mut);font-size:.72rem}.fav .o{color:var(--mut)}
.yc{border:1px solid var(--line);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:5px;margin-top:6px}.yh{font-weight:600;font-size:.86rem;display:flex;align-items:center;gap:6px;flex-wrap:wrap}.bl{font-size:.75rem;color:var(--mut)}
.gap{font-size:.9rem;color:var(--mut)}.door{color:var(--acc);font-weight:600}
.qs{display:flex;flex-direction:column;gap:12px}.q{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:8px}
.qh{display:flex;gap:10px;align-items:baseline}.qid{font-family:var(--mono);font-size:.8rem;color:var(--acc);font-weight:600;flex:none}.ctx{font-size:.88rem;color:var(--mut)}
.opt{display:flex;gap:10px;align-items:flex-start;padding:8px;border:1px solid var(--line);border-radius:10px;cursor:pointer}.opt input{position:absolute;opacity:0;pointer-events:none}.opt:has(input:checked){border-color:var(--acc);background:var(--accbg)}.opt:has(input:focus-visible){outline:2px solid var(--acc)}
.ol{font-family:var(--mono);font-weight:600;flex:none;width:1.2em}.ot{font-size:.9rem;min-width:0}.rec{font-size:.68rem;color:var(--acc);text-transform:uppercase;letter-spacing:.08em;margin-left:4px}
.ans{position:sticky;bottom:0;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}.ans code{font-family:var(--mono);font-size:.8rem;flex:1;min-width:0;overflow-wrap:anywhere}
.ans button{font:inherit;font-size:.85rem;border:0;border-radius:9px;padding:8px 12px;background:var(--acc);color:var(--card);cursor:pointer}.ans button.sec2{background:var(--soft);color:var(--ink)}
</style>
<div class="wrap">
<div class="lead"><span class="eyebrow">Life Chapters · content round 2 · energy first · 2026-10-21</span><h1>Every chapter is an energy</h1>
<blockquote>“I want keep the energy as the subject for each life chapter. Instead of using Bazi characters and others, unravel the advise by saying what energy the life chapter carries, and then dive into each domain’s, energy manual’s advise after that.”</blockquote>
<p>This round replaces round 1, which read each chapter through its characters. A chapter now opens on the energy its gate carries, using the same reader words as Your Almanac: the element, its function, whether your chart grows or releases it, and the lift. The domains and the Energy Manual’s advice follow from that energy. Every proposed line passes a new gate, and the sample texts use the real elements of each chart.</p>
<nav class="toc"><a href="#how">How a chapter reads</a><a href="#golden">Golden</a><a href="#B">Chart B</a><a href="#C">Chart C</a><a href="#plan">Plan</a><a href="#qs">Questions</a></nav></div>
<section id="how" class="lead"><h2>How a chapter reads</h2>${flow}${before}</section>
${chart('golden')}${chart('B')}${chart('C')}
<section id="plan" class="lead"><h2>The writing plan</h2><p>Keys are energy keys: a text is written once per function and direction, with the element name filled in, so it holds for every chart in that state. The round-1 character units become source material.</p>
<div class="tbl"><table class="plan"><tr><th>Unit</th><th>Key</th><th>Count</th></tr>${plan.map((r) => `<tr><td>${r[0]}</td><td><code>${esc(r[1])}</code></td><td class="n">${r[2]}</td></tr>`).join('')}<tr><td><b>Total</b></td><td></td><td class="n"><b>about 326</b></td></tr></table></div></section>
<section id="qs" class="qs"><h2>Questions</h2>${qs}<div class="ans"><code id="out">Tap an answer to build your code line.</code><button type="button" id="rec" class="sec2">All recommended</button><button type="button" id="cp">Copy</button></div></section>
</div>
<script>
const ids=${JSON.stringify(Q.map((q) => q[0]))};const out=document.getElementById('out');
function line(){const p=ids.map(i=>{const c=document.querySelector('input[name="'+i+'"]:checked');return c?i+' '+c.value:null}).filter(Boolean);out.textContent=p.length?p.join(', '):'Tap an answer to build your code line.';try{localStorage.setItem('lc-r2',JSON.stringify(p))}catch(e){}}
document.addEventListener('change',e=>{if(e.target.matches('input[type=radio]'))line()});
document.getElementById('rec').onclick=()=>{ids.forEach(i=>{const el=document.getElementById(i+'A');if(el)el.checked=true});line()};
document.getElementById('cp').onclick=async()=>{try{await navigator.clipboard.writeText(out.textContent);document.getElementById('cp').textContent='Copied'}catch(e){const r=document.createRange();r.selectNodeContents(out);const s=getSelection();s.removeAllRanges();s.addRange(r)}};
try{(JSON.parse(localStorage.getItem('lc-r2')||'[]')).forEach(x=>{const[i,v]=x.split(' ');const el=document.getElementById(i+v);if(el)el.checked=true});line()}catch(e){}
</script>`;
fs.writeFileSync('life-chapters-r2.html', html); console.log('ok', html.length);
