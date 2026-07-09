// ===================================================================
// ELEMENTUM · UpgradeModal + provider  (DES_04 §21)
// ===================================================================
// Cross-cutting upgrade flow. Any screen can trigger it:
//
//   const { openUpgrade } = useUpgrade();
//   <button onClick={() => openUpgrade('Energy Manual')}>…</button>
//
// The provider holds open state + the context label (what feature the
// user tapped). <UpgradeModalHost/> renders the bottom-sheet modal and
// must be mounted INSIDE the phone frame so it overlays only the phone,
// not the whole desktop window.
//
// Tier cards per §21: Seeker (gold gradient) + Advisor (violet gradient),
// each with a feature list and an upgrade CTA wired to setTier(). The
// post-upgrade ceremonial full-screen (§21 Free→Seeker) is deferred —
// flagged in the drift notes; the modal simply upgrades in place + closes.
// ===================================================================

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useChart } from '../../store/chartContext.jsx';
import { useAuth } from '../../store/authContext.jsx';
import AuthModal, { PURCHASE_INTENT_KEY } from './AuthModal.jsx';
import { TIER_PRICES, PAYMENT, FOUNDING_PRICE, FOUNDING_GRANTS_TIER } from '../../infra/index.js';
import { ELEMENT_TO_PIGMENT } from '../../styles/elementPigments.js';
// Stem -> archetype name (10 entries) inlined so this always-mounted provider
// does NOT statically import the 276 KB archetypeSource.js content file
// (Group E — keeps that content out of the eager initial bundle; it rides with
// the lazy reading screens instead).
const ARCHETYPE_NAMES = {
  '甲': 'The Oak', '乙': 'The Vine', '丙': 'The Sun', '丁': 'The Ember', '戊': 'The Mountain',
  '己': 'The Field', '庚': 'The Blade', '辛': 'The Jewel', '壬': 'The Ocean', '癸': 'The Rain',
};
import { Icon } from '../shared/icons';
import StemSeal from '../shared/StemSeal.jsx';
import { ink, inkSoft, inkLight, bronzeDark, gold, advisor, cream, metal, wood, fire, earth, water, pigments } from '../../styles/tokens';

const UpgradeContext = createContext(null);

export function useUpgrade() {
  const ctx = useContext(UpgradeContext);
  if (!ctx) return {
    openUpgrade: () => {}, closeUpgrade: () => {}, playCeremony: () => {},
    playWelcomeBack: () => {}, flashAdvisorGlow: () => {}, advisorGlow: false,
  };
  return ctx;
}

export function UpgradeModalProvider({ children }) {
  const [feature, setFeature] = useState(null);    // null = closed; string = open w/ context
  const [ceremony, setCeremony] = useState(false);  // §21 Free→Seeker full-screen moment
  const [welcomeBack, setWelcomeBack] = useState(false); // §21 Step B returning-user welcome
  const [advisorGlow, setAdvisorGlow] = useState(false); // §21 Seeker→Advisor in-place glow

  const openUpgrade = useCallback((featureLabel) => setFeature(featureLabel || 'this feature'), []);
  const closeUpgrade = useCallback(() => setFeature(null), []);
  const playCeremony = useCallback(() => setCeremony(true), []);
  const endCeremony = useCallback(() => setCeremony(false), []);
  const playWelcomeBack = useCallback(() => setWelcomeBack(true), []);
  const endWelcomeBack = useCallback(() => setWelcomeBack(false), []);
  // Flash the Advisor unlock glow for ~1.4s (Guidance hub reads this).
  const flashAdvisorGlow = useCallback(() => {
    setAdvisorGlow(true);
    setTimeout(() => setAdvisorGlow(false), 1400);
  }, []);

  return (
    <UpgradeContext.Provider value={{
      openUpgrade, closeUpgrade, feature,
      ceremony, playCeremony, endCeremony,
      welcomeBack, playWelcomeBack, endWelcomeBack,
      advisorGlow, flashAdvisorGlow,
    }}>
      {children}
    </UpgradeContext.Provider>
  );
}

