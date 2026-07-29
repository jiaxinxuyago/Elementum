# Elementum · REA_01 — Archetype System

> **Formerly DES_01** (moved to the Reading library in the 2026-07-23 design/reading doc separation) **and before that DOC2** (2026-07-09 reorganization). Historical citations of "DES_01" or "DOC2" refer to this file (registry: Operations/README.md).

> **⚠ v2.1 RECONCILIATION (2026-06-24 · see `REA_08_Reading_V2.1_Reconciliation_Audit.md`).** Deltas for this doc: (1) the 50-key Layer-2 taxonomy is **persona-per-god — all 10 Ten Gods are distinct personas** (比肩 The Twin ≠ 劫财 The Rival); never collapse to 5 families. (2) The reading **navigates DM-relative**: each of the user's 5 elements = one Ten-God *direction* vs their Day Master, and **polarity splits it into up to two faces** surfaced by math (see schema v2.1 §1–§2). (3) Persona names follow the **2026-06-30 FACES-handoff register** (`d13/IMPLEMENTATION_README §4`): The Twin · The Rival · The Sage · The Alchemist · The Artisan · The Virtuoso · The Steward · The Horizon · The General · The Magistrate — this revised **4** from the 2026-06-10 set (Mirror→Twin, Muse→Artisan, Edge→Virtuoso, Arbiter→Magistrate). The Profile-DB names (Flow/Trial/Root) and the Inner-Council concept-art names are **non-surfacing aliases**. (4) Disambiguate vocabulary: the **ten stem archetypes** (Oak…Rain — identity) are a different "ten" from the **ten Ten-God personas** (the faces). (5) The persona layer is promoted from `planned` to the primary reading surface.

---

## §1 — System Overview

### The core principle

The Elementum archetype system is a **layered cocktail model** — a dynamic stack of identity lenses that compose differently for every chart. Rather than encoding all variables into a single compound key, the system separates identity into two distinct layers (v2.1) derived independently and read together. The synthesis of both is the reading.

**The foundational insight from classical BaZi:** The same Day Master element living under different dominant energies is a categorically different person. The Ten God relationship — how the dominant energy relates to the Day Master — determines the psychological mechanism, not just the elemental content. This is what 子平真诠 actually describes. This system implements it.

**Lineage and the substance-vs-function principle (2026-06-25).** Elementum's calculation commits to a **子平真诠 (structure-core) + 滴天髓 (relative-clash)** synthesis (rules in DEV_01 §3; sourcing in REA_02 PART 2). The archetype system consumes that engine's output through one load-bearing distinction:

- **Dominance ranking = 五行 substance (旺衰).** Which energies lead a chart — and therefore which Ten-God personas surface and in what order — is decided by elemental *substance*, modified only by positional 旺衰, true transformation (真化), and relative 冲. This is what picks the archetype key and the card order.
- **合-binding and 刑/害/破 = function, not substance.** A combination that binds without transforming, or a 刑/害/破, changes how an energy *behaves and relates* — it is reading/event-layer texture, never a numeric re-rank of the dominance. It colors a persona's content; it does not promote or demote it.

So when a reading says a bound or clashed energy "feels constrained," that is the **function** layer speaking — the energy still holds its **substance** rank on the wheel. Never let 合/刑/害/破 silently reorder the personas; they modulate within a rank, not across ranks.

### Two tiers, two purposes

| Tier | Purpose | Audience | Format |
|---|---|---|---|
| Tier 1 | User-facing identity — the anchor, the recognition moment | The user | Identity card |
| Tier 2 | Internal reading derivation — what drives the layered content | The engine | Three computed layer keys |

### The cardinal rule from DEV_01

The calculation engine (DEV_01) outputs a Canonical JSON object. This document operates entirely from that JSON — never from raw birth data, never from LLM calculation. The calculation engine is the only place where numbers are computed.

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
| 庚 | The Blade | Metal | Yang | "Precision before intention · An edge is never given — it is forged." |
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

### Two layers (v2.1)

> **Owner revision 2026-06-24 (B5 + 2-layer model).** The model is **two layers, not three**: (1) the **Day Master identity card**, and (2) the **energy / Ten-God cards** — *every* present energy gets a reading through its Ten-God persona(s). The old "dominant (Layer 2) vs secondary (Layer 3)" split is **retired**: "dominant/secondary" are now **derived role badges** inside Layer 2, not separate layers. The **self element is included** — its 比肩 (The Twin) / 劫财 (The Rival) faces render as energy cards, in a section **separate from the Layer-1 identity reading**. The 50-key taxonomy below is unchanged (it is the `ENERGY_CARD_DATA[element_god]` pool); only the old non-DM selection rule is dropped. ⚠ The generation scripts referenced in the §3 lock note must take the same 3→2 update.

| Layer | What it is | Key formula | Count |
|---|---|---|---|
| Layer 1 | **Identity** — the Day Master identity card (DM stem, energy band, structural pattern) | `[stem]_[band]_[tgPattern]` | 150 |
| Layer 2 | **Energy / Ten-God cards** — every present energy, read through its Ten-God persona(s) | `[element]_[tenGod]` | 50 |

