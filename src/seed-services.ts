import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function seed() {
  const payload = await getPayload({ config: configPromise })

  const services = [
    {
      title: 'AI Consulting Services',
      tagline: 'Find out where AI actually makes sense before spending time and money on it.',
      taglineColor: '#E05C00',
      shortDescription:
        'We audit your operations, assess feasibility, and map ROI so you know which AI investments will work and which won\'t.',
      ctaText: 'Get Your AI Readiness Assessment',
      ctaLink: '/contact',
      order: 1,
      status: 'published' as const,
      benefits: [
        {
          
          title: 'Validated Roadmap',
          description: 'A validated AI roadmap in production within 6-12 months.',
        },
        {
          
          title: 'Priority Use Cases',
          description: 'Specific use cases delivering measurable and trackable ROI.',
        },
        {
          
          title: 'Clarity & Focus',
          description: 'Clear direction on what to build next versus what to defer.',
        },
      ],
      process: [
        {
          stepNumber: 1,
          title: 'Operations Audit',
          description:
            'We map your workflows, data sources, and pain points to identify high-value AI opportunities.',
        },
        {
          stepNumber: 2,
          title: 'Feasibility Assessment',
          description:
            'We evaluate technical viability, data readiness, and build-vs-buy tradeoffs for each use case.',
        },
        {
          stepNumber: 3,
          title: 'ROI Roadmap',
          description:
            'You receive a prioritised roadmap with clear success metrics and implementation guidance.',
        },
      ],
    },
    {
      title: 'Custom Software Development',
      tagline: 'From MVP to production-ready — software engineered for scale and longevity.',
      taglineColor: '#088000',
      shortDescription:
        'We design, build, and ship full-stack applications tailored to your business logic — no off-the-shelf compromises.',
      ctaText: 'Discuss Your Project',
      ctaLink: '/contact',
      order: 2,
      status: 'published' as const,
      benefits: [
        {
          
          title: 'Fast Delivery',
          description: 'Iterative delivery so you see working software in weeks, not months.',
        },
        {
          
          title: 'Built to Scale',
          description: 'Architecture designed to grow with your user base and feature set.',
        },
        {
          
          title: 'Secure by Default',
          description: 'Security best practices baked in from day one — not bolted on later.',
        },
      ],
      process: [
        {
          stepNumber: 1,
          title: 'Discovery & Scoping',
          description:
            'We define requirements, user journeys, and technical architecture before writing a single line of code.',
        },
        {
          stepNumber: 2,
          title: 'Build & Iterate',
          description:
            'Agile sprints with weekly demos so you stay in control of the product direction.',
        },
        {
          stepNumber: 3,
          title: 'Launch & Support',
          description:
            'We handle deployment, monitoring, and ongoing maintenance so your team can focus on growth.',
        },
      ],
    },
    {
      title: 'Digital Transformation',
      tagline: 'Replace legacy systems and manual processes with modern, connected workflows.',
      taglineColor: '#1A56DB',
      shortDescription:
        'We help organisations move from spreadsheets and siloed tools to integrated digital platforms that save time and reduce errors.',
      ctaText: 'Start Your Transformation',
      ctaLink: '/contact',
      order: 3,
      status: 'published' as const,
      benefits: [
        {
          
          title: 'Process Automation',
          description: 'Automate repetitive tasks and free your team for higher-value work.',
        },
        {
          
          title: 'Systems Integration',
          description: 'Connect your CRM, ERP, and ops tools into one coherent data layer.',
        },
        {
          
          title: 'Real-time Visibility',
          description: 'Dashboards and reporting that give leadership live operational insight.',
        },
      ],
      process: [
        {
          stepNumber: 1,
          title: 'Current State Mapping',
          description:
            'We document your existing tools, processes, and integration gaps to build a clear transformation plan.',
        },
        {
          stepNumber: 2,
          title: 'Platform Design',
          description:
            'We design the target architecture — choosing the right tools and building the custom connectors you need.',
        },
        {
          stepNumber: 3,
          title: 'Phased Rollout',
          description:
            'We migrate in phases to minimise disruption, with training and change management support throughout.',
        },
      ],
    },
    {
      title: 'Data Analytics & Insights',
      tagline: 'Turn raw data into decisions that move the business forward.',
      taglineColor: '#7E22CE',
      shortDescription:
        'We build the pipelines, models, and dashboards your team needs to make faster, more confident decisions.',
      ctaText: 'Explore Data Solutions',
      ctaLink: '/contact',
      order: 4,
      status: 'published' as const,
      benefits: [
        {
          
          title: 'Clean Data Pipelines',
          description: 'Reliable ETL/ELT pipelines so your data is always fresh and trustworthy.',
        },
        {
          
          title: 'Business Dashboards',
          description: 'Self-serve reporting that lets every team answer their own questions.',
        },
        {
          
          title: 'Predictive Models',
          description: 'ML models that forecast demand, churn, and opportunities before they happen.',
        },
      ],
      process: [
        {
          stepNumber: 1,
          title: 'Data Audit',
          description:
            'We assess your data sources, quality, and gaps — then define the key metrics worth tracking.',
        },
        {
          stepNumber: 2,
          title: 'Infrastructure Build',
          description:
            'We set up the warehouse, pipelines, and transformation layer that powers your analytics.',
        },
        {
          stepNumber: 3,
          title: 'Insight Delivery',
          description:
            'Dashboards, reports, and model outputs delivered to the teams who need them most.',
        },
      ],
    },
  ]

  for (const svc of services) {
    const existing = await payload.find({
      collection: 'services',
      where: { title: { equals: svc.title } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`Skipping (already exists): ${svc.title}`)
      continue
    }

    await payload.create({
      collection: 'services',
      data: svc as any,
    })
    console.log(`Created: ${svc.title}`)
  }

  console.log('Done seeding services.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
