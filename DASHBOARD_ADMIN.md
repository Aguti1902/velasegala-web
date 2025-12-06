# Dashboard de Administración - Blog Vela-Segalà

Panel de administración completo para gestionar el blog, artículos creados por el agente de IA, categorías, tags y estadísticas.

## 🎯 Características

### ✅ Lo que incluye el Dashboard:

1. **Autenticación Segura**
   - Login con JWT
   - Protección de rutas con middleware
   - Sesión persistente por 24 horas

2. **Dashboard Principal**
   - Estadísticas generales (posts, visitas, categorías, tags)
   - Gráficos de visitas diarias (última semana)
   - Gráficos de artículos publicados (últimos 6 meses)
   - Lista de artículos recientes
   - Indicadores de estado (publicado, borrador, programado)

3. **Gestión de Artículos**
   - Lista completa con búsqueda y filtros
   - Crear artículos manualmente
   - Editar artículos (creados manualmente o por IA)
   - Eliminar artículos
   - Publicar/despublicar artículos
   - Ver preview en tiempo real
   - Programar publicaciones

4. **Editor de Markdown**
   - Editor de texto con sintaxis Markdown
   - Preview en tiempo real
   - Soporte completo de Markdown (títulos, listas, negritas, cursivas, links, etc.)
   - Contador de caracteres para SEO
   - Campos de meta title y meta description

5. **Gestión de Categorías**
   - Crear, editar y eliminar categorías
   - Ver cantidad de artículos por categoría
   - Generación automática de slugs

6. **Gestión de Etiquetas (Tags)**
   - Crear, editar y eliminar tags
   - Ver cantidad de artículos por tag
   - Generación automática de slugs

7. **Gestión de Imágenes**
   - Campo para URL de imagen destacada
   - Preview de la imagen
   - Integración con el agente de IA (que proporciona las URLs)

## 🚀 Acceso al Dashboard

### URL de acceso:
```
https://tu-dominio.vercel.app/admin
```

### Credenciales de prueba:
```
Email: admin@velasegala.com
Password: Admin123!
```

**IMPORTANTE:** Cambia estas credenciales en producción:
1. Ve a Railway → Backend → Logs
2. Ejecuta el seed para crear un usuario admin con tu contraseña
3. O usa Prisma Studio para editar el usuario directamente

## 📊 Funcionalidades Detalladas

### 1. Dashboard Principal (`/admin`)

**Muestra:**
- **Total de Artículos**: Contador con publicados y borradores
- **Total de Visitas**: Con porcentaje de crecimiento (mock - implementar analytics real)
- **Categorías**: Cantidad total con link a gestión
- **Etiquetas**: Cantidad total con link a gestión
- **Gráfico de Visitas**: Últimos 7 días (mock data)
- **Gráfico de Publicaciones**: Últimos 6 meses (mock data)
- **Artículos Recientes**: Los 5 artículos más recientes con su estado

**Acciones Rápidas:**
- Crear Artículo Manual
- Revisar Borradores
- Gestionar Categorías

---

### 2. Gestión de Artículos (`/admin/posts`)

**Funcionalidades:**

#### Listado de Artículos:
- Tarjetas con título, excerpt, estado, fecha y meta información
- **Estados visuales:**
  - 🟢 **Publicado**: Verde
  - 🟡 **Borrador**: Amarillo
  - 🔵 **Programado**: Azul
- Categorías y tags asignados (primeras 2-3 visibles)
- Fecha de publicación formateada

#### Búsqueda y Filtros:
- **Buscador**: Por título o excerpt
- **Filtro por estado**: Todos, Publicados, Borradores, Programados
- **Estadísticas**: Total, publicados, borradores

#### Acciones por Artículo:
- **Editar**: Ir al editor completo
- **Ver en web**: Abrir en nueva pestaña
- **Publicar**: Cambiar estado a publicado (solo borradores)
- **Eliminar**: Con confirmación

---

### 3. Editor de Artículos (`/admin/posts/new` o `/admin/posts/[id]`)

**Estructura:**

#### Columna Principal (2/3):

1. **Título**
   - Campo de texto grande
   - Genera automáticamente el slug y meta title

2. **Slug (URL)**
   - Se genera automáticamente del título
   - Editable manualmente
   - Preview de la URL final: `/blog/{slug}`

3. **Contenido (Markdown)**
   - Editor de texto grande (mínimo 500px de alto)
   - Botón para cambiar entre Editor y Preview
   - Preview renderiza el Markdown en tiempo real
   - Soporte completo de Markdown:
     - `# H1`, `## H2`, `### H3`
     - `**negrita**`, `*cursiva*`
     - Listas ordenadas y desordenadas
     - Links `[texto](url)`
     - Código `` `inline` `` y bloques
     - Tablas (con `remark-gfm`)

