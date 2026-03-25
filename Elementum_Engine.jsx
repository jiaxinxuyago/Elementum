// ============================================================
// ELEMENTUM — BaZi Spiritual Guidance Engine
// ============================================================
// Version:  1.0.0-alpha
// Sections: 1 (Day Master Profile) · 2 (Energy Profile)
// Pending:  Sections 3–10
//
// Architecture (split on Vite migration):
//   ████ CALCULATION ENGINE  → src/engine/calculator.js
//   ████ CONTENT LAYER       → src/content/content.js
//   ████ AI READING ENGINE   → src/engine/reading.js
//   ████ UI COMPONENTS       → src/components/
//
// Reference chart: 1995-04-29 18:00 Beijing Male
//   → 乙亥 庚辰 庚寅 乙酉  (Day Master: 庚 Yang Metal)
// ============================================================

import { useState, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// LAYER 0 — TIER CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const TIERS = { FREE: 0, SEEKER: 1, ADVISOR: 2, ORACLE: 3 };
const TIER_LABELS = { 0:"Free", 1:"Seeker", 2:"Advisor", 3:"Oracle" };
const TIER_PRICES = { 0:"$0", 1:"$3.99/mo", 2:"$9.99/mo", 3:"$19.99/mo" };
const FREE_EXPANSIONS_PER_DAY = 1;

// ═══════════════════════════════════════════════════════════════════════════
// LAYER 1 — BAZI CALCULATOR (pure JS, no LLM, fully deterministic)
// Verified: 1995-04-29 18:00 Beijing → 乙亥 庚辰 庚寅 乙酉 ✓
// ═══════════════════════════════════════════════════════════════════════════


// ████████████████████████████████████████████████████████████████████████
// LAYER 0 — CALCULATION ENGINE  →  src/engine/calculator.js
// Pure JS functions, no React. Takes birth data, returns chart JSON.
// ████████████████████████████████████████████████████████████████████████

const HS = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
const EB = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
const STEM_ELEM   = {甲:"Wood",乙:"Wood",丙:"Fire",丁:"Fire",戊:"Earth",己:"Earth",庚:"Metal",辛:"Metal",壬:"Water",癸:"Water"};
const BRANCH_ELEM = {子:"Water",丑:"Earth",寅:"Wood",卯:"Wood",辰:"Earth",巳:"Fire",午:"Fire",未:"Earth",申:"Metal",酉:"Metal",戌:"Earth",亥:"Water"};
const STEM_YIN    = {甲:0,乙:1,丙:0,丁:1,戊:0,己:1,庚:0,辛:1,壬:0,癸:1};
const BRANCH_YIN  = {子:0,丑:1,寅:0,卯:1,辰:0,巳:1,午:0,未:1,申:0,酉:1,戌:0,亥:1};
const SOLAR_TERMS = [[1,6],[2,4],[3,6],[4,5],[5,6],[6,6],[7,7],[8,7],[9,8],[10,8],[11,7],[12,7]];

function getSolarTermDate(year, idx) {
  const [m, d] = SOLAR_TERMS[idx];
  const offset = year - 2000;
  const corr = offset * 0.2422 - Math.floor((offset + 1) / 4);
  return new Date(year, m - 1, Math.floor(d + corr));
}
function getSolarMonthIndex(date) {
  const y = date.getFullYear(); let idx = 0;
  for (let i = 0; i < 12; i++) if (date >= getSolarTermDate(y, i)) idx = i;
  return idx;
}
function getBaziYear(date) {
  const y = date.getFullYear();
  return date < getSolarTermDate(y, 1) ? y - 1 : y;
}
function getTenGod(dmStem, targetStem) {
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

function calculateBaziChart(input) {
  const { year, month, day, hour, gender, location } = input;
  const longitudes = {beijing:120,shanghai:121,guangzhou:113,chengdu:104,newyork:-74,london:0,tokyo:139,paris:2,sydney:151};
  const lon = longitudes[location?.toLowerCase()] || 120;
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

  const elements = {Metal:0,Wood:0,Fire:0,Earth:0,Water:0};
  [yearStem,monthStem,dayStem,hourStem].forEach(s=>elements[STEM_ELEM[s]]++);
  [yearBranch,monthBranch,dayBranch,hourBranch].forEach(b=>elements[BRANCH_ELEM[b]]++);

  const combinations = [];
  const STEM_BONDS = {甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸",己:"甲",庚:"乙",辛:"丙",壬:"丁",癸:"戊"};
  const BOND_RESULT = {甲:"Earth",乙:"Metal",丙:"Water",丁:"Wood",戊:"Fire",己:"Earth",庚:"Metal",辛:"Water",壬:"Wood",癸:"Fire"};
  const BRANCH_BONDS = {子:"丑",丑:"子",寅:"亥",亥:"寅",卯:"戌",戌:"卯",辰:"酉",酉:"辰",巳:"申",申:"巳",午:"未",未:"午"};
  const BR_RESULT = {子:"Earth",丑:"Earth",寅:"Wood",亥:"Wood",卯:"Fire",戌:"Fire",辰:"Metal",酉:"Metal",巳:"Water",申:"Water",午:"Earth",未:"Earth"};
  const stems = [yearStem,monthStem,dayStem,hourStem];
  const stemPos = ["yearStem","monthStem","dayStem","hourStem"];
  const branches = [yearBranch,monthBranch,dayBranch,hourBranch];
  const branchPos = ["yearBranch","monthBranch","dayBranch","hourBranch"];
  for (let i=0;i<4;i++) for (let j=i+1;j<4;j++) {
    if (STEM_BONDS[stems[i]]===stems[j])
      combinations.push({type:"stemBond",elements:[stems[i],stems[j]],positions:[stemPos[i],stemPos[j]],resultElement:BOND_RESULT[stems[i]],activates:true,name:`${stems[i]}${stems[j]}合`});
    if (BRANCH_BONDS[branches[i]]===branches[j])
      combinations.push({type:"branchBond",elements:[branches[i],branches[j]],positions:[branchPos[i],branchPos[j]],resultElement:BR_RESULT[branches[i]],activates:true,name:`${branches[i]}${branches[j]}合`});
  }

  const dmEl = STEM_ELEM[dayStem];
  const GEN={Wood:"Fire",Fire:"Earth",Earth:"Metal",Metal:"Water",Water:"Wood"};
  const supportScore = (elements[dmEl]*1.2) + (elements[Object.keys(GEN).find(k=>GEN[k]===dmEl)]||0);
  const ratio = supportScore / 8;
  const strength = ratio>0.7?"extremely_strong":ratio>0.5?"strong":ratio>0.35?"moderate":ratio>0.2?"weak":"extremely_weak";

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

  return {
    meta:{birthDate:`${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`,birthHour:hour,location:location||"Beijing",gender,calculatedAt:now.toISOString().split("T")[0]},
    pillars:{year:{stem:yearStem,branch:yearBranch,stemElement:STEM_ELEM[yearStem],branchElement:BRANCH_ELEM[yearBranch],stemPolarity:STEM_YIN[yearStem]?"yin":"yang",branchPolarity:BRANCH_YIN[yearBranch]?"yin":"yang"},month:{stem:monthStem,branch:monthBranch,stemElement:STEM_ELEM[monthStem],branchElement:BRANCH_ELEM[monthBranch],stemPolarity:STEM_YIN[monthStem]?"yin":"yang",branchPolarity:BRANCH_YIN[monthBranch]?"yin":"yang"},day:{stem:dayStem,branch:dayBranch,stemElement:STEM_ELEM[dayStem],branchElement:BRANCH_ELEM[dayBranch],stemPolarity:STEM_YIN[dayStem]?"yin":"yang",branchPolarity:BRANCH_YIN[dayBranch]?"yin":"yang"},hour:{stem:hourStem,branch:hourBranch,stemElement:STEM_ELEM[hourStem],branchElement:BRANCH_ELEM[hourBranch],stemPolarity:STEM_YIN[hourStem]?"yin":"yang",branchPolarity:BRANCH_YIN[hourBranch]?"yin":"yang"}},
    dayMaster:{stem:dayStem,element:dmEl,polarity:STEM_YIN[dayStem]?"yin":"yang",strength,strengthScore:Math.round(ratio*100)/100},
    elements:Object.fromEntries(Object.entries(elements).map(([k,v])=>[k,{count:v,dominant:v===Math.max(...Object.values(elements)),present:v>0}])),
    missingElements:Object.keys(elements).filter(e=>elements[e]===0),
    tenGods:{yearStem:getTenGod(dayStem,yearStem),yearBranch:getTenGod(dayStem,yearBranch),monthStem:getTenGod(dayStem,monthStem),monthBranch:getTenGod(dayStem,monthBranch),dayStem:{zh:"日主",en:"Day Master",family:"self"},dayBranch:getTenGod(dayStem,dayBranch),hourStem:getTenGod(dayStem,hourStem),hourBranch:getTenGod(dayStem,hourBranch)},
    combinations,pattern:PATTERNS[patternKey],luckPillars,
    currentFlowYear:{year:cy,stem:fyStem,branch:fyBranch,stemElement:STEM_ELEM[fyStem],branchElement:BRANCH_ELEM[fyBranch],stemTenGod:getTenGod(dayStem,fyStem),branchTenGod:getTenGod(dayStem,fyBranch)},
    currentFlowMonth:{stem:fmStem,branch:fmBranch,stemElement:STEM_ELEM[fmStem],branchElement:BRANCH_ELEM[fmBranch],stemTenGod:getTenGod(dayStem,fmStem),branchTenGod:getTenGod(dayStem,fmBranch)},
    currentFlowDay:{stem:fdStem,branch:fdBranch,stemElement:STEM_ELEM[fdStem],branchElement:BRANCH_ELEM[fdBranch],stemTenGod:getTenGod(dayStem,fdStem),branchTenGod:getTenGod(dayStem,fdBranch)},
  };
}


// ── TEMPLATE DATABASE (generated by generate_templates_v2.js) ──────────
// In production: populated by running the batch script (~800 entries).
// After migration: import from src/content/content.js
// ─────────────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════════════════
// LAYER 1.5 — TEMPLATE DATABASE
// In production: populated by running generate_templates.js (800 entries, ~$6)
// For testing: hand-crafted samples covering 6 Day Masters × key combinations
// Template key format: {stem}_{strength}_{missing_sorted}_{pattern}
// ═══════════════════════════════════════════════════════════════════════════

const TEMPLATE_DB = {

  // ── 庚 Yang Metal ───────────────────────────────────────────────────────
  // Exact match: reference chart 1995-04-29
  "庚_extremely_strong_Fire_output_to_wealth": {
    sections: {
      nature:    {teaser:"Before you say a word, something in the room shifts — a quality of precision and internal stillness that suggests you've already seen further into the situation than anyone else present. You don't speculate. You perceive. Where others circle around what's true, you arrive there directly and without apology, and sometimes the room isn't ready for it. This is not a personality trait you cultivated. This is Yang Metal at its most concentrated: the Blade doesn't perform its edge. It simply has one, and it's always had one."},
      fire:      {teaser:"Here is the most important structural fact of your chart: the element that should shape and temper you — fire, the forge — has been entirely absent from your life until very recently. Not weakened, not buried. Absent. And for Yang Metal, that absence is everything: the ancient texts say it plainly — the Metal becomes the instrument only through fire. Without it, you've spent decades as precisely that: extraordinary raw material. The forge arrived in 2023, and everything you've been feeling since — the pressure, the intensity, the demand to prove yourself — is not something going wrong. It is, finally, something going exactly right."},
      path:      {teaser:"Your chart holds an unambiguous verdict: you were designed to succeed through what you create, not through where you climb. The connection must be direct — your name genuinely on the work, your vision unmistakably present in what you've built. Every time you've worked inside someone else's framework, executing someone else's vision, something in you went flat and withdrew. That wasn't immaturity or inability. That was your chart telling you, in the only language it knows, that you were pointed in the wrong direction. This is the architecture of your success, and it has always been pointing here."},
      bonds:     {teaser:"Your chart carries something genuinely rare: a double bond between your core self and the elements that represent your creative energy and the people you love. This fusion doesn't mean you care deeply — it means what you build and who you love don't stay separate from who you are. They merge with you. They become you. The work you've put your name on feels like your identity because it is. The person you've committed to feels like part of your own architecture because they are. This is not a metaphor. It is a structural fact of your chart."},
      strengths: {teaser:"You carry three capacities that were never learned — they arrived with you. A perceptual clarity that cuts through to what's actually true with a speed and directness that most people spend years trying to develop. A genuine creative and expressive depth that gets physically restless when it isn't being used — not a skill but a structural need. And an unusual capacity for mastering complex systems: you can go further into difficult knowledge than most people are willing to go, and you emerge with actual understanding rather than surface familiarity. These are your default, not your best moments."},
      challenges:{teaser:"The same force that makes you the most honest person your close friends have ever met is also the force that makes you genuinely, structurally difficult to redirect once you've decided something is true. External authority that hasn't earned your internal respect doesn't just fail to move you — it produces something close to a physical resistance. And without fire's shaping influence until recently, your discipline has always been entirely self-generated: when you believe in something, your focus is absolute; when you don't, no external pressure can sustain it. This is not a character flaw. It is exactly what a Blade without a forge looks like."},
      love:      {teaser:"You don't love in half-measures, and you never have. When you let someone past the precision and the stillness, they don't just receive your attention — they receive access to the part of you that makes you, you. The depth of that fusion is rare. Most people are never offered what you offer when you fully commit. What the chart also shows is the tension: your energy is dominant, and the partner element in your chart is under pressure from it. The work of your love life is not finding someone worthy of your depth. It's building enough space inside that depth for another person to exist fully and freely."},
      career:    {teaser:"The blueprint is clear: work that is genuinely, traceably yours — where the quality of what you build is a direct reflection of your investment in it — is where your energy is inexhaustible. Work that requires you to execute someone else's vision, to perform loyalty to a structure that doesn't recognize your actual gifts, will always cost you more than it returns. Your chart points toward a specific intersection: where precision meets genuine creative ambition, where technical depth serves original vision, where the thing you've built could only have been built by you. That is the arena. Everything else is practice."},
      chapter:   {teaser:"The decade you are living now — 2023 to 2032 — is not simply another chapter. It is the first time in your life that an external force with real leverage over your direction has arrived. Three decades of operating without the forge — building your own discipline, generating your own direction, creating entirely from the inside — and now, finally, the forge is here. The pressure you feel is not a sign that something is wrong. It is the heat doing exactly what heat does to exceptional raw metal: revealing what was always there, and beginning the irreversible process of making it undeniable."},
      year:      {teaser:"2026 is a year where the testing force doubles. The Yang Fire arriving this year is your Seven Killings — the most demanding, most galvanizing energy in the system for a Blade like you. Something external will press on you this year and ask, without asking: is the edge real? Is the work real? Are you what you've been building toward? The answer your chart suggests is to meet that pressure with the full force of what you actually are — not the managed version, not the socially calibrated version. The Blade that shows its real edge this year will be the one that matters."},
      council:   {teaser:"Four orientations are waiting in the full reading: how to build work that is genuinely yours in a way that sustains rather than consumes you, how to work with what this decade is forging rather than around it, how to love at the depth your chart describes without diminishing the person beside you, and what the forge's arrival is specifically building in you right now. These aren't prescriptions. They are the chart's answer to the questions you've probably already been asking in the hours between three and five in the morning."},
      synthesis: {teaser:"You are a Blade that spent three decades as extraordinary raw material — the capacity undeniable, the edge present, but the forge not yet arrived. Everything about this chart is a story about becoming. Not becoming something you aren't, but becoming the most finished and most deliberate version of what you have always been. The forge that arrived in 2023 is not a disruption to your story. It is the moment your story stopped being a prologue."},
    },
    decade: {theme:"The First Forge", teaser:"The first fire your chart has ever seen arrived in 2023 — what you're feeling as pressure or intensity is the forge doing exactly what it was built to do."},
    compatibility: {teaser:"Your chart creates a deep structural fusion with what you commit to — compatibility is less about finding balance and more about finding someone with enough roots to hold their own beside you."},
  },

  // Base fallback for all 庚 strong/extremely_strong
  "庚_extremely_strong_base": {
    sections: {
      nature:    {teaser:"Before you say a word, something in the room shifts — a quality of precision and internal stillness that suggests you've already seen further into the situation than anyone else present. You don't speculate. You perceive. Where others circle around what's true, you arrive there directly and without apology, and sometimes the room isn't ready for it. This is not a personality trait you cultivated. This is Yang Metal at its most concentrated: the Blade doesn't perform its edge. It simply has one, and it's always had one."},
      fire:      {teaser:"Here is the most important structural fact of your chart: the element that should shape and temper you — fire, the forge — has been entirely absent from your life until very recently. Not weakened, not buried. Absent. And for Yang Metal, that absence is everything: the ancient texts say it plainly — the Metal becomes the instrument only through fire. Without it, you've spent decades as precisely that: extraordinary raw material. The forge arrived in 2023, and everything you've been feeling since — the pressure, the intensity, the demand to prove yourself — is not something going wrong. It is, finally, something going exactly right."},
      path:      {teaser:"Your chart holds an unambiguous verdict: you were designed to succeed through what you create, not through where you climb. The connection must be direct — your name genuinely on the work, your vision unmistakably present in what you've built. Every time you've worked inside someone else's framework, executing someone else's vision, something in you went flat and withdrew. That wasn't immaturity or inability. That was your chart telling you, in the only language it knows, that you were pointed in the wrong direction. This is the architecture of your success, and it has always been pointing here."},
      bonds:     {teaser:"Your chart carries something genuinely rare: a double bond between your core self and the elements that represent your creative energy and the people you love. This fusion doesn't mean you care deeply — it means what you build and who you love don't stay separate from who you are. They merge with you. They become you. The work you've put your name on feels like your identity because it is. The person you've committed to feels like part of your own architecture because they are. This is not a metaphor. It is a structural fact of your chart."},
      strengths: {teaser:"You carry three capacities that were never learned — they arrived with you. A perceptual clarity that cuts through to what's actually true with a speed and directness that most people spend years trying to develop. A genuine creative and expressive depth that gets physically restless when it isn't being used — not a skill but a structural need. And an unusual capacity for mastering complex systems: you can go further into difficult knowledge than most people are willing to go, and you emerge with actual understanding rather than surface familiarity. These are your default, not your best moments."},
      challenges:{teaser:"The same force that makes you the most honest person your close friends have ever met is also the force that makes you genuinely, structurally difficult to redirect once you've decided something is true. External authority that hasn't earned your internal respect doesn't just fail to move you — it produces something close to a physical resistance. And without fire's shaping influence until recently, your discipline has always been entirely self-generated: when you believe in something, your focus is absolute; when you don't, no external pressure can sustain it. This is not a character flaw. It is exactly what a Blade without a forge looks like."},
      love:      {teaser:"You don't love in half-measures, and you never have. When you let someone past the precision and the stillness, they don't just receive your attention — they receive access to the part of you that makes you, you. The depth of that fusion is rare. Most people are never offered what you offer when you fully commit. What the chart also shows is the tension: your energy is dominant, and the partner element in your chart is under pressure from it. The work of your love life is not finding someone worthy of your depth. It's building enough space inside that depth for another person to exist fully and freely."},
      career:    {teaser:"The blueprint is clear: work that is genuinely, traceably yours — where the quality of what you build is a direct reflection of your investment in it — is where your energy is inexhaustible. Work that requires you to execute someone else's vision, to perform loyalty to a structure that doesn't recognize your actual gifts, will always cost you more than it returns. Your chart points toward a specific intersection: where precision meets genuine creative ambition, where technical depth serves original vision, where the thing you've built could only have been built by you. That is the arena. Everything else is practice."},
      chapter:   {teaser:"The decade you are living now — 2023 to 2032 — is not simply another chapter. It is the first time in your life that an external force with real leverage over your direction has arrived. Three decades of operating without the forge — building your own discipline, generating your own direction, creating entirely from the inside — and now, finally, the forge is here. The pressure you feel is not a sign that something is wrong. It is the heat doing exactly what heat does to exceptional raw metal: revealing what was always there, and beginning the irreversible process of making it undeniable."},
      year:      {teaser:"2026 is a year where the testing force doubles. The Yang Fire arriving this year is your Seven Killings — the most demanding, most galvanizing energy in the system for a Blade like you. Something external will press on you this year and ask, without asking: is the edge real? Is the work real? Are you what you've been building toward? The answer your chart suggests is to meet that pressure with the full force of what you actually are — not the managed version, not the socially calibrated version. The Blade that shows its real edge this year will be the one that matters."},
      council:   {teaser:"Four orientations are waiting in the full reading: how to build work that is genuinely yours in a way that sustains rather than consumes you, how to work with what this decade is forging rather than around it, how to love at the depth your chart describes without diminishing the person beside you, and what the forge's arrival is specifically building in you right now. These aren't prescriptions. They are the chart's answer to the questions you've probably already been asking in the hours between three and five in the morning."},
      synthesis: {teaser:"You are a Blade that spent three decades as extraordinary raw material — the capacity undeniable, the edge present, but the forge not yet arrived. Everything about this chart is a story about becoming. Not becoming something you aren't, but becoming the most finished and most deliberate version of what you have always been. The forge that arrived in 2023 is not a disruption to your story. It is the moment your story stopped being a prologue."},
    },
    decade: {theme:"The Active Forge", teaser:"This decade is asking more of you than any previous one — not because something is wrong, but because you have finally reached conditions capable of shaping you."},
    compatibility: {teaser:"Your chart creates deep bonds with what it commits to — find someone with enough substance to stand beside your strength, not someone who adapts to it."},
  },

  "庚_strong_base": {
    sections: {
      nature:    {teaser:"Before you say a word, something in the room shifts — a quality of precision and internal stillness that suggests you've already seen further into the situation than anyone else present. You don't speculate. You perceive. Where others circle around what's true, you arrive there directly and without apology, and sometimes the room isn't ready for it. This is not a personality trait you cultivated. This is Yang Metal at its most concentrated: the Blade doesn't perform its edge. It simply has one, and it's always had one."},
      fire:      {teaser:"Here is the most important structural fact of your chart: the element that should shape and temper you — fire, the forge — has been entirely absent from your life until very recently. Not weakened, not buried. Absent. And for Yang Metal, that absence is everything: the ancient texts say it plainly — the Metal becomes the instrument only through fire. Without it, you've spent decades as precisely that: extraordinary raw material. The forge arrived in 2023, and everything you've been feeling since — the pressure, the intensity, the demand to prove yourself — is not something going wrong. It is, finally, something going exactly right."},
      path:      {teaser:"Your chart holds an unambiguous verdict: you were designed to succeed through what you create, not through where you climb. The connection must be direct — your name genuinely on the work, your vision unmistakably present in what you've built. Every time you've worked inside someone else's framework, executing someone else's vision, something in you went flat and withdrew. That wasn't immaturity or inability. That was your chart telling you, in the only language it knows, that you were pointed in the wrong direction. This is the architecture of your success, and it has always been pointing here."},
      bonds:     {teaser:"Your chart carries something genuinely rare: a double bond between your core self and the elements that represent your creative energy and the people you love. This fusion doesn't mean you care deeply — it means what you build and who you love don't stay separate from who you are. They merge with you. They become you. The work you've put your name on feels like your identity because it is. The person you've committed to feels like part of your own architecture because they are. This is not a metaphor. It is a structural fact of your chart."},
      strengths: {teaser:"You carry three capacities that were never learned — they arrived with you. A perceptual clarity that cuts through to what's actually true with a speed and directness that most people spend years trying to develop. A genuine creative and expressive depth that gets physically restless when it isn't being used — not a skill but a structural need. And an unusual capacity for mastering complex systems: you can go further into difficult knowledge than most people are willing to go, and you emerge with actual understanding rather than surface familiarity. These are your default, not your best moments."},
      challenges:{teaser:"The same force that makes you the most honest person your close friends have ever met is also the force that makes you genuinely, structurally difficult to redirect once you've decided something is true. External authority that hasn't earned your internal respect doesn't just fail to move you — it produces something close to a physical resistance. And without fire's shaping influence until recently, your discipline has always been entirely self-generated: when you believe in something, your focus is absolute; when you don't, no external pressure can sustain it. This is not a character flaw. It is exactly what a Blade without a forge looks like."},
      love:      {teaser:"You don't love in half-measures, and you never have. When you let someone past the precision and the stillness, they don't just receive your attention — they receive access to the part of you that makes you, you. The depth of that fusion is rare. Most people are never offered what you offer when you fully commit. What the chart also shows is the tension: your energy is dominant, and the partner element in your chart is under pressure from it. The work of your love life is not finding someone worthy of your depth. It's building enough space inside that depth for another person to exist fully and freely."},
      career:    {teaser:"The blueprint is clear: work that is genuinely, traceably yours — where the quality of what you build is a direct reflection of your investment in it — is where your energy is inexhaustible. Work that requires you to execute someone else's vision, to perform loyalty to a structure that doesn't recognize your actual gifts, will always cost you more than it returns. Your chart points toward a specific intersection: where precision meets genuine creative ambition, where technical depth serves original vision, where the thing you've built could only have been built by you. That is the arena. Everything else is practice."},
      chapter:   {teaser:"The decade you are living now — 2023 to 2032 — is not simply another chapter. It is the first time in your life that an external force with real leverage over your direction has arrived. Three decades of operating without the forge — building your own discipline, generating your own direction, creating entirely from the inside — and now, finally, the forge is here. The pressure you feel is not a sign that something is wrong. It is the heat doing exactly what heat does to exceptional raw metal: revealing what was always there, and beginning the irreversible process of making it undeniable."},
      year:      {teaser:"2026 is a year where the testing force doubles. The Yang Fire arriving this year is your Seven Killings — the most demanding, most galvanizing energy in the system for a Blade like you. Something external will press on you this year and ask, without asking: is the edge real? Is the work real? Are you what you've been building toward? The answer your chart suggests is to meet that pressure with the full force of what you actually are — not the managed version, not the socially calibrated version. The Blade that shows its real edge this year will be the one that matters."},
      council:   {teaser:"Four orientations are waiting in the full reading: how to build work that is genuinely yours in a way that sustains rather than consumes you, how to work with what this decade is forging rather than around it, how to love at the depth your chart describes without diminishing the person beside you, and what the forge's arrival is specifically building in you right now. These aren't prescriptions. They are the chart's answer to the questions you've probably already been asking in the hours between three and five in the morning."},
      synthesis: {teaser:"You are a Blade that spent three decades as extraordinary raw material — the capacity undeniable, the edge present, but the forge not yet arrived. Everything about this chart is a story about becoming. Not becoming something you aren't, but becoming the most finished and most deliberate version of what you have always been. The forge that arrived in 2023 is not a disruption to your story. It is the moment your story stopped being a prologue."},
    },
    decade: {theme:"A Season of Shaping", teaser:"This decade is asking you to be defined by something — stay present with what it's asking rather than finding routes around the definition."},
    compatibility: {teaser:"You need a partner with their own gravitational field — someone who brings enough substance that the relationship becomes genuinely generative rather than one-directional."},
  },

  // ── 乙 Yin Wood ─────────────────────────────────────────────────────────
  "乙_moderate_base": {
    sections: {
      nature:    {teaser:"There is a quality in how you move through the world that looks like flexibility but is actually something far more sophisticated — an intelligence about which surfaces deserve your energy and which ones will only exhaust you. The Vine doesn't fight the wall. It reads it, finds the path of least resistance, and arrives somewhere the Oak never could. This is not accommodation. This is a form of precision that most people mistake for adaptability, but is actually one of the rarest qualities in a chart."},
      fire:      {teaser:"Your chart is missing something — and the interesting thing is not what that absence has cost you, but what it has built. For the Vine, the missing element is not the part that didn't grow. It is the specific condition that has required you to develop in directions a more complete chart never would have forced. The absence in your chart is not a gap to be filled. It is the very thing that has made you irreplaceable in the specific way that you are. This reading names it precisely."},
      path:      {teaser:"Your chart holds a specific answer to how success is structured for you: through connection, through finding the right surfaces, through the kind of reach that appears indirect but arrives exactly where it was always going. The Vine doesn't succeed by growing straight up — it succeeds by being smarter than straight up. The direct, forceful approach consistently costs you more than it returns. The approach that reads the room, finds genuine alignment, and moves through relationship is where your energy becomes inexhaustible."},
      bonds:     {teaser:"The connections in your chart have a quality of deep intertwining — a tendency to wrap around what you commit to in ways that become genuinely structural to how you understand yourself. The Vine and the wall it climbs are not separate things. Over time, they become one thing. This reading explores what that means for how you love, what you've built, and why untangling from something you've truly committed to costs you more — and takes longer — than it does for people built differently."},
      strengths: {teaser:"You carry three capacities that are genuinely yours. A relational intelligence that reads people, rooms, and situations with an accuracy that arrives faster than analysis. A creative adaptability that finds paths through situations more rigid personalities can't navigate — not by avoiding difficulty but by moving through it more intelligently. And a resilience that looks soft from the outside but has been tested and proved real. These have carried you through things that should have been harder than they were."},
      challenges:{teaser:"The same flexibility that is your most valuable quality is also the one most easily mistaken — by yourself and others — for something lesser than it is. The Vine's recurring challenge is the question of when to hold your own position versus when to continue reaching toward alignment: when accommodation is intelligence, and when it has quietly crossed into self-erasure. This reading names the specific pattern in your chart, what triggers it, and what choosing differently actually looks like."},
      love:      {teaser:"You love through attentiveness and genuine care — through noticing, adjusting, and giving in ways that are specific to the person rather than generic. The Vine loves by wrapping: offering support, growing together, building something that neither person could have built alone. The chart also shows the specific challenge of loving as a Vine — ensuring that the same attentiveness you give so freely to others is turned, with equal care, toward yourself. This reading names what reciprocity needs to look like for you."},
      career:    {teaser:"Work that involves building genuine connection — between people, between ideas, between what exists and what could exist — is where your particular intelligence produces its most distinctive results. The Vine finds paths the Oak misses because it's willing to move differently. Your career edge is not the loudest capability in the room. It is the most sophisticated one: the ability to reach, to connect, and to arrive somewhere others couldn't get to. This reading names the specific domain where that edge is most powerful."},
      chapter:   {teaser:"The decade you're living right now has a specific quality of deepening — a period when the connections and commitments you've been building are showing their real roots, and what you've been climbing toward is becoming clearer. The wall you're on right now is the one that matters most in your life. This reading names what this decade is specifically asking you to climb toward, what it's offering you that no previous decade has, and what the Vine is ready to become."},
      year:      {teaser:"2026 brings a fire energy that is more activating than comfortable — a year that presses on what you've built and asks whether the connection is real, whether the reach has found its surface. For the Vine, fire along the wall is a clarifying force: it reveals which connections are genuine and which were merely convenient. This reading names what 2026 is specifically asking of your particular chart, and how to meet that pressure in a way that strengthens rather than severs."},
      council:   {teaser:"Four orientations are waiting in the full reading: how to reach in the directions that genuinely deserve your energy rather than the ones that are merely available, what this decade is calling you to climb toward, how your particular quality of love functions best and where it needs protecting, and what the missing element in your chart has been preparing you to receive. These are the chart's answers to the questions you've been living."},
      synthesis: {teaser:"You are someone whose strength is precisely as real as it is subtle — and the arc of your life is one of gradually learning to trust that subtlety as a genuine form of power rather than compensating for what it isn't. The Vine arrives somewhere the Oak never could. This reading names where your chart says you're going, what you're in the process of becoming, and why the path that looked indirect was always the right one."},
    },
    decade: {theme:"Roots Deepen", teaser:"This decade is less about dramatic change and more about the deepening of what's already been built — trust the process even when the pace feels slower than you'd like."},
    compatibility: {teaser:"You thrive with partners who appreciate depth of care and bring enough stability that your natural flexibility becomes a gift rather than a source of depletion."},
  },

  // ── 壬 Yang Water ───────────────────────────────────────────────────────
  "壬_strong_base": {
    sections: {
      nature:    {teaser:"There is a quality of depth in you that people sense before they can articulate what they're sensing — a vastness, a quality of containing more than is visible at the surface, that makes people feel simultaneously drawn toward you and slightly uncertain of how deep you actually go. The Ocean doesn't announce its depth. It simply has it, and anyone who's spent real time near you knows that what you carry is larger than what you show. This is your most fundamental nature, and it has been shaping everything about how you move through the world."},
      fire:      {teaser:"Your chart is missing something specific — and for the Ocean, that absence is not a drought. It is the specific shoreline that has given you your shape. The missing element in your chart is not what has limited your depth. It is the particular force that has taught the Ocean where it ends and the land begins — that has required you to develop the specific quality of self-definition that only comes from meeting something that doesn't move with you. This reading names what's absent, what it's built, and what changes when it arrives."},
      path:      {teaser:"Your chart holds a clear answer to how success is structured for you: through depth of engagement and genuine contribution at the level where things actually operate — not the surface level where most activity happens, but the layer beneath it where the real dynamics live. The shallow engagement, the surface-level participation, the work that doesn't actually require what you specifically carry — these consistently drain you even when they succeed. The closer your work gets to the depth it actually requires, the more natural your presence in it becomes."},
      bonds:     {teaser:"The connections in your chart have a quality of depth that is not simply intensity — it is the quality of the ocean's relationship with what it surrounds. The people you're genuinely connected to aren't just in your orbit. They are shaped by it, moved by it, carried by currents they may not fully understand. This reading explores what that means for how you love, what your genuine presence in someone's life has done that you've never fully accounted for, and what you need from a connection for it to feel like a real meeting rather than a surface interaction."},
      strengths: {teaser:"You carry three genuine capacities. A depth of perception that sees beneath the surface of situations, people, and problems — a quality of understanding that comes from the level where things actually operate. A creative intelligence that synthesizes across domains in ways that appear unexpected but are actually the natural product of a mind that moves through depth rather than across surface. And a resilience that, like the ocean's, is both vast and patient — it doesn't fight. It simply continues, and eventually, it shapes the shore."},
      challenges:{teaser:"The same depth that makes you exceptional creates a specific challenge: it can be genuinely difficult to stay on the surface long enough to meet people where they are, and the internal richness of what you carry can make external demands feel smaller than they want to be treated. The Ocean's recurring challenge is translation — bringing what you perceive at depth into forms that people at the surface can receive and work with. This reading names the specific shape that challenge takes in your chart and what working with it looks like."},
      love:      {teaser:"You love with a quality of genuine attunement — an ability to sense what someone actually needs rather than what they're presenting, to move with the currents of a relationship rather than requiring it to move with yours. The Ocean loves by surrounding: by creating the conditions in which someone else can be fully themselves, held by something vast enough not to be threatened by their complexity. What the chart also shows is the specific work of loving as an Ocean — ensuring that you, too, are met at depth, and that the connection has genuine ground as well as genuine depth."},
      career:    {teaser:"The work that generates real results for you is work that actually requires depth — research, synthesis, the building of genuine understanding at the level where real insight lives. The surface-level engagement, the work that doesn't actually require what you specifically carry, consistently drains you even when it pays. Your particular edge is the ability to go where most people either can't or won't — to the level where the real dynamics are — and to bring back something genuinely useful. The chart names the specific domain where that depth is most valuable."},
      chapter:   {teaser:"The decade you're living right now has a specific quality of depth finding its channel — a period when what you carry internally is finding its external expression, when the understanding that has been accumulating is finding forms through which it can actually be useful in the world. The tide you're living now is carrying something significant. This reading names what this decade is specifically channeling in your chart, what it's asking the Ocean to give form to, and what the current is moving toward."},
      year:      {teaser:"2026 brings fire on the water — a year where the heat produces steam, where what has been liquid is finding a new form, where the depth of the Ocean meets the directness of a fire year and something new emerges from that meeting. For the Ocean, 2026 is a year of translation: what you've been carrying at depth is finding more concrete and communicable form. This reading names what specifically is being translated this year, and how to work with the steam rather than being scattered by it."},
      council:   {teaser:"Four orientations are waiting in the full reading: how to bring the depth you carry into work that actually deserves and uses it, what this decade is channeling and what it requires the Ocean to give form to, how your quality of attunement functions best in love and what you need from the people closest to you, and what the missing element in your chart has been shaping the Ocean toward. These are the chart's answers to the questions you've been carrying."},
      synthesis: {teaser:"You are someone whose full depth has never been fully visible — and the arc of your life is one of gradually finding the channels through which that depth can flow into the world in forms that are genuinely useful, genuinely received, and genuinely yours. The Ocean doesn't become less itself by finding its channel. It becomes more itself. This reading places you inside that arc precisely — and names where the current is carrying you right now."},
    },
    decade: {theme:"Finding the Channel", teaser:"This decade is about finding the right vessel for what you carry — the depth has always been there, the question now is what form it takes in the world."},
    compatibility: {teaser:"You need a partner who can meet you in depth — someone who isn't overwhelmed by the full range of what you carry and who brings their own substance to the connection."},
  },

  // ── 丁 Yin Fire ─────────────────────────────────────────────────────────
  "丁_moderate_base": {
    sections: {
      nature:    {teaser:"There is a quality in how you engage with the world that is specific rather than general — a focused warmth, a precision of attention that makes the person in front of you feel like the only person in the room. The Candle doesn't illuminate everything. It illuminates what it's pointed at, and what it illuminates, it illuminates completely. This is not a smaller version of the Sun's gift. It is a different kind of power: more intimate, more penetrating, and in the right conditions, more transformative."},
      fire:      {teaser:"Your chart is missing something specific, and the interesting thing about that absence is what it's required your particular flame to become. For the Candle, the missing element is not the darkness that the flame couldn't reach. It is the specific quality of darkness that taught the flame something about its own nature — what it can hold, how far it actually reaches, and what kind of light it uniquely produces. This reading names what's absent, what that's built in you, and what happens when the missing element arrives."},
      path:      {teaser:"Your chart holds a clear answer to how success is structured for you: through the quality of your focused engagement, through doing one thing with full illumination rather than many things with partial presence. The diffuse approach — spreading your light broadly, being everywhere, touching everything — consistently underperforms for someone built the way you are. The closer your work gets to the thing you can genuinely illuminate completely, the more inexhaustible your energy becomes. This is the architecture of your success."},
      bonds:     {teaser:"The connections in your chart have a quality of intimate warmth — when you turn your attention to someone, they receive something specific and rare: the experience of being genuinely seen, not glanced at. The Candle's bonds are created by proximity and sustained by attention. The people who are close to you have been changed by that proximity in ways that are real and lasting. This reading explores what that means for how you love, what you've given without knowing it, and what you need in return."},
      strengths: {teaser:"You carry three genuine capacities. A precision of perception that notices what others pass over — the small thing that reveals the large truth, the detail that changes the reading of everything else. A warmth that creates trust in people who don't trust easily — because focused warmth reads as genuine care, and it is. And a depth of focus that produces real quality in whatever it's directed at — the kind of quality that comes from full illumination rather than adequate lighting. These are structural, not occasional."},
      challenges:{teaser:"The same focused quality that makes you genuinely effective creates a specific challenge: the concentration of your attention can be experienced as intensity by people who weren't asking for full illumination. The Candle's recurring tension is learning when the full flame is what the moment calls for and when a gentler light is what's needed — and the difference between dimming because the room requires it and dimming because you've been told you're too much. This reading names what that distinction looks like in practice."},
      love:      {teaser:"You love with an attentiveness that is rare — a quality of actually seeing your partner, of noticing the small things, of directing your warmth with specificity rather than broadcasting it generally. The Candle loves by illuminating: the person you're with sees themselves more clearly in your light than they do elsewhere. What the chart also shows is the specific work of loving as a Candle — ensuring that the focused warmth is received, not just given, and that you are genuinely seen in return. This reading names what reciprocity looks like for you."},
      career:    {teaser:"The work that generates real results for you is the work of precise illumination — clarifying complex things, guiding people through difficulty, creating something with careful and patient attention that the more scattered approach consistently misses. Your particular edge is not breadth. It is depth. And the specific intersection where your precision meets the thing you can genuinely illuminate completely is where your work becomes irreplaceable rather than merely good. This reading names what that intersection is."},
      chapter:   {teaser:"The decade you're living right now has a specific quality of focused application — a period when the capacities you've been developing are finding their best and most specific uses, and the direction of your flame is becoming clearer. The burning season you're in right now is the one that reveals what you're actually made of — not what you can do in general, but what you specifically produce when the conditions are finally right. This reading names what this decade is asking from your particular flame."},
      year:      {teaser:"2026 brings an amplifying fire energy — a year where the heat increases and the question becomes how to direct the intensified flame rather than simply managing it. For the Candle, a fire year is both opportunity and demand: the light becomes more powerful, and the precision required to use it well becomes more important. This reading names what 2026 is specifically amplifying in your chart, and how to meet that amplification in a way that focuses rather than scatters."},
      council:   {teaser:"Four orientations are waiting in the full reading: how to direct your particular quality of light toward work that deserves its precision, what this decade is applying you toward, how the focused warmth you carry functions best in love and where it needs protecting, and what the missing element in your chart has been preparing your flame for. These are the chart's answers to the questions you've been sitting with."},
      synthesis: {teaser:"You are someone whose gift is the quality of your attention — and the arc of your life is one of finding more and more precisely the surfaces where that attention produces its most genuine and lasting illumination. The Candle doesn't need to fill the entire room. It needs to find the right thing to illuminate completely. This reading places you inside the arc of that search — and names precisely where you are in it right now."},
    },
    decade: {theme:"Focused Application", teaser:"This decade is applying what has been developed — the focus is finding its targets, and the results of sustained attention are becoming visible."},
    compatibility: {teaser:"You thrive with partners who appreciate and reciprocate genuine attentiveness — someone who brings their own focused presence rather than expecting yours to fill the space."},
  },

  // ── 甲 Yang Wood ────────────────────────────────────────────────────────
  "甲_strong_base": {
    sections: {
      nature:    {teaser:"There is a reaching quality in you that doesn't switch off — a structural orientation toward what could be that drives you forward even when the present moment would be good enough to stay in. You were built for growth the way an oak was built for height: not as a choice, not as an aspiration, but as the fundamental expression of what you are. People sense this in you before they can name it — a forward-leaning quality, a sense that you are always pointed somewhere. This is your most primary nature, and this reading confirms it completely."},
      fire:      {teaser:"Your chart is missing something specific — and that specific absence has been one of the most formative forces in your life, shaping you more than most of what is present. For the Oak, what's missing isn't what failed to grow. It is the particular condition the tree has been waiting for — the season that teaches the roots exactly how deep they go. This reading names what's absent, what that absence has been quietly building in you, and when the missing season finally arrives."},
      path:      {teaser:"Your chart holds an unambiguous verdict on how you were designed to succeed: through building, originating, and growing something with real substance that simply would not exist without you. The conventional path — inheriting someone else's structure, climbing someone else's hierarchy — can be executed but never sustained, because it asks you to stop reaching in the direction your nature requires. The closer you get to building something genuinely yours, the more inexhaustible your energy becomes. This is not coincidence. This is the architecture of how success works for you."},
      bonds:     {teaser:"The connections in your chart don't decorate your life — they become part of its structure. When you commit to a person or a project, something in your chart binds to it in a way that begins to feel like identity rather than choice. The Oak doesn't grow around its roots — it becomes them. This reading explores what that means for how you love, what you build, and why some commitments have cost you more to leave than anyone on the outside could possibly understand."},
      strengths: {teaser:"You carry three capacities that were never cultivated — they arrived with you. A vision-making ability that perceives what something could become before others can see what it is. An initiating force — the genuine willingness to go first, to begin what hasn't yet been started — that most people simply do not have. And a structural integrity that makes you someone others can actually build on, not just admire. These aren't your best moments. They are your default."},
      challenges:{teaser:"The same force that drives your growth — the forward orientation, the structural reach toward what could be — is also the force that makes it genuinely difficult to be fully present in what already is. There is a recurring pattern in the Oak's life: reaching for the next stage before the current one has taken root, growing past a difficulty before it's been fully integrated. This reading names the specific shape that pattern takes in your chart, and what the counterforce looks like."},
      love:      {teaser:"You love with a generosity that is structural rather than performed — an investment in your partner's flourishing that comes as naturally as the tree offers shade. The Oak loves by providing: stability, direction, the sense that something lasting is being built here. What the chart also shows is the specific tension that comes with loving as an Oak — the same momentum that is your greatest gift can leave your partner feeling like they're being grown alongside rather than genuinely with. This reading names what balance looks like."},
      career:    {teaser:"The work that generates real results for you shares one quality: it builds something that wouldn't exist without you. Not maintains. Not executes. Creates. Whether that's founding, originating, or growing something from genuine vision — your energy is most inexhaustible when you're making something real from nothing. The chart also names the specific intersection where your particular combination of vision and structural capacity produces work that is genuinely difficult to replicate — and why you've been operating below that scale."},
      chapter:   {teaser:"The decade you're living right now has a specific growth quality that this reading names in detail — a period when foundations that have been laid for years are ready to support something more significant and more visible. The ring of growth you're in is not the largest you'll ever live, but it is the one that determines the scale of everything that follows. What you build in this chapter sets the frame for the next three. This reading names what that means for you specifically."},
      year:      {teaser:"2026 carries a fire quality that accelerates whatever you've already been building — not a year for beginnings, but a year for the next significant form of what's been accumulating. The pressure of a fire year for the Oak is not destructive. It is clarifying: it burns what doesn't belong and reveals the strength of what remains. This reading names what specifically is ready to grow this year, and what the fire of 2026 is clearing the path for in your particular chart."},
      council:   {teaser:"Four orientations are waiting in the full reading: how to build at the scale your genuine gifts require rather than the scale that's been available, what this specific decade is calling you toward, how to love in ways that include rather than exceed the people beside you, and what the missing element in your chart has been preparing you for. These are not prescriptions. They are the chart's answer to the questions you've already been quietly living with."},
      synthesis: {teaser:"You are someone built for growth and for building — not as an ambition but as a structural fact. The arc of your life is a story of gradually finding the right scale for the vision you've always carried: starting with what's accessible, discovering what's actually possible, and working toward what was always the real point. This reading places you inside that arc with precision — and names exactly where you are standing in it right now."},
    },
    decade: {theme:"Real Growth Visible", teaser:"This decade is when the building becomes visible — the investment of the previous chapters is showing its returns, and the direction is clear."},
    compatibility: {teaser:"You thrive with partners who are also growing toward something — someone with their own direction and substance, so the relationship adds dimension rather than limiting it."},
  },

  // ── 甲 Yang Wood — additional strength variants ─────────────────────────
  "甲_moderate_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and that specific absence has been one of the most formative forces in your life, shaping you more than most of what is present. For the Oak, what's missing isn't what failed to grow. It is the particular condition the tree has been waiting for — the season that teaches the roots exactly how deep they go. This reading names what's absent, what that absence has been quietly building in you, and when the missing season finally arrives."}, path:{teaser:"Your chart holds an unambiguous verdict on how you were designed to succeed: through building, originating, and growing something with real substance that simply would not exist without you. The conventional path — inheriting someone else's structure, climbing someone else's hierarchy — can be executed but never sustained, because it asks you to stop reaching in the direction your nature requires. The closer you get to building something genuinely yours, the more inexhaustible your energy becomes. This is not coincidence. This is the architecture of how success works for you."}, bonds:{teaser:"The connections in your chart don't decorate your life — they become part of its structure. When you commit to a person or a project, something in your chart binds to it in a way that begins to feel like identity rather than choice. The Oak doesn't grow around its roots — it becomes them. This reading explores what that means for how you love, what you build, and why some commitments have cost you more to leave than anyone on the outside could possibly understand."}, strengths:{teaser:"You carry three capacities that were never cultivated — they arrived with you. A vision-making ability that perceives what something could become before others can see what it is. An initiating force — the genuine willingness to go first, to begin what hasn't yet been started — that most people simply do not have. And a structural integrity that makes you someone others can actually build on, not just admire. These aren't your best moments. They are your default."}, challenges:{teaser:"The same force that drives your growth — the forward orientation, the structural reach toward what could be — is also the force that makes it genuinely difficult to be fully present in what already is. There is a recurring pattern in the Oak's life: reaching for the next stage before the current one has taken root, growing past a difficulty before it's been fully integrated. This reading names the specific shape that pattern takes in your chart, and what the counterforce looks like."}, love:{teaser:"You love with a generosity that is structural rather than performed — an investment in your partner's flourishing that comes as naturally as the tree offers shade. The Oak loves by providing: stability, direction, the sense that something lasting is being built here. What the chart also shows is the specific tension that comes with loving as an Oak — the same momentum that is your greatest gift can leave your partner feeling like they're being grown alongside rather than genuinely with. This reading names what balance looks like."}, career:{teaser:"The work that generates real results for you shares one quality: it builds something that wouldn't exist without you. Not maintains. Not executes. Creates. Whether that's founding, originating, or growing something from genuine vision — your energy is most inexhaustible when you're making something real from nothing. The chart also names the specific intersection where your particular combination of vision and structural capacity produces work that is genuinely difficult to replicate — and why you've been operating below that scale."}, chapter:{teaser:"The decade you're living right now has a specific growth quality that this reading names in detail — a period when foundations that have been laid for years are ready to support something more significant and more visible. The ring of growth you're in is not the largest you'll ever live, but it is the one that determines the scale of everything that follows. What you build in this chapter sets the frame for the next three. This reading names what that means for you specifically."}, year:{teaser:"2026 carries a fire quality that accelerates whatever you've already been building — not a year for beginnings, but a year for the next significant form of what's been accumulating. The pressure of a fire year for the Oak is not destructive. It is clarifying: it burns what doesn't belong and reveals the strength of what remains. This reading names what specifically is ready to grow this year, and what the fire of 2026 is clearing the path for in your particular chart."}, council:{teaser:"Four orientations are waiting in the full reading: how to build at the scale your genuine gifts require rather than the scale that's been available, what this specific decade is calling you toward, how to love in ways that include rather than exceed the people beside you, and what the missing element in your chart has been preparing you for. These are not prescriptions. They are the chart's answer to the questions you've already been quietly living with."}, synthesis:{teaser:"You are someone built for growth and for building — not as an ambition but as a structural fact. The arc of your life is a story of gradually finding the right scale for the vision you've always carried: starting with what's accessible, discovering what's actually possible, and working toward what was always the real point. This reading places you inside that arc with precision — and names exactly where you are standing in it right now."} }, decade:{theme:"Direction Clarifying", teaser:"This decade is clarifying where the growth is actually heading — the reaching has a target now, and what you're building is becoming more specific."}, compatibility:{teaser:"You need a partner who is also growing toward something real — someone with their own direction, so the relationship becomes a shared project rather than a supporting role."} },
  "甲_extremely_strong_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and that specific absence has been one of the most formative forces in your life, shaping you more than most of what is present. For the Oak, what's missing isn't what failed to grow. It is the particular condition the tree has been waiting for — the season that teaches the roots exactly how deep they go. This reading names what's absent, what that absence has been quietly building in you, and when the missing season finally arrives."}, path:{teaser:"Your chart holds an unambiguous verdict on how you were designed to succeed: through building, originating, and growing something with real substance that simply would not exist without you. The conventional path — inheriting someone else's structure, climbing someone else's hierarchy — can be executed but never sustained, because it asks you to stop reaching in the direction your nature requires. The closer you get to building something genuinely yours, the more inexhaustible your energy becomes. This is not coincidence. This is the architecture of how success works for you."}, bonds:{teaser:"The connections in your chart don't decorate your life — they become part of its structure. When you commit to a person or a project, something in your chart binds to it in a way that begins to feel like identity rather than choice. The Oak doesn't grow around its roots — it becomes them. This reading explores what that means for how you love, what you build, and why some commitments have cost you more to leave than anyone on the outside could possibly understand."}, strengths:{teaser:"You carry three capacities that were never cultivated — they arrived with you. A vision-making ability that perceives what something could become before others can see what it is. An initiating force — the genuine willingness to go first, to begin what hasn't yet been started — that most people simply do not have. And a structural integrity that makes you someone others can actually build on, not just admire. These aren't your best moments. They are your default."}, challenges:{teaser:"The same force that drives your growth — the forward orientation, the structural reach toward what could be — is also the force that makes it genuinely difficult to be fully present in what already is. There is a recurring pattern in the Oak's life: reaching for the next stage before the current one has taken root, growing past a difficulty before it's been fully integrated. This reading names the specific shape that pattern takes in your chart, and what the counterforce looks like."}, love:{teaser:"You love with a generosity that is structural rather than performed — an investment in your partner's flourishing that comes as naturally as the tree offers shade. The Oak loves by providing: stability, direction, the sense that something lasting is being built here. What the chart also shows is the specific tension that comes with loving as an Oak — the same momentum that is your greatest gift can leave your partner feeling like they're being grown alongside rather than genuinely with. This reading names what balance looks like."}, career:{teaser:"The work that generates real results for you shares one quality: it builds something that wouldn't exist without you. Not maintains. Not executes. Creates. Whether that's founding, originating, or growing something from genuine vision — your energy is most inexhaustible when you're making something real from nothing. The chart also names the specific intersection where your particular combination of vision and structural capacity produces work that is genuinely difficult to replicate — and why you've been operating below that scale."}, chapter:{teaser:"The decade you're living right now has a specific growth quality that this reading names in detail — a period when foundations that have been laid for years are ready to support something more significant and more visible. The ring of growth you're in is not the largest you'll ever live, but it is the one that determines the scale of everything that follows. What you build in this chapter sets the frame for the next three. This reading names what that means for you specifically."}, year:{teaser:"2026 carries a fire quality that accelerates whatever you've already been building — not a year for beginnings, but a year for the next significant form of what's been accumulating. The pressure of a fire year for the Oak is not destructive. It is clarifying: it burns what doesn't belong and reveals the strength of what remains. This reading names what specifically is ready to grow this year, and what the fire of 2026 is clearing the path for in your particular chart."}, council:{teaser:"Four orientations are waiting in the full reading: how to build at the scale your genuine gifts require rather than the scale that's been available, what this specific decade is calling you toward, how to love in ways that include rather than exceed the people beside you, and what the missing element in your chart has been preparing you for. These are not prescriptions. They are the chart's answer to the questions you've already been quietly living with."}, synthesis:{teaser:"You are someone built for growth and for building — not as an ambition but as a structural fact. The arc of your life is a story of gradually finding the right scale for the vision you've always carried: starting with what's accessible, discovering what's actually possible, and working toward what was always the real point. This reading places you inside that arc with precision — and names exactly where you are standing in it right now."} }, decade:{theme:"Vision Taking Form", teaser:"This decade is when what you've always been able to see becomes something others can see too — the vision is finding its form."}, compatibility:{teaser:"You need a partner with deep roots and genuine substance — someone who is not moved by your strength but genuinely grounded beside it."} },
  "甲_weak_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and that specific absence has been one of the most formative forces in your life, shaping you more than most of what is present. For the Oak, what's missing isn't what failed to grow. It is the particular condition the tree has been waiting for — the season that teaches the roots exactly how deep they go. This reading names what's absent, what that absence has been quietly building in you, and when the missing season finally arrives."}, path:{teaser:"Your chart holds an unambiguous verdict on how you were designed to succeed: through building, originating, and growing something with real substance that simply would not exist without you. The conventional path — inheriting someone else's structure, climbing someone else's hierarchy — can be executed but never sustained, because it asks you to stop reaching in the direction your nature requires. The closer you get to building something genuinely yours, the more inexhaustible your energy becomes. This is not coincidence. This is the architecture of how success works for you."}, bonds:{teaser:"The connections in your chart don't decorate your life — they become part of its structure. When you commit to a person or a project, something in your chart binds to it in a way that begins to feel like identity rather than choice. The Oak doesn't grow around its roots — it becomes them. This reading explores what that means for how you love, what you build, and why some commitments have cost you more to leave than anyone on the outside could possibly understand."}, strengths:{teaser:"You carry three capacities that were never cultivated — they arrived with you. A vision-making ability that perceives what something could become before others can see what it is. An initiating force — the genuine willingness to go first, to begin what hasn't yet been started — that most people simply do not have. And a structural integrity that makes you someone others can actually build on, not just admire. These aren't your best moments. They are your default."}, challenges:{teaser:"The same force that drives your growth — the forward orientation, the structural reach toward what could be — is also the force that makes it genuinely difficult to be fully present in what already is. There is a recurring pattern in the Oak's life: reaching for the next stage before the current one has taken root, growing past a difficulty before it's been fully integrated. This reading names the specific shape that pattern takes in your chart, and what the counterforce looks like."}, love:{teaser:"You love with a generosity that is structural rather than performed — an investment in your partner's flourishing that comes as naturally as the tree offers shade. The Oak loves by providing: stability, direction, the sense that something lasting is being built here. What the chart also shows is the specific tension that comes with loving as an Oak — the same momentum that is your greatest gift can leave your partner feeling like they're being grown alongside rather than genuinely with. This reading names what balance looks like."}, career:{teaser:"The work that generates real results for you shares one quality: it builds something that wouldn't exist without you. Not maintains. Not executes. Creates. Whether that's founding, originating, or growing something from genuine vision — your energy is most inexhaustible when you're making something real from nothing. The chart also names the specific intersection where your particular combination of vision and structural capacity produces work that is genuinely difficult to replicate — and why you've been operating below that scale."}, chapter:{teaser:"The decade you're living right now has a specific growth quality that this reading names in detail — a period when foundations that have been laid for years are ready to support something more significant and more visible. The ring of growth you're in is not the largest you'll ever live, but it is the one that determines the scale of everything that follows. What you build in this chapter sets the frame for the next three. This reading names what that means for you specifically."}, year:{teaser:"2026 carries a fire quality that accelerates whatever you've already been building — not a year for beginnings, but a year for the next significant form of what's been accumulating. The pressure of a fire year for the Oak is not destructive. It is clarifying: it burns what doesn't belong and reveals the strength of what remains. This reading names what specifically is ready to grow this year, and what the fire of 2026 is clearing the path for in your particular chart."}, council:{teaser:"Four orientations are waiting in the full reading: how to build at the scale your genuine gifts require rather than the scale that's been available, what this specific decade is calling you toward, how to love in ways that include rather than exceed the people beside you, and what the missing element in your chart has been preparing you for. These are not prescriptions. They are the chart's answer to the questions you've already been quietly living with."}, synthesis:{teaser:"You are someone built for growth and for building — not as an ambition but as a structural fact. The arc of your life is a story of gradually finding the right scale for the vision you've always carried: starting with what's accessible, discovering what's actually possible, and working toward what was always the real point. This reading places you inside that arc with precision — and names exactly where you are standing in it right now."} }, decade:{theme:"Better Conditions Found", teaser:"This decade is about finding the environments that actually support your growth — the conditions are improving, and what grows in good soil is showing itself."}, compatibility:{teaser:"You thrive with partners who genuinely nourish — someone who provides real stability and support in a relationship where reciprocity is not an aspiration but a practice."} },
  "甲_extremely_weak_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and that specific absence has been one of the most formative forces in your life, shaping you more than most of what is present. For the Oak, what's missing isn't what failed to grow. It is the particular condition the tree has been waiting for — the season that teaches the roots exactly how deep they go. This reading names what's absent, what that absence has been quietly building in you, and when the missing season finally arrives."}, path:{teaser:"Your chart holds an unambiguous verdict on how you were designed to succeed: through building, originating, and growing something with real substance that simply would not exist without you. The conventional path — inheriting someone else's structure, climbing someone else's hierarchy — can be executed but never sustained, because it asks you to stop reaching in the direction your nature requires. The closer you get to building something genuinely yours, the more inexhaustible your energy becomes. This is not coincidence. This is the architecture of how success works for you."}, bonds:{teaser:"The connections in your chart don't decorate your life — they become part of its structure. When you commit to a person or a project, something in your chart binds to it in a way that begins to feel like identity rather than choice. The Oak doesn't grow around its roots — it becomes them. This reading explores what that means for how you love, what you build, and why some commitments have cost you more to leave than anyone on the outside could possibly understand."}, strengths:{teaser:"You carry three capacities that were never cultivated — they arrived with you. A vision-making ability that perceives what something could become before others can see what it is. An initiating force — the genuine willingness to go first, to begin what hasn't yet been started — that most people simply do not have. And a structural integrity that makes you someone others can actually build on, not just admire. These aren't your best moments. They are your default."}, challenges:{teaser:"The same force that drives your growth — the forward orientation, the structural reach toward what could be — is also the force that makes it genuinely difficult to be fully present in what already is. There is a recurring pattern in the Oak's life: reaching for the next stage before the current one has taken root, growing past a difficulty before it's been fully integrated. This reading names the specific shape that pattern takes in your chart, and what the counterforce looks like."}, love:{teaser:"You love with a generosity that is structural rather than performed — an investment in your partner's flourishing that comes as naturally as the tree offers shade. The Oak loves by providing: stability, direction, the sense that something lasting is being built here. What the chart also shows is the specific tension that comes with loving as an Oak — the same momentum that is your greatest gift can leave your partner feeling like they're being grown alongside rather than genuinely with. This reading names what balance looks like."}, career:{teaser:"The work that generates real results for you shares one quality: it builds something that wouldn't exist without you. Not maintains. Not executes. Creates. Whether that's founding, originating, or growing something from genuine vision — your energy is most inexhaustible when you're making something real from nothing. The chart also names the specific intersection where your particular combination of vision and structural capacity produces work that is genuinely difficult to replicate — and why you've been operating below that scale."}, chapter:{teaser:"The decade you're living right now has a specific growth quality that this reading names in detail — a period when foundations that have been laid for years are ready to support something more significant and more visible. The ring of growth you're in is not the largest you'll ever live, but it is the one that determines the scale of everything that follows. What you build in this chapter sets the frame for the next three. This reading names what that means for you specifically."}, year:{teaser:"2026 carries a fire quality that accelerates whatever you've already been building — not a year for beginnings, but a year for the next significant form of what's been accumulating. The pressure of a fire year for the Oak is not destructive. It is clarifying: it burns what doesn't belong and reveals the strength of what remains. This reading names what specifically is ready to grow this year, and what the fire of 2026 is clearing the path for in your particular chart."}, council:{teaser:"Four orientations are waiting in the full reading: how to build at the scale your genuine gifts require rather than the scale that's been available, what this specific decade is calling you toward, how to love in ways that include rather than exceed the people beside you, and what the missing element in your chart has been preparing you for. These are not prescriptions. They are the chart's answer to the questions you've already been quietly living with."}, synthesis:{teaser:"You are someone built for growth and for building — not as an ambition but as a structural fact. The arc of your life is a story of gradually finding the right scale for the vision you've always carried: starting with what's accessible, discovering what's actually possible, and working toward what was always the real point. This reading places you inside that arc with precision — and names exactly where you are standing in it right now."} }, decade:{theme:"Learning the Soil", teaser:"This decade is about discovering which conditions actually produce your growth — the discernment you're developing is one of your most important assets."}, compatibility:{teaser:"You need a partner who provides genuine stability and nourishment — not someone you have to convince to support you, but someone for whom that support is natural and real."} },

  // ── 丙 Yang Fire ────────────────────────────────────────────────────────
  "丙_extremely_strong_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart has a specific element missing — and for someone built the way you are, that absence isn't a dimming of your light. It is the precise condition that has required your light to shine in a particular direction, to develop a quality it wouldn't have developed if everything had been present. The missing element in the Sun's chart is not the cloud that blocks the light. It is the specific sky the Sun has needed to learn to cross. This reading names what that means for your particular life."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through genuine impact, through the kind of influence that reaches people and leaves something changed in the exchange. The transactional path — the work done without investment, without real warmth directed at a real outcome — consistently underperforms for you even when it technically succeeds. The closer your work gets to genuine illumination of something that matters, the more natural your energy becomes. This is the architecture of your success, and it's been pointing this way the whole time."}, bonds:{teaser:"The connections in your chart carry a quality of real heat — when you commit to something or someone, you bring the full warmth of what you are to it, and the people who receive that know they're receiving something rare. The Sun's bonds have a specific quality: they're generative. Things grow in your presence that wouldn't grow without you. This reading explores what that means for how you love, what you've created in others, and why the depth of your warmth carries both a gift and a responsibility."}, strengths:{teaser:"You carry three genuine capacities. A natural presence that creates trust before you've earned it — because warmth at this level reads as safety to people who need safety. A capacity for inspiration that comes from real conviction rather than performance, which means it works in rooms where performance would fail. And a consistency of warmth that makes you someone people return to, build on, and tell others about. These are not your best moments. They are your operating mode."}, challenges:{teaser:"The same radiance that draws people toward you creates a specific challenge: it is very difficult to be invisible when you need to be, very difficult to modulate something that is not a volume knob but a fundamental quality of presence. The Sun's recurring tension is between the genuine cost of being constantly illuminated and the fact that dimming is not actually available as an option. This reading names the specific shape that tension takes in your chart and what working with it — rather than against it — looks like."}, love:{teaser:"You love with an openness and generosity that is real rather than performed — a quality of warmth directed at a specific person that makes them feel genuinely seen and genuinely valued in ways that are rare. The Sun loves by illuminating: the person in your orbit sees themselves more clearly, more favorably, more fully than they did before. What the chart also shows is the specific work of the Sun in love — ensuring that the warmth is received rather than consumed, and that what you're illuminating is seen back. This reading names what that balance looks like."}, career:{teaser:"The work that generates real results for you involves genuine influence — reaching people, moving something in them, leaving the exchange different than it was before. The work done without that genuine illumination — the technical execution without the real heat — consistently drains you even when it succeeds. Your chart names a specific intersection of presence and conviction where your particular combination of qualities produces work that is genuinely difficult to replicate, and a specific domain where that intersection is most powerful."}, chapter:{teaser:"The decade you're living right now has a specific quality of expansion — a period when the range of your influence is growing and the work you've been building toward is finding a larger stage. The arc of sky you're moving through right now is not the largest you'll cross — but it is the one that establishes the scale of the rest. This reading names what this decade specifically is expanding, what it's asking of you, and what the Sun is being positioned to illuminate next."}, year:{teaser:"2026 brings fire meeting fire — a year where your natural energy finds a resonant amplification that is powerful and requires conscious direction. This is not the year to moderate the light. It is the year to direct it with more precision than you've needed before, toward what is genuinely worth illuminating. This reading names what 2026 is specifically amplifying in your chart, what the fire of this year is clearing the path for, and how to work with that amplification rather than being scattered by it."}, council:{teaser:"Four orientations are waiting in the full reading: how to work at the scale of your genuine influence rather than the scale that's been available, what this decade is expanding and what it requires from you, how the warmth you carry functions best in love and where it needs protecting, and what the missing element in your chart has been building toward. These are the chart's answers to questions you've been living with longer than you realize."}, synthesis:{teaser:"You are someone whose presence is genuinely generative — and the arc of your life is one of finding the arenas and the people that are worthy of what you illuminate. The Sun doesn't choose whether to shine. The question has always been where to point the light. This reading places you inside the arc of your chart — and names precisely where you are in the crossing, what sky you're moving through, and what the light is reaching toward next."} }, decade:{theme:"Scale Expanding", teaser:"This decade is expanding the scale of your impact — what you're building is becoming something that operates at the level your genuine presence has always been suited for."}, compatibility:{teaser:"You need a partner with real substance and their own warmth — someone who is not diminished by your presence but genuinely illuminated by it."} },
  "丙_strong_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart has a specific element missing — and for someone built the way you are, that absence isn't a dimming of your light. It is the precise condition that has required your light to shine in a particular direction, to develop a quality it wouldn't have developed if everything had been present. The missing element in the Sun's chart is not the cloud that blocks the light. It is the specific sky the Sun has needed to learn to cross. This reading names what that means for your particular life."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through genuine impact, through the kind of influence that reaches people and leaves something changed in the exchange. The transactional path — the work done without investment, without real warmth directed at a real outcome — consistently underperforms for you even when it technically succeeds. The closer your work gets to genuine illumination of something that matters, the more natural your energy becomes. This is the architecture of your success, and it's been pointing this way the whole time."}, bonds:{teaser:"The connections in your chart carry a quality of real heat — when you commit to something or someone, you bring the full warmth of what you are to it, and the people who receive that know they're receiving something rare. The Sun's bonds have a specific quality: they're generative. Things grow in your presence that wouldn't grow without you. This reading explores what that means for how you love, what you've created in others, and why the depth of your warmth carries both a gift and a responsibility."}, strengths:{teaser:"You carry three genuine capacities. A natural presence that creates trust before you've earned it — because warmth at this level reads as safety to people who need safety. A capacity for inspiration that comes from real conviction rather than performance, which means it works in rooms where performance would fail. And a consistency of warmth that makes you someone people return to, build on, and tell others about. These are not your best moments. They are your operating mode."}, challenges:{teaser:"The same radiance that draws people toward you creates a specific challenge: it is very difficult to be invisible when you need to be, very difficult to modulate something that is not a volume knob but a fundamental quality of presence. The Sun's recurring tension is between the genuine cost of being constantly illuminated and the fact that dimming is not actually available as an option. This reading names the specific shape that tension takes in your chart and what working with it — rather than against it — looks like."}, love:{teaser:"You love with an openness and generosity that is real rather than performed — a quality of warmth directed at a specific person that makes them feel genuinely seen and genuinely valued in ways that are rare. The Sun loves by illuminating: the person in your orbit sees themselves more clearly, more favorably, more fully than they did before. What the chart also shows is the specific work of the Sun in love — ensuring that the warmth is received rather than consumed, and that what you're illuminating is seen back. This reading names what that balance looks like."}, career:{teaser:"The work that generates real results for you involves genuine influence — reaching people, moving something in them, leaving the exchange different than it was before. The work done without that genuine illumination — the technical execution without the real heat — consistently drains you even when it succeeds. Your chart names a specific intersection of presence and conviction where your particular combination of qualities produces work that is genuinely difficult to replicate, and a specific domain where that intersection is most powerful."}, chapter:{teaser:"The decade you're living right now has a specific quality of expansion — a period when the range of your influence is growing and the work you've been building toward is finding a larger stage. The arc of sky you're moving through right now is not the largest you'll cross — but it is the one that establishes the scale of the rest. This reading names what this decade specifically is expanding, what it's asking of you, and what the Sun is being positioned to illuminate next."}, year:{teaser:"2026 brings fire meeting fire — a year where your natural energy finds a resonant amplification that is powerful and requires conscious direction. This is not the year to moderate the light. It is the year to direct it with more precision than you've needed before, toward what is genuinely worth illuminating. This reading names what 2026 is specifically amplifying in your chart, what the fire of this year is clearing the path for, and how to work with that amplification rather than being scattered by it."}, council:{teaser:"Four orientations are waiting in the full reading: how to work at the scale of your genuine influence rather than the scale that's been available, what this decade is expanding and what it requires from you, how the warmth you carry functions best in love and where it needs protecting, and what the missing element in your chart has been building toward. These are the chart's answers to questions you've been living with longer than you realize."}, synthesis:{teaser:"You are someone whose presence is genuinely generative — and the arc of your life is one of finding the arenas and the people that are worthy of what you illuminate. The Sun doesn't choose whether to shine. The question has always been where to point the light. This reading places you inside the arc of your chart — and names precisely where you are in the crossing, what sky you're moving through, and what the light is reaching toward next."} }, decade:{theme:"Influence Expanding", teaser:"This decade is expanding the range of what you touch — the warmth and leadership that have always been present are finding a larger stage."}, compatibility:{teaser:"You thrive with partners who have their own warmth and substance — someone who brings genuine light of their own so the relationship is a conversation between two presences."} },
  "丙_moderate_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart has a specific element missing — and for someone built the way you are, that absence isn't a dimming of your light. It is the precise condition that has required your light to shine in a particular direction, to develop a quality it wouldn't have developed if everything had been present. The missing element in the Sun's chart is not the cloud that blocks the light. It is the specific sky the Sun has needed to learn to cross. This reading names what that means for your particular life."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through genuine impact, through the kind of influence that reaches people and leaves something changed in the exchange. The transactional path — the work done without investment, without real warmth directed at a real outcome — consistently underperforms for you even when it technically succeeds. The closer your work gets to genuine illumination of something that matters, the more natural your energy becomes. This is the architecture of your success, and it's been pointing this way the whole time."}, bonds:{teaser:"The connections in your chart carry a quality of real heat — when you commit to something or someone, you bring the full warmth of what you are to it, and the people who receive that know they're receiving something rare. The Sun's bonds have a specific quality: they're generative. Things grow in your presence that wouldn't grow without you. This reading explores what that means for how you love, what you've created in others, and why the depth of your warmth carries both a gift and a responsibility."}, strengths:{teaser:"You carry three genuine capacities. A natural presence that creates trust before you've earned it — because warmth at this level reads as safety to people who need safety. A capacity for inspiration that comes from real conviction rather than performance, which means it works in rooms where performance would fail. And a consistency of warmth that makes you someone people return to, build on, and tell others about. These are not your best moments. They are your operating mode."}, challenges:{teaser:"The same radiance that draws people toward you creates a specific challenge: it is very difficult to be invisible when you need to be, very difficult to modulate something that is not a volume knob but a fundamental quality of presence. The Sun's recurring tension is between the genuine cost of being constantly illuminated and the fact that dimming is not actually available as an option. This reading names the specific shape that tension takes in your chart and what working with it — rather than against it — looks like."}, love:{teaser:"You love with an openness and generosity that is real rather than performed — a quality of warmth directed at a specific person that makes them feel genuinely seen and genuinely valued in ways that are rare. The Sun loves by illuminating: the person in your orbit sees themselves more clearly, more favorably, more fully than they did before. What the chart also shows is the specific work of the Sun in love — ensuring that the warmth is received rather than consumed, and that what you're illuminating is seen back. This reading names what that balance looks like."}, career:{teaser:"The work that generates real results for you involves genuine influence — reaching people, moving something in them, leaving the exchange different than it was before. The work done without that genuine illumination — the technical execution without the real heat — consistently drains you even when it succeeds. Your chart names a specific intersection of presence and conviction where your particular combination of qualities produces work that is genuinely difficult to replicate, and a specific domain where that intersection is most powerful."}, chapter:{teaser:"The decade you're living right now has a specific quality of expansion — a period when the range of your influence is growing and the work you've been building toward is finding a larger stage. The arc of sky you're moving through right now is not the largest you'll cross — but it is the one that establishes the scale of the rest. This reading names what this decade specifically is expanding, what it's asking of you, and what the Sun is being positioned to illuminate next."}, year:{teaser:"2026 brings fire meeting fire — a year where your natural energy finds a resonant amplification that is powerful and requires conscious direction. This is not the year to moderate the light. It is the year to direct it with more precision than you've needed before, toward what is genuinely worth illuminating. This reading names what 2026 is specifically amplifying in your chart, what the fire of this year is clearing the path for, and how to work with that amplification rather than being scattered by it."}, council:{teaser:"Four orientations are waiting in the full reading: how to work at the scale of your genuine influence rather than the scale that's been available, what this decade is expanding and what it requires from you, how the warmth you carry functions best in love and where it needs protecting, and what the missing element in your chart has been building toward. These are the chart's answers to questions you've been living with longer than you realize."}, synthesis:{teaser:"You are someone whose presence is genuinely generative — and the arc of your life is one of finding the arenas and the people that are worthy of what you illuminate. The Sun doesn't choose whether to shine. The question has always been where to point the light. This reading places you inside the arc of your chart — and names precisely where you are in the crossing, what sky you're moving through, and what the light is reaching toward next."} }, decade:{theme:"Warmth Finding Form", teaser:"This decade is giving shape to what you carry — the genuine care and warmth are finding the structures through which they create lasting impact."}, compatibility:{teaser:"You need a partner who appreciates genuine warmth and brings their own — a relationship where care is mutual and expressed, not assumed."} },
  "丙_weak_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart has a specific element missing — and for someone built the way you are, that absence isn't a dimming of your light. It is the precise condition that has required your light to shine in a particular direction, to develop a quality it wouldn't have developed if everything had been present. The missing element in the Sun's chart is not the cloud that blocks the light. It is the specific sky the Sun has needed to learn to cross. This reading names what that means for your particular life."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through genuine impact, through the kind of influence that reaches people and leaves something changed in the exchange. The transactional path — the work done without investment, without real warmth directed at a real outcome — consistently underperforms for you even when it technically succeeds. The closer your work gets to genuine illumination of something that matters, the more natural your energy becomes. This is the architecture of your success, and it's been pointing this way the whole time."}, bonds:{teaser:"The connections in your chart carry a quality of real heat — when you commit to something or someone, you bring the full warmth of what you are to it, and the people who receive that know they're receiving something rare. The Sun's bonds have a specific quality: they're generative. Things grow in your presence that wouldn't grow without you. This reading explores what that means for how you love, what you've created in others, and why the depth of your warmth carries both a gift and a responsibility."}, strengths:{teaser:"You carry three genuine capacities. A natural presence that creates trust before you've earned it — because warmth at this level reads as safety to people who need safety. A capacity for inspiration that comes from real conviction rather than performance, which means it works in rooms where performance would fail. And a consistency of warmth that makes you someone people return to, build on, and tell others about. These are not your best moments. They are your operating mode."}, challenges:{teaser:"The same radiance that draws people toward you creates a specific challenge: it is very difficult to be invisible when you need to be, very difficult to modulate something that is not a volume knob but a fundamental quality of presence. The Sun's recurring tension is between the genuine cost of being constantly illuminated and the fact that dimming is not actually available as an option. This reading names the specific shape that tension takes in your chart and what working with it — rather than against it — looks like."}, love:{teaser:"You love with an openness and generosity that is real rather than performed — a quality of warmth directed at a specific person that makes them feel genuinely seen and genuinely valued in ways that are rare. The Sun loves by illuminating: the person in your orbit sees themselves more clearly, more favorably, more fully than they did before. What the chart also shows is the specific work of the Sun in love — ensuring that the warmth is received rather than consumed, and that what you're illuminating is seen back. This reading names what that balance looks like."}, career:{teaser:"The work that generates real results for you involves genuine influence — reaching people, moving something in them, leaving the exchange different than it was before. The work done without that genuine illumination — the technical execution without the real heat — consistently drains you even when it succeeds. Your chart names a specific intersection of presence and conviction where your particular combination of qualities produces work that is genuinely difficult to replicate, and a specific domain where that intersection is most powerful."}, chapter:{teaser:"The decade you're living right now has a specific quality of expansion — a period when the range of your influence is growing and the work you've been building toward is finding a larger stage. The arc of sky you're moving through right now is not the largest you'll cross — but it is the one that establishes the scale of the rest. This reading names what this decade specifically is expanding, what it's asking of you, and what the Sun is being positioned to illuminate next."}, year:{teaser:"2026 brings fire meeting fire — a year where your natural energy finds a resonant amplification that is powerful and requires conscious direction. This is not the year to moderate the light. It is the year to direct it with more precision than you've needed before, toward what is genuinely worth illuminating. This reading names what 2026 is specifically amplifying in your chart, what the fire of this year is clearing the path for, and how to work with that amplification rather than being scattered by it."}, council:{teaser:"Four orientations are waiting in the full reading: how to work at the scale of your genuine influence rather than the scale that's been available, what this decade is expanding and what it requires from you, how the warmth you carry functions best in love and where it needs protecting, and what the missing element in your chart has been building toward. These are the chart's answers to questions you've been living with longer than you realize."}, synthesis:{teaser:"You are someone whose presence is genuinely generative — and the arc of your life is one of finding the arenas and the people that are worthy of what you illuminate. The Sun doesn't choose whether to shine. The question has always been where to point the light. This reading places you inside the arc of your chart — and names precisely where you are in the crossing, what sky you're moving through, and what the light is reaching toward next."} }, decade:{theme:"Better Conditions", teaser:"This decade is about finding the environments where your warmth is genuinely received and supported — the conditions are improving, and that matters more than you might think."}, compatibility:{teaser:"You need a partner who actively reciprocates your warmth and brings their own — a relationship where you're not the only one illuminating the space."} },
  "丙_extremely_weak_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart has a specific element missing — and for someone built the way you are, that absence isn't a dimming of your light. It is the precise condition that has required your light to shine in a particular direction, to develop a quality it wouldn't have developed if everything had been present. The missing element in the Sun's chart is not the cloud that blocks the light. It is the specific sky the Sun has needed to learn to cross. This reading names what that means for your particular life."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through genuine impact, through the kind of influence that reaches people and leaves something changed in the exchange. The transactional path — the work done without investment, without real warmth directed at a real outcome — consistently underperforms for you even when it technically succeeds. The closer your work gets to genuine illumination of something that matters, the more natural your energy becomes. This is the architecture of your success, and it's been pointing this way the whole time."}, bonds:{teaser:"The connections in your chart carry a quality of real heat — when you commit to something or someone, you bring the full warmth of what you are to it, and the people who receive that know they're receiving something rare. The Sun's bonds have a specific quality: they're generative. Things grow in your presence that wouldn't grow without you. This reading explores what that means for how you love, what you've created in others, and why the depth of your warmth carries both a gift and a responsibility."}, strengths:{teaser:"You carry three genuine capacities. A natural presence that creates trust before you've earned it — because warmth at this level reads as safety to people who need safety. A capacity for inspiration that comes from real conviction rather than performance, which means it works in rooms where performance would fail. And a consistency of warmth that makes you someone people return to, build on, and tell others about. These are not your best moments. They are your operating mode."}, challenges:{teaser:"The same radiance that draws people toward you creates a specific challenge: it is very difficult to be invisible when you need to be, very difficult to modulate something that is not a volume knob but a fundamental quality of presence. The Sun's recurring tension is between the genuine cost of being constantly illuminated and the fact that dimming is not actually available as an option. This reading names the specific shape that tension takes in your chart and what working with it — rather than against it — looks like."}, love:{teaser:"You love with an openness and generosity that is real rather than performed — a quality of warmth directed at a specific person that makes them feel genuinely seen and genuinely valued in ways that are rare. The Sun loves by illuminating: the person in your orbit sees themselves more clearly, more favorably, more fully than they did before. What the chart also shows is the specific work of the Sun in love — ensuring that the warmth is received rather than consumed, and that what you're illuminating is seen back. This reading names what that balance looks like."}, career:{teaser:"The work that generates real results for you involves genuine influence — reaching people, moving something in them, leaving the exchange different than it was before. The work done without that genuine illumination — the technical execution without the real heat — consistently drains you even when it succeeds. Your chart names a specific intersection of presence and conviction where your particular combination of qualities produces work that is genuinely difficult to replicate, and a specific domain where that intersection is most powerful."}, chapter:{teaser:"The decade you're living right now has a specific quality of expansion — a period when the range of your influence is growing and the work you've been building toward is finding a larger stage. The arc of sky you're moving through right now is not the largest you'll cross — but it is the one that establishes the scale of the rest. This reading names what this decade specifically is expanding, what it's asking of you, and what the Sun is being positioned to illuminate next."}, year:{teaser:"2026 brings fire meeting fire — a year where your natural energy finds a resonant amplification that is powerful and requires conscious direction. This is not the year to moderate the light. It is the year to direct it with more precision than you've needed before, toward what is genuinely worth illuminating. This reading names what 2026 is specifically amplifying in your chart, what the fire of this year is clearing the path for, and how to work with that amplification rather than being scattered by it."}, council:{teaser:"Four orientations are waiting in the full reading: how to work at the scale of your genuine influence rather than the scale that's been available, what this decade is expanding and what it requires from you, how the warmth you carry functions best in love and where it needs protecting, and what the missing element in your chart has been building toward. These are the chart's answers to questions you've been living with longer than you realize."}, synthesis:{teaser:"You are someone whose presence is genuinely generative — and the arc of your life is one of finding the arenas and the people that are worthy of what you illuminate. The Sun doesn't choose whether to shine. The question has always been where to point the light. This reading places you inside the arc of your chart — and names precisely where you are in the crossing, what sky you're moving through, and what the light is reaching toward next."} }, decade:{theme:"Safety Building", teaser:"This decade is building the safety and support that allow your genuine warmth to come through — the conditions are improving."}, compatibility:{teaser:"You need a partner who creates genuine safety and brings consistent warmth — someone for whom supporting you is natural, not effortful."} },

  // ── 戊 Yang Earth ───────────────────────────────────────────────────────
  "戊_extremely_strong_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Mountain, that absence is not a crack in the stone. It is the specific weather pattern that the stone has learned to read, to respond to, and to be shaped by over time. What's missing in your chart is not what the Mountain lacks. It is the element that has been teaching the Mountain something essential about its own nature — about what it can hold, what it can weather, and what it's actually made of. This reading names that element and what its absence has built."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through building something that genuinely holds — not the impressive result but the structure that's still standing and still serving years after it was built. The fast path, the dramatic gesture, the approach that prioritizes appearance over substance — these consistently cost you more than they return. The closer your work gets to building something with real and lasting solidity, the more natural your energy becomes. This is the architecture of your success, and it has always pointed this way."}, bonds:{teaser:"The commitments in your chart have a quality that is almost geological — when you give your word or your loyalty, it becomes part of the landscape. People don't just trust the Mountain. They build their lives around it, orient by it, make decisions based on its being there. This reading explores what that quality means for how you love, why your commitments carry a specific weight that others don't, and what the chart says about what you need from a bond in order for it to be real."}, strengths:{teaser:"You carry three capacities that are structural rather than situational. A sustained reliability that isn't effort — it's constitution. A patience with process that allows you to build what others give up on before it's finished. And a groundedness so consistent that it becomes a fact of other people's lives — something they account for, build on, and return to. These aren't qualities you've developed. They are what the Mountain was made of before anyone named them."}, challenges:{teaser:"The same solidity that makes you irreplaceable creates a specific challenge: it can be genuinely difficult to allow necessary change before you're certain it won't compromise the foundations. The Mountain's recurring tension is between holding and adjusting — between the profound strength of deep stability and the genuine cost of stability that becomes rigidity. This reading names the specific shape that challenge takes in your chart, and what the difference between holding your ground and refusing to move actually looks like."}, love:{teaser:"You love with a consistency and reliability that is genuinely rare — your partner can build on what you offer in a way that is structural rather than transactional. The Mountain loves by holding: by being the stable ground that allows the other person to reach further than they could without you. What the chart also shows is the specific work of loving as a Mountain — ensuring that the groundedness is experienced as support rather than weight, and that what you hold is a person who chooses to stay, not one who simply can't leave. This reading names the difference."}, career:{teaser:"The work that generates real results for you is the work of building something lasting — institutions, systems, structures that outlast the immediate project and continue producing value after the initial effort is complete. Your particular edge is not speed. It is solidity. And the specific intersection where your patience, your reliability, and your capacity for sustained effort meet the work that actually requires those qualities is where you produce something genuinely irreplaceable. This reading names what that intersection is."}, chapter:{teaser:"The decade you're living right now has a specific quality of consolidation — a period when what you've been building over years is proving its solidity and beginning to support something more significant. The elevation you're at right now is not the summit — but it is the altitude from which everything else becomes visible. This reading names what this decade specifically is consolidating in your chart, what it's asking the Mountain to become, and what the view from here makes possible."}, year:{teaser:"2026 brings fire on the mountain — a year where the warmth of a fire year activates what has been solid and patient, creating a specific productivity that the Mountain's patient effort has been preparing for. This is not a year to resist the heat. It is a year to use it — to bring to fruition what has been building, to allow what has been waiting to move. This reading names what 2026 is specifically activating in your chart, and what the Mountain is ready to produce this year."}, council:{teaser:"Four orientations are waiting in the full reading: how to build at the scale your chart describes rather than the scale that's been convenient, what this decade is consolidating and what it requires the Mountain to become, how your quality of reliability functions best in love and where it needs to remain porous, and what the missing element in your chart has been teaching the stone. These are the chart's answers to the questions the Mountain has been sitting with."}, synthesis:{teaser:"You are someone who provides genuine ground — and the arc of your life is one of building things worthy of the stability you bring to them. The Mountain doesn't prove its strength in a single moment. It proves it by being there across decades, through weather, through everything built on it and around it. This reading places you inside that arc — and names precisely where the Mountain stands, what it's holding up, and what it's positioned to become."} }, decade:{theme:"The Mountain Proves", teaser:"This decade is when the depth of what you've built becomes undeniable — the patience of the Mountain is showing its returns."}, compatibility:{teaser:"You need a partner with their own genuine groundedness — someone who stands on their own foundation beside yours, not someone who needs your stability to hold them up."} },
  "戊_strong_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Mountain, that absence is not a crack in the stone. It is the specific weather pattern that the stone has learned to read, to respond to, and to be shaped by over time. What's missing in your chart is not what the Mountain lacks. It is the element that has been teaching the Mountain something essential about its own nature — about what it can hold, what it can weather, and what it's actually made of. This reading names that element and what its absence has built."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through building something that genuinely holds — not the impressive result but the structure that's still standing and still serving years after it was built. The fast path, the dramatic gesture, the approach that prioritizes appearance over substance — these consistently cost you more than they return. The closer your work gets to building something with real and lasting solidity, the more natural your energy becomes. This is the architecture of your success, and it has always pointed this way."}, bonds:{teaser:"The commitments in your chart have a quality that is almost geological — when you give your word or your loyalty, it becomes part of the landscape. People don't just trust the Mountain. They build their lives around it, orient by it, make decisions based on its being there. This reading explores what that quality means for how you love, why your commitments carry a specific weight that others don't, and what the chart says about what you need from a bond in order for it to be real."}, strengths:{teaser:"You carry three capacities that are structural rather than situational. A sustained reliability that isn't effort — it's constitution. A patience with process that allows you to build what others give up on before it's finished. And a groundedness so consistent that it becomes a fact of other people's lives — something they account for, build on, and return to. These aren't qualities you've developed. They are what the Mountain was made of before anyone named them."}, challenges:{teaser:"The same solidity that makes you irreplaceable creates a specific challenge: it can be genuinely difficult to allow necessary change before you're certain it won't compromise the foundations. The Mountain's recurring tension is between holding and adjusting — between the profound strength of deep stability and the genuine cost of stability that becomes rigidity. This reading names the specific shape that challenge takes in your chart, and what the difference between holding your ground and refusing to move actually looks like."}, love:{teaser:"You love with a consistency and reliability that is genuinely rare — your partner can build on what you offer in a way that is structural rather than transactional. The Mountain loves by holding: by being the stable ground that allows the other person to reach further than they could without you. What the chart also shows is the specific work of loving as a Mountain — ensuring that the groundedness is experienced as support rather than weight, and that what you hold is a person who chooses to stay, not one who simply can't leave. This reading names the difference."}, career:{teaser:"The work that generates real results for you is the work of building something lasting — institutions, systems, structures that outlast the immediate project and continue producing value after the initial effort is complete. Your particular edge is not speed. It is solidity. And the specific intersection where your patience, your reliability, and your capacity for sustained effort meet the work that actually requires those qualities is where you produce something genuinely irreplaceable. This reading names what that intersection is."}, chapter:{teaser:"The decade you're living right now has a specific quality of consolidation — a period when what you've been building over years is proving its solidity and beginning to support something more significant. The elevation you're at right now is not the summit — but it is the altitude from which everything else becomes visible. This reading names what this decade specifically is consolidating in your chart, what it's asking the Mountain to become, and what the view from here makes possible."}, year:{teaser:"2026 brings fire on the mountain — a year where the warmth of a fire year activates what has been solid and patient, creating a specific productivity that the Mountain's patient effort has been preparing for. This is not a year to resist the heat. It is a year to use it — to bring to fruition what has been building, to allow what has been waiting to move. This reading names what 2026 is specifically activating in your chart, and what the Mountain is ready to produce this year."}, council:{teaser:"Four orientations are waiting in the full reading: how to build at the scale your chart describes rather than the scale that's been convenient, what this decade is consolidating and what it requires the Mountain to become, how your quality of reliability functions best in love and where it needs to remain porous, and what the missing element in your chart has been teaching the stone. These are the chart's answers to the questions the Mountain has been sitting with."}, synthesis:{teaser:"You are someone who provides genuine ground — and the arc of your life is one of building things worthy of the stability you bring to them. The Mountain doesn't prove its strength in a single moment. It proves it by being there across decades, through weather, through everything built on it and around it. This reading places you inside that arc — and names precisely where the Mountain stands, what it's holding up, and what it's positioned to become."} }, decade:{theme:"Structures Proving", teaser:"This decade is when what you've built proves its solidity — the patience of previous chapters is showing its returns."}, compatibility:{teaser:"You thrive with partners who appreciate and reciprocate genuine reliability — someone whose commitment is as real and sustained as yours."} },
  "戊_moderate_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Mountain, that absence is not a crack in the stone. It is the specific weather pattern that the stone has learned to read, to respond to, and to be shaped by over time. What's missing in your chart is not what the Mountain lacks. It is the element that has been teaching the Mountain something essential about its own nature — about what it can hold, what it can weather, and what it's actually made of. This reading names that element and what its absence has built."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through building something that genuinely holds — not the impressive result but the structure that's still standing and still serving years after it was built. The fast path, the dramatic gesture, the approach that prioritizes appearance over substance — these consistently cost you more than they return. The closer your work gets to building something with real and lasting solidity, the more natural your energy becomes. This is the architecture of your success, and it has always pointed this way."}, bonds:{teaser:"The commitments in your chart have a quality that is almost geological — when you give your word or your loyalty, it becomes part of the landscape. People don't just trust the Mountain. They build their lives around it, orient by it, make decisions based on its being there. This reading explores what that quality means for how you love, why your commitments carry a specific weight that others don't, and what the chart says about what you need from a bond in order for it to be real."}, strengths:{teaser:"You carry three capacities that are structural rather than situational. A sustained reliability that isn't effort — it's constitution. A patience with process that allows you to build what others give up on before it's finished. And a groundedness so consistent that it becomes a fact of other people's lives — something they account for, build on, and return to. These aren't qualities you've developed. They are what the Mountain was made of before anyone named them."}, challenges:{teaser:"The same solidity that makes you irreplaceable creates a specific challenge: it can be genuinely difficult to allow necessary change before you're certain it won't compromise the foundations. The Mountain's recurring tension is between holding and adjusting — between the profound strength of deep stability and the genuine cost of stability that becomes rigidity. This reading names the specific shape that challenge takes in your chart, and what the difference between holding your ground and refusing to move actually looks like."}, love:{teaser:"You love with a consistency and reliability that is genuinely rare — your partner can build on what you offer in a way that is structural rather than transactional. The Mountain loves by holding: by being the stable ground that allows the other person to reach further than they could without you. What the chart also shows is the specific work of loving as a Mountain — ensuring that the groundedness is experienced as support rather than weight, and that what you hold is a person who chooses to stay, not one who simply can't leave. This reading names the difference."}, career:{teaser:"The work that generates real results for you is the work of building something lasting — institutions, systems, structures that outlast the immediate project and continue producing value after the initial effort is complete. Your particular edge is not speed. It is solidity. And the specific intersection where your patience, your reliability, and your capacity for sustained effort meet the work that actually requires those qualities is where you produce something genuinely irreplaceable. This reading names what that intersection is."}, chapter:{teaser:"The decade you're living right now has a specific quality of consolidation — a period when what you've been building over years is proving its solidity and beginning to support something more significant. The elevation you're at right now is not the summit — but it is the altitude from which everything else becomes visible. This reading names what this decade specifically is consolidating in your chart, what it's asking the Mountain to become, and what the view from here makes possible."}, year:{teaser:"2026 brings fire on the mountain — a year where the warmth of a fire year activates what has been solid and patient, creating a specific productivity that the Mountain's patient effort has been preparing for. This is not a year to resist the heat. It is a year to use it — to bring to fruition what has been building, to allow what has been waiting to move. This reading names what 2026 is specifically activating in your chart, and what the Mountain is ready to produce this year."}, council:{teaser:"Four orientations are waiting in the full reading: how to build at the scale your chart describes rather than the scale that's been convenient, what this decade is consolidating and what it requires the Mountain to become, how your quality of reliability functions best in love and where it needs to remain porous, and what the missing element in your chart has been teaching the stone. These are the chart's answers to the questions the Mountain has been sitting with."}, synthesis:{teaser:"You are someone who provides genuine ground — and the arc of your life is one of building things worthy of the stability you bring to them. The Mountain doesn't prove its strength in a single moment. It proves it by being there across decades, through weather, through everything built on it and around it. This reading places you inside that arc — and names precisely where the Mountain stands, what it's holding up, and what it's positioned to become."} }, decade:{theme:"Steady Accumulation", teaser:"This decade is rewarding the consistent effort — what's been built with patience is showing its solidity."}, compatibility:{teaser:"You need a partner who matches your reliability — someone whose presence is as consistent as yours, so the relationship is genuinely mutual."} },
  "戊_weak_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Mountain, that absence is not a crack in the stone. It is the specific weather pattern that the stone has learned to read, to respond to, and to be shaped by over time. What's missing in your chart is not what the Mountain lacks. It is the element that has been teaching the Mountain something essential about its own nature — about what it can hold, what it can weather, and what it's actually made of. This reading names that element and what its absence has built."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through building something that genuinely holds — not the impressive result but the structure that's still standing and still serving years after it was built. The fast path, the dramatic gesture, the approach that prioritizes appearance over substance — these consistently cost you more than they return. The closer your work gets to building something with real and lasting solidity, the more natural your energy becomes. This is the architecture of your success, and it has always pointed this way."}, bonds:{teaser:"The commitments in your chart have a quality that is almost geological — when you give your word or your loyalty, it becomes part of the landscape. People don't just trust the Mountain. They build their lives around it, orient by it, make decisions based on its being there. This reading explores what that quality means for how you love, why your commitments carry a specific weight that others don't, and what the chart says about what you need from a bond in order for it to be real."}, strengths:{teaser:"You carry three capacities that are structural rather than situational. A sustained reliability that isn't effort — it's constitution. A patience with process that allows you to build what others give up on before it's finished. And a groundedness so consistent that it becomes a fact of other people's lives — something they account for, build on, and return to. These aren't qualities you've developed. They are what the Mountain was made of before anyone named them."}, challenges:{teaser:"The same solidity that makes you irreplaceable creates a specific challenge: it can be genuinely difficult to allow necessary change before you're certain it won't compromise the foundations. The Mountain's recurring tension is between holding and adjusting — between the profound strength of deep stability and the genuine cost of stability that becomes rigidity. This reading names the specific shape that challenge takes in your chart, and what the difference between holding your ground and refusing to move actually looks like."}, love:{teaser:"You love with a consistency and reliability that is genuinely rare — your partner can build on what you offer in a way that is structural rather than transactional. The Mountain loves by holding: by being the stable ground that allows the other person to reach further than they could without you. What the chart also shows is the specific work of loving as a Mountain — ensuring that the groundedness is experienced as support rather than weight, and that what you hold is a person who chooses to stay, not one who simply can't leave. This reading names the difference."}, career:{teaser:"The work that generates real results for you is the work of building something lasting — institutions, systems, structures that outlast the immediate project and continue producing value after the initial effort is complete. Your particular edge is not speed. It is solidity. And the specific intersection where your patience, your reliability, and your capacity for sustained effort meet the work that actually requires those qualities is where you produce something genuinely irreplaceable. This reading names what that intersection is."}, chapter:{teaser:"The decade you're living right now has a specific quality of consolidation — a period when what you've been building over years is proving its solidity and beginning to support something more significant. The elevation you're at right now is not the summit — but it is the altitude from which everything else becomes visible. This reading names what this decade specifically is consolidating in your chart, what it's asking the Mountain to become, and what the view from here makes possible."}, year:{teaser:"2026 brings fire on the mountain — a year where the warmth of a fire year activates what has been solid and patient, creating a specific productivity that the Mountain's patient effort has been preparing for. This is not a year to resist the heat. It is a year to use it — to bring to fruition what has been building, to allow what has been waiting to move. This reading names what 2026 is specifically activating in your chart, and what the Mountain is ready to produce this year."}, council:{teaser:"Four orientations are waiting in the full reading: how to build at the scale your chart describes rather than the scale that's been convenient, what this decade is consolidating and what it requires the Mountain to become, how your quality of reliability functions best in love and where it needs to remain porous, and what the missing element in your chart has been teaching the stone. These are the chart's answers to the questions the Mountain has been sitting with."}, synthesis:{teaser:"You are someone who provides genuine ground — and the arc of your life is one of building things worthy of the stability you bring to them. The Mountain doesn't prove its strength in a single moment. It proves it by being there across decades, through weather, through everything built on it and around it. This reading places you inside that arc — and names precisely where the Mountain stands, what it's holding up, and what it's positioned to become."} }, decade:{theme:"Support Structures Forming", teaser:"This decade is building the support that allows your genuine steadiness to come through."}, compatibility:{teaser:"You need a partner who actively provides stability and support — someone for whom holding ground beside you is natural and real."} },
  "戊_extremely_weak_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Mountain, that absence is not a crack in the stone. It is the specific weather pattern that the stone has learned to read, to respond to, and to be shaped by over time. What's missing in your chart is not what the Mountain lacks. It is the element that has been teaching the Mountain something essential about its own nature — about what it can hold, what it can weather, and what it's actually made of. This reading names that element and what its absence has built."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through building something that genuinely holds — not the impressive result but the structure that's still standing and still serving years after it was built. The fast path, the dramatic gesture, the approach that prioritizes appearance over substance — these consistently cost you more than they return. The closer your work gets to building something with real and lasting solidity, the more natural your energy becomes. This is the architecture of your success, and it has always pointed this way."}, bonds:{teaser:"The commitments in your chart have a quality that is almost geological — when you give your word or your loyalty, it becomes part of the landscape. People don't just trust the Mountain. They build their lives around it, orient by it, make decisions based on its being there. This reading explores what that quality means for how you love, why your commitments carry a specific weight that others don't, and what the chart says about what you need from a bond in order for it to be real."}, strengths:{teaser:"You carry three capacities that are structural rather than situational. A sustained reliability that isn't effort — it's constitution. A patience with process that allows you to build what others give up on before it's finished. And a groundedness so consistent that it becomes a fact of other people's lives — something they account for, build on, and return to. These aren't qualities you've developed. They are what the Mountain was made of before anyone named them."}, challenges:{teaser:"The same solidity that makes you irreplaceable creates a specific challenge: it can be genuinely difficult to allow necessary change before you're certain it won't compromise the foundations. The Mountain's recurring tension is between holding and adjusting — between the profound strength of deep stability and the genuine cost of stability that becomes rigidity. This reading names the specific shape that challenge takes in your chart, and what the difference between holding your ground and refusing to move actually looks like."}, love:{teaser:"You love with a consistency and reliability that is genuinely rare — your partner can build on what you offer in a way that is structural rather than transactional. The Mountain loves by holding: by being the stable ground that allows the other person to reach further than they could without you. What the chart also shows is the specific work of loving as a Mountain — ensuring that the groundedness is experienced as support rather than weight, and that what you hold is a person who chooses to stay, not one who simply can't leave. This reading names the difference."}, career:{teaser:"The work that generates real results for you is the work of building something lasting — institutions, systems, structures that outlast the immediate project and continue producing value after the initial effort is complete. Your particular edge is not speed. It is solidity. And the specific intersection where your patience, your reliability, and your capacity for sustained effort meet the work that actually requires those qualities is where you produce something genuinely irreplaceable. This reading names what that intersection is."}, chapter:{teaser:"The decade you're living right now has a specific quality of consolidation — a period when what you've been building over years is proving its solidity and beginning to support something more significant. The elevation you're at right now is not the summit — but it is the altitude from which everything else becomes visible. This reading names what this decade specifically is consolidating in your chart, what it's asking the Mountain to become, and what the view from here makes possible."}, year:{teaser:"2026 brings fire on the mountain — a year where the warmth of a fire year activates what has been solid and patient, creating a specific productivity that the Mountain's patient effort has been preparing for. This is not a year to resist the heat. It is a year to use it — to bring to fruition what has been building, to allow what has been waiting to move. This reading names what 2026 is specifically activating in your chart, and what the Mountain is ready to produce this year."}, council:{teaser:"Four orientations are waiting in the full reading: how to build at the scale your chart describes rather than the scale that's been convenient, what this decade is consolidating and what it requires the Mountain to become, how your quality of reliability functions best in love and where it needs to remain porous, and what the missing element in your chart has been teaching the stone. These are the chart's answers to the questions the Mountain has been sitting with."}, synthesis:{teaser:"You are someone who provides genuine ground — and the arc of your life is one of building things worthy of the stability you bring to them. The Mountain doesn't prove its strength in a single moment. It proves it by being there across decades, through weather, through everything built on it and around it. This reading places you inside that arc — and names precisely where the Mountain stands, what it's holding up, and what it's positioned to become."} }, decade:{theme:"Ground in Progress", teaser:"This decade is about building real ground — the foundations are becoming more solid, and the stability that will support everything else is being established."}, compatibility:{teaser:"You need a partner who is themselves well-grounded and who provides consistent, structural support."} },

  // ── 己 Yin Earth ────────────────────────────────────────────────────────
  "己_extremely_strong_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Field, the missing element is not what the soil lacks. It is the specific seed, the specific weather, the specific condition that has been teaching the Field something essential about what it can grow. The missing element in your chart is not what you need to add. It is what has been shaping the particular fertility you carry — a quality of nourishment that could only have developed through that specific absence. This reading names it, and what it's been building."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through cultivation, through the patient and attentive development of what's actually there — not what you wish were there, but what genuinely exists and has genuine potential. The forceful approach, the rapid scaling, the path that skips the tending — these consistently cost you more than they return. The closer your work gets to genuine cultivation of what deserves to grow, the more natural and inexhaustible your energy becomes."}, bonds:{teaser:"The connections in your chart have a quality of genuine nourishment — when you commit to a person or a project, you invest in its growth as naturally as the field receives the seed. Things take root in you. The people in your life have been changed by proximity to you in ways they may not fully recognize. This reading explores what that means for how you love, what you've grown in others without fully accounting for, and what you need to receive in order for the Field to remain fertile."}, strengths:{teaser:"You carry three genuine capacities. A sensitivity to what things need in order to grow — an almost diagnostic ability to assess what's flourishing and what's struggling and why. A patience with the actual pace of development that allows real growth to happen rather than forcing it into a form that looks finished before it is. And a quality of sustained care that is consistent across seasons — not dependent on being thanked or recognized, but real regardless. These are structural, not seasonal."}, challenges:{teaser:"The same nourishing quality that makes you genuinely valuable creates a specific challenge: the Field can deplete. When the care flows consistently outward without returning, when the Field is asked to keep producing without being replenished, something real is lost. The Field's recurring challenge is the question of your own nourishment — not as a secondary concern but as the primary condition that makes everything else possible. This reading names the specific pattern in your chart and what reciprocity needs to look like for you."}, love:{teaser:"You love with a quality of genuine investment in your partner's wellbeing and development — a care that is consistent, specific, and real rather than performed. The Field loves by nourishing: by creating conditions in which the other person grows, flourishes, and becomes more fully themselves. What the chart also shows is the specific work of loving as a Field — ensuring that you receive as much genuine nourishment as you give, and that the fertility of the relationship runs in both directions. This reading names what that looks like."}, career:{teaser:"The work that generates real results for you is the work of genuine cultivation — developing people, nurturing projects, tending to things that need patient care and real investment to become what they're capable of being. Your particular edge is not speed or force. It is the quality of your sustained attention and your ability to grow what others would have given up on. The chart names the specific domain where that cultivation produces results that are genuinely irreplaceable, and what you need from the environment to do your best work."}, chapter:{teaser:"The decade you're living right now has a specific quality of fruition — a period when what has been carefully cultivated over years is producing visible results, and what you've been tending to is showing its full form. The season you're growing through right now is not the most dramatic in your chart — but it may be the most productive. This reading names what this decade is specifically bringing to fruition, what it's asking the Field to grow, and what the harvest of this season makes possible."}, year:{teaser:"2026 brings fire that warms the field — a year where the heat activates what has been prepared, accelerating the growth that patient cultivation has made ready. For the Field, a fire year is the optimal condition for harvest: what has been growing under the surface is ready to come through, and the warmth of the year supports that emergence. This reading names what 2026 is specifically ripening in your chart, and what the Field is ready to produce this season."}, council:{teaser:"Four orientations are waiting in the full reading: how to cultivate at the scale that matches your genuine capacity rather than the scale that's been asked of you, what this decade is bringing to fruition and what it requires the Field to grow, how your nourishing quality functions best in love and what you need to receive, and what the missing element has been preparing the soil for. These are the chart's answers to the questions you've been tending."}, synthesis:{teaser:"You are someone who grows things — quietly, patiently, with a quality of care that is more powerful than it looks from the outside. The arc of your life is one of gradually finding the right fields and the right seeds for what you're capable of cultivating — and learning to receive the harvest rather than immediately turning to the next thing that needs tending. This reading places you inside that arc precisely, and names where the Field is in its season."} }, decade:{theme:"Full Fruition", teaser:"This decade is the full fruition of patient cultivation — what has been carefully tended across years is producing its most complete and visible results."}, compatibility:{teaser:"You need a partner who nourishes you with the depth you bring — someone whose care is real and structural, so the field stays fertile rather than being gradually depleted."} },
  "己_strong_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Field, the missing element is not what the soil lacks. It is the specific seed, the specific weather, the specific condition that has been teaching the Field something essential about what it can grow. The missing element in your chart is not what you need to add. It is what has been shaping the particular fertility you carry — a quality of nourishment that could only have developed through that specific absence. This reading names it, and what it's been building."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through cultivation, through the patient and attentive development of what's actually there — not what you wish were there, but what genuinely exists and has genuine potential. The forceful approach, the rapid scaling, the path that skips the tending — these consistently cost you more than they return. The closer your work gets to genuine cultivation of what deserves to grow, the more natural and inexhaustible your energy becomes."}, bonds:{teaser:"The connections in your chart have a quality of genuine nourishment — when you commit to a person or a project, you invest in its growth as naturally as the field receives the seed. Things take root in you. The people in your life have been changed by proximity to you in ways they may not fully recognize. This reading explores what that means for how you love, what you've grown in others without fully accounting for, and what you need to receive in order for the Field to remain fertile."}, strengths:{teaser:"You carry three genuine capacities. A sensitivity to what things need in order to grow — an almost diagnostic ability to assess what's flourishing and what's struggling and why. A patience with the actual pace of development that allows real growth to happen rather than forcing it into a form that looks finished before it is. And a quality of sustained care that is consistent across seasons — not dependent on being thanked or recognized, but real regardless. These are structural, not seasonal."}, challenges:{teaser:"The same nourishing quality that makes you genuinely valuable creates a specific challenge: the Field can deplete. When the care flows consistently outward without returning, when the Field is asked to keep producing without being replenished, something real is lost. The Field's recurring challenge is the question of your own nourishment — not as a secondary concern but as the primary condition that makes everything else possible. This reading names the specific pattern in your chart and what reciprocity needs to look like for you."}, love:{teaser:"You love with a quality of genuine investment in your partner's wellbeing and development — a care that is consistent, specific, and real rather than performed. The Field loves by nourishing: by creating conditions in which the other person grows, flourishes, and becomes more fully themselves. What the chart also shows is the specific work of loving as a Field — ensuring that you receive as much genuine nourishment as you give, and that the fertility of the relationship runs in both directions. This reading names what that looks like."}, career:{teaser:"The work that generates real results for you is the work of genuine cultivation — developing people, nurturing projects, tending to things that need patient care and real investment to become what they're capable of being. Your particular edge is not speed or force. It is the quality of your sustained attention and your ability to grow what others would have given up on. The chart names the specific domain where that cultivation produces results that are genuinely irreplaceable, and what you need from the environment to do your best work."}, chapter:{teaser:"The decade you're living right now has a specific quality of fruition — a period when what has been carefully cultivated over years is producing visible results, and what you've been tending to is showing its full form. The season you're growing through right now is not the most dramatic in your chart — but it may be the most productive. This reading names what this decade is specifically bringing to fruition, what it's asking the Field to grow, and what the harvest of this season makes possible."}, year:{teaser:"2026 brings fire that warms the field — a year where the heat activates what has been prepared, accelerating the growth that patient cultivation has made ready. For the Field, a fire year is the optimal condition for harvest: what has been growing under the surface is ready to come through, and the warmth of the year supports that emergence. This reading names what 2026 is specifically ripening in your chart, and what the Field is ready to produce this season."}, council:{teaser:"Four orientations are waiting in the full reading: how to cultivate at the scale that matches your genuine capacity rather than the scale that's been asked of you, what this decade is bringing to fruition and what it requires the Field to grow, how your nourishing quality functions best in love and what you need to receive, and what the missing element has been preparing the soil for. These are the chart's answers to the questions you've been tending."}, synthesis:{teaser:"You are someone who grows things — quietly, patiently, with a quality of care that is more powerful than it looks from the outside. The arc of your life is one of gradually finding the right fields and the right seeds for what you're capable of cultivating — and learning to receive the harvest rather than immediately turning to the next thing that needs tending. This reading places you inside that arc precisely, and names where the Field is in its season."} }, decade:{theme:"What Was Tended Grows", teaser:"This decade is bringing to fruition what has been patiently cultivated — the care invested is producing visible and real results."}, compatibility:{teaser:"You thrive with partners who reciprocate genuine nourishment — someone who tends to you with the same quality of care you bring to them."} },
  "己_moderate_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Field, the missing element is not what the soil lacks. It is the specific seed, the specific weather, the specific condition that has been teaching the Field something essential about what it can grow. The missing element in your chart is not what you need to add. It is what has been shaping the particular fertility you carry — a quality of nourishment that could only have developed through that specific absence. This reading names it, and what it's been building."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through cultivation, through the patient and attentive development of what's actually there — not what you wish were there, but what genuinely exists and has genuine potential. The forceful approach, the rapid scaling, the path that skips the tending — these consistently cost you more than they return. The closer your work gets to genuine cultivation of what deserves to grow, the more natural and inexhaustible your energy becomes."}, bonds:{teaser:"The connections in your chart have a quality of genuine nourishment — when you commit to a person or a project, you invest in its growth as naturally as the field receives the seed. Things take root in you. The people in your life have been changed by proximity to you in ways they may not fully recognize. This reading explores what that means for how you love, what you've grown in others without fully accounting for, and what you need to receive in order for the Field to remain fertile."}, strengths:{teaser:"You carry three genuine capacities. A sensitivity to what things need in order to grow — an almost diagnostic ability to assess what's flourishing and what's struggling and why. A patience with the actual pace of development that allows real growth to happen rather than forcing it into a form that looks finished before it is. And a quality of sustained care that is consistent across seasons — not dependent on being thanked or recognized, but real regardless. These are structural, not seasonal."}, challenges:{teaser:"The same nourishing quality that makes you genuinely valuable creates a specific challenge: the Field can deplete. When the care flows consistently outward without returning, when the Field is asked to keep producing without being replenished, something real is lost. The Field's recurring challenge is the question of your own nourishment — not as a secondary concern but as the primary condition that makes everything else possible. This reading names the specific pattern in your chart and what reciprocity needs to look like for you."}, love:{teaser:"You love with a quality of genuine investment in your partner's wellbeing and development — a care that is consistent, specific, and real rather than performed. The Field loves by nourishing: by creating conditions in which the other person grows, flourishes, and becomes more fully themselves. What the chart also shows is the specific work of loving as a Field — ensuring that you receive as much genuine nourishment as you give, and that the fertility of the relationship runs in both directions. This reading names what that looks like."}, career:{teaser:"The work that generates real results for you is the work of genuine cultivation — developing people, nurturing projects, tending to things that need patient care and real investment to become what they're capable of being. Your particular edge is not speed or force. It is the quality of your sustained attention and your ability to grow what others would have given up on. The chart names the specific domain where that cultivation produces results that are genuinely irreplaceable, and what you need from the environment to do your best work."}, chapter:{teaser:"The decade you're living right now has a specific quality of fruition — a period when what has been carefully cultivated over years is producing visible results, and what you've been tending to is showing its full form. The season you're growing through right now is not the most dramatic in your chart — but it may be the most productive. This reading names what this decade is specifically bringing to fruition, what it's asking the Field to grow, and what the harvest of this season makes possible."}, year:{teaser:"2026 brings fire that warms the field — a year where the heat activates what has been prepared, accelerating the growth that patient cultivation has made ready. For the Field, a fire year is the optimal condition for harvest: what has been growing under the surface is ready to come through, and the warmth of the year supports that emergence. This reading names what 2026 is specifically ripening in your chart, and what the Field is ready to produce this season."}, council:{teaser:"Four orientations are waiting in the full reading: how to cultivate at the scale that matches your genuine capacity rather than the scale that's been asked of you, what this decade is bringing to fruition and what it requires the Field to grow, how your nourishing quality functions best in love and what you need to receive, and what the missing element has been preparing the soil for. These are the chart's answers to the questions you've been tending."}, synthesis:{teaser:"You are someone who grows things — quietly, patiently, with a quality of care that is more powerful than it looks from the outside. The arc of your life is one of gradually finding the right fields and the right seeds for what you're capable of cultivating — and learning to receive the harvest rather than immediately turning to the next thing that needs tending. This reading places you inside that arc precisely, and names where the Field is in its season."} }, decade:{theme:"Patient Work Producing", teaser:"This decade is producing visible results from patient care — the cultivation of previous chapters is showing in the quality of what's growing."}, compatibility:{teaser:"You need a partner who receives your care with genuine appreciation and nourishes you in return — a relationship where the tending is genuinely mutual."} },
  "己_weak_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Field, the missing element is not what the soil lacks. It is the specific seed, the specific weather, the specific condition that has been teaching the Field something essential about what it can grow. The missing element in your chart is not what you need to add. It is what has been shaping the particular fertility you carry — a quality of nourishment that could only have developed through that specific absence. This reading names it, and what it's been building."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through cultivation, through the patient and attentive development of what's actually there — not what you wish were there, but what genuinely exists and has genuine potential. The forceful approach, the rapid scaling, the path that skips the tending — these consistently cost you more than they return. The closer your work gets to genuine cultivation of what deserves to grow, the more natural and inexhaustible your energy becomes."}, bonds:{teaser:"The connections in your chart have a quality of genuine nourishment — when you commit to a person or a project, you invest in its growth as naturally as the field receives the seed. Things take root in you. The people in your life have been changed by proximity to you in ways they may not fully recognize. This reading explores what that means for how you love, what you've grown in others without fully accounting for, and what you need to receive in order for the Field to remain fertile."}, strengths:{teaser:"You carry three genuine capacities. A sensitivity to what things need in order to grow — an almost diagnostic ability to assess what's flourishing and what's struggling and why. A patience with the actual pace of development that allows real growth to happen rather than forcing it into a form that looks finished before it is. And a quality of sustained care that is consistent across seasons — not dependent on being thanked or recognized, but real regardless. These are structural, not seasonal."}, challenges:{teaser:"The same nourishing quality that makes you genuinely valuable creates a specific challenge: the Field can deplete. When the care flows consistently outward without returning, when the Field is asked to keep producing without being replenished, something real is lost. The Field's recurring challenge is the question of your own nourishment — not as a secondary concern but as the primary condition that makes everything else possible. This reading names the specific pattern in your chart and what reciprocity needs to look like for you."}, love:{teaser:"You love with a quality of genuine investment in your partner's wellbeing and development — a care that is consistent, specific, and real rather than performed. The Field loves by nourishing: by creating conditions in which the other person grows, flourishes, and becomes more fully themselves. What the chart also shows is the specific work of loving as a Field — ensuring that you receive as much genuine nourishment as you give, and that the fertility of the relationship runs in both directions. This reading names what that looks like."}, career:{teaser:"The work that generates real results for you is the work of genuine cultivation — developing people, nurturing projects, tending to things that need patient care and real investment to become what they're capable of being. Your particular edge is not speed or force. It is the quality of your sustained attention and your ability to grow what others would have given up on. The chart names the specific domain where that cultivation produces results that are genuinely irreplaceable, and what you need from the environment to do your best work."}, chapter:{teaser:"The decade you're living right now has a specific quality of fruition — a period when what has been carefully cultivated over years is producing visible results, and what you've been tending to is showing its full form. The season you're growing through right now is not the most dramatic in your chart — but it may be the most productive. This reading names what this decade is specifically bringing to fruition, what it's asking the Field to grow, and what the harvest of this season makes possible."}, year:{teaser:"2026 brings fire that warms the field — a year where the heat activates what has been prepared, accelerating the growth that patient cultivation has made ready. For the Field, a fire year is the optimal condition for harvest: what has been growing under the surface is ready to come through, and the warmth of the year supports that emergence. This reading names what 2026 is specifically ripening in your chart, and what the Field is ready to produce this season."}, council:{teaser:"Four orientations are waiting in the full reading: how to cultivate at the scale that matches your genuine capacity rather than the scale that's been asked of you, what this decade is bringing to fruition and what it requires the Field to grow, how your nourishing quality functions best in love and what you need to receive, and what the missing element has been preparing the soil for. These are the chart's answers to the questions you've been tending."}, synthesis:{teaser:"You are someone who grows things — quietly, patiently, with a quality of care that is more powerful than it looks from the outside. The arc of your life is one of gradually finding the right fields and the right seeds for what you're capable of cultivating — and learning to receive the harvest rather than immediately turning to the next thing that needs tending. This reading places you inside that arc precisely, and names where the Field is in its season."} }, decade:{theme:"Nourishing Conditions", teaser:"This decade is improving the conditions for your own nourishment — and the care you receive is expanding what you're capable of giving."}, compatibility:{teaser:"You need a partner who actively nourishes you — someone for whom caring for you is natural and real, not effortful."} },
  "己_extremely_weak_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Field, the missing element is not what the soil lacks. It is the specific seed, the specific weather, the specific condition that has been teaching the Field something essential about what it can grow. The missing element in your chart is not what you need to add. It is what has been shaping the particular fertility you carry — a quality of nourishment that could only have developed through that specific absence. This reading names it, and what it's been building."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through cultivation, through the patient and attentive development of what's actually there — not what you wish were there, but what genuinely exists and has genuine potential. The forceful approach, the rapid scaling, the path that skips the tending — these consistently cost you more than they return. The closer your work gets to genuine cultivation of what deserves to grow, the more natural and inexhaustible your energy becomes."}, bonds:{teaser:"The connections in your chart have a quality of genuine nourishment — when you commit to a person or a project, you invest in its growth as naturally as the field receives the seed. Things take root in you. The people in your life have been changed by proximity to you in ways they may not fully recognize. This reading explores what that means for how you love, what you've grown in others without fully accounting for, and what you need to receive in order for the Field to remain fertile."}, strengths:{teaser:"You carry three genuine capacities. A sensitivity to what things need in order to grow — an almost diagnostic ability to assess what's flourishing and what's struggling and why. A patience with the actual pace of development that allows real growth to happen rather than forcing it into a form that looks finished before it is. And a quality of sustained care that is consistent across seasons — not dependent on being thanked or recognized, but real regardless. These are structural, not seasonal."}, challenges:{teaser:"The same nourishing quality that makes you genuinely valuable creates a specific challenge: the Field can deplete. When the care flows consistently outward without returning, when the Field is asked to keep producing without being replenished, something real is lost. The Field's recurring challenge is the question of your own nourishment — not as a secondary concern but as the primary condition that makes everything else possible. This reading names the specific pattern in your chart and what reciprocity needs to look like for you."}, love:{teaser:"You love with a quality of genuine investment in your partner's wellbeing and development — a care that is consistent, specific, and real rather than performed. The Field loves by nourishing: by creating conditions in which the other person grows, flourishes, and becomes more fully themselves. What the chart also shows is the specific work of loving as a Field — ensuring that you receive as much genuine nourishment as you give, and that the fertility of the relationship runs in both directions. This reading names what that looks like."}, career:{teaser:"The work that generates real results for you is the work of genuine cultivation — developing people, nurturing projects, tending to things that need patient care and real investment to become what they're capable of being. Your particular edge is not speed or force. It is the quality of your sustained attention and your ability to grow what others would have given up on. The chart names the specific domain where that cultivation produces results that are genuinely irreplaceable, and what you need from the environment to do your best work."}, chapter:{teaser:"The decade you're living right now has a specific quality of fruition — a period when what has been carefully cultivated over years is producing visible results, and what you've been tending to is showing its full form. The season you're growing through right now is not the most dramatic in your chart — but it may be the most productive. This reading names what this decade is specifically bringing to fruition, what it's asking the Field to grow, and what the harvest of this season makes possible."}, year:{teaser:"2026 brings fire that warms the field — a year where the heat activates what has been prepared, accelerating the growth that patient cultivation has made ready. For the Field, a fire year is the optimal condition for harvest: what has been growing under the surface is ready to come through, and the warmth of the year supports that emergence. This reading names what 2026 is specifically ripening in your chart, and what the Field is ready to produce this season."}, council:{teaser:"Four orientations are waiting in the full reading: how to cultivate at the scale that matches your genuine capacity rather than the scale that's been asked of you, what this decade is bringing to fruition and what it requires the Field to grow, how your nourishing quality functions best in love and what you need to receive, and what the missing element has been preparing the soil for. These are the chart's answers to the questions you've been tending."}, synthesis:{teaser:"You are someone who grows things — quietly, patiently, with a quality of care that is more powerful than it looks from the outside. The arc of your life is one of gradually finding the right fields and the right seeds for what you're capable of cultivating — and learning to receive the harvest rather than immediately turning to the next thing that needs tending. This reading places you inside that arc precisely, and names where the Field is in its season."} }, decade:{theme:"Building the Field", teaser:"This decade is building genuine fertile ground — the nourishment you're establishing is becoming more real."}, compatibility:{teaser:"You need a partner who nourishes you as naturally as breathing — someone whose care is structural and consistent."} },

  // ── 辛 Yin Metal ────────────────────────────────────────────────────────
  "辛_extremely_strong_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Jewel, that absence is not the rough that obscures the facet. It is the pressure that creates it. The missing element in your chart is the specific force that has required your particular quality of refinement to develop — that has demanded the Jewel become more precisely itself by providing exactly the resistance that produces precision. This reading names what's absent, what that pressure has built, and when the missing element arrives and what it changes."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through the quality and refinement of what you produce — through the discerning approach, the attention to what is genuinely excellent, the willingness to do the work at the level it actually requires. The faster, cruder path consistently fails you even when it technically works, because it asks you to produce something you can't fully stand behind. The closer your work gets to the standard you actually carry, the more natural and sustained your energy becomes."}, bonds:{teaser:"The connections in your chart carry a quality of genuine selectivity — when you commit to someone, you're genuinely choosing them, not defaulting to them, and the people you're close to can feel the weight of that choice. The Jewel's bonds have a specific quality: they're created by real discernment, and what's created through real discernment tends to last. This reading explores what that means for how you love, why some connections have felt genuinely right while others have felt like a compromise you couldn't quite locate, and what you need from the people you're closest to."}, strengths:{teaser:"You carry three genuine capacities. A discernment that is structural rather than effortful — you perceive quality and its absence the way others perceive temperature, automatically and accurately. A precision in how you evaluate what's in front of you that produces assessments others can actually rely on. And a commitment to genuine excellence that, while it can make you difficult to work with in environments that don't care about the distinction, produces work of real and lasting quality. These are not your most refined moments. They are your nature."}, challenges:{teaser:"The same discernment that makes you irreplaceable creates a specific challenge: the world doesn't always offer what your standard requires, and the gap between what you can perceive as possible and what is actually available can be a persistent source of frustration. The Jewel's recurring challenge is the question of when genuine excellence is available and when good enough is actually what the moment calls for — and how to inhabit the latter without losing the capacity for the former. This reading names the specific shape of that tension in your chart."}, love:{teaser:"You love with a quality of genuine choice — when you commit, it is because you have seen something real in the person and decided it is worth the depth of your commitment. The Jewel loves through discernment: the person who receives your full attention and care receives something that was selected rather than defaulted into, and that distinction is felt. What the chart also shows is the specific work of loving as a Jewel — holding the high standard while creating the space for a real person, with real limitations, to be fully received. This reading names what that balance looks like."}, career:{teaser:"The work that generates real results for you is work where the distinction between genuine excellence and mere competence actually matters — where your particular quality of discernment produces something that a less precise approach couldn't. Your edge is not volume or speed. It is the ability to produce work that is genuinely at the level it should be — and the specific domain where that quality is most valued and most irreplaceable is where your career finds its fullest expression. This reading names that intersection."}, chapter:{teaser:"The decade you're living right now has a specific quality of refined expression — a period when your particular quality of discernment is finding its fullest and most distinguished application. The facet being cut right now is the most important one — not because it's the last, but because it's the one that changes how the light moves through everything else. This reading names what this decade is specifically refining in your chart, what it's asking of the Jewel, and what the clarity being produced now makes possible."}, year:{teaser:"2026 brings a fire quality to your chart — a year where the heat intensifies and the question becomes not whether you have the quality, but whether the setting is worthy of it. For the Jewel, fire in the setting is a clarifying force: it reveals what the stone is actually made of, and it burns away what doesn't belong. This reading names what 2026 is specifically revealing in your chart, and how to work with that heat in a way that sharpens rather than compromises the clarity you carry."}, council:{teaser:"Four orientations are waiting in the full reading: how to work at the level of genuine excellence your chart describes rather than the level that's been convenient, what this decade is refining and what it requires from the Jewel, how your quality of discernment functions best in love and where it needs to allow imperfection, and what the missing element has been polishing you toward. These are the chart's answers to the questions you've been living with."}, synthesis:{teaser:"You are someone whose precision and discernment are genuine gifts — and the arc of your life is one of finding and building the settings that are worthy of what you carry. The Jewel doesn't become more itself by finding a rougher environment. It becomes more itself through pressure that produces precision, through cutting that reveals facets that couldn't have been seen before. This reading places you inside that arc precisely — and names where the Jewel is in its cutting right now."} }, decade:{theme:"Extraordinary Refinement", teaser:"This decade is the fullest expression of your extraordinary discernment — the quality of what you're producing is reaching its most distinguished form."}, compatibility:{teaser:"You need a partner whose own refinement is genuine and deep — someone who can truly meet you at your level."} },
  "辛_strong_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Jewel, that absence is not the rough that obscures the facet. It is the pressure that creates it. The missing element in your chart is the specific force that has required your particular quality of refinement to develop — that has demanded the Jewel become more precisely itself by providing exactly the resistance that produces precision. This reading names what's absent, what that pressure has built, and when the missing element arrives and what it changes."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through the quality and refinement of what you produce — through the discerning approach, the attention to what is genuinely excellent, the willingness to do the work at the level it actually requires. The faster, cruder path consistently fails you even when it technically works, because it asks you to produce something you can't fully stand behind. The closer your work gets to the standard you actually carry, the more natural and sustained your energy becomes."}, bonds:{teaser:"The connections in your chart carry a quality of genuine selectivity — when you commit to someone, you're genuinely choosing them, not defaulting to them, and the people you're close to can feel the weight of that choice. The Jewel's bonds have a specific quality: they're created by real discernment, and what's created through real discernment tends to last. This reading explores what that means for how you love, why some connections have felt genuinely right while others have felt like a compromise you couldn't quite locate, and what you need from the people you're closest to."}, strengths:{teaser:"You carry three genuine capacities. A discernment that is structural rather than effortful — you perceive quality and its absence the way others perceive temperature, automatically and accurately. A precision in how you evaluate what's in front of you that produces assessments others can actually rely on. And a commitment to genuine excellence that, while it can make you difficult to work with in environments that don't care about the distinction, produces work of real and lasting quality. These are not your most refined moments. They are your nature."}, challenges:{teaser:"The same discernment that makes you irreplaceable creates a specific challenge: the world doesn't always offer what your standard requires, and the gap between what you can perceive as possible and what is actually available can be a persistent source of frustration. The Jewel's recurring challenge is the question of when genuine excellence is available and when good enough is actually what the moment calls for — and how to inhabit the latter without losing the capacity for the former. This reading names the specific shape of that tension in your chart."}, love:{teaser:"You love with a quality of genuine choice — when you commit, it is because you have seen something real in the person and decided it is worth the depth of your commitment. The Jewel loves through discernment: the person who receives your full attention and care receives something that was selected rather than defaulted into, and that distinction is felt. What the chart also shows is the specific work of loving as a Jewel — holding the high standard while creating the space for a real person, with real limitations, to be fully received. This reading names what that balance looks like."}, career:{teaser:"The work that generates real results for you is work where the distinction between genuine excellence and mere competence actually matters — where your particular quality of discernment produces something that a less precise approach couldn't. Your edge is not volume or speed. It is the ability to produce work that is genuinely at the level it should be — and the specific domain where that quality is most valued and most irreplaceable is where your career finds its fullest expression. This reading names that intersection."}, chapter:{teaser:"The decade you're living right now has a specific quality of refined expression — a period when your particular quality of discernment is finding its fullest and most distinguished application. The facet being cut right now is the most important one — not because it's the last, but because it's the one that changes how the light moves through everything else. This reading names what this decade is specifically refining in your chart, what it's asking of the Jewel, and what the clarity being produced now makes possible."}, year:{teaser:"2026 brings a fire quality to your chart — a year where the heat intensifies and the question becomes not whether you have the quality, but whether the setting is worthy of it. For the Jewel, fire in the setting is a clarifying force: it reveals what the stone is actually made of, and it burns away what doesn't belong. This reading names what 2026 is specifically revealing in your chart, and how to work with that heat in a way that sharpens rather than compromises the clarity you carry."}, council:{teaser:"Four orientations are waiting in the full reading: how to work at the level of genuine excellence your chart describes rather than the level that's been convenient, what this decade is refining and what it requires from the Jewel, how your quality of discernment functions best in love and where it needs to allow imperfection, and what the missing element has been polishing you toward. These are the chart's answers to the questions you've been living with."}, synthesis:{teaser:"You are someone whose precision and discernment are genuine gifts — and the arc of your life is one of finding and building the settings that are worthy of what you carry. The Jewel doesn't become more itself by finding a rougher environment. It becomes more itself through pressure that produces precision, through cutting that reveals facets that couldn't have been seen before. This reading places you inside that arc precisely — and names where the Jewel is in its cutting right now."} }, decade:{theme:"Refinement Finding Form", teaser:"This decade is the period when your particular quality of discernment finds its best expression — the refinement is producing something of genuine distinction."}, compatibility:{teaser:"You thrive with partners who genuinely appreciate and embody quality — someone whose own refinement matches yours."} },
  "辛_moderate_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Jewel, that absence is not the rough that obscures the facet. It is the pressure that creates it. The missing element in your chart is the specific force that has required your particular quality of refinement to develop — that has demanded the Jewel become more precisely itself by providing exactly the resistance that produces precision. This reading names what's absent, what that pressure has built, and when the missing element arrives and what it changes."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through the quality and refinement of what you produce — through the discerning approach, the attention to what is genuinely excellent, the willingness to do the work at the level it actually requires. The faster, cruder path consistently fails you even when it technically works, because it asks you to produce something you can't fully stand behind. The closer your work gets to the standard you actually carry, the more natural and sustained your energy becomes."}, bonds:{teaser:"The connections in your chart carry a quality of genuine selectivity — when you commit to someone, you're genuinely choosing them, not defaulting to them, and the people you're close to can feel the weight of that choice. The Jewel's bonds have a specific quality: they're created by real discernment, and what's created through real discernment tends to last. This reading explores what that means for how you love, why some connections have felt genuinely right while others have felt like a compromise you couldn't quite locate, and what you need from the people you're closest to."}, strengths:{teaser:"You carry three genuine capacities. A discernment that is structural rather than effortful — you perceive quality and its absence the way others perceive temperature, automatically and accurately. A precision in how you evaluate what's in front of you that produces assessments others can actually rely on. And a commitment to genuine excellence that, while it can make you difficult to work with in environments that don't care about the distinction, produces work of real and lasting quality. These are not your most refined moments. They are your nature."}, challenges:{teaser:"The same discernment that makes you irreplaceable creates a specific challenge: the world doesn't always offer what your standard requires, and the gap between what you can perceive as possible and what is actually available can be a persistent source of frustration. The Jewel's recurring challenge is the question of when genuine excellence is available and when good enough is actually what the moment calls for — and how to inhabit the latter without losing the capacity for the former. This reading names the specific shape of that tension in your chart."}, love:{teaser:"You love with a quality of genuine choice — when you commit, it is because you have seen something real in the person and decided it is worth the depth of your commitment. The Jewel loves through discernment: the person who receives your full attention and care receives something that was selected rather than defaulted into, and that distinction is felt. What the chart also shows is the specific work of loving as a Jewel — holding the high standard while creating the space for a real person, with real limitations, to be fully received. This reading names what that balance looks like."}, career:{teaser:"The work that generates real results for you is work where the distinction between genuine excellence and mere competence actually matters — where your particular quality of discernment produces something that a less precise approach couldn't. Your edge is not volume or speed. It is the ability to produce work that is genuinely at the level it should be — and the specific domain where that quality is most valued and most irreplaceable is where your career finds its fullest expression. This reading names that intersection."}, chapter:{teaser:"The decade you're living right now has a specific quality of refined expression — a period when your particular quality of discernment is finding its fullest and most distinguished application. The facet being cut right now is the most important one — not because it's the last, but because it's the one that changes how the light moves through everything else. This reading names what this decade is specifically refining in your chart, what it's asking of the Jewel, and what the clarity being produced now makes possible."}, year:{teaser:"2026 brings a fire quality to your chart — a year where the heat intensifies and the question becomes not whether you have the quality, but whether the setting is worthy of it. For the Jewel, fire in the setting is a clarifying force: it reveals what the stone is actually made of, and it burns away what doesn't belong. This reading names what 2026 is specifically revealing in your chart, and how to work with that heat in a way that sharpens rather than compromises the clarity you carry."}, council:{teaser:"Four orientations are waiting in the full reading: how to work at the level of genuine excellence your chart describes rather than the level that's been convenient, what this decade is refining and what it requires from the Jewel, how your quality of discernment functions best in love and where it needs to allow imperfection, and what the missing element has been polishing you toward. These are the chart's answers to the questions you've been living with."}, synthesis:{teaser:"You are someone whose precision and discernment are genuine gifts — and the arc of your life is one of finding and building the settings that are worthy of what you carry. The Jewel doesn't become more itself by finding a rougher environment. It becomes more itself through pressure that produces precision, through cutting that reveals facets that couldn't have been seen before. This reading places you inside that arc precisely — and names where the Jewel is in its cutting right now."} }, decade:{theme:"Quality Emerging", teaser:"This decade is producing work and relationships of genuine quality — the discernment that has been developing is showing in what you create."}, compatibility:{teaser:"You need a partner who brings genuine quality to the relationship — someone whose own refinement and care match yours."} },
  "辛_weak_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Jewel, that absence is not the rough that obscures the facet. It is the pressure that creates it. The missing element in your chart is the specific force that has required your particular quality of refinement to develop — that has demanded the Jewel become more precisely itself by providing exactly the resistance that produces precision. This reading names what's absent, what that pressure has built, and when the missing element arrives and what it changes."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through the quality and refinement of what you produce — through the discerning approach, the attention to what is genuinely excellent, the willingness to do the work at the level it actually requires. The faster, cruder path consistently fails you even when it technically works, because it asks you to produce something you can't fully stand behind. The closer your work gets to the standard you actually carry, the more natural and sustained your energy becomes."}, bonds:{teaser:"The connections in your chart carry a quality of genuine selectivity — when you commit to someone, you're genuinely choosing them, not defaulting to them, and the people you're close to can feel the weight of that choice. The Jewel's bonds have a specific quality: they're created by real discernment, and what's created through real discernment tends to last. This reading explores what that means for how you love, why some connections have felt genuinely right while others have felt like a compromise you couldn't quite locate, and what you need from the people you're closest to."}, strengths:{teaser:"You carry three genuine capacities. A discernment that is structural rather than effortful — you perceive quality and its absence the way others perceive temperature, automatically and accurately. A precision in how you evaluate what's in front of you that produces assessments others can actually rely on. And a commitment to genuine excellence that, while it can make you difficult to work with in environments that don't care about the distinction, produces work of real and lasting quality. These are not your most refined moments. They are your nature."}, challenges:{teaser:"The same discernment that makes you irreplaceable creates a specific challenge: the world doesn't always offer what your standard requires, and the gap between what you can perceive as possible and what is actually available can be a persistent source of frustration. The Jewel's recurring challenge is the question of when genuine excellence is available and when good enough is actually what the moment calls for — and how to inhabit the latter without losing the capacity for the former. This reading names the specific shape of that tension in your chart."}, love:{teaser:"You love with a quality of genuine choice — when you commit, it is because you have seen something real in the person and decided it is worth the depth of your commitment. The Jewel loves through discernment: the person who receives your full attention and care receives something that was selected rather than defaulted into, and that distinction is felt. What the chart also shows is the specific work of loving as a Jewel — holding the high standard while creating the space for a real person, with real limitations, to be fully received. This reading names what that balance looks like."}, career:{teaser:"The work that generates real results for you is work where the distinction between genuine excellence and mere competence actually matters — where your particular quality of discernment produces something that a less precise approach couldn't. Your edge is not volume or speed. It is the ability to produce work that is genuinely at the level it should be — and the specific domain where that quality is most valued and most irreplaceable is where your career finds its fullest expression. This reading names that intersection."}, chapter:{teaser:"The decade you're living right now has a specific quality of refined expression — a period when your particular quality of discernment is finding its fullest and most distinguished application. The facet being cut right now is the most important one — not because it's the last, but because it's the one that changes how the light moves through everything else. This reading names what this decade is specifically refining in your chart, what it's asking of the Jewel, and what the clarity being produced now makes possible."}, year:{teaser:"2026 brings a fire quality to your chart — a year where the heat intensifies and the question becomes not whether you have the quality, but whether the setting is worthy of it. For the Jewel, fire in the setting is a clarifying force: it reveals what the stone is actually made of, and it burns away what doesn't belong. This reading names what 2026 is specifically revealing in your chart, and how to work with that heat in a way that sharpens rather than compromises the clarity you carry."}, council:{teaser:"Four orientations are waiting in the full reading: how to work at the level of genuine excellence your chart describes rather than the level that's been convenient, what this decade is refining and what it requires from the Jewel, how your quality of discernment functions best in love and where it needs to allow imperfection, and what the missing element has been polishing you toward. These are the chart's answers to the questions you've been living with."}, synthesis:{teaser:"You are someone whose precision and discernment are genuine gifts — and the arc of your life is one of finding and building the settings that are worthy of what you carry. The Jewel doesn't become more itself by finding a rougher environment. It becomes more itself through pressure that produces precision, through cutting that reveals facets that couldn't have been seen before. This reading places you inside that arc precisely — and names where the Jewel is in its cutting right now."} }, decade:{theme:"Right Conditions Clearer", teaser:"This decade is clarifying which conditions bring out your best discernment — and moving toward them is producing work and relationships of genuine quality."}, compatibility:{teaser:"You need a partner whose quality is genuine — someone you're genuinely choosing, not simply accepting."} },
  "辛_extremely_weak_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Jewel, that absence is not the rough that obscures the facet. It is the pressure that creates it. The missing element in your chart is the specific force that has required your particular quality of refinement to develop — that has demanded the Jewel become more precisely itself by providing exactly the resistance that produces precision. This reading names what's absent, what that pressure has built, and when the missing element arrives and what it changes."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through the quality and refinement of what you produce — through the discerning approach, the attention to what is genuinely excellent, the willingness to do the work at the level it actually requires. The faster, cruder path consistently fails you even when it technically works, because it asks you to produce something you can't fully stand behind. The closer your work gets to the standard you actually carry, the more natural and sustained your energy becomes."}, bonds:{teaser:"The connections in your chart carry a quality of genuine selectivity — when you commit to someone, you're genuinely choosing them, not defaulting to them, and the people you're close to can feel the weight of that choice. The Jewel's bonds have a specific quality: they're created by real discernment, and what's created through real discernment tends to last. This reading explores what that means for how you love, why some connections have felt genuinely right while others have felt like a compromise you couldn't quite locate, and what you need from the people you're closest to."}, strengths:{teaser:"You carry three genuine capacities. A discernment that is structural rather than effortful — you perceive quality and its absence the way others perceive temperature, automatically and accurately. A precision in how you evaluate what's in front of you that produces assessments others can actually rely on. And a commitment to genuine excellence that, while it can make you difficult to work with in environments that don't care about the distinction, produces work of real and lasting quality. These are not your most refined moments. They are your nature."}, challenges:{teaser:"The same discernment that makes you irreplaceable creates a specific challenge: the world doesn't always offer what your standard requires, and the gap between what you can perceive as possible and what is actually available can be a persistent source of frustration. The Jewel's recurring challenge is the question of when genuine excellence is available and when good enough is actually what the moment calls for — and how to inhabit the latter without losing the capacity for the former. This reading names the specific shape of that tension in your chart."}, love:{teaser:"You love with a quality of genuine choice — when you commit, it is because you have seen something real in the person and decided it is worth the depth of your commitment. The Jewel loves through discernment: the person who receives your full attention and care receives something that was selected rather than defaulted into, and that distinction is felt. What the chart also shows is the specific work of loving as a Jewel — holding the high standard while creating the space for a real person, with real limitations, to be fully received. This reading names what that balance looks like."}, career:{teaser:"The work that generates real results for you is work where the distinction between genuine excellence and mere competence actually matters — where your particular quality of discernment produces something that a less precise approach couldn't. Your edge is not volume or speed. It is the ability to produce work that is genuinely at the level it should be — and the specific domain where that quality is most valued and most irreplaceable is where your career finds its fullest expression. This reading names that intersection."}, chapter:{teaser:"The decade you're living right now has a specific quality of refined expression — a period when your particular quality of discernment is finding its fullest and most distinguished application. The facet being cut right now is the most important one — not because it's the last, but because it's the one that changes how the light moves through everything else. This reading names what this decade is specifically refining in your chart, what it's asking of the Jewel, and what the clarity being produced now makes possible."}, year:{teaser:"2026 brings a fire quality to your chart — a year where the heat intensifies and the question becomes not whether you have the quality, but whether the setting is worthy of it. For the Jewel, fire in the setting is a clarifying force: it reveals what the stone is actually made of, and it burns away what doesn't belong. This reading names what 2026 is specifically revealing in your chart, and how to work with that heat in a way that sharpens rather than compromises the clarity you carry."}, council:{teaser:"Four orientations are waiting in the full reading: how to work at the level of genuine excellence your chart describes rather than the level that's been convenient, what this decade is refining and what it requires from the Jewel, how your quality of discernment functions best in love and where it needs to allow imperfection, and what the missing element has been polishing you toward. These are the chart's answers to the questions you've been living with."}, synthesis:{teaser:"You are someone whose precision and discernment are genuine gifts — and the arc of your life is one of finding and building the settings that are worthy of what you carry. The Jewel doesn't become more itself by finding a rougher environment. It becomes more itself through pressure that produces precision, through cutting that reveals facets that couldn't have been seen before. This reading places you inside that arc precisely — and names where the Jewel is in its cutting right now."} }, decade:{theme:"Conditions in Progress", teaser:"This decade is building the conditions where your genuine discernment can come forward — the quality of what becomes possible in the right environment is real."}, compatibility:{teaser:"You need a partner who genuinely appreciates and reflects quality — someone whose own substance and care are real."} },

  // ── 癸 Yin Water ────────────────────────────────────────────────────────
  "癸_extremely_strong_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Rain, that absence is not a drought. It is the particular quality of sky that your water has been falling from — the specific atmosphere that has shaped the character of what you carry and how it falls. The missing element in your chart is not what has limited your sensitivity. It is the precise condition that has made it specific — that has required the Rain to develop a particular quality of depth and penetration that a more complete chart never would have demanded. This reading names that element and what its presence changes."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through depth of genuine perception and the quiet, specific nourishment of what you can actually reach — not through force or scale, but through the particular quality of what the Rain delivers when it falls in exactly the right place. The approach that requires loudness, breadth, and constant visibility consistently costs you more than it returns. The closer your work gets to the genuine, specific nourishment of something that needs exactly what you carry, the more natural and sustainable your engagement becomes."}, bonds:{teaser:"The connections in your chart have a quality of quiet depth — a tendency to nourish what they touch in ways that are real but not always visible, and to create a quality of intimacy through attunement rather than through announcement. The people who have been close to you have been fed by that proximity in ways they may not fully recognize. This reading explores what that means for how you love, what you've given to the people in your life without fully accounting for it, and what you need from a connection for it to feel genuinely reciprocal."}, strengths:{teaser:"You carry three genuine capacities. A perceptive sensitivity that registers what others miss — the quality of being genuinely attuned to what is actually true in a situation before the situation has declared itself. A quality of quiet nourishment that creates growth in what it touches — not through instruction or force but through a specific form of presence and care. And a resilience that is not loud but is real — the kind that comes from having been shaped by conditions that would have limited a less sensitive person rather than refined them."}, challenges:{teaser:"The same sensitivity that gives you your depth creates a specific challenge: the boundary between what you're perceiving in others and what you're experiencing yourself can be genuinely difficult to maintain, and the porousness of that boundary — while it is the source of your most precise perceptions — can also make it hard to know whose feeling is whose, whose need is whose, whose sky you're falling from. This reading names the specific shape that challenge takes in your chart and what building a reliable container for your sensitivity actually looks like."}, love:{teaser:"You love with a quality of genuine attunement that is rare — a sensitivity to what your partner actually needs, what they're actually experiencing, what would actually nourish them, that operates beneath the level of what they've said or shown. The Rain loves by falling specifically: by nourishing what it actually reaches rather than broadcasting generally. What the chart also shows is the specific work of loving as Rain — ensuring that you are nourished in return, that the ground you're falling toward provides something real, and that the sky you're falling from is genuinely yours."}, career:{teaser:"The work that generates real results for you is work that actually requires and values your particular quality of perception — where sensing what's genuinely true, nourishing what genuinely needs it, and the quiet depth of your specific intelligence produces something that the louder, more forceful approaches consistently miss. Your edge is not scale or visibility. It is the specific quality of what the Rain delivers when it falls in exactly the right place — and the domain where that delivery is most needed and most valued is where your work becomes genuinely irreplaceable."}, chapter:{teaser:"The decade you're living right now has a specific quality of finding the sky — a period when what you carry is finding its proper context, when the sensitivity that has been a challenge in some environments is finding the conditions where it is genuinely a gift. The cloud you're moving through right now is not a storm. It is the particular atmospheric condition that will produce your most specific and most genuine rainfall. This reading names what this decade is preparing your Rain to nourish, and what the sky is becoming."}, year:{teaser:"2026 brings fire that produces steam — a year where the water and the fire meet and something new emerges from that meeting: a quality of intensity, of becoming visible, of rising rather than falling. For the Rain, 2026 is a year of translation and elevation — what has been absorbed and held is finding a new form, a more visible expression, a way of being present that is not the quiet fall but the rising cloud. This reading names what specifically is being elevated this year in your chart."}, council:{teaser:"Four orientations are waiting in the full reading: how to direct your particular quality of sensitivity toward work that genuinely deserves and uses it, what this decade is preparing you to nourish, how the quiet depth of your love functions best and what you need from the people you're closest to, and what the missing element in your chart has been teaching the Rain about the sky it falls from. These are the chart's answers to the questions you've been sensing."}, synthesis:{teaser:"You are someone whose quiet depth is a genuine gift — and the arc of your life is one of finding the right ground for what you carry, the right conditions for what you nourish, and the right sky to fall from. The Rain doesn't need to become a river to matter. It needs to fall in exactly the right place. This reading places you inside the arc of that falling — and names precisely where the cloud is and what it's becoming."} }, decade:{theme:"Extraordinary Depth Expressed", teaser:"This decade is the fullest expression of your extraordinary depth — what you carry at the level of genuine perception is finding its most complete form."}, compatibility:{teaser:"You need a partner with genuine substance and real grounding — someone whose presence is solid enough that your depth has something solid to connect with."} },
  "癸_strong_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Rain, that absence is not a drought. It is the particular quality of sky that your water has been falling from — the specific atmosphere that has shaped the character of what you carry and how it falls. The missing element in your chart is not what has limited your sensitivity. It is the precise condition that has made it specific — that has required the Rain to develop a particular quality of depth and penetration that a more complete chart never would have demanded. This reading names that element and what its presence changes."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through depth of genuine perception and the quiet, specific nourishment of what you can actually reach — not through force or scale, but through the particular quality of what the Rain delivers when it falls in exactly the right place. The approach that requires loudness, breadth, and constant visibility consistently costs you more than it returns. The closer your work gets to the genuine, specific nourishment of something that needs exactly what you carry, the more natural and sustainable your engagement becomes."}, bonds:{teaser:"The connections in your chart have a quality of quiet depth — a tendency to nourish what they touch in ways that are real but not always visible, and to create a quality of intimacy through attunement rather than through announcement. The people who have been close to you have been fed by that proximity in ways they may not fully recognize. This reading explores what that means for how you love, what you've given to the people in your life without fully accounting for it, and what you need from a connection for it to feel genuinely reciprocal."}, strengths:{teaser:"You carry three genuine capacities. A perceptive sensitivity that registers what others miss — the quality of being genuinely attuned to what is actually true in a situation before the situation has declared itself. A quality of quiet nourishment that creates growth in what it touches — not through instruction or force but through a specific form of presence and care. And a resilience that is not loud but is real — the kind that comes from having been shaped by conditions that would have limited a less sensitive person rather than refined them."}, challenges:{teaser:"The same sensitivity that gives you your depth creates a specific challenge: the boundary between what you're perceiving in others and what you're experiencing yourself can be genuinely difficult to maintain, and the porousness of that boundary — while it is the source of your most precise perceptions — can also make it hard to know whose feeling is whose, whose need is whose, whose sky you're falling from. This reading names the specific shape that challenge takes in your chart and what building a reliable container for your sensitivity actually looks like."}, love:{teaser:"You love with a quality of genuine attunement that is rare — a sensitivity to what your partner actually needs, what they're actually experiencing, what would actually nourish them, that operates beneath the level of what they've said or shown. The Rain loves by falling specifically: by nourishing what it actually reaches rather than broadcasting generally. What the chart also shows is the specific work of loving as Rain — ensuring that you are nourished in return, that the ground you're falling toward provides something real, and that the sky you're falling from is genuinely yours."}, career:{teaser:"The work that generates real results for you is work that actually requires and values your particular quality of perception — where sensing what's genuinely true, nourishing what genuinely needs it, and the quiet depth of your specific intelligence produces something that the louder, more forceful approaches consistently miss. Your edge is not scale or visibility. It is the specific quality of what the Rain delivers when it falls in exactly the right place — and the domain where that delivery is most needed and most valued is where your work becomes genuinely irreplaceable."}, chapter:{teaser:"The decade you're living right now has a specific quality of finding the sky — a period when what you carry is finding its proper context, when the sensitivity that has been a challenge in some environments is finding the conditions where it is genuinely a gift. The cloud you're moving through right now is not a storm. It is the particular atmospheric condition that will produce your most specific and most genuine rainfall. This reading names what this decade is preparing your Rain to nourish, and what the sky is becoming."}, year:{teaser:"2026 brings fire that produces steam — a year where the water and the fire meet and something new emerges from that meeting: a quality of intensity, of becoming visible, of rising rather than falling. For the Rain, 2026 is a year of translation and elevation — what has been absorbed and held is finding a new form, a more visible expression, a way of being present that is not the quiet fall but the rising cloud. This reading names what specifically is being elevated this year in your chart."}, council:{teaser:"Four orientations are waiting in the full reading: how to direct your particular quality of sensitivity toward work that genuinely deserves and uses it, what this decade is preparing you to nourish, how the quiet depth of your love functions best and what you need from the people you're closest to, and what the missing element in your chart has been teaching the Rain about the sky it falls from. These are the chart's answers to the questions you've been sensing."}, synthesis:{teaser:"You are someone whose quiet depth is a genuine gift — and the arc of your life is one of finding the right ground for what you carry, the right conditions for what you nourish, and the right sky to fall from. The Rain doesn't need to become a river to matter. It needs to fall in exactly the right place. This reading places you inside the arc of that falling — and names precisely where the cloud is and what it's becoming."} }, decade:{theme:"Depth Finding Channel", teaser:"This decade is finding the channels through which your depth can flow into the world — what you carry internally is finding its external expression."}, compatibility:{teaser:"You thrive with partners who bring their own genuine depth — someone who can meet you in the subtlety and nuance of how you actually experience things."} },
  "癸_moderate_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Rain, that absence is not a drought. It is the particular quality of sky that your water has been falling from — the specific atmosphere that has shaped the character of what you carry and how it falls. The missing element in your chart is not what has limited your sensitivity. It is the precise condition that has made it specific — that has required the Rain to develop a particular quality of depth and penetration that a more complete chart never would have demanded. This reading names that element and what its presence changes."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through depth of genuine perception and the quiet, specific nourishment of what you can actually reach — not through force or scale, but through the particular quality of what the Rain delivers when it falls in exactly the right place. The approach that requires loudness, breadth, and constant visibility consistently costs you more than it returns. The closer your work gets to the genuine, specific nourishment of something that needs exactly what you carry, the more natural and sustainable your engagement becomes."}, bonds:{teaser:"The connections in your chart have a quality of quiet depth — a tendency to nourish what they touch in ways that are real but not always visible, and to create a quality of intimacy through attunement rather than through announcement. The people who have been close to you have been fed by that proximity in ways they may not fully recognize. This reading explores what that means for how you love, what you've given to the people in your life without fully accounting for it, and what you need from a connection for it to feel genuinely reciprocal."}, strengths:{teaser:"You carry three genuine capacities. A perceptive sensitivity that registers what others miss — the quality of being genuinely attuned to what is actually true in a situation before the situation has declared itself. A quality of quiet nourishment that creates growth in what it touches — not through instruction or force but through a specific form of presence and care. And a resilience that is not loud but is real — the kind that comes from having been shaped by conditions that would have limited a less sensitive person rather than refined them."}, challenges:{teaser:"The same sensitivity that gives you your depth creates a specific challenge: the boundary between what you're perceiving in others and what you're experiencing yourself can be genuinely difficult to maintain, and the porousness of that boundary — while it is the source of your most precise perceptions — can also make it hard to know whose feeling is whose, whose need is whose, whose sky you're falling from. This reading names the specific shape that challenge takes in your chart and what building a reliable container for your sensitivity actually looks like."}, love:{teaser:"You love with a quality of genuine attunement that is rare — a sensitivity to what your partner actually needs, what they're actually experiencing, what would actually nourish them, that operates beneath the level of what they've said or shown. The Rain loves by falling specifically: by nourishing what it actually reaches rather than broadcasting generally. What the chart also shows is the specific work of loving as Rain — ensuring that you are nourished in return, that the ground you're falling toward provides something real, and that the sky you're falling from is genuinely yours."}, career:{teaser:"The work that generates real results for you is work that actually requires and values your particular quality of perception — where sensing what's genuinely true, nourishing what genuinely needs it, and the quiet depth of your specific intelligence produces something that the louder, more forceful approaches consistently miss. Your edge is not scale or visibility. It is the specific quality of what the Rain delivers when it falls in exactly the right place — and the domain where that delivery is most needed and most valued is where your work becomes genuinely irreplaceable."}, chapter:{teaser:"The decade you're living right now has a specific quality of finding the sky — a period when what you carry is finding its proper context, when the sensitivity that has been a challenge in some environments is finding the conditions where it is genuinely a gift. The cloud you're moving through right now is not a storm. It is the particular atmospheric condition that will produce your most specific and most genuine rainfall. This reading names what this decade is preparing your Rain to nourish, and what the sky is becoming."}, year:{teaser:"2026 brings fire that produces steam — a year where the water and the fire meet and something new emerges from that meeting: a quality of intensity, of becoming visible, of rising rather than falling. For the Rain, 2026 is a year of translation and elevation — what has been absorbed and held is finding a new form, a more visible expression, a way of being present that is not the quiet fall but the rising cloud. This reading names what specifically is being elevated this year in your chart."}, council:{teaser:"Four orientations are waiting in the full reading: how to direct your particular quality of sensitivity toward work that genuinely deserves and uses it, what this decade is preparing you to nourish, how the quiet depth of your love functions best and what you need from the people you're closest to, and what the missing element in your chart has been teaching the Rain about the sky it falls from. These are the chart's answers to the questions you've been sensing."}, synthesis:{teaser:"You are someone whose quiet depth is a genuine gift — and the arc of your life is one of finding the right ground for what you carry, the right conditions for what you nourish, and the right sky to fall from. The Rain doesn't need to become a river to matter. It needs to fall in exactly the right place. This reading places you inside the arc of that falling — and names precisely where the cloud is and what it's becoming."} }, decade:{theme:"Depth Taking Form", teaser:"This decade is giving form to what you sense and perceive — the internal depth is finding its external expression."}, compatibility:{teaser:"You need a partner with genuine substance and presence — someone who provides enough ground that your sensitivity finds something solid to connect with."} },
  "癸_weak_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Rain, that absence is not a drought. It is the particular quality of sky that your water has been falling from — the specific atmosphere that has shaped the character of what you carry and how it falls. The missing element in your chart is not what has limited your sensitivity. It is the precise condition that has made it specific — that has required the Rain to develop a particular quality of depth and penetration that a more complete chart never would have demanded. This reading names that element and what its presence changes."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through depth of genuine perception and the quiet, specific nourishment of what you can actually reach — not through force or scale, but through the particular quality of what the Rain delivers when it falls in exactly the right place. The approach that requires loudness, breadth, and constant visibility consistently costs you more than it returns. The closer your work gets to the genuine, specific nourishment of something that needs exactly what you carry, the more natural and sustainable your engagement becomes."}, bonds:{teaser:"The connections in your chart have a quality of quiet depth — a tendency to nourish what they touch in ways that are real but not always visible, and to create a quality of intimacy through attunement rather than through announcement. The people who have been close to you have been fed by that proximity in ways they may not fully recognize. This reading explores what that means for how you love, what you've given to the people in your life without fully accounting for it, and what you need from a connection for it to feel genuinely reciprocal."}, strengths:{teaser:"You carry three genuine capacities. A perceptive sensitivity that registers what others miss — the quality of being genuinely attuned to what is actually true in a situation before the situation has declared itself. A quality of quiet nourishment that creates growth in what it touches — not through instruction or force but through a specific form of presence and care. And a resilience that is not loud but is real — the kind that comes from having been shaped by conditions that would have limited a less sensitive person rather than refined them."}, challenges:{teaser:"The same sensitivity that gives you your depth creates a specific challenge: the boundary between what you're perceiving in others and what you're experiencing yourself can be genuinely difficult to maintain, and the porousness of that boundary — while it is the source of your most precise perceptions — can also make it hard to know whose feeling is whose, whose need is whose, whose sky you're falling from. This reading names the specific shape that challenge takes in your chart and what building a reliable container for your sensitivity actually looks like."}, love:{teaser:"You love with a quality of genuine attunement that is rare — a sensitivity to what your partner actually needs, what they're actually experiencing, what would actually nourish them, that operates beneath the level of what they've said or shown. The Rain loves by falling specifically: by nourishing what it actually reaches rather than broadcasting generally. What the chart also shows is the specific work of loving as Rain — ensuring that you are nourished in return, that the ground you're falling toward provides something real, and that the sky you're falling from is genuinely yours."}, career:{teaser:"The work that generates real results for you is work that actually requires and values your particular quality of perception — where sensing what's genuinely true, nourishing what genuinely needs it, and the quiet depth of your specific intelligence produces something that the louder, more forceful approaches consistently miss. Your edge is not scale or visibility. It is the specific quality of what the Rain delivers when it falls in exactly the right place — and the domain where that delivery is most needed and most valued is where your work becomes genuinely irreplaceable."}, chapter:{teaser:"The decade you're living right now has a specific quality of finding the sky — a period when what you carry is finding its proper context, when the sensitivity that has been a challenge in some environments is finding the conditions where it is genuinely a gift. The cloud you're moving through right now is not a storm. It is the particular atmospheric condition that will produce your most specific and most genuine rainfall. This reading names what this decade is preparing your Rain to nourish, and what the sky is becoming."}, year:{teaser:"2026 brings fire that produces steam — a year where the water and the fire meet and something new emerges from that meeting: a quality of intensity, of becoming visible, of rising rather than falling. For the Rain, 2026 is a year of translation and elevation — what has been absorbed and held is finding a new form, a more visible expression, a way of being present that is not the quiet fall but the rising cloud. This reading names what specifically is being elevated this year in your chart."}, council:{teaser:"Four orientations are waiting in the full reading: how to direct your particular quality of sensitivity toward work that genuinely deserves and uses it, what this decade is preparing you to nourish, how the quiet depth of your love functions best and what you need from the people you're closest to, and what the missing element in your chart has been teaching the Rain about the sky it falls from. These are the chart's answers to the questions you've been sensing."}, synthesis:{teaser:"You are someone whose quiet depth is a genuine gift — and the arc of your life is one of finding the right ground for what you carry, the right conditions for what you nourish, and the right sky to fall from. The Rain doesn't need to become a river to matter. It needs to fall in exactly the right place. This reading places you inside the arc of that falling — and names precisely where the cloud is and what it's becoming."} }, decade:{theme:"Safety Supporting Depth", teaser:"This decade is building the safety that allows your depth to function as a gift — and the conditions you're creating are allowing more of your genuine perception to come through."}, compatibility:{teaser:"You need a partner who provides genuine grounding and safety — someone whose presence is solid enough that your sensitivity can be a gift in the relationship."} },
  "癸_extremely_weak_base": { sections: { nature:{teaser:"You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",paragraphs:["The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.","The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."]}, fire:{teaser:"Your chart is missing something specific — and for the Rain, that absence is not a drought. It is the particular quality of sky that your water has been falling from — the specific atmosphere that has shaped the character of what you carry and how it falls. The missing element in your chart is not what has limited your sensitivity. It is the precise condition that has made it specific — that has required the Rain to develop a particular quality of depth and penetration that a more complete chart never would have demanded. This reading names that element and what its presence changes."}, path:{teaser:"Your chart holds a clear answer to how success is structured for you: through depth of genuine perception and the quiet, specific nourishment of what you can actually reach — not through force or scale, but through the particular quality of what the Rain delivers when it falls in exactly the right place. The approach that requires loudness, breadth, and constant visibility consistently costs you more than it returns. The closer your work gets to the genuine, specific nourishment of something that needs exactly what you carry, the more natural and sustainable your engagement becomes."}, bonds:{teaser:"The connections in your chart have a quality of quiet depth — a tendency to nourish what they touch in ways that are real but not always visible, and to create a quality of intimacy through attunement rather than through announcement. The people who have been close to you have been fed by that proximity in ways they may not fully recognize. This reading explores what that means for how you love, what you've given to the people in your life without fully accounting for it, and what you need from a connection for it to feel genuinely reciprocal."}, strengths:{teaser:"You carry three genuine capacities. A perceptive sensitivity that registers what others miss — the quality of being genuinely attuned to what is actually true in a situation before the situation has declared itself. A quality of quiet nourishment that creates growth in what it touches — not through instruction or force but through a specific form of presence and care. And a resilience that is not loud but is real — the kind that comes from having been shaped by conditions that would have limited a less sensitive person rather than refined them."}, challenges:{teaser:"The same sensitivity that gives you your depth creates a specific challenge: the boundary between what you're perceiving in others and what you're experiencing yourself can be genuinely difficult to maintain, and the porousness of that boundary — while it is the source of your most precise perceptions — can also make it hard to know whose feeling is whose, whose need is whose, whose sky you're falling from. This reading names the specific shape that challenge takes in your chart and what building a reliable container for your sensitivity actually looks like."}, love:{teaser:"You love with a quality of genuine attunement that is rare — a sensitivity to what your partner actually needs, what they're actually experiencing, what would actually nourish them, that operates beneath the level of what they've said or shown. The Rain loves by falling specifically: by nourishing what it actually reaches rather than broadcasting generally. What the chart also shows is the specific work of loving as Rain — ensuring that you are nourished in return, that the ground you're falling toward provides something real, and that the sky you're falling from is genuinely yours."}, career:{teaser:"The work that generates real results for you is work that actually requires and values your particular quality of perception — where sensing what's genuinely true, nourishing what genuinely needs it, and the quiet depth of your specific intelligence produces something that the louder, more forceful approaches consistently miss. Your edge is not scale or visibility. It is the specific quality of what the Rain delivers when it falls in exactly the right place — and the domain where that delivery is most needed and most valued is where your work becomes genuinely irreplaceable."}, chapter:{teaser:"The decade you're living right now has a specific quality of finding the sky — a period when what you carry is finding its proper context, when the sensitivity that has been a challenge in some environments is finding the conditions where it is genuinely a gift. The cloud you're moving through right now is not a storm. It is the particular atmospheric condition that will produce your most specific and most genuine rainfall. This reading names what this decade is preparing your Rain to nourish, and what the sky is becoming."}, year:{teaser:"2026 brings fire that produces steam — a year where the water and the fire meet and something new emerges from that meeting: a quality of intensity, of becoming visible, of rising rather than falling. For the Rain, 2026 is a year of translation and elevation — what has been absorbed and held is finding a new form, a more visible expression, a way of being present that is not the quiet fall but the rising cloud. This reading names what specifically is being elevated this year in your chart."}, council:{teaser:"Four orientations are waiting in the full reading: how to direct your particular quality of sensitivity toward work that genuinely deserves and uses it, what this decade is preparing you to nourish, how the quiet depth of your love functions best and what you need from the people you're closest to, and what the missing element in your chart has been teaching the Rain about the sky it falls from. These are the chart's answers to the questions you've been sensing."}, synthesis:{teaser:"You are someone whose quiet depth is a genuine gift — and the arc of your life is one of finding the right ground for what you carry, the right conditions for what you nourish, and the right sky to fall from. The Rain doesn't need to become a river to matter. It needs to fall in exactly the right place. This reading places you inside the arc of that falling — and names precisely where the cloud is and what it's becoming."} }, decade:{theme:"Safety in Progress", teaser:"This decade is building genuine safety for your depth — and what becomes possible when that safety is real is beginning to show."}, compatibility:{teaser:"You need a partner who provides genuine grounding and consistent safety — someone whose presence is solid and real."} },

};

