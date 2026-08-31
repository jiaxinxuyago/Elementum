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

## BAND — the band-tier content campaign (scoped 2026-08-05 · construct ratified, REA_16 §6 / REA_03 §3)

Principle (law): *what you are* = band-invariant · *how it's running* = band-varying. All blocks author under REA_16 v2.0 (four-layer prompt), land station-first, and gate on both audits + the swap test + an open-band read-through (every line must be true for the underfueled reader). Owner rules each corpus per the variable-review law.

### BAND-B · Gifts & Shadows tagged pools — ✅ COMPLETE (owner-locked 2026-08-13)
100 items live (5+5 × 10 stems), station `{phrase, dim, desc, bands}` → code `{phrase, desc, bands}` → `selectPoolByBand` ×3 → P4 panel + d12 detail; ore ×3 retired all stems; registry rows locked; both audits green; band selection browser-verified (庚/癸 concentrated). Ruling record: REA_16 §6 2026-08-13.

### BAND-A · yourNature ×30 — ✅ COMPLETE (owner-locked 2026-08-13; R4 core closed)
×30 band variants live end-to-end: station `STEM_BAND/*.json` `yourNature_desc` → `stemVariants.js` band keys (庚 ×15 compounds retired) → `resolveDayMasterReading.nature` band-resolves on P4 (baseline = fallback); registry rows locked (31 enforced); both audits green; 庚 concentrated verified in browser + all three bands in node. **R4 riders RULED same day (owner):** J4 sub-screen DELETED (dead code + `buildDmCards`; `tpl_dm_prescription` template kept station-side, unsurfaced) · `inscription` home = `dm_claims` claim 1 (locked corpus surfaces when the dm_claims block ships).

### BAND-C · self_card ×30 — ✅ COMPLETE (owner-locked 2026-08-14) · **BAND CAMPAIGN CLOSED (B+A+C all shipped)**
Slot RULED = the self energy card: renders ONLY on the core element's screen (`buildElementScreen` `isCore` → `STEM_VARIANTS[stem_band].selfCard`), between the core-state card and "What it means". ×30 authored fresh (face = the state named in the element arena · presence = being that state, open band dignified), station `STEM_BAND/*.json` `self_card` → `stemVariants.js` `selfCard` → journey element screen; registry row locked (32 enforced); audits green; verified in browser (庚 concentrated Metal shows the card, wood does not).

## K2 — the ELEMENT_GOD depth campaign (construct ruled 2026-08-19; REA_16 §6)

Cell = `k2_overview` (40–70w) + `k2_functional` ×5 (Mind/Expression/Bonds/Action/Body, ≤22w) + `k2_domain_readings` (per `GOD.domains`, 18–55w, Seeker-gated). Grain ELEMENT_GOD ×50; K2 register (god cost × element arena); station-first; gates = both audits + humanize + owner review per the variable law.

### K2-A · Template cell — ✅ 土_偏印 authored + locked (the corpus template)
### K2-B · Batch ×49 — ✅ COMPLETE (2026-08-19): all 50 cells station-authored → `k2.js` K2_CELLS regenerated from station; persona-led throughout (TG_PERSONA canonical: 伤官 Virtuoso · 正官 Magistrate · 正印 Sage now named in-body); registry rows locked at 40–70w / ≤22w / 18–55w; both audits green (5 voice tells caught + fixed pre-lock); interim `mean_line` RETIRED; verified on the exemplar's five element pages incl. Seeker gating
### K2-C · The POSITION axis — ✅ COMPLETE: corpus LOCKED ×70 + gates re-ruled LITERAL (Year/Month/Day/Hour Gate) + engine surfacing live (`resolvePositions`; FULL readings = energy-card seats accordion, P5 = index only)
### K2-D · Two-tier homes — ✅ RE-RULED + COMPLETE (owner "merge and retire", 2026-08-19): the journey element sub-screen IS the one full home; the app-energy faces page RETIRED (ReadingFacesScreen + ReadingEnergyCard deleted, route/DevBar/dev-hooks swept, "Full reading" CTA removed — the depth gradient no longer inverts into stale v2.1 content). Its polarity split folded in: 1–2 engine faces per element render as a face switcher in "How it moves in you", each face reading its own depth cell (verified: exemplar Metal = Twin 67% / Rival 33%, whole stack switches; Seeker gating per face). PERSONA_READING module KEPT (consultant payload source). qa-journey-sweep rewritten to the dot-card journey (16/16)

## EP — the element-page restructure (owner feedback + rulings ×4, 2026-08-19; REA_03 ELEMENT_PAIR row)

Owner's diagnosis: the yin/yang face split introduced complexity at arrival. New ladder: **1 Mechanism** (law + verdict + bridge consolidated — the 生/克 reaction, visual-first) → **2 Function** (seat noun as system function, REA_02 §5f map, no god split) → **3 Ruling Domains** (the gods' home + seats + Seeker readings; THE most important section). Content first, UI after.

