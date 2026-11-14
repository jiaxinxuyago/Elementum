# Builds the owner's report page (one artifact) from findings.json, tweaks-applied.json and STATE.md's numbers.
import json, html, statistics as st, collections
D='ComparativeAnalysis/Evaluations/section-audit-2026-10-21/life-chapters/reaudit/'
f=json.load(open(D+'findings.json')); tw=json.load(open(D+'tweaks/out-tweaks.json'))['units']
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
 ('N1','Reader as subject · the year and landing lines','A4 fell from 4.31 to 3.37. About 60 units close with the event as subject ("costs you", "asks you", "the load on you"), mostly the year and landing lines shared with Your Almanac, written to the Almanac\'s AM1 ("name what the reader meets and what it costs"). The Life Chapters law puts the reader as the subject of the last sentence. 13 of 18 hard landings also end on the bare cost.',
  ['Rebuild them on a "You …" spine that still names what the reader meets and never how it ends ("You meet closer watching from the family you came from this year, and you answer it in your own time."), with a carry on every hard landing. Both rules met. About 60 units.','Exempt the shared year and landing lines from the reader-last law, as the Almanac reads them.']),
 ('N2','Readability · the joint moved instead of thinning','The ", and you" budget was met by turning about 40 closes into ", but you" where nothing contrasts ("favours one commitment over several, but you do your best with fewer people to answer to"). A2 fell from 3.76 to 3.02.',
  ['One rule for joints: "but" only for a real turn, and ", and you" and ", but you" together in at most a quarter of a kind; the rest close on a sentence that starts with "You". About 60 units, mostly domain lines.','Revert the domain lines to ", and you" and accept the joint.']),
 ('N3','Accuracy · grow lines that say "short of"','About 15 grow units outside "need" say "short of", "hungry for", "gone without", so 18 pages call two or three energies the one the chart lacks, against M8 and the page\'s own Seek chip; on Balanced charts the reader\'s own element reads "long gone without" and then "even".',
  ['Scarcity words only in the need units (and Body-short when Body is the scarcest); welcome words in the rest. About 15 units.','Leave them.']),
 ('N4','Distinctness · one carrier kit for every function','M4\'s neutral acts converged: "a walk" ×18, "someone close" ×11, "one thing at a time" across Mind, Expression, Action and Body; on 7 pages the chapter, a domain line, the manual and a year line repeat the same carry (L089 five times). The five functions stop reading as five forces (D2).',
  ['Give each function its own family of neutral acts: Mind release, doing something with the hands; Expression release, listening and quiet; Action release, saying no and fewer things; Order release, rest and time that is yours; Body release, yielding and time apart. Plus a gate check: one carry per page. About 70 units.','Leave them.']),
 ('N5','Readability · the page is long and its frames repeat','A composed page carries about 30 texts. The ruled openings ("brings X for a whole year", "This decade brings", "this chapter favours … over …") repeat six to nine times a page, which holds C at 2 on most pages whatever the wording.',
  ['Show lines only where the reader is: the current chapter in full; the current and next decade with their lines; other decades as labels with the lift meter; lived chapters keep their energy line. Free of new writing; a view change.','Keep every line on the page.']),
 ('N6','Voice · the heavy year lines all end on a possession tail','All ten heavy year units end "is yours to call on", "stay open to you", "are always within reach": M4 is met but each reads as a capacity close. The cross-reader wrote replacements for all ten.',
  ['Apply the cross-reader\'s ten replacements, checked against N1 and N4.','Leave them.']),
]
FOR_OTHERS=[('Your Almanac','N1 touches the year and landing lines its Year page shows; whichever way it is ruled, the Almanac reads the same text.'),('Domains','readerAge (domainsResolve.js) counts calendar years with no birthday, so a chapter, a domain step and the "you · age" marker turn on 1 January of the year the reader turns 16, 35 or 48, up to a year early.'),
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
FIRST=dict(zip(crit,[3.21,3.76,3.17,4.31,3.69,3.13,2.39,3.12]))
LABEL={'A1':'accuracy','A2':'error-free','A3':'on point','A4':'reader as protagonist','A5':'resonance','B':'Pattern parity','C':'compound readability','D':'roles, truth, coherence'}
score_tbl='<div class="tbl"><table class="plan"><tr><th>Criterion</th><th>First audit (75 pages)</th><th>Re-audit (91 pages)</th></tr>'+''.join(f'<tr><td>{c} · {LABEL[c]}</td><td class="n">{FIRST[c]:.2f}</td><td class="n{" low" if means[c]<FIRST[c]-0.05 else ""}">{means[c]:.2f}</td></tr>' for c in crit)+'</table></div>'
pages_tbl='<details><summary>Every page (75)</summary><div class="tbl"><table class="plan"><tr><th>Page</th>'+''.join(f'<th>{c}</th>' for c in crit)+'</tr>'+''.join('<tr><td>'+p+'</td>'+''.join(f'<td class="n{" low" if v<4 else ""}">{v:g}</td>' for v in n)+'</tr>' for p,n in sorted(rows))+'</table></div></details>'
minor_html=''.join(f'<details><summary>{g} · {len(xs)}</summary>'+''.join(f'<div class="mi"><span class="k">{e(x["id"])} · {e(x["key"] or x["pages"][:60])}</span><p class="iss">{e(x["issue"])}</p><p class="rd">{e(x["fix"])}</p></div>' for xs2 in [xs] for x in xs2)+'</details>' for g,xs in groups.items() if xs)
tweak_html='<details><summary>The units changed</summary>'+''.join(f'<div class="mi"><span class="k">{e(t["id"])} · {e(t["key"])}</span><p class="rd">{e(t["text"])}</p></div>' for t in tw)+'</details>'
extra_css='.low{color:var(--fire);font-weight:600}details{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px 12px}summary{cursor:pointer;font-weight:600}.mi{border-top:1px dashed var(--line);padding:8px 0;display:flex;flex-direction:column;gap:3px}.iss{font-size:.88rem;color:var(--mut)}.big{display:flex;flex-wrap:wrap;gap:10px}.big div{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px 14px;display:flex;flex-direction:column}.big b{font-family:var(--serif);font-size:1.5rem}.big span{font-size:.78rem;color:var(--mut)}'
page=f'''<title>Life Chapters Re-audit</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Spectral:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400&display=swap">
<style>{css}{extra_css}</style>
<div class="wrap">
<div class="lead"><span class="eyebrow">Section content audit · Life Chapters · re-audit after the polish round · 2026-11-14</span><h1>Life Chapters, re-audited</h1>
<p>Your rulings M1–M9 and MINOR are done and live: M1 (the January luck-pillar bug) was fixed by the calculator session on 22 October; the resolver rules (M3, M5, M6, M8, M9) and a full rewrite of the corpus under M2–M7, the 76 MINOR proposals and the Almanac\'s AM1–AM4 landed (464 units, 87 new). Four sealed auditors then re-read 91 pages. <b>Accuracy rose, every ruled check holds on every page, but B did not move and the voice lost ground</b>: writing to the rules produced mechanical substitutes. Six rows below for your ruling, then 65 MINOR rewrites; 49 small fixes and a rewritten ground set are live.</p>
<div class="big"><div><b>{means["B"]:.2f}</b><span>mean B (Pattern parity; 4 = equal)</span></div><div><b>{means["C"]:.2f}</b><span>mean C (readability)</span></div><div><b>{means["A1"]:.2f}</b><span>mean A1 (accuracy)</span></div><div><b>16 · 65 · 56</b><span>MAJOR · MINOR · TWEAK filed</span></div><div><b>3.13 → {means["B"]:.2f}</b><span>B, first audit → re-audit</span></div></div>
<nav class="toc"><a href="#scores">Scores</a><a href="#major">MAJOR</a><a href="#minor">MINOR</a><a href="#tweaks">Fixed</a><a href="#others">Other sections</a></nav></div>
<section id="scores" class="lead"><h2>Scores</h2><p>B is 3 on {dist.get(3.0,0)} pages and 4 on {dist.get(4.0,0)}; none is above 4. The section is not done. What rose: accuracy (A1), and every ruled check holds on every page (the ground lines follow direction, the .late lines from 55, no parents or siblings, the favours skip the chapter\'s domains, the Love lines, the neutral carriers); the mechanical sweep is clean. What fell: A2, A4 and A5, because the rewrite traded one tic for another (N1–N4). The structure of the page itself keeps C near 2 (N5).</p>{score_tbl}{pages_tbl}</section>
<section id="major" class="qs"><h2>Rows for your ruling · nothing done yet</h2>{"".join(q(i,t,c,o) for i,t,c,o in MAJ)}
{q("MINOR","The 65 MINOR rewrites","Each has a proposed rewrite (below). Most sit inside N1 to N6, so they go in the same round.",["Apply all of them in one polish round after the MAJOR rows, folding in the rebuilds.","Apply them now, before the MAJOR rows.","I will mark the ones to skip."])}
<div class="ans"><code id="out">Tap an answer to build your code line.</code><button type="button" id="rec" class="sec2">All recommended</button><button type="button" id="cp">Copy</button></div></section>
<section id="minor" class="lead"><h2>MINOR · proposed rewrites</h2><p>By energy. Each shows the finding and the rewrite the auditor proposed.</p>{minor_html}</section>
<section id="tweaks" class="lead"><h2>Fixed during the re-audit</h2><p>The auditors\' exact fixes (37 units after merging duplicates: word clashes, broken idioms, joints that mean the opposite), and the 20 ground lines rewritten on one model per relation and direction: a burden fed is a cost, a burden checked or drawn off is relief. Two code fixes: decade labels by age ("ages 16 to 25 · from 2016"), since the age now counts the birthday and a calendar span ended a year before the reader left the decade; and child lines only for a decade with at least six of its years before 16. Gated over all 464 units; the replaced texts are in the station\'s __ore.</p>{tweak_html}</section>
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
