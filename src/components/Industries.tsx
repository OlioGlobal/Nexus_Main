import Image from 'next/image'
import { getMediaUrl } from '@/lib/getMediaUrl'
import { industryIcons, fallbackIndustries } from '@/lib/industriesData'

interface IndustriesProps {
  data?: {
    heading?: string
    description?: string
    items?: Array<{
      name?: string
      description?: string
      icon?: { url?: string; alt?: string } | null
    }>
  }
}


export default function Industries({ data }: IndustriesProps) {
  const heading = data?.heading || 'Industries We Serve'
  const description =
    data?.description || 'NeXus serves 12 industries, always applying an industry-first approach across all services.'
  const cmsItems = data?.items

  const items =
    cmsItems && cmsItems.length > 0
      ? cmsItems
      : fallbackIndustries.map((item) => ({ ...item, icon: null }))

  return (
    <section>
      {/* Header */}
      <div className="section-header px-4 md:px-8">
        <h2 className="mb-2">{heading}</h2>
        <p className="section-desc">{description}</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
        {items.map((item, i) => {
          const smBorderR = i % 2 === 0
          const mdBorderR = i % 5 !== 4

          return (
            <div
              key={i}
              className={`group flex flex-col items-center justify-center p-6 md:p-8 text-center min-h-50 md:min-h-92
                border-b border-[#CCCCCC] transition-colors duration-300 hover:bg-[#212121] cursor-default
                ${smBorderR ? 'sm:border-r border-[#CCCCCC]' : ''}
                ${mdBorderR ? 'md:border-r border-[#CCCCCC]' : 'md:border-r-0'}
              `}
            >
              {/* Icon */}
              {getMediaUrl(item.icon) ? (
                <Image
                  src={getMediaUrl(item.icon)}
                  alt={item.icon?.alt || item.name || ''}
                  width={100}
                  height={100}
                  className="h-20 md:h-28 w-16 md:w-24 object-contain mb-6 transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                />
              ) : item.name && industryIcons[item.name] ? (
                <div className="h-12 w-12 mb-4 text-[#212121] transition-colors duration-300 group-hover:text-[#FEF9EF]">
                  {industryIcons[item.name]}
                </div>
              ) : null}

              {/* Name */}
              <span className="font-['Space_Grotesk'] font-medium text-[14px] sm:text-[18px] md:text-[22px] leading-[120%] text-[#212121] transition-colors duration-300 group-hover:text-[#FEF9EF]! wrap-break-word hyphens-auto w-full">
                {item.name}
              </span>

              {/* Description — shows on hover */}
              {item.description && (
                <p className="font-['Inter'] font-normal text-[14px]! md:text-[16px]! leading-4 md:leading-4.5 tracking-[-0.01em] text-[#949494] mt-2 max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-32 group-hover:opacity-100">
                  {item.description}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
