// PLAYER TWO — contact. Closes the narrative; the CTA must be obvious
// even for someone who has never touched an arcade.

import { profile, devComments } from '../data/profile.js';
import { missions } from '../data/missions.js';
import { coinMarkup } from '../ui/coins.js';
import { $, esc, motionWait } from '../core/dom.js';
import { sfx } from '../core/sound.js';

let preselected = '';
export const setMission = (id) => { preselected = id; };

export function mount(root, ctx) {
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent('Nuevo proyecto — ANDRES BUILDS')}`;
  root.innerHTML = `
    <div class="p2">
      <p class="p2__join pixel" aria-hidden="true"><span class="p2__dot"></span> PLAYER 2 HAS JOINED</p>
      <h2 class="p2__title">EVERY PROJECT STARTS WITH <span>PLAYER 2.</span></h2>
      <p class="p2__q">READY TO BUILD SOMETHING?</p>
      <p class="p2__plain">¿Tienes un proyecto, una idea o una página que mejorar? Escríbeme y platicamos.</p>

      <div class="p2__cta">
        <a class="arc-btn p2__main" href="${esc(mailto)}" style="--btn:var(--c-blue);--btn-ink:#fff">START A PROJECT</a>
        <div class="p2__mail">
          <span>CONTACT ANDRÉS:</span>
          <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>
          <button type="button" class="copy" data-copy>COPY</button>
        </div>
      </div>

      <div class="p2__grid">
        <section class="p2card p2card--p1" aria-labelledby="p1h">
          <p class="p2card__tag">1P</p>
          <h3 id="p1h">ANDRÉS HERNÁNDEZ</h3>
          <p class="muted">${esc(profile.role)} · ${esc(profile.location)}</p>
          <ul class="p2card__list" role="list">
            <li><span>EMAIL</span><a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></li>
            <li><span>GITHUB</span><a href="${esc(profile.githubUrl)}" target="_blank" rel="noopener">${esc(profile.github)}</a></li>
            <li><span>WEB</span><a href="${esc(profile.websiteUrl)}">${esc(profile.website)}</a></li>
          </ul>
          <p class="dev-note">${esc(devComments.contact)}</p>
        </section>

        <section class="p2card p2card--p2" aria-labelledby="p2h">
          <p class="p2card__tag">2P</p>
          <h3 id="p2h">SEND TRANSMISSION</h3>
          <form class="tx" novalidate>
            <label>NOMBRE<input name="p2name" autocomplete="name" required maxlength="80"></label>
            <label>MISIÓN
              <select name="mission">
                <option value="">— Elige una misión —</option>
                ${missions.map((m) => `<option value="${m.id}"${m.id === preselected ? ' selected' : ''}>${esc(m.title)}</option>`).join('')}
                <option value="other">OTRA / NO ESTOY SEGURO</option>
              </select>
            </label>
            <label>MENSAJE<textarea name="msg" rows="4" required maxlength="2000" placeholder="Cuéntame sobre tu proyecto..."></textarea></label>
            <p class="tx__err" role="alert"></p>
            <button type="submit" class="arc-btn" style="--btn:var(--c-yellow)">SEND TRANSMISSION ▶</button>
            <p class="muted small">Se abrirá tu app de correo con el mensaje listo.</p>
          </form>
        </section>
      </div>
      <p class="p2__insert pixel">INSERT COIN TO CONTINUE ${coinMarkup('contact', 'p2__coin')}</p>
    </div>`;

  preselected = '';

  const form = $('.tx', root);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.p2name.value.trim();
    const msg = form.msg.value.trim();
    const mission = missions.find((m) => m.id === form.mission.value)?.title || (form.mission.value === 'other' ? 'Otra' : '');
    const err = $('.tx__err', form);
    if (!name || !msg) {
      err.textContent = !name ? 'Falta tu nombre, Player 2.' : 'Escribe un mensaje para la transmisión.';
      (!name ? form.p2name : form.msg).focus();
      sfx.error();
      return;
    }
    err.textContent = '';
    const subject = `Transmisión de ${name}${mission ? ` — ${mission}` : ''}`;
    const body = `${msg}\n\n— ${name}${mission ? `\nMisión: ${mission}` : ''}`;
    sfx.press();
    const btn = form.querySelector('[type=submit]');
    btn.textContent = 'TRANSMITTING...';
    await motionWait(400);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    btn.textContent = 'TRANSMISSION SENT ✓';
  });

  $('[data-copy]', root).addEventListener('click', async (e) => {
    try {
      await navigator.clipboard.writeText(profile.email);
      e.currentTarget.textContent = 'COPIED ✓';
      ctx.toast({ kind: 'info', title: 'EMAIL COPIED', text: profile.email, ms: 1800 });
    } catch {
      e.currentTarget.textContent = 'SELECCIONA Y COPIA';
    }
  });
}
