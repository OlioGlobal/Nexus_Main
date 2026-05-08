import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const BASE_DIR = 'C:/Users/choud/OneDrive/Desktop/nexus/Services/Resource Augmentation Services'

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
  const result = await payload.find({ collection: 'services', where: { slug: { equals: 'resource-augmentation-services' } }, limit: 1, depth: 0 })
  if (!result.docs.length) { console.error('NOT FOUND'); process.exit(1) }
  const svc = result.docs[0] as any
  console.log(`\nFound: "${svc.title}" (${svc.id})\n`)

  const allApproach = fs.readdirSync(path.join(BASE_DIR, 'approach'))
  const engagementFile = allApproach.find(f => f.includes('Engagement Model')) ?? ''

  const all4cards = fs.readdirSync(path.join(BASE_DIR, '4 cards'))
  const doesntEndFile = all4cards.find(f => f.includes('Engagement') && f.includes('End')) ?? ''

  console.log('• Thinking model principles:')
  const thinkingMap = [
    { file: `approach/Fit Defined Before Search Begins.svg`,          title: 'Fit Defined Before Search Begins' },
    { file: `approach/Client Has Final Say.svg`,                       title: 'Client Has Final Say' },
    { file: `approach/${engagementFile}`,                              title: 'Engagement Model Matched to the Actual Need' },
    { file: `approach/Technical Context Comes With the Placement.svg`, title: 'Technical Context Comes With the Placement' },
  ]
  const thinkingPrinciples = []
  for (const item of thinkingMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.thinkingModelPrinciples ?? []).find((x: any) => x.title === item.title) ?? {}
    thinkingPrinciples.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Unique section items:')
  const uniqueMap = [
    { file: `4 cards/We Brief Before We Search.svg`,                  title: 'We Brief Before We Search' },
    { file: `4 cards/Vetted Technically, Not Just Available.svg`,     title: 'Vetted Technically, Not Just Available' },
    { file: `4 cards/Remote Resources, Zero Time Zone Friction.svg`,  title: 'Remote Resources, Zero Time Zone Friction' },
    { file: `4 cards/${doesntEndFile}`,                                title: "The Engagement Doesn't End at Placement" },
  ]
  const uniqueItems = []
  for (const item of uniqueMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.uniqueSectionItems ?? []).find((x: any) => x.title === item.title) ?? {}
    uniqueItems.push({ ...ex, title: item.title, icon: id ?? ex.icon })
  }

  console.log('\n• Process steps:')
  const stepsMap = [
    'Requirements Brief & Role Definition',
    'Talent Search & Technical Vetting',
    'Shortlist Presentation & Client Selection',
    'Onboarding & Integration',
    'Ongoing Engagement Support',
  ]
  const processSteps = []
  for (const title of stepsMap) {
    const id = await upload(payload, path.join(BASE_DIR, `steps/${title}.svg`), title)
    const ex = (svc.processSteps ?? []).find((x: any) => x.title === title) ?? {}
    processSteps.push({ ...ex, title, icon: id ?? ex.icon })
  }

  console.log('\n• Audience items:')
  const audienceMap = [
    { file: 'Businesses with an In-House Team That Needs a Specific Skill Added.png', title: 'Businesses with an In-House Team That Needs a Specific Skill Added' },
    { file: 'Companies Scaling a Development Team Faster Than Hiring Allows.png',     title: 'Companies Scaling a Development Team Faster Than Hiring Allows' },
    { file: 'Startups That Need a Full Team Without Building One Permanently.png',    title: 'Startups That Need a Full Team Without Building One Permanently' },
    { file: 'Enterprises Managing Fluctuating Project Demand.png',                    title: 'Enterprises Managing Fluctuating Project Demand' },
  ]
  const audienceItems = []
  for (const item of audienceMap) {
    const id = await upload(payload, path.join(BASE_DIR, item.file), item.title)
    const ex = (svc.audienceItems ?? []).find((x: any) => x.title === item.title) ?? {}
    audienceItems.push({ ...ex, title: item.title, image: id ?? ex.image })
  }

  console.log('\n• Updating...')
  await payload.update({ collection: 'services', id: svc.id, data: { thinkingModelPrinciples: thinkingPrinciples, uniqueSectionItems: uniqueItems, processSteps, audienceItems } })
  console.log('✓  Resource Augmentation Services updated.\n')
  process.exit(0)
}
seed().catch((err) => { console.error(err); process.exit(1) })
