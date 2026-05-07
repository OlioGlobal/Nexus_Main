import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import IndustryPageHero from '@/components/industries/IndustryPageHero'
import IndustryOverview from '@/components/industries/IndustryOverview'
import IndustrySolutions from '@/components/industries/IndustrySolutions'
import IndustryRealWorld from '@/components/industries/IndustryRealWorld'
import IndustryGain from '@/components/industries/IndustryGain'
import IndustryWhyChoose from '@/components/industries/IndustryWhyChoose'
import IndustryChallengeSection from '@/components/industries/IndustryChallengeSection'
import CTA from '@/components/CTA'
import ServiceFaq from '@/components/ServiceFaq'
import Divider from '@/components/Divider'
import FadeIn from '@/components/FadeIn'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'industry-pages', limit: 100 })
  return result.docs.map((doc: any) => ({ slug: doc.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'industry-pages',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    depth: 1,
    limit: 1,
  })

  const page = result.docs[0] as any
  if (!page) return { title: 'Industry Not Found' }

  return {
    title: `${page.title} | OlioNexus`,
    description: page.heroDescription || '',
  }
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'industry-pages',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    depth: 2,
    limit: 1,
  })

  const page = result.docs[0] as any
  if (!page) notFound()

  return (
    <article>
      {/* Hero */}
      <IndustryPageHero
        title={page.title}
        description={page.heroDescription}
        cta1Text={page.heroCta1Text}
        cta1Link={page.heroCta1Link}
        cta2Text={page.heroCta2Text}
        cta2Link={page.heroCta2Link}
      />

      <Divider />

      {/* Overview */}
      <FadeIn>
        <IndustryOverview
          heading={page.overviewHeading}
          content={page.overviewContent}
          ctaText={page.overviewCtaText}
          ctaLink={page.overviewCtaLink}
        />
      </FadeIn>

      <Divider />

      {/* Challenges */}
      <FadeIn>
        <IndustryChallengeSection
          title={page.challengesTitle}
          description={page.challengesDescription}
          items={page.challengeItems || []}
        />
      </FadeIn>

      <Divider />

      {/* Solutions — handles its own left-slide animation */}
      <IndustrySolutions
        label={page.solutionsLabel}
        title={page.solutionsTitle}
        items={page.solutionItems || []}
      />

      <Divider />

      {/* Real-World Applications */}
      <FadeIn>
        <IndustryRealWorld
          title={page.realWorldTitle}
          items={page.realWorldItems || []}
        />
      </FadeIn>

      <Divider />

      {/* What You Gain */}
      <FadeIn>
        <IndustryGain
          title={page.gainTitle}
          items={page.gainItems || []}
        />
      </FadeIn>

      <Divider />

      {/* Why Choose */}
      <FadeIn>
        <IndustryWhyChoose
          title={page.whyChooseTitle}
          items={page.whyChooseItems || []}
        />
      </FadeIn>

      <Divider />

      {/* Mid CTA */}
      <FadeIn>
        {page.midCtaHeading && (
          <CTA center data={{
            headingLine1: page.midCtaHeading,
            headingLine2: '',
            headingHighlight: '',
            description: page.midCtaDescription,
            buttonText: page.midCtaButtonText,
            buttonLink: page.midCtaButtonLink,
          }} />
        )}
      </FadeIn>

      <Divider />

      {/* FAQ */}
      <FadeIn>
        {page.faqItems?.length > 0 && (
          <ServiceFaq
            sectionTitle={page.faqTitle}
            items={page.faqItems}
          />
        )}
      </FadeIn>

      <Divider />
    </article>
  )
}
