# Elementum app bug check, 2026-10-17

Checked by the route-sweep QA agent against the running dev server at http://127.0.0.1:5173/. The server was already running; I did not start or stop it. Viewport 390×844 (Chromium 141, headless). No app code was edited.

**Verdict: the app runs. 0 page errors, 0 blank screens and 0 confirmed clips. Every scripted interaction worked except the 9 noted below. There are 7 confirmed defects (none of them crashes) and 5 suspects.**

## Code under test

- The audit started on HEAD `7dee6d9`.
- At 03:16 UTC, while the audit was running, another session committed `65e231a` ("Final audit: land 68 small tweaks…", changing content in k2.js and pairs.js). Vite hot-reloaded it.
- I re-ran the selection fixtures, the engine regression, the route sweep and the journey sweep on `65e231a`. Their results did not change.
- The hand walks ran on a mix of the two commits. The change was content-only, so the interaction results are not affected.

## Environment notes (not app defects)

- **Playwright and Chromium versions don't match.** The installed Playwright 1.60 expects Chromium build 1223, but only build 1194 is in /opt/pw-browsers. The project sweeps call `chromium.launch()` with no path, so they would not start as-is.
  - I ran them with `PLAYWRIGHT_BROWSERS_PATH` pointing to a scratchpad folder of symlinks to the installed 1194 headless shell. No tool or app file was changed.
  - My own walk scripts launch `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` directly.
- **External HTTPS fails inside the sandbox.** Chromium does not trust the sandbox proxy's certificate, so fonts.googleapis.com and the Open-Meteo geocoder fail with `net::ERR_CERT_AUTHORITY_INVALID`. This accounts for every console error and failed request I saw.

## 1. Project sweeps

| Tool | Result |
|---|---|
| `qa-route-sweep.mjs` | Ran twice, exit 0 both times. 41 routes × 3 viewports = 123 cells. sweepError 0, fatal 0, blank 0, pageErrors 0, hClip 0, vClip 0, brokenImages 0. Only flags: consoleMsgs 3 and failedRequests 3, all on `step5` (the geocoder blocked by the sandbox certificate; see noise). |
| `qa-journey-sweep.mjs` | Exit 0. 18/18 steps passed in 25.2 s: Scenario A (real onboarding gestures plus the golden 庚 pillar check) and Scenario B (reveal, element cycling, Day Master, tabs, Today drill-downs). The rerun on `65e231a` gave the same result (see the end of this file). No gesture step failed, so no retry was needed. |
| `qa-selection-fixtures.mjs` | Exit 0. All 8 fixtures hold, plus the volume boundaries, the god ledger, M1 metrics (40 pages) and 50 edges. Ran on both commits. |
| `qa-engine-regression.mjs` | Exit 0. Engine output matches the golden fixture (6 cases). Ran on both commits. |

Reports:
- /home/user/Elementum/Elementum_App/tools/qa-output/route-sweep/latest/report.json
- /home/user/Elementum/Elementum_App/tools/qa-output/journey/latest/report.json

## 2. Walking the flows by hand (Playwright at 390×844, page and console errors collected throughout)

### Pass/fail by flow

