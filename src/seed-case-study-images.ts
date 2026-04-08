import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const caseStudyImageMap = [
  { title: 'Paper Trail', image: 'blog1.png' },
  { title: 'Uber Dreams', image: 'blog2.png' },
  { title: 'EduCore', image: 'blog3.png' },
  { title: 'B.M. Raj & Co.', image: 'blog4.png' },
]

async function seedImages() {
  const payload = await getPayload({ config })

  console.log('Uploading images and updating case studies...\n')

  for (const { title, image } of caseStudyImageMap) {
    const imagePath = path.resolve(__dirname, `../public/temp/${image}`)

    if (!fs.existsSync(imagePath)) {
      console.log(`  Image not found: ${image}, skipping`)
      continue
    }

    // Find the case study
    const result = await payload.find({
      collection: 'case-studies',
      where: { title: { equals: title } },
      limit: 1,
    })

    if (result.docs.length === 0) {
      console.log(`  Case study not found: "${title}", skipping`)
      continue
    }

    const cs = result.docs[0]

    // Upload image to media
    const fileData = fs.readFileSync(imagePath)
    const uploaded = await payload.create({
      collection: 'media',
      data: { alt: title },
      file: {
        data: fileData,
        mimetype: 'image/png',
        name: `case-study-${image}`,
        size: fs.statSync(imagePath).size,
      },
    })

    console.log(`  Uploaded: ${image} (id: ${uploaded.id})`)

    // Update case study coverImage
    await payload.update({
      collection: 'case-studies',
      id: cs.id,
      data: { coverImage: uploaded.id },
    })

    console.log(`  Updated: "${title}"\n`)
  }

  console.log('Done!')
  process.exit(0)
}

seedImages().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
