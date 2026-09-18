# Elementum: recommended reading assembly implementation specification

Date: 2026-09-18
Status: recommended specification; not implemented or approved as a change to the interpretive rules.
Companion review: [FULL_EVALUATION.md](./FULL_EVALUATION.md), especially B9–B11, systemic patterns and house-rule corrections.
Evidence: [TRACE_EVIDENCE.json](./TRACE_EVIDENCE.json).
Code references describe the reviewed snapshot, commit 0104bd85976a6851d2f9a2591b59bed04c5f6ccb. Recheck the current checkout before implementation.

## Objective

Resolve the chart into one shared reading state and make every reading surface consume it. A nature paragraph, energy page, carry card and trait chip must not independently decide the same chart's band, energy valence or volume interpretation.

This specification repairs assembly consistency. It does not validate chart-to-personality predictions, alter birth-chart calculations, or resolve disputed classical interpretations by code.

## 1. Remove forced trait padding

Change selectPoolByDoor in Elementum_App/src/content/resolveVariant.js:

- Accept only candidates whose door is explicitly eligible for that side.
- Select at most one chip per door and at most three chips per side.
- Return zero or one item when fewer than two eligible doors exist.
- Remove the fallback to the first three pool entries when the eligible list is empty.
- Remove both same-door and cross-door padding used to reach two items.
- Distinguish missing selection input from an explicitly empty selection. In production, missing resolved state is an assembly error, not authorization to use pool order.
- Use stable, explicit ordering from the resolved model; do not depend on object insertion order.

Keep the existing shadow eligibility rule for this consistency repair: friction plus a volume of present, abundant or dominant. Thin and absent frictions do not receive overgrowth shadows. Gifts can represent capabilities through catalyst doors even when the energy is absent, but their copy must not imply that the capacity is already expressed.

UI requirement: render flexible counts without placeholder personality claims. An empty side means no applicable claim was selected; it must not imply the person has no strengths or weaknesses.

Expected change: weak 丁 with Wood 30, Fire 15, Earth 5, Metal 10 and Water 40 has one eligible Order shadow. Remove the padded Body shadow, “Can't cool down”, because Body is a catalyst.

## 2. Resolve the display band once

Use one resolver to produce readingBand from the engine's raw strength and the documented composition policy.

Pass readingBand to:
- Nature and archetype variants.
- Self card.
- Energy-role classification and energy pages.
- Trait-door selection.
- Carry card and lead sentence.

Preserve rawStrength as separate input data. A renderer must not call getEnergyBand(rawStrength) to bypass the resolved presentation band. Check variantKeys, archetypeKeyFor and resolveArchetype as well as the journey builder for competing resolution paths.

Expected change: the moderate 庚 fixture with Metal 15, Earth 15, Wood 30, Fire 25 and Water 15 must use the same resolved band everywhere. Under the current resolveBand policy that is open/Underfueled, not a Balanced nature paragraph paired with an Underfueled carry card.

Tie handling in the band resolver must be explicit and deterministic. Do not invent a new interpretive tie rule as a side effect of refactoring; record the chosen rule separately.

## 3. Keep relation, valence and quantity separate

Recommended model shape, illustrative rather than a mandated interface:

```ts
type ReadingState = {
  rawStrength: string;
  readingBand: "concentrated" | "balanced" | "open";
  stem: string;
  policyVersion: string;
  contentVersion: string;
  energies: EnergyReadingState[];
};

type EnergyReadingState = {
  element: string;
  isCore: boolean;
  function: "body" | "mind" | "expression" | "action" | "order";
  presence: number;
  volume: "absent" | "thin" | "present" | "abundant" | "dominant";
  baseValence: "catalyst" | "friction" | "neutral";
  effectiveValence: "catalyst" | "friction" | "neutral";
  classificationReason: string;
  overrideReason?: string;
  giftEligible: boolean;
  shadowEligible: boolean;
  mechanismId: string;
  contentStateKey: string;
};
```

“Core” is identity, not an alternative to catalyst/friction. Keep it independent. Preserve the reason for an override so the model can explain why base and effective valence differ.

Validate finite, nonnegative composition inputs and the documented normalization contract. Missing or invalid data must not silently become a genuine 0%/absent interpretation. Compute tiers from canonical composition values before display rounding.

