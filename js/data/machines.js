// ─────────────────────────────────────────────────────────────
// ARCADE MACHINES — one cabinet per section. Order = floor order.
//   model: cabinet silhouette (upright | tall | terminal | candy | twin | broken)
//   accent: main light color; trim: secondary
//   panel: module in js/panels/ (loaded on demand)
// Keep the hub at ~7 machines. New projects go INSIDE Project Select.
// ─────────────────────────────────────────────────────────────

export const machines = [
  {
    id: 'projects', label: 'PROJECT SELECT', sub: 'Proyectos', model: 'upright',
    accent: '#ff4fb8', trim: '#7b5cff', panel: 'projects', buttons: 3,
    side: 'NEW GAMES', blurb: 'Juegos disponibles',
  },
  {
    id: 'profile', label: 'PLAYER PROFILE', sub: 'Sobre mí', model: 'tall',
    accent: '#35e0d0', trim: '#2a7bff', panel: 'profile', buttons: 2,
    side: 'P1', blurb: 'Ficha de personaje',
  },
  {
    id: 'skills', label: 'SKILL TREE', sub: 'Tecnologías', model: 'terminal',
    accent: '#7dff6a', trim: '#1f6b3a', panel: 'skills', buttons: 4,
    side: 'RPG', blurb: 'Árbol de habilidades',
  },
  {
    id: 'saves', label: 'SAVE FILES', sub: 'Trayectoria', model: 'upright',
    accent: '#ffb547', trim: '#ff6b3d', panel: 'saves', buttons: 2,
    side: 'LOAD', blurb: 'Partidas guardadas',
  },
  {
    id: 'missions', label: 'MISSION BOARD', sub: 'Servicios', model: 'candy',
    accent: '#ff5a4f', trim: '#ffd23f', panel: 'missions', buttons: 6,
    side: 'QUEST', blurb: 'Selecciona tu misión',
  },
  {
    id: 'contact', label: 'PLAYER TWO', sub: 'Contacto', model: 'twin',
    accent: '#4f8bff', trim: '#ffd23f', panel: 'contact', buttons: 4,
    side: '2P', blurb: 'Contacta a Andrés',
  },
  {
    id: 'broken', label: 'OUT OF ORDER', sub: '???', model: 'broken',
    accent: '#8a8f98', trim: '#4a4e57', panel: 'bughunter', buttons: 2,
    side: '', blurb: 'Fuera de servicio',
  },
];

// Extra rooms that are not cabinets.
export const rooms = {
  devroom: { id: 'devroom', label: "ANDRÉS' DEV ROOM", panel: 'devroom' },
  achievements: { id: 'achievements', label: 'ACHIEVEMENTS', panel: 'achievements' },
};

export const machineById = (id) => machines.find((m) => m.id === id) || rooms[id];
