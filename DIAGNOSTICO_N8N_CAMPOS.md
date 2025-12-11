# 🔍 Diagnóstico: Categorías, Tags e Imágenes No se Guardan

## ✅ Mejoras Aplicadas en el Backend

He mejorado el backend para que:

1. ✅ **Parse categorías** que vengan como string (`"cat1,cat2"`) o como array (`["cat1", "cat2"]`)
2. ✅ **Parse tags** que vengan como string (`"tag1,tag2"`) o como array (`["tag1", "tag2"]`)
3. ✅ **Acepte imágenes** incluso si la URL viene vacía
4. ✅ **Registre en logs** exactamente qué está recibiendo

---

## 🧪 Paso 1: Verificar Qué Está Enviando n8n

### 1.1 Ejecuta el Workflow en n8n

1. Abre tu workflow en n8n
2. Ejecuta manualmente (no esperes al schedule)
3. Debería crear el post exitosamente

### 1.2 Revisa los Logs de Railway

1. Ve a [railway.app](https://railway.app)
2. Tu proyecto → Backend → **Deployments** → View Logs
3. Busca estos mensajes:

```
🔍 WEBHOOK RECIBIDO - Payload completo:
{
  "title": "...",
  "categories": "...",  ← ¿Qué aparece aquí?
  "tags": "...",        ← ¿Y aquí?
  "featuredImageUrl": "..." ← ¿Y aquí?
}

📸 featuredImageUrl: ...
📁 categories (type): ... | value: ...
🏷️ tags (type): ... | value: ...
✅ Categorías parseadas: [...]
✅ Tags parseados: [...]
```

**Comparte conmigo estos logs** para saber exactamente qué está llegando.

---

## 🔧 Paso 2: Verificar el Nodo `Prepare_Webhook_Payload`

### 2.1 Abre el Nodo Code en n8n

1. En tu workflow, abre el nodo **"Prepare_Webhook_Payload"** (o como lo hayas llamado)
2. Verifica el código JavaScript

### 2.2 Código Correcto del Nodo

El nodo debe tener este código:

```javascript
// Obtener datos del nodo anterior
const item = $input.first().json;

// Construir payload limpio para el webhook
const payload = {
  title: item.title || 'Sin título',
  slug: item.slug || '',
  content: item.content || '',
  excerpt: item.excerpt || '',
  
  // IMPORTANTE: featuredImage (no featuredImageUrl)
  featuredImageUrl: item.featuredImage || item.featuredImageUrl || '',
  
  // IMPORTANTE: Asegurar que sean arrays
  categories: Array.isArray(item.categories) ? item.categories : 
              (item.categories ? [item.categories] : []),
  
  tags: Array.isArray(item.tags) ? item.tags : 
        (item.tags ? [item.tags] : []),
  
  metaTitle: item.metaTitle || item.title || '',
  metaDescription: item.metaDescription || item.excerpt || '',
  publishStatus: 'published',
  publishAt: item.publishAt || new Date().toISOString()
};

console.log('✅ Payload preparado:', payload);
console.log('📸 Imagen:', payload.featuredImageUrl);
console.log('📁 Categorías:', payload.categories);
console.log('🏷️ Tags:', payload.tags);

// Retornar el payload listo para enviar
return [{ json: payload }];
```

### 2.3 Puntos Clave

**Imagen:**
- Puede estar en `item.featuredImage` o `item.featuredImageUrl`
- Usar: `item.featuredImage || item.featuredImageUrl || ''`

**Categorías:**
- Asegurarse de que sea un **array**
- Si viene como string, convertir a array: `[item.categories]`

**Tags:**
- Asegurarse de que sea un **array**
- Si viene como string, convertir a array: `[item.tags]`

---

## 🔍 Paso 3: Verificar el Output del Nodo

### 3.1 Inspeccionar el Output

1. En n8n, ejecuta **solo el nodo `Prepare_Webhook_Payload`**
2. Click en "Output" del nodo
3. Deberías ver algo como:

```json
{
  "title": "Título del artículo",
  "categories": ["Salud Dental", "Tratamientos"],  ← DEBE SER ARRAY
  "tags": ["implantes", "prevención"],             ← DEBE SER ARRAY
  "featuredImageUrl": "https://image.url/..."      ← DEBE SER STRING CON URL
}
```

### 3.2 ¿Qué Puede Estar Mal?

❌ **Categorías como string:**
```json
"categories": "Salud Dental,Tratamientos"  // INCORRECTO
```

✅ **Categorías como array:**
```json
"categories": ["Salud Dental", "Tratamientos"]  // CORRECTO
```

❌ **Tags como string:**
```json
"tags": "implantes,prevención"  // INCORRECTO
```

✅ **Tags como array:**
```json
"tags": ["implantes", "prevención"]  // CORRECTO
```

❌ **Imagen vacía o sin URL:**
```json
"featuredImageUrl": ""  // INCORRECTO (vacío)
"featuredImageUrl": null  // INCORRECTO (null)
```

✅ **Imagen con URL válida:**
```json
"featuredImageUrl": "https://images.unsplash.com/photo-..."  // CORRECTO
```

---

## 🐛 Problemas Comunes

### Problema 1: Categorías y Tags Vienen del JSON Parse

Si el nodo anterior es `JSON Parse`, puede que las categorías vengan así:

```javascript
{
  categories: ["Cat1", "Cat2"]  // Ya es array, perfecto
}
```

O así:

```javascript
{
  categories: "Cat1,Cat2"  // Es string, hay que convertir
}
```

**Solución en `Prepare_Webhook_Payload`:**

```javascript
// Convertir categories a array si es string
categories: (() => {
  if (Array.isArray(item.categories)) {
    return item.categories;
  }
  if (typeof item.categories === 'string') {
    return item.categories.split(',').map(c => c.trim());
  }
  return [];
})(),

// Convertir tags a array si es string
tags: (() => {
  if (Array.isArray(item.tags)) {
    return item.tags;
  }
  if (typeof item.tags === 'string') {
    return item.tags.split(',').map(t => t.trim());
  }
  return [];
})(),
```

### Problema 2: La Imagen No Llega

Si usas **Banana Pro** o **DALL-E**, la imagen puede estar en:

- `item.image_url` (desde URL_Extract_Banana)
- `item.url` (desde URL_Extract_DALLE)
- `item.featuredImage` (desde Attach_Image_URL)

**Solución:**

```javascript
featuredImageUrl: item.featuredImage || 
                  item.featuredImageUrl || 
                  item.image_url || 
                  item.url || 
                  '',
```

---

## 🧪 Paso 4: Test Completo

### Ejecuta y Verifica:

1. **Ejecuta el workflow en n8n**
2. **Ve a Railway logs** y copia el payload recibido
3. **Ve al admin** y abre el artículo creado
4. **Verifica:**
   - ✅ ¿Tiene categorías?
   - ✅ ¿Tiene tags?
   - ✅ ¿Tiene imagen destacada?

---

## 📊 Resumen de Verificación

| Campo | ¿Dónde Verificar? | Debe Ser |
|-------|-------------------|----------|
| **Categorías** | Railway logs: `categories (type)` | `object` (array) |
| **Tags** | Railway logs: `tags (type)` | `object` (array) |
| **Imagen** | Railway logs: `featuredImageUrl` | string con URL válida |

---

## 🚀 Próximos Pasos

1. ✅ **Espera 1-2 minutos** a que Railway termine el deploy
2. ✅ **Ejecuta el workflow** en n8n manualmente
3. ✅ **Revisa los logs de Railway** y compártelos conmigo
4. ✅ **Verifica en el admin** si el artículo tiene categorías, tags e imagen

---

## 📞 Si Sigue Sin Funcionar

Comparte:

1. **Logs de Railway** (el bloque completo de "WEBHOOK RECIBIDO")
2. **Output del nodo `Prepare_Webhook_Payload`** en n8n (screenshot o JSON)
3. **Screenshot del artículo** en el admin mostrando que faltan campos

Con esa información podré diagnosticar exactamente qué está pasando.

---

**Railway se está redeployando ahora. Espera 1-2 minutos y prueba de nuevo.** 🎉

