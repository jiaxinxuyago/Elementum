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
| 8 | **Fix-dispatch manager** | ~4:01 PM daily (after #6; no-op on clean days) | Scheduled Claude agent → parallel fixer subagents | Prompt copy: `tools/routines/fix-dispatch.prompt.md`; journal `tools/qa-output/fix-dispatch/` (gitignored) | Live task: `~/.claude/scheduled-tasks/elementum-fix-dispatch/` |

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
- **~4:01 PM** — fix-dispatch manager reads the day's findings. Clean day:
  one-line no-op. Findings: filters to the DISPATCHABLE class (mechanical +
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
- This runbook is the inventory of record: adding/retiring a routine edits this
  file in the same change-set (CODE_REVIEW_STANDARDS §4-A10 pairing rule).
