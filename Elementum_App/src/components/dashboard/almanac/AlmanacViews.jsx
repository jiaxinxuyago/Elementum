// ===================================================================
// ELEMENTUM · AlmanacViews — Your Almanac, the Today tab (EVT-1)
// ===================================================================
// Rounds 1–3, all ruled (record: ComparativeAnalysis/Handoffs/
// 2026-10-19-event-signature/03_RULINGS.md). Energy first, drawn: every
// card shows one measured thing and the words explain it in a line.
// Tiers (T1 A): free reads the hub, each day's energy and its landing;
// Seeker the full Day and Month; Advisor the Year and the look-ahead.
// Dev build only until the owner rules otherwise (ALMANAC_V1).
// ===================================================================

import React from 'react';
import { useChart } from '../../../store/chartContext.jsx';
import { useUpgrade } from '../UpgradeModal.jsx';
import { JOURNEY_DEFS } from '../../journey/journeyDefs.js';
import { GATES } from '../../../content/positions.js';
import { resolveAlmanac, almanacPushCodes } from './almanacResolve.js';
import { syncPushSchedule } from '../../../infra/push.js';
import { ALMANAC_PUSH } from '../../../liveFlags.js';
import { IS_DEV_TOOLS } from '../../../devtools.js';
import { isoDay, ELEMENTS, KIND } from '../../../engine/almanac/index.js';
import './almanac.css';

const isSeeker = (t) => t === 'seeker' || t === 'advisor';
const DOMI = { Wealth: 'dom-wealth', Health: 'dom-health', Career: 'dom-career', Love: 'dom-love', Family: 'dom-family', Social: 'dom-social', Mind: 'dom-mind', Growth: 'dom-growth' };
const FNI = { Body: 'fn-body', Mind: 'fn-mind', Expression: 'fn-expression', Action: 'fn-action', Order: 'fn-order' };
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WDL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const atNoon = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d, 12); };
const fmt = (iso) => { const t = atNoon(iso); return `${t.getDate()} ${MON[t.getMonth()]}`; };

// the eight signs (G8 A), in the sprite's line weight
const SIGN = {
  clash: <path d="M13 3 6.5 13H12l-1 8 6.5-10H12l1-8Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />,
  bind: <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M9.6 14.4l4.8-4.8" /><path d="M8.2 11.1l-1.9 1.9a3 3 0 0 0 4.24 4.24l1.9-1.9" /><path d="M15.8 12.9l1.9-1.9a3 3 0 0 0-4.24-4.24l-1.9 1.9" /></g>,
  punish: <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="4.5" y="4.5" width="15" height="15" rx="2" /><path d="M9 9l6 6M15 9l-6 6" /></g>,
  harm: <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M3.5 12h6M14.5 12h6" /><path d="M10.5 8.5l3 7" /></g>,
  frame: <path d="M12 4.5 20 19H4L12 4.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />,
  repeat: <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12a7 7 0 1 1-2.1-5" /><path d="M17.5 3.5v3.8h-3.8" /></g>,
  star: <path d="M12 3.5 13.9 10.1 20.5 12 13.9 13.9 12 20.5 10.1 13.9 3.5 12 10.1 10.1Z" fill="currentColor" />,
  void: <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeDasharray="2.6 2.6" />,
};
const signOf = (kind) => (kind in KIND ? kind : kind === 'star' ? 'star' : kind === 'void' ? 'void' : kind === 'return' || kind === 'turned' || kind === 'mark' ? 'repeat' : null);
const signColor = (k) => (k === 'star' ? '#b8962e' : k === 'void' ? 'var(--inkl)' : k in KIND ? (KIND[k][2] > 0 ? 'var(--grow)' : 'var(--rel)') : 'var(--inkl)');
function Sign({ kind, size = 14 }) { const k = signOf(kind); if (!k) return null; return <svg viewBox="0 0 24 24" width={size} height={size} style={{ color: signColor(k) }} aria-hidden="true">{SIGN[k]}</svg>; }

