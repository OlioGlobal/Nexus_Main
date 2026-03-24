import Image from 'next/image'
import { getMediaUrl } from '@/lib/getMediaUrl'

interface ProcessProps {
  data?: {
    label?: string
    headingLine1?: string
    headingLine2?: string
    steps?: Array<{
      title?: string
      description?: string
      icon?: { url?: string; alt?: string } | null
    }>
  }
}

const fallbackSteps = [
  {
    title: 'Understanding Requirements',
    description: 'We understand what your goals and needs are!',
  },
  {
    title: 'Strategy & Design',
    description: 'We come up with a roadmap and a design sprint for a solution.',
  },
  {
    title: 'Development',
    description: 'We develop a solution and integrate it into your system',
  },
  {
    title: 'Evolution & Support',
    description:
      'We manage the scale, capacity, and capabilities of the solution as the needs evolve.',
  },
]

export default function Process({ data }: ProcessProps) {
  const label = data?.label || '[Process]'
  const line1 = data?.headingLine1 || "We don't just consult."
  const line2 = data?.headingLine2 || 'We create. We strategize.'
  const cmsSteps = data?.steps

  const steps =
    cmsSteps && cmsSteps.length > 0 ? cmsSteps : fallbackSteps.map((s) => ({ ...s, icon: null }))

  return (
    <section>
      {/* Header */}
      <div className="text-center section-spacing border-b border-[#CCCCCC]">
        <p className="section-title mb-4">{label}</p>
        <h2 className="max-w-xl mx-auto text-center">
          {line1}
          <br />
          <span className="text-[#FF7100]">{line2}</span>
        </h2>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`flex flex-col justify-between p-6 md:p-8 md:py-14 border-b sm:border-b-0 border-[#CCCCCC] ${
              i < steps.length - 1 ? 'sm:border-r' : ''
            }`}
          >
            {/* Icon */}
            <div className="mb-6 h-24 flex items-center justify-center">
              {getMediaUrl(step.icon) ? (
                <Image
                  src={getMediaUrl(step.icon)}
                  alt={step.icon?.alt || step.title || ''}
                  width={140}
                  height={96}
                  className="h-44 w-auto object-contain"
                />
              ) : (
                <div className="h-20 w-full border border-[#CCCCCC] rounded-md flex items-center justify-center">
                  <span className="text-[#CCCCCC] text-3xl">&#9671;</span>
                </div>
              )}
            </div>

            {/* Title & Description pushed to bottom */}
            <div className="mt-auto">
              <h3 className="mb-2">{step.title}</h3>
              <p className="text-[16px]!">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
