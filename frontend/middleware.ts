import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger rutas de admin
  if (pathname.startsWith('/admin')) {
    // Excepto la página de login
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Verificar si tiene token de autenticación
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // Redirigir a login si no está autenticado
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // TODO: Aquí podrías verificar el token con el backend
    // Por ahora solo verificamos que existe
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

