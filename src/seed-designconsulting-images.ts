import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const BASE_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/DESIGN CONSULTING SERVICES'

function getMimeType(f: string) { return f.endsWith('.svg') ? 'image/svg+xml' : f.endsWith('.jpg') ? 'image/jpeg' : 'image/png' }

async function upload(payload: any, filePath: string, alt: string): Promise<string | null> {
  if (!fs.existsSync(filePath)) { console.log(`  ⚠  Not found: ${path.basename(filePath)}`); return null }
  const filename = path.basename(filePath)
  const fileData = fs.readFileSync(filePath)
  const up = await payload.create({ collection: 'media', data: { alt }, file: { data: fileData, mimetype: getMimeType(filename), name: filename, size: fs.statSync(filePath).size } })
  console.log(`  ✓  ${filename}  (${up.id})`); return up.id
}

async function seed() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'services', where: { slug: { equals: 'design-consulting-services' } }, limit: 1, depth: 0 })
  if (!result.docs.length) { console.error('NOT FOUND'); process.exit(1) }
  const svc = result.docs[0] as any
  console.log(`\nFound: "${svc.title}" (${svc.id})\n`)

  console.log('• Thinking model principles:')
  const thinkingMap = [
    'Design Systems Before Individual Screens',
    'Brand Identity That Translates into Products',
    'The Handover File is a Hard Deliverable',
    'Scalability Built Into Every Decision',
  ]
  const thinkingPrinciples = []
  for (const title of thinkingMap) {
    const id = await upload(payload, path.join(BASE_DIR, `Approach/${title}.svg`), title)
    const ex = (svc.thinkingModelPrinciples ?? []).find((x: any) => x.title === title) ?? {}
    thinkingPrinciples.push({ ...ex, title, icon: id ?? ex.icon })
  }

  console.log('\n• Unique section items:')
  const uniqueMap = [
    'Systems That Solve Problems',
    'Designed for the Engineers from Day 1',
    'Bringing Brand Identity into Product and Asset Design',
    'Motion and Interactions for Purpose, not Theatrics',
  ]
  const uniqueItems = []
  for (const title of uniqueMap) {
    const id = await upload(payload, path.join(BASE_DIR, `4 cards/${title}.svg`), title)
    const ex = (svc.uniqueSectionItems ?? []).find((x: any) => x.title === title) ?? {}
    uniqueItems.push({ ...ex, title, icon: id ?? ex.icon })
  }

  console.log('\n• Process steps:')
  const stepsFiles = fs.readdirSync(path.join(BASE_DIR, 'Steps'))
  const uiDesignFile = stepsFiles.find(f => f.includes('UI Design')) ?? ''
  const stepsMap = [
    { file: 'Design Brief & Alignment.svg',           title: 'Design Brief & Alignment' },
    { file: 'Visual Language & Brand Translation.svg', title: 'Visual Language & Brand Translation' },
    { file: 'Design System and Component Library.svg', title: 'Design System and Component Library' },
    { file: uiDesignFile,                              title: 'UI Design: Screen by Screen' },
    { file: 'Motion & Interaction Design.svg',         title: 'Motion & Interaction Design' },
    { file: 'Developer Handover.svg',                  title: 'Developer Handover' },
  ]
  const processSteps = []
  for (const item of stepsMap) {
    const id = await upload(payload, path.join(BASE_DIR, `Steps/${item.file}`), item.title)
    const ex = (svc.processSteps ?? []).find((x: any) => x.title === item.title) ?? {}
    processSteps.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Audience items:')
  const audienceMap = [
    'Startups building their first product identity',
    'Established businesses refreshing or scaling their design',
    'Development teams with a built product and no design system',
    'Enterprises standardising design across multiple products',
  ]
  const audienceItems = []
  for (const title of audienceMap) {
    const id = await upload(payload, path.join(BASE_DIR, `${title}.png`), title)
    const ex = (svc.audienceItems ?? []).find((x: any) => x.title === title) ?? {}
    audienceItems.push({ ...ex, title, image: id ?? ex.image })
  }

  console.log('\n• Updating...')
  await payload.update({ collection: 'services', id: svc.id, data: { thinkingModelPrinciples: thinkingPrinciples, uniqueSectionItems: uniqueItems, processSteps, audienceItems } })
  console.log('✓  Design Consulting Services updated.\n')
  process.exit(0)
}
seed().catch((err) => { console.error(err); process.exit(1) })
