// ===================================================================
// ELEMENTUM · DevBar (development only)
// Dev-mode sidebar that sits OUTSIDE the phone frame on wide screens.
// Lets the designer:
//   - switch the pricing tier (Free / Seeker / Advisor) to preview
//     tier-gated content without an auth flow
//   - see the current chart + birthData summary
//   - reset the chart and jump to any screen
//   - seed preset birth data (Blade / Rain) for quick Reveal testing
//
// Only renders in development (import.meta.env.DEV) and only on viewports
// wide enough to have space beside the 390px phone frame. Never shipped.
// ===================================================================

import React, { useEffect, useState } from 'react';
import {
  useChart,
  TIERS,
  TIER_LABELS,
  TIER_PRICES,
} from '../../store/chartContext.jsx';

// Tier → pigment. Matches the pricing card gradients in DOC5 §19.
const TIER_ACCENT = {
  free:    '#8D9C7A', // wood — free is natural, ambient
  seeker:  '#B59A6B', // earth — seeker is grounded, established
  advisor: '#B4755E', // fire — advisor is premium, animated
};

const FLOW_SCREENS = [
  'welcome',
  'step1', 'step2', 'step3',
  'step4', 'step4a',
  'step5',
  'step6', 'step6a',
  'step7', 'step7a',
  'loading', 'reveal',
];

