import DOMPurify from 'isomorphic-dompurify'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import BlogCard from '@/components/BlogCard'
import Divider from '@/components/Divider'
import '../blogs.css'
import { getMediaUrl } from '@/lib/getMediaUrl'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 2,
    limit: 1,
  })

  const post = result.docs[0] as any
  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.title} | OlioNexus`,
    description: post.excerpt || '',
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 2,
    limit: 1,
  })

  const post = result.docs[0] as any
  if (!post) notFound()

  const categoryName = typeof post.category === 'object' ? post.category?.name : ''
  const categoryId = typeof post.category === 'object' ? post.category?.id : post.category
  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  const imageUrl = getMediaUrl(post.featuredImage)

  // Fetch related articles (same category, exclude current)
  const relatedResult = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' },
      category: { equals: categoryId },
      id: { not_equals: post.id },
    },
    depth: 2,
    limit: 3,
    sort: '-publishDate',
  })

  let relatedPosts = relatedResult.docs as any[]

  // If not enough from same category, fill with other posts
  if (relatedPosts.length < 3) {
    const fillResult = await payload.find({
      collection: 'posts',
      where: {
        status: { equals: 'published' },
        id: { not_equals: post.id },
        ...(relatedPosts.length > 0
          ? { id: { not_in: [post.id, ...relatedPosts.map((p: any) => p.id)] } }
          : {}),
      },
      depth: 2,
      limit: 3 - relatedPosts.length,
      sort: '-publishDate',
    })
    relatedPosts = [...relatedPosts, ...fillResult.docs] as any[]
  }

  return (
    <article>
      {/* Header */}
      <div className="section-spacing text-center border-b border-[#CCCCCC]">
        {/* Category + Date */}
        <div className="flex justify-center items-center gap-2.5 mb-4 flex-wrap">
          <span
            className="p-2 font-['Inter'] font-normal text-[14px] leading-4.5 capitalize text-[#6B6B6B]"
            style={{ border: '1px dashed #6B6B6B' }}
          >
            {categoryName}
          </span>
          <span
            className="p-2 font-['Inter'] font-normal text-[14px] leading-4.5 capitalize text-[#6B6B6B]"
            style={{ border: '1px dashed #6B6B6B' }}
          >
            {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-['Space_Grotesk'] font-medium text-[28px] md:text-[40px] leading-[36px] md:leading-[56px] text-[#212121] max-w-3xl mx-auto">
          {post.title}
        </h1>
      </div>

      {/* Featured Image */}
      {imageUrl && (
        <div className="md:mx-16 md:mt-12">
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt || post.title}
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* Content */}
      {post.contentMode === 'html' && post.contentHTML ? (
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.contentHTML) }}
        />
      ) : post.content ? (
        <div className="blog-content">
          <RichText data={post.content} />
        </div>
      ) : null}

      {/* Divider */}
      <Divider />

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section>
          <div className="section-spacing px-4 md:px-8 text-center">
            <h2 className="font-['Space_Grotesk'] font-medium text-[24px] md:text-[32px] leading-[32px] md:leading-[40px] text-[#212121]">
              Related Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relPost: any) => {
              const relImageUrl = getMediaUrl(relPost.featuredImage)
              const relCategoryName =
                typeof relPost.category === 'object' ? relPost.category?.name : ''

              return (
                <BlogCard
                  key={relPost.id}
                  title={relPost.title}
                  slug={relPost.slug}
                  categoryName={relCategoryName}
                  date={relPost.publishDate}
                  imageUrl={relImageUrl}
                  imageAlt={relPost.featuredImage?.alt}
                />
              )
            })}
          </div>

          <div className="-mt-px">
            <Divider />
          </div>
        </section>
      )}
    </article>
  )
}
