// generate_templates_v2.js
// Generates all Elementum archetype content via Anthropic batch API.
//
// TWO INDEPENDENT PIPELINES:
//
//   PIPELINE A — Layer 1: persona cards + readings (150 keys)
//   Key format: [stem]_[band]_[tgPattern]   (Bible §3A.3)
//   node generate_templates_v2.js generate-persona           → Pass 1A batch submit
//   node generate_templates_v2.js retrieve-persona [id]      → collect → personas.json
//   node generate_templates_v2.js generate-readings          → Pass 1B batch submit
//   node generate_templates_v2.js retrieve-readings [id]     → collect → templates.json
//   node generate_templates_v2.js check                      → validate Layer 1 schemas
//   node generate_templates_v2.js merge                      → merge → generated_templates.js
//
//   PIPELINE B — Layer 2/3: reading angles (50 keys)
//   Key format: [domEl]_[specificTenGod]   (Bible §3A.3)
//   node generate_templates_v2.js generate-angles            → batch submit
//   node generate_templates_v2.js retrieve-angles [id]       → collect → angles.json
//   node generate_templates_v2.js check-angles               → validate angle schema
//   node generate_templates_v2.js merge-angles               → merge → generated_angles.js
//
// Cost estimate:
//   Pipeline A: ~$15–20  (150 keys × ~2 passes)
//   Pipeline B: ~$4–6    (50 keys × 1 pass)
//   Total: ~$20–26

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── SHARED TAXONOMY ──────────────────────────────────────────────────────────

const DAY_MASTERS = [
  { stem:"甲", element:"Wood",  elZh:"木", polarity:"yang", archetype:"The Oak",      polarityDesc:"Yang Wood — outward, structural, initiating. Grows because it cannot help growing." },
  { stem:"乙", element:"Wood",  elZh:"木", polarity:"yin",  archetype:"The Vine",     polarityDesc:"Yin Wood — adaptive, intelligent, finding. Arrives where the Oak never could." },
  { stem:"丙", element:"Fire",  elZh:"火", polarity:"yang", archetype:"The Sun",      polarityDesc:"Yang Fire — radiating, declarative, warming everything it passes through." },
  { stem:"丁", element:"Fire",  elZh:"火", polarity:"yin",  archetype:"The Candle",   polarityDesc:"Yin Fire — focused, precise, illuminating completely what it is pointed at." },
  { stem:"戊", element:"Earth", elZh:"土", polarity:"yang", archetype:"The Mountain", polarityDesc:"Yang Earth — immovable, orienting, the ground others build their lives upon." },
  { stem:"己", element:"Earth", elZh:"土", polarity:"yin",  archetype:"The Field",    polarityDesc:"Yin Earth — fertile, receptive, growing things without announcing it." },
  { stem:"庚", element:"Metal", elZh:"金", polarity:"yang", archetype:"The Blade",    polarityDesc:"Yang Metal — precise, direct, cutting to what is real before anything else completes." },
  { stem:"辛", element:"Metal", elZh:"金", polarity:"yin",  archetype:"The Jewel",    polarityDesc:"Yin Metal — discerning, refined, perceiving excellence the way others perceive temperature." },
  { stem:"壬", element:"Water", elZh:"水", polarity:"yang", archetype:"The Ocean",    polarityDesc:"Yang Water — vast, deep, holding more beneath the surface than it ever shows." },
  { stem:"癸", element:"Water", elZh:"水", polarity:"yin",  archetype:"The Rain",     polarityDesc:"Yin Water — intuitive, nourishing, sensing what is true before it is spoken." },
];

const BANDS = {
  concentrated: {
    label:    "Concentrated",
    frame:    "Core element saturates the chart — self-directed, full charge, very little counterbalance.",
    approach: "Channel & Release",
  },
  balanced: {
    label:    "Balanced",
    frame:    "Core element in genuine equilibrium — neither overwhelming nor overwhelmed.",
    approach: "Maintain & Attune",
  },
  open: {
    label:    "Open",
    frame:    "Core element depends on the right conditions — context-sensitive, operates through alignment.",
    approach: "Nourish & Amplify",
  },
};

// ─── PIPELINE A: LAYER 1 TAXONOMY ─────────────────────────────────────────────
// tgPattern — 5 values. yin/yang Output and Authority splits resolved at Layer 2/3.
// The old 7-value system (expressive/pressured) is retired from Layer 1.

const TG_PATTERNS = {
  pure: {
    label:    "Pure",
    classical:"比劫旺 — same element dominant",
    tgFamily: "Companion",
    desc:     "The same element as the Day Master dominates the chart. No counterbalancing force. The core energy amplifies itself — more of who this person already is with nothing to moderate or redirect it.",
    dominantForce: (dm) => `the same element as ${dm.archetype} itself — amplifying the core without correction`,
  },
  rooted: {
    label:    "Rooted",
    classical:"印旺 — resource element dominant",
    tgFamily: "Resource",
    desc:     "The element that generates the Day Master dominates the chart. The core is continuously nourished and backed, building depth and psychological reserve the person did not consciously construct.",
    dominantForce: (dm) => `the element that generates and nourishes ${dm.archetype} — backing without directing`,
  },
  flowing: {
    label:    "Flowing",
    classical:"食伤旺 — output element dominant",
    tgFamily: "Output",
    desc:     "The element the Day Master generates dominates the chart. The core pours itself outward continuously — expression is constitutional, not performed. The depletion is as invisible as the gift.",
    dominantForce: (dm) => `the element ${dm.archetype} naturally generates — what flows outward when this person is fully themselves`,
  },
  forging: {
    label:    "Forging",
    classical:"财旺 — wealth element dominant",
    tgFamily: "Wealth",
    desc:     "The element the Day Master controls dominates the chart. The core directs and shapes the dominant material — outcome-oriented, disciplined, oriented toward what can be earned and held.",
    dominantForce: (dm) => `the element ${dm.archetype} directs and controls — the material the core was built to shape`,
  },
  tested: {
    label:    "Tested",
    classical:"官杀旺 — authority element dominant",
    tgFamily: "Authority",
    desc:     "The element that controls the Day Master dominates the chart. The core has been shaped by external pressure — character forged or refined by something that did not grant permission.",
    dominantForce: (dm) => `the element that presses on and shapes ${dm.archetype} — external authority that tests without asking`,
  },
};

// Hand-written reference key — skip in generation
const SKIP_KEYS = new Set(["庚_concentrated_pure"]);

function buildLayer1Combinations() {
  const combos = [];
  const PATTERN_ORDER = ["pure","rooted","flowing","forging","tested"];
  for (const dm of DAY_MASTERS) {
    for (const band of Object.keys(BANDS)) {
      for (const tgPattern of PATTERN_ORDER) {
        const key = `${dm.stem}_${band}_${tgPattern}`;
        if (SKIP_KEYS.has(key)) continue;
        combos.push({ key, dm, band, tgPattern });
      }
    }
  }
  return combos;
}

// ─── PIPELINE B: LAYER 2/3 TAXONOMY ───────────────────────────────────────────
// 50 entries: domEl_specificTenGod. DM element is mathematically implied.

