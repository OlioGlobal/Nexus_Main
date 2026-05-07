import Image from 'next/image'

const cards = [
  {
    image: '/industries/process/freepik__abstract-artificial-intelligence-discovery-concept__74283 2.png',
    title: 'Faster implementation and adoption',
    description: 'Team-aligned technology requires less retraining and speeds productive use.',
  },
  {
    image: '/industries/process/freepik__abstract-artificial-intelligence-discovery-concept__74283 2-1.png',
    title: 'Higher return on investment (ROI)',
    description: 'Targeted innovative technology solutions achieve measurable results, not just general productivity improvements.',
  },
  {
    image: '/industries/process/freepik__abstract-artificial-intelligence-discovery-concept__74283 2-2.png',
    title: 'Reduced training time',
    description: 'We design intuitive interfaces for the workflows your team runs. They only need to learn a new tool for the work they already do.',
  },
  {
    image: '/industries/process/freepik__abstract-artificial-intelligence-discovery-concept__74283 2-3.png',
    title: 'Scalable and future-ready architecture',
    description: 'Smart technology solutions built with architectural decisions based on the growth and scaling needs of the business',
  },
]

export default function IndustryProcess() {
  return (
    <section className="section-divider">
      {/* Header */}
      <div className="text-center px-4 md:px-8 section-spacing border-b border-[#CCCCCC]">
        <p className="section-title mb-4">[Process]</p>
        <h2 className="max-w-xl mx-auto">
          Why Industry-Focused Technology Delivers{' '}
          <span style={{ color: '#FF7100' }}>Better Returns</span>
        </h2>
      </div>

      {/* 4-col grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`flex flex-col border-b border-[#CCCCCC]
              ${i % 2 === 0 ? 'sm:border-r border-[#CCCCCC]' : 'sm:border-r-0'}
              ${i % 4 !== 3 ? 'lg:border-r border-[#CCCCCC]' : 'lg:border-r-0'}
            `}
          >
            {/* Image */}
            <div className="p-4 md:p-6 pb-0">
              <div className="w-full overflow-hidden bg-[#1a1a2e] ">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="px-4 md:px-6 pt-4 pb-6 flex flex-col gap-2">
              <h3 className="text-[18px]! md:text-[24px]!">{card.title}</h3>
              <p className="section-desc text-[15px]! md:text-[16px]!">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
