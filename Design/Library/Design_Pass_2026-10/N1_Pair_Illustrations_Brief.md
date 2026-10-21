# N1 — The 25 energy-sheet pair illustrations: commission brief

> **Ruled:** N1 A (owner, 2026-10-21): commission all 25 to this spec. Backlog: PM_02 GO-2. Record: DES_15.
> **Who paints:** the owner's image pipeline (ChatGPT/DALL-E, per DES_14 §6 step 5), using the vault's `_Curated/ChatGPT_Backgrounds_v1/references/ref-*.jpg` as style anchors. A session cannot reach the vault from the cloud.

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
