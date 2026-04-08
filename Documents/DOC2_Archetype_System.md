# Elementum · Doc 2 — Archetype System & Reading Architecture

---

## §1 — System Overview

### The core principle

The Elementum archetype system is a **layered cocktail model** — a dynamic stack of identity lenses that compose differently for every chart. Rather than encoding all variables into a single compound key, the system separates identity into three distinct layers derived independently and read together. The synthesis of all three is the reading.

**The foundational insight from classical BaZi:** The same Day Master element living under different dominant energies is a categorically different person. The Ten God relationship — how the dominant energy relates to the Day Master — determines the psychological mechanism, not just the elemental content. This is what 子平真诠 actually describes. This system implements it.

### Two tiers, two purposes

| Tier | Purpose | Audience | Format |
|---|---|---|---|
| Tier 1 | User-facing identity — the anchor, the recognition moment | The user | Identity card |
| Tier 2 | Internal reading derivation — what drives the layered content | The engine | Three computed layer keys |

### The cardinal rule from Doc 1

The calculation engine (Doc 1) outputs a Canonical JSON object. This document operates entirely from that JSON — never from raw birth data, never from LLM calculation. The calculation engine is the only place where numbers are computed.

---

## §2 — Tier 1: User-Facing Identity

### What the user sees in the identity card

The identity card shows exactly four things. Nothing more.

| Element | Example | Where |
|---|---|---|
| Stem glyph | 庚 | Identity token pill (as visual sigil, never pronounced) |
| Polarity + Element | Yang Metal | Identity token pill |
| Archetype name | The Blade | Large title, 38px Cormorant Garamond |
| Manifesto | "Precision before intention…" | Italic, 14px, below title |

### What is stored but not shown in the identity card

These values are computed and stored in the user profile database. They surface in Deliverables 2 and 3, never in the identity card — showing them without context produces cognitive noise, not recognition.

| Field | Example value | First appears in |
|---|---|---|
| Energy band | `concentrated` | Elemental nature card (Deliverable 2) |
| tgPattern | `pure` | Layer 1 template lookup (internal) |
| Catalyst element | `Fire` | What activates you (Deliverable 2) |
| Archetype key | `庚_concentrated_pure` | TEMPLATE_DB lookup (internal) |
| Adjectives | from persona card | Future features |
| MBTI resonance | from persona card | Future features |
| Shareable code | `庚 · BLADE · CONCENTRATED · PURE` | Future share mechanic |

### Design principle

The identity card is not a data display. It is a recognition moment. Band, pattern, and catalyst are meaningful only after the energy blueprint has explained what they mean. The archetype name and manifesto carry the full weight of the identity reveal.

### Identity token format

```
[stem glyph] · [Polarity] [Element] · [Archetype without "The"]

Example: 庚 · Yang Metal · Blade
```

### The ten archetypes (LOCKED)

| Stem | Archetype | Element | Polarity | Manifesto |
|---|---|---|---|---|
| 甲 | The Oak | Wood | Yang | "Builds what others can only imagine. Growth is not ambition — it is the architecture." |
| 乙 | The Vine | Wood | Yin | "Finds the path no one else sees. Arrives exactly where it intended." |
| 丙 | The Sun | Fire | Yang | "Doesn't choose to illuminate. Simply is light — and everything near it comes alive." |
| 丁 | The Candle | Fire | Yin | "Illuminates completely what it's pointed at. Nothing more. Nothing less." |
| 戊 | The Mountain | Earth | Yang | "People orient their lives around it without knowing why. The ground that holds." |
| 己 | The Field | Earth | Yin | "Grows things in silence. Leaves everything it touches more alive than it found it." |
| 庚 | The Blade | Metal | Yang | "Precision before intention. An edge that was never chosen — only found." |
| 辛 | The Jewel | Metal | Yin | "Perceives what is excellent the way others perceive temperature — before the question is asked." |
| 壬 | The Ocean | Water | Yang | "Holds more beneath the surface than it ever shows. Always has. Always will." |
| 癸 | The Rain | Water | Yin | "Knows what is true before it is spoken. Nourishes what it touches without announcing it." |

### Archetype seal SVGs (72×72px)

One geometric SVG per stem. Rendered in element color on tinted gradient background.

| Stem | Concept |
|---|---|
| 甲 | Upward branching tree: trunk + two branch tiers + root suggestion |
| 乙 | Spiral vine climbing implied vertical axis |
| 丙 | Radiating sun: circle + 8 alternating long/short spokes |
| 丁 | Single upward flame: tapered teardrop with inner lighter fill |
| 戊 | Layered peak: outer triangle + two internal horizontal strata |
| 己 | Cultivation grid: furrow lines + small sprout marks |
| 庚 | Bisected hexagon: outer hex + inner hex + vertical axis + center point |
| 辛 | Faceted diamond: rotated square + inner cross diagonals |
| 壬 | Depth rings: 4 concentric circles + horizon line |
| 癸 | Wave arcs: 3 descending wave paths + fall-drop dashes below |

