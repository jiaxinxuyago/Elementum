# Targets — 19 backgrounds across 10 page contexts

Each target lists: filename · ratio · page context · subject · composition · tone · painter anchor · reference IDs (cross-ref `references/`).

Painter anchors map to `02_style_anchors.md` §3 (painter / motif map).

---

## Phone full-bleed backgrounds (9:16 portrait)

These render behind the entire phone screen (390×844 viewport). Generate at DALL-E's largest portrait size (1024×1792). Foreground content sits over them at 70–85% opacity, so the painting can be slightly more dramatic than a typical UI background.

### 1. `bg-reveal-mountain-mist.png`
- **Page context:** Reveal screen — first impression, ceremonial; the user opens the app and sees their archetype reveal
- **Subject:** single vertical mountain rising from layered mist, foreground silhouette darker than distant ridges
- **Composition:** mountain offset to the right (~62% across), mist filling the lower two-thirds and the left
- **Tone:** cool, contemplative, restrained — the "first breath" tone
- **Painter anchor:** Fan Kuan — *Travelers Among Mountains and Streams*
- **Reference:** `ref-01-mountain-vertical-foreground.jpg`, `ref-19-earth-mountain-mist.jpg`
- **Ratio:** 9:16

### 2. `bg-reveal-water-horizon.png`
- **Page context:** Reveal screen alternative — when archetype is water-natured (壬/癸 stems)
- **Subject:** still water plane below, horizon at 1/3 from top, faint distant ridge above the horizon, single small island at bottom right
- **Composition:** asymmetric — island and ridge sit on the right axis, left two-thirds is open water + open sky
- **Tone:** cool, glassy, very quiet
- **Painter anchor:** Ma Yuan — *Angler on a Wintry Lake* (atmospheric water studies)
- **Reference:** `ref-09-landscape-panorama-twilight.jpg`, `ref-14-water-flow-ripple.jpg`
- **Ratio:** 9:16

### 3. `bg-today-dawn-mountain.png`
- **Page context:** Today screen — daily focus reading, warm tone for morning openings
- **Subject:** mountain silhouette with subtle warm-grey wash suggesting first light, no actual sun
- **Composition:** central peak, mist banded across the lower third
- **Tone:** warmer grey wash (still no color — the warmth comes from ink-temperature rendering), hopeful
- **Painter anchor:** Liang Kai — figural / dramatic atmospheric (warm tone reference)
- **Reference:** `ref-04-mountain-square-central-peak.jpg`, `ref-11-fire-blaze-warm.jpg` (for warm tone hint)
- **Ratio:** 9:16

### 4. `bg-today-dusk-water.png`
- **Page context:** Today screen alternative — daily focus, cool tone for evening openings
- **Subject:** still water with single moored boat silhouette at bottom, distant ridge fading at top
- **Composition:** vertical center-axis composition (boat below, ridge above) with mist layer between
- **Tone:** cool, dusky, settled
- **Painter anchor:** Ma Yuan — *Angler on a Wintry Lake*
- **Reference:** `ref-09-landscape-panorama-twilight.jpg`, `ref-14-water-flow-ripple.jpg`
- **Ratio:** 9:16

---

## Hero band backgrounds (16:9 landscape, used at 358×340 with crop)

These render at the top of a Reading-catalogue or detail page. Generate at 1792×1024 landscape; we crop to 358×340 in CSS via `object-fit: cover`.

### 5. `bg-hero-mountain-foreground.png`
- **Page context:** Reading catalogue (mosaic mode) — hero band above the 2-col grid
- **Subject:** large foreground mountain mass on the left, three layered distant ridges to the right
- **Composition:** asymmetric weight on the left, generous mist on the right
- **Tone:** neutral grey, balanced
- **Painter anchor:** Fan Kuan — layered ridge atmosphere
- **Reference:** `ref-04-mountain-square-central-peak.jpg`, `ref-01-mountain-vertical-foreground.jpg`
- **Ratio:** 16:9

### 6. `bg-hero-mountain-distance.png`
- **Page context:** Reading catalogue alt — softer hero, more atmospheric
- **Subject:** five layered ridges receding into mist, foreground ridge at 60% opacity
- **Composition:** horizontal banding, no single dominant peak
- **Tone:** soft, atmospheric, "many small things adding up"
- **Painter anchor:** Mi Fu / Mi Youren — mist-dot atmospheric layers
- **Reference:** `ref-05-mountain-square-mist-layered.jpg`, `ref-02-mountain-vertical-distance.jpg`
- **Ratio:** 16:9

### 7. `bg-hero-river-flow.png`
- **Page context:** Reading catalogue — water-themed alternative
- **Subject:** river curving from upper-left to lower-right with banks rendered in calligraphic strokes; mist layered above the river
- **Composition:** diagonal water motion, mist as horizontal counterweight
- **Tone:** flowing, calligraphic
- **Painter anchor:** Ma Yuan — *Twelve Views of Water* (calligraphic flow studies)
- **Reference:** `ref-08-landscape-panorama-river.jpg`, `ref-14-water-flow-ripple.jpg`
- **Ratio:** 16:9

