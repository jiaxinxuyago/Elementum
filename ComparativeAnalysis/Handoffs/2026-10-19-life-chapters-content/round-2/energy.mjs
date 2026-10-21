const R='/home/user/Elementum/Elementum_App/src/';
const { calculateBaziChart, STEM_ELEM, BRANCH_ELEM, getTenGod, HIDDEN_STEMS } = await import(R+'engine/calculator.js');
const A = await import(R+'engine/almanac/index.js');
const { flowYears, branchBonds } = await import(R+'engine/depth/index.js');
const CH = { golden: [{ year: 1995, month: 4, day: 29, hour: 18, location: 'Beijing', gender: 'male' }, false],
  B: [{ year: 1990, month: 9, day: 17, hour: 5, location: 'Beijing', gender: 'male' }, false],
  C: [{ year: 1992, month: 5, day: 25, hour: 12, location: 'Beijing', gender: 'female' }, true] };
const FN = { self: 'Body', seal: 'Mind', output: 'Expression', wealth: 'Action', officer: 'Order' };
const GSTART={year:0,month:16,day:35,hour:48}, GEND={year:15,month:34,day:47,hour:200};
const CHN={year:'Early',month:'Rising',day:'Home',hour:'Late'};
const NOW=2026; const out={};
const mainHidden = (b) => (HIDDEN_STEMS[b]||[]).slice().sort((x,y)=>y.w-x.w)[0]?.s;
for (const [k,[b,hu]] of Object.entries(CH)) {
  const chart=calculateBaziChart(b); const ctx=A.almanacContext(chart,{hourUnknown:hu});
  const dm=chart.pillars.day.stem; const age=NOW-ctx.birthYear;
  const fnOf=(stem)=>FN[getTenGod(dm,stem)?.family]; const dir=(el)=>ctx.sign[el]>0?'grow':ctx.sign[el]<0?'release':'even';
  const read=(stem,branch,gate)=>{ const hs=mainHidden(branch); const el=stem?STEM_ELEM[stem]:STEM_ELEM[hs]; const gEl=BRANCH_ELEM[branch];
    const mix=A.energyMix(stem||hs,branch); const lift=A.liftOf(ctx,mix);
    const god=getTenGod(dm,stem||hs)?.zh; const ggod=getTenGod(dm,hs)?.zh;
    const w={}; for (const d of A.DOMAINS) w[d]=0; for (const d of A.RULING[god]||[]) w[d]+=2; if(stem) for (const d of A.RULING[ggod]||[]) w[d]+=1; if (gate) w[A.GATE_DOMAIN[gate]]+=1;
    return { el, fn:fnOf(stem||hs), dir:dir(el), state:A.energyState(ctx,el), ground: stem? {el:gEl, fn:fnOf(hs), dir:dir(STEM_ELEM[hs]), rel:A.groundRelation(el,gEl)}:null, lift, domains:Object.entries(w).filter(([,v])=>v>0).sort((a,c)=>c[1]-a[1]) }; };
  const chapters = A.GATE_KEYS.map(g=>{ const p=chart.pillars[g]; const closed=hu&&g==='hour';
    const tense= age<GSTART[g]?'coming':age<=GEND[g]?'now':'lived';
    return { g, name:CHN[g]+' Chapter', tense, closed, pillar:p.stem+p.branch, ...(closed?{}:read(g==='day'?null:p.stem,p.branch,g)) }; });
  const decades = chart.luckPillars.filter(l=>l.startAge<=75).map(l=>({ start:l.startYear, end:l.startYear+9, age:l.startAge, pillar:l.stem+l.branch, tense: l.startAge+9<age?'lived':l.startAge<=age?'now':'coming', ...read(l.stem,l.branch,null) }));
  const cur = chart.luckPillars.find(l=>l.startAge<=age&&age<=l.startAge+9);
  const years = flowYears(chart, NOW, NOW+5, {hourUnknown:hu}).map(y=>({year:y.year, pillar:y.stem+y.branch, ...read(y.stem,y.branch,null), bonds:y.bonds.map(x=>x.type+'@'+x.gates.join('/')).join(' ')}));
  out[k]={age, dm, dmEl:STEM_ELEM[dm], condition:ctx.condition, sign:ctx.sign, presence:ctx.presence, fn:ctx.fn, chapters, decades, years};
}
console.log(JSON.stringify(out,null,1));
