// ===================================================================
// ELEMENTUM · BaZi Calculation Engine
// Extracted verbatim from Code/Elementum_Engine.jsx (lines 1585–2103
// + getEnergyBand at 4084). Pure JavaScript — no React dependencies.
// Input: { year, month, day, hour, gender, location }
// Output: Canonical JSON chart per DOC1 §4.
// ===================================================================

// ---------- Heavenly Stems / Earthly Branches / element maps ----------
export const HS = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
export const EB = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
export const STEM_ELEM   = {甲:"Wood",乙:"Wood",丙:"Fire",丁:"Fire",戊:"Earth",己:"Earth",庚:"Metal",辛:"Metal",壬:"Water",癸:"Water"};
export const BRANCH_ELEM = {子:"Water",丑:"Earth",寅:"Wood",卯:"Wood",辰:"Earth",巳:"Fire",午:"Fire",未:"Earth",申:"Metal",酉:"Metal",戌:"Earth",亥:"Water"};
export const STEM_YIN    = {甲:0,乙:1,丙:0,丁:1,戊:0,己:1,庚:0,辛:1,壬:0,癸:1};
export const BRANCH_YIN  = {子:0,丑:1,寅:0,卯:1,辰:0,巳:1,午:0,未:1,申:0,酉:1,戌:0,亥:1};
export const SOLAR_TERMS = [[1,6],[2,4],[3,6],[4,5],[5,6],[6,6],[7,7],[8,7],[9,8],[10,8],[11,7],[12,7]];

export function getSolarTermDate(year, idx) {
  const [m, d] = SOLAR_TERMS[idx];
  const offset = year - 2000;
  const corr = offset * 0.2422 - Math.floor((offset + 1) / 4);
  return new Date(year, m - 1, Math.floor(d + corr));
}
export function getSolarMonthIndex(date) {
  const y = date.getFullYear(); let idx = 0;
  for (let i = 0; i < 12; i++) if (date >= getSolarTermDate(y, i)) idx = i;
  return idx;
}
export function getBaziYear(date) {
  const y = date.getFullYear();
  return date < getSolarTermDate(y, 1) ? y - 1 : y;
}
export function getTenGod(dmStem, targetStem) {
  const dmEl = STEM_ELEM[dmStem], tEl = STEM_ELEM[targetStem];
  const same = STEM_YIN[dmStem] === STEM_YIN[targetStem];
  const GEN = {Wood:"Fire",Fire:"Earth",Earth:"Metal",Metal:"Water",Water:"Wood"};
  const CTL = {Wood:"Earth",Fire:"Metal",Earth:"Water",Metal:"Wood",Water:"Fire"};
  if (dmEl===tEl) return same ? {zh:"比肩",en:"Parallel Self",family:"self"} : {zh:"劫财",en:"Rob Wealth",family:"self"};
  if (GEN[dmEl]===tEl) return same ? {zh:"食神",en:"Food God",family:"output"} : {zh:"伤官",en:"Hurt Officer",family:"output"};
  if (GEN[tEl]===dmEl) return same ? {zh:"偏印",en:"Indirect Seal",family:"seal"} : {zh:"正印",en:"Direct Seal",family:"seal"};
  if (CTL[dmEl]===tEl) return same ? {zh:"偏财",en:"Indirect Wealth",family:"wealth"} : {zh:"正财",en:"Direct Wealth",family:"wealth"};
  if (CTL[tEl]===dmEl) return same ? {zh:"七杀",en:"Seven Killings",family:"officer"} : {zh:"正官",en:"Direct Officer",family:"officer"};
  return {zh:"—",en:"—",family:"none"};
}

// ── HYBRID ELEMENT CALCULATION — Method C + D with Method B modifier ─────────
// Documented in DOC1 §3. Sources: 子平真诠 · 黄景泓打分法 · 藏干理论 · 穷通宝鉴.

