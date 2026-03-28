export type ContactField = 'name' | 'email' | 'mobile' | 'subject' | 'message'

export type ContactErrors = Partial<Record<ContactField, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Strip to up to 10 digits for Indian mobile (handles +91 / 91 prefix). */
export function normalizeIndianMobileDigits(input: string): string {
  let digits = input.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2)
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1)
  }
  return digits
}

export function validateName(value: string): string | null {
  const v = value.trim()
  if (!v) return 'Name is required'
  if (v.length < 2) return 'Name must be at least 2 characters'
  if (!/^[a-zA-Z\s.'-]+$/.test(v)) {
    return 'Name can only contain letters, spaces, and . - \''
  }
  return null
}

export function validateEmail(value: string): string | null {
  const v = value.trim()
  if (!v) return 'Email is required'
  if (!EMAIL_RE.test(v)) return 'Enter a valid email address'
  return null
}

/**
 * Indian mobile: 10 digits, must start with 6–9 (not 0–5),
 * and the first five digits cannot all be the same.
 */
export function validateIndianMobile(value: string): string | null {
  const v = value.trim()
  if (!v) return 'Mobile number is required'

  const digits = normalizeIndianMobileDigits(v)
  if (digits.length !== 10) {
    return 'Enter a valid 10-digit Indian mobile number'
  }

  const first = digits[0]!
  if (!['6', '7', '8', '9'].includes(first)) {
    return 'Mobile number must start with 6, 7, 8, or 9'
  }

  const firstFive = digits.slice(0, 5)
  if (firstFive.split('').every((d) => d === firstFive[0])) {
    return 'The first five digits cannot all be the same'
  }

  return null
}

export function validateSubject(value: string): string | null {
  const v = value.trim()
  if (!v) return 'Subject is required'
  if (v.length < 3) return 'Subject must be at least 3 characters'
  return null
}

export function validateMessage(value: string): string | null {
  const v = value.trim()
  if (!v) return 'Message is required'
  if (v.length < 10) return 'Message must be at least 10 characters'
  return null
}

export function validateContactForm(data: {
  name: string
  email: string
  mobile: string
  subject: string
  message: string
}): ContactErrors {
  const errors: ContactErrors = {}
  const nameErr = validateName(data.name)
  const emailErr = validateEmail(data.email)
  const mobileErr = validateIndianMobile(data.mobile)
  const subjectErr = validateSubject(data.subject)
  const messageErr = validateMessage(data.message)

  if (nameErr) errors.name = nameErr
  if (emailErr) errors.email = emailErr
  if (mobileErr) errors.mobile = mobileErr
  if (subjectErr) errors.subject = subjectErr
  if (messageErr) errors.message = messageErr

  return errors
}
