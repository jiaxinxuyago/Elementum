// ===================================================================
// SCREEN 10 — REVEAL  (DOC5 §9 — CONTINUOUS SCROLL)
// Decision: follow §9's continuous scroll (not Phase 1 tabs).
// Rationale logged in the annotation panel.
//
// Sections:
//   1. Identity        — near-full viewport. Archetype seal → name →
//                        subtitle → token pill → essence paragraph.
//   2. Energy Blueprint — 5 rows sorted high→low with animated bars.
//                        Missing-element callout activates for Fire.
//   3. Balance Prescription — shown (Fire is missing). Cultivate Fire card.
//   4. CTA             — Enter Your Dashboard → /dashboard/energy-map
// ===================================================================

// Painterly General (reused from Phase 1 D with softer pigment)
function GeneralInkPainting({ w = 120, h = 200 }) {
  return (
    <svg viewBox="0 0 160 220" width={w} height={h} style={{ display:'block' }}>
      <defs>
        <filter id="DgBleedR" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence baseFrequency="0.85" numOctaves="2" seed="9"/>
          <feDisplacementMap in="SourceGraphic" scale="2.4"/>
        </filter>
        <linearGradient id="DgFadeR" x1="0.5" x2="0.5" y1="0" y2="1">
          <stop offset="0%" stopColor={INK}/>
          <stop offset="75%" stopColor={INK} stopOpacity="0.92"/>
          <stop offset="100%" stopColor={INK} stopOpacity="0.25"/>
        </linearGradient>
      </defs>
      <g filter="url(#DgBleedR)">
        <path d="M30 220 Q40 170 52 145 Q62 125 78 120 L102 120 Q118 125 128 145 Q140 170 150 220 Z"
          fill="url(#DgFadeR)" opacity="0.95"/>
        <path d="M46 150 Q66 124 90 114 Q114 124 134 150 L136 168 L44 168 Z" fill={INK}/>
      </g>
      <rect x="82" y="96" width="14" height="20" fill={INK_SOFT}/>
      <g filter="url(#DgBleedR)">
        <path d="M64 94 Q60 62 90 50 Q120 62 116 94 L116 106 L64 106 Z" fill={INK}/>
        <path d="M58 94 L122 94 L118 102 L62 102 Z" fill={INK_SOFT}/>
      </g>
      <rect x="74" y="78" width="32" height="2" fill={SILK} opacity="0.85"/>
      <path d="M64 165 Q 90 160 116 165 L118 205 L62 205 Z"
        fill={PIG_WATER} opacity="0.32"/>
    </svg>
  );
}

// Archetype seal — the iconic Metal mark, oversized, as a brush-bled seal
function ArchetypeSeal({ size = 86 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ display: 'block' }}>
      <defs>
        <filter id="sealRing">
          <feTurbulence baseFrequency="0.55" numOctaves="2" seed="3"/>
          <feDisplacementMap in="SourceGraphic" scale="1.4"/>
        </filter>
      </defs>
      {/* outer hand-drawn ring */}
      <circle cx="60" cy="60" r="52"
        stroke={PIG_METAL} strokeWidth="1.6" fill="none" opacity="0.8"
        filter="url(#sealRing)"/>
      <circle cx="60" cy="60" r="44"
        stroke={PIG_METAL} strokeWidth="0.9" fill="none" opacity="0.3"/>
      {/* inner metal sign — crescent, large */}
      <g transform="translate(60 60)">
        <path d="M -22 6 A 26 26 0 0 1 22 6"
          stroke={PIG_METAL} strokeWidth="3.2" strokeLinecap="round" fill="none" opacity="0.95"/>
      </g>
    </svg>
  );
}

