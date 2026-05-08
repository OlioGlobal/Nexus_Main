import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config()

async function run() {
  const uri = process.env.DATABASE_URL
  if (!uri) throw new Error('DATABASE_URL not set')

  const client = new MongoClient(uri)
  await client.connect()

  const dbName = new URL(uri.replace('mongodb+srv://', 'https://')).pathname.slice(1).split('?')[0]
  const db = client.db(dbName)
  const col = db.collection('services')

  // List all AMC-related records so we know what exists
  const all = await col.find({ title: /Annual Maintenance|amc/i }).toArray()
  console.log('\nAMC records found:')
  for (const doc of all) {
    console.log(`  id=${doc._id}  slug=${doc.slug}  title=${doc.title}  status=${doc.status}`)
  }

  // Delete any record whose slug is 'amc-services' (the stale duplicate)
  const del = await col.deleteMany({ slug: 'amc-services' })
  console.log(`\nDeleted ${del.deletedCount} stale record(s) with slug 'amc-services'`)

  await client.close()
  process.exit(0)
}

run().catch((err) => { console.error(err); process.exit(1) })
