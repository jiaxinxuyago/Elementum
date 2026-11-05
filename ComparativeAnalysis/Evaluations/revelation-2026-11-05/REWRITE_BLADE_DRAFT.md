# The revelation, rewritten: the Blade (golden chart), DRAFT

> Status: DRAFT by the Day Master session, 2026-11-05, for the owner to rule. A worked example of the explanation ladder (see EVAL.md §5), written for the golden chart (庚, Overfueled; Earth 33, Wood 33, Metal 23, Water 6, Fire 5; needs Fire).
> Locked lines reused verbatim are marked [locked]. Everything else is new.
> Voice: REA_16 laws hold (no em dash, no semicolon, no absolutes, no hedges, no "you can", no fate words).

## The ladder every label climbs

1. **What it is in nature.** One image a child could picture: "Earth is the ground: it holds and it absorbs."
2. **What it runs in a life.** The function in everyday words: "Mind is how you take things in: learning, thinking, resting, the support you lean on."
3. **What that looks like in you.** The amount turned into behaviour the reader can check against their own week: "You have a lot of it. You gather and prepare more than most."
4. **You might notice.** One concrete, recognisable moment: "You keep researching a decision long after you could have made it."
5. **Try this.** One small action for the energy's pole (Grow, Release or Keep).

A card may stop at rung 3 when space is short, but it never skips rungs 1 and 2.

## Card 0 · The Naming

- Eyebrow: **Your Day Master**
- Name: **The Blade**
- Line under the name: **Yang Metal, steel that has already been through the fire.**
- Recognition line: **You'd rather say the true thing than the easy one.**
- Footnote (small): **Your Day Master is the element of the day you were born, read as your core self. It is not your year animal.**
- The five dots stay, captioned with the element names only.

## Card 1 · Who the Blade is

- Eyebrow: **The Blade**
- Heading: **Metal is the element of clarity. It sorts, cuts and decides.**
- Body: **As a Blade, you are that edge in a person. You might notice:**
  - You see the flaw in a plan before anyone asks.
  - Being vague feels worse to you than being wrong. [locked]
  - People come to you when they need the unsoftened truth. [locked]
- Contrast line: **People see someone sharp and certain. Inside, you are checking every word for whether it is true.**
- Closing line, set apart: **You say what others soften, then quietly pay for being the one who did.** [locked]

## Card 2 · Your five energies

- Eyebrow: **What you're made of**
- Heading: **Everyone holds all five elements. In you, each one runs a part of your life.**
- One row each, with the sign, the element and the share:
  - **Metal, your Body.** You yourself: your confidence, your limits, how you stand your ground. 23%
  - **Earth, your Mind.** How you take things in: learning, rest, the support you lean on. 33%
  - **Wood, your Action.** What you go after: work, money, results. 33%
  - **Water, your Expression.** How you put yourself out: speaking, making, showing what you feel. 6%
  - **Fire, your Order.** The rules, deadlines and people you answer to. 5%
- Close: **The next five cards take them one at a time.**

## Card 3 · How you run

- Eyebrow: **How you run**
- Heading: **You run Overfueled: more comes into you than goes out.**
- Body: **You take in, prepare and carry more than you let out. It makes you steady under pressure. It also means energy builds up with nowhere to go, and it comes out as impatience.**
- Try this: **Let one thing out each day: a decision, a sentence, a finished draft.**
- The dial stays.

## Cards 4 to 8 · One energy each (heaviest first, the need last)

### Earth · your Mind · 33% · Release it

- **Earth is the ground: it holds and it absorbs.**
- **Mind is how you take things in: learning, thinking, rest, the people you lean on.**
- **You have a lot of it. You gather and prepare more than most, and you feel safest when you know enough.**
- You might notice: **you keep researching a decision long after you could have made it.**
- Try this: **give your next decision a deadline, then decide on the day.**

### Wood · your Action · 33% · Grow it

- **Wood is a tree that keeps reaching.**
- **Action is what you go after: work, money, results you can point to.**
- **You have plenty. You build steadily, and a finished task settles you.**
- You might notice: **a day without one thing done leaves you restless.**
- Try this: **aim it at one result that matters this week, not five that don't.**

### Metal · your Body · 23% · Release it

- **Metal is your own element: the edge itself.**
- **Body is you yourself: confidence, limits, standing your ground.**
- **You have more than enough. You rely on yourself, sometimes past the point it helps.**
- You might notice: **you finish alone what two people would finish faster.**
- Try this: **hand one task to someone else this week and leave it with them.**

### Water · your Expression · 6% · Grow it

- **Water is flow: the river that carries things out.**
- **Expression is how you put yourself out: speaking, making, showing what you feel.**
- **You have very little. Your thoughts stay in until they are finished.**
- You might notice: **people only learn what you think once you've already decided.**
- Try this: **say one unfinished thought out loud this week.**

### Fire · your Order · 5% · Grow it (your need)

- **Fire is heat and light: the forge that shapes metal.**
- **Order is the rules, deadlines and people you answer to.**
- **You have almost none. Without someone real to answer to, you sharpen alone and wait for a test worth meeting.**
- You might notice: **you do your best work when someone whose judgement you respect sets the bar.**
- Try this: **take on one commitment someone else will hold you to.**

## Card 9 · Your type

- Eyebrow: **Your type**
- Name: **The Blade · Mind mode**
- Heading: **Mind mode: you take in and prepare before you act.**
- Body: **Your chart leans on Mind. The Fire you need is real stakes from outside, someone or something that tests the edge.**
- Start here: **Grow your Fire: one commitment someone else holds you to.**
- Your circle: **Suns and Candles carry the Fire you need. Who in your life is one?** (opens Who completes your chart)
- Buttons: **Enter your reading →** and **Share your type**.

## New station fields this needs (for all ten stems)

| Field | Count | Notes |
|---|---|---|
| `ELEMENT.nature` (rung 1) | 5 | one line per element, shared by every stem |
| `FUNCTION.plain` (rung 2) | 5 | one line per function, shared |
| `FUNCTION.in_you` by volume (rung 3) | 25 | 5 functions × 5 volumes (absent, thin, present, abundant, dominant) |
| `FUNCTION.notice` by pole (rung 4) | 15 | 5 functions × Grow, Release, Keep |
| `FUNCTION.try` by pole (rung 5) | 15 | 5 functions × Grow, Release, Keep; ties to Pillar 3 |
| `STEM.element_line`, `STEM.recognition`, `STEM.notice` ×3 | 50 | per stem: the card 1 heading, the Naming's recognition line, three behaviours (two may come from the locked `dm_claims`) |
| `CONDITION.plain` + `try` | 6 | Overfueled, Underfueled, Balanced |
| `TYPE.mode_plain` | 5 | "Mind mode: you take in and prepare before you act" |

That is 126 lines, most of them shared. Stem flavour for rungs 3 to 5 can come later.
