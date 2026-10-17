# The five-energy function reading is final; next, the Day Master page

Written 2026-10-17 by the session "Cross-LLM reading-content generation and comparative eval (Elementum)" (session_01Fj5XhdVYBu4nnzYQ9zqQfL, on main). This is the newest handoff and the live one. Older files in this folder are history. Main was at `0037dd3` when this was written. It was updated the same day for the amount-strip ruling (§2, live at `51809a5`).

## 1. Standing laws (the owner's, verbatim where quoted)

- NEVER edit `Elementum_App/tools/backup-customer-data.mjs`. Never run `export-reading-templates.mjs --harvest`.
- Agents never run wrangler and never deploy. GitHub Actions deploys on push to main (dev.elementum.life and elementum.life).
- All real edits go to `main`. Do not change the dominance wheel design. Italic is banned app-wide.
- The golden chart is 1995-04-29 18:00 Beijing: 庚 The Blade, Overfueled, Earth 33 / Wood 33 / Metal 23 / Water 6 / Fire 5.
- "The owner rules copy row by row with before/after pairs and multiple-choice questions, never in bulk." Show real text side by side, with a recommendation.
- The station is truth. Content lands only through the pipeline:
  1. adopt with provenance into the station JSON (`Reading/Database/templates/by_axis/json/…`);
  2. transcribe into `Elementum_App/src/content/` (k2.js, pairs.js);
  3. `node tools/build-template-twins.mjs`;
  4. `node tools/export-reading-templates.mjs --check`;
  5. `node tools/voice-audit.mjs`;
  6. `node tools/qa-selection-fixtures.mjs` and `node tools/qa-blend-clashes.mjs`;
  7. `npm run build`;
  8. push, then verify the new text in the live bundles of both sites.
