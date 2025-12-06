# Guía Completa: Agente de IA para Crear Artículos Automáticamente

## 📋 Resumen

Este agente de IA en n8n:
1. Busca información en Google sobre un tema dental
2. Filtra y resume la información
3. Genera un artículo SEO optimizado con IA
4. Busca una imagen en Unsplash
5. Crea categorías/etiquetas si no existen
6. Publica el artículo automáticamente en tu web

---

## 🔑 Paso 1: Configurar API Key para n8n

### 1.1. Generar API Key segura

Ejecuta esto en tu terminal local:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copia el resultado (algo como: `a1b2c3d4e5f6...`).

### 1.2. Añadir la API Key a Railway

1. Ve a [railway.app](https://railway.app)
2. Selecciona tu proyecto backend
3. Ve a "Variables"
4. Añade esta variable:
   - **Name**: `N8N_API_KEY`
   - **Value**: La clave que generaste
5. Click "Add" y Railway se redeployará automáticamente

---

## 🤖 Paso 2: Crear Cuenta en n8n

### Opción A: n8n Cloud (Recomendado - Fácil)

1. Ve a [n8n.cloud](https://n8n.cloud)
2. Crea una cuenta gratuita
3. Crea un nuevo workflow

### Opción B: n8n Self-Hosted (Avanzado)

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

Abre http://localhost:5678

---

## 🏗️ Paso 3: Crear el Workflow en n8n

### 3.1. Estructura del Workflow

El workflow tendrá estos nodos:

```
1. Schedule Trigger (ejecutar cada día)
   ↓
2. Set Variables (tema del artículo)
   ↓
3. Google Search (buscar información)
   ↓
4. HTTP Request - OpenAI (generar artículo)
   ↓
5. HTTP Request - Unsplash (buscar imagen)
   ↓
6. HTTP Request - Tu Backend (publicar artículo)
```

---

## 📝 Paso 4: Configuración Detallada de Cada Nodo

### NODO 1: Schedule Trigger

```
Node Type: Schedule Trigger
Name: "Ejecutar cada día"

Settings:
- Trigger Times: Add trigger time
  - Hour: 10
  - Minute: 0
- Trigger Interval: Days
- Days Between Triggers: 1
```

---

### NODO 2: Set Variables

```
Node Type: Set
Name: "Configurar tema del artículo"

Values to Set:
- Name: topic
  Value: {{ ["Implantes Dentales", "Ortodoncia Invisible", "Blanqueamiento Dental", "Cuidado Dental Infantil", "Salud de las Encías", "Estética Dental", "Urgencias Dentales", "Brackets vs Invisalign", "Limpieza Dental Profesional", "Caries Dental Prevención"][Math.floor(Math.random() * 10)] }}
  
- Name: location
  Value: Viladecans

- Name: clinic_name
  Value: Clínica Dental Vela-Segalà
```

**Explicación**: Cada día seleccionará un tema aleatorio de la lista.

---

### NODO 3: HTTP Request - Google Custom Search API

```
Node Type: HTTP Request
Name: "Buscar información en Google"

Settings:
- Authentication: None
- Method: GET
- URL: https://www.googleapis.com/customsearch/v1
- Query Parameters:
  - key: TU_GOOGLE_API_KEY (ver instrucciones abajo)
  - cx: TU_SEARCH_ENGINE_ID
  - q: {{ $json.topic }} {{ $json.location }} consejos tratamiento
  - num: 5

Options:
- Response Format: JSON
```

#### Cómo obtener Google API Key:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Activa "Custom Search API"
4. Ve a "Credentials" → "Create Credentials" → "API Key"
5. Copia la API Key

#### Cómo obtener Search Engine ID:

1. Ve a [Google Programmable Search Engine](https://programmablesearchengine.google.com/)
2. Click "Add" → Crear un buscador
3. En "Sites to search": Elige "Search the entire web"
4. Copia el "Search engine ID"

---

### NODO 4: Code Node - Procesar Resultados

```
Node Type: Code
Name: "Extraer información de Google"

JavaScript Code:
```javascript
const items = $input.all()[0].json.items || [];

const searchResults = items.map(item => ({
  title: item.title,
  snippet: item.snippet,
  link: item.link
}));

const combinedText = searchResults
  .map(r => `${r.title}\n${r.snippet}`)
  .join('\n\n');

return [{
  json: {
    searchResults,
    combinedText,
    topic: $('Configurar tema del artículo').item.json.topic,
    location: $('Configurar tema del artículo').item.json.location,
    clinic_name: $('Configurar tema del artículo').item.json.clinic_name
  }
}];
```

---

### NODO 5: HTTP Request - OpenAI (Generar Artículo)

```
Node Type: HTTP Request
Name: "Generar artículo con ChatGPT"

Settings:
- Authentication: Predefined Credential Type
  - Credential Type: OpenAI API
  - API Key: TU_OPENAI_API_KEY (sk-...)
  
- Method: POST
- URL: https://api.openai.com/v1/chat/completions

Headers:
- Name: Content-Type
  Value: application/json

Body:
- Content Type: JSON
- Body:
```json
{
  "model": "gpt-4o-mini",
  "messages": [
    {
      "role": "system",
      "content": "Eres un redactor experto en contenido dental SEO. Escribes artículos informativos, profesionales y optimizados para SEO local."
    },
    {
      "role": "user",
      "content": "Escribe un artículo de blog completo sobre: {{ $json.topic }} en {{ $json.location }}\n\nInformación de referencia:\n{{ $json.combinedText }}\n\nRequisitos:\n1. Título atractivo con la palabra clave principal\n2. Introducción de 2 párrafos\n3. 5-7 secciones con subtítulos H2\n4. Cada sección con 2-3 párrafos\n5. Incluir consejos prácticos\n6. Mencionar sutilmente '{{ $json.clinic_name }}' al final\n7. FAQ section con 3-5 preguntas\n8. Conclusión con CTA\n9. Formato Markdown\n10. 1500-2000 palabras\n11. Lenguaje natural y cercano\n\nDevuelve SOLO el artículo en Markdown, sin explicaciones adicionales."
    }
  ],
  "temperature": 0.7,
  "max_tokens": 3000
}
```

#### Cómo obtener OpenAI API Key:

1. Ve a [platform.openai.com](https://platform.openai.com/)
2. Crea una cuenta / Inicia sesión
3. Ve a "API Keys"
4. Click "Create new secret key"
5. Copia la clave (empieza con `sk-...`)
6. **Importante**: Añade créditos en "Billing" (mínimo $5)

---

### NODO 6: Code Node - Preparar Datos del Artículo

```
Node Type: Code
Name: "Preparar datos para publicar"

JavaScript Code:
```javascript
const openAIResponse = $input.all()[0].json.choices[0].message.content;
const topic = $('Configurar tema del artículo').item.json.topic;
const location = $('Configurar tema del artículo').item.json.location;

// Generar slug
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Extraer título (primera línea del markdown)
const lines = openAIResponse.split('\n');
let title = lines[0].replace(/^#\s+/, '');

// Si el título no menciona la ubicación, añadirla
if (!title.toLowerCase().includes(location.toLowerCase())) {
  title = `${title} en ${location}`;
}

// Generar excerpt (primeros 160 caracteres del contenido)
const contentWithoutTitle = lines.slice(1).join('\n').trim();
const excerpt = contentWithoutTitle
  .replace(/^#+ /gm, '')
  .substring(0, 160)
  .trim() + '...';

// Detectar categorías y tags basados en el tema
const categoryMap = {
  'Implantes': ['Implantes Dentales', 'Tratamientos'],
  'Ortodoncia': ['Ortodoncia', 'Tratamientos'],
  'Invisalign': ['Ortodoncia', 'Tratamientos'],
  'Blanqueamiento': ['Estética Dental', 'Tratamientos'],
  'Infantil': ['Odontopediatría', 'Salud Bucodental'],
  'Niños': ['Odontopediatría', 'Salud Bucodental'],
  'Encías': ['Periodoncia', 'Salud Bucodental'],
  'Estética': ['Estética Dental', 'Tratamientos'],
  'Urgencias': ['Urgencias Dentales', 'Salud Bucodental'],
  'Brackets': ['Ortodoncia', 'Tratamientos'],
  'Limpieza': ['Higiene Dental', 'Prevención'],
  'Caries': ['Salud Bucodental', 'Prevención']
};

const tagMap = {
  'Implantes': ['implantes dentales viladecans', 'precio implantes dentales'],
  'Ortodoncia': ['ortodoncia invisible viladecans', 'brackets'],
  'Invisalign': ['invisalign viladecans', 'ortodoncia invisible'],
  'Blanqueamiento': ['blanqueamiento dental viladecans', 'dientes blancos'],
  'Infantil': ['odontopediatría', 'dentista niños viladecans'],
  'Niños': ['odontopediatría', 'dentista niños viladecans'],
  'Encías': ['enfermedad periodontal', 'salud encías'],
  'Estética': ['estética dental', 'diseño sonrisa'],
  'Urgencias': ['urgencias dentales', 'dolor dental'],
  'Brackets': ['brackets', 'ortodoncia tradicional'],
  'Limpieza': ['limpieza dental', 'profilaxis'],
  'Caries': ['prevención caries', 'salud dental']
};

let categories = ['Salud Bucodental'];
let tags = ['consejos dentales', 'viladecans'];

for (const [key, cats] of Object.entries(categoryMap)) {
  if (topic.includes(key)) {
    categories = cats;
    break;
  }
}

for (const [key, tagList] of Object.entries(tagMap)) {
  if (topic.includes(key)) {
    tags = [...tags, ...tagList];
    break;
  }
}

return [{
  json: {
    title,
    slug: slugify(title),
    content: openAIResponse,
    excerpt,
    categories: [...new Set(categories)], // eliminar duplicados
    tags: [...new Set(tags)],
    metaTitle: title,
    metaDescription: excerpt,
    topic,
    location
  }
}];
```

---

### NODO 7: HTTP Request - Unsplash (Buscar Imagen)

```
Node Type: HTTP Request
Name: "Buscar imagen en Unsplash"

Settings:
- Authentication: None
- Method: GET
- URL: https://api.unsplash.com/search/photos

Query Parameters:
- query: dental {{ $json.topic }}
- client_id: TU_UNSPLASH_ACCESS_KEY
- per_page: 1
- orientation: landscape

Options:
- Response Format: JSON
```

#### Cómo obtener Unsplash Access Key:

1. Ve a [unsplash.com/developers](https://unsplash.com/developers)
2. Crea una cuenta / Inicia sesión
3. Click "New Application"
4. Acepta los términos
5. Nombre: "Vela-Segalà Blog"
6. Descripción: "Imágenes para blog dental"
7. Copia el "Access Key"

---

### NODO 8: Code Node - Extraer URL de Imagen

```
Node Type: Code
Name: "Extraer URL de imagen"

JavaScript Code:
```javascript
const previousData = $('Preparar datos para publicar').item.json;
const unsplashData = $input.all()[0].json;

let featuredImageUrl = null;

if (unsplashData.results && unsplashData.results.length > 0) {
  featuredImageUrl = unsplashData.results[0].urls.regular;
}

return [{
  json: {
    ...previousData,
    featuredImageUrl
  }
}];
```

---

### NODO 9: HTTP Request - Publicar en tu Web

```
Node Type: HTTP Request
Name: "Publicar artículo en la web"

Settings:
- Authentication: None
- Method: POST
- URL: https://velasegala-web-production.up.railway.app/api/webhooks/n8n/blog-post

Headers:
- Name: Content-Type
  Value: application/json
  
- Name: x-api-key
  Value: {{ $env.N8N_API_KEY }}

Body:
- Content Type: JSON
- Body:
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
  "publishStatus": "published",
  "publishAt": "={{ $now.toISO() }}"
}
```

---

## 🔧 Paso 5: Configurar Variables de Entorno en n8n

En n8n Cloud:
1. Settings → Environments
2. Añade:
   - `N8N_API_KEY`: Tu API key de Railway

En n8n Self-Hosted:
1. Crea archivo `.env`:
```bash
N8N_API_KEY=tu-api-key-aqui
```

---

## 🧪 Paso 6: Probar el Workflow

1. Guarda el workflow (Ctrl/Cmd + S)
2. Click en "Execute Workflow" (botón de play arriba)
3. Observa cada nodo:
   - ✅ Verde = éxito
   - ❌ Rojo = error
4. Si hay error, click en el nodo para ver detalles

---

## 📊 Paso 7: Verificar que Funciona

1. Ve a tu dashboard: `https://velasegala-web-emc8.vercel.app/admin/posts`
2. Deberías ver el nuevo artículo
3. Ve al blog público: `https://velasegala-web-emc8.vercel.app/blog`
4. El artículo debe aparecer con:
   - ✅ Título optimizado para SEO
   - ✅ Imagen destacada de Unsplash
   - ✅ Categorías asignadas
   - ✅ Etiquetas asignadas
   - ✅ Contenido en Markdown formateado
   - ✅ Meta descripción para SEO

---

## 🎯 Paso 8: Automatizar (Opcional)

### Opción A: Ejecución Diaria Automática

Ya está configurado con el Schedule Trigger. El workflow se ejecutará cada día a las 10:00 AM.

### Opción B: Ejecución Manual con Lista de Temas

Crea un archivo CSV con temas:

```csv
topic,priority
Implantes Dentales Todo sobre el Procedimiento,high
Ortodoncia Invisible Guía Completa,high
Cómo Cuidar tus Implantes Dentales,medium
Blanqueamiento Dental en Casa vs Profesional,medium
```

Luego añade un nodo "Read Binary File" al inicio.

---

## 🔍 Solución de Problemas

### Error: "API Key inválida"
- Verifica que la API Key esté correctamente configurada en Railway
- Verifica que el header `x-api-key` esté en la petición

### Error: "CORS blocked"
- Ya está solucionado en el último deploy
- Espera 2-3 minutos después del deploy de Railway

### Error: "Categories/Tags no se crean"
- El backend las crea automáticamente si no existen
- Verifica que los nombres sean strings válidos

### Artículo no aparece en el blog
- Verifica que `publishStatus` sea `"published"` (en minúsculas)
- Verifica que `publishAt` sea una fecha pasada o actual

---

## 💰 Costes Aproximados

- **n8n Cloud**: Gratis hasta 5,000 ejecuciones/mes
- **OpenAI API**: ~$0.002 por artículo (con gpt-4o-mini)
- **Google Custom Search**: Gratis hasta 100 búsquedas/día
- **Unsplash API**: Gratis (50,000 requests/mes)

**Total**: ~$0.06/mes para 30 artículos (casi gratis)

---

## 📈 Mejoras Futuras

1. **Variedad de temas**: Conectar con Google Trends para temas populares
2. **Imágenes propias**: Subir imágenes a Cloudinary en lugar de Unsplash
3. **Revisión humana**: Añadir un paso de aprobación antes de publicar
4. **SEO avanzado**: Análisis de keywords con herramientas como Ahrefs API
5. **Redes sociales**: Publicar automáticamente en Instagram/Facebook

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de Railway: https://railway.app → tu proyecto → Deployments
2. Revisa los logs de n8n en cada nodo
3. Verifica las API keys en todas las plataformas

---

¡Tu agente de IA está listo! 🎉

