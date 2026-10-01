// SCREEN — full-view "inside the cabinet" panel. Panels are loaded on
// demand (code-split) and transition with a camera zoom + CRT power-on.

import { machines, machineById } from '../data/machines.js';
import { store } from '../core/state.js';
import { sfx } from '../core/sound.js';
import { $, el, esc, motionWait, isHandheld, fxOn, prefersReducedMotion } from '../core/dom.js';

const loaders = {
  projects: () => import('../panels/projects.js'),
  profile: () => import('../panels/profile.js'),
  skills: () => import('../panels/skills.js'),
  saves: () => import('../panels/saves.js'),
  missions: () => import('../panels/missions.js'),
  contact: () => import('../panels/contact.js'),
  bughunter: () => import('../panels/bughunter.js'),
  devroom: () => import('../panels/devroom.js'),
  achievements: () => import('../panels/achievements.js'),
};

// Sections reachable with PREV / NEXT inside the screen.
const ORDER = machines.filter((m) => m.id !== 'broken').map((m) => m.id);

export function createScreen({ layer, ctx, hub, handheld, background }) {
  let current = null;
  let cleanup = null;
  let token = 0;

  const animate = () => fxOn() && !prefersReducedMotion();

  function frame(m) {
    const i = ORDER.indexOf(m.id);
    const nav = i >= 0
      ? `<nav class="screen__nav" aria-label="Otras máquinas">
          <button type="button" class="screen__navbtn" data-go="${ORDER[(i - 1 + ORDER.length) % ORDER.length]}">◀ ${esc(machineById(ORDER[(i - 1 + ORDER.length) % ORDER.length]).label)}</button>
          <button type="button" class="screen__navbtn" data-go="hub">▲ ARCADE</button>
          <button type="button" class="screen__navbtn" data-go="${ORDER[(i + 1) % ORDER.length]}">${esc(machineById(ORDER[(i + 1) % ORDER.length]).label)} ▶</button>
        </nav>`
      : `<nav class="screen__nav"><button type="button" class="screen__navbtn" data-go="hub">▲ BACK TO ARCADE</button></nav>`;
    const title = m.id === 'broken' ? 'BUG HUNTER' : m.label;
    return el(`
      <section class="screen" style="--accent:${m.accent || '#ffd23f'}" aria-labelledby="screen-title" data-screen="${m.id}">
        <div class="screen__crt">
          <header class="screen__bar">
            <button type="button" class="screen__back" data-go="hub"><span aria-hidden="true">◀</span> ARCADE <kbd>ESC</kbd></button>
            <h1 class="screen__title" id="screen-title" tabindex="-1">${esc(title)}</h1>
            <span class="screen__meta" aria-hidden="true">CREDIT 01</span>
          </header>
          <div class="screen__body"></div>
          ${nav}
          <span class="crt-overlay" aria-hidden="true"></span>
        </div>
      </section>`);
  }

  async function open(id, origin) {
    const m = machineById(id);
    const load = loaders[m?.panel];
    if (!load) return false;
    const my = ++token;
    const switching = !!current;
    const modP = load();

    if (!switching && animate()) {
      if (!isHandheld()) {
        background.classList.add('is-zoomed');
        hub.zoomTo(origin?.closest?.('.cab-slot') || origin);
        await motionWait(560);
      }
    }
    let mod;
    try {
      mod = await modP;
    } catch (err) {
      console.error(err);
      ctx.toast({ kind: 'info', title: 'CARTRIDGE ERROR', text: 'No se pudo cargar esta sección. Intenta de nuevo.' });
      close(true);
      return false;
    }
    if (my !== token) return false;

    cleanup?.();
    cleanup = null;
    const node = frame(m);
    if (switching && animate()) {
      layer.classList.add('is-switching');
      await motionWait(160);
      layer.classList.remove('is-switching');
    }
    layer.replaceChildren(node);
    layer.hidden = false;
    [hub.root, handheld.root].forEach((r) => r.setAttribute('inert', ''));
    layer.classList.toggle('is-on', animate() && !switching);

    current = m.id;
    cleanup = mod.mount($('.screen__body', node), ctx) || null;
    store.visit(m.id);
    if (!switching) sfx.powerOn();
    $('#screen-title', node).focus({ preventScroll: true });
    document.title = `${m.id === 'broken' ? 'BUG HUNTER' : m.label} · ANDRES BUILDS`;
    return true;
  }

  async function close(instant = false) {
    if (!current) return;
    const was = current;
    current = null;
    token++;
    if (!instant && animate()) {
      layer.classList.remove('is-on');
      layer.classList.add('is-off');
      await motionWait(320);
      layer.classList.remove('is-off');
    }
    cleanup?.();
    cleanup = null;
    layer.hidden = true;
    layer.replaceChildren();
    [hub.root, handheld.root].forEach((r) => r.removeAttribute('inert'));
    hub.zoomOut();
    background.classList.remove('is-zoomed');
    document.title = 'ANDRES BUILDS · Andrés Hernández — Creative Web Developer';
    const focusId = machineById(was)?.panel === 'bughunter' ? 'broken' : was;
    if (isHandheld()) handheld.focusMachine(focusId);
    else hub.focusMachine(focusId);
  }

  layer.addEventListener('click', (e) => {
    const go = e.target.closest('[data-go]');
    if (!go) return;
    sfx.back();
    ctx.go(go.dataset.go);
  });

  return { open, close, get current() { return current; } };
}
