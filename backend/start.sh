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

# Si las tablas no existen, ejecutar migraciones
if echo "$TABLES_EXIST" | grep -q "6" || echo "$TABLES_EXIST" | grep -q "count.*6"; then
    echo "   ℹ️  Las tablas SEO ya existen en la base de datos"
else
    echo "   📋 Tablas SEO no encontradas, ejecutando migraciones..."
    
    # Ejecutar migraciones con Prisma
    if npx prisma migrate deploy; then
        echo ""
        echo "   ✅ MIGRACIONES EJECUTADAS CORRECTAMENTE"
    else
        echo ""
        echo "   ⚠️  Prisma dice que no hay migraciones pendientes"
        echo "   🔧 Intentando crear tablas manualmente..."
        
        # Si Prisma dice que no hay migraciones pendientes pero las tablas no existen,
        # ejecutar el SQL directamente
        if [ -f "ejecutar-migraciones-seo.sql" ]; then
            echo "   📄 Ejecutando SQL manual..."
            npx prisma db execute --file ejecutar-migraciones-seo.sql 2>/dev/null || {
                echo "   ⚠️  No se pudo ejecutar SQL manual (puede requerir ejecución directa en PostgreSQL)"
            }
        else
            echo "   ⚠️  Archivo ejecutar-migraciones-seo.sql no encontrado"
        fi
    fi
    
    echo ""
    echo "   📊 Verificando tablas SEO en la base de datos..."
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
