import Image from 'next/image'
import Link from 'next/link'

interface CaseStudyCardProps {
  title: string
  slug: string
  client: string
  industry: string
  imageUrl: string
  imageAlt?: string
}

export default function CaseStudyCard({
  title,
  slug,
  client,
  industry,
  imageUrl,
  imageAlt,
}: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${slug}`}
      className="group flex flex-col border border-[#CCCCCC] -mb-px -mr-px -ml-px -mt-px p-5 md:p-8 transition-opacity duration-75 active:opacity-60 cursor-pointer"
    >
      {/* Image — padded inside card like reference design */}
      <div className="relative w-full aspect-[16/10] overflow-hidden mb-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            quality={90}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full bg-[#212121]" />
        )}
      </div>

      {/* Content */}
      <div>
        {/* Industry tag */}
        <span
          className="inline-block mb-3 px-2 py-1 capitalize"
          style={{
            border: '1px solid #CCCCCC',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '18px',
            color: '#212121',
          }}
        >
          {industry}
        </span>

        {/* Project title */}
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: '24px',
            lineHeight: '32px',
            color: '#212121',
          }}
        >
          {title}
        </h3>

        {/* Client name */}
        <p
          className="mt-1 capitalize"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#6B6B6B',
          }}
        >
          {client}
        </p>
      </div>
    </Link>
  )
}
