// Builds the owner's report page (one artifact) from findings.json, tweaks-applied.json, tweaks-held.json and STATE.md.
//   node ComparativeAnalysis/Evaluations/section-audit-2026-10-21/domains/build-report.mjs   → REPORT.html
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.dirname(new URL(import.meta.url).pathname) + '/';
const rd = (f) => JSON.parse(fs.readFileSync(HERE + f, 'utf8'));
const { findings, scores } = rd('findings.json'); const applied = rd('tweaks-applied.json'); const held = rd('tweaks-held.json');
const e = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const unq = (s) => String(s ?? '').trim().replace(/^["“]|["”]$/g, '');
const C = ['A1', 'A2', 'A3', 'A4', 'A5', 'B', 'C', 'D'];
const rows = scores.map((s) => ({ page: s.page, src: s.source.replace('group-', ''), n: s.row.slice(1).map((c) => parseFloat(String(c).replace(/\*/g, ''))).filter((x) => !isNaN(x)).slice(0, 8), verdict: s.row[s.row.length - 1] })).filter((r) => r.n.length === 8);
const mean = (rs, i) => rs.reduce((a, r) => a + r.n[i], 0) / rs.length;
const dom = rows.filter((r) => r.page[0] === 'D'); const bp = rows.filter((r) => r.page[0] === 'B');
const bDist = [2, 3, 4, 5].map((v) => [v, rows.filter((r) => r.n[5] === v).length]);
const sev = (s) => findings.filter((f) => f.severity === s).length;