4. **Excerpt (Resumen)**
   - Textarea de 3 filas
   - Máximo 160 caracteres
   - Contador de caracteres

#### Sidebar (1/3):

1. **Configuración de Publicación**
   - **Estado**: Selector (Borrador, Publicado, Programado)
   - **Fecha de Publicación**: Input datetime-local
     - Para programar publicaciones futuras

2. **Imagen Destacada**
   - Campo de URL
   - Preview de la imagen
   - Fallback si la imagen no carga

3. **Categorías**
   - Lista de checkboxes
   - Scrollable si hay muchas
   - Selección múltiple

4. **Etiquetas**
   - Lista de checkboxes
   - Scrollable si hay muchas
   - Selección múltiple

5. **SEO**
   - **Meta Title**: Input con contador (máx. 60 caracteres)
   - **Meta Description**: Textarea con contador (máx. 160 caracteres)

**Botones de Acción:**
- **Volver**: A la lista de artículos
- **Toggle Editor/Preview**: Cambiar vista
- **Guardar**: Crear o actualizar artículo

---

### 4. Gestión de Categorías (`/admin/categories`)

**Vista de Cards:**
- Grid de 3 columnas (responsive)
- Cada card muestra:
  - Icono de carpeta (naranja)
  - Nombre de la categoría
  - Slug (`/slug`)
  - Cantidad de artículos

**Acciones:**
- **Crear Nueva Categoría**: Modal con formulario
- **Editar Categoría**: Modal con datos precargados
- **Eliminar Categoría**: Con confirmación

**Modal de Crear/Editar:**
- **Nombre**: Campo de texto (requerido)
- **Slug**: Se genera automáticamente (editable)
- Botones: Cancelar, Guardar

---

### 5. Gestión de Etiquetas (`/admin/tags`)

**Vista de Cards:**
- Grid de 4 columnas (responsive)
- Cada card muestra:
  - Icono de etiqueta (verde)
  - Nombre con # delante
  - Slug (`/slug`)
  - Cantidad de artículos

**Acciones:**
- **Crear Nueva Etiqueta**: Modal con formulario
- **Editar Etiqueta**: Modal con datos precargados
- **Eliminar Etiqueta**: Con confirmación

**Modal de Crear/Editar:**
- **Nombre**: Campo de texto (requerido)
- **Slug**: Se genera automáticamente (editable)
- Botones: Cancelar, Guardar

---

## 🔐 Autenticación

### Flujo de Login:

1. **Usuario accede a `/admin`**
2. **Middleware verifica cookie `admin_token`**
3. **Si no existe o es inválida → Redirige a `/admin/login`**
4. **Usuario ingresa credenciales**
5. **Frontend llama a `POST /api/auth/login` del backend**
6. **Backend valida y devuelve JWT**
7. **Frontend guarda JWT en cookie (`admin_token`)**
8. **Redirige a `/admin`**

### Cerrar Sesión:

1. **Click en "Cerrar Sesión"**
2. **Frontend elimina cookie**
3. **Redirige a `/admin/login`**

### Rutas Protegidas:

- `/admin/*` (todas excepto `/admin/login`)
- Usa middleware en `frontend/middleware.ts`
- Verifica cookie `admin_token` en cada request

---

## 🤖 Integración con Agente de IA

### Flujo de Creación de Artículos por IA:

1. **n8n ejecuta workflow** (ej: cada Lunes, Miércoles, Viernes a las 10:00)
2. **OpenAI/Claude genera el artículo** con prompt personalizado
3. **Function Node formatea la respuesta** (parsea JSON)
4. **DALL-E/Unsplash genera/busca imagen** (opcional)
5. **HTTP Request envía a webhook del backend**:
   ```
   POST https://tu-backend.railway.app/api/webhooks/n8n/blog-post
   Headers:
     x-api-key: [tu N8N_API_KEY]
     Content-Type: application/json
   Body:
     {
       "title": "...",
       "slug": "...",
       "content": "...",
       "excerpt": "...",
       "featuredImageUrl": "...",
       "categories": ["Salud Bucodental"],
       "tags": ["Consejos", "Prevención"],
       "metaTitle": "...",
       "metaDescription": "...",
       "publishStatus": "DRAFT",
       "publishAt": "2024-12-06T10:00:00Z"
       }
   ```
