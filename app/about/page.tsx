'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { aboutContent, whyChooseUs } from '@/lib/site-content'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {aboutContent.heroTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {aboutContent.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              {aboutContent.storyHeading}
            </h2>
            {aboutContent.storyParagraphs.map((paragraph, i) => (
              <p key={i} className="text-foreground leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="bg-secondary rounded-lg h-80 flex items-center justify-center">
            <div className="text-6xl">🕯️</div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-12">
            {aboutContent.whyChooseHeading}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="bg-background p-8 rounded-lg border border-border">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
