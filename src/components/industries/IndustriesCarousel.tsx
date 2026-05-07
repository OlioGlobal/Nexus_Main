'use client'

import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { industryIcons, fallbackIndustries } from '@/lib/industriesData'
import { getMediaUrl } from '@/lib/getMediaUrl'

interface IndustriesCarouselProps {
  data?: {
    heading?: string
    description?: string
    items?: Array<{
      name?: string
      description?: string
      icon?: { url?: string; alt?: string } | null
    }>
  }
}

export default function IndustriesCarousel({ data }: IndustriesCarouselProps) {
  const heading = data?.heading || 'Industries We Serve'
  const description = data?.description || 'NeXus serves 12 industries, always applying an industry-first approach across all services.'
  const cmsItems = data?.items
  const items = cmsItems && cmsItems.length > 0
    ? cmsItems
    : fallbackIndustries.map((item) => ({ ...item, icon: null }))

  return (
    <section className="section-divider">
      {/* Header */}
      <div className="section-header px-4 md:px-8">
        <h2 className="mb-2">{heading}</h2>
        <p className="section-desc">{description}</p>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{ align: 'start', loop: true }}
        plugins={[Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })]}
      >
        <CarouselContent className="ml-0">
          {items.map((item, i) => (
            <CarouselItem
              key={i}
              className="pl-0 basis-[60%] sm:basis-[33%] md:basis-[25%] border-r border-[#CCCCCC]"
            >
              <div className="group flex flex-col items-center justify-center p-6 md:p-8 text-center min-h-72 md:min-h-96 border-b border-[#CCCCCC] transition-colors duration-300 hover:bg-[#212121] cursor-default">
                {/* Icon */}
                {getMediaUrl(item.icon) ? (
                  <Image
                    src={getMediaUrl(item.icon)}
                    alt={item.icon?.alt || item.name || ''}
                    width={100}
                    height={100}
                    className="h-20 md:h-28 w-16 md:w-24 object-contain mb-6 transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                  />
                ) : item.name && industryIcons[item.name] ? (
                  <div className="h-12 w-12 mb-4 text-[#212121] transition-colors duration-300 group-hover:text-[#FEF9EF]">
                    {industryIcons[item.name]}
                  </div>
                ) : null}

                {/* Name */}
                <span className="font-['Space_Grotesk'] font-medium text-[14px] sm:text-[18px] md:text-[20px] leading-[120%] text-[#212121] transition-colors duration-300 group-hover:text-[#FEF9EF]! wrap-break-word hyphens-auto w-full">
                  {item.name}
                </span>

                {/* Description on hover */}
                {item.description && (
                  <p className="font-['Inter'] font-normal text-[13px]! md:text-[15px]! leading-4 tracking-[-0.01em] text-[#949494] mt-2 max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-32 group-hover:opacity-100">
                    {item.description}
                  </p>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