// the MAJOR rulings: each groups the auditors' MAJORs that share one cause
const R = [
  ['R1', 'Blueprint engine', 'The strain and its protector ignore the Day Master\'s strength',
    'The STATE and WHAT PROTECTS IT are read without the Day Master\'s strength or the cure already in the chart, so the classical remedy is often named as the fault (子平真诠 论用神成败救应: 财逢劫而透食以化之，生官以制之; 论印绶: 印重身强，透财以抑太过). In 3,000 charts: all 312 "losing a share to equals" notes fall on charts where the peers are already answered or wanted (271 weak, 197 with an officer seated); 104 of 112 seal strains are strong charts where money is the cure; 163 rescues are already seated (M-1); a Magistrate structure mixed with the General is sent to the Virtuoso, its own breaker, on 116 of 122; and 10 of 42 broken Virtuoso structures are 金水伤官, which want the officer (渊海子平 伤官诀).',
    ['BA-001', 'BB-001', 'BC-001', 'X-005', 'BA-002', 'BA-003', 'BA-009', 'M-1'],
    ['Rebuild the state rules on 子平真诠 with strength, a cure already seated, and the 伤官 exceptions. Each rule gets a golden case, and a sample of pages comes back to you before it ships.', 'Until the rebuild, show the structure and its reading only, and hide STATE and WHAT PROTECTS IT.', 'Leave it as it is.']],
  ['R2', 'Blueprint and Domains', 'Pairings print whenever both characters sit',
    'Part 4 of the Blueprint and the Domains PATTERN step print a pairing on presence alone, with no strength condition and no check for the cure that lifts it, so pages contradict themselves. 枭神夺食 prints beside a seated Horizon or Steward in about 500 of 725 cases; 伤官见官 beside a seated seal in 449 of 640; 比劫夺财 on weak charts in 671 of 1,720 and beside "you come out with your part intact"; 食伤生财 lands only on Underfueled charts on the Wealth pages; on 23 pages the STATE and a pairing state one tension twice. Presence was the round-1 trigger, so this re-opens that ruling.',
    ['BA-004', 'BB-002', 'BC-002', 'X-006', 'X-007', 'DB-004', 'DD-004'],
    ['Give each pairing its classical condition (strength, and the cure that lifts it) and skip a pairing the STATE already names. The condition table comes to you with its sources first.', 'Keep presence as the trigger, but drop a pairing that contradicts the STATE on the same page.', 'Leave it as it is.']],
  ['R3', 'Blueprint bonds', 'One pair of gates prints two or three bond lines, with no tense',
    'Four branch pairs carry two relations at once (寅申 and 丑未 clash and punish, 巳申 bind and punish, 寅巳 harm and punish), so one pair of gates prints two lines that repeat or contradict, on about 750 of 3,000 charts. A full 寅巳申 punishment prints six lines. The seven bond lines that date an event to a gate read in the present to readers already past it.',
    ['BA-006', 'BB-004', 'BC-005', 'BA-007'],
    ['One line per pair of gates, by the strongest relation (clash, then punish, then harm, then bind), with a full 三刑 printed once; the seven dated lines get a lived and a coming version (14 units).', 'Write combined lines for the four double pairs (8 units) and rewrite the seven dated lines without tense.', 'Leave it as it is.']],
  ['R4', 'Blueprint season', 'Conditional stems in the season table print as needs',
    '穷通宝鉴 makes some stems conditional, and the table prints them as needs. 十月丙火: "木旺宜庚，水旺宜戊，火旺用壬", yet a weak 丙 that is half Water is told it needs 壬. 四月乙木: "丙火酌用", yet 丙 prints as asked for right after "more sun than you can use". All 120 season readings match the text; this is about the table\'s conditions.',
    ['BA-008'],
    ['Mark the conditional stems in the 120 cells from the 穷通宝鉴 text, with the source line for each, and print one only when its condition holds.', 'Keep the table, and label a conditional stem as "support".']],
  ['R5', 'Blueprint, no birth hour', 'With the hour unknown, MISSING claims too much',
    'With no birth hour, the MISSING lines say a character is absent though the unread Hour pillar could hold it. STRONGEST also counts the noon pillar the app puts in its place.',
    ['BB-007'],
    ['With the hour unknown, MISSING names only what the three known pillars lack and says the Hour Gate could hold it, and STRONGEST reads three pillars. The engine-wide strength band goes to the engine\'s owner (below).', 'Hide MISSING when the hour is unknown.']],
  ['R6', 'Blueprint parts 2 and 3', 'The season needs repeat the seen lines',
    'A shown need is a stem on show and a rooted need is a branch\'s main stem, so the same character\'s need line and seen line land on one page, and the need lines are written as public or private traits. Part 2 says what Part 3 says on 80% of pages (59 same-character pairs on one group\'s 45 pages, 29 nearly word for word).',
    ['BA-005', 'BB-006', 'BC-003'],
    ['Rewrite the 30 need lines to say what the needed element does for the season and how the chart holds it, with no public or private trait.', 'Drop a need line when its character prints in Part 3, keeping the label row.']],
  ['R7', 'Blueprint state notes', 'State notes are shared by family, so one character reads as its sibling',
    'The notes are keyed by family (officer, seal, output, wealth, self), so an Alchemist structure gets the Sage\'s teachers and mentors, and a formed General structure gets the Magistrate\'s title and word, against the structure reading above it.',
    ['BB-005'],
    ['Key the formed note and the shared strains by structure (about 20 units).', 'Rewrite the family notes so they hold for both members (about 10 units).']],
  ['R8', 'Blueprint wording you approved (T1)', '"in your decades later"',
    'The approved rescue templates end "in your decades {when}", which fills to "you find the time to make it in your decades later" or "in your decades now and next" on every rescue still ahead (514 of 3,000 charts).',
    ['M-3'],
    ['The four templates end "in {when}", with {when} as this decade, your next decade, a later decade, this decade and the next, or your next decade and later ones.', 'Keep the approved wording.']],
  ['R9', 'Domains, How you are', 'A reader is told about a seat they have not reached',
    'When no gate the reader has reached holds a seat, the composer falls back to the highest seat of all, so a reader of 22 or 34 gets an Hour seat\'s recognition about later life as "How you are" (9 pages in one group, 4 in another, 7 raw units). The round-1 ruling names the lead as the highest seat among the gates the reader has reached.',
    ['DB-003', 'DC-004', 'DD-002'],
    ['When no reached gate holds a seat, How you are reads the domain\'s unruled line, and the seat shows as coming from its age.', 'Keep the highest seat, but read its ahead beat as How you are.', 'Leave it as it is.']],
  ['R10', 'Domains, the lead seat', 'The top of a page says one thing two or three times',
    'The headline, How you are and the lead seat\'s own beat tell the same scene, often in the same words ("you say yes before you read the terms", then "by saying yes before you had read the terms"). All five domain groups filed it: 13 to 32 pages per group.',
    ['DA-003', 'DB-001', 'DC-002', 'DE-001'],
    ['A writing rule: the headline makes the claim, How you are says how it works now, and the lived beat says what that gate\'s years built. Rewrite the overlapping lived beats (about 70) in the polish round.', 'Composition only: the lead seat\'s own beat drops out of the seat list.']],
  ['R11', 'Domains, gap rows', 'Gap rows still claim a loss',
    'The gap row now hides while a decade rules the same years (the round-1 rule, restored in this audit). The lines themselves still state a cost ("you have seen less of your relatives than you meant to"). And no Month Gate seat ever rules Family, so every reader aged 16 to 34 meets the Family gap, though the Month pillar is the classical seat of parents and siblings (三命通会).',
    ['DA-001', 'DD-001', 'DC-003'],
    ['Rewrite the 21 gap lines to say the gate holds no seat for the domain, without claiming a loss. Keep the seat map as ruled.', 'Rewrite as in A, and let Month seats rule Family too, which re-opens the seat map.']],
  ['R12', 'Domains, Love', 'Every Love ahead beat promises a shared home at 35',
    'All ten Love ahead beats state as fact that a home with a partner arrives at 35. The Day seat shows the kind of bond the reader makes; the chart cannot time a shared home without a Love decade (三命通会 论夫妻).',
    ['DB-006'],
    ['Rewrite the ten Love ahead beats to the kind of bond the reader makes from 35, with no shared home stated as fact.', 'Leave them.']],
  ['R13', 'Domains, tense', 'Past beats read as if the gate were still open',
    'Month and Day lived beats are written from inside the gate ("since your late teens", "so far"), so a reader of 64 to 68 reads a span labelled 16 to 34 as running to today (11 pages in one group; "so far" at 68).',
    ['DC-005'],
    ['Each Month and Day lived beat gets a past version for readers past the gate (about 60 units), picked by age.', 'Rewrite each lived beat once in the simple past tied to its span (about 60 units).']],
  ['R14', 'Domains, the past law', '"At least once" carries the past',
    '"At least once" or "more than once" carries 52 units, 21 of the 59 lived units on one group\'s pages, so the past reads as one template and as a single hedged event, where Q9 asks for a definite pattern tied to an age span.',
    ['DC-006'],
    ['Rewrite them as definite patterns tied to the span, in the polish round.', 'Leave them.']],
  ['R15', 'Domains, character truth', 'At the Day and Hour Gates the gate writes the beat, not the character',
    'Four characters share one Love beat at the Day Gate (a partner who argues, a calm partner who bores you); four share one Family beat and three one Health beat there; five show care "by arranging, not words" at the Hour Gate; the Horizon and Rival print near-identical Wealth beats on one page; six Social characters close on "the few who stayed". The Steward and Horizon, and the Alchemist and Sage, hold apart elsewhere.',
    ['X-001', 'X-002', 'X-003', 'X-004', 'DE-002'],
    ['A character-distinct round for the Day and Hour Gate beats, the Horizon and Rival in Wealth and the Social closes (about 80 units), with a table of each character\'s own verbs that the gate checks.', 'Fix only the pairs that print on the same page (about 25 units).']],
  ['R16', 'Both surfaces, sentence shape', 'One joint and a few frames carry every page',
    '", and you" closes 596 of the 1,103 distinct units (12 to 21 times a Blueprint page, 8 to 16 a domain page). All 10 missing lines turn on "nobody inside it", all 30 need lines on "your season asks for", and 116 of 120 decade lines restate "these years" beside a label that already gives them. Life Chapters was offered the same rule (its M2).',
    ['DA-004', 'DB-005', 'DE-004', 'BA-028', 'BB-008', 'BC-004', 'X-008', 'X-009', 'X-010'],
    ['At most one ", and you" close per unit family on a page; decade lines drop "these years"; the missing and need lines get distinct frames. The gate enforces it, and the most-seen units are rewritten first.', 'Keep ", and you" as the house close.']],
  ['R17', 'Shared with Life Chapters', 'Ages count no birthday',
    'readerAge is the year minus the birth year, so a gate or a decade turns "now" up to a year early (a reader still 34 is placed in the Home Chapter on several pages).',
    ['M-6'],
    ['Read the age from the birth date, once, in readerAge; Life Chapters reads it too.', 'Leave it as it is.']],
];
const GOLD = held.filter((h) => h.reason === 'golden, to owner');
const MINOR = findings.filter((f) => f.severity === 'MINOR');
const fam = (k = '') => /^STRUCTURE|structure_rule|rescue|strongest/.test(k) ? 'Blueprint · structure and state' : /^SEASON|season_need/.test(k) ? 'Blueprint · the season' : /· missing|seen\./.test(k) ? 'Blueprint · seen, unseen and missing' : /bond\.|blueprint_line/.test(k) ? 'Blueprint · pairings and bonds'
  : /year_domain/.test(k) ? 'Domains · By year' : /decade_lines/.test(k) ? 'Domains · By decade' : /domain_gaps|domain_unruled/.test(k) ? 'Domains · gap rows and notes' : /domain_lines|fused_line/.test(k) ? 'Domains · pattern lines' : /^POSITION/.test(k) ? 'Domains · seat beats' : 'Across units';
