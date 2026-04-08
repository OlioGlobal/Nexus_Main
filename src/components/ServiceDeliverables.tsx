'use client'

import { useEffect, useRef, useState } from 'react'

interface Deliverable {
  title: string
  description?: string
  whyItExists?: string
  businessImpact?: string
  riskMitigation?: string
}

interface ServiceDeliverablesProps {
  sectionTitle?: string
  sectionSubtitle?: string
  deliverables?: Deliverable[]
}

const grotesk = { fontFamily: "'Space Grotesk', sans-serif" }
const inter = { fontFamily: "'Inter', sans-serif" }
const mono = { fontFamily: "'Space Mono', monospace" }

const STACK_OFFSET = 0
const TOP_OFFSET = 50

export default function ServiceDeliverables({
  sectionTitle,
  sectionSubtitle,
  deliverables,
}: ServiceDeliverablesProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!deliverables?.length) return
    const observers = cardRefs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i)
        },
        { threshold: 0.3 },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [deliverables?.length])

  if (!sectionTitle && (!deliverables || deliverables.length === 0)) return null

  return (
    <div className="border-b border-[#CCCCCC]" style={{ backgroundColor: '#FEF9EF' }}>
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
        {/* ── Sticky left label ── */}
        <div className="md:sticky md:top-12 md:self-start px-4 md:px-8 pt-10 pb-4 md:py-12 border-[#CCCCCC]">
          {sectionTitle && (
            <h2 className="text-[#212121]!" style={{ ...grotesk, lineHeight: '1.2' }}>
              {sectionTitle}
            </h2>
          )}
          {sectionSubtitle && (
            <p
              className="mt-1 font-medium text-[18px] leading-[24px] md:text-[22px] md:leading-[28px] lg:text-[26px] lg:leading-[32px]"
              style={{ ...grotesk, color: '#E05C00' }}
            >
              {sectionSubtitle}
            </p>
          )}
        </div>

        {/* ── Right: stacking cards ── */}
        <div className="relative">
          {deliverables?.map((item, i) => {
            const isActive = activeIndex === i
            const isStacked = i < activeIndex

            return (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className="sticky transition-colors duration-300"
                style={{
                  top: TOP_OFFSET + i * STACK_OFFSET,
                  zIndex: i + 1,
                  backgroundColor: '#FEF9EF',
                  borderLeft: '1px solid #DDCFBF',
                  borderBottom: '1px solid #CCCCCC',
                }}
              >
                {/* ── Header ── */}
                <div
                  className="px-4 md:px-8 pt-8 pb-6 transition-colors duration-300"
                  style={{ backgroundColor: isStacked ? '#FEE5CB' : '#FEF9EF' }}
                >
                  <p
                    className=" mb-5 md:mb-8 text-[28px]! md:text-[40px]!  leading-none font-medium transition-colors duration-300"
                    style={{ ...grotesk, color: isActive ? '#FF7100CC' : '#E05C00' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3
                    className="mb-2 font-semibold text-[16px] leading-[22px] md:text-[18px] md:leading-[26px] transition-colors duration-300 text-[#212121]!"
                    style={{ ...grotesk, color: isActive ? '#212121' : '#6B6B6B' }}
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p
                      className="text-[15px]! leading-[19px] md:text-[16px]! md:leading-[21px] text-[#6B6B6B]"
                      style={inter}
                    >
                      {item.description}
                    </p>
                  )}
                </div>

                {/* ── Why It Exists — full width ── */}
                {item.whyItExists && (
                  <div className="px-4 md:px-8 py-5 border-t border-[#DDCFBF]">
                    <p
                      className="mb-2 text-[15px] font-medium! md:text-[16px]  uppercase tracking-[0.06em] text-[#212121]!"
                      style={{ ...mono, color: '#999' }}
                    >
                      Why It Exists:
                    </p>
                    <p
                      className="text-[15px]! leading-[19px] md:text-[16px]! md:leading-[21px] text-[#6B6B6B]"
                      style={inter}
                    >
                      {item.whyItExists}
                    </p>
                  </div>
                )}

                {/* ── Business Impact + Risk Mitigation — full width grid ── */}
                {(item.businessImpact || item.riskMitigation) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[#DDCFBF]">
                    {item.businessImpact && (
                      <div className="px-4 md:px-8 py-5 border-b sm:border-b-0 sm:border-r border-[#DDCFBF]">
                        <p
                          className="mb-2 text-[15px] font-medium! md:text-[16px]  uppercase tracking-[0.06em] text-[#212121]!"
                          style={{ ...mono, color: '#999' }}
                        >
                          Business Impact:
                        </p>
                        <p
                          className="text-[15px]! leading-[19px] md:text-[16px]! md:leading-[21px] text-[#6B6B6B]"
                          style={inter}
                        >
                          {item.businessImpact}
                        </p>
                      </div>
                    )}
                    {item.riskMitigation && (
                      <div className="px-4 md:px-8 py-5">
                        <p
                          className="mb-2 text-[15px] font-medium! md:text-[16px]  uppercase tracking-[0.06em] text-[#212121]!"
                          style={{ ...mono, color: '#999' }}
                        >
                          Risk Mitigation:
                        </p>
                        <p
                          className="text-[15px]! leading-[19px] md:text-[16px]! md:leading-[21px] text-[#6B6B6B]"
                          style={inter}
                        >
                          {item.riskMitigation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
