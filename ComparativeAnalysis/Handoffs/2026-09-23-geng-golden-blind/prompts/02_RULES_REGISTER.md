# 02 · THE RULES REGISTER (every rule the prompts state, explicit, with its source and its enforcement)

_Prompt file (data). One row per rule. "Gate" says whether `ComparativeAnalysis/Prompts/validate.mjs` (the harness) or `Elementum_App/tools/voice-audit.mjs` (the station audit) enforces it mechanically, or whether the read decides. "Status" says whether the rule was explicit in its source before 2026-09-21, or was implied and is made explicit here. Where this file and a source document disagree, the source wins and this file is corrected. Owner's ask, 2026-09-21: every rule documented explicitly; the ones surfaced by the six violated texts are marked IMPLIED → EXPLICIT._

## A · Vocabulary (REA_16 §1b; REA_02 §1, §2, §8; REA_04 PART 8 §8.9)

| # | Rule | Source | Gate | Status |
|---|---|---|---|---|
| A1 | One concept, one name: only the canonical names (ten natures, ten personas, Core, Catalyst, Friction, the three bands, Channel, Refill, the five functions, the four gates, the eight domains, Life Chapters) | REA_02 §1, §2 | read (the harness flags BaZi labels, A3) | explicit |
| A2 | No Chinese characters and no romanised terms in output (BaZi, Day Master, Four Pillars, dayun, liunian) | REA_04 §8.9; REA_16 §1b | harness (Chinese character; BaZi label list) · voice-audit (partial) | explicit |
| A3 | No structural labels (Ten Gods, Seven Killings, Direct Officer, Indirect Seal, Rob Wealth, Food God, Hurt Officer, Parallel Self, useful god, favourable element, wealth star) | REA_02 §2; REA_04 §8.9 | harness | explicit |
| A4 | No astrological or mystical register (zodiac, cosmic, fate, destiny, karmic, the universe as an agent, manifesting, aligned, vibration, astrology, horoscope, celestial) | REA_04 §8.9; REA_16 §1b, §3 bans | harness | explicit |
| A5 | No hollow affirmations: "you are destined for", "empowered", "fundamentally", "at your core", "in essence", "genuinely", "You are someone who" as an opener | REA_04 §8.9 | harness (added to the banned list 2026-09-21; voice-audit does not carry it) | explicit in REA_04; IMPLIED → EXPLICIT in the gate (violation 1: piancai_day_branch.reading) |
| A6 | No AI-cluster words (delve, tapestry, testament, pivotal, crucial, intricate, robust, seamless, foster, underscore, showcase, leverage, boasts, vibrant, nestled, profound, realm, unlock, elevate, resonate, resonance, navigate, landscape, journey as a life metaphor) | REA_16 §1b, §4 | harness · voice-audit | explicit |
| A7 | No courtroom tier (verdict, legitimate, legitimacy, institutional) | REA_16 §1b (owner 2026-08-05) | harness · voice-audit | explicit |
| A8 | No report-card register (diligent, exemplary, enterprising, meticulous); the friend's word lands (Bossy, not Domineering) | REA_16 §2c THE VOCABULARY ZONE; REA_04 §8.9 | harness | explicit |
| A9 | No therapy jargon, no slang, no doom | REA_16 §2, §3 bans | read | explicit |
| A10 | No reflex hedging: "you may feel", "tends to be", "sometimes you", "often you", "perhaps". A frequency word inside a claim or a directive ("often by way of the kitchen", "write things down early and often") is lawful; the read judges it | REA_16 §3 bans, narrowed by the owner 2026-09-21 (ruling Q0); the 2026-09-17 pack allows can / when / if where meaning needs them | harness (reflex forms only) · read (the rest) | RULED 2026-09-21 |
| A11 | The plain word beats the precise one (the read, not the assessment; noticing, not discernment; the mix, not the configuration; what works, not optimal) | REA_16 §1b replacement table | read; the reader-zone check names the words | explicit |
| A12 | "room" is rationed corpus-wide: avoid it | REA_16 §1b | harness · voice-audit | explicit |
| A13 | The function page (definitions, advice, chips, the three-door ledger, the dot-card line, k2_functional) stays in the CEFR B1–B2 zone; chips in high-school vocabulary | REA_16 §2c THE VOCABULARY ZONE (owner 2026-09-04) | harness reader-zone check (chips block on any outside word; prose blocks past the corpus ceiling of 14 per 100 words) | explicit; the word-level check is new 2026-09-21 |

## B · Syntax (REA_16 §1b, §4)

