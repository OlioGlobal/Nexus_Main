import Image from 'next/image'

const OurCulture = () => {
  return (
    <section className="">
      <div className="flex flex-col lg:flex-row">
        {/* Left Content */}
        <div className="w-full lg:w-[455px] border-b lg:border-b-0 lg:border-r border-[#CCCCCC]">
          <div className="px-6 py-12 md:px-10 md:py-20">
            <div className="max-w-[375px]">
              <h2 className="text-[32px] md:text-[40px] leading-[120%] mb-6">
                Our Culture
              </h2>

              <div className="space-y-6 text-[16px] md:text-[18px] leading-7">
                <p>
                  At Olio Nexus, we believe great technology comes from people
                  who are trusted to think for themselves, encouraged to solve
                  complex problems, and supported by a culture that values both
                  technical skill and creative freedom.
                </p>

                <p>
                  We work with clients and each other by focusing on ownership,
                  systems thinking, teamwork, and always improving.
                </p>

                <p>
                  As we grow, we remain committed to creating an environment
                  where teams can do their best work and grow together.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <div className="p-4 md:p-10 h-full">
            <div className="relative w-full h-[300px] md:h-[468px] overflow-hidden">
              <Image
                src="/careers/culture.png"
                alt="Our Culture"
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurCulture