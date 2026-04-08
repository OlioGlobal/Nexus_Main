'use client'

import { useState } from 'react'

interface FaqItem {
  question: string
  answer?: string
}

interface ServiceFaqProps {
  sectionTitle?: string
  items?: FaqItem[]
}

const grotesk = { fontFamily: "'Space Grotesk', sans-serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

const fallbackItems: FaqItem[] = [
  {
    question: 'How long does AI consulting take?',
    answer:
      'Typically, 4-6 weeks for a comprehensive AI consulting assessment, depending on operational complexity and the number of use cases being evaluated. Our AI strategy consulting process is thorough but efficient.',
  },
  {
    question: "What's the typical ROI timeline for AI consulting?",
    answer:
      'Most clients see measurable ROI within 3-6 months of implementation. The consulting phase itself often uncovers quick wins that pay for the engagement within the first month.',
  },
  {
    question: 'Do we need technical expertise on our team to work with you?',
    answer:
      'No. We work with leadership and operations teams directly. Our job is to translate technical possibilities into business decisions you can make confidently.',
  },
  {
    question: "What happens if AI doesn't make sense for our operations?",
    answer:
      "We'll tell you. Our value is in honest assessment, not in selling AI for its own sake. If the ROI isn't there, we'll say so and recommend what would actually help.",
  },
  {
    question: 'Do we need to rebuild our systems for AI?',
    answer:
      'Rarely. Most AI solutions we recommend integrate with your existing systems. We design for minimal disruption and maximum compatibility.',
  },
  {
    question: 'How do you handle data privacy and security during consulting?',
    answer:
      'We operate under strict NDAs and follow enterprise data handling standards. We never require access to production data for the assessment phase.',
  },
  {
    question: "What if our data isn't ready for AI?",
    answer:
      "Data readiness is part of what we assess. If your data isn't ready, we'll give you a clear roadmap to get it there — and tell you exactly what it will take.",
  },
]

export default function ServiceFaq({ sectionTitle, items }: ServiceFaqProps) {
  const title = sectionTitle || 'Frequently Asked Questions'
  const faqs = items && items.length > 0 ? items : fallbackItems

  const [open, setOpen] = useState<number>(0)

  return (
    <div className="border-b border-[#CCCCCC]">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Left — sticky title */}
        <div className="px-6 md:px-8 py-10 md:py-14 md:border-r border-[#CCCCCC]">
          <div className="sticky top-18">
            <h2 className="" style={grotesk}>
              {title}
            </h2>
          </div>
        </div>

        {/* Right — accordion */}
        <div>
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="border-b border-[#CCCCCC] last:border-b-0">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between px-6 md:px-8 py-5 text-left transition-colors duration-200 hover:bg-[#f9f5ee] cursor-pointer"
                >
                  <span
                    className="text-[18px]! md:text-[22px]! font-medium text-[#212121]! pr-4"
                    style={grotesk}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="shrink-0 text-[20px] leading-none text-[#212121] transition-transform duration-200"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '400px' : '0px', opacity: isOpen ? 1 : 0 }}
                >
                  <p
                    className="px-6 md:px-8 pb-6 text-[16px]! leading-[20px]! md:text-[18px]! md:leading-[22px]! text-[#6B6B6B]!"
                    style={inter}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
