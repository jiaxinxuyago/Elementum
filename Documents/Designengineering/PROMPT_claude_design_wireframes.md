# PROMPT · Claude Design — Wireframe Dispatch (layout-first pass)

**Goal:** explore 2–3 *structural* layout variations per screen that **improve on the layout that ships today**, then rebuild the chosen one in React with the real aesthetic system. Wireframes decide **structure only** (hierarchy, sectioning, above-the-fold, card vs list vs carousel) — **not** finished visuals. Aesthetics (tokens, ink-wash, Concept Arts) are applied later in code.

**You are NOT designing from scratch.** The app is built and shipping. Two companion files show Claude Design exactly what exists now — always attach them so it iterates on reality instead of guessing:

| File | What it is | When to send |
|---|---|---|
| `DESIGN_STATUS_for_claude_design.html` | Screen-agnostic context: process stage, locked palette/type/scales, aesthetic north star, the **slot vocabulary** (PAGE-BG · SCENE-HERO · TILE · STEM-THUMB · MARK · TEXTURE), and the do-not list. | **Once**, at the start of the engagement. |
| `app-replicas/index.html` (+ `app-replicas/screens/*.png`) | **Full-page screenshots of every current screen and state** — the exact layout to beat. | **Per dispatch** — attach the relevant screen's PNG(s). |

**How to use:** dispatch **one screen per session**. Paste the Global Constraints block + that screen's brief, then attach **(1)** the screen's **current replica PNG(s)** from `app-replicas/screens/`, and **(2)** the listed design-system reference file(s). Frame the ask as: *"This PNG is the current layout. Give me 3 structurally distinct alternatives that beat it on hierarchy / above-the-fold value / scannability — same content, same IA, different skeleton."* Require a slot tag on every box. Pick the strongest, move on.

**Why low-fidelity:** Claude Design is sandboxed (no repo access, SVG-only, off-palette). Keep it on structure; don't let it re-skin or invent visuals you'll discard — the replica already shows the finished aesthetic, so it only needs to rethink *arrangement*. Optional mid-fi pass only after structure is chosen.

---

## GLOBAL CONSTRAINTS (attach to every brief)

