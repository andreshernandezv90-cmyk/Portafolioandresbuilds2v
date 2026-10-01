// Game cover art — inline SVG, zero image requests.
// Replace/extend with real key art or screenshots when they exist.

export const covers = {
  witch: () => `
  <svg viewBox="0 0 300 400" role="img" aria-label="Portada: grimorio abierto y poción mágica bajo la luna">
    <defs>
      <linearGradient id="wSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b0b33"/><stop offset=".6" stop-color="#3b1361"/><stop offset="1" stop-color="#14081f"/></linearGradient>
      <radialGradient id="wGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff7ad9" stop-opacity=".9"/><stop offset="1" stop-color="#ff7ad9" stop-opacity="0"/></radialGradient>
      <linearGradient id="wPotion" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9dffcf"/><stop offset="1" stop-color="#1fbf86"/></linearGradient>
    </defs>
    <rect width="300" height="400" fill="url(#wSky)"/>
    <g fill="#fff">
      <rect x="30" y="40" width="3" height="3"/><rect x="250" y="70" width="3" height="3"/><rect x="200" y="30" width="2" height="2"/>
      <rect x="60" y="120" width="2" height="2"/><rect x="270" y="150" width="2" height="2"/><rect x="120" y="60" width="2" height="2"/>
    </g>
    <circle cx="225" cy="85" r="34" fill="#ffe9a8"/><circle cx="240" cy="75" r="30" fill="#2a0f48"/>
    <circle cx="150" cy="250" r="120" fill="url(#wGlow)" opacity=".45"/>
    <!-- potion flask -->
    <rect x="137" y="138" width="26" height="30" rx="3" fill="#cfc3ff" opacity=".85"/>
    <rect x="133" y="132" width="34" height="10" rx="3" fill="#8b5a2b"/>
    <circle cx="150" cy="205" r="46" fill="#e8e0ff" opacity=".25" stroke="#e8e0ff" stroke-width="4"/>
    <path d="M108 212 a42 42 0 0 0 84 0 Z" fill="url(#wPotion)"/>
    <circle cx="136" cy="198" r="5" fill="#d9fff0"/><circle cx="160" cy="184" r="3.5" fill="#d9fff0"/><circle cx="150" cy="168" r="2.5" fill="#d9fff0"/>
    <!-- grimoire -->
    <path d="M40 330 L150 300 L260 330 L260 372 L150 344 L40 372 Z" fill="#5a1f3c"/>
    <path d="M52 324 L150 298 L150 336 L52 360 Z" fill="#f5e6c8"/>
    <path d="M248 324 L150 298 L150 336 L248 360 Z" fill="#ead6b0"/>
    <g stroke="#a07a4a" stroke-width="3"><path d="M68 328 L136 311"/><path d="M68 340 L136 323"/><path d="M164 311 L232 328"/><path d="M164 323 L232 340"/></g>
    <!-- sparkles -->
    <g fill="#ffd23f"><path d="M80 230 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z"/><path d="M228 250 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z"/><path d="M112 120 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z"/></g>
  </svg>`,

  teacher: () => `
  <svg viewBox="0 0 300 400" role="img" aria-label="Portada: pizarrón con saludo en inglés y burbujas de diálogo">
    <defs>
      <linearGradient id="tBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b2a3a"/><stop offset="1" stop-color="#06131c"/></linearGradient>
    </defs>
    <rect width="300" height="400" fill="url(#tBg)"/>
    <!-- chalkboard -->
    <rect x="28" y="56" width="244" height="168" rx="6" fill="#7a4a24"/>
    <rect x="38" y="66" width="224" height="148" rx="3" fill="#1d4a3a"/>
    <g fill="none" stroke="#e9f5ec" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".92">
      <path d="M62 140 v-40 M62 120 h20 M82 100 v40"/>
      <path d="M96 128 h16 a8 8 0 1 0 -2 8"/>
      <path d="M126 98 v42 M140 98 v42"/>
      <path d="M164 126 a10 12 0 1 0 0.1 0"/>
      <path d="M190 98 v30 M190 138 v2"/>
    </g>
    <path d="M200 176 h46" stroke="#ffd23f" stroke-width="4" stroke-linecap="round"/>
    <text x="62" y="196" font-family="monospace" font-size="18" fill="#bfe8d0" opacity=".8">A · B · C</text>
    <!-- speech bubbles -->
    <path d="M48 262 h112 a12 12 0 0 1 12 12 v34 a12 12 0 0 1 -12 12 h-74 l-20 18 4 -18 h-22 a12 12 0 0 1 -12 -12 v-34 a12 12 0 0 1 12 -12z" fill="#35e0d0"/>
    <g fill="#06131c"><rect x="62" y="284" width="64" height="7" rx="3"/><rect x="62" y="299" width="40" height="7" rx="3"/></g>
    <path d="M150 300 h104 a12 12 0 0 1 12 12 v30 a12 12 0 0 1 -12 12 h-20 l4 16 -20 -16 h-68 a12 12 0 0 1 -12 -12 v-30 a12 12 0 0 1 12 -12z" fill="#ffd23f"/>
    <g fill="#2a1d00"><rect x="164" y="318" width="70" height="7" rx="3"/><rect x="164" y="332" width="44" height="7" rx="3"/></g>
    <circle cx="246" cy="40" r="6" fill="#ff5a4f"/><circle cx="226" cy="40" r="6" fill="#ffd23f"/><circle cx="206" cy="40" r="6" fill="#7dff6a"/>
  </svg>`,

  locked: () => `
  <svg viewBox="0 0 300 400" role="img" aria-label="Juego bloqueado">
    <defs>
      <pattern id="lNoise" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="#0d0c12"/><rect x="1" y="2" width="2" height="2" fill="#1d1b26"/><rect x="5" y="5" width="2" height="2" fill="#18161f"/>
      </pattern>
    </defs>
    <rect width="300" height="400" fill="url(#lNoise)"/>
    <text x="150" y="190" text-anchor="middle" font-family="monospace" font-weight="700" font-size="84" fill="#3a3550">???</text>
    <rect x="122" y="232" width="56" height="44" rx="6" fill="#2a2638"/>
    <path d="M132 232 v-14 a18 18 0 0 1 36 0 v14" fill="none" stroke="#2a2638" stroke-width="8"/>
    <circle cx="150" cy="252" r="6" fill="#0d0c12"/>
  </svg>`,
};

export const cover = (key) => (covers[key] || covers.locked)();
