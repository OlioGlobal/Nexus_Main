import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'
import { seoField } from '../fields/seo'
import {
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  OrderedListFeature,
  UnorderedListFeature,
  ParagraphFeature,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

const isAdmin = ({ req: { user } }: { req: { user: any } }) => {
  return user?.role === 'admin'
}

export const IndustryPages: CollectionConfig = {
  slug: 'industry-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status'],
    group: 'Content',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.title) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
    afterChange: [
      ({ doc }) => {
        revalidatePath(`/industries/${doc.slug}`)
        revalidatePath('/industries')
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidatePath(`/industries/${doc.slug}`)
        revalidatePath('/industries')
      },
    ],
  },
  fields: [
    seoField,
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Industry page title (e.g. "Technology Solutions for Industrial Machinery Manufacturers")' },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: { position: 'sidebar', readOnly: true, description: 'Auto-generated from title' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },

    // ── 1. Hero ──────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '1 · Hero',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'heroDescription',
          type: 'textarea',
          admin: { description: 'Short description shown below the title in the hero' },
        },
        {
          name: 'heroCta1Text',
          type: 'text',
          defaultValue: 'Get a Free Tech Audit',
          admin: { description: 'Primary CTA button label' },
        },
        {
          name: 'heroCta1Link',
          type: 'text',
          defaultValue: '/contact',
          admin: { description: 'Primary CTA button URL' },
        },
        {
          name: 'heroCta2Text',
          type: 'text',
          admin: { description: 'Secondary CTA button label (optional)' },
        },
        {
          name: 'heroCta2Link',
          type: 'text',
          defaultValue: '/contact',
          admin: { description: 'Secondary CTA button URL' },
        },
      ],
    },

    // ── 2. Overview ──────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '2 · Overview',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'overviewHeading',
          type: 'text',
          admin: { description: 'Left-side sticky heading (e.g. "Why Tech Transformation and Smart Systems Work for Machine Manufacturing?")' },
        },
        {
          name: 'overviewContent',
          type: 'richText',
          admin: { description: 'Right-side content — paragraphs, lists, etc.' },
          editor: lexicalEditor({
            features: [
              ParagraphFeature(),
              HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
              BoldFeature(),
              ItalicFeature(),
              UnderlineFeature(),
              OrderedListFeature(),
              UnorderedListFeature(),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        {
          name: 'overviewCtaText',
          type: 'text',
          defaultValue: 'Book a Consultation',
          admin: { description: 'CTA button below overview content' },
        },
        {
          name: 'overviewCtaLink',
          type: 'text',
          defaultValue: '/contact',
          admin: { description: 'CTA button URL' },
        },
      ],
    },

    // ── 3. Challenges ────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '3 · Challenges',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'challengesTitle',
          type: 'text',
          admin: { description: 'Left sticky heading (e.g. "Challenges Faced by Industrial Machinery Manufacturers Today")' },
        },
        {
          name: 'challengesDescription',
          type: 'textarea',
          admin: { description: 'Short paragraph below the heading on the left side' },
        },
        {
          name: 'challengeItems',
          type: 'array',
          admin: { description: 'Each item = one challenge with icon, title, and description' },
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'SVG or PNG icon for this challenge' },
            },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },

    // ── 4. Solutions ─────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '4 · Solutions',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'solutionsLabel',
          type: 'text',
          defaultValue: '[Solutions]',
          admin: { description: 'Small bracket label above the title (e.g. "[Solutions]")' },
        },
        {
          name: 'solutionsTitle',
          type: 'text',
          admin: { description: 'Section heading (e.g. "Tailored Technology Solutions for Industrial Machinery Manufacturers")' },
        },
        {
          name: 'solutionItems',
          type: 'array',
          admin: { description: 'Solution cards shown in the carousel' },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Card image (add later)' },
            },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            {
              name: 'tags',
              type: 'array',
              admin: { description: 'Capability tags shown as chips' },
              fields: [{ name: 'tag', type: 'text', required: true }],
            },
          ],
        },
      ],
    },

    // ── 5. Real-World Applications ───────────────────────────────
    {
      type: 'collapsible',
      label: '5 · Real-World Applications',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'realWorldTitle',
          type: 'text',
          admin: { description: 'Section heading (e.g. "Real-World Applications in Industrial Machinery Manufacturing")' },
        },
        {
          name: 'realWorldItems',
          type: 'array',
          admin: { description: 'Application cards — 3 col top row, 2 col bottom row' },
          fields: [
            { name: 'icon', type: 'upload', relationTo: 'media' },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },

    // ── 6. What You Gain ─────────────────────────────────────────
    {
      type: 'collapsible',
      label: '6 · What You Gain',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'gainTitle',
          type: 'text',
          admin: { description: 'Left sticky heading (e.g. "What You Gain with Industry-Specific Manufacturing Technology")' },
        },
        {
          name: 'gainItems',
          type: 'array',
          admin: { description: 'Benefit cards — 2 col grid, last card full width' },
          fields: [
            { name: 'icon', type: 'upload', relationTo: 'media' },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },

    // ── 7. Why Choose ────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '7 · Why Choose NeXus',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'whyChooseTitle',
          type: 'text',
          admin: { description: 'Section heading (e.g. "Why Industrial Machinery Manufacturers Choose NeXus")' },
        },
        {
          name: 'whyChooseItems',
          type: 'array',
          admin: { description: 'Cards with image, title, description — 4 per row' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },

    // ── 8. Mid CTA ───────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '8 · Mid CTA',
      admin: { initCollapsed: true },
      fields: [
        { name: 'midCtaHeading', type: 'text', admin: { description: 'CTA heading (e.g. "Let\'s Power Your Sales and Production with Smart Technology Solutions")' } },
        { name: 'midCtaDescription', type: 'textarea', admin: { description: 'Short paragraph below the heading' } },
        { name: 'midCtaButtonText', type: 'text', defaultValue: 'Talk to Our Engineers', admin: { description: 'CTA button label' } },
        { name: 'midCtaButtonLink', type: 'text', defaultValue: '/contact', admin: { description: 'CTA button URL' } },
      ],
    },

    // ── 9. FAQ ────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '9 · FAQ',
      admin: { initCollapsed: true },
      fields: [
        { name: 'faqTitle', type: 'text', defaultValue: 'Frequently Asked Questions', admin: { description: 'Left heading' } },
        {
          name: 'faqItems',
          type: 'array',
          fields: [
            { name: 'question', type: 'text', required: true },
            { name: 'answer', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}
