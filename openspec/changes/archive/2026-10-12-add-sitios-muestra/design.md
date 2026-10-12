# Design

## Context

Proyecto nuevo. Los sitios se ven desde una liga pública gratuita, sin servidor, así que el resultado final debe ser HTML estático. Ver proposal.md para el porqué.

## Goals / Non-Goals

**Goals:**
- Que cada muestra tenga identidad propia; nadie debe sentir que son la misma plantilla con otro color.
- Que el nivel premium se note por el movimiento y el básico por lo rápido y limpio.
- Que un sitio sea fácil de copiar como punto de partida para un cliente real.

**Non-Goals:**
- Backend, pagos o formularios que envíen datos.
- Un sistema de componentes compartido entre sitios: cada muestra es independiente a propósito.

## Decisions

**HTML, CSS y JS sin framework, con Vite multipágina.** En la conversación propuse React; lo cambié porque estas páginas casi no tienen estado, React agrega peso que se nota en celulares baratos, y un sitio en HTML plano es más fácil de entregar o adaptar para un cliente. Las librerías React de la nota (Aceternity, React Bits) quedan fuera; GSAP y Lenis funcionan igual sin React.

**Una carpeta por sitio** (`fonda-lumbre/`, `dental-alba/`, `estudio-raiz/`, `casa-cantera/`, `andante/`), cada una con su `index.html`, `style.css`, `main.js` e `img/`. Lo único compartido es el aviso de muestra y el aviso de acción simulada (`shared/`). `base: './'` en Vite para que funcione en cualquier subcarpeta (GitHub Pages).

**Lógica pura separada del DOM** (`logic.js` por sitio: horario abierto, validación de cita, filtro de clases, total del carrito). Así se prueba con `node:test` sin navegador.

**Movimiento por nivel.** Fonda Lumbre: solo CSS. Dental Alba y Estudio Raíz: revelados suaves con IntersectionObserver. Andante: GSAP ligero en la galería. Casa Cantera: Lenis + GSAP ScrollTrigger (paneo horizontal fijado y revelado del hero). Todo se apaga con `prefers-reduced-motion`.

**Fondos estilo Haikei generados por script** (`script/haikei.mjs`): Haikei es una app web sin API, así que un script determinista produce olas y manchas en SVG con la paleta de cada sitio. Se pueden reemplazar por exportaciones reales de Haikei sin tocar el HTML.

**Fotos reales de Unsplash**, descargadas y convertidas a WebP dentro de Docker, guardadas en el repo con crédito en el README. Nada de imágenes generadas.

**Fuentes autoalojadas con @fontsource** e íconos Phosphor por npm: no dependen de Google ni de un CDN.

**Vistas previas del portafolio**: capturas reales de cada sitio tomadas con Playwright en un contenedor.

## Risks / Trade-offs

- [Fotos de stock que no son de México en algunos giros] → se eligieron las más neutras; se cambian por fotos del cliente real cuando haya uno.
- [El paneo horizontal puede marear o fallar en móviles] → solo se activa en pantallas de 768 px o más y sin movimiento reducido.
- [Publicar en GitHub Pages hace público el repo] → se pide autorización antes de crear el repo remoto.

## Migration Plan

Build con `docker compose run --rm app npm run build` y publicación de `dist/` en GitHub Pages con una GitHub Action, una vez autorizada la creación del repo.
