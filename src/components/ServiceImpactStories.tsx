'use client'

import Image from 'next/image'
import { getMediaUrl } from '@/lib/getMediaUrl'

interface ImpactStory {
  headline?: string
  description?: string
  image?: { url?: string; alt?: string } | null
  chartLabel?: string
  discoveryTitle?: string
  discoveryIntro?: string
  discoveryPoints?: { point: string }[]
  actionLabel?: string
  actionText?: string
  impactLabel?: string
  impactText?: string
}

interface ServiceImpactStoriesProps {
  sectionTitle?: string
  sectionDescription?: string
  stories?: ImpactStory[]
}

const grotesk = { fontFamily: "'Space Grotesk', sans-serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

function GrowthChart({ label }: { label?: string }) {
  return (
    <div className="w-full h-full min-h-[320px]">
      <svg
        viewBox="0 0 320 260"
        className="w-full h-full block"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[40, 80, 120, 160, 200].map((y) => (
          <line key={y} x1="40" y1={y} x2="290" y2={y} stroke="#CCCCCC" strokeWidth="0.5" />
        ))}
        {[80, 140, 200, 260].map((x) => (
          <line key={x} x1={x} y1="20" x2={x} y2="220" stroke="#CCCCCC" strokeWidth="0.5" />
        ))}

        <path
          d="M 60 200 C 80 198, 100 195, 120 188 C 140 180, 155 170, 165 155 C 175 138, 178 118, 182 95 C 186 72, 188 52, 200 35"
          fill="none"
          stroke="#E05C00"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <circle cx="60" cy="200" r="4" fill="#E05C00" />
        <text x="66" y="216" fill="#888888" fontSize="9" style={grotesk}>
          BASELINE
        </text>

        <line
          x1="165"
          y1="155"
          x2="165"
          y2="220"
          stroke="#CCCCCC"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <circle cx="165" cy="155" r="4" fill="#E05C00" />
        <text x="170" y="216" fill="#888888" fontSize="9" style={grotesk}>
          AI INTERVENTION
        </text>

        <rect x="170" y="22" width="72" height="20" rx="2" fill="#212121" />
        <text x="176" y="35" fill="#E05C00" fontSize="9" fontWeight="600" style={grotesk}>
          {label || '+120% ROI'}
        </text>
        <line x1="200" y1="42" x2="200" y2="35" stroke="#E05C00" strokeWidth="1" />
      </svg>
    </div>
  )
}

export default function ServiceImpactStories({
  sectionTitle,
  sectionDescription,
  stories,
}: ServiceImpactStoriesProps) {
  if (!stories || stories.length === 0) return null

  const title = sectionTitle || 'Impact Stories: Real Stories of AI Transformation'
  const desc = sectionDescription || ''

  return (
    <div className="border-b border-[#CCCCCC]">
      {/* Section header */}
      <div className="px-4 md:px-8 pt-10 pb-8 border-b border-[#CCCCCC]">
        <h2 className="mb-3" style={grotesk}>
          {title}
        </h2>
        {desc && (
          <p
            className="text-[14px]! max-w-3xl md:text-[15px]! leading-[22px]! text-[#6B6B6B]!"
            style={inter}
          >
            {desc}
          </p>
        )}
      </div>

      {/* Stories — stacked */}
      {stories.map((story, idx) => (
        <div key={idx} className="border-b border-[#CCCCCC] last:border-b-0">
          {/* Left + Right */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">
            {/* Left — image or chart */}
            <div className="border-b md:border-b-0 md:border-r border-[#CCCCCC] min-h-[320px]">
              {getMediaUrl(story.image) ? (
                <div className="px-6 md:px-8 py-8 h-full">
                  <div className="relative w-full h-full min-h-[260px]">
                    <Image
                      src={getMediaUrl(story.image)}
                      alt={story.image?.alt || story.headline || ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                </div>
              ) : (
                <GrowthChart label={story.chartLabel} />
              )}
            </div>

            {/* Right — content */}
            <div className="flex flex-col">
              {/* Headline + description */}
              <div className="px-6 md:px-8 py-8 border-b border-[#CCCCCC]">
                <h3
                  className="mb-4 text-[22px]! leading-[30px]! md:text-[26px]! md:leading-[34px]! font-semibold text-[#212121]!"
                  style={grotesk}
                >
                  {story.headline}
                </h3>
                {story.description && (
                  <p
                    className="text-[15px]! leading-[22px]! md:text-[16px]! md:leading-[24px]! text-[#6B6B6B]!"
                    style={inter}
                  >
                    {story.description}
                  </p>
                )}
              </div>

              {/* Discovery box */}
              {(story.discoveryTitle ||
                (story.discoveryPoints && story.discoveryPoints.length > 0)) && (
                <div className="px-6 md:px-8 py-6">
                  {story.discoveryTitle && (
                    <p
                      className="mb-2 text-[15px]! md:text-[16px]! font-medium! text-[#212121]!"
                      style={grotesk}
                    >
                      {story.discoveryTitle}
                    </p>
                  )}
                  {story.discoveryIntro && (
                    <p className="mb-3 text-[14px]! leading-[22px]! text-[#6B6B6B]!" style={inter}>
                      {story.discoveryIntro}
                    </p>
                  )}
                  {story.discoveryPoints && story.discoveryPoints.length > 0 && (
                    <ul className="space-y-1">
                      {story.discoveryPoints.map((dp, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-[14px]! leading-[22px]! text-[#6B6B6B]!"
                          style={inter}
                        >
                          <span className="mt-[6px] shrink-0 w-[5px] h-[5px] rounded-full bg-[#E05C00]" />
                          {dp.point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Full-width dark footer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 bg-[#212121]">
            <div className="px-6 md:px-8 py-6 border-b sm:border-b-0 sm:border-r border-[#333333]">
              <p
                className="mb-2 text-[16px]! md:text-[20px]! font-semibold tracking-widest uppercase"
                style={{ ...grotesk, color: '#E05C00' }}
              >
                {story.actionLabel || 'OUR ACTION'}
              </p>
              <p
                className="text-[15px]! leading-[20px]! md:text-[16px]! md:leading-[22px]!"
                style={{ ...inter, color: '#CCCCCC' }}
              >
                {story.actionText}
              </p>
            </div>
            <div className="px-6 md:px-8 py-6">
              <p
                className="mb-2 text-[16px]! md:text-[20px]! font-semibold tracking-widest uppercase"
                style={{ ...grotesk, color: '#E05C00' }}
              >
                {story.impactLabel || 'MEASURABLE IMPACT'}
              </p>
              <p
                className="text-[15px]! leading-[20px]! md:text-[16px]! md:leading-[22px]!"
                style={{ ...inter, color: '#CCCCCC' }}
              >
                {story.impactText}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
