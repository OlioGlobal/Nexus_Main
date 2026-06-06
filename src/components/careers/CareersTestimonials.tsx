'use client'

import Image from 'next/image'
import { useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { getMediaUrl } from '@/lib/getMediaUrl'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

interface TestimonialsProps {
  data?: {
    label?: string
    heading?: string
    headingHighlight?: string
    headingSuffix?: string
    items?: Array<{
      name?: string
      role?: string
      quote?: string
      image?: { url?: string; alt?: string } | null
    }>
  }
}

const fallbackItems = [
  {
    name: 'John Doe',
    role: 'CEO, Java Paper Group',
    quote: 'A place where engineering and business problem-solving truly come together.',
    image: { url: '/careers/testimonial-1.png', alt: 'John Doe' },
  },
  {
    name: 'Jane Cooper',
    role: 'CEO, Java Paper Group',
    quote: 'Working here gave me the freedom to solve meaningful problems at scale.',
    image: { url: '/careers/testimonial-2.png', alt: 'Jane Cooper' },
  },
  {
    name: 'John Doe',
    role: 'CEO, Java Paper Group',
    quote: 'An environment where speed, ownership, and innovation actually matter.',
    image: { url: '/careers/testimonial-3.png', alt: 'John Doe' },
  },
]

export default function CareersTestimonials({ data }: TestimonialsProps) {
  const label = data?.label || '[Testimonials]'
  const heading = data?.heading || 'What Our'
  const highlight = data?.headingHighlight || 'Team'
  const suffix = data?.headingSuffix || 'Says'

  const items = data?.items?.length ? data.items : fallbackItems

  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="w-full">
      {/* Header */}
      <div className="h-[320px] bg-[#FEF9EF] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="uppercase text-[14px] tracking-[0.03em] mb-4">
            {label}
          </p>

          <h2 className="text-[32px] md:text-[40px] leading-[140%]">
            {heading}{' '}
            <span className="text-[#FF7100]">{highlight}</span> {suffix}
          </h2>
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{ align: 'start', loop: true }}
        plugins={[
          Autoplay({
            delay: 3500,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent className="ml-0">
          {items.map((item, i) => {
            const isHovered = hovered === i

            return (
              <CarouselItem
                key={i}
                className="pl-0 basis-[85%] sm:basis-1/2 md:basis-1/3"
              >
                <div
                  className="relative h-[480px] overflow-hidden border-r border-[#CCCCCC] group"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Image */}
                  {getMediaUrl(item.image) ? (
                    <Image
                      src={getMediaUrl(item.image)}
                      alt={item.image?.alt || item.name || ''}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className={`object-cover transition-all duration-500 ${
                        isHovered ? 'scale-105 blur-[2px]' : 'scale-100'
                      }`}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#212121]" />
                  )}

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-black/40" />

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0) 0%, #000000 100%)',
                    }}
                  />

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-[#212121]/95 p-10 flex flex-col justify-between transition-all duration-500 ${
                      isHovered
                        ? 'opacity-100'
                        : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                  >
                    <div>
                      <div className="text-[#FEF9EF] text-[72px] leading-none mb-4">
                        “
                      </div>

                      <p className="text-[16px] leading-6 max-w-[360px] text-[#FEF9EF]">
                        {item.quote}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-[24px] leading-[31px] text-[#FEF9EF] mb-1">
                        {item.name}
                      </h3>

                      <p className="text-[16px] leading-6 text-[#A1A1A1]">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Default Bottom Content */}
                  <div
                    className={`absolute bottom-10 left-10 z-10 transition-all duration-500 ${
                      isHovered
                        ? 'opacity-0 translate-y-4'
                        : 'opacity-100'
                    }`}
                  >
                    <h3 className="text-[24px] leading-[31px] text-[#FEF9EF] mb-1">
                      {item.name}
                    </h3>

                    <p className="text-[16px] leading-6 text-[#FEF9EF]">
                      {item.role}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </section>
  )
}