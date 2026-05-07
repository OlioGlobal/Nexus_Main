import { getMediaUrl } from '@/lib/getMediaUrl'

interface CaseStudy {
  title: string
  slug: string
  industry: string
  coverImage?: any
}

interface RecognitionPressProps {
  caseStudies: CaseStudy[]
}

export default function RecognitionPress({ caseStudies }: RecognitionPressProps) {
  return (
    <section className="section-divider">
      {/* Header */}
      <div className="px-4 md:px-8 section-spacing border-b border-[#CCCCCC] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="h2">Industry Recognition &amp; Press</h2>
        <div className="flex gap-3 shrink-0">
          <a href="/case-studies" className="btn-primary text-sm!">See Our Work</a>
          <a href="/blogs" className="btn-secondary text-sm!">Industry Insights</a>
        </div>
      </div>

      {/* Articles grid */}
      {caseStudies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs, i) => {
            const imageUrl = getMediaUrl(cs.coverImage)
            return (
              <div
                key={cs.slug}
                className={`flex flex-col border-b border-[#CCCCCC]
                  ${i % 3 !== 2 ? 'lg:border-r border-[#CCCCCC]' : ''}
                  ${i % 2 === 0 ? 'sm:border-r border-[#CCCCCC]' : 'sm:border-r-0'}
                `}
              >
                {/* Image */}
                <div className="p-4 md:p-6 pb-0">
                  <div className="w-full aspect-video overflow-hidden bg-[#E8E3D9]">
                    {imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imageUrl}
                        alt={cs.coverImage?.alt || cs.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#E8E3D9]" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 flex flex-col gap-3">
                  <span
                    className="self-start border border-[#CCCCCC] px-2 py-1 text-[12px] leading-none"
                    style={{ fontFamily: "'Inter', sans-serif", color: '#6B6B6B' }}
                  >
                    {cs.industry}
                  </span>
                  <h3 className="text-[18px]! md:text-[20px]!">{cs.title}</h3>
                  <a
                    href={`/case-studies/${cs.slug}`}
                    className="link-learn-more text-[13px]! uppercase tracking-wider"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Read Article
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="px-4 md:px-8 py-12 text-center section-desc">No case studies published yet.</p>
      )}
    </section>
  )
}
