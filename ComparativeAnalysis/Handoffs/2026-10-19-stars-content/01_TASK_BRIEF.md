# Task brief: Stars (神煞) reading content, ruling and writing

The owner, 2026-10-19: "Start another session for Star reading content ruling."

Stars are the lighter, older layer of the reading: the classical symbolic stars, each colouring the gate it sits in. Some arrive with a decade (Seeker) or a year (Advisor).

The page is built and live on the dev site with templated content. Your job is to rule the content with the owner, write it, and land it.

## 1. What exists

- **Page:** `StarsPage` in `Elementum_App/src/components/journey/DepthViews.jsx`, fed by `resolveStars` in `src/components/reading/depthResolve.js`. On the catalogue it is the YOUR STARS beat, with star chips. The approved shape is the round-7 mockup (https://claude.ai/artifact/JMy3dsp2wr48poZE6ffAYy), grouped help, test, then arriving (P4 A).
- **Engine:** `Elementum_App/src/engine/depth/stars.js`. It holds:
  - `STARS` (19 entries with base, target and kind);
  - `DAY_PILLAR_STARS` (魁罡);
  - `voidOf` (空亡);
  - `starsOf(chart)`, the natal stars by gate;
  - `arrivingStars(chart, pillar)`, the stars a decade or year brings.

  `tools/qa-depth-golden.mjs` asserts the golden values.
- **Sourced research:** `ComparativeAnalysis/Handoffs/2026-10-17-domains/research/shensha-rules.json` and `.md`. It covers 19 stars across 三命通会, 五行精纪, 渊海子平, 神峰通考 and 协纪辨方书, with every table, variant, meaning, valence and the gendered readings. Read the .md first; it lists twelve school differences.
- **Rulings:**
  - **D1–D6 (round 4):**
    - about 16 classical stars, hard ones included with the friction framing;
    - common calculation bases;
    - stars arriving with decades (Seeker) and years (Advisor);
    - a lighter layer;
    - English names with 汉字;
    - 羊刃 = "the Ram's Edge".
  - **W6:** one reading per star × gate × tense.
  - **W7:** the Nobleman and Scholar's Star come from the day stem only.
  - **W8:** the 19 sourced stars; the Taiji Nobleman is out.
  - **W13:** a star never sits on its own base.
  - **I2 (stars in or out) and I3 (pricing):** still TBD with the owner.
- **Golden units already written and gated:**
  - chip lines for 文昌 红鸾 孤辰 羊刃 劫煞 亡神;
  - readings in the golden gates and tenses;
  - the arriving line and decade reading for the Nobleman and Peach Blossom;
  - the year readings for the Nobleman and the Void.

  They are in `src/content/depth.js`; the source is `ComparativeAnalysis/Prompts/out/handoff/2026-10-18-depth-template/template.json`.
- **Gate:** `…/2026-10-18-depth-template/gate.mjs`, kinds `star_line`, `star_reading` and `star_arriving`.

## 2. The 19 stars and their current working names (to rule)

**Help (9 stars):**
- 天乙贵人 Nobleman
- 文昌 Scholar's Star
- 天德贵人 Heavenly Virtue
- 月德贵人 Moon Virtue
- 禄神 Prosperity Star
- 金舆 Golden Carriage
- 将星 Commander Star (not "General's Star": the General is a character name)
- 红鸾 Red Phoenix
- 天喜 Heavenly Joy

**Help, where the classics call them mixed (3 stars):**
- 华盖 Canopy Star
- 驿马 Travelling Horse
- 桃花 Peach Blossom

**Test (7 stars):**
- 羊刃 Ram's Edge
- 劫煞 Robbery Star
- 亡神 Lost Spirit
- 孤辰 Lonely Star
- 寡宿 Solitary Star (the literal "widow" is gendered)
- 魁罡 Dipper Star
- 空亡 the Void

Golden chart (natal):
- Scholar's Star, Year Gate.
- Red Phoenix, Month Gate.
- Ram's Edge, Hour Gate.
- Robbery Star, Year Gate.
- Lost Spirit, Day Gate.
- Lonely Star, Day Gate.

Golden chart (arriving):
- With the decades: the Nobleman (2023–2032) and Peach Blossom (2033–2042).
- With the years: the Void in 2026 and 2027.

Chart B:
- Scholar's Star, Moon Virtue, Prosperity Star, Commander Star.
- Red Phoenix in two gates, Heavenly Joy.
- Peach Blossom in two gates, the Void.

Chart C (no birth hour):
- Heavenly Joy, Robbery Star, Lost Spirit, the Void.

## 3. The units to write

| Unit | Station key | Count | Words |
|---|---|---|---|
| Chip line (natal, chart-neutral) | STAR `<id>` · `line` | 19 | 5–14 |
| Chip line (arriving) | STAR `<id>` · `line.arriving` | 19 | 5–14 |
| Reading by gate and tense | STAR `<id>` · `reading.<year\|month\|day\|hour>.<lived\|now\|coming>` | about 140 (some stars cannot sit in some gates) | 35–65 |
| Arriving with a decade (Seeker) | STAR `<id>` · `arriving.decade.now\|coming` | 38 | 20–45 |
| Arriving with a year (Advisor) | STAR `<id>` · `arriving.year` | 19 | 20–45 |

## 4. Open questions to bring to the owner early

1. **The names.** Several are working names: Commander Star, Moon Virtue, Solitary Star, Dipper Star, the Void, Golden Carriage, Prosperity Star. Rule each one.
2. **Mixed stars.** Peach Blossom, the Travelling Horse and the Canopy Star are classically mixed or inauspicious; the page groups them as stars that help. Confirm, or add a third group.
3. **The two hardest stars.** The round-5 idea of collapsing the Robbery Star and Lost Spirit into one row is not built; each shows separately. Rule it.
4. **A star in two gates** (chart B: Red Phoenix and Peach Blossom). Today one card lists both gates with a reading for each. Confirm.
5. **The Void** weakens whatever sits on it. Should a star on a void branch say so?
6. **I2 and I3.** Do stars stay in the product, and at what price?
7. **Classical meanings vs the prediction law.** The sources say robbery, accident, bereavement, loss of a spouse, and "for women". None of that may reach the text (G1, G2). Show the owner how each hard star is framed: a plain cost, the want, and what carries the reader, per `Operations/Business/BIZ_04_Friction_Framing_Research.md`.

## 5. Deliver

1. A brief, the names ruling, and golden samples first:
   - the golden chart, then charts B and C;
   - every star card in full, before and after, with questions.
2. After the owner rules:
   - write the batch with the sealed-writer pattern (copy and extend the depth gate);
   - land it in a new STAR station axis (`Reading/Database/templates/by_axis/json/STAR/`);
   - add the REA_16 registry rows;
   - give Stars its own generated content module;
   - add a stars surface to the audit kit;
   - audit, push, verify the dev site.
3. Going live is the owner's call.
