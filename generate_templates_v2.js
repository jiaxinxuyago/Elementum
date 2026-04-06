// generate_templates_v2.js
// Generates all 420 compound archetype templates for Elementum.
// Key format:  [stem]_[band]_[tgPattern]_[catalyst]   (Bible Part 3A)
//
// TWO-PASS WORKFLOW:
//   Pass 1 — Persona Cards (vivid character portrait, tiered sourcing)
//   Pass 2 — Reading Schema (distilled from persona card, elemental voice)
//
// Usage:
//   node generate_templates_v2.js generate-persona           → Pass 1 batch submit
//   node generate_templates_v2.js retrieve-persona [batchId] → collect persona cards → personas.json
//   node generate_templates_v2.js generate-readings          → Pass 2 batch (needs personas.json)
//   node generate_templates_v2.js retrieve-readings [batchId]→ collect readings → templates.json
//   node generate_templates_v2.js check                      → validate both schemas
//   node generate_templates_v2.js merge                      → merge into TEMPLATE_DB export
//
// Estimated cost:  ~$55–65 total (419 keys × ~2 passes × ~700 tokens each)
// Estimated time:  Pass 1: ~20 min | Pass 2: ~20 min

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── TAXONOMY DATA ────────────────────────────────────────────────────────────

const DAY_MASTERS = [
  { stem:"甲", element:"Wood",  polarity:"yang", archetype:"The Oak",      polarityDesc:"Yang Wood — outward, structural, initiating. The Oak grows because it cannot help growing." },
  { stem:"乙", element:"Wood",  polarity:"yin",  archetype:"The Vine",     polarityDesc:"Yin Wood — adaptive, intelligent, finding. The Vine arrives where the Oak never could." },
  { stem:"丙", element:"Fire",  polarity:"yang", archetype:"The Torch",    polarityDesc:"Yang Fire — radiating, declarative, warming everything it passes through." },
  { stem:"丁", element:"Fire",  polarity:"yin",  archetype:"The Ember",    polarityDesc:"Yin Fire — focused, precise, illuminating completely what it is pointed at." },
  { stem:"戊", element:"Earth", polarity:"yang", archetype:"The Mountain", polarityDesc:"Yang Earth — immovable, orienting, the ground others build their lives upon." },
  { stem:"己", element:"Earth", polarity:"yin",  archetype:"The Field",    polarityDesc:"Yin Earth — fertile, receptive, growing things without announcing it." },
  { stem:"庚", element:"Metal", polarity:"yang", archetype:"The Blade",    polarityDesc:"Yang Metal — precise, direct, cutting to what is real before anything else completes." },
  { stem:"辛", element:"Metal", polarity:"yin",  archetype:"The Jewel",    polarityDesc:"Yin Metal — discerning, refined, perceiving excellence the way others perceive temperature." },
  { stem:"壬", element:"Water", polarity:"yang", archetype:"The Ocean",    polarityDesc:"Yang Water — vast, deep, holding more beneath the surface than it ever shows." },
  { stem:"癸", element:"Water", polarity:"yin",  archetype:"The Rain",     polarityDesc:"Yin Water — intuitive, nourishing, sensing what is true before it is spoken." },
];

const BANDS = {
  concentrated: {
    label: "Concentrated",
    icon:  "☀",
    frame: "Core element saturates the chart — self-directed, full charge, very little counterbalance.",
    approach: "Channel & Release",
  },
  balanced: {
    label: "Balanced",
    icon:  "⚖",
    frame: "Core element in genuine equilibrium — neither overwhelming nor overwhelmed by surrounding forces.",
    approach: "Maintain & Attune",
  },
  open: {
    label: "Open",
    icon:  "☽",
    frame: "Core element depends on the right conditions — context-sensitive, receptive, operates through alignment.",
    approach: "Nourish & Amplify",
  },
};

// TG_PATTERNS — the 7-value axis encoding the Ten Gods structural relationship
// between the dominant chart element and the Day Master (Bible §3A.3).
//
// Three patterns are structurally unambiguous (pure, rooted, forging).
// Two TG pairs are split by yin/yang polarity of the dominant element:
//   flowing / expressive  — Output family (食神 Food God / 伤官 Hurting Officer)
//   tested  / pressured   — Authority family (正官 Direct Officer / 七杀 Seven Killings)
//
// The expressive and pressured templates are generated last, after their sister
// templates (flowing and tested respectively) are complete — they share the same
// structural relationship but differ in the character of expression.
const TG_PATTERNS = {
  pure: {
    label:     "Pure",
    classical: "比劫旺 — same element dominant",
    tgFamily:  "Companion",
    desc:      "The same element as the Day Master dominates the chart. No counterbalancing force, no interference. The core energy amplifies itself — more of who this person already is with nothing to moderate or redirect it. Potent and brittle in equal measure.",
    dominantForce: (dm) => `the same element as ${dm.archetype} itself — the chart is amplifying its own core without correction`,
    sisterNote: null,
  },
  rooted: {
    label:     "Rooted",
    classical: "印旺 — element that generates DM is dominant",
    tgFamily:  "Seal/Resource",
    desc:      "The element that generates and nourishes the Day Master dominates the chart. External resource, backing, support. This person draws from a deep well they didn't build themselves — institutional backing, inherited strength, or unconditional nourishment.",
    dominantForce: (dm) => `the element that generates and nourishes ${dm.archetype} — deep support they didn't build, feeding rather than challenging`,
    sisterNote: null,
  },
  flowing: {
    label:     "Flowing",
    classical: "食神旺 — Food God dominant (same polarity output)",
    tgFamily:  "Output — 食神 Food God",
    desc:      "The element the Day Master naturally produces dominates the chart, in a same-polarity expression (Food God 食神). Energy moves outward without friction — naturally generous, naturally productive. The person gives what they have because giving is structural, not willed. There is contentment in this: the output is its own reward.",
    dominantForce: (dm) => `what ${dm.archetype} naturally produces — the chart flows outward easily, expression without friction, output as natural state`,
    sisterNote: null,
  },
  expressive: {
    label:     "Expressive",
    classical: "伤官旺 — Hurting Officer dominant (opposite polarity output)",
    tgFamily:  "Output — 伤官 Hurting Officer",
    desc:      "The element the Day Master produces dominates the chart, in an opposite-polarity expression (Hurting Officer 伤官). Energy moves outward but with tension — the brilliance pushes against something, challenges structure, refuses easy containment. Where Flowing gives freely, Expressive gives with an edge. The output has a quality of assertion rather than just production.",
    dominantForce: (dm) => `what ${dm.archetype} produces under tension — the same output as Flowing but charged, pushing against the structure that tries to contain it`,
    sisterNote: "NOTE — SISTER TEMPLATE: This is the Expressive counterpart to the Flowing template for the same key. Both describe the Output TG family (DM generates the dominant element), but where Flowing describes natural, generous, frictionless outward expression (Food God 食神), Expressive describes output that carries an edge — brilliance that challenges structure, creativity that refuses easy containment (Hurting Officer 伤官). The archetype is the same person with the same catalyst. The difference is in how their expression meets the world: not freely given, but asserted.",
  },
  forging: {
    label:     "Forging",
    classical: "财旺 — element DM controls is dominant",
    tgFamily:  "Wealth",
    desc:      "The element the Day Master controls and shapes dominates the chart. The person has abundant material to work with — things to direct, shape, acquire, convert. The question is not capability but application: what gets built with what is available, and whether the person can direct enough to not be directed by it.",
    dominantForce: (dm) => `what ${dm.archetype} controls and shapes — abundant material, things to direct and convert, the question is application not capability`,
    sisterNote: null,
  },
  tested: {
    label:     "Tested",
    classical: "正官旺 — Direct Officer dominant (opposite polarity authority)",
    tgFamily:  "Authority — 正官 Direct Officer",
    desc:      "The element that disciplines the Day Master dominates the chart, in an opposite-polarity expression (Direct Officer 正官). This is structured authority — the person operates within a framework they respect, earns recognition through legitimate channels, finds their place inside an order that values them. The pressure is real but orderly: the Officer tests, but grants permission when the test is passed.",
    dominantForce: (dm) => `the element that structures and disciplines ${dm.archetype} — orderly authority that grants recognition when legitimacy is demonstrated`,
    sisterNote: null,
  },
  pressured: {
    label:     "Pressured",
    classical: "七杀旺 — Seven Killings dominant (same polarity authority)",
    tgFamily:  "Authority — 七杀 Seven Killings",
    desc:      "The element that controls the Day Master dominates the chart, in a same-polarity expression (Seven Killings 七杀). This is direct, unmediated pressure — the force does not grant permission and does not moderate itself. The person must prove themselves against a challenge that doesn't care whether they succeed. High achievement or high cost, sometimes both.",
    dominantForce: (dm) => `the element that directly challenges ${dm.archetype} — unmediated pressure that neither grants permission nor moderates itself`,
    sisterNote: "NOTE — SISTER TEMPLATE: This is the Pressured counterpart to the Tested template for the same key. Both describe the Authority TG family (dominant element controls DM), but where Tested describes structured, orderly authority that grants recognition through legitimate channels (Direct Officer 正官), Pressured describes unmediated direct pressure — a force that does not grant permission and does not soften itself (Seven Killings 七杀). The archetype is the same person with the same catalyst. The difference is whether the external force respects a framework: Tested operates within one; Pressured does not.",
  },
};

