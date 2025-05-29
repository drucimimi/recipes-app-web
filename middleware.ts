import { decrypt } from '@/services/hashData'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  if(session){
    if(request.nextUrl.pathname == '/web/login' || request.nextUrl.pathname == '/web/register') return NextResponse.redirect(new URL('/web', request.url))
    const userInfo =  await decrypt(session)
    if (!userInfo) return NextResponse.json("Token invalide ou expiré")
    const userRole = userInfo.userDetail.roleName
    if(userRole != "ADMIN" && request.nextUrl.pathname.startsWith('/web/protected/admin')) return NextResponse.json("Vous n'êtes pas autorisé à accéder à cette page")
    return NextResponse.next()
  } else if (!session && request.nextUrl.pathname.startsWith('/web/protected')) return NextResponse.redirect(new URL('/web/login', request.url))
  else return NextResponse.next()
}