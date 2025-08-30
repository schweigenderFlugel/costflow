import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = [
  '/productos',
  '/insumos',
  '/calculadora',
  '/configuracion',
  '/inicio'
]

const AUTH_ROUTES = [
  '/inicio-de-sesion',
  '/registro',
  '/cambiar-contrasena',
  '/olvide-mi-contrasena'
]

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (AUTH_ROUTES.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/inicio', request.url))
  }

  if (PROTECTED_ROUTES.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/inicio-de-sesion", request.url));
  }

  // Agregar pathname a los headers para que esté disponible en server components
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);

  return response;
}
// '/calculadora'
export const config = {
  matcher: [
    '/', '/productos', '/insumos', '/configuracion', '/inicio', '/inicio/:path*', '/calculadora',
    '/inicio-de-sesion', '/registro', '/cambiar-contrasena', '/olvide-mi-contrasena'
  ],
};
