import { jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { ADMIN_SESSION_COOKIE } from '@/lib/auth/constants'

export async function middleware(request: NextRequest) {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.length < 32) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  if (!token) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret))
    return NextResponse.next()
  } catch {
    const res = NextResponse.redirect(new URL('/admin', request.url))
    res.cookies.delete(ADMIN_SESSION_COOKIE)
    return res
  }
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
