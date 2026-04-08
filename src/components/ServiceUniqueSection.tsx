import Image from 'next/image'

interface UniqueItem {
  icon?: any
  title: string
  description?: string
}

interface ServiceUniqueSectionProps {
  sectionTitle?: string
  items?: UniqueItem[]
  getMediaUrl: (media: any) => string
}

export default function ServiceUniqueSection({
  sectionTitle,
  items,
  getMediaUrl,
}: ServiceUniqueSectionProps) {
  if (!sectionTitle && (!items || items.length === 0)) return null

  return (
    <div className="border-b border-[#CCCCCC]">
      {/* Section title */}
      {sectionTitle && (
        <div className="px-4 md:px-8 section-spacing border-b border-[#CCCCCC]">
          <h2 className="max-w-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {sectionTitle}
          </h2>
        </div>
      )}

      {/* Items grid */}
      {items && items.length > 0 && (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            items.length >= 4
              ? 'lg:grid-cols-4'
              : items.length === 3
                ? 'lg:grid-cols-3'
                : 'lg:grid-cols-2'
          }`}
        >
          {items.map((item, i) => {
            const iconUrl = getMediaUrl(item.icon)
            return (
              <div
                key={i}
                className="flex flex-col px-6 md:px-8 pt-8 pb-10 border-b border-r border-[#CCCCCC] last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
              >
                {/* Icon */}
                {iconUrl ? (
                  <div className="mb-6 h-16 flex items-end">
                    <Image
                      src={iconUrl}
                      alt={item.title}
                      width={500}
                      height={500}
                      className="w-auto h-18 object-contain"
                    />
                  </div>
                ) : (
                  <div className="mb-6 h-16" />
                )}

                {/* Title */}
                <h3
                  className="mb-3 text-[18px]! leading-[24px] md:text-[24px]! md:leading-[32px] font-semibold text-[#212121]!"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                {item.description && (
                  <p
                    className="text-[14px]! leading-[20px] md:text-[16px]! md:leading-[24px] font-normal text-[#6B6B6B]!"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.description}
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
