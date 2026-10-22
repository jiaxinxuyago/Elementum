// ===================================================================
// ELEMENTUM · the energy reading journey (owner rulings 2026-10-22,
// DES_15 EJ1 C · EJ2–EJ8 A)
// ===================================================================
// The energy page as a ladder the reader ramps up: THE NAME (open) →
// THE RELATION (a box, opens in place) → THE FUNCTION (a card, pushes its
// page) → THE CHARACTER (a box) → WHAT IT MEANS NOW (a box) → THE DOMAINS
// (a card, pushes its page) → across your chart → Next. Every line is the
// corpus's own; the section titles are display only. Three imagery slots
// (P1 the pair painting, P2 the function vignette, P3 the persona seal)
// render the asset when it exists at its path and fall back otherwise, so
// the design keeps its spaces until the art lands (EJ8 A).
// ===================================================================
import { useState } from 'react';
import { FEEDS, TAMES, CYCLE_IMAGE_LINES } from '../../content/cycles.js';
import './energy.css';

const EL_NAME = { metal: 'Metal', wood: 'Wood', fire: 'Fire', earth: 'Earth', water: 'Water' };
const HAN = { metal: '金', wood: '木', fire: '火', earth: '土', water: '水' };
export const PAIR_ART = (core, el) => `/concept-arts/pairs/pair_${core}_${el}.png`;   // the GO-2 path (PM_02)
export const FN_ART = (fnKey) => `/concept-arts/functions/${fnKey}.png`;
export const PERSONA_ART = (god) => `/concept-arts/personas/${encodeURIComponent(god)}.png`;

// An imagery slot: the asset when it exists, the fallback (or nothing) until it does.
export function ArtSlot({ src, className = '', alt = '', fallback = null }) {
  const [missing, setMissing] = useState(false);
  if (!src || missing) return fallback;
  return <img className={className} src={src} alt={alt} onError={() => setMissing(true)} />;
}

const poleOf = (r) => (r.isCore ? 'cond' : (r.role === 'friction' || r.coreExcess) ? 'fric' : (r.role === 'catalyst' || r.role === 'ally' || r.coreCatalyst) ? 'cat' : 'cond');
const stateWord = (r, condition) => (r.isCore ? condition : condition === 'Balanced' ? 'Balanced' : (r.role === 'friction' || r.coreExcess) ? 'Friction' : 'Catalyst');
const firstSentence = (t) => ((t || '').match(/[^.!?]+[.!?]+/) || [t || ''])[0].trim();

function StatePill({ r, condition, Use, it = false }) {
  const k = poleOf(r);
  const word = k === 'fric' ? `Release${it ? ' it' : ''}` : k === 'cat' ? `Grow${it ? ' it' : ''}` : r.isCore ? condition : 'Keep';
  const icon = k === 'fric' ? 'ar-down' : k === 'cat' ? 'ar-up' : r.isCore ? (condition === 'Overfueled' ? 'ic-charged' : condition === 'Underfueled' ? 'ic-receptive' : 'ic-balanced') : 'ic-balanced';
  return <span className={`role-pill ${k}`}><Use id={icon} />{word}</span>;
}

// ── rung 1 · THE NAME: the cover continues (the sheet's sign and head) ──
export function NameRung({ s, r, towers, art, Use, InkDot }) {
  const image = s.mech?.image || '';
  return (
    <div className="ej-name" style={art ? { backgroundImage: `url('${art}')` } : undefined}>
      <div className="ej-nrow">
        <InkDot el={s.el} size={64} Use={Use} label={`${s.elName}, ${r.presence} percent`} />
        <div className="ej-ntitle">
          <span className="ej-ey">{r.isCore ? 'Your core' : 'Your energies'} · {r.presence}% of you</span>
          <b>{s.elName}<span className="ej-han">{HAN[s.el]}</span></b>
        </div>
      </div>
      <p className="ej-nfn">{s.elName} is your {s.fnLabel} energy.</p>
      <div className="ej-nline">
        <span>{r.head}</span>
        {image ? <span className="ej-cyc">· {image}</span> : null}
      </div>
      <div className="ej-nbar" aria-label={`${s.elName}: ${r.presence}% of your chart`}>
        <span className="ej-track">{towers.map((t) => (
          t.presence > 0
            ? <i key={t.el} style={{ width: `${t.presence}%`, background: t.el === s.el ? `var(--${t.el}Deep)` : `color-mix(in srgb, var(--${t.el}Deep) 22%, var(--silkDeep))` }} />
            : <i key={t.el} style={{ width: '2%', background: t.el === s.el ? `var(--${t.el}Deep)` : 'transparent' }} />
        ))}</span>
        <b>{r.presence}%</b>
      </div>
    </div>
  );
}

