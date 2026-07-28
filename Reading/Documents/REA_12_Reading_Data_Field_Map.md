# REA_12 — Reading Data Field Map

**Created 2026-07-27 · status: DRAFT for owner markup · the first step of the data-field mapping & categorization phase.**
**Purpose:** one map of every reading data field on the journey surfaces — its type, variant axis, measured length, budget, real example, and source of truth — the ruling sheet for deciding vocabulary, constants vs archetype-varying variables, and template-generation rules.
**Sources:** the JourneyCatalogue design handoff (`Design/assets/Library/Elementum Design Handoff_JourneyCatalogue/` — breakdown boards + `template-data.json` + part-2 readings), reconciled against the **live** contract (`Elementum_App/src/components/journey/journeyData.js` — piping verified 2026-07-23) and the canonical docs (REA_11 vocabulary · REA_07 concept law · REA_06 field dictionary · REA_04 key system · REA_09 budget audit).
**Measured lengths** are real min–max across all authored variants in the live content modules (2026-07-27 run of `measure-field-lengths.mjs`), not estimates. **⚠ flags** mark measured-vs-budget conflicts — each is an owner budget ruling waiting to happen.
**庚 example column:** every value rendered live from the golden reference chart — **1995-04-29 · 18:00 · Beijing · male → 庚 The Blade** (pillars 乙亥 / 庚辰 / 庚寅 / 乙酉 · Overfueled · Earth 33 / Wood 33 / Metal 23 / Water 6 / Fire 5). WIP-surface examples marked *handoff demo* come from the wireframe's demo chart (40/30/20/10/0 — not the live engine).
**Twin:** `Reading/Database/REA_12_field_map.xlsx` (generated from this doc — regenerate via `node Elementum_App/tools/build-field-map-xlsx.mjs` after edits).

---

## 0 · The variant-axis taxonomy (column 4 vocabulary)

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

**Type vocabulary (column 3):** `archetype-name` · `persona-name` · `manifesto` (two-part italic line) · `inscription` (claim sentence) · `descriptor` (one-line explanatory sentence) · `paragraph` (2+ sentences) · `keyword-chip` (1 word) · `noun` (1–2 word vocabulary term) · `template-line` (slot-filled sentence) · `number` · `label` (UI eyebrow/header) · `asset` (art reference).

---

## A · Reveal (the Naming) — LOCKED surface

| # | Field | Type | Varies by | Measured | Budget | 庚 example (1995-04-29 · 18:00) | Source of truth |
|---|---|---|---|---|---|---|---|
| A1 | `rvl-ey` "YOU ARE" | label | CONSTANT | 2w · 7c | fixed | YOU ARE | handoff board 01 |
| A2 | Archetype name (`identity.archetypeName`) | archetype-name | STEM | 2w · 7–12c | ≤3 words (REA_06) ✓ | The Blade | REA_01 §2 locked table |
| A3 | Kick line (manifesto first half) | manifesto | STEM | 3–4w · 18–31c | derived: split of B2 | Precision before intention | `archetypeSource.js` |
| A4 | Inscription (`identity.inscription`) | inscription | STEM | 13–17w · 61–81c | none recorded — **propose ≤17w / ≤85c** | You say what others soften — and pay, quietly, for being the one who did. | `archetypeSource.js` (also = Day-Master claim 1) |
| A5 | Cast line | template-line | DERIVED (birth data + tz) | 11w · 39–40c (+tz abbr) | one line | CAST FROM 1995 · 4 · 29 · YǑU HOUR 17–19 ⚠ **format drift:** handoff shows "1995 · APRIL 29 · 17–19 CST" — owner to pick month-name vs numeric + hour-label form | `journeyData.castLine()` |
| A6 | Plate painting | asset | STEM | — | proc medallion per stem | `geng-metal.png` | `concept-arts/stems/proc/{stem}-{el}.png` |

## B · Catalogue hero (identity card) — LOCKED surface

