// ===================================================================
// SCREEN 1 — WELCOME (Phase 1 D, re-anchored in the flow)
// §6 spec: the Reveal sign (jian) belongs to the user's FUTURE element.
// Before reveal, the central mark is element-agnostic — a brushed enso
// (圓相) with a deliberate break: the unmarked, about-to-be-traced circle.
// Copy and CTA intent are preserved from Phase 1 D.
// ===================================================================

// Brush-painted enso — pre-reveal, element-agnostic central mark
function BrushEnso({ w = 200, h = 200 }) {
  return (
    <svg viewBox="0 0 240 240" width={w} height={h} style={{ display:'block' }}>
      <defs>
        <filter id="ensoBleed">
          <feTurbulence baseFrequency="0.7" numOctaves="2" seed="3"/>
          <feDisplacementMap in="SourceGraphic" scale="2.2"/>
        </filter>
        {/* the stroke ink — weighted: thick at start, thins at the break */}
        <linearGradient id="ensoInk" gradientUnits="userSpaceOnUse"
          x1="60" y1="70" x2="170" y2="180">
          <stop offset="0%"   stopColor={INK} stopOpacity="0.92"/>
          <stop offset="45%"  stopColor={INK} stopOpacity="0.82"/>
          <stop offset="80%"  stopColor={INK} stopOpacity="0.55"/>
          <stop offset="100%" stopColor={INK} stopOpacity="0.15"/>
        </linearGradient>
      </defs>
      <g filter="url(#ensoBleed)">
        {/* the single sweeping stroke — broken, not closed */}
        <path
          d="M 172 62
             C 212 92, 212 160, 168 188
             C 124 214, 72 210, 48 170
             C 26 132, 44 78, 92 58
             C 124 44, 150 50, 160 62"
          fill="none"
          stroke="url(#ensoInk)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* tail dab where the brush lifts — a single wet dot */}
        <ellipse cx="160" cy="62" rx="5.5" ry="4" fill={INK} opacity="0.7"/>
      </g>
    </svg>
  );
}

// Keyed ink paintings — upper distant ridges + lower islands
function WelcomeInkScene() {
  return (
    <>
      <div style={{
        position: 'absolute', top: 60, left: -20, right: -20, height: 210,
        zIndex: 1, pointerEvents: 'none',
      }}>
        <img src={window.__resources ? window.__resources.inkTop : "assets/ink-a-top.png"} alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover',
            opacity: 0.3, mixBlendMode: 'multiply' }}/>
      </div>
      <div style={{
        position: 'absolute', bottom: -30, left: -40, right: -40, height: 220,
        zIndex: 2, pointerEvents: 'none',
      }}>
        <img src={window.__resources ? window.__resources.inkBottom : "assets/ink-a-bottom.png"} alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover',
            opacity: 0.38, mixBlendMode: 'multiply' }}/>
      </div>
    </>
  );
}

function WelcomeScreen() {
  return (
    <div style={{
      background: SILK, color: INK, position: 'relative',
      width: '100%', height: '100%', overflow: 'hidden',
    }}>
      <SilkPaper/>
      <WelcomeInkScene/>
      <StatusBar tint={INK}/>

      {/* No masthead mark — silk, mountains, headline speak for themselves */}

      {/* Central enso removed — now lives as the wordmark up top */}

      {/* Wordmark + subtitle — Elementum sets the mark, single italic line below */}
      <div style={{
        position: 'absolute', bottom: 240, left: 0, right: 0, zIndex: 6,
        padding: '0 34px', textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: 10,
          color: INK,
          marginLeft: 10, /* optical centering for tracked caps */
          marginBottom: 22,
        }}>ELEMENTUM</div>
        <p style={{
          fontFamily: "'EB Garamond', serif", fontSize: 17,
          fontStyle: 'italic',
          color: INK_SOFT, lineHeight: 1.55, margin: '0 auto', maxWidth: 300,
          letterSpacing: 0.1,
        }}>
          A classical reading of who you are,<br/>rendered for your birth alone.
        </p>
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute', bottom: 80, left: 28, right: 28, zIndex: 6
      }}>
        <button style={{
          width: '100%', padding: '16px 22px',
          background: INK, color: SILK, border: 0, borderRadius: 999,
          fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: 4,
          textTransform: 'uppercase', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          Discover Yours
          <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, letterSpacing: 0 }}>→</span>
        </button>
        <div style={{
          marginTop: 14, textAlign: 'center',
          fontFamily: "'EB Garamond', serif", fontSize: 13,
          color: INK_LIGHT, fontStyle: 'italic',
        }}>
          Already mapped? <span style={{
            color: INK_SOFT, textDecoration: 'underline', textUnderlineOffset: 3,
            fontStyle: 'normal',
          }}>Sign in</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WelcomeScreen });
