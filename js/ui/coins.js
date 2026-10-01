// Hidden coins (collectibles). Any element rendered with coinMarkup()
// becomes collectible through one delegated click handler.

import { store } from '../core/state.js';
import { sfx } from '../core/sound.js';
import { $$ } from '../core/dom.js';
import { COIN_IDS } from '../data/achievements.js';

export function coinMarkup(id, extraClass = '') {
  if (store.hasCoin(id)) return '';
  return `<button type="button" class="coin ${extraClass}" data-coin="${id}" aria-label="Moneda escondida"><span class="coin__face" aria-hidden="true">AB</span></button>`;
}

export function initCoins() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-coin]');
    if (!btn) return;
    e.stopPropagation();
    const id = btn.dataset.coin;
    if (!store.addCoin(id)) return;
    sfx.coin();
    // remove every copy of that coin (desktop room + handheld)
    $$(`[data-coin="${id}"]`).forEach((c) => {
      c.classList.add('is-collected');
      c.setAttribute('aria-hidden', 'true');
      c.tabIndex = -1;
      setTimeout(() => c.remove(), 650);
    });
  }, true);
}

export const coinTotal = COIN_IDS.length;
