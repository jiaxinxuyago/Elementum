# The ink painting system: Day Master page and five-energy journey

> **Owner of record:** the Day Master session (handed off 2026-11-05 to the design director session).
> **Rulings:** `ComparativeAnalysis/Handoffs/2026-10-17-day-master-diagnosis/04_RULINGS.md`.
> **Machine-readable prompts:** `Ink_Painting_Prompts.json` (beside this file).
> **Code:** `Elementum_App/src/components/journey/inkArt.jsx`, which holds every slot path, the fallback hook and the dev markers.
> **Pipeline:** `Elementum_App/tools/build-ink-art.mjs`, which rebuilds the app copies from the masters.

This file is the contract for every painting on the Day Master page and the five-energy journey. Every rule here comes from an owner note, and the iteration log at the end says which note produced which rule. When a new note arrives, add a row to the log, change the rule or template it touches, and keep `Ink_Painting_Prompts.json` in step. The final batches must be painted from the templates as they stand after the last log row.

---

## 1 · The style law (locked)

1. **Minimal shanshui ink wash.** The register is Song album leaves, Ma Yuan's one-corner pictures and Ni Zan's sparse river scenes:
   - few brushstrokes and pale diluted ink (淡墨, 清墨);
   - one darker accent, kept for the main subject;
   - soft mist instead of detail;
   - most of the paper left blank (留白).

   *"Too detailed … apply the minimalistic aesthetics", "minimalism is the key."*
2. **The stem's object shows itself.** The stem's own object (the Blade, the Oak, the Candle …) is the clearest, darkest form in the picture. The energy acts on it so the relation reads at a glance. *"The stem object or imagery must show itself clearly and convey the relations between the energy vividly."* When a test comes back with a faint main subject, add "The {object} is the darkest, most distinct form in the painting." to the prompt and repaint.
3. **Only the ink lands.** On screen, each painting is multiplied onto the cardstock after a filter lifts its paper to white, so the card's own paper shows through. Every edge is masked into the paper. No frames, no boxes, no rectangles.
4. **Text shares the paper.** Labels and reading start in a painting's mist or blank paper, never in a caption block beneath it.
5. **No screen more than 40% bare.** Where a card leaves bare paper, a painting fills it: the stage under the Day Master cards, the scroll down each card 4 row.
6. **Tonal reference.** The house background plates in `Design/Assets/Backgrounds` (warm, pale, low contrast, mist) set the tone for any painting used as a background. Reusing a plate directly was tried and set aside because it is generic across stems.
7. **Never:** people or faces, hands, text, calligraphy, seals or signatures in the painting, borders, a drawn circle. The element's ink dot is laid over the painting in code, never painted in.
8. **Colour:** ink plus faint washes of only the elements in the picture:

   | Element | Wash |
   |---|---|
   | Metal | blue-grey `#8ba3b8` |
   | Wood | pale green `#7a9e6e` |
   | Fire | vermilion-orange `#c4745a` |
   | Earth | ochre `#b89a6a` |
   | Water | indigo `#5a7fa8` |

**The stem objects** (the spine, from DES_14 §1):

| Stem | Name | Object |
|---|---|---|
| 甲 jia | The Oak | the oak |
| 乙 yi | The Vine | the vine |
| 丙 bing | The Sun | the sun |
| 丁 ding | The Candle | the candle or lamp |
| 戊 wu | The Mountain | the mountain |
| 己 ji | The Field | the tilled field |
| 庚 geng | The Blade | the sword |
| 辛 xin | The Jewel | the cut jewel |
| 壬 ren | The Ocean | the open sea |
| 癸 gui | The Rain | the rain |

