import React from 'react';

export default function Controls({
  onScramble, onSolve, onReset, onUndo,
  onStepBack, onStepFwd,
  canStepBack, canStepFwd,
  speed, onSpeedChange,
  isPlaying, isSolverReady,
}) {
  const fillPct = ((speed - 1) / 9) * 100;

  return (
    <div className="controls-card glass">
      <p className="panel-title">Controls</p>

      <div className="btn-grid">
        <button className="btn btn-scramble" onClick={onScramble} disabled={isPlaying}>
          <ShuffleIcon /> Scramble
        </button>
        <button
          className="btn btn-solve"
          onClick={onSolve}
          disabled={isPlaying || !isSolverReady}
        >
          <CheckIcon /> {isSolverReady ? 'Solve' : 'Loading…'}
        </button>
      </div>

      <div className="btn-grid">
        <button className="btn btn-ghost" onClick={onReset} disabled={isPlaying}>
          <ResetIcon /> Reset
        </button>
        <button className="btn btn-ghost" onClick={onUndo} disabled={isPlaying}>
          <UndoIcon /> Undo
        </button>
      </div>

      <div className="btn-grid" style={{marginBottom:0}}>
        <button className="btn btn-step" onClick={onStepBack} disabled={!canStepBack || isPlaying}>
          <ChevLeft /> Prev
        </button>
        <button className="btn btn-step" onClick={onStepFwd} disabled={!canStepFwd || isPlaying}>
          Next <ChevRight />
        </button>
      </div>

      <div className="speed-control">
        <div className="speed-header">
          <span className="speed-label">
            <SpeedIcon /> Animation Speed
          </span>
          <div className="speed-badges">
            <span className="speed-badge speed-badge-slow">Slow</span>
            <span className="speed-badge speed-badge-fast">Fast</span>
          </div>
        </div>
        <div className="speed-track">
          <div className="speed-fill" style={{width: `${fillPct}%`}} />
          <input
            type="range" min="1" max="10" value={speed}
            className="speed-slider"
            onChange={e => onSpeedChange(Number(e.target.value))}
          />
        </div>
        <div className="speed-value-display">
          <strong>{speed}</strong> / 10
        </div>
      </div>
    </div>
  );
}

const ShuffleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8"/>
    <line x1="4" y1="20" x2="21" y2="3"/>
    <polyline points="21 16 21 21 16 21"/>
    <line x1="15" y1="15" x2="21" y2="21"/>
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const ResetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"/>
    <path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
  </svg>
);
const UndoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 14 4 9 9 4"/>
    <path d="M20 20v-7a4 4 0 0 0-4-4H4"/>
  </svg>
);
const ChevLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const ChevRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const SpeedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);
