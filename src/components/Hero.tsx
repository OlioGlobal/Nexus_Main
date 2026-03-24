import Image from 'next/image'
import styles from './Hero.module.css'

interface HeroProps {
  data?: {
    headingPrefix?: string
    headingHighlight?: string
    headingSuffix?: string
    description?: string
    heroImage?: { url?: string; alt?: string } | null
    primaryButtonText?: string
    primaryButtonLink?: string
    secondaryButtonText?: string
    secondaryButtonLink?: string
  }
}

export default function Hero({ data }: HeroProps) {
  const prefix = data?.headingPrefix || 'We'
  const highlight = data?.headingHighlight || 'bridge the gap'
  const suffix = data?.headingSuffix || "between what's possible and what's practical."
  const description =
    data?.description ||
    'Technology should amplify human potential, not complicate it. Welcome to the intersection of vision and execution.'
  const heroImageUrl = data?.heroImage?.url || '/ui/hero-svg.png'
  const heroImageAlt = data?.heroImage?.alt || 'Hero illustration'
  const primaryText = data?.primaryButtonText || 'Start a Conversation'
  const primaryLink = data?.primaryButtonLink || '#'
  const secondaryText = data?.secondaryButtonText || 'See Our Work'
  const secondaryLink = data?.secondaryButtonLink || '#'

  return (
    <section className="grid grid-cols-1 md:grid-cols-[3fr_2fr] section-divider">
      {/* Left — Text */}
      <div className="grid-cell flex flex-col justify-center py-16 md:py-24">
        <h1 className="mb-6">
          {prefix} <span style={{ color: '#FF7100' }}>{highlight}</span>{' '}
          {suffix}
        </h1>
        <p className="mb-8 max-w-lg">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href={primaryLink} className="btn-primary">
            {primaryText}
          </a>
          <a href={secondaryLink} className="btn-secondary">
            {secondaryText}
          </a>
        </div>
      </div>

      {/* Right — Hero Image */}
      <div className="flex items-center justify-center overflow-hidden border-b md:border-b-0 border-[#CCCCCC]">
        <Image
          src={heroImageUrl}
          alt={heroImageAlt}
          width={600}
          height={600}
          className={`w-full h-full object-cover ${styles.heroImage}`}
          priority
        />
      </div>
    </section>
  )
}
