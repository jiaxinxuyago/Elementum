// ===================================================================
// ELEMENTUM · ReadingScreen — tiered pyramid · Inkstone art system
// ===================================================================
// Direction 2 layout (mosaic hub) × Thumbnail Card Moodboard recipes.
//
//   1. Day-master SCENE-HERO (264) — moodboard ink-wash treatment +
//      centered 庚 stem mark + eyebrow / archetype / polarity overlay.
//   2. "Readings" / "Energy Map →" header.
//   3. Featured Elemental Nature (104) — silk-paper footer recipe,
//      seal mark badge + hanzi watermark, per-stem painting.
//   4. Themed pair (140) — Dominant Energies + Forces in Motion,
//      footer recipe each, per-element painting.
//   5. Compact pair (84) — Life Chapters + Pillar Patterns, footer
//      recipe (compact), generic landscape for the pillar-patterns
//      tile (non-element-themed feature).
//
// Each tile picks its painting via stemArt(stem) or elementArt(element).
// ===================================================================

import React from 'react';
import { useChart } from '../../../store/chartContext.jsx';
import { useUpgrade } from '../UpgradeModal.jsx';
import { Icon, ElementMark } from '../../shared/icons';
import StemSeal from '../../shared/StemSeal.jsx';
import { catArt } from '../../../styles/backgrounds.js';
import { STEM_CARD_DATA } from '../../../content/archetypeSource.js';
import { buildComposition } from '../../shared/EnergyBlueprint.jsx';
import {
  ink, inkSoft, inkLight, bronzeDark, gold,
  paperHair, cardstockBg, quietBg, quietBorder,
  pigments, withAlpha,
} from '../../../styles/tokens';

const ELEMENT_TO_PIGMENT = {
  Metal: 'metal', Wood: 'wood', Fire: 'fire', Earth: 'earth', Water: 'water',
};
const ELEMENT_HANZI = {
  Metal: '金', Wood: '木', Fire: '火', Earth: '土', Water: '水',
};
const HANZI_PINYIN = {
  '甲': 'Yang Wood',  '乙': 'Yin Wood',  '丙': 'Yang Fire', '丁': 'Yin Fire',
  '戊': 'Yang Earth', '己': 'Yin Earth', '庚': 'Yang Metal', '辛': 'Yin Metal',
  '壬': 'Yang Water', '癸': 'Yin Water',
};
// Controlling element (resistance) per Day Master element — the force that
// wears the DM down. Drives the ↓ flag on the Forces row.
const CTL = { Metal: 'Fire', Wood: 'Metal', Water: 'Earth', Fire: 'Water', Earth: 'Wood' };
// Generating element (resource) per Day Master — the force that lifts/feeds
// it. Drives the ↑ flag. Structurally distinct from CTL, so never duplicates.
const GEN_BY = { Metal: 'Earth', Wood: 'Water', Water: 'Metal', Fire: 'Wood', Earth: 'Fire' };

