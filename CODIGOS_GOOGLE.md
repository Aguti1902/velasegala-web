# 📊 Códigos de Google - Vela Segalà

## Google Analytics 4 (GA4)
```
G-LF82NH1E0E
```
**Estado**: ✅ Activo en la web

---

## Google Tag Manager (GTM)
```
GTM-5GBF8T8F
```
**Estado**: ⚠️ Necesita configurarse en Vercel

---

## Configurar en Vercel

### Variables de entorno a añadir:

1. **NEXT_PUBLIC_GTM_ID**
   - Valor: `GTM-5GBF8T8F`

2. **NEXT_PUBLIC_GA_MEASUREMENT_ID** (opcional, ya tiene valor por defecto)
   - Valor: `G-LF82NH1E0E`

### Pasos en Vercel:

1. Ve al Dashboard de Vercel
2. Selecciona el proyecto de Vela Segalà
3. Ve a **Settings** → **Environment Variables**
4. Añade:
   - Name: `NEXT_PUBLIC_GTM_ID`
   - Value: `GTM-5GBF8T8F`
   - Environments: Production, Preview, Development
5. Haz clic en **Save**
6. Ve a **Deployments** → **Redeploy** (botón con 3 puntos al lado del último deploy)

---

## Verificar que funciona

Después del redeploy, verifica:

1. Abre la web: https://tu-dominio.com
2. Abre DevTools (F12)
3. En la pestaña **Network**, busca:
   - ✅ `gtm.js?id=GTM-5GBF8T8F`
4. Instala la extensión: [Google Tag Assistant](https://chrome.google.com/webstore/detail/google-tag-assistant/ehbpddoifoobpndpdfnkdfpgflcfjkph)
5. Verifica que aparezca GTM activo

---

## Siguiente paso: Configurar Google Ads

Una vez GTM esté activo:

1. Ve a tu cuenta de Google Ads
2. **Herramientas** → **Conversiones** → **Nueva conversión**
3. Selecciona **Sitio web**
4. Selecciona **Usar Google Tag Manager**
5. Configura las conversiones que quieras trackear (formularios, citas, etc.)
6. En GTM, crea las etiquetas correspondientes

Consulta la guía completa en: `CONFIGURAR_GOOGLE_ADS_Y_GTM.md`

