// generate_templates.js
// Run once before launch: node generate_templates.js
// Cost: ~$6 total. Time: ~10-20 minutes for batch processing.
// Output: templates.json — the complete template database

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── COMBINATION SPACE ────────────────────────────────────────────────────────

const DAY_MASTERS = [
  { stem:"甲", element:"Wood",  polarity:"yang", archetype:"The Oak"      },
  { stem:"乙", element:"Wood",  polarity:"yin",  archetype:"The Vine"     },
  { stem:"丙", element:"Fire",  polarity:"yang", archetype:"The Sun"      },
  { stem:"丁", element:"Fire",  polarity:"yin",  archetype:"The Candle"   },
  { stem:"戊", element:"Earth", polarity:"yang", archetype:"The Mountain" },
  { stem:"己", element:"Earth", polarity:"yin",  archetype:"The Field"    },
  { stem:"庚", element:"Metal", polarity:"yang", archetype:"The Blade"    },
  { stem:"辛", element:"Metal", polarity:"yin",  archetype:"The Jewel"    },
  { stem:"壬", element:"Water", polarity:"yang", archetype:"The Ocean"    },
  { stem:"癸", element:"Water", polarity:"yin",  archetype:"The Rain"     },
];

const STRENGTHS = [
  "extremely_weak",
  "weak",
  "moderate",
  "strong",
  "extremely_strong",
];

// 16 meaningful missing element combinations (covers 99% of real charts)
const MISSING_COMBOS = [
  [],                                    // nothing missing
  ["Fire"],                              // single missing
  ["Metal"],
  ["Wood"],
  ["Water"],
  ["Earth"],
  ["Fire", "Wood"],                      // two missing — most common pairs
  ["Fire", "Water"],
  ["Fire", "Earth"],
  ["Metal", "Wood"],
  ["Metal", "Water"],
  ["Wood", "Water"],
  ["Fire", "Metal", "Wood"],             // three missing — most common triads
  ["Fire", "Metal", "Water"],
  ["Fire", "Wood", "Water"],
  ["Metal", "Wood", "Water"],
];

const PATTERNS = [
  { key:"output_to_wealth",    label:"Creativity generates wealth directly"       },
  { key:"institutional",       label:"Success through structured authority"       },
  { key:"pressure_to_success", label:"Adversity and pressure are the catalyst"    },
  { key:"entrepreneurial",     label:"Building with your name genuinely on it"    },
  { key:"steady_wealth",       label:"Reliable accumulation over time"            },
  { key:"knowledge_depth",     label:"Deep expertise as the differentiator"       },
  { key:"competitive",         label:"Peers and competition sharpen the edge"     },
  { key:"balanced",            label:"Harmony and adaptability across contexts"   },
];

// Skip statistically impossible combos:
// A Day Master element cannot dominate AND be missing
function isValidCombo(dm, missing) {
  return !missing.includes(dm.element);
}

// Build all valid combinations
function buildCombinations() {
  const combos = [];
  for (const dm of DAY_MASTERS) {
    for (const strength of STRENGTHS) {
      for (const missing of MISSING_COMBOS) {
        if (!isValidCombo(dm, missing)) continue;
        for (const pattern of PATTERNS) {
          const missingKey = missing.length > 0
            ? missing.slice().sort().join("+")
            : "none";
          combos.push({
            key: `${dm.stem}_${strength}_${missingKey}_${pattern.key}`,
            dm, strength, missing, pattern,
          });
        }
      }
    }
  }
  return combos;
}

// ─── SECTION TITLES BY STEM (mirrors SECTION_TITLES_BY_STEM in the app) ──────
// Used to tell the model what title each teaser sits beneath,
// so the language aligns with the section heading the user will read.

