# Poodle Day Planner Design

Date: 2026-05-18

## Summary

Poodle Day Planner is a calm iPhone-first grid strategy puzzle about arranging a cozy home so realistic poodles can complete their daily habits with the owner's family. The player places rooms, furniture, pet items, and family zones on a small grid, then starts a daily simulation. A level is solved when every poodle completes its checklist.

The game prioritizes warm pet-life charm over pressure. There is no timer and no score chase in the first version. The main pleasure is reading each poodle's personality, arranging the home, watching the day unfold, and making small layout adjustments until the household rhythm works.

## Target Platform

The primary target is iPhone and the App Store. The recommended first implementation is native iOS using Swift and SpriteKit.

SpriteKit is a good fit because the game is 2D, grid-based, animation-heavy, and benefits from native iPhone polish. The puzzle logic should be kept separate from SpriteKit rendering so the rules can later be reused or ported to a web prototype, likely with Phaser.

## Core Gameplay

Each level gives the player:

- A fixed home grid.
- A small set of placeable home items.
- One or more realistic poodles.
- A habit checklist for each poodle.
- A Start Day button that runs the simulation.
- A gentle success or failure result.
- A chance to adjust the layout and try again.

The player places items such as beds, food bowls, toy baskets, grooming mats, sunny spots, doorways, family seats, and play areas. When the day starts, poodles move through the home and try to complete their routines.

Example habits include eating, napping, playing, following a family member, avoiding noisy areas, seeking sunlight, getting groomed, or spending quiet time near the owner. A level succeeds when all required habits are completed.

## Poodles

Poodles are the emotional and mechanical center of the game. The first version should use realistic household pets, with many different poodles as the signature identity.

Poodle variants can include:

- Toy poodle.
- Miniature poodle.
- Standard poodle.
- Puppy.
- Senior poodle.
- Show-cut poodle.
- Teddy-cut poodle.
- Different coat colors.

Gameplay differences should come from both personality and variant. Personality traits can include shy, energetic, clingy, clever, stubborn, sleepy, playful, and calm. Variants can affect movement, space needs, grooming needs, preferred activities, and tolerance for noise or distance.

Example poodle:

Mimi is a shy toy poodle with a teddy cut. She prefers quiet beds, avoids noisy play areas, likes staying near one family member, and needs food, cuddle time, and a nap to complete the level.

## Home Grid

The home grid is the puzzle board. Each tile can contain a room type, item, obstacle, family zone, or environmental quality.

Items and zones create puzzle affordances:

- Bowls satisfy eating.
- Beds satisfy naps.
- Toys satisfy play.
- Grooming mats satisfy brushing.
- Sunny spots improve comfort.
- Family seats support bonding.
- Noisy zones can bother shy or senior poodles.
- Open paths determine whether poodles can reach required locations.

The board should remain readable on an iPhone in portrait orientation. The grid should be small in the first prototype, with larger or more constrained boards introduced only after the core loop is proven.

## Simulation

The first simulation should be simple, readable, and explainable. It does not need complex AI.

Each poodle follows priority rules based on its checklist and preferences. A basic routine might be:

1. Find food.
2. Find play or family interaction.
3. Find grooming if required.
4. Find a preferred rest spot.

Movement can use simple pathfinding over the grid. If a poodle fails, the game should explain why in gentle terms, such as:

- Mimi could not reach a quiet nap spot.
- Beau needed a toy before rest.
- Coco avoided the noisy family room and missed cuddle time.

The player's job is to adjust the layout so each poodle's checklist becomes possible.

## Presentation

The game should feel realistic, warm, and polished. The poodles should not feel like abstract tokens. They should have readable animations and personality.

Required poodle animation states for a production slice:

- Walking.
- Sniffing.
- Sitting.
- Napping.
- Eating.
- Playing.
- Being groomed.
- Wagging.
- Waiting.
- Happy reaction after a habit completes.

The grid can stay mechanically clear while the home feels cozy and lived-in. Visual details can include rugs, sunlight, soft furniture, bowls, beds, toys, family activity spots, and small ambient animations.

The style target is mini-game clarity with pet-life warmth.

## Audio

Audio is a first-class part of the experience.

Each scene should have gentle background music that fits the household moment:

- Morning light.
- Playful afternoon.
- Quiet evening.
- Rainy day.
- Grooming day.
- Family gathering.

Sound effects should be soft and pleasant over repeated play:

- Paw steps.
- Collar jingle.
- Bowl clink.
- Toy squeak.
- Brush strokes.
- Door taps.
- Happy barks.
- Calm room ambience.

Settings must include separate toggles for background music and sound effects.

## Level Structure

The game should be level-based. Each level introduces one new poodle personality, poodle variant, or household habit.

Early level examples:

- Level 1: one calm toy poodle with a simple food and nap routine.
- Level 2: one energetic miniature poodle that needs play before nap.
- Level 3: two poodles with different preferences.
- Level 4: a shy poodle that avoids noisy family zones.
- Level 5: a senior poodle that needs shorter paths and quiet rest.

Difficulty should grow mainly through more poodle personalities and variants, not timers or punishment. Later levels can add family routines, such as a child playing after school or the owner sitting in the living room, but the pet checklist remains the main objective.

## Technical Direction

Recommended stack:

- Swift for game code.
- SpriteKit for 2D rendering, animation, scenes, input, and audio playback.
- Clean Swift model classes for grid rules, poodles, habits, items, and simulation.
- Asset catalogs for poodle sprites, room art, item art, sound effects, and music loops.
- Local storage for unlocked levels, completed levels, and audio settings.

Suggested scene structure:

- Main menu.
- Level select.
- Puzzle board.
- Day simulation.
- Result screen.
- Settings.

Core rule logic should avoid direct SpriteKit dependencies. SpriteKit should display the state and collect input, while the model layer owns level data, pathfinding, checklist progress, and success or failure reasons.

## First Prototype Scope

The first prototype should prove the puzzle before heavy art production.

Prototype scope:

- One iPhone portrait board.
- One small home grid.
- Two poodle variants.
- Three item types: food bowl, bed, and toy.
- One family zone.
- Start Day simulation.
- Checklist success and failure.
- Temporary prototype poodle animations that prove the needed states before final art is produced.
- Temporary prototype sound and music that prove audio timing before final audio is produced.

The prototype is successful if a player can understand why a poodle succeeds or fails and finds it satisfying to adjust the home layout.

## Production Slice Scope

After the prototype works, the first polished slice should add:

- Five complete levels.
- Realistic poodle art for several variants.
- Core animation states for each poodle.
- Gentle background music for multiple scenes.
- Scene ambience and action sound effects.
- Audio settings.
- Clear success and failure feedback.
- iPhone portrait UI polish.

## Testing

Testing should cover both rules and player experience.

Rules testing:

- Poodles can path to reachable required items.
- Blocked paths fail with clear reasons.
- Checklist habits complete in the expected order.
- Multiple poodles can complete independent routines.
- Personality preferences affect valid solutions.

Experience testing:

- The board is readable on iPhone portrait screens.
- Dragging or placing items feels precise.
- A new player understands the level goal.
- Failure messages tell the player what to adjust.
- Poodle personalities are readable from behavior.
- Sounds and music remain pleasant over repeated plays.

## Open Future Ideas

These are intentionally outside the first prototype:

- Daily challenge levels.
- Cloud saves.
- App Store monetization.
- Large decoration catalog.
- Online leaderboards.
- Web version.
- Complex family scheduling.

They can be considered after the core puzzle is fun and the first production slice feels polished.
