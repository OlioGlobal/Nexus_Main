'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Play } from 'lucide-react'
import { getMediaUrl } from '@/lib/getMediaUrl'

interface VideoSectionProps {
  data?: {
    enabled?: boolean
    label?: string
    heading?: string
    description?: string
    video?: { url?: string; mimeType?: string } | null
    poster?: { url?: string; alt?: string } | null
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
  }
}

export default function VideoSection({ data }: VideoSectionProps) {
  const [playing, setPlaying] = useState(false)

  // Hidden when disabled or when no video has been configured in Payload
  if (data?.enabled === false) return null

  const videoUrl = getMediaUrl(data?.video)
  if (!videoUrl) return null

  const posterUrl = getMediaUrl(data?.poster)
  const label = data?.label
  const heading = data?.heading
  const description = data?.description
  const loop = data?.loop ?? true

  return (
    <section className="section-divider">
      <div className="px-2 py-12 sm:px-4 md:py-20">
        {(label || heading || description) && (
          <div className="mb-8 text-center md:mb-10">
            {label && <p className="section-title mb-4">{label}</p>}
            {heading && <h2 className="mb-4">{heading}</h2>}
            {description && <p className="mx-auto max-w-2xl">{description}</p>}
          </div>
        )}

        <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-lg border border-[#CCCCCC] bg-black">
          {playing ? (
            // The <video> only mounts — and only then downloads the file — after the
            // user clicks play. This keeps the initial page load light and fast.
            <video
              className="h-full w-full object-cover"
              src={videoUrl}
              poster={posterUrl || undefined}
              autoPlay
              loop={loop}
              controls
              playsInline
              preload="auto"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play video"
              className="group absolute inset-0 h-full w-full"
            >
              {/* Poster is an optimized image (next/image), not the video file */}
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={data?.poster?.alt || heading || 'Video preview'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
              ) : (
                <span className="absolute inset-0 bg-[#111111]" />
              )}

              {/* Subtle dim overlay */}
              <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />

              {/* Minimal play button — thin ring, translucent fill */}
              <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-white/20 md:h-16 md:w-16">
                <Play className="ml-0.5 h-6 w-6 text-white" fill="white" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
