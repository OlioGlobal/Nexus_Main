import { getPayload } from 'payload'
import config from '@payload-config'
import IndustriesHero from '@/components/industries/IndustriesHero'
import IndustryProblems from '@/components/industries/IndustryProblems'
import IndustriesCarousel from '@/components/industries/IndustriesCarousel'
import BuiltForIndustry from '@/components/industries/BuiltForIndustry'
import IndustryFirstApproach from '@/components/industries/IndustryFirstApproach'
import IndustryProcess from '@/components/industries/IndustryProcess'
import IndustryChallenges from '@/components/industries/IndustryChallenges'
import ServiceFaq from '@/components/ServiceFaq'
import CTA from '@/components/CTA'
import Divider from '@/components/Divider'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Industries | OlioNexus',
  description:
    "Technology solutions designed to solve real business challenges in your industry. We create technology solutions that fit your industry's real-world operations, regulations, and growth needs.",
}

const industryFaqs = [
  {
    question: 'What industries do you serve?',
    answer:
      'We deliver industry-specific technology solutions across 13 sectors, including Industrial & Manufacturing, Engineering, Education, Real Estate, Healthcare, BFSI, Retail, Telecommunications, Government, Hospitality, Logistics, and IT Services. Our technology solutions are tailored to the workflows, compliance requirements, and growth challenges unique to each industry.',
  },
  {
    question: 'How are your solutions different from those of other technology companies?',
    answer:
      "Unlike generic providers, we build business technology solutions around your industry's workflows, operational requirements, and compliance needs. From discovery and workflow mapping to deployment, every solution is designed to improve adoption, scalability, and measurable business outcomes rather than simply implementing standard software.",
  },
  {
    question: 'Do you offer AI solutions for specific industries?',
    answer:
      'Yes. We provide smart technology solutions and AI systems tailored to industry-specific use cases. Every AI solution is trained on your business data, aligned with your processes, and deployed to support operational decisions, automation, and workflow efficiency within your industry.',
  },
  {
    question: 'Can you help with digital transformation?',
    answer:
      'Yes. We offer end-to-end digital technology solutions covering strategy, consulting, software development, AI implementation, workflow automation, and change management. Our approach ensures technology transformation aligns with business goals, process efficiency, and long-term scalability.',
  },
  {
    question: 'Do you provide consultation before starting a project?',
    answer:
      'Yes. Every engagement begins with a discovery consultation and industry audit. We assess your workflows, systems, operational bottlenecks, and growth goals before recommending the most suitable custom technology solutions for your business.',
  },
  {
    question: 'Which locations do you serve?',
    answer:
      'We serve businesses globally, with a strong presence in India and the UAE. Our teams deliver scalable technology solutions remotely across time zones, enabling seamless collaboration and implementation for clients worldwide.',
  },
]

export default async function IndustriesPage() {
  const payload = await getPayload({ config })
  const homeData = await payload.findGlobal({ slug: 'home-page', depth: 2 }) as any

  return (
    <main>
      <IndustriesHero />
      <Divider />
      <IndustryProblems />
      <Divider />
      <IndustriesCarousel data={homeData.industries} />
      <Divider />
      <BuiltForIndustry />
      <Divider />
      <IndustryFirstApproach />
      <Divider />
      <CTA center data={{
        headingLine1: "Not Sure Which Challenge Applies To Your Operation?",
        headingLine2: "Let's Map The Right Solution",
        headingHighlight: 'For You',
        buttonText: 'Talk to an Industry Expert',
        buttonLink: '/contact',
      }} />
      <Divider />
      <IndustryChallenges />
      <Divider />
      <IndustryProcess />
      <Divider />
      <CTA center data={{
        headingLine1: 'Solve Industry-Specific Challenges with the',
        headingLine2: '',
        headingHighlight: 'Right Technology',
        description: 'We help you design and build technology solutions that solve the specific business problems your teams deal with every day.',
        buttonText: 'Book a Consultation',
        buttonLink: '/contact',
        secondaryButtonText: 'Get a Free Technology Audit',
        secondaryButtonLink: '/contact',
      }} />
      <Divider />
      <ServiceFaq sectionTitle="FAQs" items={industryFaqs} />
      <Divider />
    </main>
  )
}
