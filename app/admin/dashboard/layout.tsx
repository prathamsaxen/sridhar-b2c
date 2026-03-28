import { redirect } from 'next/navigation'

import { AdminAppSidebar } from '@/components/admin/admin-app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { getAdminSession } from '@/lib/auth/get-session'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAdminSession()
  if (!session) {
    redirect('/admin')
  }

  return (
    <SidebarProvider>
      <AdminAppSidebar
        user={{ name: session.name, email: session.email }}
      />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-muted-foreground text-sm">Dashboard</span>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
