#!/usr/bin/env python3
"""
Publica (o programa) un artículo del blog y, opcionalmente, sube su imagen.

Uso:
  python3 scripts/publicar_articulo.py articulo.json [imagen.webp]

articulo.json:
{
  "title": "...", "slug": "...", "content": "# Título\\n\\n...markdown...",
  "excerpt": "...", "metaTitle": "<=60", "metaDescription": "<=160",
  "categories": ["..."], "tags": ["..."],
  "publishAt": "2026-11-20T08:00:00.000Z"   # 09:00 Madrid (CET=UTC+1, CEST=UTC+2)
}

La imagen se guarda en la BD (POST /api/media) y se sirve en
https://www.velasegalaviladecans.com/media/<slug>.webp
La cabecera x-api-key la inyecta el proxy del entorno (o variable API_KEY).
"""
import base64, json, os, sys, urllib.request, urllib.error

API = os.environ.get("API_URL", "https://velasegala-web-production.up.railway.app/api")
SITE = "https://www.velasegalaviladecans.com"


def req(method, path, body):
    headers = {"Content-Type": "application/json"}
    if os.environ.get("API_KEY"):
        headers["x-api-key"] = os.environ["API_KEY"]
    r = urllib.request.Request(API + path, data=json.dumps(body).encode(), method=method, headers=headers)
    try:
        with urllib.request.urlopen(r, timeout=120) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code} en {path}: {e.read().decode()[:500]}")


def main():
    art = json.load(open(sys.argv[1]))
    for k in ("title", "slug", "content", "excerpt", "metaTitle", "metaDescription", "publishAt"):
        assert art.get(k), f"Falta el campo {k}"
    assert len(art["metaTitle"]) <= 60, "metaTitle > 60 caracteres"
    assert len(art["metaDescription"]) <= 160, "metaDescription > 160 caracteres"

    if len(sys.argv) > 2:
        img = sys.argv[2]
        filename = f"{art['slug']}.webp"
        up = req("POST", "/media", {
            "filename": filename,
            "mimeType": "image/webp",
            "data": base64.b64encode(open(img, "rb").read()).decode(),
            "alt": art["title"],
        })
        art["featuredImage"] = f"{SITE}{up['path']}"
        print("Imagen subida:", art["featuredImage"], up.get("size"), "bytes")

    art.setdefault("publishStatus", "published")
    post = req("POST", "/webhooks/n8n/blog-post", art)
    print("Artículo creado:", post["id"], post["slug"], post["publishStatus"], post["publishAt"])
    print("URL:", f"{SITE}/blog/{post['slug']}")


if __name__ == "__main__":
    main()
