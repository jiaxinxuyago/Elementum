// ===================================================================
// ELEMENTUM · the merged "Your reading" views (owner 2026-10-18 →)
// ===================================================================
// The catalogue and the Day Master page as one page (option 1, owner
// 2026-10-18; rulings 2026-10-19 Q1–Q6 A, 2026-10-20 the wheel default and
// the condition reading Q1–Q10). On the dev build behind MERGE_V1 in
// JourneyStage until the owner sees it. The page models come from
// journeyData.buildMergedModel; the wheel itself is JourneyStage's own
// (its design unchanged), passed in with the arrows layered over it.
//
//   MergedBeats     beats 1–3: who you are · your five energies · how you
//                   run, start here, what your chart asks for
//   EnergySheet     one sheet for every energy tap (replaces the dot card)
//   RunPage         "How am I running?": the stem × band paragraph, the
//                   condition reading, the Blueprint door, the Codex panel
//   FirstReading    the eight cards after the Naming
// ===================================================================

import { useState } from 'react';
import './merged.css';

// The dial: Underfueled · Balanced · Overfueled, the needle at the score.
export function Dial({ score, condition }) {
  const s = score == null ? (condition === 'Overfueled' ? 6 : condition === 'Underfueled' ? 1 : 4) : score;
  const a = Math.PI * (1 - s / 7);
  const cx = 60; const cy = 58; const r = 44;
  const pt = (t) => [cx + r * Math.cos(Math.PI * (1 - t)), cy - r * Math.sin(Math.PI * (1 - t))];
  const arc = (t0, t1) => { const [x0, y0] = pt(t0); const [x1, y1] = pt(t1); return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`; };
  return (
    <svg className="mg-dial" viewBox="0 0 120 70" role="img" aria-label={`${condition}: ${s} of 7`}>
      <path d={arc(0.01, 0.36)} className="z-u" /><path d={arc(0.4, 0.6)} className="z-b" /><path d={arc(0.64, 0.99)} className="z-o" />
      <line x1={cx} y1={cy} x2={(cx + (r - 8) * Math.cos(a)).toFixed(1)} y2={(cy - (r - 8) * Math.sin(a)).toFixed(1)} className="needle" />
      <circle cx={cx} cy={cy} r="3.5" className="hub" />
    </svg>
  );
}

const pillOf = (row, it) => (row.pole === 'friction' ? { cls: 'fric', icon: 'ar-down', t: `Release${it ? ' it' : ''}` }
  : row.pole === 'catalyst' ? { cls: 'cat', icon: 'ar-up', t: `Grow${it ? ' it' : ''}` } : { cls: 'cond', icon: 'ic-balanced', t: 'Keep' });

function Pill({ row, it, Use }) {
  const p = pillOf(row, it);
  return <span className={`role-pill ${p.cls}`}><Use id={p.icon} />{p.t}</span>;
}

// ── beats 1–3 ─────────────────────────────────────────────────────
export function MergedBeats({ m, g, Use, sealSrc, condIcon, wheel, view, setView, onRun, onEnergy, onShare, onBirthChart }) {
  const first = g.first ? g.rows[g.first] : null;
  return (
    <>
      <div className="beat mg-beat" data-beat="1">
        <div className="idhero" data-hero="chop" data-css="idheroP">
          <div className="hero-chop">
            <div className="hc-top">
              <span className="hero-seal"><img src={sealSrc} alt={`${m.stem} ${m.archetype}`} /></span>
              <div><span className="kick">You are</span><span className="hero-arch">{m.archetype}</span></div>
              <button className="sharebtn iconly" style={{ marginLeft: 'auto', alignSelf: 'flex-start' }} aria-label="Share your identity card" onClick={onShare}><Use id="ico-share" /></button>
            </div>
            <div className="hc-man"><span className="redrule" /><p className="mani">{m.manifesto}</p></div>
            <div className="hc-foot">
              <div className="id-lit">{m.stemLit} · CAST FROM YOUR DAY OF BIRTH</div>
              {/* the hero arrow retired with the merge (owner 2026-10-20); the
                  condition pill opens "How am I running?" (Q1), Birth chart the
                  pillar chart (Q2 A, 2026-10-19) */}
              <span className="mg-hacts">
                {onBirthChart ? <button className="mg-bchart" onClick={onBirthChart}>Birth chart ›</button> : null}
                <button className="role-pill cond mg-cpill" onClick={onRun}><Use id={condIcon} />{m.condition}</button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="beat mg-beat" data-beat="2">
        <div className="cardstock mg-wtile">
          <div className="mg-wthead">
            <span className="sec-eyebrow mg-ey">YOUR FIVE ENERGIES</span>
            <div className="mg-seg" role="group" aria-label="Wheel view">
              <button type="button" aria-pressed={view === 'do'} onClick={() => setView('do')}>What they do to you</button>
              <button type="button" aria-pressed={view === 'amt'} onClick={() => setView('amt')}>By amount</button>
            </div>
          </div>
          {wheel}
          <p className="mg-whint">Tap an energy. Tap the seal for how you run.</p>
        </div>
      </div>

      <div className="beat mg-beat" data-beat="3">
        <div className="mg-tiles">
          <button className="cardstock mg-tile" onClick={onRun}>
            <span className="mg-tl">How am I running?</span>
            <Dial score={g.score} condition={g.condition} />
            <span className="mg-tt">{g.runShort}</span>
          </button>
          {first ? (
            <button className="cardstock mg-tile mg-start" onClick={() => onEnergy(first.el)}>
              <span className="mg-tl">Start here</span>
              <span className={`mg-bigglyph e-${first.el}`}><Use id={`el-${first.el}`} /></span>
              <b className="mg-tb">{first.head}</b>
              <Pill row={first} it Use={Use} />
            </button>
          ) : (
            <div className="cardstock mg-tile">
              <span className="mg-tl">Start here</span>
              <span className="mg-tt">Keep the mix: nothing needs to grow or be released.</span>
            </div>
          )}
        </div>
        <div className="cardstock mg-rx">
          <span className="mg-tl">What does my chart ask for?</span>
          {g.balanced ? <p className="mg-tt">{g.rx}</p> : (
            <>
              <div className="mg-rxline"><span className="mg-rxh fric"><Use id="ar-down" />Release</span>
                {g.ease.map((el) => <button key={el} className="mg-rxe" onClick={() => onEnergy(el)}><Use id={`el-${el}`} className={`e-${el}`} />{g.rows[el].name}{g.rows[el].isCore ? ' (you)' : ''}</button>)}</div>
              <div className="mg-rxline"><span className="mg-rxh cat"><Use id="ar-up" />Grow</span>
                {g.seek.map((el) => <button key={el} className="mg-rxe" onClick={() => onEnergy(el)}><Use id={`el-${el}`} className={`e-${el}`} />{g.rows[el].name}{g.rows[el].isCore ? ' (you)' : ''}</button>)}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// The arrows over the wheel ("What they do to you"): from the seal to each
// energy, or from the energy to the seal, in the live wheel's 320 box.
const CX = 156.4; const CY = 147.2; const R0 = 60;
export function WheelArrows({ m, g }) {
  const lines = m.els.filter((r) => !r.isCore).map((r, i) => {
    const s = r.size; const x = r.seat.left + s / 2; const y = r.seat.top + s / 2;
    const dx = x - CX; const dy = y - CY; const L = Math.hypot(dx, dy); const ux = dx / L; const uy = dy / L;
    const a = [CX + ux * R0, CY + uy * R0]; const b = [x - ux * (s / 2 + 6), y - uy * (s / 2 + 6)];
    const rel = g.rows[r.el].rel; const inward = rel === 'feeds' || rel === 'tames';
    const [p, q] = inward ? [b, a] : [a, b];
    const col = g.rows[r.el].pole === 'friction' ? 'fric' : 'cat';
    const w = Math.max(2, Math.min(6, r.presence / 5.5));
    const len = Math.hypot(q[0] - p[0], q[1] - p[1]).toFixed(1);
    return <line key={r.el} x1={p[0].toFixed(1)} y1={p[1].toFixed(1)} x2={q[0].toFixed(1)} y2={q[1].toFixed(1)} className={`mg-ar ${col}`} strokeWidth={w} markerEnd={`url(#mg-ah-${col})`} style={{ '--len': len, '--d': `${i * 90}ms` }} />;
  });
  return (
    <svg className="mg-arrows" viewBox="0 0 320 320" aria-hidden="true">
      <defs>
        <marker id="mg-ah-cat" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#4a7a52" /></marker>
        <marker id="mg-ah-fric" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#a85c48" /></marker>
      </defs>
      {lines}
    </svg>
  );
}

