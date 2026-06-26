// ===================================================================
// ELEMENTUM · D13ReadingScreen  (the `app-reading` route — Reading tab)
// ===================================================================
// The at-rest catalogue on every Reading-tab visit (no ceremony): the
// same wheel + ribbon + shelf the reveal dissolve resolves onto. Fills
// the app PhoneFrame; its own icons-only tab bar routes the dashboard.
// Replaces the old ReadingScreen in place.
// ===================================================================

import React from 'react';
import './d13.css';
import EnergyCatalogue from './EnergyCatalogue.jsx';
import { useD13 } from './useD13.js';

export default function D13ReadingScreen({ onTab, onDayMaster, onOpenEnergy, onPillarChart }) {
  const { ec, identity, chart, hourUnknown, sel, setSel, wip, showWip } = useD13();
  if (!ec) return null;
  return (
    <div className="d13" style={{ position: 'absolute', inset: 0 }}>
      <EnergyCatalogue
        energies={ec.energies}
        dayMaster={ec.dayMaster}
        glyph={chart?.dayMaster?.stem}
        archetype={identity?.archetype}
        tilde={hourUnknown}
        selected={sel}
        onSelect={setSel}
        onRead={() => (onOpenEnergy ? onOpenEnergy(sel) : showWip('Coming soon'))}
        onSeal={onDayMaster || (() => showWip('Coming soon'))}
        onPillarChart={onPillarChart || (() => showWip('Coming soon'))}
        onTab={onTab}
      />
      {wip ? <div className="d13-wip">{wip}</div> : null}
    </div>
  );
}