// Method D — 藏干 Hidden Stems
export const HIDDEN_STEMS = {
  "子":[{s:"癸",e:"Water",w:1.0}],
  "丑":[{s:"己",e:"Earth",w:0.6},{s:"癸",e:"Water",w:0.3},{s:"辛",e:"Metal",w:0.1}],
  "寅":[{s:"甲",e:"Wood", w:0.6},{s:"丙",e:"Fire", w:0.3},{s:"戊",e:"Earth",w:0.1}],
  "卯":[{s:"乙",e:"Wood", w:1.0}],
  "辰":[{s:"戊",e:"Earth",w:0.6},{s:"乙",e:"Wood", w:0.3},{s:"癸",e:"Water",w:0.1}],
  "巳":[{s:"丙",e:"Fire", w:0.6},{s:"庚",e:"Metal",w:0.3},{s:"戊",e:"Earth",w:0.1}],
  "午":[{s:"丁",e:"Fire", w:0.7},{s:"己",e:"Earth",w:0.3}],
  "未":[{s:"己",e:"Earth",w:0.6},{s:"丁",e:"Fire", w:0.3},{s:"乙",e:"Wood", w:0.1}],
  "申":[{s:"庚",e:"Metal",w:0.6},{s:"壬",e:"Water",w:0.3},{s:"戊",e:"Earth",w:0.1}],
  "酉":[{s:"辛",e:"Metal",w:1.0}],
  "戌":[{s:"戊",e:"Earth",w:0.6},{s:"辛",e:"Metal",w:0.3},{s:"丁",e:"Fire", w:0.1}],
  "亥":[{s:"壬",e:"Water",w:0.7},{s:"甲",e:"Wood", w:0.3}],
};

// Method B — 12-branch seasonal phase multipliers
export const SEASONAL_PHASE = {
  "寅":{Wood:1.3,Fire:1.1,Earth:0.6,Metal:0.7,Water:0.9},
  "卯":{Wood:1.3,Fire:1.1,Earth:0.6,Metal:0.7,Water:0.9},
  "辰":{Wood:0.8,Fire:0.9,Earth:1.3,Metal:1.1,Water:0.8},
  "巳":{Wood:0.9,Fire:1.3,Earth:1.1,Metal:0.6,Water:0.7},
  "午":{Wood:0.9,Fire:1.3,Earth:1.1,Metal:0.6,Water:0.7},
  "未":{Wood:0.7,Fire:1.0,Earth:1.3,Metal:0.9,Water:0.6},
  "申":{Wood:0.6,Fire:0.7,Earth:0.9,Metal:1.3,Water:1.1},
  "酉":{Wood:0.6,Fire:0.7,Earth:0.9,Metal:1.3,Water:1.1},
  "戌":{Wood:0.6,Fire:0.8,Earth:1.3,Metal:1.2,Water:0.8},
  "亥":{Wood:1.1,Fire:0.6,Earth:0.7,Metal:0.9,Water:1.3},
  "子":{Wood:1.1,Fire:0.6,Earth:0.7,Metal:0.9,Water:1.3},
  "丑":{Wood:0.9,Fire:0.6,Earth:1.3,Metal:1.0,Water:0.9},
};

// Method C — Position weights
export const POS_WEIGHTS = {yearStem:0.05,yearBranch:0.05,monthStem:0.15,monthBranch:0.40,dayBranch:0.20,hourStem:0.10,hourBranch:0.05};

export function getRootMod(stemEl, pillars, pillarKey) {
  const branchMap = {yearBranch:pillars.year.branch,monthBranch:pillars.month.branch,dayBranch:pillars.day.branch,hourBranch:pillars.hour.branch};
  const samePillar = {yearStem:"yearBranch",monthStem:"monthBranch",hourStem:"hourBranch"};
  let hasRoot=false, samePillarRoot=false;
  for (const [bKey,branch] of Object.entries(branchMap)) {
    const hidden = HIDDEN_STEMS[branch]||[];
    if (hidden.some(h=>h.e===stemEl)) {
      hasRoot=true;
      if (samePillar[pillarKey]===bKey) samePillarRoot=true;
    }
  }
  return samePillarRoot?1.30:hasRoot?1.15:0.85;
}

