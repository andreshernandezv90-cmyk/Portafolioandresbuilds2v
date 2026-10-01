// ─────────────────────────────────────────────────────────────
// GAME LIBRARY — real projects only. Never invent.
//
// To unlock a new game: add an object to `projects`.
//   featured: true  → shows in FEATURED GAMES (max 6 on the cabinet)
//   status: 'dev' | 'live'
//   cover: key of a cover renderer in js/ui/covers.js
//   screenshots: ['assets/projects/xyz-1.webp', ...]
//   liveUrl / repoUrl: only when they exist (repo only if public)
//   caseStudy: fill when the project is finished (see CASE_STUDY_STAGES)
// ─────────────────────────────────────────────────────────────

export const CASE_STUDY_STAGES = [
  { key: 'mission', title: 'THE MISSION', hint: '¿Qué necesitaba el cliente?' },
  { key: 'client', title: 'THE CLIENT', hint: 'Contexto del proyecto.' },
  { key: 'challenge', title: 'THE CHALLENGE', hint: 'Problemas encontrados.' },
  { key: 'role', title: 'MY ROLE', hint: 'Qué hizo Andrés.' },
  { key: 'tech', title: 'TECH LOADOUT', hint: 'Tecnologías utilizadas.' },
  { key: 'development', title: 'DEVELOPMENT', hint: 'Proceso de desarrollo.' },
  { key: 'bosses', title: 'BOSS BATTLES', hint: 'Problemas técnicos importantes.' },
  { key: 'strategy', title: 'STRATEGY', hint: 'Cómo se solucionaron.' },
  { key: 'result', title: 'FINAL RESULT', hint: 'Resultado final.' },
];

export const STATUS_LABEL = {
  dev: 'IN DEVELOPMENT',
  live: 'LIVE',
};

export const projects = [
  {
    id: 'scoops',
    slot: 'GAME 01',
    title: 'Scoops de la Bruja Sabia',
    type: 'E-commerce / Interactive Web Experience',
    client: 'Negocio real',
    status: 'dev',
    featured: true,
    cover: 'witch',
    summary:
      'Una tienda en línea que se siente como abrir un grimorio: magia, brujería, pociones y personalización dentro de una experiencia interactiva.',
    themes: ['Magia', 'Grimorio', 'Brujería', 'Pociones', 'Personalización', 'Experiencia interactiva'],
    tech: [],
    screenshots: [],
    liveUrl: null,
    repoUrl: null,
    caseStudy: null,
  },
  {
    id: 'english-teacher',
    slot: 'GAME 02',
    title: 'English Teacher Website',
    type: 'Landing Page / Services Website',
    client: 'Profesor independiente de inglés',
    status: 'dev',
    featured: true,
    cover: 'teacher',
    summary:
      'Crear una presencia web sencilla y profesional para promocionar clases de inglés en línea.',
    themes: ['Landing page', 'Servicios', 'Clases en línea'],
    tech: [],
    screenshots: [],
    liveUrl: null,
    repoUrl: null,
    caseStudy: null,
  },
];

// How many "???" locked slots to show after the real games.
export const LOCKED_SLOTS = 1;
export const FEATURED_MAX = 6;

export const featuredProjects = () =>
  projects.filter((p) => p.featured).slice(0, FEATURED_MAX);
