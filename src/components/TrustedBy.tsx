import Image from 'next/image'

interface TrustedByProps {
  data?: {
    title?: string
    logos?: Array<{
      logo?: { url?: string; alt?: string } | null
    }>
  }
}

export default function TrustedBy({ data }: TrustedByProps) {
  const title = data?.title || 'Trusted by industry leaders'
  const logos = data?.logos?.filter((item) => item.logo?.url) || []

  if (logos.length === 0) return null

  // Duplicate for seamless marquee loop
  const duplicated = [...logos, ...logos]

  return (
    <section className="border-b border-[#CCCCCC]">
      <p
        className="text-center py-4"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '20px',
          letterSpacing: '-0.01em',
          color: '#212121',
        }}
      >
        {title}
      </p>

      <div className="overflow-hidden py-6">
        <div className="flex items-center gap-16 w-max animate-[marquee_20s_linear_infinite]">
          {duplicated.map((item, i) => (
            <div key={i} className="shrink-0">
              <Image
                src={item.logo!.url!}
                alt={item.logo?.alt || 'Client logo'}
                width={160}
                height={56}
                className="h-9 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
