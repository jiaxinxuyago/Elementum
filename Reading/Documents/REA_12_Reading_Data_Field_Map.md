# REA_12 — Reading Data Field Map

**Created 2026-07-27 · status: DRAFT for owner markup · the first step of the data-field mapping & categorization phase.**
**Purpose:** one map of every reading data field on the journey surfaces — its type, variant axis, measured length, budget, and source of truth — the ruling sheet for deciding vocabulary, constants vs archetype-varying variables, and template-generation rules.
**Sources:** the JourneyCatalogue design handoff (`Design/assets/Library/Elementum Design Handoff_JourneyCatalogue/` — breakdown boards + `template-data.json` + part-2 readings), reconciled against the **live** contract (`Elementum_App/src/components/journey/journeyData.js` — piping verified 2026-07-23) and the canonical docs (REA_11 vocabulary · REA_07 concept law · REA_06 field dictionary · REA_04 key system · REA_09 budget audit).
**Measured lengths** are real min–max across all authored variants in the live content modules (2026-07-27 run of `measure-field-lengths.mjs`), not estimates. **⚠ flags** mark measured-vs-budget conflicts — each is an owner budget ruling waiting to happen.
**Twin:** `Reading/Database/REA_12_field_map.xlsx` (generated from this doc — regenerate after edits).

---

## 0 · The variant-axis taxonomy (column 3 vocabulary)

Every field varies along exactly one of these axes. This is the categorization backbone; a field that doesn't fit is a schema smell.

