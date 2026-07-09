// ===================================================================
// SCREEN 9 — LOADING (DES_04 §8)
// The five energies turn through a 3D spotlight carousel — each element
// icon rotates to the front and ignites in its pigment, one by one —
// while "Calculating your chart…" runs. On mount we kick
// calculateBaziChart() with the birthData and hold the ceremonial dwell
// (~2.5s, padded if calc is instant). The exit is the ritual moment: a
// strong WHITE BLOOM floods the frame and carries through into the
// Reveal, which fades the same white out so the plate emerges from it.
// ===================================================================

import { useState, useEffect } from 'react';
import {
  INK,
  INK_LIGHT,
  SILK,
  PIG_METAL,
  PIG_WOOD,
  PIG_WATER,
  PIG_FIRE,
  PIG_EARTH,
  StatusBar,
} from '../styles/tokens.jsx';
import {
  useChart,
  resolveGenderForCalc,
  resolveHourForCalc,
  resolveLongitudeForCalc,
  resolveLocationName,
} from '../store/chartContext.jsx';
import { calculateBaziChart } from '../engine/index.js';

// Ceremonial handoff timing — DES_04 §8 → §9
const SPOT_MS = 820;          // each energy's moment in the front spotlight
const CONTENT_FADE_MS = 420;  // loading content recedes beneath the flash
const FLASH_BLOOM_MS = 620;   // white floods the frame — the revelation flash
const FLASH_HOLD_MS = 150;    // hold full white to mask the screen swap

// Five energies in the generating (sheng) cycle — the order the spotlight
// walks: Wood feeds Fire feeds Earth bears Metal carries Water feeds Wood.
const ELS = [
  { key: 'wood',  color: PIG_WOOD },
  { key: 'fire',  color: PIG_FIRE },
  { key: 'earth', color: PIG_EARTH },
  { key: 'metal', color: PIG_METAL },
  { key: 'water', color: PIG_WATER },
];
const N = ELS.length;
const STEP = 360 / N;  // 72° between seats on the ring
const RING_R = 96;     // ring radius (px)

export default function LoadingScreen({ onComplete }) {
  const { birthData, setChart } = useChart();
  const [spot, setSpot] = useState(0);
  const [exiting, setExiting] = useState(false);
  const reduce = typeof window !== 'undefined' && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Spotlight stepper — advance which energy faces front; freeze on exit so
  // the elements settle before the flash (a twitch mid-fade reads as a glitch).
  useEffect(() => {
    if (exiting) return undefined;
    const id = setInterval(() => setSpot((s) => s + 1), SPOT_MS);
    return () => clearInterval(id);
  }, [exiting]);

  // Calculate the chart on mount, hold the ceremonial dwell, then flash out.
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
      // Intentional minimum dwell per DES_04 §8 (2.5–3s). Override via ?hold=N.
      const hold = (() => {
        const m = typeof location !== 'undefined' && /[?&]hold=(\d+)/.exec(location.search);
        return m ? parseInt(m[1], 10) : 2500;
      })();
      const remaining = Math.max(0, hold - (Date.now() - start));

      // wait the rest of the dwell → flip `exiting` (white bloom runs) → wait
      // the bloom + hold → onComplete (mount Reveal, which fades the white out).
      timers.push(setTimeout(() => {
        if (cancelled) return;
        setExiting(true);
        timers.push(setTimeout(() => {
          if (!cancelled) onComplete && onComplete();
        }, FLASH_BLOOM_MS + FLASH_HOLD_MS));
      }, remaining));
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const front = ((spot % N) + N) % N;

  // One element glyph (#el-* from the global D13 sprite, mounted by App) —
  // lit in its pigment when it holds the front spotlight, dim otherwise.
  const elIcon = (e, isFront) => (
    <svg
      viewBox="0 0 24 24"
      style={{
        width: '100%', height: '100%', display: 'block',
        color: isFront ? e.color : INK_LIGHT,
        opacity: isFront ? 1 : 0.3,
        filter: isFront ? `drop-shadow(0 6px 16px ${e.color}59)` : 'none',
        transition: 'color 460ms ease, opacity 460ms ease, filter 460ms ease',
      }}
    >
      <use href={`#el-${e.key}`} />
    </svg>
  );

  return (
    <div style={{ background: SILK, color: INK, position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Full-frame painted background — peaks above, water below, framing the
          ceremony in the calmer middle band as the chart narrows into form. */}
      <img
        src="/backgrounds/bg-reveal-03-stacked-horizons.png"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', zIndex: 0 }}
      />
      <StatusBar tint={INK} />

      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '0 32px',
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'translateY(-6px)' : 'none',
          transition: `opacity ${CONTENT_FADE_MS}ms cubic-bezier(0.22,1,0.36,1), transform ${CONTENT_FADE_MS}ms cubic-bezier(0.22,1,0.36,1)`,
        }}
      >
        {/* Five energies — the spotlight carousel. Reduced-motion gets a flat
            sequential row instead of the 3D ring. */}
        {reduce ? (
          <div style={{ display: 'flex', gap: 22, marginBottom: 46, height: 48, alignItems: 'center' }}>
            {ELS.map((e, i) => (
              <div key={e.key} style={{ width: 40, height: 40, transform: i === front ? 'scale(1.2)' : 'scale(1)', transition: 'transform 460ms ease' }}>
                {elIcon(e, i === front)}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ perspective: 820, width: 220, height: 132, marginBottom: 38 }}>
            <div
              style={{
                position: 'relative', width: '100%', height: '100%',
                transformStyle: 'preserve-3d',
                transform: `rotateY(${-spot * STEP}deg)`,
                transition: `transform ${Math.round(SPOT_MS * 0.74)}ms cubic-bezier(0.5,0.05,0.2,1)`,
              }}
            >
              {ELS.map((e, i) => (
                <div
                  key={e.key}
                  style={{
                    position: 'absolute', left: '50%', top: '50%',
                    width: 58, height: 58, margin: '-29px 0 0 -29px',
                    transform: `rotateY(${i * STEP}deg) translateZ(${RING_R}px)`,
                    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {elIcon(e, i === front)}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: INK, letterSpacing: 0.4, marginBottom: 22, textAlign: 'center' }}>
          Calculating your chart…
        </div>

        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 13.5, color: INK_LIGHT, textAlign: 'center', margin: 0, maxWidth: 280, lineHeight: 1.65 }}>
          Five pillars gather. Eight characters align.
          <br />
          Your signature takes form.
        </p>

        {/* Subtle hairline */}
        <div style={{ marginTop: 50, width: 40, height: 1, background: `linear-gradient(90deg, transparent, ${INK_LIGHT}, transparent)`, opacity: 0.5 }} />
      </div>

      {/* The revelation flash — a strong white bloom that floods the frame and
          carries through into the Reveal (which fades the same white out). */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 60, background: '#fff',
          opacity: exiting ? 1 : 0, pointerEvents: 'none',
          transition: exiting ? `opacity ${FLASH_BLOOM_MS}ms cubic-bezier(0.66,0,0.34,1)` : 'none',
        }}
      />
    </div>
  );
}
