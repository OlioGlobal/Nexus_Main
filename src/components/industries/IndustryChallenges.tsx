'use client'

import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

const cards = [
  {
    icon: '/industries/challenges/Border.svg',
    description: 'Factory automation dashboards that surface the production signals operations managers act on — not the generic metrics a standard platform surfaces by default.',
  },
  {
    icon: '/industries/challenges/SVG.svg',
    description: 'AI tools for education that we train on the institution\'s own content and student communication patterns — not a general-purpose chatbot configured with a university logo.',
  },
  {
    icon: '/industries/challenges/SVG-1.svg',
    description: 'We build CRM systems for real estate that reflect how property sales actually flow, qualification criteria, matching logic, and transaction stages that align with the business, not a generic pipeline template.',
  },
  {
    icon: '/industries/challenges/SVG-2.svg',
    description: 'Patient data management platforms with the data isolation, access controls, and audit trails healthcare compliance requires, not security added after the platform was built for a less regulated environment.',
  },
  {
    icon: '/industries/challenges/SVG-3.svg',
    description: 'Workflow automation tools that remove steps that should not exist in the first place, not automation layered onto a broken process that makes inefficiencies faster and harder to see.',
  },
]

export default function IndustryChallenges() {
  return (
    <section className="section-divider">
      {/* Header */}
      <div className="text-center px-4 md:px-8 section-spacing border-b border-[#CCCCCC]">
        <h2 className="max-w-xl mx-auto">
          Real Solutions Built for Real Industry Challenges
        </h2>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{ align: 'start', loop: true }}
        plugins={[Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]}
      >
        <CarouselContent className="ml-0">
          {cards.map((card, i) => (
            <CarouselItem
              key={i}
              className="pl-0 basis-[85%] sm:basis-[50%] lg:basis-[25%] border-r border-[#CCCCCC]"
            >
              <div className="flex flex-col gap-4 md:gap-8 justify-between p-6 md:p-8 ">
                <Image
                  src={card.icon}
                  alt=""
                  width={72}
                  height={72}
                  className="w-14 h-14 md:w-16 md:h-16 object-contain "
                />
                <p className="section-desc text-[14px]! md:text-[15px]! mt-auto">{card.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