export function computeElementComposition(pillars) {
  const phase = SEASONAL_PHASE[pillars.month.branch] || SEASONAL_PHASE["辰"];
  const posContrib = {};
  const raw = {Metal:0, Wood:0, Fire:0, Earth:0, Water:0};

  const stemPos = [
    {key:"yearStem",  stem:pillars.year.stem,   w:POS_WEIGHTS.yearStem},
    {key:"monthStem", stem:pillars.month.stem,  w:POS_WEIGHTS.monthStem},
    {key:"hourStem",  stem:pillars.hour.stem,   w:POS_WEIGHTS.hourStem},
  ];
  for (const {key,stem,w} of stemPos) {
    const el = STEM_ELEM[stem]; if (!el) continue;
    const score = w * getRootMod(el,pillars,key) * (phase[el]||1);
    posContrib[key] = [{element:el, score}];
    raw[el] += score;
  }

  const branchPos = [
    {key:"yearBranch",  branch:pillars.year.branch,  w:POS_WEIGHTS.yearBranch},
    {key:"monthBranch", branch:pillars.month.branch, w:POS_WEIGHTS.monthBranch},
    {key:"dayBranch",   branch:pillars.day.branch,   w:POS_WEIGHTS.dayBranch},
    {key:"hourBranch",  branch:pillars.hour.branch,  w:POS_WEIGHTS.hourBranch},
  ];
  for (const {key,branch,w} of branchPos) {
    posContrib[key] = [];
    for (const {e,w:hw} of (HIDDEN_STEMS[branch]||[])) {
      const score = w * hw * (phase[e]||1);
      posContrib[key].push({element:e, score});
      raw[e] += score;
    }
  }
  return {raw, posContrib};
}

export function applyBondModifiers(raw, posContrib, pillars, dayStem) {
  const MAIN_QI = {"子":"Water","丑":"Earth","寅":"Wood","卯":"Wood","辰":"Earth","巳":"Fire","午":"Fire","未":"Earth","申":"Metal","酉":"Metal","戌":"Earth","亥":"Water"};
  const monthMQi = MAIN_QI[pillars.month.branch];
  const GEN = {Wood:"Fire",Fire:"Earth",Earth:"Metal",Metal:"Water",Water:"Wood"};
  const dmEl = STEM_ELEM[dayStem];

  const allStems    = [pillars.year.stem,  pillars.month.stem,  dayStem,            pillars.hour.stem];
  const allBranches = [pillars.year.branch,pillars.month.branch,pillars.day.branch, pillars.hour.branch];

  const branchPosKey = b =>
    pillars.year.branch===b?"yearBranch":pillars.month.branch===b?"monthBranch":
    pillars.day.branch===b?"dayBranch":"hourBranch";
  const stemPosKey = s =>
    pillars.year.stem===s?"yearStem":pillars.month.stem===s?"monthStem":"hourStem";

  const adj = {...raw};
  const bondedDMStems = new Set();

  function shift(fromEl, toEl, amount) {
    adj[fromEl] = Math.max(0, (adj[fromEl]||0) - amount);
    adj[toEl]   = (adj[toEl]||0) + amount;
  }

  const STEM_BOND_PAIRS = [
    {s1:"甲",s2:"己",result:"Earth"},{s1:"乙",s2:"庚",result:"Metal"},
    {s1:"丙",s2:"辛",result:"Water"},{s1:"丁",s2:"壬",result:"Wood"},
    {s1:"戊",s2:"癸",result:"Fire"},
  ];
  const SIX_COMBO = [
    {b1:"子",b2:"丑",result:"Earth"},{b1:"寅",b2:"亥",result:"Wood"},
    {b1:"卯",b2:"戌",result:"Fire"},{b1:"辰",b2:"酉",result:"Metal"},
    {b1:"巳",b2:"申",result:"Water"},{b1:"午",b2:"未",result:"Earth"},
  ];
  const THREE_COMBO = [
    {branches:["寅","午","戌"],result:"Fire"},{branches:["申","子","辰"],result:"Water"},
    {branches:["亥","卯","未"],result:"Wood"},{branches:["巳","酉","丑"],result:"Metal"},
  ];

  for (const {s1,s2,result} of STEM_BOND_PAIRS) {
    if (!allStems.includes(s1) || !allStems.includes(s2)) continue;
    const sf = monthMQi === result ? 0.80 : 0.40;
    for (const s of [s1,s2]) {
      if (s === dayStem) continue;
      const contribs = posContrib[stemPosKey(s)] || [];
      for (const c of contribs) {
        if (c.element === result) continue;
        shift(c.element, result, c.score * sf);
      }
      if (result === dmEl || GEN[result] === dmEl) bondedDMStems.add(s);
    }
  }

  for (const {b1,b2,result} of SIX_COMBO) {
    if (!allBranches.includes(b1) || !allBranches.includes(b2)) continue;
    const sf = monthMQi === result ? 0.80 : 0.40;
    for (const b of [b1,b2]) {
      const contribs = posContrib[branchPosKey(b)] || [];
      for (const c of contribs) {
        if (c.element === result) continue;
        shift(c.element, result, c.score * sf);
      }
    }
  }

  for (const {branches,result} of THREE_COMBO) {
    const present = branches.filter(b => allBranches.includes(b));
    if (present.length < 2) continue;
    const sf = present.length === 3
      ? (monthMQi === result ? 0.90 : 0.55)
      : (monthMQi === result ? 0.60 : 0.30);
    for (const b of present) {
      const contribs = posContrib[branchPosKey(b)] || [];
      for (const c of contribs) {
        if (c.element === result) continue;
        shift(c.element, result, c.score * sf);
      }
    }
  }

  return {adj, bondedDMStems};
}

