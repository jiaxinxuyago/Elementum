// ===================================================================
// ELEMENTUM · D13FacesScreen  (the `app-energy` route — polarity faces)
// ===================================================================
// The Polarity Ten-God page (v2.1). For the tapped energy it shows:
//   1. a horizontal DOMINANT-ENERGY briefing card — element, dominance %,
//      catalyst/friction, the yin/yang register split, a one-line brief of
//      what this energy is for you → reads the element (substance) reading.
//   2. the energy's 1–2 polarity FACES as portrait character cards, side by
//      side (dominant-led) — each its own door to that Ten-God's reading.
//   When only one polarity is present, a single face card renders full-width.
//
// The faces come straight from the engine (resolveElementFaces →
// energy.faces = [{god, weight, polarity}]); the per-face reading reuses the
// existing D13EnergyCard. Placeholder art = the element wash (bespoke council
// character art is the B4 design deliverable). Internal Ten-God vocabulary
// never surfaces beyond the 汉字 gloss; only the persona names do.
// ===================================================================

import React, { useState } from 'react';
import './d13.css';
import D13EnergyCard from './D13EnergyCard.jsx';
import { ENERGY_CONTENT } from './d13ReadingContent.js';
import { resolveEnergyReading, ENERGY_ART, FACE_ABSTRACT, energyDomain } from './d13ReadingResolve.js';
import { TG_PERSONA } from '../../content/tgNames.js';
import { useD13 } from './useD13.js';
import { useChart } from '../../store/chartContext.jsx';
import { useUpgrade } from '../dashboard/UpgradeModal.jsx';

