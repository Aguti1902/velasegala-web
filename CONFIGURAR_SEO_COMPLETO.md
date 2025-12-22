# 🚀 Guía Completa de Configuración del Módulo SEO

Esta guía te explica **paso a paso** qué APIs necesitas, dónde obtenerlas y cómo configurarlas para que el módulo SEO funcione completamente.

---

## 📋 Resumen: ¿Qué necesitas configurar?

### ✅ **Obligatorio (para que funcione)**
1. **Google Search Console API** - Para obtener posiciones, clicks e impressions de keywords

### ⚠️ **Opcional (recomendado)**
2. **DataForSEO API** (o alternativo) - Para obtener volumen de búsqueda mensual de keywords
3. **Base de datos migrada** - Tablas del módulo SEO creadas

---

## 🔴 PASO 1: Google Search Console API (OBLIGATORIO)

Esta API es **esencial** porque proporciona todos los datos de posicionamiento, clicks e impressions.

### 1.1. Crear/Acceder a Google Cloud Project

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Si no tienes proyecto, crea uno nuevo:
   - Click en el dropdown de proyectos (arriba)
   - Click en "Nuevo proyecto"
   - Nombre: `Vela Segala SEO` (o el que quieras)
   - Click "Crear"

### 1.2. Habilitar Google Search Console API

1. En el menú lateral, ve a **"APIs y servicios" > "Biblioteca"**
2. Busca **"Google Search Console API"**
3. Click en el resultado y luego en **"HABILITAR"**

### 1.3. Crear Cuenta de Servicio

1. Ve a **"IAM y administración" > "Cuentas de servicio"**
2. Click en **"+ CREAR CUENTA DE SERVICIO"**
3. Configuración:
   - **Nombre**: `seo-service` (o el que quieras)
   - **ID**: Se genera automáticamente
   - **Descripción**: `Servicio para módulo SEO`
   - Click **"Crear y continuar"**
4. En **"Conceder acceso a este proyecto a usuarios"**: **Déjalo vacío** y click **"Continuar"**
5. En **"Permitir que los usuarios accedan a esta cuenta de servicio"**: **Déjalo vacío** y click **"Listo"**

### 1.4. Crear Clave JSON

1. En la lista de cuentas de servicio, busca la que acabas de crear (`seo-service`)
2. Click en el email de la cuenta (algo como `seo-service@tu-proyecto.iam.gserviceaccount.com`)
3. Ve a la pestaña **"Claves"**
4. Click en **"Agregar clave" > "Crear nueva clave"**
5. Selecciona **JSON** y click **"Crear"**
6. Se descargará un archivo JSON automáticamente
7. **⚠️ IMPORTANTE**: Guarda este archivo de forma segura. Contiene credenciales sensibles.

### 1.5. Compartir propiedad en Google Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console/)
2. Si no has añadido tu propiedad:
   - Click en **"Agregar propiedad"**
   - Ingresa tu dominio: `https://www.velasegalaviladecans.com` (o el que uses)
   - Verifica la propiedad (usando el método que prefieras)
3. Una vez en tu propiedad:
   - Ve a **"Configuración" > "Usuarios y permisos"**
   - Click en **"Agregar usuario"**
   - Pega el **email de la cuenta de servicio** (del paso 1.3, algo como `seo-service@...`)
   - Selecciona permiso: **"Propietario"** (o "Usuario completo" si prefieres)
   - Click **"Agregar"**

### 1.6. Configurar Variable de Entorno

1. Abre el archivo JSON descargado en el paso 1.4
2. **Copia TODO el contenido** del JSON (desde `{` hasta `}`)
3. En **Railway** (o tu plataforma de hosting):
   - Ve a tu proyecto
   - **Variables** (o **Environment Variables**)
   - Añade nueva variable:
     - **Nombre**: `GOOGLE_SEARCH_CONSOLE_CREDENTIALS`
     - **Valor**: Pega todo el JSON (como una sola línea, sin saltos)
     - Click **"Add"** / **"Guardar"**

