/**
 * Seed SEO meta titles/descriptions from the approved Meta Tags sheet.
 *
 * Writes seo.metaTitle / seo.metaDescription onto:
 *   - services         (matched by slug)
 *   - industry-pages   (matched by slug)
 *   - home-page global
 *
 * Idempotent: re-running overwrites with the same values. Safe to run again.
 *
 * Run: npx cross-env NODE_OPTIONS=--no-deprecation tsx src/seed-seo.ts
 */
import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config()

type Meta = { slug: string; metaTitle: string; metaDescription: string }

// ── Services (17) — CSV rows 3–21, matched to actual DB slugs ──────────────
const services: Meta[] = [
  {
    slug: 'ai-software-development-services',
    metaTitle: 'AI Software Product Development Services | Olio Nexus',
    metaDescription:
      'Our AI software product development services cover the full product lifecycle — from LLM-powered architecture and agile development to AI-enabled SaaS and enterprise delivery.',
  },
  {
    slug: 'design-consulting-services',
    metaTitle: 'Design Consulting Services | Digital & Product Design',
    metaDescription:
      'Our design consulting services blend design thinking, UI design strategy, and digital product design to create user experiences that engage, convert, and retain.',
  },
  {
    slug: 'website-development-services',
    metaTitle: 'Website Development Services | Custom Web Solutions',
    metaDescription:
      'We deliver responsive website development services, from custom website development and CMS integration to web application development and enterprise website redesign.',
  },
  {
    slug: 'ui-ux-consulting-services',
    metaTitle: 'UI/UX Consulting Services | User Experience Strategy',
    metaDescription:
      'Our UI UX consulting services cover UX audit services, user journey mapping, and UX design strategy to help you build digital products that users love and trust.',
  },
  {
    slug: 'ai-app-development-services',
    metaTitle: 'AI Mobile App Development Services | iOS, Android & AI-Native',
    metaDescription:
      'We deliver AI mobile app development services for iOS, Android, and cross-platform apps, integrating AI agents and machine learning to build intelligent apps that perform and scale.',
  },
  {
    slug: 'product-mvp-development',
    metaTitle: 'AI MVP Development Services for Startups & Enterprises | Olio Nexus',
    metaDescription:
      'Our AI MVP development services help startups and enterprises go from idea to intelligent product fast, with AI-powered prototyping and minimum viable product development.',
  },
  {
    slug: 'managed-it-services',
    metaTitle: 'Managed IT Services | 24/7 IT Operations & Support',
    metaDescription:
      'Our managed IT services include 24/7 IT support services, managed cloud services, managed security services, and DevOps, keeping your systems secure and always running.',
  },
  {
    slug: 'amc-services',
    metaTitle: 'Annual Maintenance Contract (AMC) | IT Support Services',
    metaDescription:
      'Our annual maintenance contract services provide SLA-based IT AMC services for software, applications, and infrastructure, ensuring uptime, performance, and preventive maintenance.',
  },
  {
    slug: 'resource-augmentation-staffing-services',
    metaTitle: 'IT Resource Augmentation & Staff Augmentation Services',
    metaDescription:
      'Scale your team with our IT staff augmentation and resource augmentation services, providing skilled developers, engineers, and tech professionals on demand or contract.',
  },
  {
    slug: 'ai-consulting-services',
    metaTitle: 'AI Consulting Services | Artificial Intelligence Strategy',
    metaDescription:
      'Our AI consulting services help enterprises define AI strategy, conduct AI readiness assessments, and build a clear roadmap for artificial intelligence consulting and adoption.',
  },
  {
    slug: 'ai-transformation-services',
    metaTitle: 'AI Transformation Services | Enterprise AI Adoption',
    metaDescription:
      'Drive enterprise AI transformation with our AI transformation services, covering AI maturity assessment, AI change management, and organization-wide AI capability building.',
  },
  {
    slug: 'ai-agents-custom-automation',
    metaTitle: 'AI Agents & Custom Automation | Intelligent Workflows',
    metaDescription:
      'We build custom AI agents and autonomous AI agents, including conversational AI agents, enterprise AI agents, and multi-agent AI systems for intelligent business automation.',
  },
  {
    slug: 'ai-implementation-services',
    metaTitle: 'AI Implementation Services | AI Integration & Deployment',
    metaDescription:
      'Our AI implementation services cover AI integration services, AI model deployment, and machine learning implementation, ensuring seamless, production-ready AI for your enterprise.',
  },
  {
    slug: 'technology-transformation-consulting',
    metaTitle: 'Technology Transformation Consulting | IT Strategy',
    metaDescription:
      'Our technology transformation consulting services align IT strategy with business goals, offering digital transformation consulting, IT modernization consulting, and tech advisory.',
  },
  {
    slug: 'change-management-support',
    metaTitle: 'Change Management Support | Technology Change Services',
    metaDescription:
      'Our organizational change management support services guide teams through technology change, from change readiness assessment and change impact analysis to adoption consulting.',
  },
  {
    slug: 'process-optimization',
    metaTitle: 'Process Optimization Services | Business Efficiency',
    metaDescription:
      'Our process optimization services drive continuous process improvement through business process optimization, workflow redesign, and data-driven operational efficiency strategies.',
  },
  {
    slug: 'technology-roadmap-services',
    metaTitle: 'Technology Roadmap Services | Strategic IT Planning',
    metaDescription:
      'We build technology roadmap services that align vision with execution, combining strategic IT planning, IT roadmap consulting, and long-term enterprise technology planning.',
  },
]

