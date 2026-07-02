# Elementum — Design Handoff for Implementation

> **What this is:** `Elementum Screens.html` is the complete, pixel-accurate visual reference
> for the Elementum mobile app (BaZi / Five-Element self-knowledge). It renders **37 screens**
> as a static gallery of 390×844 device frames. This README is the spec for translating that
> gallery into production code. Build to **match the HTML exactly** — it is the source of truth.

---

## 0. How to read the reference file

- Open `Elementum Screens.html` in a browser. Each screen is a `<figure>` with a
  `<figcaption>` naming it and a `<code>` slug (e.g. `<code>draw</code>`). Use the slug to
  locate a screen's markup when you need exact values.
- Every screen is a **390 × 844** frame (iPhone logical size). The `.el-frame` collapses to
  full-bleed `100dvh` on real devices / installed PWA (see the `@media (max-width:520px)` block
  in `<head>` — keep that behavior).
- All design tokens live as CSS custom properties in the `:root{}` block at the top of the file.
  **Read tokens from there; do not hardcode hexes.** They mirror to `src/styles/tokens.jsx`.
- Inline styles in the markup are intentional and exact. When a value looks oddly specific
  (e.g. `height:118px`, `opacity:0.92`), it is tuned — preserve it.

---

## 1. App structure — 37 screens

**Onboarding / first run (12)**
`welcome` → `year` → `month` → `day` → `hour` → `hourwindow` (if hour unknown) → `location`
→ `polarity` (gender) → `energycurrent` → `notify` → `notifytime` → `reveal` (identity plate)

**Tab 1 · Readings** (the core)
`catalogue` (Energy Blueprint — dominance wheel + 5 element tiles + Day Master CTA)
`energy-card` · `daymaster` (THE core reading) · `pillars` (八字 four-pillar chart)

**Tab 2 · Today**
`today` (hub) · `day-page` · `month-page` · `year-page` · `decade-page`

**Tab 3 · Guidance** ("Your Guidance / Paths Forward" hub)
`guidance` (hub) · 5 features: `draw` (Elemental Draw) · `manual` (Energy Manual)
· `selfreport` (Self-Report) · `consultant` (AI Consultant) · `codex` (BaZi Codex)

**Tab 4 · Compatibility** ("Your Circle")
`compat-intro` (ceremonial invitation) · Friends onboarding `friend-year` → `friend-month`
→ `friend-day` → `friend-hour` → `friend-hourwindow` → `friend-current` · `compat-result`

**Tab 5 · Profile** ("Your Profile / Settings")
`profile` · `resonance` (chart resonance detail)

Tab bar: 5 tabs, grey→black highlight on active, **no notification dots**.

---

## 2. Design tokens (canonical — from `:root`)

### Paper · Silk · Ink (surfaces & text)
| Token | Hex | Use |
|---|---|---|
| `--cream` | `#F8F6F0` | lightest paper |
| `--silk` | `#F1E9D6` | **primary page background** (`rgb(241,233,214)`) |
| `--silkDeep` | `#ECE2C9` | recessed paper |
| `--silkFold` | `#DDD1B3` | folded/edge paper |
| `--parchment` `--vellum` `--paperHair` | `#EAE5DF` `#DDD8CC` `#CDBE9E` | layered paper tones |
| `--ink` | `#2B2722` | primary text |
| `--inkSoft` / `--inkLight` / `--inkMist` | `#4A433B` / `#857D72` / `#B8AFA1` | secondary→faint text |
| `--inkDeep` | `#1a1815` | max-contrast headings, CTA fill |

### Bronze ramp (metallic accents)
`--bronzeLight #9d8468` · `--bronze #8b7355` · `--bronzeDark #6b5339` · `--walnut #5a4430` · `--gold #D4AF37`

