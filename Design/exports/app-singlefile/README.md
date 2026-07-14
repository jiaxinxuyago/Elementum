# Elementum · Live App — Single-File Export

`elementum-app-singlefile.html` is the REAL application (production vite
build of the current code), packed into one self-contained HTML: the JS
bundle, styles, latin fonts, and all 60 runtime art assets (recompressed,
9 MB → 3 MB) are embedded; a small runtime shim resolves asset paths to
the embedded copies and pre-seeds localStorage with the canonical 庚
"The Blade" chart (1995-04-29) so every screen has data.

- Open in any browser — no server, no install. Every screen is reachable:
  navigate the app normally, or use the floating SCREENS button
  (bottom-right) to jump to any route, grouped: Onboarding · Reading (D13)
  · Detail pages · Tabs.
- The hash router works as in production (#/app-reading etc.).
- Excluded by design: network features (Supabase auth/entitlements,
  Stripe checkout) — offline they no-op gracefully; CJK display fonts
  fall back to system serif to keep size sane.
- Regenerate: `npx vite build --config vite.config.artifact.mjs` in
  Elementum_App, then the packer script (see session notes) — or ask the
  design agent to re-run the pipeline.

Built 2026-07-14 from the current main app code.
