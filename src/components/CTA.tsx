interface CTAProps {
  data?: {
    headingLine1?: string
    headingLine2?: string
    headingHighlight?: string
    buttonText?: string
    buttonLink?: string
  }
}

export default function CTA({ data }: CTAProps) {
  const line1 = data?.headingLine1 || "We're not here to disrupt everything."
  const line2 = data?.headingLine2 || "We're here to"
  const highlight = data?.headingHighlight || 'build what matters.'
  const btnText = data?.buttonText || 'Schedule a Call'
  const btnLink = data?.buttonLink || '#'

  return (
    <section className="bg-[#212121] px-4 md:px-8 section-spacing">
      <h2 className="text-[#FEF9EF]! mb-6">
        {line1}
        <br />
        {line2} <span className="text-[#FF7100]">{highlight}</span>
      </h2>
      <a href={btnLink} className="btn-primary text-[16px]! text-[#FEF9EF]!">
        {btnText}
      </a>
    </section>
  )
}
