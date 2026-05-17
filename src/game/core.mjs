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
