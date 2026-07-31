/**
 * Context-aware alt-text backfill.
 *
 * Only touches media whose current alt is "junk" (raw filename tokens like
 * "image 109", "IMG_1418", "unnamed", phosphor icon names, numeric/short).
 * For each, it derives a real alt from WHERE the image is used — the nearest
 * card/section title in the parent doc that references it.
 *
 * Dry run:  npx cross-env NODE_OPTIONS=--no-deprecation tsx src/seed-alt-text.ts
 * Apply:    npx cross-env NODE_OPTIONS=--no-deprecation tsx src/seed-alt-text.ts --write
 */
import { MongoClient, ObjectId } from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config()

const WRITE = process.argv.includes('--write')
const BRAND = 'Olio Nexus'

const LABEL_KEYS = [
  'title', 'name', 'heading', 'headline', 'label', 'question',
  'sectionTitle', 'tagline', 'client', 'company', 'text',
]

const isJunkAlt = (alt: string, filename: string): boolean => {
  const a = (alt || '').trim()
  if (!a) return true
  const base = (filename || '').replace(/\.[a-z0-9]+$/i, '')
  if (a === filename) return true
  if (/^(image\s*\d+|img[_\-\s]|unnamed|untitled|dsc[_\-\s]|screenshot|photo\s*\d+|ph_|bars$)/i.test(a)) return true
  if (a.length < 4) return true
  if (a === base && /^(image|img|unnamed|untitled|dsc|screenshot|ph_)/i.test(base)) return true
  return false
}

// Turn a filename into a readable phrase as a last-resort fallback.
const cleanFilename = (filename: string): string => {
  const base = (filename || '').replace(/\.[a-z0-9]+$/i, '')
  const cleaned = base
    .replace(/^ph[_-]/i, '')
    .replace(/[_\-]+/g, ' ')
    .replace(/\b(image|img|unnamed|untitled|dsc|screenshot|copy|final|\d+)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return cleaned
}

async function main() {
  const uri = process.env.DATABASE_URL!
  const client = new MongoClient(uri)
  await client.connect()
  const dbName = new URL(uri.replace('mongodb+srv://', 'https://')).pathname.slice(1).split('?')[0]
  const db = client.db(dbName)

  // 1) Load media, find junk ones.
  const mediaDocs = await db.collection('media').find({}, { projection: { alt: 1, filename: 1 } }).toArray()
  const junk = new Map<string, { filename: string; alt: string }>()
  for (const m of mediaDocs) {
    if (isJunkAlt(m.alt || '', m.filename || '')) junk.set(m._id.toString(), { filename: m.filename || '', alt: m.alt || '' })
  }

  // 2) Build media-id -> best context label by walking parent docs.
  const context = new Map<string, string>() // mediaId -> label

  const remember = (id: string, label: string) => {
    if (!id || !label) return
    if (!junk.has(id)) return
    const clean = String(label).trim()
    if (clean.length < 3 || clean.length > 90) return
    if (!context.has(id)) context.set(id, clean)
  }

  const walk = (node: any, nearestLabel: string) => {
    if (node == null) return
    if (node instanceof ObjectId) return
    if (Array.isArray(node)) {
      for (const item of node) walk(item, nearestLabel)
      return
    }
    if (typeof node === 'object') {
      // Update nearest label if this object carries one.
      let label = nearestLabel
      for (const k of LABEL_KEYS) {
        if (typeof node[k] === 'string' && node[k].trim()) { label = node[k].trim(); break }
      }
      for (const [k, v] of Object.entries(node)) {
        // Logos get a logo-specific label rather than the section heading.
        const refLabel = /logo/i.test(k) ? 'Client company logo' : label
        // A media reference: ObjectId or 24-hex string that is a known junk media.
        if (v instanceof ObjectId && junk.has(v.toString())) {
          remember(v.toString(), refLabel)
        } else if (typeof v === 'string' && /^[a-f0-9]{24}$/i.test(v) && junk.has(v)) {
          remember(v, refLabel)
        } else if (v && typeof v === 'object') {
          walk(v, label)
        }
      }
    }
  }

  const parentSpecs: { coll: string }[] = [
    { coll: 'services' },
    { coll: 'industry-pages' },
    { coll: 'posts' },
    { coll: 'case-studies' },
    { coll: 'globals' },
  ]
  for (const { coll } of parentSpecs) {
    const docs = await db.collection(coll).find({}).toArray()
    for (const d of docs) {
      const docTitle = d.title || d.name || d.label || ''
      walk(d, docTitle)
    }
  }

  // 3) Decide final alt for each junk media.
  let withContext = 0, withFilename = 0, brandOnly = 0
  const updates: { id: string; alt: string; from: string; src: string }[] = []
  const OVERRIDES: Record<string, string> = {
    roi: 'ROI calculator chart',
  }
  for (const [id, info] of junk) {
    let alt = context.get(id)
    let src = 'context'
    if (!alt && OVERRIDES[(info.alt || '').trim().toLowerCase()]) {
      alt = OVERRIDES[(info.alt || '').trim().toLowerCase()]
      src = 'override'
    }
    if (!alt) {
      const cf = cleanFilename(info.filename)
      if (cf && cf.length >= 4 && !/^\d+$/.test(cf)) { alt = cf; src = 'filename' }
    }
    if (!alt) { alt = `${BRAND} technology solutions`; src = 'brand' }
    // Title-case-ish tidy + brand touch for context/filename labels
    if (src !== 'brand' && !/olio nexus/i.test(alt)) alt = alt
    if (src === 'context') withContext++
    else if (src === 'filename') withFilename++
    else brandOnly++
    updates.push({ id, alt, from: info.alt || '(empty)', src })
  }

  console.log(`Media total: ${mediaDocs.length}`)
  console.log(`Junk alt: ${junk.size}`)
  console.log(`  → from usage context: ${withContext}`)
  console.log(`  → from cleaned filename: ${withFilename}`)
  console.log(`  → brand fallback: ${brandOnly}`)
  console.log('\n--- sample (first 30) ---')
  for (const u of updates.slice(0, 30)) console.log(`  [${u.src}] "${u.from}"  →  "${u.alt}"`)

  if (WRITE) {
    let n = 0
    for (const u of updates) {
      await db.collection('media').updateOne({ _id: new ObjectId(u.id) }, { $set: { alt: u.alt, updatedAt: new Date() } })
      n++
    }
    console.log(`\n✅ WROTE ${n} media alt updates.`)
  } else {
    console.log('\n(DRY RUN — re-run with --write to apply)')
  }

  await client.close()
  process.exit(0)
}
main().catch((e) => { console.error(e); process.exit(1) })
