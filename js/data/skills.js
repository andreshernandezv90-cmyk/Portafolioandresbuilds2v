// ─────────────────────────────────────────────────────────────
// SKILL TREE — no percentages, ever.
//   state: 'unlocked' | 'learning' | 'next'
//   'next' only when Andrés says he wants to learn it.
//   projects: ids from projects.js — only where it was really used.
//   x / y: node position in the tree (0–100, percent of the board).
// ─────────────────────────────────────────────────────────────

export const SKILL_STATES = {
  unlocked: { icon: '◆', label: 'UNLOCKED', text: 'Tecnología utilizada y con la que existe experiencia.' },
  learning: { icon: '◈', label: 'LEARNING', text: 'Tecnología que actualmente se está aprendiendo.' },
  next: { icon: '◇', label: 'NEXT SKILL', text: 'Próxima habilidad a desbloquear.' },
};

export const branches = [
  { id: 'frontend', label: 'FRONTEND', color: 'var(--c-cyan)' },
  { id: 'backend', label: 'BACKEND', color: 'var(--c-magenta)' },
  { id: 'data', label: 'DATA', color: 'var(--c-amber)' },
  { id: 'tools', label: 'TOOLS', color: 'var(--c-green)' },
  { id: 'deploy', label: 'DEPLOY & CMS', color: 'var(--c-blue)' },
];

export const skills = [
  // root
  { id: 'core', name: 'WEB DEV', branch: 'root', state: 'unlocked', x: 50, y: 88, parent: null,
    desc: 'El punto de partida: construir para la web, de principio a fin.' },

  // frontend
  { id: 'html', name: 'HTML', branch: 'frontend', state: 'unlocked', x: 16, y: 70, parent: 'core',
    desc: 'Estructura y semántica del contenido web.' },
  { id: 'css', name: 'CSS', branch: 'frontend', state: 'unlocked', x: 9, y: 50, parent: 'html',
    desc: 'Diseño, layout, responsive y animaciones.' },
  { id: 'js', name: 'JavaScript', branch: 'frontend', state: 'unlocked', x: 22, y: 46, parent: 'html',
    desc: 'Interactividad y lógica del lado del cliente. Este arcade corre sobre JavaScript.' },
  { id: 'tailwind', name: 'Tailwind CSS', branch: 'frontend', state: 'learning', x: 7, y: 26, parent: 'css',
    desc: 'Framework de utilidades para estilos. En proceso de aprendizaje.' },
  { id: 'react', name: 'React', branch: 'frontend', state: 'learning', x: 22, y: 22, parent: 'js',
    desc: 'Librería para interfaces basadas en componentes. En proceso de aprendizaje.' },

  // backend
  { id: 'php', name: 'PHP', branch: 'backend', state: 'unlocked', x: 40, y: 62, parent: 'core',
    desc: 'Lenguaje del lado del servidor para sitios y sistemas web.' },
  { id: 'laravel', name: 'Laravel', branch: 'backend', state: 'learning', x: 34, y: 38, parent: 'php',
    desc: 'Framework PHP para aplicaciones web. En proceso de aprendizaje.' },
  { id: 'codeigniter', name: 'CodeIgniter', branch: 'backend', state: 'learning', x: 47, y: 36, parent: 'php',
    desc: 'Framework PHP ligero. En proceso de aprendizaje.' },

  // data
  { id: 'mysql', name: 'MySQL', branch: 'data', state: 'unlocked', x: 60, y: 62, parent: 'core',
    desc: 'Bases de datos relacionales y consultas SQL.' },
  { id: 'mariadb', name: 'MariaDB', branch: 'data', state: 'unlocked', x: 60, y: 40, parent: 'mysql',
    desc: 'Motor de base de datos relacional compatible con MySQL.' },

  // tools
  { id: 'git', name: 'Git', branch: 'tools', state: 'unlocked', x: 78, y: 70, parent: 'core',
    desc: 'Control de versiones.' },
  { id: 'github', name: 'GitHub', branch: 'tools', state: 'unlocked', x: 74, y: 48, parent: 'git',
    desc: 'Repositorios y colaboración. Aquí vive el código de este portafolio.' },
  { id: 'vscode', name: 'VS Code', branch: 'tools', state: 'unlocked', x: 88, y: 52, parent: 'git',
    desc: 'Editor de código del día a día.' },
  { id: 'xampp', name: 'XAMPP', branch: 'tools', state: 'unlocked', x: 92, y: 32, parent: 'vscode',
    desc: 'Entorno local de desarrollo con Apache, PHP y MySQL/MariaDB.' },

  // deploy & cms
  { id: 'netlify', name: 'Netlify', branch: 'deploy', state: 'unlocked', x: 70, y: 26, parent: 'github',
    desc: 'Publicación de sitios web estáticos.' },
  { id: 'ghpages', name: 'GitHub Pages', branch: 'deploy', state: 'unlocked', x: 82, y: 14, parent: 'github',
    desc: 'Hosting de sitios estáticos directamente desde un repositorio.' },
  { id: 'wordpress', name: 'WordPress', branch: 'deploy', state: 'unlocked', x: 54, y: 16, parent: 'mariadb',
    desc: 'Creación, configuración, personalización y mantenimiento de sitios WordPress.' },
];

export const skillsByState = (state) => skills.filter((s) => s.state === state && s.id !== 'core');
