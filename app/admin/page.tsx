import { redirect } from 'next/navigation'

import { getAdminSession } from '@/lib/auth/get-session'

import { AdminLoginForm } from './admin-login-form'

export const metadata = {
  title: 'Admin sign in',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  const session = await getAdminSession()
  if (session) {
    redirect('/admin/dashboard')
  }

  return (
    <div className="bg-muted/30 flex min-h-svh items-center justify-center p-4">
      <AdminLoginForm />
    </div>
  )
}
