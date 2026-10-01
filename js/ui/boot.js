// BOOT → TITLE → INSERT COIN → PRESS START.
// Fast on purpose: any key skips the log, returning players skip it entirely.

import { profile } from '../data/profile.js';
import { projects } from '../data/projects.js';
import { store } from '../core/state.js';
import { sfx } from '../core/sound.js';
import { $, el, esc, motionWait, fxOn, prefersReducedMotion } from '../core/dom.js';

const LOG = [
  ['BOOTING...', ''],
  ['A.B. ARCADE SYSTEM', 'v3'],
  ['LOADING PLAYER DATA...', 'OK'],
  ['CHECKING CARTRIDGES...', `${projects.length} FOUND`],
  ['SYSTEM READY', ''],
];

export function runBoot({ onStart }) {
  const quick = !fxOn() || prefersReducedMotion();
  const node = el(`
    <div class="boot${quick ? '' : ' is-powering'}" id="boot" role="region" aria-label="Pantalla de inicio">
      <div class="boot__tube">
        <pre class="boot__log" aria-live="polite"></pre>
        <span class="crt-overlay" aria-hidden="true"></span>
      </div>
      <p class="boot__corner boot__corner--l" aria-hidden="true">© 2026 ANDRES BUILDS</p>
      <div class="boot__corner boot__corner--r">
        <button type="button" data-skip>SKIP ▸▸</button>
        <a class="quick" href="#/quick">QUICK MODE</a>
      </div>
    </div>`);
  document.body.append(node);

  const log = $('.boot__log', node);
  const tube = $('.boot__tube', node);
  let stage = 'log';
  let credit = false;
  let skipLog = store.get().booted || quick;

  const renderLog = (n, cursor) => {
    log.innerHTML = LOG.slice(0, n)
      .map(([a, b]) => `${esc(a)}${b ? ` <span class="ok">${esc(b)}</span>` : ''}`)
      .join('\n') + (cursor ? '\n<span class="cursor"></span>' : '');
  };

  async function playLog() {
    await motionWait(500);
    for (let i = 1; i <= LOG.length; i++) {
      if (skipLog) break;
      renderLog(i, true);
      await motionWait(i === LOG.length ? 380 : 260);
    }
    showTitle();
  }

  function showTitle() {
    if (stage !== 'log') return;
    stage = 'title';
    log.remove();
    $('[data-skip]', node).remove();
    tube.insertAdjacentHTML('afterbegin', `
      <div class="boot__title">
        <h1 class="boot__brand">ANDRES <span>BUILDS</span></h1>
        <p class="boot__tagline">${esc(profile.tagline)}</p>
        <div class="boot__player">
          <p class="p1">PLAYER 1</p>
          <p>${esc(profile.nameUpper)}</p>
          <p class="role">${esc(profile.role.toUpperCase())}</p>
        </div>
        <div class="boot__cta">
          <div class="boot__slot" aria-hidden="true"><span class="boot__drop"></span><span class="boot__slot-plate"></span></div>
          <button type="button" class="arc-btn boot__coin-btn" data-coin-btn><span class="blink-txt">INSERT COIN</span></button>
          <p class="boot__credit" aria-live="polite">CREDIT 00</p>
        </div>
      </div>`);
    $('[data-coin-btn]', node).focus();
  }

  async function insertCoin() {
    if (credit) return start();
    credit = true;
    sfx.prime();
    const slot = $('.boot__slot', node);
    const btn = $('[data-coin-btn]', node);
    slot.classList.add('is-dropping');
    sfx.coin();
    await motionWait(500);
    slot.classList.add('is-lit');
    $('.boot__credit', node).textContent = 'CREDIT 01';
    btn.innerHTML = '<span class="blink-txt">PRESS START</span>';
    btn.style.setProperty('--btn', 'var(--c-green)');
    btn.focus();
  }

  async function start() {
    if (stage === 'done') return;
    stage = 'done';
    sfx.press();
    store.markBooted();
    document.removeEventListener('keydown', onKey);
    node.classList.add('is-leaving');
    onStart();
    await motionWait(480);
    node.remove();
  }

  function onKey(e) {
    if (stage === 'log') {
      skipLog = true;
      showTitle();
      e.preventDefault();
    }
  }

  node.addEventListener('click', (e) => {
    if (e.target.closest('[data-skip]')) { skipLog = true; showTitle(); return; }
    if (e.target.closest('[data-coin-btn]')) { insertCoin(); return; }
    if (stage === 'log' && !e.target.closest('a')) { skipLog = true; showTitle(); }
  });
  document.addEventListener('keydown', onKey);

  playLog();

  return {
    destroy() {
      document.removeEventListener('keydown', onKey);
      node.remove();
    },
  };
}
