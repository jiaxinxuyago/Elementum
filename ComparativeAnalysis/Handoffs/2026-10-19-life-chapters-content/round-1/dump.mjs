const R='/home/user/Elementum/Elementum_App/src/';
const { calculateBaziChart } = await import(R+'engine/calculator.js');
const { buildEnergyChart } = await import(R+'engine/buildEnergyChart.js');
const { buildJourneyModel } = await import(R+'components/journey/journeyData.js');
const { STEM_CARD_DATA } = await import(R+'content/index.js');
const { resolvePositions } = await import(R+'components/reading/positionsResolve.js');
const { resolveChapters } = await import(R+'components/reading/depthResolve.js');
const CH = { golden: [{ year: 1995, month: 4, day: 29, hour: 18, location: 'Beijing', gender: 'male' }, false],
  B: [{ year: 1990, month: 9, day: 17, hour: 5, location: 'Beijing', gender: 'male' }, false],
  C: [{ year: 1992, month: 5, day: 25, hour: 12, location: 'Beijing', gender: 'female' }, true] };
const out={};
for (const [k,[b,hu]] of Object.entries(CH)) {
  const chart=calculateBaziChart(b); const ec=buildEnergyChart(chart);
  const m=buildJourneyModel({chart,ec,identity:{},card:STEM_CARD_DATA[chart.pillars.day.stem]});
  const pos=resolvePositions(chart,hu);
  const L=resolveChapters(chart,pos,{hourUnknown:hu,condition:m.condition,roles:Object.fromEntries(Object.entries(m.byEl).map(([a,v])=>[a,v.role])),year:2026});
  out[k]={condition:m.condition, archetype:m.archetype, pillars:Object.values(chart.pillars).map(p=>p.stem+p.branch).join(' '), claim:L.claim.text, age:L.age, strip:L.strip,
   chapters:L.chapters.map(c=>({name:c.name,span:c.span,status:c.status,closed:c.closed,fromYear:c.fromYear,domains:c.domains,
     seats:c.seats.map(p=>`${p.persona} ${p.kind} ${p.id}`),
     parts:c.parts.map(p=>({key:p.key,draft:p.draft,text:p.text})),
     decades:c.decades.map(d=>({label:d.label,key:d.key,draft:d.draft,text:d.text}))})),
   years:L.years.map(y=>({year:y.year,persona:y.persona,status:y.status,pole:y.pole,key:y.key,draft:y.draft,text:y.text,bond:y.bond&&{label:y.bond.label,key:y.bond.key,draft:y.bond.draft,text:y.bond.text}}))};
}
console.log(JSON.stringify(out,null,1));