Total unique content units: **200** (150 Layer-1 identity templates + 50 Layer-2 persona/reading entries).

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

**One key is hand-authored as the reference standard:** `庚_concentrated_pure` — see REA_05 §11 for the full reference reading.

### Layer 2 key (element × specific Ten God)

```
[dominantElement]_[specificTenGod]
Example: 金_比肩
```

**Why 50 keys, not more:** `domEl × specificTenGod` uniquely implies the DM element. Given the dominant element and the specific Ten God, there is exactly one DM element family that can produce that relationship. The apparent 3D space collapses to 50 unique interactions. Each entry is written knowing precisely which two elemental natures are in relationship.

### Full 50-key taxonomy (LOCKED)

| Key | Persona name | DM element | Structural interaction |
|---|---|---|---|
| 金_比肩 | The Twin | Metal | Metal precision amplifying Metal — same-polarity self-referencing loop |
| 金_劫财 | The Rival | Metal | Metal meeting Metal cross-polarity — similar nature, competitive register |
| 金_食神 | The Artisan | Earth | Earth generating Metal same-polarity — stability as natural source of precision |
| 金_伤官 | The Virtuoso | Earth | Earth generating Metal cross-polarity — precision that structurally exceeds its container |
| 金_偏财 | The Horizon | Fire | Fire directing Metal broadly — warmth applied to precision as distributed material |
| 金_正财 | The Steward | Fire | Fire directing Metal cross-polarity — focused warmth shaping the edge with discipline |
| 金_七杀 | The General | Wood | Metal pressing Wood same-polarity — the cutting force that doesn't grant permission |
| 金_正官 | The Magistrate | Wood | Metal setting standard for Wood cross-polarity — precision that tests and grants recognition |
| 金_偏印 | The Alchemist | Water | Metal generating Water same-polarity — precision as the source sustaining depth |
| 金_正印 | The Sage | Water | Metal generating Water cross-polarity — precision nourishing and opening intelligence |
| 木_比肩 | The Twin | Wood | Reach amplifying reach — developmental instinct without definition or counterforce |
| 木_劫财 | The Rival | Wood | Reach meeting reach cross-polarity — growth competing with growth |
| 木_食神 | The Artisan | Water | Water generating Wood same-polarity — depth as natural source of effortless reach |
| 木_伤官 | The Virtuoso | Water | Water generating Wood cross-polarity — depth producing reach that exceeds its container |
| 木_偏财 | The Horizon | Metal | Metal directing Wood broadly — precision ranging across living material |
| 木_正财 | The Steward | Metal | Metal directing Wood cross-polarity — precision shaping reach toward structured outcomes |
| 木_七杀 | The General | Earth | Wood pressing Earth same-polarity — the destabilising reach that roots break stone |
| 木_正官 | The Magistrate | Earth | Wood setting standard for Earth cross-polarity — movement asking whether stability is living |
| 木_偏印 | The Alchemist | Fire | Wood generating Fire same-polarity — reach as fuel sustaining warmth |
| 木_正印 | The Sage | Fire | Wood generating Fire cross-polarity — reach nourishing warmth and opening direction |
| 火_比肩 | The Twin | Fire | Warmth amplifying warmth — illumination running without containment |
| 火_劫财 | The Rival | Fire | Warmth meeting warmth cross-polarity — presence competing with presence |
| 火_食神 | The Artisan | Wood | Wood generating Fire same-polarity — reach as natural source of warmth and expression |
| 火_伤官 | The Virtuoso | Wood | Wood generating Fire cross-polarity — reach producing warmth that challenges frameworks |
| 火_偏财 | The Horizon | Water | Water directing Fire broadly — depth ranging across warmth as distributed material |
| 火_正财 | The Steward | Water | Water directing Fire cross-polarity — depth shaping illumination into structured purpose |
| 火_七杀 | The General | Metal | Fire pressing Metal same-polarity — the forge that doesn't moderate itself |
| 火_正官 | The Magistrate | Metal | Fire setting standard for Metal cross-polarity — the forge that refines and grants recognition |
| 火_偏印 | The Alchemist | Earth | Fire generating Earth same-polarity — warmth as activation source for stability |
| 火_正印 | The Sage | Earth | Fire generating Earth cross-polarity — warmth nourishing stability and opening movement |
| 土_比肩 | The Twin | Earth | Stability amplifying stability — holding force deepening without movement |
| 土_劫财 | The Rival | Earth | Stability meeting stability cross-polarity — ground competing with ground |
| 土_食神 | The Artisan | Fire | Fire generating Earth same-polarity — warmth as natural source of stable deposits |
| 土_伤官 | The Virtuoso | Fire | Fire generating Earth cross-polarity — warmth building structure beyond expectation |
| 土_偏财 | The Horizon | Wood | Wood directing Earth broadly — reach ranging across stable material |
| 土_正财 | The Steward | Wood | Wood directing Earth cross-polarity — reach shaping stability into structured cultivation |
| 土_七杀 | The General | Water | Earth pressing Water same-polarity — the dam blocking depth without permission |
| 土_正官 | The Magistrate | Water | Earth setting standard for Water cross-polarity — containment asking whether depth has form |
| 土_偏印 | The Alchemist | Metal | Earth generating Metal same-polarity — stability as quiet source of precision |
| 土_正印 | The Sage | Metal | Earth generating Metal cross-polarity — stability nourishing precision and opening direction |
| 水_比肩 | The Twin | Water | Depth amplifying depth — perceptual intelligence running without form |
| 水_劫财 | The Rival | Water | Depth meeting depth cross-polarity — intelligence competing with intelligence |
| 水_食神 | The Artisan | Metal | Metal generating Water same-polarity — precision as natural source of flowing depth |
| 水_伤官 | The Virtuoso | Metal | Metal generating Water cross-polarity — precision producing depth that exceeds its container |
| 水_偏财 | The Horizon | Earth | Earth directing Water broadly — stability ranging across depth as distributed material |
| 水_正财 | The Steward | Earth | Earth directing Water cross-polarity — stability containing depth into productive form |
| 水_七杀 | The General | Fire | Water pressing Fire same-polarity — the extinguishing force that doesn't moderate itself |
| 水_正官 | The Magistrate | Fire | Water setting standard for Fire cross-polarity — depth asking whether warmth is sustainable |
| 水_偏印 | The Alchemist | Wood | Water generating Wood same-polarity — depth as nourishing source of reach |
| 水_正印 | The Sage | Wood | Water generating Wood cross-polarity — depth nourishing reach and opening form |

