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
- Style: a letter from a perceptive old friend minus the casualness; plain, the reader the subject of every sentence, no arena word (owner 2026-10-14, v0.7.1: the stem's material stays in the sign paragraph; "staged in the stem's arena" retired), never the generic social room; one ordinary sentence, the mechanism; the sentences progress on causal joints and never turn; the cost is the last sentence, at least eight words, and no tag line follows it (Q03); contractions welcome.
- Checks: 30–55w, "You" opener, zero dashes, cross-stem 4-gram uniqueness; the v0.7.1 gate (no arena word, no turn word, no sentence over two commas, the last sentence at least eight words with the reader as its subject: blocking; the reader zone enforced, A13).
- Exemplar: the 庚 exemplar ("You put the truth ahead of your own comfort, and usually ahead of your own company. People keep the clarity you hand them and stay careful around the edge it came from. The cost never comes up. You've never once shown anyone the bill.") was removed 2026-10-14 (rule 8 of the v0.7.1 item): an arena word, a sentence with other people as its subject, and a tag close. No exemplar until the owner rules one under v0.7.1.
- Sources: REA_16 §3 (portrait prose), §2c.

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
| 2026-10-14 | v0.7.1: the portrait in the ledger's register (the reader the subject, no arena word, progression, the eight-word close, no tag after the cost); the 庚 exemplar removed | owner 2026-10-14, the seven iterations and the polish rules (`backlog/2026-10-14_prompt-v071-iterations.md`; REA_16 §6) |
