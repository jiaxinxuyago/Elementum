// ===================================================================
// ELEMENTUM · JourneyStage — Reveal → Dissolve → Catalogue → Readings
// ===================================================================
// Pixel-verbatim implementation of the design handoff
// (Design/exports/design_handoff_reveal_reading_journey/, source of truth
// p6-journey.html #phoneP). Class names and DOM structure mirror the
// prototype so journey.css (the transplanted, .jny-scoped stylesheet)
// applies unchanged. All data binds through journeyData.js (the template
// contract); the engine owns every number.
//
// Deviations, per the integration rulings (DES_12 §6b):
//   · No prototype tab bar — the app's persistent ReadingTabBar renders
//     underneath (76px slot, same height the dock docks above).
//   · The identity-card float wires to the BUILT ShareCardOverlay
//     (the handoff stubs it and says to wire the app's share sheet).
//   · Element "Full reading" + DM CTA route to the existing app pages.
//   · First-run flag: localStorage for guests (profile flag when the
//     accounts stack lands — INF backlog).
// ===================================================================

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useChart } from '../../store/chartContext.jsx';
import { useReading } from '../reading/useReading.js';
import { STEM_CARD_DATA } from '../../content/index.js';
import { downloadCardPng, shareCard, copyText } from '../../lib/cardExport.js';
import { APP_URL } from '../../infra/index.js';
import { buildJourneyModel, buildElementScreen, buildDmCards, buildGlossary } from './journeyData.js';
import { JOURNEY_DEFS } from './journeyDefs.js';
import './journey.css';

const FIRSTRUN_KEY = 'elementum_journey_v1_done';
const CEREMONY_MS = 2800;

// The prototype gated the Naming on a localStorage first-run flag because it
// was a single page; in-app the routing already does that job — the 'reveal'
// route is only reached after onboarding (returning users land straight on
// app-reading), so the ceremony always plays here. The flag is still written
// on completion for future use (e.g. the accounts profile flag).
function markFirstRun() {
  try { localStorage.setItem(FIRSTRUN_KEY, '1'); } catch { /* private mode */ }
}

const U = (id) => `#jny-${id}`;

// tiny helpers for repeated glyphs
const Use = ({ id, className }) => (
  <svg className={className} viewBox="0 0 24 24"><use href={U(id)} /></svg>
);
const Disc = () => (
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="currentColor" /></svg>
);

