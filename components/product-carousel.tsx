'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  scent: string
}

interface ProductCarouselProps {
  products: Product[]
  title?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function ProductCarousel({
  products,
  title = 'Featured Products',
  autoPlay = true,
  autoPlayInterval = 5000,
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, products.length, autoPlayInterval])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
    setIsAutoPlaying(false)
  }

  const visibleProducts = [
    products[currentIndex],
    products[(currentIndex + 1) % products.length],
    products[(currentIndex + 2) % products.length],
    products[(currentIndex + 3) % products.length],
  ]

  return (
    <section className="w-full py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              {title}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-accent via-accent to-accent/30 mx-auto rounded-full" />
          </div>
        )}

        <div className="relative">
          {/* Main Carousel Container */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(autoPlay)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleProducts.map((product, index) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div className="group cursor-pointer h-full">
                    <div className="relative overflow-hidden rounded-lg bg-secondary mb-4 h-80 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-serif font-bold text-foreground group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{product.scent}</p>
                      <p className="text-sm text-foreground leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xl font-bold text-accent">
                          ${product.price.toFixed(2)}
                        </span>
                        <button className="px-4 py-2 bg-accent text-accent-foreground text-sm font-semibold rounded hover:opacity-90 transition-opacity">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/3 -translate-x-4 z-10 p-3 bg-accent text-accent-foreground rounded-full shadow-lg hover:opacity-90 transition-opacity hidden lg:flex items-center justify-center"
            aria-label="Previous products"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/3 translate-x-4 z-10 p-3 bg-accent text-accent-foreground rounded-full shadow-lg hover:opacity-90 transition-opacity hidden lg:flex items-center justify-center"
            aria-label="Next products"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-accent w-8'
                    : 'bg-border w-3 hover:bg-muted-foreground'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
