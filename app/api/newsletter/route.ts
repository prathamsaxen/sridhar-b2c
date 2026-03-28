import { NextResponse } from 'next/server'

import { connectDB } from '@/lib/mongodb'
import {
  newsletterSubscribeSchema,
  normalizeNewsletterEmail,
} from '@/lib/validators/newsletter'
import { NewsletterSubscriber } from '@/models/NewsletterSubscriber'

export const dynamic = 'force-dynamic'

const ALREADY_SUBSCRIBED_MESSAGE =
  'You are already subscribed for our newsletter.'

export async function POST(request: Request) {
  try {
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const parsed = newsletterSubscribeSchema.safeParse(body)
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors.email?.[0]
      return NextResponse.json(
        { error: first ?? 'Invalid input' },
        { status: 400 },
      )
    }

    const email = normalizeNewsletterEmail(parsed.data.email)

    await connectDB()

    const existing = await NewsletterSubscriber.findOne({ email })
      .lean()
      .exec()
    if (existing) {
      return NextResponse.json(
        { ok: false, code: 'ALREADY_SUBSCRIBED', message: ALREADY_SUBSCRIBED_MESSAGE },
        { status: 409 },
      )
    }

    try {
      await NewsletterSubscriber.create({ email })
    } catch (e) {
      const code =
        typeof e === 'object' && e !== null && 'code' in e
          ? (e as { code: unknown }).code
          : undefined
      if (code === 11_000) {
        return NextResponse.json(
          {
            ok: false,
            code: 'ALREADY_SUBSCRIBED',
            message: ALREADY_SUBSCRIBED_MESSAGE,
          },
          { status: 409 },
        )
      }
      throw e
    }

    return NextResponse.json(
      {
        ok: true,
        message: 'Thanks for subscribing to our newsletter.',
      },
      { status: 201 },
    )
  } catch (e) {
    console.error('[newsletter subscribe]', e)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    )
  }
}
