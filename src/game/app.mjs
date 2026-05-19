import {
  applyCareAction,
  createCareProfile,
  createStarterLevel,
  getCarePresentation,
  simulateDay,
  tileKey,
} from './core.mjs';
import { playCue, startAmbience, toggleAudio } from './audio.mjs';
import { poodleSvg } from './poodle-art.mjs';

const level = createStarterLevel();
const routineLayout = new Map([
  [tileKey(1, 1), 'bowl'],
  [tileKey(2, 1), 'toy'],
  [tileKey(3, 1), 'bed'],
  [tileKey(2, 3), 'family'],
]);

let profile = createCareProfile();

const cloudyStage = document.querySelector('#cloudy-stage');
const petAvatar = document.querySelector('#pet-avatar');
const statsPanel = document.querySelector('#stats-panel');
const bondProgress = document.querySelector('#bond-progress');
const bondCopy = document.querySelector('#bond-copy');
const goalCount = document.querySelector('#goal-count');
const goalProgress = document.querySelector('#goal-progress');
const goalLabel = document.querySelector('#goal-label');
const routineFeedback = document.querySelector('#routine-feedback');
const moodBubble = document.querySelector('#mood-bubble');
const startButton = document.querySelector('#start-day');
const soundToggle = document.querySelector('#sound-toggle');

petAvatar.innerHTML = poodleSvg('cloudy');
cloudyStage.innerHTML = poodleSvg('cloudy');
renderCareProfile();

document.querySelectorAll('[data-care-action]').forEach((button) => {
  button.addEventListener('click', () => {
    startAmbience();
    const action = button.dataset.careAction;
    const presentation = getCarePresentation(action);
    profile = applyCareAction(profile, action);
    cloudyStage.classList.remove('is-eating', 'is-grooming', 'is-playing', 'is-resting', 'is-curious');
    void cloudyStage.offsetWidth;
    cloudyStage.classList.add(presentation.animation);
    moodBubble.textContent = bubbleCopy(action);
    moodBubble.classList.add('is-visible');
    routineFeedback.textContent = profile.message;
    renderCareProfile();
    playCue(presentation.sound);

    window.setTimeout(() => {
      cloudyStage.classList.remove(presentation.animation);
      moodBubble.classList.remove('is-visible');
    }, 1150);
  });
});

soundToggle.addEventListener('click', () => {
  const isEnabled = toggleAudio();
  soundToggle.classList.toggle('is-muted', !isEnabled);
  soundToggle.textContent = isEnabled ? 'Sound' : 'Muted';
  soundToggle.setAttribute('aria-label', isEnabled ? 'Turn sound off' : 'Turn sound on');
});

startButton.addEventListener('click', () => {
  startAmbience();
  const result = simulateDay(level, routineLayout);

  if (result.success) {
    routineFeedback.textContent = 'Cloudy and Beau can finish the cozy morning routine.';
    playCue('success');
  } else {
    const reason = result.poodles.find((poodle) => poodle.failureReason)?.failureReason;
    routineFeedback.textContent = reason ?? 'The routine needs a softer arrangement.';
    playCue('fail');
  }
});

function renderCareProfile() {
  document.querySelector('#coins').textContent = profile.currency.coins.toLocaleString();
  document.querySelector('#gems').textContent = profile.currency.gems.toLocaleString();
  document.querySelector('#bond-level').textContent = profile.bond.level;
  goalLabel.textContent = profile.todayGoal.label;
  goalCount.textContent = `${profile.todayGoal.completed}/${profile.todayGoal.target}`;
  bondCopy.textContent = `${profile.bond.current}/${profile.bond.target}`;
  bondProgress.style.width = `${(profile.bond.current / profile.bond.target) * 100}%`;
  goalProgress.style.width = `${(profile.todayGoal.completed / profile.todayGoal.target) * 100}%`;

  const stats = [
    { key: 'health', label: 'Health', icon: 'Heart', tone: 'green' },
    { key: 'happiness', label: 'Happiness', icon: 'Smile', tone: 'yellow' },
    { key: 'hunger', label: 'Hunger', icon: 'Bowl', tone: 'orange' },
    { key: 'energy', label: 'Energy', icon: 'Bolt', tone: 'blue' },
  ];

  statsPanel.innerHTML = stats.map((stat) => {
    const value = profile.stats[stat.key];
    return `
      <article class="stat-card ${stat.tone}">
        <div>
          <span>${stat.icon}</span>
          <strong>${stat.label}</strong>
        </div>
        <div class="stat-track"><span style="width: ${value}%"></span></div>
        <p>${value}/100</p>
      </article>
    `;
  }).join('');
}

function bubbleCopy(action) {
  const copy = {
    feed: 'Yum!',
    groom: 'So fluffy!',
    play: 'Again!',
    rest: 'Sleepy...',
  };

  return copy[action] ?? 'Hi!';
}
