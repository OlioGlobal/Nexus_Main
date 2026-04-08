import type { CollectionConfig } from 'payload'

const isAdmin = ({ req: { user } }: { req: { user: any } }) => {
  return user?.role === 'admin'
}

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'email',
    group: 'Inbox',
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
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Role',
    },
    {
      name: 'budget',
      type: 'text',
      label: 'Budget',
    },
    {
      name: 'area',
      type: 'text',
      label: 'Interest Area',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
    },
    {
      name: 'source',
      type: 'text',
      label: 'Source',
      defaultValue: 'newsletter',
    },
  ],
}
