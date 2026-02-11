# 📧 Configurar Email para Evitar SPAM - Resend

## 🚨 Problema Actual

Actualmente usas el dominio de prueba de Resend: `onboarding@resend.dev`

**Esto causa que los emails:**
- ❌ Lleguen a SPAM
- ❌ No parezcan profesionales
- ❌ Tengan baja tasa de entrega

---

## ✅ Solución: Configurar Dominio Propio

Para evitar SPAM, debes enviar emails desde tu propio dominio: `@velasegalaviladecans.com`

---

## 📋 Paso a Paso

### **Paso 1: Añadir dominio en Resend**

1. Ve a https://resend.com/
2. Inicia sesión con tu cuenta
3. Ve a **Domains** (en el menú lateral)
4. Haz clic en **Add Domain**
5. Introduce: `velasegalaviladecans.com`
6. Haz clic en **Add**

Resend te mostrará los **registros DNS** que debes añadir.

---

### **Paso 2: Configurar registros DNS**

Necesitas añadir estos registros en tu proveedor de dominio (donde compraste el dominio).

Resend te dará algo como:

#### **SPF Record (TXT)**
```
Type: TXT
Name: @
Value: v=spf1 include:spf.resend.com ~all
```

#### **DKIM Record (TXT)**
```
Type: TXT
Name: resend._domainkey
Value: (un valor largo que te da Resend)
```

#### **DMARC Record (TXT)** (opcional pero recomendado)
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:admin@velasegalaviladecans.com
```

---

### **Paso 3: Añadir registros en tu proveedor de dominio**

Depende de dónde tengas el dominio:

#### **Si usas Cloudflare:**
1. Ve a https://dash.cloudflare.com/
2. Selecciona tu dominio: `velasegalaviladecans.com`
3. Ve a **DNS** → **Records**
4. Haz clic en **Add record**
5. Añade los 3 registros (SPF, DKIM, DMARC)
6. Guarda

#### **Si usas otro proveedor (GoDaddy, Namecheap, etc.):**
1. Inicia sesión en tu proveedor
2. Busca la sección **DNS Management** o **DNS Settings**
3. Añade los registros TXT que te dio Resend
4. Guarda los cambios

---

### **Paso 4: Verificar dominio en Resend**

1. Vuelve a Resend → **Domains**
2. Haz clic en **Verify** junto a tu dominio
3. Si los registros DNS están bien configurados:
   - ✅ **Status**: Verified
   - ✅ Listo para enviar emails

**Nota**: Los registros DNS pueden tardar **hasta 24 horas** en propagarse, pero normalmente toma **5-30 minutos**.

---

### **Paso 5: Actualizar variable de entorno en Railway**

Una vez el dominio esté verificado:

1. Ve a Railway → Tu proyecto backend
2. Ve a **Variables**
3. Actualiza o añade:
   ```
   EMAIL_FROM=noreply@velasegalaviladecans.com
   ```
   O el email que prefieras:
   - `info@velasegalaviladecans.com`
   - `contacto@velasegalaviladecans.com`
   - `citas@velasegalaviladecans.com`

4. **Redeploy** el backend

---

## 🎯 Resultado Final

Después de configurar todo:

**Antes:**
```
De: Clínica Vela-Segalà <onboarding@resend.dev>  ❌ SPAM
```

**Después:**
```
De: Clínica Vela-Segalà <noreply@velasegalaviladecans.com>  ✅ Legítimo
```

---

## 📊 Ventajas de usar dominio propio:

- ✅ **No llega a SPAM**: SPF + DKIM verifican que eres legítimo
- ✅ **Aspecto profesional**: Email con tu dominio
- ✅ **Mayor tasa de entrega**: >95% de emails llegan a inbox
- ✅ **Confianza**: Los clientes ven que viene de tu dominio real

---

## 🔍 Verificar que no llegue a SPAM

Después de configurar:

1. **Envía un email de prueba** (desde el formulario de tu web)
2. **Verifica en ambos correos**:
   - `segala@velasegala.com`
   - `agutierrezgomez00@gmail.com`
3. **Revisa la carpeta de SPAM** también
4. Si llega a inbox → ✅ **Funciona correctamente**

### **Herramientas para verificar:**

- **Mail Tester**: https://www.mail-tester.com/
  - Envía un email de prueba a la dirección que te dan
  - Te dará un score /10
  - **Score 8-10** → No debería caer en SPAM

- **Google Postmaster Tools**: https://postmaster.google.com/
  - Monitorea la reputación de tu dominio
  - Solo funciona si envías >100 emails/día

---

## ⚠️ Mientras tanto (solución temporal)

Si no puedes configurar el dominio ahora mismo, añade esto en Railway para que al menos te lleguen a ti también:

```
SECONDARY_EMAIL=agutierrezgomez00@gmail.com
```

Ya modifiqué el código para que envíe a ambos correos. Ahora envía a:
- ✅ `segala@velasegala.com` (APPOINTMENT_EMAIL)
- ✅ `agutierrezgomez00@gmail.com` (SECONDARY_EMAIL)

---

## 📝 Resumen de acciones:

**Ahora mismo (temporal):**
- [x] Código modificado para enviar a 2 emails
- [ ] Añadir `SECONDARY_EMAIL=agutierrezgomez00@gmail.com` en Railway
- [ ] Redeploy backend

**Para evitar SPAM (definitivo):**
- [ ] Añadir dominio en Resend
- [ ] Configurar registros DNS (SPF, DKIM, DMARC)
- [ ] Verificar dominio en Resend
- [ ] Cambiar `EMAIL_FROM` a tu dominio

¿Necesitas ayuda configurando los registros DNS en tu proveedor de dominio?
