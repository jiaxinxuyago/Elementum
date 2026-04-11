# Elementum · Doc 4 — Generation Architecture & Reading Content Guide

> **Version 3.1 · April 2026**
> This document replaces all prior generation architecture. The old three-pass pipeline (portrait prewrite → persona card → reading schema) is retired. `archetypeSource.js` is the single source of truth for all field names, reading templates, and knowledge-pool content. Archetype data is split into two serving files (`ElementNature_DATA.js` and `DomEnergyTg_Data.js`). Generated content is limited to the self-report synthesis pass (on purchase).

---

## §1 — Architecture Overview

### The three-tier product

| Tier | Price | Content source | Delivery |
|---|---|---|---|
| **Free** | $0 | Archetype data (static) | Instant |
| **Pro** | $9.99/mo | Archetype data (static, full fields) | Instant on upgrade |
| **Self-Report** | $6.99–9.99 one-time | Compound archetype cards (pre-generated) + synthesis pass | ~20–30 seconds |

### The core principle

`archetypeSource.js` is the single source of truth. It holds the fundamental reading templates and reference content for all 10 stems and 10 Ten Gods. It defines every field name used across the system. An identical HTML copy exists as a parallel editing surface — the JS file and the HTML file must always have matching content.

Two archetype data files derive their content and field naming from `archetypeSource.js`:

- **`ElementNature_DATA.js`** — 150 archetype reading templates keyed by `stem_band_tgPattern`. Pure personality and behavioral interpretation of each energy configuration.
- **`DomEnergyTg_Data.js`** — 50 compound archetype cards keyed by `domEl_specificTenGod`. The deepest content layer — source for Pro compound teasers and self-report synthesis.

No LLM calls are made for Free or Pro content delivery. Every field served at those tiers is a static read from the archetype data files. The only generation work is:

1. **On purchase** — Self-report synthesis pass via `batchGenerate.js`: takes the user’s relevant compound cards from `DomEnergyTg_Data.js` + chart context, produces a 13-field narrative in ~20–30 seconds

### The file structure

```
Code/
├── archetypeSource.js           ← Source of truth. 10 stems + 10 TGs. Hand-authored.
│                               Defines all field names. Has an identical HTML twin.
│                               Also holds internal-only constants
│                               (CLASSICAL_STEM_ANCHORS, CLASSICAL_TG_ANCHORS,
│                               BINGYI_FRAMING, PILLAR_STAGE) — part of the
│                               knowledge pool, used by batchGenerate.js
│                               at synthesis time.
├── ElementNature_DATA.js    ← 150 stem_band_tgPattern archetype reading templates.
│                               Personality/behavioral interpretation only.
├── DomEnergyTg_Data.js      ← 50 domEl_specificTenGod compound archetype cards.
│                               13-field schema. Pre-generated offline.
├── Elementum_Engine.jsx     ← Calculation engine + UI components.
└── batchGenerate.js ← Self-report synthesis engine (Pipeline B).
                                Imports internal constants from archetypeSource.js.
```

### The 150 archetype keys — locked structural backbone

The 150 `stem_band_tgPattern` keys are the permanent structural foundation of the system. They do not change. They determine which archetype a user belongs to and which archetype data fields are served. The content sourced from them will be enriched over time but the key structure is locked.

| Dimension | Values | Count |
|---|---|---|
| Stem (Day Master) | 10 (甲乙丙丁戊己庚辛壬癸) | 10 |
| Band (DM energy level) | concentrated / balanced / open | 3 |
| tgPattern (dominant force family) | pure / rooted / flowing / forging / tested | 5 |
| **Total keys** | | **150** |

---

## §2 — Tier Content Map

### Free tier — what is shown

