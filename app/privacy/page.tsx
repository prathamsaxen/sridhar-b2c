'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { privacyContent } from '@/lib/site-content'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {privacyContent.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {privacyContent.lastUpdated}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none space-y-8">
          <p className="text-foreground leading-relaxed">{privacyContent.intro}</p>
          <ul className="list-disc list-inside space-y-3 text-foreground leading-relaxed">
            {privacyContent.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  )
}
