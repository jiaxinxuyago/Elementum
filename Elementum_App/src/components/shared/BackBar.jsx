// ─────────────────────────────────────────────────────────────────────────────
// SHARED · BackBar
// ─────────────────────────────────────────────────────────────────────────────
// Uppercase chevron-left back affordance used by the time pages (Day / Month /
// Decade). Previously copy-pasted in each; promoted here so the styling is
// changed in one place.
// ─────────────────────────────────────────────────────────────────────────────

import { Icon } from './icons';
import { inkLight } from '../../styles/tokens';

export default function BackBar({ label, onBack }) {
  return (
    <button
      type="button"
      onClick={onBack}
      style={{
        appearance: 'none', background: 'transparent', border: 'none',
        padding: '4px 0 4px', display: 'inline-flex', alignItems: 'center', gap: 6,
        cursor: 'pointer', color: inkLight,
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
      }}
    >
      <Icon id="ico-chev-l" size={14} color={inkLight} />
      {label}
    </button>
  );
}