### Element colors (LOCKED — used throughout the app)

| Element | Hex | Chinese glyph |
|---|---|---|
| Metal | #8ba3b8 | 金 |
| Wood | #7a9e6e | 木 |
| Fire | #c4745a | 火 |
| Earth | #b89a6a | 土 |
| Water | #5a7fa8 | 水 |

Background: `#F4EFE6` · Primary text: `#584A3E`
Fonts: EB Garamond (headings) · Cormorant Garamond (large titles)

Chinese characters appear only as visual glyphs — never translated inline. The foreignness is intentional.

---

## §3 — Tier 2: Layer Key System

> **LOCKED.** Key formats, key counts, and the full 50-entry Layer 2 taxonomy are structural definitions. Any change requires updating both this document and the generation scripts.

### Three layers

| Layer | What it is | Key formula | Count |
|---|---|---|---|
| Layer 1 | Base identity — DM stem, energy band, structural pattern | `[stem]_[band]_[tgPattern]` | 150 |
| Layer 2 | Dominant energy — the non-DM element with highest score, read through its Ten God lens | `[dominantEl]_[tenGod]` | 50 |
| Layer 3 | Secondary energy — second-highest non-DM element, same pool as Layer 2 | `[secondaryEl]_[tenGod]` | 50 (shared pool) |

The 50 Layer 2/3 keys are a shared pool — the same angle entries serve both dominant and secondary positions. Total unique content units: **200** (150 persona+reading templates + 50 angle sets).

### Layer 1 key (stem × band × tgPattern)

```
[stem]_[band]_[tgPattern]
Example: 庚_concentrated_pure
```

**Field values:**

| Field | Values |
|---|---|
| stem | 甲 乙 丙 丁 戊 己 庚 辛 壬 癸 |
| band | `concentrated` · `balanced` · `open` |
| tgPattern | `pure` · `rooted` · `flowing` · `forging` · `tested` |

**tgPattern meanings:**

| Pattern | Classical root | What dominates |
|---|---|---|
| `pure` | 比劫旺 | Same element as DM |
| `rooted` | 印旺 | Element that generates DM |
| `flowing` | 食伤旺 | Element DM generates |
| `forging` | 财旺 | Element DM controls |
| `tested` | 官杀旺 | Element that controls DM |

**Note on 5 vs 7 tgPattern values:** The yin/yang polarity split within Output (食神/伤官) and Authority (正官/七杀) is resolved at Layer 2 via the specific Ten God. tgPattern at Layer 1 describes the structural family only.

**One key is hand-authored as the reference standard:** `庚_concentrated_pure` — see §4 for the full reference reading.

### Layer 2/3 key (dominant element × specific Ten God)

```
[dominantElement]_[specificTenGod]
Example: 金_比肩
```

**Why 50 keys, not more:** `domEl × specificTenGod` uniquely implies the DM element. Given the dominant element and the specific Ten God, there is exactly one DM element family that can produce that relationship. The apparent 3D space collapses to 50 unique interactions. Each entry is written knowing precisely which two elemental natures are in relationship.

### Full 50-key taxonomy (LOCKED)