// ── Template lookup with fallback cascade ─────────────────────────────────

function buildTemplateKey(chartData) {
  const dm      = chartData.dayMaster.stem;
  const str     = chartData.dayMaster.strength;
  const missing = chartData.missingElements.slice(0,3).sort().join("+") || "none";
  const pattern = chartData.pattern.family;
  return `${dm}_${str}_${missing}_${pattern}`;
}

function findTemplate(chartData) {
  const dm  = chartData.dayMaster.stem;
  const str = chartData.dayMaster.strength;
  const missing = chartData.missingElements.slice(0,3).sort().join("+") || "none";
  const pattern = chartData.pattern.family;

  const attempts = [
    `${dm}_${str}_${missing}_${pattern}`,           // exact match
    `${dm}_${str}_${missing}_any`,                  // drop pattern
    `${dm}_${str}_any_${pattern}`,                  // drop missing
    `${dm}_${str}_base`,                            // DM + strength base
    `${dm}_moderate_base`,                          // DM only
    `${dm}_strong_base`,
    `${dm}_extremely_strong_base`,
  ];

  for (const key of attempts) {
    if (TEMPLATE_DB[key]) return { template: TEMPLATE_DB[key], matchedKey: key, exactMatch: key === attempts[0] };
  }
  return null;
}