export default function JourneyStage({ reveal = false, onDone, onOpenEnergy, onOpenDayMaster, onOpenCodex }) {
  const { birthData } = useChart();
  const { chart, ec, identity } = useReading();
  const [screen, setScreen] = useState('catalogue');
  const [elOpen, setElOpen] = useState(null);      // element screen target
  const [openPill, setOpenPill] = useState(null);  // shelf accordion
  const [showShare, setShowShare] = useState(false);
  const [cardStatus, setCardStatus] = useState(null);
  const cardRef = useRef(null);
  const cardStatusT = useRef(null);
  const [insOpen, setInsOpen] = useState(null);    // inscription line unfold
  const [fnOpen, setFnOpen] = useState(null);      // footnote float (cond|cat|fric)
  const [folioOpen, setFolioOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const model = useMemo(() => {
    if (!chart || !ec || !identity) return null;
    const card = STEM_CARD_DATA[chart.dayMaster.stem];
    return buildJourneyModel({ chart, ec, identity, card, birthData });
  }, [chart, ec, identity, birthData]);

  const playingReveal = reveal;

  const stageRef = useRef(null);
  const rvlRef = useRef(null);
  const swRef = useRef(null);       // catalogue scrollwrap
  const padRef = useRef(null);
  const wheelRef = useRef(null);
  const shelfRef = useRef(null);
  const inscRef = useRef(null);
  const beat4Ref = useRef(null);
  const toastT = useRef(null);

  const flash = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastT.current);
    toastT.current = setTimeout(() => setToast(null), 1800);
  }, []);

  // A1 share-rail actions — real export via the built cardExport lib
  const flashCard = useCallback((msg) => {
    setCardStatus(msg);
    clearTimeout(cardStatusT.current);
    cardStatusT.current = setTimeout(() => setCardStatus(null), 2200);
  }, []);
  const doShare = async (platform) => {
    flashCard('Rendering your card…');
    const r = await shareCard(cardRef.current, { filename: 'elementum-identity.png', title: 'Elementum', text: 'My identity on Elementum' });
    flashCard(r === 'shared' ? `Shared — finish in ${platform}` : r === 'downloaded' ? 'Image saved — post it anywhere' : r === 'cancelled' ? null : 'Could not share');
  };
  const doSave = async () => {
    const ok = await downloadCardPng(cardRef.current, 'elementum-identity.png');
    flashCard(ok ? 'Clean image saved' : 'Could not save');
  };
  const doCopy = async () => {
    const ok = await copyText(APP_URL);
    flashCard(ok ? 'Link copied' : 'Could not copy');
  };

  const swTo = useCallback((elm, off = 60) => {
    const sw = swRef.current; if (!sw || !elm) return;
    const top = elm.getBoundingClientRect().top - sw.getBoundingClientRect().top + sw.scrollTop - off;
    sw.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const expandPill = useCallback((el, scroll = true) => {
    setOpenPill(el);
    const shelf = shelfRef.current; if (!shelf) return;
    if (scroll) swTo(shelf, 120);
    const target = shelf.querySelector(`.spine[data-el="${el}"]`);
    if (target) {
      target.classList.remove('beckon');
      void target.offsetWidth;
      target.classList.add('beckon');
      setTimeout(() => target.classList.remove('beckon'), 1200);
    }
  }, [swTo]);

  const goElement = useCallback((el) => { setElOpen(el); setScreen('element'); }, []);
  const goScreen = useCallback((name) => {
    setScreen(name);
    requestAnimationFrame(() => {
      const sw = stageRef.current?.querySelector(`.jscreen[data-screen="${name}"] .scrollwrap`);
      if (sw) sw.scrollTop = 0;
    });
  }, []);

  // compass: wheel dot → cue the prescription row, then unfold the pill
  const guiding = useRef(false);
  const compassGo = useCallback((el) => {
    const root = stageRef.current; if (!root || guiding.current) return;
    const row = root.querySelector(`.ik-crow.pv-${el}`);
    root.querySelectorAll('.cue').forEach((c) => c.classList.remove('cue'));
    if (row) {
      guiding.current = true;
      row.classList.add('cue'); swTo(row, 130);
      setTimeout(() => expandPill(el), 950);
      setTimeout(() => { row.classList.remove('cue'); guiding.current = false; }, 2100);
    } else expandPill(el);
  }, [expandPill, swTo]);

  // inscription line toggle (folio carriage)
  const insToggle = useCallback((k) => {
    if (k === 'core') {
      const root = stageRef.current;
      root?.querySelectorAll('.wheel .node.is-core, .wheel .center-seal').forEach((n) => {
        n.classList.remove('pulse'); void n.offsetWidth; n.classList.add('pulse');
        setTimeout(() => n.classList.remove('pulse'), 1200);
      });
    }
    setInsOpen((cur) => (cur === k ? null : k));
  }, []);

  // ── effects: ink-in observer + dock merge + fitLastBeat ──────────
  useEffect(() => {
    if (!model || screen !== 'catalogue') return undefined;
    const sw = swRef.current; const root = stageRef.current;
    if (!sw || !root) return undefined;
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => { if (en.isIntersecting) en.target.classList.add('ink-on'); });
    }, { root: sw, threshold: 0.12 });
    root.querySelectorAll('.beat').forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, [model, screen]);

  useEffect(() => {
    if (!model || screen !== 'catalogue') return undefined;
    const sw = swRef.current; const shelf = shelfRef.current; const ph = stageRef.current?.closest('.jny');
    if (!sw || !shelf || !ph || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => {
        ph.classList.toggle('dock-merge', en.isIntersecting);
        if (!en.isIntersecting && en.boundingClientRect.top > (en.rootBounds ? en.rootBounds.bottom : 0)) {
          setOpenPill(null); // scrolled up above the tiles: refold
        }
      });
    }, { root: sw, rootMargin: '0px 0px -134px 0px', threshold: 0 });
    io.observe(shelf);
    return () => io.disconnect();
  }, [model, screen]);

  // (The prototype's fitLastBeat stretch — anchoring the Folio at scroll-end —
  // was retired when the footnote register became the page's foot: the added
  // min-height read as a dead band between the shelf hint and the footnotes.)

  // ── the Naming + Dissolve ────────────────────────────────────────
  useEffect(() => {
    if (!playingReveal || !model) return undefined;
    const rv = rvlRef.current; const stage = stageRef.current;
    const sw = swRef.current; const wheel = wheelRef.current; const pad = padRef.current;
    if (!rv || !stage || !sw || !wheel || !pad) return undefined;

    wheel.classList.add('wpre');
    pad.classList.add('pgpre');
    let playT = null; let finished = false; let p = 0; let ghost = null; let gs = null; let ge = null;
    const cseal = wheel.querySelector('.center-seal');
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ceremony starts immediately (the stage IS on screen in-app)
    rv.classList.add('play'); playT = Date.now();
    const ceremonyDone = () => rv.classList.contains('done') || (playT && Date.now() - playT > CEREMONY_MS);

    const centerWheel = () => {
      const wr = wheel.getBoundingClientRect(); const sr = sw.getBoundingClientRect();
      const top = wr.top - sr.top + sw.scrollTop - ((sw.clientHeight - wr.height) / 2);
      sw.style.scrollBehavior = 'auto'; sw.scrollTop = Math.max(0, top); sw.style.scrollBehavior = '';
    };
    const mkGhost = () => {
      if (ghost || !cseal) return;
      centerWheel();
      const plate = rv.querySelector('.rvl-plate');
      const st = stage.getBoundingClientRect(); const a = plate.getBoundingClientRect(); const b = cseal.getBoundingClientRect();
      gs = { x: a.left - st.left, y: a.top - st.top, w: a.width };
      ge = { x: b.left - st.left, y: b.top - st.top, w: b.width };
      ghost = document.createElement('div');
      ghost.className = 'gseal gimg';
      ghost.style.width = `${a.width}px`; ghost.style.height = `${a.height}px`;
      ghost.style.transformOrigin = 'top left';
      ghost.style.backgroundImage = `url('/concept-arts/stems/proc/${model.stemId}-${model.core.el}.png')`;
      stage.appendChild(ghost);
      plate.style.visibility = 'hidden';
    };
    const setP = (v) => {
      p = Math.max(0, Math.min(1, v));
      rv.style.transform = `translateY(${-p * 100}%)`;
      if (p > 0.02) mkGhost();
      if (ghost) {
        const e = p * p * (3 - 2 * p);
        const x = gs.x + (ge.x - gs.x) * e; const y = gs.y + (ge.y - gs.y) * e;
        const s = 1 + ((ge.w / gs.w) - 1) * e;
        ghost.style.transform = `translate(${x}px,${y}px) scale(${s})`;
        ghost.style.opacity = p < 0.02 ? '0' : '1';
      }
    };
    const spring = (to, done) => {
      const from = p; let st = null;
      const step = (ts) => {
        if (st === null) st = ts;
        const k = Math.min(1, (ts - st) / 420);
        setP(from + (to - from) * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step); else if (done) done();
      };
      requestAnimationFrame(step);
    };
    const finish = () => {
      if (finished) return; finished = true;
      markFirstRun();
      spring(1, () => {
        rv.style.display = 'none';
        if (ghost) { ghost.remove(); ghost = null; }
        wheel.classList.remove('wpre');
        model.introOrder.forEach((el, i) => {
          const n = wheel.querySelector(`.node[data-el="${el}"]`);
          if (n) n.style.setProperty('--nd', `${180 + i * 380}ms`);
        });
        wheel.classList.add('wintro');
        setTimeout(() => wheel.classList.remove('wintro'), 3300);
        const emerge = reduce ? 200 : 2460;
        setTimeout(() => {
          pad.classList.add('pgin'); pad.classList.remove('pgpre');
          setTimeout(() => pad.classList.remove('pgin'), 1600);
        }, emerge);
        setTimeout(() => {
          sw.scrollTo({ top: 0, behavior: 'smooth' });
          if (onDone) setTimeout(onDone, 900);
        }, reduce ? 250 : 2500);
      });
    };

    const onClick = (e) => {
      if (e.target.closest('.rvl-swipe')) { finish(); return; }
      if (!ceremonyDone()) rv.classList.add('done'); else finish();
    };
    let dy = null;
    const onDown = (e) => { dy = e.clientY; rv.setPointerCapture && rv.setPointerCapture(e.pointerId); };
    const onMove = (e) => { if (dy === null || finished) return; const d = dy - e.clientY; if (d > 6) setP((d - 6) / 360); };
    const onUp = () => { if (dy === null || finished) { dy = null; return; } if (p > 0.3) finish(); else if (p > 0.01) spring(0); dy = null; };
    const onCancel = () => { if (!finished && p > 0.01) spring(0); dy = null; };
    rv.addEventListener('click', onClick);
    rv.addEventListener('pointerdown', onDown);
    rv.addEventListener('pointermove', onMove);
    rv.addEventListener('pointerup', onUp);
    rv.addEventListener('pointercancel', onCancel);
    return () => {
      rv.removeEventListener('click', onClick);
      rv.removeEventListener('pointerdown', onDown);
      rv.removeEventListener('pointermove', onMove);
      rv.removeEventListener('pointerup', onUp);
      rv.removeEventListener('pointercancel', onCancel);
      if (ghost) ghost.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playingReveal, model]);

  if (!model) return null;

  const m = model;
  const towers = [...m.els].sort((a, b) => b.presence - a.presence);
  const pMax = towers[0]?.presence || 1;
  const sealSrc = `/concept-arts/stems/${m.stemId}.png`;
  const paintSrc = `/concept-arts/stems/proc/${m.stemId}-${m.core.el}.png`;
  // Only 庚 has true seal-chip art; the other stems' raw pngs are full
  // paintings — wheel centers use the proc medallions for them instead.
  const isBladeArt = m.stemId === 'geng';
  const centerCls = isBladeArt ? 'center-seal a-seal' : 'center-seal ms';
  const centerSrc = isBladeArt ? sealSrc : paintSrc;

  const track = (cur) => (
    <span className="sp-track">
      {towers.map((t) => (
        t.presence > 0 ? (
          <i key={t.el} className={t.el === cur ? 'cur' : undefined}
            style={{ width: `${t.presence}%`, background: t.el === cur ? `var(--${t.el}Deep)` : `color-mix(in srgb, var(--${t.el}Deep) 40%, var(--silkDeep))` }} />
        ) : (
          <i key={t.el} className={t.el === cur ? 'cur gh' : 'gh'}
            style={{ width: '2%', ...(t.el === cur ? { background: `var(--${t.el}Deep)` } : {}) }} />
        )
      ))}
    </span>
  );


  const elScreen = elOpen ? buildElementScreen(m, elOpen) : null;
  const dmCards = buildDmCards(m);
  const glossary = buildGlossary(m);
  const condIcon = m.condition === 'Underfueled' ? 'ic-receptive' : m.condition === 'Balanced' ? 'ic-balanced' : 'ic-charged';
  const fnNote = fnOpen ? glossary[fnOpen] : null;

  return (
    <div className="jny jphone" data-css="phoneP" data-grand="v1" data-ca="dock" data-journey="compass" data-art="bloom">
      <span style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${JOURNEY_DEFS}</defs></svg>` }} />
      <div className="scr2">
        <div className="status2"><span>9:41</span><span className="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>
        <div className="jstage" ref={stageRef}>

          {playingReveal && (
            <div className="rvl-overlay" ref={rvlRef}>
              <div className="rvl-blank" />
              <img className="rvl-bgtop" src="/backgrounds/bg-reveal-01-distant-peaks.png" alt="" />
              <img className="rvl-bgbot" src="/backgrounds/bg-reveal-02-floating-island.png" alt="" />
              <div className="rvl-fog" />
              <div className="rvl-inner">
                <span className="rvl-ey">YOU ARE</span>
                <div className="rvl-plate" aria-label={`${m.stem} — ${m.archetype}, painted`}>
                  <span className="rvl-wash" style={{ backgroundImage: `url('${paintSrc}')` }} />
                  <span className="rvl-img" style={{ backgroundImage: `url('${paintSrc}')` }} />
                </div>
                <h2 className="rvl-name">{m.archetype}</h2>
                <p className="rvl-kick">{m.manifesto.split(' — ')[0]}</p>
                <span className="rvl-rule" />
                <p className="rvl-mani">{m.inscription}</p>
                <div className="rvl-cast">{m.cast}<span>— ELEMENTUM —</span></div>
              </div>
              <button className="rvl-swipe" aria-label="Continue to your energies — swipe up or tap"><Use id="ico-chev-r" /><span>Swipe up</span></button>
            </div>
          )}

          {/* ── the catalogue ── */}
          <div className={`jscreen${screen === 'catalogue' ? ' active' : ''}`} data-screen="catalogue">
            <img className="ground-img2 bg-energy2" src="/backgrounds/bg-energymap-01-top-band.png" alt="" />
            <div className="pagetint2" />
            <div className="eltint" />
            <div className="pghead"><span className="pg-eyebrow">YOUR READING</span></div>
            <div className="scrollwrap" ref={swRef}>
              <div className="padv2" ref={padRef}>

                <div className="beat" data-beat="1">
                  <div className="idhero" data-hero="chop" data-css="idheroP">
                    <div className="hero-chop">
                      <div className="hc-top">
                        <span className="hero-seal"><img src={sealSrc} alt={`${m.stem} ${m.archetype}`} /></span>
                        <div><span className="kick">You are</span><span className="hero-arch">{m.archetype}</span></div>
                        <button className="sharebtn iconly" style={{ marginLeft: 'auto', alignSelf: 'flex-start' }} aria-label="Share your identity card" onClick={() => setShowShare(true)}><Use id="ico-share" /></button>
                      </div>
                      <div className="hc-man"><span className="redrule" /><p className="mani">{m.manifesto}</p></div>
                      <div className="hc-foot">
                        <div className="kws">{m.chips.map((k) => <span className="kw" key={k}>{k}</span>)}</div>
                        <button className="readcirc" aria-label="Read your Day Master" onClick={() => goScreen('daymaster')}><Use id="ico-arrow-r" /></button>
                      </div>
                    </div>
                  </div>
                  <button className="jbridge" onClick={() => swTo(stageRef.current?.querySelector('.beat[data-beat="2"]'), 56)}><span>What does your energy look like?</span><Use id="ar-down" /></button>
                </div>

                <div className="beat" data-beat="2">
                  <span className="sec-eyebrow">YOUR FIVE ENERGIES</span>
                  <div className="wheel" ref={wheelRef} aria-label="Dominance wheel — tap any energy to open its reading">
                    <button className={centerCls} style={{ backgroundImage: `url('${centerSrc}')` }} aria-label="The Day Master seal — open your identity card" onClick={() => setShowShare(true)} />
                    {m.els.map((r) => (
                      <button key={r.el} data-el={r.el}
                        className={`node n-${r.el}${r.isCore ? ' is-core' : ''}`}
                        style={{ width: r.size, height: r.size, left: r.seat.left, top: r.seat.top }}
                        aria-label={`${r.name}, ${r.presence} percent — ${r.isCore ? 'your core' : r.role}`}
                        onClick={() => compassGo(r.el)}>
                        <Use id={`el-${r.el}`} className="elmark" />
                        <span className="pc">{r.presence}%</span>
                        {r.isCore
                          ? <span className="pip who"><Disc /></span>
                          : r.role === 'friction'
                            ? <span className="pip down"><Use id="ar-down" /></span>
                            : <span className={`pip up${r.major ? ' major' : ''}`}><Use id="ar-up" /></span>}
                      </button>
                    ))}
                  </div>

                  <div className={`insc${folioOpen ? ' folio-open' : ''}`} ref={inscRef} data-ins="folio" data-css="inscP">
                    <div className="ins-fold" role="button" aria-expanded={folioOpen} onClick={() => { setFolioOpen((v) => { if (v) setInsOpen(null); return !v; }); }}>
                      <span className="ik-chip"><Use id={`el-${m.core.el}`} className="elmark" /><span className={`ik-plate a-${m.core.el}`} /></span>
                      <span className="fold-t">
                        <span className="fl1">Your Core Energy is <b>{m.core.name}</b></span>
                        <span className="fl2">It runs <span className="role-pill cond" role="button" tabIndex={0} onClick={(e) => { e.stopPropagation(); setFnOpen('cond'); }}><Use id={condIcon} />{m.condition}</span> — {m.foldVerdict}</span>
                      </span>
                      <button className="ins-q" aria-label="Open the Codex — the deeper reading of these terms" onClick={(e) => { e.stopPropagation(); if (onOpenCodex) onOpenCodex(); else flash('The Codex — deeper knowledge'); }}>?</button>
                    </div>
                    <div className="ins-para">
                      <button className="ins-line" aria-expanded={insOpen === 'core'} onClick={() => insToggle('core')}>
                        <span className="ins-lead"><svg viewBox="0 0 24 24" className="core"><use href={U(`el-${m.core.el}`)} /></svg></span>
                        <span className="ins-t">Your core is <svg className="ins-ic core" viewBox="0 0 24 24" aria-hidden="true"><use href={U(`el-${m.core.el}`)} /></svg><b className="mw">{m.core.name}</b> — the <span className="bw">{m.archetype.replace(/^The /, '')}</span>&rsquo;s own element.</span>
                        <span className="ins-s" aria-hidden="true">Core · {m.core.name}</span>
                      </button>
                      {insOpen === 'core' && <div className="ins-more"><span className="cor-v">The seal at the wheel&rsquo;s center is {m.core.name}&rsquo;s sign — the day master you were cast with; its share leads the wheel.</span></div>}
                      <button className="ins-line" aria-expanded={insOpen === 'cond'} onClick={() => insToggle('cond')}>
                        <span className="ins-lead"><Use id={m.condition === 'Underfueled' ? 'ic-receptive' : m.condition === 'Balanced' ? 'ic-balanced' : 'ic-charged'} /></span>
                        <span className="ins-t">It runs <span className="role-pill cond"><Use id={m.condition === 'Underfueled' ? 'ic-receptive' : m.condition === 'Balanced' ? 'ic-balanced' : 'ic-charged'} />{m.condition}</span> — {m.condTail}</span>
                        <span className="ins-s" aria-hidden="true">Runs {m.condition}</span>
                      </button>
                      {insOpen === 'cond' && <div className="ins-more"><span className="cor-v">{m.defline[m.condition]}</span></div>}
                      {m.apprLine && (
                        <>
                          <button className="ins-line" aria-expanded={insOpen === 'appr'} onClick={(e) => {
                            if (e.target.closest('.ins-dn')) { swTo(stageRef.current?.querySelector('.beat[data-beat="3"]'), 56); return; }
                            insToggle('appr');
                          }}>
                            <span className="ins-lead"><Use id={m.approach === 'Refill' ? 'ic-fuel' : 'ic-channel'} /></span>
                            <span className="ins-t">So <svg className="ins-ic" viewBox="0 0 24 24" aria-hidden="true"><use href={U(m.approach === 'Refill' ? 'ic-fuel' : 'ic-channel')} /></svg><b>{m.apprLine.verb}</b> it — {m.apprLine.tail}<Use id="ar-down" className="ins-dn" /></span>
                            <span className="ins-s" aria-hidden="true">{m.apprLine.verb} it ↓</span>
                          </button>
                          {insOpen === 'appr' && <div className="ins-more"><span className="cor-v">{m.defline[m.approach]}</span></div>}
                        </>
                      )}
                    </div>
                  </div>

                  <button className="jbridge" onClick={() => swTo(stageRef.current?.querySelector('.beat[data-beat="3"]'), 56)}><span>So what do you need — and what don&rsquo;t you?</span><Use id="ar-down" /></button>
                </div>

                <div className="beat" data-beat="3">
                  {m.balanced ? (
                    <div className="rxvars" data-rx="columns">
                      <div className="vx-pair" data-rxpane="columns">
                        <div className="vx-box" style={{ flex: 1 }}>
                          <div className="vx-ey"><span>BALANCED</span><span className="role-pill cond"><Use id="ic-balanced" />Balanced</span></div>
                          <p className="body2" style={{ margin: '4px 2px 6px' }}>Balanced — nothing to force; keep the mix.</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rxvars" data-rx="columns">
                      <div className="vx-pair" data-rxpane="columns">
                        <div className="vx-box">
                          <div className="vx-ey"><span>SEEK THESE</span><span className="role-pill cat" role="button" tabIndex={0} onClick={() => setFnOpen('cat')}><Use id="ar-up" />Catalyst</span></div>
                          {m.seek.map((r) => (
                            <button key={r.el} className={`ik-crow pv-${r.el}`} aria-label={`${r.name} — open its reading`} onClick={() => expandPill(r.el)}>
                              <span className={`ik-chip${r.missing ? ' ghosted' : ''}`}><Use id={`el-${r.el}`} className="elmark" /><span className={`ik-plate a-${r.el}`} /></span>
                              <span className="crmain"><span className="crline"><span className="ik-nm">{r.name}</span><span className="ik-pct">{r.presence}%</span></span><span className="ik-kw">your {r.relation}</span></span>
                            </button>
                          ))}
                        </div>
                        <div className="vx-box">
                          <div className="vx-ey"><span>SKIP THESE</span><span className="role-pill fric" role="button" tabIndex={0} onClick={() => setFnOpen('fric')}><Use id="ar-down" />Friction</span></div>
                          {m.skip.map((r) => (
                            <button key={r.el} className={`ik-crow pv-${r.el}`} aria-label={`${r.name} — open its reading`} onClick={() => expandPill(r.el)}>
                              <span className="ik-chip"><Use id={`el-${r.el}`} className="elmark" /><span className={`ik-plate a-${r.el}`} /></span>
                              <span className="crmain"><span className="crline"><span className="ik-nm">{r.name}</span><span className="ik-pct">{r.presence}%</span></span><span className="ik-kw">your {r.relation}</span></span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <button className="jbridge" onClick={() => swTo(beat4Ref.current, 56)}><span>Read what each energy says</span><Use id="ar-down" /></button>
                </div>

                <div className="beat" data-beat="4" ref={beat4Ref}>
                  <span className="sec-eyebrow">THE FIVE ENERGIES · TAP A PILL TO OPEN</span>
                  <div className={`shelf${openPill ? ' has-open' : ''}`} data-shelf="towers" ref={shelfRef} aria-label="Five energies — dominance pills">
                    {towers.map((r) => (
                      <div key={r.el} data-el={r.el} role="button" tabIndex={0}
                        className={`spine dk-${r.el}${r.missing ? ' ghosted' : ''}${openPill === r.el ? ' open' : ''}`}
                        aria-label={`${r.name.toUpperCase()} · ${r.presence}% · ${r.isCore ? 'CORE' : r.role.toUpperCase()} · ${r.keyword}`}
                        onClick={(e) => { if (e.target.closest('.sp-read')) return; setOpenPill(r.el); }}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenPill(r.el); } }}>
                        <span className="sp-fill" style={{ height: `${Math.round((r.presence / pMax) * 84)}%`, '--pw': `${r.presence}%` }} /><span className="sp-notch" />
                        <span className="sp-col"><span className="sp-noun">{r.name}</span><span className="sp-kw">{r.relation}</span><span className="sp-mk"><Use id={`el-${r.el}`} className="elmark" /></span><span className="sp-pc">{r.presence}%</span><span className="sp-hint-ic" aria-hidden="true"><Use id="ico-chev-r" /></span></span>
                        <span className="sp-open">
                          <span className={`sp-art a-${r.el}`}><span className="bfade" /></span>
                          <span className="sp-txt">
                            <span className="sp-erow"><span className="sp-seal"><Use id={`el-${r.el}`} className="elmark" /></span><span className="sp-ey">{r.name.toUpperCase()}{r.missing ? <i className="sp-miss"> · Missing</i> : null}</span></span>
                            <span className="sp-barrow">{track(r.el)}<span className="sp-pct">{r.presence}%</span></span>
                            <span className="sp-title">{r.title}</span>
                            <span className="sp-diag">{r.familyLine}</span>
                            <span className="sp-diagnosis">
                              <span className="sp-dx">Your {r.name} is <b className="cond">{r.dx.condition}</b>{r.dx.remedy ? <> — <b className="appr">{r.dx.remedy}</b> it.</> : ' — keep the mix.'}</span>
                              <span className="sp-chips">
                                {r.chips.map((c) => (
                                  <span key={c.k} className={`role-pill ${c.k}${c.major ? ' major' : ''}`}>
                                    {c.k === 'cat' && <Use id="ar-up" />}{c.k === 'fric' && <Use id="ar-down" />}{c.label}
                                  </span>
                                ))}
                              </span>
                            </span>
                            <span className={`sp-adj ${r.adjPole}`}>{r.adj.map((a) => <i key={a}>{a}</i>)}</span>
                          </span>
                          <button className="sp-read" aria-label={`Open ${r.el} reading`} onClick={() => goElement(r.el)}><Use id="ico-arrow-r" /></button>
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="shelf-hint"><span className="uico"><Use id="ico-arrow-r" /></span>Tap any pill to unfold it — the dark circle inside opens its full reading</div>
                </div>

                <div className="ca-dock" aria-label="Your readings — open any energy">
                  {towers.map((r) => (
                    <button key={r.el} className={`ca-chip dk-${r.el}${r.missing ? ' ghost' : ''}`} aria-label={`${r.name} — your ${r.relation}, ${r.presence}%; unfolds its pill`} onClick={() => expandPill(r.el)}>
                      <span className="ca-fill" style={{ height: `${Math.round((r.presence / pMax) * 84)}%` }} />
                      <Use id={`el-${r.el}`} className="elmark" />
                      <span className="ca-kw">{r.name}</span>
                    </button>
                  ))}
                </div>

                {/* wordsnote (A2) — the taught words close the page; each opens the glossary sheet */}
                <div className="wordsnote" aria-label="What these words mean">
                  <span className="wn-ey">The words on this page · tap one</span>
                  <div className="wn-chips">
                    <button className="role-pill core" onClick={() => setFnOpen('core')}>Core</button>
                    <button className="role-pill cond" onClick={() => setFnOpen('cond')}><Use id={condIcon} />{m.condition}</button>
                    <button className="role-pill cat" onClick={() => setFnOpen('cat')}><Use id="ar-up" />Catalyst</button>
                    <button className="role-pill fric" onClick={() => setFnOpen('fric')}><Use id="ar-down" />Friction</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── day master ── */}
          <div className={`jscreen${screen === 'daymaster' ? ' active' : ''}`} data-screen="daymaster">
            <div className="plateimg a-plate-rice" />
            <div className="eltint" />
            <button className="backrow" aria-label="Back to Readings" onClick={() => goScreen('catalogue')}><span className="bico"><Use id="ico-chev-l" /></span><span className="bl">YOUR READING · DAY MASTER</span></button>
            <div className="scrollwrap"><div className="padv2">
              <div className="dm-hero">
                <span className="dm-seal"><img src={sealSrc} alt={`${m.stem} ${m.archetype}`} /></span>
                <span className="kick" style={{ fontFamily: 'Cinzel,Georgia,serif', fontSize: 9, letterSpacing: '2.5px', color: 'var(--bronzeDark)', textTransform: 'uppercase' }}>Your day master</span>
                <span className="dm-arch">{m.archetype}</span>
                <span className="dm-pin">{m.pinyin}</span>
                <span className="chip-core">Core · {m.core.presence}%</span>
                <p className="dm-man">{m.manifesto}</p>
              </div>
              <div className="cardstock"><span className="laylab">WHO YOU ARE</span><p className="serifline" style={{ margin: 0 }}>{STEM_CARD_DATA[m.stem]?.identity?.yourNature?.desc || m.inscription}</p></div>
              {dmCards.map((c) => (
                <div key={c.lab} className="cardstock" style={{ borderLeft: `3px solid var(--${c.kind})` }}>
                  <span className="laylab" style={{ color: `var(--${c.kind})` }}>{c.lab}</span>
                  <p className="body2" style={{ margin: 0 }}>{c.body}</p>
                </div>
              ))}
              <button className="pill-cta" style={{ marginTop: 2 }} onClick={() => onOpenDayMaster && onOpenDayMaster()}>The full Day Master reading <Use id="ico-arrow-r" /></button>
            </div></div>
          </div>

          {/* ── element reading ── */}
          {elScreen && (
            <div className={`jscreen${screen === 'element' ? ' active' : ''}`} data-screen="element">
              <div className="plateimg a-plate-rice" /><div className="eltint" />
              <button className="backrow" aria-label="Back to Readings" onClick={() => goScreen('catalogue')}>
                <span className="bico"><Use id="ico-chev-l" /></span>
                <span className="bl el-back">YOUR ENERGIES · {elScreen.name}</span>
              </button>
              <div className="scrollwrap"><div className="padv2">
                <div className="hero2" style={{ height: 156 }}>
                  <span className={`hart el-art ${elScreen.cls}`} /><span className="scrim" /><span className="hair el-hair" style={{ background: elScreen.pig }} />
                  <span className="bighz el-hz" aria-hidden="true">{elScreen.hz}</span>
                  <span className="hrole"><span className={`rchip el-chip ${elScreen.roleKind === 'who' ? 'corec' : elScreen.roleKind}`}>{elScreen.roleKind === 'up' && <Use id="ar-up" />}{elScreen.roleKind === 'down' && <Use id="ar-down" />}{elScreen.roleTx}</span></span>
                  <span className="hcontent">
                    <span className="reye el-reye"><Use id={`el-${elScreen.el}`} /> {elScreen.reye}</span>
                    <span className="htitle el-title">{elScreen.title}</span><span className="hsub el-tag">{elScreen.tag}</span>
                  </span>
                </div>
                <div className="cardstock el-verdcard" style={{ borderLeft: `3px solid ${elScreen.deep.startsWith('var') ? `var(--${elScreen.el}Deep)` : elScreen.deep}` }}>
                  <span className="laylab el-verdlab" style={{ fontWeight: 600, color: `var(--${elScreen.el}Deep)` }}>{elScreen.verdLab}</span>
                  <p className="body2 el-verdict" style={{ margin: 0 }}>{elScreen.verdict}</p>
                </div>
                <div className="cardstock"><span className="laylab">WHAT IT MEANS</span><p className="serifline el-mean" style={{ margin: 0 }}>{elScreen.mean}</p></div>
                <div className="cardstock"><span className="laylab">WHAT IT SAYS ABOUT YOU</span>
                  <p className="serifline el-face" style={{ margin: '0 0 5px', fontSize: 14.5 }}>{elScreen.face}</p>
                  <span className="saysline el-kw">{elScreen.kw}</span>
                  <p className="body2 el-teaser" style={{ margin: '7px 0 0', fontSize: 12.5 }}>{elScreen.teaser}</p>
                </div>
                <button className="pill-cta" style={{ marginTop: 2 }} onClick={() => onOpenEnergy && onOpenEnergy(elOpen)}>Full reading <Use id="ico-arrow-r" /></button>
              </div></div>
            </div>
          )}
        </div>
        <div className={`wip${toast ? ' show' : ''}`}>{toast || ''}</div>
      </div>
      {/* A2 · glossary sheet — root-level so it tops every screen layer */}
      {fnNote && (
        <div className="wordpop open" role="presentation">
          <div className="wp-scrim" onClick={() => setFnOpen(null)} />
          <div className={`wp-sheet ${fnNote.tint}`} role="dialog" aria-label="What this word means">
            <div className="wp-band">
              <span className="wp-wm">{fnNote.icon === 'cond' ? <Use id={condIcon} /> : fnNote.icon ? <Use id={fnNote.icon} /> : <Use id={`el-${m.core.el}`} />}</span>
              <button className="wp-x" aria-label="Close" onClick={() => setFnOpen(null)}><Use id="ico-close" /></button>
              <span className="wp-ey">In your reading</span>
              <div className="wp-chipwrap">
                <span className={`role-pill ${fnNote.pill}`}>
                  {fnNote.icon === 'cond' && <Use id={condIcon} />}
                  {fnNote.icon === 'ar-up' && <Use id="ar-up" />}
                  {fnNote.icon === 'ar-down' && <Use id="ar-down" />}
                  {fnNote.label}
                </span>
              </div>
            </div>
            <div className="wp-inner">
              <p className="wp-body">{fnNote.body}</p>
              <button className="wp-codex" onClick={() => { setFnOpen(null); if (onOpenCodex) onOpenCodex(); }}>
                <span className="wp-cx-ic"><Use id="ic-codex" /></span>
                <span className="wp-cx-tx"><b>Deeper in the Codex</b><small>the full reading of this word</small></span>
                <span className="wp-cx-go"><Use id="ico-arrow-r" /></span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* A1 · the locked Tiles identity card + share rail */}
      {showShare && (
        <div className="scov open" role="dialog" aria-modal="true" aria-label="Your identity card">
          <div className="scrim2" onClick={() => setShowShare(false)} />
          <div className="scbody">
            <span className="sc-hint">Your identity card</span>
            <button className="scclose" aria-label="Close" onClick={() => setShowShare(false)}><Use id="ico-close" /></button>
            <div className="share-card" data-var="tiles" ref={cardRef}>
              <div className="scv" />
              <div className="scin">
                <div className="scey">ELEMENTUM · YOUR IDENTITY</div>
                <div className="scwheel">
                  <div className="wheel">
                    <span className={centerCls} style={{ backgroundImage: `url('${centerSrc}')` }} aria-hidden="true" />
                    {m.els.map((r) => (
                      <span key={r.el} className={`node n-${r.el}`} style={{ width: r.size, height: r.size, left: r.seat.left, top: r.seat.top }} aria-hidden="true">
                        <Use id={`el-${r.el}`} className="elmark" />
                        <span className="pc">{r.presence}%</span>
                        {r.isCore ? <span className="pip who"><Disc /></span> : r.role === 'friction' ? <span className="pip down"><Use id="ar-down" /></span> : <span className={`pip up${r.major ? ' major' : ''}`}><Use id="ar-up" /></span>}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="scarch">{m.archetype}</div>
                <div className="scman">{m.manifesto}</div>
                <div className="sckws">{m.chips.map((k) => <span className="sckw" key={k}>{k}</span>)}</div>
                <div className="scbp">
                  <div className="sc-coreline">
                    <span className="sc-mk" style={{ color: `var(--${m.core.el}Deep)` }}><svg viewBox="0 0 24 24" fill="currentColor"><use href={U(`el-${m.core.el}`)} /></svg></span>
                    <span className="sc-ct"><b>{m.core.name}</b><small>is your Core</small></span>
                    <span className="sc-pill core">{m.condition}</span>
                  </div>
                  <div className="tl-cols">
                    <div className="tl-col">
                      <div className="tl-h seek"><Use id="ar-up" /><span>Catalyst</span></div>
                      <div className="vrow">
                        {m.seek.map((r) => (
                          <div className="vcol" key={r.el}>
                            <span className="v-pc">{r.presence}%</span>
                            <span className="v-bar"><i style={{ height: `${Math.round((r.presence / pMax) * 100)}%`, background: `var(--${r.el}Deep)` }} /></span>
                            <span className="v-mk" style={{ color: `var(--${r.el}Deep)` }}><svg viewBox="0 0 24 24" fill="currentColor"><use href={U(`el-${r.el}`)} /></svg></span>
                            <span className="v-el">{r.name}</span>
                            <span className="v-noun">{r.relation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="tl-col">
                      <div className="tl-h skip"><Use id="ar-down" /><span>Friction</span></div>
                      <div className="vrow">
                        {m.skip.map((r) => (
                          <div className="vcol" key={r.el}>
                            <span className="v-pc">{r.presence}%</span>
                            <span className="v-bar"><i style={{ height: `${Math.round((r.presence / pMax) * 100)}%`, background: `var(--${r.el}Deep)` }} /></span>
                            <span className="v-mk" style={{ color: `var(--${r.el}Deep)` }}><svg viewBox="0 0 24 24" fill="currentColor"><use href={U(`el-${r.el}`)} /></svg></span>
                            <span className="v-el">{r.name}</span>
                            <span className="v-noun">{r.relation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sctray">
              <button className="scp ig" aria-label="Share to Instagram" onClick={() => doShare('Instagram')}><span className="ico"><IgGlyph /></span><span className="lbl">Instagram</span></button>
              <button className="scp tt" aria-label="Share to TikTok" onClick={() => doShare('TikTok')}><span className="ico"><TtGlyph /></span><span className="lbl">TikTok</span></button>
              <button className="scp xx" aria-label="Share to X" onClick={() => doShare('X')}><span className="ico"><XGlyph /></span><span className="lbl">X</span></button>
              <span className="st-div" />
              <button className="scp util" aria-label="Save image" onClick={doSave}><span className="ico"><Use id="ic-save" /></span></button>
              <button className="scp util" aria-label="Copy link" onClick={doCopy}><span className="ico"><Use id="ic-link" /></span></button>
            </div>
            <div className="scstatus" aria-live="polite">{cardStatus || ' '}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── share-rail platform glyphs (share-flow verbatim) ────────────────
const IgGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" /><circle cx="12" cy="12" r="4.1" /><circle cx="17.3" cy="6.7" r="1.2" fill="#fff" stroke="none" /></svg>
);
const TtGlyph = () => (
  <svg viewBox="0 0 24 24" fill="#fff"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
);
const XGlyph = () => (
  <svg viewBox="0 0 24 24" fill="#fff"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932L18.901 1.153Zm-1.293 19.494h2.039L6.486 3.24H4.298L17.608 20.647Z" /></svg>
);