const Use = ({ id, style }) => <svg viewBox="0 0 24 24" style={style} aria-hidden="true"><use href={`#jny-${id}`} /></svg>;
const Sprite = () => <span style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${JOURNEY_DEFS}</defs></svg>` }} />;

/** A unit's text, with the dev tag while it is a draft (B3). */
function T({ u, className = 'al-t' }) {
  if (!u?.text) return null;
  return <p className={className}>{u.text}{u.draft ? <span className="al-draft">draft</span> : null}</p>;
}
function Dot({ el, size = 48, sign }) {
  return (
    <span className="al-dot" style={{ width: size, height: size, background: `radial-gradient(circle at 40% 35%, var(--w${el}) 0 55%, color-mix(in srgb, var(--${el}) 20%, transparent) 100%)`, color: `var(--${el})` }}>
      <Use id={`el-${el.toLowerCase()}`} />
      {sign !== undefined && sign !== 0 ? <span className="al-badge" style={{ color: sign > 0 ? 'var(--grow)' : 'var(--rel)' }}><Use id={sign > 0 ? 'ar-up' : 'ar-down'} /></span> : null}
    </span>
  );
}
function Loud({ n }) { return <span className="al-loud" aria-label={`Loudness ${n} of 5`}>{[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= n ? 'on' : ''} style={{ height: 4 + i * 2.4 }} />)}</span>; }
function Meter({ lift }) {
  const cols = ['#9e5540', '#c08a6f', '#cdbe9e', '#8fa982', '#587a4d']; const s = lift.step;
  return (
    <>
      <div className="al-meter" role="img" aria-label={lift.word}>{cols.map((c, i) => <i key={i} className={i === s ? 'on' : ''} style={{ background: (s >= 2 ? i >= 2 && i <= s : i >= s && i <= 2) ? c : undefined }} />)}</div>
      <div className="al-meterl"><span>↓ weighs</span><b>{lift.word}</b><span>lifts ↑</span></div>
    </>
  );
}
const MixBar = ({ mix }) => <div className="al-mix">{ELEMENTS.filter((e) => mix[e] > 0).map((e) => <i key={e} style={{ width: `${mix[e] * 100}%`, background: `var(--${e})` }} />)}</div>;
function ChartToday({ c, what }) {
  return (
    <>
      <div className="al-pills">{ELEMENTS.map((e) => { const n = c.presence[e] ?? 0; const add = c.add[e] || 0; const s = c.sign[e] || 0; return (
        <div className="al-pill" key={e}>
          <span style={{ color: `var(--${e})` }}><Use id={`el-${e.toLowerCase()}`} style={{ width: 14, height: 14 }} /></span>
          <div className="al-col"><i style={{ bottom: 0, height: `${n}%`, background: `color-mix(in srgb, var(--${e}) 55%, transparent)` }} />{add ? <em style={{ bottom: `${n}%`, height: `${add}%`, backgroundColor: `var(--${e})` }} /> : null}</div>
          <small>{n}%{add ? <b style={{ color: `var(--${e})` }}> +</b> : null}</small>
          {s ? <span style={{ color: s > 0 ? 'var(--grow)' : 'var(--rel)' }}><Use id={s > 0 ? 'ar-up' : 'ar-down'} style={{ width: 10, height: 10 }} /></span> : <span style={{ height: 10 }} />}
        </div>); })}</div>
      <p className="al-t" style={{ fontSize: 12.5, color: 'var(--inkl)' }}>Your five energies, with what {what} adds hatched on top. The arrows: the ones you grow and the ones you release.</p>
    </>
  );
}
function GateMap({ gel, bonds, gates, live, age, who }) {
  const gx = { year: 44, month: 124, day: 204, hour: 284 }; const ty = 26, gy = 112;
  return (
    <svg viewBox="0 0 320 160" width="100%" role="img" aria-label={`Where ${who} lands on your four gates`}>
      {bonds.map((b, i) => { const k = b.kind; const c = signColor(k); const mx = (160 + gx[b.gate]) / 2, my = (ty + 16 + gy - 18) / 2; return (
        <g key={i}>
          <line x1="160" y1={ty + 16} x2={gx[b.gate]} y2={gy - 18} stroke={c} strokeWidth={k === 'clash' || k === 'punish' ? 2.4 : 1.6} strokeDasharray={k === 'harm' ? '4 4' : k === 'frame' || k === 'repeat' ? '1 4' : undefined} strokeLinecap="round" />
          <circle cx={mx} cy={my} r="10" fill="#fbf6ea" stroke={c} strokeWidth="1" />
          <g transform={`translate(${mx - 7} ${my - 7}) scale(.583)`} style={{ color: c }}>{SIGN[k]}</g>
        </g>); })}
      <circle cx="160" cy={ty} r="17" fill={`var(--w${gel})`} stroke={`var(--${gel})`} strokeWidth="1.6" />
      <g transform={`translate(151 ${ty - 9}) scale(.75)`} style={{ color: `var(--${gel})` }}><use href={`#jny-el-${gel.toLowerCase()}`} width="24" height="24" /></g>
      <text x="184" y={ty + 4} fontSize="9.5" fill="#2B2722" letterSpacing="1">{who.toUpperCase()}</text>
      {['year', 'month', 'day', 'hour'].map((g) => { const seat = gates[g]; const x = gx[g]; if (!seat) return <text key={g} x={x} y={gy + 4} textAnchor="middle" fontSize="9" fill="#857D72">hour unknown</text>; const hit = bonds.some((b) => b.gate === g); return (
        <g key={g}>
          <circle cx={x} cy={gy} r="17" fill={`var(--w${seat.el})`} stroke={hit ? `var(--${seat.el})` : '#cdbe9e'} strokeWidth={hit ? 1.6 : 1} />
          <g transform={`translate(${x - 9} ${gy - 9}) scale(.75)`} style={{ color: `var(--${seat.el})` }}><use href={`#jny-el-${seat.el.toLowerCase()}`} width="24" height="24" /></g>
          <text x={x} y={gy + 30} textAnchor="middle" fontSize="9.5" fill={hit ? '#2B2722' : '#857D72'} letterSpacing="1">{GATES[g].toUpperCase()}</text>
          {g === live && age != null ? <text x={x + 20} y={gy - 14} fontSize="8.5" fill="#6b5339">you · {age}</text> : null}
        </g>); })}
    </svg>
  );
}
function Ring({ lvl, dir }) {
  const c = dir === 'open' ? '#587a4d' : dir === 'tested' ? '#9e5540' : '#927750';
  return (
    <svg viewBox="0 0 44 44">{[0, 1, 2].map((i) => { const a0 = -90 + i * 120 + 6, a1 = a0 + 108; const p = (a) => [22 + 19 * Math.cos((a * Math.PI) / 180), 22 + 19 * Math.sin((a * Math.PI) / 180)]; const [x0, y0] = p(a0); const [x1, y1] = p(a1);
      return <path key={i} d={`M${x0} ${y0} A19 19 0 0 1 ${x1} ${y1}`} fill="none" stroke={i < lvl ? c : '#e3d8c2'} strokeWidth="3" strokeLinecap="round" />; })}</svg>
  );
}
const CUE = { quiet: 'Quiet', open: 'Open', tested: 'Tested', mixed: 'Mixed' };
function Domains({ rows, hor }) {
  // elementum.life never shows an unwritten line; the dev site shows it tagged
  const written = (r) => IS_DEV_TOOLS || (r.line ? !r.line.draft : !!(r.fav && !r.fav.draft));
  const lit = rows.filter((r) => r.lvl >= 2 && written(r)).sort((a, b) => b.lvl - a.lvl);
  return (
    <>
      <div className="al-doms">{rows.map((r) => (
        <div className="al-dom" key={r.domain}><div className="al-ring"><Ring lvl={r.lvl} dir={r.dir} /><Use id={DOMI[r.domain]} style={{ position: 'absolute', left: 12, top: 12, width: 20, height: 20, color: r.lvl ? 'var(--ink)' : 'var(--inkl)' }} /></div><b>{r.domain}</b><span>{CUE[r.dir]}</span></div>
      ))}</div>
      {lit.length ? <div style={{ borderTop: '1px solid var(--hair)', paddingTop: 6 }}>
        <div className="al-l"><span>What the {hor} favours</span></div>
        {lit.map((r) => (
          <div className="al-fav" key={r.domain}><Use id={DOMI[r.domain]} />
            {r.line ? <T u={r.line} /> : r.fav && !r.fav.draft ? <div className="p"><span className="lean">{r.fav.lean}</span><span className="over">over</span><span className="not">{r.fav.over}</span></div>
              : <div className="p"><span className="lean" style={{ color: 'var(--inkl)' }}>{r.domain} · {CUE[r.dir].toLowerCase()}</span><span className="al-draft">pair to write</span></div>}
          </div>))}
      </div> : null}
    </>
  );
}
function Ribbon({ items, now, bare, onPick, note }) {
  return (
    <>
      <div className="al-ribbon" style={{ gridTemplateColumns: `repeat(${items.length},1fr)` }}>{items.map((it) => { const h = Math.abs(it.lift) * 50; const up = it.lift >= 0; const Tag = onPick ? 'button' : 'div'; return (
        <Tag key={it.date} type={onPick ? 'button' : undefined} className={`al-rc${it.date === now || it.now ? ' now' : ''}`} onClick={onPick ? () => onPick(it.date) : undefined} aria-label={onPick ? `Open ${fmt(it.date)}` : undefined}>
          <span className="sg">{it.loud >= (bare ? 4 : 2) ? <Sign kind={it.sign} size={11} /> : null}</span>
          <span className="bx"><i style={{ ...(up ? { bottom: '50%', height: `${h}%` } : { top: '50%', height: `${h}%` }), background: `var(--${it.el})`, opacity: up ? 1 : 0.7 }} /></span>
          {bare ? null : <span className="mk" style={{ color: `var(--${it.el})` }}><Use id={`el-${it.el.toLowerCase()}`} /></span>}
          <small>{it.lab}{it.asks ? '●' : ''}</small>
        </Tag>); })}</div>
      {note ? <p className="al-t" style={{ fontSize: 12, color: 'var(--inkl)' }}>{note}</p> : null}
    </>
  );
}
function Lock({ tier, what }) {
  const { openUpgrade } = useUpgrade();
  return <div className="al-card al-lock"><p className="al-t">{what}</p><button type="button" onClick={() => openUpgrade?.(tier)}>Open with {tier}</button></div>;
}
function Back({ label, onBack }) { return <button type="button" className="al-back" onClick={onBack}><Use id="ico-chev-l" /> {label}</button>; }

