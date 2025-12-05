# Clínica Dental Vela-Segalà - Viladecans

Web corporativa completa para la Clínica Dental Vela-Segalà en Viladecans, Barcelona. Proyecto optimizado para SEO local con sistema de blog automatizado mediante IA.

## 🚀 Tecnologías

### Frontend
- **Next.js 14** (App Router) - Framework React para SSR/SSG
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Lucide React** - Iconos SVG profesionales
- **Embla Carousel** - Carrusel de reseñas

### Backend
- **NestJS** - Framework Node.js escalable
- **PostgreSQL** - Base de datos relacional
- **Prisma ORM** - ORM con TypeScript
- **JWT** - Autenticación
- **API Key** - Seguridad para webhooks

### Integración IA
- **n8n** - Automatización de workflows
- **AI Agent** - Generación automática de contenido de blog

## 📁 Estructura del Proyecto

```
vela-segala/
├── frontend/           # Next.js App
│   ├── app/           # App Router
│   │   ├── (main)/   # Layout principal
│   │   │   ├── page.tsx                    # Homepage
│   │   │   ├── clinica-dental-viladecans/  # Página clínica
│   │   │   ├── tratamientos/               # Tratamientos
│   │   │   ├── blog/                       # Blog con filtros
│   │   │   └── contacto/                   # Contacto
│   │   └── layout.tsx
│   ├── components/    # Componentes React
│   ├── lib/          # Utilidades
│   └── public/       # Assets estáticos
│
├── backend/           # NestJS API
│   ├── src/
│   │   ├── posts/         # Blog posts
│   │   ├── categories/    # Categorías
│   │   ├── tags/          # Etiquetas
│   │   ├── webhooks/      # n8n integration
│   │   └── auth/          # Autenticación
│   └── prisma/
│       └── schema.prisma  # Schema de DB
│
└── images/            # Imágenes del proyecto
```

## 🔧 Configuración Local

### Requisitos Previos
- Node.js 18+ 
- PostgreSQL 14+
- npm o yarn

### 1. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

El frontend estará en `http://localhost:3000`

### 2. Backend (NestJS)

```bash
cd backend
npm install

# Configurar .env (ver backend/.env.example)
cp .env.example .env

# Ejecutar migraciones
npx prisma migrate dev

# Iniciar servidor
npm run start:dev
```

El backend estará en `http://localhost:3001`

## 🌐 Deployment a Producción

### Frontend - Vercel

1. **Conecta tu repositorio a Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Import Git Repository
   - Selecciona el directorio: `frontend`

2. **Variables de entorno en Vercel:**
   ```
   NEXT_PUBLIC_API_URL=https://tu-backend.railway.app/api
   ```

3. **Deploy automático:**
   - Cada push a `main` despliega automáticamente

### Backend - Railway

1. **Crea una base de datos PostgreSQL:**
   - Ve a [railway.app](https://railway.app)
   - New Project → PostgreSQL
   - Copia la `DATABASE_URL`

2. **Deploy el backend:**
   - New Service → GitHub Repo
   - Selecciona el directorio: `backend`

3. **Variables de entorno en Railway:**
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=tu-secreto-super-seguro-cambiar-esto
   N8N_API_KEY=tu-clave-api-n8n-segura
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=https://tu-dominio.vercel.app
   ```

4. **Ejecutar migraciones:**
   ```bash
   npx prisma migrate deploy
   ```

### Alternativas de Base de Datos
- **Railway** (Recomendado) - $5/mes con 500 horas
- **Neon** - Plan gratuito hasta 0.5GB
- **Supabase** - Plan gratuito hasta 500MB
- **Render** - Plan gratuito con limitaciones

## 🤖 Configuración n8n

### Webhook para Blog Automatizado

**Endpoint:**
```
POST https://tu-backend.railway.app/webhooks/n8n/blog-post
```

**Headers:**
```
x-api-key: tu-clave-api-n8n-segura
Content-Type: application/json
```

**Payload:**
```json
{
  "title": "Título generado por IA",
  "slug": "titulo-generado",
  "content": "Contenido completo...",
  "excerpt": "Resumen",
  "categories": ["Salud Bucodental"],
  "tags": ["Prevención", "Cuidados"],
  "metaTitle": "SEO Title",
  "metaDescription": "SEO Description",
  "publishStatus": "PUBLISHED"
}
```

Ver documentación completa en: [`backend/INSTRUCCIONES_BACKEND.md`](./backend/INSTRUCCIONES_BACKEND.md)

## 📊 Características del Proyecto

### Frontend
- ✅ **SEO Optimizado** para Viladecans
- ✅ **12 Páginas de Tratamientos** con contenido extenso
- ✅ **Blog con Filtros** por categorías y etiquetas
- ✅ **Reseñas de Google** en carrusel
- ✅ **Google Maps** integrado
- ✅ **Formulario de Contacto** con validación
- ✅ **Chatbot Interactivo** con preguntas frecuentes
- ✅ **Diseño Premium** con efectos hover y transiciones
- ✅ **Responsive** mobile-first

### Backend
- ✅ **API REST** completa con NestJS
- ✅ **Autenticación JWT** para admin
- ✅ **CRUD completo** de posts, categorías y tags
- ✅ **Webhook seguro** para n8n
- ✅ **Filtros avanzados** y paginación
- ✅ **Validación de datos** con class-validator
- ✅ **Gestión automática** de categorías/tags

### SEO
- ✅ Schema.org: LocalBusiness, Dentist, FAQPage, Article
- ✅ Meta titles y descriptions optimizados
- ✅ URLs amigables: `/tratamientos/[slug]`, `/blog/[slug]`
- ✅ Breadcrumbs en todas las páginas
- ✅ Sitemap.xml automático
- ✅ Core Web Vitals optimizado

## 📝 Información del Proyecto

**Cliente:** Clínica Dental Vela-Segalà  
**Ubicación:** Carrer de la Mare de Déu de Sales, 67, 08840 Viladecans, Barcelona  
**Teléfono:** 93 658 84 06  
**Email:** segala@velasegala.com  

**Doctores:**
- Dr. Xavier Vela
- Dra. Maribel Segalà

**Horarios:**
- Lunes a Jueves: 9:00 - 14:00 y 15:00 - 20:00
- Viernes: 9:00 - 15:00

## 📚 Documentación Adicional

- [Instrucciones Backend](./backend/INSTRUCCIONES_BACKEND.md) - API, endpoints, n8n
- [Actualizar Reseñas](./COMO_ACTUALIZAR_RESEÑAS.md) - Cómo gestionar reseñas de Google
- [Instrucciones Iniciales](./INSTRUCCIONES.md) - Contexto y requisitos del proyecto

## 🔒 Variables de Entorno

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (.env)
```bash
DATABASE_URL="postgresql://..."
JWT_SECRET="..."
N8N_API_KEY="..."
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

## 🐛 Troubleshooting

### Error de conexión a base de datos
- Verifica que PostgreSQL esté corriendo
- Comprueba la `DATABASE_URL` en `.env`

### Error 404 en API
- Verifica que el backend esté corriendo en el puerto correcto
- Comprueba `NEXT_PUBLIC_API_URL` en el frontend

### Imágenes no se ven
- Las imágenes deben estar en `frontend/public/images/`
- Referencia: `/images/nombre-imagen.jpg`

## 📞 Soporte

Para dudas sobre el proyecto, contacta con el desarrollador.

## 📄 Licencia

Proyecto privado para Clínica Dental Vela-Segalà.

---

**Desarrollado con ❤️ para Clínica Dental Vela-Segalà Viladecans**

