// ===================================================================
// ELEMENTUM · OnboardingShell + ScrollPicker (DES_04 §7)
// Ported from Design/flow/primitives.jsx (OnboardingShell) and
// Design/flow/onboarding.jsx (ScrollPicker). The shell provides the
// 3px bronze progress bar, step counter, bronze question, italic
// subtitle, input slot, and Back/Continue row. ScrollPicker is the
// iOS-style wheel used by Year/Month/Day/Hour and the Step 7A time.
//
// ScrollPicker physics (D13 QA): a real momentum wheel — the strip
// follows the finger 1:1, flings with gravity-inertia deceleration,
// and snaps to the nearest row at rest. Built on Framer Motion drag +
// dragTransition.modifyTarget so the feel is identical on iOS Safari
// and Android Chrome. Replaces the old discrete row-stepper.
// ===================================================================

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useMotionValueEvent, animate } from 'framer-motion';
import { INK, INK_SOFT, INK_LIGHT, SILK, SILK_FOLD, BRONZE_MID, BRONZE_DARK, StatusBar } from '../../styles/tokens.jsx';

// -------------------------------------------------------------
// PickerRow — one wheel value. Opacity + scale fall off smoothly
// with distance from the centre band, driven live off the strip's
// motion value so the fade tracks the finger continuously.
// -------------------------------------------------------------
function PickerRow({ y, index, ROW_H, centerPx, val, formatter, onPick }) {
  const opacity = useTransform(y, (v) => {
    const floatIdx = (centerPx - v) / ROW_H;
    const d = Math.abs(index - floatIdx);
    return d < 0.5 ? 1 : Math.max(0.12, 1 - d * 0.42);
  });
  const scale = useTransform(y, (v) => {
    const floatIdx = (centerPx - v) / ROW_H;
    const d = Math.abs(index - floatIdx);
    return Math.max(0.72, 1 - d * 0.17);
  });
  return (
    <motion.div
      onTap={onPick}
      style={{
        position: 'absolute',
        top: index * ROW_H,
        left: 0,
        right: 0,
        height: ROW_H,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 500,
        fontSize: 30,
        letterSpacing: 0.5,
        color: INK,
        opacity,
        scale,
        willChange: 'transform, opacity',
        cursor: 'pointer',
      }}
    >
      {formatter(val)}
    </motion.div>
  );
}

