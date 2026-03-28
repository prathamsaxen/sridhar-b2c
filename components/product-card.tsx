'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  description: string
  scent: string
}

export function ProductCard({
  id,
  name,
  price,
  image,
  description,
  scent,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`}>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden rounded-lg bg-secondary mb-4 h-80 flex items-center justify-center">
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-serif font-bold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">{scent}</p>
          <p className="text-sm text-foreground leading-relaxed">{description}</p>
          <div className="flex justify-between items-center pt-2">
            <span className="text-xl font-bold text-primary">${price.toFixed(2)}</span>
            <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded hover:opacity-90 transition-opacity">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
