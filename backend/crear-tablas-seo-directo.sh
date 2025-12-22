#!/bin/sh
# Script para crear las tablas SEO directamente usando Prisma
# Este script se puede ejecutar manualmente desde Railway CLI si es necesario

echo "=========================================="
echo "🔧 CREANDO TABLAS SEO DIRECTAMENTE..."
echo "=========================================="

echo ""
echo "📦 Generando Prisma Client..."
npx prisma generate

echo ""
echo "🔍 Verificando si las tablas SEO ya existen..."
EXISTING_TABLES=$(npx prisma db execute --stdin <<'EOF' 2>/dev/null
SELECT COUNT(*) as count 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('SeoSite', 'SeoKeyword', 'SeoKeywordRankDaily', 'SeoKeywordVolumeMonthly', 'SeoIssue', 'SeoRecommendation');
EOF
)

if echo "$EXISTING_TABLES" | grep -q "6"; then
    echo "   ✅ Las tablas SEO ya existen. No es necesario crearlas."
    exit 0
fi

echo ""
echo "📋 Tablas SEO no encontradas. Creando tablas..."
echo ""

echo "   1️⃣  Creando tablas principales..."
npx prisma db execute --stdin <<'EOFSQL'
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

if [ $? -eq 0 ]; then
    echo "   ✅ Tablas creadas correctamente"
else
    echo "   ⚠️  Error al crear tablas"
    exit 1
fi

echo ""
echo "   2️⃣  Creando índices..."
npx prisma db execute --stdin <<'EOFSQL'
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

if [ $? -eq 0 ]; then
    echo "   ✅ Índices creados correctamente"
else
    echo "   ⚠️  Error al crear índices"
fi

echo ""
echo "   3️⃣  Creando foreign keys..."
npx prisma db execute --stdin <<'EOFSQL'
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

if [ $? -eq 0 ]; then
    echo "   ✅ Foreign keys creadas correctamente"
else
    echo "   ⚠️  Error al crear foreign keys"
fi

echo ""
echo "   4️⃣  Verificando tablas creadas..."
npx prisma db execute --stdin <<'EOF'
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename LIKE 'Seo%'
ORDER BY tablename;
EOF

echo ""
echo "=========================================="
echo "✅ PROCESO COMPLETADO"
echo "=========================================="

