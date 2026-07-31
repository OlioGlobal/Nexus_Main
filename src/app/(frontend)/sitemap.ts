import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// Static routes that always exist.
const staticRoutes = [
  '',
  '/services',
  '/industries',
  '/case-studies',
  '/company',
  '/awards',
  '/why-choose-olio-nexus',
  '/careers',
  '/contact',
  '/blogs',
  '/privacy-policy',
  '/terms',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  let dynamicUrls: MetadataRoute.Sitemap = []

  try {
    const payload = await getPayload({ config })
    const opts = { limit: 1000, depth: 0, pagination: false } as const

    const [services, industries, posts, caseStudies, jobs] = await Promise.all([
      payload.find({ collection: 'services', where: { status: { equals: 'published' } }, ...opts }),
      payload.find({ collection: 'industry-pages', where: { status: { equals: 'published' } }, ...opts }),
      payload.find({ collection: 'posts', where: { status: { equals: 'published' } }, ...opts }),
      payload.find({ collection: 'case-studies', where: { status: { equals: 'published' } }, ...opts }),
      payload.find({ collection: 'jobs', where: { status: { equals: 'open' } }, ...opts }),
    ])

    const map = (docs: any[], prefix: string): MetadataRoute.Sitemap =>
      docs
        .filter((d) => d?.slug)
        .map((d) => ({
          url: `${siteUrl}${prefix}/${d.slug}`,
          lastModified: d.updatedAt ? new Date(d.updatedAt) : now,
        }))

    dynamicUrls = [
      ...map(services.docs as any[], '/services'),
      ...map(industries.docs as any[], '/industries'),
      ...map(posts.docs as any[], '/blogs'),
      ...map(caseStudies.docs as any[], '/case-studies'),
      ...map(jobs.docs as any[], '/careers'),
    ]
  } catch (err) {
    // If the DB is unreachable at build time, still emit the static routes.
    console.error('sitemap: failed to load dynamic routes', err)
  }

  return [
    ...staticRoutes.map((r) => ({ url: `${siteUrl}${r}`, lastModified: now })),
    ...dynamicUrls,
  ]
}
