'use client'

import Image from 'next/image'

const cards = [
  {
    icon: '/why-choose-olio-nexus/impact-1.svg',
    title: 'From AI Transformation to Business Transformation, We Are One Team',
    description:
      'The same experts drive your project from strategy through build and transformation, without handoffs and misalignment.',
  },
  {
    icon: '/why-choose-olio-nexus/impact-2.svg',
    title: 'Our Strategies Are Grounded in Deliveries',
    description:
      'Our plans are informed by hands-on experience, anticipating integration and data challenges before they become issues.',
  },
  {
    icon: '/why-choose-olio-nexus/impact-3.svg',
    title: 'Technology Solutions that Align with Business Goals',
    description:
      'Every AI and software solution we design aims for scalability and future-readiness. Customizable and totally owned on your servers, these tools are flexible to evolving business or operational needs.',
  },
  {
    icon: '/why-choose-olio-nexus/impact-4.svg',
    title: 'Change Management from Day 1',
    description:
      'We engage your teams early and set everyone up for adoption before launch (from AI and tools training to answering teams’ questions, after analyzing and understanding your business and processes).',
  },
]

export default function TechnologyImpactSection() {
  return (
    <section>
      {/* Header */}
      <div className="flex justify-center px-6 md:px-10 py-[84px] border-b border-[#CCCCCC]">
        <div className="max-w-[593px]">
          <h2 className="text-center">
            How We Solve Technology Impact and Adoption Challenges for
            Businesses?
          </h2>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`
              flex flex-col items-center
              px-[30px]
              py-10
              gap-10
              text-center
              min-h-[500px]
              ${
                index !== cards.length - 1
                  ? 'xl:border-r border-[#CCCCCC]'
                  : ''
              }
              border-b xl:border-b-0 border-[#CCCCCC]
            `}
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-32 h-32 shrink-0">
              <Image
                src={card.icon}
                alt={card.title}
                width={96}
                height={96}
                className="object-contain"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 max-w-[280px]">
              <h3 className="text-center">{card.title}</h3>

              <p className="text-center">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}