| Axis | Count | Meaning | Authored? |
|---|---|---|---|
| **CONSTANT** | 1 | Vocabulary-law term or fixed copy — identical for every user (REA_07 law #1) | Locked once |
| **STEM** | ×10 | Varies by day-master stem (甲…癸 — the archetype identity) | Yes |
| **STEM·BAND** | ×30 | Stem × energy band (concentrated/balanced/open) | Planned (K1b) |
| **STEM·BAND·PATTERN** | ×150 | Full Layer-1 variant surface (K1) | Partial (庚 done) |
| **ELEMENT** | ×5 | Varies by the five elements (dominant-energy surfaces) | Yes |
| **GOD** | ×10 | Varies by Ten God (persona layer) | Yes |
| **ELEMENT·GOD** | ×50 | The K2 persona unit (element × god — the two-faces corpus) | The big authoring pass |
| **CONDITION** | ×3 (+2) | Varies by Overfueled/Balanced/Underfueled (+ Channel/Refill) | Locked (REA_11 §5c) |
| **FAMILY** | ×5 | Varies by ten-god family (self/resource/output/wealth/officer) | Locked |
| **TEMPLATED** | — | A fixed sentence pattern with slots filled from locked vocabulary + derived values; the pattern is authored once, never per-chart | Pattern only |
| **DERIVED** | — | Engine-computed, **never authored** (numbers, roles, ordering, top-3 chips). Hard-coding any of these is a defect | Never |

**Type vocabulary (column 2):** `archetype-name` · `persona-name` · `manifesto` (two-part italic line) · `inscription` (claim sentence) · `descriptor` (one-line explanatory sentence) · `paragraph` (2+ sentences) · `keyword-chip` (1 word) · `noun` (1–2 word vocabulary term) · `template-line` (slot-filled sentence) · `number` · `label` (UI eyebrow/header) · `asset` (art reference).

---

## A · Reveal (the Naming) — LOCKED surface

| # | Field | Type | Varies by | Measured (words · chars) | Budget | Source of truth |
|---|---|---|---|---|---|---|
| A1 | `rvl-ey` "YOU ARE" | label | CONSTANT | 2 · 7 | fixed | handoff board 01 |
| A2 | Archetype name (`identity.archetypeName`) | archetype-name | STEM | 2 · 7–12 | ≤3 words (REA_06) ✓ | REA_01 §2 locked table |
| A3 | Kick line (manifesto first half) | manifesto | STEM | 3–4 · 18–31 | derived: split of A5 | `archetypeSource.js` |
| A4 | Inscription (`identity.inscription`) | inscription | STEM | 13–17 · 61–81 | none recorded — **propose ≤17w / ≤85c** | `archetypeSource.js` (also = Day-Master claim 1) |
| A5 | Cast line | template-line | DERIVED (birth data + tz) | 11 · 39–40 (+tz abbr) | one line | `journeyData.castLine()` ⚠ **format drift:** handoff shows "1995 · APRIL 29 · 17–19 CST"; live renders "1995 · 4 · 29 · YǑU HOUR 17–19 (+abbr)" — owner to pick month-name vs numeric + hour-label form |
| A6 | Plate painting | asset | STEM | — | proc medallion per stem | `concept-arts/stems/proc/{stem}-{el}.png` |

## B · Catalogue hero (identity card) — LOCKED surface

| # | Field | Type | Varies by | Measured | Budget | Source of truth |
|---|---|---|---|---|---|---|
| B1 | "You are" + archetype name | label + archetype-name | STEM | as A2 | — | REA_01 |
| B2 | Full manifesto | manifesto | STEM | 9–13 · 53–70 | ≤14 words (REA_06) ✓ | `archetypeSource.js` |
| B3 | Keyword chips ×3 | keyword-chip | **DERIVED** (top-3 elements' lead-god keywords, dominance order) | 1 · 4–12 each | 3 chips, 1 word each | REA_11 §6b ruling — **never authored per chart**; draws from the ×10 KEYWORD table. ⚠ handoff's per-relation `relation_keywords` table is a superseded draft; live derives per lead god |
| B4 | Seal art | asset | STEM | — | — | `concept-arts/stems/{geng}.png` (庚 seal-chip; others proc fallback — interim gate in `JourneyStage.jsx`) |

## C · Folio (core diagnosis) — LOCKED surface

| # | Field | Type | Varies by | Measured | Budget | Source of truth |
|---|---|---|---|---|---|---|
| C1 | "Your Core Energy is {El}" | template-line | TEMPLATED (slot: element name) | 5–6 · ~26 | one line | pattern in `JourneyStage.jsx` |
| C2 | Condition term | noun | CONDITION ×3 | 1 · 8–11 | locked set | REA_11 §5c LOCKED (Overfueled/Balanced/Underfueled) |
| C3 | Fold verdict (`FOLD_VERDICT`) | template-line tail | CONDITION ×3 | 3 · 13–20 | one clause | REA_11 §5c |
| C4 | Core inscription line ("Your core is {El} — the {Arch}'s own element.") | template-line | TEMPLATED | — | one line | `JourneyStage.jsx` |
| C5 | Core unfold explainer ("The seal at the wheel's center…") | descriptor | TEMPLATED (slots: El ×2) | ~24 · ~120 | 1–2 sentences | `JourneyStage.jsx` |
| C6 | Condition tail (`COND_TAIL`) | template-line tail | CONDITION ×3 | 6–7 · 28–32 | one clause | REA_11 §5c copy templates |
| C7 | Approach verb + tail (`APPR_LINE`) | template-line | CONDITION ×2 (Channel/Refill) | tail 5–7 · 23–33 | one clause | REA_11 §5c |
| C8 | Definition lines (`DEFLINE` — cond + approach defs) | descriptor | CONDITION ×5 entries | 14–23 · 74–117 | ≤2 sentences | REA_11 §5c — **mandatory on first surfacing** (REA_07 law) |

## D · Dominance wheel — LOCKED surface

| # | Field | Type | Varies by | Measured | Budget | Source of truth |
|---|---|---|---|---|---|---|
| D1 | Presence % ×5 | number | **DERIVED** (sum = 100, verified) | 1–3 chars | JetBrains Mono 10px | engine `buildEnergyChart` |
| D2 | Node size/seat | number | **DERIVED** (rank + seating law) | ⌀ 59/53/48/42/37 | locked geometry | `DOMINANCE_WHEEL_RULES.md` + `journeyData.seatElements` |
| D3 | Role pips (● core · ↑ catalyst · ↓ friction · ringed ↑ major · dashed missing) | icon | **DERIVED** | — | the only approved overlay | handoff board 07 (locked) |
| D4 | Center seal | asset | STEM | — | ensō ring | continuity object: reveal plate → wheel → identity card |

## E · Seek / Skip panels — LOCKED surface

| # | Field | Type | Varies by | Measured | Budget | Source of truth |
|---|---|---|---|---|---|---|
| E1 | Panel headers "SEEK THESE · CATALYST" / "SKIP THESE · FRICTION" | label | CONSTANT (state-invariant) | — | locked pair | REA_11 §5c panel doctrine (LOCKED 2026-07-16) |
| E2 | Row phrase "{El} is your {Relation}" | template-line | TEMPLATED (slots: element, relation noun) | 4–5 · ~20 | one line | pattern + REA_11 §5b nouns |
| E3 | Relation noun (Core/Root/Drive/Voice/Duty) | noun | FAMILY ×5 | 1 · 4–5 | 1 word | REA_11 §5b LOCKED |
| E4 | Row % | number | DERIVED | — | — | engine |
| E5 | Balanced collapse (single "keep the mix" box) | template-line | CONDITION (Balanced only) | — | — | REA_11 §5c (Balanced charts collapse both panels) |

## F · Shelf pills (the five energies) — LOCKED surface

| # | Field | Type | Varies by | Measured | Budget | Source of truth |
|---|---|---|---|---|---|---|
| F1 | Closed pill: element name · relation noun · % | noun + number | DERIVED + FAMILY | — | — | composed |
| F2 | Pill title "{El} is Your {Relation}" | template-line | TEMPLATED | 4 · 17–19 | one line | `journeyData` |
| F3 | Family definition line (`FAMILY_LINE`) | descriptor | FAMILY ×5 | 10–13 · 54–65 | one sentence ≤65c ✓ | REA_11 round-2 lock (share-flow verbatim) |
| F4 | Diagnosis "Your {El} is {Cond} — {Remedy} it." | template-line | TEMPLATED (role-driven dx mapping) | ~7 · ~35 | one line | owner-ratified 2026-07-23 role-driven mapping (`journeyData` A3) |
| F5 | Role chips (Core/Catalyst/Friction, major flag) | keyword-chip | DERIVED | 1 word | ≤2 chips + major | role logic |
| F6 | Adjective chips ×3 (`ADJ_CATALYST`/`ADJ_FRICTION`) | keyword-chip | GOD ×10 × pole ×2, pole picked by role | 1 · 4–14 each | 3 chips, 1 word | REA_11 §4b (v3 register) |
| F7 | Keyword (glance label, in aria/eyebrow) | keyword-chip | GOD ×10 | 1 · 4–12 | 1 word | REA_11 §4 v3 FINAL |
| F8 | Verdict line (connector + pole noun + verb: "curdling into Isolation · channel it") | template-line | TEMPLATED (pole nouns GOD ×10 ×2; verbs role-driven) | 3 slots | one line | REA_11 §4b pole nouns + role verbs |
| F9 | Dominance track / fill | number | DERIVED | — | height = %/pMax·84 | composed |

## G · Words-note + glossary sheet — LOCKED surface

| # | Field | Type | Varies by | Measured | Budget | Source of truth |
|---|---|---|---|---|---|---|
| G1 | Footer eyebrow "The words on this page · tap one" | label | CONSTANT | — | fixed | handoff board 05 |
| G2 | Taught-word chips (Core · {Cond} · Catalyst · Friction) | keyword-chip | CONSTANT + CONDITION slot | 1 word | 4 chips | composed |
| G3 | Glossary bodies (Core/Catalyst/Friction/Condition) | paragraph | CONSTANT ×3 + CONDITION ×3 | 20–32 · 104–166 | sheet is 300px wide — **propose ≤35w / ≤175c** | `journeyData` W_* map (locked verbatim) |
| G4 | "Deeper in the Codex" hand-off row | label | CONSTANT | — | fixed | handoff board 05 |

## H · Seal dock — LOCKED surface

| # | Field | Type | Varies by | Measured | Budget | Source of truth |
|---|---|---|---|---|---|---|
| H1 | Chip: element mark + name + dominance wash | noun + number | DERIVED | — | — | composed; missing = ghosted/dashed |

## I · Shareable identity card (Tiles, locked) — LOCKED surface

| # | Field | Type | Varies by | Measured | Budget | Source of truth |
|---|---|---|---|---|---|---|
| I1 | Eyebrow "ELEMENTUM · YOUR IDENTITY" | label | CONSTANT | — | fixed | handoff board 04 |
| I2 | Archetype + manifesto + chips | as B1–B3 | STEM + DERIVED | as B | as B | export 540×960, archetype-only, **no personal name** |
| I3 | Core line "{El} is your Core" + condition pill | template-line | TEMPLATED | — | one line | composed |
| I4 | Seek/Skip columns (% · bar · mark · element · relation) | composed | DERIVED + FAMILY | — | — | composed |

## J · Day-Master screen (in-journey) — LOCKED shell, content interim

| # | Field | Type | Varies by | Measured | Budget | Source of truth |
|---|---|---|---|---|---|---|
| J1 | `dm-arch` archetype + `dm-pin` pinyin | archetype-name + label | STEM | pinyin 4 · 13–17 | one line | REA_01 |
| J2 | Core chip "Core · {n}%" | template-line | DERIVED | — | — | composed |
| J3 | `dm-man` full manifesto | manifesto | STEM | as B2 | ≤14w | `archetypeSource.js` |
| J4 | WHO YOU ARE body (`yourNature.desc` baseline) | paragraph | STEM (baseline; ×150 variant surface exists per K1) | 30–46 · 160–261 | ≥2 sentences (schema) — **propose cap ≤46w / ~70 words per part-2 ("~70 words" card total)** | `archetypeSource.js`; variants in `STEM_CARD_DATA.js` ×150 |
| J5 | SEEK THIS / SKIP THIS prescription cards | template-line | TEMPLATED (element-generic interim) | ~25w each | 1–2 sentences | `journeyData.buildDmCards` — **interim copy pending K2 pass** |
| J6 | Part-2 spec: claims 2–3 | inscription | STEM | — | **10–16w each (handoff law)** | part-2 P4 — not yet in journey build |
| J7 | Part-2 spec: mechanism "How your edge is built · R+E" | descriptor | STEM (chart-aware) | — | **≤30w (handoff law)** | part-2 P4 — not yet in journey build |
| J8 | Codex label "What's a Day Master — and why the day?" | label | CONSTANT | — | **≤8w (handoff law)** | part-2 P4 |

## K · Element mini-screen (in-journey) — WIP (interim copy, 庚-gated hooks)

| # | Field | Type | Varies by | Measured | Budget | Source of truth |
|---|---|---|---|---|---|---|
| K1 | Eyebrow "{EL} · {n}% · {ROLE/MISSING}" | label | DERIVED | — | one line | composed |
| K2 | Title (`ENERGY_TILE.hook`) | descriptor | should be ELEMENT·GOD ×50 | — | ~1 line | ⚠ **庚-gated interim** (REA_11 §6b item 6); non-庚 falls back to "{Keyword} — your {Relation}" |
| K3 | Tag line (`ENERGY_TILE.pol`) | descriptor | ELEMENT (interim) | — | ~6 words | interim, same gate |
| K4 | Verdict label + verdict | template-line | TEMPLATED (role/condition driven) | ~10w | 1 sentence | `journeyData.buildElementScreen` |
| K5 | MEAN line ("what it means") | descriptor | ELEMENT ×5 (interim — should become ELEMENT·GOD) | ~15w | 1 sentence | `journeyData` MEAN map — **element-generic pending 50-cell pass** |
| K6 | Face line "{Persona} · {KEYWORD}" | persona-name + keyword-chip | GOD ×10 | 2+1 words | one line | `tgNames.js` + REA_11 §4 |
| K7 | Face keywords (`FACE_CARD.kw` joined) | keyword-chip | GOD ×10 | 5 · 27–36 | 3 chips · lowercase | `facesContent.js` |
| K8 | Teaser (`FACE_CARD.teaser`) | paragraph | GOD ×10 | 45–50 · 241–296 | ⚠ **part-2 law: seeker teaser ≤25w — measured 45–50w. CONFLICT: either the teaser field is re-scoped or the budget re-ruled** | `facesContent.js` |

## L · Part-2 deep energy pages (P6/P7 pattern) — WIP surface (not yet built in-app)

The full K2 authoring target. Budgets below are **handoff law** (explicit in the wireframe):

| # | Field | Type | Varies by | Budget (handoff law) | Notes |
|---|---|---|---|---|---|
| L1 | Hero eyebrow "{EL} · {n}% OF YOUR CHART" | label | DERIVED | one line | scene-hero band carries data, not category prose |
| L2 | Role badge(s) | keyword-chip | DERIVED | **≤3w · max 2** | e.g. "↑ your catalyst" + "strongest ally" |
| L3 | Conclusion ("{El} in you is {Persona} — {definition}. {claim}.") | template-line + inscription | ELEMENT·GOD ×50 | **≤20w** | persona definition line mandatory on first surfacing (REA_07 law #4) |
| L4 | R — "What it says about you" | paragraph | ELEMENT·GOD ×50 × presence-frame registers | **≤30w** | dominant/present/scarce-absent registers (REA_04 §1) |
| L5 | X — "What to do with it" | paragraph | ELEMENT·GOD ×50 × registers | **≤30w** | ghost variant = "borrowing what you don't own" |
| L6 | Seeker gate teaser | paragraph | ELEMENT·GOD ×50 | **≤25w** | depth-hunger, not denial (D7 depth-gating law) |
| L7 | Codex cycle label ("Why {El} feeds {El} — the cycle, in your chart") | template-line | TEMPLATED (generating/controlling cycle) | **≤10w** | — |

## M · Pillar chart (part-2 P5) — WIP surface

| # | Field | Type | Varies by | Budget (handoff law) | Notes |
|---|---|---|---|---|---|
| M1 | Pillar cells (stem/branch + 藏干) | glyph | DERIVED | — | 汉字 decorative-led; element mark is the primary read |
| M2 | Patterns conclusion | descriptor | TEMPLATED (per detected pattern) | **≤25w** | conclusion first, never combination-pattern vocabulary |
| M3 | Hour-unset state + "Discover it →" | label | CONSTANT | one line | — |

---

## N · Standing rules for template generation (column-5 distillation)

1. **Three field classes, never blended** (handoff `template-data.json` — the governing categorization): **VOCABULARY** (constants, locked by REA_07/REA_11 — identical for every user) · **ARCHETYPE** (authored per variant axis, identical for every user of that key) · **USER_CHART** (derived, computed by the engine, never authored). Every new field must declare its class before authoring starts.
2. **Derived is sacred.** Percents, roles, ordering, seating, top-3 chips, condition, approach: engine-owned. Any authored copy that embeds a number or a role is a defect (no hard-coding — cleanup rule #4).
3. **Templates slot-fill only from locked vocabulary + derived values.** A template-line's pattern is authored once; its slots pull from the locked noun/keyword tables. No free text inside slots.
4. **Definition lines are mandatory on first surfacing** of any taught term (persona name, condition term, Catalyst/Friction) — REA_07 law #4/#5; the Ladder decides teaching order.
5. **One concept, one name** (REA_07 law #1): any synonym on a surface is a defect. Internal terms (band, tgPattern, strong/weak, god 汉字 as information) never surface.
6. **Reading level: grade 6–7; labels 1–2 syllable common words** (handoff vocabulary contract).
7. **Presence-frame registers, not per-chart authoring** (REA_04 §1): dominant = full bespoke · present = derived shorter · scarce/absent = cultivation. Dominance selects and pitches content; it never rewrites it.
8. **Depth-gating law (D7, locked 2026-07-23):** free tier reads complete; only Seeker depth is gated; never hide cards, never truncate text mid-sentence.
9. **Chinese glyphs are decorative texture, never information-carrying** on user surfaces.
10. **Budget rulings pending (the ⚠ flags):** A5 cast-line format · B3 superseded handoff keyword table (resolved in live code, handoff historical) · K8 teaser 45–50w vs part-2's ≤25w seeker-teaser law · J4 yourNature cap · G3/A4 unrecorded budgets (proposals inline). Plus the two REA_09 walker conflicts (elementIntro punch/expand over budget — evidence, per D12, that budgets follow voice, not vice versa).

---

*Next steps: owner markup of the ⚠ rulings → freeze the axis per field → this map becomes the checklist for the REA_04 schema finalization and the K2 corpus template generation.*