| Section | Content | Source |
|---|---|---|
| Identity Card | Archetype name, element, seal SVG, manifesto quote | `archetypeSource.js` — archetype table (DOC2) |
| Elemental Nature Card | Energy condition diagnosis: band paragraph (concentrated / balanced / open) | `archetypeSource.js` → `STEM_CARD_DATA[stem].manual[band]` |
| DM Energy Intro *(open/balanced DM only)* | Introduces the Day Master’s elemental nature when it is not the dominant energy | `archetypeSource.js` → `STEM_CARD_DATA[stem].energy.*` |
| Dominant Energy Cards (top 2) | Visual hierarchy — proportional card weight. TG layer: realm intro, keywords, personality paragraph, core gifts, core shadows | `archetypeSource.js` → `TG_CARD_DATA[tg].*` free-tier fields |
| Catalyst / Resistance teasers | Accurate but incomplete — names the catalyst/resistance without full analysis | `archetypeSource.js` → `STEM_CARD_DATA[stem].manual.catalyst` (teaser only) |
| Ghost cards | Faint outlines of locked energies 3–5 | UI only — no content |
| Absent energy card *(if applicable)* | Special sticky card for any element with zero or near-zero chart presence | `archetypeSource.js` → `STEM_CARD_DATA[stem].energy.*` (absent element) |

### Pro tier — what is shown

All Free tier content, plus:

| Section | Content | Source |
|---|---|---|
| All 5 dominant energies | Full cards, no ghost treatment | `archetypeSource.js` → `TG_CARD_DATA[tg].*` |
| Life domains | Career, relationships, wealth, health — how each TG shapes each domain | `archetypeSource.js` → `TG_CARD_DATA[tg].lifeDomains.*` |
| Decision style | How this TG pattern drives decision-making | `archetypeSource.js` → `TG_CARD_DATA[tg].decisionStyle` |
| Communication style | How this TG pattern shapes communication | `archetypeSource.js` → `TG_CARD_DATA[tg].communicationStyle` |
| Catalyst & friction in depth | Full analysis of activating and compressive forces | `archetypeSource.js` → `STEM_CARD_DATA[stem].manual.catalyst` + `manual.resistance` (full) |
| Absent energy deep dive | Structural significance of missing elements | `archetypeSource.js` → `STEM_CARD_DATA[stem].energy.*` (extended) |
| Compound card teaser | 2–3 fields surfaced in partial form: `hook`, `dynamic`, opening of `your_gift` | `DomEnergyTg_Data.js` → compound archetype card |

**Pro delivers instantly.** Every field is a static read from `archetypeSource.js` and `DomEnergyTg_Data.js`. No generation queue.

### Self-Report — what is shown

A single synthesized narrative document following the 13-field compound archetype schema. Generated at purchase time. Delivered in ~20–30 seconds.

- Weaves all relevant compound cards for the user’s chart into a flowing narrative
- Voiced in the Day Master’s elemental register
- 2AM thought integrated organically into the narrative (not listed as a standalone field)
- Downloadable artifact — owned permanently by the user

---

## §3 — Energy Blueprint: Rendering Logic

### Section order (all users)

```
1. Identity Card                        [always shown, always free]
2. Elemental Nature Card                [always shown, always free]
3. DM Energy Intro          [conditional: open/balanced DM whose stem ≠ dominant element]
4. Dominant Energy Cards    [top 2 free — all 5 pro]
   └─ TG layer inside each card
5. Ghost cards              [free only: faint outlines of locked energies 3–5]
6. Absent Energy Card       [conditional: shown free if any element is zero/near-zero]
```

### Elemental Nature Card

Sources from `archetypeSource.js` → `STEM_CARD_DATA[stem].manual[band]`. Describes the user’s energy condition — concentrated, balanced, or open — in behavioral terms. This is the energy condition diagnosis: it explains *how much* of the core element is present and what that means structurally.

**This section is always present and always free.** It is the first personalised statement the user reads about their chart.

### DM Energy Intro (conditional)

**Trigger condition:** The Day Master’s element is not represented in the top 2 dominant energies. This occurs for open and some balanced DMs where the dominant chart energy is a different element entirely.

**Why this matters:** Without this section, the user sees dominant energy cards that describe a different element than their own core. The DM Energy Intro bridges this: it introduces the user’s own elemental nature before the dominant energy cards explain what force they are operating within.

**Content:** Sources from `archetypeSource.js` → `STEM_CARD_DATA[stem].energy.what` and `energy.represents`. Framed as: *“Your core element is [Element]. Here is what that means as a foundation…”*

