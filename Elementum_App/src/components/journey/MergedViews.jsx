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
//   FirstReading    the eight cards after the Naming, on the Naming's ground
// ===================================================================

import { TYPE_LINE } from '../../content/mergedReading.js';
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
      {/* Presentation attributes beside the classes: the card export (html-to-image)
          drops the stylesheet's stroke rules on these paths, so the zones vanished
          from the exported Run chip (design session, 2026-10-27). */}
      <path d={arc(0.01, 0.36)} className="z-u" fill="none" stroke="#c9d8e6" strokeWidth="9" /><path d={arc(0.4, 0.6)} className="z-b" fill="none" stroke="#ddd2b8" strokeWidth="9" /><path d={arc(0.64, 0.99)} className="z-o" fill="none" stroke="#e8c7b9" strokeWidth="9" />
      <line x1={cx} y1={cy} x2={(cx + (r - 8) * Math.cos(a)).toFixed(1)} y2={(cy - (r - 8) * Math.sin(a)).toFixed(1)} className="needle" stroke="#2b2722" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="3.5" className="hub" fill="#2b2722" />
    </svg>
  );
}

// ── THE TYPE (owner 2026-10-27, M1–M6 A) ─────────────────────────
// The four chips (Archetype, Run, Mode, Needs) and the circle (Fuel, Bond,
// Mirror), shared by the share card and the album hero. The seals are the
// painted stem plates; Run is the album's dial; Mode and Needs are ink dots.
const STEM_PY = { 甲: 'jia', 乙: 'yi', 丙: 'bing', 丁: 'ding', 戊: 'wu', 己: 'ji', 庚: 'geng', 辛: 'xin', 壬: 'ren', 癸: 'gui' };
const STEM_ELK = { 甲: 'wood', 乙: 'wood', 丙: 'fire', 丁: 'fire', 戊: 'earth', 己: 'earth', 庚: 'metal', 辛: 'metal', 壬: 'water', 癸: 'water' };
export const plateOf = (stem) => `/concept-arts/stems/proc/${STEM_PY[stem]}-${STEM_ELK[stem]}.png`;

// The Day Master journey's art slots (A1–A4 A, 2026-10-27): D1–D3 per stem and
// the 25 pair paintings (N1 brief). Each renders its file by path once it lands
// and is a quiet frame until then. D1–D3 are painted (F2 xieyi, 2026-10-27) and
// sit in the card's paper (InkArt): multiplied onto the cardstock, edges masked,
// D1 bleeding off the top, D2 a column the text flows around, D3 closing the card.
const dmArt = (stem, n) => `/concept-arts/stems/dm/${STEM_PY[stem]}-d${n}.png`;
// the screen's stage: one ground painting per stem under the cards, so short cards never float over bare paper (owner 2026-10-27: no empty space over 40%)
export const dmStage = (stem) => `/concept-arts/stems/dm/${STEM_PY[stem]}-stage.png`;
const pairArt = (stem, el) => `/concept-arts/pairs/pair_${STEM_ELK[stem]}_${el}.png`;
function ArtSlot({ src, ratio, label }) {
  const [miss, setMiss] = useState(false);
  return (
    <span className={`dmp-art${miss ? ' miss' : ''}`} style={{ aspectRatio: ratio }}>
      {miss ? <span className="dmp-artl">{label}</span> : <img src={src} alt="" loading="lazy" onError={() => setMiss(true)} />}
    </span>
  );
}

function InkArt({ src, kind }) {
  const [miss, setMiss] = useState(false);
  if (miss) return null;
  return <img className={`dmp-ink ${kind}`} src={src} alt="" loading="lazy" onError={() => setMiss(true)} />;
}

function TyChip({ k, cls = '', doors, stamp, children }) {
  return doors?.[k]
    ? <button type="button" className={`ty-chip door ${cls}`} onClick={doors[k]}>{stamp?.(k)}{children}</button>
    : <span className={`ty-chip ${cls}`}>{children}</span>;
}

