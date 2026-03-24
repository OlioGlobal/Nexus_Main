import type { CollectionConfig } from 'payload'

const isAdmin = ({ req: { user } }: { req: { user: any } }) => {
  return user?.role === 'admin'
}

export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'job', 'createdAt'],
  },
  access: {
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone',
    },
    {
      name: 'linkedinProfile',
      type: 'text',
      label: 'LinkedIn Profile',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Why Do You Want To Join Us?',
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'resumes',
      required: true,
      label: 'Resume',
    },
    {
      name: 'job',
      type: 'relationship',
      relationTo: 'jobs',
      label: 'Job',
    },
  ],
}
