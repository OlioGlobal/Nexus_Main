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
  serviceLinks?: Array<{ title: string; slug: string }>
}

const fallbackCards = [
  {
    title: 'NeXus.AI',
    description:
      'Our team creates tailored AI solutions for your operational needs. Starting with business goals, we design, develop, and implement AI into your processes. AI agents handle routine tasks on your systems with no required license fees.',
    tags: [
      'AI Consulting Services',
      'AI Transformation Services',
      'AI Agents / Custom Automation',
      'AI Implementation Services',
    ],
    image: '/ui/solution/nexusai.svg',
    link: '/services#nexus-ai',
  },
  {
    title: 'NeXus.Labs',
    description:
      'We define a clear transformation strategy, redesign workflows with your team, support staff through changes, and coordinate execution, ensuring solutions stay aligned across Build and AI teams.',
    tags: [
      'Technology Transformation Consulting',
      'Process Optimization',
      'Change Management Support',
      'Technology Roadmap Services',
    ],
    image: '/ui/solution/nexus.lavs.svg',
    link: '/services#nexus-labs',
  },
  {
    title: 'NeXus.Build',
    description:
      'Before development, we analyze your business challenge or engagement needs, then develop web or mobile applications with documentation. Deliverables include custom apps, platforms, and systems, delivered in fixed project sprints to minimize ongoing dependence.',
    tags: [
      'Software Product Development',
      'App Development',
      'Website Development Services',
      'UI/UX Consulting Services',
      'Design Consulting Services',
      'Product & MVP Development',
      'Managed IT Services',
      'AMC Services',
      'Resource Augmentation (Staffing) Services',
    ],
    image: '/ui/solution/nexus.build.svg',
    link: '/services#nexus-build',
  },
]

export default function Solutions({ data, serviceLinks }: SolutionsProps) {
  const label = data?.label || '[Solutions]'
  const prefix = data?.headingPrefix || 'The'
  const highlight1 = data?.headingHighlight1 || 'Three'
  const middle = data?.headingMiddle || ''
  const highlight2 = data?.headingHighlight2 || 'Pillars'
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
      : fallbackCards

  // Build a slug lookup from service title → /services/[slug]
  const slugMap: Record<string, string> = {}
  serviceLinks?.forEach(({ title, slug }) => {
    slugMap[title.toLowerCase()] = `/services/${slug}`
  })

  const getTagLink = (tag: string) => slugMap[tag.toLowerCase()] || null

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

              {/* Tags — linked if service slug found */}
              <div className="flex flex-wrap gap-2 mb-8">
                {card.tags.map((tag, j) => {
                  const href = getTagLink(tag)
                  const tagStyle: React.CSSProperties = {
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '100%',
                    color: '#6B6B6B',
                  }
                  return href ? (
                    <a
                      key={j}
                      href={href}
                      className="border border-[#333333] rounded-none px-3 py-1.5 hover:border-[#FF7100] hover:text-[#FF7100] transition-colors"
                      style={tagStyle}
                    >
                      {tag}
                    </a>
                  ) : (
                    <span
                      key={j}
                      className="border border-[#333333] rounded-none px-3 py-1.5"
                      style={tagStyle}
                    >
                      {tag}
                    </span>
                  )
                })}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}
