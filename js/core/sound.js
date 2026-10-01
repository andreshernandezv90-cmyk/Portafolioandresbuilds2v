// Tiny chiptune SFX synthesized with WebAudio — zero audio files.
// OFF by default; never plays music automatically.

import { store } from './state.js';

let ctx = null;
let lastHover = 0;

function audio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// steps: [freq, durationSeconds][]
function tone(steps, { type = 'square', gain = 0.05, slide = false } = {}) {
  if (!store.setting('sound')) return;
  const ac = audio();
  if (!ac) return;
  let t = ac.currentTime;
  const osc = ac.createOscillator();
  const vol = ac.createGain();
  osc.type = type;
  osc.connect(vol).connect(ac.destination);
  vol.gain.setValueAtTime(gain, t);
  steps.forEach(([f, d]) => {
    if (slide) osc.frequency.linearRampToValueAtTime(f, t + d);
    else osc.frequency.setValueAtTime(f, t);
    t += d;
  });
  vol.gain.setValueAtTime(gain, t - 0.02);
  vol.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
  osc.start();
  osc.stop(t + 0.06);
}

export const sfx = {
  hover() {
    const now = performance.now();
    if (now - lastHover < 90) return;
    lastHover = now;
    tone([[660, 0.03]], { gain: 0.02 });
  },
  press: () => tone([[220, 0.04], [330, 0.05]], { gain: 0.04 }),
  back: () => tone([[330, 0.04], [196, 0.06]], { gain: 0.04 }),
  coin: () => tone([[988, 0.07], [1319, 0.22]], { gain: 0.05 }),
  achievement: () => tone([[523, 0.08], [659, 0.08], [784, 0.08], [1047, 0.25]], { gain: 0.05 }),
  secret: () => tone([[392, 0.08], [370, 0.08], [311, 0.08], [220, 0.08], [208, 0.08], [330, 0.08], [415, 0.08], [523, 0.2]], { gain: 0.04 }),
  powerOn: () => tone([[60, 0.05], [900, 0.35]], { type: 'sawtooth', gain: 0.03, slide: true }),
  error: () => tone([[140, 0.12], [110, 0.18]], { type: 'sawtooth', gain: 0.04 }),
  shoot: () => tone([[880, 0.03], [440, 0.04]], { gain: 0.02, slide: true }),
  hit: () => tone([[200, 0.03], [80, 0.06]], { type: 'triangle', gain: 0.06, slide: true }),
  // Unlock audio on a user gesture (browser autoplay policy).
  prime: () => store.setting('sound') && audio(),
};
