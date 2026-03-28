import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

import { getAdminSession } from '@/lib/auth/get-session'
import { connectDB } from '@/lib/mongodb'
import { contactLeadStatusUpdateSchema } from '@/lib/contact-lead-status'
import { ContactLead } from '@/models/ContactLead'

export const dynamic = 'force-dynamic'

type RouteContext = { params: Promise<{ id: string }> }

export async function PATCH(request: Request, context: RouteContext) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await context.params
  if (!id || !mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid lead id' }, { status: 400 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = contactLeadStatusUpdateSchema.safeParse(body)
  if (!parsed.success) {
    const msg =
      parsed.error.flatten().fieldErrors.status?.[0] ?? 'Invalid status'
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  try {
    await connectDB()

    const updated = await ContactLead.findByIdAndUpdate(
      id,
      { status: parsed.data.status },
      { new: true, runValidators: true },
    )
      .select('status')
      .lean()
      .exec()

    if (!updated) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json({
      ok: true,
      status: updated.status,
    })
  } catch (e) {
    console.error('[admin contact-lead patch]', e)
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 },
    )
  }
}
