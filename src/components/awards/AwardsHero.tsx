import Image from 'next/image'

const cards = [
  {
    icon: '/awards/hero-section/SVG-f.svg',
    text: 'Technology innovations that solved problems for clients.',
  },
  {
    icon: '/awards/hero-section/SVG.svg',
    text: "External validation of our team's expertise.",
  },
  {
    icon: '/awards/hero-section/SVG-1.svg',
    text: 'Achievement of service and quality standards, not just claims',
  },
]

export default function AwardsHero() {
  return (
    <div className="border-b border-[#CCCCCC]">

      {/* Hero heading section — service-bg.svg as background */}
      <div className="relative text-center px-4 md:px-8 py-14 md:py-24 overflow-hidden">
        <Image
          src="/ui/service-bg.svg"
          alt=""
          fill
          className=""
          aria-hidden="true"
          priority
        />
        <div className="relative z-10">
          <h1 className="mb-4 max-w-2xl mx-auto">
            Industry <span style={{ color: '#FF7100' }}>Recognition</span>
          </h1>
          <p className="section-desc max-w-md mx-auto">
            Each Nexus award reflects a specific achievement
          </p>
        </div>
      </div>

      {/* Cards section — no SVG background */}
      <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-[#CCCCCC]">
        {cards.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col items-center text-center p-8 md:p-10
              ${i < 2 ? 'sm:border-r border-[#CCCCCC]' : ''}
              ${i < 2 ? 'border-b sm:border-b-0 border-[#CCCCCC]' : ''}
            `}
          >
            <Image src={item.icon} alt="" width={80} height={80} className="mx-auto mb-5" />
            <p className="section-desc text-[15px]! md:text-[16px]!">{item.text}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
