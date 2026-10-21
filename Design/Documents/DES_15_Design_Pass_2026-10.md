# DES_15 — Design Pass, October 2026 (four full-app variants)

> Status: **RULED 2026-10-21. V5 The Combination is adopted** (R1–R11 A, N1–N4 A). N4 and N2 are done. The V5 build has not started; its rollout is the next owner question.

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
