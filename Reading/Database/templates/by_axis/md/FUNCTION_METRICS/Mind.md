# mind — Mind  ·  FUNCTION_METRICS archetype

> **GENERATED from the by_axis JSON — do not hand-edit.** Edit the JSON (or request the change), then re-run `node tools/build-template-twins.mjs`.
>
> DRAFT 2026-10-14: the fifteen metrics and their lines were agreed with the owner in session (the names, the three-bar balance, the style bars with no better end) and wired into the app on the owner's "start writing and map those into our app artifact and station database"; every gloss line stays provisional until the owner reads it in the app and rules it, line by line, as with every other field.

| | |
|---|---|
| **axis** | FUNCTION_METRICS |
| **key** | mind |
| **canonical name** | Mind |
| **construct** | THE FUNCTION METRICS (owner 2026-10-14, step 2 of the owner's order for The Function section; REA_19): three bars per function on the energy page between the definition and the chips. Two TRAIT bars, one per god of the family, each with a fixed everyday label (the words other astrology and personality apps use) and a height from that god's share of the chart; one STYLE bar with two plain ends and no better end, tilted by the energy's balance against the core. Every bar carries one gloss line, the reader its subject, under sixteen words, read by pole (catalyst = the gift, friction = the overgrown version with its cost) and by level band (low 1 to 2, mid 3, high 4 to 5); the style bar reads by its end. The gloss explains the number, never the trait (the chips carry the trait). Derived, never written per chart: the engine computes the levels (Elementum_App/src/engine/functionMetrics.js), the words come from this file. |
| **sources** | REA_19 Function Metrics (the derivation and the scale) · REA_02 §5f (the five functions and their families) · the owner's rulings of 2026-10-14 (three bars; two trait bars from the ten-god distribution; the style bar with no better end) |

## Candidate variables

| Variable | Value |
|---|---|
| `function` | mind |
| `gods` | 偏印 · 正印 |
| `element_note` | the feeder element; the style bar reads its volume |
| `bars[0].key` | intuition |
| `bars[0].label` | Intuition |
| `bars[0].god` | 偏印 |
| `bars[0].persona` | The Alchemist |
| `bars[0].ask` | how much you learn by your own route |
| `bars[0].gloss.catalyst.low` | You learn the taught way and trust what others tested first. |
| `bars[0].gloss.catalyst.mid` | You pick things up by your own route when the usual one is slow. |
| `bars[0].gloss.catalyst.high` | You understand things nobody taught you, by a route only you can see. |
| `bars[0].gloss.friction.low` | Your own hunches get little room, and you wait to be shown. |
| `bars[0].gloss.friction.mid` | You keep learning a little past the point of deciding. |
| `bars[0].gloss.friction.high` | You keep learning instead of deciding, and the finished thing waits. |
| `bars[1].key` | stability |
| `bars[1].label` | Stability |
| `bars[1].god` | 正印 |
| `bars[1].persona` | The Sage |
| `bars[1].ask` | how much solid ground you need before you move |
| `bars[1].gloss.catalyst.low` | You move before the ground is solid, and mostly it holds. |
| `bars[1].gloss.catalyst.mid` | You want some solid ground before you move, then you move. |
| `bars[1].gloss.catalyst.high` | You give people a safe place to think, and you keep one for yourself. |
| `bars[1].gloss.friction.low` | You find little shelter in what you know, and you move on quickly. |
| `bars[1].gloss.friction.mid` | You stay with what is proven a little longer than it needs. |
| `bars[1].gloss.friction.high` | You stay sheltered in what you know, past the point of use. |
| `bars[2].key` | instinct_research |
| `bars[2].label` | Instinct · Research |
| `bars[2].style` | true |
| `bars[2].ends` | Instinct · Research |
| `bars[2].ask` | whether you act on what you sense or read up first |
| `bars[2].gloss.low` | You act on what you already sense and read up afterwards, if at all. |
| `bars[2].gloss.mid` | You check a little before you move and trust the rest to instinct. |
| `bars[2].gloss.high` | You read up before you move, and you read a little more after that. |
