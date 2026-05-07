import Image from 'next/image'

const logos = [
  { src: '/awards/featured-recognition/topdevelopers.svg', alt: 'Top Developers - Top SEO Companies' },
  { src: '/awards/featured-recognition/google-partner.svg', alt: 'Premier Google Partner' },
  { src: '/awards/featured-recognition/techbehemoths.svg', alt: 'Trusted on Tech Behemoths' },
  { src: '/awards/featured-recognition/bark-pro.svg', alt: 'Bark Professional' },
]

export default function FeaturedRecognition() {
  return (
    <section className="section-divider">
      {/* Heading */}
      <div className="px-4 md:px-8 section-spacing border-b border-[#CCCCCC] text-center">
        <h2 className="h2">Featured Recognition</h2>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {logos.map((logo, i) => (
          <div
            key={i}
            className={`flex items-center justify-center p-10 md:p-16 min-h-[180px] md:min-h-[220px]
              border-b border-[#CCCCCC]
              ${i % 2 === 0 ? 'sm:border-r border-[#CCCCCC]' : ''}
              ${i >= logos.length - 2 ? 'sm:border-b-0' : ''}
              ${i === logos.length - 1 ? 'border-b-0' : ''}
            `}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={240}
              height={120}
              className="max-h-28 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
