import Image from 'next/image'
import { getMediaUrl } from '@/lib/getMediaUrl'

interface RealWorldItem {
  icon?: any
  title: string
  description?: string
}

interface IndustryRealWorldProps {
  title?: string
  items?: RealWorldItem[]
}

// 6-col base grid: normal cards = col-span-2 (3 per row)
// Last row adapts: 1 card → span-6, 2 cards → span-3, 3 cards → span-2
const SPAN: Record<number, string> = {
  1: 'col-span-6',
  2: 'col-span-3',
  3: 'col-span-2',
}

export default function IndustryRealWorld({ title, items = [] }: IndustryRealWorldProps) {
  if (!title && items.length === 0) return null

  const PER_ROW = 3
  const remainder = items.length % PER_ROW
  const lastRowCount = remainder === 0 ? PER_ROW : remainder
  const lastRowStart = items.length - lastRowCount

  return (
    <section className="border-b border-[#CCCCCC]">
      {/* Header */}
      <div className="px-4 md:px-8 section-spacing border-b border-[#CCCCCC]">
        {title && <h2 className="max-w-lg">{title}</h2>}
      </div>

      <div className="grid grid-cols-6">
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
                'group flex flex-col justify-between p-6 md:p-10 transition-colors duration-300 hover:bg-[#212121]',
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
                  className="w-12 h-12 md:w-24 md:h-24 object-contain"
                />
              )}
              <div className="mt-auto">
                <h3 className="text-[18px]! md:text-[24px]! mb-2 transition-colors duration-300 group-hover:text-[#FEF9EF]!">{item.title}</h3>
                {item.description && (
                  <p className="section-desc text-[15px]! md:text-[16px]! transition-colors duration-300 group-hover:text-[#FEF9EF]!">{item.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
