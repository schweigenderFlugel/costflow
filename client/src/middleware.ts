import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_DASHBOARD_ROUTES = ["/dashboard", "/dashboard/usuarios"];
const PROTECTED_ROUTES = [
  "/productos",
  "/insumos",
  "/calculadora",
  "/configuracion",
  ...PROTECTED_DASHBOARD_ROUTES,
];

const AUTH_ROUTES = ["/inicio-de-sesion", "/registro"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (AUTH_ROUTES.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
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
    "/",
    "/productos",
    "/calculadora",
    "/insumos",
    "/configuracion",
    "/dashboard",
    "/dashboard/:path*",
    "/inicio-de-sesion",
    "/registro",
  ],
};