// ████████████████████████████████████████████████████████████████████████
// LAYER 2 — AI READING ENGINE  →  src/engine/reading.js
// Runtime LLM calls for Seeker+ tiers. callAPI(), generateReading().
// Also contains Seeker-tier expand: expandSection().
// ████████████████████████████████████████████████████████████████████████

// ═══════════════════════════════════════════════════════════════════════════
// LAYER 2 — LLM READING GENERATOR (Seeker+ only)
// ═══════════════════════════════════════════════════════════════════════════

async function callAPI(sys, msg) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:sys, messages:[{role:"user",content:msg}] })
  });
  const data = await res.json();
  if (data.type==="exceeded_limit"||data.error) throw new Error(data.error?.message||data.type||"API error");
  const text = data.content?.[0]?.text||"";
  const raw = (text.match(/\{[\s\S]*\}/)||[""])[0].trim();
  if (!raw) throw new Error("No JSON in response");
  try { return JSON.parse(raw); }
  catch {
    let r=raw; const lc=r.lastIndexOf(","),lb=r.lastIndexOf("}");
    if (lc>lb) r=r.slice(0,lc);
    let o=0; for (const c of r) { if(c==="{")o++; else if(c==="}") o--; }
    r+="}".repeat(Math.max(0,o));
    try{return JSON.parse(r);}catch(e2){throw new Error(`JSON parse: ${e2.message}`);}
  }
}

