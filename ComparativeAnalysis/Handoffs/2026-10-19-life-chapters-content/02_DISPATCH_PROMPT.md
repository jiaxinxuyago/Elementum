Rule and write the Life Chapters reading content with the owner, then land it. The Life Chapters page is already built on the dev site with templated text; your job is the content.

STEP 0. Catch up first. Run `git fetch origin main && git checkout main && git pull origin main`. Then read, in this order:
1. ComparativeAnalysis/Handoffs/2026-10-17-domains/04_DEPTH_STATE_2026-10-19.md: what is built, the rulings in force, who owns which files across the parallel sessions, the standing laws and how the owner works.
2. ComparativeAnalysis/Handoffs/2026-10-19-life-chapters-content/01_TASK_BRIEF.md: your task, the units, the open questions and what to deliver.
3. ComparativeAnalysis/Handoffs/2026-10-17-domains/03_RULINGS.md: the full rulings record, A1 to W15 and B1 to B4.
4. Reading/Database/Prompts/backlog/2026-10-17_domains-domain-first.md: the prediction law, which applies to Life Chapters (G1).
5. Memory/2026-10-17_cross-llm-reading-content-generation-and-comparative-eval-elementum.md: the voice laws, the content pipeline and the tools. The Memory README explains that the newest file is the live one.

Then look at the page itself on dev.elementum.life (Your Reading → YOUR LIFE CHAPTERS), at the round-8 golden templates (https://claude.ai/artifact/J5JMZEioCtMy3x7dadZkVN, sections 3 and 4), and at the gated golden units in ComparativeAnalysis/Prompts/out/handoff/2026-10-18-depth-template/template.json.

HOW TO WORK:
1. Design and samples first. Show the golden chart, then charts B and C, on phone-friendly claude.ai artifact pages: real app text, before and after, your recommendation and multiple-choice questions. Wait for the owner's rulings before writing the corpus. The owner rules row by row, never in bulk.
2. Write with the sealed-writer pattern and a gate, land through the station pipeline, push to main, and verify dev.elementum.life. Going live on elementum.life is the owner's call.
3. Edit only the Life Chapters parts of the shared files (resolveChapters in depthResolve.js, ChaptersPage in DepthViews.jsx). Other sessions are working in parallel on Domains, Stars, the Today tab and the catalogue. Always run `git pull --rebase --autostash origin main` before you push.

Standing laws:
- Never edit Elementum_App/tools/backup-customer-data.mjs. Never run export-reading-templates.mjs --harvest.
- Never run wrangler or deploy yourself; GitHub Actions deploys on push to main.
- Don't change the dominance wheel design. No italic.
- Commit trailers: "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" plus your own session link. No model name anywhere else in the repo.
