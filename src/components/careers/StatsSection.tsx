const stats = [
  { value: '20+', label: 'Team Members' },
  { value: '13+', label: 'Industries Served' },
  { value: '5+', label: 'Global Markets' },
  { value: '100+', label: 'Products & Platforms Built' },
  { value: '50+', label: 'Organizations Transformed' },
]

export default function StatsSection() {
  return (
    <section className="flex flex-col md:flex-row bg-[#FEF9EF] border-t border-l">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`
            flex-1 flex flex-col items-center justify-center px-5 py-10 min-h-[169px]

            /* mobile: horizontal separators */
            ${index !== stats.length - 1 ? 'border-b border-[#CCCCCC]' : ''}

            /* desktop: vertical separators */
            md:border-b-0 md:border-r
          `}
        >
          <h2 className="text-center">{stat.value}</h2>

          <p className="mt-1 text-center">{stat.label}</p>
        </div>
      ))}
    </section>
  )
}