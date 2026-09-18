# Elementum: system-aligned reassessment

Date: 2026-09-18. Status: current interpretation of the evaluation, with implementation proposals clearly separated from established rules.

## Latest document update incorporated

The user supplied refreshed REA_02 and REA_16 during this revision. Their September 17 after-batch rulings supersede three assumptions in the earlier draft:
- Balanced requires moderate strength and no **non-core** energy at or above **40%**, replacing the earlier abundant-tier guard.
- The five Order friction definitions intentionally contain the inner-judge theme, and all ten Order shadows derive from them. “Never good enough” is both natural language and an explicitly recorded title.
- `mechanism_yin` supplies 19 sparse overrides for yin energy-page stories and turns. Page turns are now specified to follow valence × volume, extending the earlier carry-only work.

The refreshed checkout is now 219cde921985f5d77b18d8490d7f286fe0c4619f. Targeted inspection confirms mechanism_yin merging and state turns for absent, thin-unwanted, dominant-unwanted and unrooted cases. One gap remains visible in the code: an abundant wanted energy does not select carry.wide in stateTurn and falls back to catalyst_turn. Re-test that branch for the original thin-at-33% contradiction. No code was changed here.

A fresh pure-function check confirms the moderate 庚 fixture with Wood 30% now resolves Balanced. Changing Wood to 40% (and Fire from 25% to 15%) resolves open. The old B11 fixture is therefore no longer a failing example. A non-core dominant fixture remains necessary because resolveArchetype still selects nature from raw strength.

## Overall evaluation

The reading system has a stronger language and reasoning design than my initial evaluation recognized. Its strength is the progression from a memorable elemental identity to a personal portrait, then into a more specific function reading and practical advice. A phrase such as “Never good enough” can make that progression more comprehensible and emotionally accurate as a description of an experience. Replacing it with a detached observation can weaken the reading.

The main weaknesses are consistency between surfaces, conflicting generations of documentation, and claims that travel farther than their source mechanism supports. These deserve targeted correction. They do not justify converting the entire corpus into cautious behavioral reports.

This revision reads the eight requested documents as project evidence and authoring contracts. Historical instructions inside them are not new user instructions to rewrite the product or execute archived workflows.

## Research coverage and limits

Read: [REA_01](../../../Reading/Documents/REA_01_Archetype_System.md), [REA_02](../../../Reading/Documents/REA_02_Concept_Dictionary.md), [REA_03](../../../Reading/Documents/REA_03_Reading_Generation_Schema.md), [REA_04](../../../Reading/Documents/REA_04_Knowledge_Pool.md), [REA_05](../../../Reading/Documents/REA_05_Generation_Architecture.md), [REA_06](../../../Reading/Documents/REA_06_Concept_Ladder.md), [REA_16](../../../Reading/Documents/REA_16_The_Voice.md), and the [archived reconciliation audit](../../../Reading/Documents/_ARCHIVE_Reading_V2.1_Reconciliation_Audit.md). Also consulted the project's [humanized-prose benchmark](../../../.claude/skills/humanized-prose/SKILL.md), existing review evidence and current assembly source.

REA_04's calculation anchors were read as context, not independently verified through a new calendar/engine audit. This pass does not establish scientific validity for mapping birth charts to personality. Classical derivation, psychological vocabulary, reader recognition and empirical predictive accuracy are separate questions. The psychological bibliography can inform descriptions without proving the chart-to-personality link.

The first-pass evidence belongs to commit 0104bd85976a6851d2f9a2591b59bed04c5f6ccb. During this pass the checkout advanced to 219cde921985f5d77b18d8490d7f286fe0c4619f. Document hashes identify the final inspected texts. This revision includes targeted code inspection and a two-case band check, not a new exhaustive output run.

## The reading reasoning to preserve

### 1. Identity and state are distinct

The stem supplies the material and its characteristic action. The protected spine is 甲 rises, 乙 routes, 丙 radiates, 丁 concentrates, 戊 holds, 己 receives/grows, 庚 cuts, 辛 refines, 壬 ranges, 癸 permeates. Each portrait's cost should arise from that action. Giving every stem the same hidden exhaustion or being-unseen story erases the system's differentiation.

The Sign holds third-person myth. Your Nature receives that image in second person, opens with “You,” and expresses the selected band in a 50–75-word bridge, portrait and personal landing. It is supposed to feel personal. A static band alone does not establish that the reader has deteriorated since an earlier period.

### 2. Function and character have different source axes

The current function reading is:

**ELEMENT_PAIR definition → weighted ELEMENT_GOD keyword ledger → ELEMENT_PAIR advice.**

The later September 3 AXIS HOMING ruling supersedes the earlier same-day lead-god definition/advice rule. Pair prose explains the shared function. The specific god supplies the character. A god-blind rewrite of the whole reading would lose a deliberate part of the product.

