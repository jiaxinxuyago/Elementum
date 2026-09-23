# Core developer, product designer, and writer readiness

Written 2026-09-23. This is the newest onboarding handoff, not a replacement for the source documents or earlier owner rulings.

**Readiness:** ready to contribute to Elementum's development, product design, and writing from the repository's current canon. The study connected the product intent, reading system, content station, rendered experience, application code, backend boundaries, and operating rules. This records working knowledge and verification limits; it is not a production certification.

**Snapshot:** primary study and checks began at `ed247b17512bfbcd994ef1cdbf67738a3c597a09`. Before writing this handoff, reconciled `main` at `f2c5200b58d2e6e71ecf49cae885957b3453dbc8`. The two intervening commits completed the blind candidate pages and updated their filing/rendering. A scoped diff confirmed no change to the app, canonical templates, Reading documents, Design, Operations, previous Memory files, or deployment workflows. The checks below therefore also describe those surfaces at the final reviewed head.

## 1. Start here and resolve authority deliberately

| Need | Read first |
|---|---|
| Repository map and document registry | [Operations/README](../Operations/README.md) |
| Standing reading and design laws | [September 11 handoff](2026-09-11_data-var-ruling-part-i-five-energy-and-tone-setting.md), [September 15 P4 handoff](2026-09-15_p4-quintessence-and-the-door-tagged-pools.md), [September 20 rulings](2026-09-20_evaluation-reconciliation-and-the-rulings.md) |
| Reading concepts, canonical names, field contracts | [REA_01](../Reading/Documents/REA_01_Archetype_System.md), [REA_02](../Reading/Documents/REA_02_Concept_Dictionary.md), [REA_03](../Reading/Documents/REA_03_Reading_Generation_Schema.md) |
| Classical basis, assembly, teaching, voice | [REA_04](../Reading/Documents/REA_04_Knowledge_Pool.md), [REA_05](../Reading/Documents/REA_05_Generation_Architecture.md), [REA_06](../Reading/Documents/REA_06_Concept_Ladder.md), [REA_16](../Reading/Documents/REA_16_The_Voice.md) |
| Writing prompts and comparison process | [REA_17](../Reading/Documents/REA_17_Generation_Prompt_Pack.md), [prompt database](../Reading/Database/Prompts/README.md), [September 21 handoff](2026-09-21_prompt-database-and-comparative-analysis.md) |
| Product and visual design | [DES_04](../Design/Documents/DES_04_App_Design.md), [source manifest](../Design/Source/manifest.md), [Design Library](../Design/Library/) |
| Engineering and accuracy standards | [DEV_01](../Operations/Development/DEV_01_Calculation_Engine.md), [DEV_02](../Operations/Development/DEV_02_Code_Architecture_and_Migration.md), [DEV_03](../Operations/Development/DEV_03_Code_Review_Standards.md), [DEV_04](../Operations/Development/DEV_04_Engine_Accuracy_QA.md), [DEV_05](../Operations/Development/DEV_05_Arch_Cleanup_Audit.md) |
| Operations and current decisions | [INF_01](../Operations/Infrastructure/INF_01_Backend_Architecture.md), [PM_01](../Operations/Project_Management/PM_01_Automation_Runbook.md), [PM_02](../Operations/Project_Management/PM_02_Pending_Tasks.md), [PM_03](../Operations/Project_Management/PM_03_Day_Log.md) |
| Audience and business hypotheses | [BIZ_01](../Operations/Business/BIZ_01_Elementum_Expense_Report.md), [BIZ_02](../Operations/Business/BIZ_02_Elementum_Validation_Sprint.md), [BIZ_03](../Operations/Business/BIZ_03_Audience_Tone_Research.md) |

Use the latest applicable owner ruling and the current canonical documents for intended behavior; inspect implementation to establish what actually happens. Do not silently turn a code/document disagreement into a new product decision. Older migrations, archives, retired names, and historical handoffs are context, not a fresh task queue.

