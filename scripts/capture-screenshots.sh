#!/bin/sh
# Recaptura la portada de cada proyecto del portafolio (1440x900) con Chrome
# sin interfaz y regenera las versiones WebP. Requiere Google Chrome, sips y cwebp.
# Uso: sh scripts/capture-screenshots.sh [id ...]   (sin argumentos: todos)
set -e
cd "$(dirname "$0")/.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="assets/screenshots"
PROFILE="$(mktemp -d)"
trap 'rm -rf "$PROFILE"' EXIT

# id del proyecto en data.jsx | URL que se captura | "alto" si el sitio muestra un
# aviso de cookies fijo abajo: se captura más alto y se recorta a 900 px.
LIST="daypass|https://www.daypass.mx/|alto
agenciashub|https://www.agenciashub.com/
travel-design|https://www.tdbyanarivera.com/
1app-referee|https://1appreferee.com/|alto
dron-film|https://www.dronfilmstudio.com/
soem|https://soempg.com/
tubarber|https://tubarber.pro/
model-manager|https://www.modelmanager.mx/
adminfy|https://www.adminfy.mx/
hielo-aspe|https://www.hieloaspe.mx/
gvi|https://www.seguridadprivadagvi.com/"

echo "$LIST" | while IFS='|' read -r id url mode; do
  if [ $# -gt 0 ]; then case " $* " in *" $id "*) ;; *) continue ;; esac; fi
  echo "→ $id: $url"
  height=900
  [ "$mode" = "alto" ] && height=1500
  "$CHROME" --headless=new --user-data-dir="$PROFILE" --no-first-run --disable-gpu \
    --hide-scrollbars --window-size=1440,$height --virtual-time-budget=15000 --timeout=45000 \
    --screenshot="$OUT/$id.png" "$url" >/dev/null 2>&1 || true
  if [ ! -s "$OUT/$id.png" ]; then
    echo "  ✗ no se pudo capturar; se conserva la imagen anterior"
    continue
  fi
  [ "$mode" = "alto" ] && sips --cropOffset 1 1 --cropToHeightWidth 900 1440 "$OUT/$id.png" >/dev/null
  sips -s format jpeg -s formatOptions 85 "$OUT/$id.png" --out "$OUT/$id.jpg" >/dev/null
  rm -f "$OUT/$id.png"
  echo "  ✓ $id.jpg"
done

sh scripts/optimize-images.sh
