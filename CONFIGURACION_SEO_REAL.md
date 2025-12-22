# 🎯 Configuración para SEO Real y Funcional

Este documento explica cómo configurar el módulo SEO para obtener **datos reales** de Google y competidores.

## ⚠️ IMPORTANTE: Sin APIs configuradas = Sin datos reales

El módulo SEO está diseñado para trabajar con datos reales. Si no configuras las APIs necesarias, verás tablas vacías o datos limitados.

## 🔑 APIs Requeridas

### 1. SerpAPI (OBLIGATORIA para análisis de competidores)

**¿Para qué?**
- Obtener keywords REALES donde los competidores están posicionados en Google
- Conocer las posiciones REALES de cada keyword
- URLs exactas que posicionan para cada keyword

**Cómo obtenerla:**
1. Ve a [serpapi.com](https://serpapi.com/)
2. Crea cuenta (plan gratuito: 100 búsquedas/mes)
3. Copia tu API Key del dashboard

**Configurar en Railway:**
```
SERPAPI_API_KEY=tu-api-key-aqui
```

**Sin esta API:**
- El análisis de competidores usará scraping básico (menos preciso)
- No obtendrás posiciones reales de Google
- Solo verás keywords extraídas del HTML del sitio

### 2. Google Search Console API (OBLIGATORIA para tus datos)

**¿Para qué?**
- Obtener keywords por las que TU sitio está posicionando
- Posiciones, clicks, impresiones REALES de tu dominio
- Datos históricos de ranking

**Cómo configurar:**
Ver `GOOGLE_ANALYTICS_API_SETUP.md` y `CONFIGURAR_ANALYTICS_RAILWAY.md`

**Variable en Railway:**
```
GOOGLE_SEARCH_CONSOLE_CREDENTIALS={"type":"service_account",...}
GOOGLE_SEARCH_CONSOLE_PROPERTY_ID=https://www.velasegalaviladecans.com
```

**Sin esta API:**
- No verás tus keywords en el dashboard
- No habrá comparativa real con competidores
- No tendrás datos de clicks/impresiones

### 3. DataForSEO (OPCIONAL para volúmenes de búsqueda)

**¿Para qué?**
- Obtener volúmenes mensuales de búsqueda de keywords
- Competencia estimada
- CPC estimado

**Cómo obtenerla:**
1. Ve a [dataforseo.com](https://dataforseo.com/)
2. Crea cuenta
3. Obtén API Key y Login

**Configurar en Railway:**
```
KEYWORD_VOLUME_PROVIDER=dataforseo
DATA_FOR_SEO_API_KEY=tu-api-key
DATA_FOR_SEO_LOGIN=tu-login
```

**Sin esta API:**
- Los volúmenes aparecerán como "N/A"
- No podrás priorizar keywords por volumen
- Las recomendaciones serán menos precisas

## 🔄 Flujo de Datos Real

### 1. Análisis de Competidores (con SerpAPI)

Cuando haces clic en "Analizar" en un competidor:

1. **Sistema genera keywords base** relevantes (ej: "dentista viladecans", "implantes dentales viladecans")
2. **Para cada keyword, busca en Google** usando SerpAPI
3. **Filtra resultados** para encontrar solo URLs del dominio del competidor
4. **Guarda en BD:**
   - Keyword exacta
   - Posición REAL en Google (1-100)
   - URL que posiciona
   - Título del resultado
5. **Obtiene volumen** (si DataForSEO está configurado)
6. **Analiza buenas prácticas** SEO de la página principal

**Resultado esperado:** 10-50 keywords reales con posiciones reales

### 2. Comparativa con Tu Dominio

Cuando ves la pestaña "Comparativa":

1. **Obtiene tus keywords** de Google Search Console (si está configurado)
2. **Compara con keywords de competidores** (guardadas previamente)
3. **Identifica oportunidades:**
   - Keywords donde competidores están mejor
   - Keywords que solo tú tienes
   - Keywords donde estás por debajo
4. **Calcula prioridad** basada en:
   - Posición del competidor (top 3 = alta prioridad)
   - Volumen de búsqueda
   - Número de competidores que la usan

**Resultado esperado:** Lista priorizada de oportunidades con recomendaciones concretas

### 3. Buenas Prácticas Detectadas

El sistema analiza automáticamente:

- ✅ Title tag (longitud, keywords)
- ✅ Meta description (longitud, keywords)
- ✅ H1 (cantidad, keywords locales)
- ✅ H2s (estructura)
- ✅ Contenido (palabras, keywords locales)
- ✅ Enlaces internos
- ✅ Schema markup
- ✅ Alt texts en imágenes
- ✅ Datos de contacto (teléfono, dirección)

## 📊 Qué Verás en el Dashboard

### Tab "Competencia"
- Lista de competidores
- Número de keywords encontradas (si SerpAPI está configurado, verás números reales)
- Última fecha de análisis
- Botón "Analizar" para cada competidor

### Tab "Comparativa"
- **Keywords únicas nuestras:** Keywords que solo tú tienes (con posiciones y clicks)
- **Oportunidades:** Keywords donde competidores están mejor (priorizadas)
- **Ventajas nuestras:** Keywords donde estás mejor que competidores

### Tab "Keywords"
- Tus keywords (de Google Search Console si está configurado)
- Posiciones, clicks, impresiones REALES
- Volúmenes de búsqueda (si DataForSEO está configurado)

## ⚠️ Mensajes de Advertencia

Si no configuras las APIs, verás mensajes claros:

- `"⚠️ SERPAPI_API_KEY no configurada. Usando método de análisis alternativo (scraping)."`
- `"Solo 0 keywords encontradas. Revisa configuración de API."`
- `"No hay datos. Configura Google Search Console API."`

## ✅ Checklist de Configuración

Antes de usar el módulo SEO, verifica:

- [ ] `SERPAPI_API_KEY` configurada en Railway
- [ ] `GOOGLE_SEARCH_CONSOLE_CREDENTIALS` configurada en Railway
- [ ] `GOOGLE_SEARCH_CONSOLE_PROPERTY_ID` configurado
- [ ] (Opcional) `DATA_FOR_SEO_API_KEY` y `DATA_FOR_SEO_LOGIN` configurados
- [ ] Has creado un sitio SEO en el dashboard
- [ ] Has importado tus keywords (botón "Sincronizar")
- [ ] Has añadido competidores (botón "Añadir Competidores Predefinidos")
- [ ] Has analizado al menos un competidor (botón "Analizar")

## 🚀 Próximos Pasos

1. **Configura SerpAPI** → Verás keywords reales de competidores
2. **Configura GSC** → Verás tus keywords y posiciones reales
3. **Analiza competidores** → Obtén datos de todos tus competidores
4. **Revisa comparativa** → Encuentra oportunidades concretas
5. **Implementa recomendaciones** → Mejora tu SEO

## 📚 Documentación Relacionada

- `SERPAPI_SETUP.md` - Guía detallada de SerpAPI
- `SEO_MODULE_SETUP.md` - Configuración general del módulo
- `GOOGLE_ANALYTICS_API_SETUP.md` - Configuración de Google APIs
- `CONFIGURAR_ANALYTICS_RAILWAY.md` - Configuración en Railway

## 🔗 Enlaces Útiles

- [SerpAPI Dashboard](https://serpapi.com/dashboard)
- [Google Search Console](https://search.google.com/search-console)
- [DataForSEO Dashboard](https://app.dataforseo.com/)

