# action — Action  ·  FUNCTION_METRICS archetype

> **GENERATED from the by_axis JSON — do not hand-edit.** Edit the JSON (or request the change), then re-run `node tools/build-template-twins.mjs`.
>
> DRAFT 2026-10-14: the fifteen metrics and their lines were agreed with the owner in session (the names, the three-bar balance, the style bars with no better end) and wired into the app on the owner's "start writing and map those into our app artifact and station database"; every gloss line stays provisional until the owner reads it in the app and rules it, line by line, as with every other field. RETIRED 2026-10-15: the owner ruled the level glosses unnecessary (the labels explain themselves, as the MBTI metrics do; a line per level is a reading of the person, which the ledger owns); the seventy-five lines moved to retired_gloss, the bars render static.

| | |
|---|---|
| **axis** | FUNCTION_METRICS |
| **key** | action |
| **canonical name** | Action |
| **construct** | THE FUNCTION METRICS (owner 2026-10-14, step 2 of the owner's order for The Function section; REA_19): three bars per function on the energy page between the definition and the chips. Two TRAIT bars, one per god of the family, each with a fixed everyday label (the words other astrology and personality apps use) and a height from that god's share of the chart; one STYLE bar with two plain ends and no better end, tilted by the energy's balance against the core. No gloss line per level (owner 2026-10-15: the labels explain themselves; the level glosses retired to retired_gloss). Each bar carries one fixed ask line, the metric defined in one plain question, backlogged for the glossary and not rendered for now. Derived, never written per chart: the engine computes the levels (Elementum_App/src/engine/functionMetrics.js), the words come from this file. |
| **sources** | REA_19 Function Metrics (the derivation and the scale) · REA_02 §5f (the five functions and their families) · the owner's rulings of 2026-10-14 (three bars; two trait bars from the ten-god distribution; the style bar with no better end) |

## Candidate variables

| Variable | Value |
|---|---|
| `function` | action |
| `gods` | 偏财 · 正财 |
| `element_note` | the tamed element; the style bar reads its volume |
| `bars[0].key` | ambition |
| `bars[0].label` | Ambition |
| `bars[0].god` | 偏财 |
| `bars[0].persona` | The Horizon |
| `bars[0].ask` | how much you reach for the next opening |
| `bars[1].key` | discipline |
| `bars[1].label` | Discipline |
| `bars[1].god` | 正财 |
| `bars[1].persona` | The Steward |
| `bars[1].ask` | how much you keep what you build |
| `bars[2].key` | focused_multitasking |
| `bars[2].label` | Focused · Multitasking |
| `bars[2].style` | true |
| `bars[2].ends` | Focused · Multitasking |
| `bars[2].ask` | one thing at a time or several in motion |
