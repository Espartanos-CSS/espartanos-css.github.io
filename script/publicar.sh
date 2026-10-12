#!/bin/sh
# Publica los sitios de muestra en GitHub Pages (cuenta Fercho-Barrera).
# Crea el repo público, el issue, el PR, lo fusiona y activa Pages. Uso: script/publicar.sh
set -e
cd "$(dirname "$0")/.."

REPO=Fercho-Barrera/espartanos-muestras

echo "1/6 Creando el repositorio público $REPO"
gh repo create "$REPO" --public --description "Sitios web de muestra de Espartanos CSS" --source . --remote origin
git push -q origin main

echo "2/6 Activando GitHub Pages"
gh api -X POST "repos/$REPO/pages" -f build_type=workflow >/dev/null

echo "3/6 Creando el issue"
ISSUE_URL=$(gh issue create -R "$REPO" \
  --title "add-sitios-muestra: portafolio y cinco sitios de muestra" \
  --body "Propuesta: openspec/changes/add-sitios-muestra/proposal.md")
NUM=${ISSUE_URL##*/}

echo "4/6 Subiendo la rama $NUM-sitios-muestra"
git branch -m add-sitios-muestra "$NUM-sitios-muestra"
git push -q -u origin "$NUM-sitios-muestra"

echo "5/6 Abriendo y fusionando el PR"
gh pr create -R "$REPO" --base main --head "$NUM-sitios-muestra" \
  --title "Portafolio y cinco sitios de muestra" \
  --body "Portafolio de Espartanos CSS y cinco sitios de negocios ficticios (restaurante, consultorio, estudio de pilates, inmobiliaria y tienda de un producto). 36 pruebas pasan.

Closes #$NUM"
gh pr merge -R "$REPO" "$NUM-sitios-muestra" --merge

echo "6/6 Esperando a que GitHub publique (2 a 3 minutos)"
sleep 20
gh run watch -R "$REPO" "$(gh run list -R "$REPO" --workflow pages.yml --limit 1 --json databaseId -q '.[0].databaseId')" --exit-status >/dev/null
git checkout -q main && git pull -q

echo
echo "Listo: https://fercho-barrera.github.io/espartanos-muestras/"
