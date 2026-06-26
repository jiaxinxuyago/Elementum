# Screens-v2 Handoff — Implementation Edit List (pixel-verbatim)

**Source of truth:** `Design/exports/Elementum_ScreenHandoff/screens-v2/Elementum Screens.html` (37 screens, live DOM + inline styles) + its `README - Elementum Design Handoff.md` + `art/` (13 files).
**Audited:** 2026-06-25 against the live `Elementum_App/src` tree, screen-by-screen.
**Goal:** replicate the HTML into the app **pixel-for-pixel, no discrepancies.**

> **Meta-finding (read first).** The handoff is NOT a wholesale redesign. For most screens the HTML was **exported from the current codebase** and is byte-identical to what ships — those need **zero work**. The real new design is concentrated in **three areas**: the Reading **catalogue**, the entire **Guidance suite** (hub + 5 features), and **Compatibility** (new hero intro + a brand-new 6-step friend-onboarding flow). One screen (`energy-card`) is a **routing conflict** that needs an owner decision and is on hold (FACES).

---

## 0. Scoreboard (37 screens)

| Bucket | Screens | Verdict |
|---|---|---|
| ✅ Already pixel-perfect (no edits) | welcome, year, month, day, hour, hourwindow, location, polarity, energycurrent, notify, notifytime (11 onboarding) · daymaster · pillars · day-page · month-page · year-page · decade-page | **18 — no work** |
| 🟡 Minor edits (1–2 string/value) | today, profile, resonance, reveal | **4** |
| 🟠 Major edits | catalogue, draw, manual, selfreport, consultant, codex | **6** |
| 🔴 Needs rebuild | guidance (hub), compat-intro | **2** |
| ➕ New screens to add | friend-year, friend-month, friend-day, friend-hour, friend-hourwindow, friend-current | **6** |
| ⚠️ Conflict / on hold | energy-card (live route = FACES) | **1 — owner decision** |

**Net new work:** 4 minor + 6 major + 2 rebuilds + 6 new screens + shared infra + tokens.

---

## 1. 🟡 Minor edits

### today — `dashboard/tabs/TodayScreen.jsx`
1. h1 `fontSize: 26 → 30` (line ~112). Design h1 is Cormorant 30px/400.
2. (optional) h1 `margin: '2px 0 0' → '4px 0 0'`.
Everything else matches verbatim.

### profile — `dashboard/tabs/ProfileScreen.jsx`
1. Eyebrow string `Profile · 个 人` → **`Your Profile`** (line ~84). Styling already correct.
2. H1 string `Me` → **`Account & Settings`** (line ~92). Styling already correct.
Conditional notice + Advisor tier are data-driven — don't hardcode.

### resonance — `dashboard/ChartResonanceScreen.jsx`
1. Intro eyebrow `Chart Resonance · 时 辰 感 应` → **`Chart Resonance`** (line ~102). Drop the CJK suffix only on the intro `<Eyebrow>` instance (the helper is shared by rounds/result phases — leave those).
Only the intro phase is in the handoff; rounds/result uncovered.

### reveal — `d13/D13RevealScreen.jsx` → `RevealDissolve.jsx` + `EnergyShelf.jsx` + `d13.css`
Plate/dissolve/seal-glide already match. One **shared** fix (also fixes catalogue):
1. `EnergyShelf.jsx` (~L99-103): remove the literal `Read` text node from `.sp-read`, leaving only `<span className="uico"><svg><use href="#ico-arrow-r"/></svg></span>`.
2. `d13.css` (~L371): replace the `.sp-read` text-pill rule with the arrow-only circle — `position:absolute; right:10px; bottom:10px; z-index:4; inline-flex center; width:28px; height:28px; color:var(--silk); background:var(--ink); border-radius:999px; box-shadow:0 4px 12px rgba(40,30,20,0.28); cursor:pointer;` and `.sp-read .uico{width:14px;height:14px;display:block;}`.

