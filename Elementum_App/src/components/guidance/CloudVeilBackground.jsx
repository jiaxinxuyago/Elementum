// ===================================================================
// ELEMENTUM · CloudVeilBackground  (screens-v2 §5C)
// ===================================================================
// The soft ink-wash mist that rises in the LOWER body of the Guidance
// hub + feature screens, behind the cards, while the title area stays
// clean cream. Three stacked layers, absolutely positioned at z-index 0:
//   1. cloud-veil.png @ opacity 0.55, anchored center-bottom
//   2. a silk gradient mask so the mist only reads in the lower body
//   3. a faint advisor-purple radial wash in the top-right corner
// Requires the consuming screen's scroll area / <main> to be transparent
// so the veil shows through. Markup is a verbatim port of the draw /
// guidance hub headers in Design/exports/.../screens-v2.
// ===================================================================

import React from 'react';

export default function CloudVeilBackground() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {/* 1 · the mist */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("/art/cloud-veil.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          opacity: 0.55,
        }}
      />
      {/* 2 · silk gradient mask — keeps the title area clean, mist in the lower body */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background:
            'linear-gradient(to bottom, rgb(241,233,214) 0%, rgb(241,233,214) 36%, rgba(241,233,214,0.45) 62%, rgba(241,233,214,0) 100%)',
        }}
      />
      {/* 3 · advisor-purple corner wash */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(120% 50% at 100% 0%, rgba(122,94,154,0.06), transparent 55%)',
        }}
      />
    </div>
  );
}
