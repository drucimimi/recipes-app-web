"use server"
import { cookies } from 'next/headers'
import { encrypt } from './hashData'
import { UserResponse } from '@/types/definitions'

/**
 * 
 * @param userDetail 
 * @description permet de créer la session utilisateur
 */
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

/**
 * 
 * @description permet de supprimer la session utilisateur
 */
export async function deleteSessionCookie() {
  (await cookies()).delete('session')
}