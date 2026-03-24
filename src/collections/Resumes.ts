import type { CollectionConfig } from 'payload'

const isAdmin = ({ req: { user } }: { req: { user: any } }) => {
  return user?.role === 'admin'
}

export const Resumes: CollectionConfig = {
  slug: 'resumes',
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  upload: {
    staticDir: 'resumes',
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      defaultValue: 'Resume',
    },
  ],
}