// ── the 生/克 equation, on paper (EJ4 A) ──
export function Equation({ s, m, Use, InkDot, mini = false, condition }) {
  const r = m.byEl[s.el];
  if (!s.mech || r.isCore) {
    return (
      <div className={`ej-eq${mini ? ' mini' : ''}`}>
        <span className="ej-eqside"><InkDot el={s.el} size={mini ? 26 : 44} Use={Use} />{s.elName}<small>{r.presence}%</small></span>
        <span className="ej-eqis">=</span>
        <span className="ej-eqlaw core"><span className="ej-eqhan">主</span><span>your core</span></span>
        <span className="ej-eqis">·</span>
        <StatePill r={r} condition={condition} Use={Use} />
      </div>
    );
  }
  const { a, b, verb } = s.mech;
  const feeds = verb === 'feeds';
  return (
    <div className={`ej-eq${mini ? ' mini' : ''}`}>
      <span className="ej-eqside"><InkDot el={a} size={mini ? 26 : 44} Use={Use} />{EL_NAME[a]}<small>{m.byEl[a].presence}%</small></span>
      <span className={`ej-eqlaw ${feeds ? 'feeds' : 'shapes'}`}><span className="ej-eqhan">{feeds ? '生' : '克'}</span><span className="ej-eqln" /><span>{feeds ? 'feeds' : 'shapes'}</span></span>
      <span className="ej-eqside"><InkDot el={b} size={mini ? 26 : 44} Use={Use} />{EL_NAME[b]}<small>{m.byEl[b].presence}%</small></span>
      <span className="ej-eqis">=</span>
      <span className={`role-pill ${poleOf(r)}`}>{stateWord(r, condition)}</span>
    </div>
  );
}

// ── a box: one derived line closed, the reading open in place ──
export function Box({ ey, line, open, onToggle, children, id }) {
  return (
    <div className={`cardstock ej-box${open ? ' open' : ''}`} data-box={id}>
      <button type="button" className="ej-bh" aria-expanded={open} onClick={onToggle}>
        <span className="ej-bhin"><span className="laylab">{ey}</span><span className="ej-bl">{line}</span></span>
        <span className="ej-chev" aria-hidden="true">{open ? '–' : '+'}</span>
      </button>
      {open ? <div className="ej-bb">{children}</div> : null}
    </div>
  );
}

// ── a teaser card: one derived line, an arrow, its page ──
export function TeaserCard({ ey, title, text, children, onOpen, Use, id }) {
  return (
    <button type="button" className="cardstock el-tease goa ej-card" onClick={onOpen} data-card={id}>
      <span className="laylab">{ey}</span>
      <span className="serifline el-teasetitle ej-ct">{title}</span>
      {text ? <span className="el-teasep" style={{ marginTop: 2 }}>{text}</span> : null}
      {children}
      <span className="readcirc sm el-goarrow"><Use id="ico-arrow-r" /></span>
    </button>
  );
}

// ── the domain map: eight glyphs, this energy's lit ──
export function DomainMap({ dm, el, Use, DOM }) {
  const ALL = ['Wealth', 'Family', 'Career', 'Social', 'Health', 'Love', 'Mind', 'Growth'];
  const lit = new Set((dm?.pages || []).filter((p) => p.seats.some((s) => s.el === el)).map((p) => p.domain));
  return (
    <div className="ej-dmap" aria-label={`Domains ${EL_NAME[el]} rules: ${[...lit].join(', ') || 'none seated'}`}>
      {ALL.map((d) => <span key={d} className={lit.has(d) ? 'on' : ''}><Use id={DOM[d] || 'dom-career'} />{d}</span>)}
    </div>
  );
}
export const domainsLine = (dm, el) => {
  const lit = (dm?.pages || []).filter((p) => p.seats.some((s) => s.el === el)).map((p) => p.domain);
  if (!lit.length) return `${EL_NAME[el]} holds no seat in your pillars. It reaches you through the hidden stems, felt more than placed.`;
  const list = lit.length === 1 ? `your ${lit[0]}` : `${lit.slice(0, -1).map((d) => `your ${d}`).join(', ')} and your ${lit[lit.length - 1]}`;
  return `${EL_NAME[el]} rules ${list}.`;
};

