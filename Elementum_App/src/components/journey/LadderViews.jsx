// ===================================================================
// ELEMENTUM · the revelation on the explanation ladder (RS3)
// ===================================================================
// Owner EV1–EV5 A (2026-11-06) and the words ruled for all ten stems
// (2026-11-13). Brief: Design/Library/Design_Pass_2026-10/
// RS3_Revelation_Ladder_Brief.md. Replaces the words and the order of the
// painted first reading (RS2); the paintings, slots and layout law carry over.
// Nine cards after the Naming: who the stem is, the five energies as one
// model, how you run, one card per energy (heaviest first, the need last),
// then the type and its circle. Every line comes from content/ladder.js,
// the type model or the locked stem lines; none is written here.
// Rides TYPE_V1 with the type (JourneyStage passes it in).
// ===================================================================
import { useState } from 'react';
import { LADDER, STEM_LADDER, LADDER_NOTICE_BAND, ladderTry } from '../../content/ladder.js';
import { Dial, Pill, plateOf } from './MergedViews.jsx';
import { dmArt, dmStage, stripArt, useArtSrc, ArtTodo } from './inkArt.jsx';
export { Taichi } from './Taichi.jsx';

// the five washes (Ink_Painting_System.md): the dominance bar's segments
const WASH = { metal: '#8ba3b8', wood: '#7a9e6e', fire: '#c4745a', earth: '#b89a6a', water: '#5a7fa8' };
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
// a stem's own version of a shared row, else the shared row
const rowOf = (stem, table, fn, band) => STEM_LADDER[stem]?.overrides?.[`${table}.${fn}.${band}`] ?? LADDER[table]?.[fn]?.[band];
const needPhrase = (stem, fn) => STEM_LADDER[stem]?.overrides?.[`need_phrase.${fn}`] ?? LADDER.need_phrase[fn];
// "Earth is the ground…" → the first word carries the weight
const Lead = ({ text }) => { const k = (text || '').indexOf(' '); return k > 0 ? <><b>{text.slice(0, k)}</b>{text.slice(k)}</> : text; };