// Single element row in Section 2
function BlueprintRow({ el, total = 8, animate = true }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(t);
    } else {
      setMounted(true);
    }
  }, [animate]);
  const pct = (el.n / total) * 100;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '28px 1fr auto',
      gap: 14,
      alignItems: 'center',
      padding: '10px 0',
    }}>
      <ElementSign element={el.key} size={20} color={el.color} muted={el.n === 0}/>
      <div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 6,
        }}>
          <span style={{
            fontFamily: "'EB Garamond', serif", fontSize: 15,
            color: el.n === 0 ? INK_LIGHT : INK_SOFT,
          }}>{el.en}</span>
        </div>
        {/* track */}
        <div style={{
          height: 6, width: '100%',
          background: '#E5DFD1', borderRadius: 999, overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            width: mounted ? `${pct}%` : '0%',
            height: '100%',
            background: el.color,
            borderRadius: 999,
            transition: 'width 800ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}/>
        </div>
      </div>
      <span style={{
        fontFamily: "'EB Garamond', serif", fontSize: 13,
        color: el.n === 0 ? INK_LIGHT : INK_LIGHT, minWidth: 28, textAlign: 'right',
      }}>{el.n}/{total}</span>
    </div>
  );
}

function RevealScreen() {
  const scrollRef = useRef(null);

  const missing = USER.composition.find(e => e.key === USER.missing); // fire

  return (
    <div
      ref={scrollRef}
      style={{
        background: SILK, color: INK, position: 'relative',
        width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden',
      }}>
      <SilkPaper/>

      {/* ink scene — reuse welcome ink for continuity */}
      <div style={{
        position: 'absolute', top: 20, left: -20, right: -20, height: 260,
        zIndex: 1, pointerEvents: 'none',
      }}>
        <img src={window.__resources ? window.__resources.inkTop : "assets/ink-a-top.png"} alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover',
            opacity: 0.22, mixBlendMode: 'multiply' }}/>
      </div>

      <StatusBar tint={INK}/>

      {/* =============================================
          SECTION 1 — IDENTITY (full viewport)
         ============================================= */}
      <section style={{
        position: 'relative', zIndex: 10,
        minHeight: 828,
        padding: '72px 32px 48px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center',
      }}>
        {/* Archetype seal */}
        <div style={{ marginBottom: 28 }}>
          <ArchetypeSeal size={88}/>
        </div>

        {/* "You are..." */}
        <div style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 12, letterSpacing: 3.2,
          textTransform: 'uppercase',
          color: INK_LIGHT,
          marginBottom: 18,
          fontStyle: 'italic',
        }}>You are…</div>

        {/* Archetype name */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600, fontSize: 44, lineHeight: 1,
          color: WALNUT, letterSpacing: 1,
          margin: '0 0 14px',
          textShadow: '0 2px 4px rgba(139,115,85,0.15)',
        }}>The Blade</h1>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 14px' }}>
          <BrushUnderline w={100} color={WALNUT} opacity={0.5}/>
        </div>

        {/* Subtitle */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 18, fontStyle: 'italic',
          color: INK_SOFT,
          letterSpacing: 0.3,
          marginBottom: 22,
        }}>Yang Metal · Precision before intention</div>

        {/* Identity token pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 16px',
          background: SILK_DEEP, borderRadius: 999,
          fontFamily: "'EB Garamond', serif", fontSize: 13,
          color: PIG_METAL, fontWeight: 500,
          border: `1px solid rgba(138,154,166,0.3)`,
          marginBottom: 28,
        }}>
          <span style={{
            fontFamily: "'Noto Serif SC', serif", fontSize: 15,
            color: PIG_METAL, fontWeight: 600,
          }}>庚</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Yang Metal</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Blade</span>
        </div>

        {/* Essence paragraph */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 16.5, fontStyle: 'italic',
          color: INK_SOFT, lineHeight: 1.65,
          maxWidth: 300, margin: '0 auto 32px',
        }}>
          The blade does not hesitate. It was not chosen —
          only found, already sharp. Where others soften
          under pressure, you find your edge.
        </p>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: 28, left: 0, right: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 6,
          opacity: 0.55,
        }}>
          <div style={{
            fontFamily: "'EB Garamond', serif", fontSize: 10,
            letterSpacing: 3, textTransform: 'uppercase',
            color: INK_LIGHT, fontStyle: 'italic',
          }}>Continue</div>
          <svg viewBox="0 0 16 16" width="14" height="14">
            <path d="M4 6 L8 11 L12 6"
              stroke={INK_LIGHT} strokeWidth="1.3" fill="none"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* =============================================
          SECTION 2 — ENERGY BLUEPRINT
         ============================================= */}
      <section style={{
        position: 'relative', zIndex: 10,
        padding: '48px 28px 32px',
        borderTop: `1px solid ${SILK_FOLD}`,
      }}>
        <div style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 11, letterSpacing: 3.5,
          textTransform: 'uppercase',
          color: INK_LIGHT,
          textAlign: 'center',
          marginBottom: 8,
          fontWeight: 600,
        }}>Your Energy Blueprint</div>

        <p style={{
          fontFamily: "'EB Garamond', serif", fontSize: 13.5,
          fontStyle: 'italic', color: INK_LIGHT,
          textAlign: 'center', margin: '0 0 28px',
          lineHeight: 1.6,
        }}>
          Eight characters. Five elements.<br/>
          This is how they fall in your chart.
        </p>

        {/* rows */}
        <div style={{
          ...deckleCard({ padding: '12px 18px' }),
        }}>
          {USER.composition.map(el => (
            <BlueprintRow key={el.key} el={el}/>
          ))}
        </div>

        {/* Missing element callout */}
        <div style={{
          marginTop: 20,
          padding: '18px 20px',
          background: `${PIG_FIRE}10`,
          border: `1px solid ${PIG_FIRE}40`,
          borderRadius: 16,
          position: 'relative', overflow: 'hidden',
        }}>
          <CornerInk size={48} color={PIG_FIRE} opacity={0.12} position="tr"/>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10,
            position: 'relative',
          }}>
            <ElementSign element="fire" size={18} color={PIG_FIRE}/>
            <div style={{
              fontFamily: "'EB Garamond', serif", fontSize: 11,
              letterSpacing: 2.8, color: PIG_FIRE, textTransform: 'uppercase',
              fontWeight: 600,
            }}>Your Fire is missing</div>
          </div>
          <p style={{
            fontFamily: "'EB Garamond', serif", fontSize: 14,
            color: INK_SOFT, lineHeight: 1.6, margin: 0,
            position: 'relative',
          }}>
            The blade without the forge grows cold. Without Fire,
            you may hold precision but lose the warmth that moves
            others to follow it. What you lack is what you must cultivate.
          </p>
        </div>
      </section>

      {/* =============================================
          SECTION 3 — BALANCE PRESCRIPTION (Fire is missing)
         ============================================= */}
      <section style={{
        position: 'relative', zIndex: 10,
        padding: '40px 28px 32px',
        borderTop: `1px solid ${SILK_FOLD}`,
      }}>
        <div style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 11, letterSpacing: 3.5,
          textTransform: 'uppercase',
          color: INK_LIGHT,
          textAlign: 'center',
          marginBottom: 22,
          fontWeight: 600,
        }}>What Balances You</div>

        <div style={{
          background: '#EBE5D6',
          border: `1px solid #DCD3C0`,
          borderRadius: 18,
          padding: 24,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            marginBottom: 18, paddingBottom: 16,
            borderBottom: `1px solid rgba(180,117,94,0.2)`,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 999,
              background: `${PIG_FIRE}22`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ElementSign element="fire" size={18} color={PIG_FIRE}/>
            </div>
            <div style={{
              fontFamily: "'EB Garamond', serif", fontSize: 12,
              letterSpacing: 3, textTransform: 'uppercase',
              color: PIG_FIRE, fontWeight: 600,
            }}>Cultivate Fire</div>
          </div>

          {/* Categories */}
          <PrescriptionCategory
            title="Environment"
            icon="map"
            bullets={[
              'Sit facing south — the direction of summer sun.',
              'Seek warmth: lit hearths, candlelight, open kitchens.',
            ]}
          />
          <PrescriptionCategory
            title="Colors"
            icon="palette"
            bullets={[
              'Wear cinnabar, amber, and burnished red accents.',
              'Avoid all-grey palettes — they echo your excess.',
            ]}
          />
          <PrescriptionCategory
            title="Timing"
            icon="clock"
            bullets={[
              'Act between 11am and 3pm — Fire’s daily window.',
              'Summer months (May–July) amplify your effort.',
            ]}
          />
        </div>
      </section>

      {/* =============================================
          SECTION 4 — CTA
         ============================================= */}
      <section style={{
        position: 'relative', zIndex: 10,
        padding: '40px 28px 80px',
      }}>
        <button style={{
          width: '100%', padding: '18px 22px',
          background: INK, color: SILK, border: 0, borderRadius: 999,
          fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: 4,
          textTransform: 'uppercase', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          Enter Your Dashboard
          <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 17, letterSpacing: 0 }}>→</span>
        </button>
        <p style={{
          marginTop: 14, textAlign: 'center',
          fontFamily: "'EB Garamond', serif", fontSize: 12,
          fontStyle: 'italic', color: INK_LIGHT, letterSpacing: 0.3,
        }}>
          Your reading refreshes with each sunrise.
        </p>
      </section>
    </div>
  );
}

