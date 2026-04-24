// ===================================================================
// SCREEN 9 — LOADING  (DOC5 §8)
// Pulses 5 element signs, "Calculating your chart...", 5 element dots
// filling L→R over 2.5s. A single distant ridge holds the composition.
// ===================================================================

function LoadingScreen() {
  // Pulsing animation state — per-element stagger
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  const ELS = [
    { key: 'wood',  label: '木', color: PIG_WOOD  },
    { key: 'fire',  label: '火', color: PIG_FIRE  },
    { key: 'earth', label: '土', color: PIG_EARTH },
    { key: 'metal', label: '金', color: PIG_METAL },
    { key: 'water', label: '水', color: PIG_WATER },
  ];

  return (
    <div style={{
      background: SILK, color: INK, position: 'relative',
      width: '100%', height: '100%', overflow: 'hidden',
    }}>
      <SilkPaper/>
      <DistantRidge y={420} opacity={0.12}/>
      <StatusBar tint={INK}/>

      {/* Centered column */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 32px',
      }}>
        {/* 5 element characters — floating + pulsing */}
        <div style={{
          display: 'flex', gap: 18,
          marginBottom: 44,
        }}>
          {ELS.map((e, i) => {
            const phase = (tick - i * 3) % 32;
            const pulseT = phase < 16 ? phase / 16 : (32 - phase) / 16;
            const scale = 1 + pulseT * 0.15;
            const opacity = 0.45 + pulseT * 0.5;
            return (
              <div key={e.key} style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 18,
                color: e.color,
                transform: `scale(${scale})`,
                opacity,
                transition: 'transform 80ms ease-out, opacity 80ms ease-out',
              }}>{e.label}</div>
            );
          })}
        </div>

        {/* Calculating text */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22,
          fontStyle: 'italic',
          color: INK,
          letterSpacing: 0.4,
          marginBottom: 28,
          textAlign: 'center',
        }}>
          Calculating your chart…
        </div>

        <p style={{
          fontFamily: "'EB Garamond', serif", fontSize: 13.5,
          fontStyle: 'italic', color: INK_LIGHT,
          textAlign: 'center', margin: '0 0 42px',
          maxWidth: 280, lineHeight: 1.65,
        }}>
          Five pillars gather. Eight characters align.<br/>
          Your signature takes form.
        </p>

        {/* 5 dots — filling L→R with element colors */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          {ELS.map((e, i) => {
            // Progress wave: a "fill" that sweeps across then loops
            const fillT = ((tick - i * 6) % 60) / 60;
            const filled = fillT > 0 && fillT < 0.7;
            return (
              <div key={e.key} style={{
                width: 10, height: 10, borderRadius: 999,
                background: filled ? e.color : 'rgba(139,115,85,0.18)',
                boxShadow: filled ? `0 0 10px ${e.color}55` : 'none',
                transition: 'background 150ms ease, box-shadow 150ms ease',
              }}/>
            );
          })}
        </div>

        {/* Subtle spinner rule */}
        <div style={{
          marginTop: 56, width: 40, height: 1,
          background: `linear-gradient(90deg, transparent, ${INK_LIGHT}, transparent)`,
          opacity: 0.5,
        }}/>
      </div>
    </div>
  );
}

Object.assign(window, { LoadingScreen });
