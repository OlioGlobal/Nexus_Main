'use client'

import { useState } from 'react'

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
        <p
          className="max-w-sm text-center md:text-left"
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