const TG_FEEL = {
  "正官":"a quiet recognition — something you've built is being seen clearly",
  "七杀":"a pressure to prove the work is real",
  "偏印":"a deepening of skill and unusual learning",
  "正印":"support and validation arriving from an unexpected direction",
  "食神":"your creative voice flowing easily and finding reception",
  "伤官":"an unconventional impulse that wants to break with convention",
  "正财":"steady financial and relational momentum",
  "偏财":"entrepreneurial opportunity — a chance to build on your own terms",
  "比肩":"heightened independence and self-reliance",
  "劫财":"competition sharpening your edge",
  "—":   "a neutral and open energy",
};

function staticFlowText(stemTG, branchTG, period) {
  const s = TG_FEEL[stemTG?.zh] || "an active energy";
  const b = TG_FEEL[branchTG?.zh] || "a grounding undercurrent";
  const pfx = { day:"Today carries", month:"This month carries", year:"This year carries" };
  return `${pfx[period]} ${s} on the surface, with ${b} beneath. Move with it rather than around it.`;
}

function miniChart(cd) {
  const cur = cd.luckPillars.find(l=>l.isCurrent);
  return `${cd.dayMaster.polarity} ${cd.dayMaster.element} (${cd.dayMaster.stem}) ${cd.dayMaster.strength} | ${Object.values(cd.pillars).map(p=>p.stem+p.branch).join(" ")} | Missing:${cd.missingElements.join(",")||"none"} | ${cd.pattern.en} | Decade:${cur?cur.stem+cur.branch+" "+cur.element:"none"} | FlowYear:${cd.currentFlowYear.stem}${cd.currentFlowYear.branch} | ${cd.meta.gender} ${cd.meta.birthDate}`;
}

