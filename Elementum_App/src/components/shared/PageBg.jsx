// ===================================================================
// ELEMENTUM · PageBg
// ===================================================================
// Full-bleed painted background layer. Sits behind page content at a
// low opacity so the silk/cream base + the artwork read together
// without competing with foreground UI (DOC5 §20 opacity ladder).
//
// Usage — render as the FIRST child of a position:relative container,
// and give the content a higher stacking context:
//
//   <div style={{ position: 'relative' }}>
//     <PageBg src="bg-today-01-decade-glow.png" opacity={0.15} />
//     <div style={{ position: 'relative', zIndex: 1 }}>…content…</div>
//   </div>
// ===================================================================

// Accepts EITHER:
//   · src + opacity  — an image at the given opacity. `src` may be a bare
//     filename (resolved under /backgrounds/) or an absolute path (starts
//     with "/"), e.g. "/concept-arts/atmospheric/atmospheric-5-layer.png".
//   · gradient       — a CSS background value (carries its own alpha; opacity 1)
// `size` = background-size (default cover), `pos` = background-position.
// A `gradient` may be combined with `src` to lay a wash over the image.
export default function PageBg({ src, opacity = 0.15, gradient, size = 'cover', pos = 'center' }) {
  if (gradient && !src) {
    return (
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, background: gradient, pointerEvents: 'none', zIndex: 0 }}
      />
    );
  }
  if (!src) return null;
  const url = src.startsWith('/') ? src : `/backgrounds/${src}`;
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("${url}")`,
          backgroundSize: size,
          backgroundPosition: pos,
          backgroundRepeat: 'no-repeat',
          opacity,
        }}
      />
      {/* Optional wash over the image (e.g. warm tint at top) */}
      {gradient && <div style={{ position: 'absolute', inset: 0, background: gradient }} />}
    </div>
  );
}