### EP-A · ELEMENT_PAIR template cell — ✅ 金_水 approved + locked (owner 2026-08-19); §5f seat→function map LOCKED with it
### EP-B · Batch ×24 — ✅ COMPLETE (2026-08-19): all 25 pairs station-authored to the template (20 relation pairs w/ exact §5d equations + image lines; 5 core self-pairs = reinforcement mechanism w/ core-catalyst/core-excess turns); guards held budgets, seat nouns, image lines, shadow nouns, §5f primary/dip keys; registry rows locked ceiling-only (single-range cell law), audits green
### EP-C · Section 3 restructure — ✅ COMPLETE (2026-08-19): Ruling Domains = the gods' home — per present face a sub-block (persona head + share % + domain chips + ITS OWN seats accordion + Seeker domain readings); god overviews/functionals off-page (kept in k2.js as ore); one gate line per card on free
### EP-D · UI pass — ✅ COMPLETE (2026-08-19): the new ladder LIVE — section 1 mechanism (capsule equation graphic reusing the dot card's wd-* DNA via the wp-dotcard scope token: capsules + 生/克 link + eq caption; core = capsule + 主 + seal; base + role-resolved turn w/ colored label) · section 2 functions (five chips w/ §5f primary lit + body + dip rows) · section 3 domains; `pairs.js` station-regenerated + seeder ELEMENT_PAIR section + _ORDER patched (226 files in sync); face switcher retired from arrival; qa-journey-sweep re-anchored to .el-mecheq (16/16); verified all five exemplar pages free+Seeker at mobile, tail clears the bar

### EP-J · Curation v6 — ✅ COMPLETE (owner ×3, 2026-08-19): domains card leads with the NAMED POSITIONS (term + 汉字 + "rules {domains}" second line); every card = ONE quoted teaser line (mech: turn opening; fn: body opening; dom: lead seat's defline + "And {n} more seats besides"); SEAT_TEASE + dips line retired; tpl_section_teasers → one-line patterns. Sweep 16/16
### EP-I · Curation v5 — ✅ COMPLETE (owner ×2, 2026-08-19): domain rows tag their source gate ("CAREER · from the Month Gate", serial-comma multi-gate); DOMAIN_DEF ×8 retired same-day (wording kept in REA_02 §5e for the Codex). Sweep 16/16
### EP-H · Curation v4 — ✅ COMPLETE (owner ×2, 2026-08-19): function shows the primary ONLY (spectrum retired); domains = written rows per canonical domain (DOMAIN_DEF ×8 new vocabulary: positions.js + tpl_domain_deflines station + REA_02 §5e) on teaser + detail top, closing seat-count hook. Sweep 16/16
### EP-G · Curation v3, de-clutter — ✅ COMPLETE (owner feedback 2026-08-19): function pills → fixed spectrum line (primary underlined, not tabs); domains teaser = PLAIN canonical domains only (chips + one sentence, zero god vocabulary); domains detail re-ordered canonical chips → seats (Position first) → WHO RUNS IT (gods as the supplementary layer after positions); elCanon derived from the seats' declared domains. Sweep 16/16
### EP-F · Curation v2, teaser sentences — ✅ COMPLETE (owner rulings ×2, 2026-08-19): each card ends on 1–2 derived teaser sentences replacing the verdict stamp (mech: seat-consequence clause + the pair turn's opening quoted; fn: body first sentence + dips line; dom: counted gods lead above the intros); tpl_section_teasers (TEMPLATED) = the clause home (station + seeder + SEAT_TEASE in journeyData); ×15 verified on the exemplar, sweep 16/16
### EP-E · Curation pass — ✅ COMPLETE (owner rulings ×4, 2026-08-19): element page = TEASER INDEX (claim titles Set A + derived verdicts from locked vocabulary + section visuals) → each opens an elsec detail sub-screen; Domains teaser speaks the gods first (persona + 汉字 + §2 defline + chips, TG_DEFLINE rehomed to tgNames.js); GATING: mechanism + function free in full, Domains detail = the Seeker flagship (god intros/chips/seat names/deflines free; domain readings + full position readings gated). Sweep 16/16; audits green

## POS-T — the position teaser corpus (owner rulings ×3, 2026-08-19; register REA_16 §2c `POSITION.teaser`, research REA_04 §9)

Therapist/psychic register: analytical personality truth + ONE tendency-framed predictive beat, ≤30w, drawn from classical palace×god reasoning (REA_04 §9.4 formula).

### POS-T-A · Template ×7 — ✅ APPROVED + LOCKED (owner 2026-08-19)
### POS-T-B · Batch ×63 — ✅ COMPLETE (2026-08-19): corpus ×70 locked (positions.js + station synced ×70); registry row locked; enforcement negative-tested; verified on 庚 + 甲 charts; sweep 16/16
### POS-T-C · Full-reading expansion — ✅ COMPLETE (owner 2026-08-19: template approved → batch ×63): reading v2 corpus LOCKED ×70 (§9.5 ladder, 80–115w, registry locked) + SET-PIECES LIVE ×5 (chart-aware: 庚 fires 比劫夺财/枭神夺食, 甲 fires 杀印相生). **POS-T CLOSED END TO END.** Role turns deferred to the 大运 surface (REA_04 §9.5 note)

