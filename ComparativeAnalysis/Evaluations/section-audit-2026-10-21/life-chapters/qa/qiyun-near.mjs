// M1 follow-up (2026-11-14, EXACT_TERMS on): the charts whose start age still differs by 5+ years. Prints how far the
// birth sits from the nearest 节 and whether the calculator's month pillar agrees with the term side.
const R='/home/user/Elementum/Elementum_App/src/';
const { calculateBaziChart, HS } = await import(R+'engine/calculator.js');
const { termInstant } = await import(R+'engine/almanac/solarTerms.js');
let seed=7; const rnd=()=>{seed=(seed*1103515245+12345)%2147483648; return seed/2147483648;};
const hrs=[]; let big=0;
for (let r=0;r<3000;r++) { const y=1950+Math.floor(rnd()*58), mo=1+Math.floor(rnd()*12), d=1+Math.floor(rnd()*28), h=Math.floor(rnd()*24); const g=rnd()<.5?'male':'female';
  const ch=calculateBaziChart({year:y,month:mo,day:d,hour:h,location:'Beijing',gender:g}); const lp=ch.luckPillars[0];
  const yang=(HS.indexOf(ch.pillars.year.stem)%2)===0; const fwd=(g==='male'&&yang)||(g==='female'&&!yang);
  const birth=Date.UTC(y,mo-1,d,h-8,0); const terms=[]; for (const yy of [y-1,y,y+1]) for (let i=0;i<12;i++) terms.push(termInstant(yy,i)); terms.sort((a,b)=>a-b);
  const t=fwd?terms.find(x=>x>birth):[...terms].reverse().find(x=>x<=birth); const exact=Math.abs(t-birth)/86400000/3;
  if (Math.abs(lp.startAge-Math.max(1,Math.round(exact)))>=5) { big++; const dist=Math.min(...terms.map(x=>Math.abs(x-birth)))/3600000; hrs.push(dist);
    if (big<=8) console.log(`${y}-${mo}-${d} ${h}h ${g} ${fwd?'fwd':'back'}: app ${lp.startAge}, exact ${exact.toFixed(2)}, nearest 节 ${dist.toFixed(1)} h away`); } }
hrs.sort((a,b)=>a-b); console.log({ big, within1h: hrs.filter(x=>x<1).length, within3h: hrs.filter(x=>x<3).length, within24h: hrs.filter(x=>x<24).length, max: hrs.at(-1)?.toFixed(1) });
