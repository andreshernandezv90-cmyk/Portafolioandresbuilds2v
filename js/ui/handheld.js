// HANDHELD — the arcade evolves into a portable console on phones.
// Same sections, same coins/secrets, touch-first navigation.

import { machines } from '../data/machines.js';
import { profile } from '../data/profile.js';
import { store } from '../core/state.js';
import { sfx } from '../core/sound.js';
import { $, $$, esc } from '../core/dom.js';
import { coinMarkup } from './coins.js';

const ICON = { projects: '▶', profile: '☺', skills: '◆', saves: '▣', missions: '⚑', contact: '2P', broken: '✕' };

function items() {
  const list = machines.map((m, n) => {
    const broken = m.id === 'broken';
    const fixed = broken && store.hasSecret('out-of-order');
    const label = broken && fixed ? 'BUG HUNTER' : m.label;
    const sub = broken ? (fixed ? 'Minijuego' : 'Fuera de servicio') : m.sub;
    return `<li style="--n:${n}"><button type="button" class="hh-item${broken && !fixed ? ' is-broken' : ''}" data-open="${m.id}" style="--accent:${m.accent}">
      <span class="hh-item__icon" aria-hidden="true">${ICON[m.id]}</span>
      <span class="hh-item__txt"><span class="hh-item__label">${esc(label)}</span><span class="hh-item__sub">${esc(sub)}</span></span>
    </button></li>`;
  });
  if (store.allCoins()) {
    list.push(`<li><button type="button" class="hh-item" data-open="devroom" style="--accent:#ffd23f">
      <span class="hh-item__icon" aria-hidden="true">🔓</span>
      <span class="hh-item__txt"><span class="hh-item__label">DEV ROOM</span><span class="hh-item__sub">Secret room</span></span></button></li>`);
  }
  return list.join('');
}

export function mountHandheld(root, api, { dark = false } = {}) {
  if (dark) root.classList.add('is-off');
  root.innerHTML = `
  <div class="hh">
    <div class="hh__top">
      <span class="hh__led" aria-hidden="true"></span>
      <span class="hh__brand">ANDRES BUILDS <small>PORTABLE</small></span>
    </div>
    <div class="hh__screen-wrap">
      <div class="hh__screen">
        <div class="hh__head">
          <p class="hh__p1">PLAYER 1</p>
          <p class="hh__name">${esc(profile.nameUpper)}</p>
          <p class="hh__role">${esc(profile.role)} · ${esc(profile.locationShort)}</p>
          <p class="hh__tag">${esc(profile.tagline)}</p>
        </div>
        <ul class="hh__menu" role="list" aria-label="Secciones">${items()}</ul>
        <span class="crt-overlay" aria-hidden="true"></span>
      </div>
    </div>
    <div class="hh__controls">
      <div class="dpad" role="group" aria-label="D-pad">
        <button type="button" class="dpad__b dpad__up" data-pad="ArrowUp" aria-label="Arriba"></button>
        <button type="button" class="dpad__b dpad__left" data-pad="ArrowLeft" aria-label="Izquierda"></button>
        <span class="dpad__c" aria-hidden="true"></span>
        <button type="button" class="dpad__b dpad__right" data-pad="ArrowRight" aria-label="Derecha"></button>
        <button type="button" class="dpad__b dpad__down" data-pad="ArrowDown" aria-label="Abajo"></button>
      </div>
      <div class="ab">
        <button type="button" class="ab__b ab__b--b" data-pad="b" aria-label="Botón B">B</button>
        <button type="button" class="ab__b ab__b--a" data-pad="a" aria-label="Botón A: abrir">A</button>
      </div>
    </div>
    <div class="hh__pills">
      <a class="pill" href="#/quick"><span>SELECT</span><small>QUICK MODE</small></a>
      <button type="button" class="pill" data-pad="start"><span>START</span><small>PLAY</small></button>
    </div>
    <div class="hh__bottom">
      <span class="hh__speaker" aria-hidden="false">${'<i></i>'.repeat(18)}${coinMarkup('hub', 'hh-coin')}</span>
      <button type="button" class="hh__credits" data-credits>© 2026 A.B.</button>
    </div>
  </div>`;

  let sel = 0;
  const btns = () => $$('.hh-item', root);
  const select = (i) => {
    const list = btns();
    sel = (i + list.length) % list.length;
    list.forEach((b, j) => b.classList.toggle('is-sel', j === sel));
    list[sel].scrollIntoView({ block: 'nearest' });
  };
  select(0);

  root.addEventListener('click', (e) => {
    const item = e.target.closest('.hh-item');
    if (item) {
      sfx.press();
      select(btns().indexOf(item));
      return api.open(item.dataset.open, item);
    }
    const pad = e.target.closest('[data-pad]');
    if (pad) {
      const k = pad.dataset.pad;
      pad.classList.add('is-pressed');
      setTimeout(() => pad.classList.remove('is-pressed'), 120);
      api.feedKey(k);
      if (k === 'ArrowUp' || k === 'ArrowLeft') { sfx.hover(); select(sel - 1); }
      else if (k === 'ArrowDown' || k === 'ArrowRight') { sfx.hover(); select(sel + 1); }
      else if (k === 'a' || k === 'start') { sfx.press(); btns()[sel].click(); }
      else if (k === 'b') sfx.back();
    }
    if (e.target.closest('[data-credits]')) api.credits();
  });

  const refresh = () => {
    $('.hh__menu', root).innerHTML = items();
    select(Math.min(sel, btns().length - 1));
  };
  store.on((evt, id) => {
    if (evt === 'devroom-unlocked' || (evt === 'secret' && id === 'out-of-order')) refresh();
  });

  let powerTimer;
  return {
    root,
    powerOn() {
      if (!root.classList.contains('is-off')) return;
      root.classList.remove('is-off');
      if (document.documentElement.dataset.fx !== 'on' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      root.classList.add('is-powering');
      clearTimeout(powerTimer);
      powerTimer = setTimeout(() => root.classList.remove('is-powering'), 1600);
    },
    focusMachine(id) {
      const b = $(`.hh-item[data-open="${id}"]`, root);
      if (b) { select(btns().indexOf(b)); b.focus({ preventScroll: true }); }
    },
  };
}