Single face selects three rows. A lead face of at least 60% selects two lead rows and one minority row. A split below 60% selects two from each. Authored order carries rank. The 60% rule is a within-energy face split, not the 40% threshold for dominant energy volume.

Each ledger keyword has trait, scene and outside variants. Position rotation chooses the entry door. The example must demonstrate its meaning, and the reading should vary its endings. God tags are intentionally withheld on this surface until the concept ladder introduces them.

Sources: [REA_16:149](../../../Reading/Documents/REA_16_The_Voice.md#L149), [current axis ruling:302](../../../Reading/Documents/REA_16_The_Voice.md#L302), [assembly:297](../../../Elementum_App/src/components/journey/journeyData.js#L297), [pair wrapping:495](../../../Elementum_App/src/components/journey/journeyData.js#L495).

### 3. Relation, valence and volume are separate

Relation answers which function an energy serves. Valence answers whether it is wanted or unwanted under the selected policy. Volume describes how much is present. Wanted does not mean scarce, and unwanted does not mean abundant.

The September 16 ruling says the sentence is chosen from valence × volume. Older role-based “Run thin/Run heavy” turns still explain why contradictory copy can be selected. The issue is a migration between documented contracts as well as a renderer issue.

P4 gifts describe material capability through wanted doors. Shadows describe overgrowth through present unwanted doors. Carry provides the practical response, including underuse. P4 capability language need not literally insert “can” into every sentence.

### 4. Carry is a distillation, not a second interpretation

The definition, mechanism, carry and chip should preserve the same causal idea at different lengths. An echo can be poetic without inventing a different benefit, cost or remedy.

The September 17 Order ruling now supplies an explicit parent source for the inner-judge shadows, so that previously open source gap must not remain listed as unresolved.

Keep a trace from source claim through pair definition to carry and trait. “Rekindles people” is warm and intelligible, but if its source is durable output it needs a defensible bridge. “Too agreeable” cannot silently stand for hardened, unyielding ground. Those are reasoning concerns, not objections to emotional prose.

### 5. Recognition comes before explanation

REA_06 makes progressive disclosure part of the reading. Do not front-load taxonomy or prepend a disclaimer to every portrait. Let the surface provide recognition, with reasons available at the appropriate rung. Where a consequential outcome is promised, repair that claim directly rather than trying to compensate with a generic disclaimer.

## Corrections to my initial evaluation

| Earlier recommendation or assumption | Revised conclusion |
|---|---|
| Rename “Never good enough” to “Finds more faults” | Withdraw. Keep the original label. It names an inner feeling more naturally and does not assert that the person lacks worth. |
| Excess faces must appear only at dominant volume | Withdraw as a defect claim. REA_02 §5h explicitly permits excess faces at abundant or dominant volume. Carry.excess and a P4 excess face are not the same selector. |
| Empty-door pool fallback is always a bug | Narrow. Balanced pool-order 3+3 is an intentional baseline. Empty eligible doors in a non-balanced chart must not silently use that baseline. |
| Exactly one chip per door is already the complete current law | Correct. Earlier selection rules allow a second item from the heaviest eligible door, and newer rules require two or three chips. A variable-count, one-per-door policy is a proposed change, not a settled contract. |
| Yin noun substitution must immediately apply everywhere | Update to the September 17 scoped contract: mechanism_yin now extends to energy pages in 19 cells. Preserve sparse inheritance and the chosen mechanism; do not invent overrides for unrelated fields. |
| “The Magistrate” violates the courtroom vocabulary ban | Withdraw. Elevated persona names are allowed. The explicit prose ban names verdict, legitimate, legitimacy and institutional. |
| All sharp/less-common chips should become plain phrases | Withdraw. Fickle, Brooding and Contrarian are explicitly permitted when short, recognizable and glossed. Accuracy outranks simplification. |
| Detailed scenes are fabricated biography by definition | Withdraw. Ordinary objects and clock-time are part of the authorized scene craft. Narrow the objection to asserted personal history, guaranteed vindication, private knowledge and consequential outcomes. |
| Every forceful claim needs “can,” “if” or “when” | Withdraw. Preserve direct portraits and varied doors. Use qualification where the meaning requires it. |
| A locked Geng burial turn simply violates the guide | Correct. REA_04 records a retained wording exception. Its classical justification and the cross-surface image difference remain review questions, not an unambiguous implementation breach. |
| All 101 flagged traits require replacement | Withdraw. The ledger is a historical review inventory. Replacements need mechanism, surface and reader-fit checks; the original can win. |

Authority: [REA_02:163](../../../Reading/Documents/REA_02_Concept_Dictionary.md#L163), [selection and later rulings:339–342](../../../Reading/Documents/REA_02_Concept_Dictionary.md#L339), [vocabulary zone](../../../Reading/Documents/REA_16_The_Voice.md#L153). These are source sections, not permission to change policy.

## Disposition of all original ranked findings

“Retain” means the concern survives this research. It does not mean the first replacement is approved. “Narrow” changes scope or rationale. “Conditional” requires surface or policy confirmation. This table replaces the original severity count as the current action guide.

| ID | Disposition | Current treatment |
|---|---|---|
| B1 financial promises | Retain | Remove guaranteed solvency/returns and chart-derived allocations. Preserve the Wealth context and practical personality insight. |
| B2 Fire/Wood excess | Retain, source first | Resolve 木多火熾 versus the suffocation gloss in REA_04 before propagating to carry or chips. An alternative analogy needs its own stated rationale. |
| B3 opposite Action remedies | Retain | Definition, turn and carry must advise the same response in the same state. |
| B4 shadows read as gifts | Narrow | Test the standalone chip and expanded context. “Mentors everyone” is ambiguous, not automatically wrong. Do not force clumsy substitutes merely to make negativity explicit. |
| B5 “Never looks tired” | Narrow | Distinguish an outward steadiness portrait from praising concealment. Keep material stamina if supported; remove pressure to hide limits. |
| B6 changed echo mechanism | Retain | Trace each disputed item to its source. Preserve emotionally strong language if the bridge holds. |
| B7 invented biography | Narrow substantially | Ordinary illustrative scenes are intentional. Remove claims of actual past events, private bets or guaranteed later confirmation. Keep scene craft. |
| B8 guaranteed competence | Retain | Replace medication/emergency proof of personality and abandoned checking with an ordinary scene. |
| B9 ineligible shadows | Retain, explicit exception | Fix non-balanced cross-door leakage. Keep deliberate Balanced baseline separate. Same-door count rules require a policy decision. |
| B10 thin/heavy contradiction | Partly addressed; residual branch | New state-turn and yin paths exist. Abundant wanted energy still falls through to catalyst_turn instead of carry.wide in the inspected code. Verify complete output for that case. |
| B11 split band | Narrow; replace old fixture | Wood 30% moderate 庚 now correctly resolves Balanced. Wood 40% resolves open, while nature still uses raw moderate strength. Unify the band and test this dominant case. |
| M1 lifelong abandonment | Retain | Remove “nothing has ever” biography while preserving the emotional cost of holding others. |
| M2 flawless Jewel output | Retain | Keep the refinement portrait and felt difficulty finishing; remove guaranteed flawlessness. |
| M3 Vine “used to” | Narrow | Remove ungrounded personal decline from this static band portrait. Temporal language remains valid on an actual time-based surface. |
| M4 Ocean superiority | Retain, preserve voice | Keep ranging and movement. Remove an unmeasured productivity comparison. |
| M5 “signal never broken” | Narrow | Emotional reassurance is valid; certainty that every intuition is correct is not. Read the complete paragraph before replacing the line. |
| M6 Order inner critic | Source gap closed; routing check remains | September 17 explicitly locks the theme into five Order friction definitions and ten shadows. Keep the language. Separately test strong-core/dominant paths against the stated 官杀旺身弱 condition. |
| M7 shoulder/jaw symptoms | Narrow | An ordinary embodied metaphor is not automatically a diagnosis. Avoid assigning symptoms as chart-derived facts and align the mechanism with the carry. |
| M8 “widest” | Retain | Abundant is not necessarily largest. Use “wide” unless a ranking condition supports the superlative. Plentiful imagery itself is allowed. |
| M9 Geng burial | Reclassify | Documented wording exception plus classical reconciliation question. No automatic global replacement. |
| M10 Xin Fire carry | Conditional source review | Carry and mechanism now have scoped yin overrides. Review whether the selected Xin mechanism is defensible; noun substitution alone is not classical verification. |
| M11 abstract god definition | Retain, source-level edit | Plain explanation beneath an elevated name. Change the canonical definition once, not separately on each surface. |
| M12 Domineering / Magistrate | Split | Bossy is the recorded vocabulary preference. Withdraw the proposed persona-name change. |
| M13 adversity sharpens | Narrow | Preserve the pressure/response theme; avoid treating every harmful event as beneficial. |
| M14 espalier | Retain comprehension concern | Translate or visibly explain the gardening term where it carries the mechanism. Verify this field is surfaced before assigning release urgency. |
| M15 program “breaks everyone” | Retain | Remove universal superiority and harmful-strain proof while retaining trained discipline. |
| M16 neighbors splitting up | Retain | Keep noticing small changes; remove claimed past prediction and confirmed access to private relationships. |
| M17 Mother either-way story | Retain | Neither family presence nor absence should be invented to prove the same reading. Preserve care as a symbolic theme. |
| M18 course at fifty-five | Narrow | Age alone is not a defect. Avoid asserting an actual life event; use a representative learning scene suited to the surface. |
| M19 decade career advice | Narrow | A long commitment can be an illustrative preference. A chart should not prescribe a mandatory career horizon. |
| M20 fruitful/fond children | Retain | Remove guaranteed family outcomes and other people's affection. Preserve voluntary nurturing/teaching. |
| M21 cautious animal | Editorial comparison | Test reader response to the image. It may feel belittling; the original proposed rewrite also predicts others' behavior too categorically. |
| M22 dangerous to furniture | Editorial + surface check | Humor is not prohibited. Decide whether the image communicates pressure or introduces an unwanted aggression claim. Verify reachability. |
| M23 out-earns credentials | Retain | Keep private learning's depth; remove the economic guarantee. |
| M24 No-frills | Conditional context | Plainness is not inherently a cost, but the ledger may establish deprivation. Review chip plus all three doors before renaming. |
| M25 kitchen fire | Retain | Use an ordinary calm-under-disruption scene, preserving the scene door rather than forcing a conditional opening. |
| M26 aquifers | Editorial + surface check | Metaphor is welcome. Replace or explain a word only if comprehension suffers; fewer water images may improve the paragraph. |

## Canon reconciliation needed before a batch rewrite

1. **Current contract versus history.** REA_01 and portions of REA_03 retain older names, counts and statuses. REA_16 contains superseded and current instructions in the same registry/history. Publish a short active-field contract with date, scope, source axis, status and superseded rule. A document's existence does not make every paragraph current.
2. **Translation protocol.** REA_04 Part 8's broad exclusions of Chinese, Day Master and personas conflict with later literacy/glyph/persona decisions. Reconcile by layer and latest explicit ruling. Do not apply the old global ban to every surface.
3. **Earth relation labels.** REA_04 §3.4 labels Earth feeding Metal as 食伤 and Earth receiving Fire as 印. Relative to a Metal Day Master, Earth is Resource/Mind; relative to Fire, Earth is Output/Expression. Fix the reference direction in the source table before deriving behavior.
4. **Resource sibling language.** The phrase “deepens without redirecting” is attributed inconsistently between the knowledge pool and the dictionary's Resource definitions. Resolve the intended 正印/偏印 distinction centrally; do not silently swap names in child copy.
5. **Fire/Wood excess.** The listed verse and the “choked by fuel” explanation need reconciliation in the knowledge pool. The mismatch should not be repaired independently in each dependent surface.
6. **Valence and volume.** September 17 records page-turn migration as complete. The new code implements several states but does not route abundant wanted energy to wide in stateTurn. Reconcile the completion claim with that specific branch.
7. **Balanced and counts.** Keep the deliberate Balanced baseline explicit. Resolve minimum-two versus eligible-only when only zero or one door qualifies. Preserve earlier same-door behavior until a selected policy replaces it.
8. **Core dominance.** The dictionary says any dominant energy flips valence; the existing engine treats core specially. The Balanced guard is now explicitly non-core ≥40%; that part no longer needs a new ruling. Do not silently change engine interpretation inside an editorial refactor.
9. **Voice lint scope.** The local humanization skill ends with an older dash allowance despite its explicit zero-dash rule. REA_16 also retains duplicate/historical registry entries. Consolidate active lint rules and keep archived rationale separately.
10. **Surface status.** Retired stem keywords and off-page material can still be useful authoring ore. Some domain/functional fields have later surface-specific rulings. Trace actual consumers before labeling an issue a current screen blocker. The source corpus evaluation remains valid even when a field is not live.

These are proposed documentation repairs. No canonical document was changed in this revision.

## Implementation and editorial priorities

**First: consistency and consequential claims.** Repair non-balanced ineligible selection and split-band presentation. Reconcile Fire/Wood source and opposite Action remedies. Remove guaranteed financial/family outcomes and emergency-procedure demonstrations from reading copy.

**Second: contract reconciliation.** Verify the documented page-turn migration and 19 mechanism_yin overrides. Preserve abundant excess faces and the non-core 40% Balanced guard. Resolve only the remaining dominant-core valence and chip-count questions.

**Third: voice-preserving edits.** Review chips with their descriptions and three doors. Keep originals that already work. Protect the stem action, god sibling distinction and ordinary scenes. Use the language recommendations as a comparison protocol, not a replacement generator.

**Fourth: complete-reading validation.** Evaluate the actual weighted ledger with its pair introduction and advice, in both poles and all reachable sibling blends. Test the reading as a whole for repetition, contradiction, rhythm and distinctiveness. The original static scorecard alone cannot certify assembled prose.

The appropriate success test is: can the reader recognize themselves, understand the language immediately, follow a coherent interpretation, and retain agency over the advice? No numerical uplift in accuracy or resonance is claimed without reader evidence.
