// ─────────────────────────────────────────────────────────────────────────────
// SHARED · PanelCard
// ─────────────────────────────────────────────────────────────────────────────
// A labeled cardstock panel (uppercase eyebrow label + content). Used by the
// time pages (Month / Decade), previously copy-pasted in each. Distinct from
// reading-detail's pigment/eyebrow SectionCard (different prop shape).
// ─────────────────────────────────────────────────────────────────────────────

import { cardstockBg, paperHair, bronzeDark } from '../../styles/tokens';

export default function PanelCard({ label, children, style }) {
  return (
    <section style={{
      background: cardstockBg, border: `1px solid ${paperHair}`,
      borderRadius: 12, padding: 12, ...(style || {}),
    }}>
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
        color: bronzeDark, fontWeight: 500, marginBottom: 10,
      }}>{label}</div>
      {children}
    </section>
  );
}
