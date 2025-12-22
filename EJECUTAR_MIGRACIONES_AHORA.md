# 🚀 Ejecutar Migraciones SEO AHORA en Railway

## Método 1: Redeploy (Más Simple)

1. Ve a **Railway Dashboard** → Tu proyecto backend
2. Ve a **"Deployments"**
3. Click en los **3 puntos** del último deployment
4. Click en **"Redeploy"**
5. **Espera** a que termine el deploy
6. **Revisa los logs** del deployment - deberías ver mensajes como:
   ```
   🔄 EJECUTANDO MIGRACIONES DE BASE DE DATOS...
   ✅ MIGRACIONES EJECUTADAS CORRECTAMENTE
   ```
7. Ve a **Database → Data** y verifica que aparezcan las tablas SEO

## Método 2: Railway CLI (Más Directo)

Si tienes Railway CLI instalado:

```bash
# 1. Instalar Railway CLI (si no lo tienes)
npm install -g @railway/cli

# 2. Login
railway login

# 3. Conectar al proyecto
cd backend
railway link

# 4. Ejecutar migraciones
railway run npx prisma migrate deploy
```

## Método 3: Ejecutar SQL Directamente

Si los métodos anteriores no funcionan, ejecuta el SQL directamente:

1. **Ve a Railway → Database → Connect**
2. Copia las credenciales de conexión
3. **Conecta con un cliente SQL** (pgAdmin, DBeaver, TablePlus, etc.)
4. **Ejecuta el contenido completo** del archivo:
   `backend/prisma/migrations/20251222122245_add_seo_module/migration.sql`

## Verificar que Funcionó

Después de ejecutar las migraciones, ve a:
- **Railway → Database → Data**
- Deberías ver estas 6 tablas nuevas:
  - ✅ `SeoSite`
  - ✅ `SeoKeyword`
  - ✅ `SeoKeywordRankDaily`
  - ✅ `SeoKeywordVolumeMonthly`
  - ✅ `SeoIssue`
  - ✅ `SeoRecommendation`

## Si Sigue Sin Funcionar

1. **Revisa los logs del backend** en Railway para ver errores
2. **Verifica que DATABASE_URL esté configurada** en Railway Variables
3. **Asegúrate de estar mirando la base de datos correcta** (puedes tener varias)
4. **Prueba ejecutar desde el terminal de Railway** (si está disponible):
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

