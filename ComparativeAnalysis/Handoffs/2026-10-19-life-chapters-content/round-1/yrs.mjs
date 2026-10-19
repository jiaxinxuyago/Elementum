const R='/home/user/Elementum/Elementum_App/src/';
const { calculateBaziChart } = await import(R+'engine/calculator.js');
const { buildEnergyChart } = await import(R+'engine/buildEnergyChart.js');
const { buildJourneyModel } = await import(R+'components/journey/journeyData.js');
const { STEM_CARD_DATA } = await import(R+'content/index.js');
const { flowYears } = await import(R+'engine/depth/index.js');
const { decadePole } = await import(R+'components/reading/domainsResolve.js');
const SE={甲:'wood',乙:'wood',丙:'fire',丁:'fire',戊:'earth',己:'earth',庚:'metal',辛:'metal',壬:'water',癸:'water'};
const PRI = { 六冲: 5, 刑: 4, 六害: 3, 六合: 2, 半合: 2, 三合: 2, 自刑: 1 };const RANK = { month: 4, day: 3, hour: 2, year: 1 };
for (const [k,b,hu] of [['B',{ year: 1990, month: 9, day: 17, hour: 5, location: 'Beijing', gender: 'male' },false],['C',{ year: 1992, month: 5, day: 25, hour: 12, location: 'Beijing', gender: 'female' },true]]) {
 const chart=calculateBaziChart(b); const ec=buildEnergyChart(chart); const m=buildJourneyModel({chart,ec,identity:{},card:STEM_CARD_DATA[chart.pillars.day.stem]});
 const roles=Object.fromEntries(Object.entries(m.byEl).map(([a,v])=>[a,v.role]));
 console.log(k, JSON.stringify(roles), m.condition);
 for (const y of flowYears(chart,2026,2032,{hourUnknown:hu})) { const bb=y.bonds.map(x=>({...x,g:x.gates.find(g=>RANK[g])})).filter(x=>x.g).sort((a,c)=>(PRI[c.type]-PRI[a.type])||(RANK[c.g]-RANK[a.g]))[0];
  console.log(' ',y.year,y.stem+y.branch,y.god,decadePole(SE[y.stem],roles,m.condition), bb?bb.type+'@'+bb.g+' '+bb.branches:'-'); }
}