| Flow | Free | Paid (Seeker; Advisor spot-checked) | Notes |
|---|---|---|---|
| Exemplar ceremony: `__seedExemplar()` → loading → reveal ("The Blade", cast line with CST) → swipe-up dissolve → catalogue (5 nodes, tab bar, no leftover overlay or ghost) | PASS | PASS | Tapping during the 2.8 s Naming fast-forwards it, and the next tap finishes. This is by design. |
| Real onboarding (welcome → wheels → Beijing → gender → skip notifications → reveal, golden pillars) | PASS | n/a | Covered by journey sweep Scenario A. |
| Catalogue: ENERGY MANUAL open/close, its condition pill, the SEEK/EASE pills, 5 manual rows → dot card → close; 4 "words on this page" pills → glossary sheet; glossary "Deeper in the Codex" → app-codex → back | PASS | PASS | |
| Identity card (seal and share button): opens; Copy link shows "Link copied"; Save image downloads `elementum-identity.png`; close with × or scrim | PASS | PASS | The top 48 px of the scrim can't be tapped (see D3). |
| Elemental wheel: every node → dot card → thumbnail → element page (all 10 presets × 5 elements) | PASS | PASS | |
| Element page: hero → THE MECHANISM → back; FUNCTION tile; DOMAINS tile; no horizontal overflow | PASS | PASS | |
| THE FUNCTION: title and definition; THE CHARACTER row (pill, verdict, direction); pill → glossary sheet with the same label → closes; 3 metric bars (levels 1–5); every keyword chip → its sheet (matching pill, passage over 200 characters, one sheet, on-screen) → closes with × and with the scrim | PASS | PASS | 10 presets × 5 elements × 2 tiers. Every chip was enabled and had a passage. |
| Friction page, THE REMEDY: the head names the energy to seek; tapping it opens that energy's page | PASS | PASS | For example, geng Earth → Wood, geng Metal → Fire, ding Fire → Water, ding Wood → Metal. |
| Catalyst page, THE EDGE: 3 domain doors, each → domain sheet | PASS (all doors) | PASS (all doors) | The sheet teaser is garbled on energies with no seat (D1). |
| EDGE on free: "Unlock The Domains" → upgrade sheet opens; domain sheet closes underneath; upgrade closes with ×, "Not now" and the scrim | PASS | n/a | The price on the call to action can't be bought (S1). |
| EDGE on paid: "Read it in The Domains" → THE DOMAINS shows the reading for the word tapped | n/a | **FAIL for 39 of 90 door taps** | D2 |
| THE DOMAINS: first seat open on arrival; every position accordion opens and closes with content; on paid, "The deeper layers" adds text; the god link opens and scrolls to WHO RUNS IT; every WHO RUNS IT row opens and closes; free shows the Seeker lock line and hides the god readings, paid shows them | PASS | PASS | |
| Back navigation inside the journey (elsec → element → catalogue) | PASS | PASS | The browser/hardware back button leaves the reading tab entirely (S2). |
| Day Master (hero arrow) → Birth Chart → Pillar Chart; back-rows; browser back | PASS | PASS | The back-rows are `<div onClick>`, with no button role and no label (D6). The Pillar Chart copy is wrong when the birth hour is known (D5). |
| Upgrade/paywall sheet: opens from Guidance cards, Profile plan row, read-patterns, the EDGE domain sheet and `__openUpgrade`; closes with × / Not now / scrim | PASS | PASS | Escape does not close it (D6). With Advisor, the Seeker card also says "Current plan" (S4). |
| Tabs and Today hub (day/month/year/decade and their back-links) | PASS | PASS | Same on both tiers. |
| Guidance cards: Draw, Manual, Self-Report, Consultant, Codex | PASS | PASS | On free, Manual and Self-Report open the upgrade sheet; on Seeker they open their routes. Consultant opens the upgrade sheet on both (Advisor feature). |
| Codex sections; Draw; Manual (focus chips toggle, Generate); Self-Report; Consultant (context toggle, privacy link, begin) | PASS | PASS | |
| Compat → Begin → friend flow (Back, Cancel, Continue) | PASS | PASS | The ▲/▼ picker arrows sit under the wheel rows (D7). |
| Profile: Update → step5; View birth chart; Edit → step1; plan row → upgrade; Sign in sheet; legal links open /legal#… | PASS | PASS | The TRUE SOLAR time shown is wrong (D4). |
| read-* chain (tengods/forces/chapters/patterns/seasonal/locked prev/next/back), chart-resonance | PASS | PASS | read-elemental's "Back to Readings" lands on a catalogue with no tab bar (S3). |
| app-energymap (retired screen that still loads; it is the post-purchase landing) | PASS | PASS | The spines switch and the Read arrow goes to the catalogue (by design per the App.jsx comment). See S5. |

Totals for the scripted element walk: **2,747 of 2,756 checks passed** across 10 presets × 2 tiers. The 9 failures are all D2. The ceremony and catalogue walk passed 21/21 on each tier. **No page error and no app console error occurred in any walk.** The only console errors were the font and certificate noise.

## 3. Confirmed defects

### D1. Garbled teaser on the EDGE domain sheet when the energy has no seat (medium; free and paid)
- **Where:** app-reading, then a catalyst element with no pillar seat → THE FUNCTION → THE EDGE → any domain door.
- **Seen on:** geng Fire, yi Fire, bing Earth.
- **Steps:** `__seedData('geng')` → wheel Fire node → thumbnail → THE FUNCTION → tap "Career".
- **What happened:** the sheet body reads "Pressure that doesn't grant permission, the trial that forges Fire holds no seat in your pillars; it reaches you through the hidden stems, felt more than placed." Another case reads "Output that flows from you, giving that feels like being Fire holds no seat…".
- **Cause:** `openDomainSheet` (JourneyStage.jsx:357) builds the text as `` `${face.defline} ${elName} holds no seat…` ``. The `TG_DEFLINE` entries (src/content/tgNames.js:18-29) are fragments with no closing punctuation, so the two run together into one broken sentence.
- **Expected:** two separate sentences, for example "…the trial that forges. Fire holds no seat in your pillars…".