const SECTION_TITLES = {
  "甲": { nature:"The Nature of Your Oak",       fire:"The Season You Were Waiting For",       path:"The Forest You Were Built to Become",   bonds:"The Roots That Run Beneath",           strengths:"What You've Grown Into",         challenges:"Where the Branch Bends",           love:"How the Oak Loves",           career:"The Work of Building a Forest",    chapter:"The Ring of Growth You're In",       year:"2026: Fire Clearing the Path",   council:"What the Roots Already Know",      synthesis:"Standing at the Forest's Edge" },
  "乙": { nature:"The Nature of Your Vine",       fire:"The Wall You Were Meant to Find",       path:"The Path That Winds and Arrives",       bonds:"Where You've Wrapped Your Roots",      strengths:"What You've Grown Through",      challenges:"Where the Vine Meets the Wind",    love:"How the Vine Loves",          career:"The Work of Reaching",             chapter:"The Wall You're Climbing Now",       year:"2026: Fire Along the Vine",      council:"What the Reaching Already Knows",  synthesis:"Before You Release the Wall" },
  "丙": { nature:"The Nature of Your Sun",        fire:"The Sky You Were Made to Cross",        path:"The Light That Draws People Forward",   bonds:"What Your Warmth Has Created",         strengths:"What You Illuminate in Every Room",challenges:"Where the Light Meets the Long Shadow",love:"How the Sun Loves",          career:"The Work of Genuine Illumination", chapter:"The Arc of Sky You're Moving Through",year:"2026: Fire Meets Fire",         council:"What the Light Already Knows",     synthesis:"Before the Day Turns" },
  "丁": { nature:"The Nature of Your Flame",      fire:"The Darkness You Were Made to Enter",   path:"The Work of Focused Light",             bonds:"What Your Flame Has Drawn Close",      strengths:"What You Light in Every Room",   challenges:"Where the Flame Meets the Wind",   love:"How the Candle Loves",        career:"The Work of Precision and Light",  chapter:"The Burning Season You're In",       year:"2026: When Flames Amplify",      council:"What the Flame Already Knows",     synthesis:"Before the Wick Turns" },
  "戊": { nature:"The Nature of Your Mountain",   fire:"The Weather That Shapes the Stone",     path:"The Summit You Were Built to Be",       bonds:"What Has Been Built Upon You",         strengths:"What You Hold Up",               challenges:"Where the Mountain Meets the Sky", love:"How the Mountain Loves",      career:"The Work of Holding Ground",       chapter:"The Elevation You're Living",        year:"2026: Fire on the Mountain",     council:"What the Stone Already Knows",     synthesis:"The View From Here" },
  "己": { nature:"The Nature of Your Field",      fire:"The Seed You Were Made to Receive",     path:"The Harvest You Were Built to Grow",    bonds:"What Has Taken Root in You",           strengths:"What You've Cultivated",         challenges:"Where the Field Meets the Dry Season",love:"How the Field Loves",        career:"The Work of Cultivation",          chapter:"The Season You're Growing Through",  year:"2026: Fire Ripening the Field",  council:"What the Soil Already Knows",      synthesis:"Before the Next Planting" },
  "庚": { nature:"The Nature of Your Blade",      fire:"The Forge You Were Built For",          path:"How You Were Made to Succeed",          bonds:"The Rare Thread Running Through You",  strengths:"What You Carry Into Every Room", challenges:"Where You Meet Yourself",          love:"Your Heart",                  career:"Your Work in the World",           chapter:"The Chapter You're Living Now",      year:"2026: The Year of Fire",         council:"A Council for This Season",        synthesis:"A Word Before You Go" },
  "辛": { nature:"The Nature of Your Jewel",      fire:"The Pressure That Creates the Facet",   path:"The Standard You Were Made to Hold",    bonds:"What Has Been Polished Alongside You", strengths:"What You Clarify in Every Room", challenges:"Where the Jewel Meets the Rough",  love:"How the Jewel Loves",         career:"The Work of Discernment",          chapter:"The Facet Being Cut Right Now",      year:"2026: Fire in the Setting",      council:"What the Clarity Already Knows",   synthesis:"The Final Polish" },
  "壬": { nature:"The Nature of Your Ocean",      fire:"The Shore That Gives You Shape",        path:"The Current You Were Built to Follow",  bonds:"What Moves Beneath the Surface",       strengths:"What You Carry in the Deep",     challenges:"Where the Ocean Meets the Shore",  love:"How the Ocean Loves",         career:"The Work of the Deep",             chapter:"The Tide You're Living Now",         year:"2026: Fire on the Water",        council:"What the Deep Already Knows",      synthesis:"Before the Next Tide" },
  "癸": { nature:"The Nature of Your Rain",       fire:"The Sky You Were Made to Fall From",    path:"The Ground You Were Made to Find",      bonds:"What Your Rain Has Fed",               strengths:"What You Nourish Wherever You Fall",challenges:"Where the Rain Meets the Stone",love:"How the Rain Loves",          career:"The Work of Quiet Nourishment",    chapter:"The Cloud You're Moving Through",    year:"2026: Steam Rising",             council:"What the Rain Already Knows",      synthesis:"Before the Sky Clears" },
};

