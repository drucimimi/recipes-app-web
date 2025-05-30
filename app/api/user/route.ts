import { decrypt } from '@/services/hashData'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request:NextRequest) {
  const cookieStore = cookies()
  const session = cookieStore.get('session')?.value
  if (!session && (request.nextUrl.basePath == "/web" || request.nextUrl.basePath.startsWith("/web/recipe"))) {
    return NextResponse.json("Vous n'êtes pas connecté avec votre compte")
  }
  let userInfo = null
  if(session){
    const payload = await decrypt(session)
    if (!payload) {
      return NextResponse.json("Token invalide ou expiré")
    }
    userInfo = payload.userDetail
  }
  return NextResponse.json(userInfo)
}