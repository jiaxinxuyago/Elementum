// Builds DOMAINS_NOW.html from now.json: the Domains and Blueprint pages as elementum.life serves them, laid out in the
// order the screens use (DepthViews.jsx: DomainsHubPage, DomainReadingPage, BlueprintPage), shown unlocked.
//   node .../current/snapshot-now.mjs && node .../current/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const HERE = path.dirname(new URL(import.meta.url).pathname) + '/';
const data = JSON.parse(fs.readFileSync(HERE + 'now.json', 'utf8'));
let commit = ''; try { commit = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: HERE, encoding: 'utf8' }).trim(); } catch { /* none */ }
data.commit = commit;
data.names = {
  golden: 'The reference chart behind the golden tests',
  youngHourLead: 'A reader of 29 whose ruling seats sit mostly in later chapters',
  dualBond: 'Two bonds tie the same pair of pillars',
  strongSealMoney: 'A strong Sage chart with money showing',
  pastMonth: 'A reader of 54, past the Rising Chapter',
  familyGap: 'A reader of 24 with an empty seat row',
  mixedCured: 'Magistrate and General mixed, the cure already seated',
  weakWealthPeers: 'A weak chart with peers beside its wealth',
  jinshui: 'Metal Day Master born in winter (金水伤官)',
  noHour: 'The 24-year-old again, with no birth hour',
  seasonCond: 'Fire Day Master in the tenth month, half Water',
};
const json = JSON.stringify(data).replace(/</g, '\\u003c');

