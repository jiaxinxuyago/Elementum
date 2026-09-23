# 01 · THE INPUT PACK (what is handed over per axis)

_Prompt file (data). The facts a generator receives per axis, all from the station or the engine, never from memory. Every chart-derived value comes from one calculation model (`Elementum_App/src/engine/calculator.js` → `buildEnergyChart` → the journey model), read back by `ComparativeAnalysis/Prompts/chart.mjs`; no other source of chart variables exists. Born 2026-09-21 from REA_17 v0.3 §2._

---

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

---

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 §2 | compilation, no new rule |