### 8. `bg-hero-pine-canopy.png`
- **Page context:** Reading catalogue — wood-themed alternative
- **Subject:** ancient pine bough crossing horizontally in upper third, mountain silhouette below in mid-distance
- **Composition:** pine bough as upper border, open negative space and mountain below
- **Tone:** firm, vertical-into-horizontal
- **Painter anchor:** Wen Tong / Wu Zhen — pine and bamboo
- **Reference:** `ref-10-wood-pine-canopy.jpg`, `ref-16-plant-pine-asymmetric.jpg`
- **Ratio:** 16:9

---

## Modal hero band backgrounds (4:3 landscape, used at 358×260)

These render as the painterly band at the top of a modal sheet (card-reveal moments). Tighter aspect ratio than hero. Generate at 1792×1344 (closest 4:3 DALL-E supports — use 4:3 if available else 16:9 cropped).

### 9. `bg-modal-mountain-twilight.png`
- **Page context:** Card reveal modal — ceremonial, stem-archetype reveal
- **Subject:** mountain at right with mist at left, last light suggested (slight warm wash on peak only)
- **Composition:** weight on right, mist gradient on left
- **Tone:** ceremonial, slightly warm
- **Painter anchor:** Fan Kuan + atmospheric Liang Kai
- **Reference:** `ref-04-mountain-square-central-peak.jpg`, `ref-09-landscape-panorama-twilight.jpg`
- **Ratio:** 4:3 (or 16:9 if 4:3 unavailable)

### 10. `bg-modal-mist-band.png`
- **Page context:** Card reveal modal — quiet, daily-snippet reveal (lower ceremony)
- **Subject:** three soft horizontal layers of mist with faint ridges peeking through; no dominant subject
- **Composition:** horizontal banding, very low contrast, all in mid-greys
- **Tone:** atmospheric, breathing, no focal point
- **Painter anchor:** Mi Fu / Mi Youren — mist-dot technique (foundational reference)
- **Reference:** `ref-17-pattern-mist-wash.jpg`, `ref-05-mountain-square-mist-layered.jpg`
- **Ratio:** 4:3 (or 16:9)

### 11. `bg-modal-fire-glow.png`
- **Page context:** Card reveal — fire-themed (丙 Yang Fire / 丁 Yin Fire stems)
- **Subject:** abstract suggestion of warmth — single dark form on the right with radiating soft greys, NO actual flame imagery
- **Composition:** asymmetric warmth, dark-against-pale
- **Tone:** warmer than other modals, but still monochrome
- **Painter anchor:** Liang Kai — Six Patriarchs (dramatic dark forms)
- **Reference:** `ref-11-fire-blaze-warm.jpg`
- **Ratio:** 4:3

### 12. `bg-modal-metal-edge.png`
- **Page context:** Card reveal — metal-themed (庚 Yang Metal / 辛 Yin Metal stems)
- **Subject:** clean cool greys, single calligraphic vertical line on the right (suggesting an edge), generous mist around it
- **Composition:** vertical line as anchor, mist as field
- **Tone:** cool, precise, jewel-like
- **Painter anchor:** Ming scholar's-table painting tradition (refined precision)
- **Reference:** `ref-13-metal-blade-cool.jpg`
- **Ratio:** 4:3

---

## Onboarding ambient backgrounds (16:9 landscape, used at 326×140)

These set ceremonial mood without competing with the input form above them. Generate 1792×1024.

### 13. `bg-onboarding-horizon.png`
- **Page context:** Onboarding step — neutral atmospheric mood for any step
- **Subject:** wide horizon line at 60% from top, soft distant mountain on the left, generous sky above and water/plain below
- **Composition:** dominant horizon, asymmetric mountain accent
- **Tone:** neutral, settled, "the world before you"
- **Painter anchor:** Ma Yuan — small-scene composition
- **Reference:** `ref-07-landscape-panorama-horizon.jpg`, `ref-12-earth-field-spacious.jpg`
- **Ratio:** 16:9

### 14. `bg-onboarding-still-water.png`
- **Page context:** Onboarding step — calm/cool mood for time-of-birth or location steps
- **Subject:** still water surface with single tiny ripple ring, distant ridge faintly visible on horizon
- **Composition:** lower 2/3 water, upper 1/3 sky, ripple offset to one side
- **Tone:** very still, very calm
- **Painter anchor:** Ma Yuan — *Twelve Views of Water* (still water study)
- **Reference:** `ref-14-water-flow-ripple.jpg`, `ref-09-landscape-panorama-twilight.jpg`
- **Ratio:** 16:9

---

## Catalogue ambient overlays (9:16 portrait, used at 390×844 with low opacity)

These sit BEHIND a Reading-catalogue scroll with `opacity: 0.18` and `mix-blend-mode: multiply`. They should be subtle textures/atmospheric supports, NOT focal images.

