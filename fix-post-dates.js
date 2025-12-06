// Script para actualizar fechas de posts desde la consola del navegador
// Ejecuta esto en la consola del navegador después de hacer login en /admin/login

async function fixPostDates() {
  try {
    // Obtener token de las cookies
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('admin_token='))
      ?.split('=')[1];
    
    if (!token) {
      console.error('❌ No se encontró el token. Por favor, inicia sesión en /admin/login primero.');
      return;
    }
    
    console.log('🔑 Token encontrado:', token.substring(0, 20) + '...');
    
    const apiUrl = 'https://velasegala-web-production.up.railway.app/api';
    const url = `${apiUrl}/admin/fix-post-dates`;
    
    console.log('📤 Enviando petición a:', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('📥 Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', response.status, errorText);
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Éxito:', data);
    return data;
  } catch (error) {
    console.error('❌ Error al actualizar fechas:', error);
    throw error;
  }
}

// Ejecutar automáticamente
fixPostDates();