**For concentrated DMs:** Skip this section entirely. The Elemental Nature card transitions directly to dominant energy cards with the note: *“Your elemental nature is your dominant energy — [archetype name] runs the chart.”*

### Dominant Energy Cards — visual hierarchy

Free tier shows top 2 dominant energies. Cards are rendered with proportional visual weight:

| Energy score | Card treatment |
|---|---|
| Primary (highest score) | Full-width, full opacity, primary visual weight |
| Secondary (second highest) | Slightly reduced, clearly supporting role |
| Locked (3rd–5th) | Ghost card — faint outline, element colour at 15% opacity, lock icon |

The visual difference communicates the chart’s real character. A chart that is 80% Metal and 12% Wood should look structurally different from a 40% / 35% split.

### TG layer inside each dominant energy card

The Ten God layer sits *inside* each dominant energy card as a subsection. It explains the specific structural dynamic created when that dominant element meets the user’s Day Master through the computed Ten God mechanism.

**Free tier TG layer fields (per dominant energy card):**

| Field | Content | Source |
|---|---|---|
| Realm intro | What this TG “rules” — the domain it governs | `archetypeSource.js` → `TG_CARD_DATA[tg].realmPhrase` + `realmDesc` |
| Keywords | 4–5 personality chips | `archetypeSource.js` → `TG_CARD_DATA[tg].chips[]` |
| Personality paragraph | Short paragraph: what this says about your nature | `archetypeSource.js` → `TG_CARD_DATA[tg].personalityParagraph` |
| Core gifts | 2–3 gift bullets | `archetypeSource.js` → `TG_CARD_DATA[tg].gift[]` (first 2–3) |
| Core shadows | 1–2 shadow bullets | `archetypeSource.js` → `TG_CARD_DATA[tg].shadow[]` (first 1–2) |
| Catalyst / resistance teaser | Names the force, does not analyse it fully | `archetypeSource.js` → `STEM_CARD_DATA[stem].manual.catalyst` (truncated) |

**Pro tier TG layer adds:**

| Field | Content | Source |
|---|---|---|
| Life domains | Career, relationships, wealth, health — full paragraphs | `archetypeSource.js` → `TG_CARD_DATA[tg].lifeDomains.*` |
| Decision style | Full paragraph | `archetypeSource.js` → `TG_CARD_DATA[tg].decisionStyle` |
| Communication style | Full paragraph | `archetypeSource.js` → `TG_CARD_DATA[tg].communicationStyle` |
| Hidden trait | The interior layer | `archetypeSource.js` → `TG_CARD_DATA[tg].hiddenTrait` |
| People (six relations) | Who this TG represents in the user’s life | `archetypeSource.js` → `TG_CARD_DATA[tg].people` |
| Event signatures | What to expect when this TG activates in a luck period | `archetypeSource.js` → `TG_CARD_DATA[tg].liunian` |
| Catalyst & friction full | Complete analysis of activating and compressive forces | `archetypeSource.js` → `STEM_CARD_DATA[stem].manual.catalyst` + `manual.resistance` |
| Compound card teaser | `hook` (full) + `dynamic` (full) + `your_gift` (first sentence only) | `DomEnergyTg_Data.js` → compound archetype card |

### Absent Energy Card

**Trigger:** Any element scoring zero or near-zero in the chart calculation.

**Shown in:** Free tier. This is intentionally free — absent elements are psychologically compelling and serve as a hook that organic sharing and upgrade curiosity both benefit from.

**Content:** Names the missing element, describes what structural absence means behaviourally (not as a deficiency but as a structural characteristic), and what activating that element looks like. Sources from `archetypeSource.js` → `STEM_CARD_DATA[absentStem].energy.what` and `energy.represents` for the absent element’s nature.

---

## §4 — Data Architecture & Field Reference

### Source of truth: `archetypeSource.js`

`archetypeSource.js` is the single source of truth for all field names, reading templates, and knowledge-pool content. It holds:

- **STEM_CARD_DATA** — 10 entries (one per stem: 甲乙丙丁戊己庚辛壬癸). The complete stem energy and manual reference data.
- **TG_CARD_DATA** — 10 entries (one per Ten God: 比肩 劫财 食神 伤官 偏财 正财 七杀 正官 偏印 正印). The complete Ten God personality, domain, and context data.