// Prescription category row
function PrescriptionCategory({ title, icon, bullets }) {
  const icons = {
    map: (
      <g stroke={WALNUT} strokeWidth="1.3" fill="none" strokeLinejoin="round" strokeLinecap="round">
        <path d="M3 4 L7 3 L11 5 L15 3 L15 14 L11 15 L7 13 L3 15 Z"/>
        <line x1="7" y1="3" x2="7" y2="13"/>
        <line x1="11" y1="5" x2="11" y2="15"/>
      </g>
    ),
    palette: (
      <g stroke={WALNUT} strokeWidth="1.3" fill="none" strokeLinejoin="round" strokeLinecap="round">
        <path d="M9 3 C 5 3 2 6 2 10 C 2 13 4 15 7 15 C 8 15 8 14 8 13 C 8 12 9 11 10 11 L 12 11 C 14 11 16 9 16 6 C 16 4 13 3 9 3 Z"/>
        <circle cx="5.5" cy="7.5" r="0.8" fill={WALNUT}/>
        <circle cx="8.5" cy="5.5" r="0.8" fill={WALNUT}/>
        <circle cx="12" cy="6.5" r="0.8" fill={WALNUT}/>
      </g>
    ),
    clock: (
      <g stroke={WALNUT} strokeWidth="1.3" fill="none" strokeLinecap="round">
        <circle cx="9" cy="9" r="6.5"/>
        <line x1="9" y1="9" x2="9" y2="5.5"/>
        <line x1="9" y1="9" x2="12" y2="10.5"/>
      </g>
    ),
  };
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <svg viewBox="0 0 18 18" width="14" height="14">{icons[icon]}</svg>
        <div style={{
          fontFamily: "'EB Garamond', serif", fontSize: 10.5,
          letterSpacing: 2.5, textTransform: 'uppercase',
          color: '#584A3E', fontWeight: 600,
        }}>{title}</div>
      </div>
      {bullets.map((b, i) => (
        <div key={i} style={{
          fontFamily: "'EB Garamond', serif", fontSize: 13.5,
          color: INK_SOFT, lineHeight: 1.55, paddingLeft: 22,
          position: 'relative', marginBottom: 4,
        }}>
          <span style={{
            position: 'absolute', left: 8, top: 8,
            width: 4, height: 4, borderRadius: 999,
            background: PIG_FIRE, opacity: 0.6,
          }}/>
          {b}
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { RevealScreen });
