import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ServiceCard from '@/components/ServiceCard'
import Divider from '@/components/Divider'
import { getMediaUrl } from '@/lib/getMediaUrl'

export const metadata = {
  title: 'Services | OlioNexus',
  description:
    'Explore our full range of services — from AI consulting to custom software development and digital transformation.',
}

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    limit: 100,
    sort: 'order',
    where: {
      status: {
        equals: 'published',
      },
    },
    depth: 2,
  })

  const services = result.docs as any[]

  return (
    <section>
      {/* Header */}
      <div className="section-spacing px-4 md:px-8">
        <p className="section-title text-left! mb-4">[Services]</p>
        <h1>What We Do</h1>
        <p className="section-desc mt-2 max-w-lg">
          We partner with businesses to build software that works — from AI-powered tools to
          end-to-end digital platforms.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-[#CCCCCC]" />

      {/* Services Grid */}
      <div>
        {services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc: any) => {
              const imageUrl = getMediaUrl(svc.coverImage)
              return (
                <ServiceCard
                  key={svc.id}
                  title={svc.title}
                  slug={svc.slug}
                  tagline={svc.tagline}
                  shortDescription={svc.shortDescription}
                  imageUrl={imageUrl}
                  imageAlt={svc.coverImage?.alt}
                />
              )
            })}
          </div>
        ) : (
          <p
            className="text-center py-16"
            style={{ fontFamily: "'Inter', sans-serif", color: '#6B6B6B' }}
          >
            No services published yet.
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="-mt-px">
        <Divider />
      </div>

      {/* CTA */}
      <section className="bg-[#212121] py-20 md:py-28 px-4 md:px-8 text-center">
        <h2 className="text-[#FEF9EF]! max-w-3xl mx-auto mb-6">
          Not sure which service fits your needs? Let's talk.
        </h2>
        <a href="/contact" className="btn-primary">
          Start a Conversation
        </a>
      </section>
    </section>
  )
}
