// ===================================================================
// ELEMENTUM · ReadingRevealScreen  (the `reveal` route — first run)
// ===================================================================
// The ceremonial reveal: the identity plate that scroll-dissolves into
// the energy catalogue. The bottom tab bar fades in at the end and is
// live (Reading active) — the user is standing in the dashboard. Fills
// the app PhoneFrame. Replaces the old RevealScreen in place.
// ===================================================================

import './reading.css';
import RevealDissolve from './RevealDissolve.jsx';
import { useReading } from './useReading.js';

export default function ReadingRevealScreen({ onTab, onDone }) {
  const { ec, identity, chart, hourUnknown, sel, setSel, wip, showWip } = useReading();
  if (!ec || !identity) return null;
  return (
    <div className="reading" style={{ position: 'absolute', inset: 0 }}>
      <RevealDissolve
        identity={identity}
        energies={ec.energies}
        dayMaster={ec.dayMaster}
        glyph={chart?.dayMaster?.stem}
        tilde={hourUnknown}
        selected={sel}
        onSelect={setSel}
        onRead={() => showWip('Coming soon')}
        onSeal={() => showWip('Coming soon')}
        onTab={onTab}
        onComplete={onDone}
      />
      {/* The revelation flash continues from LoadingScreen's white bloom: the
          plate emerges as this fades out, so the hand-off reads as one ritual. */}
      <div className="reveal-flash" aria-hidden="true" />
      {wip ? <div className="reading-wip">{wip}</div> : null}
    </div>
  );
}
