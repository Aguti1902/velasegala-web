# 📊 Guía Completa: Google Analytics y Google Search Console

Esta guía te ayudará a configurar Google Analytics 4 (GA4) y Google Search Console para tu sitio web de la Clínica Dental Vela-Segalà.

---

## 📈 Parte 1: Configurar Google Analytics 4

### Paso 1: Crear una propiedad de Google Analytics

1. **Ve a Google Analytics:**
   - Abre https://analytics.google.com
   - Inicia sesión con tu cuenta de Google (o crea una nueva)

2. **Crear una cuenta:**
   - Si es tu primera vez, haz clic en "Comenzar a medir"
   - Nombre de cuenta: `Clínica Vela-Segalà` (o el nombre que prefieras)
   - Acepta los términos y condiciones

3. **Crear una propiedad:**
   - Nombre de propiedad: `Clínica Vela-Segalà Web`
   - Zona horaria: `Madrid (GMT+01:00)`
   - Moneda: `Euro (€)`

4. **Configurar flujo de datos:**
   - Tipo de plataforma: **Web**
   - URL del sitio web: `https://www.velasegalaviladecans.com` (o tu dominio)
   - Nombre del flujo: `Clínica Vela-Segalà Website`

5. **Copiar el Measurement ID:**
   - Una vez creado, verás un código que empieza con `G-XXXXXXXXXX`
   - **Copia este código**, lo necesitarás en el siguiente paso
   - Ejemplo: `G-ABC123XYZ789`

### Paso 2: Configurar la variable de entorno en Vercel

1. **Ve a tu proyecto en Vercel:**
   - https://vercel.com/dashboard
   - Selecciona tu proyecto `velasegala-web-emc8` (o el que corresponda)

2. **Añadir variable de entorno:**
   - Ve a **Settings** → **Environment Variables**
   - Haz clic en **"Add New"**
   - Añade:
     ```
     Name: NEXT_PUBLIC_GA_MEASUREMENT_ID
     Value: G-XXXXXXXXXX  (tu Measurement ID del paso anterior)
     Environment: Production, Preview, Development (marca todas)
     ```
   - Haz clic en **"Save"**

3. **Redeploy:**
   - Ve a **Deployments**
   - Haz clic en los tres puntos (⋯) del último deployment
   - Selecciona **"Redeploy"**
   - Espera a que se complete el despliegue

### Paso 3: Verificar que funciona

1. **Visita tu sitio web**
2. **Ve a Google Analytics:**
   - En el menú lateral, ve a **"Reports"** → **"Realtime"**
   - Deberías ver tu visita en tiempo real (puede tardar unos minutos)

---

## 🔍 Parte 2: Configurar Google Search Console

### Paso 1: Añadir tu sitio web

1. **Ve a Google Search Console:**
   - Abre https://search.google.com/search-console
   - Inicia sesión con la misma cuenta de Google que usaste para Analytics

2. **Añadir propiedad:**
   - Haz clic en el selector de propiedad (arriba a la izquierda)
   - Haz clic en **"Añadir propiedad"**
   - Elige **"Prefijo de URL"**
   - Introduce tu URL: `https://www.velasegalaviladecans.com`
   - Haz clic en **"Continuar"**

### Paso 2: Verificar la propiedad

Google Search Console necesita verificar que eres el propietario del sitio. Hay varios métodos. Te mostramos los más fáciles:

#### Método 1: Meta tag (Recomendado - Ya implementado en el código)

1. **Elegir método de verificación:**
   - En la página de verificación, selecciona **"Etiqueta HTML"**
   - Google te mostrará un código como:
     ```html
     <meta name="google-site-verification" content="abc123xyz789..." />
     ```

2. **Copiar el código de verificación:**
   - Solo necesitas la parte del `content`, por ejemplo: `abc123xyz789...`

3. **Añadir variable de entorno en Vercel:**
   - Ve a **Settings** → **Environment Variables** en Vercel
   - Añade:
     ```
     Name: NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
     Value: abc123xyz789...  (el código que copiaste, SIN las comillas)
     Environment: Production, Preview, Development
     ```
   - Haz clic en **"Save"**

4. **Redeploy en Vercel:**
   - Ve a **Deployments** → **Redeploy**
   - Espera a que se complete

5. **Verificar en Search Console:**
   - Vuelve a Google Search Console
   - Haz clic en **"Verificar"**
   - Si todo está correcto, verás un mensaje de éxito ✅

#### Método 2: Archivo HTML (Alternativo)

Si el método 1 no funciona:

1. En Google Search Console, selecciona **"Archivo HTML"**
2. Descarga el archivo HTML que te proporciona
3. Súbelo a la carpeta `public/` de tu proyecto frontend
4. Haz commit y push:
   ```bash
   git add public/google*.html
   git commit -m "Añadir archivo de verificación de Google Search Console"
   git push
   ```
5. Espera al despliegue automático
6. Vuelve a Search Console y haz clic en **"Verificar"**

### Paso 3: Enviar el sitemap

Una vez verificado el sitio:

1. **En Google Search Console:**
   - Ve a **"Sitemaps"** en el menú lateral
   - En "Añadir un sitemap nuevo", escribe: `sitemap.xml`
   - Haz clic en **"Enviar"**

2. **Verificar:**
   - El sitemap debería aparecer como "Enviado correctamente"
   - Google comenzará a indexar tus páginas (puede tardar días/semanas)

---

## 📋 Resumen de Variables de Entorno

Asegúrate de tener estas variables configuradas en **Vercel**:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console (verificación)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123xyz789...
```

---

## ✅ Verificación Final

### Google Analytics:
- [ ] Propiedad creada en Google Analytics
- [ ] Measurement ID obtenido (G-XXXXXXXXXX)
- [ ] Variable `NEXT_PUBLIC_GA_MEASUREMENT_ID` configurada en Vercel
- [ ] Redeploy completado
- [ ] Visitas apareciendo en "Realtime" de Google Analytics

### Google Search Console:
- [ ] Propiedad añadida en Search Console
- [ ] Sitio verificado correctamente
- [ ] Variable `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` configurada (si usaste meta tag)
- [ ] Sitemap enviado y procesado
- [ ] Páginas apareciendo en "Índice" → "Páginas"

---

## 🔧 Troubleshooting

### Google Analytics no funciona:

1. **Verifica la variable de entorno:**
   - Asegúrate de que `NEXT_PUBLIC_GA_MEASUREMENT_ID` está en Vercel
   - Verifica que el ID empiece con `G-`
   - Asegúrate de hacer redeploy después de añadir la variable

2. **Verifica en el navegador:**
   - Abre DevTools (F12)
   - Ve a la pestaña "Network"
   - Busca llamadas a `google-analytics.com` o `googletagmanager.com`
   - Si no aparecen, el script no se está cargando

3. **Verifica el código:**
   - Abre el código fuente de tu página (Ctrl+U)
   - Busca `gtag` o `G-`
   - Deberías ver el código de Google Analytics

### Google Search Console no verifica:

1. **Verifica el meta tag:**
   - Abre el código fuente de tu página (Ctrl+U)
   - Busca `google-site-verification`
   - Deberías ver el meta tag con tu código

2. **Si usas archivo HTML:**
   - Verifica que el archivo está en `/public/`
   - Accede a `https://tudominio.com/google*.html` en el navegador
   - Deberías ver el contenido del archivo

3. **Espera:**
   - A veces Google tarda unos minutos en verificar
   - Asegúrate de que el sitio está desplegado y accesible

### El sitemap no se procesa:

1. **Verifica que el sitemap existe:**
   - Accede a `https://tudominio.com/sitemap.xml`
   - Deberías ver un XML con todas tus páginas

2. **Verifica que está en robots.txt:**
   - Accede a `https://tudominio.com/robots.txt`
   - Debería mencionar `sitemap.xml`

3. **Espera:**
   - Google puede tardar días en procesar el sitemap
   - Revisa en Search Console en "Sitemaps" para ver el estado

---

## 📚 Recursos Adicionales

- [Google Analytics Help](https://support.google.com/analytics)
- [Google Search Console Help](https://support.google.com/webmasters)
- [Next.js Script Component](https://nextjs.org/docs/pages/building-your-application/optimizing/scripts)

---

## 🎯 Próximos Pasos

Una vez configurado todo:

1. **Monitorea tus datos:**
   - Revisa Google Analytics regularmente para ver el tráfico
   - Usa Google Search Console para ver qué términos de búsqueda te traen visitas

2. **Optimiza tu SEO:**
   - Revisa las "Coberturas" en Search Console
   - Corrige errores de indexación si aparecen
   - Mejora el contenido basándote en las palabras clave que te traen tráfico

3. **Configura alertas:**
   - En Search Console, configura alertas por email para errores importantes
   - En Analytics, configura informes personalizados

---

**¡Listo!** Tu sitio ahora está conectado a Google Analytics y Google Search Console. 🎉