function useModel(kind, date) {
  const { chart, birthData } = useChart();
  return React.useMemo(() => {
    if (!chart) return null;
    const bd = birthData?.year ? `${birthData.year}-${String(birthData.month).padStart(2, '0')}-${String(birthData.day).padStart(2, '0')}` : null;
    try { return resolveAlmanac(chart, { kind, date, hourUnknown: !!birthData?.hourUnknown, birthDate: bd }); } catch (err) { console.warn('[almanac]', err); return null; }
  }, [chart, birthData, kind, date]);
}

// ── the energy card, shared by the three pages ──────────────────────
function EnergyCard({ m, who }) {
  const e = m.energy;
  return (
    <div className="al-card">
      <div className="al-l"><span>What {who} carries</span><Loud n={m.loud} /></div>
      <div className="al-row"><Dot el={e.el} size={48} sign={e.sign} /><div className="al-fx"><b>{e.el}{e.ground === 'matches' ? `, over ${e.gel}` : ''}</b><span><Use id={FNI[e.fn]} /> {e.fn} · {e.sign > 0 ? 'you grow it' : e.sign < 0 ? 'you release it' : 'you hold it even'}</span></div></div>
      {e.ground !== 'matches' ? <div className="al-row" style={{ paddingLeft: 8 }}><Dot el={e.gel} size={34} sign={e.signGround} /><div className="al-fx"><b style={{ fontSize: 15 }}>{e.gel} underneath</b><span><Use id={FNI[e.fnGround]} /> {e.fnGround}</span></div></div> : null}
      <MixBar mix={m.mix} />
      <Meter lift={m.lift} />
      <T u={m.line} />
      <T u={m.ground} />
    </div>
  );
}
function LandingCard({ m, who }) {
  const L = m.landing;
  return (
    <div className="al-card">
      <div className="al-l"><span>Where it lands</span><span className="r">{m.rarity}</span></div>
      <GateMap gel={m.energy.gel} bonds={m.bonds} gates={m.gates} live={m.live} age={m.age} who={who} />
      {m.isVoid ? <div className="al-row" style={{ gap: 8 }}><Sign kind="void" size={18} /><span className="al-t" style={{ fontSize: 13 }}>A Void day: what starts today arrives late or light.</span></div> : null}
      {L.clause ? <p className="al-t">{L.clause}</p> : null}
      <T u={L.body} />
      <T u={L.echo} />
    </div>
  );
}
function Hero({ el, sign, eyebrow, head }) {
  return (
    <div className="al-hero"><Dot el={el} size={64} sign={sign} /><div style={{ minWidth: 0 }}><div className="e">{eyebrow}</div><h1>{head.text}{head.draft ? <span className="al-draft">draft</span> : null}</h1></div></div>
  );
}

