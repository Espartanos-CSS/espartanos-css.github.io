# Espartanos CSS: sitios de muestra

Portafolio (`index.html` + `portafolio/`) y cinco sitios de negocios ficticios, cada uno en su carpeta
(`fonda-lumbre/`, `dental-alba/`, `estudio-raiz/`, `casa-cantera/`, `andante/`) con `index.html`,
`style.css`, `main.js`, `logic.js` (lógica pura, probada) e `img/`. Lo compartido vive en `shared/`.

## Comandos (todo en Docker)

- `docker compose run --rm app npm test`: build + pruebas (lógica de cada sitio y prueba de humo del build)
- `docker compose up`: servidor de desarrollo en http://localhost:5173
- `script/capturas.sh [sitio...]`: capturas en `capturas/` (celular y escritorio; `TOMAS=8` para varias por página)
- `script/fotos.sh`: vuelve a bajar las fotos de `script/fotos.txt` y regenera `CREDITOS.md`
- `docker compose run --rm app npm run fondos`: regenera los SVG estilo Haikei
- `script/openspec ...`: CLI de OpenSpec en contenedor (el Node del host es 18)

## Reglas

- Cada sitio es independiente a propósito; no extraer componentes compartidos.
- Todo botón que en un negocio real enviaría algo lleva `data-demo` y muestra un aviso.
- Cada sitio lleva el enlace `.aviso-muestra` a `../`.
- Fotos reales de Unsplash, nunca generadas. Cero guiones largos (la prueba de humo lo revisa).
- El WhatsApp de "Pide tu cotización" se configura en `shared/contacto.js`.