Generation experiments have narrower authority. For the September 23 benchmarked run, its [repository-session addendum](../ComparativeAnalysis/Handoffs/2026-09-23-geng-golden-benchmarked/01_REPO_SESSION_ADDENDUM.md) explicitly makes the prompt database govern that run when source books disagree and limits output to a dedicated branch. That exception is scoped to the experiment. It does not promote candidate prose into product canon.

## 2. Product understanding

Elementum translates a BaZi birth chart into an English experience of self-recognition and practical calibration. The intended reader is largely unfamiliar with the Chinese system. Recognition comes first; the system becomes available as the reader asks for it. The three writing readers are the Screenshot Curator, Depth Migrant, and Heritage Curious.

The core reading is authored content assembled deterministically from the chart. It is not a new LLM reading generated for every user. The Advisor consultant is a separate conversational capability.

The implemented first-run journey collects birth date, exact/window/unknown time, location, and gender/polarity information, offers notifications, calculates the chart, and moves through the identity reveal into the catalogue. The catalogue moves from identity to the Energy Manual and Energy Map. The identity page is separate from each energy's cover, index, mechanism, function, and domains. The five main tabs are Today, Guidance, Reading, Compat, and Profile.

Commercial behavior must be checked against [pricing configuration](../Elementum_App/src/infra/pricing.js), entitlement checks, and the active offer. At this snapshot: free readers receive the core identity/mechanism/function experience; Seeker opens full domain readings; Advisor includes the consultant. The founding offer displays $9 once for lifetime Advisor access. Self-Report is a separate $6.99 purchase. $9.99/month and $19.99/month are configured tier prices, while subscriptions remain a post-beta item. These are repository facts, not confirmation of live Stripe configuration.

Birth data and chart state are principally on-device. Authentication and entitlements do not imply cloud chart synchronization.

## 3. Implementation map and contracts to preserve

| Surface | Entry points and implications |
|---|---|
| Shell, routing, state | [App.jsx](../Elementum_App/src/App.jsx), [main.jsx](../Elementum_App/src/main.jsx), [chartContext.jsx](../Elementum_App/src/store/chartContext.jsx), [authContext.jsx](../Elementum_App/src/store/authContext.jsx). React 19, Vite 8, hash routing, lazy screens, local chart cache and engine-version invalidation. |
| Calculation | [calculator.js](../Elementum_App/src/engine/calculator.js), [buildEnergyChart.js](../Elementum_App/src/engine/buildEnergyChart.js), [energyRoles.js](../Elementum_App/src/engine/energyRoles.js). Separate calendar calculation, weighted composition, strength, normalized presence, roles, volumes, and faces. |
| Current reading assembly | [journeyData.js](../Elementum_App/src/components/journey/journeyData.js), [JourneyStage.jsx](../Elementum_App/src/components/journey/JourneyStage.jsx), [readingResolve.js](../Elementum_App/src/components/reading/readingResolve.js), [positionsResolve.js](../Elementum_App/src/components/reading/positionsResolve.js). Trace a field through these before changing its source or display. |
| Authoring and runtime corpus | [canonical JSON station](../Reading/Database/templates/by_axis/json/), [runtime content](../Elementum_App/src/content/). The station is the editing surface; runtime transcription remains deliberate. Generated twins and comparison rewrites have different roles. |
| Adjacent features | [temporal.js](../Elementum_App/src/engine/temporal.js), [compatibility.js](../Elementum_App/src/engine/compatibility.js), [dailyGuidance.js](../Elementum_App/src/content/dailyGuidance.js), [selfReportContent.js](../Elementum_App/src/content/selfReportContent.js). Temporal/compatibility outputs include product heuristics; Self-Report composes authored fragments. Do not describe them as broader analysis than they implement. |
| Consultant | [consultantPayload.js](../Elementum_App/src/components/dashboard/consultantPayload.js), [AIConsultantScreen.jsx](../Elementum_App/src/components/dashboard/AIConsultantScreen.jsx), [LLM worker](../Elementum_App/workers/llm/index.js). Its payload includes legacy reading sources; it does not automatically inherit every current Journey field. |
| Backend and payments | [infra](../Elementum_App/src/infra/), [migrations](../Elementum_App/supabase/migrations/), [Stripe worker](../Elementum_App/workers/stripe-webhook/index.js), [push worker](../Elementum_App/workers/push/index.js). Client tiers are presentation state; protected services verify entitlement independently. |
| Release and quality | [workflows](../.github/workflows/), [QA tools](../Elementum_App/tools/), DEV_03/04. Both site workflows follow main with app-path filters. A Memory-only change does not itself deploy the app. |

