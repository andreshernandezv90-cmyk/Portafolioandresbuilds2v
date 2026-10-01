// SECRETS — Konami code, Player 1, DevTools, Credits, AFK attract mode.
// Secrets and achievements are separate systems; the secret total is never shown.

import { profile } from '../data/profile.js';
import { store } from '../core/state.js';
import { sfx } from '../core/sound.js';
import { $, el, esc, motionWait } from '../core/dom.js';

// ───────────── overlay helper (focus-trapped, ESC closes) ─────────────
export function overlay(markup, { label, accent = 'var(--c-blue)', onClose } = {}) {
  const prev = document.activeElement;
  const node = el(`
    <div class="overlay" role="dialog" aria-modal="true" aria-label="${esc(label || 'Mensaje')}">
      <div class="overlay__box" style="border-color:${accent};--c-blue:${accent}" tabindex="-1">${markup}</div>
    </div>`);
  document.body.append(node);
  const box = $('.overlay__box', node);
  box.focus();
  const close = () => {
    node.remove();
    document.removeEventListener('keydown', onKey, true);
    onClose?.();
    prev?.focus?.({ preventScroll: true });
  };
  function onKey(e) {
    if (e.key === 'Escape') { e.stopPropagation(); close(); }
    if (e.key === 'Tab') {
      const f = [...node.querySelectorAll('button, a[href]')];
      if (!f.length) return e.preventDefault();
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  document.addEventListener('keydown', onKey, true);
  node.addEventListener('click', (e) => {
    if (e.target === node || e.target.closest('[data-close]')) close();
    if (e.target.closest('[data-go]')) close();
  });
  return { node, box, close };
}

// ───────────── KONAMI ─────────────
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let kIdx = 0;

export function feedKonami(key, onSuccess) {
  const k = key.length === 1 ? key.toLowerCase() : key;
  kIdx = k === KONAMI[kIdx] ? kIdx + 1 : k === KONAMI[0] ? 1 : 0;
  if (kIdx === KONAMI.length) {
    kIdx = 0;
    onSuccess();
  }
}

// ───────────── PLAYER 1 ─────────────
let p1Clicks = 0;
let p1Timer;
let p1Running = false;

export function pokePlayerOne(api) {
  if (p1Running) return;
  p1Clicks++;
  clearTimeout(p1Timer);
  p1Timer = setTimeout(() => (p1Clicks = 0), 1600);
  sfx.hover();
  if (p1Clicks < 5) return;
  p1Clicks = 0;
  p1Running = true;
  const o = overlay('<div class="overlay__lines pixel" aria-live="polite"></div><div class="overlay__actions"></div>', {
    label: 'Player 2',
    onClose: () => (p1Running = false),
  });
  const lines = $('.overlay__lines', o.box);
  const say = (t, cls = '') => lines.insertAdjacentHTML('beforeend', `<p class="${cls}">${t}</p>`);
  (async () => {
    say('PLAYER 2 CONNECTING<span class="blink">...</span>');
    await motionWait(1300);
    say('...');
    await motionWait(900);
    say('NO CONTROLLER DETECTED', 'is-err');
    sfx.error();
    await motionWait(900);
    say('MAYBE YOU COULD BE PLAYER 2.', 'is-hl');
    $('.overlay__actions', o.box).innerHTML = `
      <button type="button" class="arc-btn" data-go="contact" style="--btn:var(--c-blue);--btn-ink:#fff">CONTACT ANDRÉS</button>
      <button type="button" class="arc-btn arc-btn--ghost" data-close>NOT NOW</button>`;
    $('[data-go]', o.box).addEventListener('click', () => api.go('contact'));
    $('[data-go]', o.box).focus();
    if (store.addSecret('player-one')) sfx.secret();
  })();
}

// ───────────── CREDITS ─────────────
export function rollCredits() {
  const rows = [
    ['ANDRES BUILDS', ''],
    ['CREATED BY', profile.name],
    ['DESIGN', profile.name],
    ['DEVELOPMENT', profile.name],
    ['QUALITY ASSURANCE', 'Probably Andrés'],
    ['SPECIAL THANKS', 'PLAYER 2'],
  ];
  const o = overlay(`
    <div class="credits">
      <div class="credits__roll">
        ${rows.map(([a, b]) => `<p class="credits__h">${esc(a)}</p>${b ? `<p class="credits__n">${esc(b)}</p>` : ''}`).join('')}
        <p class="credits__end">THANKS FOR PLAYING</p>
        <p class="credits__q">THE END?</p>
      </div>
    </div>
    <div class="overlay__actions"><button type="button" class="arc-btn arc-btn--ghost" data-close>CLOSE</button></div>`,
  { label: 'Créditos', accent: 'var(--c-magenta)' });
  if (store.addSecret('credits')) sfx.secret();
  return o;
}

// ───────────── DEVTOOLS ─────────────
export function devtoolsMessage() {
  const big = 'font: 700 22px monospace; color: #ff4fb8; text-shadow: 2px 2px 0 #2a1546;';
  const txt = 'font: 13px monospace; color: #c9c3d8;';
  const hl = 'font: 700 13px monospace; color: #ffd23f;';
  console.log('%cANDRES BUILDS', big);
  console.log('%cOh... you\'re a developer.\nSince you\'re already here:', txt);
  console.log('%c' + profile.email, hl);
  console.log('%cPS: try %clookUnderTheHood()', txt, hl);

  window.lookUnderTheHood = () => {
    const isNew = store.addSecret('under-the-hood');
    store.unlock('under-the-hood');
    if (isNew) sfx.secret();
    console.log('%c> LOOKING UNDER THE HOOD', hl);
    console.log('%cVanilla JS modules · CSS-only cabinets · zero images · WebAudio SFX.\nSource: ' + profile.githubUrl, txt);
    return 'ACHIEVEMENT UNLOCKED: LOOKING UNDER THE HOOD';
  };
}

// ───────────── AFK / ATTRACT MODE ─────────────
export function initAfk({ arcade, isHub, toast }) {
  const LIMIT = 75_000;
  let timer;
  let afk = false;
  let note;
  const reset = () => {
    if (afk) {
      afk = false;
      arcade.classList.remove('is-afk');
      note?.remove();
      toast({ kind: 'info', title: 'PLAYER 1 RETURNED', ms: 2200 });
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!isHub() || document.hidden) return reset();
      afk = true;
      arcade.classList.add('is-afk');
      note = el('<p class="afk" aria-hidden="true">PLAYER 1...<br>ARE YOU STILL THERE?</p>');
      arcade.append(note);
    }, LIMIT);
  };
  ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart'].forEach((t) =>
    window.addEventListener(t, reset, { passive: true }));
  reset();
}

