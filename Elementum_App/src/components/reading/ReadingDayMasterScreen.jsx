// ===================================================================
// ELEMENTUM · ReadingDayMasterScreen  (the `app-daymaster` route — P4)
// ===================================================================
// Wraps ReadingDayMasterCard with the live chart: identity from buildIdentity,
// The Sign, how the core runs, and the five energies as the diagnosis.
// Back returns to the catalogue; "Birth Chart" descends into the 八字
// Pillar Chart (P5); a row opens that energy's page.
//
// P4 v4 (owner 2026-10-17): the diagnosis reads the same journey model the
// catalogue and the energy pages use, so every line and chip on this page is
// the text of the energy page it opens (journeyData.buildDiagnosisModel).
// ===================================================================

import { useMemo } from 'react';
import './reading.css';
import ReadingDayMasterCard from './ReadingDayMasterCard.jsx';
import { STEM_CARD_DATA } from '../../content/index.js';
import { resolveDayMasterReading } from './readingResolve.js';
import { useReading } from './useReading.js';
import { buildJourneyModel, buildDiagnosisModel } from '../journey/journeyData.js';

export default function ReadingDayMasterScreen({ onBack, onBirthChart, onOpenEnergy }) {
  const { chart, ec, identity, wip } = useReading();
  const stem = chart && chart.dayMaster && chart.dayMaster.stem;
  const card = STEM_CARD_DATA[stem];
  const m = useMemo(
    () => (chart && ec && identity && card ? buildJourneyModel({ chart, ec, identity, card }) : null),
    [chart, ec, identity, card],
  );
  // One band for every surface (owner B11 2026-09-20): the resolved ec.band,
  // never raw engine strength, picks the nature variant.
  const reading = useMemo(() => resolveDayMasterReading(stem, chart, undefined, m?.band) || {}, [stem, chart, m]);
  const dx = useMemo(() => buildDiagnosisModel(m), [m]);
  if (!ec || !identity) return null;
  return (
    <div className="reading" style={{ position: 'absolute', inset: 0 }}>
      <ReadingDayMasterCard
        dayMaster={ec.dayMaster}
        archetype={identity.archetype}
        manifesto={identity.manifesto}
        overview={card?.identity?.overview}
        nature={reading.nature || card?.yourNature?.desc}
        dx={dx}
        onBack={onBack}
        onBirthChart={onBirthChart}
        onOpenEnergy={onOpenEnergy}
      />
      {wip ? <div className="reading-wip">{wip}</div> : null}
    </div>
  );
}
