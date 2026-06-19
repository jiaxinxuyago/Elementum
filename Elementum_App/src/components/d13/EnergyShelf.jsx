// ===================================================================
// ELEMENTUM · EnergyShelf + EnergySpine  (D13 P3·B)
// ===================================================================
// The shelf of five latched energy tiles beneath the dominance wheel.
// Collapsed = a 32px spine (mark + % + presence gauge mirroring the dot
// size); open = the full card (corner role glyphs, 100% dominance bar,
// role caption, hook, pole line, Read pill). Exactly one open at a time;
// tap a spine → select (the wheel node latches in the parent). Faithful
// port of the wireframe spine + initShelf; roles render from the chart
// contract, not hand-authored markup. Friction displays as "Friction".
// ===================================================================

import React from 'react';
import { ENERGY_TILE, ROLE_CFG, EL_DEEP } from './d13Content.js';

const ROLE_ORDER = ['core', 'missing', 'catalyst', 'friction', 'ally'];

function RoleGlyph({ role }) {
  switch (role) {
    case 'core':     return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="currentColor" /></svg>;
    case 'catalyst': return <svg viewBox="0 0 24 24"><use href="#ar-up" /></svg>;
    case 'friction': return <svg viewBox="0 0 24 24"><use href="#ar-down" /></svg>;
    case 'missing':  return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2.6 2.4" /></svg>;
    case 'ally':     return <svg viewBox="0 0 24 24"><circle cx="8.5" cy="12" r="4.4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="15.5" cy="12" r="4.4" fill="none" stroke="currentColor" strokeWidth="2" /></svg>;
    default:         return null;
  }
}

function EnergySpine({ energy, energies, open, pMax, onSelect, onRead }) {
  const { el, presence, roles, major } = energy;
  const isMissing = roles.includes('missing');
  const content = ENERGY_TILE[el] || {};
  const colorCls = isMissing ? 'ghosted' : `dk-${el}`;
  const gauge = isMissing ? 4 : Math.max(4, Math.round((presence / (pMax || 1)) * 84));
  // up to two corner roles, in canonical order
  const cornerRoles = ROLE_ORDER.filter((r) => roles.includes(r)).slice(0, 2);

  return (
    <button
      type="button"
      className={`spine ${colorCls}${open ? ' open' : ''}`}
      data-el={el}
      onClick={() => onSelect(el)}
    >
      <span className="sp-fill" style={{ height: `${gauge}%` }} />
      <span className="sp-cap" />
      <span className="sp-notch" />

      {/* collapsed face */}
      <span className="sp-col">
        <span className="sp-mk"><svg className="elmark" viewBox="0 0 24 24"><use href={`#el-${el}`} /></svg></span>
        <span className="sp-pc">{presence}%</span>
      </span>

      {/* open face */}
      <span className="sp-open">
        <span className="sp-art">
          {content.art ? <img src={`/concept-arts/library/${content.art}.png`} alt="" /> : null}
          <span className="bfade" />
        </span>
        <span className="sp-corner">
          {cornerRoles.map((r) => (
            <span key={r} className={`sp-rg ${ROLE_CFG[r].cls}${r === major ? ' major' : ''}`} title={ROLE_CFG[r].label}>
              <RoleGlyph role={r} />
            </span>
          ))}
        </span>
        <span className="sp-txt">
          <span className="sp-head">
            <span className={`sp-seal n-${el}`}><svg className="elmark" viewBox="0 0 24 24"><use href={`#el-${el}`} /></svg></span>
            <span className="sp-ey">{el.toUpperCase()} · {presence}%</span>
          </span>
          <span className="sp-stack">
            <span className="sp-track">
              {energies.map((e) => {
                const eMissing = e.roles.includes('missing');
                const isCur = e.el === el;
                const cls = `${isCur ? 'cur' : ''}${eMissing ? (isCur ? ' gh' : 'gh') : ''}`.trim();
                const deep = `var(${EL_DEEP[e.el]})`;
                const style = eMissing
                  ? { background: deep }
                  : { width: `${e.presence}%`, background: isCur ? deep : `color-mix(in srgb, ${deep} 40%, var(--silkDeep))` };
                return <i key={e.el} className={cls} style={style} />;
              })}
            </span>
            <span className="sp-roles">
              {cornerRoles.map((r, i) => (
                <React.Fragment key={r}>
                  {i > 0 ? <span className="rl-sep">·</span> : null}
                  <span className={`rl ${ROLE_CFG[r].rl}`}><RoleGlyph role={r} />{ROLE_CFG[r].label}</span>
                </React.Fragment>
              ))}
            </span>
          </span>
          <span className="sp-hook">{content.hook}</span>
          <span className="sp-pol">{content.pol}</span>
        </span>
        <span
          className="sp-read"
          onClick={(ev) => { ev.stopPropagation(); onRead && onRead(el); }}
        >
          Read<span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-arrow-r" /></svg></span>
        </span>
      </span>
    </button>
  );
}

export default function EnergyShelf({ energies, selected, onSelect, onRead }) {
  const pMax = energies.reduce((m, e) => Math.max(m, e.presence), 0);
  return (
    <div className="shelf">
      {energies.map((e) => (
        <EnergySpine
          key={e.el}
          energy={e}
          energies={energies}
          pMax={pMax}
          open={selected === e.el}
          onSelect={onSelect}
          onRead={onRead}
        />
      ))}
    </div>
  );
}
