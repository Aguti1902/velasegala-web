#!/bin/sh
# Script de inicio para Railway que ejecuta migraciones y seed automáticamente

echo "🔄 Resolviendo migraciones fallidas (si existen)..."
npx prisma migrate resolve --rolled-back 20241206_add_status_to_contacts 2>/dev/null || echo "No hay migraciones fallidas que resolver"

echo "🔄 Running database migrations..."
npx prisma migrate deploy

echo "🌱 Running database seed..."
npx prisma db seed || echo "⚠️ Seed failed or already executed"

echo "🚀 Starting application..."
node dist/src/main


