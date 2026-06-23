# Claude Design handoff — Elementum UI/UX consistency + polish pass

> **Scope: consistency alignment + visual polish ONLY — NOT a redesign.** See §0
> of `00-MASTER-CONTEXT.md`. Preserve existing layouts, structure, content, and
> IA; bring drifted screens into line with the established patterns and refine finish.

This folder is the complete package for a Claude Design pass on Elementum's
major screens. Everything Claude Design needs is here (it can't open the live
app — it's sandboxed).

## Contents
- **`current-screens.html`** ⭐ — a single self-contained file with the **exact
  rendered HTML** of all 32 screens (real markup + the app's actual inline styles
  + bundled CSS). Open in a browser to see every screen as a true 390×844 device
  frame; this is the best artifact for Claude Design to **replicate exactly**,
  then polish. (Painted art loads from the live site; structure reproduces even
  if images don't.)
- **`00-MASTER-CONTEXT.md`** — load once per session. Project, design language,
  IA, current-state assessment, global consistency rules, workflow.
- **`screens/`** — 32 clean, no-bezel, full-content PNG captures of every major
  screen (visual reference / quick overview).
- **`index.html`** — grouped gallery of the 32 PNGs with route + note.
- **`manifest.json`** — machine-readable list of the PNG captures.
- **`briefs/`** — one focused per-page/per-journey brief. Run ONE at a time.
- **`reference-art/`** — ink-wash reference images for art direction (Claude
  Design can't paint raster, so it needs these). See that folder's note.

## How to run a session (the short version)
1. In Claude Design, **upload**: `current-screens.html` (the exact screens to
   replicate) + the relevant `screens/*.png` + the `reference-art/*` images.
2. **Paste** `00-MASTER-CONTEXT.md`.
3. **Paste** one brief from `briefs/` (start with `brief-guidance-suite.md`).
4. Review the returned HTML mockup against that brief's **Acceptance criteria**.
5. Iterate that one screen, then move to the next brief.

## Suggested order
1. `brief-guidance-suite.md` (the lead — 5 features + hub)
2. `brief-compatibility.md`
3. `brief-profile.md`
4. `brief-reading-tab.md`
5. `brief-today-tab.md`
6. `brief-onboarding.md`

## Regenerating (after any UI change, so the reference stays current)
With the dev server running (`npm run dev`, port 5173), from `Elementum_App/`:
- **Exact HTML showcase:** `node export-screens-html.mjs` → `current-screens.html`
- **PNG captures + gallery:** `node design-handoff-capture.mjs` → `screens/` + `index.html`
