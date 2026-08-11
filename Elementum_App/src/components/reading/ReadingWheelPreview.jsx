// Dev-only render harness for the D13 reveal journey (reachable at
// #/d13preview): the P2 dissolve, which contains P1 (the identity plate
// start frame) and resolves to P3 (the catalogue end frame). Scroll
// inside the phone to scrub the transition. Computes the real reference
// chart. Not a product screen.
import { useMemo, useState } from 'react';
import './reading.css';
import ReadingSprite from './ReadingSprite.jsx';
import RevealDissolve from './RevealDissolve.jsx';
import { calculateBaziChart, buildEnergyChart } from '../../engine/index.js';

const BLADE_IDENTITY = {
  archetype: 'The Blade',
  pinyin: 'GĒNG · YANG METAL',
  manifesto: 'Precision before intention',
  manifestoEdge: 'An edge is never given. It is forged.',
  inscription: 'You say what others soften, then quietly pay for being the one who did.',
  cast: 'CAST FROM 1995 · APRIL 29 · 17–19',
};

export default function ReadingWheelPreview() {
  const ec = useMemo(
    () => buildEnergyChart(calculateBaziChart({ year: 1995, month: 4, day: 29, hour: 18, location: 'Beijing', gender: 'male' })),
    []
  );
  const [sel, setSel] = useState(ec.energies[0].el);

  return (
    <div style={{ minHeight: '100vh', background: '#1a1815', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
      <ReadingSprite />
      <div className="reading" style={{ position: 'relative', width: 390, height: 844, borderRadius: 40, overflow: 'hidden', background: 'var(--frame)', boxShadow: '0 30px 60px rgba(40,30,20,0.45)' }}>
        <RevealDissolve
          identity={BLADE_IDENTITY}
          energies={ec.energies}
          dayMaster={ec.dayMaster}
          selected={sel}
          onSelect={setSel}
        />
      </div>
    </div>
  );
}
