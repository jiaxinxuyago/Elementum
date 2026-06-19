// ===================================================================
// ELEMENTUM · D13PillarChartScreen  (the `app-pillars` route — P5)
// ===================================================================
// Builds the four-pillar view-model from the live chart and renders the
// 八字 data page. Back returns to the Day Master card; the hour chip (when
// birth time is unset) descends into the hour-discovery flow.
// ===================================================================

import React from 'react';
import './d13.css';
import D13PillarChartCard from './D13PillarChartCard.jsx';
import { buildPillars } from './d13Pillars.js';
import { useD13 } from './useD13.js';

// Templated filler — real combination-pattern detection lands later; the
// conclusion never surfaces 合/冲 vocabulary (charter rule).
const PATTERNS_FILLER = 'One quiet alliance runs through your branches — forces that look opposed conspiring toward the same end.';

export default function D13PillarChartScreen({ onBack, onDiscoverHour }) {
  const { chart, ec, hourUnknown } = useD13();
  if (!ec || !chart) return null;
  const pillars = buildPillars(chart, hourUnknown);
  return (
    <div className="d13" style={{ position: 'absolute', inset: 0 }}>
      <D13PillarChartCard
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
