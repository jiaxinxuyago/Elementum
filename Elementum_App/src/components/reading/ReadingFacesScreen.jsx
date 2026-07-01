// ===================================================================
// ELEMENTUM · ReadingFacesScreen  (the `app-energy` route — polarity faces)
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
// existing ReadingEnergyCard. Placeholder art = the element wash (bespoke council
// character art is the B4 design deliverable). Internal Ten-God vocabulary
// never surfaces beyond the 汉字 gloss; only the persona names do.
// ===================================================================

import React, { useState } from 'react';
import './reading.css';
import ReadingEnergyCard from './ReadingEnergyCard.jsx';
import { ENERGY_CONTENT } from './d13ReadingContent.js';
import { resolveEnergyReading, ENERGY_ART, FACE_ABSTRACT, energyDomain } from './readingResolve.js';
import { TG_PERSONA } from '../../content/index.js';
import { FACE_CARD, FAMILY_BRIEF, FAMILY_CLAUSE, FAMILY_ELEMENT, PERSONA_READING, PERSONA_DOMAINS } from './d13FacesContent.js';
import { useReading } from './useReading.js';
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

// The P11/P12 reading-page role badges: the primary calibration role (with a
// personal "your"), then the DM-relative family domain (e.g. "wealth & desire").
function readingBadges(energy) {
  const roles = energy.roles || [];
  const ghost = energy.presence <= GHOST_MAX;
  const role = roles.includes('core') ? { t: 'your core', c: '' }
    : roles.includes('catalyst') ? { t: '↑ your catalyst', c: 'up' }
    : roles.includes('friction') ? { t: '↓ your friction', c: 'down' }
    : (ghost || roles.includes('missing')) ? { t: 'scarce in you', c: '' }
    : null;
  const domain = (FAMILY_BRIEF[energy.leadGod] || '').replace(/^your /, '');
  return [role, domain ? { t: domain, c: '' } : null].filter(Boolean);
}