Do not infer scarcity from catalyst status or abundance from friction status. Likewise, do not describe every friction as an energy that “feeds the core”: a dominant output or controller can be friction without being a feeder.

## 4. Resolve one state-specific mechanism for every surface

Centralize content-state selection. The energy page, carry sentence and selected chip express the same resolved mechanism at different lengths.

| Effective state | Required interpretation |
|---|---|
| Catalyst + absent/thin | A capacity to support or develop; no claim of demonstrated behavior |
| Catalyst + present | A usable channel; no unsupported scarcity claim |
| Catalyst + abundant | A well-supplied channel; not “running thin” |
| Friction + absent | No overgrowth claim and no shadow |
| Friction + thin | Limited load; no overgrowth shadow under the retained eligibility rule |
| Friction + present/abundant | The applicable ordinary friction mechanism |
| Friction + dominant | A qualified excess mechanism when the approved policy permits it |
| Neutral | State-neutral description; no inferred SEEK/EASE or personalized shadow |
| Catalyst + dominant | Policy exception requiring explicit treatment; never an accidental fallback |

For abundant catalysts, “wide” does not mean “widest”. Only use a comparative superlative if the model actually establishes the rank and handles ties.

Separate a state-neutral function definition from its state-specific expression. This can reduce the number of full paragraphs required, but the composed result must still agree with the quantity and valence.

Fallback order:
1. Exact stem-specific wording for the resolved mechanism and state.
2. Shared wording explicitly approved as compatible with that sibling and state.
3. State-neutral wording that makes no contradictory quantity or behavior claim.
4. Omit the optional prose and record missing coverage for editorial QA.

Never fall back from abundant to thin, thin to heavy, or neutral to friction simply because a string is available. Required missing content should fail pre-release coverage checks.

Expected changes:
- Worked strong 庚: Wood 33% cannot be a wide carry channel and a page with “nothing to prune” due to thin supply.
- Weak 丁: Wood 30% cannot “eat scraps”; Earth 5% and Metal 10% cannot receive heavy-volume turns while carry calls them small.

## 5. Separate abundant and excess trait faces

Recommended face selection:

| Side | Eligibility and state | Face |
|---|---|---|
| Gift | Eligible catalyst, absent/thin/present | echo |
| Gift | Eligible catalyst, abundant | wide when authored and compatible, otherwise echo |
| Shadow | Eligible friction, present/abundant | echo |
| Shadow | Eligible friction, dominant | excess when authored and compatible |

Reserve excess for dominant volume. If an abundant-overuse face is desired, author and name it separately rather than relabeling abundant as classical excess.

Do not silently use an ordinary face when it contradicts the dominant source. Missing compatible content requires editorial coverage or omission.

This recommendation deliberately changes the guide's worked example: Metal 23% and Earth 33% should no longer select excess faces solely because they are abundant. Update guide examples, fixtures and expected chips together after the policy is accepted.

Core dominance remains a separate decision. Current code excludes the core from the dominant-friction override. Preserve and expose that exception during the consistency refactor; do not silently broaden the override. The house must decide whether the exception remains and author compatible copy for it.

## 6. Apply sibling overrides before surface construction

Resolve the stem's content bundle once, including:
- Opening mechanism and turns.
- Function definitions where sibling-specific meaning is authored.
- Advice.
- Carry clauses and remedies.
- Trait source references.

Current carry merges yin overrides, while the reviewed energy-page builder uses shared mechanism text. Both must consume the same sibling-resolved bundle.

Shared fallback is acceptable only where the mechanism and imagery remain compatible. Blade-to-stone word substitution is not sufficient proof of identical classical reasoning. Flag disputed sibling mechanisms, especially 金_火, for editorial resolution rather than making the renderer invent them.

## Suggested assembly flow

```text
Validated chart inputs
  -> resolve reading band once
  -> classify each energy's function, volume and effective valence
  -> derive eligibility and a content-state key
  -> resolve sibling-compatible source mechanisms and copy
  -> select eligible traits with no padding
  -> build every screen from the same resolved state
```

