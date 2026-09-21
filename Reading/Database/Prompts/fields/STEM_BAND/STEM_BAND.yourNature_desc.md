# STEM_BAND.yourNature_desc

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `STEM_BAND.yourNature_desc` |
| **Axis** | STEM_BAND |
| **Header** | Day Master page P4, second paragraph (THE PERSON), one per band · portrait · second person, opens on "You" · 50–75 words · LOCKED ×30 |
| **Harness field key** | STEM_BAND.yourNature_desc+self_card |
| **Status** | LOCKED ×30 |

## The card

- Construct: the v2 BRIDGE. Sentence 1 is the baton pass: it receives the `dm_overview` myth's central image onto the reader ("You are what the sword is like when it wakes up as a person"). Then the band portrait: what that material is like running Overfueled, Balanced or Underfueled. Then the landing on the person.
- Reasoning chain: the sign's image → the band as a physical state of that material (the edge never sheathed · sheathed and drawn when it matters · kept under cloth) → what the reader does and pays under that state → land on them.
- Style: the decoding outweighs the myth; the band is a present state, never a decline from an earlier self and never a promise about output; the three variants of one stem must read as three states of one material, not three people; contractions welcome; one ordinary sentence. Sentence 1 receives the sign's image in the stem's own words: the exemplar's "You are what the sword is like…" is the Blade's line, not a template (§0 rule 8).
- Checks: 50–75w, "You" opener, zero dashes, cross-stem 4-gram uniqueness (no four-word run borrowed from the exemplar or another stem's portrait), the variant shown is the band the engine resolved (one band for every surface).
- Exemplar (庚 Overfueled): "You are what the sword is like when it wakes up as a person. The cut is always ready and mostly used. You put the truth ahead of comfort, yours and everyone's, every day, in every setting. People bring you the questions nobody else will answer straight, then flinch at exactly what they asked for. The edge never rests. That includes the nights, and it includes you." · (庚 Underfueled): "You keep that edge, under cloth and out of view. Seeing through things is instant for you. Saying so out loud is the part that comes and goes…"
- Sources: REA_03 §3 (v2 bridge, owner 2026-08-14); REA_16 §2c; the D7 ruling (2026-09-20: no assumed history, no flawless-output claim).

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