// ── the Day ─────────────────────────────────────────────────────────
export function AlmanacDay({ onBack }) {
  const { tier } = useChart(); const [date, setDate] = React.useState(() => isoDay(new Date()));
  const m = useModel('day', date); if (!m) return <main className="al"><Back label="Almanac · Day" onBack={onBack} /></main>;
  const t = atNoon(date); const seeker = isSeeker(tier); const adv = tier === 'advisor';
  return (
    <main className="al"><Sprite />
      <Back label="Almanac · Day" onBack={onBack} />
      <Hero el={m.energy.el} sign={m.energy.sign} eyebrow={`${WDL[t.getDay()]} ${fmt(date)} · ${/^[AEIOU]/.test(m.energy.el) ? 'an' : 'a'} ${m.energy.el} day`} head={m.head} />
      <EnergyCard m={m} who="today" />
      <LandingCard m={m} who="today" />
      {seeker ? <>
        <div className="al-card"><div className="al-l"><span>Your domains</span><span className="r">ring = weight</span></div><Domains rows={m.domains} hor="day" /></div>
        <div className="al-card"><div className="al-l"><span>Your chart today</span></div><ChartToday c={m.chartToday} what="today" /></div>
        <div className="al-card"><div className="al-l"><span>This week</span></div><Ribbon items={m.week} now={date} onPick={setDate} note="Bars: lift or weight. Signs: each day's lead. Tap a day to open it." /></div>
      </> : <Lock tier="Seeker" what="Your eight domains, what the day favours in each, your chart today and the week open with Seeker." />}
      {adv ? <div className="al-card"><div className="al-l"><span>Loud days ahead</span><span className="r">the next five weeks</span></div>
        <div className="al-list">{m.ahead.map((a) => <button type="button" key={a.date} className="al-li" onClick={() => setDate(a.date)}><span className="d">{fmt(a.date)}</span><span style={{ color: `var(--${a.el})` }}><Use id={`el-${a.el.toLowerCase()}`} /></span><span>{a.head.text}</span></button>)}</div></div>
        : seeker ? <Lock tier="Advisor" what="The loud days of the next five weeks open with Advisor." /> : null}
    </main>
  );
}