An identical HTML copy exists as a parallel editing surface. The JS file and the HTML file must always have matching content. When a field name is defined or changed, `archetypeSource.js` (and its HTML twin) is the authority — all downstream files follow.

### Archetype data file 1: `ElementNature_DATA.js`

150 archetype reading templates keyed by `stem_band_tgPattern` (e.g. `甲_concentrated_pure`). Each entry is a pure personality and behavioral interpretation of that energy configuration — what this energy means as a person.

**These entries do not contain `energy.*` or `manual.*` fields.** The energy fields describe the element as an external environmental force, and the manual fields describe catalyst/resistance mechanics. Both of those belong at the stem level in `archetypeSource.js`. The 150 archetype entries interpret the energy configuration into personality traits and behavior patterns only — they need to know what this energy represents psychologically but not any objects or representations beside the person themselves.

Field names follow `archetypeSource.js`. Schema TBD — will be defined when `archetypeSource.js` content authoring is complete.

### Archetype data file 2: `DomEnergyTg_Data.js`

50 compound archetype cards keyed by `domEl_specificTenGod` (e.g. `金_七杀`). Each entry is a 13-field compound card — the deepest content layer in the system. Source for Pro compound teasers and self-report synthesis. See §6 for the full 13-field schema.

Field names follow `archetypeSource.js`.

### STEM_CARD_DATA fields (in `archetypeSource.js`)

One entry per stem (10 total).

#### `energy.*` — the stem as an external environmental force

| Field | Type | Description | Tier |
|---|---|---|---|
| `energy.keywords[]` | string[] | 4–5 environmental quality chips | Free |
| `energy.what` | string | What this elemental force is — classical description in plain language | Free (DM intro + absent energy) |
| `energy.represents` | string | What this energy looks like in the real world / environment | Free (DM intro + absent energy) |
| `energy.liunian` | string | What to expect when this element activates in a luck period or annual pillar | Pro |

#### `manual.*` — how to work with this energy

| Field | Type | Description | Tier |
|---|---|---|---|
| `manual.concentrated` | string | What happens when this element is overpowering | Free (Elemental Nature card) |
| `manual.open` | string | What happens when this element is weak or absent | Free (Elemental Nature card) |
| `manual.catalyst` | string | How to seek and leverage this energy as a catalyst | Free teaser — Pro full |
| `manual.resistance` | string | How to release and channel this energy when it creates friction | Pro |

### TG_CARD_DATA fields (in `archetypeSource.js`)

One entry per Ten God (10 total).

#### Identity and realm

| Field | Type | Description | Tier |
|---|---|---|---|
| `realmPhrase` | string | The ruling realm — short phrase naming what this TG governs | Free |
| `realmDesc` | string | Ruling realm description — what this domain means structurally | Free |
| `chips[]` | string[] | 4–5 personality adjective chips | Free |

#### Personality core

| Field | Type | Description | Tier |
|---|---|---|---|
| `personalityParagraph` | string | Short paragraph: what this TG says about the user’s nature | Free |
| `gift[]` | string[] | Core gift bullets — what this TG produces at its best | Free (first 2–3) — Pro (all) |
| `shadow[]` | string[] | Core shadow bullets — what this TG costs at excess | Free (first 1–2) — Pro (all) |

#### Behavioural depth

| Field | Type | Description | Tier |
|---|---|---|---|
| `decisionStyle` | string | How this TG pattern drives decision-making | Pro |
| `communicationStyle` | string | How this TG pattern shapes communication | Pro |
| `hiddenTrait` | string | The interior layer — what’s running beneath visible behaviour | Pro |

#### Life domains

| Field | Type | Description | Tier |
|---|---|---|---|
| `lifeDomains.career` | object | Career domain: name, mechanism, full paragraph | Pro |
| `lifeDomains.relationships` | object | Relationships domain: name, mechanism, full paragraph | Pro |
| `lifeDomains.wealth` | object | Wealth domain: name, mechanism, full paragraph | Pro |
| `lifeDomains.health` | object | Health domain: name, mechanism, full paragraph | Pro |

