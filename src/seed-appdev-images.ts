import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const BASE_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/APP DEVELOPMENT (MOBILE AND WEB)'

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
  const result = await payload.find({ collection: 'services', where: { slug: { equals: 'app-development-services' } }, limit: 1, depth: 0 })
  if (!result.docs.length) { console.error('NOT FOUND'); process.exit(1) }
  const svc = result.docs[0] as any
  console.log(`\nFound: "${svc.title}" (${svc.id})\n`)

  const allFiles = fs.readdirSync(BASE_DIR)

  console.log('• Thinking model principles:')
  const thinkingMap = [
    { file: 'Platform Choice Follows the Use Case, Not the Trend.svg', title: 'Platform Choice Follows the Use Case, Not the Trend' },
    { file: 'Architecture Decisions Made Before the First Sprint.svg',  title: 'Architecture Decisions Made Before the First Sprint' },
    { file: 'UI Built for the Screen It Runs On.svg',                   title: 'UI Built for the Screen It Runs On' },
    { file: 'You Own the Codebase Completely.svg',                      title: 'You Own the Codebase Completely' },
  ]
  const thinkingPrinciples = []
  for (const item of thinkingMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.thinkingModelPrinciples ?? []).find((x: any) => x.title === item.title) ?? {}
    thinkingPrinciples.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Unique section items:')
  const uniqueMap = [
    { file: 'We Recommend the Right Platform.svg',                  title: 'We Recommend the Right Platform' },
    { file: 'We Design for Touch, Not for Screens.svg',             title: 'We Design for Touch, Not for Screens' },
    { file: 'We Test Against Real Conditions.svg',                  title: 'We Test Against Real Conditions' },
    { file: 'Fixed Scope, Fixed Price for a Well-Defined Build.svg', title: 'Fixed Scope, Fixed Price for a Well-Defined Build' },
  ]
  const uniqueItems = []
  for (const item of uniqueMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.uniqueSectionItems ?? []).find((x: any) => x.title === item.title) ?? {}
    uniqueItems.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Process steps:')
  const stepsMap = [
    { file: 'Discovery & Requirements Definition.svg', title: 'Discovery & Requirements Definition' },
    { file: 'Platform & Architecture Design.svg',      title: 'Platform & Architecture Design' },
    { file: 'UX Design.svg',                           title: 'UI/UX Design' },
    { file: 'Development in Sprints.svg',              title: 'Development in Sprints' },
    { file: 'Testing Across Devices & Conditions.svg', title: 'Testing Across Devices & Conditions' },
    { file: 'Deployment & App Store Submission.svg',   title: 'Deployment & App Store Submission' },
    { file: allFiles.find(f => f.includes('Handover')) ?? 'Handover & Documentation.svg', title: 'Handover & Documentation' },
  ]
  const processSteps = []
  for (const item of stepsMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.processSteps ?? []).find((x: any) => x.title === item.title) ?? {}
    processSteps.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Audience items:')
  const audienceMap = [
    { file: 'Startups Building Their First Mobile Product.png',              title: 'Startups Building Their First Mobile Product' },
    { file: 'Businesses Extending an Existing Web Product to Mobile.png',   title: 'Businesses Extending an Existing Web Product to Mobile' },
    { file: 'Enterprises Building Internal Mobile Tools.png',                title: 'Enterprises Building Internal Mobile Tools' },
    { file: 'Companies Replacing a Legacy Mobile App.png',                   title: 'Companies Replacing a Legacy Mobile App' },
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
  console.log('✓  App Development updated.\n')
  process.exit(0)
}
seed().catch((err) => { console.error(err); process.exit(1) })
