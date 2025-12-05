# Configuración Railway - Paso a Paso

## 🚂 Paso 1: Crear Cuenta en Railway

1. Ve a: **https://railway.app**
2. Click en **"Login"**
3. **"Login with GitHub"**
4. Autoriza Railway a acceder a tu GitHub

## 🗄️ Paso 2: Crear Base de Datos PostgreSQL

1. **En Railway Dashboard:**
   - Click en **"New Project"**
   - Selecciona **"Provision PostgreSQL"**
   - Espera 30-60 segundos a que se cree

2. **Obtener la DATABASE_URL:**
   - Click en tu base de datos PostgreSQL
   - Tab **"Connect"**
   - Copia el **"Postgres Connection URL"**
   - Ejemplo: `postgresql://postgres:abc123@containers-us-west-99.railway.app:6543/railway`
   - **GUARDA ESTA URL**, la necesitarás en el siguiente paso

## 🚀 Paso 3: Deploy del Backend

1. **En Railway Dashboard:**
   - Click en **"New"** → **"GitHub Repo"**
   - Selecciona: **velasegala-web**
   - Click **"Deploy Now"**

2. **Configurar Root Path:**
   - Una vez creado el servicio
   - Click en tu servicio (se llamará "velasegala-web")
   - Tab **"Settings"**
   - Scroll a **"Service"** → **"Root Directory"**
   - Click **"Edit"**
   - Escribe: `backend`
   - Click **"Update"**

3. **Configurar Variables de Entorno:**
   - Tab **"Variables"**
   - Click **"New Variable"**
   - Añade las siguientes **una por una**:

   ```
   DATABASE_URL = postgresql://postgres:abc123@containers-us-west-99.railway.app:6543/railway
   ☝️ IMPORTANTE: Usa la URL que copiaste en el Paso 2

   JWT_SECRET = [genera una clave segura aquí]
   
   N8N_API_KEY = [genera otra clave segura aquí]
   
   PORT = 3001
   
   NODE_ENV = production
   
   FRONTEND_URL = https://velasegala-web.vercel.app
   ☝️ Usa tu URL real de Vercel
   ```

4. **Generar Claves Seguras:**
   
   Abre tu terminal local y ejecuta:
   ```bash
   # Para JWT_SECRET
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Para N8N_API_KEY
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   
   Copia cada resultado y úsalo en Railway.

5. **Configurar Build Command:**
   - Tab **"Settings"**
   - Scroll a **"Deploy"**
   - **Build Command:** Click "Edit"
   - Escribe: `npm install && npx prisma generate && npm run build`
   - **Start Command:** Click "Edit"
   - Escribe: `npx prisma migrate deploy && npm run start:prod`
   - Click **"Update"**

6. **Forzar Redeploy:**
   - Tab **"Deployments"**
   - Click en el deployment activo
   - Click en los **tres puntos (...)** arriba
   - **"Redeploy"**

7. **Espera el Deploy (3-5 minutos):**
   - Verás logs en tiempo real
   - Debe mostrar:
     ```
     ✓ Dependencies installed
     ✓ Prisma generated
     ✓ Build successful
     ✓ Migrations deployed
     ✓ Server started on port 3001
     ```

## 🌐 Paso 4: Obtener URL del Backend

1. **En tu servicio de Railway:**
   - Tab **"Settings"**
   - Scroll a **"Networking"**
   - Click en **"Generate Domain"**
   - Railway generará algo como: `velasegala-backend.up.railway.app`
   - **COPIA ESTA URL**

## 🔗 Paso 5: Conectar Backend con Frontend

1. **Ve a Vercel:**
   - Tu proyecto → **Settings**
   - **Environment Variables**
   - Busca `NEXT_PUBLIC_API_URL`
   
2. **Actualiza el valor:**
   - Si existe, edítalo
   - Si no existe, créalo
   - Value: `https://velasegala-backend.up.railway.app`
   - **⚠️ Usa tu URL real de Railway**

3. **Redeploy Frontend:**
   - Deployments → último deploy → "..." → **Redeploy**

## ✅ Paso 6: Verificar que Funciona

### Verificar Backend:

Abre en tu navegador:
```
https://tu-backend.railway.app/posts
```

Debería mostrar:
```json
{
  "data": [],
  "pagination": {
    "total": 0,
    "page": 1,
    "limit": 10,
    "totalPages": 0
  }
}
```

### Verificar Categorías:
```
https://tu-backend.railway.app/categories
```

### Verificar Tags:
```
https://tu-backend.railway.app/tags
```

## 🔐 Paso 7: Crear Usuario Admin

Usa un cliente REST como Postman, Insomnia o curl:

```bash
curl -X POST https://tu-backend.railway.app/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@velasegala.com",
    "password": "TuPasswordSeguro123!",
    "name": "Admin Vela-Segalà"
  }'
```

**Respuesta:**
```json
{
  "id": "...",
  "email": "admin@velasegala.com",
  "name": "Admin Vela-Segalà"
}
```

**GUARDA ESTAS CREDENCIALES** para el panel de administración.

## 🤖 Paso 8: Configurar n8n (Opcional)

### Webhook URL:
```
https://tu-backend.railway.app/webhooks/n8n/blog-post
```

### Headers:
```
x-api-key: [tu N8N_API_KEY de Railway]
Content-Type: application/json
```

### Payload de ejemplo:
```json
{
  "title": "Título del artículo",
  "slug": "titulo-articulo",
  "content": "Contenido completo...",
  "excerpt": "Resumen",
  "categories": ["Salud Bucodental"],
  "tags": ["Prevención", "Cuidados"],
  "metaTitle": "SEO Title",
  "metaDescription": "SEO Description",
  "publishStatus": "PUBLISHED"
}
```

## 📊 Resumen de URLs

Anota tus URLs aquí:

```
Frontend (Vercel): https://_____________________.vercel.app
Backend (Railway): https://_____________________.up.railway.app
Database: postgresql://postgres:...@containers-us-west-...railway.app:6543/railway

JWT_SECRET: ________________________________________
N8N_API_KEY: ________________________________________
Admin Email: ________________________________________
Admin Password: ________________________________________
```

## 🐛 Troubleshooting

### Error: "Can't reach database"
- Verifica que `DATABASE_URL` en Railway sea correcta
- Asegúrate de que copiaste la URL completa de PostgreSQL

### Error: "Migrations failed"
- Ve a Railway → tu servicio → "Deploy Logs"
- Busca errores de Prisma
- Puede que necesites ejecutar: `npx prisma migrate reset --force`

### Backend no responde
- Verifica que el Start Command sea: `npx prisma migrate deploy && npm run start:prod`
- Revisa los logs en Railway → "Deploy Logs"

### CORS Error desde el frontend
- Verifica que `FRONTEND_URL` en Railway tenga tu URL de Vercel
- Debe incluir `https://` al inicio

## 💰 Costo de Railway

- **PostgreSQL:** ~$5/mes (500 horas)
- **Backend Service:** ~$5/mes (500 horas)
- **Total:** ~$10/mes

Primera vez incluye **$5 de crédito gratis**.

## 🎉 ¡Listo!

Una vez completados estos pasos, tu web estará 100% funcional:
- ✅ Frontend en Vercel
- ✅ Backend en Railway
- ✅ Base de datos PostgreSQL
- ✅ Blog funcionando
- ✅ Listo para conectar n8n

---

**¿Tienes cuenta en Railway ya creada?** Empieza con el Paso 2 (crear PostgreSQL).

