# REA_14 — Reading Generation Schema — the archetype-varying data & templates

> **THE A BOOK — every varying reading data variable, the templates that assemble them, and the model that selects them.** Consolidated 2026-07-28 (owner-directed) from **REA_04 Reading_Schema** (the v2.1 content model — its §7 decision log is carried verbatim as §7 HERE), **REA_12 Reading_Data_Variables** (the variable registry), and the still-true content of **REA_06 Archetype_Fields** (varyBy library; legacy field tables → §8 backlog). Vocabulary constants live in **REA_13 (the Dictionary)** — this doc only *consumes* them. Pedagogy: REA_15. Historical citations of "REA_04 §7" refer to §7 here.

**Status: DRAFT → freeze per variable.** ⏸ Standing sequencing ruling (owner 2026-07-23, REA_08): the engine pass and corpus authoring stay parked until the READING JOURNEY is locked; this schema is the instrument of that lock.

## The two definitions (the law of this doc)

1. **UI Field** — a *slot* in the journey layout where reading data stands. Slots lay out the UI and help categorize variables; they are not data (§9 index).
2. **Reading Data Variable** — the *actual data* the templates / archetype generation produce, varying on its variant-axis. **One variable, one row, one ruling** — however many slots it fills, or none (backlog).

**Field classes:** **A** = archetype-varying authored content (THIS doc's generation targets) · **T** = template patterns (authored once, slot-filled) · **D** = derived engine inputs (never authored — named here only as slot signatures) · **V** = vocabulary constants (REA_13 — never a generation target). **Measured** = real min–max across all authored variants (2026-07-27 run). **庚 example** = live render of the golden chart **1995-04-29 · 18:00 · Beijing → 庚 The Blade** (乙亥/庚辰/庚寅/乙酉 · Overfueled · Earth 33/Wood 33/Metal 23/Water 6/Fire 5); *handoff demo* = wireframe demo copy on unbuilt surfaces.
**Twin:** `Reading/Database/REA_14_generation_schema.xlsx` — regenerate via `node Elementum_App/tools/build-field-map-xlsx.mjs`.

---

## §1 · The variant-axis taxonomy

| Axis | Count | Meaning | Authored? |
|---|---|---|---|
| **STEM** | ×10 | Varies by day-master stem (the archetype identity — K1) | Yes |
| **STEM·BAND** | ×30 | Stem × energy band (K1b self-card) | Planned |
| **STEM·BAND·PATTERN** | ×150 | Full Layer-1 variant surface (K1 legacy grain) | Partial (庚) |
| **ELEMENT** | ×5 | Varies by the five elements | Yes |
| **GOD** | ×10 | Varies by Ten God (persona layer) | Yes |
| **ELEMENT·GOD** | ×50 | The K2 persona unit (the two-faces corpus) — THE generation pass | Planned |
| **CONDITION** | ×3 (+2) | Overfueled/Balanced/Underfueled (+ Channel/Refill) — vocabulary axis (REA_13 §5c) | Locked (V) |
| **FAMILY** | ×5 | Ten-god family — vocabulary axis (REA_13 §5b) | Locked (V) |
| **POSITION** | ×7 | Pillar palace (宫位, B6) | Planned |
| **TEMPLATED** | — | Fixed sentence pattern; slots fill from V + D; pattern authored once | Pattern only |
| **DERIVED** | — | Engine-computed, never authored; hard-coding one is a defect | Never |

**Compound tags & authoring rule (from the varyBy library):** `stem×10` · `element×5` · `tg×10` · `element·tg×50` · `band·tgPattern×15` · `stem·band·tgPattern×150` · `stem·lifeDomain×40`. If a new field fits no combination, extend `VARY_DIMENSIONS`/`VARY_CARDINALITY`/`VARY_LIBRARY` in `archetypeSchema.js` first — never invent a field in a component. `tier` is gating, NOT a varyBy dimension. Reserved dimensions (defined, unused): `branch×12` · `season×4` · `gender×2` · `lifeStage×4` · `lifePeriod×8` · `annualPillar×60`.

---

## §2 · The assembly model (how a chart selects and composes variables)

### 2.1 The derivation principle

Every card decomposes into three ingredients, only ONE authored:

```
card content = PERSONA CORE (authored, keyed)
             ⊕ PRESENCE FRAME (templated, 4 states)
             ⊕ ROLE BADGES + numbers (derived, never authored)
```

The engine resolves any element to its Ten-God **direction** vs the Day Master, then splits by **polarity** into up to two faces — surfacing the face(s) actually present. Energy cards never need per-chart authoring: a chart is an *assembly* of keyed content; the only per-chart logic is *which* keyed faces are present at *what presence frame*.

**The two-face rule (by math):** per element the engine emits `{ presentFaces: [{god, weight}], absentGod }` — two faces if both polarities are carried, one if one; the absent polarity is never a card; whole-element absence = the ghost card.
**Identity and Ten-God cards are separate sections (B5):** the Identity card reads the Day-Master stem; the self element's Twin/Rival render as energy cards below the wheel. All 50 K2 keys can render.
**Two reading axes (B6):** FACES (dominance × polarity) + POSITION (宫位) — a positional reading composes the K2 persona × `PALACE_FRAMES[position]` × polarity; 日支 (partner) and 时柱 (children/legacy) are the highest-value reads.

### 2.2 The dominance → reading contract

Dominance does **not rewrite** a persona's words — it decides *which* personas surface, in *what order*, at *what register*:
- **Dominance = substance rank (旺衰)** and governs three things only: which faces are present · deck order (self → presence desc) · the presence frame a persona reads in (**dominant** full bespoke · **present** derived shorter · **scarce/absent** cultivation).
- **合-binding and 刑/害/破 are function texture** — they color a reading, never reorder the deck or change a frame.
- **Valence ≠ intensity:** dominance is the intensity register; 用神/喜忌 is the valence register (↑/↓ role badges). A scarce energy can be a gift; a dominant one friction. Never collapse "dominant" into "good."

### 2.3 The key system

| Key | Form | Count | Carries |
|---|---|---|---|
| **K1 — stem** | `庚` | 10 | Identity: name · manifesto · inscription · claims · mechanism |
| **K1b — stem × band** | `庚_concentrated` | 30 | Self-card presence reading |
| **K2 — element × god** | `火_七杀` | **50** | THE persona unit: FACES prologue + registers (§4) |
| **T — templated globals** | patterns | ~41 | Assembly glue, slot-filled (§5) |

The 50 stays 50 — all valid (element, god) pairs across DMs; per chart only that DM's 10 are in play. Corpus growth comes from **registers**, not key count.

### 2.4 Retired / migrating (from the v2.1 pass)

`energy.keywords` alias → DELETE (`chips` canonical) · `dominantEnergy.*` / `seasonalCalibration.*` / `liunianSignatures` → superseded by K2 + Calendar surface · `elementIntro` → RE-BUDGET into DM-claim register + Self-card presence (R7 ruling) · `TG_CARD_DATA` → KEPT as **generation source** for K2, not rendered directly · `IDENTITY_SATURATION_READING[stem][band]` → migrate to `selfCard.presence`.

### 2.5 Batch sizing (the authoring bill)

K1 extensions (claims + mechanism) 10 × ~62w ≈ 620w · K1b self cards 30 × ~38w ≈ 1,140w · **K2 personas 50 × ~340w ≈ 17,000w** (prologue ~62w + dominant register ~195w bespoke + absent register ~85w bespoke; `present` derived) · templated globals ~700w · palace frames 7 × ~24w ≈ 170w → **≈19,700 words total**. TG_CARD_DATA seeds at most the dominant register of one face per element. **Approve-then-scale: recompute the 庚 chart's faces with the polarity-aware resolver first** (the polarity-blind face set must not seed authoring), cold-read, then bulk.

### 2.6 Implementation chain

**This schema (design truth) → `archetypeSchema.js` (code implements: types, caps, tiers, varyBy) → a regenerated designer mirror (tool artifact, if wanted).** When doc and code disagree during the transition, THIS doc wins for the target model; the code schema still describes legacy v0.x until its rewrite. (REA_06's hand-maintained mirror is retired; the field cascade becomes: REA_14 → archetypeSchema.js → 庚 in archetypeSource.js → consumer.)

---

## §3 · Part I — Identity variables (K1 grain, stem-keyed)

| Var | Type | Axis | Measured | Budget | 庚 example | UI slots | Status |
|---|---|---|---|---|---|---|---|
| `archetype_name` | archetype-name | STEM | 2w · 7–12c | ≤3w ✓ | The Blade | A2 B1 I2 J1 | LIVE |
| `manifesto` | manifesto | STEM | 9–13w · 53–70c | ≤14w ✓ (split " · ") | Precision before intention — an edge is never given; it is forged. *(reveal kick = first-half split, not a second variable)* | B2 I2 J3 → A3 | LIVE |
| `inscription` | inscription | STEM | 13–17w · 61–81c | **propose ≤17w / ≤85c** (R2); target shape adds `zh` 4–6字 | You say what others soften — and pay, quietly, for being the one who did. | A4 · DM claim 1 · J4 fallback | LIVE |
| `dm_claims` ×2–3 | inscription | STEM | — | **10–16w each** (claim 1 ≡ `inscription`) | *handoff demo:* Being vague feels worse to you than being wrong. | part-2 P4 | PLANNED |
| `dm_mechanism` | descriptor | STEM (chart-aware R+E) | — | **≤30w** | *handoff demo:* Yang Metal tempered by spring wood — strength that grew against resistance, not in its absence. | part-2 P4 | PLANNED |
| `pinyin_display` | label | STEM | 4w · 13–17c | one line | GĒNG · YANG METAL | J1 | LIVE |
| `stem_painting` / `stem_seal` | asset | STEM | — | proc medallion + seal-chip | geng-metal.png / geng.png (seal-chip art 庚-only; others fall back) | A6 B4 D4 I2 J1 | LIVE |
| `yourNature_desc` (baseline ×10; ×150 K1 variants exist) | paragraph | STEM (→ STEM·BAND·PATTERN) | 30–46w · 160–261c | ≥2 sentences — **propose ≤46w** (R4) | *(authored but NOT SURFACING — J4 falls back to `inscription`)* | J4 intended | LIVE-authored ⚠ R4 |
| `self_card` (face + presence) | descriptor + paragraph | STEM·BAND ×30 | — | face ≤8w · presence ≤30w | — (migrates from `IDENTITY_SATURATION_READING`) | self energy card | PLANNED (K1b) |

## §4 · Part II — Reading-content variables (K2 grain + persona layer)

**The K2 unit (`ENERGY_CARD_DATA[element_god]`, ×50):**

```js
energyCard: {
  face,          // ≤8w  — dominant-energy abstract/conclusion, never a category
  persona,       // ≤20w — punchline: "X in you is The {Persona} — {definition}. {turn}."
  chips,         // 5 × ≤4w — persona behavioral keywords
  rulingDomain,  // ≤14w — DM-relative life-area line (B2)
  registers: {   // authored per PRESENCE FRAME (B1)
    dominant: { r, x, gate, seeker: { shadow, work, bonds, season } },  // BESPOKE ≤30/30/25 · 40/30/30/30w
    absent:   { r, x, gate, seeker: { … } },                            // BESPOKE — cultivation/borrow (ghost)
    // present = DERIVED (compressed from dominant) · scarce = derived blend toward absent
  },
}
```

| Var | Type | Axis | Measured | Budget | Example | UI slots | Status |
|---|---|---|---|---|---|---|---|
| `k2_face` (abstract/conclusion) | template-line + inscription | ELEMENT·GOD | — | **≤8w headline · conclusion sentence ≤20w** | *handoff demo:* Earth in you is The Alchemist — nourishment that transmutes. It's the ground your edge is forged on. | L3 faces prologue | PLANNED |
| `k2_persona_punchline` | descriptor | ELEMENT·GOD | — | **≤20w** (persona name + REA_13 §2 definition line + personal turn) | — | L3 | PLANNED |
| `k2_chips` | keyword-chip | ELEMENT·GOD | — | 5 × ≤4w | — | faces prologue | PLANNED |
| `k2_ruling_domain` | descriptor | ELEMENT·GOD (DM-relative) | — | **≤14w** | *(worked example REA_13 §5: 土偏印 = "a self-made, grounded, intuitive footing")* | faces prologue | PLANNED |
| `k2_R` / `k2_X` | paragraph | ELEMENT·GOD × registers | — | **≤30w each**; dominant+absent bespoke | *handoff demo R:* You steady people without meaning to. When plans wobble, yours is the version everyone quietly adopts. | L4 L5 | PLANNED — the corpus pass |
| `k2_gate_teaser` | paragraph | ELEMENT·GOD | — | **≤25w** — depth-hunger, not denial (D7) | *handoff demo:* Where this nourishment turns to over-protection · how it shapes your work and bonds · the season it peaks. | L6 | PLANNED ⚠ interacts with R5 |
| `k2_seeker_depth` (shadow/work/bonds/season) | paragraph ×4 | ELEMENT·GOD | — | **≤40/30/30/30w** — block set awaits §7 open #3 | source: TG_CARD_DATA shadows/outputs/frictions/domainSignatures/sixRelations | Seeker gate | PLANNED |
| `palace_frames` ×7 | frame | POSITION | — | domain ≤14w + relational reframe | — | positional reads | PLANNED (B6) |
| `face_kw` ×10 | keyword-chip | GOD | 5w · 27–36c | 3 chips lowercase | 比肩: independent · resolute · self-made | K7 | LIVE |
| `face_teaser` ×10 | paragraph | GOD | 45–50w · 241–296c | ⚠ **R5: 45–50w vs part-2 gate-teaser ≤25w — re-scope or re-rule** | *The Twin, 45w:* You trust your own counsel first. Self-reliance is a strength — and, now and then, a wall others can't get past. You begin without waiting for permission and finish without needing rescue. The art is knowing the moment standing alone costs more than it's worth. | K8 · L6? | LIVE ⚠ |
| `energy_tile_hook` / `energy_tile_tag` | descriptor | target ELEMENT·GOD (now 庚-gated interim) | ~6w / ~4w | ~1 line | Fire: The forge you borrow, never own. / Radiance · the rising heat | K2 K3 | INTERIM |
| `mean_line` ×5 | descriptor | ELEMENT (target ELEMENT·GOD) | ~15w | 1 sentence | Fire: The room is different before you speak — warmth as climate, light that changes what it touches. | K5 | INTERIM |

## §5 · Template patterns (authored once; slots fill from V + D)

| Var | Pattern | 庚 example | UI slots | Status |
|---|---|---|---|---|
| `tpl_cast_line` | CAST FROM {y} · {m} · {d} · {hour-label} {tz} | CAST FROM 1995 · 4 · 29 · YǑU HOUR 17–19 ⚠ **R1 format ruling** (handoff: "1995 · APRIL 29 · 17–19 CST") | A5 | LIVE ⚠ |
| `tpl_core_energy_line` | Your Core Energy is {El} | Your Core Energy is Metal | C1 | LIVE |
| `tpl_core_own_element` | Your core is {El} — the {Arch}'s own element. | Your core is Metal — the Blade's own element. | C4 | LIVE |
| `tpl_core_seal_explainer` | The seal at the wheel's center is {El}'s sign — the day master you were cast with; its share leads the wheel. | *(as pattern)* | C5 | LIVE |
| `tpl_relation_row` | {El} is your {Relation} | Fire is your Duty | E2 | LIVE |
| `tpl_pill_title` | {El} is Your {Relation} | Metal is Your Core | F2 | LIVE |
| `tpl_dx_line` | Your {El} is {Cond} — {Remedy} it. (role-driven mapping, ratified 2026-07-23 — REA_13 §5c) | Your Metal is Overfueled — Channel it. | F4 | LIVE |
| `tpl_verdict_line` | {connector} {pole} · {verb} — connectors curdling into / rising toward / holding / reaching for; verbs role-driven | curdling into Isolation · channel it (Metal core-excess) | F8 | LIVE |
| `tpl_share_coreline` | {El} is your Core — {Cond} | Metal is your Core — Overfueled | I3 | LIVE |
| `tpl_dm_prescription` | SEEK THIS · {EL} / SKIP THIS · {EL} + body | SEEK THIS · FIRE — Fire is the energy your chart asks for — thin in you and worth feeding. | J5 | INTERIM (pending K2) |
| `tpl_element_verdict` | role/condition verdict set (core / core-excess / friction / catalyst / missing) | Metal: YOUR CORE — ALSO YOUR EXCESS · Overfueled — honor it, don't feed it further. | K4 | LIVE |
| `tpl_presence_frames` ×4 | dominant/present/scarce/absent framing patterns, ≤20w, slot-filled | — | energy cards | PLANNED |
| `tpl_cycle_line` ×20 | {elA} {feeds/tests} {elB} — label ≤10w + line ≤20w (concept 2.1's teaching beats) | *handoff demo:* Why Earth feeds Metal — the cycle, in your chart | L7 + cycle layer | PLANNED |
| `tpl_rx_ribbon` | ribbon ≤14w + 10 fragments (5 el × lift/wear) | — | rx ribbon | PLANNED |
| `tpl_pattern_conclusion` | per detected pillar-pattern (~6 types), conclusion-first, ≤25w | *handoff demo:* One live pattern between your branches — Tiger and Pig combining into wood. Your drive and your depths conspire. | M2 | PLANNED |
| `tpl_hour_chip` | hour-unset state ≤12w | Cast without your hour — close, not exact. Discover it → | M3 | LIVE |

## §6 · Derived slot signatures (engine-owned; named here only as template inputs)

`presence_pct` ×5 (sum 100) · `roles` (+core_excess, major, missing) · `lead_god_per_element` · `present_faces` `{presentFaces:[{god,weight}], absentGod}` (pending engine rewire — REA_08 A3) · `condition_key`/`approach_key` · `dominance_rank` → sizes/seats (seating law) · `top3_keyword_selection` · `deck_order` (self → presence desc) · `pillars` + birth data · derived registers (`present`, `scarce`). Computation and documentation: engine (DEV_01). **Authored copy embedding any of these is a defect.**

## §7 · Decisions (the inherited log — formerly REA_04 §7)

### Decided — v2.1 (2026-06-24, owner-locked · record: REA_08)
1. **K2 polarity — RESOLVED → full 50.** Each polarity face is its own persona; no 25-family collapse.
- **A1** Faces = a reading **prologue**, not a new IA node. · **A2** Faces strictly by math (1–2 present); absence read at ghost level. · **A3** Engine polarity-aware rewire (retire `tenGodForEnergy`; emit `{presentFaces, absentGod}`).
- **B1** Registers = presence frames; dominant + absent bespoke, present derived. · **B2** `rulingDomain` per persona ×50, DM-relative. · **B3** Persona names = locked set; other sets non-surfacing aliases. · **B4** Art = 10 Inner-Council concepts, recolored per element.
- **B5** Identity card and Ten-God cards are separate sections; the self element's Twin/Rival render as energy cards. All 50 keys can render.
- **B6** Position (宫位) is a first-class reading axis — palace × persona × polarity; 日支 and 时柱 highest-value.

### Ruled — Cece-derived backlog housekeeping (owner, 2026-07-23)
Lens: Cece = reading-angles/content benchmark only; design goal = minimal cognitive load, clear BaZi knowledge for first-time learners.
- **D5 rarity marker: RETIRED.** · **D6 大运 timeline: REFIT → backlog** ("teach the 大运/cycle concept, form TBD"; `CYCLE_LINES` premise dead). · **D7 FREE gating: principle LOCKED** — gate by depth, never hide or truncate; split waits for content design (interacts with open #3). · **D8 cohort badge: RETIRED.**

### Still open
3. **Seeker depth block set:** shadow/work/bonds/season proposed. Confirm or re-pick (e.g., add `sixRelations` as a "people" block).
4. **`blocks[]` (the old 5–11 reading blocks per stem):** retire entirely, or migrate the best material into K2 seeker blocks during generation? **Recommend: mine during generation, then retire.**

## §8 · Backlog (authored corpus with no target slot; fate pending §7 #4)

From `archetypeSource.js` / `STEM_CARD_DATA.js` unless noted. **Rule: nothing here is authored further until ruled; it is source ore for the K2 pass.**

| Corpus | Grain | Note |
|---|---|---|
| `elementIntro.punch/expand` | STEM ×10 | measured 9–14w / 20–22w vs budgets 9–12/16–20 — the walker-conflict evidence (⚠ R7); v2.1 fate: re-budget into DM-claim register + self-card presence |
| `subtitle` · `chips` (×5) · `yourNature.phrase` (internal) | STEM ×10 | legacy identity surface fields |
| `gifts[]` / `shadows[]` (phrase+desc ×3) | STEM ×10 + GOD ×10 | prime K2 seeker ore |
| `blocks[]` (5–11 authored; band/pattern overrides; 4-slot selection v2) | STEM ×10 (× band·pattern) | the §7 #4 subject; selection architecture recorded in REA_03 §11 |
| `TG_CARD_DATA`: `rulingRealm` · `chips` · `hiddenDynamic` · `domainSignatures` · `outputs[]`/`frictions[]` · `sixRelations` · `liunianSignatures` | GOD ×10 | THE K2 generation source (kept per §2.4); liunian retired concept (D6 refit) |
| `manual.*` (concentrated/open/catalyst/resistance) | STEM ×10 | legacy usage-manual surface |
| `energy.*` (what/represents/liunian) | STEM ×10 | legacy Edge-in-Motion surface |
| `seasonalCalibration.*` | STEM ×10 | superseded — absorbs into K2 absent register |
| `psych.*` (bigFive/jungian/attachment/shadow) + `archetypes[]` | STEM ×10 | INTERNAL authoring anchors — keep as generation tone calibration |
| `STEM_CARD_DATA.js` ×150 K1 variants | STEM·BAND·PATTERN | only `yourNature.desc` grain authored (庚 15) |
| Faces corpus: `PERSONA_READING` · `PERSONA_DOMAINS` · `FAMILY_BRIEF` · `FAMILY_CLAUSE` · `FAMILY_ELEMENT` | GOD/FAMILY | awaiting the faces pages |

## §9 · UI Slot Index (layout view — slots point at variables)

| Slot | Surface | Variable(s) | Status |
|---|---|---|---|
| A1–A6 | Reveal | `ui_labels`(V) · `archetype_name` · `manifesto`(split) · `inscription` · `tpl_cast_line` · `stem_painting` | LOCKED ⚠R1 |
| B1–B4 | Hero | `archetype_name` · `manifesto` · top3→`keyword`(V) · `stem_seal` | LOCKED |
| C1–C8 | Folio | `tpl_core_energy_line` · `condition_term`(V) · `fold_verdict`(V) · `tpl_core_own_element` · `tpl_core_seal_explainer` · `cond_tail`(V) · `approach_verb`+`appr_tail`(V) · `defline`(V) | LOCKED |
| D1–D4 | Wheel | derived (presence/seats/roles) · `stem_painting` | LOCKED |
| E1–E5 | Seek/Skip | `ui_labels`(V) · `tpl_relation_row` ← `relation_noun`(V) + presence | LOCKED |
| F1–F9 | Shelf pills | `tpl_pill_title` · `family_line`(V) · `tpl_dx_line` · roles · `adj_*`(V) · `keyword`(V) · `tpl_verdict_line` ← `pole_*`(V) · presence | LOCKED |
| G1–G4 | Words-note + glossary | `ui_labels`(V) · `condition_term`(V) · `glossary_body`(V) | LOCKED |
| H1 | Dock | `relation_noun`(V) + presence + roles | LOCKED |
| I1–I4 | Share card | `ui_labels`(V) · `archetype_name` · `manifesto` · top3 · `tpl_share_coreline` · composites | LOCKED |
| J1–J8 | Day-Master screen | `archetype_name` · `pinyin_display` · `manifesto` · `yourNature_desc` ⚠R4 · `tpl_dm_prescription` · `dm_claims` · `dm_mechanism` · `ui_labels`(V) | shell LOCKED · content INTERIM/PLANNED |
| K1–K8 | Element mini-screen | derived eyebrow · `energy_tile_hook/tag` · `tpl_element_verdict` · `mean_line` · `persona_name`(V)+`keyword`(V) · `face_kw` · `face_teaser` ⚠R5 | WIP |
| L1–L7 | Deep energy pages | derived hero · `k2_face` · `k2_R` · `k2_X` · `k2_gate_teaser` · `tpl_cycle_line` | PLANNED |
| M1–M3 | Pillar chart | `pillars`(D) · `tpl_pattern_conclusion` · `tpl_hour_chip` | PLANNED |

## §10 · Standing rules for template generation

1. **Three field classes, never blended:** VOCABULARY (V — REA_13, locked) · ARCHETYPE (A — authored per axis) · USER_CHART (D — derived). Templates (T) are patterns over V+D. Every new variable declares class + axis here before authoring.
2. **Derived is sacred.** Authored copy embedding a number, role, or ordering is a defect.
3. **Templates slot-fill only from REA_13 vocabulary + derived values.** No free text inside slots.
4. **Definition lines mandatory on first surfacing** of any taught term (REA_13 law #4/#5; REA_15 orders teaching).
5. **One concept, one name** (REA_13 law #1); internal terms never surface.
6. **Reading level: grade 6–7; labels 1–2 syllables** (REA_13 §4c).
7. **Presence-frame registers, not per-chart authoring:** dominant bespoke · present derived · scarce/absent cultivation. Dominance selects and pitches; never rewrites (§2.2).
8. **Depth-gating law (D7):** free reads complete; only Seeker depth gates; never hide or truncate.
9. **Chinese glyphs are decorative texture, never information-carrying.**
10. **One variable, one ruling:** every slot inherits it; two slots needing different copy = two variables, declared here first.
11. **One schema, all consumers:** journey UI, Self-Report composer, and Consultant payload consume THIS registry — no per-feature schemas.

## §11 · Pending rulings (the ⚠ queue)

| # | Variable | Ruling needed |
|---|---|---|
| R1 | `tpl_cast_line` | Format: numeric + hour-label ("1995 · 4 · 29 · YǑU HOUR 17–19 CST") vs handoff month-name ("1995 · APRIL 29 · 17–19 CST") |
| R2 | `inscription` | Confirm budget ≤17w / ≤85c (+ the `zh` 4–6字 target shape) |
| R3 | `glossary_body` vs `defline` (V — REA_13 §5c) | Condition glossary bodies re-compose defline+appr_tail — one source (derive) or two locked copies? |
| R4 | `yourNature_desc` | Authored ×10 but not surfacing (J4 falls back to `inscription`) — surface, or retire baseline in favor of the claims model? Cap ≤46w? |
| R5 | `face_teaser` | 45–50w vs gate-teaser law ≤25w — is it the L6 gate teaser (over budget ×2) or the K-screen read (then `k2_gate_teaser` is separate, as mapped)? |
| R6 | `glossary_body` budget (V) | Confirm ≤35w / ≤175c |
| R7 | `elementIntro.punch/expand` | Walker conflict (voice vs budget) — re-budget per v2.1 fate (§2.4) or retire with §7 #4? |

---

*Next: rule R1–R7 → freeze each variable's axis + budget → rewrite `archetypeSchema.js` to this spec → recompute the 庚 faces (polarity-aware) → K2 template generation against this registry → the archetype profile database (normalized: K1 ×10 · K2 ×50 · T patterns) + compiled per-stem profiles (the persistent single-user template).*

## Document Metadata

| | |
|---|---|
| **Document** | REA_14 — Reading Generation Schema (the A book) |
| **Version** | 1.0 · 2026-07-28 (consolidation of REA_04 + REA_12 + REA_06 still-true content) |
| **Status** | DRAFT — freeze per variable; corpus authoring parked until journey lock (REA_08 sequencing ruling) |
| **Consumers** | archetypeSchema.js (implements) · the K2 authoring pass · journey UI / Self-Report / Consultant (via the content modules) |
| **Companions** | REA_13 (Dictionary — all V slots) · REA_15 (Ladder) · REA_01 (taxonomy) · REA_02 (knowledge sources) · REA_03 (generation pipelines) · REA_05 (authoring prompts) · REA_08 (v2.1 record) |
