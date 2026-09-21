# POSITION.shadow_line

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `POSITION.shadow_line` |
| **Axis** | POSITION |
| **Header** | renders always · ≤30 words · the persona's dark face in that gate, one line ("Overloaded, insight sours into suspicion: reading motives where there is only weather."). **`POSITION.health_line`** · ≤30 words · wellness register, non-medical: the seat's body correspondence in gentle tendency language ("Thinking seasons tax the body here: appetite and sleep thin when the mind runs long. Anchor both with routine…"); never a symptom assigned as fact, never a diagnosis. |
| **Harness field key** | POSITION.shadow_line (health_line shares this file) |
| **Status** | see header |

## The card

- Sources for 3.6: REA_02 §5e; REA_04 PART 9; REA_16 §2c (POS-D corpus, owner 2026-08-19).

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
