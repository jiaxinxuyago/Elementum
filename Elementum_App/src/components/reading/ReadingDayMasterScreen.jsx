// ===================================================================
// ELEMENTUM · ReadingDayMasterScreen  (the `app-daymaster` route — P4)
// ===================================================================
// Wraps ReadingDayMasterCard with the live chart: identity from buildIdentity,
// claims = inscription + the templated day-master reading. Back returns to
// the catalogue; "Birth Chart" descends into the 八字 Pillar Chart (P5).
// ===================================================================

import { useState } from 'react';
import './reading.css';
import ReadingDayMasterCard from './ReadingDayMasterCard.jsx';
import ShareCardOverlay from '../share/ShareCardOverlay.jsx';
import { DM_READING, DM_READING_FALLBACK } from '../../content/reading/index.js';
import { resolveDayMasterReading } from './readingResolve.js';
import { useReading } from './useReading.js';

export default function ReadingDayMasterScreen({ onBack, onBirthChart }) {
  const { chart, ec, identity, wip } = useReading();
  const [showShare, setShowShare] = useState(false);
  if (!ec || !identity) return null;
  const stem = chart && chart.dayMaster && chart.dayMaster.stem;
  // band-resolved authored reading (the 10×3 stem-band content); falls back
  // to the templated filler if the stem has no authored entry.
  const reading = resolveDayMasterReading(stem, chart) || DM_READING[stem] || DM_READING_FALLBACK;
  const claims = [identity.inscription, ...(reading.claims || [])].slice(0, 3);
  return (
    <div className="reading" style={{ position: 'absolute', inset: 0 }}>
      <ReadingDayMasterCard
        dayMaster={ec.dayMaster}
        archetype={identity.archetype}
        manifesto={identity.manifesto}
        claims={claims}
        edge={reading.edge}
        onBack={onBack}
        onBirthChart={onBirthChart}
        onShare={() => setShowShare(true)}
      />
      {showShare ? (
        <ShareCardOverlay identity={identity} dayMaster={ec.dayMaster} onClose={() => setShowShare(false)} />
      ) : null}
      {wip ? <div className="reading-wip">{wip}</div> : null}
    </div>
  );
}
