const problems = [
  {
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
        <rect x="8" y="8" width="52" height="52" rx="1" stroke="#E8D5B7" strokeWidth="1.5"/>
        <rect x="18" y="18" width="32" height="32" rx="1" stroke="#E8D5B7" strokeWidth="1"/>
        <path d="M34 34m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" stroke="#FF7100" strokeWidth="1.5" fill="none"/>
        <rect x="56" y="8" width="8" height="8" fill="#FF7100"/>
      </svg>
    ),
    text: 'Generic software fits a standard workflow, not yours, so teams work around it rather than with it.',
  },
  {
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
        <rect x="20" y="20" width="32" height="32" rx="1" stroke="#E8D5B7" strokeWidth="1.5"/>
        <rect x="10" y="10" width="20" height="20" rx="1" stroke="#E8D5B7" strokeWidth="1"/>
        <rect x="8" y="8" width="8" height="8" fill="#FF7100"/>
        <rect x="56" y="44" width="8" height="8" fill="#FF7100"/>
      </svg>
    ),
    text: 'AI deployed without understanding how the industry operates produces tools that the organization paid for and does not use.',
  },
  {
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
        <path d="M16 20H48M16 20V40H32" stroke="#E8D5B7" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M48 20V36H60" stroke="#E8D5B7" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M32 40H52V56" stroke="#E8D5B7" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="52" cy="58" r="4" fill="#FF7100"/>
        <rect x="14" y="18" width="6" height="6" fill="#FF7100"/>
      </svg>
    ),
    text: 'Technology built without workflow-specific logic takes longer to implement, costs more to maintain, and delivers less than the business case projected.',
  },
]

export default function IndustryProblems() {
  return (
    <section className="section-divider border-b border-[#CCCCCC]">
      {/* Heading */}
      <div className="text-center px-4 md:px-8 section-spacing border-b border-[#CCCCCC]">
        <h2 className="max-w-2xl mx-auto mb-4">
          Every Industry Works Differently, but Most Technology Companies Overlook These Differences
        </h2>
        <p className="section-desc max-w-md mx-auto">
          Three problems appear consistently when IT technology solutions are built without industry context
        </p>
      </div>

      {/* Three cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {problems.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col justify-between p-6 md:p-10 min-h-[260px]
              border-b border-[#CCCCCC]
              ${i < 2 ? 'sm:border-r border-[#CCCCCC]' : ''}
              ${i < 2 ? 'sm:border-b-0' : 'border-b-0'}
            `}
          >
            <div className="mb-6">{item.icon}</div>
            <p className="section-desc text-[15px]! md:text-[16px]!">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Bottom banner */}
      <div className="px-4 md:px-8 py-4 bg-[#FEE5CB] border-t border-[#CCCCCC]">
        <p
          className="text-center text-[14px] md:text-[14px] leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          NeXus builds innovative technology solutions around your industry first.{' '}
          <span style={{ color: '#FF7100' }}>
            The technology follows from that, not the other way around.
          </span>
        </p>
      </div>
    </section>
  )
}
