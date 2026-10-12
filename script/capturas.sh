#!/bin/sh
# Construye y toma capturas con Chromium dentro de Docker. Ej: script/capturas.sh fonda-lumbre
cd "$(dirname "$0")/.." || exit 1
docker compose run --rm app npm run -s build -- --logLevel error || exit 1
docker build -q -t espartanos-capturas -f script/Dockerfile.capturas script >/dev/null || exit 1
exec docker run --rm --ipc=host -e REDUCIDO -e SOLO_PANTALLA -e TOMAS -e TAMANOS -v "$PWD":/w -w /w espartanos-capturas node /w/script/capturas.cjs "$@"
