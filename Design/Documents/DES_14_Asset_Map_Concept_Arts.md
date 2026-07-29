# ASSET MAP · Concept Arts → screen slots

**Companion to** `PROMPT_claude_design_wireframes.md`. The wireframe brief decides *structure* (where a hero / tile / band sits). **This map decides which painterly asset skins that slot** once the structure is chosen, and which slots are still un-sourced.

**Three reference systems govern the look** (attach alongside this map):
- **Aesthetic language** → `Design/Library/Library_Primitives.html` (mood-foundation absorbed; original in `Design/Archive/`) + `Design/Assets/Moodboards/atmospheric-depth/` (3-/5-layer depth) + `brush-samples/` (stroke vocabulary).
- **Card / hero archetypes** (where art is allowed to sit, crop ratios, ink-wash treatment) → `Design/Library/Library_Components.html` (S4 Inkstone) + `Library_Backgrounds.html` (S4-S5 ink-wash law; legends v6/v7 retired 2026-07-29).
- **Marks / primitives** (the SVG element seals, not raster) → `Design/Library/Library_Iconography.html` (S1, Set E3 restored) + `Design/Source/icons.svg`.

> **Pipeline note.** The app only reaches assets that have been **mirrored into `Elementum_App/public/`**. Today that is a *thin* slice (see §5). The Concept Arts source folder is large; this map names the *source* asset so curation/mirroring is a lookup, not a hunt.

---

## 0 · The slot taxonomy (six kinds)

Every painted/drawn asset in the app fills exactly one of these. Wireframes label boxes with these names.

| Slot | What it is | Source family | Crop | Current code hook |
|---|---|---|---|---|
| **PAGE-BG** | Full-screen subtle scenery, low opacity (0.08–0.16) behind a whole dashboard tab | atmospheric-depth · Landscapes · Mountains · Patterns | 390×844, bleed | `SCREEN_BG` (`styles/backgrounds.js`) → `PageBg` |
| **SCENE-HERO** | The picture band at the top of a reading-detail / Energy Map hero | Five Elements per-element studies (Burn/Blade/Water/Wood/Field) | ~390×260 band, top-crop | `elementArt(element)` → `SceneHero` |
| **TILE** | Catalogue thumbnail (Reading tab mosaic, Guidance cards) | per-element studies (small crop) + Patterns as fallback | square/4:3 | `VisualTile artSrc` |
| **STEM-THUMB** | The one *finished*, per-stem signature portrait (e.g. 庚 = The Blade) | Stem Thumbnail/ (1 of 10 done) | square | `/Stem Thumbnail/…` (Day Master hero) |
| **MARK** | The element seal / icon — **SVG, not raster** | `Library_Iconography.html` S1, `Source/icons.svg` | inline | `<Icon>` / element-mark `<use>` |
| **TEXTURE** | Paper grain, mist band, enso — neutral, element-agnostic | brush-samples · Patterns · scenes/pattern-enso | tiling/bleed | `scenes/` + reading rice-paper bg |

Rule of thumb from the ink-wash law (`Design/Library/Library_Backgrounds.html` S5): **one raster focal point per screen.** A SCENE-HERO *or* a strong PAGE-BG, not both at full strength. Everything else is MARK (SVG) + TEXTURE (≤0.12 opacity).

---

## 1 · The element → stem motif map (the spine)

The Concept Arts folders already encode the **yin/yang split inside each element** — the classical stem imagery. Use the Yang asset for the Yang stem, Yin for the Yin stem. This is the single most reusable mapping in the product (drives SCENE-HERO, TILE, STEM-THUMB).

| Element | Pigment | Yang stem | Yang imagery (source folder) | Yin stem | Yin imagery (source folder) |
|---|---|---|---|---|---|
| **Wood** `#7a9e6e` | 甲 jiǎ — tall timber, the tree | `Five Elements/Wood/Wood (1–10)` (trunks, forest) | 乙 yǐ — grass, vine, bloom | `Five Elements/Wood/Wood_Green (1–10)` + `Plants/Plants (1–10)` |
| **Fire** `#c4745a` | 丙 bǐng — sun, open blaze | `Five Elements/Fire/Burn (1–10)` + `Flare (1–10)` | 丁 dīng — candle, lamp, ember | `Five Elements/Fire/Fire_Pattern (1–10)` (softer, contained) |
| **Earth** `#b89a6a` | 戊 wù — mountain, boulder | `Five Elements/Earth/Mountains (1–10)` + `Mountains/ (1–20)` | 己 jǐ — field, tilled soil, garden | `Five Elements/Earth/Field (1–10)` |
| **Metal** `#8ba3b8` | 庚 gēng — axe, blade, sword | `Five Elements/Metal/Blade (1–10)` + `Metal (1–10)` | 辛 xīn — jewel, ornament, fine metal | `Five Elements/Metal/Jewels (1–10)` |
| **Water** `#5a7fa8` | 壬 rén — ocean, river, flood | `Five Elements/Water/Water_rivers (1–8)` + `Water (1–10)` | 癸 guǐ — dew, rain, mist | `Five Elements/Water/Water_dropsandsplash (1–9)` + `water_drops (1–3)` |