// Legacy alias — TENSIONS was the previous 5-value constant. Kept for any references.
const TENSIONS = TG_PATTERNS;

// Catalyst options per element per band — from CATALYST_MAP in engine
const CATALYST_MAP = {
  Metal: { concentrated:["Fire","Water"], balanced:["Fire","Earth"],  open:["Earth","Metal"] },
  Wood:  { concentrated:["Metal","Fire"], balanced:["Metal","Water"], open:["Water","Wood"]  },
  Water: { concentrated:["Earth","Wood"], balanced:["Earth","Metal"], open:["Metal","Water"] },
  Fire:  { concentrated:["Water","Earth"],balanced:["Water","Wood"],  open:["Wood","Fire"]   },
  Earth: { concentrated:["Wood","Metal"], balanced:["Wood","Fire"],   open:["Fire","Earth"]  },
};

// Human-readable catalyst meaning per DM element per catalyst element
const CATALYST_CONTEXT = {
  Metal: {
    Fire:  "Fire is the forge — the force that gives Metal's precision a direction and makes the edge purposeful rather than indiscriminate.",
    Water: "Water is where Metal's precision flows — the channel that converts capability into output and lets the edge produce rather than only cut.",
    Earth: "Earth is the foundation that generates Metal — supportive ground that sustains and nourishes the core rather than challenging it.",
  },
  Wood: {
    Metal: "Metal is the shaping force — it defines, prunes, and structures the growth so it consolidates into something that holds rather than simply spreads.",
    Fire:  "Fire is where Wood's energy naturally flows — it converts the growth impulse into warmth and visibility, giving the reach a destination.",
    Water: "Water is the nourishment that feeds the roots — it sustains the developmental capacity without requiring performance in return.",
    Wood:  "Wood deepens the core — more of what this chart already carries, strengthening the reach and the capacity for growth.",
  },
  Water: {
    Earth: "Earth is the container — it gives the depth a shape and allows the perceptual range to concentrate into something others can engage with.",
    Wood:  "Wood is where Water's intelligence naturally flows — it converts the depth into growing things, giving the perception somewhere to go.",
    Metal: "Metal is the source — it generates Water, renewing the depth and sustaining what the chart carries most essentially.",
    Water: "Water deepens the core — more of what this chart already carries, extending the range and capacity for depth.",
  },
  Fire: {
    Water: "Water is the tempering element — it gives Fire's warmth reflective depth and prevents the light from consuming its own source.",
    Earth: "Earth is where Fire naturally flows — it converts the warmth into something that holds and sustains, giving the radiance a productive form.",
    Wood:  "Wood is the fuel — it feeds and renews what Fire produces, sustaining the warmth without requiring it to generate from nothing.",
    Fire:  "Fire deepens the core — more of what this chart already carries, amplifying the warmth and the capacity for illumination.",
  },
  Earth: {
    Wood:  "Wood is the activating force — it introduces movement and reach, pulling the stability outward and preventing it from becoming stagnation.",
    Metal: "Metal is what Earth naturally produces — the precision and definition that convert reliability into something specifically useful.",
    Fire:  "Fire is the generating element — it warms and activates what Earth holds, ripening what has been quietly accumulating.",
    Earth: "Earth deepens the core — more of what this chart already carries, extending the capacity to hold and sustain.",
  },
};

// Keys already hand-written — skip generation for these
const SKIP_KEYS = new Set([
  "庚_concentrated_pure_Fire",
]);

// ─── COMBINATION BUILDER ──────────────────────────────────────────────────────

function buildCombinations() {
  const combos = [];
  // Generate in a specific order: pure/rooted/forging/flowing/tested first,
  // then expressive/pressured last (their sister templates will already exist
  // in the batch results, enabling quality review of the split pairs together).
  const PATTERN_ORDER = ["pure","rooted","flowing","forging","tested","expressive","pressured"];

  for (const dm of DAY_MASTERS) {
    for (const band of Object.keys(BANDS)) {
      const catalysts = CATALYST_MAP[dm.element][band];
      for (const tgPattern of PATTERN_ORDER) {
        for (const catalyst of catalysts) {
          const key = `${dm.stem}_${band}_${tgPattern}_${catalyst}`;
          if (SKIP_KEYS.has(key)) continue;
          combos.push({ key, dm, band, tgPattern, catalyst });
        }
      }
    }
  }
  return combos;
}

// ─── TIERED SOURCING DATA ─────────────────────────────────────────────────────
// Tier 1: Psychological profiles per stem + tgPattern + band (from §3A.7)
// Tier 2: Classical SOURCE-FROM principles per tgPattern (from Part C)
// Injected into each batch prompt so the model can execute the sourcing workflow.

