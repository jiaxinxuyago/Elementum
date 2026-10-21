# Builds the owner's report page (one artifact) from findings.json, tweaks-applied.json and STATE.md's numbers.
import json, html, statistics as st, collections
D='ComparativeAnalysis/Evaluations/section-audit-2026-10-21/life-chapters/'
f=json.load(open(D+'findings.json')); tw=json.load(open(D+'tweaks-applied.json'))
e=lambda s: html.escape(str(s or ''))
rows=[]
for s in f['scores']:
  nums=[]
  for c in s['row'][1:]:
    try: nums.append(float(c.strip('*')))
    except: pass
  if len(nums)>=8: rows.append((s['page'],nums[:8]))
crit=['A1','A2','A3','A4','A5','B','C','D']
means={c:st.mean(r[1][i] for r in rows) for i,c in enumerate(crit)}
dist=collections.Counter(r[1][5] for r in rows)
MAJ=[
 ('M1','Accuracy · the luck-pillar start (calculator)','In 3,000 random births, 186 (6%) start their decades about ten years off; 121 of them are backward-direction births between 小寒 and 立春 (about 6 January to 3 February), where calculator.js counts back to the previous 大雪 instead of 小寒. Example: born 1951-01-19 22:00, female: the app starts the first decade at 14, the classical count (三日为一岁, 渊海子平 / 三命通会) gives 4.5. Those readers see the wrong decade on Life Chapters, Domains and the Almanac. A further 15% are a year off (the birth hour is ignored, the term dates are day-level, the F1 drift). Auditor G1 met one on page L013 independently. The calculator is shared: a fix moves existing readers\' decades in every section.',
  ['Fix the January bug now: one line in the backward search (look at 小寒 of the next Gregorian year first). It touches only the affected 4% of charts.','Fix the bug and also move the start age onto the minute-exact 节 table with the birth hour (the Almanac\'s solarTerms.js), with an audit of which charts change.','Leave the calculator; note it for later.']),
 ('M2','Readability · ", and you" closes almost every unit','The reader-last law is met with the same joint in nearly every unit: 16 to 34 times a page (mean about 25). It is the main reason C averages 2.4. All four reports filed it.',
  ['Budget it: at most one ", and you" per unit family on a page; rewrite the closes of the most-seen units (the ground lines, the year lines, the domain lines) to end on a "You …" sentence or another shape. About 120 units.','Keep it as the house close.']),
 ('M3','Accuracy · the "underneath" lines','Five ground lines carry every page, with one fixed reader clause each ("you put both to work" ×33 on one group\'s pages). They ignore direction: under an energy the chart releases, "you feel it hold all the way through" and "at full strength" read as gifts (35 units on 21 pages).',
  ['Write grow and release versions of each relation (5 × 2 × lived/present = 20 lines), with a varied reader clause.','Show the underneath line on the current chapter only, rewritten in two directions (10 lines).']),
 ('M4','Accuracy · what carries the reader is a fixed energy','Heavy and release lines name a fixed helper ("a fixed routine and someone who holds you to your word" is Order; "study and a mentor" is Mind). On many charts that helper is itself heavy, so the page contradicts itself: the heavy Expression year does it on all 8 of its pages. Mind release is carried by Order images (deadlines, stakes) in 8 of 35 units; Expression release is cured with more output in 13 of 35. Body release is carried by more peers.',
  ['Carriers become neutral acts (rest, a slower pace, finishing one thing, help from someone close) and the element to seek stays with the Seek chip, which already reads the chart. About 70 units rewritten.','Key the carrier by the chart\'s condition (Overfueled or Underfueled): two versions of each heavy unit, about 140 units.']),
 ('M5','Accuracy · people and roles the age cannot have','Year-Gate landings give readers in their sixties living parents and "a parent or grandparent"; Month-Gate lines give readers over 55 a workplace and a contract; Day-Gate landings say "your partner" to readers under 30; late decades give readers in their sixties and seventies bosses, deadlines and exams; four units name brothers and sisters (gendered, and the chart cannot know them).',
  ['Add a .late variant for decades that start at 55 or later and for Year- and Month-Gate landings when the reader is 55 or over; name the gate\'s area instead of a person where the age is uncertain ("home", "the family you came from"); siblings become "children your age". About 60 units and a resolver rule.','Neutral wording only (no new variants): rewrite the affected units to fit every age. About 40 units.']),
 ('M6','Repetition · the decade repeats its chapter','When the current decade has the same energy and direction as the current chapter (10 pages), its favours pairs repeat the chapter\'s domain lines (L053 repeats all three) and the manual and decade line share a carry phrase.',
  ['Resolver rule: favours pairs skip domains the chapter already read, taking the next weightiest; the gate bars a decade line and the manual of one function from sharing a carry phrase. No owner text changes.','Leave it.']),
 ('M7','Accuracy · Love lines compare two kinds of partner','Six Love lines set one kind of partner against another ("a partner you can disagree with over one you obey"); a reader with a partner reads it as advice to pick someone else. On five pages the Love line favours more of an energy the chart already has too much of.',
  ['Rewrite the ten Love lines to favour ways of being with a partner, not kinds of partner.','Leave them.']),
 ('M8','Accuracy · two energies "you need most" on one page','On three pages two different energies are each called "the energy you need most" (the "need" state is any welcomed energy at 10% or less, and a chart can have two).',
  ['Only the scarcest energy reads "the one you need most"; another under 10% reads the "grow" line. A resolver rule.','Change the words to "an energy your chart is short of" in all need lines.']),
 ('M9','Accuracy · the child decade line on teenage decades','The .early (child) decade lines reach decades that run mostly through ages 13 to 24 ("grown-ups who were quick to correct you" at 15 to 24).',
  ['Use .early only when the decade\'s midpoint is under 16. A resolver rule.','Leave it.']),
]
FOR_OTHERS=[('Domains','readerAge (domainsResolve.js) counts calendar years with no birthday, so a chapter, a domain step and the "you · age" marker turn on 1 January of the year the reader turns 16, 35 or 48, up to a year early.'),
 ('Domains','The decade labels ("2023 to 2032") are birth year + start age; the classical 交运 date is within a year of it (1,022 of 3,000 differ by a year). Shared with the Domains decade lines.'),
 ('Your Almanac','The Year page still reads the round-8 god-keyed year lines; the shared energy year lines (L9 A) are in depthChaptersEnergy.js under its own keys (note in its handoff folder).'),
 ('Shared (App.jsx)','The old "This Decade" (DecadePage) and "Life Chapters" (LifeChaptersDetail) screens stay in App.jsx routes; the decade tile redirects to Life Chapters. Retiring the routes touches the Today tab and the DevBar.')]