6. **Backend crea el post** como DRAFT
7. **Notificación a Slack/Email** (opcional)
8. **Admin revisa en Dashboard** (`/admin` o `/admin/posts?status=DRAFT`)
9. **Admin edita si es necesario** (`/admin/posts/[id]`)
10. **Admin publica** (cambia estado a PUBLISHED)

### Editar Artículos Creados por IA:

Los artículos creados por el agente de IA son **completamente editables**:
- Cambiar título, contenido, excerpt
- Modificar categorías y tags
- Cambiar imagen destacada
- Ajustar SEO (meta title, meta description)
- Cambiar fecha de publicación
- Cambiar estado (borrador → publicado)

---

## 📈 Estadísticas y Analytics

### Datos Actuales (Mock):

El dashboard actualmente muestra datos de ejemplo para:
- Visitas totales y crecimiento
- Gráfico de visitas diarias (últimos 7 días)
- Visitas por artículo

### Implementar Analytics Real:

**Opción 1: Google Analytics 4**

1. **Instalar dependencia:**
   ```bash
   npm install react-ga4
   ```

2. **Configurar en `frontend/app/layout.tsx`:**
   ```typescript
   import ReactGA from 'react-ga4';

   useEffect(() => {
     ReactGA.initialize('G-XXXXXXXXXX'); // Tu ID de GA4
   }, []);
   ```

3. **Trackear vistas de artículos:**
   ```typescript
   // En frontend/app/(main)/blog/[slug]/page.tsx
   useEffect(() => {
     ReactGA.send({ hitType: "pageview", page: `/blog/${slug}` });
   }, [slug]);
   ```

4. **Obtener datos en el Dashboard:**
   - Usar Google Analytics Data API
   - O mostrar iframe de Google Analytics

**Opción 2: Plausible Analytics (Privacidad-First)**

1. **Crear cuenta en https://plausible.io**
2. **Añadir script en `frontend/app/layout.tsx`:**
   ```html
   <script defer data-domain="tudominio.com" src="https://plausible.io/js/script.js"></script>
   ```
3. **Acceder a stats via API:**
   ```typescript
   const response = await fetch(
     `https://plausible.io/api/v1/stats/aggregate?site_id=tudominio.com&period=7d&metrics=visitors,pageviews`,
     {
       headers: {
         Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
       },
     }
   );
   ```

**Opción 3: Custom Analytics (Prisma)**

1. **Crear modelo en `backend/prisma/schema.prisma`:**
   ```prisma
   model PageView {
     id        String   @id @default(uuid())
     postId    String?
     post      Post?    @relation(fields: [postId], references: [id])
     path      String
     userAgent String?
     createdAt DateTime @default(now())
   }
   ```

2. **Endpoint para trackear:**
   ```typescript
   // backend/src/analytics/analytics.controller.ts
   @Post('track')
   async track(@Body() data: { postId?: string; path: string }) {
     return this.prisma.pageView.create({ data });
   }
   ```

3. **Obtener estadísticas:**
   ```typescript
   // Visitas de los últimos 7 días
   const views = await prisma.pageView.groupBy({
     by: ['createdAt'],
     _count: true,
     where: {
       createdAt: {
         gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
       },
     },
   });
   ```

---

## 🎨 Personalización del Dashboard

### Cambiar Colores:

Edita `frontend/tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      // Cambiar color principal (actualmente negro)
      primary: '#000000',
      // O usar colores de tu marca
      brand: {
        50: '#f5f5f5',
        100: '#e5e5e5',
        // ... hasta 900
      },
    },
  },
},
```

### Cambiar Logo del Dashboard:

Reemplaza en `frontend/app/admin/layout.tsx`:

```typescript
<Image
  src="/images/Logos/Isotipo.png" // Cambiar por tu logo
  alt="Tu Clínica"
  width={40}
  height={40}