const PSYCH_PROFILES = {
  // ── STEM PROFILES (§3A.7B) ─────────────────────────────────────────────────
  // Level 1: cognitive mechanism + attachment pattern
  stems: {
    "甲": {
      jungian:    "Extraverted Intuition (Ne) + Extraverted Thinking (Te) — generates possibilities and reaches toward them before consolidation",
      bigFive:    "High Openness/Intellect + High Assertiveness. Challenge is consolidation vs. extension — vision outruns foundations",
      mechanism:  "Forward projection as structural fact. Cannot stop reaching. Growth is the architecture, not the ambition.",
      attachment: "Secure-leaning but over-extension risk — commits deeply and then outgrows what it committed to before fully rooting",
    },
    "乙": {
      jungian:    "Introverted Intuition (Ni) — perceives the route to the destination before it can explain the reasoning. Insight arrives complete.",
      bigFive:    "High Openness + moderate-high Agreeableness (reads social surface skillfully) + moderate Introversion tendency",
      mechanism:  "Navigation before assertion. Arrives exactly where intended via paths others couldn't read. Proactive in destination, reactive in path.",
      attachment: "Secure through attunement — builds trust through consistent accuracy of perception rather than through presence alone",
    },
    "丙": {
      jungian:    "Extraverted Feeling (Fe) — shapes the emotional climate of whatever space it occupies as a property of its presence, not as performance",
      bigFive:    "High Enthusiasm (Extraversion) + High Compassion (Agreeableness) + moderate Neuroticism (accumulation cost of constant demand)",
      mechanism:  "Presence generates warmth independent of intent. Others orient toward it before deciding to. SDT relatedness need highly activated.",
      attachment: "Secure base provider — the warmth is real and consistent, but the automatic quality can feel to the person like performing",
    },
    "丁": {
      jungian:    "Introverted Feeling (Fi) — attention focused by deep inner conviction. Illuminates what it has chosen, fully and completely.",
      bigFive:    "Lower Extraversion (selective not diffuse) + High Conscientiousness in Orderliness/Responsibility facets + moderate Neuroticism potential",
      mechanism:  "Focused illumination — completely illuminates what it is pointed at, nothing more. SDT autonomy need extremely high.",
      attachment: "Deep bonding with what is chosen — the intimacy is targeted rather than diffuse; depth over breadth, always",
    },
    "戊": {
      jungian:    "Introverted Sensation (Si) at most stable expression — maintains internal framework of what works, what has proven stable",
      bigFive:    "High Conscientiousness (both facets) + Low Neuroticism (emotional stability is constitutional) + moderate Extraversion",
      mechanism:  "Psychological ground for others. Others build on it, orient by it, without naming its source. Reliability is the default state, not an effort.",
      attachment: "Secure base provider — produces psychological security without requiring constant acknowledgment. Shadow: own need for support systematically underrecognized.",
    },
    "己": {
      jungian:    "Introverted Sensation (Si) in its nourishing expression — maintains the internal conditions that allow others to grow",
      bigFive:    "High Agreeableness/Compassion + High Conscientiousness/Industriousness + lower Neuroticism (stability as care-platform)",
      mechanism:  "Developmental nourishment. Creates conditions for growth in others without announcing it. Care is the default operating mode.",
      attachment: "Caregiving behavioral system highly activated. Distress when unable to nourish; shadow: unreciprocated caregiving depletes invisibly.",
    },
    "庚": {
      jungian:    "Introverted Thinking (Ti) — internal logical framework that cannot be switched off. Runs before social consideration, before emotional processing.",
      bigFive:    "High Conscientiousness/Industriousness + Low Agreeableness/Politeness + lower Neuroticism + moderate Introversion tendency",
      mechanism:  "Evaluative by structural default. Assessment is the first cognitive event, not a mode. DeYoung Intellect: conclusion-seeking, not exploration-seeking.",
      attachment: "Dismissive-avoidant pattern — not from emotional unavailability but because care arrives through the same evaluative channel as everything else",
    },
    "辛": {
      jungian:    "Introverted Sensing (Si) refined + Introverted Feeling (Fi) for aesthetic valuation. Perceives quality the way others perceive temperature.",
      bigFive:    "High Openness/Aesthetics (DeYoung: quality/beauty-seeking vs. 庚's truth-seeking) + High Conscientiousness/Orderliness",
      mechanism:  "Perceives quality and its absence automatically. Shadow: perfectionism axis — same discernment that produces excellence can produce chronic dissatisfaction gap.",
      attachment: "High standards as relational filter — connects deeply when quality threshold is met; withdraws when it isn't, which can read as aloofness",
    },
    "壬": {
      jungian:    "Introverted Thinking (Ti) at vast scale + Introverted Intuition (Ni) — holds multiple frameworks simultaneously, aware of what is implied",
      bigFive:    "High Openness/Intellect + lower Extraversion Enthusiasm + high Industriousness facet + variable Neuroticism (depth can become withdrawal)",
      mechanism:  "Holds depth exceeding what others can see. Always knows more beneath the surface. Gap between internal awareness and external expression is chronic.",
      attachment: "Needs contexts that honor full depth — retreats from shallow exchanges rather than simplifying. SDT competence + autonomy needs extremely high.",
    },
    "癸": {
      jungian:    "Introverted Intuition (Ni) + Introverted Feeling (Fi) — perceives at depth and cares specifically. Knowing without knowing how.",
      bigFive:    "High Neuroticism/Withdrawal (perceptual sensitivity, not anxiety) + High Agreeableness/Compassion + lower Extraversion",
      mechanism:  "Senses what is true before it is spoken. Nourishes specifically rather than broadly. HSP framework: deeper processing, greater sensitivity, stronger reactivity.",
      attachment: "Anxious-preoccupied tendency — proximity to others is not emotionally neutral. Absorbs others' emotional states; quality of connection is existentially important.",
    },
  },
  // ── BAND PROFILES (§3A.7D) ──────────────────────────────────────────────────
  // Level 2: intensity and regulation
  bands: {
    concentrated: "Trait activation theory (Tett & Guterman): activates regardless of situational cues — no internal brake because there is no internal counterforce. Low integrative complexity as structural condition. More potent in its domain; more brittle at the boundaries. Same quality, no modulation.",
    balanced:     "Jung's individuation as process — dominant function integrated with opposing functions into coherent whole. SDT integrated regulation: the character directs itself rather than running as automatic process. Highest adaptive performance across diverse conditions; not peak-in-single-domain.",
    open:         "Person-environment fit theory (Holland): environment quality is categorical, not incremental — right conditions produce dramatically different results than wrong conditions. HSP framework: output attuned to contextual quality. SDT autonomy support + competence feedback most critical here. Higher range at both ends.",
  },
  // ── TGPATTERN PROFILES (§3A.7C) ─────────────────────────────────────────────
  // Level 3: structural psychological condition + shadow mechanism
  tgPatterns: {
    pure:       "Jung's Einseitigkeit: dominant function without adequate development of opposite — greatest competence AND greatest rigidity simultaneously. Markus self-schema consolidation (1977): highly consolidated self-schema → consistent identity, strong behavioral reliability → cost: reduced permeability to information challenging the schema's core. Watch for: new information arrives and first move is to find what's wrong with it.",
    rooted:     "Attachment theory's secure base provision: character has been constitutionally supported — psychological security without requiring constant acknowledgment. SDT externally supported autonomy: the well is outside, even if it feels internal. Shadow: people with secure early foundations produce disproportionate disorientation when support suddenly unavailable, because internal resources weren't forced to fully develop. Watch for: moment when backing is unavailable and the chart must operate without it.",
    flowing:    "SDT intrinsic motivation in purest form — behavior inherently interesting and enjoyable. Csikszentmihalyi flow: deep effortless engagement where challenge and skill are matched without calibration. Non-assertive; produces because that's what happens when fully self. Shadow from flow research: ease of output can become complacency preventing building of foundations the work needs. Watch for: extending into what feels natural without checking whether the ground is ready.",
    expressive: "Reactive creativity (Forster & Higgins): creativity sharpened by what it meets resistance from. SDT autonomy need under threat: high-autonomy people don't simply comply when constrained — pushback reveals character. Innovation personality research: High Openness + Low Agreeableness/Politeness + output exceeding existing framework. Shadow: same quality that creates brilliance creates damage when uncontained. Watch for: output meeting a containing structure — this is when the pattern's best and worst outcomes both become possible.",
    forging:    "McClelland's Achievement Motivation (nAch): strong orientation toward mastery, directing resources toward outcomes. SDT competence need: wellbeing deeply bound up with feeling effective, able to direct what needs directing. Distinction: Conscientiousness organizes self; forging organizes the resources around self. Shadow: high nAch depletion — the directing self loses access to the resources it has been directing. Watch for: the moment the control drive is operating without the energy to sustain it.",
    tested:     "SDT integrated regulation: earns through legitimate channels, operates within frameworks it has endorsed. Normative compliance as security rather than constraint. Secure-base-to-authority: finds external structure strengthening when genuine, constraining when not. Shadow: orientation lost when authority proves unworthy or insufficient. Watch for: the moment the framework reveals itself as inadequate — this is when the tested character loses its bearings unexpectedly.",
    pressured:  "Adversarial growth (PTG): hardiness under unmoderated pressure — what can't be broken, isn't. Research on resilience under high stress: the same conditions that refine some people damage others — outcome depends on resources available to channel the force. Shadow: can become unable to function without the pressure, or can become the pressure for others. Watch for: moment when chart's resources are insufficient to channel the force productively — the pressure that normally refines now damages.",
  },
  // ── CATALYST SDT MAPPINGS (§3A.7E) ─────────────────────────────────────────
  // Level 4: SDT basic need + substitution strategy + what changes on arrival
  catalysts: {
    Fire:  { need: "Autonomy — direction from within, meaningful purpose", substitution: "chart has developed extraordinary capability without external direction; every sense of purpose has been internally constructed — certain but unverified simultaneously", arrival: "precision becomes communicable and directable; 通明达理 — what was fixed becomes principled and reasonable" },
    Water: { need: "Competence through depth and generativity — conditions that deserve the full precision", substitution: "chart has developed acute evaluative capacity; the craving is for conditions that produce yield, not just performance", arrival: "the holding converts to growing — the ground becomes fertile rather than just present" },
    Wood:  { need: "Autonomy as generative reach — something to build toward that deserves the stability", substitution: "chart has developed reliability without developmental momentum; the stability is real but static", arrival: "the stability acquires direction — the ground starts moving toward something rather than simply holding" },
    Earth: { need: "Relatedness + Stability — grounded support beneath the strength", substitution: "chart has developed strength-under-pressure without the structural foundation that would make it sustainable", arrival: "the strength has somewhere to rest — capacity stops depleting the self that carries it" },
    Metal: { need: "Competence through precision and definition — the shaping force that makes capability specifically useful", substitution: "chart has developed broad capability without the defining force that would make it an instrument rather than raw material", arrival: "the capability becomes specific — what was diffuse becomes precise and purposefully deployed" },
  },
};

