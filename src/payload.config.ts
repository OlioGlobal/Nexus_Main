import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { cloudinaryStorage } from 'payload-cloudinary'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Leads } from './collections/Leads'
import { Categories } from './collections/Categories'
import { Posts } from './collections/Posts'
import { Jobs } from './collections/Jobs'
import { JobApplications } from './collections/JobApplications'
import { Resumes } from './collections/Resumes'
import { CaseStudies } from './collections/CaseStudies'
import { Services } from './collections/Services'
import { HomePage } from './globals/HomePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,

    meta: {
      titleSuffix: ' | Nexus Admin',
      icons: [{ url: '/ui/logo.svg' }],
      openGraph: {
        title: 'Nexus Admin',
        description: 'OlioNexus Content Management System',
      },
    },
    components: {
      graphics: {
        Logo: '@/components/AdminLogo',
        Icon: '@/components/AdminLogo',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // CORS — only allow your own domain
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'],
  // CSRF — block cross-origin form submissions
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'],
  collections: [Users, Media, Resumes, Leads, Categories, Posts, Jobs, JobApplications, CaseStudies, Services],
  globals: [HomePage],
  editor: lexicalEditor(),
  secret: (() => {
    if (!process.env.PAYLOAD_SECRET) throw new Error('PAYLOAD_SECRET environment variable is required')
    return process.env.PAYLOAD_SECRET
  })(),
  graphQL: {
    disable: true,
  },
  // Hide sensitive error details in production
  debug: process.env.NODE_ENV !== 'production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: (() => {
      if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL environment variable is required')
      return process.env.DATABASE_URL
    })(),
  }),
  email: nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_USER || '',
    defaultFromName: 'Nexus',
    transportOptions: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || '',
      },
    },
  }),
  sharp,
  plugins: [
    cloudinaryStorage({
      collections: {
        media: true,
      },
      folder: 'nexus',
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
        api_key: process.env.CLOUDINARY_API_KEY || '',
        api_secret: process.env.CLOUDINARY_API_SECRET || '',
      },
    }),
  ],
})
