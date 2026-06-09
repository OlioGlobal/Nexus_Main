import { getPayload } from 'payload'
import config from '@payload-config'
import Hero from '@/components/Hero'
import Divider from '@/components/Divider'
import TrustedBy from '@/components/TrustedBy'
import Solutions from '@/components/Solutions'
import IndustriesCarousel from '@/components/industries/IndustriesCarousel'
import Process from '@/components/Process'
import Stats from '@/components/Stats'
import Manifesto from '@/components/Manifesto'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'


export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const homeData = (await payload.findGlobal({ slug: 'home-page', depth: 2 })) as any

  return (
    <main>
      <Hero data={homeData.hero} />
      <TrustedBy data={homeData.trustedBy} />
      <Divider />
      <Solutions data={homeData.solutions} />
      <Divider />
      <IndustriesCarousel data={homeData.industries} />
      <Divider />
      <Process data={homeData.process} />
      <Divider />
      <Stats data={homeData.stats} />
      <Manifesto data={homeData.manifesto} />
      <Divider />
      <Testimonials data={homeData.testimonials} />
      <Divider />
      <CTA data={homeData.cta} />
    </main>
  )
}
