# 🔍 Configuración de SerpAPI para Análisis Real de Competidores

Este documento explica cómo configurar SerpAPI para obtener datos SEO reales de competidores.

## ¿Qué es SerpAPI?

SerpAPI es un servicio que permite realizar búsquedas en Google (y otros motores) programáticamente y obtener resultados estructurados, incluyendo posiciones reales de dominios en SERPs.

## 📝 Por qué SerpAPI

1. **Datos Reales**: Obtiene posiciones reales de Google, no estimaciones
2. **Fácil de usar**: API REST simple y bien documentada
3. **Sin scraping**: Cumple con los términos de servicio de Google
4. **Datos estructurados**: Retorna JSON con toda la información necesaria
5. **Múltiples ubicaciones**: Permite buscar en diferentes localizaciones (Viladecans, Barcelona, etc.)

## 🚀 Pasos para Configurar

### Paso 1: Crear cuenta en SerpAPI

1. Ve a [serpapi.com](https://serpapi.com/)
2. Crea una cuenta (tiene plan gratuito con 100 búsquedas/mes)
3. Ve a tu dashboard y copia tu API Key

### Paso 2: Añadir API Key en Railway

1. Ve a Railway → Tu proyecto → Variables de Entorno
2. Añade la variable:
   ```
   SERPAPI_API_KEY=tu-api-key-aqui
   ```
3. Guarda y redeploya el servicio

### Paso 3: Verificar que funciona

Una vez configurado, cuando hagas clic en "Analizar" en un competidor:

1. El sistema buscará keywords reales en Google
2. Encontrará en qué posiciones aparece el dominio del competidor
3. Guardará esas keywords con sus posiciones reales
4. Opcionalmente obtendrá volúmenes de búsqueda

## 💰 Precios

- **Plan Gratuito**: 100 búsquedas/mes (suficiente para probar)
- **Plan Hobby**: $50/mes - 5,000 búsquedas/mes
- **Plan Startup**: $250/mes - 50,000 búsquedas/mes

**Nota**: Para analizar 11 competidores con ~20 keywords cada uno, necesitarás ~220 búsquedas/mes. El plan gratuito te permite analizar ~4-5 competidores al mes.

## 🔄 Flujo de Análisis

1. **Usuario hace clic en "Analizar"** en un competidor
2. **Sistema genera keywords base** relevantes para el nicho dental (ej: "dentista viladecans", "implantes dentales viladecans")
3. **Para cada keyword, busca en Google** usando SerpAPI
4. **Filtra resultados** para encontrar solo los del dominio del competidor
5. **Guarda keywords encontradas** con:
   - Keyword exacta
   - Posición real en Google
   - URL que posiciona
   - Título del resultado
6. **Obtiene volúmenes** (si está configurado DataForSEO o similar)
7. **Analiza buenas prácticas** del competidor

## ⚠️ Sin API Key (Modo Fallback)

Si no configuras `SERPAPI_API_KEY`:

- El sistema usará **scraping básico** como alternativa
- Solo analizará el contenido HTML del sitio
- **NO obtendrá posiciones reales** de Google
- Los resultados serán menos precisos

Verás un mensaje de advertencia en los logs:
```
⚠️ SERPAPI_API_KEY no configurada. Usando método de análisis alternativo (scraping).
```

## 📊 Keywords que se Buscan

El sistema busca automáticamente estas keywords para cada competidor:

- `dentista viladecans`
- `clínica dental viladecans`
- `implantes dentales viladecans`
- `ortodoncia viladecans`
- `estética dental viladecans`
- `blanqueamiento dental viladecans`
- `endodoncia viladecans`
- `periodoncia viladecans`
- `cirugía oral viladecans`
- `odontopediatría viladecans`
- `bruxismo viladecans`
- `prótesis dental viladecans`
- `dentista barcelona`
- `clínica dental barcelona`
- `implantes dentales barcelona`
- `ortodoncia invisible viladecans`
- `invisalign viladecans`
- `carillas dentales viladecans`
- `dentista cerca de viladecans`
- `mejor dentista viladecans`

## 🔍 Ejemplo de Resultado

Después de analizar un competidor, verás:

```json
{
  "competitorId": "xxx",
  "domain": "clinicadentalbaldrich.es",
  "keywordsFound": 15,
  "keywordsSaved": 15,
  "keywordsSkipped": 0,
  "method": "serpapi"
}
```

Y en la base de datos tendrás keywords reales como:

- `"dentista viladecans"` - Posición: 3 - URL: `https://www.clinicadentalbaldrich.es/`
- `"implantes dentales viladecans"` - Posición: 5 - URL: `https://www.clinicadentalbaldrich.es/implantes`
- etc.

## 🚨 Límites y Rate Limiting

- SerpAPI tiene límites de rate (según tu plan)
- El código incluye pausas de 1 segundo entre búsquedas
- Si excedes el límite, verás error 429
- En ese caso, espera unos minutos y vuelve a intentar

## ✅ Verificación

Para verificar que está funcionando:

1. Configura `SERPAPI_API_KEY` en Railway
2. Ve al dashboard SEO → Competencia
3. Haz clic en "Analizar" en cualquier competidor
4. Espera 1-2 minutos (depende de cuántas keywords)
5. Verás el número de keywords encontradas en lugar de "0 keywords"
6. Las keywords aparecerán en la tabla con posiciones reales

## 🔗 Referencias

- [SerpAPI Documentation](https://serpapi.com/search-api)
- [SerpAPI Pricing](https://serpapi.com/pricing)
- [Google Search API](https://serpapi.com/google-search-api)

