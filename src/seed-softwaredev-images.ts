import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const BASE_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/Software Product Development Service'

function getMimeType(filename: string): string {
  const ext = filename.toLowerCase().split('.').pop()
  if (ext === 'svg') return 'image/svg+xml'
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg'
  return 'image/png'
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
    where: { slug: { equals: 'software-product-development' } },
    limit: 1,
    depth: 0,
  })
  if (result.docs.length === 0) {
    console.error('✗  Service not found: software-product-development')
    process.exit(1)
  }
  const svc = result.docs[0] as any
  console.log(`\nFound: "${svc.title}" (id: ${svc.id})\n`)

  // ── Section 1 - Approach → thinkingModelPrinciples ──────────────
  console.log('• Thinking model principles (Section 1 - Approach):')
  const thinkingMap = [
    { file: 'Section 1 - Approach/Requirement Gathering Is the Discovery Stage.svg',             title: 'Requirement Gathering Is the Discovery Stage' },
    { file: 'Section 1 - Approach/Treating Software Architecture as a Business Decision.svg',    title: 'Treating Software Architecture as a Business Decision' },
    { file: 'Section 1 - Approach/The Stage of Development (Sprints) Is More Than Status Updates.svg', title: 'The Stage of Development (Sprints) Is More Than Status Updates' },
    { file: 'Section 1 - Approach/You Own Everything From Day One.svg',                          title: 'You Own Everything From Day One' },
  ]
  const thinkingPrinciples = []
  for (const item of thinkingMap) {
    const id = await uploadImage(payload, path.join(BASE_DIR, item.file), item.title)
    const existing = (svc.thinkingModelPrinciples ?? []).find((x: any) => x.title === item.title) ?? {}
    thinkingPrinciples.push({ ...existing, title: item.title, icon: id ?? existing.icon })
  }

  // ── 4 cards → uniqueSectionItems ────────────────────────────────
  console.log('\n• Unique section items (4 cards):')
  const cards4Files = fs.readdirSync(path.join(BASE_DIR, '4 cards'))
  const youreFile = cards4Files.find((f: string) => f.includes('part of the progress')) ?? ''
  const uniqueMap = [
    { file: '4 cards/We define the product before we design the architecture..svg',     title: 'We define the product before we design the architecture.' },
    { file: '4 cards/We design for maintainability, not just delivery..svg',            title: 'We design for maintainability, not just delivery.' },
    { file: `4 cards/${youreFile}`,                                                      title: "You're part of the progress (and not just reported about it)." },
    { file: '4 cards/Clearly defined and analyzed requirements = fixed quotation..svg', title: 'Clearly defined and analyzed requirements = fixed quotation.' },
  ]
  const uniqueItems = []
  for (const item of uniqueMap) {
    const id = await uploadImage(payload, path.join(BASE_DIR, item.file), item.title)
    const existing = (svc.uniqueSectionItems ?? []).find((x: any) => x.title === item.title) ?? {}
    uniqueItems.push({ ...existing, title: item.title, icon: id ?? existing.icon })
  }

  // ── Section 3-Steps → processSteps ──────────────────────────────
  console.log('\n• Process steps (Section 3-Steps):')
  const stepsMap = [
    { file: 'Section 3-Steps/Discovery & Requirements Definition.svg', title: 'Discovery & Requirements Definition' },
    { file: 'Section 3-Steps/Architecture & Technical Design.svg',     title: 'Architecture & Technical Design' },
    { file: 'Section 3-Steps/Agile Development in Sprints.svg',        title: 'Agile Development in Sprints' },
    { file: 'Section 3-Steps/QA & Testing.svg',                        title: 'QA & Testing' },
    { file: 'Section 3-Steps/Deployment & DevOps.svg',                 title: 'Deployment & DevOps' },
    { file: 'Section 3-Steps/Handover & Documentation.svg',            title: 'Handover & Documentation' },
  ]
  const processSteps = []
  for (const item of stepsMap) {
    const id = await uploadImage(payload, path.join(BASE_DIR, item.file), item.title)
    const existing = (svc.processSteps ?? []).find((x: any) => x.title === item.title) ?? {}
    processSteps.push({ ...existing, title: item.title, icon: id ?? existing.icon })
  }

  // ── root folder → audienceItems ──────────────────────────────────
  console.log('\n• Audience items (root folder):')
  // Dynamically resolve the "Can't" file (may use underscore or special char)
  const allFiles = fs.readdirSync(BASE_DIR)
  const enterprisesFile = allFiles.find(f => f.startsWith('Enterprises') && (f.endsWith('.jpg') || f.endsWith('.png'))) ?? ''
  const audienceMap = [
    { file: 'Businesses That Have Outgrown Their Current Software.jpg',          title: 'Businesses That Have Outgrown Their Current Software' },
    { file: 'Companies with a Product Idea and No Technical Team to Build It.jpg', title: 'Companies with a Product Idea and No Technical Team to Build It' },
    { file: enterprisesFile,                                                       title: "Enterprises Whose Requirements Off-The-Shelf Tools Can't Meet" },
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

  console.log('\n✓  Software Product Development updated with all icons.\n')
  process.exit(0)
}

seed().catch((err) => { console.error(err); process.exit(1) })
