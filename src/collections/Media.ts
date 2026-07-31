import type { CollectionConfig } from 'payload'

const isAuthenticated = ({ req: { user } }: { req: { user: any } }) => Boolean(user)

const isAdmin = ({ req: { user } }: { req: { user: any } }) => {
  return user?.role === 'admin'
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Assets',
  },
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
      admin: {
        description:
          'Describe what the image shows in a natural phrase (include a relevant keyword where it fits, e.g. the service, industry, or "Olio Nexus"). Avoid raw filenames like "image 109" or "IMG_1418". Leave blank only for purely decorative images.',
      },
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
    staticDir: 'media',
  },
}
