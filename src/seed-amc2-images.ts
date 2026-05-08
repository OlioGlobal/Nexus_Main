import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const BASE_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/AMC SERVICES'

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
  const result = await payload.find({ collection: 'services', where: { slug: { equals: 'amc-services' } }, limit: 1, depth: 0 })
  if (!result.docs.length) { console.error('NOT FOUND'); process.exit(1) }
  const svc = result.docs[0] as any
  console.log(`\nFound: "${svc.title}" (${svc.id})\n`)

  console.log('• Thinking model principles:')
  const thinkingMap = [
    { file: 'Scheduled and Reactive Work Run on Separate Tracks.svg', title: 'Scheduled and Reactive Work Run on Separate Tracks' },
    { file: 'Scope Defined at Contract Start, Not at Each Request.svg', title: 'Scope Defined at Contract Start' },
    { file: 'Security and Dependency Management on a Defined Schedule.svg', title: 'Security & Dependency Management on Schedule' },
    { file: 'The Codebase Maintained as if It Will Be Extended.svg',   title: 'Codebase Maintained as if It Will Be Extended' },
  ]
  const thinkingPrinciples = []
  for (const item of thinkingMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.thinkingModelPrinciples ?? []).find((x: any) => x.title === item.title) ?? {}
    thinkingPrinciples.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Unique section items:')
  const uniqueMap = [
    { file: 'Minor Enhancements Within the Same Contract.svg',         title: 'Minor Enhancements Within the Same Contract' },
    { file: 'Feature Additions Without a New Engagement Every Time.svg', title: 'Feature Additions Without a New Engagement' },
    { file: '7 Managed Operations.png',                                 title: '7 Managed Operations Covered' },
    { file: 'Scheduled Maintenance Before Reactive Support.svg',        title: 'Scheduled Maintenance Before Reactive Support' },
  ]
  const uniqueItems = []
  for (const item of uniqueMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.uniqueSectionItems ?? []).find((x: any) => x.title === item.title) ?? {}
    uniqueItems.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Process steps:')
  const stepsMap = [
    { file: 'Product Review & Scope Definition.svg', title: 'Product Review & Scope Definition' },
    { file: 'Contract & SLA Agreement.svg',           title: 'Contract & SLA Agreement' },
    { file: 'Scheduled Maintenance Setup.svg',        title: 'Scheduled Maintenance Setup' },
    { file: 'Break-Fix Support Operations.svg',       title: 'Break-Fix Support Operations' },
    { file: 'Feature Addition Management.svg',        title: 'Feature Addition Management' },
    { file: 'Reporting & Contract Review.svg',        title: 'Reporting & Contract Review ' },
  ]
  const processSteps = []
  for (const item of stepsMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.processSteps ?? []).find((x: any) => x.title === item.title) ?? {}
    processSteps.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Audience items:')
  const audienceMap = [
    { file: 'Clients Who Built With Nexus and Want Continuous Maintenance Coverage.png', title: 'Clients Who Built With Nexus' },
    { file: 'We Scope the Contract Around the Product, Not.svg',                          title: 'Product-Scoped Contracts' },
  ]
  const audienceItems = []
  for (const item of audienceMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.audienceItems ?? []).find((x: any) => x.title === item.title) ?? {}
    audienceItems.push({ ...ex, title: item.title, image: id ?? ex.image })
  }

  console.log('\n• Updating...')
  await (payload.db as any).collections['services'].updateOne(
    { _id: svc.id },
    { $set: { thinkingModelPrinciples: thinkingPrinciples, uniqueSectionItems: uniqueItems, processSteps, audienceItems } }
  )
  console.log('✓  AMC Services updated.\n')
  process.exit(0)
}
seed().catch((err) => { console.error(err); process.exit(1) })
