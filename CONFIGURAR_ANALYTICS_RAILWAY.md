# ⚙️ Configurar Google Analytics en Railway

Esta guía te ayudará a configurar las credenciales de Google Analytics en Railway para que el dashboard muestre datos reales.

## 📋 Información que necesitas

- **Property ID:** `517091107`
- **Archivo JSON:** `vela-segala-analytics-a4923cdbcffe.json` (en tu carpeta Downloads)

## 🚀 Paso 1: Preparar el JSON para Railway

Railway necesita el JSON completo del archivo de credenciales. Tienes dos opciones:

**Opción A (Recomendada):** Copiar el JSON tal cual del archivo
- Abre el archivo `vela-segala-analytics-a4923cdbcffe.json`
- Copia TODO su contenido (desde `{` hasta `}`)
- Pégalo directamente en Railway (acepta JSON con formato normal)

**Opción B:** Convertir a una sola línea
- Si prefieres, puedes usar https://jsonformatter.org/json-minify para convertir el JSON a una sola línea
- Esto no es necesario, pero puede ser más seguro

## 🔐 Paso 2: Configurar en Railway

1. **Ve a Railway:**
   - https://railway.app
   - Selecciona tu proyecto backend

2. **Ve a Variables:**
   - Haz clic en la pestaña **"Variables"**

3. **Añadir GOOGLE_ANALYTICS_CREDENTIALS:**
   - Haz clic en **"+ New Variable"**
   - **Name:** `GOOGLE_ANALYTICS_CREDENTIALS`
   - **Value:** Abre el archivo `vela-segala-analytics-a4923cdbcffe.json` desde tu carpeta Downloads y copia TODO su contenido. Pégalo aquí.
   - Haz clic en **"Add"**

4. **Añadir GOOGLE_ANALYTICS_PROPERTY_ID:**
   - Haz clic en **"+ New Variable"** de nuevo
   - **Name:** `GOOGLE_ANALYTICS_PROPERTY_ID`
   - **Value:** `517091107`
   - Haz clic en **"Add"**

## ✅ Paso 3: Verificar y Redeploy

1. **Verifica las variables:**
   - Deberías ver ambas variables en la lista:
     - `GOOGLE_ANALYTICS_CREDENTIALS`
     - `GOOGLE_ANALYTICS_PROPERTY_ID`

2. **Redeploy automático:**
   - Railway debería hacer redeploy automáticamente
   - O ve a **"Deployments"** y haz clic en **"Redeploy"**

3. **Verificar logs:**
   - Ve a la pestaña **"Logs"** o **"Deployments"**
   - Busca el mensaje: `✅ Google Analytics Data API configurado correctamente`
   - Si ves este mensaje, ¡todo está funcionando! 🎉

## 🔍 Paso 4: Compartir Propiedad en Google Analytics

**IMPORTANTE:** Antes de que funcione, debes compartir la propiedad de Analytics con la cuenta de servicio:

1. **Ve a Google Analytics:**
   - https://analytics.google.com
   - Selecciona tu propiedad

2. **Admin → Property access management:**
   - Haz clic en el engranaje (⚙️) abajo a la izquierda
   - En la columna **"Property"**, haz clic en **"Property access management"**

3. **Añadir cuenta de servicio:**
   - Haz clic en **"+"** → **"Add users"**
   - **Email address:** `analytics-reader@vela-segala-analytics.iam.gserviceaccount.com`
   - **Role:** Selecciona **"Viewer"** (Solo lectura)
   - Haz clic en **"Add"**

## 🎯 Paso 5: Probar en el Dashboard

1. **Espera unos minutos** para que Railway termine el redeploy

2. **Ve al Dashboard Admin:**
   - Inicia sesión en `/admin`
   - Ve al Dashboard

3. **Verifica las estadísticas:**
   - Deberías ver datos reales de Google Analytics
   - Si todavía ves 0 o datos mock, espera unos minutos más o revisa los logs

## 🐛 Troubleshooting

### Error: "Google Analytics no está configurado"

- Verifica que `GOOGLE_ANALYTICS_CREDENTIALS` esté en Railway
- Verifica que el JSON sea válido (debe empezar con `{` y terminar con `}`)
- Verifica que Railway haya hecho redeploy después de añadir la variable

### Error: "Permission denied" o "Insufficient permissions"

- Verifica que hayas compartido la propiedad con el email: `analytics-reader@vela-segala-analytics.iam.gserviceaccount.com`
- Verifica que el rol sea "Viewer" o superior
- Espera unos minutos después de compartir (puede tardar en propagarse)

### Error: "Property not found"

- Verifica que `GOOGLE_ANALYTICS_PROPERTY_ID` sea `517091107` (sin espacios, sin G-)
- Verifica que el Property ID sea correcto en Google Analytics → Admin → Property Settings

### Los datos aparecen como 0

- Espera unas horas/días para que Google Analytics acumule datos
- Verifica en Google Analytics directamente que hay datos
- Revisa los logs de Railway para ver si hay errores

---

**¡Listo!** Una vez configurado, el dashboard mostrará estadísticas reales de Google Analytics. 🎉

