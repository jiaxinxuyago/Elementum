# TG_PATTERN.reading

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `TG_PATTERN.reading` |
| **Axis** | TG_PATTERN |
| **Header** | woven into the seat's first matching domain paragraph · therapist-psychic · second person · 45–70 words · LOCKED ×9 |
| **Harness field key** | TG_PATTERN.reading |
| **Status** | LOCKED ×9 |

## The card

- Construct: pure you-language analysis of the pattern's effect, no classics, no persona mechanics, structural cure, one health note where the classics carry one. Exemplar: "One catch runs underneath: your own analysis can starve your output. Projects polish in private until the moment passes, and the drawer of nearly finished things grows. The cure is structural, deadlines you did not set, collaborators who ship, one craft done with the hands. In heavy thinking seasons, watch sleep and appetite first."
- Style: it must read as a continuation of the domain paragraph it joins (opens "One catch runs underneath", never with the pattern's name).

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