- Commit trailers end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` and the session link. No model name anywhere else in repo artifacts.

## 2. What is finished: the five-energy function pages

**Status:** FINAL. Five audit rounds were run (175 pages each: 150 persona pages and 25 Balanced pages). Round 4 met the owner's stop condition, zero MAJOR. Round 5 confirmed it: 0 MAJOR, mean score 4.33, no page below 4. Every finding is fixed or ruled.

**The rulings record:** `ComparativeAnalysis/Evaluations/final-audit-2026-10-17/RULINGS.md`. It holds every ruling from M1–M6 through rounds 2–5 and the picks 1A 2A 3A and X5-02 B. Read it before touching function-page text.

**Verified 2026-10-17:**
- Station and code are in sync (245 files). The twins are current.
- 8,000 real birth charts were run through the app's own builder. All 75 cells (50 ELEMENT_GOD, 25 ELEMENT_PAIR) reach pages, with no errors.
- All 1,500 station texts are in both live bundles.
- On the golden chart, every visible text traces to its station field. See https://claude.ai/artifact/KnkX8upNnWGU9EejZ1CnD5.

### Page anatomy (journeyData.js `buildElementScreen`, JourneyStage.jsx)

**THE FUNCTION** (the definition):
- Normally the pair cell's head (its first two sentences) followed by the persona tail, `K2 <el>_<god> fn_reading[pole].define`.
- A 2+2 page uses the shared pair text, "treat the blend as an individual".
- A Balanced chart uses `definition_balanced`.

**THE AMOUNT** (owner 2026-10-17, "Q1 a, Q2 a, Q3 a" and "Go with this design"; options page https://claude.ai/artifact/MDoKZ9gSC3tah1M2ggBzyN):
- Under THE CHARACTER eyebrow, above the pill row, a strip reads "<Element> in your chart <n>%". Under it sits the overview hero's five-energy bar, with this energy deep and the others faded.
- It shows the number and the bar only: no volume word. "Running thin / full" stays retired as jargon.
- The core's page shows the strip too; its OVERFUELED / UNDERFUELED pill carries the state.
- It reads `m.byEl[el].presence` and the `towers` the hero already uses. Code: `JourneyStage.jsx` `.el-amount` and `journey.css`. Live since `51809a5`.

**THE CHARACTER:** the pole pill, the dial, three metric bars, then the keyword chips. Tapping a chip opens a pop-up with one passage.
- A single persona shows ledger[0].drive, ledger[1].cost_self and ledger[2].cost_others.
- Blends show 2+1 when the lead share is at least 60%, otherwise 2+2.
- `pickBlendRows` filters keywords that clash (`BLEND_CLASHES`). The six friction pages where the Horizon and the Steward lead together show a clean 2+1 (owner 1A).

**The page ends:**
- A catalyst page and a Balanced page end on THE EDGE (`edge.lead`).
- A friction page ends on THE REMEDY (`advise_friction`, "Seek X, the … energy." plus the image line, the "Let it …" line, the diagnosis and the acts).
- `advise_catalyst` and `advise_balanced` are stored but not rendered (owner: "EDGE only (as now)").

### Voice and content laws in force on these pages (a breach is a finding)

**Closes:**
- **M1, catalyst closes:** the gift, its price stated flat, or the want. Never an instruction. A gift close may end on other people.
- **Friction closes (BIZ_04):** a plain cost, the want, or a permission. Never "you can/could". The cost to others carries no charge.
- **F3-01:** every single-persona friction page carries a want or permission close on its drive or cost_self passage.

**Sentences:**
- No new "X, so Y".
- The comparative middle sentence stays.
- Restatement (A3) stays: "A3 original wins".
- "Ahead of" means only "before".

**Words and limits:**
- No "room", no "verdict". No assumed partner, child, boss or household.
- No chart quantity given as a cause.
- Advice is at most 60 words. Chips are at most 3 words.
- Each keyword belongs to one persona.
- B1–B2 English, British spelling.
- "Running over," opens the overfueled 比劫 tails (a ten-cell convention).

**Personas:**
- The Sage seeks or attracts shelter. Sheltering others is its outer act.

**Acts:**
- Per core, each advice or remedy act appears once, counted by meaning.
- Acts draw on the element: Wood starts, Fire shows, Earth keeps, Metal cuts, Water takes in.

### Tooling made for this work

- **The audit kit, `ComparativeAnalysis/Prompts/audit/`:**
  - `pages.mjs` builds every page as the app shows it;
  - `consolidate.mjs` merges the auditors' reports into findings.json;
  - `apply-fixes.mjs` takes `[{key,text,id}]`, enforces house limits, writes the station with provenance and transcribes.
- **The writer-agent pattern:** a handoff folder with a worklist, BRIEF.md and gate.mjs. Sealed writers run in parallel, each output is gated, and the main session lands it. Examples: `ComparativeAnalysis/Prompts/out/handoff/2026-10-17-*`.
- **Round folders:** `ComparativeAnalysis/Evaluations/final-audit-2026-10-17/round-{2..5}/` hold the pages, the six reports, findings.json and tweaks. `AUDITOR_BRIEF.md` and `ROUNDn_BRIEF.md` hold the auditor instructions.

## 3. Open items (parked unless the owner raises them)

- **Unshown passages:** only 518 of the 900 keyword passages can ever appear on a page. Every first keyword's cost_self passage is never selected, by the angle rotation `ANGLE_ORDER[i % 3]`. They are stored and audited. Using them would need a change to how the app picks passages; the owner has not ruled.
- **Old voice in other station fields:** ELEMENT_GOD cells also hold `k2_overview`, `k2_functional` and `k2_domain_readings` (THE DOMAINS). These were not part of the function audit and are in an older voice.
- **Stale twin header:** the twin MD header still describes the ledger as "three doors (trait, scene, outside)". The data uses drive / cost_self / cost_others.
- **DOM-1:** the Domain reading for a new tier. S1 (the price on the domain sheet) waits for it. S2–S4 are app-bug suspects on the backlog. Not approved: "Intuition" → "Insight" and the Virtuoso's domain "Mind" → "Growth".

## 4. Next workstreams: the Day Master page, then THE DOMAINS

Started 2026-10-17 in the session "Elementum day master reading" (session_018G2UubTGzVjLkSgBzGXtjX).
- The task brief and catch-up: `ComparativeAnalysis/Handoffs/2026-10-17-day-master-diagnosis/`.
- Earlier Day Master laws: the 2026-09-11, 2026-09-15 (P4, door-tagged pools) and 2026-09-20 handoffs in this folder.

**THE DOMAINS, domain first, then the ten-god positions** (DOM-1). Started 2026-10-17 in the session "Elementum Domains reading", the owner's "most important next section".
- **The reading has to climb:** "it knows me", then "how did it know that?" (the past), then "is that really going to happen?" (the future).
- **Brief and catch-up:** `ComparativeAnalysis/Handoffs/2026-10-17-domains/`.

## 5. The owner's review pages for this workstream (claude.ai artifacts)

- Rounds 3 to 5 results: https://claude.ai/artifact/Wd6v6zqn2T13Sh4smsZGir
- Round 2 results: https://claude.ai/artifact/Sg5Q7Jzy5qP1XErcHSgtDR
- Final audit lists: https://claude.ai/artifact/SVcnEvG6DzSLVkqAoveyT9
- The golden chart in the app, every text traced: https://claude.ai/artifact/KnkX8upNnWGU9EejZ1CnD5
- Amount on the function page, the options and the ruling: https://claude.ai/artifact/MDoKZ9gSC3tah1M2ggBzyN