**Element-agnostic / composite:** `Five Elements/Five Elements (1–7)` — all five together, for neutral overview heroes (Energy Map blueprint, Reveal). Already wired as `ELEMENT_ART_COMPOSITE`.

> The current code (`elementArt`) is **element-only** — it picks `Fire-Burn (1).png` for any Fire DM regardless of yang/yin. **Upgrade path:** key `elementArt` on `stem` (or `element+polarity`) to honour the table above (丙→Burn, 丁→Fire_Pattern, etc.). The source assets already exist; only the resolver + mirroring are missing.

---

## 2 · Per-screen slot assignments

Read top-to-bottom as "when the wireframe for this screen is chosen, fill its slots from here." Cross-references to the wireframe brief's screen numbers.

### Today (brief §1) — `/dashboard/`
- **PAGE-BG:** `atmospheric-depth/atmospheric-5-layer.png` (layered ridges, top-anchored) + warm-gold radial wash. *Already wired* (`SCREEN_BG.today`, `MIST_5`).
- **Decade indicator:** MARK only — element seal of the *decade* element, gold rim. No raster.
- **Catalyst card:** small SCENE-HERO crop of the catalyst element (per §1).
- **MONTH calendar dots / YEAR timeline bars:** pure token color (pigment), no art.

### Reading catalogue (brief §2) — `/dashboard/reading`
- **PAGE-BG:** `backgrounds/bg-reading-04-rice-paper.png` (real painted rice-paper, 0.10). *Already wired.*
- **Day-master identity hero:** STEM-THUMB if the stem's portrait exists (only 庚 today → `Stem Thumbnail/Geng_TheBlade.png`), else SCENE-HERO from §1 by DM element.
- **6 reading TILES:** each = MARK (element seal) on a pigment-tinted gradient, **hybrid** with a small per-element art crop (§1). Theme→art:
  - Elemental Nature → DM-element study · Dominant Energies → composite `Five Elements (n)` · Forces in Motion → `Fire/Flare` or contrast pair · Life Chapters → `Landscapes/` (journey) · Daily Reading → `atmospheric-3-layer` · Pillar Patterns → `Patterns/`.

### Reading detail template (brief §3) — `read-*`
- **SCENE-HERO band:** `elementArt(DM element)` per §1 (upgrade to per-stem). *Wired; `readingDetailBg→null` so the hero carries the only raster.*
- **Section cards:** TEXTURE only — `brush-samples/05-mist-band.png` or `09-wash-gradient.png` as a faint card-top accent, ≤0.10. No second focal image.
- **Per-page variant art:** Forces → `Fire/Flare` (↑Catalyst) vs `Water/water_drops` (↓Resistance) pairing · Life Chapters → `Landscapes/` horizontal strip · Patterns → `Patterns/` badges.

### Energy Map (brief §4) — `app-energymap`
- **Hero:** SCENE-HERO by DM element (§1), or `ELEMENT_ART_COMPOSITE` for the blended blueprint.
- **PAGE-BG:** one of the finished `bg-energymap-0{1–4}` painted backgrounds (top-band / center-glow / split-horizon). *Already painted + mirrored.*
- **Energy blueprint bar:** pure pigment segments, no art.

### Guidance hub + sub-screens (brief §5–6) — `/dashboard/guidance`
- **PAGE-BG:** `atmospheric-depth/atmospheric-3-layer.png` (quiet mist) + faint violet premium corner. *Already wired* (`SCREEN_BG.guidance`, `MIST_3`).
- **5 feature TILES:** MARK + tier badge; art optional and restrained (premium = quieter). Elemental Draw card may use `Metal/Jewels` (the "draw a card" motif).
- **Elemental Draw deck:** STEM-THUMB / per-element study card faces (§1) — this is the one sub-screen that *wants* full art per card.

### Friends / Compatibility (brief §7) — `/dashboard/friends`
- **PAGE-BG:** `atmospheric-5-layer.png` centered (horizon = meeting line). *Already wired* (`SCREEN_BG.compat`).
- **Intro dual-seal:** two MARKs (your element seal × their element seal), bronze.
- **Result element grid:** you×them = two SCENE-HERO crops (§1) flanking the archetype; relationship archetype gets `scenes/landscape-river-pavilion.png` as a "meeting place" backdrop.

### Profile (brief §8) — `/dashboard/profile`
- **PAGE-BG:** `atmospheric-3-layer.png` sunk to bottom, faintest (0.08). *Already wired* (`SCREEN_BG.profile`). Intentionally minimal — no SCENE-HERO.

