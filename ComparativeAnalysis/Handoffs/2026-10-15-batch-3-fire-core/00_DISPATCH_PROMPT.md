# DISPATCH · Elementum reading, batch batch-3-fire-core, the Fire core · blind pass

You are writing the reading text for one batch of cells in Elementum, a BaZi reading app in English, from a system you have never seen. Everything you need is in the attached folder. Use only the attached files. Do not use any other source, memory or assumption about BaZi, and do not look anything up.

## Read, in this order

1. `prompts/04_READING_SYSTEM_PRIMER.md`: what the product is, who reads it, how a reading is built from a chart.
2. `prompts/00_MASTER_PROMPT.md`: the voice, the vocabulary law, what is fixed and what is yours, the check list.
3. `prompts/07_REFERENCE_BENCHMARKS.md`: the benchmarks (The Pattern, 16 Personalities), what to take from each and what this house does differently, the owner's principles in the owner's words. Read it before any descriptive field.
4. `prompts/05_CLASSICAL_SOURCES.md`: the reasoning canon. Every claim you write traces to it through the chart.
5. `prompts/06_CAPS_BY_PAGE.md`: the word range of every field, both ends hard.
6. `prompts/02_RULES_REGISTER.md`: every rule, numbered, with its source (reference; the master prompt already states them).
7. `chart/README.md`: there is no chart in this package; the cells are written for every chart with this core, and each skeleton's facts carry the band facts for its poles. You never write a number, a band or a state of a particular chart.
8. The cards in `cards/`: one per field type, each with the construct, the reasoning chain, the style, the checks and the owner-ruled exemplars.
9. Then the skeletons.

## The task

Fill the 25 skeleton files in `skeletons/` (253 fields in all):

- `skeletons/pair.火_土.json`
- `skeletons/pair.火_金.json`
- `skeletons/pair.火_水.json`
- `skeletons/pair.火_木.json`
- `skeletons/pair.火_火.json`
- `skeletons/ledger.火_比肩.catalyst.json`
- `skeletons/ledger.火_比肩.friction.json`
- `skeletons/ledger.火_劫财.catalyst.json`
- `skeletons/ledger.火_劫财.friction.json`
- `skeletons/ledger.土_食神.catalyst.json`
- `skeletons/ledger.土_食神.friction.json`
- `skeletons/ledger.土_伤官.catalyst.json`
- `skeletons/ledger.土_伤官.friction.json`
- `skeletons/ledger.金_偏财.catalyst.json`
- `skeletons/ledger.金_偏财.friction.json`
- `skeletons/ledger.金_正财.catalyst.json`
- `skeletons/ledger.金_正财.friction.json`
- `skeletons/ledger.水_七杀.catalyst.json`
- `skeletons/ledger.水_七杀.friction.json`
- `skeletons/ledger.水_正官.catalyst.json`
- `skeletons/ledger.水_正官.friction.json`
- `skeletons/ledger.木_偏印.catalyst.json`
- `skeletons/ledger.木_偏印.friction.json`
- `skeletons/ledger.木_正印.catalyst.json`
- `skeletons/ledger.木_正印.friction.json`

Each skeleton is one cell of the station: a pair cell (`pair.*`) with its base, both state turns, every carry line the cell renders, both definitions, both advices and the verdict, or a ledger cell at one pole (`ledger.*`) with its three rows and nine passages (three angles of one tension per row; one chip per row, copied byte-identical onto the row's three fields). Each carries the cell's facts (the station's other fields, the chemistry, the pair law, the band facts for each pole; the fields under test are redacted), and one entry per field with a `spec` (the card it follows, the word range, the person, the opener where one is required, the notes, and since v0.7.1 the `tone` of a ledger passage, compliment or reminder) and an empty `value`.

Work one skeleton at a time, in the order listed. For each field: read its card once, reason from the facts and the canon (state the mechanism to yourself in one clause), write the value, then run the master prompt's check list on it, count the words, and fix anything before moving on. Where a field is cut from another (a carry line from its turn, a chip from its definition), write the source first. Two laws the gate holds that a private checker tends to miss (batch 2, 2026-10-15): the four-word-run law counts every second candidate (value_b) against every other field of the file, so a run shared between a value and another row's value_b fails; and the chip word itself is checked against the reader zone, so a chip like "penny", "overthinks" or "reliant" fails even when its passages pass. The tension hinge must be one the gate recognises: two of the reader's acts or wants joined by or, while, rather than, instead of, ahead of, as much as, more than, better than, or whether ... or not, the reader the agent on both sides.

## The output contract

- Return each skeleton as a file with the same name, every `value` filled, every other key byte-identical, and one line added at the very top of each file: `"_generated_by": "<your model name and version, exactly as your vendor names it>"`. Your work is filed as a station under `Reading/Database/Rewrites/<that name>/`, by axis and by variable, beside the current text and its gate result; a field is adopted into the final templates only by the owner's ruling, so the name must be right and the same in all 25 files. Strings stay strings; the objects (`{phrase, dim, desc}`, `{clause, remedy}`, `{word, text}`) keep exactly those keys. Where a spec says `"candidates": 2` (the manifesto, the presence line, the verdict, a drive passage), return `"value_b"` beside `"value"`: a second, different candidate, not a variation of the first; both are gated, and a missing second candidate throws the field out.
- You may add `"_trace"` beside any `value`: one clause naming the mechanism you cut the line from. Nothing else may be added.
- No commentary outside the files. No code fences inside the JSON. No Chinese characters in any value. No em-dash, semicolon or arrow in any value.
- Word counts are gated before anyone reads your work: a value outside its range is thrown out unread, whatever its quality. Count.

## What is yours

Sentence shapes, figures of speech, the expressions you reach for, inside the v0.7.1 register (the reader the subject of every sentence, progression on causal joints, two or three sentences, the closing sentence as the line the reader keeps, tone by pole, no arena imagery in a descriptive field). Be as inventive as you like inside the fixed frame, as long as an intermediate English reader (CEFR B1–B2) understands the line on the first pass, the words stay in the zone, and each line would survive the three readers named in the primer. The goal is a reading the target reader would screenshot as themselves and a tradition-raised reader would not wince at.

## Where the truth lives (for reference only; not attached)

The four source books are in the repository at `Reading/Documents/REA_01_Archetype_System.md`, `REA_02_Concept_Dictionary.md`, `REA_04_Knowledge_Pool.md` and `REA_16_The_Voice.md`; the current reading content is the station at `Reading/Database/templates/by_axis/json/`. The attached prompts govern for this run.

Start with `prompts/04_READING_SYSTEM_PRIMER.md`.