The selection rules most likely to be broken by an apparently small edit are recorded in the September 20 rulings and [selection fixtures](../Elementum_App/tools/qa-selection-fixtures.mjs):

- Resolve one band for all reading surfaces through `ec.band`. Internal concentrated/balanced/open correspond to Overfueled/Balanced/Underfueled. Strength, presence, role, and volume are related but distinct.
- Body, Mind, Expression, Action, and Order are the five function names. Earlier Core/Root/Voice/Drive/Duty family names still exist in legacy data; they must not be revived as current function labels. Core still has a separate identity/role use.
- Volume thresholds are absent at or below 0.5, thin through 10, present below 20, abundant from 20, and dominant from 40. The dominant non-core override must not flip the core.
- Door eligibility controls gifts and shadows. Empty doors mean no chips; undefined doors retain the deliberate Balanced baseline. Do not fill empty space with an ineligible door. A single eligible door can supply both authored faces.
- The function ledger uses one face's three rows, or two faces split 2+1 when the displayed lead share is at least 60%, otherwise 2+2. Keep authored rank, deterministic tie handling, and door rotation.
- Yin overrides are sparse and merge into shared content. Mechanism turns and carry lines must agree. P4 uses its own identity/portrait/pool/carry assembly; the core energy's `self_card` is not a replacement P4.
- Position readings use the current seat resolver and hide uncertain hour positions. Do not substitute the legacy branch Ten God placeholder fields.

The station inventory at this head contains 240 data JSON files across 11 populated axes, including 10 STEM, 30 STEM_BAND, 25 ELEMENT_PAIR, 50 ELEMENT_GOD, and 70 POSITION files. The K2 ledger contains 900 door passages. All ten STEM pools together contain 140 gift/shadow items. The empty held STEM_BAND_PATTERN axis is not authorization to invent 150 missing entries.

## 4. Writing and design operating rules

For a writing task, start with the exact variable's [field card](../Reading/Database/Prompts/fields/), [rules register](../Reading/Database/Prompts/02_RULES_REGISTER.md), and [current caps](../Reading/Database/Prompts/06_CAPS_BY_PAGE.md), then its station cell and engine-supplied facts. REA_16 governs the voice; BIZ_03 explains the audience rather than replacing it.

The reading voice is “the engraving that reads you.” Sign descriptions and personal portraits have different grammatical persons. Use plain language, the nature's own material arena and cost, and specific recognition without invented biography or guaranteed outcomes. Preserve canonical nature/persona/function names. New reading fields need schema and voice registration before drafting. The consultant has an explicitly warmer conversational register.

The latest rules distinguish fixed schema, facts, vocabulary, person, and word ranges from craft guidance. Both word-count bounds are hard in the current handoff. Reflex hedges are banned; every frequency word is not. Repetition checks have deliberate carry/yin/echo exceptions. Do not apply an older mechanical interpretation over a later owner ruling, or treat a passing gate as a good reading.

The content workflow is station edit, appropriate twins, deliberate runtime transcription, then synchronization/voice/selection checks and affected UI validation. Comparison adoption additionally requires the owner's per-field ruling and provenance. `export-reading-templates.mjs --harvest` is destructive bootstrap machinery, not a routine synchronization command.

