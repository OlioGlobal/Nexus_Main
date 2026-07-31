import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { notFoundSchema } from '@/lib/schema'

export const metadata = {
  title: 'Page Not Found | Olio Nexus',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="section-spacing px-4 md:px-8 text-center">
      <JsonLd data={notFoundSchema()} />
      <p className="section-title mb-4">[404]</p>
      <h1>Page not found</h1>
      <p className="section-desc mt-3 max-w-lg mx-auto">
        The page you are looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="inline-block mt-6 underline">
        Back to home
      </Link>
    </main>
  )
}
