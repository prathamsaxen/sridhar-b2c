'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'

export default function ProductsPage() {
  const allProducts = [
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
    {
      id: '5',
      name: 'Cozy Fireplace',
      price: 35.00,
      image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop',
      description: 'Warm cedarwood and spice for intimate evenings',
      scent: 'Cedar & Cinnamon',
    },
    {
      id: '6',
      name: 'Forest Pine',
      price: 29.00,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop',
      description: 'Fresh pine and eucalyptus for crisp, natural ambiance',
      scent: 'Pine & Eucalyptus',
    },
    {
      id: '7',
      name: 'Honey Bliss',
      price: 31.00,
      image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop',
      description: 'Sweet honey with hints of vanilla and coconut',
      scent: 'Honey & Coconut',
    },
    {
      id: '8',
      name: 'Midnight Garden',
      price: 33.00,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop',
      description: 'Mysterious blend of night-blooming flowers and musk',
      scent: 'Jasmine & Musk',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Our Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Browse our complete range of handcrafted candles. Each one is made with care and premium ingredients.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
