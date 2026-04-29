# DOC9 · Archetype Fields (Design Companion)

> **What this is.** A designer-facing companion to [`archetypeSchema.js`](../../Elementum_App/src/content/archetypeSchema.js). When you're scoping a new screen, block, card, or infographic — this tells you *which fields are available* for that surface, *what the copy cap is*, and *what assets feed it*. Grouped by UI surface, not by data shape.
>
> **Source of truth.** `archetypeSchema.js` — if this doc and the schema disagree, the schema wins. Bump the version in the schema when you change a field.
>
> **Status.** Schema v0.1.0-draft. Nothing is set in stone. Fields can be added, renamed, or deprecated as the app is built.
>
> **Reference archetype.** All examples come from 庚 (Yang Metal — The Blade), the completed golden reference. When you scale a new block to another stem, 庚 shows what "complete" looks like.

---

## Legend

| Tier | Meaning |
|---|---|
| FREE | Shipped to all users |
| PRO | Seeker / Advisor-gated |
| INTERNAL | Never rendered (synthesis context, author anchors) |
| MIXED | Field has sub-parts on both sides of the paywall |

| Status | Meaning |
|---|---|
| ✓ | Present and passes constraints |
| — | Required but missing |
| ⚠ | Constraint violation (word cap, array length, enum) |
| ◐ | Placeholder value — acceptable but flagged for replacement |
| dep | Deprecated — do not author new entries |

Verify any archetype's coverage in the DevBar → **Schema** tab.

---

## VaryBy Tag Library

Every field in the schema declares a `varyBy` tag that tells the generation pipeline how many authored variants are needed and stops different archetype universes from colliding under the same `×10` label. The tag is rendered in the DevBar next to the tier chip (e.g. `stem×10`, `tg×10`, `element·tg×50`).

**Dimensions — the full set:**

| Dimension | Cardinality | Category | Status | Description |
|---|---|---|---|---|
| `stem` | 10 | archetype | in-use | Day Master stem — 甲乙丙丁戊己庚辛壬癸. Primary axis for STEM_CARD_DATA. |
| `tg` | 10 | archetype | planned | Ten God — 比肩 劫财 食神 伤官 偏财 正财 七杀 正官 偏印 正印. TG_CARD_DATA. |
| `element` | 5 | archetype | available | Five Elements — Wood/Fire/Earth/Metal/Water. Yang/Yin stems of the same element share. |
| `polarity` | 2 | archetype | available | Yang / Yin. Usually covered by stem; use only when a field is polarity-specific. |
| `band` | 3 | modifier | in-use | DM strength — concentrated / balanced / open. |
| `tgPattern` | 5 | modifier | in-use | TG structure — pure / rooted / flowing / forging / tested. |
| `branch` | 12 | modifier | available | 地支 — 子丑寅卯辰巳午未申酉戌亥. |
| `season` | 4 | modifier | available | Birth season — spring/summer/autumn/winter. |
| `gender` | 2 | modifier | available | Reader gender. Use only if copy must differ. |
| `lifeDomain` | 4 | slot | in-use | career / relationships / wealth / health. |
| `lifeStage` | 4 | slot | available | Reader life phase bucket. Not currently used. |
| `lifePeriod` | 8 | slot | available | 大运 decade. |
| `annualPillar` | 60 | slot | available | 流年 annual stem-branch pair. |

**Status legend:** `in-use` = schema currently tags fields this way · `planned` = next schema extension · `available` = dimension is defined but no field uses it yet.

**Category legend:** `archetype` = who the reading is about · `modifier` = chart structure · `slot` = where in the reading.

**Common compound tags** (multiple dimensions multiplied):

| Tag | Cardinality | Meaning |
|---|---|---|
| `stem×10` | 10 | Per-stem baseline (most current schema fields) |
| `tg×10` | 10 | Per-Ten-God baseline (future TG schema) |
| `element×5` | 5 | Element-level (yang/yin share) |
| `element·tg×50` | 50 | Compound archetype (`DomEnergyTg_Data.js`, planned) |
| `band·tgPattern×15` | 15 | Variant signature inside one stem (used in `blocks[].text` key namespace) |
| `stem·band·tgPattern×150` | 150 | Full variant surface (`STEM_CARD_DATA.js` — 庚 complete, others TODO) |
| `stem·lifeDomain×40` | 40 | Per-stem × per-domain (e.g. `liunianSignatures.*` when authored at this grain) |
| `tg·lifeDomain×40` | 40 | Per-TG × per-domain |

**Authoring rule:** if your field doesn't fit any combination above, extend `VARY_DIMENSIONS` in [`archetypeSchema.js`](../../Elementum_App/src/content/archetypeSchema.js), add a cardinality to `VARY_CARDINALITY`, and add a `VARY_LIBRARY` entry — then this doc gets the corresponding row. The DevBar picks up new dimensions automatically; color palette may need a pigment for the new primary dimension in `DevBar.jsx → VaryChip`.

