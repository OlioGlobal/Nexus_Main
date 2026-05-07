import { getPayload } from 'payload'
import configPromise from '@payload-config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '../public')

function makeParagraph(text: string) {
  return {
    type: 'paragraph',
    version: 1,
    children: [{ type: 'text', version: 1, text, format: 0, detail: 0, mode: 'normal', style: '' }],
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    textStyle: '',
  }
}

function makeRichText(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      version: 1,
      children: paragraphs.map(makeParagraph),
      direction: 'ltr',
      format: '',
      indent: 0,
    },
  }
}

async function uploadIcon(payload: any, filePath: string, altText: string) {
  const filename = path.basename(filePath)
  const ext = path.extname(filePath).toLowerCase()
  const mimetype = ext === '.svg' ? 'image/svg+xml' : ext === '.png' ? 'image/png' : 'image/jpeg'

  // Check if already uploaded
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.log(`  Already uploaded: ${filename}`)
    return existing.docs[0].id
  }

  const buffer = fs.readFileSync(filePath)
  const file = {
    data: buffer,
    mimetype,
    name: filename,
    size: buffer.length,
  }

  const result = await payload.create({
    collection: 'media',
    data: { alt: altText },
    file,
  })
  console.log(`  Uploaded icon: ${filename}`)
  return result.id
}

