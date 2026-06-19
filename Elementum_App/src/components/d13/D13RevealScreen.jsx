// ===================================================================
// ELEMENTUM · D13RevealScreen  (the `reveal` route — first run)
// ===================================================================
// The ceremonial reveal: the identity plate that scroll-dissolves into
// the energy catalogue. The bottom tab bar fades in at the end and is
// live (Reading active) — the user is standing in the dashboard. Fills
// the app PhoneFrame. Replaces the old RevealScreen in place.
// ===================================================================

import React from 'react';
import './d13.css';
import RevealDissolve from './RevealDissolve.jsx';
import { useD13 } from './useD13.js';

export default function D13RevealScreen({ onTab }) {
  const { ec, identity, hourUnknown, sel, setSel, wip, showWip } = useD13();
  if (!ec || !identity) return null;
  return (
    <div className="d13" style={{ position: 'absolute', inset: 0 }}>
      <RevealDissolve
        identity={identity}
        energies={ec.energies}
        dayMaster={ec.dayMaster}
        tilde={hourUnknown}
        selected={sel}
        onSelect={setSel}
        onRead={() => showWip('Coming soon')}
        onSeal={() => showWip('Coming soon')}
        onTab={onTab}
      />
      {wip ? <div className="d13-wip">{wip}</div> : null}
    </div>
  );
}
