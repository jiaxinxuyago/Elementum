# Task brief: the event signature system (the Today tab)

The owner, 2026-10-19: "Start a brand new session for event signature system that helps the reading content for the day, month and year page that helps give reminders and push fresh new reading content according to the calendar. (The first tab feature on our nav bar)"

**The goal.** Every day, month and year, the app should know what is happening in the reader's chart and lead with it. That means:
- the Day, Month and Year pages read fresh;
- reminders arrive when something real is happening;
- the content changes with the calendar instead of repeating.

This is a new system: design first, then rulings, then the build and the content.

## 1. What exists today

**The Today tab** (first on the nav bar) is a "Readings Hub":
- `Elementum_App/src/components/dashboard/tabs/TodayScreen.jsx`: a Day tile, Month and Year tiles, and a Decade tile.

**Drill-down pages:**
- `DayPage.jsx`: hero, a link to the decade, a catalyst row, Do/Avoid, best hours.
- `MonthPage.jsx`: hero, four-week arc bars, key dates, Lean Into / Avoid.
- `YearPage.jsx`: hero, four quarters, element balance, the year's counsel.
- `DecadePage.jsx`: on the dev site the decade tile already opens the new Life Chapters page (owner ruling A4). Its old page retires when Life Chapters goes live.

**Engine and content today:**
- `src/engine/temporal.js`: `dayPillar(date)`, `energyContext`, `elementScore`, `flowLevel`, `monthGrid`, `flowWindows`, `yearEnergy`. It scores days by element against the reader's catalyst and resistance.
- `chart.currentFlowYear`, `currentFlowMonth` and `currentFlowDay`, each with its ten-god.
- `src/content/dailyGuidance.js` (`getDailyGuidance`): templated by the day stem's relation family, in an old voice.
- `src/content/cycles.js`.

**Push:**
- `src/infra/push.js`: `enablePush`, `disablePush`, `sendPreview`.
- The worker `workers/push/index.js`:
  - VAPID payload-less push with an hourly cron;
  - the service worker fetches `GET /message`, which today returns one date-based hook, the same for everyone, with no personal data.
- Onboarding step 7 asks for notification opt-in (`birthData.notifyOn`, `notifyHour`).

**Design docs:**
- `Design/Documents/DES_04_App_Design.md` §10 (Today Screen).
- The pending "Dynamic Energy Blueprint" spec near the end of DES_04: daily, monthly and annual guidance from 流年/流月/流日 against the natal chart.

  **Name clash:** "Energy Blueprint" is now the in-depth Advisor section on Your Reading, so this system needs its own name. The owner called it the event signature system.

  REA_03 notes that `liunianSignatures` was superseded by "K2 + Calendar surfaces".

**Reusable pieces built for the in-depth sections** (do not duplicate them):
- `src/engine/depth/chartDepth.js`:
  - `branchBonds(chart, { extra: { label, branch } })` reads any passing branch (a day's, a month's, a year's) against the four gates: 六合, 三合 and the half frames, 六冲, 刑, 害, 自刑;
  - `flowYears(chart, from, to)` gives each year's character and bonds.
- `src/engine/depth/stars.js`: `arrivingStars(chart, pillar)` gives the stars any passing pillar brings (Nobleman days, Travelling Horse months, Peach Blossom years, the Void), and `voidOf`.
- `src/components/reading/domainsResolve.js`: `decadePole` decides helping or weighing from the reader's roles.
- The Life Chapters years (`resolveChapters(...).years`): each year of the current decade, with a year line and the strongest bond line. The Life Chapters session owns that content; the Year page should read from it, not write a second year line.
- `src/engine/depth/season.js`: the 穷通宝鉴 season, which needs a given month.

## 2. What to design (proposal first, then the owner rules)

1. **The signatures.** A taxonomy of calendar events per horizon. Candidates:
   - **Day:** the day pillar's character against the Day Master; a clash, bind or punishment with a gate (a Day Gate clash reads differently from a Year Gate bind); star days (Nobleman, Void, Peach Blossom); the day the current decade or year changes.
   - **Month:** the solar-term month (节气 boundaries, not calendar months); the month pillar's bonds; season shifts that touch the 调候 need.
   - **Year:** 流年 from 立春, its character and bonds (shared with Life Chapters); stars the year brings.
   - **Life markers:** a new gate opening (ages 16, 35, 48); a decade turning; the birthday.
2. **Selection.** Which signature leads today, ranked by strength and rarity so the reader isn't told the same thing twice in a week, and what happens on a quiet day.
3. **The content units** per signature, in the current voice, with the prediction law in force (`Reading/Database/Prompts/backlog/2026-10-17_domains-domain-first.md`): no hedging; no illness, death, divorce or sums; the reader is the subject of the last sentence. Count the units before writing any.
4. **Reminders and push.**
   - What triggers a reminder (only strong signatures?), the cadence, and the copy.
   - Personalised pushes need per-reader computation. Weigh server-side (the worker would need the birth data, which is a privacy question for the owner) against on-device local notifications, against the current same-for-everyone message.
   - Never run wrangler or deploy the worker yourself.
5. **The pages.** How the Day, Month and Year pages lead with the signature, what the hub tiles show, and how tiers split them (free, Seeker, Advisor; the owner rules).
6. **The name** of the system (not "Energy Blueprint").

## 3. Deliver

1. A design proposal on a phone-friendly claude.ai artifact:
   - the taxonomy, the selection rule, the push model and the unit counts;
   - mockups of the Day, Month and Year pages and a reminder on the golden chart for a real week, a real month and a real year (e.g. 2026-10-19 onward);
   - before and after against today's pages;
   - multiple-choice questions with the first option recommended.

   Wait for the owner's rulings.
2. Then golden-chart templates of each new unit kind, for the owner to read before any batch.
3. Then the build, behind the dev flag like the in-depth sections (`IS_DEV_TOOLS`), the content batch through the sealed-writer pattern and the station pipeline, and verification of the dev site. Going live is the owner's call.
