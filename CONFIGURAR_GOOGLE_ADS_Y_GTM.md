# 🎯 Guía Completa: Google Ads + Google Tag Manager para Vela Segalà

## 📋 Índice
1. [Configurar Google Tag Manager (GTM)](#1-configurar-google-tag-manager)
2. [Instalar GTM en la web](#2-instalar-gtm-en-la-web)
3. [Configurar Google Ads](#3-configurar-google-ads)
4. [Configurar conversiones](#4-configurar-conversiones)
5. [Verificar que todo funciona](#5-verificar-que-todo-funciona)

---

## 1. Configurar Google Tag Manager

### Paso 1.1: Crear cuenta de GTM
1. Ve a https://tagmanager.google.com/
2. Haz clic en **"Crear cuenta"**
3. Rellena:
   - **Nombre de la cuenta**: "Vela Segalà"
   - **País**: España
   - **Compartir datos**: (a tu elección)
4. Configurar contenedor:
   - **Nombre del contenedor**: "velasegala.com" (o tu dominio)
   - **Plataforma de destino**: **Web**
5. Acepta los términos de servicio
6. **Guarda el código que aparece** (lo usaremos en el paso 2)

### Paso 1.2: Anotar ID del contenedor
- Verás un ID como: **GTM-XXXXXXX**
- Anótalo, lo necesitarás para la web

---

## 2. Instalar GTM en la web

### Opción A: Instalación manual en Next.js

#### 2.1 Crear componente de Google Tag Manager

**Archivo:** `frontend/components/GoogleTagManager.tsx`

```typescript
"use client";

import Script from "next/script";

export function GoogleTagManager({ gtmId }: { gtmId: string }) {
  return (
    <>
      {/* Google Tag Manager - Script en <head> */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
    </>
  );
}

export function GoogleTagManagerNoScript({ gtmId }: { gtmId: string }) {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
```

#### 2.2 Añadir GTM al layout principal

**Archivo:** `frontend/app/layout.tsx`

Añade al principio del `<body>`:

```typescript
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/GoogleTagManager";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX"; // Reemplaza con tu ID

  return (
    <html lang="es">
      <head>
        <GoogleTagManager gtmId={GTM_ID} />
      </head>
      <body>
        <GoogleTagManagerNoScript gtmId={GTM_ID} />
        {children}
      </body>
    </html>
  );
}
```

#### 2.3 Añadir variable de entorno

**Archivo:** `frontend/.env.local`

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**Archivo:** `frontend/.env.production` (para Vercel)

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Y en **Vercel Dashboard**:
- Settings → Environment Variables
- Añadir: `NEXT_PUBLIC_GTM_ID` = `GTM-XXXXXXX`

---

## 3. Configurar Google Ads

### Paso 3.1: Vincular Google Ads con GTM

1. Ve a tu cuenta de **Google Ads** (https://ads.google.com)
2. Haz clic en **Herramientas y configuración** (icono de llave inglesa)
3. En "Medición", haz clic en **Conversiones**
4. Haz clic en **+ Nueva conversión**
5. Selecciona **Sitio web**
6. Configura la conversión:
   - **Categoría**: "Envío de formulario" (o la que corresponda)
   - **Nombre de conversión**: "Formulario de contacto"
   - **Valor**: Puedes asignar un valor estimado (ej: 50€) o "Sin valor"
   - **Recuento**: "Una" (contar solo una conversión por clic)
   - **Período de conversión**: 30 días
7. En **Configuración de etiquetas**, selecciona:
   - ✅ **"Usar Google Tag Manager"**
8. **Guarda el ID de conversión**: AW-XXXXXXXXXX
9. **Guarda la etiqueta de conversión**: ej. "submit_lead_form"

### Paso 3.2: Configurar etiqueta en GTM

1. Ve a https://tagmanager.google.com/
2. Selecciona tu contenedor
3. Haz clic en **Etiquetas** → **Nueva**
4. Configuración de etiqueta:
   - **Tipo**: "Google Ads: Conversión"
   - **ID de conversión**: AW-XXXXXXXXXX (el que guardaste)
   - **Etiqueta de conversión**: submit_lead_form
5. Configuración de activación:
   - Crea un nuevo activador
   - **Tipo**: "Evento personalizado"
   - **Nombre del evento**: `generate_lead` (lo configuraremos en el código)
6. **Guarda** la etiqueta

---

## 4. Configurar conversiones en la web

### Paso 4.1: Eventos de conversión en formularios

Cuando alguien envíe el formulario de contacto, debes disparar un evento a GTM.

**Ejemplo:** En el formulario de contacto

```typescript
// En tu componente de formulario (ej: ContactForm.tsx)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // ... tu lógica de envío de formulario ...
  
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  
  if (response.ok) {
    // ✅ DISPARAR EVENTO A GOOGLE TAG MANAGER
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'generate_lead',
        lead_type: 'contact_form',
        value: 50, // Valor estimado de la conversión
      });
    }
    
    // Mostrar mensaje de éxito, etc.
    toast.success('Formulario enviado correctamente');
  }
};
```

### Paso 4.2: Eventos adicionales recomendados

```typescript
// Clic en botón de WhatsApp
const handleWhatsAppClick = () => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'whatsapp_click',
      contact_method: 'whatsapp',
    });
  }
  window.open('https://wa.me/34XXXXXXXXX', '_blank');
};

// Clic en teléfono
const handlePhoneClick = () => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'phone_click',
      contact_method: 'phone',
    });
  }
};

// Solicitud de cita (alta prioridad)
const handleAppointmentRequest = async () => {
  // ... lógica de solicitud de cita ...
  
  if (success) {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'generate_lead',
        lead_type: 'appointment_request',
        value: 100, // Valor más alto porque es una cita
      });
    }
  }
};
```

### Paso 4.3: Configurar etiquetas en GTM para cada evento

Para **cada evento** que quieras trackear, crea una etiqueta en GTM:

1. **Etiquetas** → **Nueva**
2. **Tipo**: "Google Ads: Conversión"
3. **ID de conversión**: AW-XXXXXXXXXX
4. **Etiqueta de conversión**: (crea una específica para cada tipo)
5. **Activador**: Evento personalizado con el nombre del evento

Ejemplo de eventos a configurar:
- `generate_lead` → Conversión principal
- `whatsapp_click` → Evento de interacción
- `phone_click` → Evento de interacción
- `page_view` → Vista de página clave (ej: servicios)

---

## 5. Verificar que todo funciona

### Paso 5.1: Modo de vista previa de GTM

1. En GTM, haz clic en **Vista previa**
2. Introduce la URL de tu web: `https://velasegala.com`
3. Se abrirá tu web con un panel de GTM
4. **Prueba los eventos**:
   - Envía el formulario de contacto
   - Haz clic en botones de WhatsApp/teléfono
   - Verifica que los eventos aparecen en el panel de GTM

### Paso 5.2: Verificar en Google Ads

1. Ve a **Google Ads** → **Herramientas** → **Conversiones**
2. Busca tu conversión configurada
3. Verás si hay conversiones registradas (puede tardar hasta 24h)

### Paso 5.3: Usar Google Tag Assistant

1. Instala la extensión: [Google Tag Assistant](https://chrome.google.com/webstore/detail/google-tag-assistant/ehbpddoifoobpndpdfnkdfpgflcfjkph)
2. Abre tu web
3. Haz clic en el icono de Tag Assistant
4. Verifica que aparece:
   - ✅ Google Tag Manager
   - ✅ Google Ads Conversion Tracking

---

## 6. Publicar cambios en GTM

**⚠️ IMPORTANTE**: Los cambios en GTM **NO están activos** hasta que publiques.

1. En GTM, haz clic en **Enviar** (arriba a la derecha)
2. Añade un nombre de versión: "Configuración inicial Google Ads"
3. Descripción: "Conversiones de formularios y clics"
4. Haz clic en **Publicar**

---

## 7. Configurar campaña en Google Ads (opcional)

### Paso 7.1: Crear campaña de búsqueda

1. **Objetivo**: Clientes potenciales
2. **Tipo de campaña**: Red de búsqueda
3. **Configuración**:
   - **Ubicaciones**: Viladecans, Barcelona (radio 10-20km)
   - **Idiomas**: Español, Catalán
   - **Presupuesto**: Según tu presupuesto (ej: 10-30€/día)
   - **Estrategia de puja**: Conversiones o Clics
4. **Grupos de anuncios**:
   - Dentista Viladecans
   - Implantes dentales Viladecans
   - Ortodoncia Viladecans
   - Estética dental Viladecans
   - Blanqueamiento dental Viladecans
5. **Palabras clave**:
   - [dentista viladecans]
   - [clinica dental viladecans]
   - [implantes dentales viladecans]
   - +dentista +viladecans
   - "dentista cerca de mi" (si aplica)

### Paso 7.2: Extensiones de anuncios

Añade:
- ✅ **Extensiones de enlaces de sitio**: Servicios, Equipo, Contacto
- ✅ **Extensión de llamada**: Teléfono de la clínica
- ✅ **Extensión de ubicación**: Dirección de Viladecans
- ✅ **Extensiones de texto destacado**: Años de experiencia, tecnología, etc.

---

## 8. Tracking adicional (opcional pero recomendado)

### Google Analytics 4 (GA4)

Si también quieres Analytics:

1. Crea una propiedad GA4 en https://analytics.google.com
2. Anota el **Measurement ID**: G-XXXXXXXXXX
3. En GTM, crea una etiqueta de tipo "Google Analytics: GA4 Configuration"
4. Introduce el Measurement ID
5. Activa en "All Pages"

### Remarketing

Para hacer remarketing (mostrar anuncios a visitantes previos):

1. En Google Ads → **Herramientas** → **Biblioteca compartida** → **Públicos**
2. Crea un público:
   - "Visitantes del sitio web"
   - Duración: 30-90 días
3. Usa este público en tus campañas de Display

---

## ✅ Checklist final

- [ ] GTM instalado en la web (frontend)
- [ ] Variable de entorno `NEXT_PUBLIC_GTM_ID` configurada
- [ ] Etiqueta de Google Ads Conversión creada en GTM
- [ ] Eventos `generate_lead` implementados en formularios
- [ ] Vista previa de GTM verificada
- [ ] Versión de GTM publicada
- [ ] Conversión visible en Google Ads
- [ ] Campaña de Google Ads creada (opcional)
- [ ] Extensions de anuncios configuradas
- [ ] Google Tag Assistant verificado

---

## 🆘 Soporte

Si necesitas ayuda:
- **Google Tag Manager**: https://support.google.com/tagmanager
- **Google Ads**: https://support.google.com/google-ads
- **Soporte de Google**: 900 814 542 (España)

---

## 📊 KPIs a monitorizar

Una vez configurado, monitoriza:
- **CTR (Click-Through Rate)**: % de clics en anuncios
- **Coste por conversión**: €/conversión
- **Tasa de conversión**: % de visitantes que convierten
- **ROI**: Retorno de inversión
- **Calidad del anuncio**: Puntuación de calidad (1-10)

**Meta realista inicial**:
- CTR: >3%
- Coste por conversión: <50€ (depende del sector)
- Tasa de conversión web: >2%

---

¡Buena suerte con las campañas! 🚀

