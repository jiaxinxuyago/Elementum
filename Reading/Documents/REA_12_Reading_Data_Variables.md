# REA_12 — Reading Data Variables (the reading template schema)

**Created 2026-07-27 as the Field Map · REVISED 2026-07-28 (owner direction): pivoted from UI-field rows to unique, persistent READING DATA VARIABLES.** Status: DRAFT for owner rulings.

## The two definitions (the law of this doc)

1. **UI Field** — a *slot* in the journey layout where reading data stands. UI fields lay out the reading UI and help categorize variables. They are not data. Mapped from the JourneyCatalogue handoff (§3 index below).
2. **Reading Data Variable** — the *actual data* the reading templates / archetype generation produce, varying on its variant-axis. **One variable, one row, one ruling** — however many UI slots it fills (archetype_name fills five), and even if it fills none yet (backlog).

This doc locks the variables to lock the templates for scaled generation. **Relationship to REA_04:** REA_04 Reading_Schema is the conceptual content model (keys, axes, registers); REA_12 operationalizes it at variable grain — every variable here declares the axis REA_04 defines. When frozen, this is the authoring checklist and the shape of the content-engine data.

**Sources:** JourneyCatalogue handoff (boards + `template-data.json` + part-2) · live contract `journeyData.js` (piping verified 2026-07-23) · REA_11 vocabulary · REA_07 concept law · REA_06 field dictionary · REA_04 key system · REA_09 budgets. **Measured** = real min–max across all authored variants (2026-07-27 run). **庚 example** = live render of the golden chart **1995-04-29 · 18:00 · Beijing → 庚 The Blade** (乙亥/庚辰/庚寅/乙酉 · Overfueled · Earth 33/Wood 33/Metal 23/Water 6/Fire 5); *handoff demo* marks wireframe demo copy on unbuilt surfaces.
**Twin:** `Reading/Database/REA_12_reading_data_variables.xlsx` — regenerate via `node Elementum_App/tools/build-field-map-xlsx.mjs`.

---

## §1 · The variant-axis taxonomy

