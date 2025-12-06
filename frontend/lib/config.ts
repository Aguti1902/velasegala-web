// lib/config.ts - Configuración centralizada del API
export const getApiUrl = (): string => {
  // En cliente, detectar automáticamente basado en el hostname
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // En producción (Vercel)
    if (hostname.includes('vercel.app') || hostname.includes('velasegala')) {
      return 'https://velasegala-web-production.up.railway.app/api';
    }
    
    // En desarrollo local
    return 'http://localhost:3001/api';
  }
  
  // En servidor (Server Components), usar variable de entorno o fallback
  return process.env.NEXT_PUBLIC_API_URL || 'https://velasegala-web-production.up.railway.app/api';
};

// Para uso en componentes del servidor (Server Components)
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://velasegala-web-production.up.railway.app/api';

