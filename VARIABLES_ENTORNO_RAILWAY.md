# 🔧 Variables de Entorno para Railway (Actualizado)

## 📋 Variables necesarias en el Backend

Copia y pega esto en Railway → Backend → Variables:

```bash
# Base de datos (generada automáticamente por Railway)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Autenticación
JWT_SECRET=tu-secreto-super-seguro-cambiar-esto-en-produccion
JWT_EXPIRATION=7d

# Email (Resend)
RESEND_API_KEY=re_tu_api_key_aqui
EMAIL_FROM=noreply@tudominio.com
APPOINTMENT_EMAIL=segala@velasegala.com
SECONDARY_EMAIL=agutierrezgomez00@gmail.com

# Google Analytics Data API (ya configurado)
GOOGLE_APPLICATION_CREDENTIALS={"type":"service_account",...}
GOOGLE_ANALYTICS_PROPERTY_ID=tu-property-id

# Google Search Console (para módulo SEO)
GOOGLE_SEARCH_CONSOLE_CREDENTIALS={"type":"service_account",...}
GOOGLE_SEARCH_CONSOLE_PROPERTY_ID=https://www.velasegalaviladecans.com

# SerpAPI (para análisis real de competidores)
SERPAPI_API_KEY=tu-api-key-aqui

# DataForSEO (opcional, para volúmenes de búsqueda)
SEO_VOLUME_PROVIDER=dataforseo
DATA_FOR_SEO_API_KEY=tu-login
DATA_FOR_SEO_LOGIN=tu-password

# n8n (si usas automatización)
N8N_API_KEY=tu-clave-api-n8n-segura

# CORS (frontend URL)
FRONTEND_URL=https://velasegala-web-emc8.vercel.app
CORS_ORIGIN=https://www.velasegalaviladecans.com,https://velasegalaviladecans.com

# Otros
PORT=3001
NODE_ENV=production
```

---

## 🆕 Nueva variable añadida

**SECONDARY_EMAIL**: Email secundario donde también se enviarán copias de todos los formularios.

**Valor**: `agutierezgomez00@gmail.com`

---

## ⚙️ Cómo añadir la variable en Railway

1. Ve a Railway Dashboard
2. Selecciona el proyecto **Backend**
3. Haz clic en **Variables** (en la barra superior)
4. Haz clic en **+ New Variable**
5. Añade:
   - **Name**: `SECONDARY_EMAIL`
   - **Value**: `agutierezgomez00@gmail.com`
6. El backend se redeployará automáticamente

---

## ✅ Una vez configurado

Después del redeploy (1-2 minutos):
- Los emails de citas irán a:
  - ✉️ `segala@velasegala.com` (clienta)
  - ✉️ `agutierrezgomez00@gmail.com` (tú)
- Los emails de contacto irán a los mismos destinatarios
- Ambos recibirán notificaciones de todos los formularios

---

## 🔍 Verificar que funciona

1. Espera a que Railway termine de redeploy
2. Envía un formulario de prueba desde la web
3. Verifica que ambos reciban el email
4. Si no llega, revisa:
   - Carpeta de SPAM en ambos emails
   - Logs de Railway para ver si hay errores al enviar
