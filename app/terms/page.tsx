'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 2024
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none space-y-8">
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-foreground leading-relaxed">
              By accessing and using the Shreedhar Candles website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              2. Use License
            </h2>
            <p className="text-foreground leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on Shreedhar Candles' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              3. Disclaimer
            </h2>
            <p className="text-foreground leading-relaxed">
              The materials on Shreedhar Candles' website are provided on an 'as is' basis. Shreedhar Candles makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              4. Limitations
            </h2>
            <p className="text-foreground leading-relaxed">
              In no event shall Shreedhar Candles or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Shreedhar Candles' website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              5. Accuracy of Materials
            </h2>
            <p className="text-foreground leading-relaxed">
              The materials appearing on Shreedhar Candles' website could include technical, typographical, or photographic errors. Shreedhar Candles does not warrant that any of the materials on its website are accurate, complete, or current. Shreedhar Candles may make changes to the materials contained on its website at any time without notice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              6. Links
            </h2>
            <p className="text-foreground leading-relaxed">
              Shreedhar Candles has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Shreedhar Candles of the site. Use of any such linked website is at the user's own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              7. Modifications
            </h2>
            <p className="text-foreground leading-relaxed">
              Shreedhar Candles may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              8. Governing Law
            </h2>
            <p className="text-foreground leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              9. Product Information
            </h2>
            <p className="text-foreground leading-relaxed mb-4">
              All product descriptions, pricing, and availability information is subject to change without notice. Shreedhar Candles reserves the right to limit quantities and discontinue any product at any time.
            </p>
            <p className="text-foreground leading-relaxed">
              While we strive to ensure all product information is accurate, errors may occur. We are not liable for inaccuracies or omissions in product information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              10. Returns & Refunds
            </h2>
            <p className="text-foreground leading-relaxed">
              We offer a 30-day satisfaction guarantee on all products. If you're not completely satisfied with your purchase, contact us within 30 days for a full refund or replacement. The product must be in its original condition and packaging.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              11. Contact Information
            </h2>
            <p className="text-foreground leading-relaxed">
              If you have any questions about these Terms & Conditions, please contact us at:
            </p>
            <div className="mt-4 text-foreground">
              <p>Email: support@shreedharcandles.com</p>
              <p>Phone: +1 (234) 567-890</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
