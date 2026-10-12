# Sitios de muestra (add-sitios-muestra)

## Qué funcionó

- Separar la lógica de cada sitio en `logic.js` (horario abierto, validación de cita, filtro de clases, carrito) permitió probarla con `node:test` sin navegador. Las pruebas atraparon los casos raros (domingo, teléfono con paréntesis) antes de ver la página.
- La prueba de humo sobre `dist/` (idioma, viewport, alt, rutas, guiones largos, aviso de muestra, favicón) cuida reglas que se olvidan fácil. Agregar una regla nueva ahí cuesta una línea.
- Capturas con Chromium en Docker (`script/capturas.sh`, `TOMAS=` y `TAMANOS=`) para revisar celular y escritorio sin abrir nada a mano. A 360 px salieron problemas que a 390 px no se notaban.
- Fotos de Unsplash bajadas con su liga pública de descarga (`/photos/<id>/download`) y convertidas a WebP en un contenedor; `CREDITOS.md` se regenera con el script.

## Qué salió mal

- `package-lock.json` generado con `node_modules` ya instalados solo guardó los binarios nativos de linux-musl (rolldown, lightningcss). `npm ci` habría fallado en GitHub Actions y en la Mac con chip Apple. Regenerarlo en un contenedor limpio con `--package-lock-only` incluye todas las plataformas.
- En Andante el cambio de foto esperaba al `onComplete` de GSAP; en pestañas en segundo plano el navegador pausa las animaciones y la foto no cambiaba. El estado debe cambiar primero y la animación ir encima.
- Una regla de CSS con `display` le ganaba al atributo `hidden` y la confirmación de cita se veía antes de enviar. Cada hoja de estilo lleva `[hidden] { display: none !important; }`.
- "Abierto ahora" usaba la hora de quien visita; se corrigió a `America/Mexico_City`.
- Las capturas de página completa con scroll suave (`scroll-behavior: smooth`, Lenis, paneo fijado) salían con secciones en blanco; hay que desactivar el scroll suave en el script y tomar varias capturas de pantalla en vez de una completa.
- El modo automático de Claude Code bloquea crear o transferir repos públicos: esos pasos se le dan a Enrique como script para correr con `!`.

## Decisiones

- HTML, CSS y JS sin framework con Vite multipágina, no React: casi no hay estado, pesa menos en celulares baratos y es más fácil entregar o adaptar a un cliente.
- Cada sitio independiente a propósito; lo único compartido es el aviso de muestra (`shared/`).
- Movimiento según nivel: básico solo CSS, intermedio revelados con IntersectionObserver, premium Lenis + GSAP ScrollTrigger; todo se apaga con `prefers-reduced-motion`.
- Fondos estilo Haikei generados por `script/haikei.mjs` porque Haikei no tiene API.
- Publicación en GitHub Pages desde la organización `Espartanos-CSS` (repo `espartanos-css.github.io`), con despliegue automático en cada merge a `main`.
