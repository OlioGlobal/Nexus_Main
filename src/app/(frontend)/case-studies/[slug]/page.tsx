import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import CaseStudyCard from '@/components/CaseStudyCard'
import Divider from '@/components/Divider'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getMediaUrl } from '@/lib/getMediaUrl'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'case-studies',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 2,
    limit: 1,
  })

  const cs = result.docs[0] as any
  if (!cs) return { title: 'Case Study Not Found' }

  return {
    title: `${cs.title} | OlioNexus`,
    description: cs.tagline || '',
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'case-studies',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 2,
    limit: 1,
  })

  const cs = result.docs[0] as any
  if (!cs) notFound()

  const heroImageUrl = getMediaUrl(cs.heroImage)
  const coverImageUrl = getMediaUrl(cs.coverImage)

  const relatedResult = await payload.find({
    collection: 'case-studies',
    where: {
      status: { equals: 'published' },
      id: { not_equals: cs.id },
    },
    depth: 2,
    limit: 2,
    sort: 'order',
  })
  const related = relatedResult.docs as any[]

  /* ─── shared style tokens ─── */

  // Section labels: Client, Industry, Challenge, Solutions, Impact
  const labelCls =
    "font-['Space_Grotesk']! font-medium! text-[18px]! leading-[26px]! sm:text-[20px]! sm:leading-[28px]! md:text-[24px]! md:leading-[32px]! tracking-[0]! text-[#212121]!"

  // Body — all description text 15px mobile, 16px desktop, #6B6B6B
  const bodyCls =
    "font-['Inter']! font-normal! text-[15px]! leading-[24px]! md:text-[16px]! md:leading-[26px]! text-[#6B6B6B]!"

  const bodyGrayCls =
    "font-['Inter']! font-normal! text-[15px]! leading-[24px]! md:text-[16px]! md:leading-[26px]! text-[#6B6B6B]!"

  return (
    <article>

      {/* ── Hero image ── */}
      {(heroImageUrl || coverImageUrl) && (
        <div className="border-b border-[#CCCCCC] px-3 sm:px-4 md:px-8 py-4 sm:py-6 md:py-8">
          <Image
            src={heroImageUrl || coverImageUrl}
            alt={cs.heroImage?.alt || cs.coverImage?.alt || cs.title}
            width={1920}
            height={1080}
            quality={100}
            className="w-full! h-auto!"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* ── Title + Tagline ── */}
      <div className="px-3 sm:px-4 md:px-8 py-6 sm:py-8 md:py-12 border-b border-[#CCCCCC]">
        <h1
          className="font-['Space_Grotesk']! font-medium! text-[24px]! leading-[32px]! sm:text-[28px]! sm:leading-[38px]! md:text-[32px]! md:leading-[44px]! text-[#212121]! max-w-3xl!"
        >
          {cs.title}
        </h1>
        {cs.tagline && (
          <p className={`mt-2 sm:mt-3 max-w-3xl ${bodyGrayCls}`}>
            {cs.tagline}
          </p>
        )}
      </div>

      {/* ── Info grid: Client | Industry | Description ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-b border-[#CCCCCC]">
        <div className="px-3 sm:px-4 md:px-8 py-5 md:py-8 border-b border-[#CCCCCC] sm:border-r md:border-b-0">
          <p className={`mb-1 sm:mb-2 ${labelCls}`}>Client</p>
          <p className={bodyCls}>{cs.client}</p>
        </div>

        <div className="px-3 sm:px-4 md:px-8 py-5 md:py-8 border-b border-[#CCCCCC] md:border-r md:border-b-0">
          <p className={`mb-1 sm:mb-2 ${labelCls}`}>Industry</p>
          <p className={bodyCls}>{cs.industry}</p>
        </div>

        {cs.clientDescription && (
          <div className="px-3 sm:px-4 md:px-8 py-5 md:py-8 sm:col-span-2 md:col-span-1">
            <p className={bodyGrayCls}>{cs.clientDescription}</p>
          </div>
        )}
      </div>

      {/* ── Divider above Challenge ── */}
      <Divider />

      {/* ── Challenge ── */}
      {cs.challenge && (
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] border-b border-[#CCCCCC]">
          <div className="px-3 sm:px-4 md:px-8 pt-5 pb-1 md:py-10 md:border-r border-[#CCCCCC]">
            <p className={labelCls}>Challenge</p>
          </div>
          <div className="px-3 sm:px-4 md:px-8 pb-6 pt-2 md:py-10">
            <p className={`max-w-2xl ${bodyCls}`}>{cs.challenge}</p>
          </div>
        </div>
      )}

      {/* ── Solutions ── */}
      {cs.solutions && (
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] border-b border-[#CCCCCC]">
          <div className="px-3 sm:px-4 md:px-8 pt-5 pb-1 md:py-10 md:border-r border-[#CCCCCC]">
            <p className={labelCls}>Solutions</p>
          </div>
          <div className="px-3 sm:px-4 md:px-8 pb-6 pt-2 md:py-10 case-study-richtext">
            <RichText data={cs.solutions} />
          </div>
        </div>
      )}

      {/* ── Screenshots ── */}
      {cs.screenshots && cs.screenshots.length > 0 && (
        <div className="border-b border-[#CCCCCC]">
          <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-8">
            {cs.screenshots.map((shot: any, i: number) => {
              const shotUrl = getMediaUrl(shot.image)
              if (!shotUrl) return null
              return (
                <div key={i} className="w-full">
                  <Image
                    src={shotUrl}
                    alt={shot.image?.alt || shot.caption || `Screenshot ${i + 1}`}
                    width={1920}
                    height={1080}
                    quality={100}
                    className="w-full! h-auto!"
                    sizes="100vw"
                  />
                  {shot.caption && (
                    <p className="mt-2 text-[13px] text-[#6B6B6B] font-['Inter']">{shot.caption}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Impact ── */}
      {cs.impact && (
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] border-b border-[#CCCCCC]">
          <div className="px-3 sm:px-4 md:px-8 pt-5 pb-1 md:py-10 md:border-r border-[#CCCCCC]">
            <p className={labelCls}>Impact</p>
          </div>
          <div className="px-3 sm:px-4 md:px-8 pb-6 pt-2 md:py-10 case-study-richtext">
            <RichText data={cs.impact} />
          </div>
        </div>
      )}

      {/* ── Divider ── */}
      <Divider />

      {/* ── Feature Work ── */}
      {related.length > 0 && (
        <section>
          <div className="px-3 sm:px-4 md:px-8 py-12 md:py-20 text-center border-b border-[#CCCCCC]">
            <h2
              className="font-['Space_Grotesk']! font-medium! text-[20px]! leading-[28px]! md:text-[24px]! md:leading-[32px]! text-[#212121]!"
            >
              Feature Work
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {related.map((item: any) => {
              const relImageUrl = getMediaUrl(item.coverImage)
              return (
                <CaseStudyCard
                  key={item.id}
                  title={item.title}
                  slug={item.slug}
                  client={item.client}
                  industry={item.industry}
                  imageUrl={relImageUrl}
                  imageAlt={item.coverImage?.alt}
                />
              )
            })}
          </div>

          <div className="-mt-px">
            <Divider />
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-[#212121]! py-16 sm:py-20 md:py-28 px-4 md:px-8 text-center">
        <h2
          className="font-['Space_Grotesk']! font-medium! text-[20px]! leading-[28px]! sm:text-[24px]! sm:leading-[32px]! md:text-[32px]! md:leading-[44px]! text-[#FEF9EF]! max-w-2xl! mx-auto! mb-6 sm:mb-8!"
        >
          Get in touch to discuss how we can help to keep you ahead of your competitors
        </h2>
        <a href="/contact" className="btn-primary">
          Start a Conversation
        </a>
      </section>
    </article>
  )
}
