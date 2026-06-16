import Image from 'next/image'

export default function CompanyHero() {
  return (
    <section className="relative px-4 md:px-8 py-14 md:py-24 border-b border-[#CCCCCC] text-center overflow-hidden">
      {/* Background SVG — same as service hero */}
      <Image
        src="/ui/service-bg.svg"
        alt=""
        fill
        className="object-cover object-center pointer-events-none"
        aria-hidden="true"
        priority
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="section-title mb-4">[Company Profile]</p>
        <h1 className="mb-4">
          We Build End-to-End{' '}
          <span style={{ color: '#FF7100' }}>AI-Powered Solutions</span>{' '}
          for All Your Enterprise Gaps and Aspirations
        </h1>
        <p className="section-desc max-w-md mx-auto mb-8">
          NeXus combines AI, custom software development, and technology transformation
          roadmaps to solve problems.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="btn-primary">
            Let&apos;s Connect
          </a>
        </div>
      </div>
    </section>
  )
}
