// ===================================================================
// ELEMENTUM · InkTile  (screens-v2 §5B)
// ===================================================================
// The Guidance-hub tile primitive: a per-element gradient card with a
// right-bleeding, matted-transparent ink motif (ink-*.png) and a circular
// hanzi badge on the left. The ink art MUST be real-alpha matted so it can
// blend with mix-blend-mode:normal (multiply on a baked-in paper crop would
// leave a visible rectangle). Two variants, verbatim from screens-v2:
//   • variant="featured" — the full-width Elemental Draw card (96px,
//       54px badge, mono eyebrow row + 23px title + an arrow action link).
//   • variant="grid"     — the 2×2 feature tiles (128px, 40px badge top-left,
//       tier eyebrow top-right, 18px title + italic subtitle).
//
// `tint` is the element pigment as an "r,g,b" triplet; the alpha variants
// are composed from it to the exact ladder in the design markup.
// ===================================================================

const EB = "'EB Garamond', Georgia, serif";
const CORMORANT = "'Cormorant Garamond', Georgia, serif";
const MONO = "'JetBrains Mono', monospace";
const HANZI = "'Noto Serif SC', 'Songti SC', serif";
const INK = 'rgb(43,39,34)';
const SUBTLE = 'rgb(133,125,114)';
const rgba = (t, a) => `rgba(${t},${a})`;

// Right-bleeding matted ink motif + a soft tint sweep, behind the content.
function InkArt({ src, imgWidth, imgHeight, imgRight, imgFilter, imgMaskStop, sweep }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', borderRadius: 'inherit', pointerEvents: 'none' }}>
      <img
        src={src}
        alt=""
        style={{
          position: 'absolute', right: imgRight, top: '50%', transform: 'translateY(-50%)',
          width: imgWidth, height: imgHeight, objectFit: 'contain', opacity: 0.5,
          filter: imgFilter,
          WebkitMaskImage: `linear-gradient(90deg, transparent ${imgMaskStop}, #000 50%)`,
          maskImage: `linear-gradient(90deg, transparent ${imgMaskStop}, #000 50%)`,
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: sweep }} />
    </div>
  );
}

