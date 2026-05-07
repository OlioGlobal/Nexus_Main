'use client'

import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { getMediaUrl } from '@/lib/getMediaUrl'
import { useEffect, useRef } from 'react'

interface SolutionItem {
  image?: any
  title: string
  description?: string
  tags?: { tag: string }[]
}

interface IndustrySolutionsProps {
  label?: string
  title?: string
  items?: SolutionItem[]
}

export default function IndustrySolutions({ label, title, items = [] }: IndustrySolutionsProps) {
  if (!title && items.length === 0) return null

  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('carousel-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="carousel-section border-b border-[#CCCCCC]">
      {/* Header */}
      <div className="carousel-animate text-center px-4 md:px-8 section-spacing border-b border-[#CCCCCC]">
        {label && <p className="section-title mb-4">{label}</p>}
        {title && <h2 className="max-w-xl mx-auto">{title}</h2>}
      </div>

      {/* Carousel */}
      <div className="carousel-animate-delay">
        <Carousel
          opts={{ align: 'start', loop: true }}
          plugins={[Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]}
        >
          <CarouselContent className="ml-0 select-none">
            {items.map((item, i) => {
              const imgUrl = getMediaUrl(item.image)
              return (
                <CarouselItem
                  key={i}
                  className="pl-0 basis-[85%] sm:basis-[50%] lg:basis-[30%] border-r border-[#CCCCCC]"
                >
                  <div className="group flex flex-col h-full">
                    {/* Image */}
                    <div className="w-full p-3 md:p-4 pb-0 md:pb-0">
                      <div className="w-full aspect-16/9 overflow-hidden bg-[#1a1a2e]">
                        {imgUrl ? (
                          <Image
                            src={imgUrl}
                            alt={item.title}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                            draggable={false}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-[#444] text-[12px]">Image coming soon</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2 p-4 md:p-6 flex-1">
                      <h3 className="text-[18px]! md:text-[24px]! font-medium leading-[1.3] text-[#212121]!">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-[14px]! md:text-[15px]! leading-[1.6] text-[#4A4A4A]!">
                          {item.description}
                        </p>
                      )}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto pt-3">
                          {item.tags.map((t, j) => (
                            <span
                              key={j}
                              className="text-[12px] md:text-[14px] px-3 py-1 border border-[#CCCCCC] text-[#6B6B6B]"
                              style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                              {t.tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
