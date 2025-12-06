# 🔧 Solución: Proyectos Duplicados en Vercel

## 🚨 Problema Actual

Tienes **3 proyectos en Vercel** del mismo repositorio, lo que causa:
- ❌ Confusión con las URLs
- ❌ Problemas de CORS 
- ❌ El admin no se sincroniza con la web
- ❌ No puedes subir blogs

### Proyectos detectados:
1. `velasegala-web` → https://velasegala-web.vercel.app
2. `velasegala-web-3wsi` → https://velasegala-web-3wsi.vercel.app
3. `velasegala-web-emc8` → https://velasegala-web-emc8.vercel.app ✅ **(USAR ESTE)**

---

## ✅ Solución Completa

### Paso 1: Eliminar Proyectos Duplicados en Vercel

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Busca el proyecto `velasegala-web` (el primero)
3. Click en el proyecto
4. Settings (menú superior derecho)
5. Scroll hasta el final → **"Delete Project"**
6. Escribe el nombre del proyecto para confirmar
7. Click "Delete"

**Repite con `velasegala-web-3wsi`**

**✅ Mantén solo: `velasegala-web-emc8`**

---

### Paso 2: Configurar Variables de Entorno en Vercel

En el proyecto `velasegala-web-emc8`:

1. Settings → Environment Variables
2. Verifica que tengas esta variable:

```env
NEXT_PUBLIC_API_URL=https://velasegala-web-production.up.railway.app/api
```

**⚠️ Importante:** 
- Sin espacios antes o después del `=`
- Sin comillas
- Con `https://` al inicio
- Termina en `/api`

3. Si no existe, añádela:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://velasegala-web-production.up.railway.app/api`
   - Environment: Production, Preview, Development (todas marcadas)

4. Click "Save"

---

### Paso 3: Configurar Variables de Entorno en Railway

1. Ve a [railway.app](https://railway.app)
2. Selecciona tu proyecto backend
3. Ve a "Variables"
4. Verifica que tengas estas variables:

```env
DATABASE_URL=postgresql://postgres:KcnLwslfhrXNxqNOioxwhPAEdJBgJORC@centerbeam.proxy.rlwy.net:23490/railway

JWT_SECRET=(tu clave JWT)

N8N_API_KEY=(tu clave para n8n)

CORS_ORIGIN=https://velasegala-web-emc8.vercel.app

NODE_ENV=production
```

5. Si falta `CORS_ORIGIN`, añádela:
   - **Name**: `CORS_ORIGIN`
   - **Value**: `https://velasegala-web-emc8.vercel.app`
   - Click "Add"

6. Railway se redeployará automáticamente (espera 2-3 minutos)

---

### Paso 4: Verificar que Funciona

#### 4.1. Verificar el Frontend

1. Abre: https://velasegala-web-emc8.vercel.app
2. Debería cargar la página principal
3. Ve a: https://velasegala-web-emc8.vercel.app/blog
4. Deberían aparecer los artículos del blog

#### 4.2. Verificar el Admin

1. Abre: https://velasegala-web-emc8.vercel.app/admin/login
2. Ingresa las credenciales:
   - Email: `admin@velasegala.com`
   - Password: `Admin123!`
3. Deberías entrar al dashboard

#### 4.3. Probar Crear un Artículo

1. En el admin, ve a "Posts" → "Crear Nuevo"
2. Rellena:
   - Título: "Prueba de Artículo"
   - Contenido: "Este es un test"
   - Categoría: Selecciona una
   - Estado: "Publicado"
3. Click "Guardar y Publicar"
4. Ve al blog público: https://velasegala-web-emc8.vercel.app/blog
5. El artículo debe aparecer

---

## 🔍 Solución de Problemas

### Problema: "CORS policy error" en el navegador

**Solución:**
1. Verifica que Railway tenga `CORS_ORIGIN=https://velasegala-web-emc8.vercel.app`
2. Espera 2-3 minutos después de cambiar variables
3. Limpia caché del navegador (Ctrl+Shift+R o Cmd+Shift+R)

### Problema: "API URL is undefined"

**Solución:**
1. Verifica que Vercel tenga `NEXT_PUBLIC_API_URL` configurada
2. Redeploya el frontend:
   - Ve a Vercel → Deployments
   - Click en los 3 puntos del último deploy
   - "Redeploy"

### Problema: No aparecen artículos en el blog

**Solución:**
1. Verifica que los posts estén publicados:
   - Admin → Posts
   - Estado debe ser "Publicado"
   - Fecha de publicación debe ser pasada o actual

2. Si no hay posts, crea uno manualmente en el admin

### Problema: No puedo hacer login en el admin

**Solución:**
1. Verifica las credenciales:
   ```
   Email: admin@velasegala.com
   Password: Admin123!
   ```

2. Si no funciona, reinicia el password desde Railway:
   - Railway → Shell (terminal)
   - Ejecuta: `npm run seed`
   - Espera 30 segundos
   - Intenta login de nuevo

---

## 📊 Configuración Final Correcta

### Vercel (Frontend)
- **Proyecto**: `velasegala-web-emc8`
- **URL**: https://velasegala-web-emc8.vercel.app
- **Repositorio**: Aguti1902/velasegala-web
- **Branch**: main
- **Root Directory**: `frontend`
- **Variables**:
  - `NEXT_PUBLIC_API_URL=https://velasegala-web-production.up.railway.app/api`

### Railway (Backend + Database)
- **Proyecto**: velasegala-web
- **URL**: https://velasegala-web-production.up.railway.app
- **Repositorio**: Aguti1902/velasegala-web
- **Branch**: main
- **Root Directory**: `backend`
- **Variables**:
  - `DATABASE_URL` → (de PostgreSQL)
  - `JWT_SECRET` → (tu clave)
  - `N8N_API_KEY` → (tu clave)
  - `CORS_ORIGIN=https://velasegala-web-emc8.vercel.app`
  - `NODE_ENV=production`

---

## 🎯 ¿Por qué pasó esto?

Cuando subes un proyecto a Vercel desde Git, cada vez que usas "Import Project" crea un **nuevo proyecto**. Por eso tienes 3:
1. Primera vez que lo subiste
2. Segunda vez (posiblemente por un error)
3. Tercera vez (intentando arreglarlo)

**Solución**: Mantén solo uno y elimina los duplicados.

---

## ✨ Después de Seguir Esta Guía

Deberías poder:
- ✅ Acceder al admin en: https://velasegala-web-emc8.vercel.app/admin
- ✅ Crear artículos desde el dashboard
- ✅ Ver los artículos en: https://velasegala-web-emc8.vercel.app/blog
- ✅ Editar/eliminar artículos existentes
- ✅ Gestionar categorías y tags
- ✅ Ver contactos y estadísticas
- ✅ Conectar el agente de IA n8n (ver `GUIA_AGENTE_IA.md`)

---

## 📞 URLs Importantes

- **Frontend**: https://velasegala-web-emc8.vercel.app
- **Admin**: https://velasegala-web-emc8.vercel.app/admin
- **Blog**: https://velasegala-web-emc8.vercel.app/blog
- **Backend API**: https://velasegala-web-production.up.railway.app/api
- **Backend Health**: https://velasegala-web-production.up.railway.app/api/health

---

¡Listo! Ahora todo debería funcionar correctamente. 🎉

