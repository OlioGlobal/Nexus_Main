'use client'

import Image from 'next/image'
import { getMediaUrl } from '@/lib/getMediaUrl'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

interface AudienceCard {
  title?: string
  description?: string
  image?: { url?: string; alt?: string } | null
}

interface ServiceAudienceCarouselProps {
  sectionTitle?: string
  items?: AudienceCard[]
}

const grotesk = { fontFamily: "'Space Grotesk', sans-serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

const fallbackItems: AudienceCard[] = [
  {
    title: 'Organizations Exploring AI',
    description:
      "You know artificial intelligence could help, but you're not sure where to start or what's worth the investment. You need AI consulting services to cut through the noise and tell you what's actually achievable with your data, systems, and team.",
    image: null,
  },
  {
    title: 'Teams With Failed Pilots',
    description:
      "You've tried AI projects before: chatbots that no one uses, automation that broke workflows, and AI solutions that promised more than they delivered. You need clarity on why those failed and what would work instead.",
    image: null,
  },
  {
    title: 'Leaders Needing Clarity',
    description:
      "Your team is pushing for AI but you need an honest analysis before committing budget. You need an assessment of what AI can realistically do for your business and where it's just hype.",
    image: null,
  },
  {
    title: 'Enterprises Scaling AI',
    description:
      'You have working prototypes but struggle to move them into production at scale. You need a partner who understands both the technical and operational challenges of enterprise AI deployment.',
    image: null,
  },
]

export default function ServiceAudienceCarousel({
  sectionTitle,
  items,
}: ServiceAudienceCarouselProps) {
  const cards = items && items.length > 0 ? items : fallbackItems
  const title = sectionTitle || 'Who AI Consulting Is For'

  return (
    <div className="border-b border-[#CCCCCC]">
      {/* Section title */}
      <div className="px-4 md:px-8 section-spacing border-b border-[#CCCCCC]">
        <h2 style={grotesk}>{title}</h2>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{ align: 'start', loop: true }}
        plugins={[Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]}
      >
        <CarouselContent className="-ml-0">
          {cards.map((card, i) => {
            const imgUrl = getMediaUrl(card.image)
            return (
              <CarouselItem
                key={i}
                className="pl-0 basis-[85%] sm:basis-1/2 lg:basis-1/3 border-r border-[#CCCCCC]"
              >
                <div className="flex flex-col h-full">
                  {/* Image */}
                  <div className="px-6 md:px-8 pt-8">
                    <div className="relative w-full aspect-4/3 bg-[#212121] overflow-hidden">
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={card.image?.alt || card.title || ''}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[#1a1a1a]" />
                      )}
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex flex-col px-6 md:px-8 py-4 md:py-8 flex-1">
                    <h3
                      className="mb-3 text-[20px]! leading-[28px]! md:text-[22px]! md:leading-[30px]! font-semibold text-[#212121]!"
                      style={grotesk}
                    >
                      {card.title}
                    </h3>
                    {card.description && (
                      <p
                        className="text-[14px]! leading-[22px]! md:text-[15px]! md:leading-[24px]! text-[#6B6B6B]!"
                        style={inter}
                      >
                        {card.description}
                      </p>
                    )}
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
