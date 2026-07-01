// ===================================================================
// ELEMENTUM · ReadingPillarChartScreen  (the `app-pillars` route — P5)
// ===================================================================
// Builds the four-pillar view-model from the live chart and renders the
// 八字 data page. Back returns to the Day Master card; the hour chip (when
// birth time is unset) descends into the hour-discovery flow.
// ===================================================================

import './reading.css';
import ReadingPillarChartCard from './ReadingPillarChartCard.jsx';
import { buildPillars } from './pillars.js';
import { useReading } from './useReading.js';

// Templated filler — real combination-pattern detection lands later; the
// conclusion never surfaces 合/冲 vocabulary (charter rule).
const PATTERNS_FILLER = 'One quiet alliance runs through your branches — forces that look opposed conspiring toward the same end.';

export default function ReadingPillarChartScreen({ onBack, onDiscoverHour }) {
  const { chart, ec, hourUnknown } = useReading();
  if (!ec || !chart) return null;
  const pillars = buildPillars(chart, hourUnknown);
  return (
    <div className="reading" style={{ position: 'absolute', inset: 0 }}>
      <ReadingPillarChartCard
        pillars={pillars}
        energies={ec.energies}
        patterns={PATTERNS_FILLER}
        hourUnknown={hourUnknown}
        onBack={onBack}
        onDiscoverHour={onDiscoverHour}
      />
    </div>
  );
}
