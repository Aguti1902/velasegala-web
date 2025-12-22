# Configuración del Agente de IA para Blog Automático

Guía completa para configurar n8n con un agente de IA que genera artículos de blog automáticamente con categorías, etiquetas e imágenes.

## 🤖 Opción 1: n8n Cloud (Recomendado para empezar)

### Paso 1: Crear Cuenta en n8n Cloud

1. Ve a: **https://n8n.cloud**
2. **Sign up** (prueba gratis de 14 días)
3. Después: $20/mes

### Paso 2: Crear Nuevo Workflow

1. Click en **"New Workflow"**
2. Nombre: "Blog Automático Vela-Segalà"

### Paso 3: Configurar el Workflow

El workflow tendrá estos nodos en orden:

```
[Schedule Trigger] → [OpenAI] → [Function] → [HTTP Request] → [Slack/Email Notification]
```

---

## 🔧 Configuración de Cada Nodo

### 1️⃣ **Schedule Trigger** - Programar Ejecuciones

**Configuración:**
- **Trigger**: Schedule Trigger
- **Interval**: Custom
- **Cron Expression**: `0 10 * * 1,3,5` (Lunes, Miércoles, Viernes a las 10:00)
- O selecciona: "Every Monday, Wednesday, Friday at 10:00 AM"

**Esto ejecutará el workflow automáticamente 3 veces por semana.**

---

### 2️⃣ **OpenAI (o Claude)** - Generar Contenido con IA

**Nodo:** OpenAI / Anthropic

**Configuración:**
- **Credential**: Añade tu API Key de OpenAI/Anthropic
- **Resource**: Chat
- **Operation**: Message
- **Model**: `gpt-4o` o `claude-3-5-sonnet-20241022`

**Prompt (muy importante):**

```
Eres un experto en redacción SEO para clínicas dentales en Viladecans, Barcelona.

TAREA: Crea un artículo de blog optimizado para SEO sobre uno de estos temas (elige uno aleatorio):
- Implantes dentales en Viladecans
- Cuidados después de ortodoncia invisible
- Prevención de caries en niños
- Blanqueamiento dental: mitos y verdades
- Urgencias dentales más comunes
- Consejos para mantener encías sanas
- ¿Cuándo llevar a tu hijo al dentista?
- Bruxismo: causas y tratamiento
- Prótesis dentales: tipos y ventajas
- Higiene dental diaria: guía completa

REQUISITOS DEL ARTÍCULO:
1. Título SEO-optimizado (máximo 60 caracteres) con "Viladecans" o "clínica dental"
2. Slug amigable (separado por guiones, minúsculas)
3. Excerpt/resumen (150-160 caracteres)
4. Contenido (mínimo 1500 palabras, máximo 2500)
5. Estructura con H2 y H3 (usar ## y ### en markdown)
6. Incluir keywords: "Viladecans", "clínica dental", "Vela-Segalà"
7. FAQs al final (mínimo 3 preguntas)
8. CTA al final invitando a pedir cita
9. Meta Title SEO (máximo 60 caracteres)
10. Meta Description SEO (máximo 160 caracteres)

CATEGORÍAS disponibles (elige 1 o 2):
- Salud Bucodental
- Tratamientos
- Higiene Dental
- Ortodoncia
- Implantes
- Estética Dental

ETIQUETAS disponibles (elige 2-4):
- Implantes Dentales
- Invisalign
- Blanqueamiento
- Cuidados
- Prevención
- Niños
- Urgencias
- Consejos

FORMATO DE RESPUESTA (JSON estricto):
{
  "title": "Título del artículo aquí",
  "slug": "titulo-articulo-aqui",
  "excerpt": "Resumen breve del artículo en 150-160 caracteres",
  "content": "# Título Principal\n\nIntroducción del artículo...\n\n## Sección 1\n\nContenido...\n\n## FAQ\n\n### ¿Pregunta 1?\n\nRespuesta...",
  "categories": ["Salud Bucodental", "Tratamientos"],
  "tags": ["Prevención", "Cuidados", "Consejos"],
  "metaTitle": "Meta title para SEO - 60 caracteres máx",
  "metaDescription": "Meta description para SEO - 160 caracteres máximo",
  "imagePrompt": "Descripción para generar imagen: clínica dental moderna en Viladecans, ambiente profesional y acogedor"
}

IMPORTANTE: 
- Responde SOLO con el JSON, sin texto adicional
- El contenido debe estar en formato Markdown
- Incluye keywords de forma natural, no forzada
- El artículo debe ser útil para pacientes reales de Viladecans
```

**Response Format:** JSON

---

### 3️⃣ **Function Node** - Procesar y Formatear la Respuesta

**Nodo:** Function

**Función JavaScript:**