### Five-Element pigments (+`*Deep` companions)
| Element | Pigment | Deep |
|---|---|---|
| Metal 金 | `--metal #8ba3b8` | `--metalDeep #6a849a` |
| Wood 木 | `--wood #7a9e6e` | `--woodDeep #587a4d` |
| Fire 火 | `--fire #c4745a` | `--fireDeep #9e5540` |
| Earth 土 | `--earth #b89a6a` | `--earthDeep #927750` |
| Water 水 | `--water #5a7fa8` | `--waterDeep #3e5f85` |

**Pigment alpha ladder — only these alphas allowed** (DOC5 §3.5.A):
`10`≈6% soft card fill · `1A`≈10% icon-bg tint · `40`≈25% border/chip outline ·
`CC`≈80% eyebrow label text · `100%` glyph/heading on tint.

### Reserved accents
`--seal #A04030` — chop-mark red, **max once per screen** · `--advisor #7a5e9a` — premium/Consultant tier.

### Spacing scale — **only these px values** (anti-pattern: 7,9,11,13,15,17,19,21,24,30,32,40,48,64)
`1 3 4 5 6 8 10 12 14 16 18 20 22 26 28 36 44 56`

### Radius scale (DOC5 §3.5.B) — forbidden: 4,6,8,14,18,20,28
`--r-1` segmented cells · `--r-10` 36×36 icons · `--r-12` standard cards/44×44 · `--r-16` feature cards/84×84 seal · `--r-22` toggle pills/glyph backdrop · `--r-pill 999px` CTAs/chips. (47px/56px reserved for phone frame only.)

### Shadows
`--shadow-card` cardstock lift · `--shadow-cta` primary pill · `--shadow-cta-alt` CTA over imagery · `--shadow-sheet` bottom-sheet · `--shadow-bronze` bronze pill · `--shadow-phone` device frame.

### Motion (DOC5 §4)
`--ease-out cubic-bezier(.22,1,.36,1)` (screen entrances) · `--ease-inout` (progress) ·
durations `--d-fast 150` `--d-medium 220` `--d-slow 400` `--d-ceremony 600`ms.

---

## 3. Typography

Loaded from Google Fonts (see `<link>` in `<head>`):
- **Cinzel** — small caps eyebrows / ceremonial labels
- **Cormorant Garamond** — large display titles (screen H1s)
- **EB Garamond** — body serif, CTAs, list text
- **Noto Serif SC / TC** — Chinese glyphs set in serif
- **Ma Shan Zheng** — brush-script Chinese (decorative)
- **JetBrains Mono** — the gallery's `<code>`/figcaption chrome only (NOT app UI)

Pattern: a **Cinzel eyebrow** (letter-spaced, often pigment-`CC` colored) sits above a
**Cormorant Garamond** title on every page header. Chinese glyphs are decorative ornaments —
always pair with an English `.sr-only` label for accessibility.

### Page-title format (locked)
Every tab header uses the **"Your ___"** convention:
Your Readings · Your Energies: Energy Blueprint · Your Guidance / Paths Forward ·
Your Circle / Compatibility · Your Profile. Keep this casing and structure.

---

## 4. Materials, textures & backgrounds

The app's atmosphere is **ink-wash on warm paper**. Backgrounds are layered, never flat.

### Local art (`screens-v2/art/` — ships with this handoff, 13 files)
| File | Used by | What it is |
|---|---|---|
| `fhdr-draw/-manual/-self/-consult/-codex.png` | 5 Guidance feature headers | ink-wash landscape header thumbnails (paper baked in — see §5 "horizon band") |
| `ink-draw/-manual/-selfreport/-consultant/-codex.png` | Guidance hub tiles | **matted-transparent** ink motifs (sun-over-water, pine, wave, enso, mountains) |
| `guidance-hero.png` | Guidance hub hero | panoramic river-valley landscape |
| `compat-hero.png` | `compat-intro` | pavilion-gazing-across-water ceremonial hero |
| `cloud-veil.png` | feature/hub body backdrop | soft ink-wash mist (from `bg-reveal-04-mist-veil`) |

### Remote CDN assets — base `https://elementum.life/`
These are referenced by URL and **must stay reachable** (or be migrated into the app's asset
pipeline). Three buckets:

- **`/backgrounds/`** — `bg-reveal-01-distant-peaks` · `bg-reveal-02-floating-island` ·
  `bg-reveal-04-mist-veil` · `bg-energymap-01-top-band` · `bg-energymap-02-corner-quartet` ·
  `bg-energymap-03-center-glow` · `bg-onboarding-01-corner-stamp` · `bg-onboarding-04-quiet-paper`
- **`/assets/`** — `bg-onboarding-04-quiet-paper` · `bg-reading-01-side-margins` ·
  `bg-reading-03-watermark-low` · `bg-energymap-02-corner-quartet` · `bg-reveal-04-mist-veil`
- **`/concept-arts/`** — `dotf-metal/-earth/-water/-wood/-fire.png` (five-element dot emblems) ·
  `geng.png` `xin.png` (Heavenly-Stem seals for the Day Master center seal)

`bg-onboarding-04-quiet-paper.png` is the **default paper backdrop** layered under most screens
at low opacity. The opacity ladder for backgrounds is documented in the source repo's
`backgrounds/_opacity-ladder.md`.

---

## 5. Signature blend techniques (preserve these exactly)

These were tuned over many iterations. Each solves a specific legibility-vs-atmosphere problem.

### A. The "horizon band" header (all 5 Guidance feature screens)
The header image lives at full strength up top, then resolves at a **mist-line** into pure paper
where the title sits — this ends the fight between a vivid image and readable text. Structure
(see `draw` header markup), a 216px-tall `overflow:hidden` block over `background:rgb(241,233,214)`:
1. **Image layer** — `background-size:cover; background-position:50% 30%; opacity:0.92; filter:saturate(0.82) brightness(1.02)`
2. **Element tint** — `linear-gradient(180deg, <pigment 0.16> 0%, transparent 44%); mix-blend-mode:multiply` (per-page hue: Draw=fire, Manual=wood, Self=water, Consultant=advisor-purple, Codex=metal/slate)
3. **Top scrim** — 56px `linear-gradient(to bottom, rgba(241,233,214,.5), transparent)` so the back button reads
4. **Bottom horizon** — 118px `linear-gradient(to top, silk 0px, silk 100px, transparent 118px)` — the hard mist-line that lands the image into paper
5. Back button: 34px circle, `rgba(248,244,236,.66)` + `backdrop-filter:blur(3px)`

The `<main>` background is **`transparent`** so the `cloud-veil` body backdrop shows through below.

### B. Matted-transparent ink motifs (Guidance hub tiles)
The hub tile motifs (`ink-*.png`) have their **paper knocked out to real transparency** so they
blend into any tile with `mix-blend-mode:normal` (NOT multiply — multiply on a baked-in paper
crop leaves a visible rectangle). Each tile: ink motif bleeds from the **right** at `opacity:0.5`,
the Chinese character sits in its **own circular icon badge on the left**, text never overlaps
the imagery. If you regenerate motifs, matte the background to alpha first.

### C. Cloud-veil body backdrop (feature + hub screens)
`cloud-veil.png` (mist) sits behind the body at `opacity:0.55`, `background-position:center bottom`,
with a gradient mask `linear-gradient(to bottom, silk 0%, silk 36%, rgba(silk,.45) 62%, transparent 100%)`
so mist rises in the **lower** body behind cards while the **title area stays clean cream**.
Requires the `<main>` to be `transparent`.

### D. Compatibility ceremonial intro (`compat-intro`)
Full-bleed `compat-hero` (pavilion across water) with the hook title **"Who completes your chart?"**,
a 3-step ritual preview, and a "Begin the joining" CTA with clean breathing room above the tab bar.
This is the highest-retention entry point — keep it immersive and unhurried.

### E. Energy Blueprint Day-Master affordance (`catalogue`)
The central Day-Master seal (`geng.png`/`xin.png`) carries a **"Tap to read →" badge**, and a
prominent **"Read your Day Master →"** CTA sits below the dominance wheel. The whole page fits in
one screen **without scrolling** (dominance wheel + 5 element tiles + CTA). The dominance wheel
itself is **locked — do not restyle it.** Read buttons on the 5 tiles are unified to an
**arrow-only** black circular button (28px, white arrow), identical across tiles.

