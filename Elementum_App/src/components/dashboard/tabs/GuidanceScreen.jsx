// ===================================================================
// ELEMENTUM · GuidanceScreen — "Your Guidance / Paths Forward" hub
// ===================================================================
// screens-v2 design: a 268px ink-wash hero (HorizonHeader variant="hero"),
// a "Five practices" mono divider, the featured Elemental Draw InkTile, and
// a 2×2 grid of the four other features as matted-ink InkTiles.
//
// Tier gating is preserved: a gated tile (Manual/Self-Report = Seeker,
// Consultant = Advisor) opens the upgrade modal instead of routing. The
// design shows no explicit lock visual — the tier eyebrow ('Seeker' /
// '✦ Advisor') is the gating cue, faithful to the mock.
// ===================================================================

import { useChart } from '../../../store/chartContext.jsx';
import { useUpgrade } from '../UpgradeModal.jsx';
import HorizonHeader from '../../guidance/HorizonHeader.jsx';
import InkTile from '../../guidance/InkTile.jsx';

const TIER_RANK = { free: 0, seeker: 1, advisor: 2 };

// Featured full-width card (Elemental Draw).
const FEATURED = {
  key: 'draw', route: 'app-draw', tier: 'free',
  tint: '196,116,90', ink: '/art/ink-draw.png', glyph: '抽', glyphColor: 'rgb(158,85,64)',
  title: 'Elemental Draw', action: "Draw today's card",
};

// 2×2 grid (Manual · Self-Report · Consultant · Codex). `tier` drives gating;
// `tierLabel` is the design eyebrow (Codex shows "Learn", not a gate).
const GRID = [
  { key: 'manual',     route: 'app-manual',     tier: 'seeker',  tint: '122,158,110', ink: '/art/ink-manual.png',     glyph: '册', glyphColor: 'rgb(88,122,77)',  tierLabel: 'Seeker',     tierColor: 'rgb(107,83,57)',  title: 'Energy Manual', subtitle: 'Your life, by domain' },
  { key: 'selfreport', route: 'app-selfreport', tier: 'seeker',  tint: '90,127,168',  ink: '/art/ink-selfreport.png', glyph: '省', glyphColor: 'rgb(62,95,133)',  tierLabel: 'Seeker',     tierColor: 'rgb(107,83,57)',  title: 'Self-Report',   subtitle: 'Calibrate your reading' },
  { key: 'consultant', route: 'app-consultant', tier: 'advisor', tint: '122,94,154',  ink: '/art/ink-consultant.png', glyph: '問', glyphColor: 'rgb(95,72,125)',  tierLabel: '✦ Advisor',  tierColor: 'rgb(95,72,125)',  title: 'AI Consultant', subtitle: 'Ask anything, anytime' },
  { key: 'codex',      route: 'app-codex',      tier: 'free',    tint: '139,163,184', ink: '/art/ink-codex.png',      glyph: '典', glyphColor: 'rgb(106,132,154)', tierLabel: 'Learn',      tierColor: 'rgb(133,125,114)', title: 'BaZi Codex',   subtitle: 'The concepts, in plain words' },
];

export default function GuidanceScreen({ onOpen }) {
  const { tier, chart } = useChart();
  const { openUpgrade, advisorGlow } = useUpgrade();
  const rank = TIER_RANK[tier] ?? 0;
  const locked = (t) => rank < (TIER_RANK[t] ?? 0);
  // Today's elemental current — drives the featured Draw tile's "{element} day".
  const dayEl = chart?.currentFlowDay?.stemElement || 'Metal';

  const open = (card) => (locked(card.tier) ? openUpgrade(card.title) : onOpen?.(card.route));

  return (
    <main style={{ minHeight: '100%', background: 'transparent', padding: '54px 18px 24px' }}>
      <HorizonHeader
        variant="hero"
        art="/art/guidance-hero.png"
        bgPosition="50% 20%"
        sidePad={22}
        eyebrow="Your Guidance"
        title="Paths Forward"
        subtitle="Five ways to walk with your chart — from a daily question to a reading of your whole life."
      />

      {/* Five practices — mono divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 13 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgb(133,125,114)' }}>
          Five practices
        </span>
        <span style={{ flex: 1, height: 1, background: 'rgba(120,100,70,0.16)' }} />
      </div>

      {/* Featured Elemental Draw */}
      <div style={{ marginTop: 14 }}>
        <InkTile
          variant="featured"
          tint={FEATURED.tint}
          ink={FEATURED.ink}
          glyph={FEATURED.glyph}
          glyphColor={FEATURED.glyphColor}
          eyebrow="Today's Rite"
          eyebrowSub={`${dayEl} day`}
          title={FEATURED.title}
          action={FEATURED.action}
          onClick={() => open(FEATURED)}
        />
      </div>

      {/* 2×2 feature grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11, marginTop: 11 }}>
        {GRID.map((c) => (
          <InkTile
            key={c.key}
            variant="grid"
            tint={c.tint}
            ink={c.ink}
            glyph={c.glyph}
            glyphColor={c.glyphColor}
            tier={c.tierLabel}
            tierColor={c.tierColor}
            title={c.title}
            subtitle={c.subtitle}
            glow={advisorGlow && c.key === 'consultant'}
            onClick={() => open(c)}
          />
        ))}
      </div>
    </main>
  );
}
