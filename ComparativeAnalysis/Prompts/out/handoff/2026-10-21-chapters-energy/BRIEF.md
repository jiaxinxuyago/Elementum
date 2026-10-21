# Life Chapters, energy first: the writers' brief

You write reading text for Elementum, an app that reads a person's birth chart. This batch is the **Life Chapters** page. It reads a life as four chapters, with ten-year decades running inside them and, for paid readers, each year.

The owner ruled this structure on 2026-10-21 (round 2, L1–L10 all A). **The energy is the subject.** Every chapter, decade and year opens on the energy it carries. What that energy does in each part of life follows from it. Character names and Chinese characters never appear.

## 1. What you get and what you hand back

- `approved.json`: units the owner already approved. They are your calibration. Do not edit them and do not copy their sentences.
- `worklist-<W>.json`: the units you write, as `{ key, kind }`.
- `gate.mjs`: the gate.
- **Hand back** `out-<W>.json` in this folder: `{ "units": [ { "key", "kind", "text" } ] }`, every key of your worklist and nothing else.
- **Run** `node gate.mjs approved.json out-<W>.json` until it prints PASS. Fix what it names. Never edit `gate.mjs`, `approved.json` or another writer's file.

## 2. The reader's words

**The five elements:** Wood, Fire, Earth, Metal, Water. Never write an element's name. Write `{el}` for the period's energy, `{g}` for the ground underneath it and `{e}` for the period's energy again in a ground line. The app fills them in, so one text serves every chart in the same state.

**Functions.** An energy plays one of five functions for the reader. A key names the function in lower case; in text, write it capitalised:
- **Body**, your own energy: strength, stamina, independence, equals and peers, competition, standing your ground.
- **Mind**, thinking and support: learning, study, reflection, help, shelter, mentors, rest, being looked after.
- **Expression**, your output and voice: making, speaking, talent, creativity, appetite, pleasure, showing what you can do.
- **Action**, reach and resources: money, effort, ventures, practical life, the things you can take hold of.
- **Order**, structure and pressure: rules, roles, duty, deadlines, authority, reputation, pressure from outside.

