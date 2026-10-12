# Sitios de muestra de Espartanos CSS

Cinco sitios de negocios ficticios para enseñar a clientes lo que hacemos, más una página portafolio.

| Sitio | Giro | Nivel |
|---|---|---|
| Fonda Lumbre | Restaurante | Básico |
| Dental Alba | Consultorio dental | Intermedio |
| Estudio Raíz | Pilates y yoga | Intermedio |
| Casa Cantera | Inmobiliaria | Premium (GSAP + Lenis) |
| Andante | Tienda de un producto | Tienda |

Para correrlo: `docker compose run --rm app npm run build` y luego
`docker compose run --rm -p 4173:4173 app npm run preview`, y abre http://localhost:4173.

Las fotos son de Unsplash (licencia libre); el detalle de cada una está en `CREDITOS.md`.
