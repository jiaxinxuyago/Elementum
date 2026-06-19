// ===================================================================
// ELEMENTUM · D13EnergyCardScreen  (the `app-energy` route — P6/P7)
// ===================================================================
// Opens on the tapped energy and swipes ⟷ through all five in presence
// order. Derives the role badges + the cycle relation to the Day Master,
// flips to the ghost register for scarce/absent energies, and routes the
// Seeker gate into the real upgrade modal (hidden once the user is Seeker+).
// ===================================================================

import React, { useState, useEffect, useRef } from 'react';
import './d13.css';
import D13EnergyCard from './D13EnergyCard.jsx';
import { ENERGY_CONTENT } from './d13ReadingContent.js';
import { resolveEnergyReading, ENERGY_ART } from './d13ReadingResolve.js';
import { useD13 } from './useD13.js';
import { useChart } from '../../store/chartContext.jsx';
import { useUpgrade } from '../dashboard/UpgradeModal.jsx';

const CAP = { metal: 'Metal', earth: 'Earth', water: 'Water', wood: 'Wood', fire: 'Fire' };
const GEN = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' };
const CTL = { wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood' };
const ROLE_BADGE = {
  core: { t: 'your core', c: '' },
  catalyst: { t: '↑ your catalyst', c: 'up' },
  friction: { t: '↓ your friction', c: 'down' },
  ally: { t: 'strongest ally', c: '' },
  missing: { t: 'scarce', c: '' },
};
const GHOST_MAX = 3; // presence ≤ this reads as scarce/absent → ghost register

export default function D13EnergyCardScreen({ initialEl, onBack }) {
  const { chart, ec } = useD13();
  const { tier } = useChart();
  const { openUpgrade } = useUpgrade();
  const energies = (ec && ec.energies) || [];
  const startX = useRef(null);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const s = energies.findIndex((e) => e.el === initialEl);
    setIdx(s >= 0 ? s : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialEl, ec]);
  if (!ec || !energies.length) return null;

  const i = Math.min(idx, energies.length - 1);
  const energy = energies[i];
  const el = energy.el;
  const dmEl = ((chart && chart.dayMaster && chart.dayMaster.element) || '').toLowerCase();
  // authored dominant-ten-god reading for this energy; filler as fallback
  const authored = resolveEnergyReading(dmEl, el);
  const fb = ENERGY_CONTENT[el] || {};
  const persona = authored.persona || fb.persona || '';
  const tail = authored.tail || fb.tail || '';
  const rText = authored.r || fb.r || '';
  const xText = authored.x || fb.x || '';
  const gate = (authored.gate && authored.gate.body) ? authored.gate : (fb.gate || { label: '', body: '' });
  const art = ENERGY_ART[el] || fb.art;
  const ghost = energy.presence <= GHOST_MAX;

  let badges = (energy.roles || []).map((r) => ROLE_BADGE[r]).filter(Boolean);
  if (ghost && !badges.some((b) => b.t === 'scarce')) badges = [ROLE_BADGE.missing, ...badges];
  badges = badges.slice(0, 2);

  const verb = GEN[el] === dmEl ? 'feeds' : CTL[el] === dmEl ? 'tests' : 'meets';
  const expander = `Why ${CAP[el]} ${verb} ${CAP[dmEl] || ''} — the cycle, in your chart`;
  const xLabel = ghost ? "Borrowing what you don't own · X" : 'What to do with it · X';
  const showGate = tier !== 'seeker' && tier !== 'advisor';

  const onDown = (e) => { startX.current = e.clientX != null ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX); };
  const onUp = (e) => {
    const x = e.clientX != null ? e.clientX : (e.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientX);
    if (startX.current == null || x == null) return;
    const dx = x - startX.current; startX.current = null;
    if (dx < -45) setIdx((n) => Math.min(energies.length - 1, n + 1));
    else if (dx > 45) setIdx((n) => Math.max(0, n - 1));
  };

  return (
    <div className="d13" style={{ position: 'absolute', inset: 0 }} onPointerDown={onDown} onPointerUp={onUp}>
      <D13EnergyCard
        el={el}
        presence={energy.presence}
        art={art}
        badges={badges}
        persona={persona}
        tail={tail}
        r={rText}
        x={xText}
        gate={gate}
        ghost={ghost}
        idx={i}
        total={energies.length}
        xLabel={xLabel}
        expander={expander}
        showGate={showGate}
        onBack={onBack}
        onUnlock={() => openUpgrade(gate.label)}
      />
    </div>
  );
}
