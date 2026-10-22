# DES_15 — Design Pass, October 2026 (four full-app variants)

> Status: **SHIPPED 2026-10-21.** V5 The Combination is live on elementum.life. Owner: "Build it directly into Elementum life in one shot" (no viewers yet). The switch is `V5_LIVE` in `Elementum_App/src/liveFlags.js`; the locked rules are DES_04 §AM.12. N4 and N2 are done; N1 is waiting on the art; N3 is blocked on the vault.

## Brief

The owner asked for a design pass over all content now in the app (verbatim brief in the session record). Hard constraint, verbatim: "Do not deviate from our current aesthetic, do not change our background arts, five element signs, current iconographies, stem signs and the dominance wheel design."

Every variant below changes only layout, information architecture, the teaser-tile system, navigation, motion and interaction, typographic hierarchy, and how text gives way to visuals. The art, the marks, the stem seals and the wheel are reused exactly as they ship:
- the wheel is captured from the live component (`.mg-wtile .wheel`, both views, golden and Underfueled charts);
- element signs come from the journey sprite (`journeyDefs.js`), with the ink dots (`concept-arts/dots/dotf-*`);
- stem seals come from `concept-arts/stems/proc`;
- backgrounds and plates come from `public/backgrounds` and `concept-arts/library`.

No italic is used anywhere. The relation labels stay locked.

## Artifacts

| What | Link |
|---|---|
| Research and principles | https://claude.ai/artifact/VwfAJhcvsAJpAkBsf87qB3 |
| V1 The Handscroll | https://claude.ai/artifact/VS7q4K3h66N6GCy3EGi6Rk |
| V2 The Album | https://claude.ai/artifact/Q5o395Dp21HtcMBDjrWX3o |
| V3 The Almanac Home | https://claude.ai/artifact/YH9NpghZ82RmKvvTqa5Zhh |
| V4 The Five Gates | https://claude.ai/artifact/D9Kdo4mSKm7Rf1pxUTCjz2 |
| V5 The Combination (recommended) | https://claude.ai/artifact/Tja5Ak53p4dW8Vq3GKQGtB |
| Comparison and ruling sheet | https://claude.ai/artifact/ChLJ9EGXRFtErjBPs8WSWW |

All content comes from the running app: the golden chart (庚 The Blade, 1995-04-29 18:00 Beijing, Overfueled) and an Underfueled sample (乙 The Vine, 1990-09-17 05:00). Almanac ribbon values were read from the live DOM on 2026-10-21.

## The ten principles (from the research)

1. A conclusion on every tile face.
2. A picture before a paragraph.
3. Three depths, one rule each: tile, then sheet (one energy or word, under 80 words), then page (a section). Never a sheet on a sheet.
4. Long sections read in leaves, with visible progress and reading time.
5. Always a next step at the end of a page.
6. Know where you are: a map of the reading, read state, no percentage scores.
7. One dense object per screen, the rest open paper (留白, 虚实; DES_14 one raster focal point).
8. Time is horizontal, the self is vertical (平远).
9. The seal signs completion; chop-red once per screen.
10. Free conclusions, paid depth (DES_04 §19).

References studied: Co-Star, The Pattern, CHANI, Nebula, Sanctuary, Headspace, Calm, Finch, Stoic, Medium/Substack, Apple Books; ink-wash 留白, 三远, 手卷, 印章, 虚实; NN/g on carousels and bottom sheets; WCAG 1.4.8 line length.

## The four variants

| | Thesis | Tap / scroll model |
|---|---|---|
| **V1 The Handscroll** | One unrolling reading with a seven-knot rod; depth beats become painted tiles that push full pages. | Tiles push pages; sticky anchors inside pages; a Next tile ends every page. |
| **V2 The Album** | A hub of teaser tiles under the wheel; every section reads as leaves, like the first reading. | Tap the right two-thirds to go on, the left third to go back; "Read it all as one page" option; a seal stamps a read tile. |
| **V3 The Almanac Home** | The app opens on Today; Your reading is a book with a contents page and seven chapters. | Contents opens chapters; a reading bar shows the minutes left; Continue reading on Today. |
| **V4 The Five Gates** | The five energies index everything; a five-sign rail lights one energy across pages. | Scroll down for the self; swipe sideways between energies; the rail filters pages. |

## The recommended combination ("V5")

Rows R1 to R11 on the ruling sheet, option A each. The full table is in `Design/Library/Design_Pass_2026-10/README.md`.

