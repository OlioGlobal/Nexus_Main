import type { Field } from 'payload'

/**
 * Reusable SEO field group.
 *
 * Add to any Payload-managed collection or global whose page needs an
 * editable meta title / description. Both fields are OPTIONAL — the frontend
 * falls back to the page's existing title / excerpt when they are left blank.
 *
 * NOTE: This is only for Payload-managed pages. Static pages (e.g. /contact,
 * /privacy-policy) are not in Payload and set their metadata in code.
 */
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  admin: {
    description:
      'Search-engine metadata for this page. Leave blank to fall back to the page defaults.',
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
      admin: {
        description: 'Shown in the browser tab and search results. Aim for 50–60 characters.',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
      admin: {
        description: 'The snippet shown under the title in search results. Aim for 140–160 characters.',
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Social Share Image',
      admin: {
        description:
          'Shown when this page is shared on social media. 1200×630px recommended. Falls back to the site default if empty.',
      },
    },
  ],
}
