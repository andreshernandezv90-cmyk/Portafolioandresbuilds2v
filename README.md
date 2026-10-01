# ANDRES BUILDS — A.B. ARCADE SYSTEM v3

Portafolio interactivo de **Andrés Hernández**, Creative Web Developer (Guadalajara, MX).
Dominio: [andresbuilds.dev](https://andresbuilds.dev) · Contacto: hola@andresbuilds.dev

> El portafolio no habla sobre videojuegos. El portafolio se comporta como uno.
> **VISUALLY CRAZY. FUNCTIONALLY SIMPLE.**

## Stack

- HTML + CSS + JavaScript (ES modules) **sin build step**. Se sube tal cual a Netlify o GitHub Pages.
- Cero imágenes: gabinetes, portadas y escenas son CSS + SVG inline.
- SFX sintetizados con WebAudio (sin archivos de audio, **OFF por defecto**).
- Fuentes self-hosted (woff2, ~52 KB en total, licencia OFL).
- Paneles cargados bajo demanda (`import()` dinámico = code splitting).

## Correr en local

```bash
npx http-server -p 8080 -c-1 .
# abrir http://localhost:8080
```

(Los ES modules no funcionan con `file://`; hace falta cualquier servidor estático, XAMPP también sirve.)

## Estructura

```
index.html            entrada (Arcade + Handheld + Quick Mode)
404.html              GAME OVER · CONTINUE? YES / NO
_headers              cabeceras de seguridad (CSP, etc.) para Netlify
css/
  base.css            tokens, HUD, toasts, monedas, FX OFF / reduced motion
  boot.css            BOOTING → INSERT COIN → PRESS START
  hub.css             sala arcade + gabinetes + attract mode
  handheld.css        consola portátil (móvil ≤ 760px)
  screen.css          pantalla "dentro de la máquina" + estilos de cada sección
  quick.css           Quick Mode
js/
  data/               ← TODO el contenido vive aquí
  core/               estado, sonido, toasts, helpers
  ui/                 boot, hub, handheld, HUD, pantalla, secretos, Quick Mode
  panels/             una sección por archivo (se cargan bajo demanda)
```

## Cómo hacer crecer el sitio (sin rehacerlo)

Todo el contenido está en `js/data/`. Arcade, Handheld y Quick Mode leen los mismos datos.

| Quiero…                        | Editar                                                                 |
|--------------------------------|------------------------------------------------------------------------|
| **NEW GAME UNLOCKED** (proyecto) | `js/data/projects.js` → agregar objeto. `featured: true` para FEATURED GAMES (máx. 6). Con más proyectos que destacados aparece **VIEW FULL LIBRARY** automáticamente. |
| Portada de un proyecto         | `js/ui/covers.js` (SVG) o `screenshots: ['assets/projects/x.webp']`    |
| Case Study                     | `caseStudy: { mission, client, challenge, role, tech: [], development, bosses: [{ name, problem, strategy }], strategy, result }` |
| Botón LIVE / SOURCE CODE       | `liveUrl` / `repoUrl` (solo si el repo es público)                     |
| Skill nueva / cambiar estado   | `js/data/skills.js` (`unlocked` · `learning` · `next`) y `projects: ['id']` donde se usó |
| Nuevo capítulo de historia     | `js/data/story.js` (solo uno con `current: true`)                      |
| Servicio                       | `js/data/missions.js`                                                  |
| Achievement profesional real   | `js/data/achievements.js` → `kind: 'career'`, `unlocked: true`         |
| Avatar pixel-art               | `js/data/profile.js` → `avatar: 'assets/avatar.webp'`                  |
| CURRENTLY PLAYING (Dev Room)   | `js/data/profile.js` → `devRoom.playing`                               |

Regla de oro: **no inventar**. Si falta información → `COMING SOON`, `LOCKED`, `IN DEVELOPMENT`.

## Sistemas de juego

- **Monedas (5)**: hub, Project Select, Skill Tree, Save Files, Player Two. 5/5 → achievement COIN COLLECTOR + abre la puerta **STAFF ONLY → ANDRÉS' DEV ROOM**.
- **Secrets** (`SECRETS FOUND: n / ???` — el total nunca se revela): Konami code (DEV MODE), PLAYER 1 ×5, OUT OF ORDER insistente, consola del navegador, créditos (© en la esquina).
- **Achievements**: COIN COLLECTOR, BUG HUNTER, CURIOUS PLAYER, CODE EXPLORER, LOOKING UNDER THE HOOD + FIRST CLIENT (IN PROGRESS).
- **Bug Hunter**: minijuego de segundos dentro de OUT OF ORDER. Sin game over.
- **AFK**: 75 s inactivo en el hub → "PLAYER 1... ARE YOU STILL THERE?" → "PLAYER 1 RETURNED".
- El progreso se guarda en `localStorage` (Achievements → RESET PROGRESS).

## Accesibilidad y rendimiento

- **Quick Mode** siempre disponible (HUD, tecla `Q`, skip-link, pantalla de arranque, SELECT en la consola portátil, `/#/quick`).
- Navegación completa por teclado: `← →` entre máquinas, `Enter` para entrar, `Esc` para salir; el foco regresa a la máquina.
- `prefers-reduced-motion` y **FX OFF** desactivan animaciones y transiciones. **SOUND OFF** por defecto, nunca hay música automática.
- Deep links: `/#/projects`, `/#/profile`, `/#/skills`, `/#/saves`, `/#/missions`, `/#/contact`.
- `<noscript>` con la información esencial, JSON-LD `Person`, sitemap y robots.

## Publicar en andresbuilds.dev

- **Netlify**: arrastrar la carpeta o conectar el repo (sin build command, publish dir `.`). `_headers` y `404.html` se aplican solos.
- **GitHub Pages**: Settings → Pages → rama principal / root. Para el dominio propio, agregar un archivo `CNAME` con `andresbuilds.dev` y configurar el DNS. (`404.html` usa rutas absolutas `/…`, pensadas para servirse en la raíz del dominio.)

## Pendientes (siguientes versiones)

- Avatar pixel-art de Andrés · imagen Open Graph (PNG 1200×630).
- Screenshots reales y Case Studies cuando los proyectos estén terminados.
- Seguir afinando gabinetes y arte propio de cada máquina.