---

## 2. 🟠 Catalogue (Reading tab)

### catalogue — `d13/D13ReadingScreen.jsx` → `EnergyCatalogue.jsx`
1. **Replace** the `<div className="rx-ribbon">{RIBBON_INTRO[selected]}</div>` (line ~40) with a **"Read your Day Master" CTA button**, `onClick={onSeal}`. Exact inline spec:
   - Full-width flex row, gap 12, `margin:2px 0 8px`, `padding:10px 14px`, `border:1px solid rgba(106,132,154,0.42)`, `border-radius:14px`, `background:linear-gradient(180deg, rgba(139,163,184,0.14) 0%, rgba(139,163,184,0.05) 100%)`, `box-shadow:0 4px 14px rgba(60,46,28,0.09)`.
   - Left: 44px round avatar `/concept-arts/stems/${dayMaster}.png`, border `rgba(106,132,154,0.45)`, bg `rgb(244,237,223)`.
   - Middle: title Cormorant 600 17px `rgb(43,39,34)` "Read your Day Master"; subtitle EB Garamond italic 12px `rgb(106,132,154)` "庚 The Blade · your core reading" (glyph+archetype derived from identity).
   - Right: 30px black circle `rgb(43,39,34)` + 15px white `#ico-arrow-r`. `aria-label="Read your Day Master"`.
2. Apply the shared `.sp-read` arrow-only fix (§1 reveal).
3. Remove the now-unused local `RIBBON_INTRO` import here (keep the export — `RevealDissolve` still uses it).

**Locked / notes:** dominance wheel (320×300) is LOCKED — do not restyle (README §5E). **OWNER-RESOLVED 2026-06-25:** the README's "Tap to read →" affordance IS the arrow button in the HTML, not a separate text badge — implement the HTML verbatim. The center seal is a clickable image (`cursor:pointer`, `onClick={onSeal}` → `app-daymaster`); the "Read your Day Master" CTA carries the arrow. Do NOT add any extra text badge to the seal.

**Energy-shelf wiring (OWNER-RESOLVED):** the 5 shelf arrow buttons keep their existing destination — tapping an energy still opens `app-energy` (= `D13FacesScreen`), which stays **untouched**. Style the `.sp-read` buttons per HTML, but do not change where they route and do not touch FACES.

---

## 3. 🟠🔴 Guidance suite (hub + 5 features) — biggest block

**None of the three §5 signature techniques exist in the app today, and none of the 13 `art/` files are bundled in `Elementum_App/public/`.** Build shared infra first, then retrofit each screen.

### Shared infrastructure to build once
1. **`HorizonHeader`** (§5A) — 216px `overflow:hidden`, `margin:-54px -<pad> 0` over `rgb(241,233,214)`; layers: image (`opacity:0.92; filter:saturate(0.82) brightness(1.02)`), per-page element tint `linear-gradient(180deg,<pigment 0.16> 0%,transparent 44%); mix-blend-mode:multiply`, 56px top scrim `rgba(241,233,214,.5)→0`, 118px bottom horizon `to top, silk 0px, silk 100px, transparent 118px`; 34px circular back button `rgba(248,244,236,.66)` + `backdrop-filter:blur(3px)` with `#ico-chev-l` (18px). Props: `art, bgPosition, tintColor, eyebrow, eyebrowRuleColor, title, subtitle, onBack`. Title block bottom-left (l/r 20, bottom 16).
2. **`CloudVeilBackground`** (§5C) — `cloud-veil.png` @ `opacity:0.55`, `center bottom`, gradient mask `linear-gradient(to bottom, silk 0%, silk 36%, rgba(silk,.45) 62%, transparent 100%)` (+ optional advisor radial wash). Requires the screen `<main>` to be `background:transparent`. Make the veil **opt-in** (consultant omits it).
3. **`InkTile`** (§5B) — per-element gradient fill + border, right-bleeding matted-transparent `ink-*.png` @0.5 with `mix-blend-mode:normal` + `mask-image:linear-gradient(90deg,transparent…,#000)`, circular hanzi badge (40px grid / 54px featured), tier eyebrow, Cormorant title + italic subtitle.
4. **Bundle 13 `art/` files** into `Elementum_App/public/` (`fhdr-{draw,manual,self,consult,codex}.png`, `ink-{draw,manual,selfreport,consultant,codex}.png`, `guidance-hero.png`, `compat-hero.png`, `cloud-veil.png`); add a path helper alongside `backgrounds.js`. The `ink-*.png` must have **real alpha** (matte background out).
5. **Routing (`App.jsx` ~L505-531):** the 4 content feature routes mount with `bg={SCREEN_BG.guidance}` (full-screen plate). New design replaces that with HorizonHeader + CloudVeilBackground — **drop `bg`** for these routes or it double-stacks. Consultant already omits `bg`.