// One Ten-God face's full reading (P12/P13 — reuses the ReadingEnergyCard anatomy).
function godCardProps(dmEl, energy, god, tier) {
  const el = energy.el;
  const authored = resolveEnergyReading(dmEl, el, god);
  const fb = ENERGY_CONTENT[el] || {};
  const ghost = energy.presence <= GHOST_MAX;
  const Element = CAP[el] || el;
  const verb = GEN[el] === dmEl ? 'feeds' : CTL[el] === dmEl ? 'tests' : 'meets';
  const persona = authored.persona || TG_PERSONA[god] || '';
  const tail = authored.tail || fb.tail || '';
  // this face's polarity + share OF ITS ELEMENT (reye: "74% of your wood")
  const facesArr = energy.faces || [];
  const face = facesArr.find((f) => f.god === god);
  const sumW = facesArr.reduce((s, f) => s + (f.weight || 0), 0) || 1;
  const polarity = (face && face.polarity) || 'yang';
  const pctOfEl = face ? Math.round(((face.weight || 0) / sumW) * 100) : 100;
  const isLead = face ? face.weight >= Math.max(...facesArr.map((f) => f.weight || 0)) : true;
  const pcm = PERSONA_DOMAINS[god] || null;
  const reading = PERSONA_READING[god] || null;
  const ledeTail = (reading && reading.ledeTail) || tail;
  const rBody = reading && reading.r && reading.r.length ? reading.r : [authored.r || fb.r || ''];
  return {
    el,
    presence: energy.presence,
    art: `/concept-arts/library/t_${el}_${polarity === 'yang' ? 1 : 2}_p.png`,
    badges: readingBadges(energy),
    eyebrow: `${Element.toUpperCase()} · ${persona.toUpperCase()}`,
    reyeText: `${Element.toUpperCase()} · ${god} · ${polarity === 'yang' ? 'YANG' : 'YIN'} · ${pctOfEl}% OF YOUR ${Element.toUpperCase()}`,
    heroTitle: `${persona} in you`,
    lede: { pre: `${Element} in you ${isLead ? 'wears' : 'also wears'} the face of `, persona, post: ledeTail ? ` — ${ledeTail}.` : '.' },
    pull: (reading && reading.pull) || authored.pull || fb.pull || '',
    persona,
    tail,
    r: rBody,
    x: (reading && reading.x) || authored.x || fb.x || '',
    gate: pcm
      ? { label: pcm.gateLabel, body: pcm.gateBody }
      : (authored.gate && authored.gate.body) ? authored.gate : (fb.gate || { label: '', body: '' }),
    domains: pcm ? { list: pcm.domains, sub: pcm.secSub } : null,
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
  const domainParts = domain.split(' — ');
  const ledeBold = FAMILY_BRIEF[energy.leadGod] || domainParts[0];
  const ledeClause = domainParts[1] || `the ${el} current running through you`;
  const fam = FAMILY_ELEMENT[energy.leadGod] || {};
  const appetite = fam.appetite || domainParts[1] || 'what this energy reaches for';
  const notAlone = fam.notAlone || `not one thing alone, but everything ${ledeBold} touches`;
  const twoFaces = (energy.faces || []).length > 1;
  const presenceClause = energy.presence >= 25 ? 'the loudest voice in it'
    : energy.presence > GHOST_MAX ? 'a real current in it' : 'a faint thread in it';
  const roleSentence = roles.includes('catalyst')
    ? `As your catalyst, it lifts you rather than drains you — the part of you that reaches for ${appetite}.`
    : roles.includes('friction')
      ? `As your friction, it presses on you more than it lifts — the part of you that wrestles with ${appetite}.`
      : roles.includes('core')
        ? `It is your core, the lens the rest are read through — the part of you that carries ${appetite}.`
        : `It runs quietly alongside the rest — the part of you that still reaches for ${appetite}.`;
  const rPara1 = `${Element} runs ${energy.presence}% of your chart — ${presenceClause}. ${roleSentence}`;
  const rPara2 = `In the language of the chart, this is ${ledeBold} — ${notAlone}.`;
  const pull = energy.presence >= 25
    ? `The loudest voice in your chart — and ${roles.includes('friction') ? 'it sharpens you by resisting' : 'that reaching is your engine, not your flaw'}.`
    : energy.presence > GHOST_MAX
      ? `A quieter current in you — ${roles.includes('friction') ? 'friction you can learn to use' : 'present, and worth listening for'}.`
      : `Barely cast, yet still yours — what's faint here is felt most when it's asked for.`;
  const xTail = twoFaces
    ? 'The two faces below are the two ways that material speaks — one reaching outward for the new, one holding and compounding what’s already yours.'
    : 'Its single face below carries how that material speaks in you.';

  return (
    <div className="reading-fill">
      <img className="ground-img" src="/assets/backgrounds/bg-energymap-02-corner-quartet.png" alt="" style={{ opacity: 0.92 }} />
      <div className="status"><span>9:41</span><span className="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>
      <div className={`screen-pad dk-${el}${ghost ? ' ghosted-card' : ''}`}>
        <div className="back-row" style={{ cursor: 'pointer' }} onClick={onBack}>
          <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-chev-l" /></svg></span>
          <span className="eyebrow">{Element.toUpperCase()} · YOUR ENERGY</span>
        </div>
        <div className={`hero${ghost ? ' ghost' : ''}`}>
          <img className="hart" src={art} alt="" />
          <div className="scrim" />
          <svg className="mk" viewBox="0 0 24 24"><use href={`#el-${el}`} /></svg>
          <div className="hc">
            <div className="reye"><svg className="elmark" viewBox="0 0 24 24"><use href={`#el-${el}`} /></svg>{Element.toUpperCase()} · {energy.presence}% OF YOUR CHART</div>
            <div className="htitle">{Element} in you</div>
          </div>
        </div>
        <div className="role-badges">
          {readingBadges(energy).map((b, i) => <span key={i} className={`rb${b.c ? ' ' + b.c : ''}`}>{b.t}</span>)}
        </div>
        <p className="read-lede">{Element} is <b>{ledeBold}</b> — {ledeClause}.</p>
        <div className="layer">
          <div className="layer-label">What this energy is · R</div>
          <p>{rPara1}</p>
          <p>{rPara2}</p>
          <span className="pull">{pull}</span>
        </div>
        <div className="layer tinted">
          <div className="layer-label">How it moves in you · X</div>
          <p>{cycle} {xTail}</p>
        </div>
        <div className="codex-link">Its faces below carry the reading →</div>
      </div>
    </div>
  );
}

export default function ReadingFacesScreen({ initialEl, onBack }) {
  const { chart, ec } = useReading();
  const { tier } = useChart();
  const { openUpgrade } = useUpgrade();
  const [view, setView] = useState('faces'); // 'faces' | 'element' | <god 汉字>
  const [faceOpen, setFaceOpen] = useState(null); // which face column is expanded (accordion)

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
      <div className="reading" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <ReadingEnergyCard {...props} idx={0} total={1} onBack={() => setView('faces')} onUnlock={() => openUpgrade(props.gate.label)} />
      </div>
    );
  }
  // ── the element (substance) reading ──
  if (view === 'element') {
    return (
      <div className="reading" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <ElementReading energy={energy} dmEl={dmEl} onBack={() => setView('faces')} />
      </div>
    );
  }

  // ── the faces page ──
  const present = faces;                                     // [{god,weight,polarity}] dominant-led
  const sumW = present.reduce((s, f) => s + (f.weight || 0), 0) || 1;
  const leadFace = present.reduce((a, b) => ((b.weight || 0) > (a.weight || 0) ? b : a), present[0]);
  // strength % = polarity-share-of-element × element-share-of-chart (README §4b)
  const pctOf = (f) => Math.round(((f.weight || 0) / sumW) * (energy.presence || 0));
  // Always TWO faces: the present one(s) dominant-led, then the uncast polarity ("not cast").
  const shown = present.map((f) => ({ god: f.god, polarity: f.polarity, present: true, pct: pctOf(f), lead: present.length > 1 && f === leadFace }));
  if (present.length === 1 && energy.absentGod) {
    shown.push({ god: energy.absentGod, polarity: present[0].polarity === 'yang' ? 'yin' : 'yang', present: false, pct: 0, lead: false });
  }
  const openGod = shown.some((s) => s.god === faceOpen) ? faceOpen : (shown[0] && shown[0].god);

  const roles = energy.roles || [];
  const ghost = energy.presence <= GHOST_MAX;
  const primaryRole = roles.includes('catalyst') ? { cls: 'cat', t: '↑ Catalyst' }
    : roles.includes('friction') ? { cls: 'fric', t: '↓ Friction' } : null;
  const secondaryRole = roles.includes('core') ? 'Core' : (ghost || roles.includes('missing')) ? 'Missing' : null;
  const sub = roles.includes('core') ? 'your core'
    : energy.presence > 24 ? 'dominant'
    : energy.presence > GHOST_MAX ? 'a minor current'
    : ghost ? 'faint but present' : 'scarce';
  const briefDomain = FAMILY_BRIEF[energy.leadGod] || Element;
  const briefClause = FAMILY_CLAUSE[energy.leadGod] || '';
  const DEEP = { metal: 'metalDeep', earth: 'earthDeep', water: 'waterDeep', wood: 'woodDeep', fire: 'fireDeep' };
  const faceArt = (f) => `/concept-arts/library/t_${el}_${f.polarity === 'yang' ? 1 : 2}_p.png`;

  return (
   <div className="reading" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
    <div className="reading-fill">
      <img className="ground-img bg-energy" src="/assets/backgrounds/bg-energymap-02-corner-quartet.png" alt="" style={{ opacity: 0.92 }} />
      <div className="status"><span>9:41</span><span className="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>
      <div className={`screen-pad dk-${el}`}>
        <div className="back-row" style={{ cursor: 'pointer' }} onClick={onBack}>
          <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-chev-l" /></svg></span>
          <span className="eyebrow">YOUR ENERGIES · {Element.toUpperCase()}</span>
        </div>

        {/* compact dominant-energy briefing */}
        <div className="fd-card">
          <div className="fd-head">
            <span className="fd-mk"><svg className="elmark" viewBox="0 0 24 24"><use href={`#el-${el}`} /></svg></span>
            <div className="fd-id">
              <div className="fd-name">{Element} <span className="zh">{ZH[el]}</span></div>
              <div className="fd-sub">{sub}</div>
            </div>
            <div className="fd-badges">
              {primaryRole && <span className={`fd-role ${primaryRole.cls}`}>{primaryRole.t}</span>}
              {secondaryRole && <span className="fd-role2">{secondaryRole}</span>}
            </div>
          </div>
          <div className="fd-brief">{Element} is <b>{briefDomain}</b>{briefClause ? ` — ${briefClause}` : ''}.</div>
          <div className="fd-foot">
            <span className="fd-pct">{energy.presence}%</span>
            <span className="sp-track fd-track">
              {ec.energies.map((e) => (
                <i key={e.el} className={e.el === el ? 'cur' : ''} style={{ width: `${e.presence}%`, background: e.el === el ? `var(--${DEEP[e.el]})` : `color-mix(in srgb, var(--${DEEP[e.el]}) 40%, var(--silkDeep))` }} />
              ))}
            </span>
            <button type="button" className="fd-arrow" aria-label={`Read the ${Element} energy`} onClick={() => setView('element')}>
              <svg viewBox="0 0 24 24"><use href="#ico-arrow-r" /></svg>
            </button>
          </div>
        </div>

        {/* Ten-God faces as an expandable column accordion */}
        <div className="faces-cap">{shown.length > 1 ? 'Its two faces' : 'Its face'}</div>
        <div className="face-shelf">
          {shown.map((f) => {
            const persona = TG_PERSONA[f.god] || '';
            const card = FACE_CARD[f.god] || { kw: [], ruleT: '', ruleB: '', teaser: '' };
            const isOpen = f.god === openGod;
            const art = faceArt(f);
            return (
              <div
                key={f.god}
                className={`gal-card dk-${el}${f.lead ? ' lead' : ''}${isOpen ? ' open' : ''}`}
                onClick={() => { if (!isOpen) setFaceOpen(f.god); }}
              >
                {/* collapsed column */}
                <div className="fs-tab">
                  <span className="fs-bg" style={{ backgroundImage: `url(${art})` }} />
                  <span className="fs-mk"><svg className="elmark" viewBox="0 0 24 24"><use href={`#el-${el}`} /></svg></span>
                  <span className="fs-label"><span className="fs-name">{persona}</span><span className="fs-dom">{card.ruleT}</span></span>
                </div>
                {/* expanded card */}
                <div className="gal-art">
                  <img src={art} alt="" />
                  <span className="fc-artmk"><svg className="elmark" viewBox="0 0 24 24"><use href={`#el-${el}`} /></svg></span>
                  {f.present
                    ? (f.lead ? <span className="fc-lead">leads</span> : (present.length === 1 ? <span className="fc-lead">present</span> : null))
                    : <span className="fc-dormant">dormant</span>}
                </div>
                <div className="gal-body">
                  <div className="gal-name">{persona}</div>
                  <div className="fc-dom">
                    <div className="fc-dom-track"><i style={{ width: `${f.pct}%` }} /></div>
                    <div className="fc-dom-lbl"><span>Of your whole chart</span><span>{f.present ? `${f.pct}%` : 'not cast'}</span></div>
                  </div>
                  <div className="gal-chips"><span className="fc-yy"><svg className="yysign" viewBox="0 0 24 24"><use href={`#yy-${f.polarity}`} /></svg> {f.polarity === 'yang' ? 'Yang' : 'Yin'}</span></div>
                  <div className="fc-kw">{card.kw.map((k) => <span key={k}>{k}</span>)}</div>
                  <div className="fc-zone"><div className="fc-zlabel">What it rules</div><div className="fc-domain"><b>{card.ruleT}</b> — {card.ruleB}</div></div>
                  <div className="fc-zone"><div className="fc-zlabel">The reading</div><div className="fc-teaser">{card.teaser}</div></div>
                  <div className="fc-foot"><button className={`fc-arrow${f.present ? '' : ' muted'}`} aria-label={`Open ${persona}`} onClick={(ev) => { ev.stopPropagation(); setView(f.god); }}><svg viewBox="0 0 24 24"><use href="#ico-arrow-r" /></svg></button></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
   </div>
  );
}
