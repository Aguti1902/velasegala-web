#!/bin/bash

# Script para eliminar todos los posts excepto el más reciente

echo "🗑️  Eliminando posts antiguos..."
echo ""

# Pedir confirmación
read -p "⚠️  ¿Estás seguro? Esto eliminará TODOS los posts excepto el más reciente (s/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "❌ Operación cancelada"
    exit 1
fi

# Hacer la petición al endpoint
echo "🔄 Enviando petición al backend..."

# Primero necesitamos obtener el token de admin
echo ""
echo "📋 Necesitas el token de admin. Opciones:"
echo ""
echo "Opción 1: Copia el token desde las DevTools de tu navegador:"
echo "  1. Ve a https://velasegala-web-emc8.vercel.app/admin"
echo "  2. Abre DevTools (F12) → Application → Cookies"
echo "  3. Copia el valor de 'admin_token'"
echo ""
echo "Opción 2: Usa este comando curl:"
echo ""
echo "curl -X POST https://velasegala-web-production.up.railway.app/api/admin/delete-old-posts \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -H \"Authorization: Bearer TU_TOKEN_AQUI\""
echo ""
echo "Reemplaza TU_TOKEN_AQUI con tu token de admin"
echo ""