export function computeDMStrength(pillars, dmStem, bondedDMStems = new Set()) {
  const dmEl = STEM_ELEM[dmStem];
  const GEN  = {Wood:"Fire",Fire:"Earth",Earth:"Metal",Metal:"Water",Water:"Wood"};
  const MAIN_QI = {"子":"Water","丑":"Earth","寅":"Wood","卯":"Wood","辰":"Earth","巳":"Fire","午":"Fire","未":"Earth","申":"Metal","酉":"Metal","戌":"Earth","亥":"Water"};
  const monthMainQi = MAIN_QI[pillars.month.branch] || "Earth";
  const gotLing = monthMainQi === dmEl || GEN[monthMainQi] === dmEl;
  const allBranches = [pillars.year.branch,pillars.month.branch,pillars.day.branch,pillars.hour.branch];
  const gotDi = allBranches.some(b=>(HIDDEN_STEMS[b]||[]).some(h=>h.e===dmEl));
  const nonDMStems = [pillars.year.stem,pillars.month.stem,pillars.hour.stem];
  const supporting = nonDMStems.filter(s=>{
    const el = STEM_ELEM[s];
    return el===dmEl || GEN[el]===dmEl || bondedDMStems.has(s);
  });
  const gotShi = supporting.length > (nonDMStems.length - supporting.length);
  const g = (gotLing?4:0)+(gotDi?2:0)+(gotShi?1:0);
  if (g===7) return {strength:"extremely_strong",strengthScore:0.92};
  if (g===6||g===5||g===3) return {strength:"strong",strengthScore:0.72};
  if (g===4) return {strength:"moderate",strengthScore:0.50};
  if (g===2||g===1) return {strength:"weak",strengthScore:0.30};
  return {strength:"extremely_weak",strengthScore:0.12};
}

