import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const BASE_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/TECHNOLOGY TRANSFORMATION CONSULTING'

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

  const result = await payload.find({
    collection: 'services',
    where: { slug: { equals: 'technology-transformation-consulting' } },
    limit: 1,
    depth: 0,
  })
  if (result.docs.length === 0) {
    console.error('✗  Service not found: technology-transformation-consulting')
    process.exit(1)
  }
  const svc = result.docs[0] as any
  console.log(`\nFound: "${svc.title}" (id: ${svc.id})\n`)

  // ── Thinking model principles ────────────────────────────────────
  console.log('• Thinking model principles:')
  const thinkingMap = [
    'Change Readiness Before Change Delivery',
    'Impact Analysis Before Engagement Planning',
    'Resistance Is a Signal, Not an Obstacle',
    'Adoption Is the Measure, Not Just Going Live',
  ]
  const thinkingPrinciples = []
  for (const title of thinkingMap) {
    const id = await uploadImage(payload, path.join(BASE_DIR, `${title}.svg`), title)
    const existing = (svc.thinkingModelPrinciples ?? []).find((x: any) => x.title === title) ?? {}
    thinkingPrinciples.push({ ...existing, title, icon: id ?? existing.icon })
  }

  // ── Unique section items ─────────────────────────────────────────
  console.log('\n• Unique section items:')
  const uniqueMap = [
    'We Start With a Change Readiness Assessment',
    'Change Impact Analysis Drives Every Engagement Decision',
    'We Run the Programme, Not Just the Strategy',
    'One Partner From Strategy Through Execution',
  ]
  const uniqueItems = []
  for (const title of uniqueMap) {
    const id = await uploadImage(payload, path.join(BASE_DIR, `${title}.svg`), title)
    const existing = (svc.uniqueSectionItems ?? []).find((x: any) => x.title === title) ?? {}
    uniqueItems.push({ ...existing, title, icon: id ?? existing.icon })
  }

  // ── Process steps ────────────────────────────────────────────────
  console.log('\n• Process steps:')
  const stepsMap = [
    'Technology Estate Assessment',
    'Business Model & Strategic Alignment',
    'Legacy Risk & Debt Assessment',
    'Transformation Roadmap Development',
    'Governance & Operating Model Design',
    'Execution Planning & Partner Alignment',
  ]
  const processSteps = []
  for (const title of stepsMap) {
    const id = await uploadImage(payload, path.join(BASE_DIR, `${title}.svg`), title)
    const existing = (svc.processSteps ?? []).find((x: any) => x.title === title) ?? {}
    processSteps.push({ ...existing, title, icon: id ?? existing.icon })
  }

  // ── Audience items ───────────────────────────────────────────────
  console.log('\n• Audience items:')
  // Dynamically resolve the "Organisations" filename (contains curly apostrophe U+2019)
  const allFiles = fs.readdirSync(BASE_DIR)
  const orgFile = allFiles.find(f => f.startsWith('Organisations') && f.endsWith('.png')) ?? ''
  const audienceMap = [
    { file: orgFile, title: "Organisations Whose Technology Hasn't Kept Pace With Business Growth" },
    { file: 'Businesses Preparing for a Merger, Acquisition, or Market Expansion.png',  title: 'Businesses Preparing for a Merger, Acquisition, or Market Expansion' },
    { file: 'Companies Whose Legacy Systems Are Creating Operational Risk.png',           title: 'Companies Whose Legacy Systems Are Creating Operational Risk' },
    { file: 'Leadership Teams That Have Tried Transformation Before.png',                 title: 'Leadership Teams That Have Tried Transformation Before' },
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

  console.log('\n✓  Technology Transformation Consulting updated with all icons.\n')
  process.exit(0)
}

seed().catch((err) => { console.error(err); process.exit(1) })
