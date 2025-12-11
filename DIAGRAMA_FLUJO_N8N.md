# 🔄 Diagrama de Flujo Correcto - n8n → Backend

## ❌ Flujo ACTUAL (Incorrecto)

```
┌─────────────────────────────────────────────────────────────────────┐
│  1. Schedule Trigger → Config_Clinica → Metadata_selector          │
│                             ↓                                        │
│  2. CONTENT_GPT_Gen → JSON Parse                                    │
│                             ↓                                        │
│  3. ImagePromptGEN → IMG_BananaPro_Request → GET_BananaPro_URL     │
│                             ↓                                        │
│     IMG_Check_Status → URL_Extract_Banana                          │
│           │                                                          │
│           └─[fail]→ DALLE_Fallback → URL_Extract_DALLE             │
│                             ↓                                        │
│  4. Attach_Image_URL                                                │
│                             ↓                                        │
│  ❌ DB_Slug_check → Slug_valido ──┐                                 │
│           │                        │                                 │
│           └→ NewSlug_GEN → ... ────┤                                │
│                                     ↓                                │
│                                  Merge                               │
│                                     ↓                                │
│  ❌ DB_ID_Check → Unique_ID_OK ─────┐                               │
│           │                         │                                │
│           └→ New_ID_Gen ────────────┤                               │
│                                     ↓                                │
│  ❌ DB_Insert (PostgreSQL directo)                                  │
│        ↓                                                             │
│  Mail_Notification                                                  │
└─────────────────────────────────────────────────────────────────────┘

⚠️ PROBLEMAS:
- DB_Insert solo inserta en tabla Post
- NO crea categorías ni tags
- NO establece relaciones
- Validaciones complejas e innecesarias
```

---

## ✅ Flujo NUEVO (Correcto)

```
┌─────────────────────────────────────────────────────────────────────┐
│  1. Schedule Trigger → Config_Clinica → Metadata_selector          │
│                             ↓                                        │
│  2. CONTENT_GPT_Gen → JSON Parse                                    │
│                             ↓                                        │
│  3. ImagePromptGEN → IMG_BananaPro_Request → GET_BananaPro_URL     │
│                             ↓                                        │
│     IMG_Check_Status → URL_Extract_Banana                          │
│           │                                                          │
│           └─[fail]→ DALLE_Fallback → URL_Extract_DALLE             │
│                             ↓                                        │
│  4. Attach_Image_URL                                                │
│                             ↓                                        │
│  ✅ HTTP Request (Webhook al Backend)                               │
│     POST /api/webhooks/n8n/blog-post                                │
│     Headers: x-api-key                                              │
│     Body: {title, slug, content, categories, tags, ...}             │
│                             ↓                                        │
│     Backend maneja automáticamente:                                 │
│     - ✅ Validación de slug único                                   │
│     - ✅ Generación de ID único                                     │
│     - ✅ Creación de categorías si no existen                       │
│     - ✅ Creación de tags si no existen                             │
│     - ✅ Establecimiento de relaciones                              │
│     - ✅ Asignación de authorId                                     │
│                             ↓                                        │
│  5. Mail_Notification (Success/Fail)                                │
└─────────────────────────────────────────────────────────────────────┘

✅ VENTAJAS:
- Mucho más simple (menos nodos)
- Categorías y tags se crean automáticamente
- Relaciones correctas
- Validación robusta en el backend
- Logs centralizados en Railway
```

---

## 📦 Payload Enviado vs Datos Creados

### 📤 Lo que n8n ENVÍA:

```json
{
  "title": "Implantes Dentales en Viladecans",
  "slug": "implantes-dentales-viladecans",
  "content": "# Contenido...",
  "excerpt": "Resumen...",
  "featuredImageUrl": "https://image.url/foto.jpg",
  "categories": ["Salud Bucodental", "Tratamientos"],
  "tags": ["implantes", "estetica dental", "viladecans"],
  "metaTitle": "SEO Title",
  "metaDescription": "SEO Description",
  "publishStatus": "published",
  "publishAt": "2024-12-11T10:00:00Z"
}
```

### 📥 Lo que el BACKEND CREA:

```sql
-- 1. Tabla: Post
INSERT INTO "Post" (
  id,                  -- ✅ Generado automáticamente (cuid)
  title,               -- ✅ "Implantes Dentales en Viladecans"
  slug,                -- ✅ "implantes-dentales-viladecans" (valida unicidad)
  content,             -- ✅ "# Contenido..."
  excerpt,             -- ✅ "Resumen..."
  featuredImage,       -- ✅ "https://image.url/foto.jpg"
  metaTitle,           -- ✅ "SEO Title"
  metaDescription,     -- ✅ "SEO Description"
  publishStatus,       -- ✅ "PUBLISHED"
  publishAt,           -- ✅ "2024-12-11T10:00:00Z"
  authorId,            -- ✅ Asignado automáticamente (primer admin)
  createdAt,           -- ✅ Fecha actual
  updatedAt            -- ✅ Fecha actual
);

-- 2. Tabla: Category (si no existe "Salud Bucodental")
INSERT INTO "Category" (
  id,                  -- ✅ Generado automáticamente
  name,                -- ✅ "Salud Bucodental"
  slug,                -- ✅ "salud-bucodental" (generado)
  createdAt,
  updatedAt
);

-- 3. Tabla: Category (si no existe "Tratamientos")
INSERT INTO "Category" (
  id,                  -- ✅ Generado automáticamente
  name,                -- ✅ "Tratamientos"
  slug,                -- ✅ "tratamientos" (generado)
  createdAt,
  updatedAt
);

-- 4. Tabla: Tag (si no existe "implantes")
INSERT INTO "Tag" (
  id,                  -- ✅ Generado automáticamente
  name,                -- ✅ "implantes"
  slug,                -- ✅ "implantes" (generado)
  createdAt,
  updatedAt
);

-- ... Más tags ...

-- 5. Tabla de Relación: _PostCategories
INSERT INTO "_PostCategories" (A, B) VALUES
  (post_id, category_salud_bucodental_id),
  (post_id, category_tratamientos_id);

-- 6. Tabla de Relación: _PostTags
INSERT INTO "_PostTags" (A, B) VALUES
  (post_id, tag_implantes_id),
  (post_id, tag_estetica_dental_id),
  (post_id, tag_viladecans_id);
```

