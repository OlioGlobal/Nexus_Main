'use client'



const sectionKeys = [
  's1',
  's2',
  's3',
  's4',
  's5',
  's6',
  's7',
  's8',
  's9',
  's10',
] as const

const privacyContent = {
  sectionLabel: '[Legal]',
  privacyTitle: 'Terms of Service',
  lastUpdated: 'Last updated: March 27, 2026',
  onThisPage: 'On this page',
  terms: {
    s1: {
      title: '1. Agreement',
      p1: 'By accessing and using this website (olionexus.com), you agree to be bound by these Terms of Service.',
      p2: 'This website is operated by Olio Global AdTech, with its registered office at 406 Rajgor Empire Building, Khot Lane, Kapol Wadi, Ghatkopar West, Mumbai, Maharashtra 400086.',
    },

    s2: {
      title: '2. Services',
      p1: 'OlioNexus provides custom software development, web and mobile application development, and digital product engineering services.',
      p2: 'By submitting a contact form, you are expressing interest in our services. Submission does not constitute a binding agreement or contract for services.',
    },

    s3: {
      title: '3. Intellectual Property',
      p1: 'All content on this website is the property of Olio Global AdTech and is protected by intellectual property laws.',
      p2: 'You may not reproduce, distribute, modify, or create derivative works from any content on this website without prior written consent.',
    },

    s4: {
      title: '4. User Submissions',
      p1: 'When you submit information through our contact form, you confirm that:',
      list: [
        'The information you provide is accurate and truthful',
        'You have the authority to share the information provided',
        'Your submission does not violate any applicable laws',
      ],
    },

    s5: {
      title: '5. Disclaimer',
      p1: 'This website and its content are provided "as is" without warranties of any kind.',
      p2: 'Case studies and testimonials reflect specific client outcomes and are not guarantees of future results.',
    },

    s6: {
      title: '6. Limitation of Liability',
      p1: 'Olio Global AdTech shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website.',
    },

    s7: {
      title: '7. Third-Party Links',
      p1: 'This website may contain links to third-party websites. We are not responsible for their content or privacy practices.',
    },

    s8: {
      title: '8. Governing Law',
      p1: 'These terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.',
      p2: 'For users in the UAE, relevant provisions of UAE federal law may also apply.',
    },

    s9: {
      title: '9. Changes to Terms',
      p1: 'We reserve the right to update these terms at any time. Continued use of the website after changes constitutes acceptance.',
    },

    s10: {
      title: '10. Contact',
      p1: 'For questions about these terms, contact us at:',
      email: 'siddhesh@olioglobaladtech.com',
      phone: '+91 9930 999 834',
    },
  },
} as const

export default function TermsOfService() {
  const handleSidebarClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault()

    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.pushState(null, '', `#${sectionId}`)
    }
  }

  return (
    <section className="section-outer">
      <div className="container-bordered">
        {/* Hero */}
        <div className="section-header px-4 md:px-8 lg:px-12">
          <p className="section-title text-left mb-4">
            {privacyContent.sectionLabel}
          </p>

          <h1 className="mb-3">
            {privacyContent.privacyTitle}
          </h1>

          <p className="text-muted-foreground">
            {privacyContent.lastUpdated}
          </p>
        </div>

        {/* Content Area */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="hidden md:block md:w-[260px] lg:w-[300px] shrink-0 border-r border-border py-8 px-6">
            <div className="sticky top-24">
              <p className="section-title text-left mb-5">
                {privacyContent.onThisPage}
              </p>

              <div className="space-y-3">
                {sectionKeys.map((key, index) => (
                  <a
                    key={key}
                    href={`#terms-${index}`}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                    onClick={(event) => handleSidebarClick(event, `terms-${index}`)}
                  >
                    {privacyContent.terms[key].title}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 px-4 md:px-8 lg:px-12 py-8 md:py-12">
            <div className="max-w-3xl">
              {sectionKeys.map((key, index) => {
                const section = privacyContent.terms[key]

                return (
                  <section
                    key={key}
                    id={`terms-${index}`}
                    className="scroll-mt-24 mb-12"
                  >
                    <h3 className="mb-5 pb-3 border-b border-border">
                      {section.title}
                    </h3>

                    {'p1' in section && (
                      <p className="mb-4 text-muted-foreground">
                        {section.p1}
                      </p>
                    )}

                    {'list' in section && section.list?.length > 0 && (
                      <ul className="space-y-3 mb-5">
                        {section.list.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7100] mt-2.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {'p2' in section && section.p2 && (
                      <p className="mb-4 text-muted-foreground">
                        {section.p2}
                      </p>
                    )}

                    {'email' in section && (
                      <div className="space-y-2">
                        <p className="text-muted-foreground">
                          <span className="text-foreground font-medium">
                            Email:
                          </span>{' '}
                          <a
                            href={`mailto:${section.email}`}
                            className="hover:underline text-foreground"
                          >
                            {section.email}
                          </a>
                        </p>

                        <p className="text-muted-foreground">
                          <span className="text-foreground font-medium">
                            Phone:
                          </span>{' '}
                          <a
                            href={`tel:${section.phone.replace(/\s+/g, '')}`}
                            className="hover:underline text-foreground"
                          >
                            {section.phone}
                          </a>
                        </p>
                      </div>
                    )}
                  </section>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}