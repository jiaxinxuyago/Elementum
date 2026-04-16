# Elementum · Doc 4 — Generation Architecture & Reading Content Guide

> **Version 4.3 · April 2026**
> This document replaces all prior generation architecture. The old three-pass pipeline (portrait prewrite → persona card → reading schema) is retired. `archetypeSource.js` is the single source of truth for all field names, reading templates, and knowledge-pool content. Two pre-generated serving files exist: `STEM_CARD_DATA.js` (150 configuration-specific entries) and `DomEnergyTg_Data.js` (50 compound archetype cards). Generated content beyond those files is limited to the self-report synthesis pass (on purchase).

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

Two pre-generated serving files derive their content from `archetypeSource.js`:

- **`STEM_CARD_DATA.js`** — 150 entries keyed by `stem_band_tgPattern` (e.g. `庚_concentrated_pure`). Contains configuration-specific `psychCore` (phrase + desc) and `gifts[]` / `shadows[]` (phrase + desc) for each of the 150 archetype configurations. Generated offline via Pipeline A. These fields vary meaningfully by band and tgPattern and are LLM-generated with `archetypeSource.js` as grounding context.
- **`DomEnergyTg_Data.js`** — 50 compound archetype cards keyed by `domEl_specificTenGod`. The deepest content layer — source for Pro compound teasers and self-report synthesis. Generated offline via Pipeline A.

`archetypeSource.js` serves hand-authored content directly: `blocks[]` (variant schema, runtime-resolved), `manual.*`, `energy.*`, and all `TG_CARD_DATA` fields. `STEM_CARD_DATA.js` and `DomEnergyTg_Data.js` are the pre-generated layers on top.

No LLM calls are made at serve time for Free or Pro content. Every field served at those tiers is a static read from `archetypeSource.js`, `STEM_CARD_DATA.js`, or `DomEnergyTg_Data.js`. The only runtime generation is:

1. **On purchase** — Self-report synthesis pass via `batchGenerate.js`: takes the user’s relevant compound cards from `DomEnergyTg_Data.js` + chart context, produces a 13-field narrative in ~20–30 seconds

### The file structure

