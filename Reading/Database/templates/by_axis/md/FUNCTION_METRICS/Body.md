# body — Body  ·  FUNCTION_METRICS archetype

> **GENERATED from the by_axis JSON — do not hand-edit.** Edit the JSON (or request the change), then re-run `node tools/build-template-twins.mjs`.
>
> DRAFT 2026-10-14: the fifteen metrics and their lines were agreed with the owner in session (the names, the three-bar balance, the style bars with no better end) and wired into the app on the owner's "start writing and map those into our app artifact and station database"; every gloss line stays provisional until the owner reads it in the app and rules it, line by line, as with every other field.

| | |
|---|---|
| **axis** | FUNCTION_METRICS |
| **key** | body |
| **canonical name** | Body |
| **construct** | THE FUNCTION METRICS (owner 2026-10-14, step 2 of the owner's order for The Function section; REA_19): three bars per function on the energy page between the definition and the chips. Two TRAIT bars, one per god of the family, each with a fixed everyday label (the words other astrology and personality apps use) and a height from that god's share of the chart; one STYLE bar with two plain ends and no better end, tilted by the energy's balance against the core. Every bar carries one gloss line, the reader its subject, under sixteen words, read by pole (catalyst = the gift, friction = the overgrown version with its cost) and by level band (low 1 to 2, mid 3, high 4 to 5); the style bar reads by its end. The gloss explains the number, never the trait (the chips carry the trait). Derived, never written per chart: the engine computes the levels (Elementum_App/src/engine/functionMetrics.js), the words come from this file. |
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
| `bars[0].gloss.catalyst.low` | You lean on others easily and borrow strength without losing your own. |
| `bars[0].gloss.catalyst.mid` | You handle your share and ask for help when the share grows. |
| `bars[0].gloss.catalyst.high` | You carry your own weight without being asked, and people count on it. |
| `bars[0].gloss.friction.low` | You rarely stand alone, and your line bends to whoever is nearest. |
| `bars[0].gloss.friction.mid` | You hold your own line most days and carry a little more than you need to. |
| `bars[0].gloss.friction.high` | You carry everything alone, past the point where help would have been faster. |
| `bars[1].key` | competitiveness |
| `bars[1].label` | Competitiveness |
| `bars[1].god` | 劫财 |
| `bars[1].persona` | The Rival |
| `bars[1].ask` | how much a rival sharpens you |
| `bars[1].gloss.catalyst.low` | A rival does little for you, so you set your own bar and meet it. |
| `bars[1].gloss.catalyst.mid` | Someone to beat lifts your game when the stakes are real. |
| `bars[1].gloss.catalyst.high` | You do your best work with someone to beat, and you usually win. |
| `bars[1].gloss.friction.low` | You keep little score, and what you win you rarely count. |
| `bars[1].gloss.friction.mid` | You keep a quiet tally with the people closest to you. |
| `bars[1].gloss.friction.high` | You keep score with the people you like, and the count costs you friends. |
| `bars[2].key` | solo_team |
| `bars[2].label` | Solo · Team |
| `bars[2].style` | true |
| `bars[2].ends` | Team · Solo |
| `bars[2].ask` | whether your strength runs best alone or beside people |
| `bars[2].gloss.low` | Your strength runs best beside people, with company to measure against. |
| `bars[2].gloss.mid` | You work alone or with people as the day asks, with no strong pull either way. |
| `bars[2].gloss.high` | Your strength runs best alone, with the room to yourself. |
