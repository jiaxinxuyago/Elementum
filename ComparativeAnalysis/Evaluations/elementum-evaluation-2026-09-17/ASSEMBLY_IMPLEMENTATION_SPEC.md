# Elementum: recommended reading assembly implementation specification, revision 2

Date: 2026-09-18. Status: recommended specification, not implemented.
Supersedes revision 1. Read with [SYSTEM_ALIGNED_REASSESSMENT.md](./SYSTEM_ALIGNED_REASSESSMENT.md) and [LANGUAGE_USE_RECOMMENDATIONS.md](./LANGUAGE_USE_RECOMMENDATIONS.md).
Original reviewed HEAD: 0104bd85976a6851d2f9a2591b59bed04c5f6ccb. Refreshed checkout inspected: 219cde921985f5d77b18d8490d7f286fe0c4619f. Original fixtures: [TRACE_EVIDENCE.json](./TRACE_EVIDENCE.json).

## Objective and preserved contracts

Resolve chart interpretation once, then select compatible content for every surface. Preserve the existing source axes and deliberate design decisions.

The following are current documented policies, not bugs to remove:
- P4 excess faces are permitted at abundant or dominant volume.
- Carry.excess is distinct from a trait's excess face.
- Balanced pool-order 3+3 is an intentional baseline under its bridge.
- September 17 extends sparse yin overrides to mechanism stories and turns through mechanism_yin (19 cells); carry_yin remains a separate 16-cell override.
- The current Balanced guard is moderate strength with no non-core energy ≥40%, superseding the earlier abundance guard.
- The Order inner-judge definitions and their ten shadow echoes are now explicitly locked.
- Function prose is pair definition, weighted god ledger, pair advice.
- Earlier pool rules permit second items from the heaviest eligible door. Exactly one per door is not a safe assumption.
- Raw engine strength, resolved presentation band and the within-energy god-face split are different values.

This specification does not change birth-chart calculation, certify classical interpretation or introduce a new engine policy by implication.

## 1. Establish the active contract

Create a versioned policy description covering band resolution, core exception, volume boundaries, door eligibility, trait face selection, Balanced mode, ordering and permitted counts. Link each rule to its current source and date.

Before changing interpretation, resolve:
1. Does the dominant-valence override include the core? The dictionary's broad rule and engine exception differ.
2. Verify the already-ruled Balanced guard: moderate strength and no non-core energy ≥40%. No new decision is needed for this boundary.
3. When only zero or one shadow door qualifies, is the surface allowed fewer than two chips? Recommended: yes.
4. May a second chip come from an eligible door? Preserve the documented behavior unless intentionally replaced.
5. Which per-energy labels express role and which express physical quantity?

These are design decisions to document during implementation, not approvals required to finish this evaluation. Pure consistency fixes can proceed while preserving current engine behavior.

## 2. Build one resolved presentation state

Suggested conceptual fields, not a mandated API:

- rawStrength and readingBand.
- coreStem and coreElement.
- policyVersion and contentVersion.
- selectionMode: chart_selected or balanced_baseline.
- For each energy: element, function, raw share, volume, valence, applicable classical condition, ordered god-face weights.
- For each surface: selected content key, source axis and selection reason.
- Carry noun variant separately from mechanism and directive.

All consumers use readingBand for presentation. Keep rawStrength for calculation/debugging, not as an alternative path to nature variants. Inspect resolveArchetype, archetypeKeyFor and variantKeys as well as the journey builder.

Treat absent/missing input differently from a legitimate zero share or empty eligible set. A missing state is an assembly error, not permission to fall back to arbitrary personality claims.

Original regression: moderate 庚 with Metal 15, Earth 15, Wood 30, Fire 25, Water 15 must not receive conflicting bands. Under the newly supplied September 17 rule it should remain Balanced, because no non-core energy reaches 40%. Update the regression's expected result to this rule rather than preserving the obsolete open result. Fresh check: this 30% fixture resolves Balanced. A second fixture with Wood 40%, Fire 15% and other shares unchanged resolves open. Use the latter to test the remaining raw-strength nature path.

## 3. Make trait selection explicit

Use two distinct modes:

**balanced_baseline:** use the documented ordered three gifts and three shadows with the Balanced bridge. Do not describe the baseline shadows as chart-activated unwanted doors. Keep mode explicit so an empty list cannot accidentally invoke it.

**chart_selected:** compute eligible doors from the resolved state. Gifts use wanted doors. Shadows require unwanted doors at the qualifying present-or-higher tier. Select face according to the active contract: abundant and dominant may select excess; present uses its appropriate overgrowth face.

Never fill a short result from an ineligible door. A second item from an eligible door must also pass face/volume and uniqueness checks. Do not silently impose one-per-door if the approved count contract still permits an eligible repeat.

Recommended policy change: allow zero or one item when eligibility cannot supply more, with layout support. An empty list should not imply that the person has no strengths or weaknesses. Until that policy is settled, surface the content/count conflict in authoring diagnostics rather than fabricating an extra claim.

Original regressions:
- Weak 丁: Wood 30, Fire 15, Earth 5, Metal 10, Water 40. Order can qualify for a shadow; catalyst Body must not be padded in as Can't cool down.
- Non-balanced synthetic 庚: Metal 5, Earth 5, Wood 30, Fire 30, Water 30. An explicitly empty qualifying shadow set must stay empty, not return the first three pool entries.
- A deliberately Balanced baseline still returns its intended 3+3. Do not “fix” it away.

Keep source snapshot labels separate from current runtime labels. The pack/runtime Order label difference does not invalidate the eligibility fixture.

## 4. Verify the documented valence × volume migration

