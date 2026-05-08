'use client'

import { useState, useRef, useEffect } from 'react'

interface ReadMoreTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export default function ReadMoreText({ text, className = '', style }: ReadMoreTextProps) {
  const [expanded, setExpanded] = useState(false)
  const [isClamped, setIsClamped] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (el) setIsClamped(el.scrollHeight > el.clientHeight)
  }, [text])

  return (
    <span className="block">
      <p
        ref={ref}
        className={`${className} overflow-hidden`}
        style={{
          ...style,
          marginBottom: 0,
          ...(expanded
            ? {}
            : { display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }),
        }}
      >
        {text}
      </p>
      {(isClamped || expanded) && (
        <span
          role="button"
          onClick={() => setExpanded(!expanded)}
          className="text-[13px] font-medium cursor-pointer"
          style={{ fontFamily: "'Inter', sans-serif", color: '#FF7100' }}
        >
          {expanded ? 'Read Less' : 'Read More'}
        </span>
      )}
    </span>
  )
}
