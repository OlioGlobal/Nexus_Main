import Image from 'next/image'
import { getMediaUrl } from '@/lib/getMediaUrl'

interface GainItem {
  icon?: any
  title: string
  description?: string
}

interface IndustryGainProps {
  title?: string
  items?: GainItem[]
}

// 4-col base grid: normal cards = col-span-2 (2 per row)
// Last row adapts: 1 card → span-4, 2 cards → span-2
const SPAN: Record<number, string> = {
  1: 'col-span-4',
  2: 'col-span-2',
}

export default function IndustryGain({ title, items = [] }: IndustryGainProps) {
  if (!title && items.length === 0) return null

  const PER_ROW = 2
  const remainder = items.length % PER_ROW
  const lastRowCount = remainder === 0 ? PER_ROW : remainder
  const lastRowStart = items.length - lastRowCount

  return (
    <section className="border-b border-[#CCCCCC]">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">

        {/* Left — sticky heading */}
        <div className="border-b md:border-b-0 md:border-r border-[#CCCCCC] p-6 md:p-10">
          <div className="sticky top-20">
            {title && (
              <h2 className="text-[#212121]!" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h2>
            )}
          </div>
        </div>

        {/* Right — adaptive grid */}
        <div className="grid grid-cols-4">
          {items.map((item, i) => {
            const iconUrl = getMediaUrl(item.icon)
            const inLastRow = i >= lastRowStart
            const span = inLastRow ? SPAN[lastRowCount] : 'col-span-2'
            const isLastInRow = inLastRow
              ? i === items.length - 1
              : (i + 1) % PER_ROW === 0
            const isLastRow = inLastRow

            return (
              <div
                key={i}
                className={[
                  'group flex flex-col p-6 md:p-10 transition-colors duration-300 hover:bg-[#212121]',
                  span,
                  !isLastRow ? 'border-b border-[#CCCCCC]' : '',
                  !isLastInRow ? 'border-r border-[#CCCCCC]' : '',
                ].join(' ')}
              >
                {iconUrl && (
                  <Image
                    src={iconUrl}
                    alt={item.title || 'Industry technology solution'}
                    width={56}
                    height={56}
                    className="w-12 h-12 md:w-24 md:h-24 object-contain mb-4"
                  />
                )}
                <h3 className="text-[18px]! md:text-[24px]! mb-2 transition-colors duration-300 group-hover:text-[#FEF9EF]!">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="section-desc text-[15px]! md:text-[16px]! whitespace-pre-line transition-colors duration-300 group-hover:text-[#FEF9EF]!">
                    {item.description}
                  </p>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