| # | Field | Type | Varies by | Measured | Budget | 庚 example (1995-04-29 · 18:00) | Source of truth |
|---|---|---|---|---|---|---|---|
| B1 | "You are" + archetype name | label + archetype-name | STEM | as A2 | — | You are **The Blade** | REA_01 |
| B2 | Full manifesto | manifesto | STEM | 9–13w · 53–70c | ≤14 words (REA_06) ✓ | Precision before intention — an edge is never given; it is forged. | `archetypeSource.js` |
| B3 | Keyword chips ×3 | keyword-chip | **DERIVED** (top-3 elements' lead-god keywords, dominance order) | 1w · 4–12c each | 3 chips, 1 word each | Insight · Caution · Independence *(= Earth 33 偏印 · Wood 33 正财 · Metal 23 比肩)* ⚠ handoff's per-relation keyword table is a superseded draft; live derives per lead god | REA_11 §6b ruling — never authored per chart; draws from the ×10 KEYWORD table |
| B4 | Seal art | asset | STEM | — | — | `geng.png` (true seal-chip; other stems proc fallback — interim gate) | `JourneyStage.jsx` |

## C · Folio (core diagnosis) — LOCKED surface

| # | Field | Type | Varies by | Measured | Budget | 庚 example (1995-04-29 · 18:00) | Source of truth |
|---|---|---|---|---|---|---|---|
| C1 | "Your Core Energy is {El}" | template-line | TEMPLATED (slot: element name) | 5–6w · ~26c | one line | Your Core Energy is Metal | pattern in `JourneyStage.jsx` |
| C2 | Condition term | noun | CONDITION ×3 | 1w · 8–11c | locked set | Overfueled | REA_11 §5c LOCKED |
| C3 | Fold verdict (`FOLD_VERDICT`) | template-line tail | CONDITION ×3 | 3w · 13–20c | one clause | It runs **Overfueled** — channel the surplus. | REA_11 §5c |
| C4 | Core inscription line | template-line | TEMPLATED (slots: El, Arch) | ~9w | one line | Your core is Metal — the Blade's own element. | `JourneyStage.jsx` |
| C5 | Core unfold explainer | descriptor | TEMPLATED (slots: El ×2) | ~24w · ~120c | 1–2 sentences | The seal at the wheel's center is Metal's sign — the day master you were cast with; its share leads the wheel. | `JourneyStage.jsx` |
| C6 | Condition tail (`COND_TAIL`) | template-line tail | CONDITION ×3 | 6–7w · 28–32c | one clause | It runs Overfueled — more comes in than it burns. | REA_11 §5c copy templates |
| C7 | Approach verb + tail (`APPR_LINE`) | template-line | CONDITION ×2 (Channel/Refill) | tail 5–7w · 23–33c | one clause | So **Channel** it — aim the surplus, don't add to it. | REA_11 §5c |
| C8 | Definition lines (`DEFLINE`) | descriptor | CONDITION ×5 entries | 14–23w · 74–117c | ≤2 sentences | *Overfueled:* More fuel comes in than your core burns — the surplus wants somewhere to go. Built into your chart, not today's mood. · *Channel:* Give your extra force a place to go — aim it, don't store it. The two lists below are where it goes. | REA_11 §5c — mandatory on first surfacing (REA_07 law) |

## D · Dominance wheel — LOCKED surface

| # | Field | Type | Varies by | Measured | Budget | 庚 example (1995-04-29 · 18:00) | Source of truth |
|---|---|---|---|---|---|---|---|
| D1 | Presence % ×5 | number | **DERIVED** (sum = 100) | 1–3c | JetBrains Mono 10px | Earth 33 · Wood 33 · Metal 23 · Water 6 · Fire 5 | engine `buildEnergyChart` |
| D2 | Node size/seat | number | **DERIVED** (rank + seating law) | ⌀ 59/53/48/42/37 | locked geometry | Metal ⌀48 crowns top (Overfueled law); Earth ⌀59 right · Wood ⌀53 left · Water ⌀42 lower-left · Fire ⌀37 lower-right | `DOMINANCE_WHEEL_RULES.md` + `journeyData.seatElements` |
| D3 | Role pips | icon | **DERIVED** | — | the only approved overlay | Metal ● core · Earth ↓ · Wood ↑ · Water ↑ · Fire ↑ ringed (major) | handoff board 07 (locked) |
| D4 | Center seal | asset | STEM | — | ensō ring | 庚 seal-chip painting | continuity object: reveal plate → wheel → identity card |

## E · Seek / Skip panels — LOCKED surface

| # | Field | Type | Varies by | Measured | Budget | 庚 example (1995-04-29 · 18:00) | Source of truth |
|---|---|---|---|---|---|---|---|
| E1 | Panel headers | label | CONSTANT (state-invariant) | — | locked pair | SEEK THESE · CATALYST / SKIP THESE · FRICTION | REA_11 §5c panel doctrine (LOCKED 2026-07-16) |
| E2 | Row phrase "{El} is your {Relation}" | template-line | TEMPLATED (slots: element, relation noun) | 4–5w · ~20c | one line | SEEK: Fire is your Duty 5% · Wood is your Drive 33% · Water is your Voice 6% — SKIP: Metal is your Core 23% · Earth is your Root 33% | pattern + REA_11 §5b nouns |
| E3 | Relation noun | noun | FAMILY ×5 | 1w · 4–5c | 1 word | Core · Root · Drive · Voice · Duty | REA_11 §5b LOCKED |
| E4 | Row % | number | DERIVED | — | — | *(above)* | engine |
| E5 | Balanced collapse | template-line | CONDITION (Balanced only) | — | — | *(n/a for 庚 — Balanced charts collapse both panels to "keep the mix")* | REA_11 §5c |

## F · Shelf pills (the five energies) — LOCKED surface

*(examples from the Metal pill — the core-excess case — unless noted)*

| # | Field | Type | Varies by | Measured | Budget | 庚 example (1995-04-29 · 18:00) | Source of truth |
|---|---|---|---|---|---|---|---|
| F1 | Closed pill: name · relation · % | noun + number | DERIVED + FAMILY | — | — | Metal · Core · 23% *(shelf order: Earth 33 → Wood 33 → Metal 23 → Water 6 → Fire 5)* | composed |
| F2 | Pill title "{El} is Your {Relation}" | template-line | TEMPLATED | 4w · 17–19c | one line | Metal is Your Core | `journeyData` |
| F3 | Family definition line (`FAMILY_LINE`) | descriptor | FAMILY ×5 | 10–13w · 54–65c | one sentence ✓ | This energy is you — your identity and your footing among equals. | REA_11 round-2 lock (share-flow verbatim) |
| F4 | Diagnosis line | template-line | TEMPLATED (role-driven dx) | ~7w · ~35c | one line | Your Metal is Overfueled — Channel it. *(Wood: Your Wood is Underfueled — Refill it.)* | owner-ratified 2026-07-23 role-driven mapping |
| F5 | Role chips | keyword-chip | DERIVED | 1w | ≤2 chips + major | Metal: Core + Friction *(core-excess)* · Earth: Friction · Wood/Water/Fire: Catalyst | role logic |
| F6 | Adjective chips ×3 (`ADJ_*`) | keyword-chip | GOD ×10 × pole ×2, pole picked by role | 1w · 4–14c each | 3 chips | Metal (比肩, friction-pole): Walled-off · Solitary · Immovable — Wood (正财, catalyst-pole): Reliable · Compounding · Loyal | REA_11 §4b (v3 register) |
| F7 | Keyword (glance label) | keyword-chip | GOD ×10 | 1w · 4–12c | 1 word | Metal → Independence (比肩) · Earth → Insight (偏印) · Wood → Caution (正财) · Water → Flow (食神) · Fire → Force (七杀) | REA_11 §4 v3 FINAL |
| F8 | Verdict line (connector + pole + verb) | template-line | TEMPLATED (pole GOD ×10 ×2; verb role-driven) | 3 slots | one line | Metal: curdling into Isolation · channel it — Earth: curdling into Distance · loosen it — Wood: rising toward Security · feed it — Water: rising toward Grace · keep it close — Fire: rising toward Command · keep it close | REA_11 §4b pole nouns + role verbs |
| F9 | Dominance track / fill | number | DERIVED | — | height = %/pMax·84 | Earth fills 84% of track height (33/33); Fire ~13% | composed |

## G · Words-note + glossary sheet — LOCKED surface

| # | Field | Type | Varies by | Measured | Budget | 庚 example (1995-04-29 · 18:00) | Source of truth |
|---|---|---|---|---|---|---|---|
| G1 | Footer eyebrow | label | CONSTANT | — | fixed | The words on this page · tap one | handoff board 05 |
| G2 | Taught-word chips | keyword-chip | CONSTANT + CONDITION slot | 1w | 4 chips | Core · Overfueled · Catalyst · Friction | composed |
| G3 | Glossary bodies | paragraph | CONSTANT ×3 + CONDITION ×3 | 20–32w · 104–166c | sheet 300px wide — **propose ≤35w / ≤175c** | *Core:* The energy you were cast with — your day master, the fixed center every other energy is read against. It doesn't change; it's the you the whole chart orbits. · *Catalyst:* The energy your chart runs short on. Feed it and the whole system moves easier — these are the energies to seek. | `journeyData` W_* map (locked verbatim) |
| G4 | Codex hand-off row | label | CONSTANT | — | fixed | **Deeper in the Codex** — the full reading of this word | handoff board 05 |

## H · Seal dock — LOCKED surface

| # | Field | Type | Varies by | Measured | Budget | 庚 example (1995-04-29 · 18:00) | Source of truth |
|---|---|---|---|---|---|---|---|
| H1 | Chip: element mark + name + dominance wash | noun + number | DERIVED | — | — | Earth·Root·33% · Wood·Drive·33% · Metal·Core·23% · Water·Voice·6% · Fire·Duty·5% *(no ghost — 庚 chart has no 0% element)* | composed; missing = ghosted/dashed |

## I · Shareable identity card (Tiles, locked) — LOCKED surface

| # | Field | Type | Varies by | Measured | Budget | 庚 example (1995-04-29 · 18:00) | Source of truth |
|---|---|---|---|---|---|---|---|
| I1 | Eyebrow | label | CONSTANT | — | fixed | ELEMENTUM · YOUR IDENTITY | handoff board 04 |
| I2 | Archetype + manifesto + chips | as B1–B3 | STEM + DERIVED | as B | as B | The Blade — Precision before intention… — Insight · Caution · Independence | export 540×960, archetype-only, **no personal name** |
| I3 | Core line + condition pill | template-line | TEMPLATED | — | one line | **Metal** is your Core — Overfueled | composed |
| I4 | Seek/Skip columns | composed | DERIVED + FAMILY | — | — | Seek: 5% Fire Duty · 33% Wood Drive · 6% Water Voice — Skip: 23% Metal Core · 33% Earth Root | composed |

## J · Day-Master screen (in-journey) — LOCKED shell, content interim

| # | Field | Type | Varies by | Measured | Budget | 庚 example (1995-04-29 · 18:00) | Source of truth |
|---|---|---|---|---|---|---|---|
| J1 | Archetype + pinyin | archetype-name + label | STEM | pinyin 4w · 13–17c | one line | The Blade — GĒNG · YANG METAL | REA_01 |
| J2 | Core chip | template-line | DERIVED | — | — | Core · 23% | composed |
| J3 | Full manifesto | manifesto | STEM | as B2 | ≤14w | *(as B2)* | `archetypeSource.js` |
| J4 | WHO YOU ARE body (`yourNature.desc` baseline) | paragraph | STEM (baseline; ×150 K1 variant surface exists) | 30–46w · 160–261c | ≥2 sentences (schema) — **propose cap ≤46w** (part-2 says card total ~70w) | *(庚 currently falls back to the inscription — the baseline desc surfaced here is:)* You say what others soften — and pay, quietly, for being the one who did. | `archetypeSource.js`; variants in `STEM_CARD_DATA.js` |
| J5 | SEEK/SKIP prescription cards | template-line | TEMPLATED (element-generic interim) | ~18w each | 1–2 sentences | **SEEK THIS · FIRE** — Fire is the energy your chart asks for — thin in you and worth feeding. Seek it on purpose. · **SKIP THIS · EARTH** — Earth is already rich in you — more of it weighs the core. Stop adding; let what you have ease. | `journeyData.buildDmCards` — interim pending K2 pass |
| J6 | Part-2 spec: claims 2–3 | inscription | STEM | — | **10–16w each (handoff law)** | *handoff demo:* Being vague feels worse to you than being wrong. / People come to you when they need the unsoftened truth. | part-2 P4 — not yet in journey build |
| J7 | Part-2 spec: mechanism (R+E) | descriptor | STEM (chart-aware) | — | **≤30w (handoff law)** | *handoff demo:* Yang Metal tempered by spring wood — strength that grew against resistance, not in its absence. | part-2 P4 — not yet in journey build |
| J8 | Codex label | label | CONSTANT | — | **≤8w (handoff law)** | What's a Day Master — and why the day? | part-2 P4 |

## K · Element mini-screen (in-journey) — WIP (interim copy, 庚-gated hooks)

*(examples: the Fire screen — the sought forge — plus Metal for the core-excess case)*

| # | Field | Type | Varies by | Measured | Budget | 庚 example (1995-04-29 · 18:00) | Source of truth |
|---|---|---|---|---|---|---|---|
| K1 | Eyebrow "{EL} · {n}% · {ROLE}" | label | DERIVED | — | one line | FIRE · 5% *(Metal: METAL · 23% · YOUR CORE)* | composed |
| K2 | Title (`ENERGY_TILE.hook`) | descriptor | should be ELEMENT·GOD ×50 | ~6w | ~1 line | Fire: The forge you borrow, never own. · Metal: Your core — precision before intention. ⚠ **庚-gated interim** — non-庚 falls back to "{Keyword} — your {Relation}" | REA_11 §6b item 6 |
| K3 | Tag line (`ENERGY_TILE.pol`) | descriptor | ELEMENT (interim) | ~4w | ~6 words | Fire: Radiance · the rising heat · Metal: Refinement · the edge | interim, same gate |
| K4 | Verdict label + verdict | template-line | TEMPLATED (role/condition driven) | ~10w | 1 sentence | Fire: YOUR CATALYST — SEEK THIS · Thin in you — worth feeding. · Metal: YOUR CORE — ALSO YOUR EXCESS · Overfueled — honor it, don't feed it further. | `journeyData.buildElementScreen` |
| K5 | MEAN line | descriptor | ELEMENT ×5 (interim — should become ELEMENT·GOD) | ~15w | 1 sentence | Fire: The room is different before you speak — warmth as climate, light that changes what it touches. | `journeyData` MEAN map — element-generic pending 50-cell pass |
| K6 | Face line "{Persona} · {KEYWORD}" | persona-name + keyword-chip | GOD ×10 | 3w | one line | Fire: The General · FORCE · Metal: The Twin · INDEPENDENCE | `tgNames.js` + REA_11 §4 |
| K7 | Face keywords (`FACE_CARD.kw`) | keyword-chip | GOD ×10 | 5w · 27–36c | 3 chips lowercase | Fire: forging · relentless · decisive · Metal: independent · resolute · self-made | `facesContent.js` |
| K8 | Teaser (`FACE_CARD.teaser`) | paragraph | GOD ×10 | 45–50w · 241–296c | ⚠ **part-2 seeker-teaser law ≤25w vs measured 45–50w — re-scope the field or re-rule the budget** | *The Twin (Metal), 45w:* You trust your own counsel first. Self-reliance is a strength — and, now and then, a wall others can't get past. You begin without waiting for permission and finish without needing rescue. The art is knowing the moment standing alone costs more than it's worth. | `facesContent.js` |

## L · Part-2 deep energy pages (P6/P7 pattern) — WIP surface (not yet built in-app)

The full K2 authoring target. Budgets are **handoff law** (explicit in the wireframe); examples are *handoff demo* copy (demo chart, not live engine):

| # | Field | Type | Varies by | Measured | Budget (handoff law) | Example (handoff demo) | Notes |
|---|---|---|---|---|---|---|---|
| L1 | Hero eyebrow | label | DERIVED | — | one line | EARTH · 28% OF YOUR CHART | hero carries data, not category prose |
| L2 | Role badge(s) | keyword-chip | DERIVED | — | **≤3w · max 2** | ↑ your catalyst · strongest ally | — |
| L3 | Conclusion | template-line + inscription | ELEMENT·GOD ×50 | — | **≤20w** | Earth in you is The Alchemist — nourishment that transmutes. It's the ground your edge is forged on. | persona definition line mandatory on first surfacing |
| L4 | R — What it says about you | paragraph | ELEMENT·GOD ×50 × registers | — | **≤30w** | You steady people without meaning to. When plans wobble, yours is the version everyone quietly adopts. | dominant/present/scarce-absent registers (REA_04 §1) |
| L5 | X — What to do with it | paragraph | ELEMENT·GOD ×50 × registers | — | **≤30w** | Build on it deliberately: routines, places, people that ground you sharpen you. Lean here when Fire-seasons burn. *(ghost variant: You can't store Fire, but you can visit it: deadlines chosen on purpose, heat in small doses, one bold hour — not a bold life.)* | ghost = cultivation register |
| L6 | Seeker gate teaser | paragraph | ELEMENT·GOD ×50 | — | **≤25w** | Where this nourishment turns to over-protection · how it shapes your work and bonds · the season it peaks. | depth-hunger, not denial (D7 law) |
| L7 | Codex cycle label | template-line | TEMPLATED (cycle) | — | **≤10w** | Why Earth feeds Metal — the cycle, in your chart | — |

## M · Pillar chart (part-2 P5) — WIP surface

| # | Field | Type | Varies by | Measured | Budget (handoff law) | Example | Notes |
|---|---|---|---|---|---|---|---|
| M1 | Pillar cells (stem/branch + 藏干) | glyph | DERIVED | — | — | 乙亥 / 庚辰 / 庚寅 / 乙酉 *(real 庚 pillars; day stem carries the dm-border)* | element mark is the primary read; 汉字 beside it |
| M2 | Patterns conclusion | descriptor | TEMPLATED (per detected pattern) | — | **≤25w** | *handoff demo:* One live pattern between your branches — Tiger and Pig combining into wood. Your drive and your depths conspire. | conclusion first, never combination-pattern vocabulary |
| M3 | Hour-unset state | label | CONSTANT | — | one line | Cast without your hour — close, not exact. Discover it → | — |

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
10. **Budget rulings pending (the ⚠ flags):** A5 cast-line format · B3 superseded handoff keyword table (resolved in live code, handoff historical) · K8 teaser 45–50w vs part-2's ≤25w seeker-teaser law · J4 yourNature cap · A4/G3 unrecorded budgets (proposals inline). Plus the two REA_09 walker conflicts (elementIntro punch/expand over budget — evidence, per D12, that budgets follow voice, not vice versa).

---

*Next steps: owner markup of the ⚠ rulings → freeze the axis per field → this map becomes the checklist for the REA_04 schema finalization and the K2 corpus template generation.*