// ── the energy sheet ──────────────────────────────────────────────
export function EnergySheet({ row, first, Use, DOM, onClose, onRead, onDomain }) {
  if (!row) return null;
  return (
    <div className="mg-sheetwrap" role="dialog" aria-label={row.head}>
      <div className="mg-scrim" onClick={onClose} />
      <div className="mg-sheet">
        <span className="mg-grab" />
        <div className="mg-shhead">
          <span className={`mg-echip e-${row.el}`}><Use id={`el-${row.el}`} /></span>
          <span className="mg-rt"><b>{row.head}</b><small>{row.name} is your {row.fn}{row.isCore ? ' · yourself' : ''}</small></span>
          <span className="mg-rr"><Pill row={row} Use={Use} /><em>{row.presence}%</em></span>
        </div>
        <div className={`mg-ill e-${row.el}`}><Use id={`el-${row.el}`} /><span>illustration</span></div>
        {row.story ? <p className="mg-story">{row.story}</p> : null}
        {row.now || first ? <p className="mg-now">{first ? <span className="mg-start">START HERE</span> : null} {row.now || ''}</p> : null}
        <div className="mg-doms">
          {row.domains.map((d) => <button key={d} className="mg-domchip" onClick={() => onDomain(d)}><Use id={DOM[d] || 'dom-career'} />{d}<Use id="ico-chev-r" className="mg-chev" /></button>)}
        </div>
        <button className="mg-next" onClick={onRead}>Read {row.name}, your {row.fn} <Use id="ico-arrow-r" /></button>
      </div>
    </div>
  );
}

