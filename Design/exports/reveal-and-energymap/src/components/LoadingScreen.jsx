// ===================================================================
// SCREEN 9 — LOADING (DOC5 §8)
// Ported from Design/flow/loading.jsx. Pulses 5 element signs,
// "Calculating your chart…", 5 element dots filling L→R.
// On mount, triggers calculateBaziChart() with birthData and advances
// to Reveal after ~2.5s (padded if calc is instant — the wait is
// intentional per §8).
// ===================================================================

import React, { useState, useEffect } from 'react';
import {
  INK,
  INK_LIGHT,
  SILK,
  PIG_METAL,
  PIG_WOOD,
  PIG_WATER,
  PIG_FIRE,
  PIG_EARTH,
  SilkPaper,
  DistantRidge,
  StatusBar,
} from '../styles/tokens.jsx';
import {
  useChart,
  resolveGenderForCalc,
  resolveHourForCalc,
  resolveLongitudeForCalc,
  resolveLocationName,
} from '../store/chartContext.jsx';
import { calculateBaziChart } from '../engine/calculator.js';

// Ceremonial transition timing — DOC5 §8 → §9 handoff
// Phase 1: loading content disperses + fades (600ms)
// Phase 2: silk holds empty (250ms) — the "exhale"
// Phase 3: Reveal handles its own entrance (see RevealScreen.jsx)
const EXIT_DURATION_MS = 600;
const SILK_PAUSE_MS = 250;

export default function LoadingScreen({ onComplete }) {
  const { birthData, setChart } = useChart();
  const [tick, setTick] = useState(0);
  // Exit-phase flag — flips true after the dwell completes; CSS transitions
  // take over from here for the dispersal animation.
  const [exiting, setExiting] = useState(false);

  // Pulsing animation — 80ms tick so the pulse + dot sweep update smoothly.
  // STOPS when we enter the exit phase so the elements freeze before fading
  // (twitching while disappearing reads as a glitch, not ceremony).
  useEffect(() => {
    if (exiting) return;
    const id = setInterval(() => setTick((t) => t + 1), 80);
    return () => clearInterval(id);
  }, [exiting]);

  // Kick the calculation synchronously on mount, then pad to ~2.5s
  useEffect(() => {
    let cancelled = false;
    const timers = [];

    const run = async () => {
      const start = Date.now();
      try {
        const chart = calculateBaziChart({
          year: birthData.year,
          month: birthData.month,
          day: birthData.day,
          hour: resolveHourForCalc(birthData),
          gender: resolveGenderForCalc(birthData),
          longitude: resolveLongitudeForCalc(birthData), // exact numeric longitude (Open-Meteo or well-known fallback)
          location: resolveLocationName(birthData),       // display name only — preserved in chart.meta.location
        });
        if (!cancelled) setChart(chart);
      } catch (err) {
        console.error('calculateBaziChart failed:', err);
      }
      // Intentional minimum dwell per DOC5 §8 (2.5–3s)
      // Override via ?hold=N in URL for screenshot testing.
      const hold = (() => {
        const m = typeof location !== 'undefined' && /[?&]hold=(\d+)/.exec(location.search);
        return m ? parseInt(m[1], 10) : 2500;
      })();
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, hold - elapsed);

      // Schedule the ceremonial exit:
      //   wait `remaining` (rest of the dwell)
      //   → flip `exiting` to true (CSS fade-out runs over EXIT_DURATION_MS)
      //   → wait EXIT_DURATION_MS + SILK_PAUSE_MS (silk breath)
      //   → call onComplete (mount Reveal — its own entrance animation runs)
      timers.push(setTimeout(() => {
        if (cancelled) return;
        setExiting(true);
        timers.push(setTimeout(() => {
          if (!cancelled) onComplete && onComplete();
        }, EXIT_DURATION_MS + SILK_PAUSE_MS));
      }, remaining));
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ELS = [
    { key: 'wood',  label: '木', color: PIG_WOOD  },
    { key: 'fire',  label: '火', color: PIG_FIRE  },
    { key: 'earth', label: '土', color: PIG_EARTH },
    { key: 'metal', label: '金', color: PIG_METAL },
    { key: 'water', label: '水', color: PIG_WATER },
  ];

  return (
    <div
      style={{
        background: SILK,
        color: INK,
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <SilkPaper />
      {/* Ridge sits low in the frame — grounds the composition. Wrapped so
          it fades together with the loading content during the ceremonial
          exit (silk paper itself stays — that's the visual constant). */}
      <div
        style={{
          opacity: exiting ? 0 : 1,
          transition: `opacity ${EXIT_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        <DistantRidge y={700} opacity={0.18} height={144} />
      </div>
      <StatusBar tint={INK} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 32px',
          // Ceremonial exit: gentle dispersal upward, opacity to zero.
          // Easing chosen to match Reveal's entrance for visual continuity
          // (cubic-bezier(0.22, 1, 0.36, 1) is the "expo-out-ish" curve we
          // use across the silk-paper aesthetic — a slow release, no bounce).
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'translateY(-8px) scale(1.04)' : 'none',
          transition: `opacity ${EXIT_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${EXIT_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        {/* 5 element characters — floating + pulsing */}
        <div
          style={{
            display: 'flex',
            gap: 18,
            marginBottom: 44,
          }}
        >
          {ELS.map((e, i) => {
            const phase = (tick - i * 3) % 32;
            const pulseT = phase < 16 ? phase / 16 : (32 - phase) / 16;
            const scale = 1 + pulseT * 0.15;
            const opacity = 0.45 + pulseT * 0.5;
            return (
              <div
                key={e.key}
                style={{
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: 18,
                  color: e.color,
                  transform: `scale(${scale})`,
                  opacity,
                  transition:
                    'transform 80ms ease-out, opacity 80ms ease-out',
                }}
              >
                {e.label}
              </div>
            );
          })}
        </div>

        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22,
            fontStyle: 'italic',
            color: INK,
            letterSpacing: 0.4,
            marginBottom: 28,
            textAlign: 'center',
          }}
        >
          Calculating your chart…
        </div>

        <p
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 13.5,
            fontStyle: 'italic',
            color: INK_LIGHT,
            textAlign: 'center',
            margin: '0 0 42px',
            maxWidth: 280,
            lineHeight: 1.65,
          }}
        >
          Five pillars gather. Eight characters align.
          <br />
          Your signature takes form.
        </p>

        {/* 5 dots — filling L→R with element colors */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          {ELS.map((e, i) => {
            const fillT = ((tick - i * 6) % 60) / 60;
            const filled = fillT > 0 && fillT < 0.7;
            return (
              <div
                key={e.key}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: filled ? e.color : 'rgba(139,115,85,0.18)',
                  boxShadow: filled ? `0 0 10px ${e.color}55` : 'none',
                  transition: 'background 150ms ease, box-shadow 150ms ease',
                }}
              />
            );
          })}
        </div>

        {/* Subtle spinner rule */}
        <div
          style={{
            marginTop: 56,
            width: 40,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${INK_LIGHT}, transparent)`,
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  );
}
