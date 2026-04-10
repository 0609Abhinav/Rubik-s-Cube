<div align="center">

<br/>

```
 ██████╗██╗   ██╗██████╗ ███████╗███████╗ ██████╗ ██╗    ██╗   ██╗███████╗██████╗
██╔════╝██║   ██║██╔══██╗██╔════╝██╔════╝██╔═══██╗██║    ██║   ██║██╔════╝██╔══██╗
██║     ██║   ██║██████╔╝█████╗  ███████╗██║   ██║██║    ██║   ██║█████╗  ██████╔╝
██║     ██║   ██║██╔══██╗██╔══╝  ╚════██║██║   ██║██║    ╚██╗ ██╔╝██╔══╝  ██╔══██╗
╚██████╗╚██████╔╝██████╔╝███████╗███████║╚██████╔╝███████╗╚████╔╝ ███████╗██║  ██║
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚═════╝ ╚══════╝ ╚═══╝  ╚══════╝╚═╝  ╚═╝
```

### 🧊 A production-quality Rubik's Cube Solver powered by Kociemba's two-phase algorithm

<br/>

[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Algorithm](https://img.shields.io/badge/Kociemba-Two--Phase-8b5cf6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyTDIgN2wxMCA1IDEwLTV6TTIgMTdsOCA0IDgtNE0yIDEybDggNCA4LTQiLz48L3N2Zz4=)](https://en.wikipedia.org/wiki/Optimal_solutions_for_the_Rubik%27s_Cube)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://rubik-s-cube-three.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)
[![Mobile](https://img.shields.io/badge/Mobile-Ready-f97316?style=for-the-badge&logo=android&logoColor=white)](#)

<br/>

**[🚀 Live Demo](https://rubik-s-cube-three.vercel.app)** &nbsp;·&nbsp; **[📖 Docs](#-getting-started)** &nbsp;·&nbsp; **[🐛 Issues](https://github.com/0609Abhinav/Rubik-s-Cube/issues)**

<br/>

</div>

---

## 📸 Preview

```
┌─────────────────────────────────────────────────────────────────────┐
│  ⬛■■■  CubeSolver                                                   │
│         KOCIEMBA ALGORITHM · REAL SOLUTIONS                          │
├──────────────────────────────────────┬──────────────────────────────┤
│                                      │  CONTROLS                    │
│         ┌──────────┐                 │  ┌──────────┬─────────────┐  │
│         │ ⬜ ⬜ ⬜ │                 │  │ Scramble │    Solve    │  │
│         │ ⬜ ⬜ ⬜ │  ← Up face      │  └──────────┴─────────────┘  │
│         │ ⬜ ⬜ ⬜ │                 │  ┌──────────┬─────────────┐  │
│         └──────────┘                 │  │  Reset   │    Undo     │  │
│  ┌──────┐┌──────────┐┌──────┐┌────┐ │  └──────────┴─────────────┘  │
│  │🟠🟠🟠││ 🟩🟩🟩 ││🟥🟥🟥││🟦🟦│ │  ┌──────────┬─────────────┐  │
│  │🟠🟠🟠││ 🟩🟩🟩 ││🟥🟥🟥││🟦🟦│ │  │   Prev   │    Next     │  │
│  │🟠🟠🟠││ 🟩🟩🟩 ││🟥🟥🟥││🟦🟦│ │  └──────────┴─────────────┘  │
│  └──────┘└──────────┘└──────┘└────┘ │                              │
│         ┌──────────┐                 │  ⚡ Speed  ━━━●━━━━━  5/10  │
│         │ 🟡 🟡 🟡 │                 ├──────────────────────────────┤
│         │ 🟡 🟡 🟡 │  ← Down face   │  MOVE HISTORY                │
│         │ 🟡 🟡 🟡 │                 │  U  R2  F' B  L  U' D2 R    │
│         └──────────┘                 │  F  U2  R' L  B' D  F2 U    │
├──────────────────────────────────────┴──────────────────────────────┤
│  Current Move: R2   │  Progress: 8/14  │  State: Solving...         │
└─────────────────────────────────────────────────────────────────────┘
```

> Dark glassmorphism UI with animated ambient orbs, 3D sticker depth, and smooth move animations.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🧠 Real Solver
- **Kociemba two-phase algorithm** — not a reverse-scramble trick
- Solves **any valid cube state** in ≤ 22 moves
- Powered by [`cubejs`](https://github.com/ldez/cubejs) library
- Lookup tables precomputed on load (~3–5s, one-time)

### 🎬 Smooth Playback
- Step-by-step animated solution
- Adjustable speed (1×–10×)
- **Prev / Next** manual step-through
- Face highlight + sticker flash on each move

</td>
<td width="50%">

### 📱 Mobile Ready
- Full **touch control pad** — 6 faces × CW/CCW buttons
- Fluid sticker sizing with `clamp()` — fits any screen
- 44px minimum touch targets (Apple HIG compliant)
- Safe area insets for notched phones

### 🎨 Premium UI
- Deep space dark theme (`#05050d`)
- Glassmorphism cards with blur + saturation
- Animated ambient orbs in background
- 3D sticker depth with highlight gloss
- Gradient accents (violet → teal)

</td>
</tr>
<tr>
<td>

### ⌨️ Keyboard Controls
- `U` `R` `F` `B` `L` `D` — clockwise moves
- `Shift` + key — counter-clockwise (inverse)
- Works on desktop, hidden on mobile

</td>
<td>

### 🔧 Developer Quality
- Clean ES6+ class architecture
- `CubeState` → `Renderer` → `Controller` pattern
- No global pollution, no inline JS
- Fully responsive (320px → 4K)

</td>
</tr>
</table>

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 16.x |
| npm | ≥ 8.x |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/0609Abhinav/Rubik-s-Cube.git

# 2. Navigate to the React app
cd Rubik-s-Cube/cube-solver

# 3. Install dependencies
npm install

# 4. Start development server
npm start
```

> Opens at **http://localhost:3000** 🎉

### Production Build

```bash
npm run build
# Output in cube-solver/build/
```

> ⚠️ **First load note:** The Kociemba solver precomputes lookup tables on startup (~3–5 seconds). The **Solve** button shows `Loading…` during this time — this is expected and only happens once per session.

---

## 🎮 How to Use

### Desktop

| Action | Control |
|--------|---------|
| Scramble cube | Click **Scramble** |
| Solve cube | Click **Solve** → watch animation |
| Step through solution | **Prev** / **Next** buttons |
| Manual move (clockwise) | Press `U` `R` `F` `B` `L` `D` |
| Manual move (counter-clockwise) | `Shift` + face key |
| Undo last move | Click **Undo** |
| Reset to solved | Click **Reset** |
| Change animation speed | Drag speed slider |

### Mobile

| Action | Control |
|--------|---------|
| Scramble / Solve / Reset | Top buttons |
| Manual moves | **Touch Pad** — colored CW buttons + outlined CCW buttons |
| Step through | Prev / Next after solving |

---

## 🏗️ Architecture

```
cube-solver/src/
│
├── engine/
│   └── CubeState.js        ← Cube state (54-char string), solver, scramble
│
├── components/
│   ├── CubeNet.js           ← 3×3 div-grid face renderer (6 faces)
│   ├── Controls.js          ← Buttons + speed slider
│   ├── TouchPad.js          ← Mobile touch controls (6 faces × CW/CCW)
│   ├── MoveHistory.js       ← Scrollable move history with active chip
│   └── StatusBar.js         ← Fixed bottom status indicator
│
├── App.js                   ← Controller: state, events, async playback
└── index.css                ← All styles: glassmorphism, fluid layout, animations
```

### Key Design Decisions

| Decision | Reason |
|----------|--------|
| 54-char facelet string as state | Native cubejs format — zero conversion overhead |
| `async/await` playback loop | Clean cancellation via `playingRef`, speed changes mid-play |
| `clamp()` for sticker size | Single value scales from 24px (mobile) to 42px (desktop) |
| Snapshot for step-back | Replay from snapshot is always accurate, no inverse-move bugs |
| `speedRef` alongside `speed` state | Avoids stale closure in async loop |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 |
| Cube Solver | [cubejs](https://github.com/ldez/cubejs) — Kociemba two-phase |
| Styling | Pure CSS — custom properties, glassmorphism, `clamp()` |
| Font | [Inter](https://fonts.google.com/specimen/Inter) — Google Fonts |
| Build Tool | Create React App |
| Deployment | Vercel |

---

## 📁 Repository Structure

```
Rubik-s-Cube/
├── cube-solver/              ← ✅ Main React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── engine/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.css
│   ├── package.json
│   └── README.md
├── vercel.json               ← Vercel deployment config
└── .gitignore
```

---

## 🌐 Deployment

This project is deployed on **Vercel** with a custom `vercel.json` config that points to the `cube-solver` subfolder:

```json
{
  "buildCommand": "cd cube-solver && npm install && npm run build",
  "outputDirectory": "cube-solver/build",
  "installCommand": "echo 'skip root install'",
  "framework": null
}
```

**Live URL:** [https://rubik-s-cube-three.vercel.app](https://rubik-s-cube-three.vercel.app)

---

## 🤝 Contributing

Contributions are welcome!

```bash
# Fork → Clone → Branch → Code → PR
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

---

## 👨‍💻 Developer

<div align="center">

<br/>

**Abhinav Tripathi**

[![GitHub](https://img.shields.io/badge/GitHub-0609Abhinav-181717?style=for-the-badge&logo=github)](https://github.com/0609Abhinav)

*Built with ♥ for speedcubers and clean code enthusiasts*

<br/>

</div>

---

## 📄 License

```
MIT License

Copyright (c) 2026 Abhinav Tripathi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

⭐ **Star this repo if you found it useful!** ⭐

<br/>

*© 2026 Abhinav Tripathi · All rights reserved*

</div>
