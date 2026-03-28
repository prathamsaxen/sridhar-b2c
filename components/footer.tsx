'use client'

import Link from 'next/link'
import { NewsletterForm } from '@/components/newsletter-form'
import { siteBrand, siteContact } from '@/lib/site-content'

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">{siteBrand.name}</h3>
            <p className="text-sm opacity-90">{siteBrand.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:opacity-80 transition-opacity">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-80 transition-opacity">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:opacity-80 transition-opacity">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:opacity-80 transition-opacity">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:opacity-80 transition-opacity">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${siteContact.email}`}
                  className="hover:opacity-80 transition-opacity"
                >
                  {siteContact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm opacity-90 mb-3">
              Subscribe to get special offers and new candle releases.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-opacity-20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-90">
            © {new Date().getFullYear()} {siteBrand.name}. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <Link href="/terms" className="hover:opacity-80 transition-opacity">
              Terms
            </Link>
            <Link href="/privacy" className="hover:opacity-80 transition-opacity">
              Privacy
            </Link>
            <a href="#" className="hover:opacity-80 transition-opacity">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
