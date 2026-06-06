import Image from 'next/image'
import Link from 'next/link'

interface FooterBottomProps {
  data?: {
    columns?: Array<{
      title?: string
      links?: Array<{
        label?: string
        href?: string
      }>
    }>
  }
}

const fallbackColumns = [
  {
    title: 'Nexus AI',
    links: [
      { label: 'AI Transformation Services', href: '/services/ai-consulting-services' },
      { label: 'AI Consulting Services', href: '/services/ai-transformation-services' },
      { label: 'AI Agents / Custom Automation', href: '/services/ai-agent-development-services' },
      { label: 'AI Implementation Services', href: '/services/ai-implementation-services' },
    ],
  },
  {
    title: 'Nexus Build',
    links: [
      { label: 'Software Product Development', href: '/services/software-development-services' },
      { label: 'App Development', href: '/services/app-development-services' },
      { label: 'Website Development Services', href: '/services/website-development-services' },
      { label: 'UI/UX Consulting Services', href: '/services/ui-ux-consulting-services' },
      { label: 'Design Consulting Services', href: '/services/design-consulting-services' },
      { label: 'Product & MVP Development', href: '/services/product-mvp-development' },
      { label: 'Managed IT Services', href: '/services/managed-it-services' },
      { label: 'AMC Services', href: '/services/amc-services' },
      { label: 'Resource Augmentation (Staffing) Services', href: '/services/resource-augmentation-services' },
    ],
  },
  {
    title: 'Nexus Labs',
    links: [
      { label: 'Technology Transformation Consulting', href: '/services/technology-transformation-consulting' },
      { label: 'Process Optimization', href: '/services/process-optimization' },
      { label: 'Change Management Support', href: '/services/change-management-support' },
      { label: 'Technology Roadmap Services', href: '/services/technology-roadmap-services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Profile', href: '/company' },
      { label: 'Award & Recognition', href: '/awards' },
      { label: 'Why Choose Olio', href: '/why-choose-olio-nexus' },
      { label: 'Careers', href: '/careers' },
      // { label: 'Blogs', href: '/blogs' },
    ],
  },
];

export default function FooterBottom({ data }: FooterBottomProps) {
  const columns = data?.columns && data.columns.length > 0 ? data.columns : fallbackColumns

  return (
    <footer className="bg-[#212121]">
      {/* Links Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[#333333]">
        {columns.map((col, i) => (
          <div
            key={i}
            className={`p-6 md:p-8 border-b md:border-b-0 border-[#333333] ${
              i < columns.length - 1 ? 'border-r' : ''
            }`}
          >
            <h4
              className="mb-4  text-[16px] md:text-[18px]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,

                lineHeight: '24px',
                letterSpacing: '-0.01em',
                color: '#FEF9EF',
              }}
            >
              {col.title}
            </h4>
            <ul className="flex flex-col gap-3">
              {col.links?.map((item, j) => (
                <li key={j}>
                  <Link
                    href={item.href || '#'}
                    className="hover:text-[#FF7100] transition-colors"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      letterSpacing: '-0.01em',
                      color: '#949494',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright + Social Bar */}
      <div className="border-t border-[#333333] px-6 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p
          className="flex items-center gap-2"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '-0.01em',
            color: '#949494',
          }}
        >
          &copy; {new Date().getFullYear()} OLIO NEXUS
          <span className="inline-block w-2 h-2 bg-[#949494]" />
          Visionary Yet Approachable
        </p>
          {/* RIGHT: Legal Links (NEW STRUCTURE) */}
        <div
          className="flex items-center"
          style={{ gap: '20px' }} // required spacing
        >
          <Link
            href="/privacy-policy"
            className="hover:text-[#FEF9EF] transition-colors"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '24px',
              color: '#949494',
              width: 'auto',
              height: '24px',
              opacity: 1,
            }}
          >
            Privacy Policy
          </Link>

          {/* 8x8 rectangle divider */}
          <span
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#949494',
              display: 'inline-block',
              opacity: 1,
            }}
          />

          <Link
            href="/terms"
            className="hover:text-[#FEF9EF] transition-colors"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '24px',
              color: '#949494',
              width: 'auto',
              height: '24px',
              opacity: 1,
            }}
          >
            Terms of Services
          </Link>
        </div>
      </div>

      {/* Big Logo */}
      <div className="border-t border-[#333333] overflow-hidden pt-8 md:pt-12 flex items-center justify-center">
        <Image
          src="/ui/Olio Nexus Logo Footer.svg"
          alt="OlioNexus"
          width={1200}
          height={200}
          className="w-full h-auto max-h-32 md:max-h-48 object-contain opacity-20"
        />
      </div>
    </footer>
  )
}
