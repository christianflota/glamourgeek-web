#!/bin/sh
# Genera las versiones ligeras de las imágenes (requiere cwebp y sips, macOS).
# Volver a ejecutar después de añadir o cambiar una captura en assets/screenshots.
set -e
cd "$(dirname "$0")/../assets"

# Isotipo para nav y footer (se muestra a 32-36 px de alto)
cwebp -quiet -q 92 -alpha_q 100 -resize 0 96 glamourgeek-isotipo.png -o glamourgeek-isotipo-96.webp

# Favicons
sips -Z 64  glamourgeek-isotipo.png --out favicon-32.png >/dev/null
sips -Z 180 glamourgeek-isotipo.png --out apple-touch-icon.png >/dev/null

# Logo para schema.org (el original pesa ~450 KB)
sips -Z 800 glamourgeek-logo.png --out glamourgeek-logo-800.png >/dev/null

# Capturas del portafolio: tamaño completo y miniatura
for f in screenshots/*.jpg; do
  base="${f%.jpg}"
  cwebp -quiet -q 80 "$f" -o "$base.webp"
  cwebp -quiet -q 78 -resize 480 0 "$f" -o "$base-480.webp"
done
