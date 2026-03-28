'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
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
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
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
              We ship nationwide with care and attention to detail. Orders are typically dispatched within 1-2 business days.
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
                <p className="font-semibold text-foreground text-sm mb-1">
                  Do you offer returns?
                </p>
                <p className="text-sm text-muted-foreground">
                  Yes, we offer a 30-day satisfaction guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
            Send us a Message
          </h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-foreground font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-foreground font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Tell us what you're thinking..."
              />
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