// ─── DAY MASTER PROFILE DATA (mirrors buildDayMasterProfile in the app) ────────
// These are static per stem — not per template combination.
// Included here so generated templates are consistent with the profile card.
// MUST stay in sync with: ARCHETYPE_MANIFESTO, CORE_LINES, CORE_STRENGTHS,
// CORE_SHADOWS in Elementum_AI_Engine_v10_fixed.jsx

// Manifesto — brand one-liner, third person, describes the archetype as a force
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

// Core lines — third-person archetype voice (not "you"), introduces the archetype as a character
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

// Core Gifts — punchy 3-5 word phrases (left column of profile card)
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

// Growing Edge — invitations not diagnoses (right column of profile card)
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

// ─── SECTION 2 — ENERGY PROFILE DATA ─────────────────────────────────────────
// MUST stay in sync with STRENGTH_META, ELEMENT_ENERGIES, getElementInsights
// in Elementum_AI_Engine_v10_fixed.jsx

// Energy rating scale — replaces Strong/Weak framing entirely
// Chinese → English label + balance approach
// 极旺 Overpowering · 旺 Dominant · 中和 Balanced · 弱 Receptive · 极弱 Yielding
// Balance approach:
//   喜克泄耗 → "Channel & Release" (strong/overpowering Day Master)
//   喜生助   → "Nourish & Amplify" (receptive/yielding Day Master)
//   中和     → "Maintain & Attune" (balanced Day Master)
const STRENGTH_META = {
  extremely_strong: {
    zh: "极旺", label: "Overpowering",
    approach: "Channel & Release",
    approachLine: "Your energy runs at full capacity — it needs expression, challenge, and friction to stay purposeful rather than becoming rigid.",
  },
  strong: {
    zh: "旺", label: "Dominant",
    approach: "Channel & Release",
    approachLine: "Your energy is self-directed and concentrated — give it meaningful outlets or it turns inward.",
  },
  moderate: {
    zh: "中和", label: "Balanced",
    approach: "Maintain & Attune",
    approachLine: "Your energy is naturally equilibrated — protect it from extremes and stay attuned to what genuinely disrupts the balance.",
  },
  weak: {
    zh: "弱", label: "Receptive",
    approach: "Nourish & Amplify",
    approachLine: "Your energy comes through fully in the right conditions — seek environments and people that genuinely support rather than drain.",
  },
  extremely_weak: {
    zh: "极弱", label: "Yielding",
    approach: "Nourish & Amplify",
    approachLine: "Your energy is highly context-dependent — alignment matters more than effort. The right conditions produce what force never will.",
  },
};

// What lifts / what depletes — per Day Master stem
// Lifts = 喜用 (favourable elements)
// Depletes = 忌凶 (unfavourable elements)
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

// Dominant force insight lines — shown for the top element in the chart
const DOMINANT_LINES = {
  Metal: "Metal dominates — precision without flexibility. The edge is real, but without heat it cannot find its purpose.",
  Wood:  "Wood overwhelms — almost all energy nourishes growth in others, leaving little for yourself.",
  Fire:  "Fire saturates — warmth without restraint. The light is genuine but risks consuming its own source.",
  Earth: "Earth dominates — deep stability, but movement and change become genuinely difficult.",
  Water: "Water floods — depth without direction. The capacity is vast; the challenge is finding the channel.",
};
const DOMINANT_GUIDANCE = {
  Metal: "Seek environments that introduce friction and heat deliberately. Pressure is not the enemy — it is what gives your edge its purpose.",
  Wood:  "What you grow in others is real. The question is whether any of those roots belong to you. Choose one thing you are growing entirely for yourself.",
  Fire:  "Choose where you direct the warmth rather than shining at everything. Selectivity is not dimming — it is precision.",
  Earth: "Allow movement before certainty fully arrives. The Mountain's strength is not less for being moved — it is more for having shifted deliberately.",
  Water: "Find the shores. The depth becomes power not by staying vast but by finding the forms through which it can actually reach people.",
};

