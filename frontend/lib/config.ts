// lib/config.ts - Configuración centralizada del API
export const getApiUrl = (): string => {
  // Priorizar variable de entorno si está disponible
  if (typeof window !== 'undefined' && (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_API_URL) {
    return (window as any).__NEXT_DATA__.env.NEXT_PUBLIC_API_URL;
  }
  
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // En cliente, detectar automáticamente basado en el hostname
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Si no es localhost, asumir producción
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return 'https://velasegala-web-production.up.railway.app/api';
    }
    
    // En desarrollo local
    return 'http://localhost:3001/api';
  }
  
  // En servidor (Server Components), usar fallback a producción
  return 'https://velasegala-web-production.up.railway.app/api';
};

// Para uso en componentes del servidor (Server Components)
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://velasegala-web-production.up.railway.app/api';

