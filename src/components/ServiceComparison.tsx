interface ComparisonItem {
  text: string
}

interface ServiceComparisonProps {
  title?: string
  leftLabel?: string
  rightLabel?: string
  leftItems?: ComparisonItem[]
  rightItems?: ComparisonItem[]
}

export default function ServiceComparison({
  title,
  leftLabel,
  rightLabel,
  leftItems,
  rightItems,
}: ServiceComparisonProps) {
  if (!title && !leftItems?.length && !rightItems?.length) return null

  const grotesk = { fontFamily: "'Space Grotesk', sans-serif" }
  const inter = { fontFamily: "'Inter', sans-serif" }

  return (
    <div className="border-b border-[#CCCCCC]">
      {/* Section title */}
      {title && (
        <div className="px-4 md:px-8 h2t section-spacing border-b border-[#CCCCCC]">
          <h2 className="h2t max-w-lg" style={grotesk}>
            {title}
          </h2>
        </div>
      )}

      {/* Two-column comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* ── Left column: Traditional ── */}
        <div className="border-b md:border-b-0 md:border-r border-[#CCCCCC]">
          {/* Column header */}
          <div className="px-4 md:px-8 py-4 md:py-5 border-b border-[#CCCCCC]">
            <h3 className="font-semibold text-[15px] md:text-[16px] text-[#212121]" style={grotesk}>
              {leftLabel || 'Traditional Approach'}
            </h3>
          </div>

          {/* Items */}
          <ul className="px-4 md:px-8 py-6 md:py-8 flex flex-col gap-4 md:gap-5">
            {leftItems?.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  className="shrink-0 mt-[3px]"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M2.5 2.5L11.5 11.5M11.5 2.5L2.5 11.5"
                    stroke="#9CA3AF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  className="text-[14px] leading-[20px] md:text-[15px] md:leading-[22px] font-normal text-[#6B6B6B]"
                  style={inter}
                >
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right column: NeXus ── */}
        <div className="relative overflow-hidden" style={{ backgroundColor: '#FFF5EC' }}>
          {/* SVG background */}
          <div
            className="absolute inset-0 bg-no-repeat bg-bottom-right bg-fill pointer-events-none"
            style={{ backgroundImage: "url('/ui/nexus-cousulting-column-bg-svg.svg')" }}
          />

          {/* Content above SVG */}
          <div className="relative z-10">
            {/* Column header */}
            <div className="px-4 md:px-8 py-4 md:py-5 border-b border-[#CCCCCC]">
              <h3
                className="font-semibold text-[15px] md:text-[16px]"
                style={{ ...grotesk, color: '#FF7100' }}
              >
                {rightLabel || 'NeXus Approach'}
              </h3>
            </div>

            {/* Items */}
            <ul className="px-4 md:px-8 py-6 md:py-8 flex flex-col gap-4 md:gap-5">
              {rightItems?.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="shrink-0 mt-[2px]"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <circle cx="8" cy="8" r="7" stroke="#FF7100" strokeWidth="1.4" />
                    <path
                      d="M5 8.2L7 10.2L11 6"
                      stroke="#FF7100"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="text-[14px] leading-[20px] md:text-[15px] md:leading-[22px] font-normal text-[#212121]"
                    style={inter}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
