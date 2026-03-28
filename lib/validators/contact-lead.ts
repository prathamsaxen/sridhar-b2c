import { z } from 'zod'

import {
  normalizeIndianMobileDigits,
  validateEmail,
  validateIndianMobile,
  validateMessage,
  validateName,
  validateSubject,
} from '@/lib/contact-validation'

export const contactLeadSubmitSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    mobile: z.string(),
    subject: z.string(),
    message: z.string(),
  })
  .superRefine((data, ctx) => {
    const pairs: [keyof typeof data, (v: string) => string | null][] = [
      ['name', validateName],
      ['email', validateEmail],
      ['mobile', validateIndianMobile],
      ['subject', validateSubject],
      ['message', validateMessage],
    ]
    for (const [key, validate] of pairs) {
      const err = validate(data[key])
      if (err) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: err,
          path: [key],
        })
      }
    }
  })

export type ContactLeadSubmitInput = z.infer<typeof contactLeadSubmitSchema>

export function normalizeContactLeadPayload(input: ContactLeadSubmitInput) {
  return {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    mobile: normalizeIndianMobileDigits(input.mobile),
    subject: input.subject.trim(),
    message: input.message.trim(),
  }
}
