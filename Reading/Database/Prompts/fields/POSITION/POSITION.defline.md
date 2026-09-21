# POSITION.defline

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `POSITION.defline` |
| **Axis** | POSITION |
| **Header** | the first surfacing of the named event · carved · third person about the persona, "your" allowed · ≤25 words · LOCKED ×70 |
| **Harness field key** | POSITION.defline |
| **Status** | LOCKED ×70 |

## The card

- Construct: the persona placed at or inside its gate and what it does there. Exemplar (偏印在月支): "The Alchemist holds your chart's strongest seat, the month branch, and does its thinking from the middle of your working life."
- Checks: ≤25w, zero dashes, the term form "{Persona} at|inside the {Gate}" (stem = at, branch = inside).

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
