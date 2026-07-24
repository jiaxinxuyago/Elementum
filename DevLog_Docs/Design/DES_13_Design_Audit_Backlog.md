# Elementum — Project Status & Design-Audit Backlog

Source: full audit of the live Elementum app against **DES_04** (incl. §AMENDMENT), **REA_03** (generation architecture), **REA_04** (manual), **REA_06** (field schema). Eleven discrepancies were surfaced and decided with the product owner. This file is the **tracked backlog** for the items deferred under decision **D11** ("decisions-only doc patch, defer the rest"), plus the two large execution workstreams.

> **Doc reorg (2026-06-24):** the **Reading Schema is now Doc 6** (`REA_04_Reading_Schema.md`); the old **Doc 6 / Manual is retired** (`_ARCHIVE_Manual_RETIRED.md`). Backlog items **#5** (remove `ElementNature_DATA.js` from REA_04) and **#9** (REA_04 stale cross-refs) are therefore **MOOT** — the Manual no longer exists.

> **2026-06-10:** This file now doubles as the **project status record** (§0 below). No separate status doc is needed.

---

## 0 · Project status (2026-06-10)

**Milestone — Elementum is at a shippable-alpha "real product" state.** Content, reading structure, and docs are complete and mutually consistent for all 10 day-masters; remaining work is enrichment / polish, not repair.

