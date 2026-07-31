/**
 * JSON-LD builders — one per schema type in the Schema Field Reference.
 * All builders return plain objects; empty/undefined fields are stripped so
 * we never emit blank properties (e.g. an unconfirmed foundingDate).
 */
import { SITE_URL, ORG_ID, WEBSITE_ID, LOGO_URL, DEFAULT_IMAGE, ORG } from './organization'

const LANG = 'en'

// ── helpers ────────────────────────────────────────────────────────────────
export const abs = (path: string): string =>
  /^https?:\/\//i.test(path) ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`

/** Deep-remove undefined, null, '', [] and {} so schema stays clean. */
export function strip<T>(obj: T): T {
  if (Array.isArray(obj)) {
    const arr = obj.map(strip).filter((v) => v !== undefined)
    return arr as unknown as T
  }
  if (obj && typeof obj === 'object') {
    const out: any = {}
    for (const [k, v] of Object.entries(obj as any)) {
      const cleaned = strip(v as any)
      const empty =
        cleaned === undefined ||
        cleaned === null ||
        cleaned === '' ||
        (Array.isArray(cleaned) && cleaned.length === 0) ||
        (typeof cleaned === 'object' && !Array.isArray(cleaned) && Object.keys(cleaned).length === 0)
      if (!empty) out[k] = cleaned
    }
    return out
  }
  return obj
}

/** Extract plain text + word count from Payload Lexical or a plain string. */
export function lexicalToText(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  let text = ''
  if (typeof node.text === 'string') text += node.text
  const kids = node.children || node.root?.children
  if (Array.isArray(kids)) for (const k of kids) text += ' ' + lexicalToText(k)
  return text.replace(/\s+/g, ' ').trim()
}

const postalAddress = () => ({
  '@type': 'PostalAddress',
  streetAddress: ORG.address.streetAddress,
  addressLocality: ORG.address.addressLocality,
  addressRegion: ORG.address.addressRegion,
  postalCode: ORG.address.postalCode,
  addressCountry: ORG.address.addressCountry,
})

const openingHoursSpec = () => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ORG.openingHours.dayOfWeek,
  opens: ORG.openingHours.opens,
  closes: ORG.openingHours.closes,
})

// ── 01 Global ───────────────────────────────────────────────────────────────
export const organizationSchema = () =>
  strip({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: ORG.name,
    alternateName: ORG.alternateName,
    legalName: ORG.legalName,
    url: ORG.url,
    logo: ORG.logo,
    image: ORG.image,
    description: ORG.description,
    email: ORG.email,
    telephone: ORG.telephone,
    address: postalAddress(),
    areaServed: ORG.areaServed,
    foundingDate: ORG.foundingDate,
    founder: (ORG.founder || []).map((name) => ({ '@type': 'Person', name })),
    parentOrganization: ORG.parentOrganization
      ? { '@type': 'Organization', name: ORG.parentOrganization }
      : undefined,
    slogan: ORG.slogan,
    knowsAbout: ORG.knowsAbout,
    sameAs: ORG.sameAs,
  })

export const websiteSchema = () =>
  strip({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: ORG.name,
    description: ORG.description,
    inLanguage: LANG,
    publisher: { '@id': ORG_ID },
  })

