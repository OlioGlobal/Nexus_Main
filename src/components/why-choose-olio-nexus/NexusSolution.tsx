'use client'

import Image from 'next/image'

const problems = [
  {
    icon: '/why-choose-olio-nexus/problem-1.svg',
    title: 'Strategies Miss Real Build Challenges',
    description:
      'Plans are created in isolation, only for the build team to uncover issues late in the process, leading to delays and lost confidence.',
  },
  {
    icon: '/why-choose-olio-nexus/problem-2.svg',
    title: 'Adoption Is An Afterthought',
    description:
      'Even when AI implementation or technology transformation projects launch on time, usage often lags because workflows don’t change, and no one owns ongoing adoption.',
  },
  {
    icon: '/why-choose-olio-nexus/problem-3.svg',
    title: 'Technology Change Management Starts Too Late',
    description:
      'Support arrives only at the end, after resistance has already built up, leaving teams uninvolved and slowing adoption.',
  },
]

export default function NexusSolution() {
  return (
    <section className="bg-[#212121]">
      {/* Header */}
      <div className="border-b border-[#333333] px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-[664px] mx-auto text-center">
          <p
            className="uppercase !text-[#FEF9EF] mb-4"
          >
            [Solutions]
          </p>

          <h2 className="!text-[#FEF9EF] mb-4">
            The Problem With How <br/>Technology Partners Usually Work
          </h2>

          <p className="max-w-[508px] mx-auto">
            When different vendors handle strategy, build, and
            transformation, three problems arise.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {problems.map((item, index) => (
          <div
            key={index}
            className={`px-10 py-10 md:py-12 border-[#333333] ${
              index !== problems.length - 1
                ? 'lg:border-r border-b lg:border-b-0'
                : ''
            }`}
          >
            {/* Icon */}
            <div className="mb-8">
              <Image
                src={item.icon}
                alt={item.title}
                width={96}
                height={96}
                className="object-contain"
              />
            </div>

            {/* Content */}
            <div className="max-w-[374px]">
              <h3 className="!text-[#FEF9EF] mb-2">
                {item.title}
              </h3>

              <p className="!text-[#949494]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}