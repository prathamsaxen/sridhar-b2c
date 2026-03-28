import { cookies } from 'next/headers'

import { ADMIN_SESSION_COOKIE } from './constants'
import { verifyAdminSessionToken, type AdminSessionPayload } from './jwt'

export type AdminSession = AdminSessionPayload

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  if (!token) return null
  return verifyAdminSessionToken(token)
}