export const breadcrumbSchema = (items: { name: string; path: string }[]) =>
  strip({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': items.length ? `${abs(items[items.length - 1].path)}#breadcrumb` : undefined,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  })

// ── 02 Homepage ───────────────────────────────────────────────────────────
export const webPageSchema = (o: {
  path: string
  name: string
  description?: string
  headline?: string
  image?: string
  datePublished?: string
  dateModified?: string
  about?: boolean
  breadcrumbPath?: { name: string; path: string }[]
}) =>
  strip({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${abs(o.path)}#webpage`,
    url: abs(o.path),
    name: o.name,
    headline: o.headline || o.name,
    description: o.description,
    primaryImageOfPage: o.image,
    image: o.image || DEFAULT_IMAGE,
    datePublished: o.datePublished,
    dateModified: o.dateModified,
    isPartOf: { '@id': WEBSITE_ID },
    about: o.about ? { '@id': ORG_ID } : undefined,
    breadcrumb: o.breadcrumbPath ? { '@id': `${abs(o.path)}#breadcrumb` } : undefined,
    inLanguage: LANG,
  })

export const professionalServiceSchema = () =>
  strip({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#professionalservice`,
    name: ORG.name,
    image: ORG.image,
    url: SITE_URL,
    description: ORG.description,
    areaServed: ORG.areaServed,
    serviceType: ORG.knowsAbout,
    telephone: ORG.telephone,
    email: ORG.email,
    address: postalAddress(),
    openingHoursSpecification: openingHoursSpec(),
    // aggregateRating intentionally omitted — no verified rating data.
  })

// ── 03 Service pages ─────────────────────────────────────────────────────────
const GROUP_TYPE: Record<string, string> = {
  'nexus-build': 'Technology Solutions',
  'nexus-ai': 'AI & Automation',
  'nexus-labs': 'Technology Transformation',
}

export const serviceSchema = (svc: any, path: string, image?: string) => {
  const catalog = (svc.deliverables || svc.whatWeDeliver || [])
    .map((d: any) => d?.title || d?.name || d?.text || d?.point)
    .filter(Boolean)
    .slice(0, 8)
  const audienceType = (svc.audienceItems || [])
    .map((a: any) => a?.title || a?.name || a?.text)
    .filter(Boolean)
    .slice(0, 4)
    .join(', ')
  return strip({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${abs(path)}#service`,
    name: svc.title,
    serviceType: GROUP_TYPE[svc.group] || svc.tagline,
    description: svc.shortDescription || svc.tagline || svc.description,
    provider: { '@type': 'Organization', '@id': ORG_ID, name: ORG.name, url: SITE_URL },
    areaServed: ORG.areaServed,
    audience: audienceType ? { '@type': 'Audience', audienceType } : undefined,
    offers: { '@type': 'Offer', url: abs(path), name: svc.title, availability: 'https://schema.org/InStock' },
    hasOfferCatalog:
      catalog.length > 0
        ? {
            '@type': 'OfferCatalog',
            name: `${svc.title} — Deliverables`,
            itemListElement: catalog.map((name: string) => ({ '@type': 'Offer', name })),
          }
        : undefined,
    url: abs(path),
    image: image || DEFAULT_IMAGE,
    mainEntityOfPage: abs(path),
  })
}

export const faqSchema = (items: any[]) => {
  const entries = (items || [])
    .map((f: any) => ({ q: f?.question, a: f?.answer }))
    .filter((f) => f.q && f.a)
  if (entries.length === 0) return null
  return strip({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  })
}

// ── 04 Industry / 07 Case-study listing — CollectionPage ─────────────────────
export const collectionPageSchema = (o: {
  path: string
  name: string
  description?: string
  headline?: string
  image?: string
  about?: string
  audienceType?: string
}) =>
  strip({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${abs(o.path)}#collectionpage`,
    url: abs(o.path),
    name: o.name,
    headline: o.headline || o.name,
    description: o.description,
    about: o.about ? { '@type': 'Thing', name: o.about } : undefined,
    audience: o.audienceType ? { '@type': 'Audience', audienceType: o.audienceType } : undefined,
    image: o.image || DEFAULT_IMAGE,
    breadcrumb: { '@id': `${abs(o.path)}#breadcrumb` },
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: LANG,
  })

// ── 05 Blog listing ─────────────────────────────────────────────────────────
export const blogSchema = (path: string) =>
  strip({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${abs(path)}#blog`,
    name: 'Olio Nexus Blog',
    description:
      'Expert perspectives on technology solutions, AI consulting, software product development, and digital transformation.',
    url: abs(path),
    inLanguage: LANG,
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: ORG.name,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
  })

// ── 06 Blog post ─────────────────────────────────────────────────────────────
export const blogPostingSchema = (post: any, path: string, image?: string) => {
  const body = lexicalToText(post.content) || (post.contentHTML || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const wordCount = body ? body.split(/\s+/).length : undefined
  const category = typeof post.category === 'object' ? post.category?.title : post.category
  return strip({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${abs(path)}#blogposting`,
    headline: post.title,
    description: post.excerpt,
    articleBody: body || undefined,
    articleSection: category,
    keywords: post.keywords || category,
    author: { '@type': 'Organization', name: post.author || 'Olio Nexus Team', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: ORG.name,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
    image: image ? { '@type': 'ImageObject', url: image } : undefined,
    thumbnailUrl: image,
    url: abs(path),
    mainEntityOfPage: abs(path),
    datePublished: post.publishDate || post.createdAt,
    dateModified: post.updatedAt || post.publishDate,
    wordCount,
    inLanguage: LANG,
    isPartOf: { '@id': `${SITE_URL}/blogs#blog` },
  })
}

// ── 08 Case study — Article ──────────────────────────────────────────────────
export const articleSchema = (cs: any, path: string, image?: string) => {
  const body = [cs.clientDescription, lexicalToText(cs.challenge), lexicalToText(cs.solutions), lexicalToText(cs.impact)]
    .filter(Boolean)
    .join(' ')
    .trim()
  return strip({
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${abs(path)}#article`,
    headline: cs.title,
    description: cs.tagline,
    author: { '@type': 'Organization', name: cs.author || 'Olio Nexus Team', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: ORG.name,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
    image: image ? { '@type': 'ImageObject', url: image } : undefined,
    datePublished: cs.createdAt,
    dateModified: cs.updatedAt || cs.createdAt,
    mainEntityOfPage: abs(path),
    articleBody: body || undefined,
    keywords: cs.keywords || cs.industry,
    about: cs.industry ? { '@type': 'Thing', name: cs.industry } : undefined,
    isPartOf: { '@id': `${SITE_URL}/case-studies#collectionpage` },
    inLanguage: LANG,
  })
}

// ── 09 About ──────────────────────────────────────────────────────────────────
export const aboutPageSchema = (path: string, o?: { name?: string; description?: string }) =>
  strip({
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${abs(path)}#aboutpage`,
    url: abs(path),
    name: o?.name || 'About Olio Nexus',
    headline: o?.name || 'About Olio Nexus',
    description: o?.description,
    about: { '@id': ORG_ID },
    mainEntity: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: LANG,
  })

// ── 10 Contact ────────────────────────────────────────────────────────────────
export const contactPageSchema = (path: string, description?: string) =>
  strip({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${abs(path)}#contactpage`,
    url: abs(path),
    name: 'Contact Olio Nexus',
    description,
    mainEntity: { '@id': `${SITE_URL}/#contactpoint` },
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: LANG,
  })

export const contactPointSchema = () =>
  strip({
    '@type': 'ContactPoint',
    '@id': `${SITE_URL}/#contactpoint`,
    contactType: 'customer support',
    telephone: ORG.telephone,
    email: ORG.email,
    availableLanguage: ORG.availableLanguage,
    areaServed: ORG.areaServed,
    hoursAvailable: openingHoursSpec(),
  })

// ── 12 Error / 404 ────────────────────────────────────────────────────────────
export const notFoundSchema = () =>
  strip({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/404#webpage`,
    name: 'Page Not Found',
    description: 'The page you are looking for could not be found.',
    url: `${SITE_URL}/404`,
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: LANG,
  })
