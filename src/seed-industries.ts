import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function seed() {
  const payload = await getPayload({ config: configPromise })

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      industries: {
        heading: 'Industries We Transform',
        description: 'We deliver specialized AI consulting across 12 high-impact sectors:',
        items: [
          {
            name: 'Real Estate',
            description: 'Boost productivity, cut costs, future-proof with AI transformation.',
          },
          {
            name: 'Insurance',
            description: 'Exceed expectations and accelerate growth with AI-driven transformation.',
          },
          {
            name: 'Banking & Finance',
            description: 'AI automation and scalable systems to cut costs and elevate customer experience.',
          },
          {
            name: 'Education & EdTech',
            description: 'Build next-gen education with AI and custom digital transformation.',
          },
          {
            name: 'E-commerce & Retail',
            description: 'Enhance customer touchpoints with AI-driven, seamless commerce experiences.',
          },
          {
            name: 'Healthcare',
            description: 'Enhance patient outcomes with AI-powered, integrated digital care.',
          },
          {
            name: 'Telecommunications',
            description: 'AI-powered support and modernization for lower costs, higher sales.',
          },
          {
            name: 'IT & BPO',
            description: 'Scale capacity with AI automation and smart tech transformation.',
          },
          {
            name: 'Manufacturing',
            description: 'Boost productivity with AI and Industry 4.0 modernization.',
          },
          {
            name: 'Government & Public Sector',
            description: 'Optimize public services with AI-driven efficiency and compliance.',
          },
          {
            name: 'Hospitality',
            description: 'Stand out with AI-powered bookings and optimized service delivery.',
          },
          {
            name: 'Logistics & Transport',
            description: 'Real-time logistics apps and AI support to cut costs and speed deliveries.',
          },
        ],
      },
    } as any,
  })

  console.log('Industries seeded to home-page global.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
