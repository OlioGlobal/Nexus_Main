import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const BASE_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/UIUX Consulting Services'

function getMimeType(filename: string): string {
  return filename.toLowerCase().endsWith('.svg') ? 'image/svg+xml' : 'image/png'
}

async function uploadImage(payload: any, filePath: string, alt: string): Promise<string | null> {
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠  Not found: ${filePath}`)
    return null
  }
  const filename = path.basename(filePath)
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

  // ── Fetch existing service ───────────────────────────────────────
  const result = await payload.find({
    collection: 'services',
    where: { slug: { equals: 'ui-ux-design-and-consulting-services' } },
    limit: 1,
    depth: 0,
  })
  if (result.docs.length === 0) {
    console.error('✗  Service not found: ui-ux-design-and-consulting-services')
    process.exit(1)
  }
  const svc = result.docs[0] as any
  console.log(`\nFound: "${svc.title}" (id: ${svc.id})\n`)

  // ── approach folder → thinkingModelPrinciples icons ─────────────
  console.log('• Thinking model principles (approach folder):')
  const thinkingMap = [
    { file: 'approach/Research Leads, Recommendations Follow.svg',                      title: 'Research Leads, Recommendations Follow' },
    { file: 'approach/The Entire User Journey, Not Just a Bunch of Screen Designs.svg', title: 'The Entire User Journey, Not Just a Bunch of Screen Designs' },
    { file: 'approach/UX Strategy Before UI Direction.svg',                              title: 'UX Strategy Before UI Direction' },
    { file: 'approach/User Testing Insights for Course Corrections.svg',                 title: 'User Testing Insights for Course Corrections' },
  ]
  const thinkingPrinciples = []
  for (const item of thinkingMap) {
    const id = await uploadImage(payload, path.join(BASE_DIR, item.file), item.title)
    const existing = (svc.thinkingModelPrinciples ?? []).find((x: any) => x.title === item.title) ?? {}
    thinkingPrinciples.push({ ...existing, title: item.title, icon: id ?? existing.icon })
  }

  // ── 4 cards folder → uniqueSectionItems icons ────────────────────
  console.log('\n• Unique section items (4 cards folder):')
  const uniqueMap = [
    { file: '4 cards/We audit before we advise..svg',                        title: 'We audit before we advise.' },
    { file: '4 cards/We map journeys, not screens..svg',                     title: 'We map journeys, not screens.' },
    { file: '4 cards/We separate the UX problem from the UI solution..svg',  title: 'We separate the UX problem from the UI solution.' },
    { file: '4 cards/Findings that your team can act on the next day..svg',  title: 'Findings that your team can act on the next day.' },
  ]
  const uniqueItems = []
  for (const item of uniqueMap) {
    const id = await uploadImage(payload, path.join(BASE_DIR, item.file), item.title)
    const existing = (svc.uniqueSectionItems ?? []).find((x: any) => x.title === item.title) ?? {}
    uniqueItems.push({ ...existing, title: item.title, icon: id ?? existing.icon })
  }

  // ── steps folder → processSteps icons ───────────────────────────
  console.log('\n• Process steps (steps folder):')
  const stepsMap = [
    { file: 'steps/Discovery & Stakeholder Alignment.svg', title: 'Discovery & Stakeholder Alignment' },
    { file: 'steps/UX Audit.svg',                          title: 'UX Audit' },
    { file: 'steps/UX Research & Usability Testing.svg',   title: 'UX Research & Usability Testing' },
    { file: 'steps/User Journey Mapping.svg',              title: 'User Journey Mapping' },
    { file: 'steps/UX Design Strategy.svg',                title: 'UX Design Strategy' },
  ]
  const processSteps = []
  for (const item of stepsMap) {
    const id = await uploadImage(payload, path.join(BASE_DIR, item.file), item.title)
    const existing = (svc.processSteps ?? []).find((x: any) => x.title === item.title) ?? {}
    processSteps.push({ ...existing, title: item.title, icon: id ?? existing.icon })
  }

  // ── root folder → audienceItems images ──────────────────────────
  console.log('\n• Audience items (root folder):')
  const audienceMap = [
    { file: 'Product Teams Ready To Back Their Next Design Cycle With Research.png',  title: 'Product Teams Ready To Back Their Next Design Cycle With Research' },
    { file: 'Businesses Building New Digital Products Before Development Begins.png',  title: 'Businesses Building New Digital Products Before Development Begins' },
    { file: 'Enterprises Whose Software Should Reflect The Strength Of Their Brand.png', title: 'Enterprises Whose Software Should Reflect The Strength Of Their Brand' },
  ]
  const audienceItems = []
  for (const item of audienceMap) {
    const id = await uploadImage(payload, path.join(BASE_DIR, item.file), item.title)
    const existing = (svc.audienceItems ?? []).find((x: any) => x.title === item.title) ?? {}
    audienceItems.push({ ...existing, title: item.title, image: id ?? existing.image })
  }

  // ── Update service ───────────────────────────────────────────────
  console.log('\n• Updating service in CMS...')
  await payload.update({
    collection: 'services',
    id: svc.id,
    data: {
      thinkingModelPrinciples: thinkingPrinciples,
      uniqueSectionItems:      uniqueItems,
      processSteps:            processSteps,
      audienceItems:           audienceItems,
    },
  })

  console.log('\n✓  UI/UX Consulting Services updated with all icons.\n')
  process.exit(0)
}

seed().catch((err) => { console.error(err); process.exit(1) })
