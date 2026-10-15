# body — Body  ·  FUNCTION_METRICS archetype

> **GENERATED from the by_axis JSON — do not hand-edit.** Edit the JSON (or request the change), then re-run `node tools/build-template-twins.mjs`.
>
> DRAFT 2026-10-14: the fifteen metrics and their lines were agreed with the owner in session (the names, the three-bar balance, the style bars with no better end) and wired into the app on the owner's "start writing and map those into our app artifact and station database"; every gloss line stays provisional until the owner reads it in the app and rules it, line by line, as with every other field. RETIRED 2026-10-15: the owner ruled the level glosses unnecessary (the labels explain themselves, as the MBTI metrics do; a line per level is a reading of the person, which the ledger owns); the seventy-five lines moved to retired_gloss, the bars render static.

| | |
|---|---|
| **axis** | FUNCTION_METRICS |
| **key** | body |
| **canonical name** | Body |
| **construct** | THE FUNCTION METRICS (owner 2026-10-14, step 2 of the owner's order for The Function section; REA_19): three bars per function on the energy page between the definition and the chips. Two TRAIT bars, one per god of the family, each with a fixed everyday label (the words other astrology and personality apps use) and a height from that god's share of the chart; one STYLE bar with two plain ends and no better end, tilted by the energy's balance against the core. No gloss line per level (owner 2026-10-15: the labels explain themselves; the level glosses retired to retired_gloss). Each bar carries one fixed ask line, the metric defined in one plain question, backlogged for the glossary and not rendered for now. Derived, never written per chart: the engine computes the levels (Elementum_App/src/engine/functionMetrics.js), the words come from this file. |
| **sources** | REA_19 Function Metrics (the derivation and the scale) · REA_02 §5f (the five functions and their families) · the owner's rulings of 2026-10-14 (three bars; two trait bars from the ten-god distribution; the style bar with no better end) |

## Candidate variables

| Variable | Value |
|---|---|
| `function` | body |
| `gods` | 比肩 · 劫财 |
| `element_note` | the core element itself; the style bar reads the core band |
| `bars[0].key` | independence |
| `bars[0].label` | Independence |
| `bars[0].god` | 比肩 |
| `bars[0].persona` | The Twin |
| `bars[0].ask` | how much you handle on your own |
| `bars[1].key` | competitiveness |
| `bars[1].label` | Competitiveness |
| `bars[1].god` | 劫财 |
| `bars[1].persona` | The Rival |
| `bars[1].ask` | how much a rival sharpens you |
| `bars[2].key` | solo_team |
| `bars[2].label` | Solo · Team |
| `bars[2].style` | true |
| `bars[2].ends` | Team · Solo |
| `bars[2].ask` | whether your strength runs best alone or beside people |
