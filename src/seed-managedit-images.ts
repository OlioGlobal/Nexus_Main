import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const BASE_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/MANAGED IT SERVICES'

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
  const result = await payload.find({ collection: 'services', where: { slug: { equals: 'managed-it-services' } }, limit: 1, depth: 0 })
  if (!result.docs.length) { console.error('NOT FOUND'); process.exit(1) }
  const svc = result.docs[0] as any
  console.log(`\nFound: "${svc.title}" (${svc.id})\n`)

  // Dynamically resolve files with special chars
  const approachFiles = fs.readdirSync(path.join(BASE_DIR, 'Approach'))
  const opsOwnershipFile = approachFiles.find(f => f.includes('Operational Ownership')) ?? ''

  const cards4Files = fs.readdirSync(path.join(BASE_DIR, '4 cards'))
  const cicdFile = cards4Files.find(f => f.includes('pipeline') || f.includes('CD pipeline')) ?? ''
  const opsVisibleFile = cards4Files.find(f => f.includes('your team can see')) ?? ''

  console.log('• Thinking model principles:')
  const thinkingMap = [
    { file: `Approach/Proactive Operations over Reactive Response.svg`,          title: 'Proactive Operations over Reactive Response' },
    { file: `Approach/SLAs Defined Before the Engagement Starts.svg`,             title: 'SLAs Defined Before the Engagement Starts' },
    { file: `Approach/${opsOwnershipFile}`,                                        title: 'Operational Ownership without Team Replacement: IT Operations Management' },
    { file: `Approach/Infrastructure That Runs to the Specifications It Was Built to.svg`, title: 'Infrastructure That Runs to the Specifications It Was Built to' },
  ]
  const thinkingPrinciples = []
  for (const item of thinkingMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.thinkingModelPrinciples ?? []).find((x: any) => x.title === item.title) ?? {}
    thinkingPrinciples.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Unique section items:')
  const uniqueMap = [
    { file: `4 cards/We document before we manage..svg`,                                      title: 'We document before we manage.' },
    { file: `4 cards/Monitoring is configured to your environment, not to a generic template.svg`, title: 'Monitoring is configured to your environment, not to a generic template.' },
    { file: `4 cards/${cicdFile}`,                                                              title: 'DevOps and CI/CD pipeline management are included.' },
    { file: `4 cards/${opsVisibleFile}`,                                                        title: 'Operations that your team can see into at any point' },
  ]
  const uniqueItems = []
  for (const item of uniqueMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.uniqueSectionItems ?? []).find((x: any) => x.title === item.title) ?? {}
    uniqueItems.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Process steps:')
  const stepsMap = [
    'Infrastructure Audit & Documentation',
    'SLA & Escalation Design',
    'Monitoring & Alerting Configuration',
    'Operational Handover & Runbook Development',
    'Ongoing Operations & Reporting',
  ]
  const processSteps = []
  for (const title of stepsMap) {
    const id = await upload(payload, path.join(BASE_DIR, `Steps/${title}.svg`), title)
    const ex = (svc.processSteps ?? []).find((x: any) => x.title === title) ?? {}
    processSteps.push({ ...ex, title, icon: id ?? ex.icon })
  }

  console.log('\n• Audience items:')
  const rootFiles = fs.readdirSync(BASE_DIR)
  const businessesFile = rootFiles.find(f => f.includes('internal IT team') && (f.endsWith('.png') || f.endsWith('.jpg'))) ?? ''
  const audienceMap = [
    { file: 'Teams That Were Built with Nexus and Need Ongoing Operations Coverage.png', title: 'Teams That Were Built with Nexus and Need Ongoing Operations Coverage' },
    { file: businessesFile,                                                                title: "Businesses whose internal IT team can't cover the full operational scope" },
    { file: 'Companies migrating from another provider.png',                               title: 'Companies migrating from another provider' },
  ]
  const audienceItems = []
  for (const item of audienceMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.audienceItems ?? []).find((x: any) => x.title === item.title) ?? {}
    audienceItems.push({ ...ex, title: item.title, image: id ?? ex.image })
  }

  console.log('\n• Updating...')
  await payload.update({ collection: 'services', id: svc.id, data: { thinkingModelPrinciples: thinkingPrinciples, uniqueSectionItems: uniqueItems, processSteps, audienceItems } })
  console.log('✓  Managed IT Services updated.\n')
  process.exit(0)
}
seed().catch((err) => { console.error(err); process.exit(1) })
