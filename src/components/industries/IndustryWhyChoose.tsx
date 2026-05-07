import Image from 'next/image'
import { getMediaUrl } from '@/lib/getMediaUrl'

interface WhyChooseItem {
  image?: any
  title: string
  description?: string
}

interface IndustryWhyChooseProps {
  title?: string
  items?: WhyChooseItem[]
}

// 12-col base grid: normal cards = col-span-3 (4 per row)
// Last row adapts: 1 → span-12, 2 → span-6, 3 → span-4, 4 → span-3
const SPAN: Record<number, string> = {
  1: 'col-span-12',
  2: 'col-span-6',
  3: 'col-span-4',
  4: 'col-span-3',
}

export default function IndustryWhyChoose({ title, items = [] }: IndustryWhyChooseProps) {
  if (!title && items.length === 0) return null

  const PER_ROW = 4
  const remainder = items.length % PER_ROW
  const lastRowCount = remainder === 0 ? PER_ROW : remainder
  const lastRowStart = items.length - lastRowCount

  return (
    <section className="border-b border-[#CCCCCC]">
      {/* Header */}
      <div className="px-4 md:px-8 section-spacing border-b border-[#CCCCCC]">
        {title && <h2 className="max-w-lg">{title}</h2>}
      </div>

      <div className="grid grid-cols-12">
        {items.map((item, i) => {
          const imgUrl = getMediaUrl(item.image)
          const inLastRow = i >= lastRowStart
          const span = inLastRow ? SPAN[lastRowCount] : 'col-span-3'
          const isLastInRow = inLastRow
            ? i === items.length - 1
            : (i + 1) % PER_ROW === 0

          return (
            <div
              key={i}
              className={[
                'group flex flex-col transition-colors duration-300 hover:bg-[#212121]',
                span,
                !inLastRow ? 'border-b border-[#CCCCCC]' : '',
                !isLastInRow ? 'border-r border-[#CCCCCC]' : '',
              ].join(' ')}
            >
              {/* Image with padding */}
              <div className="p-3 md:p-4 pb-0">
                <div className="w-full aspect-16/9 overflow-hidden bg-[#1a1a2e]">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={item.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[#444] text-[11px]">Image coming soon</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 p-4 md:p-6">
                <h3 className="text-[16px]! md:text-[20px]! font-medium leading-[1.3] transition-colors duration-300 group-hover:text-[#FEF9EF]!">{item.title}</h3>
                {item.description && (
                  <p className="section-desc text-[14px]! md:text-[15px]! transition-colors duration-300 group-hover:text-[#FEF9EF]!">{item.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
