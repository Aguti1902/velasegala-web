# 🚨 CREAR TABLAS SEO MANUALMENTE (URGENTE)

El problema es que Prisma marca la migración como aplicada pero las tablas no existen realmente.

## Solución Rápida: Ejecutar SQL Directamente

### Paso 1: Obtener Credenciales de PostgreSQL

1. Ve a **Railway → Database → Connect**
2. Copia las credenciales de conexión PostgreSQL

### Paso 2: Conectar a PostgreSQL

Puedes usar cualquiera de estos métodos:

#### Opción A: psql (Terminal)

```bash
psql "postgresql://usuario:password@host:puerto/railway"
```

#### Opción B: pgAdmin o DBeaver

- Descarga [pgAdmin](https://www.pgadmin.org/) o [DBeaver](https://dbeaver.io/)
- Conéctate usando las credenciales de Railway

#### Opción C: Railway Terminal (si está disponible)

1. Ve a Railway → Database → Settings
2. Busca "Open Terminal" o "Connect"
3. Ejecuta el SQL directamente

### Paso 3: Ejecutar el SQL

Copia y pega TODO el contenido del archivo `backend/ejecutar-migraciones-seo.sql` y ejecútalo.

O ejecuta este SQL directamente:

```sql
-- Crear tablas SEO
CREATE TABLE IF NOT EXISTS "SeoSite" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "gscProperty" TEXT,
    "countryDefault" TEXT NOT NULL DEFAULT 'ES',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SeoSite_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SeoKeyword" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "intent" TEXT,
    "targetUrl" TEXT,
    "tags" TEXT[],
    "discovered" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SeoKeyword_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SeoKeywordRankDaily" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "keywordId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'ES',
    "device" TEXT NOT NULL DEFAULT 'all',
    "position" DOUBLE PRECISION,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "ctr" DOUBLE PRECISION,
    "pageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SeoKeywordRankDaily_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SeoKeywordVolumeMonthly" (
    "id" TEXT NOT NULL,
    "keywordId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'ES',
    "volume" INTEGER,
    "competition" TEXT,
    "cpc" DOUBLE PRECISION,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SeoKeywordVolumeMonthly_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SeoIssue" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "severity" TEXT NOT NULL DEFAULT 'medium',
    "url" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "evidenceJson" JSONB,
    "firstSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'open',
    CONSTRAINT "SeoIssue_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SeoRecommendation" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "issueId" TEXT,
    "title" TEXT NOT NULL,
    "rationale" TEXT NOT NULL,
    "steps" JSONB NOT NULL,
    "impactScore" INTEGER NOT NULL DEFAULT 50,
    "effortScore" INTEGER NOT NULL DEFAULT 50,
    "priority" INTEGER NOT NULL DEFAULT 50,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SeoRecommendation_pkey" PRIMARY KEY ("id")
);

-- Crear índices únicos
CREATE UNIQUE INDEX IF NOT EXISTS "SeoSite_domain_key" ON "SeoSite"("domain");
CREATE UNIQUE INDEX IF NOT EXISTS "SeoKeyword_siteId_keyword_key" ON "SeoKeyword"("siteId", "keyword");
CREATE UNIQUE INDEX IF NOT EXISTS "SeoKeywordRankDaily_siteId_keywordId_date_country_device_key" ON "SeoKeywordRankDaily"("siteId", "keywordId", "date", "country", "device");
CREATE UNIQUE INDEX IF NOT EXISTS "SeoKeywordVolumeMonthly_keywordId_provider_country_key" ON "SeoKeywordVolumeMonthly"("keywordId", "provider", "country");

-- Crear índices regulares
CREATE INDEX IF NOT EXISTS "SeoSite_domain_idx" ON "SeoSite"("domain");
CREATE INDEX IF NOT EXISTS "SeoKeyword_siteId_idx" ON "SeoKeyword"("siteId");
CREATE INDEX IF NOT EXISTS "SeoKeyword_keyword_idx" ON "SeoKeyword"("keyword");
CREATE INDEX IF NOT EXISTS "SeoKeyword_intent_idx" ON "SeoKeyword"("intent");
CREATE INDEX IF NOT EXISTS "SeoKeywordRankDaily_siteId_date_idx" ON "SeoKeywordRankDaily"("siteId", "date");
CREATE INDEX IF NOT EXISTS "SeoKeywordRankDaily_keywordId_date_idx" ON "SeoKeywordRankDaily"("keywordId", "date");
CREATE INDEX IF NOT EXISTS "SeoKeywordRankDaily_date_idx" ON "SeoKeywordRankDaily"("date");
CREATE INDEX IF NOT EXISTS "SeoKeywordVolumeMonthly_keywordId_idx" ON "SeoKeywordVolumeMonthly"("keywordId");
CREATE INDEX IF NOT EXISTS "SeoIssue_siteId_idx" ON "SeoIssue"("siteId");
CREATE INDEX IF NOT EXISTS "SeoIssue_type_idx" ON "SeoIssue"("type");
CREATE INDEX IF NOT EXISTS "SeoIssue_severity_idx" ON "SeoIssue"("severity");
CREATE INDEX IF NOT EXISTS "SeoIssue_status_idx" ON "SeoIssue"("status");
CREATE INDEX IF NOT EXISTS "SeoIssue_siteId_type_url_idx" ON "SeoIssue"("siteId", "type", "url");
CREATE INDEX IF NOT EXISTS "SeoRecommendation_siteId_idx" ON "SeoRecommendation"("siteId");
CREATE INDEX IF NOT EXISTS "SeoRecommendation_priority_idx" ON "SeoRecommendation"("priority");
CREATE INDEX IF NOT EXISTS "SeoRecommendation_status_idx" ON "SeoRecommendation"("status");
CREATE INDEX IF NOT EXISTS "SeoRecommendation_siteId_title_idx" ON "SeoRecommendation"("siteId", "title");

-- Crear foreign keys
ALTER TABLE "SeoKeyword" 
    DROP CONSTRAINT IF EXISTS "SeoKeyword_siteId_fkey",
    ADD CONSTRAINT "SeoKeyword_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "SeoSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "SeoKeywordRankDaily" 
    DROP CONSTRAINT IF EXISTS "SeoKeywordRankDaily_siteId_fkey",
    ADD CONSTRAINT "SeoKeywordRankDaily_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "SeoSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "SeoKeywordRankDaily" 
    DROP CONSTRAINT IF EXISTS "SeoKeywordRankDaily_keywordId_fkey",
    ADD CONSTRAINT "SeoKeywordRankDaily_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "SeoKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "SeoKeywordVolumeMonthly" 
    DROP CONSTRAINT IF EXISTS "SeoKeywordVolumeMonthly_keywordId_fkey",
    ADD CONSTRAINT "SeoKeywordVolumeMonthly_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "SeoKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "SeoIssue" 
    DROP CONSTRAINT IF EXISTS "SeoIssue_siteId_fkey",
    ADD CONSTRAINT "SeoIssue_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "SeoSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "SeoRecommendation" 
    DROP CONSTRAINT IF EXISTS "SeoRecommendation_siteId_fkey",
    ADD CONSTRAINT "SeoRecommendation_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "SeoSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "SeoRecommendation" 
    DROP CONSTRAINT IF EXISTS "SeoRecommendation_issueId_fkey",
    ADD CONSTRAINT "SeoRecommendation_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "SeoIssue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
```

### Paso 4: Verificar

Después de ejecutar el SQL, verifica que las tablas se crearon:

```sql
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename LIKE 'Seo%'
ORDER BY tablename;
```

Deberías ver:
- SeoIssue
- SeoKeyword
- SeoKeywordRankDaily
- SeoKeywordVolumeMonthly
- SeoRecommendation
- SeoSite

## Solución Automática (Para el Futuro)

He actualizado el script `start.sh` para que verifique si las tablas existen y las cree automáticamente si no están. Esto debería funcionar en el próximo deploy.

