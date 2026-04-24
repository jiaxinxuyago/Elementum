# Elementum · Doc 5 — App Design Document

This document is the primary reference for all UI and interaction design work in Elementum. It is the contract between the design vision, the frontend implementation, and the data contracts defined in Doc 2. Designers use it to understand intent. Engineers use it to understand what to build and what data powers each component.

**Reading order:** Read Doc 2 §2 and §6–8 before this document. Doc 5 describes how to render the data; Doc 2 describes what the data is.

---

## CATALOGUE

```
§1  Design Philosophy & Voice
§2  Visual Identity System
§3  Typography
§4  Motion System
§5  Screen Flow Architecture
§6  Pre-Dashboard: Welcome
§7  Pre-Dashboard: Onboarding
§8  Pre-Dashboard: Loading
§9  Pre-Dashboard: Reveal
§10 Dashboard: Today
§11 Dashboard: My Chart (Reading Layer)
§12 Dashboard: Guidance (AI + Codex)
§13 Dashboard: Connect (Friends)
§14 Dashboard: Me (Profile)
§15 Shared Component Library
§16 Accessibility & Performance
§17 Data Contract Summary
§18 Features: Pending Development
§19 Pricing Model & Content Tiers
§20 Asset Library
```

---

## §1 — Design Philosophy & Voice

### The core tension we design around

Elementum holds two things in tension that most apps choose between: **ancient seriousness** and **daily accessibility**. A user should feel they are engaging with something real and deep — not a horoscope — while also opening the app in the seven minutes before a meeting and getting immediate, actionable signal.

Everything in the design serves this tension. The typography is warm serif, not clinical sans. The color system is aged paper, not sterile white. But the information hierarchy is ruthlessly functional — the most useful thing is always the first thing you see.

### Three design principles

**1. The reading is a recognition event, not an information delivery.**
Every piece of content should feel like the user is being seen, not told. This applies to copy, layout, and animation — the app should feel like it already knows you before you finish reading the sentence.

**2. Chinese as art, English as information.**
Chinese characters appear as visual glyphs — they create atmosphere and signal authenticity without requiring the user to read them. All information-carrying text is in English. The rule: a Western user who has never studied Chinese should feel the presence of the source culture without being confused by it.

**3. Depth on demand.**
The default state of every screen shows you the most personally relevant content immediately. Additional depth is available by scrolling or tapping — never gated behind multiple steps. The identity card is a single scroll. The daily guidance is the first thing you see. The full reading is one tap away from the bottom nav.

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

## §5 — Screen Flow Architecture

### Route map

```
/                        → WelcomeScreen          (no nav)
/onboarding              → OnboardingScreen        (no nav)
/loading                 → LoadingScreen           (no nav)
/reveal                  → RevealScreen            (no nav)
/chart-reveal            → BirthChartRawPage       (no nav, modal-style full page)
/dashboard               → AppLayout wrapper
  /dashboard/            → TodayScreen             (default tab)
  /dashboard/guidance    → GuidanceScreen
  /dashboard/energy-map  → EnergyMapScreen
  /dashboard/friends     → FriendsScreen
  /dashboard/profile     → ProfileScreen
```

### User journey flows

**First-time user:**
Welcome → Onboarding (7 steps) → Loading → Reveal → Dashboard (lands on Energy Map)

The Energy Map is the default landing after Reveal because the user has just had their identity recognition moment — they want to go deeper into who they are, not pivot immediately to daily utility.

**Returning user (chart exists in storage):**
WelcomeScreen detects chart in localStorage via `useEffect` and auto-redirects to `/dashboard/` (Today). No onboarding. Every subsequent fresh open lands on Today.

**Incomplete onboarding:**
If a user begins onboarding but exits before completing all 7 steps, partial progress is saved to localStorage. On next Welcome Screen load, a secondary quiet link appears beneath the primary CTA: *"Continue where you left off →"* in 14px EB Garamond, `#8C857B`. Tapping it resumes at the last completed step with all previous answers pre-filled. The primary CTA ("Begin Your Journey") starts fresh.

**Route guards:**
Defensive code only — not a user-facing design concern. If a user reaches `/dashboard/*` with no chart (edge case: push notification deep link on fresh install), redirect silently to `/`. Resolved automatically once server-side auth is implemented and the chart travels with the account, not the device.

---

### Bottom navigation bar

**Visual spec:**

```
┌─────────────────────────────────────────────────────┐
│  TODAY    GUIDANCE   ENERGY MAP   FRIENDS   PROFILE  │
│    📅        📖         ◉ (seal)      👥        👤   │
│    ·                                                  │
└─────────────────────────────────────────────────────┘
```

| Tab | Label | Icon (Lucide) | Route | Default? |
|-----|-------|---------------|-------|----------|
| Today | TODAY | `Calendar` | `/dashboard/` | Returning users |
| Guidance | GUIDANCE | `BookOpen` | `/dashboard/guidance` | — |
| Energy Map | ENERGY MAP | `BarChart2` | `/dashboard/energy-map` | First session post-reveal |
| Friends | FRIENDS | `Users` | `/dashboard/friends` | — |
| Profile | PROFILE | `User` | `/dashboard/profile` | — |

**Container:**
```
position: fixed
bottom: 0
width: 100%
background: rgba(253, 253, 252, 0.85)
backdrop-filter: blur(12px)
border-top: 1px solid #EAE5DF
padding-bottom: env(safe-area-inset-bottom)   ← iOS safe zone
padding-top: 8px
padding-horizontal: 16px
display: flex
justify-content: space-between
z-index: 50
```

**Each tab button:**
```
width: 64px
display: flex
flex-direction: column
align-items: center
gap: 4px
padding: 8px 0
background: transparent
border: none
cursor: pointer
```

**Icon — inactive:**
```
size: 24px
strokeWidth: 1.5
color: #8C857B
```

**Icon — active:**
```
size: 24px
strokeWidth: 2
color: #2C2825
```

**Active indicator — gold dot:**
```
position: absolute
bottom: -8px
left: 50%
transform: translateX(-50%)
width: 4px
height: 4px
border-radius: 50%
background: #D4AF37
```
Animated via Framer Motion `layoutId="nav-indicator"` — spring transition `stiffness: 300, damping: 30`. The dot slides smoothly between tabs rather than appearing and disappearing.

**Tab label:**
```
font-family: system-ui, sans-serif   ← intentional: contrast with serif content
font-size: 10px
font-weight: active ? 500 : 400
letter-spacing: 0.1em
text-transform: uppercase
color: active ? #2C2825 : #8C857B
transition: color 300ms
```

**Energy Map center tab (special treatment):**
The center tab is the structural anchor. In a future iteration, the icon may be replaced with the user's ArchetypeSeal SVG at 24px — their element seal as the nav icon. For V1, use `BarChart2` as the placeholder icon.

---

### Notification strategy

Push notifications are the primary D7 and D30 retention driver. Opt-in is collected at onboarding Step 7. The notification is a personalized morning energy briefing.

**Content by tier:**

| Tier | Notification content |
|------|---------------------|
| Free | Day's element energy line — *"Good morning, The Blade. Today is a Water day — your precision cuts deepest when the current is calm."* |
| Seeker | Above + one-line domain impact from their Energy Manual — *"Career energy is heightened today — Metal clarity meets a Water foundation."* |
| Advisor | Above + one-line from AI consultant context — *"The decision you're weighing becomes clearer mid-week as Metal yields to Water."* |

Notification always uses the archetype name ("The Blade", "The Ocean"), never a generic greeting. Delivered at user-set time (chosen at onboarding Step 7, editable in Profile). Default: 8:00 AM.

## §6 — Welcome Screen

**Route:** `/`
**Purpose:** First impression. Immediate identity hook. Minimal friction to start.

### Layout

```
┌─────────────────────────────────────────┐
│                                         │
│         [canvas: ink particles]         │
│                                         │
│         [Enso SVG, animated draw-on]    │
│                                         │
│              元 素                       │
│           ELEMENTUM                     │
│                                         │
│   "Your elemental energy, read from the moment you were born." │
│                                         │
│   Everyone carries a unique elemental   │
│   blueprint. We reveal yours.           │
│                                         │
│        [ Discover Yours → ]             │
│                                         │
│   "Already mapped? [Sign in]"           │
│                                         │
└─────────────────────────────────────────┘
```

### Component specs

**Enso SVG:** Animated path draw-on, duration 2s ease-in-out. Stroke color `#8b7355`, strokeWidth 2.5, 70px. Floats with `y: [0, -8, 0]` on 3s repeat cycle.

**Chinese title (元 素):** Ma Shan Zheng, 40px, `#2C2825`. The Chinese characters are the visual center — not translated in UI.

**Latin title (ELEMENTUM):** EB Garamond, 24px, uppercase, letter-spacing 2px, `#5C554D`.

**Tagline:** EB Garamond, 18px italic, `#5C554D`. *"Your elemental energy, read from the moment you were born."*

**Body text:** EB Garamond, 16px, `#6f6b66`, max-width 360px, center aligned.

**Primary CTA:** Background `#6b5339`, text `#F8F6F0`, padding `14px 28px`, border-radius `8px`, EB Garamond 16px weight 500. Shadow: `0 4px 12px rgba(107,83,57,0.2)`. Hover: `#5a4430` + shadow stronger + y −1.

**Ink particle canvas:** 25 particles, bronze/ink colors, alpha 0.05–0.15, slow upward drift. Never competes with content — purely atmospheric.

### Entry sequence

On load: Fade in all content together at 0.8s with `y: 20 → 0`. The Enso draws itself while content fades in. The button appears last (stagger delay 0.4s).

---

## §7 — Onboarding Screen

**Route:** `/onboarding`
**Purpose:** Collect seven birth data points. Must feel like a ritual, not a form.

### Design principle

Each step occupies the full screen. One question at a time. The poetic subtitle is the key differentiator from any other input form — it establishes that this information matters spiritually, not just technically. The progression bar at the top (3px, gradient `#8b7355 → #9d8468`) animates smoothly — it is the user's only sense of how long this takes.

### Step structure

```
┌─────────────────────────────────────────┐
│ [progress bar 3px at very top]          │
│                                         │
│      Step 3 of 7                        │
│                                         │
│    "What day were you born?"            │  32px EB Garamond, #8b7355, tracking 2px
│                                         │
│    Your day is your core — the          │  16px EB Garamond italic, #5C554D
│    essence of who you are at            │  line-height 1.7
│    the deepest level.                   │
│                                         │
│    [Input / Selector]                   │
│                                         │
│    [← Back]          [Continue →]       │
│                                         │
└─────────────────────────────────────────┘
```

**Step counter:** 14px EB Garamond, tracking 3px, uppercase, `#6f6b66`.

**Back button:** Transparent bg, `border: 1px solid #d9d3c8`, rounded-full, 13px uppercase tracking 2px, `#5C554D`. Hover: `border-color #8b7355`.

**Continue button:** `bg-[#6b5339]`, `text-[#F8F6F0]`, rounded-lg, 16px EB Garamond weight 500. Disabled: `opacity-50 cursor-not-allowed`. Final step: label changes to **"Reveal My Nature"**.

**Transitions:** Each step slides in from the right (`x: 20 → 0`), previous step slides out left (`x: 0 → -20`). `AnimatePresence mode="wait"`, duration 350ms, easing `[0.22, 1, 0.36, 1]`. Back navigation reverses direction.

### All 7 steps

| Step | Question | Input type | Poetic subtitle |
|------|----------|------------|-----------------|
| 1 | When were you born? | Select — years 1900 → present | *"The year you arrived reveals what you carry from those who came before."* |
| 2 | Which month? | Select — full month names | *"Your month is the season your soul chose to enter this world."* |
| 3 | What day? | Select — 1–31 | *"Your day is your core — the essence of who you are at the deepest level."* |
| 4 | What time? | Three-level: exact / approximate window / unknown | *"Your hour reveals how you express your nature outward."* |
| 5 | Where were you born? | Text input + geocoding | *"We'll calculate your True Solar Time (真太阳时) to place you precisely."* |
| 6 | Which energy current moves through you? | Two-button toggle | *"This determines the direction of your Decade Luck Cycles (大运)."* |
| 7 | Stay in tune with your energy? | Notification opt-in + time picker | *"We'll send you a morning reading each day. Your energy doesn't wait for you to remember to check."* |

### Step 4 — Birth hour (three-level input)

The birth hour is the most commonly unknown piece of birth data. Step 4 never blocks the user — it offers three tiers of precision and continues regardless.

**Level 1 — Exact time (primary):**
24-hour scroll picker, `00:00–23:00`, local time. Below the picker, a quiet note: *"24-hour format, local time. Even an approximate time improves accuracy."* 13px EB Garamond italic, `#6f6b66`.