export default function ReadingScreen({ onOpen, onOpenEnergyMap }) {
  const { chart, tier } = useChart();
  const { openUpgrade } = useUpgrade();

  const dmHanzi = chart?.dayMaster?.stem || '庚';
  const dmElement = chart?.dayMaster?.element || 'Metal';
  const pigmentKey = ELEMENT_TO_PIGMENT[dmElement] || 'metal';
  const pig = pigments[pigmentKey];
  const archetype = STEM_CARD_DATA[dmHanzi]?.identity?.archetypeName || `${dmElement} Day Master`;
  const polarityLabel = HANZI_PINYIN[dmHanzi] || dmElement;

  const liftEl = GEN_BY[dmElement] || 'Earth';        // ↑ what lifts (resource)
  const resistanceEl = CTL[dmElement] || 'Fire';      // ↓ what wears (control)

  // Five-element composition (shared with the Energy Map) → identity-card
  // distribution strip + the Primary/Secondary element flags.
  const composition = React.useMemo(() => buildComposition(chart) || [], [chart]);
  const secondaryEl = composition.find((c) => c.en !== dmElement && c.n > 0)?.en || liftEl;
  // Elements the chart is entirely missing → gate the conditional Seasonal
  // Calibration row (mirrors getReadingSections + SeasonalCalibrationDetail,
  // so the catalogue and the detail pager list the same sections — Audit S2/S3).
  const missingEls = composition.filter((c) => c.n === 0).map((c) => c.en);

  const go = (route) => () => onOpen?.(route);

  // ── Reading rows (v2 bleed list). Each routes to its detail page; the
  // element badges encode the forces in play. Daily Reading is Seeker-
  // gated (opens the upgrade modal on Free).
  const isFree = tier === 'free';
  const READINGS = [
    { key: 'nature',   ti: 'Elemental Nature',  d: 'Your five-element composition.',     onTap: go('read-elemental'), badges: [[dmElement, 'primary']] },
    { key: 'dominant', ti: 'Dominant Energies', d: 'Primary & secondary forces.',        onTap: go('read-tengods'),   badges: [[dmElement, 'primary'], [secondaryEl, 'sec']] },
    { key: 'forces',   ti: 'Forces in Motion',  d: 'What lifts you, what wears you.',     onTap: go('read-forces'),    badges: [[liftEl, 'up'], [resistanceEl, 'down']] },
    // Seasonal Calibration — conditional: only appears when an element is
    // absent, matching the detail pager's condition (Audit S2/S3).
    ...(missingEls.length
      ? [{ key: 'seasonal', ti: 'Seasonal Calibration', d: 'Cultivating what your chart is missing.', onTap: go('read-seasonal'), badges: missingEls.map((el) => [el, 'sec']) }]
      : []),
    { key: 'chapters', ti: 'Life Chapters',     d: 'Your ten-year journey.',             onTap: go('read-chapters'),  badges: [] },
    { key: 'daily',    ti: 'Daily Reading',     d: "Today's alignment.",                 onTap: isFree ? () => openUpgrade('Daily Reading') : () => onOpen?.('app-today'), locked: isFree, tierLabel: 'Seeker', badges: [] },
    { key: 'pillars',  ti: 'Pillar Patterns',   d: 'The four pillars of your chart.',    onTap: go('read-patterns'),  badges: [] },
  ];

  return (
    <main style={{ minHeight: '100%', padding: '0 0 24px' }}>
      {/* ── Page head — title + Energy Map link ──────────────────── */}
      <div style={{
        padding: '6px 18px 13px',
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        borderBottom: `1px solid ${paperHair}`,
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 26, fontWeight: 600, color: ink,
        }}>Readings</span>
        <button type="button" onClick={onOpenEnergyMap} style={{
          appearance: 'none', background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13,
          color: bronzeDark, borderBottom: `1px dashed ${paperHair}`, padding: '0 0 2px',
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
          Energy Map <Icon id="ico-arrow-r" size={12} color={bronzeDark} />
        </button>
      </div>

      {/* ── Identity card — ink-wash stem seal + distribution ────── */}
      <div style={{ padding: '14px 18px 0' }}>
        <IdentityCard
          stem={dmHanzi}
          archetype={archetype}
          polarityLabel={polarityLabel}
          dmElement={dmElement}
          pig={pig}
          composition={composition}
          secondaryEl={secondaryEl}
          catalystEl={liftEl}
          resistanceEl={resistanceEl}
          onClick={go('read-daymaster')}
        />
      </div>

      {/* ── Reading rows — bleed list ────────────────────────────── */}
      <div style={{ padding: '14px 18px 0' }}>
        <span style={{
          display: 'block',
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 9.5, letterSpacing: 2, textTransform: 'uppercase',
          color: bronzeDark, fontWeight: 600, marginBottom: 8,
        }}>Readings</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {READINGS.map((r) => <ReadingRow key={r.key} row={r} />)}
        </div>
      </div>
    </main>
  );
}

// ───────────────────────────────────────────────────────────────────
// IdentityCard (Rendered Screens v2) — the day-master identity on a
// quiet paper card with the ceremonial ink-wash stem seal as the "one
// subject" (left), eyebrow / archetype / manifesto stacked right. The
// seal sits on paper (not over a painting) so it reads cleanly. A thin
// element-pigment rule tops the card. Tap → Day Master detail.
// ───────────────────────────────────────────────────────────────────
function IdentityCard({
  stem, archetype, polarityLabel, dmElement, pig,
  composition = [], secondaryEl, catalystEl, resistanceEl, onClick,
}) {
  const [pressed, setPressed] = React.useState(false);
  const manifesto = (STEM_CARD_DATA[stem]?.identity?.manifesto || '').split(' · ')[0]
    || `Your ${dmElement.toLowerCase()} nature.`;
  const segs = composition.filter((c) => c.n > 0);
  const flags = [
    [dmElement, 'Primary'],
    secondaryEl && secondaryEl !== dmElement ? [secondaryEl, '2nd'] : null,
    catalystEl ? [catalystEl, '↑'] : null,
    resistanceEl ? [resistanceEl, '↓'] : null,
  ].filter(Boolean);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Day Master ${stem} ${archetype} — open detail`}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        appearance: 'none', position: 'relative', display: 'block',
        width: '100%', textAlign: 'left', cursor: 'pointer',
        background: cardstockBg,
        border: `1px solid ${paperHair}`, borderRadius: 16,
        padding: '16px 16px 16px', overflow: 'hidden',
        transform: pressed ? 'scale(0.995)' : 'none',
        transition: 'transform 140ms cubic-bezier(0.22,1,0.36,1)',
        boxShadow: '0 1px 0 rgba(43,39,34,.04), 0 8px 20px rgba(60,46,28,.07)',
      }}
    >
      {/* element-pigment top rule */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, right: 0, top: 0,
        height: 3, background: pig.deep, opacity: 0.85,
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <StemSeal stem={stem} size={84} style={{ flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase',
            color: pig.deep, fontWeight: 600, marginBottom: 4,
          }}>
            Your Day Master · {stem} {polarityLabel}
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 28, fontWeight: 600, color: ink, lineHeight: 1.04,
          }}>
            {archetype}
          </div>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 13.5, color: inkSoft, marginTop: 4, lineHeight: 1.4,
          }}>
            {manifesto}
          </div>
        </div>
      </div>

      {/* Distribution strip — five-element composition */}
      {segs.length > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          marginTop: 13, paddingTop: 12,
          borderTop: '1px solid rgba(205,190,158,0.5)',
        }}>
          <div style={{
            flex: 1, display: 'flex', gap: 2, height: 7,
            borderRadius: 3, overflow: 'hidden',
          }}>
            {segs.map((c) => (
              <span key={c.key} style={{
                flex: c.n, display: 'block',
                background: pigments[c.key]?.base || c.color,
              }} />
            ))}
          </div>
        </div>
      )}

      {/* Element flags — primary · secondary · catalyst↑ · resistance↓ */}
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 11 }}>
        {flags.map(([el, role]) => <Flag key={role} el={el} role={role} />)}
      </div>
    </button>
  );
}

// ── Flag — small element pill (Primary / 2nd / ↑ / ↓) ─────────────
function Flag({ el, role }) {
  const key = ELEMENT_TO_PIGMENT[el] || 'metal';
  const p = pigments[key];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11,
      padding: '3px 8px', borderRadius: 999,
      border: `1px solid ${withAlpha(p.base, '40')}`,
      background: withAlpha(p.base, '10'), color: p.deep,
    }}>
      <span style={{ color: p.deep, display: 'flex' }}>
        <ElementMark element={key} size={12} />
      </span>
      <span style={{ fontWeight: 500 }}>{el}</span>
      <span style={{ fontSize: 9, letterSpacing: 0.5, textTransform: 'uppercase', opacity: 0.7 }}>{role}</span>
    </span>
  );
}

// ── ReadingRow (v2 bleed list) — text + element badges on the left, the
// painterly cat-* crop dissolving in from the right; chevron or lock. ──
function ReadingRow({ row }) {
  const [pressed, setPressed] = React.useState(false);
  const art = catArt(row.key);
  const locked = !!row.locked;
  const baseBg = locked ? quietBg : cardstockBg;
  return (
    <button
      type="button"
      onClick={row.onTap}
      aria-label={`${row.ti}${locked ? ` (locked — ${row.tierLabel})` : ''}`}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        appearance: 'none', position: 'relative', display: 'flex', alignItems: 'center',
        width: '100%', minHeight: 96, padding: '15px 16px', borderRadius: 16,
        background: baseBg, border: `1px solid ${locked ? quietBorder : paperHair}`,
        overflow: 'hidden', cursor: 'pointer', textAlign: 'left',
        boxShadow: '0 4px 12px rgba(60,46,28,.06)',
        transform: pressed ? 'scale(0.99)' : 'none',
        transition: 'transform 120ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* painterly crop bleeding in from the right */}
      {art && (
        <div aria-hidden="true" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '52%' }}>
          <img src={art} alt="" style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: locked ? 'grayscale(.45) brightness(1.05)' : 'none',
            opacity: locked ? 0.7 : 1,
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to right, ${baseBg} 12%, rgba(244,236,217,0.4) 42%, transparent 78%)`,
          }} />
        </div>
      )}

      {/* text + badges */}
      <div style={{ position: 'relative', zIndex: 2, flex: 1, maxWidth: '64%' }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 19, fontWeight: 600, lineHeight: 1.08,
          color: locked ? inkSoft : ink,
          display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap',
        }}>
          {row.ti}
          {locked && row.tierLabel && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 3,
              fontFamily: "'EB Garamond', Georgia, serif", fontSize: 8,
              letterSpacing: 0.5, textTransform: 'uppercase', color: bronzeDark,
              border: `1px solid ${withAlpha(gold, '40')}`, borderRadius: 5,
              padding: '1px 5px', marginLeft: 6, verticalAlign: 2,
            }}>◆ {row.tierLabel}</span>
          )}
        </div>
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 12, color: inkLight, lineHeight: 1.35, marginTop: 2,
        }}>{row.d}</div>
        {row.badges?.length > 0 && (
          <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
            {row.badges.map(([el, st], i) => <ElBadge key={i} el={el} state={st} />)}
          </div>
        )}
      </div>

      {/* chevron / lock */}
      <span style={{ position: 'relative', zIndex: 2, marginLeft: 8, flexShrink: 0, display: 'flex' }}>
        <Icon id={locked ? 'ico-lock' : 'ico-chev-r'} size={locked ? 17 : 18} color={locked ? gold : inkLight} />
      </span>
    </button>
  );
}