// Stem-specific classical SOURCE-FROM principles (apply across ALL tgPatterns for these stems)
// These are separate from tgPattern principles because they apply regardless of pattern.
const STEM_CLASSICAL = {
  "庚": {
    principle:   "穷通宝鉴 tiaohou for 庚金: 金逢火炼方成器 / 金逢火炼方显锋芒 (丙火为先，壬水为辅)",
    translation: "Metal meeting the tempering of Fire becomes an instrument (成器). / Metal meeting Fire reveals its sharp edge (显锋芒). Yang Fire first, Yang Water as support.",
    derivation:  "Sourcing note: principle is from 穷通宝鉴 tiaohou framework; phrasings are commentary-register formulations, not verbatim quotations. Three Tier 2 additions: (1) 素材→成器: archetype is fully formed raw material — catalyst specifies what it is an instrument for, does not add capability or complete it. Specification vs. completion is categorically different from communicability. Use in p2 and twoAM. (2) 显 (reveals): edge/capability existed before catalyst arrived — catalyst makes it manifest as something specific and purposeful. Not created, revealed. Use in teaser and landscape. (3) twoAM encoding: 'I am formed and complete and have not yet been specified toward a purpose that fully deserves this' — more precise than SDT autonomy gap alone. Maximum 3 claims. Hard ceiling.",
  },
  "辛": {
    principle:   "穷通宝鉴 tiaohou for 辛金: 金逢火炼方成器 / 金逢火炼方显锋芒 (丙火为先，壬水为辅)",
    translation: "Metal meeting the tempering of Fire becomes an instrument (成器). / Metal meeting Fire reveals its sharp edge (显锋芒). Yang Fire first, Yang Water as support.",
    derivation:  "Same tiaohou principle as 庚 but register differs — 辛 is the Jewel, not the Blade. Three Tier 2 additions with 辛-register adjustment: (1) 素材→成器: the Jewel's discernment was always real — the catalyst specifies what excellence it is for, converts latent quality-perception into a purposefully deployed standard. Not completing; specifying. Use in p2 and twoAM. (2) 显 (reveals): the capacity for perceiving genuine quality existed before the catalyst — the catalyst makes what was discerned privately undeniable as a specific and purposeful standard. Use in teaser and landscape. (3) twoAM: 'I have always known what excellence looks like — I haven't yet found what it is specifically for.' Maximum 3 claims. Hard ceiling.",
  },
  "甲": {
    principle:   "穷通宝鉴 + 三命通会 十干论: 甲木喜庚金克制，方能成材",
    translation: "甲 Wood welcomes 庚 Metal's shaping; then it becomes useful timber (成材).",
    derivation:  "Three Tier 2 additions: (1) 原木→成材: the Oak's growth is genuine and structural — the catalyst converts spreading growth into something with defined form that holds. Not initiating growth; defining what reaching consolidates into. Use in p2 relief clause. (2) Without catalyst shaping force, growth spreads rather than consolidates — reach is real; form not yet defined. Use in edge for pure/flowing 甲 keys. (3) twoAM: 'I have been growing toward something real for a long time, and I haven't yet found the force that defines what it becomes' — more precise than SDT autonomy gap alone. Maximum 3 claims. Hard ceiling.",
  },
  "戊": {
    principle:   "滴天髓 + 穷通宝鉴: 戊无水则燥 / 春土无火则寒",
    translation: "戊 without Water becomes arid (燥). / Spring Earth without Fire is cold (寒).",
    derivation:  "CATALYST-CONDITIONAL — use only the clause matching this key's catalyst. FOR WATER CATALYST: 燥 = Mountain present, solid, intact but nothing grows. Wound is generative ('is anything growing?'), not relational. twoAM: 'Everything is in order. I'm not sure anything is alive.' Relief: Water makes ground fertile, not warmer or recognized. 2 claims max. FOR FIRE CATALYST: 寒 = Mountain present but below temperature — holding without warming that converts holding into giving. Wound is activation ('who decided this was mine to hold?'). twoAM: holding-burden framing. Relief: Fire warms and activates. 2 claims max. DO NOT apply the non-matching principle.",
  },
  "壬": {
    principle:   "穷通宝鉴 + 滴天髓: 壬水奔流，无土则泄 (戊土为堤，制壬奔流)",
    translation: "壬 Water flows powerfully; without Earth it disperses (泄). Earth as embankment, controlling 壬's powerful flow.",
    derivation:  "APPLY ONLY WHEN CATALYST IS EARTH. For non-Earth catalysts, use Tier 1 only. Three Tier 2 additions: (1) 泄 = without Earth, depth disperses — intelligence real and abundant but flows in all directions without concentrating. Not shallow; unfocused. Edge: 壬 without Earth experiences 'I can't concentrate what I know into something that lands' rather than 'I feel unseen.' (2) Earth converts 泄 to 堤: relief is depth finding coherent form, not recognition. Use in p2 relief clause and landscape. (3) twoAM: 'what I know disperses before I can make it coherent enough to be useful.' Maximum 3 claims. Hard ceiling.",
  },
};


  pure: {
    principle: "滴天髓: 身旺有泄者，通明达理；无泄者固执",
    translation: "When the strong self has output channels, the person is clear-minded and reasonable; without output, they are fixed and rigid.",
    derivation: "固執 = the verdicts have settled; not actively resisting revision, simply no longer in motion — like conclusions correct long enough not to need re-examination. Sharpens Tier 1 Markus schema consolidation. Catalyst derivation: 通明達理 = catalyst makes core quality communicable and directable to others — not warmer, not more relational, specifically communicable. Real Tier 2 addition to p2 relief clause. For edge: 固執 pattern is more precise than generic 'rigidity' — the assessment settled, not actively resisted.",
  },
  rooted: {
    principle: "子平真诠: 印旺生身，乃命主之所喜 + 印多夺食",
    translation: "The dominant Resource generating the self is what the chart-holder welcomes. / Excess Resource smothers Output.",
    derivation: "Support is welcomed and genuinely received — operates from being held, not merely not-struggling. Tier 2 edge addition: the support structure that enables capability can in excess prevent independent expression of that capability (印多夺食). This is more specific than generic dependency: the very nourishment source can smother output channels.",
  },
  flowing: {
    principle: "渊海子平, 三命通会: 食神代表秀气，生活悠闲，福气深厚 + 食神过旺则泄身太过",
    translation: "Food God represents elegant Qi — leisurely life, deep blessings. / Excess Food God over-exposes the self.",
    derivation: "秀气 = elegant and non-assertive — refined rather than demonstrative. Does not produce to be seen; production is what happens when fully self. Tier 2 edge: 食神过旺则泄身太过 — the over-extension into what feels natural without checking whether the foundation is ready. When output is structurally automatic, the self producing doesn't monitor whether output is sustainable.",
  },
  expressive: {
    principle: "子平真诠: 伤官者，聪明秀气太过 + 伤官见官，为祸百端",
    translation: "Hurting Officer people are excessively brilliant and refined. / When Hurting Officer meets Officer/authority, ten thousand disasters arise.",
    derivation: "聪明秀气太过 = brilliance operates ahead of its environment — exceeds the framework available to receive it. Not willful; structural emergence. Tier 2 edge: 伤官见官，为祸百端 — output is in structural tension with any framework that tries to contain it by conventional standards. The gift and edge are the same thing in different conditions.",
  },
  forging: {
    principle: "三命通会, 渊海子平: 财为我克，为妻妾，为财帛",
    translation: "Wealth is what I control — wife, resources, tangible results.",
    derivation: "我克 (I control/overcome) = intelligence goes toward directing what can be made productive. Control and acquisition are structural orientations, not cultivated habits. Tier 2 content: the energy naturally flows toward making things work, converting potential into outcome. For edge depletion: use Tier 1 (nAch depletion) — Part C does not add a specific classical edge mechanism beyond the structural orientation.",
  },
  tested: {
    principle: "子平真诠: 正官端正，主人沉稳，名声好，规则意识强 + 官轻则贵，官重则压",
    translation: "Direct Officer upright — calm and settled, good reputation, strong sense of rules. / Light Officer ennobles; heavy Officer presses down.",
    derivation: "沉稳 + 规则意识强 = character shaped by structure it has endorsed; recognition through demonstrated quality within legitimate frameworks. Tier 2 edge addition: 官轻则贵，官重则压 — the Watch for is the moment authority becomes excessive or reveals itself as insufficient; the chart that earns through legitimate channels loses orientation when those channels fail.",
  },
  pressured: {
    principle: "滴天髓: 七杀制伏得宜，反为权贵 + 七杀为患，制者必须有力 + 任铁樵 512命例 (both highest achievers and most damaged people appear in Seven Killings charts)",
    translation: "When Seven Killings are properly channeled, they produce genuine authority and power. / When Seven Killings cause trouble, the remedy must be powerful. / Case studies: same structural condition, categorically different outcomes.",
    derivation: "制伏得宜 = requires significant internal or external resources to channel the force productively. Tier 2 bifurcation addition from case studies: same structural condition → highest achievers OR most damaged people. This is not a tendency toward difficulty — it is a genuine categorical bifurcation. The reading must not soften this to 'challenges.' Tier 2 Watch for: moment when resources are insufficient to channel the force — pressure that refines in good conditions damages in depleted ones.",
  },
};

// ─── PROMPT BUILDER ───────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are generating identity readings for Elementum, a BaZi-based spiritual guidance app for Western users with no Chinese metaphysics background.

Each reading is derived through a three-tier sourcing workflow. The reading is not invented — it is derived. Every behavioral claim must trace back to a tier.

═══ THE NORTH STAR ═══
This reading is a User Manual for a specific human engine. It recalls — not predicts, not diagnoses. It sounds like it already knows. Because structurally, it does.

The three-part user test every reading must pass:
  (a) COMPREHENSION: can they explain the core insight in their own words?
  (b) RESONANCE: do they feel seen in a way that's true but rarely named?
  (c) ACTION: can they identify one specific thing to watch for or do differently?
If only (b): rewrite.

Target voice: 60% Grounded Interpreter / 25% Compassionate Mirror / 15% Poetic Oracle.

═══ TIERED SOURCING WORKFLOW ═══

TIER 1 — PSYCHOLOGICAL FRAMEWORKS (mandatory, always):
The user prompt contains four psychological levels for this specific key.
Run all four before writing anything.
Level 1 (stem): cognitive mechanism — what is the default mode of processing?
Level 2 (band): intensity/regulation — how consistently and forcefully does it run?
Level 3 (tgPattern): structural condition — what psychological pattern shapes character?
Level 4 (catalyst): motivational gap — what has this chart been organized around seeking?
Record one behavioral claim per level. These are your foundation. Zero hallucination risk.