| # | Rule | Source | Gate | Status |
|---|---|---|---|---|
| B1 | Zero em-dashes, zero semicolons, zero arrows or glyphs, anywhere; colons only to open a ledger definition | REA_16 §1b, §4 (owner purge 2026-08-05) | harness · voice-audit | explicit |
| B2 | Sentence lengths span a threefold range inside a paragraph; one ordinary, unquotable sentence per paragraph | REA_16 §1b, §4 | guidance (soft, owner 2026-09-23): the read notices, the gate does not fail it | explicit |
| B3 | No negative parallelism ("not X but Y"), no mirror aphorisms, no reflex triads, no participial interpretation tails | REA_16 §4 | harness · voice-audit (parallelism); read (the rest) | explicit |
| B4 | Plain Anglo-Saxon verbs; "is" stays "is"; concrete nouns over abstractions; one idea may stay unresolved; fragments ≤1 per door passage | REA_16 §1b, §4; §2c THE THREE DOORS | guidance (soft, owner 2026-09-23) | explicit |
| B5 | Endings vary; never three tied bows in a row | REA_16 §4 | guidance (soft, owner 2026-09-23) | explicit |

## C · Person, opener, budget (REA_16 §2, §2c; REA_03 §3)

| # | Rule | Source | Gate | Status |
|---|---|---|---|---|
| C1 | Carved lines and portraits speak to the reader (You); the ledger speaks of the energy or the sign; the almanac of the day | REA_16 §1b, §2 | harness (you-open, no-you, the-open per card) · voice-audit | explicit |
| C2 | Imperatives banned in carved lines and portraits, allowed in advice, remedies and the almanac; contractions welcome in portraits and the almanac, sparing in the ledger, absent from carved lines | REA_16 §2 | read | explicit |
| C3 | Every field keeps its budget, minimum and maximum both hard (owner 2026-09-23; `06_CAPS_BY_PAGE.md`); openers where the card demands one ("You", the archetype name, "Run thin," / "Run heavy,", "This position rules", the definition formula, "Your {Element}") | REA_16 §2c budgets; the field cards | harness · voice-audit (budgets) | explicit |
| C4 | The five self pairs open their definitions on the core's own volume: "{Element} is your Body, and running thin / running over, it is …" | the station's five self cells; REA_02 §5h | harness | IMPLIED → EXPLICIT (REA_17 v0.3, 2026-09-21) |

## D · Claims and scope (REA_17 §1; the 2026-09-17 pack; the D7, B3, Batch 3 rulings of 2026-09-20)

| # | Rule | Source | Gate | Status |
|---|---|---|---|---|
| D1 | The engine owns every number: no percentage, rank, role word or ordering in authored copy unless the card says the field carries it | REA_03 §10 rule 3; REA_17 §1 | read | explicit |
| D2 | No asserted biography (a past event, an age, a decline from an earlier self), no private thoughts of others, no guaranteed outcome (solvency, flawless work, fertility, affection, vindicated intuition) | the 2026-09-17 pack "Four questions" and "Directness, scenes and certainty"; the D7 and Batch 3 rulings 2026-09-20 | harness read flags (decline words, dated claims, guarantees); read | explicit |
| D3 | A representative scene with ordinary objects and a clock time is welcome; a claimed memory is not | the 2026-09-17 pack | harness (scene door check); read | explicit |
| D4 | One predictive beat where a field carries it, tendency-framed, tied to an era, a relation or a domain, never a date | REA_04 §9.4; REA_16 §2c teaser rows | harness (dated claim); read | explicit |
| D5 | A band is a state of the core's supply, never a portrait of giving away; the unwitnessed-martyr angle belongs to 丙, 己 and 庚 only, each differently | REA_16 §2b; REA_17 v0.2 "two drifts to refuse" (T5 replication drift) | read (the harness flags decline wording) | explicit |
| D6 | Advice leaves the reader a practical choice: no chart-derived prescription of investments, careers or medical acts; health lines never assign a symptom or a diagnosis | the 2026-09-17 pack; REA_16 §2c health_line row | harness (prescription and medical patterns); read | explicit |

## E · Imagery and angle (REA_16 §2b, §2b-G)