#### Context and timing

| Field | Type | Description | Tier |
|---|---|---|---|
| `people` | string | Who this TG represents in the user’s relational world (六亲) | Pro |
| `liunian` | string | Event signatures when this TG activates in a luck period | Pro |
| `liunianLabel` | string | Short label for the liunian section header | Pro |

### Internal constants (in `archetypeSource.js`)

The following data is part of the knowledge pool but is used exclusively by the self-report synthesis pass (Pipeline B) as grounding context. It lives in `archetypeSource.js` because it is knowledge-pool content — `batchGenerate.js` imports it at synthesis time. It is never served to users and is never stored in the archetype data files.

#### CLASSICAL_STEM_ANCHORS

Internal verification layer. Referenced by the synthesis pass for accuracy grounding.

| Field | Description |
|---|---|
| `principle` (zh) | Classical principle in Chinese |
| `translation` | Plain English rendering |
| `source` | Classical text attribution |
| `derivation` | What this principle means for the archetype |
| `ceiling` | Max behavioral claims per SOURCE-FROM entry |

#### CLASSICAL_TG_ANCHORS

Same structure as CLASSICAL_STEM_ANCHORS. Internal verification only.

#### BINGYI_FRAMING

Universal catalyst/remedy framing. Used as synthesis pass context.

| Field | Description |
|---|---|
| `principle_zh` / `principle_en` | The 病药说 principle |
| `catalystRule` | The catalyst-specifies-not-rescues rule |
| `writingForbidden[]` | Phrases that must never appear in any reading |
| `writingRequired[]` | Framing that must govern all catalyst writing |

#### PILLAR_STAGE

VERIFY-ONLY. Conditional use in readings when chart concentration justifies it. See DOC3 §2.7.

---

## §5 — Voice and Quality Rules

### The jargon-free principle

All BaZi technical terms are engine inputs only. They never appear in user-facing text. For the full translation protocol, see DOC3 PART 8 (§8.1–§8.11).

**Permanently banned from all user-facing output (complete list in DOC3 §8.9):**
Day Master, Ten Gods, Food God, Hurt Officer, Seven Killings, Direct Officer, Parallel Self, Rob Wealth, Direct Wealth, Indirect Wealth, Direct Seal, Indirect Seal, Pure, Rooted, Flowing, Forging, Tested, Bazi, Ba Zi, Four Pillars, the universe, cosmic, destiny, fate, zodiac, spiritual, tapestry, empowered, genuinely, fundamentally, at your core, in essence

### Translation table (technical → reading language)

| Technical input | Reading language |
|---|---|
| Yang Metal, extremely strong | “You have an unusually stable core. Your sense of what is true arrives before the conversation does.” |
| Missing Fire / no Officer stars | “The part of you that gets shaped by external authority — it was born quiet. You’ve never been easily moulded by institutions. This isn’t rebellion. It’s architecture.” |
| Strong self energy (比劫 dominant) | “Your self-direction is structural, not chosen. You have a strong inner axis that doesn’t require external confirmation to feel real.” |
| Output-to-wealth pattern | “Your creativity is your financial engine. The more directly your work carries your fingerprints, the more naturally success follows.” |
| Unmediated authority pressure | “Something external will press on you and ask: is the edge real? Is the work real?” |
| Framework-mediated recognition | “The possibility of genuine recognition — not performance-based praise, but the kind that arrives when someone with standing encounters the real quality of what you’ve built.” |

For the complete vocabulary lock and idiom bridges, see DOC3 §8.

### Voice specifications

**Person:** Second person (“you”, “your”) throughout all reading content. Never third person.

**Tense:** Present tense for nature and character. Past tense for past life stages. Possibility framing for future.

**Register:** Wise mentor. Emotionally intelligent friend. Not a therapist. Not a horoscope.

**Validation sequence:** Name what is genuinely true and affirming before naming what is hard. The reader needs to feel seen before they can hear the challenge.

**Required patterns:**
- Every claim traceable to a specific computed chart element
- Honest complexity: every strength has a shadow — name both
- Practical orientation: always land on “what does this mean for how I live”
- The person’s agency: the chart describes weather, not fate

