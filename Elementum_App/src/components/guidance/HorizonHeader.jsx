// ===================================================================
// ELEMENTUM · HorizonHeader  (screens-v2 §5A)
// ===================================================================
// The "horizon band" header: a header image at full strength up top
// that resolves at a hard mist-line into pure paper where the title
// sits — ending the fight between a vivid image and readable text.
//
// Two variants (verbatim ports of the screens-v2 markup):
//   • variant="feature" (216px) — used by all 5 Guidance feature screens
//       (draw / manual / selfreport / consultant / codex). Carries a 34px
//       blur-glass back button, a per-element multiply tint, a 56px top
//       scrim, and the 118px bottom horizon that lands the image in paper.
//   • variant="hero" (268px) — the Guidance hub hero. Radial-masked image,
//       a bronze multiply tint, no scrim/horizon/back button.
//
// The header bleeds out of its <main> via negative margins, so `sidePad`
// must match the consuming <main>'s horizontal padding (feature mains pad
// 20px → sidePad 20; the hub pads 18px but bleeds 22px → sidePad 22).
// ===================================================================

const SILK = 'rgb(241,233,214)';
const INK = 'rgb(43,39,34)';
const RULE = 'rgb(160,64,48)';      // chop-mark red eyebrow rule
const EYEBROW = 'rgb(138,109,60)';  // bronze eyebrow label
const SUBCOPY = 'rgb(74,67,59)';    // inkSoft subtitle
const HERO_MASK = 'radial-gradient(135% 94% at 50% 20%, rgb(0,0,0) 30%, rgba(0,0,0,0) 94%)';

const EB = "'EB Garamond', Georgia, serif";
const CORMORANT = "'Cormorant Garamond', Georgia, serif";

function TitleBlock({ ruleWidth, ruleGap, ruleColor, eyebrowLS, eyebrowMb, eyebrow, title, titleSize, titleLh, subtitle, subSize, subLh, subMt, subMaxWidth }) {
  return (
    <>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: ruleGap, marginBottom: eyebrowMb }}>
        <span style={{ width: ruleWidth, height: 1, background: ruleColor || RULE }} />
        <span style={{ fontFamily: EB, fontSize: 10, letterSpacing: eyebrowLS, textTransform: 'uppercase', color: EYEBROW, fontWeight: 600 }}>
          {eyebrow}
        </span>
      </div>
      <h1 style={{ fontFamily: CORMORANT, fontSize: titleSize, fontWeight: 500, lineHeight: titleLh, color: INK, margin: 0 }}>
        {title}
      </h1>
      {subtitle ? (
        <p style={{ fontFamily: EB, fontSize: subSize, lineHeight: subLh, color: SUBCOPY, margin: subMt, ...(subMaxWidth ? { maxWidth: subMaxWidth } : null) }}>
          {subtitle}
        </p>
      ) : null}
    </>
  );
}

export default function HorizonHeader({
  variant = 'feature',
  art,
  bgPosition,
  tint = '196,116,90',   // element pigment rgb triplet (feature multiply tint)
  ruleColor,             // per-screen eyebrow rule color (defaults to seal red)
  eyebrow,
  title,
  subtitle,
  onBack,
  sidePad,
}) {
  if (variant === 'hero') {
    const pad = sidePad ?? 22;
    return (
      <div style={{ position: 'relative', margin: `-54px -${pad}px 0px`, height: 268, overflow: 'hidden' }}>
        {/* image — radial-masked, desaturated */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("${art}")`,
            backgroundSize: 'cover',
            backgroundPosition: bgPosition || '50% 20%',
            opacity: 0.4,
            filter: 'saturate(0.32) sepia(0.2) brightness(1.05)',
            WebkitMaskImage: HERO_MASK,
            maskImage: HERO_MASK,
          }}
        />
        {/* bronze multiply tint */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(160deg, rgba(184,150,90,0.22) 0%, rgba(184,150,90,0.10) 55%, rgba(184,150,90,0.0) 100%)',
            mixBlendMode: 'multiply',
            WebkitMaskImage: HERO_MASK,
            maskImage: HERO_MASK,
            pointerEvents: 'none',
          }}
        />
        {/* title */}
        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 18, zIndex: 2 }}>
          <TitleBlock
            ruleWidth={18} ruleGap={7} ruleColor={ruleColor} eyebrowLS="2.6px" eyebrowMb={8}
            eyebrow={eyebrow}
            title={title} titleSize={34} titleLh={1.02}
            subtitle={subtitle} subSize={13} subLh={1.5} subMt="7px 0 0" subMaxWidth={300}
          />
        </div>
      </div>
    );
  }

  // variant === 'feature' (216px)
  const pad = sidePad ?? 20;
  return (
    <div style={{ position: 'relative', margin: `-54px -${pad}px 0px`, height: 216, overflow: 'hidden', background: SILK }}>
      {/* image */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("${art}")`,
          backgroundSize: 'cover',
          backgroundPosition: bgPosition || '50% 30%',
          opacity: 0.92,
          filter: 'saturate(0.82) brightness(1.02)',
        }}
      />
      {/* per-element multiply tint */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, rgba(${tint},0.16) 0%, rgba(${tint},0) 44%)`,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }}
      />
      {/* 56px top scrim — so the back button reads */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 56,
          background: 'linear-gradient(to bottom, rgba(241,233,214,0.5), rgba(241,233,214,0))',
          pointerEvents: 'none',
        }}
      />
      {/* 118px bottom horizon — the hard mist-line into paper */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 118,
          background: 'linear-gradient(to top, rgb(241,233,214) 0px, rgb(241,233,214) 100px, rgba(241,233,214,0) 118px)',
          pointerEvents: 'none',
        }}
      />
      {/* back button */}
      <button
        type="button"
        aria-label="Back"
        onClick={onBack}
        style={{
          position: 'absolute', top: 14, left: 12, zIndex: 3,
          width: 34, height: 34, borderRadius: 999,
          background: 'rgba(248,244,236,0.66)',
          backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}
      >
        <svg aria-hidden="true" style={{ width: 18, height: 18, color: INK }}><use href="#ico-chev-l" /></svg>
      </button>
      {/* title */}
      <div style={{ position: 'absolute', left: 20, right: 20, bottom: 16, zIndex: 2 }}>
        <TitleBlock
          ruleWidth={16} ruleGap={7} ruleColor={ruleColor} eyebrowLS="2.4px" eyebrowMb={6}
          eyebrow={eyebrow}
          title={title} titleSize={30} titleLh={1.0}
          subtitle={subtitle} subSize={12.5} subLh={1.4} subMt="5px 0 0"
        />
      </div>
    </div>
  );
}
