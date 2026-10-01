// Persistent game state (coins, secrets, achievements, settings).
// localStorage is a convenience: everything works if it's unavailable.

import { COIN_IDS, MAIN_SECTIONS } from '../data/achievements.js';

const KEY = 'ab-arcade-v3';

const reducedMotion =
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

const defaults = () => ({
  coins: [],
  secrets: [],
  achievements: [],
  visited: [],
  settings: { fx: !reducedMotion, sound: false },
  booted: false,
});

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults();
    const data = JSON.parse(raw);
    const base = defaults();
    return { ...base, ...data, settings: { ...base.settings, ...(data.settings || {}) } };
  } catch {
    return defaults();
  }
}

const state = load();
const listeners = new Set();

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* private mode / blocked storage — keep playing in memory */
  }
}

function emit(event, payload) {
  listeners.forEach((fn) => fn(event, payload, state));
}

export const store = {
  get: () => state,
  on(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  hasCoin: (id) => state.coins.includes(id),
  addCoin(id) {
    if (!COIN_IDS.includes(id) || state.coins.includes(id)) return false;
    state.coins.push(id);
    save();
    emit('coin', id);
    if (state.coins.length === COIN_IDS.length) {
      this.unlock('coin-collector');
      emit('devroom-unlocked');
    }
    return true;
  },
  allCoins: () => state.coins.length === COIN_IDS.length,

  hasSecret: (id) => state.secrets.includes(id),
  addSecret(id) {
    if (state.secrets.includes(id)) return false;
    state.secrets.push(id);
    save();
    emit('secret', id);
    return true;
  },

  hasAchievement: (id) => state.achievements.includes(id),
  unlock(id) {
    if (state.achievements.includes(id)) return false;
    state.achievements.push(id);
    save();
    emit('achievement', id);
    return true;
  },

  visit(section) {
    if (!MAIN_SECTIONS.includes(section) || state.visited.includes(section)) return;
    state.visited.push(section);
    save();
    if (MAIN_SECTIONS.every((s) => state.visited.includes(s))) this.unlock('curious-player');
  },

  setting(key, value) {
    if (value === undefined) return state.settings[key];
    state.settings[key] = value;
    save();
    emit('settings', { key, value });
    return value;
  },

  markBooted() {
    state.booted = true;
    save();
  },

  reset() {
    Object.assign(state, defaults());
    save();
    emit('reset');
  },
};
