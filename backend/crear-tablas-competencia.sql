-- Script SQL para crear las tablas de análisis de competencia
-- Ejecutar este script directamente en la base de datos PostgreSQL

-- CreateTable: SeoCompetitor
CREATE TABLE IF NOT EXISTS "SeoCompetitor" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "name" TEXT,
    "url" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "lastAnalyzed" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeoCompetitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable: SeoCompetitorKeyword
CREATE TABLE IF NOT EXISTS "SeoCompetitorKeyword" (
    "id" TEXT NOT NULL,
    "competitorId" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "position" DOUBLE PRECISION,
    "monthlyVolume" INTEGER,
    "intent" TEXT,
    "targetUrl" TEXT,
    "firstSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeoCompetitorKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable: SeoCompetitorRanking
CREATE TABLE IF NOT EXISTS "SeoCompetitorRanking" (
    "id" TEXT NOT NULL,
    "competitorId" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "position" DOUBLE PRECISION NOT NULL,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeoCompetitorRanking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "SeoCompetitor_siteId_domain_key" ON "SeoCompetitor"("siteId", "domain");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoCompetitor_siteId_idx" ON "SeoCompetitor"("siteId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoCompetitor_domain_idx" ON "SeoCompetitor"("domain");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "SeoCompetitorKeyword_competitorId_keyword_key" ON "SeoCompetitorKeyword"("competitorId", "keyword");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoCompetitorKeyword_competitorId_idx" ON "SeoCompetitorKeyword"("competitorId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoCompetitorKeyword_keyword_idx" ON "SeoCompetitorKeyword"("keyword");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "SeoCompetitorRanking_competitorId_keyword_date_key" ON "SeoCompetitorRanking"("competitorId", "keyword", "date");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoCompetitorRanking_competitorId_date_idx" ON "SeoCompetitorRanking"("competitorId", "date");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoCompetitorRanking_keyword_idx" ON "SeoCompetitorRanking"("keyword");

-- AddForeignKey
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'SeoCompetitor_siteId_fkey'
    ) THEN
        ALTER TABLE "SeoCompetitor" 
        ADD CONSTRAINT "SeoCompetitor_siteId_fkey" 
        FOREIGN KEY ("siteId") 
        REFERENCES "SeoSite"("id") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'SeoCompetitorKeyword_competitorId_fkey'
    ) THEN
        ALTER TABLE "SeoCompetitorKeyword" 
        ADD CONSTRAINT "SeoCompetitorKeyword_competitorId_fkey" 
        FOREIGN KEY ("competitorId") 
        REFERENCES "SeoCompetitor"("id") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'SeoCompetitorRanking_competitorId_fkey'
    ) THEN
        ALTER TABLE "SeoCompetitorRanking" 
        ADD CONSTRAINT "SeoCompetitorRanking_competitorId_fkey" 
        FOREIGN KEY ("competitorId") 
        REFERENCES "SeoCompetitor"("id") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE;
    END IF;
END $$;

-- Verificar que las tablas se crearon correctamente
SELECT 
    tablename,
    schemaname
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('SeoCompetitor', 'SeoCompetitorKeyword', 'SeoCompetitorRanking')
ORDER BY tablename;

