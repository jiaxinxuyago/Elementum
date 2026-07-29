# DEV_03_Code_Review_Standards — Elementum

**Status:** binding for every code review — the daily automated reviewer, on-demand
`/code-review` runs, and human review alike. A finding is valid only if it names the
criterion here that it violates. A review is complete only if every section below was
consciously applied or ruled out.

**Scope:** all code under `Elementum_App/` (app + workers + tools). Docs and design
artifacts are out of scope (see DES_04/DES_13_Design_Audit_Backlog for those).

Companion docs: DEV_02 (architecture & module boundaries) · INF_01 (backend/workers) ·
DEV_04_Engine_Accuracy_QA.md (engine verification protocol) · this file governs *review*.

---

## §1 Severity taxonomy and verdict

Every finding carries exactly one severity. Severity is decided by **impact**, not by
how easy the fix is.

| Severity | Definition | Examples | Response |
|---|---|---|---|
| **CRITICAL** | Money, identity, or data can be lost/leaked; or prod is broken | secret committed to repo; webhook signature check weakened; entitlement writable from client; live site down-path | Push notification + email immediately; blocks everything |
| **HIGH** | Wrong behavior a real user will hit; or an invariant in §3–§4 broken | Tier A engine regression; amount-routing/price mismatch; unauthenticated write endpoint; boundary violation shipped | Push notification + email; fix before next feature work |
| **MEDIUM** | Wrong behavior in an edge case; structural decay; measurable perf regression | unhandled promise rejection on a user path; duplicated constant; main-chunk growth past budget | Email; fix within days |
| **LOW** | Style, clarity, or minor waste with no behavioral risk | dead branch, stale comment, needless re-render | Journal only; batch into cleanup passes |

**Verdicts:** `CLEAN` (nothing above LOW) · `N FINDINGS` (list, severity-ordered).
A reviewer may not mark CLEAN unless §2–§6 were each explicitly checked against the diff.

---

## §2 Correctness

The bar: *identify the concrete input or state under which the new code produces a wrong
result, crashes, or strands the user.* "This looks fragile" is not a finding; a failure
scenario is.

Checklist (apply to every changed function/component):

- **C1 — Edge inputs.** Null/undefined props, empty arrays, missing chart/profile data
  (the app must run anonymously and pre-onboarding — `infra/supabase.js` null-safety is the
  model), absent localStorage keys, malformed JSON from network.
- **C2 — Async discipline.** Every `await` that can reject is handled or deliberately
  allowed to propagate to an ErrorBoundary; no floating promises in workers
  (use `ctx.waitUntil`); no race between navigation and setState (unmounted updates).
- **C3 — State transitions.** New screens/flows respect the FLOW registry and back-map
  in App.jsx; conditional onboarding branches (4a/6a/7a) still reachable and returnable.
- **C4 — Engine determinism.** Engine code (src/engine/) is pure: same input → same
  output, no Date.now()/locale/DOM/network access inside. Any engine diff REQUIRES
  `node tools/qa-engine-regression.mjs` exit 0, or an owner-approved `--update` with the
  manual protocol re-run (DEV_04_Engine_Accuracy_QA.md). Tier A mismatch = HIGH, always.
- **C5 — Contract fidelity.** Fields read by consumers exist in `contract/archetypeSchema.js`;
  content realizes what the schema declares (the REA_04 cascade). A consumer reading a
  retired/renamed field renders silently wrong — that is HIGH, not LOW.
- **C6 — Reversibility of user actions.** Purchases, subscriptions, and notification
  opt-ins must handle abandon/retry/refresh mid-flow without stranding (the §4.2b
  standard: new-tab checkout + focus refresh is the reference pattern).
- **C7 — Journey integrity.** Changes touching interaction surfaces
  (onboarding steps/wheels, reveal dissolve, reading navigation, tab bar,
  drill-downs) must keep the journey suite green:
  `node tools/qa-journey-sweep.mjs` → exit 0 (16 steps; golden-pillar
  assertion included). One retry allowed for gesture steps (flake profile);
  assertion-step failures are real on first occurrence. Suite added
  2026-07-09 (runbook §2c); a diff that changes an exercised interaction
  without the suite passing: HIGH.