**Forbidden patterns:**
- Generic affirmations: “You are destined for greatness”
- Mystical obfuscation: “The cosmic energies align to…”
- False precision: “On March 14th you will…”
- Catastrophizing: “You will face great difficulty…”
- Vague positives without chart grounding

### The five elemental voice registers

Every piece of reading content is voiced in the Day Master’s elemental register. Lock the register before writing a single word.

**METAL** — precise, direct, cool. Verdict-energy. Sentences arrive as conclusions. Short. Often ends on a noun or hard fact. No hedging. Warmth arrives through accuracy.
*Reference: “The audit was already running. You didn’t start it.”*

**WOOD** — reaching, restless, generative. Momentum-energy. Sentences lean forward. Builds. Ends on a possibility or direction not yet reached. Urgency without anxiety.
*Reference: “You’ve been building toward something you can’t quite name yet. That’s not a flaw in the plan — it is the plan.”*

**FIRE** — warm, scene-setting, relational. Presence-energy. Opens wide, closes on the specific human detail. The world this person moves through, not just the interior.
*Reference: “People feel it before you speak. The room is different when you’re in it — not because you tried to make it that way.”*

**EARTH** — weighted, patient, load-bearing. Gravity-energy. Sentences settle rather than reach. Measured. Often long before arriving at the point. Ends on something solid.
*Reference: “You’ve been the ground under other people’s feet for so long that you sometimes forget you’re also standing on it.”*

**WATER** — beneath the surface, fluid, withheld. Depth-energy. Suggests more than it names. Elliptical, incomplete-feeling. Trails off where Metal would conclude.
*Reference: “You knew before they finished the sentence. You usually do.”*

Cross-check before proceeding: read the first sentence back. Does it feel like it was written by this element? If a Metal reading could have been written by Earth, restart.

---

## §6 — Compound Archetype Cards

### What they are

50 pre-generated entries keyed by `domEl_specificTenGod` (e.g. `金_七杀`, `木_正官`). Each card is the deepest content layer in the system — the source of the self-report and the Pro compound teaser.

These are generated offline once, quality-checked, and stored in `DomEnergyTg_Data.js`. They are never generated at serve time.

The 50 keys:

| Dominant element | Ten Gods (10) |
|---|---|
| 金 Metal | 比肩 劫财 食神 伤官 偏财 正财 七杀 正官 偏印 正印 |
| 木 Wood | 比肩 劫财 食神 伤官 偏财 正财 七杀 正官 偏印 正印 |
| 火 Fire | 比肩 劫财 食神 伤官 偏财 正财 七杀 正官 偏印 正印 |
| 土 Earth | 比肩 劫财 食神 伤官 偏财 正财 七杀 正官 偏印 正印 |
| 水 Water | 比肩 劫财 食神 伤官 偏财 正财 七杀 正官 偏印 正印 |

### The 13-field schema

Each field serves a specific step in the user’s emotional arc: recognition → explanation → intimacy → relief → orientation.

```javascript
{
  // ── RECOGNITION ───────────────────────────────────────
  hook: "",
  // Stops the scroll. A recognisable statement about lived experience.
  // Must be specific to THIS compound — not derivable from TG or element alone.
  // ≤2 sentences. Pro teaser: shown in full.

  dynamic: "",
  // The “that’s why” field. What happens when these two elemental natures
  // meet through this TG mechanism. NOT two descriptions stapled together.
  // One paragraph. ≤80 words. Pro teaser: shown in full.

  // ── WHAT YOU ARE ─────────────────────────────────────
  your_gift: "",
  // What people consistently receive from being near this person.
  // Written from the outside looking in, then connecting inward.
  // ≤60 words. Pro teaser: first sentence only.

  your_scene: "",
  // The recurring situation that keeps finding this person in different forms.
  // The “oh my god yes” field. Self-report only.
  // ≤70 words.

  // ── YOUR INTERIOR ────────────────────────────────────
  your_interior: "",
  // The private experience of being this person. Self-report only.
  // The “how did it know that” moment.
  // ≤80 words.

  your_tension: "",
  // The productive conflict that cannot be resolved and shouldn’t be.
  // Framed as generative, not as a flaw. Self-report only.
  // ≤60 words.

  // ── WHAT THIS PRODUCES ──────────────────────────────
  your_fuel: "",
  // The specific conditions that activate this compound.
  // Concrete and behavioural. Self-report only. ≤60 words.

  your_cost: "",
  // The shadow that only this combination creates. Self-report only.
  // Framed with compassion and structural honesty. Never diagnostic.
  // ≤70 words.

  your_build: "",
  // What this compound builds toward as a life arc. Self-report only.
  // ≤50 words.

  // ── CONDITIONS ─────────────────────────────────────────
  running_well: "",
  // Specific signals this combination is in its best state. Self-report only.
  // ≤60 words.

  off_track: "",
  // Specific signals this combination is depleted. Self-report only.
  // ≤60 words.

  // ── RELATIONAL ────────────────────────────────────────
  your_person: "",
  // The relational texture this compound produces. Self-report only.
  // ≤70 words.

  one_line: "",
  // The crystallising sentence. 15–35 words. Could only describe this exact compound.
  // Self-report only — used as the closing line of the narrative.
}
```