**Level 2 — Approximate window (secondary):**
A text link beneath the picker: *"I only know the general time →"* (14px, `#8C857B`, underlined). Tapping replaces the picker with 6 window buttons arranged in a 2×3 grid:

```
┌─────────────────┐  ┌─────────────────┐
│  Late night     │  │  Early morning  │
│  11pm – 3am     │  │  3am – 7am      │
├─────────────────┤  ├─────────────────┤
│  Morning        │  │  Midday         │
│  7am – 11am     │  │  11am – 3pm     │
├─────────────────┤  ├─────────────────┤
│  Afternoon      │  │  Evening        │
│  3pm – 7pm      │  │  7pm – 11pm     │
└─────────────────┘  └─────────────────┘
```

Each window maps to exactly 2 adjacent 时辰. Selecting one runs the chart calculation twice (once per 时辰) and blends the result (see Calculation section below).

**Level 3 — Unknown (tertiary):**
Below the window buttons: *"I have no idea →"* (14px, `#8C857B`, underlined). Tapping continues to Step 5 with hour marked as `null`. A 3-pillar chart is calculated. No error, no block.

**Calculation logic by level:**

| Input | Chart type | Hour pillar display | Accuracy note |
|-------|------------|---------------------|---------------|
| Exact time | 4-pillar full | Full confidence, no indicator | None |
| Approximate window | 4-pillar full | `~` indicator, hover/tap shows window range | *"Based on [window]"* shown in Profile |
| Unknown | 3-pillar | No hour column rendered | *"Birth hour not provided"* in Profile |

**Approximate window calculation detail:**
Each window maps to 2 时辰. Run `generateChart()` for both. Characters identical across both charts (year/month/day pillars = 6 of 8) are used at full confidence. For the hour pillar specifically:
- Hour TG weight = average of both charts' hour TG contributions
- tgPattern = pattern type if both charts agree; flagged `~` if they diverge
- Branch interactions involving hour = shown only if both charts produce the same interaction
- Display: hour pillar renders with `~` prefix on the stem character

**Level switch:** A quiet *"Enter exact time ↑"* link at the bottom of the window/unknown views lets users switch back. Switching does not lose other step answers.

**Profile completion state:**
For approximate and unknown inputs, the Profile screen shows a persistent but quiet card:
```
"Your birth chart is [approximate / partial]"
"Refine your hour →"    ← links to chart resonance feature
```

**Step 4 → Step 5 transition:** Regardless of which level is used, Continue is always active once a selection is made (or "I have no idea" is tapped). No blocking.

### Step 5 — Location
Text input: placeholder `"City, Country (e.g., New York, USA)"`. On input, geocode city → longitude. Below input, an explanatory card:
```
background: rgba(139,115,85,0.06)
border: 1px solid rgba(139,115,85,0.25)
border-radius: 12px
padding: 16px
```
Copy: **"Why location matters:"** Traditional BaZi uses Beijing solar time. We convert your local time to True Solar Time (真太阳时) for accuracy. If location is unavailable, Beijing is used as default.

**Geocoding failure handling:**
If the city cannot be resolved (network failure, unrecognised input, or geocoding API error), do **not** block the user. Apply a soft fallback silently:
- Default to Beijing longitude (116.4°E) — the traditional BaZi standard
- Show a quiet inline note beneath the input field: *"Using standard solar time — update location in Profile anytime."* 13px EB Garamond italic, `#6f6b66`
- Continue button remains active
- Profile screen shows: *"Birth location not confirmed — tap to update →"*

This is not an error state. Beijing default is a legitimate BaZi convention used when birth location is unavailable.

### Step 6 — Birth polarity (conditional energy current reveal)

The BaZi calculation requires a birth polarity to determine the direction of Decade Luck Cycles — Yang-born and Yin-born charts run in opposite temporal directions. Most users resolve this immediately via biological sex. The energy current framing only surfaces for users who need it.

**Primary question:** "What is your gender?"

*Poetic subtitle:* *"This determines the direction of your Decade Luck Cycles (大运)."*

**Three options — stacked vertically:**

```
┌──────────────────────────────────────────┐
│   Man                                    │  → auto-assigns Yang polarity, advance
├──────────────────────────────────────────┤
│   Woman                                  │  → auto-assigns Yin polarity, advance
├──────────────────────────────────────────┤
│   I'd rather not specify                 │  → reveals energy current inline ↓
└──────────────────────────────────────────┘
```

Man and Woman selections silently map to Yang and Yin respectively in the engine. No energy current language is shown. The user taps and moves to Step 7 without friction.

**Conditional reveal — "I'd rather not specify" selected:**

When this option is tapped, it highlights (selected state) and an inline panel expands beneath it with a smooth height animation (300ms ease-out). The follow-up drops gender language entirely and asks about energetic polarity directly:

```
┌──────────────────────────────────────────────────┐
│  Which energy current feels more like you?        │
│                                                   │
│  ┌─────────────────┐   ┌─────────────────┐        │
│  │  Yang           │   │  Yin            │        │
│  │  ↑ Outward      │   │  ↓ Receptive    │        │
│  │  Initiating     │   │  Inward         │        │
│  └─────────────────┘   └─────────────────┘        │
│                                                   │
│  "I'm not sure →"  (tertiary, below buttons)      │
└──────────────────────────────────────────────────┘
```

"I'm not sure →" (14px, `#8C857B`, underlined) defaults to Yang and adds a note to the Profile screen: *"Luck cycle direction is estimated — update anytime in Profile."*

Once a polarity is resolved (either via Man/Woman or via the inline Yang/Yin toggle), Continue activates.

**Button spec — all three primary options:**
```
width: 100%
padding: 16px 20px
border-radius: 10px
border: 1px solid #d9d3c8
background: #e8e3d8
font-family: EB Garamond, serif
font-size: 17px
text-align: left
transition: all 300ms

"Prefer not to say" variant:
  font-size: 15px
  color: #6f6b66

selected state (any button):
  border-color: #8b7355
  background: rgba(139,115,85,0.12)
  font-weight: 500
```

**Inline energy current toggle spec:**
```
margin-top: 12px
padding: 16px
border-radius: 10px
border: 1px dashed #8b7355
background: rgba(139,115,85,0.06)

Expand animation:
  height: 0 → auto, opacity: 0 → 1
  duration: 300ms, easing: ease-out
  Framer Motion: AnimatePresence + motion.div

Inner toggle buttons: flex row, gap 8px
  Each: flex-1, padding 12px, border-radius 8px
  Unselected: border #d9d3c8, bg #e8e3d8
  Selected: border #8b7355, bg rgba(139,115,85,0.15)
```

### Step 7 — Notification opt-in

**Layout:**
```
┌─────────────────────────────────────────┐
│                                         │
│   [Bell icon, 32px, #8b7355]            │
│                                         │
│   "Stay in tune with your energy?"      │
│                                         │
│   We'll send you a morning reading      │
│   each day — personalized to your       │
│   archetype and the day's energy.       │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  [ Toggle: ON ]  8:00 AM        │   │
│   │  ▼  Change time                 │   │
│   └─────────────────────────────────┘   │
│                                         │
│   Skip for now (small, below buttons)   │
│                                         │
└─────────────────────────────────────────┘
```

Toggle: on by default. `bg-[#6b5339]` when on. Time picker below the toggle — a simple hour selector (on/off state). "Skip for now" is a text link in `#8C857B`, 14px — it does not disable notifications permanently, just defers the permission request to the Profile screen.

**Note:** The Continue button on Step 7 becomes "Reveal My Nature" — this is the last step before Loading and Reveal. The transition out of Step 7 should feel weighty — slightly longer fade, 500ms.

### Input philosophy

The browser-default `<select>` elements in V006 are mismatched to the aesthetic. Target implementation should use scroll-picker wheels: large serif type, spring-animated selected item highlighted with a warm tone, element-tinted when appropriate. This applies to Year, Month, Day, and Hour selectors.

## §8 — Loading Screen

**Route:** `/loading`
**Duration:** 2.5–3 seconds (pad if calculation is instant — the wait is intentional)

**Purpose:** Build anticipation. Communicate that something real is being computed.

```
┌─────────────────────────────────────────┐
│                                         │
│    [Floating element icons pulse]       │
│    木  火  土  金  水                    │
│                                         │
│    Calculating your chart...            │
│                                         │
│    [5 element dots: animated fill]      │
│                                         │
│    [one rotating line / subtle spinner] │
│                                         │
└─────────────────────────────────────────┘
```

**Element characters:** 木火土金水 in their respective element colors, 14px Noto Serif SC, animated with staggered pulse: scale 1.0 → 1.15 → 1.0, each 0.25s delay, soft glow pulse.

**Progress dots:** 5 dots, one per element. They fill left to right over 2.5 seconds using their element colors. This communicates that five distinct calculations are happening.

**Transition out:** Fade out entire screen at 0.5s, then push to `/reveal`.

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

This is the recognition moment. The animation sequence matters:

1. Hero stem mark fades in with brush bleed (filter ramps in over 600ms)
2. "You are..." fades in at 0ms delay
3. Archetype name slides up at 200ms delay
4. Brush underline draws at 350ms
5. Manifesto line 1 fades at 500ms
6. Three badge tiles fade in staggered (Element 600ms · Stem 700ms · Polarity 800ms)
7. Essence paragraph fades at 1000ms

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

**Composition bars:** 5 rows, sorted highest count first. Each row:
- Element icon (20px, element color)
- Element name (EB Garamond, 15px, `#5C554D`)
- Count fraction (`3/8`, 13px, right-aligned, `#6f6b66`) — denominator is 8 (eight characters in the chart)
- Continuous bar: `h-2 bg-[#E5DFD1] rounded-full`, filled portion is element color, animated from 0 → `(count/8)×100%` on scroll-enter, 0.8s easeOut via Framer Motion `whileInView`

Missing element: count shows `0/8`, bar renders empty, missing element callout card activates below.

**Missing element callout card:** Background `${elementColor}10`, border `${elementColor}40`, rounded-xl, p-5. Shows element icon, "Your [Element] is missing", and the missing element paragraph from the engine.

### Section 3: Balance Prescription

Shown **only when a missing element exists** (count === 0 for that element). Charts without a missing element skip directly to the CTA.

The prescription card (`bg-[#EBE5D6] border border-[#DCD3C0] rounded-xl p-6`):
- Header: element icon + "Cultivate [Element]" in element color, 16px, uppercase tracking-widest
- Up to 3 categories from `getElementPrescription(missingElement)`: Environment, Colors, Timing, Physical, Diet
- Each category: small icon (MapPin / Palette / Clock / Gem / Flame) + title (11px uppercase, `#584A3E`) + bullet list of 2–3 concrete actions

**Catalyst and Resistance are NOT shown on the Reveal screen.** They live in the My Chart catalogue (§11 — `CatalystDetailPage`, `ResistanceDetailPage`). The Reveal screen's Section 4 is a simpler, corrective prescription for the absent element only.

**The link to the Today screen:** Catalyst and Resistance serve as the theoretical foundation for the dynamic energy overlay throughout the app. The daily, monthly, and annual energy scores in the Today screen weight favorably toward the user's catalyst elements and unfavorably toward resistance elements. High-flow periods are those where the current periodic element harmonizes with catalysts; clash periods are those where it conflicts with resistances. The Today screen is a live, real-time projection of the same energy dynamics the user encounters when they drill into My Chart.

---

## §10 — Today Screen

**Route:** `/dashboard/`
**Purpose:** Daily utility. The habit-forming screen. 0 taps to value.

### Layout

```
┌─────────────────────────────────────────┐
│ [Decade indicator — full width card]    │
│  AGE 28–37  ·  The Fire Decade          │
│                                         │
│ [ TODAY ] [ MONTH ] [ YEAR ]            │
│   ─────                                 │
│                                         │
│ TODAY TAB ──────────────────────────    │
│                                         │
│ [Date: Wednesday, April 8]              │
│ [Today's element icon + glow]           │
│   METAL DAY                             │
│   丙  ·  Fire Stem                      │
│   [2-line daily message, personalized]  │
│                                         │
│ ─── DO THIS ─────────────────────────── │
│ ○ Bold action — Fire supports it        │
│ ○ Speak up in that conversation         │
│ ○ Initiate, don't wait                  │
│                                         │
│ ─── AVOID ───────────────────────────── │
│ △ Contracts — energy too volatile       │
│ △ Long-term commitments                 │
│ △ Passive waiting                       │
│                                         │
│ ─── BEST HOURS ──────────────────────── │
│ 🌅 7–9 AM  · Planning window           │
│ ☀  11–1 PM · Peak Fire — act boldly    │
│ 🌙 9–11 PM · Wind down, integrate      │
│                                         │
│ ─── YOUR CATALYST TODAY ─────────────── │
│ [Short reading from ELEMENT_ENERGIES    │
│  about how today's element interacts    │
│  with your DM]                          │
│                                         │
└─────────────────────────────────────────┘
```

