# Backend - Clínica Dental Viladecans

Backend API desarrollado con NestJS, PostgreSQL y Prisma ORM para la web de la clínica dental.

## 🚀 Configuración Inicial

### 1. Instalar Dependencias

```bash
cd backend
npm install
```

### 2. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env` y configura las variables:

```bash
cp .env.example .env
```

Edita el archivo `.env`:
- `DATABASE_URL`: URL de conexión a PostgreSQL
- `JWT_SECRET`: Clave secreta para JWT (cámbiala en producción)
- `N8N_API_KEY`: Clave API para el webhook de n8n
- `PORT`: Puerto del servidor (por defecto 3001)

### 3. Configurar Base de Datos

Crea la base de datos en PostgreSQL:

```bash
createdb clinica_dental_viladecans
```

Ejecuta las migraciones de Prisma:

```bash
npx prisma migrate dev --name init
```

### 4. Ejecutar Seed (Opcional)

Carga datos de ejemplo:

```bash
npx prisma db seed
```

### 5. Iniciar el Servidor

Modo desarrollo:

```bash
npm run start:dev
```

Modo producción:

```bash
npm run build
npm run start:prod
```

El servidor estará disponible en `http://localhost:3001`

## 📡 Endpoints API

### 🔐 Autenticación

#### Registro de Usuario Admin
```http
POST /auth/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123",
  "name": "Admin"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "email": "admin@example.com",
    "name": "Admin"
  }
}
```

### 📝 Posts (Blog)

#### Listar Posts
```http
GET /posts?page=1&limit=10&status=PUBLISHED&category=implantes&tag=cuidados&search=implantes
```

Parámetros de query opcionales:
- `page`: Número de página (default: 1)
- `limit`: Posts por página (default: 10)
- `status`: DRAFT | PUBLISHED | SCHEDULED (default: PUBLISHED)
- `category`: Filtrar por slug de categoría
- `tag`: Filtrar por slug de tag
- `search`: Buscar en título/contenido

**Respuesta:**
```json
{
  "data": [
    {
      "id": "...",
      "title": "Implantes Dentales en Viladecans",
      "slug": "implantes-dentales-viladecans",
      "excerpt": "Guía completa...",
      "content": "...",
      "featuredImage": "...",
      "categories": [...],
      "tags": [...],
      "publishAt": "2024-01-15T00:00:00.000Z",
      "createdAt": "...",
      "author": {...}
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

#### Obtener Post por ID
```http
GET /posts/:id
```

#### Obtener Post por Slug
```http
GET /posts/slug/:slug
```

#### Crear Post (requiere autenticación)
```http
POST /posts
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Título del post",
  "slug": "titulo-del-post",
  "content": "Contenido completo...",
  "excerpt": "Resumen corto",
  "featuredImage": "https://...",
  "metaTitle": "SEO Title",
  "metaDescription": "SEO Description",
  "publishStatus": "PUBLISHED",
  "publishAt": "2024-01-15T00:00:00.000Z",
  "categories": ["Implantes", "Tratamientos"],
  "tags": ["Implantes Dentales", "Cuidados", "Viladecans"]
}
```

#### Actualizar Post (requiere autenticación)
```http
PATCH /posts/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Nuevo título",
  ...
}
```

#### Eliminar Post (requiere autenticación)
```http
DELETE /posts/:id
Authorization: Bearer {token}
```

### 📂 Categorías

#### Listar Categorías
```http
GET /categories
```

**Respuesta:**
```json
[
  {
    "id": "...",
    "name": "Implantes",
    "slug": "implantes",
    "description": "...",
    "_count": {
      "posts": 10
    }
  }
]
```

#### Obtener Categoría
```http
GET /categories/:id
GET /categories/slug/:slug
```

#### Crear Categoría (requiere autenticación)
```http
POST /categories
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Nueva Categoría",
  "slug": "nueva-categoria",
  "description": "Descripción opcional"
}
```

#### Actualizar Categoría (requiere autenticación)
```http
PATCH /categories/:id
Authorization: Bearer {token}
```

#### Eliminar Categoría (requiere autenticación)
```http
DELETE /categories/:id
Authorization: Bearer {token}
```

### 🏷️ Tags (Etiquetas)

Misma estructura que Categorías:
- `GET /tags`
- `GET /tags/:id`
- `GET /tags/slug/:slug`
- `POST /tags` (requiere auth)
- `PATCH /tags/:id` (requiere auth)
- `DELETE /tags/:id` (requiere auth)

### 🤖 Webhook n8n

#### Crear Post desde n8n
```http
POST /webhooks/n8n/blog-post
x-api-key: your-secret-n8n-api-key-change-this
Content-Type: application/json