| # | Rule | Source | Gate | Status |
|---|---|---|---|---|
| E1 | Each nature draws imagery from its own arena only; cross-arena imagery is a violation; no staging phrase repeats across natures | REA_16 §1b (4), §2b | read; cross-stem four-gram (E3) | explicit |
| E2 | Each nature owns one cost dimension; a stem never borrows a neighbour's angle (癸 porousness not depletion; 壬 containment not neglect; 辛 the inward standard not 庚's isolation) | REA_16 §2b; REA_17 §2.2 | read | explicit |
| E3 | The swap-gram fields (manifesto, inscription, yourNature_desc, the band portraits, self_card) share no four-word run across stems | REA_16 §2c `swap-gram` | harness · voice-audit | explicit |
| E4 | Exemplars are corpus, not scaffolds: an exemplar's wording belongs to its cell; a generator may not reuse its four-word run in another stem's field ("You are what the sword is like…" is the Blade's line) | REA_17 §0 rule 8 (2026-09-21), from E3 | harness (cross-stem four-gram; exemplar withheld when it is the cell under test) | IMPLIED → EXPLICIT (T5 re-gate 2026-09-21) |
| E5 | An element-by-persona cell speaks the persona's cost in the element's arena and must not fit the sibling persona | REA_16 §2b-G, §2c THE KEYWORD DERIVATION CHAIN (the sibling test) | harness (chips against the sibling cell); read | explicit |

## F · Repetition and derivation (REA_16 §7; REA_02 §5h)

| # | Rule | Source | Gate | Status |
|---|---|---|---|---|
| F1 | No phrase repeats across the fields of one cell on one page (definition · turn · advice · remedy); mechanical form: no four-word run shared by two fields of one ELEMENT_PAIR cell, stop-word-only runs ignored | REA_16 §7 (owner 2026-09-20, narrowed the same day) | harness (blocking on the pair cards) · voice-audit (inventory until `rep-block`) | explicit |
| F2 | Lawful echoes: the carry line cut from its turn, the yin sibling's line cut from the shared line, the two definitions' templated opener, a chip cut from the definition its `echo_of` names | REA_16 §7; REA_02 §5h | harness (exempt pairs) | explicit |
| F3 | A carry clause and remedy are CUT from the pair's turn (its first clause and its own directive); for a yin stem, from the yin turn where the cell carries one | REA_02 §5h (2026-09-15/16); REA_16 §2c carry_yin row | harness (cut check) | explicit for `carry`; IMPLIED → EXPLICIT for `carry_yin` against `mechanism_yin` (violation 6: 金_木) |
| F4 | Every pool item is cut from the pair field its `echo_of` names, same mechanism, the source's key noun or action still recognisable | REA_16 §7 | harness (echo_of resolves); read (the mechanism) | explicit |

## G · Chips and pools (REA_16 §3 pool laws, §7)

| # | Rule | Source | Gate | Status |
|---|---|---|---|---|
| G1 | Pool shape 7 + 7, one echo face per door on each side, Body and Mind doubled (wide gift from carry.wide, excess shadow from carry.excess or carry_yin.excess); the self pair's wide gift is cut from its definition_catalyst | REA_16 §7; REA_02 §5h | harness · voice-audit (partial) | explicit |
| G2 | Phrase law v6: a chip names the symptom, never a prescription or a bare image; ≤3 everyday words anchored by a noun or verb, or one of the admitted four-word idioms; its valence reads alone; unique across the ten pools; never equal to the dim; no shared root with another chip on its card | REA_16 §7 step 4 (owner 2026-09-20, 2026-09-21) | harness · voice-audit (length, uniqueness, phrase ≠ dim); the owner's cold read (valence) | explicit |
| G3 | The dim is the life-facet angle, ≤4 words, unique within the pool, never a restatement of the phrase | REA_16 §3 dimension law v3, §7 step 5 (≤3 until the owner widened it 2026-09-21, ruling Q2) | harness (length, uniqueness, ≠ phrase) · voice-audit (uniqueness, ≠ phrase; not length) | RULED 2026-09-21 |
| G4 | The desc is 1–4 sentences, B1–B2 vocabulary, one concrete image, the source's key noun still inside it | REA_16 §7 step 3 (1–3 until the owner widened it 2026-09-21, ruling Q3) | harness (sentence count) · voice-audit does not carry it | RULED 2026-09-21 |
| G5 | A gift is a capability of the material that holds on any chart of that stem; a shadow is the function overgrown, never underuse | REA_16 §2c gifts and shadows rows (owner 2026-09-15) | read | explicit |
| G6 | adj_chips: three chips per pole are three distinct dimensions, high-school words, unique against the sibling cell, no report-card register | REA_16 §2c THE KEYWORD DERIVATION CHAIN, adj_chips row | harness | explicit |

## H · Structure and process (REA_17 §0; REA_05 §1)

| # | Rule | Source | Gate | Status |
|---|---|---|---|---|
| H1 | Structure is input: the generator never proposes a field, count, door, persona or domain; the output is the station's shape | REA_17 §0 rules 1, 3 | harness (shape checks) | explicit |
| H2 | Inputs come from the station and the engine; a generator that fills a gap from its own BaZi knowledge has left the test; missing inputs are stated in words | REA_17 §0 rules 2, 7 | harness (the input pack) | explicit |
| H3 | The reasoning is rooted in the classical canon REA_04 cites (滴天髓, 三命通会, 子平真诠, 穷通宝鉴, 渊海子平, 白虎通, 五行大義), read through the ten equations and the five functions; no other school's interpretation enters a card | REA_04 PARTS 2–4, 6; REA_02 §5d; owner 2026-09-21 (the reasoning chain and classic sourcing stay standard across models) | read (question 2, reasoning) | explicit in REA_04; stated as a standing rule here 2026-09-21 |
| H4 | The mechanical gate runs first; a failing candidate is not compared; the shipping original runs through the same gate and its failures are findings for the owner | REA_17 §0 rules 4, 5; §4 | harness | explicit |
| H5 | Nothing lands in the station from a run without the owner's row-by-row ruling and the REA_05 §1 pipeline; rewrites live under `Reading/Database/Rewrites/<model>/` | REA_05 §1; REA_17 §4; owner 2026-09-21 | process | explicit |
| H6 | The output contract: the JSON shape in the task line, "JSON only" repeated last, structured output where the API has it, an optional `_trace` key | REA_17 §0 rule 6 | harness (JSON parse; `_trace` stripped) | explicit |

## The six violated texts (2026-09-21 self-test) and the rule each makes explicit

| Violation | Text | Rule | What the fix would make explicit |
|---|---|---|---|
| 1 | `POSITION/piancai_day_branch.reading`: "your fortune genuinely likes it that way" | A5 | the hollow-affirmation list is enforced mechanically on POSITION prose, not only listed in REA_04 |
| 2 | `STEM/ding` dims "the work you pick", "the edge of attention" | G3 | dim length ≤3 is audited, not only stated in the derivation prompt |
| 3 | `STEM/xin` descs of four sentences (Polishes forever, Sharp tongue) | G4 | desc length 1–3 sentences is audited |
| 4 | `ELEMENT_GOD/水_七杀.k2_domain_readings.Command`: "Show the hand sometimes" | A10 | either the hedge list is mechanical everywhere, or "sometimes" as a frequency in an instruction is ruled lawful and the list narrows to reflex hedges |
| 5 | `ELEMENT_GOD/木_偏财.k2_domain_readings.Father`: "the roots he may have skipped" | A10, D2 | same as 4, plus: a hedge does not license a biography claim; the conditional shape of the Nurture readings is the model |
| 6 | `ELEMENT_PAIR/金_木.carry_yin.catalyst` vs `mechanism_yin.catalyst_turn` (wheel and stone vs point and piece) | F3 | the yin carry line is cut from the yin turn, so a cell that overrides the turn overrides the carry clause with it |

## The rulings (owner, 2026-09-21, questionnaire Q0–Q8)

| Q | Ruling | Landed |
|---|---|---|
| Q0 | The hedge rule narrows to reflex forms; frequency words inside a claim or a directive are lawful | A10 above; the gate's hedge pattern; REA_16 §3 bans line; the seven flagged lines stand |
| Q1 | The hollow-affirmation list stays mechanical; the three words are cut | piancai_day_branch.reading · 水_食神 Fluent trait door · shishen_year_branch Health ("a friendly one") |
| Q2 | Dim law ≤4 words | G3; REA_16 §7 step 5; the two 丁 dims stand |
| Q3 | Desc law 1–4 sentences | G4; REA_16 §7 step 3; the two 辛 descs stand |
| Q4 | (under Q0) "Show the hand sometimes" stands | |
| Q5 | 木_偏财 Father re-cut to the conditional shape | station and k2.js |
| Q6 | 金_木 carry_yin.catalyst.clause cut from the yin turn | station and pairs.js |
| Q7 | 木_偏财 catalyst chip Enterprising → Deal-maker (ledger row word with it) | station and k2.js; A8 unchanged |
| Q8 | zhengcai_year_stem turns re-cut to the opener formula | station and positions.js; C3 unchanged |

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born: every rule the master prompt and the cards state, with source and enforcement; six implied rules marked from the self-test | owner's ask 2026-09-21 |
| 2026-09-21 | A10 narrowed to reflex hedges; G3 ≤4 words; G4 1–4 sentences; the rulings table Q0–Q8 | owner's questionnaire rulings 2026-09-21 (REA_16 §6) |
| 2026-09-23 | B2, B4, B5 and the rhythm temperament become guidance (the freedom clause); C3 minimums hard; H3 restated for the handoff | owner 2026-09-23 (the handoff readiness check) |
