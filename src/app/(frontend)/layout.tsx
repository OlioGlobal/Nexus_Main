import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FooterBottom from '@/components/FooterBottom'
import './styles.css'

export const metadata = {
  title: 'OlioNexus',
  description: 'We bridge the gap between what\'s possible and what\'s practical.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })
  const homeData = (await payload.findGlobal({ slug: 'home-page', depth: 2 })) as any

  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Header industries={homeData?.industries?.items || []} />
        <div className="section-outer">
          <div className="container-bordered">
            {children}
            <Footer data={homeData.footer} />
            <FooterBottom data={homeData.footerLinks} />
          </div>
        </div>
      </body>
    </html>
  )
}
