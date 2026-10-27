# N1 — The illustration commission: the 25 energy-sheet pair paintings and the 30 Day Master page images

> **Ruled:** N1 A (owner, 2026-10-21): commission all 25 pair paintings to this spec. A1 A, A3 A (owner, 2026-10-27): 55 images in all; the 30 Day Master page images (Part B) use this house spec and were drafted by the Day Master session, folded in here 2026-10-27. Backlog: PM_02 GO-2. Records: DES_15; `ComparativeAnalysis/Handoffs/2026-10-17-day-master-diagnosis/04_RULINGS.md`.
> **Who paints:** the owner's image pipeline (ChatGPT/DALL-E, per DES_14 §6 step 5), using the vault's `_Curated/ChatGPT_Backgrounds_v1/references/ref-*.jpg` as style anchors. A session cannot reach the vault from the cloud.

# Part A · The 25 energy-sheet pair paintings (ruled N1 A)

## The slot

The energy sheet (`EnergySheet` in `components/journey/MergedViews.jsx`) shows one picture per energy tap. Its subject is the pair: your core element × the tapped energy. 5 cores × 5 energies = 25 paintings. Yin and yang stems of one element share a painting; the sheet's story sentence carries the stem.

## Spec (every painting)

- **Size:** 1100 × 733 px (3:2), PNG. This is the `concept-arts/library` plate format, so the same file can also serve tiles. After painting, run `node tools/compress-art.mjs`; the budget is under 300 KB each.
- **File name:** `pair_{core}_{energy}.png`, e.g. `pair_metal_fire.png`. Put the files in `Elementum_App/public/concept-arts/pairs/`.
- **Style:** house ink-wash (水墨) on warm rice paper. One focal point placed off-centre (one-corner composition, generous 留白). Soft wet edges. The bottom third fades into plain paper so the painting melts into the sheet.
- **Colour:** ink plus only the two elements' pigments: Metal `#8ba3b8`, Wood `#7a9e6e`, Fire `#c4745a`, Earth `#b89a6a`, Water `#5a7fa8`.
- **Never:** text, calligraphy, signatures, red seals (the screen's one chop-red lives elsewhere), people's faces, borders or frames.
- **Motif source:** the core element's stem imagery (DES_14 §1) acting with the energy's element, showing the locked relation (feeds you · shapes you · you feed it · you shape it · more of you).

## Shared prompt prefix

> Traditional Chinese ink-wash painting (shuimo) on warm aged rice paper, minimal, one focal subject placed off-centre with wide empty paper, soft wet ink edges, muted pigment washes limited to {PIGMENTS}, the lower third fading softly into blank paper, no text, no calligraphy, no seal stamps, no frame, 3:2 landscape. Subject:

## The 25 subjects

| Core | Energy | Relation | Subject (append to the prefix) | Pigments |
|---|---|---|---|---|
| Metal | Metal | more of you | two sword blades crossed and grinding edge to edge, a fine spray of sparks as ink dots | metal blue-grey |
| Metal | Wood | you shape it | an axe sunk into a split log, pale wood fibres opened | metal blue-grey, wood green |
| Metal | Fire | shapes you | a blade laid across glowing forge coals, heat haze above | metal blue-grey, fire red-orange |
| Metal | Earth | feeds you | a seam of raw ore glinting inside a damp, mossy hillside | metal blue-grey, earth ochre |
| Metal | Water | you feed it | dew gathering along a blade's edge at dawn and dripping into the ground | metal blue-grey, water blue |
| Wood | Metal | shapes you | a pruning blade trimming a single flowering branch | wood green, metal blue-grey |
| Wood | Wood | more of you | a tall trunk and a climbing vine grown together into one | wood green |
| Wood | Fire | you feed it | dry kindling catching a small, bright flame | wood green, fire red-orange |
| Wood | Earth | you shape it | tree roots splitting a stone and opening the soil | wood green, earth ochre |
| Wood | Water | feeds you | roots reaching down to drink at a river bank | wood green, water blue |
| Fire | Metal | you shape it | a bar of metal softening red in the coals | fire red-orange, metal blue-grey |
| Fire | Wood | feeds you | a neat stack of dry branches beside a hearth fire | fire red-orange, wood green |
| Fire | Fire | more of you | a small lamp burning beneath a large setting sun | fire red-orange |
| Fire | Earth | you feed it | warm ash settling around clay pots in a kiln | fire red-orange, earth ochre |
| Fire | Water | shapes you | soft rain falling on a lit paper lantern | fire red-orange, water blue |
| Earth | Metal | you feed it | a mountain cut open to show a seam of ore | earth ochre, metal blue-grey |
| Earth | Wood | shapes you | tree roots breaking open a tilled field | earth ochre, wood green |
| Earth | Fire | feeds you | a hillside kiln firing pots, smoke rising | earth ochre, fire red-orange |
| Earth | Earth | more of you | mountain ranges layered behind ranges in mist | earth ochre |
| Earth | Water | you shape it | terraced rice paddies holding still water | earth ochre, water blue |
| Water | Metal | feeds you | a clear spring running out of a rock face | water blue, metal blue-grey |
| Water | Wood | you feed it | rain falling on a stand of bamboo | water blue, wood green |
| Water | Fire | you shape it | steam rising where a stream runs over embers | water blue, fire red-orange |
| Water | Earth | shapes you | river banks guiding a bending river | water blue, earth ochre |
| Water | Water | more of you | a river widening into the open sea | water blue |

## When the art is in

1. Mirror the 25 files to `public/concept-arts/pairs/`.
2. Point the sheet's illustration slot at `pair_{coreEl}_{el}.png`. Ruling R9 A uses the existing element plate as the interim picture until then.
3. Drop the `IS_DEV_TOOLS` gate on the slot (PM_02 GO-2), push, and check the result on elementum.life.


# Part B · The 30 Day Master page images (D1–D3; subjects DRAFT, the owner rules row by row by code D-{stem}-{n})

The Day Master page (`DayMasterPage` in `components/journey/MergedViews.jsx`) carries three images per stem. It already shows quiet frames at these paths on the dev site (A4 A), so no code change is needed when the art lands.

| Image | Card | Subject from | Ratio | Size | Path |
|---|---|---|---|---|---|
| D1, the sign | 2 · The sign | `dm_overview` | 16:9 | 1280 × 720 | `/concept-arts/stems/dm/{py}-d1.png` |
| D2, your nature | 3 · Your nature | `inscription` and `yourNature_desc` | 4:5 | 880 × 1100 | `/concept-arts/stems/dm/{py}-d2.png` |
| D3, your edge | 5 · How your edge is built | `dm_mechanism` | 1:1 | 1000 × 1000 | `/concept-arts/stems/dm/{py}-d3.png` |

`{py}` is the stem's pinyin: jia, yi, bing, ding, wu, ji, geng, xin, ren, gui. Put the files in `Elementum_App/public/concept-arts/stems/dm/` and run `node tools/compress-art.mjs`; the budget is under 300 KB each.

## Spec (Part B)

The Part A spec and prompt prefix hold unchanged, with three differences:

- **Ratio:** `{RATIO}` in place of "3:2 landscape": 16:9 landscape (D1) · 4:5 portrait (D2) · square (D3), at the sizes above.
- **Pigment:** ink plus the stem's own element only. The one exception is 庚 D3, whose locked text names spring wood (Metal plus Wood).
- **No people.** Where a text names people, their work or their belongings stand in for them.

The three angles: D1 is the stem's world (its season and its place). D2 is the stem doing its trait, close and vertical. D3 is the mechanism, a close detail of a process.

## The 30 subjects (draft; source `D1-D3_Day_Master_Illustrations_Brief.md`, the Day Master session)

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

## When the Part B art is in

1. Put the 30 files in `public/concept-arts/stems/dm/`. The frames on the Day Master page show them with no code change.
2. Check all ten stems on dev with the Day Master page in one-page mode.
3. The page goes live with TYPE_LIVE (PM_02 GO-2).
