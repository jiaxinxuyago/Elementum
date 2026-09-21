# STEM.yourNature_desc

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `STEM.yourNature_desc` |
| **Axis** | STEM |
| **Header** | (baseline) · fallback when no band variant exists · portrait · second person, opens on "You" · 30–55 words · LOCKED ×10 |
| **Harness field key** | STEM.yourNature_desc |
| **Status** | LOCKED ×10 |

## The card

- Construct: the person, decoded from the sign: the trait as it is lived, the cost carried as plain fact.
- Reasoning chain: the sign's image → what a person made of that is like in a week of their life → the cost from the Angle Map dimension, at current-to-cost-plus-one intensity.
- Style: a letter from a perceptive old friend minus the casualness; staged in the stem's arena, never the generic social room; one ordinary sentence; contractions welcome.
- Checks: 30–55w, "You" opener, zero dashes, cross-stem 4-gram uniqueness.
- Exemplar: "You put the truth ahead of your own comfort, and usually ahead of your own company. People keep the clarity you hand them and stay careful around the edge it came from. The cost never comes up. You've never once shown anyone the bill."
- Sources: REA_16 §3 (portrait prose), §2c.

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
