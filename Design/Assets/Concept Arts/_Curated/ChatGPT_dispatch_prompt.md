# Paste-ready dispatch prompt for ChatGPT

Copy everything between the `===` lines and paste into a fresh ChatGPT conversation **after attaching `ChatGPT_Backgrounds_v1.zip`**.

---
===

You are receiving a curated reference package for the Elementum app — a Chinese-metaphysics (BaZi 八字) iOS reading app with a Chinese ink-wash visual language. Your job is to batch-generate 19 screen backgrounds via DALL-E 3, using the package's references and specs.

**Do NOT generate any image yet.** Follow these steps in order.

---

### Step 1 — Unzip and list

1. Use code interpreter to extract `ChatGPT_Backgrounds_v1.zip` into a working directory.
2. List the full contents (filenames, sizes, folder tree). Show me the listing.
3. Confirm the package contains exactly:
   - 4 top-level files: `00_README.md`, `01_targets.md`, `02_style_anchors.md`, `reference-board.html`
   - 1 subfolder `references/` with 20 JPGs named `ref-01-*` through `ref-20-*`

If anything is missing or different, **stop and tell me** before proceeding.

---

### Step 2 — Read files in this exact order

Read and summarize each file in turn. After each, give me a 2–3 sentence summary so I can confirm you understood it. Do not collapse all four reads into one summary.

1. **`00_README.md`** — overview + DALL-E prompt template
2. **`02_style_anchors.md`** — visual law: palette, composition, painter map, anti-patterns, sniff tests
3. **`01_targets.md`** — the 19 target backgrounds (specs for each)
4. **`reference-board.html`** — only skim the embedded `<table class="target-table">` to cross-verify it matches `01_targets.md`. You don't need to render the HTML.

After all four reads, also **inspect the 20 JPGs in `references/`** using vision. For each, report:
- Filename
- A 1-sentence visual description (what's actually in the painting — composition, motif, atmosphere)

This step protects against bad references slipping through. If any reference looks off-style for ink-wash (e.g. saturated color, photorealistic, has text/signature), flag it.

---

### Step 3 — Pre-flight questions (you MUST ask these before generating)

Once you've read everything, ask me the following before any DALL-E call. Don't infer answers — ask.

1. **Aspect ratio strategy.** DALL-E 3 supports `1024×1024`, `1024×1792`, `1792×1024`. Targets list 9:16, 16:9, 4:3, 3:4. For the 4:3 modal targets (#9–#12), do you want them generated as 16:9 and cropped later, or as 1:1 squares?
2. **Batch size.** Do you want me to generate all 19 in one pass, or in batches of 4 with a checkpoint after each batch for your approval?
3. **Reference-vision mode.** Should I attach reference JPGs as vision input on each DALL-E call (treats them as visual style anchors), or rely on text-only painter anchors from `02_style_anchors.md`?
4. **Save path.** Where should I save the generated PNGs in my workspace before zipping for download? (Default: `outputs/backgrounds/<filename>.png` matching `01_targets.md` exactly.)
5. **Re-roll policy.** If a generation fails any sniff test in `02_style_anchors.md` §5 (negative space < 30%, color saturation, Western perspective, cute motifs, signatures/borders), should I auto-retry up to 2× or stop and ask you?
6. **Tone variants.** Some targets request "warm tone" or "cool tone" while staying monochrome. Do you want me to interpret that as ink temperature (warmer-grey vs cooler-grey washes) or skip the tone modifier entirely if DALL-E starts producing color?

Wait for my answers. Do not proceed past this step until I respond.

---

### Step 4 — Generation workflow (only after Step 3 confirms)

Once I've answered, follow this loop for each target in `01_targets.md`:

**For each target:**
1. Compose the DALL-E 3 prompt using the template in `00_README.md` §"DALL-E 3 prompt template", filling the four bracketed slots from the target's row in `01_targets.md`.
2. Add the per-target painter anchor from `02_style_anchors.md` §3 (painter / motif map).
3. Append the universal constraint block:
   > *"Monochrome black ink + grey washes only, no color. No human figures. No text, signature, seal, or border. Asymmetric composition, generous negative space, atmospheric perspective via opacity."*
4. Show me the composed prompt before calling DALL-E (so I can correct drift early).
5. Call DALL-E 3 at the requested aspect ratio.
6. Save the PNG with the exact filename from `01_targets.md`.
7. Run the 5 sniff tests from `02_style_anchors.md` §5 against the result. Report pass/fail per test.
8. If any test fails, follow the re-roll policy I gave you in Step 3.

**After each batch (per the batch size I chose in Step 3):**
- List the filenames generated and their pass/fail status
- Pause and wait for my approval before continuing to the next batch

---

### Step 5 — Final delivery

After all 19 are generated and approved:

1. Zip the `outputs/backgrounds/` folder into `Elementum_Backgrounds_v1.zip`
2. Provide a download link
3. Output a final summary table: filename · status (approved / re-rolled N×) · sniff-test summary · DALL-E prompt used
4. Identify any targets that needed substantial deviation from spec — those need human review before going to production

---

### What you must NOT do

- **Don't fabricate references.** Only the 20 JPGs in `references/` are real anchors. Don't claim other files exist.
- **Don't skip the pre-flight questions in Step 3.** Even if my intent seems obvious, ask. The cost of one extra round-trip is far less than 19 misaligned generations.
- **Don't auto-batch all 19 without my Step-3 confirmation** of batch policy.
- **Don't apply UI design** (typography, layouts, chrome). You're generating raster paintings only. The Elementum codebase handles all UI composition.
- **Don't translate the painter names** (Fan Kuan, Ma Yuan, Mi Fu, etc.) into Western painters. The aesthetic is specifically Chinese literati ink-wash; Western analogues will drift the output.
- **Don't add element-pigment color** (Wood green, Fire terracotta, etc.) into the source paintings. Those tints are applied later in CSS by the app. Source is monochrome.

---

### Begin

Start now with **Step 1**: unzip the package and report the file listing. Don't move past Step 1 until I see your listing.

===