### Decade indicator

Full-width card, `border: 1px solid #D4AF37`, background `white/60 backdrop-blur-md`, rounded-2xl, p-5.

Shows: `AGE X–Y` (10px uppercase), `The [Element] Decade` (20px EB Garamond serif).

Element icon from `elementIcons` map. The decade element is from `cycles.find(c => c.isCurrent)`.

### Tabs

`[ TODAY ] [ MONTH ] [ YEAR ]` — EB Garamond, 10px, uppercase, letter-spacing 0.15em. Active tab: white pill bg with spring animation (`layoutId="activeTab"`). Inactive: `#8C857B`. Full width, flex, inside a rounded `bg-[#EAE5DF]/50` container.

### Daily guidance card

The guidance message must be **personalized** to the user's DM. Not generic. The format:
- Today's element in the user's element color
- The Chinese stem character of the day
- 2–3 sentence narrative that references how today's energy interacts with YOUR element

Example for 庚 (Metal) DM on a Fire day: *"Fire days press on Metal — the precision meets its furnace. Use that pressure today: it's not friction, it's the forge. What you've been evaluating comes into sharpest focus under this energy."*

This voice comes from the `getDailyGuidance(chart, todayElement)` function. The function must know the user's DM to personalize.

### DO THIS / AVOID sections

Rendered as card with simple list. DO items: checkbox-style left icon (`border-2 border-[#D5CDBD]`, rounded square). AVOID items: triangle warning icon left. Both use `#5C554D` body text, EB Garamond 15px, 1.7 line height.

### Content tier decision

| Tier | Today tab | Month tab | Year tab |
|------|-----------|-----------|----------|
| Free | Pre-authored templates per `DM × day element` | Calendar grid + windows card, pre-computed | Year energy card + strategic guidance template + timeline chart |
| Pro | Claude API, streaming, full Canonical JSON context | Same as free (calendar is always computed) | Claude API strategic guidance, streaming |

The calendar grid and timeline chart are always computed locally — they don't require LLM calls. Only narrative guidance (the 2–3 sentence personalized text) differs between tiers.

### Month tab

**Calendar grid:** 7-column layout (Mon–Sun header row), 4–5 rows of day cells. Each day cell:
- Day number (16px, `#2C2825`)
- Element dot below the number: small colored circle (8px) in that day's element color — element cycles through the 5-element sequence per the solar calendar's daily branch

High-flow days (periodic element harmonizes with DM catalysts): warm border `#D4AF37`, soft gold background tint. No explicit clash marker in V1 — clash days simply render in their element color without embellishment.

**High Flow / Clash Windows card** (below calendar, `bg-[#EBE5D6] border border-[#DCD3C0] rounded-xl`): lists 2–3 date ranges of favorable energy ("High Flow: Apr 3–7, Apr 18–22") and 1–2 challenging ranges ("Challenging: Apr 12–14"). These are pre-computed from `temporal.js` for the current month.

**Day tap:** Bottom slide-in sheet. Shows that day's element name, DO THIS / AVOID / BEST HOURS — same component as the Today tab daily guidance card, but seeded with the tapped date rather than today's date.

### Year tab

Three stacked cards:

**Year Energy card:** The sovereign year's elemental character. Displays the year's heavenly stem + earthly branch (e.g., 丙午 for Fire/Horse 2026), the element label, and a 2–3 sentence description of the year's energetic archetype.

**Strategic Guidance card:** 3–4 sentences personalized to the user's DM — how the year's dominant element interacts with their nature. Free tier: pre-authored template per `[DM stem] × [year element]` combination (~50 templates covering all 10 stems × 5 elements). Pro tier: generated via Claude API with the user's Canonical JSON as context, streamed.

**Energy Timeline chart:** `recharts` `BarChart`, 12 bars (Jan–Dec) on the X-axis. Y-axis: relative energy score (0–100), derived from each month's branch element weighted against the user's catalyst and resistance elements. Bar color: `#D4AF37` (gold) for high-flow months, `#C9C3B8` (muted stone) for neutral/low months. Hover tooltip: month name + energy label ("High Flow" / "Neutral" / "Challenging"). Y-axis values are hidden — the relative visual comparison is what communicates, not the number.

**Temporal calculation note:** All energy scores — daily, monthly, annual — are computed by `engine/temporal.js`. The scoring function weights each periodic element positively for elements matching the user's catalysts and negatively for elements matching resistances. This makes the Today screen a live projection of the energy dynamics already established in the My Chart reading layer (§11).

---

## §11 — Energy Map Screen (Reading Layer)

**Route:** `/dashboard/energy-map`
**Purpose:** The heart of the product. The user's elemental identity expressed as a navigable catalogue — not a scroll, not a chart, but a reading you move through. Every section is drillable. The deeper you go, the more precisely the product mirrors who you are.

**Design principle:** The traditional 八字 birth chart (Four Pillars grid) is intentionally absent from this screen. Western users don't need to decode Chinese characters to feel the depth of their chart — they need the meaning, in language they already speak. The Energy Map surfaces that meaning directly: archetypes, elemental forces, dynamic patterns. The raw chart data is accessible via a separate opt-in view (see Birth Chart Raw Data Page below) for users who want it.

---

### Architecture: Catalogue Navigation

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

## §12 — Guidance Screen (Premium Feature Hub)

**Route:** `/dashboard/guidance`
**Purpose:** The premium layer of the product. Everything that requires deeper engagement — AI, personalized advisories, curated question rituals, education — lives here. The hub is organized as a vertical card stack, each card representing a distinct feature. Free users see the full hub with locked states; upgrading unlocks cards in place.

---

### Hub layout overview

```
GUIDANCE (header — 40px EB Garamond, tracking-widest uppercase, #2C2825)

─── ELEMENTAL DRAW ────────────────────────  ← Free
─── ENERGY MANUAL ─────────────────────────  ← Seeker
─── SELF-REPORT ───────────────────────────  ← Seeker
─── AI CONSULTANT ─────────────────────────  ← Advisor
─── BAZI CODEX ────────────────────────────  ← Free basics / Seeker advanced
─── UPGRADE ───────────────────────────────  ← contextual (shows relevant tier)
```

**Hub container:**
```
background: #F8F6F0
max-width: 480px
margin: 0 auto
padding: 48px 20px 120px
```

**Feature card base spec:**
```
background: #FDFBF8
border: 1px solid #DCD3C0
border-radius: 20px
padding: 24px
margin-bottom: 16px
```

**Card icon circle:**
```
width: 40px
height: 40px
border-radius: 50%
background: #EAE5DF
display: flex items-center justify-center
color: #7A7164
margin-bottom: 16px
```

**Card title:** EB Garamond, 20px, `#2C2825`
**Card body:** system-ui / sans-serif, 15px, `#5C554D`, line-height 1.7
**Tier badge:** `◆ Seeker` or `✦ Advisor` — 10px uppercase, `#D4AF37` or `#8b7355`, positioned top-right of card

---

### Card 1 — Elemental Draw (Free)

**Concept:** A daily question ritual. The deck you draw from is determined by the day's element energy — the same energy governing the Today tab. Free users draw from today's featured deck. Seeker and Advisor users choose any deck, any day.

**Icon circle:** `bg-[#F0EAE0]`, playing card or sparkle icon, `text-[#8b7355]`

**Card visual — the deck:**
```
Three cards fanned face-down at 10° angle offset
Card back face: #EAE4D5 background
  — center: element glyph (e.g., 元 or ☯) in element color, 24px, opacity 0.6
  — subtle shimmer animation: diagonal light sweep across card
    every 4 seconds, 800ms duration, linear, opacity 0.08 → 0.18 → 0.08
Card dimensions: 64px × 90px, border-radius 8px
Shadow: 0 2px 8px rgba(0,0,0,0.08)
```

**Today's featured deck label:**
```
FIRE DAY  ·  PASSION & PURPOSE DECK
```
10px uppercase, `#8C8273`, tracking 0.2em. The deck name maps to the day's element:
- Wood day → "Growth & Vision deck"
- Fire day → "Passion & Purpose deck"
- Earth day → "Stability & Wealth deck"
- Metal day → "Clarity & Career deck"
- Water day → "Depth & Relationships deck"