// ── the remedy diagram: this energy → the law → the energy that spends or feeds it ──
export function Relay({ from, to, Use, InkDot }) {
  const shapes = TAMES[to] === from;          // the remedy energy shapes (克) this one
  const feeds = FEEDS[from] === to;           // this one feeds (生) the remedy energy
  const key = shapes ? `${to}>${from}` : feeds ? `${from}>${to}` : null;
  const image = key ? CYCLE_IMAGE_LINES[key] : '';
  const law = shapes ? '克' : feeds ? '生' : '·';
  const word = shapes ? `${EL_NAME[to]} spends it` : feeds ? `${EL_NAME[from]} feeds it` : '';
  return (
    <div className="ej-relay" aria-label={`${EL_NAME[from]} to ${EL_NAME[to]}${word ? `: ${word}` : ''}`}>
      <span className="ej-eqside"><InkDot el={from} size={40} Use={Use} />{EL_NAME[from]}<small>stores</small></span>
      <span className="ej-eqlaw shapes"><span className="ej-eqhan">{law}</span><span className="ej-eqln" /><span>{word}{image ? ` · ${image}` : ''}</span></span>
      <span className="ej-eqside"><InkDot el={to} size={40} Use={Use} />{EL_NAME[to]}<small>builds</small></span>
    </div>
  );
}

