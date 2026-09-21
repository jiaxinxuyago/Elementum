# Prompt replication test: can another model reproduce the format and structure from REA_17 and the station?

Date: 2026-09-21. Pack under test: REA_17 v0.1 (head `9feeb85a`). Harness: `harness/assemble.mjs` (builds a blind prompt per field from the master prompt, the input pack and the field card, with the target field's existing text redacted), `harness/validate.mjs` (shape and mechanical gate), `harness/out/` (the six prompts, the model outputs, the originals).

## Method

Six fields across the axes were assembled into blind prompts of 3,300 to 4,300 words each (REA_17 §1 master prompt + §2 input pack + the §3 card + the cell's facts pulled from the station JSON + the task line). The models saw no station text for the target field and no other file. Two models generated: **Claude Sonnet** on all six, **Claude Haiku** on two as a smaller-model control. Every output was run through the shape checks (keys, counts, doors, faces, echo_of resolution against the station, budgets) and the mechanical voice gate (signs, banned words, hedges, the rationed word, Chinese characters, BaZi labels, openers). Then each output was read beside the original for the reasoning questions the pack cannot check mechanically (right mechanism, right angle, scene craft, no biography).

The owner's question has two parts: can another model replicate **the same format and structure**, and does the pack carry enough that only **the writing style** differs. The first is a measurement here; the second is a judgment, recorded per field.

| Test | Field | Cell | Model | Shape | Gate | Read |
|---|---|---|---|---|---|---|
| T1 | STEM.gifts + shadows (full 7 + 7 pool) | 丙 The Sun | Sonnet | {T1_SONNET_SHAPE} | {T1_SONNET_GATE} | {T1_SONNET_READ} |
| T1 | same | same | Haiku | **failed**: returned a prose summary instead of the JSON, twice; reported 6 gifts because the self pair's `carry.wide` came through as `undefined` | not run | not run |
| T2 | ELEMENT_PAIR friction turn + carry friction / thin / excess | 木_水 | Sonnet | exact: turn opens "Run heavy,"; carry.friction cut from the turn's first clause and its directive; all three poles `{clause, remedy}` | clean (≤35w / ≤18w / ≤12w) | right mechanism (水多木漂 rendered as "too much water lifts the roots free… drifting"); the friction image (rain, root, mud) sits in the pair's chemistry; the directive is the definition's own ("close the book") rather than a new one, which is lawful |
| T3 | ELEMENT_GOD fn_reading row, three doors | 水_食神 · Fluent | Sonnet | exact: `{word, doors:{trait, scene, outside}}`, 52–54w per door | clean | trait door opens on the trait, scene door has a clock time ("Ten forty at night") and a small object, outside door opens from other people; the cost lands at the close; passes the sibling test (nothing reads as 伤官) |
| T3 | same | same | Haiku | exact shape | one finding: scene door 56w on a 55w budget | doors correct in kind; the trait door is flatter and the outside door restates the trait; usable after one trim |
| T4 | POSITION reading + teaser + domain_readings | 正财 inside the Day Gate | Sonnet | exact: declaration sentence first, 80–115w, one-line teaser with one tendency beat, one paragraph per declared domain (Love, Family) | clean | follows the §9.5 ladder (domains → hidden face → era → relations → counsel) in order; the Steward's granary arena carried into the Day Gate; no dated claim, no spouse asserted as fact |
| T5 | STEM_BAND yourNature_desc + self_card | 癸 Underfueled | Sonnet | exact: 62w, opens "You are what the rain is like when it wakes up as a person", face 6w, presence 22w | clean | **angle drift**: the portrait reads the Underfueled band as giving oneself away ("feeds roots that were never quite your own… What you keep for yourself… That's not much"), which is the unwitnessed-martyr angle REA_16 reserves for 丙, 己 and 庚. 癸's own cost is porousness. Format perfect, reasoning wrong |
| T6 | ELEMENT_GOD k2_domain_readings | 土_正财 | Sonnet | exact: keys equal the persona's three domains, 46–55w each | clean | the Steward's counting carried in Earth's arena; Wealth carries no solvency promise and no holdings list; Steady love names the cost (patience read as coldness) |

{T1_SONNET_DETAIL}

## What the test says about the pack

**Format and structure: yes, for a capable model.** Every Sonnet output matched the station's shape exactly on the first attempt: the right keys, counts, doors, faces, resolvable `echo_of` paths, budgets, openers and door rotation. The mechanical gate found nothing in five of five Sonnet runs. The originals and the candidates are interchangeable as data; the app would render either.

**Style only differs: mostly, with two reasoning holes the pack did not close on its own.**

1. **Angle drift on a band portrait (T5).** The Angle Map row was in the prompt and the model still wrote 癸 from 丙's cost dimension. The pack stated the arena but not the neighbouring angle to refuse, and never said that a band is a supply state rather than a portrait of giving. Both are now in REA_17 v0.2 (§1 "two drifts to refuse", §2.2 the per-stem "angle not to borrow" line).
2. **A missing input was left blank (T1 Haiku).** The self pair has no `carry.wide`; the pack's card said where the Body wide gift comes from, but the input pack printed `undefined`, and the smaller model dropped the item. REA_17 v0.2 adds the stated-missing-inputs rule (§0.7) and the self-pair line to the pools card; the harness now prints the fallback in words.

**Format compliance is model-dependent.** The smaller model returned a summary instead of the JSON value twice in a row on the largest task and overshot one budget by a word. REA_17 v0.2 adds the output contract (§0.6): the shape in the task line, "JSON only" repeated as the last line, structured-output mode where the API has it, and an optional `_trace` key for the mechanism statement so the acceptance protocol can read the model's reasoning.

**Two more things the pack needed and now has.** The classical excess idioms per door (the five 渊海子平 sets) and the eight wide openers were named but not listed; a generator writing `carry.excess` or `carry.wide` had to be handed them ad hoc in the facts. Both are in §2.3 now, with the full ten-line classical portrait table in §2.4.

## Level of the prompt, as it stands

| Dimension | v0.1 (tested) | v0.2 (after the fixes) |
|---|---|---|
| Structure reproduction (keys, counts, doors, faces, budgets) | complete for a capable model; one silent gap (self-pair wide) | complete; gap stated in words |
| Vocabulary and syntax law | complete; zero gate findings on five Sonnet runs | unchanged |
| Reasoning inputs (mechanism, chemistry, portraits, idioms) | mostly present; idioms and portraits partly implicit | listed in full |
| Angle fidelity per stem and persona | rows present; one drift observed | drifts named; per-stem "not this angle" line |
| Output contract for smaller models | one instruction at the top; failed on the largest task | shape in the task line, JSON-only repeated, structured output, `_trace` |
| Evaluation support | acceptance protocol referenced | `_trace` gives the read a mechanism statement to check |

Verdict: **the pack is sufficient for a like-for-like style comparison on a capable model today, and v0.2 closes the two reasoning holes the test exposed.** The mechanical gate is the floor and it holds. The read (meaning, reasoning, scope) is where models will separate, and the 癸 result shows why the read cannot be skipped: a line can pass every check and still carry the wrong nature's cost.

## What the harness does not yet check

- The repetition law across a cell (a generated turn against the same cell's definition and advice). The voice audit does this on landed station files; the harness should run the same four-gram check on candidates before the read.
- The sibling test for ELEMENT_GOD (the prompt supplies the sibling's text; the check is a read, not a rule).
- Reader-level tests (grade 6–7, B1–B2) beyond the banned lists.

## Recommended next step for the dedicated comparison session

Run REA_17 v0.2 through the same six fields plus the three fields most exposed to style (`ELEMENT_PAIR.function.advise_*`, `ELEMENT_PAIR.mechanism.base`, `STEM.dm_overview`), on the golden chart and the two contrast charts, across the models the owner wants compared, with the harness gate first and a blind read second, and the shipping original always in the line-up.
