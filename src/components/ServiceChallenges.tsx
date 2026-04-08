'use client'

import { useState } from 'react'

interface ChallengeRow {
  visibleProblem: string
  hiddenProblem: string
}

interface ServiceChallengesProps {
  sectionTitle?: string
  rows: ChallengeRow[]
  conclusion?: string
}

const textStyle = { fontFamily: "'Inter', sans-serif" }
const grotesk = { fontFamily: "'Space Grotesk', sans-serif" }
const mono = { fontFamily: "'Space Mono', monospace" }

export default function ServiceChallenges({
  sectionTitle,
  rows,
  conclusion,
}: ServiceChallengesProps) {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)

  if (!rows || rows.length === 0) return null

  return (
    <div className="border-b border-[#CCCCCC]">

      {/* Section title */}
      {sectionTitle && (
        <div className="px-4 md:px-8 py-8 md:py-12 border-b border-[#CCCCCC]">
          <h2
            className="font-medium text-[22px] leading-[30px] sm:text-[26px] sm:leading-[34px] md:text-[32px] md:leading-[42px] text-[#212121]"
            style={grotesk}
          >
            {sectionTitle}
          </h2>
        </div>
      )}

      {/* ── MOBILE layout (< md): stacked full-width cards, always expanded ── */}
      <div className="md:hidden">
        {rows.map((row, i) => (
          <div key={i}>
            {/* Visible problem card */}
            <div className="px-4 py-6 border-b border-[#CCCCCC]">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-[24px] leading-none font-medium"
                  style={{ ...grotesk, color: '#E05C00' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="uppercase tracking-[0.06em] text-[10px] font-medium"
                  style={{ ...mono, color: '#E05C00' }}
                >
                  Visible Problem
                </span>
              </div>
              <p className="text-[15px] leading-[24px] font-normal text-[#6B6B6B]" style={textStyle}>
                {row.visibleProblem}
              </p>
            </div>

            {/* Hidden problem card */}
            <div className="px-4 py-6 bg-[#F5F0E6] border-b border-[#CCCCCC]">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-[24px] leading-none font-medium"
                  style={{ ...grotesk, color: '#E05C00' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="uppercase tracking-[0.06em] text-[10px] font-medium"
                  style={{ ...mono, color: '#E05C00' }}
                >
                  Hidden Problem
                </span>
              </div>
              <p className="text-[15px] leading-[24px] font-normal text-[#6B6B6B]" style={textStyle}>
                {row.hiddenProblem}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP layout (md+): 2-col grid with hover expand ── */}
      <div className="hidden md:block">
        {/* Column headers */}
        <div className="grid grid-cols-2 border-b border-[#CCCCCC] bg-[#F0EBE0]">
          <div className="px-8 py-5 border-r border-[#CCCCCC]">
            <span className="text-[18px] font-medium text-[#212121]" style={{ ...grotesk, lineHeight: '100%' }}>
              Visible Problem
            </span>
          </div>
          <div className="px-8 py-5">
            <span className="text-[18px] font-medium text-[#212121]" style={{ ...grotesk, lineHeight: '100%' }}>
              Hidden Problem
            </span>
          </div>
        </div>

        {/* Rows */}
        <div className="grid grid-cols-2">
          {rows.map((row, i) => {
            const vKey = `v-${i}`
            const hKey = `h-${i}`
            const vHovered = hoveredCell === vKey
            const hHovered = hoveredCell === hKey
            const borderBottom = i < rows.length - 1 ? 'border-b border-[#CCCCCC]' : ''

            return [
              <div
                key={vKey}
                onMouseEnter={() => setHoveredCell(vKey)}
                onMouseLeave={() => setHoveredCell(null)}
                className={`flex flex-col px-8 py-10 border-r border-[#CCCCCC] min-h-[180px] cursor-default transition-colors duration-300 ${borderBottom} ${vHovered ? 'bg-[#212121]' : ''}`}
              >
                <span
                  className="block mb-4 shrink-0 text-[40px] leading-none"
                  style={{ ...grotesk, fontWeight: 500, color: '#E05C00' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p
                  className="mt-2 text-[16px] leading-[26px] font-normal overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ ...textStyle, color: vHovered ? '#FEF9EF' : '#6B6B6B', maxHeight: vHovered ? '500px' : '26px' }}
                >
                  {row.visibleProblem}
                </p>
              </div>,

              <div
                key={hKey}
                onMouseEnter={() => setHoveredCell(hKey)}
                onMouseLeave={() => setHoveredCell(null)}
                className={`flex flex-col px-8 py-10 min-h-[180px] cursor-default transition-colors duration-300 ${borderBottom} ${hHovered ? 'bg-[#212121]' : ''}`}
              >
                <span
                  className="block mb-4 shrink-0 text-[40px] leading-none"
                  style={{ ...grotesk, fontWeight: 500, color: '#E05C00' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p
                  className="mt-2 text-[16px] leading-[26px] font-normal overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ ...textStyle, color: hHovered ? '#FEF9EF' : '#6B6B6B', maxHeight: hHovered ? '500px' : '26px' }}
                >
                  {row.hiddenProblem}
                </p>
              </div>,
            ]
          })}
        </div>
      </div>

      {/* Conclusion */}
      {conclusion && (
        <div className="px-4 md:px-8 py-6 md:py-8 border-t border-[#CCCCCC] challenges-conclusion">
          <p>{conclusion}</p>
        </div>
      )}
    </div>
  )
}
