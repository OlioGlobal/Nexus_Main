import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ServiceCard from '@/components/ServiceCard'
import ServiceChallenges from '@/components/ServiceChallenges'
import ServiceThinkingModel from '@/components/ServiceThinkingModel'
import ServiceComparison from '@/components/ServiceComparison'
import ServiceMidCta from '@/components/ServiceMidCta'
import ServiceUniqueSection from '@/components/ServiceUniqueSection'
import ServiceProcess from '@/components/ServiceProcess'
import ServiceProcessCta from '@/components/ServiceProcessCta'
import ServiceDeliverables from '@/components/ServiceDeliverables'
import ServiceTimeline from '@/components/ServiceTimeline'
import ServiceAudienceCarousel from '@/components/ServiceAudienceCarousel'
import ServiceImpactStories from '@/components/ServiceImpactStories'
import ServiceResources from '@/components/ServiceResources'
import ServiceCta from '@/components/ServiceCta'
import ServiceFaq from '@/components/ServiceFaq'
import Industries from '@/components/Industries'
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
    collection: 'services',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 1,
    limit: 1,
  })

  const svc = result.docs[0] as any
  if (!svc) return { title: 'Service Not Found' }

  return {
    title: `${svc.title} | OlioNexus`,
    description: svc.shortDescription || svc.tagline || '',
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 2,
    limit: 1,
  })

  const svc = result.docs[0] as any
  if (!svc) notFound()

  const coverImageUrl = getMediaUrl(svc.coverImage)

  // Fetch all remaining data in parallel
  const [homeData, moreResult, postsResult] = await Promise.all([
    payload.findGlobal({ slug: 'home-page', depth: 2 }),
    payload.find({
      collection: 'services',
      where: { status: { equals: 'published' }, id: { not_equals: svc.id } },
      depth: 2,
      limit: 3,
      sort: 'order',
    }),
    payload.find({
      collection: 'posts',
      limit: 2,
      sort: '-publishDate',
      where: { status: { equals: 'published' } },
      depth: 1,
    }),
  ]) as any[]

  const moreServices = moreResult.docs as any[]
  const posts = postsResult.docs as any[]


  /* ─── shared style tokens ─── */
  const labelCls =
    "font-['Space_Grotesk']! font-medium! text-[18px]! leading-[26px]! sm:text-[20px]! sm:leading-[28px]! md:text-[24px]! md:leading-[32px]! text-[#212121]!"

  const bodyCls =
    "font-['Inter']! font-normal! text-[15px]! leading-[24px]! md:text-[16px]! md:leading-[26px]! text-[#6B6B6B]!"

  const taglineColor = svc.taglineColor || '#E05C00'

  return (
    <article>
      {/* ── Hero ── */}
      <div className="relative px-4 md:px-8 py-14 md:py-24 border-b border-[#CCCCCC] text-center overflow-hidden">
        <Image
          src="/ui/service-bg.svg"
          alt=""
          fill
          className="object-cover object-center  pointer-events-none"
          aria-hidden="true"
          priority
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="font-['Space_Grotesk']! h1t text-[#212121]!">{svc.title}</h1>

          {svc.tagline && (
            <p
              className="mt-3 md:mt-4 font-['Inter']! font-medium! text-[16px]! leading-[24px]! md:text-[18px]! md:leading-[26px]! max-w-lg! mx-auto!"
              style={{ color: taglineColor }}
            >
              {svc.tagline}
            </p>
          )}

          {svc.shortDescription && (
            <p
              className={`mt-3 max-w-3xl text-[16px]! leading-[24px]! md:text-[18px]! mx-auto ${bodyCls}`}
            >
              {svc.shortDescription}
            </p>
          )}

          {svc.heroDetail && (
            <p
              className={`mt-3 max-w-2xl text-[16px]! leading-[24px]! md:text-[18px]! mx-auto ${bodyCls}`}
            >
              {svc.heroDetail}
            </p>
          )}

          {svc.ctaText && (
            <div className="mt-6 md:mt-8">
              <a href={svc.ctaLink || '/contact'} className="btn-primary">
                {svc.ctaText}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ── Cover image ── */}
      {coverImageUrl && (
        <div className="border-b border-[#CCCCCC] px-3 sm:px-4 md:px-8 py-4 md:py-8">
          <Image
            src={coverImageUrl}
            alt={svc.coverImage?.alt || svc.title}
            width={1200}
            height={680}
            className="w-full! h-auto! object-cover!"
            sizes="(max-width: 640px) 100vw, 1200px"
            priority
          />
        </div>
      )}

      {/* ── Benefits grid ── */}
      {svc.benefits && svc.benefits.length > 0 && (
        <div className="border-b border-[#CCCCCC]">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              svc.benefits.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
            }`}
          >
            {svc.benefits.map((benefit: any, i: number) => {
              const iconUrl = getMediaUrl(benefit.iconImage)
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center px-6 md:px-10 py-10 md:py-14 border-b border-[#CCCCCC] last:border-b-0 sm:not-last:border-r md:not-last:border-r sm:border-b-0"
                >
                  {iconUrl && (
                    <Image
                      src={iconUrl}
                      alt={benefit.title}
                      width={36}
                      height={36}
                      className="w-9 h-9 object-contain mb-5"
                    />
                  )}
                  <h3
                    className="mb-2 text-[20px]! leading-[28px] sm:text-[22px]! sm:leading-[30px]! md:text-[24px]! md:leading-[32px]! font-medium text-[#212121]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {benefit.title}
                  </h3>
                  {benefit.description && (
                    <p
                      className="text-[14px]! leading-[20px]! sm:text-[15px]! sm:leading-[22px]! md:text-[16px]! md:leading-[24px]! font-normal text-[#6B6B6B]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {benefit.description}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Divider ── */}
      <Divider />

      {/* ── Overview ── */}
      {svc.overview && (
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] border-b border-[#CCCCCC]">
          <div className="px-3 sm:px-4 md:px-8 pt-5 pb-1 md:py-10 md:border-r border-[#CCCCCC]">
            <p className={labelCls}>Overview</p>
          </div>
          <div className="px-3 sm:px-4 md:px-8 pb-6 pt-2 md:py-10 case-study-richtext">
            <RichText data={svc.overview} />
          </div>
        </div>
      )}

      {/* ── Challenges ── */}
      <ServiceChallenges
        sectionTitle={svc.challengesSectionTitle}
        rows={svc.challengeRows || []}
        conclusion={svc.challengesConclusion}
      />

      {/* ── Divider ── */}
      <Divider />

      {/* ── Thinking Model ── */}
      <ServiceThinkingModel
        label={svc.thinkingModelLabel}
        title={svc.thinkingModelTitle}
        description={svc.thinkingModelDescription}
        principles={svc.thinkingModelPrinciples || []}
        getMediaUrl={getMediaUrl}
      />

      {/* ── Divider ── */}
      <Divider />

      {/* ── Comparison ── */}
      <ServiceComparison
        title={svc.comparisonTitle}
        leftLabel={svc.comparisonLeftLabel}
        rightLabel={svc.comparisonRightLabel}
        leftItems={svc.comparisonLeftItems || []}
        rightItems={svc.comparisonRightItems || []}
      />

      {/* ── Mid CTA ── */}
      <ServiceMidCta
        title={svc.midCtaTitle}
        highlight={svc.midCtaHighlight}
        buttonText={svc.midCtaButtonText}
        buttonLink={svc.midCtaButtonLink}
      />

      {/* ── Unique Section ── */}
      <ServiceUniqueSection
        sectionTitle={svc.uniqueSectionTitle}
        items={svc.uniqueSectionItems || []}
        getMediaUrl={getMediaUrl}
      />

      {/* ── Divider ── */}
      <Divider />

      {/* ── Step-by-Step Process ── */}
      <ServiceProcess
        sectionTitle={svc.processSectionTitle}
        sectionSubtitle={svc.processSectionSubtitle}
        steps={svc.processSteps || []}
        getMediaUrl={getMediaUrl}
      />

      {/* ── Process CTA Banner ── */}
      <ServiceProcessCta
        titlePart1={svc.processCtaTitlePart1}
        highlight1={svc.processCtaHighlight1}
        titlePart2={svc.processCtaTitlePart2}
        highlight2={svc.processCtaHighlight2}
        titlePart3={svc.processCtaTitlePart3}
        buttonText={svc.processCtaButtonText}
        buttonLink={svc.processCtaButtonLink}
      />

      {/* ── What We Deliver ── */}
      {svc.whatWeDeliver && (
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] border-b border-[#CCCCCC]">
          <div className="px-3 sm:px-4 md:px-8 pt-5 pb-1 md:py-10 md:border-r border-[#CCCCCC]">
            <p className={labelCls}>Deliverables</p>
          </div>
          <div className="px-3 sm:px-4 md:px-8 pb-6 pt-2 md:py-10 case-study-richtext">
            <RichText data={svc.whatWeDeliver} />
          </div>
        </div>
      )}

      {/* ── Divider ── */}
      <Divider />

      {/* ── Deliverables Cards ── */}
      <ServiceDeliverables
        sectionTitle={svc.deliverablesSectionTitle}
        sectionSubtitle={svc.deliverablesSectionSubtitle}
        deliverables={svc.deliverables || []}
      />

      {/* ── Divider ── */}
      <Divider />

      {/* ── Business Impact Timeline ── */}
      <ServiceTimeline
        sectionTitle={svc.timelineSectionTitle}
        sectionHighlight={svc.timelineSectionHighlight}
        items={svc.timelineItems || []}
      />

      {/* ── Divider ── */}
      <Divider />

      {/* ── Audience Carousel ── */}
      <ServiceAudienceCarousel
        sectionTitle={svc.audienceSectionTitle}
        items={svc.audienceItems || []}
      />

      {/* ── Divider ── */}
      <Divider />

      {/* ── Industries ── */}
      <Industries data={homeData.industries} />

      {/* ── Divider ── */}
      <Divider />

      {/* ── Impact Stories ── */}
      <ServiceImpactStories
        sectionTitle={svc.impactStoriesSectionTitle}
        sectionDescription={svc.impactStoriesSectionDescription}
        stories={svc.impactStories || []}
      />

      {/* ── Divider ── */}
      <Divider />

      {/* ── Resources & Insights ── */}
      <ServiceResources posts={posts} />

      {/* ── Divider ── */}
      <Divider />

      {/* ── CTA Banner ── */}
      <ServiceCta
        title={svc.ctaBannerTitle}
        highlight={svc.ctaBannerHighlight}
        titleSuffix={svc.ctaBannerTitleSuffix}
        description={svc.ctaBannerDescription}
        buttonText={svc.ctaBannerButtonText}
        buttonLink={svc.ctaBannerButtonLink}
      />

      {/* ── Divider ── */}
      <Divider />

      {/* ── FAQ ── */}
      <ServiceFaq
        sectionTitle={svc.faqSectionTitle}
        items={svc.faqItems || []}
      />

      {/* ── Divider ── */}
      <Divider />
      {/* ── More Services ── */}
      {moreServices.length > 0 && (
        <section>
          <div className="px-3 sm:px-4 md:px-8 py-10 md:py-16 text-center border-b border-[#CCCCCC]">
            <h2 className="font-['Space_Grotesk']! font-medium! text-[20px]! leading-[28px]! md:text-[24px]! md:leading-[32px]! text-[#212121]!">
              More Services
            </h2>
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {moreServices.map((item: any) => {
              const imgUrl = getMediaUrl(item.coverImage)
              return (
                <ServiceCard
                  key={item.id}
                  title={item.title}
                  slug={item.slug}
                  tagline={item.tagline}
                  shortDescription={item.shortDescription}
                  imageUrl={imgUrl}
                  imageAlt={item.coverImage?.alt}
                />
              )
            })}
          </div> */}

          <div className="-mt-px">
            <Divider />
          </div>
        </section>
      )}
    </article>
  )
}
