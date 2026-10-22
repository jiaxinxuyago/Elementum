// ===================================================================
// ELEMENTUM · V5 "The Combination" (owner rulings 2026-10-21, DES_15:
// R1–R11 A; built straight into elementum.life, owner: "in one shot")
// ===================================================================
// Layout only: every word on these surfaces comes from the existing models
// and pages; nothing here authors reading content.
//
//   LeafReader   any long page read as cards (R2): tap the right two-thirds
//                to go on, the left third to go back; "Read it all as one
//                page" shows the page as it was. Units are picked by CSS
//                selector from the page's own DOM, so the pages themselves
//                (owned by the content sessions) are untouched.
//   AlbumHub     Your reading (R1, R4, R8, R10): identity strip, the wheel,
//                a read line, and teaser tiles sized by weight.
//   Balance      the opening of "How am I running?" (R11).
//   EnergyPager  sideways paging between the five energy pages (R5).
//   AcrossChart  the energy followed across the chart, closing its page.
//   ContinueCard "Continue reading" on Today (R3, R7).
// Read state lives in localStorage (per device), like the wheel view.
// ===================================================================

import { useEffect, useState } from 'react';
import { Dial } from './MergedViews.jsx';
import { LifeLine } from './DepthViews.jsx';
import './v5.css';

import { markRead, markSeenReading, V5_SECTIONS } from './v5State.js';
import { LeafReader, ContinueCard, SECTION_ART, minutesOf, useReadMap } from './V5Reader.jsx';

export { LeafReader, ContinueCard, SECTION_ART, markRead };

// ── the album hub ──────────────────────────────────────────────────
const DOT = (el) => `/concept-arts/dots/dotf-${el}.png`;

export function InkDot({ el, size = 40, Use, label }) {
  return (
    <span className="v5-dot" style={{ width: size, height: size, backgroundImage: `url('${DOT(el)}')` }} aria-label={label}>
      <Use id={`el-${el}`} />
    </span>
  );
}

