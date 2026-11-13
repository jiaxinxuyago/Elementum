import json,html
d=json.load(open('/home/user/Elementum/ComparativeAnalysis/Evaluations/revelation-2026-11-05/LADDER_ALL_STEMS_DRAFT.json'))
S=d['shared']; ST=d['stems']
def pill(s): return f'<span class="st {s}">{"ruled" if s=="ruled" else "draft"}</span>'
def tbl(code,title,note,rows):
  nd=sum(1 for r in rows if r[-1]=='draft')
  body=''.join(f'<tr><td class="k">{html.escape(k)}</td><td>{html.escape(t)}</td><td>{pill(s)}</td></tr>' for k,t,s in rows)
  return f'<section class="bt"><header><p class="code">{code}</p><h3>{title}</h3><p class="nt">{note} · {nd} draft, {len(rows)-nd} ruled</p></header><div class="tw"><table>{body}</table></div></section>'
B=[]
B.append(tbl('S1','Element headings (card 1)','One per element, under the Day Master name',[(k,v['text'],v['status']) for k,v in S['element_heading'].items()]))
rows=[]
for core,m in S['nature_pair'].items():
  for el,v in m.items(): rows.append((f'{core} core · {el}',v['text'],v['status']))
for st,v in ST.items(): rows.append((f'{st} {v["name"]} · own element',v['self_nature']['text'],v['self_nature']['status']))
B.append(tbl('S2','What each energy is in nature (rung 1)','Per core element, so the image fits the relation; plus each stem\'s own element',rows))
order=['absent','thin','present','abundant','dominant']; lab={'absent':'none (0%)','thin':'very little (≤10%)','present':'a fair amount','abundant':'a lot (≥20%)','dominant':'a great deal (≥40%)'}
B.append(tbl('S3','What your amount means (rung 3)','Five functions × five amounts',[(f'{f} · {lab[o]}',S['in_you'][f][o]['text'],S['in_you'][f][o]['status']) for f in S['in_you'] for o in order]))
B.append(tbl('S4','You might notice (rung 4)','Five functions × low, mid, high amount',[(f'{f} · {l}',S['notice'][f][l]['text'][0].upper()+S['notice'][f][l]['text'][1:],S['notice'][f][l]['status']) for f in S['notice'] for l in ['low','mid','high']]))
B.append(tbl('S5','Try this (rung 5)','Five functions × Grow, Release, Keep',[(f'{f} · {p}',S['try'][f][p]['text'][0].upper()+S['try'][f][p]['text'][1:],S['try'][f][p]['status']) for f in S['try'] for p in ['grow','release','keep']]))
B.append(tbl('S6','How you run (card 3)','Heading, body and try for each condition',[(f'{c} · {k}',v[k]['text'],v[k]['status']) for c,v in S['condition'].items() for k in ['heading','body','try']]))
B.append(tbl('S7','Your type: the mode sentence and the need (card 9)','Pattern for the need: "Your chart leans on {Mode}. The {El} you need is {phrase}."',[(f'{k} mode',v['text'],v['status']) for k,v in S['mode_plain'].items()]+[(f'needing {k}',v['text'],v['status']) for k,v in S['need_phrase'].items() if k!='_pattern']))
P=[]
for st,v in ST.items():
  rows=[('line under the name',v['element_line']['text'],v['element_line']['status']),('recognition line',v['recognition']['text'],v['recognition']['status']),('card 1, the person',v['as_line']['text'],v['as_line']['status']),('behaviour 1 (2 and 3 are the locked claims)',v['behaviour']['text'],v['behaviour']['status']),('contrast line',v['contrast']['text'],v['contrast']['status'])]
  P.append(tbl(f'P-{st}',f'{st} {v["name"]}','The stem\'s own lines; the closing line is its locked inscription',rows))
# the Vine preview (chart B: 1990-09-17 05:00; Wood core; Metal 74 Order, Earth 12 Action, Wood 11 Body, Fire 3 Expression, Water 0 Mind; needs Water)
V=ST['乙']; I=S['in_you']; N=S['notice']; T=S['try']; NP=S['nature_pair']['Wood']
def c(t): return t[0].upper()+t[1:]
cards=[('The Naming',f'<p class="ey">Your Day Master</p><p class="nm">The Vine</p><p>{V["element_line"]["text"]}</p><p class="rc">{V["recognition"]["text"]}</p><p class="sm">{S["naming_footnote"]["text"]}</p>'),
('Who the Vine is',f'<p class="h">{S["element_heading"]["Wood"]["text"]}</p><p>{V["as_line"]["text"]} You might notice:</p><ul><li>{V["behaviour"]["text"]}</li><li>You bend where others break, and arrive intact.</li><li>You find the one opening in a wall and grow through it.</li></ul><p>{V["contrast"]["text"]}</p><p class="sl">You find a way around what stops other people, and they call it luck.</p>'),
('Metal · your Order · 74% · Release it',f'<p class="h">{NP["Metal"]["text"]}</p><p>{S["function_plain"]["Order"]["text"]}</p><p><b>In you.</b> {I["Order"]["dominant"]["text"]}</p><p><b>You might notice</b> {N["Order"]["high"]["text"]}</p><p class="tr"><b>Try this:</b> {c(T["Order"]["release"]["text"])}</p>'),
('Water · your Mind · 0% · Grow it (your need)',f'<p class="h">{NP["Water"]["text"]}</p><p>{S["function_plain"]["Mind"]["text"]}</p><p><b>In you.</b> {I["Mind"]["absent"]["text"]}</p><p><b>You might notice</b> {N["Mind"]["low"]["text"]}</p><p class="tr"><b>Try this:</b> {c(T["Mind"]["grow"]["text"])}</p>'),
('Your type',f'<p class="nm sm2">The Vine · Order mode</p><p class="h">{S["mode_plain"]["Order"]["text"]}</p><p>Your chart leans on Order. The Water you need is {S["need_phrase"]["Mind"]["text"]}.</p><p class="tr"><b>Start here:</b> {c(T["Mind"]["grow"]["text"])}</p><p>Oceans and Rains carry the Water you need. {S["circle_close"]["text"]}</p>')]
prev=''.join(f'<article class="pc"><p class="pt">{t}</p>{b}</article>' for t,b in cards)
page=open('/tmp/claude-0/-home-user-Elementum/44737d46-3eb7-5b0b-a4a4-59a7ef90ce82/scratchpad/bl/rule_tpl.html').read().replace('{{PREV}}',prev).replace('{{SHARED}}',''.join(B)).replace('{{STEMS}}',''.join(P))
open('/tmp/claude-0/-home-user-Elementum/44737d46-3eb7-5b0b-a4a4-59a7ef90ce82/scratchpad/bl/all-stems.html','w').write(page);print(len(page)//1024,'KB')
