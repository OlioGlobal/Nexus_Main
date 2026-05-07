interface CTAProps {
  data?: {
    headingLine1?: string
    headingLine2?: string
    headingHighlight?: string
    description?: string
    buttonText?: string
    buttonLink?: string
    secondaryButtonText?: string
    secondaryButtonLink?: string
  }
  center?: boolean
}

export default function CTA({ data, center }: CTAProps) {
  const line1 = data?.headingLine1 || "We're not here to disrupt everything."
  const line2 = data?.headingLine2 || "We're here to"
  const highlight = data?.headingHighlight || 'build what matters.'
  const description = data?.description
  const btnText = data?.buttonText || 'Schedule a Call'
  const btnLink = data?.buttonLink || '#'
  const secBtnText = data?.secondaryButtonText
  const secBtnLink = data?.secondaryButtonLink || '#'

  return (
    <section className={`bg-[#212121] px-4 md:px-8 section-spacing ${center ? 'text-center flex flex-col items-center' : ''}`}>
      <h2 className={`text-[#FEF9EF]! mb-4 ${center ? 'max-w-2xl' : ''}`}>
        {line1}
        {line2 && <><br />{line2} </>}
        <span className="text-[#FF7100]">{highlight}</span>
      </h2>
      {description && (
        <p className="section-desc text-[#949494]! max-w-xl mb-6">{description}</p>
      )}
      <div className={`flex flex-col sm:flex-row gap-4 ${center ? 'justify-center' : ''}`}>
        <a href={btnLink} className="btn-primary text-[11px]! md:text-[14px]! lg:text-[16px]! text-[#FEF9EF]! whitespace-nowrap h-auto! py-3!">
          {btnText}
        </a>
        {secBtnText && (
          <a href={secBtnLink} className="btn-secondary text-[11px]! md:text-[14px]! lg:text-[16px]! whitespace-nowrap h-auto! py-3! border-[#949494]! text-[#FEF9EF]! hover:bg-[#949494]!">
            {secBtnText}
          </a>
        )}
      </div>
    </section>
  )
}