### Raw Chart + Resonance (brief §9) — `chart-reveal` / `chart-resonance`
- **Raw chart:** no raster; pillars are pigment-colored type on cardstock. TEXTURE `pattern-enso` watermark optional.
- **Resonance reveal:** the discovered 时辰 → element/animal SCENE-HERO crop by the recovered branch's element (§1).

---

## 3 · Neutral / system pools (element-agnostic)

| Asset | Source | Slot | Use |
|---|---|---|---|
| `atmospheric-3-layer.png` / `atmospheric-5-layer.png` | Moodboards/atmospheric-depth | PAGE-BG | dashboard tab scenery (3 = quiet, 5 = active) |
| `brush-samples/01–10` | Moodboards/brush-samples | TEXTURE | card accents, dividers, stroke vocabulary for SVG authoring (bold-stroke, ink-pool, dry-brush, splash-dots, mist-band, layered-ridges, asymmetric-branch, calligraphic-line, wash-gradient, negative-space) |
| `Patterns/Patterns (1–10)` | Concept Arts/Patterns | PAGE-BG / TEXTURE | abstract ink fields, low-opacity fills, pattern badges |
| `Landscapes/Landscapes (1–10)` | Concept Arts/Landscapes | PAGE-BG / journey-hero | Life Chapters, Reveal, any "journey/horizon" surface |
| `scenes/landscape-river-pavilion.png`, `scenes/pattern-enso.png` | (already in public) | SCENE / TEXTURE | meeting-place backdrop · enso watermark |
| `_Curated/ChatGPT_Backgrounds_v1/references/ref-01–20.jpg` | Concept Arts/_Curated | **reference only** | the curated style targets (mountain/landscape/per-element/plant/pattern) — feed these to ChatGPT/DALL-E as style anchors, **not** shipped assets |

---

## 4 · Marks & icons (SVG — never raster)

The "_Icon", "_Icons", "_icons", "Jewel_Icons", "Blade_Icon" PNG sets inside each element folder are **icon-design references**, not ship assets. The shipping element seals are the **SVG marks** in `Design/Source/icons.svg` (rendered census: `Design/Library/Library_Iconography.html` S1). When a wireframe box says "icon/mark," it resolves to SVG `<use href>`, tinted by pigment — *not* to a PNG from Concept Arts. Keep these PNG icon sets as design-reference for refining the SVG marks only.

---

## 5 · Mirroring status & gaps (the work this map exposes)

**Currently mirrored into `Elementum_App/public/` (all the app can reach today):**
- `concept-arts/five-elements/` — **1 study per element** (`*-(1).png`) + 1 composite. *Yang only; no yin variants, no alternates.*
- `concept-arts/atmospheric/` — both depth maps. ✓
- `concept-arts/scenes/` — river-pavilion + enso. ✓
- `Stem Thumbnail/` — **`Geng_TheBlade.png` only** (1 of 10 stems). ✗ 9 missing.
- `backgrounds/` — 24 PNGs, but **only ~5 are finished painted art** (reveal · onboarding · energymap · reading rice-paper); **8 are "PLACEHOLDER" spec cards** that bleed text and are replaced by CSS gradients in `SCREEN_BG`.

**Open gaps (in priority order):**
1. **Per-stem thumbnails — 9 of 10 missing.** Only 庚 exists. Blocks the Day Master hero / Elemental Draw deck from being per-stem. → ChatGPT/DALL-E batch, one per stem, using §1 imagery + `ref-*` style anchors.
2. **Yin-stem SCENE-HERO art unmirrored.** `elementArt` is element-only. To honour §1 (丁→candle, 辛→jewel, 癸→dew, 乙→grass, 己→field), mirror the yin folders and key the resolver on stem. Source assets already exist — no generation needed, just curation + a resolver tweak.
3. **8 placeholder dashboard backgrounds.** Today/Guidance/Friends/Profile/reading-detail are CSS-gradient stand-ins. Real painted PNGs drop in at the same filename — *or* the wireframe pass may decide these screens want `atmospheric-*` scenery instead (already wired), making the placeholders moot.
4. **TILE art crops.** The catalogue mosaic currently leans on gradient+mark; per-theme art crops (§2 Reading catalogue) need curating from the per-element studies.

---

## 6 · How to use this with the wireframe pass

1. Run `PROMPT_claude_design_wireframes.md` **first** — pick the structure per screen (structure only, grayscale).
2. For the chosen structure, read off its slots here (§2) and pull the named source asset (§1, §3).
3. Curate + mirror that asset into `public/` (the gap list in §5 is the shopping list).
4. Rebuild in React with real tokens + `SceneHero`/`VisualTile`/`PageBg`, keeping **one raster focal point per screen** (§0).
5. Anything still un-sourced after §5 → ChatGPT/DALL-E dispatch, anchored on `_Curated/…/ref-*.jpg` + the §1 motif.
