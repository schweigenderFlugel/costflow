import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = ['/productos', '/insumos', '/calculadora', '/configuracion']
const AUTH_ROUTES = ['/login', '/register']

export function middleware(request: NextRequest) {

  const token = request.cookies.get('token')?.value

  const pathname = request.nextUrl.pathname


  if (AUTH_ROUTES.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (PROTECTED_ROUTES.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
// '/calculadora', '/configuracion',
export const config = {
  matcher: [
    '/productos', '/insumos',
    '/login', '/register'
  ],
}