async function genAboveFold(cd) {
  const sys = `Spiritual reading engine. No jargon. Plain English. Second person. Wise mentor.
Return ONLY valid JSON: {"nature":"1 sentence","fire":"1 sentence","path":"1 sentence","bonds":"1 sentence","decadeTheme":"3 words","decadeReading":"1 sentence"}`;
  return callAPI(sys, miniChart(cd));
}

async function genBelowFold(cd) {
  const sys = `Spiritual reading engine. No jargon. Plain English. Second person. Wise mentor.
Return ONLY valid JSON: {"strengths":"1 sentence","challenges":"1 sentence","love":"1 sentence","career":"1 sentence","chapter":"1 sentence","year":"1 sentence","council":"1 sentence","synthesis":"1 sentence"}`;
  return callAPI(sys, miniChart(cd));
}

async function expandSection(sectionId, chartData, teaser) {
  const ANGLES = {
    nature:"Core identity — felt presence, what it creates, what friction it causes.",
    fire:"Missing element as architecture — what absence created structurally, when it arrives.",
    path:"Causal chain of success — what generates what, shadow of the wrong path.",
    bonds:"Fusion patterns as identity and love — what merges with who they are.",
    strengths:"3 genuine gifts grounded in chart data, each with its shadow named honestly.",
    challenges:"3 structural shadows as features not flaws — cause, pattern, invitation.",
    love:"Depth of bonding + element tension in partnership — how they love best.",
    career:"Work blueprint + specific domain + institutional fit.",
    chapter:"Current decade — what arrived, what it asks, what becomes possible.",
    year:"Flow year pressure and opportunity — how to meet it.",
    council:"4 practical orientations: work, decade, relationships, missing element.",
    synthesis:"Central story + central tension + one thing worth keeping.",
  };
  const sys = `No jargon. Plain English. Second person present tense. Wise mentor.
Return ONLY: {"body":"para1\\n\\npara2"} — 2 paragraphs, 3-4 sentences each. Specific to this chart.`;
  const msg = `${miniChart(chartData)}\nTeaser: "${teaser}" | Angle: ${ANGLES[sectionId]}`;
  const result = await callAPI(sys, msg);
  return result?.body || "";
}

// ─── TIER-AWARE READING GENERATOR ─────────────────────────────────────────

async function generateReading(chartData, userTier, onBelowFold) {
  const SECTION_KEYS = ["nature","fire","path","bonds","strengths","challenges","love","career","chapter","year","council","synthesis"];
  const cur = chartData.luckPillars.find(l=>l.isCurrent);

  // ── FREE TIER: template lookup, instant, $0 ──────────────────────────
  if (userTier === TIERS.FREE) {
    const found = findTemplate(chartData);
    if (!found) throw new Error("No template found. Chart combination not yet in database.");

    const { template, matchedKey, exactMatch } = found;
    const sections = {};
    SECTION_KEYS.forEach(k => {
      sections[k] = { teaser: template.sections[k]?.teaser || "", paragraphs:[""] };
    });

    return {
      sections,
      decades: cur ? [{
        order: cur.order,
        zh: cur.stem+cur.branch,
        theme: template.decade?.theme || "Your Current Chapter",
        teaser: template.decade?.teaser || "",
        reading: "",  // gated — Seeker+ only
      }] : [],
      today:     staticFlowText(chartData.currentFlowDay.stemTenGod,   chartData.currentFlowDay.branchTenGod,   "day"),
      thisMonth: staticFlowText(chartData.currentFlowMonth.stemTenGod, chartData.currentFlowMonth.branchTenGod, "month"),
      thisYear:  staticFlowText(chartData.currentFlowYear.stemTenGod,  chartData.currentFlowYear.branchTenGod,  "year"),
      _tier: "free",
      _templateKey: matchedKey,
      _exactMatch: exactMatch,
      _errors: [],
    };
  }

  // ── SEEKER+: live LLM above-fold, background below-fold ──────────────
  const aVal = await genAboveFold(chartData);
  const sections = {};
  SECTION_KEYS.forEach(k => { sections[k] = { teaser:"", paragraphs:[""] }; });
  ["nature","fire","path","bonds"].forEach(k => { sections[k].teaser = aVal[k]||""; });

  const reading = {
    sections,
    decades: cur ? [{ order:cur.order, zh:cur.stem+cur.branch, theme:aVal.decadeTheme||"", teaser:"", reading:aVal.decadeReading||"" }] : [],
    today:     staticFlowText(chartData.currentFlowDay.stemTenGod,   chartData.currentFlowDay.branchTenGod,   "day"),
    thisMonth: staticFlowText(chartData.currentFlowMonth.stemTenGod, chartData.currentFlowMonth.branchTenGod, "month"),
    thisYear:  staticFlowText(chartData.currentFlowYear.stemTenGod,  chartData.currentFlowYear.branchTenGod,  "year"),
    _tier: TIER_LABELS[userTier].toLowerCase(),
    _templateKey: null,
    _exactMatch: false,
    _errors: [],
  };

  genBelowFold(chartData).then(bVal => {
    ["strengths","challenges","love","career","chapter","year","council","synthesis"].forEach(k => {
      reading.sections[k].teaser = bVal[k]||"";
    });
    onBelowFold({ ...reading });
  }).catch(()=>{});

  return reading;
}