**Total: 6 operaciones en la base de datos manejadas automáticamente por el backend**

---

## 🔑 Configuración del Nodo HTTP Request

### Visual en n8n:

```
┌────────────────────────────────────────────────────────┐
│  Nodo: HTTP Request                                    │
│  Name: Enviar_al_Backend                               │
├────────────────────────────────────────────────────────┤
│  📍 URL:                                               │
│  https://velasegala-web-production.up.railway.app/    │
│  api/webhooks/n8n/blog-post                            │
├────────────────────────────────────────────────────────┤
│  🔐 Headers:                                           │
│  • Content-Type: application/json                      │
│  • x-api-key: TU_API_KEY_GENERADA                      │
├────────────────────────────────────────────────────────┤
│  📦 Body (JSON):                                       │
│  {                                                      │
│    "title": "={{ $json.title }}",                      │
│    "slug": "={{ $json.slug }}",                        │
│    "content": "={{ $json.content }}",                  │
│    "excerpt": "={{ $json.excerpt }}",                  │
│    "featuredImageUrl": "={{ $json.featuredImage }}",   │
│    "categories": {{ JSON.stringify($json.categories) }},│
│    "tags": {{ JSON.stringify($json.tags) }},           │
│    "metaTitle": "={{ $json.metaTitle }}",              │
│    "metaDescription": "={{ $json.metaDescription }}",  │
│    "publishStatus": "published",                       │
│    "publishAt": "={{ $json.publishAt }}"               │
│  }                                                      │
├────────────────────────────────────────────────────────┤
│  ⚙️ Options:                                           │
│  • Timeout: 30000 ms                                   │
│  • Retry on Fail: ✅                                   │
│  • Max Tries: 3                                        │
│  • Wait Between Tries: 5000 ms                         │
└────────────────────────────────────────────────────────┘
```

---

## 🎯 Comparación Rápida

| Aspecto | Flujo Actual (❌) | Flujo Nuevo (✅) |
|---------|------------------|-----------------|
| **Nodos** | 16 nodos | 7 nodos |
| **Complejidad** | Alta | Baja |
| **Validación Slug** | n8n + PostgreSQL | Backend automático |
| **Validación ID** | n8n + PostgreSQL | Backend automático |
| **Categorías** | ❌ No se crean | ✅ Se crean automáticamente |
| **Tags** | ❌ No se crean | ✅ Se crean automáticamente |
| **Relaciones** | ❌ No se establecen | ✅ Se establecen automáticamente |
| **AuthorId** | ❌ No se asigna | ✅ Se asigna automáticamente |
| **Logs** | Solo en n8n | n8n + Railway |
| **Mantenimiento** | Difícil | Fácil |
| **Errores** | Difícil de debuggear | Logs claros en Railway |

---

## 📋 Checklist de Migración

- [ ] **1. Generar API Key** con `openssl rand -hex 32`
- [ ] **2. Añadir API Key a Railway** → Variables → `N8N_API_KEY`
- [ ] **3. Eliminar nodos viejos:**
  - [ ] DB_Slug_check
  - [ ] DB_Slug_check_Decission
  - [ ] FailedSlug_list
  - [ ] NewSlug_GEN
  - [ ] Add_FailedSlug
  - [ ] New_Slug_Decission
  - [ ] Slug_valido
  - [ ] Slug_corregido
  - [ ] Merge
  - [ ] DB_ID_Check
  - [ ] DB_ID_Decission
  - [ ] Unique_ID_OK
  - [ ] New_ID_Gen
  - [ ] DB_Insert
- [ ] **4. Añadir nodo HTTP Request** con configuración correcta
- [ ] **5. Conectar flujo:** `Attach_Image_URL` → `Enviar_al_Backend`
- [ ] **6. Actualizar nodos de email** con nuevos mensajes
- [ ] **7. Test manual:** Ejecutar workflow y verificar respuesta 200 OK
- [ ] **8. Verificar en admin:** Artículo con categorías y tags
- [ ] **9. Verificar en web:** Artículo visible públicamente
- [ ] **10. Activar workflow:** Schedule automático

---

🎉 **Una vez completado, tu agente IA estará 100% funcional y publicará artículos automáticamente con categorías y tags.**

