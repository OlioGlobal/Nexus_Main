import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'headingPrefix',
          type: 'text',
          label: 'Heading Prefix',
          defaultValue: 'We',
          required: true,
        },
        {
          name: 'headingHighlight',
          type: 'text',
          label: 'Heading Highlight (orange text)',
          defaultValue: 'bridge the gap',
          required: true,
        },
        {
          name: 'headingSuffix',
          type: 'text',
          label: 'Heading Suffix',
          defaultValue: "between what's possible and what's practical.",
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue:
            'Technology should amplify human potential, not complicate it. Welcome to the intersection of vision and execution.',
          required: true,
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image / SVG',
        },
        {
          name: 'primaryButtonText',
          type: 'text',
          label: 'Primary Button Text',
          defaultValue: 'Start a Conversation',
          required: true,
        },
        {
          name: 'primaryButtonLink',
          type: 'text',
          label: 'Primary Button Link',
          defaultValue: '#',
        },
        {
          name: 'secondaryButtonText',
          type: 'text',
          label: 'Secondary Button Text',
          defaultValue: 'See Our Work',
          required: true,
        },
        {
          name: 'secondaryButtonLink',
          type: 'text',
          label: 'Secondary Button Link',
          defaultValue: '#',
        },
      ],
    },
    {
      name: 'trustedBy',
      type: 'group',
      label: 'Trusted By Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          defaultValue: 'Trusted by industry leaders',
          required: true,
        },
        {
          name: 'logos',
          type: 'array',
          label: 'Client Logos',
          minRows: 1,
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'solutions',
      type: 'group',
      label: 'Solutions Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Section Label',
          defaultValue: '[Solutions]',
          required: true,
        },
        {
          name: 'headingPrefix',
          type: 'text',
          label: 'Heading Prefix',
          defaultValue: 'We bring',
          required: true,
        },
        {
          name: 'headingHighlight1',
          type: 'text',
          label: 'Heading Highlight 1 (italic)',
          defaultValue: 'disruption',
          required: true,
        },
        {
          name: 'headingMiddle',
          type: 'text',
          label: 'Heading Middle',
          defaultValue: ', We build',
          required: true,
        },
        {
          name: 'headingHighlight2',
          type: 'text',
          label: 'Heading Highlight 2 (italic orange)',
          defaultValue: 'dominance',
          required: true,
        },
        {
          name: 'cards',
          type: 'array',
          label: 'Solution Cards',
          minRows: 1,
          maxRows: 6,
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Card Title',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              required: true,
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              label: 'Card Icon/SVG',
            },
            {
              name: 'tags',
              type: 'array',
              label: 'Service Tags',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  label: 'Tag',
                  required: true,
                },
              ],
            },
            {
              name: 'link',
              type: 'text',
              label: 'Learn More Link',
              defaultValue: '#',
            },
          ],
        },
      ],
    },
    {
      name: 'industries',
      type: 'group',
      label: 'Industries Section',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          defaultValue: 'Industries We Transform',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          defaultValue: 'We deliver specialized AI consulting across 12 high-impact sectors:',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Industry Items',
          minRows: 1,
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Industry Name',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              label: 'Industry Icon',
            },
          ],
        },
      ],
    },
    {
      name: 'process',
      type: 'group',
      label: 'Process Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Section Label',
          defaultValue: '[Process]',
          required: true,
        },
        {
          name: 'headingLine1',
          type: 'text',
          label: 'Heading Line 1',
          defaultValue: "We don't just consult.",
          required: true,
        },
        {
          name: 'headingLine2',
          type: 'text',
          label: 'Heading Line 2 (orange)',
          defaultValue: 'We create. We strategize.',
          required: true,
        },
        {
          name: 'steps',
          type: 'array',
          label: 'Process Steps',
          minRows: 1,
          maxRows: 6,
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Step Title',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Step Description',
              required: true,
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              label: 'Step Icon/SVG',
            },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'group',
      label: 'Stats Section',
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Stats',
          minRows: 1,
          maxRows: 6,
          fields: [
            {
              name: 'value',
              type: 'number',
              label: 'Number Value',
              required: true,
            },
            {
              name: 'prefix',
              type: 'text',
              label: 'Prefix (e.g. ₹)',
            },
            {
              name: 'suffix',
              type: 'text',
              label: 'Suffix (e.g. %, Cr)',
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'manifesto',
      type: 'group',
      label: 'Manifesto Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Section Label',
          defaultValue: '[Our Manifesto]',
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Manifesto Text',
          defaultValue: "There's a gap in the technology industry. Consultants who don't code. Developers who don't strategize. We bridge that gap.",
          required: true,
        },
      ],
    },
    {
      name: 'testimonials',
      type: 'group',
      label: 'Testimonials Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Section Label',
          defaultValue: '[Testimonials]',
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          defaultValue: 'What our',
        },
        {
          name: 'headingHighlight',
          type: 'text',
          label: 'Heading Highlight (orange)',
          defaultValue: 'clients',
        },
        {
          name: 'headingSuffix',
          type: 'text',
          label: 'Heading Suffix',
          defaultValue: 'say about us',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Testimonials',
          minRows: 1,
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Client Name',
              required: true,
            },
            {
              name: 'role',
              type: 'text',
              label: 'Role / Company',
              required: true,
            },
            {
              name: 'quote',
              type: 'textarea',
              label: 'Testimonial Quote',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Client Photo',
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA Section',
      fields: [
        {
          name: 'headingLine1',
          type: 'text',
          label: 'Heading Line 1',
          defaultValue: "We're not here to disrupt everything.",
        },
        {
          name: 'headingLine2',
          type: 'text',
          label: 'Heading Line 2',
          defaultValue: "We're here to",
        },
        {
          name: 'headingHighlight',
          type: 'text',
          label: 'Heading Highlight (orange)',
          defaultValue: 'build what matters.',
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Schedule a Call',
        },
        {
          name: 'buttonLink',
          type: 'text',
          label: 'Button Link',
          defaultValue: '#',
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Footer Section',
      fields: [
        {
          name: 'tagline',
          type: 'textarea',
          label: 'Tagline',
          defaultValue: "Bridging the gap between what's possible and what's practical through first-principles engineering.",
        },
        {
          name: 'newsletterHeading',
          type: 'text',
          label: 'Newsletter Heading',
          defaultValue: 'Get the latest insights from Olionexus',
        },
      ],
    },
    {
      name: 'footerLinks',
      type: 'group',
      label: 'Footer Links',
      fields: [
        {
          name: 'columns',
          type: 'array',
          label: 'Link Columns',
          minRows: 1,
          maxRows: 6,
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Column Title',
              required: true,
            },
            {
              name: 'links',
              type: 'array',
              label: 'Links',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Link Label',
                  required: true,
                },
                {
                  name: 'href',
                  type: 'text',
                  label: 'Link URL',
                  defaultValue: '#',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