- **Viewport:** 390 × 844 (mobile phone frame). Bottom tab bar is 76px, persistent on dashboard screens, icons-only (Today · Guidance · Reading[center] · Compat · Profile).
- **Spacing scale (only these):** 1,3,4,5,6,8,10,12,14,16,18,20,22,26,28,36,44,56.
- **Radius scale (only these):** 1, 10, 12, 16, 22, 999.
- **Type:** Cormorant Garamond (display/titles, weight 400 at hero ≥30px), EB Garamond (body + uppercase labels), Cinzel (CTA caps / pillar labels), Noto Serif SC (hanzi).
- **Palette:** cream/silk paper grounds, warm-black ink, bronze accents, 5 element pigments (metal #8ba3b8 · wood #7a9e6e · fire #c4745a · earth #b89a6a · water #5a7fa8). Attach `tokens.css`.
- **Output:** grayscale/low-fidelity structural wireframe(s). Boxes + labels, no final imagery.
- **Deliverable per brief:** exactly **3 distinct structural variations**, each fits 390px width with no horizontal scroll-trap; annotate the trade-off of each in one line.
- **Design-system references** to attach as needed (rendered HTML):
  - IA / flow + screen inventory → `Design/assets/Legends/legend-screens-amendment.html` (canonical IA) + `legend-screens.html`
  - Card / tile / hero archetypes → `Design/assets/Library/components-library.html` §7 + `Design/assets/Legends/legend-v6-card-archetypes.html` + `legend-v7-ink-wash.html`
  - Primitives (color/type/surfaces) → `Design/assets/Library/primitives-library.html`
  - Tab bar + modals + page-header grammar → `Design/assets/Library/components-library.html` §9/§10/§12

---

## PER-SCREEN BRIEFS

### 1 · Today  (route `/dashboard/`)
**Purpose:** daily-utility habit screen, 0 taps to value.
**Must contain:** decade indicator (age range + "The [Element] Decade", gold rim) · TODAY/MONTH/YEAR tab switcher · [TODAY] date + today's element/stem + 2–3-sentence personalized line + DO THIS list + AVOID list + BEST HOURS (3 windows) + Your Catalyst · [MONTH] 7-col calendar w/ per-day element dot + high-flow windows card · [YEAR] year-energy card + strategic-guidance paragraph + 12-bar energy timeline.
**IA:** dashboard index; the three tabs are in-screen state, not routes.
**Current replica(s):** `screens/26-today-today.png` · `27-today-month.png` · `28-today-year.png` (the layout to beat). **Attach:** those + legend-screens-amendment.html, components-library.html. **Ask:** 3 structures that improve on the current TODAY layout — e.g. (a) hero-led, (b) decade-pinned, (c) scroll-feed.

### 2 · Reading catalogue  (route `/dashboard/reading`)
**Purpose:** the catalogue of readings drawn from the chart (DOC5 §AM.1).
**Must contain:** day-master identity hero (tappable → Day Master detail) · "Readings" eyebrow + "Energy Map →" link · 6 reading tiles (Elemental Nature, Dominant Energies, Forces in Motion, Life Chapters, Daily Reading[Seeker-lock], Pillar Patterns) — each = icon/mark + short label + title.
**IA:** Reading is the center tab; tiles drill to detail pages; "Energy Map →" opens the Reveal-shaped page.
**Current replica(s):** `screens/14-reading-catalogue-seeker.png` + `25-reading-catalogue-free.png` (locked-tile variant). **Attach:** those + legend-v6-card-archetypes.html, components-library.html §7. **Ask:** 3 structures that improve on the current catalogue — e.g. (a) hero + 2-col mosaic, (b) hero + sectioned list, (c) full-bleed hero + horizontal carousels by theme.

### 3 · Reading detail (TEMPLATE)  (routes `read-elemental` / `daymaster` / `tengods` / `forces` / `chapters` / `patterns` / `seasonal`)
**Purpose:** one reading section, long-form.
**Must contain:** picture-rich hero band (element/stem art + eyebrow + title + subtitle, back button overlaid) · body of 2–4 section cards (eyebrow + paragraph(s)) · optional chips row · prev/next sequence strip + "X of N" counter at the bottom. Variant cards by page: Ten Gods adds a weighted role-ring + pillar grid; Life Chapters adds a horizontal decade timeline; Chart Patterns adds pattern badges; Forces adds ↑Catalyst / ↓Resistance pair.
**Current replica(s):** `screens/16-read-elemental.png` (canonical template) + per-page variants `17-read-daymaster` · `18-read-tengods` · `19-read-forces` · `20-read-chapters` · `21-read-patterns` · `22-read-seasonal` · `23-read-locked`. **Attach:** the canonical PNG (+ 1–2 variants) + legend-v7-ink-wash.html (hero treatment), components-library.html §7. **Ask:** 3 structures for the *hero + section rhythm* that improve on the current template — e.g. (a) full-bleed hero, (b) framed hero card, (c) split hero + sticky title.

### 4 · Energy Map  (route `app-energymap`)
**Purpose:** same content as Reveal, minus the first-time CTA (DOC5 §AM.1) — identity + full energy summary.
**Must contain:** day-master hero · identity ribbon (stem · element · polarity) · energy blueprint (segmented element composition) · primary/secondary force · catalyst/resistance pair · secondary section cards.
**Current replica:** `screens/15-energy-map.png` (the layout to beat). **Attach:** that + northstar-anchor.html, legend-screens.html. **Ask:** 3 takes on the single-scroll composition that improve on the current one.

### 5 · Guidance hub  (route `/dashboard/guidance`)
**Purpose:** premium feature hub (DOC5 §12).
**Must contain:** "Guidance" header · vertical stack of 5 feature cards (Elemental Draw[Free] · Energy Manual[Seeker] · Self-Report[Seeker] · AI Consultant[Advisor] · BaZi Codex[Free/Seeker]) — each = icon + title + 1–2 line body + tier badge + locked/unlock state.
**Current replica(s):** `screens/29-guidance-free.png` (locked CTAs) + `30-guidance-advisor.png` (all unlocked). **Attach:** those + components-library.html §7 + §11 (status/lock states). **Ask:** 3 structures that improve on the current hub — e.g. (a) uniform stack, (b) featured-first, (c) grouped by tier.

### 6 · Guidance sub-screens (Codex / Elemental Draw / Energy Manual / Self-Report / AI Consultant)
**Must contain (per):** Codex = accordion entries (definition / explanation / your-chart reference); Elemental Draw = fanned deck → drawn pair → flip-reveal card; Energy Manual = setup form → 5 domain tabs → 3 sections each; Self-Report = single-select + multi-select + textarea + save; AI Consultant = context bar + chat history (user/assistant bubbles) + input.
**Current replica (one per sub-screen):** `screens/31-codex.png` · `32-draw.png` · `33-manual.png` · `34-selfreport.png` · `35-consultant.png`. **Attach:** the relevant sub-screen's PNG + components-library.html §5 (forms) + §10 (modal/sheet). **Ask:** 2 structures each that improve on the current one (these are more functionally constrained).

### 7 · Friends / Compatibility  (route `/dashboard/friends`)
**Must contain:** intro (dual-seal visual + CTA) · input form (name, birth date, optional hour, energy-current toggle) · result (you×them element grid + relationship archetype + [Seeker: % + reading + share card] / [Free: teaser + upgrade]).
**Current replica(s):** `screens/36-compat-intro.png` · `37-compat-input.png` · `38-compat-result-seeker.png` · `39-compat-result-free.png`. **Attach:** the result PNGs (38/39) + legend-screens-amendment.html, components-library.html. **Ask:** 3 structures for the *result* surface specifically that improve on the current one (the % + archetype + reading + share card stack).

### 8 · Profile  (route `/dashboard/profile`)
**Must contain:** birth-data card (date, time, TST, location, energy current) + completion prompts · notifications card (toggle + time) · account card (tier pill + manage + sign out) · dev card (hidden in prod). "The chart is the profile" — intentionally minimal.
**Current replica:** `screens/40-profile.png` (the layout to beat — keep it minimal). **Attach:** that + components-library.html. **Ask:** 2–3 structures that improve on the current Profile without growing it into a settings hub.

### 9 · Birth Chart Raw Data  (route `chart-reveal`) & Chart Resonance  (route `chart-resonance`)
**Raw chart must contain:** 4-pillar (or 3-pillar) grid — Year/Month/Day/Hour columns, each 天干 over 地支, element-colored, day pillar highlighted; legend. **Resonance must contain:** intro → 3 portrait-match rounds (question + options) → reveal (discovered 时辰 + confidence + apply CTA).
**Current replica(s):** raw chart `screens/24-chart-reveal-rawchart.png`; resonance `41-resonance-intro.png` + `42-resonance-result.png`. **Attach:** the relevant PNG(s) + legend-screens.html. **Ask:** 2 structures each that improve on the current layouts.

### (Optional) Pre-dashboard: Welcome / Onboarding / Loading / Reveal
Already built; include only if you want to explore alternates. **Current replica(s):** `screens/01-welcome.png` → `13-reveal.png` (welcome · onboarding steps 1–7 incl. conditional branches · loading · reveal). **Attach:** the relevant PNG(s) + legend-patterns.html (welcome/onboarding/loading) + legend-screens-amendment.html (Reveal §A1).

---

## DISPATCH DISCIPLINE (hard-won, §7 handoff)
- Send `DESIGN_STATUS_for_claude_design.html` **once** at the start (screen-agnostic context: locked system, north star, slot vocabulary). Don't re-paste it every dispatch.
- One screen per session; each ask smaller than the last failed one.
- Quantifiable acceptance ("3 distinct structures, fits 390px, ≤2s to read the hierarchy, every box slot-tagged") — never "polished".
- Always upload the screen's **exact replica PNG(s)** from `app-replicas/screens/` (the current layout to beat) + the listed reference HTML; local paths are labels to a sandboxed tool, so the actual image must be attached.
- Frame it as *improve on this real layout*, not *design from scratch* — same content + IA, new skeleton.
- No hedge/either-or options — it takes the easy off-ramp.
- Keep the attached DOC5 fresh (must contain §AMENDMENT / §AM.10).
- After picking a structure: skin it in code with `ASSET_MAP_concept_arts.md` (which painterly asset fills each slot).
