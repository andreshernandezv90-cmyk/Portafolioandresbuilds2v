// ACHIEVEMENTS — exploration + real career milestones. Secrets stay a mystery.

import { achievements, COIN_IDS } from '../data/achievements.js';
import { store } from '../core/state.js';
import { esc } from '../core/dom.js';

export function mount(root) {
  const render = () => {
    const st = store.get();
    const row = (a) => {
      const done = a.kind === 'career' ? !!a.unlocked : st.achievements.includes(a.id);
      const state = done ? 'UNLOCKED' : a.progress || 'LOCKED';
      return `<li class="ach${done ? ' is-done' : ''}">
        <span class="ach__icon" aria-hidden="true">${done ? '★' : a.progress ? '◈' : '☆'}</span>
        <span><span class="ach__title">${esc(a.title)}</span><span class="ach__desc">${done || a.kind === 'career' ? esc(a.desc) : '???'}</span></span>
        <span class="ach__state">${esc(state)}</span>
      </li>`;
    };
    root.innerHTML = `
      <div class="achs">
        <div class="achs__stats">
          <div class="achs__stat"><p class="kicker">COINS</p>
            <p class="achs__coins" aria-label="${st.coins.length} de ${COIN_IDS.length} monedas">${COIN_IDS.map((id) => `<span class="${st.coins.includes(id) ? 'on' : ''}"></span>`).join('')}</p>
            <p class="muted small">${st.coins.length === COIN_IDS.length ? 'SECRET DEV ROOM: ABIERTA' : 'Hay monedas escondidas por todo el arcade.'}</p>
          </div>
          <div class="achs__stat"><p class="kicker">SECRETS FOUND</p><p class="achs__big">${st.secrets.length} / ???</p><p class="muted small">Nadie sabe cuántos hay.</p></div>
        </div>
        <h2 class="kicker">EXPLORATION</h2>
        <ul class="ach-list" role="list">${achievements.filter((a) => a.kind === 'explore').map(row).join('')}</ul>
        <h2 class="kicker">CAREER</h2>
        <ul class="ach-list" role="list">${achievements.filter((a) => a.kind === 'career').map(row).join('')}</ul>
        <p class="achs__reset"><button type="button" class="linkish" data-reset>RESET PROGRESS</button></p>
      </div>`;
  };
  render();
  root.addEventListener('click', (e) => {
    if (!e.target.closest('[data-reset]')) return;
    if (!window.confirm('¿Borrar monedas, secretos y achievements de este navegador?')) return;
    store.reset();
    location.hash = '#/';
    location.reload();
  });
}
