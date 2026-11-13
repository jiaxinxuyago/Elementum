# RS3 · The revelation on the explanation ladder: build brief

> **For:** the design director session (imagery, layout, UI). **From:** the Day Master session (words, rulings).
> **Ruled by the owner:** EV1–EV5 A (2026-11-06), the Blade's script V0–V9 A and all shared and stem lines S1–S7, P-* A (2026-11-13). Record: `ComparativeAnalysis/Handoffs/2026-10-17-day-master-diagnosis/04_RULINGS.md`.
> **Why:** the first pass scored 37/100 against the four pillars (`ComparativeAnalysis/Evaluations/revelation-2026-11-05/EVAL.md`). Readers could not say what Blade, Earth or Mind energy means (CG1).
> **Replaces:** the words and order of RS2 (`RS2_Revelation_Painted_Brief.md`). RS2's paintings, slots and layout law carry over.
> **The words are final.** Don't rewrite a line. If a line doesn't fit a layout, ask the Day Master session.

## What to look at

- **The storyboard:** https://claude.ai/artifact/ArtsZDbFaDojriJH8HF2mz (source `ComparativeAnalysis/Evaluations/revelation-2026-11-05/blade-revelation.html`). Ten phone frames for the Blade on the golden chart. Its layout is a sketch; the words and the order are ruled.
- **Every stem's words:** https://claude.ai/artifact/Vbdk8fG5gpphy9oMhcDVdg (source `…/all-stems.html`), with the Vine assembled in context.
- **The code:** `Elementum_App/src/content/ladder.js` exports `LADDER` (shared rows), `STEM_LADDER` (per stem), `LADDER_NOTICE_BAND` and `LADDER_TRY_POLE`. Nothing renders it yet. Station copies: `TEMPLATED/tpl_ladder.json` and `STEM/*.json` `ladder`.

## The ten cards (EV3 A)

| # | Card | Words (source) | Picture |
|---|---|---|---|
| 0 | **The Naming** | Eyebrow "Your Day Master". The name. `STEM_LADDER[stem].element_line`. `recognition`, large. The five signs with element names only. `LADDER.naming_footnote`, small | the plate, the stage |
| 1 | **Who the {Name} is** | Heading `LADDER.element_heading[Element]`. `as_line` + "You might notice:". Three bullets: `behaviour`, then the two locked `DM_READING[stem].claims`. `contrast`. The locked inscription, set apart with the red rule | D1 |
| 2 | **Your five energies** | **The Day Master's stem sign, clearly, at the top (owner V2 note)**: the plate with "{Name} · {stem glyph}". `LADDER.model_heading`. Five rows: sign, "{Element}, your {Function}", the share, `LADDER.function_short[Function]`. The dominance bar with all five at full strength. `LADDER.model_close` | the plate |
| 3 | **How you run** | `LADDER.condition[condition].heading`, `.body`, and "Try this:" + `.try`. The dial stays | D3 |
| 4–8 | **One energy each**, heaviest first, the need last | See "The energy card" | the stem's scroll strip |
| 9 | **Your type and circle** | Eyebrow "Your type". `type.name`. `LADDER.mode_plain[Mode]`. The need sentence from `LADDER.need_pattern` with `need_phrase[need function]`. "Start here": the need's `try` row. The circle: the Fuel stems' plates, "{Fuel} carry the {El} you need." + `LADDER.circle_close`. Buttons: Enter your reading, Share your type | the stage |

### The energy card (cards 4–8)

Five text blocks in this order, under the large sign with its amount and the dominance bar (this energy lit), with the scroll down the left as in RS2:

1. **Nature:** `LADDER.nature_pair[coreElement][element]`; for the reader's own element, `STEM_LADDER[stem].self_nature`.
2. **Function:** `LADDER.function_plain[Function]`.
3. **In you:** `LADDER.in_you[Function][volume]`, where volume is the engine's `volumeOf(presence)`.
4. **You might notice:** `LADDER.notice[Function][LADDER_NOTICE_BAND[volume]]`. Capitalise the first letter when it follows the label.
5. **Try this:** `LADDER.try[Function][LADDER_TRY_POLE[pole]]`, with the Grow it, Release it or Keep pill as its label.

**Overrides:** before using a shared row, check `STEM_LADDER[stem].overrides` for the key `"in_you.{Function}.{volume}"`, `"notice.{Function}.{band}"` or `"need_phrase.{Function}"`. The Blade has three.

**Order of the five cards:** by presence, heaviest first, except that the need (`merged.first`) always comes last. On a Balanced chart there is no need: order by presence, and use the `keep` rows.

## Rules that come with the words

1. **Five named ideas on the first pass (EV4 A):** Day Master, element, the five energies as functions, type, circle. The words Overfueled, Underfueled and Balanced appear only on card 3. Friction, Catalyst and the relation verbs ("feeds", "forges") don't appear in the revelation; they stay on the pages behind it. Grow it, Release it and Keep appear only as the label on a "Try this".
2. **Meaning before numbers.** On each energy card the nature and function lines must be readable before the eye lands on the percentage. The sign stays the leading icon; the amount sits beside it, not above the words.
3. **Every ink dot carries its element sign** (owner, RS2).
4. **The stem sign on card 2** (owner V2 note): the reader must see whose five energies these are.
5. **Yin and Yang get the taichi symbol (owner 2026-11-13):** "when mentioned Yin and Yang, make sure we include yin and yang taichi symbol (each sides) image on the page."
   - Wherever a page says Yin or Yang, the taichi symbol appears beside the word, with the reader's own side marked: the light half for a Yang stem, the dark half for a Yin stem.
   - That covers the line under the name on the Naming ("Yang Metal, …") and the stem line on the Day Master page.
   - The app has no taichi symbol yet, so draw one for the sprite in the house ink style: one symbol with two states, each side lit. Show the owner the symbol before it goes in everywhere.
6. **No screen more than 40% bare**, only the ink lands, and the rest of the layout law in `Ink_Painting_System.md` §1.

## Open design questions for you

- The energy cards now hold five text blocks plus the sign, bar and scroll. Decide whether they fit one screen at the storyboard's sizes or scroll within the card; the owner has not ruled either way. Test at 390×844 and at a short phone (667 high).
- Stems without scroll strips yet keep the RS2 fallback (the centred card, the dev marker).

## Check

Golden chart (1995-04-29 18:00), chart B (1990-09-17 05:00, the Vine: Metal 74%, Water 0%) and the Balanced chart (1995-05-13 16:00). Count the named ideas on screen across the ten cards (five or fewer outside card 3). Journey sweep 17/17. Build behind TYPE_V1, push to main for dev.elementum.life, and show the owner real screens.
