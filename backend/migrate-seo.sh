#!/bin/sh
# Script standalone para ejecutar migraciones SEO manualmente

echo "=========================================="
echo "🔄 Ejecutando migraciones SEO..."
echo "=========================================="

echo ""
echo "📦 Generando Prisma Client..."
npx prisma generate

echo ""
echo "🔄 Aplicando migraciones..."
npx prisma migrate deploy

echo ""
echo "✅ Verificando que las tablas SEO existan..."
npx prisma db execute --stdin <<EOF
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('SeoSite', 'SeoKeyword', 'SeoKeywordRankDaily', 'SeoKeywordVolumeMonthly', 'SeoIssue', 'SeoRecommendation')
ORDER BY tablename;
EOF

echo ""
echo "=========================================="
echo "✅ Migraciones completadas"
echo "=========================================="