```
Code/
├── archetypeSource.js      ← Source of truth. Hand-authored. Defines all field names.
│                              STEM_CARD_DATA: 10 stems — blocks[] (variant schema,
│                              runtime-resolved), manual.*, energy.*, and grounding
│                              content for LLM generation passes.
│                              TG_CARD_DATA: 10 Ten Gods — flat fields, context-layered.
│                              Has an identical HTML twin (elementum_profile_database.html).
│                              Internal constants (CLASSICAL_STEM_ANCHORS,
│                              CLASSICAL_TG_ANCHORS, BINGYI_FRAMING, PILLAR_STAGE)
│                              used by batchGenerate.js at synthesis time.
├── STEM_CARD_DATA.js       ← 150 stem_band_tgPattern entries. Pre-generated offline
│                              via Pipeline A. Fields: psychCore (phrase + desc),
│                              gifts[] (phrase + desc × 3), shadows[] (phrase + desc × 3).
│                              Keyed by stem_band_tgPattern (e.g. 庚_concentrated_pure).
├── DomEnergyTg_Data.js     ← 50 domEl_specificTenGod compound archetype cards.
│                              Self-report source + Pro compound teaser.
│                              Pre-generated offline via Pipeline A.
├── Elementum_Engine.jsx    ← Calculation engine + UI components.
└── batchGenerate.js        ← Pipeline A (offline generation) + Pipeline B (self-report
                               synthesis on purchase). Imports internal constants from
                               archetypeSource.js.
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
| Dominant Energy Cards (top 2) | Visual hierarchy — proportional card weight. TG layer: title, ruling realm (`rulingRealm`), behavioral chips, outputs (`outputs[]`), frictions (`frictions[]`) | `archetypeSource.js` → `TG_CARD_DATA[tg].*` free-tier fields |
| Catalyst / Resistance teasers | Accurate but incomplete — names the catalyst/resistance without full analysis | `archetypeSource.js` → `STEM_CARD_DATA[stem].manual.catalyst` (teaser only) |
| Ghost cards | Faint outlines of locked energies 3–5 | UI only — no content |
| Absent energy card *(if applicable)* | Special sticky card for any element with zero or near-zero chart presence | `archetypeSource.js` → `STEM_CARD_DATA[stem].energy.*` (absent element) |

### Pro tier — what is shown

All Free tier content, plus:

| Section | Content | Source |
|---|---|---|
| All 5 dominant energies | Full cards, no ghost treatment | `archetypeSource.js` → `TG_CARD_DATA[tg].*` |
| Hidden dynamic | Inner mechanism beneath surface behaviour — the force described as a mechanism, not a personality trait | `archetypeSource.js` → `TG_CARD_DATA[tg].hiddenDynamic` |
| Domain signatures | Career, relationships, wealth, health — rendered at sig ≥ 3 by default; sig-tagged per TG with `sig_female`/`sig_male` gender overrides where 六亲 applies | `archetypeSource.js` → `TG_CARD_DATA[tg].domainSignatures.*` |
| Six relations | Classical 六亲 — what this TG represents in the user's relational world | `archetypeSource.js` → `TG_CARD_DATA[tg].sixRelations` |
| Event signatures | What a luck period or annual pillar governed by this TG brings — unified event pattern narrative | `archetypeSource.js` → `TG_CARD_DATA[tg].liunianSignatures` |
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

The Ten God layer sits *inside* each dominant energy card as a subsection. It is a 9-section schema — each section answers a distinct question about the force operating in the chart. The layer does not re-describe the DM’s nature (that is Layer 1’s job); it describes what this force does, produces, and costs.

Every TG card is governed by a **locked reading angle** — a single lens that applies to every field in that card. See §4 for the full governing angle table.

**9-section TG card schema:**

| # | Section | Tier | Field | Content |
|---|---|---|---|---|
| ① | Header | FREE | `title` | Poetic name (“The Trial”) + one-line descriptor |
| ② | Ruling Realm | FREE | `rulingRealm: { phrase, desc }` | The psychological territory this TG governs — unique to TG, no base energy equivalent |
| ③ | Chips | FREE | `chips[]` | 5 TG-specific behavioral tags — moved here from base energy |
| ④ | Outputs | FREE | `outputs[]: { phrase, desc }` × 3 | What this force generates when well-placed. Named phrase + one sentence. Mechanical framing: “this force produces X.” |
| ⑤ | Frictions | FREE | `frictions[]: { phrase, desc }` × 3 | Structural patterns when this force is misaligned. NOT character flaws — mechanical tensions. “When this force operates without X, it produces Y.” |
| ⑥ | Hidden Dynamic | PRO | `hiddenDynamic` | One paragraph. The inner mechanism beneath the surface behaviour — describe the mechanism, not the person |
| ⑦ | Domain Signatures | PRO | `domainSignatures: { career, relationships, wealth, health }` each `{ sig, mechanism, text }` | What this TG mechanism produces in each domain. Rendered by sig weight. Primary TG (Layer 2) gets full weight on its highest-sig domains. Secondary TG (Layer 3) is optimised around the primary’s territory — see §10 |
| ⑧ | Six Relations | PRO | `sixRelations` | Classical 六亲 — what this TG represents in the user’s relational world |
| ⑨ | Event Signatures | PRO | `liunianSignatures` | One narrative paragraph — what this TG luck period or annual pillar brings. Unified event pattern, not per-domain |

**Removed from TG:** `decisionStyle` (covered by “How you make decisions” block in base energy), `communicationStyle` (characterological — belongs to the person, not the force), `hiddenTrait` (replaced by `hiddenDynamic` with corrected framing — mechanism not person).

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

### Archetype data file: `DomEnergyTg_Data.js`

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

One entry per Ten God (10 total). Each entry follows the 9-section schema. Every field is authored through the TG’s **locked governing angle** — the single lens that governs what this card is about.

#### Governing angles — locked per TG

Every field in a TG card is written through its governing angle. This is not a label — it is the authoring constraint that keeps all 9 sections coherent and prevents overlap with other TG cards.

| TG | Governing angle |
|---|---|
| 比肩 | Self-amplification and the rival dynamic — the force that mirrors, competes, and reinforces without external correction |
| 劫财 | Cross-polarity self-reference and resource competition — the force that takes what it touches, disrupts, and redistributes |
| 食神 | Creative output and effortless nourishment — the force that expresses without friction and sustains what it feeds |
| 伤官 | Expression that exceeds its container — the force that generates beyond what holds it, often against the framework |
| 偏财 | Distributed material direction — the force that ranges broadly across what it controls, opportunistic and wide |
| 正财 | The standard applied to what is held — methodical, earned, evaluative; the force that builds and then audits what was built |
| 七杀 | Pressure that forges — the force that tests whether the edge is real; does not grant permission, demands proof |
| 正官 | The standard that legitimises — the force that recognises quality, grants standing, and defines the framework |
| 偏印 | The unconventional resource — the force that nourishes through unusual channels; skills, credentials, indirect support |
| 正印 | The pure nourishing source — the force that opens, sustains, and protects; the most direct form of support |

#### Field reference — 9-section schema

| # | Field | Type | Description | Tier |
|---|---|---|---|---|
| ① | `title` | string | Poetic name ("The Trial") + one-line descriptor | Free |
| ② | `rulingRealm.phrase` | string | Short phrase naming the psychological territory this TG governs | Free |
| ② | `rulingRealm.desc` | string | One paragraph — what this domain means structurally | Free |
| ③ | `chips[]` | string[] | 5 TG-specific behavioral tags — moved here from base energy | Free |
| ④ | `outputs[].phrase` | string | Named evocative phrase — what this force generates when well-placed | Free |
| ④ | `outputs[].desc` | string | One sentence — mechanical framing: "this force produces X" | Free |
| ⑤ | `frictions[].phrase` | string | Named evocative phrase — structural pattern when this force is misaligned | Free |
| ⑤ | `frictions[].desc` | string | One sentence — "when this force operates without X, it produces Y" | Free |
| ⑥ | `hiddenDynamic` | string | One paragraph — the inner mechanism beneath surface behaviour. Describe the mechanism, not the person | Pro |
| ⑦ | `domainSignatures.career` | `{ sig, mechanism, text }` | Career domain pattern. `sig` = significance weight (1–5). `mechanism` = one-line force mapping. `text` = full paragraph | Pro |
| ⑦ | `domainSignatures.relationships` | `{ sig, sig_female, sig_male, mechanism, text }` | Relationship domain. Gender overrides on sig where 六亲 partner star logic applies | Pro |
| ⑦ | `domainSignatures.wealth` | `{ sig, mechanism, text }` | Wealth domain | Pro |
| ⑦ | `domainSignatures.health` | `{ sig, mechanism, text }` | Health domain | Pro |
| ⑧ | `sixRelations` | string | Classical 六亲 — what this TG represents in the user’s relational world | Pro |
| ⑨ | `liunianSignatures` | string | One narrative paragraph — what this TG luck period or annual pillar brings. Unified event pattern | Pro |

**Removed fields:** `decisionStyle` (covered by base energy block "How you make decisions"), `communicationStyle` (characterological — belongs to person, not force), `hiddenTrait` (replaced by `hiddenDynamic` with corrected framing), `personalityParagraph` (replaced by outputs/frictions mechanical framing).

#### Domain significance — sig tags

The `sig` tag on each domain field is a **content selection filter** and a **cross-TG weight anchor** (see §10 for the full compound coverage protocol). Within a single TG card, sig controls prominence. Across TG cards (Layer 2 vs Layer 3), sig determines which TG has primary territory over which domain — the secondary TG’s content is optimised around the primary’s highest-sig domains.

**Significance scale:**

| sig | Meaning | Rendering in single card | Role in compound stack |
|---|---|---|---|
| 5 | Primary — this TG most directly governs this domain | Full prominence, surfaced first | Locks this domain as primary TG territory — secondary TG covers different angle |
| 4 | High — strong and frequent influence | Full prominence | Primary TG territory unless secondary TG also at 5 |
| 3 | Moderate — meaningful but not defining | Normal weight | Secondary TG can cover this domain at its own angle |
| 2 | Secondary — indirect influence | Condensed | Secondary TG does not duplicate — surfaces own primary |
| 1 | Minimal — rarely relevant | Omit unless requested | Excluded from compound rendering |

**Classical domain significance reference (locked):**

| TG | Career | Relationships | Wealth | Health |
|---|---|---|---|---|
| 比肩 | 3 | 4 | 2 | 2 |
| 劫财 | 3 | 3 | 5 | 2 |
| 食神 | 4 | 2 | 3 | 4 |
| 伤官 | 5 | 3 | 3 | 3 |
| 偏财 | 3 | 3 | 5 | 2 |
| 正财 | 3 | 3 | 5 | 2 |
| 七杀 | 5 | 4 | 3 | 4 |
| 正官 | 5 | 4 | 3 | 2 |
| 偏印 | 4 | 2 | 2 | 3 |
| 正印 | 4 | 3 | 2 | 4 |

**Gender note (relationships only):** 官杀 governs the partner relationship for female users; 财 for male users. `sig_female` / `sig_male` override only set where this applies. All other domains are gender-neutral.

**JavaScript schema:**
```javascript
{
  title: `The Trial`,
  rulingRealm: {
    phrase: `Authority That Forges`,
    desc: `[The psychological territory this TG governs — one paragraph]`,
  },
  chips: [`Challenging`, `Pressure-bearing`, `Unmediated`, `Rigorous`, `Forging`],
  outputs: [
    { phrase: `The Proof Under Pressure`, desc: `[One sentence — this force produces X]` },
    { phrase: `...`, desc: `...` },
    { phrase: `...`, desc: `...` },
  ],
  frictions: [
    { phrase: `The Force That Doesn’t Modulate`, desc: `[One sentence — when this force operates without X, it produces Y]` },
    { phrase: `...`, desc: `...` },
    { phrase: `...`, desc: `...` },
  ],
  hiddenDynamic: `[One paragraph — inner mechanism beneath surface behaviour. Mechanism, not person.]`,
  domainSignatures: {
    career: {
      sig: 5,
      mechanism: `七杀 pattern → institutional recognition through demonstrated quality under pressure, not through compliance`,
      text: `[Pro — what this force keeps creating in the career domain]`,
    },
    relationships: {
      sig: 4,
      sig_female: 5,  // 六亲: 官杀 is partner star for female users
      sig_male: null,
      mechanism: `七杀 pattern → intensity, challenge, and testing as the primary relational register`,
      text: `[Pro — what this force keeps producing in relationships]`,
    },
    wealth: {
      sig: 3,
      mechanism: `七杀 pattern → wealth through pressure-driven achievement, not through accumulation`,
      text: `[Pro — what this force produces in the wealth domain]`,
    },
    health: {
      sig: 4,
      mechanism: `七杀 pattern → health as a function of pressure load — the body absorbs what the pressure produces`,
      text: `[Pro — what this force signals in the health domain]`,
    },
  },
  sixRelations: `[Pro — classical 六亲 — what this TG represents in the user’s relational world]`,
  liunianSignatures: `[Pro — one narrative paragraph — what a 七杀 luck period or annual pillar brings]`,
}
```
*(Schema shown for 七杀 as reference — see §10 for full 火_七杀 illustrated example)*

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

### Teaser architecture — Free to Pro transition

**Rule:** Free teasers are purpose-built. They are not truncated Pro content. They are derived from Pro content and written specifically to function as a hook.

**Structure of every Section 1 (Elemental Nature) free teaser — 4 components in sequence:**

---

**① Archetype identity** — `psychCore.phrase` displayed prominently (serif, typographically distinct above the portrait). The named archetype: the single most distilled characterological statement for this stem. Examples: *The Structural Assessor*, *The Ascending Vine*. Displayed as the visual anchor; read before anything else.

---

**② Portrait** — `psychCore.desc` written in second person. 2–3 sentences maximum. Concise inner-experience statement: what it actually feels like to be wired this way from the inside. Not a description of the element — a description of the person's interior.

**Convention — `psychCore.desc` is always written in second person.** It serves double duty: internal synthesis reference AND the displayed portrait. No separate portrait field. When writing or updating any stem, the desc must be second person, present-tense, under 3 sentences.

This is the primary recognition landing point. The reader should feel *seen* before they reach the gifts and shadows.

---

**③ Gifts & Shadows panel** — 3 gifts and 3 shadows per stem, each as a named evocative phrase. Displayed as two columns.

- **Free tier:** phrase AND desc — both visible, no gate
- No pro expansion on gifts/shadows. The pro gate lives entirely in the 11 blocks and the TG domain signature sections.

**Phrase writing rule:** evocative enough to generate recognition on its own. The phrase is a named dimension of the person, not a label for a trait. *The Finished Too Early* works. *Tendency to rush* does not.

**Desc writing rule — one sentence, second person, distinct angle:**
- One sentence only. Sharp, specific, complete.
- Written in second person ("you", "your").
- Each of the six must cover a **genuinely distinct dimension** of the person — not variations of the same underlying trait from different angles.
- Gifts ≠ positive-side-of-core-trait. Shadows ≠ negative-side-of-core-trait. Together the six should feel like independent observations that give the reader a fuller self-portrait, not a balanced ledger.
- The shadow descs especially should NOT feel like the shadow side of the gifts. They should reveal entirely different aspects of how this person operates.

**Anti-pattern:** All six tracing back to one trait (e.g., "precision is an asset in situation A / B / C" and "precision creates friction in situation X / Y / Z"). This reads as a case study on one attribute, not a portrait.

**Schema:**
```javascript
gifts: [
  { phrase: `...`, desc: `...` },  // both [FREE] — one sentence, distinct angle
  { phrase: `...`, desc: `...` },
  { phrase: `...`, desc: `...` },
],
shadows: [
  { phrase: `...`, desc: `...` },  // both [FREE] — one sentence, distinct angle
  { phrase: `...`, desc: `...` },
  { phrase: `...`, desc: `...` },
],
```

The gifts/shadows panel replaces the generic keyword chips as the primary character signal in the teaser. Chips (`chips[]`) remain in the schema for metadata and search use but are not the primary display element within the teaser block.

---

**④ Block labels preview** — No `teaser` field. The pro gate shows the 11 block labels from `blocks[]` as a locked list. No explanatory paragraph. The labels are the hook.

The block labels are already written to be evocative questions directed at the reader — *"What you rarely admit"*, *"What holds you back without looking like it"*, *"The image and the interior"* — and they work precisely because they're unanswered. The reader fills the blank with their own uncertainty about what the reading might say about them specifically.

Three labels are visually highlighted (italic, slightly brighter) to draw the eye: the ones with the highest psychological charge. For 庚: *What you rarely admit*, *What holds you back without looking like it*, *The image and the interior*.

**No written door opener paragraph.** Any paragraph competing with the block labels dilutes them.

---

**Total free teaser:** Portrait (2–3 sentences) + phrases only in gifts/shadows panel + block labels preview. Total read time: under 45 seconds.

**The Pro version does not open with the teaser.** When a user upgrades, the Pro reading starts fresh and goes deeper — same subject, different entry point. A user upgrading should feel they are reading something new.

*The gifts and shadows phrases are the hook. The door opener names what's behind it.*

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

### Pipeline A — Offline generation (one-time, pre-launch)

Pipeline A covers two generation jobs, both run offline before launch. Total: **200 generation calls** (150 + 50).

---

#### Pipeline A1 — Base energy configurations (`STEM_CARD_DATA.js`)

Generates all 150 `stem_band_tgPattern` entries. Each config is an independent generation target — no collapsing band and pattern axes. Output stored in `STEM_CARD_DATA.js`.

**Fields generated per entry:** `psychCore` (phrase + desc), `gifts[]` (phrase + desc × 3), `shadows[]` (phrase + desc × 3).

**Generation inputs per call:**
1. Target config key: `stem`, `band`, `tgPattern`
2. Stem grounding from `archetypeSource.js`: the full `STEM_CARD_DATA[stem]` entry — `blocks[]`, `manual.*`, `energy.*` — as characterological reference
3. Band meaning: what `concentrated` / `balanced` / `open` means for DM energy level (from DOC4 §9 Rule 3)
4. tgPattern meaning: what dominant force family is operating and its implication for the DM (from DOC4 §9 Rule 4)
5. Voice register: the elemental register for this stem (Metal / Wood / Fire / Earth / Water — from DOC4 §5)
6. `BINGYI_FRAMING` writing constraints (from `archetypeSource.js`)

```
node batchGenerate.js generate-stem-configs
↓
node batchGenerate.js retrieve-stem-configs [id]
↓
node batchGenerate.js check-stem-configs     ← runs qualityCheckStemConfig() on all 150
↓
node batchGenerate.js merge-stem-configs     ← writes to STEM_CARD_DATA.js
```

**Quality gate:** `psychCore.phrase` is evocative and configuration-specific (not derivable from stem alone). `psychCore.desc` is second person, present tense, ≤3 sentences. Each gift/shadow phrase is distinct (no two from the same underlying trait). All six gifts/shadows cover independent dimensions. FORBIDDEN terms absent. No Chinese characters in output.

**Cost estimate:** ~$15–25 for 150 keys at one pass.

---

#### Pipeline A2 — Compound archetype cards (`DomEnergyTg_Data.js`)

Generates all 50 `domEl_specificTenGod` compound archetype cards. Output stored in `DomEnergyTg_Data.js`.

**Generation inputs per call:**
1. Target config key: `domEl`, `specificTenGod` (which implies the DM element)
2. DM stem grounding: `STEM_CARD_DATA[impliedDmStem]` from `archetypeSource.js`
3. TG grounding: `TG_CARD_DATA[specificTenGod]` from `archetypeSource.js`
4. Interaction description: the structural interaction narrative from DOC2 §3 (50-key taxonomy)
5. Voice register: the DM element's elemental register
6. `CLASSICAL_STEM_ANCHORS`, `CLASSICAL_TG_ANCHORS`, `BINGYI_FRAMING` from `archetypeSource.js`

```
node batchGenerate.js generate-compound
↓
node batchGenerate.js retrieve-compound [id]
↓
node batchGenerate.js check-compound         ← runs qualityCheckCompound() on all 50
↓
node batchGenerate.js merge-compound         ← writes to DomEnergyTg_Data.js
```

**Quality gate:** All fields present and within character limits. FORBIDDEN terms absent. No Chinese characters in output. Anti-genericity check on `hook` — must be specific to this `domEl_specificTenGod` combination, not derivable from either description alone. Coverage Rule A check: no field reads as a characterological description of the DM — every field must be force-mechanical (what the force generates, demands, costs). `mechanism` fields in `domainSignatures` must be force-mapping sentences (`TG pattern → outcome`), not personality descriptions. See §10 Rule A and Rule C.

**Cost estimate:** ~$6–10 for 50 keys at one pass.

### Pipeline B — Self-Report Synthesis (on purchase, per user)

This is the primary ongoing function of `batchGenerate.js`. Triggered when a user purchases a self-report. Runs in ~20–30 seconds.

**Inputs:**
1. User’s computed chart summary (stem, band, tgPattern, dominant elements, dominant TGs, element scores)
2. Layer 1 base energy entry from `STEM_CARD_DATA.js` — the user’s `stem_band_tgPattern` config: `psychCore`, `gifts[]`, `shadows[]`. Grounds the synthesis in who this person fundamentally is at this configuration.
3. Relevant compound archetype cards from `DomEnergyTg_Data.js` (1–2 cards matching the user’s dominant energies). Contains the interaction-specific content: what happens when this DM nature meets these dominant forces.
4. Internal grounding context from `archetypeSource.js`: `CLASSICAL_STEM_ANCHORS` and `CLASSICAL_TG_ANCHORS` — inform accuracy but never appear in output
5. Internal writing constraints from `archetypeSource.js`: `BINGYI_FRAMING` rules as system-level framing

**Output:** A single synthesized narrative document. Voiced in the Day Master’s elemental register. Weaves the Layer 1 base nature and Layer 2/3 force interactions into one unified portrait — not two sections joined together, but one arc where the base nature grounds everything the dominant forces reveal. 2AM thought integrated organically.

**Synthesis job:** The LLM’s role is editor and weaver, not writer. The Layer 1 entry provides the characterological foundation (who this person is). The compound cards provide the force interaction content (how that nature is expressed, challenged, and directed by the dominant energies). The synthesis task is making both speak as one portrait with a single voice throughout.

**Synthesis prompt structure:**
```
SYSTEM:
You are synthesizing a self-report narrative for a specific person from pre-generated
archetype content. Your role is editor and weaver, not writer. The content contains
the true statements about this person. Your job: weave the base nature and the force
interactions into a single unified portrait — one voice, one arc, not two sections.

