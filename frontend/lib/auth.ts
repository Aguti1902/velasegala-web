// lib/auth.ts - Utilidades de autenticación para el admin

export function getAdminToken(): string | null {
  if (typeof document === 'undefined') return null;
  
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('admin_token='))
    ?.split('=')[1];
  
  return token || null;
}

export function clearAdminToken(): void {
  if (typeof document === 'undefined') return;
  
  document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getAdminToken();
  
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });
  
  // Si es 401, limpiar token y redirigir
  if (response.status === 401) {
    clearAdminToken();
    if (typeof window !== 'undefined') {
      // Redirigir silenciosamente al login
      window.location.href = '/admin/login?expired=true';
    }
  }
  
  return response;
}

