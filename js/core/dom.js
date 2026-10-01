// Small DOM helpers.

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

export function html(strings, ...values) {
  return strings.reduce((out, str, i) => out + str + (i < values.length ? values[i] : ''), '');
}

export function el(markup) {
  const t = document.createElement('template');
  t.innerHTML = markup.trim();
  return t.content.firstElementChild;
}

export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export const fxOn = () => document.documentElement.dataset.fx === 'on';

export const prefersReducedMotion = () =>
  matchMedia('(prefers-reduced-motion: reduce)').matches;

// Respect FX OFF and reduced motion for scripted delays.
export const motionWait = (ms) => wait(fxOn() && !prefersReducedMotion() ? ms : 0);

export const isHandheld = () => matchMedia('(max-width: 760px)').matches;
