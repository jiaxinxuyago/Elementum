// ===================================================================
// ELEMENTUM · LockedDetail
// ===================================================================
// Generic "Coming next" / placeholder destination for reading-catalogue
// cards that haven't yet been built out (Forces in Motion, Life
// Chapters in Phase 2). Distinct from the tier-locked card visual —
// this is a "we'll build it later" affordance, not a paywall.
//
// When Phase 4 lands the upgrade-modal pattern (Q5.c), tier-locked
// CTAs from the catalogue will route through that modal instead of
// landing here. This component stays for "scheduled but not yet built"
// destinations.
//
// Spec: DOC5 §AM.5 dashed-border affordance for scaffold states.
// ===================================================================

import DetailShell from './DetailShell.jsx';
import { Icon } from '../../shared/icons';
import { readingDetailBg } from '../../../styles/backgrounds.js';
import { inkSoft, inkLight, inkMist, paperHair } from '../../../styles/tokens';

export default function LockedDetail({
  onBack,
  eyebrow = 'COMING NEXT · 待 续',
  title = 'This reading is scheduled',
  body = 'This part of your chart is being prepared and will land in a future release. The data is already calculated — only the writing is pending.',
}) {
  return (
    <DetailShell
      onBack={onBack}
      eyebrow={eyebrow}
      title={title}
      bg={readingDetailBg()}
    >
      {/* Dashed-border empty-state card per §AM.5 */}
      <section
        style={{
          background: 'transparent',
          border: `1px dashed ${paperHair}`,
          borderRadius: 16,
          padding: '36px 24px',
          margin: '14px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          textAlign: 'center',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: 56, height: 56, borderRadius: 22,
            background: 'rgba(139, 115, 85, 0.06)',
            border: `1px dashed ${paperHair}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: inkLight,
          }}
        >
          <Icon id="ico-empty" size={28} />
        </div>
        <p
          style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 14.5,
            lineHeight: 1.7,
            color: inkSoft,
            margin: 0,
            maxWidth: 300,
          }}
        >
          {body}
        </p>
        <span
          style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 11.5,
            color: inkMist,
            letterSpacing: 0.3,
          }}
        >
          Tap back to return to Readings.
        </span>
      </section>
    </DetailShell>
  );
}
