# THE DOMAINS: the owner's rulings

## Round 1 (owner 2026-10-17): "Q1 A … Q15 A, S1 A … S8 A"

Page: https://claude.ai/artifact/Vz38yjKw7uDv3CtkpDfq2r

| Row | Ruling |
|---|---|
| Q1 | A chart-wide hub of all eight domains on Your Reading. The energy page's THE DOMAINS card lists the domains its seats rule. Both open the same chart-wide domain pages. |
| Q2 | The hub is a fourth beat after YOUR ENERGY MAP, with a bridge line ("See where your life is ruled"). |
| Q3 | An EDGE domain tile opens that domain's page directly. The domain sheet retires, and its "$9.99/mo" line with it (D2 in full, S1 closed). |
| Q4 | A domain with no seat keeps a dashed tile. Its page is read from the decades that rule it. |
| Q5 | No birth hour: the Hour Gate shows closed on the life line, with a link to the hour discovery. The closed note shows only on domains an Hour seat could rule. |
| Q6 | A teaching beat at the top of the hub: the claim, three sentences, and the life line with "you · {age}". The ten are called "characters". |
| Q7 | Three labelled steps (How you are · What has already happened · What is coming), then the seats. |
| Q8 | Ages come from the gates and calendar years from the decades. Both live in the labels; the text carries no digits. |
| Q9 | **The domain-only law, the past.** Definite past patterns tied to an age span. Never a single dated event, a place or a named person. This replaces the master prompt's no-biography rule on this surface only. |
| Q10 | **People.** The Day Gate may name "a partner". The Hour Gate names "the people after you", with a range (children, younger relatives, someone you train). |
| Q11 | **Hard news.** Allowed when tied to a decade or a gate, and the same beat says what carries the reader through. Never illness, death, divorce or sums of money. |
| Q12 | Free: the hub, the life line and step 1 on every domain page. Seeker: steps 2 and 3 and the seat readings. |
| Q13 | WHO RUNS IT and the 150 god-noun K2 domain readings leave the page and stay in the station as ore. Each seat card keeps a one-line "About the …". |
| Q14 | The 70 seat readings and deflines are rewritten in the current voice: 60 to 80 words, no "spouse palace", no imperative closes. |
| Q15 | No advice on the domain pages. Advice stays on THE REMEDY. |
| S1–S8 | The sample texts are approved as written. They are the calibration. |

## How a page is composed (domainsResolve.js)

**The lead seat.** The highest-ranked seat (SLOT_RANK) among those whose gate the reader has reached. The Day Gate counts as always reached, because it is the self.

**Step 1.** The lead seat's recognition. If a classical pair (TG_PATTERNS, in priority order) has both sides present and targets this domain, its per-domain line follows, plus the fused line when the pair shares a gate.

**Step 2:**
- the lived beat of each seat whose gate has opened (Hour from 48);
- a Day seat's lived beat as "the pattern so far" while the reader is under 35;
- the last fully past decade whose character rules the domain;
- the gap line when the gate the reader lives in holds no seat in this domain.

**Step 3, in time order:**
- the current decade, when its character rules the domain;
- the ahead beats of the Day seats (under 48) and the Hour seats (under 48);
- the next two decades that rule the domain. The first decade whose character matches one of this domain's seats is the strongest window (helping) or the heaviest window (heavy). The match names the seat in the latest gate.

**Notes:**
- "Your later gates hold no X seat …"
- "Love has no decade of its own …"
- the closed Hour Gate.

**A decade's pole:** helping when its element is a catalyst for the chart, or the core of an Underfueled chart. Heavy otherwise.

## Round 2: the golden template (waiting)

- Page: https://claude.ai/artifact/YSEbBsneiSwky8sC1t9F7Z (source: `round-2/`).
- Content: `ComparativeAnalysis/Prompts/out/handoff/2026-10-17-domains-template/template.json` (120 units, gate 0 failures).
- Gate: `gate.mjs` in the same folder.

## Round 2 rulings (owner 2026-10-17): "T0 A … T10 A, P1 A, P2 A"

- **The golden template:** approved.
- **Sealed writers:** wrote the rest. 849 units landed, gated.
- **First audit:** mean B 2.79. The majors were mostly composition; fixes went into the resolver.
- **Revision round 2:** written and gated (out-1 to out-6 in `ComparativeAnalysis/Prompts/out/handoff/2026-10-17-domains-r2/`). Not landed.

## Owner feedback 2026-10-17 (after the journey map): pause and redesign

