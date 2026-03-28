'use client'

import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  CONTACT_LEAD_STATUSES,
  type ContactLeadStatus,
  CONTACT_LEAD_STATUS_LABELS,
} from '@/lib/contact-lead-status'
import { cn } from '@/lib/utils'

export type ContactLeadRow = {
  id: string
  name: string
  email: string
  mobile: string
  subject: string
  message: string
  status: ContactLeadStatus
  createdAt: string
}

function statusSelectTriggerClass(status: ContactLeadStatus) {
  switch (status) {
    case 'LEAD_GENERATED':
      return 'border-slate-500/40 bg-slate-600/15 text-slate-700 dark:bg-slate-500/20 dark:text-slate-200'
    case 'TEAM_CONTACTED':
      return 'border-sky-500/40 bg-sky-600/15 text-sky-800 dark:bg-sky-500/20 dark:text-sky-100'
    case 'CLIENT':
      return 'border-emerald-500/40 bg-emerald-600/15 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100'
    case 'REJECT':
      return 'border-destructive/50 bg-destructive/15 text-destructive'
    default:
      return ''
  }
}

export function ContactLeadsTable({ leads }: { leads: ContactLeadRow[] }) {
  const router = useRouter()
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [rowError, setRowError] = useState<{
    id: string
    message: string
  } | null>(null)

  async function updateStatus(leadId: string, status: ContactLeadStatus) {
    setRowError(null)
    setPendingId(leadId)
    try {
      const res = await fetch(`/api/admin/contact-leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const data = (await res.json()) as { error?: string }
      if (!res.ok) {
        setRowError({
          id: leadId,
          message: data.error ?? 'Could not update status.',
        })
        return
      }
      router.refresh()
    } catch {
      setRowError({
        id: leadId,
        message: 'Network error. Try again.',
      })
    } finally {
      setPendingId(null)
    }
  }

  if (leads.length === 0) {
    return null
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="pl-6 text-muted-foreground">Received</TableHead>
          <TableHead className="text-muted-foreground">Name</TableHead>
          <TableHead className="text-muted-foreground">Email</TableHead>
          <TableHead className="text-muted-foreground">Mobile</TableHead>
          <TableHead className="text-muted-foreground">Subject</TableHead>
          <TableHead className="max-w-56 text-muted-foreground">Message</TableHead>
          <TableHead className="pr-6 text-muted-foreground">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell className="text-muted-foreground pl-6 text-sm tabular-nums whitespace-nowrap">
              {format(new Date(lead.createdAt), 'MMM d, yyyy · h:mm a')}
            </TableCell>
            <TableCell className="font-medium">{lead.name}</TableCell>
            <TableCell className="max-w-40 truncate" title={lead.email}>
              {lead.email}
            </TableCell>
            <TableCell className="font-mono text-sm tabular-nums">
              {lead.mobile}
            </TableCell>
            <TableCell className="max-w-40 truncate" title={lead.subject}>
              {lead.subject}
            </TableCell>
            <TableCell
              className="text-muted-foreground max-w-56 truncate text-sm"
              title={lead.message}
            >
              {lead.message}
            </TableCell>
            <TableCell className="pr-6 align-top">
              <div className="flex flex-col gap-2">
                <Select
                  value={lead.status}
                  disabled={pendingId === lead.id}
                  onValueChange={(v) =>
                    updateStatus(lead.id, v as ContactLeadStatus)
                  }
                >
                  <SelectTrigger
                    size="sm"
                    className={cn(
                      'h-8 w-full min-w-42 max-w-48',
                      statusSelectTriggerClass(lead.status),
                    )}
                    aria-label={`Update status for ${lead.name}`}
                  >
                    <SelectValue placeholder="Set status" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTACT_LEAD_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {CONTACT_LEAD_STATUS_LABELS[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {rowError?.id === lead.id && (
                  <p className="text-destructive max-w-48 text-xs">
                    {rowError.message}
                  </p>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
