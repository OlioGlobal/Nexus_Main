import Image from 'next/image'
import { getMediaUrl } from '@/lib/getMediaUrl'

interface ChallengeItem {
  icon?: any
  title: string
  description?: string
  fallbackIcon?: string
}

interface IndustryChallengeSectionProps {
  title?: string
  description?: string
  items?: ChallengeItem[]
}

export default function IndustryChallengeSection({
  title,
  description,
  items = [],
}: IndustryChallengeSectionProps) {
  if (!title && items.length === 0) return null

  return (
    <section className="border-b border-[#CCCCCC]">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">

        {/* Left — sticky title + description */}
        <div className="border-b md:border-b-0 md:border-r border-[#CCCCCC] p-6 md:p-10">
          <div className="sticky top-20">
            {title && (
              <h2
                className="mb-4 text-[#212121]!"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="section-desc text-[#6B6B6B]! text-[15px]! md:text-[16px]!">{description}</p>
            )}
          </div>
        </div>

        {/* Right — challenge items */}
        <div className="flex flex-col">
          {items.map((item, i) => {
            const iconUrl = getMediaUrl(item.icon) || item.fallbackIcon
            return (
              <div
                key={i}
                className={`group flex flex-col gap-3 p-6 md:p-10 transition-colors duration-300 hover:bg-[#212121] ${i < items.length - 1 ? 'border-b border-[#CCCCCC]' : ''}`}
              >
                {iconUrl && (
                  <Image
                    src={iconUrl}
                    alt=""
                    width={48}
                    height={48}
                    className="w-12 h-12 md:w-24 md:h-24 object-contain"
                  />
                )}
                <h3 className="text-[18px]! md:text-[24px]! font-medium transition-colors duration-300 group-hover:text-[#FEF9EF]!" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {item.title}
                </h3>
                {item.description && (
                  <p className="section-desc text-[15px]! md:text-[16px]! transition-colors duration-300 group-hover:text-[#FEF9EF]!">{item.description}</p>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
