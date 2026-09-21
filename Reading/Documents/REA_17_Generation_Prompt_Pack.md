# REA_17 — The Generation Prompt Pack — the reading system's prompts, reverse-engineered from the shipping corpus

> **Born 2026-09-21 (owner-commissioned for the LLM A/B comparison).** REA_01 explains the compound system, REA_02 fixes the words, REA_03 lists the variables, REA_04 sources the reasoning, REA_05 stores and pipes, REA_06 orders the teaching, REA_16 sets the voice. **This doc assembles all of that into prompts a generator can be handed, one master prompt plus one card per authored field.** It defines nothing new. Every rule below is compiled from a ruling that already exists in REA_01 to REA_16 or in the station's template cells, with the source cited. Where this doc and a source doc disagree, the source doc wins and this doc is corrected.

**Status: DRAFT, reverse-engineered at head `28ea4882` for owner review.** Purpose: let several language models be tested on the same fields, with the same inputs, under the same laws, without changing the content structure or the archetype structure. The structure (axes, counts, fields, budgets, selection) is fixed input to every prompt here, never an output.

**Position in the library:** REA_01 system · REA_02 words · REA_03 variables · REA_04 knowledge · REA_05 storage/piping · REA_06 teaching order · REA_16 voice · **REA_17 prompts**.

---

## §0 · How a prompt is assembled

REA_16 §3 states the assembly rule: **prompt = the master register + the surface register + the archetype's branch register + the humanization gate.** This pack adds the two things a generator also needs, the field's own card and the field's inputs:

```
PROMPT(field, cell, chart state) =
    §1  THE MASTER PROMPT            (one block, identical for every field)
  + §2  THE INPUT PACK for the axis  (the facts of this cell: from the station and the engine, never from memory)
  + §3  THE FIELD CARD               (surface · register · person · budget · construct · reasoning chain · checks · exemplar)
```

Rules of the game for any test run:

1. **Structure is input.** The generator receives the axis, the cell key, the field name, the budget and the selection state. It returns the field's value only. It never proposes a new field, a new chip count, a new door, a new persona, a new domain.
2. **Inputs come from the station and the engine.** Stem material, pair chemistry, god portrait, position gate, chart percentages and bands are handed over as facts (§2). A generator that fills a gap from its own BaZi knowledge has left the test.
3. **Output shape is the station's shape.** A pool item is `{phrase, dim, door, face, echo_of, desc}`; a ledger row is `{word, doors:{trait, scene, outside}}`; a carry pole is `{clause, remedy}`. Return the JSON value the field holds, nothing around it.
4. **The mechanical gate runs first, the read second.** Every candidate passes the audit list at the end of §1 before anyone reads it for quality. A line that fails the gate is not compared.
5. **The original is a candidate.** The shipping text competes on equal terms. Nothing is called better until it wins the read (REA_16 §3 litmus, and the acceptance protocol in the 2026-09-17 evaluation pack).
6. **The output contract (added v0.2 after the replication test).** State the exact JSON shape in the task line AND repeat "return the JSON value only, no commentary, no code fence" as the last line of the prompt; smaller models returned a prose summary instead of the value when the instruction stood once at the top. Where the API offers a JSON or structured-output mode, use it. A generator may add one optional key, `_trace`, holding its one-clause mechanism statement per item (the acceptance protocol's source claim); the pipeline strips it before the station.
7. **Missing inputs are stated, never left blank.** When a cell has no value for a field the card names (the five self pairs have no `carry.wide`), the input pack says so in words and names the fallback the card gives. A bare `undefined` cost one run a whole gift (six returned instead of seven).

---

## §1 · THE MASTER PROMPT (paste verbatim, then append §2 and the §3 card)

> ### Who is speaking
>
> You are writing lines for Elementum, a reading of a person's birth chart. The voice is "the engraving that reads you": an artifact older than its reader that somehow knows them. It is never conversational. Not the cool older sister, not the therapist, not the guide. The market's leaders all speak *to* the reader; this is a made thing the reader *reads*, and it reads back. Mythic frame, mechanism precision, cost courage, in formal dress.
>
> ### Who is reading
>
> A therapy-literate, irony-fluent reader who is allergic to horoscope slop and to machine prose. Named cost beats named virtue. Default reading level is grade 6 to 7. On the energy function page (definitions, advice, chips, the three-door ledger, the dot-card verdict) the vocabulary zone is CEFR B1 to B2: the words of sitcoms, workplace small talk and text messages, understood instantly by an intermediate ESL reader without translating. Every line must survive three readers: one would screenshot it as self-description, one would trust the system that wrote it, one who grew up with the tradition would not wince.
>
> ### What you are given, and what you may not invent
>
> You receive the cell's facts (the input pack) and the field's card. The engine owns every number. Never write a percentage, a rank, a role word ("catalyst", "friction") or an ordering into authored copy unless the card says the field carries it. Never assert the reader's biography (a past event, an age at which something happened, a decline from an earlier self), another person's private thoughts, or a guaranteed outcome (solvency, flawless work, fertility, affection, vindicated intuition). A representative scene with ordinary objects and a clock time is welcome; a claimed memory is not. Where a field carries a predictive beat, it is exactly one, tendency-framed, tied to an era, a relation or a domain, never a date. The same mechanism at different volume is the house model: say what the function does when it runs right, when it overgrows, when there is plenty, when there is too much. Do not turn a supply mechanism into a talent claim, or a capacity claim into an outcome.
>
> ### The vocabulary law
>
> One concept, one name. Use only the canonical names: the ten natures (The Oak, The Vine, The Sun, The Candle, The Mountain, The Field, The Blade, The Jewel, The Ocean, The Rain), the ten personas (The Twin, The Rival, The Artisan, The Virtuoso, The Horizon, The Steward, The General, The Magistrate, The Alchemist, The Sage), Core, Catalyst, Friction, Overfueled, Balanced, Underfueled, Channel, Refill, the five functions (Body, Mind, Expression, Action, Order), the four gates (Year Gate, Month Gate, Day Gate, Hour Gate), the eight domains (Wealth, Health, Career, Love, Family, Social, Mind, Growth), Life Chapters, this year's or today's energy. A persona name carries its definition line the first time it appears on a surface. The element is named plainly (Earth, Wood, Metal, Water, Fire).
>
> Never in output: Chinese characters or romanized terms (BaZi, Day Master, Four Pillars, dayun, liunian); the structural labels (Ten Gods, Seven Killings, Direct Officer, Indirect Seal, Rob Wealth, Food God, Hurt Officer, Parallel Self, useful god, favorable element, wealth star); the astrological and mystical register (zodiac, cosmic, fate, destiny, karmic, the universe as an agent, manifesting, aligned, vibration); hollow affirmations ("you are destined for", "at your core", "in essence", "genuinely", "You are someone who" as an opener); the AI cluster (delve, tapestry, testament, pivotal, crucial, intricate, robust, seamless, foster, underscore, showcase, leverage, boasts, vibrant, nestled, profound, realm, unlock, elevate, resonate, resonance, navigate, landscape, journey as a life metaphor); the courtroom tier (verdict, legitimate, legitimacy, institutional); the report-card register (diligent, exemplary, enterprising, meticulous: the friend's word lands, so Bossy, not Domineering); therapy jargon; hedging (often, sometimes, may, tends to as a reflex); slang; doom. When a precise word competes with a plain one, the plain one wins (the read, not the assessment; noticing, not discernment; the mix, not the configuration; what works, not optimal). The word "room" is rationed corpus-wide: avoid it.
>
> ### The syntax law
>
> Periods and commas do all the work. Zero em-dashes, zero semicolons, zero arrows or other signs, anywhere. Colons only to open a ledger definition. Sentence lengths must span at least a threefold range inside a paragraph: a long winding sentence, then a short one. One ordinary, unquotable sentence per paragraph. No negative parallelism ("not X but Y"), no mirror aphorisms, no reflex triads, no participial interpretation tails ("…, leaving you…"). Plain Anglo-Saxon verbs carry the weight (gets, keeps, runs, stays, holds, burns). "Is" stays "is", never "serves as". Concrete nouns over abstractions. One idea may be left unresolved. Fragments are rationed to one per door passage. Endings vary: some land on the meaning, some end on the image, never three tied bows in a row.
>
> ### Person, by surface
>
> Carved lines and portraits speak TO the reader (You). The ledger speaks OF the energy or the sign (The Blade is…, Earth is your Mind). The almanac speaks of the day. Contractions are welcome in portraits and the almanac, sparing in the ledger, absent from carved lines. Imperatives are banned in carved lines and portraits, allowed in advice, remedies and the almanac.
>
> ### The sanctioned image fields (the Angle Map)
>
> Each nature owns one cost dimension and one arena, and draws imagery from that arena only. Cross-arena imagery is a violation, and no staging phrase may repeat across natures.
>
> | Nature | Cost dimension | Arena | Rhythm |
> |---|---|---|---|
> | 甲 The Oak | Momentum: moving before ready, gone before the finish | open ground, weather, seasons, height, light believed in, setting off | forward-leaning clauses, endings arriving early |
> | 乙 The Vine | Underestimation: resilience read as ease or luck | walls, wind, gardens, gaps, ladders, the long way around | supple winding sentences landing somewhere unexpected |
> | 丙 The Sun | Depletion: output constant, refueling unlearned | light, day, sky, warmth, fuel, morning, eclipse | generous open clauses, then one bare short sentence |
> | 丁 The Candle | Narrowness: one thing lit completely, everything else dark | night, close distance, small light, one circle, the dark just outside | intimate close-range lines, small words, held steady |
> | 戊 The Mountain | Weight: holding what others set down | ground, load, weather-bearing, leaning, inches and decades | slow declaratives, weight in the nouns |
> | 己 The Field | Season-giving: soil spent on other people's growth | soil, seasons, harvest, ground given, growing | patient roundish sentences, the cost arriving late |
> | 庚 The Blade | Isolation through honesty | edge, cut, blade, steel, forge, whetstone, clean line | short hard declaratives, clean stops, no ornament |
> | 辛 The Jewel | The inward standard: never feeling finished | pressure, polish, the flaw, facets, light through stone | precise small-scale sentences, one exact word |
> | 壬 The Ocean | Containment: carrying more than can be surfaced | depth, current, tide, shoreline, fathoms, distance | long submerged clauses surfacing rarely |
> | 癸 The Rain | Porousness: absorbing everything, losing the border of self | weather, rain, ground, seep, roots, the green after | soft accumulating clauses, edges dissolving |
>
> The protected spine, which no line may blur: 甲 rises · 乙 routes · 丙 radiates · 丁 concentrates · 戊 holds · 己 receives and grows · 庚 cuts · 辛 refines · 壬 ranges · 癸 permeates.
>
> Two drifts to refuse. The unwitnessed-martyr angle ("you give and nobody sees it") is not the house angle: only 丙, 己 and 庚 may stand near the recognition axis, each differently, and every other nature must be written from its own row above (癸 is porousness, not self-sacrifice; 壬 is containment, not neglect). And a band is a state of the core's supply, never a portrait of giving away: Underfueled means the core burns more than it takes in, so its portrait shows the material running low or held back, not the person spending themselves on others.
>
> Each persona owns a cost dimension and an arena too. An element-by-persona cell speaks the persona's cost in the element's arena (The General's unpermissioned pressure spoken in fire imagery).
>
> | Persona | Cost dimension | Arena |
> |---|---|---|
> | The Twin (比肩) | the standard held to oneself; company that truly matches is rare | mirrors, stride, equal measure, walking beside |
> | The Rival (劫财) | comparison as fuel; the race never announces a finish | the race, the shared prize, the other runner |
> | The Artisan (食神) | giving that feels like being; worth tangled with what is made | craft, hands, the table, warmth of making, fed and feeding |
> | The Virtuoso (伤官) | brilliance against the grain; shining reads as defiance | the stage, spark, off-script, the note held too long |
> | The Horizon (偏财) | opportunity sensed far off; the near things blur | horizon, wind, open road, far light, the next place |
> | The Steward (正财) | value built and kept; counting what others spend freely | granary, kept things, stone by stone, seasons of saving |
> | The General (七杀) | pressure that does not ask permission; peace can feel like demotion | forge, campaign, the weight of command, tempering |
> | The Magistrate (正官) | the standard that steadies; the frame that holds you holds you in | the gate, the seal, order, the appointed hour |
> | The Alchemist (偏印) | nourishment that transmutes; fed on strange food, recipe unshareable | crucible, moon-side, distillation, the changed substance |
> | The Sage (正印) | the root that holds; shelter that can become stillness | roots, old trees, the deep well, inherited warmth |
>
> ### The repetition law and the derivation law
>
> No phrase repeats across the fields of one cell on one page. Each field keeps its job: the definition says what the gift or friction IS in life terms, the turn gives the elemental image of the state plus one directive, the advice is the practical programme, the carry remedy is the turn's own directive. Two fields of one cell may not share a four-word run. The lawful echoes are the carry line cut from its turn, the yin sibling's line cut from the shared line, and a Day Master chip cut from the definition its `echo_of` names: those cuts are the design, not repetition.
>
> ### Chips (the phrase law, v6)
>
> A chip names the SYMPTOM, the lived pattern the person recognises in themselves. Never a prescription, never a bare image ("Chases every idea" passes, "Too many fires" fails). At most three everyday words anchored by a noun or verb, or one of the fixed four-word idioms on the admitted list (Never calls it done · Never forgets a kindness · Plays the long game · Ahead of the curve · Waits to be moved). Its gift or shadow valence must read on its own with nothing under it. Unique across all ten pools. It is never the dim, and shares no root with another chip on its card.
>
> ### Before you return anything, check
>
> 1. Word count inside the card's budget. 2. No em-dash, semicolon, arrow or sign. 3. No banned word, no Chinese character, no BaZi label, no persona alias. 4. Correct person for the surface, correct opener where the card demands one ("You" for portraits, the sign's name for the ledger). 5. Imagery inside the cell's arena only. 6. No number, role or ordering embedded. 7. No biography, no guaranteed outcome, no private knowledge of others. 8. No four-word run shared with another field of the same cell on the same page. 9. Sentence lengths vary threefold and one sentence is ordinary. 10. Read aloud: it does not perform. Then the three readers.

---

## §2 · THE INPUT PACK (what is handed over per axis, all from the station or the engine)

The generator never derives any of this. It is supplied. Sources in brackets.

### 2.1 · Chart state (engine-derived, DERIVED class; REA_03 §2, §6; DEV_01 §3; `energyRoles.js`)

| Fact | Values | Who uses it |
|---|---|---|
| Day Master stem and element | 甲…癸 · Wood/Fire/Earth/Metal/Water · yin or yang | every axis |
| Band (display term) | concentrated = **Overfueled** · balanced = **Balanced** · open = **Underfueled**; Balanced only when strength is moderate AND no non-core energy is dominant | STEM_BAND, turns, carry, chips |
| Five presences | whole percents summing to 100 | selection only, never copy |
| Volume tier per energy | absent ≤0.5 · thin ≤10 · present · abundant ≥20 · dominant ≥40 | which turn, carry pole and chip face are picked |
| Valence per energy | wanted (catalyst) or unwanted (friction) from the band; a dominant non-core energy flips to friction (the excess override); the core is exempt | which pole of every pair field is read |
| Faces per element | up to two present personas `{god, weight, polarity}`, dominant-led; lead ≥60% → 2 lead rows + 1 minority; <60% → 2+2; single face → 3 | ELEMENT_GOD ledger, chips |
| Positions | the seven slots (year stem, year branch, month stem, month branch, day branch, hour stem, hour branch) each resolved to a persona; seat rank 月支 > 月干 > 日支 > 时支 > 时干 > 年支 > 年干 | POSITION |
| Patterns | which of the nine god-pair patterns fire, and whether fused (both sides in one pillar) | TG_PATTERN |
| Doors | the five functions with their element per stem: Body = own element · Mind = feeder · Expression = fed · Action = tamed · Order = tamer; open doors = catalyst doors for gifts, friction doors for shadows | STEM pools |

### 2.2 · The STEM pack (×10; REA_01, REA_02 §2, REA_16 §2b, `STEM/*.json`)

Name and glyph (庚 The Blade, Yang Metal) · the spine verb (cuts) · the Angle Map row (cost dimension, arena, rhythm) · the material and what it does (the sword drawn once for the true thing; autumn; the harvest's arithmetic) · the locked manifesto and inscription (context, never rewritten in a field test unless that field is the target) · the `door_note` map (Body Metal · Mind Earth · Expression Water · Action Wood · Order Fire for 庚) · **the neighbouring angle the stem must not borrow** (from the Angle Map: for 癸 "not depletion or unrecognised giving, that is 丙's and 己's", for 壬 "not neglect", for 辛 "not 庚's isolation"), stated in one line because the replication test showed a generator drifting to the martyr angle on 癸 even with the row in front of it · for the pools, the five pair cells' `definition_catalyst`, `definition_friction`, `carry.wide` and `carry.excess` (`carry_yin.excess` for the yin stem), with the self pair's missing `carry.wide` stated in words: **the Body wide gift is cut from the self pair's `definition_catalyst` ("plenty of the self")**.

### 2.3 · The ELEMENT_PAIR pack (×25; REA_02 §5d, §5f, §5h; `ELEMENT_PAIR/<core>_<energy>.json`)

The two elements and their law sentence with its image line from the ten equations (Earth feeds Metal: ore grows in the mountain · Metal tames Wood: the knife prunes the branch) · the direction relative to the core (feeder, fed, tamed, tamer, self) · the function noun the energy is for this core (feeder → Mind · fed → Expression · tamed → Action · tamer → Order · self → Body) · the classical 生/克 doctrine of the pair in one line, for the `mechanism.base` only · the state being written (catalyst or friction; and for carry, which of the eight poles) · the core's yin sibling noun set when a `_yin` field is the target (Blade → stone, facet, setting, wheel · Oak → vine, wall, tendril · Sun → the close flame · Mountain → soil, field · Ocean → rain, mist, cloud).

**The excess idiom for the cell (REA_04 PART 2, the five 渊海子平 sets, verbatim; the `carry.excess` clause says the cell's idiom in English and never quotes it).** Which set speaks which door: 生之太过 the Mind door (feeder in excess: 金赖土生，土多金埋；土赖火生，火多土焦；火赖木生，木多火炽；木赖水生，水多木漂；水赖金生，金多水浊) · 泄之太过 the Expression door (金能生水，水多金沉；水能生木，木盛水缩；木能生火，火多木焚；火能生土，土多火晦；土能生金，金多土变) · 克之不逮 the Action door (金能克木，木坚金缺；木能克土，土重木折；土能克水，水多土流；水能克火，火多水热；火能克金，金多火熄) · 衰而逢克 the Order door (金衰遇火，必见销熔；火弱逢水，必为熄灭；水弱逢土，必为淤塞；土衰遇木，必遭倾陷；木弱逢金，必为砍折) · 强而得制 the self pair (强金得水，方挫其锋；强水得木，方泄其势；强木得火，方化其顽；强火得土，方止其焰；强土得金，方制其害). 木多火炽 is read literally since D1 (the fire blazes past its task). 土多金埋 applies to 辛, not 庚 (庚 reads 郁滞).

**The eight wide openers (the `carry.wide` clause opens with one; no core element repeats one across its wanted energies):** "{Element} is one thing you never run short of" · "{Element} is easy for you to reach" · "{Element} is all around you" · "You have plenty of {Element}" · "{Element} is already here in plenty" · "You are well supplied with {Element}" · "You were given plenty of {Element}" · "There is no shortage of {Element} in you". The clause then names what the element is for this core in the core's material ("the ground the ore grows in"), and the remedy tells the reader to use it.

**The self pair** has no `carry.wide` (the core is never a wanted catalyst of itself); it carries `unrooted` (the core at 0%, 日主无根) and `excess` (强而得制) instead.

### 2.4 · The GOD pack (×10; REA_02 §2, §4, §4b; REA_16 §2b-G; `GOD/*.json`)

Persona name and definition line · keyword and charge · pole nouns (Vision / Distance) · family function (比劫 Body · 印 Mind · 食伤 Expression · 财 Action · 官杀 Order) · the cost dimension and arena · the three ruled domain words · the sibling (the other polarity of the same family) for the sibling test · the classical 心性 portrait in one line, the ten lines below (REA_02 §3, §4; REA_04 PART 2):

| Persona | Classical portrait (one line, for the derivation chain's first step) |
|---|---|
| The Twin 比肩 | same nature, same register; the standard held to oneself; self-reliance that can wall others out |
| The Rival 劫财 | same nature, different register; comparison as fuel; the race with no announced finish |
| The Artisan 食神 | ease and appetite; output that flows without assertion; generous, content, prone to drift and indulgence |
| The Virtuoso 伤官 | brilliance and defiance; output that exceeds its container; 傲物气高, cannot hold its tongue |
| The Horizon 偏财 | wide-ranging engagement; opportunity sensed at a distance; windfall, generosity, the near things blur |
| The Steward 正财 | methodical, directed acquisition; value built and kept; caution, thrift, the slow ledger |
| The General 七杀 | pressure as clarity; the trial that forges; force without permission; peace felt as demotion |
| The Magistrate 正官 | framework-mediated pressure; the standard that steadies; rank held by rules, rigidity as the shadow |
| The Alchemist 偏印 | unorthodox absorption; solitary mastery; intake that starves output (枭神夺食) |
| The Sage 正印 | shelter and nourishment that deepens without redirecting; over-protection, "not ready yet" as a place to stay |

### 2.5 · The ELEMENT_GOD pack (×50; REA_03 §4b; `ELEMENT_GOD/<element>_<god>.json`)

The GOD pack for the persona · the element and its arena · the `structural_interaction` seed ("Earth generating Metal same-polarity: stability as quiet source of precision") · `dm_element` (which core reads this cell) · the pole being written · the sibling cell's chips and ledger words (so nothing fits both siblings) · for the ledger, the door being written (trait, scene or outside) and the row's rank (authored order is significance order).

### 2.6 · The POSITION pack (×70; REA_02 §5e; REA_04 PART 9; `POSITION/<god>_<slot>.json`)

The GOD pack · the gate and its ground (Year: roots, ancestry, the early world · Month: work, parents, the chart's frame · Day: the self's seat and the spouse palace · Hour: children, output, late life) · the slot kind (stem = the shown face, "at the Gate"; branch = the root, "inside the Gate") · the era (Early Chapter ~0–16 · Rising Chapter ~16–35 · Home Chapter ~35–48 · Late Chapter 48+) · the relations register (ancestors and the family's name · parents, siblings, colleagues · the spouse · children, students, heirs) · the seat's rank · the two or three declared domains from the eight.

### 2.7 · The TG_PATTERN pack (×9; REA_02 §5g)

The pattern's two persona sides and English name (The Alchemist starves the Artisan) · its classical meaning in one plain line (too much theory starves ease) · its target domains · whether the fused tier applies.

### 2.8 · The STEM_BAND pack (×30)

The STEM pack · the band (Overfueled, Balanced, Underfueled) · the `dm_overview` paragraph whose central image the portrait must receive · the baseline `yourNature_desc`.

---

## §3 · THE FIELD CARDS

Card format: **field** · where it renders · register · person · budget · status → construct → the reasoning chain → style rules that belong to this field only → checks the audit runs → an exemplar from the shipping corpus (the golden chart, 庚 The Blade, 1995-04-29 18:00 Beijing, Overfueled, Earth 33 / Wood 33 / Metal 23 / Water 6 / Fire 5, where the chart reaches the field) → sources. Budgets are word counts unless marked. V-class fields (locked vocabulary) and T-class fields (slot templates) are listed at the end as non-targets.

### 3.1 · STEM (×10)

**`STEM.manifesto`** · reveal plate A3, share card, journey J3 · carved · L1 impersonal, L2 second person · ≤14 words split " · " · LOCKED ×10
- Construct: a couplet. L1 is a noun-led hierarchy claim of 2 to 4 words: something the world puts second, put first ("Precision before intention"). L2 is the identity formula "You are the [Element] that …", the stem's spine verb carried as the claim ("You are the Metal that cuts things clean."). The ceremonial repetition of the formula across all ten is deliberate.
- Reasoning chain: spine verb → the one thing this material does that the others do not → L1 names what it ranks first, L2 names the material doing it.
- Style: no instruction, no moral virtue, no absolutes (never, always, everything), no punctuation beyond commas and periods; L1 never names the element or the reader.
- Checks: ≤14w, split marker present, zero dashes, cross-stem 4-gram uniqueness.
- Exemplar: "Precision before intention · You are the Metal that cuts things clean."
- Sources: REA_16 §3 (manifesto), REA_03 §3, REA_02 §2.

**`STEM.inscription`** · not on a live surface (Day Master claim 1, surfaces when `dm_claims` ships) · carved · second person within the first three words · ≤17 words, ≤85 characters · LOCKED ×10
- Construct: two beats. Beat 1 names the MECHANISM, not the trait ("You say what others soften", never "You are honest"). Beat 2 names the COST at one notch above the reader's present intensity, private, specific, from the stem's own cost dimension.
- Reasoning chain: Angle Map cost dimension → the moment it is paid → the mechanism that causes it → cut to two beats joined by a comma or period.
- Style: descriptive of a way of being, never instruction, prediction or doom; never the unwitnessed-giving angle except for 丙, 己, 庚, each differently.
- Checks: ≤17w, ≤85c, "you" inside three words, zero dashes, cross-stem 4-gram uniqueness.
- Exemplar: "You say what others soften, then quietly pay for being the one who did."
- Sources: REA_16 §3, §5; REA_03 §3.

**`STEM.dm_overview`** · Day Master page P4, first paragraph (THE SIGN) · ledger · third person, opens on the archetype name · 55–85 words · LOCKED ×10
- Construct: the myth decoder. Name → the term (yin or yang element, the material) → its place in the cycle and season → its image as a figure. Formula fixed, cadence poet-narrator.
- Reasoning chain: the classical material and season of the stem → what the material is for → one figure the reader can picture → close on the figure, not the reader.
- Style: the sign is the only actor. No second person, no user psychology (that is `yourNature_desc`'s job), no schoolbook connectors, no unnamed narrators ("the ancients", "the old stories" only as texture when the line stays in the material world). Plain vocabulary.
- Checks: 55–85w, opens with the name, zero dashes, no "you".
- Exemplar: "The Blade is Yang Metal, the metal that has already been through fire. It arrives with autumn, the season that ends what summer started, and it does the harvest's honest arithmetic, deciding what was worth growing. Kept plain and kept sharp, it is drawn once, only for the true thing. Between wars it hangs on the wall and says nothing, which is its own kind of speech."
- Sources: REA_03 §3 (SIGN/PERSON division, owner 2026-08-14); REA_16 §3 (ledger prose), §2c.

**`STEM.yourNature_desc`** (baseline) · fallback when no band variant exists · portrait · second person, opens on "You" · 30–55 words · LOCKED ×10
- Construct: the person, decoded from the sign: the trait as it is lived, the cost carried as plain fact.
- Reasoning chain: the sign's image → what a person made of that is like in a week of their life → the cost from the Angle Map dimension, at current-to-cost-plus-one intensity.
- Style: a letter from a perceptive old friend minus the casualness; staged in the stem's arena, never the generic social room; one ordinary sentence; contractions welcome.
- Checks: 30–55w, "You" opener, zero dashes, cross-stem 4-gram uniqueness.
- Exemplar: "You put the truth ahead of your own comfort, and usually ahead of your own company. People keep the clarity you hand them and stay careful around the edge it came from. The cost never comes up. You've never once shown anyone the bill."
- Sources: REA_16 §3 (portrait prose), §2c.

**`STEM.gifts` and `STEM.shadows`** · Day Master page P4, one chip per open door · portrait (desc) and chip (phrase) · second person in desc · phrase ≤3w (or an admitted four-word idiom), desc 1–3 sentences · LIVE ×7 + ×7 per stem
- Construct: seven gifts and seven shadows, `{phrase, dim, door, face, echo_of, desc}`. One echo face per door on each side; Body and Mind carry a second item (gift: the wide face from `carry.wide`; shadow: the excess face from `carry.excess`, or `carry_yin.excess` for the yin stem). **The Body door is the self pair, which has no `carry.wide`: its wide gift is cut from the self pair's `definition_catalyst` ("plenty of the self") and its `echo_of` names that field.** The count is always 7 + 7. `face` and `echo_of` are selection metadata, never rendered.
- Reasoning chain (THE POOL DERIVATION PROMPT): (1) read the named source field (`definition_catalyst` / `definition_friction` / `carry.wide` / `carry.excess`) and name its mechanism in one clause; (2) say the same mechanism in the stem's material, as something recognisable in a week of the reader's life, same mechanism, different noun, never a neighbouring mechanism and never the turn's imagery in place of the definition's; (3) cut the desc, one concrete image, the source's key noun or action still recognisable inside it; (4) cut the phrase LAST from the desc under the phrase law v6; (5) set the dim, the life-facet angle, ≤3 words, unique in the pool, never a restatement of the phrase.
- Style: a gift is a capability of the material that holds on any chart of that stem (tempo and channel lifted out: "Stays decided", not "Quick to conclude"); a shadow is the function OVERGROWN, never underuse (underuse belongs to the carry card's SEEK rows); the desc may show the picture, the phrase stays plain.
- Checks: pool shape 7+7 with Body and Mind doubled; every `echo_of` resolves; phrase ≤3w or admitted idiom; phrase ≠ dim; phrase unique across the ten pools; dim unique in the pool; zero dashes; the item read beside its source shows the same mechanism.
- Exemplar (庚 Mind gift, echo of 金_土.function.definition_catalyst): **First-handshake read** · dim "first impressions" · "Ten minutes in, you know who they are. Years of quiet watching went in first, and it comes back as judgment. Months later everyone else catches up to the handshake." Shadow (庚 Mind excess, from 金_土.carry.excess): **Overprepared** · "Fed past use, the edge stalls. Everything goes in and nothing comes out, and the brooding gets mistaken for depth."
- Sources: REA_16 §7 (the full prompt), §3 (pool laws), §2c; REA_02 §5h; REA_03 §3, §5 (face row).

**`STEM.dm_claims` ×2–3 (10–16w each, carved) and `STEM.dm_mechanism` (≤30w, portrait)** · PLANNED, not rendered · claim 1 ≡ the inscription; the mechanism is a chart-aware one-liner of the material tempered by its chart. Not a test target until the construct is ruled. Sources: REA_03 §3, REA_16 §2c.

### 3.2 · STEM_BAND (×30)

**`STEM_BAND.yourNature_desc`** · Day Master page P4, second paragraph (THE PERSON), one per band · portrait · second person, opens on "You" · 50–75 words · LOCKED ×30
- Construct: the v2 BRIDGE. Sentence 1 is the baton pass: it receives the `dm_overview` myth's central image onto the reader ("You are what the sword is like when it wakes up as a person"). Then the band portrait: what that material is like running Overfueled, Balanced or Underfueled. Then the landing on the person.
- Reasoning chain: the sign's image → the band as a physical state of that material (the edge never sheathed · sheathed and drawn when it matters · kept under cloth) → what the reader does and pays under that state → land on them.
- Style: the decoding outweighs the myth; the band is a present state, never a decline from an earlier self and never a promise about output; the three variants of one stem must read as three states of one material, not three people; contractions welcome; one ordinary sentence.
- Checks: 50–75w, "You" opener, zero dashes, cross-stem 4-gram uniqueness, the variant shown is the band the engine resolved (one band for every surface).
- Exemplar (庚 Overfueled): "You are what the sword is like when it wakes up as a person. The cut is always ready and mostly used. You put the truth ahead of comfort, yours and everyone's, every day, in every setting. People bring you the questions nobody else will answer straight, then flinch at exactly what they asked for. The edge never rests. That includes the nights, and it includes you." · (庚 Underfueled): "You keep that edge, under cloth and out of view. Seeing through things is instant for you. Saying so out loud is the part that comes and goes…"
- Sources: REA_03 §3 (v2 bridge, owner 2026-08-14); REA_16 §2c; the D7 ruling (2026-09-20: no assumed history, no flawless-output claim).

**`STEM_BAND.self_card`** · the core element's screen only · portrait · face impersonal, presence second person allowed · face ≤8w · presence ≤30w · LOCKED ×30
- Construct: `face` names the band state in the element's arena ("The edge, never sheathed"); `presence` is being that state, dignified even on the Underfueled band.
- Reasoning chain: the band as a physical state of the material → a noun phrase for it → one or two sentences on living as that state, the cost implied not moralised.
- Style: situational register; the Underfueled band is never a deficit portrait ("A blade that waits is not a blade that dulled").
- Checks: face ≤8w, presence ≤30w, zero dashes, cross-stem 4-gram uniqueness.
- Exemplar (庚 Overfueled): face "The edge, never sheathed" · presence "The cut is always available and mostly used. Clarity this constant is a climate, and the people near you dress for it."
- Sources: REA_03 §3; REA_16 §2c (BAND-C corpus, 2026-08-14).

### 3.3 · ELEMENT_PAIR (×25: 20 relation pairs + 5 self pairs, keyed core element _ energy element; read by both stems of the core element, the yin stem taking `_yin` overrides)

**`ELEMENT_PAIR.mechanism.classic`** · energy page, epigraph above the base · classical · ≤14 characters · LOCKED
- Construct: the 汉字 classical line for this pair's chemistry, decorative texture per the lexicon law (the one surface where a classical quote is allowed in the app). Chosen from the sourced classics, never composed. Exemplar (金_土): 金居石依山，津潤而生. Not an LLM generation target: it is a sourced quotation.

**`ELEMENT_PAIR.mechanism.base`** · energy page detail · classical (ledger) · fully third person · 45–75 words · LOCKED
- Construct: the two-energy chemistry only: what 生 or 克 means in this pair, physically, grounded in the 相生/相克 doctrine (白虎通 / 五行大義 lineage), rendered poetically.
- Reasoning chain: the law sentence and its image line (Earth feeds Metal: ore grows in the mountain) → what physically happens between these two materials → why that seats the energy as this function → stay in the material world.
- Style: no "you", no function claim (the thumbnail and titles teach those), no persona; poetic and descriptive; "the old texts say" is allowed as texture.
- Checks: 45–75w, no second person, zero dashes, the repetition law blocks on this cell (no four-word run shared with the turns, definitions or advice).
- Exemplar (金_土): "Metal is born of earth, the old texts say: it lies in the mountain, gathered in stone, grown by slow pressure and the moisture of deep ground. Nothing hurries it. The mountain holds the ore for ages before any edge is struck from it, and every blade remembers the patience of the rock that made it."
- Sources: REA_16 §2c (v2 register, 2026-09-02); REA_02 §5d; the 金_水 template construct note.

**`ELEMENT_PAIR.mechanism.catalyst_turn` / `friction_turn`** · energy page, the state line (also the carry card's source) · classical, personal · second person allowed · ≤35 words each · LOCKED
- Construct: "Run thin, …" for the catalyst pole and "Run heavy, …" for the friction pole: the elemental image of the state in one clause, what it costs, then ONE directive. The friction turn speaks the shadow of the function.
- Reasoning chain: the pair's chemistry → what the material does when this energy is scarce (catalyst) or in excess (friction) → the reader's version of that → one plain directive that is the remedy the carry card will cut.
- Style: the image belongs to the pair's chemistry, the directive is concrete and small; the turn is the field the carry clause and remedy are CUT from, so it must contain a first clause that stands alone and a directive that stands alone.
- Checks: ≤35w, zero dashes, the repetition law (no four-word run shared with the definition or advice of the same cell).
- Exemplar (金_土 friction): "Run heavy, the shelter closes over the blade: so much preparation that the edge never leaves the mine. Comfort begins to bury what it formed. Dig out and cut something real." · (水_火 friction, 2026-09-20): "Run heavy, the water starts to boil: every bright chance chased, every quick pivot taken, each one costing more recovery than it returns. Let the next hot offer wait a week."
- Sources: REA_16 §2c; REA_02 §5h (the carry law); D1 and B3 rulings 2026-09-20.

**`ELEMENT_PAIR.mechanism_yin`** (`base`, `catalyst_turn`, `friction_turn`) · energy page for the yin stem of the core · same registers and budgets as `mechanism` · LIVE, 19 cells, sparse
- Construct: the same story and the same directive with the yin sibling's noun where the shared line names the yang archetype (stone and wheel for the Jewel, wall and tendril for the Vine, the close flame for the Candle, soil for the Field, mist and cloud for the Rain). Only the fields whose noun does not fit are overridden; everything else inherits.
- Checks: same as `mechanism`; the yin line's echo of the shared line is a lawful match.
- Exemplar (金_土 friction_turn for 辛): "Run heavy, the setting closes over the stone: so much preparation that the jewel never leaves the box. Comfort begins to bury what it formed. Take it out and wear it somewhere real."
- Sources: REA_16 §2c (2026-09-17 ruling 3); REA_02 §5h.

**`ELEMENT_PAIR.function.definition_catalyst` / `definition_friction`** · energy page hero, role-resolved · reading (the B1–B2 zone) · second person · ≤55 words each · LOCKED ×25
- Construct: the opener formula "{Element} is your {Function}, and as a catalyst / as a friction, it is …" followed by a concrete-life inventory of what the function does when it runs right (catalyst) or overgrows (friction). Family-level, no god split. The five Order friction definitions each carry the inner-judge sentence (the pressure ends up turned on yourself).
- Reasoning chain: the function noun → what that function IS in a life (books, mentors, long walks · study, comfort, preparation, shelter) → the state's effect in one plain sentence → an unsparing close.
- Style: understandable without knowing either persona's name; the templated opener is a lawful match across cells; everyday nouns; the repetition law with the same cell's turn, advice and carry.
- Checks: ≤55w, opener formula present, zero dashes, rep-block.
- Exemplar (金_土 friction): "Earth is your Mind, and as a friction, it is intake with no off switch. Study, comfort, preparation, shelter: everything that goes in counts as progress, so nothing ever has to come out. Learning becomes the most respectable way to stand still."
- Sources: REA_16 §2c (function row, AXIS HOMING 2026-09-03, PAIR HARVEST 2026-09-04); REA_02 §5f, §5h (inner judge, 2026-09-17).

**`ELEMENT_PAIR.function.advise_catalyst` / `advise_friction`** · energy page, the reading's last paragraph · reading (B1–B2) · second person, imperatives allowed · ≤60 words each · LOCKED ×25
- Construct: a profound or psychological opening that lands in atomic, habitual advice ("At some point more learning is just fear with a reading list. Trade study for evidence: …"). The reader keeps a practical choice.
- Reasoning chain: name the psychological truth under the state in one sentence → three or four small actions with objects and cadences (once a month, one notebook, a decision date) → end on the smallest one.
- Style: the owner's ruling of 2026-09-20 keeps the authored advice voice everywhere: plain, specific, no metaphor stacking; no chart-derived prescription of investments, careers or medical acts; never a guarantee.
- Checks: ≤60w, zero dashes, rep-block against definition and turn.
- Exemplar (金_土 friction): "At some point more learning is just fear with a reading list. Trade study for evidence: for every hour that goes in, one small thing comes out where someone can see it. Give each research topic a decision date. Finish one old course before any new one gets your money."
- Sources: REA_16 §2c; the 2026-09-20 proof review ("advice: Before wins").

**`ELEMENT_PAIR.cta_verdict`** · the dot card under the definition line · teaser · second person · ≤30 words, one sentence · LOCKED ×25
- Construct: one sentence explaining "{Element} is your {Function}": a behavioural truth plus ONE tendency-framed consequence beat (the prediction law).
- Exemplar (金_土): "Your mind takes things in slowly and keeps them forever, and your best judgments are the ones you let sit overnight."
- Checks: ≤30w, one sentence, zero dashes, B1–B2 zone. Sources: REA_16 §2c (owner formula 2026-09-01); REA_04 §9.4.

**`ELEMENT_PAIR.carry`** (`catalyst`, `friction`, `wide`, `missing`, `spared`, `thin`, `excess`; the self cells also `unrooted`) · Day Master page P4, the carry card rows, and the energy page turn for the wide, missing, spared, thin and excess states · teaser · clause ≤18 words · remedy ≤12 words · LIVE ×25
- Construct: per pole `{clause, remedy}`. `catalyst` and `friction` are CUT from the pair's turn (its first clause and its own directive), never a second copy of the turn's meaning. The state poles are authored at element level (no yin variant needed except where the noun fails): `wide` = wanted and abundant or dominant, the plentiful line, said plainly with one of eight rotated openers and no door metaphor ("You are well supplied with Earth, the ground the ore grows in." · "Wood is already here in plenty, the material the knife is for.") · `missing` = wanted and absent: borrow it · `spared` = unwanted and absent: absent and better so · `thin` = unwanted at ≤10%: kept small · `excess` = dominant, the valence flip: the 渊海子平 excess idiom in English, never quoted · `unrooted` = the core at 0%.
- Reasoning chain: identify the (valence, volume) state → the pair's chemistry under that supply → one clause of ≤18 words that stands alone → one remedy of ≤12 words that is a plain instruction.
- Style: the remedy is a directive, not an image; no signs; the eight wide openers rotate so no core repeats one; the D1 ruling reads 木多火炽 literally (the fire blazes past its task) and the other excess idioms likewise.
- Checks: clause ≤18w, remedy ≤12w, zero dashes and signs, rep-block against the cell's other fields except the lawful carry-from-turn cut.
- Exemplar (金_土): wide "You are well supplied with Earth, the ground the ore grows in." / "Use what the ground gave you. Cut something." · excess "Too much earth clogs the metal: fed past use, the edge stalls, brooding where it should cut." / "Dig out. Less study, one real cut." · missing "No ground under the edge: judgment made on the spot, nothing settled in first." / "Borrow ground: a mentor, a book, one slow evening."
- Sources: REA_02 §5h (2026-09-15, 2026-09-16, D4 amendments 2026-09-20); REA_16 §2c; Batch 1 landing record.

**`ELEMENT_PAIR.carry_yin`** · P4 carry card for the yin stem · same budgets · LIVE, 16 cells, sparse
- Construct: the yin sibling's noun in the carry lines, same mechanism, same directive. Exemplar (金_土 excess for 辛): "Too much earth buries the metal: talent that never surfaces, thought that never becomes a cut." / "Take it out of the box. Cut one thing." Sources: REA_02 §5h (2026-09-16).

### 3.4 · ELEMENT_GOD (×50, keyed energy element _ persona; the K2 depth cell)

**`ELEMENT_GOD.k2_overview`** · the Domains detail, the god sub-block's lead paragraph (Seeker layer) · portrait · second person, opens on "Your {Element}" · 40–70 words · LOCKED ×50
- Construct: what this persona means when it is carried by this element: the persona's current in the element's material, then what it asks of the reader.
- Reasoning chain: the persona's definition line → the element's arena → the `structural_interaction` seed → one image that fuses them (ground that reads before it feeds; a library that shelters) → the persona's cost as the "rent" it asks.
- Style: the persona name appears once with its definition sense; the persona's cost dimension × the element's arena, nothing from another arena; humour is allowed when it communicates pressure, never aggression.
- Checks: 40–70w, zero dashes, the sibling test (the paragraph must not fit the other polarity of the same family).
- Exemplar (土_偏印): "Your Earth carries the Alchemist's current: nourishment that arrives as understanding rather than comfort. This is ground that reads before it feeds, soil that turns experience over slowly until it becomes insight. It shelters you the way a library shelters, quiet, stocked, slightly apart, and it asks one rent: time alone to do the turning."
- Sources: REA_16 §2c, §2b-G; REA_03 §4 (K2 cell construct 2026-08-19).

**`ELEMENT_GOD.k2_functional`** · the Domains god sub-block, rendered as "runs your {Function}: {line}" · portrait · second person · ≤22 words, one line · LOCKED ×50
- Construct: how this persona runs its OWN family function (比劫 Body · 印 Mind · 食伤 Expression · 财 Action · 官杀 Order) in this element's arena. One function per god; effects on other functions belong to TG_PATTERN.
- Reasoning chain: the family function → the persona's temperament of it → the element's texture → one line in kitchen-table words.
- Checks: ≤22w, zero dashes, B1–B2 zone (the 2026-09-20 Batch 3 line: "Your discipline is a strict coach: cut the extras, keep the goal, hold the line for years.").
- Exemplar (土_偏印): "Thinking runs deep and sideways. You digest slowly, connect strangely, and surface with conclusions no straight line could have reached."
- Sources: REA_16 §2c (re-ruled 2026-09-01); REA_02 §5f god grain.

**`ELEMENT_GOD.adj_chips`** · the element dot card · chip · impersonal · 1–3 words each, three per pole · LOCKED ×50 (300 chips)
- Construct: `{catalyst: [3], friction: [3]}`: the persona's classical portrait, textured by the element, in high-school vocabulary. Authored order is significance order (the ledger's rank).
- Reasoning chain (THE KEYWORD DERIVATION CHAIN): (1) start from the persona's classical 心性 portrait and pass the sibling test (a chip that fits both 偏 and 正 is not god-derived enough); (2) texture by the element's arena; (3) the angle law: three chips are three distinct dimensions (process, presence, tempo, appetite, limit), never synonyms; (4) the pole (catalyst gift, friction cost-first); (5) a word a high-school reader knows cold (Withdrawn, Overprepared, never Sardonic or Ossified). Single precise word preferred; a 2–3 word phrase only for a fixed idiom (Plays it safe) or to replace jargon (Stuck for Root-bound); an edge word (Fickle, Brooding, Contrarian) only when short, punchy and glossed by the ledger.
- Checks: ≤3w each, unique within the same-element sibling pair, B1–B2 zone, no report-card register.
- Exemplar (土_偏印): catalyst Deep-reading · Unhurried · Inventive; friction Withdrawn · Brooding · Overprepared.
- Sources: REA_16 §2c (the vocabulary zone 2026-09-04, the derivation chain 2026-09-03).

**`ELEMENT_GOD.fn_reading`** (the three-door ledger) · energy page, between the definition and the advice; the rows are picked by face weight and the doors by position rotation · ledger · second person · 35–55 words per door passage · LOCKED ×50 (792 passages)
- Construct: per pole, three rows index-aligned to `adj_chips`, each `{word, doors:{trait, scene, outside}}`. Trait opens on the trait claim ("Taking things in whole is how your mind works"). Scene opens inside a real-life example with objects and clock time ("One book, read twice, with notes in the margins the second time through"). Outside opens from how others see it and what it costs or pays ("People mistake your pace for being behind, right up until…"). Every beat is a full sentence with verbs; the example is USED, not displayed (the sentence itself says what the example proves).
- Reasoning chain: the chip → what it IS for the person (a feature, a tendency, a habit, named as such) → one scene with objects and a clock time → the turn to the cost or the payoff → write the same content three times from the three doors so any row works at any blend position.
- Style: B1–B2 zone; fragments ≤1 per passage; aphorisms ≤1–2 per assembled reading; endings vary; a scene is a representative situation, never a claimed memory, never another person's private thoughts, never a confirmed prediction, never a safety-critical procedure as proof of character.
- Checks: 35–55w per door, zero dashes, the sibling test, no banned register.
- Exemplar (土_偏印 · Overprepared · scene): "Seventeen browser tabs, two saved courses, a notebook full of plans. The project they all point at has not moved in a month, but the researching of it has never gone better. One more book, you tell yourself, and the telling sounds exactly like last time."
- Sources: REA_16 §2c (THE THREE DOORS 2026-09-03, corpus 2026-09-04); the B7 and B8 rulings 2026-09-20.

**`ELEMENT_GOD.k2_domain_readings`** · the Domains detail, one paragraph per ruled domain of the persona (Seeker layer) · portrait · second person · 18–55 words each · LOCKED ×50
- Construct: one paragraph per domain word on the persona's `domains` list (the Alchemist: Learning, Intuition, Solitude; the Sage: Knowledge, Shelter, Nurture), the persona's business in that domain through this element, ending on one practical line.
- Reasoning chain: the domain word → what the persona does there → the element's texture → the cost or the care → one plain instruction or observation to end.
- Style: where a family or care history could be implied (the Nurture readings), the shape is conditional and symmetrical ("Where care came early, you draw on it without thinking. Where it was missing, you became the ground yourself."), never an invented origin; Wealth readings carry no solvency promise and no prescribed holdings.
- Checks: 18–55w each, zero dashes, keys equal the persona's domain words.
- Exemplar (土_偏印 · Solitude): "Time alone is this energy's rent, and it collects whether you schedule it or not. Taken on purpose, solitude turns into your best material. Taken by accident, it curdles into distance from the people who were waiting outside the study."
- Sources: REA_16 §2c; REA_02 §5e (domain taxonomy); Batch 3 landings 2026-09-20.

### 3.5 · GOD (×10, persona level; mostly V-class)

**`GOD.definition_line`** · every first surfacing of a persona · functional · ≤12 words, comma-joined, dashless · LOCKED ×10 (REA_02 §2, D8 ruling 2026-09-20). Exemplar: "Unconventional nourishment, the insight that transmutes". Not a generation target.

**`GOD.face_kw` ×3 and `GOD.face_teaser`** · not rendered on the journey since the faces merge (2026-08-19) · portrait · second person · teaser 45–50 words (R5 scope open) · sign-free since 2026-09-21. Construct: three lowercase keywords and one paragraph on the persona at the person, closing on the watch-point. Exemplar (偏印): "You feed on the strange and the oblique. Understanding tends to arrive sideways, rarely on cue…". Not a test target until R5 is ruled.

**`GOD.family_brief`, `family_clause`, `family_element`** · functional glue for the energy manual ("your support & nourishment", "the ground you're built on") · V-class. **`GOD.adj_catalyst` / `adj_friction`** · god-grain fallback tables, superseded by `ELEMENT_GOD.adj_chips`; dead at runtime.

### 3.6 · POSITION (×70, persona × slot; the named events)

**`POSITION.defline`** · the first surfacing of the named event · carved · third person about the persona, "your" allowed · ≤25 words · LOCKED ×70
- Construct: the persona placed at or inside its gate and what it does there. Exemplar (偏印在月支): "The Alchemist holds your chart's strongest seat, the month branch, and does its thinking from the middle of your working life."
- Checks: ≤25w, zero dashes, the term form "{Persona} at|inside the {Gate}" (stem = at, branch = inside).

**`POSITION.teaser`** · the dot card · therapist-psychic · second person · ≤30 words, one line · LOCKED ×70
- Construct: [a personality truth: persona nature × gate arena, in "you" language] + [ONE predictive beat: era, relations or domain of the gate, tendency-framed].
- Style: natural spoken syntax, a therapist or psychic to a friend; no jargon past the persona name the row already shows.
- Exemplar: "Your mind works in private, on things most people find strange, and that is exactly where your career luck lives. The niche will pay what the mainstream never will."
- Sources: REA_04 §9.4; REA_16 §2c.

**`POSITION.reading`** · the seat panel's summary · therapist-psychic (v2) · second person · 80–115 words · LOCKED ×70
- Construct (the §9.5 ladder): sentence one DECLARES the two or three ruled domains from the eight ("This position rules Mind, Growth, and Career, and it rules them from the deepest seat your chart has.") → the shown or hidden face (stem or branch) → the era claim (when this seat runs the show) → the relations claim (through whom) → the counsel line.
- Reasoning chain: gate ground × slot kind × persona nature → which domains it rules → how the persona behaves in that arena → when in life it concentrates → through whom it arrives → what to do about it.
- Style: declarative, warm, unhedged; every predictive beat is tendency-framed; no dates; no classical quotes; the persona name once.
- Checks: 80–115w, declaration sentence first, zero dashes.
- Exemplar (偏印在月支): "This position rules Mind, Growth, and Career, and it rules them from the deepest seat your chart has. The Alchemist lives inside your Month Gate, hidden in the engine of your prime: your working life runs on private study, sideways insight, and an appetite for what most people overlook. Colleagues see the results and rarely the method…"
- Sources: REA_02 §5e; REA_04 PART 9; REA_16 §2c.

**`POSITION.domain_readings`** · the seat panel, one dedicated paragraph per declared domain (a Wealth reading is not a Love reading) · therapist-psychic · second person · 35–60 words each · LOCKED ×70 (~172 paragraphs)
- Construct: the persona's business in that one domain from that gate, ending on counsel. A triggered TG_PATTERN weaves its analysis into the matching domain paragraph at render.
- Exemplar (Growth): "You grow in leaps disguised as stillness: long plateaus of gathering, then a step-change nobody saw building. Do not measure yourself against steady climbers. Your curve is a staircase, and the landings are where the real work happens. Keep faith on the flat stretches."
- Checks: 35–60w, keys equal the declared domains, zero dashes.

**`POSITION.life_chapter`** · the seat panel · therapist-psychic · second person · 35–60 words · LOCKED ×70
- Construct: the gate's era read with the persona's colour, labelled with the chapter name (Early, Rising, Home, Late Chapter). Exemplar: "Your rising chapter runs underground: the years from adolescence through your thirties look quiet from outside while the real construction happens within…" Style: an era is a tendency, never a dated event.

**`POSITION.relations`** · the seat panel · therapist-psychic · second person · 30–55 words · LOCKED ×70
- Construct: through whom this seat arrives: the gate's people (ancestors · parents, siblings, colleagues · the spouse · children, students, heirs) crossed with the persona's person. Exemplar: "An unconventional teacher or guardian marks this seat's people: care that arrived as instruction, or a mentor found off the official path…" Style: never asserts a specific person existed; "expect", "marks this seat's people".

**`POSITION.turn_catalyst` / `turn_friction`** · the seat panel, band-resolved like the mechanism turns · therapist-psychic · second person · ≤30 words each · LOCKED ×70
- Construct: "Run thin, the seat asks for …" / "Run heavy, … here" with one directive. Exemplar: "Run heavy, thought eats action here: research becomes the errand that never ends. Ship one thing before the next book."

**`POSITION.shadow_line`** · renders always · ≤30 words · the persona's dark face in that gate, one line ("Overloaded, insight sours into suspicion: reading motives where there is only weather."). **`POSITION.health_line`** · ≤30 words · wellness register, non-medical: the seat's body correspondence in gentle tendency language ("Thinking seasons tax the body here: appetite and sleep thin when the mind runs long. Anchor both with routine…"); never a symptom assigned as fact, never a diagnosis.
- Sources for 3.6: REA_02 §5e; REA_04 PART 9; REA_16 §2c (POS-D corpus, owner 2026-08-19).

### 3.7 · TG_PATTERN (×9, conditional; woven into the seat's matching domain paragraph)

**`TG_PATTERN.line`** · Codex ore and the catalogue takeaway strip · therapist-psychic · second person · ≤40 words · LOCKED ×9
- Construct: the compact chemistry note: the two personas share the chart and what their contest does, then the cure in one clause. Exemplar (枭神夺食): "The Alchemist and the Artisan share your chart, and they compete: too much theory starves your ease. When output stalls, the cure is one finished thing made with your hands, and fewer perfect plans."

**`TG_PATTERN.reading`** · woven into the seat's first matching domain paragraph · therapist-psychic · second person · 45–70 words · LOCKED ×9
- Construct: pure you-language analysis of the pattern's effect, no classics, no persona mechanics, structural cure, one health note where the classics carry one. Exemplar: "One catch runs underneath: your own analysis can starve your output. Projects polish in private until the moment passes, and the drawer of nearly finished things grows. The cure is structural, deadlines you did not set, collaborators who ship, one craft done with the hands. In heavy thinking seasons, watch sleep and appetite first."
- Style: it must read as a continuation of the domain paragraph it joins (opens "One catch runs underneath", never with the pattern's name).

**`TG_PATTERN.fused_line`** · appended when both sides share one pillar · ≤25 words · "In you they share a single pillar, so the tug is constant: guard your finishing rituals fiercely."
- Sources for 3.7: REA_02 §5g; REA_16 §2c (owner 2026-08-19).

### 3.8 · Non-targets (fixed by law; supplied to the generator as vocabulary, never generated)

- **CONDITION** (Overfueled · Balanced · Underfueled · Channel · Refill): terms, definition lines, condition tails and fold verdicts are LOCKED V-class (REA_02 §5c). The glossary bodies are composed at runtime from them.
- **FAMILY** (Core · Root · Drive · Voice · Duty): retired from live surfaces 2026-09-02; the function nouns replaced them (REA_02 §5f).
- **ELEMENT** (`energy_tile_hook`, `energy_tile_tag`): interim, unrendered since the hero redesign (2026-09-01).
- **TEMPLATED** ×21 (`tpl_carry_lead`, `tpl_carry_row`, `tpl_element_verdict`, `tpl_dx_line`, `tpl_pool_bridge`, …): sentence patterns slot-filled from vocabulary and derived values only (REA_03 §5, §10 rule 3). No free text inside slots.
- **STEM.archetype_name, pinyin_display, door_note; GOD.persona_name, domains, keyword, charge, poles; POSITION.term, term_zh, gate, slot_kind, domains; TG_PATTERN.name_zh, name_en, trigger_gods, target_domains**: locked names and metadata (REA_02 §2, §5e, §5g).

### 3.9 · Code-resident content outside the station (for completeness)

- **Daily narratives ×5 and DO/AVOID lists** (`dailyGuidance`): almanac register, 2–4 sentences, instructive allowed, mechanism-named, cost-aware, warm but unhedged, slots for the day's element. Locked dial B (owner 2026-08-05). Exemplar (officer day): "Today's {today} energy is the one that disciplines your chart, and it's live. The pressure isn't personal, it's structural. It selects for what holds. Work on the thing that's being measured, and leave the unmeasured for a softer day."
- **Consultant charter** (`workers/llm VOICE_CHARTER`): the conversational confidant register bound to the same canon, 40–120 words per turn (INF_01 §4.3).

---

## §4 · Running a like-for-like comparison with this pack

1. **Fix the fields.** Pick the fields to test from §3 (the P4 and energy-page fields carry most of a reading: `STEM_BAND.yourNature_desc`, `STEM.gifts/shadows` items, `ELEMENT_PAIR.function.*`, `ELEMENT_PAIR.carry.*`, `ELEMENT_GOD.fn_reading` doors, `ELEMENT_GOD.k2_domain_readings`, `POSITION.reading`).
2. **Fix the cells and states.** Use the golden chart (庚 Overfueled) and two contrast charts from the selection fixtures (weak 丁 with one Order door; 辛 Overfueled with heavy Earth) so each model writes the same cells under the same valence and volume.
3. **Fix the inputs.** Hand every model the §1 master prompt, the §2 input pack for the axis (filled from the station files, not from memory), and the §3 card. Same text, same order.
4. **Gate first.** Run every candidate through the mechanical checks (the §1 list; `tools/voice-audit.mjs` rules for that field's registry row). Failures are not compared.
5. **Read second.** Score the survivors and the shipping original together, blind, on the four questions of the 2026-09-17 evaluation pack: meaning (same feature, cost or feeling as the source mechanism), reasoning (traceable to the correct axis and state), reading (understood on first read, sayable about oneself), scope (a tendency or example, not a claimed event, a private thought or a guaranteed outcome). Then the three readers.
6. **Record per candidate:** field path, cell, state, model, original, candidate, gate result, read result, status (retain original · adopt · revise · unresolved). Nothing lands in the station from a test run without the owner's row-by-row ruling and the usual pipeline (REA_05 §1).

---

## Document Metadata

| | |
|---|---|
| **Document** | REA_17 — The Generation Prompt Pack (master prompt · input pack · field cards) |
| **Version** | 0.2 · 2026-09-21 (after the blind replication test, Feedbacks/Deliverables/llm-ab-test-2026-09-21/01_PROMPT_REPLICATION_TEST.md: output contract, stated-missing-inputs rule, the self pair's wide face, the excess idiom sets, the eight wide openers, the ten classical portraits, the two angle drifts to refuse) · 0.1 · 2026-09-21 (reverse-engineered at head `28ea4882`) |
| **Status** | DRAFT. Defines nothing new: compiles REA_01–REA_06, REA_16 and the station template cells into prompts. On any disagreement the source doc wins and this doc is corrected. |
| **Companions** | REA_16 (voice canon and audit registry) · REA_03 (variables and budgets) · REA_02 (vocabulary) · REA_04 (sources, PART 8 translation protocol, PART 9 positioning) · REA_05 (station and pipeline) |
| **Audience** | Anyone generating or comparing reading content: owner, authors, external models under test |
