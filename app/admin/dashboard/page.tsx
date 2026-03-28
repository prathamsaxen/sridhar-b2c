import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { connectDB } from '@/lib/mongodb'
import { ADMIN_ROLE, User } from '@/models/User'
import { getAdminSession } from '@/lib/auth/get-session'

export const metadata = {
  title: 'Admin dashboard',
  robots: { index: false, follow: false },
}

export default async function AdminDashboardPage() {
  const session = await getAdminSession()

  let adminUserCount = 0
  try {
    await connectDB()
    adminUserCount = await User.countDocuments({ role: ADMIN_ROLE })
  } catch {
    adminUserCount = 0
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-muted-foreground text-sm">
          Signed in as {session?.email}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Admin users</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {adminUserCount}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Users with role ADMIN in MongoDB.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Your role</CardDescription>
            <CardTitle className="text-xl">{session?.role ?? '—'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Session issued for this browser.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Status</CardDescription>
            <CardTitle className="text-xl">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Dashboard is ready for you to extend.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