```javascript
// Obtener la respuesta de OpenAI
const aiResponse = $('OpenAI').item.json.choices[0].message.content;

// Parsear el JSON
let articleData;
try {
  articleData = JSON.parse(aiResponse);
} catch (error) {
  // Si la IA añade texto extra, intentar extraer el JSON
  const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    articleData = JSON.parse(jsonMatch[0]);
  } else {
    throw new Error('No se pudo parsear la respuesta de la IA');
  }
}

// Validar que tenga los campos requeridos
if (!articleData.title || !articleData.slug || !articleData.content) {
  throw new Error('La respuesta de la IA no tiene los campos requeridos');
}

// Formatear para el backend
const payload = {
  title: articleData.title,
  slug: articleData.slug,
  content: articleData.content,
  excerpt: articleData.excerpt || articleData.content.substring(0, 150) + '...',
  featuredImageUrl: null, // Se generará en el siguiente paso
  categories: articleData.categories || ['Salud Bucodental'],
  tags: articleData.tags || ['Consejos', 'Prevención'],
  metaTitle: articleData.metaTitle || articleData.title,
  metaDescription: articleData.metaDescription || articleData.excerpt,
  publishStatus: 'DRAFT', // Crear como borrador para revisión
  publishAt: new Date().toISOString(),
  imagePrompt: articleData.imagePrompt || 'clinica dental moderna profesional'
};

return payload;
```

---

### 4️⃣ **DALL-E o Unsplash** - Generar/Buscar Imagen

**Opción A: DALL-E (generar imagen con IA)**

**Nodo:** OpenAI
- **Resource**: Image
- **Operation**: Generate
- **Prompt**: `{{ $json.imagePrompt }}`
- **Size**: 1024x1024
- **Quality**: standard

**Obtener URL:**
```javascript
const imageUrl = $('DALL-E').item.json.data[0].url;
return { ...previousData, featuredImageUrl: imageUrl };
```

**Opción B: Unsplash (imágenes gratis)**

**Nodo:** HTTP Request
- **Method**: GET
- **URL**: `https://api.unsplash.com/search/photos?query=dental+clinic&orientation=landscape`
- **Headers**: `Authorization: Client-ID TU_UNSPLASH_ACCESS_KEY`

**Obtener URL:**
```javascript
const imageUrl = $json.results[0].urls.regular;
return { ...previousData, featuredImageUrl: imageUrl };
```

**Opción C: Usar imágenes existentes**

Si prefieres usar tus propias imágenes, crea un array de URLs:

```javascript
const images = [
  'https://tu-dominio.com/images/implantes-dentales-viladecans.jpg',
  'https://tu-dominio.com/images/ortodoncia-invisalign-viladecans.jpg',
  'https://tu-dominio.com/images/estetica-dental-viladecans.jpg',
];

const randomImage = images[Math.floor(Math.random() * images.length)];
return { ...previousData, featuredImageUrl: randomImage };
```

---

### 5️⃣ **HTTP Request** - Enviar al Backend

**Nodo:** HTTP Request

**Configuración:**
- **Method**: POST
- **URL**: `https://tu-backend.up.railway.app/api/webhooks/n8n/blog-post`
  
  **⚠️ IMPORTANTE**: Usa tu URL real de Railway

**Headers:**
```
x-api-key: [tu N8N_API_KEY de Railway]
Content-Type: application/json
```

**Body:**
- **Body Content Type**: JSON
- **Specify Body**: Using JSON
- **JSON**:
```json
{
  "title": "={{ $json.title }}",
  "slug": "={{ $json.slug }}",
  "content": "={{ $json.content }}",
  "excerpt": "={{ $json.excerpt }}",
  "featuredImageUrl": "={{ $json.featuredImageUrl }}",
  "categories": "={{ $json.categories }}",
  "tags": "={{ $json.tags }}",
  "metaTitle": "={{ $json.metaTitle }}",
  "metaDescription": "={{ $json.metaDescription }}",
  "publishStatus": "DRAFT",
  "publishAt": "={{ $json.publishAt }}"
}
```

**Authentication:**
- Usa el header `x-api-key` con tu `N8N_API_KEY` de Railway

---

### 6️⃣ **Notification** - Notificarte del Nuevo Artículo

**Opción A: Slack**

**Nodo:** Slack
- **Channel**: #blog-updates
- **Message**: 
```
✅ Nuevo artículo creado:
Título: {{ $('HTTP Request').item.json.title }}
Slug: {{ $('HTTP Request').item.json.slug }}
Estado: DRAFT (revisar antes de publicar)
Ver en: https://tu-backend.railway.app/admin
```

**Opción B: Email**

**Nodo:** Send Email
- **To**: tu-email@example.com
- **Subject**: Nuevo artículo de blog creado
- **Message**: Mismo formato que Slack