const EL_NAMES = {
  "金": { en:"Metal", nature:"evaluative precision — the standard that runs before anything else engages" },
  "木": { en:"Wood",  nature:"outward reach — the developmental instinct that moves toward things before deciding to" },
  "火": { en:"Fire",  nature:"illuminating warmth — the relational presence that changes the temperature of a room" },
  "土": { en:"Earth", nature:"grounded stability — the containing force that holds and orients without announcing itself" },
  "水": { en:"Water", nature:"perceptual depth — the intelligence that reads beneath the surface of what is being said" },
};

const TG_MECHANICS = {
  "比肩": { en:"Parallel Self", family:"Companion", polarity:"same",  pairNote:"Compare to 劫财: mirror vs rival — same-polarity self-amplification vs cross-polarity structural competition.", mechanism:"Same element, same polarity — the DM meets a force identical in nature. Amplification without friction. Self-referencing loop with no natural interrupt." },
  "劫财": { en:"The Rival",     family:"Companion", polarity:"cross", pairNote:"Compare to 比肩: rival vs mirror — structural competition between similar energies, not self-amplification.", mechanism:"Same element, cross polarity — shares the nature, not the register. Structural competition rather than mirroring. Close enough to feel like peers, different enough to compete." },
  "食神": { en:"The Flow",      family:"Output",    polarity:"same",  pairNote:"Compare to 伤官: natural effortless output vs output in structural tension with frameworks. 食神 does not challenge — it flows.", mechanism:"DM generates this element, same polarity — natural, effortless output. Expression arrives without assertion. 秀气: elegant, unforced Qi. Cost is invisible from the inside." },
  "伤官": { en:"The Edge",      family:"Output",    polarity:"cross", pairNote:"Compare to 食神: structural tension with frameworks vs effortless flow. 伤官 literally hurts the officer — not wilfully, structurally.", mechanism:"DM generates this element, cross polarity — the produced force is in structural tension with the producing force. Output consistently exceeds what conventional structures can contain or evaluate." },
  "偏财": { en:"The Field",     family:"Wealth",    polarity:"same",  pairNote:"Compare to 正财: broad distributed engagement vs cross-polarity disciplined specific control.", mechanism:"DM controls this element, same polarity — broad ranging across many instances of this material. Wide engagement, distributed quality, difficulty concentrating the control." },
  "正财": { en:"The Harvest",   family:"Wealth",    polarity:"cross", pairNote:"Compare to 偏财: specific disciplined control vs broad distributed ranging.", mechanism:"DM controls this element, cross polarity — structured, specific, methodical direction. Cross-polarity creates discipline and direction in the controlling relationship." },
  "七杀": { en:"The Trial",     family:"Authority", polarity:"same",  pairNote:"Compare to 正官: unmediated pressure that does not care vs structured framework that grants recognition.", mechanism:"This element controls DM, same polarity — unmediated direct pressure. Does not grant permission, does not moderate itself. Classical 七杀: forges or damages. No middle outcome depends entirely on resources." },
  "正官": { en:"The Standard",  family:"Authority", polarity:"cross", pairNote:"Compare to 七杀: structured recognition when quality is real vs unmediated pressure regardless.", mechanism:"This element controls DM, cross polarity — structured pressure through a framework the DM can evaluate and choose to respect. Grants recognition when quality is genuinely demonstrated." },
  "偏印": { en:"The Well",      family:"Resource",  polarity:"same",  pairNote:"Compare to 正印: sustains and deepens in same register vs sustains and opens direction in cross register.", mechanism:"This element generates DM, same polarity — nourishment that deepens and sustains without redirecting. Backing from the same register. The support arrives through the same channel as the DM." },
  "正印": { en:"The Root",      family:"Resource",  polarity:"cross", pairNote:"Compare to 偏印: opens and provides direction (cross) vs sustains and deepens (same).", mechanism:"This element generates DM, cross polarity — nourishment that sustains AND opens toward something specific. The backing provides direction as well as depth." },
};

