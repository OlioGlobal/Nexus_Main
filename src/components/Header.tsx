'use client'

import type { ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { getMediaUrl } from '@/lib/getMediaUrl'

const grotesk = { fontFamily: "'Space Grotesk', sans-serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

const industryIcons: Record<string, ReactElement> = {
  'Real Estate': (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect x="6" y="22" width="36" height="22" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M2 24L24 6L46 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="18" y="30" width="12" height="14" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Insurance: (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        d="M24 4L8 10V24C8 33 16 40 24 44C32 40 40 33 40 24V10L24 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 24L21 29L32 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  'Banking & Finance': (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect x="4" y="20" width="40" height="4" stroke="currentColor" strokeWidth="2" />
      <rect x="4" y="36" width="40" height="4" stroke="currentColor" strokeWidth="2" />
      <rect x="8" y="24" width="4" height="12" stroke="currentColor" strokeWidth="2" />
      <rect x="22" y="24" width="4" height="12" stroke="currentColor" strokeWidth="2" />
      <rect x="36" y="24" width="4" height="12" stroke="currentColor" strokeWidth="2" />
      <path d="M4 20L24 8L44 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  'Education & EdTech': (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        d="M24 8L44 18L24 28L4 18L24 8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 23V34C12 34 16 40 24 40C32 40 36 34 36 34V23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M44 18V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  'E-commerce & Retail': (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        d="M6 8H10L14 28H38L42 14H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="36" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="34" cy="36" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Healthcare: (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M24 14V34M14 24H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Telecommunications: (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        d="M8 40C8 40 14 28 24 28C34 28 40 40 40 40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M2 32C2 32 10 14 24 14C38 14 46 32 46 32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 46C14 46 18 34 24 34C30 34 34 46 34 46"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="22" r="2" fill="currentColor" />
    </svg>
  ),
  'IT & BPO': (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect x="4" y="8" width="40" height="28" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 40H32M24 36V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M14 20L18 24L14 28M22 28H30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Manufacturing: (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        d="M4 36V20L14 26V20L24 26V20L34 26V20L44 14V36H4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="10" y="28" width="6" height="8" stroke="currentColor" strokeWidth="2" />
      <rect x="22" y="28" width="6" height="8" stroke="currentColor" strokeWidth="2" />
      <rect x="34" y="28" width="6" height="8" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  'Government & Public Sector': (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path d="M4 44H44M4 20H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 8L44 20H4L24 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <rect x="10" y="20" width="6" height="24" stroke="currentColor" strokeWidth="2" />
      <rect x="22" y="20" width="4" height="24" stroke="currentColor" strokeWidth="2" />
      <rect x="32" y="20" width="6" height="24" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Hospitality: (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path d="M4 40H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M8 40V20C8 14 14 10 24 10C34 10 40 14 40 20V40"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M4 20H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="20" y="28" width="8" height="12" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  'Logistics & Transport': (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect x="2" y="16" width="28" height="20" rx="1" stroke="currentColor" strokeWidth="2" />
      <path
        d="M30 24H38L46 32V36H30V24Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="38" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="38" cy="38" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
}

const services = [
  {
    name: 'Nexus.AI',
    description:
      'Custom AI agents handle repetitive tasks and reduce errors - so your team can focus on high-value strategic work.',
    color: '#5B8DEF',
    items: [
      'AI Transformation & Readiness',
      'AI Agents / Custom Automation',
      'AI Implementation & Integration',
      'Voice AI Solutions',
      'Workflow Automation (n8n, Make)',
      'RAG & Knowledge Base Systems',
      'AI Training & Enablement',
    ],
  },
  {
    name: 'Nexus.Build',
    description:
      'From MVPs to full-scale products, we deliver high-quality software solutions with rapid iteration cycles and continuous improvement built in.',
    color: '#A78BFA',
    items: [
      'Website & App Development',
      'UI/UX Consulting',
      'Design Consulting',
      'Product & MVP',
      'Managed Services',
      'AMC',
      'Resource Augmentation (Staffing)',
    ],
  },
  {
    name: 'Nexus.Labs',
    description:
      'Modernize your tech stack seamlessly with phase-wise transformation built for future readiness.',
    color: '#F87171',
    items: [
      'Voice Agents',
      'Integrated HRMS',
      'Untangl - Project Management For Agencies',
      'Agent AI Tools',
      'Lead Pulse (WIP)',
      'SEO Agents (WIP)',
    ],
  },
]

interface IndustryItem {
  name?: string
  description?: string
  icon?: { url?: string; alt?: string; cloudinary?: { secure_url?: string } } | null
}

export default function Header({ industries = [] }: { industries?: IndustryItem[] }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const openDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDropdownOpen(true)
  }

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 100)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-[#CCCCCC] px-[5%]">
        <div className="max-w-[1200px] mx-auto border-x border-[#CCCCCC] px-4 md:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <Image src="/ui/logo.svg" alt="OlioNexus" width={167} height={25} priority />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Solutions with dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button className="nav-link flex items-center gap-1 text-[16px]!">
                Solutions <span className="text-[10px]">&#9662;</span>
              </button>

              {/* Mega dropdown */}
              {dropdownOpen && (
                <div
                  className="fixed inset-0 top-16 z-40 backdrop-blur-sm bg-black/20"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  {/* Dropdown panel */}
                  <div className="absolute left-0 right-0 top-4 px-[5%]">
                    <div className="max-w-[1200px] mx-auto border border-[#CCCCCC] bg-background shadow-sm">
                      {/* Services */}
                      <div className="grid grid-cols-3 border-b border-[#CCCCCC]">
                        {services.map((svc, i) => (
                          <div
                            key={i}
                            className={`group px-8 py-6 hover:bg-[#f9f5ee] transition-colors duration-200 ${i < 2 ? 'border-r border-[#CCCCCC]' : ''}`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: svc.color }}
                              />
                              <span
                                className=" text-[16px]! md:text-[18px]! font-semibold text-[#212121] group-hover:text-[#E05C00] transition-colors"
                                style={grotesk}
                              >
                                {svc.name}
                              </span>
                            </div>
                            <p
                              className="text-[14px]! leading-[18px] text-[#6B6B6B] mb-4"
                              style={inter}
                            >
                              {svc.description}
                            </p>
                            <ul className="space-y-2">
                              {svc.items.map((item, j) => (
                                <li key={j} className="flex items-center gap-2">
                                  <span className="text-[#CCCCCC] text-[12px]! shrink-0">■</span>
                                  <span
                                    className="text-[14px]! leading-[18px] text-[#212121] hover:text-[#E05C00] transition-colors cursor-pointer"
                                    style={inter}
                                  >
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="#" className="nav-link text-[16px]!">
              Company <span className="text-[10px] ml-0.5">&#9662;</span>
            </Link>

            {/* Industries with dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current)
                setIndustriesOpen(true)
              }}
              onMouseLeave={() => {
                timeoutRef.current = setTimeout(() => setIndustriesOpen(false), 100)
              }}
            >
              <button className="nav-link flex items-center gap-1 text-[16px]!">Industries</button>
              {industriesOpen && industries.length > 0 && (
                <div
                  className="fixed inset-0 top-16 z-40 backdrop-blur-sm bg-black/20"
                  onMouseEnter={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current)
                    setIndustriesOpen(true)
                  }}
                  onMouseLeave={() => {
                    timeoutRef.current = setTimeout(() => setIndustriesOpen(false), 100)
                  }}
                >
                  <div className="absolute left-0 right-0 top-4 px-[5%]">
                    <div className="max-w-[1200px] mx-auto border border-[#CCCCCC] bg-background shadow-sm overflow-hidden">
                      <div className="grid grid-cols-4">
                        {industries.map((ind, i) => {
                          const iconUrl = getMediaUrl(ind.icon)
                          const isLastCol = (i + 1) % 4 === 0
                          const totalRows = Math.ceil(industries.length / 4)
                          const isLastRow = i >= (totalRows - 1) * 4
                          return (
                            <div
                              key={i}
                              className={`group flex flex-col items-center justify-center p-5 min-h-48 text-center transition-colors duration-300 hover:bg-[#212121] cursor-default
                                ${!isLastCol ? 'border-r border-[#CCCCCC]' : ''}
                                ${!isLastRow ? 'border-b border-[#CCCCCC]' : ''}
                              `}
                            >
                              {iconUrl ? (
                                <Image
                                  src={iconUrl}
                                  alt={ind.name || ''}
                                  width={40}
                                  height={40}
                                  className="h-9 w-9 object-contain mb-3 transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                                />
                              ) : ind.name && industryIcons[ind.name] ? (
                                <div className="h-9 w-9 mb-3 text-[#212121] transition-colors duration-300 group-hover:text-white!">
                                  {industryIcons[ind.name]}
                                </div>
                              ) : null}
                              <p className="font-['Space_Grotesk'] font-medium text-[13px] leading-[120%] text-[#212121] transition-colors duration-300 group-hover:text-white!">
                                {ind.name}
                              </p>
                              {ind.description && (
                                <p className="font-['Inter'] font-normal text-[13px]! leading-[15px]! text-[#949494] mt-1 max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-16 group-hover:opacity-100 group-hover:text-white!">
                                  {ind.description}
                                </p>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link href="/case-studies" className="nav-link text-[16px]!">
              Case Studies
            </Link>
            <Link href="/blogs" className="nav-link text-[16px]!">
              Blogs
            </Link>
          </nav>

          {/* Desktop CTA */}
          <Link href="/contact" className="btn-primary hidden! md:inline-flex!">
            Start Transformation
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] relative z-[60]"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[2px] bg-[#212121] transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[8px]' : ''}`}
            />
            <span
              className={`block w-6 h-[2px] bg-[#212121] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-6 h-[2px] bg-[#212121] transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-transform duration-300 md:hidden ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ top: '65px' }}
      >
        <div className="flex flex-col h-full px-[5%]">
          <div className="border-x border-[#CCCCCC] flex flex-col h-full">
            <nav className="flex flex-col flex-1">
              {['Solutions', 'Company', 'Industries', 'Case Studies', 'Blogs'].map((item) => (
                <Link
                  key={item}
                  href={
                    item === 'Case Studies' ? '/case-studies' : item === 'Blogs' ? '/blogs' : '#'
                  }
                  className="px-6 py-5 border-b border-[#CCCCCC] hover:text-[#088000] transition-colors"
                  style={{
                    ...grotesk,
                    fontWeight: 500,
                    fontSize: '18px',
                    lineHeight: '100%',
                    color: '#212121',
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
            <div className="px-6 py-6 border-t border-[#CCCCCC]">
              <Link
                href="/contact"
                className="btn-primary w-full flex justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Start Transformation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
