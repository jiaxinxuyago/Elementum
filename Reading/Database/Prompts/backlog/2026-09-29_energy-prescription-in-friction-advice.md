# Backlog · the energy prescription inside a friction's advice (owner idea, 2026-09-29)

**Status: APPLIED 2026-09-29 (commit 7b5f6b4). Ruled 2026-09-29 (owner, by questionnaire). Q1 = the friction advice only. Q2 = template-level, by band. Q3 = the taming cure only. REA_04 = add the 子平真诠 remedy lines to PART 2. Apply: Parts 1 (variant A), 2a variant A, 2b, 2c, 3 (as drafted), 4a, 4b, 7, 8, and the REA_04 addition. Parts 5 and 6: NO. Application pending the backlog apply pass.**

## The idea, as the owner put it

On the golden chart (庚 Overfueled), Earth is the Mind and runs as a friction: the shipping advice ("Trade study for evidence…") tells the reader to get output out of an overprepared mind. That advice echoes the chart's own cure: the Blade needs more catalysts, and the catalysts on this chart are Wood, Water and Fire. So a friction's advice can carry an **energy prescription**: name the wanted energies that cure this overgrown function, in the manual's SEEK vocabulary, so the Day Master page, the energy page and the manual say one thing.

## The reasoning, checked against the canon

The cure for an overgrown energy is the energy that **tames** it (克, the direct cure) or, where that energy is itself unwanted on the chart, the energy that **drains** it (泄, the 化 cure). The ten equations (REA_02 §5d) fix which energy that is, and the band fixes which energies are wanted, so the prescription follows from the chart with no new judgement:

| Core band | Friction (the overgrown function) | What tames it | What drains it | The prescription (catalysts only) | Classical line |
|---|---|---|---|---|---|
| Overfueled | **Body** (the self in excess) | Order (克身) | Expression (泄身) | Order and Expression | 强而得制 (强金得水，方挫其锋: for a strong self the drain is the classical first cure); 官杀制身 |
| Overfueled | **Mind** (the feeder in excess) | Action (the Action element tames the feeder: 木克土 on a Metal core) | the self (the core drains its feeder, no cure) | Action first, Expression as the outlet | 印重用财 (a heavy resource is broken by wealth: 财破印); 土多得木，方能疏通; 食伤泄秀 for the outlet |
| Underfueled | **Expression** (the output in excess) | Mind (土克水 on a Metal core) | Action (Expression feeds Action, an unwanted drain) | Mind, with Body | 食伤旺用印 (印制食伤); 比劫帮身 |
| Underfueled | **Action** (the wealth in excess) | Body (the core tames its Action: 金克木) | Order (Action feeds Order, unwanted) | Body, with Mind | 财多身弱，比劫帮身; 印生身 |
| Underfueled | **Order** (the pressure in excess) | Expression (水克火), unwanted on a weak chart | Mind (Order feeds Mind: 火生土, the 化 cure) | Mind (化杀), with Body | 官杀旺身弱，用印化杀; 杀印相生 |

So the owner's Earth example resolves as: the cure for an overgrown Mind on the Blade is **Wood** first (Action tames the feeder: 木克土, 财破印), with **Water** as the outlet for what was taken in (Expression drains the self: 食伤泄秀). **Fire is the one catalyst that does not cure Earth**: Fire feeds Earth (火生土), so on a Mind-heavy chart more Fire feeds the very thing that is overgrown, even though Fire is wanted for the core (官杀制身). The prescription rule therefore names the taming catalyst first and never a catalyst that feeds the friction.

Evidence in the library: REA_02 §5d (the ten equations, feeds and tames), §5c (Channel = 克泄耗 for Overfueled, Refill = 生助 for Underfueled), §5h (valence × volume; the canon ground: 印旺 = 思虑过多、行动迟缓; 官杀旺身弱 = 自我否定; 财多身弱 = 虎头蛇尾); REA_04 PART 2 (渊海子平 五行生克制化宜忌, the five excess sets and their remedies; 神峰通考 deficiency and remedy theory; 滴天髓 on 身强 and 七杀; 子平真诠 ten-god chapters: 印重用财, 食伤用印, 杀重用印). The app already implements the first half of this: the carry card's SEEK row lists the catalysts and the EASE row the frictions; what the idea adds is the link between a named friction and its named cure inside the advice paragraph.