// Tier feature lists (DES_04 §21 modal copy).
const SEEKER_FEATURES = [
  'Your Energy Manual — 5-domain living document',
  'Full Energy Map readings',
  'Advanced BaZi Codex',
  'Unlimited Elemental Draw',
];
const ADVISOR_FEATURES = [
  'Everything in Seeker',
  'AI Consultant — full chat',
  'AI-tailored daily readings',
];
// Founding pass — beta-only one-time offer granting lifetime full (Advisor) access.
const FOUNDING_FEATURES = [
  'Lifetime full access — everything, forever',
  'AI Consultant + AI-tailored daily readings',
  'Energy Manual, full readings, Codex, unlimited Draw',
  'Founding member — locked in before public launch',
];

// ───────────────────────────────────────────────────────────────────
// UpgradeModalHost — renders the bottom sheet when open. Mount inside
// the phone frame (App.jsx) so it overlays only the phone surface.
// ───────────────────────────────────────────────────────────────────
import { STEM_PINYIN as STEM_KEY } from '../../engine/index.js';

export function UpgradeModalHost() {
  const {
    feature, openUpgrade, closeUpgrade, ceremony, playCeremony, endCeremony,
    welcomeBack, endWelcomeBack,
  } = useUpgrade();
  const { tier, chart, refreshEntitlements } = useChart();
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  // §4.2b purchase journey: 'idle' | 'resume' (back from Google, one tap to
  // checkout) | 'waiting' (checkout open in another tab; unlock is automatic).
  const [payState, setPayState] = useState('idle');

  // A dismissed sheet must not keep 'waiting'/'resume' alive: reopened later
  // it would claim "complete your purchase in the page that just opened" with
  // no checkout tab in existence. (Trade-off: pay-after-dismiss still unlocks
  // via the focus refresh — it just skips the auto-ceremony.)
  useEffect(() => {
    // yield — no synchronous setState in the effect body
    if (!feature && payState !== 'idle') queueMicrotask(() => setPayState('idle'));
  }, [feature, payState]);

  // Purchase requires an account (INF_01 §4.2): the payment must carry the
  // buyer's user id (client_reference_id) so the Stripe webhook can write
  // their entitlement server-side — that's what makes the pass restorable.
  // §4.2b: checkout opens in a NEW tab so the app never navigates away —
  // quitting checkout = closing that tab, and this screen is still here.
  // Popup-blocked (or window unavailable)? Fall back to same-tab navigation.
  const goToStripe = (u) => {
    if (typeof window === 'undefined' || !PAYMENT.foundingCheckout) return;
    const url = new URL(PAYMENT.foundingCheckout);
    if (u?.id) url.searchParams.set('client_reference_id', u.id);
    if (u?.email) url.searchParams.set('prefilled_email', u.email);
    // NOTE: 'noopener' in the features string makes open() return null even on
    // success — sever the opener manually so blocked-detection stays reliable.
    const tab = window.open(url.toString(), '_blank');
    if (tab) {
      try { tab.opener = null; } catch { /* cross-origin — already severed */ }
      setPayState('waiting');
    } else {
      window.location.href = url.toString(); // popup blocked — same-tab fallback
    }
  };
  const buyFounding = () => (user ? goToStripe(user) : setAuthOpen(true));

  // Google OAuth return trip: the buyer chose "Continue with Google" mid-
  // purchase, left for Google, and just landed back signed in. A new tab
  // can't open from an effect (popup blockers demand a user gesture), so we
  // re-open the sheet in 'resume' state — one tap continues to checkout.
  // Intent is cleared immediately so nothing ever auto-replays.
  useEffect(() => {
    if (!user || typeof window === 'undefined') return;
    let intent = null;
    try {
      intent = sessionStorage.getItem(PURCHASE_INTENT_KEY);
      if (intent === 'founding') sessionStorage.removeItem(PURCHASE_INTENT_KEY);
    } catch { /* storage unavailable — nothing to resume */ }
    if (intent === 'founding' && tier !== FOUNDING_GRANTS_TIER) {
      // yield — no synchronous setState in the effect body
      queueMicrotask(() => {
        setPayState('resume');
        openUpgrade('Founding Pass');
      });
    }
    // openUpgrade is stable (useCallback); user is the trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // §4.2b unlock-in-place: the buyer pays in the checkout tab, switches back,
  // the focus-refresh (chartContext) confirms the entitlement — and the
  // ceremony plays right here where they're waiting.
  useEffect(() => {
    if (payState === 'waiting' && tier === FOUNDING_GRANTS_TIER) {
      // yield — no synchronous setState in the effect body
      queueMicrotask(() => {
        setPayState('idle');
        closeUpgrade();
        playCeremony();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payState, tier]);

  const dmElement = chart?.dayMaster?.element || 'Metal';
  const dmPigKey = ELEMENT_TO_PIGMENT[dmElement] || 'metal';
  const checkColor = pigments[dmPigKey].deep;
  const stemKey = STEM_KEY[chart?.dayMaster?.stem] || 'geng';

  // Nothing to show?
  if (!feature && !ceremony && !welcomeBack) return null;

  // BETA GATING: the Founding Pass (Stripe) is the ONLY purchasable unlock.
  // The old demo `upgrade()` free-flip (setTier on tap) is removed — it let
  // anyone claim Seeker/Advisor without paying. Seeker/Advisor cards render
  // as a disabled preview ("Available after beta") until real subscription
  // checkout lands (INF_01 §4.2 webhook -> DB entitlements).

  // Returning-user "Welcome to Seeker" (§21 Step B) — highest priority overlay.
  if (welcomeBack) {
    return (
      <WelcomeToSeekerScreen
        element={dmElement} stemKey={stemKey}
        archetype={ARCHETYPE_NAMES[chart?.dayMaster?.stem] || `${dmElement} Day Master`}
        onDone={() => { endWelcomeBack(); if (typeof window !== 'undefined') window.location.hash = '#/app-energymap'; }}
      />
    );
  }

  // Ceremony overlay takes over the phone frame once triggered.
  if (ceremony) {
    return (
      <CeremonyScreen
        element={dmElement}
        stemKey={stemKey}
        onDone={() => {
          endCeremony();
          if (typeof window !== 'undefined') window.location.hash = '#/app-energymap';
        }}
      />
    );
  }

  if (!feature) return null;

  return (
    <div
      // Scrim — covers the phone frame, dims content beneath
      onClick={closeUpgrade}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Sheet — stops click propagation so taps inside don't dismiss */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Upgrade"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxHeight: '85%',
          background: cream,
          borderRadius: '24px 24px 0 0',
          padding: '28px 22px 36px',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.12)',
          overflowY: 'auto',
          animation: 'sheetUp 350ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Inline keyframes for the slide-up (scoped, no global CSS needed) */}
        <style>{`@keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

        {/* Dismiss × */}
        <button
          type="button"
          aria-label="Close"
          onClick={closeUpgrade}
          style={{
            position: 'absolute',
            top: 16, right: 16,
            width: 32, height: 32,
            borderRadius: 999,
            background: 'transparent',
            border: 'none',
            color: inkLight,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Icon id="ico-dismiss" size={18} />
        </button>

        {/* Context header */}
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
          color: bronzeDark, fontWeight: 500, marginBottom: 6, marginTop: 4,
        }}>
          Unlock
        </div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 28, fontWeight: 400, lineHeight: 1.15,
          color: ink, margin: '0 0 22px',
        }}>
          {feature}
        </h2>

        {/* Founding pass — headline offer; shown only once the Stripe link is
            set. §4.2b: the CTA opens Stripe Checkout in a NEW tab; while it's
            open we show the waiting card (unlock lands via focus-refresh + the
            in-place ceremony). 'resume' = back from Google OAuth, one tap left. */}
        {PAYMENT.foundingCheckout && payState === 'waiting' ? (
          <div style={{
            background: 'linear-gradient(135deg, #FBF3E4, #F3E4C8)',
            border: `1.5px solid ${gold}`, borderRadius: 16, padding: 20, marginBottom: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 12, letterSpacing: 2.5, textTransform: 'uppercase', color: bronzeDark, fontWeight: 500, marginBottom: 10 }}>
              ⟡ Founding Pass
            </div>
            <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14.5, lineHeight: 1.6, color: inkSoft, margin: '0 0 14px' }}>
              Complete your purchase in the page that just opened —<br />this screen unlocks automatically.
            </p>
            <button
              type="button"
              onClick={() => refreshEntitlements()}
              style={{
                width: '100%', padding: '13px 0', borderRadius: 999, border: 'none',
                background: bronzeDark, color: '#F8F6F0', fontFamily: 'Cinzel, serif',
                fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer',
              }}
            >
              I've paid — check now
            </button>
            <button
              type="button"
              onClick={() => goToStripe(user)}
              style={{
                display: 'block', margin: '12px auto 0', background: 'transparent', border: 'none',
                color: inkLight, fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13, cursor: 'pointer',
              }}
            >
              Checkout didn't open? Reopen it →
            </button>
          </div>
        ) : PAYMENT.foundingCheckout && payState === 'resume' && user && tier !== FOUNDING_GRANTS_TIER ? (
          <div style={{
            background: 'linear-gradient(135deg, #FBF3E4, #F3E4C8)',
            border: `1.5px solid ${gold}`, borderRadius: 16, padding: 20, marginBottom: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 12, letterSpacing: 2.5, textTransform: 'uppercase', color: bronzeDark, fontWeight: 500, marginBottom: 10 }}>
              ⟡ Founding Pass
            </div>
            <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14.5, lineHeight: 1.6, color: inkSoft, margin: '0 0 14px' }}>
              Signed in as {user.email} ✓
            </p>
            <button
              type="button"
              onClick={() => goToStripe(user)}
              style={{
                width: '100%', padding: '13px 0', borderRadius: 999, border: 'none',
                background: bronzeDark, color: '#F8F6F0', fontFamily: 'Cinzel, serif',
                fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer',
              }}
            >
              Continue to checkout — {FOUNDING_PRICE}
            </button>
          </div>
        ) : PAYMENT.foundingCheckout && (
          <TierCard
            name="Founding Pass"
            badge="⟡"
            price={FOUNDING_PRICE}
            gradient="linear-gradient(135deg, #FBF3E4, #F3E4C8)"
            border={`1.5px solid ${gold}`}
            features={FOUNDING_FEATURES}
            checkColor={checkColor}
            ctaLabel={tier === FOUNDING_GRANTS_TIER ? 'You have full access' : 'Become a Founding member'}
            ctaDisabled={tier === FOUNDING_GRANTS_TIER}
            ctaBg={bronzeDark}
            onUpgrade={buyFounding}
          />
        )}

        {/* Seeker tier card */}
        <TierCard
          name="Seeker"
          badge="◆"
          price={TIER_PRICES.seeker}
          gradient="linear-gradient(135deg, #FAF8F5, #F0EBE1)"
          border={`1.5px solid ${gold}`}
          features={SEEKER_FEATURES}
          checkColor={checkColor}
          ctaLabel={tier === 'free' ? 'Available after beta' : 'Current plan'}
          ctaDisabled
          ctaBg={bronzeDark}
        />

        {/* Advisor tier card */}
        <TierCard
          name="Advisor"
          badge="✦"
          price={TIER_PRICES.advisor}
          gradient="linear-gradient(135deg, #F8F4FF, #F0E8FF)"
          border={`1px solid #C9B8E8`}
          features={ADVISOR_FEATURES}
          checkColor={advisor}
          ctaLabel={tier === 'advisor' ? 'Current plan' : 'Available after beta'}
          ctaDisabled
          ctaBg={advisor}
        />

        {/* Not now */}
        <button
          type="button"
          onClick={closeUpgrade}
          style={{
            display: 'block',
            margin: '8px auto 0',
            background: 'transparent',
            border: 'none',
            color: inkLight,
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Not now
        </button>
      </div>

      {/* Purchase-gated account sheet — overlays the paywall (zIndex 210 > 200).
          On success the buyer continues straight to Stripe, id attached. */}
      <AuthModal
        open={authOpen}
        purchase
        onClose={() => setAuthOpen(false)}
        onSuccess={(u) => goToStripe(u)}
      />
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────
// CeremonyScreen — §21 Free→Seeker "Your reading has been unsealed".
// Full-screen, CSS-animated, skippable by tap. ~3.5s then CTA → Energy Map.
//   1. element flood (0–600ms)   2. seal spring-in (400–900ms)
//   3. particle burst (600–1200ms)  4. text (900ms)  5. CTA (1800ms)
// ───────────────────────────────────────────────────────────────────
const FLOOD_COLOR = {
  Wood: '#4A7C59', Fire: '#C0392B', Earth: '#B8860B', Metal: '#7F8C8D', Water: '#2E4057',
};
const PARTICLE_COLORS = [metal, wood, fire, earth, water];

// Ceremonial seal medallion (Group D) — the painterly StemSeal (dark ink, all 10
// stems) on a warm cream disc with a faint gold rim, so it reads on the dark
// ceremony background. Replaces the white dm-* glyphs whose Yin variants were
// still v4 line placeholders; now every stem shows its finished ink-wash seal.
function SealMedallion({ stemKey, size = 92 }) {
  return (
    <div style={{
      width: size + 30, height: size + 30, borderRadius: 999, margin: '0 auto',
      background: 'radial-gradient(circle at 50% 38%, #faf6ec, #ebe2cf)',
      border: '1px solid rgba(212,175,55,0.5)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.42), inset 0 1px 2px rgba(255,255,255,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <StemSeal stem={stemKey} size={size} />
    </div>
  );
}

function CeremonyScreen({ element, stemKey, onDone }) {
  const flood = FLOOD_COLOR[element] || FLOOD_COLOR.Metal;
  // 24 particles on a radial burst, deterministic angles.
  const particles = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const dist = 90 + (i % 4) * 26;
    return {
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      size: 4 + (i % 3),
      delay: 600 + (i % 6) * 18,
    };
  });

  return (
    <div
      onClick={onDone}
      role="button"
      aria-label="Continue"
      style={{
        position: 'absolute', inset: 0, zIndex: 300,
        overflow: 'hidden', cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      <style>{`
        @keyframes cm-flood  { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes cm-seal   { 0% { transform: scale(0); opacity: 0; } 60% { transform: scale(1.5); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes cm-part   { 0% { transform: translate(0,0); opacity: 0; } 20% { opacity: 1; } 100% { transform: var(--cm-translate); opacity: 0; } }
        @keyframes cm-rise   { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>

      {/* Element flood */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, background: flood, opacity: 0.92,
        animation: 'cm-flood 600ms cubic-bezier(0.22,1,0.36,1) forwards',
      }} />

      {/* Seal + particles + text — above the flood */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 28px' }}>
        {/* Particle burst */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: 30, width: 0, height: 0 }}>
          {particles.map((p, i) => (
            <span key={i} style={{
              position: 'absolute', width: p.size, height: p.size, borderRadius: 999,
              background: p.color, left: 0, top: 0,
              '--cm-translate': `translate(${p.dx}px, ${p.dy}px)`,
              animation: `cm-part 820ms ease-out ${p.delay}ms forwards`,
              opacity: 0,
            }} />
          ))}
        </div>

        {/* Seal — white day-master mark */}
        <div style={{
          color: '#F8F6F0', marginBottom: 28,
          animation: 'cm-seal 500ms cubic-bezier(0.34,1.56,0.64,1) 400ms both',
        }}>
          <SealMedallion stemKey={stemKey} size={92} />
        </div>

        {/* Text reveal */}
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 28, fontWeight: 400, color: '#F8F6F0', lineHeight: 1.3,
          animation: 'cm-rise 500ms ease-out 900ms both',
        }}>
          Your reading has been unsealed.
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onDone(); }}
          style={{
            marginTop: 32,
            padding: '14px 28px', borderRadius: 999,
            background: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(248,246,240,0.45)',
            color: '#F8F6F0', cursor: 'pointer',
            fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
            animation: 'cm-rise 400ms ease-out 1800ms both',
          }}
        >
          See what's waiting →
        </button>
      </div>

      {/* Skip hint */}
      <div style={{
        position: 'absolute', bottom: 28, left: 0, right: 0, textAlign: 'center',
        fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11,
        color: 'rgba(248,246,240,0.5)', letterSpacing: 0.5,
        animation: 'cm-rise 400ms ease-out 1400ms both',
      }}>
        tap to continue
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────
// WelcomeToSeekerScreen — §21 Step B. Plays on first app-open after a
// Seeker upgrade detected outside the session. Element flood + seal +
// "Welcome back, [Archetype]." + 3 unlocked lines + CTA → Energy Map.
// In production this fires on the app-open tier check (seekerFirstOpen
// flag); here it is triggerable via window.__welcomeSeeker() for demo.
// ───────────────────────────────────────────────────────────────────
function WelcomeToSeekerScreen({ element, stemKey, archetype, onDone }) {
  const flood = FLOOD_COLOR[element] || FLOOD_COLOR.Metal;
  const unlocked = [
    'Energy Manual — your 5-domain living document',
    'Full Energy Map readings',
    'Life Chapters — your decade-by-decade arc',
  ];
  return (
    <div
      onClick={onDone}
      role="button"
      aria-label="Continue"
      style={{
        position: 'absolute', inset: 0, zIndex: 300, overflow: 'hidden', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <style>{`
        @keyframes wbFlood { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes wbSeal  { 0% { transform: scale(0); opacity:0 } 60% { transform: scale(1.5); opacity:1 } 100% { transform: scale(1); opacity:1 } }
        @keyframes wbRise  { from { transform: translateY(16px); opacity:0 } to { transform: translateY(0); opacity:1 } }
      `}</style>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: flood, opacity: 0.92, animation: 'wbFlood 600ms cubic-bezier(0.22,1,0.36,1) forwards' }} />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 30px' }}>
        <div style={{ color: '#F8F6F0', marginBottom: 24, animation: 'wbSeal 500ms cubic-bezier(0.34,1.56,0.64,1) 300ms both' }}>
          <SealMedallion stemKey={stemKey} size={84} />
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: '#F8F6F0', lineHeight: 1.25, animation: 'wbRise 400ms ease-out 700ms both' }}>
          Welcome back, {archetype}.
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: 'rgba(248,246,240,0.78)', marginTop: 6, animation: 'wbRise 400ms ease-out 900ms both' }}>
          Your full reading is now open.
        </div>
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start', maxWidth: 280, marginLeft: 'auto', marginRight: 'auto' }}>
          {unlocked.map((u, i) => (
            <div key={i} style={{
              fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14.5, color: 'rgba(248,246,240,0.88)',
              display: 'flex', gap: 8, alignItems: 'baseline',
              animation: `wbRise 400ms ease-out ${1400 + i * 90}ms both`,
            }}>
              <span aria-hidden="true">✓</span><span style={{ textAlign: 'left' }}>{u}</span>
            </div>
          ))}
        </div>
        <button type="button" onClick={(e) => { e.stopPropagation(); onDone(); }} style={{
          marginTop: 30, padding: '14px 28px', borderRadius: 10,
          background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(248,246,240,0.45)', color: '#F8F6F0', cursor: 'pointer',
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 16, letterSpacing: 0.5,
          animation: 'wbRise 400ms ease-out 1800ms both',
        }}>
          See what's waiting for you →
        </button>
      </div>
      <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, textAlign: 'center', fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11, color: 'rgba(248,246,240,0.5)', animation: 'wbRise 400ms ease-out 1400ms both' }}>
        tap to continue
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────
// TierCard — one tier option inside the modal.
// ───────────────────────────────────────────────────────────────────
function TierCard({ name, badge, price, gradient, border, features, checkColor, ctaLabel, ctaDisabled, ctaBg, onUpgrade }) {
  return (
    <div style={{
      background: gradient,
      border,
      borderRadius: 16,
      padding: 20,
      marginBottom: 12,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 14,
      }}>
        <span style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 12, letterSpacing: 2.5, textTransform: 'uppercase',
          color: bronzeDark, fontWeight: 500,
        }}>
          {badge} {name}
        </span>
        <span style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 20, color: ink,
        }}>
          {price}
        </span>
      </div>
      <ul style={{ listStyle: 'none', margin: '0 0 16px', padding: 0 }}>
        {features.map((f, i) => (
          <li key={i} style={{
            display: 'flex', gap: 10, alignItems: 'flex-start',
            padding: '5px 0',
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 14, color: inkSoft, lineHeight: 1.5,
          }}>
            <span aria-hidden="true" style={{ color: checkColor, flexShrink: 0, fontWeight: 600 }}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={ctaDisabled ? undefined : onUpgrade}
        disabled={ctaDisabled}
        style={{
          width: '100%',
          padding: '13px 0',
          borderRadius: 999,
          border: 'none',
          background: ctaDisabled ? '#D8D0C0' : ctaBg,
          color: ctaDisabled ? inkLight : '#F8F6F0',
          fontFamily: 'Cinzel, serif',
          fontSize: 11,
          letterSpacing: 2,
          textTransform: 'uppercase',
          cursor: ctaDisabled ? 'default' : 'pointer',
        }}
      >
        {ctaLabel}
      </button>
    </div>
  );
}
