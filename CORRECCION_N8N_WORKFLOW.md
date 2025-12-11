# 🔧 Corrección del Workflow n8n - Vela Segalà

## ❌ Problema Actual

Tu workflow n8n **NO está conectado con el backend API**. Está insertando directamente en PostgreSQL con el nodo `DB_Insert`, lo que causa:

1. ❌ **Artículos sin categorías ni tags**: Solo inserta en la tabla `Post`, pero las categorías y tags están en tablas separadas con relaciones many-to-many
2. ❌ **No se crean categorías/tags automáticamente**: El backend tiene lógica para crear categorías y tags si no existen
3. ❌ **Sin autor**: El campo `authorId` no se está estableciendo
4. ❌ **Relaciones rotas**: Las tablas `_PostCategories` y `_PostTags` no se están populando

---

## ✅ Solución: Usar el Webhook del Backend

En lugar de `DB_Insert` (PostgreSQL directo), debes usar un nodo **HTTP Request** que llame al endpoint del backend.

---

## 🛠️ Pasos para Corregir

### 1️⃣ Generar la API Key

```bash
openssl rand -hex 32
```

Ejemplo de salida:
```
8f3a2b1c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2
```

**Cópiala**, la necesitarás en los siguientes pasos.

---

### 2️⃣ Añadir la API Key a Railway

