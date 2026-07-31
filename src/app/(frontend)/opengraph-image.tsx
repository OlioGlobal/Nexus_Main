import { ImageResponse } from 'next/og'

// Default social share image applied to every page in this segment unless a
// page overrides openGraph.images in its own metadata.
export const alt = 'Olio Nexus — IT & Technology Solutions Company'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0A0A0A',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 20, height: 20, borderRadius: 999, background: '#F97316' }} />
          <div style={{ fontSize: 30, letterSpacing: 4, color: '#A3A3A3', textTransform: 'uppercase' }}>
            Olio Nexus
          </div>
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 40, lineHeight: 1.1, maxWidth: 900 }}>
          IT &amp; Technology Solutions Company
        </div>
        <div style={{ fontSize: 32, color: '#D4D4D4', marginTop: 32, maxWidth: 940 }}>
          Software development, AI automation, and digital transformation.
        </div>
      </div>
    ),
    { ...size },
  )
}