CONTEXT:
Chart: [stem] [band] [tgPattern]
Dominant energies: [domEl1] via [tg1] / [domEl2] via [tg2]
DM voice register: [register description]

LAYER 1 — BASE NATURE ([stem_band_tgPattern]):
psychCore.phrase: [phrase]
psychCore.desc: [desc]
gifts: [gift phrases and descs]
shadows: [shadow phrases and descs]

LAYER 2/3 — FORCE INTERACTIONS:
[Full compound card fields for each relevant domEl_specificTenGod key]

INTERNAL CONTEXT (grounding only — do not reproduce directly):
[CLASSICAL_STEM_ANCHORS and CLASSICAL_TG_ANCHORS for accuracy]
[BINGYI_FRAMING for catalyst writing constraints]

CONSTRAINTS:
- The base nature is the foundation — the force interactions build on it, not alongside it
- Output must follow the 13-field self-report schema exactly
- 2AM thought integrated organically, not as a labelled field
- All translation protocol rules apply (DOC3 §8)
- Voice register: [element] throughout — single register, no switching
- Never reproduce source field text verbatim — synthesise, compress, and voice

OUTPUT: Valid JSON following the 13-field self-report schema.
```

**Pre-synthesis step — territory allocation:** Before the synthesis prompt runs, compute the Rule B domain territory map (§10 Rule B and Rule C): determine primary vs. secondary TG by element score, apply the sig-based allocation table across all four domains, and pass the territory map as an explicit constraint in the synthesis prompt. The synthesizer generates domain content per the allocated map — primary TG at full depth in its owned domains, secondary TG at distinct angles only.

**Quality gate:** All fields present and within character limits. FORBIDDEN terms absent. Narrative coherence check: the document must read as one portrait, not as a base-nature section followed by a force-interaction section. The `one_line` closing must crystallise both layers. Coverage check: no domain content in the synthesis output duplicates another layer's domain content — each layer's domain contribution covers a distinct mechanism (see §10 illustrated example).

---

## §9 — Block Content Schema and Authoring Rules

### Scope — base energy layer only

**The variant schema applies exclusively to `STEM_CARD_DATA[stem].blocks[]`.** It does not apply to `TG_CARD_DATA`.

| Data structure | Variant schema | Reason |
|---|---|---|
| `STEM_CARD_DATA[stem].blocks[]` | ✓ Yes — `bands`, `patterns`, `priority`, `text{}` | The DM's characterological reading genuinely shifts by band (how strong the DM energy is) and tgPattern (what dominant force is in the chart). A concentrated 庚 under authority pressure is structurally different from a balanced 庚 with self-amplifying energy. |
| `TG_CARD_DATA[tg].*` | ✗ No — flat fields only | The Ten God entries describe the TG force itself, not the DM configuration. 正财 (Direct Wealth) reads as 正财 regardless of whether the DM is concentrated or open. The specificity comes from the compound archetype card (`DomEnergyTg_Data.js`), which already keys on the DM element × specific TG interaction. |

Ten God content differentiation happens at the compound card layer (`DomEnergyTg_Data.js` keyed by `domEl_specificTenGod`) — not inside `TG_CARD_DATA` itself.

### TG_CARD_DATA — content authoring schema

`TG_CARD_DATA` entries are flat — no `bands`, `patterns`, `priority`, or `text{}` variant keys. The TG layer's selectivity mechanism is different: **domain significance tags** (`sig`, 1–5) control which domain sections are surfaced for each TG card. This is the TG equivalent of the band/pattern variant system — it determines what content renders, but through relevance filtering rather than text substitution.

**Authoring units and frames:**

| Field group | Fields | Authoring frame |
|---|---|---|
| Identity | `realmPhrase`, `realmDesc`, `chips[]` | Universal — describes the force's governing domain |
| Personality core | `personalityParagraph`, `gift[]`, `shadow[]` | Universal — what this force produces as personality traits |
| Behavioural depth | `decisionStyle`, `communicationStyle`, `hiddenTrait` | Context-layered — written assuming the user has already read their base energy portrait |
| Life domains | `domains.career`, `domains.relationships`, `domains.wealth`, `domains.health` | Domain-filtered by `sig` — full prominence at 4–5, condensed at 3, omitted at 1–2 |
| Context and timing | `people`, `liunian`, `liunianLabel` | Universal — who this TG represents in the user's relational world; what it signals in luck periods |

**Context-layered convention:** The behavioural depth fields (`decisionStyle`, `communicationStyle`, `hiddenTrait`) are written with the assumption that the user has already read their base energy portrait. They describe what the TG force does — how it shapes decisions, communication, and the interior — without re-establishing what the DM's nature is. The TG text layers on top of known base energy context; it doesn't rebuild it.

The DM × TG synthesis (the specific way this force bends *this* DM's nature) happens at the compound card layer (`DomEnergyTg_Data.js`, keyed by `domEl_specificTenGod`), not inside `TG_CARD_DATA` itself. `TG_CARD_DATA` describes the force. The compound card synthesises the interaction.

**Domain sig schema:**

```javascript
domains: {
  career: {
    sig: 5,   // content selection filter — how relevant is the career question for this TG?
    text: `[Pro — what career pattern does this TG keep creating?]`,
  },
  relationships: {
    sig: 3,
    sig_female: 5,  // 六亲 override — only set where classical theory shifts partner significance
    sig_male: null, // null = same as sig; omit where gender doesn't change significance
    text: `[Pro — what relationship dynamic does this TG produce?]`,
  },
  wealth: {
    sig: 5,
    text: `[Pro — what wealth pattern does this TG create?]`,
  },
  health: {
    sig: 2,
    text: `[Pro — what health signal does this TG produce?]`,
  },
},
```

**Domain rendering thresholds:**

| sig | Rendering |
|---|---|
| 5 | Full prominence, surfaced first |
| 4 | Full prominence |
| 3 | Normal weight |
| 2 | Condensed |
| 1 | Omit unless user requests |

**Authoring rule — write to the domain's sig, not to a generic template.** A sig-5 domain field (e.g. wealth for 正财) carries the weight of the primary reading question for that TG. A sig-2 field is a structural footnote — accurate, brief. Don't write a sig-2 field at sig-5 depth. The sig tag is both a rendering instruction and an authoring scope signal.

---

### Block library design — topic selection as the primary mechanism

The block system is **a topic library, not a fixed list.** Each stem has a library of 15–18 block topics. The selector serves 7–9 per config. The reading a user gets is genuinely different from another config's reading — not just worded differently, but asking different questions.

**Three categories of blocks:**

**Universal blocks** — apply to all bands and all patterns. These describe the DM's fundamental characterological nature, present regardless of configuration. For 庚: "What you're genuinely good at", "What you rarely admit", "The image and the interior". Always in the candidate pool.

**Band-specific blocks** — only relevant for certain DM energy levels. The topic itself only makes sense for that band:
- `concentrated` only: "The self-referencing loop" — when extreme DM energy has no dominant external force, the evaluative apparatus runs on itself. Not relevant for open or balanced.
- `open` only: "What happens when the precision doesn't close" — the experience of the evaluative capacity running without reaching verdicts. Not relevant for concentrated.

**Pattern-specific blocks** — only relevant when a certain dominant force is operating. The topic is specific to the DM-TG interaction:
- `tested` only: "How you navigate authority pressure" — what 官杀旺 does to the DM's nature. Irrelevant for pure or rooted.
- `flowing` only: "Where the precision goes when it converts to output" — what 食伤旺 does with the DM's core energy. Irrelevant for forging.
- `forging` only: "What directing the precision toward material outcomes produces" — 财旺 specific.
- `rooted` only: "What it means when the resource is available" — 印旺 specific, when the DM is being nourished rather than tested.

**The selector IS the significance filter.** The `priority{}` system ranks blocks within the candidate pool. Blocks with higher priority for a given config are the most significant and insightful for that specific configuration. The top 7–9 are served. This is the conditional/significance-weighted reading — different configs get genuinely different topic rosters.

**Authoring philosophy shift:** When designing blocks for a stem, do not ask "what are the 11 questions to ask every user of this stem?" Ask instead: "what is the full vocabulary of reading angles for this element, and which configs does each angle actually serve?" The topic design comes first; the text is written to that topic for the eligible configs.

---

### The problem this solves (base energy blocks)

The 11 reading blocks in `blocks[]` were static text — written once and served identically to every user of a given stem regardless of whether their chart is `concentrated_pure` or `open_flowing`. The same text that's accurate for a 庚 with extreme Metal self-amplification is partially wrong for a 庚 with weak DM running under Water output energy.

The expanded block library solves this at two levels: (1) the topic selection mechanism — different configs get different questions; (2) the variant text mechanism — within eligible configs, the text shifts to reflect the specific band/pattern mechanism. See §10 for the full compound coverage protocol showing how block selection integrates with TG content in a complete reading.

### Block schema

```javascript
{
  label: `Block label — the hook phrase shown to the user`,  // fixed string, no variants

  bands: ['concentrated', 'balanced', 'open'],
  // Which DM energy bands this block is relevant for.
  // Blocks not matching the user's band are excluded from the candidate pool.
  // All three listed = universal (appears for any band).

  patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
  // Which tgPattern families this block is relevant for.
  // Blocks not matching the user's pattern are excluded from the candidate pool.
  // All five listed = universal.

  priority: {
    default: 3,              // baseline priority (1–5, higher = shown first / more likely selected)
    concentrated: 4,         // override for concentrated band
    tested: 5,               // override for tested pattern
    concentrated_tested: 5,  // override for compound configuration
  },
  // Priority determines selection order when a config produces more than 9 candidate blocks.
  // Only values that differ from default need to be specified.

  text: {
    default: `[Required. Written for the balanced, mixed-pattern case. Must stand alone.]`,

    // Band variants — only when the mechanism genuinely shifts:
    concentrated: `[Optional]`,
    balanced:     `[Rarely needed — use default instead]`,
    open:         `[Optional]`,

    // Pattern variants — only when the dominant force changes the mechanism:
    pure:         `[Optional — self-amplification pattern]`,
    rooted:       `[Optional — resource/support pattern]`,
    flowing:      `[Optional — output/expression pattern]`,
    forging:      `[Optional — wealth/direction pattern]`,
    tested:       `[Optional — authority-encountering pattern]`,

    // Compound variants — only when band × pattern creates something neither alone captures:
    concentrated_pure: `[Optional — budget: 2–3 compounds per stem maximum]`,
  }
}
```

### Fallback hierarchy

When resolving which text to serve for a given config, the resolver tries keys in this order:

```
compound key  →  band key  →  pattern key  →  default
```

Example: band = `concentrated`, pattern = `tested`

1. Try `concentrated_tested` — if found, serve it
2. Try `concentrated` — if found, serve it
3. Try `tested` — if found, serve it
4. Serve `default`

The compound key is tried first because it represents the most specific match. The resolver never falls through to `default` if any more specific key exists.

### Block selection

A block is a candidate for a given config only when:
- `bands` includes the user's band (or `bands` contains all three = universal)
- `patterns` includes the user's tgPattern (or `patterns` contains all five = universal)

From the candidate pool, blocks are ranked by resolved priority (same fallback chain as text: `compound` → `band` → `pattern` → `default`). The **top 7–9** are rendered. 7 is the minimum; 9 is the cap.

### 8 Authoring Rules

**Rule 1 — The Trigger Test (required before writing any variant)**

Before writing any variant text (`concentrated`, `tested`, `concentrated_tested`, etc.), ask:

> "Would a person reading the `default` text feel it was written for someone else?"

If yes: write the variant. If no: don't. "More intense version of the same claim" never passes the Trigger Test. A qualitatively different psychological mechanism always does.

Corollary: if you write a variant and the diff from default is three words, delete the variant and update the default instead.

---

**Rule 2 — Default is the primary document**

The `default` text is the primary version. Write it for the modal case (balanced band, mixed patterns). It must be fully accurate and fully readable without knowing the band or pattern. It is not a placeholder. It is not a truncated version of the `concentrated` text. Write it first and write it as if variants didn't exist.

---

**Rule 3 — Band governs mechanism, not degree**

`concentrated` doesn't mean "more intense version of default." It means the underlying psychological dynamic has structurally shifted. A concentrated 庚 doesn't have *more* evaluation — the evaluation is involuntary, relentless, and structural in a way the balanced case isn't. Write concentrated variants to name that structural shift, not to amplify the same claim.

`open` is not "less of everything." In some blocks, the open case produces an inversion — for example, a block about "verdicts becoming load-bearing" may not apply or may invert for an open DM whose assessments don't close with the same force. Write open variants (or narrow the bands[] scope) when the mechanism genuinely reverses, not just weakens.

---

**Rule 4 — Pattern governs direction**

The tgPattern changes what dominant force is operating in the chart, which changes the context in which the DM's nature is expressed, blocked, or redirected. Pattern variants name the specific interaction between the DM's nature and the dominant force.

| Pattern | Dominant force | Implication for the DM |
|---|---|---|
| `pure` | Same element as DM (比劫旺) | Self-amplification — the DM energy is self-referencing |
| `rooted` | Element that generates DM (印旺) | Resource-fed — the DM is sustained by supportive energy |
| `flowing` | Element DM generates (食伤旺) | Output-directed — the DM's energy converts into expression |
| `forging` | Element DM controls (财旺) | Directing outward — the precision is aimed at material outcomes |
| `tested` | Element that controls DM (官杀旺) | Authority-encountering — the DM operates under external pressure |

When writing a pattern variant, name the specific interaction. Not just "when authority is present" — but how the DM's specific nature changes when that dominant force is in play.

---

**Rule 5 — Compound keys are exceptional**

Write a `band_pattern` compound key only when the intersection of band and pattern creates a qualitatively distinct situation that neither alone captures. Budget: **2–3 compound keys per stem maximum**. If you've written `concentrated` and `tested`, their combination needs to be genuinely novel — not "concentrated + tested = very intense tested" — to justify its own entry.

The canonical example: `concentrated_pure` for 庚. Extreme Metal self-amplification with no dominant external force is a specific psychological profile (the self-referencing loop, the assessment that runs on itself, the precision without a target) that neither `concentrated` nor `pure` alone fully captures.

---

**Rule 6 — One-pass authoring**

Write all variants for a block at the same time. A block is one authoring unit. Don't write the default and schedule the band variants for later. When you pick up a block, you are accountable for its complete variant coverage before you put it down.

---

**Rule 7 — Distinct angles within a config**

After variant resolution, the set of rendered blocks for any given config must cover genuinely independent dimensions. If two blocks — after variant application — say essentially the same thing for a specific config, one of them needs a lower priority or a narrower bands[]/patterns[] scope. Each block that renders contributes something no other block does.

---

**Rule 8 — Validate before shipping**

Before marking a stem complete, run `validateStem()` across all 15 configurations for that stem (3 bands × 5 patterns). Each configuration must yield 7–9 rendered blocks. No `[TODO]` placeholders in production text. Any block carrying `[TODO — ...]` is scheduled debt, not a shipping state.

### JavaScript implementation

```javascript
// ── RESOLUTION ────────────────────────────────────────────────────────────────

