// ANDRES BUILDS — A.B. ARCADE SYSTEM v3
// Entry point: wires state, HUD, hub, handheld, screens, secrets and routing.

import { store } from './core/state.js';
import { sfx } from './core/sound.js';
import { toast } from './core/toast.js';
import { $, isHandheld } from './core/dom.js';
import { achievements, COIN_IDS } from './data/achievements.js';
import { machineById } from './data/machines.js';
import { initCoins } from './ui/coins.js';
import { mountHud } from './ui/hud.js';
import { mountHub } from './ui/hub.js';
import { mountHandheld } from './ui/handheld.js';
import { createScreen } from './ui/screen.js';
import { runBoot } from './ui/boot.js';
import { renderQuick } from './ui/quick.js';
import { overlay, feedKonami, pokePlayerOne, rollCredits, devtoolsMessage, initAfk } from './ui/secrets.js';

const doc = document.documentElement;
const els = {
  arcade: $('#arcade'),
  handheld: $('#handheld'),
  layer: $('#screen-layer'),
  quick: $('#quick'),
};

// ───────────── settings ─────────────
function applySettings() {
  doc.dataset.fx = store.setting('fx') ? 'on' : 'off';
  doc.classList.toggle('has-dev', store.hasSecret('konami'));
  doc.classList.toggle('dev-mode', store.hasSecret('konami') && store.setting('dev') !== false);
}
applySettings();

// ───────────── navigation ─────────────
let lastOrigin = null;
let booted = false;
let bootCtl = null;
let quickRendered = false;

const go = (id) => {
  const hash = id === 'hub' ? '#/' : `#/${id}`;
  if (location.hash === hash) route();
  else location.hash = hash;
};

const ctx = {
  go,
  toast,
  store,
  sfx,
  overlay,
  open(id, origin) {
    lastOrigin = origin || null;
    go(id);
  },
  credits: rollCredits,
  feedKey: (k) => feedKonami(k, konamiUnlocked),
};

// ───────────── rewards → notifications ─────────────
store.on((evt, id, st) => {
  if (evt === 'coin') {
    toast({ kind: 'coin', title: '+1 COIN', text: `COINS ${st.coins.length} / ${COIN_IDS.length}` });
  }
  if (evt === 'secret') {
    toast({ kind: 'secret', title: 'SECRET DISCOVERED  +1', text: `SECRETS FOUND: ${st.secrets.length} / ???` });
  }
  if (evt === 'achievement') {
    const a = achievements.find((x) => x.id === id);
    sfx.achievement();
    toast({ kind: 'achievement', title: `ACHIEVEMENT UNLOCKED`, text: a ? `${a.title} — ${a.desc}` : id, ms: 4600 });
  }
  if (evt === 'devroom-unlocked') {
    setTimeout(() => toast({ kind: 'coin', title: 'SECRET DEV ROOM UNLOCKED', text: 'La puerta STAFF ONLY está abierta.', ms: 5000 }), 600);
  }
});

function konamiUnlocked() {
  const isNew = store.addSecret('konami');
  store.unlock('code-explorer');
  store.setting('dev', true);
  applySettings();
  hud.setToggle('dev', true);
  if (isNew) sfx.secret();
  toast({ kind: 'secret', title: 'CHEAT CODE ACCEPTED', text: 'DEV MODE UNLOCKED — comentarios del developer visibles.', ms: 4200 });
}

// ───────────── mount ─────────────
const hud = mountHud({
  onPlayerOne: () => pokePlayerOne(ctx),
  go,
  onToggle(key) {
    if (key === 'dev') {
      const on = !doc.classList.contains('dev-mode');
      store.setting('dev', on);
      applySettings();
      return hud.setToggle('dev', on);
    }
    const on = store.setting(key, !store.setting(key));
    applySettings();
    hud.setToggle(key, on);
    if (key === 'sound' && on) { sfx.prime(); sfx.coin(); }
    toast({ kind: 'info', title: `${key === 'fx' ? 'FX' : 'SOUND'} ${on ? 'ON' : 'OFF'}`, ms: 1400 });
  },
});
document.body.prepend(hud.node);
hud.setToggle('dev', doc.classList.contains('dev-mode'));

const initialRoute = location.hash.replace(/^#\/?/, '');
const willBoot = initialRoute !== 'quick' && !machineById(initialRoute);
const hub = mountHub(els.arcade, ctx, { dark: willBoot });
const handheld = mountHandheld(els.handheld, ctx, { dark: willBoot });
const screen = createScreen({ layer: els.layer, ctx, hub, handheld, background: els.arcade });

// ───────────── modes ─────────────
function showArcade() {
  if (booted) { hub.powerOn(); handheld.powerOn(); }
  els.quick.hidden = true;
  els.arcade.hidden = false;
  els.handheld.hidden = false;
  hud.node.hidden = false;
  doc.classList.remove('is-quick');
}

function showQuick() {
  bootCtl?.destroy();
  bootCtl = null;
  booted = true;
  screen.close(true);
  if (!quickRendered) { renderQuick(els.quick); quickRendered = true; }
  els.arcade.hidden = true;
  els.handheld.hidden = true;
  hud.node.hidden = true;
  els.quick.hidden = false;
  doc.classList.add('is-quick');
  document.title = 'Andrés Hernández — Creative Web Developer · ANDRES BUILDS';
  window.scrollTo(0, 0);
  $('#q-name', els.quick)?.setAttribute('tabindex', '-1');
  $('#q-name', els.quick)?.focus({ preventScroll: true });
}

function route() {
  const r = location.hash.replace(/^#\/?/, '');
  if (r === 'quick') return showQuick();
  showArcade();
  if (!booted) return;
  if (!r) return screen.close();
  if (machineById(r)) {
    if (r === 'devroom' && !store.allCoins()) return go('hub');
    if (r === 'broken' && !store.hasSecret('out-of-order')) return go('hub');
    const origin = lastOrigin || document.querySelector(`.cab-slot[data-machine="${r}"]`);
    lastOrigin = null;
    return screen.open(r, isHandheld() ? null : origin);
  }
  go('hub');
}

window.addEventListener('hashchange', route);

// ───────────── keyboard ─────────────
document.addEventListener('keydown', (e) => {
  const typing = e.target.closest?.('input, textarea, select, [contenteditable]');
  if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
  feedKonami(e.key, konamiUnlocked);
  if (doc.classList.contains('is-quick') || !booted) return;
  if (e.key === 'Escape' && screen.current && !document.querySelector('.overlay')) {
    e.preventDefault();
    go('hub');
  }
  if ((e.key === 'q' || e.key === 'Q') && !screen.current) go('quick');
});

// ───────────── start ─────────────
initCoins();
devtoolsMessage();
initAfk({ arcade: els.arcade, isHub: () => booted && !screen.current && !els.arcade.hidden, toast });

// Only move focus for keyboard players — a mouse click shouldn't light up a cabinet by itself.
let usingKeyboard = false;
window.addEventListener('keydown', () => (usingKeyboard = true), true);
window.addEventListener('pointerdown', () => (usingKeyboard = false), true);

if (initialRoute === 'quick') {
  showQuick();
} else if (initialRoute && machineById(initialRoute)) {
  booted = true;
  route();
} else {
  bootCtl = runBoot({
    onStart() {
      booted = true;
      bootCtl = null;
      hub.powerOn();
      handheld.powerOn();
      if (usingKeyboard && !isHandheld()) setTimeout(() => hub.focusMachine('projects'), 1400);
      route();
    },
  });
}
