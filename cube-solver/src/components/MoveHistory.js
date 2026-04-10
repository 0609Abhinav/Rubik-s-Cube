import React, { useEffect, useRef } from 'react';

export default function MoveHistory({ moves, currentIndex, solved }) {
  const activeRef = useRef(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [currentIndex]);

  return (
    <div className="history-card glass">
      <p className="panel-title">Move History</p>
      <div className="history-scroll">
        {moves.length === 0
          ? <span className="history-empty">No moves yet</span>
          : moves.map((move, i) => (
              <span
                key={i}
                ref={i === currentIndex ? activeRef : null}
                className={`history-chip${i === currentIndex ? ' chip-active' : ''}${solved ? ' chip-solved' : ''}`}
              >
                {move}
              </span>
            ))
        }
      </div>
    </div>
  );
}