async function seed() {
  const payload = await getPayload({ config: configPromise })

  // Upload challenge icons
  // Upload solution images
  const solutionsDir = path.join(publicDir, 'temp/industry-internal/Solutions')
  const solutionImageIds = await Promise.all([
    uploadIcon(payload, path.join(solutionsDir, 'freepik__abstract-artificial-intelligence-discovery-concept__74283 2.png'), 'Predictive Maintenance & Industrial IoT'),
    uploadIcon(payload, path.join(solutionsDir, 'freepik__abstract-artificial-intelligence-discovery-concept__74283 2-1.png'), 'Production Planning & Scheduling Automation'),
    uploadIcon(payload, path.join(solutionsDir, 'freepik__abstract-artificial-intelligence-discovery-concept__74283 2-2.png'), 'Quality Control & Defect Detection'),
    uploadIcon(payload, path.join(solutionsDir, 'freepik__abstract-artificial-intelligence-discovery-concept__74283 2-3.png'), 'ERP & Data Integration'),
    uploadIcon(payload, path.join(solutionsDir, 'freepik__abstract-artificial-intelligence-discovery-concept__74283 2-4.png'), 'Dealer & Distributor Portal Platforms'),
  ])

  // Upload real-world icons
  const rwIds = await Promise.all([
    uploadIcon(payload, path.join(publicDir, 'industries/internal/rw-1.svg'), 'Production Planning Automation'),
    uploadIcon(payload, path.join(publicDir, 'industries/internal/rw-2.svg'), 'Predictive Maintenance Dashboard'),
    uploadIcon(payload, path.join(publicDir, 'industries/internal/rw-3.svg'), 'Dealer & Distributor Portal'),
    uploadIcon(payload, path.join(publicDir, 'industries/internal/rw-4.svg'), 'ERP Integration Platform'),
    uploadIcon(payload, path.join(publicDir, 'industries/internal/rw-5.svg'), 'Workforce & Shift Management'),
  ])

  // Upload gain icons
  const gainIds = await Promise.all([
    uploadIcon(payload, path.join(publicDir, 'industries/internal/gain-1.svg'), 'Reduced downtime'),
    uploadIcon(payload, path.join(publicDir, 'industries/internal/gain-2.svg'), 'Faster production decisions'),
    uploadIcon(payload, path.join(publicDir, 'industries/internal/gain-3.svg'), 'Lower quality costs'),
    uploadIcon(payload, path.join(publicDir, 'industries/internal/gain-4.svg'), 'Scalable channel operations'),
    uploadIcon(payload, path.join(publicDir, 'industries/internal/gain-5.svg'), 'Trusted reporting'),
  ])

  // Upload why-choose images
  const wcIds = await Promise.all([
    uploadIcon(payload, path.join(publicDir, 'industries/internal/wc-1.png'), 'Context before code'),
    uploadIcon(payload, path.join(publicDir, 'industries/internal/wc-2.png'), 'Built for real manufacturing workflows'),
    uploadIcon(payload, path.join(publicDir, 'industries/internal/wc-3.png'), 'Scalable architecture'),
    uploadIcon(payload, path.join(publicDir, 'industries/internal/wc-4.png'), 'Strategy + execution'),
  ])

  const iconDir = path.join(publicDir, 'industries/internal')
  const iconIds = await Promise.all([
    uploadIcon(payload, path.join(iconDir, 'challenge-1.svg'), 'Manual production planning'),
    uploadIcon(payload, path.join(iconDir, 'challenge-2.svg'), 'Unplanned equipment downtime'),
    uploadIcon(payload, path.join(iconDir, 'challenge-3.svg'), 'Late defect detection'),
    uploadIcon(payload, path.join(iconDir, 'challenge-4.svg'), 'Disconnected supply chain and inventory visibility'),
    uploadIcon(payload, path.join(iconDir, 'challenge-5.svg'), 'ERP and floor data silos'),
  ])

  const pages = [
    {
      title: 'Technology Solutions for Industrial Machinery Manufacturers',
      status: 'published' as const,
      heroDescription:
        'We create smart manufacturing technology solutions that provide a real-time perspective in both sales and production, supported by IoT, AI, and data technologies.',
      heroCta1Text: 'Get a Free Tech Audit',
      heroCta1Link: '/contact',
      overviewHeading:
        'Why Tech Transformation and Smart Systems Work for Machine Manufacturing Business?',
      overviewContent: makeRichText([
        'Industrial machinery manufacturers operate in highly precise settings where delays, data gaps, and manual steps slow production, degrade quality, and cause delivery issues. Yet, many still use scattered reports, spreadsheets, and separate ERP systems.',
        'At Olio NeXus, we build manufacturing technology solutions that bring together your plant operations, business systems, and decision-making in one place. Our solutions cover predictive maintenance, automated production planning, ERP integration, and sales AI tools. We help you solve problems and find new opportunities in a competitive market.',
        'We work with machinery manufacturers in India and around the world.',
      ]),
      overviewCtaText: 'Book a Consultation',
      overviewCtaLink: '/contact',
      solutionsLabel: '[Solutions]',
      solutionsTitle: 'Tailored Technology Solutions for Industrial Machinery Manufacturers',
      solutionItems: [
        {
          image: solutionImageIds[0],
          title: 'Predictive Maintenance & Industrial IoT',
          description: 'Reduce machine downtime with connected systems that monitor equipment health in real time.',
          tags: [
            { tag: 'Sensor-Led Equipment Monitoring' },
            { tag: 'Predictive Failure Alerts' },
            { tag: 'Maintenance Scheduling Workflows' },
            { tag: 'Machine Health Dashboards' },
            { tag: 'Anomaly Detection Systems' },
          ],
        },
        {
          image: solutionImageIds[1],
          title: 'Production Planning & Scheduling Automation',
          description: 'Replace manual scheduling with systems that optimize machine availability, workforce capacity, and order priorities.',
          tags: [
            { tag: 'Live Production Planning Dashboards' },
            { tag: 'Resource Allocation Systems' },
            { tag: 'Shift Scheduling Automation' },
            { tag: 'Capacity Utilization Visibility' },
            { tag: 'Bottleneck Alerts' },
          ],
        },
        {
          image: solutionImageIds[2],
          title: 'Quality Control & Defect Detection',
          description: 'Improve production consistency with AI-led inspection and quality workflows.',
          tags: [
            { tag: 'Machine Vision-Based Inspection' },
            { tag: 'Defect Detection Models' },
            { tag: 'Quality Reporting Dashboards' },
            { tag: 'Root-Cause Analysis' },
            { tag: 'Mid-Process Inspection Alerts' },
          ],
        },
        {
          image: solutionImageIds[3],
          title: 'ERP & Data Integration',
          description: 'Build a connected operational architecture through ERP integration for manufacturing.',
          tags: [
            { tag: 'Production-To-ERP Sync' },
            { tag: 'Inventory Visibility' },
            { tag: 'Procurement Data Integration' },
            { tag: 'Leadership Reporting Dashboards' },
            { tag: 'Real-Time Operational Analytics' },
          ],
        },
        {
          image: solutionImageIds[4],
          title: 'Dealer & Distributor Portal Platforms',
          description: 'Digitize your channel ecosystem with self-service dealer platforms.',
          tags: [
            { tag: 'Order Placement' },
            { tag: 'Stock Visibility' },
            { tag: 'Service Ticket Workflows' },
            { tag: 'Warranty Management' },
            { tag: 'Spare Parts Requests' },
          ],
        },
      ],
      whyChooseTitle: 'Why Industrial Machinery Manufacturers Choose NeXus',
      whyChooseItems: [
        { image: wcIds[0], title: 'Context before code', description: 'We start with a workflow and systems audit before recommending any solution.' },
        { image: wcIds[1], title: 'Built for real manufacturing workflows', description: 'Every platform is designed around production schedules, maintenance cycles, ERP constraints, and channel operations.' },
        { image: wcIds[2], title: 'Scalable architecture', description: 'Our smart manufacturing technology is built to support multi-plant operations, production growth, and future Industry 4.0 integration.' },
        { image: wcIds[3], title: 'Strategy + execution', description: 'From roadmap planning to deployment and change management, we handle the full transformation lifecycle.' },
      ],
      realWorldTitle: 'Real-World Applications in Industrial Machinery Manufacturing',
      realWorldItems: [
        { icon: rwIds[0], title: 'Production Planning Automation', description: 'Digitize scheduling across machine capacity, material availability, and workforce shifts to reduce delays and improve throughput.' },
        { icon: rwIds[1], title: 'Predictive Maintenance Dashboard', description: 'Use industrial IoT solutions to track machine performance, identify degradation patterns, and plan maintenance before breakdowns occur.' },
        { icon: rwIds[2], title: 'Dealer & Distributor Portal', description: 'Provide channel partners with real-time visibility into orders, inventory, and service workflows through a centralized platform.' },
        { icon: rwIds[3], title: 'ERP Integration Platform', description: 'Connect floor data with ERP systems so inventory, procurement, production, and quality metrics remain synchronized.' },
        { icon: rwIds[4], title: 'Workforce & Shift Management', description: 'Manage attendance, shift allocation, skills mapping, and productivity tracking through a single platform.' },
      ],
      gainTitle: 'What You Gain with Industry-Specific Manufacturing Technology',
      gainItems: [
        { icon: gainIds[0], title: 'Reduced downtime', description: 'Predictive monitoring helps maintenance teams address issues before they halt production.' },
        { icon: gainIds[1], title: 'Faster production decisions', description: 'Connected systems give operations leaders access to real-time data instead of delayed reports.' },
        { icon: gainIds[2], title: 'Lower quality costs', description: 'Earlier defect detection reduces scrap, rework, and delivery risk.' },
        { icon: gainIds[3], title: 'Scalable channel operations', description: 'Dealer and distributor portals reduce manual coordination and improve response speed.' },
        { icon: gainIds[4], title: 'Trusted reporting', description: 'Connected ERP and floor data enable leadership teams to make decisions based on live operational insights.\nThe right manufacturing technology solutions do more than support operations. They improve how your business performs at scale.' },
      ],
      midCtaHeading: "Let's Power Your Sales and Production with Smart Technology Solutions",
      midCtaDescription: 'Build manufacturing technology software solutions customized to your production goals, plant systems, and operational realities (powered by advanced tech like AI and IoT).',
      midCtaButtonText: 'Talk to Our Engineers',
      midCtaButtonLink: '/contact',
      faqTitle: 'Frequently Asked Questions',
      faqItems: [
        {
          question: 'What technology solutions work best for industrial machinery manufacturers?',
          answer: 'The most effective solutions typically focus on production planning automation, predictive maintenance, quality control systems, and ERP integration for manufacturing. These areas directly improve uptime, throughput, and reporting accuracy.',
        },
        {
          question: 'How can AI be used in industrial manufacturing?',
          answer: 'AI can be applied to predictive maintenance, defect detection, demand forecasting, and production scheduling. We build AI systems trained on your operational data so decisions are based on your actual production conditions.',
        },
        {
          question: 'What does digital transformation mean for industrial manufacturers?',
          answer: 'It means replacing disconnected spreadsheets, paper-based processes, and siloed systems with integrated platforms that give you real-time visibility across production, inventory, quality, and sales.',
        },
        {
          question: 'How long does implementation take?',
          answer: 'Most core platforms take between 3 and 6 months to deploy depending on complexity and integration requirements. We begin with a workflow audit so implementation is scoped accurately before development starts.',
        },
        {
          question: 'Can you integrate with our existing ERP system?',
          answer: 'Yes. We build integration layers that connect your ERP with floor systems, quality tools, and sales platforms so data flows in real time without manual reconciliation.',
        },
      ],
      challengesTitle: 'Challenges Faced by Industrial Machinery Manufacturers Today',
      challengesDescription:
        "Inefficiencies in manufacturing rarely stem from only one issue. They develop across several disconnected workflows. These aren't only software issues; they're operational gaps that smart manufacturing technology solves.",
      challengeItems: [
        {
          icon: iconIds[0],
          title: 'Manual production planning',
          description:
            'Production scheduled in spreadsheets or in separate tools lead to conflicts, delays, and reactive decisions.',
        },
        {
          icon: iconIds[1],
          title: 'Unplanned equipment downtime',
          description:
            'Without industry IoT solutions and predictive monitoring, machine failures are noticed too late, impacting output and delivery.',
        },
        {
          icon: iconIds[2],
          title: 'Late defect detection',
          description:
            'Quality issues found only at final inspection raise rework costs, scrap, and customer issues.',
        },
        {
          icon: iconIds[3],
          title: 'Disconnected supply chain and inventory visibility',
          description:
            'When production, procurement, and stock data are stored in separate systems, teams end up using outdated information.',
        },
        {
          icon: iconIds[4],
          title: 'ERP and floor data silos',
          description:
            "Leadership reports often miss real-time conditions because ERP systems aren't linked to plant workflows.",
        },
      ],
    },
  ]

  for (const page of pages) {
    const existing = await payload.find({
      collection: 'industry-pages',
      where: { title: { equals: page.title } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'industry-pages',
        id: existing.docs[0].id,
        data: page as any,
      })
      console.log(`Updated: ${page.title}`)
      continue
    }

    await payload.create({
      collection: 'industry-pages',
      data: page as any,
    })
    console.log(`Created: ${page.title}`)
  }

  console.log('Done seeding industry pages.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
