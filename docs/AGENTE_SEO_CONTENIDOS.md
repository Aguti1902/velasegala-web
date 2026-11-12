# Agente SEO y de contenidos: procedimiento semanal

Este documento es el **manual de trabajo** de la tarea programada que cada semana
publica 3 artículos en el blog y envía un informe SEO de www.velasegalaviladecans.com.
Sustituye al antiguo flujo de n8n, que dejó de funcionar en abril de 2026.

## Arquitectura: 3 agentes programados

| Agente | Cuándo se ejecuta | Qué hace |
|---|---|---|
| **1. Contenidos** | Lunes y jueves, 18:43 | Mantiene siempre **al menos 3 artículos programados** en el calendario lunes/miércoles/viernes a las 09:00. Investiga keywords, redacta, genera imágenes y programa. Al ejecutarse dos veces por semana, si una ejecución falla la siguiente recupera el hueco. |
| **2. Informe SEO semanal** | Lunes, 10:17 | Posiciones de las keywords de seguimiento, visibilidad, tráfico (Search Console si está conectado), artículos publicados, estado técnico y de 3 a 5 tareas priorizadas. Lo envía por email. |
| **3. Auditoría mensual** | Día 2 de cada mes, 10:37 | Auditoría técnica (`audit_site`), análisis de competencia y gap de keywords, revisión de los artículos que pierden posiciones (propone o hace un *refresh*) y actualización del backlog de temas. Lo envía por email. |

Publicación: los artículos se crean con `publishStatus: published` y `publishAt` a las 09:00 de
Madrid. **La hora va en UTC**: 08:00Z en horario de invierno (CET, de finales de octubre a
finales de marzo) y 07:00Z en horario de verano (CEST). La API pública solo muestra
artículos cuya fecha ya ha llegado, así que aparecen solos en el blog y en el sitemap
(el listado tarda como mucho 5 minutos por la caché).

## Contexto del sitio (noviembre de 2026)

- Clínica Dental Vela-Segalà, Carrer de la Mare de Déu de Sales, 67, 08840 Viladecans.
  Tel. 93 658 84 06 · WhatsApp 644 10 42 57. Primera visita gratuita. Urgencias sin recargo.
- Frontend: Next.js en Vercel. Backend: NestJS + Postgres en Railway
  (`https://velasegala-web-production.up.railway.app/api`).
- Punto de partida: **6 keywords posicionadas** y unas 73 visitas orgánicas estimadas al mes.
  "dentista viladecans" (590/mes) está en la posición 14. Ningún artículo del blog posicionaba.
- Causa principal: el flujo de n8n publicó 64 artículos sobre solo 13 temas (duplicados
  `-1`, `-2`... `-5`), con imágenes temporales que caducaron. En noviembre de 2026 se
  consolidaron en 9 artículos canónicos con 301 (ver `frontend/blog-redirects.js`).

## Reglas editoriales (obligatorias)

1. **Un tema = un artículo.** Antes de escribir, descarga la lista de slugs existentes
   (`GET /api/posts?status=ALL&limit=500`) y revisa `frontend/blog-redirects.js`. Si el
   tema ya existe, no crees un duplicado: propón en el informe ampliar el existente.