### Parity rule — RETIRED (v2.1)

> **Retired 2026-06-24 (2-layer model).** With Layer 3 gone, **every present energy gets its own card/reading** — there is no dominant-vs-secondary merge. Near-equal energies simply render as separate cards ordered by weight; "dominant"/"secondary" survive only as derived role badges.

### Layer key computation

```javascript
// Layer 1
function getLayer1Key(chart) {
  const stem     = chart.dayMaster.stem;
  const band     = getEnergyBand(chart.dayMaster.strength);
  const pattern  = computeTgPattern(chart); // pure|rooted|flowing|forging|tested
  return `${stem}_${band}_${pattern}`;
}

// Layer 2 — resolve specific Ten God for each present element
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

Chart: 乙亥 庚辰 庚寅 乙酉 · DM: 庚 Metal · **strong (0.72) · concentrated · pattern forging · catalyst Fire**

> **Re-founded 2026-06-25** (Task #6) after the engine 合而不化 + relative-冲 fix (DEV_01 §3.7 / §3.7b). The aggressive 乙庚→Metal and 辰酉→Metal transformations no longer fire (辰 month is Earth, not Metal → 真化 gate fails), so Metal de-inflates (42→23) and Wood/Earth restore. Dominance: **earth 33 ≈ wood 33 > metal 23 > water 6 > fire 5**; wood (财) edges earth → structural pattern **forging**. Classical frame: **身强财旺 / 火炼庚金** — a strong self (印 辰土 + 羊刃 酉根) with a rooted, transparent 财 (乙乙 透, 寅亥 根), seeking the fire (用神) that forges raw metal into a finished tool. Golden reference reading: `D:\Elementum\Samples\elementum_section1_geng_concentrated_forging_fire.html`.

**Layer 1 — Identity card** (the 庚 Day-Master self, read alone):

| Key | Band | Pattern | Reading |
|---|---|---|---|
| `庚_concentrated_forging` | concentrated | forging | The Blade — strong self with abundant material to shape, seeking the forge's heat |

**Layer 2 — Energy / Ten-God cards** (every present energy, by its polarity-resolved lead face; deck order = self → presence desc):

| Key | Element | Presence | Lead face (god) | Role |
|---|---|---|---|---|
| `金_比肩` | Metal | 23% | 比肩 The Twin (yang) | core / self |
| `木_正财` | Wood | 33% | 正财 The Steward (yin-led; 偏财 The Horizon also present) | 财 — catalyst |
| `土_偏印` | Earth | 33% | 偏印 The Alchemist (yang) | 印 — friction |
| `水_食神` | Water | 6% | 食神 The Artisan (yang) | 食伤 — flow (食伤生财) |
| `火_七杀` | Fire | 5% | 七杀 The General (yang) | 官杀 — the sought forge (用神) |

*(2-layer model — no Layer 3. The old `庚_concentrated_pure` + Layer-3 `木_正财` derivation is retired; the pre-fix golden file `elementum_section1_geng_concentrated_pure_fire.html` is kept only as a generic pure-pattern sample.)*

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
| **Purpose** | Single source of truth for the archetype identity system and layer key taxonomy. What each archetype is, how keys are computed, and the full 50-key interaction map. Nothing about reading content, deliverable layout, or generation — those live in REA_05. |
| **Stability** | HIGH — the taxonomy is the contract. Changes require updating batchGenerate.js and Elementum_Engine.jsx |
| **Used by** | Elementum_Engine.jsx · batchGenerate.js · REA_05 · DES_04 |
| **Compatible with** | DEV_01 v1.0  *(Doc 6 was the Manual — retired; Doc 6 now = Reading Schema)* |
