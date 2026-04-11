# Elementum · Doc 2 — Archetype System

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

**One key is hand-authored as the reference standard:** `庚_concentrated_pure` — see Doc 4 §11 for the full reference reading.

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

## §4 — Version History

| Version | Date | Changes |
|---|---|---|
| 1.1 | April 2026 | Scope narrowed to archetype formula and rules only. Reading schema, deliverables, voice rules, and model assignment moved to Doc 4. |
| 1.0 | April 2026 | Extracted from monolith Bible. Structure locked. |

---

## Document Metadata

| | |
|---|---|
| **Document** | Doc 2 — Archetype System |
| **Version** | 1.1  ·  April 2026 |
| **Status** | LOCKED — archetypes, taxonomy, and key formulas are structural definitions |
| **Audience** | Engineers, product, generation system |
| **Purpose** | Single source of truth for the archetype identity system and layer key taxonomy. What each archetype is, how keys are computed, and the full 50-key interaction map. Nothing about reading content, deliverable layout, or generation — those live in Doc 4. |
| **Stability** | HIGH — the taxonomy is the contract. Changes require updating batchGenerate.js and Elementum_Engine.jsx |
| **Used by** | Elementum_Engine.jsx · batchGenerate.js · Doc 4 · Doc 5 |
| **Compatible with** | Doc 1 v1.0 · Doc 6 v1.0 |
