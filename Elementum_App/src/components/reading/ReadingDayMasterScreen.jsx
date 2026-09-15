// ===================================================================
// ELEMENTUM · ReadingDayMasterScreen  (the `app-daymaster` route — P4)
// ===================================================================
// Wraps ReadingDayMasterCard with the live chart: identity from buildIdentity,
// the Sign + Your nature, the door-chosen gifts & shadows, and the carry
// card. Back returns to the catalogue; "Birth Chart" descends into the 八字
// Pillar Chart (P5).
//
// P4 v3 (REA_02 §5h, owner 2026-09-15): the quintessence page. The pools are
// chosen through the same journey model the catalogue's manual uses — gifts
// through the catalysts, shadows through the frictions — so the door marks,
// the carry card and the manual's SEEK/EASE rows always agree.
// ===================================================================

import { useMemo } from 'react';
import './reading.css';
import ReadingDayMasterCard from './ReadingDayMasterCard.jsx';
import { STEM_CARD_DATA } from '../../content/index.js';
import { getEnergyBand } from '../../engine/index.js';
import { resolveDayMasterReading } from './readingResolve.js';
import { useReading } from './useReading.js';
import { buildJourneyModel, poolDoors, doorMarkFor, buildCarryModel } from '../journey/journeyData.js';

export default function ReadingDayMasterScreen({ onBack, onBirthChart }) {
  const { chart, ec, identity, wip } = useReading();
  const stem = chart && chart.dayMaster && chart.dayMaster.stem;
  const card = STEM_CARD_DATA[stem];
  const m = useMemo(
    () => (chart && ec && identity && card ? buildJourneyModel({ chart, ec, identity, card }) : null),
    [chart, ec, identity, card],
  );
  const doors = useMemo(() => poolDoors(m), [m]);
  const reading = useMemo(() => resolveDayMasterReading(stem, chart, doors) || {}, [stem, chart, doors]);
  const gifts = useMemo(() => (reading.gifts || []).map((it) => ({ ...it, mark: doorMarkFor(m, it) })), [reading, m]);
  const shadows = useMemo(() => (reading.shadows || []).map((it) => ({ ...it, mark: doorMarkFor(m, it) })), [reading, m]);
  const carry = useMemo(() => buildCarryModel(m, { gifts, shadows }), [m, gifts, shadows]);
  if (!ec || !identity) return null;
  const band = chart?.dayMaster ? getEnergyBand(chart.dayMaster.strength) : 'balanced';
  const poolSize = (card?.gifts?.length || 0) + (card?.shadows?.length || 0);
  return (
    <div className="reading" style={{ position: 'absolute', inset: 0 }}>
      <ReadingDayMasterCard
        dayMaster={ec.dayMaster}
        archetype={identity.archetype}
        manifesto={identity.manifesto}
        overview={card?.identity?.overview}
        nature={reading.nature || card?.yourNature?.desc}
        gifts={gifts}
        shadows={shadows}
        band={band}
        balanced={!!m?.balanced}
        poolSize={poolSize}
        carry={carry}
        onBack={onBack}
        onBirthChart={onBirthChart}
      />
      {wip ? <div className="reading-wip">{wip}</div> : null}
    </div>
  );
}