function resolveBlockText(block, band, pattern) {
  const compound = `${band}_${pattern}`;
  const keys = [compound, band, pattern, 'default'];
  for (const key of keys) {
    if (block.text[key]) return block.text[key];
  }
  throw new Error(`No text resolved: ${block.label} — ${compound}`);
}

function resolveBlockPriority(block, band, pattern) {
  const compound = `${band}_${pattern}`;
  return (
    block.priority[compound] ??
    block.priority[band] ??
    block.priority[pattern] ??
    block.priority.default ??
    3
  );
}

// ── SELECTION ─────────────────────────────────────────────────────────────────

function getBlocksForConfig(blocks, band, pattern) {
  const candidates = blocks.filter(
    b => b.bands.includes(band) && b.patterns.includes(pattern)
  );
  const ranked = candidates
    .map(b => ({ block: b, priority: resolveBlockPriority(b, band, pattern) }))
    .sort((a, b) => b.priority - a.priority);  // descending
  return ranked.slice(0, 9).map(r => r.block);
}

// ── RENDERING ─────────────────────────────────────────────────────────────────

function renderBlocks(stem, band, pattern) {
  const allBlocks = STEM_CARD_DATA[stem].blocks;
  const selected = getBlocksForConfig(allBlocks, band, pattern);
  return selected.map(b => ({
    label: b.label,
    text: resolveBlockText(b, band, pattern),
  }));
}

