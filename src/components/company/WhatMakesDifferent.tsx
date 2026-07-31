import Image from 'next/image'

const differentiators = [
  {
    icon: '/company-profile/nexusdifferenece/Container.svg',
    title: 'NeXus is one team with three capabilities and no handover gaps',
    description:
      'Our consulting, build, and transformation teams remain connected. Each stage informs the next by design.',
  },
  {
    icon: '/company-profile/nexusdifferenece/Container-1.svg',
    title: 'Industry first. Technology second.',
    description:
      'Every engagement starts with an audit. We assess workflows, compliance, dependencies, and sector-specific tech outcomes before making recommendations.',
  },
  {
    icon: '/company-profile/nexusdifferenece/Container-2.svg',
    title: 'You own what we build',
    description:
      'There are no SaaS tools, no lock-in, and no ongoing dependency. Everything is documented and transferable.',
  },
  {
    icon: '/company-profile/nexusdifferenece/Container-3.svg',
    title: 'AI-assisted delivery shortens timelines',
    description:
      'Others take 12–18 months. We deliver in 3–6 months by using AI for research, code, documentation, and testing. This is faster, with no compromise.',
  },
  {
    icon: '/company-profile/nexusdifferenece/Vector.svg',
    title: 'Mid-market attention, without mid-market limits.',
    description:
      'Clients get senior experts from start to finish. A product manager or business analyst keeps you involved throughout development and implementation.',
  },
]

export default function WhatMakesDifferent() {
  return (
    <section className="section-divider">
      {/* Section heading */}
      <div className="px-4 md:px-8 section-spacing border-b border-[#CCCCCC]">
        <h2 className="h2">What Makes NeXus Different</h2>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {differentiators.map((item, i) => (
            <div
              key={i}
              className={`p-6 md:p-10 flex flex-col gap-4 md:gap-8 border-b border-[#CCCCCC] ${i % 2 === 0 ? 'md:border-r border-[#CCCCCC]' : ''}`}
            >
              {/* Icon */}
              <div className="w-28 h-28 flex items-start justify-start">
                <Image
                  src={item.icon}
                  alt={item.title || 'What makes NeXus different'}
                  width={48}
                  height={48}
                  className="w-28 h-28 object-contain"
                />
              </div>

              {/* Text */}
              <div className="mt-auto">
                <h3 className="mb-3">{item.title}</h3>
                <p className="section-desc text-[15px]! md:text-[16px]!">{item.description}</p>
              </div>
            </div>
        ))}
      </div>
    </section>
  )
}
