import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const BASE_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/PRODUCT & MVP DEVELOPMENT'

function getMimeType(f: string) { return f.endsWith('.svg') ? 'image/svg+xml' : 'image/png' }

async function upload(payload: any, filePath: string, alt: string): Promise<string | null> {
  if (!fs.existsSync(filePath)) { console.log(`  ⚠  Not found: ${path.basename(filePath)}`); return null }
  const filename = path.basename(filePath)
  const fileData = fs.readFileSync(filePath)
  const up = await payload.create({ collection: 'media', data: { alt }, file: { data: fileData, mimetype: getMimeType(filename), name: filename, size: fs.statSync(filePath).size } })
  console.log(`  ✓  ${filename}  (${up.id})`); return up.id
}

async function seed() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'services', where: { slug: { equals: 'product-mvp-development' } }, limit: 1, depth: 0 })
  if (!result.docs.length) { console.error('NOT FOUND'); process.exit(1) }
  const svc = result.docs[0] as any
  console.log(`\nFound: "${svc.title}" (${svc.id})\n`)

  // Dynamically find files with special apostrophe chars
  const approachFiles = fs.readdirSync(path.join(BASE_DIR, 'approach'))
  const defineFile  = approachFiles.find(f => f.includes('Validating')) ?? ''
  const scopeFile   = approachFiles.find(f => f.includes('Product Manager')) ?? ''
  const mvpEndsFile = approachFiles.find(f => f.includes('MVP Ends')) ?? ''

  console.log('• Thinking model principles:')
  const thinkingMap = [
    { file: `approach/${defineFile}`,                                               title: "Define What You're Validating Before Defining What You're Building" },
    { file: `approach/Architecture That the Full Build Inherits, Not Replaces.svg`, title: 'Architecture That the Full Build Inherits, Not Replaces' },
    { file: `approach/${scopeFile}`,                                                 title: "Scope Discipline Is the Product Manager's Job, Not the Client's" },
    { file: `approach/${mvpEndsFile}`,                                               title: 'The MVP Ends With A Brief, Not Just A Build' },
  ]
  const thinkingPrinciples = []
  for (const item of thinkingMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.thinkingModelPrinciples ?? []).find((x: any) => x.title === item.title) ?? {}
    thinkingPrinciples.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  const cards4Files = fs.readdirSync(path.join(BASE_DIR, '4 cards'))
  const scopingFile = cards4Files.find(f => f.includes('scoping') || f.includes('budget')) ?? ''

  console.log('\n• Unique section items:')
  const uniqueMap = [
    { file: `4 cards/By validating first, we ensure we only build what delivers measurable value..svg`, title: 'By validating first, we ensure we only build what delivers measurable value.' },
    { file: `4 cards/We make the architecture decisions that the full build will inherit.svg`,           title: 'We make the architecture decisions that the full build will inherit' },
    { file: `4 cards/${scopingFile}`,                                                                    title: 'Our scoping process reduces budget uncertainty.' },
    { file: `4 cards/We deliver validated insights, not just a working product..svg`,                   title: 'We deliver validated insights, not just a working product.' },
  ]
  const uniqueItems = []
  for (const item of uniqueMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.uniqueSectionItems ?? []).find((x: any) => x.title === item.title) ?? {}
    uniqueItems.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Process steps:')
  const stepsMap = [
    'Hypothesis Definition & Scope',
    'Architecture & Technical Design',
    'Agile Build in Sprints',
    'QA & Validation Instrumentation',
    'Launch & Validation',
    'Validation Report & Full Build Brief',
  ]
  const processSteps = []
  for (const title of stepsMap) {
    const id = await upload(payload, path.join(BASE_DIR, `steps/${title}.svg`), title)
    const ex = (svc.processSteps ?? []).find((x: any) => x.title === title) ?? {}
    processSteps.push({ ...ex, title, icon: id ?? ex.icon })
  }

  console.log('\n• Audience items:')
  const audienceMap = [
    { file: 'Founders Validating a Startup Idea Before a Full Investment.png', title: 'Founders Validating a Startup Idea Before a Full Investment' },
    { file: 'Businesses Validating Before Committing to a Full Build.png',     title: 'Businesses Validating Before Committing to a Full Build' },
    { file: 'Investors Who Need a Working Product Before Funding.png',          title: 'Investors Who Need a Working Product Before Funding' },
  ]
  const audienceItems = []
  for (const item of audienceMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.audienceItems ?? []).find((x: any) => x.title === item.title) ?? {}
    audienceItems.push({ ...ex, title: item.title, image: id ?? ex.image })
  }

  console.log('\n• Updating...')
  await payload.update({ collection: 'services', id: svc.id, data: { thinkingModelPrinciples: thinkingPrinciples, uniqueSectionItems: uniqueItems, processSteps, audienceItems } })
  console.log('✓  Product & MVP Development updated.\n')
  process.exit(0)
}
seed().catch((err) => { console.error(err); process.exit(1) })
