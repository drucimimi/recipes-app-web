import { decrypt } from '@/services/hashData'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  const apiHost = process.env.NEXT_PUBLIC_API_URL?.split('/api')[0]
  const appHost = process.env.APP_URL
  const csp = [
  "default-src 'self'",
  "script-src 'self' https://matomo.webapps24.eu 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self' https://matomo.webapps24.eu ${appHost} ${apiHost}`,
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests"
  ].join('; ')
  
  if(session){
    if(request.nextUrl.pathname == '/web/login' || request.nextUrl.pathname == '/web/register') return NextResponse.redirect(new URL('/web', request.url))
    const userInfo =  await decrypt(session)
    if (!userInfo) return NextResponse.json("Token invalide ou expiré")
    const userRole = userInfo.userDetail.roleName
    if(userRole != "ADMIN" && request.nextUrl.pathname.startsWith('/web/protected/admin')) return NextResponse.json("Vous n'êtes pas autorisé à accéder à cette page")
  } else if (!session && request.nextUrl.pathname.startsWith('/web/protected')) return NextResponse.redirect(new URL('/web/login', request.url))
  
  const response = NextResponse.next()

  // Définition des en-têtes de sécurité
  response.headers.set('Content-Security-Policy', csp)
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  return response
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}