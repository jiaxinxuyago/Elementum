# ELEMENT_GOD.k2_domain_readings

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `ELEMENT_GOD.k2_domain_readings` |
| **Axis** | ELEMENT_GOD |
| **Header** | the Domains detail, one paragraph per ruled domain of the persona (Seeker layer) · portrait · second person · 18–55 words each · LOCKED ×50 |
| **Harness field key** | ELEMENT_GOD.k2_domain_readings |
| **Status** | LOCKED ×50 |

## The card

- Construct: one paragraph per domain word on the persona's `domains` list (the Alchemist: Learning, Intuition, Solitude; the Sage: Knowledge, Shelter, Nurture), the persona's business in that domain through this element, ending on one practical line.
- Reasoning chain: the domain word → what the persona does there → the element's texture → the cost or the care → one plain instruction or observation to end.
- Style: where a family or care history could be implied (the Nurture readings), the shape is conditional and symmetrical ("Where care came early, you draw on it without thinking. Where it was missing, you became the ground yourself."), never an invented origin; Wealth readings carry no solvency promise and no prescribed holdings.
- Checks: 18–55w each, zero dashes, keys equal the persona's domain words.
- Exemplar (土_偏印 · Solitude): "Time alone is this energy's rent, and it collects whether you schedule it or not. Taken on purpose, solitude turns into your best material. Taken by accident, it curdles into distance from the people who were waiting outside the study."
- Sources: REA_16 §2c; REA_02 §5e (domain taxonomy); Batch 3 landings 2026-09-20.

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