> `tier` is **not** a varyBy dimension. Tier is gating (who sees the field); varyBy is authoring cardinality (how many variants exist). Keep them in separate schema fields.

---

## 1 · Reveal Hero (DayMasterHero) — first reading screen

**Render target.** `RevealScreen.jsx` — full-screen, no scroll.  **Tier.** All FREE.

| Field | Type | Copy cap | Asset | 庚 example |
|---|---|---|---|---|
| `identity.archetypeName` | string | ≤ 3 words | — | *The Blade* |
| `identity.archetypeLabel` | string | ≤ 6 words | — | *Yang Metal — The Blade* |
| `identity.identityIcon` | ComponentKey | — | **React SVG component** — per-stem preferred; `ArchetypeSeal` is an accepted generic fallback (flagged as ◐ placeholder). See `ASSET_CONVENTIONS.identityIcon`. | *BladeJian* |
| `identity.manifesto` | string, split on ` · ` | ≤ 14 words total | — | *Precision before intention · An edge is never given — it is forged.* |

**Badge tiles** (derived from chart at runtime, not authored per archetype):
- Element badge ← `chart.dayMaster.element`
- Stem badge ← `chart.dayMaster.stem` + pinyin
- Polarity badge ← `chart.dayMaster.polarity` → "Yang" / "Yin"

---

## 2 · Elemental Nature · Layer 0 (world-building intro)

**Register.** Third-person, codex tone, classical source grounding. **No "you".**

| Field | Type | Copy cap | 庚 example |
|---|---|---|---|
| `identity.elementIntro.punch` | string | 9–12 words, one declarative sentence | *The Blade is the ancient cutting force of Metal.* |
| `identity.elementIntro.expand` | string | 16–20 words, adjective-rich, describes presence | *Sharp without announcement, cold without cruelty — it carries in a person the stillness of something that has already decided.* |

---

## 3 · Elemental Nature · Section 1 (Your Nature)

**Register.** Second-person ("you / your"). **Tier.** All FREE except `yourNature.phrase`.

| Field | Type | Copy cap | Notes | 庚 example |
|---|---|---|---|---|
| `subtitle` | string, split on ` · ` | — | Right half names the impulse (Yin/Yang). | *Evaluation runs before engagement begins · The Definition Impulse (Yang)* |
| `chips` | string[] | exactly **5 items**, each ≤ 3 words | Single word or hyphenated compound. | *[Evaluative, Uncompromising, Precision-first, Self-sufficient, Justice-oriented]* |
| `yourNature.phrase` | string | ≤ 4 words | **INTERNAL** — authoring anchor, not rendered. | *The Imperial Executioner* |
| `yourNature.desc` | string | 2–3 sentences | Varies by band×pattern — variants live in `STEM_CARD_DATA.js`, keyed `{stem}_{band}_{pattern}`. | *The most honest person in any room, often the most alone in it. Precision arrives before warmth does…* |
| `gifts[]` | object[3] | `phrase` ≤ 5 words · `desc` 1–2 sentences | Three cards. Each a distinct angle. | `{ phrase: "The Structural Read", desc: "You don't choose to assess — the read finishes before you've decided to begin it." }` |
| `shadows[]` | object[3] | same as gifts | | `{ phrase: "The Finished Too Early", desc: "You tend to call things complete before they've fully arrived…" }` |

---

## 4 · Detail Page · Blocks Grid

**Shape.** `blocks[]` — 5–11 blocks per archetype. Each block carries default text plus overrides keyed by band, pattern, or `band_pattern`.

**Renderer rule.** Walk from most specific to least: `concentrated_pure` → `concentrated` → `pure` → `default`. First match wins.

| Subfield | Type | Copy cap | Notes | 庚 example |
|---|---|---|---|---|
| `blocks[].label` | string | ≤ 7 words | Block heading. | *How you experience the world* |
| `blocks[].bands[]` | enum[] | — | Subset of `['concentrated', 'balanced', 'open']` |
| `blocks[].patterns[]` | enum[] | — | Subset of `['pure', 'rooted', 'flowing', 'forging', 'tested']` |
| `blocks[].priority` | object | — | `{ default: n, [variantKey]: n }` — higher wins for render order |
| `blocks[].text` | object | — | `{ default: "...", concentrated: "...", tested: "...", concentrated_pure: "..." }` — `default` required |

**Block paragraph caps** (typographic guidance, not enforced by schema):
- `default` text: 4–7 sentences
- Variant overrides: match the default's length discipline

---

## 5 · Section 2 · The Force (Dominant Energy layer)

Element-dominant characterological reading. Kicks in when the chart shows this element dominating.

| Field | Type | Copy cap | Tier | 庚 example |
|---|---|---|---|---|
| `dominantEnergy.label` | string | ≤ 3 words | FREE | *The Force* |
| `dominantEnergy.teaser` | string | 2–3 sentences | FREE | *When Metal is the dominant force in your chart, precision isn't something you reach for — it's the default state…* |
| `dominantEnergy.characterDesc` | string | 3–5 paragraphs | **PRO** | *When Metal is dominant in your chart, precision is not just your nature — it is the atmosphere you operate in…* |

