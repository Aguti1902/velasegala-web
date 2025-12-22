# Configuración de Node.js para Railway

Railway está configurado para usar **Node.js 20** a través del archivo `nixpacks.toml`.

Si Railway no detecta automáticamente Node.js 20, puedes configurarlo manualmente:

## Opción 1: Variable de Entorno en Railway

Añade una variable de entorno en Railway:
- **Nombre:** `NIXPACKS_NODE_VERSION`
- **Valor:** `20`

## Opción 2: Actualizar en Railway Dashboard

1. Ve a tu proyecto en Railway
2. Settings > Variables
3. Añade: `NIXPACKS_NODE_VERSION=20`
4. O cambia el "Build Command" para usar Node 20 explícitamente

## Verificar versión de Node.js

Después del deploy, verifica que esté usando Node 20 en los logs de Railway.

