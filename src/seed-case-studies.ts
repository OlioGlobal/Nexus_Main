import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Original full-quality PNG images
const IMAGES_ROOT = 'C:/Users/choud/OneDrive/Desktop/Nexus-20260410T124822Z-3-001/Nexus'

// ─── Lexical helpers ────────────────────────────────────────────────────────

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

// ─── Image upload helper ─────────────────────────────────────────────────────

async function uploadImage(
  payload: Awaited<ReturnType<typeof getPayload>>,
  relPath: string,
  alt: string,
): Promise<string | null> {
  const fullPath = path.join(IMAGES_ROOT, relPath)
  if (!fs.existsSync(fullPath)) {
    console.log(`    [SKIP] Image not found: ${relPath}`)
    return null
  }
  const fileData = fs.readFileSync(fullPath)
  const uploaded = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: fileData,
      mimetype: 'image/png',
      name: path.basename(fullPath),
      size: fs.statSync(fullPath).size,
    },
  })
  console.log(`    [IMG] Uploaded "${path.basename(fullPath)}" → id:${uploaded.id}`)
  return uploaded.id as string
}

// ─── Case study data ─────────────────────────────────────────────────────────

const caseStudies = [
  // ── 1. LOGISTICS & SUPPLY CHAIN ──────────────────────────────────────────
  {
    title: 'Paper Trail',
    client: 'Java Paper Group (Annual Revenue: ₹100Cr+)',
    industry: 'Logistics & Supply Chain',
    tagline: 'Transforming a 40-Year Legacy Supply Chain into a Real-Time Digital Ecosystem',
    clientDescription:
      'A legacy leader in the paper industry, supplying raw material to giants like ITC and Iggesund (Apple\'s packaging partner).',
    challenge:
      'Despite high revenue, operations were opaque. Tracking paper reels from the mill to the warehouse to the customer required a manual team of 3 staff members working 48 man-hours weekly. There was no visibility into "Trimmed" vs. "Wound" stock, and vendor data was siloed.',
    solutions: [
      'Vendor Integration: Built dedicated secure portals for enterprise clients (ITC, Parksons) to view their specific inventory in real-time.',
      'Granular Tracking: Implemented a serialized tracking system showing exact status (transit, warehouse location, driver mobile number).',
      'Visual Intelligence: Created "Location-Wise" and "Status-Wise" pie chart dashboards for instant decision-making.',
      'Automated Workflow: Digitized the "Pending Sheet to Ready Sheet" conversion pipeline, removing manual entry errors.',
    ],
    impact: [
      '98% Efficiency Gain: Operational management time reduced from 48 hours/week to just 30 minutes/week.',
      'Workforce Optimization: Reduced management requirement from 3 staff members to a single administrator.',
      'Transparency: Zero "Where is my order?" calls from major clients due to self-serve portals.',
    ],
    order: 1,
    images: {
      cover: 'Paper Trail/Paper Trail_Thumbnail.png',
      hero: 'Paper Trail/Paper Trail_Internal Thumbnail.png',
      screenshots: [
        { file: 'Paper Trail/Paper Trail_Image 1.png', caption: 'Live inventory dashboard' },
        { file: 'Paper Trail/Paper Trail_Image 2.png', caption: 'Vendor portal view' },
        { file: 'Paper Trail/Paper Trail_Image 3.png', caption: 'Status-wise pie chart' },
      ],
    },
  },

  // ── 2. FINTECH & LOYALTY ──────────────────────────────────────────────────
  {
    title: 'The Reward Network',
    client: 'Alliances Galore (Acquired by Thriwe)',
    industry: 'Fintech & Loyalty',
    tagline: 'Architecting the Digital Backbone for India\'s Premier Banking Loyalty Programs',
    clientDescription:
      'The backend force behind loyalty programs for India\'s top financial institutions.',
    challenge:
      'The client managed thousands of dining offers across 20+ national banks but lacked a unified, scalable digital infrastructure to deliver these offers to cardholders in real-time. They needed a system capable of handling high concurrency during festivals like the "Great Indian Restaurant Festival" or "Gourmet Fest."',
    solutions: [
      'Ecosystem Integration: Launched white-labeled platforms for HDFC Bank (Good Food Fest), Axis Bank (Dining Delights), Standard Chartered (The Good Life), and Shoppers Stop.',
      'Dynamic Algorithms: Engineered "Trending Restaurant" algorithms that auto-curated listings based on user location (Mumbai, Delhi, Bangalore) and booking volume.',
      'Scale: System architecture designed to handle 100,000+ restaurant partners and millions of cardholder queries simultaneously.',
      'Multi-Tenant Engine: Built a Loyalty Marketplace Engine capable of serving distinct brand experiences from a single core.',
    ],
    impact: [
      'Market Dominance: Powered the loyalty engines for 5 of India\'s top banks simultaneously.',
      'User Engagement: Facilitated millions of voucher redemptions and table reservations.',
      'Successful Exit: The robustness of the tech stack was a key asset in the client\'s acquisition by Thriwe.',
    ],
    order: 2,
    images: {
      cover: 'The Reward Network/The Reward Networks_Thumbnail.png',
      hero: 'The Reward Network/The Reward Network_Internal Thumbnail.png',
      screenshots: [
        { file: 'The Reward Network/The Reward Network_Image 1.png', caption: 'HDFC Good Food Fest portal' },
        { file: 'The Reward Network/The Reward Network_Image 2.png', caption: 'Trending restaurants algorithm' },
        { file: 'The Reward Network/The Reward Network_Image 3.png', caption: 'Multi-bank dashboard' },
      ],
    },
  },

  // ── 3. CONSUMER TECH & E-COMMERCE ────────────────────────────────────────
  {
    title: 'Uber Dreams',
    client: 'Uber Dreams',
    industry: 'Consumer Tech & E-Commerce',
    tagline: 'Building High-Load Auction Infrastructure for Celebrity Experiences',
    clientDescription:
      'An experiential e-commerce platform auctioning exclusive interactions with icons like Sachin Tendulkar, Virat Kohli, and Mary Kom.',
    challenge:
      'Auction models are technically demanding. They require real-time state management (who is winning right now?) and high-trust payment processing. A crash during a "Virat Kohli Dinner" auction would be catastrophic for the brand\'s reputation.',
    solutions: [
      'Pay-to-Rank Logic: A custom algorithm allowing users to pay incrementally to secure top leaderboard positions.',
      'Philanthropic Routing: Automated payment splitting logic that routed 10% of all earnings directly to Girl Child Education funds.',
      'High-Availability Architecture: Built to sustain massive traffic spikes when celebrities tweeted auction links.',
      'Real-Time Bidding Engine: Developed a gamified commerce engine with live state management.',
    ],
    impact: [
      'High Value: Average Order Value (AOV) consistently exceeded ₹5,000.',
      'Traffic Scale: Supported 10,000+ Monthly Active Users with zero downtime during peak auctions.',
      'Social Impact: Successfully funded education for hundreds of children through automated revenue splits.',
    ],
    order: 3,
    images: null,
  },

  // ── 4. SAAS & MOBILE ─────────────────────────────────────────────────────
  {
    title: 'VizaClubs',
    client: 'HealthTech Startup (VizaClubs)',
    industry: 'SaaS & Mobile',
    tagline: 'Disrupting Gym Management with a "Trainer-First" SaaS Ecosystem',
    clientDescription:
      'A HealthTech startup rethinking fitness management software by putting trainers at the center.',
    challenge:
      'Existing gym software focused only on the owner (billing). Trainers — the people actually driving revenue — were ignored, leading to low motivation and high churn.',
    solutions: [
      'Transparency Engine: Created a dedicated "Earnings Dashboard" for trainers to view their commissions in real-time.',
      'Multi-Platform Sync: Seamless synchronization between the admin web panel and the trainer\'s mobile app.',
      'Trainer-Centric Design: Flipped the model by building a SaaS Ecosystem spanning Web, iOS, and Android.',
      'Owner Dashboard: Comprehensive gym management tools for billing, attendance, and performance tracking.',
    ],
    impact: [
      'Adoption: Deployed across 30+ gyms in Mumbai and Navi Mumbai.',
      'Revenue Generation: Helped 150+ enrolled trainers generate over ₹50 Lacs in verifiable revenue.',
      'Engagement: "Trainer-first" design led to significantly higher daily active usage compared to competitor platforms.',
    ],
    order: 4,
    images: {
      cover: 'Vizaclubs/Vizaclubs_Thumbnail.png',
      hero: 'Vizaclubs/Vizaclubs_Internal Thumbnail.png',
      screenshots: [
        { file: 'Vizaclubs/Vizaclubs_Image 1.png', caption: 'Trainer earnings dashboard' },
        { file: 'Vizaclubs/Vizaclubs_Image 2.png', caption: 'Mobile app — trainer view' },
        { file: 'Vizaclubs/Vizaclubs_Image 3.png', caption: 'Admin gym management panel' },
      ],
    },
  },

  // ── 5. EDUCATION & SECURITY ───────────────────────────────────────────────
  {
    title: 'EduCore',
    client: 'Ryan International School (100+ Locations)',
    industry: 'Education & Security',
    tagline: 'Delivering Military-Grade Security for a Global K-12 Network',
    clientDescription:
      'One of the world\'s largest private school chains with campuses across India, Sri Lanka, and Dubai.',
    challenge:
      'The client needed a standardized web presence for 100+ schools. Standard CMS options (like WordPress) were rejected by their IT security team due to vulnerability risks. They needed the ease of a CMS with the security of a bank.',
    solutions: [
      'Security First: The architecture was built specifically to pass stringent VAPT (Vulnerability Assessment and Penetration Testing) protocols.',
      'Centralized Command: A "Super-Admin" structure allowing HQ to push updates to 100+ microsites instantly while allowing local schools to edit their own content.',
      'Proprietary Multisite CMS: Engineered a custom CMS from the ground up — not WordPress, not a generic template.',
      'Zero-Trust Architecture: Every data endpoint hardened against injection, XSS, and CSRF attacks.',
    ],
    impact: [
      'Speed to Market: Core engine delivered in 6 months; full roll-out to 100+ sites completed in just 4 months.',
      'Zero Breaches: The system has maintained 100% uptime and security integrity across 3 countries.',
      'VAPT Certified: Passed all penetration testing audits with zero critical vulnerabilities.',
    ],
    order: 5,
    images: {
      cover: 'Educore/Educore_Thumbnails.png',
      hero: 'Educore/Educore_Internal Thumbnail.png',
      screenshots: [
        { file: 'Educore/Educore_Image 1.png', caption: 'Super-admin multisite dashboard' },
        { file: 'Educore/Educore_Image 2.png', caption: 'School microsite — public view' },
      ],
    },
  },

  // ── 6. AI & AUTOMATION ───────────────────────────────────────────────────
  {
    title: 'Sentience AI',
    client: 'Leading Real Estate Developer (Confidential)',
    industry: 'AI & Automation',
    tagline: 'Replacing Call Centers with Autonomous Voice AI Agents',
    clientDescription:
      'A leading real estate developer generating thousands of inbound leads per month with an under-resourced manual sales team.',
    challenge:
      'The client was generating thousands of leads, but their manual sales team took hours to respond. By the time they called, the lead was cold. They were bleeding potential revenue.',
    solutions: [
      'Instant Response: The AI initiates a call within seconds of a lead form submission.',
      'Natural Language Vetting: The AI converses with the prospect, checks budget and intent, and filters out "window shoppers."',
      'Hot-Transfer: Only qualified leads are passed to human sales agents.',
      'CRM Integration: Sentience is deeply integrated with the internal CRM for full pipeline visibility.',
    ],
    impact: [
      'Zero Leakage: 100% of leads are contacted immediately.',
      'Cost Savings: Saved Crores in manual call-center operational costs.',
      'Sales Velocity: Lead-to-site-visit ratio improved drastically due to instant engagement.',
    ],
    order: 6,
    images: null,
  },

  // ── 7. SOCIAL IMPACT ─────────────────────────────────────────────────────
  {
    title: 'Everyone Inspires',
    client: 'Everyone Inspires Foundation',
    industry: 'Social Impact',
    tagline: '10 Years of Sustained Community Impact through Trusted Tech',
    clientDescription:
      'A non-profit foundation driving donations for Human Rights, Cancer Care, and Animal Welfare causes.',
    challenge:
      'The donation sector suffers from a massive trust deficit. Users are hesitant to donate online due to fears of fraud or lack of community.',
    solutions: [
      'Social Trust: Integrated "Social Auth" (LinkedIn/Facebook/Google) to verify donor identities, making the platform transparent.',
      'Network Effects: Built features allowing donors to see who else is giving, fostering a sense of community peer pressure for good.',
      'Community-First Portal: Designed around donor transparency and social proof, not just transaction processing.',
      'Secure Payment Gateway: End-to-end encrypted donation flows with automated tax receipt generation.',
    ],
    impact: [
      'Longevity: The platform has been fully operational for 10 years, proving extreme system stability.',
      'Volume: 5,000+ Registered Users.',
      'Funds Raised: Facilitated ₹30 Lacs+ in donations for Human Rights, Cancer Care, and Animal Welfare.',
    ],
    order: 7,
    images: {
      cover: 'Everyone Inspire/Everyone Inspire_Thumbnails.png',
      hero: 'Everyone Inspire/Everyone Inspire_Internal Thumbnail.png',
      screenshots: [
        { file: 'Everyone Inspire/Everyone Inspire_Image 1.png', caption: 'Community donation feed' },
        { file: 'Everyone Inspire/Everyone Inspire_Image 2.png', caption: 'Donor social proof wall' },
      ],
    },
  },

  // ── 8. MANUFACTURING & INDUSTRY 4.0 — B.M. Raj ───────────────────────────
  {
    title: 'B.M. Raj & Co.',
    client: 'B.M. Raj & Co. (Plastic & Injection Molding)',
    industry: 'Manufacturing & Industry 4.0',
    tagline: 'Breaking the Growth Ceiling: Scaling Revenue from ₹70Cr to ₹100Cr+ through Digital Operations',
    clientDescription:
      'A robust mid-cap manufacturing unit specializing in high-volume plastic injection molding.',
    challenge:
      'The company had hit a "Growth Plateau." They were stuck at ₹70 Crores in annual revenue — not because of a lack of demand, but because of operational friction. Manual inventory tracking, disconnected production lines, and reliance on Excel sheets meant they physically couldn\'t handle more orders without breaking their processes.',
    solutions: [
      'Inventory Digitization: Replaced manual stock-taking with a digital flow system, ensuring real-time visibility of raw plastic granules vs. finished molded units.',
      'Workflow Automation: Automated the handoffs between the molding floor and the packaging warehouse, removing human bottlenecks.',
      'Data-Driven Forecasting: Implemented simple predictive models to align raw material procurement with upcoming order cycles.',
      'End-to-End ERP: A single dashboard replacing Excel sheets across every production stage.',
    ],
    impact: [
      'Revenue Breakthrough: The digital backbone allowed the factory to handle higher throughput, pushing annual revenue past ₹100 Crore within 12 months.',
      'Scalability: The client can now add new production lines without adding proportional administrative staff.',
      'Margin Recovery: Eliminated Excel-driven errors that previously caused costly over-procurement.',
    ],
    order: 8,
    images: {
      cover: 'BM Raj/BM Raj_Thumbnails.png',
      hero: 'BM Raj/BM Raj_Internal Thumbnail.png',
      screenshots: [
        { file: 'BM Raj/BM Raj_Image 1.png', caption: 'Production floor live dashboard' },
        { file: 'BM Raj/BM Raj_Image 2.png', caption: 'Inventory flow tracker' },
        { file: 'BM Raj/BM Raj_Image 3.png', caption: 'Procurement forecasting module' },
      ],
    },
  },

  // ── 9. MANUFACTURING & INDUSTRY 4.0 — Swaraj ────────────────────────────
  {
    title: 'Swaraj Furniture',
    client: 'Swaraj Furniture',
    industry: 'Manufacturing & Industry 4.0',
    tagline: 'Digital Craftsmanship: Boosting Production Floor Productivity by 35%',
    clientDescription:
      'A bespoke furniture manufacturer dealing with expensive raw materials (Teak, Oak, Ply) and skilled labor.',
    challenge:
      'Tracking "Wood Consumption" is notoriously difficult — how much wood was used vs. how much was wasted as sawdust/scraps? Tracking labor hours per custom piece was pure guesswork, leading to inaccurate pricing and margin leaks.',
    solutions: [
      'Material Tracking: A granular module to track wood consumption per project, instantly highlighting wastage anomalies.',
      'Labor Logic: A digital job-card system where craftsmen log time against specific units (e.g., "Sofa Frame A"), giving management true "Cost-to-Build" data.',
      'Production Visibility: A dashboard showing the exact stage of every furniture piece (Cutting → Assembly → Polishing → QA).',
      'Custom Manufacturing ERP: Engineered specifically for wood-working workflows — not a generic off-the-shelf tool.',
    ],
    impact: [
      'Productivity Surge: Operational visibility led to a 35% increase in production floor productivity.',
      'Margin Protection: Accurate costing allowed the client to price products correctly, protecting profit margins on custom orders.',
      'Waste Reduction: Wood wastage anomalies surfaced and resolved within days of deployment.',
    ],
    order: 9,
    images: null,
  },

  // ── 10. MANUFACTURING & INDUSTRY 4.0 — Atlas ────────────────────────────
  {
    title: 'Atlas Technologies',
    client: 'Atlas Technologies',
    industry: 'Manufacturing & Industry 4.0',
    tagline: 'Heavy Machinery, Light Data: Bringing IoT to Asphalt Plants',
    clientDescription:
      'A leading manufacturer of heavy industrial road-building equipment and asphalt plants.',
    challenge:
      'The client was selling "dumb iron" — massive, expensive machines that had no digital intelligence. Once a machine was sold to a road contractor, Atlas lost visibility. Clients only called when the machine broke down, leading to costly downtime and project delays.',
    solutions: [
      'Smart Monitoring: Developed dashboards that pull real-time data from machine sensors (temperature, pressure, mix output).',
      'Remote Diagnostics: Enabled Atlas engineers to view machine health remotely, diagnosing issues before sending a technician to the site.',
      'Industrial IoT Integration: Connected physical machinery to a cloud data layer for the first time.',
      'Predictive Maintenance Alerts: Automated notifications when sensor readings approach critical thresholds.',
    ],
    impact: [
      'Servitization: Transformed Atlas from a "Machine Seller" to a "Solution Provider."',
      'Uptime: Significantly improved machine uptime for end-customers through proactive health monitoring.',
      'Predictive Maintenance: Reduced unplanned downtime through early fault detection.',
    ],
    order: 10,
    images: null,
  },

  // ── 11. NICHE REAL ESTATE ─────────────────────────────────────────────────
  {
    title: 'PlotWise',
    client: 'A Leading Local Real Estate Firm (Confidential)',
    industry: 'Niche Real Estate',
    tagline: 'Beating the Giants: Building a Hyper-Local Aggregator that Generates ₹12 Cr Revenue',
    clientDescription:
      'A specialized real estate player focused on "NA Plots" (Non-Agricultural Land) and niche properties in a specific region.',
    challenge:
      'The client was competing against billion-dollar giants like MagicBricks and 99acres. However, these giants were too generic — they treated a "Farm Plot" the same as an "Apartment." Niche buyers needed specific data (Soil Type, Zone Regulations, FSI limits) that the big platforms simply didn\'t offer.',
    solutions: [
      'Granular Search: Unlike generic portals, engineered 30+ specific filters relevant to land buyers (e.g., "Distance from Highway," "Water Source," "NA Order Status").',
      'Scale: Onboarded 1,000+ verified listings with rich media and geo-tagged locations.',
      'SEO Dominance: Structured the data to capture high-intent local search traffic that the big players were ignoring.',
      '90-Day Build: Entire hyper-verticalized discovery portal designed, built, and launched in just 90 days.',
    ],
    impact: [
      'Rapid ROI: The platform is projected to generate ₹12 Crores in revenue in its first operational year.',
      'Market Leadership: Instantly became the "Go-To" authority for land deals in the region, displacing generic competitors.',
      'Speed: Full portal built and launched in 90 days from kickoff.',
    ],
    order: 11,
    images: null,
  },

  // ── 12. HEALTHCARE AT SCALE ───────────────────────────────────────────────
  {
    title: 'Bombay Hospital',
    client: 'Bombay Hospital (1,000+ Beds)',
    industry: 'Healthcare at Scale',
    tagline: 'Orchestrating Care: Predictive Analytics for 1,000+ Bed Management',
    clientDescription:
      'One of India\'s most prestigious and largest private healthcare institutions with 1,000+ beds across multiple wings.',
    challenge:
      'Managing patient flow in a 1,000-bed facility is a logistical nightmare. Manual tracking led to "False Full" status (beds empty but marked full) and long patient wait times in the lobby.',
    solutions: [
      'Live Occupancy: Real-time dashboards showing bed status across all wings (ICU, General, Private).',
      'Flow Optimization: Algorithms that predicted discharge times to alert housekeeping and admissions teams before the bed was empty.',
      'Integrated HMS: A Hospital Management System that connects admissions, discharge, and housekeeping in one workflow.',
      'Predictive Analytics: Patient flow models that optimized critical care resource allocation proactively.',
    ],
    impact: [
      'Resource Optimization: Drastically reduced the turnaround time between "Patient Discharge" and "New Patient Admission."',
      'Patient Experience: Reduced waiting times for critical care admissions, directly impacting patient outcomes.',
      'Operational Clarity: Eliminated "False Full" status entirely — every bed tracked in real-time.',
    ],
    order: 12,
    images: null,
  },
]

