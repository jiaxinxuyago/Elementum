// Shared D13 screen state: builds the energy contract + identity from the
// live chart, tracks the selected energy, and a transient "coming soon"
// toast for Handoff-2 destinations not yet wired in.
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useChart } from '../../store/chartContext.jsx';
import { buildEnergyChart } from '../../engine/buildEnergyChart.js';
import { buildIdentity } from './d13Identity.js';
import { STEM_CARD_DATA } from '../../content/archetypeSource.js';

export function useD13() {
  const { chart, birthData } = useChart();
  const hourUnknown = !!(birthData?.hourUnknown || birthData?.hourWindow);
  const ec = useMemo(() => (chart ? buildEnergyChart(chart) : null), [chart]);
  const identity = useMemo(
    () => (chart ? buildIdentity(chart, STEM_CARD_DATA[chart.dayMaster.stem], hourUnknown) : null),
    [chart, hourUnknown]
  );
  const [sel, setSel] = useState(null);
  useEffect(() => { if (ec && !sel) setSel(ec.energies[0].el); }, [ec, sel]);
  const [wip, setWip] = useState(null);
  const showWip = useCallback((label) => {
    setWip(label);
    setTimeout(() => setWip((w) => (w === label ? null : w)), 1800);
  }, []);
  return { ec, identity, hourUnknown, sel: sel || (ec && ec.energies[0].el), setSel, wip, showWip };
}