export default function InkTile({
  variant = 'grid',
  tint = '122,158,110',   // element pigment "r,g,b"
  ink,                    // '/art/ink-manual.png'
  glyph,                  // '册'
  glyphColor,             // 'rgb(88,122,77)'
  title,
  subtitle,               // grid only
  tier,                   // grid only — 'Seeker' | '✦ Advisor' | 'Learn'
  tierColor = 'rgb(107,83,57)', // grid only
  eyebrow,                // featured only — 'Today's Rite'
  eyebrowSub,             // featured only — 'Water day'
  action,                 // featured only — 'Draw today's card'
  glow = false,           // grid only — one-shot advisor glow (from upgrade flow)
  onClick,
  ariaLabel,
}) {
  if (variant === 'featured') {
    return (
      <button
        type="button"
        aria-label={ariaLabel || title}
        onClick={onClick}
        style={{
          appearance: 'none', position: 'relative', display: 'flex', alignItems: 'center', gap: 14,
          width: '100%', minHeight: 96, border: `1px solid ${rgba(tint, 0.32)}`, borderRadius: 18,
          overflow: 'hidden', padding: '15px 16px', cursor: 'pointer',
          background: `linear-gradient(135deg, ${rgba(tint, 0.12)}, ${rgba(tint, 0.03)})`,
          textAlign: 'left',
          boxShadow: 'rgba(43,39,34,0.04) 0px 1px 0px, rgba(60,46,28,0.07) 0px 8px 18px',
        }}
      >
        <InkArt
          src={ink} tint={tint}
          imgWidth="54%" imgHeight="140%" imgRight="-6%"
          imgFilter="saturate(0.5) brightness(1.03)" imgMaskStop="4%"
          sweep={`linear-gradient(100deg, ${rgba(tint, 0.10)} 0%, ${rgba(tint, 0.03)} 44%, transparent 72%)`}
        />
        {/* 54px hanzi badge */}
        <span
          aria-hidden="true"
          style={{
            position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 54, height: 54, flexShrink: 0, borderRadius: 999,
            background: 'rgba(248,244,236,0.92)', border: `1px solid ${rgba(tint, 0.45)}`,
            boxShadow: 'rgba(60,46,28,0.12) 0px 2px 6px',
          }}
        >
          <span style={{ fontFamily: HANZI, fontSize: 28, fontWeight: 600, color: glyphColor, lineHeight: 1 }}>{glyph}</span>
        </span>
        {/* text */}
        <span style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: '1.6px', textTransform: 'uppercase', color: glyphColor }}>{eyebrow}</span>
            <span style={{ width: 3, height: 3, borderRadius: 999, background: `rgb(${tint})` }} />
            <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: '1.6px', textTransform: 'uppercase', color: SUBTLE }}>{eyebrowSub}</span>
          </span>
          <span style={{ fontFamily: CORMORANT, fontSize: 23, fontWeight: 600, lineHeight: 1.02, color: INK }}>{title}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: EB, fontSize: 13, color: glyphColor }}>
            {action} <svg aria-hidden="true" style={{ width: 13, height: 13, display: 'block' }}><use href="#ico-arrow-r" /></svg>
          </span>
        </span>
      </button>
    );
  }

  // variant === 'grid'
  return (
    <button
      type="button"
      aria-label={ariaLabel || title}
      onClick={onClick}
      style={{
        appearance: 'none', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        minHeight: 128, border: `1px solid ${rgba(tint, 0.30)}`, borderRadius: 16, overflow: 'hidden',
        padding: 13, cursor: 'pointer',
        background: `linear-gradient(150deg, ${rgba(tint, 0.10)}, ${rgba(tint, 0.02)})`,
        textAlign: 'left',
        boxShadow: 'rgba(43,39,34,0.04) 0px 1px 0px, rgba(60,46,28,0.06) 0px 6px 14px',
        animation: glow ? 'inkTileGlow 1200ms ease-in-out' : undefined,
      }}
    >
      {glow && <style>{`@keyframes inkTileGlow { 0% { box-shadow: 0 0 0 0 rgba(122,94,154,0) } 50% { box-shadow: 0 0 26px 6px rgba(122,94,154,0.30) } 100% { box-shadow: 0 0 0 0 rgba(122,94,154,0) } }`}</style>}
      <InkArt
        src={ink} tint={tint}
        imgWidth="62%" imgHeight="128%" imgRight="-8%"
        imgFilter="saturate(0.72) brightness(1.03)" imgMaskStop="2%"
        sweep={`linear-gradient(100deg, ${rgba(tint, 0.12)} 0%, ${rgba(tint, 0.04)} 42%, transparent 72%)`}
      />
      {/* 40px hanzi badge — top-left */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', top: 12, left: 12, zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 40, height: 40, borderRadius: 999, background: 'rgba(248,244,236,0.92)', border: `1px solid ${rgba(tint, 0.45)}`,
          boxShadow: 'rgba(60,46,28,0.12) 0px 2px 6px', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)',
        }}
      >
        <span style={{ fontFamily: HANZI, fontSize: 20, fontWeight: 600, color: glyphColor, lineHeight: 1 }}>{glyph}</span>
      </span>
      {/* tier eyebrow — top-right */}
      <span
        aria-hidden="true"
        style={{ position: 'absolute', top: 14, right: 12, zIndex: 3, fontFamily: MONO, fontSize: 8, letterSpacing: '1.2px', textTransform: 'uppercase', color: tierColor }}
      >
        {tier}
      </span>
      {/* text */}
      <span style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: CORMORANT, fontSize: 18, fontWeight: 600, lineHeight: 1.04, color: INK }}>{title}</span>
        <span style={{ fontFamily: EB, fontStyle: 'italic', fontSize: 12, color: SUBTLE, lineHeight: 1.25 }}>{subtitle}</span>
      </span>
    </button>
  );
}
