# Módulo SEO - Guía de Configuración

Este documento explica cómo configurar y usar el módulo SEO completo del dashboard de administración.

## 📋 Características

- **Análisis de Keywords**: Tracking de posiciones, clicks, impressions y CTR
- **Google Search Console Integration**: Sincronización automática de datos
- **Volumen de Búsqueda**: Integración con proveedores de datos de keywords
- **Auditoría Técnica**: Detección automática de problemas SEO
- **Recomendaciones**: Sugerencias priorizadas para mejorar posiciones
- **Oportunidades**: Quick wins y detección de cannibalización
- **Histórico Diario**: Tracking de tendencias a lo largo del tiempo

## 🔧 Configuración Backend

### 1. Instalar Dependencias

```bash
cd backend
npm install
```

### 2. Variables de Entorno

Añade las siguientes variables a tu archivo `.env` o en Railway:

```bash
# Google Search Console API
GOOGLE_SEARCH_CONSOLE_CREDENTIALS='{"type":"service_account",...}'

# Proveedor de Volumen de Keywords (opcional)
SEO_VOLUME_PROVIDER=dataforseo  # o "google_ads", "none"

# DataForSEO (si usas dataforseo)
DATAFORSEO_API_KEY=tu_api_key
DATAFORSEO_API_SECRET=tu_api_secret
```

### 3. Migrar Base de Datos

```bash
cd backend
npx prisma migrate dev --name add_seo_module
npx prisma generate
```

### 4. Configurar Google Search Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto o selecciona uno existente
3. Habilita la API de "Google Search Console API"
4. Crea una cuenta de servicio:
   - Ve a "IAM & Admin" > "Service Accounts"
   - Crea una nueva cuenta de servicio
   - Descarga el JSON de credenciales
5. Comparte tu propiedad de Search Console con el email de la cuenta de servicio
6. Copia el contenido del JSON a `GOOGLE_SEARCH_CONSOLE_CREDENTIALS`

### 5. Crear un Sitio en la Base de Datos

Puedes crear un sitio manualmente o usar la API:

```bash
POST /api/seo/sites
{
  "domain": "www.velasegalaviladecans.com",
  "gscProperty": "https://www.velasegalaviladecans.com",
  "countryDefault": "ES"
}
```

## 🚀 Uso

### Sincronización Automática

El módulo ejecuta una sincronización diaria automáticamente a las 2 AM UTC que:
- Sincroniza datos de Google Search Console (últimos 3 días)
- Actualiza volúmenes de keywords nuevas
- Ejecuta auditoría técnica (semanal)
- Genera recomendaciones

### Sincronización Manual

Puedes ejecutar una sincronización manual desde el dashboard o la API:

```bash
POST /api/seo/sync
{
  "siteId": "site_id_optional"
}
```

## 📊 Estructura de Datos

### Sites
- `domain`: Dominio del sitio
- `gscProperty`: URL de la propiedad en Google Search Console
- `countryDefault`: País por defecto para análisis

### Keywords
- Se crean automáticamente desde Google Search Console
- Puedes añadirlas manualmente también
- Cada keyword tiene: posición, clicks, impressions, CTR, volumen mensual

### Rankings Diarios
- Snapshot diario de cada keyword
- Incluye: posición, clicks, impressions, CTR, URL que rankea
- Agrupado por país y dispositivo

### Issues
- Problemas técnicos detectados automáticamente
- Tipos: technical, content, performance, indexability
- Severidad: critical, high, medium, low

### Recommendations
- Generadas automáticamente basadas en datos
- Priorizadas por impacto y esfuerzo
- Incluyen pasos concretos para implementar

## 🎯 Endpoints API

### Sites
- `GET /api/seo/sites` - Listar sitios
- `GET /api/seo/sites/:id` - Obtener sitio
- `POST /api/seo/sites` - Crear sitio
- `PUT /api/seo/sites/:id` - Actualizar sitio

### Overview
- `GET /api/seo/sites/:siteId/overview?days=28` - KPIs y tendencias

### Keywords
- `GET /api/seo/sites/:siteId/keywords` - Listar keywords con filtros
- `GET /api/seo/keywords/:keywordId/history` - Histórico de una keyword

### Opportunities
- `GET /api/seo/sites/:siteId/opportunities` - Quick wins y cannibalización

### Technical SEO
- `GET /api/seo/sites/:siteId/technical` - Issues técnicos

### Recommendations
- `GET /api/seo/sites/:siteId/recommendations` - Listar recomendaciones
- `PUT /api/seo/recommendations/:id/status` - Actualizar estado

### Sync
- `POST /api/seo/sync` - Sincronización manual

## 🔍 Frontend

El módulo SEO está disponible en `/admin/seo` del dashboard.

### Tabs Disponibles

1. **Overview**: KPIs, gráficas de tendencias, distribución de posiciones
2. **Keywords**: Tabla completa de keywords con filtros y búsqueda
3. **Opportunities**: Quick wins y problemas de cannibalización
4. **Technical**: Checklist y issues técnicos detectados
5. **Recommendations**: Lista priorizada de recomendaciones accionables

## ⚠️ Notas Importantes

1. **Retraso de Google Search Console**: Los datos tienen 1-2 días de retraso
2. **Rate Limits**: Respeta los límites de la API de Google
3. **Volumen de Keywords**: Requiere proveedor externo (DataForSEO, Google Ads, etc.)
4. **Auditoría Técnica**: Se ejecuta semanalmente para no sobrecargar el servidor
5. **Multi-sitio**: El módulo soporta múltiples sitios en el mismo dashboard

## 🐛 Troubleshooting

### No aparecen datos
- Verifica que el sitio tenga `gscProperty` configurado
- Ejecuta una sincronización manual
- Verifica las credenciales de Google Search Console

### Errores de autenticación
- Verifica que el JSON de credenciales esté correcto
- Asegúrate de que la cuenta de servicio tenga acceso a la propiedad GSC

### Volúmenes de keywords vacíos
- Configura un proveedor de volumen (`SEO_VOLUME_PROVIDER`)
- Si usas DataForSEO, verifica las credenciales

## 📝 Próximas Mejoras

- [ ] Integración con Google Ads Keyword Planner
- [ ] Lighthouse integration para Core Web Vitals
- [ ] Exportación de reportes PDF
- [ ] Alertas por email para cambios significativos
- [ ] Comparación entre sitios
- [ ] Análisis de competidores

