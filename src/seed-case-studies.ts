import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

function toBulletList(items: string[]) {
  return {
    root: {
      type: 'root',
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: 'list',
          listType: 'bullet',
          tag: 'ul',
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          version: 1,
          start: 1,
          children: items.map((text, idx) => ({
            type: 'listitem',
            value: idx + 1,
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
            children: [
              {
                type: 'text',
                text,
                format: 0,
                detail: 0,
                mode: 'normal' as const,
                style: '',
                version: 1,
              },
            ],
          })),
        },
      ],
    },
  }
}

const caseStudies = [
  {
    title: 'Paper Trail',
    client: 'Java Paper Group (Annual Revenue ₹100Cr+)',
    industry: 'Consumer Tech & E-Commerce',
    tagline: 'Transforming a 40-Year Legacy Supply Chain into a Real-Time Digital Ecosystem',
    clientDescription:
      'A legacy leader in the paper industry, supplying raw material to giants like ITC and typesound (Apple\'s packaging partner).',
    challenge:
      'Despite high revenue, operations were opaque. Tracking paper reels from the mill to the warehouse to the customer required a manual team of 3 staff members working 48 man-hours weekly. There was no visibility into "Trimmed" vs. "Round" stock, and vendor data was siloed.',
    solutions: [
      'Vendor Integration: Built dedicated secure portals for enterprise clients ITC, Pansound to view their specific inventory in real-time.',
      'Granular Tracking: Implemented a serialised tracking system showing exact status (transit, warehouse location, driver mobile number).',
      'Visual Intelligence: Created "Location-Wise" and "Status-Wise" pie chart dashboards for instant decision-making.',
      'Automated Workflow: Digitised the "Pending Sheet to Ready Sheet" conversion pipeline, removing manual entry errors.',
    ],
    impact: [
      '98% Efficiency Gain: Operational management time reduced from 48 hours/week to just 30 minutes/week.',
      'Workforce Optimisation: Reduced management requirement from 3 staff members to a single administrator.',
      'Transparency: Zero "Where is my order?" calls from major clients due to self-serve portals.',
    ],
    order: 1,
  },
  {
    title: 'Uber Dreams',
    client: 'Uber Dreams',
    industry: 'Consumer Tech & E-Commerce',
    tagline: 'Building a Next-Generation Dream Fulfilment Marketplace from the Ground Up',
    clientDescription:
      'A vision-stage startup aiming to connect dream-seekers with curated experience providers across lifestyle, adventure, and entertainment verticals.',
    challenge:
      'The founder had a clear vision but no technical foundation. The marketplace required a dual-sided platform — consumer-facing discovery and a vendor management backend — with real-time availability, payments, and a review system, all within a 90-day launch window.',
    solutions: [
      'Built a full-stack marketplace with Next.js frontend and Node.js microservices backend.',
      'Implemented Stripe Connect for split payments between platform and vendors.',
      'Designed a real-time availability engine using WebSockets to prevent double-booking.',
      'Created an admin dashboard for vendor onboarding, experience management, and revenue analytics.',
      'Deployed CI/CD pipeline on AWS with auto-scaling to handle traffic spikes.',
    ],
    impact: [
      'Launched in 87 days — 3 days ahead of the 90-day target.',
      '120+ vendors onboarded within the first month of launch.',
      'Zero payment disputes in the first quarter due to transparent split-payment architecture.',
      'Featured in two regional startup media outlets within 60 days of launch.',
    ],
    order: 2,
  },
  {
    title: 'EduCore',
    client: 'Ryan International School',
    industry: 'Consumer Tech & E-Commerce',
    tagline: 'Replacing a Fractured Legacy ERP with a Unified School Operating System',
    clientDescription:
      'Ryan International School, part of one of India\'s largest school chains with 130+ branches, needed a scalable ERP to manage students, fees, staff, and academics across multiple campuses.',
    challenge:
      'The school was running on a patchwork of outdated tools — a legacy timetable software, manual fee registers, and WhatsApp groups for parent communication. Data was inconsistent across branches, fee defaulters were tracked on paper, and generating any report required a full day of manual work.',
    solutions: [
      'Unified Student Management: Single source of truth for student records, attendance, and academic performance across all branches.',
      'Fee Automation: Online payment portal with automated reminders, receipt generation, and defaulter reports.',
      'Academic Planner: Digital timetable builder with conflict detection and teacher workload balancing.',
      'Parent Portal: Real-time access to attendance, grades, fee status, and school announcements.',
      'Multi-branch Reporting: Instant cross-campus analytics for the admin board.',
    ],
    impact: [
      'Report generation time reduced from 8 hours to 4 minutes.',
      'Fee collection rate improved by 34% within the first term due to automated reminders.',
      'Parent satisfaction score increased from 62% to 89% in post-launch survey.',
      'Rolled out to 4 campuses within 6 months of initial deployment.',
    ],
    order: 3,
  },
  {
    title: 'B.M. Raj & Co.',
    client: 'B.M. Raj & Co. (Plastic & Injection Moulding)',
    industry: 'Consumer Tech & E-Commerce',
    tagline: 'Digitising a 30-Year Manufacturing Business with a Custom Production ERP',
    clientDescription:
      'A family-run plastics manufacturer supplying components to automotive and FMCG giants. Annual turnover ₹25Cr, operating with paper-based production tracking.',
    challenge:
      'Production orders were managed on paper job cards. Tracking raw material consumption, machine utilisation, and finished goods inventory required manual reconciliation at month-end. Customer delivery timelines were missed frequently because nobody had real-time visibility into production status.',
    solutions: [
      'Digital Job Cards: Replaced paper with a mobile-first digital job card system that shop floor workers update in real-time.',
      'Material Requirement Planning (MRP): Automated raw material requisitions triggered when production orders are raised.',
      'Machine Utilisation Dashboard: Live tracking of machine uptime, downtime reasons, and maintenance schedules.',
      'Customer Delivery Portal: Clients receive a tracking link showing their order\'s production stage and estimated dispatch date.',
      'Month-End Automation: Inventory reconciliation and P&L contribution reports generated automatically.',
    ],
    impact: [
      'On-time delivery improved from 67% to 94% within two production cycles.',
      'Raw material wastage reduced by 22% due to accurate MRP.',
      'Month-end close time reduced from 5 days to 6 hours.',
      'Management now operates with a live dashboard instead of waiting for weekly paper reports.',
    ],
    order: 4,
  },
]

async function seed() {
  const payload = await getPayload({ config })

  // Find any existing media to use as placeholder cover image
  const media = await payload.find({ collection: 'media', limit: 1 })
  let mediaId: string | undefined = media.docs[0]?.id

  if (!mediaId) {
    console.error(
      'No media found in the database.\n' +
        'Please upload at least one image via /admin first, then re-run this script.',
    )
    process.exit(1)
  }

  console.log(`Using media ID "${mediaId}" as placeholder cover image.\n`)

  for (const cs of caseStudies) {
    const existing = await payload.find({
      collection: 'case-studies',
      where: { title: { equals: cs.title } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  Skipped (already exists): ${cs.title}`)
      continue
    }

    await payload.create({
      collection: 'case-studies',
      data: {
        title: cs.title,
        client: cs.client,
        industry: cs.industry,
        tagline: cs.tagline,
        clientDescription: cs.clientDescription,
        challenge: cs.challenge,
        coverImage: mediaId,
        solutions: toBulletList(cs.solutions),
        impact: toBulletList(cs.impact),
        status: 'published',
        order: cs.order,
      },
    })

    console.log(`  Created: ${cs.title}`)
  }

  console.log('\nCase study seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
