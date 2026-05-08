import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

// Absolute path to the AMC images folder on your machine
const AMC_IMAGES_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/AMC SERVICES'

function getMimeType(filename: string): string {
  return filename.toLowerCase().endsWith('.svg') ? 'image/svg+xml' : 'image/png'
}

async function uploadImage(payload: any, filename: string, alt: string): Promise<string | null> {
  const filePath = path.join(AMC_IMAGES_DIR, filename)
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠  Not found: ${filename}`)
    return null
  }
  const fileData = fs.readFileSync(filePath)
  const uploaded = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: fileData,
      mimetype: getMimeType(filename),
      name: filename,
      size: fs.statSync(filePath).size,
    },
  })
  console.log(`  ✓  Uploaded: ${filename}  (id: ${uploaded.id})`)
  return uploaded.id
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('\n=== Uploading AMC Services images ===\n')

  // ── Section 10: Process Steps ────────────────────────────────────
  console.log('• Process steps:')
  const processIcons = [
    { file: 'Product Review & Scope Definition.svg',         title: 'Product Review & Scope Definition',         description: 'We review your product, understand current state, and define the maintenance scope.' },
    { file: 'Contract & SLA Agreement.svg',                  title: 'Contract & SLA Agreement',                  description: 'We finalise SLAs, response times, and coverage terms before work begins.' },
    { file: 'Scheduled Maintenance Setup.svg',               title: 'Scheduled Maintenance Setup',               description: 'Recurring maintenance tasks are structured and scheduled from day one.' },
    { file: 'Break-Fix Support Operations.svg',              title: 'Break-Fix Support Operations',              description: 'Reactive bug fixes and incident response handled within agreed SLA windows.' },
    { file: 'Feature Addition Management.svg',               title: 'Feature Addition Management',               description: 'Minor enhancements and feature additions managed within the existing contract.' },
    { file: 'Reporting & Contract Review.svg',               title: 'Reporting & Contract Review',               description: 'Regular performance reports and contract review meetings to ensure alignment.' },
  ]
  const processSteps = []
  for (const item of processIcons) {
    const id = await uploadImage(payload, item.file, item.title)
    processSteps.push({ icon: id ?? undefined, title: item.title, description: item.description })
  }

  // ── Section 6: Thinking Model ────────────────────────────────────
  console.log('\n• Thinking model principles:')
  const thinkingIcons = [
    { file: 'Scheduled and Reactive Work Run on Separate Tracks.svg', title: 'Scheduled and Reactive Work Run on Separate Tracks', description: 'Planned maintenance and reactive fixes operate independently so neither blocks the other.' },
    { file: 'Scope Defined at Contract Start, Not at Each Request.svg', title: 'Scope Defined at Contract Start',                    description: 'Everything is agreed upfront — no scope creep, no surprise costs per request.' },
    { file: 'Security and Dependency Management on a Defined Schedule.svg', title: 'Security & Dependency Management on Schedule',   description: 'Security patches and dependency upgrades run on a defined, predictable cadence.' },
    { file: 'The Codebase Maintained as if It Will Be Extended.svg',   title: 'Codebase Maintained as if It Will Be Extended',       description: 'We treat every maintenance task as prep for the next phase of growth.' },
  ]
  const thinkingModelPrinciples = []
  for (const item of thinkingIcons) {
    const id = await uploadImage(payload, item.file, item.title)
    thinkingModelPrinciples.push({ icon: id ?? undefined, title: item.title, description: item.description })
  }

  // ── Section 8: What Makes Us Unique ──────────────────────────────
  console.log('\n• What makes us unique:')
  const uniqueIcons = [
    { file: 'Minor Enhancements Within the Same Contract.svg',          title: 'Minor Enhancements Within the Same Contract',      description: 'Small improvements are handled inside the AMC — no separate engagement needed.' },
    { file: 'Feature Additions Without a New Engagement Every Time.svg', title: 'Feature Additions Without a New Engagement',      description: 'Evolve your product without re-negotiating a new contract for every change.' },
    { file: '7 Managed Operations.png',                                  title: '7 Managed Operations Covered',                     description: 'Seven core operation categories covered under one structured maintenance contract.' },
    { file: 'Scheduled Maintenance Before Reactive Support.svg',         title: 'Scheduled Maintenance Before Reactive Support',    description: 'Proactive upkeep is prioritised over firefighting to reduce incident volume.' },
  ]
  const uniqueSectionItems = []
  for (const item of uniqueIcons) {
    const id = await uploadImage(payload, item.file, item.title)
    uniqueSectionItems.push({ icon: id ?? undefined, title: item.title, description: item.description })
  }

  // ── Section 15: Audience Carousel ────────────────────────────────
  console.log('\n• Audience carousel:')
  const audienceImages = [
    { file: 'Clients Who Built With Nexus and Want Continuous Maintenance Coverage.png', title: 'Clients Who Built With Nexus', description: 'Teams that shipped with Nexus and want continuous, structured post-launch maintenance.' },
    { file: 'We Scope the Contract Around the Product, Not.svg',                          title: 'Product-Scoped Contracts',   description: 'We design the AMC around your actual product — not a generic template.' },
  ]
  const audienceItems = []
  for (const item of audienceImages) {
    const id = await uploadImage(payload, item.file, item.title)
    audienceItems.push({ image: id ?? undefined, title: item.title, description: item.description })
  }

  // ── Find AMC service ─────────────────────────────────────────────
  console.log('\n• Updating AMC service in CMS...')
  const result = await payload.find({
    collection: 'services',
    where: { title: { equals: 'Annual Maintenance Contract (AMC)' } },
    limit: 1,
  })

  if (result.docs.length === 0) {
    console.error('  ✗  AMC service not found. Check the title in the CMS.')
    process.exit(1)
  }

  const svc = result.docs[0]

  // Merge: keep existing array content if already populated, otherwise set new
  const existingSteps: any[]      = (svc as any).processSteps ?? []
  const existingPrinciples: any[] = (svc as any).thinkingModelPrinciples ?? []
  const existingUnique: any[]     = (svc as any).uniqueSectionItems ?? []
  const existingAudience: any[]   = (svc as any).audienceItems ?? []

  function mergeIcons(existing: any[], incoming: any[], iconKey: string) {
    return incoming.map((item, i) => {
      const base = existing[i] ?? {}
      return {
        title: base.title || item.title,
        description: base.description || item.description,
        [iconKey]: item[iconKey], // always use the freshly uploaded icon
      }
    })
  }

  await payload.update({
    collection: 'services',
    id: svc.id,
    data: {
      // Section 6
      thinkingModelLabel:       'HOW OUR AMC WORKS',
      thinkingModelTitle:       'Towards a Stable Product: Our Thinking Model',
      thinkingModelDescription: 'We separate scheduled and reactive work so both run cleanly — no firefighting delays planned maintenance.',
      thinkingModelPrinciples:  mergeIcons(existingPrinciples, thinkingModelPrinciples, 'icon'),

      // Section 8
      uniqueSectionTitle:  'What Makes Our AMC Unique?',
      uniqueSectionItems:  mergeIcons(existingUnique, uniqueSectionItems, 'icon'),

      // Section 10
      processSectionTitle:    'Step-by-Step AMC Delivery',
      processSectionSubtitle: 'From scope definition to ongoing reporting — every phase is structured and predictable.',
      processSteps:           mergeIcons(existingSteps, processSteps, 'icon'),

      // Section 15
      audienceSectionTitle: 'Who Our AMC Is For',
      audienceItems:        mergeIcons(existingAudience, audienceItems, 'image'),
    },
  })

  console.log('\n✓ AMC service updated with all images.\n')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
