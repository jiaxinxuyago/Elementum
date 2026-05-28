// ===================================================================
// ELEMENTUM · EnergyMapScreen
// ===================================================================
// The "Energy Map" destination — reached from the Reading tab's
// top-of-page "Energy Map →" link. DOC5 §AM.1 specifies this as
// "same content as Reveal, no first-time CTA". So we render
// RevealScreen with `hideCTA` and provide our own back affordance.
//
// Rendered inside DashboardShell so BottomTabNav is still present.
// ===================================================================

import React from 'react';
import RevealScreen from '../RevealScreen.jsx';
import { Icon } from '../shared/icons';
import { inkSoft } from '../../styles/tokens';

export default function EnergyMapScreen({ onBack }) {
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      {/* Reveal screen with CTA suppressed */}
      <RevealScreen hideCTA />

      {/* Floating back button — fixed top-left, sits over Reveal's
          painted backdrop. Doesn't disturb Reveal's layout. */}
      <button
        type="button"
        aria-label="Back to Readings"
        onClick={onBack}
        style={{
          position: 'absolute',
          top: 56, left: 16,
          width: 36, height: 36,
          borderRadius: 999,
          background: 'rgba(241, 233, 214, 0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: 'none',
          color: inkSoft,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <Icon id="ico-back" size={20} />
      </button>
    </div>
  );
}
