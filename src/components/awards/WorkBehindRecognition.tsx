const cards = [
  {
    image: '/awards/expolre-service-card.png',
    title: 'Explore Our Services',
    description:
      'From AI automation to full-stack product development, our capabilities span the complete transformation journey. Every service is built to produce measurable outcomes.',
    buttonText: 'Explore Our Services',
    buttonLink: '/services',
    buttonStyle: 'primary',
  },
  {
    image: '/awards/case-study-card.png',
    title: 'Read Our Case Studies',
    description:
      'Detailed accounts of client challenges, our approach, and the outcomes delivered — with specific metrics and decisions documented at every step.',
    buttonText: 'Read Our Case Studies',
    buttonLink: '/case-studies',
    buttonStyle: 'secondary',
  },
]

export default function WorkBehindRecognition() {
  return (
    <section className="section-divider">
      {/* Header */}
      <div className="px-4 md:px-8 section-spacing border-b border-[#CCCCCC]">
        <h2 className="h2 mb-3">The Work Behind the Recognition</h2>
        <p className="section-desc max-w-lg">
          Recognition is earned through our work. To learn more about our methods, see our case
          studies and service pages.
        </p>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`flex flex-col border-b border-[#CCCCCC]
              ${i === 0 ? 'sm:border-r border-[#CCCCCC]' : ''}
            `}
          >
            {/* Image */}
            <div className="p-4 md:p-6 pb-0">
              <div className="w-full aspect-video overflow-hidden bg-[#E8E3D9]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="px-4 md:px-6 pt-2 pb-4 md:pb-6 flex flex-col gap-2 flex-1 justify-end">
              <h3 className="text-[20px]! md:text-[24px]!">{card.title}</h3>
              <p className="section-desc text-[15px]! md:text-[16px]!">{card.description}</p>
              <div>
                {card.buttonStyle === 'primary' ? (
                  <a href={card.buttonLink} className="btn-primary text-[12px]! md:text-[13px]! h-10! md:h-10!">{card.buttonText}</a>
                ) : (
                  <a href={card.buttonLink} className="btn-secondary text-[12px]! md:text-[13px]! h-10! md:h-10!">{card.buttonText}</a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
