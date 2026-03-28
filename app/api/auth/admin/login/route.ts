import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { ADMIN_SESSION_COOKIE, SESSION_MAX_AGE_SEC } from '@/lib/auth/constants'
import { signAdminSessionToken } from '@/lib/auth/jwt'
import { connectDB } from '@/lib/mongodb'
import { ADMIN_ROLE, User } from '@/models/User'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string
      password?: string
    }

    const email = body.email?.trim().toLowerCase()
    const password = body.password

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 },
      )
    }

    await connectDB()

    const user = await User.findOne({ email }).select('+password').exec()
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 },
      )
    }

    if (user.role !== ADMIN_ROLE) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 },
      )
    }

    const token = await signAdminSessionToken({
      sub: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    })

    if (!token) {
      return NextResponse.json(
        { error: 'Server misconfiguration: AUTH_SECRET must be at least 32 characters' },
        { status: 500 },
      )
    }

    const cookieStore = await cookies()
    cookieStore.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: SESSION_MAX_AGE_SEC,
    })

    return NextResponse.json({
      ok: true,
      user: { name: user.name, email: user.email, role: user.role },
    })
  } catch (e) {
    console.error('[admin login]', e)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
