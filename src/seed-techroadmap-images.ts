import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const BASE_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/TECHNOLOGY ROADMAP SERVICES'

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
    where: { slug: { equals: 'technology-roadmap-services' } },
    limit: 1,
    depth: 0,
  })
  if (result.docs.length === 0) {
    console.error('✗  Service not found: technology-roadmap-services')
    process.exit(1)
  }
  const svc = result.docs[0] as any
  console.log(`\nFound: "${svc.title}" (id: ${svc.id})\n`)

  // ── approach folder → thinkingModelPrinciples ────────────────────
  console.log('• Thinking model principles (approach folder):')
  const thinkingMap = [
    { file: 'approach/Business Goals Drive the Sequence, Not Technology Preferences.svg', title: 'Business Goals Drive the Sequence, Not Technology Preferences' },
    { file: 'approach/Dependencies_ Determine What Is Actually Possible.svg',             title: 'Dependencies: Determine What Is Actually Possible' },
    { file: 'approach/A Roadmap That Cannot Be Funded Cannot Be Executed.svg',            title: 'A Roadmap That Cannot Be Funded Cannot Be Executed' },
    { file: 'approach/A Roadmap That Does Not Evolve Becomes Irrelevant.svg',             title: 'A Roadmap That Does Not Evolve Becomes Irrelevant' },
  ]
  const thinkingPrinciples = []
  for (const item of thinkingMap) {
    const id = await uploadImage(payload, path.join(BASE_DIR, item.file), item.title)
    const existing = (svc.thinkingModelPrinciples ?? []).find((x: any) => x.title === item.title) ?? {}
    thinkingPrinciples.push({ ...existing, title: item.title, icon: id ?? existing.icon })
  }

  // ── 4 cards folder → uniqueSectionItems ─────────────────────────
  console.log('\n• Unique section items (4 cards folder):')
  const uniqueMap = [
    { file: '4 cards/We Sequence by Dependency, Not by Ambition.svg', title: 'We Sequence by Dependency, Not by Ambition' },
    { file: '4 cards/We Tie Every Initiative to a Business Outcome.svg', title: 'We Tie Every Initiative to a Business Outcome' },
    { file: '4 cards/We Build the Resource Plan Into the Roadmap.svg',   title: 'We Build the Resource Plan Into the Roadmap' },
    { file: '4 cards/We Keep the Roadmap Current.svg',                   title: 'We Keep the Roadmap Current' },
  ]
  const uniqueItems = []
  for (const item of uniqueMap) {
    const id = await uploadImage(payload, path.join(BASE_DIR, item.file), item.title)
    const existing = (svc.uniqueSectionItems ?? []).find((x: any) => x.title === item.title) ?? {}
    uniqueItems.push({ ...existing, title: item.title, icon: id ?? existing.icon })
  }

  // ── steps folder → processSteps ──────────────────────────────────
  console.log('\n• Process steps (steps folder):')
  const stepsMap = [
    { file: 'steps/Current State Technology Assessment.svg',          title: 'Current State Technology Assessment' },
    { file: 'steps/Business Goal & Growth Target Alignment.svg',      title: 'Business Goal & Growth Target Alignment' },
    { file: 'steps/Dependency & Risk Mapping.svg',                    title: 'Dependency & Risk Mapping' },
    { file: 'steps/Initiative Prioritisation & Sequencing.svg',       title: 'Initiative Prioritisation & Sequencing' },
    { file: 'steps/Resource & Budget Planning.svg',                   title: 'Resource & Budget Planning' },
    { file: 'steps/Roadmap Documentation & Governance Design.svg',    title: 'Roadmap Documentation & Governance Design' },
    { file: 'steps/Quarterly or Annual Review Cycles.svg',            title: 'Quarterly or Annual Review Cycles' },
  ]
  const processSteps = []
  for (const item of stepsMap) {
    const id = await uploadImage(payload, path.join(BASE_DIR, item.file), item.title)
    const existing = (svc.processSteps ?? []).find((x: any) => x.title === item.title) ?? {}
    processSteps.push({ ...existing, title: item.title, icon: id ?? existing.icon })
  }

  // ── root folder → audienceItems ──────────────────────────────────
  console.log('\n• Audience items (root folder):')
  const audienceMap = [
    { file: 'CTOs and CIOs Seeking to Translate Strategy Into Action.png',                         title: 'CTOs and CIOs Seeking to Translate Strategy Into Action' },
    { file: 'CEOs and COOs Requiring Technology Investments Aligned with Business Outcomes.png',    title: 'CEOs and COOs Requiring Technology Investments Aligned with Business Outcomes' },
    { file: 'Programme Directors Managing Multi-Year Technology Change.png',                        title: 'Programme Directors Managing Multi-Year Technology Change' },
    { file: 'Finance Leaders Seeking Budget Visibility Across Technology Phases.png',               title: 'Finance Leaders Seeking Budget Visibility Across Technology Phases' },
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

  console.log('\n✓  Technology Roadmap Services updated with all icons.\n')
  process.exit(0)
}

seed().catch((err) => { console.error(err); process.exit(1) })
