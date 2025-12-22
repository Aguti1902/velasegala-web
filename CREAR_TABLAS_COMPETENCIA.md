# 🔧 Crear Tablas de Análisis de Competencia Manualmente

Este documento explica cómo crear las tablas de análisis de competencia en PostgreSQL si no puedes usar las migraciones de Prisma.

## 📋 Tablas a Crear

Se necesitan crear 3 nuevas tablas:
- `SeoCompetitor`: Competidores a analizar
- `SeoCompetitorKeyword`: Keywords encontradas en cada competidor
- `SeoCompetitorRanking`: Histórico de posiciones de keywords de competidores

## 🚀 Opción 1: Ejecutar Script SQL Directamente

### Paso 1: Conectar a tu base de datos PostgreSQL

Si estás usando Railway:
```bash
railway connect postgres
```

Si tienes las credenciales directamente:
```bash
psql "postgresql://usuario:password@host:puerto/nombre_bd"
```

### Paso 2: Ejecutar el script SQL

Copia y pega el contenido del archivo `backend/crear-tablas-competencia.sql` en tu cliente de PostgreSQL.

O ejecuta directamente desde la terminal:
```bash
psql "postgresql://usuario:password@host:puerto/nombre_bd" < backend/crear-tablas-competencia.sql
```

## 🚀 Opción 2: Usar Prisma Studio (si tienes acceso)

1. Ejecuta `npx prisma studio` en el directorio `backend`
2. Ve a la pestaña "Database" y ejecuta el SQL manualmente

## 🚀 Opción 3: Usar Railway CLI (Recomendado)

### Paso 1: Conectar a la base de datos de Railway

```bash
railway connect postgres
```

### Paso 2: Copiar el contenido del script SQL

Abre el archivo `backend/crear-tablas-competencia.sql` y copia todo su contenido.

### Paso 3: Ejecutar en Railway

Pega el contenido completo en la terminal de Railway y presiona Enter.

## ✅ Verificar que las tablas se crearon

Ejecuta esta consulta SQL para verificar:

```sql
SELECT 
    tablename,
    schemaname
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('SeoCompetitor', 'SeoCompetitorKeyword', 'SeoCompetitorRanking')
ORDER BY tablename;
```

Deberías ver 3 filas:
- SeoCompetitor
- SeoCompetitorKeyword
- SeoCompetitorRanking

## 🔍 Verificar índices y foreign keys

### Ver índices creados:
```sql
SELECT 
    indexname,
    tablename
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('SeoCompetitor', 'SeoCompetitorKeyword', 'SeoCompetitorRanking')
ORDER BY tablename, indexname;
```

### Ver foreign keys creadas:
```sql
SELECT
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_name IN ('SeoCompetitor', 'SeoCompetitorKeyword', 'SeoCompetitorRanking');
```

## 📝 Estructura de las Tablas

### SeoCompetitor
- `id`: ID único (TEXT, PRIMARY KEY)
- `siteId`: ID del sitio SEO (TEXT, FOREIGN KEY -> SeoSite.id)
- `domain`: Dominio del competidor (TEXT, UNIQUE con siteId)
- `name`: Nombre del competidor (TEXT, opcional)
- `url`: URL completa del competidor (TEXT)
- `enabled`: Si está activo o no (BOOLEAN, default: true)
- `lastAnalyzed`: Última fecha de análisis (TIMESTAMP, opcional)
- `createdAt`: Fecha de creación (TIMESTAMP)
- `updatedAt`: Fecha de actualización (TIMESTAMP)

### SeoCompetitorKeyword
- `id`: ID único (TEXT, PRIMARY KEY)
- `competitorId`: ID del competidor (TEXT, FOREIGN KEY -> SeoCompetitor.id)
- `keyword`: Palabra clave (TEXT, UNIQUE con competitorId)
- `position`: Posición promedio (DOUBLE PRECISION, opcional)
- `monthlyVolume`: Volumen mensual de búsqueda (INTEGER, opcional)
- `intent`: Intención de búsqueda (TEXT, opcional)
- `targetUrl`: URL objetivo (TEXT, opcional)
- `firstSeen`: Primera vez vista (TIMESTAMP)
- `lastSeen`: Última vez vista (TIMESTAMP)

### SeoCompetitorRanking
- `id`: ID único (TEXT, PRIMARY KEY)
- `competitorId`: ID del competidor (TEXT, FOREIGN KEY -> SeoCompetitor.id)
- `keyword`: Palabra clave (TEXT)
- `date`: Fecha del ranking (DATE)
- `position`: Posición en esa fecha (DOUBLE PRECISION)
- `url`: URL que rankea (TEXT, opcional)
- `createdAt`: Fecha de creación (TIMESTAMP)

## ⚠️ Notas Importantes

1. **Asegúrate de que la tabla `SeoSite` ya existe** antes de ejecutar este script, ya que `SeoCompetitor` tiene una foreign key hacia ella.

2. **El script usa `IF NOT EXISTS`** para evitar errores si las tablas ya existen, pero los índices y foreign keys usan bloques `DO $$` para verificar si ya existen.

3. **Después de crear las tablas**, necesitarás ejecutar `npx prisma generate` en el directorio `backend` para que Prisma reconozca las nuevas tablas.

## 🔄 Siguiente Paso

Una vez creadas las tablas, ejecuta:

```bash
cd backend
npx prisma generate
```

Esto regenerará el cliente de Prisma con las nuevas tablas incluidas.

