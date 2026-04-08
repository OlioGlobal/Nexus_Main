import Image from 'next/image'
import Link from 'next/link'
import { getMediaUrl } from '@/lib/getMediaUrl'

interface Post {
  id: string
  slug: string
  title: string
  excerpt?: string
  publishDate?: string
  featuredImage?: { url?: string; alt?: string } | null
  category?: { name?: string } | null
}

const grotesk = { fontFamily: "'Space Grotesk', sans-serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

export default function ServiceResources({
  title = 'Resources & Insights',
  posts = [],
}: {
  title?: string
  posts?: Post[]
}) {
  if (!posts || posts.length === 0) return null

  return (
    <div className="border-b border-[#CCCCCC]">
      {/* Header */}
      <div className="px-4 md:px-8 section-spacing border-b border-[#CCCCCC]">
        <h2 style={grotesk}>{title}</h2>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {posts.map((post, i) => {
          const imgUrl = getMediaUrl(post.featuredImage)
          const categoryName = post.category?.name || 'Blog'
          const date = post.publishDate
            ? new Date(post.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : ''

          return (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className={`flex flex-col overflow-hidden hover:bg-[#f9f5ee] transition-colors duration-200 ${i === 0 ? 'border-r border-[#CCCCCC]' : ''}`}
            >
              {imgUrl && (
                <div className="px-5 md:px-6 pt-5">
                  <div className="relative w-full aspect-16/9 overflow-hidden">
                    <Image
                      src={imgUrl}
                      alt={post.featuredImage?.alt || post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                </div>
              )}

              <div className="px-5 md:px-6 py-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px]! font-medium text-[#E05C00]!" style={inter}>
                    {categoryName}
                  </span>
                  {date && (
                    <span className="text-[13px]! text-[#999999]!" style={inter}>
                      {date}
                    </span>
                  )}
                </div>
                <h3
                  className="mb-2 text-[18px]! leading-[24px]! md:text-[24px]! md:leading-[26px]! font-semibold text-[#212121]!"
                  style={grotesk}
                >
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-[16px]! leading-[20px]! text-[#6B6B6B]! line-clamp-2" style={inter}>
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
