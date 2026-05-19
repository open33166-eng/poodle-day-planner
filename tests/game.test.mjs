import test from 'node:test';
import assert from 'node:assert/strict';

import {
  applyCareAction,
  createCareProfile,
  createStarterLevel,
  getCarePresentation,
  simulateDay,
  tileKey,
} from '../src/game/core.mjs';

test('Mimi completes food and quiet nap when bowl and bed are reachable', () => {
  const level = createStarterLevel();
  const layout = new Map([
    [tileKey(1, 1), 'bowl'],
    [tileKey(2, 1), 'bed'],
    [tileKey(0, 2), 'toy'],
    [tileKey(3, 2), 'family'],
  ]);

  const result = simulateDay(level, layout);
  const mimi = result.poodles.find((poodle) => poodle.id === 'mimi');

  assert.equal(result.success, true);
  assert.deepEqual(mimi.completedHabits, ['eat', 'nap']);
  assert.equal(mimi.failureReason, null);
  assert.ok(mimi.path.length > 2);
});

test('Beau fails clearly when play is missing before rest', () => {
  const level = createStarterLevel();
  const layout = new Map([
    [tileKey(1, 1), 'bowl'],
    [tileKey(2, 1), 'bed'],
    [tileKey(3, 2), 'family'],
  ]);

  const result = simulateDay(level, layout);
  const beau = result.poodles.find((poodle) => poodle.id === 'beau');

  assert.equal(result.success, false);
  assert.deepEqual(beau.completedHabits, ['eat']);
  assert.equal(beau.failureReason, 'Beau needed a toy before rest.');
});

test('blocked paths fail with a reachable item explanation', () => {
  const level = createStarterLevel();
  const layout = new Map([
    [tileKey(1, 0), 'obstacle'],
    [tileKey(0, 1), 'obstacle'],
    [tileKey(4, 4), 'bowl'],
    [tileKey(4, 3), 'bed'],
    [tileKey(3, 4), 'toy'],
    [tileKey(3, 3), 'family'],
  ]);

  const result = simulateDay(level, layout);
  const mimi = result.poodles.find((poodle) => poodle.id === 'mimi');

  assert.equal(result.success, false);
  assert.deepEqual(mimi.completedHabits, []);
  assert.equal(mimi.failureReason, 'Mimi could not reach a food bowl.');
});

test('care actions improve matching stats and bond progress', () => {
  const profile = createCareProfile();

  const fed = applyCareAction(profile, 'feed');
  assert.equal(fed.stats.hunger, 57);
  assert.equal(fed.stats.happiness, 80);
  assert.equal(fed.todayGoal.completed, 1);

  const played = applyCareAction(fed, 'play');
  assert.equal(played.stats.happiness, 92);
  assert.equal(played.stats.energy, 58);
  assert.equal(played.bond.current, 370);
  assert.equal(played.todayGoal.completed, 2);
});

test('care actions expose animation and poodle sound cues for the UI', () => {
  assert.deepEqual(getCarePresentation('feed'), {
    animation: 'is-eating',
    sound: 'happy-bark',
  });

  assert.deepEqual(getCarePresentation('groom'), {
    animation: 'is-grooming',
    sound: 'content-whine',
  });

  assert.deepEqual(getCarePresentation('play'), {
    animation: 'is-playing',
    sound: 'excited-bark',
  });

  assert.deepEqual(getCarePresentation('rest'), {
    animation: 'is-resting',
    sound: 'sleepy-sigh',
  });
});
