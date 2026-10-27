// ===================================================================
// ELEMENTUM · JourneyStage — Reveal → Dissolve → Catalogue → Readings
// ===================================================================
// Pixel-verbatim implementation of the design handoff
// (Design/Library/Elementum Design Handoff_JourneyCatalogue/, source of truth
// p6-journey.html #phoneP). Class names and DOM structure mirror the
// prototype so journey.css (the transplanted, .jny-scoped stylesheet)
// applies unchanged. All data binds through journeyData.js (the template
// contract); the engine owns every number.
//
// Deviations, per the integration rulings (REA_02 §6b):
//   · No prototype tab bar — the app's persistent ReadingTabBar renders
//     underneath (76px slot, same height the dock docks above).
//   · The identity-card float uses a share overlay written inline below —
//     it duplicates components/share/ShareCardOverlay.jsx, it does not reuse it.
//   · Element "Full reading" + DM CTA route to the existing app pages.
//   · First-run flag: localStorage for guests (profile flag when the
//     accounts stack lands — INF backlog).
// ===================================================================

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { IS_DEV_TOOLS } from '../../devtools.js';
import { useReading } from '../reading/useReading.js';
import { useChart } from '../../store/chartContext.jsx';
import { useUpgrade } from '../dashboard/UpgradeModal.jsx';
import { TIER_PRICES } from '../../infra/pricing.js';
import { STEM_CARD_DATA } from '../../content/index.js';
import { downloadCardPng, shareCard, copyText } from '../../lib/cardExport.js';

// THE FUNCTION METRICS (owner 2026-10-14; REA_19): three bars between the
// definition and the chips, computed by the engine (functionMetrics.js), the
// labels from the station. A trait bar fills its level in segments; the
// style bar marks its position between two plain ends. Static since
// 2026-10-15 (owner: no level glosses); nothing on the panel is tappable.
// Static bars (owner 2026-10-15: no level glosses; the labels explain
// themselves, as the MBTI metrics do, and a line per level would be a reading
// of the person, which the ledger owns). Nothing on the panel is tappable.
function MetricBars({ m }) {
  if (!m || !m.bars?.length) return null;
  return (
    <div className="el-metrics el-measure" role="list" aria-label={`${m.functionLabel} metrics`}>
      {m.bars.map((b) => {
        const cls = `el-metric${b.kind === 'style' ? ' style' : m.pole === 'friction' ? ' down' : ''}`;
        return (
          <div key={b.key} className={cls} role="listitem">
            <span className="el-metric-row">
              <span className="el-metric-lab">{b.label}</span>
              <span className="el-metric-track" aria-label={`${b.label}: level ${b.level} of 5`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className={`el-metric-seg${b.kind === 'style' ? (i === b.level ? ' mark' : '') : (i <= b.level ? ' on' : '')}`} />
                ))}
              </span>
            </span>
            {b.kind === 'style' && b.ends && (
              <span className="el-metric-ends"><span>{b.ends[0]}</span><span>{b.ends[1]}</span></span>
            )}
          </div>
        );
      })}
    </div>
  );
}
import { APP_URL, APP_HOST } from '../../infra/index.js';
import { DM_READING } from '../../content/reading/index.js';
import { buildJourneyModel, buildElementScreen, buildGlossary, FAMILY_FN, coreElOf, buildMergedModel } from './journeyData.js';
import { MergedBeats, WheelArrows, EnergySheet, RunPage, FirstReading, TypeChips, TypeLine, TypeCircle } from './MergedViews.jsx';
import { MERGE_V1 } from './mergeFlag.js';
import { resolveDayMasterReading } from '../reading/readingResolve.js';
import { resolvePositions } from '../reading/positionsResolve.js';
import { resolveDomains } from '../reading/domainsResolve.js';
import { DOMAINS_CONTENT } from '../../content/domains.js';
import { DomainsHub, DomainPage, DomainTiles } from './DomainsViews.jsx';
import { DepthBeats, DomainsHubPage, DomainReadingPage, ChaptersPage, StarsPage, BlueprintPage } from './DepthViews.jsx';
import { resolveChapters, resolveStars, resolveBlueprint, resolveDomainView } from '../reading/depthResolve.js';
import { SLOT_RANK } from '../../content/positions.js';
import { PAIR_CELLS } from '../../content/pairs.js';
import { K2_FUNCTIONS } from '../../content/k2.js';
import { JOURNEY_DEFS } from './journeyDefs.js';
import './journey.css';
import { DEPTH_LIVE, V5_LIVE, EJ_LIVE, SC_LIVE, TYPE_LIVE } from '../../liveFlags.js';
import { EnergyLadder, NameRung, DomainMap, ArtSlot, FN_ART, PERSONA_ART } from './EnergyJourney.jsx';
import { AlbumHub, LeafReader, Balance, EnergyPager, AcrossChart, useSwipe, markRead, SECTION_ART, InkDot } from './V5Views.jsx';
import { elementArt } from '../../styles/backgrounds.js';
import { resolveAlmanac } from '../dashboard/almanac/almanacResolve.js';
import { isoDay } from '../../engine/almanac/index.js';
import { track } from '../../infra/analytics.js';

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

// Dev-only: registers the DevBar's door to the journey's internal screens.
// A child so the registration is an effect (never a write during render).
function DevDoor({ go, route }) {
  useEffect(() => {
    const door = (...a) => go(...a);
    door.route = route;   // the DevBar polls for the door of the route it asked for (null until the model is built)
    window.__journeyGo = door;
    return () => { if (window.__journeyGo === door) delete window.__journeyGo; };
  }, [go, route]);
  return null;
}

// tiny helpers for repeated glyphs
// The domain marks (the canonical taxonomy ×8, plus the first draft's life-domain keys)
const DOM = { Wealth: 'dom-wealth', Career: 'dom-career', Health: 'dom-health', Love: 'dom-love', Family: 'dom-family', Social: 'dom-social', Mind: 'dom-mind', Growth: 'dom-growth', career: 'dom-career', money: 'dom-wealth', relationships: 'dom-rel', health: 'dom-health' };
const Use = ({ id, className }) => (
  <svg className={className} viewBox="0 0 24 24"><use href={U(id)} /></svg>
);
// The share card's signs: html-to-image copies a sprite symbol into the
// exported image only when the <use> names it through xlink:href, so the card
// sets both (without it the exported dots lose their element signs).
const UseX = ({ id, className }) => (
  <svg className={className} viewBox="0 0 24 24"><use href={U(id)} xlinkHref={U(id)} /></svg>
);
// The share card's Day Master line: which of the stem's two claims is the
// social one (how people use you). Claim 2 for most stems; 乙 and 壬 have no
// social claim yet and 辛's second carries a dash, so those take claim 1.
// THE TYPE (owner 2026-10-27, M1–M6 A): dev site until TYPE_LIVE.
export const TYPE_V1 = TYPE_LIVE || IS_DEV_TOOLS;
const SHARE_CLAIM_PICK = { '乙': 0, '壬': 0, '辛': 0 };
const Disc = () => (
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="currentColor" /></svg>
);

// THE DOMAINS read domain first (DOM-1): PAUSED by the owner 2026-10-17
// ("pause and revert now") while the catalogue's new sections are
// redesigned (a Domains page and a Life Chapters page). Off everywhere;
// the views stay in the code for the redesign.
const DOMAINS_V2 = false;
// THE DEPTH (owner 2026-10-18, round 8 approved; B1): the four in-depth
// sections below the wheel (Domains, Life Chapters, Stars, the Energy
// Blueprint) and their pages, on the dev site only until the real content
// lands. Units not yet written render their draft lines (B3).
const DEPTH_V1 = DEPTH_LIVE;   // live 2026-10-21 (liveFlags.js)
const DEPTH_SCREENS = ['domains', 'chapters', 'stars', 'blueprint'];
// THE MERGE (owner 2026-10-18, option 1; rulings 2026-10-19 Q1–Q6 A and
// 2026-10-20): the catalogue and the Day Master page as one page, "Your
// reading" — beats 1–3 rebuilt (who you are · your five energies with the
// arrows view as default · how you run, start here, what your chart asks
// for), one energy sheet for every energy tap, "How am I running?" as a full
// page, and the first reading's eight cards after the Naming. The energy
// manual, the GROW/RELEASE rails, the hero arrow, the dot card and the
// seal's share action retire under it (owner 2026-10-20). Live on
// elementum.life from 2026-10-21 (the switch is in mergeFlag.js).
// V5 (DES_15 R2): where each section page splits into cards, and what follows it
const V5_UNITS = { domains: '.dp-head, .dp-domgrid', chapters: '.dp-head, .lc-chap, .lc-dec.now, .lc-years', stars: '.dp-head, .dp-starcard, .dp-seats > .dp-seat', blueprint: '.dp-head, .dp-bp' };
const V5_TITLE = { domains: 'Your domains', chapters: 'Your life chapters', stars: 'Your stars', blueprint: 'Your energy blueprint' };
const V5_ORDER = { domains: 'chapters', chapters: 'stars', stars: 'blueprint', blueprint: null };
const WHEEL_VIEW_KEY = 'elm.wheelView';
const readWheelView = () => { try { return localStorage.getItem(WHEEL_VIEW_KEY) || 'do'; } catch { return 'do'; } };
// the words note's new words (R3), shown with the sections
const DEPTH_WORDS = {
  seat: { label: 'Seat', tint: 't-core', pill: 'core', icon: null, body: 'Your chart has seven seats, a stem and a branch at each of four gates (the day stem is you). One of ten characters sits in each seat, and the seat says where in your life that character works.' },
  gate: { label: 'Gate', tint: 't-core', pill: 'core', icon: null, body: 'Each of your four gates is a stretch of your life: the Year Gate to fifteen, the Month Gate from sixteen to thirty-four, the Day Gate from thirty-five to forty-seven, the Hour Gate from forty-eight on.' },
  decade: { label: 'Decade', tint: 't-core', pill: 'core', icon: null, body: 'Every ten years a new character runs underneath your life, set by your birth month. Some decades help your chart and some weigh on it, and each one colours the chapter it falls in.' },
  star: { label: 'Star', tint: 't-core', pill: 'core', icon: null, body: 'The symbolic stars are an older, lighter layer of the reading. Each one colours the gate it sits in, and some arrive with a decade or a year.' },
};