**Cross-cutting copy fixes:** all 5 feature H1s are currently **34px; design = 30px** (hub hero stays 34px). Each header gains a short colored eyebrow rule + a distinct eyebrow phrase + a one-line subtitle the current headers lack. Note: design eyebrows are set in **EB Garamond** (10px) in the markup despite README §3 saying "Cinzel" — **follow the markup**.

### guidance (hub) — `dashboard/tabs/GuidanceScreen.jsx` — 🔴 REBUILD
- Add CloudVeilBackground + advisor radial wash; `<main>` transparent.
- 268px hero with `guidance-hero.png` (opacity 0.4; `filter:saturate(0.32) sepia(0.2) brightness(1.05)`; radial `mask-image:radial-gradient(135% 94% at 50% 20%,#000 30%,transparent 94%)`; bronze multiply tint).
- Header copy: eyebrow **"Your Guidance"** + red 18×1px rule; H1 **"Paths Forward"** (Cormorant 34px/500); add 13px subcopy (max-width 300).
- "Five practices" mono divider row.
- Featured Draw card: 96px min-height, fire gradient `linear-gradient(135deg,rgba(196,116,90,0.12),rgba(196,116,90,0.03))` + border `rgba(196,116,90,0.32)`, 54px circular 抽 badge, right-bleeding `ink-draw.png`, eyebrow "Today's Rite · {day} day", title 23px, "Draw today's card →" arrow.
- 2×2 grid (gap 11, tiles 128px min-height, radius 16): Energy Manual (**wood**), Self-Report (**water**), AI Consultant (**advisor-purple**), BaZi Codex (**metal**) — per-element gradient + 0.30 border, right-bleeding `ink-*.png` @0.5, 40px circular hanzi badge top-left, tier eyebrow top-right, Cormorant 18px title + italic 12px subtitle. **No CTA arrows / no left accent bar** on grid tiles.
- Subtitles: "Your life, by domain" / "Calibrate your reading" / "Ask anything, anytime" / "The concepts, in plain words".
- **Remove `PremiumBanner`** ("Meet your advisor") — not in design (confirm w/ owner).
- Fix pigment map (current Manual=earth/Consultant=water/Codex=fire → wood/advisor/metal).

### draw — `dashboard/ElementalDrawScreen.jsx` — 🟠 MAJOR
Deck mechanic + reveal flow already match — keep. Replace text header with §5A HorizonHeader: `fhdr-draw.png` (pos 50% 30%), fire tint `rgba(196,116,90,0.16)`; eyebrow "Today's Rite", H1 **"The Daily Draw"** (30px), subcopy "{Element} Day · {deck} deck". Transparent main + CloudVeilBackground; drop plate. Reconcile the Seeker deck-switcher pills with owner (mock omits them). Bundle `fhdr-draw.png`.

