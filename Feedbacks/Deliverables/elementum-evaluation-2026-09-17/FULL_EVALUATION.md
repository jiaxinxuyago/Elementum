> CURRENT REVIEW NOTE (2026-09-18): This document preserves the first-pass evaluation or earlier comparison candidates. Read [00_START_HERE.md](./00_START_HERE.md), [SYSTEM_ALIGNED_REASSESSMENT.md](./SYSTEM_ALIGNED_REASSESSMENT.md) and [LANGUAGE_USE_RECOMMENDATIONS.md](./LANGUAGE_USE_RECOMMENDATIONS.md) first. They supersede conflicting recommendations here, including blanket scene restrictions, dominant-only excess faces, global yin imagery changes, persona renaming and mandatory trait replacements. Original scores have not been re-rated.

# Elementum full evaluation

**Decision: do not release this reading corpus unchanged.** The requested editorial evaluation is complete. This report covers all ten stems, all 140 traits, all 25 energy pairs, all ten personas, and 14 of the 50 element × god cells. It also checks the required two chart assemblies and two additional synthetic edge cases against current code.

Review date: 2026-09-17 (America/New_York); finalized after midnight UTC. Code snapshot: `0104bd85976a6851d2f9a2591b59bed04c5f6ccb`. Production files were not changed. The review pack and current station differ; findings below identify that distinction.

This is a source-informed editorial and implementation review, not practitioner certification or validation that birth charts predict personality. Classical fidelity means fidelity to the cited symbolic framework. Psychological plausibility means a mechanism is recognizable, not that its assignment to a chart is established. C3 measures textual specificity only; empirical discrimination between chart groups remains untested. Vocabulary assessments are editorial, not formal CEFR certification.

## 1. Scorecard

C1 classical fidelity · C2 psychological plausibility · C3 specificity · C4 language · C5 voice · C6 coherence · C7 distinctiveness · C8 care. Scale 1–5; 3 is acceptable with reservations, below 3 requires repair. Rows are holistic unit judgments. Means give each of the 59 requested units equal weight; the 140-item appendix is not double-counted.