### D2. EDGE "Read it in The Domains" often lands where there is no reading for the tapped domain (medium; paid)
- **Steps:** `__seedData('geng'); __setTier('seeker')` → Wood → THE FUNCTION → THE EDGE → Career → "Read it in The Domains".
- **What happened:**
  - The sheet title promises "Career, read from the Steward at the Hour Gate." The landing opens that seat, whose reading says "This position rules Wealth and Family" and has no Career paragraph.
  - On seatless energies the landing is worse. Example: geng Fire → Career/Health/Growth lands on "This energy holds no seat…" with the WHO RUNS IT row collapsed. The god's paid readings there are titled Pressure/Command/Crisis, so the tapped domain appears nowhere.
- **How often:** 39 of the 90 paid door taps across all 10 presets did not reach a `.elpos-domread[data-dom=<word>]` paragraph. 30 of those landed on a seat without the paragraph; 9 landed on a seatless page with no reading at all (geng Fire, yi Fire, bing Earth).
- **Cause:** the EDGE doors use the god's ruling domains (`GOD_RULING_DOMAINS`), but the seat paragraphs and the WHO RUNS IT readings use different domain lists or vocabularies. The fallback is the "first seat" noted in the code comment at JourneyStage.jsx:347-350. The sheet title still says "<word>, read from <seat>" even when that seat does not rule the word.
- **Expected:** land on the tapped domain's reading, or don't offer a door or title that the chart can't fulfil.
- **Screenshots** (scratchpad): `.../walk/out/shots/probe2-geng-wood-Career-landing.png` and `.../walk/out/shots/probe2-geng-fire-Career-landing.png`.

### D3. Fake iOS status bar ("9:41 ●●● ⌃ ▮") shows on real phones on every journey screen (low-medium)
- **Where:** app-reading (catalogue, element, function, domains) and read-elemental, at any width up to 520 px.
- **What happened:**
  - JourneyStage renders `.jny .status2` (JourneyStage.jsx:481). The mobile rule in global.css (lines 25-56) hides `.el-statusbar` and `.reading .status`, with the comment "every mock hides", but has no rule for `.status2`. So the mock bar draws under the real OS status bar. It is visible in every route-sweep screenshot of app-reading.
  - It also sits at z-index 95, above the identity card's `.scov` scrim. Tapping the top 48 px of the scrim does nothing (found by elementFromPoint at (195,20): `DIV.status2`).
- **Expected:** hidden at phone widths, like the other mock bars.

### D4. Profile "TRUE SOLAR" time has the longitude correction backwards (medium; wrong data shown to the user)
- **Steps:** `__seedExemplar()` (Beijing 116.4074°E, 18:00) → reveal → Profile tab.
- **What happened:** Profile shows "TRUE SOLAR 18:14".
- **Expected:** 17:46, the value the engine actually uses. calculator.js:505 computes `hour + (lon − 120)/15`; its comment notes the sign was fixed on 2026-07-09.
- **Cause:** ProfileScreen.jsx:72 still uses the old inverted formula `birthData.hour - (lon - 120) / 15`.
- **Impact:** for births near a two-hour boundary, the displayed time won't match the hour pillar.
- **Related:** with a text-only location (the stem presets, or a typed city with no suggestion picked), the card shows "Location not confirmed — using standard solar time" while also showing a corrected TRUE SOLAR time.

### D5. Pillar Chart copy says the hour is missing when it isn't (low)
- **Where:** app-pillars and chart-reveal, for any chart with a known hour (for example geng 18:00).
- **What happened:** the caption reads "…the Hour pillar completes once your birth time is set." It shows next to a complete 乙酉 hour pillar.
- **Cause:** the text is unconditional at ReadingPillarChartCard.jsx:79 (`hourUnknown` is passed in but not used there).
- **Expected:** show this line only when the hour is unknown.

### D6. Accessibility gaps in navigation and sheets (low)
- The back controls on Day Master and Pillar Chart are `<div class="back-row" onClick>` (ReadingDayMasterCard.jsx:73, ReadingPillarChartCard.jsx:69). They have no button role, no label and no keyboard focus.
- The upgrade sheet does not close on Escape. Tested on free, seeker and advisor.
- The Profile "Daily reading" toggle is a `<button>` with no accessible name; the crawl recorded it as just "button".