const ANGLE_KEYS = [
  { key:"金_比肩", domEl:"金", tg:"比肩", dmEl:"Metal", interaction:"Metal precision amplifying Metal precision — same-polarity self-referencing loop. No counterpoint, no natural interrupt." },
  { key:"金_劫财", domEl:"金", tg:"劫财", dmEl:"Metal", interaction:"Metal precision meeting Metal precision cross-polarity — structural competition between similar evaluative standards." },
  { key:"金_食神", domEl:"金", tg:"食神", dmEl:"Earth", interaction:"Earth DM stability generating Metal precision same-polarity — precision as the natural effortless output of the containing force." },
  { key:"金_伤官", domEl:"金", tg:"伤官", dmEl:"Earth", interaction:"Earth DM generating Metal precision cross-polarity — the containing force producing precision that exceeds what frameworks can evaluate." },
  { key:"金_偏财", domEl:"金", tg:"偏财", dmEl:"Fire",  interaction:"Fire DM directing Metal precision broadly same-polarity — warmth ranging across evaluative precision as distributed material." },
  { key:"金_正财", domEl:"金", tg:"正财", dmEl:"Fire",  interaction:"Fire DM directing Metal precision cross-polarity — focused illumination shaping the evaluative standard with methodical discipline." },
  { key:"金_七杀", domEl:"金", tg:"七杀", dmEl:"Wood",  interaction:"Metal precision pressing on Wood DM same-polarity — the cutting force that does not grant permission, shaping reach without asking." },
  { key:"金_正官", domEl:"金", tg:"正官", dmEl:"Wood",  interaction:"Metal precision setting structured standard for Wood DM cross-polarity — testing whether the reach is real and granting recognition when it is." },
  { key:"金_偏印", domEl:"金", tg:"偏印", dmEl:"Water", interaction:"Metal precision generating Water DM same-polarity — the evaluative standard as the sustaining source of perceptual depth." },
  { key:"金_正印", domEl:"金", tg:"正印", dmEl:"Water", interaction:"Metal precision generating Water DM cross-polarity — the standard nourishing and opening the flowing intelligence toward something specific." },
  { key:"木_比肩", domEl:"木", tg:"比肩", dmEl:"Wood",  interaction:"Wood reach amplifying Wood reach — developmental instinct running without definition or natural interrupt." },
  { key:"木_劫财", domEl:"木", tg:"劫财", dmEl:"Wood",  interaction:"Wood reach meeting Wood reach cross-polarity — growth in structural competition with growth in the same space." },
  { key:"木_食神", domEl:"木", tg:"食神", dmEl:"Water", interaction:"Water DM depth generating Wood reach same-polarity — perceptual intelligence as the effortless source of outward reach." },
  { key:"木_伤官", domEl:"木", tg:"伤官", dmEl:"Water", interaction:"Water DM generating Wood reach cross-polarity — depth producing reach that structurally exceeds its container." },
  { key:"木_偏财", domEl:"木", tg:"偏财", dmEl:"Metal", interaction:"Metal DM directing Wood reach broadly same-polarity — precision ranging across living growing material as distributed resource." },
  { key:"木_正财", domEl:"木", tg:"正财", dmEl:"Metal", interaction:"Metal DM directing Wood reach cross-polarity — precision shaping the developmental instinct toward specific structured outcomes." },
  { key:"木_七杀", domEl:"木", tg:"七杀", dmEl:"Earth", interaction:"Wood reach pressing on Earth DM same-polarity — the destabilising root that breaks stone without granting permission." },
  { key:"木_正官", domEl:"木", tg:"正官", dmEl:"Earth", interaction:"Wood reach setting a standard for Earth DM cross-polarity — movement asking whether the stability is alive rather than merely inert." },
  { key:"木_偏印", domEl:"木", tg:"偏印", dmEl:"Fire",  interaction:"Wood reach generating Fire DM same-polarity — the developmental instinct as the sustaining fuel for warmth and illumination." },
  { key:"木_正印", domEl:"木", tg:"正印", dmEl:"Fire",  interaction:"Wood reach generating Fire DM cross-polarity — the reach nourishing warmth and opening it toward a specific direction." },
  { key:"火_比肩", domEl:"火", tg:"比肩", dmEl:"Fire",  interaction:"Fire warmth amplifying Fire warmth — illuminating presence running without containment or direction." },
  { key:"火_劫财", domEl:"火", tg:"劫财", dmEl:"Fire",  interaction:"Fire warmth meeting Fire warmth cross-polarity — relational presence in structural competition with relational presence." },
  { key:"火_食神", domEl:"火", tg:"食神", dmEl:"Wood",  interaction:"Wood DM reach generating Fire warmth same-polarity — the developmental instinct as the natural source of warmth and expression." },
  { key:"火_伤官", domEl:"火", tg:"伤官", dmEl:"Wood",  interaction:"Wood DM generating Fire warmth cross-polarity — reach producing warmth that structurally challenges frameworks." },
  { key:"火_偏财", domEl:"火", tg:"偏财", dmEl:"Water", interaction:"Water DM directing Fire warmth broadly same-polarity — perceptual depth ranging across illuminating warmth as distributed material." },
  { key:"火_正财", domEl:"火", tg:"正财", dmEl:"Water", interaction:"Water DM directing Fire warmth cross-polarity — depth shaping illumination into structured purposeful form." },
  { key:"火_七杀", domEl:"火", tg:"七杀", dmEl:"Metal", interaction:"Fire warmth pressing on Metal DM same-polarity — the forge that neither grants permission nor moderates itself." },
  { key:"火_正官", domEl:"火", tg:"正官", dmEl:"Metal", interaction:"Fire warmth setting a structured standard for Metal DM cross-polarity — the forge that refines and grants recognition when quality is genuine." },
  { key:"火_偏印", domEl:"火", tg:"偏印", dmEl:"Earth", interaction:"Fire warmth generating Earth DM same-polarity — the illuminating force as the quiet activation source for the containing stability." },
  { key:"火_正印", domEl:"火", tg:"正印", dmEl:"Earth", interaction:"Fire warmth generating Earth DM cross-polarity — warmth nourishing stability and opening it toward movement." },
  { key:"土_比肩", domEl:"土", tg:"比肩", dmEl:"Earth", interaction:"Earth stability amplifying Earth stability — the containing force deepening without movement or release." },
  { key:"土_劫财", domEl:"土", tg:"劫财", dmEl:"Earth", interaction:"Earth stability meeting Earth stability cross-polarity — grounding force in structural competition with grounding force." },
  { key:"土_食神", domEl:"土", tg:"食神", dmEl:"Fire",  interaction:"Fire DM warmth generating Earth stability same-polarity — illuminating presence as the natural source of stable lasting deposits." },
  { key:"土_伤官", domEl:"土", tg:"伤官", dmEl:"Fire",  interaction:"Fire DM generating Earth stability cross-polarity — warmth building structure that structurally exceeds conventional expectation." },
  { key:"土_偏财", domEl:"土", tg:"偏财", dmEl:"Wood",  interaction:"Wood DM reach directing Earth stability broadly same-polarity — developmental reach ranging across stable material as distributed resource." },
  { key:"土_正财", domEl:"土", tg:"正财", dmEl:"Wood",  interaction:"Wood DM directing Earth stability cross-polarity — reach shaping the containing force into cultivated structured form." },
  { key:"土_七杀", domEl:"土", tg:"七杀", dmEl:"Water", interaction:"Earth stability pressing on Water DM same-polarity — the containing force blocking perceptual depth without granting permission." },
  { key:"土_正官", domEl:"土", tg:"正官", dmEl:"Water", interaction:"Earth stability setting a standard for Water DM cross-polarity — containment asking whether the depth has form and can be channelled." },
  { key:"土_偏印", domEl:"土", tg:"偏印", dmEl:"Metal", interaction:"Earth stability generating Metal DM same-polarity — the containing force as the quiet sustaining source of evaluative precision." },
  { key:"土_正印", domEl:"土", tg:"正印", dmEl:"Metal", interaction:"Earth stability generating Metal DM cross-polarity — the containing force nourishing precision and opening it toward a specific direction." },
  { key:"水_比肩", domEl:"水", tg:"比肩", dmEl:"Water", interaction:"Water depth amplifying Water depth — perceptual intelligence running without form, channel, or natural constraint." },
  { key:"水_劫财", domEl:"水", tg:"劫财", dmEl:"Water", interaction:"Water depth meeting Water depth cross-polarity — perceptual intelligence in structural competition with perceptual intelligence." },
  { key:"水_食神", domEl:"水", tg:"食神", dmEl:"Metal", interaction:"Metal DM precision generating Water depth same-polarity — the evaluative standard as the natural effortless source of flowing intelligence." },
  { key:"水_伤官", domEl:"水", tg:"伤官", dmEl:"Metal", interaction:"Metal DM generating Water depth cross-polarity — precision producing perceptual depth that structurally exceeds what the environment can contain." },
  { key:"水_偏财", domEl:"水", tg:"偏财", dmEl:"Earth", interaction:"Earth DM directing Water depth broadly same-polarity — stability ranging across perceptual intelligence as distributed material." },
  { key:"水_正财", domEl:"水", tg:"正财", dmEl:"Earth", interaction:"Earth DM directing Water depth cross-polarity — stability shaping perceptual intelligence into productive channelled form." },
  { key:"水_七杀", domEl:"水", tg:"七杀", dmEl:"Fire",  interaction:"Water depth pressing on Fire DM same-polarity — the extinguishing force that tests warmth without moderation." },
  { key:"水_正官", domEl:"水", tg:"正官", dmEl:"Fire",  interaction:"Water depth setting a standard for Fire DM cross-polarity — depth asking whether the warmth is sustainable and granting recognition when it is." },
  { key:"水_偏印", domEl:"水", tg:"偏印", dmEl:"Wood",  interaction:"Water depth generating Wood DM same-polarity — perceptual intelligence as the sustaining nourishment for the developmental reach." },
  { key:"水_正印", domEl:"水", tg:"正印", dmEl:"Wood",  interaction:"Water depth generating Wood DM cross-polarity — perceptual intelligence nourishing reach and opening it toward something specific." },
];

// ─── LAYER 1: TIERED SOURCING DATA ────────────────────────────────────────────

