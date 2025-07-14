import { DecodeUserResponse, UserResponse } from '@/types/definitions';
import { JWTPayload, jwtVerify, SignJWT } from 'jose'

const secret = Buffer.from(process.env.JWT_SECRET!, 'base64')

/**
 * 
 * @param payload
 * @description permet de chiffer une information avec un token JWT
 */
export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('100y')
    .sign(secret)
}

/**
 * 
 * @param token
 * @description permet de déchiffer une information avec un token JWT et rafraichir le token si besoin
 */
export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as DecodeUserResponse
  } catch(error) {
    console.error(error)
    return null
  }
}