// Shared D13 screen state: builds the energy contract + identity from the
// live chart, tracks the selected energy, and a transient "coming soon"
// toast for Handoff-2 destinations not yet wired in.
import { useMemo, useState, useCallback } from 'react';
import { useChart } from '../../store/chartContext.jsx';
import { buildEnergyChart } from '../../engine/index.js';
import { buildIdentity } from './identity.js';
import { STEM_CARD_DATA } from '../../content/index.js';

export function useReading() {
  const { chart, birthData } = useChart();
  const hourUnknown = !!(birthData?.hourUnknown || birthData?.hourWindow);
  const ec = useMemo(() => (chart ? buildEnergyChart(chart) : null), [chart]);
  const identity = useMemo(
    () => (chart ? buildIdentity(chart, STEM_CARD_DATA[chart.dayMaster.stem], birthData) : null),
    [chart, birthData]
  );
  // Selected energy. Null until the user picks one; the returned `sel` below
  // falls back to the first energy, so no init-effect is needed.
  const [sel, setSel] = useState(null);
  const [wip, setWip] = useState(null);
  const showWip = useCallback((label) => {
    setWip(label);
    setTimeout(() => setWip((w) => (w === label ? null : w)), 1800);
  }, []);
  return { chart, ec, identity, hourUnknown, sel: sel || (ec && ec.energies[0].el), setSel, wip, showWip };
}
