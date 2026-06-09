import Image from 'next/image'

export default function IndustriesHero() {
  return (
    <div className="border-b border-[#CCCCCC]">

      {/* Hero heading section — service-bg.svg as background */}
      <div className="relative text-center px-4 md:px-8 py-14 md:py-24 overflow-hidden">
        <Image
          src="/ui/service-bg.svg"
          alt=""
          fill
          className="object-cover object-center pointer-events-none"
          aria-hidden="true"
          priority
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="mb-4">Industries We <span style={{ color: '#FF7100' }}>Transform</span></h1>
          <p className="section-desc max-w-sm mx-auto mb-2">
            Technology solutions designed to solve real business challenges in your industry.
          </p>
          <p className="section-desc max-w-sm mx-auto mb-8">
            We create technology solutions that fit your industry&apos;s real-world operations,
            regulations, and growth needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">Book a Consultation</a>
          </div>
        </div>
      </div>

      {/* Orange glow at bottom */}
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
