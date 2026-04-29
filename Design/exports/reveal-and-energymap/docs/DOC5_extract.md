# DOC5 Extract — Reveal + Energy Map (for design iteration)

_This is a focused extract from `Documents/Designengineering/DOC5_App_Design.md` containing the sections directly relevant to the Reveal and Energy Map screens. Section numbers preserved for cross-reference._

_Original full DOC5 lives in the parent project. If you need adjacent context (Welcome §6, Loading §8, Today §10, etc.), pull from there._

---

## §2 — Visual Identity System

### Color palette (LOCKED)

**Foundation:**

| Role | Name | Hex | Use |
|---|---|---|---|
| Background | Cream | `#F8F6F0` | Primary screen background |
| Background elevated | Parchment | `#EAE5DF` | Cards, elevated surfaces |
| Background deep | Vellum | `#DDD8CC` | Header sections, day master pillar |
| Primary text | Warm black | `#2C2825` | All primary content |
| Secondary text | Faded ink | `#5C554D` | Body paragraphs, descriptions |
| Tertiary text | Muted ink | `#6f6b66` | Labels, timestamps, secondary UI |
| Emphasis text | Deep ink | `#1a1815` | Hero moments only |

**Accent system:**

| Role | Name | Hex | Use |
|---|---|---|---|
| Accent light | Light bronze | `#9d8468` | Section labels, secondary CTAs |
| Accent mid | Bronze | `#8b7355` | Active states, progress, highlights |
| Accent dark | Deep bronze | `#6b5339` | Primary CTA background |
| Accent deepest | Walnut | `#5a4430` | Hover states, pressed CTAs |
| Gold highlight | Gold | `#D4AF37` | Navigation active indicator, special moments |

**Element colors (LOCKED — from Doc 2 §2):**

| Element | Display | Hex | Deep variant | Deep hex |
|---|---|---|---|---|
| Metal | 金 | `#8ba3b8` | — | `#6a849a` |
| Wood | 木 | `#7a9e6e` | — | `#587a4d` |
| Fire | 火 | `#c4745a` | — | `#9e5540` |
| Earth | 土 | `#b89a6a` | — | `#927750` |
| Water | 水 | `#5a7fa8` | — | `#3e5f85` |

**Borders and surfaces:**

| Role | Hex | Notes |
|---|---|---|
| Border standard | `#D5CDBD` | Card borders, dividers |
| Border light | `#E5DFD1` | Subtle separators |
| Border focus | `#8b7355` | Input focus ring |
| Day Master border | `#584A3E` | The pillar highlight — never used elsewhere |

### Why this palette works

The paper and bronze palette is not decorative — it is functional. The warmth of `#F8F6F0` against black text reads as an aged document without any actual texture required. The bronze accent system provides a single-hue hierarchy (light → dark) that guides the eye without introducing hue conflicts. The element colors are desaturated enough to work as data colors on the warm background without reading as garish.

Do not introduce new colors without updating this section. Every new color decision creates a token maintenance cost.

---


## §3 — Typography

### Font stack

| Role | Font | Fallback | Weight | Use |
|---|---|---|---|---|
| Hero titles | Cormorant Garamond | Georgia, serif | 400–600 | Archetype name, large titles (38px+) |
| Body serif | EB Garamond | Georgia, serif | 400–500 | All reading content, body paragraphs |
| Labels/UI | EB Garamond | Georgia, serif | 500 | Section labels (uppercase, tracked) |
| Chinese glyphs | Noto Serif SC | serif | 400–600 | Stem characters, pillar characters |
| Chinese brush headers | Ma Shan Zheng | cursive | 400 | Screen titles (八字排盘, 元素), used sparingly |
| Architectural labels | Cinzel | serif | 500 | Pillar type labels (YEAR, MONTH, etc.) |

**Load order:** EB Garamond and Cormorant Garamond are the critical fonts — preload these. Ma Shan Zheng is decorative — load async, font-display: swap.

### Type scale

| Size | Use | Line height |
|---|---|---|
| 40px | Chinese brush title headers | 1.2 |
| 38px | Archetype name (Cormorant) | 1.1 |
| 32px | Screen section titles | 1.3 |
| 24px | Card headers, sub-titles | 1.4 |
| 18px | Section headings | 1.5 |
| 16px | Body text, reading paragraphs | 1.8 |
| 15px | Secondary body, card descriptions | 1.7 |
| 14px | Labels, section eyebrows | 1.5 |
| 13px | Helper text, counts, timestamps | 1.5 |
| 11px | Navigation labels, micro-labels | 1.4 |
| 10px | Tracking labels (widest letter-spacing) | 1.4 |

### Label convention

Section labels are always: uppercase · EB Garamond · 10–11px · letter-spacing 2–3px · tertiary color.

Example: `"YOUR ELEMENTAL NATURE"` — this is the standard eyebrow format.

#### Reading page section label standard (locked)

All section label headings within the Elemental Nature reading page (and any future reading pages) must follow this exact spec — no exceptions:

| Property | Value |
|---|---|
| Font | EB Garamond |
| Size | 10px |
| Letter spacing | 2.5px |
| Transform | uppercase |
| Color | element color at 80% opacity (`${color}80`) |
| Margin bottom | 14px |

**Applies to:** "THE ELEMENT", "YOUR NATURE", and all future section labels within reading page cards. This ensures visual consistency as the reading system scales to more sections and all 10 stems.

---


## §4 — Motion System

### Guiding principle

Motion communicates hierarchy and personality — it is never decorative. The reveal sequence at onboarding communicates depth (the chart came from something real). The tab transitions communicate spatial structure. Loading states communicate that calculation is happening.

All motion respects `prefers-reduced-motion`. Every animated element must have a static fallback.

### Easing curves

