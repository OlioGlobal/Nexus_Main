
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getTestimonials() {
 const payload = await getPayload({ config })
   const Data = (await payload.findGlobal({ slug: 'home-page', depth: 2 })) as any
   const data = Data.testimonials
   return data
}