// ── the page's ladder (rungs 2 to 6) ──
export function EnergyLadder({ s, m, condition, dm, art, Use, InkDot, DOM, MetricBars, onFunction, onDomains, onKeyword, onEnergy, onDomain }) {
  const [open, setOpen] = useState(null);
  const r = m.byEl[s.el];
  const toggle = (k) => setOpen((v) => (v === k ? null : k));
  const friction = r.role === 'friction' || r.coreExcess;
  const rows = s.fnReading?.ledger || [];
  const chips = rows.length ? rows.map((row) => ({ word: row.word, text: row.text })) : (r.adj || []).map((a) => ({ word: a, text: '' }));
  const fnLine = s.faces?.[0]?.fnLine || '';
  const cl = s.fnReading?.characterLine;
  const turn = s.mech?.turn || '';
  const rem = friction ? s.fnReading?.remedy : null;
  const edge = !friction ? s.fnReading?.edge : null;
  const seated = (dm?.pages || []).some((p) => p.seats.some((x) => x.el === s.el));
  return (
    <>
      {/* ② THE RELATION */}
      {s.mech ? (
        <Box id="rel" ey={r.isCore ? 'The relation · 主' : `The relation · ${s.mech.verb === 'feeds' ? '生' : '克'}`} open={open === 'rel'} onToggle={() => toggle('rel')}
          line={<Equation s={s} m={m} Use={Use} InkDot={InkDot} mini condition={condition} />}>
          {!r.isCore ? (
            <ArtSlot src={PAIR_ART(m.core.el, s.el)} className="ej-pairart" alt={`${s.mech.eq}, painted`}
              fallback={art ? <span className="ej-pairart plate" style={{ backgroundImage: `url('${art}')` }} role="img" aria-label={`${s.elName}, painted`} /> : null} />
          ) : null}
          {s.mech.classic ? <p className="el-classic" aria-hidden="true">「{s.mech.classic}」</p> : null}
          <p className="body2 el-mechbase">{s.mech.base}</p>
          {s.diag ? <p className="body2 ej-diag">{s.diag}</p> : null}
        </Box>
      ) : null}

      {/* ③ THE FUNCTION · a card into its page */}
      {s.verdict ? (
        <TeaserCard id="fn" ey="The function" Use={Use} onOpen={onFunction}
          title={<><Use id={`fn-${s.fnKey}`} className={`el-fnicon ${friction ? 'friction' : 'catalyst'}`} />{s.elName} is your {s.fnLabel}.</>}
          text={s.verdict} />
      ) : null}

      {/* ④ THE CHARACTER */}
      {(chips.length || fnLine || s.fnReading?.metrics) ? (
        <Box id="ch" ey={`The character · ${s.elName} in your chart`} open={open === 'ch'} onToggle={() => toggle('ch')}
          line={<span className="ej-chline">{chips.length ? chips.map((c) => c.word).join(' · ') : fnLine}</span>}>
          {fnLine ? <p className="serifline ej-fnline">{fnLine}</p> : null}
          {cl ? (
            <div className={`el-charrow dir-${cl.dir}`}>
              <StatePill r={r} condition={condition} Use={Use} />
              <span className="serifline el-charverdict">{cl.verdict}</span>
              <span className="el-chardir" aria-label={cl.dir === 'grow' ? 'Grow this energy' : cl.dir === 'release' ? 'Release this energy' : 'Keep this energy as it is'}>
                <span className="el-chardir-lab">Release</span><span className="el-chardir-track"><i /></span><span className="el-chardir-lab">Grow</span>
              </span>
            </div>
          ) : null}
          {MetricBars && s.fnReading?.metrics ? <MetricBars m={s.fnReading.metrics} /> : null}
          {chips.length ? (
            <div className="el-kwblock">
              <span className="wd-adj el-fnadj el-kwrow">{chips.map((c) => (
                <button key={c.word} type="button" className={`wd-adjchip el-fnchipbtn${friction ? ' down' : ''}`} aria-haspopup="dialog" disabled={!c.text} onClick={() => onKeyword(c)}>
                  <span className="el-kwword">{c.word}</span><span className="el-kwplus" aria-hidden="true">+</span>
                </button>
              ))}</span>
              <span className="el-kwhint">Tap a keyword to read it.</span>
            </div>
          ) : null}
        </Box>
      ) : null}

      {/* ⑤ WHAT IT MEANS NOW */}
      {(turn || rem || edge || s.fnReading?.advise) ? (
        <Box id="st" ey="What it means now" open={open === 'st'} onToggle={() => toggle('st')}
          line={<span className="ej-stline"><StatePill r={r} condition={condition} Use={Use} it /><span>{firstSentence(turn) || cl?.verdict || ''}</span></span>}>
          {turn ? (
            <div className="el-mechturn" style={{ borderLeft: `3px solid var(--${s.el}Deep)` }}>
              <span className="laylab el-verdlab" style={{ fontWeight: 600, color: `var(--${s.el}Deep)` }}>{s.mech?.turnLab}</span>
              <p className="body2" style={{ margin: 0 }}>{turn}</p>
            </div>
          ) : null}
          {rem && m.byEl[rem.el] ? (
            <button type="button" className={`el-remedybox pv-${rem.el} fric goa`} onClick={() => onEnergy(rem.el)} aria-label={`Open the ${rem.name} page`}>
              <span className="el-remedyhead">
                <span className="el-remedyring lg" aria-hidden="true"><Use id={`el-${rem.el}`} /></span>
                <span className="el-remedytitles f">
                  <span className="el-remedykicker"><Use id="ar-down" />{cl?.verb || 'release'} {s.elName} through</span>
                  <span className="serifline el-remedytitle xl">{rem.name}</span>
                  {rem.fn ? <span className="el-remedyname">the {rem.fn} energy{rem.el === m.core.el ? ', your own' : ''}</span> : null}
                </span>
                <span className="el-remedygo" aria-hidden="true"><Use id="ico-chev-r" /></span>
              </span>
              <Relay from={s.el} to={rem.el} Use={Use} InkDot={InkDot} />
              <span className="body2 el-fnbody el-remedybody">{rem.rest}</span>
            </button>
          ) : edge ? (
            <div className={`el-remedybox pv-${s.el} cat el-edgebox`}>
              <span className="el-remedyhead">
                <span className="el-remedyring lg" aria-hidden="true"><Use id={`el-${s.el}`} /></span>
                <span className="el-remedytitles f">
                  <span className="el-remedykicker up"><Use id="ar-up" />{cl?.verb || 'grow'}</span>
                  <span className="serifline el-remedytitle xl">{s.elName}</span>
                  <span className="el-remedyname">the {s.fnLabel} energy</span>
                </span>
              </span>
              {edge.lead || edge.body ? <span className="body2 el-fnbody el-remedybody">{edge.lead || edge.body}</span> : null}
              {edge.items ? (
                <div className="el-edge-doors" role="group" aria-label="Your domains">
                  {edge.items.map((it) => (
                    <button key={it.domain} type="button" className="el-edge-door" onClick={() => onDomain(it.domain)}>
                      <span className="el-edge-doorring" aria-hidden="true"><Use id={DOM[it.domain] || 'dom-career'} /></span>
                      <span className="el-edge-doorname">{it.domain}</span>
                      <span className="el-edge-doorlock open" aria-hidden="true"><Use id="ico-chev-r" /></span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : s.fnReading?.advise ? (
            <p className="body2" style={{ margin: 0 }}>{s.fnReading.advise}</p>
          ) : null}
        </Box>
      ) : null}

      {/* ⑥ THE DOMAINS · a card into its page */}
      {dm ? (
        <TeaserCard id="dom" ey="The domains" Use={Use} onOpen={onDomains} title={domainsLine(dm, s.el)}>
          {seated ? <DomainMap dm={dm} el={s.el} Use={Use} DOM={DOM} /> : null}
        </TeaserCard>
      ) : null}
    </>
  );
}
