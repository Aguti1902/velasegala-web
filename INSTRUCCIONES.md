# 🚀 Instrucciones de Instalación y Uso

## 📋 Resumen del Proyecto

Has recibido una **arquitectura completa** para la web de la clínica dental en Viladecans, incluyendo:

### Frontend (Next.js 14)
- ✅ Home con secciones optimizadas para conversión
- ✅ Página "Clínica Dental Viladecans" (SEO local con NAP, mapa, FAQs)
- ✅ Página de tratamiento ejemplo: Implantes Dentales (replicable para otros tratamientos)
- ✅ Blog con listado paginado y posts individuales
- ✅ Componentes de Schema.org (LocalBusiness, FAQPage, Article, Breadcrumb)
- ✅ Header y Footer completos con navegación
- ✅ Diseño responsive y optimizado para Core Web Vitals

### Backend (NestJS + PostgreSQL)
- ✅ API REST completa con autenticación JWT
- ✅ CRUD de posts, categorías, tags y tratamientos
- ✅ Webhook para integración con n8n (generación automática de contenido)
- ✅ Schema de Prisma con modelos completos
- ✅ Seed con contenido de ejemplo (3 tratamientos + 3 posts blog)

---

## 🛠️ Instalación

### 1. Requisitos Previos

- Node.js 18+ y npm
- PostgreSQL 14+
- Git

### 2. Configurar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Copiar .env.example a .env y configurar
cp .env.example .env

# Editar .env con tus credenciales de PostgreSQL:
# DATABASE_URL="postgresql://user:password@localhost:5432/clinica_dental_viladecans"
# JWT_SECRET="tu-secreto-jwt-muy-seguro"
# N8N_API_KEY="tu-api-key-para-n8n"

# Generar cliente de Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate

# Poblar base de datos con contenido de ejemplo
npm run prisma:seed

# Iniciar servidor de desarrollo
npm run start:dev
```

El backend estará disponible en `http://localhost:3001/api`

**Credenciales del admin creado por el seed:**
- Email: `admin@clinicadentalviladecans.com`
- Password: `admin123456`

### 3. Configurar Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Copiar .env.example a .env.local
cp .env.example .env.local

# Editar .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:3001/api
# NEXT_PUBLIC_SITE_URL=http://localhost:3000
# (resto de variables según necesites)

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

---

## 📄 Páginas Creadas

### Frontend

| Ruta | Descripción | SEO |
|------|-------------|-----|
| `/` | Home (Hero, Tratamientos, Testimonios, CTA) | ✅ Keyword principal |
| `/clinica-dental-viladecans` | Página local SEO (NAP, equipo, instalaciones, mapa, FAQs) | ✅ Schema LocalBusiness + FAQPage |
| `/tratamientos/implantes-dentales-viladecans` | Landing de tratamiento con FAQ | ✅ Schema FAQPage |
| `/blog` | Listado de posts paginado | ✅ Breadcrumbs |
| `/blog/[slug]` | Post individual con markdown | ✅ Schema Article |

---

## 🔌 API Endpoints

### Públicos

```
GET    /api/posts                    # Listado posts publicados (paginado)
GET    /api/posts/:slug              # Post por slug
GET    /api/categories               # Listado categorías
GET    /api/tags                     # Listado tags
GET    /api/treatments               # Listado tratamientos
GET    /api/treatments/:slug         # Tratamiento por slug
```

### Admin (requiere JWT en header `Authorization: Bearer TOKEN`)

```
POST   /api/auth/login               # Login admin
POST   /api/auth/register            # Registro admin
GET    /api/auth/me                  # Perfil usuario actual

GET    /api/posts/admin/all          # Todos los posts (incluye drafts)
POST   /api/posts/admin              # Crear post
PUT    /api/posts/admin/:id          # Actualizar post
DELETE /api/posts/admin/:id          # Eliminar post
```

### Webhook n8n (requiere API Key en header `x-api-key`)

