import React from 'react';
import { FACE_ORDER } from '../engine/CubeState';

const FACE_AREA = { U:'top', L:'left', F:'front', R:'right', B:'back', D:'bottom' };

// Rich, vibrant sticker colors with slight warmth
const COLOR_MAP = {
  U: '#f8f8f2', // crisp white
  D: '#fbbf24', // warm amber-yellow
  F: '#22c55e', // vivid green
  B: '#3b82f6', // electric blue
  L: '#f97316', // bright orange
  R: '#ef4444', // vivid red
};

export default function CubeNet({ cubeState, activeFace, flashFace }) {
  return (
    <div className="cube-net">
      {FACE_ORDER.map(face => (
        <Face
          key={face}
          face={face}
          stickers={cubeState.getFace(face)}
          isActive={activeFace === face}
          isFlash={flashFace === face}
        />
      ))}
    </div>
  );
}

function Face({ face, stickers, isActive, isFlash }) {
  return (
    <div className={`cube-face face-${FACE_AREA[face]}${isActive ? ' face-active' : ''}`}>
      {stickers.map((colorKey, i) => (
        <div
          key={i}
          className={`sticker${isFlash ? ' sticker-flash' : ''}`}
          style={{ '--color': COLOR_MAP[colorKey] }}
        />
      ))}
    </div>
  );
}