### manual — `dashboard/EnergyManualScreen.jsx` — 🟠 MAJOR
Setup content already matches. Add §5A HorizonHeader: `fhdr-manual.png` (pos 50% 26%), wood tint `rgba(122,158,110,0.16)`, eyebrow rule `rgb(96,130,86)`; eyebrow "Your Living Manual", H1 **"Energy Manual"** (30px; current "Set up your Manual" is wrong), subcopy "A reading across your five life domains". Transparent main + CloudVeilBackground; drop plate. Verify input/pill border `rgb(205,190,158)`, input bg `rgba(248,241,225,0.92)`. Bundle `fhdr-manual.png`.

### selfreport — `dashboard/SelfReportScreen.jsx` — 🟠 MAJOR
Purchase/intro body already near-verbatim. Add §5A HorizonHeader: `fhdr-self.png` (pos 50% 20%), water tint `rgba(90,127,168,0.16)`, eyebrow rule `rgb(74,108,150)`; eyebrow "A Quiet Reckoning", H1 **"Self-Report"** (30px; current "Your life context" wrong), subcopy "Tell your readings who you really are". Transparent main + CloudVeilBackground; drop plate. Verify "What it tunes" card bg `rgba(248,241,225,0.92)` / border `rgb(205,190,158)`. Bundle `fhdr-self.png`.

### consultant — `dashboard/AIConsultantScreen.jsx` — 🟠 MAJOR
Chat/streaming flow matches — keep. Add §5A HorizonHeader (advisor variant): `fhdr-consult.png` (pos 50% 34%), advisor-purple tint `rgba(122,94,154,0.16)`, eyebrow rule `rgb(112,86,144)`; eyebrow "Counsel", H1 **"The Consultant"** (30px; current "Consultant" @26px + inline ✦Advisor badge differs), subcopy "Answers grounded in your whole chart". **No cloud-veil here** (chat fills frame). Reconcile exact colors: assistant bubble `rgb(235,229,214)`, input-bar border `rgb(205,190,158)`, input-bar bg `rgb(248,246,240)`, input field bg `rgb(241,233,214)`, disabled send `rgb(216,208,192)`. Bundle `fhdr-consult.png`.

### codex — `dashboard/CodexScreen.jsx` — 🟠 MAJOR
Accordion body + 8 entries + gating already match closely. Add §5A HorizonHeader: `fhdr-codex.png` (pos 50% 16%), metal/slate tint `rgba(139,163,184,0.16)`, eyebrow rule `rgb(110,134,156)`; eyebrow "The Reference", H1 "The Codex" (30px not 34px), subcopy "The eight characters, explained plainly". Transparent main + CloudVeilBackground; drop plate. Verify card bg `rgba(248,241,225,0.92)` / border `rgb(205,190,158)` / hanzi color `rgb(107,83,57)`. Bundle `fhdr-codex.png`.

---

## 4. 🔴➕ Compatibility — rebuild intro + 6 NEW friend screens

**Architecture decision (recommended): keep the whole friend flow INSIDE `CompatScreen` as `phase` states**, not new top-level FLOW routes — so the persistent D13 tab bar stays lit on the "compat" tab (FLOW slugs would render outside `DashboardShell`). Replace the current `intro | input | result` machine with:

```
intro → (Begin the joining) → friend-year → friend-month → friend-day → friend-hour
friend-hour → (general time) → friend-hourwindow ;  (no idea) → friend-current (hourUnknown)
friend-hourwindow → friend-current
friend-current → (run calc) → result
result → (Compare someone else) → reset friendData → friend-year
```
Back-button walks the machine (mirror App.jsx onboarding `back()`, incl. the 4A→4 conditional skip).

