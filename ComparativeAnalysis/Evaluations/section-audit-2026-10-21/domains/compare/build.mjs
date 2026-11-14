// The side-by-side page (owner 2026-11-14): before.json and after.json → COMPARE.html, one artifact.
//   node .../compare/build.mjs
import fs from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname) + '/';
const APP = path.resolve(HERE, '../../../../../Elementum_App') + '/';
const rd = (f) => JSON.parse(fs.readFileSync(HERE + f, 'utf8'));
const before = rd('before.json'); const after = rd('after.json');
const sb = rd('shape-before.json'); const sa = rd('shape-after.json');
const extra = fs.existsSync(HERE + 'extra.json') ? rd('extra.json') : {};
const { PAIRING_RULES } = await import(APP + 'src/engine/depth/pairings.js');
const { TG_PATTERNS } = await import(APP + 'src/content/tgPatterns.js');
const e = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const NAMES = { golden: 'The golden chart', youngHourLead: 'Seats not yet reached', dualBond: 'Two bonds on one pair', strongSealMoney: 'Strong seal, money', pastMonth: 'Past the Month Gate', familyGap: 'A gap row at 24', mixedCured: 'Officers mixed', weakWealthPeers: 'Weak wealth, peers', jinshui: '金水伤官', noHour: 'No birth hour', seasonCond: 'Season condition' };
const charts = Object.keys(after).map((id) => ({ id, name: NAMES[id] || id, why: after[id].why, birth: after[id].birth, hu: after[id].hu, pillars: after[id].pillars, strength: after[id].strength, condition: after[id].condition,
  pages: [...after[id].domains.map((d) => ({ name: d.domain, before: before[id].domains.find((x) => x.domain === d.domain)?.sections || [], after: d.sections })), { name: 'Blueprint', before: before[id].blueprint.sections, after: after[id].blueprint.sections }] }));
const rules = TG_PATTERNS.map((t) => ({ zh: t.zh, en: t.en, holds: PAIRING_RULES[t.key]?.holds || 'Always.', source: PAIRING_RULES[t.key]?.source || '' }));
const fam = Object.keys(sb.fam);
const DATA = JSON.stringify({ charts }).replace(/</g, '\\u003c');

const metricRow = (label, b, a, good) => `<tr><td>${e(label)}</td><td class="n">${e(b)}</td><td class="n ${good ? 'ok' : ''}">${e(a)}</td></tr>`;
const metrics = [
  metricRow('Pages breaking the one-joint rule (R16)', `${sb.breakPct}%`, `${sa.breakPct}%`, sa.breakPct < sb.breakPct),
  metricRow('", and you" closes on a domain page, mean', sb.andYouMean, sa.andYouMean, sa.andYouMean < sb.andYouMean),
  metricRow('Decade lines restating their period', sb.period, sa.period, sa.period < sb.period),
  metricRow('Repeated frames on Blueprint pages', sb.frames, sa.frames, sa.frames < sb.frames),
  ...fam.map((k) => metricRow(`${k}: pages with two or more`, `${sb.fam[k][0]} of ${sb.fam[k][1]}`, `${sa.fam[k]?.[0] ?? '–'} of ${sa.fam[k]?.[1] ?? '–'}`, (sa.fam[k]?.[0] ?? 0) < sb.fam[k][0])),
  ...(extra.rows || []).map((r) => metricRow(r[0], r[1], r[2], r[3])),
].join('');

