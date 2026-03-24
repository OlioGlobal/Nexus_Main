'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
}

export default function CountUp({ end, prefix = '', suffix = '', duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    const steps = 60
    const increment = end / steps
    const interval = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [started, end, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}
