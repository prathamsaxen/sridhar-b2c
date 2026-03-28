import { z } from 'zod'

export const newsletterSubscribeSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email is too long'),
})

export type NewsletterSubscribeInput = z.infer<typeof newsletterSubscribeSchema>

export function normalizeNewsletterEmail(email: string): string {
  return email.trim().toLowerCase()
}
