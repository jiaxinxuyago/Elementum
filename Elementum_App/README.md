# Elementum — Vite + React app

The production app for **Elementum**, a personal-energy reading product built on the BaZi (八字 / Four Pillars) tradition. This folder is the **runtime source of truth** — anything shipped to a user runs from here.

For the design rationale, content authoring rules, and the Phase 2 extraction roadmap, read `../Reading/Documents/REA_05_Generation_Architecture.md`, `../Design/Documents/DES_04_App_Design.md`, and `../Operations/Development/DEV_02_Code_Architecture_and_Migration.md` (registry: `../Operations/README.md`), plus the migration notes in `../archive/legacy-monolith/README.md`.

## What's in here

```
Elementum_App/
├── src/
│   ├── App.jsx                  ← flow state machine (Welcome → Onboarding → Loading → Reveal)
│   ├── components/
│   │   ├── onboarding/          ← WelcomeScreen, OnboardingShell, OnboardingSteps
│   │   ├── LoadingScreen.jsx    ← runs calculateBaziChart + 2.5s dwell
│   │   ├── RevealScreen.jsx     ← four-section continuous-scroll reading
│   │   └── dev/DevBar.jsx       ← dev-only sidebar (tier switch, jump-to, seed presets)
│   ├── content/
│   │   ├── archetypeSource.js   ← single source of truth for stem + TG card data
│   │   └── STEM_CARD_DATA.js    ← 150 variant entries (15 authored, 135 to generate)
│   ├── engine/calculator.js     ← pure-JS BaZi calculator (extracted from the engine)
│   ├── store/chartContext.jsx   ← React Context for birthData + computed chart + tier
│   ├── services/geocoding.js    ← Open-Meteo city lookup for Step 5
│   ├── styles/tokens.jsx        ← Ink & Pigment palette + shared SVG primitives
│   └── main.jsx                 ← React 18 + Vite entry
├── public/assets/               ← ink-wash PNGs, fonts, etc.
├── index.html                   ← Google Fonts + global styles + #root
└── vite.config.js
```

## Running

```bash
npm install
npm run dev          # Vite dev server on :5173
npm run build        # production bundle
```

The dev server respects URL hashes — `#/welcome`, `#/step3`, `#/reveal`, etc. are deep-linkable for design iteration. The DevBar (only visible in `import.meta.env.DEV` and viewports ≥ 720px wide) sits beside the phone-frame and exposes:

- **Pricing tier switcher** (Free / Seeker / Advisor)
- **Birth chart + birth data summary** (live readout of `useChart()`)
- **Seed presets** — `庚 Blade` (DEV_01 reference user) and `癸 Rain` for instant Reveal testing
- **Jump-to-screen pills** for every step in the flow
- **Reset & regenerate** to clear chart state and return to Welcome

## Phone-frame context

Per DES_04 §6 the runtime viewport is 390×844 (iPhone 14 Pro). On desktop, `App.jsx`'s `PhoneFrame` wrapper centers a 390×844 frame with bronze-shadow and `borderRadius: 40`. On mobile viewports the frame fills the screen.

## Where state lives

| Concern | Location |
|---|---|
| Birth data (year/month/day/hour/location/gender/polarity/notify) | `store/chartContext.jsx` → `birthData` |
| Computed chart (DM, pillars, elements, tgPattern, archetypeKey) | `store/chartContext.jsx` → `chart` |
| Pricing tier (free / seeker / advisor) | `store/chartContext.jsx` → `tier` |
| Current screen | `App.jsx` `useState` + `window.location.hash` |
| Reading copy (essence, manifesto, slogan, …) per stem | `src/content/archetypeSource.js` (imported as `STEM_BASELINES`) |

## Recent design decisions worth knowing about

