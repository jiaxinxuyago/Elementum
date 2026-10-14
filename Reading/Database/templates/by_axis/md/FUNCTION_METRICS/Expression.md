# expression — Expression  ·  FUNCTION_METRICS archetype

> **GENERATED from the by_axis JSON — do not hand-edit.** Edit the JSON (or request the change), then re-run `node tools/build-template-twins.mjs`.
>
> DRAFT 2026-10-14: the fifteen metrics and their lines were agreed with the owner in session (the names, the three-bar balance, the style bars with no better end) and wired into the app on the owner's "start writing and map those into our app artifact and station database"; every gloss line stays provisional until the owner reads it in the app and rules it, line by line, as with every other field.

| | |
|---|---|
| **axis** | FUNCTION_METRICS |
| **key** | expression |
| **canonical name** | Expression |
| **construct** | THE FUNCTION METRICS (owner 2026-10-14, step 2 of the owner's order for The Function section; REA_19): three bars per function on the energy page between the definition and the chips. Two TRAIT bars, one per god of the family, each with a fixed everyday label (the words other astrology and personality apps use) and a height from that god's share of the chart; one STYLE bar with two plain ends and no better end, tilted by the energy's balance against the core. Every bar carries one gloss line, the reader its subject, under sixteen words, read by pole (catalyst = the gift, friction = the overgrown version with its cost) and by level band (low 1 to 2, mid 3, high 4 to 5); the style bar reads by its end. The gloss explains the number, never the trait (the chips carry the trait). Derived, never written per chart: the engine computes the levels (Elementum_App/src/engine/functionMetrics.js), the words come from this file. |
| **sources** | REA_19 Function Metrics (the derivation and the scale) · REA_02 §5f (the five functions and their families) · the owner's rulings of 2026-10-14 (three bars; two trait bars from the ten-god distribution; the style bar with no better end) |

## Candidate variables

| Variable | Value |
|---|---|
| `function` | expression |
| `gods` | 食神 · 伤官 |
| `element_note` | the fed element; the style bar reads its volume |
| `bars[0].key` | warmth |
| `bars[0].label` | Warmth |
| `bars[0].god` | 食神 |
| `bars[0].persona` | The Artisan |
| `bars[0].ask` | how much of you comes out as care |
| `bars[0].gloss.catalyst.low` | Care comes out of you in small doses, and it lands when it does. |
| `bars[0].gloss.catalyst.mid` | People leave you a little better than they arrived. |
| `bars[0].gloss.catalyst.high` | People leave you better fed than they arrived, and they come back for it. |
| `bars[0].gloss.friction.low` | You give little away, and what you give you measure. |
| `bars[0].gloss.friction.mid` | You give more than you keep, most days. |
| `bars[0].gloss.friction.high` | You give until nothing is left for you, and call it being kind. |
| `bars[1].key` | creativity |
| `bars[1].label` | Creativity |
| `bars[1].god` | 伤官 |
| `bars[1].persona` | The Virtuoso |
| `bars[1].ask` | how much of you comes out as the new idea or the sharp line |
| `bars[1].gloss.catalyst.low` | You say what works more than what is new, and it works. |
| `bars[1].gloss.catalyst.mid` | The new angle comes to you when the usual one has been tried. |
| `bars[1].gloss.catalyst.high` | You say the thing nobody else saw, and you say it well. |
| `bars[1].gloss.friction.low` | Your sharp line stays in, and the usual words do the job. |
| `bars[1].gloss.friction.mid` | The sharp line gets out a little before it is useful. |
| `bars[1].gloss.friction.high` | You say the sharp thing before anyone asked, and it lands where it should not. |
| `bars[2].key` | reserved_expressive |
| `bars[2].label` | Reserved · Expressive |
| `bars[2].style` | true |
| `bars[2].ends` | Reserved · Expressive |
| `bars[2].ask` | how much of what is inside shows on the outside |
| `bars[2].gloss.low` | Most of what is inside stays inside, and people guess the rest. |
| `bars[2].gloss.mid` | You show what the moment needs and keep the rest for later. |
| `bars[2].gloss.high` | What is inside comes out as it comes, and people always know where you stand. |
