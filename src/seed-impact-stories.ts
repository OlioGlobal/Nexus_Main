import { getPayload } from 'payload'
import configPromise from '@payload-config'

const impactData: Record<
  string,
  {
    impactStoriesSectionTitle: string
    impactStoriesSectionDescription: string
    impactStories: any[]
  }
> = {
  'AI Consulting Services': {
    impactStoriesSectionTitle: 'Impact Stories: Real Stories of AI Transformation',
    impactStoriesSectionDescription:
      'A cosmetic clinic believed it needed an AI call-answering agent. They were convinced missed calls were costing them business, estimating 20-30 missed calls per week that needed AI automation.',
    impactStories: [
      {
        headline: '₹22L/Month From One Week of Analysis',
        description:
          'A cosmetic clinic believed it needed an AI call-answering agent. They were convinced missed calls were costing them business, estimating 20-30 missed calls per week that needed AI automation',
        chartLabel: '+120% ROI',
        discoveryTitle: 'What we discovered during our AI consulting audit:',
        discoveryIntro: 'We audited their operations for one week and found the reality was different:',
        discoveryPoints: [
          { point: 'Actual missed calls: 4 per week (not 20-30)' },
          { point: 'Forgotten appointments after booking: 10-20 per week' },
          { point: "Revenue leak wasn't in lead capture—it was in appointment follow-through" },
        ],
        actionLabel: 'OUR ACTION',
        actionText:
          'Instead of building a call-answering agent, we recommended an AI appointment-reminder and confirmation system.',
        impactLabel: 'MEASURABLE IMPACT',
        impactText:
          '₹22L/month recovered from reduced no-shows. Deployed in 3 weeks. Zero disruption to existing workflows.',
      },
      {
        headline: '40% Cost Reduction in Customer Support',
        description:
          'A mid-sized e-commerce brand was spending heavily on a 12-person support team handling repetitive queries. Leadership assumed they needed a complex AI chatbot platform.',
        chartLabel: '-40% Cost',
        discoveryTitle: 'What we discovered during our AI consulting audit:',
        discoveryIntro: 'One week of ticket analysis revealed a simpler picture:',
        discoveryPoints: [
          { point: '68% of tickets were order status and return policy queries' },
          { point: 'Average resolution time: 4 minutes — but response wait: 6 hours' },
          { point: 'Customer frustration was about wait time, not answer quality' },
        ],
        actionLabel: 'OUR ACTION',
        actionText:
          'We built a lightweight FAQ + order-status bot integrated with their existing helpdesk — no new platform required.',
        impactLabel: 'MEASURABLE IMPACT',
        impactText:
          '40% reduction in support costs. Response time dropped from 6 hours to under 2 minutes for 68% of queries.',
      },
    ],
  },
}

async function seed() {
  const payload = await getPayload({ config: configPromise })

  for (const [title, data] of Object.entries(impactData)) {
    const result = await payload.find({
      collection: 'services',
      where: { title: { equals: title } },
      limit: 1,
    })

    if (result.docs.length === 0) {
      console.log(`Service not found, skipping: ${title}`)
      continue
    }

    const svc = result.docs[0]
    await payload.update({
      collection: 'services',
      id: svc.id,
      data: data as any,
    })
    console.log(`Updated impact stories: ${title}`)
  }

  console.log('Done seeding impact stories.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
