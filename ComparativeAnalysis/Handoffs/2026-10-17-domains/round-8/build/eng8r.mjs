const S='/tmp/claude-0/-home-user-Elementum/897393f2-6618-542b-92a1-23f079c1450a/scratchpad';
const E='/home/user/Elementum/ComparativeAnalysis/Handoffs/2026-10-17-domains/round-8/engine/';
const fs=(await import('node:fs')).default;
const c=await import('/home/user/Elementum/Elementum_App/src/engine/calculator.js'); const st=await import(E+'stars.js'); const se=await import(E+'season.js');
const P={比肩:'Twin',劫财:'Rival',食神:'Artisan',伤官:'Virtuoso',偏财:'Horizon',正财:'Steward',七杀:'General',正官:'Magistrate',偏印:'Alchemist',正印:'Sage'};
const GN={year:'Year',month:'Month',day:'Day',hour:'Hour'}; const STATE={shown:'on show',rooted:'inside a branch',hidden:'hidden deep',absent:'absent'};
const HS='甲乙丙丁戊己庚辛壬癸',EB='子丑寅卯辰巳午未申酉戌亥';const fy=y=>({stem:HS[(y-4)%10],branch:EB[(y-4)%12]});
const charts={golden:[{year:1995,month:4,day:29,hour:18,location:'Beijing',gender:'male'},false],B:[{year:1990,month:9,day:17,hour:5,location:'Beijing',gender:'male'},false],C:[{year:1992,month:5,day:25,hour:12,location:'Beijing',gender:'female'},true]};
const out={season:{name:'Season',zh:'调候',rule:'穷通宝鉴, all 120 cells. For the Day Master in its birth month: the stems the season asks for, first and second, and the stems it avoids. Each is read against the chart: on show, inside a branch, hidden deep, or absent. The text’s conditional stems keep their condition.'},
 stars:{name:'Stars',zh:'神煞',rule:'19 stars from 三命通会, 五行精纪, 渊海子平, 神峰通考 and 协纪辨方书, on their common bases: the day stem for the stem stars, the year and day branches for the group stars, the year branch for the Phoenix and Lonely pairs, the month branch for the Virtues, the day pillar for the Void and the Dipper Star.'},
 arriving:{name:'Stars arriving',zh:'运岁神煞',rule:'The same rules, read against each decade’s and each year’s pillar. A star already in the chart is not repeated.'}};
for(const [k,[b,hu]] of Object.entries(charts)){const ch=c.calculateBaziChart(b);
 const x=se.seasonOf(ch,{hourUnknown:hu});
 out.season[k]=`<b>${x.monthName}${x.dm}.</b> Asks for ${x.asks.map(a=>`${a.stem} (${P[a.god]}, ${STATE[a.state]})`).join(', ')}${x.avoid.length?`. Avoids ${x.avoid.map(a=>`${a.stem} (${STATE[a.state]})`).join(', ')}`:''}.${x.conditional.length&&k==='B'?' Born before 秋分, so 癸 leads.':''}`;
 const ns=st.starsOf(ch,{hourUnknown:hu}); const by={};for(const s of ns)(by[s.en]||=[]).push(GN[s.gate]);
 out.stars[k]=`${ns.length?Object.entries(by).map(([n,g])=>`${n} (${g.join(', ')})`).join(', '):'none'}.`;
 const cur=ch.luckPillars.find(l=>l.isCurrent), nxt=ch.luckPillars[ch.luckPillars.indexOf(cur)+1];
 const dec=[cur,nxt].map(l=>{const a=st.arrivingStars(ch,l).filter(s=>!s.natal);return a.length?`${l.startYear}–${l.endYear}: ${a.map(s=>s.en).join(', ')}`:null}).filter(Boolean);
 const yrs=[];for(let y=2026;y<=2032;y++){const a=st.arrivingStars(ch,fy(y)).filter(s=>!s.natal);if(a.length)yrs.push(`${y} ${a.map(s=>s.en).join(', ')}`)}
 out.arriving[k]=`Decades: ${dec.join('; ')||'none'}. Years: ${yrs.slice(0,4).join('; ')}${yrs.length>4?'…':''}.`;
}
out.fixes=['<b>Round 5 holds.</b> The sourced rules give the golden chart the same six stars, plus the Void on 2026 and 2027. A draft star, the Taiji Nobleman, is left out because none of the five classics in the research gives it a table (W8).'];
out.notes=[
 '<b>Where the classics disagree (owner I1: follow every text, note the differences).</b> The research files hold every quote and every variant: <span class="src">research/shensha-rules.json</span> and <span class="src">research/qiongtong-tiaohou.json</span>. The ones that change a reading:',
 '<b>Nobleman and Scholar’s Star base.</b> 三命通会 and 五行精纪 key them to the year stem. 子平 practice and most apps use the day stem. The day stem is the default here (W7).',
 '<b>The Nobleman for 庚.</b> The majority verse gives 丑未, attested on Han bamboo slips. A minority verse (神峰通考, a 渊海子平 gloss) gives 寅午. The majority is the default.',
 '<b>The Ram’s Edge for yin stems.</b> 子平 gives it to the yang stems only, and that is the default. An older rule gives the yin stems one too. A modern rule found in apps has no classical source.',
 '<b>Heavenly Joy.</b> The modern rule (opposite the Red Phoenix) is used. 三命通会 also has a season-based Heavenly Joy that gives different results.',
 '<b>A star on its own base.</b> The classics say a star is “seen” in the other pillars. The calculator never lets a base light its own seat (a 午 year is not its own Commander Star). Apps differ (W14).',
 '<b>The season table.</b> 36 of the 120 cells differ between editions, 18 of them in substance. Most of the substantive ones are the summary table that apps copy, which reorders the text’s stems or folds its conditional stems in. The default follows the text (W15). The golden cell 三月庚金 differs only in a transcription slip.',
 '<b>Two texts were only partly reachable.</b> 星平会海 (cited second-hand) and 渊海子平 (no stand-alone 神煞 chapter online). No print edition was checked.'];
out.starCount='19'; out.starReadings='about 140'; out.starArrDec='38'; out.starArrYr='19';
out.w7=[['A','The day stem, as in 子平 practice and most apps. Golden: the Nobleman arrives with 2023–2032 and in 2027.'],['B','The day stem and the year stem, as in 三命通会. Golden adds the 2033–2042 decade and the years 2028 and 2032.']];
out.w8=[['A','The 19 sourced stars, the Void included, the Taiji Nobleman left out.'],['B','Add the Taiji Nobleman and the Heavenly Doctor, from later manuals.']];
out.w11=[['A','One season reading per Day Master and month, written once (120 units), plus 30 lines on how the chart holds each need. A need that is absent joins the Missing line, as shown.'],['B','Compose the season reading from a frame line and the classical reason, plus the same 30 lines.']];
fs.writeFileSync(S+'/eng8-research.json',JSON.stringify(out,null,1)); console.log(JSON.stringify(out,null,1).slice(0,2200));