> "the domain section should be separated from the life chapter (pillar reading section), thus, the additional section revealed from the catalogue page should include: 1. A domain page 2. Life chapter page. A. Domain page can show each 8 life domain as icons, and when tapping into each icons leads into each domain reading dissected by the ten-god positioning as the first reading angle. (we could add in other reading angle for higher pricing tiers) B. The life chapter page is the page dedicated to pillar readings". The owner keeps the four ways in, including THE EDGE icons from each energy page.

**Done:** the screens are paused (`DOMAINS_V2 = false` everywhere; code kept).

**Redesign page:** https://claude.ai/artifact/TSnLeJvnmD1awD4eLwKghQ (source: `round-3/`). It covers:
- beat 4 YOUR DOMAINS and beat 5 YOUR LIFE CHAPTERS;
- the Domains page (eight icons);
- a domain reading with angle tabs: By position, and By decade for a higher tier;
- the Life Chapters page: four chapter cards, each with its seats, chapter readings, domain chips and decades.

**Open:** Q1–Q10 and S1–S2. The main one is the name clash, because the Today tab already says "Life Chapter" for the decades.

## Owner feedback 2026-10-17: four in-depth sections

**Three sections, plus a fourth:**
- **Your People:** dropped, because it is the relationship domain and already exists.
- **Domains:** kept.
- **Life Chapters:** the pillars, with 大运 folded in.
- **Energy Blueprint:** top tier. It holds the deep decoding: the structure (格局), seen and unseen, god pairings and clashes, strongest vs missing (调候 and 用神).
- **Stars (神煞):** added as the fourth section.

**My evaluation:**
- Domains: the conversion engine. Free entry, Seeker readings, Advisor angles.
- Life Chapters: the predictive spine. Free glimpse, Seeker chapters and decades, Advisor years.
- Stars: high pull, low classical weight, a fate risk. Free badges, Seeker readings.
- Blueprint: Advisor only. Highest classical weight and the biggest accuracy risk: the structure rule (golden: Steward structure 正财格 by the revealed-stem rule, Alchemist structure 偏印格 by the main stem).

**Questionnaire:** https://claude.ai/artifact/TpNPDwa9BZ5FGvFPPgvvHs (source: `round-4/`). 34 rulings (A placement, B Domains, C Life Chapters, D Stars, E Blueprint, F tiers, G content law) and 6 write-ins. It supersedes the round-3 questions.

## Round 4 rulings (owner 2026-10-17): A1–G2 all A

**Write-ins:**
- I1: "All of them". Follow every classical text and note where they disagree.
- I2, I3, I4: TBD.
- I5: "I want to see the catalogue mock up and how the user journey maps out with the new sections add in, then we sort out details".
- I6: "Not yet".

**What the rulings settle:**
- **Order on Your Reading:** Domains → Life Chapters (with 大运) → Stars → "Going deeper" → Energy Blueprint. Each beat is a live preview card.
- **Doors:**
  - Pillar chart positions → Life Chapters.
  - Today tab tile → "This Decade" → Life Chapters. Its old page and the unlinked "Life Chapters · Your decades" screen retire.
  - Day Master page → Blueprint.
  - The Guidance tab's Energy Manual retires into Domains and Life Chapters.
- **Tiers:**
  - Free: each section's hook.
  - Seeker: the Domains readings, the chapters and decades, the Stars readings.
  - Advisor: the Blueprint, the years, the domain angles By decade and By year.
- **Blueprint:**
  - Structure by the 子平真诠 revealed-stem rule. Golden: Steward structure 正财格.
  - Formed or broken.
  - 穷通宝鉴 season.
  - Four parts.
  - Combinations, clashes, punishments and harms.
- **Stars:**
  - About 16 classical stars, hard stars included with friction framing.
  - Common calculation bases.
  - Stars that arrive with decades (Seeker) and years (Advisor).
  - A lighter layer.
  - English names with 汉字. 羊刃 becomes "the Ram's Edge".
- **Content law:** the prediction law extends to Life Chapters and Stars. Readings are gender-neutral.

**Round 5 (catalogue, journey and unfolded pages):** https://claude.ai/artifact/XMRqiN4ab81FBLQDAyFxAe (source: `round-5/`). Golden stars, hand-computed:
- Scholar's Star in the Year Gate, Red Phoenix in the Month Gate, Lonely Star in the Day Gate, Ram's Edge in the Hour Gate, Robbery Star in the Year Gate, Lost Spirit in the Day Gate.
- The Nobleman arrives with the decade 丁丑 (2023–2032) and in 2027.
- Peach Blossom arrives with the decade 丙子 (2033–2042).

## Rounds 5 to 7 rulings (owner 2026-10-18): R1–R5 all A, then P1–P6 all A

