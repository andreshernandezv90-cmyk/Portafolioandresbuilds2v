// QUICK MODE — the direct, professional portfolio. Same data, no animations,
// still unmistakably ANDRES BUILDS.

import { profile } from '../data/profile.js';
import { projects, STATUS_LABEL, LOCKED_SLOTS } from '../data/projects.js';
import { skillsByState, SKILL_STATES } from '../data/skills.js';
import { missions } from '../data/missions.js';
import { saveFiles } from '../data/story.js';
import { esc } from '../core/dom.js';

const chip = (t, cls = '') => `<li class="q-chip ${cls}">${esc(t)}</li>`;

export function renderQuick(root) {
  const projectCards = projects.map((p) => `
    <article class="q-card">
      <p class="q-kicker">${esc(p.slot)} · <span class="q-status">${esc(STATUS_LABEL[p.status])}</span></p>
      <h3>${esc(p.title)}</h3>
      <p class="q-meta">${esc(p.type)} — Cliente: ${esc(p.client)}</p>
      <p>${esc(p.summary)}</p>
      ${p.liveUrl ? `<p><a href="${esc(p.liveUrl)}" target="_blank" rel="noopener">Ver proyecto ↗</a></p>` : '<p class="q-muted">Case study: COMING SOON</p>'}
    </article>`).join('');
  const locked = Array.from({ length: LOCKED_SLOTS }, () => `
    <article class="q-card q-card--locked" aria-label="Próximo proyecto: bloqueado">
      <p class="q-kicker">??? · LOCKED</p><h3>NEXT PROJECT</h3><p class="q-muted">Se desbloquea con el próximo proyecto real.</p>
    </article>`).join('');

  root.innerHTML = `
  <div class="q">
    <header class="q-top">
      <a class="q-logo" href="#/quick" aria-label="ANDRES BUILDS">ANDRES <span>BUILDS</span></a>
      <nav aria-label="Secciones" class="q-nav">
        <a href="#q-projects">Proyectos</a><a href="#q-skills">Skills</a><a href="#q-services">Servicios</a><a href="#q-contact">Contacto</a>
      </nav>
      <a class="arc-btn q-arcade" href="#/" style="--btn:var(--c-magenta);--btn-ink:#fff">▶ ARCADE MODE</a>
    </header>

    <main id="main-quick">
      <section class="q-hero" aria-labelledby="q-name">
        <p class="q-p1">PLAYER 1 · STATUS: ${esc(profile.status)}</p>
        <h1 id="q-name">${esc(profile.name)}</h1>
        <p class="q-role">${esc(profile.role)} · ${esc(profile.location)}</p>
        <p class="q-tagline">${esc(profile.tagline)}</p>
        <p class="q-bio">${esc(profile.bio)}</p>
        <div class="q-actions">
          <a class="arc-btn" href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>
          <a class="arc-btn arc-btn--ghost" href="${esc(profile.githubUrl)}" target="_blank" rel="noopener">GitHub ↗</a>
        </div>
      </section>

      <section id="q-projects" aria-labelledby="q-h-projects">
        <h2 id="q-h-projects" class="q-h">Proyectos</h2>
        <div class="q-grid">${projectCards}${locked}</div>
      </section>

      <section id="q-skills" aria-labelledby="q-h-skills">
        <h2 id="q-h-skills" class="q-h">Skills</h2>
        <div class="q-cols">
          ${['unlocked', 'learning'].map((st) => `
          <div>
            <h3 class="q-sub">${SKILL_STATES[st].icon} ${SKILL_STATES[st].label}</h3>
            <p class="q-muted">${esc(SKILL_STATES[st].text)}</p>
            <ul class="q-chips" role="list">${skillsByState(st).map((s) => chip(s.name, `q-chip--${st}`)).join('')}</ul>
          </div>`).join('')}
        </div>
      </section>

      <section id="q-services" aria-labelledby="q-h-services">
        <h2 id="q-h-services" class="q-h">Servicios</h2>
        <ul class="q-services" role="list">
          ${missions.map((m) => `<li><h3>${esc(m.title)}</h3><p>${esc(m.brief)}${m.objectives ? ` ${esc(m.objectivesLabel)} ${esc(m.objectives.join(', ').toLowerCase())}.` : ''}</p>${m.note ? `<p class="q-muted">${esc(m.note)}</p>` : ''}</li>`).join('')}
        </ul>
      </section>

      <section aria-labelledby="q-h-story">
        <h2 id="q-h-story" class="q-h">Trayectoria</h2>
        <ol class="q-story" role="list">
          ${saveFiles.map((s) => `<li${s.current ? ' class="is-current"' : ''}><p class="q-kicker">${esc(s.stamp)} · ${esc(s.status)}</p><h3>${esc(s.title)}</h3><p>${esc(s.paragraphs.join(' '))}</p></li>`).join('')}
        </ol>
      </section>

      <section id="q-contact" class="q-contact" aria-labelledby="q-h-contact">
        <h2 id="q-h-contact" class="q-h">Contacto</h2>
        <p class="q-big">¿Listo para construir algo?</p>
        <p>Escríbeme y cuéntame sobre tu proyecto.</p>
        <div class="q-actions">
          <a class="arc-btn" href="mailto:${esc(profile.email)}?subject=${encodeURIComponent('Nuevo proyecto')}">START A PROJECT</a>
          <a class="arc-btn arc-btn--ghost" href="${esc(profile.githubUrl)}" target="_blank" rel="noopener">github.com/${esc(profile.github)}</a>
        </div>
      </section>
    </main>
    <footer class="q-foot"><p>© 2026 ANDRES BUILDS · ${esc(profile.website)}</p></footer>
  </div>`;
}