## POS-D — per-domain paragraphs + the TG_PATTERN axis (owner feedback ×3, 2026-08-19; REA_02 §5g + REA_04 §9)

### POS-D-A · Constructs LIVE (2026-08-19): POSITION.domain_readings (per declared domain, 35–60w, seat panel after the summary) + TG_PATTERN axis ×9 (line + full reading 70–100w + fused_line; conditional trigger over resolved positions, FUSED tier for same-pillar, one per seat by canon priority) — station + seeder + resolver + view wired
### POS-D-B · TEMPLATE review — domain paragraphs ×16 (the exemplar's 7 seats) + the pattern canon ×9 AWAITING OWNER LOCK → then batch domain paragraphs ×63 seats (~156 ¶)
### POS-D-C · Canon expansion candidates (owner-ruled later): 财坏印 · 财滋杀 · 群比争财 tiers · pattern surfacing beyond seat panels (P5? Codex chapter)

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
| HK-1 | ✅ **DONE 2026-07-09** — see completed log; residual = HK-9 (GCS third copy, owner console steps) |
| HK-9 | **GCS third copy — ⏸ DEFERRED 2026-07-09 (owner call: org-policy friction > marginal value; two-copy system suffices at this scale).** Infra 80% built and parked FREE ($0.00, empty bucket): project `elementum-backups` + billing + bucket `elementum-userbackups-07092026` (us-east1, Standard, uniform, public-prevention ON) + 30-day delete lifecycle + `backup-writer` SA with Object-Creator-on-bucket-only. **Blocked at credential issuance:** the account's auto-created Google org enforces secure-by-default policies (`iam.disableServiceAccountKeyCreation`; HMAC creation also greyed). **Unblock recipe (if ever resumed):** org-level IAM (project picker → 🏢 building icon → IAM) → grant self **Organization Policy Administrator** → switch to `elementum-backups` → Organization Policies → "Disable service account key creation" → Override parent's policy → Enforcement Off → then SA → Keys → Add JSON key → save to `C:/Users/NOBOD/.elementum/gcs-backup-key.json` → script auto-activates next run, zero code changes (upload code is DONE and shipped, incl. timestamped object names for the create-only key). |
| HK-2 | Account hygiene: add company email to Supabase org + Google Cloud IAM (per the ownership map's dual-identity pattern) |
| HK-3 | Anthropic console: workspace spend limit for the elementum-llm key (console-enforced cap independent of the worker kill-switch) |
| HK-4 | One-time check: elementum.life auto-renew enabled in Cloudflare Registrar |
| HK-5 | Deferred code items: App.jsx size split (846 ln) · ~20 unused engine exports · push-worker per-sub JWT reuse · batchGenerate .js→.mjs |
| HK-6 | `DEV_05` Tier-D deferred backlog: reuse extraction (BackBar/SectionCard/PigmentBadge + hooks) + 3 strict-lint react-hooks items |
| HK-7 | Design-system owner rulings parked for the design-library rebuild: radius scale · InkTile alpha · UpgradeModal palette · un-tokenized grays (`DES_13`) |
| HK-8 | Optional: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` (stops Windows fighting dev .ps1 tooling) |
| HK-10 | **Customer-data backup task — ⏸ FORMALLY DISABLED 2026-07-27 (owner ruling during the workflow revision; supersedes the 07-21 hibernate call).** `schtasks /Change /TN "Elementum Customer Data Backup" /DISABLE` executed; the routine no longer counts toward the daily stack and agents must NOT flag its silence. **Revive trigger = first real users onboard / before beta:** `/ENABLE` the task, flip the three power flags (`AllowStartIfOnBatteries` + `DontStopIfGoingOnBatteries` + `StartWhenAvailable` — the proven fix from the 07-27 dispatch diagnosis), run once by hand to back-fill, verify both destinations, then correct `PM_01` §3.6. Backup script `tools/backup-customer-data.mjs` stays HANDS-OFF forever. |

---

## Completed log

| Date | Task |
|---|---|
| 2026-07-09 | **HK-1 customer-data backup DEPLOYED + first snapshot verified** (3 entitlements / 3 users / 4 push subs, owner's real Founding purchase confirmed in the export): nightly 02:45 schtasks → `tools/backup-customer-data.mjs` → `D:/Elementum/Backups/` + OneDrive `Desktop/Elementum/Backups/`, rotate 30, sentinel on failure; routine #12 in `PM_01` (§3.6 rebuild). Lessons: Supabase 401s sb_secret keys from Mozilla-UA clients; dedicated `customer_backup` key per one-key-per-consumer rule. GCS third copy = HK-9 |
| 2026-07-09 | D-U-N-S number secured (14-193-9711, same-day D&B verification) — unblocked STORE-1/STORE-2 |
| 2026-07-08 | Anthropic API key rotated clean (`tools/rotate-llm-key.ps1` created); wrangler OAuth fixed on owner's PowerShell |
| 2026-07-08 | §4.3 Phase-1 gates closed: /legal AI amendment + on-device chat persistence |
