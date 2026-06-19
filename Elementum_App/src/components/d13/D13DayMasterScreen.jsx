// ===================================================================
// ELEMENTUM · D13DayMasterScreen  (the `app-daymaster` route — P4)
// ===================================================================
// Wraps D13DayMasterCard with the live chart: identity from buildIdentity,
// claims = inscription + the templated day-master reading. Back returns to
// the catalogue; "Birth Chart" descends into the 八字 Pillar Chart (P5).
// ===================================================================

import React from 'react';
import './d13.css';
import D13DayMasterCard from './D13DayMasterCard.jsx';
import { DM_READING, DM_READING_FALLBACK } from './d13ReadingContent.js';
import { useD13 } from './useD13.js';

export default function D13DayMasterScreen({ onBack, onBirthChart }) {
  const { chart, ec, identity, wip } = useD13();
  if (!ec || !identity) return null;
  const stem = chart && chart.dayMaster && chart.dayMaster.stem;
  const reading = DM_READING[stem] || DM_READING_FALLBACK;
  const claims = [identity.inscription, ...reading.claims].slice(0, 3);
  return (
    <div className="d13" style={{ position: 'absolute', inset: 0 }}>
      <D13DayMasterCard
        dayMaster={ec.dayMaster}
        archetype={identity.archetype}
        manifesto={identity.manifesto}
        claims={claims}
        edge={reading.edge}
        onBack={onBack}
        onBirthChart={onBirthChart}
      />
      {wip ? <div className="d13-wip">{wip}</div> : null}
    </div>
  );
}
