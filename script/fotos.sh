#!/bin/sh
# Descarga las fotos de Unsplash listadas en script/fotos.txt y las guarda como WebP
# en <sitio>/img/. Corre dentro de Docker: script/fotos.sh
if [ -z "$EN_CONTENEDOR" ]; then
  cd "$(dirname "$0")/.." || exit 1
  exec docker run --rm -e EN_CONTENEDOR=1 -v "$PWD":/w -w /w alpine:3.20 sh script/fotos.sh
fi
apk add -q --no-cache curl imagemagick imagemagick-jpeg imagemagick-webp >/dev/null
echo "| Sitio | Archivo | Foto en Unsplash | Autor (archivo de descarga) |" > CREDITOS.md
echo "|---|---|---|---|" >> CREDITOS.md
grep -v '^#' script/fotos.txt | while read sitio nombre id ancho; do
  [ -z "$id" ] && continue
  mkdir -p "$sitio/img"
  tmp="/tmp/$id.jpg"
  final=$(curl -s -L -o "$tmp" -w "%{url_effective}" "https://unsplash.com/photos/$id/download?force=true&w=$ancho" < /dev/null)
  autor=$(echo "$final" | sed -n 's/.*dl=\([a-z0-9-]*\)-'"$id"'-unsplash.*/\1/p')
  magick "$tmp" -strip -quality 72 "$sitio/img/$nombre.webp"
  echo "| $sitio | $nombre.webp | https://unsplash.com/photos/$id | $autor |" >> CREDITOS.md
  echo "ok $sitio/$nombre"
done
chown -R "$(stat -c %u:%g /w)" /w/*/img /w/CREDITOS.md
