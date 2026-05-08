import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const BASE_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/AI IMPLEMENTATION SERVICES Service - New'

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
  const result = await payload.find({ collection: 'services', where: { slug: { equals: 'ai-implementation-services' } }, limit: 1, depth: 0 })
  if (!result.docs.length) { console.error('NOT FOUND'); process.exit(1) }
  const svc = result.docs[0] as any
  console.log(`\nFound: "${svc.title}" (${svc.id})\n`)

  const allFiles = fs.readdirSync(BASE_DIR)
  const teamsFile  = allFiles.find(f => f.includes('finished AI') || f.includes('Production Yet')) ?? ''
  const orgsFile   = allFiles.find(f => f.includes('Organizations Running') || f.includes('Business Systems')) ?? ''

  console.log('• Thinking model principles:')
  const thinkingMap = [
    { file: 'Making AI Production Ready.svg',             title: 'Making AI Production Ready' },
    { file: 'Mapping AI Integration.svg',                 title: 'Mapping AI Integration' },
    { file: 'Infrastructure Is A Decision, Not A Default.svg', title: 'Infrastructure Is A Decision, Not A Default' },
    { file: 'Monitoring Is Built In Before Launch.svg',   title: 'Monitoring Is Built In Before Launch' },
  ]
  const thinkingPrinciples = []
  for (const item of thinkingMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.thinkingModelPrinciples ?? []).find((x: any) => x.title === item.title) ?? {}
    thinkingPrinciples.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Unique section items:')
  const uniqueMap = [
    { file: 'We map every integration point before touching a system..svg', title: 'We map every integration point before touching a system.' },
    { file: 'We deploy on your infrastructure..svg',                         title: 'We deploy on your infrastructure.' },
    { file: 'We validate against production conditions..svg',                title: 'We validate against production conditions.' },
    { file: 'We hand over a system that your team can operate..svg',         title: 'We hand over a system that your team can operate.' },
  ]
  const uniqueItems = []
  for (const item of uniqueMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.uniqueSectionItems ?? []).find((x: any) => x.title === item.title) ?? {}
    uniqueItems.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Process steps:')
  const stepsMap = [
    { file: 'Environment & Infrastructure Setup.svg', title: 'Environment & Infrastructure Setup' },
    { file: 'Integration Mapping & Build.svg',         title: 'Integration Mapping & Build' },
    { file: 'Staging & Production Validation.svg',     title: 'Staging & Production Validation' },
    { file: 'Phased Production Rollout.svg',           title: 'Phased Production Rollout' },
    { file: 'Monitoring Setup & Handover.svg',         title: 'Monitoring Setup & Handover' },
  ]
  const processSteps = []
  for (const item of stepsMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.processSteps ?? []).find((x: any) => x.title === item.title) ?? {}
    processSteps.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Audience items:')
  const audienceMap = [
    { file: teamsFile,                                                        title: "Teams with a finished AI that isn't in production yet" },
    { file: 'Technical Leaders Who Have Experienced A Failed AI Deployment.png', title: 'Technical Leaders Who Have Experienced A Failed AI Deployment' },
    { file: orgsFile,                                                          title: 'Organizations Running AI Across Multiple Business Systems' },
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
  console.log('✓  AI Implementation Services updated.\n')
  process.exit(0)
}
seed().catch((err) => { console.error(err); process.exit(1) })
