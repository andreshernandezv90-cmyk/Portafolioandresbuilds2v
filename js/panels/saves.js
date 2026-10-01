// SAVE FILES — the professional story as save slots.

import { saveFiles } from '../data/story.js';
import { coinMarkup } from '../ui/coins.js';
import { $, $$, esc } from '../core/dom.js';
import { sfx } from '../core/sound.js';

function detail(s) {
  return `
    <p class="kicker">SAVE FILE ${esc(s.id)} · ${esc(s.stamp)} · ${esc(s.mode)}</p>
    <h2 class="save-detail__title">${esc(s.title)}</h2>
    ${s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}
    ${s.tags.length ? `<p class="muted small">${esc(s.tagsLabel || '')}</p><ul class="tags" role="list">${s.tags.map((t) => `<li class="tag">${esc(t)}</li>`).join('')}</ul>` : ''}
    <p class="save-detail__status">STATUS: <span>${esc(s.status)}</span></p>
    ${s.current ? '<button type="button" class="arc-btn" data-go="projects" style="--btn:var(--c-amber)">▶ CONTINUE</button>' : ''}
    ${s.id === '01' ? `<div class="save-detail__coin">${coinMarkup('saves')}</div>` : ''}`;
}

export function mount(root) {
  const current = saveFiles.find((s) => s.current) || saveFiles[saveFiles.length - 1];
  root.innerHTML = `
    <div class="saves">
      <div>
        <p class="kicker">MEMORY CARD · SLOT A</p>
        <ol class="slots" role="list">
          ${saveFiles.map((s) => `
            <li><button type="button" class="slot${s.current ? ' slot--current' : ''}" data-save="${s.id}" aria-pressed="false">
              <span class="slot__icon" aria-hidden="true">${s.current ? '▶' : '▣'}</span>
              <span class="slot__body">
                <span class="slot__top"><span>FILE ${esc(s.id)}</span><span>${esc(s.stamp)}</span></span>
                <span class="slot__mode">${esc(s.mode)}</span>
                <span class="slot__title">${esc(s.title)}</span>
                <span class="slot__status">${esc(s.status)}</span>
              </span>
              ${s.current ? '<span class="slot__continue">▶ CONTINUE</span>' : ''}
            </button></li>`).join('')}
          <li><div class="slot slot--empty" aria-label="Slot vacío"><span class="slot__icon" aria-hidden="true">—</span><span class="slot__body"><span class="slot__mode">EMPTY SLOT</span><span class="slot__status">NEXT CHAPTER...</span></span></div></li>
        </ol>
      </div>
      <article class="save-detail" aria-live="polite"></article>
    </div>`;

  const select = (id) => {
    $$('.slot[data-save]', root).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.save === id)));
    const d = $('.save-detail', root);
    d.innerHTML = detail(saveFiles.find((s) => s.id === id));
    d.classList.remove('is-loading'); void d.offsetWidth; d.classList.add('is-loading');
  };
  root.addEventListener('click', (e) => {
    const b = e.target.closest('.slot[data-save]');
    if (b) { sfx.press(); select(b.dataset.save); }
  });
  select(current.id);
}
