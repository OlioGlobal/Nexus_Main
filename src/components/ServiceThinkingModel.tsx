import Image from 'next/image'

interface Principle {
  icon?: any
  title: string
  description?: string
}

interface ServiceThinkingModelProps {
  label?: string
  title?: string
  description?: string
  principles: Principle[]
  getMediaUrl: (media: any) => string
}

export default function ServiceThinkingModel({
  label,
  title,
  description,
  principles,
  getMediaUrl,
}: ServiceThinkingModelProps) {
  if (!title && (!principles || principles.length === 0)) return null

  return (
    <div className="border-b border-[#CCCCCC]">
      {/* Section header */}
      <div className="px-4 md:px-8 py-10 md:py-16 text-center border-b border-[#CCCCCC]">
        {label && (
          <p
            className="mb-4 uppercase tracking-[0.08em] text-[14px]! text-[#6B6B6B]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            [{label}]
          </p>
        )}
        {title && (
          <h2
            className="h2t text-[#212121] max-w-xl mx-auto"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {title}
          </h2>
        )}
        {description && (
          <p
            className="mt-4 text-[16px] leading-[22px]! md:text-[18px]! md:leading-[26px]! font-normal text-[#6B6B6B] max-w-lg mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Principles grid */}
      {principles && principles.length > 0 && (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            principles.length >= 4
              ? 'lg:grid-cols-4'
              : principles.length === 3
                ? 'lg:grid-cols-3'
                : 'lg:grid-cols-2'
          }`}
        >
          {principles.map((p, i) => {
            const iconUrl = getMediaUrl(p.icon)
            return (
              <div
                key={i}
                className="flex flex-col px-6 md:px-8 pt-8 pb-10 border-b border-r border-[#CCCCCC] last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
              >
                {/* Icon */}
                {iconUrl ? (
                  <div className="mb-6 h-20 flex items-end justify-center">
                    <Image
                      src={iconUrl}
                      alt={p.title}
                      width={80}
                      height={80}
                      className="w-auto h-16 object-contain"
                    />
                  </div>
                ) : (
                  <div className="mb-6 h-20" />
                )}

                {/* Title */}
                <h3
                  className="mb-4 text-[18px]! text-center leading-[22px] md:text-[24px]! md:leading-[26px] font-semibold text-[#212121]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {p.title}
                </h3>

                {/* Description */}
                {p.description && (
                  <p
                    className="text-[14px] text-center leading-[20px] md:text-[16px]! md:leading-[22px] font-normal text-[#6B6B6B]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {p.description}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