| Key | English name | DM element | Structural interaction |
|---|---|---|---|
| 金_比肩 | The Mirror | Metal | Metal precision amplifying Metal — same-polarity self-referencing loop |
| 金_劫财 | The Rival | Metal | Metal meeting Metal cross-polarity — similar nature, competitive register |
| 金_食神 | The Flow | Earth | Earth generating Metal same-polarity — stability as natural source of precision |
| 金_伤官 | The Edge | Earth | Earth generating Metal cross-polarity — precision that structurally exceeds its container |
| 金_偏财 | The Field | Fire | Fire directing Metal broadly — warmth applied to precision as distributed material |
| 金_正财 | The Harvest | Fire | Fire directing Metal cross-polarity — focused warmth shaping the edge with discipline |
| 金_七杀 | The Trial | Wood | Metal pressing Wood same-polarity — the cutting force that doesn't grant permission |
| 金_正官 | The Standard | Wood | Metal setting standard for Wood cross-polarity — precision that tests and grants recognition |
| 金_偏印 | The Well | Water | Metal generating Water same-polarity — precision as the source sustaining depth |
| 金_正印 | The Root | Water | Metal generating Water cross-polarity — precision nourishing and opening intelligence |
| 木_比肩 | The Mirror | Wood | Reach amplifying reach — developmental instinct without definition or counterforce |
| 木_劫财 | The Rival | Wood | Reach meeting reach cross-polarity — growth competing with growth |
| 木_食神 | The Flow | Water | Water generating Wood same-polarity — depth as natural source of effortless reach |
| 木_伤官 | The Edge | Water | Water generating Wood cross-polarity — depth producing reach that exceeds its container |
| 木_偏财 | The Field | Metal | Metal directing Wood broadly — precision ranging across living material |
| 木_正财 | The Harvest | Metal | Metal directing Wood cross-polarity — precision shaping reach toward structured outcomes |
| 木_七杀 | The Trial | Earth | Wood pressing Earth same-polarity — the destabilising reach that roots break stone |
| 木_正官 | The Standard | Earth | Wood setting standard for Earth cross-polarity — movement asking whether stability is living |
| 木_偏印 | The Well | Fire | Wood generating Fire same-polarity — reach as fuel sustaining warmth |
| 木_正印 | The Root | Fire | Wood generating Fire cross-polarity — reach nourishing warmth and opening direction |
| 火_比肩 | The Mirror | Fire | Warmth amplifying warmth — illumination running without containment |
| 火_劫财 | The Rival | Fire | Warmth meeting warmth cross-polarity — presence competing with presence |
| 火_食神 | The Flow | Wood | Wood generating Fire same-polarity — reach as natural source of warmth and expression |
| 火_伤官 | The Edge | Wood | Wood generating Fire cross-polarity — reach producing warmth that challenges frameworks |
| 火_偏财 | The Field | Water | Water directing Fire broadly — depth ranging across warmth as distributed material |
| 火_正财 | The Harvest | Water | Water directing Fire cross-polarity — depth shaping illumination into structured purpose |
| 火_七杀 | The Trial | Metal | Fire pressing Metal same-polarity — the forge that doesn't moderate itself |
| 火_正官 | The Standard | Metal | Fire setting standard for Metal cross-polarity — the forge that refines and grants recognition |
| 火_偏印 | The Well | Earth | Fire generating Earth same-polarity — warmth as activation source for stability |
| 火_正印 | The Root | Earth | Fire generating Earth cross-polarity — warmth nourishing stability and opening movement |
| 土_比肩 | The Mirror | Earth | Stability amplifying stability — holding force deepening without movement |
| 土_劫财 | The Rival | Earth | Stability meeting stability cross-polarity — ground competing with ground |
| 土_食神 | The Flow | Fire | Fire generating Earth same-polarity — warmth as natural source of stable deposits |
| 土_伤官 | The Edge | Fire | Fire generating Earth cross-polarity — warmth building structure beyond expectation |
| 土_偏财 | The Field | Wood | Wood directing Earth broadly — reach ranging across stable material |
| 土_正财 | The Harvest | Wood | Wood directing Earth cross-polarity — reach shaping stability into structured cultivation |
| 土_七杀 | The Trial | Water | Earth pressing Water same-polarity — the dam blocking depth without permission |
| 土_正官 | The Standard | Water | Earth setting standard for Water cross-polarity — containment asking whether depth has form |
| 土_偏印 | The Well | Metal | Earth generating Metal same-polarity — stability as quiet source of precision |
| 土_正印 | The Root | Metal | Earth generating Metal cross-polarity — stability nourishing precision and opening direction |
| 水_比肩 | The Mirror | Water | Depth amplifying depth — perceptual intelligence running without form |
| 水_劫财 | The Rival | Water | Depth meeting depth cross-polarity — intelligence competing with intelligence |
| 水_食神 | The Flow | Metal | Metal generating Water same-polarity — precision as natural source of flowing depth |
| 水_伤官 | The Edge | Metal | Metal generating Water cross-polarity — precision producing depth that exceeds its container |
| 水_偏财 | The Field | Earth | Earth directing Water broadly — stability ranging across depth as distributed material |
| 水_正财 | The Harvest | Earth | Earth directing Water cross-polarity — stability containing depth into productive form |
| 水_七杀 | The Trial | Fire | Water pressing Fire same-polarity — the extinguishing force that doesn't moderate itself |
| 水_正官 | The Standard | Fire | Water setting standard for Fire cross-polarity — depth asking whether warmth is sustainable |
| 水_偏印 | The Well | Wood | Water generating Wood same-polarity — depth as nourishing source of reach |
| 水_正印 | The Root | Wood | Water generating Wood cross-polarity — depth nourishing reach and opening form |

### Parity rule

When Layer 2 and Layer 3 element scores are within 0.8 points of each other, treat as a dual-force layer. Label: "Dual force: [El1] · [El2]". Generate a single combined reading rather than two separate layers.

### Layer key computation