---

## 6 · Section 3 · The Edge in Motion

Environmental / operational reading. How this energy moves through the user's world.

| Field | Type | Copy cap | Tier | 庚 example |
|---|---|---|---|---|
| `energy.keywords` | string[] | exactly **5 items**, each ≤ 3 words | FREE | *[Defining, Cutting, Structural clarity, Forced decision, Precision force]* |
| `energy.what` | string | 1 paragraph | FREE | *庚 is the blade, the axe, the harvest tool — the Yang Metal that cuts, defines, and restructures…* |
| `energy.represents` | string | 1 paragraph | FREE | *Major restructuring in environments — organizational, governmental, relational…* |
| `energy.liunian` | string | 1–2 paragraphs | **PRO** | *When 庚 energy enters your luck cycle or annual pillar, the environment demands clarity and decision…* |

> **Canonical field name is `keywords`.** Older files may still use `chips`. The coverage walker reports `chips` as missing against the schema.

---

## 7 · Elemental Nature · Usage Manual

How the user *works with* their stem's energy.

| Field | Type | Copy cap | Tier | Notes |
|---|---|---|---|---|
| `manual.concentrated` | string | 1 paragraph | FREE | When the stem/element is concentrated |
| `manual.open` | string | 1 paragraph | FREE | When absent or weak |
| `manual.catalyst` | string | 2 paragraphs | MIXED | FREE teaser + PRO full analysis share the field — paywall splits at a natural paragraph break |
| `manual.resistance` | string | 1–2 paragraphs | **PRO** | How to work with it when it creates friction |

---

## 8 · The Forging Season (PRO detail page)

Seasonal calibration · 调候用神 from 穷通宝鉴. Distinct from `manual.catalyst` (病药用神 system).

| Field | Type | Copy cap | Tier | 庚 example |
|---|---|---|---|---|
| `seasonalCalibration.label` | string | ≤ 3 words | FREE | *The Forging Season* |
| `seasonalCalibration.element` | enum | one of Wood/Fire/Earth/Metal/Water | FREE | *Fire* |
| `seasonalCalibration.teaser` | string | 2–3 sentences | FREE | *There is a specific kind of period that doesn't arrive often but changes everything when it does…* |
| `seasonalCalibration.desc` | string | 4–6 paragraphs | **PRO** | Classical source grounding. |

---

## 9 · Dynamic Energy Blueprint (PRO · internal sourcing)

Foundation for the PRO product. Structured by life domain.

**Domains.** `career`, `relationships`, `wealth`, `health`.

**Each domain entry (LiunianEntry shape):**

| Subfield | Type | Notes |
|---|---|---|
| `trigger` | string | Year/month/pillar configuration that activates this signature |
| `event` | string | What the user experiences when it activates |
| `timing` | string | Concrete years / branch months when it peaks |
| `source` | string | Classical Chinese source citation — **internal only**, not rendered |

> All four domains must be populated for PRO completeness. 庚 has all 4; most other stems have 0.

---

## 10 · Internal Reference (never rendered)

Authoring anchors that never surface in UI. Used by the generation pipeline for tone calibration.

| Field | Type | Notes |
|---|---|---|
| `psych.bigFive` | string | Big Five / HEXACO signature |
| `psych.jungian` | string | Dominant function + cognitive pattern |
| `psych.attachment` | string | Attachment style + texture |
| `psych.shadow` | string | Core wound / defense mechanism |
| `archetypes` | string[] | External framework mappings (MBTI, Enneagram, …) |

---

## 11 · Deprecated

`lifeDomains` (stem-level) — migrated to `TG_CARD_DATA[tg].domains`. Do not author new entries.

---

## Asset Conventions

| Slot | Where it lives | Naming | Props |
|---|---|---|---|
| `identity.identityIcon` | `Elementum_App/src/components/RevealScreen.jsx` (inline SVG for now — will move to `components/stems/` when we split) | `<ArchetypeName><Shape>` — e.g. `BladeJian` for 庚 | `{ size, color }` |
| Stem glyph | `RevealScreen.jsx` · `HeroStemMark` / `StemSign` | Chinese character in typeface — no raster | — |

**Status.** 庚 has its own SVG (`BladeJian`). Other 9 stems use `ArchetypeSeal` (generic fallback, flagged ◐ by coverage walker).

---

## When you propose a new component

1. Read the UI surface section above that maps to your screen.
2. Scope the component to fields already in the schema. Don't invent new field names in the component — add them to the schema first.
3. If you need a new field: add it to [`archetypeSchema.js`](../../Elementum_App/src/content/archetypeSchema.js), bump `SCHEMA_VERSION`, populate for 庚 as the reference, then document it here.
4. For asset-bearing fields, note the naming and location conventions above.

## Checking coverage

DevBar → **Schema** tab shows real-time coverage for the active stem. The coverage bar and per-field dots tell you at a glance what's ready and what's not.
