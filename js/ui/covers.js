// Game box art — inline SVG, zero image requests.
// Each render gets unique gradient ids (the same cover can appear twice on screen).
// Animated parts use classes styled in screen.css (.tw twinkle, .bub bubbles,
// .bob float, .sw swirl); they stop with FX OFF / reduced motion.
// Replace or extend with real key art / screenshots when they exist.

let uid = 0;

// Shared box frame: publisher band on top, title band at the bottom.
const frame = (id, accent, art, title, subtitle) => `
  <defs>
    <linearGradient id="band${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1828"/><stop offset="1" stop-color="#0c0a12"/></linearGradient>
    <linearGradient id="sheen${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
  </defs>
  ${art}
  <rect width="300" height="30" fill="url(#band${id})"/>
  <rect y="29" width="300" height="2" fill="${accent}"/>
  <text x="14" y="20" font-family="'Press Start 2P', monospace" font-size="8" fill="#fff">A.B. ARCADE</text>
  <rect x="244" y="9" width="42" height="14" rx="2" fill="${accent}"/>
  <text x="265" y="19.5" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="7" fill="#0c0a12">1P</text>
  <rect y="322" width="300" height="78" fill="url(#band${id})"/>
  <rect y="321" width="300" height="2" fill="${accent}"/>
  <text x="150" y="350" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="9" fill="#cfc7e4">${subtitle}</text>
  <text x="150" y="379" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="17" fill="${accent}">${title}</text>
  <rect width="300" height="400" fill="url(#sheen${id})" pointer-events="none"/>
  <rect x="1" y="1" width="298" height="398" rx="2" fill="none" stroke="#ffffff22" stroke-width="2"/>`;

