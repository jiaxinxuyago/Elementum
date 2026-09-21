# ELEMENT_PAIR.mechanism.classic

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `ELEMENT_PAIR.mechanism.classic` |
| **Axis** | ELEMENT_PAIR |
| **Header** | energy page, epigraph above the base · classical · ≤14 characters · LOCKED |
| **Harness field key** | none: not a generation target |
| **Status** | LOCKED |

## The card

- Construct: the 汉字 classical line for this pair's chemistry, decorative texture per the lexicon law (the one surface where a classical quote is allowed in the app). Chosen from the sourced classics, never composed. Exemplar (金_土): 金居石依山，津潤而生. Not an LLM generation target: it is a sourced quotation.

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
