// HUD — discreet status bar: P1, coins, achievements, secrets, FX, sound, Quick Mode.

import { store } from '../core/state.js';
import { $, el } from '../core/dom.js';
import { COIN_IDS } from '../data/achievements.js';

export function mountHud({ onPlayerOne, onToggle, go }) {
  const s = store.get();
  const node = el(`
    <header class="hud" id="hud" aria-label="Estado del jugador">
      <div class="hud__group">
        <button type="button" class="hud__item hud__p1" data-p1 aria-label="PLAYER 1">P<span class="hud__label">LAYER&nbsp;</span>1</button>
        <span class="hud__sep" aria-hidden="true"></span>
        <span class="hud__item" data-coins title="Monedas">
          <span class="hud__coin" aria-hidden="true"></span><span class="hud__label">COINS</span>
          <span class="hud__val"><span data-coin-n>${s.coins.length}</span> / ${COIN_IDS.length}</span>
          <span class="sr-only">monedas</span>
        </span>
        <button type="button" class="hud__item" data-ach aria-label="Ver achievements">
          <span aria-hidden="true">★</span><span class="hud__label">ACHIEVEMENTS</span>
          <span class="hud__val" data-ach-n>${s.achievements.length}</span>
        </button>
        <span class="hud__item" data-secrets>
          <span aria-hidden="true">?</span><span class="hud__label">SECRETS FOUND</span>
          <span class="hud__val"><span data-sec-n>${s.secrets.length}</span> / ???</span>
          <span class="sr-only">secretos encontrados</span>
        </span>
      </div>
      <div class="hud__group hud__group--right">
        <button type="button" class="hud__item hud__dev hud__toggle" data-toggle="dev" aria-pressed="false">
          <span class="hud__label">DEV</span><span class="hud__state" aria-hidden="true">MODE</span>
        </button>
        <button type="button" class="hud__item hud__toggle" data-toggle="fx" aria-pressed="${s.settings.fx}">
          FX <span class="hud__state">${s.settings.fx ? 'ON' : 'OFF'}</span>
        </button>
        <button type="button" class="hud__item hud__toggle" data-toggle="sound" aria-pressed="${s.settings.sound}">
          <span class="hud__label">SOUND</span><span class="hud__icon" aria-hidden="true">♪</span> <span class="hud__state">${s.settings.sound ? 'ON' : 'OFF'}</span>
        </button>
        <a class="hud__item hud__quick" href="#/quick" data-quick>QUICK<span class="hud__label">&nbsp;MODE</span></a>
      </div>
    </header>`);

  node.addEventListener('click', (e) => {
    if (e.target.closest('[data-p1]')) {
      const b = e.target.closest('[data-p1]');
      b.classList.remove('is-tapped'); void b.offsetWidth; b.classList.add('is-tapped');
      onPlayerOne();
    }
    if (e.target.closest('[data-ach]')) go('achievements');
    const t = e.target.closest('[data-toggle]');
    if (t) onToggle(t.dataset.toggle);
  });

  const bump = (sel) => {
    const item = $(sel, node);
    item.classList.remove('is-bump'); void item.offsetWidth; item.classList.add('is-bump');
  };

  store.on((evt, _p, st) => {
    if (evt === 'coin') { $('[data-coin-n]', node).textContent = st.coins.length; bump('[data-coins]'); }
    if (evt === 'achievement') { $('[data-ach-n]', node).textContent = st.achievements.length; bump('[data-ach]'); }
    if (evt === 'secret') { $('[data-sec-n]', node).textContent = st.secrets.length; bump('[data-secrets]'); }
  });

  return {
    node,
    setToggle(key, on) {
      const b = $(`[data-toggle="${key}"]`, node);
      if (!b) return;
      b.setAttribute('aria-pressed', String(on));
      const st = $('.hud__state', b);
      if (key !== 'dev') st.textContent = on ? 'ON' : 'OFF';
    },
  };
}
