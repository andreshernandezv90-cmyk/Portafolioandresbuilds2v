// SELECT YOUR MISSION — services as quest postings.

import { missions, TIER_LABEL } from '../data/missions.js';
import { devComments } from '../data/profile.js';
import { esc } from '../core/dom.js';
import { setMission } from './contact.js';

export function mount(root, ctx) {
  root.innerHTML = `
    <div class="missions">
      <p class="missions__intro">Cada proyecto empieza con una misión. Elige la tuya y la preparamos juntos.</p>
      <ul class="board" role="list">
        ${missions.map((m, i) => `
          <li class="quest quest--${m.tier}" style="--tilt:${[-1.2, 0.8, -0.4, 1.1, -0.9, 0.5, 1.3, -0.6][i % 8]}deg">
            <span class="quest__pin" aria-hidden="true"></span>
            <p class="quest__top"><span>${esc(m.code)}</span><span>${esc(TIER_LABEL[m.tier])}</span></p>
            <span class="quest__icon" aria-hidden="true">${esc(m.icon)}</span>
            <h2 class="quest__title">${esc(m.title)}</h2>
            <p class="quest__brief">${esc(m.brief)}</p>
            ${m.objectives ? `<p class="quest__olabel">${esc(m.objectivesLabel)}</p><ul class="quest__obj" role="list">${m.objectives.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>` : ''}
            ${m.note ? `<p class="quest__note">${esc(m.note)}</p>` : ''}
            ${m.id === 'wordpress' ? `<p class="dev-note">${esc(devComments.missions)}</p>` : ''}
            <button type="button" class="arc-btn quest__accept" data-mission="${m.id}">ACCEPT MISSION</button>
          </li>`).join('')}
      </ul>
    </div>`;

  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-mission]');
    if (!b) return;
    setMission(b.dataset.mission);
    ctx.go('contact');
  });
}