export function LadderReading({ m, g, claims = [], Use, InkDot, onShare, onEnter, start = 0 }) {
  const [i, setI] = useState(start);   // `start`: the DevBar opens a card directly
  const sl = STEM_LADDER[m.stem] || {};
  const t = g.type;
  const coreEl = m.core.name;
  // heaviest first, the need last; a Balanced chart has no need
  const order = [...m.els].sort((a, b) => b.presence - a.presence).map((r) => r.el);
  const energyOrder = g.first ? [...order.filter((el) => el !== g.first), g.first] : order;
  const cards = [{ k: 'who' }, { k: 'model' }, { k: 'cond' }, ...energyOrder.map((el) => ({ k: el, el })), { k: 'rx' }];
  const n = cards.length;
  const go = (d) => setI((v) => Math.max(0, Math.min(n - 1, v + d)));
  const c = cards[i];
  const tap = (e) => {
    if (e.target.closest('button')) return;
    const r = e.currentTarget.getBoundingClientRect();
    go((e.clientX - r.left) < r.width / 3 ? -1 : 1);
  };
  const row = c.el ? g.rows[c.el] : null;
  const strip = useArtSrc(row ? stripArt(m.stem, row.el) : null, null);
  const side = !!(row && strip.painted);
  const cond = LADDER.condition[g.condition] || LADDER.condition.Balanced;
  const need = t?.need ? g.rows[t.need.el] : null;
  const bar = (lit) => (
    <span className="mg-dbar" aria-hidden="true">
      {m.els.map((r) => <i key={r.el} className={!lit || r.el === lit ? 'on' : ''} style={{ flex: Math.max(r.presence, 2), background: WASH[r.el] }} />)}
    </span>
  );
  return (
    <div className={`mg-fr painted ladder t-${c.el ? 'energy' : c.k}${side ? ' side' : ''}`} onClick={tap} role="group" aria-label="Your first reading"
      tabIndex={0} onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); }}>
      <div className="mg-frg" aria-hidden="true">
        {c.k === 'who' ? <img className="mg-frsign" src={dmArt(m.stem, 1)} alt="" /> : null}
        {c.k === 'rx' ? <img className="mg-frstage s2" src={dmStage(m.stem)} alt="" /> : null}
        {c.k === 'cond' ? <img className="mg-frd3" src={dmArt(m.stem, 3)} alt="" /> : null}
        {side ? <img className="mg-frstrip" src={strip.src} alt="" /> : null}
      </div>
      <div className="mg-prog">{cards.map((_, k) => <i key={k} className={k <= i ? 'on' : ''} />)}</div>
      <button className="mg-skip" onClick={onEnter}>Skip</button>
      <div className="mg-card" key={i}>
        {c.k === 'who' ? (
          <>
            {/* the core energy's sign leads the card (owner 2026-11-14: "put it up as the main visual element") */}
            <span className="ld-coresign"><InkDot el={m.core.el} size={156} Use={Use} label={`${coreEl}, your core energy`} /><span className="mg-sk">{coreEl} · your core energy</span></span>
            <span className="mg-sk">{m.archetype}</span>
            <h3>{LADDER.element_heading[coreEl]}</h3>
            <p>{sl.as_line} You might notice:</p>
            <ul className="ld-list">
              {[sl.behaviour, ...claims.slice(0, 2)].filter(Boolean).map((x) => <li key={x}>{x}</li>)}
            </ul>
            <p className="ld-contrast">{sl.contrast}</p>
            {m.inscription ? <p className="ld-seal">{m.inscription}</p> : null}
            <span className="mg-hint">Tap to continue</span>
          </>
        ) : c.k === 'model' ? (
          <>
            <span className="ld-you">
              <img src={plateOf(m.stem)} alt={m.archetype} />
              <span><span className="mg-sk">What you&apos;re made of</span><b>{m.archetype} · {m.stem}</b></span>
            </span>
            <h3>{LADDER.model_heading}</h3>
            <div className="ld-rows">
              {energyOrder.map((el) => { const r = g.rows[el]; return (
                <span key={el} className="ld-row">
                  <InkDot el={el} size={34} Use={Use} label={r.name} />
                  <span>
                    <span className="ld-rn"><b>{r.name}, your {r.fn}</b><em>{r.presence}%</em></span>
                    <span className="ld-rd">{LADDER.function_short[r.fn]}</span>
                  </span>
                </span>
              ); })}
            </div>
            {bar(null)}
            <p className="mg-quiet">{LADDER.model_close}</p>
          </>
        ) : c.k === 'cond' ? (
          <>
            <span className="mg-sk">How you run</span>
            <Dial score={g.score} condition={g.condition} />
            <h3>{cond.heading}</h3>
            <p>{cond.body}</p>
            <p className="ld-try"><b>Try this:</b> {cond.try}</p>
          </>
        ) : row ? (
          <>
            {strip.painted ? null : <ArtTodo path={stripArt(m.stem, row.el)} className="mg-todo" />}
            <span className="mg-signrow">
              <InkDot el={row.el} size={52} Use={Use} label={row.name} />
              <span className="mg-sk">{row.name} · your {row.fn}</span>
            </span>
            <p className="ld-r1"><Lead text={row.isCore ? sl.self_nature : LADDER.nature_pair[coreEl]?.[row.name]} /></p>
            <p className="ld-r2"><Lead text={LADDER.function_plain[row.fn]} /></p>
            <span className="ld-inyou">
              <span className="ld-lab">In you<em>{row.presence}% of your chart</em></span>
              {bar(row.el)}
            </span>
            <p className="ld-r3">{rowOf(m.stem, 'in_you', row.fn, row.volume)}</p>
            <p className="ld-r4"><span className="ld-lab">You might notice</span>{cap(rowOf(m.stem, 'notice', row.fn, LADDER_NOTICE_BAND[row.volume]))}</p>
            <p className="ld-try"><Pill row={row} it Use={Use} />{ladderTry(row.fn, row.pole, row.volume)}</p>
          </>
        ) : (
          <>
            <span className="mg-sk">Your type</span>
            <h3 className="mg-tyname">{t.name}</h3>
            <p className="ld-mode">{LADDER.mode_plain[t.mode.fn]}</p>
            {need ? (
              <>
                <p>{LADDER.need_pattern.replace('{Mode}', t.mode.fn).replace('{El}', need.name).replace('{phrase}', needPhrase(m.stem, need.fn))}</p>
                <p className="ld-try"><span className="role-pill cat"><Use id="ar-up" />Start here</span>{ladderTry(need.fn, 'catalyst', g.rows[need.el]?.volume)}</p>
              </>
            ) : null}
            {/* a Balanced chart's circle: its Bond (BC1 A, 2026-11-14) */}
            <span className="ld-circ">
              <span className="ld-cp">{(need ? t.circle.fuel : [t.circle.bond]).map((x) => <img key={x.stem} src={plateOf(x.stem)} alt={x.archetype} />)}</span>
              <span>{t.circle.head}.{need ? ` ${LADDER.circle_close}` : ''}</span>
            </span>
            <div className="mg-send">
              <button className="mg-next" onClick={onEnter}>Enter your reading <Use id="ico-arrow-r" /></button>
              <button className="mg-next ghost" onClick={onShare}><Use id="ico-share" />Share your type</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
