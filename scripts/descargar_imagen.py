#!/usr/bin/env python3
"""Descarga una imagen (p.ej. resultado de Higgsfield) y la convierte a WebP 16:9 optimizado.
Uso: python3 -I scripts/descargar_imagen.py <url> <destino.webp>"""
import io, sys, urllib.request
from PIL import Image

url, dest = sys.argv[1], sys.argv[2]
im = Image.open(io.BytesIO(urllib.request.urlopen(url, timeout=60).read())).convert("RGB")
im.thumbnail((1600, 900))
im.save(dest, "WEBP", quality=80, method=6)
print(dest, im.size)
