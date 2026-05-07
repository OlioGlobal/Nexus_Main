import Image from 'next/image'

interface IndustryPageHeroProps {
  title: string
  description?: string
  cta1Text?: string
  cta1Link?: string
  cta2Text?: string
  cta2Link?: string
}

export default function IndustryPageHero({
  title,
  description,
  cta1Text,
  cta1Link = '/contact',
  cta2Text,
  cta2Link = '/contact',
}: IndustryPageHeroProps) {
  return (
    <div className="border-b border-[#CCCCCC]">
      <div className="relative text-center px-4 md:px-8 py-14 md:py-24 overflow-hidden">
        <Image
          src="/ui/service-bg.svg"
          alt=""
          fill
          className="object-cover object-center pointer-events-none"
          aria-hidden="true"
          priority
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="mb-6">{title}</h1>

          {description && (
            <p className="section-desc max-w-xl mx-auto mb-8">{description}</p>
          )}

          {(cta1Text || cta2Text) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {cta1Text && (
                <a href={cta1Link} className="btn-primary">{cta1Text}</a>
              )}
              {cta2Text && (
                <a href={cta2Link} className="btn-secondary">{cta2Text}</a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Orange glow */}
      <div className="flex justify-center overflow-hidden" style={{ height: '80px', marginTop: '-80px', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            width: '500px',
            height: '160px',
            background: 'radial-gradient(ellipse at 50% 100%, rgba(255,113,0,0.5) 0%, rgba(255,154,0,0.2) 40%, rgba(255,113,0,0) 70%)',
          }}
        />
      </div>
    </div>
  )
}
