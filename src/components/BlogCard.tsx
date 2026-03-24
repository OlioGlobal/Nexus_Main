import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  title: string
  slug: string
  categoryName: string
  date: string
  imageUrl: string
  imageAlt?: string
}

export default function BlogCard({
  title,
  slug,
  categoryName,
  date,
  imageUrl,
  imageAlt,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="flex flex-col h-full border border-[#CCCCCC] -mb-px -mr-px -ml-px -mt-px p-5 md:p-8">
      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden mb-4">
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        {/* Category + Date tags */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 border border-[#CCCCCC] font-['Inter'] font-medium text-[12px] md:text-[14px] leading-[18px] capitalize text-[#212121]">
            {categoryName}
          </span>
          <span className="px-3 py-1 border border-[#CCCCCC] font-['Inter'] font-medium text-[12px] md:text-[14px] leading-[18px] capitalize text-[#6B6B6B]">
            {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-6 font-['Space_Grotesk'] font-medium text-[18px] md:text-[24px] leading-[26px] md:leading-[32px] text-[#212121] line-clamp-2">
          {title}
        </h3>

        {/* Read Article */}
        <div className="mt-auto">
          <Link
            href={`/blogs/${slug}`}
            className="font-['Space_Mono'] font-normal text-[14px] md:text-[16px] leading-none uppercase tracking-[0.03em] underline underline-offset-4 text-[#212121]"
          >
            READ ARTICLE
          </Link>
        </div>
      </div>
    </div>
  )
}
