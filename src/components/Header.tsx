'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

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
            <Link href="#" className="nav-link">
              Solutions <span className="text-[10px] ml-0.5">&#9662;</span>
            </Link>
            <Link href="#" className="nav-link">
              Company <span className="text-[10px] ml-0.5">&#9662;</span>
            </Link>
            <Link href="#" className="nav-link">Industries</Link>
            <Link href="#" className="nav-link">Case Studies</Link>
            <Link href="#" className="nav-link">Blogs</Link>
          </nav>

          {/* Desktop CTA */}
          <Link href="#" className="btn-primary hidden! md:inline-flex!">
            Start Transformation
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] relative z-[60]"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[2px] bg-[#212121] transition-all duration-300 origin-center ${
                open ? 'rotate-45 translate-y-[8px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-[#212121] transition-all duration-300 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-[#212121] transition-all duration-300 origin-center ${
                open ? '-rotate-45 -translate-y-[8px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-transform duration-300 md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '65px' }}
      >
        <div className="flex flex-col h-full px-[5%]">
          <div className="border-x border-[#CCCCCC] flex flex-col h-full">
            <nav className="flex flex-col flex-1">
              {['Solutions', 'Company', 'Industries', 'Case Studies', 'Blogs'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="px-6 py-5 border-b border-[#CCCCCC] hover:text-[#088000] transition-colors"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: '18px',
                    lineHeight: '100%',
                    color: '#212121',
                  }}
                  onClick={() => setOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="px-6 py-6 border-t border-[#CCCCCC]">
              <Link
                href="#"
                className="btn-primary w-full flex justify-center"
                onClick={() => setOpen(false)}
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
