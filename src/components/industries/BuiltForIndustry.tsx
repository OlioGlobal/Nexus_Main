import Image from 'next/image'

const cards = [
  {
    icon: '/industries/Built_for_Industry/Border.svg',
    title: "When systems don't talk to each other",
    description: 'Disconnected platforms create manual work, data duplication, and delays in decision-making. We design an integration architecture that connects the systems your operation depends on, so data flows where it needs to go without a human having to bridge the gap.',
  },
  {
    icon: '/industries/Built_for_Industry/Border-1.svg',
    title: 'When technology gets deployed but is never fully adopted',
    description: 'Teams revert to spreadsheets, workarounds multiply, and the ROI the business case projected never materializes. We build around the workflows your teams actually run, which is the only condition under which adoption follows deployment.',
  },
  {
    icon: '/industries/Built_for_Industry/Border-2.svg',
    title: 'When growth exposes what the current technology cannot handle',
    description: 'A system that worked at half the current scale creates bottlenecks, errors, and manual intervention at the volume the business now runs at. We build with the architectural decisions that account for where the business is going, not just where it is.',
  },
  {
    icon: '/industries/Built_for_Industry/Border-3.svg',
    title: 'When compliance constrains what technology can do',
    description: 'Regulated industries cannot treat compliance as an afterthought. We build compliance configuration, data-handling requirements, and audit architecture into the technology from the first sprint, not as a retrofit after the system is live.',
  },
  {
    icon: '/industries/Built_for_Industry/Border-4.svg',
    title: 'When AI gets introduced before the process is ready',
    description: 'Automation layered onto a broken process makes the inefficiency faster and harder to fix. We optimize the workflow before introducing AI, so the technology accelerates something worth accelerating.',
  },
]

export default function BuiltForIndustry() {
  return (
    <section className="section-divider">
      {/* Header */}
      <div className="px-4 md:px-8 section-spacing border-b border-[#CCCCCC]">
        <h2 className="h2 mb-3 max-w-lg">Built for Your Industry, Ready for Your Challenges</h2>
        <p className="section-desc max-w-sm">
          Our smart technology solutions solve the operational problems that slow businesses down across every industry we work in.
        </p>
      </div>

      {/* Top row — 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {cards.slice(0, 3).map((card, i) => (
          <div
            key={i}
            className={`flex flex-col justify-between p-6 md:p-8 min-h-64 border-b border-[#CCCCCC]
              ${i < 2 ? 'sm:border-r border-[#CCCCCC]' : ''}
            `}
          >
            <Image src={card.icon} alt={card.title} width={80} height={80} className="object-contain mb-8 w-12 h-12 md:w-20 md:h-20" />
            <div className="mt-auto">
              <h3 className="text-[18px]! md:text-[24px]! mb-3">{card.title}</h3>
              <p className="section-desc text-[15px]! md:text-[16px]!">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row — last 2 cards take full space */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {cards.slice(3).map((card, i) => (
          <div
            key={i}
            className={`flex flex-col justify-between p-6 md:p-8 min-h-64 border-b border-[#CCCCCC]
              ${i === 0 ? 'sm:border-r border-[#CCCCCC]' : ''}
            `}
          >
            <Image src={card.icon} alt={card.title} width={80} height={80} className="object-contain mb-8 w-12 h-12 md:w-20 md:h-20" />
            <div className="mt-auto">
              <h3 className="text-[18px]! md:text-[24px]! mb-3">{card.title}</h3>
              <p className="section-desc text-[15px]! md:text-[16px]!">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
