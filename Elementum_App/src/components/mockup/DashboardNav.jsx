// ===================================================================
// ELEMENTUM · Dashboard bottom tab nav (v1.8)
//
// 5-tab bottom navigation visible ONLY inside /dashboard/*.
// First appears post-Reveal, materialising as part of the
// "the app reveals its full surface" moment.
//
// Tabs: Today · Energy Map · Guidance · Friends · Profile
// Active state pigment = DM element color (passed via prop).
// Spec: DOC5 §11 v1.8 "Bottom tab nav" subsection.
// ===================================================================

import React from 'react';
import {
  INK, INK_LIGHT,
  PAPER_HAIR,
  PIG_METAL,
} from '../../styles/tokens.jsx';

const TABS = [
  { key: 'today',     label: 'Today' },
  { key: 'energyMap', label: 'Map' },
  { key: 'guidance',  label: 'Guidance' },
  { key: 'friends',   label: 'Friends' },
  { key: 'profile',   label: 'Profile' },
];

export default function DashboardNav({ active = 'energyMap', accent = PIG_METAL, onTabChange, style }) {
  return (
    <nav
      style={{
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        height: 76,
        background: 'rgba(241,233,214,0.96)',
        backdropFilter: 'blur(8px)',
        borderTop: `1px solid ${PAPER_HAIR}`,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingBottom: 16, // would be env(safe-area-inset-bottom) in shipping app
        zIndex: 100,
        fontFamily: "'EB Garamond', serif",
        ...style,
      }}
    >
      {TABS.map((t) => {
        const isActive = active === t.key;
        const color = isActive ? accent : INK_LIGHT;
        return (
          <button
            key={t.key}
            onClick={() => onTabChange?.(t.key)}
            style={{
              background: 'none',
              border: 'none',
              padding: '4px 8px',
              minWidth: 56,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              color,
              fontFamily: 'inherit',
            }}
          >
            <TabIcon kind={t.key} color={color} />
            <span
              style={{
                fontSize: 10.5,
                fontWeight: isActive ? 500 : 400,
                letterSpacing: 0.4,
              }}
            >
              {t.label}
            </span>
            {isActive && (
              <span
                style={{
                  width: 14,
                  height: 2,
                  borderRadius: 1,
                  background: accent,
                  marginTop: 1,
                  opacity: 0.8,
                }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// Brush-line tab icons. Geometric line iconography, matching
// the existing ElementSign vocabulary (crescent, tree, square,
// waves, triangle). Stroke 1.6 across the set for consistency.
// ─────────────────────────────────────────────────────────────
function TabIcon({ kind, color }) {
  const s = 22;
  const sw = 1.6;
  const c = color;
  const cx = s / 2;
  const cy = s / 2;

  const props = {
    viewBox: `0 0 ${s} ${s}`,
    width: s,
    height: s,
    fill: 'none',
    stroke: c,
    strokeWidth: sw,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (kind) {
    case 'today':
      // Brush dot — small filled circle inside an open ring.
      return (
        <svg {...props}>
          <circle cx={cx} cy={cy} r={s * 0.36} />
          <circle cx={cx} cy={cy} r={s * 0.13} fill={c} stroke="none" />
        </svg>
      );
    case 'energyMap':
      // Concentric rings — mini 3-layer profile ring.
      return (
        <svg {...props}>
          <circle cx={cx} cy={cy} r={s * 0.40} />
          <circle cx={cx} cy={cy} r={s * 0.26} />
          <circle cx={cx} cy={cy} r={s * 0.10} fill={c} stroke="none" />
        </svg>
      );
    case 'guidance':
      // Upward stroke — compass / direction.
      return (
        <svg {...props}>
          <path d={`M ${cx} ${cy + s*0.32} L ${cx} ${cy - s*0.32}`} />
          <path d={`M ${cx - s*0.18} ${cy - s*0.14} L ${cx} ${cy - s*0.32} L ${cx + s*0.18} ${cy - s*0.14}`} />
          <path d={`M ${cx - s*0.10} ${cy + s*0.24} L ${cx + s*0.10} ${cy + s*0.24}`} opacity="0.6" />
        </svg>
      );
    case 'friends':
      // Two linked circles.
      return (
        <svg {...props}>
          <circle cx={cx - s*0.14} cy={cy} r={s * 0.22} />
          <circle cx={cx + s*0.14} cy={cy} r={s * 0.22} />
        </svg>
      );
    case 'profile':
      // Seal square with inner mark.
      return (
        <svg {...props}>
          <rect
            x={cx - s*0.30} y={cy - s*0.30}
            width={s*0.60} height={s*0.60}
            rx={s*0.06}
          />
          <path d={`M ${cx - s*0.10} ${cy - s*0.05} L ${cx + s*0.10} ${cy - s*0.05}`} opacity="0.7" />
          <path d={`M ${cx - s*0.10} ${cy + s*0.10} L ${cx + s*0.10} ${cy + s*0.10}`} opacity="0.7" />
        </svg>
      );
    default:
      return <svg {...props}><circle cx={cx} cy={cy} r={s * 0.3} /></svg>;
  }
}