// ── ElBadge — element seal in a rounded tile; primary filled, sec smaller,
// up/down carry a corner direction chip. ──────────────────────────────
function ElBadge({ el, state }) {
  const key = ELEMENT_TO_PIGMENT[el] || 'metal';
  const p = pigments[key];
  const primary = state === 'primary';
  const dir = state === 'up' ? '↑' : state === 'down' ? '↓' : null;
  const size = state === 'sec' ? 25 : 28;
  return (
    <span style={{
      position: 'relative', width: size, height: size, borderRadius: 8,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: primary ? p.deep : withAlpha(p.base, '10'),
      border: `1.5px solid ${withAlpha(p.base, '40')}`,
      boxShadow: '0 3px 7px rgba(60,46,28,.14)',
    }}>
      <span style={{ color: primary ? '#F4ECD9' : p.deep, display: 'flex' }}>
        <ElementMark element={key} size={state === 'sec' ? 14 : 16} />
      </span>
      {dir && (
        <span style={{
          position: 'absolute', right: -5, top: -6, width: 14, height: 14,
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 9, fontWeight: 700, background: '#F4ECD9',
          border: `1.5px solid ${withAlpha(p.base, '40')}`, color: p.deep, lineHeight: 1,
        }}>{dir}</span>
      )}
    </span>
  );
}