{
  "title": "Título del artículo generado por IA",
  "slug": "titulo-articulo-generado",
  "content": "Contenido completo en Markdown o HTML...",
  "excerpt": "Resumen del artículo",
  "featuredImageUrl": "https://example.com/image.jpg",
  "categories": ["Salud Bucodental", "Consejos"],
  "tags": ["Prevención", "Cuidados", "Viladecans"],
  "metaTitle": "SEO optimized title",
  "metaDescription": "SEO optimized description",
  "publishStatus": "PUBLISHED",
  "publishAt": "2024-01-20T10:00:00.000Z"
}
```

**Respuesta (201 Created):**
```json
{
  "id": "...",
  "title": "Título del artículo generado por IA",
  "slug": "titulo-articulo-generado",
  ...
}
```

**Estados de Publicación:**
- `DRAFT`: Borrador (no visible en frontend)
- `PUBLISHED`: Publicado (visible si publishAt <= now)
- `SCHEDULED`: Programado (se publicará automáticamente en publishAt)

## 🔒 Seguridad

### Autenticación JWT

Para endpoints protegidos, incluye el token JWT en el header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### API Key para n8n

El webhook de n8n usa autenticación por API key:

```
x-api-key: your-secret-n8n-api-key-change-this
```

**⚠️ IMPORTANTE:** Cambia la `N8N_API_KEY` en producción.

## 📊 Modelo de Datos

### Post
- `id`, `title`, `slug`, `content`, `excerpt`
- `featuredImage`, `metaTitle`, `metaDescription`
- `publishStatus` (DRAFT | PUBLISHED | SCHEDULED)
- `publishAt` (fecha de publicación)
- `authorId` (relación con User)
- `categories[]` (relación many-to-many)
- `tags[]` (relación many-to-many)

### Category
- `id`, `name`, `slug`, `description`
- Conteo automático de posts

### Tag
- `id`, `name`, `slug`
- Conteo automático de posts

## 🛠️ Comandos Útiles

### Prisma

```bash
# Generar cliente de Prisma
npx prisma generate

# Crear migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Abrir Prisma Studio (GUI para la DB)
npx prisma studio

# Resetear base de datos (⚠️ borra todos los datos)
npx prisma migrate reset
```

### NestJS

```bash
# Desarrollo con hot reload
npm run start:dev

# Producción
npm run build
npm run start:prod

# Tests
npm run test
npm run test:e2e
npm run test:cov
```

## 🔄 Integración con n8n

### Configuración del Workflow en n8n

1. **HTTP Request Node** - Buscar información en Google
2. **AI Agent Node** - Generar contenido SEO-optimizado
3. **Function Node** - Formatear datos según el schema
4. **HTTP Request Node** - POST a `/webhooks/n8n/blog-post`

### Headers requeridos:
```
x-api-key: your-secret-n8n-api-key-change-this
Content-Type: application/json
```

### Payload esperado:
```json
{
  "title": "string (requerido)",
  "slug": "string (requerido, único)",
  "content": "string (requerido)",
  "excerpt": "string (opcional)",
  "featuredImageUrl": "string (opcional, URL válida)",
  "categories": ["array de strings (opcional)"],
  "tags": ["array de strings (opcional)"],
  "metaTitle": "string (opcional)",
  "metaDescription": "string (opcional)",
  "publishStatus": "DRAFT | PUBLISHED | SCHEDULED (opcional, default: DRAFT)",
  "publishAt": "ISO 8601 date string (opcional)"
}
```

### Comportamiento:
- Si categorías/tags no existen, se crean automáticamente
- El slug debe ser único (error 400 si existe)
- Si `publishStatus` es `PUBLISHED` y `publishAt` es pasado/presente, se publica inmediatamente
- Si `publishStatus` es `SCHEDULED`, se programa para `publishAt`

## 📝 Notas de Desarrollo

- Todos los slugs se generan automáticamente en minúsculas y con guiones
- Las relaciones many-to-many se gestionan automáticamente
- Los contadores de posts en categorías/tags se actualizan con Prisma
- El endpoint público de posts solo muestra PUBLISHED con fecha <= now
- Los endpoints de admin requieren JWT authentication

## 🐛 Troubleshooting

### Error: "Post with slug already exists"
El slug debe ser único. Genera un nuevo slug o actualiza el post existente.

### Error: "API key is missing/invalid"
Verifica que el header `x-api-key` sea correcto y coincida con `N8N_API_KEY` en `.env`.

### Error de conexión a la base de datos
Verifica que PostgreSQL esté corriendo y que la `DATABASE_URL` sea correcta.

## 📚 Recursos

- [NestJS Docs](https://docs.nestjs.com/)
- [Prisma Docs](https://www.prisma.io/docs)
- [n8n Docs](https://docs.n8n.io/)

