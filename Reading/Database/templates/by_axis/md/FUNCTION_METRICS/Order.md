# order — Order  ·  FUNCTION_METRICS archetype

> **GENERATED from the by_axis JSON — do not hand-edit.** Edit the JSON (or request the change), then re-run `node tools/build-template-twins.mjs`.
>
> DRAFT 2026-10-14: the fifteen metrics and their lines were agreed with the owner in session (the names, the three-bar balance, the style bars with no better end) and wired into the app on the owner's "start writing and map those into our app artifact and station database"; every gloss line stays provisional until the owner reads it in the app and rules it, line by line, as with every other field.

| | |
|---|---|
| **axis** | FUNCTION_METRICS |
| **key** | order |
| **canonical name** | Order |
| **construct** | THE FUNCTION METRICS (owner 2026-10-14, step 2 of the owner's order for The Function section; REA_19): three bars per function on the energy page between the definition and the chips. Two TRAIT bars, one per god of the family, each with a fixed everyday label (the words other astrology and personality apps use) and a height from that god's share of the chart; one STYLE bar with two plain ends and no better end, tilted by the energy's balance against the core. Every bar carries one gloss line, the reader its subject, under sixteen words, read by pole (catalyst = the gift, friction = the overgrown version with its cost) and by level band (low 1 to 2, mid 3, high 4 to 5); the style bar reads by its end. The gloss explains the number, never the trait (the chips carry the trait). Derived, never written per chart: the engine computes the levels (Elementum_App/src/engine/functionMetrics.js), the words come from this file. |
| **sources** | REA_19 Function Metrics (the derivation and the scale) · REA_02 §5f (the five functions and their families) · the owner's rulings of 2026-10-14 (three bars; two trait bars from the ten-god distribution; the style bar with no better end) |

## Candidate variables

| Variable | Value |
|---|---|
| `function` | order |
| `gods` | 七杀 · 正官 |
| `element_note` | the tamer element; the style bar reads its volume |
| `bars[0].key` | leadership |
| `bars[0].label` | Leadership |
| `bars[0].god` | 七杀 |
| `bars[0].persona` | The General |
| `bars[0].ask` | how much pressure you take on and hand out |
| `bars[0].gloss.catalyst.low` | You take pressure when it comes and hand little of it out. |
| `bars[0].gloss.catalyst.mid` | In a crisis you get clear, and people notice. |
| `bars[0].gloss.catalyst.high` | You are clear in a crisis and others follow, and you went looking for the crisis. |
| `bars[0].gloss.friction.low` | You push yourself a little harder than the day asks. |
| `bars[0].gloss.friction.mid` | You run yourself hard, and the people near you feel the pace. |
| `bars[0].gloss.friction.high` | You run everyone, yourself first, past the point of rest. |
| `bars[1].key` | responsibility |
| `bars[1].label` | Responsibility |
| `bars[1].god` | 正官 |
| `bars[1].persona` | The Magistrate |
| `bars[1].ask` | how much you answer to the rules you accepted |
| `bars[1].gloss.catalyst.low` | You answer to the rules you chose and leave the rest alone. |
| `bars[1].gloss.catalyst.mid` | Your word holds, and people plan on it. |
| `bars[1].gloss.catalyst.high` | Your word holds without exception, and people build on it. |
| `bars[1].gloss.friction.low` | You take on a duty or two more than you can comfortably carry. |
| `bars[1].gloss.friction.mid` | You cannot easily say no to a duty, even an unfair one. |
| `bars[1].gloss.friction.high` | You cannot say no to a duty, even a bad one, and it costs you sleep. |
| `bars[2].key` | flexible_structured |
| `bars[2].label` | Flexible · Structured |
| `bars[2].style` | true |
| `bars[2].ends` | Flexible · Structured |
| `bars[2].ask` | how much structure you want around you |
| `bars[2].gloss.low` | You want little structure around you and make the plan as you go. |
| `bars[2].gloss.mid` | You want a frame to work in and room to move inside it. |
| `bars[2].gloss.high` | You want the plan set and the rules clear before you start. |