const PSYCH_PROFILES = {
  stems: {
    "甲": { jungian:"Extraverted Intuition (Ne) + Extraverted Thinking (Te) — generates possibilities and reaches before consolidation", bigFive:"High Openness/Intellect + High Assertiveness. Vision outruns foundations.", mechanism:"Forward projection as structural fact. Cannot stop reaching. Growth is the architecture.", attachment:"Secure-leaning but over-extension risk — commits deeply then outgrows before rooting." },
    "乙": { jungian:"Introverted Intuition (Ni) + Extraverted Feeling (Fe) — reads the field, finds the non-obvious route, adapts without announcing", bigFive:"High Openness + moderate-high Agreeableness + moderate Introversion tendency", mechanism:"Navigation as primary cognitive event. Reads exits before announced. Arrives where it intended.", attachment:"Anxious-avoidant hybrid — deep relational sensitivity combined with instinct to find the path out before fully committing." },
    "丙": { jungian:"Extraverted Feeling (Fe) dominant + Extraverted Intuition (Ne) — warmth radiates structurally", bigFive:"High Enthusiasm + High Compassion + moderate Neuroticism (accumulation cost)", mechanism:"Illumination as structural default. The room changes before announcement.", attachment:"Anxious-leaning — generates warmth for all, private experience of isolation when it is not returned." },
    "丁": { jungian:"Introverted Feeling (Fi) + Introverted Sensing (Si) — precise, specific, illuminates completely what it is pointed at", bigFive:"Lower Extraversion + High Conscientiousness in Orderliness + moderate Neuroticism potential", mechanism:"Precision illumination. Does not broadcast — focuses. What it does not illuminate is not lit.", attachment:"Secure base with selective activation — deep investment in the few things fully illuminated." },
    "戊": { jungian:"Introverted Sensing (Si) + Extraverted Thinking (Te) — reliable, accumulating, orienting by structural stability", bigFive:"High Conscientiousness + Low Neuroticism + moderate Extraversion", mechanism:"Load-bearing as primary mode. Others orient around without naming it.", attachment:"Secure with avoidant tendency — deeply reliable, moves slowly toward intimacy." },
    "己": { jungian:"Introverted Feeling (Fi) + Extraverted Feeling (Fe) hybrid — nourishes from below, grows things without announcing", bigFive:"High Agreeableness nurturance + moderate Conscientiousness + higher Neuroticism (invisible giving)", mechanism:"Developmental nourishment. Creates conditions for growth in others without announcing it.", attachment:"Anxious-leaning — gives continuously and struggles to receive." },
    "庚": { jungian:"Introverted Thinking (Ti) dominant + Extraverted Sensing (Se) — evaluates accuracy before social processing begins", bigFive:"High Conscientiousness + Low Agreeableness/Politeness + lower Neuroticism + moderate Introversion", mechanism:"Evaluative by structural default. Assessment is the first cognitive event.", attachment:"Dismissive-avoidant tendency — deeply self-reliant, resistant to external redefinition." },
    "辛": { jungian:"Introverted Sensation (Si) + Introverted Thinking (Ti) — perceives quality the way others perceive temperature", bigFive:"High Openness/Intellect aesthetic + High Conscientiousness + moderate-low Extraversion", mechanism:"Discernment as ambient perception. Excellence detected before analysis.", attachment:"Secure with perfectionist anxiety — the cost is rarely visible until the standard consumes what it was protecting." },
    "壬": { jungian:"Introverted Intuition (Ni) + Extraverted Intuition (Ne) — reads beneath the surface of everything simultaneously", bigFive:"Very High Openness + moderate Extraversion + higher Neuroticism potential (vastness without banks)", mechanism:"Depth perception as structural default. Holds more beneath the surface than it ever shows.", attachment:"Dismissive-avoidant with depth — deeply perceptive of others interior states, maintains distance to manage the cost." },
    "癸": { jungian:"Introverted Feeling (Fi) + Extraverted Intuition (Ne) — senses what is true before it is spoken", bigFive:"High Agreeableness empathy + High Openness + moderate-high Neuroticism (continuous attunement)", mechanism:"Empathic attunement as default. Nourishes without announcing. The sensitivity is always running.", attachment:"Anxious-secure hybrid — deeply attuned, gives continuously, experiences cost as invisible depletion." },
  },
  bands: {
    concentrated: "Concentrated band — the core mechanism runs at full charge without requiring external activation. High internal consistency. Strong resistance to external redefinition. The same quality that produces exceptional capability at the right intensity produces specific excess patterns when the mechanism has no appropriate target. Shadow: the mechanism eventually runs on whatever is available, including the self.",
    balanced:     "Balanced band — the core mechanism is in genuine conversation with surrounding forces. Can modulate across contexts without losing centre. More susceptible to disruption than concentrated, but more genuinely responsive. Shadow: the flexibility that enables range can become loss of anchor under sustained pressure.",
    open:         "Open band — the core mechanism comes through most fully when specific conditions are present. The ceiling in the right environment can be extraordinary; the floor in the wrong one is surprisingly low. Shadow: the gap between best-case and worst-case expression is wide, which makes environmental choices among the most consequential decisions this chart can make.",
  },
  tgPatterns: {
    pure:    "Self-amplification without counterforce. The core mechanism meets no moderating influence — it deepens into itself. Strength: extraordinary self-consistency and internal authority. Shadow: a loop with no natural exit. Research anchor: identity consolidation theory.",
    rooted:  "Continuous nourishment from behind. The core mechanism is backed by a sustaining force it did not consciously build. Strength: psychological reserves that arrive without effort. Shadow: dependency on structural support that has not been examined. Research anchor: attachment theory secure base.",
    flowing: "Natural outward expression. The core mechanism pours into output continuously. Strength: effortless generosity of output. Shadow: the invisible depletion risk — the output does not feel like effort from the inside. Research anchor: intrinsic motivation theory.",
    forging: "Directed control of material. The core mechanism shapes and directs the dominant element. Strength: disciplined methodical pursuit of what can be earned and held. Shadow: the evaluative apparatus applied to what you control does not know when to stop. Research anchor: self-determination theory competence need.",
    tested:  "Character shaped by external pressure. The core mechanism formed under conditions that did not grant permission. Strength: what was forged rather than developed. Shadow: character structurally dependent on the pressure that shaped it. Research anchor: post-traumatic growth and adversarial growth.",
  },
};

const STEM_CLASSICAL = {
  "庚": { principle:"金逢火炼方显锋芒 / 成器", translation:"Metal without fire remains potential — the forge reveals what the edge actually is.", derivation:"庚 needs the encounter with genuine resistance to become what it structurally is. The precision is real before it is tested; what the test produces is the direction, not the capability itself." },
  "辛": { principle:"金逢火炼方显锋芒 / 素材", translation:"Yin Metal refined by heat — the jewel requires a setting to hold the revealed quality.", derivation:"辛 needs refinement through encounter, but also the protective container to hold what is revealed. Without the setting, the heat damages rather than reveals." },
  "甲": { principle:"甲木成材", translation:"Yang Wood must be shaped to become timber — undirected growth produces abundance without form.", derivation:"甲 requires definition of reach to produce something that lasts. The growth instinct is real; the question is what gives it the form that distinguishes building from accumulating." },
  "戊": { principle:"戊无水则燥 / 春土无火则寒", translation:"Earth without Water becomes dry; Spring Earth without Fire remains cold.", derivation:"Apply only to the relevant condition. Dry Earth: stability without depth of perception becomes rigid and inaccessible. Cold Earth: stability without activation becomes inert weight rather than living ground." },
  "壬": { principle:"壬水奔流无土则泄", translation:"Yang Water without Earth banks becomes runoff — depth without form dissipates.", derivation:"Apply only when Earth is the relevant force. The intelligence without a containing structure runs everywhere at once and reaches nothing specifically." },
};