For design, preserve the warm paper/silk, ink and bronze, restrained seal red, muted elemental pigments, quiet cards, and progressive disclosure established in DES_04 and the Journey/Catalogue handoff. The current app uses Cormorant display, EB Garamond body, Cinzel architectural labels, Noto Serif SC glyphs, and JetBrains Mono eyebrows. No italics is the current app ruling; older Library examples can contradict it. Ma Shan Zheng is retired from current runtime typography. Preserve the canonical 390×844 composition, safe areas, icons-only navigation, and reading CTA treatment.

[Design source tokens](../Design/Source/tokens.css) are specification, not a stylesheet automatically applied to the app. Runtime tokens and scoped reading/journey CSS must be inspected. Icons also have multiple delivery copies. Do not assume changing one specification file updates every rendered surface. The owner has deferred parts of the design-HTML synchronization until the experience settles; do not restart that work incidentally.

## 5. Current workstream at the reviewed head

The September 23 blind golden-chart comparison is now **generated and filed**, superseding the older Memory statement that no model had generated anything.

- [Evaluation status](../ComparativeAnalysis/Evaluations/handoff-geng-golden-2026-09-23/README.md): six of six pages, 54 of 54 fields recorded as passing. Scope is P4 plus the five energy pages, excluding the broader domains/Codex corpus.
- [Readable original/candidate comparison](../ComparativeAnalysis/Evaluations/handoff-geng-golden-2026-09-23/codex-blind.reading.md) and [candidate rewrite station](../Reading/Database/Rewrites/codex-blind/) are ready for the owner's first read.
- The gate records three non-blocking reader-zone words and one non-blocking Fire ledger four-gram. These are recorded results, not an editorial endorsement from this onboarding.
- Per-field adoption is not recorded. The benchmarked pass is still blank in the current evaluation table. The canonical station and shipped content remain unchanged by the two latest candidate commits.
- Q0–Q8 rulings are already incorporated in the rules register. Older “awaiting rulings” prose in comparison summaries must not reopen settled decisions.

The next content milestone is the owner's read and the experiment's prescribed subsequent pass/rulings, not automatic adoption. An original is allowed to win. Preserve model attribution and `$provenance` when an approved adoption occurs.

## 6. Verification performed during this study

Checks were run without changing product code or canonical content.

| Check | Observed result |
|---|---|
| Dependency install | `npm ci --ignore-scripts --no-audit --no-fund` succeeded; package and lock files unchanged. |
| Lint | `npm run lint` exited successfully: 0 errors, 57 existing React Fast Refresh warnings. |
| Production build | `npm run build` succeeded. Main JS chunk 1,599.09 kB before gzip, 491.66 kB gzip; large-chunk warning remains. |
| Station/runtime audit | `node tools/export-reading-templates.mjs`: all code-mapped fields synchronized across 240 files. Station-only fields are outside this comparison. |
| Voice audit | `node tools/voice-audit.mjs`: 62 registered rows enforced, zero blocking findings; 632 pending findings across eight unruled/legacy surfaces. |
| Selection contracts | `node tools/qa-selection-fixtures.mjs` passed, including volume boundaries, core exemption, door eligibility, page/carry parity, and the rounded 60% ledger boundary. |
| Engine regression | `node tools/qa-engine-regression.mjs`: 6/6 stored golden cases match. This establishes regression stability, not independent calendar accuracy. |
| Browser journey | `node tools/qa-journey-sweep.mjs`: 18/18 steps passed, including real onboarding gestures, calculated golden pillars, energy cycling, identity/pillars, tabs, and calendar drill-downs. Location suggestions are mocked in this suite. |
| Route sweep | `node tools/qa-route-sweep.mjs`: 41 routes × three viewports = 123 cells. No fatal/blank pages, page exceptions, detected clipping, or broken images. Three cells had failed Open-Meteo requests and associated console messages. |

