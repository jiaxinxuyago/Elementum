# REA_19 · Function Metrics

| | |
|---|---|
| **Scope** | The three bars on every energy page's function section: what they measure, how the engine derives them from the chart, and where their words live. Step 2 of the owner's order for The Function section (1 the definition construct, 2 the metrics, 3 the chip expansion, 4 the icons). |
| **Version** | 0.2 · 2026-10-15 (the level glosses retired, the bars static, the definitions backlogged) · 0.1 · 2026-10-14 (born on the owner's rulings of the day: three bars; two trait bars from the ten-god distribution; one style bar with no better end; everyday labels; one gloss line per bar, collapsed at rest; the words in the station, the numbers from the chart) |
| **Owner rulings** | 2026-10-14: "3 bars" · "it could be more accurately breakdown by the user's actual ten-god distribution" · "Pick again on the neutral ones" (the style bars with no better end) · "plain terms … daily used, work-environment often used, common among other astrology app word picks" · "should each bar be expanded to a line of description" (yes, one line, collapsed) · "Starting writing and map those into our app artifact and station database" |
| **Station** | `Reading/Database/templates/by_axis/json/FUNCTION_METRICS/{Body,Mind,Expression,Action,Order}.json` (the editing surface, REA_05 §1) |
| **Code** | `Elementum_App/src/content/metrics.js` (the deliberate transcription) · `Elementum_App/src/engine/functionMetrics.js` (the derivation) · `JourneyStage.jsx` (`MetricBars`, between the definition and the chips) · `tools/export-reading-templates.mjs` (the audit, the FUNCTION_METRICS axis) · `tools/qa-selection-fixtures.mjs` (contract M1) |

## §1 · The principle

A bar is a claim the engine makes. Every number comes from the chart and a ruled scale, never from a writer, and every bar can be explained in one sentence a reader could check. The same three bars on every chart's page for a function, so a reader learns to read them. The gloss line explains the number, never the trait: the chips beneath carry the trait's drive and cost.

## §2 · The three bars per function

Two trait bars, one per god of the function's family, each with a fixed everyday label; one style bar with two plain ends and no better end.

| Function | Trait bar 1 (the yang god) | Trait bar 2 (the yin god) | Style bar (ends) |
|---|---|---|---|
| Body | Independence (the Twin 比肩): how much you handle on your own | Competitiveness (the Rival 劫财): how much a rival sharpens you | Team to Solo |
| Mind | Intuition (the Alchemist 偏印): how much you learn by your own route | Stability (the Sage 正印): how much solid ground you need before you move | Instinct to Research |
| Expression | Warmth (the Artisan 食神): how much of you comes out as care | Creativity (the Virtuoso 伤官): how much of you comes out as the new idea or the sharp line | Reserved to Expressive |
| Action | Ambition (the Horizon 偏财): how much you reach for the next opening | Discipline (the Steward 正财): how much you keep what you build | Focused to Multitasking |
| Order | Leadership (the General 七杀): how much pressure you take on and hand out | Responsibility (the Magistrate 正官): how much you answer to the rules you accepted | Flexible to Structured |

The style bar's low end is the thin side of the energy (little of it against the core) and its high end the heavy side; neither end is better.

## §3 · The derivation (the scale)

Inputs, all already in the journey model's energy row: the energy's presence (percent of the chart), its role (core, catalyst, friction), the core's excess override, its volume (absent, thin, present, abundant, dominant), the core's band (Underfueled, Balanced, Overfueled), and the faces (each god of the family with its share of the energy, summing to 100).

- **A trait bar's level.** The god's share of the chart = the energy's presence × the god's face share ÷ 100. Steps: 0 → level 1 (the god has no face on this chart; shown, not hidden); up to 6 → 2; up to 14 → 3; up to 24 → 4; above 24 → 5.
- **A style bar's level.** The energy's volume: absent 1 · thin 2 · present 3 · abundant 4 · dominant 5. For the core element (the Body page) the core's band instead: Underfueled 2 · Balanced 3 · Overfueled 4 · Overfueled with the excess override 5.
- **The pole.** Friction when the energy's role is friction or the core carries its excess; catalyst otherwise. The pole chooses the trait bars' gloss, not their height.
- **The band.** Low = levels 1 and 2 · mid = 3 · high = 4 and 5. A trait bar reads its gloss by pole and band (six lines per trait); a style bar by band alone (three lines).

The steps are a ruled table, not a formula: they can be moved by the owner without touching the words, and the fixtures (M1) hold the structure on eight charts.

## §4 · The words

**v0.2 (owner 2026-10-15): no words per level.** The owner ruled the level glosses unnecessary: a bar's label explains itself, as the MBTI metrics do; a line per level is a reading of the person, which the ledger owns, and it multiplies with every scale change. The seventy-five draft lines of v0.1 (sixty for the ten traits, fifteen for the style bars) are retired in the station (`retired_gloss` in each `FUNCTION_METRICS/<Function>.json`), never ruled, never rendered, and the engine no longer carries a gloss. The one line a metric may carry is its fixed definition (`candidates.bars[].ask`, fifteen lines), backlogged for the glossary sheet and not rendered until the owner rules them and names the surface (`Reading/Database/Prompts/backlog/2026-10-15_metric-definitions.md`).

## §5 · The page

**v0.2:** the measure panel is static. Nothing on it is tappable; the bars, the labels and the style ends are the whole surface.

The bars sit between the definition and the chips on the function detail page: label on the left, a five-segment track on the right; a trait bar fills its level, a style bar marks its position with its two ends printed beneath. Collapsed at rest; a tap opens the bar's line. On the friction pole the filled segments take the friction tint, so the page's pole shows at a glance.

## §6 · What is open

- The owner's line-by-line ruling of the seventy-five lines.
- Whether the Ten Gods page should point at these bars or show its own distribution (the bars complement it; nothing was removed).
- The icons for the five functions and the two poles (step 4), which would sit beside the labels.
- The chip expansion (step 3), where the verdict returns as the collapsed card's teaser (`backlog/2026-10-14_verdict-pending-teaser.md`).

## §7 · Log

| Date | Change | Ruling |
|---|---|---|
| 2026-10-14 | Born: the fifteen metrics, the scale, the seventy-five lines, the engine, the page, the audit axis, contract M1 | owner 2026-10-14 (the session's rulings above) |
| 2026-10-15 | v0.2: the level glosses retired (the seventy-five drafts to `retired_gloss`, station only), the bars static, the engine without a gloss, contract M1 without the gloss check; the fifteen metric definitions backlogged for the glossary, not rendered | owner 2026-10-15 ("no level glosses, static bars, and 15 metric definitions in the glossary (backlog them for now and do not reveal them from our app)") |
