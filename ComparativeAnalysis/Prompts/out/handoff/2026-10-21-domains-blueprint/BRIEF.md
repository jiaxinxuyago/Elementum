# Sealed-writer brief: the Energy Blueprint batch (owner R2 A, 2026-10-21)

You are writing units for the Energy Blueprint, the Advisor section of Elementum that decodes a reader's BaZi chart. It is live on elementum.life, and every unit you write replaces a placeholder line.

Work only from this folder:
- `BRIEF.md`: this file, the laws.
- `worklist-N.json`: your units, each with its key, kind and context.
- `template.json`: the owner-approved golden units, your tone and shape.
- `gate.mjs`: the gate.

Write `out-N.json` as `{ "units": [ { "key", "kind", "page", "text" } ] }`, with one entry per worklist item and the same key, kind and page. Run `node gate.mjs out-N.json` and fix every finding until it prints PASS. Do not edit any other file.

## The voice (the laws the gate enforces, and the ones it cannot)

1. **Second person, present tense.** The reader is the subject of the last sentence: it starts with "You" or "Your", or turns on ", and you …".
2. **Punctuation:**
   - periods and commas only, with at most two commas in a sentence;
   - no dash, semicolon or colon;
   - no digits;
   - no Chinese characters in the text (labels carry the 汉字);
   - no italic.
3. **No hedging:** never may, might, perhaps, probably, likely, tends to, sometimes, often.
4. **No advice:** no imperative, no "should", no counsel line. Describe what happens and what the reader does, never what they ought to do.
5. **Banned words:**
   - delve, tapestry, testament, pivotal, crucial, intricate, robust, seamless, foster, underscore, showcase, leverage, vibrant, nestled, profound, realm, unlock, elevate, resonate, navigate, landscape, journey;
   - trauma, trigger, boundaries, attachment style, regulate, nervous system;
   - destiny, fate, karma, cosmic, universe, palace, pillar, ten gods, BaZi, day master, luck;
   - "ahead of", ", so".
6. **Hard news (the prediction law).** It is allowed only with what carries the reader through. Never illness, death, divorce, bankruptcy, accidents, disasters or sums of money. No pain words. At most one body part in a line.
7. **Gender-neutral.** No he, she, his, her, husband, wife; use partner.
8. **Chart invariance.** A unit is shared by every chart that has its key, so it must not lean on anything else in the chart. A unit keyed by a character (GOD qisha …) may name only that character (the General). Season readings name no character at all.
9. **Concrete, not abstract.** Name scenes and behaviours a reader recognises: a deadline someone else sets, a second plan nobody has heard about. Avoid mechanism words (energy, element balance, structure) inside the sentence, except where the template uses them.
10. **No repeats.** Units on one page must not share a five-word run; the gate checks this by `page`. Vary openings.

## The characters (personas, always with "the")

Twin 比肩 · Rival 劫财 · Artisan 食神 · Virtuoso 伤官 · Horizon 偏财 · Steward 正财 · General 七杀 · Magistrate 正官 · Alchemist 偏印 · Sage 正印.

What each stands for, briefly:
- Twin: self-reliance, equals.
- Rival: competition, sharing what you have.
- Artisan: ease, appetite, making things.
- Virtuoso: a sharp voice, talent that rebels.
- Horizon: range, side doors, windfalls.
- Steward: careful keeping, earned value.
- General: pressure that forges, hard tests.
- Magistrate: rules, duty, a role.
- Alchemist: strange knowledge, private study.
- Sage: shelter, learning, being looked after.

## The kinds (budgets in words and sentences)

| Kind | Words | Sentences | What it does |
|---|---|---|---|
| `season` | 30–60 | 2–3 | The 调候 reading for a Day Master born in a month: what the season does to the reader's nature, then what it asks for, as elements. Ends on the reader. It never says what the chart holds; the need lines do that. |
| `season_need` | 14–32 | 1 | How the chart holds one character the season asks for. `shown` = on show in plain view; `rooted` = inside a branch as its main stem, not on show; `hidden` = only deep inside a branch. Template: "The Horizon your season asks for sits inside your chart without showing, and you find your openings through side doors more than front ones." |
| `missing` | 22–45 | 2 | A character absent from the chart: what nobody inside the chart does for the reader, and how the reader lives with it. Template: "No Magistrate sits in your chart …" |
| `seen` | 9–22 | 1 | `seen.plain`: how the reader comes across, from a character on show ("You come across as …"). `seen.inside`: what the reader wants or does in private, from a character inside a branch. |
| `structure` | 22–50 | 2–3 | What the chart is built around, for a structure (格局). Template: zhengcai_ge. |
| `status` | 12–36 | 1–2 | One note on a structure's state (the label "Formed." / "Formed, under strain." / "Broken." prints separately). It names the strain and what it costs the reader, or for formed, what the reader can lean on. |
| `pattern_bp` | 14–32 | 1 | A god pairing at chart level (the pairing's name prints as a label). |
| `bond` | 12–30 | 1 | A bond between gates, read as its consequence (the label prints the mechanism). |

**What the gates mean for bonds:**
- Year Gate: the family you came from and the years to fifteen.
- Month Gate: your work, your rising years from sixteen to thirty-four, parents and siblings.
- Day Gate: you, a partner and your home, from thirty-five.
- Hour Gate: the people after you (children, younger relatives, someone you train) and your later life, from forty-eight.

**What the bonds mean:**
- bind (六合): attraction, a tie that holds both.
- clash (六冲): movement, a change that comes from tension.
- punish (刑): friction that repeats, rules and pressure you put on yourself.
- harm (六害): a quiet irritation that wears at something.
- frame (三合 or a half frame): an alliance, momentum that gathers.
- selfpunish (自刑): the same pattern repeating in two parts of life.

Write the consequence in those parts of life. Templates:
- bond.bind.year_day: "You build your own home close to the habits of the one you grew up in, and you return to them more than you expected."
- bond.bind.month_hour: "You carry the people and skills of your working years into your later life, and the circle you build now stays with you."

Each worklist item carries the context it needs: the classical data and the template.
