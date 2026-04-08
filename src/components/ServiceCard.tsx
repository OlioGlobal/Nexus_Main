import Image from 'next/image'
import Link from 'next/link'

interface ServiceCardProps {
  title: string
  slug: string
  tagline?: string
  shortDescription?: string
  imageUrl?: string
  imageAlt?: string
}

export default function ServiceCard({
  title,
  slug,
  tagline,
  shortDescription,
  imageUrl,
  imageAlt,
}: ServiceCardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group flex flex-col border border-[#CCCCCC] -mb-px -mr-px -ml-px -mt-px p-5 md:p-8"
    >
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full aspect-[16/10] overflow-hidden mb-4">
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1">
        {/* Title */}
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

        {/* Tagline / description */}
        {(tagline || shortDescription) && (
          <p
            className="mt-2 line-clamp-2"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: '22px',
              color: '#6B6B6B',
            }}
          >
            {tagline || shortDescription}
          </p>
        )}

        {/* Learn more */}
        <span
          className="mt-4 inline-flex items-center gap-1 uppercase tracking-[0.03em] transition-colors group-hover:text-[#088000]"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: 400,
            fontSize: '13px',
            color: '#212121',
          }}
        >
          Learn more →
        </span>
      </div>
    </Link>
  )
}