| File | Unit | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 01 | 甲 | 3 | 2 | 2 | 3 | 2 | 2 | 3 | 2 |
| 01 | 乙 | 3 | 3 | 2 | 3 | 2 | 2 | 3 | 3 |
| 01 | 丙 | 2 | 2 | 2 | 2 | 2 | 2 | 3 | 2 |
| 01 | 丁 | 2 | 2 | 2 | 3 | 2 | 1 | 3 | 2 |
| 01 | 戊 | 3 | 2 | 2 | 3 | 2 | 2 | 3 | 2 |
| 01 | 己 | 3 | 2 | 2 | 2 | 2 | 1 | 2 | 2 |
| 01 | 庚 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 3 |
| 01 | 辛 | 3 | 2 | 2 | 2 | 2 | 2 | 3 | 2 |
| 01 | 壬 | 3 | 3 | 2 | 3 | 2 | 2 | 3 | 3 |
| 01 | 癸 | 3 | 2 | 2 | 2 | 2 | 1 | 2 | 2 |
| 02 | 木_木 | 3 | 2 | 2 | 3 | 2 | 2 | 3 | 2 |
| 02 | 木_火 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 3 |
| 02 | 木_土 | 3 | 3 | 2 | 3 | 2 | 2 | 3 | 1 |
| 02 | 木_金 | 3 | 2 | 2 | 3 | 2 | 2 | 3 | 2 |
| 02 | 木_水 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 3 |
| 02 | 火_木 | 1 | 2 | 2 | 3 | 2 | 1 | 3 | 3 |
| 02 | 火_火 | 3 | 2 | 2 | 3 | 2 | 1 | 2 | 2 |
| 02 | 火_土 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 3 |
| 02 | 火_金 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 3 |
| 02 | 火_水 | 3 | 2 | 2 | 3 | 2 | 2 | 3 | 2 |
| 02 | 土_木 | 3 | 2 | 2 | 3 | 2 | 2 | 3 | 2 |
| 02 | 土_火 | 3 | 3 | 2 | 3 | 2 | 2 | 3 | 3 |
| 02 | 土_土 | 3 | 2 | 2 | 3 | 2 | 2 | 3 | 2 |
| 02 | 土_金 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 3 |
| 02 | 土_水 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 2 |
| 02 | 金_木 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 3 |
| 02 | 金_火 | 2 | 2 | 2 | 3 | 2 | 2 | 3 | 3 |
| 02 | 金_土 | 2 | 3 | 3 | 3 | 2 | 2 | 3 | 3 |
| 02 | 金_金 | 3 | 2 | 2 | 3 | 2 | 1 | 3 | 2 |
| 02 | 金_水 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 3 |
| 02 | 水_木 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 3 |
| 02 | 水_火 | 3 | 2 | 2 | 3 | 2 | 1 | 3 | 2 |
| 02 | 水_土 | 3 | 2 | 2 | 3 | 2 | 2 | 3 | 2 |
| 02 | 水_金 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 3 |
| 02 | 水_水 | 3 | 2 | 2 | 3 | 2 | 2 | 2 | 2 |
| 03A | 比肩 | 3 | 3 | 2 | 3 | 2 | 3 | 3 | 3 |
| 03A | 劫财 | 3 | 3 | 2 | 3 | 2 | 3 | 3 | 3 |
| 03A | 食神 | 3 | 2 | 2 | 3 | 2 | 3 | 3 | 3 |
| 03A | 伤官 | 3 | 2 | 2 | 2 | 1 | 3 | 3 | 2 |
| 03A | 偏财 | 3 | 2 | 2 | 2 | 1 | 3 | 3 | 2 |
| 03A | 正财 | 3 | 3 | 2 | 2 | 2 | 3 | 3 | 3 |
| 03A | 七杀 | 3 | 2 | 2 | 2 | 1 | 3 | 3 | 2 |
| 03A | 正官 | 3 | 3 | 2 | 1 | 1 | 3 | 3 | 3 |
| 03A | 偏印 | 3 | 2 | 2 | 1 | 1 | 3 | 3 | 2 |
| 03A | 正印 | 3 | 3 | 2 | 2 | 2 | 3 | 3 | 3 |
| 03B | 木_七杀 | 3 | 2 | 1 | 2 | 1 | 2 | 3 | 1 |
| 03B | 木_伤官 | 3 | 2 | 1 | 2 | 1 | 3 | 3 | 2 |
| 03B | 木_偏印 | 3 | 2 | 1 | 2 | 1 | 2 | 3 | 2 |
| 03B | 木_偏财 | 3 | 2 | 1 | 2 | 1 | 2 | 3 | 1 |
| 03B | 木_劫财 | 3 | 2 | 1 | 2 | 1 | 2 | 3 | 2 |
| 03B | 木_正印 | 3 | 2 | 1 | 2 | 1 | 2 | 2 | 1 |
| 03B | 木_正官 | 3 | 2 | 1 | 2 | 1 | 3 | 3 | 2 |
| 03B | 木_正财 | 3 | 2 | 1 | 2 | 1 | 2 | 3 | 1 |
| 03B | 木_比肩 | 3 | 2 | 1 | 2 | 1 | 2 | 2 | 2 |
| 03B | 木_食神 | 3 | 2 | 1 | 2 | 1 | 2 | 3 | 1 |
| 03B | 火_七杀 | 3 | 2 | 1 | 2 | 1 | 2 | 3 | 1 |
| 03B | 土_偏印 | 3 | 3 | 2 | 2 | 1 | 3 | 3 | 2 |
| 03B | 金_正财 | 3 | 1 | 1 | 2 | 1 | 2 | 3 | 1 |
| 03B | 水_正印 | 3 | 2 | 1 | 2 | 1 | 2 | 2 | 1 |
| **Mean** | **59 units** | 2.90 | 2.36 | 1.98 | 2.54 | 1.68 | 2.10 | 2.88 | 2.22 |

03A means persona; 03B means element × god cell. No overall average is used as a release gate: a financial guarantee or a wrong-door shadow cannot be canceled by good imagery elsewhere.

## 2. Blockers

### B1. Financial promises and prescriptions

