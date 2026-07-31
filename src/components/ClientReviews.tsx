'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getMediaUrl } from '@/lib/getMediaUrl'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'

interface Item {
  name?: string
  role?: string
  quote?: string
  company?: string
  image?: { url?: string; alt?: string } | null
  logo?: { url?: string; alt?: string } | null
}

interface ClientReviewsProps {
  data?: {
    label?: string
    heading?: string
    headingHighlight?: string
    headingSuffix?: string
    items?: Item[]
  }
}

// How long each review stays before auto-advancing (ms)
const DURATION = 6000

// Minimal fallback data — Payload data overrides this when present.
const fallbackItems: Item[] = [
  {
    name: 'Divya Sankaran',
    role: 'Founder, Beyond Echoes',
    company: 'Beyond Echoes',
    quote:
      'Working with Olio Nexus has been a truly positive experience. The team understood my vision with care and translated it into a website that feels beautiful, intuitive, and deeply aligned with my work.',
  },
  {
    name: 'Atlas Technologies',
    role: 'Product Team',
    company: 'Atlas',
    quote:
      'A reliable partner from start to finish. Clear communication and dependable delivery throughout the engagement.',
  },
  {
    name: 'DSB International School',
    role: 'Program Office',
    company: 'DSB',
    quote:
      'They translated our requirements into a polished, easy-to-use platform that our team genuinely enjoys using.',
  },
]

export default function ClientReviews({ data }: ClientReviewsProps) {
  const label = data?.label || '[Testimonials]'
  const heading = data?.heading || 'What our'
  const highlight = data?.headingHighlight || 'clients'
  const suffix = data?.headingSuffix || 'say about us'
  const items = data?.items && data.items.length > 0 ? data.items : fallbackItems

  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const [api, setApi] = useState<CarouselApi>()

  // Auto-advance: tick the progress bar; when it fills, move to the next card
  // in order (wrapping back to the first after the last).
  useEffect(() => {
    if (paused || items.length <= 1) return
    const step = 40
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + (step / DURATION) * 100
        if (next >= 100) {
          setActive((a) => (a + 1) % items.length)
          return 0
        }
        return next
      })
    }, step)
    return () => clearInterval(id)
  }, [paused, items.length])

  // Slide the Embla strip to the active card. Embla scrolls only its own
  // container, so the page never jumps to this section on auto-advance.
  useEffect(() => {
    api?.scrollTo(active)
  }, [api, active])

  const select = (i: number) => {
    setActive(i)
    setProgress(0)
  }

  const current = items[active] || items[0]
  if (!current) return null

  const avatarUrl = getMediaUrl(current.image)

  return (
    <section
      className="bg-[#212121]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Header */}
      <div className="text-center section-spacing border-b border-[#333333]">
        <p className="section-title mb-4">{label}</p>
        <h2 className="mx-auto max-w-2xl text-center text-white!">
          {heading} <span className="text-[#FF7100]">{highlight}</span> {suffix}
        </h2>
      </div>

      {/* Active review */}
      <div className="flex flex-col items-center px-6 py-16 text-center md:py-24">
        {/* Avatar only renders when a photo is set in Payload */}
        {avatarUrl && (
          <div className="mb-8 h-16 w-16 overflow-hidden rounded-full ring-1 ring-[#333333]">
            <Image
              src={avatarUrl}
              alt={current.image?.alt || current.name || ''}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <p
          className="max-w-3xl"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '26px',
            color: '#FEF9EF',
          }}
        >
          {current.quote}
        </p>

        <div className="mt-8">
          <p
            className="font-medium text-[#FEF9EF]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {current.name}
          </p>
          {current.role && (
            <p
              className="text-sm text-[#999999]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {current.role}
            </p>
          )}
        </div>
      </div>

      {/* Selector cards — Embla slider; auto-advances with a progress bar on the active card */}
      <Carousel
        setApi={setApi}
        opts={{ align: 'center', dragFree: true, containScroll: 'keepSnaps' }}
        className="border-t border-[#333333]"
      >
        <CarouselContent className="ml-0">
          {items.map((item, i) => {
            const isActive = i === active
            const logoUrl = getMediaUrl(item.logo)
            return (
              <CarouselItem
                key={i}
                className="basis-[62%] pl-0 sm:basis-1/3 md:basis-1/5"
              >
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-pressed={isActive}
                  className={`relative flex h-28 w-full items-center justify-center border-r border-[#333333] px-4 transition-colors md:h-32 ${
                    isActive ? 'bg-[#7C4A24]' : 'bg-transparent hover:bg-white/5'
                  }`}
                >
                  {/* Top orange bar — acts as the auto-advance progress bar on the active card */}
                  {isActive ? (
                    <span className="absolute inset-x-0 top-0 h-[3px] bg-[#FF7100]/25">
                      <span
                        className="block h-full bg-[#FF7100]"
                        style={{ width: `${progress}%` }}
                      />
                    </span>
                  ) : (
                    <span className="absolute inset-x-0 top-0 h-[3px] bg-transparent" />
                  )}

                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={item.company || item.name || 'Client logo'}
                      width={160}
                      height={56}
                      className={`h-8 w-auto object-contain transition md:h-10 ${
                        isActive
                          ? 'opacity-100 grayscale-0'
                          : 'opacity-60 grayscale'
                      }`}
                    />
                  ) : (
                    <span
                      className={`text-center text-sm font-semibold uppercase tracking-wide md:text-base ${
                        isActive ? 'text-[#FEF9EF]' : 'text-[#777777]'
                      }`}
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {item.company || item.name}
                    </span>
                  )}
                </button>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