```
POST   /api/webhooks/n8n/blog-post   # Crear post desde n8n
```

**Payload ejemplo:**
```json
{
  "title": "Título del post",
  "slug": "slug-opcional",
  "content": "Contenido en Markdown",
  "excerpt": "Resumen breve",
  "featuredImageUrl": "https://...",
  "categories": ["Implantes dentales", "Viladecans"],
  "tags": ["implantes dentales viladecans"],
  "metaTitle": "Meta title SEO",
  "metaDescription": "Meta description SEO",
  "publishStatus": "published",
  "publishAt": "2025-01-20T10:00:00Z"
}
```

---

## 🤖 Integración con n8n

Para que tu agente de IA en n8n pueda crear posts automáticamente:

1. **Configura la API Key** en el `.env` del backend:
   ```
   N8N_API_KEY=tu-clave-secreta-muy-segura
   ```

2. **En tu workflow de n8n**, añade un nodo **HTTP Request** con:
   - **Method**: POST
   - **URL**: `http://tu-backend-url/api/webhooks/n8n/blog-post`
   - **Authentication**: None
   - **Headers**:
     ```
     x-api-key: tu-clave-secreta-muy-segura
     Content-Type: application/json
     ```
   - **Body**: JSON con los campos del post

3. **El backend**:
   - Valida la API key
   - Genera slug único si no viene
   - Crea o conecta categorías y tags automáticamente
   - Crea el post con el estado especificado (draft/published/scheduled)

---

## 📊 Contenido de Ejemplo

El seed ha creado:

### 3 Tratamientos
1. **Implantes Dentales en Viladecans** (800€-1.500€)
2. **Ortodoncia Invisible en Viladecans** (2.500€-4.500€)
3. **Estética Dental en Viladecans** (200€-3.000€)

### 3 Posts de Blog (optimizados SEO)
1. **Precio de Implantes Dentales en Viladecans: Factores que Influyen**
2. **Ortodoncia Invisible en Viladecans: Ventajas, Duración y Cuidados**
3. **Primera Visita al Dentista en Viladecans: Qué Esperar y Cómo Prepararte**

### 4 Categorías
- Implantes Dentales
- Ortodoncia
- Estética Dental
- Viladecans

### 6 Tags
- implantes dentales viladecans
- precio implantes dentales
- ortodoncia invisible viladecans
- invisalign viladecans
- blanqueamiento dental viladecans
- carillas dentales

---

## 🎨 Próximos Pasos

### 1. Personalizar Contenidos

Edita `/frontend/lib/constants.ts` con:
- ✅ Información real de la clínica (nombre, dirección, teléfono, email)
- ✅ Coordenadas GPS correctas para el mapa
- ✅ Redes sociales
- ✅ Horarios reales

### 2. Añadir Más Páginas de Tratamientos

Duplica la estructura de `/tratamientos/implantes-dentales-viladecans/page.tsx` y adapta el contenido para:
- Ortodoncia Invisible
- Blanqueamiento Dental
- Carillas Dentales
- Odontopediatría
- Periodoncia
- Endodoncia
- Prótesis Dentales
- Urgencias Dentales

### 3. Añadir Imágenes Reales

Reemplaza los placeholders con fotos reales en:
- `/public/images/clinica-exterior.jpg`
- `/public/images/tratamientos/`
- `/public/images/blog/`
- `/public/logo.png`
- `/public/og-image.jpg`

### 4. Configurar Google Maps

Añade el iframe de Google Maps en:
- `/frontend/app/(main)/clinica-dental-viladecans/page.tsx` (sección mapa)

### 5. Integrar Formularios de Contacto

Crea los endpoints en el backend para:
- Formulario de contacto (`POST /api/contact`)
- Solicitud de cita (`POST /api/appointments`)

Y conecta los formularios del frontend.

### 6. SEO Avanzado

