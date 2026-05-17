# Poodle Day Planner Web Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a playable browser prototype of Poodle Day Planner that proves the grid, poodle preferences, checklist simulation, and gentle feedback loop.

**Architecture:** Keep game rules in a renderer-independent ES module so the model can later guide Swift/SpriteKit implementation. The browser layer owns DOM rendering, drag/click placement, animation classes, and lightweight Web Audio cues.

**Tech Stack:** Vanilla HTML, CSS, JavaScript ES modules, Node's built-in `node:test` runner.

---

### Task 1: Core Model Tests

**Files:**
- Create: `tests/game.test.mjs`
- Create later: `src/game/core.mjs`

- [ ] **Step 1: Write failing tests for successful routines and failure reasons**

Create tests that import `createStarterLevel`, `simulateDay`, and `tileKey` from `src/game/core.mjs`. Assert that a valid layout lets Mimi eat and nap, that Beau requires play before nap, and that a blocked or missing item produces a clear reason.

- [ ] **Step 2: Run the tests and verify RED**

Run: `node --test tests/game.test.mjs`

Expected: FAIL because `src/game/core.mjs` does not exist yet.

### Task 2: Core Simulation

**Files:**
- Create: `src/game/core.mjs`

- [ ] **Step 1: Implement model types as plain objects**

Define tile keys, starter level data, poodles, items, habits, and board dimensions without DOM dependencies.

- [ ] **Step 2: Implement pathfinding and habit resolution**

Use breadth-first search over the grid, block obstacle tiles, and resolve habits in checklist order. Return completed habits, movement path, success flag, and friendly failure messages.

- [ ] **Step 3: Run tests and verify GREEN**

Run: `node --test tests/game.test.mjs`

Expected: PASS.

### Task 3: Browser Prototype

**Files:**
- Create: `index.html`
- Create: `src/game/app.mjs`
- Create: `src/game/audio.mjs`
- Create: `src/game/poodle-art.mjs`
- Create: `styles.css`

- [ ] **Step 1: Build the app shell**

Create an iPhone portrait-oriented page with a toolbar, poodle cards, item tray, grid, Start Day button, and feedback panel.

- [ ] **Step 2: Render the home grid and item placement**

Let players choose bowl, bed, toy, family, sunny, and obstacle tiles, then place them on the grid by tapping cells.

- [ ] **Step 3: Simulate the day**

Call `simulateDay`, animate poodles along returned paths, update checklist chips, and show success or failure feedback.

- [ ] **Step 4: Add placeholder visuals and audio**

Use inline SVG poodle art, CSS animation states, and Web Audio tones/ambience for prototype feedback.

### Task 4: Verification And Commit

**Files:**
- Modify: `package.json`
- Verify all changed files

- [ ] **Step 1: Add package scripts**

Add `test`, `start`, and `check` scripts using only local Node capabilities.

- [ ] **Step 2: Run verification**

Run: `node --test tests/game.test.mjs`

Expected: all tests pass.

- [ ] **Step 3: Commit**

Commit the plan and prototype on `codex/web-prototype`.
