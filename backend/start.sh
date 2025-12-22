#!/bin/sh
# Script de inicio para Railway que ejecuta migraciones y seed automáticamente

echo "=========================================="
echo "🚀 Iniciando aplicación backend..."
echo "=========================================="

echo ""
echo "📦 Verificando Prisma Client..."
npx prisma generate || {
    echo "   ❌ Error al generar Prisma Client"
    exit 1
}

echo ""
echo "🔄 Verificando conexión a base de datos..."
npx prisma db execute --stdin <<EOF
SELECT 1;
EOF
|| echo "   ⚠️ No se pudo verificar conexión (puede ser normal)"

echo ""
echo "🔄 Resolviendo migraciones fallidas (si existen)..."
npx prisma migrate resolve --rolled-back 20241206_add_status_to_contacts 2>/dev/null || echo "   ✓ No hay migraciones fallidas que resolver"

echo ""
echo "🔄 Ejecutando migraciones de base de datos..."
echo "   Esto creará las tablas SEO (SeoSite, SeoKeyword, etc.)..."
MIGRATION_OUTPUT=$(npx prisma migrate deploy 2>&1)
MIGRATION_EXIT=$?

echo "$MIGRATION_OUTPUT"

if [ $MIGRATION_EXIT -eq 0 ]; then
    echo "   ✅ Migraciones ejecutadas correctamente"
    echo "   📊 Verificando tablas SEO creadas..."
    npx prisma db execute --stdin <<EOF
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename LIKE 'Seo%';
EOF
else
    echo "   ⚠️ Error al ejecutar migraciones (exit code: $MIGRATION_EXIT)"
    echo "   Continuando de todas formas..."
fi

echo ""
echo "🌱 Ejecutando seed de base de datos..."
npx prisma db seed || echo "   ⚠️ Seed falló o ya fue ejecutado (no crítico)"

echo ""
echo "🚀 Iniciando aplicación NestJS..."
echo "=========================================="
exec node dist/src/main