- **Hub (V2):** identity strip, wheel, a weighted tile grid.
- **Tile faces (V1 + V3):** painted band, claim, one visual, reading time.
- **Long sections (V2 + V1):** leaves by default; "Read it all as one page" opens V1's anchored page.
- **Energies (V4):** sheet, then the energy page; swipe sideways between the five; each page ends on "{Energy} across your chart".
- **How am I running? (V4 + V2):** the balance graphic first, then leaves; Codex folded; Blueprint door last.
- **Progress (V2 + V3 + V1):** unread dot, seal stamp, "2 of 7 read", a Next tile at every end.
- **Landing (V3):** first visit on Your reading, later visits on Today with Continue reading.
- **Almanac (V2 + V3):** painted today card, week ribbon, month and year tiles; time runs sideways.
- **Birth chart (V3):** one page.
- **Phase 2 (V4):** the lens rail.

## Library copy

`Design/Library/Design_Pass_2026-10/` holds the research page, the four variants and the comparison and ruling sheet, with all the assets they use. Open the files offline.

## Ruling sheet (rows)

R1 base · R2 long sections · R3 landing tab · R4 progress cues · R5 energy navigation · R6 lens rail · R7 Almanac hub · R8 depth tile face · R9 sheet picture until pair art · R10 reading time · R11 how the run page opens · N1 the 25 pair illustrations · N2 portrait crops · N3 mirror the yin-stem plates · N4 fix live defects now.

The owner answers in codes, e.g. "R1 A, R2 B". Rulings get recorded below, row by row.

| Row | Ruling | Date |
|---|---|---|
| R1 | A · V2 album hub (strip, wheel, weighted tiles) | 2026-10-21 |
| R2 | A · card runs, with "Read it all as one page" | 2026-10-21 |
| R3 | A · first visit on Your reading, later visits on Today with Continue reading | 2026-10-21 |
| R4 | A · unread dot, seal stamp on a finished tile, "2 of 7 read" | 2026-10-21 |
| R5 | A · swipe sideways between the five energy pages | 2026-10-21 |
| R6 | A · lens rail held for phase 2 | 2026-10-21 |
| R7 | A · Today: painted card, week ribbon, month and year tiles | 2026-10-21 |
| R8 | A · tile face: painted band, claim, one picture, reading time | 2026-10-21 |
| R9 | A · existing element plate in the sheet's picture slot until the pair art lands | 2026-10-21 |
| R10 | A · reading time on tiles and sections | 2026-10-21 |
| R11 | A · V4 balance picture opens "How am I running?" | 2026-10-21 |
| N1 | A · commission all 25 pair illustrations. Brief: `Design/Library/Design_Pass_2026-10/N1_Pair_Illustrations_Brief.md`. Waiting on the owner's image pipeline | 2026-10-21 |
| N2 | A · DONE: 15 portrait crops `t_{el}_{3,4,5}_p.png` (720×960, ≤257 KB) in `public/concept-arts/library`, cut from existing plates; no new painting | 2026-10-21 |
| N3 | A · BLOCKED: the yin-stem paintings are in the vault (`D:\Elementum\Art_Library`), which a cloud session cannot reach. The owner copies them into the repo or uploads them | 2026-10-21 |
| N4 | A · DONE: italic removed from the four live sites. The wheel-label issue was a contrast problem, not clipping: grey text sat on the center painting's ink ring. Fixed with a paper-coloured text halo on `.fnlab`/`.mg-rv` in `journey.css`; the wheel's design is unchanged | 2026-10-21 |

## New art (proposal only; not used in any variant)

**N1. 25 pair illustrations for the energy sheet (PM_02 GO-2).**
- One painting per pair of core element × energy element (5 × 5), each showing the locked relation the sheet names.
- Format 1100 × 733, matching `concept-arts/library`. House ink-wash, using the core's stem motif (DES_14 §1).
- Mist fades to paper on the bottom third. Only the two elements' pigments; no text and no seal.
- Yin and yang stems share a painting.
- The full motif table is on the ruling sheet (for example, Metal × Fire "a blade laid in the forge", Earth × Water "terraced paddies holding water").

**N2.** Three more 3:4 crops per element, taken from the existing plates.

**N3.** Mirror the yin-stem plates that already sit in the vault (DES_14 §5 gap 2).

**N4.** Seven chapter marks, needed only if V3's contents page is adopted.

## Live defects found during the pass (not fixed; for the owner to route)

- Italic is still set in four live places, against DES_04 §AM.10 v3: `components/guidance/InkTile.jsx:156` (the Guidance tile subtitles), `components/dashboard/tabs/CompatScreen.jsx:56` and `:80`, and `components/reading/DayMasterCta.jsx:38`.
- The wheel's function label under a left-hand disk was hard to read (golden "Action · you shape it"; Vine "Action"). Corrected diagnosis: the label is on top, but grey on the ink ring. FIXED (N4) with a text halo.

