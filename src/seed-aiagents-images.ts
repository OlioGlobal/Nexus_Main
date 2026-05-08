import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const BASE_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/AI AgentsCustom Automation'
// Audience PNGs in this folder are wrong (Resource Aug images)
// Correct audience PNGs are in AI TRANSFORMATION SERVICES folder
const AUDIENCE_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/AI TRANSFORMATION SERVICES'

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
  const result = await payload.find({ collection: 'services', where: { slug: { equals: 'ai-agent-development-services' } }, limit: 1, depth: 0 })
  if (!result.docs.length) { console.error('NOT FOUND'); process.exit(1) }
  const svc = result.docs[0] as any
  console.log(`\nFound: "${svc.title}" (${svc.id})\n`)

  const allFiles = fs.readdirSync(BASE_DIR)
  const theStartFile = allFiles.find(f => f.includes('The Start')) ?? ''

  console.log('• Thinking model principles:')
  const thinkingMap = [
    { file: theStartFile,                                   title: 'The Start: Defining the Use Cases' },
    { file: 'Integration As the Core of the Scope.svg',    title: 'Integration As the Core of the Scope' },
    { file: 'AI Automating Only Where It Is Required.svg', title: 'AI Automating Only Where It Is Required' },
    { file: 'Runs on Your Servers, Trained on Your Data.svg', title: 'Runs on Your Servers, Trained on Your Data' },
  ]
  const thinkingPrinciples = []
  for (const item of thinkingMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.thinkingModelPrinciples ?? []).find((x: any) => x.title === item.title) ?? {}
    thinkingPrinciples.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Unique section items:')
  const uniqueMap = [
    { file: 'We define the use case before we price the build.svg',          title: 'We define the use case before we price the build.' },
    { file: 'We build into your existing systems, not on top of them..svg',  title: 'We build into your existing systems, not on top of them.' },
    { file: 'We test against real conditions, not demo conditions..svg',     title: 'We test against real conditions, not demo conditions.' },
    { file: 'You own what we build..svg',                                     title: 'You own what we build.' },
  ]
  const uniqueItems = []
  for (const item of uniqueMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.uniqueSectionItems ?? []).find((x: any) => x.title === item.title) ?? {}
    uniqueItems.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Process steps:')
  const stepsMap = [
    'Use Case Definition & Scoping',
    'Integration Mapping',
    'Agent Development & Training',
    'Testing in Your Environment',
    'Handover & Documentation',
  ]
  const processSteps = []
  for (const title of stepsMap) {
    const id = await upload(payload, path.join(BASE_DIR, `${title}.svg`), title)
    const ex = (svc.processSteps ?? []).find((x: any) => x.title === title) ?? {}
    processSteps.push({ ...ex, title, icon: id ?? ex.icon })
  }

  // Audience PNGs are in AI TRANSFORMATION SERVICES folder
  console.log('\n• Audience items (from AI Transformation folder):')
  const audFiles = fs.readdirSync(AUDIENCE_DIR)
  const opsFile   = audFiles.find(f => f.includes('Operations Teams Drowning')) ?? ''
  const salesFile = audFiles.find(f => f.includes('Sales And Customer')) ?? ''
  const itOpsFile = audFiles.find(f => f.includes('IT and Ops Teams')) ?? ''
  const audienceMap = [
    { file: opsFile,   dir: AUDIENCE_DIR, title: 'Operations Teams Drowning In Repeatable Manual Work' },
    { file: salesFile, dir: AUDIENCE_DIR, title: 'Sales And Customer-Facing Teams Losing Volume To Slow Response' },
    { file: itOpsFile, dir: AUDIENCE_DIR, title: 'IT and Ops Teams Replacing Processes That Were Never Meant To Scale' },
  ]
  const audienceItems = []
  for (const item of audienceMap) {
    const id = await upload(payload, path.join(item.dir, item.file), item.title)
    const ex = (svc.audienceItems ?? []).find((x: any) => x.title === item.title) ?? {}
    audienceItems.push({ ...ex, title: item.title, image: id ?? ex.image })
  }

  console.log('\n• Updating...')
  await (payload.db as any).collections['services'].updateOne(
    { _id: svc.id },
    { $set: { thinkingModelPrinciples: thinkingPrinciples, uniqueSectionItems: uniqueItems, processSteps, audienceItems } }
  )
  console.log('✓  AI Agents / Custom Automation updated.\n')
  process.exit(0)
}
seed().catch((err) => { console.error(err); process.exit(1) })
