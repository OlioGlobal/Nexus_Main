import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const BASE_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/Process Optimization'

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
  const result = await payload.find({ collection: 'services', where: { slug: { equals: 'process-optimization' } }, limit: 1, depth: 0 })
  if (!result.docs.length) { console.error('NOT FOUND'); process.exit(1) }
  const svc = result.docs[0] as any
  console.log(`\nFound: "${svc.title}" (${svc.id})\n`)

  console.log('• Thinking model principles (Approach folder):')
  const thinkingMap = [
    'Map the Real Process, Not the Documented One',
    'Remove Waste Before Adding Capability',
    'Design for the People Who Run the Process',
    'Measure Before and After',
  ]
  const thinkingPrinciples = []
  for (const title of thinkingMap) {
    const id = await upload(payload, path.join(BASE_DIR, `Approach/${title}.svg`), title)
    const ex = (svc.thinkingModelPrinciples ?? []).find((x: any) => x.title === title) ?? {}
    thinkingPrinciples.push({ ...ex, title, icon: id ?? ex.icon })
  }

  console.log('\n• Unique section items (4 cards folder):')
  const uniqueMap = [
    'We Map What Is Real, Not What Is Written Down',
    'We Remove Waste Before Recommending Technology',
    'We Use the Right Approach for the Process, Not a Fixed Framework',
    'We Stay Through Implementation, Not Just Redesign',
  ]
  const uniqueItems = []
  for (const title of uniqueMap) {
    const id = await upload(payload, path.join(BASE_DIR, `4 cards/${title}.svg`), title)
    const ex = (svc.uniqueSectionItems ?? []).find((x: any) => x.title === title) ?? {}
    uniqueItems.push({ ...ex, title, icon: id ?? ex.icon })
  }

  // Steps SVGs are in root folder — dynamically match to DB titles
  console.log('\n• Process steps (root folder SVGs):')
  const rootFiles = fs.readdirSync(BASE_DIR)
  const stepTitleToFile: Record<string, string> = {
    'Process Maturity Assessment':                         'Process Maturity Assessment.svg',
    'Process Mapping & Documentation':                    'Process Mapping & Documentation.svg',
    'Bottleneck & Waste Identification':                  'Bottleneck & Waste Identification.svg',
    'AI and Automation Readiness Assessment':             'AI and Automation Readiness Assessment.svg',
    'Process Redesign & Standardisation':                 rootFiles.find(f => f.includes('Redesign') && f.includes('Standard')) ?? '',
    'KPI & Performance Measurement Design':               'KPI & Performance Measurement Design.svg',
    'Implementation Support & Post-Optimisation Monitoring': rootFiles.find(f => f.includes('Implementation')) ?? '',
  }
  const processSteps = []
  for (const [title, filename] of Object.entries(stepTitleToFile)) {
    const id = await upload(payload, path.join(BASE_DIR, filename), title)
    const ex = (svc.processSteps ?? []).find((x: any) => x.title === title) ?? {}
    processSteps.push({ ...ex, title, icon: id ?? ex.icon })
  }

  console.log('\n• Audience items (root PNGs):')
  const audienceMap = [
    { file: 'Businesses with an In-House Team That Needs a Specific Skill Added.png', title: 'Operations Leaders Whose Processes Have Not Kept Pace With Growth' },
    { file: 'Companies Scaling a Development Team Faster Than Hiring Allows.png',      title: 'Teams Preparing Processes for Automation or AI Deployment' },
    { file: 'Startups That Need a Full Team Without Building One Permanently-1.png',   title: 'Businesses Whose Technology Rollout Exposed Broken Underlying Processes' },
    { file: 'Startups That Need a Full Team Without Building One Permanently.png',     title: 'Leadership Teams Standardising Processes Across Multiple Locations or Departments' },
  ]
  const audienceItems = []
  for (const item of audienceMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.audienceItems ?? []).find((x: any) => x.title === item.title) ?? {}
    audienceItems.push({ ...ex, title: item.title, image: id ?? ex.image })
  }

  console.log('\n• Updating...')
  await payload.update({ collection: 'services', id: svc.id, data: { thinkingModelPrinciples: thinkingPrinciples, uniqueSectionItems: uniqueItems, processSteps, audienceItems } })
  console.log('✓  Process Optimization Services updated.\n')
  process.exit(0)
}
seed().catch((err) => { console.error(err); process.exit(1) })
