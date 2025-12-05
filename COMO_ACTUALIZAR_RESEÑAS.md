# Cómo Actualizar las Reseñas de Google

## ⚠️ IMPORTANTE: Las reseñas actuales son DE EJEMPLO

Las reseñas que ves en la web ahora mismo son **inventadas/de ejemplo**. Necesitas reemplazarlas con las reseñas reales de tu Google My Business.

## 📍 Cómo Obtener las Reseñas Reales

### Opción 1: Manualmente desde Google Maps

1. Ve a tu perfil de Google My Business: https://maps.app.goo.gl/UHo15sKZYEH34pe76
2. Copia cada reseña real:
   - Nombre del autor
   - Número de estrellas
   - Fecha de publicación
   - Texto de la reseña
   - URL de la foto de perfil del usuario

### Opción 2: Usando la API de Google Places (Recomendado)

Para obtener las reseñas automáticamente, necesitas usar la API de Google Places:

1. **Obtener una API Key:**
   - Ve a: https://console.cloud.google.com/
   - Crea un proyecto o selecciona uno existente
   - Habilita "Places API"
   - Genera una API Key

2. **Obtener el Place ID:**
   - Tu Place ID puedes obtenerlo desde Google Maps o usando la API
   - También puedes usar herramientas online: https://developers.google.com/maps/documentation/places/web-service/place-id

3. **Hacer la petición:**
   ```bash
   https://maps.googleapis.com/maps/api/place/details/json?place_id=TU_PLACE_ID&fields=reviews&key=TU_API_KEY
   ```

## 📝 Dónde Actualizar las Reseñas

Edita el archivo: `/frontend/components/reviews/GoogleReviewsCarousel.tsx`

Busca la línea 19 donde está definido el array `GOOGLE_REVIEWS`:

```typescript
const GOOGLE_REVIEWS: Review[] = [
  {
    id: "1",
    author: "Nombre Real del Paciente",
    rating: 5,
    date: "Hace X semanas/meses",
    text: "Texto real de la reseña de Google...",
    photoUrl: "https://lh3.googleusercontent.com/...", // URL real de la foto
  },
  // ... más reseñas
];
```

## 🖼️ Cómo Obtener las URLs de las Fotos

Las fotos de perfil de Google siguen este formato:
```
https://lh3.googleusercontent.com/a/[ID_UNICO]=s120-c-rp-mo-br100
```

Puedes obtenerlas:
1. Desde la respuesta de la API de Google Places
2. Inspeccionando el elemento en Google Maps (Click derecho > Inspeccionar en la foto)
3. Si no tienes la foto, el sistema mostrará automáticamente la inicial del nombre

## 📊 Actualizar el Total de Reseñas

En el mismo archivo, actualiza también el total de reseñas (línea ~131):

```typescript
const averageRating = 5.0; // Tu rating promedio real
const totalReviews = 156;  // Tu número total real de reseñas
```

## 🔄 Alternativa: Widget de Google

Si prefieres no gestionar las reseñas manualmente, puedes usar el widget oficial de Google:

```html
<iframe src="https://www.google.com/maps/embed?pb=..." width="100%" height="500"></iframe>
```

Esto mostrará las reseñas directamente desde Google sin necesidad de actualizarlas manualmente.

## ✅ Recomendaciones

- Actualiza las reseñas mensualmente
- Muestra entre 6-10 reseñas más recientes
- Asegúrate de tener permiso para mostrar las reseñas
- Las reseñas de Google son públicas, pero respeta la privacidad
- Mantén siempre el enlace a tu perfil de Google My Business

## 🔗 Enlaces Útiles

- Tu Google My Business: https://maps.app.goo.gl/UHo15sKZYEH34pe76
- Google Places API: https://developers.google.com/maps/documentation/places/web-service/overview
- Place ID Finder: https://developers.google.com/maps/documentation/places/web-service/place-id

