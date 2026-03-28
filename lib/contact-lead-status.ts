import { z } from 'zod'

export const CONTACT_LEAD_STATUSES = [
  'LEAD_GENERATED',
  'TEAM_CONTACTED',
  'CLIENT',
  'REJECT',
] as const

export type ContactLeadStatus = (typeof CONTACT_LEAD_STATUSES)[number]

export const CONTACT_LEAD_STATUS_LABELS: Record<ContactLeadStatus, string> = {
  LEAD_GENERATED: 'Lead generated',
  TEAM_CONTACTED: 'Team contacted',
  CLIENT: 'Client',
  REJECT: 'Reject',
}

/** Default when a visitor submits the contact form. */
export const DEFAULT_CONTACT_LEAD_STATUS: ContactLeadStatus = 'LEAD_GENERATED'

export const contactLeadStatusUpdateSchema = z.object({
  status: z.enum(CONTACT_LEAD_STATUSES, {
    required_error: 'Status is required',
    invalid_type_error: 'Invalid status',
  }),
})

export type ContactLeadStatusUpdateInput = z.infer<
  typeof contactLeadStatusUpdateSchema
>
