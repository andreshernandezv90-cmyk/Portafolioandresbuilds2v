// Console-style notifications: +1 COIN, SECRET DISCOVERED, ACHIEVEMENT UNLOCKED.

import { el, esc } from './dom.js';

let stack;
const queue = [];
let showing = 0;
const MAX = 3;

function ensureStack() {
  if (!stack) {
    stack = el('<div class="toasts" role="status" aria-live="polite" aria-atomic="false"></div>');
    document.body.append(stack);
  }
  return stack;
}

function show({ kind, title, text, ms = 3600 }) {
  showing++;
  const node = el(`
    <div class="toast toast--${kind}">
      <span class="toast__prompt" aria-hidden="true">&gt;_</span>
      <div>
        <p class="toast__title">${esc(title)}</p>
        ${text ? `<p class="toast__text">${esc(text)}</p>` : ''}
      </div>
    </div>`);
  ensureStack().append(node);
  setTimeout(() => {
    node.classList.add('is-leaving');
    setTimeout(() => {
      node.remove();
      showing--;
      if (queue.length) show(queue.shift());
    }, 300);
  }, ms);
}

export function toast(opts) {
  if (showing >= MAX) queue.push(opts);
  else show(opts);
}
