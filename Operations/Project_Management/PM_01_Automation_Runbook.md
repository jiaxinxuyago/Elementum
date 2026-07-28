# PM_01_Automation_Runbook — Elementum agent routines & guards

**What this is:** the single inventory of every automated routine, guard, and
delivery channel protecting Elementum — what runs when, where each piece lives,
and how to rebuild the machine-local half on a new workstation. Built
2026-07-07; review standard = `DEV_03_Code_Review_Standards.md`.

**The design in one line (REVISED 2026-07-27, owner-directed):** one morning
QA pipeline finds, dispatches, and lands fixes autonomously (merges gated by
`tools/merge-fix-branches.mjs` — the ONE audited path to main) → EOD reviewers
run ONLY when there were edits → the owner gets at most one email per
discipline per day, weekdays only, zero permission prompts. Agents find AND
fix; the owner reads email and rules on judgment calls.

---

## §1 Inventory (12 pieces)

| # | Routine | Trigger | Kind | Committed half | Machine-local half |
|---|---------|---------|------|----------------|--------------------|
| 1 | **Route-sweep QA agent** (`qa-sweep`) | On demand: "run the QA sweep" | Claude subagent | `.claude/agents/qa-sweep.md` + `Elementum_App/tools/qa-route-sweep.mjs` | — |
| 2 | **Engine regression guard** | Every Edit/Write under `src/engine/` | PostToolUse hook | `tools/hook-engine-guard.mjs`, `tools/qa-engine-regression.mjs`, golden `tools/qa-golden/engine-accuracy.json`, shared cases `tools/qa-cases.mjs` | Hook JSON in `.claude/settings.local.json` (§3.2) |
| 3 | **Live sync + deploy smoke check** | Every Claude-session Stop | Stop hook → script | `tools/sync-live.ps1` (fingerprint-gated build+deploy+smoke; failure sentinel `DEPLOY_SMOKE_FAILED.md`) | Hook JSON in `.claude/settings.local.json` (§3.2) |
| 4 | **QA fallback detector** | 10:30 AM Mon–Fri (PC on) | Windows Task Scheduler → script | `tools/daily-qa-routine.ps1` — dead-man switch: exits SILENTLY when #5 journaled today; otherwise runs the full deterministic stack itself and sends the day's QA email (clean or not) | schtasks registration (§3.3) |
| 5 | **Morning QA pipeline** (`elementum-daily-qa`) | ~9:00 AM Mon–Fri (Claude app open; catches up on launch) | Scheduled Claude agent → fixer subagents → guarded merge | Prompt copy: `tools/routines/daily-qa.prompt.md`; merge gate `tools/merge-fix-branches.mjs`; digest `tools/qa-output/daily-routine/digest.md`; ledger `tools/qa-output/fix-dispatch/journal.md` | Live task: `~/.claude/scheduled-tasks/elementum-daily-qa/` |
| 6 | **EOD code-review agent** | ~11:30 PM Mon–Fri, ONLY on days with code commits | Scheduled Claude agent → fixer subagents → guarded merge | Prompt copy: `tools/routines/daily-code-review.prompt.md`; standard: `Operations/Development/DEV_03_Code_Review_Standards.md` | Live task: `~/.claude/scheduled-tasks/elementum-daily-code-review/` |
| 7 | **Email report channel** | Called by #4/#5/#6/#8/#9/#10/#11 | Worker endpoint | `workers/push/index.js` `POST /report` (secret-gated, sends `qa@elementum.life` → company inbox lanterndigitalhodl@gmail.com (switched 2026-07-13; personal gmail = verified fallback) only; free verified-destination path) | `ELEMENTUM_REPORT_KEY` user env var (§3.4) |
| 8 | **Guarded merge gate** (retired the 4:01 fix-dispatch routine 2026-07-27 — dispatch now lives inside #5/#6/#9) | Invoked by #5/#6/#9 after fixers pass gates | Node script (the ONE path to main) | `tools/merge-fix-branches.mjs` — autofix/*-only, clean+synced-main precondition, conflict abort, re-gates (eslint + engine regression + build), hard rollback on failure, push (auto-deploys via GitHub Actions), branch retirement. Ledger stays `tools/qa-output/fix-dispatch/journal.md` (Name/Priority/Description/Category; OPEN→FIX-READY→CLOSED/REOPENED/BACKLOG/REPORT-ONLY) | — |
| 9 | **EOD Project Manager** (Day Log always on landed days; docs audit + email ONLY on doc-edit days, incl. Reading data; Mondays = full registry sweep) | ~11:45 PM Mon–Fri | Scheduled Claude agent (playbook: .claude/agents/doc-auditor.md) | Playbook + prompt copy tools/routines/project-manager.prompt.md; journal tools/qa-output/doc-audit/ (gitignored); sanctioned write: Operations/Project_Management/PM_03_Day_Log.md (append-only) | Live task: ~/.claude/scheduled-tasks/elementum-project-manager/ |
| 10 | **Budget & spend report** (monthly) | 1st of month ~10:17 AM | Scheduled Claude agent | Prompt copy tools/routines/budget-report.prompt.md; sources: BIZ_01 backlog table; saves monthly report to Operations/Business/budget-reports/ (sanctioned write); statement reconciliation = owner-uploaded in interactive sessions (Agent-Ops brief nudges monthly) | Live task: ~/.claude/scheduled-tasks/elementum-budget-report/ |
| 11 | **Data analyst** (weekly, ⏸ HIBERNATING until post-beta) | Tuesdays ~11:14 AM — task DISABLED; wake = enable after WAE instrumentation ships (Workers Paid trigger, early Aug) | Scheduled Claude agent | Prompt copy tools/routines/analytics-report.prompt.md (locked metric definitions inside); reports to qa-output/analytics/ | Live task: ~/.claude/scheduled-tasks/elementum-analytics-report/ (enabled:false) |
| 12 | **Customer-data backup** (the money tables — PM_02 HK-1; ⏸ **DISABLED 2026-07-27, owner directive: re-enable at customer onboarding via `schtasks /Change /TN "Elementum Customer Data Backup" /ENABLE`**) | was 2:45 AM daily (PC on) | Windows Task Scheduler → windowless VBS shim → node | `tools/backup-customer-data.mjs` (exports `entitlements` + `auth.users` id↔email map + `push_subscriptions` → `D:/Elementum/Backups/customer-data/` + OneDrive `Desktop/Elementum/Backups/customer-data/`, rotate 30; GCS third copy auto-activates when its key file exists; failure sentinel `BACKUP_FAILED.md`, success clears it) + `tools/run-customer-backup.vbs` + `tools/setup-backup-key.ps1` | schtasks "Elementum Customer Data Backup" + `ELEMENTUM_SUPABASE_SERVICE_KEY` user env var + optional GCS key file (§3.6); log `%TEMP%\customer-backup.log` |

Related but product infra, not QA automation: the push worker's **hourly cron**
(daily reminders; doubles as the Supabase free-tier keep-alive) and the
**stripe-webhook** / **llm** workers (INF_01 §4.2/§4.3).

## §2 A normal day (REVISED 2026-07-27 — weekdays only, no weekend routines)

- **~9:00 AM — the morning QA pipeline** (`elementum-daily-qa`, autopilot, no
  permission prompts by law). Runs the full stack itself (engine regression,
  route sweep, journey sweep, live health), triages against screenshots,
  journals to `digest.md` (which silences the 10:30 fallback), and maintains
  the bug ledger (Name `BUG-YYYYMMDD-n` · Priority ON-FIRE/HIGH/MID/LOW ·
  Description · Category app/backend/agent-routine/server/docs). Then:
  - **Email ① — THE daily QA report, always** (clean or bug list).
  - ON-FIRE/HIGH bugs → dispatch fixers immediately. **Hard rule: parallel
    only when file sets are fully disjoint; overlapping fixes queue
    sequentially** by priority then chain of impact (engine → store →
    components → content → docs). Fixers work worktree-isolated on
    `autofix/<date>-<slug>`, pass gates, push. MID/LOW → BACKLOG (listed with
    ages in every morning email; no dispatch).
  - **Email ② `[Fixed Bug List — <Weekday>]`** — only if fixers ran.
  - Merge via `node tools/merge-fix-branches.mjs autofix/...` — the ONE path
    to main (gates + rollback + push, which auto-deploys elementum.life).
  - **Email ③ `[Fix Branches Merged — <Weekday>]`** — only if a merge pushed;
    carries the commit range (the changelist) and bugs CLOSED.
- **10:30 AM — fallback detector** (Windows task): if the 9:00 agent journaled
  today → exits silently. If not (app was closed) → runs the deterministic
  stack itself and sends the day's QA email, clean or not, subject-tagged
  "(fallback run)".
- **~11:30 PM — EOD code review**, ONLY if code commits landed today (zero
  commits = zero email, one journal line). Reviews the whole day as one
  change-set against DEV_03, auto-fixes must-fix findings through the same
  fixer + guarded-merge pipeline, proposes judgment calls to the owner.
  **One email, only on edit days.**
- **~11:45 PM — EOD project manager**: writes the PM_03 day-log entry whenever
  anything landed today; runs the doc audit + email ONLY when docs (including
  Reading/ data) were edited (Mondays widen to the full registry sweep).
  LIVING/RECORD charter unchanged; MECHANICAL doc findings may be auto-fixed
  through the same pipeline, JUDGMENT goes to the owner.
- **Continuously** — engine guard on engine edits; deploy smoke on every
  auto-deploy; `qa-sweep` whenever asked.

## §2b Owner touchpoints — notifications and the action frontend

**The email suite** (all from `Elementum QA <qa@elementum.life>` to the owner;
subject lines are designed to be read without opening):

| Email | When | Subject convention |
|---|---|---|
| Daily QA report | ~9:00 AM Mon–Fri, ALWAYS (the one guaranteed email) | `<emoji> Elementum QA — <Weekday MM-dd> — CLEAN \| N bugs` (bug list w/ Name·Priority·Description·Category + backlog w/ ages) |
| Fixed-bug list | bug days only, after fixers finish | `✅ [Fixed Bug List — <Weekday MM-dd>] <names>` |
| Merge confirmation | bug days only, after the guarded merge pushes | `🔧 [Fix Branches Merged — <Weekday MM-dd>] <sha..sha>` (bugs CLOSED + changelist range) |
| Code review | ~11:30 PM, ONLY days with code commits | `<emoji> Elementum code review — <Weekday MM-dd> — CLEAN \| N findings` |
| Docs report | ~11:45 PM, ONLY days with doc edits (incl. Reading data) | `<emoji> Elementum docs — <Weekday MM-dd> — CLEAN \| N findings` (+ PM_03 day entry verbatim) |
| Fallback QA | 10:30 AM, ONLY when the 9:00 agent never ran | `<emoji> Elementum QA — <Weekday MM-dd> — ... (fallback run)` — replaces, never duplicates, the daily QA report |

Volume law (owner directive 2026-07-27): ONE email per discipline per day.
Quiet day = exactly one (the QA report). Busy day = QA + fixed list + merged +
review + docs = five, each sent once, no repeats, no nagging re-sends.
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

**Action frontend:** merges no longer need the owner (guarded auto-merge,
2026-07-27). What still lands on the owner's desk: ⚠️-flagged judgment
findings, gate-failure rollbacks (exit 2 from the merge tool — branches left
for a human), REOPENED bugs, MID/LOW backlog pruning, and owner rulings
(D-series, golden re-blessing). Surface of choice: a Claude session in this
project ("agent status" → triage → decisions). Deploys ride BOTH GitHub
Actions (on every push to main touching the app) and the local Stop-hook
(`sync-live.ps1`) — a GitHub-side merge now DOES ship without a local pull.

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

Everything committed arrives with `git clone`. Recreate these six:

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
$trigger  = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday,Tuesday,Wednesday,Thursday,Friday -At '10:30'
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Minutes 30)
Register-ScheduledTask -TaskName "Elementum Daily QA" -Action $action -Trigger $trigger -Settings $settings
```
(`StartWhenAvailable` back-fills a missed 10:30 when the PC comes on. S4U /
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

**3.5 Scheduled agents** — recreate the five routines from the committed
prompt copies in `Elementum_App/tools/routines/` (morning QA `0 9 * * 1-5`;
EOD code review `30 23 * * 1-5`; EOD project manager `45 23 * * 1-5` (Mondays
full sweep); budget report `17 10 1 * *`; data analyst `7 11 * * 2`,
hibernating; the scheduler adds jitter). Autopilot rests on the COMMITTED
allowlist (.claude/settings.json), not per-task approvals — those reset on
every prompt edit. If a prompt is edited later, update BOTH the live task and
the repo copy — the repo copy is the durable source.

**3.6 Customer-data backup** (routine #12 — ⏸ task DISABLED 2026-07-27 per
owner; re-enable at customer onboarding with
`schtasks /Change /TN "Elementum Customer Data Backup" /ENABLE`) — three pieces:
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
- **GCS third copy (⏸ DEFERRED 2026-07-09 — blocked by the org's secure-by-default policy at credential issuance; bucket+SA built and parked free; unblock recipe in PM_02 HK-9):** GCP project
  `elementum-backups` (SEPARATE project — the OAuth project stays
  billing-free by design, BIZ_01) + billing + **$1 budget alert** → bucket
  `elementum-userbackups-07092026` (us-east1, Standard, uniform access,
  public-access prevention ON) + Lifecycle rule "Delete, age 30+ days" →
  service account `backup-writer` with **Storage Object Creator on the bucket
  only** (create-only: a leaked key can add snapshots, never read/delete) →
  JSON key saved to `C:/Users/NOBOD/.elementum/gcs-backup-key.json`. The
  script auto-activates the third copy when that file appears. Cost: $0.00
  (always-free tier; usage ≈1% of every limit).

## §4 Standing rules (REVISED 2026-07-27)

- **Weekday law:** all routines run Mon–Fri only. Weekends are silent.
- **Autopilot law:** routines NEVER prompt the owner for permission — the
  committed allowlist covers their entire surface; a step that would prompt is
  skipped and disclosed in the email.
- **One-email law:** at most one email per discipline per day (QA report /
  fixed list / merged confirmation / code review / docs). No re-sends, no
  nagging, no duplicate coverage of a standing item within the same day.
- **Merge law:** the ONLY way any agent lands anything on main is
  `tools/merge-fix-branches.mjs` (autofix/*-only, gates, rollback, push =
  auto-deploy). Raw `git merge` / `git push origin main` remain outside every
  allowlist rule. Gate failure (exit 2) = rolled back, owner's desk.
- **File-disjoint law:** parallel fixers only on fully disjoint file sets;
  overlaps queue sequentially by priority then chain of impact
  (engine → store → components → content → docs).
- Golden re-blessing (`qa-engine-regression.mjs --update`) and radius/token
  rulings are owner-only actions — no routine may perform them.
- Bug-lifecycle law: a finding is CLOSED only when its merged fix is verified
  absent in a subsequent full run; a REOPENED finding outranks new work.
  MID/LOW bugs live in BACKLOG with ages, surfaced every morning, dispatched
  only on owner word or promotion to HIGH.
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
