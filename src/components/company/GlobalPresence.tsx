const locations = ['India', 'UAE', 'Germany', 'Australia']

export default function GlobalPresence() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 section-divider">
      {/* Left — Text */}
      <div className="section-spacing px-4 md:px-8 flex flex-col justify-center">
        <h2 className="h2 mb-6">Global Presence</h2>
        <p className="mb-4">
          NeXus&apos;s primary markets are India and the UAE. We serve clients globally through
          remote delivery, documented processes, async communication, and overlapping work hours.
        </p>
        <p className="mb-8">
          We do not equate global delivery with physical offices. Our model is designed for
          effective remote delivery.
        </p>

        {/* Location badges */}
        <div className="flex flex-wrap gap-2">
          {locations.map((loc) => (
            <span
              key={loc}
              className="border border-[#CCCCCC] px-3 py-1.5 text-[14px] md:text-[15px] leading-none"
              style={{ fontFamily: "'Inter', sans-serif", color: '#6B6B6B' }}
            >
              {loc}
            </span>
          ))}
        </div>
      </div>

      {/* Right — Globe */}
      <div className="flex items-center justify-center p-8 md:p-12 border-t md:border-t-0 border-[#CCCCCC]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/company-profile/globe.svg"
          alt="Global presence map"
          className="w-full max-w-md h-auto"
        />
      </div>
    </section>
  )
}
