import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const postImageMap = [
  { title: 'The Death of Traditional SaaS: Why Vertical AI is Eating the World', image: 'blog1.png' },
  { title: 'Scaling to 10M Concurrent: Lessons from Nexus.Build', image: 'blog2.png' },
  { title: '5 Ways to Measure Real ROI on Digital Transformation', image: 'blog3.png' },
  { title: 'The Ethics of Autonomous Agents in Global Finance', image: 'blog4.png' },
  { title: 'Why We Chose Rust for Our Core Infrastructure', image: 'blog5.png' },
  { title: 'Building Products That Create Markets: A Framework', image: 'blog6.png' },
  { title: 'LLMs in Production: What We Learned Deploying at Scale', image: 'blog7.png' },
]

async function seedImages() {
  const payload = await getPayload({ config })

  console.log('Uploading blog images and updating posts...\n')

  for (const { title, image } of postImageMap) {
    const imagePath = path.resolve(__dirname, `../public/temp/${image}`)

    if (!fs.existsSync(imagePath)) {
      console.log(`  Image not found: ${image}, skipping`)
      continue
    }

    // Find the post
    const posts = await payload.find({
      collection: 'posts',
      where: { title: { equals: title } },
    })

    if (posts.docs.length === 0) {
      console.log(`  Post not found: "${title}", skipping`)
      continue
    }

    const post = posts.docs[0]

    // Upload image
    const fileData = fs.readFileSync(imagePath)
    const uploaded = await payload.create({
      collection: 'media',
      data: {
        alt: title,
      },
      file: {
        data: fileData,
        mimetype: 'image/png',
        name: image,
        size: fs.statSync(imagePath).size,
      },
    })

    console.log(`  Uploaded: ${image} (id: ${uploaded.id})`)

    // Update post with new image
    await payload.update({
      collection: 'posts',
      id: post.id,
      data: {
        featuredImage: uploaded.id,
      },
    })

    console.log(`  Updated post: "${title}"\n`)
  }

  console.log('Done!')
  process.exit(0)
}

seedImages().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
