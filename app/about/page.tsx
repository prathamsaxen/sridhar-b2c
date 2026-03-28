'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            About Shreedhar Candles
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Crafting moments of warmth and tranquility since 2020.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              Our Story
            </h2>
            <p className="text-foreground leading-relaxed mb-4">
              Shreedhar Candles was born from a passion for creating moments of warmth and tranquility in everyday life. What started as a small hobby in a home studio has grown into a beloved brand trusted by candle enthusiasts across the country.
            </p>
            <p className="text-foreground leading-relaxed mb-4">
              Each candle is carefully handcrafted using premium natural ingredients. We believe in quality over quantity, ensuring every candle meets our high standards before it reaches your home.
            </p>
            <p className="text-foreground leading-relaxed">
              Our mission is simple: to create candles that not only smell incredible but also bring joy, comfort, and ambiance to your spaces.
            </p>
          </div>
          <div className="bg-secondary rounded-lg h-80 flex items-center justify-center">
            <div className="text-6xl">🕯️</div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-12">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-3">Quality</h3>
              <p className="text-muted-foreground">
                We never compromise on quality. Every ingredient is selected for its purity and performance.
              </p>
            </div>
            <div className="bg-background p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-3">Sustainability</h3>
              <p className="text-muted-foreground">
                Eco-friendly practices are at the heart of our business, from packaging to ingredient sourcing.
              </p>
            </div>
            <div className="bg-background p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-3">Craftsmanship</h3>
              <p className="text-muted-foreground">
                Each candle is made by hand with meticulous attention to detail and artisanal care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-12">
          Why We're Different
        </h2>

        <div className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Natural Ingredients
            </h3>
            <p className="text-muted-foreground">
              We use 100% soy and coconut wax blends with pure essential oils and premium fragrances. No synthetic additives.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Hand-Poured
            </h3>
            <p className="text-muted-foreground">
              Every candle is poured by hand in small batches, ensuring consistency and quality in every piece.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Eco-Conscious Packaging
            </h3>
            <p className="text-muted-foreground">
              Our packaging is recyclable and minimal, reflecting our commitment to the environment.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Long-Lasting Performance
            </h3>
            <p className="text-muted-foreground">
              Our candles burn for 30+ hours with consistent, beautiful fragrance from start to finish.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
