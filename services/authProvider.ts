"use server"
import { cookies } from 'next/headers'
import { encrypt } from './hashData'
import { UserResponse } from '@/types/definitions'


export async function createSession(userDetail: UserResponse) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userDetail, expiresAt })
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSessionCookie() {
  (await cookies()).delete('session')
}