// Missing element insight lines
const MISSING_LINES = {
  Fire:  "Fire is absent — no external force has shaped this chart's direction. Freedom and isolation in equal measure.",
  Earth: "Earth is absent — no structural ground beneath the movement. The architecture is entirely self-generated.",
  Water: "Water is absent — no reflective depth to temper or nourish. What is built may be strong; what is sustained is still developing.",
  Wood:  "Wood is absent — no natural outward reach or creative momentum. Expression must be cultivated rather than assumed.",
  Metal: "Metal is absent — no natural precision or definition. Structure must be chosen rather than inherited.",
};
const MISSING_GUIDANCE = {
  Fire:  "Build the conditions that make your work impossible to ignore. The forge comes to those who make themselves worth forging.",
  Earth: "Build one container strong enough to hold what you carry. Internal structure is the practice — not a destination.",
  Water: "Cultivate stillness as a practice, not an absence. What you build without depth can stand; what stands with depth endures.",
  Wood:  "Invest in the one direction that is genuinely yours. One root growing deep is worth more than many reaching shallow.",
  Metal: "Define what is non-negotiable in how you work and live. Precision is a practice — and it begins with what you will not compromise.",
};

// ─── SECTION 2 — ENERGY CONDITION READINGS ───────────────────────────────────
// 10 stems × 3 energy bands = 30 stem-specific readings
// These are STATIC content — handwritten, not batch-generated
// Source of truth: src/content/content.js (after migration)
// Bands: extremely_strong|strong → "concentrated"
//        moderate                → "balanced"
//        weak|extremely_weak     → "open"
//
// Each entry has:
//   portrait  — 2 sentences: what this condition feels like for THIS archetype
//   dynamic   — 1 sentence:  what it creates (skips element confirmation)
//   practice  — 1 sentence:  the specific Channel/Nourish/Maintain action
//
// Full content lives in the engine file (ENERGY_CONDITION_READINGS constant).
// Referenced here for documentation — the LLM prompt for Seeker+ reading
// sections should build on what the user has already seen in this block.
//
// When generating reading teasers, assume the user has read:
//   portrait → dynamic → practice for their stem × band combination
// Do not repeat the portrait content in the reading teasers.

// ─── PROMPT ───────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You generate reading templates for Elementum, a BaZi spiritual guidance app.

RULES — non-negotiable:
- Zero BaZi jargon in output. No "Day Master", "Ten Gods", "Food God", "Seven Killings", "官杀", "食神", or any Chinese metaphysics terms.
- Plain English only. Second person ("you"). Present tense. Wise mentor voice.
- Every teaser must be specific to the chart variables given — not generic.
- Lead with affirmation, name the shadow honestly.
- The teaser for each section sits beneath a specific section title (provided in the request).
  Write the teaser so it feels like a natural opening to that title — the language, metaphor,
  and imagery should belong to the same archetype world as the title above it.

Return ONLY this exact JSON structure, nothing else:
{
  "nature":     "1 sentence beneath the nature title — the felt quality of this person's presence, in the archetype's language",
  "fire":       "1 sentence — the missing element reframed as architecture not deficiency, using the archetype's imagery",
  "path":       "1 sentence — the causal chain of how success works for this pattern, plain and direct",
  "bonds":      "1 sentence — what the chart's fusion patterns create in identity and love",
  "strengths":  "1 sentence — three genuine gifts, each grounded in chart data, named as confirmation not flattery",
  "challenges": "1 sentence — the shadow of the dominant energy, honest and specific enough to sting slightly",
  "love":       "1 sentence — how this person loves, the depth and the element tension with a partner",
  "career":     "1 sentence — the work blueprint, what path generates results and what path drains even when it succeeds",
  "chapter":    "1 sentence — what energy has arrived in this decade, what it is asking for",
  "year":       "1 sentence — what 2026 (丙午, Yang Fire Horse year) is asking of this specific archetype",
  "council":    "1 sentence — signal that four practical orientations are available in the full reading",
  "synthesis":  "1 sentence — the central story of the chart using the archetype metaphor, place the user inside the arc"
}`;

function buildUserMessage(combo) {
  const missingStr = combo.missing.length > 0
    ? combo.missing.join(", ")
    : "nothing — all five elements present";

  const titles    = SECTION_TITLES[combo.dm.stem] || SECTION_TITLES["庚"];
  const titlesBlock = Object.entries(titles)
    .map(([k, v]) => `  ${k}: "${v}"`)
    .join("\n");

  const manifesto = ARCHETYPE_MANIFESTO[combo.dm.stem] || "";
  const coreLine  = CORE_LINES[combo.dm.stem] || "";
  const strengths = (CORE_STRENGTHS[combo.dm.stem] || []).map(s => `  · ${s}`).join("\n");
  const shadows   = (CORE_SHADOWS[combo.dm.stem]   || []).map(s => `  · ${s}`).join("\n");

  // Section 2 energy profile context
  const sm       = STRENGTH_META[combo.strength] || STRENGTH_META.moderate;
  const energies = ELEMENT_ENERGIES[combo.dm.stem] || ELEMENT_ENERGIES["庚"];
  const liftsStr   = energies.lifts.map(e => `  · ${e.el}: ${e.line}`).join("\n");
  const depleteStr = energies.depletes.map(e => `  · ${e.el}: ${e.line}`).join("\n");
  const missingInsights = combo.missing
    .filter(el => MISSING_LINES[el])
    .map(el => `  · ${el}: ${MISSING_LINES[el]} — ${MISSING_GUIDANCE[el]}`)
    .join("\n");

  return `Generate reading section teasers for this BaZi chart profile:

Archetype: ${combo.dm.archetype} (${combo.dm.stem} — ${combo.dm.polarity} ${combo.dm.element})
Strength: ${combo.strength}
Missing elements: ${missingStr}
Governing pattern: ${combo.pattern.label}
Current year: 2026 (丙午 — Yang Fire on Fire Horse)

The archetype's brand manifesto (the one-liner that defines this archetype's essence):
"${manifesto}"

The user has already read this archetype description:
"${coreLine}"

The profile card also shows these Core Gifts (left column):
${strengths}

And these Growing Edge invitations (right column):
${shadows}

Section 2 — Energy Profile (the user has already seen this):
Energy rating: ${sm.label} (${sm.zh}) — Balance approach: ${sm.approach}
Balance guidance shown: "${sm.approachLine}"
What lifts this chart:
${liftsStr}
What depletes this chart:
${depleteStr}${missingInsights ? `\nMissing element insights shown:\n${missingInsights}` : ""}

The teasers you write sit beneath these section titles — write each one so it belongs in the same archetype world:
${titlesBlock}

Write all 12 section teasers. Each must:
- Feel at home beneath its title (same metaphor, same archetype voice)
- Build naturally on what the user has already read in the profile and energy sections
- Be specific to this exact chart combination (strength + missing elements + pattern)
- Lead with affirmation, name the shadow honestly but gently`;
}

// ─── BATCH SUBMISSION ─────────────────────────────────────────────────────────

async function submitBatch(combos) {
  console.log(`\nBuilding ${combos.length} requests...`);

  const requests = combos.map(combo => ({
    custom_id: combo.key,
    params: {
      model: "claude-sonnet-4-20250514",
      max_tokens: 700,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserMessage(combo) }],
    },
  }));

  // Anthropic Batch API max: 10,000 requests per batch
  // 800 templates fits in one batch comfortably
  console.log(`Submitting batch to Anthropic...`);
  const batch = await anthropic.batches.create({ requests });

  console.log(`\nBatch submitted successfully.`);
  console.log(`Batch ID: ${batch.id}`);
  console.log(`Status: ${batch.processing_status}`);
  console.log(`Estimated cost: $${(combos.length * 0.00377).toFixed(2)}`);
  console.log(`\nSave this batch ID — you need it to retrieve results.`);

  // Save batch ID to file so you don't lose it
  fs.writeFileSync("batch_id.txt", batch.id);
  return batch.id;
}

// ─── RESULT RETRIEVAL ─────────────────────────────────────────────────────────

async function waitForBatch(batchId) {
  console.log(`\nPolling batch ${batchId}...`);

  while (true) {
    const batch = await anthropic.batches.retrieve(batchId);
    const { processing_status, request_counts } = batch;

    console.log(`Status: ${processing_status} | ` +
      `Processing: ${request_counts.processing} | ` +
      `Succeeded: ${request_counts.succeeded} | ` +
      `Errored: ${request_counts.errored}`);

    if (processing_status === "ended") {
      console.log(`\nBatch complete.`);
      return batch;
    }

    // Poll every 60 seconds — batch typically takes 5-20 minutes
    await new Promise(r => setTimeout(r, 60_000));
  }
}

async function collectResults(batchId) {
  const templates = {};
  const failed = [];

  const results = await anthropic.batches.results(batchId);

  for await (const result of results) {
    if (result.result.type === "succeeded") {
      const text = result.result.message.content[0]?.text || "";
      try {
        // Strip any accidental markdown fences
        const clean = text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(clean);
        // Wrap each value in teaser object for schema consistency
        const sections = {};
        for (const [key, value] of Object.entries(parsed)) {
          sections[key] = { teaser: value };
        }
        templates[result.custom_id] = { sections };
      } catch (e) {
        console.warn(`Parse failed for ${result.custom_id}: ${e.message}`);
        failed.push(result.custom_id);
      }
    } else {
      failed.push(result.custom_id);
      console.warn(`Failed: ${result.custom_id} — ${result.result.type}`);
    }
  }

  return { templates, failed };
}

// ─── QUALITY CHECKS ───────────────────────────────────────────────────────────

const FORBIDDEN_JARGON = [
  "Day Master", "Ten Gods", "Food God", "Seven Killings", "Hurt Officer",
  "Direct Officer", "Parallel Self", "Rob Wealth", "Indirect Seal",
  "Direct Seal", "Indirect Wealth", "Direct Wealth",
  "官杀", "食神", "伤官", "正官", "七杀", "比肩", "劫财", "偏印", "正印",
  "日主", "格局", "大运", "流年",
];

function qualityCheck(templateKey, sections) {
  const issues = [];

  for (const [sectionKey, content] of Object.entries(sections)) {
    const teaser = content.teaser || "";

    // Check jargon
    for (const term of FORBIDDEN_JARGON) {
      if (teaser.includes(term)) {
        issues.push(`${sectionKey}: contains jargon "${term}"`);
      }
    }

    // Check length — teasers should be 1 sentence, 15-50 words
    const wordCount = teaser.split(" ").length;
    if (wordCount < 10) issues.push(`${sectionKey}: too short (${wordCount} words)`);
    if (wordCount > 60) issues.push(`${sectionKey}: too long (${wordCount} words)`);

    // Check not empty
    if (!teaser.trim()) issues.push(`${sectionKey}: empty`);
  }

  return issues;
}

// ─── MAIN EXECUTION ───────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || "generate"; // "generate" | "retrieve" | "check"

  if (mode === "generate") {
    // Step 1: build and submit
    const combos = buildCombinations();
    console.log(`Total valid combinations: ${combos.length}`);

    const batchId = await submitBatch(combos);
    console.log(`\nNext step: run  node generate_templates.js retrieve ${batchId}`);
    console.log(`(Or wait — the script saved the batch ID to batch_id.txt)`);

  } else if (mode === "retrieve") {
    // Step 2: retrieve results (run after ~10-20 min)
    const batchId = args[1] || fs.readFileSync("batch_id.txt", "utf8").trim();
    if (!batchId) { console.error("No batch ID provided."); process.exit(1); }

    await waitForBatch(batchId);
    const { templates, failed } = await collectResults(batchId);

    console.log(`\nCollected ${Object.keys(templates).length} templates`);
    console.log(`Failed: ${failed.length}`);
    if (failed.length > 0) console.log("Failed keys:", failed.slice(0, 10));

    // Save to file
    fs.writeFileSync("templates.json", JSON.stringify(templates, null, 2));
    console.log(`\nSaved to templates.json (${
      (fs.statSync("templates.json").size / 1024).toFixed(0)
    } KB)`);

    // Next: run quality check
    console.log(`\nNext step: node generate_templates.js check`);

  } else if (mode === "check") {
    // Step 3: quality validation
    if (!fs.existsSync("templates.json")) {
      console.error("templates.json not found. Run retrieve first.");
      process.exit(1);
    }

    const templates = JSON.parse(fs.readFileSync("templates.json", "utf8"));
    const allIssues = {};
    let passCount = 0;

    for (const [key, template] of Object.entries(templates)) {
      const issues = qualityCheck(key, template.sections);
      if (issues.length === 0) {
        passCount++;
      } else {
        allIssues[key] = issues;
      }
    }

    const total = Object.keys(templates).length;
    console.log(`\nQuality check complete:`);
    console.log(`  Passed: ${passCount}/${total} (${((passCount/total)*100).toFixed(1)}%)`);
    console.log(`  Issues: ${Object.keys(allIssues).length} templates`);

    if (Object.keys(allIssues).length > 0) {
      console.log(`\nFirst 5 templates with issues:`);
      Object.entries(allIssues).slice(0, 5).forEach(([key, issues]) => {
        console.log(`  ${key}:`);
        issues.forEach(i => console.log(`    - ${i}`));
      });
      // Save issues for review
      fs.writeFileSync("quality_issues.json", JSON.stringify(allIssues, null, 2));
      console.log(`\nFull issue list saved to quality_issues.json`);
      console.log(`Fix issues then re-run: node generate_templates.js generate`);
    } else {
      console.log(`\nAll templates passed. Ready to deploy.`);
      console.log(`Next step: upload templates.json to your storage layer.`);
    }
  }
}

main().catch(console.error);