// ═══════════════════════════════════════════════════════════════════════════
// UI CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════


// ████████████████████████████████████████████████████████████████████████
// UI LAYER — REACT COMPONENTS  →  src/components/
// All React. Imports from content.js and engine/calculator.js.
// ████████████████████████████████████████████████████████████████████████

const C = {
  bg:"#f7f3ec",bgCard:"#f0ebe0",text:"#1d1b18",textSec:"#4a4540",textTer:"#8a8278",
  accent:"#8b7250",accentDark:"#5a4228",accentLight:"#c4a878",
  border:"#e0d8cc",borderLight:"#ece7df",fire:"#b04030",
  tierFree:"#6a9860", tierSeeker:"#8b7250", tierAdvisor:"#4870a0", tierOracle:"#7a6080",
};
const EL_C  = {Metal:"#6080a0",Wood:"#6a9860",Fire:"#b04030",Earth:"#a08850",Water:"#4870a0"};
const EL_ZH = {Metal:"金",Wood:"木",Fire:"火",Earth:"土",Water:"水"};

// ─── SECTION TITLES BY DAY MASTER ─────────────────────────────────────────
// Each stem carries its own archetype metaphor through all 12 section titles.
// The zh decorative character for "nature" = the stem itself (set dynamically).

const SECTION_TITLES_BY_STEM = {
  "甲": { // Yang Wood — The Oak
    nature:    "The Nature of Your Oak",
    fire:      "The Season You Were Waiting For",
    path:      "The Forest You Were Built to Become",
    bonds:     "The Roots That Run Beneath",
    strengths: "What You've Grown Into",
    challenges:"Where the Branch Bends",
    love:      "How the Oak Loves",
    career:    "The Work of Building a Forest",
    chapter:   "The Ring of Growth You're In",
    year:      "2026: Fire Clearing the Path",
    council:   "What the Roots Already Know",
    synthesis: "Standing at the Forest's Edge",
  },
  "乙": { // Yin Wood — The Vine
    nature:    "The Nature of Your Vine",
    fire:      "The Wall You Were Meant to Find",
    path:      "The Path That Winds and Arrives",
    bonds:     "Where You've Wrapped Your Roots",
    strengths: "What You've Grown Through",
    challenges:"Where the Vine Meets the Wind",
    love:      "How the Vine Loves",
    career:    "The Work of Reaching",
    chapter:   "The Wall You're Climbing Now",
    year:      "2026: Fire Along the Vine",
    council:   "What the Reaching Already Knows",
    synthesis: "Before You Release the Wall",
  },
  "丙": { // Yang Fire — The Sun
    nature:    "The Nature of Your Sun",
    fire:      "The Sky You Were Made to Cross",
    path:      "The Light That Draws People Forward",
    bonds:     "What Your Warmth Has Created",
    strengths: "What You Illuminate in Every Room",
    challenges:"Where the Light Meets the Long Shadow",
    love:      "How the Sun Loves",
    career:    "The Work of Genuine Illumination",
    chapter:   "The Arc of Sky You're Moving Through",
    year:      "2026: Fire Meets Fire",
    council:   "What the Light Already Knows",
    synthesis: "Before the Day Turns",
  },
  "丁": { // Yin Fire — The Candle
    nature:    "The Nature of Your Flame",
    fire:      "The Darkness You Were Made to Enter",
    path:      "The Work of Focused Light",
    bonds:     "What Your Flame Has Drawn Close",
    strengths: "What You Light in Every Room",
    challenges:"Where the Flame Meets the Wind",
    love:      "How the Candle Loves",
    career:    "The Work of Precision and Light",
    chapter:   "The Burning Season You're In",
    year:      "2026: When Flames Amplify",
    council:   "What the Flame Already Knows",
    synthesis: "Before the Wick Turns",
  },
  "戊": { // Yang Earth — The Mountain
    nature:    "The Nature of Your Mountain",
    fire:      "The Weather That Shapes the Stone",
    path:      "The Summit You Were Built to Be",
    bonds:     "What Has Been Built Upon You",
    strengths: "What You Hold Up",
    challenges:"Where the Mountain Meets the Sky",
    love:      "How the Mountain Loves",
    career:    "The Work of Holding Ground",
    chapter:   "The Elevation You're Living",
    year:      "2026: Fire on the Mountain",
    council:   "What the Stone Already Knows",
    synthesis: "The View From Here",
  },
  "己": { // Yin Earth — The Field
    nature:    "The Nature of Your Field",
    fire:      "The Seed You Were Made to Receive",
    path:      "The Harvest You Were Built to Grow",
    bonds:     "What Has Taken Root in You",
    strengths: "What You've Cultivated",
    challenges:"Where the Field Meets the Dry Season",
    love:      "How the Field Loves",
    career:    "The Work of Cultivation",
    chapter:   "The Season You're Growing Through",
    year:      "2026: Fire Ripening the Field",
    council:   "What the Soil Already Knows",
    synthesis: "Before the Next Planting",
  },
  "庚": { // Yang Metal — The Blade
    nature:    "The Nature of Your Blade",
    fire:      "The Forge You Were Built For",
    path:      "How You Were Made to Succeed",
    bonds:     "The Rare Thread Running Through You",
    strengths: "What You Carry Into Every Room",
    challenges:"Where You Meet Yourself",
    love:      "Your Heart",
    career:    "Your Work in the World",
    chapter:   "The Chapter You're Living Now",
    year:      "2026: The Year of Fire",
    council:   "A Council for This Season",
    synthesis: "A Word Before You Go",
  },
  "辛": { // Yin Metal — The Jewel
    nature:    "The Nature of Your Jewel",
    fire:      "The Pressure That Creates the Facet",
    path:      "The Standard You Were Made to Hold",
    bonds:     "What Has Been Polished Alongside You",
    strengths: "What You Clarify in Every Room",
    challenges:"Where the Jewel Meets the Rough",
    love:      "How the Jewel Loves",
    career:    "The Work of Discernment",
    chapter:   "The Facet Being Cut Right Now",
    year:      "2026: Fire in the Setting",
    council:   "What the Clarity Already Knows",
    synthesis: "The Final Polish",
  },
  "壬": { // Yang Water — The Ocean
    nature:    "The Nature of Your Ocean",
    fire:      "The Shore That Gives You Shape",
    path:      "The Current You Were Built to Follow",
    bonds:     "What Moves Beneath the Surface",
    strengths: "What You Carry in the Deep",
    challenges:"Where the Ocean Meets the Shore",
    love:      "How the Ocean Loves",
    career:    "The Work of the Deep",
    chapter:   "The Tide You're Living Now",
    year:      "2026: Fire on the Water",
    council:   "What the Deep Already Knows",
    synthesis: "Before the Next Tide",
  },
  "癸": { // Yin Water — The Rain
    nature:    "The Nature of Your Rain",
    fire:      "The Sky You Were Made to Fall From",
    path:      "The Ground You Were Made to Find",
    bonds:     "What Your Rain Has Fed",
    strengths: "What You Nourish Wherever You Fall",
    challenges:"Where the Rain Meets the Stone",
    love:      "How the Rain Loves",
    career:    "The Work of Quiet Nourishment",
    chapter:   "The Cloud You're Moving Through",
    year:      "2026: Steam Rising",
    council:   "What the Rain Already Knows",
    synthesis: "Before the Sky Clears",
  },
};

// Section nums, tags, zh decoratives — static across all stems
const SECTION_BASE = {
  nature:    { num:"I",    tag:"Who You Are",    zh_static:"木" },
  fire:      { num:"II",   tag:"Missing Element", zh_static:"火" },
  path:      { num:"III",  tag:"Your Path",       zh_static:"路" },
  bonds:     { num:"IV",   tag:"Hidden Bonds",    zh_static:"合" },
  strengths: { num:"V",    tag:"Strengths",       zh_static:"才" },
  challenges:{ num:"VI",   tag:"Challenges",      zh_static:"难" },
  love:      { num:"VII",  tag:"Love",            zh_static:"情" },
  career:    { num:"VIII", tag:"Career",          zh_static:"业" },
  chapter:   { num:"IX",  tag:"Life Chapter",    zh_static:"运" },
  year:      { num:"X",   tag:"This Year",       zh_static:"年" },
  council:   { num:"XI",  tag:"Guidance",        zh_static:"道" },
  synthesis: { num:"XII", tag:"Closing",         zh_static:"终" },
};

// Returns complete section meta for a given Day Master stem
// The "nature" section's zh shows the user's own stem character
function getSectionMeta(dayMasterStem) {
  const titles = SECTION_TITLES_BY_STEM[dayMasterStem] || SECTION_TITLES_BY_STEM["庚"];
  const meta = {};
  for (const id of Object.keys(SECTION_BASE)) {
    meta[id] = {
      ...SECTION_BASE[id],
      title: titles[id],
      // nature section: zh = user's own stem (personalised)
      // all others: zh = the static decorative character
      zh: id === "nature" ? (dayMasterStem || "元") : SECTION_BASE[id].zh_static,
    };
  }
  return meta;
}

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Noto+Serif+SC:wght@400;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'EB Garamond',Georgia,serif;background:${C.bg};color:${C.text}}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.fade{animation:fadeIn 0.4s ease forwards}
@keyframes pulse{0%,100%{opacity:0.4}50%{opacity:1}}
.pulse{animation:pulse 1.8s ease-in-out infinite}
`;

// ═══════════════════════════════════════════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

// ─── DAY MASTER HERO ──────────────────────────────────────────────────────────

// Element visual motifs — called inside component render, not at module level
function getElementMotif(element, color) {
  const s = {position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",opacity:0.12};
  if (element === "Metal") return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={s}>
      <polygon points="40,8 72,26 72,54 40,72 8,54 8,26" stroke={color} strokeWidth="1.5" fill="none"/>
      <polygon points="40,18 62,30 62,50 40,62 18,50 18,30" stroke={color} strokeWidth="0.8" fill="none"/>
      <line x1="40" y1="8" x2="40" y2="18" stroke={color} strokeWidth="1"/>
      <line x1="72" y1="26" x2="62" y2="30" stroke={color} strokeWidth="1"/>
      <line x1="72" y1="54" x2="62" y2="50" stroke={color} strokeWidth="1"/>
      <line x1="40" y1="72" x2="40" y2="62" stroke={color} strokeWidth="1"/>
      <line x1="8" y1="54" x2="18" y2="50" stroke={color} strokeWidth="1"/>
      <line x1="8" y1="26" x2="18" y2="30" stroke={color} strokeWidth="1"/>
    </svg>
  );
  if (element === "Wood") return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={s}>
      <path d="M40 72 C40 72 40 40 40 20" stroke={color} strokeWidth="1.5"/>
      <path d="M40 48 C30 38 14 34 8 30" stroke={color} strokeWidth="1"/>
      <path d="M40 48 C50 38 66 34 72 30" stroke={color} strokeWidth="1"/>
      <path d="M40 36 C32 26 20 22 14 18" stroke={color} strokeWidth="0.8"/>
      <path d="M40 36 C48 26 60 22 66 18" stroke={color} strokeWidth="0.8"/>
      <path d="M40 26 C36 18 32 12 30 8" stroke={color} strokeWidth="0.6"/>
      <path d="M40 26 C44 18 48 12 50 8" stroke={color} strokeWidth="0.6"/>
    </svg>
  );
  if (element === "Fire") return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={s}>
      {[0,45,90,135,180,225,270,315].map((deg,i) => (
        <line key={i} x1="40" y1="40"
          x2={40 + Math.cos(deg*Math.PI/180)*(i%2===0?30:20)}
          y2={40 + Math.sin(deg*Math.PI/180)*(i%2===0?30:20)}
          stroke={color} strokeWidth={i%2===0?"1.2":"0.7"}/>
      ))}
      <circle cx="40" cy="40" r="8" stroke={color} strokeWidth="1" fill="none"/>
      <circle cx="40" cy="40" r="16" stroke={color} strokeWidth="0.6" fill="none" strokeDasharray="3 3"/>
    </svg>
  );
  if (element === "Earth") return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={s}>
      <rect x="14" y="14" width="52" height="52" stroke={color} strokeWidth="1.5" fill="none"/>
      <rect x="24" y="24" width="32" height="32" stroke={color} strokeWidth="0.8" fill="none"/>
      <rect x="34" y="34" width="12" height="12" stroke={color} strokeWidth="0.6" fill="none"/>
      <line x1="14" y1="40" x2="66" y2="40" stroke={color} strokeWidth="0.6"/>
      <line x1="40" y1="14" x2="40" y2="66" stroke={color} strokeWidth="0.6"/>
    </svg>
  );
  if (element === "Water") return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={s}>
      <path d="M10 40 Q20 28 30 40 Q40 52 50 40 Q60 28 70 40" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M10 54 Q20 42 30 54 Q40 66 50 54 Q60 42 70 54" stroke={color} strokeWidth="1" fill="none"/>
      <path d="M10 26 Q20 14 30 26 Q40 38 50 26 Q60 14 70 26" stroke={color} strokeWidth="1" fill="none"/>
      <path d="M10 68 Q20 56 30 68 Q40 80 50 68 Q60 56 70 68" stroke={color} strokeWidth="0.6" fill="none"/>
      <path d="M10 12 Q20 0 30 12 Q40 24 50 12 Q60 0 70 12" stroke={color} strokeWidth="0.6" fill="none"/>
    </svg>
  );
  return null;
}

// Strength → ring fill percentage and label
const STRENGTH_RING = {
  extremely_strong: { pct:0.92, label:"Extremely Strong", sublabel:"The element is dominant — pure and concentrated" },
  strong:           { pct:0.72, label:"Strong",           sublabel:"Well-supported and self-directed" },
  moderate:         { pct:0.50, label:"Balanced",         sublabel:"Flexible — works across many conditions" },
  weak:             { pct:0.30, label:"Receptive",        sublabel:"Needs the right conditions to come through fully" },
  extremely_weak:   { pct:0.12, label:"Extremely Receptive", sublabel:"Highly context-dependent — finds strength through support" },
};


// ████████████████████████████████████████████████████████████████████████
// CONTENT LAYER — STATIC DATA  →  src/content/content.js
// All scripted text. No logic. The single source of truth for all
// reading content. This entire block moves to content.js on migration.
// ████████████████████████████████████████████████████████████████████████

// ═══════════════════════════════════════════════════════════════════════════
// WHO YOU ARE — STATIC TEMPLATE DATA
// Tier-independent: same content for Free / Seeker / Advisor / Oracle
// Format: teaser (1-2 sentence hook) + paragraphs (2 paragraphs, ≤500 words total)
// Source: hardcoded per Day Master stem — no LLM, no runtime generation
// ═══════════════════════════════════════════════════════════════════════════

const WHO_YOU_ARE = {
  "甲": {
    teaser: "You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",
    paragraphs: [
      "The Oak doesn't choose to reach toward the light. Reaching is simply what the Oak does — before the decision, before the intention, before anything else. There is a forward orientation in you that is so fundamental it doesn't register as ambition or drive. It registers as the only natural direction. People who spend significant time with you tend to find themselves thinking bigger, reaching further, believing more in what could exist. That isn't something you do deliberately. It is what happens in your proximity, because your nature is generative in the most structural sense.",
      "The shadow of the Oak is not weakness — it is the gap between where you are and where you can already see. The next stage is always visible before the current one has taken root, and there is a recurring pattern: reaching past what hasn't been fully integrated, growing through a difficulty rather than completing it, leaving behind what needed more time. The work that is quietly waiting for you is not more growth — it is learning to root as deeply as you reach. The Oak that grows tallest is the one whose roots went down first."
    ]
  },
  "乙": {
    teaser: "The path you take to get somewhere looks indirect to everyone watching — and arrives exactly where you always intended.",
    paragraphs: [
      "There is a quality in how you move through the world that looks like adaptability but is actually something more sophisticated: a precise intelligence about which surfaces are worth your energy and which ones will only cost you. The Vine doesn't fight the wall. It reads it — finding the path of least resistance not out of avoidance but out of an acute understanding of what actually works. This is not accommodation. It is a form of navigation that produces results the more forceful approach consistently misses, arriving at places that a less flexible intelligence simply cannot reach.",
      "What the Vine must learn is to trust its own position as firmly as it reads others'. There is a recurring question in your life: when is adapting a sophisticated strategy, and when has it quietly crossed into self-erasure? The two can feel identical from the inside. The work is not to become more rigid — the flexibility is genuinely your strength — but to build an inner position as solid as your reach outward. The Vine with roots holds the wall as much as the wall holds the Vine. That mutuality is what you are learning to inhabit."
    ]
  },
  "丙": {
    teaser: "People don't decide to orient toward you. They simply find themselves doing it.",
    paragraphs: [
      "The Sun doesn't perform its warmth. It simply is warm — and what is near it becomes more visible, more alive, more itself than it was before. There is a quality in your presence that operates before you've decided to deploy it: rooms shift when you enter them, conversations find a different register, people feel more seen than they expected to. This is not charisma as a cultivated skill. It is your nature doing what it was built to do. The warmth is structural, not situational. It shows up when you're tired, when you're distracted, when you're not trying — because it isn't something you switch on.",
      "The work of the Sun is not to shine more — it is to choose where to direct the light. Warmth given without direction diffuses, and there is a real cost to being the source of illumination for everyone who gets close. The question that recurs in your life is not whether you have enough to give — you do — but whether you are receiving as freely as you are giving. What gets illuminated when someone else turns their full attention toward you? That capacity, to be fully seen rather than only to illuminate, is the growing edge your nature has always been reaching toward."
    ]
  },
  "丁": {
    teaser: "What you give your full attention to becomes more fully itself — that is the rarest quality in a person.",
    paragraphs: [
      "The Candle doesn't illuminate everything in the room. It illuminates what it's pointed at — and what it illuminates, it illuminates completely. There is a precision in how you engage with the world that is not about limitation but about depth: the person in front of you receives a quality of attention so specific and so genuine that they see themselves more clearly in it than they do in most other mirrors. You have the capacity to make people feel genuinely seen in a way that is rare in human experience — not glanced at, not processed, but actually witnessed. That is a form of power most people underestimate because it doesn't announce itself.",
      "The recurring challenge for the Candle is the wind. The same focused quality that makes you effective can be experienced as intensity by people who didn't ask for full illumination — and there is work in learning when the full flame is what the moment needs and when a gentler light is what's called for. There is also this: the Candle gives light readily and receives it rarely. The people in your life benefit from your attention in ways they may not fully articulate. What you are learning — and this takes longer than it should — is how to receive that same quality of genuine witnessing in return."
    ]
  },
  "戊": {
    teaser: "You provide something most people spend their lives looking for: ground that doesn't move when everything else does.",
    paragraphs: [
      "The Mountain doesn't decide to be stable. Stability is the material it's made of — and people orient around you the way they orient around physical landmarks: as a reference point, as something they can find when they're lost, as the thing that tells them where they are. This happens without your arranging it. People in your life have built things on you — plans, confidence, their understanding of what holds — in ways you've probably never fully accounted for. The reliability you offer is not a service you provide. It is a structural fact about what you are, and it has been shaping the people around you since before you noticed it was happening.",
      "The work that is quietly waiting for the Mountain is not more holding — it is learning to allow movement before certainty fully arrives. There is a recurring pattern: waiting until the ground is absolutely solid before stepping, holding what could be released, remaining unmoved when being moved is exactly what the moment is asking for. The Mountain that never shifts can become a weight rather than a foundation. What the stone is slowly learning is the difference between the stability that holds and the rigidity that isolates — and that being genuinely open to being shaped by what matters is not a loss of groundedness but its fullest expression."
    ]
  },
  "己": {
    teaser: "The growth you create in others is so quiet you have probably never fully accounted for what you leave behind.",
    paragraphs: [
      "The Field doesn't announce its fertility. It simply grows things — and in your presence, people develop, projects find their form, ideas that were stalled begin to move again. This is not something you engineer. It is the quality of the ground you are, and it operates below the level of intention. The people who have spent significant time in your life have been changed by it in ways that are real and lasting, even when neither of you has named what happened. You cultivate without announcing it, nourish without requiring acknowledgment, and tend to what needs tending because that is simply what the Field does. It is a profound form of generosity — and it is so natural to you that you have probably been giving it without keeping any account of what has been given.",
      "The shadow of the Field is not its giving — it is what happens when the giving is not met with returning. A field that is only harvested, never replenished, gradually loses the very fertility that made it valuable. There is a question that lives beneath the surface of your life: are you receiving, with the same openness and consistency with which you give? The work is not to give less — it is to notice, honestly, where the reciprocity is real and where it isn't, and to tend the conditions that allow the Field to remain fertile rather than gradually depleted."
    ]
  },
  "庚": {
    teaser: "You don't sharpen your edge. You were born with one — and the question has always been what to cut toward.",
    paragraphs: [
      "The Blade doesn't decide to be precise. Precision is the nature of the metal, present before any work was done on it. There is a quality in how you see the world that arrives before the analysis: you register what is true in a situation, what is real in a person, what is actually happening beneath the surface — before the conscious process of assessment has even begun. This is not intelligence as something you apply. It is perception as something you simply have, in the same way a blade has an edge. The people in your life have probably noticed it before you did — the directness that doesn't perform itself, the clarity that sometimes arrives before anyone was ready for it, the quality of seeing through what isn't real without particularly trying to.",
      "The forge is the missing piece of the Blade's story — and for you, it arrived late. What fire does to exceptional metal is not damage it. It reveals it. The pressure you have felt — the external force with leverage over your direction that arrived in recent years — is not something happening to you. It is something happening for you, in the way that only real heat can make real work possible. The Blade that has been through the forge is categorically different from the Blade that hasn't. What is being asked of you right now is not endurance. It is transformation — and the edge that comes out the other side will be something even you haven't seen yet."
    ]
  },
  "辛": {
    teaser: "You notice things others pass over as if they were obvious — and cannot pretend the difference between what is excellent and what merely appears to be.",
    paragraphs: [
      "The Jewel doesn't acquire its clarity through effort. It is clear because of what it is made of — and the way you perceive quality, genuineness, and the distinction between what is real and what is performed operates as a primary sense rather than a considered judgment. You feel the difference before you name it. This gives you a kind of accuracy in your assessments that people who know you well come to rely on: when you say something is good, they know it is actually good, not just that it passed a surface evaluation. The standard you carry is not a preference or a cultivated taste. It is a structural feature of how you experience the world, as automatic and as precise as sight.",
      "The work of the Jewel is learning to inhabit a world that doesn't always offer what your standard requires — and to find a way to be fully present in it without either compromising the clarity or spending yourself on the gap. There is a recurring question in your life: when is the ideal genuinely available, and when is the gap between what is possible and what exists a form of suffering you are choosing to sustain? The growing edge here is not lowering the standard — it is extending toward yourself the same quality of grace you can perceive so clearly in others. The Jewel that is hardest on itself is cutting against the very clarity it was made to offer."
    ]
  },
  "壬": {
    teaser: "The depth you carry has always been larger than the space you have been given to show it.",
    paragraphs: [
      "The Ocean doesn't decide to be vast. Vastness is its nature — and what you carry, beneath the surface of how you present yourself, is larger and more complex than most of the contexts you move through have had the capacity to hold. There is a quality of depth in you that people sense before they can articulate what they're sensing: a quality of knowing more than is being said, of having considered things more thoroughly than the conversation has reached, of containing a range that the current exchange is not quite measuring. This is not performance. It is the actual scale of what you carry — and it has probably made you feel, at various points in your life, that you are being encountered at the surface when what you actually are is much further down.",
      "The challenge the Ocean faces is not depth — it is translation. The most important developmental work of your life is finding the forms through which what you carry at depth can actually reach people — forms they can receive, engage with, be changed by. The vastness that stays internal becomes isolation. The vastness that finds its channel becomes the most powerful force in any room it enters. The shore is not a limit on the Ocean. It is what gives the Ocean's power its shape and its direction. The question that is quietly waiting for you: what are the shores that give your particular depth its real form?"
    ]
  },
  "癸": {
    teaser: "You sense what's actually true in a room before anyone has said the thing — and you have learned, slowly, to trust that sensing.",
    paragraphs: [
      "The Rain doesn't decide what to nourish. It falls, and what it touches is changed — in ways that are real and lasting, even when neither the Rain nor what it nourishes has named what happened. There is a quality of perceptive sensitivity in you that is so fundamental you may have stopped noticing it: the ability to sense what is genuinely true in a situation, what someone is actually feeling beneath what they are presenting, what the room actually needs rather than what it is asking for. This operates below the level of analysis. It arrives before the conclusion. It is, at its best, the most accurate form of intelligence — and it has been informing your decisions and your relationships in ways you have probably only partially accounted for.",
      "The work of the Rain is building a container strong enough to hold its own sensitivity. The porousness that makes you perceptive — the quality of being genuinely affected by what you encounter — is also the quality that makes it genuinely difficult to know, in difficult moments, whose feeling is whose, whose need is yours to carry, which sky you are falling from. This is not weakness. It is the structural reality of a nature built for subtlety rather than insulation. What you are learning — and this is the central developmental work of your life — is to choose your ground deliberately: the people, environments, and conditions that genuinely deserve the particular quality of nourishment only you can offer."
    ]
  },
};


// ─── ARCHETYPE BRAND DATA ─────────────────────────────────────────────────
// Manifesto lines, seals, and refined gifts/edge for all 10 Day Masters.
// These are the brand-layer assets — concise, ownable, viral-ready.

const ARCHETYPE_MANIFESTO = {
  "甲": "Builds what others can only imagine. Growth is not ambition — it is the architecture.",
  "乙": "Finds the path no one else sees. Arrives exactly where it intended.",
  "丙": "Doesn't choose to illuminate. Simply is light — and everything near it comes alive.",
  "丁": "Illuminates completely what it's pointed at. Nothing more. Nothing less.",
  "戊": "People orient their lives around it without knowing why. The ground that holds.",
  "己": "Grows things in silence. Leaves everything it touches more alive than it found it.",
  "庚": "Precision before intention. An edge that was never chosen — only found.",
  "辛": "Perceives what is excellent the way others perceive temperature — before the question is asked.",
  "壬": "Holds more beneath the surface than it ever shows. Always has. Always will.",
  "癸": "Knows what is true before it is spoken. Nourishes what it touches without announcing it.",
};

// Archetype seals — unique geometric SVG marks, one per Day Master
// Rendered at 72×72, element color, opacity 0.9
function ArchetypeSeal({ stem, color, size = 72 }) {
  const s = size, h = s / 2;
  const seals = {
    "甲": ( // Oak: trunk + two branch tiers + root suggestions
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        <line x1="36" y1="66" x2="36" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <line x1="36" y1="44" x2="15" y2="30" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="36" y1="44" x2="57" y2="30" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="36" y1="30" x2="19" y2="18" stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
        <line x1="36" y1="30" x2="53" y2="18" stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
        <line x1="36" y1="20" x2="28" y2="10" stroke={color} strokeWidth="0.7" strokeLinecap="round"/>
        <line x1="36" y1="20" x2="44" y2="10" stroke={color} strokeWidth="0.7" strokeLinecap="round"/>
        <line x1="22" y1="64" x2="36" y2="56" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.35"/>
        <line x1="50" y1="64" x2="36" y2="56" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.35"/>
      </svg>
    ),
    "乙": ( // Vine: spiral wrap around vertical axis
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        <line x1="36" y1="8" x2="36" y2="64" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.25"/>
        <path d="M36 16 C52 18 56 28 48 34 C40 40 24 38 20 46 C16 54 24 62 36 62" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <circle cx="36" cy="16" r="2.5" fill={color} opacity="0.7"/>
        <line x1="48" y1="22" x2="56" y2="16" stroke={color} strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
        <line x1="22" y1="44" x2="14" y2="40" stroke={color} strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    "丙": ( // Sun: center circle + 8 rays alternating long/short
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="9" stroke={color} strokeWidth="1.6" fill="none"/>
        {[0,45,90,135,180,225,270,315].map((deg,i) => {
          const rad = deg * Math.PI / 180;
          const r1 = 13, r2 = i % 2 === 0 ? 28 : 22;
          return <line key={i} x1={36+r1*Math.cos(rad)} y1={36+r1*Math.sin(rad)} x2={36+r2*Math.cos(rad)} y2={36+r2*Math.sin(rad)} stroke={color} strokeWidth={i%2===0?"1.5":"0.9"} strokeLinecap="round"/>;
        })}
      </svg>
    ),
    "丁": ( // Candle: single upward flame shape
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        <path d="M36 64 C28 64 22 58 22 50 C22 38 30 28 36 8 C42 28 50 38 50 50 C50 58 44 64 36 64 Z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.08"/>
        <path d="M36 58 C32 58 29 55 29 50 C29 43 33 36 36 24 C39 36 43 43 43 50 C43 55 40 58 36 58 Z" stroke={color} strokeWidth="0.8" fill={color} fillOpacity="0.2"/>
        <line x1="36" y1="64" x2="36" y2="70" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <line x1="28" y1="68" x2="44" y2="68" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    "戊": ( // Mountain: three layered stacked lines tapering to peak
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        <polygon points="36,10 64,58 8,58" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.06"/>
        <line x1="20" y1="42" x2="52" y2="42" stroke={color} strokeWidth="1.1" opacity="0.45"/>
        <line x1="27" y1="30" x2="45" y2="30" stroke={color} strokeWidth="0.8" opacity="0.3"/>
        <line x1="8" y1="58" x2="64" y2="58" stroke={color} strokeWidth="1.5"/>
        <circle cx="36" cy="10" r="2" fill={color} opacity="0.7"/>
      </svg>
    ),
    "己": ( // Field: horizontal furrow lines with growth marks
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        {[38,46,54,62].map((y,i) => (
          <line key={i} x1="12" y1={y} x2="60" y2={y} stroke={color} strokeWidth={i===0?"1.4":"1.0"} opacity={1-i*0.18} strokeLinecap="round"/>
        ))}
        {[20,30,40,50].map((x,i) => (
          <g key={i}>
            <line x1={x} y1="36" x2={x} y2="22" stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
            <line x1={x} y1="26" x2={x-5} y2="18" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
            <line x1={x} y1="26" x2={x+5} y2="18" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
          </g>
        ))}
      </svg>
    ),
    "庚": ( // Blade: bisected hexagon + vertical axis + center point
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        <polygon points="36,8 64,23 64,49 36,64 8,49 8,23" stroke={color} strokeWidth="1.5" fill="none"/>
        <polygon points="36,18 54,28 54,44 36,54 18,44 18,28" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5"/>
        <line x1="36" y1="8" x2="36" y2="64" stroke={color} strokeWidth="1.8"/>
        <circle cx="36" cy="36" r="3" fill={color} opacity="0.7"/>
      </svg>
    ),
    "辛": ( // Jewel: faceted diamond with inner cross lines
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        <polygon points="36,8 62,36 36,64 10,36" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.05"/>
        <polygon points="36,18 54,36 36,54 18,36" stroke={color} strokeWidth="0.9" fill="none" opacity="0.6"/>
        <line x1="10" y1="36" x2="62" y2="36" stroke={color} strokeWidth="0.6" opacity="0.3"/>
        <line x1="36" y1="8" x2="36" y2="64" stroke={color} strokeWidth="0.6" opacity="0.3"/>
        <line x1="18" y1="18" x2="54" y2="54" stroke={color} strokeWidth="0.5" opacity="0.2"/>
        <line x1="54" y1="18" x2="18" y2="54" stroke={color} strokeWidth="0.5" opacity="0.2"/>
        <circle cx="36" cy="36" r="2.5" fill={color} opacity="0.6"/>
      </svg>
    ),
    "壬": ( // Ocean: concentric depth rings + horizon line
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        {[28,20,13,7].map((r,i) => (
          <circle key={i} cx="36" cy="36" r={r} stroke={color} strokeWidth={1.4-i*0.2} fill="none" opacity={0.9-i*0.15}/>
        ))}
        <line x1="8" y1="36" x2="64" y2="36" stroke={color} strokeWidth="1.6" opacity="0.4"/>
        <line x1="8" y1="36" x2="64" y2="36" stroke={color} strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3"/>
      </svg>
    ),
    "癸": ( // Rain: three wave arcs + vertical fall dashes
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        <path d="M10 22 Q18 12 26 22 Q34 32 42 22 Q50 12 58 22 Q66 32 74 22" stroke={color} strokeWidth="1.5" fill="none" opacity="0.85"/>
        <path d="M10 36 Q18 26 26 36 Q34 46 42 36 Q50 26 58 36 Q66 46 74 36" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6"/>
        <path d="M10 50 Q18 40 26 50 Q34 60 42 50 Q50 40 58 50 Q66 60 74 50" stroke={color} strokeWidth="0.8" fill="none" opacity="0.35"/>
        {[20,32,44,56].map((x,i) => (
          <line key={i} x1={x} y1="56" x2={x-3} y2="66" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.45"/>
        ))}
      </svg>
    ),
  };
  return seals[stem] || null;
}

// Chart-specific profile text — generated from computed data, no LLM
function buildDayMasterProfile(chart) {
  const dm = chart.dayMaster;
  const sr = STRENGTH_RING[dm.strength] || STRENGTH_RING.moderate;

  const ARCHETYPES = {
    "甲":"The Oak", "乙":"The Vine", "丙":"The Sun",  "丁":"The Candle",
    "戊":"The Mountain", "己":"The Field", "庚":"The Blade", "辛":"The Jewel",
    "壬":"The Ocean", "癸":"The Rain",
  };

  // Core lines — archetype-voice, third person, describes the character
  const CORE_LINES = {
    "甲": "The Oak grows toward light before it decides to — its nature is forward motion, its gift is building what others can only imagine.",
    "乙": "The Vine finds its way not through force but through intelligence — it reads every surface and arrives where the Oak never could.",
    "丙": "The Sun doesn't choose to warm. It simply is warm — and everything near it becomes more visible, more alive, more itself.",
    "丁": "The Candle illuminates what it's pointed at completely. Precision and warmth in the same focused flame.",
    "戊": "The Mountain is what people orient by without knowing why — the ground that holds when everything else shifts.",
    "己": "The Field doesn't announce its fertility. It simply grows things — quietly, consistently, without requiring acknowledgment.",
    "庚": "The Blade carries a precision that arrives before the decision to look — an edge present from the beginning, waiting to find its purpose.",
    "辛": "The Jewel perceives what is genuinely excellent the way others perceive temperature — automatically, accurately, before a word is spoken.",
    "壬": "The Ocean holds more beneath its surface than it ever shows — and the depth has always been larger than the space given to display it.",
    "癸": "The Rain senses what is true in a room before anyone has said the thing — and nourishes what it touches without announcing it.",
  };

  // Core Gifts — punchy, 3-5 words, instantly quotable (MBTI-style memorability)
  const CORE_STRENGTHS = {
    "甲": ["Vision before proof exists", "Structural courage — goes first", "Others build on you"],
    "乙": ["Navigates what others can't", "Bends without breaking", "Connection that actually lasts"],
    "丙": ["Changes rooms on entry", "Warmth as structure, not performance", "Belief that moves people"],
    "丁": ["Makes people feel genuinely seen", "Precision of attention", "Quality through full focus"],
    "戊": ["The reference point in any room", "Patience that outlasts pressure", "Reliability as structural fact"],
    "己": ["Grows what others abandon", "Care without announcement", "Reads what things need to flourish"],
    "庚": ["Sees through what isn't real", "Creative force that won't dilute", "Goes further than most dare"],
    "辛": ["Accuracy others come to rely on", "Work of real distinction", "Standards that outlast trends"],
    "壬": ["Depth others simply can't reach", "Synthesizes across the full range", "Holds without needing to control"],
    "癸": ["Senses truth before it's said", "Nourishes everything it reaches", "Quiet intelligence that outlasts noise"],
  };

  // Growing Edge — invitations not diagnoses, concise
  const CORE_SHADOWS = {
    "甲": ["Root as deep as you reach", "Receive support — mean it", "Let what's planted land"],
    "乙": ["Trust your own position", "Know when adapting becomes erasing", "Build inward as much as outward"],
    "丙": ["Choose where to direct the light", "Receive as freely as you give", "Be seen — not only illuminating"],
    "丁": ["Read the room before the full flame", "Receive witnessing in return", "Focused light is enough"],
    "戊": ["Allow movement before certainty", "Stay open to being shaped", "Let others carry some weight"],
    "己": ["Harvest for yourself too", "Know when the field is full", "Receive nourishment as naturally as you give it"],
    "庚": ["Let heat shape you, not just test you", "Feedback is information, not challenge", "Make room inside the precision"],
    "辛": ["Find peace in what's available", "Extend yourself the grace you see in others", "Your facet is already enough"],
    "壬": ["Translate depth into forms others can reach", "Choose which currents are worth following", "Find the shores that give you shape"],
    "癸": ["Build a container for your sensitivity", "Choose your ground deliberately", "Let yourself be nourished in return"],
  };

  // Who You Are — pulled from WHO_YOU_ARE template constant
  const wya = WHO_YOU_ARE[dm.stem] || { teaser: "", paragraphs: [] };

  return {
    archetype:      ARCHETYPES[dm.stem] || "",
    manifesto:      ARCHETYPE_MANIFESTO[dm.stem] || "",
    coreLine:       CORE_LINES[dm.stem] || "",
    strengths:      CORE_STRENGTHS[dm.stem] || [],
    shadows:        CORE_SHADOWS[dm.stem] || [],
    whoYouAreTeaser:     wya.teaser,
    whoYouAreParagraphs: wya.paragraphs || [],
    strengthRing:   sr,
  };
}

// SVG strength ring — partial circle, same as before
function StrengthRing({ pct, color, stem, size = 80 }) {
  const r = (size / 2) - 7;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * pct;
  const gap  = circumference * (1 - pct);
  const center = size / 2;
  return (
    <svg width={size} height={size} style={{display:"block"}}>
      <circle cx={center} cy={center} r={r} fill="none" stroke={`${color}20`} strokeWidth="2.5"/>
      <circle cx={center} cy={center} r={r} fill="none"
        stroke={color} strokeWidth="2.5"
        strokeDasharray={`${dash} ${gap}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
        style={{transition:"stroke-dasharray 0.8s ease"}}
      />
      <text x={center} y={center+2}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Noto Serif SC', Georgia, serif"
        fontSize={size * 0.30} fontWeight="600"
        fill={color}
      >{stem}</text>
    </svg>
  );
}

