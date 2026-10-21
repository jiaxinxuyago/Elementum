# Builds approved.json (ruled samples, re-keyed) and the seven worklists from the ruled plan (round 2, L1-L10 A).
import json
T='../2026-10-19-chapters-template/'
FN=['body','mind','expression','action','order']; DIR=['grow','release']
DOM=['Career','Wealth','Love','Family','Social','Health','Mind','Growth']
GT=[('year','lived'),('month','now'),('month','lived'),('day','coming'),('day','now'),('day','lived'),('hour','coming'),('hour','now')]
appr={}
for u in json.load(open(T+'samples-energy.json'))['units']:
    t=u['text']
    if u['kind']=='chapter_domain': t=t.replace(', it favours',', this chapter favours')
    k=u['key'].replace('TEMPLATED tpl_almanac · ground.','TEMPLATED tpl_almanac · ground.')
    if k.startswith('TEMPLATED tpl_almanac · ground.'): continue  # the Almanac owns the present ground lines
    appr[k]={'key':k,'kind':u['kind'],'text':t}
# year landings ruled in round 1 (S A) and round 8: re-keyed to the Almanac's land.year keys (L9 A)
REK={'selfpunish':'repeat'}
for src in [T+'samples.json','../2026-10-18-depth-template/template.json']:
    for u in json.load(open(src))['units']:
        if u['kind']=='year_bond':
            kind,gate=u['key'].split('year_bond.')[1].split('.')
            k=f'TEMPLATED tpl_almanac · land.year.{REK.get(kind,kind)}.{gate}'
            appr.setdefault(k,{'key':k,'kind':'land','text':u['text']})
json.dump({'units':list(appr.values())},open('approved.json','w'),ensure_ascii=False,indent=1)
want=[]
for f in FN:
  for g,t in GT:
    for d in DIR: want.append(('chapter_energy',f'ENERGY {f} · chapter.{g}.{d}.{t}',f))
for f in FN:
  for D in DOM:
    for d in DIR: want.append(('chapter_domain',f'ENERGY {f} · chapter_domain.{D}.{d}',f))
for f in FN:
  for d in DIR:
    want.append(('manual',f'ENERGY {f} · chapter_manual.{d}',f))
    want.append(('decade_now',f'ENERGY {f} · decade.{d}.now',f))
    for t in ['early','lived','coming']:
      for v in 'ab': want.append(('decade_energy',f'ENERGY {f} · decade.{d}.{t}.{v}',f))
for rel in ['feeds','drains','matches','presses','resists']: want.append(('ground',f'TEMPLATED tpl_chapters · ground.{rel}.lived','-'))
for f in FN:
  for D in DOM:
    for d in DIR: want.append(('favours',f'ENERGY {f} · favours.decade.{D}.{d}',f))
for f in FN:
  for s in (['core_under','core_over'] if f=='body' else ['need','grow','heavy']): want.append(('year_energy',f'ENERGY {f} · year.{s}',f))
for k in ['bind','clash','punish','harm','frame','repeat']:
  for g in ['year','month','day','hour']: want.append(('land',f'TEMPLATED tpl_almanac · land.year.{k}.{g}','-'))
todo=[w for w in want if w[1] not in appr]
lists={'A1':[w for w in todo if w[0]=='chapter_energy' and w[2] in ('body','mind','expression')],
 'A2':[w for w in todo if w[0]=='chapter_energy' and w[2] in ('action','order')],
 'B1':[w for w in todo if w[0]=='chapter_domain' and w[2] in ('body','mind','expression')],
 'B2':[w for w in todo if w[0]=='chapter_domain' and w[2] in ('action','order')],
 'C':[w for w in todo if w[0] in ('decade_energy','decade_now','manual','ground')],
 'D':[w for w in todo if w[0]=='favours'],
 'E':[w for w in todo if w[0] in ('year_energy','land')]}
for n,l in lists.items():
  json.dump({'writer':n,'units':[{'key':k,'kind':kd} for kd,k,_ in l]},open(f'worklist-{n}.json','w'),ensure_ascii=False,indent=1)
print(len(want),'planned',len(appr),'approved',{n:len(l) for n,l in lists.items()})
