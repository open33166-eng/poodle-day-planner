# Poodle Day Planner

A calm grid strategy prototype about arranging a cozy home so realistic poodles can complete their daily routines with the owner's family.

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

The current implementation is a browser prototype. The rules are kept in `src/game/core.mjs` without DOM dependencies so the same model can guide a later Swift/SpriteKit iPhone implementation.
