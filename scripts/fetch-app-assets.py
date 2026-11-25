#!/usr/bin/env python3
"""Descarga el icono y la primera captura de cada app publicada desde la ficha
pública de App Store y los convierte a WebP en assets/apps/.

Uso: python3 scripts/fetch-app-assets.py   (requiere cwebp)
Los ids son los de App Store; el nombre de archivo es el id del portafolio.
"""
import json, os, subprocess, tempfile, urllib.request

APPS = {
    "soem-pg": 6762004834,
    "travel-design-app": 6761188502,
    "ofase": 6741083864,
    "lmt": 6742457451,
}
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "apps")
os.makedirs(OUT, exist_ok=True)

ids = ",".join(str(i) for i in APPS.values())
with urllib.request.urlopen(f"https://itunes.apple.com/lookup?id={ids}&country=mx", timeout=30) as r:
    results = {item["trackId"]: item for item in json.load(r)["results"]}

def to_webp(url, dest, resize):
    with tempfile.NamedTemporaryFile(suffix=".img") as tmp:
        with urllib.request.urlopen(url, timeout=30) as r:
            tmp.write(r.read())
        tmp.flush()
        subprocess.run(["cwebp", "-quiet", "-q", "82", "-resize", *resize, tmp.name, "-o", dest], check=True)

for slug, track_id in APPS.items():
    app = results.get(track_id)
    if not app:
        print(f"✗ {slug}: no aparece en App Store")
        continue
    to_webp(app["artworkUrl512"], os.path.join(OUT, f"{slug}-icon.webp"), ["192", "192"])
    shots = app.get("screenshotUrls") or []
    if shots:
        to_webp(shots[0], os.path.join(OUT, f"{slug}-1.webp"), ["420", "0"])
    print(f"✓ {slug}: {app['trackName']} v{app['version']} · {app['trackViewUrl'].split('?')[0]}")
