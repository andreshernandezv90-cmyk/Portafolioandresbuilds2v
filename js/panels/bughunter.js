// BUG HUNTER — a few-seconds minigame hidden in the OUT OF ORDER machine.
// Player: </>   Enemies: bugs.   Goal: fix 12 bugs. No game over, ever.

import { store } from '../core/state.js';
import { sfx } from '../core/sound.js';
import { $ } from '../core/dom.js';

const W = 320;
const H = 220;
const GOAL = 12;
const BUG = [
  '..x...x..',
  '...x.x...',
  '.xxxxxxx.',
  'xx.xxx.xx',
  'xxxxxxxxx',
  'x.xxxxx.x',
  'x.x...x.x',
];

export function mount(root) {
  root.innerHTML = `
    <div class="bh">
      <div class="bh__hud pixel" aria-live="polite">
        <span>FIXED <b data-fixed>0</b> / ${GOAL}</span>
        <span>TIME <b data-time>0.0</b>s</span>
        <span>IN PROD <b data-prod>0</b></span>
      </div>
      <div class="bh__stage">
        <canvas class="bh__canvas" width="${W}" height="${H}" aria-label="Minijuego Bug Hunter"></canvas>
        <div class="bh__msg">
          <p class="pixel bh__title">BUG HUNTER</p>
          <p>Elimina ${GOAL} bugs antes de que lleguen a producción.</p>
          <p class="muted small">← → o A / D para moverte · disparo automático · en touch, arrastra o usa los botones</p>
          <button type="button" class="arc-btn" data-start style="--btn:var(--c-green)">PRESS START</button>
        </div>
      </div>
      <div class="bh__pad">
        <button type="button" class="arc-btn arc-btn--ghost" data-hold="-1" aria-label="Mover a la izquierda">◀</button>
        <button type="button" class="arc-btn arc-btn--ghost" data-hold="1" aria-label="Mover a la derecha">▶</button>
      </div>
    </div>`;

  const canvas = $('canvas', root);
  const g = canvas.getContext('2d');
  const msg = $('.bh__msg', root);
  const ui = { fixed: $('[data-fixed]', root), time: $('[data-time]', root), prod: $('[data-prod]', root) };

  let s;
  let raf = 0;
  let last = 0;
  let running = false;
  const keys = { l: false, r: false };
  let hold = 0;
  let pointerX = null;

  const reset = () => {
    s = { x: W / 2, bullets: [], bugs: [], sparks: [], fixed: 0, prod: 0, t: 0, fireT: 0, spawnT: 0 };
  };

  function spawn() {
    s.bugs.push({ x: 14 + Math.random() * (W - 28), y: -10, vy: 26 + Math.random() * 22 + s.fixed * 1.5, ph: Math.random() * 6, amp: 10 + Math.random() * 18, bx: 0 });
    s.bugs[s.bugs.length - 1].bx = s.bugs[s.bugs.length - 1].x;
  }

  function step(dt) {
    s.t += dt;
    const dir = (keys.r ? 1 : 0) - (keys.l ? 1 : 0) + hold;
    if (pointerX !== null) s.x += Math.max(-1, Math.min(1, (pointerX - s.x) / 6)) * 190 * dt;
    else s.x += dir * 170 * dt;
    s.x = Math.max(14, Math.min(W - 14, s.x));

    s.fireT -= dt;
    if (s.fireT <= 0) { s.bullets.push({ x: s.x, y: H - 26 }); s.fireT = 0.24; sfx.shoot(); }
    s.spawnT -= dt;
    if (s.spawnT <= 0) { spawn(); s.spawnT = Math.max(0.35, 0.85 - s.fixed * 0.04); }

    s.bullets.forEach((b) => (b.y -= 230 * dt));
    s.bullets = s.bullets.filter((b) => b.y > -6);
    s.bugs.forEach((b) => { b.y += b.vy * dt; b.x = b.bx + Math.sin(s.t * 2 + b.ph) * b.amp; });

    for (const b of s.bugs) {
      for (const p of s.bullets) {
        if (!b.dead && Math.abs(p.x - b.x) < 9 && Math.abs(p.y - b.y) < 8) {
          b.dead = true; p.y = -99; s.fixed++; sfx.hit();
          for (let i = 0; i < 8; i++) s.sparks.push({ x: b.x, y: b.y, vx: (Math.random() - 0.5) * 120, vy: (Math.random() - 0.5) * 120, life: 0.4 });
        }
      }
      if (!b.dead && b.y > H - 8) { b.dead = true; s.prod++; }
    }
    s.bugs = s.bugs.filter((b) => !b.dead);
    s.sparks.forEach((p) => { p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; });
    s.sparks = s.sparks.filter((p) => p.life > 0);

    ui.fixed.textContent = s.fixed;
    ui.time.textContent = s.t.toFixed(1);
    ui.prod.textContent = s.prod;
    if (s.fixed >= GOAL) win();
  }

  function draw() {
    g.fillStyle = '#05080a';
    g.fillRect(0, 0, W, H);
    g.fillStyle = '#0d1a12';
    for (let y = 0; y < H; y += 16) g.fillRect(0, y, W, 1);
    // "production" line
    g.fillStyle = '#ff5a4f55';
    g.fillRect(0, H - 6, W, 2);
    // bugs
    g.fillStyle = '#ff5a4f';
    s.bugs.forEach((b) => BUG.forEach((row, ry) => [...row].forEach((c, rx) => {
      if (c === 'x') g.fillRect(Math.round(b.x - 9 + rx * 2), Math.round(b.y - 7 + ry * 2), 2, 2);
    })));
    // bullets
    g.fillStyle = '#ffd23f';
    s.bullets.forEach((b) => g.fillRect(Math.round(b.x - 1), Math.round(b.y), 2, 5));
    // sparks
    g.fillStyle = '#7dff6a';
    s.sparks.forEach((p) => g.fillRect(Math.round(p.x), Math.round(p.y), 2, 2));
    // player
    g.fillStyle = '#7dff6a';
    g.font = '10px "Press Start 2P", monospace';
    g.textAlign = 'center';
    g.fillText('</>', Math.round(s.x), H - 14);
  }

  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (running && !document.hidden) step(dt);
    draw();
    if (running) raf = requestAnimationFrame(loop);
  }

  function start() {
    reset();
    msg.hidden = true;
    running = true;
    last = performance.now();
    canvas.focus?.();
    raf = requestAnimationFrame(loop);
  }

  function win() {
    running = false;
    cancelAnimationFrame(raf);
    draw();
    const first = store.unlock('bug-hunter');
    msg.hidden = false;
    msg.innerHTML = `
      <p class="pixel bh__title">ALL BUGS FIXED!</p>
      <p>${GOAL} bugs eliminados en ${s.t.toFixed(1)}s${s.prod ? ` · ${s.prod} llegaron a producción (pasa en las mejores familias)` : ' · cero bugs en producción'}.</p>
      ${first ? '' : '<p class="muted small">Achievement ya desbloqueado. Esto ya es por diversión.</p>'}
      <button type="button" class="arc-btn" data-start style="--btn:var(--c-green)">PLAY AGAIN</button>`;
    $('[data-start]', msg).focus();
  }

  const onKey = (e, down) => {
    const k = e.key.toLowerCase();
    if (k === 'arrowleft' || k === 'a') { keys.l = down; pointerX = null; }
    else if (k === 'arrowright' || k === 'd') { keys.r = down; pointerX = null; }
    else return;
    if (running) e.preventDefault();
  };
  const kd = (e) => onKey(e, true);
  const ku = (e) => onKey(e, false);
  document.addEventListener('keydown', kd);
  document.addEventListener('keyup', ku);

  canvas.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'mouse' && !e.buttons) return;
    const r = canvas.getBoundingClientRect();
    pointerX = ((e.clientX - r.left) / r.width) * W;
  });
  canvas.addEventListener('pointerdown', (e) => {
    const r = canvas.getBoundingClientRect();
    pointerX = ((e.clientX - r.left) / r.width) * W;
  });
  canvas.addEventListener('pointerup', () => (pointerX = null));
  root.querySelectorAll('[data-hold]').forEach((b) => {
    const v = Number(b.dataset.hold);
    b.addEventListener('pointerdown', () => { hold = v; pointerX = null; });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((t) => b.addEventListener(t, () => (hold = 0)));
  });
  root.addEventListener('click', (e) => { if (e.target.closest('[data-start]')) start(); });

  reset();
  draw();
  document.fonts?.ready.then(() => !running && draw());
  setTimeout(() => $('[data-start]', root)?.focus(), 50);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    document.removeEventListener('keydown', kd);
    document.removeEventListener('keyup', ku);
  };
}
