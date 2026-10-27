# D1–D3 — The 30 Day Master page illustrations: draft subjects

> **Ruled:** A1 A, A3 A (owner, 2026-10-27): 55 images in all, these 30 plus the N1 25. The Day Master session drafts the subjects from the stations; the design session folds them into its N1 commission. Record: `ComparativeAnalysis/Handoffs/2026-10-17-day-master-diagnosis/04_RULINGS.md`.
> **Status:** DRAFT subjects, for the owner to rule row by row (codes D-{stem}-{n}).
> **Who paints:** the owner's image pipeline, to the N1 house spec, with the same style anchors.

## The slots

The Day Master page (`DayMasterPage` in `components/journey/MergedViews.jsx`) already has quiet frames that show each file once it lands (A4 A, on dev).

| Image | Card | Subject from | Ratio | Size | Path |
|---|---|---|---|---|---|
| D1, the sign | 2 · The sign | `dm_overview` | 16:9 | 1280 × 720 | `/concept-arts/stems/dm/{py}-d1.png` |
| D2, your nature | 3 · Your nature | `inscription` and `yourNature_desc` | 4:5 | 880 × 1100 | `/concept-arts/stems/dm/{py}-d2.png` |
| D3, your edge | 5 · How your edge is built | `dm_mechanism` | 1:1 | 1000 × 1000 | `/concept-arts/stems/dm/{py}-d3.png` |

`{py}` is the stem's pinyin: jia, yi, bing, ding, wu, ji, geng, xin, ren, gui. Put the files in `Elementum_App/public/concept-arts/stems/dm/` and run `node tools/compress-art.mjs`; the budget is under 300 KB each.

## Spec

The N1 spec holds unchanged: ink-wash on warm rice paper, one off-centre focal point, generous empty paper, soft wet edges, the lower third fading into the paper. Never text, calligraphy, seals, faces or frames.

- **Pigment:** ink plus the stem's own element only. The one exception is 庚 D3, whose locked text names spring wood (Metal plus Wood).
- **The three angles:** D1 is the stem's world (its season and its place). D2 is the stem doing its trait, close and vertical. D3 is the mechanism, a close detail of a process.
- **No people.** Where a text names people, their work or their belongings stand in for them.

Shared prompt prefix: the N1 prefix, with `{RATIO}` in place of "3:2 landscape" (16:9 landscape · 4:5 portrait · square).

## The 30 subjects

