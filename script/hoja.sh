#!/bin/sh
# Junta capturas en una sola hoja: script/hoja.sh salida.png columnas ancho alto archivos...
cd "$(dirname "$0")/../capturas" || exit 1
salida=$1 cols=$2 w=$3 h=$4; shift 4
docker run --rm -v "$PWD":/c -w /c alpine:3.20 sh -c 'apk add -q --no-cache imagemagick font-dejavu >/dev/null; s=$1 c=$2 g=$3; shift 3; magick montage "$@" -font DejaVu-Sans -tile ${c}x -geometry $g -background "#888" "$s"' sh "$salida" "$cols" "${w}x${h}+4+4" "$@"