// ─── BUILD PROMPTS ─────────────────────────────────────────────────────────────

function buildPersonaPrompt(combo) {
  const { dm, band, tgPattern } = combo;
  const bandData  = BANDS[band];
  const tgData    = TG_PATTERNS[tgPattern];
  const pStem     = PSYCH_PROFILES.stems[dm.stem];
  const pBand     = PSYCH_PROFILES.bands[band];
  const pTg       = PSYCH_PROFILES.tgPatterns[tgPattern];
  const stemCl    = STEM_CLASSICAL[dm.stem];
  const stemBlock = stemCl ? `\nSTEM CLASSICAL PRINCIPLE (${dm.stem}):\n${stemCl.principle}\nTranslation: ${stemCl.translation}\nDerivation: ${stemCl.derivation}` : "";

  return `Generate the PERSONA CARD for: ${dm.stem}_${band}_${tgPattern}

ARCHETYPE:
Stem: ${dm.stem} — ${dm.archetype} | ${dm.polarityDesc}
Band: ${bandData.label} — ${bandData.frame}
tgPattern: ${tgData.label} [${tgData.tgFamily}] — ${tgData.desc}
Dominant force: ${tgData.dominantForce(dm)}

PSYCHOLOGICAL SOURCING:
Stem — Jungian: ${pStem.jungian}
Stem — Big Five: ${pStem.bigFive}
Stem — Mechanism: ${pStem.mechanism}
Stem — Attachment: ${pStem.attachment}
Band: ${pBand}
tgPattern: ${pTg}
${stemBlock}

PORTRAIT PRE-WRITE (mandatory before JSON):
Write 5–8 sentences: vivid human portrait, interior experience, what others experience, what they live with that others don't name.
Three coherence tests before proceeding:
1. Could this apply to a different stem-band-tgPattern? If yes, rewrite.
2. Does someone say "this is exactly me" — or does it feel generic?
3. Is there a recognisable scene from this person's actual life?

Return only valid JSON.`;
}

function buildReadingPrompt(combo, persona) {
  const { dm, band, tgPattern } = combo;
  const bandData  = BANDS[band];
  const tgData    = TG_PATTERNS[tgPattern];
  const stemCl    = STEM_CLASSICAL[dm.stem];
  const stemBlock = stemCl ? `\nSTEM CLASSICAL: ${stemCl.principle} — ${stemCl.translation}\nDerivation: ${stemCl.derivation}` : "";
  const personaBlock = persona
    ? `\nPERSONA CARD (source document — derive from this, do not generate independently):\n${JSON.stringify(persona, null, 2)}`
    : "\n[No persona card — generate directly from structural inputs]";

  return `Generate the READING SCHEMA for: ${dm.stem}_${band}_${tgPattern}

ARCHETYPE:
Stem: ${dm.stem} — ${dm.archetype} | ${dm.polarityDesc}
Band: ${bandData.label} — ${bandData.frame}
tgPattern: ${tgData.label} — ${tgData.desc}
${stemBlock}
${personaBlock}

Return only valid JSON.`;
}

function buildAnglePrompt(entry) {
  const { key, domEl, tg, dmEl, interaction } = entry;
  const domName  = EL_NAMES[domEl];
  const tgData   = TG_MECHANICS[tg];

  return `Generate the READING ANGLES for: ${key}

THE INTERACTION:
Dominant element: ${domEl} (${domName.en}) — ${domName.nature}
Specific Ten God: ${tg} (${tgData.en}) [${tgData.family} family, ${tgData.polarity} polarity]
Implied DM element: ${dmEl}
Interaction: ${interaction}
TG Mechanism: ${tgData.mechanism}
Pair note: ${tgData.pairNote}

DERIVATION CHAIN (answer before writing):
1. What is the DM's specific nature DOING to the dominant element's specific nature?
   Name the verb between two specific elemental natures — not abstract force labels.
2. What does this specific interaction produce that no other combination produces?
3. What is the specific shadow — same mechanism, at excess or misdirected?
4. How is this categorically different from its paired TG (per pair note above)?

THREE ANGLES (each max 3 sentences, second person, present tense, no BaZi jargon):
- how: the specific behavioral pattern this exact TG mechanism produces. Must differ from any other TG for this dominant element.
- works: the dynamic between the two specific elemental natures. When does it energise vs compress? Neutral framing — never prescriptive.
- deep: the shadow layer. The thing this person has lived but never had named.

Return ONLY this JSON:
{"how": "...", "works": "...", "deep": "..."}`;
}

// ─── SYSTEM PROMPTS ────────────────────────────────────────────────────────────

const PERSONA_SYSTEM_PROMPT = `You are building a vivid, specific portrait of a real person who lives this structural combination. This is not a personality summary. It is a character study — specific enough that the person reading it will recognise specific moments from their own life: not just traits, but scenes, habits, reactions, the precise shape of their interior world.

THE PORTRAIT IS THE GENERATIVE EVENT.

The sourcing data you are given describes who this person is from multiple angles. Your job is not to combine those angles into a list. Your job is to find the whole person those angles are all pointing at — the human being they describe when held together.

Four things the portrait must find:

1. What makes this person immediately recognisable before they say a word. This is not a trait ("they are precise") — it is a signal ("the assessment was already running before they sat down"). Something a room picks up. Something specific.

2. The thing they do that confuses people who don't understand their architecture. The behaviour that makes complete sense from the inside but puzzles the outside. This is the most recognisable thing — because the person reading it has been this specific kind of confusing before, and they know it.

3. The quality that is simultaneously their greatest gift and their greatest cost. Not a gift and a separate edge — the same thing, two faces. The same quality that makes them exceptional is what makes them hardest to live with or be.

4. What the productive tension between their structural layers produces. Level 1 (stem) is the engine. Level 2 (band) is the amplitude. Level 3 (tgPattern) is the structural condition. Where these levels diverge — where the engine meets its condition and creates friction or surprise — is where the depth lives.

MANDATORY PORTRAIT PRE-WRITE:
Before writing a single JSON field, write this portrait in 5–8 sentences. Write it in the voice of an intimate observer. Not analytically — the way a close friend would describe this person to someone who hasn't met them.

THREE COHERENCE TESTS before proceeding to field generation:
(1) Is this one person, or a collection of traits that could be rearranged?
(2) Would someone who knows this person recognise them from this description without any structural labels?
(3) Does the portrait hold together at the exact points where the levels conflict — not by resolving the conflict, but by showing a person who lives with it?

If the portrait fails any of these: don't adjust individual sentences. Return to the level conflicts. Find the most productive tension. Rebuild from there.

FIELD GENERATION RULE:
Every field must be derivable from the portrait. If a field could apply to a different tgPattern or different band for the same stem, it is too generic. Rewrite until it couldn't apply to anything else.

ANTI-GENERICITY CHECK (run before writing each field):
Could this field describe the yin/yang counterpart of this tgPattern for the same stem?
Could this field apply to the same tgPattern one band higher or lower?
If yes to either — rewrite.

WHAT SPECIFIC MEANS:
EVENTS — a situation, a specific choice, a specific outcome. The protagonist must behave in a way that would be implausible for most people but completely inevitable for this archetype. Not "they worked hard on a project." Show the night they rewrote the entire framework because they knew something was structurally wrong and couldn't present something they didn't believe.

DAILY HABITS — what you could watch this person doing. Not "they reflect before deciding." What do they do in the first fifteen minutes of the day? The goal: "oh my god, I do that."

THERAPIST ADVICE — specific enough to act on this week. Not "communicate more openly." Tell them exactly what to try, with whom, in what specific situation, and what to notice.

Return ONLY valid JSON. Do not include the portrait pre-write in output.`;

