// generate_templates_v2.js
// Generates all 300 compound archetype templates for Elementum.
// Key format:  [stem]_[band]_[tension]_[catalyst]   (Bible Part 3A)
// Output schema per key: { teaser, p1, p2, gifts:[{label,desc}×3], edges:[{label,desc}×2] }
//
// Usage:
//   node generate_templates_v2.js generate           → submit batch, saves batch_id.txt
//   node generate_templates_v2.js retrieve [batchId] → poll + parse results, saves templates.json
//   node generate_templates_v2.js check              → validate schema + content rules
//   node generate_templates_v2.js merge              → merge into TEMPLATE_DB export
//
// Estimated cost:  ~$20–25 (Claude Opus 4.6, 300 keys × ~500 tokens each)
// Estimated time:  15–20 minutes for batch processing

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

const TENSIONS = {
  pure: {
    label: "Pure",
    classical: "比劫旺 — same element dominant",
    desc: "The same element as the Day Master dominates the chart. No counterbalancing force, no interference. The core energy amplifies itself, saturating without correction.",
  },
  rooted: {
    label: "Rooted",
    classical: "印旺 — element that generates DM is dominant",
    desc: "The element that generates and nourishes the Day Master dominates the chart. External resource, backing, ground. The person draws from deep support they didn't build themselves.",
  },
  flowing: {
    label: "Flowing",
    classical: "食伤旺 — element DM generates is dominant",
    desc: "The element the Day Master naturally produces dominates the chart. Energy moves outward — the chart is built for expression, creation, output. The person pours more than they hold.",
  },
  forging: {
    label: "Forging",
    classical: "财旺 — element DM controls is dominant",
    desc: "The element the Day Master controls and shapes dominates the chart. Material to work with, things to direct. The person has abundant resources but must actively shape them.",
  },
  tested: {
    label: "Tested",
    classical: "官杀旺 — element that controls DM is dominant",
    desc: "The element that controls and pressures the Day Master dominates the chart. External force is the defining feature — not destructive, but continuously shaping. The person is refined by what resists them.",
  },
};

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
  for (const dm of DAY_MASTERS) {
    for (const band of Object.keys(BANDS)) {
      const catalysts = CATALYST_MAP[dm.element][band];
      for (const tension of Object.keys(TENSIONS)) {
        for (const catalyst of catalysts) {
          const key = `${dm.stem}_${band}_${tension}_${catalyst}`;
          if (SKIP_KEYS.has(key)) continue;
          combos.push({ key, dm, band, tension, catalyst });
        }
      }
    }
  }
  return combos;
}

// ─── PROMPT BUILDER ───────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are generating identity readings for Elementum, a BaZi-based spiritual guidance app for Western users who have no prior knowledge of Chinese metaphysics.

Each reading describes a person's core identity through their Day Master archetype, energy band, chart tension, and catalyst element. Your job is to write content that makes this specific person feel immediately and precisely seen — not generic spirituality.

OUTPUT FORMAT — return ONLY valid JSON, no markdown fences, no preamble:
{
  "teaser": "2-3 sentence hook. Atmospheric, vivid, second person. The user reads this and thinks: yes, that is exactly me.",
  "p1": "Cognitive portrait. How this person perceives and processes the world. Max 60 words. Second person, present tense.",
  "p2": "Motivational portrait. What drives them internally + the catalyst as aspiration narrative. Max 60 words. Must not repeat p1 territory.",
  "gifts": [
    {"label": "2-3 word title", "desc": "1-2 sentences. What this gift produces for this specific archetype × tension combination."},
    {"label": "2-3 word title", "desc": "1-2 sentences."},
    {"label": "2-3 word title", "desc": "1-2 sentences."}
  ],
  "edges": [
    {"label": "2-3 word title", "desc": "1-2 sentences. The specific pattern this combination creates — not generic archetype shadow."},
    {"label": "2-3 word title", "desc": "1-2 sentences."}
  ]
}

