'use client'

import { useState } from 'react'

const storyServices = [
  {
    title: 'NeXus AI',
    description: 'Delivers and integrates AI solutions that enhance your business capabilities.',
  },
  {
    title: 'NeXus Labs',
    description: 'R&D-based transformation projects — defining strategy, redesigning workflows.',
  },
  {
    title: 'NeXus Build',
    description: 'Technology development projects that demand speed and high performance.',
  },
]

export default function OurStory() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 section-divider">
      {/* Left — Story Text (scrollable) */}
      <div className="section-spacing px-4 md:px-8 flex flex-col justify-start">
        <h2 className="h2 mb-6">Our Story</h2>
        <p className="mb-4">
          We found NeXus with one goal: to become the one-stop solution for all challenges an
          enterprise faces and aspirations they have.
        </p>
        <p className="mb-4">
          There is an ongoing pattern in technology services: one firm delivers a roadmap,
          another delivers software, and a third trains. Three vendors, three handoffs, one
          unsatisfactory outcome.
        </p>
        <p className="mb-4">
          Therefore, we built NeXus to close those gaps by connecting the essential capabilities,
          keeping strategy honest, building groundedness, and driving technological transformation.
        </p>

        {/* Expanded content */}
        {expanded && (
          <>
            <p className="mb-4">
              Today, NeXus operates through three pillars, serving 13 industries globally, with
              primary markets in India, the UAE, Germany, and Australia.
            </p>
            <p className="mb-4">
              NeXus AI delivers and integrates AI solutions that enhance your business capabilities.
              NeXus Labs handles R&D-based transformation projects. NeXus Build handles technology
              development projects that demand speed and high performance.
            </p>
            <p className="mb-4">
              Each capability meets distinct needs, but together they resolve key business challenges
              and enable new opportunities. The strategies from Labs inform the Build. The Build
              integrates AI into the business, from backend to frontend, expanding human capabilities.
            </p>
            <p className="mb-4">
              Everyone involved — from analysts to designers and coders — collaborates under a
              product manager. This ensures a solution tailored to your business&apos;s data,
              requirements, and long-term needs.
            </p>
            <p className="mb-4">
              We work with businesses outgrowing their technology, leaders who need usable AI, and
              organizations whose tech investments failed due to poor execution.
            </p>
          </>
        )}

        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="link-learn-more text-[#212121] self-start mt-4 bg-transparent border-none cursor-pointer"
        >
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      </div>

      {/* Right — Service Summary Cards (sticky) */}
      <div className="p-4 md:p-8 flex flex-col gap-4 self-start sticky top-20">
        {storyServices.map((service) => (
          <div key={service.title} className="border border-[#CCCCCC] p-5 md:p-6">
            <h3 className="mb-2">{service.title}</h3>
            <p className="section-desc">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
