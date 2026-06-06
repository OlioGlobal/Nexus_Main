import Image from 'next/image'

const images = [
  '/careers/working-1.png',
  '/careers/working-2.png',
  '/careers/working-3.png',
  '/careers/working-4.png',
  '/careers/working-5.png',
  '/careers/working-6.png',
]

export default function WorkingHere() {
  return (
    <section>
      {/* Heading */}
      <div className="bg-[#FEF9EF] border-b border-[#CCCCCC] px-6 md:px-16 py-16 md:py-20">
        <div className="max-w-[630px] mx-auto text-center">
          <h2>
            What Working Here <span className="text-[#FF6B00]">Feels</span> Like
          </h2>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {images.map((image, index) => {
          const isLastRow = index >= images.length - 3

          return (
            <div
              key={index}
              className={`
                relative border-[#CCCCCC]
                md:border-r
                ${!isLastRow ? 'border-b' : ''}
                aspect-[453/470]
                overflow-hidden
                ${index % 3 === 2 ? 'md:border-r-0' : ''}
              `}
            >
              <div className="p-6 md:p-10 h-full">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={image}
                    alt={`Working culture ${index + 1}`}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}