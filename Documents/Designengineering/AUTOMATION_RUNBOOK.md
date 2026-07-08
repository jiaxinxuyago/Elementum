# AUTOMATION_RUNBOOK — Elementum agent routines & guards

**What this is:** the single inventory of every automated routine, guard, and
delivery channel protecting Elementum — what runs when, where each piece lives,
and how to rebuild the machine-local half on a new workstation. Built
2026-07-07; review standard = `CODE_REVIEW_STANDARDS.md`.

**The design in one line:** deterministic scripts detect (zero tokens) →
scheduled agents triage and narrate (tokens only when something's red) →
findings reach the owner by email/push/sentinel → fixes happen with the owner
in the loop. Agents find; humans+sessions fix.

---

## §1 Inventory (7 pieces)

| # | Routine | Trigger | Kind | Committed half | Machine-local half |
|---|---------|---------|------|----------------|--------------------|
| 1 | **Route-sweep QA agent** (`qa-sweep`) | On demand: "run the QA sweep" | Claude subagent | `.claude/agents/qa-sweep.md` + `Elementum_App/tools/qa-route-sweep.mjs` | — |
| 2 | **Engine regression guard** | Every Edit/Write under `src/engine/` | PostToolUse hook | `tools/hook-engine-guard.mjs`, `tools/qa-engine-regression.mjs`, golden `tools/qa-golden/engine-accuracy.json`, shared cases `tools/qa-cases.mjs` | Hook JSON in `.claude/settings.local.json` (§3.2) |
| 3 | **Live sync + deploy smoke check** | Every Claude-session Stop | Stop hook → script | `tools/sync-live.ps1` (fingerprint-gated build+deploy+smoke; failure sentinel `DEPLOY_SMOKE_FAILED.md`) | Hook JSON in `.claude/settings.local.json` (§3.2) |
| 4 | **Daily QA detector** | 1:57 PM daily (PC on) | Windows Task Scheduler → script | `tools/daily-qa-routine.ps1` (engine regression + route sweep + live health + git hygiene; sentinel `DAILY_QA_FAILED.md`; emails on failure) | schtasks registration (§3.3) |
| 5 | **Daily QA triage agent** | ~2:32 PM daily (Claude app open; catches up on launch) | Scheduled Claude agent | Prompt copy: `tools/routines/daily-qa-triage.prompt.md` | Live task: `~/.claude/scheduled-tasks/elementum-daily-qa-triage/` |
| 6 | **Daily code-review agent** | ~3:14 PM daily (same) | Scheduled Claude agent | Prompt copy: `tools/routines/daily-code-review.prompt.md`; standard: `Documents/Designengineering/CODE_REVIEW_STANDARDS.md`; state: `tools/qa-output/code-review/last-reviewed.txt` (gitignored) | Live task: `~/.claude/scheduled-tasks/elementum-daily-code-review/` |
| 7 | **Email report channel** | Called by #4/#5/#6/#8 | Worker endpoint | `workers/push/index.js` `POST /report` (secret-gated, sends `qa@elementum.life` → owner only; free verified-destination path) | `ELEMENTUM_REPORT_KEY` user env var (§3.4) |
| 8 | **Fix-dispatch manager + bug-lifecycle ledger** | ~4:01 PM daily (closure pass runs even on clean days) | Scheduled Claude agent → parallel fixer subagents | Prompt copy: `tools/routines/fix-dispatch.prompt.md`; lifecycle ledger `tools/qa-output/fix-dispatch/journal.md` (gitignored; finding ↔ branch ↔ OPEN/FIX-READY/CLOSED/REOPENED/REPORT-ONLY) | Live task: `~/.claude/scheduled-tasks/elementum-fix-dispatch/` |

Related but product infra, not QA automation: the push worker's **hourly cron**
(daily reminders; doubles as the Supabase free-tier keep-alive) and the
**stripe-webhook** / **llm** workers (DOC10 §4.2/§4.3).

## §2 A normal day

- **1:57 PM** — detector runs all four check groups. Clean: report file only
  (`tools/qa-output/daily-routine/latest.md`). Findings: email + desktop
  balloon + `DAILY_QA_FAILED.md` sentinel (any sentinel at the project root
  surfaces in the next session's branch-hygiene preflight).
- **~2:32 PM** — triage agent reads the report, verifies suspects against
  screenshots, writes + emails the plain-English digest
  (`tools/qa-output/daily-routine/digest.md`, newest-first journal).
- **~3:14 PM** — code-review agent reviews `lastSHA..origin/main` against
  CODE_REVIEW_STANDARDS (depth scales with diff size; findings must cite
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
| Bug lifecycle | ~4:01 PM, whenever the ledger has activity | `Elementum bugs — X closed · Y fix-ready · Z awaiting merge` (sections: ✅ Closed · ⚠ Reopened · 🆕 Fix-ready w/ merge commands · ⏳ Awaiting merge w/ age · 📋 Report-only) |

Volume: one email on a quiet day (the digest); up to five on the worst day.
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

**3.3 Daily detector** —
`schtasks /Create /F /SC DAILY /ST 13:57 /TN "Elementum Daily QA" /TR "powershell -NoProfile -ExecutionPolicy Bypass -File <abs>\Elementum_App\tools\daily-qa-routine.ps1"`

**3.4 Report key** — generate a fresh 64-char key; store BOTH sides:
`setx ELEMENTUM_REPORT_KEY <key>` and
`npx wrangler secret bulk <json-file> --config workers/push/wrangler.jsonc`
(JSON `{"REPORT_KEY":"<key>"}`; then redeploy the push worker). Never commit it.

**3.5 Scheduled agents** — recreate the three routines from the committed
prompt copies in `Elementum_App/tools/routines/` (daily: triage ~14:27, code
review ~15:07, fix dispatch ~15:52 local; the scheduler adds jitter). After
creating, click **Run now** once on each to pre-approve their tools. If a
prompt is edited later, update BOTH the live task and the repo copy — the repo
copy is the durable source.

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
- This runbook is the inventory of record: adding/retiring a routine, changing
  a schedule, or changing the email suite edits this file in the same
  change-set (CODE_REVIEW_STANDARDS §4-A10 pairing rule). Routine prompts are
  dual-homed: live task + `tools/routines/*.prompt.md` — edits update both.