mi=[x for x in f['findings'] if x['severity']=='MINOR']
def fn(x):
  k=x.get('key') or ''
  for w in ['body','mind','expression','action','order']:
    if f'ENERGY {w} ' in k: return w.capitalize()
  return 'Landings and shared' if 'tpl_' in k else 'Across units'
groups=collections.OrderedDict()
for g in ['Body','Mind','Expression','Action','Order','Landings and shared','Across units']: groups[g]=[x for x in mi if fn(x)==g]
qids=[m[0] for m in MAJ]+['MINOR']
css=open('/tmp/claude-0/-home-user-Elementum/666613ff-29c6-5416-ac7b-03c434a9133c/scratchpad/lc/life-chapters-r2.html').read().split('<style>')[1].split('</style>')[0]
def q(i,t,ctx,opts): return f'<div class="q"><div class="qh"><span class="qid">{i}</span><h3>{e(t)}</h3></div><p class="ctx">{e(ctx)}</p>'+''.join(f'<label class="opt"><input type="radio" name="{i}" id="{i}{"ABC"[n]}" value="{"ABC"[n]}"><span class="ol">{"ABC"[n]}</span><span class="ot">{e(o)}{" <b class=\"rec\">Recommended</b>" if n==0 else ""}</span></label>' for n,o in enumerate(opts))+'</div>'
score_tbl='<div class="tbl"><table class="plan"><tr><th>Criterion</th><th>Mean</th></tr>'+''.join(f'<tr><td>{c}{" · Pattern parity" if c=="B" else " · compound readability" if c=="C" else " · roles, truth, coherence" if c=="D" else ""}</td><td class="n">{means[c]:.2f}</td></tr>' for c in crit)+'</table></div>'
pages_tbl='<details><summary>Every page (75)</summary><div class="tbl"><table class="plan"><tr><th>Page</th>'+''.join(f'<th>{c}</th>' for c in crit)+'</tr>'+''.join('<tr><td>'+p+'</td>'+''.join(f'<td class="n{" low" if v<4 else ""}">{v:g}</td>' for v in n)+'</tr>' for p,n in sorted(rows))+'</table></div></details>'
minor_html=''.join(f'<details><summary>{g} · {len(xs)}</summary>'+''.join(f'<div class="mi"><span class="k">{e(x["id"])} · {e(x["key"] or x["pages"][:60])}</span><p class="iss">{e(x["issue"])}</p><p class="rd">{e(x["fix"])}</p></div>' for xs2 in [xs] for x in xs2)+'</details>' for g,xs in groups.items() if xs)
tweak_html='<details><summary>The 40 units changed</summary>'+''.join(f'<div class="mi"><span class="k">{e(t["id"])} · {e(t["key"])}</span><p class="rd">{e(t["text"])}</p></div>' for t in tw)+'</details>'
extra_css='.low{color:var(--fire);font-weight:600}details{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px 12px}summary{cursor:pointer;font-weight:600}.mi{border-top:1px dashed var(--line);padding:8px 0;display:flex;flex-direction:column;gap:3px}.iss{font-size:.88rem;color:var(--mut)}.big{display:flex;flex-wrap:wrap;gap:10px}.big div{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px 14px;display:flex;flex-direction:column}.big b{font-family:var(--serif);font-size:1.5rem}.big span{font-size:.78rem;color:var(--mut)}'
page=f'''<title>Life Chapters Audit</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Spectral:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400&display=swap">
<style>{css}{extra_css}</style>
<div class="wrap">
<div class="lead"><span class="eyebrow">Section content audit · Life Chapters · 2026-10-21</span><h1>Life Chapters, audited</h1>
<p>Four independent auditors read 75 composed pages (one real birth chart each, as an Advisor reader sees it) and the whole corpus by energy, against the SOP criteria and The Pattern. I checked the timing against the classical tables myself. Nine MAJOR rows wait for your ruling; 76 MINOR rewrites wait for one polish round; 40 small fixes are done and live.</p>
<div class="big"><div><b>{means["B"]:.2f}</b><span>mean B (Pattern parity; 4 = equal)</span></div><div><b>{means["C"]:.2f}</b><span>mean C (readability)</span></div><div><b>{means["A1"]:.2f}</b><span>mean A1 (accuracy)</span></div><div><b>17 · 76 · 48</b><span>MAJOR · MINOR · TWEAK filed</span></div></div>
<nav class="toc"><a href="#scores">Scores</a><a href="#major">MAJOR</a><a href="#minor">MINOR</a><a href="#tweaks">Fixed</a><a href="#others">Other sections</a></nav></div>
<section id="scores" class="lead"><h2>Scores</h2><p>B is 3 on {dist.get(3.0,0)} pages and 4 on {dist.get(4.0,0)}; none is above 4. Every page sits below 4 on at least one of A1 to A5, so the section is not done. The lowest is C: the ", and you" close (M2). Reader-as-protagonist (A4) is the strength. The mechanical sweep is clean on every page (punctuation, digits, hedges, banned topics, the locked relation words). Each function reads as the same force across chapter, decade and year.</p>{score_tbl}{pages_tbl}</section>
<section id="major" class="qs"><h2>MAJOR · nothing done, your ruling first</h2>{"".join(q(i,t,c,o) for i,t,c,o in MAJ)}
{q("MINOR","The 76 MINOR rewrites","Each has a proposed rewrite (below). Many sit inside a MAJOR rebuild, so they are best applied after the MAJOR rows, in one polish round, gated.",["Apply all of them in one polish round after the MAJOR rows, folding in the rebuilds.","Apply them now, before the MAJOR rows.","I will mark the ones to skip."])}
<div class="ans"><code id="out">Tap an answer to build your code line.</code><button type="button" id="rec" class="sec2">All recommended</button><button type="button" id="cp">Copy</button></div></section>
<section id="minor" class="lead"><h2>MINOR · proposed rewrites</h2><p>By energy. Each shows the finding and the rewrite the auditor proposed.</p>{minor_html}</section>
<section id="tweaks" class="lead"><h2>Fixed during the audit</h2><p>Unambiguous slips, fixed through the station with the gate, the replaced texts kept in the station's __ore: comma-less age openers ("From birth to fifteen brothers"), false "again" and "more", gate-age slips ("left school" at fifteen, "exams" in your fifties), broken idioms ("kept their feet", "answers back"), word clashes, and "siblings" for "brothers, sisters". Also fixed in code: the year cards now follow 立春, so January no longer shows the coming year as now; the round-1 page is retired (R1).</p>{tweak_html}</section>
<section id="others" class="lead"><h2>For other sections</h2>{"".join(f"<div class='mi'><span class='k'>{e(a)}</span><p class='iss'>{e(b)}</p></div>" for a,b in FOR_OTHERS)}</section>
</div>
<script>
const ids={json.dumps(qids)};const out=document.getElementById('out');
function line(){{const p=ids.map(i=>{{const c=document.querySelector('input[name="'+i+'"]:checked');return c?i+' '+c.value:null}}).filter(Boolean);out.textContent=p.length?p.join(', '):'Tap an answer to build your code line.';try{{localStorage.setItem('lc-audit',JSON.stringify(p))}}catch(e){{}}}}
document.addEventListener('change',e=>{{if(e.target.matches('input[type=radio]'))line()}});
document.getElementById('rec').onclick=()=>{{ids.forEach(i=>{{const el=document.getElementById(i+'A');if(el)el.checked=true}});line()}};
document.getElementById('cp').onclick=async()=>{{try{{await navigator.clipboard.writeText(out.textContent);document.getElementById('cp').textContent='Copied'}}catch(e){{const r=document.createRange();r.selectNodeContents(out);const s=getSelection();s.removeAllRanges();s.addRange(r)}}}};
try{{(JSON.parse(localStorage.getItem('lc-audit')||'[]')).forEach(x=>{{const[i,v]=x.split(' ');const el=document.getElementById(i+v);if(el)el.checked=true}});line()}}catch(e){{}}
</script>'''
open(D+'REPORT.html','w').write(page); print('ok',len(page))