---

## 6. Component patterns

- **Cards / tiles** — cardstock fill `rgba(248,241,225,0.92)`, `--r-12`/`--r-16`, `--shadow-card`.
  "Framed thumbnail + paper footer" is the recurring tile (Reading tiles, Guidance featured card).
- **CTAs** — pill (`--r-pill`), ink-deep fill, EB Garamond, `--shadow-cta` (or `-alt` over imagery).
- **Tab bar** — `rgba(253,253,252,0.85)` + `backdrop-filter:blur(12px)`, grey→black active state.
- **Eyebrow + title header** — Cinzel eyebrow over Cormorant title, repeated on every screen at
  a consistent 54px top inset (so all tab headers line up — see `.d13 .screen-pad` rule).
- **Chinese glyph + sr-only** — decorative glyph always paired with an English screen-reader label.

### Icon sprite (inline SVG `<symbol>` defs)
All UI icons are `<use href="#id">` against an inline sprite. **Defined symbols (19):**
`ico-edit` · `read-chapters` · `read-pillars` · `el-metal/-wood/-fire/-earth/-water` (element
glyphs) · `tab-today/-guidance/-reading/-compat/-profile` (tab bar) · `ico-chev-l` / `ico-chev-r`
(chevrons — **`ico-chev-l` is the back-button glyph**) · `ico-arrow-r` (the arrow-only read
buttons) · `ico-lock` · `ar-up` / `ar-down`.
**Rule:** never reference a symbol that isn't defined — a bad `href` renders an *empty circle*
(this exact bug hit the feature-header back buttons, which referenced a non-existent `#ico-back`;
they now correctly use `#ico-chev-l`). When porting, validate every `<use>` href against the
sprite. Back buttons are 34px circles (`rgba(248,244,236,.66)` + `backdrop-filter:blur(3px)`) and
**stay a back chevron** — don't substitute a label glyph, it breaks the back affordance.

---

## 7. Implementation guidance for Claude Code

1. **Tokens first.** Port the entire `:root{}` block to your styling layer (`tokens.jsx` already
   exists as the JS mirror). Everything references tokens — no ad-hoc hexes.
2. **Match the reference pixel-for-pixel.** Inline style values in the HTML are deliberate. When
   in doubt, open the screen by its `<code>` slug and copy values verbatim.
3. **Respect the locked elements:** dominance wheel, the D13 Reveal→Reading journey, the "Your ___"
   title format, no-dots tab bar, arrow-only catalogue read buttons.
4. **Reproduce the blend techniques in §5** as reusable components (HorizonHeader, InkTile,
   CloudVeilBackground) rather than re-deriving them — they took many iterations to get right.
5. **Assets:** bundle the 13 local `art/` files; for the remote CDN buckets, either keep the
   worker reachable or pull them into your asset pipeline at the same paths.
6. **Responsive:** keep the `@media (max-width:520px)` / `display-mode:standalone` rules — the
   390×844 phone frame must dissolve to full-bleed `100dvh` with safe-area insets on device.
7. **Accessibility:** preserve every `.sr-only` glyph label and `aria-label` on icon buttons.
8. **Motion:** use the `--ease-*` / `--d-*` tokens; screen entrances use `--ease-out`, ceremony
   moments (reveal, compat join) use `--d-ceremony`.

---

## 8. File manifest (this handoff)

```
screens-v2/
├── Elementum Screens.html          ← the 37-screen visual source of truth
├── README — Elementum Design Handoff.md   ← this file
└── art/                            ← 13 local images (see §4)
    ├── fhdr-{draw,manual,self,consult,codex}.png
    ├── ink-{draw,manual,selfreport,consultant,codex}.png
    ├── guidance-hero.png · compat-hero.png · cloud-veil.png
```

Remote assets (CDN, not in zip): `…workers.dev/{backgrounds,assets,concept-arts}/*` — see §4.