| Name | CSS | Use |
|---|---|---|
| Ease out | `[0.22, 1, 0.36, 1]` | Most screen entrances, content reveals |
| Spring | `{ type: spring, stiffness: 300, damping: 25 }` | Navigation indicator, identity seal bounce |
| Ease in-out | `ease-in-out` | Progress bars, element composition bars |
| Linear | `linear` | Canvas particle animations |

### Standard animations

**Screen entrance (all content):**
```
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
duration: 0.6–0.8s
easing: [0.22, 1, 0.36, 1]
```

**Staggered children (card lists, element bars):**
```
delay: i * 0.08–0.12s per item
base delay: 0.2s after parent
```

**Scroll-triggered reveals (Reveal screen sections):**
```
whileInView: { opacity: 1, y: 0 }
viewport: { once: true, margin: "-80px" }
```

**Element composition bars:**
```
initial: { width: 0 }
whileInView: { width: targetWidth }
duration: 0.8s, delay: 0.2 + (i * 0.1)
easing: easeOut
```

**Tab switching:**
```
Fade current: 150ms
Fade in next: 150ms (starts at 100ms)
Layout animation: spring for the active indicator
```

**Primary CTA button:**
```
hover: { scale: 1.02, y: -1 }
tap: { scale: 0.98 }
boxShadow: subtle → +4px on hover
duration: 200ms
```

**Identity seal (archetype icon at reveal):**
```
initial: { scale: 0.5, rotate: -5 }
whileInView: { scale: 1, rotate: 0 }
type: spring, bounce: 0.5
```

---


## §9 — Reveal Screen

**Route:** `/reveal`
**Purpose:** The product's most important screen. The identity recognition moment.

### Layout — three sections, one continuous scroll

The Reveal screen is intentionally long — each section gets near full viewport height and triggers as the user scrolls. The user is meant to spend 60–90 seconds here, not 10 seconds. This is where the emotional connection forms.

The traditional 八字 Four Pillars grid is **not shown on the Reveal screen.** Raw chart data is accessible separately via `/chart-reveal` (see §11). Western users do not need to decode Chinese characters to feel the depth of their chart — they need the identity, in language they already speak. The Reveal screen delivers that directly.

```
SECTION 1 — WHO YOU ARE (full viewport)
  Hero stem mark — large painted stem icon (BladeJian for 庚, etc.)
    centered, NO ring/seal, positioned to pierce through the
    ink-wash mountain band (tip above peaks, hilt above eyebrow)
  "You are..."
  THE BLADE  (archetype name, 44px Cormorant)
  Brush underline
  Manifesto line 1 ("Precision before intention")
  Three flat silk badge tiles — Element · Stem · Polarity
    (Metal crescent · 庚 GENG · Yang taichi)
  Archetype essence paragraph
  ↓ scroll hint

SECTION 2 — YOUR ENERGY BLUEPRINT (partial viewport)
  "YOUR ENERGY BLUEPRINT"
  Element composition bars (5, animated fill)
  Missing element callout (if present)

SECTION 3 — YOUR PRESCRIPTION (partial viewport, conditional)
  Shown only when a missing element exists
  "WHAT BALANCES YOU"
  Missing element prescription card

SECTION 4 — CTA
  "Enter Your Dashboard →"
  Navigates to /dashboard/energy-map (Energy Map tab)
  First session only — subsequent opens land on Today tab
```

### Section 1: Identity

This is the recognition moment. The Reveal screen mounts ~850 ms after the Loading screen begins its exit (see §8 — ceremonial handoff). From mount, identity content arrives in a deliberate staggered sequence — the blade leads, text follows, chips land last. The 200 ms intervals between text beats sit above the perceptual threshold so each arrival reads as a discrete event, not a continuous fade.

**Timing table** (delays measured from the moment Reveal mounts; all transitions use `cubic-bezier(0.22, 1, 0.36, 1)`):

| Element | Delay | Duration | Motion | Notes |
|---|---|---|---|---|
| Mountains (ink-wash band) | 0 ms | 700 ms | opacity 0→1, no rise | Atmospheric bleed, not drift |
| Hero stem mark (blade) | 100 ms | 1000 ms | opacity 0→1, blur 6 px → 0, translateY 4 px → 0 | The blade gets 600 ms of solo screen time before any text — it earns its presence. The blur ramp simulates wet-ink-drying-into-silk |
| "You are…" eyebrow | 700 ms | 350 ms | opacity 0→1, translateY 6 px → 0 | |
| Archetype name (h1) | 900 ms | 450 ms | opacity 0→1, translateY 10 px → 0 | Larger lift matches its visual weight |
| Brush underline | 1250 ms | 350 ms | opacity 0→1, scaleX 0→1 from left origin | Draws left-to-right like a brush stroke being painted in time |
| Manifesto line 1 | 1500 ms | 400 ms | opacity 0→1, translateY 6 px → 0 | |
| Element chip | 1800 ms | 350 ms | opacity 0→1, translateY 8 px → 0 | |
| Stem chip | 1920 ms | 350 ms | opacity 0→1, translateY 8 px → 0 | 120 ms after element chip — chips land as a coordinated unit |
| Polarity chip | 2040 ms | 350 ms | opacity 0→1, translateY 8 px → 0 | |
| Essence paragraph | 2300 ms | 400 ms | opacity 0→1, translateY 6 px → 0 | Anchors the bottom 400 ms after the chips — the "and finally" |

Total entrance window: ~2700 ms from Reveal mount. Combined with the 850 ms loading-exit + silk-pause, the full ceremony from "Calculating your chart…" to fully-rendered Identity is ≈ 3.5 seconds. This is substantial — but appropriate for the most emotionally loaded moment in the product.

