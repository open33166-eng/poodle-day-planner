export const tileKey = (x, y) => `${x},${y}`;

const parseTileKey = (key) => {
  const [x, y] = key.split(',').map(Number);
  return { x, y };
};

const HABIT_TARGETS = {
  eat: {
    item: 'bowl',
    missing: (name) => `${name} could not reach a food bowl.`,
  },
  play: {
    item: 'toy',
    missing: (name) => `${name} needed a toy before rest.`,
  },
  nap: {
    item: 'bed',
    missing: (name) => `${name} could not reach a quiet nap spot.`,
  },
  family: {
    item: 'family',
    missing: (name) => `${name} missed family time.`,
  },
};

export function createStarterLevel() {
  return {
    id: 'sunny-morning',
    title: 'Sunny Morning',
    width: 5,
    height: 5,
    startingPositions: new Map([
      ['mimi', tileKey(0, 0)],
      ['beau', tileKey(0, 4)],
    ]),
    poodles: [
      {
        id: 'mimi',
        name: 'Mimi',
        variant: 'Toy poodle',
        coat: 'Apricot teddy cut',
        personality: 'Shy and sleepy',
        habits: ['eat', 'nap'],
        avoids: ['obstacle'],
      },
      {
        id: 'beau',
        name: 'Beau',
        variant: 'Miniature poodle',
        coat: 'White sport cut',
        personality: 'Energetic and social',
        habits: ['eat', 'play', 'nap'],
        avoids: ['obstacle'],
      },
    ],
    placeableItems: ['bowl', 'bed', 'toy', 'family', 'sunny', 'obstacle'],
  };
}

export function createCareProfile() {
  return {
    pet: {
      name: 'Cloudy',
      level: 12,
      type: 'Poodle',
      coat: 'White teddy cut',
    },
    currency: {
      coins: 8450,
      gems: 320,
    },
    stats: {
      health: 92,
      happiness: 78,
      hunger: 45,
      energy: 66,
    },
    bond: {
      level: 12,
      current: 320,
      target: 500,
    },
    todayGoal: {
      label: 'Play together 3 times',
      completed: 0,
      target: 3,
    },
  };
}

export function applyCareAction(profile, action) {
  const effects = {
    feed: {
      stats: { hunger: 12, happiness: 2 },
      bond: 10,
      goal: 1,
      message: 'Cloudy enjoyed a careful meal.',
    },
    groom: {
      stats: { health: 4, happiness: 6 },
      bond: 16,
      goal: 0,
      message: 'Cloudy looks fluffy and proud.',
    },
    play: {
      stats: { happiness: 12, energy: -8 },
      bond: 40,
      goal: 1,
      message: 'Cloudy loved play time with the family.',
    },
    rest: {
      stats: { energy: 14, health: 2 },
      bond: 8,
      goal: 0,
      message: 'Cloudy curled up for a soft little rest.',
    },
  };

  const effect = effects[action];
  if (!effect) {
    return { ...profile, message: 'Cloudy is waiting for a cozy action.' };
  }

  const stats = { ...profile.stats };
  for (const [stat, change] of Object.entries(effect.stats)) {
    stats[stat] = clampStat(stats[stat] + change);
  }

  return {
    ...profile,
    stats,
    bond: {
      ...profile.bond,
      current: Math.min(profile.bond.target, profile.bond.current + effect.bond),
    },
    todayGoal: {
      ...profile.todayGoal,
      completed: Math.min(profile.todayGoal.target, profile.todayGoal.completed + effect.goal),
    },
    message: effect.message,
  };
}

export function getCarePresentation(action) {
  const presentations = {
    feed: {
      animation: 'is-eating',
      sound: 'happy-bark',
    },
    groom: {
      animation: 'is-grooming',
      sound: 'content-whine',
    },
    play: {
      animation: 'is-playing',
      sound: 'excited-bark',
    },
    rest: {
      animation: 'is-resting',
      sound: 'sleepy-sigh',
    },
  };

  return presentations[action] ?? {
    animation: 'is-curious',
    sound: 'soft-yip',
  };
}

function clampStat(value) {
  return Math.max(0, Math.min(100, value));
}

export function simulateDay(level, layout) {
  const poodles = level.poodles.map((poodle) => simulatePoodle(level, layout, poodle));
  return {
    levelId: level.id,
    success: poodles.every((poodle) => poodle.completedHabits.length === poodle.habits.length),
    poodles,
  };
}

function simulatePoodle(level, layout, poodle) {
  let current = level.startingPositions.get(poodle.id);
  const completedHabits = [];
  const fullPath = [current];

  for (const habit of poodle.habits) {
    const target = HABIT_TARGETS[habit];
    const route = findRouteToItem(level, layout, current, target.item);

    if (!route) {
      return {
        id: poodle.id,
        name: poodle.name,
        variant: poodle.variant,
        coat: poodle.coat,
        personality: poodle.personality,
        habits: poodle.habits,
        completedHabits,
        path: fullPath,
        failureReason: target.missing(poodle.name),
      };
    }

    fullPath.push(...route.slice(1));
    current = route.at(-1);
    completedHabits.push(habit);
  }

  return {
    id: poodle.id,
    name: poodle.name,
    variant: poodle.variant,
    coat: poodle.coat,
    personality: poodle.personality,
    habits: poodle.habits,
    completedHabits,
    path: fullPath,
    failureReason: null,
  };
}

function findRouteToItem(level, layout, start, item) {
  const targetKeys = [...layout.entries()]
    .filter(([, value]) => value === item)
    .map(([key]) => key);

  if (targetKeys.length === 0) {
    return null;
  }

  const targetSet = new Set(targetKeys);
  const queue = [[start]];
  const visited = new Set([start]);

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path.at(-1);

    if (targetSet.has(current)) {
      return path;
    }

    for (const next of neighbors(level, current)) {
      if (visited.has(next) || layout.get(next) === 'obstacle') {
        continue;
      }

      visited.add(next);
      queue.push([...path, next]);
    }
  }

  return null;
}

function neighbors(level, key) {
  const { x, y } = parseTileKey(key);
  return [
    { x: x + 1, y },
    { x: x - 1, y },
    { x, y: y + 1 },
    { x, y: y - 1 },
  ]
    .filter((point) => point.x >= 0 && point.x < level.width && point.y >= 0 && point.y < level.height)
    .map((point) => tileKey(point.x, point.y));
}
