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

## Follow-up · the visual pass and the energy journey (owner 2026-10-22, RULED AND SHIPPED)

**The visual pass (shipped, `db7da27`).** All 36 live screens captured at 390×844 and 390×1700 with alignment, gap and image metrics. Fixed: one 18px gutter on every tab page (Compat and Chart Resonance padded 22; Codex, Draw, Self-Report, Consultant and the Manual fallback padded 20) and the hero header's default bleed set to 18 so the Guidance and Codex bands no longer overhang the viewport; the album tile "How am I running?" no longer wraps its minutes into a second column; painted album tiles carry the paper halo on eyebrow and claim; the balance box's captions balance. Correction the same day (owner screenshot): the shrink rule for that tile's claim also caught the first child of the other tiles' footers, stretching the Domains, Chapters and Stars arrows and the Advisor pill across the tile on real phones; the rule now targets the claim alone, and arrows and pills are fixed-size. Re-audited the deployed build on dev.elementum.life at 390 and 360 wide: no other stretched, distorted or overflowing asset.

**The dissolve under V5 (owner recording 2026-10-22, fixed).** After the first reading the seal descended onto a blank page and the wheel popped in with every dot already drawn: the pad's pre-reveal rule hid everything but the old beat-2 wheel, and under V5 the wheel lives inside the album hub, which that rule hid whole. The hub and its wheel tile now stay visible through the dissolve (the tile's card transparent, so the wheel sits alone on paper), the five dots ink in one by one in the first reading's order, and the identity strip, the read line and the tiles emerge after. Verified frame by frame; journey sweep 17/17. Not defects, noted: the onboarding progress bar reads as a dark strip at the top in tall captures; the hero equation thumbnail on the energy page is the darkest object in the journey (addressed by EJ4 below).

**The energy journey (ruled EJ1 C, EJ2–EJ8 A; shipped).** Owner brief: redesign one journey, the energy reading, from the catalogue page; fold sections into boxes or teasers; curate each page so the reader ramps (name → relation → function → what it means → domains); refer to the app and the station for every word. Owner answers to the four questions: the sheet stays as the cover; the ladder order name → relation → function → character → state → domains; boxes against teaser cards to be compared and decided later; derive and retitle, no new corpus.

Artifact: https://claude.ai/artifact/JVfHjUarh8Jaf2dHNFQVvN (library copy: `Design/Library/Design_Pass_2026-10/EJ_The_Energy_Journey_Directions.html`).

| Variation | What it is | Note |
|---|---|---|
| A · Boxes in place | Rung 1 (the name) open; five closed boxes, one derived line each (the relation as a miniature equation, the claim and verdict, the three keywords, the pill and the carry clause, one domains sentence); tapping opens the reading under the line. | Three taps from the wheel to the domains door; the whole ladder visible on arrival; a new grammar beside the card runs. |
| B · Teaser cards | Rung 1, then four teaser cards in the ladder's order, each pushing its page (relation, function with the character and the remedy, domains with the seat and who runs it). | Today's grammar; the page stays short; every rung costs a push and a back. |
| C · Hybrid | The short rungs (relation, what it means now) open in place; the long readings (function, domains) push. | |

Shared by all three: the sheet trimmed to the hook (sign, head, function, state, plate, the pair story, the cycle image line, Read); the name rung as the plate band with the dot, Earth · 土, "Earth is your Mind energy.", the head and the cycle line, the presence bar; the 生 equation drawn on paper (two dots, the law glyph and arrow, = Friction); the character as its own rung (the god's functional line, the Mind metrics, the keywords); the domains rung ending on the three tiles and the seat; Earth across your chart and Next unchanged.

Sources, all existing: `ELEMENT_PAIR 金_土` (head, story, mechanism, function, cta_verdict, carry), `tpl_cycle_line.image_lines`, `tpl_now_line`, `ELEMENT_GOD 土_偏印` (k2_functional, adj_chips, edge), `FUNCTION_METRICS Mind`, `GOD pianyin`, the live diagnosis, domain lines, seat and across-your-chart. The Domains pages themselves are another session's and are not redrawn.

**Imagery (owner 2026-10-22: "think about what can be better illustrated… leave spaces and placeholders").** Reviewed rung by rung. Three slots want new imagery and are drawn as dashed placeholders with a spec in the frames, listed as briefs, not used as art: P1 the pair painting on the relation rung and in the sheet's plate slot (the N1 brief, GO-2; the element plate until it lands), P2 one vignette per function (5, 1:1, house ink-wash spot register, subjects: a standing stone, a bowl of still water, a brush leaving the paper, a hand on a plough, a weight on a balance), P3 ten persona seals for the seat row (round, ink-and-paper, one object per persona). Two pictures need no art and are drawn in the frames from the existing signs: the domain map (eight domain glyphs, the energy's three lit) on the domains rung, and the remedy diagram (Earth stores → 克 → Wood spends it, with the locked cycle image line) in the remedy box.