export const covers = {
  witch: (id) => frame(id, '#ff7ad9', `
    <defs>
      <linearGradient id="wSky${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#12062a"/><stop offset=".55" stop-color="#3b1361"/><stop offset="1" stop-color="#7a2363"/></linearGradient>
      <radialGradient id="wMoon${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".55"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient>
      <radialGradient id="wGlow${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#7dffd0" stop-opacity=".75"/><stop offset="1" stop-color="#7dffd0" stop-opacity="0"/></radialGradient>
      <linearGradient id="wLiquid${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8ffe4"/><stop offset=".4" stop-color="#3fe0a8"/><stop offset="1" stop-color="#0f8a64"/></linearGradient>
      <linearGradient id="wPage${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e9d7b0"/><stop offset=".5" stop-color="#fff6de"/><stop offset="1" stop-color="#e2cda2"/></linearGradient>
    </defs>
    <rect y="30" width="300" height="292" fill="url(#wSky${id})"/>
    <g fill="#fff">
      <circle class="tw" cx="34" cy="62" r="1.6"/><circle class="tw" style="--d:-1.1s" cx="96" cy="48" r="1.2"/>
      <circle class="tw" style="--d:-.6s" cx="150" cy="78" r="1.4"/><circle class="tw" style="--d:-1.8s" cx="268" cy="140" r="1.3"/>
      <circle class="tw" style="--d:-2.4s" cx="58" cy="132" r="1.1"/><circle class="tw" style="--d:-.3s" cx="196" cy="54" r="1"/>
      <circle class="tw" style="--d:-1.5s" cx="20" cy="190" r="1.2"/><circle class="tw" style="--d:-2s" cx="122" cy="118" r=".9"/>
    </g>
    <circle cx="228" cy="92" r="58" fill="url(#wMoon${id})"/>
    <circle cx="228" cy="92" r="30" fill="#ffe9a8"/>
    <circle cx="242" cy="82" r="27" fill="#2a0f48"/>
    <path d="M0 262 Q50 228 96 250 T190 242 T300 236 V322 H0Z" fill="#2a0c3e"/>
    <path d="M0 286 Q70 262 140 280 T300 270 V322 H0Z" fill="#1d0830"/>
    <circle cx="150" cy="236" r="96" fill="url(#wGlow${id})" opacity=".55"/>
    <path class="sw" d="M92 236 C92 150 210 150 208 214 C206 258 136 262 132 214 C130 186 170 182 176 204" fill="none" stroke="#ffd23f" stroke-width="2" stroke-linecap="round" stroke-dasharray="6 8" opacity=".85"/>
    <!-- grimoire -->
    <path d="M38 306 L150 282 L262 306 L262 318 L150 296 L38 318 Z" fill="#3a0f2a"/>
    <path d="M44 300 L150 276 L150 296 L44 316 Z" fill="url(#wPage${id})"/>
    <path d="M256 300 L150 276 L150 296 L256 316 Z" fill="url(#wPage${id})"/>
    <g stroke="#a07a4a" stroke-width="2" opacity=".7"><path d="M62 302 L134 286"/><path d="M62 309 L134 293"/><path d="M166 286 L238 302"/><path d="M166 293 L238 309"/></g>
    <!-- witch hat leaning on the book -->
    <path d="M44 300 L78 214 Q84 206 88 216 L104 296 Z" fill="#1a0a2c"/>
    <path d="M30 302 Q74 286 118 298 Q74 312 30 302 Z" fill="#12061f"/>
    <path d="M58 270 L96 262 L98 274 L56 282 Z" fill="#ff7ad9"/>
    <!-- potion flask -->
    <rect x="140" y="152" width="20" height="30" rx="3" fill="#d9ccff" opacity=".8"/>
    <rect x="136" y="144" width="28" height="11" rx="3" fill="#8b5a2b"/>
    <circle cx="150" cy="226" r="48" fill="#ffffff14" stroke="#e8e0ff" stroke-width="3.5"/>
    <path d="M104 232 a46 46 0 0 0 92 0 Q174 220 150 228 Q126 236 104 232 Z" fill="url(#wLiquid${id})"/>
    <ellipse cx="132" cy="206" rx="7" ry="13" fill="#fff" opacity=".3" transform="rotate(25 132 206)"/>
    <g fill="#e6fff6">
      <circle class="bub" cx="140" cy="246" r="4"/><circle class="bub" style="--d:-.9s" cx="160" cy="252" r="3"/>
      <circle class="bub" style="--d:-1.6s" cx="150" cy="240" r="2.5"/><circle class="bub" style="--d:-2.2s" cx="168" cy="244" r="2"/>
    </g>
    <g fill="#ffd23f">
      <path class="tw" style="--d:-.4s" d="M230 196 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z"/>
      <path class="tw" style="--d:-1.4s" d="M70 160 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2z"/>
      <path class="tw" style="--d:-2.1s" d="M206 270 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z"/>
    </g>`, 'BRUJA SABIA', 'SCOOPS DE LA'),

  teacher: (id) => frame(id, '#35e0d0', `
    <defs>
      <linearGradient id="tBg${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d3346"/><stop offset="1" stop-color="#071821"/></linearGradient>
      <linearGradient id="tBoard${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#27594a"/><stop offset="1" stop-color="#173b31"/></linearGradient>
      <radialGradient id="tLamp${id}" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#fff3c9" stop-opacity=".35"/><stop offset="1" stop-color="#fff3c9" stop-opacity="0"/></radialGradient>
      <linearGradient id="tScreen${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f3b6e"/><stop offset="1" stop-color="#122447"/></linearGradient>
    </defs>
    <rect y="30" width="300" height="292" fill="url(#tBg${id})"/>
    <rect y="30" width="300" height="292" fill="url(#tLamp${id})"/>
    <rect y="258" width="300" height="64" fill="#0a1d26"/>
    <!-- chalkboard -->
    <rect x="30" y="54" width="240" height="150" rx="6" fill="#7a4a24"/>
    <rect x="38" y="62" width="224" height="134" rx="3" fill="url(#tBoard${id})"/>
    <rect x="38" y="62" width="224" height="134" rx="3" fill="#fff" opacity=".03"/>
    <g fill="none" stroke="#f1fbf3" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".95">
      <path d="M64 136 v-40 M64 116 h20 M84 96 v40"/>
      <path d="M98 124 h16 a8 8 0 1 0 -2 8"/>
      <path d="M128 94 v42 M142 94 v42"/>
      <path d="M166 122 a10 12 0 1 0 0.1 0"/>
      <path d="M192 94 v30 M192 135 v1"/>
    </g>
    <path d="M206 170 q16 -10 30 0" stroke="#ffd23f" stroke-width="4" fill="none" stroke-linecap="round"/>
    <text x="64" y="182" font-family="'VT323', monospace" font-size="20" fill="#cdeedd" opacity=".85">A · B · C</text>
    <rect x="62" y="198" width="176" height="6" rx="2" fill="#5a3418"/>
    <rect x="96" y="194" width="22" height="5" rx="2" fill="#f4f4f4"/><rect x="180" y="194" width="14" height="5" rx="2" fill="#ffd23f"/>
    <!-- laptop with a video call -->
    <path d="M42 300 L58 240 H150 L166 300 Z" fill="#c9d3e3"/>
    <rect x="62" y="244" width="84" height="50" fill="url(#tScreen${id})"/>
    <rect x="66" y="248" width="38" height="20" rx="2" fill="#2d5a9e"/><circle cx="85" cy="256" r="5" fill="#ffcf9e"/><rect x="78" y="262" width="14" height="6" rx="3" fill="#35e0d0"/>
    <rect x="106" y="248" width="36" height="20" rx="2" fill="#2d5a9e"/><circle cx="124" cy="256" r="5" fill="#e0a77a"/><rect x="117" y="262" width="14" height="6" rx="3" fill="#ffd23f"/>
    <rect x="66" y="272" width="76" height="6" rx="2" fill="#35e0d0" opacity=".6"/>
    <path d="M30 300 H178 L170 310 H38 Z" fill="#8e9bb0"/>
    <!-- speech bubbles -->
    <g class="bob">
      <path d="M182 220 h72 a10 10 0 0 1 10 10 v24 a10 10 0 0 1 -10 10 h-46 l-16 14 3 -14 h-13 a10 10 0 0 1 -10 -10 v-24 a10 10 0 0 1 10 -10z" fill="#35e0d0"/>
      <text x="218" y="249" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="11" fill="#06202a">Hi!</text>
    </g>
    <g class="bob" style="--d:-1.4s">
      <path d="M212 270 h58 a9 9 0 0 1 9 9 v18 a9 9 0 0 1 -9 9 h-8 l3 12 -16 -12 h-37 a9 9 0 0 1 -9 -9 v-18 a9 9 0 0 1 9 -9z" fill="#ffd23f"/>
      <g fill="#2a1d00"><rect x="220" y="281" width="44" height="5" rx="2"/><rect x="220" y="291" width="28" height="5" rx="2"/></g>
    </g>`, 'ENGLISH', 'TEACHER WEBSITE'),

  locked: (id) => frame(id, '#6b6580', `
    <defs>
      <pattern id="lNoise${id}" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="#0d0c12"/><rect x="1" y="2" width="2" height="2" fill="#1d1b26"/><rect x="5" y="5" width="2" height="2" fill="#18161f"/>
      </pattern>
      <radialGradient id="lSpot${id}" cx=".5" cy=".45" r=".5"><stop offset="0" stop-color="#7b5cff" stop-opacity=".18"/><stop offset="1" stop-color="#7b5cff" stop-opacity="0"/></radialGradient>
    </defs>
    <rect y="30" width="300" height="292" fill="url(#lNoise${id})"/>
    <rect y="30" width="300" height="292" fill="url(#lSpot${id})"/>
    <text x="150" y="176" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="54" fill="#3a3550">???</text>
    <g class="bob" style="--d:-.8s">
      <rect x="124" y="214" width="52" height="42" rx="6" fill="#2a2638" stroke="#3d3852" stroke-width="2"/>
      <path d="M134 214 v-13 a16 16 0 0 1 32 0 v13" fill="none" stroke="#3d3852" stroke-width="7"/>
      <circle cx="150" cy="232" r="5" fill="#0d0c12"/><rect x="148" y="234" width="4" height="10" fill="#0d0c12"/>
    </g>`, 'LOCKED', 'NEXT PROJECT'),
};

export const cover = (key, label) => {
  const id = `c${++uid}`;
  const draw = covers[key] || covers.locked;
  return `<svg class="cover" viewBox="0 0 300 400" role="img" aria-label="${label || 'Portada del juego'}">${draw(id)}</svg>`;
};
