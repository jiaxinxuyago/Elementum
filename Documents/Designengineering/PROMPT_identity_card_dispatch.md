# PROMPT · Claude Design — Identity Card (DayMasterHero) iteration

**Goal:** redesign the **identity card** — DOC5's DayMasterHero / Deliverable 1, "the hook, fully free" — so the new **painterly stem seal** becomes its centerpiece. Explore *both* seal-led and ring-led compositions, at *two scales*. Structure only (grayscale wireframes) — aesthetics applied later in code.

**How to use:** send `DESIGN_STATUS_for_claude_design.html` once for context, then this brief + the attachments below. This is a single-screen dispatch in the same pipeline as `PROMPT_claude_design_wireframes.md` (reuse its Global Constraints block: 390×844 frame, locked spacing/radius/type/palette).

---

## WHAT THE IDENTITY CARD IS

The day-master identity — the first thing the user sees about themselves, and the thing they'd screenshot/share. It appears on **two surfaces** (design each for its job — they do *not* share one layout):

| Surface | Where | Job | Current state (the layout to beat) |
|---|---|---|---|
| **A · Compact** | Top of the Reading catalogue (center tab) | Quick identity glance; tappable into Day Master detail | Full-bleed painterly portrait tile + an 86px frosted box holding the **stem hanzi character** + archetype + polarity. *No seal, no ring, no manifesto.* |
| **B · Full** | The Reveal / Energy Map (first-run ceremonial, single scroll) | The ceremonial "you are…" moment | Hand-coded `BrushJian` SVG (only 庚 painted; 9 stems fall back to a generic line mark) + archetype + manifesto + 3 badge tiles + essence. *No painterly seal for 9/10 stems.* |

Both are **fully free** — nothing on the identity card is gated.

---

## THE LOCKED INPUT — the new two-tier iconography

From `Iconography - Stems & Elements.html` (attach it):

- **Tier 1 · geometric** — 5 element marks (SVG, `currentColor`, pure silhouette). Used in chips/tokens.
- **Tier 2 · painterly** — **10 stem seals** (ink-wash enso, transparent PNG, 440×440, element-pigmented). The doc reserves these *"for ceremonial moments: the identity-card day-master, the Reveal hero."* **These are the new centerpiece.** Filenames: `icons/stems/{jia,yi,bing,ding,wu,ji,geng,xin,ren,gui}.png` (e.g. 庚 = `geng.png` = blade-in-enso).

**Rules:** the seal carries its own element pigment — never recolor it. One painterly focal point per surface (the seal). Element identity also enters via the Tier-1 mark + the eyebrow — not by tinting the painting.

---

## CONTENT INVENTORY (label every box; tag tier-A/B where it appears)

| Element | Data source | A·Compact | B·Full |
|---|---|---|---|
| **Stem seal** (Tier-2 painterly) | `icons/stems/<pinyin>.png` | ✓ centerpiece | ✓ centerpiece |
| Archetype name ("The Blade") | `STEM_CARD_DATA[stem].identity.archetypeName` | ✓ | ✓ |
| Identity token chip `[庚 · Yang Metal · The Blade]` | `dayMaster` + Tier-1 mark | ✓ | ✓ |
| Manifesto (2-line, split on ` · `) | `identity.manifesto` | — | ✓ |
| Essence paragraph | `identity.elementIntro.expand` | — | ✓ |
| **Element-colored TG ring** (200px) | `TGRing` ← `chart.tenGods` | optional | ✓ |
| TG-ring center label (element · polarity) | `dayMaster` | — | ✓ |
| tgPattern name + descriptor | `chart.tgPattern` | chip only | ✓ full |
| Energy band chip (concentrated/balanced/open) | `getEnergyBand(strength)` | ✓ | ✓ |
| Shareable code strip | `chart.archetypeKey` | optional | ✓ |
| "View your birth chart →" link | route `chart-reveal` | — | ✓ |

**Ten God ring encodes two dims at once** (keep this — it's the data richness): segment **size** = weight of each role across the 4 pillars; segment **color** = role from the DM's view (fixed: Authority=fire-red · Resource=earth-gold · Wealth=wood-green · Output=water-blue · Companion=metal-silver).

---

## THE ASK

Produce wireframes for **both surfaces**. For **each** surface, give **3 structural variations**, and across the set make sure at least one is **seal-led** and one is **ring-led**:

- **Seal-led** — the painterly stem seal is the dominant hero; the TG ring (if present) is secondary/below or deferred to surface B.
- **Ring-led** — DOC5's TG ring stays the primary visual; the seal shrinks to an identifying mark (e.g. centered in the ring, or in the token chip).

For each variation: tag every visual box with a slot name (SEAL · MARK · RING · TOKEN · TEXT · SHARE), annotate the one-line trade-off, fit 390px wide, no horizontal scroll.

**Specifically resolve:**
1. **Seal-on-art legibility** (surface A) — the seal would sit over a painterly portrait tile (two ink-wash layers competing). Show how you separate them: drop the tile, heavy scrim, seal-on-paper inset, etc.
2. **Where the ring lives** when the seal leads — below the seal, on scroll, or surface-B-only.
3. The **share moment** — what the screenshotted/shared frame looks like (seal + name + token + code).

---

## ATTACH

- `DESIGN_STATUS_for_claude_design.html` (once, for context)
- Current replicas (the layout to beat): `app-replicas/screens/14-reading-catalogue-seeker.png` (surface A) + `13-reveal.png` (surface B) + `17-read-daymaster.png`
- `Iconography - Stems & Elements.html` + the `icons/stems/` seals (the locked centerpiece input)
- `tokens.css` (palette/type/scales)

## ACCEPTANCE
3 distinct variations per surface · ≥1 seal-led + ≥1 ring-led overall · every box slot-tagged · fits 390px · seal legibility solved on surface A · one share-frame shown.