const FAMS = ['Domains · seat beats', 'Domains · By decade', 'Domains · By year', 'Domains · gap rows and notes', 'Domains · pattern lines', 'Blueprint · structure and state', 'Blueprint · the season', 'Blueprint · seen, unseen and missing', 'Blueprint · pairings and bonds', 'Across units'];
const CODE = [
  ['The gap row hides while a decade that rules the domain runs in the reader\'s gate (the round-1 rule, missing from the new page builder)', 'DA-001 · DC-003 · DD-001'],
  ['The By decade tab reads only decades that start between 10 and 75 (the round-1 window), so no decade lived as a small child gets an adult line', 'DA-002 · DB-002 · DC-001 · DD-003 · DE-003'],
  ['"This year" turns at 立春, through Your Almanac\'s year, not on 1 January', 'M-5'],
  ['What protects a structure lists decades up to 75 only, as every other decade list does', 'M-2'],
  ['A missing character\'s decade already running "comes with your decade now" instead of "arrives"', 'BC-007'],
  ['The season needs keep 穷通宝鉴\'s first, second and third order', 'BB-003 · BA-027'],
  ['食神制杀 is named "The Artisan checks the General", never "tames"', 'M-4'],
  ['The Domains gate now bans luck, lucky, should, often and sometimes', 'DB'],
  ['The closed Hour Gate note drops its imperative and its "may"', 'DA-029 · DC-029'],
  ['The seat count says it once when one chapter holds every seat', 'DA-028 · DD-033 · DE-035'],
  ['A branch seat\'s label no longer says "inside" twice', 'DE-036'],
  ['The strain note no longer pluralises the character\'s name', 'BA-026'],
];
const ALMANAC = applied.filter((t) => /year_domain/.test(t.key));
const OTHERS = [
  ['Engine (calculator)', 'The luck-pillar start is ten years off for backward births from about 6 January to 3 February (Life Chapters M1); it moves those readers\' Domains decades too.'],
  ['Engine (strength band)', 'The band can disagree with the element shares: 甲 born in 酉 with Metal at 80% reads "strong" (B073); 丙 born in 申 reads Overfueled (D020); a chart with Metal at 16% reads Overfueled (B104). The band sets every decade\'s pole in every section.'],
  ['Engine (unknown hour)', 'chartContext.resolveHourForCalc fills an unknown hour with 12:00, which moves the band and the element shares on every section.'],
  ['Your Almanac', `${ALMANAC.length} By-year lines changed in this audit also print on the Year page (${ALMANAC.map((t) => t.key.replace(/^GOD /, '')).join(', ')}).`],
  ['Life Chapters', 'The "arrives" label for a decade already running (fixed here as BC-007) is worth checking on the chapter pages; one draft line still shows on the 辛 preset.'],
  ['Stars', 'Draft lines still show on every preset chart (R3, that session\'s batch not yet written).'],
];

