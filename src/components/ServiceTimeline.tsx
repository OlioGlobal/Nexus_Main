'use client'

import { useState } from 'react'

interface TimelineItem {
  title: string
  description?: string
}

interface ServiceTimelineProps {
  sectionTitle?: string
  sectionHighlight?: string
  items?: TimelineItem[]
}

const grotesk = { fontFamily: "'Space Grotesk', sans-serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

export default function ServiceTimeline({
  sectionTitle,
  sectionHighlight,
  items,
}: ServiceTimelineProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  if (!sectionTitle && (!items || items.length === 0)) return null

  const cols =
    !items || items.length <= 2
      ? 'md:grid-cols-2'
      : items.length === 3
        ? 'md:grid-cols-3'
        : items.length === 4
          ? 'md:grid-cols-4'
          : 'md:grid-cols-3 lg:grid-cols-5'

  return (
    <div className="border-b border-[#CCCCCC]">
      {/* Section title */}
      {(sectionTitle || sectionHighlight) && (
        <div className="px-4 md:px-8 section-spacing border-b border-[#CCCCCC]">
          <h2 style={grotesk}>
            {sectionTitle && <span>{sectionTitle} </span>}
            {sectionHighlight && <span style={{ color: '#E05C00' }}>{sectionHighlight}</span>}
          </h2>
        </div>
      )}

      {/* Cards */}
      {items && items.length > 0 && (
        <div className={`grid grid-cols-1 ${cols}`}>
          {items.map((item, i) => {
            const isActive = hovered === i
            const isAnyHovered = hovered !== null

            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`relative flex flex-col justify-center px-6 md:px-8 cursor-default
                  border-b border-r border-[#CCCCCC]
                  last:border-r-0
                  sm:[&:nth-child(2n)]:border-r-0
                  ${cols.includes('grid-cols-3') ? 'md:[&:nth-child(2n)]:border-r md:[&:nth-child(3n)]:border-r-0' : ''}
                  transition-colors duration-300`}
                style={{
                  backgroundColor: isActive ? '#212121' : 'transparent',
                  height: '260px',
                }}
              >
                {/* Number */}
                <p
                  className="mb-4 md:mb-6 text-[28px]! md:text-[36px]! leading-none font-medium transition-colors duration-300"
                  style={{
                    ...grotesk,
                    color: isActive ? '#E05C00' : isAnyHovered ? '#C4A882' : '#E05C00',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>

                {/* Title */}
                <h3
                  className="mb-0 text-[18px]! leading-[24px] md:text-[22px]! md:leading-[30px] font-semibold transition-colors duration-300"
                  style={{
                    ...grotesk,
                    color: isActive ? '#FFFFFF' : '#212121',
                  }}
                >
                  {item.title}
                </h3>

                {/* Description — slides in on hover */}
                <div
                  className="overflow-hidden transition-all duration-400 ease-in-out"
                  style={{
                    maxHeight: isActive ? '200px' : '0px',
                    opacity: isActive ? 1 : 0,
                    marginTop: isActive ? '12px' : '0px',
                  }}
                >
                  {item.description && (
                    <p
                      className="text-[14px]! leading-[20px] md:text-[15px]! md:leading-[22px]"
                      style={{ ...inter, color: '#CCCCCC' }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