// ─── Main seed ────────────────────────────────────────────────────────────────

async function seed() {
  const payload = await getPayload({ config })
  console.log('=== Seeding Case Studies ===\n')

  for (const cs of caseStudies) {
    console.log(`\n→ ${cs.title}`)

    // ── Upload images ──────────────────────────────────────────────────────
    let coverId: string | null = null
    let heroId: string | null = null
    const screenshotIds: { image: string; caption: string }[] = []

    if (cs.images) {
      coverId = await uploadImage(payload, cs.images.cover, `${cs.title} — cover`)
      heroId = await uploadImage(payload, cs.images.hero, `${cs.title} — hero`)

      for (const s of cs.images.screenshots) {
        const id = await uploadImage(payload, s.file, `${cs.title} — ${s.caption}`)
        if (id) screenshotIds.push({ image: id, caption: s.caption })
      }
    }

    // ── Require a cover image (Payload field is required) ─────────────────
    if (!coverId) {
      // Fall back to first available media in DB
      const anyMedia = await payload.find({ collection: 'media', limit: 1 })
      coverId = anyMedia.docs[0]?.id as string ?? null
      if (!coverId) {
        console.log(`  [SKIP] No cover image available for "${cs.title}" — upload at least one image first`)
        continue
      }
      console.log(`    [FALLBACK] Using existing media id:${coverId} as cover`)
    }

    // ── Delete existing so we can re-seed cleanly ──────────────────────────
    const existing = await payload.find({
      collection: 'case-studies',
      where: { title: { equals: cs.title } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      await payload.delete({ collection: 'case-studies', id: existing.docs[0].id })
      console.log(`    [DEL] Removed old record`)
    }

    // ── Create ─────────────────────────────────────────────────────────────
    await payload.create({
      collection: 'case-studies',
      data: {
        title: cs.title,
        client: cs.client,
        industry: cs.industry,
        tagline: cs.tagline,
        clientDescription: cs.clientDescription,
        challenge: cs.challenge,
        coverImage: coverId,
        heroImage: heroId ?? undefined,
        screenshots: screenshotIds.length > 0 ? screenshotIds : undefined,
        solutions: toBulletList(cs.solutions),
        impact: toBulletList(cs.impact),
        status: 'published',
        order: cs.order,
      } as any,
    })

    console.log(`    [OK] Created "${cs.title}"`)
  }

  console.log('\n=== Done! All case studies seeded. ===')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
