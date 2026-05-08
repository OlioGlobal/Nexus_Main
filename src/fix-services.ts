import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config()

// Desired final state for all 17 services
const desired = [
  // ── NeXus.AI ────────────────────────────────────────────────────
  { title: 'AI Consulting Services',       slug: 'ai-consulting-services',               group: 'nexus-ai',    order: 1, status: 'published' },
  { title: 'AI Transformation Services',   slug: 'ai-transformation-services',           group: 'nexus-ai',    order: 2, status: 'published' },
  { title: 'AI Agents / Custom Automation',slug: 'ai-agent-development-services',        group: 'nexus-ai',    order: 3, status: 'published' },
  { title: 'AI Implementation Services',   slug: 'ai-implementation-services',           group: 'nexus-ai',    order: 4, status: 'published' },

  // ── NeXus.Labs ───────────────────────────────────────────────────
  { title: 'Technology Transformation Consulting', slug: 'technology-transformation-consulting', group: 'nexus-labs', order: 1, status: 'published' },
  { title: 'Process Optimization',         slug: 'process-optimization-services',        group: 'nexus-labs',  order: 2, status: 'published' },
  { title: 'Change Management Support',    slug: 'change-management-support',            group: 'nexus-labs',  order: 3, status: 'published' },
  { title: 'Technology Roadmap Services',  slug: 'technology-roadmap-services',          group: 'nexus-labs',  order: 4, status: 'published' },

  // ── NeXus.Build ──────────────────────────────────────────────────
  { title: 'Software Product Development', slug: 'software-development-services',        group: 'nexus-build', order: 1, status: 'published' },
  { title: 'App Development',              slug: 'app-development-services',             group: 'nexus-build', order: 2, status: 'published' },
  { title: 'Website Development Services', slug: 'website-development-services',         group: 'nexus-build', order: 3, status: 'published' },
  { title: 'UI/UX Consulting Services',    slug: 'ui-ux-design-and-consulting-services', group: 'nexus-build', order: 4, status: 'published' },
  { title: 'Design Consulting Services',   slug: 'design-consulting-services',           group: 'nexus-build', order: 5, status: 'published' },
  { title: 'Product & MVP Development',    slug: 'mvp-product-development-services',     group: 'nexus-build', order: 6, status: 'published' },
  { title: 'Managed IT Services',          slug: 'managed-it-services',                  group: 'nexus-build', order: 7, status: 'published' },
  { title: 'AMC Services',                 slug: 'amc-services',                         group: 'nexus-build', order: 8, status: 'published' },
  { title: 'Resource Augmentation (Staffing) Services', slug: 'resource-augmentation-services', group: 'nexus-build', order: 9, status: 'published' },
]

// Old titles that map to the new ones above (for lookup)
const titleAliases: Record<string, string> = {
  'AI Consulting':                        'AI Consulting Services',
  'AI Transformation':                    'AI Transformation Services',
  'AI Implementation':                    'AI Implementation Services',
  'Technology Roadmaps':                  'Technology Roadmap Services',
  'Web and Mobile App Development':       'App Development',
  'UI/UX Consulting':                     'UI/UX Consulting Services',
  'Design Consulting':                    'Design Consulting Services',
  'Website Development':                  'Website Development Services',
  'Managed Services':                     'Managed IT Services',
  'Annual Maintenance Contract (AMC)':    'AMC Services',
  'Resource Augmentation (Staffing)':     'Resource Augmentation (Staffing) Services',
}

async function run() {
  const uri = process.env.DATABASE_URL
  if (!uri) throw new Error('DATABASE_URL not set')

  const client = new MongoClient(uri)
  await client.connect()

  const dbName = new URL(uri.replace('mongodb+srv://', 'https://')).pathname.slice(1).split('?')[0]
  const db = client.db(dbName)
  const col = db.collection('services')

  for (const svc of desired) {
    // Try to find by current slug, then by new title, then by old title alias
    const oldTitle = Object.entries(titleAliases).find(([, v]) => v === svc.title)?.[0]
    const doc =
      (await col.findOne({ slug: svc.slug })) ??
      (await col.findOne({ title: svc.title })) ??
      (oldTitle ? await col.findOne({ title: oldTitle }) : null)

    if (doc) {
      await col.updateOne(
        { _id: doc._id },
        { $set: { title: svc.title, slug: svc.slug, group: svc.group, order: svc.order, status: svc.status, updatedAt: new Date() } },
      )
      const changed = doc.title !== svc.title || doc.slug !== svc.slug || doc.status !== svc.status
      console.log(`  ✓  ${changed ? 'Updated' : 'OK    '}  "${svc.title}"  (${svc.slug})`)
    } else {
      await col.insertOne({
        title: svc.title, slug: svc.slug, group: svc.group, order: svc.order, status: svc.status,
        createdAt: new Date(), updatedAt: new Date(),
      })
      console.log(`  +  Created  "${svc.title}"  (${svc.slug})`)
    }
  }

  // Report anything left over that isn't in the desired list
  const allSlugs = desired.map(s => s.slug)
  const extras = await col.find({ slug: { $nin: allSlugs } }).toArray()
  if (extras.length) {
    console.log('\nExtra services not in the desired 17 (not deleted — review manually):')
    for (const e of extras) console.log(`  ?  "${e.title}"  slug=${e.slug}  status=${e.status}`)
  }

  await client.close()
  console.log('\nDone.')
  process.exit(0)
}

run().catch((err) => { console.error(err); process.exit(1) })