// ── VALIDATION ────────────────────────────────────────────────────────────────

function validateStem(stem) {
  const BANDS    = ['concentrated', 'balanced', 'open'];
  const PATTERNS = ['pure', 'rooted', 'flowing', 'forging', 'tested'];
  const blocks   = STEM_CARD_DATA[stem].blocks;
  const errors   = [];

  for (const band of BANDS) {
    for (const pattern of PATTERNS) {
      const selected = getBlocksForConfig(blocks, band, pattern);
      const compound = `${band}_${pattern}`;

      if (selected.length < 7) {
        errors.push(`Under minimum: ${selected.length} blocks for ${stem} ${compound}`);
      }
      for (const b of selected) {
        const text = resolveBlockText(b, band, pattern);
        if (text.startsWith('[TODO')) {
          errors.push(`Unwritten variant: ${b.label} — ${stem} ${compound}`);
        }
      }
    }
  }

  if (errors.length === 0) {
    console.log(`${stem} ✓ — all 15 configs validated`);
    return true;
  }
  errors.forEach(e => console.error(e));
  return false;
}
```

### Estimation — variant approach vs. full matrix

| Layer | Entries per stem | Total (10 stems) |
|---|---|---|
| `default` per block (11 blocks) | 11 | 110 |
| `band` variants (avg 2 blocks × 2 bands that matter) | ~4 | ~40 |
| `pattern` variants (avg 3 blocks × 2 patterns that matter) | ~6 | ~60 |
| `compound` variants (avg 2 per stem) | ~2 | ~20 |
| **Total** | **~23 per stem** | **~230 across 10 stems** |

Full matrix for comparison: 11 blocks × 15 configs × 10 stems = **1,650 entries**.

Variant approach: ~85% reduction with meaningful differentiation across all 150 compound configurations. The reduction compounds because most content is genuine default — variants are only authored where the mechanism actually shifts.

### Reference block — 庚 `The image and the interior`

Full example of the complete schema, including the justification for a compound key:

```javascript
{
  label: `The image and the interior`,

  bands: ['concentrated', 'balanced'],
  // Excluded from 'open': for an open 庚, the exterior precision is muted
  // enough that the gap between image and interior collapses. The surface
  // and the interior are less divergent — the block doesn't apply.

  patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
  // Universal across patterns — the interior gap is a 庚 characterological
  // constant regardless of which external energy is dominant.

  priority: {
    default: 3,
    concentrated: 5,
    concentrated_pure: 5,
    // concentrated_pure is highest: the self-referencing loop of
    // concentrated × pure creates the most vivid form of this gap.
  },

  text: {
    default: `What the room sees: precision and an edge that doesn't easily bend. What is underneath: a softer interior than the presence suggests, running a question the assessment doesn't fully answer — whether the verdict holds, whether the standard is being aimed at the right things. The certainty is partly real and partly structural. Most people close to you eventually sense this.`,
    // Written as its own statement for the balanced case — not a truncation of
    // the concentrated text. Passes Rule 2 (default is the primary document).

    concentrated: `What the room sees: precision, certainty, an edge that doesn't bend. What is actually underneath: a much softer interior than anyone in the room would guess, running a question that the assessment never quite answers — whether what you've built is actually right, whether the verdict holds, whether the standard is being applied to the right things. The blade in the tongue is protecting something. The certainty is partly real and partly structural armor. You know this. Most people close to you eventually sense it. The gap between the version of you that the room experiences and the version that exists at 2 AM is larger than most people realize.`,
    // Passes Trigger Test: the involuntary quality, the 2AM signal, and the
    // armor framing are claims the default cannot make without overstating.
    // concentrated_pure: currently resolved by 'concentrated' fallback.
    // Would only be authored if the self-referencing loop (no external force,
    // pure self-amplification) produces a qualitatively distinct interior
    // experience that concentrated alone cannot capture.
  }
}
```

---

### 庚 block library — tagging reference

庚 has 11 authored blocks covering the full characterological vocabulary for Yang Metal. The table below documents each block's eligibility scope (`bands[]`, `patterns[]`), priority configuration, and variant authoring status. This is the authoring reference for completing outstanding TODO variants and serves as a structural template for subsequent stems.

| # | Label | `bands[]` | `patterns[]` | `priority{}` | Written variants | Outstanding TODOs |
|---|---|---|---|---|---|---|
| 1 | How you experience the world | all | all | default 5 | `default`, `concentrated` | `open`, `tested` |
| 2 | What you're genuinely good at | all | all | default 4 | `default` | `flowing` |
| 3 | Where you consistently get stuck | all | all | default 5, open→3 | `default`, `concentrated` | `open`, `tested` |
| 4 | What changes when conditions are right | all | all | default 3, concentrated→4 | `default` | `forging` |
| 5 | What you rarely admit | concentrated, balanced | all | default 4, concentrated→5 | `default`, `concentrated` | *(none — open excluded by design)* |
| 6 | How you make decisions | all | all | default 4, open→3 | `default`, `concentrated` | `open`, `tested` |
| 7 | How you show up in relationships | all | all | default 4 | `default` | `flowing` |
| 8 | What you do with pressure | concentrated, balanced | pure, rooted, tested | default 3, concentrated→5, concentrated_pure→5 | `default`, `concentrated` | `tested` |
| 9 | What activates the best version of this | all | all | default 4, tested→4, forging→4 | `default`, `concentrated` | `tested`, `forging` |
| 10 | What holds you back without looking like it | all | all | default 4, concentrated→5 | `default`, `concentrated` | *(none)* |
| 11 | The image and the interior | concentrated, balanced | all | default 3, concentrated→5, concentrated_pure→5 | `default`, `concentrated` | *(none — open excluded by design)* |

**Total outstanding: 11 TODO variants across 4 pattern types.**

#### Design rationale — open-excluded blocks

Blocks 5 (`What you rarely admit`) and 11 (`The image and the interior`) exclude `open` from `bands[]` by design, not by omission. For an open 庚, the exterior precision is muted enough that the interior/exterior gap described in block 11 no longer holds — the surface and interior are less divergent. Block 5's dynamic (a settled conviction running alongside a quieter underlying question) also requires a level of evaluative force that the open case doesn't produce consistently. These blocks are structurally inapplicable to the open band — not merely lower priority.

Block 8 (`What you do with pressure`) additionally excludes `flowing` and `forging` from `patterns[]`. The pressure mechanism described in this block is specific to self-amplifying, resource-supported, and authority-encountering contexts. The presence of a dominant output or wealth energy changes what "pressure" does structurally enough that the topic shifts — that shift is covered by other blocks (2 and 4) rather than a variant of block 8.

#### Outstanding TODOs — grouped by variant type

**`open` variants — 3 blocks (1, 3, 6)**

The three core experience/cognition blocks. The evaluative mechanism genuinely inverts when DM energy is weak: assessments don't dominate entry points, verdicts don't close cleanly, and what it means to "experience the world" as a 庚 shifts structurally. Each open variant describes a qualitatively different mechanism — not a quieter version of the default. Apply Rule 1 (Trigger Test): a person reading the default should feel it was written for someone else.

**`tested` variants — 5 blocks (1, 3, 6, 8, 9)**

The `tested` pattern means authority/official energy (官杀) is dominant. For 庚 — already a force of judgment and internal standard — the presence of external institutional pressure creates a specific DM × force dynamic: the internal standard meets external standard. Blocks covering world-experience, getting stuck, decision-making, what pressure does, and what activates the best version all shift meaningfully when official energy is dominant. The `tested` variant names the specific interaction, not just the presence of authority.

**`flowing` variants — 2 blocks (2, 7)**

The `flowing` pattern means output/expression energy (食伤) is dominant. The precision is channeled outward through strong expressive energy. What 庚 is genuinely good at (block 2) becomes expression-shaped; how it shows up in relationships (block 7) changes when the outward-driving quality is the dominant force. Both variants describe how the 庚 nature shifts when it operates through a strong producing channel rather than on its own terms.

**`forging` variants — 2 blocks (4, 9)**

The `forging` pattern means wealth/directing energy (财) is dominant. Activation patterns and what "conditions right" means both shift when a strong directing force is already in place — the precision already has a material target, and the mechanism is about the quality of that target rather than finding one. Both variants start from the assumption that material direction is active, not absent.

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

## §10 — Compound Coverage Protocol

### What this section is

The compound reading is not the sum of Layer 1 + Layer 2 + Layer 3 content placed side by side. It is a coordinated reading where each layer occupies distinct territory, and the full stack taken together says more than any layer does alone. The coverage protocol is the ruleset that keeps each layer doing its job without repeating what another layer already said.

Three rules govern the stack:

- **Rule A — Layer 1 vs Layer 2/3:** Characterological vs force-mechanical. The base energy blocks describe who the person is. The TG cards describe what a force does. These answer different questions and must never cover the same ground.
- **Rule B — Layer 2 vs Layer 3:** Primary vs secondary TG territory. The primary TG (highest-scoring dominant element) has primary domain ownership at its highest-sig areas. The secondary TG is authored around that territory — not a quieter echo of the same content, but a distinct angle in domains it genuinely governs.
- **Rule C — Implementation:** The protocol runs as a generation gate at Pipeline A2 and as a pre-synthesis allocation pass in Pipeline B.

---

### Rule A — Layer 1 vs Layer 2/3

**The fundamental division:** Layer 1 describes who the person is. Layer 2/3 describes what force is operating in their chart and what that force produces. These are structurally different angles — the content should never need to be the same.

| Layer | What it answers | Content framing | Example (庚 + 七杀) |
|---|---|---|---|
| Layer 1 (`stem_band_tgPattern` blocks) | Who is this person? What are they like as a character? How does their DM nature actually function? | Characterological — interior experience, behavioral patterns, the person's nature experienced from the inside | "The assessment mechanism is involuntary. The evaluation is always running." |
| Layer 2/3 (`domEl_specificTenGod` TG card) | What force is operating? What does it produce? What does it cost? What does it create in specific life domains? | Force-mechanical — what the force generates, demands, and costs. The DM's nature is the context, not the subject. | "This force doesn't moderate itself. It presses until the edge either breaks or proves it's real." |

**Why these don't overlap despite touching the same subject:**

Layer 1 blocks may describe the *experience of being under pressure* (the DM-side: interior, psychological, what it feels like). Layer 2/3 TG cards describe *what the pressure is* and *what it produces as outcomes* (force-side: mechanical, outcome-oriented, what gets created in the world). They appear to be about the same situation — authority pressure — but answer fundamentally different questions: "what is it like to be you under this force" vs. "what does this force produce."

**Authoring check — apply to every TG field written:**

> "Does this read like a description of the DM's inner experience? Or does it describe what the force generates?"

If the former: it belongs in a base energy block, not here. Rewrite as a force-output statement.

---

### Rule B — Layer 2 vs Layer 3

When two dominant energies are present (most charts), both TG cards render. Rule B governs how their content is coordinated across the four life domains.

**The allocation principle:** The primary TG (Layer 2 — highest-scoring dominant element) has primary ownership of its highest-sig domains. The secondary TG (Layer 3) covers its own highest-sig domains at full depth only where those domains don't overlap with the primary's primary territory. Where they do overlap, the secondary TG covers a **distinct angle** — not the same domain content at lower intensity, but a different mechanism within that domain.

**Territory allocation algorithm:**

| Primary TG sig | Secondary TG sig | Allocation |
|---|---|---|
| ≥ 4 | any | Primary owns the domain. Secondary may cover only at a distinct angle, condensed weight. |
| 3 | ≥ 4 | Secondary owns the domain. Primary covers its own angle at condensed weight. |
| ≤ 3 | ≤ 3 | Neither prioritizes. Either may surface at condensed weight. |
| 5 | 5 (rare) | Both cover the domain — but at explicitly distinct angles. The `mechanism` fields must describe different force dynamics. |

**"Distinct angle" defined:** A different `mechanism` sentence (different force mapping within the domain) that produces genuinely non-overlapping content. Not "more of the same TG's claim at lower volume." The secondary TG's domain content should feel like a discovery, not a repetition.

**What this achieves:** The user reading the full Pro stack sees a coordinated portrait where each TG card adds something the other doesn't. The sig table is the ground truth for this allocation — authored before the cards are written, not determined after.

---

### Rule C — Implementation as generation gate

The coverage protocol runs at two points in the generation pipeline:

**At Pipeline A2 (generating `DomEnergyTg_Data.js`):**

Each compound card quality gate includes:

- ❑ No field reads as a characterological description of the DM (would belong in Layer 1). Every field is force-mechanical.
- ❑ `mechanism` field in each domain signature is a force-mapping sentence (`TG pattern → outcome`), not a personality description.
- ❑ The card does not re-describe what the stem's base blocks already cover. The compound card is about the DM × TG force interaction, not the DM's nature in isolation.

**At Pipeline B (self-report synthesis):**

Before synthesis begins, the synthesizer runs a territory allocation pass:

1. Load Layer 1 (`STEM_CARD_DATA[stem_band_tgPattern]`) and both compound cards from `DomEnergyTg_Data.js`
2. Determine primary vs. secondary TG by element score
3. Apply Rule B territory allocation across all four domains
4. Pass the allocated territory map to the synthesis prompt as a constraint: primary TG domains at full depth, secondary TG at its optimized angles
5. Synthesize with the allocation enforced — the weaver generates domain content per the territory map, not per each card's defaults

The allocated territory map is included in the synthesis prompt as an explicit input:

```
TERRITORY ALLOCATION:
career:        primary → [TG1] full depth  |  secondary → [TG2] distinct angle, condensed
relationships: primary → [TG1] full depth  |  secondary → [TG2] omit / condensed
wealth:        neither — brief note only
health:        primary → [TG1] full depth  |  secondary → [TG2] distinct angle, condensed
```

---

### Illustrated example — `庚_concentrated_tested` × `火_七杀` + `土_偏印`

This example shows how the three layers coordinate for a specific compound stack. User: Yang Metal (庚) DM, concentrated band (DM extremely strong), tested pattern (authority element dominant). Layer 2: Fire dominant energy expressed through 七杀 (Yang Fire 丙 controls Yang Metal 庚 — same polarity → 七杀). Layer 3: Earth secondary energy as 偏印 (Yang Earth 戊 generates Yang Metal 庚 — same polarity → 偏印, the indirect resource/seal).

**Ten God derivation for this stack (verified against engine `getDominantTenGod`):**
- DM = 庚 (Yang Metal). `GEN[土]=金` — Earth generates Metal → Earth dominant is 偏印 (same Yang polarity) or 正印 (cross polarity). `CTL[火]=金` — Fire controls Metal → Fire dominant is 七杀 (same Yang polarity) or 正官 (cross polarity).
- `水_偏印` is NOT valid for a 庚 DM. For 庚, Metal generates Water (`GEN[金]=水`), so Water dominant is 食神/伤官 (output), not a resource. `水_偏印` would imply a Wood DM (Water generates Wood).

---

#### Layer 1 — `庚_concentrated_tested`

Block candidates for this config (from the ~16-topic 庚 library):

| Block | Category | Why selected for this config |
|---|---|---|
| What you're genuinely good at | Universal | Sig 4 across all configs |
| The image and the interior | Universal, concentrated | Priority 5 — gap between surface and interior most vivid in concentrated |
| What you rarely admit | Universal | Sig 4 across all configs |
| The internal standard | Universal | Core 庚 characterological constant |
| How you navigate authority pressure | Pattern: `tested` only | Tested-only block — always a candidate when pattern = tested |
| What holds you back without looking like it | Universal | Sig 3, relevant for concentrated + tested |
| The self-referencing loop | Band: `concentrated` only | The assessment running on itself — especially acute when the external force is also compressive |

Variant resolution for this config: `concentrated_tested` compound text if authored; otherwise `concentrated` for band blocks, `tested` for pattern blocks, `default` fallback.

**Content territory: who this person is under this configuration.** "How you navigate authority pressure" (the tested-pattern block) covers the DM-interior story — the psychological experience of being a concentrated 庚 when something external challenges it. This is a characterological observation about the DM's nature, written from the inside.

---

#### Layer 2 — `火_七杀`

Key: `火_七杀`
Governing angle: *Pressure that forges — the force that tests whether the edge is real; does not grant permission, demands proof.*

Sig profile: `career=5 · relationships=4 (sig_female=5) · wealth=3 · health=4`

This card describes the **force itself** and what it produces — not the DM's experience of it.

| Field | Content direction |
|---|---|
| `rulingRealm` | The psychological territory of this force: pressure as the governing register. Not cruelty — the forge that doesn't moderate itself, that demands proof before it grants anything |
| `outputs[3]` | What this force generates when well-placed: the quality that only becomes visible under pressure, the proof that required the test, the recognition that arrives only after demonstrated performance |
| `frictions[3]` | What this force costs when misaligned: unrelenting pressure without release, the forge running past the point of refinement, the test applied to the wrong things |
| `hiddenDynamic` | The inner mechanism: why the pressure doesn't announce itself, why the forge and the exhaustion come from the same source, what the force produces in the interior it doesn't claim to govern |
| `domainSignatures.career` | **sig 5 — primary territory.** Mechanism: `七杀 pattern → institutional recognition through demonstrated quality under pressure, not through compliance`. The career story this force keeps writing. |
| `domainSignatures.relationships` | **sig 4 — primary territory (sig_female=5).** Mechanism: `七杀 pattern → intensity, challenge, and testing as the primary relational register`. |
| `domainSignatures.wealth` | **sig 3 — secondary weight.** Mechanism: `七杀 pattern → wealth through pressure-driven achievement, not through accumulation`. |
| `domainSignatures.health` | **sig 4 — primary territory.** Mechanism: `七杀 pattern → health as a function of pressure load — the body absorbs what the pressure produces`. |

**Coverage check vs Layer 1:** The `How you navigate authority pressure` block (Layer 1) is about the DM's interior — what it's like to be this concentrated 庚 when something presses on it. `火_七杀` is about the force — what it is, what it generates, what it costs structurally. The subject of the Layer 1 block is the person's psychological response. The subject of the Layer 2 card is the force mechanism and its outputs. No overlap.

---

#### Layer 3 — `土_偏印`

Key: `土_偏印`
Governing angle: *The unconventional resource — the force that nourishes through unusual channels; skills, credentials, indirect support.*

Sig profile: `career=4 · relationships=2 · wealth=2 · health=3`

**Rule B territory allocation applied:**

| Domain | 七杀 sig | 偏印 sig | Allocation result |
|---|---|---|---|
| career | **5** (primary owns) | 4 | 偏印 covers at **distinct angle**: the skills and credential accumulation that make the proof possible — not the recognition under pressure (七杀's territory), but the quiet resource-building behind it. Earth as 偏印 here: the ground that was being prepared while the forge was running. |
| relationships | **4** / sig_female=**5** (primary owns) | 2 | 偏印 **does not surface relationships** at full weight. The relational register belongs to 七杀. Omit or brief structural footnote only. |
| wealth | 3 | 2 | Neither TG prioritizes. 偏印 may note the indirect wealth angle (skills and credentials as the quiet economic foundation) briefly. |
| health | **4** (primary owns) | 3 | 偏印 covers at **distinct angle**: the stable restoring force — the ground that replenishes what the pressure depletes. 七杀 covers what the forge costs; 土_偏印 covers the nourishing source that rebuilds the Metal when the fire stops. |

**What `土_偏印` adds to this stack:**

1. **Career — the ground angle:** 七杀 governs recognition through demonstrated performance under pressure. 土_偏印 governs the accumulated skills, credentials, and quiet preparation that make the performance possible. The forge reveals; the earth prepared. Different parts of the same arc.
2. **Health — the restoration angle:** 七杀 governs the pressure-load relationship to health (the body absorbs what the forge produces). 土_偏印 governs the nourishing source that replenishes capacity — the stable ground beneath the pressure. Complementary, not duplicating.
3. **Relationships:** Not surfaced. The forge owns this territory.

---

#### Full compound stack — what the user reads

| Layer | Content | Territory |
|---|---|---|
| Layer 1 (`庚_concentrated_tested`) | Who you are as a concentrated Yang Metal under authority pressure — interior experience, the evaluation mechanism, the image/interior gap, the psychological dynamic when something external presses on a DM already at full force | Characterological — the person's nature |
| Layer 2 (`火_七杀`) | What the pressure is, what it produces, what it costs — career recognition through demonstrated proof, intensity as the primary relational register, the pressure-health load. Full coverage of career, relationships, and health at primary weight | Force-mechanical — the forge |
| Layer 3 (`土_偏印`) | The ground that enables and restores — the skills and credentials that make the proof possible (career, distinct angle), the stable nourishing source that replenishes what the pressure depletes (health, distinct angle) | Force-mechanical — the resource |

No field in any layer duplicates a field in another layer. Every piece of content in the stack answers a question no other piece answers.

---



| | |
|---|---|
| **Document** | Doc 4 — Generation Architecture & Reading Content Guide |
| **Last Updated** | 2026-04-16 |
| **Version** | 4.3 · April 2026 |
| **Status** | Current — replaces all prior versions |
| **Audience** | Engineers, content team, generation system |
| **Replaces** | v2.x three-pass pipeline (portrait prewrite → persona card → reading schema) |
| **Compatible with** | Doc 2 v1.1 · Doc 3 v1.2 · Doc 6 v1.1 |

## Version History

| Version | Date | Changes |
|---|---|---|
| 4.3 | April 2026 | §10 added: Compound Coverage Protocol. Three rules governing the full reading stack: Rule A (Layer 1 characterological vs Layer 2/3 force-mechanical — no overlap), Rule B (Layer 2 vs Layer 3 domain territory allocation by sig weight — secondary TG covers distinct angles only), Rule C (protocol as generation gate — coverage checks added to Pipeline A2 quality gate; pre-synthesis territory allocation pass added to Pipeline B before synthesis prompt runs). Full illustrated example: `庚_concentrated_tested` × `火_七杀` (primary) + `土_偏印` (secondary) showing domain allocation across all three layers. Example includes inline TG derivation from engine logic as permanent authoring reference. Pipeline A2 quality gate updated with Rule A coverage check. Pipeline B updated with pre-synthesis territory allocation step. §2 Free and Pro tier tables updated to match 9-section TG schema: Free tier TG description updated (rulingRealm, chips, outputs[], frictions[]); Pro tier table updated (decisionStyle and communicationStyle removed, hiddenDynamic / domainSignatures / sixRelations / liunianSignatures added). Stale `lifeDomains` reference in §5 teaser architecture corrected. |
| 4.2 | April 2026 | Pipeline B updated: self-report synthesizes from all layers (Option B). STEM_CARD_DATA.js (Layer 1 psychCore/gifts/shadows) added as Pipeline B input alongside DomEnergyTg_Data.js compound cards. Synthesis job reframed: weaver role (base nature grounds force interactions into one arc). Prompt structure updated to reflect two-layer input. Quality gate updated: coherence check requires one unified portrait, not two sections. |
| 4.1 | April 2026 | Pipeline A split into A1 (150 stem_band_tgPattern entries → STEM_CARD_DATA.js) and A2 (50 compound cards → DomEnergyTg_Data.js). All 150 configs generated as independent targets (Option A — no band/pattern axis collapse). Generation inputs, CLI commands, and quality gates documented for both sub-pipelines. Total Pipeline A: 200 generation calls. |
| 4.0 | April 2026 | `STEM_CARD_DATA.js` added as a pre-generated serving file (150 `stem_band_tgPattern` entries — `psychCore`, `gifts[]`, `shadows[]` generated offline via Pipeline A). `archetypeSource.js` remains the hand-authored source for `blocks[]`, `manual.*`, `energy.*`, and TG fields. Pipeline A expanded to cover both STEM_CARD_DATA.js (150 entries) and DomEnergyTg_Data.js (50 compound cards). File structure updated. |
| 3.9 | April 2026 | `ElementNature_DATA.js` eliminated — confirmed as a naming artifact of `STEM_CARD_DATA`. Layer 1 content is served directly from `archetypeSource.js` (`STEM_CARD_DATA`). File structure updated: one pre-generated data file (`DomEnergyTg_Data.js`), not two. §4 "Archetype data file 1" section removed. |
| 3.8 | April 2026 | §9 expanded: TG_CARD_DATA content authoring schema added alongside block variant schema. Documents field groups, authoring frames (universal vs. context-layered), domain sig schema with rendering thresholds, and the authoring rule for sig-proportional depth. "The problem this solves" retitled to distinguish base energy blocks from TG layer. |
| 3.7 | April 2026 | Life domains reclassified to TG layer exclusively. `STEM_CARD_DATA.lifeDomains` deprecated — the 11 base energy blocks already carry characterological domain content implicitly. `TG_CARD_DATA.domains` is the canonical home for domain content, written as domain pattern signatures (recurring situations/patterns the TG produces) not personality descriptions. Domain significance tagging added: `sig` (1–5), `sig_female`, `sig_male` overrides based on classical 六亲 theory. Field renamed `lifeDomains` → `domains` in TG_CARD_DATA. Reference significance table added to §4. |
| 3.6 | April 2026 | Added §9 Block Content Schema and Authoring Rules. Variant approach with fallback hierarchy (`band_pattern` → `band` → `pattern` → `default`). 8 dogmatic authoring rules including the Trigger Test. JavaScript `resolveBlockText`, `getBlocksForConfig`, `renderBlocks`, `validateStem` implementation. Estimation: ~230 variant entries vs. 1,650 full matrix. 庚 `blocks[]` converted to variant schema in `archetypeSource.js`. |
| 3.5 | April 2026 | Gifts/shadows desc moved to FREE tier. One sentence each (was 2–3 sentences PRO). Distinct-angle rule enforced: all six must cover independent dimensions of the person, not variations of one core trait. New phrase names for 庚: The Core Beneath the Edge, The Held Position, The Internal Standard, The Clarity Gap. |
| 3.4 | April 2026 | Removed door opener paragraph from ④. Replaced with block labels preview — all 11 block labels shown as a locked list, 3 highlighted. No `teaser` field. Labels are the hook; no paragraph competes with them. |
| 3.3 | April 2026 | Revised §5 Teaser Architecture: 4-component structure (archetype identity → portrait → gifts/shadows panel → door opener). `psychCore.desc` now always 2nd person, serves as portrait. `gifts[]` and `shadows[]` schema added ({phrase, desc} — desc is PRO). `teaser` field repurposed as door opener. Chips remain for metadata only. |
| 3.2 | April 2026 | Added §5 Teaser Architecture guidance: purpose-built teasers (recognition + door-opener), 3–4 sentences, Pro version starts fresh. Section 1 free teaser = core character recognition moment + psychCore paragraph. |
| 3.1 | April 2026 | Data architecture restructured. `archetypeSource.js` established as single source of truth for field names and reading templates. Archetype data split into `ElementNature_DATA.js` (150 personality/behavioral templates) and `DomEnergyTg_Data.js` (50 compound cards). Internal constants (CLASSICAL_STEM_ANCHORS, CLASSICAL_TG_ANCHORS, BINGYI_FRAMING, PILLAR_STAGE) remain in `archetypeSource.js` as knowledge-pool content, imported by `batchGenerate.js` at synthesis time. COMPOUND_CARDS removed from `archetypeSource.js` (now in `DomEnergyTg_Data.js`). Generation script narrowed to self-report synthesis (Pipeline B) as primary ongoing function. |
| 3.0 | April 2026 | Complete rewrite. New three-tier product architecture (Free / Pro / Self-Report). Profile data as single source of truth for Free and Pro. Compound archetype cards as self-report source. Old three-pass generation pipeline retired. 150 archetype keys locked. Full profile data field reference added. |
| 2.x | April 2026 | Three-pass pipeline: portrait prewrite → persona card → reading schema. Layer 2 angles. Compound cards introduced. |
| 1.0 | — | Initial architecture. |
