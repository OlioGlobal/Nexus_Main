import { getPayload } from 'payload'
import config from '@payload-config'
import Hero from '@/components/Hero'
import Divider from '@/components/Divider'
import TrustedBy from '@/components/TrustedBy'
import VideoSection from '@/components/VideoSection'
import Solutions from '@/components/Solutions'
import IndustriesCarousel from '@/components/industries/IndustriesCarousel'
import Process from '@/components/Process'
import Stats from '@/components/Stats'
import Manifesto from '@/components/Manifesto'
// OLD testimonials carousel — kept for reference, replaced by ClientReviews
// import Testimonials from '@/components/Testimonials'
import ClientReviews from '@/components/ClientReviews'
import CTA from '@/components/CTA'
import JsonLd from '@/components/JsonLd'
import { webPageSchema, professionalServiceSchema, breadcrumbSchema } from '@/lib/schema'


export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const payload = await getPayload({ config })
  const home = (await payload.findGlobal({ slug: 'home-page', depth: 0 })) as any
  return {
    title: home?.seo?.metaTitle || 'Olio Nexus',
    description:
      home?.seo?.metaDescription ||
      "We bridge the gap between what's possible and what's practical.",
    alternates: { canonical: '/' },
  }
}

export default async function HomePage() {
  const payload = await getPayload({ config })
  const [homeData, servicesData] = await Promise.all([
    payload.findGlobal({ slug: 'home-page', depth: 2 }) as Promise<any>,
    payload.find({
      collection: 'services',
      where: { status: { equals: 'published' } },
      limit: 100,
      sort: 'order',
      depth: 0,
    }),
  ])

  // Same service list the header dropdown uses — lets Solutions tags link to /services/[slug]
  const serviceLinks = servicesData.docs.map((s: any) => ({
    title: s.title as string,
    slug: s.slug as string,
  }))

  return (
    <main>
      <JsonLd
        data={[
          webPageSchema({
            path: '/',
            name: 'Olio Nexus | IT & Technology Solutions Company',
            description:
              'Olio Nexus is a technology solutions provider offering software development, AI automation, and digital transformation services.',
            about: true,
            breadcrumbPath: [{ name: 'Home', path: '/' }],
          }),
          professionalServiceSchema(),
          breadcrumbSchema([{ name: 'Home', path: '/' }]),
        ]}
      />
      <Hero data={homeData.hero} />
      <TrustedBy data={homeData.trustedBy} />
      <VideoSection data={homeData.video} />
      <Divider />
      <Solutions data={homeData.solutions} serviceLinks={serviceLinks} />
      <Divider />
      <IndustriesCarousel data={homeData.industries} />
      <Divider />
      <Process data={homeData.process} />
      <Divider />
      <Stats data={homeData.stats} />
      <Manifesto data={homeData.manifesto} />
      <Divider />
      {/* OLD: <Testimonials data={homeData.testimonials} /> */}
      <ClientReviews data={homeData.testimonials} />
      <Divider />
      <CTA data={homeData.cta} />
    </main>
  )
}