// ── the Month ───────────────────────────────────────────────────────
export function AlmanacMonth({ onBack }) {
  const { tier } = useChart(); const m = useModel('month', isoDay(new Date()));
  if (!m) return <main className="al"><Back label="Almanac · Month" onBack={onBack} /></main>;
  const p = m.period;
  return (
    <main className="al"><Sprite />
      <Back label="Almanac · Month" onBack={onBack} />
      <Hero el={m.energy.el} sign={m.energy.sign} eyebrow={`${fmt(p.start)} to ${fmt(p.end)} · an ${m.energy.el} month`.replace(/an ([^AEIOU])/, 'a $1')} head={m.head} />
      <EnergyCard m={m} who="the month" />
      {isSeeker(tier) ? <>
        <LandingCard m={m} who="this month" />
        {m.season ? <div className="al-card"><div className="al-l"><span>What your birth season asks for</span></div>
          <div className="al-slots">{m.season.map((s) => <span key={s.stem} className="al-slot" style={{ color: `var(--${s.el})`, borderStyle: s.state === 'none' ? 'dashed' : 'solid', background: s.state === 'met' ? `var(--w${s.el})` : s.state === 'trace' ? `linear-gradient(to top, var(--w${s.el}) 25%, transparent 25%)` : undefined }}><Use id={`el-${s.el.toLowerCase()}`} /></span>)}
            <span className="al-t" style={{ fontSize: 13 }}>{m.season.map((s) => s.el).join(' and ')}. {m.season.some((s) => s.state === 'met') ? 'This month brings it.' : m.season.some((s) => s.state === 'trace') ? 'This month holds a trace.' : 'This month brings none.'}</span></div></div> : null}
        <div className="al-card"><div className="al-l"><span>Your domains</span></div><Domains rows={m.domains} hor="month" /></div>
        <div className="al-card"><div className="al-l"><span>Your chart this month</span></div><ChartToday c={m.chartToday} what="the month" /></div>
        <div className="al-card"><div className="al-l"><span>The month, day by day</span><span className="r">{m.marked.length} loud days</span></div><Ribbon items={m.days} now={m.today} bare note="Bars coloured by each day's energy. Signs mark the loud days." />
          <div className="al-list">{m.marked.map((a) => <div key={a.date} className="al-li"><span className="d">{fmt(a.date)}</span><Sign kind={a.sign} size={16} /><span>{a.head.text}</span></div>)}</div></div>
      </> : <Lock tier="Seeker" what="Where the month lands, your domains, the season and every day of the month open with Seeker." />}
    </main>
  );
}