const READING_SYSTEM_PROMPT = `You are distilling a persona card into a user-facing reading. The persona card is your sole source. Sourcing data that produced it is not available — it did its job in Pass 1.

Your job is three things only: selection, compression, and voicing.

SELECTION: The persona card contains more than the reading can hold. Choose the moments, habits, and patterns that will produce self-recognition most immediately — not the most analytically interesting material, the most recognisable material.

COMPRESSION: Every field has a hard length limit. These are not guidelines. Density matters. Every sentence earns its place or is cut.

VOICING: The reading is voiced in the DM element's register. Same person, same insight — the register is what makes the reader feel addressed rather than described.

THE FIVE ELEMENTAL VOICE REGISTERS (lock in before writing the first word):

METAL — precise, direct, cool. Verdict-energy. Sentences that arrive as conclusions. Short. Often ends on a noun or a hard fact. No hedging. Warmth arrives through accuracy.
Reference: "The audit was already running. You didn't start it."

WOOD — reaching, restless, generative. Momentum-energy. Sentences lean forward. Builds. Ends on a possibility or direction not yet reached.
Reference: "You've been building toward something you can't quite name yet. That's not a flaw in the plan — it is the plan."

FIRE — warm, scene-setting, relational. Presence-energy. Opens wide, closes on the specific human detail. The world this person moves through, not just the interior.
Reference: "People feel it before you speak. The room is different when you're in it — not because you tried to make it that way."

EARTH — weighted, patient, load-bearing. Gravity-energy. Sentences settle rather than reach. Measured. Often long before arriving at the point. Ends on something solid.
Reference: "You've been the ground under other people's feet for so long that you sometimes forget you're also standing on it."

WATER — beneath the surface, fluid, withheld. Depth-energy. Suggests more than it names. Elliptical, incomplete-feeling. Trails off where Metal would conclude.
Reference: "You knew before they finished the sentence. You usually do."

Cross-check before proceeding: read the first sentence back. Does it feel like it was written by this element? If a Metal reading could have been written by Earth, restart.

DERIVATION MAP — derive every field from the persona card:
  teaser    ← events[0] + stranger + tension (≤90 words — write this last)
  p1        ← coworker + architecture, front/back contrast (≤80 words)
  p2        ← tension primary (≤70 words, no imperatives)
  gifts     ← labels + events as behavioral evidence (social proof in every desc)
  edges     ← struggles + under_stress + therapist_advice patterns (Watch for required)
  landscape ← excites/good_at (thrives) + irritated_by/struggles (costs)
  twoAM     ← tension → first person, structural collision, 15–35 words

GIFTS desc: must contain social proof — "come to you when," "call you when," "bring you when," or "trust you with."
EDGES desc: required structure — [interior experience] [relational consequence] Watch for: [specific observable trigger].
TWOAM: first person. The thought that arrives quietly at 2AM when everything is going reasonably well. Specific. Not motivational. Could only describe this exact combination.

BANNED VOCABULARY (any occurrence fails):
BaZi terms: Day Master, Ten Gods, Food God, Hurt Officer, Seven Killings, Direct Officer, Parallel Self, Rob Wealth, Indirect Seal, Direct Seal, Indirect Wealth, Direct Wealth, Pure, Rooted, Flowing, Forging, Tested, Pressured, Expressive
Generic spiritual: the universe, cosmic, destiny, fate, zodiac, journey, vibrant, tapestry, empowered, manifest, spiritual, at your core, in essence, fundamentally
Weak openers: "You are someone who...", "As a [type]...", "People with your..."

Return ONLY valid JSON. No preamble. No markdown fences.`;

const ANGLE_SYSTEM_PROMPT = `You write reading angles for elemental interaction archetypes in the Elementum app. Each key encodes a specific dominant element × specific Ten God — and the DM element is mathematically implied. You are not writing general content about elements or TGs. You are writing about what happens when these two specific elemental natures interact through this specific structural mechanism.

THE GENERATIVE EVENT IS A SCENE, NOT A TAXONOMY.

Before writing any angle, visualise this: two specific elemental natures in the same room. The dominant element is the atmosphere — the field the DM operates within. The Ten God is what that atmosphere does to the DM. Picture what actually happens between them. The gift, the friction, the thing the DM would never say aloud about what it's like to live in this field. THEN write the angles from that scene.

THE YIN/YANG DISTINCTION IS STRUCTURAL, NOT TONAL.

食神 = the output is non-assertive and effortlessly generous. The doing and the reward are indistinguishable. The depletion is invisible. Quiet abundance.
伤官 = the output is constituted by what resists it. Remove the friction and the quality changes. Not quieter than 食神 — structurally different.
正官 = the authority grants permission when the standard is met. Character shaped by a framework the person chose to endorse. The secure base in legitimate structure.
七杀 = the authority does not grant permission. Does not moderate itself. Does not care if you survive it. Character forged, not refined. Genuine bifurcation between exceptional and damaged.

VOICE REGISTER: Write in the implied DM element's register. The DM is the one being addressed.
METAL DM — precise, verdict-energy, cool, short declarative sentences
WOOD DM — reaching, forward-momentum, builds toward a direction
FIRE DM — warm, scene-setting, relational, specific human detail
EARTH DM — weighted, patient, accumulating, settles rather than reaches
WATER DM — withheld, elliptical, suggests more than it names

WHAT EACH ANGLE DOES:
how — structural register. The behavioral pattern this exact combination produces. Specific to this key — a reader with the yin/yang counterpart gets something structurally different. ≤3 sentences.
works — experiential register. The dynamic between these two specific elemental natures. When does this energise the DM? When does it compress? NEUTRAL framing only — never prescriptive. ≤3 sentences.
deep — relational register. The shadow layer. What this exact interaction produces that others rarely name. The interior cost or gift visible only when both natures are held simultaneously. The depth charge. ≤3 sentences.

QUALITY TEST: Swap the TG for its pair. If the angles still work — they are not specific enough.

No BaZi terminology in any angle. No Ten God names. No Chinese characters. Second person present tense.

Return ONLY valid JSON: {"how": "...", "works": "...", "deep": "..."}`;