const CAP = { metal: 'Metal', earth: 'Earth', water: 'Water', wood: 'Wood', fire: 'Fire' };
const ZH = { metal: '金', earth: '土', water: '水', wood: '木', fire: '火' };
const GEN = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' };
const CTL = { wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood' };
const ROLE_BADGE = {
  core: { t: 'your core', c: '' },
  catalyst: { t: '↑ catalyst', c: 'up' },
  friction: { t: '↓ friction', c: 'down' },
  ally: { t: 'strongest ally', c: '' },
  missing: { t: 'scarce', c: '' },
};
const GHOST_MAX = 3;

function badgesFor(energy) {
  const ghost = energy.presence <= GHOST_MAX;
  let badges = (energy.roles || []).map((r) => ROLE_BADGE[r]).filter(Boolean);
  if (ghost && !badges.some((b) => b.t === 'scarce')) badges = [ROLE_BADGE.missing, ...badges];
  return badges.slice(0, 2);
}

// One Ten-God face's full reading (reuses the D13EnergyCard anatomy).
function godCardProps(dmEl, energy, god, tier) {
  const el = energy.el;
  const authored = resolveEnergyReading(dmEl, el, god);
  const fb = ENERGY_CONTENT[el] || {};
  const ghost = energy.presence <= GHOST_MAX;
  const Element = CAP[el] || el;
  const verb = GEN[el] === dmEl ? 'feeds' : CTL[el] === dmEl ? 'tests' : 'meets';
  return {
    el,
    presence: energy.presence,
    art: ENERGY_ART[el] || fb.art,
    badges: badgesFor(energy),
    persona: authored.persona || TG_PERSONA[god] || '',
    tail: authored.tail || fb.tail || '',
    r: authored.r || fb.r || '',
    x: authored.x || fb.x || '',
    gate: (authored.gate && authored.gate.body) ? authored.gate : (fb.gate || { label: '', body: '' }),
    ghost,
    xLabel: ghost ? "Borrowing what you don't own · X" : 'What to do with it · X',
    expander: `Why ${Element} ${verb} ${CAP[dmEl] || ''} — the cycle, in your chart`,
    showGate: tier !== 'seeker' && tier !== 'advisor',
  };
}

// The element (substance) reading — the dominant-energy card's destination.
// Distinct from the persona readings: it speaks the element's role in the
// chart (dominance + catalyst/friction + the cycle relation), not a persona.
function ElementReading({ energy, dmEl, onBack }) {
  const el = energy.el;
  const Element = CAP[el] || el;
  const DM = CAP[dmEl] || dmEl;
  const ghost = energy.presence <= GHOST_MAX;
  const domain = energyDomain(energy.leadGod);
  const roles = energy.roles || [];
  const roleClause = roles.includes('core')
    ? ' — it is your core, the lens the rest are read through'
    : roles.includes('catalyst')
      ? ' — and it lifts you (your catalyst)'
      : roles.includes('friction')
        ? ' — and it grinds against you (your friction)'
        : '';
  const cycle = GEN[el] === dmEl
    ? `${Element} feeds your ${DM} self — it is the resource your nature draws on.`
    : GEN[dmEl] === el
      ? `Your ${DM} self feeds ${Element} — it is what flows out of you.`
      : CTL[dmEl] === el
        ? `Your ${DM} self shapes ${Element} — it is the material your nature is for.`
        : CTL[el] === dmEl
          ? `${Element} presses on your ${DM} self — it is the force that tests you.`
          : `${Element} runs alongside your ${DM} self — it is your own register.`;
  const art = ENERGY_ART[el];
  const dots = '';
  const tint = ghost ? undefined : { background: `color-mix(in srgb, var(--${el}) 6%, transparent)`, borderColor: `color-mix(in srgb, var(--${el}) 25%, transparent)` };

  return (
    <div className="d13-fill">
      <img className="ground-img" src="/assets/backgrounds/bg-energymap-02-corner-quartet.png" alt="" style={{ opacity: 0.92 }} />
      <div className="status"><span>9:41</span><span className="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>
      <div className={`screen-pad${ghost ? ' ghosted-card' : ''}`}>
        <div className="back-row" style={{ cursor: 'pointer' }} onClick={onBack}>
          <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-chev-l" /></svg></span>
          <span className="eyebrow">{Element.toUpperCase()} · YOUR ENERGY</span>
        </div>
        <div className={`hero${ghost ? ' ghost' : ''}`}>
          <img className="hart" src={art} alt="" />
          <div className="scrim" />
          <div className="hc">
            <div className="reye"><svg className="elmark" viewBox="0 0 24 24"><use href={`#el-${el}`} /></svg>{Element.toUpperCase()} · {energy.presence}% OF YOUR CHART</div>
            <div className="htitle">{Element} in you</div>
          </div>
        </div>
        <div className="role-badges">
          {badgesFor(energy).map((b, i) => <span key={i} className={`rb${b.c ? ' ' + b.c : ''}`}>{b.t}</span>)}
        </div>
        <div className="persona-line">{Element} is <b>{domain.split(' — ')[0]}</b>{domain.includes(' — ') ? ` — ${domain.split(' — ')[1]}` : ''}.</div>
        <div className="layer">
          <div className="layer-label">What this energy is · R</div>
          <p>{Element} runs {energy.presence}% of your chart{roleClause}. It carries {domain}.</p>
        </div>
        <div className="layer" style={tint}>
          <div className="layer-label">How it moves in you · X</div>
          <p>{cycle}</p>
        </div>
        <div className="codex-link">Its faces below carry the reading →</div>
      </div>
    </div>
  );
}

export default function D13FacesScreen({ initialEl, onBack }) {
  const { chart, ec } = useD13();
  const { tier } = useChart();
  const { openUpgrade } = useUpgrade();
  const [view, setView] = useState('faces'); // 'faces' | 'element' | <god 汉字>

  if (!ec || !ec.energies.length) return null;
  const dmEl = ((chart && chart.dayMaster && chart.dayMaster.element) || '').toLowerCase();
  const energy = ec.energies.find((e) => e.el === initialEl) || ec.energies[0];
  const el = energy.el;
  const Element = CAP[el] || el;

  // engine faces; fall back to the lead god as a single face if absent
  const faces = (energy.faces && energy.faces.length)
    ? energy.faces
    : (energy.leadGod ? [{ god: energy.leadGod, weight: 1, polarity: 'yang' }] : []);

  // ── a single Ten-God's reading ──
  if (view !== 'faces' && view !== 'element') {
    const props = godCardProps(dmEl, energy, view, tier);
    return (
      <div className="d13" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <D13EnergyCard {...props} idx={0} total={1} onBack={() => setView('faces')} onUnlock={() => openUpgrade(props.gate.label)} />
      </div>
    );
  }
  // ── the element (substance) reading ──
  if (view === 'element') {
    return (
      <div className="d13" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <ElementReading energy={energy} dmEl={dmEl} onBack={() => setView('faces')} />
      </div>
    );
  }

  // ── the faces page ──
  const sum = faces.reduce((s, f) => s + (f.weight || 0), 0) || 1;
  const lead = faces.reduce((a, b) => ((b.weight || 0) > (a.weight || 0) ? b : a), faces[0]);
  const yangF = faces.find((f) => f.polarity === 'yang');
  const yinF = faces.find((f) => f.polarity === 'yin');
  const ordered = (yangF || yinF) ? [yangF, yinF].filter(Boolean) : faces; // yang left, yin right
  const two = ordered.length > 1;
  const badges = badgesFor(energy);
  const domain = energyDomain(energy.leadGod);

  return (
   <div className="d13" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
    <div className="d13-fill">
      <img className="ground-img bg-energy" src="/backgrounds/bg-energymap-01-top-band.png" alt="" />
      <div className="pagetint" style={{ background: 'radial-gradient(140% 80% at 50% -10%, rgba(139,163,184,0.10), transparent 60%)' }} />
      <div className="status"><span>9:41</span><span className="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>
      <div className="screen-pad">
        <div className="back-row" style={{ cursor: 'pointer' }} onClick={onBack}>
          <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-chev-l" /></svg></span>
          <span className="eyebrow">YOUR ENERGIES</span>
        </div>

        {/* dominant-energy briefing card */}
        <div className={`fd-card dk-${el}`}>
          <div className="fd-head">
            <span className="fd-mk"><svg className="elmark" viewBox="0 0 24 24"><use href={`#el-${el}`} /></svg></span>
            <div className="fd-id">
              <div className="fd-name">{Element} <span className="fd-zh">{ZH[el]}</span></div>
              <div className="fd-sub">{(energy.roles || []).includes('core') ? 'your core' : energy.presence > 24 ? 'dominant' : energy.presence > GHOST_MAX ? 'present' : 'scarce'} · {energy.presence}% of your chart</div>
            </div>
            <div className="fd-badges">
              {badges.map((b, i) => <span key={i} className={`rb${b.c ? ' ' + b.c : ''}`}>{b.t}</span>)}
            </div>
          </div>

          {two && (
            <div className="fd-split">
              <div className="fd-bar">
                <i className="yang" style={{ width: `${Math.round((yangF.weight / sum) * 100)}%` }} />
                <i className="yin" style={{ width: `${Math.round((yinF.weight / sum) * 100)}%` }} />
              </div>
              <div className="fd-bar-lbl">
                <span>{yangF.god} {TG_PERSONA[yangF.god]} · <b>{Math.round((yangF.weight / sum) * 100)}%</b></span>
                <span><b>{Math.round((yinF.weight / sum) * 100)}%</b> · {TG_PERSONA[yinF.god]} {yinF.god}</span>
              </div>
            </div>
          )}

          <div className="fd-brief">{domain ? `${domain.charAt(0).toUpperCase()}${domain.slice(1)}.` : `${Element} in your chart.`}</div>

          <button className="fd-readbtn" onClick={() => setView('element')}>
            Read the {Element} energy <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-arrow-r" /></svg></span>
          </button>
        </div>

        {/* the 1–2 polarity faces */}
        <div className="faces-cap">{two ? 'Its two faces' : 'Its face'}</div>
        <div className={`faces-grid${two ? '' : ' solo'}`}>
          {ordered.map((f) => {
            const persona = TG_PERSONA[f.god] || '';
            const pct = Math.round(((f.weight || 0) / sum) * 100);
            const isLead = f === lead && two;
            return (
              <button key={f.god} className={`face-card dk-${el}${isLead ? ' lead' : ''}`} onClick={() => setView(f.god)}>
                {isLead && <span className="fc-lead">leads</span>}
                <div className="fc-art">
                  <img src={ENERGY_ART[el]} alt="" />
                  <span className="fc-artmk"><svg className="elmark" viewBox="0 0 24 24"><use href={`#el-${el}`} /></svg></span>
                </div>
                <div className="fc-name">{persona}</div>
                <div className="fc-reg"><span className="fc-zh">{f.god}</span> · {f.polarity}{two ? ` · ${pct}%` : ''}</div>
                <div className="fc-abs">{FACE_ABSTRACT[f.god] || ''}</div>
                <span className="fc-read">Read <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-arrow-r" /></svg></span></span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
   </div>
  );
}