TIER 2 — CLASSICAL SOURCES (selective, gated):
The user prompt contains the SOURCE-FROM classical principle(s) for this tgPattern.
Run the derivation question: "What specific behavioral claim does this produce for this combination?"
If the result adds something not already in Tier 1, add it. If it only confirms Tier 1, note and move on.
CRITICAL: Only use what is explicitly labeled SOURCE-FROM. If uncertain, use Tier 1 only.
Maximum 2 additional behavioral claims from Tier 2. This is a hard ceiling.

TIER 3 — LANGUAGE FILTER (mandatory, always — runs last):
Translate Tier 1 + Tier 2 inventory into user-facing language.
Does not generate content. Selects, compresses, translates.
All language rules below apply at this stage.

═══ STEP 0 — ELEMENTAL REGISTER (do this before writing anything) ═══

METAL: precise, direct, cool. Verdict-energy. Short declaratives. No hedging.
  ✓ "The audit was already running. You didn't start it."
WOOD: reaching, restless, generative. Momentum-energy. Leans forward, ends on possibility.
  ✓ "You've been building toward something you can't quite name yet. That's not a flaw — it is the plan."
FIRE: warm, scene-setting, relational. Presence-energy. Specific rooms, specific people.
  ✓ "People feel it before you speak. The room is different when you're in it."
EARTH: weighted, patient, load-bearing. Gravity-energy. Things settle. Reader feels held.
  ✓ "You've been the ground under other people's feet for so long you forget you're standing on it."
WATER: withheld, implied, beneath the surface. Depth-energy. More held back than offered.
  ✓ "You knew before they finished the sentence. You usually do."

Cross-check: read your first sentence. Does it feel written BY this element? If not, restart.

═══ THREE-LAYER LANGUAGE MODEL ═══

Layer 1 — Clear (70% of sentences): plain, direct, psychologically readable. No compression.
  ✓ "You finish what others lose the thread of."
Layer 2 — Evocative (25%): vivid but immediately legible. One precise image.
  ✓ "People build on you without knowing they're doing it."
Layer 3 — Poetic (5%, max 2-3 per reading): high compression, high subtext. Earned, not default.
  ✓ "Everything is in order. I'm not sure anything is alive."

Every abstract claim must be followed within 2 sentences by its observable behavioral equivalent.
No sentence exceeds 40 words. After every 2 long sentences, write one short one (under 10 words).

═══ COMPOSITION ORDER ═══

Write in this order (not schema order):
1. p1 first: "On the outside: [observable behavior] / What's actually running: [mechanism]" — ≤80 words
2. p2 second: friction + catalyst as formative orientation + relief clause — ≤70 words, no imperatives
3. gifts third: 3 social identity labels + 3-4 sentences each, social proof structure required
4. edges fourth: dual cost (relational + interior) + "Watch for:" per edge
5. landscape fifth: thrives + costs, specific situations, one verb-led sentence each
6. twoAM LAST (closing anchor): 15-35 words, first person, structural collision encoded
7. teaser WRITTEN LAST, DISPLAYED FIRST: ≤90 words, behavioral observation first, screenshot-worthy

═══ CONTENT RULES ═══

1. No BaZi terminology: no Day Master, Ten Gods, 比劫, 印, 食伤, 官杀, 财, 用神, 格局, 大运, 流年, 喜用神, 忌神
2. No tgPattern names verbatim in reading text: Pure/Rooted/Flowing/Expressive/Forging/Tested/Pressured
3. No cross-template comparisons
4. Gift = Edge: every edge traces to the same quality as a gift — the gift turning under wrong conditions
5. Stem × band × tgPattern specificity: would this content apply to the pressured version of this same stem/band? If yes, rewrite.
6. Agency in edges: "Watch for:" signal per edge — specific observable moment, not generic self-monitoring
7. Social proof in gifts: at least one gift contains "People come to you when..." or equivalent
8. Dual cost per edge: relational cost AND interior cost, both named
9. Sensory anchor: at least one concrete object, habit, or behavioral specific in teaser or p1
10. Over-claiming guard: if any sentence sounds like "I know you better than you know yourself," add one softening qualifier
11. Banned words: Journey, Vibrant, Balance (noun), Deeply, Tapestry, Empowered, Authentic, Resonate, Spiritual, Energy (noun), Vibration, Destiny, Blessed, Manifest, At your core, In essence, Fundamentally, Truly, Genuinely

═══ OUTPUT FORMAT ═══

Return ONLY valid JSON, no markdown fences, no preamble:
{
  "teaser": "≤90 words. Behavioral observation first, interior reality second. Screenshot-worthy. Written in elemental register.",
  "p1": "≤80 words. Front-end vs. back-end contrast. 'On the outside... What's actually running...' One sensory/behavioral anchor.",
  "p2": "≤70 words. Organizing friction + catalyst as formative orientation + what relief feels like. No imperatives.",
  "gifts": [
    {"label": "Social identity title (not a virtue label)", "desc": "3-4 sentences. Observable activation, external consequence, social proof ('People come to you when...'). One sentence the user can say 'yes, that happened to me.'"},
    {"label": "Social identity title", "desc": "3-4 sentences."},
    {"label": "Social identity title", "desc": "3-4 sentences. Include what others say about this person when not in the room."}
  ],
  "edges": [
    {"label": "Pattern name (not a flaw label)", "desc": "Pattern named plainly. What it costs others: [relational cost]. What it costs you: [interior cost]. Watch for: [specific observable moment]."},
    {"label": "Pattern name", "desc": "Same structure."}
  ],
  "landscape": {
    "thrives": "2-3 sentences. Specific situation. One sentence beginning with a verb.",
    "costs": "2-3 sentences. Specific situation. Names what gets consumed without return."
  },
  "twoAM": "One sentence, 15-35 words. First person. Structural collision encoded. Closing anchor. Uncomfortably specific."
}

═══ QUALITY GATES — run before submitting ═══

1. CALLED-OUT: would the reader feel slightly exposed — seen in a way that's true but rarely named?
2. FORWARD TEST: would they send this to someone saying "this is you"?
3. EXPLAIN-BACK: can they explain the core insight in their own words?
4. BEHAVIORAL TRANSLATION: every abstract claim has an observable equivalent within 2 sentences
5. DUAL COST + WATCH FOR: both costs named per edge; Watch for present per edge
6. twoAM POSITION: twoAM is last — closing anchor, not mid-reading
7. LAYER RATIO: majority of sentences are Layer 1 (clear); poetic moments are earned
8. AGENCY: at least one edge implies the user can work with the pattern consciously
9. BANNED WORDS: none of the banned words appear anywhere
10. SPECIFICITY: no sentence could apply to 40% of people unmodified`;

function buildPrompt(combo) {
  const { dm, band, tgPattern, catalyst } = combo;
  const bandData       = BANDS[band];
  const tgData         = TG_PATTERNS[tgPattern];
  const catalystCtx    = CATALYST_CONTEXT[dm.element]?.[catalyst] || `${catalyst} is the key element this chart needs.`;
  const psychStem      = PSYCH_PROFILES.stems[dm.stem];
  const psychBand      = PSYCH_PROFILES.bands[band];
  const psychTgPattern = PSYCH_PROFILES.tgPatterns[tgPattern];
  const psychCatalyst  = PSYCH_PROFILES.catalysts[catalyst];
  const classical      = CLASSICAL_SOURCES[tgPattern];

  // Sister-template context for expressive and pressured
  const sisterContext = tgData.sisterNote ? `\n${tgData.sisterNote}\n` : "";

  // Conditional stem-specific SOURCE-FROM injection from STEM_CLASSICAL
  const stemData = STEM_CLASSICAL[dm.stem];

  const metalStemBlock = (dm.element === "Metal" && stemData)
    ? `\nMETAL-STEM SOURCE-FROM (applies because stem is ${dm.stem}):
Classical principle: ${stemData.principle}
Translation:         ${stemData.translation}
Derivation guidance: ${stemData.derivation}`
    : "";

  const yangWoodStemBlock = (dm.stem === "甲" && stemData)
    ? `\nYANG WOOD STEM SOURCE-FROM (applies because stem is 甲):
Classical principle: ${stemData.principle}
Translation:         ${stemData.translation}
Derivation guidance: ${stemData.derivation}`
    : "";

  const yangEarthStemBlock = (dm.stem === "戊" && stemData)
    ? `\nYANG EARTH STEM SOURCE-FROM (applies because stem is 戊 — use only the clause matching catalyst: ${catalyst}):
Classical principle: ${stemData.principle}
Translation:         ${stemData.translation}
Derivation guidance: ${stemData.derivation}`
    : "";

  const yangWaterStemBlock = (dm.stem === "壬" && catalyst === "Earth" && stemData)
    ? `\nYANG WATER STEM SOURCE-FROM (applies because stem is 壬 AND catalyst is Earth):