export function AlbumHub({ m, g, depth, positions, hourUnknown, sealSrc, condIcon, wheelTile, onRun, onEnergy, onOpen, onBirthChart, Use, DOM }) {
  const read = useReadMap();
  const [mins, setMins] = useState({});
  useEffect(() => {
    const t = setTimeout(() => {
      const o = {};
      ['run', 'domains', 'chapters', 'stars', 'blueprint'].forEach((s) => {
        const el = document.querySelector(`.jscreen[data-screen="${s}"] .lf-body`) || document.querySelector(`.jscreen[data-screen="${s}"] .padv2`);
        if (el) o[s] = minutesOf(el.textContent.length);
      });
      setMins(o);
    }, 400);
    return () => clearTimeout(t);
  }, [depth]);
  useEffect(() => { markSeenReading(); }, []);
  const first = g.first ? g.rows[g.first] : null;
  const ids = Object.keys(V5_SECTIONS).filter((k) => k !== 'energies' || true);
  const done = ids.filter((k) => read[k]).length;
  const left = ['run', 'domains', 'chapters', 'stars', 'blueprint'].filter((k) => !read[k]).reduce((a, k) => a + (mins[k] || 0), 0);
  const stamp = (k) => (read[k] ? <span className="v5-stamp" aria-label="Read">{m.stem}</span> : <span className="v5-unread" aria-label="Not read yet" />);
  const L = depth?.chapters; const S = depth?.stars; const Bp = depth?.blueprint; const dm = depth?.dm;
  const top = dm ? dm.pages.filter((p) => p.seats.length).slice(0, 2) : [];
  const tie = top.length === 2 && top[0].seats.length === top[1].seats.length;
  const chapName = L ? L.chapters.find((c) => c.key === L.gateNow)?.name.replace(/^The /, '') : '';
  return (
    <div className="v5-hub">
      <div className="v5-id">
        <span className="v5-idseal"><img src={sealSrc} alt="" /></span>
        <div className="v5-idnm"><span className="kick">You are</span><b>{m.archetype}</b></div>
        <span className="v5-idact">
          {onBirthChart ? <button type="button" className="mg-bchart" onClick={onBirthChart}>Birth chart ›</button> : null}
          <button type="button" className="role-pill cond mg-cpill" onClick={onRun}><Use id={condIcon} />{m.condition}</button>
        </span>
      </div>
      <p className="v5-mani">{m.manifesto}</p>
      {wheelTile}
      <div className="v5-readline"><span>{done} of {ids.length} read</span><span className="v5-rlprog"><i style={{ width: `${(done / ids.length) * 100}%` }} /></span><span>{left ? `${left} min left` : 'All read'}</span></div>
      <div className="v5-bento">
        <button type="button" className="v5-bt" onClick={onRun}>
          {stamp('run')}
          <span className="v5-ey">How am I running?</span>
          <span className="v5-dial"><Dial score={g.score} condition={g.condition} /></span>
          <span className="v5-ft"><span className="v5-ftt">{g.runShort}</span>{mins.run ? <em> · {mins.run} min</em> : null}</span>
        </button>
        {first ? (
          <button type="button" className="v5-bt" onClick={() => onEnergy(first.el)}>
            {stamp('energies')}
            <span className="v5-ey">Start here</span>
            <span className="v5-center"><InkDot el={first.el} size={54} Use={Use} /></span>
            <b className="v5-cl sm">{first.head}</b>
            <span className={`role-pill ${first.pole === 'friction' ? 'fric' : 'cat'}`}><Use id={first.pole === 'friction' ? 'ar-down' : 'ar-up'} />{first.pole === 'friction' ? 'Release it' : 'Grow it'}</span>
          </button>
        ) : (
          <div className="v5-bt"><span className="v5-ey">Start here</span><span className="v5-ft">{g.rx}</span></div>
        )}
        {!g.balanced ? (
          <div className="v5-bt wide v5-asks">
            <span className="v5-ey">What does my chart ask for?</span>
            <div className="v5-rx">
              <span className="v5-rxg"><span className="v5-rxl fric"><Use id="ar-down" />Release</span>{g.ease.map((el) => <button type="button" key={el} className="v5-rxb" onClick={() => onEnergy(el)} aria-label={`${g.rows[el].name}: open its sheet`}><InkDot el={el} size={30} Use={Use} /></button>)}</span>
              <span className="v5-rxg"><span className="v5-rxl cat"><Use id="ar-up" />Grow</span>{g.seek.map((el) => <button type="button" key={el} className="v5-rxb" onClick={() => onEnergy(el)} aria-label={`${g.rows[el].name}: open its sheet`}><InkDot el={el} size={30} Use={Use} /></button>)}</span>
            </div>
          </div>
        ) : null}
        {dm ? (
          <button type="button" className="v5-bt wide tall art" onClick={() => onOpen('domains')}>
            <span className="v5-art" style={{ backgroundImage: `url('${SECTION_ART.domains}')` }} />{stamp('domains')}
            <span className="v5-ey">Your domains</span>
            <b className="v5-cl">{tie ? `${top[0].domain} and ${top[1].domain} carry the most weight in your life` : `${top[0]?.domain} carries the most weight in your life`}</b>
            <span className="v5-doms">{dm.pages.map((p) => <span key={p.domain} className={top.includes(p) ? 'hv' : ''}><Use id={DOM[p.domain] || 'dom-career'} />{p.domain}</span>)}</span>
            <span className="v5-ft">{mins.domains ? `${mins.domains} min` : ''}<span className="readcirc sm"><Use id="ico-arrow-r" /></span></span>
          </button>
        ) : null}
        {L ? (
          <button type="button" className="v5-bt wide tall art" onClick={() => onOpen('chapters')}>
            <span className="v5-art" style={{ backgroundImage: `url('${SECTION_ART.chapters}')` }} />{stamp('chapters')}
            <span className="v5-ey">Your life chapters</span>
            <b className="v5-cl">You are in your {chapName}{L.current ? ` · ${/^[AEIOU]/.test(L.current.persona) ? 'an' : 'a'} ${L.current.persona} decade` : ''}</b>
            <span className="v5-life"><LifeLine positions={positions} age={L.age} hourUnknown={hourUnknown} /></span>
            <span className="v5-ft">{mins.chapters ? `${mins.chapters} min` : ''}<span className="readcirc sm"><Use id="ico-arrow-r" /></span></span>
          </button>
        ) : null}
        {S ? (
          <button type="button" className="v5-bt tall art" onClick={() => onOpen('stars')}>
            <span className="v5-art" style={{ backgroundImage: `url('${SECTION_ART.stars}')` }} />{stamp('stars')}
            <span className="v5-ey">Your stars</span>
            <b className="v5-cl sm">{S.claim.text}</b>
            <span className="v5-ft">{mins.stars ? `${mins.stars} min` : ''}<span className="readcirc sm"><Use id="ico-arrow-r" /></span></span>
          </button>
        ) : null}
        {Bp ? (
          <button type="button" className="v5-bt tall art" onClick={() => onOpen('blueprint')}>
            <span className="v5-art" style={{ backgroundImage: `url('${SECTION_ART.blueprint}')` }} />{stamp('blueprint')}
            <span className="v5-ey">Your blueprint</span>
            <b className="v5-cl sm">{Bp.title.replace(/ · .*/, '')}<span className="v5-zh"> · {Bp.zh}</span></b>
            <span className="v5-ft"><span className="role-pill core">Advisor</span><span className="readcirc sm"><Use id="ico-arrow-r" /></span></span>
          </button>
        ) : null}
      </div>
    </div>
  );
}

