# action — Action  ·  FUNCTION_METRICS archetype

> **GENERATED from the by_axis JSON — do not hand-edit.** Edit the JSON (or request the change), then re-run `node tools/build-template-twins.mjs`.
>
> DRAFT 2026-10-14: the fifteen metrics and their lines were agreed with the owner in session (the names, the three-bar balance, the style bars with no better end) and wired into the app on the owner's "start writing and map those into our app artifact and station database"; every gloss line stays provisional until the owner reads it in the app and rules it, line by line, as with every other field.

| | |
|---|---|
| **axis** | FUNCTION_METRICS |
| **key** | action |
| **canonical name** | Action |
| **construct** | THE FUNCTION METRICS (owner 2026-10-14, step 2 of the owner's order for The Function section; REA_19): three bars per function on the energy page between the definition and the chips. Two TRAIT bars, one per god of the family, each with a fixed everyday label (the words other astrology and personality apps use) and a height from that god's share of the chart; one STYLE bar with two plain ends and no better end, tilted by the energy's balance against the core. Every bar carries one gloss line, the reader its subject, under sixteen words, read by pole (catalyst = the gift, friction = the overgrown version with its cost) and by level band (low 1 to 2, mid 3, high 4 to 5); the style bar reads by its end. The gloss explains the number, never the trait (the chips carry the trait). Derived, never written per chart: the engine computes the levels (Elementum_App/src/engine/functionMetrics.js), the words come from this file. |
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
| `bars[0].gloss.catalyst.low` | The next opening can wait, and you let it. |
| `bars[0].gloss.catalyst.mid` | You spot a good chance and take it when the timing is right. |
| `bars[0].gloss.catalyst.high` | You spot the chance before others do, and you are already moving. |
| `bars[0].gloss.friction.low` | You chase little, and what you start you tend to finish. |
| `bars[0].gloss.friction.mid` | You start the next thing a little before this one is done. |
| `bars[0].gloss.friction.high` | You chase the next opening before this one is finished, and both pay less. |
| `bars[1].key` | discipline |
| `bars[1].label` | Discipline |
| `bars[1].god` | 正财 |
| `bars[1].persona` | The Steward |
| `bars[1].ask` | how much you keep what you build |
| `bars[1].gloss.catalyst.low` | You keep little of what you build, and you build again easily. |
| `bars[1].gloss.catalyst.mid` | What you build mostly stays built, and what you save mostly stays saved. |
| `bars[1].gloss.catalyst.high` | What you save and build stays built, and people plan on it. |
| `bars[1].gloss.friction.low` | You hold on to little, and what you have slips through. |
| `bars[1].gloss.friction.mid` | You hold on a little past the point where letting go would pay. |
| `bars[1].gloss.friction.high` | You hold on past the point where letting go would pay, and it costs more than it keeps. |
| `bars[2].key` | focused_multitasking |
| `bars[2].label` | Focused · Multitasking |
| `bars[2].style` | true |
| `bars[2].ends` | Focused · Multitasking |
| `bars[2].ask` | one thing at a time or several in motion |
| `bars[2].gloss.low` | One thing at a time, finished before the next begins. |
| `bars[2].gloss.mid` | Two things in motion at most, and one of them finished first. |
| `bars[2].gloss.high` | Several things in motion at once, and you keep most of them moving. |
