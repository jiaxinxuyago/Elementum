// ===================================================================
// ELEMENTUM · BottomTabNav
// ===================================================================
// Persistent 5-tab nav visible across all post-Reveal dashboard screens.
// Spec: DOC5 §AM.2 + Library/components-library.html §9.
//
// Order (left → right):  Today · Guidance · Reading (centre) · Compat · Profile
// Convention:
//   · Icons-only — NO text labels (DOC5 §AM.2)
//   · 76 px bar height (incl. safe-area padding)
//   · Background: rgba(253,253,252,0.85) + backdrop-filter blur(12px)
//   · Border-top: var(--borderLight)
//   · Inactive icon colour: inkLight
//   · Active icon colour:   ink   (the ONLY active affordance — "COLD" style)
//   · No seal-dot: per user direction the WARM seal-dot state is dropped;
//     active tabs are distinguished purely by ink colour.
//   · Pressed: transform scale(0.96)
// ===================================================================

import React, { useState } from 'react';
import { TabIcon } from '../shared/icons';
import { ink, inkLight, borderLight } from '../../styles/tokens';

// Tab order is locked by DOC5 §AM.2 — do not reorder.
const TABS = [
  { key: 'today',    label: 'Today' },
  { key: 'guidance', label: 'Guidance' },
  { key: 'reading',  label: 'Reading' },   // centre — carries seal-dot when active
  { key: 'compat',   label: 'Compatibility' },
  { key: 'profile',  label: 'Profile' },
];

export default function BottomTabNav({ active, onChange }) {
  const [pressed, setPressed] = useState(null);

  return (
    <nav
      aria-label="Primary navigation"
      style={{
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        background: 'rgba(253, 253, 252, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: `1px solid ${borderLight}`,
        // 8 px top + (8 + safe-area-inset-bottom) px bottom; 18 px fallback.
        padding: '8px 16px calc(8px + env(safe-area-inset-bottom, 18px))',
        height: 76,
        zIndex: 30,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      {TABS.map((t) => {
        const isActive = active === t.key;
        const isPressed = pressed === t.key;
        const color = isActive ? ink : inkLight;
        return (
          <button
            key={t.key}
            type="button"
            aria-label={t.label}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onChange?.(t.key)}
            onPointerDown={() => setPressed(t.key)}
            onPointerUp={() => setPressed(null)}
            onPointerLeave={() => setPressed(null)}
            style={{
              width: 64,
              minHeight: 44,            // a11y touch target
              padding: '14px 0 16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0,
              transform: isPressed ? 'scale(0.96)' : 'none',
              transition: 'transform 90ms ease-out',
            }}
          >
            <TabIcon tab={t.key} size={24} color={color} />
          </button>
        );
      })}
    </nav>
  );
}

// Exported for App.jsx / Storybook-style enumeration if needed.
export const TAB_KEYS = TABS.map((t) => t.key);
