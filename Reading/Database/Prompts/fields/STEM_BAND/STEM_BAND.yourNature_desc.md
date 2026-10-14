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

- Construct: the v2 BRIDGE. Sentence 1 is the baton pass: it receives the `dm_overview` myth's central image onto the reader ("You are what the sword is like when it wakes up as a person"). Then the band portrait: what that material is like running Overfueled, Balanced or Underfueled. Then the landing on the person: the cost as the last sentence, and no tag line after it (owner 2026-10-14, Q03: "That includes the nights, and it includes you." is the extra line).
- Reasoning chain: the sign's image → the band as a physical state of that material (the edge never sheathed · sheathed and drawn when it matters · kept under cloth) → what the reader does and pays under that state → land on them.
- Style: the decoding outweighs the myth; the band is a present state, never a decline from an earlier self and never a promise about output; the three variants of one stem must read as three states of one material, not three people; contractions welcome; one ordinary sentence. Sentence 1 receives the sign's image in the stem's own words ("You are what the sword is like…" is the Blade's line, not a template, §0 rule 8). After sentence 1 the portrait is a descriptive field under v0.7.1 (owner 2026-10-14): the reader its subject, no arena word (the gate exempts the reception sentence; whether that sentence stays the P4 mythic bridge or is re-cut plain is the owner's open ruling, the gap analysis's conflict 2), no turn word, the sentences progressing on causal joints, no sentence over two commas, the last sentence at least eight words with the reader as its subject and never a tag.
- Checks: 50–75w, "You" opener, zero dashes, cross-stem 4-gram uniqueness (no four-word run borrowed from another stem's portrait), the variant shown is the band the engine resolved (one band for every surface); the v0.7.1 gate (no arena word after sentence 1, no turn word, no sentence over two commas, the last sentence at least eight words with the reader as its subject: blocking; a third-person subject elsewhere a note; the reader zone enforced, A13).
- Exemplar: the two 庚 exemplars removed 2026-10-14 (rule 8 of the v0.7.1 item). The Overfueled portrait ("You are what the sword is like when it wakes up as a person. The cut is always ready and mostly used. You put the truth ahead of comfort, yours and everyone's, every day, in every setting. People bring you the questions nobody else will answer straight, then flinch at exactly what they asked for. The edge never rests. That includes the nights, and it includes you.") carried the arena past its reception sentence, a sentence with other people as its subject, and the tag close the owner cut at Q03; the Underfueled fragment ("You keep that edge, under cloth and out of view. …") carried the arena. No exemplar until the owner rules one under v0.7.1.
- Sources: REA_03 §3 (v2 bridge, owner 2026-08-14); REA_16 §2c; the D7 ruling (2026-09-20: no assumed history, no flawless-output claim).

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
| 2026-10-14 | v0.7.1: the cost is the last sentence and no tag line follows it (Q03); after the reception sentence the portrait is in the ledger's register (the reader the subject, no arena word, progression, two commas, the eight-word close); the two 庚 exemplars removed | owner 2026-10-14 at Q03 of the v0.7 read, the seven iterations and the polish rules (`backlog/2026-10-14_prompt-v071-iterations.md`; REA_16 §6) |
