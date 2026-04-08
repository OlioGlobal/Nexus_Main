const grotesk = { fontFamily: "'Space Grotesk', sans-serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

interface ServiceCtaProps {
  title?: string
  highlight?: string
  titleSuffix?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

export default function ServiceCta({
  title,
  highlight,
  titleSuffix,
  description,
  buttonText,
  buttonLink,
}: ServiceCtaProps) {
  const t = title || 'Get an'
  const h = highlight || 'AI Feasibility'
  const s = titleSuffix || 'Assessment'
  const desc =
    description ||
    'Thought leadership, not content marketing. Deep dives into the intersection of first principles engineering and global business strategy.'
  const btn = buttonText || 'BOOK AN AUDIT'
  const link = buttonLink || '/contact'

  return (
    <div className="bg-[#212121] px-6 md:px-8 py-10 md:py-14 border-b border-[#333333]">
      <h2
        className="mb-4 text-[24px]! leading-[32px]! md:text-[32px]! md:leading-[42px]! font-semibold text-[#FEF9EF]!"
        style={grotesk}
      >
        {t} <span style={{ color: '#E05C00' }}>{h}</span> {s}
      </h2>
      <p
        className="mb-8 max-w-2xl text-[16px]! md:text-[18px]! leading-[20px]! md:text-[14px]! md:leading-[22px]! text-[#999999]!"
        style={inter}
      >
        {desc}
      </p>
      <a href={link} className="btn-primary">
        {btn}
      </a>
    </div>
  )
}