- **Round 6 (R1–R5):** the seat dots stay; a tile opens its page; the words note gains Seat, Gate, Decade and Star; the star chip colours stay; no extra divider after the wheel.
- **Round 7 (P1–P6):**
  - P1: two columns of domain cards.
  - P2: free readers see the seat blocks, locked.
  - P3: all four chapters open, the current one outlined.
  - P4: stars grouped as help, test and arriving.
  - P5: the Blueprint's name plus four locked rows for free and Seeker readers.
  - P6: next, the engine and the writing plan, with golden templates first.

**Round 8:** https://claude.ai/artifact/J5JMZEioCtMy3x7dadZkVN (source: `round-8/`). It covers:
- the engine (structure, bonds, profile, years, stars, season);
- the research tables;
- 70 golden units, gated;
- a writing plan of about 712 units;
- open questions W1–W15.

## Round 8 rulings (owner 2026-10-18): the mockup approved, W1–W15 all A, build now

> "I approve this mock up and would like to see how things look from the app. We don't need fleshed out content now, but we need templated content to fulfill a full user journey with all the proposed sections"

**W1–W15, all A (by the owner's choice "Take your recommendations"):**
- W1: each seat writes its own part of a chapter.
- W2: every tense a reader can be in.
- W3: the current decade in full, plus one line for each other decade.
- W4: a year line plus its strongest bond line.
- W5: the old seat-sheet chapter lines retire.
- W6: star readings by star, gate and tense.
- W7: the Nobleman and Scholar's Star come from the day stem.
- W8: the 19 sourced stars, with the Taiji Nobleman out.
- W9: three states, formed, under strain and broken.
- W10: one seen and unseen line per character.
- W11: 120 season readings, plus 30 need lines.
- W12: new lines for the Blueprint's pairings and bonds.
- W13: no star on its own base.
- W14: the season text over the summary table.
- W15: next, the batch, the engine in the app, then the screens.

**The build (owner answers 2026-10-18):**
- **B1, where:** the dev site only. The new sections sit behind the dev flag, and elementum.life is unchanged until the real content lands.
- **B2:** W1–W15 as recommended.
- **B3, fill text:** the golden units where they exist. Everywhere else, a plain templated sentence built from the chart, tagged "draft" on the dev site.
- **B4, doors:** the round-4 doors and retirements apply on the dev site only:
  - pillar positions → Life Chapters;
  - the Today tab's "This Decade" → Life Chapters;
  - the Day Master page → Blueprint;
  - the Guidance Energy Manual retired.

**Built (2026-10-18):**
- `a7168c3`: the engine, content and resolvers.
- `4240214`: the screens, the catalogue beats and the doors.

All of it is behind `DEPTH_V1 = IS_DEV_TOOLS`, so it shows on the dev site only.

## R2 step 1: the Domains write-first rulings (owner, 2026-10-21)

Asked on https://claude.ai/artifact/GFYPtjewVXaFc6bDdWopgh and answered "Y1 A, Y2 A, S1 A, T1 A".

- **Y1 A, the By-year lines:** thirty lines, one for each year character in each of its three ruling domains (`GOD <god> · year_domain.<Domain>`). The line is the same whether the year helps or weighs. The domain pages' By-year tab and the Almanac's Year page both read them.
- **Y2 A, their tone:** the seven sample lines as written. The other twenty-three were written in that tone by a sealed writer (`2026-10-21-domains-blueprint/out-6.json`), which passed the gate.
- **S1 A, Twin and Rival months (子平真诠 论建禄月劫 · 论杂气):**
  - A Twin or Rival on show never names the structure. The next hidden stem on show decides; failing that, the month branch's main stem.
  - When that main stem is itself the Twin or Rival, it reads as 建禄格 (Self-made) or 月劫格 (Rival). A 劫财 main stem outside the four store months is 月劫格 directly, as 月刃 is for a yang Day Master.
  - Built in `chartDepth.structureOf`, with three new cases in `qa-depth-golden`: 1988-02-10 is 月劫格, 1985-02-09 is 正官格 by the main stem, and 1986-01-15 is 建禄格 in a store month.
  - Of 3,000 random charts, every one now gets a named structure. Before this, about ten per cent read "劫财 · 劫财" or had no structure line.
- **T1 A, the engine-composed lines:** the slot templates (`structure_rule.*`, `rescue.*`, `strongest.*`) are approved as worded. The new rule paths got three lines in the same shape: `structure_rule.middle`, `.own` (a store month whose main stem is the Twin) and `.passed` (only a Twin or Rival shows).

**Landed:** the station `TEMPLATED/tpl_depth.json` now holds 362 units. On 3,003 charts, `qa-domains-coverage` reports 0% placeholder lines on every Domains and Blueprint surface.