export default function JourneyStage({ reveal = false, openCore = false, openEl = null, openSection = null, onDone, onOpenDayMaster, onOpenCodex, onDiscoverHour, onBirthChart, onOpenToday, onOpenCompat }) {
  const { chart, ec, identity, hourUnknown } = useReading();
  const { tier } = useChart();   // K2 domain readings are Seeker-gated
  const { openUpgrade } = useUpgrade();   // THE EDGE's domain sheet leads to the price gate (owner 2026-10-15)
  // `read-elemental` alias (owner 2026-09-15): the retired d12 Elemental
  // Nature detail opens straight onto the core's own energy page (the Body
  // corpus), so the initial screen is seeded from the prop, not set in an effect.
  // `openEl` (owner 2026-10-17): a Day Master diagnosis row opens straight
  // onto that energy's page, the same way.
  // `openSection` (THE DEPTH doors, B4): the Today tab's decade tile and the
  // Day Master and pillar pages open a section page directly.
  const [screen, setScreen] = useState(() => (V5_LIVE && openSection === 'run' && ec ? 'run' : DEPTH_V1 && DEPTH_SCREENS.includes(openSection) && ec ? openSection : (openCore || openEl) && ec ? 'element' : 'catalogue'));
  const [elOpen, setElOpen] = useState(() => (ec ? (openEl || (openCore ? coreElOf(ec) : null)) : null));      // element screen target
  const [showShare, setShowShare] = useState(false);
  const [cardStatus, setCardStatus] = useState(null);
  const cardRef = useRef(null);
  const cardStatusT = useRef(null);
  const [manualOpen, setManualOpen] = useState(false); // YOUR ENERGY MANUAL unfold (owner 2026-09-10)
  const [fnOpen, setFnOpen] = useState(null);      // footnote float (cond|cat|fric)
  const [kwOpen, setKwOpen] = useState(null);      // the keyword sheet (owner 2026-10-14): {word, text, pole, fnLabel}
  const [dotOpen, setDotOpen] = useState(null);    // wheel-dot float — the element's relation with the core
  const [sheetEl, setSheetEl] = useState(null);    // THE MERGE: the energy sheet (replaces the dot card)
  const [wheelView, setWheelViewS] = useState(readWheelView); // THE MERGE: 'do' (arrows, the default) | 'amt'
  const setWheelView = (v) => { setWheelViewS(v); try { localStorage.setItem(WHEEL_VIEW_KEY, v); } catch { /* storage off */ } };
  const [storyOn, setStoryOn] = useState(false);   // THE MERGE: the first reading's eight cards
  const storyDoneRef = useRef(false);
  const [storyStart, setStoryStart] = useState(0);
  const [replayOn, setReplayOn] = useState(false);   // THE TYPE (K2 A): the Archetype chip replays the first reading   // dev: open the first reading at a card
  const finishRef = useRef(null);
  const [posOpen, setPosOpen] = useState(null);    // element-page position accordion (position id)
  const [elSec, setElSec] = useState(null);        // element section detail ('mech' | 'fn' | 'dom') — fn re-split as the function reading's home (owner re-org 2026-09-02)
  const [deepOpen, setDeepOpen] = useState(false); // seat Stage B ("the deeper layers") — resets per seat
  const [godOpen, setGodOpen] = useState(null);    // WHO RUNS IT god accordion (god zh) — collapsed by default
  const [domOpen, setDomOpen] = useState(null);    // THE DOMAINS page (domain word) — DOM-1
  const [domFrom, setDomFrom] = useState('catalogue'); // where the domain page's back row returns
  const [depthFrom, setDepthFrom] = useState('catalogue'); // where a section page's back row returns (THE DEPTH)

  const model = useMemo(() => {
    if (!chart || !ec || !identity) return null;
    const card = STEM_CARD_DATA[chart.dayMaster.stem];
    return buildJourneyModel({ chart, ec, identity, card });
  }, [chart, ec, identity]);
  const merged = useMemo(() => (MERGE_V1 && model ? buildMergedModel(model, chart) : null), [model, chart]);

  const playingReveal = reveal;
  // V5 (R5): the five energy pages page sideways, in the first reading's order
  const v5Order = useMemo(() => (V5_LIVE && merged ? merged.order : []), [merged]);
  const v5Names = useMemo(() => (V5_LIVE && model ? Object.fromEntries(model.els.map((r) => [r.el, r.name])) : {}), [model]);
  const v5Today = useMemo(() => {
    if (!V5_LIVE || !chart) return null;
    try { const a = resolveAlmanac(chart, { kind: 'hub', date: isoDay(new Date()), hourUnknown }); return { day: a?.energy?.el, month: a?.hub?.month?.el, year: a?.hub?.year?.el }; } catch { return null; }
  }, [chart, hourUnknown]);
  const elStageRef = useRef(null);
  const pageEnergy = useCallback((d) => {
    if (!v5Order.length || !elOpen) return;
    const i = v5Order.indexOf(elOpen); const to = v5Order[(i + d + v5Order.length) % v5Order.length];
    setElOpen(to); setPosOpen(null);
    const sw = elStageRef.current?.querySelector('.scrollwrap'); if (sw) sw.scrollTop = 0;
  }, [v5Order, elOpen]);
  const swipeL = useCallback(() => pageEnergy(1), [pageEnergy]);
  const swipeR = useCallback(() => pageEnergy(-1), [pageEnergy]);
  useSwipe(elStageRef, swipeL, swipeR);

  const stageRef = useRef(null);
  const rvlRef = useRef(null);
  const swRef = useRef(null);       // catalogue scrollwrap
  const padRef = useRef(null);
  const wheelRef = useRef(null);

  // A1 share-rail actions — real export via the built cardExport lib
  const flashCard = useCallback((msg) => {
    setCardStatus(msg);
    clearTimeout(cardStatusT.current);
    cardStatusT.current = setTimeout(() => setCardStatus(null), 2200);
  }, []);
  const doShare = async (platform) => {
    flashCard('Rendering your card…');
    const r = await shareCard(cardRef.current, { filename: 'elementum-identity.png', title: 'Elementum', text: 'My identity on Elementum', pixelRatio: SC_LIVE ? 1080 / 306 : undefined });
    flashCard(r === 'shared' ? `Shared — finish in ${platform}` : r === 'downloaded' ? 'Image saved — post it anywhere' : r === 'cancelled' ? null : 'Could not share');
  };
  const doSave = async () => {
    const ok = await downloadCardPng(cardRef.current, 'elementum-identity.png', SC_LIVE ? { pixelRatio: 1080 / 306 } : undefined);
    flashCard(ok ? 'Clean image saved' : 'Could not save');
  };
  const doCopy = async () => {
    const ok = await copyText(APP_URL);
    if (ok) track('share_click', { method: 'link' });
    flashCard(ok ? 'Link copied' : 'Could not copy');
  };

  const swTo = useCallback((elm, off = 60) => {
    const sw = swRef.current; if (!sw || !elm) return;
    const top = elm.getBoundingClientRect().top - sw.getBoundingClientRect().top + sw.scrollTop - off;
    sw.scrollTo({ top, behavior: 'smooth' });
  }, []);


  const goElement = useCallback((el) => { setElOpen(el); setPosOpen(null); setScreen('element'); if (V5_LIVE) markRead('energies'); }, []);

  // Dev-only: expose the in-journey element screen to the DevBar
  // (it is internal state, not a hash route), and broadcast the current
  // internal sub-screen so the DevBar Schema tab can track it.
  useEffect(() => {
    if (!IS_DEV_TOOLS || typeof window === 'undefined') return undefined;
    window.__journeyElement = goElement;
    return () => { if (window.__journeyElement === goElement) delete window.__journeyElement; };
  }, [goElement]);
  useEffect(() => {
    if (!IS_DEV_TOOLS || typeof window === 'undefined') return undefined;
    window.__journeyScreen = screen;
    window.__journeyElOpen = (screen === 'element' || screen === 'elsec') ? elOpen : null;
    window.dispatchEvent(new CustomEvent('journey-screen', { detail: screen }));
    return () => { delete window.__journeyScreen; delete window.__journeyElOpen; };
  }, [screen, elOpen]);
  const goScreen = useCallback((name) => {
    setScreen(name);
    requestAnimationFrame(() => {
      const sw = stageRef.current?.querySelector(`.jscreen[data-screen="${name}"] .scrollwrap`);
      if (sw) sw.scrollTop = 0;
    });
  }, []);

  // (insToggle/folio retired with the beat-1 folio — its teaching lines
  //  live on inside YOUR ENERGY MANUAL, owner 2026-09-10)

  // ── effects: ink-in observer + dock merge/pill refold ────────────
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
    track('reveal_shown');
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
      track('reveal_complete', { seconds_since_shown: playT ? Math.round((Date.now() - playT) / 1000) : null });
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

    finishRef.current = finish;
    // THE MERGE: the swipe opens the first reading; its last card (or Skip)
    // runs the dissolve.
    const advance = () => { if (MERGE_V1 && !storyDoneRef.current) setStoryOn(true); else finish(); };
    const onClick = (e) => {
      if (e.target.closest('.rvl-swipe')) { advance(); return; }
      if (!ceremonyDone()) rv.classList.add('done'); else advance();
    };
    let dy = null;
    const onDown = (e) => { dy = e.clientY; rv.setPointerCapture && rv.setPointerCapture(e.pointerId); };
    const onMove = (e) => { if (dy === null || finished) return; const d = dy - e.clientY; if (d > 6) setP((d - 6) / 360); };
    const onUp = () => { if (dy === null || finished) { dy = null; return; } if (p > 0.3) { if (MERGE_V1 && !storyDoneRef.current) spring(0, advance); else finish(); } else if (p > 0.01) spring(0); dy = null; };
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

  // ── THE EDGE's door + domain sheet state ─────────────────────────
  // Hooks for the Domains door/sheet live here (above the `!model` return)
  // so they run in the same order on every render; their handlers stay
  // beside the element-screen code below.
  const [domScroll, setDomScroll] = useState(null);   // the domain word to scroll to once THE DOMAINS renders
  const [domSheet, setDomSheet] = useState(null);     // the open domain sheet, or null
  // The sheet never outlives its page: whenever the page key (screen,
  // element, section) changes, the sheet is dropped before paint.
  const domPageKey = `${screen}|${elOpen}|${elSec}`;
  const [domSheetPage, setDomSheetPage] = useState(domPageKey);
  if (domSheetPage !== domPageKey) { setDomSheetPage(domPageKey); setDomSheet(null); }
  useEffect(() => { if (!domScroll) return; const t = setTimeout(() => { const el = document.querySelector(`.elpos-domread[data-dom="${domScroll}"]`) || document.querySelector('.elpos-row.open'); el?.scrollIntoView({ block: 'center', behavior: 'smooth' }); setDomScroll(null); }, 80); return () => clearTimeout(t); }, [domScroll, elSec, posOpen]);

  if (!model) return null;

  const m = model;
  const towers = [...m.els].sort((a, b) => b.presence - a.presence);
  const pMax = towers[0]?.presence || 1;
  const sealSrc = `/concept-arts/stems/${m.stemId}.png`;
  const paintSrc = `/concept-arts/stems/proc/${m.stemId}-${m.core.el}.png`;
  // the Naming's five energies: the first reading's order, dots sized by presence
  const rvlOrder = (merged ? merged.order.map((el) => m.byEl[el]) : [...m.els].sort((a, b) => b.presence - a.presence)).filter(Boolean);
  const rvlMax = Math.max(1, ...rvlOrder.map((r) => r.presence));
  // Only 庚 has true seal-chip art; the other stems' raw pngs are full
  // paintings — wheel centers use the proc medallions for them instead.
  const isBladeArt = m.stemId === 'geng';
  const centerCls = isBladeArt ? 'center-seal a-seal' : 'center-seal ms';
  const centerSrc = isBladeArt ? sealSrc : paintSrc;

  // the dot card's capsule DNA (npig pigment + bottom-up presence fill) —
  // shared by the dot card's 生/克 relation strip and the element page's
  // mechanism graphic.
  const capThumb = (el) => {
    const rr = m.byEl[el];
    return (
      <span className={`wd-cap dk-${el}`}>
        <span className="wd-capfill" style={{ height: `${Math.round((rr.presence / pMax) * 84)}%` }} />
        <span className="wd-caplab">{rr.name}</span>
        <Use id={`el-${el}`} className="elmark" />
        <b className="wd-caphz">{rr.hz}</b>
        <span className="wd-cappct">{rr.presence}%</span>
      </span>
    );
  };


  const elScreen = elOpen ? buildElementScreen(m, elOpen) : null;
  // Polarity faces (1–2, dominant-led) — the Ruling Domains sub-blocks.
  const elFaces = elScreen?.faces?.length ? elScreen.faces : [];
  // Curation pass (owner 2026-08-19): the element page is a teaser index;
  // each section opens its own detail sub-screen (jscreen "elsec").
  // Revelation ladder (owner 2026-09-01): the Domains detail arrives with
  // the TOP seat's Stage A already open — the reading is visible with zero
  // taps (this replaced the START HERE chip); the god layer stays collapsed.
  const openSec = (k) => { setElSec(k); setPosOpen(k === 'dom' ? (elPositions[0]?.id ?? null) : null); setDeepOpen(false); setGodOpen(null); goScreen('elsec'); };
  // THE EDGE's door (owner 2026-10-15): open THE DOMAINS at the seat whose
  // reading carries this domain word (the edge's own god first, then the
  // deepest seat with the word), and scroll to its
  // paragraph once rendered; a word no seat carries lands on the first seat.
  // THE EDGE's domain sheet (owner 2026-10-15, late): a row's domain mark
  // opens a sheet with the seat's teaser line and the unlock to the Domains
  // tier; unlocked, "Read it" lands in THE DOMAINS at that word.
  // The title and the button name a seat only when that seat rules the word
  // (`rules`); otherwise they promise no reading for it (bug check D2, owner
  // 2026-10-17). The full landing is rebuilt with the Domain reading (DOM-1).
  const openDomainSheet = (word, god) => { const has = (p) => (p.domains || []).includes(word); const seat = elPositions.find((p) => p.god === god && has(p)) || elPositions.find(has) || elPositions.find((p) => p.god === god) || elPositions[0] || null; const face = elFaces.find((f) => f.god === god) || elFaces[0] || null; setDomSheet({ word, god, seat, rules: !!seat && has(seat), face, elName: elScreen?.elName, el: elScreen?.el, teaser: seat ? (seat.teaser || seat.defline || firstSent(seat.reading || '')) : (face?.defline ? `${face.defline}. ${elScreen?.elName} holds no seat in your pillars. It reaches you through the hidden stems, felt more than placed.` : `${elScreen?.elName} holds no seat in your pillars. It reaches you through the hidden stems, felt more than placed.`) }); };
  const openDomainAt = (word, god) => { const has = (p) => (p.domains || []).includes(word); const seat = elPositions.find((p) => p.god === god && has(p)) || elPositions.find(has) || elPositions.find((p) => p.god === god) || elPositions[0]; setElSec('dom'); setPosOpen(seat?.id ?? null); setDeepOpen(false); setGodOpen(null); goScreen('elsec'); setDomScroll(seat ? word : null); };
  // The mechanism equation graphic (capsules + 生/克 link, wp-dotcard scope) —
  // shared by the mechanism teaser card and its detail screen.
  // The graphic is a true EQUATION (owner 2026-09-01): the core capsule
  // wears its state, and the strip concludes in the role — chemistry ×
  // state = catalyst/friction, readable without a word of prose.
  const mvCoreTag = m.condition !== 'Balanced' ? m.condition.toUpperCase() : null;
  const capMv = (el) => (el === m.core.el && mvCoreTag)
    ? <span className="el-mvcore">{capThumb(el)}<i className="el-mvstate">{mvCoreTag}</i></span>
    : capThumb(el);
  // Parameterized over a screen object `s` (owner 2026-09-02): the equation
  // and the one-thumbnail render for ANY element — the hero, the mechanism
  // detail, AND the wheel-dot cover share these builders.
  const mvResultFor = (s) => (
    <>
      <span className="el-mveqs" aria-hidden="true">=</span>
      {m.condition === 'Balanced'
        ? <span className="role-pill cond"><Use id="ic-balanced" />Balanced</span>
        : s.roleKind === 'down' ? <span className="role-pill fric"><Use id="ar-down" />Friction</span>
        : s.roleKind === 'up' ? <span className="role-pill cat"><Use id="ar-up" />Catalyst</span>
        : <span className="role-pill cond"><Use id={m.condition === 'Overfueled' ? 'ic-charged' : 'ic-receptive'} />{m.condition}</span>}
    </>
  );
  const mechVizFor = (s) => s?.mech ? (
    <div className="wp-dotcard el-mechviz">
      {s.mech.verb === 'core' ? (
        <div className="wd-rel el-mechrel">
          {capMv(s.mech.a)}
          <span className="wd-link core"><i className="wd-lawhz">主</i><span className="wd-lawtx">day master</span></span>
          <span className="wd-capseal" style={{ backgroundImage: `url('${centerSrc}')` }} aria-hidden="true" />
        </div>
      ) : (
        <div className="wd-rel el-mechrel">
          {capMv(s.mech.a)}
          <span className={`wd-link ${s.mech.verb}`}>
            <i className="wd-lawhz">{s.mech.verb === 'feeds' ? '生' : '克'}</i>
            <svg className="wd-arrow" viewBox="0 0 44 10" aria-hidden="true"><path d="M2 5 H36 M36 5 l-6 -3.6 M36 5 l-6 3.6" /></svg>
            <span className="wd-lawtx">{s.mech.verb === 'tames' ? 'shapes' : s.mech.verb}</span>
          </span>
          {capMv(s.mech.b)}
        </div>
      )}
      {/* the conclusion line: the equation caption fused with the role result */}
      <span className="el-mvres"><span className="wd-eq el-mecheq">{String(s.mech.eq).replace(/\btames\b/gi, (w) => (w === w.toUpperCase() ? 'SHAPES' : 'shapes'))}</span>{mvResultFor(s)}</span>
    </div>
  ) : null;
  // THE one-thumbnail (owner design 2026-09-02; de-dup + cover mode owner
  // 2026-09-04): ink art ground, everything composed on it. The role speaks
  // ONCE, as the equation caption's conclusion — the top role chip retired
  // (it doubled the caption pill). In cover mode the thumbnail IS the CTA:
  // the function claim and the three keyword chips join the art, and the
  // verdict moves off the cover (it lives on the FUNCTION tile + reading).
  const heroThumbFor = (s, cover = false) => s?.mech ? (
    <div className="hero2 el-heroart el-heroart2">
      <span className={`hart el-art ${s.cls}`} /><span className="scrim" /><span className="hair el-hair" style={{ background: s.pig }} />
      <span className="bighz el-hz" aria-hidden="true">{s.hz}</span>
      <div className="el-herostack">
        <span className="el-herotop">
          <span className="reye el-reye" style={{ marginLeft: 'auto' }}><Use id={`el-${s.el}`} /> {s.reye}</span>
        </span>
        {mechVizFor(s)}
        {cover && s.fnLabel && (
          <span className="serifline el-artclaim">{s.elName} is your {s.fnLabel}.</span>
        )}
        {cover && m.byEl[s.el].adj?.length ? (
          <span className="wd-adj el-artchips">{m.byEl[s.el].adj.map((a) => <span key={a} className={`wd-adjchip${(m.byEl[s.el].role === 'friction' || m.byEl[s.el].coreExcess) ? ' down' : ''}`}>{a}</span>)}</span>
        ) : null}
        <span className="el-herobar">
          <span className="sp-track el-herotrack">
            {towers.map((t) => (
              t.presence > 0
                ? <i key={t.el} className={t.el === s.el ? 'cur' : undefined} style={{ width: `${t.presence}%`, background: t.el === s.el ? `var(--${t.el}Deep)` : `color-mix(in srgb, var(--${t.el}Deep) 40%, var(--silkDeep))` }} />
                : <i key={t.el} className={t.el === s.el ? 'cur gh' : 'gh'} style={{ width: '2%', ...(t.el === s.el ? { background: `var(--${t.el}Deep)` } : {}) }} />
            ))}
          </span>
          <b className="el-heropct">{m.byEl[s.el].presence}%</b>
        </span>
      </div>
    </div>
  ) : null;
  // The element's seats (REA_02 §5e echo): the positions this energy holds.
  // Chart-level positions once (the distillation ladder, DES_04 §AM.11):
  // the catalogue takeaway strip + dot-card hints derive from the same
  // resolution the element pages use; element seats sort by SLOT_RANK.
  const allPositions = m ? resolvePositions(chart, hourUnknown) : [];
  // THE DOMAINS (DOM-1): every domain page, composed chart-wide from the seats + the decades
  const depthOpts = m ? { hourUnknown, condition: m.condition, roles: Object.fromEntries(Object.entries(m.byEl).map(([k, v]) => [k, v.role])) } : null;
  const dm = (DOMAINS_V2 || DEPTH_V1) && m ? resolveDomains(chart, allPositions, DOMAINS_CONTENT, depthOpts) : null;
  const domPage = dm && domOpen ? dm.pages.find((p) => p.domain === domOpen) : null;
  const openDomain = (word, from) => { setDomOpen(word); setDomFrom(from); goScreen('domain'); };
  // THE DEPTH: the section models (Life Chapters, Stars, the Blueprint) and the domain page By position
  const depth = DEPTH_V1 && dm ? { dm, chapters: resolveChapters(chart, allPositions, depthOpts), stars: resolveStars(chart, depthOpts), blueprint: resolveBlueprint(chart, allPositions, depthOpts) } : null;
  // V5: each section's own headline, used on the Next card that hands one section to the next
  const v5Top = depth ? depth.dm.pages.filter((p) => p.seats.length).slice(0, 2) : [];
  const v5Next = depth ? {
    domains: v5Top.length === 2 && v5Top[0].seats.length === v5Top[1].seats.length ? `${v5Top[0].domain} and ${v5Top[1].domain} carry the most weight in your life` : `${v5Top[0]?.domain} carries the most weight in your life`,
    chapters: `You are in your ${depth.chapters.chapters.find((c) => c.key === depth.chapters.gateNow)?.name.replace(/^The /, '') || ''}`,
    stars: depth.stars.claim.text,
    blueprint: depth.blueprint.title.replace(/ · .*/, ''),
  } : {};
  const domView = DEPTH_V1 && domPage ? resolveDomainView(domPage, chart, DOMAINS_CONTENT, depthOpts) : null;
  const openDepth = (name, arg, from = 'catalogue') => {
    if (name === 'domain') { openDomain(arg, from); return; }
    setDepthFrom(from); goScreen(name);
  };
  const depthBack = (from) => goScreen(from === 'element' && elScreen ? 'element' : from === 'elsec' && elScreen ? 'elsec' : from === 'domain' && domPage ? 'domain' : DEPTH_SCREENS.includes(from) ? from : MERGE_V1 && from === 'run' ? 'run' : 'catalogue');
  // THE MERGE: "How am I running?" opens the Day Master reading card, the
  // stem × band paragraph (owner 2026-10-20)
  const runNature = MERGE_V1 && merged ? (resolveDayMasterReading(chart.dayMaster.stem, chart, m.band)?.nature || STEM_CARD_DATA[chart.dayMaster.stem]?.yourNature?.desc || '') : '';
  const DEPTH_BACK = { domains: 'YOUR READING · DOMAINS', chapters: 'YOUR READING · LIFE CHAPTERS', stars: 'YOUR READING · STARS', blueprint: 'YOUR READING · ENERGY BLUEPRINT' };
  const bySeatRank = (a, b) => (SLOT_RANK[a.slot] || 9) - (SLOT_RANK[b.slot] || 9);
  const firstSent = (s) => { const i = s.indexOf('.'); return i >= 0 ? s.slice(0, i + 1) : s; };
  // (the catalogue takeaway strip retired — owner 2026-09-04: the covers,
  // FUNCTION tiles, and reading pages now carry the hook rungs; the strip's
  // deep-seat teasers duplicated the verdict layer one screen up)
  const elPositions = elScreen ? allPositions.filter((p) => p.el === elScreen.el).sort(bySeatRank) : [];
  // Curation v7 (owner 2026-08-19): each named position carries its OWN
  // teaser row — term (no 汉字 on the card) + 1–2 domain chips + the
  // authored position teaser (therapist-psychic register, REA_04 §9.4;
  // defline is the fallback until the ×63 batch lands).
  const glossary = DEPTH_V1 && m ? { ...buildGlossary(m), ...DEPTH_WORDS } : buildGlossary(m);
  const condIcon = m.condition === 'Underfueled' ? 'ic-receptive' : m.condition === 'Balanced' ? 'ic-balanced' : 'ic-charged';
  const fnNote = fnOpen ? glossary[fnOpen] : null;

  // Wheel-dot float — THE COVER (owner journey redesign 2026-09-02): the
  // floating card IS the element page's one-thumbnail, plus the rung-②
  // texts (claim · cta_verdict · keyword chips · arrow). Tapping through
  // lands on the page HEADED BY THE IDENTICAL THUMBNAIL — one object
  // carried across the transition; the equation is taught exactly once.
  // The §5f function noun for an element (bijection, owner 2026-09-01) — the
  // wheel panel's rows and the dot card speak the SAME vocabulary; the seat
  // noun stays on the element page, the shadow noun in friction verdicts.
  const fnNoun = (r) => (K2_FUNCTIONS.find((f) => f.key === PAIR_CELLS[`${m.core.hz}_${r.hz}`]?.function?.primary) || {}).label || FAMILY_FN[r.family] || '';

  const dot = dotOpen && m.byEl[dotOpen] ? {
    r: m.byEl[dotOpen],
    tint: m.byEl[dotOpen].isCore ? 't-core' : m.byEl[dotOpen].role === 'friction' ? 't-fric' : 't-cat',
    s: buildElementScreen(m, dotOpen),
  } : null;

  // the wheel with its arrows (THE MERGE), shared by the merged beats and the V5 album
  const mergedWheel = merged ? (
                      <div className={`wheel mg-wheel${wheelView === 'do' ? ' mg-do' : ''}`} ref={wheelRef} aria-label="Dominance wheel — tap any energy to open its sheet">
                        <button className={centerCls} style={{ backgroundImage: `url('${centerSrc}')` }} aria-label="Your seal: how am I running?" onClick={() => goScreen('run')} />
                        <WheelArrows m={m} g={merged} />
                    {m.els.map((r) => (
                      <button key={r.el} data-el={r.el}
                        className={`node n-${r.el}${r.isCore ? ' is-core' : ''}`}
                        style={{ width: r.size, height: r.size, left: r.seat.left, top: r.seat.top }}
                        aria-label={`${r.name}, ${r.presence} percent — ${r.isCore ? 'your core' : r.role}; its relation with your core`}
                        onClick={() => setSheetEl(r.el)}>
                        <Use id={`el-${r.el}`} className="elmark" />
                        <span className="pc">{r.presence}%</span>
                        {r.isCore
                          ? <span className="pip who"><Disc /></span>
                          : r.role === 'friction'
                            ? <span className="pip down"><Use id="ar-down" /></span>
                            : <span className={`pip up${r.major ? ' major' : ''}`}><Use id="ar-up" /></span>}
                        {/* function label (owner 2026-09-10: "label it but
                            keep the design clean") — the §5f noun, micro */}
                        <span className="fnlab">{fnNoun(r)}</span>
                        <span className={`mg-rv ${merged.rows[r.el].pole}`}>{merged.rows[r.el].relLabel}</span>
                      </button>
                    ))}
                      </div>
  ) : null;

  // Dev-only door (DevBar "Jump to Screen"), registered as window.__journeyGo
  // by <DevDoor> below so it always carries this render's handlers:
  // 'catalogue' · 'run' · 'sheet' el · 'element' el · 'elsec' el ('mech'|'fn'|'dom')
  // · 'domains' · 'domain' word · 'chapters' · 'stars' · 'blueprint' · 'story' cardIndex.
  const devGo = !IS_DEV_TOOLS ? null : (name, arg, arg2) => {
      switch (name) {
        case 'catalogue': setSheetEl(null); goScreen('catalogue'); break;
        case 'run': if (MERGE_V1 && merged) goScreen('run'); break;
        case 'sheet': if (MERGE_V1 && merged && m.byEl[arg]) { goScreen('catalogue'); setSheetEl(arg); } break;
        case 'element': if (m.byEl[arg]) goElement(arg); break;
        case 'elsec': if (m.byEl[arg]) { setElOpen(arg); setElSec(arg2 || 'fn'); setPosOpen(null); setDeepOpen(false); setGodOpen(null); goScreen('elsec'); } break;
        case 'domain': if (depth) openDomain(arg, 'catalogue'); break;
        case 'domains': case 'chapters': case 'stars': case 'blueprint': if (depth) openDepth(name, null, 'catalogue'); break;
        case 'story': if (playingReveal && MERGE_V1 && merged) { document.querySelector('.jny .rvl-overlay')?.classList.add('done'); setStoryStart(Math.max(0, arg || 0)); setStoryOn(true); } break;
        default: break;
      }
    };

  // data-ca="dock" removed with the dock retirement (2026-08-19): its stale
  // padv2 padding-bottom:18px override was clipping every screen's tail under
  // the tab bar (the dock used to provide that clearance).
  return (
    <div className="jny jphone" data-css="phoneP" data-grand="v1" data-journey="compass" data-art="bloom">
      {IS_DEV_TOOLS ? <DevDoor go={devGo} route={MERGE_V1 && !merged ? null : playingReveal ? 'reveal' : 'reading'} /> : null}
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
                {/* The Naming, re-ruled (owner 2026-10-21, DES_15 RV1 B · RV2 A · RV3 B):
                    the sign and the five energies. The thesis and edge line leave
                    the plate (they live on the Your reading hero); the stem line
                    and the cast line become the painter's inscription at the side. */}
                <span className="rvl-ey rvl-distey">YOUR FIVE ENERGIES</span>
                <div className="rvl-dist" aria-label="Your five energies, sized by presence">
                  {rvlOrder.map((r) => (
                    <span key={r.el} className="rvl-dot">
                      <InkDot el={r.el} size={Math.round(30 + 34 * (r.presence / rvlMax))} Use={Use} label={`${r.name} ${r.presence} percent`} />
                      <small>{r.presence}%</small>
                      <span>{r.name}</span>
                    </span>
                  ))}
                </div>
              </div>
              <span className="rvl-inscr" aria-label="Your sign and birth cast">{m.stemLit} · {m.cast.replace(/^CAST FROM /, '')}</span>
              <button className="rvl-swipe" aria-label="Continue to your energies — swipe up or tap"><Use id="ico-chev-r" /><span>Swipe up</span></button>
            </div>
          )}

          {/* THE MERGE: the first reading's eight cards, between the Naming and the dissolve */}
          {playingReveal && MERGE_V1 && merged && storyOn && (
            <FirstReading key={storyStart} start={storyStart} door={SC_LIVE} m={m} g={merged} sealSrc={sealSrc} Use={Use} InkDot={InkDot} onShare={() => setShowShare(true)}
              onEnter={() => { storyDoneRef.current = true; setStoryOn(false); if (finishRef.current) finishRef.current(); }} />
          )}

          {/* THE TYPE (K2 A): the album's Archetype chip replays the first reading's eight cards */}
          {replayOn && merged && (
            <FirstReading key="replay" start={0} door={SC_LIVE} m={m} g={merged} sealSrc={sealSrc} Use={Use} InkDot={InkDot} onShare={() => { setReplayOn(false); setShowShare(true); }}
              onEnter={() => setReplayOn(false)} />
          )}

          {/* ── the catalogue ── */}
          <div className={`jscreen${screen === 'catalogue' ? ' active' : ''}`} data-screen="catalogue">
            <img className="ground-img2 bg-energy2" src="/backgrounds/bg-energymap-01-top-band.png" alt="" />
            <div className="pagetint2" />
            <div className="eltint" />
            <div className="pghead"><span className="pg-eyebrow">YOUR READING</span></div>
            <div className="scrollwrap" ref={swRef}>
              <div className="padv2" ref={padRef}>

                {!MERGE_V1 && (<>
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
                        <div className="id-lit">{m.stemLit} · CAST FROM YOUR DAY OF BIRTH</div>
                        {/* Owner ruling 2026-08-05: the hero arrow goes STRAIGHT to the
                            full Day Master page (P4, app-daymaster) — the journey's
                            internal daymaster sub-screen was retired (owner, 2026-08-13). */}
                        <button className="readcirc" aria-label="Read your Day Master" onClick={() => onOpenDayMaster && onOpenDayMaster()}><Use id="ico-arrow-r" /></button>
                      </div>
                    </div>
                  {/* (the core-diagnosis folio became YOUR ENERGY MANUAL,
                      beat 2 — owner journey restructure 2026-09-10; the
                      takeaway strip retired 2026-09-04) */}
                  </div>
                  <button className="jbridge" onClick={() => swTo(stageRef.current?.querySelector('.beat[data-beat="2"]'), 56)}><span>How does your energy run?</span><Use id="ar-down" /></button>
                </div>

                <div className="beat" data-beat="2">
                  {/* YOUR ENERGY MANUAL (owner rulings 2026-09-10): the core
                      analyzed from its CONDITION (never the ten-god voice) —
                      the line expands into the prescription: GROW / RELEASE with
                      the old seek/skip rows relocated as its doors, and the
                      core itself on the ease side for overfueled charts
                      (mirrored to seek when underfueled). Replaces both the
                      beat-1 folio and the old beat-3 panels. */}
                  <span className="sec-eyebrow">YOUR ENERGY MANUAL</span>
                  <div className={`cardstock manual-tile${manualOpen ? ' open' : ''}`}>
                    <button className="idg-line" aria-expanded={manualOpen} onClick={() => setManualOpen((v) => !v)}>
                      <Use id={`el-${m.core.el}`} className="idg-el" />
                      <span className="idg-t"><b>{m.core.name}</b> is your <b>{fnNoun(m.core)}</b> · it runs <span className="role-pill cond" role="button" tabIndex={0} onClick={(e) => { e.stopPropagation(); setFnOpen('cond'); }}><Use id={condIcon} />{m.condition}</span></span>
                      <Use id="ico-chev-r" className="idg-chev" />
                    </button>
                    {manualOpen && (
                      <div className="manual-body">
                        <p className="body2 man-defline">{m.defline[m.condition]}</p>
                        {m.balanced ? (
                          <p className="body2 man-why">Nothing to force — {m.foldVerdict} The map below is yours to wander.</p>
                        ) : (
                          <>
                            <div className="vx-ey man-ey"><span>GROW THESE</span><span className="role-pill cat" role="button" tabIndex={0} onClick={() => setFnOpen('cat')}><Use id="ar-up" />Catalyst</span></div>
                            <p className="man-why">{m.condition === 'Overfueled' ? 'These spend your surplus well.' : 'These refill what runs low.'}</p>
                            {m.seek.map((r) => (
                              <button key={r.el} className={`ik-crow pv-${r.el}`} aria-label={`${r.name} — open its reading`} onClick={() => setDotOpen(r.el)}>
                                <span className={`ik-chip${r.missing ? ' ghosted' : ''}`}><Use id={`el-${r.el}`} className="elmark" /><span className={`ik-plate a-${r.el}`} /></span>
                                <span className="crmain"><span className="ik-phrase"><b className="ik-el">{r.name}</b><span className="ik-is">is your</span><b className="ik-rel">{fnNoun(r)}{r.isCore && <span className="man-self">YOURSELF</span>}</b></span><span className="ik-pct">{r.presence}%</span></span>
                              </button>
                            ))}
                            <div className="vx-ey man-ey"><span>RELEASE THESE</span><span className="role-pill fric" role="button" tabIndex={0} onClick={() => setFnOpen('fric')}><Use id="ar-down" />Friction</span></div>
                            <p className="man-why">{m.condition === 'Overfueled' ? 'These feed a core already full.' : 'These spend what little comes in.'}</p>
                            {m.skip.map((r) => (
                              <button key={r.el} className={`ik-crow pv-${r.el}`} aria-label={`${r.name} — open its reading`} onClick={() => setDotOpen(r.el)}>
                                <span className={`ik-chip${r.missing ? ' ghosted' : ''}`}><Use id={`el-${r.el}`} className="elmark" /><span className={`ik-plate a-${r.el}`} /></span>
                                <span className="crmain"><span className="ik-phrase"><b className="ik-el">{r.name}</b><span className="ik-is">is your</span><b className="ik-rel">{fnNoun(r)}{r.isCore && <span className="man-self">YOURSELF</span>}</b></span><span className="ik-pct">{r.presence}%</span></span>
                              </button>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <button className="jbridge" onClick={() => swTo(stageRef.current?.querySelector('.beat[data-beat="3"]'), 56)}><span>See the five, placed</span><Use id="ar-down" /></button>
                </div>

                <div className="beat" data-beat="3">
                  <span className="sec-eyebrow">YOUR ENERGY MAP</span>
                  {/* the GROW/RELEASE rails (owner 2026-09-10; GROW/RELEASE since 2026-10-18): the manual's two
                      lists echoed as the map's key — seek pinned left, ease
                      right (the self ringed). The wheel itself is untouched:
                      same nodes, seats, sizes, and role pips. */}
                  {!m.balanced && (
                    <div className="maprails" aria-hidden="true">
                      <span className="mr-side">
                        <span className="mr-lab seek">GROW</span>
                        {m.seek.map((r) => <span key={r.el} className="mr-dot" style={{ background: `var(--${r.el}Deep)` }}><Use id={`el-${r.el}`} /></span>)}
                      </span>
                      <span className="mr-side">
                        {m.skip.map((r) => <span key={r.el} className={`mr-dot${r.isCore ? ' self' : ''}`} style={{ background: `var(--${r.el}Deep)` }}><Use id={`el-${r.el}`} /></span>)}
                        <span className="mr-lab ease">RELEASE</span>
                      </span>
                    </div>
                  )}
                  <div className="wheel" ref={wheelRef} aria-label="Dominance wheel — tap any energy to open its reading">
                    <button className={centerCls} style={{ backgroundImage: `url('${centerSrc}')` }} aria-label="The Day Master seal — open your identity card" onClick={() => setShowShare(true)} />
                    {m.els.map((r) => (
                      <button key={r.el} data-el={r.el}
                        className={`node n-${r.el}${r.isCore ? ' is-core' : ''}`}
                        style={{ width: r.size, height: r.size, left: r.seat.left, top: r.seat.top }}
                        aria-label={`${r.name}, ${r.presence} percent — ${r.isCore ? 'your core' : r.role}; its relation with your core`}
                        onClick={() => setDotOpen(r.el)}>
                        <Use id={`el-${r.el}`} className="elmark" />
                        <span className="pc">{r.presence}%</span>
                        {r.isCore
                          ? <span className="pip who"><Disc /></span>
                          : r.role === 'friction'
                            ? <span className="pip down"><Use id="ar-down" /></span>
                            : <span className={`pip up${r.major ? ' major' : ''}`}><Use id="ar-up" /></span>}
                        {/* function label (owner 2026-09-10: "label it but
                            keep the design clean") — the §5f noun, micro */}
                        <span className="fnlab">{fnNoun(r)}</span>
                      </button>
                    ))}
                  </div>
                </div>
                </>)}
                {/* THE MERGE: beats 1–3 of "Your reading" */}
                {MERGE_V1 && merged && !V5_LIVE && (
                  <MergedBeats m={m} g={merged} Use={Use} sealSrc={sealSrc} condIcon={condIcon}
                    view={wheelView} setView={setWheelView}
                    onRun={() => goScreen('run')} onEnergy={(el) => setSheetEl(el)}
                    onShare={() => setShowShare(true)} onBirthChart={onBirthChart}
                    wheel={mergedWheel} />
                )}
                {/* V5 (owner rulings 2026-10-21, DES_15 R1): Your reading as the album —
                    identity strip, the wheel tile (unchanged), the read line, the tiles */}
                {V5_LIVE && merged && (
                  <AlbumHub m={m} g={merged} depth={depth} positions={allPositions} hourUnknown={hourUnknown}
                    sealSrc={sealSrc} condIcon={condIcon} Use={Use} DOM={DOM} typeOn={TYPE_V1}
                    onFirstReading={() => setReplayOn(true)} onCircle={onOpenCompat || null}
                    onRun={() => goScreen('run')} onEnergy={(el) => setSheetEl(el)} onBirthChart={onBirthChart}
                    onOpen={(name) => openDepth(name, null, 'catalogue')}
                    wheelTile={(
                      <div className="cardstock mg-wtile">
                        <div className="mg-wthead">
                          <span className="sec-eyebrow mg-ey">YOUR FIVE ENERGIES</span>
                          <div className="mg-seg" role="group" aria-label="Wheel view">
                            <button type="button" aria-pressed={wheelView === 'do'} onClick={() => setWheelView('do')}>What they do to you</button>
                            <button type="button" aria-pressed={wheelView === 'amt'} onClick={() => setWheelView('amt')}>By amount</button>
                          </div>
                          {SC_LIVE ? <button type="button" className="sharebtn iconly mg-wshare" aria-label="Share your identity card" onClick={() => setShowShare(true)}><Use id="ico-share" /></button> : null}
                        </div>
                        {mergedWheel}
                        <p className="mg-whint">Tap an energy. Tap the seal for how you run.</p>
                      </div>
                    )} />
                )}
                {/* YOUR DOMAINS, the fourth beat (DOM-1, owner 2026-10-17 Q1/Q2 A) */}
                {DOMAINS_V2 && !V5_LIVE && dm && (
                  <>
                    <button className="jbridge" onClick={() => swTo(stageRef.current?.querySelector('.beat[data-beat="4"]'), 56)}><span>See where your life is ruled</span><Use id="ar-down" /></button>
                    <div className="beat" data-beat="4">
                      <span className="sec-eyebrow">YOUR DOMAINS</span>
                      <DomainsHub dm={dm} positions={allPositions} onOpen={(d) => openDomain(d, 'catalogue')} onDiscoverHour={onDiscoverHour} Use={Use} DOM={DOM} />
                    </div>
                  </>
                )}
                {/* THE DEPTH (owner 2026-10-18): Domains, Life Chapters, Stars, then Going deeper and the Blueprint */}
                {depth && !V5_LIVE && <DepthBeats d={depth} positions={allPositions} hourUnknown={hourUnknown} Use={Use} DOM={DOM} onOpen={(name, arg) => openDepth(name, arg, 'catalogue')} />}
                {/* (the beat-3 SEEK/SKIP panels retired 2026-09-10 — their
                    rows live on as YOUR ENERGY MANUAL's doors in beat 2;
                    SKIP re-worded EASE so the core itself can sit there) */}

                {/* wordsnote (A2, round-3 order). The energy-tile shelf (beat 4)
                    and the sticky ca-dock were RETIRED (owner 2026-08-19): the
                    wheel-dot entry cards are the one entry to energy readings —
                    wheel dots and seek/skip rows both open them. */}
                <div className="wordsnote" aria-label="What these words mean">
                  <span className="wn-ey">The words on this page · tap one</span>
                  <div className="wn-chips">
                    <button className="role-pill core" onClick={() => setFnOpen('core')}>Core</button>
                    <button className="role-pill cond" onClick={() => setFnOpen('cond')}><Use id={condIcon} />{m.condition}</button>
                    <button className="role-pill cat" onClick={() => setFnOpen('cat')}><Use id="ar-up" />Catalyst</button>
                    <button className="role-pill fric" onClick={() => setFnOpen('fric')}><Use id="ar-down" />Friction</button>
                    {depth && ['seat', 'gate', 'decade', 'star'].map((k) => <button key={k} className="role-pill core dp-newword" onClick={() => setFnOpen(k)}>{DEPTH_WORDS[k].label}</button>)}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── THE MERGE: "How am I running?" ── */}
          {MERGE_V1 && merged && (
            <div className={`jscreen${screen === 'run' ? ' active' : ''}`} data-screen="run">
              <div className="plateimg a-plate-rice" /><div className="eltint" />
              <button className="backrow" aria-label="Back to Your reading" onClick={() => goScreen('catalogue')}>
                <span className="bico"><Use id="ico-chev-l" /></span>
                <span className="bl el-back">YOUR READING · HOW YOU RUN</span>
              </button>
              <div className="scrollwrap"><div className="padv2">
                {V5_LIVE ? (
                  <LeafReader id="run" title="How am I running?" route="section:run" Use={Use}
                    units=".mg-runhead, .mg-cr > .mg-sec, .mg-bpdoor"
                    next={depth ? { label: 'Your domains', title: v5Next.domains, art: SECTION_ART.domains, onGo: () => openDepth('domains', null, 'catalogue') } : null}>
                    <RunPage m={m} g={merged} nature={runNature} Use={Use} condIcon={condIcon} mani={TYPE_V1 ? m.manifesto : null}
                      balance={<Balance m={m} g={merged} sealSrc={sealSrc} fnNoun={fnNoun} Use={Use} />}
                      onBlueprint={depth ? () => openDepth('blueprint', null, 'run') : null} />
                  </LeafReader>
                ) : (
                <RunPage m={m} g={merged} nature={runNature} Use={Use} condIcon={condIcon} mani={TYPE_V1 ? m.manifesto : null}
                  onBlueprint={depth ? () => openDepth('blueprint', null, 'run') : null} />
                )}
              </div></div>
            </div>
          )}

          {/* ── element reading ── */}
          {elScreen && (
            <div className={`jscreen${screen === 'element' ? ' active' : ''}`} data-screen="element" ref={elStageRef}>
              <div className="plateimg a-plate-rice" /><div className="eltint" />
              <button className="backrow" aria-label="Back to Readings" onClick={() => goScreen('catalogue')}>
                <span className="bico"><Use id="ico-chev-l" /></span>
                <span className="bl el-back">YOUR ENERGIES · {elScreen.name}</span>
              </button>
              <div className="scrollwrap"><div className="padv2">
                {V5_LIVE && v5Order.length ? <EnergyPager order={v5Order} el={elScreen.el} names={v5Names} onGo={(el) => { goElement(el); requestAnimationFrame(() => { const sw = stageRef.current?.querySelector('.jscreen[data-screen="element"] .scrollwrap'); if (sw) sw.scrollTop = 0; }); }} Use={Use} /> : null}
                {EJ_LIVE ? (
                  <>
                    {/* THE ENERGY JOURNEY (owner rulings 2026-10-22, DES_15 EJ1 C, EJ2–EJ8 A):
                        the page as a ladder. ① THE NAME, open: the plate as a band, the
                        dot, the name and 汉字, "{Energy} is your {Function} energy.", the
                        pair head, the law's picture line, the presence bar. Then the
                        boxes and the cards (EnergyJourney.jsx). The previous cards sit
                        under the switch. */}
                    <NameRung s={elScreen} r={m.byEl[elScreen.el]} towers={towers} art={elementArt(elScreen.el, chart?.dayMaster?.stem)} Use={Use} InkDot={InkDot} />
                    <EnergyLadder s={elScreen} m={m} condition={m.condition} dm={dm} art={elementArt(elScreen.el, chart?.dayMaster?.stem)} Use={Use} InkDot={InkDot} DOM={DOM} MetricBars={MetricBars}
                      onFunction={() => openSec('fn')} onDomains={() => openSec('dom')} onEnergy={(el) => goElement(el)}
                      onDomain={(d) => openDomain(d, 'element')}
                      onKeyword={(c) => setKwOpen({ word: c.word, text: c.text, pole: (m.byEl[elScreen.el].role === 'friction' || m.byEl[elScreen.el].coreExcess) ? 'friction' : 'catalyst', fnLabel: elScreen.fnLabel, fnKey: elScreen.fnKey, elName: elScreen.elName })} />
                  </>
                ) : (<>
                {/* THE HERO CARD (owner 2026-09-01): the art band and the
                    mechanism card CONSOLIDATED — the old energy-pill expanded
                    card reborn at element grain. Anatomy by significance:
                    ① identity + state (art, name·%, role chip) ② the function
                    CLAIM as the headline ③ dominance track + rank ④ the
                    chemistry formula ⑤ the verdict (teaser register) ⑥ the
                    seek/skip diagnosis, closing on the directive. Tapping
                    opens the mechanism detail. Tile hook + tag retired. */}
                {/* ONE coherent thumbnail (owner 2026-09-02): the ink art is
                    the ground and every visual element composes ON it — role
                    chip + identity up top, the chemistry equation as the
                    focal object, the conclusion caption, the dominance bar
                    at the base. The diagnosis is the card's caption footer.
                    (The claim line moved to THE FUNCTION card's title.) */}
                {/* the HEADER card (owner 2026-09-02, fixed same day: the
                    standalone MECHANISM card duplicated the claim — the
                    reading button lives ON the diagnosis line instead, and
                    the mechanism reading expands from there) */}
                {elScreen.mech && (
                  <button className="cardstock el-tease goa el-herocard" onClick={() => openSec('mech')}>
                    {heroThumbFor(elScreen)}
                    {elScreen.diag && <span className="el-teasep el-herodiag">{elScreen.diag}</span>}
                    <span className="readcirc sm el-goarrow"><Use id="ico-arrow-r" /></span>
                  </button>
                )}
                {/* THE FUNCTION card (owner re-org 2026-09-02; teaser re-ruled
                    2026-09-04): the tile's meaning line is the AUTHORED
                    cta_verdict — the derived first-sentence teaser duplicated
                    the reading's own opener on tap-in, so the tile hooks and
                    the detail opens fresh. The verdict also lives on the dot
                    cover; the cover is transient, this is the standing entry. */}
                {elScreen.verdict && (
                  <button className="cardstock el-tease goa" onClick={() => openSec('fn')}>
                    <span className="laylab">THE FUNCTION</span>
                    {/* the claim line is THIS section's title (owner 2026-09-02);
                        the function glyph leads it (owner 2026-10-14, step 4) */}
                    <span className="serifline el-teasetitle el-fntitle"><Use id={`fn-${elScreen.fnKey}`} className={`el-fnicon ${(m.byEl[elScreen.el].role === 'friction' || m.byEl[elScreen.el].coreExcess) ? 'friction' : 'catalyst'}`} />{elScreen.elName} is your {elScreen.fnLabel}.</span>
                    <span className="el-teasep" style={{ marginTop: 2 }}>{elScreen.verdict}</span>
                    {/* the personality keywords close the text block (owner
                        2026-09-02: below the paragraph, like the cover) */}
                    {m.byEl[elScreen.el].adj?.length ? (
                      <span className="wd-adj el-fnadj">{m.byEl[elScreen.el].adj.map((a) => <span key={a} className={`wd-adjchip${(m.byEl[elScreen.el].role === 'friction' || m.byEl[elScreen.el].coreExcess) ? ' down' : ''}`}>{a}</span>)}</span>
                    ) : null}
                    <span className="readcirc sm el-goarrow"><Use id="ico-arrow-r" /></span>
                  </button>
                )}
                {/* (the BAND-C band card "How your core is running" retired 2026-10-17,
                    owner: "Remove the band card from the energy reading page. That page
                    is already packed." Its 30 texts hibernate in the station.) */}
                {(DOMAINS_V2 || DEPTH_V1) && dm ? (
                  <div className="cardstock el-tease dl-elcard">
                    <span className="laylab">THE DOMAINS</span>
                    <span className="serifline el-teasetitle">What {elScreen.elName} rules in your life</span>
                    <DomainTiles dm={dm} el={elScreen.el} elName={elScreen.elName} onOpen={(d) => openDomain(d, 'element')} Use={Use} DOM={DOM} />
                    <span className="body2 dl-sub" style={{ display: 'block', marginTop: 6 }}>Each tile opens the full domain, with every seat that rules it, from any energy.</span>
                  </div>
                ) : elFaces.length ? (
                  <button className="cardstock el-tease goa" onClick={() => openSec('dom')}>
                    <span className="laylab">THE DOMAINS</span>
                    <span className="serifline el-teasetitle">{elScreen.domTitle}</span>
                    {/* the named positions lead (the Nebula principle): each
                        seat = term + 1–2 domain chips + its own teaser line */}
                    {elPositions.map((p) => (
                      <span className="el-posrow" key={p.id}>
                        <span className="el-posterm">{p.term}</span>
                        <span className="el-adj el-poschips">{p.domains.slice(0, 2).map((d) => <span key={d} className="el-domchip">{d}</span>)}</span>
                        <span className="el-teasep el-posteaser">{p.teaser || p.defline}</span>
                      </span>
                    ))}
                    {!elPositions.length && (
                      <span className="el-teasep" style={{ marginTop: 0 }}>{elScreen.elName} holds no seat in your pillars. It reaches you through the hidden stems, felt more than placed.</span>
                    )}
                    <span className="readcirc sm el-goarrow"><Use id="ico-arrow-r" /></span>
                  </button>
                ) : null}
                </>)}
                {V5_LIVE ? <AcrossChart name={elScreen.elName} L={depth?.chapters} today={v5Today} Use={Use} onChapters={() => openDepth('chapters', null, 'element')} onToday={onOpenToday} /> : null}
              </div></div>
            </div>
          )}

          {/* ── element section detail (the teaser cards' destination) ── */}
          {elScreen && elSec && (
            <div className={`jscreen${screen === 'elsec' ? ' active' : ''}`} data-screen="elsec">
              <div className="plateimg a-plate-rice" /><div className="eltint" />
              <button className="backrow" aria-label={`Back to ${elScreen.name}`} onClick={() => goScreen('element')}>
                <span className="bico"><Use id="ico-chev-l" /></span>
                <span className="bl el-back">{elScreen.name} · {elSec === 'mech' ? 'THE MECHANISM' : elSec === 'fn' ? 'THE FUNCTION' : 'THE DOMAINS'}</span>
              </button>
              <div className="scrollwrap"><div className="padv2">
                {elSec === 'mech' && elScreen.mech && (
                  <div className="cardstock el-mech">
                    <span className="laylab">THE MECHANISM</span>
                    <span className="serifline el-teasetitle">{elScreen.mechTitle}</span>
                    {/* the classical register (owner 2026-09-02): 汉字 epigraph
                        → the classic's poetic rendering → the state turn.
                        (Thumbnail removed — it already covers rungs above.) */}
                    {elScreen.mech.classic && <p className="el-classic" aria-hidden="true">「{elScreen.mech.classic}」</p>}
                    <p className="body2 el-mechbase" style={{ margin: '8px 0 0' }}>{elScreen.mech.base}</p>
                    {elScreen.mech.turn && (
                      <div className="el-mechturn" style={{ borderLeft: `3px solid var(--${elScreen.el}Deep)` }}>
                        <span className="laylab el-verdlab" style={{ fontWeight: 600, color: `var(--${elScreen.el}Deep)` }}>{elScreen.mech.turnLab}</span>
                        <p className="body2" style={{ margin: 0 }}>{elScreen.mech.turn}</p>
                      </div>
                    )}
                  </div>
                )}
                {elSec === 'fn' && elScreen.fnReading && (
                  <div className="cardstock el-fncard">
                    <span className="laylab">THE FUNCTION</span>
                    {/* THE FUNCTION GLYPH (owner 2026-10-14, step 4 of the
                        Function section): a thin line glyph of an everyday
                        object leads the title, tinted by pole, the same mark
                        on the element page's tile and in the keyword sheet's
                        band, so the function is learned as a picture before
                        the word. */}
                    <span className="serifline el-teasetitle el-fntitle"><Use id={`fn-${elScreen.fnKey}`} className={`el-fnicon ${(m.byEl[elScreen.el].role === 'friction' || m.byEl[elScreen.el].coreExcess) ? 'friction' : 'catalyst'}`} />{elScreen.elName} is your {elScreen.fnLabel}.</span>
                    {/* The verdict no longer opens this page (owner 2026-10-14:
                        "get rid of the opener before the chips"); it stays as
                        the FUNCTION tile's tease on the element page. The
                        definition follows the title directly, function first
                        (the three-beat construct, D14), and the chips come
                        after it. */}
                    {EJ_LIVE ? (
                      <div className="ej-fnrow">
                        <ArtSlot src={FN_ART(elScreen.fnKey)} className="ej-fnart" alt={`${elScreen.fnLabel}, painted`} />
                        <p className="body2 el-fnbody">{elScreen.fnReading.define}</p>
                      </div>
                    ) : <p className="body2 el-fnbody" style={{ margin: '8px 0 0' }}>{elScreen.fnReading.define}</p>}
                    {/* THE CHARACTER (owner 2026-10-14, the eyebrow rulings):
                        the page is three moves under three eyebrows, THE
                        FUNCTION (what it is), THE CHARACTER (how it runs in
                        you: the bars, then the keywords) and THE REMEDY or
                        THE ADVICE (what to do). The character's title line is
                        pole-specific, the state the chart gives this energy. */}
                    {!EJ_LIVE && (<>
                    <span className="laylab" style={{ display: 'block', marginTop: 16 }}>THE CHARACTER</span>
                    {/* The opening (owner 2026-10-16): the pole as the glossary pill
                        (a tap defines it), a two-word verdict echoing the edge
                        (use it) or the remedy (release it), and a direction mark
                        between release and grow, in place of the "Running thin /
                        full" state and the longer manual line. */}
                    {/* THE AMOUNT (owner 2026-10-17, Q1 a · Q2 a · Q3 a): how much of
                        this energy the chart holds, as the overview hero's own
                        five-energy bar, number and bar only (no volume word), on
                        every energy's page, the core included (its pill carries
                        the state). */}
                    <div className="el-amount" aria-label={`${elScreen.elName}: ${m.byEl[elScreen.el].presence}% of your chart`}>
                      <span className="el-amount-row"><span className="el-amount-lab">{elScreen.elName} in your chart</span><b className="el-amount-pct">{m.byEl[elScreen.el].presence}%</b></span>
                      <span className="el-amount-track" aria-hidden="true">
                        {towers.map((t) => (
                          t.presence > 0
                            ? <i key={t.el} style={{ width: `${t.presence}%`, background: t.el === elScreen.el ? `var(--${t.el}Deep)` : `color-mix(in srgb, var(--${t.el}Deep) 22%, var(--silkDeep))` }} />
                            : <i key={t.el} style={{ width: '2%', background: t.el === elScreen.el ? `var(--${t.el}Deep)` : 'transparent' }} />
                        ))}
                      </span>
                    </div>
                    {(() => { const c = elScreen.fnReading.characterLine; const k = c.pole === 'catalyst' ? 'cat' : c.pole === 'friction' ? 'fric' : 'cond'; return (
                      <div className={`el-charrow dir-${c.dir}`}>
                        <span className={`role-pill ${k} el-charpill`} role="button" tabIndex={0} onClick={() => setFnOpen(k)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFnOpen(k); } }}>{k === 'cat' ? <><Use id="ar-up" />Catalyst</> : k === 'fric' ? <><Use id="ar-down" />Friction</> : <><Use id={m.condition === 'Overfueled' ? 'ic-charged' : m.condition === 'Underfueled' ? 'ic-receptive' : 'ic-balanced'} />{m.condition}</>}</span>
                        <span className="serifline el-charverdict">{c.verdict}</span>
                        {/* the direction mark: the bars' own language, one dot on a
                            two-ended track between release and grow */}
                        <span className="el-chardir" aria-label={c.dir === 'grow' ? 'Grow this energy' : c.dir === 'release' ? 'Release this energy' : 'Keep this energy as it is'}>
                          <span className="el-chardir-lab">Release</span>
                          <span className="el-chardir-track"><i /></span>
                          <span className="el-chardir-lab">Grow</span>
                        </span>
                      </div>
                    ); })()}
                    {/* THE FUNCTION METRICS (owner 2026-10-14; REA_19): the
                        three bars open the character section; the bars lead
                        into the keywords. */}
                    <MetricBars m={elScreen.fnReading.metrics} />
                    </>)}
                    {/* THE GOD-GRAIN READING (owner 2026-09-03, three-doors
                        fashion; both corpora complete 2026-09-04, v3 fallback
                        retired): chip row (the scannable summary) → define ¶
                        → the dominance-WEIGHTED keyword LEDGER (each row a
                        full-sentence door variant, rotated so no two adjacent
                        rows enter the same way; the polarity blend renders
                        unlabeled) → advise ¶. The dips coda is RETIRED
                        (cross-function lines = TG_PATTERN territory, in
                        station __ore) — the reading ends with the advise. */}
                    {/* THE KEYWORDS (owner 2026-10-14, the chip expansion): the
                        ledger no longer renders on the page. Each chip is a
                        button; a tap opens that keyword's passage (the one
                        angle its position assigns, as before) in a sheet over
                        the page, one keyword at a time. The verdict does NOT
                        render here (owner 2026-10-14, "Do not put the verdict
                        here"): it stays the FUNCTION tile's tease on the
                        element page, backlogged as a pending teaser
                        (backlog/2026-10-14_verdict-pending-teaser.md). */}
                    {(() => { const r = m.byEl[elScreen.el]; const pole = (r.role === 'friction' || r.coreExcess) ? 'friction' : 'catalyst'; const rows = elScreen.fnReading.ledger || []; const chips = rows.length ? rows.map((row) => ({ word: row.word, text: row.text })) : (r.adj || []).map((a) => ({ word: a, text: '' }));
                      return chips.length ? (
                        <div className="el-kwblock">
                          <span className="wd-adj el-fnadj el-kwrow">{chips.map((c) => (
                            <button key={c.word} type="button" className={`wd-adjchip el-fnchipbtn${pole === 'friction' ? ' down' : ''}`} aria-haspopup="dialog" aria-expanded={kwOpen?.word === c.word} disabled={!c.text} onClick={() => setKwOpen({ word: c.word, text: c.text, pole, fnLabel: elScreen.fnLabel, fnKey: elScreen.fnKey, elName: elScreen.elName })}>
                              <span className="el-kwword">{c.word}</span><span className="el-kwplus" aria-hidden="true">+</span>
                            </button>
                          ))}</span>
                          <span className="el-kwhint">Tap a keyword to read it.</span>
                        </div>
                      ) : null; })()}
                    {!EJ_LIVE && (<>
                    {/* THE REMEDY (owner 2026-10-14): the advice is sectioned
                        out under its own label after the ledger. On the
                        friction pole it is the remedy, opening on the energy
                        prescription ("Seek Wood, the Action energy."), the
                        life advice after it; on the catalyst pole it is the
                        advice, with no prescription. */}
                    {/* THE REMEDY BOX (owner 2026-10-14): the advice sits in a
                        tinted box, a different kind of box from the grey
                        measure panel. On the friction pole the box wears the
                        remedy energy's tint and glyph, the "Seek" sentence is
                        its title line, and a tap opens that energy's page. On
                        the catalyst pole (owner: "Same box, own glyph") the
                        box wears the page's own element, no title line, not
                        tappable. */}
                    {/* THE EDGE (owner 2026-10-15): on the catalyst pole the
                        last section is three talents, each with the bar it
                        draws on rendered as five dots from the chart, three
                        places across the life domains (the teaser for the
                        Domains tier) and one action. Re-ruled the same day to
                        the door (v4): a claim, a lead, three rows in the god's
                        ruling domains, each a tap into THE DOMAINS at that word;
                        no action. The friction page keeps THE REMEDY. Renders
                        only where the cell carries an edge. */}
                    {(() => {
                      const friction = (m.byEl[elScreen.el].role === 'friction' || m.byEl[elScreen.el].coreExcess);
                      const edge = !friction ? elScreen.fnReading.edge : null; if (!edge) return null;
                      const bars = elScreen.fnReading.metrics?.bars || [];
                      if (edge.items || edge.claim) { const b = bars.find((x) => x.key === edge.metric); return (
                        <>
                          <span className="laylab" style={{ display: 'block', marginTop: 16 }}>THE EDGE</span>
                          <div className={`el-remedybox pv-${elScreen.el} cat el-edgebox`}>
                            {/* The head (owner 2026-10-16, E1): the remedy's head with the
                                arrow turned up. The kicker is the character's verb, the name
                                the page's own energy at the title size, the function beneath,
                                the ring large; the bar's level as dots on the right. */}
                            {(() => { const verb = elScreen.fnReading.characterLine?.verb || 'use'; return (
                              <span className="el-remedyhead">
                                <span className="el-remedyring lg" aria-hidden="true"><Use id={`el-${elScreen.el}`} /></span>
                                <span className="el-remedytitles f">
                                  <span className="el-remedykicker up"><Use id="ar-up" />{verb}</span>
                                  <span className="serifline el-remedytitle xl">{elScreen.elName}</span>
                                  <span className="el-remedyname">the {elScreen.fnLabel} energy</span>
                                </span>
                                {b && <span className="el-edge-dots head" aria-label={`${b.label}: level ${b.level} of 5`}>{[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= b.level ? 'on' : ''} />)}</span>}
                              </span>
                            ); })()}
                            {edge.items ? (
                              <>
                                {edge.lead && <span className="body2 el-fnbody el-remedybody">{edge.lead}</span>}
                                {/* THE DOORS (owner 2026-10-16): the three ruling domains as the
                                    section's hero, each a ceremonial button into the Domains tier;
                                    under each a bridge phrase, not advice; one transition line. */}
                                <div className="el-edge-doors" role="group" aria-label="Your domains">
                                  {edge.items.map((it) => (
                                    <button key={it.domain} type="button" className="el-edge-door" aria-haspopup="dialog" onClick={() => (DOMAINS_V2 || DEPTH_V1 ? openDomain(it.domain, DEPTH_V1 ? 'elsec' : 'element') : openDomainSheet(it.domain, edge.god))}>
                                      <span className="el-edge-doorring" aria-hidden="true"><Use id={DOM[it.domain] || DOM[String(it.domain).toLowerCase()] || 'dom-career'} /></span>
                                      <span className="el-edge-doorname">{it.domain}</span>
                                      {tier === 'free' && !DEPTH_V1 ? <span className="el-edge-doorlock" aria-label="Opens with Seeker"><Use id="ico-lock" /></span> : <span className="el-edge-doorlock open" aria-hidden="true"><Use id="ico-chev-r" /></span>}
                                    </button>
                                  ))}
                                </div>

                              </>
                            ) : (
                              <>
                                <span className="body2 el-fnbody el-remedybody">{edge.body}</span>
                                {(b || edge.domains.length > 0) && (
                                  <span className="el-edge-foot">
                                    {b && <span className="el-edge-footitem"><span className="el-edge-bar">{b.label}</span></span>}
                                    {edge.domains.map((d) => <span key={d} className="el-edge-footitem"><span className="el-edge-footic" aria-hidden="true"><Use id={DOM[d] || 'dom-career'} /></span><span className="el-edge-dom">{d}</span></span>)}
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        </>
                      ); }
                      return (
                        <>
                          <span className="laylab" style={{ display: 'block', marginTop: 16 }}>THE EDGE</span>
                          <span className="serifline el-teasetitle">What this makes you good at.</span>
                          <ul className="el-edge-list">
                            {edge.talents.map((t) => { const b = bars.find((x) => x.key === t.metric); return (
                              <li key={t.label} className="el-edge-talent">
                                <span className="el-edge-ic" aria-hidden="true"><Use id="ico-spark" /></span>
                                <span className="el-edge-body"><span className="el-edge-head"><b className="el-edge-label">{t.label}</b>{b && <span className="el-edge-dots" aria-label={`${b.label}: level ${b.level} of 5`}>{[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= b.level ? 'on' : ''} />)}<span className="el-edge-bar">{b.label}</span></span>}</span><span className="el-edge-line">{t.line}</span></span>
                              </li>); })}
                          </ul>
                          <span className="el-edge-sub">Where it pays</span>
                          <ul className="el-edge-list">
                            {edge.places.map((p) => (
                              <li key={p.domain} className="el-edge-place">
                                <span className="el-edge-ic dom" aria-hidden="true"><Use id={DOM[p.domain] || 'dom-career'} /></span>
                                <span className="el-edge-body"><span className="el-edge-dom">{p.domain}</span><span className="el-edge-line">{p.line}</span></span>
                              </li>))}
                          </ul>
                          {edge.action && <p className="body2 el-edge-action"><span className="el-edge-ic act" aria-hidden="true"><Use id="ico-arrow-r" /></span>{edge.action}</p>}
                        </>
                      );
                    })()}
                    {elScreen.fnReading.advise && !(elScreen.fnReading.edge && !(m.byEl[elScreen.el].role === 'friction' || m.byEl[elScreen.el].coreExcess)) && (() => {
                      const friction = (m.byEl[elScreen.el].role === 'friction' || m.byEl[elScreen.el].coreExcess);
                      const rem = friction ? elScreen.fnReading.remedy : null;
                      const boxEl = rem?.el || elScreen.el;
                      const canGo = !!(rem && m.byEl[rem.el]);
                      const Box = canGo ? 'button' : 'div';
                      return (
                        <>
                          <span className="laylab" style={{ display: 'block', marginTop: 16 }}>{friction ? 'THE REMEDY' : 'THE ADVICE'}</span>
                          <Box className={`el-remedybox pv-${boxEl}${friction ? ' fric' : ' cat'}${canGo ? ' goa' : ''}`} {...(canGo ? { type: 'button', onClick: () => goElement(rem.el), 'aria-label': `Open the ${rem.name} energy page` } : {})}>
                            <span className="el-remedyhead">
                              <span className={`el-remedyring${rem ? ' lg' : ''}`} aria-hidden="true"><Use id={`el-${boxEl}`} /></span>
                              {/* The title echoes THE CHARACTER's verb (owner 2026-10-16):
                                  "Seek Fire to channel Metal." The sought energy's
                                  function rides beneath as the small line. */}
                              {/* The title (owner 2026-10-16, formula F): the energy to seek
                                  is the hero, its glyph large, the character's verb above it
                                  as a kicker with the down arrow, its function beneath. The
                                  name never exceeds the page's titles (16.5px). */}
                              {rem ? (() => { const verb = elScreen.fnReading.characterLine?.verb || 'release'; return (
                                <span className="el-remedytitles f">
                                  <span className="el-remedykicker"><Use id="ar-down" />{verb} {elScreen.elName} through</span>
                                  <span className="serifline el-remedytitle xl">{rem.name}</span>
                                  {rem.fn && <span className="el-remedyname">the {rem.fn} energy{rem.el === m.core.el ? ', your own' : ''}</span>}
                                </span>
                              ); })() : <span className="el-remedyname">{elScreen.elName}, the {elScreen.fnLabel} energy</span>}
                              {canGo && <span className="el-remedygo" aria-hidden="true"><Use id="ico-chev-r" /></span>}
                            </span>
                            <span className="body2 el-fnbody el-remedybody">{rem ? rem.rest : elScreen.fnReading.advise}</span>
                          </Box>
                        </>
                      );
                    })()}
                    </>)}
                  </div>
                )}
                {elSec === 'dom' && elFaces.length ? (
                  <div className="cardstock">
                    <span className="laylab">THE DOMAINS</span>
                    <span className="serifline el-teasetitle">{elScreen.domTitle}</span>
                    {EJ_LIVE && dm ? (<>
                      <DomainMap dm={dm} el={elScreen.el} Use={Use} DOM={DOM} />
                      <DomainTiles dm={dm} el={elScreen.el} elName={elScreen.elName} onOpen={(d) => openDomain(d, 'elsec')} Use={Use} DOM={DOM} />
                    </>) : null}
                    {/* order (owner 2026-08-19): THE SEATS first (the Position
                        axis does the talking) → the gods last, as the
                        supplementary "who runs it" layer. */}
                    {elPositions.length ? (
                      <div className="elpos">
                        <span className="elpos-lead">{elPositions.length === 1 ? 'Its seat in your pillars:' : 'Its seats in your pillars:'}</span>
                        {elPositions.map((p) => (
                          <div className={`elpos-row acc${posOpen === p.id ? ' open' : ''}`} key={p.id}>
                            <button className="elpos-head" aria-expanded={posOpen === p.id} onClick={() => { setDeepOpen(false); setPosOpen((v) => (v === p.id ? null : p.id)); }}>
                              {EJ_LIVE ? <ArtSlot src={PERSONA_ART(p.god || '')} className="ej-seal" alt={p.term} /> : null}
                              <span className="elpos-slot">{p.slotZh}</span>
                              <span className="elpos-term">{p.term}<span className="elpos-zh">{p.termZh}</span></span>
                              <Use id="ico-chev-r" className="elpos-chev" />
                            </button>
                            {posOpen === p.id && (
                              <div className="elpos-body">
                                {/* revelation ladder (owner 2026-09-01): the
                                    READING LEADS — chips + defline demoted to
                                    the free tier (Seeker's reading declares
                                    its domains in its own first sentence).
                                    Seeker anatomy (POS-D): summary → domain
                                    ¶s (pattern woven, turn as tone modifier)
                                    → deeper layers → the god bridge. */}
                                {tier !== 'free' ? (() => {
                                  const pat = p.pattern;
                                  const patText = pat ? `${pat.reading}${pat.fusedLine ? ` ${pat.fusedLine}` : ''}` : null;
                                  const weaveDomain = pat && p.domainReadings
                                    ? Object.keys(p.domainReadings).find((d) => pat.targets.includes(d)) || null
                                    : null;
                                  const turn = elScreen.dx?.condition === 'Overfueled' ? p.turnFriction
                                    : elScreen.dx?.condition === 'Underfueled' ? p.turnCatalyst : null;
                                  {/* two-stage disclosure (DES_04 §AM.11,
                                      rungs ⑤/⑥): Stage A = summary + domain
                                      ¶s (pattern woven, turn as tone
                                      modifier); "the deeper layers" reveals
                                      Stage B = chapter · people · shadow ·
                                      body. */}
                                  return (
                                    <>
                                      <p className="elpos-reading">{p.reading}</p>
                                      {p.domainReadings && Object.entries(p.domainReadings).map(([d, txt]) => (
                                        <p className="elpos-domread" key={d} data-dom={d}><b className="el-funclab">{d}.</b> {txt}{weaveDomain === d ? ` ${patText}` : ''}</p>
                                      ))}
                                      {patText && !weaveDomain && (
                                        <p className="elpos-domread">{patText}</p>
                                      )}
                                      {turn && (
                                        <p className="elpos-domread elpos-turn">{turn}</p>
                                      )}
                                      {!deepOpen ? (
                                        <button className="elpos-deeper" onClick={() => setDeepOpen(true)}>The deeper layers <Use id="ico-chev-r" /></button>
                                      ) : (
                                        <>
                                          {/* W5 (R4 A): the old chapter line gives way to the chapter's energy line, in the reader's tense */}
                                          {(depth?.chapters?.energy ? depth.chapters.chapters.find((c) => c.key === p.gateKey)?.energyU?.text : p.lifeChapter) && (
                                            <p className="elpos-domread"><b className="el-funclab">{p.chapter}.</b> {depth?.chapters?.energy ? depth.chapters.chapters.find((c) => c.key === p.gateKey).energyU.text : p.lifeChapter}</p>
                                          )}
                                          {p.relations && (
                                            <p className="elpos-domread"><b className="el-funclab">The people.</b> {p.relations}</p>
                                          )}
                                          {p.shadowLine && (
                                            <p className="elpos-domread"><b className="el-funclab">The shadow.</b> {p.shadowLine}</p>
                                          )}
                                          {p.healthLine && (
                                            <p className="elpos-domread"><b className="el-funclab">The body.</b> {p.healthLine}</p>
                                          )}
                                        </>
                                      )}
                                    </>
                                  );
                                })() : (
                                  <>
                                    {/* free-tier Stage A teaser (DES_04 §AM.11
                                        softener, owner 2026-08-19): chips +
                                        defline (the free surface) + the summary
                                        reading's declaration sentence + a
                                        seat-specific inventory of what Seeker
                                        unlocks — derived, no new content */}
                                    <div className="el-adj">{p.domains.map((d) => <span key={d} className="el-domchip">{d}</span>)}</div>
                                    <p className="elpos-defline">{p.defline}</p>
                                    <p className="elpos-reading">{firstSent(p.reading)}</p>
                                    <p className="body2 el-domlock" style={{ margin: '8px 0 0' }}>With Seeker this seat opens in full: the reading, {p.domains.join(', ')}, {p.chapter ? `your ${p.chapter.replace('The ', '').toLowerCase()}, ` : ''}the people, the shadow, and the body.</p>
                                  </>
                                )}
                                {/* the god bridge (owner 2026-09-01): the god is
                                    introduced FROM the position — opens and
                                    scrolls to its collapsed block below */}
                                <button className="elpos-deeper elpos-godlink" onClick={() => { setGodOpen(p.god); setTimeout(() => document.getElementById(`elgod-${p.god}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60); }}>
                                  About {p.term.replace(/ (at|inside) the .*$/, '')}, who holds this seat <Use id="ico-chev-r" />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="elpos-none">This energy holds no seat in your pillars. It reaches you through the hidden stems, felt more than placed.</p>
                    )}
                    {/* the ten-god layer, introduced AFTER the positions
                        (owner 2026-08-19) — and COLLAPSED by default (owner
                        2026-09-01: supplementary teaching is opt-in; the
                        heads still teach persona + function at a glance) */}
                    <span className="laylab el-wholab">WHO RUNS IT</span>
                    {elFaces.map((f) => (
                      <div className={`elpos-row acc${godOpen === f.god ? ' open' : ''}`} key={f.god} id={`elgod-${f.god}`}>
                        <button className="elpos-head" aria-expanded={godOpen === f.god} onClick={() => setGodOpen((v) => (v === f.god ? null : f.god))}>
                          <span className="elpos-term"><span className="elgod-name"><b>{f.persona}</b> · {f.god}{elFaces.length > 1 ? <span className="el-godshare-in"> · {f.share}%</span> : null}</span><span className="elpos-zh">runs your {f.fnLabel} · {f.keyword.toLowerCase()}</span></span>
                          <Use id="ico-chev-r" className="elpos-chev" />
                        </button>
                        {godOpen === f.god && (
                          <div className="elpos-body">
                            <p className="el-teasegoddef" style={{ display: 'block', margin: '0 0 6px' }}>{f.defline}</p>
                            {f.fnLine && (
                              <p className="body2 el-funcrow" style={{ margin: '0 0 6px' }}><b className="el-funclab">Runs your {f.fnLabel}.</b> {f.fnLine}</p>
                            )}
                            <div className="el-adj">{f.domains.map((d) => <span key={d} className="el-domchip">{d}</span>)}</div>
                            {f.readings && tier !== 'free' && (
                              <div className="el-domreads">
                                {Object.entries(f.readings).map(([d, txt]) => (
                                  <p className="body2" key={d} style={{ margin: '9px 0 0' }}><b>{d}.</b> {txt}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                    {tier === 'free' && elFaces.some((f) => f.readings) && (
                      <p className="body2 el-domlock" style={{ margin: '9px 0 0' }}>The full readings of each domain open with Seeker.</p>
                    )}
                  </div>
                ) : null}
              </div></div>
            </div>
          )}

          {/* ── THE DEPTH: a domain page By position, and the four section pages ── */}
          {DEPTH_V1 && domView && (
            <div className={`jscreen${screen === 'domain' ? ' active' : ''}`} data-screen="domain">
              <div className="plateimg a-plate-rice" /><div className="eltint" />
              <button className="backrow" aria-label="Back" onClick={() => depthBack(domFrom)}>
                <span className="bico"><Use id="ico-chev-l" /></span>
                <span className="bl el-back">{(domFrom === 'element' || domFrom === 'elsec') && elScreen ? `${elScreen.name} · ` : 'YOUR DOMAINS · '}{domView.domain.toUpperCase()}</span>
              </button>
              <div className="scrollwrap"><div className="padv2 dp-pad">
                {V5_LIVE ? (
                  <LeafReader key={domView.domain} id={`domain-${domView.domain}`} title={domView.domain} Use={Use}
                    units=".dp-head, .dp-step, .dp-seats > .dp-seat, .dp-seats > .dp-gaprow, .dp-dec, .dp-yr" pinned=".dp-tabs">
                    <DomainReadingPage v={domView} positions={allPositions} age={depth.chapters.age} hourUnknown={hourUnknown} tier={tier} onUpgrade={openUpgrade} onChapters={() => openDepth('chapters', null, 'domain')} Use={Use} DOM={DOM} />
                  </LeafReader>
                ) : (
                <DomainReadingPage key={domView.domain} v={domView} positions={allPositions} age={depth.chapters.age} hourUnknown={hourUnknown} tier={tier} onUpgrade={openUpgrade} onChapters={() => openDepth('chapters', null, 'domain')} Use={Use} DOM={DOM} />
                )}
              </div></div>
            </div>
          )}
          {depth && DEPTH_SCREENS.map((name) => (
            <div key={name} className={`jscreen${screen === name ? ' active' : ''}`} data-screen={name}>
              <div className="plateimg a-plate-rice" /><div className="eltint" />
              <button className="backrow" aria-label="Back" onClick={() => depthBack(depthFrom === name ? 'catalogue' : depthFrom)}>
                <span className="bico"><Use id="ico-chev-l" /></span>
                <span className="bl el-back">{DEPTH_BACK[name]}</span>
              </button>
              <div className="scrollwrap"><div className="padv2 dp-pad">
                {V5_LIVE ? (
                  <LeafReader id={name} title={V5_TITLE[name]} route={`section:${name}`} Use={Use}
                    units={V5_UNITS[name]}
                    next={V5_ORDER[name] ? { label: V5_TITLE[V5_ORDER[name]], title: v5Next[V5_ORDER[name]], art: SECTION_ART[V5_ORDER[name]], onGo: () => openDepth(V5_ORDER[name], null, 'catalogue') } : null}>
                {name === 'domains' && <DomainsHubPage dm={depth.dm} Use={Use} DOM={DOM} onOpen={(d) => openDepth('domain', d, 'domains')} />}
                {name === 'chapters' && <ChaptersPage L={depth.chapters} positions={allPositions} hourUnknown={hourUnknown} tier={tier} onUpgrade={openUpgrade} onOpenDomain={(d) => openDepth('domain', d, 'chapters')} onOpenStars={() => openDepth('stars', null, 'chapters')} onDiscoverHour={onDiscoverHour} Use={Use} />}
                {name === 'stars' && <StarsPage S={depth.stars} tier={tier} onUpgrade={openUpgrade} Use={Use} />}
                {name === 'blueprint' && <BlueprintPage B={depth.blueprint} tier={tier} onUpgrade={openUpgrade} seek={m.seek.map((x) => x.el)} ease={m.skip.map((x) => x.el)} Use={Use} />}
                  </LeafReader>
                ) : (<>
                {name === 'domains' && <DomainsHubPage dm={depth.dm} Use={Use} DOM={DOM} onOpen={(d) => openDepth('domain', d, 'domains')} />}
                {name === 'chapters' && <ChaptersPage L={depth.chapters} positions={allPositions} hourUnknown={hourUnknown} tier={tier} onUpgrade={openUpgrade} onOpenDomain={(d) => openDepth('domain', d, 'chapters')} onOpenStars={() => openDepth('stars', null, 'chapters')} onDiscoverHour={onDiscoverHour} Use={Use} />}
                {name === 'stars' && <StarsPage S={depth.stars} tier={tier} onUpgrade={openUpgrade} Use={Use} />}
                {name === 'blueprint' && <BlueprintPage B={depth.blueprint} tier={tier} onUpgrade={openUpgrade} seek={m.seek.map((x) => x.el)} ease={m.skip.map((x) => x.el)} Use={Use} />}
                </>)}
              </div></div>
            </div>
          ))}

          {/* ── a domain page (DOM-1, owner 2026-10-17) ── */}
          {DOMAINS_V2 && domPage && (
            <div className={`jscreen${screen === 'domain' ? ' active' : ''}`} data-screen="domain">
              <div className="plateimg a-plate-rice" /><div className="eltint" />
              <button className="backrow" aria-label="Back" onClick={() => goScreen(domFrom === 'element' && elScreen ? 'element' : 'catalogue')}>
                <span className="bico"><Use id="ico-chev-l" /></span>
                <span className="bl el-back">{domFrom === 'element' && elScreen ? `${elScreen.name} · ` : 'YOUR DOMAINS · '}{domPage.domain.toUpperCase()}</span>
              </button>
              <div className="scrollwrap"><div className="padv2">
                <DomainPage page={domPage} dm={dm} positions={allPositions} tier={tier} onUpgrade={openUpgrade} onDiscoverHour={onDiscoverHour} Use={Use} DOM={DOM} />
              </div></div>
            </div>
          )}
        </div>
      </div>
      {/* wheel-dot float — the energy-reading entry card (REA_02 §5d) */}
      {/* THE MERGE: one energy sheet for every energy tap; it stays open
          behind an energy page or a domain reading and is there on back */}
      {MERGE_V1 && merged && sheetEl && screen === 'catalogue' && (
        <EnergySheet row={merged.rows[sheetEl]} first={merged.first === sheetEl} Use={Use} DOM={DOM} cover={EJ_LIVE}
          art={V5_LIVE ? elementArt(sheetEl, chart?.dayMaster?.stem) : IS_DEV_TOOLS}
          onClose={() => setSheetEl(null)}
          onRead={() => goElement(sheetEl)}
          onDomain={depth ? (d) => openDepth('domain', d, 'catalogue') : null} />
      )}
      {dot && (
        <div className="wordpop open" role="presentation">
          <div className="wp-scrim" onClick={() => setDotOpen(null)} />
          <div className={`wp-sheet wp-dotcard wp-cover ${dot.tint}`} role="dialog" aria-label={`${dot.r.name} — its reading and its relation with your core`}>
            <button className="wp-x wp-coverx" aria-label="Close" onClick={() => setDotOpen(null)}><Use id="ico-close" /></button>
            <div className="wp-inner">
              {/* THE CTA IS THE THUMBNAIL (owner 2026-09-04): the cover = one
                  tappable art object — claim, keyword chips, equation, and
                  dominance bar all composed ON it. The verdict left the cover
                  (it lives on the FUNCTION tile and the reading page); the
                  role speaks once, in the equation's conclusion. */}
              <button className="wp-thumbcta" aria-label={`Open the full ${dot.r.name} reading`}
                onClick={() => { setDotOpen(null); goElement(dot.r.el); }}>
                {heroThumbFor(dot.s, true)}
                <span className="readcirc sm wp-thumbgo"><Use id="ico-arrow-r" /></span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* THE KEYWORD SHEET (owner 2026-10-14, the chip expansion): one
          keyword at a time, the chip as its pill, the passage the page's
          rotation assigned it; closed by the scrim or the close mark. Root
          level so it tops the function page, like the glossary sheet. */}
      {kwOpen && (
        <div className="wordpop open" role="presentation">
          <div className="wp-scrim" onClick={() => setKwOpen(null)} />
          <div className={`wp-sheet ${kwOpen.pole === 'friction' ? 't-fric' : 't-cat'}`} role="dialog" aria-modal="true" aria-label={`${kwOpen.word}, in your ${kwOpen.fnLabel}`}>
            <div className="wp-band">
              <span className="wp-wm el-fnwm"><Use id={`fn-${kwOpen.fnKey}`} /></span>
              <button className="wp-x" aria-label="Close" onClick={() => setKwOpen(null)}><Use id="ico-close" /></button>
              <span className="wp-ey">{kwOpen.elName} is your {kwOpen.fnLabel}</span>
              <div className="wp-chipwrap">
                <span className={`role-pill ${kwOpen.pole === 'friction' ? 'fric' : 'cat'}`}>{kwOpen.word}</span>
              </div>
            </div>
            <div className="wp-inner">
              <p className="wp-body">{kwOpen.text}</p>
            </div>
          </div>
        </div>
      )}

      {/* THE EDGE's domain sheet (owner 2026-10-15): the first entry point to
          the domain reading from the function page — the seat's teaser, then
          the price gate (free) or the landing in THE DOMAINS (unlocked). */}
      {domSheet && (
        <div className="wordpop open" role="presentation">
          <div className="wp-scrim" onClick={() => setDomSheet(null)} />
          <div className={`wp-sheet t-cat el-domsheet pv-${domSheet.el || ''}`} role="dialog" aria-modal="true" aria-label={`${domSheet.word}, in The Domains`}>
            <div className="wp-band el-domband">
              <span className="wp-wm el-fnwm"><Use id={DOM[domSheet.word] || 'dom-career'} /></span>
              <button className="wp-x" aria-label="Close" onClick={() => setDomSheet(null)}><Use id="ico-close" /></button>
              <span className="wp-ey">The Domains · {domSheet.elName}</span>
              <div className="wp-chipwrap"><span className="role-pill cat">{domSheet.word}</span></div>
            </div>
            <div className="wp-inner">
              <p className="el-domsheet-title">{domSheet.rules ? `${domSheet.word}, read from ${domSheet.seat.term.replace(/^The /, 'the ')}.` : `${domSheet.word}, as ${domSheet.elName} touches it.`}</p>
              <p className="wp-body">{domSheet.teaser}</p>
              {tier === 'free' ? (
                <>
                  <button type="button" className="el-domsheet-cta" onClick={() => { setDomSheet(null); openUpgrade('The Domains'); }}>Unlock The Domains <span className="el-domsheet-price">{TIER_PRICES.seeker}</span></button>
                  <p className="el-domsheet-sub">All eight domains across every seat of your chart: the reading, the people, the shadow, and the body.</p>
                </>
              ) : (
                <button type="button" className="el-domsheet-cta" onClick={() => { const w = domSheet.word, g = domSheet.god; setDomSheet(null); openDomainAt(w, g); }}>{domSheet.rules ? 'Read it in The Domains' : 'Open The Domains'} <Use id="ico-arrow-r" /></button>
              )}
            </div>
          </div>
        </div>
      )}

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
            {SC_LIVE ? (
            <div className="share-card" data-var="naming" data-type={TYPE_V1 && merged?.type ? '1' : undefined} ref={cardRef}>
              {/* The share card (owner 2026-10-26, DES_15 AL: L3's column and side
                  inscription above, L2's panel below). The identity sits in a left
                  column on the mist veil with the Naming's inscription at the right;
                  the chart block (the core capsule, Release and Grow, the five on one
                  grid with their functions) sits on a paper panel anchored low. The
                  dots use UseX so the exported image keeps the element signs. */}
              <img className="sn-bg" src="/backgrounds/bg-reveal-04-mist-veil.png" alt="" />
              <span className="sn-inscr">{m.stemLit} · {m.cast.replace(/^CAST FROM /, '')}</span>
              <div className="scin">
                <div className="sn-top">
                  <div className="scey">ELEMENTUM</div>
                  <img className="sn-plate" src={paintSrc} alt={`${m.stem}, ${m.archetype}`} />
                  <div className="sn-name">You are {m.archetype}.</div>
                  {TYPE_V1 && merged?.type ? <TypeLine g={merged} className="sn-claim" /> : <p className="sn-claim">{(DM_READING[m.stem]?.claims || [])[SHARE_CLAIM_PICK[m.stem] ?? 1] || merged?.who || m.manifesto}</p>}
                </div>
                {TYPE_V1 && merged?.type ? <TypeChips m={m} g={merged} Use={UseX} InkDot={InkDot} /> : null}
                <div className="sn-panel">
                  <div className="sn-core">
                    <UseX id={`el-${m.core.el}`} className="sn-cmk" />
                    <span><b>{m.core.name}</b> is your core</span>
                    <span className="role-pill cond"><UseX id={condIcon} />{m.condition}</span>
                  </div>
                  {(() => {
                    const grouped = merged && !merged.balanced;
                    const els = grouped ? [...merged.ease, ...merged.seek] : rvlOrder.map((r) => r.el);
                    const nRel = grouped ? merged.ease.length : 0;
                    return (
                      <div className="sn-grid" style={{ gridTemplateColumns: `repeat(${els.length}, 1fr)` }}>
                        {grouped ? (
                          <>
                            <span className="sn-hdr" style={{ gridColumn: `1 / ${nRel + 1}` }}><span className="role-pill fric sn-gpill"><UseX id="ar-down" />Release</span></span>
                            <span className="sn-hdr" style={{ gridColumn: `${nRel + 1} / ${els.length + 1}` }}><span className="role-pill cat sn-gpill"><UseX id="ar-up" />Grow</span></span>
                            <span className="sn-sep" style={{ gridColumn: nRel + 1 }} />
                          </>
                        ) : (
                          <span className="sn-hdr" style={{ gridColumn: `1 / ${els.length + 1}` }}><span className="sn-gl">{merged ? 'Keep' : 'Your five energies'}</span></span>
                        )}
                        {els.map((el) => { const r = m.byEl[el]; return (
                          <span key={el} className="sn-cell">
                            <span className="sn-well"><InkDot el={el} size={Math.round(22 + 22 * (r.presence / rvlMax))} Use={UseX} label={`${r.name} ${r.presence} percent`} /></span>
                            <small>{r.presence}%</small>{r.name}
                            {merged?.rows?.[el]?.fn ? <em>{merged.rows[el].fn}</em> : null}
                            {TYPE_V1 && merged?.type ? <span className={`sn-tag${merged.type.need?.el === el ? ' need' : merged.type.mode.el === el ? '' : ' ghost'}`}>{merged.type.need?.el === el ? 'You need' : merged.type.mode.el === el ? 'Your mode' : ''}</span> : null}
                          </span>
                        ); })}
                      </div>
                    );
                  })()}
                  {TYPE_V1 && merged?.type ? <TypeCircle g={merged} onOpen={onOpenCompat ? () => { setShowShare(false); onOpenCompat(); } : null} /> : null}
                  <span className="sn-foot">{APP_HOST}</span>
                </div>
              </div>
            </div>
            ) : (
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
                <div className="sc-lit">{m.stemLit}</div>
                <div className="scbp">
                  <div className="sc-coreline">
                    <span className="sc-mk" style={{ color: `var(--${m.core.el}Deep)` }}><svg viewBox="0 0 24 24" fill="currentColor"><use href={U(`el-${m.core.el}`)} /></svg></span>
                    <span className="sc-ct"><b>{m.core.name}</b><small>is your Core</small></span>
                    <span className="sc-pill core">{m.condition}</span>
                  </div>
                  <div className="tl-cols">
                    <div className="tl-col">
                      <div className="tl-h seek"><span>Seek</span><span className="sc-pill cat"><Use id="ar-up" />Catalyst</span></div>
                      <div className="vrow">
                        {m.seek.map((r) => (
                          <div className="vcol" key={r.el}>
                            <span className="v-pc">{r.presence}%</span>
                            <span className="v-bar"><i style={{ height: `${Math.round((r.presence / pMax) * 100)}%`, background: `var(--${r.el}Deep)` }} /></span>
                            <span className="v-mk" style={{ color: `var(--${r.el}Deep)` }}><svg viewBox="0 0 24 24" fill="currentColor"><use href={U(`el-${r.el}`)} /></svg></span>
                            <span className="v-el">{r.name}</span>
                            <span className="v-noun">{fnNoun(r)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="tl-col">
                      <div className="tl-h skip"><span>Skip</span><span className="sc-pill fric"><Use id="ar-down" />Friction</span></div>
                      <div className="vrow">
                        {m.skip.map((r) => (
                          <div className="vcol" key={r.el}>
                            <span className="v-pc">{r.presence}%</span>
                            <span className="v-bar"><i style={{ height: `${Math.round((r.presence / pMax) * 100)}%`, background: `var(--${r.el}Deep)` }} /></span>
                            <span className="v-mk" style={{ color: `var(--${r.el}Deep)` }}><svg viewBox="0 0 24 24" fill="currentColor"><use href={U(`el-${r.el}`)} /></svg></span>
                            <span className="v-el">{r.name}</span>
                            {/* Both share-card columns speak the §5f FUNCTION noun
                                (owner 2026-09-01), mirroring the wheel panel. */}
                            <span className="v-noun">{fnNoun(r)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
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
