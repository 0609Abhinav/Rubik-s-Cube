# 🧊 CubeSolver

A production-quality **3×3 Rubik's Cube Solver** built with React, powered by Herbert Kociemba's two-phase algorithm. Solves any valid cube state in ≤ 22 moves with smooth step-by-step animation.

![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=flat-square&logo=javascript)
![Algorithm](https://img.shields.io/badge/Algorithm-Kociemba-8b5cf6?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

- **Real Solver** — Kociemba two-phase algorithm via `cubejs`, solves any valid state optimally in ≤ 22 moves
- **Step-by-step playback** — watch the solution animate move by move with face highlight
- **WCA-style scramble** — generates proper 22-move random scrambles (no redundant consecutive moves)
- **Undo** — step back through your manual moves
- **Keyboard controls** — `U R F B L D` for clockwise, `Shift+key` for inverse
- **Speed control** — adjustable animation speed from slow to blazing fast
- **Responsive** — works on desktop and mobile
- **Premium dark UI** — glassmorphism design with animated ambient orbs, gradient accents, and 3D sticker depth

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 16
- npm ≥ 8

### Install & Run

```bash
git clone https://github.com/0609Abhinav/Rubik-s-Cube.git
cd Rubik-s-Cube/cube-solver
npm install
npm start
```

Opens at **http://localhost:3000**

> ⚠️ On first load, the Kociemba solver precomputes lookup tables (~3–5 seconds). This is normal — the Solve button shows "Loading…" until ready.

### Production Build

```bash
npm run build
```

---

## 🎮 How to Use

| Action | How |
|---|---|
| Scramble | Click **Scramble** button |
| Solve | Click **Solve** — animates the full solution |
| Step through | Use **Prev / Next** buttons after solving |
| Manual moves | Press `U` `R` `F` `B` `L` `D` on keyboard |
| Inverse moves | Hold `Shift` + face key |
| Undo | Click **Undo** or use history |
| Reset | Click **Reset** to return to solved state |
| Speed | Drag the speed slider (1 = slow, 10 = fast) |

---

## 🏗️ Architecture

```
src/
├── engine/
│   └── CubeState.js       # Cube logic, solver integration, scramble generation
├── components/
│   ├── CubeNet.js          # 3×3 div-grid face renderer
│   ├── Controls.js         # Buttons + speed slider
│   ├── MoveHistory.js      # Scrollable move history panel
│   └── StatusBar.js        # Fixed bottom status indicator
├── App.js                  # Main controller — state, events, playback
└── index.css               # All styles — glassmorphism, animations, responsive
```

**Key design decisions:**
- `CubeState` wraps `cubejs` — all move application and solving delegated to the library
- Cube state stored as a 54-char facelet string (cubejs native format)
- Solution playback uses `async/await` with `speedRef` so speed changes mid-playback take effect immediately
- Step-back replays from a snapshot for accuracy

---

## 🛠️ Tech Stack

| | |
|---|---|
| UI Framework | React 18 |
| Solver | [cubejs](https://github.com/ldez/cubejs) (Kociemba algorithm) |
| Styling | Pure CSS — glassmorphism, CSS custom properties |
| Font | Inter (Google Fonts) |
| Build | Create React App |

---

## 📁 Project Structure

```
Rubik-s-Cube/
├── cube-solver/            # React app (main project)
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
├── index.html              # Legacy static prototype
├── app.js                  # Legacy static prototype
└── style.css               # Legacy static prototype
```

---

## 👨‍💻 Developer

**Abhinav Tripathi**

> Built with passion for speedcubing and clean code.

---

## 📄 License

© 2026 Abhinav Tripathi. All rights reserved.

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
