'use client'

import { useEffect, useRef } from 'react'

/* ─── shimmer bar that sweeps left→right ─── */
function Shimmer({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-[#EBEBEB] ${className}`}
      style={{ borderRadius: 2 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'nexus-shimmer 1.6s ease-in-out infinite',
        }}
      />
    </div>
  )
}

/* ─── vertical scan line that crosses the whole page ─── */
function ScanLine() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '60%',
          height: '100%',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
          animation: 'nexus-scan 2.2s ease-in-out infinite',
        }}
      />
    </div>
  )
}

/* ─── counter that ticks up while loading ─── */
function LoadingCounter() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let n = 0
    const id = setInterval(() => {
      n = Math.min(n + Math.floor(Math.random() * 12) + 3, 94)
      if (ref.current) ref.current.textContent = `${n}%`
    }, 180)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      ref={ref}
      className="tabular-nums"
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 11,
        letterSpacing: '0.08em',
        color: '#999',
      }}
    >
      0%
    </span>
  )
}

export default function CaseStudyLoading() {
  return (
    <>
      {/* keyframes injected once */}
      <style>{`
        @keyframes nexus-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes nexus-scan {
          0%   { left: -60%; }
          100% { left: 160%; }
        }
        @keyframes nexus-bar {
          0%   { width: 0%; opacity: 1; }
          65%  { width: 88%; opacity: 1; }
          100% { width: 88%; opacity: 1; }
        }
      `}</style>

      {/* ── top progress bar ── */}
      <div
        className="fixed top-0 left-0 right-0 z-9999 h-[2px]"
        style={{ background: '#F0EBE1' }}
        aria-hidden
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #212121 0%, #555 100%)',
            animation: 'nexus-bar 3s cubic-bezier(0.4,0,0.2,1) forwards',
          }}
        />
      </div>

      <ScanLine />

      <article>

        {/* ── Hero image ── */}
        <div className="border-b border-[#CCCCCC] px-3 sm:px-4 md:px-8 py-4 sm:py-6 md:py-8">
          <Shimmer className="w-full aspect-video" />
        </div>

        {/* ── Title + tagline ── */}
        <div className="px-3 sm:px-4 md:px-8 py-6 sm:py-8 md:py-12 border-b border-[#CCCCCC]">
          {/* label tag */}
          <Shimmer className="h-[13px] w-24 mb-5" />
          {/* h1 */}
          <Shimmer className="h-9 w-[68%] mb-3" />
          <Shimmer className="h-9 w-[42%] mb-5" />
          {/* tagline */}
          <Shimmer className="h-4 w-[55%] mb-2" />
          <Shimmer className="h-4 w-[40%]" />
        </div>

        {/* ── Info grid: Client | Industry | Description ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-b border-[#CCCCCC]">
          {/* Client */}
          <div className="px-3 sm:px-4 md:px-8 py-5 md:py-8 border-b border-[#CCCCCC] sm:border-r md:border-b-0 space-y-3">
            <Shimmer className="h-[13px] w-14" />
            <Shimmer className="h-5 w-32 mb-1" />
            <Shimmer className="h-4 w-48" />
          </div>
          {/* Industry */}
          <div className="px-3 sm:px-4 md:px-8 py-5 md:py-8 border-b border-[#CCCCCC] md:border-r md:border-b-0 space-y-3">
            <Shimmer className="h-[13px] w-16" />
            <Shimmer className="h-5 w-36" />
          </div>
          {/* Description */}
          <div className="px-3 sm:px-4 md:px-8 py-5 md:py-8 sm:col-span-2 md:col-span-1 space-y-2">
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-5/6" />
            <Shimmer className="h-4 w-4/6" />
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-[#CCCCCC] my-0" />

        {/* ── Challenge ── */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] border-b border-[#CCCCCC]">
          <div className="px-3 sm:px-4 md:px-8 pt-5 pb-1 md:py-10 md:border-r border-[#CCCCCC]">
            <Shimmer className="h-5 w-24" />
          </div>
          <div className="px-3 sm:px-4 md:px-8 pb-6 pt-2 md:py-10 space-y-2">
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-[90%]" />
            <Shimmer className="h-4 w-[80%]" />
            <Shimmer className="h-4 w-[65%]" />
          </div>
        </div>

        {/* ── Solutions ── */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] border-b border-[#CCCCCC]">
          <div className="px-3 sm:px-4 md:px-8 pt-5 pb-1 md:py-10 md:border-r border-[#CCCCCC]">
            <Shimmer className="h-5 w-24" />
          </div>
          <div className="px-3 sm:px-4 md:px-8 pb-6 pt-2 md:py-10 space-y-3">
            {[1, 0.9, 0.95, 0.75].map((w, i) => (
              <div key={i} className="flex items-start gap-3">
                <Shimmer className="h-4 w-4 mt-0.5 shrink-0" style={{ borderRadius: '50%' } as any} />
                <Shimmer className="h-4 flex-1" style={{ width: `${w * 100}%` } as any} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Screenshots placeholder ── */}
        <div className="border-b border-[#CCCCCC] p-4 md:p-8 space-y-4">
          <Shimmer className="w-full aspect-video" />
          <Shimmer className="w-full aspect-video" />
        </div>

        {/* ── Impact ── */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] border-b border-[#CCCCCC]">
          <div className="px-3 sm:px-4 md:px-8 pt-5 pb-1 md:py-10 md:border-r border-[#CCCCCC]">
            <Shimmer className="h-5 w-20" />
          </div>
          <div className="px-3 sm:px-4 md:px-8 pb-6 pt-2 md:py-10 space-y-3">
            {[0.9, 0.75, 0.85].map((w, i) => (
              <div key={i} className="flex items-start gap-3">
                <Shimmer className="h-4 w-4 mt-0.5 shrink-0" style={{ borderRadius: '50%' } as any} />
                <Shimmer className="h-4 flex-1" style={{ width: `${w * 100}%` } as any} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Loading label ── */}
        <div className="px-3 sm:px-4 md:px-8 py-6 flex items-center gap-3">
          {/* pulsing dot */}
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-[#212121]"
            style={{ animation: 'pulse 1s ease-in-out infinite' }}
          />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.08em',
              color: '#999',
              textTransform: 'uppercase',
            }}
          >
            Loading case study
          </span>
          <LoadingCounter />
        </div>

      </article>
    </>
  )
}