// ── CATALYST + TG PATTERN ────────────────────────────────────────────────────
export const CATALYST_MAP = {
  Metal: {concentrated:["Fire","Water"], balanced:["Fire","Earth"],  open:["Earth","Metal"]},
  Wood:  {concentrated:["Metal","Fire"], balanced:["Metal","Water"], open:["Water","Wood"]},
  Water: {concentrated:["Earth","Wood"], balanced:["Earth","Metal"], open:["Metal","Water"]},
  Fire:  {concentrated:["Water","Earth"],balanced:["Water","Wood"],  open:["Wood","Fire"]},
  Earth: {concentrated:["Wood","Metal"], balanced:["Wood","Fire"],   open:["Fire","Earth"]},
};

export function getEnergyBand(strength) {
  if (strength === "extremely_strong" || strength === "strong") return "concentrated";
  if (strength === "moderate") return "balanced";
  return "open";
}

export function getDominantElementPolarity(domEl, dmStem, pillars) {
  if (!pillars) return STEM_YIN[dmStem];
  const { year, month, day, hour } = pillars;
  let yangW = 0, yinW = 0;

  const stemSlots = [
    [month?.stem, 3],
    [hour?.stem,  2],
    [year?.stem,  1],
  ];
  for (const [stem, w] of stemSlots) {
    if (stem && STEM_ELEM[stem] === domEl)
      STEM_YIN[stem] === 0 ? (yangW += w) : (yinW += w);
  }

  const branchSlots = [
    [month?.branch, 4],
    [day?.branch,   2],
    [hour?.branch,  1.5],
    [year?.branch,  1],
  ];
  for (const [branch, baseW] of branchSlots) {
    if (!branch || !HIDDEN_STEMS[branch]) continue;
    for (const hs of HIDDEN_STEMS[branch]) {
      if (hs.e === domEl) {
        const w = baseW * hs.w;
        STEM_YIN[hs.s] === 0 ? (yangW += w) : (yinW += w);
      }
    }
  }

  if (yangW === 0 && yinW === 0) return STEM_YIN[dmStem];
  return yangW >= yinW ? 0 : 1;
}

export function computeTgPattern(chart) {
  const dmEl   = chart.dayMaster.element;
  const GEN    = {Wood:"Fire",Fire:"Earth",Earth:"Metal",Metal:"Water",Water:"Wood"};
  const CTL    = {Wood:"Earth",Earth:"Water",Water:"Fire",Fire:"Metal",Metal:"Wood"};

  const sorted = Object.entries(chart.elements)
    .filter(([,d]) => d.present)
    .sort(([,a],[,b]) => (b.score||0) - (a.score||0));
  if (!sorted.length) return "pure";

  const dominant = sorted[0][0];

  if (dominant === dmEl)          return "pure";
  if (GEN[dominant] === dmEl)     return "rooted";
  if (CTL[dmEl]     === dominant) return "forging";
  if (GEN[dmEl]     === dominant) return "flowing";
  if (CTL[dominant] === dmEl)     return "tested";

  return "pure";
}

export function getDominantTenGod(domEl, dmStem, pillars) {
  const dmEl  = STEM_ELEM[dmStem];
  const dmYin = STEM_YIN[dmStem];
  const domYin = getDominantElementPolarity(domEl, dmStem, pillars);
  const same  = dmYin === domYin;
  const GEN   = {Wood:"Fire",Fire:"Earth",Earth:"Metal",Metal:"Water",Water:"Wood"};
  const CTL   = {Wood:"Earth",Earth:"Water",Water:"Fire",Fire:"Metal",Metal:"Wood"};
  if (domEl === dmEl)          return same ? "比肩" : "劫财";
  if (GEN[domEl] === dmEl)     return same ? "偏印" : "正印";
  if (GEN[dmEl]  === domEl)    return same ? "食神" : "伤官";
  if (CTL[dmEl]  === domEl)    return same ? "偏财" : "正财";
  if (CTL[domEl] === dmEl)     return same ? "七杀" : "正官";
  return "比肩";
}

export function getPrimaryCatalyst(chart) {
  const dmEl = chart.dayMaster.element;
  const band = getEnergyBand(chart.dayMaster.strength);
  const [primary, secondary] = CATALYST_MAP[dmEl]?.[band] || ["Fire","Water"];
  return primary === dmEl ? secondary : primary;
}