---

## 🎯 Workflow Completo Resumido

```
┌──────────────────┐
│ Schedule Trigger │  (Cada Lunes, Miércoles, Viernes 10:00)
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│  OpenAI Chat     │  (Generar artículo con prompt específico)
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│  Function Node   │  (Parsear JSON y formatear)
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│ DALL-E / Unsplash│  (Generar/buscar imagen)
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│  HTTP Request    │  (POST a tu backend webhook)
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│  Notification    │  (Slack/Email notificación)
└──────────────────┘
```

---

## 🔐 Credenciales que Necesitas

### 1. OpenAI API Key
- Ve a: https://platform.openai.com/api-keys
- Create new secret key
- Copia y guarda (la usarás en n8n)
- Costo: ~$0.002 por artículo (con GPT-4o)

### 2. N8N_API_KEY
- Ya la tienes en Railway (la que generaste)
- Úsala en el header del HTTP Request

### 3. Unsplash Access Key (Opcional)
- Si usas Unsplash para imágenes
- Ve a: https://unsplash.com/developers
- Create Application
- Copia el Access Key

---

## 📝 Ejemplo de Payload Completo

El webhook recibirá esto:

```json
{
  "title": "Implantes Dentales en Viladecans: Guía Completa 2024",
  "slug": "implantes-dentales-viladecans-guia-completa-2024",
  "content": "# Implantes Dentales en Viladecans...\n\n## ¿Qué son los implantes dentales?...",
  "excerpt": "Descubre todo sobre implantes dentales en Viladecans: tipos, proceso, cuidados y ventajas. Guía completa de la Clínica Vela-Segalà.",
  "featuredImageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/...",
  "categories": ["Implantes", "Tratamientos"],
  "tags": ["Implantes Dentales", "Cuidados", "Prevención"],
  "metaTitle": "Implantes Dentales Viladecans - Guía 2024 | Vela-Segalà",
  "metaDescription": "Implantes dentales en Viladecans. +25 años experiencia. Primera visita gratis. Financiación sin intereses. Clínica Vela-Segalà.",
  "publishStatus": "DRAFT",
  "publishAt": "2024-12-05T10:00:00.000Z"
}
```

---

## 🎨 Prompts Mejorados para Diferentes Tipos de Contenido

### Para Artículos Informativos:
```
Crea un artículo informativo sobre [TEMA] para pacientes de Viladecans.
Debe ser educativo, fácil de entender y responder las dudas más comunes.
Tono: Profesional pero cercano y accesible.
```

### Para Guías de Tratamientos:
```
Crea una guía completa sobre [TRATAMIENTO] en la Clínica Vela-Segalà Viladecans.
Incluye: proceso paso a paso, ventajas, cuidados post-tratamiento, FAQs.
Menciona tecnología avanzada y experiencia de +25 años.
```

### Para Consejos Prácticos:
```
Crea una lista de consejos prácticos sobre [TEMA] dental.
Debe ser accionable, con tips específicos que los pacientes puedan aplicar.
Incluye ejemplos reales y casos comunes en Viladecans.
```

---

## 🔄 Workflow Avanzado (con Keywords Research)

Si quieres que el agente busque keywords antes de crear el artículo:

```
[Schedule] → [HTTP: Google Trends API] → [Function: Analizar Keywords] 
           → [OpenAI: Generar con Keywords] → [DALL-E] → [HTTP: Backend]
```

### Nodo de Google Trends:

```javascript
// En Function Node antes de OpenAI
const keywords = [
  'implantes dentales viladecans',
  'dentista viladecans',
  'ortodoncia invisible viladecans',
  'blanqueamiento dental viladecans'
];

const selectedKeyword = keywords[Math.floor(Math.random() * keywords.length)];

return {
  keyword: selectedKeyword,
  prompt: `Crea un artículo SEO sobre "${selectedKeyword}" para Clínica Vela-Segalà...`
};
```

---

## 🧪 Probar el Workflow

### Test Manual:

1. **En n8n, click en "Execute Workflow"** (botón arriba a la derecha)
2. Verás la ejecución en tiempo real
3. Cada nodo mostrará su output
4. Si todo va bien:
   - OpenAI genera el artículo
   - Function formatea el JSON
   - HTTP Request envía al backend
   - Recibes notificación

### Verificar en el Backend:

1. Ve a: `https://tu-backend.railway.app/api/posts?status=DRAFT`
2. Deberías ver el artículo creado
3. Estado: DRAFT (borrador)

---

## 📊 Panel de Admin (Para revisar y publicar)

Actualmente los artículos se crean como **DRAFT**. Para publicarlos necesitas:

**Opción 1: Via API (con Postman/Insomnia)**

