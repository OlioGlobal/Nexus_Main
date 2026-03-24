import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Suspense } from 'react'
import BlogCard from '@/components/BlogCard'
import BlogCategoryFilter from '@/components/BlogCategoryFilter'
import Divider from '@/components/Divider'
import { getMediaUrl } from '@/lib/getMediaUrl'

interface Props {
  searchParams: Promise<{ category?: string }>
}

export const metadata = {
  title: 'Blogs | OlioNexus',
  description: 'Insights, strategies, and stories from the OlioNexus team.',
}

export default async function BlogsPage({ searchParams }: Props) {
  const { category } = await searchParams
  const payload = await getPayload({ config: configPromise })

  // Fetch all categories
  const categoriesResult = await payload.find({
    collection: 'categories',
    limit: 100,
    sort: 'name',
  })

  const categories = categoriesResult.docs.map((cat: any) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
  }))

  // Build query for posts
  const postQuery: any = {
    collection: 'posts' as const,
    limit: 50,
    sort: '-publishDate',
    where: {
      status: {
        equals: 'published',
      },
    },
    depth: 2,
  }

  // Filter by category if specified
  if (category && category !== 'all') {
    const matchedCategory = categories.find((c: any) => c.slug === category)
    if (matchedCategory) {
      postQuery.where['category'] = {
        equals: matchedCategory.id,
      }
    }
  }

  const postsResult = await payload.find(postQuery)
  const posts = postsResult.docs as any[]

  return (
    <section>
      {/* Header — left aligned, no gap */}
      <div className="section-spacing px-4 md:px-8">
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            color: '#212121',
          }}
        >
          Blogs
        </h2>
        <p
          className="mt-2 max-w-md"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '-0.01em',
            color: '#6B6B6B',
          }}
        >
          Thought leadership, not content marketing. Deep dives into the intersection of first principles engineering and global business strategy.
        </p>
      </div>

      {/* Divider line */}
      <div className="border-t border-[#CCCCCC]" />

      {/* Category Filter */}
      <div className="px-4 md:px-8 py-4 border-b border-[#CCCCCC]">
        <Suspense fallback={null}>
          <BlogCategoryFilter categories={categories} />
        </Suspense>
      </div>

      {/* Blog Grid */}
      <div>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => {
              const imageUrl = getMediaUrl(post.featuredImage)
              const categoryName =
                typeof post.category === 'object' ? post.category?.name : ''

              return (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  slug={post.slug}
                  categoryName={categoryName}
                  date={post.publishDate}
                  imageUrl={imageUrl}
                  imageAlt={post.featuredImage?.alt}
                />
              )
            })}
          </div>
        ) : (
          <p
            className="text-center py-10"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#6B6B6B',
            }}
          >
            No blog posts found.
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="-mt-px">
        <Divider />
      </div>
    </section>
  )
}
