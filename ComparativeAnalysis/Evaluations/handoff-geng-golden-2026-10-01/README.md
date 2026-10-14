# Round · 庚 The Blade · golden chart · prompt v0.7 (tension-naming) · 2026-10-01

The first round written to REA_17 v0.7: the pivot to tension-naming (the study `ComparativeAnalysis/Reference/competitor-voice/2026-09-30_public-excerpt-study.md`, the pivot item `Reading/Database/Prompts/backlog/2026-09-30_pivot-to-tension-naming.md`, the v0.7 item `2026-10-01_prompt-v07-tension-naming.md`, all fifteen rulings by the owner on 2026-09-30).

| Pass | Writer | Package | Station | Gate | Read |
|---|---|---|---|---|---|
| blind, v0.7 | fable-v07 (a fresh session whose only input was the sealed package, benchmark folder unopened) | `ComparativeAnalysis/Handoffs/2026-10-01-geng-golden-v07/` | `Reading/Database/Rewrites/fable-v07/` (54 fields) and `fable-v07-b/` (the 12 second candidates on the pull-heavy fields) | 54 / 54 pass after one harness fix (the cure-set check counted the overgrown element the beat names by design; fixed in both gates) | `fable-v07.reading.md` (original then candidate per field), the owner reads first |

Gate notes (read flags, not blocking): the D9 tension-sentence note fires on most descriptive fields (the joiner form is a floor the read decides on); two words outside the reader zone (plentiful, demotion).

The owner's blind deck: `owner-read/deck.json` (54 questions, seed 20261001, original vs fable-v07 shuffled A/B, a third option C where a second candidate exists: 12 questions), `owner-read/key.json` sealed, `owner-read/picks.json` empty. The owner's read decides; the station is untouched.

## The pause at Q45, the complaint, and the polished pass (2026-10-14)

The owner answered Q01 to Q45 of the first deck (`owner-read/picks.json`, 45 of 54; the key sealed in `owner-read/key.json`) and paused with a complaint: reading the candidates beside the originals, there was no obvious change in tone, language or perspective toward The Pattern's. The construct's shape had changed; the voice had not. The 45 picks and their notes stand as calibration data and are not touched; Q46 to Q54 stay unanswered on that deck.

| Pass | Writer | Package | Station | Gate | Read |
|---|---|---|---|---|---|
| gap analysis | the benchmark editor | the study §1.1 to §1.5, the owner's transcriptions, the v0.7 candidates beside the originals, the 45 picks and their notes, the v0.7 prompt and cards, the pivot and keep rulings | `polish-gap-analysis.md`: the before and after numbers, the four lenses and structure (what The Pattern does, what v0.7 did with counts and quotes, what stayed stagnant and the prompt or card line that caused it, the rule applied), the Nebula fence, 16 polish rules for v0.7.1 | | |
| polish, v0.7p | the benchmark editor, from the owner's picks (the pile the key names, the split at Q12, fresh at Q34) and the editor's own read on Q46 to Q54, every owner note applied | `ComparativeAnalysis/Prompts/out/handoff/2026-10-01-geng-golden-v07/fable-v07p/` (the six v0.7 skeletons with every value and value_b replaced, `_generated_by` fable-v07p, a new one-clause `_trace` per field naming the change and the lens) | `Reading/Database/Rewrites/fable-v07p/` (54 fields) and `fable-v07p-b/` (the 12 second candidates) | `validate-template.mjs` 54 / 54 pass; the D9 tension note, treated as a requirement on this pass, fires on none of the 44 descriptive units (26 on v0.7, 32 on the original); one zone note left ("scarce") | `fable-v07p.reading.md` (original then polished per field), the owner reads the new deck |

Gate note on the render: `fable-v07p.reading.md` prints "Gate: FAIL: reuses the current line" on every page because `render-template.mjs --against` turns on the blind pass's reuse check (no four-word run of the withheld line), and this pass starts from the owner's picked originals by instruction, so the "reuse" is the design. The gate of record for the pass is `validate-template.mjs` without `--against`: 54 / 54.

The owner's second deck: `owner-read-polished/deck.json` (54 questions, seed 20261014, original vs fable-v07p shuffled A/B, a third option where a second candidate exists: 12 questions), `owner-read-polished/key.json` sealed, `owner-read-polished/picks.json` empty. Built by a scratch copy of `ComparativeAnalysis/Prompts/deck.mjs` with CAND, OUT and SEED changed (the script's paths are still hard-coded; the generalisation into arguments is still owed). The first deck and its 45 picks are untouched.

Three places where the picks and the rules meet, for the owner's ruling (the detail is in the gap analysis): the carry picks at Q13 and Q30 cannot stand beside the turn picks at Q12 and Q29 under the cut law, so the polished carries follow the picked turns; the nature desc keeps its reception sentence ("You are what the sword is like when it wakes up as a person") because the card mandates it and the owner picked it, the one arena word left in a descriptive field; the Twin's drive passage has no mechanism sentence, as the owner asked at Q32.
