#!/usr/bin/env python3
"""
Consolidación del blog (idempotente). Requiere el backend desplegado con
PATCH /api/webhooks/posts/:id y la cabecera x-api-key (N8N_API_KEY).

1. Pasa a DRAFT los artículos duplicados listados en frontend/blog-redirects.js
   (las URLs ya redirigen con 301, así que no se pierde tráfico).
2. Asigna imagen destacada y meta title optimizado a los 9 artículos canónicos.

Uso:  python3 scripts/blog_consolidacion.py [--dry-run]
      (variable opcional API_KEY si no hay proxy que inyecte la cabecera)
"""
import json, os, re, sys, urllib.request, pathlib

API = os.environ.get("API_URL", "https://velasegala-web-production.up.railway.app/api")
SITE = "https://www.velasegalaviladecans.com"
DRY = "--dry-run" in sys.argv
ROOT = pathlib.Path(__file__).resolve().parent.parent

CANONICOS = {
    "blanqueamiento-dental-mitos-verdades": "Blanqueamiento dental: mitos y verdades | Vela-Segalà",
    "higiene-dental-diaria": "Higiene dental diaria: la rutina correcta paso a paso",
    "urgencias-dentales-comunes": "Urgencias dentales: qué hacer en cada caso | Viladecans",
    "cuidados-ortodoncia-invisible": "Cuidados tras la ortodoncia invisible: retenedores y más",
    "cuando-llevar-hijo-dentista": "¿Cuándo llevar a un niño al dentista por primera vez?",
    "prevencion-caries-ninos": "Cómo prevenir las caries en niños: guía para padres",
    "consejos-encias-sanas": "Cómo tener encías sanas: consejos de tu dentista",
    "protesis-dentales-tipos-ventajas": "Tipos de prótesis dentales y ventajas de cada una",
    "bruxismo-causas-tratamiento": "Bruxismo: causas, síntomas y tratamiento | Viladecans",
}


def req(method, path, body=None):
    headers = {"Content-Type": "application/json"}
    if os.environ.get("API_KEY"):
        headers["x-api-key"] = os.environ["API_KEY"]
    data = json.dumps(body).encode() if body is not None else None
    r = urllib.request.Request(API + path, data=data, method=method, headers=headers)
    with urllib.request.urlopen(r, timeout=60) as resp:
        return json.loads(resp.read())


def main():
    js = (ROOT / "frontend" / "blog-redirects.js").read_text()
    duplicados = set(re.findall(r"\['([^']+)',", js))
    posts = req("GET", "/posts?status=ALL&limit=500")["data"]
    for p in posts:
        slug = p["slug"]
        if slug in duplicados and p["publishStatus"] != "DRAFT":
            print("DRAFT   ", slug)
            if not DRY:
                req("PATCH", f"/webhooks/posts/{p['id']}", {"publishStatus": "DRAFT"})
        elif slug in CANONICOS:
            img = f"{SITE}/images/blog/{slug}.webp"
            cambios = {}
            if p.get("featuredImage") != img:
                cambios["featuredImage"] = img
            if p.get("metaTitle") != CANONICOS[slug]:
                cambios["metaTitle"] = CANONICOS[slug]
            if cambios:
                print("UPDATE  ", slug, list(cambios))
                if not DRY:
                    req("PATCH", f"/webhooks/posts/{p['id']}", cambios)
    print("OK")


if __name__ == "__main__":
    main()