Classical principle: ${stemData.principle}
Translation:         ${stemData.translation}
Derivation guidance: ${stemData.derivation}`
    : "";

  const stemSpecificBlocks = [metalStemBlock, yangWoodStemBlock, yangEarthStemBlock, yangWaterStemBlock]
    .filter(Boolean).join("\n");

  return `Generate the reading for: ${dm.stem}_${band}_${tgPattern}_${catalyst}
${sisterContext}
═══ STEP 1: ARCHETYPE DECODE ═══
Stem:      ${dm.stem} — ${dm.archetype} | ${dm.polarityDesc}
Band:      ${bandData.label} (${bandData.icon}) — ${bandData.frame}
tgPattern: ${tgData.label} [${tgData.tgFamily}] — ${tgData.classical}
           Dominant force: ${tgData.dominantForce(dm)}
Catalyst:  ${catalyst} — ${catalystCtx}

═══ STEP 2: TIER 1 PSYCHOLOGICAL SOURCING (§3A.7) ═══

LEVEL 1 — STEM COGNITIVE MECHANISM:
  Jungian analog:  ${psychStem.jungian}
  Big Five:        ${psychStem.bigFive}
  Core mechanism:  ${psychStem.mechanism}
  Attachment:      ${psychStem.attachment}

LEVEL 2 — BAND INTENSITY/REGULATION:
  ${psychBand}

LEVEL 3 — TGPATTERN STRUCTURAL CONDITION + SHADOW:
  ${psychTgPattern}

LEVEL 4 — CATALYST SDT GAP + SUBSTITUTION STRATEGY:
  SDT need:          ${psychCatalyst.need}
  Substitution built: ${psychCatalyst.substitution}
  What arrival does:  ${psychCatalyst.arrival}

Run all four levels internally. Record one behavioral claim per level before proceeding.

═══ STEP 3: TIER 2 CLASSICAL SOURCING (SOURCE-FROM only) ═══

Universal principle: ${classical.principle}
Translation:         ${classical.translation}
Derivation guidance: ${classical.derivation}
${stemSpecificBlocks}
CRITICAL: Only use what the derivation guidance explicitly supports. Universal principle: maximum 2 additional behavioral claims. Each stem-specific principle: maximum 3 claims (enforced hard ceiling). If stem-specific principle does not apply to this key's stem, ignore it entirely. If Tier 1 already covers what a principle produces, note confirmation and move on — do not duplicate.

═══ STEP 4: SYNTHESIZE → STEP 5: APPLY LANGUAGE FILTER ═══

Build your behavioral inventory from Tiers 1 and 2, then translate through the language filter in the system prompt.

Write the reading now. Return only valid JSON.`;
}

// ─── PERSONA SYSTEM PROMPT ───────────────────────────────────────────────────
// v2.0 — Adds Four-Level Integration Model and Mandatory Portrait Pre-Write
// before specificity rules. Caps therapist_advice at 3 items.

const PERSONA_SYSTEM_PROMPT = `You are building a vivid, specific portrait of a real person who lives with this BaZi structural combination. This is not a personality summary. It is a character study specific enough that the person reading it will recognize specific moments from their own life — not just traits, but scenes, habits, reactions, the precise shape of their inner world.

The persona card is the creative source document. The reading schema is later derived from it. Your job here is to produce a living human portrait — not to compress structural analysis into prose.

═══ THE FOUR-LEVEL INTEGRATION MODEL ═══

The four sourcing levels you will receive are not separate inputs to be combined. They are four angles on the same person. Think of someone you know well — you don't know them as a list of their traits. You know them as a whole, and the traits emerge from that whole. Your job is to find the whole person first, then let the fields emerge from that person.

What each level describes:

  LEVEL 1 — THE ENGINE
  How this person processes reality. The cognitive mechanism that runs by default,
  whether they're aware of it or not. Not what they do — what they ARE.

  LEVEL 2 — THE VOLUME
  How intensely the engine runs. Concentrated = full throttle, minimal counterbalance.
  Balanced = regulated, responsive. Open = depends on conditions. Band sets the
  amplitude at which everything else operates.

  LEVEL 3 — THE CONDITION
  The structural force the engine operates under. This is the dramatic fact of this
  person's character: whether their energy amplifies itself (pure), is nourished from
  outside (rooted), shapes what it encounters (forging), generates outward
  (flowing/expressive), or operates under a force bearing down on it (tested/pressured).
  This determines the structural drama of their life.

  LEVEL 4 — THE ORIENTATION
  What the engine has been pointed toward. The formative gap. What this person has
  been building toward — possibly without a name for it — whose arrival would change
  the register of everything else they do.

A person is not the sum of these levels. A person is what happens when this engine
runs at this volume under this condition while oriented toward this thing it hasn't
fully reached.

WHERE LEVELS CONVERGE: consistent, legible traits — use these to anchor the portrait
so the reader feels immediate recognition.

WHERE LEVELS DIVERGE: dimensional traits — where the engine meets its condition and
creates friction, surprise, or inner contradiction. These conflicts are not problems
to resolve. They are the source of depth. The most specific persona cards are built
around the productive tensions between levels, not the points of easy agreement.

A coherent portrait doesn't iron out the contradictions. It shows how a real person
lives with them. Consistency is a list. Coherence is a person.

═══ MANDATORY PORTRAIT PRE-WRITE (internal — never in output) ═══

Before writing a single JSON field, write a private portrait of this person in
5–8 sentences. Write it in the voice of an intimate observer — someone who has
known this person long enough to see past the surface. Not analytically: the way
a close friend would describe them, or the way a good novelist would place them
in a room.

