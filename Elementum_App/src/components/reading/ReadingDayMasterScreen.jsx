// ===================================================================
// ELEMENTUM · ReadingDayMasterScreen  (the `app-daymaster` route — P4)
// ===================================================================
// Wraps ReadingDayMasterCard with the live chart: identity from buildIdentity,
// claims = inscription + the templated day-master reading. Back returns to
// the catalogue; "Birth Chart" descends into the 八字 Pillar Chart (P5).
// ===================================================================

import './reading.css';
import ReadingDayMasterCard from './ReadingDayMasterCard.jsx';
import { STEM_CARD_DATA } from '../../content/index.js';
import { resolveDayMasterReading } from './readingResolve.js';
import { useReading } from './useReading.js';

export default function ReadingDayMasterScreen({ onBack, onBirthChart }) {
  const { chart, ec, identity, wip } = useReading();
  if (!ec || !identity) return null;
  const stem = chart && chart.dayMaster && chart.dayMaster.stem;
  const card = STEM_CARD_DATA[stem];
  // Band-resolved nature + gifts & shadows (owner layout 2026-08-05; BAND-A
  // band variants 2026-08-13 — falls back to the locked baseline cleanly).
  const reading = resolveDayMasterReading(stem, chart) || {};
  return (
    <div className="reading" style={{ position: 'absolute', inset: 0 }}>
      <ReadingDayMasterCard
        dayMaster={ec.dayMaster}
        archetype={identity.archetype}
        manifesto={identity.manifesto}
        overview={card?.identity?.overview}
        nature={reading.nature || card?.yourNature?.desc}
        gifts={reading.gifts}
        shadows={reading.shadows}
        onBack={onBack}
        onBirthChart={onBirthChart}
      />
      {wip ? <div className="reading-wip">{wip}</div> : null}
    </div>
  );
}
