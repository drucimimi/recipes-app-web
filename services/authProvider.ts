"use server"
import { cookies } from 'next/headers'
import { encrypt } from './hashData'
import { UserResponse } from '@/types/definitions'
import { apiRequest } from './httpCall'

/**
 * 
 * @param userDetail 
 * @description permet de créer la session utilisateur
 */
export async function createSession(userDetail: UserResponse) {
  const session = await encrypt({ userDetail })
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
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

export async function refreshToken(token: string) {
  const response = await apiRequest('/auth/refresh', {method: 'POST', headers:{'Content-Type':'application/json'}, body:{"token":token}})
  if(response.status == 201){
    const data = await response.json()
    createSession(data)
  }
}