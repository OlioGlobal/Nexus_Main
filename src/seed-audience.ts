import { getPayload } from 'payload'
import configPromise from '@payload-config'

const audienceData: Record<string, { audienceSectionTitle: string; audienceItems: any[] }> = {
  'AI Consulting Services': {
    audienceSectionTitle: 'Who AI Consulting Is For',
    audienceItems: [
      {
        title: 'Organizations Exploring AI',
        description:
          "You know artificial intelligence could help, but you're not sure where to start or what's worth the investment. You need AI consulting services to cut through the noise and tell you what's actually achievable with your data, systems, and team.",
      },
      {
        title: 'Teams With Failed Pilots',
        description:
          "You've tried AI projects before: chatbots that no one uses, automation that broke workflows, and AI solutions that promised more than they delivered. You need clarity on why those failed and what would work instead.",
      },
      {
        title: 'Leaders Needing Clarity',
        description:
          "Your team is pushing for AI but you need an honest analysis before committing budget. You need an assessment of what AI can realistically do for your business and where it's just hype.",
      },
      {
        title: 'Enterprises Scaling AI',
        description:
          'You have working prototypes but struggle to move them into production at scale. You need a partner who understands both the technical and operational challenges of enterprise AI deployment.',
      },
    ],
  },

  'Custom Software Development': {
    audienceSectionTitle: 'Who Custom Software Development Is For',
    audienceItems: [
      {
        title: 'Startups Building MVPs',
        description:
          "You have a product idea and need it built fast without sacrificing quality. You need a development partner who can ship a working product quickly, make smart architectural decisions early, and won't lock you into technical debt.",
      },
      {
        title: 'Companies Outgrowing Off-the-Shelf Tools',
        description:
          "Your business has grown beyond what standard SaaS products can handle. You need software built around your specific workflows — not the other way around.",
      },
      {
        title: 'Teams Replacing Legacy Systems',
        description:
          'Your current system is slowing you down, hard to maintain, or simply no longer fit for purpose. You need a reliable team to migrate and modernise without disrupting live operations.',
      },
      {
        title: 'Product Owners Needing a Technical Partner',
        description:
          "You have a clear vision but no in-house engineering capacity to execute. You need a team that communicates like a business partner and delivers like a senior engineering team.",
      },
    ],
  },

  'Digital Transformation': {
    audienceSectionTitle: 'Who Digital Transformation Is For',
    audienceItems: [
      {
        title: 'Operations-Heavy Businesses',
        description:
          'Your team spends hours on manual data entry, spreadsheet management, or chasing approvals across disconnected tools. You need workflows that run automatically and systems that talk to each other.',
      },
      {
        title: 'Mid-Market Companies Scaling Up',
        description:
          "The processes that worked at 20 people are breaking at 200. You need infrastructure that scales with your headcount and customer base — not a patchwork of workarounds.",
      },
      {
        title: 'Leadership Teams Lacking Visibility',
        description:
          "You can't get a clear picture of what's happening across the business without pulling reports from five different places. You need a single source of truth for operational data.",
      },
      {
        title: 'Companies Facing Compliance Pressure',
        description:
          'Manual processes and siloed data create audit and compliance risks. You need documented, traceable workflows that satisfy regulators and reduce risk.',
      },
    ],
  },

  'Data Analytics & Insights': {
    audienceSectionTitle: 'Who Data Analytics Is For',
    audienceItems: [
      {
        title: 'Businesses Making Gut-Feel Decisions',
        description:
          "You have data but it lives in spreadsheets, different tools, or nobody has time to analyse it. You need dashboards and reports that surface the right numbers to the right people automatically.",
      },
      {
        title: 'Teams With Messy or Siloed Data',
        description:
          'Your data is scattered across CRMs, databases, and third-party tools with no consistent definitions. You need a clean, unified data layer before any meaningful analysis is possible.',
      },
      {
        title: 'Companies Wanting Predictive Capability',
        description:
          "You don't just want to know what happened — you want to know what's coming. You need ML models that forecast demand, flag churn risk, and surface opportunities before they disappear.",
      },
      {
        title: 'Data Teams Needing Infrastructure',
        description:
          'You have analysts but they spend most of their time wrangling data rather than producing insights. You need robust pipelines and a warehouse so your analysts can focus on the work that matters.',
      },
    ],
  },
}

async function seed() {
  const payload = await getPayload({ config: configPromise })

  for (const [title, data] of Object.entries(audienceData)) {
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
    console.log(`Updated audience data: ${title}`)
  }

  console.log('Done seeding audience data.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
