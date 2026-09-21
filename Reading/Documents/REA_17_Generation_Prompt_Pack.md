# REA_17 — The Generation Prompt Pack — the reading system's prompts, reverse-engineered from the shipping corpus

> **Born 2026-09-21 (owner-commissioned for the LLM A/B comparison).** REA_01 explains the compound system, REA_02 fixes the words, REA_03 lists the variables, REA_04 sources the reasoning, REA_05 stores and pipes, REA_06 orders the teaching, REA_16 sets the voice. **This doc is the overview and the systematic guidance for the prompt database at `Reading/Database/Prompts/` (one master prompt, one input pack, one card file per authored field, the rules register, the comparison protocol).** It defines nothing new. Every rule below is compiled from a ruling that already exists in REA_01 to REA_16 or in the station's template cells, with the source cited. Where this doc and a source doc disagree, the source doc wins and this doc is corrected.

**Status: DRAFT (v0.4). The prompt files are the working copies; this overview points at them.** Purpose: let several language models be tested on the same fields, with the same inputs, under the same laws, without changing the content structure or the archetype structure. The structure (axes, counts, fields, budgets, selection) is fixed input to every prompt here, never an output.

**Position in the library:** REA_01 system · REA_02 words · REA_03 variables · REA_04 knowledge · REA_05 storage/piping · REA_06 teaching order · REA_16 voice · **REA_17 prompts**.

---

## §0 · How a prompt is assembled

REA_16 §3 states the assembly rule: **prompt = the master register + the surface register + the archetype's branch register + the humanization gate.** This pack adds the two things a generator also needs, the field's own card and the field's inputs:

```
PROMPT(field, cell, chart state) =
    Prompts/00_MASTER_PROMPT.md                  (one block, identical for every field)
  + Prompts/01_INPUT_PACK.md, the axis pack      (the facts of this cell: from the station and the engine, never from memory)
  + Prompts/fields/<AXIS>/<field>.md             (the field card: surface · register · person · budget · construct · reasoning chain · checks · exemplar)
  + the task line the harness writes for the cell (ComparativeAnalysis/Prompts/assemble.mjs)
```

**Where the prompts live (owner 2026-09-21: prompts are data, iterated like code, not documentation).** Every prompt is a file under `Reading/Database/Prompts/`, one per field, edited there and read from there by the harness. This document is the overview and the systematic guidance: the rules of the game (§0), the map of the prompt files (§1 to §3) and the comparison protocol pointer (§4). It no longer carries the prompt text.

Rules of the game for any test run:

1. **Structure is input.** The generator receives the axis, the cell key, the field name, the budget and the selection state. It returns the field's value only. It never proposes a new field, a new chip count, a new door, a new persona, a new domain.
2. **Inputs come from the station and the engine.** Stem material, pair chemistry, god portrait, position gate, chart percentages and bands are handed over as facts (§2). A generator that fills a gap from its own BaZi knowledge has left the test.
3. **Output shape is the station's shape.** A pool item is `{phrase, dim, door, face, echo_of, desc}`; a ledger row is `{word, doors:{trait, scene, outside}}`; a carry pole is `{clause, remedy}`. Return the JSON value the field holds, nothing around it.
4. **The mechanical gate runs first, the read second.** Every candidate passes the audit list at the end of §1 before anyone reads it for quality. A line that fails the gate is not compared.
5. **The original is a candidate.** The shipping text competes on equal terms. Nothing is called better until it wins the read (REA_16 §3 litmus, and the acceptance protocol in the 2026-09-17 evaluation pack).
6. **The output contract (added v0.2 after the replication test).** State the exact JSON shape in the task line AND repeat "return the JSON value only, no commentary, no code fence" as the last line of the prompt; smaller models returned a prose summary instead of the value when the instruction stood once at the top. Where the API offers a JSON or structured-output mode, use it. A generator may add one optional key, `_trace`, holding its one-clause mechanism statement per item (the acceptance protocol's source claim); the pipeline strips it before the station.
7. **Missing inputs are stated, never left blank.** When a cell has no value for a field the card names (the five self pairs have no `carry.wide`), the input pack says so in words and names the fallback the card gives. A bare `undefined` cost one run a whole gift (six returned instead of seven).
8. **Exemplars are corpus, not scaffolds (added v0.3 after the harness re-gate of the replication outputs).** A card's exemplar shows one cell's line, and its wording belongs to that cell. The swap-gram fields (`inscription`, `yourNature_desc`, the band portraits, `self_card`) are unique across stems at the four-word run (REA_16 §2c `swap-gram`), so "You are what the sword is like when it wakes up as a person" is the Blade's own baton pass and not the formula (29 of the 30 band portraits open differently); a generator that reuses an exemplar's four-word run in another stem's field fails the gate. When the cell under test is the exemplar's own cell, the harness withholds the exemplar from the card so the test stays blind.

---

## §1 · THE MASTER PROMPT → `Reading/Database/Prompts/00_MASTER_PROMPT.md`

One block, pasted verbatim at the top of every generation prompt. Sections: who is speaking · who is reading · what you are given and may not invent · the vocabulary law · the syntax law · person by surface · the Angle Map (ten natures, ten personas, the protected spine, the two drifts to refuse) · the repetition law and the derivation law · the phrase law v6 · the audit list. Compiled from REA_16 §1, §1b, §2b, §2b-G, §3, §4; REA_02 §1, §2, §8; REA_04 PART 8. Every register rule it states is listed as a numbered rule, with its source and its gate enforcement, in `Reading/Database/Prompts/02_RULES_REGISTER.md`.

## §2 · THE INPUT PACK → `Reading/Database/Prompts/01_INPUT_PACK.md`

What is handed over per axis, all from the station or the engine, never from memory: 2.1 chart state (one calculation model: `Elementum_App/src/engine/calculator.js` → `buildEnergyChart` → the journey model, read back in full by `ComparativeAnalysis/Prompts/chart.mjs`) · 2.2 STEM · 2.3 ELEMENT_PAIR (with the five 渊海子平 excess sets and the eight wide openers) · 2.4 GOD (with the ten classical portraits) · 2.5 ELEMENT_GOD · 2.6 POSITION · 2.7 TG_PATTERN · 2.8 STEM_BAND. The harness fills the pack from the station files with the target field redacted, and states a missing input in words (§0 rule 7).

## §3 · THE FIELD CARDS → `Reading/Database/Prompts/fields/<AXIS>/<field>.md`

One file per authored field, in the card format (`fields/_CARD_FORMAT.md`): surface · register · person · budget · status → construct → the reasoning chain → style rules that belong to this field only → checks the audit runs → an exemplar from the shipping corpus → sources. Each file carries its own iteration log. The harness field key column says how `assemble.mjs` addresses the card (`node assemble.mjs --fields` lists them).

| Axis | Card files | Generation targets | Non-targets in the file set |
|---|---|---|---|
| STEM | manifesto · inscription · dm_overview · yourNature_desc · gifts (the pool derivation prompt, gifts and shadows) · dm_claims | 5 | dm_claims (PLANNED) |
| STEM_BAND | yourNature_desc · self_card | 2 | |
| ELEMENT_PAIR | mechanism.classic · mechanism.base · mechanism.catalyst_turn (both turns) · mechanism_yin · function.definition_catalyst (both poles) · function.advise_catalyst (both poles) · cta_verdict · carry (8 poles) · carry_yin | 8 | mechanism.classic (a sourced quotation) |
| ELEMENT_GOD | k2_overview · k2_functional · adj_chips · fn_reading (the three doors) · k2_domain_readings | 5 | |
| GOD | definition_line · face_kw · family_brief | 0 | all three (locked vocabulary, unrendered faces, functional glue) |
| POSITION | defline · teaser · reading · domain_readings · life_chapter · relations · turn_catalyst (both turns) · shadow_line (with health_line) | 8 | |
| TG_PATTERN | line · reading · fused_line | 3 | |
| CONDITION · FAMILY · ELEMENT · TEMPLATED | none (fixed by law; supplied as vocabulary) | 0 | all |

The station is the truth for every value; a card describes how the value is made and checked, never the value itself.

## §4 · Running a comparison → `Reading/Database/Prompts/03_COMPARISON_PROTOCOL.md`

Fix the fields, fix the cells and states (the golden chart first, then the two contrast charts), fix the inputs, gate first (shape · mechanical · within-cell four-gram · cross-stem four-gram · reader zone, `ComparativeAnalysis/Prompts/validate.mjs`), read second (the four questions and the three readers, blind, the shipping original lettered like any candidate), record per candidate, file the rewrites under `Reading/Database/Rewrites/<model>/`, report under `ComparativeAnalysis/Evaluations/`. Nothing lands in the station from a run without the owner's row-by-row ruling and the REA_05 §1 pipeline.

---

## Document Metadata

| | |
|---|---|
| **Document** | REA_17 — The Generation Prompt Pack (master prompt · input pack · field cards) |
| **Version** | 0.4 · 2026-09-21 (the pack becomes the overview: the prompt text moved to `Reading/Database/Prompts/` as one file per field, the harness reads from there, §1 to §4 are the map; owner's folder ruling of 2026-09-21) · 0.3 · 2026-09-21 (after the harness was generalised to every card, cell and state and the replication outputs were re-gated: §0 rule 8 exemplars are corpus not scaffolds, the self pairs' definition opener in §3.3, the four gate layers named in §4 step 4) · 0.2 · 2026-09-21 (after the blind replication test, ComparativeAnalysis/Evaluations/llm-ab-test-2026-09-21/01_PROMPT_REPLICATION_TEST.md: output contract, stated-missing-inputs rule, the self pair's wide face, the excess idiom sets, the eight wide openers, the ten classical portraits, the two angle drifts to refuse) · 0.1 · 2026-09-21 (reverse-engineered at head `28ea4882`) |
| **Status** | DRAFT. Defines nothing new: compiles REA_01–REA_06, REA_16 and the station template cells into prompts. On any disagreement the source doc wins and this doc is corrected. |
| **Companions** | REA_16 (voice canon and audit registry) · REA_03 (variables and budgets) · REA_02 (vocabulary) · REA_04 (sources, PART 8 translation protocol, PART 9 positioning) · REA_05 (station and pipeline) |
| **Audience** | Anyone generating or comparing reading content: owner, authors, external models under test |
