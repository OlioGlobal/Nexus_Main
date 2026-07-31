/**
 * Single source of truth for site-wide structured-data (JSON-LD) values.
 * Edit these constants when company details change.
 *
 * NOTE: fields marked TODO have no confirmed source in the app yet — fill them
 * in when you have the real value. Empty values are omitted from the schema.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const LOGO_URL = `${SITE_URL}/ui/logo.svg`
export const DEFAULT_IMAGE = `${SITE_URL}/opengraph-image` // generated 1200x630

export const ORG = {
  name: 'Olio Nexus',
  legalName: 'Olio Global AdTech',
  alternateName: 'OlioNexus',
  url: SITE_URL,
  logo: LOGO_URL,
  image: DEFAULT_IMAGE,
  description:
    'Olio Nexus is a technology solutions provider offering software development, AI automation, and digital transformation services to help businesses scale and innovate.',
  slogan: "We bridge the gap between what's possible and what's practical.",
  email: 'siddhesh@olioglobaladtech.com',
  telephone: '+917303197934',
  foundingDate: '2016', // Olio Global AdTech founded 2016 (LinkedIn/Tracxn)
  founder: ['Amol Salke', 'Siddhesh Mane'],
  parentOrganization: 'Olio Global AdTech',
  address: {
    streetAddress: '406 Rajgor Empire Building, Khot Lane, Kapol Wadi, Ghatkopar West',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400086',
    addressCountry: 'IN',
  },
  areaServed: ['Worldwide', 'India', 'United Arab Emirates'],
  availableLanguage: ['English'],
  knowsAbout: [
    'Technology Solutions',
    'Software Product Development',
    'AI & Automation',
    'Artificial Intelligence Consulting',
    'Digital Transformation',
    'Managed IT Services',
    'UI/UX Design',
    'Technology Transformation',
  ],
  sameAs: [
    'https://x.com/OlioNexus',
    'https://www.instagram.com/olionexusofficial',
    'https://www.facebook.com/share/1Ye3SmHphv/',
    'https://www.youtube.com/@Olio_Nexus',
    'https://www.linkedin.com/company/olio-nexus/',
  ],
  // Business hours — editable. Applies to opening/contact hours specs.
  openingHours: {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:30',
    closes: '18:30',
  },
}
