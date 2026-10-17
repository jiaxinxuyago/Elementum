const A='/home/user/Elementum/Elementum_App/src/';
const { calculateBaziChart } = await import(A+'engine/calculator.js');
const { buildEnergyChart } = await import(A+'engine/buildEnergyChart.js');
const { buildJourneyModel } = await import(A+'components/journey/journeyData.js');
const { STEM_CARD_DATA } = await import(A+'content/index.js');
const { resolvePositions } = await import(A+'components/reading/positionsResolve.js');
const { resolveDomains } = await import(A+'components/reading/domainsResolve.js');
const fs=(await import('node:fs')).default;
const content=JSON.parse(fs.readFileSync('/home/user/Elementum/ComparativeAnalysis/Prompts/out/handoff/2026-10-17-domains-template/template.json','utf8'));
export function compose(c,hu){const chart=calculateBaziChart(c);const ec=buildEnergyChart(chart);const m=buildJourneyModel({chart,ec,identity:{},card:STEM_CARD_DATA[chart.pillars.day.stem]});
 const roles=Object.fromEntries(Object.entries(m.byEl).map(([k,v])=>[k,v.role]));const pos=resolvePositions(chart,hu);
 return {m,pos,r:resolveDomains(chart,pos,content,{hourUnknown:hu,roles,condition:m.condition,year:2026})};}
if(process.argv[2]==='print'){const {r}=compose({year:1995,month:4,day:29,hour:18,location:'Beijing',gender:'male'},false);
 console.log('age',r.age,r.birthYear);for(const p of r.pages){console.log('\n###',p.domain,'|',p.count,'|',p.headline,'| lead',p.lead?.term);console.log('HOW:',p.how);if(p.pattern)console.log('PAT:',p.pattern.text);
 for(const b of p.past)console.log(' PAST',b.label,'|',b.lead||'',b.text.slice(0,70));for(const b of p.future)console.log(' FUT',b.label,'|',b.lead||'',b.text.slice(0,70));for(const n of p.notes)console.log(' NOTE',n);}}