### Field tier assignment

| Field | Free | Pro teaser | Self-Report |
|---|---|---|---|
| `hook` | ✗ | ✓ full | ✓ |
| `dynamic` | ✗ | ✓ full | ✓ |
| `your_gift` | ✗ | ✓ first sentence | ✓ |
| `your_scene` | ✗ | ✗ | ✓ |
| `your_interior` | ✗ | ✗ | ✓ |
| `your_tension` | ✗ | ✗ | ✓ |
| `your_fuel` | ✗ | ✗ | ✓ |
| `your_cost` | ✗ | ✗ | ✓ |
| `your_build` | ✗ | ✗ | ✓ |
| `running_well` | ✗ | ✗ | ✓ |
| `off_track` | ✗ | ✗ | ✓ |
| `your_person` | ✗ | ✗ | ✓ |
| `one_line` | ✗ | ✗ | ✓ |

---

## §7 — Generation Pipeline

All generation lives in `batchGenerate.js`. It imports internal-only constants (`CLASSICAL_STEM_ANCHORS`, `CLASSICAL_TG_ANCHORS`, `BINGYI_FRAMING`, `PILLAR_STAGE`) from `archetypeSource.js` for use as synthesis grounding context.

### Pipeline A — Compound Archetype Cards (offline, one-time)

Generates all 50 `domEl_specificTenGod` compound archetype cards. Run once before launch. Output stored in `DomEnergyTg_Data.js`.

```
node batchGenerate.js generate-compound
↓
node batchGenerate.js retrieve-compound [id]
↓
node batchGenerate.js check-compound          ← runs qualityCheckCompound() on all 50
↓
node batchGenerate.js merge-compound          ← writes to DomEnergyTg_Data.js
```

**Quality gate:** All 13 fields present and within character limits. FORBIDDEN terms absent. No Chinese characters in output. Anti-genericity check on `hook`. See `qualityCheckCompound()` in `batchGenerate.js`.

**Cost estimate:** ~$6–10 for 50 keys at one pass.

### Pipeline B — Self-Report Synthesis (on purchase, per user)

This is the primary ongoing function of `batchGenerate.js`. Triggered when a user purchases a self-report. Runs in ~20–30 seconds.

**Inputs:**
1. User’s computed chart summary (stem, band, tgPattern, dominant elements, dominant TGs, element scores)
2. Relevant compound archetype cards from `DomEnergyTg_Data.js` (1–2 cards matching the user’s dominant energies)
3. Internal grounding context from `archetypeSource.js`: `CLASSICAL_STEM_ANCHORS` and `CLASSICAL_TG_ANCHORS` — inform the LLM’s accuracy but never appear in the output
4. Internal writing constraints from `archetypeSource.js`: `BINGYI_FRAMING` rules as system-level framing

**Output:** A single synthesized narrative following the 13-field schema. Voiced in the Day Master’s elemental register. 2AM thought integrated organically — not listed as a standalone field.