// ─── BATCH INFRASTRUCTURE ─────────────────────────────────────────────────────

async function submitBatch(combos, systemPrompt, promptBuilder, label) {
  console.log(`\nBuilding ${combos.length} ${label} requests...`);
  const requests = combos.map(combo => ({
    custom_id: combo.key,
    params: {
      model:      "claude-opus-4-20250514",
      max_tokens: 1400,
      system:     systemPrompt,
      messages:   [{ role:"user", content: promptBuilder(combo) }],
    },
  }));
  const batch = await anthropic.messages.batches.create({ requests });
  console.log(`Batch submitted: ${batch.id}`);
  return batch.id;
}

async function waitForBatch(batchId) {
  console.log(`\nPolling ${batchId}...`);
  let attempts = 0;
  while (true) {
    const batch = await anthropic.messages.batches.retrieve(batchId);
    const { processing_status, request_counts } = batch;
    const { succeeded=0, errored=0, processing=0 } = request_counts || {};
    process.stdout.write(`\r  ${processing_status} — ${succeeded} done, ${errored} errors, ${processing} processing`);
    if (processing_status === "ended") { console.log(`\nComplete.`); return batch; }
    await new Promise(r => setTimeout(r, 30000));
    if (++attempts > 80) { console.error("\nTimeout."); process.exit(1); }
  }
}

async function collectResults(batchId, validator) {
  const results = {}, failed = [];
  for await (const result of await anthropic.messages.batches.results(batchId)) {
    if (result.result.type === "succeeded") {
      try {
        const text   = result.result.message.content.map(b => b.text || "").join("");
        const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
        const issues = validator(result.custom_id, parsed);
        if (issues.length) throw new Error(issues.join("; "));
        results[result.custom_id] = parsed;
      } catch (e) { console.warn(`\nFailed ${result.custom_id}: ${e.message}`); failed.push(result.custom_id); }
    } else { failed.push(result.custom_id); }
  }
  return { results, failed };
}

// ─── QUALITY CHECKERS ─────────────────────────────────────────────────────────

const FORBIDDEN = ["Day Master","Ten Gods","Food God","Seven Killings","Hurt Officer","Direct Officer","Parallel Self","Rob Wealth","Indirect Seal","Direct Seal","Indirect Wealth","Direct Wealth"," Pure "," Rooted "," Flowing "," Forging "," Tested ","the universe","cosmic","destiny","fate","zodiac","journey","vibrant","tapestry","empowered","manifest","spiritual","at your core","in essence","fundamentally","genuinely"];

function qualityCheckPersona(key, p) {
  const issues = [];
  ["adjectives","labels","gift_phrases","edge_phrases","mbti_resonance","childhood_friend","coworker","stranger","events","excites","good_at","struggles","irritated_by","daily_habits","under_stress","architecture","tension","therapist_advice"].forEach(f => { if (!p[f]) issues.push(`Missing: ${f}`); });
  if (Array.isArray(p.events) && p.events.length < 3) issues.push("events: need 3");
  if (Array.isArray(p.daily_habits) && p.daily_habits.length < 3) issues.push("daily_habits: need 3");
  if (Array.isArray(p.therapist_advice) && p.therapist_advice.length < 3) issues.push("therapist_advice: need 3");
  return issues;
}

function qualityCheckReading(key, t) {
  const issues = [];
  ["teaser","p1","p2","gifts","edges","landscape","twoAM"].forEach(f => { if (!t[f]) issues.push(`Missing: ${f}`); });
  if (!t.landscape?.thrives) issues.push("landscape.thrives missing");
  if (!t.landscape?.costs) issues.push("landscape.costs missing");
  if (!Array.isArray(t.gifts) || t.gifts.length !== 3) issues.push("gifts must be array of 3");
  else t.gifts.forEach((g,i) => {
    if (!g.label?.trim()) issues.push(`gifts[${i}] missing label`);
    if (!g.desc?.trim()) issues.push(`gifts[${i}] missing desc`);
    if (g.desc && !g.desc.match(/come to you|call you|bring you|they ask/i)) issues.push(`gifts[${i}] missing social proof`);
  });
  if (!Array.isArray(t.edges) || t.edges.length !== 2) issues.push("edges must be array of 2");
  else t.edges.forEach((e,i) => {
    if (!e.label?.trim()) issues.push(`edges[${i}] missing label`);
    if (!e.desc?.trim()) issues.push(`edges[${i}] missing desc`);
    if (e.desc && !e.desc.includes("Watch for")) issues.push(`edges[${i}] missing Watch for`);
  });
  const wc = s => (s||"").split(/\s+/).filter(Boolean).length;
  if (wc(t.p1) > 80) issues.push(`p1 too long`);
  if (wc(t.p2) > 70) issues.push(`p2 too long`);
  if (wc(t.teaser) > 90) issues.push(`teaser too long`);
  const tw = wc(t.twoAM);
  if (tw > 35) issues.push(`twoAM too long`);
  if (tw < 10) issues.push(`twoAM too short`);
  const allText = [t.teaser,t.p1,t.p2,t.twoAM,t.landscape?.thrives,t.landscape?.costs,...(t.gifts||[]).map(g=>`${g.label} ${g.desc}`),...(t.edges||[]).map(e=>`${e.label} ${e.desc}`)].join(" ");
  FORBIDDEN.forEach(term => { if (allText.toLowerCase().includes(term.toLowerCase())) issues.push(`Forbidden: "${term}"`); });
  return issues;
}

function qualityCheckAngle(key, a) {
  const issues = [];
  if (!a.how?.trim()) issues.push("Missing: how");
  if (!a.works?.trim()) issues.push("Missing: works");
  if (!a.deep?.trim()) issues.push("Missing: deep");
  const wc = s => (s||"").split(/\s+/).filter(Boolean).length;
  if (wc(a.how) > 80) issues.push(`how too long (${wc(a.how)} words)`);
  if (wc(a.works) > 80) issues.push(`works too long (${wc(a.works)} words)`);
  if (wc(a.deep) > 80) issues.push(`deep too long (${wc(a.deep)} words)`);
  const allText = `${a.how} ${a.works} ${a.deep}`;
  FORBIDDEN.forEach(term => { if (allText.toLowerCase().includes(term.toLowerCase())) issues.push(`Forbidden: "${term}"`); });
  return issues;
}

// ─── MERGE UTILITIES ──────────────────────────────────────────────────────────

function buildLayer1Merge(readings, personas) {
  const entries = Object.entries(readings).sort(([a],[b]) => a.localeCompare(b))
    .map(([key, t]) => {
      const combined = personas[key] ? { ...t, persona: personas[key] } : t;
      return `  "${key}": ${JSON.stringify(combined, null, 2).replace(/\n/g, "\n  ")},`;
    });
  return ["// AUTO-GENERATED — Layer 1 persona + reading templates","// Pipeline: generate-persona → retrieve-persona → generate-readings → retrieve-readings → check → merge",`// Generated: ${new Date().toISOString()} | ${entries.length} Layer 1 keys`,"export const GENERATED_TEMPLATES = {",...entries,"};"].join("\n");
}