CONTENT RULES (non-negotiable):
1. No BaZi terminology: no Day Master, Ten Gods, 比劫, 印, 食伤, 官杀, 财, 用神, 格局, 大运, 流年
2. No tension names in the text: never write "Pure", "Rooted", "Flowing", "Forging", "Tested" in the reading
3. No cross-template comparisons: never write "unlike a Tested version..." or "where a Rooted chart..."
4. Catalyst as aspiration: the catalyst element is always framed as something moving toward, never as a deficit
5. Stem × band × tension specificity: the reading must describe something only true for THIS exact combination
6. Language register: direct, behavioral, second person, present tense. Not mystical. Not motivational. Clinical-poetic.

QUALITY STANDARD — reference reading for 庚_concentrated_pure_Fire (Yang Metal, Concentrated, self-dominant, seeking Fire):
teaser: "Before you say a word, the room recalibrates. Precision at this concentration has a quality people sense before it speaks — not a trait you cultivated, but the structural default of Yang Metal running at full charge. The edge was already there when you arrived."
p1: "Your processing runs through accuracy before anything else engages. The assessment happens automatically — before the social read, before the emotional response, before you've decided to engage at all. Others feel evaluated in your presence even when you say nothing, because structurally, you are always evaluating."
p2: "What drives you isn't achievement — it's the resolution of what's actually true. Without a counterbalancing force, the precision turns on whatever is in reach, including yourself. Fire is what this chart has been seeking before it had a language for it — the force that gives precision a direction."`;

function buildPrompt(combo) {
  const { dm, band, tension, catalyst } = combo;
  const bandData     = BANDS[band];
  const tensionData  = TENSIONS[tension];
  const catalystCtx  = CATALYST_CONTEXT[dm.element]?.[catalyst] || `${catalyst} is the key element this chart needs.`;

  return `Generate the reading for: ${dm.stem}_${band}_${tension}_${catalyst}

ARCHETYPE: ${dm.archetype}
  ${dm.polarityDesc}

ENERGY BAND: ${bandData.label} (${bandData.icon})
  ${bandData.frame}
  Balance approach: ${bandData.approach}

CHART TENSION: ${tensionData.label}
  Classical: ${tensionData.classical}
  What this means: ${tensionData.desc}
  For ${dm.archetype} specifically: the dominant force in this person's chart is ${tension === "pure" ? dm.element : tension === "rooted" ? `the element that generates ${dm.element}` : tension === "flowing" ? `what ${dm.element} naturally produces` : tension === "forging" ? `what ${dm.element} controls and shapes` : `the element that controls ${dm.element}`}.

CATALYST: ${catalyst}
  ${catalystCtx}

