# Elementum — Project Status & Design-Audit Backlog

Source: full audit of the live Elementum app against **DOC5** (incl. §AMENDMENT), **DOC4** (generation architecture), **DOC6** (manual), **DOC9** (field schema). Eleven discrepancies were surfaced and decided with the product owner. This file is the **tracked backlog** for the items deferred under decision **D11** ("decisions-only doc patch, defer the rest"), plus the two large execution workstreams.

> **2026-06-10:** This file now doubles as the **project status record** (§0 below). No separate status doc is needed.

---

## 0 · Project status (2026-06-10)

**Milestone — Elementum is at a shippable-alpha "real product" state.** Content, reading structure, and docs are complete and mutually consistent for all 10 day-masters; remaining work is enrichment / polish, not repair.

**Complete**
- **Content** — all 10 day-masters render on every live surface (庚 reference + the D9 sprint + S7's 7 classical anchors → `CLASSICAL_STEM_ANCHORS` 10/10). The earlier "99 missing fields" were vestigial `status:'internal'` schema with no live consumer (S1) — not authoring debt.
- **Reading IA** — settled per the S-series: Reveal → Reading catalogue (Identity Card + 6 rows + conditional Seasonal) → detail pager (`getReadingSections`) → Energy Map; 5-tab nav icons-only. Schema ↔ UI ↔ docs agree.
- **Design system** — canonical (`Design/Legends/` + `tokens.css` + `icons.svg` + `manifest.md`); StemSeal PNGs are the identity visual.
- **App** — QA'd bug-free alpha; code-split; demo entitlement stubs (`tier` / `hasSelfReport` / scripted consultant) at clean seams.
- **Docs** — DOC1–DOC10 current; this ledger holds the D-series (D1–D11) + S-series (S1–S8) decisions; folder decluttered to core docs only (2026-06-10).
- **Backend** — scoped + deferred to pre-beta (DOC10): managed BaaS + ~3 serverless functions, no dedicated server.
- **Live demo / installable PWA (2026-06-10)** — **https://elementum.jiaxinxuyago.workers.dev** (Cloudflare Workers static assets, `Elementum_App/wrangler.jsonc`). Phase A of iOS testing: PWA manifest + SW, 庚-seal icons, mobile-fullscreen shell with safe-areas, dist pruned of design references (246→192 MB). Phase B (Capacitor + TestFlight) deferred to pre-beta with DOC10.

> **Dev rule — the live demo tracks the working tree.** Every app change must reach the live URL. Automated: a Claude Code `Stop` hook (`.claude/settings.local.json`, machine-local) runs `Elementum_App/tools/sync-live.ps1`, which fingerprints the app tree and runs `npm run build` + `npx wrangler deploy` only when something changed. Manual fallback from `Elementum_App/`: `npm run build; npx wrangler deploy` (re-auth with `npx wrangler login` if deploy fails).

**Next pending — all non-blocking enrichment / polish**
1. **Presentation polish (cosmetic):** 9 per-stem painted `identityIcon` SVGs; a `cat-seasonal.png` for the conditional Seasonal row; micro-interactions.
2. **24 QC violations:** over-length `elementIntro` (15), `keywords`/`chips` alias (9), one over-length 癸 `chips` item — surfaced by the `coverageFor` walker (required-missing = 0).
3. **150-variant content batch:** Pipeline A1 (`Scripts/batchGenerate.js`) → `STEM_CARD_DATA.js`; gated on a schema-freeze + building the 150-template pipeline (`[NOT YET BUILT]`).
4. **Backend build (pre-beta)** per DOC10.

---

## 1 · Decision ledger (all 11)

| # | Item | Resolution | Landed where |
|---|------|-----------|--------------|
| D1 | Identity visual: TG ring vs. seal | **Seal is canonical**; ring → Ten-Gods viz | DOC5 §11, §20 patched |
| D2 | tgPattern label on identity card | **Internal-only** (content key, not UI) | DOC5 §11 patched |
| D3 | Catalogue card set | **Keep 6 rows incl. Daily Reading** | DOC5 §AM.8 patched |
| D4 | Today screen purpose | **Keep the Readings-Hub mosaic** | DOC5 §10 patched |
| D5 | Reveal Balance Prescription | **Restore on Reveal** | ✅ App (RevealScreen.jsx) |
| D6 | Tier model | **Three tiers (Free / Seeker / Advisor)** | DOC5 §19 patched |
| D7 | Self-Report monetization | **One-time purchase (`hasSelfReport`)** | ✅ App (chartContext + SelfReportScreen + AIConsultant); real billing deferred → DOC10 |
| D8 | Compatibility gating | **Unlimited teaser; full = Seeker; drop "1/mo"** | ✅ App copy + DOC5 §13 patched |
| D9 | Content coverage | **Author all 10 day-masters** | ✅ App (all 10 authored; complete per §0 + S-series) |
| D10 | Stem identity assets | **Standardize on PNG seals**; retire SVG/dm-* | DOC5 §20, §AM.8 patched |
| D11 | Doc sweep scope | **Decisions-only; defer the rest** | This file |

**Already shipped this pass (app):** D5 (Reveal Section 3 restored — renders whenever a chart has a fully-absent element), D8 (CompatScreen tier copy reframed to unlimited-teaser / full=Seeker).

---

## 2 · Large workstreams — completed

### D7 — Self-Report one-time purchase (build) ✅
> **Built (2026-06):** `hasSelfReport` + the purchase gate (`SelfReportScreen`) + AI-Consultant context wiring shipped (demo). Real billing is deferred to pre-beta — see DOC10 §4.2. Original spec retained below for history.

Make Self-Report a separately-purchased unit (`hasSelfReport` boolean), tracked independently of `tier`, available to Seekers as a $6.99–9.99 SKU.
- **Gating today:** Self-Report is a plain Seeker tile (`SelfReportScreen`), and it is **cosmetic** — saving life-context to `localStorage` (`elementum_selfreport_v1`) does not actually feed any reading or the AI.
- **To build:** (a) a real purchase/billing flow + `hasSelfReport` state; (b) gate on `tier >= SEEKER && hasSelfReport`; (c) wire the saved context into reading generation + the AI Consultant so it genuinely "recalibrates."
- **Blocked on:** payment provider decision; confirms whether (c) ships with (a/b) or later.

### D9 — Author all 10 day-masters (content sprint) ✅
> **Done (2026-06):** all 10 day-masters authored; the S-series audit (§4) confirmed content is complete on every live surface. The fields once flagged "missing" were internal-only schema (S1), not real gaps. Original sprint scope retained below for history.

Today only **庚 (The Blade)** is fully authored. The other nine stems fall back gracefully but render thinner.
- **Missing for 9 stems:** `gifts[]` / `shadows[]` (stem-level, currently 庚 only → Gifts/Shadows sections render blank), `identity.elementIntro.punch/expand` (Reveal essence + Day Master "element intro" fall back), and the 15 `STEM_CARD_DATA` `yourNature.desc` variants per stem (≈135 entries — Pipeline A).
- **Also TODO across all 10 TGs:** `TG_CARD_DATA[tg].outputs[]` and `frictions[]` (currently `[TODO]`, filtered out at render in `TenGodsDetail`).
- **Per DOC4:** this is Pipeline A (A1 = 150 `STEM_CARD_DATA`, A2 = 50 compound cards). Run offline pre-launch.
- **Note:** owner chose "author all 10 now" — sequence this as a dedicated content sprint before further UI work.

---

## 3 · Deferred doc-hygiene backlog (D11 — clear later)

Cross-doc contradictions found during the audit.

> **✅ RESOLVED in the 2026-06 doc-hygiene sweep:**
> - **#1 庚 manifesto** → canonical "Precision before intention · An edge is never given — it is forged" (matches the app); fixed in DOC2 §2 and DOC3.
> - **#2 block count** → DOC4 `validateStem` threshold `< 7` → `< 5`; DOC9 §4 clarified that 5–11 is the *authored* pool and exactly 5 *render* (DOC4 §11).
> - **#4 `yourNature.phrase`** → INTERNAL / not rendered (matches DOC9 §3 + the app); DOC4 §5 corrected.
> - **#5 `ElementNature_DATA.js`** → renamed to `STEM_CARD_DATA.js` throughout DOC6.
> - **#6 `keywords` vs `chips`** → already canonical (`keywords`) per DOC9 §6; confirmed, no change needed.
> - **#7 removed TG fields** → DOC4 "Authoring units and frames" table + §8 Enrichment list annotated; legacy `personalityParagraph`/`decisionStyle`/`communicationStyle`/`hiddenTrait` mapped to current schema.
> - **#3 "5 vs 4" life-domains** → **clarified as two intentional systems**: the 4 force-domains (`domainSignatures` — career/relationships/wealth/health, DOC4) and the Energy Manual's 5 (adds Purpose, DOC5 §12). Note added in DOC4.
>
> **Still deferred (low impact):** **#8** DOC5 body still uses the `energy-map`/`friends` route slugs (canonical Reading/Compat is established by §AM.1 + the audit patches; slugs are cosmetic), and **#9** DOC6's DOC4 §-number cross-references are stale.

Original list (for reference):

1. **庚 manifesto exists in two wordings** — DOC2 §2 ("An edge that was never chosen — only found") vs DOC4 §3 / DOC9 §1 ("An edge is never given — it is forged"). Pick one; align the others + `archetypeSource.js`.
2. **Block count specced three ways** — DOC4 §11 locks **5 blocks**; DOC4 §9 `validateStem()` still errors at `<7`; DOC9 §4 says "5–11". Reconcile to 5 and fix the stale validator.
3. **"5 life-domains" vs the actual 4** — docs/app use **career / relationships / wealth / health** (4). Any "5 life-domain" references (and the Energy Manual's 5-domain framing) should be corrected to 4, or the 5th explicitly defined.
4. **`yourNature.phrase` tier conflict** — DOC9 §3 marks it INTERNAL (not rendered); DOC4 §5 renders it as the visible anchor. Decide and align.
5. **`ElementNature_DATA.js`** — DOC6 §2 still lists it; DOC4 v3.9 eliminated it as a naming artifact of `STEM_CARD_DATA`. Remove from DOC6.
6. **`keywords` vs `chips`** — DOC9 §6 flags `keywords` canonical; older files use `chips` (coverage walker reports missing). Normalize.
7. **Removed TG fields still referenced** — DOC4 §8 and the §9 TG authoring table still list `personalityParagraph` / `decisionStyle` / `communicationStyle` / `hiddenTrait` (replaced by outputs/frictions + `hiddenDynamic`). Strike them.
8. **Nav-label staleness beyond what was patched** — DOC5 body (§5 route map, §11 title "Energy Map Screen", various) still uses "Energy Map / Friends"; canonical is **Reading / Compat** (§AM.1). Routes still slugged `energy-map` / `friends`. Full sweep deferred.
9. **DOC6 internal cross-refs stale** — it describes DOC4's old §7–§15 ("Pass 1 / Pass 2 / Layer 2 angle generation") which no longer matches DOC4 v4.3.

### Minor app/IA notes (not blocking)
- **Reveal CTA copy** says "Enter Your Energy Map" but routes to the **Reading** tab (`app-reading`); §AM.1 copy is "Enter Your Readings." Align text to route.
- **`read-locked` / `LockedDetail`** is wired into FLOW but unreachable (no catalogue row links it). Keep as a safety net or remove.
- **Dead code:** `GuidanceScreen.FeaturedCard` (superseded by `DrawTile`); `mockup-detail` / `mockup-energymap` legacy hash-only screens.
- **Engine fallbacks:** Month/Year pages fall back to hardcoded wireframe bar values on `temporal.js` error; many drill-downs default a missing chart to a Metal/庚 chart rather than erroring.
- **Non-functional stubs (pre-launch):** Profile "Sign Out" no-op (no auth); AI Consultant scripted (no LLM — see D7/D6); tokens.jsx `BORDER_LIGHT`/`BORDER_STD` drift from the anchor's opaque palette.

---

## 4 · Reading-Structure Audit (S-series · 2026-06)

Source: structural audit of the live reading IA (`App.jsx` FLOW + dashboard tabs + `reading-detail/` screens) against **DOC5 §9/§11 + §AMENDMENT (§AM.1/§AM.2/§AM.8)**, cross-checked with the content schema. **Headline:** the content scorecard's *99 "missing required" fields were entirely S1 vestigial schema* — the live UI renders `TG_CARD_DATA` + templated logic for those surfaces, not the schema groups. Live content is complete for 9/10 stems (庚 reference + the D9 sprint); the only real live gap was S7 (now closed). Content-Readiness Phases 3–4 (baseline authoring + 150-variant batch) are therefore **enrichment, not breakage-fixing**.

| # | Item | Resolution | Landed |
|---|------|-----------|--------|
| S1 | `dominantEnergy` / `seasonalCalibration` / `liunianSignatures` — schema-`required` but no live consumer | **Keep internal-only** (`status:'internal'`, not counted missing); retained as Self-Report synthesis context | ✅ App (`archetypeSchema.js` + coverage walker) · scorecard missing **99 → 0** |
| S2/S3 | Seasonal had no catalogue entry; catalogue (6) ↔ detail pager (7) diverged | **Align both** — conditional Seasonal catalogue row; pager = the catalogue reading rows; Daily Reading = tab-jump; Identity Card = pager stop 1 | ✅ App (`ReadingScreen.jsx`) |
| S4 | Reading-tab seal-dot (§AM.1/§AM.2) absent in app | **Drop the rule** — align §AM.1/§AM.2 to the app's deliberate ink-only nav (no code change) | ✅ DOC5 §AM.1/§AM.2 + handoff patched |
| S5 | DOC5 §9/§11 base text pre-amendment (Energy Map/Friends, 8-section `getSections`, "Enter Your Dashboard") | **Patch to shipped reality** via canonical callouts | ✅ DOC5 §9 + §11 callouts |
| S6 | TenGods consolidation — old `dom_0`/`dom_1` Primary/Secondary Force routing + `dominantEnergy` | **Confirm consolidated model canonical**; retire dom routing in docs | ✅ DOC5 §11 callout |
| S7 | `CLASSICAL_STEM_ANCHORS` 3/10 → DayMasterDetail "Classical Source" card blank for 7 stems | **Hand-author the 7** (丁戊己庚辛壬癸) from 三命通会 十干体象 | ✅ App (`archetypeSource.js` — 10/10) |
| S8 | Two dev mockups + now-orphaned `mockup/` dir | **Delete** | ✅ App (`App.jsx`, `DevBar.jsx`, `mockup/` removed) |

**Resolves earlier backlog items:** §3 **#8** (DOC5 nav-label staleness — patched via the S5 callouts) and the Minor-notes **"Dead code: `mockup-*`"** (S8) + **"Reveal CTA copy"** (the `App.jsx` comment now reads "Enter Your Readings"; §AM.1 copy is canonical).
