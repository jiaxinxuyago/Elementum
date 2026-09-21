# STEM.dm_overview

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `STEM.dm_overview` |
| **Axis** | STEM |
| **Header** | Day Master page P4, first paragraph (THE SIGN) · ledger · third person, opens on the archetype name · 55–85 words · LOCKED ×10 |
| **Harness field key** | STEM.dm_overview |
| **Status** | LOCKED ×10 |

## The card

- Construct: the myth decoder. Name → the term (yin or yang element, the material) → its place in the cycle and season → its image as a figure. Formula fixed, cadence poet-narrator.
- Reasoning chain: the classical material and season of the stem → what the material is for → one figure the reader can picture → close on the figure, not the reader.
- Style: the sign is the only actor. No second person, no user psychology (that is `yourNature_desc`'s job), no schoolbook connectors, no unnamed narrators ("the ancients", "the old stories" only as texture when the line stays in the material world). Plain vocabulary.
- Checks: 55–85w, opens with the name, zero dashes, no "you".
- Exemplar: "The Blade is Yang Metal, the metal that has already been through fire. It arrives with autumn, the season that ends what summer started, and it does the harvest's honest arithmetic, deciding what was worth growing. Kept plain and kept sharp, it is drawn once, only for the true thing. Between wars it hangs on the wall and says nothing, which is its own kind of speech."
- Sources: REA_03 §3 (SIGN/PERSON division, owner 2026-08-14); REA_16 §3 (ledger prose), §2c.

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