Commands in this table run from `Elementum_App/`. Browser tools require a reachable local app server; consult their headers for normal invocation. The local study used Node 24.19.0 and Playwright 1.60 with Chromium 153 supplied through a temporary launch adapter because the normal browser download was unavailable. The journey and sweep scripts themselves were unchanged. CI specifies Node 22; that environment was not rerun.

Representative catalogue, manual, energy/function, Geng and Xin identity, Today, and Design Library screens were visually inspected. Font delivery was incomplete in the restricted local environment, including missing Chinese glyphs, so this is layout/art inspection rather than typography sign-off. The route sweep's external geocoder returned `ERR_EMPTY_RESPONSE`; normal-network location search remains to be checked.

No real payment, authenticated production consultant, production push delivery, customer backup, deployment, or external accuracy crosscheck was run. Native Safari/PWA behavior, accessibility, and device performance are not certified by these checks.

## 7. Confirmed limitations and pending decisions

1. **Early-January month pillar bug remains.** Reproduced `1990-01-02 12:00, longitude 120`: the calculator gives 丁丑, while PM_03 documents 丙子. `getSolarMonthIndex()` starts at zero and has no previous-December fallback before the current year's first term. The six golden fixtures do not cover this boundary. Follow DEV_04 for a separately scoped accuracy fix and regression case; no engine change was made here.
2. **Bundle size needs an explicit follow-up.** The measured 1,599.09 kB main chunk exceeds DEV_03's older 864 kB baseline and its 1 MB flag. A successful build is not a performance pass. Do not conceal this by raising a warning threshold.
3. **Some normative-looking documentation is stale.** DEV_01 still describes solar-time/month-stem formulas fixed in July; these are separate from the January boundary bug above. INF_01 contains planning-era statements despite implemented workers. Old engine examples, teaching flow, and Design Library pages can disagree with current rulings/code. Reconcile against dated decisions before implementing from them.
4. **Time precision has product consequences.** Unknown/window hours use a representative time for calculation while some hour readings are hidden. The calculator's longitude correction is not a complete IANA timezone/DST normalization system. Avoid promising fully accurate worldwide or unknown-hour readings without the appropriate accuracy work.
5. **Production readiness is still a separate workstream.** PM_02/INF_01 carry consultant release controls, console budget configuration, dev-site access hardening, legal/Self-Report review, OAuth branding, and later subscription/native work. These are repository-recorded items; external account state was not verified in this study.

Keep primary-machine automation on its established machine. Customer backups are deliberately disabled pending real users; do not revive them or duplicate scheduled jobs as an onboarding cleanup. The local bug ledger, richer machine memory, and external art vault are not all versioned here.

## 8. Coverage and next-session use

The study included the current Memory and document roots, source hierarchy and classical framing, product/voice/schema rules, design references and actual rendered screens, engine and selection paths, routing/state, adjacent product features, workers/migrations, deployment configuration, and QA tools. It read all ten current identity sets and all pool labels, with detailed tracing of representative Geng/Xin, pair, function-ledger, position, and pattern content.

The 240-file station and 900-passage ledger were inventoried and checked mechanically. This was not a line-by-line editorial proof of every passage, archived document, generated twin, or historical experiment. Classical citations were studied as the repo presents them, not independently revalidated from external editions.

For the next task:

1. Refresh `main`, read the newest Memory handoff, and inspect changes since this reviewed head.
2. Follow the relevant source pointers and current owner rulings; distinguish canonical content, candidate output, legacy data, and generated copies.
3. Trace the requested change from its authoring/configuration source through assembly to the affected screen or service.
4. Run checks that address the actual change, record material limitations, and add a new handoff when the working state changes.

This file makes the study reusable across sessions. It does not replace task-specific reading or imply that conversational context is permanent.
