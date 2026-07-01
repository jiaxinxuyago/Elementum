// ===================================================================
// ELEMENTUM · ReadingScreen  (the `app-reading` route — Reading tab)
// ===================================================================
// The at-rest catalogue on every Reading-tab visit (no ceremony): the
// same wheel + ribbon + shelf the reveal dissolve resolves onto. Fills
// the app PhoneFrame; its own icons-only tab bar routes the dashboard.
// Replaces the old ReadingScreen in place.
// ===================================================================

import './reading.css';
import EnergyCatalogue from './EnergyCatalogue.jsx';
import { useReading } from './useReading.js';

export default function ReadingScreen({ onTab, onDayMaster, onOpenEnergy, onPillarChart }) {
  const { ec, identity, chart, hourUnknown, sel, setSel, wip, showWip } = useReading();
  if (!ec) return null;
  return (
    <div className="reading" style={{ position: 'absolute', inset: 0 }}>
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
      {wip ? <div className="reading-wip">{wip}</div> : null}
    </div>
  );
}
