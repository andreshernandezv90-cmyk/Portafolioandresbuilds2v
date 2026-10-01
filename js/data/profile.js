// ─────────────────────────────────────────────────────────────
// PLAYER DATA — single source of truth for personal info.
// Edit here; every view (Arcade, Handheld, Quick Mode) reads it.
// ─────────────────────────────────────────────────────────────

export const profile = {
  brand: 'ANDRES BUILDS',
  tagline: 'I BUILD THINGS FOR THE WEB.',
  name: 'Andrés Hernández',
  nameUpper: 'ANDRÉS HERNÁNDEZ',
  role: 'Creative Web Developer',
  location: 'Guadalajara, México',
  locationShort: 'GUADALAJARA, MX',
  status: 'BUILDING...',
  website: 'andresbuilds.dev',
  websiteUrl: 'https://andresbuilds.dev',
  email: 'hola@andresbuilds.dev',
  github: 'andreshernandezv90-cmyk',
  githubUrl: 'https://github.com/andreshernandezv90-cmyk',
  bio:
    'Me gusta crear soluciones web que ayuden a resolver problemas reales, pero también disfruto poner mi creatividad en cada proyecto. Para mí, desarrollar no es solamente hacer que algo funcione, sino buscar una manera diferente e interesante de hacerlo.',
  // No definitive avatar yet. When the pixel-art avatar exists,
  // set this to its path (e.g. 'assets/avatar.webp').
  avatar: null,
};

// Secret Dev Room — only real, current info. Leave `playing`
// empty until there is something real to show.
export const devRoom = {
  building: ['Andres Builds'],
  learning: ['React', 'Tailwind CSS', 'Laravel', 'CodeIgniter'],
  playing: [],
};

// DEV MODE comments (Konami code). Keep it short — don't flood the page.
export const devComments = {
  hub: '// Sí, esta animación tardó más de lo necesario.',
  missions: "// WordPress isn't my favorite either.",
  contact: '// You should probably hire this guy.',
  profile: '// TODO: avatar pixel-art. Coming soon.',
  skills: '// Los nodos LEARNING sí se están desbloqueando. En serio.',
};
