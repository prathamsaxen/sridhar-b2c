'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCarousel } from '@/components/product-carousel'
import { siteBrand, whyChooseUs } from '@/lib/site-content'
import Link from 'next/link'

export default function Home() {
  const featuredProducts = [
    {
      id: '1',
      name: 'Lavender Dreams',
      price: 32.00,
      image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop',
      description: 'A soothing blend of lavender and chamomile for peaceful evenings',
      scent: 'Lavender & Chamomile',
    },
    {
      id: '2',
      name: 'Vanilla Essence',
      price: 28.00,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop',
      description: 'Classic vanilla warmth with subtle notes of amber and musk',
      scent: 'Vanilla & Amber',
    },
    {
      id: '3',
      name: 'Rose Garden',
      price: 34.00,
      image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop',
      description: 'Elegant rose petals blended with fresh botanical notes',
      scent: 'Rose & Peony',
    },
    {
      id: '4',
      name: 'Ocean Breeze',
      price: 30.00,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop',
      description: 'Fresh and crisp scent reminiscent of a coastal getaway',
      scent: 'Sea Salt & Citrus',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-72 h-72 bg-accent rounded-full mix-blend-screen blur-3xl" />
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-accent/50 rounded-full mix-blend-screen blur-3xl" />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-background mb-4 text-balance">
            {siteBrand.heroTitle}
          </h1>
          <p className="text-xl text-background/80 mb-8 text-balance">
            {siteBrand.heroSubtitle}
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <ProductCarousel 
        products={featuredProducts}
        title="Our Featured Collection"
        autoPlay={true}
        autoPlayInterval={6000}
      />

      {/* Why Choose Us Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-foreground text-center mb-12">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-lg bg-background/50 border border-border hover:border-accent/50 transition-colors"
              >
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-accent/90 to-accent py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-serif font-bold text-accent-foreground mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-accent-foreground/90 mb-8">
            Browse our complete collection and find your perfect scent.
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-accent-foreground text-accent font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            Explore All Products
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