const html = `<title>Domains Reading Now</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=EB+Garamond:wght@400;500;600&display=swap">
<style>
/* Layout: a reading desk. A narrow rail of sample charts on the left, the reading laid out as the app's cards on the right. */
:root {
  --silk: #F1E9D6; --card: #F8F2E4; --cardEdge: #DCCFB2; --hair: #CDBE9E;
  --ink: #2B2722; --inkSoft: #4A433B; --inkLight: #7A7267; --seal: #A04030; --sealSoft: #F0DCD3;
  --wood: #587A4D; --fire: #9E5540; --earth: #927750; --metal: #6A849A; --water: #3E5F85;
  --woodBg: #DCE6D3; --fireBg: #F1DDD3; --earthBg: #EEE3CC; --metalBg: #DCE4EB; --waterBg: #D6E0EC;
  --free: #587A4D; --seeker: #3E5F85; --advisor: #A04030;
  --display: 'Cormorant Garamond', 'Iowan Old Style', Georgia, 'Songti SC', serif;
  --body: 'EB Garamond', 'Iowan Old Style', Georgia, 'Songti SC', serif;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --silk: #1C1915; --card: #26221D; --cardEdge: #3B352C; --hair: #4C4437;
  --ink: #EDE5D6; --inkSoft: #CFC6B6; --inkLight: #9C9384; --seal: #E08A72; --sealSoft: #3C2620;
  --wood: #9CC08E; --fire: #E39C82; --earth: #D5B887; --metal: #A9C1D6; --water: #8EAFD6;
  --woodBg: #2A3426; --fireBg: #3A2821; --earthBg: #362E22; --metalBg: #283039; --waterBg: #232E3C;
  --free: #9CC08E; --seeker: #8EAFD6; --advisor: #E08A72; color-scheme: dark; } }
:root[data-theme="dark"] {
  --silk: #1C1915; --card: #26221D; --cardEdge: #3B352C; --hair: #4C4437;
  --ink: #EDE5D6; --inkSoft: #CFC6B6; --inkLight: #9C9384; --seal: #E08A72; --sealSoft: #3C2620;
  --wood: #9CC08E; --fire: #E39C82; --earth: #D5B887; --metal: #A9C1D6; --water: #8EAFD6;
  --woodBg: #2A3426; --fireBg: #3A2821; --earthBg: #362E22; --metalBg: #283039; --waterBg: #232E3C;
  --free: #9CC08E; --seeker: #8EAFD6; --advisor: #E08A72; color-scheme: dark; }
*, *::before, *::after { box-sizing: border-box; font-style: normal; }
body { background: var(--silk); color: var(--ink); font-family: var(--body); font-size: 17px; line-height: 1.5;
  padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); padding-block: 28px 56px; }
.wrap { max-width: 1120px; margin: 0 auto; display: flex; flex-direction: column; gap: 22px; }
.mast { display: flex; flex-direction: column; gap: 6px; max-width: 760px; }
.mast .lab { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--seal); }
h1 { font-family: var(--display); font-weight: 600; font-size: clamp(30px, 5vw, 44px); line-height: 1.05; margin: 0; text-wrap: balance; }
.mast p { margin: 0; color: var(--inkSoft); max-width: 66ch; }
.tiers { display: flex; flex-wrap: wrap; gap: 8px 14px; font-size: 14px; color: var(--inkLight); margin-top: 4px; }
.tag { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; letter-spacing: 1.4px; text-transform: uppercase; }
.tag::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
.t-free { color: var(--free); } .t-seeker { color: var(--seeker); } .t-advisor { color: var(--advisor); }
.desk { display: grid; grid-template-columns: 270px minmax(0, 1fr); gap: 28px; align-items: start; }
.rail { position: sticky; top: calc(env(safe-area-inset-top, 0px) + 16px); display: flex; flex-direction: column; gap: 4px; }
.rail .lab, .sel label { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--inkLight); margin: 0 0 6px 10px; }
.chartbtn { all: unset; cursor: pointer; display: flex; flex-direction: column; gap: 1px; padding: 9px 10px; border-radius: 8px; border: 1px solid transparent; }
.chartbtn:hover { background: var(--card); }
.chartbtn:focus-visible, .chip:focus-visible, .domcard:focus-visible, .sel select:focus-visible { outline: 2px solid var(--seal); outline-offset: 2px; }
.chartbtn[aria-current="true"] { background: var(--card); border-color: var(--cardEdge); }
.chartbtn b { font-family: var(--display); font-weight: 600; font-size: 18px; letter-spacing: 1px; }
.chartbtn span { font-size: 14px; color: var(--inkSoft); line-height: 1.3; }
.sel { display: none; flex-direction: column; }
.sel select { font: inherit; font-size: 16px; color: var(--ink); background: var(--card); border: 1px solid var(--cardEdge); border-radius: 8px; padding: 10px 12px; width: 100%; }
.main { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
.card { background: var(--card); border: 1px solid var(--cardEdge); border-radius: 12px; padding: 20px 22px; min-width: 0; }
.chartcard { display: flex; flex-wrap: wrap; gap: 18px 26px; align-items: center; }
.pillars { display: flex; gap: 8px; }
.pil { display: flex; flex-direction: column; align-items: center; gap: 3px; }
.pil small { font-size: 10px; letter-spacing: 1.4px; text-transform: uppercase; color: var(--inkLight); }
.pil .gz { display: flex; flex-direction: column; border-radius: 8px; overflow: hidden; border: 1px solid var(--cardEdge); }
.pil .gz span { width: 44px; height: 42px; display: grid; place-items: center; font-family: 'Songti SC', 'Noto Serif SC', serif; font-size: 24px; }
.pil.day .gz { border-color: var(--seal); }
.facts { display: flex; flex-direction: column; gap: 3px; min-width: 0; flex: 1 1 260px; }
.facts .n { font-family: var(--display); font-size: 23px; font-weight: 600; line-height: 1.15; }
.facts .m { font-size: 15px; color: var(--inkSoft); font-variant-numeric: tabular-nums; }
.nav { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { all: unset; cursor: pointer; font-size: 15px; padding: 5px 12px; border-radius: 999px; border: 1px solid var(--cardEdge); color: var(--inkSoft); background: transparent; }
.chip:hover { border-color: var(--hair); color: var(--ink); }
.chip[aria-current="true"] { background: var(--ink); border-color: var(--ink); color: var(--silk); }
.chip.bp { border-color: var(--seal); color: var(--seal); }
.chip.bp[aria-current="true"] { background: var(--seal); color: var(--card); }
.eyebrow { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 12px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--inkLight); }
.title { font-family: var(--display); font-weight: 600; font-size: clamp(25px, 3.6vw, 32px); line-height: 1.12; margin: 6px 0 8px; text-wrap: balance; }
.lede { margin: 0; color: var(--inkSoft); max-width: 66ch; }
.domgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 10px; }
.domcard { all: unset; cursor: pointer; background: var(--card); border: 1px solid var(--cardEdge); border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; }
.domcard:hover { border-color: var(--hair); }
.domcard.heavy { border-color: var(--seal); }
.domtop { display: flex; align-items: center; gap: 10px; }
.domname { font-family: var(--display); font-weight: 600; font-size: 21px; }
.pips { display: flex; gap: 4px; margin-left: auto; }
.pip { width: 10px; height: 10px; border-radius: 50%; background: var(--c); display: inline-block; }
.pip.dim { opacity: .22; }
.domh { font-size: 16px; line-height: 1.4; }
.note { font-size: 15px; color: var(--inkLight); margin: 0; }
.life { position: relative; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-top: 1px solid var(--hair); margin: 18px 0 6px; padding-top: 26px; }
.gate { display: flex; flex-direction: column; gap: 5px; padding: 0 6px; border-left: 1px solid var(--hair); }
.gate:first-child { border-left: 0; }
.gate .gn { font-size: 12px; letter-spacing: 1.6px; text-transform: uppercase; color: var(--inkSoft); }
.gate.cur .gn { color: var(--seal); font-weight: 600; }
.gate.fut { opacity: .62; }
.gate .gs { display: flex; flex-wrap: wrap; gap: 5px; min-height: 12px; }
.gate .ga { font-size: 13px; color: var(--inkLight); font-variant-numeric: tabular-nums; }
.gate .closed { font-size: 13px; color: var(--inkLight); }
.you { position: absolute; top: -1px; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; }
.you::before { content: ""; width: 1px; height: 9px; background: var(--seal); }
.you span { font-size: 12px; color: var(--seal); white-space: nowrap; font-variant-numeric: tabular-nums; }
.sect { display: flex; flex-direction: column; gap: 10px; }
.secthead { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 14px; padding: 6px 2px 0; }
.secthead h3 { font-family: var(--display); font-weight: 600; font-size: 22px; margin: 0; }
.secthead .app { font-size: 14px; color: var(--inkLight); }
.read { margin: 0; max-width: 68ch; }
.read + .read { margin-top: 10px; }
.seats { display: flex; flex-direction: column; }
.seat { display: flex; flex-direction: column; gap: 4px; padding: 14px 0; border-top: 1px solid var(--hair); }
.seat:first-child { border-top: 0; padding-top: 0; }
.seat:last-child { padding-bottom: 0; }
.seatname { font-family: var(--display); font-weight: 600; font-size: 19px; line-height: 1.2; }
.seatmeta { font-size: 12.5px; letter-spacing: 1.3px; text-transform: uppercase; color: var(--inkLight); }
.gap { padding: 12px 14px; border-radius: 8px; background: var(--silk); margin: 10px 0 0; font-size: 16px; }
.gap b { font-weight: 600; }
.empty { color: var(--inkLight); margin: 0; }
.draft { display: inline-block; margin-left: 6px; font-size: 10px; letter-spacing: 1.4px; text-transform: uppercase; color: var(--seal); border: 1px solid var(--seal); border-radius: 4px; padding: 0 4px; vertical-align: 2px; }
.bp { display: flex; flex-direction: column; gap: 10px; }
.bp .step { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--seal); }
.bp .meta { font-size: 12.5px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--inkLight); margin: 6px 0 -6px; }
.bp .labp { font-weight: 600; }
.seekease { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; font-size: 13px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--inkSoft); margin-top: 4px; }
.seekease .grp { display: inline-flex; align-items: center; gap: 5px; }
.foot { font-size: 14px; color: var(--inkLight); margin: 6px 0 0; max-width: 72ch; }
.foot code { font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 13px; }
@media (max-width: 820px) {
  .desk { grid-template-columns: minmax(0, 1fr); }
  .rail { display: none; }
  .sel { display: flex; }
  .card { padding: 16px; }
  .pil .gz span { width: 38px; height: 36px; font-size: 21px; }
  .life { padding-top: 30px; }
}
@media (prefers-reduced-motion: no-preference) { .chip, .chartbtn, .domcard { transition: background .15s, border-color .15s, color .15s; } }
</style>
<div class="wrap">
  <header class="mast">
    <span class="lab">Elementum · The Domains</span>
    <h1>The Domains reading, as it reads now</h1>
    <p id="intro"></p>
    <div class="tiers"><span>Everything is shown unlocked. Tags mark which tier opens each part:</span>
      <span class="tag t-free">Free</span><span class="tag t-seeker">Seeker</span><span class="tag t-advisor">Advisor</span></div>
  </header>
  <div class="desk">
    <nav class="rail" aria-label="Sample charts"><p class="lab">Eleven sample charts</p><div id="rail"></div></nav>
    <div class="main">
      <div class="sel"><label for="chartsel">Sample chart</label><select id="chartsel"></select></div>
      <section class="card chartcard" id="chartcard" aria-label="The chart"></section>
      <nav class="nav" id="nav" aria-label="Pages"></nav>
      <div id="view" class="sect"></div>
      <p class="foot" id="foot"></p>
    </div>
  </div>
</div>
<script type="application/json" id="data">${json}</script>
<script>
(function () {
  var D = JSON.parse(document.getElementById('data').textContent);
  var IDS = Object.keys(D.charts);
  var EL = { '甲': 'wood', '乙': 'wood', '丙': 'fire', '丁': 'fire', '戊': 'earth', '己': 'earth', '庚': 'metal', '辛': 'metal', '壬': 'water', '癸': 'water',
    '寅': 'wood', '卯': 'wood', '巳': 'fire', '午': 'fire', '辰': 'earth', '戌': 'earth', '丑': 'earth', '未': 'earth', '申': 'metal', '酉': 'metal', '亥': 'water', '子': 'water' };
  var GATES = ['year', 'month', 'day', 'hour'];
  var GATE_NAME = { year: 'Early', month: 'Rising', day: 'Home', hour: 'Late' };
  var GATE_AGES = { year: 'birth–15', month: '16–34', day: '35–47', hour: '48 on' };
  var PIL = { year: 'Year', month: 'Month', day: 'Day', hour: 'Hour' };
  var NUMW = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
  var STRENGTH = { extremely_strong: 'very strong', strong: 'strong', moderate: 'balanced', weak: 'weak', extremely_weak: 'very weak' };
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } }
  function put(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* none */ } }
  var state = { id: get('dn-chart', 'golden'), view: get('dn-view', 'hub') };
  if (!D.charts[state.id]) state.id = 'golden';
  function tag(t) { return '<span class="tag t-' + t + '">' + t + '</span>'; }
  function draft(u) { return u && u.draft ? '<span class="draft">draft</span>' : ''; }
  function birthLine(c) {
    var b = c.birth; var h = c.hu ? 'hour unknown' : (String(b.hour).padStart(2, '0') + ':00');
    return b.day + ' ' + MON[b.month - 1] + ' ' + b.year + ' · ' + h + ' · ' + b.gender;
  }
  document.getElementById('intro').innerHTML = 'The Domains and Blueprint pages of elementum.life on ' + esc('14 November 2026') + (D.commit ? ' (build ' + esc(D.commit) + ')' : '') +
    ', for eleven sample charts. Every line was produced by the app’s own code, with the rulings of this round live, including the new structure rules and pairing conditions (S1 A). Sections run in the order the app shows them.';
  document.getElementById('foot').innerHTML = 'Generated by <code>ComparativeAnalysis/Evaluations/section-audit-2026-10-21/domains/current/</code> (snapshot-now.mjs, then build.mjs). Reader’s age and the year are read as of ' + esc(D.today) + '. In the app, By position, By decade and By year are tabs on each domain page; here they are stacked so the whole page reads in one scroll.';
  function rail() {
    document.getElementById('rail').innerHTML = IDS.map(function (id) {
      var c = D.charts[id]; var p = c.pillars.map(function (x) { return x ? x.stem + x.branch : '··'; }).join(' ');
      return '<button type="button" class="chartbtn" data-id="' + id + '" aria-current="' + (id === state.id) + '"><b>' + esc(p) + '</b><span>' + esc(D.names[id] || c.why) + '</span></button>';
    }).join('');
    document.getElementById('chartsel').innerHTML = IDS.map(function (id) {
      return '<option value="' + id + '"' + (id === state.id ? ' selected' : '') + '>' + esc(D.names[id] || id) + '</option>';
    }).join('');
  }
  function chartCard(c) {
    var pil = GATES.map(function (g, i) {
      var x = c.pillars[i];
      var s = x ? '<span style="background:var(--' + EL[x.stem] + 'Bg);color:var(--' + EL[x.stem] + ')">' + x.stem + '</span><span style="background:var(--' + EL[x.branch] + 'Bg);color:var(--' + EL[x.branch] + ')">' + x.branch + '</span>'
        : '<span style="color:var(--inkLight)">·</span><span style="color:var(--inkLight)">·</span>';
      return '<div class="pil' + (g === 'day' ? ' day' : '') + '"><small>' + PIL[g] + '</small><div class="gz">' + s + '</div></div>';
    }).join('');
    return '<div class="pillars" aria-label="Four pillars">' + pil + '</div><div class="facts"><span class="n">' + esc(c.blueprint.title) + '</span>' +
      '<span class="m">' + esc(birthLine(c)) + ' · age ' + c.age + ' · Day Master ' + esc(STRENGTH[c.strength] || c.strength) + '</span>' +
      '<span class="m">' + esc(D.names[D._id] || c.why) + '</span></div>';
  }
  function navHtml(c) {
    var items = [['hub', 'All domains']].concat(c.domains.map(function (d) { return [d.domain, d.domain]; })).concat([['blueprint', 'Blueprint']]);
    return items.map(function (it) {
      return '<button type="button" class="chip' + (it[0] === 'blueprint' ? ' bp' : '') + '" data-view="' + esc(it[0]) + '" aria-current="' + (state.view === it[0]) + '">' + esc(it[1]) + '</button>';
    }).join('');
  }
  function lifeLine(c, lit) {
    var age = c.age; var gi = age < 16 ? 0 : age < 35 ? 1 : age < 48 ? 2 : 3;
    var b = [[0, 16], [16, 35], [35, 48], [48, 80]][gi]; var frac = Math.max(0, Math.min(1, (age - b[0]) / (b[1] - b[0])));
    var gates = GATES.map(function (g, i) {
      var seats = (g === 'hour' && c.hu) ? '<span class="closed">closed</span>' : c.positions.filter(function (p) { return p.gate === g; })
        .sort(function (a, z) { return (a.kind === 'stem' ? 0 : 1) - (z.kind === 'stem' ? 0 : 1); })
        .map(function (p) { return '<i class="pip' + (lit && lit.indexOf(p.id) < 0 ? ' dim' : '') + '" style="--c:var(--' + p.el + ')" title="' + esc(p.term) + '"></i>'; }).join('');
      return '<div class="gate' + (i === gi ? ' cur' : i > gi ? ' fut' : '') + '"><span class="gn">' + GATE_NAME[g] + '</span><span class="gs">' + seats + '</span><span class="ga">' + GATE_AGES[g] + '</span></div>';
    }).join('');
    return '<div class="life">' + gates + '<span class="you" style="left:' + ((gi + frac) * 25).toFixed(1) + '%"><span>you · ' + age + '</span></span></div>';
  }
  function hub(c) {
    return '<section class="card"><div class="eyebrow">Your Domains ' + tag('free') + '</div><h2 class="title">Eight parts of your life, and who rules them</h2>' +
      '<p class="lede">One of ten characters sits in each seat of your chart, and each character rules certain parts of your life. Where several seats rule the same domain, that domain carries more weight for you.</p></section>' +
      '<div class="domgrid">' + c.domains.map(function (d) {
        return '<button type="button" class="domcard' + (d.heavy ? ' heavy' : '') + '" data-view="' + esc(d.domain) + '"><span class="domtop"><span class="domname">' + esc(d.domain) + '</span><span class="pips">' +
          d.pips.map(function (e) { return '<i class="pip" style="--c:var(--' + e + ')"></i>'; }).join('') + '</span></span><span class="domh">' + esc(d.hubLine) + '</span></button>';
      }).join('') + '</div><p class="note" style="text-align:center">Every headline and each domain’s first reading are free. A red edge marks the domains that carry the most weight.</p>';
  }
  function domain(c, d) {
    var seats = d.blocks.filter(function (b) { return b.kind === 'seat'; });
    var h = '<section class="card"><div class="eyebrow">The Domains · ' + esc(d.domain) + ' ' + tag('free') + '</div>' +
      (d.headline ? '<h2 class="title">' + esc(d.headline) + '</h2>' : '') + '<p class="lede">' + esc(d.intro) + '</p>' + lifeLine(c, d.lit) + '</section>';
    h += '<div class="secthead"><h3>By position</h3><span class="app">the first tab</span></div>';
    h += '<section class="card"><div class="eyebrow">How you are ' + tag('free') + '</div>' + (d.how ? '<p class="read" style="margin-top:8px">' + esc(d.how) + '</p>' : '') +
      (d.pattern ? '<p class="read">' + esc(d.pattern) + '</p>' : '') + (!d.how && !d.pattern ? '<p class="empty">No line here for this chart.</p>' : '') + '</section>';
    if (d.blocks.length) {
      h += '<section class="card"><div class="eyebrow">' + (seats.length ? 'The ' + (seats.length === 1 ? 'seat that rules' : NUMW[seats.length].toLowerCase() + ' seats that rule') + ' your ' + esc(d.domain) : 'Your ' + esc(d.domain) + ' seats') + ' ' + tag('seeker') + '</div><div class="seats" style="margin-top:10px">' +
        d.blocks.map(function (b) {
          return b.kind === 'gap' ? '<div class="gap"><b>' + esc(b.label) + '</b> ' + esc(b.text) + '</div>'
            : '<div class="seat"><span class="seatname">' + esc(b.name) + '</span><span class="seatmeta">' + esc(b.meta) + '</span>' + (b.text ? '<p class="read">' + esc(b.text) + '</p>' : '') + '</div>';
        }).join('') + '</div></section>';
    }
    d.notes.forEach(function (n) { h += '<p class="note">' + esc(n) + '</p>'; });
    h += '<div class="secthead"><h3>By decade</h3><span class="app">the second tab</span> ' + tag('advisor') + '</div><section class="card"><div class="seats">' +
      (d.byDecade.length ? d.byDecade.map(function (x) { return '<div class="seat"><span class="seatmeta">' + esc(x.label) + '</span><p class="read">' + esc(x.text) + '</p></div>'; }).join('')
        : '<p class="empty">No decade in your reading window rules your ' + esc(d.domain) + '.</p>') + '</div></section>';
    h += '<div class="secthead"><h3>By year</h3><span class="app">the third tab</span> ' + tag('advisor') + '</div><section class="card"><div class="seats">' +
      (d.byYear.length ? d.byYear.map(function (x) { return '<div class="seat"><span class="seatmeta">' + esc(x.label) + '</span><p class="read">' + esc(x.text) + '</p></div>'; }).join('')
        : '<p class="empty">No year left in this decade touches your ' + esc(d.domain) + ' directly.</p>') + '</div></section>';
    return h;
  }
  function U(u) { return u && u.text ? '<p class="read">' + esc(u.text) + draft(u) + '</p>' : ''; }
  function M(t) { return t ? '<p class="meta">' + esc(t) + '</p>' : ''; }
  function blueprint(c) {
    var B = c.blueprint, s = B.structure, r = B.runs;
    var h = '<section class="card"><div class="eyebrow">Your Energy Blueprint ' + tag('advisor') + '</div><h2 class="title">' + esc(B.title) + '</h2><p class="lede">The decoding of your chart: why the rest of your reading comes out the way it does.</p></section>';
    h += '<section class="card bp"><span class="step">1 · Your structure</span>' + U(s.reading) + M('why · the revealed-stem rule') + U(s.rule) +
      '<p class="read"><span class="labp">' + esc(s.statusLabel) + '</span> ' + esc(s.status ? s.status.text : '') + draft(s.status) + '</p>' + (s.rescue ? M(s.rescue.label) + U(s.rescue) : '') + '</section>';
    h += '<section class="card bp"><span class="step">2 · What your chart runs on and lacks</span><p class="read"><span class="labp">Strongest.</span> ' + esc(r.strongest ? r.strongest.text : '') + draft(r.strongest) + '</p>' +
      (r.missing.length ? '<p class="read labp">Missing.</p>' + r.missing.map(function (x) { return M(x.label) + U(x); }).join('') : '') +
      (r.season ? '<p class="read labp">Your season · 调候.</p>' + M(r.seasonName + ' · 穷通宝鉴') + U(r.season) : '') + r.needs.map(function (x) { return M(x.label) + U(x); }).join('') +
      '<div class="seekease"><span class="grp">Seek ' + c.seek.map(function (e) { return '<i class="pip" style="--c:var(--' + e + ')"></i>'; }).join('') + '</span><span class="grp">Ease ' +
      c.ease.map(function (e) { return '<i class="pip" style="--c:var(--' + e + ')"></i>'; }).join('') + '</span></div></section>';
    h += '<section class="card bp"><span class="step">3 · Seen and unseen</span><p class="read labp">In plain view.</p>' + B.seen.plain.map(function (x) { return M(x.label) + U(x); }).join('') +
      '<p class="read labp">Inside.</p>' + B.seen.inside.map(function (x) { return M(x.label) + U(x); }).join('') + U(B.seen.close) + '</section>';
    h += '<section class="card bp"><span class="step">4 · Pairings and clashes</span>' + B.pairs.pairs.map(function (x) { return M(x.label) + U(x); }).join('') +
      B.pairs.bonds.map(function (x) { return M(x.label) + U(x); }).join('') + (B.pairs.noneHard ? '<p class="note">' + esc(B.pairs.noneHard.text) + '</p>' : '') +
      (!B.pairs.pairs.length && !B.pairs.bonds.length && !B.pairs.noneHard ? '<p class="empty">No pairing or bond holds in this chart.</p>' : '') + '</section>';
    return h;
  }
  function render() {
    var c = D.charts[state.id]; D._id = state.id;
    if (state.view !== 'hub' && state.view !== 'blueprint' && !c.domains.some(function (d) { return d.domain === state.view; })) state.view = 'hub';
    rail();
    document.getElementById('chartcard').innerHTML = chartCard(c);
    document.getElementById('nav').innerHTML = navHtml(c);
    var v = document.getElementById('view');
    v.innerHTML = state.view === 'hub' ? hub(c) : state.view === 'blueprint' ? blueprint(c) : domain(c, c.domains.filter(function (d) { return d.domain === state.view; })[0]);
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-id],[data-view]'); if (!t) return;
    if (t.dataset.id) { state.id = t.dataset.id; put('dn-chart', state.id); }
    if (t.dataset.view) { state.view = t.dataset.view; put('dn-view', state.view); if (t.classList.contains('domcard')) document.getElementById('nav').scrollIntoView({ block: 'start' }); }
    render();
  });
  document.getElementById('chartsel').addEventListener('change', function (e) { state.id = e.target.value; put('dn-chart', state.id); render(); });
  render();
})();
</script>
`;
fs.writeFileSync(HERE + 'DOMAINS_NOW.html', html);
console.log(`DOMAINS_NOW.html: ${(html.length / 1024).toFixed(0)} KB`);
