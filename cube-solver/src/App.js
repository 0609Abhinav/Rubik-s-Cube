import React, { useState, useEffect, useCallback, useRef } from 'react';
import CubeNet from './components/CubeNet';
import Controls from './components/Controls';
import MoveHistory from './components/MoveHistory';
import StatusBar from './components/StatusBar';
import TouchPad from './components/TouchPad';
import { CubeState, generateScramble, invertMove } from './engine/CubeState';
import './index.css';

const delay = ms => new Promise(r => setTimeout(r, ms));

function stepDelay(speed) {
  return Math.round(700 - (speed - 1) * (650 / 9));
}

export default function App() {
  const [cubeState, setCubeState]         = useState(() => new CubeState());
  const [historyStack, setHistoryStack]   = useState([]);
  const [solutionMoves, setSolutionMoves] = useState([]);
  const [solutionStep, setSolutionStep]   = useState(0);
  const [displayMoves, setDisplayMoves]   = useState([]);
  const [currentMove, setCurrentMove]     = useState('—');
  const [activeFace, setActiveFace]       = useState(null);
  const [flashFace, setFlashFace]         = useState(null);
  const [speed, setSpeed]                 = useState(5);
  const [isPlaying, setIsPlaying]         = useState(false);
  const [isSolved, setIsSolved]           = useState(false);
  const [status, setStatus]               = useState({ msg: 'Ready — scramble to begin', type: 'idle' });
  const [isSolverReady, setIsSolverReady] = useState(false);
  const [historyIndex, setHistoryIndex]   = useState(-1);

  const snapshotRef = useRef(null);
  const playingRef  = useRef(false);
  const speedRef    = useRef(speed);

  useEffect(() => { speedRef.current = speed; }, [speed]);

  // cubejs initSolver runs at import time — mark ready after mount
  useEffect(() => {
    const t = setTimeout(() => setIsSolverReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Keyboard handler
  useEffect(() => {
    const FACE_KEYS = { u:'U', d:'D', f:'F', b:'B', l:'L', r:'R' };
    const handler = e => {
      if (playingRef.current) return;
      if (e.target.tagName === 'INPUT') return;
      const lower = e.key.toLowerCase();
      if (!FACE_KEYS[lower]) return;
      e.preventDefault();
      const notation = e.shiftKey ? `${FACE_KEYS[lower]}'` : FACE_KEYS[lower];
      applyManualMove(notation);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cubeState]);

  function applyManualMove(notation) {
    const next = cubeState.clone();
    next.applyMove(notation);
    setCubeState(next);
    setHistoryStack(h => [...h, notation]);
    setDisplayMoves(m => [...m, notation]);
    setCurrentMove(notation);
    setActiveFace(notation[0]);
    setTimeout(() => setActiveFace(null), 300);
    if (next.isSolved()) setStatus({ msg: 'Solved!', type: 'success' });
  }

  const handleScramble = useCallback(() => {
    const moves = generateScramble(22);
    const next = new CubeState();
    moves.forEach(m => next.applyMove(m));
    setCubeState(next);
    setHistoryStack(moves);
    setDisplayMoves(moves);
    setSolutionMoves([]);
    setSolutionStep(0);
    setHistoryIndex(-1);
    setIsSolved(false);
    setCurrentMove('Scrambled');
    snapshotRef.current = null;
    setStatus({ msg: `Scrambled with ${moves.length} moves — press Solve`, type: 'info' });
  }, []);

  const handleSolve = useCallback(async () => {
    if (isPlaying) return;
    if (cubeState.isSolved()) {
      setStatus({ msg: 'Already solved.', type: 'success' });
      return;
    }
    if (!cubeState.isValid()) {
      setStatus({ msg: 'Invalid cube state.', type: 'error' });
      return;
    }

    setStatus({ msg: 'Computing solution…', type: 'info' });
    await delay(30);

    let moves;
    try { moves = cubeState.solve(); }
    catch {
      setStatus({ msg: 'Solver error — invalid state.', type: 'error' });
      return;
    }

    if (moves.length === 0) {
      setStatus({ msg: 'Already solved.', type: 'success' });
      return;
    }

    setSolutionMoves(moves);
    setSolutionStep(0);
    setDisplayMoves(moves);
    setHistoryIndex(-1);
    snapshotRef.current = cubeState.clone();
    setStatus({ msg: `Solution: ${moves.length} moves`, type: 'info' });

    setIsPlaying(true);
    playingRef.current = true;
    let current = cubeState.clone();

    for (let i = 0; i < moves.length; i++) {
      if (!playingRef.current) break;
      const move = moves[i];
      current = current.clone();
      current.applyMove(move);

      const sd = stepDelay(speedRef.current);
      setActiveFace(move[0]);
      setFlashFace(move[0]);
      setCurrentMove(move);
      setSolutionStep(i + 1);
      setHistoryIndex(i);
      setCubeState(current);

      await delay(Math.round(sd * 0.35));
      setFlashFace(null);
      setActiveFace(null);
      await delay(Math.round(sd * 0.65));
    }

    if (playingRef.current) {
      playingRef.current = false;
      setIsPlaying(false);
      setIsSolved(true);
      setCurrentMove('✓');
      setStatus({ msg: `Solved in ${moves.length} moves`, type: 'success' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cubeState, isPlaying]);

  const handleReset = useCallback(() => {
    playingRef.current = false;
    setIsPlaying(false);
    setCubeState(new CubeState());
    setHistoryStack([]);
    setDisplayMoves([]);
    setSolutionMoves([]);
    setSolutionStep(0);
    setHistoryIndex(-1);
    setIsSolved(false);
    setCurrentMove('—');
    setActiveFace(null);
    snapshotRef.current = null;
    setStatus({ msg: 'Reset to solved state', type: 'idle' });
  }, []);

  const handleUndo = useCallback(() => {
    if (historyStack.length === 0) return;
    const last = historyStack[historyStack.length - 1];
    const inv  = invertMove(last);
    const next = cubeState.clone();
    next.applyMove(inv);
    setCubeState(next);
    setHistoryStack(h => h.slice(0, -1));
    setDisplayMoves(m => m.slice(0, -1));
    setCurrentMove(inv);
    setStatus({ msg: `Undid: ${last}`, type: 'idle' });
  }, [cubeState, historyStack]);

  const handleStepFwd = useCallback(() => {
    if (solutionStep >= solutionMoves.length || !snapshotRef.current) return;
    const move = solutionMoves[solutionStep];
    const next = cubeState.clone();
    next.applyMove(move);
    setCubeState(next);
    setCurrentMove(move);
    setHistoryIndex(solutionStep);
    setSolutionStep(s => s + 1);
    setActiveFace(move[0]);
    setTimeout(() => setActiveFace(null), 300);
    if (solutionStep + 1 === solutionMoves.length) {
      setIsSolved(true);
      setStatus({ msg: `Solved in ${solutionMoves.length} moves`, type: 'success' });
    }
  }, [cubeState, solutionMoves, solutionStep]);

  const handleStepBack = useCallback(() => {
    if (solutionStep <= 0 || !snapshotRef.current) return;
    const newStep = solutionStep - 1;
    const replay = snapshotRef.current.clone();
    for (let i = 0; i < newStep; i++) replay.applyMove(solutionMoves[i]);
    setCubeState(replay);
    setSolutionStep(newStep);
    setHistoryIndex(newStep - 1);
    setCurrentMove(newStep > 0 ? solutionMoves[newStep - 1] : '—');
    setIsSolved(false);
  }, [solutionMoves, solutionStep]);

  const canStepBack = solutionStep > 0 && !!snapshotRef.current;
  const canStepFwd  = solutionStep < solutionMoves.length && !!snapshotRef.current;

  const FACE_COLORS = { U:'#f8f8f2', R:'#ef4444', F:'#22c55e', D:'#fbbf24', L:'#f97316', B:'#3b82f6' };
  const LOGO_COLORS = ['#ef4444','#fbbf24','#22c55e','#3b82f6','#f97316','#8b5cf6','#ec4899','#06b6d4','#a3e635'];

  return (
    <div className="app">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <header className="app-header">
        <div className="logo">
          <div className="logo-icon-grid">
            {LOGO_COLORS.map((c,i) => <span key={i} style={{background:c}} />)}
          </div>
          <span className="logo-wordmark">CubeSolver</span>
        </div>
        <div style={{marginTop:10}}>
          <span className="header-badge">
            <span className="badge-dot" />
            Kociemba Algorithm · Real Solutions
          </span>
        </div>
      </header>

      <main className="app-main">
        <section className="cube-section">
          <div className="cube-wrapper glass">
            <CubeNet cubeState={cubeState} activeFace={activeFace} flashFace={flashFace} />
          </div>

          <div className="move-bar glass">
            <div className="move-bar-section">
              <span className="move-bar-label">Current Move</span>
              <span key={currentMove} className={`move-bar-value pop${isSolved ? ' solved' : ''}`}>
                {currentMove}
              </span>
            </div>
            <div className="move-bar-section">
              <span className="move-bar-label">Progress</span>
              <span className="move-bar-value" style={{fontSize:'1rem'}}>
                {solutionMoves.length > 0 ? `${solutionStep} / ${solutionMoves.length}` : '—'}
              </span>
            </div>
            <div className="move-bar-section">
              <span className="move-bar-label">State</span>
              <span className="move-bar-value" style={{fontSize:'0.85rem', color: isSolved ? 'var(--emerald)' : 'var(--muted2)'}}>
                {isSolved ? 'Solved ✓' : cubeState.isSolved() ? 'Solved ✓' : 'Scrambled'}
              </span>
            </div>
          </div>

          {/* Keyboard hints — desktop only */}
          <div className="key-row glass desktop-only">
            {[
              {k:'U', label:'Up',    inv:'U\''},
              {k:'R', label:'Right', inv:'R\''},
              {k:'F', label:'Front', inv:'F\''},
              {k:'B', label:'Back',  inv:'B\''},
              {k:'L', label:'Left',  inv:'L\''},
              {k:'D', label:'Down',  inv:'D\''},
            ].map(({k, label, inv}) => (
              <div key={k} className="key-item">
                <div className="key-face-dot" style={{background: FACE_COLORS[k]}} />
                <div className="key-info">
                  <span className="key-name">{label}</span>
                  <span className="key-hint-text">Shift = {inv}</span>
                </div>
                <kbd>{k}</kbd>
              </div>
            ))}
          </div>

          {/* Touch pad — mobile only */}
          <div className="mobile-only">
            <TouchPad onMove={applyManualMove} disabled={isPlaying} />
          </div>
        </section>

        <aside className="side-panel">
          <Controls
            onScramble={handleScramble}
            onSolve={handleSolve}
            onReset={handleReset}
            onUndo={handleUndo}
            onStepBack={handleStepBack}
            onStepFwd={handleStepFwd}
            canStepBack={canStepBack}
            canStepFwd={canStepFwd}
            speed={speed}
            onSpeedChange={setSpeed}
            isPlaying={isPlaying}
            isSolverReady={isSolverReady}
          />
          <MoveHistory moves={displayMoves} currentIndex={historyIndex} solved={isSolved} />
        </aside>
      </main>

      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-grid">
                {LOGO_COLORS.map((c,i) => <span key={i} style={{background:c}} />)}
              </div>
              <span className="footer-logo-name">CubeSolver</span>
            </div>
            <p className="footer-tagline">
              Solving the Rubik's Cube with Kociemba's two-phase algorithm.<br/>
              Any valid state solved in ≤22 moves.
            </p>
          </div>

          <div className="footer-divider" />

          <div className="footer-meta">
            <div className="footer-dev">
              <span className="footer-dev-label">Developed by</span>
              <span className="footer-dev-name">Abhinav Tripathi</span>
            </div>
            <div className="footer-tech">
              <span className="footer-tech-chip">React</span>
              <span className="footer-tech-chip">Kociemba</span>
              <span className="footer-tech-chip">JavaScript</span>
            </div>
          </div>

          <div className="footer-divider" />

          <div className="footer-bottom">
            <span className="footer-copy">
              © {new Date().getFullYear()} Abhinav Tripathi. All rights reserved.
            </span>
            <span className="footer-heart">
              Made with <span className="heart">♥</span> for speedcubers
            </span>
          </div>
        </div>
      </footer>

      <StatusBar message={status.msg} type={status.type} />
    </div>
  );
}