**Synthesis prompt structure:**
```
SYSTEM:
You are synthesizing a self-report narrative for a specific person from pre-generated
archetype card fields. Your role is editor, not writer. The fields contain the true
statements about this archetype. Your job: sequence them into a flowing narrative,
voice them in the correct elemental register, and integrate the 2AM thought organically.

CONTEXT:
Chart: [stem] [band] [tgPattern]
Dominant energies: [domEl1] via [tg1] / [domEl2] via [tg2]
DM voice register: [register description]

COMPOUND CARD(S):
[Full compound card fields for each relevant domEl_specificTenGod key]

INTERNAL CONTEXT (inspiration only — do not reproduce directly):
[CLASSICAL_STEM_ANCHORS and CLASSICAL_TG_ANCHORS for accuracy grounding]
[BINGYI_FRAMING for catalyst writing constraints]

CONSTRAINTS:
- Output must follow the 13-field JSON schema exactly
- 2AM thought must be integrated organically, not as a labelled field
- All translation protocol rules apply (DOC3 §8)
- Voice register: [element] throughout
- Never reproduce compound card field text verbatim — synthesise, compress, and voice

OUTPUT: Valid JSON with exactly 13 fields.
```

**Quality gate:** Same checks as Pipeline A. Additionally: narrative coherence check — the synthesis must read as a single document, not 13 separate paragraphs.

---

## §8 — Profile Data Enrichment (Pending)

> **Flagged for future work.** The following enrichment pass is required before launch but is not part of the current architecture sprint.

The profile data fields documented in §4 must be enriched and re-categorised before Pro tier launch. The source of truth (`archetypeSource.js` and its HTML twin) will be edited directly, and downstream archetype data files updated to match. Current `TG_CARD_DATA` fields in `archetypeSource.js` were written at an earlier stage of the project and need to be:

1. **Audited** against the translation protocol (DOC3 §8) — any Chinese characters or BaZi jargon in user-facing fields flagged and rewritten
2. **Enriched** — `personalityParagraph`, `decisionStyle`, `communicationStyle`, `hiddenTrait`, and all life domain fields deepened to Pro-tier quality
3. **Banded** — stem energy content eventually scaled to concentrated / balanced / open variants (currently one version per stem)
4. **Field-categorised** — each field explicitly tagged with its tier (Free / Pro / Internal) in the data structure for clean API filtering

This work is tracked separately and does not block the compound card generation pipeline.

---

## Document Metadata

| | |
|---|---|
| **Document** | Doc 4 — Generation Architecture & Reading Content Guide |
| **Last Updated** | 2026-04-11 |
| **Version** | 3.1 · April 2026 |
| **Status** | Current — replaces all prior versions |
| **Audience** | Engineers, content team, generation system |
| **Replaces** | v2.x three-pass pipeline (portrait prewrite → persona card → reading schema) |
| **Compatible with** | Doc 2 v1.1 · Doc 3 v1.2 · Doc 6 v1.1 |

## Version History

| Version | Date | Changes |
|---|---|---|
| 3.1 | April 2026 | Data architecture restructured. `archetypeSource.js` established as single source of truth for field names and reading templates. Archetype data split into `ElementNature_DATA.js` (150 personality/behavioral templates) and `DomEnergyTg_Data.js` (50 compound cards). Internal constants (CLASSICAL_STEM_ANCHORS, CLASSICAL_TG_ANCHORS, BINGYI_FRAMING, PILLAR_STAGE) remain in `archetypeSource.js` as knowledge-pool content, imported by `batchGenerate.js` at synthesis time. COMPOUND_CARDS removed from `archetypeSource.js` (now in `DomEnergyTg_Data.js`). Generation script narrowed to self-report synthesis (Pipeline B) as primary ongoing function. |
| 3.0 | April 2026 | Complete rewrite. New three-tier product architecture (Free / Pro / Self-Report). Profile data as single source of truth for Free and Pro. Compound archetype cards as self-report source. Old three-pass generation pipeline retired. 150 archetype keys locked. Full profile data field reference added. |
| 2.x | April 2026 | Three-pass pipeline: portrait prewrite → persona card → reading schema. Layer 2 angles. Compound cards introduced. |
| 1.0 | — | Initial architecture. |
