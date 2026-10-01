// ─────────────────────────────────────────────────────────────
// ACHIEVEMENTS (visible list) and SECRETS (count is never shown).
//
// kind: 'explore' — unlocked by the visitor while exploring.
// kind: 'career'  — Andrés' real milestones. Set `unlocked: true`
//                   only when it actually happened.
// ─────────────────────────────────────────────────────────────

export const achievements = [
  { id: 'coin-collector', kind: 'explore', title: 'COIN COLLECTOR', desc: 'Encontraste las 5 monedas escondidas.' },
  { id: 'bug-hunter', kind: 'explore', title: 'BUG HUNTER', desc: 'Limpiaste el código de bugs en la máquina rota.' },
  { id: 'curious-player', kind: 'explore', title: 'CURIOUS PLAYER', desc: 'Visitaste todas las máquinas del arcade.' },
  { id: 'code-explorer', kind: 'explore', title: 'CODE EXPLORER', desc: 'Activaste DEV MODE con un cheat code.' },
  { id: 'under-the-hood', kind: 'explore', title: 'LOOKING UNDER THE HOOD', desc: 'Revisaste la consola del navegador. Clásico de developer.' },

  { id: 'first-client', kind: 'career', title: 'FIRST CLIENT', desc: 'Primeros proyectos para clientes reales.', progress: 'IN PROGRESS' },
];

// Secret ids. The UI never reveals how many exist: "SECRETS FOUND: n / ???"
export const SECRET_IDS = ['konami', 'player-one', 'out-of-order', 'under-the-hood', 'credits'];

// Five hidden coins, one per area.
export const COIN_IDS = ['hub', 'projects', 'skills', 'saves', 'contact'];

// Sections that count toward CURIOUS PLAYER.
export const MAIN_SECTIONS = ['projects', 'profile', 'skills', 'saves', 'missions', 'contact'];