Rows: EJ1 the folding · EJ2 the cover · EJ3 the name rung · EJ4 the relation picture · EJ5 the character · EJ6 the domains rung · EJ7 across your chart and Next · EJ8 the imagery (all three slots · the pair paintings only · none yet).

| Row | Ruling | Date |
|---|---|---|
| EJ1 | C · the hybrid: the relation, the character and what it means now open in place; the function and the domains push their pages | 2026-10-22 |
| EJ2 | A · the sheet trimmed to the cover: sign, head, function, state, plate, the pair story, the law's picture line, Read | 2026-10-22 |
| EJ3 | A · the name rung: the plate as a band, the dot, the name and 汉字, "{Energy} is your {Function} energy.", the head, the picture line, the presence bar | 2026-10-22 |
| EJ4 | A · the 生/克 equation on paper (two dots, the law glyph and arrow, = the state); a core reads "= 主 your core · {Condition}" | 2026-10-22 |
| EJ5 | A · the character as its own rung (the god's functional line, the state row, the metrics, the keywords; a keyword opens its sheet) | 2026-10-22 |
| EJ6 | A · the domains rung ends on the three tiles and the seat (on the domains page, with the domain map leading); the card carries the sentence and the map | 2026-10-22 |
| EJ7 | A · across your chart and the pager kept as today | 2026-10-22 |
| EJ8 | A · all three slots commissioned: P1 the pair paintings (N1, GO-2), P2 the five function vignettes (GO-4, brief `P2_Function_Vignettes_Brief.md`), P3 the ten persona seals (GO-5, brief `P3_Persona_Seals_Brief.md`). Each slot renders its asset from its path and shows nothing until it lands; the relation box shows the element plate until the pair painting lands | 2026-10-22 |

Built straight into elementum.life. Switch: `EJ_LIVE` in `src/liveFlags.js`. Code: `components/journey/EnergyJourney.jsx` (NameRung, Equation, Box, TeaserCard, DomainMap, Relay, ArtSlot, the ladder), `energy.css`, `JourneyStage.jsx` (the element page under the switch; the function page keeps the definition and the keywords; the domains page leads with the map and the tiles), `MergedViews.jsx` (the cover), `journeyData.js` (the law's picture line on the mechanism and the merged rows), `content/cycles.js` (`CYCLE_IMAGE_LINES`, transcribed from tpl_cycle_line). The journey sweep's anchor moved to the name rung.

## Follow-up · card 8 and the share card (owner 2026-10-22, RULED AND SHIPPED)

Owner: card 8 should be solely for entering the reading; the shareable card stays on the album (catalogue) so the reader can share it at every revisit; reconsider the card's design for the current app; replace the grow/release sentence on card 8 with something else; two to three variations of each.

Found first: under V5 the album has no share entry at all (the wheel's centre seal opens "How am I running?"), so card 8's ghost button was the only way to the card. The card itself is still the A1 "tiles" card from the September share flow (its own wheel drawing, Seek and Skip columns, the platform rail).

Page: `Design/Library/Design_Pass_2026-10/SC_Card_8_and_the_Share_Card.html` · https://claude.ai/artifact/1pUBv5azMG6BSZ2NpKt6MQ. Golden chart. Every line is the app's or the station's: `tpl_rx_ribbon` (the start line, promoted to the title), `ELEMENT_PAIR.head`, `tpl_now_line`, `CONDITION_READING.verb` and `helps`, `STEM.who`, `identity.manifesto`, the Naming's inscription, the album's section titles and read line.

**Card 8 (the door; the share button and the grow/release sentence leave; the sentence stays on the album's "What does my chart ask for?" tile and the How-you-run ribbon).**

| | Picture | Words |
|---|---|---|
| 8A · Where to begin (recommended) | The Naming's five dots return, the start energy lit, the other four ghosted, "Start here" under it | "Start with Fire, your Order." · "Fire forges the Blade. It gives your surplus a shape and a use, and you have very little of it." · Enter your reading |
| 8B · What helps | The seal, the condition's verb with its glyph | "Give your extra force a place to go — aim it, don't store it." · "Start with Fire, your Order." · Enter |
| 8C · The contents | The seal, the album's six sections as a table of contents with minutes | "Start with Fire, your Order." · the six titles · Enter |

8A lands on the album's own "Start here" tile (same dot, same head), and its five dots are already on screen for the dissolve onto the wheel's disks.

**The share card (9:16, 540 × 960 as today; the A1 "tiles" card retires to `__ore`).**

| | Ground | Content |
|---|---|---|
| S-A · The Naming plate (recommended) | The Naming's: peaks, island, fog, veil | ELEMENTUM · You are · seal 150px · The Blade · the manifesto · the five dots with their shares · the inscription 庚 · YANG METAL · 1995 · APRIL 29 · 17–19 CST at the right · elementum.life |
| S-B · The wheel | Rice paper | You are · The Blade · the dominance wheel as the album draws it (locked design, relation labels) · Overfueled · "Your Metal takes in more than it spends." |
| S-C · The first card | The mist veil | The seal · "You are The Blade." · the who line · the five dots small |

S-A is the screen that named the reader, made portable; it reads at thumb size (seal and name) and all its assets ship today. S-B's wheel labels fall below legibility at story size.

**Where it lives on the album:** E-A the app's own 32px round share button in the identity strip, between the name and Birth chart / Overfueled (recommended) · E-B a wide "Your identity card" tile with the card's thumbnail in the bento · E-C the share button on the wheel tile's corner (only makes sense with S-B).

**The tray:** T-A the rail as today (Instagram, TikTok, X, Save, Copy link) · T-B one Share button to the phone's own sheet (Web Share on the PWA; the native sheet once the store build ships, wired on `capacitor-shell`) with Save and Copy link beside it. A 1:1 crop is drawn on the export shelf for SC5.

Rows: SC1 card 8's direction (8A/8B/8C) · SC2 card 8's button ("Enter your reading" / "Open your reading" / "Start with Fire", opening Fire's sheet first) · SC3 the share card (S-A/S-B/S-C) · SC4 the album entry (E-A/E-B/E-C) · SC5 formats (9:16 only / 9:16 and 1:1) · SC6 the tray (T-A/T-B). Recommended: SC1 A, SC2 A, SC3 A, SC4 A, SC5 A, SC6 A.

| Row | Ruling | Date |
|---|---|---|
| SC1 | A · card 8 is "Where to begin": the five dots with the start energy lit ("Start here") and the other four ghosted, "Start with {El}, your {Function}.", the pair head and the now line. A Balanced chart (no start) keeps all five lit under the ribbon's Keep line | 2026-10-22 |
| SC2 | A · one button, "Enter your reading"; the share button leaves card 8 | 2026-10-22 |
| SC3 | A · the share card is the Naming plate: the Naming's ground, the stem plate, You are · {archetype}, the manifesto, the five dots with their shares, the inscription at the right, elementum.life. The A1 "tiles" card stays in the code behind the switch | 2026-10-22 |
| SC3, revised | Owner 2026-10-23, from S-C's frame: the first card's layout on the mist veil (the stem plate, "You are {archetype}.", the who line), then what the card must also carry: a core line "{Core} is your core" with the condition pill, and the five energies re-grouped as the ribbon's Release and Grow (Keep, all five, when Balanced), each dot with its share and name. elementum.life at the foot. Supersedes the Naming-plate card of the day before | 2026-10-23 |
| FN1 | A · each energy on the share card carries its function noun under its name (Body, Mind, Order, Action, Expression), the locked §5f label; Release and Grow as before. Page: https://claude.ai/artifact/Se2o4ugLwU6dKNJNbwTz8G (B the ledger, C the ribbon not taken) | 2026-10-25 |
| SC4 | C · the album's entry is the round share button at the head of the wheel tile (YOUR FIVE ENERGIES), right of the wheel-view switch | 2026-10-22 |
| SC5 | A · 9:16 only: the card is 306 × 544 and exports at 1080 × 1920 | 2026-10-22 |
| SC6 | A · the tray as it ships: Instagram, TikTok, X, Save, Copy link | 2026-10-22 |

Built straight into elementum.life. Switch: `SC_LIVE` in `src/liveFlags.js` (off restores card 8's two buttons and the A1 card). Code: `FirstReading` takes `door` (`MergedViews.jsx`, `.mg-dist` in `merged.css`); the card is `.share-card[data-var="naming"]` in `JourneyStage.jsx` with its styles in `merged.css`; the wheel tile's `.mg-wshare` button opens it.

**The Day Master line (owner 2026-10-25, PROPOSED, awaiting ruling).** Owner: instead of the manifesto or the who line, what best tells the person and their audience about the Day Master; keywords, metrics, phrases or plain sentences; research, rewrite, deliver before designing. Page: https://claude.ai/artifact/DfoHiqGxxi9GH3RLZGurHi. Finding: the two forms that travel on a shared card already exist in the station for all ten stems and have never been rendered: `STEM.inscription` (locked ×10, the trait and its cost) and `STEM.dm_claims` (drafted ×10, pending lock; one line about the person, one about how people use them). Keywords were retired 2026-09-10 as generic; the manifesto L1 re-cut to adjectives (2026-10-14) is still pending in the station; a stem metric would be invented. Forms ranked: R1 the claim pair (recommended) · R2 the inscription · R3 keywords over the social claim · R4 three facets (new writing). Rewrites proposed for the Day Master session (DM2): a social second claim for 乙 and 壬, the 辛 dash to a comma. Rows DM1 (R1–R4), DM2. Owner 2026-10-25/26: the identity zone compared against five chart-level trait words (page https://claude.ai/artifact/RJtktfWVXCDNKYtC8cVmfx: E1 one sentence, E2 five words each wearing its sign, E3 words under the dots); ruled **DM1 E1**: one sentence, the Day Master's social claim ("People come to you when they need the unsoftened truth."), with the Friction pill on Release and the Catalyst pill on Grow. Built 2026-10-26: the line is the stem's claim from the app's `DM_READING` (the station's `dm_claims`, pending lock); claim 2 for most stems, claim 1 for 乙 and 壬 (no social claim yet) and 辛 (its second carries a dash), the pick kept in `SHARE_CLAIM_PICK` until the Day Master session re-cuts the pairs (DM2 open). The station's STEM fields belong to the Day Master session.

The tray's Instagram, TikTok and X marks are the platforms' own glyphs (`IgGlyph`, `TtGlyph`, `XGlyph`, unchanged); the proposal page's "Ig / Tt / X" discs were mockup placeholders only.

Found and fixed while building: exported share cards lost every element sign. html-to-image copies a sprite symbol into the image only when the `<use>` names it through `xlink:href`, and the app writes `href`. The card's dots now set both (`UseX`). The A1 card had the same gap. `cardExport.js` now takes an optional `pixelRatio`, so the 306px card reaches the 1080-wide story canvas; other callers keep the default.

Gates: eslint 0 errors, engine regression matches golden, build, route sweep clean, journey sweep 17/17; the export probe saves a 1080 × 1920 PNG with all five signs.

## Follow-up · the store build (owner question 2026-10-22)

The planned path is the Capacitor wrap (PM_02 STORE-3), under which the React code, the CSS motion and the dissolve carry over unchanged; the browser beneath becomes WebKit on iOS. Prepared now:

- **The device shell** (DevBar · Device shell, dev-only): the installed-app layout inside the desktop frame. Picks iPhone 15 (island, 59 / 34), iPhone SE (20 / 0) or Android gesture bar (24 / 16): the mock status bars hide, the frame pads by the insets, a dynamic island and a home indicator draw on the frame. The four safe-area call sites read a dev override first (`--sai-top` / `--sai-bottom`), the real inset otherwise.
- **A real device bug it found and fixed:** the journey (`.jny`) is absolutely positioned, so the frame's safe-area padding never reached it, and on a notched phone its first row (YOUR READING, the back rows, the pager) sat under the status bar. The journey now draws its own clearance `--st = max(48px, inset)`; the Naming overlay, the first reading's cards and their progress bar are offset by the same variable.
- **The Capacitor scaffold** on branch `capacitor-shell` (not on main): config, the native adapter (status bar, Android back, the share sheet through the native plugins when running native, the web paths otherwise), npm scripts and the Mac steps in `ComparativeAnalysis/Handoffs/2026-10-22-capacitor-shell/STEPS.md`.

Owner 2026-10-22: the store build is backlogged behind the design polish (PM_02 STORE-3 carries the done-condition and the reminder). Not possible from this container: a WebKit render pass (no WebKit build here; the owner's iPhone on dev.elementum.life is the check), the push transport move (APNs/FCM) and Sign in with Apple (STORE-3, owner accounts).
