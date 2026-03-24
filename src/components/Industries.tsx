import Image from 'next/image'

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

const fallbackItems = [
  {
    name: 'Real Estate',
    description:
      'We assess where AI reduces support costs, improves property management, and scales real estate operations.',
  },
  {
    name: 'Insurance',
    description:
      'AI-driven claims processing, fraud detection, and customer experience optimization for insurance providers.',
  },
  {
    name: 'Banking & Finance',
    description:
      'Intelligent automation for risk assessment, compliance monitoring, and personalized financial services.',
  },
  {
    name: 'Education & EdTech',
    description:
      'Adaptive learning platforms, automated grading systems, and student engagement analytics.',
  },
  {
    name: 'E-commerce & Retail',
    description:
      'Personalized recommendations, inventory optimization, and AI-powered customer support at scale.',
  },
  {
    name: 'Healthcare',
    description:
      'Clinical decision support, patient flow optimization, and medical image analysis solutions.',
  },
  {
    name: 'Telecommunications',
    description:
      'We assess where AI reduces support costs, improves network optimization, enhances customer retention, and scales service operations.',
  },
  {
    name: 'IT & BPO',
    description:
      'Intelligent process automation, workforce optimization, and AI-augmented service delivery.',
  },
  {
    name: 'Manufacturing',
    description:
      'Predictive maintenance, quality control automation, and supply chain intelligence systems.',
  },
  {
    name: 'Government & Public Sector',
    description:
      'Citizen service automation, policy analysis tools, and secure data management platforms.',
  },
  {
    name: 'Hospitality',
    description:
      'Guest experience personalization, revenue management, and operational efficiency through AI.',
  },
  {
    name: 'Logistics & Transport',
    description:
      'Route optimization, demand forecasting, and autonomous fleet management solutions.',
  },
]

export default function Industries({ data }: IndustriesProps) {
  const heading = data?.heading || 'Industries We Transform'
  const description =
    data?.description || 'We deliver specialized AI consulting across 12 high-impact sectors:'
  const cmsItems = data?.items

  const items =
    cmsItems && cmsItems.length > 0
      ? cmsItems
      : fallbackItems.map((item) => ({ ...item, icon: null }))

  return (
    <section>
      {/* Header */}
      <div className="section-header px-4 md:px-8">
        <h2 className="mb-2">{heading}</h2>
        <p className="section-desc">{description}</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {items.map((item, i) => {
          const isLastCol = (i + 1) % 4 === 0

          return (
            <div
              key={i}
              className={`group flex flex-col items-center justify-center p-6 md:p-8 text-center min-h-50 md:min-h-92
                border-b border-[#CCCCCC] transition-colors duration-300 hover:bg-[#212121] cursor-default
                ${!isLastCol ? 'border-r' : ''}
              `}
            >
              {/* Icon */}
              {item.icon?.url ? (
                <Image
                  src={item.icon.url}
                  alt={item.icon.alt || item.name || ''}
                  width={100}
                  height={100}
                  className="h-20 md:h-28 w-16 md:w-24 object-contain mb-6 transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                />
              ) : (
                <div className="h-12 w-12 mb-3 border border-[#CCCCCC] rounded-md flex items-center justify-center transition-colors duration-300 group-hover:border-[#FEF9EF]">
                  <span className="text-[#CCCCCC] text-2xl transition-colors duration-300 group-hover:text-[#FEF9EF]">
                    &#9671;
                  </span>
                </div>
              )}

              {/* Name */}
              <span className="font-['Space_Grotesk'] font-medium text-[14px] sm:text-[18px] md:text-[22px] leading-[120%] text-[#212121] transition-colors duration-300 group-hover:text-[#FEF9EF]! wrap-break-word hyphens-auto w-full">
                {item.name}
              </span>

              {/* Description — shows on hover, pushes content naturally */}
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