---

## §3 Security and the money path

Elementum takes real money. Anything under `workers/`, `src/infra/`, auth, or
entitlements gets **adversarial** review: assume a hostile caller, then prove the code
safe. Findings here start at HIGH.

Invariants (each one violated = finding at the stated severity):

- **S1 — Server truth.** Tier/entitlement state is only ever written by the
  signature-verified Stripe webhook. No client-reachable code path may write
  `entitlements` (RLS + no client write path). Violation: CRITICAL.
- **S2 — Webhook signature.** `elementum-stripe-webhook` verifies the Stripe signature
  before ANY state change; timing-safe comparison; no logging of raw secrets. Violation:
  CRITICAL.
- **S3 — Amount routing coupling.** The webhook routes products BY `amount_subtotal` (pre-discount; `amount_total` fallback — 100%-off promo codes)
  (900/699 → PRODUCTS map). Any diff touching a Stripe price, a Payment Link, or the
  PRODUCTS map must change both sides in the same change-set. One-sided change: HIGH.
- **S4 — Secrets hygiene.** No key, token, or password in the repo — worker secrets via
  `wrangler secret put`, machine secrets via user env vars. The PUBLIC exceptions are
  the Supabase publishable key and VAPID public key (by design, site.config.json).
  Anything else committed: CRITICAL, and rotate it — removal is not remediation.
- **S5 — Endpoint authentication.** Every new worker endpoint states its auth model in
  a comment and enforces it: shared-secret header (`/report` pattern), unguessable
  capability URL (push endpoint pattern), or explicitly-argued public read. An
  unauthenticated endpoint that writes or spends: CRITICAL.
- **S6 — CORS and origin.** Worker CORS stays allowlisted to `https://elementum.life`
  + localhost dev. Wildcarding an authenticated route: HIGH.
- **S7 — PII minimization.** Birth data stays on-device (INF_01 §3 split). New
  server-bound payloads carry zero birth/chart data unless the owner explicitly
  approved the expansion. Violation: HIGH.

---

## §4 Architecture and structural clarity

These encode the four cleanup rules + DEV_02 boundaries as reviewable criteria. The test
for clarity is concrete: *could a new engineer find, name, and safely change this code
without reading git history?*

- **A1 — Module boundaries (lint-backed, zero tolerance).** Five chunks — engine /
  content / UI / infra / contract — imported only via their barrels
  (`engine/index.js`, `content/index.js`, `content/reading/index.js`,
  `contract/index.js`, `infra/index.js`). `npx eslint .` must report **0 errors**;
  a new `no-restricted-imports` violation or a new eslint-disable of it: HIGH.
  Direction rule: engine imports nothing from UI/content; contract imports nothing.
