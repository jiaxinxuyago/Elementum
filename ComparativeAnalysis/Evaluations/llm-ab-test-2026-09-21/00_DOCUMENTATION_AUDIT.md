# Documentation audit before the LLM A/B comparison

Date: 2026-09-21. Head: `28ea4882`. Owner's two questions, answered against the reading library (`Reading/Documents/REA_01…REA_16`), the engine doc (`Operations/Development/DEV_01`) and the station (`Reading/Database/templates/by_axis/json/`). The reverse-engineered prompt pack that closes the gaps is `Reading/Documents/REA_17_Generation_Prompt_Pack.md`.

## Question 1 · Are the archetype axes, their compounds and their set-up methods sufficiently documented?

**Yes for the taxonomy, the compounds and the selection math. Partly for the per-axis construct, which is documented but scattered.**

| What | Where it is documented | Verdict |
|---|---|---|
| The axis taxonomy (13 classes with counts: STEM ×10, STEM·BAND ×30, ELEMENT ×5, GOD ×10, ELEMENT·GOD ×50, ELEMENT·PAIR ×25, POSITION ×70, TG·PATTERN ×9, CONDITION, FAMILY, TEMPLATED, DERIVED) | REA_01 "The taxonomy" (normative, owner-finalized 2026-07-30; ELEMENT·PAIR and TG·PATTERN rows added 2026-09-20) | Complete |
| How a chart becomes a compound (persona core ⊕ presence frame ⊕ derived badges; two-face rule; dominance selects, never rewrites) | REA_03 §2 (assembly model, key system K1/K1b/K2/T) | Complete |
| Stem × element × ten-god compounds: why 50 cells are exact, and each cell's structural interaction seed | REA_03 §4b (the 50-key table) | Complete |
| Element relations per Day Master (feeder, fed, tamed, tamer, self) and the function they own (Mind, Expression, Action, Order, Body) | REA_02 §5d (the ten equations, law verbs), §5f (the bijection), §5h (the door) | Complete |
| Persona faces per element (polarity split, present faces, lead god) | REA_03 §2.1; DEV_01 §2.7; `calculator.js resolveElementFaces` | Complete |
| Band, volume tiers, valence, excess override, Balanced guard | REA_02 §5c, §5h (valence × volume); DEV_01 §3; `energyRoles.js` | Complete |
| POSITION: gates, slots, the seven-slot grain, seat ranking, life chapters, domain taxonomy | REA_02 §5e; REA_04 PART 9 | Complete |
| TG_PATTERN: the nine patterns, triggers, priority, fused tier | REA_02 §5g | Complete |
| Engine math (pillars, hidden stems, strength, composition, useful god) | DEV_01 §2–§3 | Complete (not re-verified here) |
| Classical and psychological sources behind each idea | REA_04 PARTS 2–4, 6 | Complete |
| **The per-axis construct ("how this axis's variables are set up")** | Ruled and documented, but spread across REA_03 §3/§4 table cells, REA_16 §2c registry notes, REA_02 §5e–§5h and the template cells' `construct` notes. REA_01's taxonomy table still says "TBD" for ten of thirteen axes, and the station file headers still carry `"construct": "TBD — ruled per-axis with the owner"` on every axis except ELEMENT_PAIR and TEMPLATED. | **Gap: stale markers, no single per-axis sheet.** REA_17 §2 (the input pack) now states each axis's set-up in one place; the TBD markers in REA_01 and the station headers remain to be refreshed (housekeeping, owner's call). |

## Question 2 · Is there systematic guidance for the reading content: an overall prompt, the vocabulary zones, and a prompt per field with its reasoning and style?

**Yes for the overall voice and the vocabulary zones. Partly for the per-field prompts: about a third of the live fields had a written generation prompt, the rest had budgets, registers and rulings but no assembled prompt.**

