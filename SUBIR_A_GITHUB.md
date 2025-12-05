# Guía para Subir el Proyecto a GitHub

## Pasos para subir todo el código

### 1. Inicializar Git y hacer el primer commit

```bash
cd "/Users/guti/Desktop/CURSOR WEBS/vela segala"

# Inicializar repositorio
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: Clínica Dental Vela-Segalà website"

# Renombrar rama a main
git branch -M main

# Conectar con GitHub
git remote add origin https://github.com/Aguti1902/velasegala-web.git

# Subir todo
git push -u origin main
```

### 2. Si te pide credenciales

GitHub ya no acepta contraseñas. Necesitas un **Personal Access Token**:

1. Ve a GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Dale permisos: repo (todos)
4. Copia el token
5. Cuando Git pida password, pega el token

### 3. Verificar que se subió correctamente

Ve a: https://github.com/Aguti1902/velasegala-web

Deberías ver:
- frontend/
- backend/
- images/
- README.md
- DEPLOYMENT.md
- etc.

## ⚠️ Archivos que NO se subirán (están en .gitignore)

- node_modules/
- .env y .env.local
- .next/
- dist/
- build/

**Esto es correcto**, estos archivos no deben subirse.

## Siguiente paso: Deploy

Una vez subido a GitHub, sigue la guía en `DEPLOYMENT.md` para:
1. Crear base de datos PostgreSQL (Railway/Neon)
2. Deploy backend en Railway
3. Deploy frontend en Vercel
4. Configurar n8n

