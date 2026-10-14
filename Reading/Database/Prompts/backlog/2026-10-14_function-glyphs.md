# Backlog · the function glyphs: five line icons, one per function (owner 2026-10-14)

**Status: RULED and BUILT 2026-10-14 (step 4 of the owner's order for The Function section; app chrome, no station field changes).**

## The owner's words

> Ok now, let's do the icons first before the 75 metric line ruling.

> (on the placement) Find your best visual decision, research other astrology app designs and go with your taste.

## The three questions

| Q | Choices | Ruling |
|---|---|---|
| 1. The style | thin line glyphs (recommended) · brush-mark glyphs · Chinese character seals | **Thin line glyphs**: monoline 1.6px strokes on the 24 grid, round caps and joins, no fill, the register of the journey sprite's own tab and domain icons |
| 2. The motif | everyday objects (recommended) · abstract marks · the elements' shapes | **Everyday objects**: Body a standing figure, Mind an open book, Expression a speech bubble with a quote mark, Action a mallet, Order a scale |
| 3. The placement | beside the function title · the FUNCTION tile · the keyword sheet's band · the dominance wheel (off limits) | **The assistant's call** (the owner: research other astrology apps and go with your taste) |

## The placement decision

Researched: The Pattern (ScreensDesign's 119-screen capture; the Pratt design critique), Co-Star (two Pratt critiques: monochrome line illustrations that separate and label sections as you scroll; the critique's finding that small, light section labels confuse and that signifiers for tappable items must be consistent), CHANI (planet and sign glyphs leading sections; the ScreensDesign capture). The web pages describe little of the icon systems; the decision rests on the critiques' two lessons (name the sections plainly, keep one signifier per kind of tap) and on the assistant's own reading of the apps.

Decided:

1. **Beside the function title**, on the function detail page and on the element page's FUNCTION tile: a 20px glyph leads "Earth is your Mind.", tinted by pole (green catalyst, red friction). The same mark on both so the function is learned as a picture on the tile before the tap, and recognised on the page after it. This is CHANI's convention (a glyph leads the section it names), not Co-Star's (illustrations between sections), because the glyph here names a thing, the function, and the eyebrow already separates the sections.
2. **The keyword sheet's band** carries the function glyph as its watermark, in place of the pole arrow: the sheet that opens from a chip is a page of that function, and the band already had a watermark slot. The pole still shows in the pill's colour.
3. **Not on the dominance wheel** (its design is ruled off limits), not on THE CHARACTER or THE REMEDY eyebrows (one glyph per page: the function's; the sections are named by their eyebrows, which the owner ruled the same day).

## What was built

- `Elementum_App/src/components/journey/journeyDefs.js`: five symbols appended to the journey sprite, `jny-fn-body`, `jny-fn-mind`, `jny-fn-expression`, `jny-fn-action`, `jny-fn-order`.
- `journeyData.js`: `fnKey` on the element screen (the function's key, beside its label).
- `JourneyStage.jsx`: the glyph leads the title on the detail page and the tile (`el-fntitle`, `el-fnicon`), tinted by pole; the keyword sheet's watermark is the glyph (`el-fnwm`).
- `journey.css`: the title row, the glyph's size and pole tints, the watermark's opacity and tilt.
- The source drawings and exports: `ComparativeAnalysis/Reference/function-glyphs/` (the five SVG files and transparent 192px PNGs).

## Open

- The glyphs are drawn by the assistant and can be re-cut on the owner's note, glyph by glyph (the mallet was re-cut once before landing: the first head read as a torch at 16px).
