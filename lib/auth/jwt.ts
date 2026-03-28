import { SignJWT, jwtVerify } from 'jose'

import { SESSION_MAX_AGE_SEC } from './constants'

export type AdminSessionPayload = {
  sub: string
  email: string
  name: string
  role: string
}

function getSecretKey(): Uint8Array | null {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.length < 32) {
    return null
  }
  return new TextEncoder().encode(secret)
}

export async function signAdminSessionToken(
  payload: AdminSessionPayload,
): Promise<string | null> {
  const secret = getSecretKey()
  if (!secret) return null

  return new SignJWT({
    email: payload.email,
    name: payload.name,
    role: payload.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SEC}s`)
    .sign(secret)
}

export async function verifyAdminSessionToken(
  token: string,
): Promise<AdminSessionPayload | null> {
  const secret = getSecretKey()
  if (!secret) return null

  try {
    const { payload } = await jwtVerify(token, secret)
    const sub = payload.sub
    if (
      !sub ||
      typeof payload.email !== 'string' ||
      typeof payload.name !== 'string' ||
      typeof payload.role !== 'string'
    ) {
      return null
    }
    return {
      sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    }
  } catch {
    return null
  }
}
