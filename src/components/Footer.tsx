'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FooterProps {
  data?: {
    tagline?: string
    newsletterHeading?: string
  }
}

export default function Footer({ data }: FooterProps) {
  const tagline =
    data?.tagline ||
    "Bridging the gap between what's possible and what's practical through first-principles engineering."
  const newsletterHeading = data?.newsletterHeading || 'Get the latest insights from OlioNexus'

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer className="bg-[#212121] border-t border-[#333333]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 px-4 md:px-8 py-8 md:py-12">
        {/* Left — Tagline */}
        <div className="max-w-sm text-center md:text-left">
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '-0.01em',
            color: '#949494',
          }}
        >
          {tagline}
        </p>

         {/* Social Icons BELOW tagline */}
          <div className="flex items-center gap-4 mt-5 justify-center md:justify-start">
          <Link
            href="https://x.com/OlioNexus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#949494] hover:text-[#FEF9EF] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>
          <Link
            href="https://www.instagram.com/olionexusofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#949494] hover:text-[#FEF9EF] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </Link>
          <Link
            href="https://www.facebook.com/share/1Ye3SmHphv/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#949494] hover:text-[#FEF9EF] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24H12.82v-9.294H9.692V11.01h3.128V8.205c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.696h-3.12V24h6.116C23.407 24 24 23.407 24 22.676V1.324C24 .593 23.407 0 22.676 0z" />
            </svg>
          </Link>
          <Link
            href="https://www.youtube.com/@Olio_Nexus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#949494] hover:text-[#FEF9EF] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a2.998 2.998 0 00-2.111-2.115C19.355 3.5 12 3.5 12 3.5s-7.355 0-9.387.571A2.998 2.998 0 00.502 6.186 31.052 31.052 0 000 12a31.052 31.052 0 00.502 5.814 2.998 2.998 0 002.111 2.115C4.645 20.5 12 20.5 12 20.5s7.355 0 9.387-.571a2.998 2.998 0 002.111-2.115A31.052 31.052 0 0024 12a31.052 31.052 0 00-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
            </svg>
          </Link>
          <Link
            href="https://www.linkedin.com/company/olio-nexus/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#949494] hover:text-[#FEF9EF] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </Link>
          </div>
        </div>
         
        {/* Right — Newsletter */}
        <div className="w-full md:max-w-sm">
          <p
            className="mb-3"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '-0.01em',
              color: '#FEF9EF',
            }}
          >
            {newsletterHeading}
          </p>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
              className="flex-1 min-w-0 bg-transparent border border-[#333333] px-4 py-3 text-[14px] text-[#FEF9EF] placeholder-[#666666] outline-none focus:border-[#FF7100] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="border border-[#333333] border-l-0 uppercase tracking-[0.03em] text-[14px] text-[#212121] hover:opacity-90 transition-opacity"
              style={{
                fontFamily: "'Space Mono', monospace",
                background: '#FEF9EF',
                width: '73px',
                height: '48px',
                padding: '8px 16px',
                gap: '10px',
              }}
            >
              {status === 'loading' ? '...' : 'Join'}
            </button>
          </form>
          {status === 'success' && (
            <p
              className="text-[#088000] text-[12px] mt-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Thanks for subscribing!
            </p>
          )}
          {status === 'error' && (
            <p
              className="text-[#DC2626] text-[12px] mt-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Something went wrong. Try again.
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
