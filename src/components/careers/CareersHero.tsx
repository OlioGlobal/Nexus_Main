import Image from 'next/image'

type CareersHeroProps = {
  hasOpenJobs: boolean
}

export default function CareersHero({
  hasOpenJobs,
}: CareersHeroProps) {
  return (
    <div>

      {/* Hero heading section — service-bg.svg as background */}
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
          <h1 className="mb-4 ">Join Designers and Developers Who Blend Clean Code with Vibe Coding</h1>
          <p className="section-desc  mx-auto ">
            Be part of Olio NeXus and get the opportunity to create software products, platforms, AI systems,
             and applications that tackle real operational challenges.
          </p>
          <p className="section-desc  mx-auto ">
            Here, you do more than build features. You’ll design systems, workflows, and technology that drive
             business operations, growth, and innovation.
          </p>
           <p className="section-desc  mx-auto mb-8">
            Share your ideas, take charge of meaningful projects, and work with teams focused on technical progress,
             strategic vision, and ongoing growth.
          </p>
          {hasOpenJobs && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#open-opportunities" className="btn-primary">See Our Open Positions</a>
          </div>
            )}
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
