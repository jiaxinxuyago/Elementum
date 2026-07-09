// ===================================================================
// ELEMENTUM · TGRing  (DES_04 §11 element-colored Ten God ring)
// ===================================================================
// Radial donut encoding two dimensions at once:
//   · segment SIZE  = weight of each Ten God role across the 4 pillars
//   · segment COLOR = the element-ROLE that group plays, from the DM's
//     perspective (fixed mapping — a Fire-red ring always = Authority).
//
// Role → color (DES_04 §11):
//   Authority 官杀 = Fire red · Resource 印 = Earth gold ·
//   Wealth 财 = Wood green · Output 食伤 = Water blue ·
//   Companion 比劫 = Metal silver
//
// Input: chart.tenGods (per-pillar TG objects with .family). We tally
// family counts across the visible pillars and draw proportional arcs.
// ===================================================================

import { inkLight, inkSoft } from '../../styles/tokens';

// Calculator family → role meta (label + DES_04 role color).
const ROLE = {
  officer:  { key: 'authority', label: 'Authority', color: '#c85a3c' },
  wealth:   { key: 'wealth',    label: 'Wealth',    color: '#4a9a5c' },
  output:   { key: 'output',    label: 'Output',    color: '#3c6a9a' },
  seal:     { key: 'resource',  label: 'Resource',  color: '#c8963c' },
  self:     { key: 'companion', label: 'Companion', color: '#b0b8c8' },
};
const ROLE_ORDER = ['officer', 'wealth', 'output', 'seal', 'self'];

function polar(cx, cy, r, deg) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}
// Donut arc path between two angles (degrees), outer radius R, inner r.
function donutArc(cx, cy, R, r, a0, a1) {
  const large = a1 - a0 > 180 ? 1 : 0;
  const [ox0, oy0] = polar(cx, cy, R, a0);
  const [ox1, oy1] = polar(cx, cy, R, a1);
  const [ix1, iy1] = polar(cx, cy, r, a1);
  const [ix0, iy0] = polar(cx, cy, r, a0);
  return `M ${ox0} ${oy0} A ${R} ${R} 0 ${large} 1 ${ox1} ${oy1} L ${ix1} ${iy1} A ${r} ${r} 0 ${large} 0 ${ix0} ${iy0} Z`;
}

export default function TGRing({ tenGods, dmElement, polarity, size = 184 }) {
  // Tally family counts across the visible (non-self-day) pillars.
  const counts = {};
  const fields = ['yearStem', 'yearBranch', 'monthStem', 'monthBranch', 'dayBranch', 'hourStem', 'hourBranch'];
  for (const f of fields) {
    const fam = tenGods?.[f]?.family;
    if (fam && ROLE[fam]) counts[fam] = (counts[fam] || 0) + 1;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  const present = ROLE_ORDER.filter((f) => counts[f] > 0);

  const cx = size / 2, cy = size / 2;
  const R = size / 2 - 4, r = R * 0.6;
  const gap = 2.5; // degrees between segments

  // Segments with a running start-angle. Built via reduce (immutable, no
  // render-time variable reassignment); `end` carries the cumulative angle.
  const segs = present.reduce((acc, fam) => {
    const cursor = acc.length ? acc[acc.length - 1].end : 0;
    const sweep = (counts[fam] / total) * 360;
    return [...acc, { fam, a0: cursor + gap / 2, a1: cursor + sweep - gap / 2, end: cursor + sweep, role: ROLE[fam], count: counts[fam] }];
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          {segs.map((s) => (
            <path key={s.fam} d={donutArc(cx, cy, R, r, s.a0, s.a1)} fill={s.role.color} opacity={0.88} />
          ))}
        </svg>
        {/* Center label: DM element + polarity */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22,
            fontWeight: 500, color: inkSoft, lineHeight: 1,
          }}>{dmElement}</div>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11,
            color: inkLight, letterSpacing: 1, textTransform: 'uppercase',
          }}>{polarity === 'yin' ? 'Yin' : 'Yang'}</div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', justifyContent: 'center' }}>
        {segs.map((s) => (
          <span key={s.fam} style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11.5, color: inkSoft,
          }}>
            <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 999, background: s.role.color }} />
            {s.role.label}
          </span>
        ))}
      </div>
    </div>
  );
}
