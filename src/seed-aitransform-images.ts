import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const BASE_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/AI TRANSFORMATION SERVICES'

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
  const result = await payload.find({ collection: 'services', where: { slug: { equals: 'ai-transformation-services' } }, limit: 1, depth: 0 })
  if (!result.docs.length) { console.error('NOT FOUND'); process.exit(1) }
  const svc = result.docs[0] as any
  console.log(`\nFound: "${svc.title}" (${svc.id})\n`)

  const allFiles = fs.readdirSync(BASE_DIR)
  const youOwnFile   = allFiles.find(f => f.includes('You Own It')) ?? ''
  const noAiFile     = allFiles.find(f => f.includes('say no')) ?? ''
  const dontMeasFile = allFiles.find(f => f.includes('measure success')) ?? ''
  const adoptionFile = allFiles.find(f => f.includes('Adoption Tracking')) ?? ''

  console.log('• Thinking model principles:')
  const thinkingMap = [
    { file: 'Integration Before Innovation.svg',          title: 'Integration Before Innovation' },
    { file: 'Realistic Rollout Over Aggressive Timelines.svg', title: 'Realistic Rollout Over Aggressive Timelines' },
    { file: 'Change Management from the Start.svg',       title: 'Change Management from the Start' },
    { file: youOwnFile,                                    title: 'You Own It: Deployed at Your Servers' },
  ]
  const thinkingPrinciples = []
  for (const item of thinkingMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.thinkingModelPrinciples ?? []).find((x: any) => x.title === item.title) ?? {}
    thinkingPrinciples.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Unique section items:')
  const uniqueMap = [
    { file: noAiFile,                                                      title: "We say no to AI when the workflow isn't ready." },
    { file: dontMeasFile,                                                   title: "We don't measure success at go-live." },
    { file: 'The affected teams have been in the room since week one..svg', title: 'The affected teams have been in the room since week one.' },
    { file: 'We train your team to run it, not to depend on us..svg',      title: 'We train your team to run it, not to depend on us.' },
  ]
  const uniqueItems = []
  for (const item of uniqueMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.uniqueSectionItems ?? []).find((x: any) => x.title === item.title) ?? {}
    uniqueItems.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Process steps:')
  const stepsMap = [
    { file: 'Integration & Systems Audit.svg',      title: 'Integration & Systems Audit' },
    { file: 'Workflow Redesign Where It Needs To.svg', title: 'Workflow Redesign Where It Needs To' },
    { file: 'Phased Build & Deployment.svg',         title: 'Phased Build & Deployment' },
    { file: 'Enablement & Change Rollout.svg',       title: 'Enablement & Change Rollout' },
    { file: adoptionFile,                             title: 'Adoption Tracking & Optimization' },
  ]
  const processSteps = []
  for (const item of stepsMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.processSteps ?? []).find((x: any) => x.title === item.title) ?? {}
    processSteps.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  // Note: audience PNGs in this folder belong to AI Agents — skip them
  console.log('\n• Updating (no audience — correct images not in folder)...')
  await (payload.db as any).collections['services'].updateOne(
    { _id: svc.id },
    { $set: { thinkingModelPrinciples: thinkingPrinciples, uniqueSectionItems: uniqueItems, processSteps } }
  )
  console.log('✓  AI Transformation Services updated.\n')
  process.exit(0)
}
seed().catch((err) => { console.error(err); process.exit(1) })
