// SKILL TREE — RPG tree. No percentages. States: ◆ UNLOCKED · ◈ LEARNING · ◇ NEXT SKILL

import { skills, branches, SKILL_STATES } from '../data/skills.js';
import { projects } from '../data/projects.js';
import { devComments } from '../data/profile.js';
import { coinMarkup } from '../ui/coins.js';
import { $, $$, esc } from '../core/dom.js';
import { sfx } from '../core/sound.js';

const byId = Object.fromEntries(skills.map((s) => [s.id, s]));
const branchColor = (b) => branches.find((x) => x.id === b)?.color || 'var(--c-yellow)';

function info(s) {
  const st = SKILL_STATES[s.state];
  const used = (s.projects || []).map((id) => projects.find((p) => p.id === id)).filter(Boolean);
  return `
    <p class="kicker">${s.branch === 'root' ? 'ROOT' : esc(branches.find((b) => b.id === s.branch)?.label)}</p>
    <h2 class="skill-info__name">${esc(s.name)}</h2>
    <p class="skill-info__state skill-info__state--${s.state}"><span aria-hidden="true">${st.icon}</span> ${st.label}</p>
    <p class="muted small">${esc(st.text)}</p>
    <p class="skill-info__desc">${esc(s.desc)}</p>
    <p class="pixel small accent">PROJECTS</p>
    ${used.length
      ? `<ul class="tags" role="list">${used.map((p) => `<li class="tag">${esc(p.title)}</li>`).join('')}</ul>`
      : '<p class="muted small">Se vincularán aquí cuando los proyectos se publiquen.</p>'}`;
}

export function mount(root) {
  const nodes = skills.filter((s) => s.id !== 'core');
  const order = ['root', ...branches.map((b) => b.id)];
  const sorted = [byId.core, ...nodes].sort((a, b) => order.indexOf(a.branch) - order.indexOf(b.branch));
  const depth = (s) => (s.parent ? 1 + depth(byId[s.parent]) : 0);
  const lines = skills
    .filter((s) => s.parent)
    .map((s) => {
      const p = byId[s.parent];
      return `<line pathLength="1" x1="${p.x}" y1="${p.y}" x2="${s.x}" y2="${s.y}" class="link link--${s.state}" style="--bc:${branchColor(s.branch)};--depth:${depth(s)}"/>`;
    }).join('');

  root.innerHTML = `
    <div class="skills">
      <div class="tree">
        <ul class="tree__legend" role="list">
          ${Object.entries(SKILL_STATES).map(([k, v]) => `<li class="legend legend--${k}"><span aria-hidden="true">${v.icon}</span> ${v.label}</li>`).join('')}
        </ul>
        <div class="tree__board">
          <svg class="tree__links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${lines}</svg>
          <ul class="tree__nodes" role="list" aria-label="Habilidades">
            ${sorted.map((s) => `
              <li class="tree__item" style="--x:${s.x}%;--y:${s.y}%;--bc:${branchColor(s.branch)};--depth:${depth(s)}">
                <button type="button" class="node node--${s.state}${s.id === 'core' ? ' node--root' : ''}" data-skill="${s.id}" aria-pressed="false">
                  <span class="node__icon" aria-hidden="true">${SKILL_STATES[s.state].icon}</span>
                  <span class="node__name">${esc(s.name)}</span>
                  <span class="sr-only">— ${SKILL_STATES[s.state].label}</span>
                </button>
              </li>`).join('')}
          </ul>
          <div class="tree__coin">${coinMarkup('skills')}</div>
        </div>
        <ul class="tree__branches" role="list" aria-hidden="true">
          ${branches.map((b) => `<li style="--bc:${b.color}">${b.label}</li>`).join('')}
        </ul>
      </div>
      <aside class="skill-info" aria-live="polite"></aside>
    </div>
    <p class="dev-note">${esc(devComments.skills)}</p>`;

  const select = (id) => {
    $$('.node', root).forEach((n) => n.setAttribute('aria-pressed', String(n.dataset.skill === id)));
    const box = $('.skill-info', root);
    box.innerHTML = info(byId[id]);
    box.classList.remove('is-in'); void box.offsetWidth; box.classList.add('is-in');
  };

  root.addEventListener('click', (e) => {
    const n = e.target.closest('.node');
    if (!n) return;
    sfx.press();
    select(n.dataset.skill);
  });
  root.addEventListener('pointerover', (e) => { if (e.target.closest('.node')) sfx.hover(); });
  select('core');
}
