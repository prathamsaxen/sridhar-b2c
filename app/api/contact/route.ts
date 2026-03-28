import { NextResponse } from 'next/server'

import { connectDB } from '@/lib/mongodb'
import { DEFAULT_CONTACT_LEAD_STATUS } from '@/lib/contact-lead-status'
import {
  contactLeadSubmitSchema,
  normalizeContactLeadPayload,
} from '@/lib/validators/contact-lead'
import { ContactLead } from '@/models/ContactLead'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const parsed = contactLeadSubmitSchema.safeParse(body)
    if (!parsed.success) {
      const flat = parsed.error.flatten()
      return NextResponse.json(
        {
          error: 'Validation failed',
          fieldErrors: flat.fieldErrors,
        },
        { status: 400 },
      )
    }

    const normalized = normalizeContactLeadPayload(parsed.data)

    await connectDB()

    await ContactLead.create({
      ...normalized,
      status: DEFAULT_CONTACT_LEAD_STATUS,
    })

    return NextResponse.json(
      {
        ok: true,
        message: "Thank you for your message. We'll get back to you soon.",
      },
      { status: 201 },
    )
  } catch (e) {
    console.error('[contact submit]', e)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    )
  }
}
