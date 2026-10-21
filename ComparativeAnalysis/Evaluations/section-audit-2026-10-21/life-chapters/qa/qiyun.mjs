// Classical start age (起运): days from birth to the next (forward) or previous (backward) 节, three days to a year
// (渊海子平 / 三命通会: 三日为一岁, 一日为四月, 一时辰为十日). Compared with the calculator's luckPillars.
const R='/home/user/Elementum/Elementum_App/src/';
const { calculateBaziChart, HS, STEM_YIN } = await import(R+'engine/calculator.js');
const { termInstant } = await import(R+'engine/almanac/solarTerms.js');
let n=0, diffAge=0, diffYear=0, big=0, ex=[]; const hist={};
let seed=7; const rnd=()=>{seed=(seed*1103515245+12345)%2147483648; return seed/2147483648;};
const near={}; for (let r=0;r<3000;r++) { const y=1950+Math.floor(rnd()*58), mo=1+Math.floor(rnd()*12), d=1+Math.floor(rnd()*28), h=Math.floor(rnd()*24); const g=rnd()<.5?'male':'female'; {
  const ch=calculateBaziChart({year:y,month:mo,day:d,hour:h,location:'Beijing',gender:g}); n++;
  const lp=ch.luckPillars[0]; const yearStem=ch.pillars.year.stem;
  const yang = (HS.indexOf(yearStem)%2)===0; const fwd=(g==='male'&&yang)||(g==='female'&&!yang);
  const birth=Date.UTC(y,mo-1,d,h-8,0); // Beijing time
  const terms=[]; for (const yy of [y-1,y,y+1]) for (let i=0;i<12;i++) terms.push(termInstant(yy,i)); terms.sort((a,b)=>a-b);
  const t = fwd ? terms.find(x=>x>birth) : [...terms].reverse().find(x=>x<=birth);
  const days=Math.abs(t-birth)/86400000; const exact=days/3; const classical=Math.max(1,Math.round(exact));
  const k=lp.startAge-classical; hist[k]=(hist[k]||0)+1; const nearTerm=terms.some(x=>Math.abs(x-birth)<2*86400000); if(Math.abs(k)>=5){ const key=(fwd?'fwd':'back')+' m'+mo+(nearTerm?' nearTerm':''); near[key]=(near[key]||0)+1; }
  if (k!==0){ diffAge++; if(ex.length<6) ex.push(`${y}-${mo}-${d} ${h}h ${g}: app ${lp.startAge}, exact ${exact.toFixed(2)} years`); }
  // the decade change year: birth + exact years vs app startYear
  const handover=new Date(birth+exact*365.2422*86400000).getUTCFullYear(); if (handover!==lp.startYear) diffYear++;
}
}
console.log({nearTermOfBigDiffs:near, charts:n, startAgeDiffers:diffAge, hist, startYearDiffersFromExactHandover:diffYear}); console.log(ex.join('\n'));