```javascript
// Layer 1
function getLayer1Key(chart) {
  const stem     = chart.dayMaster.stem;
  const band     = getEnergyBand(chart.dayMaster.strength);
  const pattern  = computeTgPattern(chart); // pure|rooted|flowing|forging|tested
  return `${stem}_${band}_${pattern}`;
}

// Layer 2/3 — resolve specific Ten God for dominant element
function getDominantTenGod(domEl, dmStem, pillars) {
  // Accumulates weighted yang/yin polarity from all stems and hidden branch stems of domEl
  // Returns: 比肩|劫财|食神|伤官|偏财|正财|七杀|正官|偏印|正印
}

// Angle lookup — READING_ANGLES is a module-level constant (not inside any component)
function getAnglesForEl(el, tenGod) {
  return READING_ANGLES[`${el}_${tenGod}`] || null;
}
```

**Critical:** `READING_ANGLES` must be defined at module level, outside all component functions. It is a static content constant that should not be rebuilt on every render.

### Reference chart layer derivation

Chart: 乙亥 庚辰 庚寅 乙酉 · DM: 庚 Metal · extremely_strong

| Layer | Key | Element | Ten God | Structural interaction |
|---|---|---|---|---|
| Layer 1 | `庚_concentrated_pure` | Metal | — | Base: Yang Metal concentrated, self-amplifying |
| Layer 2 | `金_比肩` | Metal | 比肩 | Metal precision amplifying Metal — self-referencing loop |
| Layer 3 | `木_正财` | Wood | 正财 | Metal directing Wood cross-polarity — precision shaping reach |

---

## §4 — Reading Schema: Three Angles Per Layer

### The three angles

Each Layer 2/3 key produces three angles. Written in the DM element's voice register (Metal = precise, verdict-energy; Wood = reaching, forward-leaning; Fire = warm, scene-setting; Earth = weighted, patient; Water = withheld, elliptical).

| # | Angle | Label in UI | What it answers |
|---|---|---|---|
| 1 | `how` | "How this tells about me" | The specific psychological pattern this exact TG mechanism produces. Must be specific to this `domEl_specificTenGod` combination — not derivable from TG family alone. ≤3 sentences. |
| 2 | `works` | "How this works with me" | The dynamic between the two elemental natures — when it energises vs. compresses. Neutral framing only. ≤3 sentences. |
| 3 | `deep` | "What this reveals" | The shadow layer — what this exact combination produces that others rarely name. The interior cost or gift visible only when both natures are held simultaneously. Italic. ≤3 sentences. |

### Yin/yang pair differentiation — non-negotiable

The five yin/yang TG pairs are **categorically different people**, not different intensities of the same person.

| Pair | Structural distinction |
|---|---|
| 食神 vs 伤官 | Natural, effortless, non-assertive output vs output in structural tension with frameworks (constituted by the friction it meets) |
| 正官 vs 七杀 | Framework-mediated pressure that grants recognition when quality is real vs unmediated pressure that doesn't care if you survive it |
| 正财 vs 偏财 | Disciplined cross-polarity control of specific material vs broad same-polarity ranging across distributed material |
| 正印 vs 偏印 | Nourishment that opens and directs (cross-polarity) vs nourishment that sustains and deepens without redirecting (same-polarity) |
| 比肩 vs 劫财 | Self-amplification through mirroring (same-polarity) vs self-amplification through rivalry (cross-polarity) |

**Quality gate:** Swap the TG in a key. If the angles still work, they're not specific enough.

### Synthesis block

After all layers, a synthesis paragraph (4–6 sentences) names the productive tension between layers — not a summary of each layer, but the insight that only emerges when all three are held simultaneously.

**Test:** Remove the synthesis block. If the reading still feels complete, the synthesis failed.

### Reference reading — 庚_concentrated_pure + 金_比肩 + 木_正财

**Layer 1 — Base identity (庚_concentrated_pure)**

*How this tells about me:* The pure pattern means the self amplifies itself with no natural interrupt. High internal consistency, strong resistance to external redefinition. You trust your own read over the room's consensus — and you're usually right, which makes it harder to know when you're not.

*How this works with me:* Self-sustaining but self-referencing. The same precision that makes you exceptional is what keeps you circling when direction is missing. Capability without target becomes restlessness.

*What this reveals:* The standard is fully formed. The question underneath — quiet enough that it barely registers — is whether what it's currently aimed at deserves what it can give.

**Layer 2 — Dominant energy (金_比肩 — Metal / Parallel Self)**

*How this tells about me:* 比肩 as dominant produces peer-based relational orientation. You recognise equals instinctively and are genuinely indifferent to authority that hasn't demonstrated quality. The drive is to be actually better — not to appear so. The competitive register is structural, not emotional.

