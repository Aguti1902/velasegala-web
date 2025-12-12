# 🗑️ Eliminar Todos los Artículos Excepto el Más Reciente

## 🚀 Método Rápido: Desde el Navegador

### Paso 1: Ve al Admin y Abre la Consola

1. Ve a: https://velasegala-web-emc8.vercel.app/admin
2. Abre la consola del navegador (F12 → Console)

### Paso 2: Ejecuta Este Comando

Copia y pega este código en la consola:

```javascript
fetch('https://velasegala-web-production.up.railway.app/api/admin/delete-old-posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + document.cookie.split('admin_token=')[1]?.split(';')[0]
  }
})
.then(res => res.json())
.then(data => {
  console.log('✅ Resultado:', data);
  alert(`✅ ${data.message}\n\nEliminados: ${data.deleted}\nConservado: ${data.kept.title}`);
  window.location.reload();
})
.catch(err => {
  console.error('❌ Error:', err);
  alert('❌ Error al eliminar posts');
});
```

### Paso 3: Confirma

Verás un mensaje como:

```
✅ Se eliminaron 9 posts

Eliminados: 9
Conservado: Las urgencias dentales más comunes y cómo actuar
```

La página se recargará y verás solo 1 artículo en la lista.

---

## 🛡️ Seguridad

Este endpoint:
- ✅ Requiere autenticación (token de admin)
- ✅ Solo elimina posts (no categorías ni tags)
- ✅ Mantiene siempre el post más reciente
- ✅ Devuelve información de lo que eliminó

---

## 🔄 Alternativa: Desde Terminal con curl

Si prefieres usar terminal:

### Paso 1: Obtener el Token de Admin

1. Ve a: https://velasegala-web-emc8.vercel.app/admin
2. Abre DevTools (F12) → Application → Cookies
3. Copia el valor de `admin_token`

### Paso 2: Ejecutar curl

```bash
curl -X POST https://velasegala-web-production.up.railway.app/api/admin/delete-old-posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

Reemplaza `TU_TOKEN_AQUI` con el token que copiaste.

---

## ⏰ Espera el Deploy Primero

El endpoint se está deployando ahora en Railway.

**Espera 1-2 minutos** hasta que el deploy termine:

1. Ve a [railway.app](https://railway.app)
2. Tu proyecto → Backend → Deployments
3. Espera el ✅ verde
4. Debe mostrar: "feat: Add endpoint to delete old posts..."

---

## 🧪 Verificación

Después de ejecutar el comando:

1. ✅ Ve al admin: https://velasegala-web-emc8.vercel.app/admin/posts
2. ✅ Deberías ver **solo 1 artículo** (el más reciente)
3. ✅ Ve al blog: https://velasegala-web-emc8.vercel.app/blog
4. ✅ Solo debe aparecer ese artículo (si está publicado)

---

**Espera 1-2 minutos para que Railway termine el deploy, luego ejecuta el comando desde la consola del navegador.** 🚀
