'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

const nexusValues = [
  {
    title: 'Build with Ownership',
    points: [
      'We start by understanding the business problem, not just the task at hand.',
      'We take responsibility for our work from the first idea to final deployment.',
      'We look beyond our job titles and contribute wherever we can.',
      'We learn fast by trying new things and listening to feedback.',
    ],
  },
  {
    title: 'Solve as One Team',
    points: [
      'Engineers, designers, and consultants work together.',
      'We understand each other’s roles and responsibilities and align on them.',
      'We rely on each other’s expertise and share responsibility for our work.',
      'We build better systems when we work as a team.',
    ],
  },
  {
    title: 'Communicate with Clarity',
    points: [
      'We ask clear and thoughtful questions.',
      'We give honest and helpful feedback.',
      'We make sure our communication is open and respectful.',
      'Clear communication helps us make better decisions.',
    ],
  },
  {
    title: 'Keep Evolving',
    points: [
      'We try new ideas with care.',
      'We keep our curiosity alive for both technology and business.',
      'Learning all the time is part of who we are.',
      'Each project helps us grow and think in new ways.',
    ],
  },
]

export default function NexusWay() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section>
      <div className="flex flex-col lg:flex-row">
        {/* Left */}
        <div className="w-full lg:w-[455px] border-b lg:border-b-0 lg:border-r border-[#CCCCCC]">
          <div className="p-6 md:p-10">
            <h2 className="text-[32px] md:text-[40px] leading-[120%]">
              The NeXus Way
            </h2>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 bg-[#FEF9EF]">
          {nexusValues.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className="border-b border-[#CCCCCC] last:border-b-0"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className={`w-full text-left transition-all duration-300 ${
                    isOpen ? 'py-10 px-6 md:px-10' : 'py-8 px-6 md:px-10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-[24px] leading-8">
                        {item.title}
                      </h3>

                      {isOpen && (
                        <ul className="mt-6 space-y-2">
                          {item.points.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="mt-[9px] h-[5px] w-[5px] rounded-full bg-[#6B6B6B]" />
                              <span className="text-[16px] leading-6">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="shrink-0 pt-1">
                      {isOpen ? (
                        <X size={24} strokeWidth={1.8} />
                      ) : (
                        <Plus size={24} strokeWidth={1.8} />
                      )}
                    </div>
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}