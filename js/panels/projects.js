// PROJECT SELECT — projects as games on a shelf. Real projects only.

import { projects, featuredProjects, CASE_STUDY_STAGES, STATUS_LABEL, LOCKED_SLOTS } from '../data/projects.js';
import { cover } from '../ui/covers.js';
import { coinMarkup } from '../ui/coins.js';
import { $, $$, esc } from '../core/dom.js';

function caseStudyMarkup(p) {
  const cs = p.caseStudy;
  if (!cs) {
    return `
      <div class="cs cs--locked">
        <h3 class="cs__h">CASE STUDY <span class="tag tag--warn">LOCKED</span></h3>
        <p class="muted">El Case Study completo se desbloquea cuando el proyecto esté terminado.</p>
        <ol class="cs__chapters" role="list">
          ${CASE_STUDY_STAGES.map((s, i) => `<li><span class="cs__n">${String(i + 1).padStart(2, '0')}</span> ${esc(s.title)} <span aria-hidden="true">🔒</span></li>`).join('')}
        </ol>
      </div>`;
  }
  // Future: full case study, rendered from data.
  return `
    <div class="cs">
      <h3 class="cs__h">CASE STUDY</h3>
      ${CASE_STUDY_STAGES.map((s) => {
        const v = cs[s.key];
        if (!v || (Array.isArray(v) && !v.length)) return '';
        if (s.key === 'tech') return `<section class="cs__stage"><h4>${s.title}</h4><ul class="tags" role="list">${v.map((t) => `<li class="tag">${esc(t)}</li>`).join('')}</ul></section>`;
        if (s.key === 'bosses') return `<section class="cs__stage"><h4>${s.title}</h4>${v.map((b) => `
          <article class="boss"><p class="boss__name">BOSS: ${esc(b.name)}</p><p><strong>Problema:</strong> ${esc(b.problem)}</p><p><strong>Estrategia:</strong> ${esc(b.strategy)}</p></article>`).join('')}</section>`;
        return `<section class="cs__stage"><h4>${s.title}</h4><p>${esc(v)}</p></section>`;
      }).join('')}
    </div>`;
}

function detail(p) {
  if (!p) {
    return `
      <article class="gd gd--locked">
        <div class="gd__cover">${cover('locked', 'Juego bloqueado')}</div>
        <div class="gd__info">
          <p class="kicker">GAME 0${projects.length + 1}</p>
          <h2 class="gd__title">??? — NEXT PROJECT</h2>
          <p><span class="tag tag--muted">LOCKED</span></p>
          <p class="muted">Este cartucho todavía está vacío. Se desbloqueará cuando exista un nuevo proyecto real.</p>
          <p class="pixel small accent">NEW GAME UNLOCKED... soon.</p>
          <div class="gd__secret">${coinMarkup('projects')}</div>
        </div>
      </article>`;
  }
  const live = p.liveUrl
    ? `<a class="arc-btn" href="${esc(p.liveUrl)}" target="_blank" rel="noopener">LIVE PROJECT ↗</a>`
    : '<span class="arc-btn" aria-disabled="true">LIVE PROJECT · COMING SOON</span>';
  const repo = p.repoUrl
    ? `<a class="arc-btn arc-btn--ghost" href="${esc(p.repoUrl)}" target="_blank" rel="noopener">SOURCE CODE ↗</a>`
    : '';
  const shots = p.screenshots.length
    ? `<div class="gd__shots">${p.screenshots.map((s, i) => `<img src="${esc(s)}" alt="Captura ${i + 1} de ${esc(p.title)}" loading="lazy" decoding="async">`).join('')}</div>`
    : '<p class="muted small">SCREENSHOTS: COMING SOON</p>';
  return `
    <article class="gd">
      <div class="gd__cover">${cover(p.cover, esc(`Portada de ${p.title}`))}<span class="gd__ribbon">${esc(STATUS_LABEL[p.status])}</span></div>
      <div class="gd__info">
        <p class="kicker">${esc(p.slot)} · ${esc(p.type)}</p>
        <h2 class="gd__title">${esc(p.title)}</h2>
        <dl class="stats">
          <div><dt>CLIENT</dt><dd>${esc(p.client)}</dd></div>
          <div><dt>STATUS</dt><dd><span class="tag tag--live">${esc(STATUS_LABEL[p.status])}</span></dd></div>
          <div><dt>RELEASE</dt><dd>${p.status === 'live' ? 'OUT NOW' : 'COMING SOON'}</dd></div>
        </dl>
        <p class="gd__summary">${esc(p.summary)}</p>
        <ul class="tags" role="list" aria-label="Temas">${p.themes.map((t) => `<li class="tag">${esc(t)}</li>`).join('')}</ul>
        <div class="gd__actions">${live}${repo}</div>
        ${shots}
        ${caseStudyMarkup(p)}
      </div>
    </article>`;
}

function box(p, i) {
  if (!p) {
    return `<li><button type="button" class="gbox gbox--locked" data-game="locked-${i}" aria-pressed="false">
      <span class="gbox__art" aria-hidden="true">${cover('locked')}</span>
      <span class="gbox__label"><span class="gbox__slot">???</span><span class="gbox__name">NEXT PROJECT</span><span class="gbox__state">LOCKED</span></span>
    </button></li>`;
  }
  return `<li><button type="button" class="gbox" data-game="${esc(p.id)}" aria-pressed="false">
    <span class="gbox__art" aria-hidden="true">${cover(p.cover)}</span>
    <span class="gbox__label"><span class="gbox__slot">${esc(p.slot)}</span><span class="gbox__name">${esc(p.title)}</span><span class="gbox__state">${esc(STATUS_LABEL[p.status])}</span></span>
  </button></li>`;
}

export function mount(root) {
  let showAll = false;
  const render = () => {
    const list = showAll ? projects : featuredProjects();
    const hasMore = projects.length > featuredProjects().length;
    root.innerHTML = `
      <div class="projects">
        <div class="shelf-wrap">
          <p class="kicker">${showAll ? 'FULL LIBRARY' : 'FEATURED GAMES'} · ${projects.length} ${projects.length === 1 ? 'GAME' : 'GAMES'}</p>
          <ul class="shelf" role="list">
            ${list.map((p) => box(p)).join('')}
            ${Array.from({ length: LOCKED_SLOTS }, (_, i) => box(null, i)).join('')}
          </ul>
          ${hasMore ? `<button type="button" class="arc-btn arc-btn--ghost" data-library>${showAll ? 'FEATURED GAMES' : 'VIEW FULL LIBRARY'}</button>` : ''}
        </div>
        <div class="game-detail" aria-live="polite"></div>
      </div>`;
    select(list[0]?.id || 'locked-0', false);
  };

  const select = (id, focus = true) => {
    const p = projects.find((x) => x.id === id) || null;
    $$('.gbox', root).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.game === id)));
    const d = $('.game-detail', root);
    d.innerHTML = detail(p);
    d.classList.remove('is-loading'); void d.offsetWidth; d.classList.add('is-loading');
    if (focus && window.matchMedia('(max-width: 900px)').matches) d.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  root.addEventListener('click', (e) => {
    const b = e.target.closest('.gbox');
    if (b) select(b.dataset.game);
    if (e.target.closest('[data-library]')) { showAll = !showAll; render(); }
  });
  render();
}
