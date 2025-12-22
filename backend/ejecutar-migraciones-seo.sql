-- Script SQL para crear las tablas SEO manualmente
-- Ejecuta este script directamente en PostgreSQL si Prisma no las crea automáticamente

-- CreateTable
CREATE TABLE IF NOT EXISTS "SeoSite" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "gscProperty" TEXT,
    "countryDefault" TEXT NOT NULL DEFAULT 'ES',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeoSite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
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

-- CreateTable
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

-- CreateTable
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

-- CreateTable
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

-- CreateTable
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

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "SeoSite_domain_key" ON "SeoSite"("domain");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoSite_domain_idx" ON "SeoSite"("domain");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoKeyword_siteId_idx" ON "SeoKeyword"("siteId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoKeyword_keyword_idx" ON "SeoKeyword"("keyword");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoKeyword_intent_idx" ON "SeoKeyword"("intent");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "SeoKeyword_siteId_keyword_key" ON "SeoKeyword"("siteId", "keyword");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoKeywordRankDaily_siteId_date_idx" ON "SeoKeywordRankDaily"("siteId", "date");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoKeywordRankDaily_keywordId_date_idx" ON "SeoKeywordRankDaily"("keywordId", "date");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoKeywordRankDaily_date_idx" ON "SeoKeywordRankDaily"("date");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "SeoKeywordRankDaily_siteId_keywordId_date_country_device_key" ON "SeoKeywordRankDaily"("siteId", "keywordId", "date", "country", "device");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoKeywordVolumeMonthly_keywordId_idx" ON "SeoKeywordVolumeMonthly"("keywordId");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "SeoKeywordVolumeMonthly_keywordId_provider_country_key" ON "SeoKeywordVolumeMonthly"("keywordId", "provider", "country");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoIssue_siteId_idx" ON "SeoIssue"("siteId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoIssue_type_idx" ON "SeoIssue"("type");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoIssue_severity_idx" ON "SeoIssue"("severity");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoIssue_status_idx" ON "SeoIssue"("status");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoIssue_siteId_type_url_idx" ON "SeoIssue"("siteId", "type", "url");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoRecommendation_siteId_idx" ON "SeoRecommendation"("siteId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoRecommendation_priority_idx" ON "SeoRecommendation"("priority");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoRecommendation_status_idx" ON "SeoRecommendation"("status");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SeoRecommendation_siteId_title_idx" ON "SeoRecommendation"("siteId", "title");

-- AddForeignKey
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'SeoKeyword_siteId_fkey'
    ) THEN
        ALTER TABLE "SeoKeyword" ADD CONSTRAINT "SeoKeyword_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "SeoSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'SeoKeywordRankDaily_siteId_fkey'
    ) THEN
        ALTER TABLE "SeoKeywordRankDaily" ADD CONSTRAINT "SeoKeywordRankDaily_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "SeoSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'SeoKeywordRankDaily_keywordId_fkey'
    ) THEN
        ALTER TABLE "SeoKeywordRankDaily" ADD CONSTRAINT "SeoKeywordRankDaily_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "SeoKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'SeoKeywordVolumeMonthly_keywordId_fkey'
    ) THEN
        ALTER TABLE "SeoKeywordVolumeMonthly" ADD CONSTRAINT "SeoKeywordVolumeMonthly_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "SeoKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'SeoIssue_siteId_fkey'
    ) THEN
        ALTER TABLE "SeoIssue" ADD CONSTRAINT "SeoIssue_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "SeoSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'SeoRecommendation_siteId_fkey'
    ) THEN
        ALTER TABLE "SeoRecommendation" ADD CONSTRAINT "SeoRecommendation_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "SeoSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'SeoRecommendation_issueId_fkey'
    ) THEN
        ALTER TABLE "SeoRecommendation" ADD CONSTRAINT "SeoRecommendation_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "SeoIssue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

-- Marcar la migración como aplicada en la tabla de Prisma
INSERT INTO "_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count")
SELECT 
    gen_random_uuid()::text,
    '',
    NOW(),
    '20251222122245_add_seo_module',
    NULL,
    NULL,
    NOW(),
    1
WHERE NOT EXISTS (
    SELECT 1 FROM "_prisma_migrations" 
    WHERE "migration_name" = '20251222122245_add_seo_module'
);