- ✅ Configura Google Search Console
- ✅ Añade Google Analytics
- ✅ Genera y sube `sitemap.xml`
- ✅ Configura `robots.txt`
- ✅ Verifica Schema.org con Google Rich Results Test

### 7. Optimización de Imágenes

- Usa formatos WebP/AVIF
- Comprime todas las imágenes
- Usa `next/image` con `priority` en imágenes above the fold

### 8. Deploy

**Backend:**
- Railway, Render, DigitalOcean o VPS
- Asegúrate de configurar las variables de entorno

**Frontend:**
- Vercel (recomendado para Next.js) o Netlify
- Configura las variables de entorno

**Base de Datos:**
- PostgreSQL en la misma plataforma del backend o servicio separado (Supabase, Neon, etc.)

---

## 🔒 Seguridad

Antes de producción:
- ✅ Cambia todas las claves secretas (JWT_SECRET, N8N_API_KEY)
- ✅ Usa HTTPS en producción
- ✅ Configura CORS correctamente
- ✅ Deshabilita el registro de usuarios admin si no lo necesitas
- ✅ Implementa rate limiting en endpoints sensibles

---

## 📞 Testing

### Probar la API

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@clinicadentalviladecans.com","password":"admin123456"}'

# Obtener posts
curl http://localhost:3001/api/posts

# Crear post desde n8n
curl -X POST http://localhost:3001/api/webhooks/n8n/blog-post \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-n8n-secret-api-key-change-this" \
  -d '{
    "title": "Test desde n8n",
    "content": "Contenido de prueba",
    "publishStatus": "draft"
  }'
```

---

## 💡 Tips de SEO Local

1. **NAP Consistency**: Asegúrate de que Nombre, Dirección y Teléfono sean idénticos en toda la web y en Google My Business

2. **Google My Business**: Optimiza tu ficha con fotos, horarios, servicios y reseñas

3. **Reseñas**: Pide a tus pacientes que dejen reseñas en Google (crítico para SEO local)

4. **Contenido Local**: Menciona "Viladecans" naturalmente en contenidos, títulos y meta descriptions

5. **Blog Activo**: Publica al menos 2-4 artículos al mes con tu agente de IA de n8n

6. **Backlinks Locales**: Consigue enlaces de:
   - Directorio de empresas de Viladecans
   - Asociaciones locales
   - Periódicos/blogs locales

---

## ✅ Checklist Pre-Launch

- [ ] Información de contacto real en todas partes
- [ ] Imágenes reales de la clínica y equipo
- [ ] Google Maps integrado
- [ ] Formularios de contacto funcionando
- [ ] Google Analytics configurado
- [ ] Google Search Console configurado
- [ ] Favicon y logo corporativo
- [ ] Textos legales (Aviso Legal, Privacidad, Cookies)
- [ ] Testear en móvil y desktop
- [ ] Verificar Core Web Vitals con Lighthouse
- [ ] Comprobar Schema.org con Google Rich Results Test
- [ ] SSL/HTTPS activado
- [ ] Variables de entorno en producción
- [ ] Backup automático de base de datos configurado

---

## 🎯 Objetivos Cumplidos

✅ Arquitectura completa frontend + backend  
✅ SEO local optimizado (keywords Viladecans en páginas estratégicas)  
✅ Schema.org implementado (LocalBusiness, FAQPage, Article)  
✅ Blog preparado para contenido automatizado vía n8n  
✅ Diseño limpio, moderno y responsive  
✅ API REST escalable con autenticación  
✅ Contenido de ejemplo de calidad  
✅ Estructura replicable para más tratamientos  

---

## 📚 Documentación Útil

- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com/)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Schema.org Dentist](https://schema.org/Dentist)
- [Google Search Central](https://developers.google.com/search)

---

¡Buena suerte con el proyecto! Si tienes dudas o necesitas ampliar funcionalidades, el código está bien estructurado y documentado para facilitar la escalabilidad.

