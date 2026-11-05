# RS2 · The revelation sequence, painted: implementation brief

> **Ruled:** owner 2026-11-05, direction **A, the painted scroll**, with changes. On each energy card, the five-energy sign is enlarged into the card's leading icon, and the dominance bar shows how much of that energy the reader holds.
> **Storyboard:** https://claude.ai/artifact/KxvFeNPcg1cPVNXER6fMWu (source `Ink_Painting_Artifacts/07_revelation-directions.html`).
> **Builds on:** RS1 A ("one ground", DES_15 §Follow-up), the locked ink painting system (`Ink_Painting_System.md`) and the Elementum Type (`TYPE_LINE`, `buildMergedModel().type`).
> **Who does what (owner 2026-11-05):** the design director session builds this: imagery, layout and UI. The Day Master session owns the words: card copy, rulings and polish. Where this brief needs a line that is not ruled yet, use the current string and mark it with `dp-draft` on dev. The Day Master session will rule it.

## The shape (unchanged from RS1)

The Naming → eight cards → the dissolve into Your reading. Same ground, progress bar, Skip, tap to go on, and "Enter your reading". The code is `JourneyStage.jsx` (`rvl-overlay`) plus `FirstReading` in `MergedViews.jsx`. Everything stays behind `MERGE_V1`/`SC_LIVE` as today, and the new parts go behind `TYPE_V1` on dev.

## Frame by frame

| # | Frame | Picture (slot, `inkArt.jsx`) | Words (source) | Notes |
|---|---|---|---|---|
| 0 | **The Naming** | the stem's **stage** (`dmStage`) along the foot, replacing `bg-reveal-01/02` | "You are", the plate, the name, 庚 · Yang Metal, the five energies by presence, "Swipe up" | The stage is toned like the house plates (as on the Day Master screen). Keep the plate, the dots and the inscription. |
| 1 | **The sign** (replaces "You are The Blade") | **D1** (`dmArt(stem, 1)`), bleeding off the top, with the stage faint at the foot | Heading: the first sentence of `STEM_WHO`. Body: the rest. Eyebrow "The sign" | The name is said once, in the Naming. The copy is a DRAFT to rule (Day Master session). |
| 2 | **How you run** | **D3** (`dmArt(stem, 3)`) closing the card from the bottom-right corner | `You run {condition}.` + `g.runLine`; the dial stays | Same masks as the Day Master card 5. |
| 3–7 | **The five energies** (in `g.order`) | that stem's **scroll strip** (`stripArt(stem, el)`), full card height, down the left, dissolving under the text | Eyebrow: the pair head (`PAIR_HEAD`). Heading: `{Energy} is your {Function} energy.` Body: the function teaser (as today) | See "The energy card" below. |
| 8 | **The type and where to begin** | the stage at the foot | Eyebrow "Your type": `t.name` ("The Blade · Mind mode") and `t.line`. Then "Where to begin": `g.start` + the start energy's head. Buttons: **Enter your reading →** (primary) and **Share your type** (opens the existing type share card) | The type line is ruled (`TYPE_LINE`). The card's eyebrow labels are DRAFT. |

### The energy card (cards 3–7), with the owner's changes

- **The element sign is never missing (owner 2026-11-05: "I did not see the five energy icons on their ink dots, they can't be missed").** Every ink dot in the sequence carries its element glyph (`InkDot`, which lays `el-{el}` from the sprite on the dot): the Naming's five dots, each energy card's leading sign, and any small dot. A bare dot image with no glyph is wrong.
- **The sign leads.** The five-energy sign (`InkDot` with its element glyph, not the plain dot image) is the card's largest icon, at about 56px. It sits at the top of the text column, before the eyebrow and heading, with the amount beside it: **{n}%** large in Cormorant, and "of your chart" small in Cinzel caps beneath. Among the words, it should read as the most important mark on the card.
- **The dominance bar.** Under the heading goes one bar of all five energies in the reader's order, each segment sized by presence and coloured with its element's wash. This energy's segment is at full strength and the others are at about 28%. It is the same distribution as the energy page's presence bar (`ej-nbar`); reuse that component or its styles. It shows how much of this energy the reader holds next to the other four.
- **The state pill** (Release it / Grow it / Keep) follows the bar, and then the body text.
- **The scroll** sits on the left, as on Day Master card 4: full height, bleeding off the edge, the right half dissolving under the text column. The text column starts at about 92px.
- **Until a stem's strips exist,** the scroll slot falls back to nothing. The dev marker from `inkArt.jsx` names the file. The sign and the bar carry the card meanwhile.

## Layout law (applies to every frame)

- No frame leaves more than 40% of the screen bare. Measure each frame on the golden chart and on one Balanced chart.
- Only the ink lands: multiply plus masks, no frames or boxes (§1 of `Ink_Painting_System.md`).
- Don't change the dominance wheel, the stem plates, the element signs or the iconography.

## Check

- **Charts:** the golden chart (1995-04-29 18:00), chart B (1990-09-17 05:00) and the Balanced chart (1995-05-13 16:00). Run the Naming → 8 cards → dissolve, and confirm the dissolve still inks the wheel's dots one by one.
- **Journey sweep:** 17/17.
- **Deploy:** push to main for dev.elementum.life, then update the storyboard artifact (or a new "Revelation Built" artifact) with real screens.
