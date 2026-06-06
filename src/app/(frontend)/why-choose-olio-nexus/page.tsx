
import Divider from '@/components/Divider'
import Testimonials from '@/components/Testimonials'
import  ClientOwns from '@/components/why-choose-olio-nexus/NexusClientOwns'
import  NexusComparison from '@/components/why-choose-olio-nexus/NexusComparison'
import NexusPillars from '@/components/why-choose-olio-nexus/NexusPillars'
import NexusSolution from '@/components/why-choose-olio-nexus/NexusSolution'
import TechnologyImpactSection from '@/components/why-choose-olio-nexus/TechnologyImpactSection'
import ThreePillars from '@/components/why-choose-olio-nexus/ThreePillars'
import WhoWeHelpMost from '@/components/why-choose-olio-nexus/WhoWeHelpMost'
import WhyChooseHero from '@/components/why-choose-olio-nexus/WhyChooseHero'
import WhyNexusCta from '@/components/why-choose-olio-nexus/WhyNexusCTA'
import { getTestimonials } from '@/lib/getTestimonials'

export const metadata = {
  title: 'Why Choose Olio NeXus | OlioNexus',
  description:
    'Discover why Olio Nexus bridges the gap across AI, Build, and technology transformation Labs with one strategy and one team.',
}

export default async function  WhyChooseOlioNexusPage() {
  const testimonials = await getTestimonials()
  return (
    <section>
      <WhyChooseHero />
      <Divider/>
      <NexusSolution/>
      <Divider/>
      <TechnologyImpactSection/>
      <Divider/>
      <NexusComparison/>
      <Divider/>
      <ClientOwns/>
      <Divider/>
      <NexusPillars/>
      <Divider/>
      <WhoWeHelpMost/>
      <Divider/>
      <ThreePillars/>
      <Divider/>
      <Testimonials data={testimonials}/>
      <Divider/>
      <WhyNexusCta/>
      <Divider/>
    </section>
  )
}
