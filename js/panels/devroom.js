// ANDRÉS' DEV ROOM — unlocked with 5/5 coins. Only real, current info.

import { devRoom } from '../data/profile.js';
import { esc } from '../core/dom.js';

const CODE = [
  "const player = 'Andrés';",
  'const status = BUILDING;',
  '',
  'while (curious) {',
  '  learn(nextSkill);',
  '  build(somethingNew);',
  '  if (bug) fix(bug);',
  '}',
  '',
  '// TODO: avatar pixel-art',
];

const list = (items, empty) =>
  items.length
    ? `<ul class="dr-list" role="list">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`
    : `<p class="dr-empty">${empty}</p>`;

export function mount(root) {
  root.innerHTML = `
    <div class="devroom">
      <div class="dr-scene" aria-hidden="true">
        <div class="dr-wall">
          <span class="dr-poster dr-poster--a">HELLO<br>WORLD</span>
          <span class="dr-poster dr-poster--b">&lt;/&gt;</span>
          <span class="dr-shelf"><i></i><i></i><i></i><i class="dr-cart"></i><i class="dr-cart dr-cart--b"></i></span>
          <span class="dr-window"><i></i></span>
        </div>
        <div class="dr-desk">
          <div class="dr-monitor"><pre>${CODE.map((l) => esc(l)).join('\n')}<span class="dr-caret"></span></pre></div>
          <div class="dr-keyboard"></div>
          <div class="dr-handheld"></div>
          <div class="dr-pad"></div>
          <div class="dr-mug"></div>
          <div class="dr-lamp"></div>
        </div>
      </div>
      <div class="dr-cards">
        <section class="dr-card" style="--accent:var(--c-yellow)">
          <h2 class="pixel">CURRENTLY BUILDING</h2>
          ${list(devRoom.building, 'NO DATA')}
        </section>
        <section class="dr-card" style="--accent:var(--c-cyan)">
          <h2 class="pixel">CURRENTLY LEARNING</h2>
          ${list(devRoom.learning, 'NO DATA')}
        </section>
        <section class="dr-card" style="--accent:var(--c-magenta)">
          <h2 class="pixel">CURRENTLY PLAYING</h2>
          ${list(devRoom.playing, 'NO CARTRIDGE INSERTED<br><span class="muted small">Se actualizará pronto.</span>')}
        </section>
      </div>
      <p class="muted small center">Gracias por explorar hasta aquí. Esta habitación es solo para jugadores curiosos.</p>
    </div>`;
}
