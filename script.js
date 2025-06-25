const COLORS = {
  U: 'w', D: 'y', F: 'g', B: 'b', L: 'o', R: 'r'
};

class Cube {
  constructor() {
    this.faces = {
      U: Array(9).fill(COLORS.U),
      D: Array(9).fill(COLORS.D),
      F: Array(9).fill(COLORS.F),
      B: Array(9).fill(COLORS.B),
      L: Array(9).fill(COLORS.L),
      R: Array(9).fill(COLORS.R),
    };
  }

  clone() {
    const copy = new Cube();
    for (const f in this.faces) {
      copy.faces[f] = [...this.faces[f]];
    }
    return copy;
  }

  rotateFace(face, clockwise = true) {
    const f = this.faces[face];
    const r = clockwise
      ? [f[6], f[3], f[0], f[7], f[4], f[1], f[8], f[5], f[2]]
      : [f[2], f[5], f[8], f[1], f[4], f[7], f[0], f[3], f[6]];
    this.faces[face] = r;
  }

  move(move) {
    const clockwise = !move.endsWith("'");
    const face = move[0];
    this._rotate(face, clockwise);
  }

  _rotate(face, clockwise = true) {
    this.rotateFace(face, clockwise);

    const map = {
      U: ['B', 'R', 'F', 'L'],
      D: ['F', 'R', 'B', 'L'],
      F: ['U', 'R', 'D', 'L'],
      B: ['U', 'L', 'D', 'R'],
      L: ['U', 'F', 'D', 'B'],
      R: ['U', 'B', 'D', 'F'],
    };

    const idx = {
      U: [[0,1,2], [0,1,2], [0,1,2], [0,1,2]],
      D: [[6,7,8], [6,7,8], [6,7,8], [6,7,8]],
      F: [[6,7,8], [0,3,6], [2,1,0], [8,5,2]],
      B: [[2,1,0], [0,3,6], [6,7,8], [8,5,2]],
      L: [[0,3,6], [0,3,6], [0,3,6], [8,5,2]],
      R: [[2,5,8], [0,3,6], [2,5,8], [8,5,2]],
    };

    const faces = map[face];
    const indexes = idx[face];

    let tmp = indexes.map((i, n) =>
      this.faces[faces[n]].map((_, j) => this.faces[faces[n]][i[j]])
    );

    if (!clockwise) tmp = tmp.reverse();

    for (let i = 0; i < 4; i++) {
      const from = tmp[(i + 3) % 4];
      for (let j = 0; j < 3; j++) {
        this.faces[faces[i]][indexes[i][j]] = from[j];
      }
    }
  }

  toString() {
    return ['U', 'R', 'F', 'D', 'L', 'B']
      .map(f => this.faces[f].join(''))
      .join('');
  }

  getSvg() {
    return getCubeSvg(this.toString());
  }
}

function getCubeSvg(state) {
  const colors = { r: 'red', g: 'green', b: 'blue', o: 'orange', y: 'yellow', w: 'white' };
  const size = 20;
  const faceOffsets = {
    U: [3, 0], L: [0, 3], F: [3, 3], R: [6, 3], B: [9, 3], D: [3, 6]
  };

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "300");
  svg.setAttribute("height", "300");

  const faces = ['U', 'R', 'F', 'D', 'L', 'B'];
  let i = 0;
  for (const face of faces) {
    const [ox, oy] = faceOffsets[face];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const color = colors[state[i]];
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", (ox + col) * size);
        rect.setAttribute("y", (oy + row) * size);
        rect.setAttribute("width", size);
        rect.setAttribute("height", size);
        rect.setAttribute("fill", color);
        rect.setAttribute("stroke", "#000");
        svg.appendChild(rect);
        i++;
      }
    }
  }
  return svg;
}

// ------------------- State & DOM Setup -------------------
let cube = new Cube();
let scrambleMoves = [];

const output = document.getElementById("output");
const currentMoveEl = document.getElementById("current-move");
const moveSeqEl = document.getElementById("move-sequence");

// ------------------- Helper Functions -------------------
function renderCube(c) {
  output.innerHTML = '';
  output.appendChild(c.getSvg());
}

function reverseMoves(moves) {
  return moves.slice().reverse().map(m => m.endsWith("'") ? m[0] : m + "'");
}

// ------------------- Button Actions -------------------
function scramble() {
  resetCube();
  const moves = ['U', "U'", 'D', "D'", 'F', "F'", 'B', "B'", 'L', "L'", 'R', "R'"];
  for (let i = 0; i < 20; i++) {
    const move = moves[Math.floor(Math.random() * moves.length)];
    scrambleMoves.push(move);
    cube.move(move);
  }
  renderCube(cube);
  moveSeqEl.textContent = scrambleMoves.join(' ');
  currentMoveEl.textContent = 'Scrambled!';
}

function solveCube() {
  if (!scrambleMoves.length) return alert("Scramble first!");
  const solutionMoves = reverseMoves(scrambleMoves);
  moveSeqEl.textContent = solutionMoves.join(' ');
  animateMoves(solutionMoves);
}

function resetCube() {
  cube = new Cube();
  scrambleMoves = [];
  renderCube(cube);
  moveSeqEl.textContent = '—';
  currentMoveEl.textContent = '—';
}

function animateMoves(moves, delay = 400) {
  let step = 0;
  const interval = setInterval(() => {
    if (step >= moves.length) {
      clearInterval(interval);
      currentMoveEl.textContent = '✅ Solved!';
      return;
    }
    const move = moves[step];
    currentMoveEl.textContent = move;
    cube.move(move);
    renderCube(cube);
    step++;
  }, delay);
}

// ------------------- Key Controls -------------------
document.addEventListener("keydown", (e) => {
  const keyMap = {
    u: "U", d: "D", f: "F", b: "B", l: "L", r: "R",
    U: "U'", D: "D'", F: "F'", B: "B'", L: "L'", R: "R'"
  };
  const move = keyMap[e.key];
  if (move) {
    cube.move(move);
    scrambleMoves.push(move);  // log manual move
    renderCube(cube);
    currentMoveEl.textContent = move;
  }
});

// ------------------- Initial Render -------------------
renderCube(cube);