// ── Industry pages (5) — CSV rows 23–27, matched to actual DB slugs ────────
const industries: Meta[] = [
  {
    slug: 'technology-solutions-for-industrial-machinery-manufacturers',
    metaTitle: 'IT Solutions for Industrial & Manufacturing | Olio Nexus',
    metaDescription:
      'We provide smart technology solutions for industrial and manufacturing businesses, from intelligent automation solutions and process automation to managed IT services and AI integration.',
  },
  {
    slug: 'smart-software-solutions-for-engineering-and-high-tech-businesses',
    metaTitle: 'Technology Solutions for Engineering & High-Tech Firms',
    metaDescription:
      'Our advanced technology services empower engineering and high-tech companies with software product development, AI capabilities, and enterprise technology transformation.',
  },
  {
    slug: 'tech-solutions-for-education-learning-institutions',
    metaTitle: 'EdTech & IT Solutions for the Education Sector',
    metaDescription:
      'We deliver technology solutions for education, including custom software development, mobile app development services, AI tools, and managed IT services for institutions.',
  },
  {
    slug: 'web-and-mobile-app-solutions-for-real-estate-proptech-businesses',
    metaTitle: 'Technology Solutions for Real Estate | PropTech Services',
    metaDescription:
      'Our technology solutions for real estate help property businesses leverage mobile app development services, AI automation services, and digital transformation consulting.',
  },
  {
    slug: 'technology-solutions-for-healthcare-medical-organizations',
    metaTitle: 'Healthcare IT Solutions | Digital Health Technology',
    metaDescription:
      'We offer healthcare IT solutions including custom software development, AI integration services, patient portal development, and managed IT services for healthcare providers.',
  },
]

// ── Home global — CSV row 1 ────────────────────────────────────────────────
const home = {
  metaTitle: 'Olio Nexus | IT & Technology Solutions Company',
  metaDescription:
    'Olio Nexus is a leading technology solutions provider offering software development, AI automation, and digital transformation services to help businesses scale and innovate.',
}

async function run() {
  const uri = process.env.DATABASE_URL
  if (!uri) throw new Error('DATABASE_URL not set')
  const client = new MongoClient(uri)
  await client.connect()
  const dbName = new URL(uri.replace('mongodb+srv://', 'https://')).pathname.slice(1).split('?')[0]
  const db = client.db(dbName)

  let ok = 0
  let missing = 0

  const applyTo = async (collection: string, rows: Meta[]) => {
    const col = db.collection(collection)
    for (const r of rows) {
      const res = await col.updateOne(
        { slug: r.slug },
        { $set: { 'seo.metaTitle': r.metaTitle, 'seo.metaDescription': r.metaDescription, updatedAt: new Date() } },
      )
      if (res.matchedCount === 0) {
        console.log(`  ⚠️  NOT FOUND in ${collection}: ${r.slug}`)
        missing++
      } else {
        console.log(`  ✓ ${collection}: ${r.slug}`)
        ok++
      }
    }
  }

  console.log('\n== Services ==')
  await applyTo('services', services)
  console.log('\n== Industry pages ==')
  await applyTo('industry-pages', industries)

  console.log('\n== Home global ==')
  const hp = await db.collection('globals').updateOne(
    { globalType: 'home-page' },
    { $set: { 'seo.metaTitle': home.metaTitle, 'seo.metaDescription': home.metaDescription, updatedAt: new Date() } },
  )
  if (hp.matchedCount === 0) {
    console.log('  ⚠️  home-page global not found')
    missing++
  } else {
    console.log('  ✓ home-page global')
    ok++
  }

  console.log(`\nDone. Updated ${ok}, missing ${missing}.`)
  await client.close()
  process.exit(missing > 0 ? 1 : 0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
