import CountUp from './CountUp'

interface StatsProps {
  data?: {
    items?: Array<{
      value?: number
      prefix?: string
      suffix?: string
      label?: string
    }>
  }
}

const fallbackStats = [
  { value: 500, prefix: '₹', suffix: ' Cr', label: 'Value Created' },
  { value: 340, prefix: '', suffix: '%', label: 'Average ROI' },
  { value: 73, prefix: '', suffix: '%', label: 'Faster time to market' },
  { value: 100, prefix: '', suffix: '%', label: 'Strategies executed' },
]

export default function Stats({ data }: StatsProps) {
  const items = data?.items && data.items.length > 0 ? data.items : fallbackStats

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 border-b border-[#CCCCCC]">
      {items.map((item, i) => (
        <div
          key={i}
          className={`p-6 md:p-8 text-center border-b md:border-b-0 border-[#CCCCCC] ${
            i < items.length - 1 ? 'border-r' : ''
          }`}
        >
          <span
            className="block mb-1 capitalize text-[#212121] text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              lineHeight: '100%',
              textAlign: 'center',
            }}
          >
            <CountUp
              end={item.value || 0}
              prefix={item.prefix || ''}
              suffix={item.suffix || ''}
            />
          </span>
          <p
            className="text-[16px]! text-[#6B6B6B] text-center"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              lineHeight: '24px',
              letterSpacing: '-0.01em',
            }}
          >
            {item.label}
          </p>
        </div>
      ))}
    </section>
  )
}
