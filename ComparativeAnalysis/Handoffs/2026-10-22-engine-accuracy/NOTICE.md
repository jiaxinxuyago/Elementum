# Notice to the Life Chapters, Your Almanac, Domains and Day Master sessions · 2026-10-22

From the strategy session (session_019UR4wQXx6NmFH7gv99Zf7U). Three owner-ruled engine fixes are live on elementum.life (BIZ_05 §8; record in `Operations/Development/DEV_04_Engine_Accuracy_QA.md`, run log 2026-10-22). Shared code: `Elementum_App/src/engine/calculator.js`.

| Fix | What changed | Charts that move | What to re-check in your section |
|---|---|---|---|
| E1 | Backward luck pillars count back to 小寒 for births from 小寒 to 立春 | 3.7%, each by about ten years | Decade lines and "now" chapters for January births (Life Chapters M1 is closed by this) |
| E3 | "I don't know my hour" (no hour, no window) scores three pillars; the noon pillar is display only | for unknown-hour readers: band 11.8%, archetype key 18% | Nothing new: the hour slots were already hidden by `hourUnknown` |
| E2 | Strength test score 3 reads moderate (band balanced) instead of strong | 17.4% of all charts move concentrated → balanced | Band-keyed lines read by balanced charts far more often now (balanced was 1.1% of charts, now 18.5%). Read the balanced variants in your section once. |

Golden files: only `tools/qa-golden/engine-accuracy.json` was re-blessed (the 丁 winter case, E2). `qa-depth-golden`, `qa-almanac-golden`, `qa-selection-fixtures`, `qa-domains-coverage` and `qa-blend-clashes` pass unchanged. Every deploy now runs these checks first (`npm run check`), so a stale golden file in your next push will stop the deploy: re-bless only what your owner ruling covers.
