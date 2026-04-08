import { getPayload } from 'payload'
import configPromise from '@payload-config'
import CaseStudyCard from '@/components/CaseStudyCard'
import Divider from '@/components/Divider'
import { getMediaUrl } from '@/lib/getMediaUrl'

export const metadata = {
  title: 'Case Studies | OlioNexus',
  description:
    'All projects presented as high-impact features. We deliver outcomes, not just code.',
}

export default async function CaseStudiesPage() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'case-studies',
    limit: 100,
    sort: 'order',
    where: {
      status: {
        equals: 'published',
      },
    },
    depth: 2,
  })

  const caseStudies = result.docs as any[]

  return (
    <section>
      {/* Header */}
      <div className="section-spacing px-4 md:px-8">
        <p className="section-title text-left! mb-4">[Case Studies]</p>
        <h1>The Work</h1>
        <p className="section-desc mt-2 max-w-lg">
          All projects presented as high-impact features. We deliver outcomes, not just code.
        </p>
      </div>

      {/* Divider line */}
      <div className="border-t border-[#CCCCCC]" />

      {/* Case Study Grid */}
      <div>
        {caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {caseStudies.map((cs: any) => {
              const imageUrl = getMediaUrl(cs.coverImage)
              return (
                <CaseStudyCard
                  key={cs.id}
                  title={cs.title}
                  slug={cs.slug}
                  client={cs.client}
                  industry={cs.industry}
                  imageUrl={imageUrl}
                  imageAlt={cs.coverImage?.alt}
                />
              )
            })}
          </div>
        ) : (
          <p
            className="text-center py-16"
            style={{ fontFamily: "'Inter', sans-serif", color: '#6B6B6B' }}
          >
            No case studies published yet.
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
          Get in touch to discuss how we can help to keep you ahead of your competitors
        </h2>
        <a href="/contact" className="btn-primary">
          Start a Conversation
        </a>
      </section>
    </section>
  )
}
