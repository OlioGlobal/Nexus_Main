import Divider from './Divider'

interface ServiceProcessCtaProps {
  titlePart1?: string
  highlight1?: string
  titlePart2?: string
  highlight2?: string
  titlePart3?: string
  buttonText?: string
  buttonLink?: string
}

export default function ServiceProcessCta({
  titlePart1,
  highlight1,
  titlePart2,
  highlight2,
  titlePart3,
  buttonText,
  buttonLink,
}: ServiceProcessCtaProps) {
  const hasContent = titlePart1 || highlight1 || titlePart2 || highlight2 || titlePart3
  if (!hasContent) return null

  return (
    <>
      <Divider />
      <section
        className="px-4 md:px-8 section-spacing text-center"
        style={{ backgroundColor: '#212121' }}
      >
        <h2
          className="font-medium! h2t max-w-2xl! mx-auto!"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#FEF9EF',
            lineHeight: '1.4',
          }}
        >
          {titlePart1 && <span>{titlePart1} </span>}
          {highlight1 && <span style={{ color: '#FF7100' }}>{highlight1}</span>}
          {titlePart2 && <span> {titlePart2} </span>}
          {highlight2 && <span style={{ color: '#FF7100' }}>{highlight2}</span>}
          {titlePart3 && <span> {titlePart3}</span>}
        </h2>

        {buttonText && (
          <div className="mt-8 md:mt-10">
            <a href={buttonLink || '/contact'} className="btn-primary">
              {buttonText}
            </a>
          </div>
        )}
      </section>
      <Divider />
    </>
  )
}
