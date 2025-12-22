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

# Ejecutar migraciones y capturar output
if npx prisma migrate deploy; then
    echo ""
    echo "   ✅ MIGRACIONES EJECUTADAS CORRECTAMENTE"
    echo ""
    echo "   📊 Verificando tablas SEO en la base de datos..."
    echo "   (Esto puede fallar si no tienes psql, pero no es crítico)"
    npx prisma db execute --stdin <<'EOF' 2>/dev/null || echo "   (No se pudo verificar, pero las migraciones se ejecutaron)"
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename LIKE 'Seo%'
ORDER BY tablename;
EOF
else
    echo ""
    echo "   ⚠️ ERROR AL EJECUTAR MIGRACIONES"
    echo "   Revisa los logs anteriores para más detalles"
    echo "   Continuando de todas formas..."
fi

echo ""
echo "🌱 Ejecutando seed de base de datos..."
npx prisma db seed || echo "   ⚠️ Seed falló o ya fue ejecutado (no crítico)"

echo ""
echo "🚀 Iniciando aplicación NestJS..."
echo "=========================================="
exec node dist/src/main