```bash
# Login
POST https://tu-backend.railway.app/api/auth/login
{
  "email": "admin@velasegala.com",
  "password": "tu-password"
}

# Obtener el token JWT de la respuesta

# Listar borradores
GET https://tu-backend.railway.app/api/posts?status=DRAFT
Authorization: Bearer {tu-token}

# Publicar un artículo
PATCH https://tu-backend.railway.app/api/posts/{id}
Authorization: Bearer {tu-token}
{
  "publishStatus": "PUBLISHED"
}
```

**Opción 2: Crear un Admin Panel** (más adelante)

Podemos crear un panel simple en React para:
- Ver todos los borradores
- Editar artículos
- Publicar/despublicar
- Gestionar categorías y tags

---

## 💡 Ideas de Mejora

### 1. **Generación de Imágenes Más Específicas**

Añade un nodo Function antes de DALL-E:

```javascript
const imagePrompts = {
  'Implantes': 'Paciente sonriente mostrando implantes dentales, clínica moderna',
  'Ortodoncia': 'Persona joven con ortodoncia invisible sonriendo, estilo profesional',
  'Niños': 'Niño feliz en silla dental, dentista amigable, ambiente colorido',
  'Blanqueamiento': 'Sonrisa blanca perfecta, antes y después, fondo limpio'
};

const category = $json.categories[0];
const specificPrompt = imagePrompts[category] || 'clínica dental moderna profesional';

return {
  ...previousData,
  enhancedImagePrompt: `Professional dental clinic photo: ${specificPrompt}, high quality, bright, clean, realistic`
};
```

### 2. **Validación de Contenido**

Añade un nodo Function para validar:

```javascript
const content = $json.content;

// Validaciones
const wordCount = content.split(/\s+/).length;
const hasFAQ = content.toLowerCase().includes('faq') || content.includes('?');
const hasViladecans = content.toLowerCase().includes('viladecans');

if (wordCount < 1000) {
  throw new Error('El artículo es demasiado corto (mínimo 1000 palabras)');
}

if (!hasFAQ) {
  throw new Error('El artículo debe incluir una sección de FAQs');
}

if (!hasViladecans) {
  throw new Error('El artículo debe mencionar Viladecans');
}

// Si pasa todas las validaciones
return $json;
```

### 3. **Variedad de Temas**

Crea un nodo de "Code" que rote entre diferentes temas:

```javascript
const topics = [
  {
    tema: 'Implantes dentales en Viladecans',
    categoria: 'Implantes',
    tags: ['Implantes Dentales', 'Cuidados']
  },
  {
    tema: 'Ortodoncia invisible: guía completa',
    categoria: 'Ortodoncia',
    tags: ['Invisalign', 'Consejos']
  },
  {
    tema: 'Cuidados dentales para niños',
    categoria: 'Salud Bucodental',
    tags: ['Niños', 'Prevención']
  },
  // ... más temas
];

// Rotar tema basado en la fecha
const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
const selectedTopic = topics[dayOfYear % topics.length];

return selectedTopic;
```

---

## 🚀 Activar el Workflow

Una vez configurado:

1. **Click en "Active"** (toggle arriba a la derecha)
2. El workflow se ejecutará automáticamente según tu schedule
3. Recibirás notificaciones cada vez que se cree un artículo

---

## 📊 Monitoreo y Analytics

### En n8n:
- **Executions** → Ver todos los workflows ejecutados
- **Logs** → Ver errores y outputs

### En Railway (Backend):
- **Metrics** → Ver requests al webhook
- **Logs** → Ver si los posts se están creando

---

## 💰 Costos Estimados

- **n8n Cloud:** $20/mes
- **OpenAI API:**
  - GPT-4o: ~$0.005 por artículo
  - DALL-E: ~$0.04 por imagen
  - Total: ~$0.045 por artículo
  - 12 artículos/mes = ~$0.54/mes

- **Total:** ~$20.54/mes

### Alternativa Gratis: n8n Self-Hosted

Puedes instalar n8n gratis en:
- Railway (otro servicio)
- Render
- Tu propio servidor

---

## 🎯 Siguiente Paso Inmediato

1. **Crea cuenta en n8n Cloud:** https://n8n.cloud
2. **Obtén OpenAI API Key:** https://platform.openai.com/api-keys
3. **Crea el workflow** siguiendo los pasos de arriba
4. **Prueba con "Execute Workflow"**
5. **Si funciona, actívalo**

---

## 📞 Soporte

Si tienes problemas:
- **n8n Community:** https://community.n8n.io/
- **Documentación n8n:** https://docs.n8n.io/
- **OpenAI Help:** https://help.openai.com/

---

**¿Tienes ya cuenta en n8n o OpenAI?** Te ayudo a configurar el primer workflow paso a paso. 🤖✨

