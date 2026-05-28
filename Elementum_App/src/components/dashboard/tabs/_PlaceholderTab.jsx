// ===================================================================
// ELEMENTUM · _PlaceholderTab
// ===================================================================
// Shared shell used by Phase-1 placeholder tabs so each one renders
// distinctively (so we can confirm routing works) without committing
// to copy or layout that Phase 2/3/4 will replace anyway.
//
// Once the real screen for a tab lands, delete the placeholder import
// and the *Screen wrapper file imports — this file stays as the locked
// "Coming next" surface used inside the Reading catalogue.
// ===================================================================

import React from 'react';
import { Icon } from '../../shared/icons';
import {
  ink, inkSoft, inkLight, paperHair, bronzeDark,
  parchment,
} from '../../../styles/tokens';

export default function PlaceholderTab({
  eyebrow,
  title,
  subtitle,
  iconId,
  note,
}) {
  return (
    <main
      style={{
        minHeight: '100%',
        padding: '74px 22px 24px',  // 74 leaves room for status bar (per legacy)
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
      }}
    >
      {/* Page header — eyebrow + title (DOC5 §3 standard) */}
      <header style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span
          style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 10,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            color: bronzeDark,
            fontWeight: 500,
          }}
        >
          {eyebrow}
        </span>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 38,
            fontWeight: 400,
            lineHeight: 1.1,
            color: ink,
            margin: 0,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 15,
              lineHeight: 1.65,
              color: inkSoft,
              margin: '8px 0 0',
            }}
          >
            {subtitle}
          </p>
        )}
      </header>

      {/* Empty state card — paper-quiet surface with iconography */}
      <section
        style={{
          background: parchment,
          border: `1px solid ${paperHair}`,
          borderRadius: 16,
          padding: '36px 22px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
        }}
      >
        {iconId && (
          <div
            style={{
              width: 56, height: 56, borderRadius: 22,
              background: 'rgba(139,115,85,0.06)',
              border: `1px solid ${paperHair}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: inkSoft,
            }}
          >
            <Icon id={iconId} size={28} />
          </div>
        )}
        <p
          style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 14,
            lineHeight: 1.55,
            color: inkLight,
            textAlign: 'center',
            margin: 0,
            maxWidth: 260,
          }}
        >
          {note}
        </p>
      </section>
    </main>
  );
}