- **A2 — Single source of truth (no hardcoding).** A literal that already has a
  canonical home may not be re-declared: prices → `infra/pricing.js`; endpoints/links →
  `infra/endpoints.js`/`links.js`; element pigments → `styles/elementPigments.js`;
  stem pinyin → `engine/stemPinyin.js`; tokens → `tokens.css`/`tokens.js`; routes →
  App.jsx `FLOW` (runtime-exposed as `window.__screens`); QA charts → `tools/qa-cases.mjs`.
  Second declaration of any of these: MEDIUM (HIGH if it's a price or endpoint).
- **A3 — Zero dead code.** No unused exports, unreachable branches, commented-out
  blocks, orphan files, or "just in case" props. The repo went 129→0 lint dead-code
  findings; every diff keeps it at 0. New dead code: LOW–MEDIUM by size.
- **A4 — Literal naming.** Files/folders/components named for what they are today —
  no design-iteration tags (the d13→reading rename is the precedent), no `*2`/`*New`/
  `*Final` suffixes, no misleading names after behavior changes. MEDIUM.
- **A5 — Size and shape budgets** (advisory thresholds — crossing one is a prompt to
  justify, not an automatic finding): function > 60 lines; component file > 400 lines;
  > 3 levels of prop drilling (consider context); a barrel re-exporting > ~30 symbols
  (consider a split). A file that crosses a budget in a diff that *could* have split it:
  LOW.
- **A6 — Comment discipline (house style).** Comments exist to carry what the code
  cannot: constraints, non-obvious *why*, and decision provenance. Concretely:
  - **File header banner** — every non-trivial file opens with the
    `// ═══ / — ═══` banner block: one-line identity, purpose, usage/run
    instructions for tools, and secrets/config notes for workers (see
    `workers/push/wrangler.jsonc`, `tools/qa-route-sweep.mjs` as reference).
    New file without one: LOW.
  - **Section dividers** — long files use `// ── Name ──────` rules, not blank-line
    soup.
  - **Decision citations** — behavior that exists because of a spec or owner decision
    cites it inline (`INF_01 §4.4`, `DES_04 §AM.2`, `D13`) so the next reader can find
    the ruling. A workaround or intentional oddity without its *why*: MEDIUM.
  - **Banned comment types** — narrating the next line, restating the diff, selling
    the change ("improved", "now correctly"), commented-out code (that's A3 dead
    code), and TODO without an owner/route to resolution. LOW–MEDIUM.
  - **Stale comments** contradicting the code they describe: MEDIUM (they actively
    mislead — worse than no comment).
  - **Bilingual terms** — domain terms keep their hanzi at first use in a file
    (八字, 合而不化, 用神) matching the docs' convention, so code and DEV_01–INF_01
    stay greppable by the same vocabulary.
- **A7 — Reuse before new.** A new helper/component that duplicates ≥70% of an existing
  one is a finding (MEDIUM); extend or extract instead. Check `components/shared/`,
  `styles/`, existing hooks first.
- **A8 — Placement.** All live code inside `Elementum_App/`; dev-only tooling in
  `Elementum_App/tools/`; nothing ships to users that is dev-gated (IS_DEV) — a dev
  hook reachable in prod build: HIGH.
- **A9 — Syntax & idiom conventions.** Formatting is the linter's job (0 errors is
  A1); *idiom* is reviewable. The house dialect:
  - **Naming system** — `PascalCase` components/classes · `useX` hooks ·
    `camelCase` functions/variables · `SCREAMING_SNAKE` module-level constants and
    data tables (`FLOW`, `CASES`, `STEM_PINYIN`) · file names match their default
    export (`ReadingFacesScreen.jsx`). Mixed or drive-by-renamed conventions: LOW.
  - **Module system** — ESM everywhere; node tooling is `.mjs`; no `require()` in
    app code; no default-and-named export mixing from one module without reason.
  - **Functions over classes** — functional React components only; plain functions
    + module state over classes in engine/tools (the codebase has zero classes by
    convention).
  - **Modern-JS baseline** — optional chaining / nullish coalescing over `&&`
    chains and `||` defaults where falsy-vs-nullish matters; template literals over
    concatenation; `const` by default, `let` when reassigned, `var` never;
    early-return over nested `if` pyramids (>2 levels of nesting where an early
    return would flatten: LOW).
  - **Error style** — user-path failures degrade gracefully (null-safe patterns per
    C1); tool/worker failures fail *loudly* with actionable messages and correct
    exit codes (the qa tools' `exit 0/1/2` contract is the reference). Swallowed
    catch blocks (`catch {}`) require a comment stating why silence is correct.
  - **No TypeScript** — the repo is deliberately plain JS; a diff introducing TS
    syntax or a transpile step is a scope decision for the owner, not a
    contribution: flag as HIGH until the owner rules.
  - **PowerShell files are UTF-8 WITH BOM** — PS 5.1 reads BOM-less files as
    ANSI, where an em-dash's bytes include a curly-quote that terminates
    strings and silently breaks parsing (precedent: the 2026-07-08 daily-QA
    task failure). New/edited `.ps1` must keep the BOM; non-ASCII characters
    stay out of code strings. Any `.ps1` edit must be followed by a parse
    check (`[System.Management.Automation.Language.Parser]::ParseFile`) or a real run. MEDIUM.
- **A10 — Change-set scope discipline.** A change-set (commit or small commit train)
  is reviewable only if its blast radius is legible:
  - **One concern per commit** — a feature commit does not smuggle unrelated
    refactors, renames, or formatting sweeps; behavior-preserving restructuring
    ships separately (the 2026-07 six-PR restructure is the precedent). Mixed:
    MEDIUM.
  - **Coupled artifacts move together** — the same-change-set pairs are mandatory:
    price ⇄ webhook PRODUCTS map (S3) · schema ⇄ content/REA_04 (K3) · lazy() list ⇄
    prefetch list (P3) · engine behavior ⇄ golden re-bless + protocol run (C4) ·
    canonical `Design/` file ⇄ `public/` mirror. Half a pair: severity per the
    paired rule.
  - **Commit messages** — conventional-commit style (`feat(scope):`, `fix:`,
    `docs:`, `chore:`), body explains *why* and records verification performed;
    a budget override (P1/P2) must be justified here. Unexplained budget
    crossings: MEDIUM.
  - **No orphan scope** — everything a commit introduces is reachable: a new
    component is routed/imported, a new tool is documented in its own header, a
    new endpoint appears in INF_01. Introduced-but-unwired code is A3 dead code at
    birth: MEDIUM.

---

## §5 Performance and optimization

Budgets are measured against `npm run build` output. Baselines (2026-07-07):
**main chunk 864 KB · total JS 1,281 KB** (pre-gzip, dist/assets).

- **P1 — Bundle budget.** A single change growing the main chunk > 5% or total JS
  > 8% must justify itself in the commit message (new capability, not accident):
  otherwise MEDIUM. Hard ceiling pending owner decision — flag any main chunk > 1 MB.
- **P2 — Dependency admission.** Every new npm dependency is a finding unless the diff
  demonstrates: (a) non-trivial to hand-roll, (b) tree-shakeable or small, (c) actively
  maintained. Duplicating an existing dep's capability (e.g., a second animation lib
  next to framer-motion): HIGH.
