import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config()

type Group = 'nexus-build' | 'nexus-ai' | 'nexus-labs'

const services: { title: string; slug: string; group: Group; order: number }[] = [
  { title: 'Technology Solutions',                 slug: 'technology-solutions',                  group: 'nexus-build', order: 1 },
  { title: 'Software Product Development',         slug: 'software-development-services',         group: 'nexus-build', order: 2 },
  { title: 'Web and Mobile App Development',       slug: 'app-development-services',              group: 'nexus-build', order: 3 },
  { title: 'Website Development',                  slug: 'website-development-services',          group: 'nexus-build', order: 4 },
  { title: 'UI/UX Consulting',                     slug: 'ui-ux-design-and-consulting-services',  group: 'nexus-build', order: 5 },
  { title: 'Design Consulting',                    slug: 'design-consulting-services',            group: 'nexus-build', order: 6 },
  { title: 'Product & MVP Development',            slug: 'mvp-product-development-services',      group: 'nexus-build', order: 7 },
  { title: 'Managed Services',                     slug: 'managed-it-services',                   group: 'nexus-build', order: 8 },
  { title: 'Annual Maintenance Contract (AMC)',    slug: 'amc-services',                          group: 'nexus-build', order: 9 },
  { title: 'Resource Augmentation (Staffing)',     slug: 'resource-augmentation-services',        group: 'nexus-build', order: 10 },
  { title: 'AI & Automation',                      slug: 'ai-automation',                         group: 'nexus-ai',    order: 1 },
  { title: 'AI Consulting',                        slug: 'ai-consulting-services',                group: 'nexus-ai',    order: 2 },
  { title: 'AI Transformation',                    slug: 'ai-transformation-services',            group: 'nexus-ai',    order: 3 },
  { title: 'AI Agents / Custom Automation',        slug: 'ai-agent-development-services',         group: 'nexus-ai',    order: 4 },
  { title: 'AI Implementation',                    slug: 'ai-implementation-services',            group: 'nexus-ai',    order: 5 },
  { title: 'Technology Transformation',            slug: 'technology-transformation',             group: 'nexus-labs',  order: 1 },
  { title: 'Technology Transformation Consulting', slug: 'technology-transformation-consulting',  group: 'nexus-labs',  order: 2 },
  { title: 'Change Management Support',            slug: 'change-management-support',             group: 'nexus-labs',  order: 3 },
  { title: 'Process Optimization',                 slug: 'process-optimization-services',         group: 'nexus-labs',  order: 4 },
  { title: 'Technology Roadmaps',                  slug: 'technology-roadmaps-services',          group: 'nexus-labs',  order: 5 },
]

async function seed() {
  const uri = process.env.DATABASE_URL
  if (!uri) throw new Error('DATABASE_URL not set')

  const client = new MongoClient(uri)
  await client.connect()

  // Payload stores collections in a db — derive db name from the connection string
  const dbName = new URL(uri.replace('mongodb+srv://', 'https://')).pathname.slice(1).split('?')[0]
  const db = client.db(dbName)
  const col = db.collection('services')

  for (const { title, slug, group, order } of services) {
    // Find by title first, then fall back to slug
    const byTitle = await col.findOne({ title })
    const bySlug  = await col.findOne({ slug })

    if (byTitle) {
      if (byTitle.slug === slug) {
        console.log(`Already correct: ${slug}`)
      } else {
        await col.updateOne({ _id: byTitle._id }, { $set: { slug, group, order } })
        console.log(`Fixed slug: "${title}" → ${slug}`)
      }
    } else if (bySlug) {
      // Slug exists under a different title — update title + meta
      await col.updateOne({ _id: bySlug._id }, { $set: { title, group, order } })
      console.log(`Updated title on existing slug: ${slug}`)
    } else {
      await col.insertOne({
        title,
        slug,
        group,
        order,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      console.log(`Created: "${title}" → ${slug}`)
    }
  }

  await client.close()
  console.log('Done.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