// -------------------------------------------------------------
// ScrollPicker — momentum wheel, silk palette
// -------------------------------------------------------------
export function ScrollPicker({
  values,
  selectedIndex,
  onChange,
  formatter = (v) => v,
  visibleRows = 5, // 5 for primary pickers; 3 for compact (e.g. Step 7A triple-wheel)
}) {
  const ROW_H = 44;
  // Clamp to odd 3 or 5 so there's always a single centered row.
  const VISIBLE = visibleRows === 3 ? 3 : 5;
  const center = Math.floor(VISIBLE / 2);
  const containerH = ROW_H * VISIBLE;
  const centerPx = ROW_H * center;
  const N = values.length;

  const clampIdx = useCallback((i) => Math.max(0, Math.min(N - 1, i)), [N]);
  // translateY that centres index i in the selection band.
  const indexToY = useCallback((i) => centerPx - i * ROW_H, [centerPx]);

  const y = useMotionValue(indexToY(clampIdx(selectedIndex)));
  // True while the finger / inertia controls the strip — suppresses the
  // external-sync effect so a fling is never yanked back mid-flight.
  const controlling = useRef(false);
  const liveIdx = useRef(clampIdx(selectedIndex));
  // Only a window of rows is mounted (perf on long lists like Year 1900–now);
  // it recentres as the live index moves, so dragging stays continuous.
  const [winCenter, setWinCenter] = useState(clampIdx(selectedIndex));

  const dragTop = indexToY(N - 1); // most-negative y (last value)
  const dragBottom = indexToY(0);  // most-positive y (first value)

  // Inertia target snapped to the nearest row, clamped to range.
  const snapTarget = useCallback(
    (target) => indexToY(clampIdx(Math.round((centerPx - target) / ROW_H))),
    [indexToY, clampIdx, centerPx]
  );

  // Live read-out: as the strip moves, report the centred index up and keep
  // the mounted window centred. Firing during the fling keeps any live
  // preview (e.g. Step 7A header) in sync with the deceleration.
  useMotionValueEvent(y, 'change', (v) => {
    const i = clampIdx(Math.round((centerPx - v) / ROW_H));
    if (i !== liveIdx.current) {
      liveIdx.current = i;
      setWinCenter(i);
      onChange(i);
    }
  });

  // External selection changes (carets, keyboard, parent reset) — spring the
  // strip to the new row, unless the user is actively driving it.
  useEffect(() => {
    const i = clampIdx(selectedIndex);
    if (!controlling.current && i !== liveIdx.current) {
      liveIdx.current = i;
      setWinCenter(i);
      animate(y, indexToY(i), { type: 'spring', stiffness: 340, damping: 36 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  // Step the selection by ±delta (carets / keyboard / wheel).
  const step = useCallback(
    (delta) => {
      const next = clampIdx(selectedIndex + delta);
      if (next !== selectedIndex) onChange(next);
    },
    [onChange, selectedIndex, clampIdx]
  );

  // Mouse wheel / trackpad — accumulate small deltas so a flick advances one
  // row, with a brief lock so a fast scroll doesn't skip many.
  const wheelRef = useRef(null);
  const accumRef = useRef(0);
  const wheelLockRef = useRef(false);
  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      if (wheelLockRef.current) return;
      accumRef.current += e.deltaY;
      if (Math.abs(accumRef.current) >= 30) {
        step(accumRef.current > 0 ? 1 : -1);
        accumRef.current = 0;
        wheelLockRef.current = true;
        setTimeout(() => { wheelLockRef.current = false; }, 90);
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [step]);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); step(-1); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); step(1); }
      else if (e.key === 'PageUp') { e.preventDefault(); step(-5); }
      else if (e.key === 'PageDown') { e.preventDefault(); step(5); }
    },
    [step]
  );

  // Mounted window of rows around the live centre.
  const RADIUS = VISIBLE === 3 ? 6 : 9;
  const start = clampIdx(winCenter - RADIUS);
  const end = clampIdx(winCenter + RADIUS);
  const rowIdx = [];
  for (let i = start; i <= end; i++) rowIdx.push(i);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 260,
        margin: '0 auto',
      }}
    >
      {/* Confirm indicator — small right-pointing triangle at the selected
          row: "this row is the one that will be saved on Continue." */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 2,
          top: ROW_H * center + ROW_H / 2,
          transform: 'translateY(-50%)',
          opacity: 0.45,
          zIndex: 5,
          pointerEvents: 'none',
        }}
      >
        <svg viewBox="0 0 10 10" width="10" height="10" style={{ display: 'block' }}>
          <path d="M 2.5 1.5 L 8 5 L 2.5 8.5 Z" fill={INK_LIGHT} />
        </svg>
      </div>

      <div
        ref={wheelRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        role="listbox"
        aria-label="Scroll to select"
        style={{
          height: containerH,
          position: 'relative',
          overflow: 'hidden',
          background: 'transparent',
          touchAction: 'none',
          outline: 'none',
          cursor: 'ns-resize',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        {/* soft selection band */}
        <div
          style={{
            position: 'absolute',
            top: ROW_H * center,
            left: 0,
            right: 0,
            height: ROW_H,
            background: 'rgba(139,115,85,0.055)',
            borderTop: '1px solid rgba(139,115,85,0.22)',
            borderBottom: '1px solid rgba(139,115,85,0.22)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* top/bottom silk fades */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: ROW_H * (VISIBLE === 3 ? 0.85 : 1.6),
            background: `linear-gradient(180deg, ${SILK} 0%, rgba(241,233,214,0) 100%)`,
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: ROW_H * (VISIBLE === 3 ? 0.85 : 1.6),
            background: `linear-gradient(0deg, ${SILK} 0%, rgba(241,233,214,0) 100%)`,
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />

        {/* the draggable strip — follows the finger, flings with gravity
            inertia, and snaps to the nearest row on release */}
        <motion.div
          style={{ y, position: 'absolute', left: 0, right: 0, top: 0, height: N * ROW_H, zIndex: 2 }}
          drag="y"
          dragConstraints={{ top: dragTop, bottom: dragBottom }}
          dragElastic={0.12}
          dragTransition={{
            power: 0.22,
            timeConstant: 300,
            modifyTarget: snapTarget,
            bounceStiffness: 420,
            bounceDamping: 42,
          }}
          onDragStart={() => { controlling.current = true; }}
          onDragEnd={() => {
            // Release control a beat after the fling so the external-sync
            // effect doesn't fight the inertia animation.
            setTimeout(() => { controlling.current = false; }, 80);
          }}
        >
          {rowIdx.map((i) => (
            <PickerRow
              key={i}
              y={y}
              index={i}
              ROW_H={ROW_H}
              centerPx={centerPx}
              val={values[i]}
              formatter={formatter}
              onPick={() => onChange(i)}
            />
          ))}
        </motion.div>
      </div>

      {/* minimal iOS-style carets */}
      <button
        onClick={() => step(-1)}
        aria-label="previous"
        style={{
          position: 'absolute',
          top: -2,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'transparent',
          border: 0,
          cursor: 'pointer',
          color: INK_LIGHT,
          fontSize: 14,
          padding: 4,
          opacity: 0.55,
        }}
      >
        ▲
      </button>
      <button
        onClick={() => step(1)}
        aria-label="next"
        style={{
          position: 'absolute',
          bottom: -2,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'transparent',
          border: 0,
          cursor: 'pointer',
          color: INK_LIGHT,
          fontSize: 14,
          padding: 4,
          opacity: 0.55,
        }}
      >
        ▼
      </button>
    </div>
  );
}

// -------------------------------------------------------------
// OnboardingShell — progress bar, step counter, question,
// poetic subtitle, input children, Back/Continue row.
// -------------------------------------------------------------
export function OnboardingShell({
  step,
  total = 7,
  question,
  subtitle,
  children,
  canContinue,
  onBack,
  onContinue,
  continueLabel = 'Continue',
  finalStep = false,
  stepLabel,
  progressValue,
  eyebrow,   // overrides the "Step N of Y" counter line (e.g. friend flow: "Their birth · 1 of 5")
}) {
  const progress =
    typeof progressValue === 'number' ? progressValue : step / total;
  const displayStep = stepLabel != null ? stepLabel : step;

  return (
    <div
      style={{
        background: SILK,
        color: INK,
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Painted page background — all onboarding steps share the same
          atmospheric-mist canvas so the sequence reads as one coherent
          ceremony rather than per-step variations. */}
      <img
        src="/backgrounds/bg-onboarding-04-quiet-paper.png"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* progress bar — 3px at very top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'rgba(205,190,158,0.35)',
          zIndex: 30,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${BRONZE_MID} 0%, ${BRONZE_MID} 60%, #9d8468 100%)`,
            transition: 'width 500ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>

      <StatusBar tint={INK} />

      {/* content area — pushed down so it clears the ridge band (top ~120px).
          Scrolls on short phones (e.g. iPhone SE 375x667) where a tall step
          (the 6-tile hour-window grid) would otherwise push Back/Continue off
          the bottom; on taller screens the input zone grows and nothing
          scrolls, so the centered layout is unchanged. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '130px 34px calc(8px + env(safe-area-inset-bottom, 0px))',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}
      >
        <div
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 11,
            letterSpacing: 3.2,
            textTransform: 'uppercase',
            color: INK_LIGHT,
            textAlign: 'center',
            marginTop: 0,
          }}
        >
          {eyebrow != null ? eyebrow : `Step ${displayStep} of ${total}`}
        </div>

        <h1
          style={{
            fontFamily: "'EB Garamond', serif",
            fontWeight: 500,
            fontSize: 27,
            lineHeight: 1.2,
            color: BRONZE_MID,
            letterSpacing: 1.2,
            textAlign: 'center',
            margin: '20px 0 12px',
          }}
        >
          {question}
        </h1>

        <p
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 15,
            color: INK_SOFT,
            lineHeight: 1.7,
            textAlign: 'center',
            margin: '0 auto',
            maxWidth: 290,
          }}
        >
          {subtitle}
        </p>

        {/* input zone — grow to centre on tall screens, but never shrink below
            content (flex-basis auto) so the column overflows into a scroll
            instead of clipping the buttons on short screens. */}
        <div
          style={{
            flex: '1 0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 8,
          }}
        >
          {children}
        </div>

        {/* buttons */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            paddingBottom: 32,
            paddingTop: 8,
          }}
        >
          <button
            onClick={onBack}
            style={{
              padding: '13px 22px',
              background: 'transparent',
              border: `1px solid #d9d3c8`,
              borderRadius: 999,
              fontFamily: "'EB Garamond', serif",
              fontSize: 12,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: INK_SOFT,
              cursor: 'pointer',
            }}
          >
            ← Back
          </button>

          <button
            disabled={!canContinue}
            onClick={onContinue}
            style={{
              flex: 1,
              // Match the Back button's vertical height so the two align;
              // all buttons in the row are pills (borderRadius: 999).
              padding: finalStep ? '13px 18px' : '13px 22px',
              background: canContinue ? BRONZE_DARK : 'rgba(107,83,57,0.45)',
              color: SILK,
              border: 0,
              borderRadius: 999,
              fontFamily: finalStep ? 'Cinzel, serif' : "'EB Garamond', serif",
              fontSize: finalStep ? 12 : 13,
              letterSpacing: finalStep ? 2.8 : 2,
              fontWeight: 500,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              cursor: canContinue ? 'pointer' : 'not-allowed',
              opacity: canContinue ? 1 : 0.55,
              boxShadow: canContinue
                ? '0 4px 12px rgba(107,83,57,0.2)'
                : 'none',
              transition: 'all 200ms ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            {continueLabel}
            {!finalStep && (
              <span style={{ fontSize: 17, lineHeight: 1 }}>→</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Re-export SILK_FOLD for steps that need card dividers
export { SILK_FOLD };
