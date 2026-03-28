'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

export function AdminLogoutButton() {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function logout() {
    setPending(true)
    try {
      await fetch('/api/auth/admin/logout', { method: 'POST' })
      router.push('/admin')
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="w-full"
      disabled={pending}
      onClick={logout}
    >
      {pending ? 'Signing out…' : 'Sign out'}
    </Button>
  )
}