1. Ve a [railway.app](https://railway.app)
2. Selecciona tu proyecto **velasegala-web**
3. Click en el servicio **backend**
4. Ve a **Variables**
5. Click **+ New Variable**
6. Añade:
   - **Name:** `N8N_API_KEY`
   - **Value:** (pega la clave generada)
7. Click **Add**

Railway se redeployará automáticamente (espera 1-2 minutos).

---

### 3️⃣ Modificar el Workflow en n8n

#### A. Eliminar Nodos Innecesarios

Elimina estos nodos (ya no son necesarios):

- ❌ `DB_Slug_check`
- ❌ `DB_Slug_check_Decission`
- ❌ `FailedSlug_list`
- ❌ `NewSlug_GEN`
- ❌ `Add_FailedSlug`
- ❌ `New_Slug_Decission`
- ❌ `Slug_valido`
- ❌ `Slug_corregido`
- ❌ `Merge`
- ❌ `DB_ID_Check`
- ❌ `DB_ID_Decission`
- ❌ `Unique_ID_OK`
- ❌ `New_ID_Gen`
- ❌ `DB_Insert` ← **Este es el más importante de eliminar**

**Razón**: El backend maneja automáticamente:
- Generación de slugs únicos
- Generación de IDs únicos
- Validación de duplicados
- Creación de categorías y tags

#### B. Añadir Nodo HTTP Request (Webhook al Backend)

1. Añade un nuevo nodo **HTTP Request**
2. Colócalo después del nodo `Attach_Image_URL`
3. Configúralo así:

**Configuración del Nodo:**

```
Node Name: Enviar_al_Backend
```

**Request Settings:**

- **Method:** `POST`
- **URL:** `https://velasegala-web-production.up.railway.app/api/webhooks/n8n/blog-post`

**Authentication:**

- **Authentication:** `None` (usamos header personalizado)

**Headers:**

Click en **Add Parameter** (2 veces):

1. **Header 1:**
   - Name: `Content-Type`
   - Value: `application/json`

2. **Header 2:**
   - Name: `x-api-key`
   - Value: `TU_API_KEY_GENERADA` (la que generaste en el paso 1)

**Body:**

- **Body Content Type:** `JSON`
- **Specify Body:** `Using JSON`
- **JSON:**

```json
{
  "title": "={{ $json.title }}",
  "slug": "={{ $json.slug }}",
  "content": "={{ $json.content }}",
  "excerpt": "={{ $json.excerpt }}",
  "featuredImageUrl": "={{ $json.featuredImage }}",
  "categories": {{ JSON.stringify($json.categories) }},
  "tags": {{ JSON.stringify($json.tags) }},
  "metaTitle": "={{ $json.metaTitle }}",
  "metaDescription": "={{ $json.metaDescription }}",
  "publishStatus": "published",
  "publishAt": "={{ $json.publishAt }}"
}
```

**Options:**

- **Timeout:** `30000` (30 segundos)
- **Retry on Fail:** ✅ Enabled
- **Max Tries:** `3`
- **Wait Between Tries:** `5000` (5 segundos)

---

### 4️⃣ Conectar el Flujo

1. **Desconecta** el nodo `Attach_Image_URL` de `DB_Slug_check`
2. **Conecta** el nodo `Attach_Image_URL` directamente al nuevo nodo `Enviar_al_Backend`
3. **Conecta** `Enviar_al_Backend` → `Mail_Notification_SUCESS` (output principal)
4. **Conecta** `Enviar_al_Backend` → `Mail_Notification_FAIL` (output de error)

**Flujo Final:**

```
Attach_Image_URL
       ↓
Enviar_al_Backend (HTTP Request)
       ↓
   [success] → Mail_Notification_SUCESS
       ↓
   [error] → Mail_Notification_FAIL
```

---

### 5️⃣ Actualizar Nodos de Email

#### Mail_Notification_SUCESS

Cambia el texto del email a:

```
✅ Nuevo artículo publicado en Vela-Segalà

Título: {{ $json.title }}
Slug: {{ $json.slug }}
Estado: PUBLISHED

El artículo se ha creado y publicado automáticamente en:
https://velasegala-web-emc8.vercel.app/blog/{{ $json.slug }}

Panel de administración:
https://velasegala-web-emc8.vercel.app/admin/posts

Categorías: {{ JSON.stringify($json.categories) }}
Tags: {{ JSON.stringify($json.tags) }}
```

#### Mail_Notification_FAIL

Cambia el texto del email a:

```
❌ Error al publicar el artículo en Vela-Segalà

Título: {{ $('Attach_Image_URL').item.json.title }}

⚠️ El artículo no pudo ser publicado en el backend.

Error: {{ $json.error.message || 'Sin detalles' }}
Status Code: {{ $json.statusCode || 'N/A' }}

Posibles causas:
- API Key incorrecta
- Backend caído
- Formato de datos incorrecto

Revisa los logs en Railway:
https://railway.app

Panel de administración:
https://velasegala-web-emc8.vercel.app/admin
```

---

## 📋 Formato del Payload (Importante)

El backend espera este formato exacto:

```json
{
  "title": "string (requerido)",
  "slug": "string (opcional, se genera si no se envía)",
  "content": "string (requerido, Markdown)",
  "excerpt": "string (opcional)",
  "featuredImageUrl": "string (opcional, URL de imagen)",
  "categories": ["array", "de", "strings"],
  "tags": ["array", "de", "strings"],
  "metaTitle": "string (opcional)",
  "metaDescription": "string (opcional)",
  "publishStatus": "draft|published|scheduled",
  "publishAt": "ISO 8601 date string (opcional)"
}
```

**⚠️ Notas Importantes:**

- ✅ `categories` y `tags` son **arrays de strings** (nombres)
- ✅ El backend crea automáticamente categorías y tags si no existen
- ✅ El backend asigna el `authorId` automáticamente (primer admin en la BD)
- ✅ El backend genera slugs únicos automáticamente si hay duplicados
- ✅ Si `publishStatus` es `"published"` y no hay `publishAt`, usa la fecha actual

---

## 🧪 Probar el Workflow

### Test 1: Ejecución Manual

1. En n8n, abre tu workflow
2. Click en el nodo `Enviar_al_Backend`
3. Click en **Execute Node** (ejecutar nodo manualmente)
4. Deberías ver:
   - ✅ Status: `200 OK`
   - ✅ Response con el post creado (incluye ID, categorías, tags)

**Respuesta Exitosa Esperada:**

```json
{
  "id": "clxxxxx",
  "title": "Tu título",
  "slug": "tu-titulo",
  "content": "...",
  "categories": [
    { "id": "...", "name": "Salud Bucodental", "slug": "salud-bucodental" }
  ],
  "tags": [
    { "id": "...", "name": "Consejos", "slug": "consejos" }
  ],
  "publishStatus": "PUBLISHED",
  "publishAt": "2024-12-11T...",
  "author": {
    "id": "...",
    "name": "Dr. Admin",
    "email": "admin@velasegala.com"
  }
}
```

### Test 2: Verificar en el Admin

1. Ve a https://velasegala-web-emc8.vercel.app/admin/posts
2. El artículo debería aparecer en la lista
3. Abre el artículo y verifica:
   - ✅ Título, contenido, imagen
   - ✅ Categorías asignadas
   - ✅ Tags asignados
   - ✅ Estado: Publicado

### Test 3: Verificar en la Web Pública

1. Ve a https://velasegala-web-emc8.vercel.app/blog
2. El artículo debe aparecer en la lista
3. Click en el artículo para ver el detalle completo

---

## 🐛 Troubleshooting

### Error: "API key is missing" o "Invalid API key"

**Causa:** La API key no está configurada correctamente

**Solución:**
1. Verifica que añadiste `N8N_API_KEY` a Railway → Variables
2. Verifica que el header `x-api-key` en el nodo HTTP Request tenga la misma clave
3. Ambas claves deben ser **exactamente iguales**

### Error: "Validation failed"

**Causa:** Faltan campos obligatorios

**Solución:**
- Asegúrate de que el payload incluya `title` y `content`
- Verifica que `categories` y `tags` sean arrays (aunque sean vacíos: `[]`)

### Error: 500 Internal Server Error

**Causa:** Error en el backend

**Solución:**
1. Ve a Railway → Backend → View Logs
2. Busca el error específico
3. Los logs mostrarán:
   ```
   📡 Recibiendo post desde n8n
   ❌ Error: [detalles del error]
   ```

### El artículo se crea pero sin categorías/tags

**Causa:** El payload no está enviando los arrays correctamente

**Solución:**
- Verifica que el JSON del nodo HTTP Request use:
  ```json
  "categories": {{ JSON.stringify($json.categories) }},
  "tags": {{ JSON.stringify($json.tags) }}
  ```
- O directamente:
  ```json
  "categories": ["Salud Dental", "Tratamientos"],
  "tags": ["consejos", "prevencion"]
  ```

---

## 📊 Ventajas del Nuevo Sistema

### ✅ Antes (Inserción Directa PostgreSQL)

❌ Solo insertaba en tabla `Post`
❌ Sin categorías ni tags
❌ Sin validación de duplicados robusta
❌ Sin `authorId`
❌ Más complejo (muchos nodos de validación)

### ✅ Ahora (Webhook al Backend)

✅ Inserta post + categorías + tags + relaciones
✅ Crea categorías/tags automáticamente si no existen
✅ Validación robusta de slugs duplicados
✅ `authorId` asignado automáticamente
✅ Más simple (1 solo nodo HTTP Request)
✅ Logs centralizados en Railway
✅ Manejo de errores consistente

---

## 🎯 Resumen de Cambios

| Acción | Antes | Después |
|--------|-------|---------|
| **Nodos** | 15 nodos de validación + `DB_Insert` | 1 nodo `HTTP Request` |
| **Validación Slugs** | n8n (complejo) | Backend (automático) |
| **Validación IDs** | n8n (complejo) | Backend (automático) |
| **Categorías** | ❌ No se crean | ✅ Se crean automáticamente |
| **Tags** | ❌ No se crean | ✅ Se crean automáticamente |
| **Relaciones** | ❌ No se establecen | ✅ Se establecen automáticamente |
| **AuthorId** | ❌ No se asigna | ✅ Se asigna automáticamente |
| **Mantenimiento** | Difícil | Fácil |

---

## 🚀 Activar el Workflow

Una vez que todo esté configurado:

1. En n8n, click en **Active** (arriba a la derecha)
2. El workflow se ejecutará automáticamente según el schedule:
   ```
   0 10 * * 1,3,5
   ```
   (Lunes, Miércoles y Viernes a las 10:00 AM)

3. Recibirás un email por cada artículo generado:
   - ✅ Success: Artículo publicado
   - ❌ Fail: Error en generación

---

## 📞 Siguiente Paso

1. ✅ Genera la API Key: `openssl rand -hex 32`
2. ✅ Añádela a Railway como `N8N_API_KEY`
3. ✅ Elimina los nodos de validación PostgreSQL innecesarios
4. ✅ Añade el nodo `HTTP Request` con la configuración exacta
5. ✅ Conecta el flujo: `Attach_Image_URL` → `Enviar_al_Backend`
6. ✅ Ejecuta un test manual
7. ✅ Verifica que el artículo aparezca en el admin con categorías y tags
8. ✅ Activa el workflow

---

¿Listo? Sigue los pasos y avísame si tienes algún error. 🎉

