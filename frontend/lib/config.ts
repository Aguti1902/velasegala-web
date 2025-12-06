// lib/config.ts - Configuración centralizada del API
export const getApiUrl = () => {
  // Intenta obtener de las variables de entorno
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Fallback: detectar automáticamente basado en el entorno
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // En producción (Vercel)
    if (hostname.includes('vercel.app') || hostname.includes('velasegala')) {
      return 'https://velasegala-web-production.up.railway.app/api';
    }
  }
  
  // En desarrollo local
  return 'http://localhost:3001/api';
};

export const API_URL = getApiUrl();