**State/data:** add `friendData` (local `useState`, shaped like `INITIAL_BIRTH_DATA`: `{year,month,day,hour,hourWindow,hourUnknown,polarity}` — **no gender, no location, no name**) + `updateFriendData(patch)`.
**Calc (friend-current Continue):** reuse resolver helpers instead of the old hardcoded `gender/longitude`:
```js
calculateBaziChart({ year, month, day,
  hour: resolveHourForCalc(friendData),
  gender: resolveGenderForCalc(friendData),       // derived from polarity
  longitude: resolveLongitudeForCalc(friendData), // Beijing fallback
  location: resolveLocationName(friendData) });
```
**Build approach:** new `CompatFriendSteps.jsx` composing the shared `ScrollPicker` / `ElementSign` / option-tile primitives inside `OnboardingShell` (lower-risk than refactoring QA-locked `OnboardingSteps.jsx`). **One required `OnboardingShell` change:** add an `eyebrow` prop so steps show "Their birth · N of 5" instead of hardcoded "Step N of 7" (L446-458). Keep the design's literal /7 progress widths for pixel parity even though the eyebrow says "of 5".
**Removed:** old `phase==='input'` block (single combined form), its `form` state + `Field`/`inputStyle` helpers, and `DualSeal`.

### compat-intro — `CompatScreen.jsx` (intro) — 🔴 REBUILD
Full-bleed ceremonial hero (README §5D), replacing the eyebrow/title/`DualSeal` landing:
- Hero `margin:-54px -22px 0; height:330px; overflow:hidden`, `compat-hero.png` (`cover; position:50% 32%`); top scrim `linear-gradient(to bottom,rgba(28,24,19,0.34),transparent)` 120px; bottom fade `linear-gradient(to top, rgb(241,233,214) 4%, rgba(241,233,214,0.72) 32%, transparent)` 62%.
- Caption (abs l22 r22 b20): red 18×1px tick `rgb(160,64,48)` + eyebrow **"Your Circle"** (EB Garamond 10px, ls 2.6, `rgb(107,83,57)`, 600); H1 **"Who completes<br>your chart?"** (Cormorant 33px/500, lh 1.04, `rgb(43,39,34)`).
- Intro paragraph (EB Garamond 14px, lh 1.58, `rgb(74,67,59)`): the *hé hūn* rite copy (italic "hé hūn").
- Divider mono eyebrow **"The rite, in three"** (JetBrains Mono 9px, ls 2, `rgb(133,125,114)`) flanked by `rgba(205,190,158,0.7)` hairlines.
- 3 ritual rows (gap 13): 34px circular hanzi badge (border `rgba(107,83,57,0.35)`, bg `rgba(248,244,236,0.6)`, Noto Serif SC 16px `rgb(107,83,57)`) + Cormorant 17px/600 title + EB 12.5px `rgb(133,125,114)` sub: 我/彼/缘 (copy in handoff).
- CTA **"Begin the joining ⟶"**: `margin-top:18px; width:100%; height:52px; radius:999px; bg:rgb(43,39,34); color:rgb(241,233,214)`, **Cinzel** 12px ls 3px 500, shadow `rgba(40,30,20,0.22) 0 8px 20px`. Wire to `setPhase('friend-year')`.
- Footer italic 12.5px `rgb(133,125,114)`: "A two-minute rite · your chart stays private".
- New on this screen: Cinzel font + red accent `rgb(160,64,48)`. Confirm `compat-hero.png` deployable public path.

### friend-year / -month / -day / -hour / -hourwindow / -current — ➕ 6 NEW screens
Each mirrors the matching onboarding step, re-voiced to third person, built on `OnboardingShell` chrome (quiet-paper plate, 3px bronze progress bar). Eyebrow "Their birth · N of 5" (hourwindow = "Their birth · hour unknown"). Exact copy per screen:

