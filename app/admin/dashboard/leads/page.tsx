import { MessageSquare } from 'lucide-react'

import {
  ContactLeadsTable,
  type ContactLeadRow,
} from '@/components/admin/contact-leads-table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { connectDB } from '@/lib/mongodb'
import {
  CONTACT_LEAD_STATUS_LABELS,
  type ContactLeadStatus,
} from '@/lib/contact-lead-status'
import { ContactLead } from '@/models/ContactLead'

export const metadata = {
  title: 'Contact leads',
  robots: { index: false, follow: false },
}

export default async function AdminContactLeadsPage() {
  let leads: ContactLeadRow[] = []
  try {
    await connectDB()
    const docs = await ContactLead.find()
      .sort({ createdAt: -1 })
      .select('name email mobile subject message status createdAt')
      .lean()
      .exec()
    leads = docs.map((d) => ({
      id: d._id.toString(),
      name: d.name,
      email: d.email,
      mobile: d.mobile,
      subject: d.subject,
      message: d.message,
      status: d.status as ContactLeadStatus,
      createdAt:
        d.createdAt instanceof Date
          ? d.createdAt.toISOString()
          : String(d.createdAt),
    }))
  } catch {
    leads = []
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Contact leads</h1>
        <p className="text-muted-foreground text-sm">
          Submissions from the site contact form. Typical flow:{' '}
          <span className="text-foreground font-medium">
            {CONTACT_LEAD_STATUS_LABELS.LEAD_GENERATED}
          </span>{' '}
          →{' '}
          <span className="text-foreground font-medium">
            {CONTACT_LEAD_STATUS_LABELS.TEAM_CONTACTED}
          </span>{' '}
          →{' '}
          <span className="text-foreground font-medium">
            {CONTACT_LEAD_STATUS_LABELS.CLIENT}
          </span>{' '}
          or{' '}
          <span className="text-foreground font-medium">
            {CONTACT_LEAD_STATUS_LABELS.REJECT}
          </span>
          .
        </p>
      </div>

      <Card className="overflow-hidden border shadow-sm p-0">
        <CardHeader className="border-b bg-muted/30 pt-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-md">
              <MessageSquare className="size-4" />
            </div>
            <div>
              <CardTitle className="text-lg">Leads</CardTitle>
              <CardDescription>
                {leads.length === 0
                  ? 'No contact submissions yet.'
                  : `${leads.length} lead${leads.length === 1 ? '' : 's'} total`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {leads.length === 0 ? (
            <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 px-6 py-16 text-center text-sm">
              <MessageSquare className="text-muted-foreground/50 size-10" />
              <p>No contact leads yet.</p>
              <p className="text-muted-foreground/80 max-w-sm text-xs">
                Messages sent from the public contact page will show up here.
              </p>
            </div>
          ) : (
            <div className="relative w-full overflow-x-auto">
              <ContactLeadsTable leads={leads} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