Keep derivation and rendering separate. Store mechanism/source identifiers with selected content so a QA trace can show why a sentence and chip appeared. Path existence is necessary but does not prove semantic agreement; editorial review remains required.

## Policy decisions to record before release

These are explicit product/content decisions, not implementation accidents:

1. Accept variable chip counts, including zero or one, in place of the minimum-two requirement.
2. Accept dominant-only excess faces and update the worked example.
3. Document whether the core remains exempt from dominant valence flipping.
4. Document the Balanced guard, core exception and tie behavior. Do not claim five normalized shares can all be below the 20% abundance threshold.
5. Define neutral/Balanced content explicitly. Do not fill empty trait lists with arbitrary default personalized traits.
6. Confirm that thin frictions remain excluded from overgrowth shadows.
7. Resolve disputed source meanings before deriving replacement child traits.

No new abundance threshold or favorable-element doctrine is proposed here. Existing thresholds are preserved for assembly tests, without claiming they are empirically or classically validated.

## Acceptance tests

Use the captured fixtures in TRACE_EVIDENCE.json. Their strength is explicitly supplied and their pillars are empty; they test assembly behavior, not the calendar engine's ability to produce those charts.

| Test | Required result |
|---|---|
| Strong 庚: Earth 33, Wood 33, Metal 23, Water 6, Fire 5 | All surfaces use one band. Wood uses abundant-compatible copy. Under the recommended face policy, Body/Mind at 23/33 do not select excess faces. |
| Weak 丁: Wood 30, Fire 15, Earth 5, Metal 10, Water 40 | Only the eligible Order shadow appears. Body has no shadow. Wood is abundant; Earth/Metal are thin across all surfaces. |
| Strong 庚: Metal 5, Earth 5, Wood 30, Fire 30, Water 30 | No eligible shadows means an empty shadow list; no default three and no repeated door. |
| Moderate 庚: Metal 15, Earth 15, Wood 30, Fire 25, Water 15 | Nature, self card, pages and carry all use the same resolved band. |
| Core 60, others 10 | Approved core-dominance and Balanced policy is explicit and consistent across outputs. |
| Threshold boundaries | Test 0.5, 10, 20 and 40 plus values just above/below; display rounding must not change selection. |
| Equal-share ties | Results are independent of input-object insertion order and follow the documented tie policy. |
| Missing/invalid values | No fabricated absence, fallback personality or accidental Balanced state. |
| Missing content | Only compatible shared/neutral fallback or omission; report coverage gaps. |
| Yin siblings | Page and carry use compatible sibling imagery and the same mechanism. |
| All selected traits | Eligible side, unique door, maximum three, compatible source and state. |

Add focused unit tests for the resolver and selector, then integration tests for the assembled reading models. Use a small number of UI checks for flexible counts, empty states and sibling content. Avoid relying solely on snapshots of prose; assert the underlying state and selection invariants.

## Implementation order and affected areas

1. Selector eligibility and no-padding behavior: resolveVariant.js plus trait layout empty/single-item handling.
2. Shared band/state resolver: energyRoles.js and all consumers currently deriving their own band.
3. Central state-to-content resolver: journeyData.js page/carry construction and shared reading resolution.
4. Sibling merge and semantic fallback policy.
5. Content coverage, source corrections, fixture updates and a regenerated review pack.

Known reviewed files:
- Elementum_App/src/content/resolveVariant.js
- Elementum_App/src/engine/energyRoles.js
- Elementum_App/src/components/journey/journeyData.js
- Elementum_App/src/components/reading/readingResolve.js

Locate all callers and variant-key construction before changing signatures. Do not fix only the two screens used in the review fixtures.

## Completion criteria

Implementation is ready for re-review when:
- Every surface consumes the shared resolved state.
- No eligible-door violation, duplicate-door padding or arbitrary empty-list fallback remains.
- Band, valence, volume and sibling wording agree across the complete reading.
- The accepted policy decisions are documented in the guide and versioned with content.
- Required state coverage passes and the targeted acceptance tests pass.
- The regenerated pack records content identity and the implementation commit.
- Editorial review confirms that chip/source pairs still express the same mechanism.

This specification is complete as a recommendation. Implementation, policy acceptance and production changes remain separate work.
