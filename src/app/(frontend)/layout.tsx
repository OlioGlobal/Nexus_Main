import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FooterBottom from '@/components/FooterBottom'
import ScrollToTop from '@/components/ScrollToTop'
import './styles.css'

export const metadata = {
  title: 'OlioNexus',
  description: 'We bridge the gap between what\'s possible and what\'s practical.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })
  const [homeData, servicesData, industriesData] = await Promise.all([
    payload.findGlobal({ slug: 'home-page', depth: 2 }) as Promise<any>,
    payload.find({ collection: 'services', where: { status: { equals: 'published' } }, limit: 100, sort: 'order', depth: 0 }),
    payload.find({ collection: 'industry-pages', where: { status: { equals: 'published' } }, limit: 100, depth: 0 }),
  ])

  const navServices = servicesData.docs.map((s: any) => ({
    title: s.title,
    slug: s.slug,
    group: s.group as 'nexus-build' | 'nexus-ai' | 'nexus-labs',
  }))

  const industrySlugMap: Record<string, string> = {}
  for (const ind of industriesData.docs as any[]) {
    if (ind.title && ind.slug) industrySlugMap[ind.title] = ind.slug
  }

  const navIndustries = (homeData?.industries?.items || []).map((item: any) => ({
    ...item,
    slug: industrySlugMap[item.name] || null,
  }))

  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <ScrollToTop />
        <Header industries={navIndustries} services={navServices} />
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
