import Image from 'next/image'
import { getMediaUrl } from '@/lib/getMediaUrl'

interface TrustedByProps {
  data?: {
    title?: string
    logos?: Array<{
      logo?: { url?: string; alt?: string } | null
    }>
  }
}

export default function TrustedBy({ data }: TrustedByProps) {
  const title = data?.title || 'Trusted by'
  const logos = data?.logos?.filter((item) => getMediaUrl(item.logo)) || []

  if (logos.length === 0) return null

  // Duplicate for seamless marquee loop
  const duplicated = [...logos, ...logos]

  return (
    <section className="border-b border-[#CCCCCC]">
      <div className="grid grid-cols-[minmax(auto,20%)_1fr] items-stretch">
        {/* Left — Label cell: hugs its content, capped at 20% (max 25%) */}
        <div className="flex items-center border-r border-[#CCCCCC] px-5 md:px-10">
          <p
            className="uppercase text-[12px] md:text-[14px] leading-[16px] tracking-[0.08em] font-medium text-[#212121]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            {title}
          </p>
        </div>

        {/* Right — Scrolling logos (black & white) */}
        <div className="overflow-hidden py-6 md:py-8">
          <div className="flex items-center gap-12 md:gap-16 w-max animate-[marquee_25s_linear_infinite]">
            {duplicated.map((item, i) => (
              <div key={i} className="shrink-0">
                <Image
                  src={getMediaUrl(item.logo)}
                  alt={item.logo?.alt || 'Client logo'}
                  width={160}
                  height={56}
                  className="h-8 md:h-9 w-auto object-contain brightness-0 transition duration-300 hover:brightness-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