export default function DevBar() {
  const { birthData, chart, tier, setTier, resetFlow } = useChart();
  const [hash, setHash] = useState(
    typeof window !== 'undefined' ? window.location.hash : ''
  );

  // Track the current screen via hashchange so the "now on" indicator updates.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const currentScreen = (hash.replace(/^#\/?/, '') || 'welcome').toLowerCase();

  const goto = (name) => () => {
    window.__goto?.(name);
  };

  const seed = (preset) => () => {
    window.__seedData?.(preset);
  };

  const regenerate = () => {
    resetFlow();
    window.__goto?.('welcome');
  };

  return (
    <div
      style={{
        width: 260,
        flexShrink: 0,
        background: '#22201c',
        color: '#d8d2c2',
        border: '1px solid #3a342d',
        borderRadius: 14,
        padding: 16,
        fontFamily: "'EB Garamond', serif",
        fontSize: 13,
        lineHeight: 1.55,
        // Sit parallel to the phone frame — vertical centering inherited
        // from the Shell's alignItems: 'center'. Cap height so long content
        // scrolls inside the panel instead of pushing layout.
        maxHeight: 'calc(100vh - 40px)',
        overflowY: 'auto',
      }}
    >
      <DevSection label="Debug">
        <div style={{ color: '#8a8378', fontSize: 11, letterSpacing: 2.2, textTransform: 'uppercase', marginBottom: 8 }}>
          DEV ONLY · not shipped
        </div>
      </DevSection>

      {/* ── Tier switcher ─────────────────────────────────────── */}
      <DevSection label="Pricing Tier">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {TIERS.map((t) => {
            const active = tier === t;
            return (
              <button
                key={t}
                onClick={() => setTier(t)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: `1px solid ${active ? TIER_ACCENT[t] : '#3a342d'}`,
                  background: active ? `${TIER_ACCENT[t]}22` : '#2a2621',
                  color: active ? TIER_ACCENT[t] : '#bfb7a8',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 160ms ease',
                }}
              >
                <span style={{ fontWeight: 500 }}>{TIER_LABELS[t]}</span>
                <span style={{ fontSize: 11, opacity: 0.75 }}>{TIER_PRICES[t]}</span>
              </button>
            );
          })}
        </div>
      </DevSection>

      {/* ── Chart summary ─────────────────────────────────────── */}
      <DevSection label="Birth Chart">
        {chart ? (
          <div style={{ fontSize: 12, color: '#c7bfb0' }}>
            <Row k="Archetype" v={chart.dayMaster?.stem ? `${chart.dayMaster.stem} · ${chart.dayMaster.element}` : '—'} />
            <Row k="Band" v={chart.dayMaster?.strength || '—'} />
            <Row k="Pattern" v={chart.tgPattern || '—'} />
            <Row k="Archetype Key" v={chart.archetypeKey || '—'} mono />
            <Row k="Catalyst" v={chart.catalyst || '—'} />
            <Row k="Missing" v={(chart.missingElements || []).join(', ') || 'none'} />
          </div>
        ) : (
          <div style={{ fontStyle: 'italic', color: '#8a8378', fontSize: 12 }}>
            no chart generated yet
          </div>
        )}
      </DevSection>

      {/* ── Birth data summary ────────────────────────────────── */}
      <DevSection label="Birth Data">
        <div style={{ fontSize: 12, color: '#c7bfb0' }}>
          <Row k="Date" v={birthData.year ? `${birthData.year}-${String(birthData.month).padStart(2, '0')}-${String(birthData.day).padStart(2, '0')}` : '—'} />
          <Row k="Hour" v={birthData.hourUnknown ? 'unknown' : birthData.hour != null ? `${String(birthData.hour).padStart(2, '0')}:00` : birthData.hourWindow || '—'} />
          <Row k="Location" v={
            birthData.location && typeof birthData.location === 'object'
              ? `${birthData.location.name} · ${Number(birthData.location.longitude).toFixed(2)}°`
              : birthData.location || '—'
          } />
          <Row k="Gender" v={birthData.gender || '—'} />
          {birthData.polarity && <Row k="Polarity" v={birthData.polarity} />}
        </div>
      </DevSection>

      {/* ── Seed presets ──────────────────────────────────────── */}
      <DevSection label="Seed Preset">
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={seed('blade')} style={miniBtn}>
            庚 Blade
          </button>
          <button onClick={seed('rain')} style={miniBtn}>
            癸 Rain
          </button>
        </div>
      </DevSection>

      {/* ── Jump-to ───────────────────────────────────────────── */}
      <DevSection label="Jump to Screen">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {FLOW_SCREENS.map((s) => {
            const active = currentScreen === s;
            return (
              <button
                key={s}
                onClick={goto(s)}
                style={{
                  padding: '4px 8px',
                  borderRadius: 4,
                  border: `1px solid ${active ? '#8b7355' : '#3a342d'}`,
                  background: active ? 'rgba(139,115,85,0.22)' : '#2a2621',
                  color: active ? '#e0d6c3' : '#9d968a',
                  cursor: 'pointer',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: 10,
                  letterSpacing: 0.2,
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </DevSection>

      {/* ── Actions ───────────────────────────────────────────── */}
      <DevSection label="Actions">
        <button
          onClick={regenerate}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #8b7355',
            background: '#6b5339',
            color: '#f1e9d6',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: 0.3,
          }}
        >
          ↻ Reset &amp; regenerate
        </button>
      </DevSection>
    </div>
  );
}

// ── helpers ───────────────────────────────────────────────────

function DevSection({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          fontSize: 10,
          letterSpacing: 2.4,
          textTransform: 'uppercase',
          color: '#7d766b',
          marginBottom: 6,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function Row({ k, v, mono = false }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 8,
        padding: '2px 0',
      }}
    >
      <span style={{ color: '#7d766b', flexShrink: 0 }}>{k}</span>
      <span
        style={{
          textAlign: 'right',
          fontFamily: mono ? 'ui-monospace, SFMono-Regular, Menlo, monospace' : 'inherit',
          fontSize: mono ? 11 : 12,
          wordBreak: 'break-all',
        }}
      >
        {v}
      </span>
    </div>
  );
}

const miniBtn = {
  flex: 1,
  padding: '6px 8px',
  borderRadius: 6,
  border: '1px solid #3a342d',
  background: '#2a2621',
  color: '#c7bfb0',
  cursor: 'pointer',
  fontFamily: "'EB Garamond', serif",
  fontSize: 12,
};
