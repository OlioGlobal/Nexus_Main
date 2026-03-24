interface ManifestoProps {
  data?: {
    label?: string
    text?: string
  }
}

export default function Manifesto({ data }: ManifestoProps) {
  const label = data?.label || '[Our Manifesto]'
  const text =
    data?.text ||
    "There's a gap in the technology industry. Consultants who don't code. Developers who don't strategize. We bridge that gap."

  return (
    <section className="text-center section-spacing  py-20! border-b border-[#CCCCCC] px-4 md:px-8">
      <p className="section-title mb-5">{label}</p>
      <h2 className="max-w-2xl mx-auto">{text}</h2>
    </section>
  )
}
