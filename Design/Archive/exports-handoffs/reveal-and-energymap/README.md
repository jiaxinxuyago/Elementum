# Elementum · Reveal + Energy Map (presentation export)

Self-contained design preview of two surfaces from the Elementum app.
Open `index.html` in any modern browser — no install, no server, no setup.

## What's in this folder

```
.
├── README.md           ← you are here
├── index.html          ← the presentation (~460 KB, fully self-contained)
└── docs/
    ├── DOC5_extract.md             — design spec for the two pages (palette, type, motion, layouts)
    └── DOC9_Archetype_Fields.md    — field schema (what data the pages consume)
```

That's everything. No `src/`, no `node_modules/`, no `package.json`. Every JS, CSS, font reference, and PNG is inlined into the single HTML file.

## How to view

1. **Double-click `index.html`** — opens in your default browser.
2. The 庚 (Yang Metal — The Blade) reference chart is auto-seeded. Both pages render with real chart-derived data:
   - DM stem: 庚
   - Composition: Metal 4/8 · Wood 3/8 · Earth 2/8 · Water 1/8 · Fire 1/8
   - Saturation: 50% (Metal count / 8 chars)
3. **Toggle between the two pages** with the floating `Reveal / Energy Map` buttons in the top-right corner.
4. The "Enter Your Dashboard →" CTA at the bottom of Reveal also navigates to Energy Map (production behavior).

> Fonts (EB Garamond, Cormorant Garamond, Noto Serif SC) load from Google Fonts — works offline if cached, but a first online visit is recommended for full typography fidelity.

## The two pages

**Reveal** (`/reveal` in the production app) — the identity-recognition moment after onboarding. Long ceremonial scroll: hero stem mark → "You are…" → archetype name (THE BLADE) → manifesto → three element/stem/polarity badge tiles → essence paragraph → energy blueprint with identity ribbon + composition chart → balance prescription → CTA.

**Energy Map** (`/dashboard/energy-map` in production) — the dashboard reading hub the user lands on after tapping Enter Your Dashboard. Identity ribbon → Energy Blueprint card with inline Primary/Secondary Force sub-cards → Catalyst/Resistance pair → secondary cards (Forging Season, Life Chapters, Chart Patterns, ◆ Seeker locked) → bottom tab nav (Today / Map / Guidance / Friends / Profile).

The two surfaces share visual vocabulary by design — the same `IdentityRibbon` component opens both, the same composition chart renders 5 elements on both.

## For design iteration

- Read `docs/DOC5_extract.md` first — it carries the design intent, timing tables, copy register, motion rules. Section numbers preserved (§9 Reveal, §11 Energy Map).
- `docs/DOC9_Archetype_Fields.md` lists every data field by UI surface with copy caps and tier gating.
- The actual source code for these pages lives in the parent project at `D:\Elementum\Elementum_Project\Elementum_App\src\components\` — this export is a presentation snapshot, not a working code project.

## Provenance

Built from the Elementum project on 2026-04-29 via `vite build --outDir dist-single` with `vite-plugin-singlefile` + post-build PNG inlining. To re-export, return to the parent project and rebuild.