export function getArchetypeKey(chart) {
  const tgPattern = computeTgPattern(chart);
  const band      = getEnergyBand(chart.dayMaster.strength);
  return `${chart.dayMaster.stem}_${band}_${tgPattern}`;
}

export const TG_PATTERN_LABELS = {
  pure:    "Pure",
  rooted:  "Rooted",
  flowing: "Flowing",
  forging: "Forging",
  tested:  "Tested",
};

// ── MAIN ENTRY POINT ────────────────────────────────────────────────────────
// input: {
//   year, month, day, hour, gender,
//   longitude?: number,      // preferred — from geocoding service
//   location?: string,       // legacy string fallback (well-known cities)
// }
// If neither longitude nor a recognised location string is provided,
// the calc falls back silently to Beijing longitude (120°E) per DOC5 §22.
export function calculateBaziChart(input) {
  const { year, month, day, hour, gender, longitude, location } = input;
  const cityLongitudes = { beijing: 120, shanghai: 121, guangzhou: 113, chengdu: 104, newyork: -74, london: 0, tokyo: 139, paris: 2, sydney: 151 };
  const lon =
    typeof longitude === 'number' && !Number.isNaN(longitude)
      ? longitude
      : (cityLongitudes[location?.toLowerCase?.()] ?? 120);
  const trueSolarHour = (((hour - (lon - 120) / 15) % 24) + 24) % 24;
  const dateForDay = new Date(year, month-1, day, trueSolarHour);
  if (trueSolarHour >= 23) dateForDay.setDate(dateForDay.getDate() + 1);

  const baziYear = getBaziYear(new Date(year, month-1, day));
  const solarMonthIdx = getSolarMonthIndex(new Date(year, month-1, day));
  const ysi = ((baziYear-4)%10+10)%10, ybi = ((baziYear-4)%12+12)%12;
  const yearStem = HS[ysi], yearBranch = EB[ybi];
  const monthBranchIdx = (solarMonthIdx+1)%12;
  const monthBranch = EB[monthBranchIdx];
  const msi = (((ysi%5)*2+2)%10 + solarMonthIdx - 1 + 10) % 10;
  const monthStem = HS[msi];
  const anchor = new Date(1900,0,1);
  const daysElapsed = Math.floor((dateForDay - anchor) / 86400000);
  const dayStem = HS[daysElapsed%10], dayBranch = EB[(daysElapsed+10)%12];
  const hourBranchIdx = Math.floor((trueSolarHour+1)/2)%12;
  const hourBranch = EB[hourBranchIdx];
  const hourStem = HS[(HS.indexOf(dayStem)*2+hourBranchIdx)%10];

  const pillarsObj = {year:{stem:yearStem,branch:yearBranch},month:{stem:monthStem,branch:monthBranch},day:{stem:dayStem,branch:dayBranch},hour:{stem:hourStem,branch:hourBranch}};
  const {raw: rawScores, posContrib} = computeElementComposition(pillarsObj);
  const {adj: bondAdj, bondedDMStems} = applyBondModifiers(rawScores, posContrib, pillarsObj, dayStem);
  const totalRaw = Object.values(bondAdj).reduce((s,v)=>s+v,0)||1;
  const elements = Object.fromEntries(
    Object.entries(bondAdj).map(([el,raw])=>{
      const pct = raw/totalRaw;
      const count = raw > 0.001 ? Math.max(1, Math.round(pct*10)) : 0;
      return [el,{count,score:parseFloat(pct.toFixed(3)),dominant:false,present:raw>0.001}];
    })
  );
  const maxCount = Math.max(...Object.values(elements).map(e=>e.count));
  if (maxCount>0) Object.values(elements).forEach(e=>{ e.dominant = e.count===maxCount; });
  const dmStrengthResult = computeDMStrength(pillarsObj, dayStem, bondedDMStems);
  const { strength, strengthScore } = dmStrengthResult;

  const combinations = [];
  const tgMap = k => ({yearStem:getTenGod(dayStem,yearStem),monthStem:getTenGod(dayStem,monthStem),hourStem:getTenGod(dayStem,hourStem)}[k]);
  const outputCt = ["食神","伤官"].filter(g=>["yearStem","monthStem","hourStem"].some(k=>tgMap(k)?.zh===g)).length;
  const wealthCt  = ["偏财","正财"].filter(g=>["yearStem","monthStem","hourStem"].some(k=>tgMap(k)?.zh===g)).length;
  const officerCt = ["七杀","正官"].filter(g=>["yearStem","monthStem","hourStem"].some(k=>tgMap(k)?.zh===g)).length;
  const patternKey = outputCt>=1&&wealthCt>=1?"output_to_wealth":officerCt>=1?"institutional":"balanced";
  const PATTERNS = {
    output_to_wealth:{name:"食神生财格",en:"Creativity Generates Wealth",family:"output_to_wealth",description:"Creative output is the primary engine of wealth and success"},
    institutional:   {name:"正官格",    en:"Institutional Authority",    family:"institutional",    description:"Success through structured recognition"},
    balanced:        {name:"通关格",    en:"Balance and Flow",            family:"balanced",          description:"Harmony and adaptability across contexts"},
  };

  const yangYear = STEM_YIN[yearStem]===0;
  const male = gender==="male";
  const forward = (male&&yangYear)||(!male&&!yangYear);
  const birthDate = new Date(year,month-1,day);
  let termDays=0;
  if (forward) {
    outer: for (let off=0;off<=1;off++) for (let ti=0;ti<12;ti++) { const td=getSolarTermDate(baziYear+off,ti); if (td>birthDate){termDays=Math.round((td-birthDate)/86400000);break outer;} }
  } else {
    let prev=null;
    for (let ti=11;ti>=0;ti--) { const td=getSolarTermDate(baziYear,ti); if (td<birthDate){prev=td;break;} }
    if (!prev) prev=getSolarTermDate(baziYear-1,11);
    termDays=Math.round((birthDate-prev)/86400000);
  }
  const startAge=Math.max(1,Math.round(termDays/3));
  const currentAge=new Date().getFullYear()-year;
  const luckPillars=Array.from({length:9},(_,i)=>{
    const ns=HS[(forward?(msi+i+1)%10:((msi-i-1+10)%10))];
    const nb=EB[(forward?(monthBranchIdx+i+1)%12:((monthBranchIdx-i-1+12)%12))];
    const sa=startAge+i*10;
    return {order:i+1,stem:ns,branch:nb,element:STEM_ELEM[ns],stemTenGod:getTenGod(dayStem,ns),branchTenGod:getTenGod(dayStem,nb),startAge:sa,endAge:sa+9,startYear:year+sa,endYear:year+sa+9,isCurrent:currentAge>=sa&&currentAge<=sa+9,isPast:currentAge>sa+9};
  });

  const now=new Date();
  const cy=now.getFullYear();
  const fysi=((cy-4)%10+10)%10, fybi=((cy-4)%12+12)%12;
  const fyStem=HS[fysi],fyBranch=EB[fybi];
  const fmIdx=getSolarMonthIndex(now);
  const fmBranch=EB[(fmIdx+1)%12];
  const fmStem=HS[(((fysi%5)*2+2)%10+fmIdx-1+10)%10];
  const fdEl=Math.floor((now-anchor)/86400000);
  const fdStem=HS[fdEl%10],fdBranch=EB[(fdEl+10)%12];

  const dmEl = STEM_ELEM[dayStem];
  const partialChart = {
    dayMaster: { element: dmEl, strength, stem: dayStem },
    elements,
    pillars: {
      year:  { stem: yearStem,  branch: yearBranch  },
      month: { stem: monthStem, branch: monthBranch },
      day:   { stem: dayStem,   branch: dayBranch   },
      hour:  { stem: hourStem,  branch: hourBranch  },
    },
  };
  const tgPattern    = computeTgPattern(partialChart);
  const catalyst     = getPrimaryCatalyst(partialChart);
  const archetypeKey = `${dayStem}_${getEnergyBand(strength)}_${tgPattern}`;
  return {
    meta:{birthDate:`${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`,birthHour:hour,location:location||"Beijing",longitude:lon,gender,calculatedAt:now.toISOString().split("T")[0]},
    pillars:{year:{stem:yearStem,branch:yearBranch,stemElement:STEM_ELEM[yearStem],branchElement:BRANCH_ELEM[yearBranch],stemPolarity:STEM_YIN[yearStem]?"yin":"yang",branchPolarity:BRANCH_YIN[yearBranch]?"yin":"yang"},month:{stem:monthStem,branch:monthBranch,stemElement:STEM_ELEM[monthStem],branchElement:BRANCH_ELEM[monthBranch],stemPolarity:STEM_YIN[monthStem]?"yin":"yang",branchPolarity:BRANCH_YIN[monthBranch]?"yin":"yang"},day:{stem:dayStem,branch:dayBranch,stemElement:STEM_ELEM[dayStem],branchElement:BRANCH_ELEM[dayBranch],stemPolarity:STEM_YIN[dayStem]?"yin":"yang",branchPolarity:BRANCH_YIN[dayBranch]?"yin":"yang"},hour:{stem:hourStem,branch:hourBranch,stemElement:STEM_ELEM[hourStem],branchElement:BRANCH_ELEM[hourBranch],stemPolarity:STEM_YIN[hourStem]?"yin":"yang",branchPolarity:BRANCH_YIN[hourBranch]?"yin":"yang"}},
    dayMaster:{stem:dayStem,element:dmEl,polarity:STEM_YIN[dayStem]?"yin":"yang",strength,strengthScore},
    elements,
    missingElements:Object.keys(elements).filter(e=>!elements[e].present),
    tension: tgPattern, tgPattern, catalyst, archetypeKey,
    tenGods:{yearStem:getTenGod(dayStem,yearStem),yearBranch:getTenGod(dayStem,yearBranch),monthStem:getTenGod(dayStem,monthStem),monthBranch:getTenGod(dayStem,monthBranch),dayStem:{zh:"日主",en:"Day Master",family:"self"},dayBranch:getTenGod(dayStem,dayBranch),hourStem:getTenGod(dayStem,hourStem),hourBranch:getTenGod(dayStem,hourBranch)},
    combinations,pattern:PATTERNS[patternKey],luckPillars,
    currentFlowYear:{year:cy,stem:fyStem,branch:fyBranch,stemElement:STEM_ELEM[fyStem],branchElement:BRANCH_ELEM[fyBranch],stemTenGod:getTenGod(dayStem,fyStem),branchTenGod:getTenGod(dayStem,fyBranch)},
    currentFlowMonth:{stem:fmStem,branch:fmBranch,stemElement:STEM_ELEM[fmStem],branchElement:BRANCH_ELEM[fmBranch],stemTenGod:getTenGod(dayStem,fmStem),branchTenGod:getTenGod(dayStem,fmBranch)},
    currentFlowDay:{stem:fdStem,branch:fdBranch,stemElement:STEM_ELEM[fdStem],branchElement:BRANCH_ELEM[fdBranch],stemTenGod:getTenGod(dayStem,fdStem),branchTenGod:getTenGod(dayStem,fdBranch)},
  };
}

// NOTE — Archetype names, manifestos, and element pigment colors are content,
// not calculation, and therefore do NOT belong in this file.
//   • Archetype content (archetypeName, manifesto, elementIntro, gifts, shadows,
//     manual, etc.) → src/content/archetypeSource.js (STEM_CARD_DATA[stem].identity)
//   • Element pigment hexes (PIG_METAL / PIG_WOOD / PIG_WATER / PIG_FIRE /
//     PIG_EARTH) → src/styles/tokens.jsx
// DOC1 §1 mandates the calculator be pure computation with no content strings.
