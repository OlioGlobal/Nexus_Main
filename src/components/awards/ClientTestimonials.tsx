const testimonials = [
  {
    type: 'photo',
    image: '/awards/testimonials/client-1.png',
    name: 'John Doe',
    title: 'CEO, Java Paper Group',
  },
  {
    type: 'quote',
    quote:
      'Working with this team was a seamless experience. They understood our requirements quickly and delivered a scalable, high-performance solution ahead of schedule. The attention to detail and technical expertise truly set them apart.',
    name: 'Jane Cooper',
    title: 'CEO, Java Paper Group',
  },
  {
    type: 'photo',
    image: '/awards/testimonials/client-2.png',
    name: 'John Doe',
    title: 'CEO, Java Paper Group',
  },
]

export default function ClientTestimonials() {
  return (
    <section className="section-divider">
      {/* Header */}
      <div className="px-4 md:px-8 section-spacing border-b border-[#CCCCCC] text-center">
        <h2 className="h2 mb-3 max-w-md mx-auto">What Clients Have Said About Our Work</h2>
        <p className="section-desc max-w-sm mx-auto">
          They are descriptions of decisions we made with the clients, the technological
          implementation, and the outcomes, all in the clients&apos; own words.
        </p>
      </div>

      {/* Testimonials grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {testimonials.map((item, i) => (
          <div
            key={i}
            className={`relative overflow-hidden min-h-[340px] md:min-h-[420px]
              ${i < 2 ? 'border-r border-[#CCCCCC]' : ''}
              border-b sm:border-b-0 border-[#CCCCCC]
            `}
          >
            {item.type === 'photo' ? (
              <>
                {/* Photo card */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Name + title */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="font-['Space_Grotesk'] font-medium text-[16px] text-white leading-tight">
                    {item.name}
                  </p>
                  <p className="font-['Inter'] text-[13px] text-white/70 mt-0.5">{item.title}</p>
                </div>
              </>
            ) : (
              <>
                {/* Quote card */}
                <div className="h-full bg-[#212121] flex flex-col justify-between p-6 md:p-8 min-h-[340px] md:min-h-[420px]">
                  <div>
                    {/* Quote mark */}
                    <span className="font-['Space_Grotesk'] text-[48px] text-white leading-none mb-4 block">&ldquo;</span>
                    <p
                      className="text-white/80 text-[14px] md:text-[15px] leading-6 md:leading-7"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.quote}
                    </p>
                  </div>
                  <div className="mt-6">
                    <p className="font-['Space_Grotesk'] font-medium text-[15px] text-white leading-tight">
                      {item.name}
                    </p>
                    <p className="font-['Inter'] text-[13px] text-white/50 mt-0.5">{item.title}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
