import type { ReactElement } from 'react'
import Image from 'next/image'
import { getMediaUrl } from '@/lib/getMediaUrl'

const industryIcons: Record<string, ReactElement> = {
  'Real Estate': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="6" y="22" width="36" height="22" rx="1" stroke="currentColor" strokeWidth="2"/>
      <path d="M2 24L24 6L46 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="18" y="30" width="12" height="14" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  'Insurance': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M24 4L8 10V24C8 33 16 40 24 44C32 40 40 33 40 24V10L24 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M16 24L21 29L32 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Banking & Finance': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="4" y="20" width="40" height="4" stroke="currentColor" strokeWidth="2"/>
      <rect x="4" y="36" width="40" height="4" stroke="currentColor" strokeWidth="2"/>
      <rect x="8" y="24" width="4" height="12" stroke="currentColor" strokeWidth="2"/>
      <rect x="22" y="24" width="4" height="12" stroke="currentColor" strokeWidth="2"/>
      <rect x="36" y="24" width="4" height="12" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 20L24 8L44 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'Education & EdTech': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M24 8L44 18L24 28L4 18L24 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M12 23V34C12 34 16 40 24 40C32 40 36 34 36 34V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M44 18V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'E-commerce & Retail': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M6 8H10L14 28H38L42 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="36" r="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="34" cy="36" r="3" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  'Healthcare': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M24 14V34M14 24H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'Telecommunications': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M8 40C8 40 14 28 24 28C34 28 40 40 40 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M2 32C2 32 10 14 24 14C38 14 46 32 46 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 46C14 46 18 34 24 34C30 34 34 46 34 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="24" cy="22" r="2" fill="currentColor"/>
    </svg>
  ),
  'IT & BPO': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="4" y="8" width="40" height="28" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 40H32M24 36V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 20L18 24L14 28M22 28H30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Manufacturing': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M4 36V20L14 26V20L24 26V20L34 26V20L44 14V36H4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="10" y="28" width="6" height="8" stroke="currentColor" strokeWidth="2"/>
      <rect x="22" y="28" width="6" height="8" stroke="currentColor" strokeWidth="2"/>
      <rect x="34" y="28" width="6" height="8" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  'Government & Public Sector': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M4 44H44M4 20H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 8L44 20H4L24 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="10" y="20" width="6" height="24" stroke="currentColor" strokeWidth="2"/>
      <rect x="22" y="20" width="4" height="24" stroke="currentColor" strokeWidth="2"/>
      <rect x="32" y="20" width="6" height="24" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  'Hospitality': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M4 40H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 40V20C8 14 14 10 24 10C34 10 40 14 40 20V40" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 20H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="20" y="28" width="8" height="12" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  'Logistics & Transport': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="2" y="16" width="28" height="20" rx="1" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 24H38L46 32V36H30V24Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="10" cy="38" r="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="38" cy="38" r="4" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
}

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
