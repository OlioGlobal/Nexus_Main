import Divider from './Divider'

interface ServiceMidCtaProps {
  title?: string
  highlight?: string
  buttonText?: string
  buttonLink?: string
}

export default function ServiceMidCta({
  title,
  highlight,
  buttonText,
  buttonLink,
}: ServiceMidCtaProps) {
  if (!title && !highlight) return null

  return (
    <>
      <Divider />
      <section className="px-4 md:px-8 section-spacing " style={{ backgroundColor: '#212121' }}>
        {title && (
          <h2
            className="font-medium! h2t!  max-w-2xl! "
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: '#FEF9EF',
            }}
          >
            {title}
          </h2>
        )}

        {highlight && (
          <p
            className="mt-2! h2t "
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: '#FF7100',
              fontWeight: 500,
            }}
          >
            {highlight}
          </p>
        )}

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