export function TypeChips({ m, g, Use, InkDot, doors = null, stamp = null }) {
  // On the album (K1 A, 2026-10-27) each chip is a door: Archetype → the first
  // reading, Run → How am I running?, Mode and Needs → their energy pages.
  // On the share card (no doors) they are labels.
  const t = g.type;
  return (
    <div className={`ty-chips${t.need ? '' : ' n3'}`} aria-label={t.name}>
      <TyChip k="archetype" doors={doors} stamp={stamp}><small>Archetype</small><span className="ty-cv"><img src={plateOf(m.stem)} alt="" /></span><b>{m.archetype}</b></TyChip>
      <TyChip k="run" doors={doors} stamp={stamp}><small>Run</small><span className="ty-cv"><Dial score={g.score} condition={g.condition} /></span><b>{g.condition}</b>{g.score != null ? <em>{g.score} of 7</em> : null}</TyChip>
      <TyChip k="mode" doors={doors} stamp={stamp}><small>Mode</small><span className="ty-cv"><InkDot el={t.mode.el} size={30} Use={Use} label={`${t.mode.name} ${t.mode.presence} percent`} /></span><b>{t.mode.fn}</b><em>{t.mode.name} {t.mode.presence}%</em></TyChip>
      {t.need ? <TyChip k="needs" cls="need" doors={doors} stamp={stamp}><small>Needs</small><span className="ty-cv"><InkDot el={t.need.el} size={30} Use={Use} label={`${t.need.name} ${t.need.presence} percent`} /></span><b>{t.need.name}</b><em>{t.need.fn} {t.need.presence}%</em></TyChip> : null}
    </div>
  );
}

