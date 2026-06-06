import Image from 'next/image'

export default function WhyChooseHero() {
  return (
    <div>
      <div className="relative text-center px-4 md:px-8 py-14 md:py-24 overflow-hidden">
        <Image
          src="/ui/service-bg.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center pointer-events-none"
          aria-hidden="true"
          priority
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="mb-4">Why Choose Olio Nexus</h1>
          <p className="section-desc mx-auto max-w-3xl">
            Most technology projects involve three separate vendors: one for strategy, one for building, and one for change management. Each covers their area, but no one takes responsibility for what falls in between.
          </p>
          <p className="section-desc mx-auto max-w-3xl mt-6">
            This is where many technology investments fall short: bridging this gap matters.
          </p>
          <p className="section-desc mx-auto max-w-3xl mt-6 mb-8">
            Nexus bridges that gap. We don’t try to do everything, but we connect what matters: AI, Build, and technology transformation Labs, under one strategy, with the same team guiding you from start to finish.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Book a Discovery Call
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-center overflow-hidden" style={{ height: '80px', marginTop: '-80px', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            width: '500px',
            height: '160px',
            background: 'radial-gradient(ellipse at 50% 100%, rgba(255,113,0,0.5) 0%, rgba(255,154,0,0.2) 40%, rgba(255,113,0,0) 70%)',
          }}
        />
      </div>
    </div>
  )
}
