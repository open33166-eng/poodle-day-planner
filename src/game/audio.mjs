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

  if (type === 'happy-bark') {
    playBark([520, 690], 0.08, 0.16);
    return;
  }

  if (type === 'excited-bark') {
    playBark([620, 760, 680], 0.065, 0.1);
    return;
  }

  if (type === 'content-whine') {
    playWhine(420, 540, 0.32);
    return;
  }

  if (type === 'sleepy-sigh') {
    playSigh();
    return;
  }

  if (type === 'soft-yip') {
    playBark([470], 0.07, 0.12);
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

function playBark(frequencies, duration, spacing) {
  const audio = getContext();
  frequencies.forEach((frequency, index) => {
    const start = audio.currentTime + index * spacing;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.62, start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.085, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  });
}

function playWhine(startFrequency, endFrequency, duration) {
  const audio = getContext();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(startFrequency, audio.currentTime);
  oscillator.frequency.linearRampToValueAtTime(endFrequency, audio.currentTime + duration * 0.45);
  oscillator.frequency.linearRampToValueAtTime(startFrequency * 0.9, audio.currentTime + duration);
  gain.gain.setValueAtTime(0.0001, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.045, audio.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
  oscillator.connect(gain).connect(audio.destination);
  oscillator.start();
  oscillator.stop(audio.currentTime + duration + 0.03);
}

function playSigh() {
  const audio = getContext();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(260, audio.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(135, audio.currentTime + 0.42);
  gain.gain.setValueAtTime(0.0001, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.032, audio.currentTime + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.46);
  oscillator.connect(gain).connect(audio.destination);
  oscillator.start();
  oscillator.stop(audio.currentTime + 0.5);
}

function getContext() {
  if (!context) {
    const AudioEngine = window.AudioContext ?? window.webkitAudioContext;
    context = new AudioEngine();
  }
  return context;
}