## Where it would go

- `ELEMENT_PAIR.function.advise_friction` (the card at `fields/ELEMENT_PAIR/ELEMENT_PAIR.function.advise_catalyst.md`): a closing beat, one sentence, after the small actions: "the energy that cures this is {taming catalyst} ({its function noun}), so seek it: {one concrete action in that energy's arena}", in the manual's SEEK register, the function noun and the element named plainly, no role word beyond catalyst, never a percentage. Budget stays ≤60 words, so the prescription costs one of the four small actions.
- The five Order friction definitions and the ten Order shadows already carry the inner judge; the prescription would be the manual's answer to it.
- Possibly the carry card's EASE row remedy (`carry.excess.remedy`), which is the same sentence at ≤12 words: "Dig out. Less study, one real cut." could name the cure energy ("Cut wood" is what the Blade's Wood remedy already says).

## Open questions for the owner before it becomes a rule

1. Does the prescription live in `advise_friction` only, or also in the excess carry remedy and the shadow desc? (The repetition law limits it to one place per page.)
2. Is the prescription chart-aware (only the cure energies that are catalysts on this chart) or template-level (the cure energies by band, which is what the table above gives, since valence follows the band)? The table is template-level and needs no chart data, so it can be authored into the 25 cells.
3. The Fire caveat: on the golden chart Fire is a catalyst but feeds Earth. Does the advice name only the taming cure (Wood) and the outlet (Water), or all catalysts? The canon says the former.

## Action items

- [x] Owner rules questions 1 to 3.
- [x] Add the prescription beat to the advise_friction card (and, if ruled, the carry.excess remedy), with the table above as the derivation.
- [ ] Re-cut the 25 friction advices with the prescription beat, gated (≤60 words), rendered before/after on the golden chart and the two contrast charts, ruled row by row.
- [x] Add the rule to the register (a new row under D or F) and log it in REA_16 §6 once ruled.

## Draft patch (not applied)

_Drafted 2026-09-29 by the backlog drafter. Nothing below is applied, and nothing below is a rule until the owner answers questions 1 to 3 above. Each part says which question it depends on. A part marked CONDITIONAL is drafted on the answer the canon favours (stated in the part) and must be re-cut if the owner rules the other way. Every "before" is the current text quoted verbatim, every "after" is the exact replacement. The derivation table in the section "The reasoning, checked against the canon" is the source for every cure named here._

### The dependency map

| Part | What it changes | Depends on | Status |
|---|---|---|---|
| 1 | the advise_friction card: construct, chain, style, checks, exemplar, sources, log | Q2 (which energies the beat may name), Q3 (the taming cure only, or the outlet too) | CONDITIONAL on Q2 and Q3 |
| 2 | the worked beats on the golden chart and one Underfueled cell | Q3 | CONDITIONAL on Q3 (both variants drafted) |
| 3 | a register row | Q1 (the scope column), Q2 (the wording "by band" or "on this chart") | CONDITIONAL on Q1 and Q2 |
| 4 | the harness task line and gate for the advise field | Q2 (only a template-level cure set can be gated per cell) | CONDITIONAL on Q2 |
| 5 | the carry.excess remedy | Q1 | CONDITIONAL on Q1, drafted, recommended NO |
| 6 | the shadow desc | Q1 | CONDITIONAL on Q1, not drafted, recommended NO (REA_02 §5h forbids it) |
| 7 | REA_02 §5h, the sentence "Cures live ONLY in the manual" | Q1 | CONDITIONAL on Q1: the source must agree before the card can say it |
| 8 | REA_16 §6 log row | Q1, Q2, Q3 | CONDITIONAL on all three, records the rulings |

Two things the drafter found while checking the sources, for the owner to see before ruling:

- **The classical formulas the backlog cites are not all in the library.** REA_04 PART 2 carries the 渊海子平 five sets verbatim, including 强而得制 (强金得水，方挫其锋 …, line 366) and the excess table (lines 375–378), and 滴天髓 身旺有泄者，通明达理；无泄者固执 (line 245). It does not carry 印重用财, 财破印, 食伤泄秀, 土多得木, 化杀, 杀印相生 or 比劫帮身 as text, the 子平真诠 section names the chapters (论正官, 论七杀, 论食神, 论伤官, 论财, 论印) without quoting the remedy lines. Under H3 and the README ("a prompt never invents a rule, every rule cites the ruling it compiles") the card's Sources line below cites only what REA_04 holds, and the derivation table's "Classical line" column should be added to REA_04 PART 2 (the 子平真诠 section) in the backlog pass before the card cites it. That addition is a REA_04 edit, not drafted here.
- **REA_02 §5h bullet 1 says "Cures live ONLY in the manual's SEEK / EASE rows and are echoed on P4, never restated."** A cure energy named inside the energy page's friction advice is a second place. The source wins over a prompt, so Part 7 drafts the §5h amendment the rule needs, without it the card would contradict its own source.

### Part 1 · `fields/ELEMENT_PAIR/ELEMENT_PAIR.function.advise_catalyst.md` (CONDITIONAL on Q2 and Q3)

Drafted on: Q2 = template-level (the cure set follows the band, so it can be authored into the 25 cells with no chart data), Q3 = the taming cure named, the outlet named only where the table gives one (the Mind row), never a catalyst that feeds the friction. If Q3 rules "the taming cure only, everywhere", drop the outlet clause in 1a and 1b and use variant A in Part 2. If Q2 rules "chart-aware", Part 1 cannot be authored into the cells: the beat becomes a T-class slot filled by the engine, and the card would say so instead.

**1a · Construct.**

Before:
> - Construct: a profound or psychological opening that lands in atomic, habitual advice ("At some point more learning is just fear with a reading list. Trade study for evidence: …"). The reader keeps a practical choice.

After:
> - Construct: a profound or psychological opening that lands in atomic, habitual advice ("At some point more learning is just fear with a reading list. Trade study for evidence: …"). The reader keeps a practical choice. **The friction pole closes on the energy prescription** (owner 2026-09-29): one sentence naming the energy that cures this overgrown function, with its function noun, then "Seek it." and one small action in that energy's arena ("The energy that cures this is Wood, your Action. Seek it. Build one real thing a month and show it."). The cure is derived, never chosen: the energy that tames the overgrown function by the ten equations, or, where the taming energy is unwanted on the band, the energy that drains it. Where the table gives an outlet as well (Mind overgrown: the Expression energy carries out what was taken in), the beat may name it second. Never an energy that feeds the friction. The element and the function are named plainly, no role word, no number, no percentage. The catalyst pole carries no prescription.

**1b · Reasoning chain.**

Before:
> - Reasoning chain: name the psychological truth under the state in one sentence → three or four small actions with objects and cadences (once a month, one notebook, a decision date) → end on the smallest one.

After:
> - Reasoning chain: name the psychological truth under the state in one sentence → small actions with objects and cadences (once a month, one notebook, a decision date): three or four on the catalyst pole, two or three on the friction pole → on the friction pole, derive the cure: read the function this cell's energy is for the core (Body = the core's own element, Mind = its feeder, Expression = what it feeds, Action = what it tames, Order = what tames it), then take the cure from the band table: Body overgrown (Overfueled) → Order tames it, Expression drains it, name Order · Mind overgrown (Overfueled) → Action tames the feeder, name Action, and Expression as the outlet · Expression overgrown (Underfueled) → Mind tames it, name Mind · Action overgrown (Underfueled) → Body tames it, name Body · Order overgrown (Underfueled) → Mind drains it, name Mind → resolve the function to its element for this core by the ten equations → close on the beat: the cure named, "Seek it.", one small action in the cure's arena. Never name an energy that feeds the friction (Fire feeds Earth, so a Mind-heavy Metal core is never told to seek Fire, even where Fire is wanted for the core).

**1c · Style.**

Before:
> - Style: the owner's ruling of 2026-09-20 keeps the authored advice voice everywhere: plain, specific, no metaphor stacking; no chart-derived prescription of investments, careers or medical acts; never a guarantee.

