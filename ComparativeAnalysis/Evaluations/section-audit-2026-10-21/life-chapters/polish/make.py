# Builds the polish round (owner 2026-11-14: M1-M9 A, MINOR A): base.json (the current corpus with kinds),
# the worklists with each unit's audit findings, and the new keys the rulings add.
import json, glob, re
H='/home/user/Elementum/ComparativeAnalysis/Prompts/out/handoff/2026-10-21-chapters-energy/'
A='/home/user/Elementum/ComparativeAnalysis/Evaluations/section-audit-2026-10-21/life-chapters/'
st=json.load(open('/home/user/Elementum/Reading/Database/templates/by_axis/json/TEMPLATED/tpl_chapters.json'))['candidates']['units']
kind={}
for f in [H+'approved.json']+sorted(glob.glob(H+'out-*.json')):
  for u in json.load(open(f))['units']: kind[u['key']]=u['kind']
base=[{'key':k,'kind':kind[k],'text':t} for k,t in st.items()]
json.dump({'units':base},open('base.json','w'),ensure_ascii=False,indent=1)
F=json.load(open(A+'findings.json'))['findings']
notes={}
for x in F:
  if x['severity'] in ('MINOR','MAJOR') and x['key']:
    notes.setdefault(x['key'],[]).append({'id':x['id'],'severity':x['severity'],'issue':x['issue'],'proposed':x['fix']})
FN=['body','mind','expression','action','order']; DIRS=['grow','release']
new=[]
for rel in ['feeds','drains','matches','presses','resists']:
  for d in DIRS:
    new.append(('ground',f'TEMPLATED tpl_chapters · ground.{rel}.{d}')); new.append(('ground',f'TEMPLATED tpl_chapters · ground.{rel}.{d}.lived'))
for f in FN:
  for d in DIRS:
    new.append(('decade_now',f'ENERGY {f} · decade.{d}.late.now'))
    for t in ['lived','coming']:
      for v in 'ab': new.append(('decade_energy',f'ENERGY {f} · decade.{d}.late.{t}.{v}'))
for k in ['bind','clash','punish','harm','frame','repeat']:
  for g in ['year','month']: new.append(('land',f'TEMPLATED tpl_almanac · land.year.{k}.{g}.late'))
for f in ['mind','expression','action','order']:
  new.append(('year_energy',f'ENERGY {f} · year.even')); new.append(('year_energy',f'ENERGY {f} · year.even.b'))
new.append(('year_energy','ENERGY body · year.core_even')); new.append(('year_energy','ENERGY body · year.core_even.b'))
def item(u): return {'key':u['key'],'kind':u['kind'],'current':u['text'],'findings':notes.get(u['key'],[])}
def W(name, pred_base, pred_new):
  units=[item(u) for u in base if pred_base(u)]+[{'key':k,'kind':kd,'current':None,'findings':[]} for kd,k in new if pred_new(kd,k)]
  json.dump({'writer':name,'units':units},open(f'worklist-{name}.json','w'),ensure_ascii=False,indent=1); return len(units)
fnof=lambda k:(re.match(r'ENERGY (\w+)',k) or [None,None])[1]
n={}
n['P1']=W('P1',lambda u:u['kind']=='chapter_energy' and fnof(u['key']) in ('body','mind','expression'),lambda kd,k:False)
n['P2']=W('P2',lambda u:u['kind']=='chapter_energy' and fnof(u['key']) in ('action','order'),lambda kd,k:False)
n['P3']=W('P3',lambda u:u['kind']=='chapter_domain',lambda kd,k:False)
n['P4']=W('P4',lambda u:u['kind'] in ('favours','manual'),lambda kd,k:False)
n['P5']=W('P5',lambda u:u['kind'] in ('decade_energy','decade_now'),lambda kd,k:kd in ('decade_energy','decade_now'))
n['P6']=W('P6',lambda u:u['kind'] in ('ground','year_energy','land') and not re.search(r'ground\.\w+\.lived$',u['key']),lambda kd,k:kd in ('ground','year_energy','land'))
print(len(base),'base;',len(new),'new;',n, 'findings on keys:',len(notes))
