# PM_02 · Pending Tasks — the project task board

**Purpose:** the single place where deferred, trigger-gated, and owner-pending work is tracked so any agent (session preflights, the doc-auditor, future PM routines) can answer "what's open?" without archaeology. Status changes are edited in place; completed tasks move to the log at the bottom. Detailed runbooks stay in their home docs — entries here carry the trigger, the first step, and the pointer.

**Convention:** `[AREA]-[N]` IDs, append-only. Areas: `STORE` (app-store onboarding) · `INFRA` · `OWNER` (owner-review items) · `HK` (housekeeping/maintenance).

---

## STORE — Apple / Google Play onboarding (Phase B)

### STORE-1 · Apple Developer Program — Organization enrollment ⏳ READY, Phase-B-gated
- **State (2026-07-09):** all prerequisites DONE. **D-U-N-S secured: 14-193-9711** (record: `Documents/Legal_Admin/Lantern_Digital_DUNS_Record_2026-07-09.pdf`); entity paperwork complete (NY LLC DOS 7668771, EIN 39-3447554).
- **Trigger:** owner schedules Phase B (native bundle). Do NOT enroll early — the $99/yr membership clock starts at purchase.
- **Steps at trigger:** ① Apple ID on the Lantern Digital email + 2FA (verify done) → ② developer.apple.com/programs/enroll → Organization → legal name `Lantern Digital LLC` + D-U-N-S 14-193-9711 + elementum.life; enroller = Jiaxin Xu (sole member, has binding authority); expect possible phone verification → ③ pay $99 → ④ add ~$8.25/mo amortized line to `BIZ_01` §1/§2.
- **Known risk:** D&B's structured record shows "Corporation"/"Start Year 2026" (both wrong, documented in the Legal_Admin PDF) — if Apple's form objects to entity type, correct via D&B support first.
- **Runbook:** `INF_01` §4.2a ADDENDUM.

### STORE-2 · Google Play Console — Organization account ⏳ READY, Phase-B-gated
- Same D-U-N-S (14-193-9711), same trigger, same identity (Lantern Digital LLC). $25 one-time. Org account skips the personal-account 20-testers×14-days production gate. Evaluate the TWA (PWA-wrap) path for an Android-first ship. Runbook: `INF_01` §4.2a (Google counterpart).

### STORE-3 · Phase-B platform bundle (after STORE-1/2)
- Capacitor wrap → IAP + Play Billing with a dual-grantor store webhook (grants the same `entitlements` rows as the Stripe webhook) → APNs/FCM push migration (Web Push does NOT carry over — `INF_01` §4.4 decision 3) → Sign in with Apple (mandatory once Google sign-in ships in-store, guideline 4.8) → TestFlight → review (budget one rejection cycle; astrology-category scrutiny).

## INFRA — trigger-gated

| ID | Task | Trigger | Pointer |
|---|---|---|---|
| INFRA-1 | Phase 1 consultant rollout: `OWNER_IDS=""` + redeploy elementum-llm | After the owner's voice-polish session | `INF_01` §4.3 |
| INFRA-2 | Supabase Pro (~$25/mo) | Before beta marketing | ownership-map memory |
| INFRA-3 | Workers Paid ($5/mo) → support@ outbound email | When onboarding more customers | ownership-map memory |
| INFRA-4 | Open-model arm (Workers AI) in elementum-llm — NOT yet implemented | LLM spend nears $50/mo or 20% of revenue | `INF_01` §4.3 cost gates |
| INFRA-5 | Subscriptions + tax/merchant-of-record | Post-beta | `BIZ_01` structural note |

## OWNER — review & decisions (no deadline)

| ID | Task |
|---|---|
| OWNER-1 | Skim `/legal` (incl. the AI Consultant amendment) + the 55 Self-Report fragments (`src/content/selfReportContent.js`) |
| OWNER-2 | Decide the dangling branch `origin/claude/cloud-github-edits-1s7h92` (design mockup: merge / keep / delete) |
| OWNER-3 | Confirm the real elementum.life registration price (Cloudflare billing) → correct `BIZ_01` §1/§2 |
| OWNER-4 | WAITING-EXTERNAL: Google OAuth brand verification (Google's queue; consent screen shows supabase.co until it clears) |

## HK — housekeeping & maintenance (none urgent)

| ID | Task |
|---|---|
| HK-1 | **Entitlements backup**: periodic export of the `entitlements` table (the only server data representing money; free-tier backup guarantees are thin) — candidate for an automation routine |
| HK-2 | Account hygiene: add company email to Supabase org + Google Cloud IAM (per the ownership map's dual-identity pattern) |
| HK-3 | Anthropic console: workspace spend limit for the elementum-llm key (console-enforced cap independent of the worker kill-switch) |
| HK-4 | One-time check: elementum.life auto-renew enabled in Cloudflare Registrar |
| HK-5 | Deferred code items: App.jsx size split (846 ln) · ~20 unused engine exports · push-worker per-sub JWT reuse · batchGenerate .js→.mjs |
| HK-6 | `DEV_05` Tier-D deferred backlog: reuse extraction (BackBar/SectionCard/PigmentBadge + hooks) + 3 strict-lint react-hooks items |
| HK-7 | Design-system owner rulings parked for the design-library rebuild: radius scale · InkTile alpha · UpgradeModal palette · un-tokenized grays (`DES_13`) |
| HK-8 | Optional: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` (stops Windows fighting dev .ps1 tooling) |

---

## Completed log

| Date | Task |
|---|---|
| 2026-07-09 | D-U-N-S number secured (14-193-9711, same-day D&B verification) — unblocked STORE-1/STORE-2 |
| 2026-07-08 | Anthropic API key rotated clean (`tools/rotate-llm-key.ps1` created); wrangler OAuth fixed on owner's PowerShell |
| 2026-07-08 | §4.3 Phase-1 gates closed: /legal AI amendment + on-device chat persistence |
