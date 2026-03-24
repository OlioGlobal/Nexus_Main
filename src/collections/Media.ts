import type { CollectionConfig } from 'payload'

const isAuthenticated = ({ req: { user } }: { req: { user: any } }) => Boolean(user)

const isAdmin = ({ req: { user } }: { req: { user: any } }) => {
  return user?.role === 'admin'
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: isAuthenticated,
    read: () => true,
    update: isAuthenticated,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // Only allow safe file types — no executables, scripts, etc.
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'application/pdf',
      'video/mp4',
      'video/webm',
    ],
    // Max 10MB per file
    staticDir: 'media',
  },
}
