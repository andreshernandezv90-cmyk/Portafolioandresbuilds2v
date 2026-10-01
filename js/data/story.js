// ─────────────────────────────────────────────────────────────
// SAVE FILES — professional story. Add a new save when a new
// chapter starts; mark only one as `current`.
// ─────────────────────────────────────────────────────────────

export const saveFiles = [
  {
    id: '01',
    stamp: '2024',
    mode: 'NEW GAME',
    title: 'THE BEGINNING',
    status: 'JOURNEY STARTED',
    paragraphs: [
      'Andrés comienza a aprender desarrollo web de manera autodidacta mediante cursos en Udemy.',
      'Lo que comenzó como curiosidad por programación terminó convirtiéndose en algo que quería aprender profesionalmente.',
    ],
    tags: [],
  },
  {
    id: '02',
    stamp: 'UDG',
    mode: 'STORY MODE',
    title: 'WEB DEVELOPMENT',
    status: 'LEVELING UP',
    paragraphs: [
      'Después de comenzar con cursos por su cuenta, encuentra la carrera de Desarrollo Web en la Universidad de Guadalajara.',
      'La modalidad en línea permite continuar aprendiendo y desarrollando proyectos adaptando los estudios a sus tiempos.',
    ],
    tagsLabel: 'Durante esta etapa comienza a trabajar con:',
    tags: ['Frontend', 'Backend', 'Bases de datos', 'Frameworks', 'Servicios web'],
  },
  {
    id: '03',
    stamp: '2026',
    mode: 'CURRENT SAVE',
    title: 'CREATIVE WEB DEVELOPER',
    status: 'BUILDING...',
    current: true,
    paragraphs: [
      'Actualmente se encuentra en una etapa intermedia de formación.',
      'Algunas tecnologías ya forman parte habitual de su trabajo mientras continúa aprendiendo nuevas herramientas y frameworks.',
      'También comienza a llevar sus conocimientos a proyectos para clientes reales.',
    ],
    tags: [],
  },
];
