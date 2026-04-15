'use client'

import React, { useEffect, useRef } from 'react'

function Shimmer({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`relative overflow-hidden bg-[#EBEBEB] ${className}`}
      style={{ borderRadius: 2, ...style }}
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

function ScanLine() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
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
      style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.08em', color: '#999' }}
    >
      0%
    </span>
  )
}

export default function ServiceLoading() {
  return (
    <>
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

      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px]" style={{ background: '#F0EBE1' }} aria-hidden>
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
        {/* Hero section */}
        <div className="px-4 md:px-8 py-10 md:py-16 border-b border-[#CCCCCC] space-y-4">
          <Shimmer className="h-[13px] w-20 mb-4" />
          <Shimmer className="h-10 w-[65%]" />
          <Shimmer className="h-10 w-[45%] mb-4" />
          <Shimmer className="h-4 w-[70%]" />
          <Shimmer className="h-4 w-[55%]" />
          <Shimmer className="h-4 w-[40%] mb-6" />
          <Shimmer className="h-10 w-40" style={{ borderRadius: 4 }} />
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-[#CCCCCC]">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`px-4 md:px-8 py-8 space-y-3 ${i < 3 ? 'border-b sm:border-b-0 sm:border-r border-[#CCCCCC]' : ''}`}
            >
              <Shimmer className="h-8 w-8 mb-4" style={{ borderRadius: '50%' }} />
              <Shimmer className="h-5 w-36" />
              <Shimmer className="h-4 w-full" />
              <Shimmer className="h-4 w-5/6" />
            </div>
          ))}
        </div>

        {/* Challenges table */}
        <div className="border-b border-[#CCCCCC] px-4 md:px-8 py-8 space-y-4">
          <Shimmer className="h-6 w-64 mb-6" />
          {[1, 2].map((i) => (
            <div key={i} className="grid grid-cols-2 gap-4">
              <Shimmer className="h-16" />
              <Shimmer className="h-16" />
            </div>
          ))}
        </div>

        {/* Thinking model */}
        <div className="border-b border-[#CCCCCC] px-4 md:px-8 py-10 space-y-6">
          <Shimmer className="h-[11px] w-48 mb-2" />
          <Shimmer className="h-7 w-[50%] mb-2" />
          <Shimmer className="h-4 w-[60%] mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3 p-4 border border-[#EBEBEB]">
                <Shimmer className="h-8 w-8" style={{ borderRadius: '50%' }} />
                <Shimmer className="h-4 w-full" />
                <Shimmer className="h-3 w-5/6" />
                <Shimmer className="h-3 w-4/6" />
              </div>
            ))}
          </div>
        </div>

        {/* Process steps */}
        <div className="border-b border-[#CCCCCC] px-4 md:px-8 py-10 space-y-4">
          <Shimmer className="h-6 w-56 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-2 p-4 border border-[#EBEBEB]">
                <Shimmer className="h-4 w-16 mb-3" />
                <Shimmer className="h-5 w-40" />
                <Shimmer className="h-3 w-full" />
                <Shimmer className="h-3 w-5/6" />
              </div>
            ))}
          </div>
        </div>

        {/* Loading label */}
        <div className="px-4 md:px-8 py-6 flex items-center gap-3">
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
            Loading service
          </span>
          <LoadingCounter />
        </div>
      </article>
    </>
  )
}
