import { decrypt } from '@/services/hashData'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = cookies()
  const session = cookieStore.get('session')?.value
  if (!session) {
    return NextResponse.json("Vous n'êtes pas connecté avec votre compte")
  }

  const payload = await decrypt(session)
  if (!payload) {
    return NextResponse.json("Token invalide ou expiré")
  }
  const userInfo = payload.userDetail

  return NextResponse.json(userInfo)
}