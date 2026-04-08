import type { CollectionConfig } from 'payload'
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

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tagline', 'status', 'order'],
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
  },
  fields: [
    // ── Sidebar ──────────────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Service name (e.g. "AI Consulting Services")' },
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
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first' },
    },

    // ── 1. Hero ──────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '1 · Hero',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'tagline',
          type: 'text',
          admin: { description: 'Highlighted subtitle (e.g. "Find out where AI makes sense...")' },
        },
        {
          name: 'taglineColor',
          type: 'text',
          defaultValue: '#E05C00',
          admin: { description: 'CSS hex color for tagline text. Default: #E05C00' },
        },
        {
          name: 'shortDescription',
          type: 'textarea',
          admin: { description: 'Brief description shown on the listing card and hero' },
        },
        {
          name: 'heroDetail',
          type: 'textarea',
          admin: { description: 'Additional paragraph below the description in the hero' },
        },
        {
          name: 'ctaText',
          type: 'text',
          defaultValue: 'Get Started',
          admin: { description: 'CTA button label' },
        },
        {
          name: 'ctaLink',
          type: 'text',
          defaultValue: '/contact',
          admin: { description: 'CTA button URL' },
        },
      ],
    },

    // ── 2. Cover Image ───────────────────────────────────────────
    {
      type: 'collapsible',
      label: '2 · Cover Image',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'coverImage',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Image shown on the services listing card and detail page' },
        },
      ],
    },

    // ── 3. Benefits ──────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '3 · Benefits Grid',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'benefits',
          type: 'array',
          admin: { description: 'Feature cards shown in the grid below the hero' },
          fields: [
            {
              name: 'iconImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'SVG or PNG icon' },
            },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },

    // ── 4. Overview ──────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '4 · Overview',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'overview',
          type: 'richText',
          admin: { description: 'Detailed service overview — shown as a content section' },
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
      ],
    },

    // ── 5. Challenges ────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '5 · Challenges',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'challengesSectionTitle',
          type: 'text',
          admin: { description: 'Section heading (e.g. "Challenges in AI Adoption")' },
        },
        {
          name: 'challengeRows',
          type: 'array',
          admin: { description: 'Each row = visible problem (left) + hidden problem (right)' },
          fields: [
            {
              name: 'visibleProblem',
              type: 'textarea',
              required: true,
              admin: { description: 'Left column — the problem the client can see' },
            },
            {
              name: 'hiddenProblem',
              type: 'textarea',
              required: true,
              admin: { description: 'Right column — the underlying / hidden problem' },
            },
          ],
        },
        {
          name: 'challengesConclusion',
          type: 'richText',
          admin: { description: 'Closing statement below the challenges table' },
          editor: lexicalEditor({
            features: [
              ParagraphFeature(),
              BoldFeature(),
              ItalicFeature(),
              UnderlineFeature(),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },

    // ── 6. Thinking Model ────────────────────────────────────────
    {
      type: 'collapsible',
      label: '6 · Thinking Model',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'thinkingModelLabel',
          type: 'text',
          admin: { description: 'Small bracket label above the title (e.g. "HOW WE APPROACH AI CONSULTING")' },
        },
        {
          name: 'thinkingModelTitle',
          type: 'text',
          admin: { description: 'Section heading (e.g. "Towards a Solution: Our Thinking Model")' },
        },
        {
          name: 'thinkingModelDescription',
          type: 'textarea',
          admin: { description: 'Subtitle paragraph below the section heading' },
        },
        {
          name: 'thinkingModelPrinciples',
          type: 'array',
          admin: { description: 'Principle cards shown in the 4-column grid' },
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Illustration / icon for this principle' },
            },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },

    // ── 7. Mid CTA Banner ────────────────────────────────────────
    {
      type: 'collapsible',
      label: '7 · Mid CTA Banner',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'midCtaTitle',
          type: 'text',
          admin: { description: 'White heading (e.g. "Find Out Where AI Actually Delivers")' },
        },
        {
          name: 'midCtaHighlight',
          type: 'text',
          admin: { description: 'Orange line below the title (e.g. "Measurable Value.")' },
        },
        {
          name: 'midCtaButtonText',
          type: 'text',
          admin: { description: 'CTA button label' },
        },
        {
          name: 'midCtaButtonLink',
          type: 'text',
          defaultValue: '/contact',
          admin: { description: 'CTA button URL' },
        },
      ],
    },

    // ── 8. What Makes Us Unique ──────────────────────────────────
    {
      type: 'collapsible',
      label: '8 · What Makes Us Unique',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'uniqueSectionTitle',
          type: 'text',
          admin: { description: 'e.g. "What Makes Our AI Consultation Unique?"' },
        },
        {
          name: 'uniqueSectionItems',
          type: 'array',
          admin: { description: 'Cards for the 4-col unique grid' },
          fields: [
            { name: 'icon', type: 'upload', relationTo: 'media' },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },

    // ── 9. Comparison ────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '9 · Comparison',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'comparisonTitle',
          type: 'text',
          admin: { description: 'e.g. "Traditional Approach vs NeXus Approach"' },
        },
        {
          name: 'comparisonLeftLabel',
          type: 'text',
          admin: { description: 'Left column header (e.g. "Traditional IT Consulting")' },
        },
        {
          name: 'comparisonRightLabel',
          type: 'text',
          admin: { description: 'Right column header (e.g. "NeXus AI Consulting")' },
        },
        {
          name: 'comparisonLeftItems',
          type: 'array',
          admin: { description: 'Left column items (traditional / negative)' },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        {
          name: 'comparisonRightItems',
          type: 'array',
          admin: { description: 'Right column items (NeXus / positive)' },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },

    // ── 10. Step-by-Step Process ─────────────────────────────────
    {
      type: 'collapsible',
      label: '10 · Step-by-Step Process',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'processSectionTitle',
          type: 'text',
          admin: { description: 'e.g. "Step-by-Step Service Delivery"' },
        },
        {
          name: 'processSectionSubtitle',
          type: 'text',
          admin: { description: 'Subtitle below the heading' },
        },
        {
          name: 'processSteps',
          type: 'array',
          admin: { description: 'Phase cards — auto-numbered PHASE 01, 02...' },
          fields: [
            { name: 'icon', type: 'upload', relationTo: 'media' },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },

    // ── 11. Process CTA Banner ────────────────────────────────────
    {
      type: 'collapsible',
      label: '11 · Process CTA Banner',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'processCtaTitlePart1',
          type: 'text',
          admin: { description: 'White text before first highlight (e.g. "Want To Know Which")' },
        },
        {
          name: 'processCtaHighlight1',
          type: 'text',
          admin: { description: 'First orange inline word(s) (e.g. "Ai Investments")' },
        },
        {
          name: 'processCtaTitlePart2',
          type: 'text',
          admin: { description: 'White text between highlights (e.g. "Deliver The")' },
        },
        {
          name: 'processCtaHighlight2',
          type: 'text',
          admin: { description: 'Second orange inline word(s) (e.g. "Highest Roi")' },
        },
        {
          name: 'processCtaTitlePart3',
          type: 'text',
          admin: { description: 'White text after second highlight (e.g. "In Your Industry?")' },
        },
        {
          name: 'processCtaButtonText',
          type: 'text',
          admin: { description: 'CTA button label' },
        },
        {
          name: 'processCtaButtonLink',
          type: 'text',
          defaultValue: '/contact',
          admin: { description: 'CTA button URL' },
        },
      ],
    },

    // ── 12. What We Deliver ──────────────────────────────────────
    {
      type: 'collapsible',
      label: '12 · What We Deliver',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'whatWeDeliver',
          type: 'richText',
          admin: { description: 'Deliverables / outcomes the client receives' },
          editor: lexicalEditor({
            features: [
              ParagraphFeature(),
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
      ],
    },

    // ── 13. Business Impact Timeline ────────────────────────────
    {
      type: 'collapsible',
      label: '13 · Business Impact Over Time',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'timelineSectionTitle',
          type: 'text',
          admin: { description: 'Plain heading text (e.g. "Business Impact")' },
        },
        {
          name: 'timelineSectionHighlight',
          type: 'text',
          admin: { description: 'Orange highlighted word(s) after title (e.g. "Over Time")' },
        },
        {
          name: 'timelineItems',
          type: 'array',
          admin: { description: 'Timeline cards — auto-numbered. Description shows on hover.' },
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },

    // ── 16. Impact Stories ───────────────────────────────────────
    {
      type: 'collapsible',
      label: '16 · Impact Stories',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'impactStoriesSectionTitle',
          type: 'text',
          admin: { description: 'e.g. "Impact Stories: Real Stories of AI Transformation"' },
        },
        {
          name: 'impactStoriesSectionDescription',
          type: 'textarea',
          admin: { description: 'Short intro paragraph below the section title' },
        },
        {
          name: 'impactStories',
          type: 'array',
          admin: { description: 'Each item = one story card' },
          fields: [
            { name: 'headline', type: 'text', required: true, admin: { description: 'e.g. "₹22L/Month From One Week of Analysis"' } },
            { name: 'description', type: 'textarea' },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Optional image shown instead of the chart (e.g. screenshot, graph photo)' },
            },
            { name: 'chartLabel', type: 'text', admin: { description: 'Label shown on chart, e.g. "+120% ROI"' } },
            { name: 'discoveryTitle', type: 'text', admin: { description: 'e.g. "What we discovered during our AI consulting audit:"' } },
            { name: 'discoveryIntro', type: 'textarea' },
            {
              name: 'discoveryPoints',
              type: 'array',
              fields: [{ name: 'point', type: 'text', required: true }],
            },
            { name: 'actionLabel', type: 'text', defaultValue: 'OUR ACTION' },
            { name: 'actionText', type: 'textarea' },
            { name: 'impactLabel', type: 'text', defaultValue: 'MEASURABLE IMPACT' },
            { name: 'impactText', type: 'textarea' },
          ],
        },
      ],
    },

    // ── 15. Audience Carousel ────────────────────────────────────
    {
      type: 'collapsible',
      label: '15 · Who This Is For (Carousel)',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'audienceSectionTitle',
          type: 'text',
          admin: { description: 'Section heading (e.g. "Who AI Consulting Is For")' },
        },
        {
          name: 'audienceItems',
          type: 'array',
          admin: { description: 'Carousel cards — each has an image, title, and description.' },
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Card image (recommended 4:3 ratio)' },
            },
          ],
        },
      ],
    },

    // ── 17. Mid-page CTA Banner ──────────────────────────────────
    {
      type: 'collapsible',
      label: '17 · CTA Banner',
      admin: { initCollapsed: true },
      fields: [
        { name: 'ctaBannerTitle', type: 'text', admin: { description: 'Plain text before highlight (e.g. "Get an")' } },
        { name: 'ctaBannerHighlight', type: 'text', admin: { description: 'Orange highlighted words (e.g. "AI Feasibility")' } },
        { name: 'ctaBannerTitleSuffix', type: 'text', admin: { description: 'Text after highlight (e.g. "Assessment")' } },
        { name: 'ctaBannerDescription', type: 'textarea' },
        { name: 'ctaBannerButtonText', type: 'text', defaultValue: 'BOOK AN AUDIT' },
        { name: 'ctaBannerButtonLink', type: 'text', defaultValue: '/contact' },
      ],
    },

    // ── 18. FAQ ───────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '18 · FAQ',
      admin: { initCollapsed: true },
      fields: [
        { name: 'faqSectionTitle', type: 'text', admin: { description: 'e.g. "Frequently Asked Questions"' } },
        {
          name: 'faqItems',
          type: 'array',
          admin: { description: 'Each item = one question + answer' },
          fields: [
            { name: 'question', type: 'text', required: true },
            { name: 'answer', type: 'textarea' },
          ],
        },
      ],
    },

    // ── 14. Deliverables Cards ───────────────────────────────────
    {
      type: 'collapsible',
      label: '14 · Deliverables (Sticky Cards)',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'deliverablesSectionTitle',
          type: 'text',
          admin: { description: 'Left sticky heading (e.g. "What We Deliver")' },
        },
        {
          name: 'deliverablesSectionSubtitle',
          type: 'text',
          admin: { description: 'Orange subtitle below heading (e.g. "(And Why Each Deliverable Exists)")' },
        },
        {
          name: 'deliverables',
          type: 'array',
          admin: { description: 'Each card = one deliverable with impact + risk' },
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            { name: 'whyItExists', type: 'textarea', admin: { description: 'Why It Exists text' } },
            { name: 'businessImpact', type: 'textarea', admin: { description: 'Business Impact text' } },
            { name: 'riskMitigation', type: 'textarea', admin: { description: 'Risk Mitigation text' } },
          ],
        },
      ],
    },
  ],
}
