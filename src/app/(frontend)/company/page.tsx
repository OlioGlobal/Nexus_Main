import { getPayload } from 'payload'
import config from '@payload-config'
import CompanyHero from '@/components/company/CompanyHero'
import OurStory from '@/components/company/OurStory'
import Divider from '@/components/Divider'
import Solutions from '@/components/Solutions'
import WhatMakesDifferent from '@/components/company/WhatMakesDifferent'
import Industries from '@/components/Industries'
import GlobalPresence from '@/components/company/GlobalPresence'
import CTA from '@/components/CTA'
import ProprietaryProducts from '@/components/company/ProprietaryProducts'
import LeadershipTeam from '@/components/company/LeadershipTeam'

export const metadata = {
  title: 'Company | OlioNexus',
  description:
    'NeXus combines AI, custom software development, and technology transformation roadmaps to solve problems.',
}

export default async function CompanyPage() {
  const payload = await getPayload({ config })
  const [homeData, servicesData] = await Promise.all([
    payload.findGlobal({ slug: 'home-page', depth: 2 }) as Promise<any>,
    payload.find({ collection: 'services', where: { status: { equals: 'published' } }, limit: 100, sort: 'order', depth: 0 }),
  ])

  const serviceLinks = servicesData.docs.map((s: any) => ({ title: s.title, slug: s.slug }))

  return (
    <main>
      <CompanyHero />
      <OurStory />
      <Divider />
      <Solutions data={homeData.solutions} serviceLinks={serviceLinks} />
      <Divider />
      <WhatMakesDifferent />
      <Divider />
      <ProprietaryProducts />
      <Divider />
      <LeadershipTeam />
      <Divider />
      <Industries data={homeData.industries} />
      <Divider />
      <GlobalPresence />
      <Divider />
      <CTA data={{
        headingLine1: "If This Sounds Like the Partner You've Been Looking For",
        headingLine2: '',
        headingHighlight: '',
        description: "We work best with businesses beyond generic tech. Leaders come to us to solve challenges with AI and other advanced technologies. If that's you, let's talk.",
        buttonText: 'Share Your Challenges / Requirements',
        buttonLink: '/contact',
      }} />
      <Divider />
    </main>
  )
}
