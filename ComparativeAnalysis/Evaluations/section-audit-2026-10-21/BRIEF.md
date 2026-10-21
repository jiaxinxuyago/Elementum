# Section content audit · 2026-10-21

The owner asked on 2026-10-21 for "each reading section's session to start a reading content audit based on accuracy and The Pattern content benchmarks".

Each section's owning session runs this audit on its own content. The method is the one that closed the function pages: `ComparativeAnalysis/Evaluations/final-audit-2026-10-17/SOP.md`, with the same criteria, severity classes and definition of done. Read that SOP first, then its `AUDITOR_BRIEF.md` and `RULINGS.md`.

## Who audits what

| Section | Owning session | Scope (what a reader sees on elementum.life) |
|---|---|---|
| Domains + Blueprint | session_0157BD3MBKbov3jAMoKYj2nT | the domain readings, the Blueprint page, the `year_domain.*` lines |
| Life Chapters | session_01LKbtNcH4nTofFBwRv1HdHf | the energy-first chapter pages, the chapter lines, the shared year lines |
| Stars | session_01MspmFFbcsCTE5ZhyTBhyBN | the star readings and their names |
| Your Almanac | session_01CtFpHCUsMdTUYosYF5mHoy | the Today hub, Day, Month, Year (`TEMPLATED/tpl_almanac.json`, 320 units) |
| Day Master + merged Your reading | session_01RJRm3y3yvdzEnvZoX5yTx7 | waits until the design pass is ruled (owner 2026-10-21) |

The function pages are frozen (SOP §6) and out of scope. Draft content still gets audited; mark findings on a draft as DRAFT so the owner can tell them apart from findings on ruled text.

## The steps (SOP §5, per section)

1. **State check.** For every preset chart, does each section page resolve and render every block? Is the station JSON in sync with the app (`node tools/export-reading-templates.mjs --check`)? Are the JSON and MD twins fresh? Is any cell missing or falling back? Record the results as a table, as in SOP §2.
2. **Assemble the pages** as the reader sees them. Add your surface to `ComparativeAnalysis/Prompts/audit/pages.mjs` under the contract in its header: every section keyed by its station address. Run the mechanical compound report. The audit unit is the assembled page, never the field.
3. **Sealed auditors.** These are independent subagents that read; they never edit. Split the pages into groups of about 30, one auditor per group. Add one cross-reader for consistency (D2/D3 in the SOP, adapted: the same persona, star or chapter reads as the same thing everywhere). Each auditor reads, in order:
   - the SOP;
   - `Reading/Database/Prompts/07_REFERENCE_BENCHMARKS.md`, the Pattern excerpts and the north star;
   - `Operations/Business/BIZ_04_Friction_Framing_Research.md`;
   - `Reading/Database/Prompts/04_READING_SYSTEM_PRIMER.md` §1–3.

   Each auditor scores every page on A1–A5, B (Pattern parity: 5 is better than The Pattern, 4 equal), C and D1–D6. It files findings as MAJOR / MINOR / TWEAK, with the station key, the quoted words and the fix. Adapt `AUDITOR_BRIEF.md` to your surface, with your own house limits.
4. **Accuracy carries the most weight (A1).** Check that the BaZi logic holds:
   - the element relations and the ten gods;
   - the timing: luck pillars, years and months, the solar-term boundaries (Almanac: note finding F1, the solar-term date drift, and do not change the calculator);
   - the star derivations against the classical tables;
   - no section contradicts another or the merged reading's locked labels ("feeds you · shapes you · you feed it · you shape it · more of you"; never "tames");
   - no claim the chart cannot know.

   Cite the classical source for each accuracy finding.
5. **Consolidate** with `ComparativeAnalysis/Prompts/audit/consolidate.mjs`: merge duplicates, separate systemic findings from local ones, rank by reader impact.
6. **Apply the TWEAKs only.** Gate them, then land them with `apply-fixes.mjs` (or the station pipeline), then run the full pipeline:
   - `node tools/build-template-twins.mjs`;
   - `node tools/export-reading-templates.mjs --check`;
   - `node tools/voice-audit.mjs`;
   - the qa-* scripts;
   - `npm run build`.

   Then run `git pull --rebase --autostash origin main`, push, and verify on dev and live.
7. **Report to the owner in one artifact.** It has three lists:
   - MAJOR: waits for approval, nothing done;
   - MINOR: proposed rewrites for one polish round;
   - TWEAKS: what was fixed.

   It also carries the score table, with the mean B and every page below 4. Rulings come as multiple choice, recommended option first, answered in codes, row by row.

Done when no MAJOR is open, every MINOR is fixed or waived, every page scores at least 4 on B and on A1–A5, and the mechanical checks are green. Then the section freezes, per SOP §6.

## Standing laws

- Never edit `Elementum_App/tools/backup-customer-data.mjs`.
- Never run `export-reading-templates.mjs --harvest`.
- Never deploy yourself; GitHub Actions deploys on push.
- Commit to main after `git pull --rebase --autostash origin main`.
- Retired text goes to station `__ore`, never deleted.
- No italic.
- Stay in your own section. A finding in another session's content goes in your report under "for other sections"; do not fix it.
- The design-director session (session_01KJDZ1kMntpuhi1pR192vYL) is redesigning layout only. Do not wait on it, and do not touch layout.

Write your records under `ComparativeAnalysis/Evaluations/section-audit-2026-10-21/<section>/`.
