import { createStarterLevel, simulateDay, tileKey } from './core.mjs';
import { playCue, startAmbience, toggleAudio } from './audio.mjs';
import { itemLabels, poodleSvg } from './poodle-art.mjs';

const level = createStarterLevel();
const layout = new Map([
  [tileKey(1, 1), 'bowl'],
  [tileKey(3, 1), 'bed'],
  [tileKey(1, 3), 'toy'],
  [tileKey(3, 3), 'family'],
  [tileKey(2, 2), 'sunny'],
]);

let selectedItem = 'bowl';
let animating = false;

const board = document.querySelector('#board');
const poodleList = document.querySelector('#poodle-list');
const feedback = document.querySelector('#feedback');
const startButton = document.querySelector('#start-day');
const soundToggle = document.querySelector('#sound-toggle');

renderPoodleCards();
renderBoard();

document.querySelectorAll('.tool').forEach((button) => {
  button.addEventListener('click', () => {
    selectedItem = button.dataset.item;
    document.querySelectorAll('.tool').forEach((tool) => tool.classList.toggle('is-selected', tool === button));
  });
});

soundToggle.addEventListener('click', () => {
  const isEnabled = toggleAudio();
  soundToggle.classList.toggle('is-muted', !isEnabled);
  soundToggle.textContent = isEnabled ? '♪' : '×';
  soundToggle.setAttribute('aria-label', isEnabled ? 'Turn sound off' : 'Turn sound on');
});

startButton.addEventListener('click', async () => {
  if (animating) {
    return;
  }

  startAmbience();
  const result = simulateDay(level, layout);
  await animateResult(result);
  updateChecklist(result);

  if (result.success) {
    feedback.textContent = 'A cozy morning. Every poodle completed their routine.';
    feedback.className = 'feedback is-success';
    playCue('success');
  } else {
    const reason = result.poodles.find((poodle) => poodle.failureReason)?.failureReason;
    feedback.textContent = reason ?? 'Something in the home needs a gentler arrangement.';
    feedback.className = 'feedback is-fail';
    playCue('fail');
  }
});

function renderPoodleCards() {
  poodleList.innerHTML = level.poodles.map((poodle) => `
    <article class="poodle-card" data-poodle-card="${poodle.id}">
      <div class="portrait">${poodleSvg(poodle.id)}</div>
      <div>
        <h3>${poodle.name}</h3>
        <p>${poodle.variant} · ${poodle.coat}</p>
        <p>${poodle.personality}</p>
        <div class="habits">
          ${poodle.habits.map((habit) => `<span data-habit="${poodle.id}:${habit}">${habit}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');
}

function renderBoard(poodlePositions = level.startingPositions) {
  board.style.setProperty('--board-size', level.width);
  board.innerHTML = '';

  for (let y = 0; y < level.height; y += 1) {
    for (let x = 0; x < level.width; x += 1) {
      const key = tileKey(x, y);
      const cell = document.createElement('button');
      const item = layout.get(key);
      cell.className = `cell ${item ? `has-${item}` : ''}`;
      cell.type = 'button';
      cell.dataset.key = key;
      cell.setAttribute('aria-label', `Tile ${x + 1}, ${y + 1}${item ? `, ${item}` : ''}`);
      cell.innerHTML = item ? `<span class="item-mark">${itemLabels[item]}</span>` : '';
      cell.addEventListener('click', () => placeItem(key));

      for (const [poodleId, position] of poodlePositions.entries()) {
        if (position === key) {
          const marker = document.createElement('div');
          marker.className = `poodle-token ${poodleId}`;
          marker.innerHTML = poodleSvg(poodleId);
          cell.append(marker);
        }
      }

      board.append(cell);
    }
  }
}

function placeItem(key) {
  if (animating) {
    return;
  }

  if (selectedItem === 'erase') {
    layout.delete(key);
  } else {
    layout.set(key, selectedItem);
  }

  feedback.textContent = `${selectedItem === 'erase' ? 'Cleared' : 'Placed'} tile.`;
  feedback.className = 'feedback';
  playCue('place');
  renderBoard();
}

async function animateResult(result) {
  animating = true;
  startButton.disabled = true;
  feedback.textContent = 'The poodles are starting their day...';
  feedback.className = 'feedback';

  const positions = new Map(level.startingPositions);
  const maxSteps = Math.max(...result.poodles.map((poodle) => poodle.path.length));

  for (let step = 0; step < maxSteps; step += 1) {
    for (const poodle of result.poodles) {
      const position = poodle.path[Math.min(step, poodle.path.length - 1)];
      positions.set(poodle.id, position);
    }

    renderBoard(positions);
    playCue('step');
    await wait(260);
  }

  animating = false;
  startButton.disabled = false;
}

function updateChecklist(result) {
  document.querySelectorAll('[data-habit]').forEach((habit) => {
    habit.classList.remove('is-complete');
  });

  for (const poodle of result.poodles) {
    for (const habit of poodle.completedHabits) {
      document.querySelector(`[data-habit="${poodle.id}:${habit}"]`)?.classList.add('is-complete');
    }

    const card = document.querySelector(`[data-poodle-card="${poodle.id}"]`);
    card?.classList.toggle('is-complete', poodle.completedHabits.length === poodle.habits.length);
  }
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
