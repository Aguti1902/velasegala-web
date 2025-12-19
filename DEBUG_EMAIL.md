# 🔍 Depuración del Servicio de Email

## Pasos para Diagnosticar

### 1. Verificar Variables de Entorno en Railway

Asegúrate de que tienes estas variables configuradas en Railway:

```
RESEND_API_KEY=re_xxxxxxxxxxxx  (tu API key de Resend)
APPOINTMENT_EMAIL=segala@velasegala.com  (opcional, este es el valor por defecto)
EMAIL_FROM=onboarding@resend.dev  (opcional, este es el valor por defecto para pruebas)
```

**⚠️ IMPORTANTE:**
- La API key debe empezar con `re_`
- No debe tener espacios antes o después del `=`
- Railway necesita hacer redeploy después de añadir variables

### 2. Ver los Logs en Railway

1. Ve a tu proyecto en Railway: https://railway.app
2. Selecciona el servicio del backend
3. Ve a la pestaña **"Deployments"** o **"Logs"**
4. Busca mensajes que empiecen con:
   - `✅ Resend configurado correctamente` - significa que la API key está bien
   - `⚠️ RESEND_API_KEY no configurada` - significa que falta la variable
   - `📤 Intentando enviar email...` - significa que está intentando enviar
   - `✅ Email de cita enviado exitosamente` - éxito!
   - `❌ Error al enviar email de cita:` - hay un error

### 3. Probar el Formulario

1. Ve a la página de pedir cita en tu sitio web
2. Rellena y envía el formulario
3. Inmediatamente después, ve a los logs de Railway
4. Deberías ver los mensajes de log que te indican qué está pasando

### 4. Errores Comunes

#### Error: "RESEND_API_KEY no configurada"
**Solución:** 
- Verifica que la variable `RESEND_API_KEY` esté en Railway
- Asegúrate de que Railway haya hecho redeploy después de añadirla
- Verifica que el nombre sea exactamente `RESEND_API_KEY` (sin espacios)

#### Error: "Invalid API key" o "Unauthorized"
**Solución:**
- Verifica que la API key sea correcta
- Copia la API key de nuevo desde Resend
- Asegúrate de que empiece con `re_`

#### Error: "Domain not verified" o "From address not verified"
**Solución:**
- Si usas `EMAIL_FROM=onboarding@resend.dev`, debería funcionar sin verificación
- Si usas tu propio dominio, necesitas verificarlo en Resend primero

#### No aparece ningún error pero el email no llega
**Solución:**
- Revisa la carpeta de spam en `segala@velasegala.com`
- Verifica los logs de Railway para ver si hay errores ocultos
- Prueba enviando a otro email para ver si es problema del email destino

### 5. Verificar API Key de Resend

1. Ve a https://resend.com/api-keys
2. Verifica que la API key esté activa
3. Si no está activa, crea una nueva y actualiza la variable en Railway

### 6. Probar Manualmente la API Key

Puedes probar la API key directamente con curl (desde tu terminal local):

```bash
curl -X POST 'https://api.resend.com/emails' \
  -H "Authorization: Bearer TU_API_KEY_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "onboarding@resend.dev",
    "to": "segala@velasegala.com",
    "subject": "Prueba de email",
    "html": "<p>Este es un email de prueba</p>"
  }'
```

Si esto funciona, el problema está en el código. Si no funciona, el problema es la API key.

### 7. Contactar con Resend

Si nada funciona:
1. Ve a https://resend.com
2. Revisa el dashboard para ver si hay emails bloqueados o errores
3. Contacta con el soporte de Resend si es necesario

