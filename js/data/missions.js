// ─────────────────────────────────────────────────────────────
// SELECT YOUR MISSION — services. `tier` only changes styling.
// ─────────────────────────────────────────────────────────────

export const missions = [
  {
    id: 'webdev', code: 'M-01', tier: 'main', icon: '</>',
    title: 'WEB DEVELOPMENT',
    brief: 'Desarrollo de sitios web personalizados según las necesidades del proyecto.',
  },
  {
    id: 'landing', code: 'M-02', tier: 'main', icon: '▤',
    title: 'LANDING PAGES',
    brief: 'Páginas enfocadas en presentar negocios, productos, servicios o campañas.',
  },
  {
    id: 'ecommerce', code: 'M-03', tier: 'main', icon: '◫',
    title: 'E-COMMERCE',
    brief: 'Desarrollo de tiendas y experiencias de comercio electrónico.',
  },
  {
    id: 'systems', code: 'M-04', tier: 'main', icon: '⌗',
    title: 'CUSTOM WEB SYSTEMS',
    brief: 'Sistemas web desarrollados para solucionar necesidades específicas. Puede incluir integración de bases de datos.',
  },
  {
    id: 'remaster', code: 'M-05', tier: 'side', icon: '↻',
    title: 'REMASTER',
    brief: 'Rediseño de páginas web existentes.',
    objectivesLabel: 'Mejoras en:',
    objectives: ['Diseño', 'Experiencia de usuario', 'Responsive', 'Organización', 'Funcionalidad'],
  },
  {
    id: 'maintenance', code: 'M-06', tier: 'side', icon: '⚙',
    title: 'MAINTENANCE',
    brief: 'Mantenimiento de sitios existentes.',
    objectivesLabel: 'Incluye:',
    objectives: ['Actualizaciones', 'Cambios', 'Correcciones', 'Contenido', 'Mantenimiento general'],
  },
  {
    id: 'security', code: 'M-07', tier: 'side', icon: '⛨',
    title: 'WEB SECURITY',
    brief: 'Aplicación y revisión de buenas prácticas básicas de seguridad web.',
    note: 'Nivel: buenas prácticas básicas. No incluye pentesting ni auditorías avanzadas.',
  },
  {
    id: 'wordpress', code: 'M-08', tier: 'bonus', icon: 'W',
    title: 'WORDPRESS',
    brief: 'Creación, configuración, personalización y mantenimiento de sitios WordPress.',
  },
];

export const TIER_LABEL = { main: 'MAIN QUEST', side: 'SIDE QUEST', bonus: 'BONUS STAGE' };