function buildAngleMerge(angles) {
  const entries = Object.entries(angles).sort(([a],[b]) => a.localeCompare(b))
    .map(([key, a]) => `  "${key}": ${JSON.stringify(a)},`);
  return ["// AUTO-GENERATED — Layer 2/3 reading angles","// Pipeline: generate-angles → retrieve-angles → check-angles → merge-angles",`// Generated: ${new Date().toISOString()} | ${entries.length} / 50 angle keys`,"// Spread into READING_ANGLES in Elementum_Engine.jsx","export const GENERATED_ANGLES = {",...entries,"};"].join("\n");
}

// ─── MAIN ──────────────────────────────────────────────────────────────────────

async function main() {
  const [,, mode, arg2] = process.argv;
  const layer1Combos = buildLayer1Combinations();
  const angleCombos  = ANGLE_KEYS;
  console.log(`\nElementum Generation Script`);
  console.log(`Layer 1 (${layer1Combos.length} keys, ${SKIP_KEYS.size} hand-written) | Layer 2/3 (${angleCombos.length} angle keys)`);

  if (mode === "generate-persona") {
    const id = await submitBatch(layer1Combos, PERSONA_SYSTEM_PROMPT, buildPersonaPrompt, "persona");
    fs.writeFileSync("persona_batch_id.txt", id);
    console.log(`\nNext: node generate_templates_v2.js retrieve-persona ${id}`);

  } else if (mode === "retrieve-persona") {
    const id = arg2 || fs.readFileSync("persona_batch_id.txt","utf8").trim();
    await waitForBatch(id);
    const { results, failed } = await collectResults(id, qualityCheckPersona);
    fs.writeFileSync("personas.json", JSON.stringify(results, null, 2));
    console.log(`\nSaved ${Object.keys(results).length} personas → personas.json`);
    if (failed.length) console.warn(`Failed (${failed.length}):`, failed.join(", "));
    console.log(`Next: node generate_templates_v2.js generate-readings`);

  } else if (mode === "generate-readings") {
    if (!fs.existsSync("personas.json")) { console.error("personas.json not found."); process.exit(1); }
    const personas = JSON.parse(fs.readFileSync("personas.json","utf8"));
    const id = await submitBatch(layer1Combos, READING_SYSTEM_PROMPT, (c) => buildReadingPrompt(c, personas[c.key] || null), "readings");
    fs.writeFileSync("readings_batch_id.txt", id);
    console.log(`\nNext: node generate_templates_v2.js retrieve-readings ${id}`);

  } else if (mode === "retrieve-readings") {
    const id = arg2 || fs.readFileSync("readings_batch_id.txt","utf8").trim();
    await waitForBatch(id);
    const { results, failed } = await collectResults(id, qualityCheckReading);
    fs.writeFileSync("templates.json", JSON.stringify(results, null, 2));
    console.log(`\nSaved ${Object.keys(results).length} readings → templates.json`);
    if (failed.length) console.warn(`Failed (${failed.length}):`, failed.join(", "));
    console.log(`Next: node generate_templates_v2.js check`);

  } else if (mode === "check") {
    const readings = JSON.parse(fs.readFileSync("templates.json","utf8"));
    const personas = fs.existsSync("personas.json") ? JSON.parse(fs.readFileSync("personas.json","utf8")) : {};
    const issues = {}; let passR = 0, passP = 0;
    for (const [key, t] of Object.entries(readings)) {
      const ri = qualityCheckReading(key, t);
      const pi = personas[key] ? qualityCheckPersona(key, personas[key]) : [];
      if (ri.length === 0) passR++;
      if (personas[key] && pi.length === 0) passP++;
      const all = [...ri,...pi]; if (all.length) issues[key] = all;
    }
    const total = Object.keys(readings).length;
    console.log(`\nReadings: ${passR}/${total} passed | Personas: ${passP}/${Object.keys(personas).length} passed`);
    if (Object.keys(issues).length) { fs.writeFileSync("quality_issues.json", JSON.stringify(issues, null, 2)); console.log(`Issues → quality_issues.json`); }
    else console.log(`All passed. Run: merge`);

  } else if (mode === "merge") {
    const readings = JSON.parse(fs.readFileSync("templates.json","utf8"));
    const personas = fs.existsSync("personas.json") ? JSON.parse(fs.readFileSync("personas.json","utf8")) : {};
    fs.writeFileSync("generated_templates.js", buildLayer1Merge(readings, personas));
    console.log(`Layer 1 → generated_templates.js (${Object.keys(readings).length} keys)`);

  } else if (mode === "generate-angles") {
    const id = await submitBatch(angleCombos, ANGLE_SYSTEM_PROMPT, buildAnglePrompt, "angles");
    fs.writeFileSync("angles_batch_id.txt", id);
    console.log(`\nNext: node generate_templates_v2.js retrieve-angles ${id}`);

  } else if (mode === "retrieve-angles") {
    const id = arg2 || fs.readFileSync("angles_batch_id.txt","utf8").trim();
    await waitForBatch(id);
    const { results, failed } = await collectResults(id, qualityCheckAngle);
    fs.writeFileSync("angles.json", JSON.stringify(results, null, 2));
    console.log(`\nSaved ${Object.keys(results).length} angles → angles.json`);
    if (failed.length) console.warn(`Failed (${failed.length}):`, failed.join(", "));
    console.log(`Next: node generate_templates_v2.js check-angles`);

  } else if (mode === "check-angles") {
    const angles = JSON.parse(fs.readFileSync("angles.json","utf8"));
    const issues = {}; let pass = 0;
    for (const [key, a] of Object.entries(angles)) {
      const ai = qualityCheckAngle(key, a);
      if (ai.length === 0) pass++; else issues[key] = ai;
    }
    console.log(`\nAngles: ${pass}/${Object.keys(angles).length} passed (${angleCombos.length} total keys)`);
    const missing = angleCombos.filter(e => !angles[e.key]).map(e => e.key);
    if (missing.length) console.warn(`Missing (${missing.length}):`, missing.join(", "));
    if (Object.keys(issues).length) { fs.writeFileSync("angle_issues.json", JSON.stringify(issues, null, 2)); console.log(`Issues → angle_issues.json`); }
    else console.log(`All passed. Run: merge-angles`);

  } else if (mode === "merge-angles") {
    const angles = JSON.parse(fs.readFileSync("angles.json","utf8"));
    fs.writeFileSync("generated_angles.js", buildAngleMerge(angles));
    console.log(`Layer 2/3 → generated_angles.js (${Object.keys(angles).length} / ${angleCombos.length} keys)`);
    console.log(`Spread GENERATED_ANGLES into READING_ANGLES in Elementum_Engine.jsx`);

  } else {
    console.log(`\nUsage: node generate_templates_v2.js [mode]\n`);
    console.log(`PIPELINE A — Layer 1 (${buildLayer1Combinations().length} keys: stem_band_tgPattern)`);
    console.log(`  generate-persona   retrieve-persona   generate-readings   retrieve-readings   check   merge`);
    console.log(`\nPIPELINE B — Layer 2/3 (${angleCombos.length} keys: domEl_specificTenGod)`);
    console.log(`  generate-angles   retrieve-angles   check-angles   merge-angles`);
  }
}

main().catch(console.error);