*How this works with me:* Metal-on-Metal same-polarity energises at the right intensity and compresses at excess. Environments of pure evaluation with nothing generative to work on produce stagnation. The precision needs something real to work on rather than itself.

*What this reveals:* The self-sufficiency 比肩 creates can look like independence but is isolation by standard. The people who actually reach you are the ones who match the standard without being told what it is.

**Layer 3 — Secondary energy (木_正财 — Wood / Direct Wealth)**

*How this tells about me:* 正财 cross-polarity control of Wood means the precision is applied to living, growing material. The specific production: methodical pursuit of outcomes with genuine developmental substance. Deep discomfort with shortcuts. When something goes wrong, the first move is diagnostic, not emotional.

*How this works with me:* Wood is the material the edge exists to work on. Without real problems worthy of engagement, the precision turns inward. Wood grounds by giving the evaluation a legitimate direction. Metal defines what the growth becomes; Wood keeps the precision pointed at something alive.

*What this reveals:* 正财 carries a specific shadow for Metal: the risk of controlling what you care about. The same disciplined engagement that makes you excellent at directing outcomes can close the gap between building toward something and needing to possess it. The evaluative apparatus eventually asks of Wood-type relationships: is this worthy of the standard? — and doesn't always know when to stop asking.

**Synthesis**

Metal is both the engine and the atmosphere — what you are and the dominant condition you operate in. The 比肩 Parallel Self amplifies this, producing extraordinary self-sufficiency and a standard that very few things meet unaided. Wood enters as 正财 — the structured, living material the precision was built to direct. What converts the precision from a self-referencing loop into something directional is the encounter with material that has its own momentum. The question running quietly across all three layers: whether what this precision is currently aimed at deserves what it can give. The Wood layer sharpens this further — at what point does directing something become needing to possess it?

---

## §5 — Reading Architecture Overview

### Current status

| Section | Status | Source |
|---|---|---|
| Section 1 — Who You Are | ✅ Built | Static content (TEMPLATE_DB, WHO_YOU_ARE) |
| Section 2 — Energy Profile | ✅ Built | Static content (READING_ANGLES, ELEMENT_ENERGIES) |
| Section 3–10 | 🔲 Deferred | LLM-generated, not yet built |

### Architecture principle

All Sections 1–2 content is **static lookup at runtime** — no LLM at render time. Content is generated offline in batch using `generate_templates_v2.js` and compiled into engine constants (`TEMPLATE_DB`, `READING_ANGLES`, `ELEMENT_ENERGIES`, etc.). The three deliverables below (§6–8) render this pre-generated content.

Sections 3–10 [FUTURE] will use LLM generation from the Canonical JSON. That architecture is documented in Doc 4.

### Offline generation pipeline

```
generate_templates_v2.js
  generate-persona    → 149 persona cards (Pass 1) → personas.json
  retrieve-persona    → collect results
  generate-readings   → 149 reading schemas (Pass 2) → templates.json
  retrieve-readings   → collect results
  generate-angles     → 50 angle sets → angles.json
  retrieve-angles     → collect results
  check               → validate all schemas
  merge               → generated_output.js
                        exports GENERATED_TEMPLATES + GENERATED_ANGLES

Import GENERATED_TEMPLATES → TEMPLATE_DB in engine
Import GENERATED_ANGLES    → READING_ANGLES in engine (module-level constant)
```

**Estimated cost:** ~$30–38 for the full 200-key batch.

---

## §6 — Deliverable 1: DayMasterHero (Identity Card)

**Component:** `DayMasterHero({ chart })`
**Purpose:** Archetype reveal. Identity anchor. The first thing the user sees.

### Layout

```
┌──────────────────────────────────────────────────────┐
│  [element-tinted gradient background]                │
│                                                      │
│  [Archetype Seal SVG — 72px, element color]          │
│                                                      │
│  [Identity Token pill] 庚 · Yang Metal · Blade       │
│                                                      │
│  The Blade                         (38px Cormorant)  │
│                                                      │
│  "Precision before intention…"     (14px italic)     │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Does NOT render:** Energy ring, p1/p2 paragraphs, core gifts, growing edge, dimension chips (band/tgPattern/catalyst), shareable code strip, adjective chips, MBTI resonance. All of these are stored in the user profile database and surface in Deliverables 2 and 3.

---

## §7 — Deliverable 2: ElementSpectrum (Energy Blueprint)

**Component:** `ElementSpectrum({ chart })`
**Purpose:** Decode what the chart is made of and what each dominant force means.

### Fixed read order

```
ENERGY BLUEPRINT
  ─── Element composition bars (5 rows, sorted high→low) ───────────────
  ─── YOUR ELEMENTAL NATURE card ───────────────────────────────────────
  ─── DOMINANT ENERGY (or "What shapes you most" for open charts) ──────
      [1–3 dominant cards, one per element scoring ≥3]
  ─── WHAT ACTIVATES YOU ───────────────────────────────────────────────
      [1–2 catalyst cards]
  ─── WHAT CREATES FRICTION ────────────────────────────────────────────
      [1–2 friction cards]
  ─── WHAT IS ABSENT (omit if none) ────────────────────────────────────
      [dashed cards, one per missing element]
  ─── WHO YOU ARE (teaser, italic) ─────────────────────────────────────
