// ===================================================================
// ELEMENTUM · ReadingEnergyCardScreen  (the `app-energy` route — P6/P7)
// ===================================================================
// Opens on the tapped energy and swipes ⟷ through all five in presence
// order. Derives the role badges + the cycle relation to the Day Master,
// flips to the ghost register for scarce/absent energies, and routes the
// Seeker gate into the real upgrade modal (hidden once the user is Seeker+).
//
// Swipe physics (D13 QA): a horizontal Framer carousel — all five cards
// live in one track that follows the finger, flings with inertia, and
// snaps to the nearest card. drag="x" leaves vertical (pan-y) free so each
// card's own content still scrolls. Replaces the old 45px threshold jump.
// ===================================================================

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import './reading.css';
import ReadingEnergyCard from './ReadingEnergyCard.jsx';
import { ENERGY_CONTENT } from '../../content/reading/index.js';
import { resolveEnergyReading, ENERGY_ART } from './readingResolve.js';
import { useReading } from './useReading.js';
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

// Derive a full card view-model for one energy (was inlined for the single
// active card; now built per card so the whole track can render at once).
function buildCard(energy, dmEl, tier) {
  const el = energy.el;
  const authored = resolveEnergyReading(dmEl, el, energy.leadGod);
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

  return { el, presence: energy.presence, art, badges, persona, tail, r: rText, x: xText, gate, ghost, xLabel, expander, showGate };
}

export default function ReadingEnergyCardScreen({ initialEl, onBack }) {
  const { chart, ec } = useReading();
  const { tier } = useChart();
  const { openUpgrade } = useUpgrade();
  const energies = (ec && ec.energies) || [];

  const frameRef = useRef(null);
  const [w, setW] = useState(0);
  const x = useMotionValue(0);
  const [idx, setIdx] = useState(0);
  const draggingRef = useRef(false);

  // Measure the frame width (the snap stride) and keep it current on resize.
  useLayoutEffect(() => {
    const measure = () => { if (frameRef.current) setW(frameRef.current.offsetWidth); };
    measure();
    let ro;
    if (typeof ResizeObserver !== 'undefined' && frameRef.current) {
      ro = new ResizeObserver(measure);
      ro.observe(frameRef.current);
    }
    window.addEventListener('resize', measure);
    return () => { window.removeEventListener('resize', measure); if (ro) ro.disconnect(); };
  }, []);

  // Open on the tapped energy.
  useEffect(() => {
    const s = energies.findIndex((e) => e.el === initialEl);
    setIdx(s >= 0 ? s : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialEl, ec]);

  // Snap the track to the active card on open / resize. The only *animated*
  // horizontal motion is the drag + inertia fling itself; programmatic idx
  // changes snap instantly so nothing competes with a settling fling.
  useEffect(() => {
    if (!w || draggingRef.current) return;
    x.set(-idx * w);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, w]);

  if (!ec || !energies.length) return null;

  const n = energies.length;
  const dmEl = ((chart && chart.dayMaster && chart.dayMaster.element) || '').toLowerCase();
  const cards = energies.map((e) => buildCard(e, dmEl, tier));

  const snapToNearest = (target) => {
    if (!w) return 0;
    const i = Math.max(0, Math.min(n - 1, Math.round(-target / w)));
    return -i * w;
  };

  return (
    <div ref={frameRef} className="reading" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <motion.div
        style={{ display: 'flex', width: w ? w * n : '100%', height: '100%', x }}
        drag="x"
        dragConstraints={{ left: w ? -(n - 1) * w : 0, right: 0 }}
        dragElastic={0.14}
        dragTransition={{ power: 0.26, timeConstant: 260, modifyTarget: snapToNearest, bounceStiffness: 420, bounceDamping: 44 }}
        onDragStart={() => { draggingRef.current = true; }}
        onDragEnd={() => {
          draggingRef.current = false;
          // Sync the active index to where the strip settled.
          if (w) setIdx(Math.max(0, Math.min(n - 1, Math.round(-x.get() / w))));
        }}
      >
        {cards.map((c, i) => (
          <div key={c.el} style={{ position: 'relative', flex: w ? `0 0 ${w}px` : '0 0 100%', height: '100%' }}>
            <ReadingEnergyCard
              el={c.el}
              presence={c.presence}
              art={c.art}
              badges={c.badges}
              persona={c.persona}
              tail={c.tail}
              r={c.r}
              x={c.x}
              gate={c.gate}
              ghost={c.ghost}
              idx={i}
              total={n}
              xLabel={c.xLabel}
              expander={c.expander}
              showGate={c.showGate}
              onBack={onBack}
              onUnlock={() => openUpgrade(c.gate.label)}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