The portrait must weave together four things — not as a list, but as a whole:

  1. What makes this person immediately recognizable — the signal a room picks up
     before anything is said. This emerges from the intersection of Level 1 (the
     engine's default output) and Level 2 (how intensely it runs).

  2. The thing they do that confuses people who don't understand their architecture
     — the behavior that makes sense from the inside but puzzles observers. This
     emerges from the gap between Level 3 (what the condition produces) and how
     Level 1 processes it. This confusion is the most recognizable thing — because
     the user reading it will have been confused this way before.

  3. What they're reaching toward without a name for it — in plain human language,
     not structural language. What it feels like from the inside to not quite have
     arrived at the thing they've been building toward. This is Level 4 in lived
     experience, not concept.

  4. The quality that is simultaneously their greatest gift and their greatest cost
     — the single thing that makes them exceptional and makes them hard to live with
     or be. Not an edge. The core paradox: the same thing, two faces. This must
     emerge from the level tensions — not be stated abstractly.

COHERENCE TEST — before proceeding to field generation, ask:
  — Is this one person, or a collection of traits?
  — Would someone who knows this person recognize them from this description
    without any structural labels?
  — Does the portrait hold together at the points where the levels conflict —
    not by resolving the conflict, but by showing a person who lives with it?

If the portrait fails any of these tests: don't adjust individual sentences.
Return to the level conflicts. Find the most productive tension. Rebuild the
portrait around it.

FIELD GENERATION RULE: Every field must be derivable from your portrait — from
the person you just described — not directly from the structural levels. If a
field conflicts with your portrait, trust the portrait. The levels are inputs.
The portrait is your working model. The fields are evidence of the portrait.

═══ SPECIFICITY RULES ═══

EVENTS — three specific scenes:
A situation + a specific choice + a specific outcome. The protagonist must behave
in a way that would be implausible for most people but inevitable for this archetype.
  ✗ "They once stayed up late to finish something because their standards were high."
  ✓ "They rewrote the entire framework at 2 AM the night before the presentation —
     not from anxiety, but because they'd known for a week that something was
     structurally wrong and they couldn't present something they didn't fully believe in."

DAILY HABITS — observable behaviors only:
What you could watch a person doing. Should produce "oh my god I do that."
  ✗ "They tend to reflect deeply before making decisions."
  ✓ "Opens their laptop before anything social happens. The first fifteen minutes are
     private — assessment runs, the day orients. Interrupting this is experienced as
     a disruption even by people they like."

THERAPIST ADVICE — specific enough to act on this week:
  ✗ "Work on communicating your feelings more openly."
  ✓ "The next time someone comes to you in distress, try waiting a full two minutes
     before moving toward a solution. Notice what happens when you stay in the
     problem with them instead of solving it."

ANTI-GENERICITY: Before writing each field, ask: could this apply to a different
tgPattern or catalyst for the same stem? If yes, rewrite until it couldn't.

═══ OUTPUT FORMAT ═══

Return ONLY valid JSON, no markdown fences, no preamble.
Do not include the portrait pre-write in your output.

{
  "adjectives": ["word1","word2","word3","word4","word5","word6"],
  "labels": ["The one who X","The person who Y","The X that Z","label4","label5"],
  "gift_phrases": ["<=3 words","<=3 words","<=3 words"],
  "edge_phrases": ["<=3 words","<=3 words","<=3 words"],
  "mbti_resonance": ["XXXX","XXXX","XXXX"],
  "childhood_friend": "3-5 sentences. Unguarded, long familiarity.",
  "coworker": "3-5 sentences. Professional context. The gap between what they intend and how they land.",
  "stranger": "2-3 sentences. First five minutes only.",
  "events": ["Scene 1: specific situation, choice, outcome.","Scene 2.","Scene 3."],
  "excites": "2-3 sentences. What genuinely lights them up.",
  "good_at": "2-3 sentences. What they are structurally excellent at.",
  "struggles": "2-3 sentences. Specific behavioral friction.",
  "irritated_by": "2-3 sentences. What specifically grates and why.",
  "daily_habits": ["Observable habit 1.","Observable habit 2.","Observable habit 3."],
  "under_stress": "2-3 sentences. Exactly what the architecture does under pressure.",
  "architecture": "3-5 sentences. How they are wired — plain language, third person, no jargon.",
  "tension": "1-3 sentences. The single unresolved thing they carry.",
  "therapist_advice": ["Specific behavioral experiment 1.","Advice 2.","Advice 3."]
}`;

// ─── PERSONA PROMPT BUILDER ──────────────────────────────────────────────────

function buildPersonaPrompt(combo) {
  const { dm, band, tgPattern, catalyst } = combo;
  const bandData       = BANDS[band];
  const tgData         = TG_PATTERNS[tgPattern];
  const catalystCtx    = CATALYST_CONTEXT[dm.element]?.[catalyst] || `${catalyst} is the key element this chart needs.`;
  const psychStem      = PSYCH_PROFILES.stems[dm.stem];
  const psychBand      = PSYCH_PROFILES.bands[band];
  const psychTgPattern = PSYCH_PROFILES.tgPatterns[tgPattern];
  const psychCatalyst  = PSYCH_PROFILES.catalysts[catalyst];
  const classical      = CLASSICAL_SOURCES[tgPattern];
  const stemData       = STEM_CLASSICAL[dm.stem];
  const sisterContext  = tgData.sisterNote ? `\n${tgData.sisterNote}\n` : "";

  const stemBlock = stemData
    ? `\nSTEM SOURCE-FROM (${dm.stem}):\n${stemData.principle}\n${stemData.translation}\n${stemData.derivation}`
    : "";

  return `Generate the persona card for: ${dm.stem}_${band}_${tgPattern}_${catalyst}
${sisterContext}
ARCHETYPE IDENTITY:
  Stem:     ${dm.stem} — ${dm.archetype} | ${dm.polarityDesc}
  Band:     ${bandData.label} (${bandData.icon}) — ${bandData.frame}
  Pattern:  ${tgData.label} [${tgData.tgFamily}] — Dominant force: ${tgData.dominantForce(dm)}
  Catalyst: ${catalyst} — ${catalystCtx}

═══ STEP 1: WRITE YOUR PORTRAIT PRE-WRITE (internal — do not include in output) ═══
Using the sourcing data below as raw material, write your private 5–8 sentence
portrait before generating any field. The portrait is your working model.
Find the whole person first — especially the productive conflict between levels.
The data is source material, not a sequence to process.

═══ SOURCING DATA (reference for your portrait and fields) ═══

TIER 1 PSYCHOLOGICAL:
  Level 1 (stem):     ${psychStem.mechanism} | Attachment: ${psychStem.attachment}
  Level 2 (band):     ${psychBand}
  Level 3 (tgPattern): ${psychTgPattern}
  Level 4 (catalyst): ${psychCatalyst.need} | Substitution: ${psychCatalyst.substitution} | Arrival: ${psychCatalyst.arrival}

TIER 2 CLASSICAL:
  Universal: ${classical.principle} — ${classical.derivation}${stemBlock}

═══ STEP 2: GENERATE ALL FIELDS FROM YOUR PORTRAIT ═══
Once your portrait is coherent and passes the three-question test, generate
all JSON fields from it — not from the sourcing data directly.
Return only valid JSON.`;
}

// ─── READING PROMPT BUILDER (Pass 2) ─────────────────────────────────────────

function buildReadingPrompt(combo, persona) {
  const { dm, band, tgPattern, catalyst } = combo;
  const bandData       = BANDS[band];
  const tgData         = TG_PATTERNS[tgPattern];
  const sisterContext  = tgData.sisterNote ? `\n${tgData.sisterNote}\n` : "";

  const personaBlock = persona
    ? `\n═══ PERSONA CARD (derive the reading from this portrait) ═══\n${JSON.stringify(persona, null, 2)}\n`
    : "\n(No persona card available — derive from sourcing context only)\n";

  return `Generate the reading schema for: ${dm.stem}_${band}_${tgPattern}_${catalyst}
${sisterContext}${personaBlock}
ARCHETYPE: ${dm.stem} — ${dm.archetype} | ${dm.polarityDesc}
ELEMENTAL REGISTER: ${dm.element} — voice this reading in the ${dm.element} elemental register.

INSTRUCTION: The persona card above is the sole source. The sourcing data that
produced this portrait is not present here — it did its job in Pass 1. Your job
in Pass 2 is selection, compression, and voicing. Do not derive content from
structural logic. Derive it from the person in the portrait.

Derivation map:
  teaser  ← events[0] + stranger + tension (<=90 words)
  p1      ← coworker + architecture, front-end/back-end contrast (<=80 words)
  p2      ← tension + catalyst relief clause (<=70 words, no imperatives)
  gifts   ← labels + events as behavioral evidence + daily_habits anchors
  edges   ← struggles + under_stress + therapist_advice behavioral patterns
  landscape ← excites + irritated_by environments
  twoAM   ← tension → first person, structural collision, closing anchor (15-35 words)

Write the reading now. Return only valid JSON.`;
}

// ─── BATCH SUBMIT ────────────────────────────────────────────────────────────

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
  console.log(`Submitting ${label} batch...`);
  const batch = await anthropic.messages.batches.create({ requests });
  console.log(`\nBatch submitted: ${batch.id} | Status: ${batch.processing_status}`);
  return batch.id;
}

async function waitForBatch(batchId) {
  console.log(`\nPolling batch ${batchId}...`);
  let attempts = 0;
  while (true) {
    const batch = await anthropic.messages.batches.retrieve(batchId);
    const { processing_status, request_counts } = batch;
    const { succeeded=0, errored=0, processing=0 } = request_counts || {};
    process.stdout.write(`\r  Status: ${processing_status} — ${succeeded} done, ${errored} errors, ${processing} processing`);
    if (processing_status === "ended") {
      console.log(`\nBatch complete. ${succeeded} succeeded, ${errored} failed.`);
      return batch;
    }
    await new Promise(r => setTimeout(r, 30000));
    attempts++;
    if (attempts > 80) { console.error("\nTimeout. Run retrieve manually."); process.exit(1); }
  }
}

async function collectResults(batchId, requiredFields, arrayChecks = []) {
  const results = {};
  const failed  = [];
  for await (const result of await anthropic.messages.batches.results(batchId)) {
    if (result.result.type === "succeeded") {
      try {
        const text   = result.result.message.content.map(b => b.text || "").join("");
        const clean  = text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(clean);
        const missing = requiredFields.filter(f => !parsed[f]);
        if (missing.length) throw new Error(`Missing: ${missing.join(", ")}`);
        for (const [field, len] of arrayChecks) {
          if (!Array.isArray(parsed[field]) || parsed[field].length < len)
            throw new Error(`${field} must be array of >=\${len}`);
        }
        results[result.custom_id] = parsed;
      } catch (e) {
        console.warn(`\nFailed ${result.custom_id}: ${e.message}`);
        failed.push(result.custom_id);
      }
    } else {
      failed.push(result.custom_id);
      console.warn(`\nFailed: ${result.custom_id}`);
    }
  }
  return { results, failed };
}

// ─── QUALITY CHECKERS ────────────────────────────────────────────────────────

const FORBIDDEN_JARGON = [
  "Day Master","Ten Gods","Food God","Seven Killings","Hurt Officer",
  "Direct Officer","Parallel Self","Rob Wealth","Indirect Seal",
  "Direct Seal","Indirect Wealth","Direct Wealth",
  "官杀","食神","伤官","正官","七杀","比肩","劫财","偏印","正印",
  "日主","格局","大运","流年","喜用神","忌神","调候",
  " Pure "," Rooted "," Flowing "," Expressive "," Forging "," Tested "," Pressured ",
  "the universe","cosmic","destiny","fate","zodiac",
  "journey","vibrant","tapestry","empowered","manifest","spiritual",
  "at your core","in essence","fundamentally","genuinely",
];

function qualityCheckReading(key, template) {
  const issues = [];
  const required = ["teaser","p1","p2","gifts","edges","landscape","twoAM"];
  for (const f of required) { if (!template[f]) issues.push(`Missing: ${f}`); }
  if (!template.landscape?.thrives) issues.push("landscape.thrives missing");
  if (!template.landscape?.costs)   issues.push("landscape.costs missing");
  if (!Array.isArray(template.gifts) || template.gifts.length !== 3) issues.push("gifts must be array of 3");
  else template.gifts.forEach((g,i) => {
    if (!g.label?.trim()) issues.push(`gifts[${i}] missing label`);
    if (!g.desc?.trim())  issues.push(`gifts[${i}] missing desc`);
  });
  if (!Array.isArray(template.edges) || template.edges.length !== 2) issues.push("edges must be array of 2");
  else template.edges.forEach((e,i) => {
    if (!e.label?.trim()) issues.push(`edges[${i}] missing label`);
    if (!e.desc?.trim())  issues.push(`edges[${i}] missing desc`);
    if (e.desc && !e.desc.includes("Watch for")) issues.push(`edges[${i}] missing Watch for`);
  });
  const wc = s => (s||"").split(/\s+/).filter(Boolean).length;
  if (wc(template.p1) > 80)     issues.push(`p1 too long (${wc(template.p1)} words)`);
  if (wc(template.p2) > 70)     issues.push(`p2 too long (${wc(template.p2)} words)`);
  if (wc(template.teaser) > 90) issues.push(`teaser too long (${wc(template.teaser)} words)`);
  const tw = wc(template.twoAM);
  if (tw > 35) issues.push(`twoAM too long (${tw} words)`);
  if (tw < 10) issues.push(`twoAM too short (${tw} words)`);
  const giftsText = (template.gifts||[]).map(g => g.desc||"").join(" ");
  if (!giftsText.match(/people come to you|come to you when|they call you|people bring you/i))
    issues.push("gifts missing social proof");
  const allText = [template.teaser,template.p1,template.p2,template.twoAM,
    template.landscape?.thrives,template.landscape?.costs,
    ...(template.gifts||[]).map(g=>`${g.label} ${g.desc}`),
    ...(template.edges||[]).map(e=>`${e.label} ${e.desc}`)].join(" ");
  for (const term of FORBIDDEN_JARGON)
    if (allText.toLowerCase().includes(term.toLowerCase()))
      issues.push(`Forbidden: "${term}"`);
  return issues;
}

function qualityCheckPersona(key, persona) {
  const issues = [];
  const required = ["adjectives","labels","gift_phrases","edge_phrases","mbti_resonance",
    "childhood_friend","coworker","stranger","events","excites","good_at",
    "struggles","irritated_by","daily_habits","under_stress","architecture",
    "tension","therapist_advice"];
  for (const f of required) { if (!persona[f]) issues.push(`persona missing: ${f}`); }
  if (Array.isArray(persona.events) && persona.events.length < 3)
    issues.push(`persona.events: ${persona.events.length} (need 3)`);
  if (Array.isArray(persona.daily_habits) && persona.daily_habits.length < 3)
    issues.push(`persona.daily_habits: ${persona.daily_habits.length} (need 3)`);
  if (Array.isArray(persona.therapist_advice) && persona.therapist_advice.length < 3)
    issues.push(`persona.therapist_advice: ${persona.therapist_advice.length} (need 3)`);
  return issues;
}

// ─── MERGE UTILITY ────────────────────────────────────────────────────────────

function buildMergeOutput(readings, personas) {
  const entries = Object.entries(readings)
    .sort(([a],[b]) => a.localeCompare(b))
    .map(([key, t]) => {
      const combined = personas[key] ? { ...t, persona: personas[key] } : t;
      return `  "${key}": ${JSON.stringify(combined, null, 2).replace(/\n/g, "\n  ")},`;
    });
  return [
    "// AUTO-GENERATED — DO NOT EDIT MANUALLY",
    "// Two-pass: generate-persona → retrieve-persona → generate-readings → retrieve-readings → check → merge",
    `// Generated: ${new Date().toISOString()} | ${entries.length} templates`,
    "export const GENERATED_TEMPLATES = {",
    ...entries,
    "};",
  ].join("\n");
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  const [,, mode, arg2] = process.argv;
  const combos = buildCombinations();
  console.log(`Compound archetype taxonomy: ${combos.length} keys (${SKIP_KEYS.size} hand-written | 420 total | two-pass)`);

  if (mode === "generate-persona") {
    const batchId = await submitBatch(combos, PERSONA_SYSTEM_PROMPT, buildPersonaPrompt, "persona");
    fs.writeFileSync("persona_batch_id.txt", batchId);
    console.log(`\nRun next: node generate_templates_v2.js retrieve-persona ${batchId}`);

  } else if (mode === "retrieve-persona") {
    const batchId = arg2 || fs.readFileSync("persona_batch_id.txt","utf8").trim();
    await waitForBatch(batchId);
    const { results, failed } = await collectResults(batchId,
      ["adjectives","labels","events","architecture","tension","therapist_advice"],
      [["events",3],["daily_habits",3],["therapist_advice",3]]);
    console.log(`\nCollected ${Object.keys(results).length} persona cards`);
    if (failed.length) console.log(`Failed (${failed.length}):`, failed);
    fs.writeFileSync("personas.json", JSON.stringify(results, null, 2));
    console.log(`Saved → personas.json (${(fs.statSync("personas.json").size/1024).toFixed(1)} KB)`);
    console.log(`\nRun next: node generate_templates_v2.js generate-readings`);

  } else if (mode === "generate-readings") {
    if (!fs.existsSync("personas.json")) { console.error("personas.json not found. Run retrieve-persona first."); process.exit(1); }
    const personas = JSON.parse(fs.readFileSync("personas.json","utf8"));
    const missing = combos.filter(c => !personas[c.key]);
    if (missing.length) console.warn(`Warning: ${missing.length} keys missing persona cards`);
    const batchId = await submitBatch(combos, SYSTEM_PROMPT,
      (combo) => buildReadingPrompt(combo, personas[combo.key] || null), "readings");
    fs.writeFileSync("readings_batch_id.txt", batchId);
    console.log(`\nRun next: node generate_templates_v2.js retrieve-readings ${batchId}`);

  } else if (mode === "retrieve-readings") {
    const batchId = arg2 || fs.readFileSync("readings_batch_id.txt","utf8").trim();
    await waitForBatch(batchId);
    const { results, failed } = await collectResults(batchId,
      ["teaser","p1","p2","gifts","edges","twoAM","landscape"],
      [["gifts",3],["edges",2]]);
    console.log(`\nCollected ${Object.keys(results).length} readings`);
    if (failed.length) console.log(`Failed (${failed.length}):`, failed);
    fs.writeFileSync("templates.json", JSON.stringify(results, null, 2));
    console.log(`Saved → templates.json (${(fs.statSync("templates.json").size/1024).toFixed(1)} KB)`);
    console.log(`\nRun next: node generate_templates_v2.js check`);

  } else if (mode === "check") {
    if (!fs.existsSync("templates.json")) { console.error("templates.json not found."); process.exit(1); }
    const readings = JSON.parse(fs.readFileSync("templates.json","utf8"));
    const personas = fs.existsSync("personas.json") ? JSON.parse(fs.readFileSync("personas.json","utf8")) : {};
    const issues = {};
    let passR = 0, passP = 0;
    for (const [key, t] of Object.entries(readings)) {
      const ri = qualityCheckReading(key, t);
      const pi = personas[key] ? qualityCheckPersona(key, personas[key]) : ["No persona card"];
      if (ri.length === 0) passR++;
      if (personas[key] && pi.length === 0) passP++;
      const combined = [...ri, ...pi];
      if (combined.length) issues[key] = combined;
    }
    const total = Object.keys(readings).length;
    console.log(`\nReading quality: ${passR}/${total} passed`);
    if (Object.keys(personas).length) console.log(`Persona quality: ${passP}/${total} passed`);
    if (Object.keys(issues).length) {
      console.log(`\nFirst 5 issues:`);
      Object.entries(issues).slice(0,5).forEach(([key,list]) => {
        console.log(`  ${key}:`);
        list.forEach(i => console.log(`    — ${i}`));
      });
      fs.writeFileSync("quality_issues.json", JSON.stringify(issues, null, 2));
      console.log(`Full issues → quality_issues.json`);
    } else {
      console.log(`All passed. Run: node generate_templates_v2.js merge`);
    }

  } else if (mode === "merge") {
    if (!fs.existsSync("templates.json")) { console.error("templates.json not found."); process.exit(1); }
    const readings = JSON.parse(fs.readFileSync("templates.json","utf8"));
    const personas = fs.existsSync("personas.json") ? JSON.parse(fs.readFileSync("personas.json","utf8")) : {};
    const output = buildMergeOutput(readings, personas);
    fs.writeFileSync("generated_templates.js", output);
    console.log(`Merge complete → generated_templates.js`);
    console.log(`Import into Elementum_Engine.jsx and spread into TEMPLATE_DB.`);

  } else {
    console.log("Usage: node generate_templates_v2.js [generate-persona|retrieve-persona|generate-readings|retrieve-readings|check|merge] [batchId]");
  }
}

main().catch(console.error);