```

### Element composition bars

Five rows sorted highest→lowest. Each row: `[element icon 24px] [element name] [10-pip bar] [count]`
- Present elements: filled pips in element color; DM element at 88% opacity, others at 58%
- Absent elements: dashed pip borders, 35% opacity, "absent" italic label
- DM element marked with ✦

### Your Elemental Nature card

Replaces the old energy condition card. Answers: **how does this element run at this charge level?** Not what the element is (that's the identity card).

```
┌────────────────────────────────────────────┐
│  YOUR ELEMENTAL NATURE (9px label)         │
│  [Element icon 24px]  Overpowering         │
│                       Self-generating      │
│                       Channel & Release    │
│                                            │
│  [Trait paragraph — ELEMENTAL_NATURE       │
│   [stem][band], 3–4 sentences, behavioral] │
│  ─────────────────────────────────────     │
│  Channel & Release — [approach line]       │
└────────────────────────────────────────────┘
```

**Band mode labels:**

| Band | Mode label | Approach label |
|---|---|---|
| Concentrated | Self-generating | Channel & Release |
| Balanced | Resonant | Maintain & Attune |
| Open | Receptive | Nourish & Amplify |

**ELEMENTAL_NATURE content source:** `ELEMENTAL_NATURE[stem][band]` — 30 trait paragraphs (10 stems × 3 bands). Each describes the psychological operating mode at this energy level. Second person, behavioral register, present tense, 3–4 sentences.

**Band weighting — how much each section matters:**

| Band | Elemental nature weight | Dominant energy weight |
|---|---|---|
| Concentrated | ~65% | ~35% |
| Balanced | ~50% | ~50% |
| Open | ~35% | ~65% (becomes "What shapes you most") |

For open charts, the dominant element explains *when this person operates at their best* — it is not background context. The section header shifts to "What shapes you most" and the intro copy adjusts accordingly.

### Dominant energy cards

**Selection:** elements scoring ≥3. Hard cap at 3 cards.

```javascript
const dominants = counts.filter(({ count }) => count >= 3).slice(0, 3);
```

Each card: element icon · element name · score bar · keyword chips · Ten God ruling force description · three angles (`how`, `works`, `deep`).

**Pure pattern note:** When `computeTgPattern === "pure"`, both sections describe the same element. The dominant card opens with: *"[Element] saturates your entire chart — this is what it means structurally for your core element to run with no counterforce."*

**Section header by band:**

| Band | Header |
|---|---|
| Concentrated / Balanced | "Dominant energy" |
| Open | "What shapes you most" |

### Catalyst and Friction — band-conditional derivation

The same element can be catalyst for one band and friction for another. This is the 扶抑用神 principle from classical BaZi — the useful god always restores balance.

| Relationship to DM | For concentrated DM | For open DM |
|---|---|---|
| Same element (比劫) | Friction (amplifies excess) | Catalyst (strengthens deficiency) |
| Generates DM (印) | Friction (adds fuel to excess) | Catalyst (primary nourishment) |
| DM generates (食伤) | Catalyst (releases excess) | Friction (drains already-scarce DM) |
| DM controls (财) | Catalyst (secondary release) | Friction (DM cannot afford expenditure) |
| Controls DM (官杀) | Catalyst (primary reduction) | Friction (compounds weakness) |

**Primary catalyst and friction per stem per band:**

| Stem | Conc. catalyst | Conc. friction | Bal. catalyst | Bal. friction | Open catalyst | Open friction |
|---|---|---|---|---|---|---|
| 甲 | Metal, Fire | Water, Wood | Water, Metal | Wood, Fire | Water, Wood | Metal, Fire |
| 乙 | Metal, Fire | Water, Wood | Water, Metal | Wood, Fire | Water, Wood | Metal, Fire |
| 丙 | Water, Earth | Wood, Fire | Wood, Water | Fire, Earth | Wood, Fire | Water, Earth |
| 丁 | Water, Earth | Wood, Fire | Wood, Water | Fire, Earth | Wood, Fire | Water, Earth |
| 戊 | Wood, Metal | Fire, Earth | Fire, Wood | Earth, Metal | Fire, Earth | Wood, Metal |
| 己 | Wood, Metal | Fire, Earth | Fire, Wood | Earth, Metal | Fire, Earth | Wood, Metal |
| 庚 | Fire, Water | Earth, Metal | Fire, Earth | Metal, Water | Earth, Metal | Fire, Water |
| 辛 | Fire, Water | Earth, Metal | Water, Earth | Metal, Fire | Earth, Metal | Fire, Water |
| 壬 | Earth, Wood | Metal, Water | Metal, Earth | Water, Wood | Metal, Water | Earth, Wood |
| 癸 | Earth, Wood | Metal, Water | Metal, Earth | Water, Wood | Metal, Water | Earth, Wood |

> **Note on 辛:** 辛 Yin Metal's balanced primary catalyst is Water (reveals the jewel's clarity), not Fire (which risks damage without Earth as mediator). The 调候 layer handles Fire promotion when seasonal warmth is the priority.

### What Is Absent

Dashed-border cards, one per missing element. Omit block entirely if no missing elements.

Framing: absence as formative force, not deficiency. "Its absence has shaped you as actively as what's present."

### Who You Are (teaser)

Closes the section. Thin divider then:

```
WHO YOU ARE  (9px uppercase label, element color)
"You're the one who already knows…"  (16px italic, primary color)
```

Source: `buildDayMasterProfile(chart).whoYouAreTeaser`. Bridges into Deliverable 3.

### CalloutCard component props

```javascript
<CalloutCard
  color={elementColor}
  borderStyle="solid" | "dashed"
  icon={elementName}
  sectionLabel="Metal · 4"
  name="Metal dominant"
  line="Italic insight sentence"
  guidance="Plain guidance sentence"
  keywords={["Precision", "Discernment", "Amplifies"]}
  // Dominant cards only:
  angles={{ how, works, deep }}
  count={4}
  totalCount={11}
  tenGod="比肩"
