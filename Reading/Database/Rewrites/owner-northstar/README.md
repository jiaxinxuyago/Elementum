# owner-northstar · the owner's synthesis of the 2026-09-23 golden-chart round

**What this is.** Not a model. The 54 fields of the golden chart (1995-04-29 18:00 Beijing, 庚 The Blade, Overfueled), the Day Master page and the five energy pages, each set to the version the owner picked in the blind read of 2026-09-29 (`ComparativeAnalysis/Evaluations/handoff-geng-golden-2026-09-23/owner-read/`) among three piles: the shipping original, Codex blind, Codex benchmarked. It is the north star for the prompt pack: the reading the owner would ship, from which the prompt is back-engineered.

**Where it came from, per pile:** blind 17 · original 25 · benchmarked 8 · split 3 · original (no pick) 1.

**How it was built.** `synth.mjs` (session scratch, logic recorded here) took the blind pass's filled skeletons as the shape, replaced every value with the picked pile's value (the original read from the template station, the two Codex piles from their filled skeletons), verified every deck option against its source text, and wrote the skeletons to `ComparativeAnalysis/Prompts/out/handoff/2026-09-29-geng-golden-northstar/owner-northstar/` with a `_trace` per field naming the question, the pile and the owner's note; `file-rewrites.mjs` then filed them here through the template gate. `reading.md` is the rendered reading. `provenance.json` beside the skeletons holds every pick with its value.

**Flags for the owner's ruling (nothing here was resolved on the owner's behalf):**

1. **Water carry.catalyst fails the cut law.** Q38 picked the original turn ("this channel shows as pressure without release") and Q39 picked benchmarked's clause ("Water gathers on the blade but hardly leaves its edge") with the original's remedy. The carry card is cut from the turn, so the two picks cannot both stand. Options: re-cut the turn to open on the picked clause, or take the original clause on the carry.
2. **Fire catalyst_turn and carry.catalyst, the split reading.** Q47 "B the first sentence, C the second sentence" was read as blind's first sentence ("the forge lacks the heat to reshape the steel") followed by the original's remaining two ("Your chart asks for heat. Take the demanding role, the audit, the arena."), so that Q48's carry (blind clause, original remedy) is its exact cut. Confirm or correct.
3. **Water scene door (Q42) held as the original** with no pick; all three versions were rejected. It is a placeholder until backlog item 2 lands and the field is rewritten.
4. **Picks made with a reservation** (Q25, Q34, Q51, Q52): the best of three, not an endorsement. Each note is in the table and in the backlog (items 2, 3, 5).
5. **Q28, Q29, Q30 (Metal base, friction turn, carry)** came with the note that the "Run heavy," opener is too upfront (backlog item 4). The picked text still carries the opener.

**Rules.** Nothing here is truth. A field moves into `Reading/Database/templates/` only through `adopt.mjs owner-northstar <AXIS>/<cell> <field path>` and the REA_05 §1 pipeline. This station is not hand-edited; it is rebuilt from the picks.

## Provenance, one row per field