const html = `<title>Domains Side by Side</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Spectral:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
/* A reading table: one chart, one page, the old reading and the new one side by side, with the words that changed marked. */
:root{--bg:#f4f6f4;--card:#ffffff;--fg:#18211d;--mut:#5a6862;--line:#d6ddd9;--accent:#1d7558;--accent-soft:#e3f0ea;--old:#8f3b2b;--old-soft:#f6e6e1;--new:#1d6a4f;--new-soft:#dcefe5;--warn:#93600f;
--serif:'Spectral',Georgia,'Times New Roman',serif;--sans:'IBM Plex Sans',system-ui,-apple-system,'Segoe UI',sans-serif;--mono:'IBM Plex Mono',ui-monospace,Menlo,Consolas,monospace}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#111614;--card:#18201c;--fg:#e3e9e5;--mut:#9aa8a1;--line:#2b3531;--accent:#5cc29a;--accent-soft:#1d2e27;--old:#e48a76;--old-soft:#3a2420;--new:#6fd3a6;--new-soft:#1b3328;--warn:#d6a447;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#111614;--card:#18201c;--fg:#e3e9e5;--mut:#9aa8a1;--line:#2b3531;--accent:#5cc29a;--accent-soft:#1d2e27;--old:#e48a76;--old-soft:#3a2420;--new:#6fd3a6;--new-soft:#1b3328;--warn:#d6a447;color-scheme:dark}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--fg);font:15px/1.55 var(--sans);margin:0}
.wrap{max-width:1180px;margin:0 auto;padding-block:24px 110px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));display:flex;flex-direction:column;gap:22px}
h1,h2,h3{font-family:var(--serif);font-weight:600;text-wrap:balance;margin:0}h1{font-size:1.9rem;line-height:1.15}h2{font-size:1.3rem}h3{font-size:1.02rem}
.eyebrow{font:500 .72rem/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
.lede{color:var(--mut);max-width:70ch;margin:0}
.pick{display:flex;flex-direction:column;gap:10px}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.chip{font:500 .82rem var(--sans);padding:6px 11px;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--fg);cursor:pointer}
.chip[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:var(--card)}
.chip:focus-visible,button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.chartinfo{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px 14px;display:flex;flex-wrap:wrap;gap:6px 18px;align-items:baseline}
.chartinfo b{font-family:var(--serif);font-size:1.05rem}.chartinfo .mono{font-family:var(--mono);font-size:.85rem}.chartinfo .why{color:var(--mut);font-size:.88rem;flex-basis:100%}
.view{display:flex;gap:6px;align-items:center;flex-wrap:wrap}.view .lab{font-size:.8rem;color:var(--mut)}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.cols.one{grid-template-columns:1fr}
.col{display:flex;flex-direction:column;gap:8px;min-width:0}
.colhead{font:600 .78rem var(--mono);letter-spacing:.08em;text-transform:uppercase;padding:2px 0}.colhead.b{color:var(--old)}.colhead.a{color:var(--new)}
.sec{background:var(--card);border:1px solid var(--line);border-radius:9px;padding:9px 12px;display:flex;flex-direction:column;gap:3px;min-width:0}
.sec.changed{border-left:3px solid var(--warn)}.sec.only-b{border-left:3px solid var(--old);opacity:.92}.sec.only-a{border-left:3px solid var(--new)}
.part{font:500 .68rem var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--mut);display:flex;gap:8px;flex-wrap:wrap}
.badge{font:500 .64rem var(--mono);padding:0 6px;border-radius:999px;border:1px solid currentColor}.badge.b{color:var(--old)}.badge.a{color:var(--new)}.badge.c{color:var(--warn)}
.label{font-size:.82rem;color:var(--mut);overflow-wrap:anywhere}
.text{margin:0}.key{font:400 .66rem var(--mono);color:var(--mut);overflow-wrap:anywhere}
del{background:var(--old-soft);color:var(--old);text-decoration:line-through;text-decoration-thickness:1px}
ins{background:var(--new-soft);color:var(--new);text-decoration:none}
.tbl{overflow-x:auto;background:var(--card);border:1px solid var(--line);border-radius:10px}
table{border-collapse:collapse;width:100%;font-size:.86rem}th,td{padding:7px 10px;text-align:left;border-bottom:1px solid var(--line);vertical-align:top}
th{font:500 .7rem var(--mono);letter-spacing:.05em;text-transform:uppercase;color:var(--mut)}tbody tr:last-child td{border-bottom:0}
td.n{font-variant-numeric:tabular-nums;text-align:right;white-space:nowrap}td.ok{color:var(--new);font-weight:600}
.q{background:var(--card);border:1px solid var(--line);border-left:3px solid var(--accent);border-radius:10px;padding:14px 16px;display:flex;flex-direction:column;gap:8px}
.opt{display:grid;grid-template-columns:22px 1fr;gap:8px;align-items:start;padding:8px 10px;border:1px solid var(--line);border-radius:8px;cursor:pointer}
.opt input{position:absolute;opacity:0;pointer-events:none}.ol{font:600 .8rem var(--mono);width:22px;height:22px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center}
.opt:has(input:checked){border-color:var(--accent);background:var(--accent-soft)}.opt:has(input:checked) .ol{background:var(--accent);color:var(--card);border-color:var(--accent)}
.rec{font:500 .68rem var(--mono);letter-spacing:.05em;text-transform:uppercase;color:var(--accent);margin-left:4px}
.answer{position:fixed;left:0;right:0;bottom:0;background:var(--card);border-top:1px solid var(--line);padding-block:8px calc(8px + env(safe-area-inset-bottom,0px));padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));z-index:5}
.answer .in{max-width:1180px;margin:0 auto;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.answer code{flex:1 1 200px;min-width:0;font:500 .78rem var(--mono);overflow-wrap:anywhere}
button{font:500 .85rem var(--sans);padding:7px 12px;border-radius:8px;border:1px solid var(--line);background:var(--bg);color:var(--fg);cursor:pointer}
button.primary{background:var(--accent);border-color:var(--accent);color:var(--card)}
@media (max-width:760px){.cols{grid-template-columns:1fr}.cols .col.hide-sm{display:none}}
@media (min-width:761px){.view{display:none}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
<div class="wrap">
<div class="pick">
  <span class="eyebrow">Domains + Blueprint · the rulings applied (R1–R17, G1, MN)</span>
  <h1>Before and after, side by side</h1>
  <p class="lede">Eleven real charts, each picked because a ruling changes its pages. Choose a chart, then a page. The old reading is on the left and the new one on the right. Struck-through words left the reading, green words came in, and an amber edge marks a section whose text changed. The Blueprint state rules (R1) and the pairing conditions (R2) show here as the dev site reads them; they reach elementum.life only after your answer at the end.</p>
</div>
<section class="pick">
  <div class="chips" id="charts" role="group" aria-label="Chart"></div>
  <div class="chartinfo" id="info"></div>
  <div class="chips" id="pages" role="group" aria-label="Page"></div>
  <div class="view" role="group" aria-label="Show"><span class="lab">Show</span><button type="button" class="chip" data-v="a" aria-pressed="true">After</button><button type="button" class="chip" data-v="b" aria-pressed="false">Before</button></div>
  <div class="cols" id="cols"></div>
</section>
<section class="pick">
  <h2>Across the whole section</h2>
  <p class="lede">The same counts on ${e(sa.charts)} random charts (${e(sa.pages)} pages), before and after.</p>
  <div class="tbl"><table><thead><tr><th>Measure</th><th>Before</th><th>After</th></tr></thead><tbody>${metrics}</tbody></table></div>
</section>
<section class="pick">
  <h2>The pairing conditions (R2), for your approval</h2>
  <p class="lede">A pairing now prints only when its classical condition holds, and never when the STATE above it already names the same tension.</p>
  <div class="tbl"><table><thead><tr><th>Pairing</th><th>Prints when</th><th>Source</th></tr></thead><tbody>${rules.map((r) => `<tr><td>${e(r.en)} · ${e(r.zh)}</td><td>${e(r.holds)}</td><td>${e(r.source)}</td></tr>`).join('')}</tbody></table></div>
</section>
<section class="pick">
  <article class="q"><span class="eyebrow">S1 · ship the Blueprint rules</span><h3>Ship R1 and R2 to elementum.life?</h3><p class="lede">The state rules read the Day Master's strength and the cure already in the chart, and the pairings their conditions above. They run on the dev site now.</p>
  <label class="opt" for="S1A"><input type="radio" name="S1" id="S1A" value="A"><span class="ol">A</span><span>Ship both to elementum.life now. <b class="rec">Recommended</b></span></label>
  <label class="opt" for="S1B"><input type="radio" name="S1" id="S1B" value="B"><span class="ol">B</span><span>Keep them on the dev site; I will name what to change.</span></label></article>
</section>
</div>
<div class="answer"><div class="in"><code id="ans">Tap an option to answer S1</code><button type="button" id="copy" class="primary">Copy</button></div></div>
<script>
const D=${DATA};
let ci=0, pi=0, view='a';
try{const s=JSON.parse(localStorage.getItem('dom-compare')||'{}');ci=s.ci||0;pi=s.pi||0}catch(e){}
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function diff(a,b){const x=a.split(/\\s+/).filter(Boolean),y=b.split(/\\s+/).filter(Boolean);const n=x.length,m=y.length;const L=Array.from({length:n+1},()=>new Int32Array(m+1));
for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)L[i][j]=x[i]===y[j]?L[i+1][j+1]+1:Math.max(L[i+1][j],L[i][j+1]);
const A=[],B=[];let i=0,j=0;while(i<n&&j<m){if(x[i]===y[j]){A.push(esc(x[i]));B.push(esc(y[j]));i++;j++}else if(L[i+1][j]>=L[i][j+1]){A.push('<del>'+esc(x[i])+'</del>');i++}else{B.push('<ins>'+esc(y[j])+'</ins>');j++}}
while(i<n)A.push('<del>'+esc(x[i++])+'</del>');while(j<m)B.push('<ins>'+esc(y[j++])+'</ins>');return [A.join(' ').replace(/<\\/del> <del>/g,' '),B.join(' ').replace(/<\\/ins> <ins>/g,' ')]}
function pair(bs,as){const used=new Set(),out=[];const k=s=>s.part+'|'+s.label;
for(const a of as){let bi=bs.findIndex((b,i)=>!used.has(i)&&k(b)===k(a));if(bi<0)bi=bs.findIndex((b,i)=>!used.has(i)&&b.part===a.part&&(b.key||'').split(' · ')[0]===(a.key||'').split(' · ')[0]);if(bi<0&&!/Seat|decade|year|Pairing|Bond|Missing|need|view|Inside/i.test(a.part))bi=bs.findIndex((b,i)=>!used.has(i)&&b.part===a.part);
if(bi>=0){used.add(bi);out.push([bs[bi],a])}else out.push([null,a])}
bs.forEach((b,i)=>{if(!used.has(i))out.push([b,null])});return out}
function card(s,html,cls,badge){return '<div class="sec '+cls+'"><div class="part"><span>'+esc(s.part)+'</span>'+badge+'</div>'+(s.label?'<div class="label">'+esc(s.label)+'</div>':'')+'<p class="text">'+html+'</p>'+(s.key?'<div class="key">'+esc(s.key)+'</div>':'')+'</div>'}
function render(){const c=D.charts[ci];const p=c.pages[pi];
document.getElementById('charts').innerHTML=D.charts.map((x,i)=>'<button type="button" class="chip" aria-pressed="'+(i===ci)+'" data-c="'+i+'">'+esc(x.name)+'</button>').join('');
document.getElementById('info').innerHTML='<b>'+esc(c.pillars)+'</b><span class="mono">'+c.birth.year+'-'+String(c.birth.month).padStart(2,'0')+'-'+String(c.birth.day).padStart(2,'0')+(c.hu?' · hour unknown':' · '+c.birth.hour+':00')+' · '+esc(c.birth.gender)+'</span><span class="mono">'+esc(c.strength)+' · '+esc(c.condition)+'</span><span class="why">'+esc(c.why)+'</span>';
document.getElementById('pages').innerHTML=c.pages.map((x,i)=>{const ch=pair(x.before,x.after).some(([b,a])=>!b||!a||b.text!==a.text||b.label!==a.label);return '<button type="button" class="chip" aria-pressed="'+(i===pi)+'" data-p="'+i+'">'+esc(x.name)+(ch?' ·':'')+'</button>'}).join('');
const L=[],R=[];for(const [b,a] of pair(p.before,p.after)){
 if(b&&a){const changed=b.text!==a.text||b.label!==a.label;const [hb,ha]=changed?diff(b.text,a.text):[esc(b.text),esc(a.text)];
  L.push(card(b,hb,changed?'changed':'',changed?'<span class="badge c">changed</span>':''));R.push(card(a,ha,changed?'changed':'',changed?'<span class="badge c">changed</span>':''))}
 else if(b){L.push(card(b,'<del>'+esc(b.text)+'</del>','only-b','<span class="badge b">removed</span>'));R.push('<div class="sec only-b"><div class="part"><span>'+esc(b.part)+'</span><span class="badge b">no longer shown</span></div></div>')}
 else{L.push('<div class="sec only-a"><div class="part"><span>'+esc(a.part)+'</span><span class="badge a">new</span></div></div>');R.push(card(a,'<ins>'+esc(a.text)+'</ins>','only-a','<span class="badge a">new</span>'))}}
const small=matchMedia('(max-width:760px)').matches;
document.getElementById('cols').innerHTML='<div class="col'+(small&&view!=='b'?' hide-sm':'')+'"><div class="colhead b">Before</div>'+L.join('')+'</div><div class="col'+(small&&view!=='a'?' hide-sm':'')+'"><div class="colhead a">After</div>'+R.join('')+'</div>';
try{localStorage.setItem('dom-compare',JSON.stringify({ci,pi}))}catch(e){}}
document.addEventListener('click',ev=>{const t=ev.target.closest('button');if(!t)return;if(t.dataset.c){ci=+t.dataset.c;pi=0;render()}else if(t.dataset.p){pi=+t.dataset.p;render()}else if(t.dataset.v){view=t.dataset.v;document.querySelectorAll('.view .chip').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===view));render()}});
matchMedia('(max-width:760px)').addEventListener('change',render);
const ans=document.getElementById('ans');document.addEventListener('change',ev=>{if(ev.target.name==='S1')ans.textContent='S1 '+ev.target.value});
document.getElementById('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(ans.textContent);document.getElementById('copy').textContent='Copied';setTimeout(()=>document.getElementById('copy').textContent='Copy',1500)}catch(e){const r=document.createRange();r.selectNodeContents(ans);const s=getSelection();s.removeAllRanges();s.addRange(r)}});
render();
</script>
`;
fs.writeFileSync(HERE + 'COMPARE.html', html);
console.log(`COMPARE.html: ${charts.length} charts, ${(html.length / 1024).toFixed(0)} KB`);
