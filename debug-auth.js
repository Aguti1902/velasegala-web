// Script para depurar el problema de autenticación
// Ejecutar en la consola del navegador

function debugAuth() {
  console.log("=== DEBUG DE AUTENTICACIÓN ===");
  
  // 1. Verificar cookies
  console.log("\n1. Todas las cookies:", document.cookie);
  
  // 2. Verificar token específico
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('admin_token='))
    ?.split('=')[1];
  
  console.log("\n2. Token encontrado:", token ? `${token.substring(0, 20)}...` : "❌ NO ENCONTRADO");
  
  // 3. Verificar API URL
  const apiUrl = 'https://velasegala-web-production.up.railway.app/api';
  console.log("\n3. API URL:", apiUrl);
  
  // 4. Hacer una petición de prueba
  if (token) {
    console.log("\n4. Probando petición GET /categories...");
    fetch(`${apiUrl}/categories`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(r => {
      console.log("   Status:", r.status);
      return r.json();
    })
    .then(data => {
      console.log("   Datos:", data);
    })
    .catch(err => {
      console.error("   Error:", err);
    });
    
    console.log("\n5. Probando petición POST /categories (crear)...");
    fetch(`${apiUrl}/categories`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test Category',
        slug: 'test-category'
      })
    })
    .then(r => {
      console.log("   Status:", r.status);
      return r.json();
    })
    .then(data => {
      console.log("   Respuesta:", data);
    })
    .catch(err => {
      console.error("   Error:", err);
    });
  } else {
    console.log("\n❌ No se puede probar sin token. Por favor, inicia sesión en /admin/login");
  }
}

debugAuth();

