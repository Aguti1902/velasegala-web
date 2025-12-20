# 🔧 Configuración de Google Analytics API para el Dashboard

Esta guía te ayudará a conectar Google Analytics con el dashboard del admin para mostrar estadísticas reales.

---

## 📋 Requisitos Previos

1. ✅ Google Analytics 4 configurado en tu sitio (ya lo tienes con ID `G-LF82NH1E0E`)
2. ✅ Una cuenta de Google Cloud Platform

---

## 🚀 Paso 1: Crear Proyecto en Google Cloud

1. **Ve a Google Cloud Console:**
   - https://console.cloud.google.com/
   - Inicia sesión con tu cuenta de Google

2. **Crear nuevo proyecto:**
   - Haz clic en el selector de proyecto (arriba)
   - Haz clic en **"Nuevo Proyecto"**
   - Nombre: `Vela-Segalà Analytics`
   - Haz clic en **"Crear"**
   - Espera a que se cree el proyecto (puede tardar unos segundos)

---

## 🔑 Paso 2: Habilitar Google Analytics Data API

1. **En Google Cloud Console:**
   - Ve a **"APIs & Services"** → **"Library"** (Biblioteca)
   - Busca: `Google Analytics Data API`
   - Haz clic en el resultado
   - Haz clic en **"Enable"** (Habilitar)

---

## 👤 Paso 3: Crear Cuenta de Servicio

1. **En Google Cloud Console:**
   - Ve a **"APIs & Services"** → **"Credentials"** (Credenciales)
   - Haz clic en **"Create Credentials"** → **"Service Account"** (Cuenta de servicio)

2. **Configurar la cuenta de servicio:**
   - **Service account name:** `analytics-reader`
   - **Service account ID:** Se genera automáticamente
   - **Description:** `Service account para leer datos de Google Analytics`
   - Haz clic en **"Create and Continue"**

3. **Permisos (opcional):**
   - Puedes saltarte este paso por ahora
   - Haz clic en **"Continue"** y luego **"Done"**

---

## 📝 Paso 4: Generar Clave JSON

1. **En la lista de cuentas de servicio:**
   - Haz clic en la cuenta de servicio que acabas de crear (`analytics-reader@...`)

2. **Ve a la pestaña "Keys":**
   - Haz clic en **"Add Key"** → **"Create new key"**
   - Selecciona **"JSON"**
   - Haz clic en **"Create"**
   - Se descargará automáticamente un archivo JSON

3. **Guarda este archivo de forma segura:**
   - Este archivo contiene credenciales sensibles
   - No lo subas a GitHub
   - Lo necesitarás en el siguiente paso

---

## 🔗 Paso 5: Compartir Propiedad de Google Analytics

1. **Ve a Google Analytics:**
   - https://analytics.google.com/
   - Selecciona tu propiedad `Clínica Vela-Segalà Web`

2. **Ir a Admin:**
   - Haz clic en el engranaje (⚙️) abajo a la izquierda

3. **Compartir con cuenta de servicio:**
   - En la columna **"Property"**, ve a **"Property access management"**
   - Haz clic en **"+"** → **"Add users"**
   - En **"Email address"**, pega el email de tu cuenta de servicio (lo encuentras en el archivo JSON descargado, campo `client_email`)
   - Selecciona el rol: **"Viewer"** (Solo lectura)
   - Haz clic en **"Add"**

---

## ⚙️ Paso 6: Obtener Property ID

1. **En Google Analytics:**
   - Ve a **Admin** → **Property Settings**
   - Busca **"Property ID"**
   - Copia el número (ejemplo: `123456789` o puede ser `LF82NH1E0E`)
   - **IMPORTANTE:** Si tu Measurement ID es `G-LF82NH1E0E`, entonces el Property ID podría ser solo `LF82NH1E0E` o el número completo de la propiedad

2. **Para encontrar el Property ID correcto:**
   - Ve a la URL de tu propiedad en Analytics
   - O mira en **Admin** → **Property Settings**
   - El formato puede ser un número (ej: `123456789`) o alfanumérico

---

## 🔐 Paso 7: Configurar Variables en Railway

1. **Convertir el archivo JSON a string:**
   - Abre el archivo JSON que descargaste
   - Cópialo completo
   - Necesitarás convertirlo a una sola línea o mantenerlo como JSON válido

2. **En Railway:**
   - Ve a tu proyecto backend
   - **Settings** → **Variables**
   - Añade estas variables:

   ```
   GOOGLE_ANALYTICS_CREDENTIALS={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
   ```

   ⚠️ **IMPORTANTE:** 
   - Pega TODO el contenido del JSON en una sola línea
   - O usa un formato JSON válido sin saltos de línea
   - Railway acepta variables multilinea, pero es mejor usar una sola línea

   ```
   GOOGLE_ANALYTICS_PROPERTY_ID=LF82NH1E0E
   ```
   (o el ID numérico completo si es diferente)

3. **Redeploy:**
   - Después de añadir las variables, Railway hará redeploy automáticamente
   - O puedes hacerlo manualmente desde **Deployments**

---

## ✅ Paso 8: Verificar que Funciona

1. **Revisa los logs de Railway:**
   - Deberías ver: `✅ Google Analytics Data API configurado correctamente`
   - Si ves errores, revisa que las credenciales sean correctas

2. **Prueba en el dashboard:**
   - Inicia sesión en el admin
   - Ve al Dashboard
   - Deberías ver datos reales de Google Analytics (puede tardar unos minutos en aparecer)

---

## 🐛 Troubleshooting

### Error: "Google Analytics no está configurado"

**Causa:** Las credenciales no están configuradas o son inválidas.

**Solución:**
- Verifica que `GOOGLE_ANALYTICS_CREDENTIALS` está en Railway
- Asegúrate de que el JSON es válido (puedes validarlo en https://jsonlint.com/)
- Verifica que no hay espacios extra o saltos de línea incorrectos

### Error: "Permission denied" o "Insufficient permissions"

**Causa:** La cuenta de servicio no tiene acceso a la propiedad de Analytics.

**Solución:**
- Ve a Google Analytics → Admin → Property access management
- Asegúrate de que el email de la cuenta de servicio está añadido con rol "Viewer"
- Espera unos minutos después de añadirlo (puede tardar en propagarse)

### Error: "Property not found"

**Causa:** El Property ID es incorrecto.

**Solución:**
- Verifica el Property ID en Google Analytics → Admin → Property Settings
- Asegúrate de que `GOOGLE_ANALYTICS_PROPERTY_ID` tiene el valor correcto
- Si tu Measurement ID es `G-LF82NH1E0E`, prueba con `LF82NH1E0E` o busca el ID numérico completo

### Los datos aparecen como 0 o no aparecen

**Causa:** No hay datos suficientes o el rango de fechas no tiene datos.

**Solución:**
- Espera unas horas/días para que Google Analytics acumule datos
- Verifica en Google Analytics directamente que hay datos
- Asegúrate de que tu sitio está siendo rastreado correctamente

---

## 📚 Recursos Adicionales

- [Google Analytics Data API Documentation](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Service Accounts Guide](https://cloud.google.com/iam/docs/service-accounts)
- [Google Cloud Console](https://console.cloud.google.com/)

---

## 🔒 Seguridad

**IMPORTANTE:**
- ⚠️ Nunca subas el archivo JSON de credenciales a GitHub
- ⚠️ Mantén las credenciales seguras
- ⚠️ Si comprometes las credenciales, elimínalas y crea nuevas inmediatamente

---

**¡Listo!** Una vez configurado todo, el dashboard mostrará datos reales de Google Analytics. 🎉

