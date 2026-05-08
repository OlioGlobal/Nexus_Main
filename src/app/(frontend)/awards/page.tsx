import { getPayload } from 'payload'
import config from '@payload-config'
import AwardsHero from '@/components/awards/AwardsHero'
import FeaturedRecognition from '@/components/awards/FeaturedRecognition'
import RecognitionPress from '@/components/awards/RecognitionPress'
import WorkBehindRecognition from '@/components/awards/WorkBehindRecognition'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Divider from '@/components/Divider'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Awards & Recognition | OlioNexus',
  description: 'Each Nexus award reflects a specific achievement — technology innovation, external validation, and service quality standards.',
}

export default async function AwardsPage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'case-studies',
    limit: 3,
    sort: 'order',
    where: { status: { equals: 'published' } },
    depth: 2,
  })

  const caseStudies = result.docs as any[]

  return (
    <main>
      <AwardsHero />
      <Divider />
      <FeaturedRecognition />
      <Divider />
      <RecognitionPress caseStudies={caseStudies} />
      <Divider />
      <Testimonials data={{
        label: '[Testimonials]',
        heading: 'What Clients Have Said About',
        headingHighlight: 'Our Work',
        headingSuffix: '',
      }} />
      <Divider />
      <WorkBehindRecognition />
      <Divider />
      <CTA data={{
        headingLine1: 'Want to Learn How You Can Explore',
        headingLine2: 'Business Growth Using',
        headingHighlight: 'AI?',
        buttonText: 'Book a Free AI Consultation',
        buttonLink: '/contact',
      }} />
      <Divider />
    </main>
  )
}
