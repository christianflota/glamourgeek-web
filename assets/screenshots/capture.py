#!/usr/bin/env python3
from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

PROJECTS = [
    ("daypass",      "https://www.daypass.mx/"),
    ("agenciashub",  "https://www.agenciashub.com/"),
    ("tdbyanarivera","https://www.tdbyanarivera.com/"),
    ("1appreferee",  "https://1appreferee.com/"),
    ("dronfilm",     "https://www.dronfilmstudio.com/"),
    ("soempg",       "https://soempg.com/"),
    ("tubarber",     "https://tubarber.pro/"),
    ("modelmanager", "https://www.modelmanager.mx/"),
    ("adminfy",      "https://www.adminfy.mx/"),
    ("hieloaspe",    "https://www.hieloaspe.mx/"),
    ("seguridadgvi", "https://www.seguridadprivadagvi.com/"),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    for slug, url in PROJECTS:
        out = os.path.join(OUTPUT_DIR, f"{slug}.jpg")
        print(f"→ {slug}: {url}")
        try:
            page.goto(url, wait_until="networkidle", timeout=30000)
            page.wait_for_timeout(2000)
            page.screenshot(path=out, type="jpeg", quality=85, full_page=False)
            print(f"  ✓ saved {slug}.jpg")
        except Exception as e:
            print(f"  ✗ error: {e}")
            # Try a simpler load
            try:
                page.goto(url, wait_until="domcontentloaded", timeout=20000)
                page.wait_for_timeout(3000)
                page.screenshot(path=out, type="jpeg", quality=85, full_page=False)
                print(f"  ✓ saved {slug}.jpg (fallback)")
            except Exception as e2:
                print(f"  ✗ fallback also failed: {e2}")

    browser.close()
    print("Done.")
