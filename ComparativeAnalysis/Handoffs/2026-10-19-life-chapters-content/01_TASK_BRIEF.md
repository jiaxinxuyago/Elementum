# Task brief: Life Chapters reading content, ruling and writing

The owner, 2026-10-19: "Start another session for Life chapter reading content ruling."

Life Chapters is the predictive spine of the in-depth sections. It reads the pillars as four chapters of a life, with the 大运 decades running inside them and, at Advisor, each year of the current decade.

The page is built and live on the dev site with templated content. Your job is to rule the content with the owner, write it, and land it.

## 1. What exists

- **Page:** `ChaptersPage` in `Elementum_App/src/components/journey/DepthViews.jsx`. Its model comes from `resolveChapters` in `Elementum_App/src/components/reading/depthResolve.js`.
- **To see it:** open dev.elementum.life. In a local `npx vite`, run `window.__seedData('geng')` and `window.__setTier('advisor')`, then open YOUR LIFE CHAPTERS on Your Reading. You can also reach it from the Today tab's decade tile, the pillar chart's door, or a domain page's "See your X across your Life Chapters".
- **Approved shape:** the round-7 mockup (https://claude.ai/artifact/JMy3dsp2wr48poZE6ffAYy) and the round-8 templates (https://claude.ai/artifact/J5JMZEioCtMy3x7dadZkVN, section 3 Life Chapters and section 4 Your years). The owner approved the mockup.
- **Engine:**
  - gates and tenses: `gateTense` in `depthResolve.js`;
  - decades: `chart.luckPillars`, with the pole from `decadePole` in `domainsResolve.js` (the decade element's role: catalyst helps, friction weighs, the core helps only an Underfueled chart);
  - years: `flowYears` in `engine/depth/chartDepth.js`, the year's character plus its branch bonds with the gates, strongest first: clash > punishment > harm > bind = frame > self-punishment, ties by Month > Day > Hour > Year.
- **Golden units already written and gated** (`src/content/depth.js`, source `ComparativeAnalysis/Prompts/out/handoff/2026-10-18-depth-template/template.json`):
  - the seven golden chapter units;
  - the Horizon's Day-seat chapter in all three tenses;
  - seven decade units;
  - seven year lines;
  - six year-bond lines.
- **The gate for these kinds:** `…/2026-10-18-depth-template/gate.mjs`, which checks:
  - kinds `chapter_at`, `chapter_inside`, `chapter_day`, `decade_now`, `decade_line`, `year_line` and `year_bond`, with their budgets;
  - the openings: a stem seat opens "Your X Chapter"; a seat inside opens Inside it, Beneath it, Under it, Behind it, Out of sight or In private; the Day seat opens "Your Home Chapter";
  - tense by key;
  - chart invariance;
  - no five-word run shared with the same seat's domain units.

## 2. The units to write (W1–W5, all A)

| Unit | Station key | Count | Words |
|---|---|---|---|
| Chapter reading, stem seat | POSITION `<seat>` · `chapter.lived\|now\|coming` (Year: lived; Month: now, lived; Hour: coming, now) | 50 | 22–45 |
| Chapter reading, seat inside | the same, branch seats | 50 | 16–40 |
| Chapter reading, Day seat | POSITION `*_day_branch` · `chapter.coming\|now\|lived` | 30 | 30–60 |
| Current decade, in full | GOD · `chapter_decade.helping\|heavy.now` | 20 | 30–60 |
| Decade line, lived or coming | GOD · `chapter_decade.helping\|heavy.lived\|coming` | 40 | 14–35 |
| Year line (Advisor) | GOD · `year_line.helping\|heavy` | 20 | 20–42 |
| Year bond line (Advisor) | TEMPLATED tpl_depth · `year_bond.<bind\|clash\|punish\|harm\|frame\|selfpunish>.<year\|month\|day\|hour>` | 24 | 12–30 |

Also:
- **W5:** retire the old seat-sheet chapter lines. Today `positionsResolve.js` passes `life_chapter` (old voice) to the seat sheet in `JourneyStage.jsx` (`p.lifeChapter`). The seat sheet should show the new chapter unit in the reader's tense instead. This is live on elementum.life today, so it changes production when it lands.
- **Retired page (A4):** the Today tab's old "This Decade" page (`DecadePage.jsx`) and the unlinked `LifeChaptersDetail.jsx` retire once Life Chapters goes live. On the dev site the decade tile already opens Life Chapters.

## 3. Open questions to bring to the owner early

1. **Decade lines:** written per god × pole (as ruled), or should a decade line also know which gate it falls in?
2. **Overlap with Domains.** Domains already writes lived and ahead units per seat and domain, and decade lines per god × domain × pole. The chapter readings must read as the era, not repeat a domain claim; the gate blocks shared five-word runs. Show the owner one chapter beside its domain units.
3. **The years:**
   - lived years show only as chips;
   - a year carries at most one bond line;
   - should year stars (the Stars session's `arriving.year`) also chip onto the year card?
4. **Ages outside the window:**
   - decades starting before 10 or after 75 show only in the strip;
   - readers under 16 never see a Month Gate "coming" unit (not written);
   - confirm both.
5. **The closed Hour Gate** (birth hour unknown): the Late Chapter shows a note and a door to add the hour. Confirm the wording.
6. **The page's free hook:** the claim line, the life line, the decade strip, chapter names and seats, and domain chips. Confirm nothing more is free.

## 4. Deliver

1. A brief and golden samples first:
   - the golden chart, then charts B and C (see `../2026-10-17-domains/04_DEPTH_STATE_2026-10-19.md` §5);
   - for each, every chapter unit in the reader's tense, the current decade in full, the other decade lines and the years;
   - before and after, with questions.
2. After the owner rules:
   - write the batch with the sealed-writer pattern (copy and extend the depth gate);
   - land it in the station: POSITION `candidates.chapter`, GOD `candidates.chapter_decade` and `candidates.year_line`, TEMPLATED `tpl_depth.json`;
   - add the REA_16 registry rows;
   - give Life Chapters its own generated content module;
   - add a chapters surface to `ComparativeAnalysis/Prompts/audit/pages.mjs`;
   - audit, fix, push;
   - verify the dev site.
3. Going live on elementum.life is the owner's call. Propose a per-section flag when the content is ready.