**Direction** (the key's `grow` or `release`):
- `grow`: the reader's chart needs or welcomes this energy. It lifts. Write the gift, plainly, and its price if it has one.
- `release`: the chart already has too much of it. It weighs. Write the cost first, then what carries the reader through. That second beat is required: hard news is allowed only with what carries the reader.
- **Body is special.** It is the reader's own element. Body grow means a chart that runs short of its own strength. Body release means a chart that already runs over with it.

**The four chapters.** Each is a gate of the chart with an age span:
- **Early Chapter**, birth to 15: the first home, the family you came from, older relatives, school. People: "someone in your first home", an older relative.
- **Rising Chapter**, 16 to 34: work, study, friends, making your name.
- **Home Chapter**, 35 to 47: home and a partner, the household. You may say "a partner".
- **Late Chapter**, 48 on: "the people after you" (children, younger relatives, someone you train) and what you have built. Never old age.

**Tenses** (the last part of a key):
- `lived`: past tense, a definite pattern tied to the chapter's ages. Never "will".
- `now`: present. A chapter now says since when: "Since your late teens" (Rising), "Since your mid-thirties" (Home), "Since your late forties" (Late).
- `coming`: present simple for the future, with a start: "From your mid-thirties" (Home), "From your late forties" (Late). Never "since your".

## 3. The units

**`chapter_energy`** · `ENERGY <fn> · chapter.<gate>.<grow|release>.<tense>`
- 30–60 words, 2–3 sentences.
- Opens "Your <Early|Rising|Home|Late> Chapter carries {el}, …", or "carried" when lived. Then name the function ("the energy of Action", "your own energy" for Body) and say how the chart meets it ("and your chart is hungry for it", "into a chart that already runs over with it").
- Then the chapter's life area in that light, with the ages.
- It reads as the era: the mood of those years and what you came out with. It never makes a specific domain claim. The Domains section does that, so no "you saved money as a teenager".

**`chapter_domain`** · `ENERGY <fn> · chapter_domain.<Domain>.<grow|release>`
- 14–34 words, 1 sentence.
- Says what a chapter carrying this energy favours in one domain, in the form "<opening>, this chapter favours X over Y, and you …".
- Openings: Career "In Career", Wealth "In Wealth", Love "In Love", Family "At home", Social "With friends", Health "In Health", Mind "In your thinking", Growth "In Growth".
- It must fit any chapter the reader is in now or is coming to (Rising, Home or Late). Present tense.
- Love lines must suit a partner. Health lines speak of energy, rest, sleep and appetite, never illness.

**`manual`** · `ENERGY <fn> · chapter_manual.<grow|release>`
- 14–36 words, 1–2 sentences, opening "This chapter …".
- The Energy Manual's line for the chapter the reader is in now: how this energy works for them. For grow, how they get the most from it. For release, what spends it or balances it.
- A statement, never an instruction, and never naming an element. A "Seek" chip beside it names the element.

**`decade_energy`** · `ENERGY <fn> · decade.<dir>.<early|lived|coming>.<a|b>`
- 14–38 words, 1–2 sentences.
- Lived and early open "These years brought {el}" (or "brought more {el}"). Coming opens "This decade brings {el}" (or "brings more {el}").
- `early` is a decade inside the Early Chapter, so its scene must fit a child of 6 to 15.
- `a` and `b` are two variants for when the same energy comes twice on one page. They must differ in scene, not just in words.

**`decade_now`** · `ENERGY <fn> · decade.<dir>.now`
- 30–60 words, 2–3 sentences, opening "This decade brings {el}".
- The current decade in full.

**`ground`** · `TEMPLATED tpl_chapters · ground.<relation>.lived`
- 12–26 words, 1 sentence. The past tense of Your Almanac's five ground lines. feeds is already approved; write the other four in the past tense, keeping the shape of the Almanac's present lines below:
  - feeds (approved): "Under it ran {g}, which fed the {e}, and you felt it hold all the way through."
  - drains: "Under it runs {g}, which draws the {e} off, and you feel it soften as it goes."
  - matches: "Under it runs more {g}, and you feel it at full strength."
  - presses: "Under it runs {g}, which the {e} holds down, and you put both to work."
  - resists: "Under it runs {g}, which pushes back against the {e}, and you feel the two pull apart."

**`favours`** · `ENERGY <fn> · favours.decade.<Domain>.<grow|release>`
- A pair "Lean|over": what a decade of this energy favours over what, in that domain, as two short noun phrases. Each side is 2–40 characters; the first is capitalised, the second is lower case.
- Example: `Keeping a role|starting a new one`. Concrete and everyday, never abstract.

**`year_energy`** · `ENERGY <fn> · year.<state>`
- 20–42 words, exactly 2 sentences, opening "{el} brings <Function> for a whole year, …". This is the Almanac's format. Calibration: "{el} brings Order for a whole year, the energy you need most. It presses on you from outside, and you end the year harder to bend."
- The states:
  - `need`: the chart's scarcest energy, and it welcomes it;
  - `grow`: an energy it holds and still needs;
  - `heavy`: too much already;
  - `core_under`: your own energy when you run short;
  - `core_over`: your own energy when you already run over.

**`land`** · `TEMPLATED tpl_almanac · land.year.<kind>.<gate>`
- 12–30 words, 1 sentence, saying "this year". What happens when the year strikes a gate.
- Gates: year = your first home or older relatives; month = work; day = home and a partner; hour = the people after you.
- Kinds: bind (draws closer, a tie), clash (a sharp change, something moves), punish (scrutiny, friction that grinds), harm (something sours quietly), frame (people and momentum gather), repeat (going over old ground).
- Never name the bond.

## 4. The voice laws (the gate checks most of them)

- **Plain:** B1–B2 English, British spelling. Periods and commas only, at most two commas a sentence. No colon, dash or semicolon. No "ahead of", no ", so".
- **The reader last:** the reader is the subject of the last sentence ("…, and you …", or a sentence that starts with "You"), and that sentence is at least five words.
- **No hedges:** never may, might, perhaps, likely or probably. No digits, no money sums.
- **Nothing dark:** never illness, death, divorce, bankruptcy or accidents. No he, she, husband or wife.
- **Statements, never instructions:** no sentence opens with a verb telling the reader what to do. Advice reads as what a period favours.
- **No character names** (Twin, Rival, Artisan, Virtuoso, Horizon, Steward, General, Magistrate, Alchemist, Sage), and no Bazi, pillar, day master, luck, destiny or fate.
- **No repeats:** units of the same function share no five-word run, the fixed openings aside, and chapter lines share none with the Domains corpus.
- **Varied verbs:** vary your verbs and images across the worklist. A tic repeated across twenty units reads as a machine.