| Q | Field | From | Owner note |
|---|---|---|---|
| Q01 | Day Master page · manifesto | blind |  |
| Q02 | Day Master page · dm_overview | blind |  |
| Q03 | Day Master page · band.yourNature_desc · STEM_BAND.yourNature_desc | original |  |
| Q04 | Day Master page · band.self_card.face | original |  |
| Q05 | Day Master page · band.self_card.presence | blind |  |
| Q06 | Day Master page · gifts[6] (order door, ) | benchmarked |  |
| Q07 | Day Master page · gifts[5] (action door, ) | blind |  |
| Q08 | Day Master page · gifts[4] (expression door, ) | blind |  |
| Q09 | Day Master page · shadows[1] (body door, ) | original |  |
| Q10 | Day Master page · shadows[3] (mind door, ) | benchmarked |  |
| Q11 | Earth page (your Mind, friction) · mechanism.base | original |  |
| Q12 | Earth page (your Mind, friction) · mechanism.friction_turn | original |  |
| Q13 | Earth page (your Mind, friction) · carry.friction | original |  |
| Q14 | Earth page (your Mind, friction) · function.definition_friction | blind |  |
| Q15 | Earth page (your Mind, friction) · ledger[0] (trait door, The Alchemist (偏印)) | blind |  |
| Q16 | Earth page (your Mind, friction) · ledger[1] (scene door, The Alchemist (偏印)) | original |  |
| Q17 | Earth page (your Mind, friction) · ledger[2] (outside door, The Alchemist (偏印)) | benchmarked |  |
| Q18 | Earth page (your Mind, friction) · function.advise_friction | original |  |
| Q19 | Earth page (your Mind, friction) · cta_verdict | original |  |
| Q20 | Wood page (your Action, catalyst, abundant) · mechanism.base | benchmarked |  |
| Q21 | Wood page (your Action, catalyst, abundant) · carry.wide | original |  |
| Q22 | Wood page (your Action, catalyst, abundant) · function.definition_catalyst | original |  |
| Q23 | Wood page (your Action, catalyst, abundant) · ledger[0] (trait door, The Steward (正财)) | original |  |
| Q24 | Wood page (your Action, catalyst, abundant) · ledger[1] (scene door, The Steward (正财)) | original |  |
| Q25 | Wood page (your Action, catalyst, abundant) · ledger[2] (outside door, The Horizon (偏财)) | original | owner: A, but 'three ventures across two cities' exaggerates; rhetoric in proportion; examples from the persona's ruled domains, not work by default (backlogged) |
| Q26 | Wood page (your Action, catalyst, abundant) · function.advise_catalyst | blind |  |
| Q27 | Wood page (your Action, catalyst, abundant) · cta_verdict | blind |  |
| Q28 | Metal page (your Body, the core, friction) · mechanism.base | blind |  |
| Q29 | Metal page (your Body, the core, friction) · mechanism.friction_turn | blind |  |
| Q30 | Metal page (your Body, the core, friction) · carry.friction | blind | owner at Q30: the 'Run heavy,' opener is too upfront; plain prescriptive syntax wanted (backlogged) |
| Q31 | Metal page (your Body, the core, friction) · function.definition_friction | original |  |
| Q32 | Metal page (your Body, the core, friction) · ledger[0] (trait door, The Twin (比肩)) | blind |  |
| Q33 | Metal page (your Body, the core, friction) · ledger[1] (scene door, The Twin (比肩)) | benchmarked | owner: C, but no scene-door version would pass if it keeps the exact time and place detail (at nine in the morning etc.); see backlog item 2 |
| Q34 | Metal page (your Body, the core, friction) · ledger[2] (outside door, The Rival (劫财)) | original | owner: B, but the outside door has the same fault as the scene door: far-fetched detail ('by their second week, as onboarding' is filler); explain the trait first; all door versions expand the example instead of illustrating the trait (backlog item 2 widened to all three doors) |
| Q35 | Metal page (your Body, the core, friction) · function.advise_friction | blind |  |
| Q36 | Metal page (your Body, the core, friction) · cta_verdict | original |  |
| Q37 | Water page (your Expression, catalyst, thin) · mechanism.base | original |  |
| Q38 | Water page (your Expression, catalyst, thin) · mechanism.catalyst_turn | original |  |
| Q39 | Water page (your Expression, catalyst, thin) · carry.catalyst | split: clause benchmarked, remedy original | split pick: B's clause, C's remedy (writing, speaking, sharing work early lets the blade breathe) |
| Q40 | Water page (your Expression, catalyst, thin) · function.definition_catalyst | benchmarked |  |
| Q41 | Water page (your Expression, catalyst, thin) · ledger[0] (trait door, The Artisan (食神)) | original |  |
| Q42 | Water page (your Expression, catalyst, thin) · ledger[1] (scene door, The Artisan (食神)) | original (no pick: all three rejected; held as the original pending backlog item 2) | No scene passed: too specific on details, reader loses track of the conclusion (backlog item 2, all three doors) |
| Q43 | Water page (your Expression, catalyst, thin) · ledger[2] (outside door, The Virtuoso (伤官)) | benchmarked |  |
| Q44 | Water page (your Expression, catalyst, thin) · function.advise_catalyst | original |  |
| Q45 | Water page (your Expression, catalyst, thin) · cta_verdict | blind |  |
| Q46 | Fire page (your Order, catalyst, thin) · mechanism.base | original |  |
| Q47 | Fire page (your Order, catalyst, thin) · mechanism.catalyst_turn | split: first sentence blind, the rest original | split pick: B's first sentence (the forge lacks the heat to reshape the steel), C's second sentence (an edge that keeps its first shape and calls it character) |
| Q48 | Fire page (your Order, catalyst, thin) · carry.catalyst | split: clause blind, remedy original | split pick: B's clause (the forge lacks the heat to reshape the steel), A's remedy (take the demanding role, the audit, the arena) |
| Q49 | Fire page (your Order, catalyst, thin) · function.definition_catalyst | blind |  |
| Q50 | Fire page (your Order, catalyst, thin) · ledger[0] (trait door, The General (七杀)) | blind |  |
| Q51 | Fire page (your Order, catalyst, thin) · ledger[1] (scene door, The General (七杀)) | original | relative pick only: A is good relatively, but the scene fails again (too much narrating and descriptive detail); backlog item 2 |
| Q52 | Fire page (your Order, catalyst, thin) · ledger[2] (outside door, The General (七杀)) | benchmarked | with reservation: an outside door opening with how people react to you is not better than describing how the user reacts to a crisis themselves; the outside-door lens is not the best lens here (new backlog item 5) |
| Q53 | Fire page (your Order, catalyst, thin) · function.advise_catalyst | original |  |
| Q54 | Fire page (your Order, catalyst, thin) · cta_verdict | original |  |