**Implementation:** `RevealScreen.jsx` exposes an `ENTRANCE` constant table keyed by element name (`mountains`, `blade`, `eyebrow`, `archetype`, `underline`, `manifesto`, `chip0`, `chip1`, `chip2`, `essence`) and an `entrance(mounted, key, opts)` helper that returns `{opacity, transform, transition, willChange}` styles. A `mounted` boolean flips from `false` to `true` via two consecutive `requestAnimationFrame` calls in a `useEffect` so the initial DOM is committed in the OFF state before the transition fires (without the double-rAF, React batches the initial render with the state flip and the "from" frame is never painted → animations don't run).

**Why these specific numbers:**
- *200 ms intervals between text beats* — above the ~150 ms perceptual threshold so each arrival reads as a discrete event
- *120 ms intervals between chips* — faster, because the chips are visually a unit (one row, three identifiers)
- *1000 ms blade duration* — long enough that the ink-bleed feels like a brush stroke drying, not a fade
- *400 ms essence delay after final chip* — gives the chip strip time to "land" before the essence anchors the composition

**Hero stem mark (replaces ArchetypeSeal):** A large, dominant painted stem icon — *no circle, no ring, no enclosing seal.* Centered in the section. Sized ~280px tall and positioned with a ~40px negative top margin so the tip pierces ABOVE the mountain peaks while the body of the icon descends THROUGH the mountain band; the hilt/base rests just above the eyebrow line. The silk landscape and the archetype's mark read as a single painting. The mark itself is per-stem (see §20 Asset Library — BladeJian for 庚, OakArchetype for 甲, etc.) rendered in `INK` rather than element pigment, so the painted iron / wood / fire stays Wabi-sabi monochrome and element pigment is reserved for the chip strip below. Implementation: `<HeroStemMark stem={dmStem} element={dmElement} size={280} />` → `<StemSign>` dispatcher → `<BrushJian>` (or future per-stem painted SVGs).

**Archetype name:** Cormorant Garamond, 44px, weight 600, color `#5a4430` (WALNUT), letter-spacing 1px, text-shadow `0 2px 4px rgba(139,115,85,0.15)`.

**Manifesto line 1:** Cormorant Garamond italic, 22px, weight 500, color `INK_SOFT`, letter-spacing 0.3px, line-height 1.3, max-width 320px. The single-sentence stem slogan ("Precision before intention" for 庚 Blade) — first half of `identity.manifesto` split on ` · `.

**Three badge tiles (replaces single token pill):** Stacked rounded-square buttons, 84×84, `borderRadius: 16`. Three chips, gap 12px:
- **Element chip** — `<ElementSign>` (line iconography: Metal crescent / Wood tree / Water waves / Fire triangle / Earth square) in element pigment, label = element name.
- **Stem chip** — Chinese stem character (`庚`, `乙`, …) in `Noto Serif SC`, 26px, in element pigment, label = pinyin (`GENG`, `YI`, …).
- **Polarity chip** — `<YinYangGlyph polarity={dmPolarity}>` in element pigment, label = `Yang` or `Yin`.

Tile background: flat `rgba(248,241,225,0.92)` silk fill (the same tone as `deckleCard` surfaces — Energy Blueprint card, etc.). NO gradient, NO inset highlight, NO inner ring. One hairline border in `PAPER_HAIR` that warms to `${elementPigment}55` on hover; one subtle 1px shadow that becomes a soft `${elementPigment}22` glow on hover. The tiles are sibling silk pieces with the cards below — the painted hero mark above carries the visual weight; the chips are quiet identifiers.

**Why three chips, not one pill?** A pill ran the three identifiers together as a string (`庚 · Yang Metal · Blade`), which made the stem character compete with the archetype name. The three-chip layout separates the *element family*, the *stem letter*, and the *polarity* into discrete tap targets — each will open its own knowledge popup in Phase 2 (DOC5 §17 popup data contracts: `ELEMENT_KNOWLEDGE`, `STEM_KNOWLEDGE`, `POLARITY_KNOWLEDGE`).

**Section composition:** The section uses `padding: '90px 32px 120px'` and `justifyContent: 'flex-start'`. The `HeroStemMark` is the first child with `marginTop: -40` so the blade tip rises into the mountain band; everything else follows in document flow. Mountains paint at `zIndex: 1` (absolute, top: 20, height: 260, masked-fade at the bottom); section content lives at `zIndex: 10`, so the painted mark renders ABOVE the mountain wash.

**Background:** A single flat `#EFE5CC` silk fill spans the entire scrollable content (NOT the layered SilkPaper SVG, which only covers one viewport and produced a hairline at the section seam in earlier iterations).

### Section 2: Energy Blueprint

> **v1.8 update (2026-04-29).** Section 2 now opens with an **identity ribbon + saturation reading** above the composition bars, and the bars use **segmented-block fills** (8 discrete cells per row) instead of continuous bars. The denser visualisation is a deliberate echo of the dashboard's Energy Map, introducing the visual vocabulary the user will read fluently throughout the app. Forces, Catalyst, Resistance still **do not** appear on Reveal — those are dashboard territory (§11).

**Identity ribbon** (new) — sits above the composition bars, single row:
- Stem character in a small framed-square seal (44×44, `bg: rgba(248,241,225,0.92)`, 1px `PAPER_HAIR`, radius 12, character in element pigment, 22px Noto Serif SC)
- Element label (EB Garamond italic 16px `INK`)
- Two state chips ("Overpowering" / "Concentrated" / "Balanced" / "Open" / etc.) — derived from `dmStrength` band, in `INK_LIGHT` 11px uppercase tracking 0.18em, hairline `PAPER_HAIR` border, transparent fill
- Saturation percent (right-aligned, `${dmElementColor}` 14px tabular)
- Below the row: italic 1-sentence saturation reading from `IDENTITY_SATURATION_READING[stem][band]` (12.5px italic `INK_SOFT`, max-width 320px, line-height 1.5)
- Small saturation bar (h-1.5, segmented like the composition bars below, fills to saturation%)

**Composition bars** (revised — segmented blocks, not continuous fills):
- 5 rows, sorted highest count first. Same data as before (counts out of 8).
- Each row: element line-icon (20px in element pigment) → element name (EB Garamond 15px `#5C554D`) → 8 discrete cells (each 22×8, gap 3px), filled cells in element color, empty cells in `#E5DFD1` → count number on right (13px `#6f6b66`)
- Filled cells animate from 0 → `count` on scroll-enter, staggered 60ms per cell (so a Metal=4 row paints cell-by-cell over 240ms — feels like an abacus settling, not a bar growing)
- Visual rationale: continuous bars read as "percentage" / "progress"; segmented cells read as "count" / "tally" — closer to how 八字 actually works (you literally count characters)

**Missing element:** count shows `0`, all 8 cells render empty in `#E5DFD1`, missing element callout card activates below.

**Missing element callout card:** Background `${elementColor}10`, border `${elementColor}40`, rounded-xl, p-5. Shows element icon, "Your [Element] is missing", and the missing element paragraph from the engine. (Unchanged from v1.7.)

### Section 3: Balance Prescription

Shown **only when a missing element exists** (count === 0 for that element). Charts without a missing element skip directly to the CTA.

The prescription card (`bg-[#EBE5D6] border border-[#DCD3C0] rounded-xl p-6`):
- Header: element icon + "Cultivate [Element]" in element color, 16px, uppercase tracking-widest
- Up to 3 categories from `getElementPrescription(missingElement)`: Environment, Colors, Timing, Physical, Diet
- Each category: small icon (MapPin / Palette / Clock / Gem / Flame) + title (11px uppercase, `#584A3E`) + bullet list of 2–3 concrete actions

**Catalyst and Resistance are NOT shown on the Reveal screen.** They live in the My Chart catalogue (§11 — `CatalystDetailPage`, `ResistanceDetailPage`). The Reveal screen's Section 4 is a simpler, corrective prescription for the absent element only.

**The link to the Today screen:** Catalyst and Resistance serve as the theoretical foundation for the dynamic energy overlay throughout the app. The daily, monthly, and annual energy scores in the Today screen weight favorably toward the user's catalyst elements and unfavorably toward resistance elements. High-flow periods are those where the current periodic element harmonizes with catalysts; clash periods are those where it conflicts with resistances. The Today screen is a live, real-time projection of the same energy dynamics the user encounters when they drill into My Chart.

---


## §11 — Energy Map Screen (Reading Layer)

**Route:** `/dashboard/energy-map`
**Purpose:** The heart of the product. The user's elemental identity expressed as a reading dashboard — not a card menu, but a layered scroll where the highest-value content (identity ribbon, energy blueprint with dominant forces, catalyst/resistance pair) reads inline, while deeper sections (seasonal calibration, life chapters, chart patterns) live as compact secondary cards that drill into detail pages.

**Design principle:** The traditional 八字 birth chart (Four Pillars grid) is intentionally absent from this screen. Western users don't need to decode Chinese characters to feel the depth of their chart — they need the meaning, in language they already speak. The Energy Map surfaces that meaning directly: archetypes, elemental forces, dynamic patterns. The raw chart data is accessible via a separate opt-in view (see Birth Chart Raw Data Page below) for users who want it.

> **v1.8 update (2026-04-29) — Architecture shift: card menu → reading dashboard.**
>
> The earlier v1.7 architecture (DayMasterHero + 8 navigation cards, each a tap target leading to a detail page) is **superseded**. The new architecture is **content-rich, not navigation-rich**:
>
> 1. **Identity ribbon** — `庚 · Metal · [strength chips]` + saturation %  + 1-italic-sentence saturation reading. Same component used as Reveal Section 2 opener.
> 2. **Energy Blueprint card** — segmented-block element composition (8-cell rows per element, count-keyed) + **Primary Force** sub-card (DM element + ruling TG archetype + 3 chips, inline) + **Secondary Force** sub-card (same shape, secondary TG). The two Force sub-cards live INSIDE the Blueprint card — no extra tap to see them.
> 3. **Catalyst / Resistance pair** — side-by-side cards, ↑ / ↓ accent. Each shows italic intro + 1–2 element badges (e.g. *Fire · The Trial*, *Water · The Flow*). Tap chevron to drill into detail.
> 4. **Secondary cards row** — Seasonal Calibration, Life Chapters, Chart Patterns — smaller cards with chevrons leading to their detail pages.
>
> **Why the change:** the older card-menu pattern hid 6 of 8 readings behind a tap. The user's reading deserves to *be present* on first arrival, not gated. The detail pages still exist for deep dives, but the dashboard is the home.
>
> **What survives from v1.7:** DayMasterHero (above the ribbon, smaller scale than Reveal), `DetailShell` for drill-downs, `getSections()` for prev/next routing, the tier-locking visual treatment, the lock-blur affordance.
>
> **Bottom tab nav (new — visible only inside `/dashboard/`):** 5 tabs — Today · Energy Map · Guidance · Friends · Profile. Materialises on dashboard mount; absent on Reveal and earlier surfaces. See "Bottom tab nav" subsection below for visual spec.
>
> The v1.7 architecture detail (catalogue cards, page-state routing, getSections) is retained below for historical reference; the **page-state routing block, getSections() function, and DetailShell wrapper remain authoritative.** What changes is the **catalogue home layout** (Level 1) and which sections appear inline vs. behind taps.

---

### Bottom tab nav (Dashboard chrome)

The 5-tab nav is the only persistent UI element across all dashboard tabs. Visible inside `/dashboard/*`; absent on Welcome, Onboarding, Loading, Reveal, Chart-Reveal.

**Container:** Fixed bottom, full-width, `bg: rgba(241,233,214,0.96)` with `backdrop-blur(8px)`, hairline top border `1px PAPER_HAIR`, safe-area inset for iPhone home indicator (`paddingBottom: env(safe-area-inset-bottom, 8px)`), height 64px above the inset.

**Tabs (5):**

| Tab | Icon (line, 22px) | Label | Route |
|---|---|---|---|
| Today | small filled brush dot | Today | `/dashboard/` |
| Energy Map | concentric ring (mini 3-layer) | Map | `/dashboard/energy-map` |
| Guidance | upward stroke (compass) | Guidance | `/dashboard/guidance` |
| Friends | two linked circles | Friends | `/dashboard/friends` |
| Profile | seal square | Profile | `/dashboard/profile` |

**State styling:**
- Active: icon + label in **DM element pigment** (Metal=`PIG_METAL`, etc.), label weight 500, small underline brush stroke beneath the label
- Inactive: icon + label in `INK_LIGHT`, weight 400
- Tap target: 56×56 minimum, 8px tap-area padding around each icon

**First-appearance moment:** When the user transitions Reveal → Dashboard, the tab bar should fade in over 400ms after the dashboard content has settled (~200ms post-mount), so the bar's arrival reads as "the app revealing its full surface" rather than "chrome appearing." After first session, the bar is just there.

---

### Architecture: Catalogue Navigation (v1.7 historical reference)

Energy Map is a two-level navigation system:

**Level 1 — Catalogue home (`page === null`)**
DayMasterHero sits at the top and fades seamlessly into the EnergyMapMenu below. The catalogue is a vertical stack of rich section cards — each is simultaneously an infographic teaser and the tap target to enter its detail page.

**Level 2 — Detail pages**
Each section card navigates to a dedicated full-page detail view wrapped in `DetailShell` — a shared nav shell providing back button, position counter ("3 of 8"), and previous/next strip at the bottom.

### Page state routing

React `useState` controls which layer is active:

| `page` value | Component rendered |
|---|---|
| `null` | EnergyMapMenu (catalogue home) |
| `"yourNature"` | YourNatureDetailPage |
| `"dom_0"` | DomDetailPage (idx=0, Primary Force) |
| `"dom_1"` | DomDetailPage (idx=1, Secondary Force) |
| `"seasonal"` | SeasonalDetailPage (conditional) |
| `"catalyst"` | CatalystDetailPage |
| `"resistance"` | ResistanceDetailPage |
| `"lifeChapters"` | LifeChaptersDetailPage |
| `"patterns"` | ChartPatternsDetailPage |

### Routing block

```jsx
<DayMasterHero chart={chart} onOpenPopup={t => setPopup(t)} onRevealChart={() => navigate('/chart-reveal')}/>
{page === null && <EnergyMapMenu chart={chart} onNavigate={p => setPage(p)}/>}
{page === "yourNature" && <YourNatureDetailPage chart={chart} onNavigate={p => setPage(p)}/>}
{page?.startsWith("dom_") && <DomDetailPage chart={chart} idx={parseInt(page.split("_")[1])} onNavigate={p => setPage(p)}/>}
{page === "seasonal" && <SeasonalDetailPage chart={chart} onNavigate={p => setPage(p)}/>}
{page === "catalyst" && <CatalystDetailPage chart={chart} onNavigate={p => setPage(p)}/>}
{page === "resistance" && <ResistanceDetailPage chart={chart} onNavigate={p => setPage(p)}/>}
{page === "lifeChapters" && <LifeChaptersDetailPage chart={chart} cycles={cycles} onNavigate={p => setPage(p)}/>}
{page === "patterns" && <ChartPatternsDetailPage chart={chart} onNavigate={p => setPage(p)}/>}
```

### Catalogue section order (8 sections)

```
1. Your Nature           → YourNatureDetailPage
2. Primary Force         → DomDetailPage idx=0
3. Secondary Force       → DomDetailPage idx=1
4. Seasonal Calibration  → SeasonalDetailPage (conditional on missing elements)
5. Catalyst              → CatalystDetailPage
6. Resistance            → ResistanceDetailPage
7. Life Chapters         → LifeChaptersDetailPage  (NEW)
8. Chart Patterns        → ChartPatternsDetailPage (NEW)
```

### getSections() — Navigation sequence

```js
function getSections(chart) {
  const secs = [];
  secs.push({ key: "yourNature",    tag: "Your Nature",    label: "Your Nature"         });
  secs.push({ key: "dom_0",         tag: "Primary Force",  label: "Primary Force"       });
  if (chart.dominantTGs.length > 1)
    secs.push({ key: "dom_1",       tag: "Secondary Force",label: "Secondary Force"     });
  if (chart.missingElements?.length)
    secs.push({ key: "seasonal",    tag: "Seasonal",       label: "Seasonal Calibration"});
  secs.push({ key: "catalyst",      tag: "Catalyst",       label: "What Lifts You"      });
  secs.push({ key: "resistance",    tag: "Resistance",     label: "What Depletes You"   });
  secs.push({ key: "lifeChapters",  tag: "Life Chapters",  label: "Your Decades"        });
  secs.push({ key: "patterns",      tag: "Patterns",       label: "Chart Patterns"      });
  return secs;
}
```

Energy Blueprint is excluded from `getSections()` — it is a non-navigable container in the catalogue home.

---

### Content tier split

| Section | Free | Seeker | Advisor |
|---------|------|--------|---------|
| Your Nature | Teaser — 2-sentence identity description, element bars | Full reading — essence paragraph, tgPattern visualization, elementIntro pair | Same as Seeker |
| Primary Force (TG) | Teaser — archetype name + 1 sentence + domain hint | Full TG archetype reading — all domain readings, life implications | + "Ask consultant about this →" button |
| Secondary Force (TG) | Teaser | Full reading | + Consultant button |
| Seasonal Calibration | Teaser — element name + 1 line | Full prescription | Same as Seeker |
| Catalyst | Teaser — element name + 1 word descriptor | Full catalyst reading | + Consultant button |
| Resistance | Teaser — element name + 1 word descriptor | Full resistance reading | + Consultant button |
| Life Chapters | Current decade name + element only | Full current decade + full timeline | + Future decade AI guidance |
| Chart Patterns | Pattern count badge only | Full pattern readings | + Pattern-seeded consultant |

**Lock state visual treatment:**
Locked content appears below a visible section header and a 1–2 sentence preview, then blurs with `backdrop-blur-sm` over a `rgba(248,246,240,0.7)` overlay. A small tier badge (◆ Seeker or ✦ Advisor) and `Lock` icon (16px, `#8C857B`) sit centered over the blur. The teaser is generous enough that the user understands what they would be reading — not so generous that they don't need to upgrade.

---

### DayMasterHero → Catalogue gradient transition

DayMasterHero includes a gradient overlay at its bottom edge:

```css
position: absolute
bottom: 0
left: 0
right: 0
height: 120px
background: linear-gradient(to bottom, transparent 0%, #f7f3ec 100%)
pointer-events: none
```

EnergyMapMenu container: `background: #f7f3ec` — matches gradient endpoint exactly. No visual seam.

### Birth chart reveal button (in DayMasterHero)

A subtle link sits beneath the archetype name in DayMasterHero:

```
[◦ View your birth chart  →]
```

```
font-family: EB Garamond, serif
font-size: 13px
color: #8C857B
letter-spacing: 0.5px
text-decoration: none
border-bottom: 1px dashed #C5BDB0
padding-bottom: 2px
```

Tapping it navigates to `/chart-reveal` — a dedicated page (see Birth Chart Raw Data Page below). This is intentionally quiet — power users find it, casual users don't need it.

---

### DayMasterHero

**Container:**
```
background: linear-gradient(180deg, #2C2825 0%, #3d342b 60%, #f7f3ec 100%)
min-height: 52vh
padding: 60px 20px 0
display: flex
flex-direction: column
align-items: center
text-align: center
position: relative
```

**Element seal:** ArchetypeSeal SVG, 88px, element color. Springs in on mount: `scale: 0 → 1`, spring bounce 0.4.

**Archetype name:** Cormorant Garamond, 36px, weight 600, `#F8F6F0`, letter-spacing 1px.

**Archetype subtitle:** EB Garamond italic, 17px, `#C5BDB0`.

**Identity token:** `[庚 · Yang Metal · The Blade]` — EB Garamond 13px, element color on `rgba(255,255,255,0.08)` bg, rounded-full, padding `4px 12px`. The stem glyph is 14px in the element's deep color.

**Element-colored TG ring:** Below the identity token. A single radial donut ring — the primary identity visual that anchors the entire Energy Map screen. Replaces the flat element spectrum bar.

```
Ring dimensions:
  width: 200px
  height: 200px
  outer radius: 100px
  inner radius: 60px (donut hole)
  gap between segments: 2.5° each
  center: Day Master element name + polarity (small, muted)
```

The ring encodes **two dimensions simultaneously** in a single visual:
- Segment **size** = weight of each Ten God in the chart (computed from all four pillars)
- Segment **color** = element that Ten God represents relative to the user's Day Master

**Element-to-role color mapping** (consistent across all Day Masters from the user's perspective):

| Color | Element | Role |
|-------|---------|------|
| Fire red `#c85a3c` | Fire | Authority |
| Earth gold `#c8963c` | Earth | Resource |
| Wood green `#4a9a5c` | Wood | Wealth |
| Water blue `#3c6a9a` | Water | Output |
| Metal silver `#b0b8c8` | Metal | Companion |

The engine maps each TG group to its element relative to the DM internally — the user always sees the same intuitive color language regardless of their Day Master. A Fire-heavy ring always means strong Authority energy in the user's chart. A Water-heavy ring always means strong Output/creative energy.

**tgPattern label:** Beneath the ring, centered:
```
[PATTERN NAME]            ← 9px, monospace, #c8a96e, uppercase, tracking 2px
Pattern descriptor        ← 7px, #f0ece4, opacity 0.5, italic
```

**Ring animation:** On first mount, segments sweep in from the top (12 o'clock) clockwise. Duration 800ms, stagger 30ms per segment, spring easing. On subsequent mounts: no animation, static render.

**Tap behavior:** Tapping the ring navigates to the Your Nature detail page (page = "yourNature"), which contains the full tgPattern visualization and reading.

**Archetype essence:** EB Garamond, 15px, `rgba(248,246,240,0.85)`, max-width 320px, line-height 1.8. Begins to fade into the gradient below. Rendered below the ring.

**Birth chart link:** Positioned after the essence paragraph, before the gradient fade-out zone.

---

### tgPattern Visual System

tgPattern describes the **structural distribution** of Ten Gods across the chart — the energetic fingerprint of how forces are arranged, not which force dominates individually.

**Five pattern types:**

| Pattern | Structure | Descriptor |
|---------|-----------|------------|
| **Pure** | One TG type overwhelmingly dominant (>50% weight) | Strength through singularity |
| **Rooted** | Dominant TG appears in both heavenly stems and earthly branches | Anchored, consistent expression |
| **Flowing** | TGs cycle in productive sequence across pillars | Fluid movement between modes |
| **Forging** | Two competing TG groups (e.g., Authority + Companion) clash for dominance | Strength through tension |
| **Tested** | Strong controlling forces (Authority) weigh heavily against the DM | Identity shaped by constraint |

**Computation:** `tgPattern` is derived separately from `getDominantTenGod()`. It analyzes the weight distribution across all 10 TG slots and classifies the structural type. A user can have 正官 as their dominant TG (the highest individual score) and a Forging pattern (the overall structural shape), simultaneously.

**On the Full Profile Card (DayMasterHero):** Pattern name + one-line descriptor beneath the ring.

**On YourNatureDetailPage:** A dedicated tgPattern section shows the ring in larger format (240px) with the pattern name, full descriptor paragraph, and (Seeker+) the breakdown of which TG groups are creating the pattern.

**On the EnergyMapMenu catalogue card:** Pattern type shown as a small badge beneath the section title.

---

### EnergyMapMenu — Catalogue Home

**Container:** `background: #f7f3ec`, `padding: 0 16px 100px` (100px bottom for nav bar clearance).

**Section header:** `YOUR ENERGY MAP` — 11px, tracking 0.3em, uppercase, `#8C8273`, weight 500, margin-bottom 16px.

**Section card order:**
```
┌────────────────────────────────────────────┐
│  ① Your Nature                    [tap →]  │
│────────────────────────────────────────────│
│  ② Energy Blueprint               [info]   │  ← non-tappable outer container
│     └ Primary Force               [tap →]  │
│     └ Secondary Force             [tap →]  │
│────────────────────────────────────────────│
│  ③ Seasonal Calibration           [tap →]  │  ← conditional
│────────────────────────────────────────────│
│  ④ Catalyst / Resistance       [col col]   │  ← two-column row
│────────────────────────────────────────────│
│  ⑤ Life Chapters (大运)           [tap →]  │  ← NEW
│────────────────────────────────────────────│
│  ⑥ Chart Patterns (合冲刑害)      [tap →]  │  ← NEW
└────────────────────────────────────────────┘
```

**Section card base spec:**
```
background: #EBE5D6
border: 1px solid #DCD3C0
border-radius: 16px
padding: 20px
margin-bottom: 12px
cursor: pointer
transition: transform 150ms, box-shadow 150ms

hover / tap:
  transform: translateY(-1px)
  box-shadow: 0 4px 16px rgba(0,0,0,0.06)
```

**Card content:** Tag label (10px uppercase, `#8C8273`), section title (22px EB Garamond, `#2C2825`), 1-line teaser or infographic element, right-side chevron `→` (`#C5BDB0`).

---

### Life Chapters detail page (NEW)

**Purpose:** The temporal dimension of the chart — how the user's energy unfolds across 10-year Decade Luck Cycles.

**Entry point:** Tapping the Life Chapters catalogue card, OR tapping the Decade Indicator card on the Today tab.

#### Decade Timeline Strip

A horizontally scrollable strip of decade cards, each representing one 10-year period:

```
← [AGE 8–18] [AGE 18–28] [AGE 28–38 ●] [AGE 38–48] [AGE 48–58] →
      Wood       Water      [CURRENT]      Fire          Earth
   muted/60%   muted/60%   full opacity  Seeker lock   Seeker lock
```

**Individual decade card:**
```
width: 80px
height: 80px
border-radius: 12px
display: flex flex-col items-center justify-center
background: [element color]15
border: 1px solid [element color]40

Current decade:
  border: 2px solid [element color]
  background: [element color]20
  scale: 1.05

Past decades:
  opacity: 0.6
  filter: grayscale(20%)

Future decades (Seeker+):
  full opacity, visible
  overlay: Lock icon 14px centered, Seeker badge

Future decades (free):
  opacity: 0.35
  overlay: Lock icon + "Seeker" badge
```

**Decade card labels:**
- Age range: 10px, `#8C8273`, uppercase
- Element name: 14px EB Garamond, element color

#### Decade reading (below strip)

**Free:** Decade name, element, stem-branch characters (天干 地支), 1-sentence energy description. CTA: `◆ Unlock full reading with Seeker`.

**Seeker:**
- Section heading: e.g., "The Water Decade · AGE 28–38"
- Element identity paragraph (3–4 sentences): what energy this decade carries, its character
- Domain impact table: how each of the 5 life domains is activated or dampened this decade
- Transition note: what the entry into this decade felt like / will feel like
- The full timeline shows all decades including past, all readable

**Advisor:** Same as Seeker + `"Ask your consultant about this decade →"` button at the bottom. AI conversation seeded with the decade context.

**Components needed:** `DecadeTimelineStrip`, `LifeChaptersDetailPage`, `DecadeLockCard`

---

### Chart Patterns detail page (NEW)

**Purpose:** The structural dynamics of the chart — combinations, clashes, and tensions between pillars that create specific life tendencies.

**Catalogue card teaser:** Shows a pattern count badge: *"2 active patterns in your chart"* in a small pill `bg-[#EBE5D6] border border-[#DCD3C0]`. This alone compels the tap — everyone wants to know what their patterns are.

#### Pattern Badge component

```
display: inline-flex items-center gap-4px
padding: 4px 10px
border-radius: 9999px
font-size: 11px
letter-spacing: 0.05em
text-transform: uppercase

Combination (合): bg-[Wood color]15, border-[Wood color]40, text-[Wood color deep]
Clash (冲):        bg-[Fire color]15, border-[Fire color]40,  text-[Fire color deep]
Penalty (刑):      bg-[Metal color]15, border-[Metal color]40, text-[Metal color deep]
Harm (害):         bg-[Water color]15, border-[Water color]40, text-[Water color deep]
```

#### Pattern detail page

**Free:** Pattern count badge only on the catalogue card. Detail page: list of pattern names (type + elements involved) with readings blurred. Lock overlay per pattern. "Unlock all pattern readings with Seeker."

**Seeker:** Each pattern rendered as a full card:
```
[Pattern type badge]  [Pattern name]
[Elements involved: e.g., "甲 + 己 → Earth Combination"]
[Reading: 3–4 sentences explaining what this pattern creates as a tendency]
```

**Advisor:** Each pattern card adds `"Explore this with your consultant →"` at the bottom. Opens AI Consultant seeded with pattern as topic.

**Pattern types to detect and display:** Six Combinations (六合), Six Clashes (六冲), Three Penalties (三刑), Six Harms (六害), Directional Combinations (三合 / 方合).

**Note for implementation:** Pattern detection logic must be added to `engine/calculator.js`. Patterns are derived from the branch (地支) relationships in the chart's four pillars.

**Components needed:** `PatternBadge`, `ChartPatternsDetailPage`, `PatternCard`, `PatternLockOverlay`

---

### Birth Chart Raw Data Page

**Route:** `/chart-reveal`
**Access:** Via "View your birth chart →" link in DayMasterHero. Navigates as a full-page push (not a modal).
**Purpose:** The traditional 八字 Four Pillars display for users who want the raw data. No interpretation, no guidance — purely the chart.

**Conditional rendering — 4-pillar vs 3-pillar:**

The page checks `chart.hourPillar \!== null` before rendering. This is not a degraded state — three-pillar (三柱) BaZi is a legitimate practice with centuries of tradition.

| Hour input at onboarding | Chart display | Hour pillar treatment |
|--------------------------|---------------|-----------------------|
| Exact time | 4-column grid | Full confidence, no indicator |
| Approximate window | 4-column grid | `~` prefix on hour stem character, hover shows window range |
| Unknown (null) | 3-column grid | No fourth column rendered |

**4-pillar layout (hour known or approximate):**
```
← Back                              [page header]

YOUR BIRTH CHART · 八字排盘

┌──────┬──────┬──────┬──────┐
│ YEAR │MONTH │ DAY  │ HOUR │
│      │      │  ↑   │      │
│  乙  │  庚  │  庚  │ ~乙  │  ← ~ prefix if approximate
│ 天干 │ 天干 │Master│ 天干 │
│──────│──────│──────│──────│
│  亥  │  辰  │  寅  │  酉  │
│ 地支 │ 地支 │ 地支 │ 地支 │
└──────┴──────┴──────┴──────┘

BIRTH COORDINATES
Date · Time (or "Approximate: [window]") · True Solar Time · Location · Energy current

[Footer: "To understand what these characters mean, visit the Codex →"]
```

**3-pillar layout (hour unknown):**
```
← Back                              [page header]

YOUR BIRTH CHART · 三柱排盘

        ┌──────┬──────┬──────┐
        │ YEAR │MONTH │ DAY  │
        │      │      │  ↑   │
        │  乙  │  庚  │  庚  │
        │ 天干 │ 天干 │Master│
        │──────│──────│──────│
        │  亥  │  辰  │  寅  │
        │ 地支 │ 地支 │ 地支 │
        └──────┴──────┴──────┘

        "Birth hour not provided — showing three-pillar chart."
        [Refine your hour →]

BIRTH COORDINATES
Date · Location · Energy current

[Footer: "To understand what these characters mean, visit the Codex →"]
```

The 3-pillar grid is centered horizontally. No empty fourth column, no placeholder, no error indicator. The subtitle beneath (*"Birth hour not provided"*) is 13px EB Garamond italic, `#6f6b66` — quiet, factual, not apologetic. The *"Refine your hour →"* link initiates the chart resonance feature (see below).

**Day Pillar highlight:** `border: 2.5px solid #584A3E`, extended padding, background `#DDD8CC`. All other pillars: `border: 1px solid #D5CDBD`.

**Chinese characters:** 38px, Times New Roman, colored by element via `elementColor()`. Sub-labels (天干, 地支): 10px Noto Serif SC, `#968C7C`. Approximate hour stem: rendered in element color at 60% opacity with `~` prefix in `#8C857B`.

**Codex footer link:** 13px EB Garamond, `#8C857B`, dashed underline.

**No interpretation copy on this page.** No archetype name, no element description, no guidance text.

---

### Chart Resonance Feature (hour refinement)

**Purpose:** Allow users who skipped the birth hour at onboarding to estimate their hour 时辰 after they are already invested in the product. Based on the traditional BaZi practitioner technique of presenting hour archetypes and asking for resonance.

**Entry points:**
- *"Refine your hour →"* link on the Birth Chart Raw Data page (3-pillar state)
- *"Your birth chart is partial — refine your hour →"* card in Profile screen
- Proactive prompt after 3 sessions: *"Want a more complete chart? It takes 2 minutes."*

**Flow:**

Step 1 — Introduction card:
```
"Discover your birth hour"

Your Day Master is already complete — your core identity,
elemental nature, and most readings are fully accurate.
Adding your birth hour refines the final layer.

We'll show you a few portraits. Pick the one that
sounds most like how others experience you.

[Begin →]
```

Step 2 — Portrait selection (2–3 rounds):
For each round, present 3 short hour archetype portraits (50–70 words each) drawn from the most likely 时辰 configurations for the user's Day Master. Each portrait describes how the person shows up to others — not how they see themselves. This is the hour pillar's domain.

Example portraits for a Metal DM:
```
┌────────────────────────────────────────┐
│  "People sense your precision before   │
│   you speak. You arrive prepared.      │
│   Others often assume you're in charge │
│   even when you haven't claimed it."   │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│  "You draw people in without trying.   │
│   There's a warmth in how you listen   │
│   that makes others feel understood    │
│   before you've said much at all."     │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│  "You're often underestimated at first.│
│   Your energy is quieter than your     │
│   depth. People are surprised by how   │
│   much you've already observed."       │
└────────────────────────────────────────┘
```

Each portrait maps to a specific hour element grouping. Selection narrows candidates from 12 → 4–6 → 2–3 时辰.

Step 3 — Confirmation + update:
*"Based on your selections, your most likely birth hour is [时辰 range, e.g., 酉时 · 5–7pm]."*
Confidence indicator: High / Moderate / Approximate.

If high confidence → chart updates to 4-pillar immediately.
If moderate/approximate → chart updates with `~` indicator on hour stem.

**Reveal moment:**
```
[Element seal animation — same spring as Reveal screen]
"Your chart is now complete."
[View your updated chart →]
```

**Components needed:** `ChartResonanceFlow`, `HourPortraitCard`, `HourConfirmationCard`
**Data needed:** Hour portrait copy per DM × element group combination (~50 portraits total)
