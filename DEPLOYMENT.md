# Guía de Deployment - Clínica Dental Vela-Segalà

Esta guía te ayudará a desplegar el proyecto completo en producción.

## 📋 Checklist Pre-Deployment

- [ ] Código subido a GitHub
- [ ] Variables de entorno configuradas
- [ ] Base de datos PostgreSQL en la nube
- [ ] Cuenta de Vercel creada
- [ ] Cuenta de Railway creada (o alternativa para DB)

## 🗄️ Paso 1: Base de Datos PostgreSQL

### Opción A: Railway (Recomendado)

1. **Crear cuenta en Railway:**
   - Ve a [railway.app](https://railway.app)
   - Sign up con GitHub

2. **Crear proyecto PostgreSQL:**
   - Click en "New Project"
   - Selecciona "Provision PostgreSQL"
   - Espera a que se cree (1-2 minutos)

3. **Obtener DATABASE_URL:**
   - Click en tu base de datos
   - Tab "Connect"
   - Copia el "Postgres Connection URL"
   - Ejemplo: `postgresql://postgres:password@containers-us-west-123.railway.app:7654/railway`

4. **Costo:**
   - $5/mes por 500 horas de ejecución
   - Primera prueba incluye $5 de crédito

### Opción B: Neon (Gratis)

1. Ve a [neon.tech](https://neon.tech)
2. Sign up con GitHub
3. Create New Project
4. Copia la Connection String
5. Plan gratuito: hasta 0.5GB

### Opción C: Supabase (Gratis)

1. Ve a [supabase.com](https://supabase.com)
2. New Project
3. Database → Settings → Connection String
4. Copia la URI
5. Plan gratuito: hasta 500MB

## 🚀 Paso 2: Deploy Backend (Railway)

1. **Conectar repositorio:**
   - En Railway, click "New Service"
   - "Deploy from GitHub repo"
   - Selecciona tu repositorio
   - Root Directory: `backend`

2. **Configurar variables de entorno:**
   - Tab "Variables"
   - Añade las siguientes:

   ```bash
   DATABASE_URL=postgresql://... (de tu PostgreSQL Railway/Neon/Supabase)
   JWT_SECRET=genera-una-clave-super-segura-aqui-con-al-menos-32-caracteres
   N8N_API_KEY=genera-otra-clave-super-segura-para-n8n-webhook
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=https://tu-dominio.vercel.app (lo añadirás después)
   ```

3. **Configurar Build & Start:**
   - Settings → Build Command: `npm install && npx prisma generate && npm run build`
   - Settings → Start Command: `npx prisma migrate deploy && npm run start:prod`

4. **Hacer el deploy:**
   - Railway detectará los cambios y desplegará automáticamente
   - Espera 2-3 minutos

5. **Obtener la URL del backend:**
   - Tab "Settings"
   - Scroll hasta "Domains"
   - Genera un dominio público
   - Ejemplo: `velasegala-backend.up.railway.app`
   - **Guarda esta URL**, la necesitarás para el frontend

6. **Ejecutar migraciones (solo la primera vez):**
   - Una vez desplegado, las migraciones se ejecutan automáticamente
   - Si hay problemas, ve a "Deploy Logs" para ver errores

## 🌐 Paso 3: Deploy Frontend (Vercel)

1. **Conectar repositorio:**
   - Ve a [vercel.com](https://vercel.com)
   - "Add New Project"
   - Import tu repositorio de GitHub
   - Framework Preset: Next.js
   - Root Directory: `frontend`

2. **Configurar variables de entorno:**
   - Antes de deploy, click en "Environment Variables"
   - Añade:

   ```bash
   NEXT_PUBLIC_API_URL=https://tu-backend.railway.app
   ```

   **⚠️ Usa la URL que obtuviste en el Paso 2**

3. **Deploy:**
   - Click "Deploy"
   - Espera 2-3 minutos
   - Vercel te dará una URL: `velasegala.vercel.app`

4. **Actualizar CORS en backend:**
   - Vuelve a Railway
   - Actualiza la variable `FRONTEND_URL` con tu dominio de Vercel
   - Ejemplo: `FRONTEND_URL=https://velasegala.vercel.app`
   - Railway redesplegará automáticamente

5. **Configurar dominio custom (opcional):**
   - Settings → Domains
   - Add Domain: `clinicavelasegala.com`
   - Configura los DNS según las instrucciones de Vercel

## 🔐 Paso 4: Seguridad

### Generar Claves Seguras

```bash
# JWT_SECRET (32+ caracteres)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# N8N_API_KEY (32+ caracteres)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Checklist de Seguridad
- [ ] JWT_SECRET es único y largo (32+ caracteres)
- [ ] N8N_API_KEY es único y largo
- [ ] Las variables NO están en el código fuente
- [ ] CORS configurado correctamente
- [ ] HTTPS habilitado (automático en Vercel/Railway)

## 🤖 Paso 5: Configurar n8n

### Crear cuenta n8n Cloud

1. Ve a [n8n.cloud](https://n8n.cloud) o instala n8n self-hosted
2. Create New Workflow

### Configurar Webhook

1. **HTTP Request Node - Google Search:**
   ```
   Method: GET
   URL: https://www.google.com/search?q={query}
   ```

2. **AI Agent Node:**
   - Configura tu LLM (OpenAI, Claude, etc.)
   - Prompt: "Genera un artículo SEO-optimizado sobre {tema} para una clínica dental en Viladecans..."

3. **Function Node - Formatear Datos:**
   ```javascript
   const aiOutput = $json.output;
   
   return {
     title: aiOutput.title,
     slug: aiOutput.title.toLowerCase().replace(/\s+/g, '-'),
     content: aiOutput.content,
     excerpt: aiOutput.excerpt,
     categories: aiOutput.categories || [],
     tags: aiOutput.tags || [],
     metaTitle: aiOutput.metaTitle,
     metaDescription: aiOutput.metaDescription,
     publishStatus: 'DRAFT', // o 'PUBLISHED'
     publishAt: new Date().toISOString()
   };
   ```

4. **HTTP Request Node - POST to Backend:**
   ```
   Method: POST
   URL: https://tu-backend.railway.app/webhooks/n8n/blog-post
   Headers:
     x-api-key: tu-clave-n8n-api-key (la de Railway)
     Content-Type: application/json
   Body: {{$json}}
   ```

## ✅ Verificación Post-Deployment

### Frontend (Vercel)
- [ ] La web carga correctamente
- [ ] Las imágenes se ven
- [ ] El menú funciona
- [ ] Las páginas de tratamientos cargan
- [ ] El blog se ve correctamente
- [ ] El formulario de contacto funciona
- [ ] El chatbot responde

### Backend (Railway)
- [ ] `GET https://tu-backend.railway.app/posts` devuelve JSON
- [ ] `GET https://tu-backend.railway.app/categories` devuelve categorías
- [ ] `GET https://tu-backend.railway.app/tags` devuelve tags

### Base de Datos
- [ ] Las tablas existen (verifica en Railway Dashboard)
- [ ] Hay datos seed (opcional)

### n8n
- [ ] El workflow está activo
- [ ] El webhook responde correctamente
- [ ] Los posts se crean en la base de datos

## 🐛 Troubleshooting

### Error 500 en Backend
**Causa:** Problema con la base de datos o migraciones

**Solución:**
1. Ve a Railway → tu servicio backend → "Deploy Logs"
2. Busca errores en rojo
3. Ejecuta: `npx prisma migrate deploy` en Railway CLI
4. Verifica que `DATABASE_URL` sea correcta

### Frontend no conecta con Backend
**Causa:** CORS o URL incorrecta

**Solución:**
1. Verifica que `NEXT_PUBLIC_API_URL` en Vercel tenga la URL correcta de Railway
2. Verifica que `FRONTEND_URL` en Railway tenga la URL de Vercel
3. Redeploy ambos servicios

### Imágenes no se cargan
**Causa:** Rutas incorrectas

**Solución:**
1. Las imágenes deben estar en `frontend/public/images/`
2. En el código usa: `/images/nombre.jpg` (sin `public/`)
3. Redeploy frontend

### n8n no puede crear posts
**Causa:** API Key incorrecta

**Solución:**
1. Verifica que `x-api-key` en n8n sea igual a `N8N_API_KEY` en Railway
2. Verifica que la URL del webhook sea correcta
3. Chequea logs en Railway

## 📊 Monitoreo

### Vercel
- Dashboard → tu proyecto → "Analytics"
- Ver: Visitas, Core Web Vitals, errores

### Railway
- Dashboard → tu servicio → "Metrics"
- Ver: CPU, RAM, peticiones

### Base de Datos Railway
- Dashboard → PostgreSQL → "Metrics"
- Ver: Uso de storage, conexiones

## 💰 Costos Estimados (mensual)

- **Vercel:** $0 (plan Hobby) o $20/mes (Pro)
- **Railway Backend:** ~$5/mes
- **Railway PostgreSQL:** ~$5/mes
- **n8n Cloud:** $20/mes (o self-hosted gratis)
- **Dominio:** ~$12/año

**Total:** ~$10-15/mes (sin dominio ni n8n)

## 🔄 Updates y Mantenimiento

### Deploy de Cambios
```bash
git add .
git commit -m "Descripción del cambio"
git push origin main
```

- **Vercel:** Redeploy automático en ~2 minutos
- **Railway:** Redeploy automático en ~3 minutos

### Backups de Base de Datos
Railway hace backups automáticos, pero también puedes:

```bash
# Backup manual
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

## 📞 Soporte

Si tienes problemas durante el deployment:

1. **Logs de Vercel:** Dashboard → Deployments → Select deployment → "Logs"
2. **Logs de Railway:** Dashboard → Service → "Deploy Logs"
3. **Documentación:**
   - [Vercel Docs](https://vercel.com/docs)
   - [Railway Docs](https://docs.railway.app)
   - [Prisma Docs](https://www.prisma.io/docs)

---

**¡Listo! Tu web está en producción 🎉**

