# Tasks

## 1. Base del proyecto

- [x] 1.1 Crear Dockerfile, docker-compose.yml, package.json y vite.config.js multipágina; verificar que `docker compose run --rm app npm run build` genera `dist/`
- [x] 1.2 Escribir la prueba de humo del build (idioma, viewport, alt, imágenes existentes, sin guiones largos, aviso de muestra) y verificar que falla antes de que existan los sitios
- [x] 1.3 Crear `shared/` con el aviso de muestra y el aviso de acción simulada, y el script de fondos estilo Haikei; verificar que el script genera SVG válidos
- [x] 1.4 Descargar y convertir las fotos a WebP con crédito en el README; verificar que cada sitio tiene sus imágenes

## 2. Sitios

- [x] 2.1 Fonda Lumbre con pruebas de "abierto ahora"; verificar con `npm test`
- [x] 2.2 Dental Alba con pruebas de validación de cita; verificar con `npm test`
- [x] 2.3 Estudio Raíz con pruebas del filtro de clases por día; verificar con `npm test`
- [x] 2.4 Casa Cantera con Lenis y GSAP, y su versión apilada en celular; verificar a 360 px y 1440 px en capturas
- [x] 2.5 Andante con pruebas de total del carrito y cambio de color; verificar con `npm test`

## 3. Portafolio e integración

- [x] 3.1 Tomar capturas reales de cada sitio con Playwright y armar la página portafolio; verificar que la prueba de humo pasa completa
- [x] 3.2 Revisar cada sitio en capturas de celular y escritorio; verificar que no hay scroll horizontal ni textos cortados

## Workflow follow-up

- Con autorización: crear el repo en GitHub, el issue del cambio y publicar en GitHub Pages.
- Correr `/gstack-review` antes del PR y archivar el cambio cuando se integre.