/>
```

### Cambiar Información del Admin:

Edita `frontend/app/admin/layout.tsx`:

```typescript
<p className="text-sm font-medium">Tu Nombre</p>
<p className="text-xs text-gray-500">tu-email@ejemplo.com</p>
```

---

## 🔧 Mantenimiento

### Crear Nuevos Usuarios Admin:

**Opción 1: Via Prisma Studio**

```bash
cd backend
npx prisma studio
```

1. Abre `User` table
2. Click "Add record"
3. Completa los campos:
   - `email`: email del admin
   - `name`: nombre del admin
   - `password`: hash bcrypt de la contraseña (usar online bcrypt generator)
   - `role`: `ADMIN`

**Opción 2: Via API (Crear endpoint en backend)**

```typescript
// backend/src/auth/auth.controller.ts
@Post('register-admin')
@UseGuards(JwtAuthGuard) // Solo admins existentes pueden crear nuevos admins
async registerAdmin(@Body() data: { email: string; password: string; name: string }) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return this.prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
}
```

### Backup de la Base de Datos:

**En Railway:**

1. **Settings** → **Database**
2. **Export Database** → Download SQL dump

**O via CLI:**

```bash
pg_dump $DATABASE_URL > backup.sql
```

### Restaurar Backup:

```bash
psql $DATABASE_URL < backup.sql
```

---

## 🐛 Troubleshooting

### Problema: "No se puede iniciar sesión"

**Solución:**
1. Verifica que el backend esté funcionando (Railway logs)
2. Verifica la variable `NEXT_PUBLIC_API_URL` en Vercel
3. Verifica que el usuario admin existe en la BD (Prisma Studio)
4. Verifica que la contraseña sea correcta

### Problema: "Token inválido" o "Sesión expirada"

**Solución:**
1. Borra las cookies del navegador
2. Vuelve a iniciar sesión
3. El token expira después de 24 horas (configurable en backend)

### Problema: "No se pueden crear/editar artículos"

**Solución:**
1. Verifica que estés autenticado
2. Verifica que el token se esté enviando en las peticiones (DevTools → Network → Headers)
3. Verifica los logs del backend en Railway

### Problema: "Las imágenes no cargan"

**Solución:**
1. Verifica que la URL de la imagen sea accesible
2. Verifica que la URL empiece con `http://` o `https://`
3. Algunas URLs pueden tener CORS restringido
4. Considera usar un CDN como Cloudinary o imgbb

### Problema: "El preview de Markdown no se ve bien"

**Solución:**
1. Añade estilos para prose en `frontend/app/globals.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   @layer base {
     .prose {
       @apply text-gray-800;
     }
     .prose h1 {
       @apply text-3xl font-bold mb-4;
     }
     .prose h2 {
       @apply text-2xl font-bold mb-3 mt-6;
     }
     .prose p {
       @apply mb-4 leading-relaxed;
     }
     /* ... más estilos */
   }
   ```

---

## 🚀 Próximas Mejoras Recomendadas

1. **Sistema de Roles más Complejo**
   - Admin (acceso total)
   - Editor (puede editar pero no publicar)
   - Autor (puede crear borradores)

2. **Historial de Cambios**
   - Ver quién editó qué y cuándo
   - Revertir cambios

3. **Multimedia Manager**
   - Subir imágenes directamente al dashboard
   - Galería de imágenes
   - Integración con Cloudinary

4. **Programación de Redes Sociales**
   - Auto-publicar en Twitter/Facebook/LinkedIn cuando se publica un artículo

5. **SEO Score**
   - Análisis de SEO on-page
   - Sugerencias de mejora
   - Lecturabilidad

6. **Comentarios**
   - Sistema de comentarios integrado
   - Moderación desde el dashboard

7. **Newsletter**
   - Enviar artículos nuevos por email
   - Gestión de suscriptores

8. **A/B Testing de Títulos**
   - Probar diferentes títulos
   - Ver cuál tiene más engagement

---

## 📞 Soporte

Si tienes problemas o necesitas ayuda:

1. **Revisa los logs:**
   - Frontend: Vercel → Deployments → View Logs
   - Backend: Railway → Service → Logs

2. **Revisa la base de datos:**
   ```bash
   cd backend
   npx prisma studio
   ```

3. **Documentación relacionada:**
   - `DEPLOYMENT.md` - Deployment en Vercel y Railway
   - `N8N_AGENTE_IA_BLOG.md` - Configuración del agente de IA
   - `backend/INSTRUCCIONES_BACKEND.md` - API endpoints

---

## ✅ Checklist de Deployment

- [ ] Backend desplegado en Railway y funcionando
- [ ] Database PostgreSQL configurada
- [ ] Frontend desplegado en Vercel
- [ ] Variables de entorno configuradas (`NEXT_PUBLIC_API_URL`)
- [ ] Usuario admin creado en la base de datos
- [ ] Puedes hacer login en `/admin/login`
- [ ] Puedes crear categorías
- [ ] Puedes crear tags
- [ ] Puedes crear artículos manualmente
- [ ] El agente de n8n está configurado (opcional)
- [ ] Webhook del backend funciona (si usas n8n)

---

**¡Dashboard listo para usar!** 🎉

Accede a `https://tu-dominio.vercel.app/admin` y comienza a gestionar tu blog.