| Code | Stem | Image | Line it is cut from | Subject (append to the prefix) |
|---|---|---|---|---|
| D-jia-1 | 甲 The Oak | sign | "the seed that argues with the ground and wins … every road that is still mostly promise" | a lone young oak on an early-spring hillside at dawn, a faint unmade path at its foot running off into mist |
| D-jia-2 | 甲 | nature | "You grow toward a light you can't prove yet" | a tall trunk seen from its base, rising past the top of the frame toward a thin light, a new green shoot already starting beside its roots |
| D-jia-3 | 甲 | edge | "a spine that rose by reaching, season over season" | the cut face of a trunk, its growth rings all drawn toward one side, where the light came from |
| D-yi-1 | 乙 The Vine | sign | "On an old stone wall … by year's end the stones have quietly moved" | a vine climbing an old dry-stone wall in late spring, one stone eased out of line by its roots |
| D-yi-2 | 乙 | nature | "You find a way around what stops other people" | a vine stopped by a closed wooden gate, reaching around it and through the lattice of the window beside it |
| D-yi-3 | 乙 | edge | "wins by yielding, resilience dressed as softness" | a thin green stem bent flat under wind beside a stiff reed snapped in half, the stem unbroken |
| D-bing-1 | 丙 The Sun | sign | "high summer and full noon, opening every market" | a full noon sun over low village rooftops, a wide open sky, short shadows under the eaves |
| D-bing-2 | 丙 | nature | "Everything that grows turns toward it" | a low wide sun over a field of sunflowers, every head turned toward it |
| D-bing-3 | 丙 | edge | "radiance steadied by what it warms" | the sun held whole in a still pond below it, the two lights answering each other across the empty paper |
| D-ding-1 | 丁 The Candle | sign | "In a night window it holds one table, one page, one face" | a single oil lamp in a night window, its circle of light holding one table and an open book, dark beyond |
| D-ding-2 | 丁 | nature | "What you turn toward gets all of you, and everything else waits in the dark" | a candle flame leaning toward one teacup, the cup lit warm and the rest of the room in soft dark |
| D-ding-3 | 丁 | edge | "a focused heat that endures by staying contained" | a flame steady inside a paper lantern while the grass outside bends in the wind |
| D-wu-1 | 戊 The Mountain | sign | "It carries snow on its shoulders … the wall that rivers learn to walk around" | a great mountain with snow on its shoulders, a river bending around its foot, a thread of road far below |
| D-wu-2 | 戊 | nature | "You are the Earth others use to find their footing" | stone steps cut into a mountainside and worn smooth in the middle, climbing out of mist |
| D-wu-3 | 戊 | edge | "weight that becomes shelter under load" | a small hut and a pine sheltered in the lee of a cliff, snow blowing past above them |
| D-ji-1 | 己 The Field | sign | "the tilled dark earth of the family plot … late summer" | a small tilled plot in late summer, dark earth between ripening rows, low warm light |
| D-ji-2 | 己 | nature | "the harvest goes home in other people's hands" | full harvest baskets set along a path at the field's edge, the field behind them bare and dark |
| D-ji-3 | 己 | edge | "fertile ground that asks for no credit" | a cut-away of soil: a sprout above, its roots spreading through dark loam that has drunk in rain and ash |
| D-geng-1 | 庚 The Blade | sign | "Between wars it hangs on the wall and says nothing" | a plain sword hanging on a bare wall beside an open window, an autumn harvest field outside |
| D-geng-2 | 庚 | nature | "You say what others soften" | one bamboo stalk cut clean through, its two halves parting, the blade out of frame |
| D-geng-3 | 庚 | edge | "tempered by spring wood, strength that grew against resistance" | a blade's edge pressed into a living spring branch that bends against it, a fine line of light along the unchipped edge (Metal and Wood) |
| D-xin-1 | 辛 The Jewel | sign | "the ornament, the needle, the struck coin … the last of autumn" | a needle, a struck coin and a small cut stone on folded cloth, bare late-autumn branches in the window |
| D-xin-2 | 辛 | nature | "You hold your work to a standard nobody set, and it never says finished" | one cut gem on a jeweller's cloth under a lamp, a single facet still rough |
| D-xin-3 | 辛 | edge | "an edge made keen by polishing, not by force" | a fine needle's point catching one spark of light over a fold of polishing cloth |
| D-ren-1 | 壬 The Ocean | sign | "Past the harbor mouth it keeps its own maps" | open sea past a harbour mouth in early winter, the surface still, long dark current lines moving beneath |
| D-ren-2 | 壬 | nature | "What you show is a fraction of what's moving" | a cut-away at the waterline: a calm ripple above, deep layered water below, a broad current moving far down |
| D-ren-3 | 壬 | edge | "carves by patience, force that wins by not insisting" | a narrow canyon whose stone walls are worn into smooth curves, a quiet stream at the bottom |
| D-gui-1 | 癸 The Rain | sign | "At winter's end it falls softly on planted fields through the night" | soft night rain over planted fields at winter's end, mist lying low on the rows |
| D-gui-2 | 癸 | nature | "You soak up what everyone around you feels" | a stone bowl of water standing in the rain, the rings of many drops overlapping on its surface |
| D-gui-3 | 癸 | edge | "perception that travels where pressure cannot" | mist moving through a lattice window, passing through every opening into the room |

## When the art is in

1. Put the 30 files in `public/concept-arts/stems/dm/`. The frames on the Day Master page show them with no code change.
2. Check all ten stems on dev with the Day Master page in one-page mode.
3. The page goes live with TYPE_LIVE (PM_02 GO-2).

## Test paintings (2026-10-27)

The owner asked for real paintings in place of the tinted frames. A test of 庚 (D-geng-1, 2, 3) was painted with Figma's image generator, model gpt-image-2.5-sunburst. That model matched the house heroes; gemini-3.1-flash-image gave a flat pen sketch. The test is in `public/concept-arts/stems/dm/geng-d{1,2,3}.png`, cover-cropped to spec and palette-compressed under 300 KB. The Figma file is "Elementum · Day Master illustrations (D1–D3)". The prompt adds to the N1 prefix: "masterful … rich layered ink, dark confident strokes for the subject, pale washes and drifting mist, dry-brush texture … museum-quality".

## Painted (2026-10-27): all 30 at F2

The owner compared four fidelity levels on the Blade (F0 detailed, F1 loose brush, F2 xieyi freehand, F3 Zen minimal) and ruled **F2**, then "paint the rest". All 30 are painted with gpt-image-2.5-sunburst, using this prefix:

> Traditional Chinese xieyi freehand ink painting on plain warm rice paper: spontaneous, expressive brushwork, each form suggested in a few bold strokes, ink bleeding softly into the paper, dry-brush flicks, large areas of untouched paper. Black-and-grey ink with a single faint wash of {pale element colour}. {Wide landscape, one-corner composition | Tall portrait | Square}, subject off-centre, most of the paper empty. Subject: {subject}. No people, no text, no calligraphy, no seal, no border.

- **Masters:** `Design/Assets/DayMaster/` (README there).
- **App copies:** `Elementum_App/public/concept-arts/stems/dm/`.
- **Known weak painting:** D-geng-3. The branch only touches the blade's tip instead of bowing against its edge. It took two tries, and a repaint is open.
