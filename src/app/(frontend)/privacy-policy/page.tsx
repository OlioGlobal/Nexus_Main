'use client'


const sectionKeys = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'] as const

const privacyContent = {
  sectionLabel: '[Legal]',
  privacyTitle: 'Privacy Policy',
  lastUpdated: 'Last updated: March 27, 2026',
  onThisPage: 'On this page',

  sections: {
    s1: {
      title: '1. Who We Are',
      p1: 'This website is operated by Olio Global AdTech ("we", "us", "our"), a digital-first communication and technology agency. OlioNexus is our technology and product development division.',
      details: [
        {
          label: 'India Office',
          value:
            '406 Rajgor Empire Building, Khot Lane, Kapol Wadi, Ghatkopar West, Mumbai, Maharashtra 400086',
        },
        {
          label: 'Dubai Office',
          value:
            'TechnoRep Marketing Solutions LLC, 114 Makateb Building, Sheikh Zayed Road, Dubai UAE, PO Box 30557',
        },
        {
          label: 'Contact',
          value: 'siddhesh@olioglobaladtech.com | +91 9930 999 834',
        },
      ],
    },

    s2: {
      title: '2. Information We Collect',
      p1: 'When you submit the contact form on this website, we collect:',
      list: [
        'Full name',
        'Email address',
        'Phone number (with country code)',
        'Your message or project description',
      ],
      p2: 'We also automatically collect:',
      list2: [
        'UTM parameters and campaign tracking data',
        'Page URL at the time of submission',
        'Browser type and device information (via GTM)',
        'IP address and approximate location',
      ],
    },

    s3: {
      title: '3. How We Use Your Information',
      p1: 'We do not sell, rent, or share your personal data with third parties for their marketing purposes.',
      list: [
        'To respond to your enquiry and schedule a consultation',
        'To send you relevant project proposals',
        'To measure the effectiveness of our marketing campaigns',
        'To improve our website and services',
      ],
    },

    s4: {
      title: '4. Data Storage & Security',
      p1: 'Your form submissions are securely stored in Google Sheets (Google Workspace) and email notifications are sent via Google Apps Script. We use industry-standard security measures to protect your data.',
      p2: 'Data is retained for as long as necessary to fulfill the purpose of collection. You may request deletion at any time by contacting us.',
    },

    s5: {
      title: '5. Third-Party Services',
      p1: 'We use the following third-party services:',
      list: [
        'Google Tag Manager (GTM) - analytics and conversion tracking',
        'Google Analytics / Google Ads - website analytics and ad performance',
        'Vercel - website hosting',
        'Google Sheets / Apps Script - lead data storage and notification',
      ],
      p2: 'Each of these services has their own privacy policy governing data use.',
    },

    s6: {
      title: '6. Cookies & Tracking',
      p1: 'This website uses cookies and similar technologies through Google Tag Manager for analytics and ad tracking.',
      p2: 'You can control cookies through your browser settings. Disabling cookies may affect site functionality.',
    },

    s7: {
      title: '7. Your Rights',
      p1: 'Depending on your location, you may have the following rights:',
      list: [
        'Access - Request a copy of the data we hold about you',
        'Correction - Request correction of inaccurate data',
        'Deletion - Request deletion of your personal data',
        'Objection - Object to processing of your data',
      ],
      highlights: [
        {
          label: 'EU/EEA (GDPR)',
          text: 'You have additional rights including data portability and the right to lodge a complaint with a supervisory authority.',
        },
        {
          label: 'India (DPDP Act)',
          text: 'You have the right to access, correct, and erase your personal data as per the Digital Personal Data Protection Act, 2023.',
        },
        {
          label: 'UAE',
          text: 'Your data rights are governed by Federal Decree-Law No. 45 of 2021 on Personal Data Protection.',
        },
      ],
    },

    s8: {
      title: '8. Contact Us',
      p1: 'For any privacy-related queries or requests:',
      details: [
        {
          label: 'Email',
          value: 'siddhesh@olioglobaladtech.com',
        },
        {
          label: 'Phone',
          value: '+91 9930 999 834',
        },
      ],
    },
  },
} as const

export default function PrivacyPolicy() {
  return (
    <>

      <section>
        <div>

          {/* Hero */}
          <div className="px-4 md:px-8 lg:px-12 py-10 md:py-16 border-b border-border">
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

          {/* Layout */}
          <div className="flex flex-col md:flex-row">

            {/* Sidebar */}
            <aside className="hidden md:block md:w-[260px] lg:w-[300px] shrink-0 border-r border-border py-8 px-6">
              <div className="sticky top-24">
                <p className="section-title text-left mb-5">
                  {privacyContent.onThisPage}
                </p>

                <div className="space-y-3">
                  {sectionKeys.map((key, i) => (
                    <a
                      key={key}
                      href={`#privacy-${i}`}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {privacyContent.sections[key].title}
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 px-4 md:px-8 lg:px-12 py-8 md:py-12">
              <div className="max-w-3xl">

                {sectionKeys.map((key, i) => {
                  const section = privacyContent.sections[key]

                  return (
                    <section
                      key={key}
                      id={`privacy-${i}`}
                      className="scroll-mt-24 mb-12"
                    >
                      <h3 className="mb-5 pb-3 border-b border-border">
                        {section.title}
                      </h3>

                      {section.p1 && (
                        <p className="mb-4 text-muted-foreground">
                          {section.p1}
                        </p>
                      )}

                      {'list' in section && section.list && (
                        <ul className="space-y-3 mb-5">
                          {section.list.map((item, idx) => (
                            <li key={idx} className="flex gap-3 text-muted-foreground">
                              <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[#FF7100]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {'list2' in section && section.list2 && (
                        <ul className="space-y-3 mb-5">
                          {section.list2.map((item, idx) => (
                            <li key={idx} className="flex gap-3 text-muted-foreground">
                              <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[#FF7100]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {"p2" in section && section.p2 && (
                        <p className="mb-4 text-muted-foreground">
                          {section.p2}
                        </p>
                      )}

                      {'details' in section && section.details && (
                        <div className="space-y-2">
                          {section.details.map((d, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:gap-4">
                              <span className="text-foreground font-medium min-w-[120px]">
                                {d.label}
                              </span>
                              <span className="text-muted-foreground">
                                {d.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {'highlights' in section && section.highlights && (
                        <div className="mt-5 space-y-3">
                          {section.highlights.map((h, idx) => (
                            <div key={idx} className="border-l-4 border-[#FF7100] pl-4">
                              <p className="text-foreground font-medium mb-1">
                                {h.label}
                              </p>
                              <p className="text-muted-foreground text-sm">
                                {h.text}
                              </p>
                            </div>
                          ))}
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
    </>
  )
}