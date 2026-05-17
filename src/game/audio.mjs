let context = null;
let enabled = true;
let ambience = null;

export function toggleAudio() {
  enabled = !enabled;
  if (!enabled) {
    stopAmbience();
  }
  return enabled;
}

export function audioEnabled() {
  return enabled;
}

export function startAmbience() {
  if (!enabled || ambience) {
    return;
  }

  const audio = getContext();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = 174;
  gain.gain.value = 0.018;
  oscillator.connect(gain).connect(audio.destination);
  oscillator.start();
  ambience = { oscillator, gain };
}

export function stopAmbience() {
  if (!ambience) {
    return;
  }

  ambience.gain.gain.setTargetAtTime(0, getContext().currentTime, 0.02);
  ambience.oscillator.stop(getContext().currentTime + 0.08);
  ambience = null;
}

export function playCue(type) {
  if (!enabled) {
    return;
  }

  const audio = getContext();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  const frequencies = {
    place: 420,
    success: 660,
    fail: 180,
    step: 300,
  };

  oscillator.type = type === 'fail' ? 'triangle' : 'sine';
  oscillator.frequency.value = frequencies[type] ?? frequencies.place;
  gain.gain.value = type === 'step' ? 0.025 : 0.05;
  gain.gain.setTargetAtTime(0, audio.currentTime + 0.05, 0.04);
  oscillator.connect(gain).connect(audio.destination);
  oscillator.start();
  oscillator.stop(audio.currentTime + 0.18);
}

function getContext() {
  if (!context) {
    const AudioEngine = window.AudioContext ?? window.webkitAudioContext;
    context = new AudioEngine();
  }
  return context;
}