function DayMasterHero({ chart }) {
  const [whoOpen, setWhoOpen] = useState(false);
  const dm = chart.dayMaster;
  const color = EL_C[dm.element];
  const profile = buildDayMasterProfile(chart);
  const polarity = dm.polarity === "yang" ? "Yang" : "Yin";

  const natureTeaser = profile.whoYouAreTeaser;
  const bodyParas    = profile.whoYouAreParagraphs || [];

  const bgMap = {
    Metal:"linear-gradient(135deg, #eef2f8 0%, #f0ebe0 100%)",
    Wood: "linear-gradient(135deg, #eef5ee 0%, #f0ebe0 100%)",
    Fire: "linear-gradient(135deg, #f9efee 0%, #f0ebe0 100%)",
    Earth:"linear-gradient(135deg, #f5f0e8 0%, #f0ebe0 100%)",
    Water:"linear-gradient(135deg, #eef1f8 0%, #f0ebe0 100%)",
  };

  return (
    <div style={{borderRadius:14,border:`1.5px solid ${color}40`,background:bgMap[dm.element]||C.bgCard,marginBottom:24,overflow:"hidden"}} className="fade">

      {/* ── HERO: Seal + Identity token + Title + Manifesto ── */}
      <div style={{padding:"24px 20px 18px",textAlign:"center",borderBottom:`0.5px solid ${color}20`,position:"relative"}}>

        {/* Seal */}
        <div style={{display:"flex",justifyContent:"center",marginBottom:14}}>
          <ArchetypeSeal stem={dm.stem} color={color} size={72}/>
        </div>

        {/* Identity token: 庚 · Yang Metal · Blade */}
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:`${color}10`,border:`0.5px solid ${color}30`,borderRadius:20,padding:"4px 14px",marginBottom:12}}>
          <span style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:13,color:color,fontWeight:400}}>{dm.stem}</span>
          <span style={{width:3,height:3,borderRadius:"50%",background:`${color}50`,display:"inline-block"}}/>
          <span style={{fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:color,fontFamily:"'EB Garamond',Georgia,serif"}}>{polarity} {dm.element}</span>
          <span style={{width:3,height:3,borderRadius:"50%",background:`${color}50`,display:"inline-block"}}/>
          <span style={{fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:color,fontFamily:"'EB Garamond',Georgia,serif"}}>{profile.archetype.replace("The ","")}</span>
        </div>

        {/* Archetype title — hero-sized */}
        <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:38,fontWeight:600,color:color,lineHeight:1,marginBottom:8}}>
          {profile.archetype}
        </div>

        {/* Manifesto line — archetype description, not user description */}
        <div style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:13.5,lineHeight:1.7,color:C.textSec,fontStyle:"italic",maxWidth:280,margin:"0 auto"}}>
          {profile.manifesto}
        </div>
      </div>

      {/* ── BODY: Who You Are + Gifts/Edge ── */}
      <div style={{padding:"18px 20px 20px"}}>

        {/* Strength indicator — compact, inline */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:18}}>
          <StrengthRing pct={profile.strengthRing.pct} color={color} stem={dm.stem} size={52}/>
          <div>
            <div style={{fontSize:8,letterSpacing:1.5,textTransform:"uppercase",color:color,fontFamily:"'EB Garamond',Georgia,serif"}}>{profile.strengthRing.label}</div>
            <div style={{fontSize:11,color:C.textTer,fontFamily:"'EB Garamond',Georgia,serif",fontStyle:"italic",marginTop:1}}>{profile.strengthRing.sublabel}</div>
          </div>
        </div>

        {/* Who You Are teaser + expand */}
        {natureTeaser && (
          <div style={{marginBottom:18,paddingBottom:18,borderBottom:`0.5px solid ${color}15`}}>
            <div style={{fontSize:8,letterSpacing:2,textTransform:"uppercase",color:color,fontFamily:"'EB Garamond',Georgia,serif",marginBottom:8}}>Who You Are</div>
            <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:14.5,lineHeight:1.85,color:C.textSec,fontStyle:"italic",marginBottom:0}}>
              {natureTeaser}
            </p>
            {whoOpen && bodyParas.length > 0 && (
              <div style={{marginTop:14}} className="fade">
                {bodyParas.map((para,i) => (
                  <p key={i} style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:14,lineHeight:1.9,color:C.textSec,marginBottom:i<bodyParas.length-1?"1.1em":0}}>
                    {para}
                  </p>
                ))}
              </div>
            )}
            {!whoOpen && bodyParas.length > 0 && (
              <div style={{height:14,marginTop:4,background:`linear-gradient(to bottom, transparent, ${bgMap[dm.element]?.split("0%,")[1]?.split("100%")[0]?.trim()||"#f0ebe0"})`}}/>
            )}
            {bodyParas.length > 0 && (
              <button onClick={()=>setWhoOpen(o=>!o)} style={{marginTop:whoOpen?12:2,background:"transparent",border:`0.5px solid ${color}40`,borderRadius:20,cursor:"pointer",padding:"5px 14px",display:"flex",alignItems:"center",gap:6,fontFamily:"'EB Garamond',Georgia,serif",fontSize:12,color:color,fontStyle:"italic"}}>
                {whoOpen
                  ? <><span style={{fontSize:10}}>↑</span> Show less</>
                  : <><span style={{fontSize:10}}>↓</span> Read more about {profile.archetype}</>
                }
              </button>
            )}
          </div>
        )}

        {/* Core Gifts · Growing Edge — two column */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div style={{background:`${color}07`,borderRadius:10,padding:"11px 13px",border:`0.5px solid ${color}18`}}>
            <div style={{fontSize:8,letterSpacing:1.5,textTransform:"uppercase",color:color,marginBottom:9,fontFamily:"'EB Garamond',Georgia,serif",fontWeight:500}}>Core Gifts</div>
            {profile.strengths.map((s,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:6,marginBottom:i<profile.strengths.length-1?7:0}}>
                <div style={{width:3,height:3,borderRadius:"50%",background:color,flexShrink:0,marginTop:6}}/>
                <span style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:12.5,lineHeight:1.55,color:C.textSec}}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{background:`${C.accent}05`,borderRadius:10,padding:"11px 13px",border:`0.5px solid ${C.accent}12`}}>
            <div style={{fontSize:8,letterSpacing:1.5,textTransform:"uppercase",color:C.accent,marginBottom:9,fontFamily:"'EB Garamond',Georgia,serif",fontWeight:500}}>Growing Edge</div>
            {profile.shadows.map((s,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:6,marginBottom:i<profile.shadows.length-1?7:0}}>
                <div style={{width:3,height:3,borderRadius:"50%",background:C.accentLight,flexShrink:0,marginTop:6}}/>
                <span style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:12.5,lineHeight:1.55,color:C.textSec}}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function PillarGrid({ chart }) {
  const labels = { year:"年", month:"月", day:"日", hour:"时" };
  return (
    <div style={{display:"flex",gap:6,marginBottom:16}}>
      {["year","month","day","hour"].map(p => {
        const pl = chart.pillars[p], isDay = p==="day";
        return (
          <div key={p} style={{flex:1,borderRadius:10,border:isDay?`1.5px solid ${C.accentLight}`:`1px solid ${C.border}`,background:isDay?"#f5edd8":C.bgCard,padding:"10px 4px",textAlign:"center"}}>
            <div style={{fontSize:8,color:C.textTer,letterSpacing:1,marginBottom:5,textTransform:"uppercase"}}>{labels[p]}</div>
            <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:29,lineHeight:1,color:isDay?C.accentDark:EL_C[pl.stemElement],fontWeight:isDay?600:400}}>{pl.stem}</div>
            <div style={{fontSize:7,color:EL_C[pl.stemElement],marginBottom:7,marginTop:2}}>{pl.stemElement}</div>
            <div style={{height:"0.5px",background:C.border,margin:"0 6px 7px"}}/>
            <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:29,lineHeight:1,color:EL_C[pl.branchElement]}}>{pl.branch}</div>
            <div style={{fontSize:7,color:EL_C[pl.branchElement],marginTop:3}}>{pl.branchElement}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── ELEMENT ICONS — inline SVG per element ───────────────────────────────
function ElementIcon({ el, color, size=15 }) {
  const s = size;
  const icons = {
    Metal: <svg width={s} height={s} viewBox="0 0 18 18" fill="none"><polygon points="9,2 16,6 16,12 9,16 2,12 2,6" stroke={color} strokeWidth="1.4" fill="none"/><circle cx="9" cy="9" r="2.5" fill={color} opacity="0.65"/></svg>,
    Wood:  <svg width={s} height={s} viewBox="0 0 18 18" fill="none"><line x1="9" y1="16" x2="9" y2="4" stroke={color} strokeWidth="1.6" strokeLinecap="round"/><line x1="9" y1="10" x2="4" y2="7" stroke={color} strokeWidth="1.2" strokeLinecap="round"/><line x1="9" y1="10" x2="14" y2="7" stroke={color} strokeWidth="1.2" strokeLinecap="round"/><line x1="9" y1="7" x2="5.5" y2="4.5" stroke={color} strokeWidth="0.9" strokeLinecap="round"/><line x1="9" y1="7" x2="12.5" y2="4.5" stroke={color} strokeWidth="0.9" strokeLinecap="round"/></svg>,
    Earth: <svg width={s} height={s} viewBox="0 0 18 18" fill="none"><rect x="3" y="3" width="12" height="12" rx="1.5" stroke={color} strokeWidth="1.4" fill="none"/><line x1="3" y1="9" x2="15" y2="9" stroke={color} strokeWidth="0.8" opacity="0.5"/><line x1="9" y1="3" x2="9" y2="15" stroke={color} strokeWidth="0.8" opacity="0.5"/></svg>,
    Water: <svg width={s} height={s} viewBox="0 0 18 18" fill="none"><path d="M2 7 Q5 4 9 7 Q13 10 16 7" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M2 11 Q5 8 9 11 Q13 14 16 11" stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.65"/></svg>,
    Fire:  <svg width={s} height={s} viewBox="0 0 18 18" fill="none"><path d="M9 16 C5 16 3 13 3 10 C3 6 7 3 9 1 C11 3 15 6 15 10 C15 13 13 16 9 16 Z" stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.12"/><path d="M9 14 C7 14 6 12.5 6 11 C6 8.5 8 6.5 9 5 C10 6.5 12 8.5 12 11 C12 12.5 11 14 9 14 Z" fill={color} opacity="0.35"/></svg>,
  };
  return icons[el] || null;
}

// ─── ELEMENT SPECTRUM — Section 2 ─────────────────────────────────────────
// Replaces old ElementBars. Single unified component covering:
//   D1: element counts, dominant, missing, strength verdict
//   Insights: dominant + missing one-liners with guidance
//   Lifts / depletes: what lifts you / what depletes you

// Per-stem favourable / unfavourable element data
const ELEMENT_ENERGIES = {
  "甲":{ lifts:[{el:"Water",line:"Nourishes the roots — the missing foundation"},{el:"Fire",line:"Channels growth into visible results"}], depletes:[{el:"Metal",line:"Cuts growth directly — the primary opposing force"},{el:"Earth",line:"Absorbs water before it reaches the roots"}] },
  "乙":{ lifts:[{el:"Water",line:"Nourishes the vine from below"},{el:"Fire",line:"Draws the vine upward and outward"}], depletes:[{el:"Metal",line:"Cuts the vine — the most direct opposing force"},{el:"Earth",line:"Too much soil smothers rather than supports"}] },
  "丙":{ lifts:[{el:"Wood",line:"Feeds the flame — sustains warmth when it might exhaust itself"},{el:"Fire",line:"Genuine conviction that costs something carries furthest"}], depletes:[{el:"Water",line:"Extinguishes what the Sun works hardest to sustain"},{el:"Metal",line:"Absorbs warmth before it reaches who it's meant for"}] },
  "丁":{ lifts:[{el:"Wood",line:"Sustains the flame through steady nourishment"},{el:"Fire",line:"Deepens the warmth and focus the candle carries"}], depletes:[{el:"Water",line:"Extinguishes the focused flame"},{el:"Metal",line:"Draws the light away before it can illuminate"}] },
  "戊":{ lifts:[{el:"Fire",line:"Warms the mountain — activates what has been still"},{el:"Earth",line:"More ground deepens the foundation's reach"}], depletes:[{el:"Wood",line:"Roots break the stone — the primary destabilising force"},{el:"Water",line:"Erodes the mountain over time"}] },
  "己":{ lifts:[{el:"Fire",line:"Warms the field — activates growth and ripening"},{el:"Earth",line:"More soil deepens the capacity to nourish"}], depletes:[{el:"Wood",line:"Takes without giving — drains the field's fertility"},{el:"Water",line:"Too much floods rather than nourishes"}] },
  "庚":{ lifts:[{el:"Fire",line:"Gives the edge purpose — transforms precision into mastery"},{el:"Wood",line:"Channels precision outward into results"}], depletes:[{el:"Metal",line:"More Metal deepens rigidity — already full"},{el:"Water",line:"Cools what needs to stay hot"}] },
  "辛":{ lifts:[{el:"Water",line:"Brings out the jewel's clarity and brightness"},{el:"Earth",line:"Holds and protects the gem's setting"}], depletes:[{el:"Fire",line:"The heat that tests — without Earth, it risks damaging the facet"},{el:"Metal",line:"Too much Metal crowds rather than refines"}] },
  "壬":{ lifts:[{el:"Metal",line:"Generates Water — the primary source of support"},{el:"Water",line:"More depth amplifies what the Ocean can hold and reach"}], depletes:[{el:"Earth",line:"Dams the current — the primary opposing force"},{el:"Fire",line:"Evaporates depth before it can be used"}] },
  "癸":{ lifts:[{el:"Wood",line:"Flow with the dominant force — it amplifies everything"},{el:"Water",line:"Supports the core while feeding what grows"}], depletes:[{el:"Metal",line:"Cuts what's dominant — disrupts the natural current"},{el:"Fire",line:"Burns Wood — undermines the entire foundation"}] },
};


// ─── ENERGY CONDITION READINGS — 10 stems × 3 bands ──────────────────────
// portrait: what this condition feels like for THIS archetype (2 sentences)
// dynamic:  what it creates specifically (1 sentence)
// practice: the specific Channel/Nourish/Maintain action for this archetype (1 sentence)
// Band mapping: extremely_strong|strong → concentrated · moderate → balanced · weak|extremely_weak → open

const ENERGY_CONDITION_READINGS = {
  "甲": {
    concentrated: {
      portrait: "The Oak at full force reaches before it decides to — the growth is so natural it becomes structural, and the question is not whether it will reach something but whether what it reaches can hold the weight of that arrival. At this concentration, the Oak's generosity becomes its primary risk: building for others what it hasn't yet finished building for itself.",
      dynamic:  "The energy pushes forward at a rate that consistently outpaces consolidation — the next stage is already visible before the foundations of the current one have been tested.",
      practice: "Before beginning the next thing, spend real time with what you've already built — the Oak that roots as deeply as it reaches is the one that eventually stands alone.",
    },
    balanced: {
      portrait: "The Oak in equilibrium is rare and genuinely powerful — the reach and the root are in conversation with each other, and what gets built at this level has a quality of permanence that the concentrated Oak often sacrifices for speed. The vision is still present; the patience to let it take its full form has arrived alongside it.",
      dynamic:  "Growth and consolidation are running at the same pace — the energy produces things that genuinely last rather than things that need to be rebuilt.",
      practice: "Protect this equilibrium consciously — the Oak's natural instinct is to reach further, and the temptation to accelerate is always present even when the conditions don't require it.",
    },
    open: {
      portrait: "The Oak that needs nourishment becomes its most sensitive form — the vision is entirely intact, but the energy requires the right conditions to move from potential into form. This is not a diminished Oak; it is one that has learned, through necessity, the specific quality of soil it actually needs.",
      dynamic:  "The growth is real but conditional — in genuinely supportive environments this energy produces results that surprise even the Oak itself; in the wrong conditions, the reach quietly withdraws.",
      practice: "Invest deliberately in the environments and relationships that produce real movement — the Oak that finds its soil stops waiting and starts building.",
    },
  },
  "乙": {
    concentrated: {
      portrait: "The Vine at high concentration finds paths everywhere — the intelligence that reads surfaces and discovers routes becomes so active that it can mistake movement for arrival. The risk is not that the Vine can't navigate; it's that it navigates so continuously it never fully commits to the wall it's on.",
      dynamic:  "The flexibility that is the Vine's greatest gift at this concentration risks becoming restlessness — adapting before adaptation is needed, reading exits before the current surface has been fully explored.",
      practice: "Choose one wall and climb it completely — the Vine's intelligence is most powerful when it is in service of genuine arrival rather than the perpetual exploration of options.",
    },
    balanced: {
      portrait: "The Vine in equilibrium has what it's always been reaching for — a surface worth committing to and roots deep enough to hold. The intelligence to find the right path and the stability to follow it through are finally present at the same moment.",
      dynamic:  "The adaptability serves direction rather than replacing it — the Vine's natural gift of finding the non-obvious route is now working toward a specific and sustained destination.",
      practice: "Notice what you're building rather than where you're going — the Vine in balance is often making something more significant than it realises, and naming it helps it grow.",
    },
    open: {
      portrait: "The Vine that needs nourishment is perhaps the most acutely relational of all the archetypes at this energy level — the intelligence is entirely present but it requires something genuine to push against, something real to climb. Without it, the Vine doesn't fail; it simply doesn't reach.",
      dynamic:  "The sensitivity that makes the Vine extraordinary in the right environment becomes exposure in the wrong one — what lifts this energy is specific, and what depletes it is equally specific.",
      practice: "Build the conditions before building the thing — identify the surface genuinely worth your reach and let everything else wait.",
    },
  },
  "丙": {
    concentrated: {
      portrait: "The Sun at full concentration illuminates everything in reach — the warmth is structural, not situational, and it operates whether or not it's been invited. At this level the Sun's primary challenge is not sustaining the warmth but choosing where to direct it, because diffuse warmth costs the same as focused warmth and produces a fraction of the result.",
      dynamic:  "The presence fills every room it enters, which means it is constantly being consumed by contexts that did not specifically need what it had to offer.",
      practice: "Choose three things the warmth is for and let everything else receive less — the Sun that chooses its horizon illuminates what matters rather than everything at once.",
    },
    balanced: {
      portrait: "The Sun in equilibrium has found the right arc of sky — the warmth reaches who it's for, the presence does its work without exhausting its source, and what gets illuminated at this level tends to be genuinely changed by the encounter. This is the Sun at its most powerful: sustained, directed, and fully present.",
      dynamic:  "The energy produces lasting impact rather than momentary brightness — what this Sun touches stays changed, because the warmth arrived at the depth that actually reaches people.",
      practice: "Receive as freely as you give — the Sun in balance is only possible when the reciprocity is real, and this is the moment to build that in deliberately.",
    },
    open: {
      portrait: "The Sun that needs nourishment is a paradox that confuses people who know it — the warmth is entirely real but it requires specific conditions to sustain. What looks like inconsistency from outside is actually precise sensitivity: this Sun knows, better than anyone, exactly what feeds it and what doesn't.",
      dynamic:  "The warmth arrives fully in conditions of genuine reciprocity and dims perceptibly in its absence — not performance, but physics.",
      practice: "Protect the conditions that sustain your warmth rather than spending it on environments that won't return it — what the Sun nourishes should nourish the Sun.",
    },
  },
  "丁": {
    concentrated: {
      portrait: "The Candle at full concentration illuminates what it's pointed at with an intensity that can feel overwhelming to what isn't prepared for that quality of attention. The focus is the gift and the friction simultaneously — everything receives the full flame whether or not that was what the moment required.",
      dynamic:  "The precision that makes this energy extraordinary in the right moment becomes pressure in everyday interactions — the Candle at this level is calibrating continuously between full illumination and what the room can actually receive.",
      practice: "Learn to modulate before being asked to — the Candle that can choose between full focus and gentle warmth becomes far more effective than one that can only offer the full flame.",
    },
    balanced: {
      portrait: "The Candle in equilibrium has the quality of attention the world most needs from it and the wisdom to deploy it precisely. The focus is present; so is the judgment about when to use it fully. What gets illuminated at this level is illuminated completely and chosen deliberately.",
      dynamic:  "The precision serves connection rather than creating intensity — this Candle makes people feel genuinely seen without making them feel exposed.",
      practice: "Trust the quality of your attention as it is — the Candle in balance doesn't need to do more, it needs to choose better where the light goes.",
    },
    open: {
      portrait: "The Candle that needs nourishment is exquisitely context-sensitive — the focus is entirely intact but it requires genuine reciprocity to burn at full depth. This is the Candle that gives its best illumination to those who have given it something real to focus on.",
      dynamic:  "The quality of attention this energy produces is directly proportional to the quality of what it's receiving — in genuine exchange it burns more brightly than almost anything; in one-sided contexts it dims to protect what it carries.",
      practice: "Seek the exchange before offering the full focus — the Candle that waits for genuine invitation burns longer and illuminates more completely.",
    },
  },
  "戊": {
    concentrated: {
      portrait: "The Mountain at full concentration is what everything else orients around — the stability is so complete it becomes geography, and people build their lives according to where it stands without fully realising they're doing it. At this level the Mountain's challenge is not holding but allowing: the rigidity that guarantees reliability can also prevent the movement that keeps things alive.",
      dynamic:  "The stability becomes weight when it can't differentiate between what needs holding and what needs releasing — the Mountain that never shifts eventually becomes a wall rather than a foundation.",
      practice: "Allow one thing to move before you're certain it's safe to — the Mountain that learns to shift deliberately remains a reference point rather than becoming an obstacle.",
    },
    balanced: {
      portrait: "The Mountain in equilibrium holds what needs holding and has developed the capacity to release what doesn't — a rare and genuinely powerful state for an energy that defaults so naturally to permanence. At this level the reliability is real and the flexibility, while not natural, has been earned.",
      dynamic:  "The groundedness serves growth rather than preventing it — what the Mountain holds at this level it holds genuinely, and what it releases it releases without losing itself.",
      practice: "Stay in conversation with what you're holding — the Mountain in balance needs to keep asking whether the current structures are still serving what they were built for.",
    },
    open: {
      portrait: "The Mountain that needs nourishment is not diminished — it is simply more sensitive than it appears to the conditions that support it. The groundedness is real but it requires specific inputs to remain genuinely stable rather than just appearing stable.",
      dynamic:  "The reliability that this energy is known for is present but conditional — in genuinely supportive conditions the Mountain provides what everything else is built on; in depleting ones it gradually hollows.",
      practice: "Receive support without reframing it as weakness — the Mountain that allows itself to be nourished holds everything else more genuinely.",
    },
  },
  "己": {
    concentrated: {
      portrait: "The Field at full concentration grows things in everyone it encounters — the nourishment is so natural and consistent that it operates below the threshold of conscious choice. At this level the Field's primary risk is the depletion that comes from continuous harvest with insufficient replenishment: the fertility is real, but it is not infinite.",
      dynamic:  "The giving outpaces the receiving so significantly that the Field is often unaware of how much it has given until the soil begins to show the cost.",
      practice: "Track what returns to you — the Field that monitors its own fertility rather than assuming it is infinite creates the conditions for sustained rather than temporary abundance.",
    },
    balanced: {
      portrait: "The Field in equilibrium is what cultivation is supposed to look like — the nourishment flows outward and something real flows back, and what grows in this condition has a quality that the exhausted Field never produces. The care is present; so is the reciprocity that makes it sustainable.",
      dynamic:  "The fertility serves what genuinely deserves it — what grows in this Field grows well and lasts, because the conditions were right in both directions.",
      practice: "Name what you're growing and whether it's growing back toward you — the Field in balance does this consciously rather than discovering the accounting only at harvest.",
    },
    open: {
      portrait: "The Field that needs nourishment is at its most honest about what it actually requires — the sensitivity that makes it the most genuinely caring of the archetypes is fully present, but so is the awareness that the wrong conditions produce nothing, regardless of effort.",
      dynamic:  "The fertility is entirely real but entirely conditional — what the right inputs produce in this Field is extraordinary; what the wrong ones produce is depletion disguised as generosity.",
      practice: "Choose what deserves your soil — the Field that cultivates selectively produces more per season than the one that nourishes everything equally.",
    },
  },
  "庚": {
    concentrated: {
      portrait: "The Blade at full concentration is the sharpest it will ever be and the most in need of direction — the precision is absolute, the edge is undeniable, but without the forge that gives it purpose it will cut whatever it encounters simply because cutting is what it does. At this level the Blade is looking for something genuinely worth cutting toward.",
      dynamic:  "The precision operates continuously whether or not the context requires it — the clarity that is the Blade's greatest gift becomes intensity in environments that haven't asked for it.",
      practice: "Find the forge — seek pressure, friction, and heat deliberately, because the Blade at this concentration only becomes its full self when something worthy is shaping it.",
    },
    balanced: {
      portrait: "The Blade in equilibrium has found what it's for — the precision is directed, the edge is in service of something specific, and the quality of what it produces at this level has a distinctiveness that the unforged Blade never achieves. This is the Blade that has been through enough to know what it's cutting toward.",
      dynamic:  "The precision serves purpose rather than demonstrating itself — what this Blade produces is genuinely excellent because the edge is being used rather than simply maintained.",
      practice: "Protect the direction — the Blade in balance is at its most effective when it stays pointed at what it chose rather than being redirected by whatever demands attention.",
    },
    open: {
      portrait: "The Blade that needs nourishment is one that has been waiting for the right conditions to show its full edge — not diminished, but in abeyance. The precision is completely intact; what's required is the specific combination of support and challenge that allows it to operate at depth.",
      dynamic:  "The edge is real but it requires genuine conditions to cut cleanly — in the right environment this Blade produces work of extraordinary precision; in the wrong one, it stays sharp but unused.",
      practice: "Identify the forge rather than manufacturing the pressure yourself — the Blade that finds external conditions worthy of its edge stops spending energy on self-maintenance.",
    },
  },
  "辛": {
    concentrated: {
      portrait: "The Jewel at full concentration perceives quality and its absence with an accuracy that operates faster than analysis — the discernment is structural, not effortful, and at this level it applies to everything including the Jewel's own standards for itself. The precision that makes this archetype extraordinary in its work becomes the demand it places on everything it encounters.",
      dynamic:  "The gap between what this energy perceives as possible and what is actually available becomes a persistent source of friction — not because the standard is wrong but because the world rarely offers what this discernment can see.",
      practice: "Distinguish the essential standards from the comprehensive ones — the Jewel at this concentration is most powerful when it reserves the full precision for what genuinely deserves it.",
    },
    balanced: {
      portrait: "The Jewel in equilibrium has found the setting it deserves — the discernment is present and directed, the precision produces work of genuine distinction, and the gap between what's perceived and what's available has narrowed to something workable. At this level the Jewel stops measuring everything against the ideal and starts building toward it.",
      dynamic:  "The standard serves creation rather than evaluation — what this Jewel produces at this level is genuinely excellent rather than perpetually provisional.",
      practice: "Complete rather than refine — the Jewel in balance is at its most powerful when it finishes things to its own genuine standard rather than continuing to polish what is already done.",
    },
    open: {
      portrait: "The Jewel that needs nourishment is in its most sensitive and in some ways most honest form — the discernment is entirely intact but the context determines whether it produces excellence or simply consumes itself in the perception of what isn't right. In genuinely worthy conditions this Jewel produces its finest work.",
      dynamic:  "The quality this energy produces is directly proportional to the quality of what it's been given to work with — elevate the conditions and what emerges is something few other archetypes can produce.",
      practice: "Protect your discernment by protecting what it's applied to — the Jewel that works in settings worthy of its precision produces more than the one that applies its standard universally.",
    },
  },
  "壬": {
    concentrated: {
      portrait: "The Ocean at full concentration contains more than any single context has the capacity to hold — the depth is real, the range is vast, and the challenge is that most of the encounters and environments this energy moves through are simply not built to receive what it's carrying. The Ocean at this level is perpetually translating.",
      dynamic:  "The vastness becomes isolation when it can't find the channels through which it can actually reach people — the depth is present but the shore that gives it shape keeps receding.",
      practice: "Find the shore deliberately — identify the specific forms through which your depth can reach people and invest in those rather than waiting for contexts large enough to hold you.",
    },
    balanced: {
      portrait: "The Ocean in equilibrium has found its shores — the depth has channels through which it reaches people, the vastness has forms that make it useful rather than simply impressive. What this Ocean produces at this level has the quality that only genuine depth can generate: it reaches further than the surface of any exchange.",
      dynamic:  "The depth serves connection rather than demonstrating itself — this Ocean meets people at the level they can reach and draws them deeper rather than waiting at the depth they haven't found yet.",
      practice: "Stay in the channel you've found — the Ocean in balance is most powerful when it deepens what's already working rather than expanding into new vastness.",
    },
    open: {
      portrait: "The Ocean that needs nourishment is the most attuned to the quality of what it receives — the depth is entirely present but the conditions determine whether it circulates or stagnates. The right inputs produce currents that reach further than anyone watching from the shore can see.",
      dynamic:  "The depth requires genuine exchange to stay alive — without it the vastness becomes stillness, and while stillness is not nothing, it is not what this energy was built for.",
      practice: "Feed the current — identify what genuinely nourishes you and let it in without reframing receiving as a form of weakness.",
    },
  },
  "癸": {
    concentrated: {
      portrait: "The Rain at full concentration nourishes everything it touches — the sensitivity is so thoroughgoing that it operates as a permanent state of attunement, and at this level the primary cost is the difficulty of knowing whose feeling is whose, which sky the rain is falling from. The generosity is structural; the container needs to be built.",
      dynamic:  "The permeability that makes this energy extraordinarily sensitive to what's true also makes it genuinely difficult to maintain the distinction between perception and absorption — the Rain takes in more than it intends to.",
      practice: "Build the container before going into difficult conditions — the Rain at this concentration needs deliberate boundaries not to restrict the sensitivity but to ensure it remains a navigational instrument rather than a burden.",
    },
    balanced: {
      portrait: "The Rain in equilibrium has found the ground it's for — the sensitivity is present and directed, the nourishment reaches what genuinely needs it, and the quality of what grows in this Rain's proximity has a specificity that only genuine attunement produces. At this level the Rain knows what it's feeding and what's feeding it.",
      dynamic:  "The sensitivity serves rather than overwhelms — the perception arrives as information rather than as weather, and what this Rain nourishes grows in ways that reflect genuine care rather than reflexive giving.",
      practice: "Stay attuned to reciprocity — the Rain in balance has found the ground that deserves it, and the work is ensuring that relationship remains genuinely mutual.",
    },
    open: {
      portrait: "The Rain that needs nourishment is at its most explicit about what it actually requires — the sensitivity is fully present but it is not self-sustaining, and the quality of what this Rain can offer is directly proportional to the quality of what it's received. In conditions of genuine support, what this Rain nourishes is extraordinary.",
      dynamic:  "The nourishment this energy provides is among the most specific and most valuable in any chart — but it requires actual nourishment in return, not just the absence of depletion.",
      practice: "Choose your ground as deliberately as you nourish it — the Rain that falls in the right place doesn't just feed what grows there, it feeds itself in return.",
    },
  },
};

// Maps strength key to energy band for ENERGY_CONDITION_READINGS lookup
function getEnergyBand(strength) {
  if (strength === "extremely_strong" || strength === "strong") return "concentrated";
  if (strength === "moderate") return "balanced";
  return "open";
}

// Per-stem dominant/missing insight lines
function getElementInsights(chart) {
  const dm = chart.dayMaster;
  const els = chart.elements;
  const missing = chart.missingElements;

  // Dominant: always show the highest-count element
  const counts = Object.entries(els).map(([el,v])=>({el,count:v.count})).sort((a,b)=>b.count-a.count);
  const topEl = counts[0];
  const dominant = topEl.el;

  const DOMINANT_LINES = {
    Metal:`Metal dominates — precision without flexibility. The edge is real, but without heat it cannot find its purpose.`,
    Wood: `Wood overwhelms — almost all energy nourishes growth in others, leaving little for yourself.`,
    Fire: `Fire saturates — warmth without restraint. The light is genuine but risks consuming its own source.`,
    Earth:`Earth dominates — deep stability, but movement and change become genuinely difficult.`,
    Water:`Water floods — depth without direction. The capacity is vast; the challenge is finding the channel.`,
  };

  const DOMINANT_GUIDANCE = {
    Metal:`Seek environments that introduce friction and heat deliberately. Pressure is not the enemy — it is what gives your edge its purpose.`,
    Wood: `What you grow in others is real. The question is whether any of those roots belong to you. Choose one thing you are growing entirely for yourself.`,
    Fire: `Choose where you direct the warmth rather than shining at everything. Selectivity is not dimming — it is precision.`,
    Earth:`Allow movement before certainty fully arrives. The Mountain's strength is not less for being moved — it is more for having shifted deliberately.`,
    Water:`Find the shores. The depth becomes power not by staying vast but by finding the forms through which it can actually reach people.`,
  };

  const MISSING_LINES = {
    Fire: `Fire is absent — no external force has shaped this chart's direction. Freedom and isolation in equal measure.`,
    Earth:`Earth is absent — no structural ground beneath the movement. The architecture is entirely self-generated.`,
    Water:`Water is absent — no reflective depth to temper or nourish. What is built may be strong; what is sustained is still developing.`,
    Wood: `Wood is absent — no natural outward reach or creative momentum. Expression must be cultivated rather than assumed.`,
    Metal:`Metal is absent — no natural precision or definition. Structure must be chosen rather than inherited.`,
  };

  const MISSING_GUIDANCE = {
    Fire: `Build the conditions that make your work impossible to ignore. The forge comes to those who make themselves worth forging.`,
    Earth:`Build one container strong enough to hold what you carry. Internal structure is the practice — not a destination.`,
    Water:`Cultivate stillness as a practice, not an absence. What you build without depth can stand; what stands with depth endures.`,
    Wood: `Invest in the one direction that is genuinely yours. One root growing deep is worth more than many reaching shallow.`,
    Metal:`Define what is non-negotiable in how you work and live. Precision is a practice — and it begins with what you will not compromise.`,
  };

  const results = { dominant: null, missing: [] };

  if (DOMINANT_LINES[dominant]) {
    results.dominant = { el: dominant, count: topEl.count, line: DOMINANT_LINES[dominant], guidance: DOMINANT_GUIDANCE[dominant] };
  }

  missing.forEach(el => {
    if (MISSING_LINES[el]) {
      results.missing.push({ el, line: MISSING_LINES[el], guidance: MISSING_GUIDANCE[el] });
    }
  });

  return results;
}

// Energy rating scale — replaces Strong/Weak framing
// Energy Condition scale — neutral descriptions, not verdicts
// polarity: what kind of energy state this is (neither good nor bad)
// frame: one sentence telling the user what this state means before any action
const STRENGTH_META = {
  extremely_strong: {
    label:"Overpowering", zh:"极旺", polarity:"Concentrated",
    frame:"Your core element saturates the chart — there is very little counterbalance to what you already are.",
    approach:"Channel & Release",
    approachLine:"This energy needs outlets: expression, challenge, and friction. Without them it turns inward and becomes rigidity.",
  },
  strong: {
    label:"Dominant", zh:"旺", polarity:"Concentrated",
    frame:"Your core element leads the chart with clear authority — self-directed and largely independent of external conditions.",
    approach:"Channel & Release",
    approachLine:"This energy thrives when it has meaningful work to push against. Give it direction or it finds its own, usually at inconvenient moments.",
  },
  moderate: {
    label:"Balanced", zh:"中和", polarity:"Equilibrated",
    frame:"Your core element sits in genuine equilibrium — neither overwhelming nor overwhelmed by the forces around it.",
    approach:"Maintain & Attune",
    approachLine:"This energy is naturally stable. The practice is staying attuned to what genuinely disrupts the balance, rather than forcing movement.",
  },
  weak: {
    label:"Receptive", zh:"弱", polarity:"Open",
    frame:"Your core element depends on the right conditions to come through fully — it is not limited, it is context-sensitive.",
    approach:"Nourish & Amplify",
    approachLine:"This energy deepens when genuinely supported. The environment matters more than effort — seek what truly nourishes rather than what simply doesn't drain.",
  },
  extremely_weak: {
    label:"Yielding", zh:"极弱", polarity:"Open",
    frame:"Your core element operates almost entirely through alignment — when the conditions are right, the results are disproportionate to the apparent effort.",
    approach:"Nourish & Amplify",
    approachLine:"Alignment matters more than force here. The right conditions produce what years of effort in the wrong ones never will.",
  },
};

function ElementSpectrum({ chart }) {
  const dm = chart.dayMaster;
  const dmColor = EL_C[dm.element];
  const insights = getElementInsights(chart);
  const energies = ELEMENT_ENERGIES[dm.stem] || ELEMENT_ENERGIES["庚"];
  const sm = STRENGTH_META[dm.strength] || STRENGTH_META.moderate;
  const band = getEnergyBand(dm.strength);
  const ecr = (ENERGY_CONDITION_READINGS[dm.stem] || ENERGY_CONDITION_READINGS["庚"])[band];

  // Feedback #2: sort bars by count descending, absent elements at bottom
  const sortedEls = Object.entries(chart.elements)
    .map(([el, d]) => ({ el, count: d?.count || 0, present: d?.present || false }))
    .sort((a, b) => {
      if (!a.present && b.present) return 1;
      if (a.present && !b.present) return -1;
      return b.count - a.count;
    })
    .map(({ el }) => el);

  return (
    <div style={{borderRadius:14,border:`1.5px solid ${dmColor}38`,overflow:"hidden",background:`linear-gradient(135deg,${dmColor}06 0%,transparent 60%)`}} className="fade">
      <div style={{padding:"20px 18px 18px"}}>

        {/* Title */}
        <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,fontWeight:600,color:C.text,marginBottom:16,lineHeight:1.1}}>Your Energy Profile</div>

        {/* Energy Condition block — stem-specific reading */}
        <div style={{padding:"13px 14px",background:`${dmColor}0d`,borderRadius:10,border:`0.5px solid ${dmColor}28`,marginBottom:18}}>
          {/* Label row */}
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:8}}>
            <div>
              <div style={{fontSize:8,letterSpacing:1.5,textTransform:"uppercase",color:C.textTer,marginBottom:3,fontFamily:"'EB Garamond',Georgia,serif"}}>Energy Condition</div>
              <div style={{display:"flex",alignItems:"baseline",gap:8}}>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:20,fontWeight:600,color:dmColor,lineHeight:1}}>{sm.label}</div>
                <div style={{fontSize:9,color:`${dmColor}90`,letterSpacing:1,textTransform:"uppercase",fontFamily:"'EB Garamond',Georgia,serif",borderLeft:`1px solid ${dmColor}30`,paddingLeft:8}}>{sm.polarity}</div>
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:8,letterSpacing:1.5,textTransform:"uppercase",color:C.textTer,marginBottom:3,fontFamily:"'EB Garamond',Georgia,serif"}}>Balance approach</div>
              <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:15,fontWeight:600,color:dmColor,lineHeight:1}}>{sm.approach}</div>
            </div>
          </div>
          <div style={{height:"0.5px",background:`${dmColor}18`,marginBottom:8}}/>
          {/* Stem-specific portrait — replaces generic frame line */}
          <div style={{fontSize:12.5,lineHeight:1.7,color:C.textSec,fontStyle:"italic",marginBottom:6,fontFamily:"'EB Garamond',Georgia,serif"}}>{ecr.portrait}</div>
          {/* Dynamic — what it creates */}
          <div style={{fontSize:12,lineHeight:1.65,color:C.textSec,marginBottom:6,fontFamily:"'EB Garamond',Georgia,serif",borderLeft:`2px solid ${dmColor}30`,paddingLeft:8}}>{ecr.dynamic}</div>
          {/* Practice */}
          <div style={{fontSize:11.5,lineHeight:1.6,color:C.textTer,fontFamily:"'EB Garamond',Georgia,serif"}}><span style={{color:dmColor,fontWeight:500}}>Practice — </span>{ecr.practice}</div>
        </div>

        {/* Legend */}
        <div style={{display:"flex",justifyContent:"flex-end",gap:12,marginBottom:8}}>
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <span style={{fontSize:10,color:dmColor}}>✦</span>
            <span style={{fontSize:9,color:C.textTer,fontStyle:"italic",fontFamily:"'EB Garamond',Georgia,serif"}}>Your core element</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <div style={{width:14,height:8,borderRadius:2,border:`1px dashed ${C.fire}55`}}/>
            <span style={{fontSize:9,color:C.fire,fontStyle:"italic",fontFamily:"'EB Garamond',Georgia,serif"}}>absent</span>
          </div>
        </div>

        <div style={{marginBottom:16}}>
          {sortedEls.map(el => {
            const d = chart.elements[el];
            const count = d?.count || 0;
            const isMissing = !d?.present;
            const isDM = el === dm.element;
            const color = EL_C[el];
            return (
              <div key={el} style={{display:"flex",alignItems:"center",gap:10,marginBottom:11}}>
                <div style={{width:80,display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
                  <div style={{width:26,height:26,borderRadius:7,background:`${color}12`,border:`0.5px solid ${color}28`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <ElementIcon el={el} color={color} size={15}/>
                  </div>
                  <div>
                                <div style={{fontSize:11.5,color:isMissing?`${color}88`:color,fontWeight:500,lineHeight:1,fontFamily:"'EB Garamond',Georgia,serif"}}>
                      {el}{isDM && <span style={{fontSize:10,color:dmColor,marginLeft:3}}>✦</span>}
                    </div>
                    {isMissing && <div style={{fontSize:9,color:C.fire,fontStyle:"italic",lineHeight:1.3,fontFamily:"'EB Garamond',Georgia,serif"}}>absent</div>}
                  </div>
                </div>
                <div style={{flex:1,display:"flex",gap:3}}>
                  {[...Array(8)].map((_,i) => (
                    <div key={i} style={{flex:1,height:8,borderRadius:3,
                      background: isMissing ? "transparent" : i < count ? color : "#ddd9d0",
                      opacity: isMissing ? 1 : i < count ? (isDM ? 0.82 : 0.58) : 1,
                      border: isMissing ? `1px dashed ${color}` : "none",
                      ...(isMissing ? {opacity:0.32} : {}),
                    }}/>
                  ))}
                </div>
                <div style={{width:18,textAlign:"right",fontSize:11,color:isMissing?C.fire:C.textTer,flexShrink:0,fontFamily:"'EB Garamond',Georgia,serif"}}>
                  {isMissing ? "—" : count}
                </div>
              </div>
            );
          })}
        </div>

        {insights.dominant && (
          <div style={{display:"flex",gap:8,padding:"10px 12px",background:`${EL_C[insights.dominant.el]}07`,borderRadius:10,border:`0.5px solid ${EL_C[insights.dominant.el]}22`,marginBottom:8}}>
            <div style={{width:3,borderRadius:2,background:EL_C[insights.dominant.el],flexShrink:0,minHeight:30}}/>
            <div>
              <div style={{fontSize:8,letterSpacing:1.5,textTransform:"uppercase",color:EL_C[insights.dominant.el],marginBottom:3,fontFamily:"'EB Garamond',Georgia,serif"}}>Dominant force</div>
              <div style={{fontSize:12.5,lineHeight:1.65,color:C.textSec,fontStyle:"italic",marginBottom:4,fontFamily:"'EB Garamond',Georgia,serif"}}>{insights.dominant.line}</div>
              <div style={{fontSize:11.5,lineHeight:1.55,color:C.textTer,fontFamily:"'EB Garamond',Georgia,serif"}}>{insights.dominant.guidance}</div>
            </div>
          </div>
        )}

        {/* Missing insights */}
        {insights.missing.map((m,i) => (
          <div key={i} style={{display:"flex",gap:8,padding:"10px 12px",background:`${C.fire}07`,borderRadius:10,border:`0.5px solid ${C.fire}22`,marginBottom:8}}>
            <div style={{width:3,borderRadius:2,background:C.fire,flexShrink:0,minHeight:30}}/>
            <div>
              <div style={{fontSize:8,letterSpacing:1.5,textTransform:"uppercase",color:C.fire,marginBottom:3,fontFamily:"'EB Garamond',Georgia,serif"}}>Missing {m.el.toLowerCase()}</div>
              <div style={{fontSize:12.5,lineHeight:1.65,color:C.textSec,fontStyle:"italic",marginBottom:4,fontFamily:"'EB Garamond',Georgia,serif"}}>{m.line}</div>
              <div style={{fontSize:11.5,lineHeight:1.55,color:C.textTer,fontFamily:"'EB Garamond',Georgia,serif"}}>{m.guidance}</div>
            </div>
          </div>
        ))}

        <div style={{height:"0.5px",background:C.border,margin:"14px 0"}}/>

        {/* Lifts / Depletes */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          {[
            { items: energies.lifts,    label:"What lifts you",    accent:"#6a9860" },
            { items: energies.depletes, label:"What depletes you", accent:C.fire },
          ].map(({items,label,accent}) => (
            <div key={label}>
              <div style={{fontSize:8,letterSpacing:1.5,textTransform:"uppercase",color:accent,marginBottom:9,fontFamily:"'EB Garamond',Georgia,serif"}}>{label}</div>
              {items.map(({el,line},i) => (
                <div key={i} style={{display:"flex",gap:7,alignItems:"flex-start",marginBottom:9}}>
                  <div style={{width:24,height:24,borderRadius:"50%",background:`${EL_C[el]}10`,border:`0.5px solid ${EL_C[el]}30`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                    <ElementIcon el={el} color={EL_C[el]} size={13}/>
                  </div>
                  <div style={{fontSize:11.5,lineHeight:1.55,color:C.textSec,fontFamily:"'EB Garamond',Georgia,serif"}}>
                    <span style={{color:EL_C[el],fontWeight:500}}>{el}</span>
                    <span style={{color:C.textTer}}> — {line}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// Paywall overlay — shown when free user tries to expand more than 1 section
function PaywallModal({ onClose, onUpgrade }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(29,27,24,0.6)",display:"flex",alignItems:"flex-end",zIndex:100}} onClick={onClose}>
      <div style={{background:C.bg,borderRadius:"20px 20px 0 0",padding:"28px 24px 40px",width:"100%",maxWidth:430,margin:"0 auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{width:36,height:3,borderRadius:2,background:C.border,margin:"0 auto 20px"}}/>
        <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,fontWeight:400,color:C.text,marginBottom:6}}>Unlock Unlimited Depth</div>
        <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:15,lineHeight:1.8,color:C.textSec,marginBottom:20}}>You've opened 1 section today. The full reading — all 12 sections, any time, unlimited depth — is waiting.</p>
        <div style={{background:C.bgCard,borderRadius:10,padding:"14px 16px",marginBottom:20}}>
          {["Unlimited section expansions","Full current life chapter","Weekly flow readings","5 AI questions/month"].map((f,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:i<3?10:0}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:C.accentLight,flexShrink:0}}/>
              <span style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:14,color:C.textSec}}>{f}</span>
            </div>
          ))}
        </div>
        <button onClick={onUpgrade} style={{width:"100%",padding:"14px",borderRadius:10,border:"none",background:C.accentDark,color:"#f7f3ec",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:17,letterSpacing:0.5,cursor:"pointer",marginBottom:10}}>
          Unlock Seeker — $3.99/month
        </button>
        <div style={{textAlign:"center",fontFamily:"'EB Garamond',Georgia,serif",fontSize:12,color:C.textTer,fontStyle:"italic"}}>7-day free trial · Cancel anytime</div>
      </div>
    </div>
  );
}

function ReadingSection({ id, meta, data, chart, userTier, expansionCount, onExpansionUsed, onPaywall }) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [expanding, setExpanding] = useState(false);

  async function handleExpand() {
    if (open && body) { setOpen(false); return; }
    // Free tier gate
    if (userTier === TIERS.FREE && expansionCount >= FREE_EXPANSIONS_PER_DAY) {
      onPaywall(); return;
    }
    setOpen(true);
    if (!body) {
      setExpanding(true);
      if (userTier === TIERS.FREE) onExpansionUsed();
      try {
        const result = await expandSection(id, chart, data?.teaser||"");
        setBody(result);
      } catch { setBody("Unable to load this section. Please try again."); }
      setExpanding(false);
    }
  }

  const paras = body.split("\n\n").filter(Boolean);
  return (
    <div style={{marginBottom:26,paddingBottom:26,borderBottom:`0.5px solid ${C.borderLight}`}}>
      <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:11}}>
        <div style={{flexShrink:0,paddingTop:3}}>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:10,color:C.accentLight,letterSpacing:2}}>{meta.num}</div>
        </div>
        <div style={{flex:1}}>
          <div style={{display:"inline-block",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:C.accent,background:`${C.accent}12`,border:`0.5px solid ${C.accent}30`,borderRadius:20,padding:"2px 8px",marginBottom:7}}>{meta.tag}</div>
          <h2 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:21,fontWeight:400,color:C.text,lineHeight:1.2,marginBottom:3}}>{meta.title}</h2>
        </div>
        <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:24,color:`${C.accentLight}40`,lineHeight:1,flexShrink:0,paddingTop:6}}>{meta.zh}</div>
      </div>

      <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:15.5,lineHeight:1.85,color:C.textSec,fontStyle:"italic",marginBottom:open?12:0}}>
        {data?.teaser || <span style={{color:C.border,fontSize:13}}>Generating…</span>}
      </p>

      {open && (
        <div style={{borderLeft:`2px solid ${C.border}`,paddingLeft:14,marginBottom:4}} className="fade">
          {expanding ? (
            <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0"}}>
              <div className="pulse" style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:13,color:C.accentLight}}>元</div>
              <span style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:13,color:C.border,fontStyle:"italic"}}>Deepening this section…</span>
            </div>
          ) : (
            paras.map((p,i)=>(
              <p key={i} style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:15.5,lineHeight:1.85,color:C.textSec,marginBottom:i<paras.length-1?"1em":0}} dangerouslySetInnerHTML={{__html:p}}/>
            ))
          )}
        </div>
      )}

      {data?.teaser && (
        <button onClick={handleExpand} style={{marginTop:9,background:"transparent",border:"none",cursor:"pointer",padding:0,display:"flex",alignItems:"center",gap:6,fontFamily:"'EB Garamond',Georgia,serif",fontSize:12,color:C.accent,fontStyle:"italic"}}>
          <div style={{width:14,height:"0.5px",background:C.accentLight}}/>
          {open?(expanding?"Loading…":"Close"):"Continue reading"}
          <div style={{width:14,height:"0.5px",background:C.accentLight}}/>
        </button>
      )}
    </div>
  );
}