// ── THE DAY MASTER PAGE (owner 2026-10-27) ─────────────────────────
// The Archetype chip's door: every Day Master field the stations hold for the
// reader's stem, on one page. STEM: archetype_name, pinyin, manifesto, the
// Sign (dm_overview), your nature (the inscription as its opener, yourNature_desc
// the band-invariant baseline, dm_claims under it), the five energies (one gift
// or shadow face per energy from the revived pools), dm_mechanism. The type and
// the circle close it, with the doors on.
export function DayMasterPage({ m, g, dm, Use, InkDot, onRun, onCircle, onReplay, onEnergy }) {
  const t = g.type;
  return (
    <div className="dmp">
      <div className="cardstock dmp-head dmp-sec">
        <img className="dmp-plate" src={plateOf(m.stem)} alt={`${m.stem}, ${m.archetype}`} />
        <span className="dmp-ya">You are</span>
        <h2 className="dmp-name">{m.archetype}</h2>
        <span className="dmp-lit">{m.stemLit}</span>
        {m.manifesto ? <p className="dmp-mani">{m.manifesto}</p> : null}
      </div>
      {dm.overview ? (
        <div className="cardstock dmp-sec dmp-inked"><InkArt src={dmArt(m.stem, 1)} kind="sign" /><span className="mg-lab">The sign</span><p className="dmp-body">{dm.overview}</p></div>
      ) : null}
      {dm.nature || dm.inscription ? (
        <div className="cardstock dmp-sec">
          <span className="mg-lab">Your nature</span>
          {/* the inscription opens the portrait (owner 2026-10-27: "What people notice is just an opener to Your Nature"); the D2 column floats beside both */}
          <div className="dmp-flow">
            <InkArt src={dmArt(m.stem, 2)} kind="nature" />
            {dm.inscription ? <p className="dmp-ins">{dm.inscription}</p> : null}
            {dm.nature ? <p className="dmp-body">{dm.nature}</p> : null}
          </div>
          {dm.claims?.length ? <><span className="mg-lab dmp-sub">What people notice</span><ul className="dmp-claims">{dm.claims.map((c) => <li key={c}>{c}</li>)}</ul></> : null}
        </div>
      ) : null}
      {g.faces?.length ? (
        <div className="cardstock dmp-sec dmp-five">
          <span className="mg-lab">Through your five energies</span>
          <p className="dmp-lead">{(g.balanced ? TYPE_LINE.five.balanced : TYPE_LINE.five.lead).replace('{the archetype}', m.archetype.replace(/^The /, 'the '))}</p>
          {[['friction', 'Release', 'fric', 'ar-down'], ['catalyst', 'Grow', 'cat', 'ar-up'], ['balanced', 'Keep', 'cond', 'ic-balanced']].map(([pole, label, cls, ic]) => {
            const list = g.faces.filter((f) => f.pole === pole);
            if (!list.length) return null;
            return (
              <div key={pole} className="dmp-group">
                <span className={`role-pill ${cls}`}><Use id={ic} />{label}</span>
                {list.map((f) => (
                  <button type="button" key={f.el} className={`dmp-face${f.cell ? ' d' : ''}`} onClick={onEnergy ? () => onEnergy(f.el) : undefined}>
                    <span className="dmp-fdot"><InkDot el={f.el} size={40} Use={Use} label={`${f.name} ${f.presence} percent`} /></span>
                    {f.cell ? (
                      // W1–W3 A: the function as the title, three chips in the Grow/Release colours, the paragraph
                      <span className="dmp-ftx">
                        <span className="dmp-ftitle">{f.fn}<em>{f.name} · {f.presence}%</em><span className="dp-draft">draft</span><Use id="ico-arrow-r" className="dmp-go" /></span>
                        <ArtSlot src={pairArt(m.stem, f.el)} ratio="3 / 2" label={`Pair · ${f.name}`} />
                        <span className="dmp-chips">{f.cell.adj.map((a) => <span key={a} className={`wd-adjchip${f.pole === 'friction' ? ' down' : ''}`}>{a}</span>)}</span>
                        <span className="dmp-fd">{f.cell.p}</span>
                      </span>
                    ) : (
                      <span className="dmp-ftx">
                        <span className="dmp-fey">{f.fn} · {f.name} {f.presence}% · {f.kind === 'shadows' ? 'shadow' : 'gift'}<Use id="ico-arrow-r" className="dmp-go" /></span>
                        <b>{f.phrase}</b>
                        <span className="dmp-fd">{f.desc}</span>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      ) : null}
      {dm.edge ? (
        <div className="cardstock dmp-sec dmp-inked"><span className="mg-lab">How your edge is built</span><p className="dmp-body">{dm.edge}</p><InkArt src={dmArt(m.stem, 3)} kind="edge" /></div>
      ) : null}
      {t ? (
        <div className="cardstock dmp-sec">
          <span className="mg-lab">Your type · {t.name}</span>
          <TypeLine g={g} className="dmp-tline" />
          <div className="dmp-doors">
            <button type="button" className="mg-link" onClick={onRun}><Use id="ico-arrow-r" />How am I running?</button>
            {onCircle ? <button type="button" className="mg-link" onClick={onCircle}><Use id="ico-arrow-r" />{t.circle.cta}</button> : null}
            {onReplay ? <button type="button" className="mg-link" onClick={onReplay}><Use id="ico-arrow-r" />Replay your first reading</button> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function TypeLine({ g, className = '' }) {
  const t = g.type; const cut = t.line.indexOf('. ');
  return <p className={`ty-line ${className}`}><b>{t.line.slice(0, cut + 1)}</b>{t.line.slice(cut + 1)}</p>;
}

export function TypeCircle({ g, onOpen }) {
  const c = g.type.circle;
  const Cell = onOpen ? 'button' : 'span';
  const cell = (k, label, list, name) => (
    <Cell key={k} className="ty-cc" {...(onOpen ? { type: 'button', onClick: onOpen } : {})}>
      <span className="ty-ch">{label}</span>
      <span className="ty-cp">{list.map((x) => <img key={x.stem} src={plateOf(x.stem)} alt={x.archetype} />)}</span>
      <span className="ty-cn">{name}</span>
    </Cell>
  );
  const plural = (a) => `${a.replace(/^The /, '')}s`;
  return (
    <div className="ty-circle">
      {c.fuel.length ? cell('fuel', 'Fuel', c.fuel, c.fuel.map((x) => plural(x.archetype)).join(' & ')) : null}
      {cell('bond', 'Bond', [c.bond], c.bond.archetype)}
      {cell('mirror', 'Mirror', [c.mirror], plural(c.mirror.archetype))}
    </div>
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
export function EnergySheet({ row, first, Use, DOM, art = false, onClose, onRead, onDomain, cover = false }) {
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
        {/* the illustration slot: a placeholder on the dev site only, until the
            pair art exists */}
        {typeof art === 'string'
          ? <div className={`mg-ill v5-plate e-${row.el}`} style={{ backgroundImage: `url('${art}')` }} role="img" aria-label={`${row.name}, painted`} />
          : art ? <div className={`mg-ill e-${row.el}`}><Use id={`el-${row.el}`} /><span>illustration</span></div> : null}
        {row.story ? <p className="mg-story">{row.story}</p> : null}
        {/* the cover (owner 2026-10-22, DES_15 EJ2 A): the sheet keeps the sign,
            the head, the function, the state, the plate and the story, with the
            law's picture line as its caption; the now line and the domain chips
            return on the page as the state rung and the domains rung. */}
        {cover ? (row.cycle ? <span className="mg-cyc">{row.cycle}</span> : null) : (<>
          {row.now || first ? <p className="mg-now">{first ? <span className="mg-start">START HERE</span> : null} {row.now || ''}</p> : null}
          <div className="mg-doms">
            {row.domains.map((d) => (onDomain
              ? <button key={d} className="mg-domchip" onClick={() => onDomain(d)}><Use id={DOM[d] || 'dom-career'} />{d}<Use id="ico-chev-r" className="mg-chev" /></button>
              : <span key={d} className="mg-domchip"><Use id={DOM[d] || 'dom-career'} />{d}</span>))}
          </div>
        </>)}
        <button className="mg-next" onClick={onRead}>Read {row.name}, your {row.fn} <Use id="ico-arrow-r" /></button>
      </div>
    </div>
  );
}

// ── "How am I running?" ───────────────────────────────────────────
export function RunPage({ m, g, nature, Use, condIcon, onBlueprint, balance = null, mani = null }) {
  const [codex, setCodex] = useState(false);
  const R = g.reading;
  return (
    <div className="mg-run">
      <div className="cardstock mg-runhead">
        <div className="mg-runtop"><span className="mg-tl">How am I running?</span><span className="role-pill cond"><Use id={condIcon} />{m.condition}</span></div>
        {/* THE TYPE (M6 A): the manifesto moves here from the album hero */}
        {mani ? <p className="mg-mani">{mani}</p> : null}
        {/* V5 (R11): the page opens on the balance — what adds to you, what spends you */}
        {balance || <Dial score={g.score} condition={g.condition} />}
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
// The first reading on the Naming's own ground (owner 2026-10-21, DES_15
// RS1–RS7 A, "Direction 1 · One ground"): paper, the distant peaks, the
// floating island, fog and a veil, under all eight cards. The seal gives way
// to the energy's ink dot in the same place, sized by presence; each energy
// is named by its function over THE FUNCTION's opening; card 8 shows the
// ribbon as two groups of dots. InkDot comes in as a prop (V5Views imports
// Dial from here, so importing it back would be a cycle).
export function FirstReading({ m, g, sealSrc, Use, InkDot, onShare, onEnter, start = 0, door = false }) {
  const [i, setI] = useState(start);   // `start`: the DevBar opens a card directly
  const pmax = Math.max(1, ...m.els.map((r) => r.presence));
  const cards = [
    { k: 'who', ey: 'Your first reading', seal: true, h: `You are ${m.archetype}.`, b: g.who },
    { k: 'cond', ey: 'How you run', dial: true, h: `You run ${g.condition}.`, b: g.runLine },
    ...g.order.map((el) => ({ k: el, el })),
    // Card 8 as the door (owner 2026-10-22, DES_15 SC1 A): where to begin, the
    // start energy lit among the five, its pair head and now line, one button.
    door
      ? { k: 'rx', ey: 'Where to begin', h: g.start || g.rx, b: g.first ? `${g.rows[g.first].head}. ${g.rows[g.first].now || ''}`.trim() : null, end: true }
      : { k: 'rx', ey: 'What your chart asks for', h: g.rx, b: g.start, end: true },
  ];
  const n = cards.length;
  const go = (d) => setI((v) => Math.max(0, Math.min(n - 1, v + d)));
  const c = cards[i];
  const tap = (e) => {
    if (e.target.closest('button')) return;
    const r = e.currentTarget.getBoundingClientRect();
    go((e.clientX - r.left) < r.width / 3 ? -1 : 1);
  };
  const row = c.el ? g.rows[c.el] : null;
  const stateOf = (r) => (r.isCore ? g.condition : r.pole === 'friction' ? 'Friction' : r.pole === 'catalyst' ? 'Catalyst' : 'Balanced');
  const groups = g.balanced
    ? [{ k: 'keep', label: 'Keep', els: g.order }]
    : [{ k: 'rel', label: 'Release', els: g.ease }, { k: 'gro', label: 'Grow', els: g.seek }];
  return (
    <div className={`mg-fr t-${c.k}`} onClick={tap} role="group" aria-label="Your first reading"
      tabIndex={0} onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); }}>
      <div className="mg-frg" aria-hidden="true">
        <img className="mg-frtop" src="/backgrounds/bg-reveal-01-distant-peaks.png" alt="" />
        <img className="mg-frbot" src="/backgrounds/bg-reveal-02-floating-island.png" alt="" />
        <span className="mg-frfog" /><span className="mg-frveil" />
      </div>
      <div className="mg-prog">{cards.map((_, k) => <i key={k} className={k <= i ? 'on' : ''} />)}</div>
      <button className="mg-skip" onClick={onEnter}>Skip</button>
      <div className="mg-card" key={i}>
        {row ? (
          <>
            <span className="mg-sk">{row.head}</span>
            <span className="mg-bigdot"><InkDot el={row.el} size={Math.round(96 + 72 * (row.presence / pmax))} Use={Use} label={`${row.name}, ${row.presence} percent`} /></span>
            <h3>{row.name} is your {row.fn} energy.</h3>
            <p>{row.fnHead || row.teaser}</p>
            <span className="mg-state"><b>{row.presence}%</b><span>· {stateOf(row)} ·</span><Pill row={row} it Use={Use} /></span>
          </>
        ) : (
          <>
            <span className="mg-sk">{c.ey}</span>
            {c.seal ? <img className="mg-sseal" src={sealSrc} alt="" /> : null}
            {c.dial ? <Dial score={g.score} condition={g.condition} /> : null}
            {c.end && door ? (
              <div className="mg-dist" aria-label={g.start || g.rx}>
                {g.order.map((el) => { const r = g.rows[el]; const lit = !g.first || el === g.first; return (
                  <span key={el} className={lit ? 'on' : 'off'}>
                    <InkDot el={el} size={Math.round(30 + 34 * (r.presence / pmax))} Use={Use} label={`${r.name}, ${r.presence} percent`} />
                    <small>{r.presence}%</small><span>{r.name}</span>
                    {g.first === el ? <em>Start here</em> : null}
                  </span>
                ); })}
              </div>
            ) : c.end ? (
              <div className="mg-rail" aria-label={g.rx}>
                {groups.map((gr) => (
                  <span key={gr.k} className={`mg-grp ${gr.k}`}>
                    <span className="mg-gl">{gr.label}</span>
                    <span className="mg-gd">{gr.els.map((el) => { const r = g.rows[el]; return (
                      <span key={el}><InkDot el={el} size={Math.round(34 + 30 * (r.presence / pmax))} Use={Use} label={`${r.name}, ${r.presence} percent`} /><small>{r.name}</small></span>
                    ); })}</span>
                  </span>
                ))}
              </div>
            ) : null}
            <h3>{c.h}</h3>
            {c.b ? <p className={c.end ? 'mg-quiet' : ''}>{c.b}</p> : null}
            {c.end ? (
              <div className="mg-send">
                <button className="mg-next" onClick={onEnter}>Enter your reading <Use id="ico-arrow-r" /></button>
                {door ? null : <button className="mg-next ghost" onClick={onShare}><Use id="ico-share" />Share your reading</button>}
              </div>
            ) : null}
            {i === 0 ? <span className="mg-hint">Tap to continue</span> : null}
          </>
        )}
      </div>
    </div>
  );
}
