// ===================================================================
// ELEMENTUM · PageBg
// ===================================================================
// Full-bleed painted background layer. Sits behind page content at a
// low opacity so the silk/cream base + the artwork read together
// without competing with foreground UI (DES_04 §20 opacity ladder).
//
// Usage — render as the FIRST child of a position:relative container,
// and give the content a higher stacking context:
//
//   <div style={{ position: 'relative' }}>
//     <PageBg src="bg-today-01-decade-glow.png" opacity={0.15} />
//     <div style={{ position: 'relative', zIndex: 1 }}>…content…</div>
//   </div>
// ===================================================================

import { useEffect, useState } from 'react';

// Synchronous cache probe: an already-decoded PNG reports img.complete on
// the spot, so a revisited plate can render opaque on its very first paint.
function probeCached(url) {
  if (!url || typeof Image === 'undefined') return null;
  const img = new Image();
  img.src = url;
  return img.complete ? url : null;
}

// Accepts EITHER:
//   · src + opacity  — an image at the given opacity. `src` may be a bare
//     filename (resolved under /backgrounds/) or an absolute path (starts
//     with "/"), e.g. "/concept-arts/atmospheric/atmospheric-5-layer.png".
//   · gradient       — a CSS background value (carries its own alpha; opacity 1)
// `size` = background-size (default cover), `pos` = background-position.
// A `gradient` may be combined with `src` to lay a wash over the image.
export default function PageBg({ src, opacity = 0.15, gradient, size = 'cover', pos = 'center' }) {
  const url = src ? (src.startsWith('/') ? src : `/backgrounds/${src}`) : null;
  // The plate only reaches its target opacity once its PNG has decoded — on
  // a slow network the art blooms in over the silk base instead of popping,
  // while an already-cached plate is opaque from its very first paint (no
  // re-fade on tab revisits). readyUrl tracks WHICH url has decoded; a src
  // change resets it during render (the "adjust state on prop change" pattern).
  const [readyUrl, setReadyUrl] = useState(() => probeCached(url));
  const [prevUrl, setPrevUrl] = useState(url);
  if (url !== prevUrl) {
    setPrevUrl(url);
    setReadyUrl(probeCached(url));
  }
  const ready = readyUrl === url;
  useEffect(() => {
    if (!url || readyUrl === url) return undefined;
    let live = true;
    const img = new Image();
    img.src = url;
    const done = () => { if (live) setReadyUrl(url); };
    if (img.decode) img.decode().then(done, done);
    else { img.onload = done; img.onerror = done; }
    return () => { live = false; };
  }, [url, readyUrl]);

  if (gradient && !src) {
    return (
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, background: gradient, pointerEvents: 'none', zIndex: 0 }}
      />
    );
  }
  if (!src) return null;
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("${url}")`,
          backgroundSize: size,
          backgroundPosition: pos,
          backgroundRepeat: 'no-repeat',
          opacity: ready ? opacity : 0,
          transition: 'opacity 420ms ease',
        }}
      />
      {/* Optional wash over the image (e.g. warm tint at top) */}
      {gradient && <div style={{ position: 'absolute', inset: 0, background: gradient }} />}
    </div>
  );
}