| Screen | Reuse | Progress | Question | Subtitle | Writes |
|---|---|---|---|---|---|
| friend-year | `Step1_Year`/ScrollPicker | 14.28% | "When were they born?" | "The year they arrived reveals what they carry / from those who came before." | `friendData.year` |
| friend-month | `Step2_Month` | 28.57% | "Which month?" | "Their month is the season their soul / chose to enter this world." | `.month` |
| friend-day | `Step3_Day` (zero-pad) | 42.86% | "What day?" | "Their day is their core — the essence / of who they are at the deepest level." | `.day` |
| friend-hour | `Step4_Hour` | 57.14% | "Do you know their hour?" | "Their hour reveals how they express / their nature outward." | `.hour`; links "I only know the general time →"→friend-hourwindow, "I have no idea →"→friend-current (hourUnknown) |
| friend-hourwindow | `Step4A_HourWindow` (identical 6 tiles) | 64.28% | "Which part of their day?" | "An approximate window still places / them within a true 时辰." | `.hourWindow` |
| friend-current | `Step6A_EnergyCurrent` | (final) | "Which current moves through them?" | "A quiet follow-up — this sets the direction of / their Life Chapters." | `.polarity` ("I'm not sure"→yang); Continue runs calc → result |

### compat-result — `CompatScreen.jsx` (result) — 🟡 MINOR
Structure already matches (PersonCell ×2, ScoreMedallion, relationship block, reading, share card, "Compare someone else →"). Edits:
1. `calculate()` reads `friendData` via resolver helpers, not `form`.
2. "Compare someone else →" → `setPhase('friend-year')` + reset `friendData`.
3. Friend **name**: the 6-step flow collects no name (old form did). Default `r.name` to a generic label ("Them") — the design's "Mara" is placeholder seed. (Adding a name screen is NOT in the design's 6 steps → out of scope.)
4. Preserve the Free/Seeker branching (teaser+upgrade vs full reading+share) — not shown in the single placeholder frame but must stay.

---

## 5. ⚠️ energy-card — DEFERRED (FACES stays untouched)

**OWNER-RESOLVED 2026-06-25:** do **not** implement the new design's standalone `energy-card` mockup now, and do **not** re-point the route. Live `app-energy` keeps rendering `D13FacesScreen` (App.jsx:558), which stays **completely untouched** and will get its own polish pass later. The catalogue's energy-shelf arrows continue to open this FACES screen (see §2 wiring note). No work this pass.

---

## 6. Tokens & globals

Core token set (paper/ink/bronze/pigments + Deep/seal/advisor), spacing (18-val), radius (6-tier), ease, durations — **all byte-identical** to `src/styles/tokens.js(x)`. Deltas:
1. **`--shadow-tile`** `0 1px 0 rgba(43,39,34,0.04), 0 8px 18px rgba(60,46,28,0.07)` exists in the design root but not in canonical `shadow{}` — add it (it currently lives only in D13 component CSS).
2. D13 semantic colors (`--ghost #B8B0A2`, `--up #4a7a52`, `--down #a85c48`, `--bud/--ally #4A7090`, `--frame #FBF7EC`, `--paper #E4DCC9`, `--cardstock`) live only in component CSS, not the token modules — decide promote vs document-as-local. Not blocking (neither profile nor resonance uses them).

---

## 7. Suggested implementation order

1. **Tokens + asset bundling** (13 `art/` files → public/, `--shadow-tile`, path helper). Unblocks everything.
2. **Shared infra:** `HorizonHeader`, `CloudVeilBackground`, `InkTile`, the `.sp-read` arrow-only fix.
3. **Guidance suite** (hub rebuild + 5 feature retrofits) — largest, all reuse the infra above.
4. **Catalogue** CTA swap.
5. **Compatibility** — `OnboardingShell` `eyebrow` prop → `CompatFriendSteps.jsx` (6 screens) → intro hero rebuild → result rewire → delete old input form.
6. **Minor strings/values:** today h1, profile ×2, resonance ×1.
7. **Owner decision** on energy-card/FACES before touching the Reading→energy route.
8. **Verify** each against the HTML at 390×844, then re-run the capture script for a fresh `current-screens.html`.
