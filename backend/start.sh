#!/bin/sh
# Script de inicio para Railway que ejecuta migraciones y seed automáticamente

echo "🔄 Running database migrations..."
npx prisma migrate deploy

echo "🌱 Running database seed..."
npx prisma db seed || echo "⚠️ Seed failed or already executed"

echo "🚀 Starting application..."
node dist/src/main

