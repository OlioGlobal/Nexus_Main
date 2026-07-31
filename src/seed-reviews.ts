import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const LOGO_DIR = path.resolve('public/truster/review_brand')

// 5 logos + dummy reviews. The `file` names match the SVGs in public/truster/review_brand.
const REVIEWS = [
  {
    file: 'Nexgen Hygiene System.svg',
    company: 'Nexgen Hygiene Systems',
    name: 'Nexgen Hygiene Systems',
    role: 'Operations Team',
    quote:
      'Olio Nexus delivered a modern, intuitive platform with exceptional attention to detail. Communication was excellent throughout and the final result exceeded our expectations.',
  },
  {
    file: 'Frame 9.svg',
    company: 'Frame',
    name: 'Frame',
    role: 'Product Team',
    quote:
      'A reliable partner from start to finish. Their team understood our goals quickly and translated them into a polished, dependable product our whole team enjoys using.',
  },
  {
    file: 'IMG_1418 2.svg',
    company: 'Client 03',
    name: 'Client 03',
    role: 'Founder',
    quote:
      'Working with Olio Nexus has been a truly positive experience. Thoughtful execution and steady communication made the entire process feel supported from start to finish.',
  },
  {
    file: 'image 196.svg',
    company: 'Client 04',
    name: 'Client 04',
    role: 'Marketing Lead',
    quote:
      'The team delivered a beautiful, high-performing website that reflects the scale and professionalism of our business. We have received positive feedback from clients and partners alike.',
  },
  {
    file: 'ChatGPT Image Jan 27, 2026, 05_44_59 PM 1.svg',
    company: 'Client 05',
    name: 'Client 05',
    role: 'Program Office',
    quote:
      'They translated our requirements into an easy-to-use solution with rapid iteration. Professional, patient, and genuinely invested in our success.',
  },
]

function getMimeType(filename: string): string {
  return filename.toLowerCase().endsWith('.svg') ? 'image/svg+xml' : 'image/png'
}

// Reuse existing Media by filename so we don't re-upload to Cloudinary (saves space).
async function findOrUploadLogo(payload: any, filename: string, alt: string): Promise<string | null> {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  })
  if (existing.docs.length > 0) {
    console.log(`  ↺  Reusing existing: ${filename}  (id: ${existing.docs[0].id})`)
    return existing.docs[0].id
  }

  const filePath = path.join(LOGO_DIR, filename)
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠  Not found: ${filePath}`)
    return null
  }
  const uploaded = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: fs.readFileSync(filePath),
      mimetype: getMimeType(filename),
      name: filename,
      size: fs.statSync(filePath).size,
    },
  })
  console.log(`  ✓  Uploaded: ${filename}  (id: ${uploaded.id})`)
  return uploaded.id
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('\n• Uploading review logos:')
  const items = []
  for (const r of REVIEWS) {
    const logoId = await findOrUploadLogo(payload, r.file, r.company)
    items.push({
      name: r.name,
      role: r.role,
      quote: r.quote,
      company: r.company,
      logo: logoId ?? undefined,
    })
  }

  console.log('\n• Writing testimonials to the Home Page global...')
  const home = (await payload.findGlobal({ slug: 'home-page', depth: 0 })) as any
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      testimonials: {
        ...(home.testimonials ?? {}),
        items,
      },
    },
  })

  console.log(`\n✓  Seeded ${items.length} reviews with logos into the Home Page.\n`)
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
