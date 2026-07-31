import Image from 'next/image'

const steps = [
  {
    icon: '/industries/industry-first/Border.svg',
    title: '1. Industry Audit',
    description: 'We assess your current technology estate, the workflows running on it, the constraints your industry imposes, and the gaps between what the technology does today and what the business needs it to do.',
  },
  {
    icon: '/industries/industry-first/Border-1.svg',
    title: '2. Workflow Mapping',
    description: 'We map how work actually flows. Every handoff, every decision point, and every workaround that has accumulated because the current technology does not support the real process.',
  },
  {
    icon: '/industries/industry-first/Border-2.svg',
    title: '3. Technology Stack Design',
    description: 'We design the architecture around the workflow, the compliance requirements, and the team that will manage what gets built. The stack follows the requirement, not the other way around.',
  },
  {
    icon: '/industries/industry-first/Border-3.svg',
    title: '4. AI & Automation Integration',
    description: 'Where AI and automation belong in the workflow, we build them in, trained on your data, deployed on your infrastructure, and designed to support the decisions your industry requires.',
  },
  {
    icon: '/industries/industry-first/Border-4.svg',
    title: '5. Deployment & Optimization',
    description: 'We deploy against real operational conditions, track performance after launch, and stay engaged until the technology performs against the metrics it was built to move, not just until it goes live.',
  },
]

export default function IndustryFirstApproach() {
  return (
    <section className="section-divider">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">

        {/* Left — sticky heading */}
        <div className="border-b md:border-b-0 md:border-r border-[#CCCCCC] p-6 md:p-10">
          <div className="sticky top-20">
            <h2 className="h2 mb-3">Our Industry-First Approach</h2>
            <p className="section-desc text-[15px]! md:text-[16px]!">
              Every engagement follows the same five steps. What changes is what we find at each one.
            </p>
          </div>
        </div>

        {/* Right — scrollable steps */}
        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex flex-col p-6 md:p-10 border-b border-[#CCCCCC] ${i === steps.length - 1 ? 'border-b-0' : ''}`}
            >
              <Image src={step.icon} alt={step.title} width={48} height={48} className="w-10 h-10 md:w-20 md:h-20 object-contain mb-4" />
              <h3 className="text-[18px]! md:text-[24px]! mb-2">{step.title}</h3>
              <p className="section-desc text-[15px]! md:text-[16px]!">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