**The five relations** (from the reader's core, locked wheel words):

| Relation | What the energy does to the stem's object | Example (the Blade) |
|---|---|---|
| more of you (same element) | a second one beside it, grinding or leaning together | two swords leaning edge to edge |
| feeds you | the object is born from or nourished by it | a sword rising out of the mountain |
| shapes you | the energy works it into form | a sword in the forge fire |
| you shape it | the object acts on it | a sword lodged in a split young trunk |
| you feed it | the object gives itself into it | a sword standing in a stream, dew running off |

---

## 2 · The slots

Every path below is in `inkArt.jsx` or `EnergyJourney.jsx`. On the dev build, every slot without its file shows a dashed "art to come" marker naming the file it waits for. On the live site an unpainted slot shows its fallback or nothing.

| Slot | Where | File (app copy) | Master | Size | Count | Status |
|---|---|---|---|---|---|---|
| D1 the sign | Day Master card 2, bleeds off the top | `stems/dm/{py}-d1.png` | `Design/Assets/DayMaster/dm-{py}-d1.jpg` | 1280×720 | 10 | **locked** (F2) |
| D2 your nature | card 3, a column the text flows around | `stems/dm/{py}-d2.png` | `dm-{py}-d2.jpg` | 880×1100 | 10 | **locked** (F2) |
| D3 your edge | card 5, closes the card from the corner | `stems/dm/{py}-d3.png` | `dm-{py}-d3.jpg` | 1000×1000 | 10 | **locked**, but D-geng-3 is weak (repaint) |
| Stage | the Day Master screen's foot, under every card | `stems/dm/{py}-stage.png` | `dm-{py}-stage.jpg` | 880×1100 | 10 | **locked** (minimal) |
| Scroll strip | card 4, each energy row's left column, full row height | `pairs/strip_{py}_{el}.png` | `Design/Assets/Pairs/strip_{py}_{el}.jpg` | 432×768 | 50 | 5 painted (geng), **current direction** |
| Pair, 3:2 | the energy page's relation box ("The relation") | `pairs/pair_{py}_{el}.png` | `pair_{py}_{el}.jpg` | 1100×733 | 50 | 5 geng in the older F2 style, **repaint minimal** |
| Energy hero | the energy page's name band and the energy sheet | `energy/hero_{el}_{yang\|yin}.png` | `Design/Assets/Energy/hero_{el}_{yang\|yin}.jpg` | 1100×733 | 10 | **new slot, 0 painted** (falls back to the library landscape) |
| Function vignette | the function page (P2, EJ8) | `functions/{fnKey}.png` | — | spec to write | 5 | slot only |
| Persona seal | the domains, per god (P3, EJ8) | `personas/{god}.png` | — | spec to write | 10 | slot only |

- **`{py}`** is the stem pinyin (jia yi bing ding wu ji geng xin ren gui).
- **`{el}`** is the energy element (metal wood fire earth water).
- **Per stem:** the strips and pairs are per stem (owner 2026-11-05), so 辛 the Jewel gets its own set and does not see the Blade's.
- **Hero polarity:** the energy hero follows the reader's polarity, the same rule as the library resolver `elementArt`: a yang stem reads `_yang`, a yin stem reads `_yin`.

### Layout of each slot, as built (`merged.css`, `energy.css`)

- **D1:** full card width plus the side gutters; the top corners are rounded with the card. The mask fades the painting to nothing at 96% of its height, and the label plus the first line sit inside that fade.
- **D2:** floats right at 46% width, 4:5, bleeding off the card's right edge. The left and bottom edges dissolve, and the inscription and portrait wrap it.
- **D3:** 60% width, rising from the bottom-right corner. The top and left edges dissolve.
- **Stage:** fixed to the screen's foot at 124% width, 4:5, centre-bottom. Its top 30% is transparent, it is toned `sepia(.25)`, and it sits under the cards.
- **Scroll strip:**
  - an absolute column 150px wide that bleeds 15px off the card's left edge and runs the row's full height (the row is at least 200px);
  - right half dissolves under the text;
  - top and bottom fade;
  - the element's ink dot sits at the strip's foot at 58% scale, like a painter's seal;
  - the text column is 96px in; the black arrow button (`readcirc`) is pinned top-right.
- **Pair 3:2:** the relation box's picture band (`.ej-pairart`).
- **Energy hero:** the name band's background, `center 35%` cover, with a gradient to paper over its lower 30% where the name sits. Keep the subject in the upper two thirds.

---

## 3 · The prompt templates (current, after the last log row)

The model is `gpt-image-2.5-sunburst`, through Figma `generate_image`, into the Figma file "Elementum · Day Master illustrations (D1–D3)" (file key `xNqBs5iqpkgcIOzSljHdHd`). `gemini-3.1-flash-image` gave a flat pen sketch and was set aside. The tool returns a download URL that expires in 7 days, so download each file at once.

- **Masters:** save as JPG at quality 90 in `Design/Assets/{DayMaster|Pairs|Energy}/`.
- **App copies:** run `node tools/build-ink-art.mjs [name-filter]` from `Elementum_App/`. Never hand-edit an app copy.

### T-D (D1, D2, D3), F2 xieyi, locked
> Traditional Chinese xieyi freehand ink painting on plain warm rice paper: spontaneous, expressive brushwork, each form suggested in a few bold strokes, ink bleeding softly into the paper, dry-brush flicks, large areas of untouched paper. Black-and-grey ink with a single faint wash of {element wash}. {Wide landscape, one-corner composition | Tall portrait | Square}, subject off-centre, most of the paper empty. Subject: {subject}. No people, no text, no calligraphy, no seal, no border.

Request 1920×1080 (D1), 1024×1280 (D2), 1024×1024 (D3). Subjects: `D1-D3_Day_Master_Illustrations_Brief.md`.

### T-STAGE, minimal, locked
> Minimal Chinese shanshui ink wash painting in the manner of Ni Zan and Ma Yuan, on plain warm rice paper. Most of the paper is left blank (liubai). Level-distance composition: the whole scene is a thin band along the bottom fifth of the paper, made of very few brushstrokes; distant forms are single pale grey washes with no detail, near forms a handful of light strokes, at most one small dark accent. Soft mist separates the planes. Pale diluted ink with a barely visible tint of {element wash}. Tall portrait. Subject: {subject}. No people, no text, no seal, no border.

Request 1024×1280.

### T-STRIP (card 4), current
> Minimal Chinese ink wash painting in a tall narrow hanging-scroll format, in the manner of Song album leaves and Ma Yuan, on plain warm rice paper. Few brushstrokes, pale grey ink with darker accents on the main subject, soft mist, generous blank paper around it. The main subject is clear and readable, filling the middle height of the scroll; the right side dissolves into mist and blank paper. A faint {energy wash} on the {energy's thing} and a faint {core wash} on the {stem object}. Subject: {stem object acting the relation with the energy}. The {stem object} is the darkest, most distinct form in the painting. No people, no hands, no text, no seal, no border.

Request 1024×1792 (the model returns 864×1536). Keep the stem's object in the left 60% of the frame: the strip shows about the left 55% of the width, and the right side dissolves under the text.

### T-PAIR (3:2), derived for the minimal repaint, test first
> Minimal Chinese ink wash painting as a landscape album leaf (3:2), in the manner of Song album leaves and Ma Yuan, on plain warm rice paper. Few brushstrokes, pale grey ink with darker accents on the main subject, soft mist, generous blank paper. The main subject is clear and readable, set slightly left of centre; the edges dissolve into mist and blank paper. A faint {energy wash} on the {energy's thing} and a faint {core wash} on the {stem object}. Subject: {the same scene as the stem's strip, widened}. The {stem object} is the darkest, most distinct form in the painting. No people, no hands, no text, no seal, no border.

Request 1536×1024. Use the same subject as the stem's strip, so the energy page and the Day Master page tell one story.

### T-HERO (energy hero), new, test first
> Minimal Chinese shanshui ink wash painting in the manner of Ma Yuan and Ni Zan, on plain warm rice paper, toned like a pale misty background plate. Landscape 3:2. The subject sits in the upper two thirds; the lower third is mist and blank paper. Few strokes, pale diluted ink, one darker accent, most of the paper blank (liubai). A barely visible {element wash}. Subject: {the energy element's yang or yin image}. No people, no text, no seal, no border.

Request 1536×1024. The yang and yin images are the element's two stem objects in their own landscape:

| Element | Yang | Yin |
|---|---|---|
| Wood | a tall oak on a spring slope | vines over a low wall |
| Fire | the sun over a horizon | a lamp in a window at dusk |
| Earth | a mountain | tilled fields |
| Metal | a blade-like ridge with an ore seam | frost glinting on stones |
| Water | the open sea | rain over fields |

---

## 4 · How to work (owner ruling 2026-11-05: test, then batch)

1. **One test set per new slot type or stem.** Paint one set and show it to the owner on a real dev screen, with an artifact (see §6). Spend Figma credits on a batch only after the owner approves the test.
2. **Feedback goes into this file first.** Add a log row, change the rule or template, and update the JSON. Then repaint.
3. **Repaint only what a note touches.** A weak single painting is repainted with the "darkest, most distinct form" line, not the whole set.
4. **Every batch runs from the current templates.** Never paint from an older prompt.
5. **After each batch:** run `build-ink-art.mjs`, check on dev that the markers are gone and that each painting reads at phone size, then run `npm run check` and push.

---

## 5 · Iteration log (owner notes → rule changes)

| Date | Owner note | What changed |
|---|---|---|
| 10-27 | A1–A4 A: 55 images, the art spots on the Day Master page | D1–D3 per stem plus the 25 N1 pairs; quiet frames on dev |
| 10-27 | "I do not see any images … they are basically blurred dots" | Real paintings via Figma `generate_image`; gpt-image-2.5-sunburst chosen over gemini (pen sketch) |
| 10-27 | "Reduce a bit fidelity … more like traditional Chinese ink wash; compare 2–3 variations" | Four fidelity levels on the Blade (F0 detailed, F1 loose, F2 xieyi, F3 Zen) |
| 10-27 | "F2, paint the rest … integrate them organically with the text" | All 30 D1–D3 at F2; multiply plus masked edges; D1 bleed, D2 column, D3 corner |
| 10-27 | "No empty space over 40% of the UI … fill it with illustrations" | A stage painting per stem under the cards |
| 10-27 | "Too detailed for the background … minimalistic aesthetics"; "refer to the background assets" | Stage repainted minimal (Ni Zan, Ma Yuan, 留白, 平远), toned like the house plates; reusing a plate directly was compared and set aside |
| 10-27 | "Lock in this iteration" | The painted Day Master page locked (commit 9b50d175) |
| 10-27 | Card 4: "text more organically integrated … a better thumbnail" | Layouts A heading, B fan, C wrap, compared against the band |
| 10-27 | "B … align the body … our black arrow button … less detailed … minimalism is the key" | Round fan leaf, one text column, black arrow button, minimal fan paintings |
| 10-28 | "The stem object must show itself clearly and convey the relations vividly … fill in the left rectangle … bleeds into the text" | Tall scroll strips filling each row's left column; the stem's object is the darkest form; the Action strip repainted for that |
| 11-05 | Handoff: repaint the 3:2 pairs minimal; migrate the energy heroes now; test, then batch; per stem | T-PAIR and T-HERO derived; the hero slot wired with fallback; strips and pairs keyed by stem |

---

## 6 · The artifacts (exact sources, to keep iterating)

The published pages are private claude.ai artifacts on the owner's account. Their exact sources are in `Ink_Painting_Artifacts/`:

| File | Artifact | What it shows |
|---|---|---|
| `01_day-master-journey-plan.html` | https://claude.ai/artifact/QcQYeVQhrhpF6Ux7Srg19w | the illustration plan (A1–A4) |
| `02_day-master-illustrations.html` | https://claude.ai/artifact/2JmZaBCdyFqSY8aJM6ak94 | the 30 D1–D3 subjects |
| `03_blade-fidelity.html` | https://claude.ai/artifact/5cZaXEJpuzygptocZGx1MR | F0–F3 on the Blade |
| `04_day-master-journey-painted.html` | https://claude.ai/artifact/TQcUSqASHj78g6w1MmyRLo | the painted journey and the stage |
| `05_card4-layouts.html` | https://claude.ai/artifact/H4XdS8kBwufd89DwLVasGb | card 4: band, A, B, C |
| `06_card4-illustrated.html` | https://claude.ai/artifact/JCdWAaBH4ePxKmbYiZueV3 | card 4 as scroll strips, **the current state** |
| `08_revelation-built.html` | https://claude.ai/artifact/EWpTWFz637KmjwESjaSr5G | RS2 as built on dev (2026-11-05): real screens of the Naming and the eight cards on the three test charts |
| `09_four-stems-revelation.html` | https://claude.ai/artifact/NM495dzmu5d8C8yJ1Nfyg5 | the Blade, the Jewel, the Oak and the Vine fully illustrated on dev (2026-11-06), for the owner's review |

**To iterate on one:** `Artifact` read with its URL, edit, then publish with that `url`. The page keeps its link.

**To build a new screen:** capture the dev build with Playwright at 390×844, deviceScaleFactor 2, on the golden chart (1995-04-29 18:00, `window.__seedBirth`, then `__goto('app-reading')`). Use the Archetype chip (`.ty-chip.door`) to reach the Day Master page and `window.__journeyGo('element', el)` for an energy page.

The images in these pages are embedded JPEGs, so each file is self-contained.

---

## 7 · The queue (in order)

1. **Strips, per stem.** Test 辛 the Jewel (five strips), then batch the other eight stems (40). Keep 庚. *2026-11-05: the 辛 test set is painted from the current T-STRIP (masters `strip_xin_*.jpg`, app copies built), not yet shown or approved. Owner 2026-11-05: pause; iterate on the Blade's template first. No batch has run.* *2026-11-06: the owner asked for the full revelation journey of the Blade, the Jewel, the Oak and the Vine for review; the 甲 and 乙 sets (ten) are painted from the current T-STRIP and built; their subjects and the 辛 subjects are now in the JSON. The four are shown in `09_four-stems-revelation.html`; none of the three new sets is approved yet.*
2. **Pairs 3:2, minimal, per stem.** Test 庚 (five), then batch 45. The current `pair_geng_*` are the older F2 style.
3. **Energy heroes.** Test Metal yang and yin, then batch 8.
4. **D-geng-3 repaint.** The branch must bow against the blade's edge.
5. **Function vignettes and persona seals.** Write the spec first, with the owner, then test.
