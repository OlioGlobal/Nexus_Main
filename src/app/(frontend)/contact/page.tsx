import Divider from '@/components/Divider'
import ContactForm from '@/components/ContactForm'
import JsonLd from '@/components/JsonLd'
import { contactPageSchema, contactPointSchema, breadcrumbSchema } from '@/lib/schema'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Contact Olio Nexus | Get in Touch with Our Team',
  description:
    'Contact Olio Nexus to discuss your technology solutions needs, book a free digital consultation, or learn more about our AI consulting services and IT transformation offerings.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <main>
      <JsonLd
        data={[
          contactPageSchema('/contact', "Let's build the future, practically."),
          contactPointSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />
      {/* Header */}
      <div className="text-center section-spacing border-b border-[#CCCCCC] px-4 md:px-8">
        <h1 className="mb-4">Let&apos;s build the future, practically.</h1>
        <p className="section-desc max-w-md mx-auto text-center">
          We specialize in complex enterprise transformations where failure is not an option.
        </p>
      </div>

      <Divider />

      {/* Contact Section */}
      <ContactForm />
    </main>
  )
}