- **Reveal Identity composition (2026-04-24, DES_04 §9 v1.6 / DEV_02 v3.2)** — the brushed `ArchetypeSeal` was removed from RevealScreen. In its place a `<HeroStemMark>` renders the painted stem icon (BrushJian for 庚) at hero scale, no ring, with negative top margin so the icon pierces THROUGH the ink-wash mountain band. The single Identity token pill became three flat silk badge tiles (Element / Stem / Polarity). See DEV_02 "Phase 1 component additions" for authoring rules — these must NOT regress in future edits.
- **Section background** — `RevealScreen.jsx` uses one flat `#EFE5CC` silk fill across the full scroll height. Earlier iterations layered a `SilkPaper` SVG on top and produced a hairline at the section seam.
- **Step 7A** — the explicit reminder-time picker uses `visibleRows={3}` (compact ScrollPicker) with no quick-set chips per the simplification request.
- **Step 4** — three-tier hour input (exact / approximate 6-window / unknown) routes through `resolveHourForCalc()` in `chartContext.jsx`. Approximate windows use midpoints for the v1 calculator; `birthData.hourUnknown` lets surfaces hide hour-pillar UI.

## Phase 2 — what's still to come

The dashboard layer (Today / Energy Map / Guidance / Connect / Me) was REBUILT natively in `src/components/dashboard/` — the old extraction plan from the legacy monolith is superseded (see `../archive/legacy-monolith/README.md` and DEV_02 for the history). The prototype `Elementum_Engine.jsx` is archived there for reference only; nothing remains to extract from it.

## Deploying elementum.life

The live site is a Cloudflare Worker serving `dist/` as static assets (see
`wrangler.jsonc`). Deploys are automated: `.github/workflows/deploy.yml` builds
the app and runs `wrangler deploy` on every merge to `main` that touches
`Elementum_App/`, authenticated by the `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` repository secrets. elementum.life is the only
deliverable address: the app Worker has no workers.dev or preview URL, and
the GitHub Pages copy of the repo (jiaxinxuyago.github.io/Elementum, which
published the raw `main` tree, never the app) is retired (owner 2026-09-15;
Settings → Pages → Source: None). Full address inventory: INF_01 §10.0.
Manual deploy: `npm run build && npx wrangler deploy` from this folder.

## The dev / staging site — dev.elementum.life

A second Worker, `elementum-dev`, serves a build made with `VITE_DEVTOOLS=1`
(see `src/devtools.js`): the DevBar (Chart + Schema tabs) and the
`window.__seedData` / `__goto` / `__setTier` QA hooks are ON, the page is
`noindex`, and the PWA installs as "Elementum Dev". It exists so cloud
sessions, which have no local dev server the owner can open, get a live
testing surface. `.github/workflows/deploy-dev.yml` builds and runs
`wrangler deploy --env dev` on every push to the `dev` branch that touches
`Elementum_App/`. The address is **https://dev.elementum.life** (custom
domain attached in the Cloudflare dashboard, like elementum.life on the prod
Worker; the auto workers.dev URL is retired with `workers_dev: false`).
The prod build never sets the flag, so elementum.life carries none of this.
Manual dev deploy: `VITE_DEVTOOLS=1 npm run build && npx wrangler deploy --env dev`.

### The standard change workflow (owner ruling 2026-09-15)

Three lanes, one deliverable:

| Session | Test on |
|---|---|
| Cloud session (claude.ai/code) | **https://dev.elementum.life** (push to `dev`) |
| Local session (the laptop) | **localhost** (`npm run dev`; the DevBar is on under vite dev) |
| Final deliverable, always | **https://elementum.life** (push to `main`) |

The `dev` branch is the staging lane; `main` is the release lane. Every
app-touching change travels the same road, from a laptop or a cloud session
(a local session may skip step 2, since localhost already gave it the DevBar):

1. Run the local gates (lint, voice audit, station sync audit, journey sweep,
   build) on the branch you are working on.
2. Push the commit to `dev`. The deploy-dev workflow rebuilds the staging
   site within ~2 minutes; reload dev.elementum.life twice (PWA autoUpdate)
   and test with the DevBar / QA hooks.
3. Push the **same commit** to `main` (fast-forward; `dev` never carries
   commits that `main` will not get). The deploy workflow rebuilds
   elementum.life.
4. Confirm on elementum.life after two reloads.

Doc-only changes (no `Elementum_App/` files) can go to `main` directly —
neither workflow triggers. If `dev` ever diverges from `main` (an experiment
that was not promoted), reset it: `git push origin main:dev --force-with-lease`
is the sanctioned reset, since `dev` holds no history of its own.
The full record is INF_01 §10.
