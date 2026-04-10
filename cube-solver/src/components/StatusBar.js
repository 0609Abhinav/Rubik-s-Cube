import React from 'react';

export default function StatusBar({ message, type }) {
  return (
    <div className={`status-bar status-${type || 'idle'}`}>
      <span>{message}</span>
    </div>
  );
}
