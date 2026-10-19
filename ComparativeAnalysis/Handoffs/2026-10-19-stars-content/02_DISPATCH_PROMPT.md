Rule and write the Stars (神煞) reading content with the owner, then land it. The Stars page and its calculator are already built on the dev site with templated text; your job is the names, the framing and the content.

STEP 0. Catch up first. Run `git fetch origin main && git checkout main && git pull origin main`. Then read, in this order:
1. ComparativeAnalysis/Handoffs/2026-10-17-domains/04_DEPTH_STATE_2026-10-19.md: what is built, the rulings in force, who owns which files across the parallel sessions, the standing laws and how the owner works.
2. ComparativeAnalysis/Handoffs/2026-10-19-stars-content/01_TASK_BRIEF.md: your task, the 19 stars and their working names, the units, the open questions and what to deliver.
3. ComparativeAnalysis/Handoffs/2026-10-17-domains/research/shensha-rules.md (and its .json): the sourced rules, meanings and the twelve school differences.
4. ComparativeAnalysis/Handoffs/2026-10-17-domains/03_RULINGS.md: the full rulings record, D1 to D6, W6 to W8, W13 and B1 to B4.
5. Reading/Database/Prompts/backlog/2026-10-17_domains-domain-first.md: the prediction law, which applies to Stars (G1). Readings are gender-neutral (G2).
6. Operations/Business/BIZ_04_Friction_Framing_Research.md: how to state a hard star.
7. Memory/2026-10-17_cross-llm-reading-content-generation-and-comparative-eval-elementum.md: the voice laws, the content pipeline and the tools.

Then look at the page on dev.elementum.life (Your Reading → YOUR STARS), the round-8 templates (https://claude.ai/artifact/J5JMZEioCtMy3x7dadZkVN, section 5) and the calculator in Elementum_App/src/engine/depth/stars.js.

HOW TO WORK:
1. Names and samples first. Show the golden chart, then charts B and C, on phone-friendly claude.ai artifact pages: real app text, before and after, your recommendation and multiple-choice questions. Wait for the owner's rulings before writing the corpus. The owner rules row by row, never in bulk.
2. Write with the sealed-writer pattern and a gate, land through the station pipeline, push to main, and verify dev.elementum.life. Going live on elementum.life is the owner's call.
3. Edit only the Stars parts of the shared files (stars.js, resolveStars in depthResolve.js, StarsPage in DepthViews.jsx). If you change the calculator, re-run Elementum_App/tools/qa-depth-golden.mjs and update its expected values only with the owner's ruling. Other sessions are working in parallel. Always run `git pull --rebase --autostash origin main` before you push.

Standing laws:
- Never edit Elementum_App/tools/backup-customer-data.mjs. Never run export-reading-templates.mjs --harvest.
- Never run wrangler or deploy yourself; GitHub Actions deploys on push to main.
- Don't change the dominance wheel design. No italic.
- Commit trailers: "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" plus your own session link. No model name anywhere else in the repo.