// ── the Year ────────────────────────────────────────────────────────
export function AlmanacYear({ onBack }) {
  const { tier } = useChart(); const m = useModel('year', isoDay(new Date()));
  if (!m) return <main className="al"><Back label="Almanac · Year" onBack={onBack} /></main>;
  const p = m.period;
  return (
    <main className="al"><Sprite />
      <Back label="Almanac · Year" onBack={onBack} />
      <Hero el={m.energy.el} sign={m.energy.sign} eyebrow={`${fmt(p.start)} ${p.start.slice(0, 4)} to ${fmt(p.end)} ${p.end.slice(0, 4)}`} head={m.head} />
      {tier === 'advisor' ? <>
        <EnergyCard m={m} who="the year" />
        <LandingCard m={m} who="this year" />
        <div className="al-card"><div className="al-l"><span>Your domains</span></div><Domains rows={m.domains} hor="year" /></div>
        <div className="al-card"><div className="al-l"><span>The year, month by month</span><span className="r">● brings what your season asks</span></div><Ribbon items={m.months} note="Bars: lift or weight. Signs: each month's lead." /></div>
        {m.decade ? <div className="al-card"><div className="al-l"><span>Your decade · year {m.decade.yearOf} of 10</span></div>
          <div className="al-prog">{[...Array(10)].map((_, i) => <i key={i} style={{ background: i < m.decade.yearOf ? `color-mix(in srgb, var(--${m.decade.el}) ${i === m.decade.yearOf - 1 ? 100 : 55}%, transparent)` : undefined }} />)}</div>
          <div className="al-list">{m.ahead.map((a) => <div key={a.when} className="al-li"><span className="d">{a.when.length > 4 ? fmt(a.when) : a.when}</span>{a.el ? <span style={{ color: `var(--${a.el})` }}><Use id={`el-${a.el.toLowerCase()}`} /></span> : <Use id="dom-love" />}<span>{a.text}</span></div>)}</div></div> : null}
      </> : <Lock tier="Advisor" what="The year's energy, where it lands, your domains and its twelve months open with Advisor." />}
    </main>
  );
}

