'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { cn } from '@/lib/utils'
import {
  type ContactErrors,
  type ContactField,
  validateContactForm,
  validateEmail,
  validateIndianMobile,
  validateMessage,
  validateName,
  validateSubject,
} from '@/lib/contact-validation'

const initialForm = {
  name: '',
  email: '',
  mobile: '',
  subject: '',
  message: '',
}

const inputBase =
  'w-full px-4 py-2 bg-background text-foreground border rounded focus:outline-none focus:ring-2'

function fieldClass(error?: string) {
  return cn(
    inputBase,
    error
      ? 'border-destructive focus:ring-destructive focus:border-destructive'
      : 'border-border focus:ring-primary'
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const clearFieldError = (field: ContactField) => {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    clearFieldError(name as ContactField)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const field = name as ContactField
    let err: string | null = null
    switch (field) {
      case 'name':
        err = validateName(value)
        break
      case 'email':
        err = validateEmail(value)
        break
      case 'mobile':
        err = validateIndianMobile(value)
        break
      case 'subject':
        err = validateSubject(value)
        break
      case 'message':
        err = validateMessage(value)
        break
      default:
        break
    }
    setErrors((prev) => {
      if (err) return { ...prev, [field]: err }
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validateContactForm(formData)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData(initialForm)
    setErrors({})
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as
            possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground mb-1">Email</p>
                <a
                  href="mailto:support@luxecandles.com"
                  className="text-primary hover:underline"
                >
                  support@luxecandles.com
                </a>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Phone</p>
                <a href="tel:+1234567890" className="text-primary hover:underline">
                  +1 (234) 567-890
                </a>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Hours</p>
                <p className="text-foreground">
                  Monday - Friday: 9am - 5pm
                  <br />
                  Saturday: 10am - 3pm
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Shipping</h3>
            <p className="text-foreground leading-relaxed mb-4">
              We ship nationwide with care and attention to detail. Orders are typically dispatched within 1-2
              business days.
            </p>
            <p className="text-muted-foreground">
              Standard shipping (3-5 business days) is complimentary on orders over $50.
            </p>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">FAQ</h3>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">
                  How long do candles burn?
                </p>
                <p className="text-sm text-muted-foreground">
                  Our candles typically burn for 30+ hours depending on size.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">Do you offer returns?</p>
                <p className="text-sm text-muted-foreground">
                  Yes, we offer a 30-day satisfaction guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Send us a Message</h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-foreground font-semibold mb-2">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={fieldClass(errors.name)}
                  placeholder="John Doe"
                  autoComplete="name"
                />
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-foreground font-semibold mb-2">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={fieldClass(errors.email)}
                  placeholder="john@example.com"
                  autoComplete="email"
                />
                {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="contact-mobile" className="block text-foreground font-semibold mb-2">
                Mobile Number
              </label>
              <input
                id="contact-mobile"
                type="tel"
                name="mobile"
                inputMode="numeric"
                autoComplete="tel"
                value={formData.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldClass(errors.mobile)}
                placeholder="9876543210"
              />
              {errors.mobile && <p className="mt-1 text-sm text-destructive">{errors.mobile}</p>}
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-foreground font-semibold mb-2">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldClass(errors.subject)}
                placeholder="How can we help?"
              />
              {errors.subject && <p className="mt-1 text-sm text-destructive">{errors.subject}</p>}
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-foreground font-semibold mb-2">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={5}
                className={cn(fieldClass(errors.message), 'resize-none')}
                placeholder="Tell us what you're thinking..."
              />
              {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