// ── "How am I running?" opens on the balance (R11) ─────────────────
export function Balance({ m, g, sealSrc, fnNoun, Use }) {
  const adds = m.els.filter((r) => ['Body', 'Mind'].includes(fnNoun(r)));
  const spends = m.els.filter((r) => !adds.includes(r));
  const over = g.condition === 'Overfueled'; const under = g.condition === 'Underfueled';
  const tone = (side) => (over ? (side === 'adds' ? 'fric' : 'cat') : under ? (side === 'adds' ? 'cat' : 'fric') : 'cond');
  const side = (rows, k, label) => (
    <div className={`v5-bside ${tone(k)}`}>
      <span className="v5-blab">{label}</span>
      <span className="v5-bdots">{rows.map((r) => <InkDot key={r.el} el={r.el} size={Math.round(26 + (r.presence / 100) * 30)} Use={Use} label={`${r.name} ${r.presence}%`} />)}</span>
      <span className="v5-bnames">{rows.map((r) => `${fnNoun(r)} ${r.presence}%`).join(' · ')}</span>
    </div>
  );
  return (
    <div className="v5-balance" aria-label="What adds to you, and what spends you">
      {side(adds, 'adds', 'Adds to you')}
      <div className="v5-bmid"><img src={sealSrc} alt="" /><Dial score={g.score} condition={g.condition} /></div>
      {side(spends, 'spends', 'Spends you')}
    </div>
  );
}

// ── the energy pager (R5) ──────────────────────────────────────────
export function EnergyPager({ order, el, names, onGo, Use }) {
  const i = order.indexOf(el);
  const prev = order[(i + order.length - 1) % order.length];
  const nxt = order[(i + 1) % order.length];
  return (
    <div className="v5-pager">
      <button type="button" onClick={() => onGo(prev)} aria-label={`Previous energy: ${names[prev]}`}><Use id="ico-chev-l" />{names[prev]}</button>
      <span className="v5-pdots" aria-label={`${i + 1} of ${order.length}`}>{order.map((e) => <i key={e} className={e === el ? 'on' : ''} style={e === el ? { background: `var(--${e}Deep)` } : undefined} />)}</span>
      <button type="button" onClick={() => onGo(nxt)} aria-label={`Next energy: ${names[nxt]}`}>{names[nxt]}<Use id="ico-chev-r" /></button>
    </div>
  );
}
export function useSwipe(ref, onLeft, onRight) {
  useEffect(() => {
    const n = ref.current; if (!n) return undefined;
    let x0 = null; let y0 = null;
    const down = (e) => { const t = e.touches ? e.touches[0] : e; x0 = t.clientX; y0 = t.clientY; };
    const up = (e) => {
      if (x0 === null) return; const t = e.changedTouches ? e.changedTouches[0] : e;
      const dx = t.clientX - x0; const dy = t.clientY - y0; x0 = null;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6) { if (dx < 0) onLeft(); else onRight(); }
    };
    n.addEventListener('touchstart', down, { passive: true }); n.addEventListener('touchend', up);
    return () => { n.removeEventListener('touchstart', down); n.removeEventListener('touchend', up); };
  }, [ref, onLeft, onRight]);
}

// ── the energy, followed across the chart ──────────────────────────
export function AcrossChart({ name, L, today, Use, onChapters, onToday }) {
  const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s);
  const dec = L?.strip ? L.strip.filter((s) => cap(s.el) === name) : [];
  const t = today || {};
  const hits = [['day', 'Today', t.day], ['month', 'This month', t.month], ['year', 'This year', t.year]].filter(([, , e]) => e && cap(e) === name);
  if (!dec.length && !hits.length) return null;
  return (
    <div className="cardstock el-tease v5-across">
      <span className="laylab">{name.toUpperCase()} ACROSS YOUR CHART</span>
      {dec.length ? (
        <button type="button" className="v5-arow" onClick={onChapters}>
          <span className="v5-alab">When it comes</span>
          <span className="v5-aval">{L.strip.map((s) => <span key={s.startAge} className={cap(s.el) === name ? 'on' : ''}><InkDot el={s.el.toLowerCase()} size={cap(s.el) === name ? 26 : 18} Use={Use} /><small>{s.startAge}</small></span>)}</span>
          <span className="v5-anote">{dec.length === 1 ? `Your decade from ${dec[0].startAge} carries ${name}.` : `Your decades from ${dec.map((d) => d.startAge).join(', ').replace(/, ([^,]*)$/, ' and $1')} carry ${name}.`}</span>
        </button>
      ) : null}
      {hits.length ? (
        <button type="button" className="v5-arow" onClick={onToday}>
          <span className="v5-alab">When it returns</span>
          <span className="v5-anote">{hits.map(([, l]) => l).join(', ').replace(/, ([^,]*)$/, ' and $1')} {hits.length > 1 ? 'carry' : 'carries'} {name}. Open your Almanac.</span>
        </button>
      ) : null}
    </div>
  );
}

