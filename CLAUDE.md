# Clínica Dental Vela-Segalà (Viladecans)

Web corporativa de la Clínica Dental Vela-Segalà, en Viladecans (Barcelona). Cliente recurrente de Agutidesigns. Enfocada a SEO local, con blog que se escribe solo mediante IA (n8n).

## Dónde está publicada
- https://www.velasegalaviladecans.com (proyecto de Vercel `velasegala-web-emc8`)

## Tecnología
- `frontend/`: Next.js 14 (App Router) + TypeScript + Tailwind. Es lo que publica Vercel.
- `backend/`: NestJS + PostgreSQL + Prisma (blog, citas, contactos, SEO, panel admin).
- `n8n-workflow-*.json`: flujos de n8n que generan los posts del blog.

## Estructura
- `frontend/app/(main)/`: páginas públicas (inicio, clínica, tratamientos, blog…).
- `frontend/app/admin/`: panel de administración.
- `frontend/components/`: componentes (reseñas, blog, layout…).
- `docs/`: guías e informes SEO.

## Importante en este proyecto
- El SEO local es lo más valioso de esta web: no cambies URLs, títulos ni estructura de páginas sin avisar.
- Las otras dos webs del mismo cliente son `estetica-velasegala` (esteticasegala.com) y `estetica-santceloni` (esteticavela.com).

## Cómo se publica un cambio
1. Haz el cambio en la rama `main` (o en una rama y luego fusiónala).
2. Antes de subir, comprueba que compila: `npm install` y `cd frontend && npm run build`.
3. Al subir a `main`, Vercel publica solo en 1-2 minutos (proyecto `velasegala-web-emc8`). No hace falta tocar nada más.
4. Cuando termines, dile a Alejandro qué has cambiado y en qué URL puede verlo.

## Reglas para trabajar aquí
- Responde siempre en español, claro y sin tecnicismos innecesarios: Alejandro no es programador.
- Las claves (Stripe, Supabase, APIs) viven en las variables de entorno de Vercel. Nunca las escribas en el código ni las subas a GitHub.
- Pregunta antes de: borrar contenido, cambiar precios o pagos, tocar la base de datos, cambiar dominios o variables de Vercel, o enviar algo al cliente.
- Cambios de texto, imágenes, colores o secciones: hazlos directamente.
- Este repositorio es de un cliente de Agutidesigns (Alejandro "Guti"). No mezcles nada de otros clientes.
