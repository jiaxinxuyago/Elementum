# TG_PATTERN.line

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `TG_PATTERN.line` |
| **Axis** | TG_PATTERN |
| **Header** | Codex ore and the catalogue takeaway strip · therapist-psychic · second person · ≤40 words · LOCKED ×9 |
| **Harness field key** | TG_PATTERN.line |
| **Status** | LOCKED ×9 |

## The card

- Construct: the compact chemistry note: the two personas share the chart and what their contest does, then the cure in one clause. Exemplar (枭神夺食): "The Alchemist and the Artisan share your chart, and they compete: too much theory starves your ease. When output stalls, the cure is one finished thing made with your hands, and fewer perfect plans."

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
