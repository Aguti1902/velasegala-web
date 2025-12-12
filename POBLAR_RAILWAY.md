# 🌱 Cómo Poblar la Base de Datos de Railway

## Problema
Tu base de datos de Railway está **VACÍA**, pero tu base de datos local tiene datos.

Cuando ejecutas el admin localmente (`http://localhost:3000`), se conecta a tu base de datos **LOCAL**.

Cuando accedes al admin en Vercel (`https://velasegala-web-emc8.vercel.app`), se conecta a la base de datos **RAILWAY** (que está vacía).

---

## ✅ Solución

He creado un endpoint especial en el backend para poblar la base de datos de Railway desde el admin.

### Opción 1: Ejecutar desde Terminal (Recomendado)

```bash
# Ejecutar el seed en Railway
curl -X POST https://velasegala-web-production.up.railway.app/api/admin/seed-database \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

**Nota:** Necesitas tu token de autenticación. Para obtenerlo:
1. Ve al admin en Vercel: https://velasegala-web-emc8.vercel.app/admin/login
2. Inicia sesión con `admin@velasegala.com` / `Admin123!`
3. Abre las DevTools (F12)
4. Ve a la pestaña "Application" > "Cookies"
5. Copia el valor de `admin_token`

### Opción 2: Reiniciar el Servicio en Railway

El script `start.sh` ya incluye `npx prisma db seed`, así que simplemente reinicia el servicio:

1. Ve a [Railway Dashboard](https://railway.app)
2. Selecciona tu proyecto **velasegala-web**
3. Ve al servicio del **Backend**
4. Click en **"Deploy"** > **"Redeploy"**
5. Espera 2-3 minutos
6. El seed se ejecutará automáticamente

---

## 📊 Datos que se Crearán

El seed creará:
- ✅ Usuario admin: `admin@velasegala.com` / `Admin123!`
- ✅ 4 Tratamientos (Implantes, Ortodoncia, Blanqueamiento, Periodoncia)
- ✅ 4 Categorías (Salud Bucodental, Tratamientos, Cuidados, Prevención)
- ✅ 4 Tags (Consejos, Implantes, Ortodoncia, Viladecans)
- ✅ 3 Posts de ejemplo

---

## 🔍 Verificar que Funcionó

### Paso 1: Verifica Railway
1. Ve a Railway > Database > Data
2. Selecciona la tabla `Post`
3. Deberías ver **3 artículos**

### Paso 2: Verifica el Admin
1. Ve a: https://velasegala-web-emc8.vercel.app/admin/posts
2. Deberías ver **3 artículos**

### Paso 3: Verifica la Web
1. Ve a: https://velasegala-web-emc8.vercel.app/blog
2. Deberías ver **3 artículos**

---

## ⚠️ Importante

Si ya hay posts en Railway, el endpoint NO creará datos duplicados. Solo actualizará:
- El usuario admin
- Las fechas de publicación de posts futuros

---

## 🆘 Si Algo Sale Mal

Si el seed falla o quieres empezar de cero:

1. **Eliminar todos los datos** (solo si es necesario):
```sql
-- En Railway > Database > Query
DELETE FROM "Post";
DELETE FROM "Category";
DELETE FROM "Tag";
DELETE FROM "Treatment";
DELETE FROM "User";
```

2. **Ejecutar el seed de nuevo** (Opción 1 o 2 de arriba)

---

## 📝 Notas

- El seed es **idempotente**: puedes ejecutarlo múltiples veces sin problemas
- Si ya hay datos, no creará duplicados
- El usuario admin siempre se actualiza con las credenciales correctas

