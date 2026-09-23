# DISPATCH · Elementum reading, 庚 The Blade, chart golden · benchmarked pass

You are writing the reading text for one person's chart in Elementum, a BaZi reading app in English, from a system you have never seen. Everything you need is in the attached folder. Use only the attached files. Do not use any other source, memory or assumption about BaZi, and do not look anything up.

## Read, in this order

1. `prompts/04_READING_SYSTEM_PRIMER.md`: what the product is, who reads it, how a reading is built from a chart.
2. `prompts/00_MASTER_PROMPT.md`: the voice, the vocabulary law, what is fixed and what is yours, the check list.
3. `prompts/05_CLASSICAL_SOURCES.md`: the reasoning canon. Every claim you write traces to it through the chart.
4. `prompts/06_CAPS_BY_PAGE.md`: the word range of every field, both ends hard.
5. `prompts/02_RULES_REGISTER.md`: every rule, numbered, with its source (reference; the master prompt already states them).
6. `chart/golden.md`: the chart, every variable, from the engine. The numbers, roles, volumes and states are facts; you never change or re-derive them.
7. The cards in `cards/`: one per field type, each with the construct, the reasoning chain, the style, the checks and an exemplar from the shipping corpus.
8. Then the skeletons.

## The task

Fill the 6 skeleton files in `skeletons/` (54 fields in all):

- `skeletons/P4.geng.json`
- `skeletons/energy.金_土.json`
- `skeletons/energy.金_木.json`
- `skeletons/energy.金_金.json`
- `skeletons/energy.金_水.json`
- `skeletons/energy.金_火.json`

Each skeleton is one page of the reading: the Day Master page, then one energy page per energy. Each carries the page's facts (the cell's other fields, the chemistry, the chart's state for that energy; the current shipping text of every field under test is shown, labelled: it is the bar to beat, and you may not reuse a four-word run of it), and one entry per field with a `spec` (the card it follows, the word range, the person, the opener where one is required, the notes) and an empty `value`.

Work one page at a time, in the order listed. For each field: read its card once, reason from the facts and the canon (state the mechanism to yourself in one clause), write the value, then run the master prompt's check list on it, count the words, and fix anything before moving on. Where a field is cut from another (a carry line from its turn, a chip from its definition), write the source first.

## The output contract

- Return each skeleton as a file with the same name, every `value` filled, every other key byte-identical, and one line added at the very top of each file: `"_generated_by": "<your model name and version, exactly as your vendor names it>"`. Your work is filed as a station under `Reading/Database/Rewrites/<that name>/`, by axis and by variable, beside the current text and its gate result; a field is adopted into the final templates only by the owner's ruling, so the name must be right and the same in all six files. Strings stay strings; the objects (`{phrase, dim, desc}`, `{clause, remedy}`, `{word, text}`) keep exactly those keys.
- You may add `"_trace"` beside any `value`: one clause naming the mechanism you cut the line from. Nothing else may be added.
- No commentary outside the files. No code fences inside the JSON. No Chinese characters in any value. No em-dash, semicolon or arrow in any value.
- Word counts are gated before anyone reads your work: a value outside its range is thrown out unread, whatever its quality. Count.

## What is yours

Sentence shapes, figures of speech, storytelling, the scene you build, the expressions you reach for. Be as inventive as you like inside the fixed frame, as long as an intermediate English reader (CEFR B1–B2) understands the line on the first pass, the words stay in the zone, and each line would survive the three readers named in the primer. The current version is the bar; the goal is a reading the target reader would screenshot as themselves and a tradition-raised reader would not wince at.

## Where the truth lives (for reference only; not attached)

The four source books are in the repository at `Reading/Documents/REA_01_Archetype_System.md`, `REA_02_Concept_Dictionary.md`, `REA_04_Knowledge_Pool.md` and `REA_16_The_Voice.md`; the current reading content is the station at `Reading/Database/templates/by_axis/json/`. The attached prompts govern for this run.

Start with `prompts/04_READING_SYSTEM_PRIMER.md`.