[03_ten_god_element_templates.md:1438](../elementum-review-pack/03_ten_god_element_templates.md#L1438) · 金_正财 · Wealth · **C2, C3, C8**

> You will never be flashy and never be broke.

A birth-chart template cannot guarantee solvency. The same cell promises quarterly portfolio growth forever. Wood/Action also prescribes one asset and a decade holding period.

**Fix:** Remove all return guarantees and chart-derived allocations. Replacement: You can keep a clear record of what you choose to maintain. Review whether the commitment still serves its purpose.

### B2. The Fire/Wood excess source is reversed

[02_five_energy_pair_templates.md:153](../elementum-review-pack/02_five_energy_pair_templates.md#L153) · 火_木 · carry.excess · **C1, C6**

> Too much wood chokes the fire

The cited generating-excess verse has 木多火熾, an intensifying-fire image. A separate suffocation analogy needs its own qualified source and cannot be passed off as this verse.

**Fix:** Use an explicitly bounded analogy: Too much fuel drives the flame beyond its task. Each new idea starts another effort before the first is finished. Correct the source before revising the two stem excess chips.

### B3. An Action friction gives opposite remedies

[02_five_energy_pair_templates.md:511](../elementum-review-pack/02_five_energy_pair_templates.md#L511) · 水_火 · friction turn and carry · **C6**

> Let one blaze run wild and enjoy it.

The same state is defined as chasing hot chances and advised to use a cooling-off rule. One line asks the reader to release control, the other to restrain pursuit.

**Fix:** Align turn and carry to the definition: Urgent offers keep pulling effort away from the work in hand. Let the next offer wait.

### B4. Shadow labels read as gifts

[01_day_master_templates.md:189](../elementum-review-pack/01_day_master_templates.md#L189) · 丙 · Body excess shadow, with related chips · **C4**

> Outshines everyone

A standalone screenshot reads as praise. Other failures include 丁 Makes it permanent, 戊 Manages everything, and 癸 Mentors everyone. The description cannot repair the label when chips stand alone.

**Fix:** Use Crowds others out, Overbuilds small moments, Checks past usefulness, and Helps past capacity. Full replacements appear in the trait ledger.

### B5. A gift praises hidden depletion

[01_day_master_templates.md:428](../elementum-review-pack/01_day_master_templates.md#L428) · 庚 · Body echo gift · **C4, C8**

> Never looks tired

The label rewards concealing tiredness rather than a capacity of the material. Its description explicitly says nobody sees the person running down.

**Fix:** Use Holds steady form, with a description that distinguishes outward rhythm from effort and does not urge concealment.

### B6. The echo chain changes the mechanism

[01_day_master_templates.md:243](../elementum-review-pack/01_day_master_templates.md#L243) · 丁 · Expression gift; also 己 Body excess and 癸 Mind wide · **C6**

> Rekindles people

Ding's durable output becomes emotional rescue. Ji's Too agreeable reverses the source's hardened, unyielding ground. Gui's Mind wide becomes knowing a couple's feelings before they do.

**Fix:** Restore the named source mechanism. Use Makes lessons last, Resists new ways, and Checks its impressions. Do not repair a child by silently changing its source.

### B7. Invented biography and other people's private judgments

[03_ten_god_element_templates.md:60](../elementum-review-pack/03_ten_god_element_templates.md#L60) · 木_七杀 · Overdriven outside · **C2, C3, C8**

> Friends have stopped suggesting you slow down and started placing quiet bets on when the crash lands.

The template supplies a fabricated social history as a personalized fact. Dates, exam results, injuries and predictions of relationships recur in the reviewed keyword ledgers. This is not evidence of chart specificity.

**Fix:** Use a clearly conditional, observable situation: When every pause becomes another task, friends have little room to join you. Leave one shared plan without a target.

### B8. Safety-critical competence is treated as guaranteed

[03_ten_god_element_templates.md:1445](../elementum-review-pack/03_ten_god_element_templates.md#L1445) · 金_正财 · Thorough outside · **C2, C3, C8**

> The double-checkers who review you have quietly stopped

This follows a medication-schedule example and makes abandoned checking a compliment. Water/Sage also embeds a kitchen-fire response in a personality scene.

**Fix:** Remove medical and emergency-procedure scenarios. Use an ordinary checklist example with an explicit opportunity to catch an error.

### B9. The selector invents shadows outside eligible doors

Current code: [resolveVariant.js:68](../../../Elementum_App/src/content/resolveVariant.js#L68) and [line 88](../../../Elementum_App/src/content/resolveVariant.js#L88) · **C6/C8**.

> if (!list.length) return pool.slice(0, 3);

> const other = pool.find((x) => x.door === list[0]?.door && !used.has(x)) || pool.find((x) => !used.has(x));

In weak 丁 with Wood 30, Fire 15, Earth 5, Metal 10, Water 40, only Order qualifies for a present shadow under the current tier filter. The returned shadows are Order's “Doubts every spark” and Body's “Can't cool down”. Body is simultaneously a catalyst. The pack uses “Takes it personally” for that Order slot, so that label differs, but the selection failure is the same. A second synthetic fixture with no eligible shadow doors returns three shadows anyway, including two from Body.

**Fix:** Return only eligible doors, including zero or one item. Distinguish a deliberately absent door argument from an explicitly empty selection. Remove cross-door and same-door padding if one chip per door is the rule. Amend the minimum-two layout rule rather than inventing evidence.

### B10. Energy-page turns contradict the carry card's volume

Current code: [journeyData.js:445](../../../Elementum_App/src/components/journey/journeyData.js#L445) and [line 485](../../../Elementum_App/src/components/journey/journeyData.js#L485) · **C6**.

> Run thin, the knife has nothing to prune: skill idling without a project worth it.

That current page output describes Wood at **33% abundant** in the guide's worked chart. The carry card calls it the widest door. In weak 丁, Wood at 30% still “eats scraps”, while Earth 5% and Metal 10% receive “Run heavy” turns despite carry explicitly calling them small.

**Fix:** Make the page, definition, carry and chips consume one shared valence × volume decision. A wanted energy is not necessarily scarce; an unwanted energy is not necessarily plentiful. Either author the missing state copy or use a genuinely state-neutral mechanism.

### B11. Two surfaces resolve the same chart to different bands

Current code: [resolveVariant.js:105](../../../Elementum_App/src/content/resolveVariant.js#L105) versus [energyRoles.js:37](../../../Elementum_App/src/engine/energyRoles.js#L37) · **C6**.

With a supplied moderate 庚 core and Metal 15, Earth 15, Wood 30, Fire 25, Water 15, the journey resolves to open/Underfueled, but the nature paragraph is the Balanced variant: “You carry that same blade, and you carry it sheathed.” The carry lead says “Metal runs Underfueled.”

**Fix:** Resolve the display band once and pass it to every surface. Keep raw engine strength as separate input data, not an alternate presentation decision.

## 3. Majors, ranked

These 26 findings group repeated line problems. The complete 140-trait ledger and all-pair notes provide the detailed affected items; they do not add 101 separately ranked majors here.

### M1. 戊 inscription

[01_day_master_templates.md:265](../elementum-review-pack/01_day_master_templates.md#L265) · **C2/C3/C8**

> You hold what others set down, and nothing has ever offered to hold you.

**Why / proposed fix:** Assigns lifelong abandonment. Replace with: Holding a place for others can leave your own needs waiting.

### M2. 辛 strong nature

[01_day_master_templates.md:466](../elementum-review-pack/01_day_master_templates.md#L466) · **C2/C3/C8**

> What you release is flawless because releasing is the hard part.

**Why / proposed fix:** Perfectionist checking does not ensure flawless output. Replace with: Checking can continue after the work has met its purpose.

### M3. 乙 weak nature

[01_day_master_templates.md:96](../elementum-review-pack/01_day_master_templates.md#L96) · **C3/C5**

> The winding takes more out of you than it used to

**Why / proposed fix:** A static chart state invents decline over time. Remove used to, now and equivalent history from all band variants.

### M4. 壬 strong nature

[01_day_master_templates.md:529](../elementum-review-pack/01_day_master_templates.md#L529) · **C2/C3/C5**

> More moves through your head in a day than most people ship in a month

**Why / proposed fix:** Unmeasured superiority. Describe keeping several possibilities in mind without comparing people.

### M5. 癸 weak nature

[01_day_master_templates.md:600](../elementum-review-pack/01_day_master_templates.md#L600) · **C2/C3/C8**

> The signal was never broken.

**Why / proposed fix:** Validates intuition regardless of evidence. Replace with: An impression gains shape when you check what led to it.

### M6. 木_金 definition_friction; four other Order cells

[02_five_energy_pair_templates.md:90](../elementum-review-pack/02_five_energy_pair_templates.md#L90) · **C1/C2/C8**

> The harshest voice you hear ends up being your own.

**Why / proposed fix:** Treat inner criticism as one possible pressure response, not a necessary consequence of weak core. The dominant override also routes strong cores here.

### M7. 金_金 definition_friction

[02_five_energy_pair_templates.md:443](../elementum-review-pack/02_five_energy_pair_templates.md#L443) · **C2/C6/C8**

> stamina turning into tension you carry in your shoulders and jaw.

**Why / proposed fix:** Removes symbolic distance and conflicts with closed-certainty turn. Use effort held too rigidly, without symptoms.

### M8. 木_水 carry.wide and other wide lines

[02_five_energy_pair_templates.md:122](../elementum-review-pack/02_five_energy_pair_templates.md#L122) · **C3/C6**

> Water is the widest door

**Why / proposed fix:** 20% abundance does not prove largest share. Use a wide door unless ranking establishes widest.

### M9. 金_土 heavy turn

[02_five_energy_pair_templates.md:414](../elementum-review-pack/02_five_energy_pair_templates.md#L414) · **C1/C6**

> Comfort begins to bury what it formed.

**Why / proposed fix:** Breaks the guide's Geng rule. Revise the house rule first: classical burial is not exclusively Xin. Then keep the preparation-delay reading consistent.

### M10. 金_火 yin carry.wide

[02_five_energy_pair_templates.md:401](../elementum-review-pack/02_five_energy_pair_templates.md#L401) · **C1/C6**

> the fire that finishes the stone.

**Why / proposed fix:** Imagery substitution cannot establish identical classical behavior of Geng and Xin. Qualify the interpretive analogy and require explicit sibling review.

### M11. Part A 正官 definition

[03_ten_god_element_templates.md:18](../elementum-review-pack/03_ten_god_element_templates.md#L18) · **C4/C5**

> Framework-mediated pressure

**Why / proposed fix:** Too abstract for the entry surface. Replace definition with: Rules and duties that shape your work.

### M12. Part A 七杀 friction adjectives

[03_ten_god_element_templates.md:17](../elementum-review-pack/03_ten_god_element_templates.md#L17) · **C4/C5**

> Domineering

**Why / proposed fix:** Explicitly contrary to the guide's Bossy-not-Domineering example. Use Bossy. The Magistrate also conflicts with the courtroom-word ban.

### M13. Part A 七杀 teaser

[03_ten_god_element_templates.md:17](../elementum-review-pack/03_ten_god_element_templates.md#L17) · **C2/C3/C8**

> You’re sharpened by the trials you would never have chosen.

**Why / proposed fix:** Frames adversity as automatic improvement. Use: A clear task can help you choose a response under pressure.

### M14. 木_七杀 functional

[03_ten_god_element_templates.md:30](../elementum-review-pack/03_ten_god_element_templates.md#L30) · **C4**

> Your discipline is espalier

**Why / proposed fix:** Specialist gardening vocabulary carries the entire mechanism. Use: You train toward one clear aim, cutting away work that does not serve it.

### M15. 木_七杀 Hard-trained outside

[03_ten_god_element_templates.md:39](../elementum-review-pack/03_ten_god_element_templates.md#L39) · **C3/C8**

> The full program breaks everyone who tries it wholesale.

**Why / proposed fix:** Glorifies harmful strain and claims universal comparative superiority. Describe gradual practice without an injury comparison.

### M16. 木_偏印 Perceptive scene

[03_ten_god_element_templates.md:118](../elementum-review-pack/03_ten_god_element_templates.md#L118) · **C2/C3/C8**

> You told your partner the neighbors were splitting up three months before the moving truck confirmed it

**Why / proposed fix:** Retrospective prediction validates mind-reading. Replace with a noticed change followed by an explicit check, not a confirmed private-life guess.

### M17. 木_正印 Mother

[03_ten_god_element_templates.md:224](../elementum-review-pack/03_ten_god_element_templates.md#L224) · **C2/C3/C8**

> Either way you became the gardener.

**Why / proposed fix:** Both maternal presence and absence are made to prove the same outcome. Remove family-history inference. Offer care as a symbolic theme, not a biography.

### M18. 木_正印 Evergreen scene

[03_ten_god_element_templates.md:232](../elementum-review-pack/03_ten_god_element_templates.md#L232) · **C3/C4**

> You started the language course at fifty-five

**Why / proposed fix:** Invented history outside the core 18–35 audience. Use a present-tense example of returning to a lesson, explicitly illustrative.

### M19. 木_正官 Career

[03_ten_god_element_templates.md:260](../elementum-review-pack/03_ten_god_element_templates.md#L260) · **C8**

> Choose organizations you would plant a decade in.

**Why / proposed fix:** Prescribes a career horizon from a chart. Replace with: Notice which working rules help you do careful work.

### M20. 木_食神 Children

[03_ten_god_element_templates.md:376](../elementum-review-pack/03_ten_god_element_templates.md#L376) · **C2/C3/C8**

> Your line, biological or chosen, tends to be fruitful and fond of you.

**Why / proposed fix:** Predicts fertility or relational success and others' affection. Replace with a voluntary teaching example without family-outcome claims.

### M21. 木_正财 Plays it safe outside

[03_ten_god_element_templates.md:322](../elementum-review-pack/03_ten_god_element_templates.md#L322) · **C4/C8**

> People bring you opportunities the way they feed a cautious animal

**Why / proposed fix:** Dehumanizing cost language. Replace with: When every offer meets another delay, people stop bringing new options.

### M22. 火_七杀 overview

[03_ten_god_element_templates.md:409](../elementum-review-pack/03_ten_god_element_templates.md#L409) · **C4/C5/C8**

> Peacetime makes you dangerous to furniture.

**Why / proposed fix:** Comic violence is neither precise mechanism nor engraving voice. Use: When the task is unclear, pressure can spread to smaller matters.

### M23. 土_偏印 Learning

[03_ten_god_element_templates.md:868](../elementum-review-pack/03_ten_god_element_templates.md#L868) · **C2/C3/C8**

> it will quietly out-earn every credential in the house.

**Why / proposed fix:** Promises an economic advantage from private learning. Use: Give one question time, then test what you learned in a small piece of work.

### M24. 金_正财 friction chip

[03_ten_god_element_templates.md:1437](../elementum-review-pack/03_ten_god_element_templates.md#L1437) · **C4/C8**

> No-frills

**Why / proposed fix:** Plainness is not a fault. Rename the costly behavior, such as Cuts out pleasure, only if the three doors are revised to that mechanism.

### M25. 水_正印 Serene scene

[03_ten_god_element_templates.md:1752](../elementum-review-pack/03_ten_god_element_templates.md#L1752) · **C8**

> pan lid, baking soda, window, done.

**Why / proposed fix:** A personality vignette is no place for a compressed emergency procedure. Replace with staying calm while an ordinary meeting changes plans.

### M26. 水_正印 overview

[03_ten_god_element_templates.md:1739](../elementum-review-pack/03_ten_god_element_templates.md#L1739) · **C4/C5**

> aquifers

**Why / proposed fix:** Specialist vocabulary and stacked water metaphors hinder instant comprehension. Use springs and one concrete act of care.

## 4. Systemic patterns and proposed rules

1. **A precise anecdote is being used as proof.** The sampled god ledgers supply exam ranks, years, jobs, injuries, other people's thoughts and future confirmations. Require “situation → observable response → cost”, expressed as a possible situation. Do not invent a reader's history. Forer's personal-validation result is a reason to test discrimination, not a recipe to disguise generic statements with detail. [Forer, 1949](https://doi.org/10.1037/h0059240).
2. **A cost does not automatically defeat Barnum effects.** Exceptional understanding plus loneliness, generosity plus neglect, and perfection plus delayed release flatter through suffering. Require an alternative response the sentence would exclude, then test with readers blinded to chart assignment. No claim of empirical C3 validity until that test exists.
3. **Valence, quantity and personality are collapsed.** Abundant catalysts get deprivation stories; thin frictions get heavy-use stories. Maintain separate fields for relation, valence, volume, inferred mechanism and selected text. Rendering should not infer one from another.
4. **The source chain is declarative rather than enforced.** The 140 `echo_of` paths resolve in the pack, but several children change the source mechanism. Require a one-sentence mechanism statement for each source and compare every child against it. ID 47, 79 and 130 are clear failures; path existence alone is insufficient.
5. **The old and new corpora have different voices.** Part A has em dashes in all ten definition lines; sampled Part B repeatedly uses jokes, specialist vocabulary and omniscient biography. Keep one metaphor per entry, ordinary verbs for the mechanism and a dignified cost. Treat export metadata separately when linting punctuation.
6. **Sibling imagery is stronger than sibling reasoning.** Vine/Oak and Rain/Ocean remain recognizable, but changing blade to stone does not preserve metallurgy or classical Xin/Fire qualification. Review sibling mechanisms explicitly. Do not claim an image replacement proves doctrinal equivalence.
7. **“Overuse” is asked to explain every friction.** Output taxing a weak core is a demand/capacity mismatch, not necessarily an overgrown strength the person possesses. CAPS and Whole Trait Theory support contextual variability; neither validates element percentages or fixed biography. Use conditional mechanisms, and distinguish excess supply from demand beyond capacity. [Mischel & Shoda, 1995](https://pubmed.ncbi.nlm.nih.gov/7740090/), [Fleeson & Jayawickreme, 2015](https://pubmed.ncbi.nlm.nih.gov/26097268/).
8. **Snapshot identity is missing from editorial QA.** Nine Order-shadow labels in the pack differ from the current station. Attach a content hash and code revision to exports; evaluate that immutable snapshot and rerun assembly checks after approved edits. Do not describe a pack-only line as a current production line.

## 5. Where the house rules need correction

These disagreements are separate from scoring against the supplied rules.

- **Balanced is mathematically misstated if “no energy abundant” includes all five.** Five shares summing to 100 cannot all be below 20. Current code excludes the core when checking abundance. Document that exception and justify the rule. The “about one chart in a thousand” prevalence is unverified in this review.
- **At least two chips and one per eligible door cannot both hold when fewer than two doors qualify.** Prioritize eligibility. A truthful empty or single-item state is preferable to fabricated chart evidence.
- **Dominant means friction “whatever the band” is not what the code does.** `energyRoles.js:116` excludes the core. An open Metal core at 60% remains a catalyst; a moderate fixture with core 60 and all others 10 can remain Balanced. Decide and document the exception before editing copy.
- **An excess face at 20% contradicts the guide's ≥40% definition.** Current `BIG` includes abundant and dominant. The guide itself selects excess faces for Metal 23 and Earth 33 in its worked example. Choose either a separate abundant-overuse face or reserve classical excess for dominant. Do not silently use both definitions.
- **Forty percent is a house threshold, not a universal classical theorem.** Strength, season, roots and configuration are not interchangeable with composition percentage. The five-element idioms support relational analogies; their conditional clauses still matter. The present review does not validate the threshold.
- **“Burial belongs to Xin, never Geng” is too absolute.** 三命通会 · 卷十二 explicitly includes 土重金埋者陽金. 滴天髓's Geng entry distinguishes moist and dry Earth; its 陽明遇金 commentary is not a blanket rule for all heavy Earth. Geng stalling can remain a house image, but not an exclusive classical correction. [三命通会](https://www.shidianguji.com/zh/book/SK1610/chapter/1kf5v8oqbug4m), [滴天髓](https://zh.wikisource.org/zh-hant/滴天髓).
- **The inner-judge split is an interpretation, not a demonstrated classical psychological law.** A weak core does not establish self-criticism; a strong core does not establish criticism of others. State the metaphor's limits and author a pressure response the reader can check.
- **Never hedge does not require certainty about a person.** “When X, Y can…” can violate a literal no-hedging style reading even when honest. Prefer capability and explicit if/when conditions; revise the ban to target evasive filler rather than calibrated claims. No-fate should outrank forceful-sounding prose.
- **Do not attach a cost to every positive chip merely to sound accurate.** A cost belongs with the mechanism and its conditions, not an invented wound. Let a capability be modest. Specificity should come from an observable response.
- **Named personas conflict with the courtroom ban.** “The Magistrate” is locked terminology in Part A. Either make an explicit vocabulary exception or rename it. Do not penalize writers for an unresolved system-level contradiction while retaining it in the design system.

The Fire/Wood correction is based on the source's actual 火熾 reading, not on a claim that no other classical passage could ever use a suffocation analogy. Xin-as-jewel is likewise a house image with classical variation: the 滴天髓 commentary resists taking it literally, while 穷通宝鉴 uses jewel language and differentiates seasonal Fire needs. [穷通宝鉴 · 论辛金](https://zh.wikisource.org/zh/穷通宝鉴). These examples require qualification, not a single universally correct physical metaphor.

## 6. Rule-abiding rewrite candidates

Fifteen of the worst traits are replaced below. Each keeps its named source mechanism, except the two Fire/Wood excess items whose source needs correction first. They are editorial candidates for integrated testing, not an approved production migration. The appendix supplies replacements for every other flagged trait.

### 14. 甲: Never good enough → Finds more faults

You meet the stated standard and search for another fault. Checking continues after the work is finished.

**Why:** Label reads as a judgement of personal worth rather than a costly habit.

### 20. 乙: Settles in → Builds lasting ties

You can turn an opening into a commitment you maintain. What you choose gains a place in daily life.

**Why:** Holds you back reverses the intended gift in ordinary English.

### 37. 丙: Outshines everyone → Crowds others out

You take so much space in the exchange that other people stop adding to it. Warmth becomes hard to share.

**Why:** Outshines everyone reads as praise on a shadow chip.

### 39. 丙: Buried in ideas → Overloads on ideas

Each new idea starts another burst of effort. Attention burns through the plans before any one is finished.

**Why:** Smothering is not the cited 木多火炽 mechanism. The existing source must be corrected first.

### 46. 丁: Misses nothing → Builds useful knowledge

You can gather material for a task before beginning it. What you learn gives your attention something clear to work with.

**Why:** Fuel supply is turned into infallible detection and a fabricated three-month confirmation.

### 47. 丁: Rekindles people → Makes lessons last

You can turn a useful moment into something another person can use again. A note or shared method keeps the lesson available.

**Why:** Durable output and traditions become emotional rescue, an adjacent but different function.

### 54. 丁: Makes it permanent → Overbuilds small moments

You turn a good evening into a standing obligation. Keeping it going starts to cost the warmth that began it.

**Why:** Makes it permanent can read as an achievement rather than a shadow.

### 79. 己: Too agreeable → Resists new ways

You keep the familiar arrangement after its purpose has passed. There is little room left for another way to work.

**Why:** Excess firmness becomes excessive agreement, the opposite mechanism.

### 85. 庚: Never looks tired → Holds steady form

You can keep an outward rhythm during demanding work. That steadiness does not reveal how much effort it takes.

**Why:** Concealed exhaustion is packaged as a gift.

### 86. 庚: Careful finisher → Keeps steady effort

You can keep your work organized through an ordinary task. A clear rhythm gives your effort a form to return to.

**Why:** Recovery reserve becomes flawless finishing; adds tempo.

### 87. 庚: First-handshake read → Learns from experience

You can let repeated observations inform a judgement. What you learn gains weight when you check it against what follows.

**Why:** First meeting allegedly reveals a whole person and is always vindicated.

### 104. 辛: Prices it right → Tends chosen work

You can give a valuable project sustained attention. Regular care keeps its purpose visible through the details.

**Why:** Guarantees appreciation in value and shifts tending into pricing expertise.

### 105. 辛: Quality guaranteed → Works under pressure

You can use a clear standard to organize demanding work. A review gives the next correction a place to begin.

**Why:** Quality guaranteed promises an outcome; proof years later is invented.

### 130. 癸: Feels the undercurrent → Checks its impressions

You can give an impression clear terms and test it. A careful source helps separate what you noticed from what you assumed.

**Why:** Claims knowing a couple's feelings before they do; not derived from exact sources.

### 138. 癸: Mentors everyone → Helps past capacity

You keep developing other people's work after your own needs attention. The next request takes the time you meant to keep.

**Why:** Mentors everyone reads as praise without its cost.

## 7. Sampling record and verification

### Corpus coverage

- File 00 and EVALUATION_PROMPT: read in full as the requested task specification and product context. Role assertions in the prompt are not credentials claimed by this reviewer.
- File 01: all ten stems; all 140 traits, named sources, manifests, inscriptions, keywords, Sign and baseline nature paragraphs, all 30 nature variants, self cards and mechanism/claim fields. All 140 source references resolve in the supplied pack. 101 traits have at least one score below 3 and receive replacements; 39 have no individual replacement proposed. Shared source/assembly findings still apply to retained traits.
- File 02: all 25 cells, including stories, turns, yin overrides, definitions, advice, verdicts and every carry state. The companion notes include the 25-cell classical excess matrix.
- File 03 Part A: all ten personas, all table fields and teasers.
- File 03 Part B: all ten Wood cells (lines 26–405), Fire 七杀 (406–443), Earth 偏印 (862–899), Metal 正财 (1432–1469), Water 正印 (1736–1773). All 84 keywords and 252 trait/scene/outside paragraphs in these cells, plus their overview, functional, chips and domains.
- Not fully evaluated: the other 36 Part B cells. Global text searches exposed isolated lines outside the sample, but those were not treated as full reviewed cells or scored. No claim of all-50-cell certification is made.

### Required trace A: the guide's strong 庚 chart

Assumed supplied strength: strong. Earth 33, Wood 33, Metal 23, Water 6, Fire 5. Runtime band: concentrated/Overfueled.

| Surface | Observed result | Judgment |
|---|---|---|
| Gifts | Crisis performer; Trims for growth; No dressed-up answers | Same three doors as guide. Several labels/claims still need editorial repair. |
| Shadows | Never reconsiders; Plans, never acts | Matches guide and code, but uses excess faces at abundant, not dominant. |
| EASE | Metal and Earth | Correct house valence; carry speaks of closed certainty and preparation-delay. Metal definition instead speaks of physical tension. |
| SEEK | Fire, Wood, Water | Correct house valence; Wood gets abundant wide carry. |
| Wood page | Run thin, knife has nothing to prune | Contradicts Wood 33 and the wide carry. |
| Earth page | Comfort begins to bury what it formed | Violates the guide's Geng exception, which itself needs correction. |

**Conclusion:** The selected doors mostly match the guide, but the five chips, two carry rows and pages do not tell one fully coherent story.

### Required trace B: constructed weak 丁 chart

Assumed supplied strength: weak. Wood 30, Fire 15, Earth 5, Metal 10, Water 40. Runtime band: open/Underfueled. This is an assembly fixture, not a chart cast from a birth date.

| Surface | Observed result | Judgment |
|---|---|---|
| Gifts | Mind: Misses nothing; Body: Fully committed | Eligible wanted doors; the Mind label overclaims. |
| Eligible shadow doors | Order only | Earth and Metal are thin, below the current present-shadow filter. |
| Returned shadows | Doubts every spark; Can't cool down | Body shadow is padding from an ineligible catalyst door. Pack Order label differs: Takes it personally. |
| EASE carry | Water dominant; Metal thin; Earth thin | State clauses distinguish the small frictions. |
| SEEK carry | Wood wide; Fire wanted | Wood 30 is acknowledged as abundant. Fire uses shared stage imagery. |
| Pages | Wood thin; Metal heavy; Earth heavy | All three conflict with the supplied quantities/carry. |

**Conclusion:** This trace fails both the door rule and state coherence. A prose-only edit cannot fix it.

### Additional edge fixtures and code scope

1. Strong 庚 with Metal 5, Earth 5, Wood 30, Fire 30, Water 30: no eligible shadow doors, yet the selector returns three shadows and duplicates Body.
2. Moderate 庚 with Metal 15, Earth 15, Wood 30, Fire 25, Water 15: journey Underfueled, nature Balanced.
3. Direct core-60 role check: documents the core exception to dominant and Balanced handling.

Fixtures explicitly supply strength and composition with empty pillars. They test assembly invariants, not whether the calendar engine can produce those combinations or whether strength calculation is correct. Calls exercised buildEnergyChart, buildJourneyModel, poolDoors, resolveDayMasterReading, buildCarryModel and buildElementScreen. Full captured outputs and the reproducible command are in TRACE_EVIDENCE.json. No browser screenshot, birth-date accuracy audit, clinical validation, accessibility audit or full end-to-end test suite is claimed.

The exporter audit inspected 240 templates and returned an _ORDER.json taxonomy-order mismatch. That failure is not a clean all-green validation. The pack/current comparison found nine different Order-shadow labels; the evidence JSON records them. A pack header saying generated from the station is insufficient to prove exact identity with this checkout. The code's energy-page mechanism uses the shared base and turns; carry merges yin overrides, so editorial approval of yin text alone does not ensure the page displays it.

Classical checking used the project's source notes and publicly available primary-text transcriptions of 滴天髓, 三命通会 and 穷通宝鉴, plus the referenced 渊海子平 material. This was not a critical-edition comparison or a full verification of every attributed epigraph across all five named books. A direct 子平真诠 edition-level verification remains outside the evidence established here. Source-dependent disputed claims are identified rather than awarded unqualified authority.

### Deliverables and next release gate

- [140_TRAIT_LEDGER.md](140_TRAIT_LEDGER.md): every trait, eight scores, original wording, exact named-source text, reasons and all 101 proposed replacements.
- [UNIT_NOTES.md](UNIT_NOTES.md): ten full-stem notes, 25 pair notes/excess matrix, ten persona notes and 14 sampled cell/keyword reviews.
- [TRACE_EVIDENCE.json](TRACE_EVIDENCE.json): fixture outputs, reproduction command, score data and snapshot differences.

Release gate: agree the contradictory house rules; repair selector and shared state resolution; correct the disputed source fields; apply and re-evaluate approved copy; regenerate a versioned pack; repeat the two required traces and boundary cases. The evaluation is complete. Those implementation and editorial changes remain future work.
