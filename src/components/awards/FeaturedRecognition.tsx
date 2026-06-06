import Image from 'next/image'

const logos = [
  {
    src: '/awards/featured-recognition/topdevelopers.svg',
    alt: 'Top Developers - Top SEO Companies',
    width: 104,
    height: 104,
  },
  {
    src: '/awards/featured-recognition/google-partner.svg',
    alt: 'Premier Google Partner',
    width: 211,
    height: 84,
  },
  {
    src: '/awards/featured-recognition/techbehemoths.svg',
    alt: 'Trusted on Tech Behemoths',
    width: 190,
    height: 66,
  },
  {
    src: '/awards/featured-recognition/bark-pro.svg',
    alt: 'Bark Professional',
    width: 171,
    height: 66,
  },
]

export default function FeaturedRecognition() {
  return (
    <section className="border border-[#CCCCCC]">
      {/* Heading */}
      <div className="flex items-center justify-center h-[224px] px-10 border-b border-[#CCCCCC]">
        <h2 className="text-[40px] leading-[56px] font-medium">
          Featured Recognition
        </h2>
      </div>

      {/* Logos Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {logos.map((logo, index) => (
          <div
            key={index}
            className={`
              flex items-center justify-center
              h-[184px]
              bg-[#FEF9EF]
              border-[#CCCCCC]
              border-b

              lg:border-b-0
              ${
                index !== logos.length - 1
                  ? 'lg:border-r sm:border-r'
                  : ''
              }
            `}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  )
}