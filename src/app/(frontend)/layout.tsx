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
  const [homeData, servicesData] = await Promise.all([
    payload.findGlobal({ slug: 'home-page', depth: 2 }) as Promise<any>,
    payload.find({ collection: 'services', where: { status: { equals: 'published' } }, limit: 100, sort: 'order', depth: 0 }),
  ])

  const navServices = servicesData.docs.map((s: any) => ({
    title: s.title,
    slug: s.slug,
    group: s.group as 'nexus-build' | 'nexus-ai' | 'nexus-labs',
  }))

  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Header industries={homeData?.industries?.items || []} services={navServices} />
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
