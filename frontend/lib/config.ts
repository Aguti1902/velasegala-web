// lib/config.ts - Configuración centralizada del API
export const getApiUrl = (): string => {
  // En servidor o cliente, priorizar variable de entorno
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // En cliente, detectar automáticamente basado en el hostname
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // En producción (Vercel)
    if (hostname.includes('vercel.app') || hostname.includes('velasegala')) {
      return 'https://velasegala-web-production.up.railway.app/api';
    }
  }
  
  // En desarrollo local o servidor sin window
  return 'http://localhost:3001/api';
};

// Para uso en componentes del servidor (Server Components)
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

