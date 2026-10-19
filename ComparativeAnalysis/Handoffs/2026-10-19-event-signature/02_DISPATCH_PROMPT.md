Design the event signature system for the Today tab: it should know what is happening in the reader's chart each day, month and year, lead the Day, Month and Year pages with it, and drive reminders and fresh reading content by the calendar. This is a new system: proposal first, then the owner's rulings, then the build.

STEP 0. Catch up first. Run `git fetch origin main && git checkout main && git pull origin main`. Then read, in this order:
1. ComparativeAnalysis/Handoffs/2026-10-19-event-signature/01_TASK_BRIEF.md: the owner's words, what exists today (the Today tab, temporal.js, dailyGuidance, the push worker), the reusable pieces from the in-depth engine, what to design and what to deliver.
2. ComparativeAnalysis/Handoffs/2026-10-17-domains/04_DEPTH_STATE_2026-10-19.md: the in-depth sections now on the dev site, the rulings in force, who owns which files across the parallel sessions, the standing laws and how the owner works.
3. Design/Documents/DES_04_App_Design.md §10 (Today Screen) and the "Dynamic Energy Blueprint" spec near the end. Its name now clashes with the in-depth Energy Blueprint section, so this system needs its own name.
4. Reading/Database/Prompts/backlog/2026-10-17_domains-domain-first.md: the prediction law the new content should follow.
5. Memory/2026-10-17_cross-llm-reading-content-generation-and-comparative-eval-elementum.md: the voice laws, the content pipeline and the tools.

Then look at the Today tab on dev.elementum.life (in a local `npx vite`, run `window.__seedData('geng')`, then open the Today tab).

HOW TO WORK:
1. Design and samples first. Put the proposal on a phone-friendly claude.ai artifact page: the signature taxonomy, the selection rule, the reminder and push model, the unit counts, and mockups of the Day, Month and Year pages for the golden chart (1995-04-29 18:00 Beijing, 庚) on real dates from 2026-10-19 on. Include before and after, your recommendation and multiple-choice questions. The owner rules row by row, never in bulk.
2. Reuse the in-depth engine (branchBonds with a passing branch, flowYears, arrivingStars, voidOf, decadePole, the season) and the Life Chapters year content. Don't build a second version of either. The Life Chapters session owns the year lines.
3. Build behind the dev flag (IS_DEV_TOOLS) until the owner rules otherwise. Land content through the station pipeline, push to main and verify dev.elementum.life. Other sessions are working in parallel. Always run `git pull --rebase --autostash origin main` before you push.

Standing laws:
- Never edit Elementum_App/tools/backup-customer-data.mjs. Never run export-reading-templates.mjs --harvest.
- Never run wrangler or deploy yourself; GitHub Actions deploys on push to main. This includes the push worker.
- Don't change the dominance wheel design. No italic.
- Commit trailers: "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" plus your own session link. No model name anywhere else in the repo.
