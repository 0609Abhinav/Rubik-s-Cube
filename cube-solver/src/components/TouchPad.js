import React from 'react';

const FACES = [
  { key: 'U', label: 'Up',    color: '#f8f8f2', textColor: '#111' },
  { key: 'R', label: 'Right', color: '#ef4444', textColor: '#fff' },
  { key: 'F', label: 'Front', color: '#22c55e', textColor: '#fff' },
  { key: 'B', label: 'Back',  color: '#3b82f6', textColor: '#fff' },
  { key: 'L', label: 'Left',  color: '#f97316', textColor: '#fff' },
  { key: 'D', label: 'Down',  color: '#fbbf24', textColor: '#111' },
];

export default function TouchPad({ onMove, disabled }) {
  return (
    <div className="touch-pad glass">
      <p className="touch-pad-title">Touch Controls</p>
      <div className="touch-grid">
        {FACES.map(({ key, label, color, textColor }) => (
          <div key={key} className="touch-face-group">
            <button
              className="touch-btn touch-btn-cw"
              style={{ background: color, color: textColor, borderColor: color }}
              onClick={() => onMove(key)}
              disabled={disabled}
              aria-label={`${label} clockwise`}
            >
              <span className="touch-face-label">{key}</span>
              <span className="touch-dir">↻</span>
            </button>
            <button
              className="touch-btn touch-btn-ccw"
              style={{ borderColor: color, color: color }}
              onClick={() => onMove(`${key}'`)}
              disabled={disabled}
              aria-label={`${label} counter-clockwise`}
            >
              <span className="touch-face-label">{key}'</span>
              <span className="touch-dir">↺</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
