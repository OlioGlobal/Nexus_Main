import type { CollectionConfig } from 'payload'

const isAdmin = ({ req: { user } }: { req: { user: any } }) => {
  return user?.role === 'admin'
}

const isAdminOrSelf = ({ req: { user }, id }: { req: { user: any }; id?: string }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return user.id === id
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: 7200, // 2 hours
    maxLoginAttempts: 5,
    lockTime: 600000, // 10 minutes lockout after max attempts
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    },
  },
  access: {
    // Only admins can create new users
    create: isAdmin,
    // Users can only read their own profile, admins can read all
    read: isAdminOrSelf,
    // Users can only update their own profile, admins can update all
    update: isAdminOrSelf,
    // Only admins can delete users
    delete: isAdmin,
    // Only authenticated users can access admin panel
    admin: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        // Only admins can change roles
        update: isAdmin,
      },
    },
  ],
}