## Follow-up · the Naming page (owner question 2026-10-21, RULED AND SHIPPED)

The owner finds today's plate overwhelming at first glance (six text pieces under the painting). Three directions built as real frames: https://claude.ai/artifact/Q42LUgZBg8ypUruLiPDX8J (library copy: `Design/Library/Design_Pass_2026-10/RV_The_Naming_Directions.html`).

| Direction | What the plate carries | Recommendation |
|---|---|---|
| 1 · The sign alone | Seal, name, a small vertical inscription at the side (stem line + cast line) | **Recommended.** One concept on screen; the first reading's cards do the telling; the dissolve has one object. |
| 2 · Sign + five energies | Seal, name, stem line, the five ink dots sized by presence with percentages | Not recommended: shows the distribution before the energies have names (DES_04 §0 ladder), and the wheel repeats it one screen later. |
| 3 · Today | Seal, name, thesis, edge line, stem line, cast line | The current page. |

Rows: RV1 direction · RV2 where the stem and cast lines sit · RV3 where the thesis and edge line go (A: open card 1 of the first reading above the paragraph). No content changes in any option; the thesis and edge line already live on the Your reading hero.

| Row | Ruling | Date |
|---|---|---|
| RV1 | B · the sign with the five-energy distribution (the owner chose over my Direction 1 recommendation) | 2026-10-21 |
| RV2 | A · the stem line and the cast line as a vertical inscription at the plate's side | 2026-10-21 |
| RV3 | B · the thesis and the edge line leave the first run; they stay on the Your reading hero | 2026-10-21 |

Built straight into elementum.life (same release rule as V5). The plate now reads: YOU ARE · seal · name · YOUR FIVE ENERGIES · five ink dots sized by presence with % and name (first-reading order) · the inscription 「庚 · YANG METAL · 1995 · APRIL 29 · 17–19 CST」 vertical at the right · Swipe up. The name's h2 margin is halved at every height so the swipe affordance fits (checked at 390×844 and 375×667). Code: `JourneyStage.jsx` (rvl-dist, rvl-inscr), `journey.css`.

## Follow-up · the revelation sequence (owner feedback 2026-10-21, RULED AND SHIPPED)

The owner's feedback on the first reading's eight cards (screenshots of cards 1, 2 and 3): a paper gap above every card at the top edge; the cards' flat colours (ink, walnut, five tints) are new colours on top of the original background design; each energy should carry the wheel's ink dot sign, integrated into the background; each energy card's title should say "{Energy} is your {Function} energy" and reveal the function reading's teaser.

**Fixed and live (bug):** the cards sat inside the stage under the 48px status strip. `.mg-fr` now takes the Naming overlay's inset (`-48px 0 0`, padding-top 48px) and paints to the top edge; the progress bar and Skip moved down by the same 48px. Commit `3dd9f64`.

**Three directions built as real frames:** https://claude.ai/artifact/AJbo7tbpCjz8yTfQDQar14 (library copy: `Design/Library/Design_Pass_2026-10/RS_The_Revelation_Sequence_Directions.html`). All three share the ground (the Naming's paper, distant peaks, floating island, fog, plus a paper veil from mid-height for the words), the order, and the words. No new colours, no new art, no new text.

| Direction | What changes | Recommendation |
|---|---|---|
| 1 · One ground | The painting never moves; the Naming's seal gives way to the energy's ink dot in the same place, sized by presence (96–168px). Centred, like the Naming. | **Recommended.** One grammar from the Naming to the dissolve; one object, one title, one paragraph, one state per card. |
| 2 · The wash | One-corner composition: the energy's dot washed under the paper at the top left (multiply, 34%), a 72px sign heading a left-hand column, the painter's inscription at the right with "金 · 23% · OVERFUELED". Two paragraphs (the function's opening, then today's verdict line). | The strongest "sign in the background" answer and the best single card; costs a second layout grammar inside one sequence. Its wash or inscription can be pulled into Direction 1 by rows RS2 / RS5. |
| 3 · The rail | The Naming's five-dot row stays on screen through cards 3–7; the energy being read swells, the other four ghost to 38%. Card 8 resolves the row into Release and Grow. | Answers "where am I among the five", but puts five numbers on every card, which the Naming re-ruling just moved off the first glance. |

**The words (all from the corpus, nothing new):** card 1 `STEM.who`; card 2 "You run Overfueled." over the run line (`CONDITION.run_headline` split at its colon; today the card says only "Overfueled."); cards 3–7 the pair head as eyebrow (`ELEMENT_PAIR.head`), the title "{Energy} is your {Function} energy." (the locked function bijection), THE FUNCTION's first two sentences as the teaser (`ELEMENT_PAIR.definition`, the head the energy page already renders), the CHARACTER panel's state "23% · Overfueled · Release it"; card 8 `tpl_rx_ribbon` with the five dots in two groups (Release, Grow) as its picture.

