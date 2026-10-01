// ARCADE HUB — the room, its cabinets and their attract screens.

import { machines } from '../data/machines.js';
import { projects, LOCKED_SLOTS } from '../data/projects.js';
import { saveFiles } from '../data/story.js';
import { devComments } from '../data/profile.js';
import { store } from '../core/state.js';
import { sfx } from '../core/sound.js';
import { $, $$, el, esc, fxOn, prefersReducedMotion } from '../core/dom.js';
import { coinMarkup } from './coins.js';

// ───────────── attract-mode content per machine ─────────────
const attract = {
  projects: () => {
    const list = projects
      .slice(0, 2)
      .map((p) => `<span>${esc(p.slot.replace('GAME ', ''))} ${esc(p.title.split(' ').slice(-2).join(' ').toUpperCase())}</span>`)
      .join('');
    const locked = Array.from({ length: LOCKED_SLOTS }, (_, i) => `<span>0${projects.length + i + 1} ???</span>`).join('');
    return `<span class="att">
      <span class="att-cart" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="hl">SELECT GAME</span>
      <span class="att-list att-cycle">${list}${locked}</span>
    </span>`;
  },
  profile: () => `<span class="att">
      <span class="hl">PLAYER 01</span>
      <span class="att-avatar" aria-hidden="true"><b>?</b><i class="att-scan"></i></span>
      <span class="att-stat"><span>CLASS</span><span>CWD</span></span>
      <span class="att-bars"><i></i><i></i><i></i><i></i><i></i></span>
    </span>`,
  skills: () => {
    const nodes = [[50, 90], [20, 60], [50, 55], [80, 60], [12, 25], [32, 22], [50, 20], [72, 25], [90, 22]];
    const links = [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 6], [3, 7], [3, 8]];
    const lines = links.map(([a, b], i) =>
      `<line pathLength="1" style="--i:${i}" x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}"/>`).join('');
    const dots = nodes.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="4.5" ${[5, 6].includes(i) ? 'class="pulse"' : ''}/>`).join('');
    return `<span class="att"><svg class="att-tree" viewBox="0 0 100 100" aria-hidden="true">${lines}${dots}</svg><span class="hl">◆ ◈ ◇</span></span>`;
  },
  saves: () => {
    const rows = saveFiles
      .map((s) => `<span class="${s.current ? 'on' : ''}">${s.current ? '▶' : '&nbsp;'} FILE ${esc(s.id)} ${esc(s.stamp)}</span>`)
      .join('');
    return `<span class="att"><span class="hl">LOAD GAME?</span><span class="att-list">${rows}</span><span class="att-blink">CONTINUE</span></span>`;
  },
  missions: () =>
    `<span class="att"><span class="att-radar" aria-hidden="true"><i style="--x:30%;--y:28%"></i><i style="--x:64%;--y:58%"></i><i style="--x:40%;--y:70%"></i></span><span class="hl">SELECT MISSION</span></span>`,
  contact: () =>
    `<span class="att">
      <span class="att-players" aria-hidden="true"><i class="p1"></i><i class="p2"></i></span>
      <span class="hl att-big">PLAYER 2</span>
      <span class="att-blink">PRESS START</span>
    </span>`,
  broken: () => `
    <span class="att-static" aria-hidden="true"></span>
    <svg class="att-crack" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M62 0 L55 30 L68 42 L50 64 L58 100 M55 30 L35 38 M68 42 L92 50" fill="none" stroke="#fff" stroke-width="1"/></svg>
    <span class="att att-bug"><span class="hl">BUG HUNTER</span><span class="att-big">&lt;/&gt;</span><span class="att-blink">PLAY</span></span>`,
};

function deck(m) {
  if (m.model === 'terminal') return `<span class="keys">${'<i></i>'.repeat(27)}</span>`;
  const btns = `<span class="btns" data-n="${m.buttons}">${'<i></i>'.repeat(m.buttons)}</span>`;
  const joy = '<span class="joy"><span class="joy__stick"></span></span>';
  if (m.model === 'twin') return `${joy}${btns}${joy}<span class="badge-2p">2P</span>`;
  return `${joy}${btns}`;
}

function kick(m) {
  const door = m.id === 'saves'
    ? '<span class="memslot"></span><span class="coin-door coin-door--one"><i></i></span>'
    : '<span class="coin-door"><i></i><i></i></span>';
  const label = { saves: 'MEMORY CARD', contact: '2 PLAYERS', broken: 'OUT OF ORDER' }[m.id] || 'INSERT COIN';
  return `${door}<span class="cab__kick-label">${label}</span>`;
}

function cabinet(m, i, total) {
  const center = (total - 1) / 2;
  const dist = i - center;
  const side = dist < -0.1 ? 'right' : dist > 0.1 ? 'left' : 'none';
  const sideW = `calc(var(--u) * ${(0.5 + Math.abs(dist) * 0.55).toFixed(2)})`;
  const broken = m.model === 'broken';
  const fixed = broken && store.hasSecret('out-of-order');
  const label = broken ? 'OUT OF ORDER: máquina fuera de servicio' : `${m.label}: ${m.sub}`;

  return `
  <li class="cab-slot${fixed ? ' is-fixed' : ''}" data-machine="${m.id}" data-model="${m.model}" data-side="${side}"
      style="--accent:${m.accent};--trim:${m.trim};--side-w:${side === 'none' ? '0px' : sideW};--i:${i}">
    <span class="cab-reflect" aria-hidden="true"></span>
    <span class="floor-glow" aria-hidden="true"></span>
    <button class="cab" type="button" data-open="${m.id}" aria-label="${esc(label)}">
      <span class="cab__side" aria-hidden="true"></span>
      <span class="cab__body" aria-hidden="true">
        <span class="cab__cap"></span>
        <span class="cab__marquee"><span class="cab__marquee-light"></span><span class="cab__marquee-text">${esc(m.label)}</span></span>
        <span class="cab__bezel">
          <span class="cab__speaker"></span>
          <span class="cab__screen">
            <span class="cab__content">${attract[m.id]?.() || ''}</span>
            ${broken ? '<span class="tape">OUT OF ORDER</span><span class="tape tape--2"></span>' : ''}
            <span class="cab__glass"></span>
          </span>
        </span>
        <span class="cab__deck"><span class="cab__spill"></span>${deck(m)}</span>
        <span class="cab__kick">${kick(m)}</span>
        <span class="cab__base"></span>
      </span>
    </button>
    ${broken ? '<svg class="unplugged" viewBox="0 0 60 20" aria-hidden="true"><path d="M0 18 C20 18 25 6 44 12" fill="none" stroke="#1a1820" stroke-width="3"/><rect x="44" y="8" width="10" height="7" rx="1" fill="#2c2a33"/><path d="M54 10h5M54 13h5" stroke="#8a8a90" stroke-width="1.5"/></svg>' : ''}
    ${m.id === 'broken' ? coinMarkup('hub', 'hub-coin') : ''}
    <span class="cab-plate" aria-hidden="true">${esc(m.sub)}</span>
  </li>`;
}

const LAMPS = [18, 50, 82];
// deterministic "random" dust so the room looks the same on every load
const DUST = Array.from({ length: 22 }, (_, i) => {
  const lamp = LAMPS[i % LAMPS.length];
  const r = (n) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return { x: lamp + (r(1) - 0.5) * 16, y: 14 + r(2) * 48, s: 1 + r(3) * 2.2, d: 9 + r(4) * 10, delay: -r(5) * 18 };
});

function roomMarkup() {
  const wallSpots = machines.map((m) => `<span class="wall__spot" data-spot="${m.id}" style="--accent:${m.accent}"></span>`).join('');
  const devOpen = store.allCoins();
  const neon = 'ANDRES BUILDS'.split('').map((c, i) => c === ' ' ? '<span class="neon__gap"> </span>' : `<span style="--i:${i}">${c}</span>`).join('');
  return `
  <div class="room" id="room">
    <div class="wall layer">
      ${wallSpots}
      <div class="neon">
        <div class="neon__plate">
          <span class="neon__screw"></span><span class="neon__screw"></span><span class="neon__screw"></span><span class="neon__screw"></span>
          <p class="neon__sign" aria-hidden="true">${neon}</p>
        </div>
        <div class="led-board"><p><span>I BUILD THINGS FOR THE WEB.</span></p></div>
      </div>
      <div class="poster poster--bbfr" aria-hidden="true">
        <span>BUILD</span><span>BREAK</span><span>FIX</span><span>REPEAT</span><small>A.B. ARCADE · GDL</small>
      </div>
      <div class="scoreboard" aria-hidden="true">
        <h2>HIGH SCORES</h2>
        <ol><li><span>1ST</span><span>P1</span><span>BUILDING...</span></li><li><span>2ND</span><span>P2</span><span>???</span></li><li><span>3RD</span><span>YOU?</span><span>—</span></li></ol>
      </div>
      <div class="poster poster--gdl" aria-hidden="true"><span><b>GDL</b>GUADALAJARA<br>MÉXICO</span></div>
      <div class="sign-small" aria-hidden="true">PLEASE<br>NO DRINKS<br>ON CABINETS</div>
      <button class="door${devOpen ? ' is-open' : ''}" type="button" data-door
        aria-label="${devOpen ? "Entrar a ANDRÉS' DEV ROOM" : 'Puerta STAFF ONLY: cerrada. Encuentra las 5 monedas.'}">
        <span class="door__window"></span>
        <span class="door__plate">STAFF ONLY</span>
        <span class="door__lock" aria-hidden="true">${devOpen ? '🔓' : '🔒'}</span>
        <span class="door__hint">${devOpen ? 'DEV ROOM' : 'COINS<br>5 / 5'}</span>
        <span class="door__knob" aria-hidden="true"></span>
      </button>
      <p class="dev-note dev-note--hub">${esc(devComments.hub)}</p>
    </div>
    <div class="ceiling layer" aria-hidden="true">
      <span class="ceiling__rail"></span>
      ${LAMPS.map((x, i) => `<span class="fixture" style="left:${x}%;--i:${i}"><i></i></span>`).join('')}
    </div>
    <div class="beams" aria-hidden="true">
      ${LAMPS.map((x, i) => `<span class="beam" style="left:${x}%;--i:${i}"></span>`).join('')}
    </div>
    <div class="floor" aria-hidden="true"></div>
    <div class="floor-pools" aria-hidden="true">
      ${LAMPS.map((x, i) => `<span class="pool" style="left:${x}%;--i:${i}"></span>`).join('')}
    </div>
    <div class="floor-shade" aria-hidden="true"></div>
    <svg class="cables" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M120 0 C140 40 220 50 260 90"/><path d="M430 0 C420 30 470 60 455 95"/>
      <path d="M700 0 C730 50 640 60 690 100"/><path d="M880 0 C900 40 860 70 905 100"/>
    </svg>
    <div class="dust" aria-hidden="true">
      ${DUST.map((p) => `<i style="left:${p.x.toFixed(1)}%;top:${p.y.toFixed(1)}%;--s:${p.s.toFixed(1)}px;--d:${p.d.toFixed(1)}s;animation-delay:${p.delay.toFixed(1)}s"></i>`).join('')}
    </div>
    <ul class="cabinets layer" role="list" aria-label="Máquinas del arcade">
      ${machines.map((m, i) => cabinet(m, i, machines.length)).join('')}
    </ul>
    <div class="foreground layer" aria-hidden="true">
      <svg class="stool stool--l" viewBox="0 0 120 80"><ellipse cx="60" cy="16" rx="52" ry="14"/><rect x="54" y="20" width="12" height="70"/><rect x="20" y="58" width="80" height="6" rx="3"/></svg>
      <svg class="stool stool--r" viewBox="0 0 120 80"><ellipse cx="60" cy="16" rx="52" ry="14"/><rect x="54" y="20" width="12" height="70"/><rect x="20" y="58" width="80" height="6" rx="3"/></svg>
    </div>
    <div class="vignette" aria-hidden="true"></div>
    <div class="darkness" aria-hidden="true"></div>
  </div>
  <button class="hub-credits" type="button" data-credits>© 2026 ANDRES BUILDS</button>
  <p class="hub-hint" aria-hidden="true"><kbd>←</kbd> <kbd>→</kbd> MOVE · <kbd>ENTER</kbd> PLAY · <kbd>Q</kbd> QUICK MODE</p>`;
}

// ───────────── Out of Order: insist to fix it ─────────────
const BROKEN_LINES = ['OUT OF ORDER.', 'SERIOUSLY.', 'STOP.', '...', 'FINE.'];
let brokenHits = 0;
let brokenTimer;

function pokeBroken(slot, api) {
  if (slot.classList.contains('is-fixed')) return api.open('broken', slot);
  const line = BROKEN_LINES[Math.min(brokenHits, BROKEN_LINES.length - 1)];
  brokenHits++;
  $('.broken-msg', slot)?.remove();
  slot.append(el(`<span class="broken-msg" role="status">${line}</span>`));
  slot.classList.remove('is-shaking');
  void slot.offsetWidth;
  slot.classList.add('is-shaking');
  clearTimeout(brokenTimer);
  if (brokenHits < BROKEN_LINES.length) {
    sfx.error();
    brokenTimer = setTimeout(() => $('.broken-msg', slot)?.remove(), 1800);
    return;
  }
  // FINE. → power on
  sfx.powerOn();
  slot.classList.add('is-fixed', 'is-booting');
  store.addSecret('out-of-order');
  $('.cab', slot).setAttribute('aria-label', 'BUG HUNTER: minijuego desbloqueado');
  brokenTimer = setTimeout(() => {
    $('.broken-msg', slot)?.remove();
    slot.classList.remove('is-booting');
    api.open('broken', slot);
  }, 1300);
}

// ───────────── mount ─────────────
export function mountHub(root, api, { dark = false } = {}) {
  root.insertAdjacentHTML('beforeend', roomMarkup());
  const room = $('#room', root);
  const slots = $$('.cab-slot', root);
  const spots = Object.fromEntries($$('.wall__spot', root).map((s) => [s.dataset.spot, s]));
  const animate = () => fxOn() && !prefersReducedMotion();
  if (dark) root.classList.add('is-off');

  // position wall light spots behind their cabinets
  const placeSpots = () => {
    const rb = room.getBoundingClientRect();
    if (!rb.width) return;
    slots.forEach((s) => {
      const r = s.getBoundingClientRect();
      const spot = spots[s.dataset.machine];
      if (spot) spot.style.left = `${(((r.left + r.width / 2 - rb.left) / rb.width + 0.03) / 1.06) * 100}%`;
    });
  };
  requestAnimationFrame(placeSpots);
  window.addEventListener('resize', placeSpots);
  document.fonts?.ready.then(placeSpots);

  // one source of truth for "lit" cabinets: hovered OR focused
  let hovered = null;
  let focused = null;
  const sync = (slot) => {
    if (!slot) return;
    const on = slot === hovered || slot === focused;
    slot.classList.toggle('is-hot', on);
    spots[slot.dataset.machine]?.classList.toggle('is-hot', on);
  };

  slots.forEach((slot) => {
    const btn = $('.cab', slot);
    let tiltRaf = 0;
    btn.addEventListener('pointerenter', (e) => {
      const prev = hovered;
      hovered = slot;
      sync(prev); sync(slot);
      if (e.pointerType === 'mouse') sfx.hover();
    });
    btn.addEventListener('pointerleave', () => {
      if (hovered === slot) hovered = null;
      sync(slot);
      slot.classList.remove('is-pressing');
      slot.style.setProperty('--rx', '0deg');
      slot.style.setProperty('--ry', '0deg');
    });
    // gentle 3D tilt toward the pointer
    btn.addEventListener('pointermove', (e) => {
      if (!animate() || e.pointerType !== 'mouse' || tiltRaf) return;
      tiltRaf = requestAnimationFrame(() => {
        tiltRaf = 0;
        const r = btn.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        slot.style.setProperty('--ry', `${(px * 9).toFixed(2)}deg`);
        slot.style.setProperty('--rx', `${(-py * 5).toFixed(2)}deg`);
      });
    });
    btn.addEventListener('focus', () => { const prev = focused; focused = slot; sync(prev); sync(slot); });
    btn.addEventListener('blur', () => { if (focused === slot) focused = null; sync(slot); });
    btn.addEventListener('pointerdown', () => slot.classList.add('is-pressing'));
    btn.addEventListener('pointerup', () => slot.classList.remove('is-pressing'));
    btn.addEventListener('click', () => {
      sfx.press();
      if (slot.dataset.machine === 'broken') return pokeBroken(slot, api);
      api.open(slot.dataset.machine, slot);
    });
  });

  // keyboard: arrows move between cabinets
  $('.cabinets', root).addEventListener('keydown', (e) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    const btns = $$('.cab', root);
    const i = btns.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? btns.length - 1
      : (i + (e.key === 'ArrowRight' ? 1 : -1) + btns.length) % btns.length;
    btns[next].focus();
    sfx.hover();
  });

  // door → dev room
  $('[data-door]', root).addEventListener('click', (e) => {
    if (store.allCoins()) return api.open('devroom', e.currentTarget);
    sfx.error();
    api.toast({ kind: 'info', title: 'STAFF ONLY', text: `Necesitas 5 monedas. Tienes ${store.get().coins.length}.` });
  });

  $('[data-credits]', root).addEventListener('click', () => api.credits());

  // parallax (pointer), throttled to animation frames
  let raf = 0;
  root.addEventListener('pointermove', (e) => {
    if (!animate() || raf || root.classList.contains('is-zoomed')) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      room.style.setProperty('--mx', ((e.clientX / innerWidth - 0.5) * 2).toFixed(3));
      room.style.setProperty('--my', ((e.clientY / innerHeight - 0.5) * 2).toFixed(3));
    });
  });

  store.on((evt) => {
    if (evt === 'devroom-unlocked') {
      const door = $('[data-door]', root);
      door.classList.add('is-open');
      door.setAttribute('aria-label', "Entrar a ANDRÉS' DEV ROOM");
      $('.door__lock', door).textContent = '🔓';
      $('.door__hint', door).textContent = 'DEV ROOM';
    }
  });

  let powerTimer;
  return {
    root,
    room,
    // lights on: lamps → neon → LED board → cabinets, left to right
    powerOn() {
      if (!root.classList.contains('is-off')) return;
      root.classList.remove('is-off');
      if (!animate()) return;
      root.classList.add('is-powering');
      clearTimeout(powerTimer);
      powerTimer = setTimeout(() => root.classList.remove('is-powering'), 2800);
    },
    // zoom the camera into a cabinet's screen
    zoomTo(slot) {
      const target = slot ? $('.cab__screen', slot) || slot : null;
      if (!target) return;
      const rb = room.getBoundingClientRect();
      const r = target.getBoundingClientRect();
      const ox = r.left + r.width / 2 - rb.left;
      const oy = r.top + r.height / 2 - rb.top;
      room.style.transformOrigin = `${ox}px ${oy}px`;
      const scale = Math.min(innerWidth / r.width, innerHeight / r.height) * 0.92;
      room.style.transform = `scale(${scale.toFixed(2)})`;
    },
    zoomOut() {
      room.style.transform = '';
    },
    focusMachine(id) {
      $(`.cab-slot[data-machine="${id}"] .cab`, root)?.focus({ preventScroll: true });
    },
  };
}