const radio = (id, opts) => opts.map((o, i) => `<label class="opt" for="${id}${'ABC'[i]}"><input type="radio" name="${id}" id="${id}${'ABC'[i]}" value="${'ABC'[i]}"><span class="ol">${'ABC'[i]}</span><span class="ot">${e(o)}${i === 0 ? ' <b class="rec">Recommended</b>' : ''}</span></label>`).join('');
const ruling = ([id, where, title, body, ids, opts]) => `<article class="q" id="q-${id}"><header><span class="qid">${id}</span><span class="where">${e(where)}</span></header><h3>${e(title)}</h3><p class="ctx">${e(body)}</p><p class="ids">${ids.map(e).join(' · ')}</p><div class="opts">${radio(id, opts)}</div></article>`;
const gold = GOLD.map((h) => `<div class="pair"><span class="k">${e(h.ids.join(' + '))} · ${e(h.key)}</span><p class="was">${e(h.current)}</p><p class="now">${e(unq(h.fixes[0].fix))}</p><p class="iss">${e(h.fixes[0].issue)}</p></div>`).join('');
const minorHtml = FAMS.map((g) => { const xs = MINOR.filter((f) => fam(f.key) === g); return xs.length ? `<details><summary><span>${e(g)}</span><span class="cnt">${xs.length}</span></summary>${xs.map((f) => `<div class="item"><span class="k">${e(f.source.replace('group-', ''))}:${e(f.id)} · ${e(f.key || f.pages.slice(0, 80))}</span><p class="iss">${e(f.issue)}</p><p class="now">${e(unq(f.fix))}</p></div>`).join('')}</details>` : ''; }).join('');
const tweakHtml = `<details><summary><span>The ${applied.length} units changed</span><span class="cnt">${applied.length}</span></summary>${applied.map((t) => `<div class="pair"><span class="k">${e(t.id)} · ${e(t.key)}</span><p class="was">${e(t.before)}</p><p class="now">${e(t.after)}</p></div>`).join('')}</details>`;
const codeHtml = `<ul class="code">${CODE.map(([w, ids]) => `<li><span>${e(w)}</span><span class="ids">${e(ids)}</span></li>`).join('')}</ul>`;
const crit = `<div class="tbl"><table><thead><tr><th>Criterion</th><th>Domains</th><th>Blueprint</th><th>All</th></tr></thead><tbody>${C.map((c, i) => `<tr><td>${c}${{ B: ' · Pattern parity', C: ' · compound readability', D: ' · roles, truth, coherence', A1: ' · accuracy' }[c] || ''}</td>${[dom, bp, rows].map((rs) => { const m = mean(rs, i); return `<td class="n${m < 4 ? ' low' : ''}">${m.toFixed(2)}</td>`; }).join('')}</tr>`).join('')}</tbody></table></div>`;
const maxB = Math.max(...bDist.map(([, n]) => n));
const dist = `<div class="bars" role="img" aria-label="Pages by B score">${bDist.map(([v, n]) => `<div class="bar"><span class="bl">B ${v}</span><span class="track"><span class="fill${v >= 4 ? ' ok' : ''}" style="width:${(100 * n / maxB).toFixed(1)}%"></span></span><span class="bn">${n}</span></div>`).join('')}</div>`;
const groups = ['DA', 'DB', 'DC', 'DD', 'DE', 'BA', 'BB', 'BC'].map((g) => { const rs = rows.filter((r) => r.src === g); return [g, rs.length, mean(rs, 5)]; });
const GNAME = { DA: 'Family', DB: 'Wealth and Love', DC: 'Career and Health', DD: 'Growth and Mind', DE: 'Social', BA: 'Blueprint B001–B045', BB: 'Blueprint B046–B090', BC: 'Blueprint B091–B135' };
const groupTbl = `<div class="tbl"><table><thead><tr><th>Group</th><th>Pages</th><th>Mean B</th></tr></thead><tbody>${groups.map(([g, n, m]) => `<tr><td>${g} · ${GNAME[g]}</td><td class="n">${n}</td><td class="n${m < 4 ? ' low' : ''}">${m.toFixed(2)}</td></tr>`).join('')}<tr><td>Cross-reader (catalogue groups, not pages)</td><td class="n">15</td><td class="n low">3.33</td></tr></tbody></table></div>`;
const pagesTbl = `<details><summary><span>Every page</span><span class="cnt">${rows.length}</span></summary><div class="tbl"><table class="dense"><thead><tr><th>Page</th>${C.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.sort((a, b) => a.page.localeCompare(b.page)).map((r) => `<tr><td>${r.page}</td>${r.n.map((v) => `<td class="n${v < 4 ? ' low' : ''}">${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details>`;
const othersHtml = `<ul class="others">${OTHERS.map(([w, t]) => `<li><b>${e(w)}</b><span>${e(t)}</span></li>`).join('')}</ul>`;
const ALL_IDS = [...R.map((r) => r[0]), 'G1', 'MN'];

const html = `<title>Domains Blueprint Audit</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Spectral:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
/* A ruling sheet: one column of numbered rulings to answer in codes, then the evidence underneath. Jade for the house, cinnabar for what waits on the owner. */
:root{--bg:#f4f6f4;--card:#ffffff;--fg:#18211d;--mut:#5a6862;--line:#d6ddd9;--accent:#1d7558;--accent-soft:#e3f0ea;--major:#a9402c;--minor:#93600f;--tweak:#2b6683;--was:#8a6b63;
--serif:'Spectral',Georgia,'Times New Roman',serif;--sans:'IBM Plex Sans',system-ui,-apple-system,'Segoe UI',sans-serif;--mono:'IBM Plex Mono',ui-monospace,Menlo,Consolas,monospace}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#111614;--card:#18201c;--fg:#e3e9e5;--mut:#9aa8a1;--line:#2b3531;--accent:#5cc29a;--accent-soft:#1d2e27;--major:#e27b65;--minor:#d6a447;--tweak:#6db0d0;--was:#b8988f;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#111614;--card:#18201c;--fg:#e3e9e5;--mut:#9aa8a1;--line:#2b3531;--accent:#5cc29a;--accent-soft:#1d2e27;--major:#e27b65;--minor:#d6a447;--tweak:#6db0d0;--was:#b8988f;color-scheme:dark}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--fg);font:15px/1.55 var(--sans);margin:0}
.wrap{max-width:860px;margin:0 auto;padding-block:28px 120px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));display:flex;flex-direction:column;gap:28px}
h1,h2,h3{font-family:var(--serif);font-weight:600;text-wrap:balance;margin:0}
h1{font-size:2rem;line-height:1.15}h2{font-size:1.35rem}h3{font-size:1.08rem;line-height:1.3}
.eyebrow{font:500 .72rem/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
.lede{color:var(--mut);max-width:65ch;margin:0}
.head{display:flex;flex-direction:column;gap:10px}
.facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.fact{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:2px;min-width:0}
.fact b{font:600 1.35rem/1.2 var(--serif);font-variant-numeric:tabular-nums}.fact span{font-size:.8rem;color:var(--mut)}
.sev{display:inline-flex;gap:10px;flex-wrap:wrap;font:500 .8rem var(--mono)}
.sev i{font-style:normal;padding:1px 7px;border-radius:999px;border:1px solid currentColor}
.sev .ma{color:var(--major)}.sev .mi{color:var(--minor)}.sev .tw{color:var(--tweak)}
section{display:flex;flex-direction:column;gap:12px}
.holds{margin:0;padding-left:18px;display:flex;flex-direction:column;gap:4px}
.q{background:var(--card);border:1px solid var(--line);border-left:3px solid var(--major);border-radius:10px;padding:14px 16px;display:flex;flex-direction:column;gap:8px;min-width:0}
.q header{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}
.qid{font:600 .85rem var(--mono);color:var(--major)}.where{font:500 .72rem var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--mut)}
.ctx{margin:0;max-width:72ch}.ids{margin:0;font:400 .74rem var(--mono);color:var(--mut);overflow-wrap:anywhere}
.opts{display:flex;flex-direction:column;gap:6px}
.opt{display:grid;grid-template-columns:22px 1fr;gap:8px;align-items:start;padding:8px 10px;border:1px solid var(--line);border-radius:8px;cursor:pointer}
.opt input{position:absolute;opacity:0;pointer-events:none}
.ol{font:600 .8rem var(--mono);width:22px;height:22px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center}
.ot{min-width:0}.rec{font:500 .68rem var(--mono);letter-spacing:.05em;text-transform:uppercase;color:var(--accent);margin-left:4px}
.opt:has(input:checked){border-color:var(--accent);background:var(--accent-soft)}.opt:has(input:checked) .ol{background:var(--accent);color:var(--card);border-color:var(--accent)}
.opt:has(input:focus-visible){outline:2px solid var(--accent);outline-offset:2px}
details{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px 14px;min-width:0}
summary{cursor:pointer;font-weight:600;display:flex;justify-content:space-between;gap:12px}summary::-webkit-details-marker{display:none}
summary::before{content:'▸';color:var(--mut);margin-right:6px}details[open]>summary::before{content:'▾'}summary span:first-child{flex:1}
.cnt{font:500 .8rem var(--mono);color:var(--mut);font-variant-numeric:tabular-nums}
.item,.pair{border-top:1px dashed var(--line);padding:10px 0;display:flex;flex-direction:column;gap:4px;min-width:0}
.k{font:400 .74rem var(--mono);color:var(--mut);overflow-wrap:anywhere}
.iss{margin:0;font-size:.88rem;color:var(--mut)}.now{margin:0}.was{margin:0;color:var(--was);text-decoration:line-through;text-decoration-thickness:1px;font-size:.92rem}
.code{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px}
.code li{display:flex;flex-direction:column;gap:2px;padding:8px 12px;background:var(--card);border:1px solid var(--line);border-left:3px solid var(--tweak);border-radius:8px}
.code .ids{font:400 .72rem var(--mono);color:var(--mut)}
.tbl{overflow-x:auto;background:var(--card);border:1px solid var(--line);border-radius:10px}
table{border-collapse:collapse;width:100%;font-size:.88rem}th,td{padding:7px 10px;text-align:left;border-bottom:1px solid var(--line)}
th{font:500 .72rem var(--mono);letter-spacing:.05em;text-transform:uppercase;color:var(--mut)}tbody tr:last-child td{border-bottom:0}
td.n{font-variant-numeric:tabular-nums;text-align:right}.low{color:var(--major);font-weight:600}
table.dense td,table.dense th{padding:4px 8px;font-size:.8rem}
.bars{display:flex;flex-direction:column;gap:6px;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:12px 14px}
.bar{display:grid;grid-template-columns:40px 1fr 40px;gap:10px;align-items:center;font:500 .8rem var(--mono)}
.track{height:12px;background:var(--bg);border-radius:6px;overflow:hidden}.fill{display:block;height:100%;background:var(--major);border-radius:6px}.fill.ok{background:var(--accent)}
.bn{text-align:right;font-variant-numeric:tabular-nums}
.others{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px}
.others li{display:flex;flex-direction:column;gap:2px;padding:8px 12px;background:var(--card);border:1px solid var(--line);border-radius:8px}
.answer{position:fixed;left:0;right:0;bottom:0;background:var(--card);border-top:1px solid var(--line);padding-block:10px calc(10px + env(safe-area-inset-bottom,0px));padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));z-index:5}
.answer .in{max-width:860px;margin:0 auto;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.answer code{flex:1 1 100%;min-width:0;font:500 .76rem/1.45 var(--mono);overflow-wrap:anywhere;color:var(--fg);max-height:4.4em;overflow-y:auto}
@media (min-width:640px){.answer code{flex-basis:0}}
.answer code.empty{color:var(--mut)}
button{font:500 .85rem var(--sans);padding:8px 12px;border-radius:8px;border:1px solid var(--line);background:var(--bg);color:var(--fg);cursor:pointer}
button.primary{background:var(--accent);border-color:var(--accent);color:var(--card)}
button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
<div class="wrap">
<div class="head">
  <span class="eyebrow">Section audit · 2026-10-21 · R2 step 2</span>
  <h1>Domains and Energy Blueprint audit</h1>
  <p class="lede">Nine sealed auditors read 339 assembled pages (203 domain pages, 136 Blueprint pages) and a catalogue of all 1,103 units. The fixes that only correct a slip are landed. Everything that changes a rule, the engine or the meaning of a unit waits on your ruling below.</p>
  <div class="sev"><i class="ma">${sev('MAJOR')} MAJOR</i><i class="mi">${sev('MINOR')} MINOR</i><i class="tw">${sev('TWEAK')} TWEAK</i></div>
</div>
<div class="facts">
  <div class="fact"><b>${mean(rows, 5).toFixed(2)}</b><span>mean B, all 339 pages</span></div>
  <div class="fact"><b>${mean(dom, 5).toFixed(2)}</b><span>Domains, 203 pages</span></div>
  <div class="fact"><b>${mean(bp, 5).toFixed(2)}</b><span>Blueprint, 136 pages</span></div>
  <div class="fact"><b>${applied.length} + ${CODE.length}</b><span>units fixed + code fixes, live</span></div>
</div>
<section>
  <h2>What holds</h2>
  <ul class="holds">
    <li>All 120 season readings match 穷通宝鉴: the elements asked for, in order (checked against the sourced table and the base text).</li>
    <li>Every structure call follows the 子平真诠 revealed-stem rule and your S1 ruling, on all 136 Blueprint pages.</li>
    <li>Every seat sits where the chart puts it, and every decade's helping or heavy pole follows the house rule.</li>
    <li>41 of 42 bond lines fit their gates and kinds; no structure reading contradicts a seat or decade line for its character.</li>
    <li>No digits, dashes, semicolons or three-comma sentences anywhere. The banned words that got through (luck, often, should) are fixed, and the gate now catches them.</li>
  </ul>
  <p class="lede">The section is not frozen: ${rows.filter((r) => r.n[5] >= 4).length} of ${rows.length} pages reach 4 on B, and ${rows.filter((r) => r.n.slice(0, 6).every((x) => x >= 4)).length} reach 4 on B and on A1 to A5. The low scores trace mostly to the engine rules (R1 to R3) and to one sentence shape (R16), not to single lines.</p>
</section>
<section>
  <span class="eyebrow">Rulings · answer in codes</span>
  <h2>MAJOR: waits for you, nothing done</h2>
  ${R.map(ruling).join('')}
  <article class="q" id="q-G1"><header><span class="qid">G1</span><span class="where">Texts you approved</span></header><h3>Ten slips in golden and approved lines</h3><p class="ctx">The auditors found a banned word, a broken idiom or a word clash in ${GOLD.length} lines that are still word for word your approved texts, so they were not changed. Each fix is below, struck-through text first.</p><details><summary><span>The ${GOLD.length} lines</span><span class="cnt">${GOLD.length}</span></summary>${gold}</details><div class="opts">${radio('G1', ['Land all ten fixes as proposed, gated.', 'Keep the approved texts as they are.'])}</div></article>
  <article class="q" id="q-MN"><header><span class="qid">MN</span><span class="where">MINOR</span></header><h3>One polish round for the ${MINOR.length} MINOR findings</h3><p class="ctx">Each MINOR carries a proposed rewrite of the whole unit (listed below). Most overlap with a MAJOR (the character drifts with R15, the gap rows with R11, the repeated lead with R10).</p><div class="opts">${radio('MN', ['Run one polish round after your MAJOR rulings: sealed writers, the proposed rewrites as their brief, through the gate, with the units a MAJOR touches folded into that MAJOR.', 'Waive the MINORs for now.'])}</div></article>
</section>
<section>
  <h2>MINOR: proposed rewrites</h2>
  ${minorHtml}
</section>
<section>
  <h2>TWEAKS: fixed and live</h2>
  <p class="lede">${applied.length} units changed through the station, each gated, with the old text kept in the station's ore. Still held: the ${GOLD.length} lines in your approved texts (G1) and two that only swap "at least once" for "more than once" (they wait on R14). The fixes that had no station key are code, in the list below. ${ALMANAC.length} By-year lines here also print on Your Almanac's Year page.</p>
  ${tweakHtml}
  <h3>Code and label fixes</h3>
  ${codeHtml}
</section>
<section>
  <h2>Scores</h2>
  ${crit}
  ${dist}
  ${groupTbl}
  ${pagesTbl}
</section>
<section>
  <h2>For other sections</h2>
  ${othersHtml}
</section>
<p class="lede">Records: ComparativeAnalysis/Evaluations/section-audit-2026-10-21/domains/ (STATE.md, AUDITOR_BRIEF.md, audit/, findings.json, tweaks-applied.json, tweaks-held.json).</p>
</div>
<div class="answer"><div class="in"><code id="ans" class="empty">Tap an option on each ruling</code><button type="button" id="rec">Take every recommendation</button><button type="button" id="copy" class="primary">Copy</button></div></div>
<script>
const IDS=${JSON.stringify(ALL_IDS)};const KEY='domains-audit-2026-10-21';
const ans=document.getElementById('ans');
function render(){const parts=IDS.map(id=>{const c=document.querySelector('input[name="'+id+'"]:checked');return c?id+' '+c.value:null}).filter(Boolean);ans.textContent=parts.length?parts.join(', '):'Tap an option on each ruling';ans.classList.toggle('empty',!parts.length);try{localStorage.setItem(KEY,JSON.stringify(parts))}catch(e){}}
try{const saved=JSON.parse(localStorage.getItem(KEY)||'[]');saved.forEach(p=>{const [id,v]=p.split(' ');const el=document.getElementById(id+v);if(el)el.checked=true})}catch(e){}
document.addEventListener('change',e=>{if(e.target.matches('input[type=radio]'))render()});
document.getElementById('rec').addEventListener('click',()=>{IDS.forEach(id=>{const el=document.getElementById(id+'A');if(el)el.checked=true});render()});
document.getElementById('copy').addEventListener('click',async()=>{const t=ans.textContent;try{await navigator.clipboard.writeText(t);const b=document.getElementById('copy');b.textContent='Copied';setTimeout(()=>b.textContent='Copy',1500)}catch(e){const r=document.createRange();r.selectNodeContents(ans);const s=getSelection();s.removeAllRanges();s.addRange(r)}});
render();
</script>
`;
fs.writeFileSync(HERE + 'REPORT.html', html);
console.log(`REPORT.html: ${R.length} rulings + G1 + MN, ${MINOR.length} MINOR, ${applied.length} TWEAKs, ${CODE.length} code fixes, ${rows.length} pages, ${(html.length / 1024).toFixed(0)} KB`);
