// ===================================================================
// ELEMENTUM · OnboardingShell + ScrollPicker (DOC5 §7)
// Ported from Design/flow/primitives.jsx (OnboardingShell) and
// Design/flow/onboarding.jsx (ScrollPicker). The shell provides the
// 3px bronze progress bar, step counter, bronze question, italic
// subtitle, input slot, and Back/Continue row. ScrollPicker is the
// iOS-style wheel used by Year/Month/Day/Hour and the Step 7A time.
// ===================================================================

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  INK,
  INK_SOFT,
  INK_LIGHT,
  SILK,
  SILK_FOLD,
  BRONZE_MID,
  BRONZE_DARK,
  SilkPaper,
  DistantRidge,
  StatusBar,
} from '../../styles/tokens.jsx';

// -------------------------------------------------------------
// ScrollPicker — minimal iOS-style wheel, silk palette
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

  const wheelRef = useRef(null);

  // Step the selection by ±delta, clamped to [0, values.length - 1].
  const step = useCallback(
    (delta) => {
      const next = Math.max(0, Math.min(values.length - 1, selectedIndex + delta));
      if (next !== selectedIndex) onChange(next);
    },
    [onChange, selectedIndex, values.length]
  );

  // Mouse wheel / trackpad scroll. We debounce by accumulating small deltas
  // so a single flick advances only one row, not ten.
  const accumRef = useRef(0);
  const wheelLockRef = useRef(false);
  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      if (wheelLockRef.current) return;
      accumRef.current += e.deltaY;
      const threshold = 30; // wheel units per row advance
      if (Math.abs(accumRef.current) >= threshold) {
        const dir = accumRef.current > 0 ? 1 : -1;
        step(dir);
        accumRef.current = 0;
        // brief lock so a fast flick doesn't skip multiple rows
        wheelLockRef.current = true;
        setTimeout(() => {
          wheelLockRef.current = false;
        }, 90);
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [step]);

  // Keyboard: ArrowUp/Down when the picker has focus.
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        step(-1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        step(1);
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        step(-5);
      } else if (e.key === 'PageDown') {
        e.preventDefault();
        step(5);
      }
    },
    [step]
  );

  // Touch / pointer drag: each ~ROW_H pixels of drag advances one row.
  const dragRef = useRef({ startY: null, lastStep: 0 });
  const onPointerDown = (e) => {
    dragRef.current = { startY: e.clientY, lastStep: 0 };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (dragRef.current.startY == null) return;
    const totalSteps = Math.round((dragRef.current.startY - e.clientY) / ROW_H);
    const delta = totalSteps - dragRef.current.lastStep;
    if (delta !== 0) {
      step(delta);
      dragRef.current.lastStep = totalSteps;
    }
  };
  const onPointerUp = (e) => {
    dragRef.current = { startY: null, lastStep: 0 };
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  const rows = [];
  for (let i = -center; i <= center; i++) {
    const idx = selectedIndex + i;
    rows.push({
      val: idx >= 0 && idx < values.length ? values[idx] : null,
      offset: i,
      realIdx: idx,
    });
  }

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
          row. Neutral utility marker: "this row is the one that will be saved
          on Continue." Replaces an earlier element-sign decoration that read
          ambiguously as a confirm affordance. */}
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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
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

        {/* rows — clicking a ghosted neighbor selects it */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {rows.map((r, i) => {
            const isCenter = r.offset === 0;
            const distance = Math.abs(r.offset);
            const opacity = distance === 0 ? 1 : distance === 1 ? 0.5 : 0.22;
            const fontSize = isCenter ? 30 : 20;
            const color = isCenter ? INK : INK_LIGHT;
            const clickable = r.val !== null && !isCenter;
            return (
              <div
                key={i}
                onClick={
                  clickable
                    ? (e) => {
                        // Don't let a click propagate to the pointer-drag layer.
                        e.stopPropagation();
                        step(r.offset);
                      }
                    : undefined
                }
                style={{
                  height: ROW_H,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: isCenter ? 500 : 400,
                  fontSize,
                  letterSpacing: 0.5,
                  color,
                  opacity,
                  cursor: clickable ? 'pointer' : 'default',
                  transition: 'all 250ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {r.val !== null ? formatter(r.val) : ''}
              </div>
            );
          })}
        </div>
      </div>

      {/* minimal iOS-style carets */}
      <button
        onClick={() => onChange(Math.max(0, selectedIndex - 1))}
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
        onClick={() =>
          onChange(Math.min(values.length - 1, selectedIndex + 1))
        }
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
      <SilkPaper />
      {/* Ridge sits in the top ~90px, finishing well above the question.
          Short height + strong fade ensures no overlap with the counter/h1. */}
      <DistantRidge y={30} opacity={0.2} height={90} />

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

      {/* content area — pushed down so it clears the ridge band (top ~120px) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '130px 34px 0',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
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
          Step {displayStep} of {total}
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
            fontStyle: 'italic',
            color: INK_SOFT,
            lineHeight: 1.7,
            textAlign: 'center',
            margin: '0 auto',
            maxWidth: 290,
          }}
        >
          {subtitle}
        </p>

        {/* input zone */}
        <div
          style={{
            flex: 1,
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
