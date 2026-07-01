// ===================================================================
// ELEMENTUM · DominanceWheel  (D13)
// ===================================================================
// The painted Five-Energies wheel: a brush-enso ring (the stem seal art
// scaled up), five element nodes whose diameter ∝ presence and seat ∝
// rank, and the central stem seal. Disk size + seating come from
// applyDominanceRules (engine/dominanceWheel.js). Icon + percentage are
// FIXED size per wheel (track scale, never presence) so small disks stay
// legible. Faithful port of buildWheelNodes in reading-v5.js.
// ===================================================================

import { useMemo } from 'react';
import { GEOM, applyDominanceRules, nodePos } from '../../engine/index.js';

const NM = { metal: 'Metal · core', earth: 'Earth', water: 'Water', wood: 'Wood', fire: 'Fire' };

export default function DominanceWheel({
  energies,            // [{ el, presence, roles, major }]
  dayMaster,           // stem id → /concept-arts/stems/<id>.png
  scale = 1,
  order = 'presence',
  tilde = false,       // hour unknown → "~" prefix on every %
  draw = 1,            // enso draw-on progress 0..1 (dissolve); 1 = fully painted
  interactive = false,
  selected = null,
  onSelect,
  bloom = null,        // optional per-node [opacity,…] for the staged bloom
  className = 'wheel',
  style,               // optional size override (e.g. the 0.92 catalogue wheel)
  centerName,          // optional label under the seal (hidden by default in CSS)
  seal = true,         // false during the dissolve — the gliding seal provides the ring
  onSealClick,         // optional: tap the center seal (opens P4)
}) {
  const geom = useMemo(() => ({ cx: GEOM.cx * scale, cy: GEOM.cy * scale, r: GEOM.r * scale }), [scale]);

  // build node list from the chart, then let the rule recompute diameter + seat
  const nodes = useMemo(() => {
    const ns = energies.map((e) => ({ el: e.el, p: e.presence, pc: `${e.presence}%` }));
    return applyDominanceRules(ns, order);
  }, [energies, order]);

  const sealSize = Math.round(300 * scale);
  const sealLeft = geom.cx - sealSize / 2;
  const sealTop = geom.cy - sealSize / 2;
  const mk = Math.round(18 * scale);
  const pcSize = Math.round(10.5 * scale);
  const gap = Math.max(0, Math.round(scale));

  return (
    <div
      className={className}
      style={style}
      {...(interactive ? { 'data-interactive': '' } : {})}
    >
      {/* the brush enso ring is the stem seal art, scaled to encircle the nodes */}
      <div
        className="center-seal"
        style={{ left: sealLeft, top: sealTop, width: sealSize, height: sealSize, ...(onSealClick ? { pointerEvents: 'auto', cursor: 'pointer' } : null) }}
        onClick={onSealClick}
      >
        {seal ? (
          <img
            src={`/concept-arts/stems/${dayMaster}.png`}
            alt={centerName || ''}
            width={sealSize}
            height={sealSize}
            style={draw < 1 ? {
              WebkitMaskImage: `conic-gradient(from -90deg, #000 ${draw * 360}deg, transparent 0)`,
              maskImage: `conic-gradient(from -90deg, #000 ${draw * 360}deg, transparent 0)`,
            } : undefined}
          />
        ) : null}
        {centerName ? <span className="cname">{centerName}</span> : null}
      </div>

      {nodes.map((n, idx) => {
        const p = nodePos(geom, n);
        const d = n.d * scale;
        const sel = selected === n.el;
        const bloomStyle = bloom && bloom[idx] !== undefined
          ? { opacity: String(bloom[idx]), transform: `scale(${(0.72 + 0.28 * bloom[idx]).toFixed(3)})` }
          : null;
        return (
          <div
            key={n.el}
            className={`node n-${n.el}${sel ? ' sel' : ''}`}
            data-el={n.el}
            title={interactive ? NM[n.el] : undefined}
            onClick={interactive && onSelect ? () => onSelect(n.el) : undefined}
            style={{
              width: d, height: d,
              left: (p.x - d / 2).toFixed(1) + 'px',
              top: (p.y - d / 2).toFixed(1) + 'px',
              gap,
              ...(bloomStyle || {}),
            }}
          >
            <svg className="elmark" viewBox="0 0 24 24" style={{ width: mk, height: mk }}>
              <use href={`#el-${n.el}`} />
            </svg>
            <span className="pc" style={{ fontSize: pcSize }}>{tilde ? `~${n.pc}` : n.pc}</span>
          </div>
        );
      })}
    </div>
  );
}
