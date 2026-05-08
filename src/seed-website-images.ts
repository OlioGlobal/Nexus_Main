import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const BASE_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/WEBSITE DEVELOPMENT SERVICES'

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
    where: { slug: { equals: 'website-development-services' } },
    limit: 1,
    depth: 0,
  })
  if (result.docs.length === 0) {
    console.error('✗  Service not found: website-development-services')
    process.exit(1)
  }
  const svc = result.docs[0] as any
  console.log(`\nFound: "${svc.title}" (id: ${svc.id})\n`)

  // ── Approach folder → thinkingModelPrinciples icons ─────────────
  console.log('• Thinking model principles (Approach folder):')
  const thinkingMap = [
    { file: 'Approach/Commercial Outcome Before Creative Direction.svg',                        title: 'Commercial Outcome Before Creative Direction' },
    { file: 'Approach/Platform Chosen for the Team Managing It, Not the Team Building It.svg',  title: 'Platform Chosen for the Team Managing It, Not the Team Building It' },
    { file: 'Approach/Responsive Design Built In, Not Bolted.svg',                             title: 'Responsive Design Built In, Not Bolted' },
    { file: 'Approach/Performance Is a Design Requirement, Not a Post-Launch Fix.svg',          title: 'Performance Is a Design Requirement, Not a Post-Launch Fix' },
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
    { file: '4 cards/We Define the Conversion Goal Before We Design a Single Page.svg', title: 'We Define the Conversion Goal Before We Design a Single Page' },
    { file: '4 cards/We Build for the Content Team, Not Just the Launch.svg',           title: 'We Build for the Content Team, Not Just the Launch' },
    { file: '4 cards/Full-Stack Where the Project Needs It.svg',                        title: 'Full-Stack Where the Project Needs It' },
    { file: '4 cards/Performance and SEO Built Into the Build.svg',                     title: 'Performance and SEO Built Into the Build' },
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
    { file: 'steps/Discovery & Requirements Definition.svg',    title: 'Discovery & Requirements Definition' },
    { file: 'steps/Information Architecture & Conversion Design.svg', title: 'Information Architecture & Conversion Design' },
    { file: 'steps/UX Design.svg',                              title: 'UI/UX Design' },
    { file: 'steps/Development.svg',                            title: 'Development' },
    { file: 'steps/Integration & Testing.svg',                  title: 'Integration & Testing' },
    { file: 'steps/Deployment & Launch.svg',                    title: 'Deployment & Launch' },
    { file: 'steps/Handover, Training & Documentation.svg',     title: 'Handover, Training & Documentation' },
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
    { file: 'Businesses That Need a New Website Built to Perform.png',                   title: 'Businesses That Need a New Website Built to Perform' },
    { file: 'Companies Whose Current Website No Longer Reflects the Brand or Converts.png', title: 'Companies Whose Current Website No Longer Reflects the Brand or Converts' },
    { file: 'Enterprises Building Web Applications or Internal Portals.png',              title: 'Enterprises Building Web Applications or Internal Portals' },
    { file: 'E-Commerce Businesses Building or Rebuilding Their Online Store.png',        title: 'E-Commerce Businesses Building or Rebuilding Their Online Store' },
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

  console.log('\n✓  Website Development Services updated with all icons.\n')
  process.exit(0)
}

seed().catch((err) => { console.error(err); process.exit(1) })