| What | Where it is documented | Verdict |
|---|---|---|
| The overall authoring prompt (voice identity, master register, assembly rule "master + surface register + branch register + gate") | REA_16 §1, §1b, §3 (THE VOICE v1.3), §4 (humanization gate) | Complete, but the four layers were never assembled into one pasteable block |
| Audience and reading level (grade 6–7 default; B1–B2 zone on the function page; high-school chips) | REA_16 §1b, §2c (THE VOCABULARY ZONE row); REA_03 §10 rule 6; BIZ_03 | Complete |
| Vocabulary law, canonical names, banned lists (AI cluster, courtroom tier, mystical register, BaZi labels, Chinese characters, hollow affirmations) | REA_02 §1, §2, §8; REA_04 PART 8 (§8.1 layer rules, §8.9 forbidden list, §8.10 anchors); REA_16 §1b | Complete |
| Per-stem and per-persona imagery fields (cost dimension, arena, rhythm) | REA_16 §2b, §2b-G | Complete |
| Per-field register and budget, machine-enforced | REA_16 §2c (48 registry rows parsed by `voice-audit.mjs`) | Complete |
| **Per-field generation prompts with reasoning and style** | Written prompts exist for: manifesto, inscription, stem keywords (retired), gifts/shadows (REA_16 §7, the full derivation prompt), portrait prose, ledger prose, almanac (all REA_16 §3); the fn_reading ledger and adj_chips (REA_16 §2c rows: THE THREE DOORS, THE KEYWORD DERIVATION CHAIN); the POSITION teaser (REA_04 §9.4) and reading ladder (§9.5). Rulings but no prompt for: `dm_overview` formula (REA_03 §3 cell), `yourNature_desc` v2 bridge (REA_03 §3 cell), `self_card`, `ELEMENT_PAIR.mechanism.base` and turns (REA_16 §2c note + template construct), `function.definition_*` / `advise_*` (REA_16 §2c note), `cta_verdict`, `carry.*` poles (REA_02 §5h), `k2_overview`, `k2_functional`, `k2_domain_readings`, `POSITION.defline / domain_readings / life_chapter / relations / turns / shadow_line / health_line`, `TG_PATTERN.line / reading / fused_line`. | **Gap: closed by REA_17 §3**, one card per field (surface, register, person, budget, construct, reasoning chain, style, checks, exemplar, sources), reverse-engineered from the rulings and the shipping corpus. |
| The inputs a generator needs per axis (so structure stays fixed) | Implicit in REA_03/REA_05 (station files) and the engine schema | **Gap: closed by REA_17 §2**, the input pack per axis |
| A like-for-like comparison protocol | The 2026-09-17 evaluation pack's acceptance protocol (LANGUAGE_USE_RECOMMENDATIONS) | REA_17 §4 restates it against this pack |

## What REA_17 is and is not

- It is a compilation. Every rule in it cites the ruling it comes from; it introduces no new field, count, door, persona or budget. Where it and a source document disagree, the source wins and REA_17 is corrected.
- It is a draft for the owner's review, registered in `Operations/README.md` as REA_17 under the append-only numbering law.
- It does not refresh the "TBD" construct markers in REA_01 and the station headers. That is a separate housekeeping edit, listed above.

## Field coverage in REA_17 §3

| Axis | Fields with a card | Non-targets noted |
|---|---|---|
| STEM | manifesto · inscription · dm_overview · yourNature_desc (baseline) · gifts and shadows (the pool derivation prompt) · dm_claims and dm_mechanism (PLANNED) | archetype_name · pinyin_display · door_note |
| STEM_BAND | yourNature_desc ×3 bands · self_card (face, presence) | |
| ELEMENT_PAIR | mechanism.classic (sourced quote) · mechanism.base · catalyst_turn / friction_turn · mechanism_yin · definition_catalyst / definition_friction · advise_catalyst / advise_friction · cta_verdict · carry (8 poles) · carry_yin | |
| ELEMENT_GOD | k2_overview · k2_functional · adj_chips · fn_reading (three doors) · k2_domain_readings | structural_interaction (seed) · k2_card (unauthored stub) |
| GOD | definition_line (locked) · face_kw and face_teaser (unrendered) | persona_name · domains · keyword · charge · poles · family glue · god-grain adjective fallback |
| POSITION | defline · teaser · reading · domain_readings · life_chapter · relations · turn_catalyst / turn_friction · shadow_line · health_line | term · term_zh · gate · slot_kind · domains |
| TG_PATTERN | line · reading · fused_line | name_zh · name_en · trigger_gods · target_domains |
| CONDITION · FAMILY · ELEMENT · TEMPLATED | none (fixed by law) | all |
| Code-resident | daily narratives and DO/AVOID (almanac) · consultant charter | |
