# ELEMENT_GOD.fn_reading

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `ELEMENT_GOD.fn_reading` |
| **Axis** | ELEMENT_GOD |
| **Header** | (the three-door ledger) · energy page, between the definition and the advice; the rows are picked by face weight and the doors by position rotation · ledger · second person · 35–55 words per door passage · LOCKED ×50 (792 passages) |
| **Harness field key** | ELEMENT_GOD.fn_reading.row |
| **Status** | LOCKED ×50 (792 passages) |

## The card

- Construct: per pole, three rows index-aligned to `adj_chips`, each `{word, doors:{trait, scene, outside}}`. Trait opens on the trait claim ("Taking things in whole is how your mind works"). Scene opens inside a real-life example with objects and clock time ("One book, read twice, with notes in the margins the second time through"). Outside opens from how others see it and what it costs or pays ("People mistake your pace for being behind, right up until…"). Every beat is a full sentence with verbs; the example is USED, not displayed (the sentence itself says what the example proves).
- Reasoning chain: the chip → what it IS for the person (a feature, a tendency, a habit, named as such) → one scene with objects and a clock time → the turn to the cost or the payoff → write the same content three times from the three doors so any row works at any blend position.
- Style: B1–B2 zone; fragments ≤1 per passage; aphorisms ≤1–2 per assembled reading; endings vary; a scene is a representative situation, never a claimed memory, never another person's private thoughts, never a confirmed prediction, never a safety-critical procedure as proof of character.
- Checks: 35–55w per door, zero dashes, the sibling test, no banned register.
- Exemplar (土_偏印 · Overprepared · scene): "Seventeen browser tabs, two saved courses, a notebook full of plans. The project they all point at has not moved in a month, but the researching of it has never gone better. One more book, you tell yourself, and the telling sounds exactly like last time."
- Sources: REA_16 §2c (THE THREE DOORS 2026-09-03, corpus 2026-09-04); the B7 and B8 rulings 2026-09-20.

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
