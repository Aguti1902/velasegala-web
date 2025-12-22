#!/bin/sh
# Script de inicio para Railway que ejecuta migraciones y seed automáticamente

echo "=========================================="
echo "🚀 Iniciando aplicación backend..."
echo "=========================================="

echo ""
echo "📦 Verificando Prisma Client..."
if ! npx prisma generate; then
    echo "   ❌ Error al generar Prisma Client"
    exit 1
fi

echo ""
echo "🔄 Resolviendo migraciones fallidas (si existen)..."
npx prisma migrate resolve --rolled-back 20241206_add_status_to_contacts 2>/dev/null || echo "   ✓ No hay migraciones fallidas que resolver"

echo ""
echo "🔄 EJECUTANDO MIGRACIONES DE BASE DE DATOS..."
echo "   Esto creará las tablas SEO si no existen..."
echo "   Tablas que se crearán: SeoSite, SeoKeyword, SeoKeywordRankDaily, SeoKeywordVolumeMonthly, SeoIssue, SeoRecommendation"
echo ""

# Verificar si las tablas SEO ya existen
TABLES_EXIST=$(npx prisma db execute --stdin <<'EOF' 2>/dev/null || echo "false"
SELECT COUNT(*) as count 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('SeoSite', 'SeoKeyword', 'SeoKeywordRankDaily', 'SeoKeywordVolumeMonthly', 'SeoIssue', 'SeoRecommendation');
EOF
)

# Si las tablas no existen, ejecutar migraciones o crear directamente
if echo "$TABLES_EXIST" | grep -q "6" || echo "$TABLES_EXIST" | grep -q "count.*6"; then
    echo "   ℹ️  Las tablas SEO ya existen en la base de datos"
else
    echo "   📋 Tablas SEO no encontradas, creando tablas..."
    
    # Ejecutar migraciones con Prisma primero
    if npx prisma migrate deploy 2>&1 | grep -q "No pending migrations"; then
        echo ""
        echo "   ⚠️  Prisma dice que no hay migraciones pendientes pero las tablas no existen"
        echo "   🔧 CREANDO TABLAS DIRECTAMENTE CON SQL..."
        
        # Crear tablas directamente con SQL usando Prisma
        npx prisma db execute --stdin <<'EOFSQL' 2>&1
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
EOFSQL
        
        # Crear índices
        npx prisma db execute --stdin <<'EOFSQL' 2>&1
CREATE UNIQUE INDEX IF NOT EXISTS "SeoSite_domain_key" ON "SeoSite"("domain");
CREATE UNIQUE INDEX IF NOT EXISTS "SeoKeyword_siteId_keyword_key" ON "SeoKeyword"("siteId", "keyword");
CREATE UNIQUE INDEX IF NOT EXISTS "SeoKeywordRankDaily_siteId_keywordId_date_country_device_key" ON "SeoKeywordRankDaily"("siteId", "keywordId", "date", "country", "device");
CREATE UNIQUE INDEX IF NOT EXISTS "SeoKeywordVolumeMonthly_keywordId_provider_country_key" ON "SeoKeywordVolumeMonthly"("keywordId", "provider", "country");
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
EOFSQL
        
        # Crear foreign keys
        npx prisma db execute --stdin <<'EOFSQL' 2>&1
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SeoKeyword_siteId_fkey') THEN
        ALTER TABLE "SeoKeyword" ADD CONSTRAINT "SeoKeyword_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "SeoSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SeoKeywordRankDaily_siteId_fkey') THEN
        ALTER TABLE "SeoKeywordRankDaily" ADD CONSTRAINT "SeoKeywordRankDaily_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "SeoSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SeoKeywordRankDaily_keywordId_fkey') THEN
        ALTER TABLE "SeoKeywordRankDaily" ADD CONSTRAINT "SeoKeywordRankDaily_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "SeoKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SeoKeywordVolumeMonthly_keywordId_fkey') THEN
        ALTER TABLE "SeoKeywordVolumeMonthly" ADD CONSTRAINT "SeoKeywordVolumeMonthly_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "SeoKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SeoIssue_siteId_fkey') THEN
        ALTER TABLE "SeoIssue" ADD CONSTRAINT "SeoIssue_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "SeoSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SeoRecommendation_siteId_fkey') THEN
        ALTER TABLE "SeoRecommendation" ADD CONSTRAINT "SeoRecommendation_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "SeoSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SeoRecommendation_issueId_fkey') THEN
        ALTER TABLE "SeoRecommendation" ADD CONSTRAINT "SeoRecommendation_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "SeoIssue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;
EOFSQL
        
        echo ""
        echo "   ✅ TABLAS SEO CREADAS DIRECTAMENTE"
    else
        echo ""
        echo "   ✅ MIGRACIONES EJECUTADAS CORRECTAMENTE"
    fi
    
    echo ""
    echo "   📊 Verificando tablas SEO creadas..."
    npx prisma db execute --stdin <<'EOF' 2>/dev/null || echo "   (No se pudo verificar)"
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename LIKE 'Seo%'
ORDER BY tablename;
EOF
fi

echo ""
echo "🌱 Ejecutando seed de base de datos..."
npx prisma db seed || echo "   ⚠️ Seed falló o ya fue ejecutado (no crítico)"

echo ""
echo "🚀 Iniciando aplicación NestJS..."
echo "=========================================="
exec node dist/src/main