After:
> - Style: the owner's ruling of 2026-09-20 keeps the authored advice voice everywhere: plain, specific, no metaphor stacking, no chart-derived prescription of investments, careers or medical acts, never a guarantee. The prescription beat is in the manual's SEEK register, one plain sentence and one plain action. The cure element and its function noun are the only names in it. The action is something done in a week, not a career move. The beat costs one of the small actions, so the budget holds.

**1d · Checks.**

Before:
> - Checks: ≤60w, zero dashes, rep-block against definition and turn.

After:
> - Checks: ≤60w, zero dashes, rep-block against definition and turn. On the friction pole: exactly one cure element named, and it belongs to the cell's cure set (the band table resolved for this core), no element that feeds the friction, the word "Seek" present once, no role word, no number.

**1e · Exemplar.**

Before:
> - Exemplar (金_土 friction): "At some point more learning is just fear with a reading list. Trade study for evidence: for every hour that goes in, one small thing comes out where someone can see it. Give each research topic a decision date. Finish one old course before any new one gets your money."

After:
> - Exemplar (金_土 friction, re-cut with the prescription beat, 59 words, the last small action gave way to it): "At some point more learning is just fear with a reading list. Trade study for evidence: for every hour that goes in, one small thing comes out where someone can see it. Give each research topic a decision date. The energy that cures this is Wood, your Action. Seek it. Build one real thing a month and show it."

**1f · Sources.**

Before:
> - Sources: REA_16 §2c; the 2026-09-20 proof review ("advice: Before wins").

After:
> - Sources: REA_16 §2c and the 2026-09-20 proof review ("advice: Before wins"). The prescription beat: REA_02 §5c (Channel and Refill, SEEK and EASE), §5d (the ten equations), §5h (valence × volume, the canon ground), REA_04 PART 2 渊海子平 强而得制 (强金得水，方挫其锋) and the excess table, owner ruling 2026-09-29 (backlog item, questions 1 to 3 answered {date}).

**1g · Iteration log.** Replace the PROPOSED row with the landed row when ruled:

Before:
> | 2026-09-29 | PROPOSED (owner): a closing energy-prescription beat in advise_friction naming the catalyst that cures the overgrown function (the taming energy first; never one that feeds the friction). Derivation and open questions: `backlog/2026-09-29_energy-prescription-in-friction-advice.md` | pending the owner's rulings |

After:
> | 2026-09-29 | The prescription beat lands on the friction pole: the cure energy by the band table, its function noun, "Seek it.", one action, never an energy that feeds the friction, the beat costs one small action | owner rulings Q1 to Q3 on `backlog/2026-09-29_energy-prescription-in-friction-advice.md` (REA_16 §6) |

### Part 2 · The worked beats (CONDITIONAL on Q3)

All counted, all inside 60 words, all rep-blocked by eye against the cell's definition, turn and carry remedy (no shared four-word run: "one real cut" in the carry remedy against "one real thing a" here is a three-word overlap).

**2a · 金_土 friction, the golden chart (Mind overgrown on a Metal core: Wood tames Earth, Water is the outlet, and Fire feeds Earth and is never named).**

Variant A (Q3 = the taming cure only), 59 words:
> At some point more learning is just fear with a reading list. Trade study for evidence: for every hour that goes in, one small thing comes out where someone can see it. Give each research topic a decision date. The energy that cures this is Wood, your Action. Seek it. Build one real thing a month and show it.

Variant B (Q3 = the taming cure and the outlet), 59 words, two small actions gave way:
> At some point more learning is just fear with a reading list. Trade study for evidence: for every hour that goes in, one small thing comes out where someone can see it. Wood, your Action, cures this, and Water, your Expression, carries it out. Seek both. Build one real thing a month and tell someone what it taught you.

**2b · 金_火 friction, an Underfueled cell (Order overgrown on a Metal core: Water would tame Fire but is unwanted on a weak chart, so Earth, the Mind, drains it, the 化 cure).** 49 words, the closing aphorism "Order people can breathe in is the only kind that holds." and the "Schedule the rest" action gave way, the latter can return inside the budget:
> Command works best rationed. Before taking over, ask one question and wait for the whole answer. Rank the week's fires and let the bottom three burn out alone. The energy that cures this is Earth, your Mind. Seek it. Sit with one slow book before the next hard call.

