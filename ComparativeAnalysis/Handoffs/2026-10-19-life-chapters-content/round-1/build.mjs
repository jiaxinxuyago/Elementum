import fs from 'node:fs';
const NOW = JSON.parse(fs.readFileSync('now.json','utf8'));
const S = JSON.parse(fs.readFileSync('/home/user/Elementum/ComparativeAnalysis/Prompts/out/handoff/2026-10-19-chapters-template/samples.json','utf8')).units;
const esc = (s) => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const wc = (t) => (t.match(/[A-Za-z']+/g)||[]).length;
const find = (page, key) => S.find((u) => u.page === page && u.key === key);
const early = (k) => k.replace('.lived', '.early');
const META = {
  golden: { title: 'The golden chart', sub: '1995-04-29 18:00 Beijing · 乙亥 庚辰 庚寅 乙酉 · 庚 The Blade, Overfueled · age 31', note: 'Every unit here is already written and gated (round 8). One change is proposed, the Steward in the Early Chapter (Q2).' },
  B: { title: 'Chart B', sub: '1990-09-17 05:00 Beijing · 庚午 乙酉 乙酉 己卯 · 乙, Underfueled · age 36', note: 'Almost everything is a draft line today. The proposed text is a sample written to the rules, gated.' },
  C: { title: 'Chart C', sub: '1992-05-25 Beijing, birth hour unknown · 壬申 乙巳 辛丑 (hour closed) · 辛, Underfueled · age 34', note: 'The Late Chapter is closed because the birth hour is unknown (Q7).' },
};
function unitBlock(page, u, opts = {}) {
  let after = find(page, u.key) || (opts.earlyKey ? find(page, early(u.key)) : null);
  if (page === 'golden') {
    const re = find('golden', u.key);
    if (re) return `<div class="u"><div class="ba"><div class="b"><span class="tag">Written · round 8</span><p>${esc(u.text)}</p></div><div class="a"><span class="tag go">Proposed rewrite (Q2 A)</span><p>${esc(re.text)}</p><span class="k">${esc(u.key)} · ${wc(re.text)} words</span></div></div></div>`;
    return `<div class="u"><p class="solo">${esc(u.text)}</p><span class="k">${esc(u.key)} · written, gated</span></div>`;
  }
  if (!u.draft) return `<div class="u"><p class="solo">${esc(u.text)}</p><span class="k">${esc(u.key)} · written, gated</span></div>`;
  const key = after ? after.key : u.key;
  return `<div class="u"><div class="ba"><div class="b"><span class="tag">On dev now · draft</span><p>${esc(u.text)}</p></div>${after ? `<div class="a"><span class="tag go">Proposed</span><p>${esc(after.text)}</p><span class="k">${esc(key)} · ${wc(after.text)} words</span></div>` : '<div class="a"><span class="tag">Not sampled</span></div>'}</div></div>`;
}
function strip(v) { return `<div class="strip">${v.strip.map((s) => `<span class="dc ${s.pole === 'helping' ? 'hp' : 'hv'}${s.now ? ' now' : ''}"><b>${s.startAge}</b>${esc(s.persona)}</span>`).join('')}</div>`; }
function chart(id) {
  const v = NOW[id]; const m = META[id];
  let h = `<section class="chart" id="${id}"><header class="ch"><h2>${m.title}</h2><p class="sub">${esc(m.sub)}</p><p class="note">${esc(m.note)}</p></header>`;
  h += `<div class="phone"><div class="card head"><span class="lab">YOUR LIFE CHAPTERS</span><p class="claim">${esc(v.claim)}</p>${strip(v)}<p class="cap">Green decades help your chart. Grey ones weigh on it.</p></div>`;
  for (const c of v.chapters) {
    h += `<div class="card chap ${c.status}"><div class="chh"><span class="cn">${esc(c.name)}</span><span class="cs">${esc(c.span)} · ${c.status === 'coming' ? 'from ' + c.fromYear : c.status}</span></div>`;
    if (c.closed) h += `<div class="gap">Your Hour Gate is closed. Add your birth hour to read your Late Chapter. <span class="door">Add your hour ›</span></div>`;
    else {
      h += `<span class="seats">${esc(c.seats.map((s) => s.replace(/ (stem|branch) .*/, (x, k) => k === 'stem' ? ' at' : ' inside')).join(' · '))}</span>`;
      h += `<span class="chips">${c.domains.map((d) => `<span class="chip">${esc(d)}</span>`).join('')}</span>`;
      for (const p of c.parts) h += unitBlock(id, p);
    }
    for (const d of c.decades) {
      const isEarly = c.name === 'The Early Chapter' && /\.lived$/.test(d.key);
      h += `<div class="dec${/^Now/.test(d.label) ? ' now' : ''}"><span class="when">${esc(d.label)}${isEarly ? ' <em class="flag">early line (Q1 A)</em>' : ''}</span>${unitBlock(id, d, { earlyKey: isEarly })}`;
      if (/^Now/.test(d.label)) {
        h += `<div class="yrs">${v.years.map((y) => `<span class="yr ${y.status}">${y.year} ${esc(y.persona)}</span>`).join('')}</div><span class="adv">Advisor · the years</span>`;
        for (const y of v.years.filter((y) => y.status !== 'lived')) {
          h += `<div class="yc${y.status === 'now' ? ' now' : ''}"><span class="yh">${y.year}, ${/^[AEIOU]/.test(y.persona) ? 'an' : 'a'} ${esc(y.persona)} year <small>${y.status === 'now' ? 'now · ' : ''}${y.pole === 'helping' ? 'helping' : 'weighs'}</small></span>${unitBlock(id, y)}`;
          if (y.bond) h += `<span class="bl">${esc(y.bond.label)}</span>${unitBlock(id, y.bond)}`;
          h += `</div>`;
        }
        const win = S.filter((u) => u.page === id && /window option/.test(u.where));
        if (win.length) {
          h += `<div class="winhead">With Q3 A, the cards run on into the next decade</div>`;
          const yrs = [...new Set(win.map((u) => u.where.slice(0, 4)))];
          for (const yr of yrs) {
            const line = win.find((u) => u.where.startsWith(yr) && u.kind === 'year_line');
            const bond = S.find((u) => u.page === id && u.kind === 'year_bond' && u.where.startsWith(yr));
            h += `<div class="yc win"><span class="yh">${esc(line.where.replace(' (window option)', ''))}</span><div class="u"><p class="solo">${esc(line.text)}</p><span class="k">${esc(line.key)} · ${wc(line.text)} words</span></div>`;
            if (bond) h += `<span class="bl">${esc(bond.where.replace(/^\d+ · /, ''))}</span><div class="u"><p class="solo">${esc(bond.text)}</p><span class="k">${esc(bond.key)} · ${wc(bond.text)} words</span></div>`;
            h += `</div>`;
          }
        }
      }
      h += `</div>`;
    }
    h += `</div>`;
  }
  h += `</div>`;
  if (id === 'golden') h += overlap();
  return h + `</section>`;
}
function overlap() {
  const rows = [
    ['Chapter · Early Chapter, the Steward (written)', 'Your Early Chapter was an orderly one, with money counted at home and promises kept in front of you. You came out of it careful, and the habits you formed then still run your accounts.', 'old'],
    ['Domain · Wealth, already happened', 'You learned what things cost before most children do. Money at home was counted and spent with care, and by your teens you were already saving what your friends spent.', 'dom'],
    ['Domain · Family, already happened', 'Someone in your first home kept the household running on plans and promises kept, and you watched closely. By your teens you were the child trusted with the money, the keys or the younger ones.', 'dom'],
    ['Chapter · proposed rewrite', 'Your Early Chapter was an orderly one, with set hours, set chores and someone who always did what they said. You came out of it careful, and you still feel safest when your days run to a plan.', 'new'],
  ];
  return `<div class="olap"><h3>Q2 · one chapter beside its domain units</h3><p>The same seat writes the Early Chapter and two domain readings. The written chapter passes the five-word check, but it makes the same claims as the domains: money counted at home, promises kept. The rewrite keeps the era (the order of those days, what you came out with) and leaves money to Wealth and the household to Family.</p>${rows.map(([l, t, c]) => `<div class="orow ${c}"><span class="tag">${l}</span><p>${t}</p></div>`).join('')}</div>`;
}
const Q = [
  ['Q1', 'Decade lines: what does a decade line know?', 'Every reader has a childhood decade in the Early Chapter. A line written for adults ("a role with stakes") reads wrong for ages 6 to 15. Samples: B’s Virtuoso 1997–2006 and C’s Steward 1998–2007. The golden Sage line moves to the early key unchanged.',
    ['Character × pole × tense, plus an early line for a lived decade in the Early Chapter. 80 units.', 'Character × pole × tense only, as ruled. Every lived line must fit a child and an adult. 60 units.', 'Gate-aware: character × pole × gate × tense. About 200 units.']],
  ['Q2', 'Chapters and Domains: how far apart?', 'See the golden chart’s side-by-side. Domains already writes each seat’s lived and ahead beats.',
    ['A chapter reads the era: the mood of those years, who was around, what you came out with. It never repeats a seat’s domain claim. Writers get the seat’s domain units as a do-not-repeat list, the gate keeps the five-word check, and the golden Steward chapter is rewritten.', 'The five-word check only. The golden chapter stays as written.']],
  ['Q3', 'The years: how many cards?', 'Chart B is in the last year of its decade, so today Advisor shows one card (2026).',
    ['This year and the next five, running on into the next decade. A chip marks where the new decade starts. Lived years stay chips.', 'The current decade only, as built.']],
  ['Q4', 'Bonds per year', 'Order: clash, punishment, harm, bind or join, repeat. Ties go Month, Day, Hour, Year.',
    ['The strongest bond only, one line.', 'Every bond the year makes, one line each.']],
  ['Q5', 'Year stars on the year card', 'The Stars session writes the year star readings (arriving.year).',
    ['A chip with the star’s name on the year card. Tapping opens Stars. The reading stays on Stars.', 'No year stars on Life Chapters.']],
  ['Q6', 'Ages outside the window', 'Today: a decade that ends before 10 or starts after 75 shows only on the strip. Units that no reader can reach are not written: the Rising Chapter coming (readers under 16) and the Late Chapter lived.',
    ['Confirm both.', 'Show every decade as a card, with a line.']],
  ['Q7', 'The closed Hour Gate', 'Chart C. Today the Late Chapter shows “Your Hour Gate is closed. Add your birth hour to read your Late Chapter. Add your hour ›”, and its decades still show.',
    ['Keep the note and the door. Keep the decades, because they do not need the hour.', 'Keep the note. Hide the decades too.', 'New note: “Your Late Chapter is read from your birth hour, and we don’t have it yet.” Decades stay.']],
  ['Q8', 'The free hook', 'Free readers see the claim line, the life line, the decade strip, the chapter names and seats, the domain chips and the decade labels.',
    ['Confirm. Nothing more is free.', 'Also free: the current decade’s full reading.']],
  ['Q9', 'Where the current decade sits', 'Chart B is 36 and in the Home Chapter, but the Steward decade began at 27, so “Now” sits in the lived Rising Chapter.',
    ['In the chapter the reader is in now, so the outlined card always holds “Now”. Other decades sit by their start age.', 'By start age only, as built.']],
  ['Q10', 'Heavy decades', 'Chart B: six of seven decades are grey.',
    ['Keep “helping” and “weighs” and the caption. Every heavy unit ends on what the reader gains or keeps, as the samples do.', 'Rename: “Green decades feed your chart. Grey ones test it.” Labels say “tests”.']],
  ['Q11', 'The seat sheet’s old chapter line (W5)', 'elementum.life shows the old line today, for example “Your rising chapter is the proving decades: … Build the name early. It compounds.”',
    ['Swap to the new chapter unit when Life Chapters goes live on elementum.life, behind the same flag. One production change.', 'Swap as soon as the corpus lands. Production changes before the page does.']],
  ['S1', 'Golden: the Steward rewrite', 'In the golden chart section.', ['Approve.', 'Revise (say which).']],
  ['S2', 'Chart B samples', '23 units: 6 chapter, 7 decade, 6 year, 4 bond.', ['Approve as calibration.', 'Revise (say which).']],
  ['S3', 'Chart C samples', '20 units: 5 chapter, 7 decade, 6 year, 3 bond (three shared with B).', ['Approve as calibration.', 'Revise (say which).']],
];
const qs = Q.map(([id, t, ctx, opts]) => `<div class="q" data-q="${id}"><div class="qh"><span class="qid">${id}</span><h3>${esc(t)}</h3></div><p class="ctx">${esc(ctx)}</p>${opts.map((o, i) => { const L = 'ABC'[i]; return `<label class="opt"><input type="radio" name="${id}" id="${id}${L}" value="${L}"><span class="ol">${L}</span><span class="ot">${esc(o)}${i === 0 ? ' <b class="rec">Recommended</b>' : ''}</span></label>`; }).join('')}</div>`).join('');
const plan = [
  ['Chapter, seat at a gate', 'POSITION seat · chapter.tense', '50', '22–45'], ['Chapter, seat inside', 'the same, branch seats', '50', '16–40'], ['Chapter, Day seat', 'POSITION *_day_branch · chapter.tense', '30', '30–60'],
  ['Current decade in full', 'GOD · chapter_decade.pole.now', '20', '30–60'], ['Decade line, lived or coming', 'GOD · chapter_decade.pole.lived|coming', '40', '14–35'], ['Decade line, early (Q1 A)', 'GOD · chapter_decade.pole.early', '20', '14–35'],
  ['Year line (Advisor)', 'GOD · year_line.pole', '20', '20–42'], ['Year bond line (Advisor)', 'TEMPLATED tpl_depth · year_bond.kind.gate', '24', '12–30'],
];
const html = `<title>Life Chapters Round 1</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Spectral:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400&display=swap">
<style>
/* Layout: one narrow reading column; each chart is a phone-width stack of app cards with before/after inside */
:root{--bg:#eef1ef;--card:#fbfcfb;--ink:#1d2622;--mut:#5d6b65;--line:#d5ddd8;--jade:#2f7a5f;--jadebg:#e1efe8;--stone:#7b807d;--stonebg:#e7e8e6;--draft:#a0672a;--draftbg:#f6ecdf;
--serif:'Spectral',Georgia,serif;--sans:'IBM Plex Sans',system-ui,sans-serif;--mono:'IBM Plex Mono',ui-monospace,monospace}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#141a18;--card:#1c2421;--ink:#e3e9e6;--mut:#9aa7a1;--line:#2f3a36;--jade:#6cc3a0;--jadebg:#1f3a30;--stone:#a3a8a5;--stonebg:#2a2f2d;--draft:#e0a866;--draftbg:#3a2c1c;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#141a18;--card:#1c2421;--ink:#e3e9e6;--mut:#9aa7a1;--line:#2f3a36;--jade:#6cc3a0;--jadebg:#1f3a30;--stone:#a3a8a5;--stonebg:#2a2f2d;--draft:#e0a866;--draftbg:#3a2c1c;color-scheme:dark}
*{box-sizing:border-box;font-style:normal!important}
body{background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:15px;line-height:1.5}
.wrap{max-width:640px;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:28px 80px;display:flex;flex-direction:column;gap:28px}
h1{font-family:var(--serif);font-weight:600;font-size:1.9rem;line-height:1.15;margin:0;text-wrap:balance}
h2{font-family:var(--serif);font-weight:600;font-size:1.45rem;margin:0}
h3{font-size:1rem;margin:0;font-weight:600;text-wrap:balance}
p{margin:0}
.lead{display:flex;flex-direction:column;gap:10px}.lead p{color:var(--mut)}
.eyebrow{font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--jade);font-weight:600}
nav.toc{display:flex;flex-wrap:wrap;gap:8px}nav.toc a{font-size:.85rem;color:var(--ink);text-decoration:none;border:1px solid var(--line);padding:5px 10px;border-radius:99px;background:var(--card)}
.legend{display:flex;flex-wrap:wrap;gap:12px;font-size:.8rem;color:var(--mut)}
.tag{display:inline-block;font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--mut)}
.tag.go{color:var(--jade)}
table.plan{width:100%;border-collapse:collapse;font-size:.85rem}.plan td,.plan th{text-align:left;padding:7px 6px;border-bottom:1px solid var(--line);vertical-align:top}.plan th{font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--mut)}.plan td.n{font-variant-numeric:tabular-nums;text-align:right}.plan code{font-family:var(--mono);font-size:.74rem;color:var(--mut)}
.tbl{overflow-x:auto}
.chart{display:flex;flex-direction:column;gap:14px}.ch{display:flex;flex-direction:column;gap:4px}.sub{font-size:.85rem;color:var(--mut)}.note{font-size:.9rem}
.phone{display:flex;flex-direction:column;gap:10px}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px;min-width:0}
.card.now{border:2px solid var(--jade)}
.card.coming{background:color-mix(in srgb,var(--card) 70%,var(--bg))}
.lab{font-size:.7rem;letter-spacing:.14em;font-weight:600;color:var(--mut)}
.claim{font-family:var(--serif);font-size:1.25rem;line-height:1.3}
.strip{display:flex;flex-wrap:wrap;gap:5px}.dc{font-size:.72rem;padding:4px 7px;border-radius:7px;display:flex;flex-direction:column;line-height:1.2;min-width:62px}.dc b{font-variant-numeric:tabular-nums}
.dc.hp{background:var(--jadebg);color:var(--jade)}.dc.hv{background:var(--stonebg);color:var(--stone)}.dc.now{outline:2px solid var(--ink)}
.cap{font-size:.78rem;color:var(--mut)}
.chh{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:baseline}.cn{font-family:var(--serif);font-size:1.15rem;font-weight:600}.cs{font-size:.78rem;color:var(--mut)}
.seats{font-size:.82rem;color:var(--mut)}.chips{display:flex;flex-wrap:wrap;gap:5px}.chip{font-size:.72rem;border:1px solid var(--line);border-radius:99px;padding:2px 8px}
.u{display:flex;flex-direction:column;gap:4px;min-width:0}
.solo,.ba p,.orow p{font-family:var(--serif);font-size:1rem;line-height:1.5}
.ba{display:grid;grid-template-columns:1fr;gap:6px}
.ba .b{background:var(--draftbg);border-radius:9px;padding:8px 10px;display:flex;flex-direction:column;gap:3px}.ba .b p{color:var(--mut);font-size:.92rem}.ba .b .tag{color:var(--draft)}
.ba .a{border-left:3px solid var(--jade);padding:4px 0 4px 10px;display:flex;flex-direction:column;gap:3px}
.k{font-family:var(--mono);font-size:.68rem;color:var(--mut);overflow-wrap:anywhere}
.dec{border-top:1px dashed var(--line);padding-top:10px;display:flex;flex-direction:column;gap:6px}.dec.now{border-top:1px solid var(--jade)}
.when{font-size:.8rem;font-weight:600}.flag{font-weight:500;color:var(--jade);font-size:.72rem;margin-left:4px}
.yrs{display:flex;flex-wrap:wrap;gap:4px}.yr{font-size:.7rem;padding:2px 6px;border-radius:6px;background:var(--stonebg);font-variant-numeric:tabular-nums}.yr.lived{opacity:.55}.yr.now{background:var(--jadebg);color:var(--jade);font-weight:600}
.adv{font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--mut);font-weight:600;margin-top:4px}
.yc{border:1px solid var(--line);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:6px}.yc.now{border-color:var(--jade)}.yc.win{border-style:dashed}
.yh{font-weight:600;font-size:.88rem}.yh small{font-weight:400;color:var(--mut);margin-left:4px}.bl{font-size:.75rem;color:var(--mut)}
.winhead{font-size:.75rem;color:var(--jade);font-weight:600;margin-top:4px}
.gap{font-size:.9rem;color:var(--mut)}.door{color:var(--jade);font-weight:600}
.olap{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px}.olap>p{font-size:.9rem;color:var(--mut)}
.orow{display:flex;flex-direction:column;gap:3px;padding:8px 10px;border-radius:9px}.orow.old{background:var(--draftbg)}.orow.dom{background:var(--stonebg)}.orow.new{border-left:3px solid var(--jade);border-radius:0}
.qs{display:flex;flex-direction:column;gap:12px}
.q{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:8px}
.qh{display:flex;gap:10px;align-items:baseline}.qid{font-family:var(--mono);font-size:.8rem;color:var(--jade);font-weight:600;flex:none}
.ctx{font-size:.88rem;color:var(--mut)}
.opt{display:flex;gap:10px;align-items:flex-start;padding:8px;border:1px solid var(--line);border-radius:10px;cursor:pointer}
.opt input{position:absolute;opacity:0;pointer-events:none}.opt:has(input:checked){border-color:var(--jade);background:var(--jadebg)}.opt:has(input:focus-visible){outline:2px solid var(--jade)}
.ol{font-family:var(--mono);font-weight:600;flex:none;width:1.2em}.ot{font-size:.9rem;min-width:0}.rec{font-size:.68rem;color:var(--jade);text-transform:uppercase;letter-spacing:.08em;margin-left:4px}
.ans{position:sticky;bottom:0;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:env(safe-area-inset-bottom,0px)}
.ans code{font-family:var(--mono);font-size:.8rem;flex:1;min-width:0;overflow-wrap:anywhere}
.ans button{font:inherit;font-size:.85rem;border:0;border-radius:9px;padding:8px 12px;background:var(--jade);color:var(--card);cursor:pointer}
.ans button.sec{background:var(--stonebg);color:var(--ink)}
</style>
<div class="wrap">
<div class="lead"><span class="eyebrow">Life Chapters · content round 1 · 2026-10-19</span><h1>Life Chapters, the reading content</h1>
<p>The page is built on dev.elementum.life with draft lines. Below is each review chart as the page reads today, with the draft line and the text I propose beside it. Every proposed unit passes the depth gate (prediction law, budgets, no shared five-word runs, chart invariance). After the charts come 14 questions. The first option is my recommendation. Tap your answers and copy the code line, or type it (“Q1 A, Q2 A …”).</p>
<nav class="toc"><a href="#plan">The writing plan</a><a href="#golden">Golden chart</a><a href="#B">Chart B</a><a href="#C">Chart C</a><a href="#qs">Questions</a></nav>
<div class="legend"><span><span class="tag" style="color:var(--draft)">On dev now · draft</span> the templated line today</span><span><span class="tag go">Proposed</span> the sample, gated</span></div></div>
<section id="plan" class="lead"><h2>The writing plan</h2><p>W1–W5 as ruled, with Q1 A’s early line added. About 70 units are written already (round 8 and these samples); about 185 remain.</p>
<div class="tbl"><table class="plan"><tr><th>Unit</th><th>Key</th><th>Count</th><th>Words</th></tr>${plan.map((r) => `<tr><td>${r[0]}</td><td><code>${esc(r[1])}</code></td><td class="n">${r[2]}</td><td class="n">${r[3]}</td></tr>`).join('')}<tr><td><b>Total</b></td><td></td><td class="n"><b>254</b></td><td></td></tr></table></div></section>
${chart('golden')}${chart('B')}${chart('C')}
<section id="qs" class="qs"><h2>Questions</h2>${qs}
<div class="ans"><code id="out">Tap an answer to build your code line.</code><button type="button" id="rec" class="sec">All recommended</button><button type="button" id="cp">Copy</button></div></section>
</div>
<script>
const ids=${JSON.stringify(Q.map((q) => q[0]))};
const out=document.getElementById('out');
function line(){const p=ids.map(i=>{const c=document.querySelector('input[name="'+i+'"]:checked');return c?i+' '+c.value:null}).filter(Boolean);out.textContent=p.length?p.join(', '):'Tap an answer to build your code line.';try{localStorage.setItem('lc-r1',JSON.stringify(p))}catch(e){}}
document.addEventListener('change',e=>{if(e.target.matches('input[type=radio]'))line()});
document.getElementById('rec').onclick=()=>{ids.forEach(i=>{const el=document.getElementById(i+'A');if(el)el.checked=true});line()};
document.getElementById('cp').onclick=async()=>{try{await navigator.clipboard.writeText(out.textContent);document.getElementById('cp').textContent='Copied'}catch(e){const r=document.createRange();r.selectNodeContents(out);const s=getSelection();s.removeAllRanges();s.addRange(r)}};
try{(JSON.parse(localStorage.getItem('lc-r1')||'[]')).forEach(x=>{const[i,v]=x.split(' ');const el=document.getElementById(i+v);if(el)el.checked=true});line()}catch(e){}
</script>`;
fs.writeFileSync('life-chapters-r1.html', html);
console.log('ok', html.length);