**Draw button (free users, today's deck):**
```
background: #6b5339
color: #F8F6F0
border-radius: 12px
padding: 12px 24px
font-family: EB Garamond, serif
font-size: 15px
font-weight: 500
letter-spacing: 0.5px
width: 100%
text: "Draw today's card"
```

**Draw interaction flow:**
1. Tap "Draw today's card" — two face-down cards slide out from the deck with spring animation, side by side
2. User taps one card — it flips face-up with a 3D Y-axis rotation (400ms), revealing the question
3. The question fills the card face: 16px EB Garamond italic, `#2C2825`, centered
4. Below the question: the pre-authored answer — 4–6 lines of personalized text, `#5C554D`, 14px
5. The unselected card fades away (`opacity → 0`, 300ms)
6. A quiet "Come back tomorrow for your next draw" note appears at the bottom

**Deck selector (Seeker / Advisor):**
Below the featured deck label, a horizontal row of 5 small deck pills — one per element. Tapping a pill switches the featured deck. Pro users can choose any deck any day and draw up to 3 cards, keeping all open.

```
Deck pill (inactive): bg-[#EAE5DF], border 1px solid #DCD3C0, rounded-full, 11px
Deck pill (active): bg-[element color]20, border 1px solid [element color]50
```

**Coming Soon state (while feature is in development):**
```
Three fanned face-down cards with shimmer animation (as above)
Below: italic text — "Your daily question cards are being prepared —
each one drawn from the energetic current of the day."
Font: EB Garamond italic, 15px, #5C554D
Small badge: "◦ Coming soon" — 11px, #A29A8E, no CTA
```

---

### Card 2 — Energy Manual (Seeker)

**Concept:** A persistent, living document — the user's personalized reading across all five life domains. Seeded by a short setup questionnaire. Updates automatically when decade or year cycles change. The Manual is the primary Seeker value proposition.

**Icon circle:** `bg-[#F5F0E8]`, `BookOpen` icon, `text-[#8b7355]`
**Card background:** `background: linear-gradient(135deg, #FAF8F5 0%, #F5EFE4 100%)`

**For free users — locked state:**
Card shows a blurred excerpt sample:
```
[Blurred text block — Career chapter excerpt visible through blur]
"As The Blade, your precision defines your professional edge.
The current Metal decade amplifies your natural inclination..."
```
`backdrop-blur-sm` overlay with `rgba(248,246,240,0.75)` fill.
Lock icon + `◆ Unlock with Seeker` CTA button.

**For Seeker users — active state:**

**Setup flow (first use only):** A 3-step in-card questionnaire slides open:
1. "Which domains matter most to you right now?" — multi-select pills: Career, Relationships, Wealth, Health, Purpose
2. "What's your biggest focus in the next 6 months?" — short text input (optional, improves AI quality)
3. "Generate my Manual →" CTA

**Domain tabs (post-setup):**
```
[ Career ] [ Relationships ] [ Wealth ] [ Health ] [ Purpose ]
```
Tab pills, 12px uppercase, EB Garamond. Active tab: element color for that domain.

Domain color coding:
- Career → Metal `#7F8C8D`
- Relationships → Fire `#C0392B`
- Wealth → Earth `#B8860B`
- Health → Wood `#4A7C59`
- Purpose → Water `#2E4057`

**Each domain chapter contains:**
1. **Natal reading** — how the user's base chart (Day Master archetype) expresses in this domain (3–4 sentences)
2. **Dominant energy lens** — what the user's primary Ten God archetype creates in this domain (2–3 sentences)
3. **Current chapter** — how the current decade and year energies are shaping this domain right now (2–3 sentences, updates with cycles)

**"Ask your consultant →" button** (Advisor only, appears at the bottom of each domain chapter):
```
font-family: EB Garamond
font-size: 13px
color: #8b7355
border-bottom: 1px dashed #C5BDB0
text: "Ask your consultant about this →"
```
Opens AI Consultant pre-seeded with the domain chapter as context.

---

### Card 3 — Self-Report (Seeker)

**Concept:** The user's life context — a structured intake that enriches all readings and AI responses. Updated over time as life evolves.

**Icon circle:** `bg-[#EEF0F5]`, `ClipboardList` icon, `text-[#6B7C8D]`
**Card title:** "Your Life Context"
**Card body:** "The more you share, the more precisely your readings speak to where you actually are."

**Free state — locked:** Preview shows the structure of the form but fields are blurred. `◆ Seeker` badge.

**Seeker state — active:** A structured form with 4 sections:
1. **Life chapter:** "How would you describe your life right now?" — select: Transition / Building / Thriving / Challenging / Exploring
2. **Key domains:** "Which areas feel most alive or most stuck?" — multi-select: Career, Relationships, Wealth, Health, Purpose
3. **Open context (optional):** "Anything specific on your mind?" — textarea, 3 lines max
4. **Last updated:** Small timestamp, `#8C857B`, 12px

**Save button:** `bg-[#6b5339]` CTA, "Update my context". After save, a quiet confirmation: *"Your readings have been recalibrated."*

---

### Card 4 — AI Consultant (Advisor)

**Concept:** An interactive AI conversation interface with the user's full chart, Energy Manual, and Self-Report context pre-loaded. The consultant doesn't need to be introduced — it already knows who the user is.

**Icon circle:** `bg-[#E8E0F0]`, `Bot` icon, `text-[#8D6B8D]`
**Card background:** `background: linear-gradient(135deg, #F8F4FF 0%, #F0E8FF 100%)`

**Free state — locked:** Shows a sample conversation fragment:
```
User: "Why do I keep sabotaging things when they're going well?"
Consultant: "As The Blade, your Seven Killings archetype..."
```
Text is partially visible, then blurs to: `✦ Unlock with Advisor` button.

**Seeker state — locked:** Same preview, same blur. CTA: "Upgrade to Advisor for live conversations."

**Advisor state — full chat:**
```
┌─────────────────────────────────────────┐
│ [Consultant context bar — collapsed]    │
│  "Reading: Energy Manual loaded · Self  │
│   Report: last updated Apr 19"          │
│                                         │
│ [Chat history — scrollable]             │
│                                         │
│ [Input area]                            │
│  "Ask anything about your path..."     │
│  [Send →]                               │
└─────────────────────────────────────────┘
```

**Context bar:** Collapsed by default, expandable. Shows which context documents are loaded (Energy Manual domains, Self-Report answers). This builds trust — the user knows the AI is reading their actual data.

**Message styling:**
- User messages: `bg-[#6b5339]`, `text-[#F8F6F0]`, rounded-2xl, right-aligned, 15px
- Consultant responses: `bg-[#EBE5D6]`, `text-[#2C2825]`, rounded-2xl, left-aligned, 15px EB Garamond
- Streaming: responses render token by token with a blinking cursor `_` (600ms blink)

**Opening message (first session):** *"I've read your Energy Manual and your life context. I know what your chart says — tell me what's actually on your mind."* Sets the tone immediately: conversational, specific, not generic.

---

### Card 5 — BaZi Codex (Free basics / Seeker advanced)

**Concept:** The educational layer. Teaches the BaZi system — what concepts mean, how they work, why they matter. Separate from the interpretation layer (Energy Map) which applies these concepts to the user's specific chart.

**Icon circle:** `bg-[#EBE5D6]`, `Book` icon, `text-[#A29A8E]`

**Free concepts (always unlocked):**
- What is BaZi? — Four Pillars of Destiny
- Day Master (日主) — Your core nature
- Five Elements — Wood, Fire, Earth, Metal, Water

**Seeker concepts (◆ badge, blurred on free tier):**
- Ten Gods (十神) — The 10 archetypal forces
- Luck Cycles (大运) — Decade energy chapters
- Clashes & Combinations (冲合) — Dynamic chart patterns
- Void & Empty Branch (空亡) — The absent energy
- Yin and Yang Polarity — Energy direction

**Entry design (accordion list):**
```
Tapping entry → expands below:
  Definition (1–2 sentences)       ← always shown
  Explanation (2–3 paragraphs)     ← Seeker+ or visible on free for basic entries
  Your Chart Reference             ← always personalized to this user's chart
```

"Your Chart Reference" is the differentiator — a direct application of the concept to the user's actual chart. Example for a 庚 Yang Metal user reading about Ten Gods: *"Your dominant force is the Seven Killings (七杀) — the archetype of pressure-into-precision. Every challenge in your chart is, by design, a forge."*

**Browse button:**
```
border: 1px solid #A29A8E
color: #4A4238
rounded-xl
padding: 16px
width: 100%
display flex items-center justify-center gap-2
icon: BookOpen 16px
text: "Browse Full Codex"
```

---

### Tier comparison display (contextual upgrade card)

Shown to free and Seeker users at the bottom of the hub. Displays only the next tier above — free users see Seeker; Seeker users see Advisor.

**Layout:**
```
[Gem icon]  Seeker                 $X.XX/month
─────────────────────────────────────────────
✓ Energy Manual (5 domain reading)
✓ Full Energy Map readings
✓ Advanced Codex
✓ Self-Report context
─────────────────────────────────────────────
[ Upgrade to Seeker → ]
```

Background: `linear-gradient(135deg, #D4AF3715, #D4AF3705)`, border `1px solid #D4AF3730`.

## §13 — Friends Screen (Compatibility)

**Route:** `/dashboard/friends`
**Purpose:** Elemental compatibility — comparing your blueprint with people close to you. The primary viral mechanic of the product.

---

### V1 — Coming Soon state

Friends ships as a Coming Soon placeholder in V1. The state is designed to feel intentional, not unfinished.

**Layout:**
```
FRIENDS (header — 40px EB Garamond, tracking-widest, #2C2825)
"Compare your energy with friends, family, or partners"
(15px, #5C554D, max-width 300px, centered)

[Dual seal visual]

[Feature preview card]

[Tier card]
```

**Dual seal visual:**
```
Two circles, side by side, centered:

LEFT CIRCLE (user's seal):
  width: 80px, height: 80px, border-radius: 50%
  border: 2px solid [user's element color]
  background: [element color]15
  center: ArchetypeSeal SVG, 44px, element color

CENTER: thin connection line, 40px wide
  gradient: [user element color] → #D5CDBD
  height: 1.5px
  soft pulse animation: opacity 0.4 → 0.9 → 0.4, 2s repeat

RIGHT CIRCLE (placeholder):
  width: 80px, height: 80px, border-radius: 50%
  border: 2px dashed #D5CDBD
  background: transparent
  center: + icon, 24px, #C5BDB0
  label below: "Someone close" — 11px, #A29A8E
```

**Feature preview card:**
```
background: #EBE5D6
border: 1px solid #DCD3C0
border-radius: 20px
padding: 24px
```
Three feature bullets (icon + text):
- `Heart` icon — "Compare your BaZi chart with friends"
- `Sparkles` icon — "See compatibility scores and relationship archetypes"
- `UserPlus` icon — "Invite friends to compare (V2)"

**Tier card:**
```
background: #F8F6F0
border: 1px solid #EAE5DF
border-radius: 16px
padding: 16px
text-align: center

"Free: 1 comparison / month"     14px, #8C857B
"Seeker: unlimited comparisons"   14px, #8C857B
```

---

### V2 — Full feature (target)

#### Input flow (V2 — Prototype: manual entry)

User fills a form for the comparison subject:
- Name (text, required — for labeling only)
- Birth year, month, day (selects)
- Birth hour (select, optional)
- Location (text, optional — for True Solar Time)
- Energy current (Forward/Yang or Inward/Yin toggle)

**"Calculate Compatibility →"** CTA button. Computation is instant (pure JS from `engine/compatibility.js`).

#### Free tier result

After calculation: slide-up results panel (modal sheet, covers 80% screen, X to dismiss).

```
[Element comparison grid]
  YOU                    THEM
  庚 · Yang Metal        丁 · Yin Fire
  The Blade              The Candle
  [element seal]         [element seal]

[Relationship archetype label]
  "The Forge" — Metal meets Fire
  11px uppercase, #8C8273

[1-sentence teaser insight]
  "Metal and Fire share the most productive tension in the
  five element system — one sharpens, the other reveals."

[Upgrade prompt]
  "Unlock the full relationship reading with Seeker →"
```

#### Seeker tier result

All of free tier, plus:

**Compatibility percentage:**
```
72
% Compatible
font-family: Cormorant Garamond
font-size: 72px (number), 16px (label)
color: #2C2825
```

**Headline:** "Harmonious and Creative" / "Challenging but Growth-Focused" / "Complementary Opposites" — pre-authored per element pair category.

**Full relationship reading:** 3–4 sentence paragraph from `engine/compatibility.js`. Each of the 25 element-pair combinations has a voice-authored archetype (e.g., Fire × Metal: the forge — productive tension, clarity under pressure, the relationship that makes both parties sharper).

**Share card:**
```
background: #2C2825
border-radius: 16px
padding: 24px
[User archetype seal]  ×  [Their archetype seal]
"We're 72% compatible — Metal meets Fire"
[Elementum attribution watermark]
```
Tapping "Share" exports as image. Attribution watermark drives installs.

#### Viral trigger

After the first comparison: a quiet card slides in below the result: *"See how compatible you are with someone else? Seeker unlocks unlimited comparisons."*

#### V2 invite flow (future)

User enters a name, app generates a shareable link. The other person opens the link, completes a lightweight onboarding (date only, no full 7-step flow), and the comparison runs automatically. More accurate data, stronger viral loop.

---

## §14 — Profile Screen

**Route:** `/dashboard/profile`
**Purpose:** Personal data and account management. Intentionally minimal — the chart is the profile. Everything meaningful about the user is expressed through their Energy Map, not through a settings screen.

**Design principle:** No avatar, no username, no social handle. The user's identity in this app is their archetype. The Profile screen exists for data verification and session management only.

### Layout

```
PROFILE (header — 40px EB Garamond, tracking-widest, #2C2825)

[Profile data card]
[Notification settings card]
[Account card]
[Debug card — dev only]
```

### Profile data card

Displays the birth data inputs used to generate the chart:
- Birth Date: `YYYY/MM/DD`
- Birth Time: `HH:00 (Local)`
- True Solar Time: `HH:MM` (shown only if different from local time)
- Location: city name or "Beijing (default)"
- Energy Current: "Forward / Yang" or "Inward / Yin" + edit link if estimated

Each field:
```
label: 10px uppercase, tracking-widest, #A29A8E, font-weight 500
value: EB Garamond, 18px, #2C2825
separator: border-bottom: 1px solid #EAE5DF, padding-bottom: 16px
```

**"Edit birth data →"** link at the bottom of the card. Tapping opens a simplified re-entry flow (same 7-step onboarding, current values pre-filled). Re-entering data regenerates the chart.

### Notification settings card

Shows current notification status and delivery time. Toggle on/off. Time picker (hour selector). Applies immediately.

### Account card (production)

In the production app with auth implemented:
- Email address
- Tier badge (Free / Seeker / Advisor) with current plan label
- "Manage subscription →" link
- "Sign Out" button — ends session only, chart persists server-side

**Sign Out button spec:**
```
background: #8C857B
color: white
border-radius: 12px
padding: 16px
width: 100%
text: "Sign Out"
```

### Debug card (development only)

**This card is a development utility and must not appear in production builds.** It is conditionally rendered only when `process.env.NODE_ENV === 'development'` or when a dev feature flag is active.

```
background: #F8EFE8
border: 1px dashed #C5BDB0
border-radius: 12px
padding: 16px

Label: "DEV TOOLS" — 10px uppercase, #A29A8E

Button: "Reset & Start Over"
  — Clears localStorage, resets chart and birth data, navigates to Welcome
  — background: #8C857B, color: white, rounded-xl
  — On tap: confirmation dialog first ("This will clear all your data. Continue?")
```

**Rationale:** This button enables rapid testing of the onboarding and reveal flows without manually clearing browser storage. In production, clearing data is a destructive action that requires intentional auth-backed flows, not a button.

---

## §15 — Shared Component Library

### Card

The primary content container. Used everywhere.

```css
background: white or #FAF8F5
border: 0.5px solid #E5DFD1
border-radius: 16px
padding: 20px
box-shadow: 0 2px 12px rgba(0,0,0,0.04)
```

Animated entrance: `initial: { opacity: 0, y: 12 }`, delay prop for stagger.

### CalloutCard

For dominant energy, catalyst, friction, and absent element cards.

```
Props:
  color         — element hex
  borderStyle   — "solid" | "dashed"
  icon          — element name (for icon lookup)
  sectionLabel  — "Metal · 4"
  name          — "Metal dominant"
  line          — italic insight sentence
  guidance      — plain guidance sentence
  keywords      — string[] (3–4 chips)
  angles        — { how, works, deep } | null
  count         — number | null
  totalCount    — 10 (for pip display)
  tenGod        — string | null
```

Solid border cards: element color at 8% opacity background, element color at 20% opacity border.
Dashed border cards: transparent background, element color at 50% opacity dashed border.

### SectionLabel

10px uppercase, letter-spacing 2px, EB Garamond weight 500, `#6f6b66`. Always above section content with 16px bottom margin.

### StrengthRing

SVG partial circle. Props: `pct` (0–1), `color`, `stem`, `size` (default 48px). Stem character centered, element color. Used in ProfileReading only.

### ElementIcon

Inline SVG per element. Lucide icon wrappers:
- Wood → `TreePine`
- Fire → `Flame`
- Earth → `Mountain`
- Metal → `CircleDot`
- Water → `Droplets`

Props: `el` (element name), `color` (hex), `size` (px), `strokeWidth` (default 1.5).

### PipBar

Alternative to continuous progress bar. Renders N filled/unfilled pips.

```
Props:
  count: number    — filled pips
  total: number    — total pips (10)
  color: string    — element hex
  dmElement: bool  — true = 88% opacity, false = 58%
  absent: bool     — dashed border pips
```

Pip dimensions: 16px × 6px, gap 2px, border-radius 3px.

### ArchetypeSeal

SVG seal per stem (10 seals). Props: `stem`, `color`, `size` (default 72px). Each seal is a geometric composition using 1.5px strokes.

See Doc 2 §2 for each stem's concept:
甲 → branching tree · 乙 → spiral vine · 丙 → radiating sun · 丁 → upward flame · 戊 → layered peak · 己 → cultivation grid · 庚 → bisected hexagon · 辛 → faceted diamond · 壬 → depth rings · 癸 → wave arcs

---

## §16 — Accessibility & Performance

### Accessibility

**Color contrast:** All text must meet WCAG AA (4.5:1 minimum). The primary text `#2C2825` on `#F8F6F0` passes at 12.5:1. Check element colors at small text sizes — several may need a darker variant for <16px use.

**Touch targets:** Minimum 44×44px for all interactive elements. Navigation icons: 48×48px tap area. Checkbox-style list items: 48px minimum height.

**Semantic HTML:** `<h1>` once per screen, proper heading hierarchy, `aria-label` on icon-only buttons, `role="status"` on question counters.

**Reduced motion:** All Framer Motion animations must check `useReducedMotion()`. When true: remove translate animations, keep opacity only. No parallax. No floating animations.

**Screen reader:** All Chinese characters should have `aria-hidden="true"` and accompanying English `aria-label`. Example: `<span aria-hidden>庚</span><span className="sr-only">Geng — Yang Metal</span>`.

### Performance

**Font loading strategy:**
- Preload: EB Garamond 400 and 500 weights (critical rendering path)
- Async: Ma Shan Zheng (decorative, below the fold)
- font-display: swap for all Google Fonts

**Component boundaries:** `READING_ANGLES` and `ELEMENTAL_NATURE` are module-level constants (see engine). Never define large static objects inside component functions — they rebuild on every render.

**Image strategy:** ArchetypeSeal components are inline SVG — no image requests. Element icons are Lucide components — tree-shaken in build.

**Bundle:** Recharts is the heaviest dependency. Load it lazily for the Month tab calendar chart and Year view bar chart. Today screen can render without it.

---

## §17 — Data Contract Summary

What each screen reads from the engine's Canonical JSON or computed state:

| Screen | Reads from engine |
|---|---|
| Reveal | `chart.pillars`, `chart.dayMaster`, `chart.elements`, `chart.dayMasterArchetype`, `ELEMENT_ENERGIES`, `applyTiaohouToEnergies()` |
| Today | `chart.dayMaster`, `getTodayElement()`, `getDailyGuidance(chart, todayEl)`, `cycles.find(c => c.isCurrent)` |
| My Chart / DayMasterHero | `chart.dayMaster` (stem, element, polarity), `chart.archetypeKey`, `ARCHETYPE_MANIFESTO[stem]` (split on ` · ` for two-line display), identity icon SVG per stem, `STEM_PINYIN[stem]` for badge label, popup data: `FIVE_ELEMENTS[]`, `TEN_STEMS_ROWS[]` for knowledge panels |
| My Chart / EnergyMapMenu | `getElementInsights(chart)` → `{dominant[], missing[]}`, `TG_CARD_DATA[tenGod].chips` (trait chips for blueprint sub-rows), `tgEn(zh)` helper for English Ten God names, `getSections(chart)` for section ordering |
| My Chart / YourNatureDetailPage | `archetypeSource.STEM_CARD_DATA[stem].identity.elementIntro.{punch, expand}`, `ELEMENTAL_NATURE[stem][band]`, `STRENGTH_META`, `computeBand(chart)` |
| My Chart / DomDetailPage | `getElementInsights(chart).dominant[idx]`, `TG_CARD_DATA[tenGod]` (chips, archetype name), `READING_ANGLES[domEl_tenGod]` (three reading angles), `tgEn(zh)`, `computeBand(chart)` |
| My Chart / CatalystDetailPage | `applyTiaohouToEnergies()` catalyst element, `ELEMENT_ENERGIES[stem][band]` catalyst fields, `tgEn(zh)` |
| My Chart / ResistanceDetailPage | `applyTiaohouToEnergies()` resistance element, `ELEMENT_ENERGIES[stem][band]` resistance fields, `tgEn(zh)` |
| My Chart / SeasonalDetailPage | `getElementInsights(chart).missing[]`, missing element paragraphs from engine |
| My Chart / DetailShell | `getSections(chart)` for prev/next labels and step counter; `page` key to resolve current position |
| Guidance | `chart.dayMasterArchetype.name`, question counter from state |
| Connect | `chart.dayMaster`, `chart.elements`, computed compatibility score |
| Me | `chart.meta.birthDate`, `chart.meta.birthHour`, `chart.meta.location`, `chart.meta.gender` |

**The engine feeds everything.** No screen derives its own calculation. If data isn't in the Canonical JSON or a pre-computed lookup, it doesn't appear.

---

## §21 — Upgrade Flow & Tier Transitions

**Purpose:** Every locked feature in the app leads to an upgrade moment. These moments are among the most important UX surfaces — they must feel like a natural next step, not a paywall interruption.

---

### Upgrade modal (tier selection)

Triggered when a user taps a locked feature. Appears as a **modal overlay** — a panel covering ~85% of the screen height, sliding up from the bottom. The content beneath dims to `rgba(0,0,0,0.4)`. An `×` button in the top-right corner dismisses without navigating away.

```
┌─────────────────────────────────────────┐
│                              [×]        │
│                                         │
│  [Feature they tapped — brief context]  │
│  "Unlock your Energy Manual"            │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  ◆ SEEKER           $X.XX/mo   │    │  ← highlighted if relevant tier
│  │  Energy Manual                  │    │
│  │  Full Energy Map readings        │    │
│  │  Advanced Codex                 │    │
│  │  Unlimited Elemental Draw        │    │
│  │  [ Upgrade to Seeker → ]        │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  ✦ ADVISOR          $X.XX/mo   │    │
│  │  Everything in Seeker           │    │
│  │  AI Consultant (full chat)       │    │
│  │  AI-tailored daily readings      │    │
│  │  [ Upgrade to Advisor → ]       │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [Not now — text link, #8C857B, 13px]  │
└─────────────────────────────────────────┘
```

**Modal container:**
```
position: fixed
bottom: 0
left: 0
right: 0
height: 85dvh
background: #F8F6F0
border-radius: 24px 24px 0 0
padding: 32px 24px 48px
box-shadow: 0 -8px 40px rgba(0,0,0,0.12)
z-index: 100
animation: slide up from bottom, 350ms, spring easing
```

**Context header:** The modal opens with a 1-line reminder of what the user was trying to access — "Unlock your Energy Manual" or "Access the AI Consultant." This keeps the upgrade decision anchored to the specific value, not a generic pitch.

**Tier cards:**
```
border-radius: 16px
padding: 20px
margin-bottom: 12px

Seeker card:
  background: linear-gradient(135deg, #FAF8F5, #F0EBE1)
  border: 1.5px solid #D4AF37

Advisor card:
  background: linear-gradient(135deg, #F8F4FF, #F0E8FF)
  border: 1px solid #C9B8E8
```

**Tier name:** 12px uppercase, tracking 0.2em, `#8C8273`
**Price:** 20px EB Garamond, `#2C2825`
**Feature list:** 14px, `#5C554D`, each line preceded by `✓` in element color

---

### Free → Seeker: Ceremonial upgrade screen

After the user confirms the Seeker upgrade (payment processed), the upgrade modal closes and a **full-screen ceremonial moment** plays before returning to the app. This is the recognition moment — the product acknowledges that something has changed.

**Duration:** 3–4 seconds. Skippable by tap.

**Sequence:**

1. **Element flood (0–600ms)**
   The screen fills from the bottom with the user's Day Master element color — a liquid rise animation. Full screen, `opacity: 0 → 0.85`, background becomes `[element color]`.

2. **Seal spring-in (400–900ms)**
   The user's ArchetypeSeal SVG springs into center at 1.6× scale then settles to 1× — `scale: 0 → 1.6 → 1.0`, spring bounce 0.6.

3. **Particle burst (600–1200ms)**
   24 small particles (4–6px circles) in the 5 element colors burst outward from the seal center in a radial pattern. Each particle follows a slightly randomized arc, `opacity: 1 → 0` over 800ms.

4. **Text reveal (900ms)**
   Single line, centered: **"Your reading has been unsealed."**
   Cormorant Garamond, 28px, `#F8F6F0` (on colored background) or `#2C2825` (if background fades), fade-in 400ms.

5. **CTA appears (1800ms)**
   Button: "Explore your Energy Manual →" — slides up from below, 300ms. Tapping navigates directly to the Energy Manual card in Guidance, auto-expanded.

**Visual spec:**
```
background: [user's element color]
  Wood:  #4A7C59  → overlay at 90% opacity
  Fire:  #C0392B  → overlay at 85% opacity (intense, reduce slightly)
  Earth: #B8860B  → overlay at 90% opacity
  Metal: #7F8C8D  → overlay at 90% opacity
  Water: #2E4057  → overlay at 90% opacity

ArchetypeSeal: white version (stroke #F8F6F0) on colored bg, 96px
Text color: #F8F6F0
CTA button: bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.4)] text-[#F8F6F0]
```

---

### Seeker → Advisor: Quiet unlock

The Seeker → Advisor upgrade is handled through the same upgrade modal. No ceremonial screen. Instead:

After payment confirmation, the modal closes, the app returns to the Guidance hub, and the AI Consultant card **unlocks in place** with a brief glow animation:
```
box-shadow: 0 0 0 0px rgba(141,107,141,0) → 0 0 30px 8px rgba(141,107,141,0.3) → 0 0 0 0px rgba(141,107,141,0)
duration: 1200ms, ease-in-out
```

The Consultant card's opening state shows an initial message from the AI:
*"I've read your Manual. Ask me anything."*

This message renders as if streaming — each word appears 80ms apart — creating the impression of a live, thinking presence acknowledging the upgrade.

---

### First session after upgrade (returning user path)

When a user upgrades outside the active session — via web, overnight purchase, or subscription renewal — the app detects the tier change on the next open via a server-side auth/tier check. The in-app ceremonial screen (§21 Free→Seeker) may not have played. This path ensures the upgrade is **acknowledged, celebrated, and oriented** regardless of how it happened.

**Trigger:** App open → tier check returns Seeker (or Advisor) for a user previously stored as Free (or Seeker). Fires once per upgrade event. Tracked via `seekerFirstOpen: true` flag in local storage, cleared after the welcome screen plays.

---

#### Step B — Welcome to Seeker screen

Plays on first app open after upgrade is detected. Full-screen, replaces the normal app open transition. Skippable by tap at any point.

**Duration:** 3–4 seconds auto-advance, or tap to skip.

**Sequence:**

1. **Element flood (0–500ms)**
   Screen fills from bottom with user's Day Master element color — same liquid rise as the in-app ceremony. Full-screen, `opacity: 0 → 0.9`.

2. **Seal spring-in (300–800ms)**
   ArchetypeSeal SVG springs to center: `scale: 0 → 1.5 → 1.0`, spring bounce 0.55, white stroke version on colored background.

3. **Welcome line (700ms)**
   Two lines, centered, staggered:
   - Line 1: *"Welcome back, [Archetype name]."* — Cormorant Garamond 28px, `#F8F6F0`, fade-in 300ms
   - Line 2: *"Your full reading is now open."* — EB Garamond italic 18px, `rgba(248,246,240,0.75)`, fade-in 400ms delay 200ms

4. **What's unlocked preview (1400ms)**
   Three short lines slide up, staggered 80ms each. EB Garamond 15px, `rgba(248,246,240,0.85)`:
   ```
   ✓  Energy Manual — your 5-domain living document
   ✓  Full Energy Map readings
   ✓  Life Chapters — your decade-by-decade arc
   ```
   These are the 3 most compelling Seeker features, not a full list.

5. **CTA (2200ms)**
   Button slides up: *"See what's waiting for you →"*
   Tapping navigates to the Energy Map tab (not Guidance) — the core identity layer, where the most visible unlock difference is immediately obvious.
   ```
   background: rgba(255,255,255,0.18)
   border: 1px solid rgba(248,246,240,0.45)
   color: #F8F6F0
   border-radius: 10px
   padding: 14px 28px
   font-family: EB Garamond, serif
   font-size: 17px
   ```

**Key distinction from in-app ceremony:**
The in-app ceremony (§21) says *"Your reading has been unsealed"* — it marks the act of unlocking. The returning-user welcome says *"Welcome back"* — it acknowledges a decision that was made, confirms it, and points the user forward. Same emotional register, different framing.

**State flag:**
```js
// Set after welcome screen plays
localStorage.setItem('seekerFirstOpen', 'shown');

// Check on app open
if (tier === 'seeker' && localStorage.getItem('seekerFirstOpen') \!== 'shown') {
  // show welcome screen
}
```

---

#### Step C — Contextual unlock reveal (per-feature)

After the welcome screen, as the user navigates the app, each previously locked feature plays a brief **unlock reveal** the first time it is tapped. This creates a series of discovery moments spread across the session rather than a single all-at-once reveal. Every unlock feels earned.

**Trigger:** User taps into a feature that was previously in a locked/blurred state. Fires once per feature. Tracked via `unlockedFeatures: string[]` in local storage.

**Animation sequence (per feature, ~800ms total):**

1. **Lock overlay dissolves (0–300ms)**
   The `backdrop-blur-sm` and `rgba(248,246,240,0.7)` lock overlay fades: `opacity: 1 → 0`, `blur: 4px → 0`. The tier badge (◆ Seeker) and lock icon simultaneously scale down and fade: `scale: 1 → 0.6, opacity: 1 → 0`, 250ms spring.

2. **Content breathes in (200–500ms)**
   Previously blurred content reveals: `opacity: 0 → 1`, `scale: 0.97 → 1.0`, 300ms ease-out. Feels like the content was always there waiting, not like it was created on demand.

3. **Unlock badge flash (400–800ms)**
   A small pill badge appears briefly centered over the content, then fades:
   ```
   "Unlocked"  ← 11px monospace, #8C8273, uppercase, tracking 2px
   background: rgba(139,115,85,0.12)
   border: 1px solid rgba(139,115,85,0.4)
   border-radius: 999px
   padding: 4px 12px
   opacity: 0 → 1 → 0  (200ms in, hold 400ms, 200ms out)
   ```

**Features that play the contextual unlock reveal:**

| Feature | Unlock trigger | What reveals |
|---------|---------------|--------------|
| YourNature full reading | Tap section after map opens | Essence paragraph + tgPattern section |
| Primary/Secondary Force full reading | Tap domain card | All domain readings |
| Life Chapters full timeline | Tap Life Chapters card | Full decade strip + all readings |
| Chart Patterns full readings | Tap Patterns card | All pattern cards |
| Energy Manual | Tap card in Guidance | Full card expands with setup CTA |
| Self-Report | Tap card in Guidance | Full card with questionnaire CTA |
| Elemental Draw any-deck access | Switch deck | Deck unlocks with brief glow |

**State tracking:**
```js
// After each feature unlock reveal plays
const unlocked = JSON.parse(localStorage.getItem('unlockedFeatures') || '[]');
unlocked.push(featureKey);
localStorage.setItem('unlockedFeatures', JSON.stringify(unlocked));

// Check before playing animation
const hasPlayed = unlocked.includes(featureKey);
if (\!hasPlayed) { playUnlockReveal(); }
```

**On subsequent visits:** No animation replays. Content is simply visible. The unlock is permanent — the system never re-locks or re-blurs content for a Seeker user.

---

### One-sentence tier descriptions (for all upgrade surfaces)

These lines appear in upgrade modals, onboarding, and App Store copy. They must communicate the tier value in under 10 words:

- **Free:** Discover your elemental blueprint.
- **Seeker:** Understand how your energy shapes every domain of your life.
- **Advisor:** Your personal AI consultant, guided by your chart.


## §18 — Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | April 2026 | Initial creation. Drafted from V006 Figma prototype + Product Design Doc v005 + Business Analysis. |
| 1.1 | April 2026 | §11 Deliverable 1 (DayMasterHero) redesigned: full-screen identity card layout, stem-specific identity icons (BladeJian for 庚), vertical badge tiles with popup knowledge panels (element / stem / polarity), two-line manifesto format split on ` · `, scroll hint. iPhone phone-frame context documented. §17 updated with popup data contracts. §20 Asset Library added. |
| 1.2 | April 2026 | §11 fully rewritten: reading layer redesigned from 3-deliverable sequential scroll to catalogue navigation system. Added: EnergyMapMenu catalogue home (infographic section cards as nav targets), DetailShell shared navigation shell (back button + step counter + prev/next strip), getSections() navigation sequence function, tgEn() Ten God English name helper, six dedicated detail pages (YourNature, DomDetail ×2, Seasonal, Catalyst, Resistance), DayMasterHero → catalogue gradient fade transition. §5 updated to reflect new My Chart architecture. §17 data contract expanded with all new catalogue components. |
| 1.3 | April 2026 | Major update across §5, §7, §9, §10, §11, §12, §13, §14 + new §21 (Upgrade Flow). Navigation bar finalised (TODAY · GUIDANCE · ENERGY MAP · FRIENDS · PROFILE). Onboarding extended to 7 steps (Step 6: energy current reframe, Step 7: notification opt-in). Reveal screen restructured (4-pillar chart removed, identity-first). Energy Map renamed from My Chart; 8-section catalogue with Life Chapters and Chart Patterns. Guidance redesigned as premium feature hub (5 cards). Pricing model (Free / Seeker / Advisor) documented. Friends V1 Coming Soon state. Upgrade flow + ceremonial screens. §19 Pricing Model added. |
| 1.4 | April 2026 | §7 Step 6 redesigned: three-option sex question (Male / Female / Prefer not to say) with conditional inline reveal of energy current toggle — Yang/Yin framing only surfaces for users who need it. §9 Reveal screen: Four Pillars grid removed from opening; Day Master Identity is now Section 1, Energy Blueprint Section 2, Balance Prescription Section 3, CTA Section 4. §11 DayMasterHero: flat element spectrum bar replaced by element-coloured Ten God ring (single ring encodes TG weight distribution + elemental role simultaneously). New §11 subsection: tgPattern Visual System — five pattern types (Pure/Rooted/Flowing/Forging/Tested), element-to-role colour legend, ring animation spec, tap behaviour, YourNature integration. |
| 1.5 | April 2026 | §7 Step 4 fully redesigned: three-level birth hour input (exact / approximate 6-window / unknown) with dual-chart blend calculation for approximate, 3-pillar calculation for unknown, no blocking at any level. §5 geocoding failure: soft fallback to Beijing longitude, never blocks onboarding. §11 Birth Chart Raw Data page: conditional 3-pillar vs 4-pillar rendering spec, approximate hour `~` indicator, 3-pillar grid layout. New §11 subsection: Chart Resonance Feature (hour discovery post-onboarding, portrait-matching exercise, confidence tiers, reveal moment). New §22: Error States and Data Integrity — geocoding failure, bad calculation handling, unknown hour full calculation spec (dual-chart blend + 3-pillar), chart resonance summary, share card fallback. §21 expanded: first-session-after-upgrade (returning user path) — Welcome to Seeker screen (B: element flood + seal + what's unlocked preview + CTA), contextual unlock reveal system (C: per-feature blur dissolve + content breathe-in + unlock badge, tracked via localStorage, fires once per feature). |
| 1.6 | April 2026 | §9 Reveal Section 1 (Identity) recomposed end-to-end. **ArchetypeSeal (the brushed circle/ring containing the element crescent) removed entirely.** Replaced with a **HeroStemMark** — the painted stem icon (BrushJian for 庚, etc.) at hero scale (~280px), no ring, positioned with negative top margin so the icon pierces THROUGH the ink-wash mountain band (tip above peaks, hilt above eyebrow). New `<StemSign>` dispatcher in `RevealScreen.jsx` routes per-stem to its painted SVG and falls back to `<ElementSign>` for stems without painted art yet. **Single Identity token pill replaced with three flat silk badge tiles** — Element / Stem / Polarity — each opening its own knowledge popup in Phase 2; gradient fill, inset highlight, and inner ring removed; tiles now match `deckleCard` silk surfaces. Manifesto rendering simplified to line-1 only, Cormorant italic 22px. Section background unified to a single flat `#EFE5CC` silk fill spanning the full scrollable height (eliminates the hairline that the layered SilkPaper SVG produced at the section seam). §20 Asset Library updated: BladeJian renamed to BrushJian, redrawn with vertical-portrait 60×220 viewBox + INK fill; StemSign dispatcher pattern documented as the production-grade entry point for all per-stem hero icons. |

---

## §19 — Pricing Model & Content Tiers

### Tier structure

Elementum exposes **two tiers** to users. Two additional tiers (`ADVISOR`, `ORACLE`) are retained in the engine constants for future expansion but are not surfaced in the current UI.

| Constant | Label | Price | Status |
|---|---|---|---|
| `TIERS.FREE` | Free | $0 | Live — full chart, limited depth |
| `TIERS.SEEKER` | Seeker | $9.99/mo | Live — full depth + self-report access |
| `TIERS.ADVISOR` | Advisor | TBD | Engine-reserved, not exposed |
| `TIERS.ORACLE` | Oracle | TBD | Engine-reserved, not exposed |

One additional monetization unit exists outside the tier system:

| Product | Price | Description |
|---|---|---|
| **Self-Report** | $6.99–9.99 one-time | LLM-generated holistic narrative. Purchases a single report for the user's current chart. Not a subscription. Available at SEEKER tier only (requires Seeker to unlock). |

---

### Content gating map

The gating model applies the **revelation sequence** as a product principle: recognition (free) → explanation and domain (Seeker) → full interior and synthesis (self-report). Each tier must create genuine desire for the next before the paywall appears.

#### Deliverable 1 — DayMasterHero (Identity Card)
| Content | FREE | SEEKER |
|---|---|---|
| Archetype seal + name + manifesto | ✓ | ✓ |
| Energy band + tgPattern chips | ✓ | ✓ |
| Shareable code strip | ✓ | ✓ |

Identity card is fully free. It is the hook. Nothing here is gated.

#### Deliverable 2 — ElementSpectrum (Energy Blueprint)

| Content | FREE | SEEKER |
|---|---|---|
| Energy bars (elemental composition) | ✓ | ✓ |
| Elemental Nature card (band reading) | ✓ | ✓ |
| Catalyst element — name + teaser only | ✓ | ✓ |
| Catalyst element — full behavioral reading | ✗ | ✓ |
| Friction element — name + teaser only | ✓ | ✓ |
| Friction element — full behavioral reading | ✗ | ✓ |
| Absent element cards — teaser only | ✓ | ✓ |
| Dominant energy cards — `hook` + `dynamic` | ✓ | ✓ |
| Dominant energy cards — all 13 compound fields | ✗ | ✓ |
| Secondary energy cards | ✗ | ✓ |
| WHO YOU ARE teaser | ✓ | ✓ |

#### Deliverable 3 — ProfileReading (Full Reading)

| Content | FREE | SEEKER |
|---|---|---|
| ProfileReading ring (strength visualization) | ✓ | ✓ |
| twoAM | teaser line only | full |
| Gifts (3) | labels only | labels + desc |
| Edges (2) | label only | label + desc |
| Landscape (thrives + costs) | ✓ | ✓ |
| p1 + p2 paragraphs | ✗ | ✓ |

#### Self-Report (one-time purchase, SEEKER only)

| Content | Included |
|---|---|
| Synthesized holistic narrative combining all chart layers | ✓ |
| Full compound archetype reading for all dominant + secondary energies | ✓ |
| Catalyst and friction behavioral synthesis | ✓ |
| `your_interior`, `your_tension`, `your_build`, `off_track` fields | ✓ |
| Downloadable PDF format | ✓ |

---

### Paywall design principles

**Day 0 urgency is everything.** Industry data shows 80–90% of conversions occur within the first session. The free experience must create depth hunger immediately — not after days of use.

**The free compound card must be specific enough to feel accurate, incomplete enough to feel incomplete.** `hook` and `dynamic` establish recognition. Cutting before `your_scene` and `your_interior` creates the moment where the user knows there is more and wants it. The paywall appears at exactly that cut point.

**Paywall copy never describes what's locked — it names what the user is already feeling.** Not "unlock your full reading." Something closer to: "You've seen what this energy is. There's a version of this that names what it costs you — and what you're actually building."

**The self-report is positioned as a different product, not more of the same.** It is not "unlock more fields." It is "receive a single piece of writing about you specifically — not a collection of card descriptions, but a synthesized reading." This distinction justifies the one-time purchase alongside the subscription.

---

### Upgrade triggers in the UI

| Trigger moment | Location | Mechanism |
|---|---|---|
| Compound card depth hunger | Deliverable 2, after `dynamic` | Soft blur on remaining fields + upgrade prompt |
| twoAM teaser | Deliverable 3 | First ~10 words visible, rest blurred + "your full reading" CTA |
| Self-report prompt | My Chart screen footer | Card: "Your chart as one reading. Generated once, yours to keep." |
| Catalyst/friction full reading | Deliverable 2 | Locked card with accurate teaser + upgrade |

**`◆` indicator** marks all Seeker-only content at the component level. Free users see the indicator and a soft blur. The indicator is not a lock icon — it is a marker that signals depth, not restriction.

---

### Engine implementation notes

- `TIERS.FREE` and `TIERS.SEEKER` are the two active constants
- `TIERS.ADVISOR` and `TIERS.ORACLE` are defined but not referenced in current UI logic
- The self-report purchase is tracked as a separate boolean flag on the user profile (`hasSelfReport: boolean`) — it is not a tier change
- Seeker access gates are implemented via `userTier >= TIERS.SEEKER` checks
- Self-report access gates check both `userTier >= TIERS.SEEKER && user.hasSelfReport`

---

## §22 — Error States & Data Integrity

### Philosophy
Error states in Elementum should never feel like failures — they are handled gracefully, transparently, and without blocking the user's journey. The product never shows raw error codes, blank screens, or alarming language. Every failure has a soft landing.

---

### Geocoding failure (Step 5 — location not resolved)

**Trigger:** City input cannot be geocoded — network failure, unrecognised city name, or API error.

**Handling:** Silent soft fallback.
- Apply Beijing longitude (116.4°E) as default — the traditional BaZi standard, not a hack
- Show quiet inline note: *"Using standard solar time — update location in Profile anytime."* 13px EB Garamond italic, `#6f6b66`
- Continue button remains active — user is never blocked
- Profile screen shows: *"Birth location not confirmed — tap to update →"*
- Chart is calculated and valid; accuracy note is transparent, not alarming

**Do not:** Show a red error state, disable Continue, or ask the user to retry before proceeding.

---

### Bad BaZi calculation (invalid or unresolvable chart data)

Two sub-cases:

**Recoverable edge case** (chart computes but produces unusual output — e.g., extreme element imbalance, rare stem/branch combination):
- Render partial: show what can be computed confidently
- Mark uncertain fields with `~` prefix and muted `opacity-50` treatment
- No error message — just quiet visual distinction
- Log the edge case internally for review

**Unrecoverable error** (calculation throws, null chart, corrupt birth data):
- Do not show a blank screen or generic error
- Navigate the user back to the relevant onboarding step with a gentle prompt:
  *"We couldn't place your birth data precisely — a small adjustment will help."*
- Pre-fill all previously entered values
- Only the problematic field (usually birth time or location) is highlighted for correction
- After correction, re-run calculation and proceed normally

---

### Unknown birth hour (full system)

See §7 Step 4 for the onboarding UX. The calculation behaviour is documented here.

**Three-tier input model:**

| Input type | Calculation | TG weights | tgPattern | Hour pillar display |
|------------|-------------|------------|-----------|---------------------|
| Exact time | Standard 4-pillar | 8 characters | Full confidence | No indicator |
| Approximate window | Dual 4-pillar blend | Average of both 时辰 | Agree → full; diverge → `~` | `~` prefix on stem |
| Unknown (null) | 3-pillar (三柱) | 6 characters (denom stays 8) | From 6-char data | No hour column |

**Approximate window → dual chart blend:**
1. Map selected window to its 2 adjacent 时辰 (e.g., Morning → 辰时 + 巳时)
2. Call `generateChart()` twice — once per 时辰
3. Year/month/day pillars are identical across both (6 of 8 chars confirmed)
4. Hour TG weight = `(chart1.hourTGWeight + chart2.hourTGWeight) / 2`
5. tgPattern = use shared pattern type if both agree; mark `~` if they diverge
6. Branch interactions involving hour = include only if both charts produce the same interaction
7. Store both 时辰 on the chart object for display in Profile and Birth Chart Raw Data page

**Unknown hour → 3-pillar calculation:**
- `chart.hourPillar = null`
- TG weights computed from 6 characters only
- Denominator kept at 8 for cross-user comparability (hour TG slots contribute 0)
- tgPattern derived from 6-character distribution — valid, slightly less precise
- All readings available — no tier gating on incomplete hour
- Life Chapters and Chart Patterns run on day/month/year branch data — hour branch interactions excluded but features remain fully accessible

**Profile completion prompts (non-blocking, non-alarming):**

For approximate hour:
```
"Your birth chart uses an approximate hour."
"Add your exact time for a more precise reading →"
```

For unknown hour:
```
"Your birth chart is a three-pillar reading."
"Discover your birth hour →"    ← initiates Chart Resonance
```

Both shown as quiet cards in Profile, never as alerts or modal interruptions.

---

### Chart Resonance — hour discovery (post-onboarding)

Full spec: see Birth Chart Raw Data Page in §11.

**Summary:** After the user is invested in the product (3+ sessions or explicit tap), a 2-minute portrait-matching exercise narrows the likely 时辰 from 12 → 2–3 candidates using resonance with hour-archetype descriptions. Result updates the chart to 4-pillar (exact or approximate) with a small reveal moment. Traditional BaZi practitioners use this technique when birth time is unavailable.

**Confidence outputs:**
- High → 4-pillar, no indicator
- Moderate → 4-pillar, `~` on hour stem
- Approximate → 4-pillar, `~` on hour stem + *"Based on chart resonance"* note in Profile

---

### Share card error states

If share card generation fails (canvas render error, image export failure):
- Fall back to text share: archetype name + element + one-line essence as plain text
- No error shown to user — the share sheet opens with the text fallback silently
- Log failure for debugging

## §18 — Features: Pending Development

The following features are fully scoped but not yet built. They are documented here to establish the design intent and data contracts before implementation begins.

---

### Dynamic Energy Blueprint

**Status:** Pending development — data foundation in progress.

**What it is:** Daily, monthly, and annual energetic guidance personalised to the user's natal chart. The Blueprint answers the question: *"Given who I am structurally, what does this specific period want from me — and what does it cost me?"*

This is not generic daily horoscope content. Every statement is derived from how the current year/month/day stem and branch interact with the user's natal chart through the classical liunian (流年) analysis framework — annual pillar overlays, major luck cycle activation, stem combinations, and branch clash/harmony dynamics.

**Three time horizons:**

| Horizon | Source mechanism | Update frequency |
|---|---|---|
| **Annual** | Year stem + branch interaction with natal DM and dominant TGs | Once per lunar year |
| **Monthly** | Month pillar overlay on natal chart | Once per month |
| **Daily** | Day stem + branch against natal DM | Daily |

**Delivery model (proposed):**

The feature surfaces in the existing Today screen (§10) as a dedicated card or section below the current daily guidance. Annual and monthly guidance layers sit one scroll below the daily layer — depth on demand, not depth on top of depth.

**Content architecture:**

Each Blueprint entry is structured around the user's `liunianSignatures` field (sourced from `archetypeSource.js` → `STEM_CARD_DATA[stem].liunianSignatures`) combined with computed pillar overlay analysis. Entry structure (proposed):

- **This period's energy** — what the incoming element/stem brings structurally, framed in the DM's elemental register
- **How your chart meets it** — the interaction between this period's force and the user's natal dominant energies
- **What this activates** — specific life domains (career, relationships, wealth, health) where this period's energy is most likely to manifest
- **What to hold** — structural advice framed as the DM would hold it — not prescription, but pattern awareness

**Voice:** Second person, DM elemental register. Same quality bar as reading content. Never generic. Never fate-language.

**Data requirements (to be built before feature launch):**

- `liunianSignatures` field in `archetypeSource.js` for all 10 stems — structured by life domain (career, relationships, wealth, health) with timing notes and classical source attribution
- Computed pillar overlay logic in `Elementum_Engine.jsx` — current year/month/day stem and branch extraction
- Blueprint generation function: takes natal chart + current period → produces structured guidance entry
- Pre-generated annual / monthly entries (offline pipeline, same architecture as Pipeline A in DOC4)
- Daily entries may require lightweight LLM synthesis at generation time or a pre-generated table of 60 day-stem-branch permutations

**Tier assignment (proposed):**

| Horizon | Free | Pro |
|---|---|---|
| Annual — teaser (2–3 sentences) | ✓ | ✓ |
| Annual — full entry | ✗ | ✓ |
| Monthly — teaser | ✗ | ✓ |
| Monthly — full entry | ✗ | ✓ |
| Daily guidance | ✗ | ✓ |

**Design intent:** The annual Blueprint is the primary hook — it is the thing that makes a returning user open the app at the start of each new year. Monthly guidance is the retention mechanic. Daily guidance is the habituation driver.

**Classical grounding:** Rooted in 流年 (liunian) prediction frameworks from 子平真诠 and 滴天髓 — specifically the chapters on annual pillar activation, ten-god year analysis, and 大运流年相互作用 (major luck cycle × annual pillar interaction). `liunianSignatures` in `archetypeSource.js` is the authored content foundation. Classical source for each event signature must be logged internally.

---

## §20 — Asset Library

This section catalogs all SVG and icon assets used in the current implementation. It is maintained as a reference for design iteration — each entry notes what the asset represents, where it is used, its current implementation status, and what a production version would require.

**Status key:** `INLINE SVG` — fully implemented as inline JSX code · `NEEDED` — asset identified but not yet created

---

### Identity Icons (per-stem)

These are the large central images on the DayMasterHero / Reveal Identity card. One per stem. Each should visually embody the stem's archetype — not a logo, but a rendered ink illustration that the user would immediately associate with their identity. They are the **stem sign** (the painted form of who you are), distinct from the **element sign** (the abstract line iconography for the element family — crescent, tree, triangle, etc.) which lives in the chip strip.

**Implementation pattern (`<StemSign>` dispatcher):** All stem icons render through a single `<StemSign stem element size color>` dispatcher in `RevealScreen.jsx`. The dispatcher routes each stem to its painted SVG and falls back to the generic `<ElementSign>` for stems whose painted icon isn't authored yet — so the hero slot is never empty during incremental authoring.

| Stem | Archetype | Element | Asset name | Current status | Notes |
|---|---|---|---|---|---|
| 庚 | The Blade | Yang Metal | `BrushJian` | INLINE SVG | Vertical jian (直剑) — long tapered down-stroke, short cross-guard, bound grip, pommel dot. ViewBox 60×220 (slender). Renders in `INK` to read as raw iron. See visual direction below. |
| 甲 | The Oak | Yang Wood | `OakArchetype` | NEEDED | Tall figure at forest edge at dawn, upward brushstrokes behind |
| 乙 | The Vine | Yin Wood | `VineArchetype` | NEEDED | Figure reaching upward and sideways; vine tendrils integrated into form |
| 丙 | The Sun | Yang Fire | `SunArchetype` | NEEDED | Radiant figure, light from chest not prop; others shown as warm shadows |
| 丁 | The Ember | Yin Fire | `EmberArchetype` | NEEDED | Seated figure, flame cupped in both hands; face half-lit, half-shadow |
| 戊 | The Mountain | Yang Earth | `MountainArchetype` | NEEDED | Massive still figure grown from ground; tiny scale reference elements |
| 己 | The Field | Yin Earth | `FieldArchetype` | NEEDED | Figure kneeling, hands in soil; wide horizontal composition, low horizon |
| 辛 | The Jewel | Yin Metal | `JewelArchetype` | NEEDED | Figure catching light from multiple angles; dark surround, faceted linework |
| 壬 | The Ocean | Yang Water | `OceanArchetype` | NEEDED | Figure mid-motion within water, governing it; enormous implied scale |
| 癸 | The Rain | Yin Water | `RainArchetype` | NEEDED | Figure seen through or composed of falling rain; saturated, flowing ink |

**Production direction:** All 10 stems should have their own painted identity SVG in a consistent ink-wash style. `BrushJian` establishes the design language: SVG path geometry with `feTurbulence` + `feDisplacementMap` to bleed the edges, vertical-portrait viewBox, single-color ink (NOT element pigment — element color lives in the chip strip and the surrounding context, while the painted form itself stays Wabi-sabi monochrome iron / wood / fire / water / earth). All marks must scale gracefully from chip context (~28px) to hero context (~280px); `BrushJian` does this by keeping all proportions parameter-free relative to the viewBox.

**Hero placement:** All stem signs are placed via `<HeroStemMark stem element size>` at the top of Reveal Section 1. The wrapper applies `marginTop: -40` so the painted mark visually pierces the ink-wash mountain band rendered behind it. No ring, no enclosing seal — the painted mark IS the identity, not a logo inside a frame.

---

### §20.2 — Inner Council: The Ten God Visual Personas

The Inner Council is the central character system of Elementum. Each of the 10 Ten Gods is a personified psychological force — a humanoid deity drawn from the tradition of Chinese mythological office-bearers (神官). Every god has a specific post, a signature prop (法宝), and a voice that speaks to the user from within their chart.

**The design frame:** In ancient Chinese myth (封神演义, 西游记), every function of the cosmos has a humanoid god with a specific temperament and tool. Elementum's Inner Council follows this logic: the Ten Gods are not abstractions — they are officials in the user's inner court, each governing a specific domain of the psyche.

**The element-color system:** Each Inner Council character's visual palette adapts to the user's Day Master element. The character archetype (The General, The Alchemist, etc.) is fixed — but the armor, robes, and accent colors shift to match the user's element. A Metal DM's General wears steel-blue armor. A Wood DM's General stands in bamboo-forest green. This is the "I am the blue one" moment — the same character, personalized to your nature.

**Illustration style:** Ink wash (水墨) with element-color accents. All characters share a consistent style: expressive brushwork for figure and atmosphere, precise linework for the prop, parchment background with ink-bleed textures. No photorealism. Characters appear as luminous ink-figures — present but not quite of this world.

**Two uses in the app:**
1. **Dominant TG card** — The user's dominant force is introduced as a full character reveal in the Energy Blueprint section. Animated summoning: scroll unrolls, ink bleeds into the figure's shape, character name appears.
2. **TG ring detail** — Smaller, iconic renders of each TG appear when the user taps segments of the element-colored TG ring on the DayMasterHero.

---

#### The Vanguard (Companion Forces — 比肩 · 劫财)

**1 · The Mirror** `比肩`
- **Full epithet:** The Mirror-Twin · Keeper of the Inner Standard
- **Council role:** The Internal Compass
- **Prop:** The Bronze Mirror of Sincerity — when raised, cancels the noise of others' opinions; only one's own truth remains visible
- **Council voice:** *"We don't need their approval. We already know who we are."*
- **Visual direction:** A monk-warrior shown from behind or in profile — deliberately ambiguous, as this character looks like the user. Simple, unadorned silk robes. The Bronze Mirror is held at chest height. The posture is immovable, rooted. Composition: calm, symmetrical, self-contained. Ink: clean, controlled lines with almost no atmospheric wash — clarity is the visual language.
- **Element coloring:** Robes and mirror frame take DM element color. The reflection in the mirror shows the same color back.

**2 · The Rival** `劫财`
- **Full epithet:** The Silver Rival · Edge of the Comparison
- **Council role:** The Social Engine
- **Prop:** The Hook of Comparison — snags the attention, status, and resources of those nearby, but holds them loosely
- **Council voice:** *"Look at what they have. Now take it."*
- **Visual direction:** A dashing duelist in a competitive stance — one hand on hip, the other extending the Hook toward an implied target outside the frame. Flamboyant details: decorated collar, a smirk that reads as both charming and dangerous. The composition feels laterally oriented — this character always measuring against something at the same level. Ink: dynamic, slightly theatrical brushwork.
- **Element coloring:** Jacket and hook chain in DM element color. The implied rival target at the edge of frame is a contrasting shadow.

---

#### The Artisans (Output Forces — 食神 · 伤官)

**3 · The Muse** `食神`
- **Full epithet:** The Celestial Muse · Bearer of the Jade Ladle
- **Council role:** The Creative Flow
- **Prop:** The Jade Ladle of Abundance — dipped into any situation, it extracts a hidden creative solution that arrives as if it was always there
- **Council voice:** *"Relax. The inspiration comes when the tea is ready."*
- **Visual direction:** A relaxed scholar-figure reclining against a pavilion post or low table. Long sleeves, loose clothing. The Jade Ladle rests nearby, a small wisp of steam rising. One hand holds a brush, the other a wine cup. The expression is one of complete ease — not laziness, but zero friction between inner state and output. Ink: soft wash, warm tones, inviting composition.
- **Element coloring:** Robes and ladle rim in DM element color. The steam carries a hint of element color as it dissipates.

**4 · The Edge** `伤官`
- **Full epithet:** The Rebel Edge · Wielder of the Thunder-String
- **Council role:** The Disruptive Genius
- **Prop:** The Thunder-String Pipa — music of extraordinary beauty with edges that can shatter glass, expose lies, or break the silence of institutions
- **Council voice:** *"The rules are for people who aren't as smart as us."*
- **Visual direction:** A sharp-featured prodigy with wild, ink-dark hair mid-performance or mid-confrontation. The Thunder-String Pipa is slung across their back or held at a defiant angle. The expression is simultaneously brilliant and dangerous — aware of the disruption and choosing it. Background: suggestions of a cracked or disrupted frame, as if the brilliance is exceeding the container. Ink: dynamic, broken lines, expressive energy.
- **Element coloring:** Pipa body and hair accent in DM element color. The sound-wave brushstrokes emanating from the strings carry element color.

---

#### The Ministers (Wealth Forces — 偏财 · 正财)

**5 · The Horizon** `偏财`
- **Full epithet:** The Wind-Chaser · Bearer of the Star-Map
- **Council role:** The Visionary
- **Prop:** The Wind-Chasing Banner — when waved, reveals the currents of opportunity months before they arrive to anyone else
- **Council voice:** *"Why count grains of rice when we could own the field?"*
- **Visual direction:** A sun-darkened merchant-traveler with a star-map unfurled in one hand, the Wind-Chasing Banner streaming behind them. The figure is mid-stride, facing a wide horizon that dominates the composition — they are always at the edge of the known territory, never fully arrived. The scale of the horizon dwarfs the figure slightly. Ink: open composition, expansive washes, feeling of wind and motion.
- **Element coloring:** Banner and map borders in DM element color. The horizon itself bleeds into element color at the edge.

**6 · The Steward** `正财`
- **Full epithet:** The Golden Steward · Keeper of the Infinite Abacus
- **Council role:** The Pragmatist
- **Prop:** The Infinite Abacus — beads slide with lightning speed to calculate the precise ROI of any decision; it provides stability but registers risk acutely
- **Council voice:** *"Hard work is the only math that never lies."*
- **Visual direction:** A meticulous figure in heavy, embroidered court robes. The Infinite Abacus is held at waist height, mid-calculation. The posture is completely grounded — no theatrical quality, just precision and accountability. A ledger is implied nearby. Composition: formal, stable, anchored at the center of frame. Ink: deliberate, measured strokes. Every fold of the robe is placed.
- **Element coloring:** Robe embroidery and abacus frame in DM element color. The bead currently being moved carries a gold highlight.

---

#### The Enforcers (Authority Forces — 七杀 · 正官)

**7 · The General** `七杀`
- **Full epithet:** The Scourged General · Wielder of the Seven-Star Halberd
- **Council role:** The Protector
- **Prop:** The Seven-Star Halberd — grows heavier and sharper under pressure; it transforms what the user has survived into the force that protects them going forward
- **Council voice:** *"The pressure isn't here to break you. It's here to forge the blade."*
- **Visual direction:** A battle-scarred warrior in dark armor standing in a storm. The Seven-Star Halberd rests point-down, held lightly — not threatened, forged. The face carries the specific expression of someone who has survived something and knows what it cost. Not triumphant. Not defeated. The storm in the background is ongoing. Composition: the most dramatic in the council — the figure is a vertical axis in a diagonal world. Ink: heavy, storm-dark washes, strong contrast.
- **Element coloring:** Armor trim and halberd stars in DM element color. The storm washes behind carry element color in their deepest tones.

**8 · The Arbiter** `正官`
- **Full epithet:** The Iron Arbiter · Holder of the Seal of Mandate
- **Council role:** The Conscience
- **Prop:** The Seal of Mandate — when pressed, a decision becomes official, binding, and legitimate; it transforms aspiration into social contract
- **Council voice:** *"What will the world think of us if we fail our duty?"*
- **Visual direction:** A stern figure in formal court robes, the Seal of Mandate raised or extended outward. The composition is deliberately symmetrical — this character operates within frames and embodies them. The expression is not harsh but serious, duty-carrying. A heavy scroll of laws is implied at the side. Ink: precise, contained lines. Nothing informal or asymmetrical. The Seal itself is the compositional anchor.
- **Element coloring:** Robe borders and Seal face in DM element color. The stamped impression glows briefly in element color.

---

#### The Mentors (Resource Forces — 偏印 · 正印)

**9 · The Alchemist** `偏印`
- **Full epithet:** The Moonlit Alchemist · Keeper of the Flask of Transmutation
- **Council role:** The Intuition
- **Prop:** The Flask of Transmutation — contains a liquid that can transform a curse into a blessing; the process is painful, solitary, and works only in darkness
- **Council voice:** *"The truth is hidden in the dark. Don't be afraid to go there alone."*
- **Visual direction:** A solitary, eccentric figure in a shadow-tower study, seen at an oblique angle — never quite head-on. The Flask of Transmutation glows faintly in one hand, the only warm light in the composition. Scrolls, astronomical instruments, and arcane materials are suggested in the shadows. The expression is inward, absorbed in something others cannot see. Ink: night-scene — deep washes with a single luminous point. The figure is partially consumed by the darkness, partially lit by their own work.
- **Element coloring:** Flask glow and robe trim in DM element color. The rest of the composition is deliberately desaturated to make the element color luminous by contrast.

**10 · The Sage** `正印`
- **Full epithet:** The Grand Sage · Bearer of the Brush of Life
- **Council role:** The Nurturer
- **Prop:** The Brush of Life — can rewrite a difficult year into a learning chapter; it channels the protection of ancestors and the direction of accumulated wisdom into a single stroke
- **Council voice:** *"Rest now. The ancestors have already paved the road for you."*
- **Visual direction:** A warm, white-haired elder figure with the Brush of Life raised mid-stroke. Floating books or scrolls drift around them, drawn by the same force that makes the brush move. One hand extends toward the viewer — the gesture is simultaneously welcoming and directional. The most approachable composition in the council: open, warm, centered. Ink: broad, confident strokes for the figure; soft washes for the floating materials. The warmth of the composition matches the warmth of the character.
- **Element coloring:** Robes and brush handle in DM element color. The ink trail from the Brush of Life glows briefly in element color before settling to deep ink black.

---

#### Inner Council — Reveal Card Format

When a user first encounters their dominant Ten God (in the reveal sequence or Energy Blueprint section), the card appears as an **animated summoning**:

1. **The scroll** — aged parchment background unrolls from top to bottom (300ms)
2. **The ink bleed** — the character's form bleeds into shape from a center point, like ink dropped into water (500ms, ease-out)
3. **The name** — short name appears first in Cormorant Garamond 38px, then epithet in EB Garamond 15px below (700ms)
4. **The council voice** — the voice quote fades in italicized at the bottom (900ms)
5. **The prop label** — small label identifies the prop in the illustration (1100ms)

**Card dimensions:** Full-width mobile card (~390px), 520px tall. Character illustration occupies upper 65% of card. Text block occupies lower 35% on parchment background.

**Card fields (rendered):**
- `name` → large title (38px Cormorant)
- `epithet` → subtitle (15px EB Garamond, italic)
- `councilRole` → eyebrow label above name (11px, tracked, uppercase)
- `councilVoice` → bottom quote (15px EB Garamond, italic, accent-colored)
- `prop` → small caption over illustration (13px, bronze accent)

All five fields are now authored in `archetypeSource.js → TG_CARD_DATA[tg]`.

---

### Version history

| Version | Date | Changes |
|---|---|---|
| §20 initial | Prior session | BladeJian spec, stem icon table (庚 only complete) |
| §20 v1.1 | 2026-04-22 | Completed stem identity table with all 10 archetypes + visual directions. Added §20.2 Inner Council visual personas for all 10 Ten Gods. Added reveal card format spec. |
| §20 v1.2 | 2026-04-24 | BladeJian renamed to **BrushJian**, redrawn with vertical-portrait 60×220 viewBox + INK fill (was element pigment). Added the **StemSign dispatcher pattern** as the production entry point for all per-stem hero icons — routes per-stem, falls back to ElementSign for stems whose painted SVG isn't authored yet. Added the **HeroStemMark** placement convention (negative top margin so hero icon pierces ink-wash mountain band). Asset table updated to reflect that stem signs render in INK monochrome, NOT element pigment. |