| Axis | Count | Meaning | Authored? |
|---|---|---|---|
| **CONSTANT** | 1 | Vocabulary-law term or fixed copy — identical for every user (REA_07 law #1) | Locked once |
| **STEM** | ×10 | Varies by day-master stem (the archetype identity) | Yes |
| **STEM·BAND** | ×30 | Stem × energy band (K1b) | Planned |
| **STEM·BAND·PATTERN** | ×150 | Full Layer-1 variant surface (K1) | Partial (庚) |
| **ELEMENT** | ×5 | Varies by the five elements | Yes |
| **GOD** | ×10 | Varies by Ten God (persona layer) | Yes |
| **ELEMENT·GOD** | ×50 | The K2 persona unit (the two-faces corpus) | The big pass |
| **CONDITION** | ×3 (+2) | Overfueled/Balanced/Underfueled (+ Channel/Refill) | Locked |
| **FAMILY** | ×5 | Ten-god family (self/resource/output/wealth/officer) | Locked |
| **TEMPLATED** | — | Fixed sentence pattern, slots filled from locked vocabulary + derived values; pattern authored once | Pattern only |
| **DERIVED** | — | Engine-computed, never authored; hard-coding one is a defect | Never |

**Variable classes (the four registries below):** **V** = vocabulary constant (locked term/copy) · **A** = archetype-varying authored content · **T** = template pattern (authored once, slot-filled) · **D** = derived engine input.
**Status:** `LIVE` (surfacing now) · `INTERIM` (surfacing but placeholder/gated copy) · `PLANNED` (defined in REA_04/handoff, not built) · `BACKLOG` (exists in corpus, no UI slot; fate pending ruling).

---

## §2 · The variable registry

### §2.V — Vocabulary constants (locked; REA_07/REA_11 law)

| Var | Type | Axis | Measured | Budget | 庚 example | UI slots | Status |
|---|---|---|---|---|---|---|---|
| `relation_noun` ×5 | noun | FAMILY | 1w · 4–5c | 1 word · LOCKED §5b | Core · Root · Drive · Voice · Duty | E2 E3 F1 F2 H1 I4 | LIVE |
| `keyword` ×10 | keyword-chip | GOD | 1w · 4–12c | 1 word · LOCKED §4 v3 | Independence 比肩 · Insight 偏印 · Caution 正财 · Flow 食神 · Force 七杀 | B3 F7 K6 | LIVE |
| `persona_name` ×10 | persona-name | GOD | 2w · 8–14c | LOCKED set (REA_01) | The Twin · The Alchemist · The Steward · The Artisan · The General | K6 L3 | LIVE |
| `persona_definition_line` ×10 | descriptor | GOD | ~6–8w | mandatory on first surfacing (REA_07 law #4) | The General — "pressure that doesn't grant permission" | L3 (conclusion em-dash clause) | PLANNED — registry exists (REA_07 §2), not yet on a built surface |
| `pole_catalyst` / `pole_friction` ×10 each | noun | GOD | 1w · 5–10c | 1 word · §4b v3 | Isolation (比肩 fric) · Security (正财 cat) · Grace (食神 cat) · Command (七杀 cat) | F8 (slot) | LIVE |
| `adj_catalyst` / `adj_friction` ×10 × 3 chips | keyword-chip | GOD × pole | 1w · 4–14c | 3 chips · §4b | fric 比肩: Walled-off · Solitary · Immovable — cat 正财: Reliable · Compounding · Loyal | F6 | LIVE |
| `condition_term` ×3 | noun | CONDITION | 1w · 8–11c | LOCKED §5c | Overfueled | C2 F4 G2 I3 K4 | LIVE |
| `approach_verb` ×2 | noun | CONDITION | 1w | LOCKED §5c | Channel | C7 F4 J5 | LIVE |
| `defline` ×5 (3 cond + 2 appr) | descriptor | CONDITION | 14–23w · 74–117c | ≤2 sentences · first-surfacing law | *Overfueled:* More fuel comes in than your core burns — the surplus wants somewhere to go. Built into your chart, not today's mood. | C8 | LIVE ⚠ overlaps `glossary_body` cond entries — consolidation candidate |
| `glossary_body` ×6 (core/cat/fric + cond ×3) | paragraph | CONSTANT + CONDITION | 20–32w · 104–166c | **propose ≤35w / ≤175c** (sheet 300px) | *Core:* The energy you were cast with — your day master, the fixed center every other energy is read against… *Overfueled:* = defline + "So channel it: aim the surplus, don't add to it." | G3 | LIVE ⚠ cond entries are `defline` + `appr_tail` re-composed — one source or two? (ruling) |
| `family_line` ×5 | descriptor | FAMILY | 10–13w · 54–65c | one sentence ✓ | This energy is you — your identity and your footing among equals. | F3 | LIVE |
| `fold_verdict` ×3 | clause | CONDITION | 3w · 13–20c | one clause | channel the surplus. | C3 | LIVE |
| `cond_tail` ×3 | clause | CONDITION | 6–7w · 28–32c | one clause | more comes in than it burns. | C6 | LIVE |
| `appr_tail` ×2 | clause | CONDITION | 5–7w · 23–33c | one clause | aim the surplus, don't add to it. | C7 G3 | LIVE |
| `ui_labels` (fixed set) | label | CONSTANT | — | fixed strings | YOU ARE · YOUR READING · SEEK THESE·CATALYST / SKIP THESE·FRICTION · The words on this page · tap one · Deeper in the Codex · ELEMENTUM · YOUR IDENTITY · Cast without your hour — close, not exact. | A1 E1 G1 G2 G4 I1 J8 M3 | LIVE |

### §2.A — Archetype-varying authored content

| Var | Type | Axis | Measured | Budget | 庚 example | UI slots | Status |
|---|---|---|---|---|---|---|---|
| `archetype_name` | archetype-name | STEM | 2w · 7–12c | ≤3w ✓ | The Blade | A2 B1 I2 J1 | LIVE |
| `manifesto` | manifesto | STEM | 9–13w · 53–70c | ≤14w ✓ | Precision before intention — an edge is never given; it is forged. *(reveal kick = first half, a presentation split, not a second variable)* | B2 I2 J3 → A3 (split) | LIVE |
| `inscription` | inscription | STEM | 13–17w · 61–81c | **propose ≤17w / ≤85c** (none recorded) | You say what others soften — and pay, quietly, for being the one who did. | A4 · part-2 DM claim 1 · J4 (as fallback) | LIVE |
| `pinyin_display` | label | STEM | 4w · 13–17c | one line | GĒNG · YANG METAL | J1 | LIVE |
| `stem_painting` / `stem_seal` | asset | STEM | — | proc medallion + seal-chip | geng-metal.png / geng.png | A6 B4 D4 I2 J1 | LIVE (seal-chip art exists for 庚 only — others fall back to painting) |
| `yourNature_desc` (baseline ×10; K1 variants ×150) | paragraph | STEM (→ STEM·BAND·PATTERN) | 30–46w · 160–261c | ≥2 sentences — **propose ≤46w** | *(authored but NOT SURFACING — J4 currently falls back to `inscription` for 庚)* | J4 (intended) | LIVE-authored / ⚠ not surfacing — ruling |
| `face_kw` ×10 | keyword-chip | GOD | 5w · 27–36c | 3 chips lowercase | 比肩: independent · resolute · self-made | K7 | LIVE |
| `face_teaser` ×10 | paragraph | GOD | 45–50w · 241–296c | ⚠ **part-2 seeker-teaser law ≤25w — re-scope or re-rule** | *The Twin, 45w:* You trust your own counsel first. Self-reliance is a strength — and, now and then, a wall others can't get past. You begin without waiting for permission and finish without needing rescue. The art is knowing the moment standing alone costs more than it's worth. | K8 · L6 (target slot?) | LIVE ⚠ |
| `energy_tile_hook` / `energy_tile_tag` | descriptor | target ELEMENT·GOD ×50 (now 庚-gated) | ~6w / ~4w | ~1 line | Fire: The forge you borrow, never own. / Radiance · the rising heat | K2 K3 | INTERIM (REA_11 §6b item 6) |
| `mean_line` ×5 | descriptor | ELEMENT (target ELEMENT·GOD) | ~15w | 1 sentence | Fire: The room is different before you speak — warmth as climate, light that changes what it touches. | K5 | INTERIM |
| `dm_claims` ×10 (2–3 each) | inscription | STEM | — | **10–16w each (handoff law)** | *handoff demo:* Being vague feels worse to you than being wrong. | part-2 P4 | PLANNED |
| `dm_mechanism` ×10 | descriptor | STEM (chart-aware) | — | **≤30w (handoff law)** | *handoff demo:* Yang Metal tempered by spring wood — strength that grew against resistance, not in its absence. | part-2 P4 | PLANNED |
| `k2_abstract` + `k2_punchline` + `k2_chips` + `k2_ruling_domain` ×50 | FACES prologue set | ELEMENT·GOD | — | REA_04 §2 K2; rulingDomain DM-relative | — | faces pages (WIP) | PLANNED — the v2.1 FACES prologue |
| `k2_R` / `k2_X` ×50 × registers | paragraph | ELEMENT·GOD × presence-frame | — | **≤30w each (handoff law)**; dominant+absent bespoke, present derived | *handoff demo R (Earth·Alchemist):* You steady people without meaning to. When plans wobble, yours is the version everyone quietly adopts. | L4 L5 | PLANNED — the corpus pass |
| `k2_conclusion` ×50 | template-line + inscription | ELEMENT·GOD | — | **≤20w (handoff law)** | *handoff demo:* Earth in you is The Alchemist — nourishment that transmutes. It's the ground your edge is forged on. | L3 | PLANNED |
| `k2_seeker_teaser` ×50 | paragraph | ELEMENT·GOD | — | **≤25w (handoff law)** | *handoff demo:* Where this nourishment turns to over-protection · how it shapes your work and bonds · the season it peaks. | L6 | PLANNED ⚠ interacts with `face_teaser` scope ruling |
| `k2_seeker_depth_blocks` | block set | ELEMENT·GOD | — | set TBD | — | Seeker gate | PLANNED — **awaits REA_04 §7 open #3** (shadow/work/bonds/season) |
| `palace_frames` ×7 | frame | position (宫位) | — | REA_04 B6 | — | positional reads | PLANNED |

### §2.T — Template patterns (authored once; slots fill from V + D)

| Var | Pattern | Axis | 庚 example | UI slots | Status |
|---|---|---|---|---|---|
| `tpl_cast_line` | CAST FROM {y} · {m} · {d} · {hour-label} {tz} | DERIVED slots | CAST FROM 1995 · 4 · 29 · YǑU HOUR 17–19 ⚠ **format ruling: vs handoff "1995 · APRIL 29 · 17–19 CST"** | A5 | LIVE ⚠ |
| `tpl_core_energy_line` | Your Core Energy is {El} | element | Your Core Energy is Metal | C1 | LIVE |
| `tpl_core_own_element` | Your core is {El} — the {Arch}'s own element. | element+stem | Your core is Metal — the Blade's own element. | C4 | LIVE |
| `tpl_core_seal_explainer` | The seal at the wheel's center is {El}'s sign — the day master you were cast with; its share leads the wheel. | element | *(as pattern)* | C5 | LIVE |
| `tpl_relation_row` | {El} is your {Relation} | element+family | Fire is your Duty · Metal is your Core | E2 | LIVE |
| `tpl_pill_title` | {El} is Your {Relation} | element+family | Metal is Your Core | F2 | LIVE |
| `tpl_dx_line` | Your {El} is {Cond} — {Remedy} it. | role-driven dx | Your Metal is Overfueled — Channel it. | F4 | LIVE (mapping owner-ratified 2026-07-23) |
| `tpl_verdict_line` | {connector} {pole} · {verb} — connectors: curdling into / rising toward / holding / reaching for; verbs role-driven | role+god | curdling into Isolation · channel it (Metal core-excess) · rising toward Command · keep it close (Fire) | F8 | LIVE |
| `tpl_share_coreline` | {El} is your Core — {Cond} | element+condition | Metal is your Core — Overfueled | I3 | LIVE |
| `tpl_dm_prescription` | SEEK THIS · {EL} / SKIP THIS · {EL} + interim body | element+role | SEEK THIS · FIRE — Fire is the energy your chart asks for — thin in you and worth feeding. Seek it on purpose. | J5 | INTERIM (pending K2) |
| `tpl_element_verdict` | role/condition-driven verdict set (core / core-excess / friction / catalyst / missing) | role+condition | Metal: YOUR CORE — ALSO YOUR EXCESS · Overfueled — honor it, don't feed it further. · Fire: Thin in you — worth feeding. | K4 | LIVE |
| `tpl_cycle_label` | Why {El} feeds/tests {El} — the cycle, in your chart | cycle | *handoff demo:* Why Earth feeds Metal — the cycle, in your chart (**≤10w law**) | L7 | PLANNED |
| `tpl_pattern_conclusion` | per detected pillar-pattern, conclusion-first | pattern | *handoff demo:* One live pattern between your branches — Tiger and Pig combining into wood. Your drive and your depths conspire. (**≤25w law**) | M2 | PLANNED |

### §2.D — Derived engine inputs (never authored; fill slots in V/T)

| Var | 庚 example | Feeds UI slots |
|---|---|---|
| `presence_pct` ×5 (sum 100) | Earth 33 · Wood 33 · Metal 23 · Water 6 · Fire 5 | D1 E4 F1 F9 H1 I4 K1 L1 |
| `roles` (+`core_excess`, `major`, `missing`) | Metal core+excess · Earth friction · Wood/Water/Fire catalyst · Fire major | D3 E-rows F5 K1 L2 |
| `lead_god_per_element` | Earth→偏印 · Wood→正财 · Metal→比肩 · Water→食神 · Fire→七杀 | selects `keyword`/`persona`/`adj`/`pole` per element |
| `condition_key` + `approach_key` | Overfueled · Channel | selects all CONDITION-axis variables |
| `dominance_rank` → sizes/seats (seating law) | Metal crowns top ⌀48; Earth right ⌀59 … | D2 F-order H-order |
| `top3_keyword_selection` | Insight · Caution · Independence | B3 I2 |
| `present_faces` per element (v2.1: `{presentFaces, absentGod}`) | *(pending engine rewire — REA_08 A3)* | faces pages (PLANNED) |
| `pillars` + birth data | 乙亥 / 庚辰 / 庚寅 / 乙酉 · 1995-04-29 18:00 | M1 A5 |

### §2.B — Backlog (authored corpus with no UI slot; fate pending REA_04 §7 open #4 "mine during generation, then retire")

`elementIntro.punch/expand` ×10 (measured 9–14w / 20–22w — the REA_09 budget-conflict evidence) · `gifts[]`/`shadows[]` ×10 stem + ×10 god · `TG_CARD_DATA`: `rulingRealm`, `chips`, `hiddenDynamic`, `domainSignatures`, `outputs[]`/`frictions[]`, `sixRelations`, `liunianSignatures` (retired concept — D6 refit) · `blocks[]` ×10 (5–11 each) · `STEM_CARD_DATA.js` ×150 K1 variants (only `yourNature.desc` grain) · `PERSONA_READING`/`PERSONA_DOMAINS`/`FAMILY_BRIEF`/`FAMILY_CLAUSE`/`FAMILY_ELEMENT` (faces corpus awaiting the faces pages). **Rule: nothing here is authored further until its fate is ruled; it is source material for the K2 pass.**

---

## §3 · UI Slot Index (layout view — slots point at variables)

| Slot | Surface | Variable(s) | Status |
|---|---|---|---|
| A1 | Reveal eyebrow | `ui_labels` | LOCKED |
| A2 | Reveal name | `archetype_name` | LOCKED |
| A3 | Reveal kick | `manifesto` (first-half split) | LOCKED |
| A4 | Reveal inscription | `inscription` | LOCKED |
| A5 | Reveal cast line | `tpl_cast_line` ← birth data | LOCKED ⚠ |
| A6 | Reveal plate | `stem_painting` | LOCKED |
| B1–B4 | Hero | `archetype_name` · `manifesto` · `top3_keyword_selection`→`keyword` · `stem_seal` | LOCKED |
| C1–C8 | Folio | `tpl_core_energy_line` · `condition_term` · `fold_verdict` · `tpl_core_own_element` · `tpl_core_seal_explainer` · `cond_tail` · `approach_verb`+`appr_tail` · `defline` | LOCKED |
| D1–D4 | Wheel | `presence_pct` · `dominance_rank` · `roles` · `stem_painting` | LOCKED |
| E1–E5 | Seek/Skip | `ui_labels` · `tpl_relation_row` ← `relation_noun` + `presence_pct` | LOCKED |
| F1–F9 | Shelf pills | `tpl_pill_title` · `family_line` · `tpl_dx_line` · `roles` · `adj_*` · `keyword` · `tpl_verdict_line` ← `pole_*` · `presence_pct` | LOCKED |
| G1–G4 | Words-note + glossary | `ui_labels` · `condition_term` · `glossary_body` | LOCKED |
| H1 | Dock | `relation_noun` + `presence_pct` + `roles` | LOCKED |
| I1–I4 | Share card | `ui_labels` · `archetype_name` · `manifesto` · `top3` · `tpl_share_coreline` · seek/skip composites | LOCKED |
| J1–J8 | Day-Master screen | `archetype_name` · `pinyin_display` · `manifesto` · `yourNature_desc` (⚠ fallback) · `tpl_dm_prescription` · `dm_claims` · `dm_mechanism` · `ui_labels` | shell LOCKED · content INTERIM/PLANNED |
| K1–K8 | Element mini-screen | derived eyebrow · `energy_tile_hook/tag` · `tpl_element_verdict` · `mean_line` · `persona_name`+`keyword` · `face_kw` · `face_teaser` | WIP |
| L1–L7 | Deep energy pages | derived hero · `k2_conclusion` · `k2_R` · `k2_X` · `k2_seeker_teaser` · `tpl_cycle_label` | PLANNED |
| M1–M3 | Pillar chart | `pillars` · `tpl_pattern_conclusion` · `ui_labels` | PLANNED |

---

## §4 · Standing rules for template generation

1. **Three field classes, never blended** (handoff contract): **VOCABULARY** (V) · **ARCHETYPE** (A) · **USER_CHART** (D). Templates (T) are patterns over V+D. Every new variable declares its class + axis before authoring.
2. **Derived is sacred.** Numbers, roles, ordering, selection: engine-owned. Authored copy embedding a number or role is a defect (no hard-coding).
3. **Templates slot-fill only from locked vocabulary + derived values.** No free text inside slots.
4. **Definition lines are mandatory on first surfacing** of any taught term (REA_07 law #4/#5; the Ladder orders teaching).
5. **One concept, one name** (REA_07 law #1). Internal terms never surface.
6. **Reading level: grade 6–7; labels 1–2 syllable common words.**
7. **Presence-frame registers, not per-chart authoring** (REA_04 §1): dominant bespoke · present derived · scarce/absent cultivation. Dominance selects and pitches; never rewrites.
8. **Depth-gating law (D7):** free reads complete; only Seeker depth gates; never hide or truncate.
9. **Chinese glyphs are decorative texture, never information-carrying.**
10. **One variable, one ruling:** a budget/wording ruling applies to the variable, and every slot inherits it. Slots never fork a variable's copy — if two slots genuinely need different copy, that is two variables, declared here first.

## §5 · Pending rulings (the ⚠ queue, now at variable grain)

| # | Variable | Ruling needed |
|---|---|---|
| R1 | `tpl_cast_line` | Format: numeric ("1995 · 4 · 29 · YǑU HOUR 17–19 CST") vs handoff month-name ("1995 · APRIL 29 · 17–19 CST") |
| R2 | `inscription` | Confirm proposed budget ≤17w / ≤85c |
| R3 | `glossary_body` vs `defline` | The condition glossary bodies re-compose `defline`+`appr_tail` — consolidate to one source (glossary derives) or keep two locked copies? |
| R4 | `yourNature_desc` | Authored ×10 but not surfacing (J4 falls back to `inscription`) — surface it, or retire the baseline in favor of the part-2 claims model? Budget cap. |
| R5 | `face_teaser` | 45–50w measured vs part-2 seeker-teaser ≤25w — is this variable the L6 gate teaser (then over budget ×2) or the K-screen read (then `k2_seeker_teaser` is a separate PLANNED variable, as mapped)? |
| R6 | `glossary_body` budget | Confirm proposed ≤35w / ≤175c |
| R7 | `elementIntro.punch/expand` | The REA_09 walker conflict (voice vs budget) — re-budget or retire with the backlog (#4)? |

*Next: rule R1–R7 → freeze each variable's axis + budget → REA_04 schema finalization → K2 template generation begins against this registry.*