### 15. `bg-catalogue-paper-grain.png`
- **Page context:** Reading catalogue — silk-paper grain texture, very subtle
- **Subject:** aged silk paper grain — faint horizontal banding, occasional fold marks, slight color variation
- **Composition:** even, no focal point, slight diagonal grain
- **Tone:** paper, neutral cream-grey
- **Painter anchor:** none — pure paper texture
- **Reference:** `ref-18-pattern-paper-grain.jpg`
- **Ratio:** 9:16

### 16. `bg-catalogue-mist-vertical.png`
- **Page context:** Reading catalogue alt — vertical mist gradient ambient
- **Subject:** vertical bands of mist with very faint ridges peeking, top is paper-pale, bottom slightly denser
- **Composition:** vertical gradient with faint horizontal disruption (ridge ghosts)
- **Tone:** ambient, atmospheric
- **Painter anchor:** Mi Fu — mist atmosphere
- **Reference:** `ref-17-pattern-mist-wash.jpg`, `ref-02-mountain-vertical-distance.jpg`
- **Ratio:** 9:16

---

## Empty state (9:16 portrait, used at 390×844)

### 17. `bg-empty-sparse-bamboo.png`
- **Page context:** Empty list or zero-results state — the page should feel intentional, not broken
- **Subject:** single sparse bamboo stalk on the right edge, generous negative space taking 80% of the canvas
- **Composition:** Ni Zan-style sparseness, all weight on one edge, the rest is breath
- **Tone:** quiet, intentional, "not yet" (not "missing")
- **Painter anchor:** Ni Zan — sparse landscapes
- **Reference:** `ref-15-plant-bamboo-sparse.jpg`
- **Ratio:** 9:16

---

## Compatibility / Friends V2 (9:16 portrait with central axis)

### 18. `bg-pair-twin-peaks.png`
- **Page context:** Compatibility reading screen — two stems compared side-by-side; the bg supports the dual-axis layout
- **Subject:** two distinct mountain peaks balanced left and right, mist valley between them
- **Composition:** mirror-balanced (rare in ink-wash but works for this UI purpose), central mist axis
- **Tone:** balanced, contemplative-comparative
- **Painter anchor:** generic landscape — adapt Fan Kuan-style ridge work for paired peaks
- **Reference:** `ref-03-mountain-vertical-twin-peaks.jpg`, `ref-08-landscape-panorama-river.jpg`
- **Ratio:** 9:16

---

## Energy Map ambient (9:16 portrait, used at 390×600)

### 19. `bg-energymap-radial-mist.png`
- **Page context:** Energy Map screen — supports a 5-element pentagram diagram overlay; bg should be radial/non-directional
- **Subject:** radial mist atmosphere with no horizon line — abstract atmospheric field
- **Composition:** radial gradient (denser at edges, paler at center) with random ridge-ghosts at low opacity
- **Tone:** abstract, supports overlay diagram
- **Painter anchor:** Shi Tao — atmospheric splash-ink
- **Reference:** `ref-17-pattern-mist-wash.jpg`
- **Ratio:** 9:16

---

## Summary table

| # | Filename | Ratio | Page context |
|---|---|---|---|
| 1 | `bg-reveal-mountain-mist.png` | 9:16 | Reveal screen |
| 2 | `bg-reveal-water-horizon.png` | 9:16 | Reveal screen (water variant) |
| 3 | `bg-today-dawn-mountain.png` | 9:16 | Today screen (warm) |
| 4 | `bg-today-dusk-water.png` | 9:16 | Today screen (cool) |
| 5 | `bg-hero-mountain-foreground.png` | 16:9 | Reading catalogue mosaic hero |
| 6 | `bg-hero-mountain-distance.png` | 16:9 | Reading catalogue alt hero |
| 7 | `bg-hero-river-flow.png` | 16:9 | Catalogue (water-themed) |
| 8 | `bg-hero-pine-canopy.png` | 16:9 | Catalogue (wood-themed) |
| 9 | `bg-modal-mountain-twilight.png` | 4:3 | Card reveal modal (ceremonial) |
| 10 | `bg-modal-mist-band.png` | 4:3 | Card reveal modal (quiet) |
| 11 | `bg-modal-fire-glow.png` | 4:3 | Card reveal modal (fire stems) |
| 12 | `bg-modal-metal-edge.png` | 4:3 | Card reveal modal (metal stems) |
| 13 | `bg-onboarding-horizon.png` | 16:9 | Onboarding step (neutral) |
| 14 | `bg-onboarding-still-water.png` | 16:9 | Onboarding step (cool) |
| 15 | `bg-catalogue-paper-grain.png` | 9:16 | Catalogue ambient overlay (paper) |
| 16 | `bg-catalogue-mist-vertical.png` | 9:16 | Catalogue ambient overlay (mist) |
| 17 | `bg-empty-sparse-bamboo.png` | 9:16 | Empty state |
| 18 | `bg-pair-twin-peaks.png` | 9:16 | Compatibility pair |
| 19 | `bg-energymap-radial-mist.png` | 9:16 | Energy Map abstract bg |
