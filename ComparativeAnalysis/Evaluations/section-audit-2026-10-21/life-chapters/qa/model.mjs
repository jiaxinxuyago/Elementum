const R='/home/user/Elementum/Elementum_App/src/';
const { calculateBaziChart } = await import(R+'engine/calculator.js');
const { buildEnergyChart } = await import(R+'engine/buildEnergyChart.js');
const { buildJourneyModel } = await import(R+'components/journey/journeyData.js');
const { STEM_CARD_DATA } = await import(R+'content/index.js');
const { resolvePositions } = await import(R+'components/reading/positionsResolve.js');
const { resolveEnergyChapters } = await import(R+'components/reading/chaptersResolve.js');
const CH = { golden: [{ year: 1995, month: 4, day: 29, hour: 18, location: 'Beijing', gender: 'male' }, false],
  B: [{ year: 1990, month: 9, day: 17, hour: 5, location: 'Beijing', gender: 'male' }, false],
  C: [{ year: 1992, month: 5, day: 25, hour: 12, location: 'Beijing', gender: 'female' }, true] };
const which = process.argv[2];
let drafts=0, total=0, errs=0;
const walk=(o)=>{ if(o&&typeof o==='object'){ if('draft' in o && 'text' in o){ total++; if(o.draft) { drafts++; if(!which) console.log('DRAFT', o.key);} } for(const v of Object.values(o)) walk(v);} };
const run=(b,hu)=>{ const chart=calculateBaziChart(b); const ec=buildEnergyChart(chart); const m=buildJourneyModel({chart,ec,identity:{},card:STEM_CARD_DATA[chart.pillars.day.stem]}); const pos=resolvePositions(chart,hu);
  return resolveEnergyChapters(chart,pos,{hourUnknown:hu,condition:m.condition,roles:Object.fromEntries(Object.entries(m.byEl).map(([a,v])=>[a,v.role])),year:2026}); };
if (which) { const L=run(...CH[which]); console.log(L.claim.text); for (const c of L.chapters) { console.log('\n##',c.name,c.status, c.energy?`${c.energy.el}/${c.energy.fn}/${c.energy.dir} lift ${c.energy.lift.word}`:'closed');
  if(c.energyU) console.log(' E:',c.energyU.text); if(c.groundU) console.log(' G:',c.groundU.text); for(const l of c.lines||[]) console.log(' D',l.domain+':',l.text); if(c.manual) console.log(' M:',c.manual.text,'| seek',c.manual.seek.map(s=>s.el).join(','),'|',c.manual.brings);
  for(const d of c.decades){ console.log('  dec',d.label,'|',d.text); if(d.ground) console.log('   g:',d.ground.text); if(d.favours) console.log('   fav:',d.favours.map(f=>`${f.domain}: ${f.lean} > ${f.over}`).join(' ; ')); } }
  for(const y of L.years) console.log(' yr',y.year,y.el,y.fn,y.state,y.lift.word,'|',y.text,'||',y.land?.label,'|',y.land?.text,'| stars',y.stars.map(s=>s.en).join(','),y.newDecade?'NEW '+y.newDecade:'');
  console.log('lived', L.lived.map(y=>y.year+y.el).join(' ')); }
else {
  for (const [k,[b,hu]] of Object.entries(CH)) walk(run(b,hu));
  let n=0; for (let y=1950;y<2010;y++) for (const [mo,h] of [[1,3],[4,9],[7,15],[10,21]]) { for (const hu of [false,true]) { try { walk(run({year:y,month:mo,day:1+(y*7+mo)%27,hour:h,location:'Beijing',gender:y%2?'male':'female'},hu)); n++; } catch(e) { errs++; if (errs<4) console.log('ERR',y,mo,e.message); } } }
  console.log({charts:n, errs, total, drafts});
}
