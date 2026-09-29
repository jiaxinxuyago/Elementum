# Backlog · the energy prescription inside a friction's advice (owner idea, 2026-09-29)

**Status: PROPOSED, not a rule. Owner's ask: find the reasoning and evidence, apply it systematically to every friction advice, then modify the advise_friction prompt.**

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

- [ ] Owner rules questions 1 to 3.
- [ ] Add the prescription beat to the advise_friction card (and, if ruled, the carry.excess remedy), with the table above as the derivation.
- [ ] Re-cut the 25 friction advices with the prescription beat, gated (≤60 words), rendered before/after on the golden chart and the two contrast charts, ruled row by row.
- [ ] Add the rule to the register (a new row under D or F) and log it in REA_16 §6 once ruled.