**Complete**
- **Content** — all 10 day-masters render on every live surface (庚 reference + the D9 sprint + S7's 7 classical anchors → `CLASSICAL_STEM_ANCHORS` 10/10). The earlier "99 missing fields" were vestigial `status:'internal'` schema with no live consumer (S1) — not authoring debt.
- **Reading IA** — settled per the S-series: Reveal → Reading catalogue (Identity Card + 6 rows + conditional Seasonal) → detail pager (`getReadingSections`) → Energy Map; 5-tab nav icons-only. Schema ↔ UI ↔ docs agree. **⚠ D12 (2026-06-10): the reading schema/structure is RE-OPENED for redesign** — see the D12 row and `REA_09_Reading_Format_Audit.md`; the navigation IA above remains live until the redesign lands.
- **Design system** — canonical (`Design/Legends/` + `tokens.css` + `icons.svg` + `manifest.md`); StemSeal PNGs are the identity visual.
- **App** — QA'd bug-free alpha; code-split; demo entitlement stubs (`tier` / `hasSelfReport` / scripted consultant) at clean seams.
- **Docs** — DEV_01–INF_01 current; this ledger holds the D-series (D1–D11) + S-series (S1–S8) decisions; folder decluttered to core docs only (2026-06-10).
- **Backend** — scoped + deferred to pre-beta (INF_01): managed BaaS + ~3 serverless functions, no dedicated server.
- **Live demo / installable PWA (2026-06-10)** — **https://elementum.life** (Cloudflare Workers static assets, `Elementum_App/wrangler.jsonc`). Phase A of iOS testing: PWA manifest + SW, 庚-seal icons, mobile-fullscreen shell with safe-areas, dist pruned of design references (246→192 MB). Phase B (Capacitor + TestFlight) deferred to pre-beta with INF_01.

> **Dev rule — the live demo tracks the working tree.** Every app change must reach the live URL. Automated: a Claude Code `Stop` hook (`.claude/settings.local.json`, machine-local) runs `Elementum_App/tools/sync-live.ps1`, which fingerprints the app tree and runs `npm run build` + `npx wrangler deploy` only when something changed. Manual fallback from `Elementum_App/`: `npm run build; npx wrangler deploy` (re-auth with `npx wrangler login` if deploy fails).

> **CURRENT FOCUS (end of 2026-06-10 session) — the D12/D13 reading redesign is in full flight.** State: DES_04 §0 charter + reading-first principle locked · concept inventory/ladder/charters complete (`REA_07_Reading_Concept_Inventory.md`) · journey wireframe v5 + Claude Design brief dispatched (`Design/Wireframes/d13-five-energies-journey.html` + `CLAUDE_DESIGN_BRIEF_d13-journey.md`; canvas export PENDING — verify against the brief's 8 acceptance criteria when it returns) · schema v2 drafted (now `REA_04_Reading_Schema.md`, at v2.1) · worked example = batch #1 authored (`d13-reading-example-19950429.html`, awaiting owner markup + the tester-zero cold read). Next moves: owner markup → schema freeze → Pipeline A1 retarget → Resonance Spec (D12 Step 2, not started). **New-machine note:** the live-demo Stop hook + wrangler login + `.claude/launch.json` are machine-local — re-create on a new workspace (see `Elementum_App/tools/sync-live.ps1` header).

> **D14 — Reading v2.1 (polarity / Faces) · 2026-06-24 · EXTENDS D13.** Each element splits into up to two Ten-God personas (faces) by polarity; surfaced via a new **FACES prologue** inside the reading (1–2 cards by math; abstract + punchline + keywords + **ruling domain**). Decisions A1–A3/B1–B4/C1–C5 owner-locked; full record + per-doc edit list in `REA_08_Reading_V2.1_Reconciliation_Audit.md`; schema bumped to **v2.1**. Carries the engine **polarity-blind resolver fix** (accuracy). Supersedes the §AM.8/D3 six-row catalogue reconciliation as a child of D13 (five-element skin). **Pending:** engine rewire + recompute the 庚 reference chart, then Pipeline A2 retarget to the K2 prologue + dominant/absent registers + rulingDomain.

> **D15 — Design-system rulings from the 2026-07-07 code audit · PENDING OWNER.** *(Housekeeping review 2026-07-23: owner confirmed all four stay parked behind the design-library rebuild — surfaces re-verified live post-journey-redesign; no interaction with the reading-journey content work.)* The baseline conformance audit (`DEV_03_Code_Review_Standards.md`, commits `a63c800`/`eb22c53`) surfaced four token-law conflicts that are owner calls, not fixes — fold into the design-library rebuild ([[design-folder cleanup]] / new `library` folder), where the token law gets re-founded anyway:
> 1. **Radius scale** — `14` spread to 8 call sites (SelfReport, Codex, Onboarding, ChartResonance), plus 18/24/8/3 offenders (~25 sites incl. reading.css). Ruling: legitimize 14 (+ the bottom-sheet 24) into the DES_04 scale, or snap all sites to the legal `1/10/12/16/22/999`.
> 2. **InkTile alphas** — guidance-tile pigment alphas (0.32/0.12/0.45/…) match the screens-v2 legend verbatim but contradict the DES_04 §3.5.A ladder (10/1A/40/CC). Ruling: which is stale, the legend or the ladder?
> 3. **UpgradeModal `FLOOD_COLOR`** — a darker per-element ceremony palette diverging from the canonical pigments. Ruling: deliberate (then cite the why inline per A6) or derive from `elementPigments.js`.
> 4. **Un-tokenized grays** — `#d9d3c8` inactive-border ×7 (≈ but ≠ `borderStd`) + three drifting disabled-fill variants (`#D8D0C0`/`#CFC7B7`/`#cfc7b3`). Ruling: mint tokens (inactiveBorder, disabledFill) or map to existing ones.

**Next pending — all non-blocking enrichment / polish**
1. **Presentation polish (cosmetic):** 9 per-stem painted `identityIcon` SVGs; a `cat-seasonal.png` for the conditional Seasonal row; micro-interactions.
2. **~~24 QC violations~~ → superseded by D12 (2026-06-10):** the violations are *evidence* for the reading-schema redesign, not defects — 7/10 stems exceed both `elementIntro` budgets by 1–2 words (budget fights the voice). Do NOT trim copy to the old budgets. See `REA_09_Reading_Format_Audit.md`.
3. **~~150-variant~~ content batch → RETARGETED (D12 Step 3, 2026-06-10):** the batch is now the **50-key K2 energy-card corpus** (+30 self-cards +10 identity extensions ≈ 12,200 words total) per `REA_04_Reading_Schema.md`; TG_CARD_DATA + Profile DB are the god-core sources; still gated on the schema-v2 freeze; approve-then-scale starts with the 庚 chart's 5 cards.
4. **Backend build (pre-beta)** per INF_01.

---

## 1 · Decision ledger (D1–D12)

| # | Item | Resolution | Landed where |
|---|------|-----------|--------------|
| D1 | Identity visual: TG ring vs. seal | **Seal is canonical**; ring → Ten-Gods viz | DES_04 §11, §20 patched |
| D2 | tgPattern label on identity card | **Internal-only** (content key, not UI) | DES_04 §11 patched |
| D3 | Catalogue card set | **Keep 6 rows incl. Daily Reading** | DES_04 §AM.8 patched |
| D4 | Today screen purpose | **Keep the Readings-Hub mosaic** | DES_04 §10 patched |
| D5 | Reveal Balance Prescription | **Restore on Reveal** | ✅ App (RevealScreen.jsx) |
| D6 | Tier model | **Three tiers (Free / Seeker / Advisor)** | DES_04 §19 patched |
| D7 | Self-Report monetization | **One-time purchase (`hasSelfReport`)** | ✅ App (chartContext + SelfReportScreen + AIConsultant); real billing deferred → INF_01 |
| D8 | Compatibility gating | **Unlimited teaser; full = Seeker; drop "1/mo"** | ✅ App copy + DES_04 §13 patched |
| D9 | Content coverage | **Author all 10 day-masters** | ✅ App (all 10 authored; complete per §0 + S-series) |
| D10 | Stem identity assets | **Standardize on PNG seals**; retire SVG/dm-* | DES_04 §20, §AM.8 patched |
| D11 | Doc sweep scope | **Decisions-only; defer the rest** | This file |
| D12 | Reading schema & structure | **RE-OPENED for redesign** (owner decision, 2026-06-10) — supersedes the S-series "settled" status; goal: concept-ladder journey + resonance-engine content (Beta north star). **D12a (naming ruling):** Ten Gods use the mythic-persona register (Mirror…Sage) with mandatory structural definition lines; Profile-DB names + engine translations are non-surfacing aliases | **DES_04 §0 (charter)** · `REA_07_Reading_Concept_Inventory.md` (Step 1.1 — vocabulary law + registry) · `REA_09_Reading_Format_Audit.md` (format evidence) · 150-key batch stays gated on the new schema freeze |
| D13 | Reading catalogue structure | **Five Energies reorganization** (owner decision 2026-06-10, driven by first field test — a BaZi-literate tester couldn't connect the invented categories to her reading; diagnosis: **payoff latency**). Catalogue reorganizes from analytic lenses to energies: **Identity Card · Five Energy Cards** (per-element; council persona, catalyst/friction status, presence/absence reading and Seasonal cultivation become layers *inside* each element's card) **· Time (Today + Life Chapters) · Patterns (advanced)**. "Dominant Energies" and "Forces in Motion" cease to be top-level rows. **Supersedes D3** (6-row set). **D13a (two-tab split, 2026-06-10):** the Reading tab is the **static** birth-chart deep-dive only (identity + Five Energies); ALL temporal readings (today's energy · Day/Month/Year · Life Chapters) consolidate under the **Calendar (Today) tab**; Patterns lives on the chart page; no cross-links between the two. **D13b (wireframe v2 rulings, 2026-06-10):** two beats only — Beat 3 removed, **Beat 2 IS the Reading tab**; the **Day Master sits at the wheel's center** (tap → Day Master card, fully free); four pillars leave Beat 2 — header link renamed **"Pillar Chart →"** opening one merged data page (pillars + Patterns + Energy Map viz folded in; the standalone Energy Map screen retires → §AM.1 doc patch when shipped). **D13c (wireframe v3 rulings, 2026-06-10):** Beat 1 = **the Naming** — a ceremonial **identity plate** (full-bleed painted scene + stamped seal + name + ONE inscription line + birth-cast mark), share-card-ready from day one; the three-claim reading lives ONLY on the Day Master card (ceremony vs reference, no overlap); transition = **the seal as continuity object** (shrinks + glides plate → wheel center on scroll, painting dissolves to silk). Governing principle recorded in DES_04 §0: **"Reading first, system second"** — a concept name without a personal claim is a defect | DES_04 §0 (principle) · `REA_07_Reading_Concept_Inventory.md` Part 2 (ladder inverted) + Part 3 (charters) · **wireframe v1: `Design/Wireframes/d13-five-energies-journey.html`** (mirrored to public/ for preview, pruned from deploys) · app rebuild pending Part 3 → schema v2 |

**Already shipped this pass (app):** D5 (Reveal Section 3 restored — renders whenever a chart has a fully-absent element), D8 (CompatScreen tier copy reframed to unlimited-teaser / full=Seeker).

---

## 2 · Large workstreams — completed

### D7 — Self-Report one-time purchase (build) ✅
> **Built (2026-06):** `hasSelfReport` + the purchase gate (`SelfReportScreen`) + AI-Consultant context wiring shipped (demo). Real billing is deferred to pre-beta — see INF_01 §4.2. Original spec retained below for history.

Make Self-Report a separately-purchased unit (`hasSelfReport` boolean), tracked independently of `tier`, available to Seekers as a $6.99–9.99 SKU.
- **Gating today:** Self-Report is a plain Seeker tile (`SelfReportScreen`), and it is **cosmetic** — saving life-context to `localStorage` (`elementum_selfreport_v1`) does not actually feed any reading or the AI.
- **To build:** (a) a real purchase/billing flow + `hasSelfReport` state; (b) gate on `tier >= SEEKER && hasSelfReport`; (c) wire the saved context into reading generation + the AI Consultant so it genuinely "recalibrates."
- **Blocked on:** payment provider decision; confirms whether (c) ships with (a/b) or later.

### D9 — Author all 10 day-masters (content sprint) ✅
> **Done (2026-06):** all 10 day-masters authored; the S-series audit (§4) confirmed content is complete on every live surface. The fields once flagged "missing" were internal-only schema (S1), not real gaps. Original sprint scope retained below for history.

Today only **庚 (The Blade)** is fully authored. The other nine stems fall back gracefully but render thinner.
- **Missing for 9 stems:** `gifts[]` / `shadows[]` (stem-level, currently 庚 only → Gifts/Shadows sections render blank), `identity.elementIntro.punch/expand` (Reveal essence + Day Master "element intro" fall back), and the 15 `STEM_CARD_DATA` `yourNature.desc` variants per stem (≈135 entries — Pipeline A).
- **Also TODO across all 10 TGs:** `TG_CARD_DATA[tg].outputs[]` and `frictions[]` (currently `[TODO]`, filtered out at render in `TenGodsDetail`).
- **Per REA_03:** this is Pipeline A (A1 = 150 `STEM_CARD_DATA`, A2 = 50 compound cards). Run offline pre-launch.
- **Note:** owner chose "author all 10 now" — sequence this as a dedicated content sprint before further UI work.

---

## 3 · Deferred doc-hygiene backlog (D11 — clear later)

Cross-doc contradictions found during the audit.

> **✅ RESOLVED in the 2026-06 doc-hygiene sweep:**
> - **#1 庚 manifesto** → canonical "Precision before intention · An edge is never given — it is forged" (matches the app); fixed in REA_01 §2 and REA_02.
> - **#2 block count** → REA_03 `validateStem` threshold `< 7` → `< 5`; REA_06 §4 clarified that 5–11 is the *authored* pool and exactly 5 *render* (REA_03 §11).
> - **#4 `yourNature.phrase`** → INTERNAL / not rendered (matches REA_06 §3 + the app); REA_03 §5 corrected.
> - **#5 `ElementNature_DATA.js`** → renamed to `STEM_CARD_DATA.js` throughout REA_04.
> - **#6 `keywords` vs `chips`** → already canonical (`keywords`) per REA_06 §6; confirmed, no change needed.
> - **#7 removed TG fields** → REA_03 "Authoring units and frames" table + §8 Enrichment list annotated; legacy `personalityParagraph`/`decisionStyle`/`communicationStyle`/`hiddenTrait` mapped to current schema.
> - **#3 "5 vs 4" life-domains** → **clarified as two intentional systems**: the 4 force-domains (`domainSignatures` — career/relationships/wealth/health, REA_03) and the Energy Manual's 5 (adds Purpose, DES_04 §12). Note added in REA_03.
>
> **Still deferred (low impact):** **#8** DES_04 body still uses the `energy-map`/`friends` route slugs (canonical Reading/Compat is established by §AM.1 + the audit patches; slugs are cosmetic), and **#9** REA_04's REA_03 §-number cross-references are stale.

Original list (for reference):

1. **庚 manifesto exists in two wordings** — REA_01 §2 ("An edge that was never chosen — only found") vs REA_03 §3 / REA_06 §1 ("An edge is never given — it is forged"). Pick one; align the others + `archetypeSource.js`.
2. **Block count specced three ways** — REA_03 §11 locks **5 blocks**; REA_03 §9 `validateStem()` still errors at `<7`; REA_06 §4 says "5–11". Reconcile to 5 and fix the stale validator.
3. **"5 life-domains" vs the actual 4** — docs/app use **career / relationships / wealth / health** (4). Any "5 life-domain" references (and the Energy Manual's 5-domain framing) should be corrected to 4, or the 5th explicitly defined.
4. **`yourNature.phrase` tier conflict** — REA_06 §3 marks it INTERNAL (not rendered); REA_03 §5 renders it as the visible anchor. Decide and align.
5. **`ElementNature_DATA.js`** — REA_04 §2 still lists it; REA_03 v3.9 eliminated it as a naming artifact of `STEM_CARD_DATA`. Remove from REA_04.
6. **`keywords` vs `chips`** — REA_06 §6 flags `keywords` canonical; older files use `chips` (coverage walker reports missing). Normalize.
7. **Removed TG fields still referenced** — REA_03 §8 and the §9 TG authoring table still list `personalityParagraph` / `decisionStyle` / `communicationStyle` / `hiddenTrait` (replaced by outputs/frictions + `hiddenDynamic`). Strike them.
8. **Nav-label staleness beyond what was patched** — DES_04 body (§5 route map, §11 title "Energy Map Screen", various) still uses "Energy Map / Friends"; canonical is **Reading / Compat** (§AM.1). Routes still slugged `energy-map` / `friends`. Full sweep deferred.
9. **REA_04 internal cross-refs stale** — it describes REA_03's old §7–§15 ("Pass 1 / Pass 2 / Layer 2 angle generation") which no longer matches REA_03 v4.3.

### Minor app/IA notes (not blocking)
- **Reveal CTA copy** says "Enter Your Energy Map" but routes to the **Reading** tab (`app-reading`); §AM.1 copy is "Enter Your Readings." Align text to route.
- **`read-locked` / `LockedDetail`** is wired into FLOW but unreachable (no catalogue row links it). Keep as a safety net or remove.
- **Dead code:** `GuidanceScreen.FeaturedCard` (superseded by `DrawTile`); `mockup-detail` / `mockup-energymap` legacy hash-only screens.
- **Engine fallbacks:** Month/Year pages fall back to hardcoded wireframe bar values on `temporal.js` error; many drill-downs default a missing chart to a Metal/庚 chart rather than erroring.
- **Non-functional stubs (pre-launch):** Profile "Sign Out" no-op (no auth); AI Consultant scripted (no LLM — see D7/D6); tokens.jsx `BORDER_LIGHT`/`BORDER_STD` drift from the anchor's opaque palette.

---

## 4 · Reading-Structure Audit (S-series · 2026-06)

Source: structural audit of the live reading IA (`App.jsx` FLOW + dashboard tabs + `reading-detail/` screens) against **DES_04 §9/§11 + §AMENDMENT (§AM.1/§AM.2/§AM.8)**, cross-checked with the content schema. **Headline:** the content scorecard's *99 "missing required" fields were entirely S1 vestigial schema* — the live UI renders `TG_CARD_DATA` + templated logic for those surfaces, not the schema groups. Live content is complete for 9/10 stems (庚 reference + the D9 sprint); the only real live gap was S7 (now closed). Content-Readiness Phases 3–4 (baseline authoring + 150-variant batch) are therefore **enrichment, not breakage-fixing**.

| # | Item | Resolution | Landed |
|---|------|-----------|--------|
| S1 | `dominantEnergy` / `seasonalCalibration` / `liunianSignatures` — schema-`required` but no live consumer | **Keep internal-only** (`status:'internal'`, not counted missing); retained as Self-Report synthesis context | ✅ App (`archetypeSchema.js` + coverage walker) · scorecard missing **99 → 0** |
| S2/S3 | Seasonal had no catalogue entry; catalogue (6) ↔ detail pager (7) diverged | **Align both** — conditional Seasonal catalogue row; pager = the catalogue reading rows; Daily Reading = tab-jump; Identity Card = pager stop 1 | ✅ App (`ReadingScreen.jsx`) |
| S4 | Reading-tab seal-dot (§AM.1/§AM.2) absent in app | **Drop the rule** — align §AM.1/§AM.2 to the app's deliberate ink-only nav (no code change) | ✅ DES_04 §AM.1/§AM.2 + handoff patched |
| S5 | DES_04 §9/§11 base text pre-amendment (Energy Map/Friends, 8-section `getSections`, "Enter Your Dashboard") | **Patch to shipped reality** via canonical callouts | ✅ DES_04 §9 + §11 callouts |
| S6 | TenGods consolidation — old `dom_0`/`dom_1` Primary/Secondary Force routing + `dominantEnergy` | **Confirm consolidated model canonical**; retire dom routing in docs | ✅ DES_04 §11 callout |
| S7 | `CLASSICAL_STEM_ANCHORS` 3/10 → DayMasterDetail "Classical Source" card blank for 7 stems | **Hand-author the 7** (丁戊己庚辛壬癸) from 三命通会 十干体象 | ✅ App (`archetypeSource.js` — 10/10) |
| S8 | Two dev mockups + now-orphaned `mockup/` dir | **Delete** | ✅ App (`App.jsx`, `DevBar.jsx`, `mockup/` removed) |

**Resolves earlier backlog items:** §3 **#8** (DES_04 nav-label staleness — patched via the S5 callouts) and the Minor-notes **"Dead code: `mockup-*`"** (S8) + **"Reveal CTA copy"** (the `App.jsx` comment now reads "Enter Your Readings"; §AM.1 copy is canonical).