// ── the hub ─────────────────────────────────────────────────────────
// P4 A: when the app opens, refresh the reminders for the next five weeks (off until ALMANAC_PUSH)
function usePushSchedule() {
  const { chart, birthData } = useChart();
  React.useEffect(() => {
    if (!ALMANAC_PUSH || !chart || typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    const bd = birthData?.year ? `${birthData.year}-${String(birthData.month).padStart(2, '0')}-${String(birthData.day).padStart(2, '0')}` : null;
    try { syncPushSchedule(almanacPushCodes(chart, { hourUnknown: !!birthData?.hourUnknown, birthDate: bd })); } catch { /* reminders fall back to the daily line */ }
  }, [chart, birthData]);
}

export function AlmanacHub({ onOpen }) {
  usePushSchedule();
  const m = useModel('hub', isoDay(new Date()));
  if (!m) return null;
  const h = m.hub; const t = new Date(); const next = m.ahead[0];
  const tile = (x, eyebrow, route) => (
    <button type="button" className="al-card al-tile" onClick={() => onOpen?.(route)}>
      <div className="al-row" style={{ gap: 8 }}><Dot el={x.el} size={34} sign={undefined} /><div style={{ minWidth: 0 }}><div className="al-l"><span>{eyebrow}</span></div><h2>{x.head.text}</h2></div></div>
      <div className="al-meterl"><span>{x.lift.value >= 0.2 ? '↑ lifts' : x.lift.value <= -0.2 ? '↓ weighs' : '· even'}</span><Loud n={x.loud} /></div>
    </button>
  );
  return (
    <main className="al"><Sprite />
      <header className="al-header"><span>Your Almanac</span><h1>Across time</h1></header>
      <button type="button" className="al-hero" style={{ appearance: 'none', font: 'inherit', textAlign: 'left', cursor: 'pointer', color: 'inherit' }} onClick={() => onOpen?.('app-day')}>
        <Dot el={m.energy.el} size={64} sign={m.energy.sign} />
        <div style={{ minWidth: 0 }}><div className="e">Today · {WDL[t.getDay()].slice(0, 3)} {fmt(isoDay(t))}</div><h1>{m.head.text}</h1>
          <div className="m"><span style={{ color: m.lift.value >= 0 ? 'var(--grow)' : 'var(--rel)' }}>{m.lift.word}</span><Loud n={m.loud} /><Sign kind={m.lead.kind} size={13} /></div></div>
      </button>
      {next ? <div className="al-card" style={{ padding: '8px 12px' }}><div className="al-row" style={{ gap: 8, fontSize: 13.5 }}><Sign kind={next.sign} size={15} /><span><b>Next loud day</b> · {fmt(next.date)} · {next.head.text}</span></div></div> : null}
      <div className="al-tiles">{tile(h.month, 'This month', 'app-month')}{tile(h.year, 'This year', 'app-year')}</div>
      {h.decade ? <button type="button" className="al-card al-tile" onClick={() => onOpen?.('app-decade')}>
        <div className="al-l"><span>Life chapter · year {h.decade.yearOf} of 10</span><span className="r">{h.decade.startYear} to {h.decade.endYear}</span></div>
        <div className="al-prog">{[...Array(10)].map((_, i) => <i key={i} style={{ background: i < h.decade.yearOf ? `var(--${h.decade.el})` : undefined }} />)}</div>
      </button> : null}
    </main>
  );
}
