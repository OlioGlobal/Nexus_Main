'use client'

import Image from 'next/image'
import { getMediaUrl } from '@/lib/getMediaUrl'
import { useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

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
    quote:
      'Working with this team was a seamless experience. They understood our requirements quickly and delivered a scalable, high-performance solution ahead of schedule.',
    image: { url: '/temp/testimonials.jpg', alt: 'John Doe' },
  },
  {
    name: 'Jane Cooper',
    role: 'CEO, Java Paper Group',
    quote:
      'Working with this team was a seamless experience. They understood our requirements quickly and delivered a scalable, high-performance solution ahead of schedule. The attention to detail and technical expertise truly set them apart.',
    image: { url: '/temp/testimonials.jpg', alt: 'Jane Cooper' },
  },
  {
    name: 'John Doe',
    role: 'CEO, Java Paper Group',
    quote:
      'Working with this team was a seamless experience. They understood our requirements quickly and delivered a scalable, high-performance solution ahead of schedule.',
    image: { url: '/temp/testimonials.jpg', alt: 'John Doe' },
  },
  {
    name: 'Jane Cooper',
    role: 'CEO, Java Paper Group',
    quote:
      'Working with this team was a seamless experience. They understood our requirements quickly.',
    image: { url: '/temp/testimonials.jpg', alt: 'Jane Cooper' },
  },
  {
    name: 'John Doe',
    role: 'CEO, Java Paper Group',
    quote:
      'Working with this team was a seamless experience. They understood our requirements quickly and delivered a scalable solution.',
    image: { url: '/temp/testimonials.jpg', alt: 'John Doe' },
  },
]

export default function Testimonials({ data }: TestimonialsProps) {
  const label = data?.label || '[Testimonials]'
  const heading = data?.heading || 'What our'
  const highlight = data?.headingHighlight || 'clients'
  const suffix = data?.headingSuffix || 'say about us'
  const items = data?.items && data.items.length > 0 ? data.items : fallbackItems

  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="bg-[#212121]">
      {/* Header */}
      <div className="text-center section-spacing border-b border-[#333333]">
        <p className="section-title mb-4">{label}</p>
        <h2 className="text-white! max-w-xl mx-auto text-center">
          {heading} <span className="text-[#FF7100]">{highlight}</span> {suffix}
        </h2>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent className="-ml-0">
          {items.map((item, i) => {
            const isActive = hovered === i
            return (
              <CarouselItem
                key={i}
                className="pl-0 basis-[85%] sm:basis-1/2 md:basis-1/3"
              >
                <div
                  className="relative min-h-[400px] md:min-h-[500px] border-r border-[#333333] overflow-hidden"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Background Image */}
                  {getMediaUrl(item.image) ? (
                    <Image
                      src={getMediaUrl(item.image)}
                      alt={item.image?.alt || item.name || ''}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#333333]" />
                  )}

                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',
                    }}
                  />

                  {/* Quote overlay — visible on hover */}
                  <div
                    className={`absolute inset-0 bg-[#212121] flex flex-col justify-between p-6 md:p-8 transition-opacity duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div>
                      <Image
                        src="/ui/quote.svg"
                        alt=""
                        width={40}
                        height={32}
                        className="mb-4"
                        aria-hidden="true"
                      />
                      <p
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontWeight: 500,
                          fontSize: '16px',
                          lineHeight: '24px',
                          letterSpacing: '-0.01em',
                          color: '#FEF9EF',
                        }}
                      >
                        {item.quote}
                      </p>
                    </div>

                    <div>
                      <h3
                        className="mb-1"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontWeight: 500,
                          fontSize: '24px',
                          lineHeight: '100%',
                          color: '#FEF9EF',
                        }}
                      >
                        {item.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '24px',
                          letterSpacing: '-0.01em',
                          color: '#999999',
                        }}
                      >
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Name & Role — visible when not hovered */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 transition-opacity duration-500 ${
                      isActive ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <h3
                      className="mb-1"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 500,
                        fontSize: '24px',
                        lineHeight: '100%',
                        color: '#FEF9EF',
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px',
                        letterSpacing: '-0.01em',
                        color: '#999999',
                      }}
                    >
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
