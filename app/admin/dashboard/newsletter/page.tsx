import { format } from 'date-fns'
import { Mail } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { connectDB } from '@/lib/mongodb'
import { NewsletterSubscriber } from '@/models/NewsletterSubscriber'

export const metadata = {
  title: 'Newsletter subscribers',
  robots: { index: false, follow: false },
}

export default async function AdminNewsletterPage() {
  let subscribers: { email: string; subscribedAt: Date }[] = []
  try {
    await connectDB()
    const docs = await NewsletterSubscriber.find()
      .sort({ createdAt: -1 })
      .select('email createdAt')
      .lean()
      .exec()
    subscribers = docs.map((d) => ({
      email: d.email,
      subscribedAt: d.createdAt,
    }))
  } catch {
    subscribers = []
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Newsletter subscribers
        </h1>
        <p className="text-muted-foreground text-sm">
          Emails collected from the site footer subscription form.
        </p>
      </div>

      <Card className="overflow-hidden border shadow-sm p-0">
        <CardHeader className="border-b bg-muted/30 pt-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-md">
              <Mail className="size-4" />
            </div>
            <div>
              <CardTitle className="text-lg">Subscribers</CardTitle>
              <CardDescription>
                {subscribers.length === 0
                  ? 'No sign-ups yet.'
                  : `${subscribers.length} subscriber${subscribers.length === 1 ? '' : 's'} total`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {subscribers.length === 0 ? (
            <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 px-6 py-16 text-center text-sm">
              <Mail className="text-muted-foreground/50 size-10" />
              <p>No newsletter subscribers yet.</p>
              <p className="text-muted-foreground/80 max-w-sm text-xs">
                New subscriptions from the footer form will appear here.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12 pl-6 text-muted-foreground">
                    #
                  </TableHead>
                  <TableHead className="text-muted-foreground">Email</TableHead>
                  <TableHead className="pr-6 text-right text-muted-foreground">
                    Subscribed
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((row, index) => (
                  <TableRow key={row.email}>
                    <TableCell className="text-muted-foreground pl-6 font-mono text-xs">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">{row.email}</TableCell>
                    <TableCell className="text-muted-foreground pr-6 text-right text-sm tabular-nums">
                      {format(row.subscribedAt, 'MMM d, yyyy · h:mm a')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
