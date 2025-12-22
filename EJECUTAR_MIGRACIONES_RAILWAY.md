# 🗄️ Cómo Ejecutar Migraciones de Base de Datos en Railway

Si las tablas SEO no aparecen en Railway, sigue estos pasos para aplicar las migraciones.

## ⚠️ Problema

No ves las siguientes tablas en Railway → Database → Data:
- `SeoSite`
- `SeoKeyword`
- `SeoKeywordRankDaily`
- `SeoKeywordVolumeMonthly`
- `SeoIssue`
- `SeoRecommendation`

## ✅ Soluciones

### Método 1: Redeploy (Más Simple)

1. Ve a **Railway Dashboard** → Tu proyecto
2. Ve a la pestaña **"Deployments"**
3. Busca el último deployment
4. Click en los **3 puntos** (...) del deployment
5. Click en **"Redeploy"**
6. Espera a que termine el deploy
7. Verifica que el script `start.sh` ejecute `npx prisma migrate deploy`
8. Revisa los logs para confirmar que las migraciones se ejecutaron

### Método 2: Railway CLI (Recomendado)

1. **Instala Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login en Railway**:
   ```bash
   railway login
   ```
   Se abrirá el navegador para autenticarte.

3. **Conecta al proyecto**:
   ```bash
   cd "/Users/guti/Desktop/CURSOR WEBS/vela segala"
   railway link
   ```
   Selecciona tu proyecto de Railway.

4. **Ejecuta las migraciones**:
   ```bash
   cd backend
   railway run npx prisma migrate deploy
   ```

5. **Verifica**:
   - Ve a Railway → Database → Data
   - Deberías ver las 6 tablas SEO

### Método 3: Ejecutar SQL Manualmente

Si los métodos anteriores no funcionan:

1. **Obtén las credenciales de la base de datos**:
   - Ve a Railway → Database → **"Connect"**
   - Copia las credenciales de conexión

2. **Conecta con un cliente SQL**:
   - Usa **pgAdmin**, **DBeaver**, **TablePlus**, o cualquier cliente PostgreSQL
   - Conéctate usando las credenciales de Railway

3. **Ejecuta la migración**:
   - Abre el archivo: `backend/prisma/migrations/20251222122245_add_seo_module/migration.sql`
   - Copia TODO el contenido del archivo
   - Ejecútalo en tu cliente SQL

### Método 4: Desde el Terminal de Railway

1. Ve a Railway → Tu proyecto → **"Settings"**
2. Busca la sección **"Shell"** o **"Terminal"**
3. Si está disponible, abre un terminal
4. Ejecuta:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

## 🔍 Verificar que Funcionó

Después de ejecutar cualquiera de los métodos:

1. Ve a **Railway → Database → Data**
2. Deberías ver estas tablas nuevas:
   - ✅ `SeoSite`
   - ✅ `SeoKeyword`
   - ✅ `SeoKeywordRankDaily`
   - ✅ `SeoKeywordVolumeMonthly`
   - ✅ `SeoIssue`
   - ✅ `SeoRecommendation`

## 🐛 Troubleshooting

### Error: "Migration already applied"

Si ves este error, significa que las migraciones ya están aplicadas. Verifica en Railway → Database → Data si las tablas están ahí.

### Error: "Connection refused"

- Verifica que la base de datos esté activa en Railway
- Verifica que `DATABASE_URL` esté correctamente configurada

### Error: "Migration failed"

- Revisa los logs completos del error
- Verifica que no haya tablas duplicadas o conflictos
- Puedes intentar resetear la migración:
  ```bash
  npx prisma migrate resolve --rolled-back 20251222122245_add_seo_module
  npx prisma migrate deploy
  ```

### Las tablas siguen sin aparecer

1. Verifica que estés mirando la base de datos correcta en Railway
2. Refresca la página de Railway (a veces hay caché)
3. Ejecuta una consulta SQL directa para verificar:
   ```sql
   SELECT tablename FROM pg_tables WHERE schemaname = 'public';
   ```
   Esto debería listar todas las tablas, incluyendo las SEO.

## 📝 Nota Importante

El script `start.sh` debería ejecutar automáticamente `npx prisma migrate deploy` cada vez que se inicia la aplicación. Si las tablas no aparecen después de un redeploy, puede haber un problema con:
- El script `start.sh` no se está ejecutando
- Las credenciales de la base de datos no están configuradas
- Hay un error en las migraciones que impide su ejecución

Revisa los logs del backend en Railway para ver qué está pasando.

