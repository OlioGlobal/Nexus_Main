import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

/** Build a Lexical bullet list from an array of strings */
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

const caseStudyData: Record<string, { solutions: string[]; impact: string[] }> = {
  'Paper Trail': {
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
  },
  'Uber Dreams': {
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
  },
  EduCore: {
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
  },
  'B.M. Raj & Co.': {
    solutions: [
      'Digital Job Cards: Replaced paper with a mobile-first digital job card system that shop floor workers update in real-time.',
      'Material Requirement Planning (MRP): Automated raw material requisitions triggered when production orders are raised.',
      'Machine Utilisation Dashboard: Live tracking of machine uptime, downtime reasons, and maintenance schedules.',
      "Customer Delivery Portal: Clients receive a tracking link showing their order's production stage and estimated dispatch date.",
      'Month-End Automation: Inventory reconciliation and P&L contribution reports generated automatically.',
    ],
    impact: [
      'On-time delivery improved from 67% to 94% within two production cycles.',
      'Raw material wastage reduced by 22% due to accurate MRP.',
      'Month-end close time reduced from 5 days to 6 hours.',
      'Management now operates with a live dashboard instead of waiting for weekly paper reports.',
    ],
  },
}

async function migrate() {
  const payload = await getPayload({ config })

  for (const [title, data] of Object.entries(caseStudyData)) {
    const result = await payload.find({
      collection: 'case-studies',
      where: { title: { equals: title } },
      limit: 1,
    })

    if (result.docs.length === 0) {
      console.log(`  Not found: "${title}" — skipping`)
      continue
    }

    const cs = result.docs[0]

    await payload.update({
      collection: 'case-studies',
      id: cs.id,
      data: {
        solutions: toBulletList(data.solutions),
        impact: toBulletList(data.impact),
      },
    })

    console.log(`  Migrated: "${title}"`)
  }

  console.log('\nMigration complete!')
  process.exit(0)
}

migrate().catch((err) => {
  console.error('Migration error:', err)
  process.exit(1)
})