2. **No canibalizar las páginas de dinero.** Las búsquedas transaccionales locales
   ("implantes dentales viladecans", "ortodoncia invisible viladecans", "dentista
   viladecans"...) son de la home y de `/tratamientos/*`. El blog ataca búsquedas
   **informativas** (síntomas, dudas, precios orientativos, comparativas, cuidados) y
   **enlaza** a la página de tratamiento correspondiente.
3. Extensión de 1.100 a 1.800 palabras, en markdown:
   - Empieza con `# Título` (la web lo oculta, porque el H1 lo pinta la plantilla).
   - Estructura `##` / `###` y una keyword principal en el título, en el primer párrafo y en un H2.
   - Al menos **2 enlaces internos** a `/tratamientos/...` y 1 a otro artículo del blog.
   - Sección final `## Preguntas frecuentes` con 4 o 5 `### ¿Pregunta?` y su respuesta
     (la web genera el schema FAQPage automáticamente a partir de ella).
   - Cierre con CTA local: dirección, teléfono y enlace a `/pedir-cita`.
4. **Salud (YMYL):** nada de dosis concretas de medicamentos, nada de prometer resultados
   y nada de inventar datos de la clínica (precios propios, años, número de pacientes,
   aseguradoras). Los precios de mercado siempre como "rango orientativo en España".
   Recomienda siempre la valoración profesional.
5. `metaTitle` de 60 caracteres como máximo, `metaDescription` de 160 como máximo y slug
   en minúsculas, sin acentos y sin números de versión.
6. Categorías existentes: Salud Bucodental, Tratamientos, Higiene Dental, Ortodoncia,
   Estética Dental, Prevención, Urgencias Dentales, Cirugía Oral. Pon de 2 a 4 tags.
7. Imagen: fotografía editorial realista en 16:9, sin texto ni logos (Higgsfield
   `gpt_image_2_6`, 0,25 créditos). Usa `scripts/descargar_imagen.py` y súbela con
   `scripts/publicar_articulo.py`, que la guarda en la BD y la sirve en `/media/<slug>.webp`.

## Rutina del agente de contenidos paso a paso

1. `git pull` y lee este documento.
2. **Datos:** con OpenRush (ubicación Spain, idioma Spanish):
   - `inspect_domain` de `velasegalaviladecans.com`: keywords, posiciones y competidores.
   - `inspect_search_visibility` con las keywords de seguimiento (ver más abajo).
   - `research_keywords` sobre 2 o 3 semillas del backlog para elegir los temas de la semana.
   - Si `get_search_performance` está disponible para el dominio (Search Console
     conectado en OpenRush), úsalo para clics e impresiones reales.
3. **Elige 3 temas**, con volumen y dificultad razonables, sin repetir temas ni canibalizar.
   Si es posible, mezcla 1 de urgencia o síntoma, 1 de precio o comparativa y 1 de prevención.
4. Redacta los 3 artículos y genera las 3 imágenes.
5. Publica con `python3 -I scripts/publicar_articulo.py art.json imagen.webp` en los
   siguientes huecos libres lunes/miércoles/viernes a las 09:00 Madrid, después del último
   artículo ya programado. El script sube la imagen y "calienta" la caché de la página.
6. **Comprobaciones técnicas** (con curl): la home, `/blog`, `/sitemap.xml`, `robots.txt`
   y una página de tratamiento devuelven 200; los artículos programados la semana anterior
   aparecen en `/blog` y en el sitemap; sus imágenes cargan.
7. Si los duplicados siguen publicados, ejecuta `python3 -I scripts/blog_consolidacion.py`
   (es idempotente).
8. Resumen final en la sesión (el informe completo lo envía el agente 2). Ni commits ni PRs, salvo que se pida.

## Rutina del agente de auditoría mensual

1. `audit_site` de www.velasegalaviladecans.com y lista de problemas técnicos priorizados.
2. `compare_keyword_coverage` contra 3 a 5 competidores locales: keywords que ellos tienen y nosotros no.
3. `inspect_page` de los artículos con más de 60 días: si un artículo tiene impresiones pero
   posición entre 8 y 30, haz un *refresh*. Amplía secciones, añade FAQs y enlaces internos, y
   actualízalo con `PATCH /api/webhooks/posts/:id`. Como máximo 2 por mes.
4. Propón 10 temas nuevos para el backlog y envía el informe mensual por email.

## Keywords de seguimiento

dentista viladecans · dentista en viladecans · clínica dental viladecans · implantes
dentales viladecans · ortodoncia invisible viladecans · invisalign viladecans ·
blanqueamiento dental viladecans · urgencias dentales viladecans · dentista gavà ·
dentista sant boi · odontopediatra barcelona · dolor de muelas · muela del juicio infectada ·
funda dental precio

## Backlog de temas (volumen mensual en España, noviembre de 2026)

Publicados en noviembre de 2026: dolor de muelas (qué tomar), muela del juicio infectada
y funda dental (precio).

| Tema | Keyword principal | Vol. | Enlaza a |
|---|---|---|---|
| Diastema (separación entre dientes) | diastema dental | 720 | ortodoncia, estética |
| Precio de la reconstrucción dental | reconstruccion dental precios | 590 | estética, endodoncia |
| Dientes desgastados | abrasion dental | 480 | estética, bruxismo |
| TAC dental: para qué sirve y precio | tac dental precio | 480 | implantes, cirugía oral |
| Férula de descarga: tipos y precio | ferulas dentales precios | 390 | bruxismo |
| Precio del empaste dental | precio de empaste dental | 320 | limpieza, endodoncia |
| Radiografía dental | radiografía dental precio | 260 | urgencias |
| Encía inflamada en una muela | inflamacion encia muela | 210 | periodoncia |
| Flemón dental: qué hacer | flemón dental | investigar | urgencias |
| Sangrado de encías | sangrado de encías | investigar | periodoncia |
| Mal aliento (halitosis) | halitosis causas | investigar | limpieza, periodoncia |
| Sensibilidad dental | sensibilidad dental | investigar | estética |
| Carillas dentales: precio y tipos | carillas dentales precio | investigar | estética |
| ¿Duele una endodoncia? | duele endodoncia | investigar | endodoncia |
| Qué comer tras una extracción | comer después extracción | investigar | cirugía oral |
| Ortodoncia en adultos | ortodoncia adultos | investigar | ortodoncia |
| Precio de Invisalign | invisalign precio | investigar | ortodoncia |
| Precio de los implantes dentales | implantes dentales precio | investigar | implantes |
| Puente dental o implante | puente dental o implante | investigar | prótesis, implantes |
| Blanqueamiento dental: precio y duración | blanqueamiento dental precio | investigar | blanqueamiento |
| Dientes amarillos: causas | dientes amarillos | investigar | blanqueamiento |
| Primera visita al odontopediatra | odontopediatra barcelona | 260 | odontopediatría |

Ve actualizando esta tabla en el informe: marca los temas publicados y añade los nuevos que encuentres.

## Plantilla del informe semanal (email)

Asunto: `Informe SEO semanal · velasegalaviladecans.com · <fecha>`

1. **Resumen en 3 líneas:** qué ha cambiado y qué es lo más importante.
2. **Visibilidad:** keywords posicionadas, top 3 y top 10, y tráfico estimado, comparados
   con la semana anterior si hay dato.
3. **Keywords de seguimiento:** tabla con keyword, posición, cambio y URL.
4. **Artículos publicados esta semana y programados** (título, URL y fecha).
5. **Estado técnico:** resultados de las comprobaciones y errores encontrados.
6. **Competencia:** movimientos relevantes (clinicapuigdemasa.com, dentalpla.es, clinicadentaldragallegos.com...).
7. **Tareas SEO recomendadas** (de 3 a 5, priorizadas por impacto y esfuerzo), indicando
   cuáles puede hacer el agente y cuáles requieren al propietario (Google Business
   Profile, reseñas, enlaces locales, etc.).
