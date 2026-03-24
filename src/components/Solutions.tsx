import Image from 'next/image'

interface SolutionsProps {
  data?: {
    label?: string
    headingPrefix?: string
    headingHighlight1?: string
    headingMiddle?: string
    headingHighlight2?: string
    cards?: Array<{
      title?: string
      description?: string
      icon?: { url?: string; alt?: string } | null
      tags?: Array<{ tag?: string }>
      link?: string
    }>
  }
}

const fallbackCards = [
  {
    title: 'Nexus.AI',
    description:
      'Custom AI agents to handle repetitive tasks, mitigating human errors, so that your team can focus on high-value strategic initiatives.',
    tags: [
      'AI Transformation & Readiness',
      'AI Agents / Custom Automation',
      'AI Implementation & Integration',
      'Voice AI Solutions',
      'Workflow Automation (N8n, Make)',
      'RAG & Knowledge Base Systems',
      'AI Training & Enablement',
    ],
    image: '/ui/solution/nexusai.svg',
  },
  {
    title: 'Nexus.Build',
    description:
      'From MVPs to full-scale products, we deliver high-quality software solutions with rapid iteration cycles and continuous improvement built in.',
    tags: [
      'Website & App Development',
      'Design Consulting',
      'UI/UX Consulting',
      'Product & MVP',
      'Managed Services',
      'AMC',
      'Resource Augmentation (Staffing)',
    ],
    image: '/ui/solution/nexus.build.svg',
  },
  {
    title: 'Nexus.Labs',
    description:
      'Modernize your technology stack without disrupting operations, executing phase-wise transformation for future-readiness.',
    tags: [
      'Voice Agents',
      'Integrated HRMS',
      'Untangl - Project Management For Agencies',
      'Agent AI Tools',
      'Lead Pulse (WIP)',
      'SEO Agents (WIP)',
    ],
    image: '/ui/solution/nexus.lavs.svg',
  },
]

export default function Solutions({ data }: SolutionsProps) {
  const label = data?.label || '[Solutions]'
  const prefix = data?.headingPrefix || 'We bring'
  const highlight1 = data?.headingHighlight1 || 'disruption'
  const middle = data?.headingMiddle || ', We build'
  const highlight2 = data?.headingHighlight2 || 'dominance'
  const cmsCards = data?.cards

  const cards =
    cmsCards && cmsCards.length > 0
      ? cmsCards.map((card) => ({
          title: card.title || '',
          description: card.description || '',
          tags: card.tags?.map((t) => t.tag || '') || [],
          image: card.icon?.url || '',
          link: card.link || '#',
        }))
      : fallbackCards.map((c) => ({ ...c, link: '#' }))

  return (
    <section className="bg-[#212121]">
      {/* Header */}
      <div className="text-center section-spacing border-b border-[#333333]">
        <p className="section-title mb-4">{label}</p>
        <h2 className="text-white! max-w-xl mx-auto text-center">
          {prefix} <span className="text-[#FF7100]">{highlight1}</span>
          {middle} <span className="text-[#FF7100]">{highlight2}</span>
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`flex flex-col justify-between p-6 md:p-8 border-b md:border-b-0 border-[#333333] ${
              i < cards.length - 1 ? 'md:border-r' : ''
            }`}
          >
            <div>
              {/* Image */}
              {card.image && (
                <div className="flex justify-start mb-4">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={120}
                    height={80}
                    className="h-20 w-auto object-contain"
                  />
                </div>
              )}

              {/* Card Title */}
              <h3 className="text-white! mb-4">{card.title}</h3>

              {/* Description */}
              <p className="mb-6 text-[16px]!">{card.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {card.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="border border-[#333333] rounded-none px-3 py-1.5"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '100%',
                      textTransform: 'capitalize',
                      color: '#6B6B6B',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Learn More */}
            <a href={card.link} className="link-learn-more text-[16px]! text-white self-start mb-4">
              Learn More
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