- **P3 — Code-splitting contract.** Heavy/secondary screens stay lazy (`lazy()` +
  `prefetchScreens()` warm-up); nav-bar destinations + reveal stay eager (no Suspense
  blink). Moving a screen between tiers requires updating BOTH the lazy() list and the
  prefetch list — one-sided: MEDIUM (it reintroduces the white blink or bloats first
  paint).
- **P4 — Render hygiene.** No new: setState-in-render, effects with missing/unstable
  deps that re-fire per render, unthrottled scroll/resize listeners, object/array
  literals passed as props to memoized children in hot paths. MEDIUM. Memoization the
  other way (useMemo/memo without a measured reason): LOW — complexity has a cost too.
- **P5 — Animation physics.** Animations run on transform/opacity only (compositor);
  page scroll stays native (`.screen-pad` is the designated scroll region); no
  animation of layout properties (top/height/width) in interactive paths. MEDIUM.
- **P6 — Asset budget.** New raster assets: compressed before commit (the 84%
  art-compression pass is the precedent); no asset > 300 KB without justification;
  backgrounds/art live in the canonical `/backgrounds/`/`/art/` trees, runtime-cached
  by the SW, never imported into the JS bundle. MEDIUM.
- **P7 — Worker efficiency.** Workers stay dependency-light (raw fetch to Supabase REST
  is the pattern — no SDK imports); per-request work is O(rows returned); loops that
  fan out network calls (like push send) stay inside `ctx.waitUntil` and tolerate
  partial failure. MEDIUM.
- **P8 — Engine complexity.** Engine functions stay pure computation over small fixed
  structures (4 pillars, 10 stems, 12 branches) — anything super-linear in chart count
  or allocating per-render inside UI consumption paths: MEDIUM.

---

## §6 Consistency with canonical sources

- **K1 — Token scales (code-checkable design law).** Colors via tokens; pigment alpha
  only from the ladder `10/1A/40/CC` (`withAlpha()`); border-radius only from
  `1/10/12/16/22/999`; spacing only from the DES_04 scale. Raw hex or off-scale values in
  new code: MEDIUM. (Full design law: DES_04 §AMENDMENT — visual/IA judgment stays with
  the owner, but scale violations are mechanical and reviewable.)
