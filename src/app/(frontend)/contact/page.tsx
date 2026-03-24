import Divider from '@/components/Divider'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact Us | OlioNexus',
  description: "Let's build the future, practically.",
}

export default function ContactPage() {
  return (
    <main>
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