**2c · The formula, fixed across the 25 cells:** `The energy that cures this is {Element}, your {Function}. Seek it. {one small action in the cure's arena}.` Variant B for the Mind row only: `{Element}, your {Function}, cures this, and {Element}, your {Function}, carries it out. Seek both. {one action}.`

**Drafter's note on the role word.** The backlog allows "no role word beyond catalyst". The beats above use no role word at all, so register row D1 stands untouched. If the owner wants "catalyst" spoken in the beat, add to 1a: "this field carries the role word catalyst" (the D1 exception clause), and say "1a with catalyst".

### Part 3 · `02_RULES_REGISTER.md`, a new row (CONDITIONAL on Q1 and Q2)

Drafted on Q1 = advise_friction only, Q2 = template-level. Append under D after D6:

> | D7 | The friction advice closes on an energy prescription: one sentence naming the energy that cures the overgrown function (the energy that tames it by the ten equations, or, where that energy is unwanted on the band, the energy that drains it, and the outlet may follow on the Mind row), its function noun, "Seek it.", and one small action. Never an energy that feeds the friction. Element and function named plainly, no role word, no number. The prescription lives in the friction advice only, once per page (the repetition law) | REA_02 §5c, §5d, §5h · REA_04 PART 2 渊海子平 强而得制 · owner 2026-09-29 (the energy prescription, questions 1 to 3) | harness (the named element is in the cell's cure set, ≤60w) · read (the action) | RULED 2026-09-29 |

If Q1 rules "also the carry remedy", replace "The prescription lives in the friction advice only, once per page (the repetition law)" with "The prescription lives in the friction advice and, in ≤12 words, in the excess carry remedy, and the two never share a four-word run". If Q2 rules "chart-aware", replace "by the ten equations" with "by the ten equations among the catalysts of this chart, filled by the engine" and the Gate column with "engine (slot) · read".

Iteration log row to append:

> | 2026-09-29 | D7: the energy prescription beat on the friction advice | owner rulings Q1 to Q3 on the backlog item (REA_16 §6) |

### Part 4 · Harness, `ComparativeAnalysis/Prompts/lib.mjs` line 174, the `'ELEMENT_PAIR.function.advise'` entry (CONDITIONAL on Q2)

**4a · The task line.**

Before:
> `then three or four small actions with objects and cadences, ending on the smallest one.`

After:
> `then small actions with objects and cadences, ending on ${c.pole === 'friction' ? 'the energy prescription: one sentence naming the energy that cures this friction (the taming energy by the ten equations, or the draining one where the taming energy is unwanted on the band), its function noun, then "Seek it." and one small action in that energy' : 'the smallest one'}.`

**4b · A gate line** to add inside the entry's `validate`, after the guarantee check. The cure set is computed from the cell's core element and the band table, `CURE_SET` is a small map the patch adds to lib.mjs (Body: Order · Mind: Action, Expression · Expression: Mind · Action: Body · Order: Mind), resolved to elements by the feeds and tames cycle. Proposed line:

> `if (c.pole === 'friction') { const named = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'].filter((el) => new RegExp('\\b' + el + '\\b').test(o[k] || '')); const cure = cureSet(c.cell); stat(`cure named = ${named.join(', ') || 'none'} (cure set ${cure.join(', ')})`, named.length >= 1 && named.every((el) => cure.includes(el))); if (!/\bSeek (it|both)\./.test(o[k] || '')) F(k, 'prescription beat missing ("Seek it.")'); }`

`cureSet(cell)` is left to the patch: it reads the cell key `{core}_{energy}`, finds the function of `energy` for `core` by the cycle, and returns the elements of the functions in the table row. Not gated until Q2 is ruled template-level.

### Part 5 · `carry.excess.remedy`, the same sentence at ≤12 words (CONDITIONAL on Q1, recommended NO)

The backlog notes the Blade's excess remedy already says the cure in its own material ("Dig out. Less study, one real cut." is Wood's cut). Naming the element there would put the cure in two places on the Day Master page and the energy page and strain the repetition law. If Q1 rules yes, the 金_土 line would read:

Before:
> "Dig out. Less study, one real cut."

After (7 words):
> "Dig out. Less study, more Wood: cut."

The card `fields/ELEMENT_PAIR/ELEMENT_PAIR.carry.md` would gain, in Style: "the excess remedy may name the cure element in one word (owner 2026-09-29, Q1)". Recommended NO: the remedy is already the cure said in the material, and REA_02 §5h keeps cures in the manual's rows.

### Part 6 · The shadow desc (CONDITIONAL on Q1, recommended NO, not drafted)

REA_02 §5h: "Cures live ONLY in the manual's SEEK / EASE rows and are echoed on P4, never restated", and the P4 pools are quintessence, what the material can do on any chart. A cure inside a shadow desc would break both. Not drafted. If Q1 rules yes, it needs its own backlog item against §5h first.

### Part 7 · `Reading/Documents/REA_02_Concept_Dictionary.md` §5h, bullet 1 (CONDITIONAL on Q1)

The source must say it before the card can. Drafted on Q1 = advise_friction only.

Before:
> Cures live ONLY in the manual's SEEK / EASE rows and are echoed on P4, never restated.

After:
> Cures live in the manual's SEEK / EASE rows and are echoed on P4, never restated. The one other place a cure is spoken is the energy page's friction advice, whose closing beat names the energy that cures the overgrown function and one action (owner 2026-09-29, the beat is derived from the band table in the backlog item, never chosen).

### Part 8 · REA_16 §6 log row (CONDITIONAL on Q1, Q2, Q3, the bracketed words take the rulings)

> | 2026-09-29 | **THE ENERGY PRESCRIPTION IN THE FRICTION ADVICE (owner idea 2026-09-29, ruled {date}: Q1 {advise_friction only / also the excess carry remedy}, Q2 {template-level by band / chart-aware}, Q3 {the taming cure only / the taming cure and the outlet / all catalysts}).** On the golden chart the Blade's Earth (its Mind) runs as a friction and the shipping advice tells the reader to get output out of an overprepared mind, and the chart's own cure says the same in the manual's SEEK row. Ruled: every friction advice closes on one sentence naming the energy that cures the overgrown function, derived from the band table (Body overgrown: Order · Mind overgrown: Action, with Expression as the outlet · Expression overgrown: Mind · Action overgrown: Body · Order overgrown: Mind, the 化 cure), resolved to the element by the ten equations, then "Seek it." and one small action, never an energy that feeds the friction (Fire feeds Earth, so the Blade with heavy Earth is sent to Wood, never to Fire). Canon: REA_02 §5c, §5d, §5h, REA_04 PART 2 渊海子平 强而得制 and the excess table, the 子平真诠 remedy lines (印重用财, 食伤用印, 杀重用印) added to REA_04 PART 2 with this ruling. Card, register D7, harness task line and cure-set gate updated, and the 25 friction advices re-cut with the beat inside 60 words and ruled row by row on the golden chart and the two contrast charts. Record: Reading/Database/Prompts/backlog/2026-09-29_energy-prescription-in-friction-advice.md. |

### Approval sheet

| Part | File | Depends on | One word |
|---|---|---|---|
| 1a–1g | advise_catalyst card | Q2, Q3 | |
| 2a | 金_土 beat, variant A or B | Q3 | |
| 2b | 金_火 beat | Q3 | |
| 2c | the formula | Q3 | |
| 3 | register D7 and log | Q1, Q2 | |
| 4a | lib.mjs task line | Q2 | |
| 4b | lib.mjs cure-set gate | Q2 | |
| 5 | carry.excess remedy (recommended no) | Q1 | |
| 6 | shadow desc (recommended no) | Q1 | |
| 7 | REA_02 §5h amendment | Q1 | |
| 8 | REA_16 §6 log row | Q1, Q2, Q3 | |
| (REA_04) | add the 子平真诠 remedy lines to PART 2 | none | |