function FlowPeriod({ label, zh, text }) {
  return (
    <div style={{marginBottom:22,paddingBottom:22,borderBottom:`0.5px solid ${C.borderLight}`}}>
      <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:9}}>
        <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:21,color:C.accentDark,lineHeight:1}}>{zh}</div>
        <div style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:12,color:C.textTer,fontStyle:"italic"}}>{label}</div>
      </div>
      <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:15.5,lineHeight:1.85,color:C.textSec}}>
        {text||<span style={{color:C.border}}>Generating…</span>}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════

const DEFAULT_INPUT = { year:1995, month:4, day:29, hour:18, gender:"male", location:"Beijing" };

export default function App() {
  const [input, setInput]       = useState(DEFAULT_INPUT);
  const [chart, setChart]       = useState(null);
  const [reading, setReading]   = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [tab, setTab]           = useState("reading");
  const [showForm, setShowForm] = useState(true);
  const [userTier, setUserTier] = useState(TIERS.FREE);
  const [expansionCount, setExpansionCount] = useState(0);
  const [showPaywall, setShowPaywall]       = useState(false);
  const readingRef = useRef(null);

  async function handleGenerate() {
    if (!input.year||!input.month||!input.day||input.hour===undefined||!input.gender) {
      setError("Please fill in all fields."); return;
    }
    setLoading(true); setError(null); setShowForm(false);
    setReading(null); setChart(null); setExpansionCount(0);
    try {
      const computed = calculateBaziChart(input);
      setChart(computed);
      const generated = await generateReading(computed, userTier, (full) => {
        readingRef.current = full;
        setReading({...full});
      });
      readingRef.current = generated;
      setReading(generated);
    } catch(e) { setError(e.message); }
    setLoading(false);
  }

  async function handleRetry() {
    if (!chart) { setShowForm(true); return; }
    setLoading(true); setError(null);
    try {
      const generated = await generateReading(chart, userTier, (full)=>setReading({...full}));
      setReading(generated);
    } catch(e) { setError(e.message); }
    setLoading(false);
  }

  // Re-generate when tier changes (if chart exists)
  async function handleTierChange(newTier) {
    setUserTier(newTier);
    if (!chart) return;
    setLoading(true); setError(null); setExpansionCount(0);
    try {
      const generated = await generateReading(chart, newTier, (full)=>setReading({...full}));
      setReading(generated);
    } catch(e) { setError(e.message); }
    setLoading(false);
  }

  const curLP = chart?.luckPillars?.find(p=>p.isCurrent);
  const tierColor = { 0:C.tierFree, 1:C.tierSeeker, 2:C.tierAdvisor, 3:C.tierOracle }[userTier];

  return (
    <div style={{background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",position:"relative"}}>
      <style>{STYLE}</style>
      {showPaywall && <PaywallModal onClose={()=>setShowPaywall(false)} onUpgrade={()=>{setShowPaywall(false);handleTierChange(TIERS.SEEKER);}}/>}

      {/* Header */}
      <div style={{padding:"16px 20px 12px",borderBottom:`0.5px solid ${C.border}`,position:"sticky",top:0,background:C.bg,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:10,letterSpacing:3,color:C.textTer,textTransform:"uppercase",marginBottom:2}}>Elementum · 元素</div>
            <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:13,color:C.accentDark,letterSpacing:1}}>
              {chart ? Object.values(chart.pillars).map(p=>p.stem+p.branch).join(" ") : "八字命盘"}
            </div>
          </div>
          {chart && (
            <button onClick={()=>{setShowForm(true);setChart(null);setReading(null);setTab("reading");}} style={{fontSize:10,color:C.textTer,fontFamily:"'EB Garamond',Georgia,serif",fontStyle:"italic",background:"transparent",border:`0.5px solid ${C.border}`,borderRadius:20,padding:"4px 10px",cursor:"pointer"}}>
              New Chart
            </button>
          )}
        </div>

        {/* Tier selector — always visible for testing */}
        <div style={{display:"flex",gap:4,marginTop:10}}>
          {Object.entries(TIERS).map(([label,val])=>(
            <button key={val} onClick={()=>handleTierChange(val)} style={{flex:1,padding:"5px 4px",borderRadius:6,border:userTier===val?`1.5px solid ${tierColor}`:`0.5px solid ${C.border}`,background:userTier===val?`${tierColor}15`:"transparent",cursor:"pointer",fontFamily:"'EB Garamond',Georgia,serif",fontSize:11,color:userTier===val?tierColor:C.textTer,transition:"all 0.15s"}}>
              {label}<div style={{fontSize:9,opacity:0.7}}>{TIER_PRICES[val]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{padding:"24px 20px 40px"}} className="fade">
          <div style={{textAlign:"center",marginBottom:26}}>
            <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:42,color:C.accentDark,lineHeight:1,marginBottom:7,opacity:0.8}}>元素</div>
            <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:17,color:C.text,marginBottom:6}}>Enter your birth details</div>
            <div style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:12,fontStyle:"italic",color:C.textTer}}>Currently testing as: <strong style={{color:tierColor}}>{TIER_LABELS[userTier]} tier</strong></div>
          </div>
          {[
            {key:"year",  label:"Birth Year",     type:"number", placeholder:"e.g. 1995", min:1900,max:2025},
            {key:"month", label:"Birth Month",    type:"number", placeholder:"1–12",      min:1,   max:12  },
            {key:"day",   label:"Birth Day",      type:"number", placeholder:"1–31",      min:1,   max:31  },
            {key:"hour",  label:"Birth Hour (24h)",type:"number",placeholder:"0–23",      min:0,   max:23  },
          ].map(f=>(
            <div key={f.key} style={{marginBottom:14}}>
              <div style={{fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:C.accent,marginBottom:5}}>{f.label}</div>
              <input type={f.type} value={input[f.key]} min={f.min} max={f.max} placeholder={f.placeholder}
                onChange={e=>setInput(p=>({...p,[f.key]:parseInt(e.target.value)||0}))}
                style={{width:"100%",padding:"11px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:C.bgCard,fontFamily:"'EB Garamond',Georgia,serif",fontSize:16,color:C.text,outline:"none"}}/>
            </div>
          ))}
          <div style={{marginBottom:14}}>
            <div style={{fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:C.accent,marginBottom:5}}>Gender</div>
            <div style={{display:"flex",gap:8}}>
              {["male","female"].map(g=>(
                <button key={g} onClick={()=>setInput(p=>({...p,gender:g}))} style={{flex:1,padding:"11px",borderRadius:8,border:input.gender===g?`1.5px solid ${C.accentLight}`:`1px solid ${C.border}`,background:input.gender===g?"#f5edd8":C.bgCard,fontFamily:"'EB Garamond',Georgia,serif",fontSize:15,color:input.gender===g?C.accentDark:C.textSec,cursor:"pointer",textTransform:"capitalize"}}>{g}</button>
              ))}
            </div>
          </div>
          <div style={{marginBottom:24}}>
            <div style={{fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:C.accent,marginBottom:5}}>Birth Location</div>
            <input value={input.location} onChange={e=>setInput(p=>({...p,location:e.target.value}))} placeholder="e.g. Beijing, New York, London"
              style={{width:"100%",padding:"11px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:C.bgCard,fontFamily:"'EB Garamond',Georgia,serif",fontSize:16,color:C.text,outline:"none"}}/>
          </div>
          {error && <div style={{color:C.fire,fontSize:13,marginBottom:14,fontFamily:"'EB Garamond',Georgia,serif"}}>{error}</div>}
          <button onClick={handleGenerate} style={{width:"100%",padding:"14px",borderRadius:10,border:"none",background:C.accentDark,color:"#f7f3ec",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:17,letterSpacing:0.5,cursor:"pointer"}}>
            Generate Reading
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{padding:"60px 20px",textAlign:"center"}} className="fade">
          <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:38,color:C.accentDark,marginBottom:14,lineHeight:1}}>
            {chart ? chart.pillars.day.stem : "元"}
          </div>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:17,color:C.text,marginBottom:6}}>
            {chart ? (userTier===TIERS.FREE ? "Looking up your reading…" : "Generating your reading…") : "Computing your chart…"}
          </div>
          <div style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:12,fontStyle:"italic",color:C.textTer,marginBottom:22}}>
            {userTier===TIERS.FREE ? "Template lookup — instant" : "Live LLM generation — ~4–6s"}
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:8}}>
            {["金","木","水","火","土"].map((zh,i)=>(
              <div key={zh} className="pulse" style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:14,color:["#6080a0","#6a9860","#4870a0","#b04030","#a08850"][i],animationDelay:`${i*0.25}s`}}>{zh}</div>
            ))}
          </div>
        </div>
      )}

      {/* Reading UI */}
      {!loading && chart && reading && !showForm && (
        <>
          {/* Template debug badge — shows which template was matched */}
          {reading._templateKey && (
            <div style={{padding:"7px 16px",background:reading._exactMatch?"#edf7ed":"#fef9ec",borderBottom:`0.5px solid ${reading._exactMatch?"#9cc59c":"#e8d5a0"}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:11,color:reading._exactMatch?"#2d6e2d":"#7a5a10",fontStyle:"italic"}}>
                {reading._exactMatch ? "✓ Exact template match" : "⟳ Fallback template used"}
              </span>
              <span style={{fontFamily:"monospace",fontSize:9,color:reading._exactMatch?"#4a9e4a":"#a08030",background:"rgba(0,0,0,0.05)",padding:"2px 6px",borderRadius:4}}>
                {reading._templateKey}
              </span>
            </div>
          )}

          {/* Error / retry bar */}
          {error && (
            <div style={{padding:"9px 20px",background:"#fdf8f2",borderBottom:`0.5px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:12,color:C.accent,fontStyle:"italic"}}>{error}</span>
              <button onClick={handleRetry} style={{fontSize:11,color:C.accentDark,background:"transparent",border:`0.5px solid ${C.accentLight}`,borderRadius:12,padding:"3px 10px",cursor:"pointer",fontFamily:"'EB Garamond',Georgia,serif"}}>Retry</button>
            </div>
          )}

          {/* Tab nav */}
          <div style={{display:"flex",borderBottom:`0.5px solid ${C.border}`}}>
            {[{id:"reading",label:"Reading",zh:"命"},{id:"decades",label:"Chapter",zh:"运"},{id:"today",label:"Today",zh:"今"}].map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"12px 6px",background:"transparent",border:"none",cursor:"pointer",borderBottom:tab===t.id?`1.5px solid ${C.accentDark}`:"1.5px solid transparent",transition:"all 0.2s"}}>
                <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:15,color:tab===t.id?C.accentDark:C.textTer,lineHeight:1,marginBottom:2}}>{t.zh}</div>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:tab===t.id?C.accentDark:C.textTer}}>{t.label}</div>
              </button>
            ))}
          </div>

          {/* Reading tab */}
          {tab==="reading" && (
            <div style={{padding:"0 20px 80px"}} className="fade">

              {/* ① Day Master Hero — identical across all tiers */}
              <div style={{paddingTop:18}}>
                <DayMasterHero chart={chart}/>
              </div>

              {/* ② Element Spectrum — Section 2 */}
              <div style={{marginBottom:20}}>
                <ElementSpectrum chart={chart}/>
              </div>

              <div style={{height:"0.5px",background:C.border,margin:"4px 0 20px"}}/>

              {/* Free tier expansion counter */}
              {userTier === TIERS.FREE && (
                <div style={{marginBottom:18,padding:"10px 14px",borderRadius:8,background:C.bgCard,border:`0.5px solid ${C.border}`,textAlign:"center"}}>
                  <span style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:12,color:C.textTer}}>
                    Free tier · {Math.max(0,FREE_EXPANSIONS_PER_DAY-expansionCount)} section expansion{FREE_EXPANSIONS_PER_DAY-expansionCount===1?"":"s"} remaining today
                  </span>
                </div>
              )}

              {/* ③ The 12 reading sections — skip 'nature' as it lives in the profile card */}
              {(() => {
                const sectionMeta = getSectionMeta(chart.dayMaster.stem);
                return Object.keys(SECTION_BASE)
                  .filter(id => id !== "nature")
                  .map((id) => (
                    <ReadingSection
                      key={id} id={id}
                      meta={sectionMeta[id]}
                      data={reading?.sections?.[id]}
                      chart={chart}
                      userTier={userTier}
                      expansionCount={expansionCount}
                      onExpansionUsed={()=>setExpansionCount(c=>c+1)}
                      onPaywall={()=>setShowPaywall(true)}
                    />
                  ));
              })()}
            </div>
          )}

          {/* Chapter tab */}
          {tab==="decades" && (
            <div style={{padding:"20px 20px 80px"}} className="fade">
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontSize:8,letterSpacing:2,color:C.textTer,textTransform:"uppercase",marginBottom:10}}>Your Life Chapter · 大运</div>
                <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:13,fontStyle:"italic",lineHeight:1.8,color:C.textTer}}>Every decade has its own climate. This is the one you are living in now.</p>
              </div>
              {curLP && (()=>{
                const curData = reading.decades?.[0];
                const paras = (curData?.reading||"").split("\n\n").filter(Boolean);
                return (
                  <div>
                    <div style={{padding:"16px",borderRadius:12,border:`1.5px solid ${C.accentLight}`,background:"#f5edd8",marginBottom:18}}>
                      <div style={{fontSize:8,letterSpacing:2,color:C.accentDark,textTransform:"uppercase",marginBottom:8}}>Current Chapter</div>
                      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:6}}>
                        <div>
                          <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:30,color:C.accentDark,lineHeight:1,marginBottom:3}}>{curLP.stem}{curLP.branch}</div>
                          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:16,color:C.text}}>{curData?.theme||"—"}</div>
                        </div>
                        <div style={{textAlign:"right",flexShrink:0,paddingTop:3}}>
                          <div style={{fontSize:11,color:C.textTer,fontFamily:"'EB Garamond',Georgia,serif",fontStyle:"italic"}}>{curLP.startAge}–{curLP.endAge}</div>
                          <div style={{fontSize:11,color:C.textTer,fontFamily:"'EB Garamond',Georgia,serif",fontStyle:"italic",marginBottom:6}}>{curLP.startYear}–{curLP.endYear}</div>
                          <div style={{fontSize:8,letterSpacing:1.5,textTransform:"uppercase",color:"#fff",background:C.accentDark,borderRadius:20,padding:"2px 8px",display:"inline-block"}}>Now</div>
                        </div>
                      </div>
                    </div>
                    {curData?.teaser && (
                      <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:15.5,lineHeight:1.85,color:C.textSec,fontStyle:"italic",marginBottom:paras.length>0?14:0}}>
                        {curData.teaser}
                      </p>
                    )}
                    {paras.length > 0 && (
                      <div style={{borderLeft:`2px solid ${C.accentLight}`,paddingLeft:14,marginBottom:18}}>
                        {paras.map((p,i)=>(<p key={i} style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:15.5,lineHeight:1.85,color:C.textSec,marginBottom:i<paras.length-1?"1em":0}}>{p}</p>))}
                      </div>
                    )}
                    {userTier===TIERS.FREE && !paras.length && (
                      <div style={{padding:"14px 16px",borderRadius:10,background:C.bgCard,border:`0.5px solid ${C.border}`,textAlign:"center"}}>
                        <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:13,color:C.textTer,fontStyle:"italic",marginBottom:10}}>The full decade reading is available on Seeker tier.</p>
                        <button onClick={()=>handleTierChange(TIERS.SEEKER)} style={{padding:"8px 20px",borderRadius:8,border:`1px solid ${C.accentLight}`,background:"transparent",fontFamily:"'EB Garamond',Georgia,serif",fontSize:13,color:C.accentDark,cursor:"pointer"}}>Unlock — $3.99/mo</button>
                      </div>
                    )}
                    {/* Pillar timeline strip */}
                    <div style={{marginTop:8,padding:"12px 14px",borderRadius:10,background:C.bgCard,border:`0.5px solid ${C.border}`}}>
                      <div style={{fontSize:8,letterSpacing:2,color:C.textTer,textTransform:"uppercase",marginBottom:8}}>Life Arc · Nine Chapters</div>
                      <div style={{display:"flex",gap:3}}>
                        {chart.luckPillars.map((lp,i)=>(
                          <div key={i} style={{flex:1,textAlign:"center"}}>
                            <div style={{height:4,borderRadius:2,background:lp.isCurrent?C.accentDark:lp.isPast?C.border:EL_C[lp.element],opacity:lp.isPast?0.3:1,marginBottom:3}}/>
                            <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:8,color:lp.isCurrent?C.accentDark:lp.isPast?C.textTer:C.textSec}}>{lp.stem}{lp.branch}</div>
                            <div style={{fontSize:7,color:C.textTer}}>{lp.startAge}s</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Today tab */}
          {tab==="today" && (
            <div style={{padding:"20px 20px 80px"}} className="fade">
              <div style={{fontSize:8,letterSpacing:2,color:C.textTer,textTransform:"uppercase",textAlign:"center",marginBottom:18}}>Current Periods · 流年流月流日</div>
              <FlowPeriod label={new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})} zh={`${chart.currentFlowDay.stem}${chart.currentFlowDay.branch}日`} text={reading?.today}/>
              <FlowPeriod label={new Date().toLocaleDateString("en-US",{month:"long",year:"numeric"})} zh={`${chart.currentFlowMonth.stem}${chart.currentFlowMonth.branch}月`} text={reading?.thisMonth}/>
              <FlowPeriod label={String(new Date().getFullYear())} zh={`${chart.currentFlowYear.stem}${chart.currentFlowYear.branch}年`} text={reading?.thisYear}/>
              {curLP && (
                <div style={{padding:"14px",borderRadius:10,background:C.bgCard,border:`0.5px solid ${C.border}`}}>
                  <div style={{fontSize:8,letterSpacing:2,color:C.textTer,textTransform:"uppercase",marginBottom:10}}>Three Layers Active Now</div>
                  {[
                    {layer:"Your Chart", detail:`${chart.dayMaster.element} dominant${chart.missingElements.length>0?`, ${chart.missingElements.join("+")} absent`:""}`, color:EL_C[chart.dayMaster.element]},
                    {layer:`Decade (${curLP.stem}${curLP.branch})`, detail:reading.decades?.[0]?.theme||"—", color:EL_C[curLP.element]},
                    {layer:`Year (${chart.currentFlowYear.stem}${chart.currentFlowYear.branch})`, detail:`${chart.currentFlowYear.stemElement}+${chart.currentFlowYear.branchElement}`, color:EL_C[chart.currentFlowYear.stemElement]},
                  ].map((l,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"flex-start",gap:9,marginBottom:i<2?9:0}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:l.color,flexShrink:0,marginTop:5}}/>
                      <div><span style={{fontSize:12,color:C.text,fontStyle:"italic"}}>{l.layer}</span><span style={{fontSize:12,color:C.textTer}}> — {l.detail}</span></div>
                    </div>
                  ))}
                  <div style={{marginTop:12,paddingTop:11,borderTop:`0.5px solid ${C.border}`}}>
                    <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:12,fontStyle:"italic",color:C.textSec,lineHeight:1.7,margin:0}}>When the same element appears across all three layers, the effect concentrates. The chart, the decade, and the year are speaking the same language right now.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
