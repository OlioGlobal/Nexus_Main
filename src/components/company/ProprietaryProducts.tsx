'use client'

import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

const products = [
  { image: '/company-profile/software/untangl.png', name: 'Oilo PMP', description: 'Project management platform for multi-project environments. Used internally and for clients.' },
  { image: '/company-profile/software/hrms.png', name: 'Oilo HRMS', description: 'Human resource management system focused on real-world team needs, not just generic features.' },
  { image: '/company-profile/software/digital-dashboard.png', name: 'Oilo Dashboard', description: 'Business intelligence tool providing essential operational insights for leadership decisions.' },
]

export default function ProprietaryProducts() {
  return (
    <section className="section-divider">
      {/* Heading */}
      <div className="px-4 md:px-8 section-spacing border-b border-[#CCCCCC]">
        <h2 className="h2 mb-3">Our Proprietary Products</h2>
        <p className="section-desc max-w-sm">
          NeXus also builds and maintains its own software, allowing teams to experience the
          outcomes of their decisions.
        </p>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{ align: 'start', loop: true }}
        plugins={[Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]}
      >
        <CarouselContent className="ml-0">
          {products.map((product, i) => (
            <CarouselItem
              key={i}
              className="pl-0 basis-[90%] sm:basis-[48%] lg:basis-[46%] border-r border-[#CCCCCC]"
            >
              <div className="flex flex-col h-full p-6 md:p-10">
                {/* Product image */}
                <div className="relative w-full aspect-16/9 min-h-[260px] md:min-h-[320px] overflow-hidden rounded-sm mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>

                {/* Name + description */}
                <h3 className="mb-2">{product.name}</h3>
                <p className="section-desc text-[14px]! md:text-[15px]!">{product.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
