import React from 'react'

/**
 * Renders one or more JSON-LD nodes in a single <script> tag.
 * `<` is escaped to prevent breaking out of the script context.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