/>
```

---

## §8 — Deliverable 3: ProfileReading (Reading Card)

**Component:** `ProfileReading({ chart })`
**Purpose:** Reading depth layer — gifts, edges, landscape.
**Data source:** `buildDayMasterProfile(chart)`

### Layout

```
┌──────────────────────────────────────────────────────┐
│  [element-tinted gradient]                           │
│  [Energy ring 48px]  [strength label + sublabel]     │
│  ╌╌╌╌╌╌ 2 AM THOUGHT (dashed card, italic) ╌╌╌╌╌╌   │
│  ┌─────────────────────────────────────────────┐    │
│  │ ★ CORE GIFTS — label · desc × 3            │    │
│  └─────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────┐    │
│  │ 〰 GROWING EDGE — label · desc × 2          │    │
│  └─────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────┐    │
│  │ ↗ YOUR LANDSCAPE — thrives · costs          │    │
│  └─────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
```

### Energy ring

SVG partial circle, 48px, element color. DM stem character centered.

| strength | Ring % | Label | Sublabel |
|---|---|---|---|
| extremely_strong | 92% | Extremely Strong | The element is dominant — pure and concentrated |
| strong | 72% | Dominant | Well-supported and self-directed |
| moderate | 50% | Balanced | Flexible — works across many conditions |
| weak | 30% | Receptive | Needs the right conditions to come through fully |
| extremely_weak | 12% | Yielding | Highly context-dependent — finds strength through support |

### 2 AM Thought

Dashed-border card. One sentence, first person, italic. Renders only when `profile.twoAM` is non-null (compound template provides it). The structural collision of DM nature vs. primary pattern tension — uncomfortably specific. The goal: the user reads it and thinks someone has been watching them.

### Core Gifts

`CORE_STRENGTHS[stem][band]` — 3 items per combination. Each item: `{ label, desc }`.

- `label`: 2–4 words, bold, element color. Quotable.
- `desc`: 1 sentence, behavioral consequence, second person.

Band logic: concentrated → expression/output gifts · balanced → range/adaptability gifts · open → reception/collaboration gifts.

### Growing Edge

`CORE_SHADOWS[stem][band]` — 2 items per combination. Same structure.

Every edge is the shadow of a genuine strength — not a separate flaw. The same quality, different conditions.

Band logic: concentrated → excess patterns · balanced → instability patterns · open → deficiency patterns.

### Your Landscape

Renders only when `profile.landscape` is non-null. Two fields: "Where you operate at full capacity" and "Where this consistently costs you." Fit framing, not flaw framing.

### `buildDayMasterProfile()` return shape

```javascript
{
  archetype,        // "The Blade"
  manifesto,        // "Precision before intention…"
  band,             // "concentrated"
  tgPattern,        // "pure"
  catalyst,         // "Fire"
  strengthRing,     // { pct, label, sublabel }
  whoYouAreTeaser,  // used in ElementSpectrum teaser
  whoYouAreP2,      // synthesis fallback in ElementSpectrum
  strengths,        // [{ label, desc }] — band-specific, 3 items
  shadows,          // [{ label, desc }] — band-specific, 2 items
  twoAM,            // string | null
  landscape,        // { thrives, costs } | null
  persona,          // persona card object | null (from TEMPLATE_DB)
}
```

---

## §9 — Literary Voice Rules

These rules apply to all user-facing text — static content in Sections 1–2 and LLM-generated content in Sections 3–10 [FUTURE].

### The jargon-free principle

All BaZi technical terms are engine inputs only. They never appear in user-facing text. No exceptions.

**Permanently banned from all user-facing output:**
Day Master, Ten Gods, Food God, Hurt Officer, Seven Killings, Direct Officer, Parallel Self, Rob Wealth, Direct Wealth, Indirect Wealth, Direct Seal, Indirect Seal, 比肩, 劫财, 食神, 伤官, 偏财, 正财, 七杀, 正官, 偏印, 正印, 日主, 格局, 大运, 流年, 用神, 喜神, 忌神, 调候, 扶抑

The system handles the astrology. The reading delivers the meaning.

### Translation table (technical → reading language)

| Technical input | Literary output |
|---|---|
| Yang Metal, extremely strong | "You have an unusually stable core. Your sense of what is true arrives before the conversation does." |
| Missing Fire / no Officer stars | "The part of you that gets shaped by external authority — it was born quiet. You've never been easily molded by institutions. This isn't rebellion. It's architecture." |
| Strong self energy (比劫 dominant) | "Your self-direction is structural, not chosen. You have a strong inner axis that doesn't require external confirmation to feel real." |
| Output-to-wealth pattern | "Your creativity is your financial engine. The more directly your work carries your fingerprints, the more naturally success follows." |
| Seven Killings in flow year | "This year brings a testing force. Something external will press on you and ask: is the edge real? Is the work real?" |
| Direct Officer in flow year | "This year carries the possibility of genuine recognition — not performance-based praise, but the kind that arrives when someone with standing encounters the real quality of what you've built." |

### Voice specifications

**Person:** Second person ("you", "your") throughout. Never third person in readings.

**Tense:** Present tense for nature/character. Past for past decades. Possibility framing for future.

**Register:** Wise mentor. Emotionally intelligent friend. Not a therapist. Not a horoscope.

**Validation sequence:** Name what is genuinely true and affirming before naming what is hard. The reader needs to feel seen before they can hear the challenge.

**Required patterns:**
- Every claim traceable to a specific computed chart element
- Honest complexity: every strength has a shadow — name both
- Practical orientation: always land on "what does this mean for how I live"
- The person's agency: the chart describes weather, not fate

**Forbidden patterns:**
- Generic affirmations: "You are destined for greatness"
- Mystical obfuscation: "The cosmic energies align to..."
- False precision: "On March 14th you will..."
- Catastrophizing: "You will face great difficulty..."
- Vague positives without chart grounding

---

## §10 — Model Assignment

| Task | Model | Reason |
|---|---|---|
| Offline template generation (production) | claude-opus-4-20250514 | Prose quality, emotional precision |
| Offline template generation (dev) | claude-sonnet-4-6 | Cost-efficient for iteration |
| UI / code generation | claude-sonnet-4-6 | Handles JSX, fast iteration |
| Calculation engine | **No LLM** | Pure JavaScript. Non-negotiable. |
| Sections 1–2 content at runtime | **No LLM** | Static lookup. All content pre-generated. |
| Sections 3–10 at runtime [FUTURE] | claude-opus-4-20250514 | Reads Canonical JSON, never raw birth data |

---

## §11 — Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | April 2026 | Extracted from monolith Bible. Structure locked. Reading architecture (§3–10) deferred to Doc 4. |

---

## Document Metadata

| | |
|---|---|
| **Document** | Doc 2 — Archetype System & Reading Architecture |
| **Version** | 1.0  ·  April 2026 |
| **Status** | STRUCTURE LOCKED · Section 3–10 reading architecture in development |
| **Audience** | Product, content, frontend engineers, generation system |
| **Purpose** | Defines the identity and reading system. What users see, how keys are computed, the 50-key taxonomy, and how the three deliverables are structured. |
| **Stability** | MEDIUM — key taxonomy and Sections 1–2 locked; Section 3–10 deferred |
| **Used by** | Elementum_Engine.jsx · generate_templates_v2.js · Doc4 · Doc5 |
| **Compatible with** | Doc1 v1.0 · Doc6 v1.0 |