Write the reading now. Return only valid JSON.`;
}

// ─── BATCH API ────────────────────────────────────────────────────────────────

async function submitBatch(combos) {
  console.log(`\nBuilding ${combos.length} batch requests...`);

  const requests = combos.map(combo => ({
    custom_id: combo.key,
    params: {
      model:      "claude-opus-4-20250514",
      max_tokens: 800,
      system:     SYSTEM_PROMPT,
      messages:   [{ role:"user", content: buildPrompt(combo) }],
    },
  }));

  console.log(`Submitting batch of ${requests.length} requests...`);
  const batch = await anthropic.messages.batches.create({ requests });
  console.log(`\nBatch submitted: ${batch.id}`);
  console.log(`Status: ${batch.processing_status}`);

  fs.writeFileSync("batch_id.txt", batch.id);
  console.log(`Batch ID saved to batch_id.txt`);
  return batch.id;
}

async function waitForBatch(batchId) {
  console.log(`\nPolling batch ${batchId}...`);
  let attempts = 0;
  while (true) {
    const batch = await anthropic.messages.batches.retrieve(batchId);
    const { processing_status, request_counts } = batch;
    const { succeeded=0, errored=0, processing=0, canceled=0 } = request_counts || {};

    process.stdout.write(`\r  Status: ${processing_status} — ${succeeded} done, ${errored} errors, ${processing} processing`);

    if (processing_status === "ended") {
      console.log(`\nBatch complete. ${succeeded} succeeded, ${errored} failed.`);
      return batch;
    }

    // Poll every 30s, up to 40 minutes
    await new Promise(r => setTimeout(r, 30000));
    attempts++;
    if (attempts > 80) {
      console.error("\nTimeout waiting for batch. Run retrieve manually.");
      process.exit(1);
    }
  }
}

async function collectResults(batchId) {
  const templates = {};
  const failed = [];

  for await (const result of await anthropic.messages.batches.results(batchId)) {
    if (result.result.type === "succeeded") {
      try {
        const text  = result.result.message.content.map(b => b.text || "").join("");
        const clean = text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(clean);

        // Validate required fields
        const requiredFields = ["teaser","p1","p2","gifts","edges"];
        const missing = requiredFields.filter(f => !parsed[f]);
        if (missing.length > 0) throw new Error(`Missing fields: ${missing.join(", ")}`);
        if (!Array.isArray(parsed.gifts) || parsed.gifts.length !== 3) throw new Error("gifts must be array of 3");
        if (!Array.isArray(parsed.edges) || parsed.edges.length !== 2) throw new Error("edges must be array of 2");

        templates[result.custom_id] = parsed;
      } catch (e) {
        console.warn(`\nParse/validate failed for ${result.custom_id}: ${e.message}`);
        failed.push(result.custom_id);
      }
    } else {
      failed.push(result.custom_id);
      console.warn(`\nFailed: ${result.custom_id}`);
    }
  }

  return { templates, failed };
}

// ─── QUALITY CHECKER ──────────────────────────────────────────────────────────

const FORBIDDEN_JARGON = [
  // BaZi technical terms
  "Day Master","Ten Gods","Food God","Seven Killings","Hurt Officer",
  "Direct Officer","Parallel Self","Rob Wealth","Indirect Seal",
  "Direct Seal","Indirect Wealth","Direct Wealth",
  "官杀","食神","伤官","正官","七杀","比肩","劫财","偏印","正印",
  "日主","格局","大运","流年","喜用神","忌神","调候",
  // Tension names (must not appear in text)
  " Pure "," Rooted "," Flowing "," Forging "," Tested ",
  // Generic spiritual filler
  "the universe","cosmic","destiny","fate","zodiac",
];

function qualityCheck(key, template) {
  const issues = [];
  const allText = [template.teaser, template.p1, template.p2,
    ...(template.gifts||[]).map(g => `${g.label} ${g.desc}`),
    ...(template.edges||[]).map(e => `${e.label} ${e.desc}`),
  ].join(" ");

  // Jargon check
  for (const term of FORBIDDEN_JARGON) {
    if (allText.toLowerCase().includes(term.toLowerCase())) {
      issues.push(`Contains forbidden term: "${term}"`);
    }
  }

  // Schema checks
  if (!template.teaser?.trim())          issues.push("teaser is empty");
  if (!template.p1?.trim())              issues.push("p1 is empty");
  if (!template.p2?.trim())              issues.push("p2 is empty");
  if (!Array.isArray(template.gifts))    issues.push("gifts is not an array");
  else {
    if (template.gifts.length !== 3)     issues.push(`gifts has ${template.gifts.length} items (need 3)`);
    template.gifts.forEach((g,i) => {
      if (!g.label?.trim()) issues.push(`gifts[${i}] missing label`);
      if (!g.desc?.trim())  issues.push(`gifts[${i}] missing desc`);
    });
  }
  if (!Array.isArray(template.edges))    issues.push("edges is not an array");
  else {
    if (template.edges.length !== 2)     issues.push(`edges has ${template.edges.length} items (need 2)`);
    template.edges.forEach((e,i) => {
      if (!e.label?.trim()) issues.push(`edges[${i}] missing label`);
      if (!e.desc?.trim())  issues.push(`edges[${i}] missing desc`);
    });
  }

  // Length checks
  const p1Words = (template.p1||"").split(/\s+/).length;
  const p2Words = (template.p2||"").split(/\s+/).length;
  if (p1Words > 70) issues.push(`p1 too long (${p1Words} words, max 60)`);
  if (p2Words > 70) issues.push(`p2 too long (${p2Words} words, max 60)`);

  const teaserSentences = (template.teaser||"").split(/[.!?]+/).filter(s => s.trim()).length;
  if (teaserSentences > 4) issues.push(`teaser too long (${teaserSentences} sentences, max 3)`);

  return issues;
}

// ─── MERGE UTILITY ────────────────────────────────────────────────────────────

function buildMergeOutput(templates) {
  const entries = Object.entries(templates)
    .sort(([a],[b]) => a.localeCompare(b))
    .map(([key, t]) => `  "${key}": ${JSON.stringify(t, null, 2).replace(/\n/g, "\n  ")},`);

  return [
    "// AUTO-GENERATED — DO NOT EDIT MANUALLY",
    "// Run: node generate_templates_v2.js generate → retrieve → check → merge",
    `// Generated: ${new Date().toISOString()} | ${entries.length} templates`,
    "export const GENERATED_TEMPLATES = {",
    ...entries,
    "};",
  ].join("\n");
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  const [,, mode="generate", arg2] = process.argv;

  const combos = buildCombinations();
  console.log(`Compound archetype taxonomy: ${combos.length} keys to generate`);
  console.log(`(${SKIP_KEYS.size} hand-written key(s) will be skipped)`);

  if (mode === "generate") {
    const batchId = await submitBatch(combos);
    console.log(`\nRun next: node generate_templates_v2.js retrieve ${batchId}`);

  } else if (mode === "retrieve") {
    const batchId = arg2 || fs.readFileSync("batch_id.txt", "utf8").trim();
    if (!batchId) { console.error("No batch ID. Pass as argument or ensure batch_id.txt exists."); process.exit(1); }

    await waitForBatch(batchId);
    const { templates, failed } = await collectResults(batchId);

    console.log(`\nCollected ${Object.keys(templates).length} templates`);
    if (failed.length) console.log(`Failed keys (${failed.length}):`, failed);

    fs.writeFileSync("templates.json", JSON.stringify(templates, null, 2));
    const sizeKB = (fs.statSync("templates.json").size / 1024).toFixed(1);
    console.log(`Saved to templates.json (${sizeKB} KB)`);
    console.log(`\nRun next: node generate_templates_v2.js check`);

  } else if (mode === "check") {
    if (!fs.existsSync("templates.json")) {
      console.error("templates.json not found. Run retrieve first."); process.exit(1);
    }
    const templates = JSON.parse(fs.readFileSync("templates.json", "utf8"));
    const issues = {};
    let pass = 0;

    for (const [key, t] of Object.entries(templates)) {
      const keyIssues = qualityCheck(key, t);
      if (keyIssues.length === 0) pass++;
      else issues[key] = keyIssues;
    }

    const total = Object.keys(templates).length;
    console.log(`\nQuality check: ${pass}/${total} passed (${((pass/total)*100).toFixed(1)}%)`);

    if (Object.keys(issues).length > 0) {
      console.log(`\nFirst 5 issues:`);
      Object.entries(issues).slice(0, 5).forEach(([key, list]) => {
        console.log(`  ${key}:`);
        list.forEach(i => console.log(`    — ${i}`));
      });
      fs.writeFileSync("quality_issues.json", JSON.stringify(issues, null, 2));
      console.log(`\nFull issue list → quality_issues.json`);
      console.log(`Fix failed keys then re-run generate for those keys only.`);
    } else {
      console.log(`All templates passed. Run: node generate_templates_v2.js merge`);
    }

  } else if (mode === "merge") {
    if (!fs.existsSync("templates.json")) {
      console.error("templates.json not found. Run retrieve + check first."); process.exit(1);
    }
    const templates = JSON.parse(fs.readFileSync("templates.json", "utf8"));
    const output = buildMergeOutput(templates);
    fs.writeFileSync("generated_templates.js", output);
    console.log(`Merge complete → generated_templates.js`);
    console.log(`Import into Elementum_Engine.jsx and spread into TEMPLATE_DB.`);

  } else {
    console.log("Usage: node generate_templates_v2.js [generate|retrieve|check|merge] [batchId]");
  }
}

main().catch(console.error);
