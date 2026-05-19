# Poodle Day Planner

A cozy mobile-first poodle care game prototype. The current home screen centers Cloudy, a realistic teddy-cut poodle, with care stats, quick actions, bond progress, daily goals, and a lightweight routine puzzle underneath.

## Run The Prototype

```powershell
node scripts/dev-server.mjs
```

Then open:

```text
http://localhost:4173
```

## Verify

```powershell
node --test tests/game.test.mjs
node scripts/smoke-server.mjs
```

The current implementation is a browser prototype. The care model and routine rules are kept in `src/game/core.mjs` without DOM dependencies so the same model can guide a later Swift/SpriteKit iPhone implementation.