// ── "How am I running?" ───────────────────────────────────────────
export function RunPage({ m, g, nature, Use, condIcon, onBlueprint }) {
  const [codex, setCodex] = useState(false);
  const R = g.reading;
  return (
    <div className="mg-run">
      <div className="cardstock mg-runhead">
        <div className="mg-runtop"><span className="mg-tl">How am I running?</span><span className="role-pill cond"><Use id={condIcon} />{m.condition}</span></div>
        <Dial score={g.score} condition={g.condition} />
        <h2 className="mg-h">{g.runHeadline}</h2>
        {nature ? <p className="mg-nature">{nature}</p> : null}
      </div>
      {R ? (
        <div className="cardstock mg-cr">
          <h3 className="mg-h3">What {g.condition} means</h3>
          <div className="mg-sec"><span className="mg-lab">How it works</span>{R.mech.map((s) => <p key={s}>{s}</p>)}</div>
          {g.mind ? (
            <div className="mg-sec"><span className="mg-lab">On your chart</span>
              <p className="mg-you">For you, Body is <b>{g.body}</b> and Mind is <b>{g.mind}</b>.</p>
              {g.codex ? <button className="mg-link" aria-expanded={codex} onClick={() => setCodex((v) => !v)}><Use id="ic-codex" />How is this worked out? ›</button> : null}
              {codex && g.codex ? (
                <div className="mg-codex">
                  <span className="mg-lab">From the Codex · optional</span>
                  <p className="mg-vl">{g.codex.score}</p>
                  <div className="mg-tests">{g.codex.tests.map((t) => (
                    <div key={t.key} className={`mg-test ${t.ok ? 'ok' : 'no'}`}><span className="mg-tk">{t.ok ? '✓' : '✗'} {t.key}<b>{t.pts}</b></span><p>{t.text}</p></div>
                  ))}</div>
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="mg-sec">
            <div className="mg-traits">
              <div><span className="role-pill cat">Gifts</span><ul>{R.gifts.map((x) => <li key={x}>{x}</li>)}</ul></div>
              <div><span className="role-pill fric">Costs</span><ul>{R.costs.map((x) => <li key={x}>{x}</li>)}</ul></div>
            </div>
          </div>
          <div className="mg-sec"><span className="mg-lab">You will recognise it</span>
            <dl className="mg-scenes">{R.scenes.map(([k, t]) => <div key={k}><dt>{k}</dt><dd>{t}</dd></div>)}</dl>
          </div>
          <div className="mg-sec"><span className="mg-lab">What helps · {R.verb}</span>
            <p className="mg-helps">{R.helps}</p>
            {R.grow ? (
              <div className="mg-hrows">
                <span className="role-pill cat"><Use id="ar-up" />Grow</span><span>{R.grow}</span>
                <span className="role-pill fric"><Use id="ar-down" />Release</span><span>{R.release}</span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      {onBlueprint ? (
        <button className="cardstock mg-bpdoor" onClick={onBlueprint}>
          <Use id="ico-lock" className="mg-bpic" /><span>Your structure, in full: the Energy Blueprint</span>
          <span className="role-pill core">Advisor</span><Use id="ico-chev-r" className="mg-chev" />
        </button>
      ) : null}
    </div>
  );
}

// ── the first reading: eight cards after the Naming ───────────────
const DEEP = { earth: '#927750', metal: '#6A849A', fire: '#9E5540', water: '#3E5F85', wood: '#587a4d' };
export function FirstReading({ m, g, sealSrc, Use, onShare, onEnter }) {
  const [i, setI] = useState(0);
  const track = [...m.els].sort((a, b) => b.presence - a.presence);
  const cards = [
    { k: 'ink', ey: 'Your first reading', seal: true, h: `You are ${m.archetype}.`, b: g.who },
    { k: 'cond', ey: 'How you run', dial: true, h: `${g.condition}.`, b: g.runLine },
    ...g.order.map((el) => ({ k: el, el })),
    { k: 'ink', ey: 'What your chart asks for', h: g.rx, b: g.start, end: true },
  ];
  const n = cards.length;
  const go = (d) => setI((v) => Math.max(0, Math.min(n - 1, v + d)));
  const c = cards[i];
  const dark = c.k === 'ink' || c.k === 'cond';
  const tap = (e) => {
    if (e.target.closest('button')) return;
    const r = e.currentTarget.getBoundingClientRect();
    go((e.clientX - r.left) < r.width / 3 ? -1 : 1);
  };
  const row = c.el ? g.rows[c.el] : null;
  return (
    <div className={`mg-fr t-${c.k}${dark ? ' dark' : ''}`} onClick={tap} role="group" aria-label="Your first reading"
      tabIndex={0} onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); }}>
      <div className="mg-prog">{cards.map((_, k) => <i key={k} className={k <= i ? 'on' : ''} />)}</div>
      <button className="mg-skip" onClick={onEnter}>Skip</button>
      <div className="mg-card" key={i}>
        {row ? (
          <>
            <span className="mg-sk">{row.head}</span>
            <span className={`mg-sglyph e-${row.el}`}><Use id={`el-${row.el}`} /></span>
            <span className="mg-sfn">{row.name} is your {row.fn}</span>
            <div className="mg-dbar"><span className="mg-dtrack">{track.map((t) => (t.presence > 0.5
              ? <i key={t.el} style={{ width: `${t.presence}%`, background: t.el === row.el ? DEEP[t.el] : `color-mix(in srgb, ${DEEP[t.el]} 40%, #ECE2C9)` }} />
              : <i key={t.el} className="gh" style={{ width: '2%' }} />))}</span><b>{row.presence}%</b></div>
            <h3 className="mg-have">{row.presenceLine}</h3>
            <p>{row.teaser}</p>
            <Pill row={row} it Use={Use} />
          </>
        ) : (
          <>
            <span className="mg-sk">{c.ey}</span>
            {c.seal ? <img className="mg-sseal" src={sealSrc} alt="" /> : null}
            {c.dial ? <Dial score={g.score} condition={g.condition} /> : null}
            <h3>{c.h}</h3>
            {c.b ? <p>{c.b}</p> : null}
            {c.end ? (
              <div className="mg-send">
                <button className="mg-next light" onClick={onShare}><Use id="ico-share" />Share your reading</button>
                <button className="mg-next" onClick={onEnter}>Enter your reading <Use id="ico-arrow-r" /></button>
              </div>
            ) : null}
            {i === 0 ? <span className="mg-hint">Tap to continue</span> : null}
          </>
        )}
      </div>
    </div>
  );
}
