import { DecodeUserResponse, UserResponse } from '@/types/definitions';
import { JWTPayload, jwtVerify, SignJWT } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * 
 * @param payload
 * @description permet de chiffer une information avec un token JWT
 */
export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(secret)
}

/**
 * 
 * @param token
 * @description permet de déchiffer une information avec un token JWT
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