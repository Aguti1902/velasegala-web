# 🤖 Conexión del Agente IA con el Backend

## 📋 Resumen

Tu agente de IA en n8n enviará artículos automáticamente al backend de Vela-Segalà, que los publicará directamente en la web con sus categorías y etiquetas.

---

## 🔧 Paso 1: Configurar la API Key en Railway

### 1.1 Generar una API Key Segura

Primero, genera una clave API segura. Ejecuta este comando en tu terminal:

```bash
openssl rand -hex 32
```

Ejemplo de resultado: `a3f5b8c2d1e4f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0`

**Copia esta clave**, la necesitarás en el siguiente paso.

### 1.2 Añadir la Variable en Railway

1. Ve a [railway.app](https://railway.app)
2. Selecciona tu proyecto **velasegala-web**
3. Click en el servicio **backend** (NestJS)
4. Ve a la pestaña **Variables**
5. Click en **+ New Variable**
6. Añade:
   - **Name:** `N8N_API_KEY`
   - **Value:** (pega la clave que generaste en el paso anterior)
7. Click **Add**

Railway se redeployará automáticamente con esta nueva variable.

---

## 🌐 Paso 2: Configurar el Webhook en n8n

### 2.1 URL del Webhook

El endpoint para recibir artículos desde n8n es:

```
POST https://velasegala-web-production.up.railway.app/api/webhooks/n8n/blog-post
```

### 2.2 Headers Requeridos

Tu webhook en n8n debe enviar estos headers:

```json
{
  "Content-Type": "application/json",
  "x-api-key": "TU_API_KEY_GENERADA_EN_RAILWAY"
}
```

**⚠️ IMPORTANTE:** Reemplaza `TU_API_KEY_GENERADA_EN_RAILWAY` con la clave que generaste y añadiste a Railway.

---

## 📦 Paso 3: Formato del Payload (JSON)

El agente de IA debe enviar un JSON con este formato:

```json
{
  "title": "Título del Artículo",
  "slug": "titulo-del-articulo",
  "content": "Contenido completo del artículo en Markdown o HTML...",
  "excerpt": "Breve resumen del artículo (opcional)",
  "featuredImageUrl": "https://images.unsplash.com/photo-123456789",
  "categories": ["Salud Dental", "Odontología"],
  "tags": ["implantes", "estética dental", "salud"],
  "metaTitle": "SEO: Título optimizado para Google (opcional)",
  "metaDescription": "SEO: Descripción para Google (opcional)",
  "publishStatus": "published",
  "publishAt": "2024-12-11T10:00:00Z"
}
```

### Campos Detallados:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `title` | string | ✅ Sí | Título del artículo |
| `slug` | string | ❌ Opcional | URL-friendly (se genera automáticamente si no se envía) |
| `content` | string | ✅ Sí | Contenido completo (Markdown o HTML) |
| `excerpt` | string | ❌ Opcional | Resumen breve (primera línea visible) |
| `featuredImageUrl` | string | ❌ Opcional | URL de la imagen destacada (Unsplash, etc.) |
| `categories` | string[] | ❌ Opcional | Array de nombres de categorías (se crean si no existen) |
| `tags` | string[] | ❌ Opcional | Array de nombres de tags (se crean si no existen) |
| `metaTitle` | string | ❌ Opcional | Título SEO (si no se envía, usa `title`) |
| `metaDescription` | string | ❌ Opcional | Descripción SEO (si no se envía, usa `excerpt`) |
| `publishStatus` | string | ❌ Opcional | `"draft"`, `"published"`, o `"scheduled"` (default: `"draft"`) |
| `publishAt` | string | ❌ Opcional | Fecha de publicación en formato ISO 8601 (si no se envía, usa fecha actual) |

---

## 🔨 Paso 4: Configurar el Nodo Webhook en n8n

### 4.1 Añadir el Nodo HTTP Request

1. En tu workflow de n8n, añade un nodo **HTTP Request** al final
2. Configúralo así:

**General Settings:**
- **Method:** POST
- **URL:** `https://velasegala-web-production.up.railway.app/api/webhooks/n8n/blog-post`

**Authentication:**
- **Authentication:** None (usamos header personalizado)

**Headers:**
- Click en **Add Parameter**
- **Name:** `x-api-key`
- **Value:** `{{$env.N8N_API_KEY}}` (o la clave directamente)

**Body:**
- **Body Content Type:** JSON
- **Specify Body:** Using JSON
- **JSON:** (ejemplo usando variables de nodos anteriores)

```json
{
  "title": "{{ $json.title }}",
  "content": "{{ $json.content }}",
  "excerpt": "{{ $json.excerpt }}",
  "featuredImageUrl": "{{ $json.imageUrl }}",
  "categories": "{{ $json.categories }}",
  "tags": "{{ $json.tags }}",
  "metaTitle": "{{ $json.metaTitle }}",
  "metaDescription": "{{ $json.metaDescription }}",
  "publishStatus": "published",
  "publishAt": "{{ $now }}"
}
```

### 4.2 Mapeo de Campos desde ChatGPT

Si usas ChatGPT para generar el contenido, asegúrate de que el nodo HTTP Request mapee correctamente:

```json
{
  "title": "{{ $('ChatGPT').item.json.title }}",
  "content": "{{ $('ChatGPT').item.json.content }}",
  "excerpt": "{{ $('ChatGPT').item.json.excerpt }}",
  "featuredImageUrl": "{{ $('Unsplash').item.json.urls.regular }}",
  "categories": ["Salud Dental", "Tratamientos"],
  "tags": ["{{ $('ChatGPT').item.json.tag1 }}", "{{ $('ChatGPT').item.json.tag2 }}"],
  "publishStatus": "published"
}
```

---

## ✅ Paso 5: Probar la Conexión

### 5.1 Test Manual desde n8n

1. En tu workflow de n8n, click en el nodo **HTTP Request**
2. Click en **Execute Node**
3. Deberías ver una respuesta exitosa (200 OK) con los datos del post creado

**Respuesta Exitosa:**
```json
{
  "id": "clxxxxx",
  "title": "Título del Artículo",
  "slug": "titulo-del-articulo",
  "publishStatus": "PUBLISHED",
  "categories": [...],
  "tags": [...],
  "createdAt": "2024-12-11T..."
}
```

### 5.2 Verificar en el Admin Dashboard

1. Ve a https://velasegala-web-emc8.vercel.app/admin/login
2. Inicia sesión
3. Ve a **Posts** en el menú lateral
4. Deberías ver el artículo creado por el agente IA

### 5.3 Verificar en la Web Pública

1. Ve a https://velasegala-web-emc8.vercel.app/blog
2. El artículo debería aparecer en la lista (si está publicado)

---

## 🐛 Troubleshooting

### Error: "API key is missing"

**Causa:** No se está enviando el header `x-api-key`

**Solución:**
1. Verifica que el nodo HTTP Request tenga el header configurado
2. Revisa que la clave esté correctamente escrita (sin espacios)

### Error: "Invalid API key"

**Causa:** La clave enviada no coincide con `N8N_API_KEY` en Railway

**Solución:**
1. Ve a Railway → Variables → Verifica `N8N_API_KEY`
2. Copia la clave exacta
3. Actualízala en n8n

### Error: "Validation failed"

**Causa:** Faltan campos obligatorios (`title` o `content`)

**Solución:**
1. Verifica que el payload incluya `title` y `content`
2. Revisa que no sean strings vacíos
3. Mira los logs de Railway para ver qué campo específico falta

### Error: "Post with slug '...' already exists"

**Causa:** Ya existe un artículo con ese slug

**Solución:**
1. El agente IA debe generar slugs únicos (añade fecha o número)
2. Ejemplo: `"slug": "titulo-articulo-{{ $now.format('YYYY-MM-DD') }}"`

### Artículo creado pero no aparece en la web

**Causa:** El `publishStatus` es `"draft"` o la fecha `publishAt` es futura

**Solución:**
1. Asegúrate de enviar `"publishStatus": "published"`
2. No envíes `publishAt` (usará fecha actual) o envía una fecha pasada

---

## 📊 Monitoreo

### Logs de Railway

Para ver si los artículos se están recibiendo:

1. Railway → Tu proyecto → Backend → Deployments → View Logs
2. Busca:
   ```
   📥 Recibiendo petición para crear post
   📝 Creando post con datos
   ✅ Post creado exitosamente
   ```

### Logs de n8n

En n8n, click en **Executions** (menú lateral) para ver el historial:
- ✅ Verde: Artículo creado correctamente
- ❌ Rojo: Error (click para ver detalles)

---

## 🎯 Ejemplo Completo de Workflow n8n

### Flujo Recomendado:

```
1. Schedule Trigger (diario a las 10:00)
   ↓
2. Code Node (seleccionar tema aleatorio)
   ↓
3. HTTP Request (Google Search para investigar)
   ↓
4. ChatGPT (generar artículo completo)
   ↓
5. HTTP Request (Unsplash para buscar imagen)
   ↓
6. HTTP Request (Webhook a tu backend) ← AQUÍ PUBLICAS
   ↓
7. Email o Slack (notificación opcional)
```

### Configuración del Nodo ChatGPT:

**Prompt sugerido:**
```
Crea un artículo de blog profesional sobre: {{ $json.tema }}

Formato de respuesta (JSON):
{
  "title": "Título optimizado para SEO (60 caracteres)",
  "content": "Artículo completo en Markdown (mínimo 800 palabras, usa ## para títulos, ### para subtítulos, **negrita**, *cursiva*, listas, etc.)",
  "excerpt": "Resumen de 150 caracteres",
  "metaTitle": "Título SEO alternativo",
  "metaDescription": "Meta descripción de 150-160 caracteres",
  "tags": ["tag1", "tag2", "tag3"]
}

Contexto: Clínica dental Vela-Segalà en Viladecans, España. Tono profesional y cercano.
```

---

## 🚀 Automatización Completa

Una vez configurado, el agente:

1. ✅ Se ejecuta automáticamente (ej: cada día)
2. ✅ Genera un artículo único con IA
3. ✅ Busca una imagen relacionada
4. ✅ Crea categorías y tags automáticamente
5. ✅ Publica directamente en la web
6. ✅ Aparece en https://velasegala-web-emc8.vercel.app/blog
7. ✅ Se puede editar desde el admin si es necesario

---

## 📞 Siguiente Paso

1. ✅ Genera la API Key con `openssl rand -hex 32`
2. ✅ Añádela a Railway como `N8N_API_KEY`
3. ✅ Configura el nodo HTTP Request en n8n con:
   - URL: `https://velasegala-web-production.up.railway.app/api/webhooks/n8n/blog-post`
   - Header: `x-api-key: TU_API_KEY`
   - Body: JSON con title, content, etc.
4. ✅ Ejecuta un test manual
5. ✅ Verifica que el artículo aparezca en el admin
6. ✅ Activa el schedule para automatización

---

¿Todo listo? Pruébalo y avísame si ves algún error en los logs. 🎉