Use the currently documented boundaries: absent ≤0.5%, thin ≤10%, abundant ≥20%, dominant ≥40%, with present between thin and abundant. Evaluate in an unambiguous order so ranges do not overlap. Test raw values around each boundary; rounding belongs to display.

| State | Content requirement |
|---|---|
| Wanted + absent/thin | Seeking and support; do not imply the energy is plentiful |
| Wanted + present | Usable contribution; no scarcity claim unless separately justified |
| Wanted + abundant | Plenty can be useful; do not label it thin |
| Dominant under applicable override | Route through the explicit excess condition; preserve unresolved core exception until ruled |
| Unwanted + absent/thin | Small unwanted contribution; do not invent a present overgrowth shadow |
| Unwanted + present | Relevant friction without assuming abundance |
| Unwanted + abundant | Abundant friction; an excess trait face is allowed under current law |
| Core at zero | Use the documented unrooted concept, not a missing identity |

September 17 records this migration as completed. The refreshed code implements mechanism_yin merging and several state turns. Its abundant-wanted branch still falls through to catalyst_turn instead of carry.wide. Test and repair that specific missing state rather than reimplementing the work already present. Inventory state coverage per pair before changing the resolver. A state-neutral mechanism can be reused where genuinely true. Do not render a mismatched thin/heavy paragraph merely to avoid authoring a missing variant.

Original regression: Wood 33% in the strong 庚 example must not be described as running thin while its carry calls it wide. Similarly, thin unwanted Earth/Metal must not automatically receive heavy-volume prose.

“Wide” may be selected by abundance. “Widest” requires ranking. Check ties explicitly if a superlative is retained.

## 5. Preserve the weighted god ledger

The resolved energy's face composition controls row selection:
- Single face: top three authored rows.
- Lead ≥60% with a minority face: top two lead, top one minority.
- Lead <60%: top two from each.
- Tie ordering: preserve a documented deterministic rule; do not invent an interpretive hierarchy during refactoring.

Use the selected rows for both chips and reading paragraphs. Door rotation follows assembled position: trait, scene, outside, trait. Keep rows index-aligned with their keywords. Missing minority content is a coverage error to handle explicitly, not an invisible conversion to a single-face reading.

Wrap with ELEMENT_PAIR definition and advice for the chosen role. Do not restore the superseded lead-god wrapper or full retired v3 body. God labels remain absent from this reading surface.

Validate all 25 sibling pairs in both role poles: single-face outputs, two-plus-one in each direction, and two-plus-two with relevant lead ordering. Check same-arena contradictions, repeated angles and awkward transitions. A real tension between different arenas can be valid and need not be erased.

The 60% face threshold must never be shared with the energy-volume 40% dominant threshold. “Balanced face split” must not trigger “Balanced chart baseline.”

## 6. Preserve echo reasoning and scoped imagery

For each proposed copy change, trace source condition → pair definition/mechanism → carry → P4 trait. Record whether it is a source correction, interpretation correction, selector correction or stylistic alternative.

Repair the Fire/Wood source mismatch centrally before rewriting dependents. Repair the Water/Fire opposite remedies as one chain.

Keep carry_yin sparse overrides and merge the now-authorized mechanism_yin overrides over mechanism for yin stems. Verify all 19 recorded cells and inherited fields, including the corrected Mountain/Field distinction in 土_火. Then select the page turn by valence × volume. Do not extend overrides to unrelated fields. A separate classical sibling review still needs evidence when it proposes changing the underlying mechanism.

Keep emotional titles such as Never good enough. Source alignment and emotional language are separate acceptance checks.

## 7. Author and transcribe through the existing workflow

REA_05 makes station JSON the authoring source. Edit it, regenerate the documented views, run applicable audits, and deliberately transcribe approved content to runtime. Do not hand-edit generated Markdown or propose an automatic content pipeline merely to address this review.

Record content version and station/runtime differences. A difference may be pending transcription; it becomes a release problem when the wrong version is actually shipped. Keep retired ore out of live acceptance totals unless a consumer uses it.

## 8. Acceptance evidence

| Check | Required evidence |
|---|---|
| One presentation band | Same resolved band in nature, roles, carry and chip selection for each fixture |
| Eligible-only chart selection | Every selected shadow door and face justified; zero/one eligible cases included |
| Balanced baseline | Explicit mode and preserved 3+3 behavior |
| Boundary behavior | Just below, at and above 0.5, 10, 20 and 40 percent; no contradictory state copy. Balanced guard separately tests non-core 39.9/40/40.1 and excludes core from that guard |
| Core behavior | Cases at zero and dominance; existing exception preserved or newly ruled, never silently changed |
| Volume language | Abundant wanted energy never receives scarce wording; thin unwanted never falsely receives heavy wording |
| God blending | Single face, 59.9/60/60.1 split, 50/50 tie, reversed lead and missing content covered |
| Card/detail identity | Same selected keywords and rows, correct door rotation |
| Pair wrappers | Family-level definition/advice with both god siblings |
| Echo chain | No reversed mechanism or opposing remedy; Order shadows retain the newly locked parent definitions |
| Yin mechanism | 19 sparse overrides merged only for yin stems; inherited fields preserved and page turns volume-aware |
| Language | Correct field budget, original-versus-candidate review, scene and rhythm checks |
| Provenance | Policy and content versions, source paths and explicit unresolved decisions |

Run meaningful selector/assembly tests and inspect complete outputs. This document defines required checks. Only the two band cases described above were freshly executed here; the complete matrix has not been run. Use the original trace fixtures as regressions, then expand only where new state and blend concerns require it.

Implementation order: establish contract, unify band, separate Balanced mode, stop ineligible selection, migrate volume-sensitive copy, verify weighted blends, then perform voice-preserving editorial changes. Keep changes reviewable in these units.
