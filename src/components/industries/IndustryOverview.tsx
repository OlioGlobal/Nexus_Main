import { RichText } from '@payloadcms/richtext-lexical/react'

interface IndustryOverviewProps {
  heading?: string
  content?: any
  ctaText?: string
  ctaLink?: string
}

export default function IndustryOverview({
  heading,
  content,
  ctaText,
  ctaLink = '/contact',
}: IndustryOverviewProps) {
  if (!heading && !content) return null

  return (
    <section className="border-b border-[#CCCCCC]">
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* Left — sticky heading */}
        <div className="border-b md:border-b-0 p-6 md:p-10">
          <div className="sticky top-20">
            {heading && (
              <h2
                className="text-[#212121]! leading-[1.3]!"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {heading}
              </h2>
            )}
          </div>
        </div>

        {/* Right — content + CTA */}
        <div className="p-6 md:p-10 flex flex-col gap-6">
          {content && (
            <div className="case-study-richtext">
              <RichText data={content} />
            </div>
          )}
          {ctaText && (
            <div>
              <a href={ctaLink} className="btn-primary">{ctaText}</a>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
