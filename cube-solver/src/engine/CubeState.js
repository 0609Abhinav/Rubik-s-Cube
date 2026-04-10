import Cube from 'cubejs';

Cube.initSolver();

export const SOLVED_STATE = 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDDLLLLLLLLLBBBBBBBBB';
export const FACE_ORDER   = ['U', 'R', 'F', 'D', 'L', 'B'];

const ALL_MOVES = ['U',"U'","U2",'D',"D'","D2",'F',"F'","F2",'B',"B'","B2",'L',"L'","L2",'R',"R'","R2"];
const OPPOSITE  = { U:'D', D:'U', F:'B', B:'F', L:'R', R:'L' };

export class CubeState {
  constructor(state = SOLVED_STATE) {
    this.state = state;
  }

  clone() { return new CubeState(this.state); }

  isSolved() { return this.state === SOLVED_STATE; }

  isValid() {
    const counts = {};
    for (const ch of this.state) counts[ch] = (counts[ch] || 0) + 1;
    return FACE_ORDER.every(f => counts[f] === 9);
  }

  applyMove(notation) {
    const cube = Cube.fromString(this.state);
    cube.move(notation);
    this.state = cube.asString();
  }

  solve() {
    const sol = Cube.fromString(this.state).solve();
    if (sol == null) return [];
    return sol.trim() === '' ? [] : sol.trim().split(/\s+/);
  }

  getFace(face) {
    const idx = FACE_ORDER.indexOf(face);
    return this.state.slice(idx * 9, idx * 9 + 9).split('');
  }
}

export function generateScramble(length = 22) {
  const moves = [];
  let last = '', secondLast = '';
  while (moves.length < length) {
    const prevLast = last;
    const prevSecond = secondLast;
    const pool = ALL_MOVES.filter(m => {
      const f = m[0];
      if (f === prevLast) return false;
      if (f === OPPOSITE[prevLast] && f === prevSecond) return false;
      return true;
    });
    const pick = pool[Math.floor(Math.random() * pool.length)];
    moves.push(pick);
    secondLast = prevLast;
    last = pick[0];
  }
  return moves;
}

export function invertMove(move) {
  if (move.endsWith("'")) return move[0];
  if (move.endsWith('2')) return move;
  return move + "'";
}