### D7. Year/month picker ▲/▼ arrows can't be tapped (low)
- **Where:** compat-friends step 1 and onboarding step1 (the shared ScrollPicker).
- **What happened:**
  - The `previous`/`next` buttons are covered by the wheel's rows; elementFromPoint at each arrow's centre returns the 1993 or 1989 row.
  - Tapping ▼ selects the row underneath, so the year jumps by 2 (1991 → 1989) instead of moving one step.
  - Playwright never finds the buttons themselves actionable.
- **Expected:** the arrows step ±1, or they are removed.

## 4. Suspects (not confirmed as defects; may be by design or need an owner decision)

- **S1. Price mismatch in the paywall.** On free, the domain sheet's button says "Unlock The Domains $9.99/mo" (the Seeker price). The upgrade sheet it opens shows Seeker as "Available after beta" (disabled); the only thing for sale is the Founding Pass at $9 once. Commit 7dee6d9 says The Domains is sequenced for a new tier, so this may be in transition.
- **S2. Browser/Android back leaves the reading.** The element, function and domains sub-screens are internal state, not hash routes. Pressing back on THE FUNCTION goes to the previous route (app-today in my test) instead of the element page.
- **S3. read-elemental's back leaves the user without navigation.** "Back to Readings" shows the catalogue in place, still under `#/read-elemental`, with no tab bar. The read-* chain is only reachable through its own prev/next links, so the impact is small.
- **S4. Advisor sees two "Current plan" labels.** In the upgrade sheet on advisor tier, both the Seeker and Advisor cards say "Current plan" (UpgradeModal.jsx:385). Possibly intended, since Advisor includes Seeker.
- **S5. Content framing on a Balanced chart (xin).** Every page shows the "Balanced" pill and "Keep the mix." But each definition paragraph says "As a catalyst, …", and the core Metal page says "Running thin, strength gives out…". journeyData.js:530 only has catalyst and friction variants, so Balanced charts fall to the catalyst text. This is a content gap, not a code fault.
- **Also observed:** after a Founding purchase, UpgradeModal.jsx:207/220 sends users to `#/app-energymap`. That is the retired ReadingScreen; its Read arrow goes to the catalogue rather than the chosen energy. All its controls work.

## 5. Known noise set aside

- **`ERR_CERT_AUTHORITY_INVALID` on fonts.googleapis.com, and Open-Meteo geocoding failing on `step5`** (route sweep consoleMsgs and failedRequests 3 of 3, plus "[geocoding] searchCities failed" on Profile → Update). The sandbox proxy's certificate isn't trusted by Chromium. The step5 screenshot renders correctly with the accuracy note, and the journey sweep mocks this call and passes.
- **Loading auto-advancing to reveal.** By design.
- **The catalogue bridge buttons ("How does your energy run?", "See the five, placed") have `display:none`.** They are retired, not broken.
- **The first tap on the reveal during the 2.8 s Naming only fast-forwards it.** By design (`ceremonyDone()`).
- **"Dev · Reset & Start Over" uses `window.confirm`**, which Playwright auto-dismisses. Dev-only.
- **Crawl artifacts:**
  - "clickfail" entries on read-elemental in the second crawl pass are buttons on the hidden catalogue screen.
  - Upgrade-sheet carry-over in the first crawl pass came from a hash-only `page.goto` that didn't reload the page. It was fixed and re-run.
- **Conditional onboarding branches, read-locked, and Supabase being anonymous.** None produced errors.

## 6. Artifacts

- Route sweep: /home/user/Elementum/Elementum_App/tools/qa-output/route-sweep/latest/report.json (shots in `shots/`)
- Journey sweep: /home/user/Elementum/Elementum_App/tools/qa-output/journey/latest/report.json
- Walk scripts, JSON results, logs and screenshots (scratchpad; not in the repo): /tmp/claude-0/-home-user-Elementum/3b4796cb-be4f-503e-8cc5-4f44b1a6a522/scratchpad/walk/ (elements.mjs, ceremony.mjs, routes.mjs, probe*.mjs; out/*.json, out/*.log, out/shots/*.png)

## Rerun on 65e231a

- Route sweep: exit 0 (generated 2026-10-17T03:35:59Z). Same flags as the first run: step5 geocoder noise only.
- Journey sweep: exit 0, 18/18 steps passed in 25.1 s.
