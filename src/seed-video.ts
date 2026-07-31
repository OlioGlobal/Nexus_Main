import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

const TEMP_DIR = path.resolve('public/temp')

const VIDEO_FILE = 'vecteezy_discussion-with-a-real-estate-agent-house-model-with-agent_15122040.mp4'
const POSTER_FILE = 'thumbnail.jpg'

function getMimeType(filename: string): string {
  const f = filename.toLowerCase()
  if (f.endsWith('.mp4')) return 'video/mp4'
  if (f.endsWith('.webm')) return 'video/webm'
  if (f.endsWith('.svg')) return 'image/svg+xml'
  if (f.endsWith('.png')) return 'image/png'
  return 'image/jpeg'
}

// Reuse existing Media by filename so we don't re-upload to Cloudinary (saves space).
async function findOrUpload(payload: any, filename: string, alt: string): Promise<string | null> {
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

  const filePath = path.join(TEMP_DIR, filename)
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠  Not found: ${filePath}`)
    return null
  }
  console.log(`  ⤴  Uploading: ${filename} (${(fs.statSync(filePath).size / 1e6).toFixed(1)} MB)...`)
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

  console.log('\n• Uploading video + poster:')
  const videoId = await findOrUpload(payload, VIDEO_FILE, 'Home page showcase video')
  const posterId = await findOrUpload(payload, POSTER_FILE, 'Video poster')

  console.log('\n• Writing video section to the Home Page global...')
  const home = (await payload.findGlobal({ slug: 'home-page', depth: 0 })) as any
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      video: {
        ...(home.video ?? {}),
        enabled: true,
        video: videoId ?? home.video?.video ?? undefined,
        poster: posterId ?? home.video?.poster ?? undefined,
      },
    },
  })

  console.log('\n✓  Video section seeded into the Home Page.\n')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
