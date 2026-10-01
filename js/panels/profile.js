// PLAYER PROFILE — character sheet.

import { profile, devComments } from '../data/profile.js';
import { pokePlayerOne } from '../ui/secrets.js';
import { esc } from '../core/dom.js';

export function mount(root, ctx) {
  const portrait = profile.avatar
    ? `<img src="${esc(profile.avatar)}" alt="Avatar pixel-art de ${esc(profile.name)}" width="320" height="320" decoding="async">`
    : `<div class="portrait__empty" role="img" aria-label="Avatar en desarrollo">
         <span class="portrait__q" aria-hidden="true">?</span>
         <span class="pixel small">AVATAR</span>
         <span class="tag tag--warn">IN DEVELOPMENT</span>
       </div>`;

  root.innerHTML = `
    <div class="sheet">
      <div class="sheet__portrait">
        <div class="portrait">${portrait}</div>
        <p class="pixel small muted center">SELECT CHARACTER</p>
      </div>
      <div class="sheet__main">
        <button type="button" class="sheet__p1 pixel" data-p1>PLAYER 01</button>
        <h2 class="sheet__name">${esc(profile.nameUpper)}</h2>
        <dl class="stats stats--sheet">
          <div><dt>CLASS</dt><dd>${esc(profile.role.toUpperCase())}</dd></div>
          <div><dt>LOCATION</dt><dd>${esc(profile.locationShort)}</dd></div>
          <div><dt>STATUS</dt><dd class="status-building">BUILDING<span class="dots" aria-hidden="true"><i>.</i><i>.</i><i>.</i></span></dd></div>
          <div><dt>WEBSITE</dt><dd><a href="${esc(profile.websiteUrl)}">${esc(profile.website)}</a></dd></div>
          <div><dt>EMAIL</dt><dd><a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></dd></div>
          <div><dt>GITHUB</dt><dd><a href="${esc(profile.githubUrl)}" target="_blank" rel="noopener">${esc(profile.github)}</a></dd></div>
        </dl>
        <figure class="bio">
          <figcaption class="pixel small accent">// BIO</figcaption>
          <blockquote><p>${esc(profile.bio)}</p></blockquote>
        </figure>
        <p class="dev-note">${esc(devComments.profile)}</p>
        <div class="sheet__links">
          <button type="button" class="arc-btn arc-btn--ghost" data-go="skills">▶ SKILL TREE</button>
          <button type="button" class="arc-btn arc-btn--ghost" data-go="saves">▶ SAVE FILES</button>
          <button type="button" class="arc-btn" data-go="contact" style="--btn:var(--c-cyan)">▶ CONTACT</button>
        </div>
      </div>
    </div>`;

  root.querySelector('[data-p1]').addEventListener('click', () => pokePlayerOne(ctx));
}
