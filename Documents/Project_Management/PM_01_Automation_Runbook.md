# PM_01_Automation_Runbook — Elementum agent routines & guards

**What this is:** the single inventory of every automated routine, guard, and
delivery channel protecting Elementum — what runs when, where each piece lives,
and how to rebuild the machine-local half on a new workstation. Built
2026-07-07; review standard = `DEV_03_Code_Review_Standards.md`.

**The design in one line:** deterministic scripts detect (zero tokens) →
scheduled agents triage and narrate (tokens only when something's red) →
findings reach the owner by email/push/sentinel → fixes happen with the owner
in the loop. Agents find; humans+sessions fix.

---

## §1 Inventory (12 pieces)

| # | Routine | Trigger | Kind | Committed half | Machine-local half |
|---|---------|---------|------|----------------|--------------------|
| 1 | **Route-sweep QA agent** (`qa-sweep`) | On demand: "run the QA sweep" | Claude subagent | `.claude/agents/qa-sweep.md` + `Elementum_App/tools/qa-route-sweep.mjs` | — |
| 2 | **Engine regression guard** | Every Edit/Write under `src/engine/` | PostToolUse hook | `tools/hook-engine-guard.mjs`, `tools/qa-engine-regression.mjs`, golden `tools/qa-golden/engine-accuracy.json`, shared cases `tools/qa-cases.mjs` | Hook JSON in `.claude/settings.local.json` (§3.2) |
| 3 | **Live sync + deploy smoke check** | Every Claude-session Stop | Stop hook → script | `tools/sync-live.ps1` (fingerprint-gated build+deploy+smoke; failure sentinel `DEPLOY_SMOKE_FAILED.md`) | Hook JSON in `.claude/settings.local.json` (§3.2) |
| 4 | **Daily QA detector** | 1:57 PM daily (PC on) | Windows Task Scheduler → script | `tools/daily-qa-routine.ps1` (engine regression + route sweep + live health + git hygiene; sentinel `DAILY_QA_FAILED.md`; emails on failure) | schtasks registration (§3.3) |
| 5 | **Daily QA triage agent** | ~2:32 PM daily (Claude app open; catches up on launch) | Scheduled Claude agent | Prompt copy: `tools/routines/daily-qa-triage.prompt.md` | Live task: `~/.claude/scheduled-tasks/elementum-daily-qa-triage/` |
| 6 | **Daily code-review agent** | ~3:14 PM daily (same) | Scheduled Claude agent | Prompt copy: `tools/routines/daily-code-review.prompt.md`; standard: `Documents/Development/DEV_03_Code_Review_Standards.md`; state: `tools/qa-output/code-review/last-reviewed.txt` (gitignored) | Live task: `~/.claude/scheduled-tasks/elementum-daily-code-review/` |
| 7 | **Email report channel** | Called by #4/#5/#6/#8 | Worker endpoint | `workers/push/index.js` `POST /report` (secret-gated, sends `qa@elementum.life` → owner only; free verified-destination path) | `ELEMENTUM_REPORT_KEY` user env var (§3.4) |
| 8 | **Fix-dispatch manager + bug-lifecycle ledger** | ~4:01 PM daily (closure pass runs even on clean days) | Scheduled Claude agent → parallel fixer subagents | Prompt copy: `tools/routines/fix-dispatch.prompt.md`; lifecycle ledger `tools/qa-output/fix-dispatch/journal.md` (gitignored; finding ↔ branch ↔ OPEN/FIX-READY/CLOSED/REOPENED/REPORT-ONLY) | Live task: `~/.claude/scheduled-tasks/elementum-fix-dispatch/` |
| 9 | **Project Manager** (docs audit + Day Log + task report; daily, Mondays = full registry sweep) | ~4:41 PM daily | Scheduled Claude agent (playbook: .claude/agents/doc-auditor.md) | Playbook + prompt copy tools/routines/project-manager.prompt.md; journal tools/qa-output/doc-audit/ (gitignored); sanctioned write: Documents/Project_Management/PM_03_Day_Log.md (append-only) | Live task: ~/.claude/scheduled-tasks/elementum-project-manager/ |
| 10 | **Budget & spend report** (monthly) | 1st of month ~10:17 AM | Scheduled Claude agent | Prompt copy tools/routines/budget-report.prompt.md; sources: BIZ_01 backlog table; saves monthly report to Documents/Business/budget-reports/ (sanctioned write); statement reconciliation = owner-uploaded in interactive sessions (Agent-Ops brief nudges monthly) | Live task: ~/.claude/scheduled-tasks/elementum-budget-report/ |
| 11 | **Data analyst** (weekly, ⏸ HIBERNATING until post-beta) | Tuesdays ~11:14 AM — task DISABLED; wake = enable after WAE instrumentation ships (Workers Paid trigger, early Aug) | Scheduled Claude agent | Prompt copy tools/routines/analytics-report.prompt.md (locked metric definitions inside); reports to qa-output/analytics/ | Live task: ~/.claude/scheduled-tasks/elementum-analytics-report/ (enabled:false) |
| 12 | **Customer-data backup** (the money tables — PM_02 HK-1, DEPLOYED 2026-07-09) | 2:45 AM daily (PC on) | Windows Task Scheduler → windowless VBS shim → node | `tools/backup-customer-data.mjs` (exports `entitlements` + `auth.users` id↔email map + `push_subscriptions` → `D:/Elementum/Backups/` + OneDrive `Desktop/Elementum/Backups/`, rotate 30; GCS third copy auto-activates when its key file exists; failure sentinel `BACKUP_FAILED.md`, success clears it) + `tools/run-customer-backup.vbs` + `tools/setup-backup-key.ps1` | schtasks "Elementum Customer Data Backup" + `ELEMENTUM_SUPABASE_SERVICE_KEY` user env var + optional GCS key file (§3.6); log `%TEMP%\customer-backup.log` |

Related but product infra, not QA automation: the push worker's **hourly cron**
(daily reminders; doubles as the Supabase free-tier keep-alive) and the
**stripe-webhook** / **llm** workers (INF_01 §4.2/§4.3).

## §2 A normal day

- **1:57 PM** — detector runs all four check groups. Clean: report file only
  (`tools/qa-output/daily-routine/latest.md`). Findings: email + desktop
  balloon + `DAILY_QA_FAILED.md` sentinel (any sentinel at the project root
  surfaces in the next session's branch-hygiene preflight).
- **~2:32 PM** — triage agent reads the report, verifies suspects against
  screenshots, writes + emails the plain-English digest
  (`tools/qa-output/daily-routine/digest.md`, newest-first journal).
- **~3:14 PM** — code-review agent reviews `lastSHA..origin/main` against
  DEV_03_Code_Review_Standards (depth scales with diff size; findings must cite
  §-codes), journals to `tools/qa-output/code-review/journal.md`, emails the
  verdict, advances the SHA marker.
- **~4:01 PM** — fix-dispatch manager. FIRST the **closure pass** (every day):
  FIX-READY ledger entries whose `autofix/*` branch the owner merged are
  checked against today's runs — no recurrence → **CLOSED** (emailed as
  "✅ … task closed"); recurrence → **REOPENED** (email + push). Merge is not
  closure; *verified-gone* is closure. THEN new findings: filters to the
  DISPATCHABLE class (mechanical +
  CONFIRMED only — dead code, stale comments, canonical-constant dedup, lint,
  lazy/prefetch pairing, unambiguous token snaps, doc-path drift, auth-model
  comments; NEVER webhook/entitlement/auth logic, engine behavior, prices,
  golden re-blessing, or design-judgment/D15 items), groups them into
  **file-disjoint batches** (max 3/day), and launches parallel fixer agents in
  **isolated worktrees**. Each fixer must pass lint + engine regression +
  build, then pushes `autofix/<date>-<topic>` to origin. The manager verifies
  the branches and emails per-branch merge commands. **Only the owner merges
  to main** — no routine ever commits to main, touches the main checkout, or
  deploys; findings already sitting on an unmerged autofix branch are
  reminded, not re-dispatched.
- **~4:41 PM daily** (Mondays widen to the FULL registry sweep) — doc auditor verifies Documents/ against the product (daily scope: 48h-changed docs + the automation-critical trio DEV_03/PM_01/INF_01), mines pending items with ages, and writes TODAY's entry to PM_03_Day_Log.md (Done / Pending / Pivots — its one sanctioned Documents/ write, append-only). Emails the structured report daily (status + day log + discrepancies + next-up + long-overdue). Charter unchanged: (LIVING docs must track reality; RECORD docs — ledgers/audits/archives — are append-only history and are never flagged or rewritten). MECHANICAL findings (dead paths, legacy DOC# citations per the README alias table, registry sync) land in its journal as fix-dispatch candidates; JUDGMENT findings go to the owner. Emails every run.
- **Continuously** — engine guard on engine edits; deploy smoke on every
  auto-deploy; `qa-sweep` whenever asked.

## §2b Owner touchpoints — notifications and the action frontend

**The email suite** (all from `Elementum QA <qa@elementum.life>` to the owner;
subject lines are designed to be read without opening):

| Email | When | Subject convention |
|---|---|---|
| Daily digest | ~2:32 PM every day | `Elementum daily QA — CLEAN` / `— N FINDINGS` (3–6 plain sentences, technical report below a separator) |
| Instant technical alert | 1:57 PM, failure only | `Elementum daily QA — FINDINGS (N)` (raw detector report) |
| Code-review verdict | ~3:14 PM, commit-days only | `Elementum code review — CLEAN \| N findings (M commits)` (§-coded findings + ruled-out list) |
| Docs & day log | ~4:44 PM every day | `Elementum docs & day log — <CLEAN | N findings>` (status + PM_02 day entry + §1 discrepancies + §2 next-up + §3 long-overdue w/ ages) |
| Bug lifecycle | ~4:01 PM, whenever the ledger has activity | `Elementum bugs — X closed · Y fix-ready · Z awaiting merge` (sections: ✅ Closed · ⚠ Reopened · 🆕 Fix-ready w/ merge commands · ⏳ Awaiting merge w/ age · 📋 Report-only) |

Volume: two emails on a quiet day (QA digest + docs & day log); up to five on the worst day.
Voice (owner directive 2026-07-09): every email reads as an assistant reporting
to the boss — first person, direct address, leads with whether anything needs
the owner; technical facts sit under the human summary. Subject-line dashboard
convention is functional and unchanged — now prefixed with ONE severity emoji
(🚨 critical/reopened · ⚠️ needs a decision · 🟡 worth reading · ✅ clean), so
the inbox itself is a triage view; body emojis follow the fixed vocabulary
(🔧 fix-ready · ⏳ aging · 📋 FYI), one per line max, signal not decoration.
Push notifications fire only for: HIGH/CRITICAL confirmed findings, a fixer
stuck on its gates, or a REOPENED bug. Sentinel files at the project root
(`DAILY_QA_FAILED.md`, `DEPLOY_SMOKE_FAILED.md`) surface in every session's
branch-hygiene preflight as the catch-all.

**Action frontend (in preference order):**
1. **A Claude session in this project** (desktop, or phone via claude.ai
   remote with the PC on) — "merge today's autofix branches" does
   verify → merge → push → Stop-hook deploy + smoke in one motion. Also the
   surface for "run the QA sweep", D15 rulings, and triage questions.
2. **Raw git** — every lifecycle email carries exact
   `git merge origin/autofix/...` commands; finish with a session (or manual
   `sync-live.ps1`) so the deploy fires.
3. **GitHub web** — fine for reviewing branch diffs from any device.
   ⚠ A GitHub-only merge updates origin but NOT the local tree — **the live
   site deploys from the local working tree**, so nothing ships until a local
   session pulls.

## §2c Journey QA — the interaction layer (DEPLOYED 2026-07-09)

The route sweep renders destination states; it performs NO user interactions.
The journey layer closes that gap: `tools/qa-journey-sweep.mjs` (16 steps,
~25 s, verified 5 consecutive green runs at deployment; wheel drags use
small-step pointer moves with a ~160 ms zero-velocity pause before release so
framer-motion's snap lands deterministically) drives the app like a user — Scenario A: full first-run onboarding via real
momentum-wheel drags (1995-04-29 18:00 Beijing male) asserting the persisted
chart equals the golden pillars 乙亥/庚辰/庚寅/乙酉 (cross-validates the
engine fixtures through the UI); Scenario B: reveal swipe-dissolve →
catalogue → energy-card carousel swipes (active card must change per swipe) →
Day Master → Pillar Chart → all 5 tabs → all 4 Today drill-downs.

Integration (all executed 2026-07-09):
1. Daily detector check **#2b** — same report/sentinel/email as the render
   sweep; "ALL CLEAN" now means renders AND journeys. ✔
2. `qa-sweep` agent playbook — runs+triages both sweeps; journey gesture
   failures get one full-suite retry before counting (assertion failures
   count on first occurrence). ✔
3. Triage-agent digest wording covers journeys (live task + repo prompt
   copy). ✔
4. DEV_03_Code_Review_Standards **§2-C7**: interaction-affecting changes must keep
   the journey suite green. ✔
5. **Deliberately excluded:** the deploy smoke check does NOT gate on
   journeys — availability-only. Gesture tests must prove a flake-free week
   in production before any deploy-gating is reconsidered (green must stay
   trustworthy). Owner decision 2026-07-09.

Coverage pyramid after integration: engine (golden fixtures) → renders
(route sweep) → journeys (this layer) → live health (probes) — with the
purchase-flow smoke test remaining the known gap (parked; build when
payments are next touched).

## §3 New-machine rebuild (the machine-local half)

Everything committed arrives with `git clone`. Recreate these five:

**3.1 Prereqs** — `npm ci` in Elementum_App; `npx wrangler login`
(personal-account owner per the infra ownership map); Playwright chromium if
prompted (`npx playwright install chromium`).

**3.2 Claude hooks** — in project `.claude/settings.local.json`:
- Stop hook → `powershell` command `& '<abs>\Elementum_App\tools\sync-live.ps1'`,
  `timeout 900`, `async true`.
- PostToolUse hook → matcher `Edit|Write`, command
  `node "<abs>/Elementum_App/tools/hook-engine-guard.mjs"`, `timeout 60`.

**3.3 Daily detector** — the action is the **windowless VBS shim**
(`tools/run-daily-qa.vbs`, committed): interactive-session tasks open a
visible console for their action, and a mystery console gets closed by
humans, which kills the run (2026-07-08 incident, exit 0xC000013A). The shim
runs the same command with window style 0 and keeps the interactive session
(failure balloon still works). It also carries the logging redirect
(`%TEMP%\dq-task.log`) that diagnosed the incident.
```powershell
$action   = New-ScheduledTaskAction -Execute 'wscript.exe' -Argument '"<abs>\Elementum_App\tools\run-daily-qa.vbs"'
$trigger  = New-ScheduledTaskTrigger -Daily -At '13:57'
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Minutes 30)
Register-ScheduledTask -TaskName "Elementum Daily QA" -Action $action -Trigger $trigger -Settings $settings
```
(`StartWhenAvailable` back-fills a missed 1:57 when the PC comes on. S4U /
"run whether logged on or not" needs elevation — not used.)
Health check: `schtasks /Query /TN "Elementum Daily QA" /FO LIST /V` —
`Last Result` must be 0; instant-return failures → read `%TEMP%\dq-task.log`.
⚠ `.ps1` files must be UTF-8 WITH BOM (DEV_03_Code_Review_Standards §4-A9) — PS 5.1
misreads BOM-less UTF-8 as ANSI. ⚠ **Sandbox overlay:** dev-session installs
of system-path binaries (Playwright browsers) land in a virtualized overlay
INVISIBLE to OS-scheduled processes — the routine therefore installs its own
browser each run (idempotent `npx playwright install chromium` from
Elementum_App/, real filesystem).

**3.4 Report key** — generate a fresh 64-char key; store BOTH sides:
`setx ELEMENTUM_REPORT_KEY <key>` and
`npx wrangler secret bulk <json-file> --config workers/push/wrangler.jsonc`
(JSON `{"REPORT_KEY":"<key>"}`; then redeploy the push worker). Never commit it.

**3.5 Scheduled agents** — recreate the four routines from the committed
prompt copies in `Elementum_App/tools/routines/` (daily: triage ~14:27, code
review ~15:07, fix dispatch ~15:52 local; daily doc audit ~16:41 (Mondays full sweep); the scheduler adds jitter). After
creating, click **Run now** once on each to pre-approve their tools. If a
prompt is edited later, update BOTH the live task and the repo copy — the repo
copy is the durable source.

**3.6 Customer-data backup** (routine #12) — three pieces:
- **Supabase key:** dashboard → API Keys → New secret key named
  `customer_backup` (dedicated key per consumer — never reuse
  `stripe_webhook`/`default`; REVEAL with the eye icon before copying), then
  `powershell -ExecutionPolicy Bypass -File tools/setup-backup-key.ps1`
  (hidden prompt → validates → saves the `ELEMENTUM_SUPABASE_SERVICE_KEY` user
  env var). ⚠ Supabase **401s secret keys sent by browser-looking clients** —
  any script touching sb_secret keys must send a non-Mozilla `User-Agent`
  (both backup tools do; PowerShell's default UA is Mozilla/5.0).
- **Schedule:** `schtasks /Create /TN "Elementum Customer Data Backup" /TR
  'wscript.exe "<abs>\Elementum_App\tools\run-customer-backup.vbs"' /SC DAILY /ST 02:45`
  (windowless shim per §3.3; log `%TEMP%\customer-backup.log`).
- **GCS third copy (optional; ~10 min of console):** GCP project
  `elementum-backups` (SEPARATE project — the OAuth project stays
  billing-free by design, BIZ_01) + billing + **$1 budget alert** → bucket
  `elementum-backups-141939711` (us-east1, Standard, uniform access,
  public-access prevention ON) + Lifecycle rule "Delete, age 30+ days" →
  service account `backup-writer` with **Storage Object Creator on the bucket
  only** (create-only: a leaked key can add snapshots, never read/delete) →
  JSON key saved to `C:/Users/NOBOD/.elementum/gcs-backup-key.json`. The
  script auto-activates the third copy when that file appears. Cost: $0.00
  (always-free tier; usage ≈1% of every limit).

## §4 Standing rules

- Every agent routine is **read-only** toward app code. Writable exceptions are
  named per routine (QA output dirs, the two journals, the review SHA marker).
- Golden re-blessing (`qa-engine-regression.mjs --update`) and radius/token
  rulings are owner-only actions — no routine may perform them.
- "Silence is green": no email/notification on clean runs except the daily
  digest; sentinels are self-describing and deleted after triage.
- Bug-lifecycle law: a finding is CLOSED only when its merged fix is verified
  absent in a subsequent full run — the dispatch manager is the sole authority
  over the ledger, and a REOPENED finding outranks new work.
- Scheduled jobs never depend on anything installed from an interactive
  session: dev-session sandboxes virtualize system-path writes into an
  overlay the scheduler can't see (2026-07-08 incident). A routine installs
  its own binaries, idempotently, in its own context.
- OS-scheduled actions must be windowless (VBS shim pattern) — a visible
  console invites a human to close it mid-run.
- This runbook is the inventory of record: adding/retiring a routine, changing
  a schedule, or changing the email suite edits this file in the same
  change-set (DEV_03_Code_Review_Standards §4-A10 pairing rule). Routine prompts are
  dual-homed: live task + `tools/routines/*.prompt.md` — edits update both.
