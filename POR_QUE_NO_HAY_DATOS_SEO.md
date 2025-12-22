# 📊 ¿Por qué no hay datos en el módulo SEO?

Si ves que las keywords tienen valores "N/A" o "0", es porque faltan datos de diferentes fuentes. Aquí te explico qué necesitas hacer:

## 🔴 Datos que FALTAN y cómo obtenerlos

### 1. **Posiciones, Clicks e Impressions** (Google Search Console)

**Problema:** Las keywords muestran "POSICIÓN: N/A", "CLICKS: 0", "IMPRESSIONS: 0"

**Solución:**
1. **Configura Google Search Console API** (si no lo has hecho):
   - Sigue la guía en `CONFIGURAR_SEO_COMPLETO.md`
   - Necesitas `GOOGLE_SEARCH_CONSOLE_CREDENTIALS` en Railway

2. **Sincroniza con GSC**:
   - Ve a `/admin/seo`
   - Haz clic en **"Sincronizar"**
   - Esto descargará datos de posiciones, clicks e impressions de Google Search Console

**Nota:** Google Search Console tiene un retraso de 1-2 días, así que los datos más recientes pueden no estar disponibles aún.

---

### 2. **Volúmenes de Búsqueda Mensual** (DataForSEO)

**Problema:** Las keywords muestran "VOLUMEN MENSUAL: N/A"

**Solución:**
1. **Configura DataForSEO** (opcional pero recomendado):
   - Crea cuenta en [DataForSEO.com](https://dataforseo.com)
   - Obtén API Login y API Password
   - Añade en Railway:
     - `SEO_VOLUME_PROVIDER=dataforseo`
     - `DATAFORSEO_API_KEY=tu_login`
     - `DATAFORSEO_API_SECRET=tu_password`

2. **Actualiza volúmenes**:
   - Cuando sincronizas, automáticamente intenta obtener volúmenes
   - O ejecuta "Descubrir Keywords" que también obtiene volúmenes

**Alternativa:** Si no configuras DataForSEO, los volúmenes seguirán en "N/A" pero el resto del módulo funcionará igual.

---

### 3. **Oportunidades (Quick Wins) Vacías**

**Problema:** En la pestaña "Oportunidades" no aparece nada

**Solución:**
- Las "Quick Wins" aparecen cuando:
  - Hay keywords con posición entre 4-15
  - Y tienen volumen de búsqueda >= 100
  - **Necesitas sincronizar con GSC primero** para obtener posiciones
  - Y configurar DataForSEO para obtener volúmenes

- Las "Cannibalización" aparecen cuando:
  - Una misma keyword rankea en múltiples URLs
  - **Necesitas datos de GSC** para detectar esto

---

## ✅ Checklist para tener datos completos

1. **Google Search Console configurado**:
   - [ ] Variable `GOOGLE_SEARCH_CONSOLE_CREDENTIALS` en Railway
   - [ ] Propiedad GSC compartida con la cuenta de servicio
   - [ ] `gscProperty` configurado en el sitio (ej: `https://www.velasegalaviladecans.com`)

2. **Sincronización ejecutada**:
   - [ ] Has hecho clic en "Sincronizar" en `/admin/seo`
   - [ ] Esperaste 1-2 minutos para que termine
   - [ ] Verificaste que no haya errores en los logs

3. **Volúmenes de búsqueda** (opcional):
   - [ ] DataForSEO configurado (si quieres volúmenes)
   - [ ] O aceptas que los volúmenes estén en "N/A"

---

## 🔍 Verificar qué está configurado

### En Railway (Variables de Entorno):

Verifica que tengas estas variables:
```bash
# Obligatorio para posiciones/clicks/impressions
GOOGLE_SEARCH_CONSOLE_CREDENTIALS='{"type":"service_account",...}'

# Opcional para volúmenes
SEO_VOLUME_PROVIDER=dataforseo
DATAFORSEO_API_KEY=tu_login
DATAFORSEO_API_SECRET=tu_password
```

### En el Dashboard:

1. Ve a `/admin/seo`
2. Selecciona tu sitio
3. Verifica que el sitio tenga `gscProperty` configurado
4. Haz clic en "Sincronizar"
5. Espera y verifica que aparezcan datos

---

## 💡 Resumen rápido

**Para tener datos básicos (posiciones, clicks, impressions):**
1. Configura Google Search Console API
2. Haz clic en "Sincronizar"

**Para tener volúmenes también:**
1. Lo anterior +
2. Configura DataForSEO
3. Los volúmenes se obtendrán automáticamente al sincronizar

**Para ver Oportunidades:**
1. Necesitas datos de GSC (posiciones)
2. Necesitas volúmenes de búsqueda
3. Las keywords deben estar en posición 4-15 con volumen >= 100

---

## 🆘 Si sigue sin funcionar

1. **Revisa los logs del backend** en Railway para ver errores
2. **Verifica que las credenciales estén correctas** (JSON válido)
3. **Confirma que el `gscProperty` coincida exactamente** con la URL en Google Search Console
4. **Espera 1-2 días** si acabas de configurar GSC (los datos tienen retraso)