Rows: RS1 direction · RS2 the energy's sign · RS3 the title and teaser · RS4 card 2's words · RS5 the number and the state · RS6 card 8's picture · RS7 the ground under the cards. The owner answers in codes.

| Row | Ruling | Date |
|---|---|---|
| RS1 | A · Direction 1, One ground. Owner: "Direction 1 is the best, Direction 2 technically has the best aesthetics, however there is too much written text that would compact the reading experience of the revelation sequence, plus compromise the actual reading content where we land the actual content." | 2026-10-21 |
| RS2–RS7 | A each, taken at the recommended option: they are Direction 1 exactly as shown (one dot sized by presence; function title over THE FUNCTION's opening; "You run Overfueled." over the run line; the state line; the two dot groups on card 8; the Naming's ground) | 2026-10-21 |

Built straight into elementum.life (same release rule as V5 and the Naming). Code: `MergedViews.jsx` (FirstReading), `merged.css` (the first-reading block), `journeyData.js` (`fnHead` on each merged row), `JourneyStage.jsx` (passes InkDot). Gates: eslint 0 errors, engine golden match, build, journey sweep 17/17; no overflow at 375×667.

## Follow-up · the visual pass and the energy journey (owner 2026-10-22)

**The visual pass (shipped, `db7da27`).** All 36 live screens captured at 390×844 and 390×1700 with alignment, gap and image metrics. Fixed: one 18px gutter on every tab page (Compat and Chart Resonance padded 22; Codex, Draw, Self-Report, Consultant and the Manual fallback padded 20) and the hero header's default bleed set to 18 so the Guidance and Codex bands no longer overhang the viewport; the album tile "How am I running?" no longer wraps its minutes into a second column; painted album tiles carry the paper halo on eyebrow and claim; the balance box's captions balance. Not defects, noted: the onboarding progress bar reads as a dark strip at the top in tall captures; the hero equation thumbnail on the energy page is the darkest object in the journey (addressed by EJ4 below).

**The energy journey (AWAITING RULING).** Owner brief: redesign one journey, the energy reading, from the catalogue page; fold sections into boxes or teasers; curate each page so the reader ramps (name → relation → function → what it means → domains); refer to the app and the station for every word. Owner answers to the four questions: the sheet stays as the cover; the ladder order name → relation → function → character → state → domains; boxes against teaser cards to be compared and decided later; derive and retitle, no new corpus.

Artifact: https://claude.ai/artifact/JVfHjUarh8Jaf2dHNFQVvN (library copy: `Design/Library/Design_Pass_2026-10/EJ_The_Energy_Journey_Directions.html`).

| Variation | What it is | Note |
|---|---|---|
| A · Boxes in place | Rung 1 (the name) open; five closed boxes, one derived line each (the relation as a miniature equation, the claim and verdict, the three keywords, the pill and the carry clause, one domains sentence); tapping opens the reading under the line. | Three taps from the wheel to the domains door; the whole ladder visible on arrival; a new grammar beside the card runs. |
| B · Teaser cards | Rung 1, then four teaser cards in the ladder's order, each pushing its page (relation, function with the character and the remedy, domains with the seat and who runs it). | Today's grammar; the page stays short; every rung costs a push and a back. |
| C · Hybrid | The short rungs (relation, what it means now) open in place; the long readings (function, domains) push. | |

Shared by all three: the sheet trimmed to the hook (sign, head, function, state, plate, the pair story, the cycle image line, Read); the name rung as the plate band with the dot, Earth · 土, "Earth is your Mind energy.", the head and the cycle line, the presence bar; the 生 equation drawn on paper (two dots, the law glyph and arrow, = Friction); the character as its own rung (the god's functional line, the Mind metrics, the keywords); the domains rung ending on the three tiles and the seat; Earth across your chart and Next unchanged.

Sources, all existing: `ELEMENT_PAIR 金_土` (head, story, mechanism, function, cta_verdict, carry), `tpl_cycle_line.image_lines`, `tpl_now_line`, `ELEMENT_GOD 土_偏印` (k2_functional, adj_chips, edge), `FUNCTION_METRICS Mind`, `GOD pianyin`, the live diagnosis, domain lines, seat and across-your-chart. The Domains pages themselves are another session's and are not redrawn.

Rows: EJ1 the folding · EJ2 the cover · EJ3 the name rung · EJ4 the relation picture · EJ5 the character · EJ6 the domains rung · EJ7 across your chart and Next.

| Row | Ruling | Date |
|---|---|---|
| EJ1–EJ7 | awaiting the owner | — |