**Ejemplo del valor** (aunque el tuyo será diferente):
```
{"type":"service_account","project_id":"tu-proyecto","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"seo-service@tu-proyecto.iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
```

---

## 🟡 PASO 2: DataForSEO API (OPCIONAL pero recomendado)

Esta API proporciona **volumen de búsqueda mensual** de keywords. Sin esto, el módulo funcionará pero no mostrará datos de volumen.

### 2.1. Crear Cuenta en DataForSEO

1. Ve a [DataForSEO.com](https://dataforseo.com/)
2. Click en **"Sign Up"** o **"Registrarse"**
3. Completa el formulario
4. Verifica tu email

### 2.2. Obtener Credenciales API

1. Una vez logueado, ve a **"API"** en el menú
2. Busca la sección **"Authentication"** o **"API Credentials"**
3. Ahí verás:
   - **API Login** (tu email o un ID)
   - **API Password** (genera uno si no lo tienes)
4. **Copia ambos valores**

### 2.3. Plan y Créditos

- DataForSEO usa un sistema de créditos
- Para keywords, cada consulta cuesta ~0.01 créditos
- Puedes empezar con un plan gratuito o de pago mínimo
- **Alternativa gratuita**: Puedes dejar `SEO_VOLUME_PROVIDER=none` y el módulo funcionará sin volúmenes

### 2.4. Configurar Variables de Entorno

En **Railway**:
1. Añade estas variables:
   - **Nombre**: `SEO_VOLUME_PROVIDER`
   - **Valor**: `dataforseo`
2. Añade:
   - **Nombre**: `DATAFORSEO_API_KEY`
   - **Valor**: El **API Login** del paso 2.2
3. Añade:
   - **Nombre**: `DATAFORSEO_API_SECRET`
   - **Valor**: El **API Password** del paso 2.2

---

## 🟢 PASO 3: Base de Datos (Migraciones)

### 3.1. Verificar que las migraciones están aplicadas

El módulo SEO requiere estas tablas en la base de datos:
- `SeoSite`
- `SeoKeyword`
- `SeoKeywordRankDaily`
- `SeoKeywordVolumeMonthly`
- `SeoIssue`
- `SeoRecommendation`

### 3.2. Si no están aplicadas:

```bash
cd backend
npx prisma migrate deploy
npx prisma generate
```

O en producción (Railway), las migraciones deberían ejecutarse automáticamente con el script `start.sh`.

---

## 📝 PASO 4: Crear Primer Sitio en el Dashboard

Una vez configurado todo, necesitas crear un "sitio" en el módulo SEO.

### Opción A: Desde el Dashboard (Recomendado)

1. Ve a `/admin/seo` en tu dashboard
2. Si no hay sitios, verás un formulario
3. Completa:
   - **Dominio**: `www.velasegalaviladecans.com` (sin https://)
   - **GSC Property**: `https://www.velasegalaviladecans.com` (con https://) - **Debe coincidir exactamente** con la propiedad en Google Search Console
   - **País por defecto**: `ES` (España)
4. Click en **"Crear Sitio"**

### Opción B: Desde la API

```bash
POST /api/seo/sites
Authorization: Bearer TU_TOKEN_JWT
Content-Type: application/json

{
  "domain": "www.velasegalaviladecans.com",
  "gscProperty": "https://www.velasegalaviladecans.com",
  "countryDefault": "ES"
}
```

---

## 🚀 PASO 5: Primera Sincronización

### 5.1. Sincronización Manual

1. Ve a `/admin/seo` en el dashboard
2. Selecciona tu sitio del dropdown (si tienes varios)
3. Click en **"Sincronizar Ahora"** (botón manual)
4. Espera 1-2 minutos mientras se ejecuta

### 5.2. ¿Qué hace la sincronización?

1. **Descarga datos de Google Search Console** (últimos 3 días)
2. **Crea keywords** automáticamente si no existen
3. **Guarda rankings diarios** (posición, clicks, impressions, CTR)
4. **Actualiza volúmenes** de keywords nuevas (si tienes DataForSEO configurado)
5. **Ejecuta auditoría técnica** (sitemap, robots.txt, páginas principales)
6. **Genera recomendaciones** automáticas

### 5.3. Verificar que funciona

Después de sincronizar:
- Ve a la pestaña **"Keywords"** - Deberías ver keywords con datos
- Ve a **"Overview"** - Deberías ver KPIs (clicks, impressions, etc.)
- Ve a **"Technical"** - Deberías ver issues detectados

---

## ⏰ Sincronización Automática

El módulo ejecuta una sincronización automática **diaria a las 2:00 AM UTC** que hace lo mismo que la manual.

---

## 📊 Resumen de Variables de Entorno

Añade estas variables en **Railway** (o tu hosting):

```bash
# ===== OBLIGATORIO =====
GOOGLE_SEARCH_CONSOLE_CREDENTIALS='{"type":"service_account",...}'  # JSON completo del paso 1.6

# ===== OPCIONAL (para volúmenes) =====
SEO_VOLUME_PROVIDER=dataforseo  # o "none" si no quieres volúmenes
DATAFORSEO_API_KEY=tu_email_o_login
DATAFORSEO_API_SECRET=tu_password
```

---

## ❓ FAQ y Troubleshooting

### ¿Por qué no veo datos después de sincronizar?

1. **Verifica que el `gscProperty` coincida exactamente** con la URL en Google Search Console
   - Debe ser exactamente igual (incluye https://)
2. **Verifica que la cuenta de servicio tenga acceso** a la propiedad GSC
3. **Google Search Console tiene retraso de 1-2 días** - Los datos más recientes pueden no estar disponibles
4. **Ejecuta sincronización manual** y revisa los logs del backend

### ¿Cómo veo los logs del backend?

En Railway:
- Ve a tu servicio backend
- Click en **"Deployments"** > Último deployment
- Revisa los logs de la aplicación

### ¿Cuánto cuesta DataForSEO?

- Plan gratuito: ~1000 créditos (suficiente para probar)
- Plan básico: Desde $49/mes (suficiente para sitios pequeños)
- Puedes usar el módulo sin DataForSEO, solo no verás volúmenes de búsqueda

### ¿Puedo usar otro proveedor de volúmenes?

Actualmente solo está implementado **DataForSEO**. Puedes:
- Dejar `SEO_VOLUME_PROVIDER=none` y no usar volúmenes
- O añadir manualmente volúmenes desde el dashboard (si implementamos esa funcionalidad)

### ¿Cuánto tarda la primera sincronización?

- **Primera vez**: 2-5 minutos (muchos datos)
- **Sincronizaciones siguientes**: 30 segundos - 2 minutos

### ¿Necesito Google Analytics?

**No**, el módulo SEO es independiente de Google Analytics. Solo necesitas **Google Search Console**.

---

## ✅ Checklist Final

Antes de considerar que todo está configurado:

- [ ] Google Search Console API habilitada
- [ ] Cuenta de servicio creada con clave JSON
- [ ] Propiedad GSC compartida con la cuenta de servicio
- [ ] Variable `GOOGLE_SEARCH_CONSOLE_CREDENTIALS` configurada en Railway
- [ ] (Opcional) DataForSEO configurado con variables de entorno
- [ ] Base de datos migrada
- [ ] Sitio creado en `/admin/seo`
- [ ] Primera sincronización ejecutada
- [ ] Datos visibles en el dashboard

---

## 🆘 ¿Necesitas Ayuda?

Si algo no funciona:
1. Revisa los logs del backend
2. Verifica que todas las variables de entorno estén configuradas
3. Verifica que el `gscProperty` coincida exactamente con GSC
4. Espera 1-2 días si acabas de configurar GSC (datos nuevos)

---

¡Listo! Con estos pasos deberías tener el módulo SEO funcionando completamente. 🎉