- **K2 — Icons via sprite.** `<use href="/icons.svg#id">` / ReadingSprite — no new
  inline SVG paths for icons that exist in the library. LOW.
- **K3 — Doc cascade.** A change to `archetypeSchema.js` without the matching
  archetypeSource/REA_04 update (or an explicit note deferring it): MEDIUM. Engine
  methodology changes must not contradict DEV_01/REA_02 without doc updates in the same
  change-set: MEDIUM.
- **K4 — Config single-sourcing.** Public URLs/keys come from `site.config.json`;
  worker names/routes documented in INF_01. New magic URLs: MEDIUM.
- **K5 — Infrastructure conventions** (architecture itself lives in INF_01; these are
  the reviewable habits):
  - **Worker layout** — one directory per worker under `Elementum_App/workers/<name>/`
    containing exactly `index.js` + `wrangler.jsonc`; the config header documents
    the worker's purpose, its deploy command, and EVERY secret it expects (name +
    one-line meaning — `workers/push/wrangler.jsonc` is the reference). Undocumented
    secret dependency: MEDIUM (it strands the next deployer).
  - **Vars vs secrets** — public values (`SUPABASE_URL`, VAPID public key,
    `REPORT_TO`) go in `vars`; anything privileged goes through
    `wrangler secret put`, never in the config or code. Misfiled: S4 severity rules
    apply.
  - **Per-endpoint auth comment** — every route in a worker's fetch handler states
    its auth model where it's implemented (S5's documentation half). Missing on a
    new endpoint: MEDIUM even when the enforcement is present.
  - **Naming** — workers are `elementum-<function>` (push, stripe-webhook);
    endpoints are verbs or plain nouns (`/subscribe`, `/report`), no versioned
    paths without an owner decision.
  - **Deliberate exposure flags** — `workers_dev`, `preview_urls`, and custom-domain
    attachment are explicit decisions with a comment (the main worker's
    dashboard-managed-domain note is the reference); a diff flipping one silently:
    HIGH (it changes what's publicly reachable).
  - **Deploy path** — the main `elementum` worker deploys via the Stop-hook
    (`sync-live.ps1`, fingerprint-gated + smoke-checked); satellite workers deploy
    manually via their documented command. A change that adds a THIRD deploy path
    or bypasses the smoke check: MEDIUM.
  - **New external service** — any diff introducing a new hosted dependency
    (database, queue, API) is automatically an owner decision: flag HIGH with the
    ownership-pattern note (personal-owner + company-member per the infra map),
    regardless of code quality.

---

## §7 Finding validity — evidence requirements

A reported finding MUST include:

1. **Location** — file:line in the new code (not "somewhere in the diff").
2. **Criterion** — the §-code it violates (e.g., "S3", "A2", "P4").
3. **Failure scenario** — concrete input/state → wrong outcome. For structural findings
   (§4), the concrete maintenance harm ("next price change will silently miss this
   copy").
4. **Verification status** — `CONFIRMED` (reviewer read surrounding code / ran the
   check and reproduced the reasoning) or `PLAUSIBLE` (could not verify; say why).
   Unverifiable speculation is dropped, not reported.

Review depth scales with diff size (small: §2+§3 minimum · medium: all sections ·
large/multi-file: all sections with parallel reviewers per section-group and
adversarial verification of every finding), but **§3 is never skipped when workers,
auth, infra, or entitlement code is touched — and §2-C4 never when engine is touched.**

Report format: verdict line → severity-ordered findings (each with the four elements
above) → checks explicitly ruled out ("no engine files touched; C4 n/a"). The
ruled-out list is what makes CLEAN trustworthy.

---

## §8 Maintaining this standard

- Numeric baselines (§5) are re-measured and updated here when the owner deliberately
  accepts a new baseline (e.g., after adding a major feature) — reviews flag drift,
  owners move goalposts, never the reviewer.
- New invariants earn a §-code when a real incident or owner decision creates them;
  each addition names its precedent (as S3 names amount-routing, A4 names d13→reading).
- If a criterion here conflicts with observed canonical code, the review flags the
  conflict instead of silently picking a side — the owner resolves which is stale.
