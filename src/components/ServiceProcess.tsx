import Image from 'next/image'

interface ProcessStep {
  icon?: any
  title: string
  description?: string
}

interface ServiceProcessProps {
  sectionTitle?: string
  sectionSubtitle?: string
  steps?: ProcessStep[]
  getMediaUrl: (media: any) => string
}

export default function ServiceProcess({
  sectionTitle,
  sectionSubtitle,
  steps,
  getMediaUrl,
}: ServiceProcessProps) {
  if (!sectionTitle && (!steps || steps.length === 0)) return null

  return (
    <div className="border-b border-[#CCCCCC]">
      {/* Section header */}
      {(sectionTitle || sectionSubtitle) && (
        <div className="px-4 md:px-8 section-spacing border-b border-[#CCCCCC]">
          {sectionTitle && (
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{sectionTitle}</h2>
          )}
          {sectionSubtitle && (
            <p
              className="mt-2 text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] font-normal text-[#6B6B6B]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {sectionSubtitle}
            </p>
          )}
        </div>
      )}

      {/* Steps grid */}
      {steps && steps.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {steps.map((step, i) => {
            const iconUrl = getMediaUrl(step.icon)
            const isRightCol = i % 2 === 1
            const isLastRow = i >= steps.length - 2

            return (
              <div
                key={i}
                className={[
                  'flex flex-col px-6 md:px-10 pt-8 pb-10',
                  'border-b border-[#CCCCCC]',
                  !isRightCol ? 'sm:border-r sm:border-[#CCCCCC]' : '',
                  isLastRow ? 'sm:border-b-0' : '',
                ].join(' ')}
              >
                {/* Icon */}
                {iconUrl ? (
                  <div className="mb-5 h-20 flex items-end">
                    <Image
                      src={iconUrl}
                      alt={step.title}
                      width={64}
                      height={64}
                      className="w-auto h-14 md:h-20 object-contain"
                    />
                  </div>
                ) : (
                  <div className="mb-5 h-14" />
                )}

                {/* Phase label */}
                <p
                  className="mb-3 uppercase tracking-[0.08em] text-[10px] md:text-[11px] font-medium"
                  style={{ fontFamily: "'Space Mono', monospace", color: '#E05C00' }}
                >
                  Phase {String(i + 1).padStart(2, '0')}
                </p>

                {/* Title */}
                <h3
                  className="mb-3 text-[18px]! leading-[24px] md:text-[22px]! md:leading-[30px] font-semibold text-[#212121]!"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                {step.description && (
                  <p
                    className="text-[14px]! leading-[20px] md:text-[15px]! md:leading-[23px] font-normal text-[#6B6B6B]!"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {step.description}
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
